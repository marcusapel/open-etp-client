import { Router } from "express";
import { EtpClient } from "../etp";
import { WitsmlParser } from "../witsml/parser";

export function createWitsmlRoutes(etp: EtpClient): Router {
  const router = Router();
  const parser = new WitsmlParser();

  // PUT /witsml/store — store WITSML 1.4.1 or 2.x objects
  router.put("/store", async (req, res) => {
    try {
      const { dataspace, xml } = req.body;
      if (!dataspace || !xml) {
        res.status(400).json({ error: "dataspace and xml are required" });
        return;
      }

      const objects = parser.parse(xml);
      const dataObjects = objects.map((obj) => ({
        resource: {
          uri: `eml:///dataspace('${dataspace}')/witsml21.${obj.type}('${obj.uid}')`,
          name: obj.name,
          dataObjectType: `witsml21.${obj.type}`,
          uuid: obj.uid,
        },
        data: obj.xml,
      }));

      await etp.putDataObjects(dataObjects);
      res.json({ stored: objects.length, objects: objects.map((o) => ({ uid: o.uid, type: o.type, name: o.name })) });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /witsml/query — query WITSML objects from a dataspace
  router.post("/query", async (req, res) => {
    try {
      const { dataspace, type } = req.body;
      if (!dataspace) {
        res.status(400).json({ error: "dataspace is required" });
        return;
      }

      const uri = `eml:///dataspace('${dataspace}')`;
      const resources = await etp.getResources(uri);

      // Filter by type if specified
      const filtered = type
        ? resources.filter((r) => r.dataObjectType.toLowerCase().includes(type.toLowerCase()))
        : resources;

      res.json(filtered);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
