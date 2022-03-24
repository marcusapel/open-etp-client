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

import "jest";

import {
  Energistics,
  EtpUri,
  Resqml20,
  ResqmlClient,
  XmlUtils
} from "../index";

import { ETPClient } from "../lib/client/ETPClient";

import type {
  Dataspace,
  IResqmlDataObject,
  Resource,
  SimpleJson
} from "../index";

import * as controlUtils from "../lib/restApi/ControllerUtils";

export const serverProtocol = process.env.RDMS_ETP_PROTOCOL || "ws";
export const serverHost = process.env.RDMS_ETP_HOST || "localhost";
export const serverPath = process.env.RDMS_ETP_PATH || "";
export const serverPort = process.env.RDMS_ETP_PORT || "9004";

const routePath = controlUtils.routePath;

const serverUrl = `${serverProtocol}://${serverHost}:${serverPort}${serverPath}/`;

const jwt = XmlUtils.createDefaultJWT();

const failOnUnexpectedError = (err: Error) => {
  expect(err).toBeFalsy();
};

import * as bunyan from "bunyan";
import { execSync } from "child_process";
import http from "http";

function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const logger = bunyan.createLogger({ name: "Jest" });

describe("Valid url components", () => {
  it("Non empty parameters", () => {
    expect(serverHost).not.toBeFalsy();
    expect(serverPort).not.toBeFalsy();
  });
});

export const checkServerAvailability: () => Promise<boolean> = async () => {
  const url = `http://${serverHost}:${serverPort}/.well-known/etp-server-capabilities?GetVersion=etp12.energistics.org`;
  return new Promise(resolve => {
    try {
      const req = http.get(url, response => {
        if (response.statusCode === 200 || response.statusCode === 301) {
          resolve(true);
        } else {
          logger.error(`fetch catch error: ${response.statusMessage}`);
        }
      });
      req.on("error", () => {
        logger.info("ETP server NOT running");
        resolve(false);
      });
      req.end();
    } catch (e) {
      resolve(false);
    }
  });
};

export const checkRestAPIAvailability: () => Promise<boolean> = async () => {
  const url = `${controlUtils.swaggerUIUrl}/health/readiness/`;
  return new Promise(resolve => {
    try {
      logger.info(`Connecting to API: ${url}`);
      http
        .get(url, response => {
          if (response.statusCode === 200 || response.statusCode === 301) {
            resolve(true);
          } else {
            logger.error(`API error: ${response.statusMessage}`);
          }
        })
        .on("error", err => {
          logger.info(`API server NOT available on ${url}: ` + err.toString());
          resolve(false);
        });
    } catch (e) {
      resolve(false);
    }
  });
};

const startServer = async (): Promise<boolean> => {
  try {
    // Look for locally running server before starting container
    const s = await checkServerAvailability();
    logger.info(`ETP server availability ${s}`);

    if (s) {
      return true;
    }
    // Start server and give it time before starting tests
    logger.info("starting ETP server");
    execSync("npm run docker:compose:start");

    await sleep(20000);

    return checkServerAvailability().then(() => {
      logger.info("ETP server started");
      return true;
    });
  } catch (error) {
    return false;
  }
};

const stopServer = (): void => {
  // Use sync to make sure server stop to avoid open handles
  execSync("npm run docker:compose:stop");
  logger.info("ETP server stopped");
};

const maxTime = 400000000;

import restApp from "../lib/restApi/App";

import { MessageFlags } from "../lib/common/EtpTypes";
import request from "supertest";

let token = "";

let app: any = undefined;

try {
  beforeAll(async () => {
    jest.setTimeout(maxTime);
    await startServer();
    app = (await (await restApp()).init()).getHttpServer();
    await request(app)
      .get(`${routePath}/health/readiness`)
      .expect(200)
      .then(() =>
        request(app)
          .get(`${routePath}/auth/token`)
          .expect(`Content-Type`, /json/)
          .expect(200)
          .then(res => {
            token = res.body.token;
            expect(token).not.toBeNull();
          })
      );
  }, maxTime);
} catch (e) {
  logger.error(`beforeAll catch external: ${e}`);
}

afterAll(done => {
  stopServer();
  done();
});

