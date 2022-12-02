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

import { Controller, Get, InternalServerErrorException } from "@nestjs/common";

import {
  ApiDefaultResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse
} from "@nestjs/swagger";

import { errorMessageSchema, swaggerServers } from "../ControllerUtils";

import {
  etpServerHost,
  etpServerPath,
  etpServerPort,
  etpServerProtocol
} from "../../common/config";

import http from "http";
import https from "https";

/**
 * Class for checking service health
 *
 * @export
 * @class HealthAPI
 */
@ApiTags("Health")
@ApiNotFoundResponse(errorMessageSchema("Not found", 404))
@ApiNotAcceptableResponse(errorMessageSchema("Not acceptable response", 406))
@ApiTooManyRequestsResponse(errorMessageSchema("Too many request", 429))
@ApiDefaultResponse(errorMessageSchema(`Unknown Error`, 500))
@Controller("health")
export default class HealthAPI {
  /**
   * Checking service readiness and access to underlying data repository
   *
   * @memberof HealthAPI
   */
  @Get("readiness")
  @ApiOkResponse({ description: "Success", type: Boolean })
  @ApiInternalServerErrorResponse(errorMessageSchema("Unknown Error"))
  @ApiOperation({
    summary: "Check the readiness of the server.",
    description: `Used by to check server availability. Can be used by orchestrator for services availability`,
    security: [],
    servers: swaggerServers
  })
  public IsReady(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const prot = etpServerProtocol === "wss" ? https : http;
        const url = `${
          etpServerProtocol === "wss" ? "https" : "http"
        }://${etpServerHost}:${etpServerPort}${etpServerPath}/.well-known/etp-server-capabilities?GetVersion=etp12.energistics.org`;
        const req = prot
          .get(url, response => {
            if (response.statusCode === 200 || response.statusCode === 301) {
              resolve(true);
            } else {
              throw new InternalServerErrorException({
                description: "Server not available"
              });
            }
          })
          .on("error", () => {
            reject("Server not available");
          });
        req.end();
      } catch (e) {
        throw new InternalServerErrorException({
          description: "Unknown Server Error"
        });
      }
    });
  }

  /**
   * Checking service liveness
   *
   * @memberof HealthAPI
   */
  @Get("liveness")
  @ApiOkResponse({ description: "Success", type: Boolean })
  @ApiInternalServerErrorResponse(errorMessageSchema("Unknown Error"))
  @ApiOperation({
    summary: "Check liveness of the server.",
    description: `Used by to check server availability. Can be used by orchestrator for services availability`,
    security: [],
    servers: swaggerServers
  })
  public IsLive(): Promise<boolean> {
    return new Promise(resolve => {
      try {
        resolve(true);
      } catch (e) {
        throw new InternalServerErrorException({
          description: "Unknown Server Error"
        });
      }
    });
  }
}
