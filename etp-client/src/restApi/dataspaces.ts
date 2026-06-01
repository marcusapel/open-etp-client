import { Router } from "express";
import { EtpClient } from "../etp";

export function createDataspaceRoutes(etp: EtpClient): Router {
  const router = Router();

  // GET /dataspaces — list all dataspaces
  router.get("/", async (_req, res) => {
    try {
      const dataspaces = await etp.getDataspaces();
      res.json(dataspaces);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /dataspaces — create a dataspace
  router.post("/", async (req, res) => {
    try {
      const { path, extraMetadata } = req.body;
      if (!path) {
        res.status(400).json({ error: "path is required" });
        return;
      }
      await etp.putDataspaces([{ path, extraMetadata }]);
      res.status(201).json({ uri: `eml:///dataspace('${path}')`, path });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE /dataspaces
  router.delete("/", async (req, res) => {
    try {
      const { paths } = req.body;
      if (!paths || !Array.isArray(paths)) {
        res.status(400).json({ error: "paths array is required" });
        return;
      }
      await etp.deleteDataspaces(paths);
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
