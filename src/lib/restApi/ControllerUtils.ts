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
import { Integer32 } from "../common/Etp12";

import {
  Energistics,
  IOptions,
  IResqmlDataObject,
  ResqmlClient,
  URI
} from "../client/ResqmlClient";

import { EtpUri } from "../common/EtpUri";

import express from "express";

import {
  SchemaObject,
  SchemasObject
} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

import { ModelPropertiesAccessor } from "@nestjs/swagger/dist/services/model-properties-accessor";
import { SchemaObjectFactory } from "@nestjs/swagger/dist/services/schema-object-factory";
import { SwaggerTypesMapper } from "@nestjs/swagger/dist/services/swagger-types-mapper";

import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  NotFoundException,
  NotImplementedException,
  PipeTransform,
  PreconditionFailedException,
  Type,
  UnauthorizedException
} from "@nestjs/common";

import {
  etpServerUrl,
  restApiMainUrl,
  restApiPort,
  restApiRoutePath,
  restApiServerPath,
  openApiPort
} from "../common/config";
import { ResourceGraph } from "../common/ResponseHandlers";
import { ErrorCode, EtpError } from "../common/EtpTypes";

import { bigIntToString } from "../mlTypes/XmlJsonUtil";

import { ApiProperty, ApiQueryOptions } from "@nestjs/swagger";
import { IsUUID, Matches, MaxLength } from "class-validator";

import logging from "../common/Logging";
const logger = logging.getLogger("EtpClient");

export { restApiMainUrl, restApiPort, restApiRoutePath };

export const swaggerUIUrl = `${restApiMainUrl}:${restApiPort}${restApiRoutePath}`;

export const serverUIUrl = `${restApiMainUrl}:${openApiPort}${restApiServerPath}`;

export const swaggerServers = [{ url: serverUIUrl, description: "API server" }];

let userInfo: string;

const PING_INTERVAL_MS = 30000;

const etpClients = new Map<
  string,
  {
    client: ResqmlClient;
    timeoutId: NodeJS.Timeout;
    pingIntervalId: NodeJS.Timeout;
    timeoutPeriod: number;
    onDisconnect: () => void;
  }
>();

const cleanupTransaction = (transactionId: string): void => {
  const t = etpClients.get(transactionId);
  if (t) {
    clearTimeout(t.timeoutId);
    clearInterval(t.pingIntervalId);
    etpClients.delete(transactionId);
    logger.warn(
      `Transaction ${transactionId} cleaned up due to connection loss`
    );
  }
};

/**
 * Pagination of an array
 * @export
 * @template T
 * @param {number|undefined} start first element
 * @param {number|undefined} count number of element
 * @param {T[]} arr
 * @returns
 */
export function sliceArray<T>(
  start: number | undefined,
  count: number | undefined,
  arr: T[]
): T[] {
  if (start) {
    return arr.slice(start, count ? start + count : undefined);
  }
  return count !== undefined ? arr.slice(0, count) : arr;
}

/**
 * Convert from bigint to Date
 *
 * @param {bigint} b
 * @returns {Date}
 */
export const toDate = (b: bigint): Date => new Date(Number(b / BigInt(1000)));

/**
 * Convert from Values so String
 *
 * @param {Energistics.Etp.v12.Datatypes.Object.Resource} d
 * @returns {Record<string, any> | undefined}
 */
export const toJSonCustomData = (
  d: Map<string, Energistics.Etp.v12.Datatypes.DataValue> | undefined
): Record<string, any> | undefined => {
  if (!d) {
    return undefined;
  }
  const o: Record<string, any> = {};
  return Array.from(d.keys()).reduce((obj, key: string) => {
    const val = d.get(key);
    if (val?.item?.__keyName) {
      const v = val.item[val.item.__keyName];
      if (v !== undefined) {
        if (key === "created") {
          obj[key] = toDate(v as bigint);
        } else {
          if (val.item.__keyName === "_string") {
            try {
              obj[key] = JSON.parse(v as string);
            } catch (e) {
              obj[key] = v;
            }
          } else {
            obj[key] = JSON.parse(JSON.stringify(v, bigIntToString));
          }
        }
      }
    }
    return obj;
  }, o);
};

export const partitionPattern = /[A-Za-z0-9]+(-[A-Za-z0-9]+)*/;
export const partitionRegexp = RegExp(partitionPattern);

