/**
 * WITSML 1.4.1 XML Parser.
 *
 * Parses WITSML 1.4.1 XML documents (logs, trajectories, wellbores, etc.)
 * and extracts structured objects suitable for storage via ETP.
 *
 * Also handles WITSML 2.0/2.1 passthrough.
 */

import { XMLParser, XMLBuilder } from "fast-xml-parser";

export interface WitsmlObject {
  uid: string;
  type: string; // "Log", "Trajectory", "Well", "Wellbore", etc.
  name: string;
  wellName?: string;
  wellboreName?: string;
  xml: string; // Normalized XML for storage
  version: string; // "1.4.1" or "2.0" or "2.1"
  curves?: WitsmlCurve[];
}

export interface WitsmlCurve {
  mnemonic: string;
  unit: string;
  description?: string;
}

// Map of WITSML 1.4.1 plural→singular type names
const PLURAL_TO_SINGULAR: Record<string, string> = {
  logs: "Log",
  trajectorys: "Trajectory",
  wells: "Well",
  wellbores: "Wellbore",
  mudLogs: "MudLog",
  fluidsReports: "FluidsReport",
  formationMarkers: "FormationMarker",
  rigs: "Rig",
  bhaRuns: "BhaRun",
  cementJobs: "CementJob",
  tubulars: "Tubular",
};

export class WitsmlParser {
  private xmlParser: XMLParser;
  private xmlBuilder: XMLBuilder;

  constructor() {
    this.xmlParser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      isArray: (tagName) => {
        // These elements are always arrays
        return ["logCurveInfo", "data", "trajectoryStation"].includes(tagName);
      },
    });
    this.xmlBuilder = new XMLBuilder({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      format: true,
    });
  }

  /**
   * Parse WITSML XML (1.4.1 or 2.x) into structured objects.
   */
  parse(xml: string): WitsmlObject[] {
    const parsed = this.xmlParser.parse(xml);
    const objects: WitsmlObject[] = [];

    // Detect version from root element
    const rootKeys = Object.keys(parsed).filter((k) => !k.startsWith("?"));
    if (rootKeys.length === 0) return objects;

    const rootKey = rootKeys[0];
    const root = parsed[rootKey];

    // Check if it's WITSML 1.4.1 (plural container like <logs>, <trajectorys>)
    const singularType = PLURAL_TO_SINGULAR[rootKey];
    if (singularType) {
      return this.parse141(root, rootKey, singularType);
    }

    // WITSML 2.x — single object root
    return this.parse2x(root, rootKey);
  }

  private parse141(root: any, pluralKey: string, singularType: string): WitsmlObject[] {
    const objects: WitsmlObject[] = [];

    // version attribute on the plural container — normalize to major.minor.patch
    const rawVersion = root["@_version"] || "1.4.1";
    const version = rawVersion.replace(/^(\d+\.\d+\.\d+).*/, "$1");

    // Singular key (e.g., "log" inside "logs")
    const singularKey = singularType.charAt(0).toLowerCase() + singularType.slice(1);
    let items = root[singularKey];
    if (!items) return objects;
    if (!Array.isArray(items)) items = [items];

    for (const item of items) {
      const uid = item["@_uid"] || item["@_uidWell"] || crypto.randomUUID();
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
    const uuid = root["@_uuid"] || root["@_uid"] || crypto.randomUUID();
    const citation = root.Citation || {};
    const name = citation.Title || rootKey;

    const version = schemaVersion.includes("2.0") ? "2.0" : "2.1";

    return [
      {
        uid: uuid,
        type: rootKey,
        name: typeof name === "string" ? name : String(name),
        version,
        xml: this.xmlBuilder.build({ [rootKey]: root }),
      },
    ];
  }

  private extractCurves(curveInfos: any[]): WitsmlCurve[] {
    return curveInfos.map((ci) => ({
      mnemonic: typeof ci.mnemonic === "object" ? ci.mnemonic["#text"] || "" : String(ci.mnemonic || ""),
      unit: typeof ci.unit === "object" ? ci.unit["#text"] || "" : String(ci.unit || ""),
      description: ci.curveDescription ? String(ci.curveDescription) : undefined,
    }));
  }
}
