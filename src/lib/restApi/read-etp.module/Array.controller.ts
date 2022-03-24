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

/* eslint-disable no-console */

import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
  ApiQuery,
  ApiQueryOptions,
  ApiTags,
  ApiTooManyRequestsResponse
} from "@nestjs/swagger";

import {
  Energistics,
  IArrayId,
  IDataArray,
  IDataArrayMetadata
} from "../../client/ResqmlClient";

import { Integer32 } from "../../common/Etp12";

import { Type } from "class-transformer";

import { IsDate, IsUUID, Matches, MaxLength } from "class-validator";

import {
  alphaSpaceSchema,
  createSession,
  errorMessageSchema,
  extractToken,
  getSchemasForType,
  HasBearerGuard,
  OptionalParseIntArrayPipe,
  patternString,
  swaggerServers,
  toJSonCustomData
} from "../ControllerUtils";

import {
  dataObjectTypePattern,
  FindInDataSpaceParams,
  FindInObjectParams,
  uriPattern,
  uuidPattern,
  versionQueryParam
} from "./Resource.controller";

import { EtpUri } from "../../common/EtpUri";

import express from "express";

/**
 * @description Component of an URI
 * @pattern ^(\/?[\w\-]+)+$
 * @maxLength 2048
 */
export type ArrayPath = string;

export const arrayPathPattern = /^(\/?[\w-]+)+$/;

/**
 * @example 1
 * @isInt
 * @format int32
 * @minimum 0
 * @maximum 10000000
 */
export type Index32 = number;

export type AnyTypedArrayString =
  | "string"
  | "Uint8Array"
  | "Int8Array"
  | "Int16Array"
  | "Uint16Array"
  | "Int32Array"
  | "Uint32Array"
  | "Uint8ClampedArray"
  | "Float32Array"
  | "Float64Array"
  | "BigInt64Array"
  | "BigUint64Array";

export const arrayTypeString: AnyTypedArrayString[] = [
  "Int8Array",
  "Int8Array",
  "Uint8Array",
  "Int16Array",
  "Int32Array",
  "BigInt64Array",
  "Uint16Array",
  "Uint32Array",
  "BigUint64Array",
  "Float32Array",
  "Float64Array"
];

const toArrayTypeString = (
  arrayType?: Energistics.Etp.v12.Datatypes.AnyLogicalArrayType
): AnyTypedArrayString | undefined => {
  if (arrayType === undefined) {
    return undefined;
  }

  return arrayType < arrayTypeString.length
    ? arrayTypeString[arrayType]
    : "string";
};

export class ArrayIdDto {
  @ApiProperty({
    name: "uri",
    pattern: patternString(uriPattern),
    example:
      "eml:///dataspace('demo%2FVolve')/eml20.obj_EpcExternalPartReference('53395ada-6f93-4bac-b506-d45997ded2a2')",
    description: "Uri of the array container.",
    maxLength: 2048
  })
  uri!: string;

  @ApiProperty({
    name: "pathInResource",
    pattern: patternString(arrayPathPattern),
    example: "/RESQML/a3f31b20-c93a-4682-8f6c-71be087202a4/points_patch0",
    description: "Identifier of the array inside the container.",
    maxLength: 2048
  })
  pathInResource!: string;
}

export class DataArrayMetadataDto {
  @ApiProperty({
    name: "uid",
    type: ArrayIdDto
  })
  uid!: IArrayId;

  @ApiPropertyOptional({
    name: "dimensions",
    type: "integer",
    format: "int32",
    isArray: true,
    maxItems: 1000,
    minimum: 1,
    maximum: 1000000
  })
  dimensions?: Integer32[];

  @ApiPropertyOptional({
    name: "preferredSubarrayDimensions",
    type: "integer",
    format: "int32",
    isArray: true,
    maxItems: 1000,
    minimum: 1,
    maximum: 1000000
  })
  preferredSubarrayDimensions?: Integer32[];

  @ApiPropertyOptional({
    name: "arrayType",
    enum: arrayTypeString
  })
  arrayType?: AnyTypedArrayString;

