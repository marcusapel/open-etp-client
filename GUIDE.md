# RDDMS — Reservoir Data Domain Management Service

ETP 1.2 client with WITSML support, built on the **@osdu/open-etp-client**
(Emerson open-source NestJS implementation).

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  @osdu/open-etp-client (NestJS REST API, port 3000)             │
│                                                                 │
│  ┌─── Protocols ───────────────────────────────────────────┐    │
│  │ Discovery (3)          │ DiscoveryQuery (13)            │    │
│  │ Store (4)              │ StoreQuery (14)                │    │
│  │ GrowingObject (6)      │ GrowingObjectNotification (7)  │    │
│  │ ChannelSubscribe (21)  │ Transaction (18)               │    │
│  │ Dataspace (24)         │ SupportedTypes (25)            │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  ┌─── REST Modules ───────────────────────────────────────┐    │
│  │ read-etp.module   — GET resources, objects, dataspaces  │    │
│  │ write-etp.module  — PUT objects, transactions           │    │
│  │ witsml.module     — WITSML parse, store, query          │    │
│  │ query.module      — DiscoveryQuery, GrowingObject,      │    │
│  │                     ChannelSubscribe REST endpoints      │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  WebSocket ──────► ETP 1.2 (Avro binary) ──────► ETP Server    │
└─────────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────┐    ┌──────────────────────────┐
│  openETPServer (C++)     │───▶│  PostgreSQL (port 5433)   │
│  ws://localhost:9002     │    │  RESQML + WITSML objects  │
└─────────────────────────┘    └──────────────────────────┘
```

## Quick Start

```bash
# 1. Start infrastructure (from Docker Compose)
cd /path/to/drogonresqml && docker compose up -d

# 2. Verify
curl -s http://localhost:3000/api/reservoir-ddms/v2/dataspaces \
  -H "Authorization: Bearer dummy" \
  -H "data-partition-id: opendes"

# 3. Run demos
./demo/demo_protocols.sh
./demo/demo_witsml.sh
```

## Project Structure

```
rddms/
├── open-etp-client/           # @osdu/open-etp-client v1.3.0 (extended)
│   ├── src/
│   │   ├── lib/
│   │   │   ├── client/        # ResqmlClient (main ETP orchestrator)
│   │   │   ├── protocols/     # ETP protocol handlers
│   │   │   ├── restApi/       # NestJS REST controllers
│   │   │   │   ├── read-etp.module/
│   │   │   │   ├── write-etp.module/
│   │   │   │   ├── witsml.module/    ← NEW
│   │   │   │   └── query.module/     ← NEW
│   │   │   ├── common/        # Etp12 types, ResponseHandlers, Logging
│   │   │   └── mlTypes/       # XML/JSON utilities
│   │   └── __tests__/         # Jest integration tests
│   ├── demo/                  # Source demo scripts (also at repo root)
│   └── package.json           # @osdu/open-etp-client
├── demo/                      # Root-level demos & guides
│   ├── demo_protocols.sh      # ETP protocol demo
│   ├── demo_witsml.sh         # WITSML operations demo
│   ├── demo_compare_wells.sh  # RESQML vs WITSML comparison
│   ├── witsml-guide.md        # Implementation guide
│   ├── scripts/               # Ingestion & test scripts
│   ├── witsml-samples/        # WITSML XML fixtures
│   └── manifests/             # Generated OSDU manifests
├── open-etp-server/           # Reference: C++ ETP server (Emerson)
├── src/                       # C++ RDDMS components (legacy)
├── include/                   # C++ headers
├── tests/                     # C++ tests
└── k8s/                       # Kubernetes deployment manifests
```

## ETP Protocols Implemented

| Protocol | ID | Role | Description |
|----------|-----|------|-------------|
| Discovery | 3 | customer | URI-based resource tree navigation |
| Store | 4 | customer | Get/Put/Delete individual data objects |
| GrowingObject | 6 | customer | Well log parts (append, range query) |
| GrowingObjectNotification | 7 | customer | Real-time part change events |
| DiscoveryQuery | 13 | customer | Filtered resource enumeration |
| StoreQuery | 14 | customer | Bulk object retrieval with content |
| Transaction | 18 | customer | Atomic write operations |
| ChannelSubscribe | 21 | customer | Real-time channel streaming |
| Dataspace | 24 | customer | Create/delete dataspaces |
| SupportedTypes | 25 | customer | Schema discovery |

## WITSML Support

**REST endpoints** (`/api/reservoir-ddms/v2/witsml/...`):

| Method | Path | Description |
|--------|------|-------------|
| PUT | `/witsml/store` | Parse & ingest WITSML XML (1.3.1, 1.4.1, 2.1) |
| GET | `/witsml/store/:dataspace` | Query objects by type/name |
| POST | `/witsml/query` | WITSML query with filter |
| GET | `/witsml/parse` | Parse WITSML XML without ingestion |

**Supported WITSML object types:**
- Well, Wellbore, WellLog, Log, Trajectory, ChannelSet
- Automatic version detection (1.3.1 → 1.4.1 → 2.1)
- Converts all versions to ETP-compatible energyml DataObjects

## Query Protocol Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/query/resources/find` | DiscoveryQuery — find resources with filters |
| POST | `/query/objects/find` | StoreQuery — get objects with XML content |
| POST | `/query/growing/metadata` | GrowingObject — parts metadata |
| POST | `/query/growing/range` | GrowingObject — parts by depth/time range |
| POST | `/query/channels/metadata` | ChannelSubscribe — channel curve info |

## Development

```bash
cd open-etp-client

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Type-check only
npx tsc --noEmit

# Start dev server
npm run start:dev
```

## Testing

```bash
# Unit/integration tests (Jest)
cd open-etp-client && npm test

# Protocol integration tests (requires running ETP server)
cd open-etp-client && npx jest src/__tests__/TestProtocols.ts

# End-to-end roundtrip
bash demo/scripts/test_roundtrip.sh
```

## Docker

```bash
# Build extended client image
cd open-etp-client && docker build -t rddms-etp-client .

# Run with ETP server
docker run -p 3000:3000 \
  -e ETP_URL=ws://etp-server:9002 \
  rddms-etp-client
```

## Migration from Custom Node.js Client

The previous custom `etp-client/` (Node.js, port 8080) has been removed.
All functionality is now in `open-etp-client/` (NestJS, port 3000):

| Old (etp-client) | New (open-etp-client) |
|---|---|
| Custom WebSocket + manual Avro | Official Emerson ETP 1.2 stack |
| Missing Transaction protocol | Full Transaction support |
| Port 8080 | Port 3000 |
| No DiscoveryQuery/StoreQuery | Full protocol coverage |
| Broken ProtocolException handling | Production-grade error handling |
| Manual WITSML parsing | Integrated WITSML module |

**API paths remain the same:** `/api/reservoir-ddms/v2/...`
