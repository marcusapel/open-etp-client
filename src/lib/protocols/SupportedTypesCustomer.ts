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

import { ArrayResponseHandler } from "../common/ResponseHandlers";
import { BaseHandler } from "../common/BaseHandler";
import { Energistics } from "../common/Etp12";
import { ETPCore } from "../common/ETPCore";
import { errorFromProtocolException } from "../common/EtpTypes";

const SupportedTypes = Energistics.Etp.v12.Protocol.SupportedTypes;
const Core = Energistics.Etp.v12.Protocol.Core;
const PROTOCOL = Energistics.Etp.v12.Datatypes.Protocol;

type SupportedType = Energistics.Etp.v12.Datatypes.Object.SupportedType;

/**
 * Implementation of client for SupportedTypesCustomer protocol
 *
 * @export
 * @class SupportedTypesCustomer
 * @extends {BaseHandler}
 */
export class SupportedTypesCustomer extends BaseHandler {
  private readonly sessionManager: ETPCore;
  private readonly typeResults;

  constructor(sessionManager: ETPCore) {
    super(sessionManager);
    this.sessionManager = sessionManager;
    this._role = "customer";
    this._protocol = PROTOCOL.SupportedTypes;
    this.typeResults = new ArrayResponseHandler<SupportedType>(
      sessionManager.responseTimeoutPeriod
    );
  }

  /**
   * Redirect the message to the appropriate method.
   *
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} messageHeader
   * @param {*} messageBody
   * @memberof SupportedTypesCustomer
   */
  public handleMessage(
    messageHeader: Energistics.Etp.v12.Datatypes.MessageHeader,
    messageBody:
      | Energistics.Etp.v12.Protocol.SupportedTypes.GetSupportedTypesResponse
      | Energistics.Etp.v12.Protocol.Core.ProtocolException
  ): void {
    if (messageHeader.protocol === PROTOCOL.SupportedTypes) {
      switch (messageHeader.messageType) {
        case SupportedTypes.MsgGetSupportedTypesResponse: {
          this.logTrace(
            `Received SupportedTypes.GetSupportedTypesResponse message for ${messageHeader.correlationId}.`
          );
          const typeBody =
            messageBody as Energistics.Etp.v12.Protocol.SupportedTypes.GetSupportedTypesResponse;
          if (typeBody) {
            typeBody.supportedTypes = typeBody.supportedTypes.map(r => {
              r.dataObjectType = decodeURI(r.dataObjectType);
              return r;
            });
          }
          this.onGetSupportedTypes(messageHeader, typeBody);
          break;
        }
        case Core.MsgProtocolException: {
          this.logTrace(
            `Received SupportedTypes.ProtocolException message for ${messageHeader.correlationId}.`
          );

          const errorMessage =
            messageBody as Energistics.Etp.v12.Protocol.Core.ProtocolException;
          this.onSupportedTypesError(messageHeader, errorMessage);
          break;
        }
        default:
          super.handleMessage(messageHeader, messageBody);
      }
    } else {
      throw new Error(
        `Unsupported protocol {${messageHeader.protocol}} in DiscoveryCustomer`
      );
    }
  }

  /**
   * List the supported types
   *
   * @param {string} uri
   * @param {boolean} countObjects
   * @returns {Promise<SupportedType[]>}
   * @memberof SupportedTypesCustomer
   */
  public getSupportedTypes(
    uri: string,
    countObjects: boolean
  ): Promise<SupportedType[]> {
    const header = this.sessionManager.createFinalMessageHeader(
      PROTOCOL.SupportedTypes,
      SupportedTypes.MsgGetSupportedTypes,
      BigInt(0)
    );
    const getSupportedTypes: Energistics.Etp.v12.Protocol.SupportedTypes.GetSupportedTypes =
      {
        countObjects,
        returnEmptyTypes: false,
        scope: Energistics.Etp.v12.Datatypes.Object.ContextScopeKind.self,
        uri: encodeURI(uri)
      };
    this.logTrace(
      `Sending SupportedTypes.MsgGetSupportedTypes message ${header.messageId}.`
    );
    return this.typeResults.waitForRequest(
      this.sessionManager.send(header, getSupportedTypes)
    );
  }

  /**
   * Resolve a SupportedTypes query corresponding to the correlationId.
   *
   * @private
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @param {Energistics.Etp.v12.Protocol.SupportedTypes.GetSupportedTypesResponse} message
   * @returns {void}
   * @memberof SupportedTypesCustomer
   */
  private onGetSupportedTypes(
    header: Energistics.Etp.v12.Datatypes.MessageHeader,
    message: Energistics.Etp.v12.Protocol.SupportedTypes.GetSupportedTypesResponse
  ): void {
    this.typeResults.onResponse(header, message.supportedTypes);
  }

  /**
   * Cancel the discovery request and throw an error with the server message
   *
   * @private
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @param {Energistics.Etp.v12.Protocol.Core.ProtocolExceptionTest} message
   * @returns nothing
   * @memberof SupportedTypesCustomer
   */
  private onSupportedTypesError(
    header: Energistics.Etp.v12.Datatypes.MessageHeader,
    message: Energistics.Etp.v12.Protocol.Core.ProtocolException
  ) {
    if (!header.correlationId) {
      return;
    }
    const results = this.typeResults.get(header.correlationId);
    if (results) {
      if (BaseHandler.isFinalMessage(header)) {
        this.typeResults.delete(header.correlationId);
      }
      results.reject(errorFromProtocolException(message));
    } else {
      throw new Error(
        `Error returned on unknown supportedTypes message ${header.correlationId}`
      );
    }
  }
}
