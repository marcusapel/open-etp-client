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

import * as crypto from "crypto";
const getSHA256 = (input: string) => {
  return crypto.createHash("sha256").update(input).digest("hex");
};

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
  CanActivate,
  ExecutionContext,
  PipeTransform,
  Type
} from "@nestjs/common";

const serverProtocol = process.env.RDMS_ETP_PROTOCOL || "ws";
const serverHost = process.env.RDMS_ETP_HOST || "localhost";
const serverPort = process.env.RDMS_ETP_PORT || "9004";
const serverPath = process.env.RDMS_ETP_PATH || "";
const serverUrl = `${serverProtocol}://${serverHost}:${serverPort}${serverPath}/`;

export const mainUrl = process.env.RDMS_REST_MAIN_URL || "http://localhost";
const routePathVal = process.env.RDMS_REST_ROOT_PATH || "/Reservoir/v2";
export const routePath = routePathVal;
const portVal = parseInt(process.env.RDMS_REST_PORT || "8003");
export const port = portVal;

const swaggerUIUrlVal = `${mainUrl}${port === 80 ? "" : ":" + port
  }${routePath}`;
export const swaggerUIUrl = swaggerUIUrlVal;

export const swaggerServers = [
  { url: swaggerUIUrl, description: "API server" }
];

const etpClients = new Map<string, { client: ResqmlClient; sha256: string }>();

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
) {
  if (start) {
    return arr.slice(start, count ? start + count : undefined);
  }
  return count !== undefined ? arr.slice(0, count) : arr;
}

/**
 * Convert from Values so String
 *
 * @param {Energistics.Etp.v12.Datatypes.Object.Resource} d
 * @returns {Record<string, string> | undefined}
 */
export const toJSonCustomData = (
  d: Map<string, Energistics.Etp.v12.Datatypes.DataValue> | undefined
): Record<string, string> | undefined => {
  if (!d) {
    return undefined;
  }
  const o: Record<string, string> = {};
  return Object.keys(d).reduce((obj, key: string) => {
    const val = d.get(key);
    if (val && val.item) {
      obj[key] = val.item.toString();
    }
    return obj;
  }, o);
};

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

  if (!authHeader) {
    return "";
  }
  const token = authHeader.split(" ");
  if (token.length < 2) {
    return "";
  }
  return token[1];
};

/**
 * Extract data-partiton-id value from request
 *
 * @param {express.Request} [request]
 * @returns {string | undefined}
 */
export const extractDataPartitionId = (request?: express.Request): string | undefined => {
  const header: string | undefined = request?.header('data-partition-id');
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
          type: "number",
          format: "integer",
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
 * Check data-partition-id header presence for multipartition mode
 *
 * @param {(string | string[])} [type]
 * @returns
 */
export const HasDataPartitonGuard: () => CanActivate = () => {
  return {
    canActivate: (context: ExecutionContext) => {
      if (process.env.RDMS_DATA_PARTITION_MODE === 'single') {
        return true;
      } else {
        const request = context.switchToHttp().getRequest();
        const dataPartitionIdHeader = extractDataPartitionId(request);

        return !!dataPartitionIdHeader;
      }
    }
  }
}

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
export class OptionalParseIntArrayPipe implements PipeTransform<string[]> {
  transform(value: string[] | undefined): Promise<number[] | undefined> {
    return Promise.resolve(value ? value.map(v => parseInt(v)) : undefined);
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

const modelPropertiesAccessor = new ModelPropertiesAccessor();
const swaggerTypesMapper = new SwaggerTypesMapper();
const schemaObjectFactory = new SchemaObjectFactory(
  modelPropertiesAccessor,
  swaggerTypesMapper
);

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

/**
 * Return the current server Host URL
 *
 * @returns {string}
 */
export const etpServerHost = (): string => serverHost;
/**
 * Return the current server Host Port
 *
 * @returns {string}
 */
export const etpServerPort = (): string => serverPort;

/*!
 * Create and open a session, and return the client
 */
export const createSession = async (
  jwt: string,
  dataPartitionId?: string,
  options?: IOptions,
  id?: string
) => {
  if (id) {
    const c1 = etpClients.get(id);
    if (c1 && c1.sha256 === getSHA256(jwt)) {
      return c1.client;
    }
    throw new Error(`Transaction ${id} does not exists`);
  } else {
    const c = new ResqmlClient(options);
    return c
      .openSession(serverUrl, jwt, dataPartitionId)
      .then(() => c)
      .catch(err => {
        throw new Error(`Cannot create session with ETP server: ${err}`);
      });
  }
};

/**
 * Create and open a session associated with a transaction, and return the client
 *
 * @param {string} jwt JSON web token
 * @param {string} dataspace Uri of dataspace where transaction will occur
 * @param {IOptions} [options]
 * @returns Transaction identifier (uuid as string)
 */
export const createTransaction = async (
  jwt: string,
  dataspace: string,
  options?: IOptions
) => {
  const c = new ResqmlClient(options);
  return c
    .openSession(serverUrl, jwt)
    .then(() =>
      c.startTransaction(
        false,
        [dataspace],
        `Creating transaction for dataspace ${dataspace}`
      )
    )
    .then(id => {
      const idString = EtpUri.uuidByteArrayToString(id);
      etpClients.set(idString, {
        client: c,
        sha256: getSHA256(jwt)
      });
      return idString;
    })
    .catch(err => {
      throw new Error(`Cannot create session with ETP server: ${err}`);
    });
};

/**
 * Commit the transaction
 *
 * @param {string} jwt JSON web token
 * @param {string} transactionId Transaction identifier
 * @returns
 */
export const commitTransaction = async (jwt: string, transactionId: string) => {
  const t = etpClients.get(transactionId);
  if (t?.sha256 !== getSHA256(jwt)) {
    throw new Error(`Invalid token`);
  }
  return t.client
    .commitTransaction(EtpUri.uuidStringToByteArray(transactionId))
    .then(() => etpClients.delete(transactionId))
    .catch(err => {
      throw new Error(`Cannot create session with ETP server: ${err}`);
    });
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

  const navigable: Energistics.Etp.v12.Datatypes.Object.RelationshipKind = (
    Energistics.Etp.v12.Datatypes.Object.RelationshipKind as any
  )[context.navigableEdges || "Both"];

  return {
    uri: context.uri,
    depth: context.depth ? +context.depth : 1,
    dataObjectTypes: context.dataObjectTypes || [],
    navigableEdges: navigable,
    includeSecondaryTargets: context.includeSecondaryTargets || false,
    includeSecondarySources: context.includeSecondarySources || false
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

  const scope: Energistics.Etp.v12.Datatypes.Object.ContextScopeKind = (
    Energistics.Etp.v12.Datatypes.Object.ContextScopeKind as any
  )[queryScope || "self"];

  return c.getResources(
    context,
    scope,
    context.dataObjectTypes,
    countObjects,
    storeLastWriteFilter
      ? BigInt(storeLastWriteFilter.getTime()) * BigInt(1000)
      : null,
    objects
  );
};
