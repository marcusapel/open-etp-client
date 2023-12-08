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

import { BaseHandler } from "../common/BaseHandler";
import { ETPCore } from "../common/ETPCore";
import {
  MapResponseHandler,
  SuccessMapResponseHandler
} from "../common/ResponseHandlers";

import { Energistics, Integer64 } from "../common/Etp12";
import { URI } from "../client/ResqmlClient";

const dataSpaceOSDU = Energistics.Etp.v12.Protocol.DataspaceOSDU;
const Core = Energistics.Etp.v12.Protocol.Core;
const PROTOCOL = Energistics.Etp.v12.Datatypes.Protocol;

export type Dataspace = Energistics.Etp.v12.Datatypes.Object.Dataspace;

/**
 * Implementation of client for DataspaceOSDU protocol
 *
 * @export
 * @class DataspaceOSDUCustomer
 * @extends {BaseHandler}
 */
export class DataspaceOSDUCustomer extends BaseHandler {
  private readonly sessionManager: ETPCore;
  private readonly dataSpaceResults;
  private readonly successResolve;

  constructor(sessionManager: ETPCore) {
    super(sessionManager);
    this.sessionManager = sessionManager;
    this._role = "customer";
    this._protocol = PROTOCOL.DataspaceOSDU;
    this.dataSpaceResults = new MapResponseHandler<Dataspace>(
      sessionManager.responseTimeoutPeriod
    );
    this.successResolve = new SuccessMapResponseHandler(
      sessionManager.responseTimeoutPeriod
    );
  }

  public handleMessage(
    messageHeader: Energistics.Etp.v12.Datatypes.MessageHeader,
    messageBody:
      | Energistics.Etp.v12.Protocol.DataspaceOSDU.GetDataspaceInfoResponse
      | Energistics.Etp.v12.Protocol.DataspaceOSDU.CopyDataspacesContentResponse
      | Energistics.Etp.v12.Protocol.DataspaceOSDU.LockDataspacesResponse
      | Energistics.Etp.v12.Protocol.DataspaceOSDU.CopyToDataspaceResponse
      | Energistics.Etp.v12.Protocol.Core.ProtocolException
  ): void {
    if (messageHeader.protocol === PROTOCOL.DataspaceOSDU) {
      switch (messageHeader.messageType) {
        case dataSpaceOSDU.MsgGetDataspaceInfoResponse: {
          this.logTrace(
            `Received DataspaceOSDU.GetDataspaceInfoResponse message for ${messageHeader.correlationId}.`
          );
          const body =
            messageBody as Energistics.Etp.v12.Protocol.DataspaceOSDU.GetDataspaceInfoResponse;
          this.dataSpaceResults.onResponse(messageHeader, body.dataspaces);
          break;
        }
        case dataSpaceOSDU.MsgCopyDataspacesContentResponse: {
          this.logTrace(
            `Received DataspaceOSDU.CopyDataspacesContentResponse message for ${messageHeader.correlationId}.`
          );
          this.successResolve.onResponse(
            messageHeader,
            (
              messageBody as Energistics.Etp.v12.Protocol.DataspaceOSDU.CopyDataspacesContentResponse
            ).success
          );
          break;
        }
        case dataSpaceOSDU.MsgLockDataspacesResponse: {
          this.logTrace(
            `Received DataspaceOSDU.LockDataspacesResponse message for ${messageHeader.correlationId}.`
          );
          this.successResolve.onResponse(
            messageHeader,
            (
              messageBody as Energistics.Etp.v12.Protocol.DataspaceOSDU.LockDataspacesResponse
            ).success
          );
          break;
        }
        case dataSpaceOSDU.MsgCopyToDataspaceResponse: {
          this.logTrace(
            `Received DataspaceOSDU.CopyToDataspaceResponse message for ${messageHeader.correlationId}.`
          );
          this.successResolve.onResponse(
            messageHeader,
            (
              messageBody as Energistics.Etp.v12.Protocol.DataspaceOSDU.CopyToDataspaceResponse
            ).success
          );
          break;
        }
        case Core.MsgProtocolException: {
          this.logTrace(
            `Received DataspaceOSDU.ProtocolException message for ${messageHeader.correlationId}.`
          );
          const errorMessage =
            messageBody as Energistics.Etp.v12.Protocol.Core.ProtocolException;
          this.onDataspaceError(messageHeader, errorMessage);
          break;
        }
        default: {
          super.handleMessage(messageHeader, messageBody);
        }
      }
    } else {
      throw new Error(
        `Unsupported protocol {${messageHeader.protocol}} in DataspaceOSDUCustomer`
      );
    }
  }