export type QueryInput = {
  // Pagination: Maximum number of item returned
  top?: number;
  // Pagination: Index of first item returned
  skip?: number;
  // OData orderBy request. example "Citation/Title"
  orderby?: string;
  // OData filter request
  // example SupportingRepresentation/_data/RepresentedInterpretation/_data/InterpretedFeature/_data/Citation/Title eq 'well_feature_NO_15/9-19_SR_EBECD2' and PropertyKind/Kind eq 'neutron API unit'
  filter?: string;
};

export interface ContextInput {
  /**
   * @example eml:\/\/dataspace\(\'demo/Volve\'\)
   * @description URI to start from can be either a dataspace or an object
   */
  uri: string;
  /**
   * @description Number of level to look for when traversing relationships
   */
  depth?: Integer32;
  /**
   * @example ["resqml20.obj_IjkGridRepresentation"]
   * @maxItems 10000
   * @description If defined, only specified types will be returned
   */
  dataObjectTypes?: string[];
  /**
   * @default Both
   * @description Specify the type of edge to traverse in the graph
   */
  navigableEdges: "Both" | "Primary" | "Secondary";
  /**
   * @example false
   * @description Specify if this relationship type should also be included
   */
  includeSecondaryTargets?: boolean;
  /**
   * @example false
   * @description Specify if this relationship type should also be included
   */
  includeSecondarySources?: boolean;
}

/**
 * Extract JWT token from request
 *
 * @param {express.Request} [request]
 * @returns {string}
 */
export const extractToken = (request?: express.Request): string => {
  const authHeader = request?.headers?.authorization;
  userInfo = "";
  if (!authHeader || authHeader.includes("Basic")) {
    userInfo = authHeader ? authHeader : "";
    return "";
  }
  const token = authHeader.split(" ");
  if (token.length < 2) {
    return "";
  }
  // Check token respects base64 format.
  if (!RegExp(/^[a-zA-Z0-9._-]+$/).exec(token[1])) {
    throw new Error("Invalid auth token format");
  }
  // Snyk is reporting this as an XSS issue, but as we ensure token as the right format it can be ignored.
  return token[1];
};

/**
 * Extract data-partition-id value from request
 *
 * @param {express.Request} [request]
 * @returns {string | undefined}
 */
export const extractDataPartitionId = (
  request?: express.Request
): string | undefined => {
  const header: string | undefined = request?.header("data-partition-id");
  if (!header || !partitionRegexp.exec(header)) {
    return undefined;
  }
  return header;
};

/**
 * Convert from Regex object to string
 *
 * @param {RegExp} regex
 * @returns {string}
 */
export const patternString = (regex: RegExp): string => {
  return regex.toString().slice(1, -1);
};

export const alphaSpaceSchema: SchemaObject = {
  type: "string",
  pattern: "^[a-zA-Z0-9 ]*$",
  maxLength: 2048
};

/**
 * Return the information (message and schema ) required to declare an error
 *
 * @param {string} message
 * @returns {{ description: string; schema: SchemaObject }}
 */
export const errorMessageSchema = (
  message: string,
  code?: number
): { description: string; schema: SchemaObject } => {
  return {
    description: message,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        statusCode: {
          type: "integer",
          format: "int32",
          minimum: code ?? 100,
          maximum: code ?? 511,
          example: code
        },
        message: alphaSpaceSchema,
        error: alphaSpaceSchema
      }
    }
  };
};

/**
 * Check bearer token presence on protected routes
 *
 * @param {(string | string[])} [type]
 * @returns
 */
export const HasBearerGuard: (type?: string | string[]) => CanActivate = (
  type?: string | string[]
) => {
  return {
    canActivate: (context: ExecutionContext) => {
      if (type !== "jwt") {
        return false;
      }
      const args = context.getArgs();
      const authHeader = args[0]?.headers?.authorization;
      if (!authHeader) {
        return false;
      }
      const token = authHeader.split(" ");
      return token.length === 2;
    }
  };
};

/**
 * Check data-partition-id header presence for multi-partition mode
 *
 * @returns
 */
