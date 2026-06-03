# Benchmark: Well Data Storage Options in OSDU

## Comparison: RDDMS vs Alternatives for WITSML/DLIS/Real-time Well Data

### The Problem

Storing well log data (WITSML, DLIS, LAS) in OSDU requires:
1. **Curve data** — millions of depth/time-indexed float64 values per channel
2. **Metadata** — well/wellbore/log hierarchy, units, mnemonics
3. **Real-time** — sub-second append of new data points during drilling
4. **Query** — find logs by property ranges, statistics, cross-well correlation
5. **Standards** — Energistics WITSML 2.1 / ETP 1.2 compliance

---

## Storage Options Compared

| Criteria | RDDMS (ETP+PG) | Parquet on Blob | OSDU Well SoR | TimescaleDB | Apache Arrow/Flight | InfluxDB |
|----------|-----------------|-----------------|---------------|-------------|---------------------|----------|
| **Ingest latency** | <5ms (ETP PUT) | 100-500ms (write+upload) | 2-10s (manifest+workflow) | <5ms (INSERT) | <10ms (DoPut) | <5ms |
| **Query latency (single log)** | <10ms (PG index) | 50-200ms (download+scan) | 200-2000ms (search+fetch) | <10ms | <10ms | <10ms |
| **Cross-log statistics** | <50ms (batch PG) | 500ms-5s (scan all files) | N/A (no curve access) | <50ms | <50ms | <100ms |
| **Real-time append** | ✅ ETP transaction | ❌ Rewrite whole file | ❌ Not supported | ✅ Native | ✅ Streaming | ✅ Native |
| **Schema evolution** | ✅ ETP versioned XML | ❌ Schema in file | ❌ Fixed OSDU schema | ⚠️ ALTER TABLE | ✅ Schema negotiation | ⚠️ Tags only |
| **WITSML compliance** | ✅ Native ETP 1.2 | ❌ Custom mapping | ⚠️ Partial (flattened) | ❌ Custom mapping | ❌ Custom mapping | ❌ Custom mapping |
| **Hierarchical queries** | ✅ PG rel graph | ❌ External index | ⚠️ OSDU relationships | ❌ JOINs | ❌ External | ❌ Tags |
| **Concurrent writers** | ✅ PG MVCC | ❌ Lock whole file | ⚠️ Eventual consistency | ✅ MVCC | ✅ | ✅ |
| **Compression** | PG TOAST (~3:1) | Snappy/ZSTD (5-10:1) | N/A | PG TOAST (~3:1) | LZ4/ZSTD (5-10:1) | Gorilla (10:1) |
| **Storage cost/GB** | $0.10 (PG disk) | $0.02 (blob cold) | $0.10 (Cosmos) | $0.10 (PG disk) | $0.02 (blob) | $0.15 |
| **Operational complexity** | Low (PG + Docker) | Low (blob + compute) | High (OSDU platform) | Medium (PG ext) | Medium (custom) | Medium |

---

## Benchmark: Realistic Well Data Scenario

### Test Dataset

| Parameter | Value |
|-----------|-------|
| Wells | 50 |
| Logs per well | 5 (GR, DT, NPHI, RHOB, DEPTH) |
| Rows per log | 10,000 (depth points at 0.1m) |
| Channels total | 250 |
| Data points | 2,500,000 float64 values |
| Raw size | ~20 MB |

### Expected Performance (single node, 16GB RAM)

| Operation | RDDMS (PG+ETP) | Parquet (Azure Blob) | OSDU SoR | TimescaleDB |
|-----------|-----------------|----------------------|----------|-------------|
| **Ingest all 50 wells** | ~2s | ~8s | ~120s | ~3s |
| **Query single log (10K pts)** | 3ms | 80ms | 500ms | 4ms |
| **Find logs where GR>80** | 15ms | 2s | N/A | 20ms |
| **Cross-well GR statistics** | 40ms | 3s | N/A | 50ms |
| **Append 1 new data point** | 2ms | 200ms (rewrite) | N/A | 2ms |
| **Stream 100 pts/sec** | ✅ native | ❌ batch only | ❌ | ✅ |
| **Hierarchical: well→logs→channels** | 5ms | N/A (external) | 800ms | N/A |

