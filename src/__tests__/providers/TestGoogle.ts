// ============================================================================
// Copyright 2023 Google LLC
// Copyright 2023 EPAM Systems
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ============================================================================

import "jest";
import { Level } from "log4js";

import * as providers from "../../lib/providers";

import { GoogleConfig } from "../../lib/providers/google/Config";

import Logging from "../../lib/common/Logging";
import { LoggerFactory } from "../../lib/providers/LoggerFactory";
import {
  Logger as GoogleLogger,
  getGoogleLogger
} from "../../lib/providers/google/Logger";

const CLOUD_PROVIDER = "google";
const DEFAULT_LOGGER_NAME = "EtpClient";

describe("Google", () => {
  beforeAll(() => {
    jest.resetModules();
    process.env = { CLOUD_PROVIDER };
    providers.Config.setCloudProvider(process.env.CLOUD_PROVIDER || "");
  });

  describe("Logger", () => {
    beforeEach(() => {
      LoggerFactory.register(CLOUD_PROVIDER)(GoogleLogger);
    });

    it("Get default logger", () => {
      const logObj = getGoogleLogger();
      expect(logObj.category).toEqual("default");
      expect((logObj.level as Level).levelStr).toEqual("debug".toUpperCase());
    });

    it("Get gc logger", () => {
      const logObj = Logging.getLogger(DEFAULT_LOGGER_NAME);
      expect(logObj).toBeInstanceOf(GoogleLogger);
    });
  });

  describe("Config", () => {
    beforeEach(() => {
      providers.ConfigFactory.register(CLOUD_PROVIDER)(GoogleConfig);
      process.env = {
        ...process.env,
        GOOGLE_LOG_LEVEL: "info",
        GOOGLE_LOG_FORMAT: "%p: %m%n"
      };
    });

    it("Get default gc config", () => {
      const config = providers.ConfigFactory.build(CLOUD_PROVIDER);
      expect(config).toBeInstanceOf(GoogleConfig);
      expect(GoogleConfig.GOOGLE_LOG_LEVEL).toEqual("debug");
    });

    it("Get custom gc config", () => {
      const config = providers.ConfigFactory.build(CLOUD_PROVIDER);
      config.init();
      expect(config).toBeInstanceOf(GoogleConfig);
      expect(GoogleConfig.GOOGLE_LOG_LEVEL).toEqual("info");
      expect(GoogleConfig.GOOGLE_LOG_FORMAT).toEqual("%p: %m%n");
    });
  });
});