export const HasDataPartitionGuard: () => CanActivate = () => {
  return {
    canActivate: (context: ExecutionContext) => {
      if (process.env.RDMS_DATA_PARTITION_MODE !== "single") {
        const request = context.switchToHttp().getRequest();
        const dataPartitionIdHeader = extractDataPartitionId(request);
        return !!dataPartitionIdHeader;
      } else {
        return true;
      }
    }
  };
};

/**
 * Pipe to check for boolean arguments when optional
 *
 * @export
 * @class OptionalParseBoolPipe
 * @implements {PipeTransform<number>}
 */
export class OptionalParseBoolPipe
  implements PipeTransform<string | boolean, Promise<boolean | undefined>>
{
  transform(value: string | boolean | undefined): Promise<boolean | undefined> {
    if (value === undefined) {
      Promise.resolve(undefined);
    }
    return Promise.resolve(
      typeof value === "string" ? value === "true" : value
    );
  }
}

/**
 * Pipe to check for integer arguments when optional
 *
 * @export
 * @class OptionalParseIntPipe
 * @implements {PipeTransform<number>}
 */
export class OptionalParseIntPipe
  implements PipeTransform<string | number, Promise<number | undefined>>
{
  transform(value: number | string | undefined): Promise<number | undefined> {
    if (value === undefined) {
      return Promise.resolve(undefined);
    }
    if (typeof value === "string") {
      value = Number.parseInt(value);
    }
    return Promise.resolve(Number.isInteger(value) ? value : undefined);
  }
}

/**
 * Pipe to check for array of integer arguments when optional
 *
 * @export
 * @class OptionalParseIntArrayPipe
 * @implements {PipeTransform<string[]>}
 */
export class OptionalParseIntArrayPipe
  implements PipeTransform<string | string[]>
{
  transform(
    value: string | string[] | undefined
  ): Promise<number[] | number | undefined> {
    if (Array.isArray(value)) {
      return Promise.resolve(value ? value.map(v => parseInt(v)) : undefined);
    }
    return Promise.resolve(value === undefined ? undefined : [parseInt(value)]);
  }
}

/**
 * Pipe to check for Date arguments when optional
 *
 * @export
 * @class OptionalParseIntPipe
 * @implements {PipeTransform<number>}
 */
export class OptionalParseDatePipe
  implements PipeTransform<Date | string, Promise<Date | undefined>>
{
  transform(value: Date | string | undefined): Promise<Date | undefined> {
    if (value === undefined) {
      return Promise.resolve(undefined);
    }
    if (typeof value === "string") {
      value = new Date(value);
    }

    return Promise.resolve(
      value instanceof Date && !Number.isNaN(value.valueOf())
        ? value
        : undefined
    );
  }
}

export const dataspaceNamePattern = /^[^/]+\/[^/]+$/;

/*
 * Describe parameters to find resources in a dataspace
 *
 * @export
 * @class FindInDataSpaceParams
 */
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

// Define the pattern for the data object type
export const dataObjectTypesPattern =
  /^((witsml|resqml|prodml|eml)[1-9]\d\.(obj_)?\w+,?)*$/;

// Define the pattern for capturing data object type components
export const dataObjectTypePattern =
  /^(?<domainFamily>resqml|eml|witsml|prodml)(?<domainVersion>\d+).(?<dataType>(obj_)?\w+)$/;
export const dataObjectTypeRegexp = RegExp(dataObjectTypePattern);

// Define the pattern for the UUID
export const uuidPattern =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

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
 * Describe parameter to identify transaction
 *
 * @export
 */
export const transactionIdQueryParam: ApiQueryOptions = {
  name: "transactionId",
  required: false,
  description: "Identify current transaction",
  example: "1615d8d2-2a2d-482c-885e-14225b89e90c",
  schema: {
    type: "string",
    maxLength: 2048,
    pattern: patternString(uuidPattern)
  }
};

const modelPropertiesAccessor = new ModelPropertiesAccessor();
const swaggerTypesMapper = new SwaggerTypesMapper();
const schemaObjectFactory = new SchemaObjectFactory(
  modelPropertiesAccessor,
  swaggerTypesMapper
);

/**
 * Get the schema for a given type
 *
 * @param {Type<unknown>} type
 * @param {boolean} [additionalProperties=false] Identify if additional properties are allowed
 * @returns {SchemaObject}
 */
