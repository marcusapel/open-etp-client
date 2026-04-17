import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";

import {
  ApiBearerAuth,
  ApiBody,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse
} from "@nestjs/swagger";

import express from "express";

import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

import {
  EmlObjectDto,
  arrayMetadataQueryParam,
  arrayValuesQueryParam,
  formatQueryParam,
  referencedContentQueryParam,
  sendObjects
} from "./Object.controller";

import {
  HasBearerGuard,
  OptionalParseBoolPipe,
  createSession,
  errorMessageSchema,
  extractDataPartitionId,
  extractToken,
  getSchemasForType,
  patternString,
  swaggerServers
} from "../ControllerUtils";

import { uriPattern } from "./Resource.controller";

const xmlDocPattern = /^<\?xml.+$/;

export class UrisDto {
  @ApiProperty({
    name: "uris",
    type: [String],
    maxItems: 99999,
    maxLength: 2048,
    example: [
      "eml:///dataspace('demo/Volve')/resqml20.obj_TriangulatedSetRepresentation(a3f31b20-c93a-4682-8f6c-71be087202a4)",

      "eml:///dataspace('demo/Volve')/resqml20.obj_ContinuousProperty(1615d8d2-2a2d-482c-885e-14225b89e90c)"
    ],
    pattern: patternString(uriPattern)
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  uris!: string[];
}

@ApiBearerAuth("access-token")
@UseGuards(HasBearerGuard("jwt"))
@ApiTags("Resources")
@ApiForbiddenResponse(errorMessageSchema("Forbidden", 403))
@ApiNotFoundResponse(errorMessageSchema("Not found", 404))
@ApiNotAcceptableResponse(errorMessageSchema("Not acceptable response", 406))
@ApiTooManyRequestsResponse(errorMessageSchema("Too many request", 429))
@ApiInternalServerErrorResponse(errorMessageSchema(`Unknown Error`, 500))
@ApiDefaultResponse(errorMessageSchema(`Unknown Error`, 500))
@Controller("dataspaces/multi-resources")
export default class MultiObjectsReadAPI {
  @Post("get-content")
  @ApiOperation({
    summary: "Get content or multiple objects.",
    description: `Get the actual content of a data objects using a list of uris,
    formatted as xml or json.`,
    servers: swaggerServers
  })
  @ApiBody({
    schema: getSchemasForType(UrisDto)
  })
  @ApiQuery(formatQueryParam)
  @ApiQuery(referencedContentQueryParam)
  @ApiQuery(arrayValuesQueryParam)
  @ApiQuery(arrayMetadataQueryParam)
  @ApiOkResponse({
    description: "Success",
    content: {
      "application/x-resqml+xml": {
        schema: {
          type: "string",
          maxLength: 200000,
          pattern: patternString(xmlDocPattern)
        }
      },
      "application/json": {
        schema: {
          type: "array",
          maxItems: 256,
          additionalProperties: false,
          items: getSchemasForType(EmlObjectDto, true)
        }
      }
    }
  })
  public async GetDataObjects(
    @Body() body: UrisDto,
    @Req() request: express.Request,
    @Res() res: express.Response,
    @Query("$format") format: "xml" | "json" = "json",
    @Query("referencedContent", OptionalParseBoolPipe) referencedContent = true,
    @Query("arrayValues", OptionalParseBoolPipe) arrayValues = false,
    @Query("arrayMetadata", OptionalParseBoolPipe) arrayMetadata = false
  ): Promise<void> {
    const uris = body.uris;
    if (!uris) {
      throw new BadRequestException({
        description: `Invalid request body: 'uris' must be a non-empty array`
      });
    }
    if (!format || format === "xml") {
      res.set("Content-Type", "application/x-resqml+xml");
    } else {
      res.set("Content-Type", "application/json");
    }
    let c = undefined;
    try {
      c = await createSession(
        extractToken(request),
        extractDataPartitionId(request)
      );

      const b = await sendObjects(
        {},
        c,
        uris,
        format,
        referencedContent,
        arrayValues,
        arrayMetadata
      );
      res.send(b);
      await c.closeSession();
      c = undefined;
    } catch (err) {
      await c?.closeSession();
      throw new InternalServerErrorException(
        err instanceof Error ? err : { description: `Unknown Error` }
      );
    }
  }
}
