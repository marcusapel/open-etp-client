// This file is part of cxml, copyright (c) 2016-2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import * as sax from "sax";
import * as stream from "stream";

import { Context } from "../xml/Context";
import { MemberRef } from "../xml/MemberRef";
import { Namespace } from "../xml/Namespace";
import { State } from "./State";
import { HandlerInstance, Rule, RuleClass } from "./Rule";

import { ItemParsed, parse, PredicateParsed } from "../spinoffs/xpath";

export type ItemParsedKey = keyof ItemParsed;
export type ItemParsedValue = ItemParsed[ItemParsedKey];

// TODO can this type definition be improved?
/*
{
  xpathElMatcher(obj): {
      _before: Function,
      _after: Function,
    xpathElMatcher(obj): {
      _before: Function,
      _after: Function,
    }(Map),
  }(Map)
}(Map)
//*/
export type AttachmentMethodNames = "_after" | "_before";
// eslint-disable-next-line @typescript-eslint/ban-types
export type BTreeFinal = Map<AttachmentMethodNames, Function>;
export type BTreeIntermediate<T> = Map<ItemParsed, T | BTreeFinal>;
export type BTree<T> = BTreeIntermediate<T> & BTreeFinal;

export interface CxmlDate extends Date {
  cxmlTimezoneOffset: number;
}

function findInMapIter<T>(
  // TODO why can't I mark this as BTree<T> instead of any?
  mapIter: Iterator<[ItemParsed, BTreeFinal | T]>,
  compare: (x: ItemParsed) => boolean
): BTree<T> | undefined {
  const { value, done } = mapIter.next();
  if (!value) {
    return;
  }
  const [itemParsed, childMap] = value;
  if (!compare(itemParsed)) {
    if (done) {
      return;
    }
    return findInMapIter<T>(mapIter, compare);
  } else {
    return childMap;
  }
}

export type NonBinaryOpToRights = { [K in "=" | "!="]: string | number };
export type BinaryOpToRights = {
  [K in "&lt;" | "&lt;=" | "&gt;" | ">" | "&gt;=" | ">="]: number;
};
// TODO look at moving some of these type definitions into xpath.ts
export type OpToRights = NonBinaryOpToRights & BinaryOpToRights;
export type OpHandlerInputGeneric<T, K extends keyof T> = {
  left: string;
  op: K;
  right: T[K];
};
export type OpHandlerInput = OpHandlerInputGeneric<
  OpToRights,
  keyof OpToRights
>;
export type OpHandlersGeneric<T, K extends keyof T> = {
  [K: string]: (item: HandlerInstance, left: string, right: T[K]) => boolean;
};
export type OpHandlers = OpHandlersGeneric<OpToRights, keyof OpToRights>;

const opHandlers = {
  // equal
  "=": function (item, left, right) {
    return item[left] === right;
  },
  // not equal
  "!=": function (item, left, right) {
    return item[left] !== right;
  },
  // less than
  "&lt;": function (item, left, right) {
    return item[left] < right;
  },
  // less than or equal to
  "&lt;=": function (item, left, right) {
    return item[left] < right;
  },
  // greater than
  "&gt;": function (item, left, right) {
    return item[left] > right;
  },
  // greater than or equal to
  "&gt;=": function (item, left, right) {
    return item[left] > right;
  }
} as OpHandlers;

opHandlers[">"] = opHandlers["&gt;"];
opHandlers[">="] = opHandlers["&gt;="];

/*
opHandlers["&gt;"]({} as HandlerInstance, "CenterX", 2);
opHandlers["&gt;"]({} as HandlerInstance, "CenterX", "b");
opHandlers["&gt;"]({} as HandlerInstance, "a", "b");
opHandlers[">"]({} as HandlerInstance, "CenterX", 2);
opHandlers[">"]({} as HandlerInstance, "a", 2);
opHandlers[">="]({} as HandlerInstance, 1, 2);
opHandlers[">="]({} as HandlerInstance, "a", 2);
opHandlers["="]({} as HandlerInstance, "a", 2);
//*/

