# WITSML in RDDMS — Architecture & Query Guide

## Quick Start

```bash
# Start full stack (Docker ETP+PG, etp-client, ORES web)
ores3

# Start with WITSML data ingestion
ores3 --ingest

# Stack ports:
#   8000  ORES web UI (GraphQL, Keys, search)
#   8080  etp-client REST bridge
#   9002  ETP WebSocket server (Docker)
#   5433  PostgreSQL (Docker) — single source of truth
```

Dataspaces after ingestion:
- `maap/drogon` — Drogon RESQML (490 objects, structural model)
- `maap/witsml` — 8 Wells + 8 Wellbores + 8 Logs (GR, RHOB, NPHI, DT)

---

## What Is Supported

### WITSML Versions

| Version | Parsing | Storage | Round-trip |
|---------|---------|---------|------------|
| **1.3.1** | ✅ 29 object types | ✅ via 2.1 envelope | ✅ original XML preserved in CustomData |
| **1.4.1** | ✅ 29 object types | ✅ via 2.1 envelope | ✅ original XML preserved in CustomData |
| **2.0** | ✅ 31 object types | ✅ native | ✅ |
| **2.1** | ✅ 31 object types | ✅ native | ✅ |

### Object Types (60 total)

**Core:** Well, Wellbore, Log, ChannelSet, Channel, Trajectory

**Drilling:** BhaRun, CementJob, MudLog/MudLogReport, DrillReport, Rig, Tubular, WbGeometry, FluidsReport, OpsReport

**Completions:** WellCompletion, WellboreCompletion, CompletionDesign, PerforationSet, DownholeComponent

**Surveys & Markers:** DeviationSurvey, SurveyProgram, WellboreMarker, WellboreMarkerSet, FormationMarker, Target, ToolErrorModel, ToolErrorTermSet

**Stimulation:** StimJob, StimJobStage

**Geology:** WellboreGeology, CuttingsGeology, InterpretedGeology, ShowEvaluation

**Real-time & Legacy:** RealTime, DtsInstalledSystem, DtsMeasurement, DepthRegImage, Risk, Message, ChangeLog, Attachment, ObjectGroup

---

## Data Models Compared: How Wells Are Stored in OSDU

### Three Storage Paths for Well Data

```
┌───────────────────────────────────────────────────────────────────────┐
│                        OSDU Platform                                   │
├──────────────────┬──────────────────┬─────────────────────────────────┤
│  OSDU Well SoR   │  RDDMS (WITSML)  │  RDDMS (RESQML)               │
│  (Search/Storage)│  (ETP Server)    │  (ETP Server)                  │
├──────────────────┼──────────────────┼─────────────────────────────────┤
│ master-data--Well│ witsml21.Well    │ resqml20.WellboreFeature        │
│ master-data--    │ witsml21.Wellbore│ resqml20.WellboreInterpretation │
│   Wellbore       │ witsml21.Log     │ resqml20.WellboreFrame          │
│ wpc--WellLog     │ witsml21.Channel │ resqml20.WellboreTrajectory     │
│ wpc--Wellbore    │ witsml21.        │ resqml20.DeviationSurvey        │
│   Trajectory     │   Trajectory     │   Representation                │
│ wpc--Wellbore    │ witsml21.        │                                 │
│   MarkerSet      │   WellboreMarker │                                 │
├──────────────────┼──────────────────┼─────────────────────────────────┤
│ Flat key/value   │ Full XML objects │ EPC topology graphs             │
│ Limited schema   │ Curve data       │ Grid attachments                │
│ No real-time     │ Real-time capable│ Static model                    │
│ Needs ingestion  │ Queryable by ETP │ Queryable by ETP                │
│   workflow       │ Self-contained   │ Self-contained                  │
└──────────────────┴──────────────────┴─────────────────────────────────┘
```

### Why RDDMS Is Best for WITSML

| Criterion | OSDU Well SoR | RDDMS (WITSML) | Advantage |
|-----------|---------------|----------------|-----------|
| **Lossless storage** | Flattened to OSDU schema | Full XML preserved | RDDMS — no data loss |
| **Curve data** | External blob reference | Inline in ChannelSet | RDDMS — self-contained |
| **Real-time** | Not supported | ETP ChannelStreaming | RDDMS — native streaming |
| **Query depth** | OSDU Search (string match) | ETP Discovery + XPath | RDDMS — structural queries |
| **Interop** | OSDU-only consumers | Any ETP 1.2 client | RDDMS — standard protocol |
| **Versioning** | OSDU record versions | ETP object versions + timestamps | Both |
| **Multi-well ops** | One record at a time | Dataspace transactions | RDDMS — atomic bulk ops |
| **Ingestion latency** | Manifest → workflow → index | Direct PUT → immediate query | RDDMS — instant |

