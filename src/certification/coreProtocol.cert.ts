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

/**
 * This file certify the ETP Protocol 0: Core
 * Options for Protocol 0:
 * - supportApplicationAuthentication: true/false when server support application authentication
 * - supportTransportAuthentication: true/false when server support transport authentication
 */

import "jest";
import "http";
import "https";
import request from "supertest";
import { IncomingMessage } from "http";
import { client as WebSocketClient, connection } from "websocket";

import { ResqmlClient as ETPValidationClient } from "../index";

import { ErrorCode } from "../lib/common/EtpTypes";

import config, {
  describeif,
  failIfNoError,
  failIfError,
  itif,
  logger,
  successIfError
} from "./testConfig";

if (!config.etpServerUrl.startsWith("ws")) {
  logger.error("Invalid ETP server URL. Must start with ws:// or wss://");
  process.exit(1);
}

// HTTP/HTTPS request
describe("Protocol 0 - HTTP Authorization", () => {
  const restUrl = config.etpServerUrl.replace("ws", "http");

  it("VE0412-0: Connect succesfully to HTTP endpoint", async () => {
    const httpTest = request(`${restUrl}`);
    await httpTest
      .get(
        `/.well-known/etp-server-capabilities?GetVersion=etp12.energistics.org`
      )
      .expect(200);
  });
  it("VE0412-1: Contains Authorization details", async () => {
    const httpTest = request(`${restUrl}`);
    await httpTest
      .get(
        `/.well-known/etp-server-capabilities?GetVersion=etp12.energistics.org`
      )
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty("AuthorizationDetails");
        expect(response.body.AuthorizationDetails).toBeInstanceOf(Array);
        expect(response.body.AuthorizationDetails.length).toBeGreaterThan(0);
        expect(
          response.body.AuthorizationDetails.some(
            (auth: string) =>
              auth.match(
                /^Bearer authz_server=\\"https:\/\/[a-zA-Z\-_0-9]+(\/[a-zA-Z\-_0-9]+)+\\" scope=\\"[a-zA-Z\-_0-9]+\\"$/
              ) !== null
          )
        );
      });
  });
});

// Transport authentication
describeif(config.supportTransportAuthentication)(
  "Protocol 0 - Transport Authorization",
  () => {
    it("VE0521-1: TransportAuthentication: Connection successful with transport authentication and valid token", async () => {
      const client = new ETPValidationClient();
      await client
        .connect(config.etpServerUrl, config.jwtToken, config.dataPartition)
        .catch(failIfError)
        .finally(() => client.disconnect());
    });
    it("VE0521-2: Connection successful with transport authentication and valid token in URL", async () => {
      const client = new ETPValidationClient();
      await client
        .connect(
          `${config.etpServerUrl}/authorization=Bearer%20${config.jwtToken}`,
          undefined,
          config.dataPartition
        )
        .catch(failIfError)
        .finally(async () => await client.disconnect());
    });
    it("VE0521-3: Connection fail with transport authentication and invalid token", async () => {
      const client = new ETPValidationClient();
      await client
        .connect(config.etpServerUrl, config.jwtToken, config.dataPartition)
        .then(() => fail("Connection with invalid token should fail"))
        .catch(successIfError)
        .finally(async () => await client.disconnect());
    });
  }
);

