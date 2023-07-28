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

import Logging from "../lib/common/Logging";

import { execSync } from "child_process";
import http from "http";
import https from "https";
import request from "supertest";

import {
  Energistics,
  EtpUri,
  Resqml20,
  ResqmlClient,
  XmlUtils
} from "../index";
import type { IResqmlDataObject, Resource, SimpleJson } from "../index";

import { ETPClient } from "../lib/client/ETPClient";

import * as controlUtils from "../lib/restApi/ControllerUtils";

import { MessageFlags } from "../lib/common/EtpTypes";

import restApp from "../lib/restApi/App";

import {
  etpServerHost,
  etpServerPath,
  etpServerPort,
  etpServerProtocol,
  etpServerUrl,
  restApiMainUrl,
  restApiPort,
  restApiRoutePath
} from "../lib/common/config";
import { Manifest } from "src/lib/jsonTypes/Generated/manifest/Manifest.1.0.0";
import { ResourceGraph } from "src/lib/common/ResponseHandlers";

const jwt = XmlUtils.createDefaultJWT();

const failOnUnexpectedError = (err: Error) => {
  expect(err).toBeFalsy();
};

export const dataPatitionMode =
  process.env.RDMS_DATA_PARTITION_MODE || "single";
export const testDataPartitionId = process.env.RDMS_TEST_DATA_PARTITION_ID;

