/**
 * OSDU Manifest Builder — M27 schema alignment.
 *
 * Builds manifests conforming to osdu:wks:Manifest:1.0.0 with:
 * - DDMSDatasets[] URIs (eml:///dataspace('...')/resqml22.Type('uuid'))
 * - Single ETPDataspace dataset per dataspace
 * - MasterData / ReferenceData / Data sections
 * - Proper RESQML→OSDU type mapping (M27 kinds)
 * - RESQML 2.0.1→2.2 type normalization
 */

export interface ManifestOptions {
  acl: { owners: string[]; viewers: string[] };
  legal: { legaltags: string[]; otherRelevantDataCountries: string[]; status?: string };
  /** Data partition ID — used in record IDs. Defaults to "opendes". */
  partition?: string;
}

export interface ManifestRecord {
  id: string;
  kind: string;
  acl: { owners: string[]; viewers: string[] };
  legal: { legaltags: string[]; otherRelevantDataCountries: string[]; status?: string };
  data: Record<string, any>;
}

export interface Manifest {
  kind: "osdu:wks:Manifest:1.0.0";
  ReferenceData: ManifestRecord[];
  MasterData: ManifestRecord[];
  Data: {
    Datasets: ManifestRecord[];
    WorkProductComponents: ManifestRecord[];
  };
}

// ─── M27 RESQML → OSDU Type Mapping ─────────────────────────────────────────

interface OsduTypeMapping {
  kind: string; // e.g. "IjkGridRepresentation:1.1.0"
  category: "wpc" | "master_data" | "reference_data";
  prefix: string; // "work-product-component" | "master-data" | "reference-data"
}

