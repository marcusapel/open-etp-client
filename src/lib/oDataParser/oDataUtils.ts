import { DataQueryOperator, DataQueryValue } from "../common/EtpTypes";

import oDataParser from "./oDataParser";

import { AbstractResqmlDataObject } from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { SimpleJson } from "../mlTypes/XmlJsonUtil";

export type ODataSortCriteria = { [key: string]: "asc" | "desc" };

type URI = string;

/**
 * Class used to sort an array of objects based on orderby OData syntax.
 * It uses an array of orderby information (pairs of path, asc or desc) to provide a
 * compare function to use with sort
 *
 * @class OrderByComparator
 */
export class OrderByComparator {
  private readonly sorting: Array<ODataSortCriteria>;

  /**
   * Creates an instance of ODataComparator.
   * @param {(Array<{ [key: string]: "asc" | "desc" }>)} sort
   * @memberof ODataComparator
   */
  constructor(sort: Array<ODataSortCriteria>) {
    this.sorting = sort;
    this.sorting.push({ uuid: "asc" });
  }

  /**
   * Compare two objects
   *
   * @param {Record<string, any>} a
   * @param {Record<string, any>} b
   * @returns {(0 | 1 | -1)}
   * @memberof OrderByComparator
   */
  compareObjects(a: Record<string, any>, b: Record<string, any>): 0 | 1 | -1 {
    for (const v of this.sorting) {
      const k = Object.keys(v)[0];
      const valueA = getPropertyValue(a, k);
      const valueB = getPropertyValue(b, k);
      if (valueA < valueB) {
        return v[k] === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return v[k] === "asc" ? 1 : -1;
      }
    }
    return 0;
  }
}

/**
 * Compute the value corresponding to a path inside the object
 *
 * @param {Record<string, any>} object
 * @param {string} path
 * @returns {any}
 */
export const getPropertyValue = (
  object: Record<string, unknown>,
  path: string
): any => {
  let cur: any = object;
  if (path.length === 0) {
    return null;
  }
  let separator = "/";
  if (path.indexOf(".") !== -1) {
    separator = ".";
  }
  for (const e of path.split(separator)) {
    if (!cur || !(e in cur)) {
      return null;
    }
    cur = cur[e];
  }
  return cur;
};

/**
 * Look for the value inside a JSON object for the expression
 *
 * @param {SimpleJson<AbstractResqmlDataObject>} cur
 * @param {DataQueryValue} qv
 * @returns {(string | number | boolean | null)} The value, or null if the function operators are invalid, or call fails.
 * @see queryCheckValue()
 */
const getValue = (
  cur: SimpleJson<AbstractResqmlDataObject>,
  qv: DataQueryValue
): string | number | boolean | null => {
  if (qv.type === "functioncall") {
    const args = qv.args.map(a => getValue(cur, a));
    if (args.length === 2) {
      if (args[0] === null || args[1] === null) {
        return null;
      }
      if (qv.func === "startswith") {
        return `${args[0]}`.startsWith(`${args[1]}`) || null;
      } else if (qv.func === "endswith") {
        return `${args[0]}`.endsWith(`${args[1]}`) || null;
      } else if (qv.func === "contains") {
        return `${args[0]}`.indexOf(`${args[1]}`) !== -1 || null;
      } else if (qv.func === "substringof") {
        return `${args[1]}`.indexOf(`${args[0]}`) !== -1 || null;
      } else if (qv.func === "indexof") {
        return `${args[0]}`.indexOf(`${args[1]}`);
      } else if (qv.func === "concat") {
        return `${args[0]}${args[1]}`;
      }
    } else if (args.length === 1) {
      if (args[0] === null) {
        return null;
      }
      if (qv.func === "tolower") {
        return `${args[0]}`.toLowerCase();
      } else if (qv.func === "toupper") {
        return `${args[0]}`.toUpperCase();
      } else if (qv.func === "length") {
        return `${args[0]}`.length;
      } else if (qv.func === "trim") {
        return `${args[0]}`.trim();
      }
    }
    return null;
  } else if (qv.type === "property") {
    cur = getPropertyValue(cur, qv.name);
    return typeof cur === "string" || typeof cur === "number" ? cur : null;
  } else if (qv.type === "literal") {
    return qv.value;
  }
  return queryCheckValue(cur, qv);
};

