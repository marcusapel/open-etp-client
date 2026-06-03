# ETP ChannelStreaming (Protocol 1) — Demo Implementation

Server-side (producer) and client-side (consumer) handlers for ETP 1.2 Protocol 1.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    StreamingServer.ts                         │
│                                                              │
│  ┌──────────────────┐     ┌───────────────────────────────┐ │
│  │  DataSource       │────▶│  ChannelStreamingProducer     │ │
│  │  (ORES/PG)        │     │                               │ │
│  │                   │     │  • registerChannel()          │ │
│  │  • fetchArrays()  │     │  • pushData()                 │ │
│  │  • startReplay()  │     │  • handleStartStreaming()     │ │
│  └──────────────────┘     │  • handleStopStreaming()      │ │
│                            └──────────┬────────────────────┘ │
│                                       │ WebSocket            │
└───────────────────────────────────────┼──────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   ▼                   │
                    │   ChannelStreamingConsumer.ts         │
                    │                                       │
                    │   • startStreaming()                  │
                    │   • on("data", handler)               │
                    │   • on("metadata", handler)           │
                    └───────────────────────────────────────┘
```

## Protocol 1 Message Flow

```
Consumer                          Producer
   │                                 │
   │──── StartStreaming (3) ────────▶│
   │                                 │
   │◀──── ChannelMetadata (1) ──────│  (announces available channels)
   │                                 │
   │◀──── ChannelData (2) ──────────│  (real-time data points)
   │◀──── ChannelData (2) ──────────│
   │◀──── ChannelData (2) ──────────│
   │              ...                │
   │                                 │
   │──── StopStreaming (4) ─────────▶│
   │                                 │
```

## Files

| File | Role | Description |
|------|------|-------------|
| `ChannelStreamingProducer.ts` | Server | Protocol 1 producer — manages channels, broadcasts data |
| `ChannelStreamingConsumer.ts` | Client | Protocol 1 consumer — receives and decodes data |
| `ChannelStreamingDataSource.ts` | Server | Bridges ORES/PostgreSQL arrays to the producer |
| `StreamingServer.ts` | Server | WebSocket server + CLI entry point |
| `demo_consumer.ts` | Client | Demo consumer that prints received data |

## Running the Demo

### Prerequisites
- ORES running on `localhost:8000` with data loaded
- ETP server running on `localhost:9002` (for the data source)
- `ws` package available (`npm install ws`)

### Start the Streaming Server

```bash
cd /home/maap/rddms
npx ts-node demo/streaming/StreamingServer.ts \
  --dataspace maap/witsml \
  --log 700a0b4f-316f-54ee-b744-05c5ea27b7f5 \
  --port 9003 \
  --interval 200 \
  --batch 3
```

### Connect a Consumer

```bash
npx ts-node demo/streaming/demo_consumer.ts --url ws://localhost:9003
```

### Manual WebSocket Test

```bash
# Using wscat:
wscat -c ws://localhost:9003

# Send StartStreaming:
{"protocol":1,"messageType":3,"messageId":1,"correlationId":0,"body":{}}

# You'll receive ChannelMetadata then continuous ChannelData messages
```

## Integration with open-etp-server

To add Protocol 1 support to the C++ server:

1. **Register protocol** in the session capabilities during `RequestSession`/`OpenSession`:
   ```
   supportedProtocols: [..., { protocol: 1, role: "producer", ... }]
   ```

2. **Handle consumer messages** (`StartStreaming`, `StopStreaming`) in the message dispatcher

3. **Connect to data source** — either:
   - Poll PostgreSQL `ary` table for new data
   - Listen to `StoreNotification` for object updates
   - Connect to an external WITSML real-time feed

4. **Broadcast** `ChannelMetadata` on start, then `ChannelData` as data arrives

## Wire Format (JSON Demo Mode)

Messages are JSON-encoded for this demo. Production ETP uses Avro binary.

```json
{
  "protocol": 1,
  "messageType": 2,
  "messageId": 42,
  "correlationId": 0,
  "body": {
    "data": [
      {
        "channelId": 1,
        "indexes": [{"item": 100.5}],
        "value": {"item": 45.2},
        "valueAttributes": []
      }
    ]
  }
}
```

## Key Differences: Protocol 1 vs Protocol 21

| Aspect | Protocol 1 (ChannelStreaming) | Protocol 21 (ChannelSubscribe) |
|--------|------------------------------|-------------------------------|
| Direction | Push (producer decides what to send) | Pull (customer selects channels) |
| Roles | producer / consumer | store / customer |
| Filtering | None — all registered channels stream | Per-channel subscription |
| Use case | Real-time drilling data, live sensors | On-demand historical + live |
| Complexity | Simple (start/stop) | Complex (subscribe/unsubscribe/ranges) |
| Already in server | No | Yes (Protocol 21 implemented) |

## Next Steps

- [ ] Integrate into `open-etp-server` as C++ handler
- [ ] Add binary Avro framing (replace JSON demo mode)
- [ ] Connect to real WITSML real-time feed (WITSML 2.0 growing objects)
- [ ] Add backpressure handling (pause replay if consumer is slow)
- [ ] Support multiple concurrent data sources (multiple logs)
- [ ] Add Grafana WebSocket plugin for live visualization
