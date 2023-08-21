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
import { SuccessMapResponseHandler } from "../common/ResponseHandlers";

import { Energistics } from "../common/Etp12";
import { ErrorCode, ErrorInfo } from "../common/EtpTypes";

const StoreNotification = Energistics.Etp.v12.Protocol.StoreNotification;
const PROTOCOL = Energistics.Etp.v12.Datatypes.Protocol;
const Core = Energistics.Etp.v12.Protocol.Core;

/**
 * Implementation of client for StoreNotificationCustomer protocol
 *
 * @export
 * @class StoreNotificationCustomer
 * @extends {BaseHandler}
 */
export class StoreNotificationCustomer extends BaseHandler {
  private readonly successResolve;

  constructor(public sessionManager: ETPCore) {
    super(sessionManager);
    this._role = "customer";
    this._protocol = PROTOCOL.StoreNotification;

    this.successResolve = new SuccessMapResponseHandler(
      sessionManager.responseTimeoutPeriod
    );
  }

  /**
   * Handle protocol messages.
   *
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} messageHeader
   * @param {*} messageBody
   * @memberof StoreNotificationCustomer
   */
  public handleMessage(
    messageHeader: Energistics.Etp.v12.Datatypes.MessageHeader,
    messageBody:
      | Energistics.Etp.v12.Protocol.StoreNotification.ObjectChanged
      | Energistics.Etp.v12.Protocol.StoreNotification.ObjectDeleted
      | Energistics.Etp.v12.Protocol.StoreNotification.SubscribeNotificationsResponse
      | Energistics.Etp.v12.Protocol.StoreNotification.SubscriptionEnded
      | Energistics.Etp.v12.Protocol.StoreNotification.UnsolicitedStoreNotifications
      | Energistics.Etp.v12.Protocol.StoreNotification.Chunk
      | Energistics.Etp.v12.Protocol.StoreNotification.ObjectActiveStatusChanged
      | Energistics.Etp.v12.Protocol.Core.ProtocolException
  ): void {
    if (messageHeader.protocol !== PROTOCOL.StoreNotification) {
      throw new Error(
        `Unsupported protocol {${messageHeader.protocol}} in StoreNotification`
      );
    }
    switch (messageHeader.messageType) {
      case StoreNotification.MsgObjectChanged: {
        const bodyChanged =
          messageBody as Energistics.Etp.v12.Protocol.StoreNotification.ObjectChanged;
        this.logReceived("StoreNotification.ObjectChanged", bodyChanged);
        this.emit("objectChanged", {
          header: messageHeader,
          body: bodyChanged
        });
        break;
      }
      case StoreNotification.MsgObjectDeleted: {
        const bodyDeleted =
          messageBody as Energistics.Etp.v12.Protocol.StoreNotification.ObjectDeleted;
        this.logReceived("StoreNotification.ObjectDeleted", bodyDeleted);
        this.emit("objectDeleted", { header: messageHeader, bodyDeleted });
        break;
      }
      case StoreNotification.MsgSubscribeNotificationsResponse: {
        const subscribed =
          messageBody as Energistics.Etp.v12.Protocol.StoreNotification.SubscribeNotificationsResponse;
        this.logReceived(
          "StoreNotification.SubscribeNotificationsResponse",
          subscribed.success
        );
        this.onSubscribeNotificationsResponse(
          messageHeader,
          subscribed,
          this.successResolve
        );
        break;
      }
      case StoreNotification.MsgSubscriptionEnded: {
        const ended =
          messageBody as Energistics.Etp.v12.Protocol.StoreNotification.SubscriptionEnded;
        this.logReceived("StoreNotification.SubscriptionEnded", ended);
        this.emit("subscriptionEnded", { header: messageHeader, ended });
        break;
      }
      case StoreNotification.MsgUnsolicitedStoreNotifications: {
        const unSollicited =
          messageBody as Energistics.Etp.v12.Protocol.StoreNotification.UnsolicitedStoreNotifications;
        this.logReceived(
          "StoreNotification.UnsolicitedStoreNotifications",
          unSollicited
        );
        this.emit("unsollicited", { header: messageHeader, unSollicited });
        break;
      }
      case StoreNotification.MsgChunk: {
        const chunk =
          messageBody as Energistics.Etp.v12.Protocol.StoreNotification.Chunk;
        this.logReceived("StoreNotification.Chunk", chunk);
        this.emit("chunk", { header: messageHeader, chunk });
        break;
      }
      case StoreNotification.MsgObjectAccessRevoked: {
        const objectAccessRevoked =
          messageBody as Energistics.Etp.v12.Protocol.StoreNotification.ObjectAccessRevoked;
        this.logReceived(
          "StoreNotification.ObjectAccessRevoked",
          objectAccessRevoked
        );
        this.emit("accessRevoked", {
          header: messageHeader,
          objectAccessRevoked
        });
        break;
      }
      case StoreNotification.MsgObjectActiveStatusChanged: {
        const objectActiveStatusChanged =
          messageBody as Energistics.Etp.v12.Protocol.StoreNotification.ObjectActiveStatusChanged;
        this.logReceived(
          "StoreNotification notification status changed",
          objectActiveStatusChanged
        );
        this.emit("activeStatusChanged", {
          header: messageHeader,
          objectActiveStatusChanged
        });
        break;
      }
      case Core.MsgProtocolException: {
        this.logTrace(
          `Received Store.ProtocolException message for ${messageHeader.correlationId}.`
        );
        const errorMessage =
          messageBody as Energistics.Etp.v12.Protocol.Core.ProtocolException;
        if (this.successResolve.onException(messageHeader, errorMessage)) {
          return;
        }
        break;
      }
      default:
        super.handleMessage(messageHeader, messageBody);
    }
  }