function findEntry<T>(
  mapIter: Iterator<[ItemParsed, BTree<T>]>,
  compare: (x: ItemParsed) => boolean
): [BTree<T>, ItemParsed] | undefined {
  const { value, done } = mapIter.next();
  if (!value) {
    return;
  }
  const [itemParsed, childMap] = value;
  if (!compare(itemParsed)) {
    if (done) {
      return;
    }
    return findEntry(mapIter, compare);
  } else {
    return [childMap, itemParsed];
  }
}

function getAttachmentMethod<T>(
  state: State,
  bTree: BTree<T>,
  attachmentMethodName: AttachmentMethodNames
  // eslint-disable-next-line @typescript-eslint/ban-types
): Function | undefined {
  const member =
    (!!state.memberRef && state.memberRef.member) ||
    ({} as typeof MemberRef.prototype.member);
  // TODO should we use state.memberRef.safeName here?
  const memberName = !!member && member.name;
  const memberNamespace =
    !!member && !!member.namespace && member.namespace.name;

  if (!memberName) {
    const attachmentMethod = bTree.get(attachmentMethodName);
    if (attachmentMethod) {
      return attachmentMethod;
    } else {
      return;
      // throw new Error(
      //   `getAttachmentMethod failed to find ${attachmentMethodName} function`
      // );
    }
  }
  const item = state.item || ({} as HandlerInstance);

  /*{ left: string; op: keyof NonBinaryOpHandlers; right: string }
            { left: number; op: keyof BinaryOpHandlers; right: number }
            | {
                left: string | number;
                op: keyof NonBinaryOpHandlers;
                right: string | number;
              }
              //*/

  const value = findInMapIter(
    bTree.entries(),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function ({ axis, namespace, name, predicates, attribute }: ItemParsed) {
      return (
        ["", memberNamespace].indexOf(namespace) > -1 &&
        name === memberName &&
        (!predicates ||
          predicates.reduce((acc: boolean, current: PredicateParsed) => {
            const c = current as OpHandlerInput;
            return acc && opHandlers[c.op](item, c.left, c.right);
          }, true))
      );
    }
  );

  if (!value) {
    // NOTE: we can end up here because there is no direct connection between
    // a Parser instance's attach and _parse methods. They actually just
    // connect via the rule.handler prototype. So it's possible for one
    // attachment method to set something on the rule.handler prototype, meaning it
    // appears to exist when we look at item._before or item._after in _parser,
    // but it doesn't actually exist for this xpath when we match the
    // state and bTree, level by level, up to the point where there should be
    // a _before or _after.
    return;
  }

  const parent = state.parent;
  // eslint-disable-next-line no-extra-boolean-cast
  if (!!parent) {
    return getAttachmentMethod(parent, value, attachmentMethodName);
  } else {
    return value.get(attachmentMethodName);
  }
}

const converterTbl: { [type: string]: (item: string) => any } = {
  Date: (item: string) => {
    const dateParts = item.match(
      /([0-9]+)-([0-9]+)-([0-9]+)(?:T([0-9]+):([0-9]+):([0-9]+)(\.[0-9]+)?)?(?:Z|([+-][0-9]+):([0-9]+))?/
    );

    if (!dateParts) {
      return null;
    }

    let offsetMinutes = +(dateParts[9] || "0");
    let offset = +(dateParts[8] || "0") * 60;

    if (offset < 0) {
      offsetMinutes = -offsetMinutes;
    }

    offset += offsetMinutes;

    const date = new Date(
      +dateParts[1],
      +dateParts[2] - 1,
      +dateParts[3],
      +(dateParts[4] || "0"),
      +(dateParts[5] || "0"),
      +(dateParts[6] || "0"),
      +(dateParts[7] || "0") * 1000
    ) as CxmlDate;

    date.setTime(date.getTime() - (offset + date.getTimezoneOffset()) * 60000);
    date.cxmlTimezoneOffset = offset;

    return date;
  },
  boolean: (item: string) => item === "true",
  string: (item: string) => item,
  number: (item: string) => +item
};

