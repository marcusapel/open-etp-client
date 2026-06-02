# Changes from Official OSDU Reservoir DDMS

## Overview

This repo contains:
- **`etp-client/`** — A TypeScript REST-to-ETP bridge (Express). Drop-in replacement for the official OSDU `open-etp-client` (NestJS), with added WITSML/PRODML ingestion.
- **`open-etp-server/`** — The official OSDU C++ ETP server (unmodified, commit `c608b55`).

All other files in the repo (CMakeLists.txt, `src/`, `include/`, `tests/`, `k8s/`, Dockerfile, radixconfig.yaml) are **identical to the official OSDU reservoir-ddms repo** — no modifications.

---

## Why This Client Exists

The official `open-etp-client` (NestJS) works in production for RESQML. Our client re-implements the same API in Express and adds:
1. **WITSML ingestion** — Parse WITSML 1.3.1/1.4.1/2.0/2.1 XML → store via ETP
2. **PRODML store** — Ingest PRODML 2.2 XML objects via `PUT /prodml/store`
3. **OSDU M27 manifest builder** — Generate OSDU manifests from stored ETP objects
4. **WITSML 1.x → 2.1 envelope** — Auto-wraps legacy WITSML in indexable 2.1 XML

---

## WITSML-Specific Fixes (why RESQML worked but WITSML didn't)

The ETP Avro encoding was written fresh for this client. These are implementation issues in **our** code — not bugs in the official client or server.

### 1. Avro field ordering in `PutDataObjects`

**File:** `src/etp/etp-messages.ts`

During initial development, `encodePutDataObjects` wrote an extra `dataObjectType`
string field between `Resource.customData` and `DataObject.format`. This corrupted
the binary frame ("Invalid Union index").

**Why RESQML wasn't affected:** RESQML objects were loaded via the EPC loader which
uses a different code path (EPC → `putDataObjects` with pre-serialized Avro from the
official server's export format). The WITSML store was the first path to exercise
our hand-written `encodePutDataObjects`.

### 2. UUID and XML preparation

**File:** `src/restApi/witsml.ts`

RESQML objects from EPC files already contain valid UUIDs and properly
namespace-qualified `<eml:Citation>` elements (because they originate from
Energistics-conformant tools like FESAPI). WITSML objects from external systems
typically don't:

| Issue | RESQML (EPC) | WITSML (user XML) | Fix |
|-------|-------------|-------------------|-----|
| UUID format | Already valid v4/v5 UUID | String UID like `drogon-A1` | `nameToUuid()` — SHA-256→UUID v5 |
| `uuid=` attribute | Matches URI | Missing or mismatched | Regex-patch in XML |
| Citation namespace | `<eml:Citation>` (correct) | `<Citation>` (default ns) | `fixCitationNamespace()` |
| URI format | `type(uuid)` no quotes | Was using `type('uid')` | Removed quotes |

### 3. WITSML 1.x storage

**File:** `src/restApi/witsml.ts` — `make21Envelope()`

WITSML 1.x XML (versions 1.3.1, 1.4.1) has no `uuid=` attribute or `<Citation>`.
The ETP server can't index these. Fix: generate a minimal WITSML 2.1 envelope
with proper `uuid` + `<eml:Citation>`, embedding the original 1.x XML in
`<CustomData><OriginalWitsml>`.

---

## PostgreSQL Schema

**No changes.** The openETPServer manages its own schema automatically. Each ETP
dataspace gets a fixed set of tables (named `s{hash}.{suffix}`):

| Table | Purpose |
|-------|---------|
| `.hdr` | Header/schema version |
| `.uri` | URI index |
| `.typ` | Type registry (`Well`, `Log`, `obj_Activity`, ...) |
| `.obj` | Object XML storage (`id`, `usize`, `zcomp`, `xml`) |
| `.res` | Resource metadata (ETP discovery) |
| `.del_res` | Deleted resources |
| `.rel` | Relationships |
| `.xpa` | XPath index |
| `.ary` | Array data |
| `.bin` | Binary blobs |

WITSML and PRODML objects use the same tables — they're just XML stored with
`witsml21.*` or `prodml22.*` type qualifiers in the `.typ` table.

---

## Compatibility with Official API

See `etp-client/COMPATIBILITY.md` for the full route-by-route analysis. Summary:

- **All official read/write routes implemented** (dataspaces, resources, objects, transactions, locks, manifests)
- **Same base path:** `/api/reservoir-ddms/v2`
- **Same response shapes** as the official NestJS client
- **Additional routes** (WITSML, PRODML, discovery, catalog) are purely additive — no conflicts
- **Gaps:** `$skip`/`$top` pagination, `$filter` (ODATA XPath), DataArray protocol (Protocol 9), graph routes

---

## Tests

### Unit Tests (`npx jest`)

| Suite | File | Tests | Coverage |
|-------|------|-------|----------|
| WITSML Parser | `tests/witsml/parser.test.ts` | 29 | All versions: 1.3.1, 1.4.1, 2.0, 2.1; 30+ object types |
| Manifest Builder | `tests/manifest/builder.test.ts` | 12 | RESQML, WITSML, PRODML → OSDU M27 kinds |
| Type Detection | `tests/resqml/types.test.ts` | 8 | Namespace→standard mapping, version extraction |
| REST Dataspaces | `tests/restApi/dataspaces.test.ts` | 17 | Route patterns, response shapes |
| REST Discovery | `tests/restApi/discovery.test.ts` | 5 | Type filtering, search |

### Integration Tests

| Test | File | What it does |
|------|------|-------------|
| Drogon roundtrip | `tests/integration/roundtrip_rest.test.ts` | 17 tests against live ETP server |
| WITSML roundtrip | `demo/test_roundtrip.sh` | Full pipeline: ingest 1.3/1.4/2.1 → verify PG → read back → build manifest (20 assertions) |

### Running

```bash
cd etp-client

# Unit tests (no server needed)
npx jest

# Integration test (requires ETP server on :9002 + etp-client on :8080)
bash demo/test_roundtrip.sh
```