function sleep(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const logger = Logging.getLogger("Jest");

describe("Valid data partition", () => {
  it("Non empty parameters", () => {
    expect(dataPatitionMode).not.toBeFalsy();
    if (dataPatitionMode !== "single") {
      expect(testDataPartitionId).not.toBeFalsy();
    }
  });
});

export const checkServerAvailability: () => Promise<boolean> = async () => {
  const prot = etpServerProtocol === "wss" ? https : http;
  const url = `${
    etpServerProtocol === "wss" ? "https" : "http"
  }://${etpServerHost}:${etpServerPort}${etpServerPath}/.well-known/etp-server-capabilities?GetVersion=etp12.energistics.org`;
  return new Promise(resolve => {
    try {
      const req = prot.get(url, response => {
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
let serverAlreadyAvailable = false;

const startServer = async (): Promise<boolean> => {
  try {
    // Look for locally running server before starting container
    const s = await checkServerAvailability();
    logger.info(`ETP server availability ${s}`);

    if (s) {
      serverAlreadyAvailable = true;
      return true;
    }
    // Start server and give it time before starting tests
    logger.info("starting ETP server");
    execSync("npm run docker:compose:start");

    await sleep(20000);

    const startedOK = await checkServerAvailability();
    logger.info("ETP server started: " + startedOK);
    return startedOK;
  } catch (error) {
    return false;
  }
};

const stopServer = (): void => {
  if (serverAlreadyAvailable) {
    logger.info("ETP server maintained");
  } else {
    // Use sync to make sure server stop to avoid open handles
    execSync("npm run docker:compose:stop");
    logger.info("ETP server stopped");
  }
};

const maxTime = 400000000;

type TServer = Record<string, request.SuperTest<request.Test>>;
const testServers: TServer = {};

// declare servers we want to test
const serverData: string[] = [
  "http", // http server: e.g. docker container image,
  "app" // NestJS app
];

let token = "";

let nestApp: any = undefined;

try {
  beforeAll(async () => {
    jest.setTimeout(maxTime);
    await startServer();

    if (serverData.includes("http")) {
      // http server: e.g. docker container image
      const httpServerTest = request(`${restApiMainUrl}:${restApiPort}`);
      httpServerTest.get(`${restApiRoutePath}/health/readiness`).expect(200);
      testServers["http"] = httpServerTest;
    }

    // NestJS app
    if (serverData.includes("app")) {
      nestApp = await restApp();
      const nestAppServer = (await nestApp.init()).getHttpServer();
      const nestAppTest = request(nestAppServer);
      nestAppTest.get(`${restApiRoutePath}/health/readiness`).expect(200);
      testServers["app"] = nestAppTest;

      // initialize token for
      const res = await nestAppTest
        .get(`${restApiRoutePath}/auth/token`)
        .expect("Content-Type", /json/)
        .expect(200);
      token = res.body.token;
    } else {
      token = jwt;
    }
    return expect(token).not.toBeNull();
  }, maxTime);
} catch (e) {
  logger.error(`beforeAll catch external: ${e}`);
  throw e;
}

afterAll(done => {
  stopServer();
  nestApp && nestApp.close();
  done();
});

const dataspaceName = "demo/Volve";

const crsType = "resqml20.obj_LocalDepth3dCrs";
const grid2dType = "resqml20.obj_Grid2dRepresentation";

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

//*****************************************************/
// ResqmlClient

describe("Authorization", () => {
  it("Check valid Authentication token", async () => {
    const c2 = new ResqmlClient();
    c2.setCallsTraceability(false);
    await c2.connect(etpServerUrl, undefined, testDataPartitionId);
    let thrown = false;
    try {
      await c2.requestAuthorize(jwt);
      await c2.requestSession();
    } catch (err) {
      thrown = true;
    }
    expect(thrown).toBeFalsy();
    await c2.closeSession();
  });
  it("Check invalid Authentication token", async () => {
    const c2 = new ResqmlClient();
    c2.setCallsTraceability(false);
    expect.assertions(2);
    await c2.connect(etpServerUrl, undefined, testDataPartitionId);
    try {
      await c2.requestAuthorize(`Bearer badToken`);
    } catch (err) {
      expect(err).toHaveProperty("message");
    }
    try {
      await c2.requestSession();
    } catch (err) {
      expect(err).toBeDefined();
      c2.disconnect();
    }
  });
  it("Check Authorization without token", async () => {
    const c2 = new ResqmlClient();
    c2.setCallsTraceability(false);
    expect.assertions(2);
    await c2.connect(etpServerUrl, undefined, testDataPartitionId);
    try {
      await c2.requestAuthorize();
      await c2.requestSession();
    } catch (err) {
      expect(err).toHaveProperty("message");
    }
    try {
      await c2.requestSession();
    } catch (err) {
      expect(err).toBeDefined();
      c2.disconnect();
    }
  });
});

describe("Ping", () => {
  it("Ping", async () => {
    const c2 = new ResqmlClient();
    c2.setCallsTraceability(false);
    await c2.openSession(etpServerUrl, jwt, testDataPartitionId);
    const res = await c2.ping();
    expect(res).not.toBeNull();
    await c2.closeSession();
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

  it("Check API running", async () => {
    const res = await checkRestAPIAvailability();
    expect(res).toBeTruthy();
  });

  it("Right session", async () => {
    client.setCallsTraceability(true);
    let thrown = false;
    try {
      await client.openSession(etpServerUrl, jwt, testDataPartitionId);
    } catch (err) {
      thrown = true;
    }
    expect(thrown).toBeFalsy();
    expect(client.isConnected()).toBeTruthy();
    expect(client.isInSession()).toBeTruthy();
    await client.closeSession();
  });

  it("Wrong session", async () => {
    const wrongEtpServerUrl = `${etpServerProtocol}://${etpServerHost}:${
      +etpServerPort + 1
    }${etpServerPath}/`;
    client.setCallsTraceability(true);
    let thrown = false;
    try {
      await client.openSession(wrongEtpServerUrl, jwt, testDataPartitionId);
    } catch (err) {
      expect(err).toEqual("Connection Error");
      thrown = true;
    }
    expect(thrown).toBeTruthy();
    expect(client.isConnected()).toBeFalsy();
    expect(client.isInSession()).toBeFalsy();
  });

  it("Dataspaces", async () => {
    client.setCallsTraceability(true);
    await client.openSession(etpServerUrl, jwt, testDataPartitionId);
    const projects = await client.getDataspaces();
    expect(client.isConnected()).toBe(true);
    expect(projects).not.toBeNull();
    if (projects) {
      const testDataspace = projects.find(p => p.path.includes(dataspaceName));
      expect(testDataspace).toBeDefined();
    }
    await client.closeSession();
  });

  it("Wrong Dataspaces Error", async () => {
    await client.openSession(etpServerUrl, jwt, testDataPartitionId);
    const wrongUrl = `eml:///dataspace('${wrongDataspace}')`;
    let hasError = false;
    try {
      await client.getDataspaceTypes(wrongUrl);
    } catch {
      // Error should have been thrown
      hasError = true;
    }
    expect(hasError).toBeTruthy();
    await client.closeSession();
  });

  it("Put and delete Obj", async () => {
    await client.openSession(etpServerUrl, jwt, testDataPartitionId);
    const projects = await client.getDataspaces();
    expect(projects).toBeTruthy();
    if (!projects) {
      return;
    }
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
    const data = Array.from(xmlContent).map(c => c.charCodeAt(0));
    const object: Energistics.Etp.v12.Datatypes.Object.DataObject = {
      data,
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
    await client.closeSession();
  });

  it("Create Delete Dataspace", async () => {
    const path = "test/toDelete";
    const uri = EtpUri.createDataSpaceUri(path);
    const clientWrite = new ResqmlClient();
    await client.openSession(etpServerUrl, jwt, testDataPartitionId);
    const projects = await client.getDataspaces();

    expect(projects?.filter(r => r.path.includes(path)).length).toBe(0);

    await clientWrite.openSession(
      etpServerUrl,
      jwt,
      testDataPartitionId,
      undefined,
      undefined,
      100000
    );

    await clientWrite.findOrCreateDataspace(path, path);
    const projects2 = await client.getDataspaces();
    expect(projects2).toBeTruthy();
    if (!projects2) {
      return;
    }
    expect(projects2.filter(r => r.path.includes(path)).length).toBe(1);
    const testDataspace = projects2.find(p => p.path.includes(dataspaceName));
    expect(testDataspace).toBeDefined();
    if (!testDataspace) {
      return;
    }
    const resources = await client.getDataspaceResources(testDataspace.uri);
    await clientWrite.copyResourcesToDataspace(
      client,
      resources.map(r => r.uri),
      uri.uri
    );
    const resources2 = await clientWrite.getDataspaceResources(uri.uri);

    expect(resources2.length).toBe(resources.length);
    const firstRes = await clientWrite.findResource(resources2[0].uri);
    expect(firstRes).toBeDefined();
    if (firstRes) {
      expect(resources2[0].uri).toEqual(firstRes.uri);
    }
    await clientWrite.deleteObjects([resources2[0].uri]);
    const resources3 = await clientWrite.getDataspaceResources(uri.uri);
    expect(resources3.length).toBe(resources.length - 1);

    try {
      await clientWrite.deleteDataspaces([uri.uri]);
    } catch (e) {
      clientWrite.deleteDataspaces([uri.uri]);
    }

    await clientWrite.closeSession();
    const projects3 = await client.getDataspaces();
    await client.closeSession();
    expect(projects3?.filter(r => r.path.includes(path)).length).toBe(0);
  });

  it("Create Array Transaction", async () => {
    await client.openSession(etpServerUrl, jwt, testDataPartitionId);
    const projects = await client.getDataspaces();
    expect(client.isConnected()).toBe(true);
    expect(projects).toBeTruthy();
    if (!projects) {
      return;
    }
    expect(projects.length).toBe(1);
    const testDataspace = projects.find(p => p.path.includes(dataspaceName));
    expect(testDataspace).toBeDefined();
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
      const value = await client.getDataArray(uri, pathInResource);
      expect(value?.data?.data.item._ArrayOfInt?.values[5]).toBe(1);

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
      const value2 = await client.getDataArray(uri, pathInResource);
      expect(value2?.data?.data.item._ArrayOfInt?.values[5]).toEqual(3);

      const subarray = await client.getDataSubarray(
        uri,
        pathInResource,
        [1, 0],
        [1, 3]
      );
      const data =
        subarray?.data as Energistics.Etp.v12.Datatypes.DataArrayTypes.DataArray;
      expect(data.data.item._ArrayOfInt?.values[2]).toEqual(3);

      let sum = 0;
      await client.visitDataArrayValues({ uri, pathInResource }, values => {
        values.forEach(v => {
          if (typeof v === "number") {
            sum += v;
          }
        });
      });
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
    await client.closeSession();
  });

  it("Subscribe Notification fails", async () => {
    await client.openSession(etpServerUrl, jwt, testDataPartitionId);
    const projects = await client.getDataspaces();

    const subscribeUuid = await client.subscribeNotifications(
      projects ? projects[0].uri : ""
    );

    expect(subscribeUuid).toBeNull();

    client.unsubscribeNotifications([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);
    await client.closeSession();
  });

  it("Delete Wrong Dataspace", async () => {
    const uri = EtpUri.createDataSpaceUri("test/toDeleteWrong");
    await client.openSession(etpServerUrl, jwt, testDataPartitionId);
    const projects = await client.getDataspaces();
    const nbDataspaces = projects?.length || 0;
    await client.deleteDataspaces([uri.uri]);
    const projects2 = await client.getDataspaces();
    await client.closeSession();
    expect(projects2?.length).toBe(nbDataspaces);
  });

  it("Find Dataspace From itself", async () => {
    await client.openSession(etpServerUrl, jwt, testDataPartitionId);
    const projects = await client.getDataspaces();
    expect(projects).toBeTruthy();
    if (!projects) {
      return;
    }
    await client.closeSession();
    expect(projects.length).toBe(1);
    const testDataspace = projects.find(p => p.path.includes(dataspaceName));
    expect(testDataspace).toBeDefined();
  });
});

describe("Objects", () => {
  it("Raw", async () => {
    const client = new ResqmlClient({
      collapseTextElement: false,
      removeNamespace: false
    });
    await client.openSession(etpServerUrl, jwt, testDataPartitionId);
    try {
      const projects = await client.getDataspaces();
      expect(projects).toBeTruthy();
      if (!projects) {
        return;
      }
      const testDataspace = projects.find(p => p.path.includes(dataspaceName));
      expect(testDataspace).toBeTruthy();
      if (!testDataspace) {
        return;
      }
      const testDataspaceUri = testDataspace?.uri;

      const t = await client.getDataspaceTypes(testDataspaceUri);
      expect(t.length).toBe(14);

      const objects: Resource[] = await client.getDataspaceResources(
        testDataspaceUri
      );
      // Objects
      expect(objects.length).toBe(89);

      const fullGraph: ResourceGraph = await client.getDataspaceGraph(
        testDataspaceUri
      );
      // Graph
      expect(fullGraph.size).toBe(89);
      expect(fullGraph.edges.length).toBe(113);

      // Property
      const uri = `${testDataspaceUri}/resqml20.${propertyType}(${propertyUid})`;
      const sources = await client.getSources(uri);
      expect(sources.length).toBe(0);

      const grapSources = fullGraph.sources(uri);
      expect(grapSources.length).toBe(0);

      const targets = await client.getTargets(uri);
      expect(targets.length).toBe(2);

      const graphTargets = fullGraph.targets(uri);
      expect(graphTargets.length).toBe(2);

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
        await client.getSources(testDataspaceUri);
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

      const searched = await client.getDataspaceResources(
        `${testDataspaceUri}?$filter=SurfaceRole eq 'map'`
      );
      expect(searched).toHaveLength(3);

      // get featured surface and grid horizons
      const interps = await client.getDataspaceResources(testDataspaceUri, [
        "resqml20.obj_HorizonInterpretation"
      ]);
      expect(interps).toHaveLength(6);
      const interp = interps.filter(
        ff =>
          ff.uri ===
          `${testDataspaceUri}/resqml20.obj_HorizonInterpretation(e33006db-2797-4cdf-a4f2-8207b4688b3a)`
      )[0];
      expect(interp).toBeDefined();
      const featuredSources = await client.getSources(interp.uri, false, [
        crsType,
        tSurfType,
        grid2dType
      ]);
      expect(featuredSources).toHaveLength(2);
      const featuredSourcesWithSecondary = await client.getSources(
        {
          uri: interp.uri,
          depth: 10,
          dataObjectTypes: [crsType, tSurfType, grid2dType],
          includeSecondaryTargets: true,
          includeSecondarySources: false,
          navigableEdges:
            Energistics.Etp.v12.Datatypes.Object.RelationshipKind.Both
        },
        false,
        [crsType, tSurfType, grid2dType]
      );
      expect(featuredSourcesWithSecondary.length).toBe(3);
    } catch (err: any) {
      failOnUnexpectedError(err);
    } finally {
      await client.closeSession();
    }
  });
  it("Resolved", async () => {
    const options = {
      collapseTextElement: true,
      removeNamespace: true
    };
    const client = new ResqmlClient(options);

    try {
      await client.openSession(etpServerUrl, jwt, testDataPartitionId);
      const projects = await client.getDataspaces();
      expect(projects).toBeTruthy();
      if (!projects) {
        return;
      }
      const testDataspace = projects.find(p => p.path.includes(dataspaceName));
      expect(testDataspace).toBeTruthy();
      if (!testDataspace) {
        return;
      }
      // project: /home/pdgm/data/testingPackageCpp.epc
      const testDataspaceUri = testDataspace?.uri;

      const objects: Resource[] = await client.getDataspaceResources(
        testDataspaceUri
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
        externalObjects,
        true
      );

      const prop = resourceObjects.find(r => r && r.Uuid === propertyUid);
      expect(prop).toBeTruthy();
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
      removeNamespace: true
    };
    const client = new ResqmlClient(options);

    await client.openSession(etpServerUrl, jwt, testDataPartitionId);
    const projects = await client.getDataspaces();
    expect(projects).toBeTruthy();
    if (!projects) {
      return;
    }
    const testDataspace = projects.find(p => p.path.includes(dataspaceName));
    expect(testDataspace).toBeDefined();
    if (!testDataspace) {
      expect(false);
      return;
    }
    // project: /home/pdgm/data/testingPackageCpp.epc
    const testDataspaceUri = testDataspace?.uri;

    const objects: Resource[] = await client.getDataspaceResources(
      testDataspaceUri
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
    const v = await new Promise(resolve => {
      etpClient.on("acknowledge", () => {
        resolve(true);
      });
      const ack: Energistics.Etp.v12.Protocol.Core.Acknowledge = {};
      etpClient.handleMessage(header, ack);
      setTimeout(() => resolve(false), 5000);
    });
    expect(v).toBeTruthy();
  });
  it(`Test exception`, async () => {
    const header: Energistics.Etp.v12.Datatypes.MessageHeader = {
      protocol: 0,
      messageType: Energistics.Etp.v12.Protocol.Core.MsgProtocolException,
      correlationId: BigInt(-1),
      messageId: BigInt(1),
      messageFlags: MessageFlags.FINALPART
    };
    const v = await new Promise(resolve => {
      etpClient.on("exception", () => {
        resolve(true);
      });
      const exception: Energistics.Etp.v12.Protocol.Core.ProtocolException = {
        error: { code: 1, message: "Error" },
        errors: new Map()
      };
      etpClient.handleMessage(header, exception);
      setTimeout(() => resolve(false), 5000);
    });
    expect(v).toBeTruthy();
  });
  it(`Test On Ping`, async () => {
    const header: Energistics.Etp.v12.Datatypes.MessageHeader = {
      protocol: 0,
      messageType: Energistics.Etp.v12.Protocol.Core.MsgPing,
      correlationId: BigInt(-1),
      messageId: BigInt(1),
      messageFlags: MessageFlags.FINALPART
    };
    const v = await new Promise(resolve => {
      etpClient.on("ping", () => {
        resolve(true);
      });
      const ping: Energistics.Etp.v12.Protocol.Core.Ping = {
        currentDateTime: BigInt(0)
      };
      etpClient.handleMessage(header, ping);
      setTimeout(() => resolve(false), 5000);
    });
    expect(v).toBeTruthy();
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
    const v = await new Promise(resolve => {
      etpClient.on("close", () => {
        resolve(true);
      });
      etpClient.handleMessage(header, closeMsg);
      setTimeout(() => resolve(false), 5000);
    });
    expect(v).toBeTruthy();
  });
});

//*****************************************************/
/// REST API
//*****************************************************/
describe("Rest server health", () => {
  it.each(serverData)("Check API readiness probe %s", async type => {
    await testServers[type]
      .get(`${restApiRoutePath}/health/readiness`)
      .expect(200);
  });
  it.each(serverData)("Check API liveness probe %s", async type => {
    await testServers[type]
      .get(`${restApiRoutePath}/health/liveness`)
      .expect(200);
  });
});

describe("Large number of API access", () => {
  jest.setTimeout(maxTime);
  it.each(serverData)(`Get Dataspace Ok %s`, async type => {
    for (let i = 0; i < 200; i++) {
      await testServers[type]
        .get(`${restApiRoutePath}/dataspaces`)
        .set(`Authorization`, `Bearer ${token}`)
        .expect(`Content-Type`, /json/)
        .expect(200);
    }
  });
});

describe("Rest API", () => {
  it.each(serverData)("sliceArray", () => {
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

  it.each(serverData)(
    "QueryString",
    async () => {
      const c = new ResqmlClient();
      c.setCallsTraceability(false);
      const query = {
        top: 4
      };
      await c.openSession(etpServerUrl, jwt, testDataPartitionId);
      const projects = await c.getDataspaces();
      const volveDataspace = (projects &&
        projects.find(project => project.path.includes(dataspaceName))) || {
        uri: ""
      };
      const res = await controlUtils.findResources(
        c,
        {
          uri: volveDataspace.uri,
          depth: 1,
          dataObjectTypes: [],
          navigableEdges: "Both"
        },
        query
      );
      await c.closeSession();
      expect(res).toHaveLength(89);
    },
    400000
  );
});
describe(`Dataspace`, () => {
  it.each(serverData)(`Get Dataspace Unauthorized %s`, async type => {
    await testServers[type]
      .get(`${restApiRoutePath}/dataspaces`)
      .expect(`Content-Type`, /json/)
      .expect(403);
  });

  it.each(serverData)(`Bad Bearer Format %s`, async type => {
    await testServers[type]
      .get(`${restApiRoutePath}/dataspaces`)
      .set(`Authorization`, `${token}`)
      .expect(`Content-Type`, /json/)
      .expect(403);
  });

  it.each(serverData)(`Get Dataspace Ok %s`, async type => {
    await testServers[type]
      .get(`${restApiRoutePath}/dataspaces`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
  });
});
describe(`Auth`, () => {
  it.each(serverData)(`No token %s`, async type => {
    const uris = [
      `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources`,
      `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}`,
      `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/all`,
      `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}`,
      `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/targets`,
      `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/sources`,
      `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/arrays`
    ];
    for (const u of uris) {
      await testServers[type].get(u).expect(403);
    }
  });

  it.each(serverData)(`Wrong dataspace %s`, async type => {
    const uris = [
      `${restApiRoutePath}/dataspaces/${wrongDataspaceEncoded}/resources`,
      `${restApiRoutePath}/dataspaces/${wrongDataspaceEncoded}/resources/${tSurfType}`,
      `${restApiRoutePath}/dataspaces/${wrongDataspaceEncoded}/resources/all`,
      `${restApiRoutePath}/dataspaces/${wrongDataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/targets`,
      `${restApiRoutePath}/dataspaces/${wrongDataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/sources`,
      `${restApiRoutePath}/dataspaces/${wrongDataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/arrays`
    ];
    for (const u of uris) {
      await testServers[type]
        .get(u)
        .set(`Authorization`, `Bearer ${token}`)
        .expect(500);
    }
  });
});
describe(`DataArray`, () => {
  it.each(serverData)(`Check Endianness`, () => {
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
  const jsonMime = "application/json; charset=utf-8";
  it.each(serverData)(`Dataspaces %s`, async type => {
    const res = await testServers[type]
      .get(`${restApiRoutePath}/dataspaces`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    const len = res.body.length;
    expect(len).toBeGreaterThan(0);
  });
  it.each(serverData)(`Types %s`, async type => {
    const res = await testServers[type]
      .get(`${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body).toHaveLength(14);
  });

  it.each(serverData)(`Wrong dataspacesTypes %s`, async type => {
    await testServers[type]
      .get(`${restApiRoutePath}/dataspaces/${wrongDataspaceEncoded}/resources`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(404);
  });

  it.each(serverData)(`Resource by Types %s`, async type => {
    const res = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body).toHaveLength(3);
    const res2 = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}?$skip=1&$top=1`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res2.body).toHaveLength(1);
  });
  it.each(serverData)(`Find Resources %s`, async type => {
    const res = await testServers[type]
      .get(`${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/all`)

      .query(`$filter=startswith(SurfaceRole,'map') eq true`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body).toHaveLength(3);
  });

  it.each(serverData)(`Find Resources %s`, async type => {
    const res = await testServers[type]
      .get(`${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/all`)

      .query(`$filter=endswith(SurfaceRole,'map') eq true`)
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body).toHaveLength(3);
  });

  it.each(serverData)(`Get DataObjects JSON %s`, async type => {
    const res = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveLength(1);
    expect(res.header[`content-type`]).toBe(jsonMime);
  });

  it.each(serverData)(`Get DataObjects JSON Resolved %s`, async type => {
    const res = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}?referencedContent=true`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveLength(1);
    expect(res.header[`content-type`]).toBe(jsonMime);
  });

  it.each(serverData)(`Get DataObjects XML %s`, async type => {
    const res = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}?$format=xml`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res.header["content-type"]).toBe(
      "application/x-resqml+xml; charset=utf-8"
    );
    expect(res.text).toBeDefined();
  });

  it.each(serverData)(`Get Targets %s`, async type => {
    const res = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/targets`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveLength(2);
    const res2 = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/targets?$skip=1&$top=1`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res2.body).toHaveLength(1);
  });

  it.each(serverData)(`Get Sources %s`, async type => {
    const res = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/sources`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveLength(2);
    const res2 = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/sources?$skip=1&$top=1`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(200);
    expect(res2.body).toHaveLength(1);
  });

  it.each(serverData)(`Get Arrays %s`, async type => {
    const res = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/${tSurfType}/${tSurfUid}/arrays`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body).toHaveLength(38);
  });

  it.each(serverData)(`Get DataArrayMetadata %s`, async type => {
    const pathInResource = encodeURIComponent(
      `/RESQML/${tSurfUid}/points_patch0`
    );
    await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/eml20.obj_EpcExternalPartReference/${externalPartUid}/arrays/${pathInResource}/metadata`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
  });

  it.each(serverData)(`Get DataArray JSON %s`, async type => {
    const pathInResource = encodeURIComponent(
      `/RESQML/${tSurfUid}/triangles_patch0`
    );
    const res = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/eml20.obj_EpcExternalPartReference/${externalPartUid}/arrays/${pathInResource}`
      )
      .set(`Authorization`, `Bearer ${token}`)
      .expect(`Content-Type`, /json/)
      .expect(200);
    expect(res.body.data.data[0]).toBe(48);
  });

  it.each(serverData)(`Get DataArray Base64 %s`, async type => {
    const pathInResource = encodeURIComponent(
      `/RESQML/${tSurfUid}/triangles_patch0`
    );
    const res = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/eml20.obj_EpcExternalPartReference/${externalPartUid}/arrays/${pathInResource}`
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

  it.each(serverData)(`Get DataSubArray %s`, async type => {
    const pathInResource = encodeURIComponent(
      `/RESQML/${tSurfUid}/points_patch0`
    );
    const res = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/eml20.obj_EpcExternalPartReference/${externalPartUid}/arrays/${pathInResource}`
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

  it.each(serverData)(`Get DataSubArray Base64 %s`, async type => {
    const pathInResource = encodeURIComponent(
      `/RESQML/${tSurfUid}/points_patch0`
    );
    const res = await testServers[type]
      .get(
        `${restApiRoutePath}/dataspaces/${dataspaceEncoded}/resources/eml20.obj_EpcExternalPartReference/${externalPartUid}/arrays/${pathInResource}`
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
describe(`Manifest`, () => {
  it.each(serverData)(
    `Manifest with references %s`,
    async type => {
      const manifestInput = {
        uris: [
          "eml:///dataspace('demo/Volve')/resqml20.obj_TriangulatedSetRepresentation(a3f31b20-c93a-4682-8f6c-71be087202a4)",
          "eml:///dataspace('demo/Volve')/resqml20.obj_ContinuousProperty(1615d8d2-2a2d-482c-885e-14225b89e90c)",
          "eml:///dataspace('demo/Volve')/resqml20.obj_StratigraphicColumn(86a81e8f-5995-46a6-a84e-57669b167007)",
          "eml:///dataspace('demo/Volve')/resqml20.obj_SubRepresentation(e802bbac-d36e-4df1-95ee-bbe5ea5a85fb)"
        ],
        acl: {
          viewers: ["data.rdms-mygroup.viewers@mypartition.mycompany.com"],
          owners: ["data.rdms-mygroup.owners@mypartition.mycompany.com"]
        },
        legal: {
          legaltags: ["my.legal.tags"],
          otherRelevantDataCountries: ["US", "UK"]
        },
        fileCollection:
          "mypartition:dataset--FileCollection.Generic:myepcfile:",
        tags: {
          quality: "good"
        },
        createMissingReferences: true
      };
      const res = await testServers[type]
        .post(`${restApiRoutePath}/manifests/build`)
        .set(`Authorization`, `Bearer ${token}`)
        .send(manifestInput)
        .expect(`Content-Type`, /json/)
        .expect(201);
      const manifest = res.body as Manifest;
      expect(manifest.Data?.Datasets).toBeDefined();
      expect(manifest.Data?.WorkProduct).toBeUndefined();
      expect(manifest.Data?.WorkProductComponents?.length).toBe(28);
      expect(manifest.ReferenceData?.length).toBe(13);
    },
    maxTime
  );
});