describe("Ping", () => {
  it("Ping", async () => {
    const c2 = new ResqmlClient();
    c2.setCallsTraceability(false);
    await c2
      .openSession(serverUrl, jwt)
      .then(() => c2.ping())
      .then(res => expect(res).not.toBeNull())
      .then(() => c2.closeSession());
  });
});

const dataspaceName = "demo/Volve";
const tSurfType = "resqml20.obj_TriangulatedSetRepresentation";
const tSurfUid = "f814c230-bf43-4f2a-89d6-6229eb3c9c49";
const propertyUid = "e3d82cdc-3cfe-4810-9fb5-f4904cd1b658";
const externalPartUid = "53395ada-6f93-4bac-b506-d45997ded2a2";
const tSurfName = "Depth_Hugin_Fm_Base_ts";
const propertyKindUid = "4ef9db54-75fd-4d21-b41a-a67ae335d2a6";
const propertyType = "obj_ContinuousProperty";
const dataspaceEncoded = encodeURIComponent(dataspaceName);

const wrongDataspace = "wrong/wrong";
const wrongDataspaceEncoded = encodeURIComponent(wrongDataspace);

import { NestExpressApplication } from "@nestjs/platform-express";

describe("Rest server", () => {
  // Skip when running in container
  it.skip("Check API running", done => {
    restApp().then((a: NestExpressApplication) => {
      let url = controlUtils.swaggerUIUrl;
      const inContainer = url.startsWith("http://172.17.01");
      if (!inContainer) {
        //Run locally
        const testPort = 3092;
        a.listen(testPort);
        url = `${controlUtils.mainUrl}:${testPort}${controlUtils.routePath}/health/readiness/`;
      }
      setTimeout(() => {
        try {
          logger.info(`Connecting to REST test URL: ${url}`);
          http.get(url, response => {
            expect(response.statusCode).toEqual(200);
            if (!inContainer) {
              a.close();
            }
            done();
          });
        } catch (e) {
          expect(false).toBeTruthy();
          if (!inContainer) {
            a.close();
          }
          done();
        }
      }, 5000);
    });
  });
});

