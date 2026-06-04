# Synthetic RESQML Test Data & Ingestion Scripts

End-to-end validation of RESQML 2.2 + 2.0.1 manifest generation and OSDU ingestion.
Created 2026-06-04.

## Contents

```
epcs/
  synthetic22.epc          # RESQML 2.2 — 52 objects, 0 validation errors
  synthetic201.epc         # RESQML 2.0.1 — 23 objects, 0 validation errors

scripts/
  build_synthetic22.py     # Generate synthetic22.epc (requires energyml-utils)
  build_synthetic201.py    # Generate synthetic201.epc (requires energyml-utils)
  pg_import.py             # Direct PostgreSQL import (bypasses broken ETP writes)
  etp_import.py            # ETP websocket import (fails — server transaction bug)

manifests/
  manifest22_osdu.json     # OSDU-ready manifest: 38 WPCs, 25 RefData, 1 Dataset
  manifest201_osdu.json    # OSDU-ready manifest: 17 WPCs, 15 RefData, 1 Dataset
```

## Reproduction Steps

### 1. Generate EPCs (optional — pre-built EPCs included)

```bash
pip install energyml-utils energyml-resqml2-2 energyml-resqml2-0-1
python3 scripts/build_synthetic22.py    # → /tmp/synthetic22.epc
python3 scripts/build_synthetic201.py   # → /tmp/synthetic201.epc
```

### 2. Import to ETP Server (PostgreSQL direct)

The ETP server's PutDataObjects is broken (transaction bug). Use direct DB import:

```bash
# Requires: pip install psycopg2-binary
# Requires: ETP server + PostgreSQL running (docker compose)

python3 scripts/pg_import.py epcs/synthetic22.epc maap/synthetic22
python3 scripts/pg_import.py epcs/synthetic201.epc maap/synthetic201

# IMPORTANT: For RESQML 2.0.1, the script stores XML with obj_ prefix element
# names. The ETP server requires element names WITHOUT obj_ prefix.
# Run this SQL fix after import:
# UPDATE schema.obj SET xml = regexp_replace(xml::text,
#   '<(\w+):obj_(\w+)', '<\1:\2')::xml WHERE xml::text LIKE '%:obj_%';

# Restart ETP server to pick up new data:
docker restart drogonresqml-etp-server-1
```

### 3. Build Manifests via REST API

```bash
# Start REST server
RDMS_ETP_PROTOCOL=ws RDMS_ETP_HOST=localhost RDMS_ETP_PORT=9002 \
RDMS_REST_ROOT_PATH="/api/reservoir-ddms/v2" RDMS_REST_PORT=8080 \
RDMS_DATA_PARTITION_MODE=single \
npx ts-node src/lib/restApi/RestServer.ts &

# Build manifests
AUTH="Authorization: Bearer fake"
PART="data-partition-id: single"
BASE="http://localhost:8080/api/reservoir-ddms/v2"

curl -X POST -H "$AUTH" -H "$PART" -H "Content-Type: application/json" \
  "$BASE/manifests/build" \
  -d '{"uris": ["eml:///dataspace('\''maap/synthetic22'\'')"]}' \
  > manifest22.json
```

### 4. Ingest to OSDU

Manifests need ACLs, legal tags, and correct partition prefix before ingestion.
The pre-built `manifests/*_osdu.json` files are configured for `opendes` partition
on `admeinterop.energy.azure.com`.

```bash
# Direct storage API (workflow is a test stub on interop):
curl -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "data-partition-id: opendes" \
  -H "Content-Type: application/json" \
  "$OSDU_HOST/api/storage/v2/records" \
  -d @records.json
```

## Known Issues

| Issue | Component | Workaround |
|-------|-----------|------------|
| PutDataObjects always fails (transaction bug) | ETP Server | Use `pg_import.py` |
| RESQML 2.2 EPC import unsupported by fesapi | ETP Server CLI | Use `pg_import.py` |
| 2.0.1 XML with `obj_` element names unreadable | ETP Server | Strip `obj_` from root elements |
| Osdu_ingest workflow is test stub | OSDU Instance | Use direct storage API |
| Manifests have empty ACLs | Client | Post-process with partition config |

## Object Kind Coverage

### RESQML 2.2 (25 OSDU WPC kinds)

Activity, EarthModelInterpretation, FaultInterpretation, FluidBoundaryInterpretation,
GenericRepresentation (5), GeobodyBoundaryInterpretation, GeobodyInterpretation,
GridConnectionSetRepresentation, HorizonInterpretation, IjkGridRepresentation,
LocalBoundaryFeature (5), LocalModelCompoundCrs, RockFluidOrganizationInterpretation,
RockFluidUnitInterpretation, SealedSurfaceFramework, StratigraphicColumn,
StratigraphicColumnRankInterpretation, StratigraphicUnitInterpretation,
StructuralOrganizationInterpretation, StructureMap, SubRepresentation,
UnstructuredGridRepresentation, WellLog, WellboreInterpretation, WellboreTrajectory

### RESQML 2.0.1 (12 OSDU WPC kinds)

Activity, EarthModelInterpretation, FaultInterpretation, GenericProperty,
GenericRepresentation, HorizonInterpretation, IjkGridRepresentation,
LocalBoundaryFeature (4), LocalModelCompoundCrs, LocalModelFeature,
StructuralOrganizationInterpretation, StructureMap
