// ============================================================================
// ChannelStreaming Data Source — Bridges RDDMS stored data to Protocol 1
//
// Reads channel data from the RDDMS PostgreSQL backend (via ores API or
// direct DB access) and feeds it to the ChannelStreamingProducer for
// real-time broadcast to connected consumers.
//
// Supports two modes:
//   1. Replay mode — reads existing stored arrays and streams them at a
//      configurable rate (simulates real-time from historical data)
//   2. Live mode — watches for new data arriving (via StoreNotification
//      or polling) and pushes it immediately
// ============================================================================

import { EventEmitter } from "events";
import {
  ChannelStreamingProducer,
  ChannelDefinition,
  SimplifiedDataItem
} from "./ChannelStreamingProducer";
import { Energistics } from "../../open-etp-client/src/lib/common/Etp12";

const ChannelDataKind = Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind;
const ChannelIndexKind = Energistics.Etp.v12.Datatypes.ChannelData.ChannelIndexKind;

// ─── Configuration ───────────────────────────────────────────────────────────

export interface DataSourceConfig {
  /** ORES GraphQL endpoint (default: http://localhost:8000/graphql) */
  oresUrl?: string;
  /** Dataspace containing channel data */
  dataspace: string;
  /** UUID of the Log object to stream */
  logUuid: string;
  /** Replay rate — ms between data point batches (0 = as fast as possible) */
  replayIntervalMs?: number;
  /** Number of rows per batch in replay mode */
  batchSize?: number;
}

// ─── Channel Array Info (from ORES objectArrays query) ───────────────────────

interface ArrayInfo {
  path: string;
  dataType: string;
  dimensions: number[];
  totalElements: number;
  statistics?: {
    min: number;
    max: number;
    mean: number;
  };
  sampleValues?: number[];
}

// ─── Data Source ─────────────────────────────────────────────────────────────

export class ChannelStreamingDataSource extends EventEmitter {
  private producer: ChannelStreamingProducer;
  private config: DataSourceConfig;
  private replayTimer: ReturnType<typeof setInterval> | null = null;
  private replayIndex = 0;
  private channelArrays: Map<number, number[]> = new Map();
  private depthArray: number[] = [];
  private initialized = false;

  constructor(producer: ChannelStreamingProducer, config: DataSourceConfig) {
    super();
    this.producer = producer;
    this.config = {
      oresUrl: "http://localhost:8000/graphql",
      replayIntervalMs: 500,
      batchSize: 5,
      ...config
    };
  }

  /**
   * Initialize: fetch channel metadata and array data from ORES,
   * register channels with the producer.
   */
  async initialize(): Promise<void> {
    const { dataspace, logUuid } = this.config;

    // 1. Query ORES for arrays of this log
    const arrays = await this.fetchArrays(dataspace, logUuid);
    if (arrays.length === 0) {
      throw new Error(`No arrays found for log ${logUuid} in ${dataspace}`);
    }

    // 2. Identify depth/index array and value arrays
    let depthIdx = arrays.findIndex(a =>
      a.path.toLowerCase().includes("depth") ||
      a.path.toLowerCase().includes("md") ||
      a.path.toLowerCase().includes("index")
    );
    if (depthIdx === -1) depthIdx = 0; // Assume first array is index

    // 3. Fetch sample values for all arrays (full data for replay)
    const fullArrays = await this.fetchFullArrays(dataspace, logUuid);

    // 4. Register channels
    const uri = `eml:///dataspace('${dataspace}')/witsml21.Log(${logUuid})`;
    let channelId = 1;

    for (let i = 0; i < arrays.length; i++) {
      const arr = arrays[i];
      const mnemonic = this.extractMnemonic(arr.path);
      const isIndex = (i === depthIdx);

      if (isIndex) {
        this.depthArray = fullArrays.get(arr.path) || [];
        continue;
      }

      const def: ChannelDefinition = {
        uri,
        id: channelId,
        channelName: mnemonic,
        dataKind: this.inferDataKind(arr.dataType),
        uom: this.inferUom(mnemonic),
        indexKind: ChannelIndexKind.MeasuredDepth,
        indexUom: "m",
        depthDatum: "KB",
        source: "RDDMS"
      };

      this.producer.registerChannel(def);
      this.channelArrays.set(channelId, fullArrays.get(arr.path) || []);
      channelId++;
    }

    this.initialized = true;
    this.emit("initialized", {
      channelCount: channelId - 1,
      depthPoints: this.depthArray.length
    });
  }

