# Demo — ETP Protocols, WITSML & OSDU Catalog Pipeline

End-to-end demos for ETP 1.2 protocol operations, WITSML ingestion, and OSDU
manifest generation using the **@osdu/open-etp-client** (Emerson NestJS client).

## Prerequisites

```bash
# ETP server (C++ openETPServer via Docker or binary)
openETPServer -j --stopOnLastDisconnection 0 --ws-port 9002 \
  --authN none --authZ none --pg "host=localhost port=5433 ..."

# @osdu/open-etp-client REST API (NestJS, port 3000)
cd open-etp-client && npm run start   # → http://localhost:3000

# Alternatively via Docker Compose (postgres + etp-server + etp-client)
cd /path/to/drogonresqml && docker compose up -d
```

**API base URL:** `http://localhost:3000/api/reservoir-ddms/v2`

**Required headers:**
```
Authorization: Bearer dummy
data-partition-id: opendes
```

## Directory Structure

```
demo/
├── README.md                       # This file
├── demo_protocols.sh               # ETP protocol demos (Discovery/Store/GrowingObject/Channel)
├── demo_witsml.sh                  # WITSML store operations (Well/Wellbore/WellLog)
├── demo_compare_wells.sh           # RESQML vs WITSML well comparison
├── scripts/
│   ├── dlis_to_witsml.py           # DLIS → WITSML 1.4/2.1 → RDDMS
│   ├── ingest_osdu.ts              # RDDMS → OSDU catalogs (all instances)
│   ├── ingest_drogon_witsml.sh     # Drogon field dataset ingestion
│   ├── test_roundtrip.sh           # Integration tests (20 assertions)
│   ├── drogon_roundtrip.test.ts    # TypeScript round-trip test
│   └── ingest_preship.ts           # Single-instance ingestion
├── witsml-samples/                 # WITSML XML test fixtures
├── witsml-guide.md                 # WITSML implementation guide
└── manifests/                      # Generated OSDU M27 manifests
```

## Protocol Demos

### `demo_protocols.sh` — ETP 1.2 Protocol Capabilities

Demonstrates DiscoveryQuery, StoreQuery, GrowingObject, and ChannelSubscribe
protocols via the REST API.

```bash
./demo/demo_protocols.sh [CLIENT_URL] [DATASPACE]
# Default: http://localhost:3000/api/reservoir-ddms/v2, maap/drogon
```

**Endpoints exercised:**
- `POST /query/resources/find` — DiscoveryQuery (Protocol 13)
- `POST /query/objects/find` — StoreQuery (Protocol 14)
- `POST /query/growing/metadata` — GrowingObject (Protocol 6)
- `POST /query/channels/metadata` — ChannelSubscribe (Protocol 21)

### `demo_witsml.sh` — WITSML Store Operations

Creates a dataspace and ingests WITSML 2.1 Well/Wellbore objects, then queries
and builds OSDU manifests.

```bash
./demo/demo_witsml.sh [CLIENT_URL] [DATASPACE]
```

### `demo_compare_wells.sh` — RESQML vs WITSML Comparison

Shows how the same wells can coexist in both RESQML and WITSML representations
within a single ETP dataspace for cross-domain queries.

```bash
./demo/demo_compare_wells.sh [CLIENT_URL]
```

## Scripts

### `ingest_osdu.ts` — RDDMS → OSDU (All Instances)

```bash
npx tsx demo/scripts/ingest_osdu.ts --all --dataspace maap/witsml
```

### `dlis_to_witsml.py` — DLIS File Conversion

```bash
python3 demo/scripts/dlis_to_witsml.py --dlis myfile.dlis --dataspace maap/witsml
```

### `test_roundtrip.sh` — Integration Test

```bash
bash demo/scripts/test_roundtrip.sh
```

### `ingest_drogon_witsml.sh` — Drogon Dataset

```bash
bash demo/scripts/ingest_drogon_witsml.sh
```

## Quick Manual Operations

```bash
API="http://localhost:3000/api/reservoir-ddms/v2"

# Ingest a WITSML 1.4.1 well
xml=$(cat demo/witsml-samples/wells_141.xml)
curl -s -X PUT "$API/witsml/store" \
  -H "Authorization: Bearer dummy" \
  -H "data-partition-id: opendes" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg ds "maap/witsml" --arg xml "$xml" '{dataspace: $ds, xml: $xml}')"

# List resources in dataspace
curl -s "$API/dataspaces/maap%2Fwitsml/resources" \
  -H "Authorization: Bearer dummy" \
  -H "data-partition-id: opendes" | python3 -m json.tool

# Query protocols
curl -s -X POST "$API/query/resources/find" \
  -H "Authorization: Bearer dummy" \
  -H "data-partition-id: opendes" \
  -H "Content-Type: application/json" \
  -d '{"uri": "eml:///dataspace('\''maap/drogon'\'')", "scope": "targets"}'
```

## WITSML Samples

| File | Version | Content |
|------|---------|---------|
| `wells_141.xml` | 1.4.1 | 2 wells (DROGON A-1, A-2) |
| `log_141.xml` | 1.4.1 | Composite log (GR/DT/NPHI/RHOB, 5 rows) |
| `trajectory_141.xml` | 1.4.1 | Drilled trajectory (5 stations, 0–2000m) |
| `log_131.xml` | 1.3.1 | Legacy sonic log (3 rows) |
| `well_21.xml` | 2.1 | Single well (DROGON C-1) |
| `channelset_21.xml` | 2.1 | ChannelSet with GR/DT/RHOB |
