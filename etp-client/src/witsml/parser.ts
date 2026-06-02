/**
 * WITSML XML Parser — supports 1.3.1, 1.4.1, 2.0, and 2.1.
 *
 * 1.3.1 / 1.4.1: Plural containers (<logs>, <wells>, <trajectorys>, etc.)
 * 2.0 / 2.1:     Single-object root (<Well>, <Wellbore>, <Log>, <ChannelSet>, etc.)
 *
 * Handles all common Energistics WITSML object types.
 */

import { XMLParser, XMLBuilder } from "fast-xml-parser";
import { randomUUID } from "crypto";

export interface WitsmlObject {
  uid: string;
  type: string; // "Log", "Trajectory", "Well", "Wellbore", "ChannelSet", etc.
  name: string;
  wellName?: string;
  wellboreName?: string;
  xml: string; // Normalized XML for storage
  version: string; // "1.3.1", "1.4.1", "2.0", or "2.1"
  curves?: WitsmlCurve[];
  channels?: WitsmlChannel[];
}

export interface WitsmlCurve {
  mnemonic: string;
  unit: string;
  description?: string;
}

export interface WitsmlChannel {
  mnemonic: string;
  uom: string;
  dataType?: string;
  description?: string;
}

// Map of WITSML 1.3.1 / 1.4.1 plural→singular type names (all standard objects)
const PLURAL_TO_SINGULAR: Record<string, string> = {
  // Core well objects
  wells: "Well",
  wellbores: "Wellbore",
  // Drilling
  logs: "Log",
  trajectorys: "Trajectory",
  mudLogs: "MudLog",
  messages: "Message",
  // Operations
  bhaRuns: "BhaRun",
  cementJobs: "CementJob",
  convCores: "ConvCore",
  dtsInstalledSystems: "DtsInstalledSystem",
  dtsMeasurements: "DtsMeasurement",
  fluidsReports: "FluidsReport",
  formationMarkers: "FormationMarker",
  opsReports: "OpsReport",
  rigs: "Rig",
  risks: "Risk",
  sidewallCores: "SidewallCore",
  stimJobs: "StimJob",
  surveyPrograms: "SurveyProgram",
  targets: "Target",
  tubulars: "Tubular",
  wbGeometrys: "WbGeometry",
  // Completions (1.4.1)
  attachments: "Attachment",
  changeLogs: "ChangeLog",
  drillReports: "DrillReport",
  objectGroups: "ObjectGroup",
  // 1.3.1 specific
  realTimes: "RealTime",
  wellLogs: "WellLog",
};

// WITSML 2.0/2.1 recognized root element names
const WITSML2X_TYPES = new Set([
  // Core
  "Well", "Wellbore",
  // Logs & Channels
  "Log", "ChannelSet", "Channel",
  // Drilling
  "Trajectory", "MudLogReport", "DrillReport",
  "BhaRun", "CementJob", "Rig", "Tubular",
  "WbGeometry", "FluidsReport",
  // Completions
  "WellCompletion", "WellboreCompletion",
  "CompletionDesign", "PerforationSet",
  // Interventions
  "StimJob", "StimJobStage",
  // Markers / Formations
  "WellboreMarker", "WellboreMarkerSet",
  // Surveys
  "DeviationSurvey", "SurveyProgram",
  "ToolErrorModel", "ToolErrorTermSet",
  // Geologic
  "WellboreGeology", "CuttingsGeology",
  "InterpretedGeology", "ShowEvaluation",
  // Risk / Operations
  "Risk", "OpsReport",
  // Data objects
  "DepthRegImage", "DownholeComponent",
  // Generic / catch-all
  "DataObject",
]);

export class WitsmlParser {
  private xmlParser: XMLParser;
  private xmlBuilder: XMLBuilder;

