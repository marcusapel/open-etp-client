// ============================================================================
// Copyright 2019-2021 Emerson Paradigm Holding LLC. All rights reserved.
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
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";

import {
  ApiBearerAuth,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse
} from "@nestjs/swagger";

import {
  HasBearerGuard,
  HasDataPartitionGuard,
  createSession,
  errorMessageSchema,
  extractDataPartitionId,
  extractToken,
  getSchemasForType,
  patternString,
  swaggerServers
} from "../ControllerUtils";

import { uriPattern, versionQueryParam } from "./Resource.controller";

import { decode } from "jsonwebtoken";
import express from "express";

import { OSDUContext } from "../../jsonTypes/OsduContext";
import { createManifest } from "../../jsonTypes/Manifest";
import { JwtPayload } from "jsonwebtoken";

const emailPattern =
  /^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$/;

export class ACLDto {
  @ApiProperty({
    name: "viewers",
    type: [String],
    maxItems: 99999,
    maxLength: 2048,
    description: "List of groups with viewer role for the dataspace",
    example: ["data.rdms-mygroup.viewers@mypartition.mycompany.com"],
    pattern: patternString(emailPattern)
  })
  viewers!: string[];

  @ApiProperty({
    name: "owners",
    type: [String],
    maxItems: 99999,
    maxLength: 2048,
    description: "List of groups with owner role for the dataspace",
    example: ["data.rdms-mygroup.owners@mypartition.mycompany.com"],
    pattern: patternString(emailPattern)
  })
  owners!: string[];
}

export class LegaltagsDto {
  @ApiProperty({
    name: "legaltags",
    type: [String],
    maxItems: 99999,
    maxLength: 2048,
    description: "List of legal tags",
    example: ["my.legal.tags"]
  })
  legaltags!: string[];

  @ApiProperty({
    name: "otherRelevantDataCountries",
    type: [String],
    maxItems: 99999,
    maxLength: 2048,
    description: "List of other countries involved in legal tags",
    example: ["US", "UK"],
    pattern: patternString(/^[A-Z]{2}$/)
  })
  otherRelevantDataCountries!: string[];
}

/**
 * Represents the input for manifest creation
 *
 * @export
 * @class ManifestInputDto
 */
export class ManifestInputDto {
  @ApiProperty({
    name: "uris",
    type: [String],
    maxItems: 99999,
    maxLength: 2048,
    description: `Uris of resources to generate a manifest for.`,
    example: [
      "eml:///dataspace('demo/Volve')/resqml20.obj_TriangulatedSetRepresentation(a3f31b20-c93a-4682-8f6c-71be087202a4)",
      "eml:///dataspace('demo/Volve')/resqml20.obj_ContinuousProperty(1615d8d2-2a2d-482c-885e-14225b89e90c)"
    ],
    pattern: patternString(uriPattern)
  })
  uris!: string[];

  @ApiPropertyOptional({
    name: "acl",
    type: ACLDto,
    description: `OSDU access control list information to apply.`,
    example: {
      viewers: ["data.rdms-mygroup.viewers@mypartition.mycompany.com"],
      owners: ["data.rdms-mygroup.owners@mypartition.mycompany.com"]
    }
  })
  acl?: ACLDto;

  @ApiPropertyOptional({
    name: "legal",
    description: `OSDU legal information to apply.`,
    type: LegaltagsDto
  })
  legal?: LegaltagsDto;

  @ApiPropertyOptional({
    name: "fileCollection",
    type: String,
    description: `When resources also included in file, provide file information to be added to manifest resources.`,
    example: "mypartition:dataset--FileCollection.Generic:myepcfile:",
    pattern: patternString(
      /^[\\w\\-\\.]+:dataset\\-\\-[\\w\\-\\.]+:[\\w\\-\\.\\:\\%]+$/
    )
  })
  fileCollection?: string;

  @ApiPropertyOptional({
    name: "tags",
    description: `Additional tags to add to all resources.`,
    example: `{"quality":"good"}`
  })
  tags?: Record<string, string>;

  @ApiPropertyOptional({
    name: "createMissingReferences",
    description: `If true, an entry corresponding to all references not currently present in OSDU storage will be added, else missing references will be added to an error list.`,
    type: Boolean,
    example: true
  })
  createMissingReferences?: boolean = true;
}

/**
 * Describe the Rest information of an eml object
 *
 * @export
 * @class ManifestDto
 */
export class ManifestDto {
  @ApiProperty({
    name: "kind",
    pattern: patternString(/osdu:wks:Manifest:1.0.0/),
    example: `osdu:wks:Manifest:1.0.0`,
    description: "OSDU manifest identifier.",
    maxLength: 2048
  })
  id!: string;
}

@ApiBearerAuth("access-token")
@UseGuards(HasBearerGuard("jwt"))
@ApiHeader({
  name: "data-partition-id",
  description: "Data partition id (ex. 'osdu')",
  example: "opendes"
})
@UseGuards(HasDataPartitionGuard())
@ApiTags("Manifest")
@ApiForbiddenResponse(errorMessageSchema("Forbidden", 403))
@ApiNotFoundResponse(errorMessageSchema("Not found", 404))
@ApiNotAcceptableResponse(errorMessageSchema("Not acceptable response", 406))
@ApiTooManyRequestsResponse(errorMessageSchema("Too many request", 429))
@ApiInternalServerErrorResponse(errorMessageSchema(`Unknown Error`, 500))
@ApiDefaultResponse(errorMessageSchema(`Unknown Error`, 500))
@Controller("manifests")
export default class ObjectsManifestAPI {
  @Post("build")
  @ApiOperation({
    summary: "Create OSDU manifest.",
    description: `Create the OSDU manifest for several resources.`,
    servers: swaggerServers
  })
  @ApiQuery(versionQueryParam)
  @ApiOkResponse({
    description: "Success",
    content: {
      "application/json": {
        schema: {
          type: "array",
          maxItems: 256,
          items: getSchemasForType(ManifestDto, true)
        }
      }
    }
  })
  public async GetManifest(
    @Body() body: ManifestInputDto,
    @Req() request: express.Request,
    @Res() res: express.Response
  ): Promise<void> {
    res.set("Content-Type", "application/json");
    let c = undefined;
    try {
      const bearer = extractToken(request);
      const jwt = bearer ? (decode(bearer) as JwtPayload) : {};
      const partition = extractDataPartitionId(request);

      const context = new OSDUContext(
        typeof partition === "string" ? partition : "osdu",
        body.acl ? body.acl : { viewers: [], owners: [] },
        body.legal
          ? body.legal
          : { legaltags: [], otherRelevantDataCountries: [] },
        jwt === null || typeof jwt === "string" ? undefined : jwt.unique_name,
        body.tags,
        body.fileCollection,
        body.createMissingReferences
      );

      context.bearer = bearer;

      // If connected to OSDU apis, check that the legal tags are part of the platform
      await context.checkLegalTags();

      c = await createSession(bearer, partition);
      const b = await createManifest(c, body.uris, context);
      await c.closeSession();
      c = undefined;
      res.send(b);
    } catch (err) {
      c?.closeSession();
      throw new InternalServerErrorException({
        description: err instanceof Error ? err.message : `Unknown Error`
      });
    }
  }
}
