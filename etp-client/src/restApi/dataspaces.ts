import { Router } from "express";
import { EtpClient } from "../etp";

/**
 * Dataspaces routes — matches the official open-etp-client REST API exactly.
 *
 * Routes:
 *   GET    /dataspaces                                  List dataspaces
 *   POST   /dataspaces                                  Create dataspace
 *   DELETE /dataspaces/:id                              Delete dataspace
 *   GET    /dataspaces/:id/resources                    List types (name+count)
 *   GET    /dataspaces/:id/resources/all                List ALL resources
 *   GET    /dataspaces/:id/resources/:type              List resources of type
 *   GET    /dataspaces/:id/resources/:type/:uuid        Get object content
 *   PUT    /dataspaces/:id/resources                    Put objects (transactional)
 *   GET    /dataspaces/:id/resources/:type/:uuid/sources  Discovery sources
 *   GET    /dataspaces/:id/resources/:type/:uuid/targets  Discovery targets
 *   GET    /dataspaces/:id/resources/:type/:uuid/arrays   List arrays
 *   GET    /dataspaces/:id/resources/:type/:uuid/arrays/:path  Read array
 *   POST   /dataspaces/:id/transactions                 Begin transaction
 *   PUT    /dataspaces/:id/transactions/:txId           Commit transaction
 *   DELETE /dataspaces/:id/transactions/:txId           Rollback transaction
 *   POST   /dataspaces/:id/lock                         Lock dataspace
 *   DELETE /dataspaces/:id/lock                         Unlock dataspace
 *   PUT    /dataspaces/:id/copy                         Copy dataspace
 */