function convertPrimitive(text: string, type: Rule) {
  const converter = converterTbl[type.primitiveType];

  if (converter) {
    if (type.isList) {
      return text.trim().split(/\s+/).map(converter);
    } else {
      return converter(text.trim());
    }
  }

  return null;
}

export class Parser<T> {
  xpathNamespaceTbl: Record<string, string>;
  constructor(xpathNamespaceTbl: Record<string, string> = { "": "" }) {
    // TODO there is probably a better way to do this.
    // It appears the context param in the parser.parser
    // method may have be intended for the same purpose.
    this.xpathNamespaceTbl = xpathNamespaceTbl;
  }
  // TODO why do I need to use BTree<any> here?
  // I should be able to use BTree<T>
  bTree: BTree<any> & BTree<T> = new Map();
  attach<CustomHandler extends HandlerInstance>(
    handler: {
      new (): CustomHandler;
    },
    xpath: string
  ) {
    const { xpathNamespaceTbl } = this;
    const proto = handler.prototype as CustomHandler;
    const realHandler = (handler as RuleClass).rule?.handler;
    const realProto = realHandler?.prototype as CustomHandler;

    type CustomHandlerKey = keyof CustomHandler;
    const customHandlerKeys: CustomHandlerKey[] = Object.keys(proto);

    for (const customHandlerKey of customHandlerKeys) {
      const timeBasedKeys: CustomHandlerKey[] = ["_before", "_after"];
      if (timeBasedKeys.indexOf(customHandlerKey) === -1) {
        realProto[customHandlerKey] = proto[customHandlerKey];
      }
    }

    // TODO is this really the best way to do this?
    const { _before, _after } = proto;
    if (xpath && (_before || _after)) {
      // TODO we are mutating reversedXPathElMatchers for xpath
      // expressions with attributes, such as
      // "/Pathway/@GraphId"
      // or
      // "/Pathway/@*"
      // because we need to first just match the element(s), and
      // then afterwards match any attribute.
      const reversedXPathElMatchers = parse(xpath, xpathNamespaceTbl).reverse();
      let xpathAttrMatcher: ItemParsed | undefined;
      if (reversedXPathElMatchers[0].attribute !== null) {
        xpathAttrMatcher = reversedXPathElMatchers.shift();
      }
      const finalItem = reversedXPathElMatchers.reduce(function (
        parentMap,
        xpathElMatcher: ItemParsed
      ) {
        const xpathElMatcherPairs: Array<[ItemParsedKey, ItemParsedValue]> = [];
        for (const entry of Object.entries(xpathElMatcher)) {
          xpathElMatcherPairs.push([entry[0] as ItemParsedKey, entry[1]]);
        }
        const [currentMap, currentItemParsed]: [BTree<T>, ItemParsed] =
          findEntry(parentMap.entries(), function (candidateItemParsed) {
            return xpathElMatcherPairs.reduce(function (
              isRunningMatch: boolean,
              [xpathElMatcherKey, xpathElMatcherValue]: [
                ItemParsedKey,
                ItemParsedValue
              ]
            ) {
              return (
                isRunningMatch &&
                candidateItemParsed[xpathElMatcherKey] === xpathElMatcherValue
              );
            }, true);
          }) || [new Map(), xpathElMatcher];
        parentMap.set(currentItemParsed, currentMap);
        return currentMap;
      }, this.bTree);

      if (_before) {
        finalItem.set(
          "_before",
          !xpathAttrMatcher || xpathAttrMatcher.attribute === "*"
            ? _before
            : function (this: Map<string, string | number | boolean | "">) {
                if (xpathAttrMatcher?.attribute) {
                  const picked = this.get(xpathAttrMatcher?.attribute);
                  _before.call(picked);
                }
              }
        );
      }
      if (_after) {
        finalItem.set("_after", _after);
      }
    }

    if (realHandler) {
      realHandler._custom = true;
    }
  }

