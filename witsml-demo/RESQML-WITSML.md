# RESQML vs WITSML — Well Data Model Comparison

> Technical comparison of the two Energistics standards for well data,
> focusing on data models, capabilities, and what is gained or lost in conversion.

---

## Why Two Standards?

| | WITSML | RESQML |
|--|--------|--------|
| **Domain** | Drilling, completions, interventions, real-time rig operations | Subsurface modeling, interpretation, simulation |
| **Primary users** | Drilling engineers, MWD/LWD, service companies, rig-to-office | Geoscientists, reservoir engineers, modelers |
| **Design philosophy** | Flat operational records (Well→Wellbore→Log) | Graph-based interpretation model (Feature→Interpretation→Representation→Property) |
| **Data transfer** | Near-real-time streaming + batch (ETP, SOAP) | File-based exchange (EPC/HDF5) + ETP |
| **Array storage** | Inline XML (`<logData>`) or ETP DataArrays | External HDF5 files or ETP DataArrays |
| **Metadata richness** | High — operators, status, dates, acquisition, UoM per curve | Minimal on wells — focuses on geometry and topology |
| **Versioning** | 1.3.1 → 1.4.1 → 2.0 → 2.1 (container-based → single-object) | 2.0.1 → 2.2 (inheritance-heavy, polymorphic) |

**In short:** WITSML answers "what was drilled, measured, and when" — RESQML answers "what does the subsurface look like and how do we model it."

---

## Data Model Comparison

### Well Identity

| Aspect | WITSML `Well` | RESQML `WellboreFeature` |
|--------|---------------|--------------------------|
| Geographic location | `GeographicLocationWGS84` (lat/lon/CRS) | Not stored (no coordinates) |
| Well status | `StatusWell` (active, plugged, suspended…) | Not applicable |
| Operators | `FacilityOperators`, `CurrentOperatorID` | Not applicable |
| Vertical datums | `VerticalMeasurements`, `DefaultVerticalCRS` | Not applicable |
| Regulatory IDs | `WellAlias`, `NumGovt`, `NumAPI` | Not applicable |
| Purpose | Operational master record | Thin identity placeholder for interpretation graph |
| OSDU kind | `master-data--Well:1.3.0` | None (no OSDU projection) |

**RESQML's `WellboreFeature` is intentionally minimal.** It exists solely to anchor the interpretation graph. All operational metadata (location, status, operators) belongs in WITSML. The feature may contain a `WitsmlWellWellbore` cross-reference pointing back to the WITSML record.

### Wellbore

| Aspect | WITSML `Wellbore` | RESQML `WellboreInterpretation` |
|--------|-------------------|--------------------------------|
| Parent reference | `WellID` (flat FK) | `InterpretedFeature` → `WellboreFeature` (DOR graph link) |
| Status | `StatusWellbore`, `IsActive`, `Purpose` | `IsDrilled` (boolean: drilled vs planned) |
| Sidetrack number | `SequenceNumber` | Not stored (multilaterals via `ParentIntersection`) |
| Target formation | `TargetFormation`, `FormationNameAtTotalDepth` | Not applicable |
| Depth references | `VerticalMeasurements`, `DefaultVerticalMeasurementID` | Local CRS reference on geometry |
| Bottom-hole location | `ProjectedBottomHoleLocation`, `GeographicBottomHoleLocation` | Not applicable |
| OSDU kind | `master-data--Wellbore:1.3.0` | None |

### Trajectory

| Aspect | WITSML `Trajectory` | RESQML `WellboreTrajectoryRepresentation` |
|--------|--------------------|--------------------------------------------|
| Parent | `WellboreID` (flat FK) | `RepresentedInterpretation` → `WellboreInterpretation` |
| Station data | `<TrajectoryStation>` with MD, Incl, Azi per row | Parametric line geometry (control points + tangent vectors) |
| Array storage | Float64Arrays at `/WITSML/{uuid}/{mnemonic}` | HDF5 external arrays via `AbstractParametricLineGeometry` |
| Azimuth reference | `AziRef` (grid north, true north, magnetic) | `MdDomain` (driller vs logger) |
| MD range | `MdMinMeasured`, `MdMaxMeasured` | `MdInterval` with datum reference |
| Multilateral support | Not modeled (one trajectory per wellbore) | `ParentIntersection` with `KickoffMd` + parent trajectory DOR |
| Acquisition metadata | `AcquisitionRemark`, `ServiceCompanyID`, `SurveyToolType` | Not applicable |
| CRS | Implied by parent Well's CRS | Explicit `LocalCrs` on the representation |
| OSDU kind | `work-product-component--WellboreTrajectory:1.3.0` | None |

