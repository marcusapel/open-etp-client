/**
 * ETP 1.2 Message Encoding/Decoding.
 *
 * Handles the specific ETP message types needed for:
 * - Core: RequestSession, OpenSession, CloseSession
 * - Dataspace: GetDataspaces, PutDataspaces, DeleteDataspaces + responses
 * - Store: GetDataObjects, PutDataObjects, DeleteDataObjects + responses
 * - Discovery: GetResources + response
 *
 * Wire format: [MessageHeader (Avro)] [MessageBody (Avro)]
 */

import { AvroWriter, AvroReader } from "./avro";
import { randomBytes } from "crypto";

// ─── Message Header ──────────────────────────────────────────────────────────

export interface MessageHeader {
  protocol: number;
  messageType: number;
  correlationId: number;
  messageId: number;
  messageFlags: number;
}

const MSG_FLAG_FINAL = 0x02;

export function encodeHeader(w: AvroWriter, h: MessageHeader): void {
  w.writeInt(h.protocol);
  w.writeInt(h.messageType);
  w.writeLong(h.correlationId);
  w.writeLong(h.messageId);
  w.writeInt(h.messageFlags);
}

export function decodeHeader(r: AvroReader): MessageHeader {
  return {
    protocol: r.readInt(),
    messageType: r.readInt(),
    correlationId: r.readLongAsNumber(),
    messageId: r.readLongAsNumber(),
    messageFlags: r.readInt(),
  };
}

// ─── UUID (fixed 16 bytes) ───────────────────────────────────────────────────

function randomUuid(): Buffer {
  return randomBytes(16);
}

// ─── Version Record ──────────────────────────────────────────────────────────

function writeVersion(w: AvroWriter, major: number, minor: number): void {
  w.writeInt(major);
  w.writeInt(minor);
  w.writeInt(0); // revision
  w.writeInt(0); // patch
}

// ─── Core Protocol ───────────────────────────────────────────────────────────

export function encodeRequestSession(w: AvroWriter): void {
  // applicationName: string
  w.writeString("open-etp-client");
  // applicationVersion: string
  w.writeString("0.1.0");
  // clientInstanceId: Uuid (fixed 16)
  w.writeFixed(randomUuid());
  // requestedProtocols: array<SupportedProtocol>
  w.writeArrayStart(3);
  // Protocol 3 (Discovery)
  w.writeInt(3); // protocol
  writeVersion(w, 1, 2); // protocolVersion
  w.writeString("store"); // role
  w.writeMapStart(0); w.writeMapEnd(); // protocolCapabilities (empty map)
  // Protocol 4 (Store)
  w.writeInt(4);
  writeVersion(w, 1, 2);
  w.writeString("store");
  w.writeMapStart(0); w.writeMapEnd();
  // Protocol 24 (Dataspace)
  w.writeInt(24);
  writeVersion(w, 1, 2);
  w.writeString("store");
  w.writeMapStart(0); w.writeMapEnd();
  w.writeArrayEnd();
  // supportedDataObjects: array<SupportedDataObject>
  w.writeArrayStart(4);
  // resqml20.*
  w.writeString("resqml20.*");
  w.writeMapStart(0); w.writeMapEnd(); // dataObjectCapabilities
  // resqml22.*
  w.writeString("resqml22.*");
  w.writeMapStart(0); w.writeMapEnd();
  // witsml21.*
  w.writeString("witsml21.*");
  w.writeMapStart(0); w.writeMapEnd();
  // prodml22.*
  w.writeString("prodml22.*");
  w.writeMapStart(0); w.writeMapEnd();
  w.writeArrayEnd();
  // supportedCompression: array<string> (empty)
  w.writeArrayStart(0); w.writeArrayEnd();
  // supportedFormats: array<string> ["xml"]
  w.writeArrayStart(1);
  w.writeString("xml");
  w.writeArrayEnd();
  // currentDateTime: long (microseconds since epoch)
  w.writeLong(BigInt(Date.now()) * 1000n);
  // earliestRetainedChangeTime: long
  w.writeLong(0n);
  // serverAuthorizationRequired: boolean
  w.writeBoolean(false);
  // endpointCapabilities: map<DataValue> (empty)
  w.writeMapStart(0); w.writeMapEnd();
}

export function encodeCloseSession(w: AvroWriter, reason: string): void {
  w.writeString(reason);
}

export interface OpenSessionData {
  applicationName: string;
  applicationVersion: string;
  sessionId: Buffer;
}

export function decodeOpenSession(r: AvroReader): OpenSessionData {
  const applicationName = r.readString();
  const applicationVersion = r.readString();
  const sessionId = r.readFixed(16);
  // Skip remaining fields (supportedProtocols, supportedDataObjects, etc.)
  return { applicationName, applicationVersion, sessionId };
}

// ─── Dataspace Protocol ──────────────────────────────────────────────────────

export function encodeGetDataspaces(w: AvroWriter): void {
  // storeLastWriteFilter: union [null, long] — null
  w.writeUnionIndex(0); // null
}

