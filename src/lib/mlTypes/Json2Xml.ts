import * as eml20 from "./xmlns/www.energistics.org/energyml/resqmlv201/commonv2";
import * as resqml20 from "./xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import * as eml23 from "./xmlns/www.energistics.org/energyml/resqmlv22/commonv2";
import * as resqml22 from "./xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import * as witsml21 from "./xmlns/www.energistics.org/energyml/witsmlv21/witsmlv2";
import * as prodml22 from "./xmlns/www.energistics.org/energyml/prodmlv22/prodmlv2";
import * as prodml23 from "./xmlns/www.energistics.org/energyml/prodmlv23/prodmlv2";
import { parseJSON } from "./XmlJsonUtil";

import { EtpQualifiedType } from "../common/EtpQualifiedType";

/*
 * Options for the XMLBuilder
 */
export interface IXMLOptions {
  /**
   * Prefix for all attributes
   *
   * @type {string}
   * @memberof IOptions
   */
  attributeNamePrefix: string;
  /**
   * Indentation string
   *
   * @type {string}
   * @memberof IOptions
   */
  indentBy: string;
  /**
   * Associate namespace shortcut to namespace path
   *
   * @type {string}
   * @memberof IOptions
   */
  namespaces: Map<string, string>;
}

export const defaultOptions: IXMLOptions = {
  attributeNamePrefix: "_",
  indentBy: "  ",
  namespaces: new Map([
    ["gts", "http://www.isotc211.org/2005/gts"],
    ["gsr", "http://www.isotc211.org/2005/gsr"],
    ["dc", "http://purl.org/dc/terms/"],
    ["gml", "http://www.opengis.net/gml/3.2"],
    ["xlink", "http://www.w3.org/1999/xlink"],
    ["gmd", "http://www.isotc211.org/2005/gmd"],
    ["gco", "http://www.isotc211.org/2005/gco"],
    ["abstract", "http://www.energistics.org/schemas/abstract"],
    ["resqml20", resqml20.document._namespace],
    ["eml20", eml20.document._namespace]
  ])
};

/**
 * Build XML document from typescript and json information
 *
 * @export
 * @class XMLBuilder
 */
export class XMLBuilder {
  private attributeNamePrefix: string;
  private indentString: string;
  private reverseNamespace: Map<string, Map<string, string>> = new Map();

  constructor(options?: IXMLOptions) {
    const rMap = new Map([
      ["http://www.isotc211.org/2005/gts", "gts"],
      ["http://www.isotc211.org/2005/gsr", "gsr"],
      ["http://purl.org/dc/terms/", "dc"],
      ["http://www.opengis.net/gml/3.2", "gml"],
      ["http://www.w3.org/1999/xlink", "xlink"],
      ["http://www.isotc211.org/2005/gmd", "gmd"],
      ["http://www.isotc211.org/2005/gco", "gco"],
      ["http://www.energistics.org/schemas/abstract", "abstract"]
    ]);
    this.reverseNamespace = new Map();
    const resqml20Map = new Map([
      [resqml20.document._namespace, "resqml20"],
      [eml20.document._namespace, "eml20"]
    ]);
    const resqml22Map = new Map([
      [resqml22.document._namespace, "resqml22"],
      [prodml22.document._namespace, "prodml22"],
      [eml23.document._namespace, "eml23"]
    ]);
    const witsml21Map = new Map([
      [eml23.document._namespace, "eml23"],
      [witsml21.document._namespace, "witsml21"]
    ]);
    this.reverseNamespace.set("2.0", new Map([...rMap, ...resqml20Map]));
    this.reverseNamespace.set("2.2", new Map([...rMap, ...resqml22Map]));
    this.reverseNamespace.set("2.1", new Map([...rMap, ...witsml21Map]));
    this.reverseNamespace.set(
      "2.3",
      new Map([...rMap, [eml23.document._namespace, "eml23"]])
    );

    this.attributeNamePrefix = options?.attributeNamePrefix ?? "_";
    this.indentString = options?.indentBy ?? "  ";
  }

