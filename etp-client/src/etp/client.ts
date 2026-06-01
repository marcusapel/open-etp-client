/**
 * ETP 1.2 WebSocket client — connects to open-etp-server.
 *
 * Implements the subset of ETP 1.2 protocol needed for:
 * - Dataspace management (GetDataspaces, PutDataspaces, DeleteDataspaces)
 * - DataObject CRUD (GetDataObjects, PutDataObjects, DeleteDataObjects)
 * - Discovery (GetResources)
 */

import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";

// ─── ETP 1.2 Protocol Constants ─────────────────────────────────────────────

const ETP_SUB_PROTOCOL = "energistics-tp";

// Protocol IDs (from ETP 1.2 spec)
enum Protocol {
  Core = 0,
  Discovery = 3,
  Store = 4,
  Dataspace = 24,
}

enum MessageType {
  // Core
  RequestSession = 1,
  OpenSession = 2,
  CloseSession = 5,

  // Discovery
  GetResources = 1,
  GetResourcesResponse = 4,

  // Store
  GetDataObjects = 1,
  GetDataObjectsResponse = 4,
  PutDataObjects = 2,
  PutDataObjectsResponse = 5,
  DeleteDataObjects = 3,
  DeleteDataObjectsResponse = 6,

  // Dataspace
  GetDataspaces = 1,
  GetDataspacesResponse = 2,
  PutDataspaces = 3,
  PutDataspacesResponse = 4,
  DeleteDataspaces = 5,
  DeleteDataspacesResponse = 6,
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface EtpClientOptions {
  serverUrl: string;
  dataPartitionId?: string;
  authToken?: string;
  maxMessageSize?: number;
}

export interface DataObject {
  resource: Resource;
  data: string; // XML content
}

export interface Resource {
  uri: string;
  name: string;
  dataObjectType: string;
  uuid?: string;
  lastChanged?: string;
}

export interface Dataspace {
  uri: string;
  path: string;
  lastChanged?: string;
}

interface PendingRequest {
  resolve: (value: any) => void;
  reject: (reason: any) => void;
  timeout: NodeJS.Timeout;
}

// ─── Client ──────────────────────────────────────────────────────────────────

export class EtpClient {
  private ws: WebSocket | null = null;
  private options: EtpClientOptions;
  private messageId = 0;
  private pending = new Map<number, PendingRequest>();
  private sessionOpen = false;
  private requestTimeout = 30_000;

  constructor(options: EtpClientOptions) {
    this.options = {
      maxMessageSize: 4 * 1024 * 1024,
      ...options,
    };
  }

  // ─── Session Management ──────────────────────────────────────────────────

  async openSession(): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers: Record<string, string> = {};
      if (this.options.dataPartitionId) {
        headers["data-partition-id"] = this.options.dataPartitionId;
      }
      if (this.options.authToken) {
        headers["Authorization"] = `Bearer ${this.options.authToken}`;
      }

      this.ws = new WebSocket(this.options.serverUrl, ETP_SUB_PROTOCOL, {
        headers,
        maxPayload: this.options.maxMessageSize,
      });

      this.ws.on("open", () => {
        this.sendMessage(Protocol.Core, MessageType.RequestSession, {
          applicationName: "open-etp-client",
          applicationVersion: "0.1.0",
          requestedProtocols: [
            { protocol: Protocol.Discovery, protocolVersion: { major: 1, minor: 2 }, role: "store" },
            { protocol: Protocol.Store, protocolVersion: { major: 1, minor: 2 }, role: "store" },
            { protocol: Protocol.Dataspace, protocolVersion: { major: 1, minor: 2 }, role: "store" },
          ],
          supportedDataObjects: [
            { qualifiedType: "resqml20.*" },
            { qualifiedType: "resqml22.*" },
            { qualifiedType: "witsml21.*" },
            { qualifiedType: "prodml22.*" },
          ],
        });
      });

      this.ws.on("message", (data: Buffer) => {
        this.handleMessage(data, resolve);
      });

      this.ws.on("error", (err) => {
        reject(err);
      });