const RESQML_TO_OSDU: Record<string, OsduTypeMapping> = {
  // ─── Features ────────────────────────────────────────────────────────────
  BoundaryFeature: { kind: "LocalBoundaryFeature:1.1.0", category: "master_data", prefix: "master-data" },
  GeneticBoundaryFeature: { kind: "LocalBoundaryFeature:1.1.0", category: "master_data", prefix: "master-data" },
  TectonicBoundaryFeature: { kind: "LocalBoundaryFeature:1.1.0", category: "master_data", prefix: "master-data" },
  WellboreFeature: { kind: "Wellbore:1.3.0", category: "master_data", prefix: "master-data" },
  RockVolumeFeature: { kind: "LocalRockVolumeFeature:1.2.0", category: "wpc", prefix: "work-product-component" },
  Model: { kind: "LocalModelFeature:1.2.0", category: "wpc", prefix: "work-product-component" },
  OrganizationFeature: { kind: "LocalModelFeature:1.2.0", category: "wpc", prefix: "work-product-component" },
  SeismicLatticeFeature: { kind: "SeismicHorizon:2.1.0", category: "wpc", prefix: "work-product-component" },
  SeismicLatticeSetFeature: { kind: "SeismicHorizon:2.1.0", category: "wpc", prefix: "work-product-component" },

  // ─── Interpretations ─────────────────────────────────────────────────────
  HorizonInterpretation: { kind: "HorizonInterpretation:1.2.0", category: "wpc", prefix: "work-product-component" },
  FaultInterpretation: { kind: "FaultInterpretation:1.3.0", category: "wpc", prefix: "work-product-component" },
  GeobodyInterpretation: { kind: "GenericRepresentation:1.2.0", category: "wpc", prefix: "work-product-component" },
  WellboreInterpretation: { kind: "WellboreInterpretation:1.2.0", category: "wpc", prefix: "work-product-component" },
  StratigraphicColumnRankInterpretation: {
    kind: "StratigraphicColumn:1.2.0",
    category: "wpc",
    prefix: "work-product-component",
  },
  StructuralOrganizationInterpretation: {
    kind: "StructuralModel:1.0.0",
    category: "wpc",
    prefix: "work-product-component",
  },
  EarthModelInterpretation: { kind: "StructuralModel:1.0.0", category: "wpc", prefix: "work-product-component" },
  RockFluidOrganizationInterpretation: {
    kind: "GenericRepresentation:1.2.0",
    category: "wpc",
    prefix: "work-product-component",
  },

  // ─── Representations ─────────────────────────────────────────────────────
  IjkGridRepresentation: { kind: "IjkGridRepresentation:1.1.0", category: "wpc", prefix: "work-product-component" },
  UnstructuredGridRepresentation: {
    kind: "IjkGridRepresentation:1.1.0",
    category: "wpc",
    prefix: "work-product-component",
  },
  Grid2dRepresentation: { kind: "StructureMap:1.0.0", category: "wpc", prefix: "work-product-component" },
  Grid2dSetRepresentation: { kind: "SeismicHorizon:2.1.0", category: "wpc", prefix: "work-product-component" },
  TriangulatedSetRepresentation: {
    kind: "GenericRepresentation:1.2.0",
    category: "wpc",
    prefix: "work-product-component",
  },
  PolylineSetRepresentation: { kind: "GenericRepresentation:1.2.0", category: "wpc", prefix: "work-product-component" },
  PointSetRepresentation: { kind: "GenericRepresentation:1.2.0", category: "wpc", prefix: "work-product-component" },
  WellboreTrajectoryRepresentation: {
    kind: "WellboreTrajectory:1.3.0",
    category: "wpc",
    prefix: "work-product-component",
  },
  WellboreFrameRepresentation: { kind: "WellLog:1.2.0", category: "wpc", prefix: "work-product-component" },
  WellboreMarkerFrameRepresentation: {
    kind: "WellboreMarkerSet:1.2.0",
    category: "wpc",
    prefix: "work-product-component",
  },
  BlockedWellboreRepresentation: {
    kind: "GenericRepresentation:1.2.0",
    category: "wpc",
    prefix: "work-product-component",
  },
  SeismicLineSetRepresentation: {
    kind: "GenericRepresentation:1.2.0",
    category: "wpc",
    prefix: "work-product-component",
  },

  // ─── Properties ──────────────────────────────────────────────────────────
  ContinuousProperty: { kind: "GenericProperty:1.2.0", category: "wpc", prefix: "work-product-component" },
  DiscreteProperty: { kind: "GenericProperty:1.2.0", category: "wpc", prefix: "work-product-component" },
  CategoricalProperty: { kind: "GenericProperty:1.2.0", category: "wpc", prefix: "work-product-component" },
  CommentProperty: { kind: "GenericProperty:1.2.0", category: "wpc", prefix: "work-product-component" },
  PointsProperty: { kind: "GenericProperty:1.2.0", category: "wpc", prefix: "work-product-component" },

  // ─── CRS ─────────────────────────────────────────────────────────────────
  LocalDepth3dCrs: { kind: "LocalModelCompoundCrs:1.2.0", category: "wpc", prefix: "work-product-component" },
  LocalTime3dCrs: { kind: "LocalModelCompoundCrs:1.2.0", category: "wpc", prefix: "work-product-component" },
  LocalEngineering2dCrs: { kind: "LocalModelCompoundCrs:1.2.0", category: "wpc", prefix: "work-product-component" },
  LocalEngineeringCompoundCrs: { kind: "LocalModelCompoundCrs:1.2.0", category: "wpc", prefix: "work-product-component" },

  // ─── Activities ──────────────────────────────────────────────────────────
  Activity: { kind: "GenericRepresentation:1.2.0", category: "wpc", prefix: "work-product-component" },
  ActivityTemplate: { kind: "GenericRepresentation:1.2.0", category: "wpc", prefix: "work-product-component" },
};

// ─── RESQML 2.0.1 → 2.2 Normalization ───────────────────────────────────────

const RESQML201_TO_22: Record<string, string> = {
  GeologicUnitFeature: "RockVolumeFeature",
  BoundaryFeatureInterpretation: "HorizonInterpretation",
  obj_IjkGridRepresentation: "IjkGridRepresentation",
  obj_Grid2dRepresentation: "Grid2dRepresentation",
  obj_WellboreFeature: "WellboreFeature",
  obj_ContinuousProperty: "ContinuousProperty",
  obj_DiscreteProperty: "DiscreteProperty",
  obj_GeneticBoundaryFeature: "GeneticBoundaryFeature",
  obj_TectonicBoundaryFeature: "TectonicBoundaryFeature",
};

