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
  DataObject,
  ErrorCode,
  ErrorInfo,
  MessageFlags
} from "../common/EtpTypes";

import { BaseHandler } from "../common/BaseHandler";
import { ETPCore } from "../common/ETPCore";
import {
  MapResponseHandler,
  SuccessMapResponseHandler
} from "../common/ResponseHandlers";

import { Energistics } from "../common/Etp12";

const Core = Energistics.Etp.v12.Protocol.Core;
const Store = Energistics.Etp.v12.Protocol.Store;
const PROTOCOL = Energistics.Etp.v12.Datatypes.Protocol;

/**
 * Implementation of client for Store protocol
 *
 * @export
 * @class StoreCustomer
 * @extends {BaseHandler}
 */
export class StoreCustomer extends BaseHandler {
  private readonly storeResolve;
  private readonly successResolve;

  constructor(public sessionManager: ETPCore) {
    super(sessionManager);
    this._role = "customer";
    this._protocol = PROTOCOL.Store;
    this.successResolve = new SuccessMapResponseHandler(
      sessionManager.responseTimeoutPeriod
    );
    this.storeResolve = new MapResponseHandler<DataObject>(
      sessionManager.responseTimeoutPeriod
    );
  }
  public handleMessage(
    messageHeader: Energistics.Etp.v12.Datatypes.MessageHeader,
    messageBody: any
  ) {
    if (messageHeader.protocol !== PROTOCOL.Store) {
      throw new Error(
        `Unsupported protocol {${messageHeader.protocol}} in Store`
      );
    }
    switch (messageHeader.messageType) {
      case Store.MsgGetDataObjectsResponse: {
        this.logTrace(
          `Received Store.GetDataObjectsResponse message for ${messageHeader.correlationId}.`
        );
        const body =
          messageBody as Energistics.Etp.v12.Protocol.Store.GetDataObjectsResponse;
        this.onGetDataObjectsResponse(messageHeader, body);
        break;
      }
      case Store.MsgPutDataObjectsResponse: {
        this.logTrace(
          `Received Store.PutDataObjectsResponse message for ${messageHeader.correlationId}.`
        );
        this.onPutDataObjectsResponse(
          messageHeader,
          messageBody as Energistics.Etp.v12.Protocol.Store.PutDataObjectsResponse,
          this.successResolve
        );
        break;
      }
      case Store.MsgDeleteDataObjectsResponse: {
        this.logTrace(
          `Received Store.DeleteDataObjectsResponse message for ${messageHeader.correlationId}.`
        );
        this.onDeleteDataObjectsResponse(
          messageHeader,
          messageBody as Energistics.Etp.v12.Protocol.Store.DeleteDataObjectsResponse,
          this.successResolve
        );
        break;
      }
      case Core.MsgProtocolException: {
        this.logTrace(
          `Received Store.ProtocolException message for ${messageHeader.correlationId}.`
        );
        const errorMessage =
          messageBody as Energistics.Etp.v12.Protocol.Core.ProtocolException;
        this.onDataObjectsError(messageHeader, errorMessage);
        break;
      }
      default: {
        super.handleMessage(messageHeader, messageBody);
      }
    }
  }

