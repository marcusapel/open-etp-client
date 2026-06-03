// ============================================================================
// ETP ChannelStreaming Protocol 1 — Producer (Server-Side) Handler
//
// Implements the "producer" role of ETP 1.2 Protocol 1 (ChannelStreaming).
// The producer sends channel metadata and real-time data to connected consumers.
//
// Protocol 1 Messages:
//   Producer → Consumer:
//     ChannelMetadata   (msgType 1) — Announce available channels
//     ChannelData       (msgType 2) — Push data items
//     TruncateChannels  (msgType 5) — Signal data truncation
//   Consumer → Producer:
//     StartStreaming     (msgType 3) — Consumer is ready for data
//     StopStreaming      (msgType 4) — Consumer wants to stop
//
// This file can be integrated into the open-etp-server or used standalone
// with the etp-client WebSocket infrastructure.
// ============================================================================

import { EventEmitter } from "events";
// NOTE: When integrated into the server, adjust this import path.
// From demo/streaming/ relative to project root:
import { Energistics, Integer64 } from "../../open-etp-client/src/lib/common/Etp12";

// ─── Type Aliases ────────────────────────────────────────────────────────────

type ChannelMetadataRecord =
  Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord;
type IndexMetadataRecord =
  Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord;
type DataItem = Energistics.Etp.v12.Datatypes.ChannelData.DataItem;
type TruncateInfo = Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo;
type MessageHeader = Energistics.Etp.v12.Datatypes.MessageHeader;
type DataValue = Energistics.Etp.v12.Datatypes.DataValue;
type IndexValue = Energistics.Etp.v12.Datatypes.IndexValue;

const ChannelStreaming = Energistics.Etp.v12.Protocol.ChannelStreaming;
const ChannelDataKind = Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind;
const ChannelIndexKind = Energistics.Etp.v12.Datatypes.ChannelData.ChannelIndexKind;
const ActiveStatusKind = Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind;

const PROTOCOL_ID = 1; // ChannelStreaming

// ─── Channel Definition ──────────────────────────────────────────────────────

export interface ChannelDefinition {
  /** URI of the parent object (e.g., witsml21.Log) */
  uri: string;
  /** Unique channel ID (assigned by producer) */
  id: number;
  /** Channel mnemonic / name (e.g., "GR", "DEPTH") */
  channelName: string;
  /** Data kind (float, double, int, etc.) */
  dataKind: Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind;
  /** Unit of measure (e.g., "gAPI", "m") */
  uom: string;
  /** Index type for this channel (MeasuredDepth, DateTime, etc.) */
  indexKind: Energistics.Etp.v12.Datatypes.ChannelData.ChannelIndexKind;
  /** UOM of the index (e.g., "m", "s") */
  indexUom: string;
  /** Depth datum reference (e.g., "KB", "MSL") */
  depthDatum?: string;
  /** Source system identifier */
  source?: string;
}

// ─── Streaming Session ───────────────────────────────────────────────────────

export interface StreamingSession {
  /** Session/connection identifier */
  sessionId: string;
  /** Whether the consumer has sent StartStreaming */
  isStreaming: boolean;
  /** Function to send a message to this consumer */
  send: (protocol: number, messageType: number, body: unknown) => void;
}

// ─── Events ──────────────────────────────────────────────────────────────────

export const StreamingEvents = {
  /** Consumer started streaming */
  CONSUMER_STARTED: "consumerStarted",
  /** Consumer stopped streaming */
  CONSUMER_STOPPED: "consumerStopped",
  /** Data was pushed to consumers */
  DATA_PUSHED: "dataPushed",
} as const;

// ─── Producer Handler ────────────────────────────────────────────────────────

/**
 * ChannelStreamingProducer — server-side handler for ETP Protocol 1.
 *
 * Manages channel registration, consumer sessions, and data broadcasting.
 * Designed to be embedded in the open-etp-server or run standalone.
 *
 * Usage:
 *   const producer = new ChannelStreamingProducer();
 *   producer.registerChannel({ uri, id: 1, channelName: "GR", ... });
 *   producer.registerChannel({ uri, id: 2, channelName: "DEPTH", ... });
 *
 *   // When a consumer connects and sends StartStreaming:
 *   producer.handleStartStreaming(session);
 *
 *   // Push data (broadcasts to all streaming consumers):
 *   producer.pushData([
 *     { channelId: 1, index: 100.0, value: 45.2 },
 *     { channelId: 2, index: 100.0, value: 100.0 }
 *   ]);
 */
