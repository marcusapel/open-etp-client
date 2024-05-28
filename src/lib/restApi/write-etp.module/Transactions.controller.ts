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
  Delete,
  Param,
  Post,
  Put,
  Req,
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
  ApiTags,
  ApiTooManyRequestsResponse
} from "@nestjs/swagger";

import { IsUUID } from "@nestjs/class-validator";

import express from "express";

import { EtpUri } from "../../client/ResqmlClient";

import {
  FindInDataSpaceParams,
  HasBearerGuard,
  HasDataPartitionGuard,
  commitTransaction,
  createTransaction,
  errorMessageSchema,
  extractToken,
  httpErrorFromEtpError,
  partitionPattern,
  patternString,
  rollbackTransaction,
  swaggerServers,
  uuidPattern
} from "../ControllerUtils";

/**
 * Add parameters to identify transaction in the data space
 *
 * @export
 * @class TransactionParams
 */
export class TransactionParams extends FindInDataSpaceParams {
  @ApiProperty({
    name: "transactionId",
    description: "Unique Id of the object",
    example: "1615d8d2-2a2d-482c-885e-14225b89e90c",
    maxLength: 2048,
    pattern: patternString(uuidPattern)
  })
  @IsUUID()
  transactionId!: string;
}

const partitionId = process.env.DATA_PARTITION_ID ?? "data-partition-id";

/**
 * Creation, edition and deletion of resources
 *
 * @export
 * @class MutationsAPI
 */
@ApiBearerAuth("access-token")
@UseGuards(HasBearerGuard("jwt"))
@ApiHeader({
  name: "data-partition-id",
  description: "Data partition id (ex. 'osdu')",
  schema: {
    type: "string",
    example: partitionId,
    maxLength: 1048,
    pattern: patternString(partitionPattern)
  }
})
@UseGuards(HasDataPartitionGuard())
@ApiTags("Transactions")
@ApiForbiddenResponse(errorMessageSchema("Forbidden", 403))
@ApiNotFoundResponse(errorMessageSchema("Not found", 404))
@ApiNotAcceptableResponse(errorMessageSchema("Not acceptable response", 406))
@ApiTooManyRequestsResponse(errorMessageSchema("Too many request", 429))
@ApiInternalServerErrorResponse(errorMessageSchema(`Unknown Error`, 500))
@ApiDefaultResponse(errorMessageSchema(`Unknown Error`, 500))
@Controller("dataspaces/:dataspaceId/transactions")
export default class TransactionsAPI {
  /**
   * Create a new transaction
   *
   * @memberof MutationsAPI
   */
  @Post()
  @ApiOkResponse({
    description: "Success",
    schema: {
      type: "string",
      maxLength: 256,
      pattern: patternString(uuidPattern)
    }
  })
  @ApiOperation({
    summary: "Create new transaction.",
    description: `Create new transaction.
  Returns a transaction ID that can be used to commit (Put) or rollback(Delete)`,
    servers: swaggerServers
  })
  public async PostTransaction(
    @Param() params: FindInDataSpaceParams,
    @Req() request?: express.Request
  ): Promise<string> {
    const uri = EtpUri.createDataSpaceUri(params.dataspaceId).uri;
    try {
      // Snyk is reporting this as an XSS issue, but as we ensure token as the right format it can be ignored.
      return createTransaction(extractToken(request), uri);
    } catch (err) {
      throw httpErrorFromEtpError(err);
    }
  }

  /**
   * Commit an existing transaction
   *
   * @memberof MutationsAPI
   */
  @Put(":transactionId")
  @ApiOkResponse({
    description: "Success",
    schema: {
      type: "boolean"
    }
  })
  @ApiOperation({
    summary: "Commit transaction.",
    description: `Commit a transaction using the ID provided by Post.`,
    servers: swaggerServers
  })
  public async CommitTransaction(
    @Param() params: TransactionParams,
    @Req() request?: express.Request
  ): Promise<boolean> {
    try {
      const r = await commitTransaction(
        extractToken(request),
        params.transactionId
      );
      return r;
    } catch (err) {
      throw httpErrorFromEtpError(err);
    }
  }

  /**
   * Rollback an existing transaction
   *
   * @memberof MutationsAPI
   */
  @Delete(":transactionId")
  @ApiOkResponse({
    description: "Success",
    schema: {
      type: "boolean"
    }
  })
  @ApiOperation({
    summary: "Rollback transaction.",
    description: `Rollback a transaction using the ID provided by Post.`,
    servers: swaggerServers
  })
  public async RollbackTransaction(
    @Param() params: TransactionParams,
    @Req() request?: express.Request
  ): Promise<boolean> {
    try {
      const r = await rollbackTransaction(
        extractToken(request),
        params.transactionId
      );
      return r;
    } catch (err) {
      throw httpErrorFromEtpError(err);
    }
  }
}
