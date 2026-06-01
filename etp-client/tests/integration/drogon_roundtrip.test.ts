/**
 * Integration test: Drogon dataset round-trip.
 *
 * Tests:
 * 1. Load RESQML 2.2 objects from Drogon EPC (structure maps, grid, wells, properties)
 * 2. Create matching WITSML 1.4.1 wells/logs for same wellbores
 * 3. Build M27 manifests for both
 * 4. Verify wellbore round-trip: RESQML WellboreFeature ↔ WITSML Wellbore
 *
 * Run: npx jest tests/integration/drogon_roundtrip.test.ts --runInBand
 */

import * as fs from "fs";
import * as path from "path";
import AdmZip = require("adm-zip");
import { ManifestBuilder, ManifestOptions } from "../../src/manifest/builder";
import { WitsmlParser } from "../../src/witsml/parser";
import { detectDataObjectType } from "../../src/resqml/types";

// ─── Test Data ───────────────────────────────────────────────────────────────

const EPC_PATH = path.resolve(process.env.HOME!, "ores/demo/drogonresqml22/drogon_demo_22.epc");

const OPTS: ManifestOptions = {
  acl: {
    owners: ["data.default.owners@dev.dataservices.energy"],
    viewers: ["data.office.global.viewers@dev.dataservices.energy"],
  },
  legal: {
    legaltags: ["dev-equinor-private-default"],
    otherRelevantDataCountries: ["NO"],
  },
};