  /**
   * Get the information about specific dataspaces dataspaces
   *
   * @param {URI[]} dataspaceUris
   * @returns {Promise<(Dataspace|null)[]>} Description of the dataspaces
   * @memberof DataspaceCustomer
   */
  public getDataspaceInfo(dataspaceUris: URI[]): Promise<(Dataspace | null)[]> {
    const header = this.sessionManager.createFinalMessageHeader(
      PROTOCOL.DataspaceOSDU,
      dataSpaceOSDU.MsgGetDataspaceInfo,
      BigInt(0)
    );
    const keys: string[] = [];
    const uris = new Map<string, string>();
    dataspaceUris.forEach(d => {
      uris.set(d, d);
      keys.push(d);
    });

    const getDataspaces: Energistics.Etp.v12.Protocol.DataspaceOSDU.GetDataspaceInfo =
      {
        uris
      };
    this.logTrace(
      `Sending DataspaceOSDU.GetDataspaceInfo message ${header.messageId}.`
    );
    return this.dataSpaceResults.waitForRequest(
      this.sessionManager.send(header, getDataspaces),
      keys
    );
  }

  /**
   * Copy content of dataspaces into another dataspace
   *
   * @param {URI[]} dataspaces Dataspaces to import by reference
   * @returns {Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]>}
   * @memberof DataspaceCustomer
   */
  public copyDataspacesContent(
    dataspaces: URI[],
    targetDataspace: URI
  ): Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]> {
    const header = this.sessionManager.createFinalMessageHeader(
      PROTOCOL.DataspaceOSDU,
      dataSpaceOSDU.MsgCopyDataspacesContent,
      BigInt(0)
    );
    const dataspaceUris = new Map<string, URI>();
    dataspaces.forEach(d => {
      dataspaceUris.set(encodeURI(d), d);
    });
    const copyDataspaces: Energistics.Etp.v12.Protocol.DataspaceOSDU.CopyDataspacesContent =
      {
        dataspaces: dataspaceUris,
        targetDataspace
      };
    this.logTrace(
      `Sending DataspaceOSDU.CopyDataspacesContent message ${header.messageId}.`
    );
    return this.successResolve.waitForRequest(
      this.sessionManager.send(header, copyDataspaces),
      Array.from(dataspaceUris.keys())
    );
  }

  /**
   * Set/Unset dataspaces read only
   *
   * @param {URI[]} dataspaceURIs Description of the dataspaces
   * @returns {Promise<Map<string,string>}
   * @memberof DataspaceCustomer
   */
  public lockDataspaces(
    dataspaceURIs: URI[],
    lock: boolean = true
  ): Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]> {
    const header = this.sessionManager.createFinalMessageHeader(
      PROTOCOL.DataspaceOSDU,
      dataSpaceOSDU.MsgLockDataspaces,
      BigInt(0)
    );
    const uris = new Map<string, string>();
    const keys: string[] = [];
    dataspaceURIs.forEach(d => {
      const key = encodeURI(d);
      uris.set(key, d);
      keys.push(key);
    });
    const lockDataspaces: Energistics.Etp.v12.Protocol.DataspaceOSDU.LockDataspaces =
      {
        uris,
        lock
      };
    this.logTrace(
      `Sending DataspaceOSDU.LockDataspaces message ${header.messageId}.`
    );
    return this.successResolve.waitForRequest(
      this.sessionManager.send(header, lockDataspaces),
      Array.from(uris.keys())
    );
  }

  /**
   * Copy resource from a dataspaces into another dataspace
   * Note: this requires the resources to be in a read only dataspace
   *
   * @param {URI[]} resources Resource to import
   * @param {URI} dataspaceUri Target dataspace
   * @returns {Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]>}
   * @memberof DataspaceCustomer
   */
  public copyToDataspace(
    resources: URI[],
    dataspaceUri: URI
  ): Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]> {
    const header = this.sessionManager.createFinalMessageHeader(
      PROTOCOL.DataspaceOSDU,
      dataSpaceOSDU.MsgCopyToDataspace,
      BigInt(0)
    );
    const uris = new Map<string, URI>();
    resources.forEach(d => {
      uris.set(encodeURI(d), d);
    });
    const copyToDataspace: Energistics.Etp.v12.Protocol.DataspaceOSDU.CopyToDataspace =
      {
        uris,
        dataspaceUri
      };
    this.logTrace(
      `Sending DataspaceOSDU.copyToDataspace message ${header.messageId}.`
    );
    return this.successResolve.waitForRequest(
      this.sessionManager.send(header, copyToDataspace),
      Array.from(uris.keys())
    );
  }

  /**
   * On receiving a DataspaceOSDU.ProtocolException message, attempt to process it
   *
   * @private
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @param {Energistics.Etp.v12.Protocol.Core.ProtocolExceptionTest} message
   * @returns nothing
   * @memberof DataspaceCustomer
   */
  private onDataspaceError(
    header: Energistics.Etp.v12.Datatypes.MessageHeader,
    message: Energistics.Etp.v12.Protocol.Core.ProtocolException
  ) {
    if (!header.correlationId) {
      return;
    }
    if (this.successResolve.onException(header, message)) {
      return;
    }
    if (this.dataSpaceResults.onException(header, message)) {
      return;
    }
    // getDataspace is not multipart, so no need to attempt processing errors
    throw new Error(
      `Error returned on unknown dataSpace message ${header.correlationId}`
    );
  }
}
