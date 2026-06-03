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
%%{init: {'theme': 'default', 'themeVariables': {'fontSize': '14px'}}}%%
flowchart LR
    subgraph ETP["ETP Dataspace (e.g. maap/witsml)"]
        W2[Well] --> WB2[Wellbore]
        WB2 --> L2[Log<br/>46 channels × 655 pts]
        WB2 --> T2[Trajectory<br/>MD + Incl + Azi]
    end

    subgraph OSDU["OSDU Catalog (interop)"]
        MW[master-data--Well<br/>FacilityName, Location]
        MWB[master-data--Wellbore<br/>WellID, Depths]
        WL[WPC--WellLog<br/>Curves, DDMSDatasets]
        WT[WPC--WellboreTrajectory<br/>AzimuthRef, DDMSDatasets]
        DS[dataset--ETPDataspace<br/>maap/witsml]
    end

    W2 ==> MW
    WB2 ==> MWB
    L2 ==> WL
    T2 ==> WT
    DS -.-> MW
```

### RESQML Interpretation Graph (no OSDU projection)

```mermaid
%%{init: {'theme': 'default', 'themeVariables': {'fontSize': '14px'}}}%%
flowchart LR
    WF[WellboreFeature] --> WI[WellboreInterpretation]
    WI --> WTR[WellboreTrajectoryRep<br/>parametric line geometry]
    WTR --> WFR[WellboreFrameRep<br/>MD node array]
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
    subgraph Sources["Data Sources"]
        DLIS[DLIS files]
        LAS[LAS files]
        EPC[EPC/HDF5 packages]
        RT[Real-time rig sensors]
    end

    subgraph RDDMS["Reservoir DDMS (ETP Server + PostgreSQL)"]
        direction TB
        WITSML_STORE["WITSML Store<br/>(witsml21.Well, Log, Trajectory)"]
        RESQML_STORE["RESQML Store<br/>(IjkGrid, Surfaces, WellboreFeature)"]
        ARRAYS["DataArray Store<br/>(Float64Arrays per channel)"]
    end

    subgraph OSDU["OSDU Data Platform"]
        MANIFEST["Manifest Builder<br/>(WitsmlWell.ts, WitsmlWellLog.ts…)"]
        CATALOG["Storage / Search API<br/>(interop, eqndev, preship)"]
        SEARCH["OSDU Search<br/>(kind-based queries)"]
    end

    DLIS -->|"dlis_to_witsml.py"| WITSML_STORE
    LAS -->|"las_to_witsml"| WITSML_STORE
    EPC -->|"docker cp + import"| RESQML_STORE
    RT -->|"ETP Protocol 21"| WITSML_STORE

    WITSML_STORE --> ARRAYS
    RESQML_STORE --> ARRAYS

    WITSML_STORE ==>|"converters"| MANIFEST
    MANIFEST ==>|"POST /api/manifest/ingest"| CATALOG
    CATALOG --> SEARCH

    RESQML_STORE -.->|"no converter (raw ETP only)"| CATALOG
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
| Earth model with well paths and properties | RESQML (geometry + property graph) |
| Reservoir simulation with wellbore completions | RESQML + PRODML (connected model) |
| Multi-well comparison / QC | WITSML (flat, queryable, has units) |
| Publishing to OSDU catalog | WITSML (has converters) → OSDU records |
| Subsurface interpretation workflow | RESQML (feature/interp/rep pattern) |
| Both operational + model context needed | Store both; link via DOR cross-references |

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

## References

- [Energistics WITSML Standards](https://energistics.org/witsml-data-standards)
- [Energistics RESQML Standards](https://energistics.org/resqml-data-standards)
- [ETP 1.2 Specification](https://energistics.org/energistics-transfer-protocol)
- [OSDU Well Schema `master-data--Well:1.3.0`](https://community.opengroup.org/osdu/data/data-definitions/-/tree/master/definitions/master-data/Well)
- XSD schemas: `energyml/data/witsmlv2` (WITSML 2.1), `energyml/data/resqmlv2` (RESQML 2.2)
