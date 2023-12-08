/*
 *License notice
 *
 * Energistics copyright 2015-
 * Energistics Transfer Protocol
 *
 * All rights of any portion thereof, shall remain with Energistics or its suppliers
 * and shall remain subject to the terms of the Product License Agreement available at
 * http://www.energistics.org/product-license-agreement.
 *
 * Apache
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the
 * License.
 *
 * All rights reserved.
 *
 */

import { SchemaCache as AvroSchemaCache } from "./EtpAvro";
import schemas from "./EtpSchemas";
import { ErrorCode } from "./EtpTypes";

export class SchemaCache extends AvroSchemaCache {
  constructor(types: any = schemas.types) {
    super(types);
    this.createProtocolMap();
  }
  public find(protocol: number, messageType: number): any {
    // High-numbered messages are multi-protocol
    if (messageType >= 1000) {
      protocol = 0;
    }
    const schemaName: string | undefined = this.schemaName(
      protocol,
      messageType
    );
    if (schemaName) {
      return this.findSchema(schemaName);
    }

    throw new Error(`Schema for [${protocol}:${messageType}] not found.`);
  }

  public createProtocolMap(): void {
    return undefined;
  }
}

/**
 * Provides a retry mechanism with exponential backoff
 *
 * @param fn Function to retry
 * @param {number} retriesLeft  Number of retries
 * @param {number} interval Time interval (ms) after first retry
 * @param {number} factor Factor to increase the interval between retries
 * @returns the result of the function
 * @throws error after last unsuccessful retry
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  retriesLeft = 6,
  interval = 400,
  factor = 2
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retriesLeft) {
      await new Promise(resolve => setTimeout(resolve, interval));
      return retry(fn, retriesLeft - 1, interval * factor, factor);
    }
    throw error;
  }
};

/**
 * Provides a retry mechanism with exponential backoff, when an etp request fails with a specific error codes
 *
 * @param fn Function to retry
 * @param {ErrorCode[]} errorCodes Error codes to retry on
 * @param {number} retriesLeft  Number of retries
 * @param {number} interval Time interval (ms) after first retry
 * @param {number} factor Factor to increase the interval between retries
 * @returns the result of the function
 * @throws error after last unsuccessful retry
 */
export const retryOnEtpErrors = async <T>(
  fn: () => Promise<T>,
  errorCodes: [ErrorCode],
  retriesLeft = 6,
  interval = 400,
  factor = 2
): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    if (retriesLeft && errorCodes.indexOf(error.code) != -1) {
      await new Promise(resolve => setTimeout(resolve, interval));
      return retryOnEtpErrors(
        fn,
        errorCodes,
        retriesLeft - 1,
        interval * factor,
        factor
      );
    }
    throw error;
  }
};
