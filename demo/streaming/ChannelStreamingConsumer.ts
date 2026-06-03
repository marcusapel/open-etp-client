// ============================================================================
// ETP ChannelStreaming Protocol 1 — Consumer (Client-Side) Handler
//
// Implements the "consumer" role of ETP 1.2 Protocol 1 (ChannelStreaming).
// The consumer receives channel metadata and real-time data from the producer.
//
// This is a standalone consumer that connects directly via WebSocket,
// independent of the ChannelSubscribeCustomer (Protocol 21).
//
// Protocol 1 is simpler than Protocol 21 — it's push-only from producer,
// no subscription filtering. The consumer just says "start" or "stop".
// ============================================================================

import { EventEmitter } from "events";
// NOTE: When integrated into the server, adjust this import path.
import { Energistics, Integer64 } from "../../open-etp-client/src/lib/common/Etp12";

// ─── Type Aliases ────────────────────────────────────────────────────────────

type ChannelMetadataRecord =
  Energistics.Etp.v12.Datatypes.ChannelData.ChannelMetadataRecord;
type DataItem = Energistics.Etp.v12.Datatypes.ChannelData.DataItem;
type TruncateInfo = Energistics.Etp.v12.Datatypes.ChannelData.TruncateInfo;
type MessageHeader = Energistics.Etp.v12.Datatypes.MessageHeader;

const ChannelStreaming = Energistics.Etp.v12.Protocol.ChannelStreaming;

const PROTOCOL_ID = 1;

// ─── Events ──────────────────────────────────────────────────────────────────

export const ConsumerEvents = {
  /** Received channel metadata from producer */
  METADATA: "metadata",
  /** Received channel data points */
  DATA: "data",
  /** Channels were truncated */
  TRUNCATED: "truncated",
  /** Streaming started */
  STARTED: "started",
  /** Streaming stopped */
  STOPPED: "stopped",
} as const;

// ─── Decoded Data Point ──────────────────────────────────────────────────────

export interface DecodedDataPoint {
  channelId: number;
  channelName: string;
  uom: string;
  index: number;
  value: number | string | boolean | bigint | null;
  timestamp: number;
}

// ─── Consumer Handler ────────────────────────────────────────────────────────

/**
 * ChannelStreamingConsumer — client-side handler for ETP Protocol 1.
 *
 * Receives real-time channel data from a ChannelStreaming producer.
 * Decodes ETP DataItems into simple {channelName, index, value} objects.
 *
 * Usage:
 *   const consumer = new ChannelStreamingConsumer(sendFn);
 *   consumer.on("metadata", (channels) => console.log(channels));
 *   consumer.on("data", (points) => console.log(points));
 *   consumer.startStreaming();
 */
export class ChannelStreamingConsumer extends EventEmitter {
  private channelMap: Map<number, ChannelMetadataRecord> = new Map();
  private streaming = false;
  private readonly sendMessage: (protocol: number, messageType: number, body: unknown) => void;

  /** Buffer for batch processing */
  private buffer: DecodedDataPoint[] = [];
  private flushInterval: ReturnType<typeof setInterval> | null = null;
  private bufferFlushMs = 100;

  constructor(
    sendMessage: (protocol: number, messageType: number, body: unknown) => void,
    options?: { bufferFlushMs?: number }
  ) {
    super();
    this.sendMessage = sendMessage;
    if (options?.bufferFlushMs) {
      this.bufferFlushMs = options.bufferFlushMs;
    }
  }

  // ─── Control ───────────────────────────────────────────────────────────

  /**
   * Send StartStreaming to the producer.
   * Producer will respond with ChannelMetadata then begin pushing data.
   */
  startStreaming(): void {
    this.streaming = true;
    this.sendMessage(PROTOCOL_ID, ChannelStreaming.MsgStartStreaming, {});
    this.startBufferFlush();
    this.emit(ConsumerEvents.STARTED);
  }

  /**
   * Send StopStreaming to the producer.
   */
  stopStreaming(): void {
    this.streaming = false;
    this.sendMessage(PROTOCOL_ID, ChannelStreaming.MsgStopStreaming, {});
    this.stopBufferFlush();
    this.flushBuffer();
    this.emit(ConsumerEvents.STOPPED);
  }