/**
 * Compare two values with OData operator
 *
 * @param {(string | number)} value1
 * @param {(string | number)} value2
 * @param {DataQueryOperator} operator
 * @returns {boolean}
 */
const compareValue = (
  value1: string | number | boolean,
  value2: string | number | boolean,
  operator: DataQueryOperator
): boolean => {
  if (typeof value1 === "number" && typeof value2 === "string") {
    value2 = +value2;
  }
  if (typeof value2 === "number" && typeof value1 === "string") {
    value1 = +value1;
  }
  switch (operator) {
    case "eq":
      return value1 === value2;
    case "ne":
      return value1 !== value2;
    case "gt":
      return value1 > value2;
    case "lt":
      return value1 < value2;
    case "ge":
      return value1 >= value2;
    case "le":
      return value1 <= value2;
    case "and":
      return !!value1 && !!value2;
    case "or":
      return !!value1 || !!value2;
    default:
      return false;
  }
};

/**
 * Check if a given value satisfy a query
 *
 * @param {SimpleJson<AbstractResqmlDataObject>} cur Object to check against
 * @param {IDataQuery} filter filter description
 * @returns {boolean} true if the given object satisfies the filter
 */
const queryCheckValue = (
  cur: SimpleJson<AbstractResqmlDataObject>,
  filter: DataQueryValue
): boolean => {
  if (
    filter.type === "property" ||
    filter.type === "literal" ||
    filter.type === "functioncall"
  ) {
    return getValue(cur, filter) !== null;
  }
  if (!("left" in filter) || !("right" in filter)) {
    return false;
  }
  // Check if the values are both side of a leaf comparison
  const value1 = getValue(cur, filter.left);
  const value2 = getValue(cur, filter.right);

  if (value1 !== null && value2 !== null) {
    // If both side are values, compare
    return compareValue(value1, value2, filter.type);
  } else if (
    filter.left.type !== "property" &&
    filter.left.type !== "literal" &&
    filter.left.type !== "functioncall" &&
    filter.right.type !== "property" &&
    filter.right.type !== "literal" &&
    filter.right.type !== "functioncall"
  ) {
    // logical operation
    const expression1 = queryCheckValue(cur, filter.left);
    const expression2 = queryCheckValue(cur, filter.right);
    return compareValue(expression1, expression2, filter.type);
  }
  return false;
};

/**
 * Check if a given uri satisfy all queries
 *
 * @param map
 * @param queries
 * @param uri
 * @returns {boolean}
 */
export const queryFilter = (
  map: Map<string, SimpleJson<AbstractResqmlDataObject>>,
  queries: DataQueryValue[],
  uri: URI
): boolean => {
  const o = map.get(uri);
  if (!o) {
    return false;
  }
  for (const query of queries) {
    if (!queryCheckValue(o, query)) {
      return false;
    }
  }
  return true;
};

/**
 * Creates array of OData query structure from query filter string (s)
 *
 * @param {(string | string[])} filter
 * @returns {DataQueryValue[]}
 */
export const createODataQueries = (
  filter: string | string[]
): DataQueryValue[] => {
  let filters: string[] = [];
  if (typeof filter === "string") {
    filters.push(filter);
  } else {
    filters = filter;
  }
  return filters.map(f => oDataParser.parse(f, "filterExpr") as DataQueryValue);
};

/**
 * Creates array of OData sorting structure from query orderby string
 *
 * @param {string} orderBy
 * @returns {Array<ODataSortCriteria>}
 */
export const createODataSorting = (
  orderBy: string
): Array<ODataSortCriteria> => {
  if (!orderBy) {
    return [];
  }
  return oDataParser.parse(orderBy, "orderbyList") as Array<ODataSortCriteria>;
};