export const getSchemasForType = (
  type: Type<unknown>,
  additionalProperties = false
): SchemaObject => {
  const schemas: Record<string, SchemasObject> = {};
  schemaObjectFactory.exploreModelSchema(type, schemas);
  const values = Object.values(schemas);
  return additionalProperties
    ? values[0]
    : { ...values[0], additionalProperties: false };
};

/*!
 * Create and open a session, and return the client
 *
 * @param {string} jwt JSON web token
 * @param {string} [dataPartitionId] optional data partition
 * @param {IOptions} [options] Options for creating the client
 * @param {string} [transactionId] optional transaction identifier
 */
export const createSession = async (
  jwt: string,
  dataPartitionId?: string,
  options?: IOptions,
  transactionId?: string
) => {
  if (transactionId) {
    const c1 = etpClients.get(transactionId);
    if (c1 === undefined) {
      throw new EtpError(
        `Transaction ${transactionId} does not exists`,
        ErrorCode.ENOT_FOUND
      );
    }
    if (!c1.client.isConnected()) {
      cleanupTransaction(transactionId);
      throw new EtpError(
        `Transaction ${transactionId} connection was lost`,
        ErrorCode.EINVALID_STATE
      );
    }
    clearTimeout(c1.timeoutId);
    etpClients.set(transactionId, {
      ...c1,
      timeoutId: setTimeout(() => {
        if (etpClients.has(transactionId)) {
          rollbackTransaction(transactionId);
        }
      }, c1.timeoutPeriod * 1000)
    });
    return c1.client;
  } else {
    const c = new ResqmlClient(options);
    await c
      .openSession(etpServerUrl, jwt, dataPartitionId, userInfo)
      .catch(err => {
        throw new Error(`Cannot create session with ETP server: ${err}`);
      });
    return c;
  }
};

/**
 * Create and open a session associated with a transaction, and return the client
 *
 * @param {string} jwt JSON web token
 * @param {string} dataspace Uri of dataspace where transaction will occur
 * @param {IOptions} [options]
 * @param {string} [dataPartitionId] optional data partition
 * @param {number} [timeoutPeriod] optional timeout period in seconds (default 300)
 * @param {number} [retries] optional number of retries to account for busy dataspace (default 6)
 * @return {Promise<string>} Transaction identifier (uuid as string)
 */
export const createTransaction = async (
  jwt: string,
  dataspace: string,
  options?: IOptions,
  dataPartitionId?: string,
  timeoutPeriod: number = 300,
  retries = 6
): Promise<string> => {
  const c = new ResqmlClient(options);
  return c
    .openSession(etpServerUrl, jwt, dataPartitionId)
    .then(() =>
      c.startTransaction(
        false,
        [dataspace],
        `Creating transaction for dataspace ${dataspace}`,
        retries
      )
    )
    .then(id => {
      const idString = EtpUri.uuidByteArrayToString(id);

      const onDisconnect = () => {
        cleanupTransaction(idString);
      };

      c.onDisconnect(onDisconnect);

      const pingIntervalId = setInterval(() => {
        if (c.isConnected()) {
          c.ping().catch(() => {
            cleanupTransaction(idString);
          });
        } else {
          cleanupTransaction(idString);
        }
      }, PING_INTERVAL_MS);

      etpClients.set(idString, {
        client: c,
        timeoutId: setTimeout(() => {
          if (etpClients.has(idString)) {
            rollbackTransaction(idString);
          }
        }, timeoutPeriod * 1000),
        pingIntervalId,
        timeoutPeriod,
        onDisconnect
      });
      return idString;
    })
    .catch(err => {
      if (err.code) {
        throw new EtpError(err.message, err.code);
      }
      throw new Error(`Cannot create session with ETP server: ${err}`);
    });
};

/**
 * Commit the transaction
 *
 * @param {string} transactionId Transaction identifier
 * @returns
 */
export const commitTransaction = async (
  transactionId: string
): Promise<boolean> => {
  const t = etpClients.get(transactionId);
  if (t === undefined) {
    throw new EtpError(
      `Transaction ${transactionId} does not exists`,
      ErrorCode.ENOT_FOUND
    );
  }
  clearTimeout(t.timeoutId);
  clearInterval(t.pingIntervalId);
  if (!t.client.isConnected()) {
    etpClients.delete(transactionId);
    throw new EtpError(
      `Transaction ${transactionId} connection was lost`,
      ErrorCode.EINVALID_STATE
    );
  }
  t.client.offDisconnect(t.onDisconnect);
  await t.client
    .commitTransaction(EtpUri.uuidStringToByteArray(transactionId))
    .catch(err => {
      etpClients.delete(transactionId);
      throw new EtpError(err.message, err.code);
    });
  await t.client.closeSession();
  return etpClients.delete(transactionId);
};

