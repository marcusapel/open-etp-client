/**
 * ETP 1.2 WebSocket client — connects to open-etp-server.
 *
 * Implements the subset of ETP 1.2 protocol needed for:
 * - Dataspace management (GetDataspaces, PutDataspaces, DeleteDataspaces)
 * - DataObject CRUD (GetDataObjects, PutDataObjects, DeleteDataObjects)
 * - Discovery (GetResources)
 *
 * Uses proper binary Avro encoding (etp-messages.ts) for direct
 * communication with the C++ open-etp-server. No NestJS proxy needed.
 */

import WebSocket from "ws";
import { AvroWriter, AvroReader } from "./avro";
import {
  MessageHeader,
  encodeHeader,
  decodeHeader,
  encodeRequestSession,
  encodeCloseSession,
  decodeOpenSession,
  encodeGetDataspaces,
  decodeGetDataspacesResponse,
  encodePutDataspaces,
  encodeDeleteDataspaces,
  encodeGetDataObjects,
  decodeGetDataObjectsResponse,
  encodePutDataObjects,
  encodeDeleteDataObjects,
  encodeGetResources,
  decodeGetResourcesResponse,
  buildMessage,
} from "./etp-messages";

// ─── ETP 1.2 Protocol Constants ─────────────────────────────────────────────

const ETP_SUB_PROTOCOL = "etp12.energistics.org";

// Protocol IDs (from ETP 1.2 spec)
enum Protocol {
  Core = 0,
  Discovery = 3,
  Store = 4,
  Dataspace = 24,
}

