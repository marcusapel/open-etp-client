// ============================================================================
// ChannelStreaming WebSocket Server — Standalone ETP streaming endpoint
//
// Runs a WebSocket server that implements ETP Protocol 1 (ChannelStreaming)
// as producer. Consumers connect, send StartStreaming, and receive real-time
// channel data.
//
// This bridges the gap between the RDDMS data store and real-time consumers
// (e.g., drilling dashboards, WITSML streaming clients, Grafana).
//
// Usage:
//   npx ts-node demo/streaming/StreamingServer.ts --dataspace maap/witsml \
//     --log e6ce89d2-569e-5902-bea0-5f9451f7ad08 --port 9003
// ============================================================================

// WebSocket dependency — install with: npm install ws @types/ws
// Using require for portability when running outside etp-client context
let WebSocketServer: any, WebSocket: any;
try {
  const ws = require("ws");
  WebSocketServer = ws.WebSocketServer || ws.Server;
  WebSocket = ws.WebSocket || ws;
} catch {
  // Will be available when running from etp-client directory
  throw new Error("Missing 'ws' package. Run: npm install ws");
}

import { EventEmitter } from "events";
import { randomUUID } from "crypto";
import {
  ChannelStreamingProducer,
  StreamingSession,
  StreamingEvents
} from "./ChannelStreamingProducer";
import {
  ChannelStreamingDataSource,
  DataSourceConfig
} from "./ChannelStreamingDataSource";
import { Energistics } from "../../open-etp-client/src/lib/common/Etp12";

const ChannelStreaming = Energistics.Etp.v12.Protocol.ChannelStreaming;
const PROTOCOL_ID = 1;

// ─── Configuration ───────────────────────────────────────────────────────────

interface ServerConfig {
  port: number;
  dataspace: string;
  logUuid: string;
  oresUrl?: string;
  replayIntervalMs?: number;
  batchSize?: number;
}

// ─── Message Framing ─────────────────────────────────────────────────────────
// Simplified JSON framing for demo. Production would use ETP binary (Avro).

interface WireMessage {
  protocol: number;
  messageType: number;
  messageId: number;
  correlationId: number;
  body: unknown;
}

// ─── Server ──────────────────────────────────────────────────────────────────

export class StreamingServer extends EventEmitter {
  private wss: any = null;
  private producer: ChannelStreamingProducer;
  private dataSource: ChannelStreamingDataSource;
  private config: ServerConfig;
  private messageCounter = 0;

  constructor(config: ServerConfig) {
    super();
    this.config = config;
    this.producer = new ChannelStreamingProducer();
    this.dataSource = new ChannelStreamingDataSource(this.producer, {
      dataspace: config.dataspace,
      logUuid: config.logUuid,
      oresUrl: config.oresUrl || "http://localhost:8000/graphql",
      replayIntervalMs: config.replayIntervalMs || 500,
      batchSize: config.batchSize || 5
    });
  }

  async start(): Promise<void> {
    // Initialize data source (fetches channel metadata + data from ORES)
    console.log(`[StreamingServer] Initializing data source...`);
    console.log(`  dataspace: ${this.config.dataspace}`);
    console.log(`  log UUID:  ${this.config.logUuid}`);

    await this.dataSource.initialize();

    this.dataSource.on("initialized", (info) => {
      console.log(`[StreamingServer] Data source ready: ${info.channelCount} channels, ${info.depthPoints} depth points`);
    });

    this.dataSource.on("replayComplete", () => {
      console.log(`[StreamingServer] Replay complete — all data streamed`);
    });

    // Start WebSocket server
    this.wss = new WebSocketServer({ port: this.config.port });
    console.log(`[StreamingServer] WebSocket listening on ws://localhost:${this.config.port}`);
    console.log(`[StreamingServer] Protocol: ETP 1.2 ChannelStreaming (Protocol 1)`);
    console.log(`[StreamingServer] Waiting for consumers to connect...`);

    this.wss.on("connection", (ws, req) => {
      this.handleConnection(ws, req);
    });

    // Start replay when first consumer connects
    this.producer.on(StreamingEvents.CONSUMER_STARTED, () => {
      if (this.producer.getStreamingSessions().length === 1) {
        console.log(`[StreamingServer] First consumer connected — starting replay`);
        this.dataSource.startReplay();
      }
    });

    this.producer.on(StreamingEvents.CONSUMER_STOPPED, () => {
      if (this.producer.getStreamingSessions().length === 0) {
        console.log(`[StreamingServer] All consumers disconnected — pausing replay`);
        this.dataSource.stopReplay();
      }
    });
  }

