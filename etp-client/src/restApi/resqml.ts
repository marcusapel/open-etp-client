import { Router } from "express";
import { EtpClient } from "../etp";
import { detectDataObjectType } from "../resqml/types";

export function createResqmlRoutes(etp: EtpClient): Router {
  const router = Router();

  // PUT /resqml/store — store RESQML 2.0.1/2.2 objects
  router.put("/store", async (req, res) => {
    try {
      const { dataspace, xml } = req.body;
      if (!dataspace || !xml) {
        res.status(400).json({ error: "dataspace and xml are required" });
        return;
      }

      const detected = detectDataObjectType(xml);
      if (!detected) {
        res.status(400).json({ error: "Could not detect RESQML object type from XML" });
        return;
      }

      const uri = `eml:///dataspace('${dataspace}')/${detected.qualifiedType}('${detected.uuid}')`;
      await etp.putDataObjects([
        {
          resource: {
            uri,
            name: detected.title,
            dataObjectType: detected.qualifiedType,
            uuid: detected.uuid,
          },
          data: xml,
        },
      ]);

      res.json({ uri, type: detected.qualifiedType, uuid: detected.uuid, name: detected.title });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST /resqml/query — query RESQML objects from a dataspace
  router.post("/query", async (req, res) => {
    try {
      const { dataspace, type } = req.body;
      if (!dataspace) {
        res.status(400).json({ error: "dataspace is required" });
        return;
      }

      const uri = `eml:///dataspace('${dataspace}')`;
      const resources = await etp.getResources(uri);

      const filtered = type
        ? resources.filter((r) => r.dataObjectType.toLowerCase().includes(type.toLowerCase()))
        : resources.filter((r) => r.dataObjectType.startsWith("resqml"));

      res.json(filtered);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
