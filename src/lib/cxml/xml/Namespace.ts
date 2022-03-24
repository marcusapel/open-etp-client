// This file is part of cxml, copyright (c) 2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import { Context } from "./Context";
import { MemberSpec } from "./MemberSpec";
import { NamespaceBase } from "./NamespaceBase";
import { TypeSpec } from "./TypeSpec";

export interface ModuleExports {
  [name: string]: any;
  _cxml: [Namespace];
}

export interface ImportContent {
  typeTbl: { [key: string]: TypeSpec };
  memberTbl: { [key: string]: MemberSpec };
}

/** Tuple: module exports object, list of imported type names */
export type ImportSpec = [ModuleExports, string[], string[]];

export class Namespace extends NamespaceBase<Context> {
  init(importSpecList: ImportSpec[]) {
    this.importSpecList = importSpecList;

    // Separately defined document type is number 0.
    let importTypeOffset = 1;
    // Member number 0 is skipped.
    let importMemberOffset = 1;

    for (const importSpec of importSpecList) {
      importTypeOffset += importSpec[1].length;
      importMemberOffset += importSpec[2].length;
    }

    this.typeSpecList.length = importTypeOffset;
    this.memberSpecList.length = importMemberOffset;
    return this;
  }

  addType(spec: TypeSpec) {
    if (this.doc) {
      this.typeSpecList.push(spec);
    } else {
      // First type added after imports is number 0, the document type.
      this.doc = spec;
    }

    if (spec.safeName) {
      this.exportTypeTbl[spec.safeName] = spec;
    }
    if (!spec.namespace) {
      spec.namespace = this;
    }
  }

  addMember(spec: MemberSpec) {
    this.memberSpecList.push(spec);

    if (spec.name) {
      this.exportMemberTbl[spec.name] = spec;
    }
    if (!spec.namespace) {
      spec.namespace = this;
    }
  }

  typeByNum(num: number) {
    return this.typeSpecList[num];
  }

  memberByNum(num: number) {
    return this.memberSpecList[num];
  }

  link() {
    // Skip the document type.
    let typeNum = 1;
    let memberNum = 1;

    for (const importSpec of this.importSpecList) {
      const other = importSpec[0]._cxml[0];

      this.importNamespaceList.push(other);

      for (const typeName of importSpec[1]) {
        this.typeSpecList[typeNum++] = other.exportTypeTbl[typeName];
      }

      for (const memberName of importSpec[2]) {
        this.memberSpecList[memberNum++] = other.exportMemberTbl[memberName];
      }
    }

    this.exportOffset = typeNum;

    const typeSpecList = this.typeSpecList;
    const typeCount = typeSpecList.length;

    while (typeNum < typeCount) {
      typeSpecList[typeNum++].resolveDependency(typeSpecList);
    }

    const memberSpecList = this.memberSpecList;
    const memberCount = memberSpecList.length;

    while (memberNum < memberCount) {
      memberSpecList[memberNum++].resolveDependency(memberSpecList);
    }
  }

  exportTypes(exports: ModuleExports) {
    const typeSpecList = this.typeSpecList;
    const typeCount = typeSpecList.length;

    for (let typeNum = this.exportOffset; typeNum < typeCount; ++typeNum) {
      const typeSpec = typeSpecList[typeNum];

      exports[typeSpec.safeName] = typeSpec.getProto();
    }
  }

  exportDocument(exports: ModuleExports) {
    exports["document"] = this.doc.getProto().prototype;
  }

  /** Get an internally used arbitrary prefix for fully qualified names
   * in this namespace. */

  getPrefix() {
    return this.id + ":";
  }

  /** Invisible document element defining the types of XML file root elements. */
  doc!: TypeSpec;

  importSpecList!: ImportSpec[];
  importNamespaceList: Namespace[] = [];
  exportTypeNameList!: string[];
  /** All types used in the document. */
  typeSpecList: TypeSpec[] = [];
  /** All members used in the document. */
  memberSpecList: MemberSpec[] = [];
  exportOffset!: number;

  exportTypeTbl: { [name: string]: TypeSpec } = {};
  exportMemberTbl: { [name: string]: MemberSpec } = {};
}