/**
 * Rollback the transaction
 *
 * @param {string} transactionId Transaction identifier
 * @returns
 */
export const rollbackTransaction = async (
  transactionId: string
): Promise<boolean> => {
  const t = etpClients.get(transactionId);
  if (t === undefined) {
    throw new EtpError(
      `Transaction ${transactionId} does not exists`,
      ErrorCode.ENOT_FOUND
    );
  }
  clearTimeout(t.timeoutId);
  clearInterval(t.pingIntervalId);
  if (!t.client.isConnected()) {
    etpClients.delete(transactionId);
    throw new EtpError(
      `Transaction ${transactionId} connection was lost`,
      ErrorCode.EINVALID_STATE
    );
  }
  t.client.offDisconnect(t.onDisconnect);
  await t.client
    .rollbackTransaction(EtpUri.uuidStringToByteArray(transactionId))
    .catch(err => {
      etpClients.delete(transactionId);
      throw new EtpError(err.message, err.code);
    });
  await t.client.closeSession();
  return etpClients.delete(transactionId);
};

/**
 * Create the string part of etp uri based on REST query
 *
 * @param {QueryInput} query
 * @returns {string}
 */
const createQueryString = (query: QueryInput): string => {
  let queryString = "";
  if (query.filter) {
    queryString += `$filter=${query.filter}`;
  }

  if (query.orderby) {
    queryString += `${queryString ? "&" : ""}$orderby=${query.orderby}`;
  }
  if (query.top) {
    queryString += `${queryString ? "&" : ""}$top=${query.top}`;
  }
  if (query.skip) {
    queryString += `${queryString ? "&" : ""}$skip=${query.skip}`;
  }
  return queryString ? "?" + queryString : "";
};

/**
 * Compute context structure from request
 *
 * @param {ContextInput} context
 * @param {QueryInput} query
 * @returns {Energistics.Etp.v12.Datatypes.Object.ContextInfo}
 */
const getContext = (
  context: ContextInput,
  query: QueryInput
): Energistics.Etp.v12.Datatypes.Object.ContextInfo => {
  if (Object.keys(query).length > 0) {
    context.uri += createQueryString(query);
  }

  const navigable: Energistics.Etp.v12.Datatypes.Object.RelationshipKind =
    Energistics.Etp.v12.Datatypes.Object.RelationshipKind[
      context.navigableEdges || "Both"
    ];

  return {
    uri: context.uri,
    depth: context.depth ? +context.depth : 1,
    dataObjectTypes: context.dataObjectTypes ?? [],
    navigableEdges: navigable,
    includeSecondaryTargets: context.includeSecondaryTargets ?? false,
    includeSecondarySources: context.includeSecondarySources ?? false
  };
};

/**
 * Find all the resources from REST request
 *
 * @param {ResqmlClient} c
 * @param {ContextInput} contextInput
 * @param {QueryInput} query
 * @param {("self" | "sources" | "targets")} [queryScope="self"]
 * @param {boolean} [countObjects=false]
 * @param {DateRequest} [storeLastWriteFilter]
 * @param {Map<URI, IResqmlDataObject>} [objects]
 * @returns {Promise<Energistics.Etp.v12.Datatypes.Object.Resource[]>}
 */
export const findResources = async (
  c: ResqmlClient,
  contextInput: ContextInput,
  query: QueryInput,
  queryScope: "self" | "sources" | "targets" = "self",
  countObjects = false,
  storeLastWriteFilter?: Date,
  objects?: Map<URI, IResqmlDataObject>
): Promise<Energistics.Etp.v12.Datatypes.Object.Resource[]> => {
  const context = getContext(contextInput, query);

  const scope: Energistics.Etp.v12.Datatypes.Object.ContextScopeKind =
    Energistics.Etp.v12.Datatypes.Object.ContextScopeKind[queryScope];

  return c.getResources(
    context,
    scope,
    context.dataObjectTypes,
    countObjects,
    storeLastWriteFilter
      ? BigInt(storeLastWriteFilter.getTime()) * BigInt(1000)
      : null,
    null,
    objects
  );
};

