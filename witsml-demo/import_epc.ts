/**
 * Import EPC file into ETP server via the ResqmlClient.
 * Usage: npx ts-node import_epc.ts <epc-path> <dataspace-path>
 */
import { ResqmlClient } from "../src/lib/client/ResqmlClient";
import { Energistics } from "../src/lib/common/Etp12";
import * as AdmZipModule from "adm-zip";
const AdmZip = (AdmZipModule as any).default || AdmZipModule;

import DataObject = Energistics.Etp.v12.Datatypes.Object.DataObject;
import Resource = Energistics.Etp.v12.Datatypes.Object.Resource;
import Dataspace = Energistics.Etp.v12.Datatypes.Object.Dataspace;

async function main() {
  const epcPath = process.argv[2];
  const dataspacePath = process.argv[3];

  if (!epcPath || !dataspacePath) {
    console.error("Usage: npx ts-node import_epc.ts <epc-path> <dataspace>");
    process.exit(1);
  }

  console.log(`Importing ${epcPath} to ${dataspacePath}...`);

  // Connect to ETP server
  const client = new ResqmlClient();
  const url = "ws://localhost:9002";
  await client.openSession(url, undefined, undefined, { username: "user", password: "pass" });

  // Create dataspace if needed
  try {
    const ds = new Dataspace();
    ds.uri = `eml:///dataspace('${dataspacePath}')`;
    ds.path = dataspacePath;
    ds.storeLastWrite = BigInt(Date.now()) * BigInt(1000000);
    ds.storeCreated = BigInt(Date.now()) * BigInt(1000000);
    await client.createDataspaces([ds]);
    console.log(`  Created dataspace: ${dataspacePath}`);
  } catch (e: any) {
    console.log(`  Dataspace already exists or error: ${e.message || e}`);
  }

  // Read EPC
  const zip = new AdmZip(epcPath);
  const entries = zip.getEntries();

  // Parse [Content_Types].xml
  const ctEntry = entries.find((e: AdmZip.IZipEntry) => e.entryName === "[Content_Types].xml");
  if (!ctEntry) throw new Error("No [Content_Types].xml");
  const ctXml = ctEntry.getData().toString("utf-8");

  // Build map: partName -> contentType (handle both attribute orderings, with or without leading /)
  const partContentTypes: Record<string, string> = {};
  const overrideRegex =
    /ContentType="([^"]+)"\s+PartName="\/?([\w][^"]+)"|PartName="\/?([\w][^"]+)"\s+ContentType="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = overrideRegex.exec(ctXml)) !== null) {
    const ct = m[1] || m[4];
    const pn = m[2] || m[3];
    if (ct && pn) partContentTypes[pn] = ct;
  }

  console.log(`  Content types found: ${Object.keys(partContentTypes).length}`);

  // Collect data objects (XML files excluding rels/docProps)
  const parsedObjects: Array<{
    uri: string;
    xml: string;
    name: string;
  }> = [];

  for (const entry of entries) {
    const name = entry.entryName;
    if (
      name.startsWith("_rels/") ||
      name.startsWith("docProps/") ||
      name === "[Content_Types].xml" ||
      !name.endsWith(".xml")
    )
      continue;

    const ct = partContentTypes[name];
    if (!ct) {
      console.log(`  SKIP (no content type): ${name}`);
      continue;
    }

    const xml = entry.getData().toString("utf-8");

    // Extract UUID from filename: TypeName_uuid.xml
    const match = name.match(/([^/]+)_([0-9a-f-]{36})\.xml$/i);
    if (!match) {
      console.log(`  SKIP (no UUID in name): ${name}`);
      continue;
    }

    const typeName = match[1];
    const uuid = match[2];

    // Build ETP URI from content type
    // contentType: application/x-resqml+xml;version=2.2;type=BoundaryFeature
    const typeMatch = ct.match(
      /application\/x-(\w+)\+xml;version=([^;]+);type=(\w+)/
    );
    if (!typeMatch) {
      console.log(`  SKIP (unparseable content type): ${ct}`);
      continue;
    }

    const [, family, version, etpTypeName] = typeMatch;
    let qualifiedType: string;
    if (family === "resqml" && version === "2.2") {
      qualifiedType = `resqml22.${etpTypeName}`;
    } else if (family === "resqml" && version.startsWith("2.0")) {
      qualifiedType = `resqml20.obj_${etpTypeName}`;
    } else if (family === "eml" && version === "2.3") {
      qualifiedType = `eml23.${etpTypeName}`;
    } else if (family === "eml" && version.startsWith("2.0")) {
      qualifiedType = `eml20.obj_${etpTypeName}`;
    } else {
      qualifiedType = `${family}${version.replace(/\./g, "")}.${etpTypeName}`;
    }

    const uri = `eml:///dataspace('${dataspacePath}')/${qualifiedType}(${uuid})`;

    parsedObjects.push({ uri, xml, name: typeName });
  }

  console.log(`  Parsed ${parsedObjects.length} objects from EPC`);

  // Put objects in batches using proper ETP DataObject instances
  const BATCH = 20;
  let success = 0;
  const now = BigInt(Date.now()) * BigInt(1000000); // nanoseconds

  for (let i = 0; i < parsedObjects.length; i += BATCH) {
    const batch = parsedObjects.slice(i, i + BATCH);
    const etpObjects: DataObject[] = batch.map((o) => {
      const resource = new Resource();
      resource.uri = o.uri;
      resource.name = o.name;
      resource.sourceCount = null;
      resource.targetCount = null;
      resource.lastChanged = now;
      resource.storeLastWrite = now;
      resource.storeCreated = now;

      const dataObject = new DataObject();
      dataObject.resource = resource;
      dataObject.format = "xml";
      dataObject.blobId = null;
      dataObject.data = Buffer.from(o.xml, "utf-8");
      return dataObject;
    });

    try {
      const ok = await client.putDataObjects(etpObjects);
      if (ok) {
        success += batch.length;
        console.log(`  Batch ${Math.floor(i / BATCH) + 1}: PUT ${batch.length} objects ✓`);
      } else {
        console.error(`  Batch ${Math.floor(i / BATCH) + 1}: PUT returned false`);
      }
    } catch (e: any) {
      console.error(`  Batch ${Math.floor(i / BATCH) + 1} failed: ${e.message}`);
    }
  }

  console.log(`\n  PUT ${success}/${parsedObjects.length} objects`);
  await client.closeSession();
  console.log("Done!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
