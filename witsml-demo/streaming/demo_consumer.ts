// ============================================================================
// Demo consumer — connects to the StreamingServer and prints channel data
//
// Usage:
//   npx ts-node demo/streaming/demo_consumer.ts [--url ws://localhost:9003]
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-var-requires
const WS = require("ws");

const url = process.argv.includes("--url")
  ? process.argv[process.argv.indexOf("--url") + 1]
  : "ws://localhost:9003";

console.log(`[Consumer] Connecting to ${url}...`);

const ws: any = new WS(url);
let channelNames: Map<number, string> = new Map();
let dataCount = 0;

ws.on("open", () => {
  console.log(`[Consumer] Connected. Sending StartStreaming...`);
  // Send StartStreaming (Protocol 1, MessageType 3)
  ws.send(JSON.stringify({
    protocol: 1,
    messageType: 3,
    messageId: 1,
    correlationId: 0,
    body: {}
  }));
});

ws.on("message", (raw) => {
  const msg = JSON.parse(raw.toString());

  // Welcome message (protocol 0)
  if (msg.protocol === 0) {
    console.log(`[Consumer] Server: ${msg.body.serverName}`);
    console.log(`[Consumer] Available channels:`);
    for (const ch of msg.body.channels || []) {
      console.log(`  [${ch.id}] ${ch.name} (${ch.uom})`);
    }
    return;
  }

  // ChannelMetadata (protocol 1, type 1)
  if (msg.protocol === 1 && msg.messageType === 1) {
    const channels = msg.body.channels || [];
    console.log(`[Consumer] Received metadata for ${channels.length} channels:`);
    for (const ch of channels) {
      const id = Number(ch.id);
      channelNames.set(id, ch.channelName);
      console.log(`  [${id}] ${ch.channelName} (${ch.uom}) — ${ch.dataKind}`);
    }
    return;
  }

  // ChannelData (protocol 1, type 2)
  if (msg.protocol === 1 && msg.messageType === 2) {
    const items = msg.body.data || [];
    for (const item of items) {
      const chId = Number(item.channelId);
      const name = channelNames.get(chId) || `ch_${chId}`;
      const idx = item.indexes?.[0]?.item ?? "?";
      const val = item.value?.item ?? "null";
      dataCount++;
      process.stdout.write(
        `\r[Consumer] ${name.padEnd(8)} @ ${String(idx).padStart(8)} = ${String(val).padStart(10)} (total: ${dataCount})`
      );
    }
    return;
  }

  // TruncateChannels (protocol 1, type 5)
  if (msg.protocol === 1 && msg.messageType === 5) {
    console.log(`\n[Consumer] Channels truncated`);
    return;
  }
});

ws.on("close", () => {
  console.log(`\n[Consumer] Disconnected. Received ${dataCount} data points.`);
  process.exit(0);
});

ws.on("error", (err) => {
  console.error(`[Consumer] Error:`, err.message);
  process.exit(1);
});

// Stop after 60s or Ctrl+C
setTimeout(() => {
  console.log(`\n[Consumer] Timeout — stopping.`);
  ws.send(JSON.stringify({
    protocol: 1,
    messageType: 4, // StopStreaming
    messageId: 2,
    correlationId: 0,
    body: {}
  }));
  ws.close();
}, 60000);

process.on("SIGINT", () => {
  console.log(`\n[Consumer] Interrupted — sending StopStreaming.`);
  ws.send(JSON.stringify({
    protocol: 1,
    messageType: 4,
    messageId: 2,
    correlationId: 0,
    body: {}
  }));
  ws.close();
});
