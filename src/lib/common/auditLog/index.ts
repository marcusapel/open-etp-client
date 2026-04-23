// ============================================================================
// Copyright 2025 Microsoft. Inc. or its affiliates. All Rights Reserved
// ============================================================================

import { AuditLogEntry } from "./types";
import { extractCallerIdFromToken } from "./jwtParser";
import { getOperationName, getActionId, getActionType, getResultType } from "./operations";

/**
 * @brief Audit log utility for API operations
 */
export class AuditLog {
  private static readonly AUDIT_PREFIX = "ifxauditappl:";

  /**
   * @brief Log an audit entry for an API operation
   * 
   * This method extracts user information from the request headers (JWT token),
   * builds the complete audit entry with all required fields, formats it as JSON,
   * and writes it to stdout with the "ifxauditappl:" prefix.
   * 
   * @param method HTTP method (GET, POST, etc.)
   * @param path Request path/URL
   * @param statusCode HTTP status code
   * @param authHeader Authorization header value (may contain JWT)
   * @param requestId Request ID from headers
   * @param dataPartitionId Data partition ID from headers
   * @param message Human-readable message describing the operation result
   */
  static log(
    method: string,
    path: string,
    statusCode: number,
    authHeader: string | undefined,
    requestId: string,
    dataPartitionId: string,
    message: string
  ): void {
    // Determine the specific operation name based on method and path
    const operationName = getOperationName(method, path);

    // Build JSON audit log entry
    const auditEntry: AuditLogEntry = {
      OperationName: operationName,
      ResultType: getResultType(statusCode),
      action: getActionType(operationName),
      actionId: getActionId(operationName),
      message: message,
      AuditCategories: ["RESOURCE_MANAGEMENT"],
      CallerIdentities: [],
      TargetResources: [
        {
          TargetResourceType: "resource",
          TargetResourceName: `${operationName}-${path}`
        }
      ],
      requestId: requestId || "unknown",
      ServiceName: "ReservoirOpenETPClient.audit",
      env_time: this.getCurrentTimestamp(),
      env_ver: "2.1",
      env_name: "#Ifx.AuditSchema",
      env_cv: "##00000000-0000-0000-0000-000000000000_00000000-0000-0000-0000-000000000000_00000000-0000-0000-0000-000000000000",
      AuditType: "APPLICATION",
      "data-partition-id": dataPartitionId || "unknown"
    };

    // Extract caller identities from JWT token
    if (authHeader) {
      const callerInfo = extractCallerIdFromToken(authHeader);
      if (callerInfo.id) {
        auditEntry.CallerIdentities.push({
          CallerIdentityType: callerInfo.type,
          CallerIdentityValue: callerInfo.id
        });
      }
    }

    // Write to stdout with AUDIT_PREFIX
    console.log(`${this.AUDIT_PREFIX} ${JSON.stringify(auditEntry)}`);
  }

  /**
   * @brief Get current timestamp in ISO 8601 UTC format
   * 
   * @return Timestamp string (e.g., "2025-12-29T10:30:45.123+00:00")
   */
  private static getCurrentTimestamp(): string {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const day = String(now.getUTCDate()).padStart(2, "0");
    const hours = String(now.getUTCHours()).padStart(2, "0");
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(now.getUTCMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
  }
}

// Re-export for backward compatibility and convenience
export { AuditLogConstants } from "./constants";
export { CallerInfo, AuditLogEntry } from "./types";
export { extractCallerIdFromToken } from "./jwtParser";
export { getOperationName, getActionId, getActionType, getResultType } from "./operations";