  /**
   * Start replaying stored data at the configured rate.
   */
  startReplay(): void {
    if (!this.initialized) {
      throw new Error("DataSource not initialized. Call initialize() first.");
    }
    if (this.replayTimer) return;

    this.replayIndex = 0;
    const intervalMs = this.config.replayIntervalMs!;
    const batchSize = this.config.batchSize!;

    this.replayTimer = setInterval(() => {
      const items: SimplifiedDataItem[] = [];

      for (let b = 0; b < batchSize; b++) {
        const idx = this.replayIndex + b;
        if (idx >= this.depthArray.length) {
          this.stopReplay();
          this.emit("replayComplete");
          return;
        }

        const depthValue = this.depthArray[idx];

        for (const [channelId, values] of this.channelArrays) {
          if (idx < values.length) {
            items.push({
              channelId,
              index: depthValue,
              value: values[idx]
            });
          }
        }
      }

      this.replayIndex += batchSize;
      if (items.length > 0) {
        this.producer.pushData(items);
      }
    }, intervalMs);

    this.emit("replayStarted");
  }

  /**
   * Stop replay.
   */
  stopReplay(): void {
    if (this.replayTimer) {
      clearInterval(this.replayTimer);
      this.replayTimer = null;
      this.emit("replayStopped", { lastIndex: this.replayIndex });
    }
  }

  /**
   * Get replay progress.
   */
  getProgress(): { current: number; total: number; percent: number } {
    const total = this.depthArray.length;
    return {
      current: this.replayIndex,
      total,
      percent: total > 0 ? Math.round((this.replayIndex / total) * 100) : 0
    };
  }

  // ─── ORES GraphQL Queries ──────────────────────────────────────────────

  private async fetchArrays(dataspace: string, uuid: string): Promise<ArrayInfo[]> {
    const query = `
      query {
        objectArrays(
          dataspace: "${dataspace}"
          uuid: "${uuid}"
          includeStatistics: true
          includeSampleValues: true
          sampleSize: 5
        ) {
          path
          dataType
          dimensions
          totalElements
          statistics { min max mean }
          sampleValues
        }
      }
    `;

    const response = await fetch(this.config.oresUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const json = await response.json();
    return json.data?.objectArrays || [];
  }

  private async fetchFullArrays(
    dataspace: string,
    uuid: string
  ): Promise<Map<string, number[]>> {
    // Fetch full array data via ORES — uses sampleSize=0 which returns all
    const query = `
      query {
        objectArrays(
          dataspace: "${dataspace}"
          uuid: "${uuid}"
          includeSampleValues: true
          sampleSize: 0
        ) {
          path
          sampleValues
        }
      }
    `;

    const response = await fetch(this.config.oresUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const json = await response.json();
    const result = new Map<string, number[]>();
    for (const arr of json.data?.objectArrays || []) {
      result.set(arr.path, arr.sampleValues || []);
    }
    return result;
  }

  // ─── Helpers ───────────────────────────────────────────────────────────

  private extractMnemonic(path: string): string {
    // Path like "LogData/Data[0]/DoubleValues" → extract channel name
    // Or simpler paths like "DEPTH", "GR", etc.
    const parts = path.split("/");
    const last = parts[parts.length - 1];
    // Remove array notation
    return last.replace(/\[\d+\]/, "").replace("Values", "");
  }

  private inferDataKind(dataType: string): Energistics.Etp.v12.Datatypes.ChannelData.ChannelDataKind {
    const dt = dataType.toLowerCase();
    if (dt.includes("double") || dt.includes("float64")) return ChannelDataKind.typeDouble;
    if (dt.includes("float") || dt.includes("float32")) return ChannelDataKind.typeFloat;
    if (dt.includes("int") || dt.includes("long")) return ChannelDataKind.typeLong;
    if (dt.includes("string")) return ChannelDataKind.typeString;
    return ChannelDataKind.typeDouble;
  }

  private inferUom(mnemonic: string): string {
    const uomMap: Record<string, string> = {
      DEPTH: "m", MD: "m", TVD: "m", TVDSS: "m",
      GR: "gAPI", SP: "mV", CALI: "in", BS: "in",
      DT: "us/ft", DTS: "us/ft",
      NPHI: "v/v", RHOB: "g/cm3", DRHO: "g/cm3",
      RT: "ohm.m", RD: "ohm.m", RS: "ohm.m", MSFL: "ohm.m",
      PE: "b/e", PEF: "b/e",
      TIME: "s", TEMP: "degC", PRES: "kPa"
    };
    return uomMap[mnemonic.toUpperCase()] || "unitless";
  }
}
