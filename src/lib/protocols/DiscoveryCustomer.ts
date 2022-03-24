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
import { ETPCore } from "../common/ETPCore";
import { Energistics, Integer64 } from "../common/Etp12";

const Discovery = Energistics.Etp.v12.Protocol.Discovery;
const Core = Energistics.Etp.v12.Protocol.Core;
const PROTOCOL = Energistics.Etp.v12.Datatypes.Protocol;

type Resource = Energistics.Etp.v12.Datatypes.Object.Resource;

/**
 * Implementation of client for Discovery protocol
 *
 * @export
 * @class DiscoveryCustomer
 * @extends {BaseHandler}
 */
export class DiscoveryCustomer extends BaseHandler {
  private readonly sessionManager: ETPCore;
  private readonly resourceResults;

  constructor(sessionManager: ETPCore) {
    super(sessionManager);
    this.sessionManager = sessionManager;
    this._role = "customer";
    this._protocol = PROTOCOL.Discovery;
    this.resourceResults = new ArrayResponseHandler<Resource>(
      sessionManager.responseTimeoutPeriod
    );
  }

  public handleMessage(
    messageHeader: Energistics.Etp.v12.Datatypes.MessageHeader,
    messageBody: any
  ) {
    if (messageHeader.protocol === PROTOCOL.Discovery) {
      switch (messageHeader.messageType) {
        case Discovery.MsgGetResourcesResponse: {
          this.logTrace(
            `Received Discovery.GetResourcesResponse message for ${messageHeader.correlationId}.`
          );
          const body =
            messageBody as Energistics.Etp.v12.Protocol.Discovery.GetResourcesResponse;
          if (body) {
            body.resources = body.resources.map(r => {
              r.uri = decodeURI(r.uri);
              return r;
            });
          }
          this.onGetResourcesResponse(messageHeader, body);
          break;
        }
        case Core.MsgProtocolException: {
          this.logTrace(
            `Received Discovery.ProtocolException message for ${messageHeader.correlationId}.`
          );
          const errorMessage =
            messageBody as Energistics.Etp.v12.Protocol.Core.ProtocolException;
          this.onDiscoveryError(messageHeader, errorMessage);
          break;
        }
        default: {
          super.handleMessage(messageHeader, messageBody);
        }
      }
    } else {
      throw new Error(
        `Unsupported protocol {${messageHeader.protocol}} in DiscoveryCustomer`
      );
    }
  }

  /**
   * Implement the search of associated resource, through graph.
   * make sure that we don't search in a loop by tracking already found items
   *
   * @param {Energistics.Etp.v12.Datatypes.Object.ContextInfo} context Context of the search, can be a URI or mon complex search structure
   * @param {Energistics.Etp.v12.Datatypes.Object.ContextScopeKind} scope Indicate how to walk the graph
   * @param {boolean} [countObjects=false] Indicates that the server is requested to provide the source and target count
   * @param {(Integer64 | null)} [lastChangedFilter=null] Indicates that the only the resources created after the given time is provided
   * @returns {Promise<Resource[]>}
   * @memberof DiscoveryCustomer
   */
  public getResources(
    context: Energistics.Etp.v12.Datatypes.Object.ContextInfo,
    scope: Energistics.Etp.v12.Datatypes.Object.ContextScopeKind,
    countObjects = false,
    storeLastWriteFilter: Integer64 | null = null,
    activeStatusFilter: Energistics.Etp.v12.Datatypes.Object.ActiveStatusKind | null = null
  ): Promise<Resource[]> {
    const header = this.sessionManager.createFinalMessageHeader(
      PROTOCOL.Discovery,
      Discovery.MsgGetResources,
      BigInt(0)
    );
    const resourceContext = { ...context, uri: encodeURI(context.uri) };
    const getResources: Energistics.Etp.v12.Protocol.Discovery.GetResources = {
      activeStatusFilter,
      context: resourceContext,
      countObjects,
      includeEdges: false,
      scope,
      storeLastWriteFilter
    };
    return this.resourceResults.waitForRequest(
      this.sessionManager.send(header, getResources)
    );
  }

  /**
   * Resolve a Resource query corresponding to the correlationId.
   *
   * @private
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @param {Energistics.Etp.v12.Protocol.Discovery.GetResourcesResponse} message
   * @returns {void}
   * @memberof DiscoveryCustomer
   */
  private onGetResourcesResponse(
    header: Energistics.Etp.v12.Datatypes.MessageHeader,
    message: Energistics.Etp.v12.Protocol.Discovery.GetResourcesResponse
  ): void {
    this.resourceResults.onResponse(header, message.resources);
  }

  /**
   * Cancel the discovery request and throw an error with the server message
   *
   * @private
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @param {Energistics.Etp.v12.Protocol.Core.ProtocolExceptionTest} message
   * @returns nothing
   * @memberof DiscoveryCustomer
   */
  private onDiscoveryError(
    header: Energistics.Etp.v12.Datatypes.MessageHeader,
    message: Energistics.Etp.v12.Protocol.Core.ProtocolException
  ) {
    this.resourceResults.onException(header, message);
  }
}