  /**
   * Get some XML objects from the server
   *
   * @param {string[]} uriString
   * @returns {(Promise<Array<DataObject | null>>)}
   * @memberof StoreCustomer
   */
  public get(uriString: string[]): Promise<Array<DataObject | null>> {
    this.logTrace(`Getting ${uriString} from store`);
    let header: Energistics.Etp.v12.Datatypes.MessageHeader =
      this.sessionManager.createFinalMessageHeader(
        PROTOCOL.Store,
        Store.MsgGetDataObjects,
        BigInt(0)
      );
    const uris = new Map<string, string>();
    const keys: string[] = uriString.map((u: string) => {
      const key = encodeURI(u);
      uris.set(key, key);
      return key;
    });
    const getDataObject: Energistics.Etp.v12.Protocol.Store.GetDataObjects = {
      format: "xml",
      uris
    };
    const data = this.sessionManager.computeData(header, getDataObject);
    this.logTrace(`Sending Store.GetDataObjects ${header.messageId}.`);

    // Size of message exceed allowed size
    if (
      this.sessionManager.negotiatedSize &&
      data.byteLength > this.sessionManager.negotiatedSize
    ) {
      const nbPart = Math.ceil(
        data.byteLength / this.sessionManager.negotiatedSize
      );
      const partSize = Math.ceil(uris.size / nbPart);
      let nbUris = 0;
      for (let i = 0; i < nbPart; i++) {
        const uriMap = new Map<string, string>();
        for (let j = 0; j < partSize && nbUris < keys.length; j++, nbUris++) {
          const key = keys[nbUris];
          uriMap.set(key, key);
        }
        const getDataObject2: Energistics.Etp.v12.Protocol.Store.GetDataObjects =
          {
            format: "xml",
            uris: uriMap
          };
        const data2 = this.sessionManager.computeData(header, getDataObject2);
        if (i === nbPart - 1) {
          // Last part, create a promise
          return this.storeResolve.waitForRequest(
            this.sessionManager.sendData(header.messageId, data2),
            keys
          );
        } else {
          // Not last part, do not wait, create new header
          this.sessionManager.sendData(header.messageId, data2);
          header = this.sessionManager.createFinalMessageHeader(
            PROTOCOL.Store,
            Store.MsgGetDataObjects,
            BigInt(0)
          );
        }
      }
      return this.storeResolve.waitForRequest(
        this.sessionManager.sendData(header.messageId, data),
        keys
      );
    } else {
      return this.storeResolve.waitForRequest(
        this.sessionManager.sendData(header.messageId, data),
        keys
      );
    }
  }

