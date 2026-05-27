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

import { ArrayByteUuid } from "../common/EtpUri";
import { BaseHandler } from "../common/BaseHandler";
import { ETPCore } from "../common/ETPCore";
import { SingleResponseHandler } from "../common/ResponseHandlers";

import { Energistics } from "../common/Etp12";

import TransactionProtocol = Energistics.Etp.v12.Protocol.Transaction;
import CoreProtocol = Energistics.Etp.v12.Protocol.Core;
import Datatypes = Energistics.Etp.v12.Datatypes;
import { ErrorCode } from "../common/EtpTypes";

/**
 * Implementation of client for TransactionCustomer protocol
 *
 * @export
 * @class TransactionCustomer
 * @extends {BaseHandler}
 */
export class TransactionCustomer extends BaseHandler {
  private readonly sessionManager: ETPCore;
  private readonly transactionResults;
  private readonly successResolve;

  constructor(sessionManager: ETPCore) {
    super(sessionManager);
    this.sessionManager = sessionManager;
    this._role = "customer";
    this._protocol = Datatypes.Protocol.Transaction;
    this.transactionResults = new SingleResponseHandler<ArrayByteUuid>(
      sessionManager.responseTimeoutPeriod
    );
    this.successResolve = new SingleResponseHandler<boolean>(
      sessionManager.responseTimeoutPeriod
    );
  }

  public handleMessage(
    messageHeader: Datatypes.MessageHeader,
    messageBody:
      | TransactionProtocol.StartTransactionResponse
      | TransactionProtocol.CommitTransactionResponse
      | TransactionProtocol.RollbackTransactionResponse
      | CoreProtocol.ProtocolException
  ): void {
    if (messageHeader.protocol === Datatypes.Protocol.Transaction) {
      switch (messageHeader.messageType) {
        case TransactionProtocol.MsgStartTransactionResponse:
          this.logTrace(
            `Received Transaction.StartTransactionResponse message for ${messageHeader.correlationId}.`
          );
          this.onStartTransactionResponse(
            messageHeader,
            messageBody as TransactionProtocol.StartTransactionResponse
          );
          break;
        case TransactionProtocol.MsgCommitTransactionResponse:
          this.logTrace(
            `Received Transaction.CommitTransactionResponse message for ${messageHeader.correlationId}.`
          );
          this.onEndTransactionResponse(
            messageHeader,
            messageBody as TransactionProtocol.CommitTransactionResponse
          );
          break;
        case TransactionProtocol.MsgRollbackTransactionResponse:
          this.logTrace(
            `Received Transaction.RollbackTransactionResponse message for ${messageHeader.correlationId}.`
          );
          this.onEndTransactionResponse(
            messageHeader,
            messageBody as TransactionProtocol.RollbackTransactionResponse
          );
          break;
        case CoreProtocol.MsgProtocolException:
          this.logTrace(
            `Received Transaction.ProtocolException message for ${messageHeader.correlationId}.`
          );
          this.onTransactionError(
            messageHeader,
            messageBody as CoreProtocol.ProtocolException
          );
          break;
        default:
          super.handleMessage(messageHeader, messageBody);
      }
    } else {
      throw new Error(
        `Unsupported protocol {${messageHeader.protocol}} in TransactionCustomer`
      );
    }
  }

  /** Start a new transaction
   *
   *
   * @param {boolean} readOnly indicates if transaction is read only
   * @param {string[]} dataspaceUris uris of the dataspaces involved in transaction (empty list means all, "" indicate default dataspace)
   * @param {string} message commit message
   * @returns {Promise<ArrayByteUuid>} transaction identifier
   * @memberof TransactionCustomer
   */
  public startTransaction(
    readOnly: boolean,
    dataspaceUris: string[],
    message: string
  ): Promise<ArrayByteUuid> {
    const header = this.sessionManager.createFinalMessageHeader(
      Datatypes.Protocol.Transaction,
      TransactionProtocol.MsgStartTransaction,
      BigInt(0)
    );
    const startTransaction: TransactionProtocol.StartTransaction = {
      dataspaceUris,
      message,
      readOnly
    };
    this.logTrace(
      `Sending Transaction.StartTransaction message ${header.messageId}.`
    );
    return this.transactionResults.waitForRequest(
      this.sessionManager.send(header, startTransaction)
    );
  }

