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

import {
  AvroString,
  Bytes,
  Double,
  Energistics,
  Float,
  Integer32,
  Integer64
} from "./Etp12";

/** Type representing an ETP resource */
export type Resource = Energistics.Etp.v12.Datatypes.Object.Resource;
export type SupportedType = Energistics.Etp.v12.Datatypes.Object.SupportedType;

/** Map of data arrays, uri => data array */
export type DataObject = Energistics.Etp.v12.Datatypes.Object.DataObject;
export type DataArray = Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray;
export type Dataspace = Energistics.Etp.v12.Datatypes.Object.Dataspace;
export type DataValue = Energistics.Etp.v12.Datatypes.DataValue;

export type ErrorInfo = Energistics.Etp.v12.Datatypes.ErrorInfo;

export interface IArrayId {
  /**
   * @pattern ^(?:eml:\/\/\/|^eml:\/\/\/dataspace\('[^'"]*?(?:''[^'"]*?)*'\)\/?)(witsml|resqml|prodml|eml)[1-9]\d\.\w+(?:\((?:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}|uuid=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12},version='[^']*?(?:''[^']*?)*')\))?$
   * @maxLength 2048
   */
  uri: string;
  /**
   * @pattern * @pattern ^.*$
   * @maxLength 2048
   */
  pathInResource: string;
}

/** Type representing a data array description */
export interface IDataArrayMetadata {
  uid: IArrayId;
  /**
   * @description number of items in each dimension
   * @maxItems 10
   */
  dimensions?: Integer32[];
  preferredSubarrayDimensions?: Integer32[];
  logicalArrayType?: Energistics.Etp.v12.Datatypes.AnyLogicalArrayType;
  transportArrayType?: Energistics.Etp.v12.Datatypes.AnyArrayType;
  storeLastWrite?: Date;
  storeCreated?: Date;
  customData?: Map<AvroString, Energistics.Etp.v12.Datatypes.DataValue>;
  error?: ErrorInfo;
}

/** Type representing a data array */
export interface IDataArray extends IDataArrayMetadata {
  data?: Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray;
}

/** Type representing a data sub array */
export interface IDataSubarray {
  uid: IArrayId;
  data?:
    | Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray
    | ErrorInfo
    | null;
  /**
   * @description index of first item in each dimension
   * @maxItems 10
   */
  starts: Integer32[];
  /**
   * @description number of items in each dimension
   * @maxItems 10
   */
  counts: Integer32[];
  error?: ErrorInfo;
}

/** Type representing the transformation and resolution options from XML to JS */
export interface IOptions {
  collapseTextElement: boolean;
  removeNamespace: boolean;
}

export type DataQueryOperator =
  | "eq"
  | "ne"
  | "gt"
  | "lt"
  | "ge"
  | "le"
  | "and"
  | "or";

/**
 * Boolean operators
 *
 * @export
 * @interface ComparisonQueryValue
 */
export interface ComparisonQueryValue {
  type: "and" | "or";
  left: DataQueryValue;
  right: DataQueryValue;
}

/**
 * JSON property descriptor
 *
 * @export
 * @interface QueryProperty
 */
export interface QueryProperty {
  type: "property";
  name: string;
}

/**
 * JSON literal descriptor
 *
 * @export
 * @interface QueryLiteral
 */
export interface QueryLiteral {
  type: "literal";
  value: string | number;
}

type StringUnionType =
  | "startswith"
  | "endswith"
  | "indexof"
  | "substringof"
  | "contains"
  | "concat"
  | "tolower"
  | "toupper"
  | "trim"
  | "length";
export interface QueryFunction {
  type: "functioncall";
  func: StringUnionType;
  args: DataQueryValue[];
}

export type DataQueryValue =
  | ComparisonQueryValue
  | QueryProperty
  | QueryLiteral
  | QueryFunction;

export interface IDataQuery {
  left: DataQueryValue;
  type: DataQueryOperator;
  right: DataQueryValue;
}

export enum ErrorCode {
  IS_OK = 0,
  ENOROLE,
  ENOSUPPORTEDPROTOCOLS,
  EINVALID_MESSAGETYPE,
  EUNSUPPORTED_PROTOCOL,
  EINVALID_ARGUMENT,
  EREQUEST_DENIED,
  ENOTSUPPORTED,
  EINVALID_STATE,
  EINVALID_URI,
  EEXPIRED_TOKEN,
  ENOT_FOUND,
  ELIMIT_EXCEEDED,
  ECOMPRESSION_NOTSUPPORTED,
  EINVALID_OBJECT,
  EMAX_TRANSACTIONS_EXCEEDED,
  ECONTENT_TYPE_NOTSUPPORTED,
  EMAXSIZE_EXCEEDED,
  EMULTIPART_CANCELLED,
  EINVALID_MESSAGE,
  EINVALID_INDEXKIND,
  ENOSUPPORTEDFORMATS,
  EREQUESTUUID_REJECTED,
  EUPDATEGROWINGOBJECT_DENIED,
  EINVALID_CHANNELID = 1002,
  EUNSUPPORTED_OBJECT = 4001,
  ENOCASCADE_DELETE = 4003,
  EPLURAL_OBJECT = 4004,
  EGROWING_PORTION_IGNORED = 4005,
  ERETENTION_PERIOD_EXCEEDED = 5001,
  ENOTGROWINGOBJECT = 6002
}