export interface DataspaceInfo {
  uri: string;
  path: string;
  storeLastWrite: number;
  storeCreated: number;
}

export function decodeGetDataspacesResponse(r: AvroReader): DataspaceInfo[] {
  const dataspaces: DataspaceInfo[] = [];
  let count = r.readArrayCount();
  while (count > 0) {
    for (let i = 0; i < count; i++) {
      const uri = r.readString();
      const path = r.readString();
      const storeLastWrite = r.readLongAsNumber();
      const storeCreated = r.readLongAsNumber();
      // customData: map<DataValue>
      let mapCount = r.readMapCount();
      while (mapCount > 0) {
        for (let j = 0; j < mapCount; j++) {
          r.readString(); // key
          skipDataValue(r); // value
        }
        mapCount = r.readMapCount();
      }
      dataspaces.push({ uri, path, storeLastWrite, storeCreated });
    }
    count = r.readArrayCount();
  }
  return dataspaces;
}

export function encodePutDataspaces(w: AvroWriter, dataspaces: Map<string, { uri: string; path: string }>): void {
  // dataspaces: map<Dataspace>
  const entries = Array.from(dataspaces.entries());
  w.writeMapStart(entries.length);
  for (const [key, ds] of entries) {
    w.writeString(key);
    // Dataspace record: uri, path, storeLastWrite, storeCreated, customData
    w.writeString(ds.uri);
    w.writeString(ds.path);
    w.writeLong(BigInt(Date.now()) * 1000n); // storeLastWrite (micros)
    w.writeLong(BigInt(Date.now()) * 1000n); // storeCreated (micros)
    w.writeMapStart(0); w.writeMapEnd(); // customData (empty)
  }
  w.writeMapEnd();
}

export function encodeDeleteDataspaces(w: AvroWriter, uris: Map<string, string>): void {
  // uris: map<string>
  const entries = Array.from(uris.entries());
  w.writeMapStart(entries.length);
  for (const [key, val] of entries) {
    w.writeString(key);
    w.writeString(val);
  }
  w.writeMapEnd();
}

// ─── Store Protocol ──────────────────────────────────────────────────────────

export function encodeGetDataObjects(w: AvroWriter, uris: Map<string, string>): void {
  // uris: map<string>
  const entries = Array.from(uris.entries());
  w.writeMapStart(entries.length);
  for (const [key, val] of entries) {
    w.writeString(key);
    w.writeString(val);
  }
  w.writeMapEnd();
  // format: string
  w.writeString("xml");
}

export interface DataObjectResult {
  uri: string;
  name: string;
  dataObjectType: string;
  uuid: string;
  data: string;
}

export function decodeGetDataObjectsResponse(r: AvroReader): DataObjectResult[] {
  const results: DataObjectResult[] = [];
  // dataObjects: map<DataObject>
  let count = r.readMapCount();
  while (count > 0) {
    for (let i = 0; i < count; i++) {
      r.readString(); // map key
      // DataObject: resource, format, blobId, data
      // Resource: uri, alternateUris, name, sourceCount, targetCount, lastChanged, storeLastWrite, storeCreated, activeStatus, customData, dataObjectType
      const uri = r.readString();
      // alternateUris: array<string>
      let arrCount = r.readArrayCount();
      while (arrCount > 0) {
        for (let j = 0; j < arrCount; j++) r.readString();
        arrCount = r.readArrayCount();
      }
      const name = r.readString();
      // sourceCount: union[null, int]
      skipNullableInt(r);
      // targetCount: union[null, int]
      skipNullableInt(r);
      // lastChanged: long
      r.readLong();
      // storeLastWrite: long
      r.readLong();
      // storeCreated: long
      r.readLong();
      // activeStatus: enum (ActiveStatusKind)
      r.readInt();
      // customData: map<DataValue>
      skipMap(r);
      // dataObjectType: string
      const dataObjectType = r.readString();
      // format: string
      r.readString();
      // blobId: union[null, Uuid]
      const blobIdx = r.readUnionIndex();
      if (blobIdx === 1) r.readFixed(16);
      // data: bytes
      const dataBytes = r.readBytes();
      const data = dataBytes.toString("utf-8");

      // Extract UUID from URI
      const uuidMatch = uri.match(/\('([^']+)'\)$/);
      const uuid = uuidMatch ? uuidMatch[1] : "";

      results.push({ uri, name, dataObjectType, uuid, data });
    }
    count = r.readMapCount();
  }
  return results;
}

