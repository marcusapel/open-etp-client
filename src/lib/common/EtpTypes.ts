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
export type DeletedResource =
  Energistics.Etp.v12.Datatypes.Object.DeletedResource;
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
  ENOROLE = 1,
  ENOSUPPORTEDPROTOCOLS = 2,
  EINVALID_MESSAGETYPE = 3,
  EUNSUPPORTED_PROTOCOL = 4,
  EINVALID_ARGUMENT = 5,
  EREQUEST_DENIED = 6,
  ENOTSUPPORTED = 7,
  EINVALID_STATE = 8,
  EINVALID_URI = 9,
  EAUTHORIZATION_EXPIRED = 10,
  ENOT_FOUND = 11,
  ELIMIT_EXCEEDED = 12,
  ECOMPRESSION_NOTSUPPORTED = 13,
  EINVALID_OBJECT = 14,
  EMAX_TRANSACTIONS_EXCEEDED = 15,
  EDATAOBJECTTYPE_NOTSUPPORTED = 16,
  EMAXSIZE_EXCEEDED = 17,
  EMULTIPART_CANCELLED = 18,
  EINVALID_MESSAGE = 19,
  EINVALID_INDEXKIND = 20,
  ENOSUPPORTEDFORMATS = 21,
  EREQUESTUUID_REJECTED = 22,
  EUPDATEGROWINGOBJECT_DENIED = 23,
  EBACKPRESSURE_LIMIT_EXCEEDED = 24,
  EBACKPRESSURE_WARNING = 25,
  ETIMED_OUT = 26,
  EAUTHORIZATION_REQUIRED = 27,
  EAUTHORIZATION_EXPIRING = 28,
  ENOSUPPORTEDDATAOBJECTTYPES = 29,

  EINVALID_CHANNELID = 1002,
  ENOCASCADE_DELETE = 4003,
  EPLURAL_OBJECT = 4004,
  ERETENTION_PERIOD_EXCEEDED = 5001,
  ENOTGROWINGOBJECT = 6001
}

/**
 * Represents an ETP error, including the error code and message
 *
 * @export
 * @class EtpError
 * @extends {Error}
 */
export class EtpError extends Error {
  code: ErrorCode;
  constructor(message: string, code: ErrorCode) {
    super(message);
    this.code = code;
  }
}

/**
 * Convert a ProtocolException to an EtpError
 * @param ex ProtocolException
 * @returns EtpError with the error code and message
 */
export const errorFromProtocolException = (
  ex: Energistics.Etp.v12.Protocol.Core.ProtocolException
): EtpError => {
  if (ex.error) {
    return new EtpError(ex.error.message, ex.error.code);
  }
  if (ex.errors && ex.errors.size > 0) {
    const message = Array.from(ex.errors.values()).reduce(
      (p, c) => p + (p.length > 0 ? ", " : "") + c.message,
      ""
    );
    const code = Array.from(ex.errors.values())[0].code;
    return new EtpError(message, code);
  }
  return new EtpError("Unknwon Error", ErrorCode.EINVALID_STATE);
};

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