describe("Resource Graph", () => {
  let client: ResqmlClient;
  beforeEach(() => {
    client = new ResqmlClient();
  });

  afterEach(async () => {
    if (client.isInSession()) {
      // ensure that client is closed even if a test is failing
      await client.closeSession();
    }
  });

  it("Projects", done => {
    client.setCallsTraceability(true);
    client.openSession(serverUrl, jwt).then(() =>
      client.getProjects().then(projects => {
        expect(client.isConnected()).toBe(true);
        expect(projects).not.toBeNull();
        if (projects) {
          const testProject = projects.find(p =>
            p.path.includes(dataspaceName)
          );
          expect(testProject).toBeDefined();
          done();
        }
      })
    );
  });

  it("Wrong Projects Error", done => {
    client.openSession(serverUrl, jwt).then(async () => {
      const wrongUrl = `eml:///dataspace('${wrongDataspace}')`;
      let hasError = false;
      try {
        await client.getProjectTypes(wrongUrl);
      } catch {
        // Error should have been thrown
        hasError = true;
      }
      expect(hasError).toBeTruthy();
      done();
    });
  });

  it("Put and delete Obj", done => {
    client
      .openSession(serverUrl, jwt)
      .then(async () => client.getProjects())
      .then(async projects => {
        if (projects) {
          const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
          <eml:EpcExternalPartReference xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:gts="http://www.isotc211.org/2005/gts" xmlns:gsr="http://www.isotc211.org/2005/gsr" xmlns:dc="http://purl.org/dc/terms/" xmlns:resqml1="http://www.resqml.org/schemas/1series" xmlns:resqml2="http://www.energistics.org/energyml/data/resqmlv2" xmlns:witsml1="http://www.witsml.org/schemas/1series" xmlns:eml="http://www.energistics.org/energyml/data/commonv2" xmlns:gml="http://www.opengis.net/gml/3.2" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:ptm="http://www.f2i-consulting.com/PropertyTypeMapping" xmlns:abstract="http://www.energistics.org/schemas/abstract" schemaVersion="2.0" uuid="53395ada-6f93-4bac-b506-d45997ded2a2" xsi:type="eml:obj_EpcExternalPartReference">
          <eml:Citation xsi:type="eml:Citation">
            <eml:Title xsi:type="eml:DescriptionString">/home/user1/Desktop/Volve_Demo_Horizons_Depth.h5</eml:Title>
            <eml:Originator xsi:type="eml:NameString">current User</eml:Originator>
            <eml:Creation xsi:type="xsd:dateTime">2021-09-07T18:56:41Z</eml:Creation>
            <eml:Format xsi:type="eml:DescriptionString">[Emerson:TestApp:1]</eml:Format>
            <eml:VersionString xsi:type="xsd:string">2021-09-07T18:56:41Z</eml:VersionString>
          </eml:Citation>
          <eml:MimeType xsi:type="xsd:string">application/x-hdf5</eml:MimeType>
        </eml:EpcExternalPartReference>
        `;
          const p = projects[0];
          const object: Energistics.Etp.v12.Datatypes.Object.DataObject = {
            data: [...Buffer.from(xmlContent)],
            format: "xml",
            resource: {
              uri: `${p.uri}/eml.EpcExternalPartReference(53395ada-6f93-4bac-b506-d45997ded2a2)`,
              name: "test",
              alternateUris: [],
              sourceCount: null,
              targetCount: null,
              storeCreated: BigInt(0),
              storeLastWrite: BigInt(0),
              activeStatus:
                Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind.Active,
              lastChanged: BigInt(0),
              customData: new Map()
            },
            blobId: null
          };
          const transaction = await client.startTransaction(
            false,
            [projects[0].uri],
            "Create dummy array"
          );
          try {
            await client.putDataObjects([object]);
            await client.deleteObjects([object.resource.uri]);
            await client.rollbackTransaction(transaction);
          } catch (e) {
            await client.rollbackTransaction(transaction);
          }
        }
      })
      .then(() => done());
  });

  it("Create Delete Project", done => {
    const path = "test/toDelete";
    const uri = EtpUri.createDataSpaceUri(path);
    const clientWrite = new ResqmlClient();
    client
      .openSession(serverUrl, jwt)
      .then(() => client.getProjects())
      .then(projects =>
        expect(projects?.filter(r => r.path.includes(path)).length).toBe(0)
      )
      .then(() =>
        clientWrite.openSession(serverUrl, jwt, undefined, undefined, 100000)
      )
      .then(() => clientWrite.findOrCreateProject(path, path))
      .then(() => client.getProjects())
      .then(projects => {
        expect(projects).toBeDefined();
        if (!projects) {
          return;
        }
        expect(projects.filter(r => r.path.includes(path)).length).toBe(1);
        const testProject = projects.find(p => p.path.includes(dataspaceName));
        expect(testProject).toBeDefined();
        if (!testProject) {
          return;
        }
        return client.getProjectResources(testProject.uri).then(resources =>
          clientWrite
            .copyResourcesToDataspace(
              client,
              resources.map(r => r.uri),
              uri.uri
            )
            .then(() => clientWrite.getProjectResources(uri.uri))
            .then(resources2 => {
              expect(resources2.length).toBe(resources.length);
              return resources2;
            })
            .then(resources2 => {
              clientWrite.findResource(resources2[0].uri).then(r => {
                expect(r).toBeDefined();
                if (r) {
                  expect(resources2[0].uri).toEqual(r.uri);
                }
              });
              return resources2;
            })
            .then(resources2 => clientWrite.deleteObjects([resources2[0].uri]))
            .then(() => clientWrite.getProjectResources(uri.uri))
            .then(resources2 => {
              expect(resources2.length).toBe(resources.length - 1);
            })
        );
      })
      .then(() => clientWrite.deleteProjects([uri.uri]))
      .catch(() => clientWrite.deleteProjects([uri.uri]))
      .then(() => clientWrite.closeSession())
      .then(() => client.getProjects())
      .then(projects =>
        expect(projects?.filter(r => r.path.includes(path)).length).toBe(0)
      )
      .then(() => {
        done();
      });
  });

  it("Create Array Transaction", done => {
    client.openSession(serverUrl, jwt).then(() =>
      client.getProjects().then(async projects => {
        expect(client.isConnected()).toBe(true);
        expect(projects).not.toBeNull();
        if (projects) {
          expect(projects.length).toBe(1);
          const testProject = projects.find(p =>
            p.path.includes(dataspaceName)
          );
          expect(testProject).toBeDefined();
          const fullArray: Int32Array = Int32Array.from([1, 1, 1, 1, 1, 1]);
          const aa: Int32Array = Int32Array.from([3, 3]);
          const transaction = await client.startTransaction(
            false,
            [projects[0].uri],
            "Create dummy array"
          );
          try {
            const uri = EtpUri.createObjectUri(
              dataspaceName,
              "eml",
              "2.0",
              "obj_EpcExternalPartReference",
              "53395ada-6f93-4bac-b506-d45997ded2a2"
            ).uri;
            const pathInResource = `/Resqml/${tSurfUid}/testArray`;
            await client.putDataArray(
              {
                uri,
                pathInResource
              },
              [2, 3],
              fullArray
            );
            await client.getDataArray(uri, pathInResource).then(value => {
              expect(value?.data?.data.item._ArrayOfInt?.values[5]).toBe(1);
            });
            await client.putEmptyDataArray(
              {
                uri,
                pathInResource
              },
              aa,
              [2, 3]
            );
            await client.putDataSubArray(
              {
                uri,
                pathInResource
              },
              [1, 1],
              [1, 2],
              aa
            );
            await client.getDataArray(uri, pathInResource).then(value => {
              expect(value?.data?.data.item._ArrayOfInt?.values[5]).toEqual(3);
            });

            await client
              .getDataSubarray(uri, pathInResource, [1, 0], [1, 3])
              .then(subarray => {
                const data =
                  subarray?.data as Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray;
                expect(data.data.item._ArrayOfInt?.values[2]).toEqual(3);
              });

            let sum = 0;
            await client.visitDataArrayValues(
              { uri, pathInResource },
              values => {
                values.forEach(v => {
                  if (typeof v === "number") {
                    sum += v;
                  }
                });
              }
            );
            expect(sum).toEqual(6);

            const badPut = await client.putEmptyDataArray(
              {
                uri: EtpUri.createObjectUri(
                  dataspaceName,
                  "eml",
                  "2.0",
                  "obj_EpcExternalPartReference",
                  "53395ada-6f93-0000-0000-d45997ded2a2"
                ).uri,
                pathInResource
              },
              aa,
              [2, 3]
            );
            expect(badPut).toBeFalsy();
            await client.rollbackTransaction(transaction);
          } catch (e) {
            await client.rollbackTransaction(transaction);
          }
        }
        done();
      })
    );
  });

  it("Subscribe Notification fails", done => {
    client
      .openSession(serverUrl, jwt)
      .then(async () => client.getProjects())
      .then(projects =>
        client.subscribeNotifications(projects ? projects[0].uri : "")
      )
      .then(u => expect(u).toBeNull())
      .then(() =>
        client.unsubscribeNotifications([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ])
      )
      .then(done);
  });

  it("Delete Wrong Project", done => {
    const uri = EtpUri.createDataSpaceUri("test/toDeleteWrong");
    let nbProjects = 0;
    client
      .openSession(serverUrl, jwt)
      .then(async () => client.getProjects())
      .then(projects => (nbProjects = projects?.length || 0))
      .then(() => client.deleteProjects([uri.uri]))
      .then(() => client.getProjects())
      .then(projects3 => {
        expect(projects3?.length).toBe(nbProjects);
        done();
      });
  });

  it("Find Project From itself", done => {
    client.openSession(serverUrl, jwt).then(async () =>
      client.getProjects().then((projects: Dataspace[] | null) => {
        expect(projects).not.toBeNull();
        if (projects) {
          expect(projects.length).toBe(1);
          const testProject = projects.find(p =>
            p.path.includes(dataspaceName)
          );
          expect(testProject).toBeDefined();
        }
        done();
      })
    );
  });
});

describe("Objects", () => {
  it("Raw", async () => {
    const client = new ResqmlClient({
      collapseTextElement: false,
      removeNamespace: false,
      resolveArrayMetadata: true,
      resolveReference: true
    });
    await client.openSession(serverUrl, jwt);
    try {
      const projects = await client.getProjects();
      if (!projects) {
        expect(false);
        return;
      }
      const testProject = projects.find(p => p.path.includes(dataspaceName));
      expect(testProject).toBeDefined();
      if (!testProject) {
        expect(false);
        return;
      }
      const testProjectUri = testProject?.uri;

      const t = await client.getProjectTypes(testProjectUri);
      expect(t.length).toBe(14);

      const objects: Resource[] = await client.getProjectResources(
        testProjectUri
      );
      // Objects
      expect(objects.length).toBe(89);
      // Property
      const uri = `${testProjectUri}/resqml20.${propertyType}(${propertyUid})`;
      const sources = await client.getSources(uri);

      expect(sources.length).toBe(0);

      const targets = await client.getTargets(uri);
      expect(targets.length).toBe(2);

      const tSurf = targets.find(r =>
        r.uri.endsWith(`${tSurfType}(${tSurfUid})`)
      );
      expect(tSurf).toBeDefined();
      expect(tSurf?.name).toBe(`${tSurfName}`);

      const pKind = targets.find(r =>
        r.uri.endsWith(`resqml20.obj_PropertyKind(${propertyKindUid})`)
      );
      expect(pKind).toBeDefined();
      expect(pKind?.name).toBe("j");

      const part = targets.find(r =>
        r.uri.endsWith(`eml20.obj_EpcExternalPartReference(${externalPartUid})`)
      );
      expect(part).toBeUndefined();

      try {
        await client.getSources(testProjectUri);
      } catch (reason) {
        expect(reason).toContain("Invalid URI: Expecting DataObject");
      }
      const resourceObjects = await client.getObjects(objects.map(o => o.uri));
      expect(resourceObjects.length).toBe(89);
      const propertyObj = resourceObjects.find(
        r => r && r.Uuid === propertyUid
      );
      expect(propertyObj).toBeDefined();

      // expected getObjects: client created with options: removeNamespace: false
      expect(propertyObj?.Citation.Title).toStrictEqual("J");

      const searched = await client.getProjectResources(
        `${testProjectUri}?$filter=SurfaceRole eq 'map'`
      );
      expect(searched).toHaveLength(3);
    } catch (err: any) {
      failOnUnexpectedError(err);
    } finally {
      await client.closeSession();
    }
  });
  it("Resolved", async () => {
    const options = {
      collapseTextElement: true,
      removeNamespace: true,
      resolveArray: false,
      resolveArrayMetadata: true,
      resolveReference: true
    };
    const client = new ResqmlClient(options);

    try {
      await client.openSession(serverUrl, jwt);
      const projects = await client.getProjects();
      if (!projects) {
        expect(false);
        return;
      }
      const testProject = projects.find(p => p.path.includes(dataspaceName));
      expect(testProject).toBeDefined();
      if (!testProject) {
        expect(false);
        return;
      }
      // project: /home/pdgm/data/testingPackageCpp.epc
      const testProjectUri = testProject?.uri;

      const objects: Resource[] = await client.getProjectResources(
        testProjectUri
      );

      // Objects
      expect(objects.length).toBe(89);
      const externalObjects = new Map<string, IResqmlDataObject>();
      // Resolving all objects may takes a long time > timeout
      const filteredObjects = objects.filter(o =>
        o.uri.endsWith(`(${propertyUid})`)
      );
      const resourceObjects = await client.getResolvedObjects(
        filteredObjects.map(o => o.uri),
        externalObjects
      );

      const prop = resourceObjects.find(r => r && r.Uuid === propertyUid);
      expect(prop).toBeDefined();
      expect(prop?.Citation.Title).toBe("J");
      const dimensions = (
        (prop as SimpleJson<Resqml20.AbstractValuesProperty>)?.PatchOfValues[0]
          ?.Values as SimpleJson<Resqml20.DoubleHdf5Array>
      )?.Values?._data?.Dimensions;
      expect(dimensions).toBeDefined();
      if (dimensions) {
        expect(dimensions[0]).toBe(132);
      }
      if (!prop) {
        expect(false);
        return;
      }
      expect(XmlUtils.checkResqmlObject(prop)).toBeDefined();
      const o2: any = prop;
      o2.Citation = null;
      expect(XmlUtils.checkResqmlObject(prop)).toBeNull();
    } catch (err: any) {
      failOnUnexpectedError(err);
    } finally {
      await client.closeSession();
    }
  });

  it("Add Data Arrays", async () => {
    const options = {
      collapseTextElement: true,
      removeNamespace: true,
      resolveArray: false,
      resolveArrayMetadata: true,
      resolveReference: true
    };
    const client = new ResqmlClient(options);

    await client.openSession(serverUrl, jwt);
    const projects = await client.getProjects();
    if (!projects) {
      expect(false);
      return;
    }
    const testProject = projects.find(p => p.path.includes(dataspaceName));
    expect(testProject).toBeDefined();
    if (!testProject) {
      expect(false);
      return;
    }
    // project: /home/pdgm/data/testingPackageCpp.epc
    const testProjectUri = testProject?.uri;

    const objects: Resource[] = await client.getProjectResources(
      testProjectUri
    );

    // Objects
    expect(objects.length).toBe(89);
    // Resolving all objects may takes a long time > timeout
    const filteredObjects = objects.filter(obj =>
      obj.uri.endsWith(`(${propertyUid})`)
    );
    const o = await client.getObjects([filteredObjects[0].uri]);
    if (o[0]) {
      const prop = await client.addArrayValues(filteredObjects[0].uri, o[0]);
      const dimensions = (
        (prop as SimpleJson<Resqml20.AbstractValuesProperty>)?.PatchOfValues[0]
          ?.Values as SimpleJson<Resqml20.DoubleHdf5Array>
      )?.Values?._data?.Data.Dimensions;
      expect(dimensions).toBeDefined();
      if (dimensions) {
        expect(Number(dimensions[0])).toBe(132);
      }
      await client.closeSession();
    }
  });
});

describe("Core messages", () => {
  jest.setTimeout(maxTime);
  let etpClient: ETPClient;
  beforeEach(() => {
    etpClient = new ETPClient({
      name: "Test Core ETP Client"
    });
  });

  afterEach(async () => {
    if (etpClient.isInSession()) {
      etpClient.closeSession();
    }
  });

  it(`Test acknowledge`, async () => {
    const header: Energistics.Etp.v12.Datatypes.MessageHeader = {
      protocol: 0,
      messageType: Energistics.Etp.v12.Protocol.Core.MsgAcknowledge,
      correlationId: BigInt(-1),
      messageId: BigInt(1),
      messageFlags: MessageFlags.FINALPART
    };
    await new Promise(resolve => {
      etpClient.on("acknowledge", () => {
        resolve(true);
      });
      etpClient.handleMessage(header, "test");
    }).then(v => expect(v).toBeTruthy());
  });
  it(`Test exception`, async () => {
    const header: Energistics.Etp.v12.Datatypes.MessageHeader = {
      protocol: 0,
      messageType: Energistics.Etp.v12.Protocol.Core.MsgProtocolException,
      correlationId: BigInt(-1),
      messageId: BigInt(1),
      messageFlags: MessageFlags.FINALPART
    };
    await new Promise(resolve => {
      etpClient.on("exception", () => {
        resolve(true);
      });
      etpClient.handleMessage(header, "test");
    }).then(v => expect(v).toBeTruthy());
  });
  it(`Test On Ping`, async () => {
    const header: Energistics.Etp.v12.Datatypes.MessageHeader = {
      protocol: 0,
      messageType: Energistics.Etp.v12.Protocol.Core.MsgPing,
      correlationId: BigInt(-1),
      messageId: BigInt(1),
      messageFlags: MessageFlags.FINALPART
    };
    await new Promise(resolve => {
      etpClient.on("ping", () => {
        resolve(true);
      });
      etpClient.handleMessage(header, "test");
    }).then(v => expect(v).toBeTruthy());
  });
  it(`Test closeSession`, async () => {
    const header: Energistics.Etp.v12.Datatypes.MessageHeader = {
      protocol: 0,
      messageType: Energistics.Etp.v12.Protocol.Core.MsgCloseSession,
      correlationId: BigInt(-1),
      messageId: BigInt(1),
      messageFlags: MessageFlags.FINALPART
    };
    const closeMsg: Energistics.Etp.v12.Protocol.Core.CloseSession = {
      reason: "test closure"
    };
    await new Promise(resolve => {
      etpClient.on("close", () => {
        resolve(true);
      });
      etpClient.handleMessage(header, closeMsg);
    }).then(v => expect(v).toBeTruthy());
  });
});

/// REST API

describe("Large number of API access", () => {
  jest.setTimeout(maxTime);
  it(`Get Dataspace Ok`, async () => {
    for (let i = 0; i < 200; i++) {
      await request(app)
        .get(`${routePath}/dataspaces`)
        .set(`Authorization`, `Bearer ${token}`)
        .expect(`Content-Type`, /json/)
        .expect(200);
    }
  });
});

describe("Rest API", () => {
  it("sliceArray", () => {
    expect(
      controlUtils.sliceArray<string>(1, 2, [
        "one",
        "two",
        "three",
        "four",
        "five"
      ])
    ).toStrictEqual(["two", "three"]);
  });

  jest.setTimeout(400000);
  it("QueryString", async () => {
    const c = new ResqmlClient();
    c.setCallsTraceability(false);
    const query = {
      top: 4
    };
    const res = await c
      .openSession(serverUrl, jwt)
      .then(() => c.getProjects())
      .then(
        ps =>
          (ps && ps.find(p => p.path.includes(dataspaceName))) || {
            uri: ""
          }
      )
      .then(p =>
        controlUtils.findResources(
          c,
          {
            uri: p.uri,
            depth: 1,
            dataObjectTypes: [],
            navigableEdges: "Both"
          },
          query
        )
      );
    expect(res).toHaveLength(89);
  });
});

describe(`Health`, () => {
  it(`Health probe`, async () => {
    await request(app).get(`${routePath}/health/readiness`).expect(200);
  });
});

describe(`Dataspace`, () => {
  it(`Get Dataspace Unauthorized`, async () => {
    await request(app)
      .get(`${routePath}/dataspaces`)
      .expect(`Content-Type`, /json/)
      .expect(403);
  });

  it(`Bad Bearer Format`, async () => {
    await request(app)
      .get(`${routePath}/dataspaces`)
      .set(`Authorization`, `${token}`)
      .expect(`Content-Type`, /json/)
      .expect(403);
  });

  it(`Get Dataspace Ok`, async () => {
    await request(app)
      .get(`${routePath}/dataspaces`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
  });
});

describe(`Auth`, () => {
  it(`No token`, async () => {
    const uris = [
      `${routePath}/dataspaces/${dataspaceEncoded}/resources`,
      `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}`,
      `${routePath}/dataspaces/${dataspaceEncoded}/resources/all`,
      `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}`,
      `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/targets`,
      `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/sources`,
      `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/arrays`
    ];
    for (const u of uris) {
      await request(app).get(u).expect(403);
    }
  });

  it(`Wrong dataspace`, async () => {
    const uris = [
      `${routePath}/dataspaces/${wrongDataspaceEncoded}/resources`,
      `${routePath}/dataspaces/${wrongDataspaceEncoded}/resources/${tSurfType}`,
      `${routePath}/dataspaces/${wrongDataspaceEncoded}/resources/all`,
      `${routePath}/dataspaces/${wrongDataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/targets`,
      `${routePath}/dataspaces/${wrongDataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/sources`,
      `${routePath}/dataspaces/${wrongDataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/arrays`
    ];
    for (const u of uris) {
      await request(app)
        .get(u)
        .set(`Authorization`, `Bearer ${token}`)
        .expect(500);
    }
  });
});

describe(`DataArray`, () => {
  it(`Check Endianness`, () => {
    const arrayBuffer = new ArrayBuffer(2);
    const uint8Array = new Uint8Array(arrayBuffer);
    const uint16array = new Uint16Array(arrayBuffer);
    uint8Array[0] = 0xaa; // set first byte
    uint8Array[1] = 0xbb; // set second byte
    expect(uint16array[0]).toEqual(0xbbaa); // LE
    expect(uint16array[0]).not.toEqual(0xaabb); // BE
  });
});

describe(`Resources`, () => {
  it(`Dataspaces`, async () => {
    const res = await request(app)
      .get(`${routePath}/dataspaces`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    const len = res.body.length;
    expect(len).toBeGreaterThan(0);
  });
  it(`Types`, async () => {
    const res = await request(app)
      .get(`${routePath}/dataspaces/${dataspaceEncoded}/resources`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body).toHaveLength(14);
  });

  it(`Wrong dataspacesTypes`, async () => {
    await request(app)
      .get(`${routePath}/dataspaces/${wrongDataspaceEncoded}/resources`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(500);
  });

  it(`Resource by Types`, async () => {
    const res = await request(app)
      .get(`${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body).toHaveLength(3);
    const res2 = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}?$skip=1&$top=1`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res2.body).toHaveLength(1);
  });

  it(`Find Resources`, async () => {
    const res = await request(app)
      .get(`${routePath}/dataspaces/${dataspaceEncoded}/resources/all`)

      .query(`$filter=SurfaceRole eq 'map'`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body).toHaveLength(3);
  });

  it(`Get DataObjects JSON`, async () => {
    const res = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveLength(1);
    expect(res.header[`content-type`]).toBe("application/json; charset=utf-8");
  });

  it(`Get DataObjects JSON Resolved`, async () => {
    const res = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}?referencedContent=true`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveLength(1);
    expect(res.header[`content-type`]).toBe("application/json; charset=utf-8");
  });

  it(`Get DataObjects XML`, async () => {
    const res = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}?$format=xml`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res.header["content-type"]).toBe(
      "application/x-resqml+xml; charset=utf-8"
    );
    expect(res.text).toBeDefined();
  });

  it(`Get Targets`, async () => {
    const res = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/targets`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveLength(2);
    const res2 = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/targets?$skip=1&$top=1`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res2.body).toHaveLength(1);
  });

  it(`Get Sources`, async () => {
    const res = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/sources`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveLength(2);
    const res2 = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/sources?$skip=1&$top=1`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res2.body).toHaveLength(1);
  });

  it(`Get Arrays`, async () => {
    const res = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/arrays`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body).toHaveLength(38);
  });

  it(`Get DataArrayMetadata`, async () => {
    const pathInResource = encodeURIComponent(
      `/RESQML/${tSurfUid}/points_patch0`
    );
    await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/eml20.obj_EpcExternalPartReference/${externalPartUid}/arrays/${pathInResource}/metadata`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
  });

  it(`Get DataArray JSON`, async () => {
    const pathInResource = encodeURIComponent(
      `/RESQML/${tSurfUid}/triangles_patch0`
    );
    const res = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/eml20.obj_EpcExternalPartReference/${externalPartUid}/arrays/${pathInResource}`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body.data.data[0]).toBe(48);
  });

  it(`Get DataArray Base64`, async () => {
    const pathInResource = encodeURIComponent(
      `/RESQML/${tSurfUid}/triangles_patch0`
    );
    const res = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/eml20.obj_EpcExternalPartReference/${externalPartUid}/arrays/${pathInResource}`
      )
      .query(`format=base64`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    // Convert from base64 string to array
    const buf = Buffer.from(res.body.data.data, "base64");
    const int8 = new Int8Array(buf);
    const data = new Int32Array(int8.buffer);
    const arr = Array.from(data);
    expect(arr[0]).toBe(48);
  });

  it(`Get DataSubArray`, async () => {
    const pathInResource = encodeURIComponent(
      `/RESQML/${tSurfUid}/points_patch0`
    );
    const res = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/eml20.obj_EpcExternalPartReference/${externalPartUid}/arrays/${pathInResource}`
      )
      .query("starts=10")
      .query("starts=1")
      .query("counts=20")
      .query("counts=1")
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body.data.dimensions[0]).toBe(20);
  });

  it(`Get DataSubArray Base64`, async () => {
    const pathInResource = encodeURIComponent(
      `/RESQML/${tSurfUid}/points_patch0`
    );
    const res = await request(app)
      .get(
        `${routePath}/dataspaces/${dataspaceEncoded}/resources/eml20.obj_EpcExternalPartReference/${externalPartUid}/arrays/${pathInResource}`
      )
      .query("starts=12")
      .query("starts=1")
      .query("counts=10")
      .query("counts=1")
      .query(`format=base64`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    // Convert from base64 string to array
    const buf = Buffer.from(res.body.data.data, "base64");
    const int8 = new Int8Array(buf);
    const data = new Float64Array(int8.buffer);
    const arr = Array.from(data);
    expect(arr[0]).toBeCloseTo(8302.13, 2);
  });
});
