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
  Body,
  Controller,
  Delete,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";

import {
  ApiBearerAuth,
  ApiBody,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiTooManyRequestsResponse
} from "@nestjs/swagger";

import {
  Matches,
  MaxLength,
  IsOptional,
  IsObject,
  IsString,
  IsNotEmpty
} from "class-validator";

import express from "express";

import {
  DataValue,
  Energistics,
  EtpUri,
  ResqmlClient
} from "../../client/ResqmlClient";

import Logging from "../../common/Logging";
const logger = Logging.getLogger("EtpClient");

import {
  FindInDataSpaceParams,
  HasBearerGuard,
  alphaSpaceSchema,
  createSession,
  dataspaceNamePattern,
  errorMessageSchema,
  extractDataPartitionId,
  extractToken,
  getSchemasForType,
  httpErrorFromEtpError,
  patternString,
  swaggerServers
} from "../ControllerUtils";

import {
  dataspacePathPattern,
  dataspaceUriPattern
} from "../read-etp.module/Resource.controller";

import { EtpDataValue } from "../../common/EtpTypes";

export class DataspaceDto {
  @ApiProperty({
    name: "DataspaceId",
    description: "Name of dataspace",
    type: "string",
    example: "demo/Volve",
    maxLength: 2048,
    pattern: patternString(dataspaceNamePattern)
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2048)
  @Matches(dataspaceNamePattern)
  DataspaceId!: string;

  @ApiProperty({
    name: "Path",
    description: "Path of dataspace",
    type: "string",
    example: "demo/Volve",
    maxLength: 2048,
    required: false,
    pattern: patternString(dataspacePathPattern)
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  @Matches(dataspaceNamePattern)
  Path?: string;

  @ApiProperty({
    name: "CustomData",
    description: "Additional data",
    example: { key: "value" },
    type: "object",
    required: false,
    additionalProperties: alphaSpaceSchema
  })
  @IsOptional()
  @IsObject()
  CustomData?: any;
}

/**
 * Creation and deletion of dataspaces
 *
 * @export
 * @class DataspaceMutationsAPI
 */
@ApiBearerAuth("access-token")
@UseGuards(HasBearerGuard("jwt"))
@ApiTags("Write")
@ApiForbiddenResponse(errorMessageSchema("Forbidden", 403))
@ApiNotFoundResponse(errorMessageSchema("Not found", 404))
@ApiNotAcceptableResponse(errorMessageSchema("Not acceptable response", 406))
@ApiTooManyRequestsResponse(errorMessageSchema("Too many request", 429))
@ApiInternalServerErrorResponse(errorMessageSchema(`Unknown Error`, 500))
@ApiDefaultResponse(errorMessageSchema(`Unknown Error`, 500))
@Controller("dataspaces")
export default class DataspaceMutationsAPI {
  /**
   * Create a new dataspace
   *
   * @memberof DataspaceMutationsAPI
   */
  @Post("")
  @ApiOperation({
    summary: "Create new dataspaces.",
    description: `Create new dataspaces.`,
    servers: swaggerServers
  })
  @ApiBody({
    description: "JSON array of Dataspace description",
    schema: {
      type: "array",
      maxItems: 10000,
      items: getSchemasForType(DataspaceDto)
    },
    examples: {
      externalPartReference: {
        value: [
          {
            DataspaceId: "projectA/Scenario1",
            Path: "projectA/Scenario1",
            CustomData: {
              viewers: ["data.default.viewers@osdu.example.com"],
              owners: ["data.default.owners@osdu.example.com"],
              legaltags: ["osdu-ReservoirDDMS-Legal-Tag"],
              otherRelevantDataCountries: ["US", "UK"],
              key: "value"
            }
          }
        ]
      }
    }
  })
  @ApiOkResponse({
    status: 201,
    description: "Success",
    schema: {
      type: "array",
      maxItems: 1000,
      items: {
        type: "string",
        maxLength: 2048,
        pattern: patternString(dataspaceUriPattern)
      }
    }
  })
  public async PostDataspace(
    @Body() requestBody: DataspaceDto[],
    @Req() request?: express.Request
  ): Promise<string[]> {
    let c: ResqmlClient | undefined = undefined;
    try {
      const dataspaces: Energistics.Etp.v12.Datatypes.Object.Dataspace[] =
        requestBody.map(d => {
          const uri = EtpUri.createDataSpaceUri(d.DataspaceId).uri;
          const customData = new Map<string, DataValue>();
          if (d.CustomData) {
            for (const e in d.CustomData) {
              customData.set(e, EtpDataValue.fromUnknown(d.CustomData[e]));
            }
          }
          return {
            uri,
            path: d.Path ?? d.DataspaceId,
            customData,
            storeLastWrite: BigInt(Date.now()),
            storeCreated: BigInt(Date.now())
          };
        });
      c = await createSession(
        extractToken(request),
        extractDataPartitionId(request)
      );
      const projects = await c.createDataspaces(dataspaces);
      if (!projects) {
        throw new InternalServerErrorException("Unable to create Dataspaces");
      }
      await c.closeSession();
      return dataspaces.map(d => d.uri);
    } catch (err) {
      await c?.closeSession();
      throw httpErrorFromEtpError(err);
    }
  }

  /**
   * Duplicate a dataspace
   *
   * @memberof DataspaceMutationsAPI
   */
  @Post(":dataspaceId/clone")
  @ApiOperation({
    summary: "Duplicate a dataspace.",
    description: `Duplicate a dataspace.`,
    servers: swaggerServers
  })
  @ApiBody({
    description: "New Dataspace description",
    schema: getSchemasForType(DataspaceDto),
    examples: {
      "New Scenario description": {
        value: {
          DataspaceId: "projectA/Scenario2",
          Path: "projectA/Scenario2",
          CustomData: { key: "value" }
        }
      }
    }
  })
  @ApiOkResponse({
    status: 201,
    description: "Success",
    schema: {
      type: "string",
      maxLength: 2048,
      pattern: patternString(dataspaceUriPattern)
    }
  })
  public async CloneDataspace(
    @Param() params: FindInDataSpaceParams,
    @Body() requestBody: DataspaceDto,
    @Req() request?: express.Request
  ): Promise<string> {
    let c: ResqmlClient | undefined = undefined;
    try {
      const customData = new Map<string, DataValue>();
      if (requestBody.CustomData) {
        for (const e in requestBody.CustomData) {
          customData.set(
            e,
            EtpDataValue.fromUnknown(requestBody.CustomData[e])
          );
        }
      }
      c = await createSession(
        extractToken(request),
        extractDataPartitionId(request)
      );
      const uri = EtpUri.createDataSpaceUri(params.dataspaceId).uri;
      const dataspaces = await c.cloneDataspace(
        requestBody.DataspaceId,
        requestBody.Path ?? requestBody.DataspaceId,
        uri,
        customData
      );
      await c.closeSession();
      if (!dataspaces) {
        throw new InternalServerErrorException("Unable to clone Dataspaces");
      }
      return uri;
    } catch (err) {
      try {
        await c?.closeSession();
      } catch (closeError) {
        logger.error("Could not successfully close connection.");
      }
      throw httpErrorFromEtpError(err);
    }
  }

  /**
   * Delete dataspace
   *
   * @memberof MutationsAPI
   */
  @Delete(":dataspaceId")
  @ApiNoContentResponse()
  @HttpCode(204)
  @ApiOperation({
    summary: "Delete existing dataspace.",
    description: `Delete existing dataspace.`,
    servers: swaggerServers
  })
  public async DeleteDataspace(
    @Param() params: FindInDataSpaceParams,
    @Req() request?: express.Request
  ): Promise<void> {
    let c: ResqmlClient | undefined = undefined;
    try {
      const uri = EtpUri.createDataSpaceUri(params.dataspaceId).uri;
      c = await createSession(
        extractToken(request),
        extractDataPartitionId(request)
      );
      await c.deleteDataspaces([uri]);
      await c.closeSession();
    } catch (err) {
      await c?.closeSession();
      throw httpErrorFromEtpError(err);
    }
  }
}
