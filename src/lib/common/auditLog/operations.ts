// ============================================================================
// Copyright 2025 Microsoft. Inc. or its affiliates. All Rights Reserved
// ============================================================================

import { AuditLogConstants } from "./constants";

/**
 * @brief Determine operation name from HTTP method and path
 * 
 * @param method HTTP method
 * @param path Request path
 * @return Operation name string
 */
export function getOperationName(method: string, path: string): string {
  const upperMethod = method.toUpperCase();
  
  // Remove query parameters and normalize path
  const cleanPath = path.split("?")[0].toLowerCase();
  
  // Auth endpoints
  if (cleanPath.includes("/auth/token")) return AuditLogConstants.OP_GET_TOKEN;
  
  // Manifest endpoints
  if (cleanPath.includes("/manifest/build")) return AuditLogConstants.OP_CREATE_MANIFEST;
  
  // Transaction endpoints
  if (cleanPath.includes("/transactions")) {
    if (upperMethod === "POST") return AuditLogConstants.OP_CREATE_TRANSACTION;
    if (upperMethod === "PUT") return AuditLogConstants.OP_COMMIT_TRANSACTION;
    if (upperMethod === "DELETE") return AuditLogConstants.OP_ROLLBACK_TRANSACTION;
  }
  
  // Dataspace operations
  if (cleanPath.includes("/dataspaces")) {
    // Dataspace lock/unlock
    if (cleanPath.includes("/lock")) {
      if (upperMethod === "POST") return AuditLogConstants.OP_LOCK_DATASPACE;
      if (upperMethod === "DELETE") return AuditLogConstants.OP_UNLOCK_DATASPACE;
    }
    
    // Dataspace info
    if (cleanPath.includes("/info")) return AuditLogConstants.OP_GET_DATASPACE_INFO;
    
    // Dataspace CRUD
    if (upperMethod === "GET" && !cleanPath.match(/\/dataspaces\/[^/]+\//)) {
      return AuditLogConstants.OP_LIST_DATASPACES;
    }
    if (upperMethod === "POST" && cleanPath.includes("/duplicate")) {
      return AuditLogConstants.OP_DUPLICATE_DATASPACE;
    }
    if (upperMethod === "POST") return AuditLogConstants.OP_CREATE_DATASPACES;
    if (upperMethod === "DELETE") return AuditLogConstants.OP_DELETE_DATASPACE;
    
    // Resource operations within dataspaces
    if (cleanPath.includes("/resources")) {
      if (cleanPath.includes("/all")) {
        if (upperMethod === "GET") return AuditLogConstants.OP_LIST_ALL_RESOURCES;
      } else if (cleanPath.includes("/targets")) {
        return AuditLogConstants.OP_GET_RESOURCE_TARGETS;
      } else if (cleanPath.includes("/sources")) {
        return AuditLogConstants.OP_GET_RESOURCE_SOURCES;
      } else if (cleanPath.match(/\/resources\/[^/]+$/)) {
        return AuditLogConstants.OP_GET_RESOURCES_BY_TYPE;
      } else {
        return AuditLogConstants.OP_LIST_RESOURCES;
      }
    }
    
    // Graph operations
    if (cleanPath.includes("/graph")) {
      if (cleanPath.includes("/all")) return AuditLogConstants.OP_GRAPH_ALL_RESOURCES;
      if (cleanPath.includes("/targets")) return AuditLogConstants.OP_GRAPH_RESOURCE_TARGETS;
      if (cleanPath.includes("/sources")) return AuditLogConstants.OP_GRAPH_RESOURCE_SOURCES;
    }
    
    // Multi-resources operation
    if (cleanPath.includes("/multi-resources")) {
      return AuditLogConstants.OP_GET_MULTI_OBJECTS;
    }
    
    // Object operations (within dataspaces)
    if (cleanPath.includes("/objects")) {
      if (upperMethod === "GET") return AuditLogConstants.OP_GET_OBJECT;
      if (upperMethod === "PUT") return AuditLogConstants.OP_PUT_OBJECTS;
      if (upperMethod === "DELETE") return AuditLogConstants.OP_DELETE_OBJECT;
    }
    
    // Array operations
    if (cleanPath.includes("/arrays")) {
      if (upperMethod === "GET") {
        if (cleanPath.match(/\/arrays\/[^/]+\/[^/]+$/)) {
          return AuditLogConstants.OP_GET_ARRAY;
        } else if (cleanPath.match(/\/arrays\/[^/]+$/)) {
          return AuditLogConstants.OP_GET_ARRAY_METADATA;
        } else {
          return AuditLogConstants.OP_GET_ARRAYS_METADATA;
        }
      }
      if (upperMethod === "PUT") return AuditLogConstants.OP_PUT_ARRAYS;
    }
  }
  
  // Default fallback based on HTTP method
  switch (upperMethod) {
    case "GET": return "GetResource";
    case "POST": return "CreateResource";
    case "PUT": return "UpdateResource";
    case "DELETE": return "DeleteResource";
    default: return "UnknownOperation";
  }
}

/**
 * @brief Get action ID for operation
 * 
 * Maps operation names to unique action IDs
 * 
 * @param operationName The operation name
 * @return Action ID string (e.g., "REST001")
 */
export function getActionId(operationName: string): string {
  // Object Operations (REST001-REST010)
  if (operationName === AuditLogConstants.OP_GET_OBJECT) return "REST001";
  if (operationName === AuditLogConstants.OP_GET_MULTI_OBJECTS) return "REST002";
  if (operationName === AuditLogConstants.OP_PUT_OBJECTS) return "REST003";
  if (operationName === AuditLogConstants.OP_DELETE_OBJECT) return "REST004";
  
  // Array Operations (REST011-REST020)
  if (operationName === AuditLogConstants.OP_GET_ARRAYS_METADATA) return "REST011";
  if (operationName === AuditLogConstants.OP_GET_ARRAY_METADATA) return "REST012";
  if (operationName === AuditLogConstants.OP_GET_ARRAY) return "REST013";
  if (operationName === AuditLogConstants.OP_PUT_ARRAYS) return "REST014";
  
  // Dataspace Operations (REST021-REST030)
  if (operationName === AuditLogConstants.OP_LIST_DATASPACES) return "REST021";
  if (operationName === AuditLogConstants.OP_GET_DATASPACE_INFO) return "REST022";
  if (operationName === AuditLogConstants.OP_CREATE_DATASPACES) return "REST023";
  if (operationName === AuditLogConstants.OP_DUPLICATE_DATASPACE) return "REST024";
  if (operationName === AuditLogConstants.OP_DELETE_DATASPACE) return "REST025";
  if (operationName === AuditLogConstants.OP_LOCK_DATASPACE) return "REST026";
  if (operationName === AuditLogConstants.OP_UNLOCK_DATASPACE) return "REST027";
  
  // Resource Operations (REST031-REST040)
  if (operationName === AuditLogConstants.OP_LIST_RESOURCES) return "REST031";
  if (operationName === AuditLogConstants.OP_LIST_ALL_RESOURCES) return "REST032";
  if (operationName === AuditLogConstants.OP_GET_RESOURCES_BY_TYPE) return "REST033";
  if (operationName === AuditLogConstants.OP_GET_RESOURCE_TARGETS) return "REST034";
  if (operationName === AuditLogConstants.OP_GET_RESOURCE_SOURCES) return "REST035";
  if (operationName === AuditLogConstants.OP_GRAPH_ALL_RESOURCES) return "REST036";
  if (operationName === AuditLogConstants.OP_GRAPH_RESOURCE_TARGETS) return "REST037";
  if (operationName === AuditLogConstants.OP_GRAPH_RESOURCE_SOURCES) return "REST038";
  
  // Transaction Operations (REST041-REST045)
  if (operationName === AuditLogConstants.OP_CREATE_TRANSACTION) return "REST041";
  if (operationName === AuditLogConstants.OP_COMMIT_TRANSACTION) return "REST042";
  if (operationName === AuditLogConstants.OP_ROLLBACK_TRANSACTION) return "REST043";
  
  // Manifest Operations (REST046-REST050)
  if (operationName === AuditLogConstants.OP_CREATE_MANIFEST) return "REST046";
  
  // Authentication Operations (REST051-REST055)
  if (operationName === AuditLogConstants.OP_GET_TOKEN) return "REST051";
  
  // Default fallback
  return "REST999";  // Unknown
}

/**
 * @brief Map operation name to action type
 * 
 * @param operationName The operation name
 * @return Action type string
 */
export function getActionType(operationName: string): string {
  // Read operations
  if (operationName.startsWith("Get") || 
      operationName.startsWith("List") || 
      operationName.startsWith("Graph")) {
    return AuditLogConstants.ACTION_READ;
  }
  
  // Create operations
  if (operationName.startsWith("Create") || 
      operationName.startsWith("Put") || 
      operationName.startsWith("Duplicate") ||
      operationName === AuditLogConstants.OP_CREATE_DATASPACES ||
      operationName === AuditLogConstants.OP_CREATE_TRANSACTION) {
    return AuditLogConstants.ACTION_CREATE;
  }
  
  // Delete operations
  if (operationName.startsWith("Delete") ||
      operationName === AuditLogConstants.OP_ROLLBACK_TRANSACTION) {
    return AuditLogConstants.ACTION_DELETE;
  }
  
  // Update operations
  if (operationName.startsWith("Update")) {
    return AuditLogConstants.ACTION_UPDATE;
  }
  
  // Execute operations (transactions, locks, etc.)
  if (operationName === AuditLogConstants.OP_COMMIT_TRANSACTION ||
      operationName === AuditLogConstants.OP_LOCK_DATASPACE ||
      operationName === AuditLogConstants.OP_UNLOCK_DATASPACE ||
      operationName === AuditLogConstants.OP_CREATE_MANIFEST) {
    return AuditLogConstants.ACTION_EXECUTE;
  }
  
  // Default fallback
  return AuditLogConstants.ACTION_EXECUTE;
}

/**
 * @brief Determine result type from HTTP status code
 * 
 * @param statusCode HTTP status code
 * @return Result type string (SUCCESS or FAILURE)
 */
export function getResultType(statusCode: number): string {
  return statusCode >= 200 && statusCode < 400
    ? AuditLogConstants.RESULT_SUCCESS
    : AuditLogConstants.RESULT_FAILURE;
}
