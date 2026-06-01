/**
 * RESQML/PRODML/EML type detection utilities.
 *
 * Detects standard, version, object type, and UUID from raw XML.
 * Handles both namespace styles:
 *   - Default: <IjkGridRepresentation xmlns="...resqmlv2" ...>
 *   - Prefixed: <resqml2:IjkGridRepresentation xmlns:resqml2="...resqmlv2" ...>
 */

import { XMLParser } from "fast-xml-parser";

export interface DataObjectType {
  standard: "resqml" | "prodml" | "witsml" | "eml" | "unknown";
  version: string;
  objectType: string;
  qualifiedType: string;
  uuid: string;
  title: string;
  namespaceUri: string;
}

const NS_PATTERNS: Array<{ pattern: string; standard: DataObjectType["standard"] }> = [
  { pattern: "resqml", standard: "resqml" },
  { pattern: "prodml", standard: "prodml" },
  { pattern: "witsml", standard: "witsml" },
  { pattern: "commonv2", standard: "eml" },
];

const VERSION_SUFFIXES: Record<string, string> = {
  "2.0.1": "201",
  "2.0": "20",
  "2.1": "21",
  "2.2": "22",
  "2.3": "23",
};

export function detectDataObjectType(xml: string): DataObjectType | null {
  // 1. Extract namespace from raw XML (removeNSPrefix strips xmlns attributes)
  let xmlns = "";
  const nsRegex = /xmlns(?::\w+)?="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = nsRegex.exec(xml)) !== null) {
    const val = m[1];
    if (val.includes("resqml") || val.includes("prodml") || val.includes("witsml")) {
      xmlns = val;
      break;
    }
    if (val.includes("energistics") && !xmlns) xmlns = val;
  }

  let standard: DataObjectType["standard"] = "unknown";
  for (const { pattern, standard: s } of NS_PATTERNS) {
    if (xmlns.includes(pattern)) {
      standard = s;
      break;
    }
  }

  // 2. Parse XML with namespace prefix removal
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    removeNSPrefix: true,
  });

  let parsed: any;
  try {
    parsed = parser.parse(xml);
  } catch {
    return null;
  }

  const rootKeys = Object.keys(parsed).filter((k) => !k.startsWith("?"));
  if (rootKeys.length === 0) return null;

  const rootKey = rootKeys[0];
  const root = parsed[rootKey];
  if (!root || typeof root !== "object") return null;

  // 3. Version from schemaVersion attribute
  // Check for 2.0.1 first (obj_ prefix or explicit schemaVersion)
  const schemaVersion = root["@_schemaVersion"] || "";
  let version = "2.2";
  if (schemaVersion.includes("2.0.1") || rootKey.startsWith("obj_")) version = "2.0.1";
  else if (schemaVersion.includes("2.0")) version = "2.0";
  else if (schemaVersion.includes("2.1")) version = "2.1";
  else if (schemaVersion.includes("2.2")) version = "2.2";
  else if (schemaVersion.includes("2.3")) version = "2.3";

  // 4. UUID
  const uuid = root["@_uuid"] || root["@_uid"] || "";

  // 5. Title from Citation (namespace prefixes stripped by removeNSPrefix)
  let title: string = rootKey;
  if (root.Citation && typeof root.Citation === "object") {
    const rawTitle = root.Citation.Title;
    if (typeof rawTitle === "string") {
      title = rawTitle;
    } else if (rawTitle && typeof rawTitle === "object") {
      title = rawTitle["#text"] || rootKey;
    }
  } else {
    const titleMatch = xml.match(/<(?:\w+:)?Title[^>]*>([^<]+)<\/(?:\w+:)?Title>/);
    if (titleMatch) title = titleMatch[1];
  }

  // 6. Object type (removeNSPrefix already stripped prefix)
  let objectType = rootKey;
  if (objectType.startsWith("obj_")) objectType = objectType.slice(4);

  // 7. Build qualified type
  const suffix = VERSION_SUFFIXES[version] || "22";
  const qualifiedType = `${standard}${suffix}.${objectType}`;

  return { standard, version, objectType, qualifiedType, uuid, title, namespaceUri: xmlns };
}