  parse<Output extends HandlerInstance>(
    stream: string | stream.Readable | NodeJS.ReadableStream,
    output: Output,
    context: Context
  ): Promise<Output> {
    return new Promise<Output>(
      (resolve: (item: Output) => void, reject: (err: Error) => void) =>
        this._parse<Output>(stream, output, context, resolve, reject)
    );
  }

  _parse<Output extends HandlerInstance>(
    stream: string | stream.Readable | NodeJS.ReadableStream,
    output: Output,
    context: Context,
    resolve: (item: Output) => void,
    reject: (err: Error) => void
  ) {
    const { bTree } = this;
    const xml = sax.createStream(true, { position: true });
    const rule = (output.constructor as RuleClass).rule as Rule;
    const xmlSpace = context.registerNamespace(
      "http://www.w3.org/XML/1998/namespace"
    );

    let namespaceTbl: { [short: string]: [Namespace, string] } = {
      "": [rule.namespace, rule.namespace.getPrefix()],
      xml: [xmlSpace, xmlSpace.getPrefix()]
    };

    let state: State | null = new State(
      null,
      null,
      rule,
      new rule.handler(),
      namespaceTbl
    );
    const rootState = state;

    /** Add a new xmlns prefix recognized inside current tag and its children. */

    function addNamespace(short: string, namespace: Namespace) {
      if (namespaceTbl[short] && namespaceTbl[short][0] === namespace) {
        return;
      }

      if (namespaceTbl === state?.namespaceTbl) {
        // Copy parent namespace table on first write.
        namespaceTbl = {};

        for (const key of Object.keys(state.namespaceTbl)) {
          namespaceTbl[key] = state.namespaceTbl[key];
        }
      }

      namespaceTbl[short] = [namespace, namespace.getPrefix()];
    }

    xml.on("opentag", (node: sax.Tag) => {
      const attrTbl = node.attributes;
      let attr: string;
      let nodePrefix = "";
      let name = node.name;
      let splitter = name.indexOf(":");
      let item: HandlerInstance | null = null;

      if (!state) {
        return;
      }
      namespaceTbl = state.namespaceTbl;

      // Read xmlns namespace prefix definitions before parsing node name.

      for (const key of Object.keys(attrTbl)) {
        if (key.substr(0, 5) === "xmlns") {
          const nsParts = key.match(/^xmlns(:(.+))?$/);

          if (nsParts) {
            addNamespace(
              nsParts[2] || "",
              context.registerNamespace(attrTbl[key])
            );
          }
        }
      }

      // Parse node name and possible namespace prefix.

      if (splitter >= 0) {
        nodePrefix = name.substr(0, splitter);
        name = name.substr(splitter + 1);
      }

      // Add internal surrogate key namespace prefix to node name.

      const nodeNamespace = namespaceTbl[nodePrefix];
      let prefixName = nodeNamespace[1];

      let child: MemberRef | null = null;
      let rule2: Rule | null = null;

      if (state.rule) {
        const idName = state.rule.namespace.context.namespaceByName(
          nodeNamespace[0].name
        );
        prefixName = `${idName.id}:`;
        child = state.rule.childTbl[prefixName + name];

        if (child) {
          if (child.proxy) {
            rule2 = child.proxy.member.rule;
            state = new State(
              state,
              child.proxy,
              rule2,
              new rule2.handler(),
              namespaceTbl
            );
          }

          rule2 = child.member.rule;
        }
      }

      if (rule2 && !rule2.isPlainPrimitive) {
        const typeName: string | undefined =
          "xsi:type" in attrTbl ? attrTbl["xsi:type"] : undefined;
        if (typeName) {
          const split = typeName.indexOf(":");
          const na = rule2.namespace.typeSpecList;
          for (const n in na) {
            if (na[n].name === typeName.substr(split + 1)) {
              const rule3 = na[n].getType();
              if (rule2 !== rule3) {
                rule2 = rule3;
                break;
              }
            }
          }
        }
        item = new rule2.handler();

        // Parse all attributes.
        for (const key of Object.keys(attrTbl)) {
          splitter = key.indexOf(":");

          if (splitter >= 0) {
            const attrPrefix = key.substr(0, splitter);
            if (
              attrPrefix === "xmlns" ||
              (attrPrefix === "xsi" && key !== "xsi:type")
            ) {
              continue;
            }

            const attrNamespace = namespaceTbl[attrPrefix];

            if (attrNamespace) {
              attr = attrNamespace[1] + key.substr(splitter + 1);
            } else {
              // eslint-disable-next-line no-console
              console.warn("Namespace not found for " + key);
              continue;
            }
          } else {
            attr = prefixName + key;
          }

          const ref = rule2.attributeTbl[attr];

          if (ref && ref.member.rule.isPlainPrimitive) {
            item[ref.safeName] = convertPrimitive(
              attrTbl[key],
              ref.member.rule
            );
          } else {
            item[key] = attrTbl[key];
          }
        }

        if (state.parent) {
          Object.defineProperty(item, "_parent", {
            enumerable: false,
            value: state.parent.item
          });
        }

        Object.defineProperty(item, "_name", {
          enumerable: false,
          value: node.name
        });

        if (typeName) {
          Object.defineProperty(item, "_type", {
            enumerable: false,
            value: typeName
          });
        }
      }

      state = new State(state, child, rule2, item, namespaceTbl);

      // TODO why did the previous version of this lib check
      // (rule && !rule.isPlainPrimitive) before running _before?
      // I'm keeping the check for now, until I figure out why.
      // TODO also, why did it run '_before' prior to re-setting state
      // (re-setting in the line above)?
      if (rule2 && !rule2.isPlainPrimitive) {
        const thisBefore = getAttachmentMethod(state, bTree, "_before");
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!thisBefore) {
          thisBefore.call(item);
        }
      }
    });