export class ChannelStreamingProducer extends EventEmitter {
  private channels: Map<number, ChannelDefinition> = new Map();
  private sessions: Map<string, StreamingSession> = new Map();
  private nextMessageId: bigint = BigInt(1);

  // ─── Channel Registration ────────────────────────────────────────────

  /**
   * Register a channel that this producer will stream.
   * Must be called before any consumer starts streaming.
   */
  registerChannel(def: ChannelDefinition): void {
    this.channels.set(def.id, def);
  }

  /**
   * Remove a channel from the producer.
   */
  unregisterChannel(channelId: number): void {
    this.channels.delete(channelId);
  }

  /**
   * Get all registered channel definitions.
   */
  getChannels(): ChannelDefinition[] {
    return Array.from(this.channels.values());
  }

  // ─── Session Management ──────────────────────────────────────────────

  /**
   * Register a new consumer session (called when WebSocket connects
   * and protocol negotiation includes ChannelStreaming).
   */
  addSession(session: StreamingSession): void {
    this.sessions.set(session.sessionId, session);
  }

  /**
   * Remove a consumer session (called on disconnect).
   */
  removeSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  /**
   * Get all currently streaming sessions.
   */
  getStreamingSessions(): StreamingSession[] {
    return Array.from(this.sessions.values()).filter(s => s.isStreaming);
  }

  // ─── Protocol Message Handlers (incoming from consumer) ──────────────

  /**
   * Handle StartStreaming message from a consumer.
   * Responds by sending ChannelMetadata, then begins streaming data.
   */
  handleStartStreaming(session: StreamingSession): void {
    session.isStreaming = true;
    this.sessions.set(session.sessionId, session);

    // Send ChannelMetadata to the consumer
    const metadata = this.buildChannelMetadata();
    session.send(
      PROTOCOL_ID,
      ChannelStreaming.MsgChannelMetadata,
      metadata
    );

    this.emit(StreamingEvents.CONSUMER_STARTED, session.sessionId);
  }

  /**
   * Handle StopStreaming message from a consumer.
   */
  handleStopStreaming(session: StreamingSession): void {
    session.isStreaming = false;
    this.sessions.set(session.sessionId, session);
    this.emit(StreamingEvents.CONSUMER_STOPPED, session.sessionId);
  }

  /**
   * Dispatch an incoming message from a consumer to the appropriate handler.
   */
  handleMessage(
    session: StreamingSession,
    messageHeader: MessageHeader,
    messageBody: unknown
  ): void {
    if (messageHeader.protocol !== PROTOCOL_ID) {
      throw new Error(
        `ChannelStreamingProducer received message for protocol ${messageHeader.protocol}`
      );
    }

    switch (messageHeader.messageType) {
      case ChannelStreaming.MsgStartStreaming:
        this.handleStartStreaming(session);
        break;
      case ChannelStreaming.MsgStopStreaming:
        this.handleStopStreaming(session);
        break;
      default:
        throw new Error(
          `Unknown ChannelStreaming message type: ${messageHeader.messageType}`
        );
    }
  }

  // ─── Data Pushing (outgoing to consumers) ────────────────────────────

  /**
   * Push channel data to all active streaming consumers.
   *
   * @param items Array of simplified data points to broadcast
   */
  pushData(items: SimplifiedDataItem[]): void {
    const dataItems = items.map(item => this.toDataItem(item));
    const message: Energistics.Etp.v12.Protocol.ChannelStreaming.ChannelData = {
      data: dataItems
    };

    const streamingSessions = this.getStreamingSessions();
    for (const session of streamingSessions) {
      session.send(PROTOCOL_ID, ChannelStreaming.MsgChannelData, message);
    }

    this.emit(StreamingEvents.DATA_PUSHED, {
      itemCount: items.length,
      consumerCount: streamingSessions.length
    });
  }