### Well Logs / Curve Data

| Aspect | WITSML `Log` | RESQML `WellboreFrameRepresentation` + Properties |
|--------|--------------|---------------------------------------------------|
| Structure | Single object with multiple `LogCurveInfo` channels | Frame (defines MD nodes) + separate `ContinuousProperty` / `DiscreteProperty` objects per curve |
| Index | First `LogCurveInfo` (MD or time), `IndexType` attribute | `NodeMd` array on the frame |
| Curve metadata | `Mnemonic`, `Unit`, `TypeLogData`, `NullValue` per curve | `PropertyKind` + UOM reference per property object |
| Supported types | `double`, `double array`, `int`, `string`, `date time` | `FloatingPointExternalArray`, `IntegerExternalArray`, `BooleanExternalArray` |
| Multi-dim arrays | Bracket encoding `[v1 v2 v3]` → `Float64Array[rows, dim]` | Multi-dim HDF5 external arrays |
| Inline data | `<logData><data>` rows in XML (WITSML ≤2.0) or `<Data><Data>` (2.1) | Never inline — always external references |
| Array path | `/WITSML/{uuid}/{mnemonic}` | `/RESQML/{uuid}/{pathInHdf}` |
| OSDU kind | `work-product-component--WellLog:1.3.0` | None (properties on frames explicitly skipped) |

---

## Relationship Models

### Three-Way Mapping: WITSML ↔ OSDU ↔ RESQML

```mermaid
%%{init: {'theme': 'default', 'themeVariables': {'fontSize': '14px'}}}%%
flowchart TD
    W[witsml21.Well] -->|converter| OW[master-data--Well]
    WB[witsml21.Wellbore] -->|converter| OWB[master-data--Wellbore]
    LOG[witsml21.Log] -->|converter| OWL[WPC--WellLog]
    TRAJ[witsml21.Trajectory] -->|converter| OWT[WPC--WellboreTrajectory]

    WF[resqml20.WellboreFeature] -.->|no converter| X1[ ]
    WTR[resqml20.WellboreTrajectoryRep] -.->|no converter| X2[ ]
    WFR[resqml20.WellboreFrameRep] -.->|skipped| X3[ ]

    WF -.->|DOR cross-ref| W
    WTR -.->|DOR cross-ref| TRAJ

    style OW fill:#2d6a4f,color:#fff
    style OWB fill:#2d6a4f,color:#fff
    style OWL fill:#1d4ed8,color:#fff
    style OWT fill:#1d4ed8,color:#fff
    style X1 fill:none,stroke:none
    style X2 fill:none,stroke:none
    style X3 fill:none,stroke:none
```

### WITSML Hierarchy → OSDU Records

```mermaid
flowchart LR
    subgraph ETP[ETP Dataspace]
        W2[Well] --> WB2[Wellbore]
        WB2 --> L2[Log\n46 channels x 655 pts]
        WB2 --> T2[Trajectory\nMD + Incl + Azi]
    end

    subgraph OSDU[OSDU Catalog]
        MW[master-data--Well\nFacilityName, Location]
        MWB[master-data--Wellbore\nWellID, Depths]
        WL[WPC--WellLog\nCurves, DDMSDatasets]
        WT[WPC--WellboreTrajectory\nAzimuthRef, DDMSDatasets]
        DS[dataset--ETPDataspace\nmaap/witsml]
    end

    W2 ==> MW
    WB2 ==> MWB
    L2 ==> WL
    T2 ==> WT
    DS -.-> MW
```

### RESQML Interpretation Graph (no OSDU projection)

```mermaid
flowchart LR
    WF[WellboreFeature] --> WI[WellboreInterpretation]
    WI --> WTR[WellboreTrajectoryRep\nparametric line geometry]
    WTR --> WFR[WellboreFrameRep\nMD node array]
    WFR --> P1[Property: GR]
    WFR --> P2[Property: RHOB]
    WFR --> P3[Property: DT]

    WF -.->|WitsmlWellWellbore| WITSML[WITSML Well]
    WTR -.->|WitsmlTrajectory| WITSML2[WITSML Trajectory]

    style WITSML fill:#2d6a4f,color:#fff
    style WITSML2 fill:#2d6a4f,color:#fff
```

### Source Type → OSDU Kind Mapping

