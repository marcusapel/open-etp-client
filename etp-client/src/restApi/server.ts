/**
 * REST API server — Express-based, matching OSDU Reservoir DDMS REST API.
 *
 * Routes:
 *   /api/reservoir-ddms/v2/dataspaces
 *   /api/reservoir-ddms/v2/witsml/store
 *   /api/reservoir-ddms/v2/resqml/store
 *   /api/reservoir-ddms/v2/resqml/query
 *   /api/reservoir-ddms/v2/prodml/store
 *   /api/reservoir-ddms/v2/manifests/build
 *   /api/reservoir-ddms/v2/catalog/ingest
 *   /api/reservoir-ddms/v2/catalog/push
 *   /api/reservoir-ddms/v2/catalog/status/:runId
 *   /api/reservoir-ddms/v2/discovery/search
 *   /api/reservoir-ddms/v2/discovery/tree
 *   /api/reservoir-ddms/v2/discovery/types
 */

import express, { Router } from "express";
import { EtpClient } from "../etp";
import { createDataspaceRoutes } from "./dataspaces";
import { createWitsmlRoutes } from "./witsml";
import { createResqmlRoutes } from "./resqml";
import { createProdmlRoutes } from "./prodml";
import { createManifestRoutes } from "./manifests";
import { createCatalogRoutes, OsduConfig } from "./catalog";
import { createDiscoveryRoutes } from "./discovery";

export interface RestServerOptions {
  port: number;
  host: string;
  etpClient: EtpClient;
  osduConfig?: OsduConfig;
}

export function createRestServer(options: RestServerOptions): express.Application {
  const app = express();
  app.use(express.json({ limit: "50mb" }));

  const base = "/api/reservoir-ddms/v2";
  const router = Router();

  // Health check
  router.get("/health", (_req, res) => {
    res.json({ status: "ok", etpConnected: options.etpClient.isConnected });
  });

  // Mount route groups
  router.use("/dataspaces", createDataspaceRoutes(options.etpClient));
  router.use("/witsml", createWitsmlRoutes(options.etpClient));
  router.use("/resqml", createResqmlRoutes(options.etpClient));
  router.use("/prodml", createProdmlRoutes(options.etpClient));
  router.use("/manifests", createManifestRoutes(options.etpClient));
  router.use("/catalog", createCatalogRoutes(options.etpClient, options.osduConfig));
  router.use("/discovery", createDiscoveryRoutes(options.etpClient));

  app.use(base, router);

  return app;
}