**Key insight:** The OSDU Well System of Record stores *metadata about* wells. RDDMS stores *the actual well data* (curves, XML, relationships). They complement each other — RDDMS is the domain store, OSDU SoR is the catalog index.

---

## Energistics Common (EML) — Role in RDDMS

EML Common v2 provides shared elements used across WITSML, RESQML, and PRODML:

| EML Element | Role in RDDMS | Where Used |
|-------------|---------------|------------|
| **Citation** | Object identity (Title, UUID, Originator, Creation date) | Every stored object — ETP server indexes by `<eml:Citation>` |
| **DataObjectReference** | Cross-object links (Well→Wellbore→Log) | Relationship graph (`.rel` PG table) |
| **Measure / AbstractMeasure** | Units of measure (UoM) | Curve data, coordinates, depths |
| **PropertyKind** | Property classification | RESQML properties, WITSML channels |
| **Activity / ActivityTemplate** | Provenance tracking | Auto-created by ETP server on each write |
| **GeographicPosition** | Well location (WGS84) | Well objects |

**Critical requirement:** The ETP server's XML scanner requires `<eml:Citation>` to be in the EML namespace (`xmlns:eml="http://www.energistics.org/energyml/data/commonv2"`). This is why `fixCitationNamespace()` exists — without it, the server can't extract the UUID for indexing.

---

## Time Series & Real-Time Data

### What's Available Now

| Capability | Status | How |
|-----------|--------|-----|
| Store time-indexed logs | ✅ Working | `witsml21.Log` with `indexType=date time` |
| Store depth-indexed logs | ✅ Working | `witsml21.Log` with `indexType=measured depth` |
| Detect RealTime objects | ✅ Parser | WITSML 1.x `realTime` type recognized |
| SSE change notifications | ✅ Working | `POST /discovery/subscribe` — polls every 5s |
| ETP ChannelStreaming | ❌ Not yet | ETP Protocol 1 (would give true push) |

### Demo: Time-Series Ingestion

```bash
# Store a time-indexed log (DAS/DTS style)
curl -X PUT http://localhost:8080/api/reservoir-ddms/v2/witsml/store \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg ds "maap/realtime" --arg xml '
<Log xmlns="http://www.energistics.org/energyml/data/witsmlv2"
     xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
     schemaVersion="2.1" uuid="rt-das-001">
  <eml:Citation>
    <eml:Title>DAS Real-time Channel</eml:Title>
    <eml:Originator>DAS Interrogator</eml:Originator>
    <eml:Creation>2026-06-02T12:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <Direction>increasing</Direction>
  <IndexType>date time</IndexType>
  <LogCurveInfo uid="TIME">
    <Mnemonic>TIME</Mnemonic>
    <Unit>s</Unit>
    <TypeLogData>date time</TypeLogData>
  </LogCurveInfo>
  <LogCurveInfo uid="STRAIN">
    <Mnemonic>STRAIN</Mnemonic>
    <Unit>microstrain</Unit>
    <TypeLogData>double</TypeLogData>
  </LogCurveInfo>
</Log>' '{dataspace: $ds, xml: $xml}')"

# Subscribe to changes (SSE stream)
curl -N -X POST http://localhost:8080/api/reservoir-ddms/v2/discovery/subscribe \
  -H "Content-Type: application/json" \
  -d '{"uri": "eml:///dataspace('\''maap/realtime'\'')"}'
```

### Roadmap: ETP ChannelStreaming (Protocol 1)

For true real-time (sub-second latency), the ETP 1.2 spec defines Protocol 1 (ChannelStreaming):
- Server pushes new data points as they arrive
- Client subscribes to specific channels by URI
- Binary Avro encoding for minimal overhead
- Supports both time-indexed and depth-indexed streaming

This would enable:
- Live DAS/DTS fiber-optic monitoring
- Real-time drilling parameter streaming
- Continuous MWD/LWD data flow

---

## Query Architecture

### Current Query Endpoints