| ETP Source Type | OSDU Kind | Converter | Key Fields Mapped |
|-----------------|-----------|-----------|-------------------|
| `witsml21.Well` | `master-data--Well:1.3.0` | `WitsmlWell.ts` | FacilityName, SpatialLocation, FacilityStates, VerticalMeasurements |
| `witsml21.Wellbore` | `master-data--Wellbore:1.3.0` | `WitsmlWellbore.ts` | FacilityName, WellID, TargetFormation, TopDepth, BottomDepth |
| `witsml21.Log` | `WPC--WellLog:1.3.0` | `WitsmlWellLog.ts` | Name, WellboreID, Curves[], DDMSDatasets (ETP DataArray URIs) |
| `witsml21.Trajectory` | `WPC--WellboreTrajectory:1.3.0` | `WitsmlTrajectory.ts` | Name, WellboreID, AzimuthRef, DDMSDatasets |
| `resqml20.obj_WellboreFeature` | — | **None** | Not mappable (lacks location, status, operators) |
| `resqml20.obj_WellboreInterpretation` | — | **None** | Not mappable (no OSDU schema for interpretations) |
| `resqml20.obj_WellboreTrajectoryRepresentation` | — | **None** | Could map to WellboreTrajectory but no converter implemented |
| `resqml20.obj_WellboreFrameRepresentation` | — | **Skipped** | Properties explicitly excluded from manifesting |
| `resqml20.obj_IjkGridRepresentation` | `WPC--EarthModel:1.0.0` | `IjkGrid.ts` | Name, mesh dimensions (not well-specific) |
| `resqml20.obj_TriangulatedSetRepresentation` | `WPC--StructureMap:1.0.0` | `TriangulatedSet.ts` | Name, surface geometry |

### What RESQML Wells Would Need for OSDU Mapping

To project RESQML well objects to OSDU, a converter would need to:

1. **`WellboreFeature` → `master-data--Well`**: Resolve the `WitsmlWellWellbore` DOR to get coordinates and metadata (requires the linked WITSML Well to exist), OR accept a well record with no location.
2. **`WellboreTrajectoryRepresentation` → `WPC--WellboreTrajectory`**: Extract MD stations from the parametric line geometry, compute inclination/azimuth from control points + tangent vectors. Lossy (geometry type not preserved).
3. **`WellboreFrameRepresentation` + Properties → `WPC--WellLog`**: Flatten separate property objects into a single WellLog with Curves[]. Each property's PropertyKind maps to a mnemonic.

These converters are not implemented because RESQML well data typically coexists with WITSML counterparts — the WITSML objects provide the authoritative OSDU projection.

---

### WITSML → OSDU Field Mapping

| WITSML XML Field | OSDU Record Field | Notes |
|-----------------|-------------------|-------|
| `uuid` attribute | `id` (SRN: `opendes:master-data--Well:{uuid}`) | Deterministic v5 UUID |
| `Citation.Title` | `data.FacilityName` | Display name |
| `GeographicLocationWGS84` | `data.SpatialLocation` | Lat/lon + CRS |
| `StatusWell` | `data.FacilityStates[]` | Active, plugged, suspended |
| `WellAlias` | `data.FacilityNameAliases[]` | Regulatory IDs |
| `VerticalMeasurements` | `data.VerticalMeasurements[]` | KB, DF, GL datums |
| `Wellbore.WellID` | `data.WellID` (SRN) | Parent reference |
| `Log.LogCurveInfo[]` | `data.Curves[]` | Mnemonic + UoM per channel |
| `Log` ETP URI | `data.DDMSDatasets[]` | Links OSDU record to ETP DataArrays |
| `Trajectory.AziRef` | `data.AzimuthReferenceType` | Grid/True/Magnetic north |
```

---

## What Gets Lost in Conversion

### WITSML → RESQML (operational → model)

| Lost | Why |
|------|-----|
| Geographic coordinates | RESQML features have no location fields |
| Well status / operator history | Not in RESQML schema |
| Acquisition metadata (service company, tool type, date) | RESQML is interpretation, not acquisition |
| Vertical datum details | Simplified to a local CRS reference |
| Index direction (increasing/decreasing) | Implicit in MD array ordering |
| Null value conventions (`-999.25`) | Must be handled at property level |
| Real-time streaming context | RESQML is static exchange |

### RESQML → WITSML (model → operational)

| Lost | Why |
|------|-----|
| Multilateral parent intersections | WITSML has no `ParentIntersection` concept |
| Interpretation vs representation distinction | WITSML has no feature/interp/rep separation |
| Per-property provenance/history | WITSML curves are columns in one object |
| Local CRS topology | WITSML uses global CRS on the Well |
| Parametric line geometry types (cubic, tangent, min curvature) | WITSML stores stations, not geometry type |
| Property-to-property relationships | No graph linking in WITSML |
| `IsDrilled` vs planned semantics | WITSML uses `Purpose` enum, less formal |

---

## How RDDMS Handles the Three-Layer Architecture

```mermaid
flowchart TB
    subgraph Sources[Data Sources]
        DLIS[DLIS files]
        LAS[LAS files]
        EPC[EPC/HDF5 packages]
        RT[Real-time rig sensors]
    end

    subgraph RDDMS[Reservoir DDMS]
        direction TB
        WITSML_STORE[WITSML Store\nWell, Log, Trajectory]
        RESQML_STORE[RESQML Store\nIjkGrid, Surfaces, WellboreFeature]
        ARRAYS[DataArray Store\nFloat64Arrays per channel]
    end

    subgraph OSDU[OSDU Data Platform]
        MANIFEST[Manifest Builder\nWitsmlWell.ts, WitsmlWellLog.ts]
        CATALOG[Storage / Search API\ninterop, eqndev, preship]
        SEARCH[OSDU Search\nkind-based queries]
    end

    DLIS -->|dlis_to_witsml.py| WITSML_STORE
    LAS -->|las_to_witsml| WITSML_STORE
    EPC -->|docker cp + import| RESQML_STORE
    RT -->|ETP Protocol 21| WITSML_STORE

    WITSML_STORE --> ARRAYS
    RESQML_STORE --> ARRAYS

    WITSML_STORE ==>|converters| MANIFEST
    MANIFEST ==>|POST /api/manifest/ingest| CATALOG
    CATALOG --> SEARCH

    RESQML_STORE -.->|no converter - raw ETP only| CATALOG