    xml.on("text", function (text: string) {
      if (!state) {
        return;
      }
      if (state.rule && state.rule.isPrimitive) {
        if (!state.textList) {
          state.textList = [];
        }
        state.textList.push(text);
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    xml.on("closetag", function (_name: string) {
      if (!state) {
        return;
      }
      let member = state.memberRef;
      const obj = state.item;
      let item: HandlerInstance | null = obj;
      let text: string | undefined = undefined;

      if (state.rule && state.rule.isPrimitive) {
        text = (state.textList || []).join("").trim();
      }

      if (text && state.rule) {
        const content = convertPrimitive(text, state.rule);

        if (state.rule?.isPlainPrimitive) {
          item = content;
        } else {
          if (obj) {
            obj._ = content;
          }
        }
      }

      if (obj) {
        const thisAfter = getAttachmentMethod(state, bTree, "_after");
        if (thisAfter) {
          thisAfter.call(obj);
        }
      }

      state = state.parent;

      if (state && member && member.proxy) {
        if (item && state.item) {
          state.item[member.safeName] = item;
        }
        item = state.item;

        state = state.parent;
        member = member.proxy;
      }

      if (state && member) {
        const parent = state.item;

        if (parent) {
          if (member.max > 1) {
            // eslint-disable-next-line no-prototype-builtins
            if (!parent.hasOwnProperty(member.safeName)) {
              parent[member.safeName] = [];
            }
            parent[member.safeName].push(item);
          } else {
            parent[member.safeName] = item;
          }
        }
      }
    });

    xml.on("end", function () {
      resolve(rootState.item as HandlerInstance as Output);
    });

    xml.on("error", function (err: Error) {
      reject(err);
    });

    if (typeof stream == "string") {
      xml.write(stream as string);
      xml.end();
    } else {
      (stream as stream.Readable).pipe(xml);
    }
  }
}
