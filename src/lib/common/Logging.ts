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

import * as bunyan from "bunyan";
import { Config } from "../providers/Config"
import { LoggerFactory } from '../providers/LoggerFactory'

type LoggerName = "EtpClient";

export interface ILogger {
  debug(data: any): void;
  info(data: any): void;
  warning(data: any): void;
  error(data: any): void;
}

export abstract class AbstractLogger implements ILogger {
  public abstract debug(data: any): void;
  public abstract info(data: any): void;
  public abstract warning(data: any): void;
  public abstract error(data: any): void;
}

export default {
  /**
   * Get the Logger for the given category
   * A simple string can be provided as "options", and the logger will have the default attributes,
   * else the logger can be fully configured with the Bunyan options object
   *
   * @param {(string | bunyan.LoggerOptions)} options name of the logger or full logger configuration
   * @returns Logger
   */
  getLogger(options: LoggerName | bunyan.LoggerOptions): any {
    if (!!Config.CLOUDPROVIDER) {
      const CSPLogger = LoggerFactory.resolve(Config.CLOUDPROVIDER);
      return CSPLogger;
    }
    const opts: bunyan.LoggerOptions =
      typeof options === "string" ? { name: options } : options;
    return bunyan.createLogger(opts);
  }
};
