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

export abstract class CloudContainer {
  protected static providers: { [key: string]: any } = {};

  public static register(provider: string) {
    return (target: any) => {
      if (CloudContainer.providers[provider]) {
        CloudContainer.providers[provider].push(target);
      } else {
        CloudContainer.providers[provider] = [target];
      }
      return target;
    };
  }

  public static resolve(
    provider: string,
    clsInstance: any,
    args: { [key: string]: any } = {}
  ): any {
    for (const obj of CloudContainer.providers[provider]) {
      if (obj.prototype instanceof clsInstance) {
        return new obj(args);
      }
    }

    throw Error("Logger has been improperly configured");
  }
}