export function encodePutDataObjects(
  w: AvroWriter,
  objects: Map<string, { uri: string; name: string; dataObjectType: string; data: string }>
): void {
  // dataObjects: map<DataObject>
  const entries = Array.from(objects.entries());
  w.writeMapStart(entries.length);
  for (const [key, obj] of entries) {
    w.writeString(key);
    // Resource record
    w.writeString(obj.uri); // uri
    w.writeArrayStart(0); w.writeArrayEnd(); // alternateUris
    w.writeString(obj.name); // name
    w.writeUnionIndex(0); // sourceCount: null
    w.writeUnionIndex(0); // targetCount: null
    w.writeLong(BigInt(Date.now()) * 1000n); // lastChanged
    w.writeLong(BigInt(Date.now()) * 1000n); // storeLastWrite
    w.writeLong(BigInt(Date.now()) * 1000n); // storeCreated
    w.writeInt(0); // activeStatus: Active (enum index 0)
    w.writeMapStart(0); w.writeMapEnd(); // customData
    w.writeString(obj.dataObjectType); // dataObjectType
    // format: string
    w.writeString("xml");
    // blobId: union[null, Uuid] — null
    w.writeUnionIndex(0);
    // data: bytes
    w.writeBytes(Buffer.from(obj.data, "utf-8"));
  }
  w.writeMapEnd();
  // pruneContainedObjects: boolean
  w.writeBoolean(false);
}

export function encodeDeleteDataObjects(w: AvroWriter, uris: Map<string, string>): void {
  // uris: map<string>
  const entries = Array.from(uris.entries());
  w.writeMapStart(entries.length);
  for (const [key, val] of entries) {
    w.writeString(key);
    w.writeString(val);
  }
  w.writeMapEnd();
  // pruneContainedObjects: boolean
  w.writeBoolean(false);
}

// ─── Discovery Protocol ──────────────────────────────────────────────────────

export function encodeGetResources(w: AvroWriter, uri: string, depth: number): void {
  // context: ContextInfo record
  w.writeString(uri); // uri
  w.writeInt(depth); // depth
  // dataObjectTypes: array<string> (empty — get all)
  w.writeArrayStart(0); w.writeArrayEnd();
  // navigableEdges: enum RelationshipKind (0=Primary)
  w.writeInt(0);
  // includeSecondaryTargets: boolean
  w.writeBoolean(false);
  // includeSecondarySources: boolean
  w.writeBoolean(false);
  // scope: enum ContextScopeKind
  w.writeInt(0); // 0=self, 1=sources, 2=targets, 3=sourcesOrSelf, 4=targetsOrSelf
  // countObjects: boolean
  w.writeBoolean(false);
  // storeLastWriteFilter: union[null, long] — null
  w.writeUnionIndex(0);
  // activeStatusFilter: union[null, enum ActiveStatusKind] — null
  w.writeUnionIndex(0);
  // includeEdges: boolean
  w.writeBoolean(false);
}

export interface ResourceInfo {
  uri: string;
  name: string;
  dataObjectType: string;
}

export function decodeGetResourcesResponse(r: AvroReader): ResourceInfo[] {
  const resources: ResourceInfo[] = [];
  // resources: array<Resource>
  let count = r.readArrayCount();
  while (count > 0) {
    for (let i = 0; i < count; i++) {
      const uri = r.readString();
      // alternateUris
      let arrCount = r.readArrayCount();
      while (arrCount > 0) {
        for (let j = 0; j < arrCount; j++) r.readString();
        arrCount = r.readArrayCount();
      }
      const name = r.readString();
      skipNullableInt(r); // sourceCount
      skipNullableInt(r); // targetCount
      r.readLong(); // lastChanged
      r.readLong(); // storeLastWrite
      r.readLong(); // storeCreated
      r.readInt(); // activeStatus enum
      skipMap(r); // customData
      const dataObjectType = r.readString();
      resources.push({ uri, name, dataObjectType });
    }
    count = r.readArrayCount();
  }
  return resources;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function skipDataValue(r: AvroReader): void {
  const idx = r.readUnionIndex();
  switch (idx) {
    case 0: break; // null
    case 1: r.readBoolean(); break; // boolean
    case 2: r.readInt(); break; // int
    case 3: r.readLong(); break; // long
    case 4: r.readFloat(); break; // float
    case 5: r.readDouble(); break; // double
    case 6: r.readString(); break; // string
    default:
      // Complex types — skip by reading as bytes (best effort)
      r.readString();
      break;
  }
}

function skipNullableInt(r: AvroReader): void {
  const idx = r.readUnionIndex();
  if (idx === 1) r.readInt();
}

function skipMap(r: AvroReader): void {
  let count = r.readMapCount();
  while (count > 0) {
    for (let i = 0; i < count; i++) {
      r.readString(); // key
      skipDataValue(r); // value
    }
    count = r.readMapCount();
  }
}

// ─── Compose full ETP message ────────────────────────────────────────────────

export function buildMessage(
  protocol: number,
  messageType: number,
  messageId: number,
  correlationId: number,
  bodyEncoder: (w: AvroWriter) => void,
): Buffer {
  const w = new AvroWriter();
  encodeHeader(w, {
    protocol,
    messageType,
    correlationId,
    messageId,
    messageFlags: MSG_FLAG_FINAL,
  });
  bodyEncoder(w);
  return w.getBuffer();
}