  /**
   * Convert from JSON to JSONtoEnergistics XML document
   *
   * @param {string} json
   * @returns {string}
   * @memberof XMLBuilder
   */
  public JSONtoEnergistics(json: string): string {
    const jObj = parseJSON(json);
    if (
      !jObj.$type ||
      !(
        jObj.$type.startsWith("resqml20") ||
        jObj.$type.startsWith("resqml22") ||
        jObj.$type.startsWith("witsml21") ||
        jObj.$type.startsWith("prodml22") ||
        jObj.$type.startsWith("prodml23") ||
        jObj.$type.startsWith("eml20") ||
        jObj.$type.startsWith("eml23")
      )
    ) {
      return "";
    }

    const qType = new EtpQualifiedType(jObj.$type);
    const name = qType.dataType.startsWith("obj_")
      ? qType.dataType.slice(4)
      : qType.dataType;

    const resqmlObj: Record<string, any> = {};
    resqmlObj[name] = jObj;

    const document =
      qType.domainFamily === "resqml"
        ? qType.domainVersion === "2.0"
          ? resqml20.document
          : resqml22.document
        : qType.domainFamily === "witsml"
        ? witsml21.document
        : qType.domainFamily === "prodml"
        ? qType.domainVersion === "2.3"
          ? prodml23.document
          : prodml22.document
        : qType.domainVersion === "2.0"
        ? eml20.document
        : eml23.document;

    const version = qType.domainVersion as "2.0" | "2.1" | "2.2" | "2.3";

    Object.defineProperty(resqmlObj[name], "_name", {
      enumerable: false,
      value: `${jObj.$type.split(".")[0]}:${name}`
    });
    return (
      `<?xml version="1.0" encoding="utf-8"?>\n` +
      this.j2x(resqmlObj, 0, document, version).val
    );
  }

  /**
   * Extract the actual resqml properties in XML order
   *
   * @private
   * @param {Record<string, unknown>} obj
   * @returns
   * @memberof XMLBuilder
   */
  private orderedProps(obj: Record<string, unknown>) {
    let p: string[] = [];
    const p3: string[] = [];
    for (const key in obj) {
      p3.push(key);
    }
    for (; obj != null; obj = Object.getPrototypeOf(obj)) {
      const op = Object.getOwnPropertyNames(obj);
      const p1: string[] = [];
      for (const i of op) {
        if (p3.indexOf(i) !== -1 && p.indexOf(i) === -1) {
          p1.push(i);
        }
      }
      p = p1.concat(...p);
    }
    return p;
  }

  /**
   * Main conversion function, recursive
   *
   * @private
   * @param {Record<string, unknown>} jObj
   * @param {number} level
   * @param {*} xmlType
   * @returns {{ attrStr: string; val: string }}
   * @memberof XMLBuilder
   */
  private j2x(
    jObj: Record<string, any>,
    level: number,
    xmlType: any,
    version: "2.0" | "2.1" | "2.2" | "2.3"
  ): { attrStr: string; val: string } {
    let attrStr = "";
    const rMap = this.reverseNamespace.get(version) || new Map();
    if (level === 1) {
      attrStr = ` xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"`;
      for (const [k, v] of rMap) {
        attrStr += ` xmlns:${v}="${k}"`;
      }
    }
    let type = jObj._type;
    if (!type && jObj["$type"]) {
      type = jObj["$type"].replace(".", ":");
    }
    if (type) {
      attrStr += ` xsi:type="${type}"`;
    }
    const defaultNamespace = type ? type.split(":")[0] : "";

    let val = "";
    const props = this.orderedProps(jObj);
    for (const key of props) {
      if (jObj[key] && jObj[key]._exists === false) {
        continue;
      }
      let namespace = defaultNamespace;
      // Since object is result of multiple inheritance, find the namespace responsible for this key
      let proto = xmlType ? Object.getPrototypeOf(xmlType) : null;
      while (proto) {
        if (Object.hasOwnProperty.call(proto, key)) {
          namespace = rMap.get(proto._namespace);
          proto = null;
        } else {
          proto = Object.getPrototypeOf(proto);
        }
      }
      const curKey = jObj[key]?._name ?? `${namespace}:${key}`;
      if (key.startsWith(this.attributeNamePrefix) || key === "$type") {
        // Nothing to do
      } else if (typeof jObj[key] === "undefined") {
        // suppress undefined node
      } else if (jObj[key] === null) {
        val += `${this.indentBy(level)}<${curKey}/>\n`;
      } else if (jObj[key] instanceof Date) {
        val += this.buildTextValueNode(
          jObj[key].toISOString(),
          curKey,
          "",
          level
        );
      } else if (typeof jObj[key] !== "object") {
        // Primitive type

        // Check if it is an attribute
        const attr = this.isAttribute(key);
        if (attr) {
          let newVal = "" + jObj[key];
          newVal = this.replaceEntitiesValue(newVal);
          attrStr += ` ${attr}="${newVal}"`;
        } else {
          // Tag value
          val += this.buildTextValueNode(jObj[key], curKey, "", level);
        }
      } else if (Array.isArray(jObj[key])) {
        // Repeated nodes
        const arrLen = jObj[key].length;
        for (let j = 0; j < arrLen; j++) {
          const item = jObj[key][j];
          if (typeof item === "undefined") {
            // Suppress undefined node
          } else if (item === null) {
            val += `${this.indentBy(level)}<${curKey}/>\n`;
          } else if (typeof item === "object") {
            val += this.processTextOrObjectNode(
              item,
              curKey,
              level,
              xmlType && xmlType[key] ? xmlType[key][0] : null,
              version
            );
          } else {
            val += this.buildTextValueNode(item, curKey, "", level);
          }
        }
      } else {
        // Nested node

        // Identify the node corresponding to "single value + attributes" in xml
        const isAttributeGroup = jObj[key]["_"] !== undefined;
        if (isAttributeGroup) {
          let attr2 = "";
          for (const key2 of Object.keys(jObj[key])) {
            if (key2 === "_") {
              continue;
            }
            if (key2 === "$type") {
              attr2 += ` xsi:type="${jObj[key][key2].replace(".", ":")}"`;
            } else {
              attr2 += ` ${key2.charAt(0).toLowerCase() + key2.slice(1)}="${
                jObj[key][key2]
              }"`;
            }
          }
          val += this.buildTextValueNode(jObj[key]["_"], curKey, attr2, level);
        } else {
          val += this.processTextOrObjectNode(
            jObj[key],
            curKey,
            level,
            xmlType ? xmlType[key] : null,
            version
          );
        }
      }
    }
    return { attrStr: attrStr, val: val };
  }