```
┌─────────────────────────────────────────────────────────────────┐
│  REST API (http://localhost:8080/api/reservoir-ddms/v2)          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  /dataspaces/:id/resources          → Type listing + counts     │
│  /dataspaces/:id/resources/:type    → Objects of specific type  │
│  /dataspaces/:id/resources/:type/:uuid → Single object content  │
│                                                                  │
│  /discovery/search                  → Cross-type name/pattern   │
│  /discovery/tree                    → Hierarchical tree view    │
│  /discovery/types                   → Distinct type summary     │
│  /discovery/subscribe               → SSE change feed           │
│                                                                  │
│  /witsml/store                      → Ingest WITSML XML         │
│  /witsml/query                      → Query by WITSML type      │
│                                                                  │
│  /manifests/build                   → Build OSDU manifest       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Deep Well Query — What Should Exist

A "find everything about this well" query should aggregate across both WITSML and RESQML:

```
GET /wells/:name
  → searches all dataspaces
  → returns:
    {
      well: { witsml: [...], resqml: [...] },
      wellbores: [...],
      logs: [...],
      trajectories: [...],
      markers: [...],
      completions: [...],
      mudLogs: [...]
    }
```

### Proposed: `/wells` Unified Well Query Route

```typescript
// GET /wells?name=DROGON*&include=logs,trajectories,markers
// Returns aggregated view across WITSML + RESQML

interface WellQueryResult {
  name: string;
  sources: {
    witsml?: { uri: string; dataspace: string; uuid: string };
    resqml?: { uri: string; dataspace: string; uuid: string };
    osdu?: { id: string; kind: string };
  };
  wellbores: WellboreInfo[];
  logs: LogInfo[];
  trajectories: TrajectoryInfo[];
  markers: MarkerInfo[];
}
```

### How Federated Query Works

```
User query: "Find well DROGON A-1 with all logs"
    │
    ▼
┌─────────────────────────────────────────────┐
│  /wells?name=DROGON+A-1&include=logs        │
└─────────────────┬───────────────────────────┘
                  │
    ┌─────────────┼─────────────────────────┐
    ▼             ▼                         ▼
┌─────────┐ ┌──────────┐ ┌──────────────────────┐
│ ETP     │ │ ETP      │ │ OSDU Search          │
│ Discover│ │ Discover │ │ (optional)           │
│ witsml  │ │ resqml   │ │                      │
│ spaces  │ │ spaces   │ │ GET /search/query    │
└────┬────┘ └────┬─────┘ └──────────┬───────────┘
     │           │                   │
     ▼           ▼                   ▼
 witsml21.Well  WellboreFeature   master-data--Well
 witsml21.Log   WellboreFrame     wpc--WellLog
     │           │                   │
     └───────────┴───────────────────┘
                  │
                  ▼
         Merged WellQueryResult
```

### WITSML Data Model for Deep Query

WITSML has explicit parent-child relationships:

```
Well
 └─ Wellbore (references Well by UUID)
     ├─ Log (references Wellbore)
     │   └─ ChannelSet → Channel
     ├─ Trajectory (references Wellbore)
     │   └─ TrajectoryStation[]
     ├─ WellboreMarkerSet (references Wellbore)
     │   └─ WellboreMarker[]
     ├─ WellCompletion
     │   └─ WellboreCompletion
     ├─ MudLogReport
     ├─ FluidsReport
     └─ DeviationSurvey
```

This hierarchy is queryable via ETP relationships (stored in the `.rel` PG table):
```bash
# Get all children of a wellbore
curl "http://localhost:8080/api/reservoir-ddms/v2/dataspaces/maap%2Fwitsml/resources/witsml21.Wellbore/$UUID/targets"
```

### RESQML Well Data Model

RESQML uses a different topology:

```
WellboreFeature (abstract geometry)
 ├─ WellboreInterpretation (geologic meaning)
 │   └─ WellboreFrameRepresentation (depth stations)
 │       ├─ WellboreTrajectoryRepresentation (XYZ path)
 │       └─ Properties (attached at frame nodes)
 │           ├─ ContinuousProperty (GR, DT, RHOB)
 │           └─ DiscreteProperty (facies, zones)
 └─ DeviationSurveyRepresentation (raw survey)