// Drogon wells from the RESQML EPC
const DROGON_WELLS = [
  { name: "55/33-A-1", uuid: "50495987-88f4-4e39-95c8-0b2624298c47" },
  { name: "55/33-A-2", uuid: "53e2c61e-9ef6-40fc-9d35-7c740287c0ca" },
  { name: "55/33-A-3", uuid: "7e602daa-95cd-4bc6-9950-f389e252d35a" },
  { name: "55/33-A-4", uuid: "66ba7e66-4f87-46ea-9e55-e4b8f1b2c7bc" },
  { name: "55/33-A-5", uuid: "d3727dbc-0025-407b-89a1-c93337f1fe25" },
  { name: "55/33-A-6", uuid: "e1c757ee-9ad7-4575-9f9c-d15a60e3ef1a" },
  { name: "55/33-1",   uuid: "6400c518-246f-41c3-9e0e-ba336ee5b5f1" },
  { name: "55/33-2",   uuid: "830ae7e3-5f03-43b6-b066-a1977194ff2a" },
  { name: "55/33-3",   uuid: "df2828a0-ebb9-4edd-84fb-51c946d57f1d" },
  { name: "OP5_Y1",    uuid: "5977521b-9f69-4572-906f-4f5e4f8004bc" },
  { name: "OP5_Y2",    uuid: "cf76d1a8-fc2b-4f83-afe4-b96cc2bb41b7" },
  { name: "OP6",       uuid: "a1f4af0a-934a-483b-b0d7-8dcdbd4ea51a" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

interface EpcObject {
  filename: string;
  xml: string;
  type: string;
  uuid: string;
  title: string;
  qualifiedType: string;
}

function loadEpcObjects(epcPath: string): EpcObject[] {
  const zip = new AdmZip(epcPath);
  const entries = zip.getEntries();
  const objects: EpcObject[] = [];

  for (const entry of entries) {
    if (!entry.entryName.endsWith(".xml") || entry.entryName.startsWith("docProps")) continue;
    const xml = entry.getData().toString("utf8");
    const detected = detectDataObjectType(xml);
    if (detected) {
      objects.push({
        filename: entry.entryName,
        xml,
        type: detected.objectType,
        uuid: detected.uuid,
        title: detected.title,
        qualifiedType: detected.qualifiedType,
      });
    }
  }
  return objects;
}

function generateWitsml141Wells(): string {
  const logs = DROGON_WELLS.map(
    (w) => `
  <log uid="${w.uuid}">
    <nameWell>${w.name}</nameWell>
    <name>Composite GR-DT-NPHI</name>
    <indexCurve>DEPTH</indexCurve>
    <logCurveInfo><mnemonic>DEPTH</mnemonic><unit>m</unit></logCurveInfo>
    <logCurveInfo><mnemonic>GR</mnemonic><unit>gAPI</unit></logCurveInfo>
    <logCurveInfo><mnemonic>DT</mnemonic><unit>us/ft</unit></logCurveInfo>
    <logCurveInfo><mnemonic>NPHI</mnemonic><unit>v/v</unit></logCurveInfo>
    <logData>
      <data>1000.0, 45.2, 105.3, 0.18</data>
      <data>1000.5, 47.1, 103.8, 0.19</data>
      <data>1001.0, 52.3, 98.2, 0.22</data>
    </logData>
  </log>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<logs xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
${logs}
</logs>`;
}

function generateWitsml141Trajectories(): string {
  const trajs = DROGON_WELLS.slice(0, 6).map(
    (w) => `
  <trajectory uid="traj-${w.uuid}">
    <nameWell>${w.name}</nameWell>
    <nameWellbore>${w.name}</nameWellbore>
    <name>Drilled Trajectory</name>
    <trajectoryStation><md uom="m">0</md><incl uom="deg">0</incl><azi uom="deg">0</azi></trajectoryStation>
    <trajectoryStation><md uom="m">500</md><incl uom="deg">2.1</incl><azi uom="deg">135</azi></trajectoryStation>
    <trajectoryStation><md uom="m">1500</md><incl uom="deg">45.0</incl><azi uom="deg">140</azi></trajectoryStation>
    <trajectoryStation><md uom="m">2800</md><incl uom="deg">85.0</incl><azi uom="deg">142</azi></trajectoryStation>
  </trajectory>`
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<trajectorys xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
${trajs}
</trajectorys>`;
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("Drogon Dataset Round-trip", () => {
  const builder = new ManifestBuilder();
  const parser = new WitsmlParser();
  let epcObjects: EpcObject[];

  beforeAll(() => {
    if (!fs.existsSync(EPC_PATH)) {
      console.warn(`Skipping: EPC not found at ${EPC_PATH}`);
      return;
    }
    epcObjects = loadEpcObjects(EPC_PATH);
  });

  // ─── RESQML Manifest ──────────────────────────────────────────────────

  it("loads 840 objects from Drogon EPC", () => {
    if (!epcObjects) return;
    // Should have ~837 XML objects (minus docProps)
    expect(epcObjects.length).toBeGreaterThan(800);
  });

  it("builds M27 manifest for full Drogon dataspace", () => {
    if (!epcObjects) return;

    const storedObjects = epcObjects.map((obj) => ({
      uri: `eml:///dataspace('maap/drogon_22')/${obj.qualifiedType}('${obj.uuid}')`,
      type: obj.qualifiedType,
      xml: obj.xml,
      name: obj.title,
    }));

    const manifest = builder.build(storedObjects, "maap/drogon_22", OPTS);

    expect(manifest.kind).toBe("osdu:wks:Manifest:1.0.0");
    expect(manifest.Data.Datasets).toHaveLength(1);
    expect(manifest.Data.Datasets[0].kind).toBe("osdu:wks:dataset--ETPDataspace:1.0.1");

    // Should have WPCs for grids, surfaces, properties, interpretations
    expect(manifest.Data.WorkProductComponents.length).toBeGreaterThan(500);

    // Should have MasterData for WellboreFeatures
    expect(manifest.MasterData).toHaveLength(12);
    expect(manifest.MasterData[0].kind).toBe("osdu:wks:master-data--Wellbore:1.3.0");

    // Structure maps (Grid2d → StructureMap:1.0.0)
    const structureMaps = manifest.Data.WorkProductComponents.filter(
      (w) => w.kind === "osdu:wks:work-product-component--StructureMap:1.0.0"
    );
    expect(structureMaps).toHaveLength(15);

    // IjkGrid
    const grids = manifest.Data.WorkProductComponents.filter(
      (w) => w.kind === "osdu:wks:work-product-component--IjkGridRepresentation:1.1.0"
    );
    expect(grids).toHaveLength(1);
    expect(grids[0].data.Name).toBe("Geogrid");

    // GenericProperty (ContinuousProperty + DiscreteProperty)
    const props = manifest.Data.WorkProductComponents.filter(
      (w) => w.kind === "osdu:wks:work-product-component--GenericProperty:1.2.0"
    );
    expect(props.length).toBeGreaterThanOrEqual(189 + 65); // continuous + discrete

    // WellboreTrajectory
    const trajectories = manifest.Data.WorkProductComponents.filter(
      (w) => w.kind === "osdu:wks:work-product-component--WellboreTrajectory:1.3.0"
    );
    expect(trajectories).toHaveLength(12);

    // WellLog (WellboreFrame)
    const wellLogs = manifest.Data.WorkProductComponents.filter(
      (w) => w.kind === "osdu:wks:work-product-component--WellLog:1.2.0"
    );
    expect(wellLogs).toHaveLength(9);

    // DDMSDatasets URI format check
    const firstWpc = manifest.Data.WorkProductComponents[0];
    expect(firstWpc.data.DDMSDatasets[0]).toMatch(
      /^eml:\/\/\/dataspace\('maap\/drogon_22'\)\/resqml22\.\w+\('[0-9a-f-]+'\)$/
    );

    console.log(`\n  Manifest summary (Drogon RESQML 2.2):
    Datasets:            ${manifest.Data.Datasets.length}
    WorkProductComponents: ${manifest.Data.WorkProductComponents.length}
    MasterData:          ${manifest.MasterData.length}
    ReferenceData:       ${manifest.ReferenceData.length}
    ─────────────────────────────────
    StructureMaps:       ${structureMaps.length}
    IjkGrids:           ${grids.length}
    Properties:          ${props.length}
    WellboreTrajectories: ${trajectories.length}
    WellLogs:           ${wellLogs.length}
    Wellbores (master):  ${manifest.MasterData.length}`);
  });

  // ─── WITSML 1.4.1 Duplicate Wells ────────────────────────────────────

  it("parses WITSML 1.4.1 logs for same wells", () => {
    const xml = generateWitsml141Wells();
    const logs = parser.parse(xml);

    expect(logs).toHaveLength(12);
    expect(logs[0].type).toBe("Log");
    expect(logs[0].version).toBe("1.4.1");
    expect(logs[0].curves).toHaveLength(4); // DEPTH, GR, DT, NPHI

    // Verify well names match RESQML WellboreFeatures
    const witsmlWellNames = logs.map((l) => l.wellName).sort();
    const resqmlWellNames = DROGON_WELLS.map((w) => w.name).sort();
    expect(witsmlWellNames).toEqual(resqmlWellNames);
  });

  it("parses WITSML 1.4.1 trajectories for same wells", () => {
    const xml = generateWitsml141Trajectories();
    const trajs = parser.parse(xml);

    expect(trajs).toHaveLength(6);
    expect(trajs[0].type).toBe("Trajectory");
    expect(trajs[0].version).toBe("1.4.1");
  });

  it("builds M27 manifest for WITSML wells", () => {
    const logsXml = generateWitsml141Wells();
    const logs = parser.parse(logsXml);

    // Simulate stored objects (as they'd appear after ETP store)
    const storedObjects = logs.map((log) => ({
      uri: `eml:///dataspace('maap/drogon_22')/witsml21.Log('${log.uid}')`,
      type: "witsml21.Log",
      xml: log.xml,
      name: log.name,
    }));

    const manifest = builder.build(storedObjects, "maap/drogon_22", OPTS);

    expect(manifest.Data.WorkProductComponents).toHaveLength(12);
    expect(manifest.Data.WorkProductComponents[0].kind).toBe("osdu:wks:work-product-component--WellLog:1.2.0");
  });

  // ─── Round-trip Comparison ────────────────────────────────────────────

  it("RESQML WellboreFeatures match WITSML wells by name", () => {
    if (!epcObjects) return;

    // Get RESQML wellbore names
    const resqmlWellbores = epcObjects
      .filter((o) => o.type === "WellboreFeature")
      .map((o) => ({ name: o.title, uuid: o.uuid }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Get WITSML well names
    const logsXml = generateWitsml141Wells();
    const witsmlLogs = parser.parse(logsXml);
    const witsmlWells = witsmlLogs
      .map((l) => ({ name: l.wellName!, uid: l.uid }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // Same 12 wells in both systems
    expect(resqmlWellbores).toHaveLength(12);
    expect(witsmlWells).toHaveLength(12);

    // Names match 1:1
    for (let i = 0; i < 12; i++) {
      expect(resqmlWellbores[i].name).toBe(witsmlWells[i].name);
    }

    // UUIDs match (we used same UUIDs deliberately)
    const resqmlUuids = new Set(resqmlWellbores.map((w) => w.uuid));
    const witsmlUuids = new Set(witsmlWells.map((w) => w.uid));
    expect(resqmlUuids).toEqual(witsmlUuids);

    console.log(`\n  Well round-trip verification:
    RESQML WellboreFeatures: ${resqmlWellbores.length}
    WITSML 1.4.1 Logs:       ${witsmlWells.length}
    Name matches:            ${resqmlWellbores.length}/${witsmlWells.length} ✓
    UUID matches:            ${resqmlUuids.size}/${witsmlUuids.size} ✓`);
  });

  it("manifests for same dataspace produce compatible records", () => {
    if (!epcObjects) return;

    // RESQML manifest
    const resqmlStored = epcObjects
      .filter((o) => o.type === "WellboreFeature")
      .map((obj) => ({
        uri: `eml:///dataspace('maap/drogon_22')/${obj.qualifiedType}('${obj.uuid}')`,
        type: obj.qualifiedType,
        xml: obj.xml,
        name: obj.title,
      }));
    const resqmlManifest = builder.build(resqmlStored, "maap/drogon_22", OPTS);

    // WITSML manifest (same wells as logs)
    const logsXml = generateWitsml141Wells();
    const logs = parser.parse(logsXml);
    const witsmlStored = logs.map((log) => ({
      uri: `eml:///dataspace('maap/drogon_22')/witsml21.Log('${log.uid}')`,
      type: "witsml21.Log",
      xml: log.xml,
      name: log.name,
    }));
    const witsmlManifest = builder.build(witsmlStored, "maap/drogon_22", OPTS);

    // RESQML WellboreFeatures → master-data--Wellbore
    expect(resqmlManifest.MasterData).toHaveLength(12);
    expect(resqmlManifest.MasterData[0].kind).toBe("osdu:wks:master-data--Wellbore:1.3.0");

    // WITSML Logs → work-product-component--WellLog
    expect(witsmlManifest.Data.WorkProductComponents).toHaveLength(12);
    expect(witsmlManifest.Data.WorkProductComponents[0].kind).toBe("osdu:wks:work-product-component--WellLog:1.2.0");

    // Both share the same dataspace dataset
    expect(resqmlManifest.Data.Datasets[0].data.DatasetProperties.URI).toBe(
      witsmlManifest.Data.Datasets[0].data.DatasetProperties.URI
    );

    // The DDMSDatasets URIs reference the same dataspace
    const resqmlUri = resqmlManifest.MasterData[0].data.DDMSDatasets[0];
    const witsmlUri = witsmlManifest.Data.WorkProductComponents[0].data.DDMSDatasets[0];
    expect(resqmlUri).toContain("dataspace('maap/drogon_22')");
    expect(witsmlUri).toContain("dataspace('maap/drogon_22')");

    console.log(`\n  Cross-format manifest comparison:
    RESQML manifest:  ${resqmlManifest.MasterData.length} master-data (Wellbore:1.3.0)
    WITSML manifest:  ${witsmlManifest.Data.WorkProductComponents.length} WPCs (WellLog:1.2.0)
    Shared dataspace: eml:///dataspace('maap/drogon_22') ✓
    Both formats reference same wells by UUID ✓`);
  });
});