  public async put(
    data: Energistics.Etp.v12.Datatypes.Object.DataObject[]
  ): Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]> {
    const dataObjects = new Map<
      string,
      Energistics.Etp.v12.Datatypes.Object.DataObject
    >();
    data.forEach(d => {
      d.resource.uri = encodeURI(d.resource.uri);
      dataObjects.set(d.resource.uri, d);
    });

    const promises: Array<Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]>> =
      [];

    const negotiatedSize = this.sessionManager.negotiatedSize;
    if (negotiatedSize) {
      // Try to group the objects without exceeding message size

      const header = this.sessionManager.createFinalMessageHeader(
        PROTOCOL.Store,
        Store.MsgPutDataObjects,
        BigInt(0)
      );

      const allBuffer = this.sessionManager.computeData(header, {
        dataObjects,
        pruneContainedObjects: false
      });
      if (allBuffer.byteLength < negotiatedSize) {
        // Remaining objects fit in one message, send them
        promises.push(
          this.successResolve.waitForRequest(
            this.sessionManager.sendData(header.messageId, allBuffer),
            Array.from(dataObjects.keys())
          )
        );
      } else {
        const nbParts = Math.ceil(allBuffer.byteLength / negotiatedSize);
        const partSize = Math.ceil(data.length / nbParts);
        for (let i = 0; i < nbParts; i++) {
          const toSend = i < nbParts - 1 ? data.splice(0, partSize) : data;
          promises.push(this.put(toSend));
        }
      }
    } else {
      // Carefully send one by one
      dataObjects.forEach((value, key) => {
        const header = this.sessionManager.createFinalMessageHeader(
          PROTOCOL.Store,
          Store.MsgPutDataObjects,
          BigInt(0)
        );
        const putDataObject: Energistics.Etp.v12.Protocol.Store.PutDataObjects =
          new Energistics.Etp.v12.Protocol.Store.PutDataObjects();
        putDataObject.dataObjects.set(key, value);
        this.logTrace(
          `Sending Store.PutDataObjects ${header.messageId} : ${key}}.`
        );

        promises.push(
          this.successResolve.waitForRequest(
            this.sessionManager.send(header, putDataObject),
            [key]
          )
        );
      });
    }
    return Promise.all(promises)
      .then(res => res.flat(1))
      .catch(() => {
        const info = new Energistics.Etp.v12.Datatypes.ErrorInfo();
        info.code = ErrorCode.EINVALID_STATE;
        info.message = "Unknown error";
        return Array.from({ length: data.length }, () => info);
      });
  }

  /**
   * Delete a series of objects
   *
   * @param {string[]} uriString
   * @returns {Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]>}
   * @memberof StoreCustomer
   */
  public deleteObjects(
    uriString: string[]
  ): Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]> {
    this.logTrace(`Deleting ${uriString} from store`);
    const header = this.sessionManager.createFinalMessageHeader(
      PROTOCOL.Store,
      Store.MsgDeleteDataObjects,
      BigInt(0)
    );
    const uris = new Map<string, string>();
    const keys: string[] = uriString.map((u: string) => {
      const key = encodeURI(u);
      uris.set(key, key);
      return key;
    });
    const deleteDataObject: Energistics.Etp.v12.Protocol.Store.DeleteDataObjects =
      {
        pruneContainedObjects: false,
        uris
      };

    const data = this.sessionManager.computeData(header, deleteDataObject);
    this.logTrace(`Sending Store.DeleteDataObjects ${header.messageId}.`);

    // Size of message exceed allowed size
    if (
      this.sessionManager.negotiatedSize &&
      data.byteLength > this.sessionManager.negotiatedSize
    ) {
      const nbPart = Math.ceil(
        data.byteLength / this.sessionManager.negotiatedSize
      );
      const partSize = Math.ceil(uris.size / nbPart);
      let nbUris = 0;
      for (let i = 0; i < nbPart; i++) {
        const uriMap = new Map<string, string>();
        for (let j = 0; j < partSize; j++, nbUris++) {
          const key = keys[nbUris];
          uriMap.set(key, key);
        }
        const deleteDataObject2: Energistics.Etp.v12.Protocol.Store.DeleteDataObjects =
          {
            pruneContainedObjects: false,
            uris: uriMap
          };
        const data2 = this.sessionManager.computeData(
          header,
          deleteDataObject2
        );
        if (i === nbPart - 1) {
          // Last part, create a promise
          header.messageFlags = header.messageFlags | MessageFlags.FINALPART;
          return this.successResolve.waitForRequest(
            this.sessionManager.sendData(header.messageId, data2),
            keys
          );
        } else {
          // Not last part, do not wait.
          this.sessionManager.sendData(header.messageId, data2);
        }
      }
      return this.successResolve.waitForRequest(
        this.sessionManager.sendData(header.messageId, data),
        keys
      );
    } else {
      return this.successResolve.waitForRequest(
        this.sessionManager.sendData(header.messageId, data),
        keys
      );
    }
  }

  /**
   * Resolve a PutDataObjects response message query corresponding to the correlationId
   *
   * @private
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @param message
   * @returns nothing
   * @memberof StoreCustomer
   */
  protected onPutDataObjectsResponse(
    header: Energistics.Etp.v12.Datatypes.MessageHeader,
    message: Energistics.Etp.v12.Protocol.Store.PutDataObjectsResponse,
    map: SuccessMapResponseHandler
  ) {
    const m = new Map<string, ErrorInfo>();
    message.success.forEach((value, key) => {
      if (value.createdContainedObjectUris.length > 0) {
        m.set(key, {
          code: ErrorCode.IS_OK,
          message: ""
        });
      }
    });
    map.onException(header, { error: null, errors: m });
  }

  /**
   * Resolve a DeleteDataObjects response message query corresponding to the correlationId
   *
   * @private
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @param message
   * @returns nothing
   * @memberof StoreCustomer
   */
  protected onDeleteDataObjectsResponse(
    header: Energistics.Etp.v12.Datatypes.MessageHeader,
    message: Energistics.Etp.v12.Protocol.Store.DeleteDataObjectsResponse,
    map: SuccessMapResponseHandler
  ) {
    const m = new Map<string, ErrorInfo>();
    message.deletedUris.forEach((_, key) => {
      m.set(key, {
        code: ErrorCode.IS_OK,
        message: ""
      });
    });
    map.onException(header, { error: null, errors: m });
  }

  /**
   * Resolve a DataObject query corresponding to the correlationId.
   *
   * @private
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @param {Energistics.Etp.v12.Protocol.Store.GetDataObjectResponse} message
   * @memberof StoreCustomer
   */
  private async onGetDataObjectsResponse(
    header: Energistics.Etp.v12.Datatypes.MessageHeader,
    message: Energistics.Etp.v12.Protocol.Store.GetDataObjectsResponse
  ) {
    return this.storeResolve.onResponse(header, message.dataObjects);
  }

  /**
   * Cancel the object request
   *
   * @private
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @param {Energistics.Etp.v12.Protocol.Core.ProtocolExceptionTest} message
   * @returns nothing
   * @memberof StoreCustomer
   */
  private onDataObjectsError(
    header: Energistics.Etp.v12.Datatypes.MessageHeader,
    message: Energistics.Etp.v12.Protocol.Core.ProtocolException
  ) {
    if (this.successResolve.onException(header, message)) {
      return;
    }
    if (this.storeResolve.onException(header, message)) {
      return;
    }
  }
}
