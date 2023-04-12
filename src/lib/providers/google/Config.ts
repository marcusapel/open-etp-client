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

import { Config, ConfigFactory } from "../Config";

@ConfigFactory.register("google")
export class GoogleConfig extends Config {
  public static GOOGLE_LOG_LEVEL: string = "debug";
  public static GOOGLE_LOG_FORMAT: string = "[%d{yyy-MM-dd hh:mm:ss}] %p: %m%n";

  public async init(): Promise<void> {
    GoogleConfig.GOOGLE_LOG_LEVEL =
      process.env.GOOGLE_LOG_LEVEL || GoogleConfig.GOOGLE_LOG_LEVEL;
    GoogleConfig.GOOGLE_LOG_FORMAT =
      process.env.GOOGLE_LOG_FORMAT || GoogleConfig.GOOGLE_LOG_FORMAT;
  }
}