  private handleConnection(ws: any, req: any): void {
    const sessionId = randomUUID();
    const remoteAddr = req.socket.remoteAddress || "unknown";
    console.log(`[StreamingServer] Consumer connected: ${sessionId} from ${remoteAddr}`);

    const session: StreamingSession = {
      sessionId,
      isStreaming: false,
      send: (protocol: number, messageType: number, body: unknown) => {
        if (ws.readyState === WebSocket.OPEN) {
          const msg: WireMessage = {
            protocol,
            messageType,
            messageId: ++this.messageCounter,
            correlationId: 0,
            body
          };
          ws.send(JSON.stringify(msg));
        }
      }
    };

    this.producer.addSession(session);

    ws.on("message", (data) => {
      try {
        const msg: WireMessage = JSON.parse(data.toString());
        if (msg.protocol === PROTOCOL_ID) {
          // Build a pseudo-header for the producer
          const header: Energistics.Etp.v12.Datatypes.MessageHeader = {
            protocol: msg.protocol,
            messageType: msg.messageType,
            correlationId: BigInt(msg.correlationId || 0),
            messageId: BigInt(msg.messageId || 0),
            messageFlags: 0
          };
          this.producer.handleMessage(session, header, msg.body);
        }
      } catch (e) {
        console.error(`[StreamingServer] Error handling message from ${sessionId}:`, e);
      }
    });

    ws.on("close", () => {
      console.log(`[StreamingServer] Consumer disconnected: ${sessionId}`);
      this.producer.handleStopStreaming(session);
      this.producer.removeSession(sessionId);
    });

    ws.on("error", (err) => {
      console.error(`[StreamingServer] WebSocket error for ${sessionId}:`, err.message);
    });

    // Send a welcome message with server capabilities
    const welcome: WireMessage = {
      protocol: 0,
      messageType: 0,
      messageId: ++this.messageCounter,
      correlationId: 0,
      body: {
        serverName: "RDDMS ChannelStreaming Producer",
        protocols: [{ protocol: 1, role: "producer" }],
        channels: this.producer.getChannels().map(c => ({
          id: c.id,
          name: c.channelName,
          uom: c.uom,
          dataKind: c.dataKind
        }))
      }
    };
    ws.send(JSON.stringify(welcome));
  }

  stop(): void {
    this.dataSource.stopReplay();
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
    console.log(`[StreamingServer] Stopped`);
  }

  getStatus(): object {
    return {
      port: this.config.port,
      channels: this.producer.getChannels().length,
      activeConsumers: this.producer.getStreamingSessions().length,
      progress: this.dataSource.getProgress()
    };
  }
}

// ─── CLI Entry Point ─────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const config: ServerConfig = {
    port: 9003,
    dataspace: "maap/witsml",
    logUuid: "e6ce89d2-569e-5902-bea0-5f9451f7ad08",
    replayIntervalMs: 500,
    batchSize: 5
  };

  for (let i = 0; i < args.length; i += 2) {
    switch (args[i]) {
      case "--port": config.port = parseInt(args[i + 1]); break;
      case "--dataspace": config.dataspace = args[i + 1]; break;
      case "--log": config.logUuid = args[i + 1]; break;
      case "--ores-url": config.oresUrl = args[i + 1]; break;
      case "--interval": config.replayIntervalMs = parseInt(args[i + 1]); break;
      case "--batch": config.batchSize = parseInt(args[i + 1]); break;
      case "--help":
        console.log(`
RDDMS ChannelStreaming Server — ETP Protocol 1 Producer

Usage:
  npx ts-node demo/streaming/StreamingServer.ts [options]

Options:
  --port <n>        WebSocket port (default: 9003)
  --dataspace <s>   Dataspace name (default: maap/witsml)
  --log <uuid>      Log object UUID to stream
  --ores-url <url>  ORES GraphQL endpoint (default: http://localhost:8000/graphql)
  --interval <ms>   Replay interval in ms (default: 500)
  --batch <n>       Rows per batch (default: 5)

Protocol:
  Consumers connect via WebSocket and send:
    {"protocol": 1, "messageType": 3, "messageId": 1, "correlationId": 0, "body": {}}
  to start receiving channel data.

  Data arrives as:
    {"protocol": 1, "messageType": 2, ..., "body": {"data": [...]}}
`);
        process.exit(0);
    }
  }

  const server = new StreamingServer(config);

  process.on("SIGINT", () => {
    console.log("\n[StreamingServer] Shutting down...");
    server.stop();
    process.exit(0);
  });

  await server.start();
}

// Run if executed directly
if (require.main === module) {
  main().catch(err => {
    console.error("[StreamingServer] Fatal error:", err);
    process.exit(1);
  });
}