```

### When to Use Which

| Use Case | Best Model | Why |
|----------|-----------|-----|
| Drilling operations data | WITSML | Native format, all drilling types |
| Well log curves (LAS-style) | WITSML | ChannelSet model matches logging reality |
| Real-time MWD/LWD | WITSML | Time-indexed channels, streaming-ready |
| Reservoir model wells | RESQML | Linked to horizons, grids, properties |
| Formation tops / markers | Either | WITSML WellboreMarkerSet or RESQML horizon picks |
| Completion diagrams | WITSML | WellCompletion + PerforationSet |
| Production data | PRODML | FluidCharacterization, production volumes |
| Catalog search | OSDU SoR | Full-text search, legal/ACL, cross-domain |

---

## Demo: Deep Well Query

### Setup (already available)

```bash
# Drogon dataset is ingested in maap/witsml
# 8 wells, 8 wellbores, 8 logs (GR, RHOB, NPHI, DT curves each)

# List all well names
curl -s "http://localhost:8080/api/reservoir-ddms/v2/dataspaces/maap%2Fwitsml/resources/witsml21.Well" | jq '.[].name'

# Find everything named "DROGON A-1"
curl -s -X POST "http://localhost:8080/api/reservoir-ddms/v2/discovery/search" \
  -H "Content-Type: application/json" \
  -d '{"uri":"eml:///dataspace('\''maap/witsml'\'')","namePattern":".*DROGON A-1.*","depth":0}' | jq '.[] | {name, type: .dataObjectType}'
```

Expected output:
```json
{"name": "DROGON A-1", "type": "witsml21.Well"}
{"name": "DROGON A-1 WB1", "type": "witsml21.Wellbore"}
{"name": "DROGON A-1 Composite Log", "type": "witsml21.Log"}
```

### Cross-Standard Query (WITSML + RESQML in same search)

```bash
# The Drogon EPC (RESQML) is in maap/drogon, WITSML is in maap/witsml
# Search both dataspaces for well-related objects:

for ds in "maap/drogon" "maap/witsml"; do
  echo "=== $ds ==="
  curl -s -X POST "http://localhost:8080/api/reservoir-ddms/v2/discovery/search" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg uri "eml:///dataspace('$ds')" \
      '{uri: $uri, namePattern: ".*[Ww]ell.*", depth: 0, limit: 5}')" | jq '.[].name'
done
```

### Real-Time Change Subscription

```bash
# Terminal 1: Subscribe to changes
curl -N -X POST "http://localhost:8080/api/reservoir-ddms/v2/discovery/subscribe" \
  -H "Content-Type: application/json" \
  -d '{"uri":"eml:///dataspace('\''maap/witsml'\'')"}'

# Terminal 2: Write new data (triggers change event)
curl -s -X PUT "http://localhost:8080/api/reservoir-ddms/v2/witsml/store" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg ds "maap/witsml" --arg xml '<Well xmlns="http://www.energistics.org/energyml/data/witsmlv2" xmlns:eml="http://www.energistics.org/energyml/data/commonv2" schemaVersion="2.1" uuid="new-rt-well-001"><eml:Citation><eml:Title>RT-WELL-001</eml:Title><eml:Originator>demo</eml:Originator><eml:Creation>2026-06-02T13:00:00Z</eml:Creation><eml:Format>WITSML 2.1</eml:Format></eml:Citation></Well>' '{dataspace: $ds, xml: $xml}')"