  constructor() {
    this.xmlParser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      isArray: (tagName) => {
        // These elements are always arrays in WITSML
        return [
          "logCurveInfo", "data", "trajectoryStation",
          "Channel", "ChannelIndex", "LogCurveInfo",
          "logData", "mnemonicList",
        ].includes(tagName);
      },
    });
    this.xmlBuilder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      format: true,
    });
  }

  /**
   * Parse WITSML XML (1.3.1, 1.4.1, 2.0, or 2.1) into structured objects.
   */
  parse(xml: string): WitsmlObject[] {
    const parsed = this.xmlParser.parse(xml);
    const objects: WitsmlObject[] = [];

    // Detect version from root element
    const rootKeys = Object.keys(parsed).filter((k) => !k.startsWith("?"));
    if (rootKeys.length === 0) return objects;

    const rootKey = rootKeys[0];
    const root = parsed[rootKey];

    // Check if it's WITSML 1.x (plural container like <logs>, <trajectorys>)
    const singularType = PLURAL_TO_SINGULAR[rootKey];
    if (singularType) {
      return this.parse1x(root, rootKey, singularType);
    }

    // WITSML 2.x — single object root or known type
    if (WITSML2X_TYPES.has(rootKey)) {
      return this.parse2x(root, rootKey);
    }

    // Fallback: treat unknown root as 2.x single object
    return this.parse2x(root, rootKey);
  }

  private parse1x(root: any, pluralKey: string, singularType: string): WitsmlObject[] {
    const objects: WitsmlObject[] = [];

    // version attribute on the plural container
    const rawVersion = root["@_version"] || "1.4.1";
    const version = this.normalizeVersion(rawVersion);

    // Singular key (e.g., "log" inside "logs")
    const singularKey = singularType.charAt(0).toLowerCase() + singularType.slice(1);
    let items = root[singularKey];
    if (!items) return objects;
    if (!Array.isArray(items)) items = [items];

    for (const item of items) {
      const uid = item["@_uid"] || item["@_uidWell"] || randomUUID();
      const name = item.name || item.nameWell || singularType;

      const obj: WitsmlObject = {
        uid,
        type: singularType,
        name: typeof name === "string" ? name : String(name),
        version,
        xml: this.xmlBuilder.build({ [singularKey]: item }),
      };

      // Extract well/wellbore context
      if (item.nameWell) obj.wellName = String(item.nameWell);
      if (item.nameWellbore) obj.wellboreName = String(item.nameWellbore);

      // Extract curves for logs
      if (singularType === "Log" && item.logCurveInfo) {
        obj.curves = this.extractCurves(item.logCurveInfo);
      }

      objects.push(obj);
    }

    return objects;
  }

  private parse2x(root: any, rootKey: string): WitsmlObject[] {
    // WITSML 2.x — root element IS the object
    const schemaVersion = root["@_schemaVersion"] || "2.1";
    const uuid = root["@_uuid"] || root["@_uid"] || randomUUID();
    const citation = root.Citation || root["eml:Citation"] || {};
    const title = citation.Title || citation["eml:Title"] || rootKey;
    const name = typeof title === "string" ? title : String(title);

    const version = this.detect2xVersion(schemaVersion);

    const obj: WitsmlObject = {
      uid: uuid,
      type: rootKey,
      name,
      version,
      xml: this.xmlBuilder.build({ [rootKey]: root }),
    };

    // Extract channels for ChannelSet (WITSML 2.x)
    if (rootKey === "ChannelSet" && root.Channel) {
      obj.channels = this.extractChannels(root.Channel);
    }

    // Extract channels for Log containing ChannelSet (WITSML 2.x)
    if (rootKey === "Log" && root.ChannelSet) {
      const channelSets = Array.isArray(root.ChannelSet) ? root.ChannelSet : [root.ChannelSet];
      const channels: WitsmlChannel[] = [];
      for (const cs of channelSets) {
        if (cs.Channel) {
          channels.push(...this.extractChannels(Array.isArray(cs.Channel) ? cs.Channel : [cs.Channel]));
        }
      }
      if (channels.length > 0) obj.channels = channels;
    }

    return [obj];
  }

  private normalizeVersion(raw: string): string {
    // "1.4.1.1" → "1.4.1", "1.3.1.0" → "1.3.1", "2.0" → "2.0"
    const parts = raw.split(".");
    if (parts.length >= 3 && parts[0] === "1") {
      return `${parts[0]}.${parts[1]}.${parts[2]}`;
    }
    return raw;
  }

  private detect2xVersion(schemaVersion: string): string {
    if (schemaVersion.includes("2.0")) return "2.0";
    if (schemaVersion.includes("2.1")) return "2.1";
    // Default to 2.1 for unknown 2.x versions
    return "2.1";
  }

  private extractCurves(curveInfos: any[]): WitsmlCurve[] {
    return curveInfos.map((ci) => ({
      mnemonic: typeof ci.mnemonic === "object" ? ci.mnemonic["#text"] || "" : String(ci.mnemonic || ""),
      unit: typeof ci.unit === "object" ? ci.unit["#text"] || "" : String(ci.unit || ""),
      description: ci.curveDescription ? String(ci.curveDescription) : undefined,
    }));
  }

  private extractChannels(channels: any[]): WitsmlChannel[] {
    if (!Array.isArray(channels)) channels = [channels];
    return channels.map((ch) => {
      const citation = ch.Citation || ch["eml:Citation"] || {};
      return {
        mnemonic: ch.Mnemonic || citation.Title || "",
        uom: ch.Uom || ch.UnitOfMeasure || "",
        dataType: ch.DataType || undefined,
        description: citation.Description || ch.Description || undefined,
      };
    });
  }
}