  /**
   * Subscribe to new notifications channel
   *
   * @param {Energistics.Etp.v12.Protocol.StoreNotification.SubscribeNotifications} message
   * @memberof StoreNotificationCustomer
   */
  public subscribeNotifications(
    message: Energistics.Etp.v12.Protocol.StoreNotification.SubscribeNotifications
  ): Promise<Energistics.Etp.v12.Datatypes.ErrorInfo[]> {
    const header: Energistics.Etp.v12.Datatypes.MessageHeader =
      this.sessionManager.createFinalMessageHeader(
        PROTOCOL.StoreNotification,
        StoreNotification.MsgSubscribeNotifications,
        BigInt(0)
      );
    return this.successResolve.waitForRequest(
      this.sessionManager.send(header, message),
      Array.from(message.request.keys())
    );
  }

  /**
   * Unsubscribe to existing notification
   *
   * @param {Energistics.Etp.v12.Protocol.StoreNotification.UnsubscribeNotifications} message
   * @memberof StoreNotificationCustomer
   */
  public unSubscribeNotifications(
    message: Energistics.Etp.v12.Protocol.StoreNotification.UnsubscribeNotifications
  ): void {
    const header: Energistics.Etp.v12.Datatypes.MessageHeader =
      this.sessionManager.createFinalMessageHeader(
        PROTOCOL.StoreNotification,
        StoreNotification.MsgUnsubscribeNotifications,
        BigInt(0)
      );
    // No response required
    this.sessionManager.send(header, message);
  }

  /**
   * Resolve a SubscribeNotifications response message query corresponding to the correlationId
   *
   * @private
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @param message
   * @returns nothing
   * @memberof StoreNotificationCustomer
   */
  protected onSubscribeNotificationsResponse(
    header: Energistics.Etp.v12.Datatypes.MessageHeader,
    message: Energistics.Etp.v12.Protocol.StoreNotification.SubscribeNotificationsResponse,
    map: SuccessMapResponseHandler
  ): void {
    const m = new Map<string, ErrorInfo>();
    message.success.forEach((value, key) => {
      if (value.length > 0) {
        m.set(key, {
          code: ErrorCode.IS_OK,
          message: ""
        });
      }
    });
    map.onException(header, { error: null, errors: m });
  }

  private logReceived(message: string, messageBody: unknown) {
    this.logTrace(`Received ${message}: ${JSON.stringify(messageBody)}`);
  }
}