```

The system implements a **three-layer architecture**:

1. **ETP Layer (lossless storage):** Both WITSML and RESQML objects stored as native XML in PostgreSQL via ETP Protocol 4 (Store). Full fidelity preserved — no conversion at write time.

2. **Array Layer (shared):** Both standards use ETP Protocol 9 (DataArray) for bulk numeric data. WITSML arrays stored at `/WITSML/{uuid}/{mnemonic}`, RESQML at `/RESQML/{uuid}/{hdfPath}`. Same Float64Array backend.

3. **OSDU Layer (projection):** Manifest builder reads WITSML objects from ETP, runs type-specific converters (`WitsmlWell.ts` → `master-data--Well:1.3.0`), and produces OSDU records for catalog ingestion. RESQML objects remain ETP-only — discoverable via URI but not in OSDU Search.

4. **Cross-protocol search:** The `/wells` endpoint queries both `witsml21.Well` and `resqml20.obj_WellboreFeature` per dataspace, preferring WITSML. GraphQL `federatedSearch` merges local RDDMS + OSDU catalog results.

5. **Cross-references:** RESQML `WitsmlWellWellbore` / `WitsmlTrajectory` DORs link interpretation objects back to operational WITSML records, enabling navigation without duplication.

### Compliance Summary

| Aspect | Status |
|--------|--------|
| WITSML 2.1 XML namespace (`energyml/data/witsmlv2`) | Compliant |
| WITSML 1.4.1 namespace (`witsml.org/schemas/1series`) | Compliant |
| EML Citation on WITSML objects | Generated with UUID + Title + creation date |
| No `xsi:type` on WITSML root (element name = type) | Correct per spec |
| `xsi:type` on RESQML polymorphic elements | Parsed correctly by `processXsiType()` |
| ETP URI type identification | `dataObjectType` from URI used as `$type` fallback |
| Array storage paths | Follow server convention (`/WITSML/` or `/RESQML/` prefix) |
| Demo XML files | Valid against respective schemas |

---

## When to Use Which

| Scenario | Use |
|----------|-----|
| Real-time drilling data from rig | WITSML (streaming via ETP Protocol 21) |
| Well log from wireline service | WITSML `Log` (operational, has acquisition metadata) |
| Directional survey for drilling ops | WITSML `Trajectory` (has tool type, azimuth ref) |
| **Petrophysical raw curves (DLIS/LAS3)** | **WITSML** — 1:1 mapping (channels = curves), single object per log, units/mnemonics native |
| **Computed petrophysics (Vshale, Sw, φ)** | **WITSML** for storage/exchange; RESQML if you need to link results to source interpretation |
| **Interpretation lineage (curve → model)** | **RESQML** — PropertyKind taxonomy + FIRP links curve to the interpretation that produced it |
| Earth model with well paths and properties | RESQML (geometry + property graph) |
| Reservoir simulation with wellbore completions | RESQML + PRODML (connected model) |
| Multi-well comparison / QC | WITSML (flat, queryable, has units) |
| Publishing to OSDU catalog | WITSML (has converters) → OSDU records |
| Subsurface interpretation workflow | RESQML (feature/interp/rep pattern) |
| Both operational + model context needed | Store both; link via DOR cross-references |

### Petrophysical Data: DLIS / LAS3 → Which Standard?

DLIS and LAS files are **indexed channel data** — depth (or time) vs. N measurement curves. This maps directly to:

| Standard | Representation | Objects per 46-channel log | Inline data? |
|----------|---------------|---------------------------|-------------|
| WITSML 2.1 | `ChannelSet` + `Channel[]` | **1** (channels nested) | Yes (XML or ETP DataArray) |
| WITSML 1.4.1 | `Log` + `LogCurveInfo[]` + `<logData>` | **1** | Yes (inline CSV) |
| RESQML 2.2 | `WellboreFrameRepresentation` + N × `ContinuousProperty` | **48** (1 frame + 1 index + 46 props) | No (HDF5 or DataArray only) |

**Verdict:** For bulk petrophysical data (raw or computed), WITSML is the practical choice:
- Every tool (Techlog, IP, GeolOG, Petrel) exports LAS/DLIS/WITSML natively — none export RESQML logs
- `dlis_to_witsml.py` converts frames directly: DLIS channel → WITSML LogCurveInfo, same units/mnemonics
- Single-object storage means one ETP `PutDataObjects` call per log run

RESQML adds value **only** when you need to:
- Link a computed curve (e.g., Vshale) back to the interpretation that produced it (via FIRP)
- Attach a `PropertyKind` from the Energistics property taxonomy (e.g., `porosity`, `water saturation`)
- Include curves in a geological model alongside grids, horizons, and faults

---

## Data Model Deficiencies & Mapping Gaps

### WITSML Deficiencies

| Issue | Impact | Workaround |
|-------|--------|------------|
| **No interpretation semantics** — WITSML stores measurements, not what they mean. A gamma-ray log has no formal link to a lithology interpretation. | Cannot traverse from measurement to geological conclusion without external context. | Store RESQML interpretation alongside; cross-reference via DOR. |
| **No multilateral modeling** — Trajectory is one-per-wellbore with no parent intersection concept. | Multilateral wells require separate wellbores with no formal junction point geometry. | RESQML `ParentIntersection` fills this gap. |
| **Flat parent-child only** — Well→Wellbore→Log. No graph relationships between logs, no property-to-property links. | Cannot model that GR_edited was derived from GR_raw, or that a composite log merges two runs. | Custom `ExtensionNameValue` or out-of-band lineage tracking. |
| **No geometry type** — Trajectory stores stations (MD, Incl, Azi) but not the interpolation method between them (minimum curvature, tangential, cubic). | Clients must assume minimum curvature; other methods produce different XYZ paths from same stations. | Add `SurveyToolType` hint or store computed XYZ alongside. |
| **Null value convention (`-999.25`)** — Not formally typed. A sensor reading of -999.25 is indistinguishable from a null. | Ambiguity in curves with extreme negative values (temperature, depth corrections). | Use `NullValue` per LogCurveInfo if set; otherwise consumers must guess. |
| **No uncertainty model** — Measurements have no error bars, confidence intervals, or probability distributions. | Directional survey accuracy (ellipses of uncertainty) cannot be expressed. | ISCWSA MWD error models applied externally. |
| **Version fragmentation** — 1.3.1, 1.4.1, 2.0, 2.1 have different container structures, namespaces, and element names for the same concepts. | Parsers must handle 4+ formats. The `typeMap` in `Witsml.controller.ts` exists solely because of this. | Normalize to 2.1 internal representation at ingest time. |

### RESQML Deficiencies

| Issue | Impact | Workaround |
|-------|--------|------------|
| **No operational metadata** — WellboreFeature has no location, status, operator, or dates. | A RESQML-only dataset cannot answer "where is this well?" or "who operates it?" | Always pair with WITSML; use `WitsmlWellWellbore` DOR. |
| **Over-decomposed well logs** — Each curve is a separate `Property` object, requiring N+1 objects for N curves plus the frame. | A 46-channel log = 48 ETP objects (1 frame + 1 index + 46 properties). Management overhead is high. | WITSML Log bundles all curves in one object. |
| **No inline data** — All arrays must be external (HDF5 or DataArray). | Cannot produce a self-contained XML file with curve values. Simple exchange requires HDF5 infrastructure. | Use ETP DataArray protocol or package as EPC (ZIP + HDF5). |
| **Inheritance complexity** — `xsi:type` required on polymorphic elements; deep class hierarchies (`AbstractRepresentation` → `AbstractGridRepresentation` → `IjkGridRepresentation`). | Steep learning curve; parsers must handle type discrimination. Tooling maturity lower than WITSML. | Code generators from XSD; `processXsiType()` normalizes to flat `$type`. |
| **No streaming/real-time support** — Designed for static file exchange. No concept of growing objects or channel subscriptions. | Cannot receive live data in RESQML format. | Use WITSML + ETP Protocol 6/21 for real-time; convert to RESQML post-acquisition. |
| **Weak provenance** — `Citation` has creation date and originator, but no formal lineage chain (who modified what, when, from which source). | Version tracking across interpretation iterations is ad-hoc. | Use OSDU lineage or external provenance systems. |

### OSDU Schema Deficiencies

| Issue | Impact | Workaround |
|-------|--------|------------|
| **No native array storage** — OSDU records are JSON metadata only. Curve/grid data must live in external file services (blob, DDMS). | WellLog record describes curves but doesn't contain them. Requires a separate DDMS call to get actual values. | `DDMSDatasets[]` field links to ETP DataArray URIs; RDDMS serves the arrays. |
| **Lossy abstraction** — `master-data--Well:1.3.0` flattens rich WITSML structures (multiple vertical datums, nested location CRS, extension properties) into fixed schema fields. | Uncommon fields drop silently if the converter doesn't map them. `ExtensionNameValue` pairs often lost. | Map to `ExtensionProperties` bag; accept some loss as cost of catalog uniformity. |
| **No interpretation layer** — OSDU has `master-data` and `work-product-component` but no concept of RESQML's feature/interpretation/representation pattern. | Cannot express "this trajectory is one interpretation of that wellbore feature" in OSDU's type system. | Store RESQML objects in RDDMS; OSDU references only the authoritative version. |
| **Schema version coupling** — `WellLog:1.3.0` schema may not match fields available in WITSML 2.1 vs 1.4.1 outputs. OSDU schemas evolve independently of Energistics. | Converter must target a specific OSDU schema version; newer WITSML fields may have no OSDU slot. | Map to closest field or drop; upgrade converters when OSDU schema evolves. |
| **No relationship graph** — OSDU uses SRN references (string IDs) between records. No typed edges, no cardinality constraints, no traversal queries. | "Find all logs for this well" requires a Search API query with filter, not a graph traversal. | Build relationships into search queries; RDDMS GraphQL adds graph capability on top. |
| **Partition isolation** — Records in `opendes` partition cannot reference records in another partition. Multi-tenant scenarios fragment the data graph. | Wells from different operators in the same OSDU instance cannot be linked in a single manifest. | Use one partition per project; accept cross-partition queries require federation. |
| **ETPDataspace is a custom kind** — `dataset--ETPDataspace:1.0.1` is not an official OSDU community schema. It's a local extension to bridge RDDMS dataspaces with the catalog. | Interoperability with other OSDU implementations depends on them accepting this custom kind. | Register as community schema; or rely solely on WPC records for discoverability. |

### Cross-Standard Mapping Gaps

| Mapping | Gap | Severity |
|---------|-----|----------|
| RESQML WellboreFeature → OSDU Well | WellboreFeature alone has no coordinates/status, but FIRP traversal (Feature→Interpretation→TrajectoryRepresentation) can yield XYZ. Requires multi-object graph walk. | Medium (implementable via FIRP traversal) |
| RESQML Properties → OSDU WellLog Curves[] | One-to-many mismatch (N properties → 1 WellLog) | Medium (implementable but complex) |
| WITSML multilateral → RESQML | No junction geometry in WITSML | Medium (requires external data) |
| WITSML uncertainty → anywhere | No uncertainty model in any of the three schemas | High (industry gap) |
| OSDU → WITSML (reverse) | OSDU records lack full XML content; cannot reconstruct valid WITSML from catalog record alone | High (OSDU is metadata-only) |
| Time-indexed logs | WITSML supports time index; RESQML Frame is MD-only; OSDU WellLog assumes depth | Medium (time logs partially supported) |
| PRODML production data → OSDU | No converter implemented; PRODML objects stored as raw ETP only | Medium (orthogonal to wells) |

---

## Discussion: Wellbore DDMS vs RDDMS — How WITSML is Stored

### How Wellbore DDMS (WDDMS) Stores WITSML

The OSDU **Wellbore DDMS** (community implementation by EPAM/Schlumberger) takes a **decompose-and-flatten** approach:

1. **Ingest via REST API** — WITSML XML is parsed at the API boundary. The XML envelope is discarded; individual fields are extracted into JSON columns.
2. **Relational storage** — Each WITSML object type gets a dedicated PostgreSQL table (or Cosmos DB collection). `Well`, `Wellbore`, `Log`, `Trajectory`, `FluidsReport` are separate entities with foreign-key relationships.
3. **Curve data in blob/parquet** — Log curve values are stripped from XML and stored in Apache Parquet files on Azure Blob / AWS S3. The WDDMS serves them via a custom `/data` endpoint returning columnar batches.
4. **Schema-locked** — The internal data model is tightly coupled to the OSDU WPC schemas (`WellLog:1.3.0`, `WellboreTrajectory:1.3.0`). Ingest rejects fields not in the target schema.
5. **No native WITSML preservation** — The original XML is not retained. Round-tripping (store → retrieve → get identical WITSML) is not guaranteed.
6. **Version-specific parsers** — Separate ingest paths for WITSML 1.4.1 vs 2.0 vs 2.1, each with bespoke field extraction logic.

```
┌─────────────────────────────────────────────────────────┐
│  Wellbore DDMS (WDDMS)                                  │
│                                                         │
│  Client → REST API → XML Parser → Field Extraction      │
│                          ↓                              │
│              ┌───────────┴───────────┐                  │
│              │ JSON metadata (PG/Cosmos)                 │
│              │ Parquet arrays (Blob/S3)                  │
│              └───────────────────────┘                  │
│                                                         │
│  Retrieval: JSON response (lossy vs original XML)       │
└─────────────────────────────────────────────────────────┘
```

### How RDDMS Stores WITSML

RDDMS takes a **lossless-native** approach via ETP 1.2:

1. **Store via ETP Protocol 4 (Store)** — WITSML XML is stored verbatim as the `dataObject.data` blob. The full XML document (namespace, extensions, comments) is preserved byte-for-byte.
2. **Unified object store** — All Energistics objects (WITSML, RESQML, PRODML, EML Common) live in the same PostgreSQL store, keyed by ETP URI (`eml:///dataspace('x')/witsml21.Well(uuid)`). No type-specific tables.
3. **Curve data via ETP DataArrays** — Bulk numeric data stored as typed arrays (`Float64Array`, `Int64Array`) in PostgreSQL large objects or S3, served via ETP Protocol 9 (DataArray). Same protocol for WITSML channels and RESQML properties.
4. **Schema-agnostic** — RDDMS stores whatever the client sends. WITSML extensions, custom `ExtensionNameValue` pairs, vendor-specific elements — all preserved. No field filtering at ingest.
5. **Full round-trip fidelity** — `GetDataObjects` returns the exact XML that was `PutDataObjects`'d. Bitwise identical (modulo XML declaration normalization).
6. **OSDU projection is separate** — Manifest converters run on-demand (or at ingest-time via webhook) to produce OSDU catalog records. The converter is a read-only projection — it never modifies the stored object.

