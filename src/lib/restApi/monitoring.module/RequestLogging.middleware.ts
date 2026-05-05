// ============================================================================
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License").
// You may not use this file except in compliance with the License.
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

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decode, JwtPayload } from 'jsonwebtoken';

import { AuditLog } from '../../common/auditLog';
import Logging from '../../common/Logging';

const logger = Logging.getLogger("EtpClient");

@Injectable()
export default class RequestLoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const method = req.method;
    const path = req.originalUrl;

    // Skip logging for health/metrics probe endpoints to avoid log noise
    if (path.includes('health') || path.includes('metrics')) {
      return next();
    }

    const userAgent = req.get('User-Agent') || 'Unknown';
    const ip = req.ip || req.connection.remoteAddress || 'Unknown';

    // Headers used for the structured audit log entry
    const authHeader = req.get('Authorization');
    const requestId =
      req.get('x-request-id') ||
      req.get('request-id') ||
      req.get('x-user-id') ||
      'unknown';
    const dataPartitionId =
      req.get('data-partition-id') ||
      req.get('x-data-partition-id') ||
      'unknown';

    let userId = 'Anonymous';
    let uniqueUserId = 'Anonymous';
    
    // First priority: Check x-user-id header from ingress gateway
    const userIdHeader = req.get('x-user-id');
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        
        // Decode JWT without verification (since we just need to extract user info)
        // Note: This is safe for logging purposes, but should not be used for authentication
        const decoded = decode(token) as JwtPayload;
        
        if (decoded) {
          // Try different common JWT fields for user identification
          uniqueUserId = decoded.sub || 
                         decoded['user_id'] || 
                         decoded['userId'] || 
                         decoded['email'] || 
                         decoded['preferred_username'] || 
                         'Unknown';
        }
      }
    } catch (error) {
      // If JWT decoding fails, continue with 'Anonymous'
      logger.debug('Failed to decode JWT token for logging', error);
    }

    if (userIdHeader) {
      userId = userIdHeader
    } else {
      userId = uniqueUserId
    }

    const loggingPrefix = `[${method}] ${path} - User: ${userId} (Unique User ID: ${uniqueUserId})`;
    
    // Log the initial request information
    logger.info(`[REQUEST] ${loggingPrefix} - IP: ${ip} - UserAgent: ${userAgent}`);

    // Emit a structured audit log entry to stdout. Gated by RDMS_AUDIT_LOG_ENABLED
    // so the existing access-log behaviour is preserved unless the operator opts in.
    const logAudit = (statusCode: number, message: string) => {
      if (process.env.RDMS_AUDIT_LOG_ENABLED !== 'true') {
        return;
      }
      try {
        AuditLog.log(
          method,
          path,
          statusCode,
          authHeader,
          requestId,
          dataPartitionId,
          message
        );
      } catch (error) {
        logger.error(`Error writing audit log: ${error}`);
      }
    };

    const logResponse = function(contentLength: number | string) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      const statusCode = res.statusCode;
      
      // Log the response information
      logger.info(`[RESPONSE] ${loggingPrefix} - Status: ${statusCode} - Duration: ${responseTime}ms - Size: ${contentLength} bytes`);

      // Audit log entry
      logAudit(statusCode, `${method} ${path} - Status: ${statusCode}`);
    };
    
    // Capture response information when the response finishes
    const originalSend = res.send;
    res.send = function(body) {
      // Only calculate content length if not already set and body is serialized (string or Buffer)
      let contentLength: string | number = res.get('Content-Length') || 'unknown';
      if (contentLength === 'unknown' && body) {
        if (typeof body === 'string') {
          contentLength = Buffer.byteLength(body, 'utf8');
        } else if (Buffer.isBuffer(body)) {
          contentLength = body.length;
        }
      }
      
      logResponse(contentLength);
      
      // Call the original send method
      return originalSend.call(this, body);
    };
    
    // Also handle cases where the response ends without calling send (e.g., streaming responses)
    res.on('finish', () => {
      // Only log if we haven't already logged via the send override
      if (res.send === originalSend) {
        const contentLength = res.get('Content-Length') || '0';
        
        logResponse(contentLength);
      }
    });
    
    next();
  }
}
