/**
 * @osdu/open-etp-client — TypeScript REST layer for open-etp-server.
 *
 * Architecture (matching OSDU Reservoir DDMS design):
 *   [REST clients] → [this service :8080] → [open-etp-server :9002 via ETP 1.2 WS]
 *                                          → [PostgreSQL]
 */

import * as dotenv from "dotenv";
import { EtpClient } from "./etp";
import { createRestServer } from "./restApi";

// Load config
dotenv.config({ path: "config.default.env" });
dotenv.config({ path: "config.user.env", override: true });

const ETP_SERVER_URL = process.env.ETP_SERVER_URL || "ws://localhost:9002";
const REST_PORT = parseInt(process.env.REST_PORT || "8080", 10);
const REST_HOST = process.env.REST_HOST || "0.0.0.0";
const DATA_PARTITION_ID = process.env.ETP_DATA_PARTITION_ID || "opendes";

async function main() {
  console.log("┌─────────────────────────────────────────────────┐");
  console.log("│  @osdu/open-etp-client                          │");
  console.log("│  REST API for Reservoir DDMS                    │");
  console.log("│                                                 │");
  console.log(`│  ETP Server:  ${ETP_SERVER_URL.padEnd(33)}│`);
  console.log(`│  REST:        http://${REST_HOST}:${REST_PORT}`.padEnd(50) + "│");
  console.log("│                                                 │");
  console.log("│  WITSML: v1.4.1 + v2.1 (via ETP)               │");
  console.log("│  RESQML: v2.0.1 + v2.2 (via ETP)               │");
  console.log("│  PRODML: v2.2 (via ETP)                         │");
  console.log("│  Manifests: OSDU M27                            │");
  console.log("└─────────────────────────────────────────────────┘");

  // Connect to ETP server
  const etpClient = new EtpClient({
    serverUrl: ETP_SERVER_URL,
    dataPartitionId: DATA_PARTITION_ID,
  });

  try {
    await etpClient.openSession();
    console.log(`[etp-client] Connected to ETP server at ${ETP_SERVER_URL}`);
  } catch (err: any) {
    console.error(`[etp-client] Failed to connect to ETP server: ${err.message}`);
    console.error("[etp-client] Starting REST server anyway (ETP calls will fail until reconnected)");
  }

  // Start REST server
  const app = createRestServer({ port: REST_PORT, host: REST_HOST, etpClient });
  app.listen(REST_PORT, REST_HOST, () => {
    console.log(`[etp-client] REST API listening on ${REST_HOST}:${REST_PORT}`);
  });

  // Graceful shutdown
  process.on("SIGTERM", async () => {
    console.log("[etp-client] Shutting down...");
    await etpClient.closeSession();
    process.exit(0);
  });
  process.on("SIGINT", async () => {
    console.log("[etp-client] Shutting down...");
    await etpClient.closeSession();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error("[etp-client] Fatal:", err);
  process.exit(1);
});