export enum MessageFlags {
  FINALPART = 2
}

type allArrayType =
  | Energistics.Etp.v12.Datatypes.ArrayOfBoolean
  | Energistics.Etp.v12.Datatypes.ArrayOfNullableBoolean
  | Energistics.Etp.v12.Datatypes.ArrayOfInt
  | Energistics.Etp.v12.Datatypes.ArrayOfNullableInt
  | Energistics.Etp.v12.Datatypes.ArrayOfLong
  | Energistics.Etp.v12.Datatypes.ArrayOfNullableLong
  | Energistics.Etp.v12.Datatypes.ArrayOfFloat
  | Energistics.Etp.v12.Datatypes.ArrayOfDouble
  | Energistics.Etp.v12.Datatypes.ArrayOfString
  | Energistics.Etp.v12.Datatypes.ArrayOfBytes;

export class EtpDataValue {
  /**
   * Create DataValue from boolean
   *
   * @static
   * @memberof EtpDataValue
   */
  static boolean = (
    value: boolean
  ): Energistics.Etp.v12.Datatypes.DataValue => {
    return {
      item: {
        _boolean: value,
        __keyName: "_boolean"
      }
    };
  };

  /**
   * Create DataValue storing 32 bit integer
   *
   * @static
   * @memberof EtpDataValue
   */
  static int = (value: Integer32): Energistics.Etp.v12.Datatypes.DataValue => {
    return {
      item: {
        _int: value,
        __keyName: "_int"
      }
    };
  };

  /**
   * Create DataValue storing 64 bit integer
   *
   * @static
   * @memberof EtpDataValue
   */
  static long = (value: Integer64): Energistics.Etp.v12.Datatypes.DataValue => {
    return {
      item: {
        _long: value,
        __keyName: "_long"
      }
    };
  };

  /**
   * Create DataValue storing float
   *
   * @static
   * @memberof EtpDataValue
   */
  static float = (value: Float): Energistics.Etp.v12.Datatypes.DataValue => {
    return {
      item: {
        _float: value,
        __keyName: "_float"
      }
    };
  };

  /**
   * Create DataValue storing double
   *
   * @static
   * @memberof EtpDataValue
   */
  static double = (value: Double): Energistics.Etp.v12.Datatypes.DataValue => {
    return {
      item: {
        _double: value,
        __keyName: "_double"
      }
    };
  };

  /**
   * Create DataValue storing string
   *
   * @static
   * @memberof EtpDataValue
   */
  static avroString = (
    value: AvroString
  ): Energistics.Etp.v12.Datatypes.DataValue => {
    return {
      item: {
        _string: value,
        __keyName: "_string"
      }
    };
  };

  /**
   * Create DataValue storing an array
   *
   * @static
   * @memberof EtpDataValue
   */
  static array = (
    value: allArrayType
  ): Energistics.Etp.v12.Datatypes.DataValue => {
    if (value instanceof Energistics.Etp.v12.Datatypes.ArrayOfBoolean) {
      return {
        item: {
          _ArrayOfBoolean: value,
          __keyName: "_ArrayOfBoolean"
        }
      };
    } else if (
      value instanceof Energistics.Etp.v12.Datatypes.ArrayOfNullableBoolean
    ) {
      return {
        item: {
          _ArrayOfNullableBoolean: value,
          __keyName: "_ArrayOfNullableBoolean"
        }
      };
    } else if (value instanceof Energistics.Etp.v12.Datatypes.ArrayOfInt) {
      return {
        item: {
          _ArrayOfInt: value,
          __keyName: "_ArrayOfInt"
        }
      };
    } else if (
      value instanceof Energistics.Etp.v12.Datatypes.ArrayOfNullableInt
    ) {
      return {
        item: {
          _ArrayOfNullableInt: value,
          __keyName: "_ArrayOfNullableInt"
        }
      };
    } else if (value instanceof Energistics.Etp.v12.Datatypes.ArrayOfLong) {
      return {
        item: {
          _ArrayOfLong: value,
          __keyName: "_ArrayOfLong"
        }
      };
    } else if (
      value instanceof Energistics.Etp.v12.Datatypes.ArrayOfNullableLong
    ) {
      return {
        item: {
          _ArrayOfNullableLong: value,
          __keyName: "_ArrayOfNullableLong"
        }
      };
    } else if (value instanceof Energistics.Etp.v12.Datatypes.ArrayOfFloat) {
      return {
        item: {
          _ArrayOfFloat: value,
          __keyName: "_ArrayOfFloat"
        }
      };
    } else if (value instanceof Energistics.Etp.v12.Datatypes.ArrayOfDouble) {
      return {
        item: {
          _ArrayOfDouble: value,
          __keyName: "_ArrayOfDouble"
        }
      };
    } else if (value instanceof Energistics.Etp.v12.Datatypes.ArrayOfString) {
      return {
        item: {
          _ArrayOfString: value,
          __keyName: "_ArrayOfString"
        }
      };
    } else {
      return {
        item: {
          _ArrayOfBytes: value,
          __keyName: "_ArrayOfBytes"
        }
      };
    }
  };

