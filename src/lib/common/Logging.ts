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
import { Config } from "../providers/Config";
import { LoggerFactory } from "../providers/LoggerFactory";

type LoggerName = "EtpClient" | "Jest";

export interface ILogger {
  debug(data: unknown): void;
  info(data: unknown): void;
  warning(data: unknown): void;
  error(data: unknown): void;
}

export abstract class AbstractLogger implements ILogger {
  public abstract debug(data: unknown): void;
  public abstract info(data: unknown): void;
  public abstract warning(data: unknown): void;
  public abstract error(data: unknown): void;
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
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!Config.CLOUD_PROVIDER) {
      const CSPLogger = LoggerFactory.resolve(Config.CLOUD_PROVIDER);
      return CSPLogger;
    }
    const opts: bunyan.LoggerOptions =
      typeof options === "string" ? { name: options } : options;
    const log = bunyan.createLogger(opts) as bunyan & {
      warning?: (data: unknown) => void;
    };
    // bunyan exposes `warn` natively, but the AbstractLogger interface used
    // throughout the codebase declares `warning`. Without this alias, calls to
    // `logger.warning(...)` from controllers throw "logger.warning is not a
    // function" and surface to clients as confusing error messages.
    if (typeof log.warning !== "function") {
      log.warning = log.warn.bind(log);
    }
    return log;
  }
};