# → Terminal 1 will emit: event: ObjectChanged, data: {...}
```

---

## GraphQL Queries (Working)

The ORES GraphQL endpoint (`/graphql`) queries WITSML objects directly in PostgreSQL.
Type names follow ETP convention: `witsml21.Well`, `witsml21.Wellbore`, `witsml21.Log`, etc.

Available via the preset dropdown in the ORES UI → Keys page → GraphQL Deep Search → Advanced mode.

### Browse Wells & Wellbores

```graphql
# List all WITSML wells and wellbores in a dataspace
{
  wells: resqmlObjects(
    dataspace: "maap/witsml"
    typeName: "witsml21.Well"
    limit: 30
  ) {
    uuid
    title
    typeName
  }
  wellbores: resqmlObjects(
    dataspace: "maap/witsml"
    typeName: "witsml21.Wellbore"
    limit: 30
  ) {
    uuid
    title
    typeName
  }
}
```

### Relationship Query: Well → Wellbore → Log Hierarchy

```graphql
# Traverse WITSML parent-child graph via ETP relationship edges
# direction "sources" = objects that reference this parent (children)
{
  wellChildren: deepSearch(
    dataspace: "maap/witsml"
    typeName: "witsml21.Well"
    includeRelations: true
    limit: 10
  ) {
    backend totalScanned totalMatched
    objects {
      uuid title typeName
      relations {
        uuid name typeName direction
      }
    }
  }
  wellboreChildren: deepSearch(
    dataspace: "maap/witsml"
    typeName: "witsml21.Wellbore"
    includeRelations: true
    limit: 10
  ) {
    totalMatched
    objects {
      uuid title typeName
      relations {
        uuid name typeName direction
      }
    }
  }
}
# Expected: Well → Wellbore (source), Wellbore → Log + Trajectory (sources)
```

For a specific object, use `objectRelations`:
```graphql
{
  objectRelations(
    dataspace: "maap/witsml"
    typeName: "witsml21.Wellbore"
    uuid: "WELLBORE-UUID-HERE"
    direction: "sources"
  ) {
    uuid name typeName direction
  }
}
```

### Deep Search: Log Curves with Statistics

```graphql
# Find all WITSML Logs with their ChannelSet children and array stats
# The manifest enrichment extracts: Curves[], TopMeasuredDepth, UOM per channel
{
  logs: deepSearch(
    dataspace: "maap/witsml"
    typeName: "witsml21.Log"
    includeRelations: true
    includeStatistics: true
    limit: 15
  ) {
    backend totalScanned totalMatched queryDescription
    objects {
      uuid title typeName
      relations {
        uuid name typeName direction
      }
      properties {
        title kind uom
        statistics { count minValue maxValue mean stdDev }
      }
    }
  }
  channels: deepSearch(
    dataspace: "maap/witsml"
    typeName: "witsml21.ChannelSet"
    includeRelations: true
    includeStatistics: true
    limit: 10
  ) {
    totalMatched
    objects {
      uuid title typeName
      relations {
        uuid name typeName direction
      }
      properties {
        title kind uom
        statistics { count minValue maxValue mean }
      }
    }
  }
}
# Tip: Use category: "witsml" to search all WITSML types at once
```

### Real-Time / Streaming Channel Query

```graphql
# ChannelSets represent real-time drilling/logging channels in WITSML 2.1
# They are containers for time-indexed or depth-indexed measurements
#
# For actual real-time subscription use ETP WebSocket directly:
#   Protocol 1 (ChannelStreaming): StartStreaming → ChannelData push
#   Protocol 2 (ChannelDataFrame): RequestChannelData for bulk retrieval
#
# This query shows stored channel metadata:
{
  channels: resqmlObjects(
    dataspace: "maap/witsml"
    typeName: "witsml21.ChannelSet"
    limit: 20
  ) {
    uuid title typeName
  }
  trajectories: resqmlObjects(
    dataspace: "maap/witsml"
    typeName: "witsml21.Trajectory"
    limit: 10
  ) {
    uuid title typeName
  }
  logs: deepSearch(
    dataspace: "maap/witsml"
    typeName: "witsml21.Log"
    includeRelations: true
    includeStatistics: true
    limit: 5
  ) {
    backend totalScanned totalMatched
    objects {
      uuid title
      relations { uuid name typeName direction }
      properties {
        title kind uom
        statistics { count minValue maxValue mean }
      }
    }
  }
}
```

### ETP Real-Time Streaming (Protocol 1 — not GraphQL)

For sub-second latency, connect directly to the ETP WebSocket:

```
ws://localhost:9002  (binary Avro, ETP 1.2)

1. RequestSession → OpenSession
2. ChannelStreaming.StartStreaming(channels: [...channel URIs...])
3. Server pushes ChannelData messages as new data arrives
4. Each message: { channelId, indexes[], value, timestamp }

Channel URIs:
  eml:///witsml21.ChannelSet(uuid)/channel(mnemonic)
