// ============================================================================
// Copyright 2025 Microsoft. Inc. or its affiliates. All Rights Reserved
// ============================================================================

/**
 * @brief Caller information extracted from JWT token
 */
export interface CallerInfo {
  id: string;    // Caller ID (oid or appid)
  type: string;  // Caller type: "OBJECT_ID" or "APPLICATION_ID"
}

/**
 * @brief Audit log entry structure matching server-side format
 */
export interface AuditLogEntry {
  OperationName: string;
  ResultType: string;
  action: string;
  actionId: string;
  message: string;
  AuditCategories: string[];
  CallerIdentities: Array<{
    CallerIdentityType: string;
    CallerIdentityValue: string;
  }>;
  TargetResources: Array<{
    TargetResourceType: string;
    TargetResourceName: string;
  }>;
  requestId: string;
  ServiceName: string;
  env_time: string;
  env_ver: string;
  env_name: string;
  env_cv: string;
  AuditType: string;
  "data-partition-id": string;
}