  @ApiPropertyOptional({
    name: "storeLastWrite",
    description: "Date of last write in store",
    example: "2021-09-06T16:06:31.000Z",
    maxLength: 2048
  })
  @Type(() => Date)
  @IsDate()
  storeLastWrite?: Date;

  @ApiPropertyOptional({
    name: "storeLastWrite",
    description: "Date of first write in store",
    example: "2021-09-06T16:06:31.000Z",
    maxLength: 2048
  })
  @Type(() => Date)
  @IsDate()
  storeCreated?: Date;

  @ApiProperty({
    name: "customData",
    type: "object",
    additionalProperties: alphaSpaceSchema
  })
  customData?: Record<string, string>;
}

export class DataArrayDataDto {
  @ApiPropertyOptional({
    name: "data",
    description: "Array content (as an array or its base64 representation).",
    additionalProperties: false,
    oneOf: [
      {
        type: "string"
      },
      {
        type: "array",
        maxItems: 100000000,
        items: {
          type: "number"
        }
      },
      {
        type: "array",
        maxItems: 100000000,
        items: {
          type: "boolean"
        }
      },
      {
        type: "array",
        maxItems: 100000000,
        items: {
          type: "string"
        }
      }
    ]
  })
  data?: ArrayOutput;

  @ApiPropertyOptional({
    name: "dimensions",
    description: "Number of items in each dimension",
    type: "integer",
    format: "int32",
    isArray: true,
    maxItems: 1000,
    minimum: 1,
    maximum: 1000000
  })
  dimensions?: Integer32[];
}

export class DataArrayDto {
  @ApiProperty({
    ...getSchemasForType(ArrayIdDto),
    required: true,
    name: "uid",
    additionalProperties: false
  })
  uid!: IArrayId;

  @ApiPropertyOptional({
    ...getSchemasForType(DataArrayDataDto),
    required: true,
    name: "data",
    additionalProperties: false
  })
  data?: DataArrayDataDto;
}

export interface DataArrayRest {
  uid: IArrayId;
  data: {
    /**
     * @description array content (as an array or its base64 representation)
     */
    data?: ArrayOutput;
    /**
     * @description number of items in each dimension
     * @maxItems 10
     */
    dimensions?: Integer32[];
  };
}

/**
 * @maxItems 10000
 */
type GetObjectDataArraysOutput = (DataArrayMetadataDto | null)[];

process.on("unhandledRejection", (error: Error) => {
  console.log("=== UNHANDLED REJECTION ===");
  console.dir(error.stack);
});

/**
 *
 * @param uri Get the metadata of all arrays contained by object
 * @param jwt token
 * @returns Promise<GetObjectDataArraysOutput>
 */

const getObjectDataArrays = async (
  uri: string,
  jwt: string
): Promise<GetObjectDataArraysOutput> => {
  const c = await createSession(jwt);
  const dataArrays = new Map<string, IDataArray>();
  return c
    .getObjectDataArrays(uri, dataArrays)
    .then(async () => {
      const arrays: (IDataArrayMetadata | null)[] = [];
      const arrayList = Array.from(dataArrays.values());
      let message = "";
      while (arrayList.length > 0) {
        // Limit concurrent requests to what server can handle
        const sp = arrayList.splice(0, c.messageQueueDepth());
        await Promise.all(
          sp.map(v => c.getDataArrayMetadata(v.uid.uri, v.uid.pathInResource))
        )
          .then(a => arrays.push(...a))
          .catch((err: string) => {
            message += (err ? err : "") + " ";
          });
      }
      if (message !== "") {
        throw new Error(message);
      }
      return arrays.filter(m => m != null);
    })
    .catch((err: any) => {
      throw err;
    })
    .then(arrays =>
      arrays.map(a =>
        a
          ? {
              uid: a.uid,
              dimensions: a.dimensions,
              arrayType: toArrayTypeString(a.logicalArrayType),
              preferredSubarrayDimensions: a.preferredSubarrayDimensions,
              storeLastWrite: a.storeLastWrite,
              storeCreated: a.storeCreated,
              customData: toJSonCustomData(a.customData)
            }
          : null
      )
    )
    .catch(err => {
      throw err;
    })
    .finally(() => c.closeSession());
};

