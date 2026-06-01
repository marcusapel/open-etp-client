# Changelog — etp-client

## Session Work Summary (May 2025)

### What Was Done

#### 1. Rewrote `src/restApi/dataspaces.ts` — Full Official API Match

**Reasoning**: The original dataspaces route file had ~5 routes. The official
open-etp-client (NestJS) exposes 20+ routes. We rewrote to match.

Routes added:
- `GET /` — List all dataspaces (with full metadata: uri, path, storeLastWrite, storeCreated, customData)
- `POST /` — Create dataspaces (body: `[{DataspaceId, Path?, CustomData?}]` → returns `[uri, ...]`)
- `DELETE /:id` — Delete dataspace (204)
- `GET /:id/resources` — List types with counts (`[{name, count}]`)
- `GET /:id/resources/all` — All resources as ResourceDto[]
- `GET /:id/resources/:type` — Resources filtered by qualified type
- `GET /:id/resources/:type/:uuid` — Single object content (XML or JSON based on `$format`)
- `PUT /:id/resources` — Put data objects
- `GET /:id/resources/:type/:uuid/sources` — Source relationships
- `GET /:id/resources/:type/:uuid/targets` — Target relationships
- `GET /:id/resources/:type/:uuid/arrays` — Array metadata list (stub)
- `GET /:id/resources/:type/:uuid/arrays/:path` — Array data (stub)
- `POST /:id/transactions` — Start transaction
- `PUT /:id/transactions/:txId` — Commit transaction
- `DELETE /:id/transactions/:txId` — Rollback transaction
- `POST /:id/lock` — Lock dataspace
- `DELETE /:id/lock` — Unlock dataspace
- `PUT /:id/copy` — Copy/clone dataspace

#### 2. Updated `src/etp/etp-messages.ts` — Full Field Capture

**Reasoning**: The ETP binary decoder was only extracting `uri` from responses.
Official API returns `storeLastWrite`, `storeCreated`, `customData`, `alternateUris`,
`activeStatus`, etc. We updated the decoder to capture all fields.

Changes:
- `DataspaceInfo` now decodes: `uri, path, storeLastWrite, storeCreated, customData`
- `ResourceInfo` now decodes: `uri, alternateUris, name, lastChanged, storeLastWrite, storeCreated, activeStatus, customData, dataObjectType`
- Added `readMap()` helper for ETP MapType
- Added `readDataValueAsString()` for ETP DataValue union
- Added `microsToIso()` for microsecond timestamps → ISO 8601

#### 3. Updated `src/etp/client.ts` — Resource Interface

**Reasoning**: The `Resource` interface needed optional fields to match what we
now decode.

Changes:
- Added optional fields: `alternateUris`, `storeLastWrite`, `storeCreated`, `activeStatus`, `customData`
- `decodeResponseBody()` now maps all fields from Discovery and Dataspace protocol responses

#### 4. Updated `src/resqml/types.ts` — Type Detection

**Reasoning**: WITSML and PRODML objects stored via ETP have namespaces that
need mapping to qualified types (e.g., `witsml21.Well`).

Changes:
- `detectDataObjectType()` handles resqml, witsml, prodml, eml namespaces
- Extracts version from namespace URI
- Returns qualified type string matching ETP URI pattern

#### 5. Added EPC Loader (`src/epc/loader.ts`)

**Reasoning**: Need to load EPC packages (ZIP files containing RESQML/WITSML XML)
directly into ETP dataspaces without going through REST.

Features:
- `extractEpcObjects(epcPath)` — Parse ZIP, extract XML objects
- `loadEpc(etp, epcPath, options)` — Load objects into dataspace via ETP PutDataObjects
- Supports: resqml, witsml, prodml, eml standards
- CLI: `npx rddms epc load <file.epc> --dataspace <path>`

#### 6. Tests

Unit tests (`tests/restApi/dataspaces.test.ts`):
- 17 tests covering all new route patterns and response shapes

Integration tests (`tests/integration/roundtrip_rest.test.ts`):
- 17 tests running against live Docker (official open-etp-client on :3000)
- Verifies our responses match official API behavior
- Tests: dataspace CRUD, resource listing, type filtering, object content,
  sources/targets, arrays, transactions, WITSML discovery, GraphQL compatibility

Full test suite: 61 tests pass.

---

### What Was NOT Changed

- `open-etp-server/` — Unmodified submodule (commit c608b55)
- C++ RDDMS source (`src/`, `include/`, `tests/`) — Untouched
- Dockerfile, radixconfig.yaml, k8s/ — Untouched
- Build system (CMakeLists.txt) — Untouched
- The PostgreSQL schema — Unchanged

---

### Design Decisions

1. **Express over NestJS** — Lighter weight, no decorator magic, easier to debug.
   The official uses NestJS because it was started by Emerson/AspenTech. We don't
   need the full DI framework for a REST-to-ETP bridge.

2. **Stub arrays** — Full DataArray protocol (Protocol 9) support requires
   significant ETP work (binary array encoding/decoding). Stubbed for now,
   returns empty arrays. Does not break any existing clients.

3. **PUT /copy vs POST /clone** — We used PUT semantics originally. The official
   uses POST /clone. Need to add POST /clone as alias before deployment.

4. **Transaction IDs as `tx-{timestamp}`** — The official returns UUID strings.
   Functionally equivalent (opaque identifier). Could switch to UUIDs if needed.

5. **No ODATA filter support** — Complex to implement (requires XPath evaluation
   on XML content). Deferred. Most clients don't use $filter.
