import { expect, jest } from "@jest/globals";
import { Energistics, ResqmlClient as OpenETPClient } from "../index";
import config, { describeif, logger } from "./testConfig";
import { ErrorCode } from "../lib/common/EtpTypes";
import { v4 as uuidv4 } from 'uuid';
import {
  verifyProtocolExceptionResponse,
  verifyErrorMessage,
  verifyTotalErrors,
  verifyMessage
} from "./helper/testHelpers";
import { DataObjectFactory } from "./helper/DataObjectFactory";
import { EventName } from "./helper/constants";

import GetDataObjectsResponse = Energistics.Etp.v12.Protocol.Store.GetDataObjectsResponse;
import DeleteDataObjects = Energistics.Etp.v12.Protocol.Store.DeleteDataObjects;
import DeleteDataObjectsResponse = Energistics.Etp.v12.Protocol.Store.DeleteDataObjectsResponse;
import PutDataObjectsResponse = Energistics.Etp.v12.Protocol.Store.PutDataObjectsResponse;
import GetDataObjectsResponseTypeId = Energistics.Etp.v12.Protocol.Store.MsgGetDataObjectsResponse;
import MsgDeleteDataObjectsResponseTypeId = Energistics.Etp.v12.Protocol.Store.MsgDeleteDataObjectsResponse;
import MsgPutDataObjectsResponseTypeId = Energistics.Etp.v12.Protocol.Store.MsgPutDataObjectsResponse;

export const invalidUri = "eml://invalidUri";
export const unsupportedDataObjectUri =
  "eml:///witsml21.Unsupported(301b6ebe-a211-49e2-a556-f7378576ddc9)";
jest.setTimeout(3 * 1000);

if (!config.etpServerUrl.startsWith("ws")) {
  logger.error("Invalid ETP server URL. Must start with ws:// or wss://");
  process.exit(1);
}

