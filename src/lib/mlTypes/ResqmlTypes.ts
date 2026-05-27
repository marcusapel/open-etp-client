// To parse this data:
//
//   import { Convert, Abstract } from "./file";
//
//   const abstract = Convert.toAbstract(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import { AbstractResqmlDataObject } from "./xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";

import {
  AbstractObject,
  AbstractCitedDataObject
} from "./xmlns/www.energistics.org/energyml/resqmlv201/commonv2";

/**
 * The Abstract package contains the base XSD types from which all EnergyML Data Objects are
 * derived.
 * This Package contains the common re-usable structures and types commonly used by EnergyML
 * Schemas.
 */

export interface Abstract {
  /**
   * Base for all RESQML objects.
   */
  AbstractResqmlDataObject?: AbstractResqmlDataObject;
  /**
   * Substitution group for normative data objects.
   */
  AbstractCitedDataObject?: AbstractCitedDataObject;
  /**
   * Substitution group for normative data objects.
   */
  AbstractDataObject?: AbstractObject;
  /**
   * Substitution group for contextual objects.
   */
  AbstractContextualObject?: AbstractObject;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toAbstract(json: string): Abstract {
    return cast(JSON.parse(json), r("Abstract"));
  }

  public static abstractToJson(value: Abstract): string {
    return JSON.stringify(uncast(value, r("Abstract")), null, 2);
  }

  public static toAbstractResqmlDataObject(json: string): Abstract {
    return cast(JSON.parse(json), r("AbstractResqmlDataObject"));
  }

  public static abstractResqmlDataObjectToJson(value: Abstract): string {
    return JSON.stringify(
      uncast(value, r("AbstractResqmlDataObject")),
      null,
      2
    );
  }
}

function invalidValue(typ: any, val: any): never {
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(value: any, itemType: any, getProps: any): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) {
      return val;
    }
    return invalidValue(typ, val);
  }

  function transformUnion(types: any[], val: any): any {
    // val must validate against one typ in typs
    const l = types.length;
    for (let i = 0; i < l; i++) {
      const typ = types[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {
        // do nothing
      }
    }
    return invalidValue(types, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) {
      return val;
    }
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) {
      return invalidValue("array", val);
    }
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(typ: any, val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps);
      }
    });
    return result;
  }

  if (itemType === "any") {
    return value;
  }
  if (itemType === null) {
    if (value === null) {
      return value;
    }
    return invalidValue(itemType, value);
  }
  if (itemType === false) {
    return invalidValue(itemType, value);
  }
  while (typeof itemType === "object" && itemType.ref !== undefined) {
    itemType = typeMap[itemType.ref];
  }
  if (Array.isArray(itemType)) {
    return transformEnum(itemType, value);
  }
  if (typeof itemType === "object") {
    if (Object.prototype.hasOwnProperty.call(itemType, "unionMembers")) {
      return transformUnion(itemType.unionMembers, value);
    }
    if (Object.prototype.hasOwnProperty.call(itemType, "arrayItems")) {
      return transformArray(itemType.arrayItems, value);
    }
    if (Object.prototype.hasOwnProperty.call(itemType, "props")) {
      return transformObject(getProps(itemType), itemType.additional, value);
    }
    return invalidValue(itemType, value);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (itemType === Date && typeof value !== "number") {
    return transformDate(itemType, value);
  }
  return transformPrimitive(itemType, value);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Abstract: o(
    [
      {
        js: "AbstractResqmlDataObject",
        json: "AbstractResqmlDataObject",
        typ: u(undefined, r("AbstractResqmlDataObject"))
      },
      {
        js: "AbstractCitedDataObject",
        json: "AbstractCitedDataObject",
        typ: u(undefined, r("AbstractCitedDataObject"))
      },
      {
        js: "AbstractDataObject",
        json: "AbstractDataObject",
        typ: u(undefined, r("AbstractObject"))
      },
      {
        js: "AbstractContextualObject",
        json: "AbstractContextualObject",
        typ: u(undefined, r("AbstractObject"))
      }
    ],
    "any"
  ),
  AbstractCitedDataObject: o(
    [
      { json: "Citation", js: "Citation", typ: r("Citation") },
      { json: "schemaVersion", js: "schemaVersion", typ: "" },
      { json: "Uuid", js: "Uuid", typ: "" },
      {
        json: "Aliases",
        js: "Aliases",
        typ: u(undefined, r("ObjectAlias"), a(r("ObjectAlias")))
      },
      { json: "CustomData", js: "CustomData", typ: u(undefined, "any") },
      { json: "ObjectVersion", js: "ObjectVersion", typ: u(undefined, "") }
    ],
    "any"
  ),
  ObjectAlias: o(
    [
      { json: "Authority", js: "Authority", typ: u(undefined, "") },
      { json: "Description", js: "Description", typ: u(undefined, "") },
      { json: "Identifier", js: "Identifier", typ: "" }
    ],
    "any"
  ),
  Citation: o(
    [
      { json: "Creation", js: "Creation", typ: Date },
      { json: "Description", js: "Description", typ: u(undefined, "") },
      {
        json: "DescriptiveKeywords",
        js: "DescriptiveKeywords",
        typ: u(undefined, "")
      },
      { json: "Editor", js: "Editor", typ: u(undefined, "") },
      { json: "Format", js: "Format", typ: "" },
      { json: "LastUpdate", js: "LastUpdate", typ: u(undefined, Date) },
      { json: "Originator", js: "Originator", typ: "" },
      { json: "Title", js: "Title", typ: "" },
      { json: "VersionString", js: "VersionString", typ: u(undefined, "") }
    ],
    "any"
  ),
  AbstractObject: o(
    [
      {
        json: "Aliases",
        js: "Aliases",
        typ: u(undefined, r("ObjectAlias"), a(r("ObjectAlias")))
      },
      { json: "Citation", js: "Citation", typ: u(undefined, r("Citation")) },
      { json: "CustomData", js: "CustomData", typ: u(undefined, "any") },
      { json: "ObjectVersion", js: "ObjectVersion", typ: u(undefined, "") },
      { json: "SchemaVersion", js: "SchemaVersion", typ: "" },
      { json: "Uuid", js: "Uuid", typ: "" }
    ],
    "any"
  ),
  AbstractResqmlDataObject: o(
    [
      {
        js: "ExtraMetadata",
        json: "ExtraMetadata",
        typ: u(undefined, r("NameValuePair"), a(r("NameValuePair")))
      },
      { json: "Citation", js: "Citation", typ: r("Citation") },
      { json: "SchemaVersion", js: "SchemaVersion", typ: "" },
      { json: "Uuid", js: "Uuid", typ: "" },
      {
        json: "Aliases",
        js: "Aliases",
        typ: u(undefined, r("ObjectAlias"), a(r("ObjectAlias")))
      },
      { json: "CustomData", js: "CustomData", typ: u(undefined, "any") },
      { json: "ObjectVersion", js: "ObjectVersion", typ: u(undefined, "") }
    ],
    "any"
  ),
  NameValuePair: o(
    [
      { json: "Name", js: "Name", typ: "" },
      { json: "Value", js: "Value", typ: "" }
    ],
    "any"
  )
};