// Types to skip (metadata-only, not mapped to OSDU records)
const SKIP_TYPES = new Set([
  "MdDatum",
  "PropertyKind",
  "TimeSeries",
  "EpcExternalPartReference",
  "GraphicalInformationSet",
  "LocalPropertyKind",
]);

// ─── WITSML → OSDU Mapping ──────────────────────────────────────────────────

const WITSML_TO_OSDU: Record<string, string> = {
  Log: "work-product-component--WellLog:1.2.0",
  Trajectory: "work-product-component--WellboreTrajectory:1.3.0",
  Well: "master-data--Well:1.2.0",
  Wellbore: "master-data--Wellbore:1.3.0",
  FluidsReport: "work-product-component--FluidReport:1.0.0",
  MudLog: "work-product-component--MudLogReport:1.1.0",
};

// ─── Builder ─────────────────────────────────────────────────────────────────

interface StoredObject {
  uri: string;
  type: string; // qualified type e.g. "resqml22.IjkGridRepresentation"
  xml: string;
  name: string;
}

export class ManifestBuilder {
  /**
   * Build an OSDU manifest from a list of stored objects.
   */
  build(objects: StoredObject[], dataspace: string, opts: ManifestOptions): Manifest {
    const partition = opts.partition || "opendes";
    const wpcs: ManifestRecord[] = [];
    const masterData: ManifestRecord[] = [];
    const referenceData: ManifestRecord[] = [];

    for (const obj of objects) {
      const record = this.makeRecord(obj, dataspace, opts, partition);
      if (!record) continue;

      switch (record._category) {
        case "master_data":
          masterData.push(this.stripCategory(record));
          break;
        case "reference_data":
          referenceData.push(this.stripCategory(record));
          break;
        default:
          wpcs.push(this.stripCategory(record));
          break;
      }
    }

    // Single ETPDataspace dataset record
    const dataset = this.makeEtpDataspaceDataset(dataspace, opts, partition);

    return {
      kind: "osdu:wks:Manifest:1.0.0",
      ReferenceData: referenceData,
      MasterData: masterData,
      Data: {
        Datasets: [dataset],
        WorkProductComponents: wpcs,
      },
    };
  }

  private makeRecord(
    obj: StoredObject,
    dataspace: string,
    opts: ManifestOptions,
    partition: string,
  ): (ManifestRecord & { _category: string }) | null {
    const { standard, objectType } = this.parseQualifiedType(obj.type);

    if (standard === "resqml") {
      return this.makeResqmlRecord(objectType, obj, dataspace, opts, partition);
    } else if (standard === "prodml") {
      return this.makeProdmlRecord(objectType, obj, dataspace, opts, partition);
    } else if (standard === "witsml") {
      return this.makeWitsmlRecord(objectType, obj, dataspace, opts, partition);
    }
    return null;
  }

  private makeResqmlRecord(
    objectType: string,
    obj: StoredObject,
    dataspace: string,
    opts: ManifestOptions,
    partition: string,
  ): (ManifestRecord & { _category: string }) | null {
    // Normalize v2.0.1 types
    const normalized = RESQML201_TO_22[objectType] ?? objectType;

    // Skip metadata-only types
    if (SKIP_TYPES.has(normalized)) return null;

    // Look up OSDU mapping
    const mapping = RESQML_TO_OSDU[normalized];
    if (!mapping) {
      // Unknown type — use GenericRepresentation as fallback
      return this.makeGenericRecord(normalized, obj, dataspace, opts, "resqml22", partition);
    }

    const kind = `osdu:wks:${mapping.prefix}--${mapping.kind}`;
    const uuid = obj.uri.match(/\('([^']+)'\)$/)?.[1] ?? obj.name;
    const id = `${partition}:${mapping.prefix}--${mapping.kind}:${uuid}`;
    const ddmsUri = this.ddmsUri(dataspace, "resqml22", objectType, obj.uri);

    return {
      id,
      kind,
      acl: opts.acl,
      legal: { ...opts.legal, status: "compliant" },
      data: {
        Name: obj.name,
        DDMSDatasets: [ddmsUri],
      },
      _category: mapping.category,
    };
  }

