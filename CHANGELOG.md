# Changelog

All notable changes to RDDMS (Reservoir Data Domain Management Service).

## [2.0.0] — 2026-06-02

### Architecture Change — Emerson @osdu/open-etp-client

**BREAKING:** Replaced custom Node.js ETP client with the official Emerson
`@osdu/open-etp-client` v1.3.0 (NestJS/TypeScript). Port changed from 8080
to 3000. API paths unchanged (`/api/reservoir-ddms/v2/...`).

### Added

- **DiscoveryQuery protocol (13)** — URI-based resource enumeration with
  filtering by type, modified-since timestamp, and active status
- **StoreQuery protocol (14)** — Bulk retrieval of DataObjects with full
  XML content in a single request
- **GrowingObject protocol (6)** — Well log growing object support:
  getParts, getPartsByRange, getPartsMetadata, putParts, deleteParts,
  getGrowingDataObjectsHeader
- **GrowingObjectNotification protocol (7)** — Real-time event
  subscriptions for part changes (partsChanged, partsDeleted,
  partsReplacedByRange) using EventEmitter pattern
- **ChannelSubscribe protocol (21)** — Real-time channel/curve data
  streaming: getChannelMetadata, subscribeChannels, getRanges
- **WITSML REST module** (`/witsml/store`, `/witsml/query`, `/witsml/parse`)
  — Parse and ingest WITSML 1.3.1, 1.4.1, 2.1 objects via ETP transactions
- **Query REST module** (`/query/resources/find`, `/query/objects/find`,
  `/query/growing/metadata`, `/query/growing/range`,
  `/query/channels/metadata`) — REST endpoints for new protocols
- **Demo scripts** — `demo_protocols.sh`, `demo_witsml.sh`,
  `demo_compare_wells.sh` for interactive protocol demonstrations
- **Formal test suite** — `TestProtocols.ts` Jest integration tests
  covering all new protocols and REST endpoints
- **GUIDE.md** — Architecture guide with protocol table, endpoint
  reference, and migration notes

### Removed

- **Custom Node.js ETP client** (`etp-client/` directory) — superseded by
  the official Emerson client. Had fundamental issues:
  - Missing Transaction protocol (root cause of PutDataObjects failures)
  - Broken ProtocolException routing (sessionReject always truthy)
  - Incomplete Avro union handling in decoder
  - No support for GrowingObject, ChannelSubscribe, or query protocols

### Changed

- **Port 8080 → 3000** — NestJS default
- **WebSocket client** — Now uses official Emerson ETP 1.2 implementation
  with proper Avro serialization and message correlation
- **ResqmlClient** — Extended with 5 new protocol handler registrations
  (discoveryQuery, storeQuery, growingObject, growingObjectNotification,
  channelSubscribe)
- **Demo folder** — Moved to repo root (`demo/`), removed from `.gitignore`

### Fixed

- Transaction support — writes now properly use
  StartTransaction → PutDataObjects → CommitTransaction flow
- ProtocolException handling — errors correctly routed to pending request
  handlers instead of being swallowed
- Avro union decoding — correct field order (readInt→readString→readInt)

---

## [1.0.0] — 2026-05-15

### Added

- Initial RDDMS implementation with C++ REST server
- Custom Node.js ETP client (`etp-client/`)
- WITSML parsing and OSDU manifest generation
- Docker + Kubernetes deployment (Radix)
- Drogon field demo data ingestion scripts
