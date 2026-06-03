# Drogon WITSML Dataset

Synthetic Drogon field data (8 wells, logs, trajectories) stored as WITSML 2.1.

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

## Usage

```bash
# Ingest (requires etp-client on :8080)
bash scripts/ingest_drogon_witsml.sh

# Build OSDU manifest
curl -X POST http://localhost:8080/api/reservoir-ddms/v2/manifests/build \
  -H "Authorization: Bearer x" -H "data-partition-id: opendes" \
  -H "Content-Type: application/json" \
  -d '{"uris":["eml:///dataspace('\''maap/drogon'\'')"],"typePatterns":["witsml*"],"createMissingReferences":true}'
```
