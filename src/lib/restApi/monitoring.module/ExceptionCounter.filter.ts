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

import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request } from 'express';

import MetricsProvider from './Metrics.provider';

@Catch()
export default class ExceptionCounterFilter extends BaseExceptionFilter {
  constructor(private metricsProvider: MetricsProvider) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const errorLabels: string[] = [];

    if (exception instanceof HttpException) {
      const ctx = host.switchToHttp();
      const req = ctx.getRequest<Request>();
      errorLabels.push('http_exception');
      errorLabels.push(req.route.path);
    } else {
      errorLabels.push('unknown_exception');
      errorLabels.push('');
    }

    this.metricsProvider.registerCounterMetric(
      'any_error_counter',
      'Number of errors',
      ['exception_type', 'additional_info']
    )
      .labels(...errorLabels)
      .inc();

    super.catch(exception, host);
  }
}
