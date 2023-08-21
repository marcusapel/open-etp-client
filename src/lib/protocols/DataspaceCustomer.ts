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
  ArrayResponseHandler,
  SuccessMapResponseHandler
} from "../common/ResponseHandlers";

import { Energistics, Integer64 } from "../common/Etp12";

const dataSpace = Energistics.Etp.v12.Protocol.Dataspace;
const Core = Energistics.Etp.v12.Protocol.Core;
const PROTOCOL = Energistics.Etp.v12.Datatypes.Protocol;

export type Dataspace = Energistics.Etp.v12.Datatypes.Object.Dataspace;

/**
 * Implementation of client for Dataspace protocol
 *
 * @export
 * @class DataspaceCustomer
 * @extends {BaseHandler}
 */
export class DataspaceCustomer extends BaseHandler {
  private readonly sessionManager: ETPCore;
  private readonly dataSpaceResults;
  private readonly successResolve;

  constructor(sessionManager: ETPCore) {
    super(sessionManager);
    this.sessionManager = sessionManager;
    this._role = "customer";
    this._protocol = PROTOCOL.Dataspace;
    this.dataSpaceResults = new ArrayResponseHandler<Dataspace>(
      sessionManager.responseTimeoutPeriod
    );
    this.successResolve = new SuccessMapResponseHandler(
      sessionManager.responseTimeoutPeriod
    );
  }

  public handleMessage(
    messageHeader: Energistics.Etp.v12.Datatypes.MessageHeader,
    messageBody:
      | Energistics.Etp.v12.Protocol.Dataspace.GetDataspacesResponse
      | Energistics.Etp.v12.Protocol.Dataspace.PutDataspacesResponse
      | Energistics.Etp.v12.Protocol.Dataspace.DeleteDataspacesResponse
      | Energistics.Etp.v12.Protocol.Core.ProtocolException
  ): void {
    if (messageHeader.protocol === PROTOCOL.Dataspace) {
      switch (messageHeader.messageType) {
        case dataSpace.MsgGetDataspacesResponse: {
          this.logTrace(
            `Received Dataspace.GetDataspacesResponse message for ${messageHeader.correlationId}.`
          );
          this.onGetDataspacesResponse(
            messageHeader,
            messageBody as Energistics.Etp.v12.Protocol.Dataspace.GetDataspacesResponse
          );
          break;
        }
        case dataSpace.MsgPutDataspacesResponse: {
          this.logTrace(
            `Received Dataspace.PutDataspacesResponse message for ${messageHeader.correlationId}.`
          );
          this.successResolve.onResponse(
            messageHeader,
            (
              messageBody as Energistics.Etp.v12.Protocol.Dataspace.PutDataspacesResponse
            ).success
          );
          break;
        }
        case dataSpace.MsgDeleteDataspacesResponse: {
          this.logTrace(
            `Received Dataspace.DeleteDataspacesResponse message for ${messageHeader.correlationId}.`
          );
          this.successResolve.onResponse(
            messageHeader,
            (
              messageBody as Energistics.Etp.v12.Protocol.Dataspace.DeleteDataspacesResponse
            ).success
          );
          break;
        }
        case Core.MsgProtocolException: {
          this.logTrace(
            `Received Dataspace.ProtocolException message for ${messageHeader.correlationId}.`
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
        `Unsupported protocol {${messageHeader.protocol}} in DataspaceCustomer`
      );
    }
  }

  /**
   * Implement the search of associated resource, through graph.
   * make sure that we don't search in a loop by tracking already found items
   *
   * @param {null | Integer64} lastChangedFilter Optional filter for recently changed projects only
   * @returns {Promise<Dataspace[]>}
   * @memberof DataspaceCustomer
   */
  public getDataspaces(
    storeLastWriteFilter: null | Integer64 = null
  ): Promise<Dataspace[]> {
    const header = this.sessionManager.createFinalMessageHeader(
      PROTOCOL.Dataspace,
      dataSpace.MsgGetDataspaces,
      BigInt(0)
    );
    const getDataspaces: Energistics.Etp.v12.Protocol.Dataspace.GetDataspaces =
      {
        storeLastWriteFilter
      };
    this.logTrace(
      `Sending Dataspace.GetDataspaces message ${header.messageId}.`
    );
    return this.dataSpaceResults.waitForRequest(
      this.sessionManager.send(header, getDataspaces)
    );
  }

  /**
   * Create new dataspaces
   *
   * @param {Dataspace[]} dataspaces Description of the dataspaces
   * @returns {Promise<Map<string,string>}
   * @memberof DataspaceCustomer
   */
  public PutDataspaces(
    dataspaces: Dataspace[]
  ): Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]> {
    const header = this.sessionManager.createFinalMessageHeader(
      PROTOCOL.Dataspace,
      dataSpace.MsgPutDataspaces,
      BigInt(0)
    );
    const dataspaceMap = new Map<
      string,
      Energistics.Etp.v12.Datatypes.Object.Dataspace
    >();
    const keys: string[] = [];
    dataspaces.forEach(d => {
      const key = encodeURI(d.uri);
      dataspaceMap.set(key, d);
      keys.push(key);
    });
    const putDataspaces: Energistics.Etp.v12.Protocol.Dataspace.PutDataspaces =
      {
        dataspaces: dataspaceMap
      };
    this.logTrace(
      `Sending Dataspace.PutDataspaces message ${header.messageId}.`
    );
    return this.successResolve.waitForRequest(
      this.sessionManager.send(header, putDataspaces),
      keys
    );
  }

  /**
   * Delete existing dataspaces
   *
   * @param {string[]} dataspaceURIs Description of the dataspaces
   * @returns {Promise<Map<string,string>}
   * @memberof DataspaceCustomer
   */
  public DeleteDataspaces(
    dataspaceURIs: string[]
  ): Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]> {
    const header = this.sessionManager.createFinalMessageHeader(
      PROTOCOL.Dataspace,
      dataSpace.MsgDeleteDataspaces,
      BigInt(0)
    );
    const uris = new Map<string, string>();
    const keys: string[] = [];
    dataspaceURIs.forEach(d => {
      const key = encodeURI(d);
      uris.set(key, key);
      keys.push(key);
    });
    const deleteDataspaces: Energistics.Etp.v12.Protocol.Dataspace.DeleteDataspaces =
      {
        uris
      };
    this.logTrace(
      `Sending Dataspace.DeleteDataspaces message ${header.messageId}.`
    );
    return this.successResolve.waitForRequest(
      this.sessionManager.send(header, deleteDataspaces),
      keys
    );
  }

  /**
   * Resolve a Dataspace query corresponding to the correlationId.
   *
   * @private
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @param {Energistics.Etp.v12.Protocol.Dataspace.GetDataspacesResponse} message
   * @returns {boolean}
   * @memberof DataspaceCustomer
   */
  private onGetDataspacesResponse(
    header: Energistics.Etp.v12.Datatypes.MessageHeader,
    message: Energistics.Etp.v12.Protocol.Dataspace.GetDataspacesResponse
  ): boolean {
    return this.dataSpaceResults.onResponse(header, message.dataspaces);
  }

  /**
   * Cancel the dataSpace request
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