  /**
   * Create DataValue storing an bytes
   *
   * @static
   * @memberof EtpDataValue
   */
  static bytes = (value: Bytes): Energistics.Etp.v12.Datatypes.DataValue => {
    return {
      item: {
        _bytes: value,
        __keyName: "_bytes"
      }
    };
  };

  /**
   * Create DataValue storing a sparse array
   *
   * @static
   * @memberof EtpDataValue
   */
  static sparseArray = (
    value: Energistics.Etp.v12.Datatypes.AnySparseArray
  ): Energistics.Etp.v12.Datatypes.DataValue => {
    return {
      item: {
        _AnySparseArray: value,
        __keyName: "_AnySparseArray"
      }
    };
  };

  static toBoolean(
    dv: Energistics.Etp.v12.Datatypes.DataValue
  ): boolean | undefined {
    if (dv.item?.__keyName !== "_boolean") {
      return undefined;
    }
    return dv.item["_boolean"];
  }

  /**
   * Return the value if its a number (int,float,double), else undefined
   *
   * @static
   * @param {Energistics.Etp.v12.Datatypes.DataValue} dv
   * @returns {(number | undefined)}
   * @memberof EtpDataValue
   */
  static toNumber(
    dv: Energistics.Etp.v12.Datatypes.DataValue
  ): number | undefined {
    if (dv.item?.__keyName === "_int") {
      return dv.item._int;
    } else if (dv.item?.__keyName === "_float") {
      return dv.item._float;
    } else if (dv.item?.__keyName === "_double") {
      return dv.item._double;
    }
    return undefined;
  }

  /**
   * Return the value if its a bigint (long), else undefined
   *
   * @static
   * @param {Energistics.Etp.v12.Datatypes.DataValue} dv
   * @returns {(bigint | undefined)}
   * @memberof EtpDataValue
   */
  static toBigInt(
    dv: Energistics.Etp.v12.Datatypes.DataValue
  ): bigint | undefined {
    if (dv.item?.__keyName === "_long") {
      return dv.item._long;
    }
    return undefined;
  }

  /**
   * Return the value if its a string, else undefined
   *
   * @static
   * @param {Energistics.Etp.v12.Datatypes.DataValue} dv
   * @returns {(bigint | undefined)}
   * @memberof EtpDataValue
   */
  static toAvroString(
    dv: Energistics.Etp.v12.Datatypes.DataValue
  ): string | undefined {
    if (dv.item?.__keyName === "_string") {
      return dv.item._string;
    }
    return undefined;
  }

  /**
   * Return the value if its an array, else undefined
   *
   * @static
   * @param {Energistics.Etp.v12.Datatypes.DataValue} dv
   * @returns {(bigint | undefined)}
   * @memberof EtpDataValue
   */
  static toArray(
    dv: Energistics.Etp.v12.Datatypes.DataValue
  ): any[] | undefined {
    if (!dv.item?.__keyName.startsWith("_Array")) {
      return undefined;
    }
    const a: allArrayType | undefined = dv.item[
      dv.item.__keyName
    ] as allArrayType;
    return a && Array.isArray(a.values) ? a.values : undefined;
  }

  /**
   * Return the value if its an array of bytes, else undefined
   *
   * @static
   * @param {Energistics.Etp.v12.Datatypes.DataValue} dv
   * @returns {(bigint | undefined)}
   * @memberof EtpDataValue
   */
  static toBytes(
    dv: Energistics.Etp.v12.Datatypes.DataValue
  ): Bytes | undefined {
    if (dv.item?.__keyName === "_bytes") {
      return dv.item._bytes;
    }
    return undefined;
  }
}