describeif(config.protocols.store.supported)("(4) Store protocol", () => {
  const client = new OpenETPClient();

  beforeAll(async () => {
    await client.connect(
      config.etpServerUrl,
      config.jwtToken,
      config.dataPartition
    );
    await client.requestSession();
  });

  afterAll(async () => {
    if (client.isConnected()) {
      await client.disconnect();
    }
  });

  describeif(config.runExperimental)("9.3.1 Message: GetDataObjects", () => {
    const wellUri = config.protocols.store.wellUriForGet;
    const trajectoryUri = config.protocols.store.trajectoryUriForGet;
    const wellBoreUri = config.protocols.store.wellBoreUriForGet;
    const channelUri = config.protocols.store.channelUriForGet;
    const uris = [wellUri, trajectoryUri, channelUri, wellBoreUri].filter(
      uri => uri !== ""
    );

    it("Should emit GetDataObjectsResponse event", done => {
      client.store.once(EventName.GET_DATA_OBJECT_RESPONSE, () => {
        done();
      });
      client.getDataObjects(uris);
    });

    it("9.3.6 Response should be a GetDataObjectsResponse etp message", done => {
      client.store.once(
        EventName.GET_DATA_OBJECT_RESPONSE,
        function (response) {
          verifyMessage(
            response,
            new GetDataObjectsResponse(),
            GetDataObjectsResponseTypeId
          );
          expect(response.body.dataObjects.size).toBe(uris.length);
          done();
        }
      );
      client.getDataObjects(uris);
    });
  });

  describeif(config.runExperimental)(
    "9.3.1: GetDataObjects with errors",
    () => {
      let successResponse: any;
      let errorResponse: any;
      const validUri = config.protocols.store.wellUriForGet;
      const resourceNotFoundUri = config.protocols.store.resourceNotFoundUri;
      const uris = [
        validUri,
        resourceNotFoundUri,
        invalidUri,
        unsupportedDataObjectUri
      ];

      beforeAll(done => {
        const successPromise = new Promise(resolve => {
          client.store.once(EventName.GET_DATA_OBJECT_RESPONSE, data => {
            successResponse = data;
            resolve(data);
          });
        });
        const exceptionPromise = new Promise(resolve => {
          client.store.once(EventName.PROTOCOL_EXCEPTION, data => {
            errorResponse = data;
            resolve(data);
          });
        });

        Promise.all([successPromise, exceptionPromise])
          .then(() => {
            done();
          })
          .catch(error => {
            done(error);
          });
        client.getDataObjects(uris);
      });

      it("Valid uri should emit GetDataObjectsResponse etp message", () => {
        verifyMessage(
          successResponse,
          new GetDataObjectsResponse(),
          GetDataObjectsResponseTypeId
        );
        expect(successResponse.body.dataObjects.size).toBe(1);
      });

      it("Wrong uri's should emit ProtocolException etp message", () => {
        verifyProtocolExceptionResponse(errorResponse);
      });

      it("ProtocolException should contain 3 errors ", () => {
        verifyTotalErrors(errorResponse, 3);
      });

      const errorCases = [
        { uri: resourceNotFoundUri, code: ErrorCode.ENOT_FOUND },
        { uri: invalidUri, code: ErrorCode.EINVALID_URI },
        {
          uri: unsupportedDataObjectUri,
          code: ErrorCode.EDATAOBJECTTYPE_NOTSUPPORTED
        }
      ];

      errorCases.forEach(({ uri, code }) => {
        it(`Error for ${uri}: should be code ${code}`, () => {
          verifyErrorMessage(errorResponse, `${uri}`, code);
        });
      });
    }
  );

  describeif(config.runExperimental && config.protocols.store.supportsWrite)
  ("9.3.2 Message: PutDataObjects => putDataObjects with errors", () => {
      let errorResponse: any;
      let successResponse: any;

      const uuid = uuidv4();
      const validUri = DataObjectFactory.createWellUri(uuid);

      const objects = DataObjectFactory.generateWellObjects([uuid, "invalidObj"]);
      objects.push(DataObjectFactory.createInvalidObject());

      const errorCases = [
        { uri: objects[1].resource.uri, code: ErrorCode.EINVALID_URI },
        { uri: objects[2].resource.uri, code: ErrorCode.EINVALID_OBJECT }
      ];

      beforeAll(done => {
        const successDeletePromise = new Promise(resolve => {
          client.store.once(EventName.PUT_DATA_OBJECTS_RESPONSE, data => {
            successResponse = data;
            resolve(data);
          });
        });
        const successExceptionPromise = new Promise(resolve => {
          client.store.once(EventName.PROTOCOL_EXCEPTION, data => {
            errorResponse = data;
            resolve(data);
          });
        });

        Promise.all([successDeletePromise, successExceptionPromise])
          .then(() => {
            done();
          })
          .catch(error => {
            done(error);
          });

        client.putDataObjects(objects);
      });

      it("9.3.3 Message: PutDataObjectsResponse => Response should be a PutDataObjectsResponse etp message", () => {
        verifyMessage(successResponse, new PutDataObjectsResponse(), MsgPutDataObjectsResponseTypeId);
      });

      it("Verify objects were created in store", done => {
        client.store.once(EventName.GET_DATA_OBJECT_RESPONSE, data => {
          expect(data.body.dataObjects.size).toBe(1);
          expect(data.body.dataObjects.has(validUri)).toBe(true);
          done();
        });
        client.getDataObjects([validUri]);
      });

      it("5.3.8 Message: ProtocolException => Response should be a ProtocolException etp message", () => {
        verifyProtocolExceptionResponse(errorResponse);
      });

      it("Response should contain 2 errors", () => {
        verifyTotalErrors(errorResponse, 2);
      });

      errorCases.forEach(({ uri, code }) => {
        it(`Error for ${uri} should be code ${code}`, () => {
          verifyErrorMessage(errorResponse, uri, code);
        });
      });
    }
  );

  describeif(config.runExperimental && config.protocols.store.supportsWrite)
  ("9.3.2 Message: PutDataObjects => putDataObjects (2.1)", () => {
    let objects: any;
    let response: any;

    const uuid1 = uuidv4();
    const uuid2 = uuidv4();
    const validUri = DataObjectFactory.createWellUri(uuid1);
    const validUri2 = DataObjectFactory.createWellUri(uuid2);

    beforeAll(done => {
      objects = DataObjectFactory.generateWellObjects([uuid1, uuid2]);
      client.store.once(EventName.PUT_DATA_OBJECTS_RESPONSE, data => {
        response = data;
        done();
      });
      client.putDataObjects(objects);
    });

    it("9.3.3 Message: PutDataObjectsResponse => Response should be a PutDataObjectsResponse etp message", () => {
      verifyMessage(response, new PutDataObjectsResponse(), MsgPutDataObjectsResponseTypeId);
    });

    // verify object was created
    it("Verify objects were created in store", done => {
      client.store.once(EventName.GET_DATA_OBJECT_RESPONSE, data => {
        expect(data.body.dataObjects.size).toBe(2);
        expect(Array.from(data.body.dataObjects.keys())).toEqual(expect.arrayContaining([validUri, validUri2]))
        done();
      });
      client.getDataObjects([validUri, validUri2]);
    });
  });

  describeif(config.runExperimental && config.protocols.store.supportsWrite)
  ("9.3.4 Message: DeleteDataObjects with errors=> deleteDataObjects", () => {
      let errorResponse: any;
      let successResponse: any;

      const uuid1 = uuidv4();
      const uuid2 = uuidv4();
      const validUri = DataObjectFactory.createWellUri(uuid1);
      const validUri2 = DataObjectFactory.createWellUri(uuid2);
      const deleteNotSupportedUri = config.protocols.store.unsupportedDeleteUri;
      const resourceNotFoundUri = config.protocols.store.resourceNotFoundUri;

      const inputObject: DeleteDataObjects = new DeleteDataObjects();
      inputObject.pruneContainedObjects = true;

      const urisForDeleteRequest = [
        validUri,
        validUri2,
        deleteNotSupportedUri,
        invalidUri,
        resourceNotFoundUri,
        unsupportedDataObjectUri
      ];

      beforeAll(done => {
        // first create data objects in store
        const putDataObjectsPromise = new Promise<void>(resolve => {
          client.store.once(EventName.PUT_DATA_OBJECTS_RESPONSE, data => {
            expect(data.body.success.size).toBe(2);
            resolve();
          });
          client.putDataObjects(DataObjectFactory.generateWellObjects([uuid1, uuid2]));
        });

        // verify objects were created
        const objectCreatedPromise = putDataObjectsPromise.then(() => {
          client.store.once(EventName.GET_DATA_OBJECT_RESPONSE, data => {
            expect(data.body.dataObjects.size).toBe(2);
          });
          client.getDataObjects([validUri, validUri2]);
        });

        // send delete data object request
        objectCreatedPromise.then(() => {
          const successDeletePromise = new Promise(resolve => {
            client.store.once(EventName.DELETE_DATA_OBJECTS_RESPONSE, data => {
              successResponse = data;
              resolve(data);
            });
          });
          const successExceptionPromise = new Promise(resolve => {
            client.store.once(EventName.PROTOCOL_EXCEPTION, data => {
              errorResponse = data;
              resolve(data);
            });
          });

          Promise.all([successDeletePromise, successExceptionPromise])
            .then(() => {
              done();
            })
            .catch(error => {
              done(error);
            });

          client.store.deleteObjectsWithPrune(urisForDeleteRequest, false);
        });
      });

      it("9.3.5 Message: DeleteDataObjectsResponse => The first response should be a DeleteDataObjectsResponse etp message", () => {
        verifyMessage(successResponse, new DeleteDataObjectsResponse(), MsgDeleteDataObjectsResponseTypeId);
      });

      it("There should be two deletedUri's", () => {
        expect(successResponse.body.deletedUris.size).toBe(2);
      });

      // verify objects were deleted
      it("Verify objects were deleted", done => {
        client.store.once(EventName.GET_DATA_OBJECT_RESPONSE, data => {
          expect(data.body.dataObjects.size).toBe(0);
          done();
        });
        client.getDataObjects([validUri, validUri2]);
      })

      it(`Deleted uris should be ${validUri} & ${validUri2}`, () => {
        expect(Array.from(successResponse.body.deletedUris.keys())).toEqual(
          expect.arrayContaining([validUri, validUri2])
        );
      });

      it("5.3.8 Message: ProtocolException => The second response should be a ProtocolException etp message", () => {
        verifyProtocolExceptionResponse(errorResponse);
      });

      it("ProtocolException response should contain 4 errors", () => {
        verifyTotalErrors(errorResponse, 4);
      });

      const errorCases = [
        { uri: deleteNotSupportedUri, code: ErrorCode.ENOCASCADE_DELETE },
        { uri: invalidUri, code: ErrorCode.EINVALID_URI },
        { uri: resourceNotFoundUri, code: ErrorCode.ENOT_FOUND },
        { uri: unsupportedDataObjectUri, code: ErrorCode.EDATAOBJECTTYPE_NOTSUPPORTED }
      ];

      errorCases.forEach(({ uri, code }) => {
        it(`Error for ${uri}: should be code ${code}`, () => {
          verifyErrorMessage(errorResponse, `${uri}`, code);
        });
      });
    }
  );
});