/**
 * @default "json"
 */
type ArrayFormat = "json" | "base64";

type ArrayOutput = number[] | boolean[] | string[] | string;

type NumberArray = Int32Array | Float32Array | Float64Array;

function formattedTypedArray<T extends NumberArray>(
  values: number[],
  t: { new (arr: number[]): T },
  format: ArrayFormat
): ArrayOutput | undefined {
  if (format === "base64") {
    const fa = new t(values);
    return Buffer.from(fa.buffer).toString("base64");
  }
  return values;
}

/**
 * Format the data array as either JSON or Base64
 *
 * @param {Energistics.Etp.v12.Datatypes.AnyArray} array
 * @param {ArrayFormat} format
 * @returns {(number[] | boolean[] | string[] | string | undefined)}
 */
const formatArrayData = (
  array: Energistics.Etp.v12.Datatypes.AnyArray,
  format: ArrayFormat
): ArrayOutput | undefined => {
  const values = array.item[array.item.__keyName]?.values;
  if (!values) {
    return undefined;
  }
  switch (array.item.__keyName) {
    case "_ArrayOfBoolean": {
      const typedValues = values as boolean[];
      if (format === "base64") {
        const fa = new Int8Array(typedValues.map(v => (v ? 1 : 0)));
        return Buffer.from(fa.buffer).toString("base64");
      }
      return typedValues;
    }
    case "_ArrayOfFloat": {
      return formattedTypedArray<Float32Array>(
        values as number[],
        Float32Array,
        format
      );
    }
    case "_ArrayOfDouble": {
      return formattedTypedArray<Float64Array>(
        values as number[],
        Float64Array,
        format
      );
    }
    case "_ArrayOfInt": {
      return formattedTypedArray<Int32Array>(
        values as number[],
        Int32Array,
        format
      );
    }
    case "_ArrayOfLong": {
      const typedValues = values as bigint[];
      if (format === "base64") {
        const fa = new BigInt64Array(typedValues);
        return Buffer.from(fa.buffer).toString("base64");
      }
      return typedValues.map(v => v.toString() + "n");
    }
    case "_ArrayOfString": {
      const typedValues = values as string[];
      if (format === "base64") {
        return Buffer.from(typedValues.join(",")).toString("base64");
      }
      return typedValues;
    }
  }

  return values.toString();
};

/**
 * Describe to parameters to look inside a given object
 *
 * @export
 * @class DataArrayParams
 * @extends {FindInObjectParams}
 */
export class DataArrayParams extends FindInDataSpaceParams {
  @ApiProperty({
    name: "dataObjectType",
    description: "Energistics type of the object",
    example: "eml20.obj_EpcExternalPartReference",
    maxLength: 2048,
    pattern: patternString(dataObjectTypePattern)
  })
  @Matches(dataObjectTypePattern)
  @MaxLength(256)
  dataObjectType!: string;

  @ApiProperty({
    name: "guid",
    description: "Unique Id of the object",
    example: "53395ada-6f93-4bac-b506-d45997ded2a2",
    maxLength: 2048,
    pattern: patternString(uuidPattern)
  })
  @IsUUID()
  guid!: string;

  @ApiProperty({
    name: "pathInResource",
    pattern: patternString(arrayPathPattern),
    example: "/RESQML/a3f31b20-c93a-4682-8f6c-71be087202a4/points_patch0",
    description: "Identifier of the array inside the container.",
    maxLength: 2048
  })
  pathInResource!: string;
}

export const startsQueryParam: ApiQueryOptions = {
  name: "starts",
  required: false,
  description:
    "When selecting a subarray, start of the slice in each dimension",
  example: [10, 2],
  isArray: true,
  type: "integer",
  schema: {
    type: "array",
    maxItems: 1000,
    items: {
      type: "number",
      format: "int32",
      minimum: 0,
      maximum: 1000000
    }
  }
};

