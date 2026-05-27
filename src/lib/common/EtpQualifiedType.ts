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

export const qualifiedTypeRegex = RegExp(
  /^(?<domainFamily>resqml|eml|witsml|prodml)(?<domainVersion>\d+)\.(?<dataType>\w+)$/i
);

/**
 * Parse a standard qualified type for an energistics data object.
 *
 * @export
 * @class EtpQualifiedType
 */
export class EtpQualifiedType {
  private readonly _m: RegExpMatchArray | null;

  /**
   * Create a new qualified type from individual elements
   *
   * @static
   * @param {string} domainFamily
   * @param {string} domainVersion
   * @param {string} objectType
   * @returns
   * @memberof EtpQualifiedType
   */
  public static createQualifiedType(
    domainFamily: string,
    domainVersion: string,
    objectType: string
  ): string {
    if (domainVersion.includes(".")) {
      domainVersion = domainVersion.split(".").join("");
    }
    return `${domainFamily}${domainVersion}.${objectType}`;
  }

  constructor(qualifiedType: string) {
    this._m = qualifiedType ? qualifiedTypeRegex.exec(qualifiedType) : null;
  }

  /**
   * All of the versions prior to 2.0 have the plural root, except Resqml.
   *
   * @readonly
   * @type {boolean}
   * @memberof EtpQualifiedType
   */
  get hasPlural(): boolean {
    return this.domainVersion
      ? this.domainVersion.startsWith("1") && this.domainFamily !== "resqml"
      : false;
  }

  /**
   * Return the domain family
   *
   * @readonly
   * @type {string} values: "resqml","eml","witsml","prodml"
   * @memberof EtpQualifiedType
   */
  get domainFamily(): string {
    return this._m?.groups?.domainFamily ?? "";
  }

  /**
   * Return the domain version, example 2.0
   *
   * @readonly
   * @type {string}
   * @memberof EtpQualifiedType
   */
  get domainVersion(): string {
    return this._m?.groups?.domainVersion.split("").join(".") ?? "";
  }

  /**
   * Return the object data type
   *
   * @readonly
   * @type {string}
   * @memberof EtpQualifiedType
   */
  get dataType(): string {
    return this._m?.groups?.dataType ?? "";
  }

  /**
   * Return the plural name for the datatype (WITSML use)
   *
   * @readonly
   * @type {string}
   * @memberof EtpQualifiedType
   */
  get pluralName(): string {
    return this.dataType ? `${this.dataType.slice(4)}s` : "";
  }

  /**
   * Return the singular name for the datatype (WITSML use)
   *
   * @readonly
   * @type {string}
   * @memberof EtpQualifiedType
   */
  get singularName(): string {
    return this.dataType ? this.dataType.slice(4) : "";
  }

  /**
   * Return if parsing successful
   *
   * @readonly
   * @type {boolean}
   * @memberof EtpQualifiedType
   */
  get valid(): boolean {
    return this._m != null;
  }

  /**
   * Get the input type
   *
   * @readonly
   * @type {string}
   * @memberof EtpQualifiedType
   */
  get qualifiedType(): string {
    return this._m?.input ?? "";
  }

  /**
   * Build the content Type corresponding to this qualifiedType
   *
   * @readonly
   * @type {string}
   * @memberof EtpQualifiedType
   */
  get contentType(): string {
    return `application/x-${this.domainFamily}+xml;version=${this.domainVersion};type=${this.dataType}`;
  }
}
