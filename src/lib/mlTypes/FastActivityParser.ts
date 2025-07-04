/**
 * Convert from XML to typescript without using schema information
 * it is using the same logic as in https://github.com/TobiasNickel/tXml
 * This will handle most case but not guaranteed that the result conforms to JSON schemas
 * Should be used only for Activities and Activities templates
 */
export function parse(S: string): Record<string, any> {
  let pos = 0;
  const keepComments = false;
  const keepWhitespace = false;

  const openBracket = "<";
  const openBracketCC = "<".charCodeAt(0);
  const closeBracket = ">";
  const closeBracketCC = ">".charCodeAt(0);
  const minusCC = "-".charCodeAt(0);
  const slashCC = "/".charCodeAt(0);
  const exclamationCC = "!".charCodeAt(0);
  const singleQuoteCC = "'".charCodeAt(0);
  const doubleQuoteCC = '"'.charCodeAt(0);
  const openCornerBracketCC = "[".charCodeAt(0);
  const closeCornerBracketCC = "]".charCodeAt(0);
  const entities = {
    apos: { regex: /&(apos|#39|#x27);/g, val: "'" },
    gt: { regex: /&(gt|#62|#x3E);/g, val: ">" },
    lt: { regex: /&(lt|#60|#x3C);/g, val: "<" },
    quot: { regex: /&(quot|#34|#x22);/g, val: '"' },
    amp: { regex: /&(amp|#38|#x26);/g, val: "&" }
  };
  /**
   * parsing a list of entries
   */
  function parseChildren(tagName: string) {
    const children: any = [];
    while (S[pos]) {
      if (S.charCodeAt(pos) === openBracketCC) {
        if (S.charCodeAt(pos + 1) === slashCC) {
          const closeStart = pos + 2;
          pos = S.indexOf(closeBracket, pos);

          const closeTag = S.substring(closeStart, pos);
          if (closeTag.indexOf(tagName) === -1) {
            const parsedText = S.substring(0, pos).split("\n");
            throw new Error(
              "Unexpected close tag\nLine: " +
                (parsedText.length - 1) +
                "\nColumn: " +
                (parsedText[parsedText.length - 1].length + 1) +
                "\nChar: " +
                S[pos]
            );
          }

          if (pos + 1) {
            pos += 1;
          }

          return children;
        } else if (S.charCodeAt(pos + 1) === exclamationCC) {
          if (S.charCodeAt(pos + 2) === minusCC) {
            //comment support
            const startCommentPos = pos;
            while (
              pos !== -1 &&
              !(
                S.charCodeAt(pos) === closeBracketCC &&
                S.charCodeAt(pos - 1) === minusCC &&
                S.charCodeAt(pos - 2) === minusCC &&
                pos !== -1
              )
            ) {
              pos = S.indexOf(closeBracket, pos + 1);
            }
            if (pos === -1) {
              pos = S.length;
            }
            if (keepComments) {
              children.push(S.substring(startCommentPos, pos + 1));
            }
          } else if (
            S.charCodeAt(pos + 2) === openCornerBracketCC &&
            S.charCodeAt(pos + 8) === openCornerBracketCC &&
            S.substr(pos + 3, 5).toLowerCase() === "cdata"
          ) {
            // cdata
            const cdataEndIndex = S.indexOf("]]>", pos);
            if (cdataEndIndex === -1) {
              children.push(S.substr(pos + 9));
              pos = S.length;
            } else {
              children.push(S.substring(pos + 9, cdataEndIndex));
              pos = cdataEndIndex + 3;
            }
            continue;
          } else {
            // doctypesupport
            const startDoctype = pos + 1;
            pos += 2;
            let encapsuled = false;
            while (
              (S.charCodeAt(pos) !== closeBracketCC || encapsuled === true) &&
              S[pos]
            ) {
              if (S.charCodeAt(pos) === openCornerBracketCC) {
                encapsuled = true;
              } else if (
                encapsuled === true &&
                S.charCodeAt(pos) === closeCornerBracketCC
              ) {
                encapsuled = false;
              }
              pos++;
            }
            children.push(S.substring(startDoctype, pos));
          }
          pos++;
          continue;
        }
        const node = parseNode();
        children.push(node);
        if (node.tagName[0] === "?") {
          children.push(...node.children);
          node.children = [];
        }
      } else {
        const text = parseText();
        if (keepWhitespace) {
          if (text.length > 0) {
            children.push(text);
          }
        } else {
          const trimmed = text.trim();
          if (trimmed.length > 0) {
            children.push(trimmed);
          }
        }
        pos++;
      }
    }
    return children;
  }

  /**
   *    returns the text outside of texts until the first '<'
   */
  function parseText() {
    const start = pos;
    pos = S.indexOf(openBracket, pos) - 1;
    if (pos === -2) {
      pos = S.length;
    }
    return S.slice(start, pos + 1);
  }
  /**
   *    returns text until the first nonAlphabetic letter
   */
  const nameSpacer = "\r\n\t>/= ";

  function parseName() {
    const start = pos;
    while (nameSpacer.indexOf(S[pos]) === -1 && S[pos]) {
      pos++;
    }
    return S.slice(start, pos);
  }

  function parseNode() {
    pos++;
    const tagName = parseName();
    const attributes: Record<string, any> = {};
    let children: any = [];

    // parsing attributes
    while (S.charCodeAt(pos) !== closeBracketCC && S[pos]) {
      const c = S.charCodeAt(pos);
      if ((c > 64 && c < 91) || (c > 96 && c < 123)) {
        //if('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(S[pos])!==-1 ){
        const name = parseName();
        // search beginning of the string
        let code = S.charCodeAt(pos);
        while (
          code &&
          code !== singleQuoteCC &&
          code !== doubleQuoteCC &&
          !((code > 64 && code < 91) || (code > 96 && code < 123)) &&
          code !== closeBracketCC
        ) {
          pos++;
          code = S.charCodeAt(pos);
        }
        let value: string | null = null;
        if (code === singleQuoteCC || code === doubleQuoteCC) {
          value = parseString();
          if (pos === -1) {
            return {
              tagName,
              attributes,
              children
            };
          }
        } else {
          pos--;
        }
        attributes[name] = value;
      }
      pos++;
    }
    // optional parsing of children
    if (S.charCodeAt(pos - 1) !== slashCC) {
      pos++;
      children = parseChildren(tagName);
    } else {
      pos++;
    }
    return {
      tagName,
      attributes,
      children
    };
  }

  /**
   *    is parsing a string, that starts with a char and with the same usually  ' or "
   */

  function parseString() {
    const startChar = S[pos];
    const startpos = pos + 1;
    pos = S.indexOf(startChar, startpos);
    return S.slice(startpos, pos);
  }

  //format the value to the correct type
  function formatValue(textValue: string, key: string, type: string) {
    //first make sure to remove special html characters before analysing and converting the value
    if (textValue.includes("&")) {
      const entityNames = Object.keys(entities) as Array<keyof typeof entities>;
      for (const entityName of entityNames) {
        const entity = entities[entityName];
        textValue = textValue.replace(entity.regex, entity.val);
      }
    }
    //keep it as string if type is explicitly set to string
    if (
      type === "xsd:string" ||
      [
        "eml:DescriptionString",
        "eml2:DescriptionString",
        "eml20:DescriptionString"
      ].includes(type)
    ) {
      return textValue;
    }
    //convert to bool
    //template files tags do not have any type attribute so also need to check the specifics keys we know must be booleans...
    if (["IsInput", "IsOutput"].includes(key) || type === "xsd:boolean") {
      if (textValue === "true") {
        return true;
      } else if (textValue === "false") {
        return false;
      }
    }
    //convert to number
    const num = Number(textValue);
    if (!Number.isNaN(num)) {
      return num;
    }
    //convert to date
    //template files tags do not have any type attribute so we also need to check the value...
    if (
      type === "xsd:dateTime" ||
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(?:Z|(\+|-)([\d|:]*))?$/.exec(
        textValue
      )
    ) {
      return new Date(textValue);
    }
    //else keep it as a string
    return textValue;
  }

  /**
   * transform the typeless object to something that is equivalemnt to the expected schema object
   *
   */
  function improve(
    children: Record<string, any>,
    nameSpaces = ["resqml20", "eml20", "resqml2", "eml2", "eml", "xsi"],
    tagName = "",
    type = ""
  ): any {
    const out: Record<string, any> = {};
    if (!children.length) {
      return "";
    }

    if (children.length === 1 && typeof children[0] == "string") {
      return formatValue(children[0], tagName, type);
    }
    // map each object
    children.forEach(function (child: any) {
      if (typeof child !== "object") {
        return;
      }

      let tagName: string = child.tagName;
      const valueType: string = child?.attributes?.["xsi:type"] ?? "";
      if (tagName.includes(":")) {
        for (const nameSpace of nameSpaces) {
          if (tagName.includes(nameSpace + ":")) {
            tagName = tagName.replace(nameSpace + ":", "");
            break;
          }
        }
      }
      if (!out[tagName]) {
        out[tagName] = [];
      }
      const kids: any = improve(child.children, nameSpaces, tagName, valueType);
      out[tagName].push(kids);
      if (Object.keys(child.attributes).length && typeof kids !== "string") {
        for (const attributeKey in child.attributes) {
          if (!attributeKey.startsWith("xmlns:")) {
            let attributeKeywithoutNS = attributeKey;
            if (attributeKeywithoutNS.includes(":")) {
              for (const nameSpace of nameSpaces) {
                if (attributeKeywithoutNS.startsWith(nameSpace + ":")) {
                  attributeKeywithoutNS = attributeKeywithoutNS.replace(
                    nameSpace + ":",
                    ""
                  );
                  break;
                }
              }
            }
            if (attributeKeywithoutNS === "type") {
              const type = child.attributes[attributeKey].split(":");
              if (type.length === 2) {
                if (type[0].startsWith("eml")) {
                  type[0] = "eml20";
                  kids["$" + attributeKeywithoutNS] = type.join(".");
                } else if (type[0].startsWith("resqml")) {
                  type[0] = "resqml20";
                  kids["$" + attributeKeywithoutNS] = type.join(".");
                }
              }
            } else {
              const attributePascalCased =
                attributeKeywithoutNS.charAt(0).toUpperCase() +
                attributeKeywithoutNS.slice(1);
              kids[attributePascalCased] = child.attributes[attributeKey];
            }
          }
        }
      }
    });
    //if there is only one children change type from list to plain object
    //unless we really want a list like for example for Parameter
    for (const i in out) {
      if (
        out[i].length === 1 &&
        ![
          "Parameter",
          "ExtraMetadata",
          "AllowedKind",
          "KeyConstraint",
          "Key"
        ].includes(i)
      ) {
        out[i] = out[i][0];
      }
    }

    return out;
  }

  const out = parseChildren("");
  const simplified = improve(Array.isArray(out) ? out : [out]);
  return Object.values(simplified)[0] as any;
}