export const countsQueryParam: ApiQueryOptions = {
  name: "counts",
  required: false,
  description: "When selecting a subarray, number of items in each dimension",
  example: [4, 1],
  isArray: true,
  type: "integer",
  schema: {
    type: "array",
    maxItems: 1000,
    items: {
      type: "number",
      format: "int32",
      minimum: 1,
      maximum: 1000000
    }
  }
};

export const formatQueryParam: ApiQueryOptions = {
  name: "format",
  required: false,
  description: "Representation of the array: JSON(default) or base64",
  example: "json",
  schema: {
    type: "string",
    enum: ["json", "base64"]
  }
};

/**
 * API to Discover and Read data arrays
 *
 * @export
 * @class DataArrayReadAPI
 */
@ApiBearerAuth("access-token")
@UseGuards(HasBearerGuard("jwt"))
@ApiTags("Resources")
@ApiForbiddenResponse(errorMessageSchema("Forbidden", 403))
@ApiNotFoundResponse(errorMessageSchema("Not found", 404))
@ApiNotAcceptableResponse(errorMessageSchema("Not acceptable response", 406))
@ApiTooManyRequestsResponse(errorMessageSchema("Too many request", 429))
@ApiInternalServerErrorResponse(errorMessageSchema(`Unknown Error`, 500))
@ApiDefaultResponse(errorMessageSchema(`Unknown Error`, 500))
@Controller("/dataspaces/:dataspaceId/resources/:dataObjectType/:guid")
export default class DataArrayReadAPI {
  @ApiOperation({
    summary: "Get the description of all arrays.",
    description: `Get the description of a all the arrays (Type and dimensions) referenced by a data object.`
  })
  @Get("arrays")
  @ApiQuery(versionQueryParam)
  @ApiOkResponse({
    description: "Success",
    schema: {
      type: "array",
      maxItems: 256,
      additionalProperties: false,
      items: getSchemasForType(DataArrayMetadataDto)
    }
  })
  @ApiOperation({ servers: swaggerServers })
  public async GetObjectArrays(
    @Param() params: FindInObjectParams,
    @Query("version") version?: string,
    @Req() request?: express.Request
  ): Promise<GetObjectDataArraysOutput> {
    const m = params.dataObjectType.match(
      /^(?<domainFamily>resqml|eml|witsml|prodml)(?<domainVersion>[\d]+).(?<dataType>[\w]+)$/i
    );
    const uri = EtpUri.createObjectUri(
      params.dataspaceId,
      m?.groups?.domainFamily || "",
      m?.groups?.domainVersion || "",
      m?.groups?.dataType || "",
      params.guid,
      version
    ).uri;

    return getObjectDataArrays(uri, extractToken(request)).catch(
      (err: Error) => {
        throw new InternalServerErrorException({ description: err.message });
      }
    );
  }

