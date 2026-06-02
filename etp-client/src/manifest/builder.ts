/**
 * OSDU Manifest Builder — M27 schema alignment.
 *
 * Builds manifests conforming to osdu:wks:Manifest:1.0.0 with:
 * - DDMSDatasets[] URIs (eml:///dataspace('...')/resqml22.Type('uuid'))
 * - Single ETPDataspace dataset per dataspace
 * - MasterData / ReferenceData / Data sections
 * - Proper RESQML→OSDU type mapping (M27 kinds)
 * - RESQML 2.0.1→2.2 type normalization
 * - WITSML XML enrichment (curves, depths, well references)
 */

import { XMLParser } from "fast-xml-parser";

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

// ─── WITSML → OSDU Mapping (M27 schema versions) ────────────────────────────

const WITSML_TO_OSDU: Record<string, string> = {
  // Master Data
  Well: "master-data--Well:1.2.0",
  Wellbore: "master-data--Wellbore:1.3.0",

  // Well Logs & Channels
  Log: "work-product-component--WellLog:1.2.0",
  ChannelSet: "work-product-component--WellLog:1.2.0",
  Channel: "work-product-component--WellLog:1.2.0",

  // Trajectories & Surveys
  Trajectory: "work-product-component--WellboreTrajectory:1.3.0",
  DeviationSurvey: "work-product-component--WellboreTrajectory:1.3.0",

  // Markers
  WellboreMarkerSet: "work-product-component--WellboreMarkerSet:1.2.0",
  WellboreMarker: "work-product-component--WellboreMarkerSet:1.2.0",
  FormationMarker: "work-product-component--WellboreMarkerSet:1.2.0",

  // Completions
  WellCompletion: "work-product-component--WellCompletionReport:1.0.0",
  WellboreCompletion: "work-product-component--WellCompletionReport:1.0.0",
  CompletionDesign: "work-product-component--WellCompletionReport:1.0.0",
  PerforationSet: "work-product-component--WellCompletionReport:1.0.0",

  // Fluids & Mud
  FluidsReport: "work-product-component--FluidReport:1.0.0",
  MudLog: "work-product-component--MudLogReport:1.1.0",
  MudLogReport: "work-product-component--MudLogReport:1.1.0",

  // Drilling operations
  BhaRun: "work-product-component--DrillingSummaryReport:1.0.0",
  CementJob: "work-product-component--DrillingSummaryReport:1.0.0",
  DrillReport: "work-product-component--DrillingSummaryReport:1.0.0",
  OpsReport: "work-product-component--DrillingSummaryReport:1.0.0",
  Rig: "work-product-component--DrillingSummaryReport:1.0.0",
  Tubular: "work-product-component--DrillingSummaryReport:1.0.0",
  WbGeometry: "work-product-component--DrillingSummaryReport:1.0.0",

  // Stimulation
  StimJob: "work-product-component--StimulationReport:1.0.0",
  StimJobStage: "work-product-component--StimulationReport:1.0.0",

  // Risk
  Risk: "work-product-component--DrillingSummaryReport:1.0.0",

  // Survey Programs
  SurveyProgram: "work-product-component--WellboreTrajectory:1.3.0",
  Target: "work-product-component--WellboreTrajectory:1.3.0",
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

    // Extract UUID from URI — handles both formats: Type(uuid) and Type('uuid')
    const uuid = obj.uri.match(/\(([^)']+)\)$/)?.[1]
      ?? obj.uri.match(/\('([^']+)'\)$/)?.[1]
      ?? obj.name;
    const kind = `osdu:wks:${osduKind}`;
    const id = `${partition}:${osduKind}:${uuid}`;
    const category = osduKind.startsWith("master-data") ? "master_data" : "wpc";

    // Base data with DDMS link
    const data: Record<string, any> = {
      Name: obj.name,
      DDMSDatasets: [obj.uri || `eml:///dataspace('${dataspace}')/witsml21.${objectType}(${uuid})`],
    };

    // Enrich with type-specific fields from XML
    if (obj.xml) {
      this.enrichWitsmlData(objectType, obj.xml, data, dataspace, partition);
    }

    return {
      id,
      kind,
      acl: opts.acl,
      legal: { ...opts.legal, status: "compliant" },
      data,
      _category: category,
    };
  }

  /**
   * Parse WITSML XML and enrich the manifest data record with type-specific fields.
   * Handles both native 2.1 XML and 1.x converted envelopes (with CustomData/OriginalWitsml).
   */
  private enrichWitsmlData(
    objectType: string,
    xml: string,
    data: Record<string, any>,
    dataspace: string,
    partition: string,
  ): void {
    try {
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_",
        removeNSPrefix: true,
      });
      const parsed = parser.parse(xml);
      const root = parsed[objectType] || parsed[Object.keys(parsed).find((k) => !k.startsWith("?")) || ""] || {};

      // Check if this is a 1.x envelope with CustomData/OriginalWitsml
      const customData = root.CustomData;
      if (customData?.OriginalWitsml) {
        const originalXml = String(customData.OriginalWitsml)
          .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        this.enrichFrom1xXml(objectType, originalXml, data, parser, dataspace, partition);
        return;
      }

      // Native 2.1 XML enrichment
      switch (objectType) {
        case "Well":
          this.enrichWell(root, data);
          break;
        case "Wellbore":
          this.enrichWellbore(root, data, dataspace, partition);
          break;
        case "Log":
          this.enrichLog(root, data, dataspace, partition);
          break;
        case "ChannelSet":
          this.enrichChannelSet(root, data, dataspace, partition);
          break;
        case "Trajectory":
          this.enrichTrajectory(root, data, dataspace, partition);
          break;
      }
    } catch {
      // If XML parsing fails, keep the base data as-is
    }
  }

  private enrichFrom1xXml(
    objectType: string,
    originalXml: string,
    data: Record<string, any>,
    parser: XMLParser,
    dataspace: string,
    partition: string,
  ): void {
    try {
      const parsed = parser.parse(originalXml);
      // 1.x XML: plural root (logs, wells, etc.) → singular child
      const rootKeys = Object.keys(parsed).filter((k) => !k.startsWith("?"));
      if (rootKeys.length === 0) return;
      const container = parsed[rootKeys[0]];
      const singularKey = objectType.charAt(0).toLowerCase() + objectType.slice(1);
      const item = container?.[singularKey];
      if (!item) return;
      const obj = Array.isArray(item) ? item[0] : item;

      switch (objectType) {
        case "Well":
          if (obj.country || obj.Country) data.CountryID = obj.country || obj.Country;
          if (obj.field || obj.Field) data.FieldName = obj.field || obj.Field;
          if (obj.statusWell) data.WellStatus = obj.statusWell;
          if (obj.purposeWell) data.WellType = obj.purposeWell;
          if (obj.numGovt) data.NameAliases = [{ AliasName: obj.numGovt, AliasNameTypeID: "GovernmentNumber" }];
          data.FacilityName = data.Name;
          break;
        case "Wellbore":
          if (obj.nameWell) {
            data.WellID = `${partition}:master-data--Well:1.2.0:${this.nameHash(dataspace, "Well", obj.nameWell)}`;
          }
          data.FacilityName = data.Name;
          break;
        case "Log": {
          if (obj.nameWellbore) {
            data.WellboreID = `${partition}:master-data--Wellbore:1.3.0:${this.nameHash(dataspace, "Wellbore", obj.nameWellbore)}`;
          }
          const curves = Array.isArray(obj.logCurveInfo) ? obj.logCurveInfo : [];
          if (curves.length > 0) {
            data.Curves = curves.map((c: any) => ({
              Mnemonic: typeof c.mnemonic === "object" ? c.mnemonic?.["#text"] || "" : String(c.mnemonic || ""),
              CurveUnit: typeof c.unit === "object" ? c.unit?.["#text"] || "" : String(c.unit || ""),
              CurveDescription: c.curveDescription ? String(c.curveDescription) : undefined,
            }));
          }
          if (obj.indexType) data.LogServiceType = obj.indexType;
          // Extract depth range from logData
          const logData = obj.logData;
          if (logData) {
            const rows = Array.isArray(logData.data) ? logData.data : (logData.data ? [logData.data] : []);
            if (rows.length > 0) {
              const firstVal = parseFloat(String(rows[0]).split(",")[0]);
              const lastVal = parseFloat(String(rows[rows.length - 1]).split(",")[0]);
              if (!isNaN(firstVal)) data.TopMeasuredDepth = { Depth: firstVal, UnitOfMeasure: "m" };
              if (!isNaN(lastVal)) data.BottomMeasuredDepth = { Depth: lastVal, UnitOfMeasure: "m" };
            }
          }
          break;
        }
        case "Trajectory": {
          if (obj.nameWellbore) {
            data.WellboreID = `${partition}:master-data--Wellbore:1.3.0:${this.nameHash(dataspace, "Wellbore", obj.nameWellbore)}`;
          }
          const stations = Array.isArray(obj.trajectoryStation) ? obj.trajectoryStation : [];
          if (stations.length > 0) {
            const first = stations[0];
            const last = stations[stations.length - 1];
            const topMd = parseFloat(first?.md?.["#text"] || first?.md || "");
            const botMd = parseFloat(last?.md?.["#text"] || last?.md || "");
            if (!isNaN(topMd)) data.TopMeasuredDepth = { Depth: topMd, UnitOfMeasure: "m" };
            if (!isNaN(botMd)) data.BottomMeasuredDepth = { Depth: botMd, UnitOfMeasure: "m" };
          }
          break;
        }
      }
    } catch {
      // parsing failure — keep base data
    }
  }

  private enrichWell(root: any, data: Record<string, any>): void {
    data.FacilityName = data.Name;
    if (root.Country) data.CountryID = root.Country;
    if (root.Field) data.FieldName = root.Field;
    if (root.StatusWell) data.WellStatus = root.StatusWell;
    if (root.PurposeWell) data.WellType = root.PurposeWell;
    if (root.NumGovt) {
      data.NameAliases = [{ AliasName: root.NumGovt, AliasNameTypeID: "GovernmentNumber" }];
    }
    const geo = root.GeographicLocationWGS84;
    if (geo) {
      const lat = parseFloat(geo.Latitude?.["#text"] || geo.Latitude || "");
      const lon = parseFloat(geo.Longitude?.["#text"] || geo.Longitude || "");
      if (!isNaN(lat) && !isNaN(lon)) {
        data.GeographicCoordinates = { type: "Point", coordinates: [lon, lat] };
      }
    }
  }

  private enrichWellbore(root: any, data: Record<string, any>, dataspace: string, partition: string): void {
    data.FacilityName = data.Name;
    // Reference parent well by looking at Wellbore element (2.1 has a Well reference)
    const wellRef = root.Well || root.Wellbore?.Well;
    if (wellRef) {
      const wellUuid = wellRef?.["@_uuid"] || wellRef?.["@_uid"] || "";
      if (wellUuid) {
        data.WellID = `${partition}:master-data--Well:1.2.0:${wellUuid}`;
      }
    }
  }

  private enrichLog(root: any, data: Record<string, any>, dataspace: string, partition: string): void {
    // Wellbore reference
    const wbRef = root.Wellbore;
    if (wbRef) {
      const wbUuid = wbRef?.["@_uuid"] || wbRef?.["@_uid"] || "";
      if (wbUuid) {
        data.WellboreID = `${partition}:master-data--Wellbore:1.3.0:${wbUuid}`;
      }
    }
    // Curves from ChannelSet
    const channelSets = Array.isArray(root.ChannelSet) ? root.ChannelSet : (root.ChannelSet ? [root.ChannelSet] : []);
    const curves: any[] = [];
    for (const cs of channelSets) {
      const channels = Array.isArray(cs.Channel) ? cs.Channel : (cs.Channel ? [cs.Channel] : []);
      for (const ch of channels) {
        const citation = ch.Citation || {};
        curves.push({
          Mnemonic: ch.Mnemonic || citation.Title || "",
          CurveUnit: ch.Uom || ch.UnitOfMeasure || "",
          CurveDescription: citation.Description || ch.Description || undefined,
        });
      }
    }
    if (curves.length > 0) data.Curves = curves;
  }

  private enrichChannelSet(root: any, data: Record<string, any>, dataspace: string, partition: string): void {
    // Same logic as Log enrichment for channels
    const channels = Array.isArray(root.Channel) ? root.Channel : (root.Channel ? [root.Channel] : []);
    const curves: any[] = [];
    for (const ch of channels) {
      const citation = ch.Citation || {};
      curves.push({
        Mnemonic: ch.Mnemonic || citation.Title || "",
        CurveUnit: ch.Uom || ch.UnitOfMeasure || "",
        CurveDescription: citation.Description || ch.Description || undefined,
      });
    }
    if (curves.length > 0) data.Curves = curves;
  }

  private enrichTrajectory(root: any, data: Record<string, any>, dataspace: string, partition: string): void {
    const wbRef = root.Wellbore;
    if (wbRef) {
      const wbUuid = wbRef?.["@_uuid"] || wbRef?.["@_uid"] || "";
      if (wbUuid) {
        data.WellboreID = `${partition}:master-data--Wellbore:1.3.0:${wbUuid}`;
      }
    }
  }

  /** Generate a deterministic UUID from dataspace + type + name (matches witsml.ts nameToUuid) */
  private nameHash(dataspace: string, type: string, name: string): string {
    // This must match the hashing in witsml.ts for cross-referencing
    const { createHash } = require("crypto");
    const hash = createHash("sha256").update(`${dataspace}/${type}/${name}`).digest("hex");
    const v = "5";
    const variant = ((parseInt(hash[16], 16) & 0x3) | 0x8).toString(16);
    return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${v}${hash.slice(13, 16)}-${variant}${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
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