// Application authentication
describeif(config.supportApplicationAuthentication)(
  "Protocol 0 - Application Authorization",
  () => {
    it("VE0521-4: Unauthorized session request fail with EAUTHORIZATION_REQUIRED code", async () => {
      const client = new ETPValidationClient();
      expect.assertions(2);
      await client
        .connect(config.etpServerUrl, undefined, config.dataPartition)
        .then(() => client.requestSession())
        .then(failIfNoError)
        .catch(err => {
          expect(err).toBeTruthy();
          expect(err.code).toBe(ErrorCode.EAUTHORIZATION_REQUIRED);
        })
        .finally(async () => client.disconnect());
    });
    it("VE0521-5: Session request succeeds after successfull Authorize ", async () => {
      const client = new ETPValidationClient();
      await client
        .connect(config.etpServerUrl, undefined, config.dataPartition)
        .then(async () => await client.requestAuthorize(config.jwtToken))
        .catch(err => {
          client.disconnect();
          failIfError(err);
        })
        .then(async () => await client.requestSession())
        .then(async () => await client.closeSession())
        .catch(failIfError);
    });
    it("VE0521-6: Session request fail after bad credentials Authorize ", async () => {
      const client = new ETPValidationClient();
      expect.assertions(3);
      await client
        .connect(config.etpServerUrl, undefined, config.dataPartition)
        .then(async () => {
          await client.requestAuthorize(`badToken`);
        })
        .then(failIfNoError)
        .catch(err => {
          expect(err).toBeTruthy();
        });
      await client.requestSession().catch(err => {
        client.disconnect();
        expect(err).toBeTruthy();
        expect(err.code).toBe(ErrorCode.EAUTHORIZATION_REQUIRED);
      });
    });
    it("VE0521-7: Authorize with empty string fail and return challenges", async () => {
      const client = new ETPValidationClient();
      await client
        .connect(config.etpServerUrl, undefined, config.dataPartition)
        .then(async () => await client.requestAuthorize(undefined))
        .then(failIfNoError)
        .catch(err => {
          expect(err).toBeTruthy();
          expect(err.challenges).toBeDefined();
          expect(err.challenges.length).toBeGreaterThan(0);
          expect(
            err.challenges.some(
              (auth: string) =>
                auth.match(
                  /^Bearer authz_server=\\"https:\/\/[a-zA-Z\-_0-9]+(\/[a-zA-Z\-_0-9]+)+\\" scope=\\"[a-zA-Z\-_0-9]+\\"$/
                ) !== null
            )
          );
        })
        .finally(async () => await client.disconnect());
    });
    itif(config.serverRequiresAuthorization)(
      "VE0521-8: Server request Authorization ",
      async () => {
        const client = new ETPValidationClient();
        await client
          .connect(config.etpServerUrl, undefined, config.dataPartition)
          .then(async () => await client.requestAuthorize(config.jwtToken))
          .then(async () => await client.requestSession())
          .then(async () => await client.closeSession())
          .catch(failIfError);
      }
    );
  }
);

describeif(config.runExperimental)("VE403-7", () => {
  const restUrl = config.etpServerUrl.replace("ws", "http");

  it("VE403-7: Server supports HTTP/1.1", done => {
    let httpClient;
    if (restUrl.startsWith("https:")) {
      httpClient = require("https");
    } else {
      httpClient = require("http");
    }

    const req = httpClient
      .get(
        restUrl +
          "/.well-known/etp-server-capabilities?GetVersion=etp12.energistics.org",
        (res: IncomingMessage) => {
          expect(res.statusCode).toBe(200);
          expect(res.httpVersion).toBe("1.1");
          done();
        }
      )
      .on("error", (e: any) => {
        logger.error(e);
        done(e);
      });

    req.end();
  });
});

describe("VE403-13", () => {
  const restUrl = config.etpServerUrl.replace("ws", "http");

  it("VE403-13: Server supports Energistics protocol", async (): Promise<any> => {
    const httpTest = request(`${restUrl}`);
    await httpTest
      .get(`/.well-known/etp-server-capabilities?GetVersions=true`)
      .send()
      .expect(200)
      .then(response => {
        const supportedProtocols = response.body as Array<string>;
        expect(
          supportedProtocols.includes("etp12.energistics.org")
        ).toBeTruthy();
      });

    const client = new ETPValidationClient();
    try {
      return client
        .connect(config.etpServerUrl, config.jwtToken, config.dataPartition)
        .then(async () => client.requestSession())
        .then(async () => client.closeSession());
    } catch (err: any) {
      return failIfError(err);
    }
  });
});

describe("VE403-18", () => {
  it("VE403-18: Server accepts valid protocols", done => {
    // should connect successfully
    const client = new WebSocketClient();
    client.on("connect", function (connection: connection) {
      expect(connection.connected).toBe(true);
      connection.close();
      done();
    });
    client.on("connectFailed", function (error: Error) {
      done(error);
    });

    client.connect(config.etpServerUrl, "etp12.energistics.org", undefined, {
      Authorization: `${config.jwtToken}`
    });
  });

  it("VE403-18: Server rejects invalid protocols", done => {
    // should connect successfully
    const client = new WebSocketClient();
    client.on("connect", function (connection: connection) {
      connection.close();
      done(new Error("Connection should fail"));
    });
    client.on("httpResponse", function (response: any) {
      expect(response.statusCode).toBe(400);
      done();
    });

    client.connect(config.etpServerUrl, "fake", undefined, {
      Authorization: `${config.jwtToken}`
    });
  });
});
