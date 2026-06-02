import { Router } from "express";
import { createHash } from "crypto";
import { EtpClient } from "../etp";
import { WitsmlParser } from "../witsml/parser";
import { cacheWitsmlXml } from "../manifest/witsml-cache";

/** Generate a deterministic UUID v5-like from a name string */
function nameToUuid(name: string): string {
  const hash = createHash("sha256").update(name).digest("hex");
  // Format as UUID with version=5 (pos 12) and variant=RFC4122 (pos 16 high bits = 10xx)
  const v = "5"; // version 5
  const variant = ((parseInt(hash[16], 16) & 0x3) | 0x8).toString(16); // set high 2 bits to 10
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${v}${hash.slice(13, 16)}-${variant}${hash.slice(17, 20)}-${hash.slice(20, 32)}`;
}

const EML_NS = "http://www.energistics.org/energyml/data/commonv2";

/**
 * Rewrite XML so that Citation (and its children) are in the EML namespace.
 * The openETPServer scanner requires is_eml(Citation) to extract the uuid.
 */
function fixCitationNamespace(xml: string): string {
  // Ensure XML declaration
  if (!xml.startsWith("<?xml")) {
    xml = `<?xml version="1.0" encoding="UTF-8"?>\n${xml}`;
  }
  // Add eml namespace declaration to root element if not present
  if (!xml.includes(EML_NS)) {
    xml = xml.replace(/<(\w+)\s/, `<$1 xmlns:eml="${EML_NS}" `);
  }
  // Replace <Citation>...</Citation> block with eml:-prefixed version
  xml = xml.replace(
    /<Citation>([\s\S]*?)<\/Citation>/,
    (_, inner: string) => {
      // Prefix all child element tags with eml:
      const fixed = inner.replace(/<(\/?)([\w]+)>/g, "<$1eml:$2>");
      return `<eml:Citation>${fixed}</eml:Citation>`;
    }
  );
  return xml;
}

/**
 * Generate a minimal WITSML 2.1 XML envelope for 1.x objects.
 * The ETP server needs uuid attribute + eml:Citation to index objects.
 * The original 1.x XML is embedded as CustomData for round-tripping.
 */
function make21Envelope(type: string, uuid: string, name: string, originalXml: string): string {
  const now = new Date().toISOString();
  // Escape XML special chars in the original content for embedding
  const escaped = originalXml
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<?xml version="1.0" encoding="UTF-8"?>
<${type} xmlns="http://www.energistics.org/energyml/data/witsmlv2"
         xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
         schemaVersion="2.1" uuid="${uuid}">
  <eml:Citation>
    <eml:Title>${name.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</eml:Title>
    <eml:Originator>rddms-witsml-import</eml:Originator>
    <eml:Creation>${now}</eml:Creation>
    <eml:Format>WITSML 2.1 (converted from 1.x)</eml:Format>
  </eml:Citation>
  <CustomData>
    <OriginalWitsml>${escaped}</OriginalWitsml>
  </CustomData>
</${type}>`;
}

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
      const dataObjects = objects.map((obj) => {
        // Generate a proper UUID from the uid (or use it if already valid v4/v5 UUID)
        const isValidUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[45][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(obj.uid);
        const uuid = isValidUuid ? obj.uid : nameToUuid(`${dataspace}/${obj.type}/${obj.uid}`);

        let patchedXml: string;
        const hasUuidAttr = /\buuid\s*=\s*"/.test(obj.xml);
        if (hasUuidAttr) {
          // WITSML 2.x: patch existing uuid attribute + fix Citation namespace
          patchedXml = obj.xml.replace(/\buuid\s*=\s*"[^"]*"/, `uuid="${uuid}"`);
          patchedXml = fixCitationNamespace(patchedXml);
        } else {
          // WITSML 1.x: generate a minimal WITSML 2.1 XML envelope the server can index
          patchedXml = make21Envelope(obj.type, uuid, obj.name, obj.xml);
        }

        return {
          resource: {
            uri: `eml:///dataspace('${dataspace}')/witsml21.${obj.type}(${uuid})`,
            name: obj.name,
            dataObjectType: `witsml21.${obj.type}`,
            uuid,
          },
          data: patchedXml,
        };
      });

      await etp.putDataObjects(dataObjects);

      // Cache XML for manifest enrichment (avoids getDataObjects round-trip)
      for (const obj of dataObjects) {
        cacheWitsmlXml(obj.resource.uri, obj.data);
      }

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