export function createDataspaceRoutes(etp: EtpClient): Router {
  const router = Router();

  // ─── Dataspace CRUD ──────────────────────────────────────────────────────

  // GET /dataspaces — list all dataspaces
  router.get("/", async (_req, res) => {
    try {
      const dataspaces = await etp.getDataspaces();
      res.json(dataspaces);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /dataspaces — create dataspace(s)
  router.post("/", async (req, res) => {
    try {
      // Accept both single {path} and array [{DataspaceId}] (official format)
      const body = req.body;
      let paths: string[];
      if (Array.isArray(body)) {
        paths = body.map((d: any) => d.DataspaceId || d.path);
      } else {
        paths = [body.path || body.DataspaceId];
      }
      if (!paths[0]) {
        res.status(400).json({ error: "path or DataspaceId is required" });
        return;
      }
      await etp.putDataspaces(paths.map((p) => ({ path: p })));
      res.status(201).json({ uri: `eml:///dataspace('${paths[0]}')`, path: paths[0] });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE /dataspaces/:id — delete a dataspace
  router.delete("/:id", async (req, res) => {
    try {
      const dsPath = decodeURIComponent(req.params.id);
      await etp.deleteDataspaces([dsPath]);
      res.status(204).send();
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── Resource Discovery (official routes) ────────────────────────────────

  // GET /dataspaces/:id/resources — list types with count
  router.get("/:id/resources", async (req, res) => {
    try {
      const dsPath = decodeURIComponent(req.params.id);
      const uri = `eml:///dataspace('${dsPath}')`;
      const resources = await etp.getResources(uri);

      // Group by dataObjectType, return [{name, count}]
      const typeCounts = new Map<string, number>();
      for (const r of resources) {
        const t = r.dataObjectType || extractType(r.uri);
        typeCounts.set(t, (typeCounts.get(t) || 0) + 1);
      }
      const result = [...typeCounts.entries()].map(([name, count]) => ({ name, count }));
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /dataspaces/:id/resources/all — list ALL resources
  router.get("/:id/resources/all", async (req, res) => {
    try {
      const dsPath = decodeURIComponent(req.params.id);
      const uri = `eml:///dataspace('${dsPath}')`;
      const resources = await etp.getResources(uri);
      res.json(resources);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /dataspaces/:id/resources/:type — list resources of a specific type
  router.get("/:id/resources/:type", async (req, res) => {
    try {
      const dsPath = decodeURIComponent(req.params.id);
      const type = req.params.type;
      const uri = `eml:///dataspace('${dsPath}')`;
      const resources = await etp.getResources(uri);
      const filtered = resources.filter((r) => {
        const rType = r.dataObjectType || extractType(r.uri);
        return rType === type;
      });
      res.json(filtered);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /dataspaces/:id/resources/:type/:uuid — get object content
  router.get("/:id/resources/:type/:uuid", async (req, res) => {
    try {
      const dsPath = decodeURIComponent(req.params.id);
      const { type, uuid } = req.params;
      const uri = `eml:///dataspace('${dsPath}')/${type}(${uuid})`;
      const objects = await etp.getDataObjects([uri]);
      if (!objects || objects.length === 0) {
        res.status(404).json({ error: "Object not found" });
        return;
      }
      // $format=json: parse XML to JSON (like the official client)
      const format = req.query["$format"] || req.query.format;
      if (format === "json") {
        try {
          const { XMLParser } = await import("fast-xml-parser");
          const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "", removeNSPrefix: true });
          const jsonObjects = objects.map((o) => parser.parse(o.data));
          res.json(jsonObjects);
        } catch {
          // If XML parse fails, return as-is wrapped in array
          res.json(objects.map((o) => ({ xml: o.data, resource: o.resource })));
        }
      } else {
        // Return XML
        res.set("Content-Type", "application/xml");
        res.send(objects[0].data);
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT /dataspaces/:id/resources — put objects (transactional)
  router.put("/:id/resources", async (req, res) => {
    try {
      const dsPath = decodeURIComponent(req.params.id);
      const objects = req.body;
      // Convert incoming objects to our DataObject format
      const dataObjects = Array.isArray(objects) ? objects.map((obj: any) => ({
        resource: {
          uri: obj.uri || `eml:///dataspace('${dsPath}')/${obj.dataObjectType || "unknown"}(${obj.uuid || ""})`,
          name: obj.name || obj.Citation?.Title || "",
          dataObjectType: obj.dataObjectType || "",
          uuid: obj.uuid || "",
        },
        data: obj.xml || obj.data || JSON.stringify(obj),
      })) : [];
      await etp.putDataObjects(dataObjects);
      res.json({ stored: dataObjects.length });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── Discovery: sources & targets ────────────────────────────────────────

  // GET /dataspaces/:id/resources/:type/:uuid/sources
  router.get("/:id/resources/:type/:uuid/sources", async (req, res) => {
    try {
      const dsPath = decodeURIComponent(req.params.id);
      const { type, uuid } = req.params;
      const uri = `eml:///dataspace('${dsPath}')/${type}(${uuid})`;
      // GetResources with scope "sources"
      const resources = await etp.getResources(uri, 1);
      res.json(resources);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /dataspaces/:id/resources/:type/:uuid/targets
  router.get("/:id/resources/:type/:uuid/targets", async (req, res) => {
    try {
      const dsPath = decodeURIComponent(req.params.id);
      const { type, uuid } = req.params;
      const uri = `eml:///dataspace('${dsPath}')/${type}(${uuid})`;
      const resources = await etp.getResources(uri, 1);
      res.json(resources);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── Arrays (stub — returns empty until DataArray protocol is implemented) ─

  // GET /dataspaces/:id/resources/:type/:uuid/arrays
  router.get("/:id/resources/:type/:uuid/arrays", async (_req, res) => {
    res.json([]);
  });

  // GET /dataspaces/:id/resources/:type/:uuid/arrays/:path
  router.get("/:id/resources/:type/:uuid/arrays/:path", async (_req, res) => {
    res.status(404).json({ error: "Array data not available via REST" });
  });

  // ─── Transactions (stub — single-user local mode, immediate commit) ──────

  // POST /dataspaces/:id/transactions — begin
  router.post("/:id/transactions", async (_req, res) => {
    // In local mode without concurrent access, return a dummy transaction ID
    const txId = `tx-${Date.now()}`;
    res.status(201).send(txId);
  });

  // PUT /dataspaces/:id/transactions/:txId — commit
  router.put("/:id/transactions/:txId", async (_req, res) => {
    res.status(200).send("committed");
  });

  // DELETE /dataspaces/:id/transactions/:txId — rollback
  router.delete("/:id/transactions/:txId", async (_req, res) => {
    res.status(200).send("rolled back");
  });

  // ─── Lock/Copy (stubs for compatibility) ─────────────────────────────────

  // POST /dataspaces/:id/lock
  router.post("/:id/lock", async (_req, res) => {
    res.status(200).json({ locked: true });
  });

  // DELETE /dataspaces/:id/lock
  router.delete("/:id/lock", async (_req, res) => {
    res.status(200).json({ locked: false });
  });

  // PUT /dataspaces/:id/copy
  router.put("/:id/copy", async (req, res) => {
    try {
      const dstPath = decodeURIComponent(req.params.id);
      const { sourceDataspace } = req.body;
      if (!sourceDataspace) {
        res.status(400).json({ error: "sourceDataspace is required" });
        return;
      }
      // Get all objects from source, put into destination
      const srcUri = `eml:///dataspace('${sourceDataspace}')`;
      const resources = await etp.getResources(srcUri);
      const uris = resources.map((r) => r.uri);
      if (uris.length > 0) {
        const objects = await etp.getDataObjects(uris);
        // Rewrite URIs to destination
        const destObjects = objects.map((o) => ({
          ...o,
          resource: {
            ...o.resource,
            uri: o.resource.uri.replace(`dataspace('${sourceDataspace}')`, `dataspace('${dstPath}')`),
          },
        }));
        await etp.putDataspaces([{ path: dstPath }]);
        await etp.putDataObjects(destObjects);
      }
      res.json({ copied: uris.length, from: sourceDataspace, to: dstPath });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

/** Extract qualified type from URI: eml:///dataspace('x')/resqml22.Type(uuid) → resqml22.Type */
function extractType(uri: string): string {
  const m = uri.match(/\/([^/(]+)\([^)]+\)$/);
  return m ? m[1] : "";
}
