# Drogon WITSML Dataset

Synthetic Drogon field data (8 wells, logs, trajectories) stored as WITSML 2.1.
Target dataspace: `maap/drogon`.

## Data Files

| File | Content |
|------|---------|
| `data/wells_141.xml` | WITSML 1.4.1 wells (Drogon A-1 through C-2) |
| `data/log_141.xml` | WITSML 1.4.1 GR log |
| `data/channelset_21.xml` | WITSML 2.1 ChannelSet (GR+DT+RHOB, 30 rows) |

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/ingest_drogon_witsml.sh` | Ingest all Drogon wells/wellbores/logs into `maap/drogon` |
| `scripts/drogon_roundtrip.test.ts` | Jest test: ingest → query → verify round-trip |
| `scripts/test_roundtrip.sh` | Shell-based roundtrip test |

> **Note:** The unified `../cvx-witsml/scripts/ingest_local.sh` also ingests
> Drogon data (use `--drogon-only` flag). This standalone script is a simpler
> alternative for Drogon-only testing.

## Usage

```bash
# Standalone Drogon ingestion (requires etp-client on :8080)
bash scripts/ingest_drogon_witsml.sh

# Or via the unified pipeline (includes EPC import + WITSML wells)
bash ../cvx-witsml/scripts/ingest_local.sh --drogon-only

# Build OSDU manifest
curl -X POST http://localhost:8080/api/reservoir-ddms/v2/manifests/build \
  -H "Authorization: Bearer x" -H "data-partition-id: opendes" \
  -H "Content-Type: application/json" \
  -d '{"uris":["eml:///dataspace('\''maap/drogon'\'')"],"typePatterns":["witsml*"],"createMissingReferences":true}'
```