```
┌─────────────────────────────────────────────────────────┐
│  Reservoir DDMS (RDDMS)                                 │
│                                                         │
│  Client → ETP WebSocket → PutDataObjects (native XML)   │
│                              ↓                          │
│              ┌───────────────┴──────────────┐           │
│              │ XML blob (PG/S3) — lossless  │           │
│              │ DataArrays (typed binary)    │           │
│              └──────────────┬──────────────┘           │
│                             ↓ (on-demand)              │
│              ┌──────────────┴──────────────┐           │
│              │ Manifest Converter → OSDU    │           │
│              │ (read-only projection)       │           │
│              └─────────────────────────────┘           │
│                                                         │
│  Retrieval: Original XML via GetDataObjects (lossless)  │
│             OR OSDU JSON via catalog (lossy projection)  │
└─────────────────────────────────────────────────────────┘
```

### Comparison Table

| Dimension | Wellbore DDMS | RDDMS | Winner |
|-----------|--------------|-------|--------|
| **Storage fidelity** | Lossy — XML decomposed to JSON fields; extensions dropped | Lossless — original XML preserved verbatim | RDDMS |
| **Round-trip guarantee** | No — cannot reconstruct original WITSML from stored data | Yes — `GetDataObjects` returns exact input | RDDMS |
| **Protocol** | REST (custom endpoints per type) | ETP 1.2 (Energistics standard, binary Avro) | RDDMS (standards-based) |
| **Multi-standard support** | WITSML only | WITSML + RESQML + PRODML + EML Common | RDDMS |
| **Cross-standard linking** | Not possible — different DDMS instances | Native DOR cross-references in same store | RDDMS |
| **Schema evolution** | Requires DB migration + parser update per new field | Store-once, add converter later — no re-ingest needed | RDDMS |
| **Array performance** | Parquet columnar (good for column-slice queries) | ETP DataArray (good for full-array retrieval, supports sub-arrays) | Tie (different trade-offs) |
| **OSDU catalog integration** | Native — WDDMS IS the OSDU implementation | Projection via manifest builder (decoupled) | WDDMS (tighter) |
| **Query capability** | SQL-like queries on decomposed fields | ETP GetDataObjects by URI/type + OSDU Search on projections | WDDMS (richer server-side filtering) |
| **Real-time streaming** | Not supported (batch REST only) | ETP Protocol 6 (ChannelSubscribe) + Protocol 21 (ChannelDataLoad) | RDDMS |
| **Vendor tool interop** | Custom REST clients needed | Any ETP 1.2 client (Petrel, TIBCO, custom) connects directly | RDDMS |
| **Extension data** | `ExtensionNameValue` pairs may be dropped | All extensions preserved in XML blob | RDDMS |
| **Version handling** | Separate code paths per WITSML version | Version-agnostic store; converters handle version differences | RDDMS |
| **Deployment complexity** | Simpler (REST API + blob store) | Higher (ETP C++ server + WebSocket infra + manifest pipeline) | WDDMS |