  /**
   * Process an object or text node
   *
   * @private
   * @param {Record<string, unknown>} object
   * @param {string} key
   * @param {number} level
   * @param {*} xmlType
   * @returns
   * @memberof XMLBuilder
   */
  private processTextOrObjectNode(
    object: Record<string, unknown>,
    key: string,
    level: number,
    xmlType: any,
    version: "2.0" | "2.1" | "2.2" | "2.3"
  ) {
    if (object["_exists"] === false) {
      return "";
    }
    const result = this.j2x(object, level + 1, xmlType, version);
    if (result.val === "") {
      return "";
    }
    return this.buildObjectNode(result.val, key, result.attrStr, level);
  }

  /**
   * Build an object node (complex type)
   *
   * @private
   * @param {string} value
   * @param {string} key
   * @param {string} attrStr
   * @param {number} level
   * @returns
   * @memberof XMLBuilder
   */
  private buildObjectNode(
    value: string,
    key: string,
    attrStr: string,
    level: number
  ) {
    if (attrStr && value.indexOf("<") === -1) {
      return `${this.indentBy(level)}<${key}${attrStr}>${value}
        </${key}>\n`;
    } else {
      return `${this.indentBy(
        level
      )}<${key}${attrStr}>\n${value}${this.indentBy(level)}</${key}>\n`;
    }
  }

  /**
   * Create an XML text node
   *
   * @private
   * @param {string} value of the node
   * @param {string} key name of the node
   * @param {string} attrStr attribute string of the node
   * @param {number} level of indentation
   * @returns
   * @memberof XMLBuilder
   */
  private buildTextValueNode(
    value: string,
    key: string,
    attrStr: string,
    level: number
  ) {
    const textValue = this.replaceEntitiesValue(value);

    return `${this.indentBy(level)}<${key}${attrStr}>${textValue}</${key}>\n`;
  }

  /**
   * Transform special characters into xml
   *
   * @private
   * @param {string} textValue
   * @returns
   * @memberof XMLBuilder
   */
  private replaceEntitiesValue(textValue: string) {
    const entities: { regex: RegExp; val: string }[] = [
      { regex: />/g, val: "&gt;" },
      { regex: /</g, val: "&lt;" },
      { regex: /'/g, val: "&apos;" },
      { regex: /"/g, val: "&quot;" }
    ];
    if (textValue && textValue.length > 0) {
      for (const entity of entities) {
        textValue = textValue.replace(entity.regex, entity.val);
      }
    }
    return textValue;
  }

  /**
   * Indent the XML line
   *
   * @private
   * @param {number} level of indentation
   * @returns
   * @memberof XMLBuilder
   */
  private indentBy(level: number) {
    return this.indentString.repeat(level);
  }

  /**
   * Check if a JSON field is an attribute
   *
   * @private
   * @param {string} name of the JSON field
   * @returns {string}
   * @memberof XMLBuilder
   */
  private isAttribute(name: string): string {
    if (name === "Uuid") {
      return "uuid";
    } else if (name === "ObjectVersion") {
      return "objectVersion";
    } else if (name === "SchemaVersion") {
      return "schemaVersion";
    } else if (name.startsWith(this.attributeNamePrefix)) {
      return name.slice(this.attributeNamePrefix.length);
    } else {
      return "";
    }
  }
}