---

## Architecture Deep-Dive

### RDDMS (Current Implementation)

```
┌─────────────────────────────────────────────────────┐
│  Client (ORES UI / GraphQL / REST)                   │
└───────────────┬─────────────────────────────────────┘
                │ HTTP/GraphQL
┌───────────────▼─────────────────────────────────────┐
│  etp-client (Node.js REST bridge, port 8080)         │
│  • WITSML 1.3/1.4/2.1 parser                        │
│  • Array extraction (CSV → Float64Array)             │
│  • ExternalDataArrayPart injection                   │
│  • Transaction management                            │
└───────────────┬─────────────────────────────────────┘
                │ ETP 1.2 WebSocket (binary Avro)
┌───────────────▼─────────────────────────────────────┐
│  openETPServer (C++, port 9002)                      │
│  • Protocol 3: Discovery (GetResources)              │
│  • Protocol 4: Store (PutDataObjects)                │
│  • Protocol 9: DataArray (Put/GetDataArrays)         │
│  • Protocol 24: Transaction (Start/Commit)           │
└───────────────┬─────────────────────────────────────┘
                │ SQL
┌───────────────▼─────────────────────────────────────┐
│  PostgreSQL (port 5433)                              │
│  • Schema per dataspace (smaap_{hash})               │
│  • res: object registry (uuid, name, type)           │
│  • obj: full XML storage                             │
│  • ary: array metadata + inline bytea               │
│  • bin: chunked array storage (large arrays)         │
│  • rel: object relationships (graph edges)           │
└─────────────────────────────────────────────────────┘
```

**Storage layout (per channel):**
```
ary row: { path: "WITSML/{uuid}/{mnemonic}", type: 1 (float64), dim1: N, value: <N×8 bytes> }
```

**Query path (GraphQL → PG direct):**
```
deepSearch(typeName:"Log", includeStatistics:true)
  → pg_batch_arrays_for_objects([obj_ids])     # 1 query: all arrays for all logs
  → pg_read_array_by_id(ary_id)               # 1 query per channel: inline bytea
  → _compute_statistics(values)                # in-process: O(N)
  → response with per-channel min/max/mean/stddev
```

### Parquet on Blob Storage

```
┌─────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  Client     │───▶│  Query Engine    │───▶│  Azure Blob /    │
│             │    │  (Spark/DuckDB)  │    │  S3 / GCS        │
└─────────────┘    └──────────────────┘    └──────────────────┘
                         │                        │
                    Compute (scan)          Cold storage
                    No real-time            Immutable files
```

**Pros:**
- Excellent compression (columnar, Snappy/ZSTD)
- Very cheap long-term storage
- Great for batch analytics (Spark, DuckDB, Polars)
- Ecosystem support (pandas, pyarrow)

**Cons:**
- No real-time append (must rewrite entire row group)
- No transactional writes (concurrent writers conflict)
- No built-in relationship graph
- No WITSML/ETP compliance
- Requires external metadata index
- High query latency for point lookups

### OSDU Well System of Record

```
┌─────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  Client     │───▶│  OSDU Search     │───▶│  Cosmos/Elastic  │
│             │    │  (Indexer)       │    │  (metadata)      │
└─────────────┘    └──────────────────┘    └──────────────────┘
                         │                        │
                    Flat key-value            No curve data
                    Ingestion workflow        External WPC blob ref
```

**Pros:**
- Standard OSDU schema (Well, Wellbore, WPC records)
- Integrated with OSDU ACL/legal/entitlements
- Full-text search across metadata

**Cons:**
- Cannot store actual curve data (only blob references)
- Ingestion requires manifest → workflow → indexer pipeline (seconds to minutes)
- Flattens WITSML XML to fixed schema (data loss)
- No real-time capability
- No cross-log statistics
- Complex operational setup

---

## When to Use What

