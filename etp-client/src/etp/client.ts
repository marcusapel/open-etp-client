/**
 * ETP 1.2 WebSocket client — connects to open-etp-server.
 *
 * Implements the subset of ETP 1.2 protocol needed for:
 * - Dataspace management (GetDataspaces, PutDataspaces, DeleteDataspaces)
 * - DataObject CRUD (GetDataObjects, PutDataObjects, DeleteDataObjects)
 * - Discovery (GetResources)
 */

import WebSocket from "ws";

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

      this.ws.on("open", () => {
        this.sendMessage(Protocol.Core, Msg.Core.RequestSession, {
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
      this.sendMessage(Protocol.Core, Msg.Core.CloseSession, { reason: "" });
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
    const response = await this.request(Protocol.Dataspace, Msg.Dataspace.GetDataspaces, {});
    return response.dataspaces || [];
  }

  async putDataspaces(dataspaces: Array<{ path: string; extraMetadata?: Record<string, string> }>): Promise<void> {
    if (this.proxyMode) {
      await this.proxyPost("/dataspaces", dataspaces.map((ds) => ({ DataspaceId: ds.path })));
      return;
    }
    const dsMap: Record<string, any> = {};
    for (const ds of dataspaces) {
      dsMap[`eml:///dataspace('${ds.path}')`] = {
        uri: `eml:///dataspace('${ds.path}')`,
        path: ds.path,
        storeLastWrite: new Date().toISOString(),
        ...(ds.extraMetadata && { customData: ds.extraMetadata }),
      };
    }
    await this.request(Protocol.Dataspace, Msg.Dataspace.PutDataspaces, { dataspaces: dsMap });
  }

  async deleteDataspaces(paths: string[]): Promise<void> {
    if (this.proxyMode) {
      await this.proxyDelete("/dataspaces", { paths });
      return;
    }
    const uris: Record<string, string> = {};
    for (const path of paths) {
      uris[`eml:///dataspace('${path}')`] = `eml:///dataspace('${path}')`;
    }
    await this.request(Protocol.Dataspace, Msg.Dataspace.DeleteDataspaces, { uris });
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
          // Match the LAST type(uuid) in URI — skip the dataspace('...') part
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
    const uriMap: Record<string, string> = {};
    for (const uri of uris) {
      uriMap[uri] = uri;
    }
    const response = await this.request(Protocol.Store, Msg.Store.GetDataObjects, { uris: uriMap });
    return Object.values(response.dataObjects || {});
  }

  async putDataObjects(objects: DataObject[]): Promise<void> {
    if (this.proxyMode) {
      await this.proxyPost("/objects", { dataObjects: objects });
      return;
    }
    const objMap: Record<string, any> = {};
    for (const obj of objects) {
      objMap[obj.resource.uri] = {
        resource: obj.resource,
        data: obj.data,
      };
    }
    await this.request(Protocol.Store, Msg.Store.PutDataObjects, { dataObjects: objMap });
  }

  async deleteDataObjects(uris: string[]): Promise<void> {
    if (this.proxyMode) {
      await this.proxyDelete("/objects", { uris });
      return;
    }
    const uriMap: Record<string, string> = {};
    for (const uri of uris) {
      uriMap[uri] = uri;
    }
    await this.request(Protocol.Store, Msg.Store.DeleteDataObjects, { uris: uriMap });
  }

  // ─── Discovery ───────────────────────────────────────────────────────────

  async getResources(uri: string, depth?: number): Promise<Resource[]> {
    if (this.proxyMode) {
      // Extract dataspace from URI: eml:///dataspace('x/y') → x/y
      const dsMatch = uri.match(/dataspace\('([^']+)'\)/);
      if (dsMatch) {
        const dsId = encodeURIComponent(dsMatch[1]);
        return this.proxyGet(`/dataspaces/${dsId}/resources/all`);
      }
      return this.proxyGet(`/dataspaces/${encodeURIComponent(uri)}/resources/all`);
    }
    const response = await this.request(Protocol.Discovery, Msg.Discovery.GetResources, {
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
    // ETP uses JSON-over-WebSocket (simplified — real impl uses Avro binary via etp-messages.ts)
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
      if (header.protocol === Protocol.Core && header.messageType === Msg.Core.OpenSession) {
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
