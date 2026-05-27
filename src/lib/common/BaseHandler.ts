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

import { EventEmitter } from "events";

import { ETPCore } from "./ETPCore";
import { Energistics } from "./Etp12";
import { MessageFlags } from "./EtpTypes";

/**
 * 'abstract' Base class for all protocol handlers other than protocol 0
 *
 * @export
 * @class BaseHandler
 * @extends {EventEmitter}
 */
export class BaseHandler extends EventEmitter {
  protected _role = "";
  protected _protocol = -1;
  protected core: ETPCore;
  protected _capabilities = new Map<
    string,
    Energistics.Etp.v12.Datatypes.DataValue
  >();

  protected _version: Energistics.Etp.v12.Datatypes.Version = {
    major: 1,
    minor: 2,
    patch: 0,
    revision: 0
  };

  constructor(private readonly container: ETPCore) {
    super();
    this.core = container;
  }
  get role(): string {
    return this._role;
  }
  get protocol(): number {
    return this._protocol;
  }
  get version(): Energistics.Etp.v12.Datatypes.Version {
    return this._version;
  }
  get capabilities(): Map<string, Energistics.Etp.v12.Datatypes.DataValue> {
    return this._capabilities;
  }

  public start(): undefined {
    return undefined;
  }
  public stop(): undefined {
    return undefined;
  }
  public handleMessage(
    messageHeader: Energistics.Etp.v12.Datatypes.MessageHeader,
    messageBody: unknown
  ): void {
    switch (messageHeader.messageType) {
      case 0:
        this.logTrace(`Received message ${this.protocol}.0.`);
        this.start();
        break;
      case Energistics.Etp.v12.Protocol.Core.ProtocolException._messageTypeId:
        this.logTrace(`Received message ${this.protocol}.Exception.`);
        this.log(String(messageBody));
        break;
      case Energistics.Etp.v12.Protocol.Core.Acknowledge._messageTypeId:
        this.logTrace(`Received message ${this.protocol}.Acknowledge.`);
        break;
      default:
        throw new Error(
          `Unsupported message ${this.protocol}.{${messageHeader.messageType}}`
        );
    }
  }

  /**
   * Log message
   *
   * @param {string} str
   * @memberof BaseHandler
   */
  public log(str: string): void {
    this.core.log(str);
  }

  /**
   * Log message if traceCalls is on
   *
   * @param {string} str
   * @memberof BaseHandler
   */
  public logTrace(str: string): void {
    if (this.core.traceCalls) {
      this.log(str);
    }
  }

  /**
   * Check if the current message is the last one
   *
   * @public
   * @param {Energistics.Etp.v12.Datatypes.MessageHeader} header
   * @returns {boolean}
   * @memberof BaseHandler
   */
  public static isFinalMessage(
    header: Energistics.Etp.v12.Datatypes.MessageHeader
  ): boolean {
    return (
      (header.messageFlags & MessageFlags.FINALPART) === MessageFlags.FINALPART
    );
  }
}