/**
 * Find all the resources from REST request and the link between these resources
 *
 * @param {ResqmlClient} c Resqml client already connected to the server
 * @param {ContextInput} contextInput Context of the request (uri, depth, dataObjectTypes, navigableEdges, includeSecondaryTargets, includeSecondarySources)
 * @param {QueryInput} query Query of the request (filter, orderby, top, skip)
 * @param {("self" | "sources" | "targets")} [queryScope="self"] Scope of the request
 * @param {boolean} [countObjects=false] Indicates that the server is requested to provide the source and target count
 * @param {DateRequest} [storeLastWriteFilter] Filter on the last write date
 * @param {Map<URI, IResqmlDataObject>} [objects] Map of the objects already loaded, used to avoid loading the same object twice
 * @returns {Promise<ResourceGraph>} Resource graph containing the resources and the links between them
 * @throws {Error} If the request failed
 * @throws {Error} If the token is invalid
 */
export const graphResources = async (
  c: ResqmlClient,
  contextInput: ContextInput,
  query: QueryInput,
  queryScope: "self" | "sources" | "targets" = "self",
  countObjects = false,
  storeLastWriteFilter?: Date,
  objects?: Map<URI, IResqmlDataObject>
): Promise<ResourceGraph> => {
  const context = getContext(contextInput, query);

  const scope: Energistics.Etp.v12.Datatypes.Object.ContextScopeKind =
    Energistics.Etp.v12.Datatypes.Object.ContextScopeKind[queryScope];

  return c.getGraph(
    context,
    scope,
    countObjects,
    context.dataObjectTypes,
    storeLastWriteFilter
      ? BigInt(storeLastWriteFilter.getTime()) * BigInt(1000)
      : null,
    null,
    objects
  );
};

/**
 * Check if an error is an ETPError
 *
 * @param err object to test against as error
 * @returns
 */
export function isEtpError(err: unknown): err is EtpError {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    typeof (err as EtpError).code === "number"
  );
}

/**
 * Create a HttpException from an ETPError
 *
 * @param {unknown} error EtpError
 * @returns {HttpException}
 */
export const httpErrorFromEtpError = (error: unknown): HttpException => {
  //add a typeguard to check if err is an EtpError
  if (isEtpError(error)) {
    logger.error("[ETP] Error while making request:", {
      errorCode: error.code,
      message: error.message
    });
    if (
      error.code == ErrorCode.EAUTHORIZATION_REQUIRED ||
      error.code == ErrorCode.EREQUEST_DENIED
    ) {
      return new UnauthorizedException({ description: error.message });
    } else if (error.code == ErrorCode.ENOT_FOUND) {
      return new NotFoundException({ description: error.message });
    } else if (
      error.code == ErrorCode.EINVALID_URI ||
      error.code == ErrorCode.EINVALID_ARGUMENT ||
      error.code == ErrorCode.EMAXSIZE_EXCEEDED
    ) {
      return new BadRequestException({ description: error.message });
    } else if (
      error.code == ErrorCode.EINVALID_STATE ||
      error.code == ErrorCode.EMAX_TRANSACTIONS_EXCEEDED
    ) {
      return new PreconditionFailedException({ description: error.message });
    } else if (
      error.code == ErrorCode.ENOSUPPORTEDPROTOCOLS ||
      error.code == ErrorCode.EINVALID_MESSAGETYPE ||
      error.code == ErrorCode.ENOTSUPPORTED ||
      error.code == ErrorCode.ENOSUPPORTEDFORMATS ||
      error.code == ErrorCode.ENOSUPPORTEDDATAOBJECTTYPES
    ) {
      return new NotImplementedException({ description: error.message });
    }
  }
  if (error && typeof error === "object" && "message" in error) {
    logger.error(error.message);
  }
  logger.error("Error while making request:", {
    error: JSON.stringify(error, null, 2)
  });
  return new BadRequestException({
    description: `Cannot process this request: ${
      error && typeof error === "object" && "message" in error
        ? error.message
        : ""
    }`
  });
};
