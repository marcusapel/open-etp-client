// ============================================================================
// Copyright 2025 Microsoft. Inc. or its affiliates. All Rights Reserved
// ============================================================================

/**
 * @brief Constants for audit logging
 * 
 * Centralized constants for operation names, result types, and action types
 * used across all API audit logging calls.
 */
export const AuditLogConstants = {
  // Object Operations
  OP_GET_OBJECT: "GetDataObject",
  OP_GET_MULTI_OBJECTS: "GetMultiDataObjects",
  OP_PUT_OBJECTS: "PutDataObjects",
  OP_DELETE_OBJECT: "DeleteDataObject",

  // Array Operations
  OP_GET_ARRAYS_METADATA: "GetArraysMetadata",
  OP_GET_ARRAY_METADATA: "GetArrayMetadata",
  OP_GET_ARRAY: "GetDataArray",
  OP_PUT_ARRAYS: "PutDataArrays",

  // Dataspace Operations
  OP_LIST_DATASPACES: "GetDataspaces",
  OP_GET_DATASPACE_INFO: "GetDataspaceInfo",
  OP_CREATE_DATASPACES: "PutDataspaces",
  OP_DUPLICATE_DATASPACE: "DuplicateDataspace",
  OP_DELETE_DATASPACE: "DeleteDataspace",
  OP_LOCK_DATASPACE: "LockDataspace",
  OP_UNLOCK_DATASPACE: "UnlockDataspace",

  // Resource Operations
  OP_LIST_RESOURCES: "GetResources",
  OP_LIST_ALL_RESOURCES: "GetAllResources",
  OP_GET_RESOURCES_BY_TYPE: "GetResourcesByType",
  OP_GET_RESOURCE_TARGETS: "GetResourceTargets",
  OP_GET_RESOURCE_SOURCES: "GetResourceSources",
  OP_GRAPH_ALL_RESOURCES: "GraphAllResources",
  OP_GRAPH_RESOURCE_TARGETS: "GraphResourceTargets",
  OP_GRAPH_RESOURCE_SOURCES: "GraphResourceSources",

  // Transaction Operations
  OP_CREATE_TRANSACTION: "StartTransaction",
  OP_COMMIT_TRANSACTION: "CommitTransaction",
  OP_ROLLBACK_TRANSACTION: "RollbackTransaction",

  // Manifest Operations
  OP_CREATE_MANIFEST: "CreateManifest",

  // Authentication Operations
  OP_GET_TOKEN: "GetAuthToken",

  // Result types
  RESULT_SUCCESS: "SUCCESS",
  RESULT_FAILURE: "FAILURE",

  // Action types
  ACTION_READ: "READ",
  ACTION_CREATE: "CREATE",
  ACTION_DELETE: "DELETE",
  ACTION_UPDATE: "UPDATE",
  ACTION_EXECUTE: "EXECUTE"
} as const;