  /**
   * Send signal to commit transaction
   *
   * @param {ArrayByteUuid} transactionUuid
   * @returns {Promise<boolean>} success of commit
   * @memberof TransactionCustomer
   */
  public commitTransaction(transactionUuid: ArrayByteUuid): Promise<boolean> {
    const header = this.sessionManager.createFinalMessageHeader(
      Datatypes.Protocol.Transaction,
      TransactionProtocol.MsgCommitTransaction,
      BigInt(0)
    );

    const commitTransaction: TransactionProtocol.CommitTransaction = {
      transactionUuid
    };
    this.logTrace(
      `Sending Transaction.CommitTransaction message ${header.messageId}.`
    );
    return this.successResolve.waitForRequest(
      this.sessionManager.send(header, commitTransaction)
    );
  }

  /**
   * Send signal to rollback transaction
   *
   * @param {ArrayByteUuid} transactionUuid
   * @returns {Promise<boolean>} success of commit
   * @memberof TransactionCustomer
   */
  public rollbackTransaction(transactionUuid: ArrayByteUuid): Promise<boolean> {
    const header = this.sessionManager.createFinalMessageHeader(
      Datatypes.Protocol.Transaction,
      TransactionProtocol.MsgRollbackTransaction,
      BigInt(0)
    );

    const rollbackTransaction: TransactionProtocol.RollbackTransaction = {
      transactionUuid
    };
    this.logTrace(
      `Sending Transaction.RollbackTransaction message ${header.messageId}.`
    );
    return this.successResolve.waitForRequest(
      this.sessionManager.send(header, rollbackTransaction)
    );
  }

  /**
   * Resolve a StartTransaction query corresponding to the correlationId.
   *
   * @private
   * @param {Datatypes.MessageHeader} header
   * @param {TransactionProtocol.StartTransactionResponse} message
   * @returns {void}
   * @memberof TransactionCustomer
   */
  private onStartTransactionResponse(
    header: Datatypes.MessageHeader,
    message: TransactionProtocol.StartTransactionResponse
  ): void {
    if (message.successful) {
      this.transactionResults.onResponse(header, message.transactionUuid);
    } else {
      this.transactionResults.onError(header, {
        code: ErrorCode.EINVALID_STATE,
        message: message.failureReason
      });
    }
  }

  /**
   * Resolve a StartTransaction query corresponding to the correlationId.
   *
   * @private
   * @param {Datatypes.MessageHeader} header
   * @param {TransactionProtocol.CommitTransactionResponse} message
   * @returns {void}
   * @memberof TransactionCustomer
   */
  private onEndTransactionResponse(
    header: Datatypes.MessageHeader,
    message:
      | TransactionProtocol.CommitTransactionResponse
      | TransactionProtocol.RollbackTransactionResponse
  ): void {
    if (message.successful) {
      this.successResolve.onResponse(header, true);
    } else {
      this.successResolve.onError(header, {
        code: ErrorCode.EINVALID_STATE,
        message: message.failureReason
      });
    }
  }

  /**
   * Cancel the Transaction request and throw an error with the server message
   *
   * @private
   * @param {Datatypes.MessageHeader} header
   * @param {CoreProtocol.ProtocolException} message
   * @returns nothing
   * @memberof TransactionCustomer
   */
  private onTransactionError(
    header: Datatypes.MessageHeader,
    message: CoreProtocol.ProtocolException
  ) {
    if (this.successResolve.onError(header, message.error)) {
      return;
    }
    if (this.transactionResults.onError(header, message.error)) {
      return;
    }
    // getTransaction is not multipart, so no need to attempt processing errors
    throw new Error(
      `Error returned on unknown Transaction message ${header.correlationId}`
    );
  }
}