```

### Federated: OSDU Catalog ↔ WITSML Store

```graphql
# Cross-system query: find wells in both OSDU catalog and RDDMS store
# Merges by UUID — shows which exist in catalog vs local PG
{
  federatedSearch(
    text: "DROGON"
    typeName: "Log"
    searchCatalog: false
    searchRddms: true
    limit: 15
  ) {
    totalMerged totalLocalRddms sources
    hits {
      uuid title typeName dataspace
      foundInLocalRddms
    }
  }
}
# Returns: 13 hits across maap/witsml + maap/drogon
```

### Deep Search with Channel Statistics (WITSML Logs)

```graphql
# Find logs containing "Composite" with per-channel statistics
{
  deepSearch(
    dataspace: "maap/witsml"
    typeName: "Log"
    titleContains: "Composite"
    includeStatistics: true
    includeSampleValues: true
    sampleSize: 5
  ) {
    totalMatched
    objects {
      uuid title typeName
      properties {
        title kind
        statistics { count minValue maxValue mean stdDev }
        arrays { path totalElements sampleValues }
      }
    }
  }
}
# Returns channels as properties: DEPTH, GR, DT, NPHI, RHOB
# Each with statistics (count, min, max, mean) and sample float values
```

### Object Arrays with Full Statistics

```graphql
# Direct array query on a specific Log — shows all channels
{
  objectArrays(
    dataspace: "maap/witsml"
    typeName: "witsml21.Log"
    uuid: "e6ce89d2-569e-5902-bea0-5f9451f7ad08"
    includeStatistics: true
    includeSampleValues: true
    sampleSize: 5
  ) {
    path dataType dimensions totalElements
    statistics { count minValue maxValue mean stdDev nanCount }
    sampleValues
  }
}
# Returns: 5 channels × 5 data points each
#   DEPTH: [1000.0, 1000.5, 1001.0, 1001.5, 1002.0] mean=1001.0
#   GR:    [45.2, 47.1, 52.3, 48.7, 55.9]  mean≈49.8
#   DT:    [105.3, 103.8, 98.2, 101.5, 95.4] mean≈100.8
#   NPHI:  [0.18, 0.19, 0.22, 0.2, 0.24]   mean≈0.206
#   RHOB:  [2.35, 2.38, 2.42, 2.37, 2.45]  mean≈2.394
```

### Deep Search with Property Filter (find logs where GR > 50)

```graphql
{
  deepSearch(
    dataspace: "maap/witsml"
    typeName: "Log"
    includeStatistics: true
    propertyFilter: {
      kind: "GR"
      arrayFilter: { operator: GT, threshold: 50.0 }
    }
  ) {
    totalMatched
    objects {
      uuid title
      properties {
        title kind
        matchingCells { count percentage }
        statistics { minValue maxValue mean }
      }
    }
  }
}
```

---

## User Experience: "Search for a Well"

When a user searches for "DROGON A-1", the system should return a unified view:

| Found In | Object | What It Gives You |
|----------|--------|-------------------|
| WITSML (`maap/witsml`) | `witsml21.Well` | Well header, location, status |
| WITSML (`maap/witsml`) | `witsml21.Wellbore` | Wellbore metadata, parent well ref |
| WITSML (`maap/witsml`) | `witsml21.Log` | Curve data (GR, RHOB, DT, NPHI) |
| RESQML (`maap/drogon`) | `WellboreFeature` | 3D geometry, grid connections |
| RESQML (`maap/drogon`) | `WellboreTrajectoryRepresentation` | Survey path in model coordinates |
| OSDU SoR | `master-data--Well` | Legal tags, ACL, catalog metadata |

**The answer is: always return both.** The UI should merge results by well name across all sources, with clear labeling of which system each piece comes from.

---

## Implementation Status

| # | Feature | Status | Notes |
|---|---------|--------|-------|
| 1 | WITSML ingest via ETP (PutDataObjects) | ✅ Done | Instant, no REST needed |
| 2 | WITSML parent-child traversal (well→wellbore→logs) | ✅ Done | Via ETP relationships in PG |
| 3 | GraphQL deep search + stats | ✅ Done | `deepSearch` with `witsml21.*` types |
| 4 | GraphQL relationship queries | ✅ Done | `includeRelations` + `objectRelations` |
| 5 | Manifest enrichment (OSDU M27) | ✅ Done | XML parsing extracts curves, coords, refs |
| 6 | Cross-dataspace federated search | ✅ Done | `federatedSearch` merges catalog + PG |
| 7 | SSE change notifications | ✅ Done | `POST /discovery/subscribe` |
| 8 | ORES UI presets for WITSML queries | ✅ Done | 4 presets in Keys page dropdown |
| 9 | Dataspace cleanup tooling | ✅ Done | Keep drogon+witsml, drop test schemas |
| 10 | ETP ChannelStreaming (Protocol 1) | ❌ Not yet | Would give true sub-second push |
| 11 | `/wells` unified REST route | ❌ Not yet | Single-request deep well view |