      this.ws.on("close", () => {
        this.sessionOpen = false;
        // Reject all pending requests
        for (const [, req] of this.pending) {
          clearTimeout(req.timeout);
          req.reject(new Error("Connection closed"));
        }
        this.pending.clear();
      });
    });
  }

  async closeSession(): Promise<void> {
    if (this.ws && this.sessionOpen) {
      this.sendMessage(Protocol.Core, MessageType.CloseSession, { reason: "" });
      this.ws.close();
      this.ws = null;
      this.sessionOpen = false;
    }
  }

  get isConnected(): boolean {
    return this.sessionOpen;
  }

  // ─── Dataspace Operations ────────────────────────────────────────────────

  async getDataspaces(): Promise<Dataspace[]> {
    const response = await this.request(Protocol.Dataspace, MessageType.GetDataspaces, {});
    return response.dataspaces || [];
  }

  async putDataspaces(dataspaces: Array<{ path: string; extraMetadata?: Record<string, string> }>): Promise<void> {
    const dsMap: Record<string, any> = {};
    for (const ds of dataspaces) {
      dsMap[`eml:///dataspace('${ds.path}')`] = {
        uri: `eml:///dataspace('${ds.path}')`,
        path: ds.path,
        storeLastWrite: new Date().toISOString(),
        ...(ds.extraMetadata && { customData: ds.extraMetadata }),
      };
    }
    await this.request(Protocol.Dataspace, MessageType.PutDataspaces, { dataspaces: dsMap });
  }

  async deleteDataspaces(paths: string[]): Promise<void> {
    const uris: Record<string, string> = {};
    for (const path of paths) {
      uris[`eml:///dataspace('${path}')`] = `eml:///dataspace('${path}')`;
    }
    await this.request(Protocol.Dataspace, MessageType.DeleteDataspaces, { uris });
  }

  // ─── Data Object Operations ──────────────────────────────────────────────

  async getDataObjects(uris: string[]): Promise<DataObject[]> {
    const uriMap: Record<string, string> = {};
    for (const uri of uris) {
      uriMap[uri] = uri;
    }
    const response = await this.request(Protocol.Store, MessageType.GetDataObjects, { uris: uriMap });
    return Object.values(response.dataObjects || {});
  }

  async putDataObjects(objects: DataObject[]): Promise<void> {
    const objMap: Record<string, any> = {};
    for (const obj of objects) {
      objMap[obj.resource.uri] = {
        resource: obj.resource,
        data: obj.data,
      };
    }
    await this.request(Protocol.Store, MessageType.PutDataObjects, { dataObjects: objMap });
  }

  async deleteDataObjects(uris: string[]): Promise<void> {
    const uriMap: Record<string, string> = {};
    for (const uri of uris) {
      uriMap[uri] = uri;
    }
    await this.request(Protocol.Store, MessageType.DeleteDataObjects, { uris: uriMap });
  }

  // ─── Discovery ───────────────────────────────────────────────────────────

  async getResources(uri: string, depth?: number): Promise<Resource[]> {
    const response = await this.request(Protocol.Discovery, MessageType.GetResources, {
      context: { uri, depth: depth ?? 1, dataObjectTypes: [] },
      scope: "targets",
    });
    return response.resources || [];
  }

  // ─── Internal ────────────────────────────────────────────────────────────

  private nextMessageId(): number {
    return ++this.messageId;
  }

  private sendMessage(protocol: number, messageType: number, body: any, correlationId?: number): number {
    const id = this.nextMessageId();
    const header = {
      protocol,
      messageType,
      correlationId: correlationId ?? 0,
      messageId: id,
      messageFlags: 0x02, // FIN flag
    };
    // ETP uses JSON-over-WebSocket (simplified — real impl uses Avro)
    const message = JSON.stringify({ header, body });
    this.ws?.send(message);
    return id;
  }

  private request(protocol: number, messageType: number, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const id = this.sendMessage(protocol, messageType, body);
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`ETP request timeout (protocol=${protocol}, type=${messageType})`));
      }, this.requestTimeout);
      this.pending.set(id, { resolve, reject, timeout });
    });
  }

  private handleMessage(data: Buffer, sessionResolve?: (value: void) => void): void {
    try {
      const msg = JSON.parse(data.toString());
      const { header, body } = msg;

      // Handle OpenSession response
      if (header.protocol === Protocol.Core && header.messageType === MessageType.OpenSession) {
        this.sessionOpen = true;
        sessionResolve?.();
        return;
      }

      // Match response to pending request
      const pending = this.pending.get(header.correlationId);
      if (pending) {
        clearTimeout(pending.timeout);
        this.pending.delete(header.correlationId);
        pending.resolve(body);
      }
    } catch (err) {
      // Ignore malformed messages
    }
  }
}