  get isStreaming(): boolean {
    return this.streaming;
  }

  /**
   * Get metadata for all known channels.
   */
  getChannelMetadata(): ChannelMetadataRecord[] {
    return Array.from(this.channelMap.values());
  }

  /**
   * Look up channel metadata by ID.
   */
  getChannel(channelId: number): ChannelMetadataRecord | undefined {
    return this.channelMap.get(channelId);
  }

  // ─── Message Dispatch ──────────────────────────────────────────────────

  /**
   * Handle an incoming message from the producer.
   */
  handleMessage(messageHeader: MessageHeader, messageBody: unknown): void {
    if (messageHeader.protocol !== PROTOCOL_ID) {
      throw new Error(
        `ChannelStreamingConsumer received message for protocol ${messageHeader.protocol}`
      );
    }

    switch (messageHeader.messageType) {
      case ChannelStreaming.MsgChannelMetadata:
        this.onChannelMetadata(
          messageBody as Energistics.Etp.v12.Protocol.ChannelStreaming.ChannelMetadata
        );
        break;
      case ChannelStreaming.MsgChannelData:
        this.onChannelData(
          messageBody as Energistics.Etp.v12.Protocol.ChannelStreaming.ChannelData
        );
        break;
      case ChannelStreaming.MsgTruncateChannels:
        this.onTruncateChannels(
          messageBody as Energistics.Etp.v12.Protocol.ChannelStreaming.TruncateChannels
        );
        break;
      default:
        // Unknown message type — ignore or log
        break;
    }
  }

  // ─── Message Handlers ──────────────────────────────────────────────────

  private onChannelMetadata(
    msg: Energistics.Etp.v12.Protocol.ChannelStreaming.ChannelMetadata
  ): void {
    this.channelMap.clear();
    for (const record of msg.channels) {
      const id = Number(record.id);
      this.channelMap.set(id, record);
    }
    this.emit(ConsumerEvents.METADATA, msg.channels);
  }

  private onChannelData(
    msg: Energistics.Etp.v12.Protocol.ChannelStreaming.ChannelData
  ): void {
    const now = Date.now();
    for (const item of msg.data) {
      const channelId = Number(item.channelId);
      const meta = this.channelMap.get(channelId);
      const point: DecodedDataPoint = {
        channelId,
        channelName: meta?.channelName || `ch_${channelId}`,
        uom: meta?.uom || "",
        index: this.extractIndex(item),
        value: this.extractValue(item.value),
        timestamp: now
      };
      this.buffer.push(point);
    }
  }

  private onTruncateChannels(
    msg: Energistics.Etp.v12.Protocol.ChannelStreaming.TruncateChannels
  ): void {
    this.emit(ConsumerEvents.TRUNCATED, msg.channels);
  }

  // ─── Value Extraction ──────────────────────────────────────────────────

  private extractIndex(item: DataItem): number {
    if (item.indexes.length > 0) {
      const idx = item.indexes[0];
      if (idx.item !== undefined && idx.item !== null) {
        if (typeof idx.item === "bigint") return Number(idx.item);
        if (typeof idx.item === "number") return idx.item;
      }
    }
    return 0;
  }

  private extractValue(dv: Energistics.Etp.v12.Datatypes.DataValue): number | string | boolean | bigint | null {
    if (dv === null || dv === undefined) return null;
    const item = (dv as any).item;
    if (item === null || item === undefined) return null;
    return item;
  }

  // ─── Buffer Management ─────────────────────────────────────────────────

  private startBufferFlush(): void {
    if (this.flushInterval) return;
    this.flushInterval = setInterval(() => this.flushBuffer(), this.bufferFlushMs);
  }

  private stopBufferFlush(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
  }

  private flushBuffer(): void {
    if (this.buffer.length === 0) return;
    const points = this.buffer.splice(0);
    this.emit(ConsumerEvents.DATA, points);
  }

  /**
   * Clean up resources.
   */
  destroy(): void {
    this.stopBufferFlush();
    this.flushBuffer();
    this.removeAllListeners();
  }
}
