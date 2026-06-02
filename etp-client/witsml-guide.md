# WITSML in RDDMS — Architecture & Query Guide

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
# 9 wells, 8 wellbores, 8 logs with curves

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

## Planned: GraphQL Well Queries

### Why GraphQL for Wells

REST returns flat lists. For well data you almost always need joins:
- "Give me well DROGON A-1 with its wellbores and their logs"
- "Show me all wells that have both trajectory AND markers"
- "Get all logs where GR > 75 gAPI exists as a channel"

### Proposed Schema

```graphql
type Query {
  wells(name: String, dataspace: String): [Well!]!
  well(uuid: ID!, dataspace: String): Well
  search(pattern: String!, types: [String!], dataspace: String): [Resource!]!
}

type Well {
  uuid: ID!
  name: String!
  source: DataSource!  # witsml | resqml | both
  country: String
  location: GeoPoint
  wellbores: [Wellbore!]!
}

type Wellbore {
  uuid: ID!
  name: String!
  well: Well!
  logs: [Log!]!
  trajectories: [Trajectory!]!
  markers: [MarkerSet!]!
  completions: [Completion!]!
}

type Log {
  uuid: ID!
  name: String!
  indexType: String!  # "measured depth" | "date time"
  channels: [Channel!]!
}

type Channel {
  mnemonic: String!
  uom: String!
  dataType: String!
  description: String
}

type Trajectory {
  uuid: ID!
  name: String!
  stations: Int!
  mdMin: Float
  mdMax: Float
}

type MarkerSet {
  uuid: ID!
  name: String!
  markers: [Marker!]!
}

type Resource {
  uri: String!
  name: String!
  type: String!
  dataspace: String!
  lastChanged: String
}

enum DataSource { WITSML, RESQML, BOTH }
```

### Example Queries

```graphql
# Deep well query — single request gets full hierarchy
query {
  wells(name: "DROGON A-1") {
    name
    source
    wellbores {
      name
      logs {
        name
        indexType
        channels { mnemonic, uom }
      }
      trajectories { name, mdMax }
      markers { name, markers { name } }
    }
  }
}

# Cross-standard discovery
query {
  search(pattern: "DROGON", types: ["witsml21.Well", "resqml20.WellboreFeature"]) {
    name
    type
    dataspace
  }
}

# Real-time channel query (future)
subscription {
  channelData(wellbore: "DROGON A-1 WB1", channels: ["GR", "RHOB"]) {
    timestamp
    values { mnemonic, value, uom }
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

## Implementation Priority

| # | Feature | Effort | Value |
|---|---------|--------|-------|
| 1 | `/wells` unified query route | Small | High — immediate usability |
| 2 | WITSML parent-child traversal (well→wellbore→logs) | Small | High — data model strength |
| 3 | Cross-dataspace search | Medium | High — find well in any dataspace |
| 4 | GraphQL schema + resolvers | Medium | High — deep queries in one request |
| 5 | ETP ChannelStreaming (Protocol 1) | Large | High — true real-time |
| 6 | OSDU SoR federation | Medium | Medium — connects to catalog |
| 7 | WebSocket subscriptions | Medium | Medium — replaces SSE polling |