### Why RDDMS is Superior for WITSML

**1. Lossless storage is non-negotiable for subsurface data.**
Wellbore data has regulatory and legal significance. A well trajectory used to plan a $200M drilling campaign must be retrievable exactly as submitted. WDDMS's decompose-and-flatten approach means that if a field isn't mapped to the internal schema, it's silently lost. RDDMS stores the original — always.

**2. ETP is the Energistics standard; REST is not.**
WDDMS uses a bespoke REST API that no industry tool speaks natively. RDDMS speaks ETP 1.2 — the same protocol that Petrel, TIBCO StreamBase, Emerson's own tools, and the Energistics certification suite use. Any ETP-certified client connects without custom integration.

**3. Cross-standard linking eliminates data silos.**
A geoscientist's interpretation (RESQML) of a driller's survey (WITSML) stored in the same dataspace with DOR references means you can traverse from `HorizonInterpretation` → `WellboreFrameRepresentation` → `WitsmlWellWellbore` → `Well` in a single graph walk. WDDMS can't reference RESQML objects at all.

**4. Schema evolution without re-ingestion.**
When OSDU adds `WellLog:1.4.0` or WITSML 2.2 introduces new elements, RDDMS needs only a new converter — the stored objects are already complete. WDDMS must: (a) update parsers, (b) migrate existing records, (c) potentially re-ingest from source because dropped fields are unrecoverable.

