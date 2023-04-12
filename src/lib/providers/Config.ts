// ============================================================================
// Copyright 2022, EPAM Systems
// Copyright 2022, Microsoft
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

import { CloudContainer } from "./Container";

export interface IConfig {
  init(): Promise<void>;
}

export abstract class Config implements IConfig {
  public static CLOUD_PROVIDER: string;

  public abstract init(): Promise<void>;

  public static setCloudProvider(cloudProvider: string) {
    Config.CLOUD_PROVIDER = cloudProvider;
    if (!Config.CLOUD_PROVIDER) {
      throw new Error(
        'The "CLOUD_PROVIDER" environment variable has not been set'
      );
    }
  }
}

export class ConfigFactory extends CloudContainer {
  public static build(
    itemKey: string,
    args: { [key: string]: any } = {}
  ): IConfig {
    return CloudContainer.resolve(itemKey, Config, args) as IConfig;
  }
}
