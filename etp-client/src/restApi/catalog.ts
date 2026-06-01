/**
 * OSDU Catalog Ingestion — push manifests to an OSDU platform instance.
 *
 * Endpoints:
 *   POST /catalog/ingest   — build manifest from dataspace, push to OSDU
 *   POST /catalog/push     — push pre-built manifest to OSDU
 *   GET  /catalog/status   — check ingestion workflow status
 */

import { Router } from "express";
import { EtpClient } from "../etp";
import { ManifestBuilder, ManifestOptions } from "../manifest/builder";

export interface OsduConfig {
  baseUrl: string; // e.g. "https://eqndev.dataservices.energy"
  dataPartitionId: string; // e.g. "opendes"
  getToken: () => Promise<string>; // token provider
}

export function createCatalogRoutes(etp: EtpClient, osduConfig?: OsduConfig): Router {
  const router = Router();
  const builder = new ManifestBuilder();

  // POST /catalog/ingest — build manifest from dataspace URIs and push to OSDU
  router.post("/ingest", async (req, res) => {
    try {
      const { uris, acl, legal, dryRun } = req.body;
      if (!uris || !Array.isArray(uris) || uris.length === 0) {
        res.status(400).json({ error: "uris array is required" });
        return;
      }
      if (!acl || !legal) {
        res.status(400).json({ error: "acl and legal are required" });
        return;
      }

      const opts: ManifestOptions = { acl, legal };

      // Resolve all objects from the given URIs
      const allObjects: Array<{ uri: string; type: string; xml: string; name: string }> = [];
      for (const uri of uris) {
        if (uri.includes("dataspace(") && !uri.includes(")/")) {
          const resources = await etp.getResources(uri);
          if (resources.length > 0) {
            const objectUris = resources.map((r) => r.uri);
            const dataObjects = await etp.getDataObjects(objectUris);
            for (const obj of dataObjects) {
              allObjects.push({
                uri: obj.resource.uri,
                type: obj.resource.dataObjectType,
                xml: obj.data,
                name: obj.resource.name,
              });
            }
          }
        } else {
          const dataObjects = await etp.getDataObjects([uri]);
          for (const obj of dataObjects) {
            allObjects.push({
              uri: obj.resource.uri,
              type: obj.resource.dataObjectType,
              xml: obj.data,
              name: obj.resource.name,
            });
          }
        }
      }

      // Extract dataspace from first URI
      const dsMatch = uris[0].match(/dataspace\('([^']+)'\)/);
      const dataspace = dsMatch ? dsMatch[1] : "default";

      const manifest = builder.build(allObjects, dataspace, opts);

      if (dryRun) {
        res.json({ manifest, objectCount: allObjects.length, dryRun: true });
        return;
      }

      if (!osduConfig) {
        res.status(501).json({
          error: "OSDU not configured. Set OSDU_BASE_URL, OSDU_PARTITION, OSDU_TOKEN_URL env vars. Use dryRun:true to preview.",
          manifest,
        });
        return;
      }

      // Push manifest to OSDU ingestion workflow
      const result = await pushManifestToOsdu(manifest, osduConfig);
      res.json({ ...result, objectCount: allObjects.length });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /catalog/push — push a pre-built manifest directly
  router.post("/push", async (req, res) => {
    try {
      const { manifest } = req.body;
      if (!manifest || manifest.kind !== "osdu:wks:Manifest:1.0.0") {
        res.status(400).json({ error: "Valid osdu:wks:Manifest:1.0.0 required in body.manifest" });
        return;
      }

      if (!osduConfig) {
        res.status(501).json({ error: "OSDU not configured" });
        return;
      }

      const result = await pushManifestToOsdu(manifest, osduConfig);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /catalog/status/:runId — check workflow status
  router.get("/status/:runId", async (req, res) => {
    try {
      if (!osduConfig) {
        res.status(501).json({ error: "OSDU not configured" });
        return;
      }

      const token = await osduConfig.getToken();
      const statusRes = await fetch(
        `${osduConfig.baseUrl}/api/os-ingestion-workflow/v1/workflow/Osdu_ingest/workflowRun/${req.params.runId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "data-partition-id": osduConfig.dataPartitionId,
          },
        },
      );
      if (!statusRes.ok) {
        res.status(statusRes.status).json({ error: `OSDU: ${statusRes.statusText}` });
        return;
      }
      res.json(await statusRes.json());
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

async function pushManifestToOsdu(manifest: any, config: OsduConfig): Promise<any> {
  const token = await config.getToken();
  const response = await fetch(`${config.baseUrl}/api/os-ingestion-workflow/v1/submitWithManifest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "data-partition-id": config.dataPartitionId,
    },
    body: JSON.stringify({
      executionContext: { manifest },
      dataType: "manifest_ingestion",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OSDU ingestion failed (${response.status}): ${body}`);
  }
  return response.json();
}