**5. Real-time capability.**
RDDMS handles live drilling data via ETP streaming protocols (ChannelSubscribe, ChannelDataLoad). The same server that stores historical logs can receive and forward real-time MWD data. WDDMS has no streaming capability — it's batch-only.

**6. Single system for the full well lifecycle.**
From real-time acquisition (ETP streaming) → operational storage (WITSML native) → interpretation context (RESQML cross-ref) → catalog discovery (OSDU projection) → simulation input (RESQML grids + properties) — RDDMS covers the entire lifecycle. WDDMS handles only the middle slice.

### When WDDMS Might Be Preferred

- **Simpler deployment** — No WebSocket infrastructure, no C++ binary server, no ETP handshake complexity
- **Direct OSDU integration** — If your only goal is populating the OSDU catalog and you don't need lossless storage or cross-standard linking
- **Server-side query filtering** — WDDMS can filter curves by mnemonic or depth range server-side via SQL; ETP requires fetching the object and filtering client-side (though RDDMS mitigates this with GraphQL)
- **Existing OSDU ecosystem tooling** — If your platform is built around OSDU REST APIs exclusively and adding ETP WebSocket support to all consumers is not feasible

### Conclusion

The Wellbore DDMS is adequate for **catalog-centric workflows** where OSDU JSON records are the primary consumption format and lossless XML preservation is not required. RDDMS is superior for **data-centric workflows** where fidelity, standards compliance, cross-standard integration, streaming, and full lifecycle coverage matter. In a mature OSDU deployment, both can coexist — WDDMS for simple catalog operations, RDDMS as the authoritative System of Engagement for subsurface professionals.

---

## References

- [Energistics WITSML Standards](https://energistics.org/witsml-data-standards)
- [Energistics RESQML Standards](https://energistics.org/resqml-data-standards)
- [ETP 1.2 Specification](https://energistics.org/energistics-transfer-protocol)
- [OSDU Well Schema `master-data--Well:1.3.0`](https://community.opengroup.org/osdu/data/data-definitions/-/tree/master/definitions/master-data/Well)
- XSD schemas: `energyml/data/witsmlv2` (WITSML 2.1), `energyml/data/resqmlv2` (RESQML 2.2)
