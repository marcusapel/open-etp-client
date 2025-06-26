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

import Logging from '../../common/Logging';

const logger = Logging.getLogger("EtpClient");

@Injectable()
export default class RequestLoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const method = req.method;
    const path = req.originalUrl;
    const userAgent = req.get('User-Agent') || 'Unknown';
    const ip = req.ip || req.connection.remoteAddress || 'Unknown';
    
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
    const logResponse = function(contentLength: number | string) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      const statusCode = res.statusCode;
      
      // Log the response information
      logger.info(`[RESPONSE] ${loggingPrefix} - Status: ${statusCode} - Duration: ${responseTime}ms - Size: ${contentLength} bytes`);
    };
    
    // Capture response information when the response finishes
    const originalSend = res.send;
    res.send = function(body) {
      const contentLength = res.get('Content-Length') || (body ? Buffer.byteLength(body, 'utf8') : 0);
      logResponse(contentLength)
      
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
