/**
 * RESQML/PRODML/EML type detection utilities.
 *
 * Detects standard, version, object type, and UUID from raw XML.
 * Mirrors the C++ energistics.cpp but in TypeScript.
 */

import { XMLParser } from "fast-xml-parser";

export interface DataObjectType {
  standard: "resqml" | "prodml" | "witsml" | "eml" | "unknown";
  version: string;        // "2.0.1", "2.2", "2.3"
  objectType: string;     // "IjkGridRepresentation"
  qualifiedType: string;  // "resqml22.IjkGridRepresentation"
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
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    removeNSPrefix: true,  // Strip namespace prefixes (resqml2:, eml:, etc.)
  });

  let parsed: any;
  try {
    parsed = parser.parse(xml);
  } catch {
    return null;
  }

  // Find root element (skip ?xml processing instruction)
  const rootKeys = Object.keys(parsed).filter((k) => !k.startsWith("?"));
  if (rootKeys.length === 0) return null;

  const rootKey = rootKeys[0];
  const root = parsed[rootKey];
  if (!root || typeof root !== "object") return null;

  // Extract namespace — check all xmlns:* and xmlns attributes
  let xmlns = "";
  for (const key of Object.keys(root)) {
    if (key === "@_xmlns" || key.startsWith("@_xmlns:")) {
      const val = root[key];
      if (typeof val === "string" && (val.includes("energistics") || val.includes("witsml"))) {
        // Prefer the standard-specific namespace over generic ones
        if (val.includes("resqml") || val.includes("prodml") || val.includes("witsml")) {
          xmlns = val;
          break;
        }
        if (!xmlns) xmlns = val;
      }
    }
  }
  // Fallback to plain xmlns
  if (!xmlns) xmlns = root["@_xmlns"] || "";

  let standard: DataObjectType["standard"] = "unknown";
  for (const { pattern, standard: s } of NS_PATTERNS) {
    if (xmlns.includes(pattern)) {
      standard = s;
      break;
    }
  }

  // Extract version from schemaVersion attribute
  const schemaVersion = root["@_schemaVersion"] || "";
  let version = "2.2"; // default
  if (schemaVersion.includes("2.3")) version = "2.3";
  else if (schemaVersion.includes("2.2")) version = "2.2";
  else if (schemaVersion.includes("2.1")) version = "2.1";
  else if (schemaVersion.includes("2.0.1")) version = "2.0.1";
  else if (schemaVersion.includes("2.0")) version = "2.0";

  // Extract UUID
  const uuid = root["@_uuid"] || root["@_uid"] || "";

  // Extract title from Citation (namespace-stripped)
  let title = rootKey;
  if (root.Citation && typeof root.Citation === "object") {
    const citation = root.Citation;
    title = citation.Title || citation["eml:Title"] || rootKey;
    // Title might be an object with @_xsi:type — extract text
    if (typeof title === "object") title = title["#text"] || rootKey;
  } else {
    // Regex fallback for any namespace prefix on Title
    const titleMatch = xml.match(/<(?:\w+:)?Title[^>]*>([^<]+)<\/(?:\w+:)?Title>/);
    if (titleMatch) title = titleMatch[1];
  }

  // Strip namespace prefix from root key if present
  let objectType = rootKey.includes(":") ? rootKey.split(":")[1] : rootKey;
  // Strip obj_ prefix (RESQML 2.0.1 pattern)
  if (objectType.startsWith("obj_")) objectType = objectType.slice(4);

  // Build qualified type
  const suffix = VERSION_SUFFIXES[version] || "22";
  const qualifiedType = `${standard}${suffix}.${objectType}`;

  return {
    standard,
    version,
    objectType,
    qualifiedType,
    uuid,
    title,
    namespaceUri: xmlns,
  };
}
