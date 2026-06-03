# Chevron KKS-1 & MudLog WITSML Dataset

Real-field Chevron Kentish Knock South-1 data converted from DLIS to WITSML 2.1,
plus MUD_LOG_1 drilling data.

## Data Files

| File | Content |
|------|---------|
| `data/well_21.xml` | WITSML 2.1 Well (Kentish Knock South-1) |
| `data/wellbore_21.xml` | WITSML 2.1 Wellbore |
| `data/log_21_with_arrays.xml` | WITSML 2.1 Log (100 rows, multi-dim T2_DIST[20]) |
| `data/trajectory_21.xml` | WITSML 2.1 Trajectory (20 stations) |
| `data/mudlog_21_metadata.xml` | WITSML 2.1 Log from MUD_LOG_1.DLIS (46 channels, 655 rows, metadata-only) |
| `data/log_131.xml` | WITSML 1.3.1 Log (20 rows) |
| `data/trajectory_141.xml` | WITSML 1.4.1 Trajectory (15 stations) |
| `data/src/` | Raw DLIS source files |

### Source DLIS Files (in `data/src/`)

| File | Size | Content |
|------|------|---------|
| `Chevron_KKS1_CMR-MainPass_Processed.7z` | 83 MB | CMR NMR processed data (compressed) |
| `MUD_LOG_1.DLIS` | 143 KB | Mud log: 46 channels, 655 depth samples |

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/dlis_to_witsml.py` | DLIS → WITSML converter with `--direct-arrays` mode |
| `scripts/ingest_local.sh` | Full ingestion pipeline (Drogon EPC+WITSML + CVX samples) |
| `scripts/ingest_preship.ts` | Ingest to preship OSDU instance |
| `scripts/ingest_osdu.ts` | Generic OSDU ingestion script |
| `scripts/test_etp_ingest.ts` | ETP array ingestion test |

### Output

Generated files are written to `scripts/files/` (gitignored). Curated outputs
are copied to `data/`.

## Usage

### Convert DLIS → WITSML and ingest with arrays

```bash
# MUD_LOG_1 — small dataset, good for testing the full pipeline
python3 scripts/dlis_to_witsml.py \
  --dlis data/src/MUD_LOG_1.DLIS \
  --api http://localhost:8080/api/reservoir-ddms/v2 \
  --dataspace maap/witsml \
  --direct-arrays --token x --partition opendes

# CMR Main Pass — large multi-dim dataset (extract .7z first)
python3 scripts/dlis_to_witsml.py \
  --dlis data/src/Chevron_KKS1_CMR-MainPass_Processed.dlis \
  --api http://localhost:8080/api/reservoir-ddms/v2 \
  --dataspace maap/witsml \
  --direct-arrays --token x --partition opendes
```

### Ingest pre-built XML samples (full pipeline)

```bash
bash scripts/ingest_local.sh                 # full pipeline (drogon + witsml)
bash scripts/ingest_local.sh --witsml-only   # only maap/witsml
bash scripts/ingest_local.sh --drogon-only   # only maap/drogon
bash scripts/ingest_local.sh --skip-epc      # skip EPC import
```

### Build OSDU manifest

```bash
curl -X POST http://localhost:8080/api/reservoir-ddms/v2/manifests/build \
  -H "Authorization: Bearer x" -H "data-partition-id: opendes" \
  -H "Content-Type: application/json" \
  -d '{"uris":["eml:///dataspace('\''maap/witsml'\'')"],"typePatterns":["witsml*"],"createMissingReferences":true}'
```