  private makeProdmlRecord(
    objectType: string,
    obj: StoredObject,
    dataspace: string,
    opts: ManifestOptions,
    partition: string,
  ): (ManifestRecord & { _category: string }) | null {
    const uuid = obj.uri.match(/\('([^']+)'\)$/)?.[1] ?? obj.name;
    const kind = `osdu:wks:work-product-component--${objectType}:1.0.0`;
    const id = `${partition}:work-product-component--${objectType}:1.0.0:${uuid}`;
    const ddmsUri = this.ddmsUri(dataspace, "prodml22", objectType, obj.uri);

    return {
      id,
      kind,
      acl: opts.acl,
      legal: { ...opts.legal, status: "compliant" },
      data: {
        Name: obj.name,
        DDMSDatasets: [ddmsUri],
      },
      _category: "wpc",
    };
  }

  private makeWitsmlRecord(
    objectType: string,
    obj: StoredObject,
    dataspace: string,
    opts: ManifestOptions,
    partition: string,
  ): (ManifestRecord & { _category: string }) | null {
    const osduKind = WITSML_TO_OSDU[objectType];
    if (!osduKind) return null;

    const uuid = obj.uri.match(/\('([^']+)'\)$/)?.[1] ?? obj.name;
    const kind = `osdu:wks:${osduKind}`;
    const id = `${partition}:${osduKind}:${uuid}`;
    const category = osduKind.startsWith("master-data") ? "master_data" : "wpc";

    return {
      id,
      kind,
      acl: opts.acl,
      legal: { ...opts.legal, status: "compliant" },
      data: {
        Name: obj.name,
        DDMSDatasets: [`eml:///dataspace('${dataspace}')/witsml21.${objectType}('${uuid}')`],
      },
      _category: category,
    };
  }

  private makeGenericRecord(
    objectType: string,
    obj: StoredObject,
    dataspace: string,
    opts: ManifestOptions,
    prefix: string,
    partition: string,
  ): ManifestRecord & { _category: string } {
    const uuid = obj.uri.match(/\('([^']+)'\)$/)?.[1] ?? obj.name;
    const kind = "osdu:wks:work-product-component--GenericRepresentation:1.2.0";
    const id = `${partition}:work-product-component--GenericRepresentation:1.2.0:${uuid}`;
    const ddmsUri = `eml:///dataspace('${dataspace}')/${prefix}.${objectType}('${uuid}')`;

    return {
      id,
      kind,
      acl: opts.acl,
      legal: { ...opts.legal, status: "compliant" },
      data: {
        Name: obj.name,
        DDMSDatasets: [ddmsUri],
      },
      _category: "wpc",
    };
  }

  private makeEtpDataspaceDataset(dataspace: string, opts: ManifestOptions, partition: string): ManifestRecord {
    const safeName = dataspace.replace(/\//g, "-");
    return {
      id: `${partition}:dataset--ETPDataspace:${safeName}`,
      kind: "osdu:wks:dataset--ETPDataspace:1.0.1",
      acl: opts.acl,
      legal: { ...opts.legal, status: "compliant" },
      data: {
        Name: dataspace,
        Description: "RDDMS dataspace",
        DatasetProperties: {
          URI: `eml:///dataspace('${dataspace}')`,
        },
      },
    };
  }

  private ddmsUri(dataspace: string, standard: string, objectType: string, uri: string): string {
    const uuid = uri.match(/\('([^']+)'\)$/)?.[1] ?? "";
    return `eml:///dataspace('${dataspace}')/${standard}.${objectType}('${uuid}')`;
  }

  private parseQualifiedType(qualifiedType: string): { standard: string; objectType: string } {
    // "resqml22.IjkGridRepresentation" → { standard: "resqml", objectType: "IjkGridRepresentation" }
    const match = qualifiedType.match(/^(resqml|witsml|prodml|eml)\d*\.(.+)$/);
    if (match) {
      return { standard: match[1], objectType: match[2] };
    }
    return { standard: "unknown", objectType: qualifiedType };
  }

  private stripCategory(record: ManifestRecord & { _category: string }): ManifestRecord {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _category, ...rest } = record;
    return rest;
  }
}