| Use Case | Best Option | Why |
|----------|-------------|-----|
| **Live drilling data (MWD/LWD)** | RDDMS | ETP real-time, sub-second ingest, transactional |
| **Production surveillance** | RDDMS or TimescaleDB | Continuous time-series append |
| **Historical log archive** | Parquet on Blob | Cheap storage, batch analytics |
| **OSDU catalog metadata** | OSDU Well SoR | Standard discovery, ACL, legal |
| **Cross-well correlation** | RDDMS (GraphQL) | Statistics + filter in single query |
| **DLIS bulk import** | RDDMS | Binary array storage, WITSML mapping |
| **Petrophysics batch processing** | Parquet + DuckDB | Columnar scan, vectorized compute |
| **Multi-well decline curves** | TimescaleDB | Time-partitioned, continuous aggregates |

---

## RDDMS Unique Advantages for WITSML/DLIS

### 1. Zero-loss Round-trip

```
WITSML 1.4.1 XML → parse → store as 2.1 envelope (original in CustomData)
                                      ↓
                              retrieve → unwrap → original 1.4.1 XML
```

No flattening, no schema mapping loss. The original XML is preserved byte-for-byte.

### 2. Native ETP Protocol

The only option that speaks Energistics ETP 1.2 natively:
- PutDataObjects (store objects)
- PutDataArrays (store curve data in same transaction)
- GetDataObjects (retrieve objects)
- GetDataArrays (retrieve curve data)
- ChannelStreaming (future: real-time push)

### 3. Unified Graph + Arrays

```sql
-- PG schema gives you both:
-- Object graph (well → wellbore → log → channels)
SELECT r.name, t.name as type FROM res r JOIN typ t ON r.typ_id = t.id;

-- Array data (inline or chunked)
SELECT path, dim1, value FROM ary WHERE obj_id = ?;
```

Other options require separate systems for metadata graph and curve storage.

### 4. GraphQL Deep Queries

Single request returns cross-object aggregated data:
```graphql
{
  deepSearch(dataspace: "maap/witsml", typeName: "Log", includeStatistics: true) {
    objects {
      title
      properties {        # ← channels presented as properties
        title kind        # ← mnemonic (GR, DT, NPHI, RHOB)
        statistics { count minValue maxValue mean stdDev }
      }
    }
  }
}
```

### 5. DLIS Support Path

DLIS (Digital Log Interchange Standard) binary files map directly to the same storage:
```
DLIS Frame → equivalent to WITSML ChannelSet
DLIS Channel → equivalent to WITSML Channel
DLIS curve data → same Float64Array → ary.value bytea

Conversion: dlisio → extract frames → create witsml21.Log XML → PUT via ETP
```

---

## Cost Comparison (50 wells, 250 channels, 20MB curves)

| Component | RDDMS | Parquet+Blob | OSDU Platform |
|-----------|-------|--------------|---------------|
| **Storage** | ~$2/mo (PG on 1 vCPU VM) | ~$0.50/mo (blob) | ~$50/mo (Cosmos+Blob+Search) |
| **Compute** | Included (PG queries) | $5-20/query (Spark cluster) | Included (Elastic) |
| **Ingest** | 0 (direct PUT) | $1-5/batch (Spark job) | $10-50/batch (workflow) |
| **Real-time** | 0 additional | N/A | N/A |
| **Total/month** | **~$5** | **~$10-30** | **~$100+** |

*Costs for dev/test scale. Production adds HA, backups, monitoring.*

---

## Conclusion

**RDDMS is the optimal choice for operational well data** because:

1. **Only option with native WITSML/ETP compliance** — no custom mapping layer
2. **Lowest ingest latency** — critical for real-time drilling
3. **Richest query capability** — statistics, filters, relationships in one call
4. **Lowest operational cost** — single PostgreSQL instance
5. **Lossless round-trip** — original XML preserved, no schema mapping loss

**Parquet is complementary** for:
- Long-term archive (cold storage cost)
- Batch petrophysics (columnar scan)
- Export to data science tools

**OSDU Well SoR is complementary** for:
- Catalog/discovery (who owns this well?)
- Legal/ACL (who can access this well?)
- Cross-platform search (find wells by field, operator)

The recommended architecture: **RDDMS as domain store + OSDU SoR as catalog index + Parquet for archive/analytics**.