  @Get("arrays/:pathInResource/metadata")
  @ApiOperation({
    summary: "Get the description of an array.",
    description: `Returns type and dimension of the array.`
  })
  @ApiQuery(versionQueryParam)
  @ApiOkResponse({
    description: "Success",
    schema: getSchemasForType(DataArrayMetadataDto)
  })
  @ApiOperation({ servers: swaggerServers })
  public async GetArrayMetaData(
    @Param() params: DataArrayParams,
    @Query("version") version?: string,
    @Req() request?: express.Request
  ): Promise<DataArrayMetadataDto | null> {
    const m = params.dataObjectType.match(
      /^(?<domainFamily>resqml|eml|witsml|prodml)(?<domainVersion>[\d]+).(?<dataType>[\w]+)$/i
    );
    const uri = EtpUri.createObjectUri(
      params.dataspaceId,
      m?.groups?.domainFamily || "",
      m?.groups?.domainVersion || "",
      m?.groups?.dataType || "",
      params.guid,
      version
    ).uri;
    try {
      const c = await createSession(extractToken(request));
      const d = await c.getDataArrayMetadata(uri, params.pathInResource);
      await c.closeSession();
      return d
        ? {
            ...d,
            customData: toJSonCustomData(d.customData)
          }
        : null;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * Get the content of a single array.
   * For large arrays, it is recommended to use starts and counts and get array by slices.
   * Note that starts and counts need to be used together or not at all.
   *
   * @memberof ResourceBasedDataArrayAPI
   */
  @Get("arrays/:pathInResource")
  @ApiOperation({
    summary: "Get the content of an array.",
    description: `For large arrays, it is recommended to use starts and counts and get array by slices. 
      Note that starts and counts need to be used together or not at all.`
  })
  @ApiQuery(versionQueryParam)
  @ApiQuery(startsQueryParam)
  @ApiQuery(countsQueryParam)
  @ApiQuery(formatQueryParam)
  @ApiBadRequestResponse(
    errorMessageSchema(
      `starts and counts dimensions not compatible with array dimensions`
    )
  )
  @ApiOkResponse({
    description: "Success",
    schema: getSchemasForType(DataArrayDto)
  })
  @ApiOperation({ servers: swaggerServers })
  public async GetArray(
    @Param() params: DataArrayParams,
    @Query("version") version?: string,
    @Query("starts", OptionalParseIntArrayPipe) starts?: Index32[],
    @Query("counts", OptionalParseIntArrayPipe) counts?: Integer32[],
    @Query("format") format?: ArrayFormat,
    @Req() request?: express.Request
  ): Promise<DataArrayDto> {
    const m = params.dataObjectType.match(
      /^(?<domainFamily>resqml|eml|witsml|prodml)(?<domainVersion>[\d]+).(?<dataType>[\w]+)$/i
    );
    const uri = EtpUri.createObjectUri(
      params.dataspaceId,
      m?.groups?.domainFamily || "",
      m?.groups?.domainVersion || "",
      m?.groups?.dataType || "",
      params.guid,
      version
    ).uri;
    try {
      const c = await createSession(extractToken(request));
      const metadata = await c.getDataArrayMetadata(uri, params.pathInResource);
      if (!metadata) {
        throw new InternalServerErrorException({
          description: `Cannot get subarray metadata`
        });
      }
      if (starts && counts) {
        if (
          metadata.dimensions?.length !== starts.length ||
          starts.length !== counts.length
        ) {
          throw new BadRequestException({
            description: `starts and counts dimensions not compatible with array dimensions`
          });
        }
        metadata.dimensions.forEach((d, i) => {
          if (starts[i] < 0 || counts[i] < 0 || starts[i] + counts[i] > d) {
            throw new BadRequestException({
              description: `starts and counts dimensions not compatible with array dimensions`
            });
          }
        });
        const subArray = await c.getDataSubarray(
          uri,
          params.pathInResource,
          starts,
          counts
        );
        await c.closeSession();
        if (
          !subArray ||
          !subArray.data ||
          subArray.data instanceof Energistics.Etp.v12.Datatypes.ErrorInfo
        ) {
          throw new InternalServerErrorException({
            description: "Cannot fetch subarray"
          });
        }
        return {
          uid: subArray.uid,
          data: {
            data: formatArrayData(subArray.data.data, format || "json"),
            dimensions: subArray.data.dimensions.map(Number)
          }
        };
      }
      const a = await c.getDataArray(uri, params.pathInResource, metadata);
      await c.closeSession();
      if (
        !a ||
        !a.data ||
        a.data instanceof Energistics.Etp.v12.Datatypes.ErrorInfo
      ) {
        throw new InternalServerErrorException({
          description: "Cannot fetch array"
        });
      }
      return {
        uid: a.uid,
        data: {
          data: formatArrayData(a.data.data, format || "json"),
          dimensions: a.data.dimensions.map(Number)
        }
      };
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      } else {
        throw new InternalServerErrorException(err);
      }
    }
  }
}