  /**
   * Push a single data point for one channel.
   */
  pushChannelValue(channelId: number, indexValue: number, value: number | string | boolean): void {
    this.pushData([{ channelId, index: indexValue, value }]);
  }

  /**
   * Signal that channels have been truncated at a given index.
   * Used when data is deleted or corrected from the back.
   */
  truncateChannels(truncations: Array<{ channelId: number; truncatedIndex: number }>): void {
    const truncateInfos: TruncateInfo[] = truncations.map(t => {
      const info = new Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo();
      info.channelId = BigInt(t.channelId);
      // Note: TruncateInfo fields depend on ETP version; simplified here
      return info;
    });

    const message: Energistics.Etp.v12.Protocol.ChannelStreaming.TruncateChannels = {
      channels: truncateInfos
    };

    for (const session of this.getStreamingSessions()) {
      session.send(PROTOCOL_ID, ChannelStreaming.MsgTruncateChannels, message);
    }
  }

  // ─── Internal Helpers ────────────────────────────────────────────────

  private buildChannelMetadata(): Energistics.Etp.v12.Protocol.ChannelStreaming.ChannelMetadata {
    const channels: ChannelMetadataRecord[] = [];

    for (const def of Array.from(this.channels.values())) {
      const indexMeta = new Energistics.Etp.v12.Datatypes.ChannelData.IndexMetadataRecord();
      indexMeta.indexKind = def.indexKind;
      indexMeta.interval = new Energistics.Etp.v12.Datatypes.Object.IndexInterval();
      indexMeta.direction =
        Energistics.Etp.v12.Datatypes.ChannelData.IndexDirection.Increasing;
      indexMeta.name = def.indexKind === ChannelIndexKind.MeasuredDepth ? "MD" : "TIME";
      indexMeta.uom = def.indexUom;
      indexMeta.depthDatum = def.depthDatum || "";
      indexMeta.indexPropertyKindUri = "";
      indexMeta.filterable = true;

      const record = new Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord();
      record.uri = def.uri;
      record.id = BigInt(def.id);
      record.indexes = [indexMeta];
      record.channelName = def.channelName;
      record.dataKind = def.dataKind;
      record.uom = def.uom;
      record.depthDatum = def.depthDatum || "";
      record.channelClassUri = "";
      record.status = ActiveStatusKind.Active;
      record.source = def.source || "";
      record.axisVectorLengths = [];
      record.attributeMetadata = [];
      record.customData = new Map();

      channels.push(record);
    }

    return { channels };
  }

  private toDataItem(item: SimplifiedDataItem): DataItem {
    const dataItem = new Energistics.Etp.v12.Datatypes.ChannelData.DataItem();
    dataItem.channelId = BigInt(item.channelId);

    // Build index value (use double for depth/numeric index)
    const indexValue: IndexValue = {
      item: typeof item.index === "bigint"
        ? { __keyName: "_long" as const, _long: item.index }
        : { __keyName: "_double" as const, _double: item.index as number }
    };
    dataItem.indexes = [indexValue];

    // Build data value
    dataItem.value = this.toDataValue(item.value);
    dataItem.valueAttributes = [];

    return dataItem;
  }

  private toDataValue(value: number | string | boolean | bigint): DataValue {
    const dv = new Energistics.Etp.v12.Datatypes.DataValue();
    if (typeof value === "number") {
      dv.item = { __keyName: "_double" as const, _double: value };
    } else if (typeof value === "string") {
      dv.item = { __keyName: "_string" as const, _string: value };
    } else if (typeof value === "boolean") {
      dv.item = { __keyName: "_boolean" as const, _boolean: value };
    } else if (typeof value === "bigint") {
      dv.item = { __keyName: "_long" as const, _long: value };
    }
    return dv;
  }
}

// ─── Simplified Input Types ──────────────────────────────────────────────────

export interface SimplifiedDataItem {
  channelId: number;
  index: number | bigint;
  value: number | string | boolean | bigint;
}
