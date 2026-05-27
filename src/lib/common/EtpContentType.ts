// ============================================================================
// Copyright 2019-2022 Emerson Paradigm Holding LLC. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ============================================================================

import { EtpQualifiedType } from "./EtpQualifiedType";

/**
 * Parse a standard content type for an energistics data object.
 *
 * @export
 * @class EtpContentType
 */
export class EtpContentType {
  private readonly _m: RegExpMatchArray | null;

  /**
   * Create a new content type from individual elements
   *
   * @static
   * @param {string} domainFamily
   * @param {string} domainVersion
   * @param {string} objectType
   * @returns
   * @memberof EtpContentType
   */
  public static createContentType(
    domainFamily: string,
    domainVersion: string,
    objectType: string
  ): string {
    if (!domainVersion.includes(".") && domainVersion.length > 1) {
      domainVersion = domainVersion.split("").join(".");
    }
    return `application/x-${domainFamily}+xml;version=${domainVersion};type=${objectType}`;
  }

  constructor(contentType: string) {
    this._m = contentType
      ? contentType.match(
          /^application\/x-(?<domainFamily>resqml|eml|witsml|prodml)\+xml;version=(?<domainVersion>[.\d]+);type=(?<dataType>[\w]+)$/i
        )
      : null;
  }

  /**
   * All of the versions prior to 2.0 have the plural root, except Resqml.
   *
   * @readonly
   * @type {boolean}
   * @memberof EtpContentType
   */
  get hasPlural(): boolean {
    return this.domainVersion
      ? this.domainVersion[0] === "1" && this.domainFamily !== "resqml"
      : false;
  }

  /**
   * Return the domain family
   *
   * @readonly
   * @type {string} values: "resqml","eml","witsml","prodml"
   * @memberof EtpContentType
   */
  get domainFamily(): string {
    return this._m?.groups?.domainFamily || "";
  }

  /**
   * Return the domain version, example 2.0
   *
   * @readonly
   * @type {string}
   * @memberof EtpContentType
   */
  get domainVersion(): string {
    return this._m?.groups?.domainVersion || "";
  }

  /**
   * Return the object data type
   *
   * @readonly
   * @type {string}
   * @memberof EtpContentType
   */
  get dataType(): string {
    return this._m?.groups?.dataType || "";
  }

  /**
   * Return the plural name for the datatype (WITSML use)
   *
   * @readonly
   * @type {string}
   * @memberof EtpContentType
   */
  get pluralName(): string {
    return this.dataType ? `${this.dataType.substr(4)}s` : "";
  }

  /**
   * Return the singular name for the datatype (WITSML use)
   *
   * @readonly
   * @type {string}
   * @memberof EtpContentType
   */
  get singularName(): string {
    return this.dataType ? this.dataType.substr(4) : "";
  }

  /**
   * Return if parsing successful
   *
   * @readonly
   * @type {boolean}
   * @memberof EtpContentType
   */
  get valid(): boolean {
    return this._m != null;
  }

  /**
   * Get the input content type
   *
   * @readonly
   * @type {string}
   * @memberof EtpContentType
   */
  get contentType(): string {
    return this._m?.input || "";
  }

  /**
   * Build the Etp Type corresponding to this contentType
   *
   * @readonly
   * @type {string}
   * @memberof EtpContentType
   */
  get etpType(): string {
    if (!this.valid) return "";
    const v = this.domainVersion.split(".");
    if (v.length < 2) return "";
    return `${this.domainFamily}${v[0]}${v[1]}.${this.dataType}`;
  }

  /**
   * Build the Etp QualifiedType corresponding to this contentType
   *
   * @readonly
   * @type {EtpQualifiedType}
   * @memberof EtpContentType
   */
  get qualifiedType(): EtpQualifiedType {
    return new EtpQualifiedType(this.etpType);
  }
}
