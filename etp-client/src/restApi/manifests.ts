import { Router } from "express";
import { EtpClient } from "../etp";
import { ManifestBuilder, ManifestOptions } from "../manifest/builder";

export function createManifestRoutes(etp: EtpClient): Router {
  const router = Router();
  const builder = new ManifestBuilder();

  // POST /manifests/build — build OSDU manifest for dataspace or specific URIs
  router.post("/build", async (req, res) => {
    try {
      const { uris, acl, legal } = req.body;
      if (!uris || !Array.isArray(uris) || uris.length === 0) {
        res.status(400).json({ error: "uris array is required" });
        return;
      }
      if (!acl || !legal) {
        res.status(400).json({ error: "acl and legal are required" });
        return;
      }

      const opts: ManifestOptions = { acl, legal };

      // Resolve all objects from the given URIs (dataspaces or individual objects)
      const allObjects: Array<{ uri: string; type: string; xml: string; name: string }> = [];

      for (const uri of uris) {
        // If it's a dataspace URI, discover all objects
        if (uri.includes("dataspace(") && !uri.includes(")/")) {
          const resources = await etp.getResources(uri);
          for (const r of resources) {
            allObjects.push({
              uri: r.uri,
              type: r.dataObjectType || "",
              xml: "",
              name: r.name || "",
            });
          }
        } else {
          // Single object URI
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
      res.json(manifest);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