// Message type IDs — per-protocol (same ID can appear in different protocols)
const Msg = {
  Core: { RequestSession: 1, OpenSession: 2, CloseSession: 5 },
  Discovery: { GetResources: 1, GetResourcesResponse: 4 },
  Store: {
    GetDataObjects: 1,
    PutDataObjects: 2,
    DeleteDataObjects: 3,
    GetDataObjectsResponse: 4,
    PutDataObjectsResponse: 5,
    DeleteDataObjectsResponse: 6,
  },
  Dataspace: {
    GetDataspaces: 1,
    GetDataspacesResponse: 2,
    PutDataspaces: 3,
    PutDataspacesResponse: 4,
    DeleteDataspaces: 5,
    DeleteDataspacesResponse: 6,
  },
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface EtpClientOptions {
  serverUrl: string;
  dataPartitionId?: string;
  authToken?: string;
  maxMessageSize?: number;
  /** REST proxy URL — if set, ETP operations are proxied via this REST API instead of WebSocket */
  restProxyUrl?: string;
}

export interface DataObject {
  resource: Resource;
  data: string; // XML content
}

export interface Resource {
  uri: string;
  alternateUris?: string[];
  name: string;
  dataObjectType: string;
  uuid?: string;
  lastChanged?: string;
  storeLastWrite?: string;
  storeCreated?: string;
  activeStatus?: string;
  customData?: Record<string, string>;
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
  partial: any[];  // accumulated results from multi-part messages
}

// ─── Client ──────────────────────────────────────────────────────────────────

export class EtpClient {
  private ws: WebSocket | null = null;
  private options: EtpClientOptions;
  private messageId = 0;
  private pending = new Map<number, PendingRequest>();
  private sessionOpen = false;
  private requestTimeout = 30_000;
  private proxyMode = false;

  constructor(options: EtpClientOptions) {
    this.options = {
      maxMessageSize: 4 * 1024 * 1024,
      ...options,
    };
  }

  // ─── Session Management ──────────────────────────────────────────────────

  async openSession(): Promise<void> {
    // If a REST proxy URL is configured, use proxy mode (no WebSocket needed)
    if (this.options.restProxyUrl) {
      this.proxyMode = true;
      this.sessionOpen = true;
      return;
    }
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
      this.ws.binaryType = "nodebuffer";

      this.ws.on("open", () => {
        // Send RequestSession using binary Avro
        const msg = buildMessage(
          Protocol.Core, Msg.Core.RequestSession, this.nextMessageId(), 0,
          (w) => encodeRequestSession(w),
        );
        this.ws!.send(msg);
      });

      this.ws.on("message", (data: Buffer) => {
        this.handleBinaryMessage(data, resolve, reject);
      });

      this.ws.on("error", (err) => {
        reject(err);
      });

      this.ws.on("close", () => {
        this.sessionOpen = false;
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
      const msg = buildMessage(
        Protocol.Core, Msg.Core.CloseSession, this.nextMessageId(), 0,
        (w) => encodeCloseSession(w, ""),
      );
      this.ws.send(msg);
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
    if (this.proxyMode) return this.proxyGet("/dataspaces");
    const response = await this.sendEtpRequest(
      Protocol.Dataspace, Msg.Dataspace.GetDataspaces,
      (w) => encodeGetDataspaces(w),
    );
    return response;
  }

  async putDataspaces(dataspaces: Array<{ path: string; extraMetadata?: Record<string, string> }>): Promise<void> {
    if (this.proxyMode) {
      await this.proxyPost("/dataspaces", dataspaces.map((ds) => ({ DataspaceId: ds.path })));
      return;
    }
    const dsMap = new Map<string, { uri: string; path: string }>();
    for (const ds of dataspaces) {
      const uri = `eml:///dataspace('${ds.path}')`;
      dsMap.set(uri, { uri, path: ds.path });
    }
    await this.sendEtpRequest(
      Protocol.Dataspace, Msg.Dataspace.PutDataspaces,
      (w) => encodePutDataspaces(w, dsMap),
    );
  }

  async deleteDataspaces(paths: string[]): Promise<void> {
    if (this.proxyMode) {
      await this.proxyDelete("/dataspaces", { paths });
      return;
    }
    const uris = new Map<string, string>();
    for (const path of paths) {
      const uri = `eml:///dataspace('${path}')`;
      uris.set(uri, uri);
    }
    await this.sendEtpRequest(
      Protocol.Dataspace, Msg.Dataspace.DeleteDataspaces,
      (w) => encodeDeleteDataspaces(w, uris),
    );
  }

  // ─── Data Object Operations ──────────────────────────────────────────────

  async getDataObjects(uris: string[]): Promise<DataObject[]> {
    if (this.proxyMode) {
      const results: DataObject[] = [];
      const objects = await this.proxyPost("/dataspaces/multi-resources/get-content", { uris });
      if (Array.isArray(objects)) {
        for (let i = 0; i < objects.length; i++) {
          const obj = objects[i];
          const xml = typeof obj === "string" ? obj : JSON.stringify(obj);
          const uri = uris[i] || "";
          const matches = [...uri.matchAll(/\/([^/'(]+)\(([0-9a-f-]+)\)/gi)];
          const m = matches.length > 0 ? matches[matches.length - 1] : null;
          results.push({
            resource: { uri, name: obj?.Citation?.Title || m?.[2] || "", dataObjectType: m?.[1] || "", uuid: m?.[2] },
            data: xml,
          });
        }
      }
      return results;
    }
    const uriMap = new Map<string, string>();
    for (const uri of uris) {
      uriMap.set(uri, uri);
    }
    const response = await this.sendEtpRequest(
      Protocol.Store, Msg.Store.GetDataObjects,
      (w) => encodeGetDataObjects(w, uriMap),
    );
    return response;
  }

  async putDataObjects(objects: DataObject[]): Promise<void> {
    if (this.proxyMode) {
      await this.proxyPost("/objects", { dataObjects: objects });
      return;
    }
    const objMap = new Map<string, { uri: string; name: string; dataObjectType: string; data: string }>();
    for (const obj of objects) {
      objMap.set(obj.resource.uri, {
        uri: obj.resource.uri,
        name: obj.resource.name,
        dataObjectType: obj.resource.dataObjectType,
        data: obj.data,
      });
    }
    await this.sendEtpRequest(
      Protocol.Store, Msg.Store.PutDataObjects,
      (w) => encodePutDataObjects(w, objMap),
    );
  }

  async deleteDataObjects(uris: string[]): Promise<void> {
    if (this.proxyMode) {
      await this.proxyDelete("/objects", { uris });
      return;
    }
    const uriMap = new Map<string, string>();
    for (const uri of uris) {
      uriMap.set(uri, uri);
    }
    await this.sendEtpRequest(
      Protocol.Store, Msg.Store.DeleteDataObjects,
      (w) => encodeDeleteDataObjects(w, uriMap),
    );
  }

  // ─── Discovery ───────────────────────────────────────────────────────────

  async getResources(uri: string, depth?: number): Promise<Resource[]> {
    if (this.proxyMode) {
      const dsMatch = uri.match(/dataspace\('([^']+)'\)/);
      if (dsMatch) {
        const dsId = encodeURIComponent(dsMatch[1]);
        const resources = await this.proxyGet(`/dataspaces/${dsId}/resources/all`);
        // Normalize: official REST doesn't include dataObjectType, extract from URI
        return (resources as any[]).map((r) => {
          const typeMatch = r.uri?.match(/\/([^/(]+)\(/);
          return {
            uri: r.uri,
            name: r.name,
            dataObjectType: typeMatch ? typeMatch[1] : "",
            uuid: r.uri?.match(/\(([^)]+)\)$/)?.[1],
            lastChanged: r.storeLastWrite || r.lastChanged,
          };
        });
      }
      return this.proxyGet(`/dataspaces/${encodeURIComponent(uri)}/resources/all`);
    }
    const response = await this.sendEtpRequest(
      Protocol.Discovery, Msg.Discovery.GetResources,
      (w) => encodeGetResources(w, uri, depth ?? 1),
    );
    return response;
  }

  // ─── Internal: Binary Avro ETP Transport ─────────────────────────────────

  private nextMessageId(): number {
    this.messageId += 2;
    return this.messageId;
  }

  /**
   * Send an ETP request encoded as binary Avro and wait for the response.
   * Returns the decoded response body.
   */
  private sendEtpRequest(
    protocol: number,
    messageType: number,
    encodeBody: (w: AvroWriter) => void,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const id = this.nextMessageId();
      const msg = buildMessage(protocol, messageType, id, 0, encodeBody);
      this.ws!.send(msg);

      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`ETP request timeout (protocol=${protocol}, type=${messageType})`));
      }, this.requestTimeout);

      this.pending.set(id, { resolve, reject, timeout, partial: [] });
    });
  }

  /**
   * Handle an incoming binary Avro ETP message.
   * Decodes header, then dispatches to the appropriate response decoder.
   */
  private handleBinaryMessage(data: Buffer, sessionResolve?: (value: void) => void, sessionReject?: (err: Error) => void): void {
    try {
      const reader = new AvroReader(data);
      const header = decodeHeader(reader);

      // Handle ProtocolException (messageType 1000)
      if (header.messageType === 1000) {
        const errorCode = reader.readInt();
        const errorMsg = reader.readString();
        const err = new Error(`ETP ProtocolException ${errorCode}: ${errorMsg}`);
        // If this is during session handshake, reject
        if (sessionReject) {
          sessionReject(err);
          return;
        }
        // Otherwise reject the pending request
        const pending = this.pending.get(header.correlationId);
        if (pending) {
          clearTimeout(pending.timeout);
          this.pending.delete(header.correlationId);
          pending.reject(err);
        }
        return;
      }

      // Handle OpenSession response (completes handshake)
      if (header.protocol === Protocol.Core && header.messageType === Msg.Core.OpenSession) {
        decodeOpenSession(reader); // consume the body
        this.sessionOpen = true;
        sessionResolve?.();
        return;
      }

      // Match response to pending request by correlationId
      const pending = this.pending.get(header.correlationId);
      if (!pending) return;

      // Decode response body based on protocol + messageType
      const decoded = this.decodeResponseBody(header, reader);

      // Multi-part: accumulate if not final, resolve when final flag (0x02) is set
      const isFinal = (header.messageFlags & 0x02) !== 0;
      if (Array.isArray(decoded)) {
        pending.partial.push(...decoded);
      } else {
        pending.partial.push(decoded);
      }

      if (isFinal) {
        clearTimeout(pending.timeout);
        this.pending.delete(header.correlationId);
        pending.resolve(pending.partial);
      }
    } catch (err: any) {
      // If we can still identify the correlationId, reject the pending request
      // Otherwise silently drop (malformed frame)
    }
  }

  /**
   * Decode the response body based on protocol and message type.
   */
  private decodeResponseBody(header: MessageHeader, reader: AvroReader): any {
    switch (header.protocol) {
      case Protocol.Dataspace:
        if (header.messageType === Msg.Dataspace.GetDataspacesResponse) {
          const dataspaces = decodeGetDataspacesResponse(reader);
          return dataspaces.map((d) => ({
            uri: d.uri,
            path: d.path,
            storeLastWrite: new Date(d.storeLastWrite / 1000).toISOString(),
            storeCreated: new Date(d.storeCreated / 1000).toISOString(),
            customData: d.customData,
          }));
        }
        // PutDataspacesResponse / DeleteDataspacesResponse — success ack
        return {};

      case Protocol.Store:
        if (header.messageType === Msg.Store.GetDataObjectsResponse) {
          const objects = decodeGetDataObjectsResponse(reader);
          return objects.map((o) => ({
            resource: {
              uri: o.uri,
              name: o.name,
              dataObjectType: o.dataObjectType,
              uuid: o.uuid,
            },
            data: o.data,
          }));
        }
        // PutDataObjectsResponse / DeleteDataObjectsResponse — success ack
        return {};

      case Protocol.Discovery:
        if (header.messageType === Msg.Discovery.GetResourcesResponse) {
          const resources = decodeGetResourcesResponse(reader);
          return resources.map((r) => ({
            uri: r.uri,
            alternateUris: r.alternateUris,
            name: r.name,
            lastChanged: r.lastChanged,
            storeLastWrite: r.storeLastWrite,
            storeCreated: r.storeCreated,
            activeStatus: r.activeStatus,
            customData: r.customData,
            dataObjectType: r.dataObjectType,
          }));
        }
        return {};

      default:
        return {};
    }
  }

  // ─── REST Proxy Helpers ──────────────────────────────────────────────────

  private get proxyBaseUrl(): string {
    return `${this.options.restProxyUrl}/api/reservoir-ddms/v2`;
  }

  private get proxyHeaders(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "data-partition-id": this.options.dataPartitionId || "opendes",
      "Authorization": `Bearer ${this.options.authToken || "proxy"}`,
    };
  }

  private async proxyGet(path: string): Promise<any> {
    const res = await fetch(`${this.proxyBaseUrl}${path}`, { headers: this.proxyHeaders });
    if (!res.ok) throw new Error(`Proxy GET ${path}: ${res.status} ${res.statusText}`);
    return res.json();
  }

  private async proxyPost(path: string, body: any): Promise<any> {
    const res = await fetch(`${this.proxyBaseUrl}${path}`, {
      method: "POST",
      headers: this.proxyHeaders,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Proxy POST ${path}: ${res.status} ${res.statusText}`);
    return res.json().catch(() => undefined);
  }

  private async proxyDelete(path: string, body: any): Promise<void> {
    const res = await fetch(`${this.proxyBaseUrl}${path}`, {
      method: "DELETE",
      headers: this.proxyHeaders,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Proxy DELETE ${path}: ${res.status} ${res.statusText}`);
  }
}
