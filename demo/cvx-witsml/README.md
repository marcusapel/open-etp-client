# Chevron KKS-1 WITSML Dataset

Real-field Chevron Kentish Knock South-1 data converted from DLIS to WITSML 2.1.

## Data Files

| File | Content |
|------|---------|
| `data/well_21.xml` | WITSML 2.1 Well (Kentish Knock South-1) |
| `data/wellbore_21.xml` | WITSML 2.1 Wellbore |
| `data/log_21_with_arrays.xml` | WITSML 2.1 Log (100 rows, multi-dim T2_DIST[20]) |
| `data/trajectory_21.xml` | WITSML 2.1 Trajectory (20 stations) |
| `data/log_131.xml` | WITSML 1.3.1 Log (20 rows) |
| `data/trajectory_141.xml` | WITSML 1.4.1 Trajectory (15 stations) |
| `data/src/` | Raw DLIS source files + Jupyter notebook |

### Source DLIS Files (in `data/src/`)

| File | Size | Content |
|------|------|---------|
| `Chevron_KKS1_CMR-MainPass_Processed.dlis` | 83 MB | CMR NMR processed data |
| `MUD_LOG_1.DLIS` | 143 KB | Mud log data |
| `Array_DLIS-WITSML_test.ipynb` | — | Conversion notebook |

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/dlis_to_witsml.py` | DLIS → WITSML converter with `--direct-arrays` mode |
| `scripts/ingest_local.sh` | Full ingestion pipeline for local ETP server |
| `scripts/ingest_preship.ts` | Ingest to preship OSDU instance |
| `scripts/ingest_osdu.ts` | Generic OSDU ingestion script |
| `scripts/test_etp_ingest.ts` | ETP array ingestion test |

## Usage

```bash
# Convert DLIS to WITSML and ingest with arrays
python3 scripts/dlis_to_witsml.py data/src/Chevron_KKS1_CMR-MainPass_Processed.dlis \
  --direct-arrays --dataspace maap/witsml --server http://localhost:8080

# Ingest pre-built XML samples
bash scripts/ingest_local.sh

# Build OSDU manifest
curl -X POST http://localhost:8080/api/reservoir-ddms/v2/manifests/build \
  -H "Authorization: Bearer x" -H "data-partition-id: opendes" \
  -H "Content-Type: application/json" \
  -d '{"uris":["eml:///dataspace('\''maap/witsml'\'')"],"typePatterns":["witsml*"],"createMissingReferences":true}'
```
