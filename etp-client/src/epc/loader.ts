/**
 * EPC File Loader — extracts RESQML/WITSML/PRODML objects from .epc files
 * and loads them into a dataspace via ETP.
 *
 * An EPC file is a ZIP archive containing:
 * - XML data objects (RESQML 2.0.1, 2.2, WITSML 2.1, PRODML 2.2, EML)
 * - [Content_Types].xml
 * - _rels/.rels + per-object .rels files
 * - Optional .h5 references (HDF5 external parts — stored as EpcExternalPartReference)
 *
 * The loader:
 * 1. Unzips and extracts all XML data objects
 * 2. Detects type/version/uuid from each XML
 * 3. Ensures the target dataspace exists (via ETP)
 * 4. Stores all objects via ETP putDataObjects (batched)
 */

import * as fs from "fs";
import AdmZip = require("adm-zip");
import { EtpClient, DataObject } from "../etp";
import { detectDataObjectType, DataObjectType } from "../resqml/types";

export interface EpcLoadResult {
  dataspace: string;
  totalEntries: number;
  loadedObjects: number;
  skipped: number;
  byStandard: Record<string, number>;
  byType: Record<string, number>;
  errors: string[];
}

export interface EpcLoadOptions {
  /** Target dataspace path (e.g. "maap/drogon22") */
  dataspace: string;
  /** Create the dataspace if it doesn't exist. Default: true */
  createDataspace?: boolean;
  /** Max batch size for putDataObjects. Default: 50 */
  batchSize?: number;
  /** If true, log progress to console. Default: false */
  verbose?: boolean;
  /** Filter: only load objects matching these standards (e.g. ["resqml", "witsml"]). Default: all */
  standards?: string[];
  /** Filter: only load objects matching these types (e.g. ["IjkGridRepresentation"]). Default: all */
  types?: string[];
}

/**
 * Extract and detect all data objects from an EPC file (no ETP connection needed).
 */
export function extractEpcObjects(epcPath: string): Array<DataObjectType & { xml: string; filename: string }> {
  const zip = new AdmZip(epcPath);
  const entries = zip.getEntries();
  const objects: Array<DataObjectType & { xml: string; filename: string }> = [];

  for (const entry of entries) {
    // Skip non-XML, content types, relationships, and docProps
    if (!entry.entryName.endsWith(".xml")) continue;
    if (entry.entryName === "[Content_Types].xml") continue;
    if (entry.entryName.includes("_rels/")) continue;
    if (entry.entryName.startsWith("docProps/")) continue;

    const xml = entry.getData().toString("utf8");
    const detected = detectDataObjectType(xml);
    if (detected) {
      objects.push({ ...detected, xml, filename: entry.entryName });
    }
  }

  return objects;
}

/**
 * Load an EPC file into a dataspace via ETP.
 */
export async function loadEpc(etp: EtpClient, epcPath: string, options: EpcLoadOptions): Promise<EpcLoadResult> {
  if (!fs.existsSync(epcPath)) {
    throw new Error(`EPC file not found: ${epcPath}`);
  }

  const {
    dataspace,
    createDataspace = true,
    batchSize = 50,
    verbose = false,
    standards,
    types,
  } = options;

  const result: EpcLoadResult = {
    dataspace,
    totalEntries: 0,
    loadedObjects: 0,
    skipped: 0,
    byStandard: {},
    byType: {},
    errors: [],
  };

  // 1. Extract objects from EPC
  const allObjects = extractEpcObjects(epcPath);
  result.totalEntries = allObjects.length;

  if (verbose) console.log(`  Extracted ${allObjects.length} objects from ${epcPath}`);

  // 2. Apply filters
  let filtered = allObjects;
  if (standards) {
    filtered = filtered.filter((o) => standards.includes(o.standard));
  }
  if (types) {
    filtered = filtered.filter((o) => types.includes(o.objectType));
  }
  result.skipped = allObjects.length - filtered.length;

  // 3. Ensure dataspace exists
  if (createDataspace) {
    try {
      await etp.putDataspaces([{ path: dataspace }]);
      if (verbose) console.log(`  Dataspace '${dataspace}' ensured`);
    } catch (err: any) {
      // Dataspace may already exist — not an error
      if (verbose) console.log(`  Dataspace '${dataspace}' already exists or created`);
    }
  }

  // 4. Build ETP DataObject array
  const dataObjects: DataObject[] = filtered.map((obj) => ({
    resource: {
      uri: `eml:///dataspace('${dataspace}')/${obj.qualifiedType}('${obj.uuid}')`,
      name: obj.title,
      dataObjectType: obj.qualifiedType,
      uuid: obj.uuid,
    },
    data: obj.xml,
  }));

  // 5. Store in batches via ETP
  for (let i = 0; i < dataObjects.length; i += batchSize) {
    const batch = dataObjects.slice(i, i + batchSize);
    try {
      await etp.putDataObjects(batch);
      result.loadedObjects += batch.length;
      if (verbose) {
        console.log(`  Stored batch ${Math.floor(i / batchSize) + 1}: ${batch.length} objects (${result.loadedObjects}/${dataObjects.length})`);
      }
    } catch (err: any) {
      result.errors.push(`Batch ${Math.floor(i / batchSize) + 1} failed: ${err.message}`);
      if (verbose) console.error(`  ERROR batch ${Math.floor(i / batchSize) + 1}: ${err.message}`);
    }
  }

  // 6. Tally by standard and type
  for (const obj of filtered) {
    result.byStandard[obj.standard] = (result.byStandard[obj.standard] || 0) + 1;
    result.byType[obj.objectType] = (result.byType[obj.objectType] || 0) + 1;
  }

  return result;
}
