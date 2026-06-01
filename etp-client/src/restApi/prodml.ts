import { Router } from "express";
import { EtpClient } from "../etp";
import { detectDataObjectType } from "../resqml/types";

export function createProdmlRoutes(etp: EtpClient): Router {
  const router = Router();

  // PUT /prodml/store — store PRODML 2.2 objects
  router.put("/store", async (req, res) => {
    try {
      const { dataspace, xml } = req.body;
      if (!dataspace || !xml) {
        res.status(400).json({ error: "dataspace and xml are required" });
        return;
      }

      const detected = detectDataObjectType(xml);
      if (!detected) {
        res.status(400).json({ error: "Could not detect PRODML object type from XML" });
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

  return router;
}
