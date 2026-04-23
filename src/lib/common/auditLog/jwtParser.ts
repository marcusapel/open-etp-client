// ============================================================================
// Copyright 2025 Microsoft. Inc. or its affiliates. All Rights Reserved
// ============================================================================

import { CallerInfo } from "./types";

/**
 * @brief Extract caller identity from JWT token
 * 
 * Parses the JWT token and extracts caller identity
 * @param token JWT token string (may include "Bearer " prefix)
 * @return CallerInfo with id and type (empty id if not found)
 */
export function extractCallerIdFromToken(token: string): CallerInfo {
  const info: CallerInfo = {
    id: "",
    type: ""
  };

  if (!token || token === "system") {
    return info;
  }

  try {
    // Remove "Bearer " prefix if present
    const cleanToken = token.replace(/^Bearer\s+/i, "");

    // JWT structure: header.payload.signature
    const parts = cleanToken.split(".");
    
    if (parts.length !== 3) {
      console.debug("Invalid JWT structure for given token");
      return info;
    }

    // Extract and decode payload (base64url)
    const payload = base64urlDecode(parts[1]);
    const jsonPayload = JSON.parse(payload);

    // Extracting claims from payload
    const upn = jsonPayload.upn || "";
    const unique_name = jsonPayload.unique_name || "";
    const oid = jsonPayload.oid || "";
    let appid = jsonPayload.appid || "";  // v1.0 token

    if (!appid) {
      appid = jsonPayload.azp || "";  // v2.0 token fallback
    }

    // Customer/User token: upn exists with oid
    if (upn && oid) {
      console.debug(`Customer call (upn) - Caller ID set to oid: ${oid}`);
      info.id = oid;
      info.type = "OBJECT_ID";
      return info;
    }

    // Customer/User token: unique_name exists with oid
    if (unique_name && oid) {
      console.debug(`Customer call (unique_name) - Caller ID set to oid: ${oid}`);
      info.id = oid;
      info.type = "OBJECT_ID";
      return info;
    }

    // Service token: appid exists (no upn/unique_name)
    if (appid) {
      console.debug(`Internal service call - Caller ID set to appid: ${appid}`);
      info.id = appid;
      info.type = "APPLICATION_ID";
      return info;
    }

    console.debug("No valid caller ID found in JWT token");
    return info;

  } catch (error) {
    console.debug(`Error parsing JWT token: ${error}`);
    return info;
  }
}

/**
 * @brief Decode base64url encoded string
 */
function base64urlDecode(str: string): string {
  // Convert base64url to base64
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  
  // Pad with = to make length multiple of 4
  while (base64.length % 4) {
    base64 += "=";
  }

  // Decode base64
  return Buffer.from(base64, "base64").toString("utf-8");
}
