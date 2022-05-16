// ============================================================================
// Copyright 2022, Microsoft
// Copyright 2022, EPAM Systems
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

import { AbstractLogger, ILogger } from '../../common/Logging';
import { AzureConfig } from './Config'
//import * as appinsights from 'applicationinsights';

// } from './Config';
import { LoggerFactory } from '../LoggerFactory'

@LoggerFactory.register('azure')
export class Logger extends AbstractLogger {
    public debug(data: string): void {
        console.log(data);
    }

    public info(data: string): void {
        console.info(data);
        /*if (!Config.UTEST && AzureConfig.ENABLE_LOGGING_INFO) {
            if (AzureConfig.AI_INSTRUMENTATION_KEY) {
                appinsights.defaultClient.trackTrace({ message: JSON.stringify(data) });
            }
            // tslint:disable-next-line
            console.log(data);
        }*/
    }

    public warning(data: string): void {
        /*if (!Config.UTEST && AzureConfig.ENABLE_LOGGING_ERROR) {
            if (AzureConfig.AI_INSTRUMENTATION_KEY) {
                appinsights.defaultClient.trackTrace({ message: JSON.stringify(data) });
            }
            // tslint:disable-next-line
            console.log(data);
        }*/
        console.log(data);
    }

    public error(data: string): void {
        /*if (!Config.UTEST && AzureConfig.ENABLE_LOGGING_ERROR) {
            if (AzureConfig.AI_INSTRUMENTATION_KEY) {
                appinsights.defaultClient.trackTrace({ message: JSON.stringify(data) });
            }
            // tslint:disable-next-line
            console.log(data);
        }*/
        console.log(data);
    }
}


//  LoggerFactory.build(Config.CLOUDPROVIDER).error(JSON.stringify(error));