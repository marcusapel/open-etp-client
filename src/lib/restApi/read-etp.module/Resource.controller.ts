/* eslint-disable no-useless-escape */
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
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";

import { Type } from "class-transformer";
import { IsDate, IsUUID } from "class-validator";

import {
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
  ApiResponseOptions,
  ApiTags,
  ApiTooManyRequestsResponse
} from "@nestjs/swagger";

import {
  Energistics,
  EtpUri,
  Integer32,
  Resource
} from "../../client/ResqmlClient";

import type { SupportedType } from "../../client/ResqmlClient";

import {
  alphaSpaceSchema,
  createSession,
  errorMessageSchema,
  extractToken,
  extractDataPartitionId,
  findResources,
  getSchemasForType,
  HasBearerGuard,
  HasDataPartitonGuard,
  OptionalParseDatePipe,
  OptionalParseIntPipe,
  patternString,
  sliceArray,
  swaggerServers,
  toJSonCustomData
} from "../ControllerUtils";

import express from "express";
import {
  IsDateString,
  IsInt,
  Matches,
  MaxLength
} from "@nestjs/class-validator";

export const uriPattern =
  /^(?<protocol>(?:[^:]+)s?)?:\/\/(?:(?<user>[^:\n\r]+):(?<pass>[^@\n\r]+)@)?(?<host>(?:www\.)?(?:[^:\/\n\r]+))(?::(?<port>\d+))?\/?(?<request>[^?#\n\r]+)?\??(?<query>[^#\n\r]*)?\#?(?<anchor>[^\n\r]*)?$/;

export const emlUriPattern =
  /^(?:eml:\/\/\/|^eml:\/\/\/dataspace\('[^'"]*?(?:''[^'"]*?)*'\)\/?)(witsml|resqml|prodml|eml)[1-9]\d\.\w+(?:\((?:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}|uuid=[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12},version='[^']*?(?:''[^']*?)*')\))?$/;

export const dataspaceUriPattern =
  /^(?:eml:\/\/\/|^eml:\/\/\/dataspace\('[^'"]*?(?:''[^'"]*?)*'\))$/;

export const dataspacePathPattern = /^[^\r\n'"]+$/;

export const validNamePattern = /^[^\r\n]+$/;

export const datePattern =
  /^((?:(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:.\d+)?))(Z|[+-]\d{2}:\d{2})?)$/;

export const filterPattern = /^(?:(_data)|[0-9a-zA-Z /()]+|'.*')+$/;

export const dataObjectTypePattern =
  /^(witsml|resqml|prodml|eml)[1-9]\d\.(obj_)?[0-9a-zA-Z]+$/;

export const dataObjectTypesPattern =
  /^((witsml|resqml|prodml|eml)[1-9]\d\.(obj_)?[0-9a-zA-Z]+,?)*$/;

export const uuidPattern =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

/**
 * Data Transfer Object for Dataspace
 *
 * @export
 * @class DataspaceDto
 */
export class DataspaceDto {
  @ApiProperty({
    name: "uri",
    maxLength: 2048,
    pattern: patternString(dataspaceUriPattern)
  })
  @Matches(dataspaceUriPattern)
  uri!: string;
  @ApiProperty({
    name: "path",
    maxLength: 2048,
    pattern: patternString(dataspacePathPattern)
  })
  path!: string;
  @ApiProperty({
    name: "storeCreated",
    maxLength: 2048,
    pattern: patternString(datePattern)
  })
  @IsDateString()
  storeCreated!: Date;

  @ApiProperty({
    name: "storeLastWrite",
    maxLength: 2048,
    pattern: patternString(datePattern)
  })
  @IsDateString()
  storeLastWrite!: Date;

  @ApiProperty({
    name: "customData",
    type: "object",
    additionalProperties: alphaSpaceSchema
  })
  customData!: Record<string, string>;
}

/**
 * Data Transfer Object for Resource
 *
 * @class ResourceDto
 */
class ResourceDto {
  @ApiProperty({
    name: "uri",
    description: "Unique Resource Identifier of the resource",
    example: [
      "eml:///dataspace('demo/Volve')/resqml20.obj_TriangulatedSetRepresentation(a3f31b20-c93a-4682-8f6c-71be087202a4)"
    ],
    maxLength: 2048,
    pattern: patternString(emlUriPattern)
  })
  @Matches(emlUriPattern)
  @MaxLength(2048)
  uri!: string;

  @ApiProperty({
    name: "alternateUris",
    description: "Alternate uris of the resource",
    maxItems: 100000,
    maxLength: 2048,
    pattern: patternString(uriPattern)
  })
  @Matches(uriPattern)
  alternateUris?: string[];

  @ApiProperty({
    name: "name",
    description: "Resource title",
    example: "Depth_Hugin_Fm_Top_t",
    maxLength: 2048,
    pattern: patternString(validNamePattern)
  })
  @Matches(validNamePattern)
  name!: string;

  @ApiPropertyOptional({
    name: "sourceCount",
    description: "Number of objects referencing the resource",
    format: "integer",
    minimum: 0,
    maximum: 1000000
  })
  @IsInt()
  sourceCount?: Integer32;

  @ApiPropertyOptional({
    name: "targetCount",
    description: "Number of objects referenced by the resource",
    format: "integer",
    minimum: 0,
    maximum: 1000000
  })
  @IsInt()
  targetCount?: Integer32;

  @ApiPropertyOptional({
    name: "activeStatus",
    description: "Indicates if resource is active",
    example: "Active",
    enum: ["Active", "Inactive"]
  })
  activeStatus?: "Active" | "Inactive";

  @ApiProperty({
    name: "lastChanged",
    description: "Date of last modification",
    example: "2021-09-06T16:06:31.000Z",
    maxLength: 2048
  })
  @Type(() => Date)
  @IsDate()
  lastChanged!: Date;

  @ApiProperty({
    name: "storeCreated",
    description: "Date of first entry in data store",
    example: "2021-09-14T20:25:17.128Z",
    maxLength: 2048
  })
  @Type(() => Date)
  @IsDate()
  storeCreated!: Date;

  @ApiProperty({
    name: "storeLastWrite",
    description: "Date of last entry in data store",
    example: "2021-09-14T20:26:16.128Z",
    maxLength: 2048
  })
  @Type(() => Date)
  @IsDate()
  storeLastWrite!: Date;

  @ApiProperty({
    name: "customData",
    description: "Extra meta data associated to resource",
    additionalProperties: alphaSpaceSchema
  })
  customData!: Record<string, string>;
}

// Schema for response returning resources successfully
const resourceResponse: ApiResponseOptions = {
  description: "Success",
  schema: {
    type: "array",
    maxItems: 256,
    additionalProperties: false,
    items: getSchemasForType(ResourceDto)
  }
};

/**
 * Convert from bigint to Date
 *
 * @param {bigint} b
 * @returns {Date}
 */
const toDate = (b: bigint): Date => new Date(Number(b / BigInt(1000)));

/**
 * Convert from Avro type to JSON presentation type
 *
 * @param {Energistics.Etp.v12.Datatypes.Object.Dataspace} d
 * @returns {DataspaceDto}
 */
const toJSonDataspace = (
  d: Energistics.Etp.v12.Datatypes.Object.Dataspace
): DataspaceDto => {
  return {
    ...d,
    storeCreated: toDate(d.storeCreated),
    storeLastWrite: toDate(d.storeLastWrite),
    customData: toJSonCustomData(d.customData) || {}
  };
};

/**
 * Convert from Avro type to JSON presentation type
 *
 * @param {Energistics.Etp.v12.Datatypes.Object.Resource} d
 * @returns {ResourceDto}
 */
const toJSonResource = (
  d: Energistics.Etp.v12.Datatypes.Object.Resource
): ResourceDto => {
  return {
    ...d,
    sourceCount: d.sourceCount === null ? undefined : d.sourceCount,
    targetCount: d.targetCount === null ? undefined : d.targetCount,
    activeStatus:
      d.activeStatus ===
        Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind.Inactive
        ? "Inactive"
        : "Active",
    lastChanged: toDate(d.lastChanged),
    storeCreated: toDate(d.storeCreated),
    storeLastWrite: toDate(d.storeLastWrite),
    customData: toJSonCustomData(d.customData) || {}
  };
};

export const dataspaceNamePattern = /^[^\/]+\/[^\/]+$/;

/**
 * Send the resource content.
 * Also do client side pagination since server does not support it yet.
 *
 * @param {number | undefined} start Index of the first element to send
 * @param {number | undefined} count Number element to send
 * @param {Resource[]} resources
 */
const sendResources = (
  start: number | undefined,
  count: number | undefined,
  resources: Resource[]
) => sliceArray<Resource>(start, count, resources).map(r => toJSonResource(r));

export class FindInDataSpaceParams {
  @ApiProperty({
    name: "dataspaceId",
    description: "Name of dataspace",
    example: "demo/Volve",
    maxLength: 2048,
    pattern: patternString(dataspaceNamePattern)
  })
  @MaxLength(2048)
  @Matches(dataspaceNamePattern)
  dataspaceId!: string;
}

/**
 * Describe to parameters to look inside a given type
 *
 * @export
 * @class FindInTypeParams
 * @extends {FindInDataSpaceParams}
 */
export class FindInTypeParams extends FindInDataSpaceParams {
  @ApiProperty({
    name: "dataObjectType",
    description: "Energistics type of the object",
    example: "resqml20.obj_ContinuousProperty",
    maxLength: 2048,
    pattern: patternString(dataObjectTypePattern)
  })
  @Matches(dataObjectTypePattern)
  @MaxLength(256)
  dataObjectType!: string;
}

/**
 * Describe to parameters to look inside a given object
 *
 * @export
 * @class FindInObjectParams
 * @extends {FindInTypeParams}
 */
export class FindInObjectParams extends FindInTypeParams {
  @ApiProperty({
    name: "guid",
    description: "Unique Id of the object",
    example: "1615d8d2-2a2d-482c-885e-14225b89e90c",
    maxLength: 2048,
    pattern: patternString(uuidPattern)
  })
  @IsUUID()
  guid!: string;
}

/**
 * Data Object Transfer for Type Count
 *
 * @export
 * @class TypeCount
 */
export class TypeCountDto {
  @ApiProperty({
    name: "name",
    example: "resqml20.obj_TriangulatedSetRepresentation",
    maxLength: 2048,
    pattern: patternString(dataObjectTypePattern)
  })
  name!: string;

  @ApiProperty({
    name: "count",
    type: "number",
    format: "integer",
    minimum: 1,
    maximum: 1000000,
    example: 2
  })
  @IsInt()
  count!: number;
}

export const skipQueryParam: ApiQueryOptions = {
  name: "$skip",
  required: false,
  description: "ODATA Pagination: Index of first item returned. [0..100000]",
  example: 0,
  schema: {
    type: "number",
    format: "integer",
    minimum: 0,
    maximum: 100000
  }
};

export const topQueryParam: ApiQueryOptions = {
  name: "$top",
  required: false,
  description: "ODATA Pagination: Maximum number of items returned. [1..10000]",
  example: 10,
  schema: {
    type: "number",
    format: "integer",
    minimum: 1,
    maximum: 10000
  }
};

export const filterQueryParam: ApiQueryOptions = {
  name: "$filter",
  required: false,
  description: "ODATA filter using XPath syntax",
  example:
    "SupportingRepresentation/_data/RepresentedInterpretation/_data/InterpretedFeature/_data/Citation/Title eq 'Hugin_Fm_Top' and PropertyKind/LocalPropertyKind/Title eq 'Horizontal_Length'",
  schema: {
    type: "string",
    maxLength: 2048,
    pattern: patternString(filterPattern)
  }
};

export const storeLastWriteFilterQueryParam: ApiQueryOptions = {
  name: "storeLastWriteFilter",
  required: false,
  description:
    "If present, only the object modified after given date will be listed.",
  schema: {
    type: "string",
    format: "date-time",
    maxLength: 2048,
    pattern: patternString(datePattern)
  }
};

export const dataObjectTypesQueryParam: ApiQueryOptions = {
  name: "dataObjectTypes",
  required: false,
  description:
    "If present, only objects with given types will be listed. Provided as comma separated list.",
  example:
    "resqml20.obj_TriangulatedSetRepresentation,resqml20.obj_ContinuousProperty",
  schema: {
    type: "string",
    pattern: patternString(dataObjectTypesPattern),
    maxLength: 8192
  }
};

export const versionQueryParam: ApiQueryOptions = {
  name: "version",
  required: false,
  description: "Optional version of the object",
  schema: {
    type: "string",
    pattern: "^[^']*?(?:''[^']*?)*$",
    maxLength: 2048
  }
};

export const depthQueryParam: ApiQueryOptions = {
  name: "depth",
  required: false,
  description:
    "If present, indicate the number of recursive levels when looking for relations",
  example: 10,
  schema: {
    type: "number",
    format: "integer",
    minimum: 1,
    maximum: 1000
  }
};

/**
 * Api for resources access
 *
 * @export
 * @class ResourcesReadAPI
 */
@ApiBearerAuth("access-token")
@UseGuards(HasBearerGuard("jwt"))
@UseGuards(HasDataPartitonGuard())
@ApiTags("Resources")
@ApiForbiddenResponse(errorMessageSchema("Forbidden", 403))
@ApiNotFoundResponse(errorMessageSchema("Not found", 404))
@ApiNotAcceptableResponse(errorMessageSchema("Not acceptable response", 406))
@ApiTooManyRequestsResponse(errorMessageSchema("Too many request", 429))
@ApiInternalServerErrorResponse(errorMessageSchema(`Unknown Error`, 500))
@ApiDefaultResponse(errorMessageSchema(`Unknown Error`, 500))
@Controller("dataspaces")
export default class ResourcesReadAPI {
  /**
   * Get the list of dataspaces in the server
   *
   * @memberof ResourcesReadAPI
   */
  @Get("")
  @ApiOkResponse({
    description: "Success",
    schema: {
      type: "array",
      maxItems: 256,
      additionalProperties: false,
      items: getSchemasForType(DataspaceDto)
    }
  })
  @ApiQuery(skipQueryParam)
  @ApiQuery(topQueryParam)
  @ApiOperation({ servers: swaggerServers })
  public async ListDataspaces(
    @Query("$skip", OptionalParseIntPipe) skip?: number,
    @Query("$top", OptionalParseIntPipe) top?: number,
    @Req() request?: express.Request
  ): Promise<Array<DataspaceDto>> {
    try {
      const c = await createSession(extractToken(request), extractDataPartitionId(request));
      const projects = await c.getProjects();
      const pros = projects
        ? sliceArray<Energistics.Etp.v12.Datatypes.Object.Dataspace>(
          skip,
          top,
          projects
        ).map(p => toJSonDataspace(p))
        : [];
      await c.closeSession();
      return pros;
    } catch (err) {
      throw new InternalServerErrorException(
        err instanceof Error ? err : { description: `Unknown Error` }
      );
    }
  }

  /**
   * List of types available in a dataset
   *
   * @memberof ResourcesReadAPI
   */
  @Get(":dataspaceId/resources")
  @ApiQuery(skipQueryParam)
  @ApiQuery(topQueryParam)
  @ApiOkResponse({
    description: "Success",
    schema: {
      type: "array",
      maxItems: 256,
      additionalProperties: false,
      items: getSchemasForType(TypeCountDto)
    }
  })
  @ApiOperation({ servers: swaggerServers })
  public async ListTypes(
    @Param() params: FindInDataSpaceParams,
    @Query("$skip", OptionalParseIntPipe) skip?: number,
    @Query("$top", OptionalParseIntPipe) top?: number,
    @Req() request?: express.Request
  ): Promise<TypeCountDto[] | null> {
    try {
      const c = await createSession(extractToken(request));
      const types = await c.getProjectTypes(
        EtpUri.createDataSpaceUri(params.dataspaceId).uri
      );
      await c.closeSession();
      return sliceArray<SupportedType>(skip, top, types).map(r => {
        return {
          name: r.dataObjectType,
          count: r.objectCount || 0
        };
      });
    } catch (err) {
      throw new InternalServerErrorException(
        err instanceof Error ? err : { description: `Unknown Error` }
      );
    }
  }

  /**
   * List of resources (data objects) available in a dataset
   *
   * @memberof ResourcesReadAPI
   */
  @Get(":dataspaceId/resources/all")
  @ApiQuery(skipQueryParam)
  @ApiQuery(topQueryParam)
  @ApiQuery(filterQueryParam)
  @ApiQuery(storeLastWriteFilterQueryParam)
  @ApiQuery(dataObjectTypesQueryParam)
  @ApiOkResponse(resourceResponse)
  @ApiOperation({ servers: swaggerServers })
  public async ListResources(
    @Param() params: FindInDataSpaceParams,
    @Query("$skip", OptionalParseIntPipe) skip?: number,
    @Query("$top", OptionalParseIntPipe) top?: number,
    @Query("$filter") filter?: string,
    @Query("storeLastWriteFilter", OptionalParseDatePipe)
    storeLastWriteFilter?: Date,
    @Query("dataObjectTypes") dataObjectTypes?: string,
    @Req() request?: express.Request
  ): Promise<ResourceDto[] | null> {
    const query = {
      top,
      skip,
      filter
    };
    try {
      const c = await createSession(extractToken(request));
      const resources = await findResources(
        c,
        {
          uri: EtpUri.createDataSpaceUri(params.dataspaceId).uri,
          depth: 1,
          dataObjectTypes: dataObjectTypes ? dataObjectTypes.split(",") : [],
          navigableEdges: "Both"
        },
        query,
        "self",
        false,
        storeLastWriteFilter
      );
      await c.closeSession();
      return sendResources(skip, top, resources);
    } catch (err) {
      throw new InternalServerErrorException(
        err instanceof Error ? err : { description: `Unknown Error` }
      );
    }
  }

  /**
   * List of resources of a given type available in a dataset
   *
   * @memberof ResourcesReadAPI
   */
  @Get(":dataspaceId/resources/:dataObjectType")
  @ApiQuery(skipQueryParam)
  @ApiQuery(topQueryParam)
  @ApiQuery(filterQueryParam)
  @ApiQuery(storeLastWriteFilterQueryParam)
  @ApiOkResponse(resourceResponse)
  @ApiOperation({ servers: swaggerServers })
  public async ListResourcesByTypes(
    @Param() params: FindInTypeParams,
    @Query("$skip", OptionalParseIntPipe) skip?: number,
    @Query("$top", OptionalParseIntPipe) top?: number,
    @Query("$filter") filter?: string,
    @Query("storeLastWriteFilter", OptionalParseDatePipe)
    storeLastWriteFilter?: Date,
    @Req() request?: express.Request
  ): Promise<ResourceDto[] | null> {
    const query = {
      top,
      skip,
      filter
    };
    try {
      const c = await createSession(extractToken(request));
      const resources = await findResources(
        c,
        {
          uri: EtpUri.createDataSpaceUri(params.dataspaceId).uri,
          depth: 1,
          dataObjectTypes: [params.dataObjectType],
          navigableEdges: "Both"
        },
        query,
        "self",
        false,
        storeLastWriteFilter
      );
      await c.closeSession();
      return sendResources(skip, top, resources);
    } catch (err) {
      throw new InternalServerErrorException(
        err instanceof Error ? err : { description: `Unknown Error` }
      );
    }
  }

  /**
   * List data objects referenced by given object
   *
   * @memberof ResourcesReadAPI
   */
  @Get(":dataspaceId/resources/:dataObjectType/:guid/targets")
  @ApiQuery(skipQueryParam)
  @ApiQuery(topQueryParam)
  @ApiQuery(filterQueryParam)
  @ApiQuery(storeLastWriteFilterQueryParam)
  @ApiQuery(dataObjectTypesQueryParam)
  @ApiQuery(versionQueryParam)
  @ApiQuery(depthQueryParam)
  @ApiOkResponse(resourceResponse)
  @ApiOperation({ servers: swaggerServers })
  public async ListTargets(
    @Param() params: FindInObjectParams,
    @Query("$skip", OptionalParseIntPipe) skip?: number,
    @Query("$top", OptionalParseIntPipe) top?: number,
    @Query("$filter") filter?: string,
    @Query("storeLastWriteFilter", OptionalParseDatePipe)
    storeLastWriteFilter?: Date,
    @Query("dataObjectTypes") dataObjectTypes?: string,
    @Query("version") version?: string,
    @Query("depth", OptionalParseIntPipe) depth?: number,
    @Req() request?: express.Request
  ): Promise<ResourceDto[] | null> {
    const query = {
      top,
      skip,
      filter
    };
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
      const resources = await findResources(
        c,
        {
          uri,
          depth,
          dataObjectTypes: dataObjectTypes ? dataObjectTypes.split(",") : [],
          navigableEdges: "Both"
        },
        query,
        "targets",
        false,
        storeLastWriteFilter
      );
      await c.closeSession();
      return sendResources(skip, top, resources);
    } catch (err) {
      throw new InternalServerErrorException(
        err instanceof Error ? err : { description: `Unknown Error` }
      );
    }
  }

  /**
   * List data objects referencing the given object
   *
   * @memberof ResourcesReadAPI
   */
  @Get(":dataspaceId/resources/:dataObjectType/:guid/sources")
  @ApiQuery(skipQueryParam)
  @ApiQuery(topQueryParam)
  @ApiQuery(filterQueryParam)
  @ApiQuery(storeLastWriteFilterQueryParam)
  @ApiQuery(dataObjectTypesQueryParam)
  @ApiQuery(versionQueryParam)
  @ApiQuery(depthQueryParam)
  @ApiOkResponse(resourceResponse)
  @ApiOperation({ servers: swaggerServers })
  public async ListSources(
    @Param() params: FindInObjectParams,
    @Query("$skip", OptionalParseIntPipe) skip?: number,
    @Query("$top", OptionalParseIntPipe) top?: number,
    @Query("$filter") filter?: string,
    @Query("storeLastWriteFilter", OptionalParseDatePipe)
    storeLastWriteFilter?: Date,
    @Query("dataObjectTypes") dataObjectTypes?: string,
    @Query("version") version?: string,
    @Query("depth", OptionalParseIntPipe) depth?: number,
    @Req() request?: express.Request
  ): Promise<ResourceDto[] | null> {
    const query = {
      top,
      skip,
      filter
    };
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
      const resources = await findResources(
        c,
        {
          uri,
          depth,
          dataObjectTypes: dataObjectTypes ? dataObjectTypes.split(",") : [],
          navigableEdges: "Both"
        },
        query,
        "sources",
        false,
        storeLastWriteFilter
      );
      await c.closeSession();
      return sendResources(skip, top, resources);
    } catch (err) {
      throw new InternalServerErrorException(
        err instanceof Error ? err : { description: `Unknown Error` }
      );
    }
  }
}
