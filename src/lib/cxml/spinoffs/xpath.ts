/*
this worked:
./node_modules/pegjs/bin/pegjs src/spinoffs/xpathParser.pegjs && tsc --allowJs src/spinoffs/xpath.ts --outDir ./ && node xpath.js 
//*/
import * as XPathParser from "./XPathParser";
//import * as XPathParser from './XPathParser';
//import XPathParser = require('./XPathParser');
//import { assign, fromPairs, map, zip } from "lodash";

export type NullOrString = null | string;
export type Ops = "=" | "!=" | "&lt;" | "&lt;=" | "&gt;" | ">" | "&gt;=" | ">=";
export type PredicateRaw = null | [string[], Ops, string];
export type PredicateParsed = null | {
  left: string;
  op: Ops;
  right: string;
};
export interface ItemCommon {
  axis: string;
  namespace: string;
  name: NullOrString;
  attribute: NullOrString;
}

export interface ItemParsedPredicateRaw extends ItemCommon {
  predicates: PredicateRaw[];
}

export interface ItemParsed extends ItemCommon {
  predicates: PredicateParsed[];
}

export function parse(
  xpath: string,
  xpathNamespaceTbl: Record<string, string>
): ItemParsed[] {
  return XPathParser.parse(xpath, {})
    .map(
      (
        part: [string, string, string, PredicateRaw[], string]
      ): ItemParsedPredicateRaw => ({
        axis: part[0],
        namespace: part[1],
        name: part[2],
        predicates: part[3],
        attribute: part[4]
      })
    )
    .map((x: ItemParsedPredicateRaw) => {
      const predicates = x.predicates;
      let parsedPredicates: PredicateParsed[] = [];
      if (predicates !== null) {
        const strippedPredicates = predicates.slice(1).slice(0, -1);
        parsedPredicates = strippedPredicates.map((predicate: PredicateRaw) => {
          return predicate
            ? {
                left: predicate[0][1],
                op: predicate[1],
                right: predicate[2]
              }
            : null;
        });
      }

      const namespacePrefix = x.namespace;
      if (
        !!namespacePrefix &&
        (!xpathNamespaceTbl ||
          // eslint-disable-next-line no-prototype-builtins
          !xpathNamespaceTbl.hasOwnProperty(namespacePrefix))
      ) {
        throw new Error(
          `Must specify namespace table for prefix: ${namespacePrefix}`
        );
      }

      return {
        axis: x.axis,
        // NOTE: XPathParser uses "namespace" to refer to the namespace prefix.
        // We are using "namespace" to refer to the namespace name (URI).
        // eslint-disable-next-line no-extra-boolean-cast
        namespace: !!namespacePrefix ? xpathNamespaceTbl[namespacePrefix] : "",
        name: x.name,
        predicates: parsedPredicates,
        attribute: x.attribute
      };
    });
}

//console.log(parse('/Pathway'));
//console.log(parse('/Pathway/DataNode/@*'));
//console.log(parse('/Pathway/DataNode/@Height'));
//console.log(JSON.stringify(parse('/Pathway/DataNode[@Width=35]/@Height'), null, '  '));
