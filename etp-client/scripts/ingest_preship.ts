#!/usr/bin/env npx ts-node
/**
 * ingest_preship.ts — Ingest WITSML data manifest to preship OSDU instance.
 *
 * Auth: Uses ores k8s/configmap.yaml + secret.yaml (client_credentials).
 * Data: Builds manifest from LOCAL RDDMS `maap/witsml` dataspace using
 *       OUR ManifestBuilder (not ores).
 * Target: preship (osdu-ship.msft-osdu-test.org)
 *
 * Usage:
 *   npx ts-node scripts/ingest_preship.ts                    # full run
 *   npx ts-node scripts/ingest_preship.ts --dry-run          # preview only
 *   npx ts-node scripts/ingest_preship.ts --instance eqndev  # different target
 *   npx ts-node scripts/ingest_preship.ts --dataspace maap/witsml
 */

import * as fs from "fs";
import * as path from "path";
import { EtpClient } from "../src/etp";
import { ManifestBuilder, ManifestOptions, Manifest } from "../src/manifest/builder";

// ─── Config ──────────────────────────────────────────────────────────────────

const ORES_K8S_DIR = path.resolve(__dirname, "../../../ores/k8s");
// If ores is not relative, try env var or absolute
const ORES_K8S_DIR_ALT = process.env.ORES_K8S_DIR || "/home/maap/ores/k8s";

const ETP_SERVER_URL = process.env.ETP_SERVER_URL || "ws://localhost:9002";
const REST_PROXY_URL = process.env.REST_PROXY_URL || "http://localhost:3000";

// All M27 WITSML + RESQML + ETP schema kinds we support
const ALL_SCHEMA_KINDS = [
  // Datasets
  "osdu:wks:dataset--ETPDataspace:1.0.1",
  // Master data
  "osdu:wks:master-data--Wellbore:1.3.0",
  "osdu:wks:master-data--Well:1.2.0",
  "osdu:wks:master-data--LocalBoundaryFeature:1.1.0",
  // WPC - Wells
  "osdu:wks:work-product-component--WellLog:1.2.0",
  "osdu:wks:work-product-component--WellboreTrajectory:1.3.0",
  "osdu:wks:work-product-component--WellboreMarkerSet:1.2.0",
  "osdu:wks:work-product-component--WellboreInterpretation:1.2.0",
  // WPC - Surfaces / Grids
  "osdu:wks:work-product-component--StructureMap:1.0.0",
  "osdu:wks:work-product-component--SeismicHorizon:2.1.0",
  "osdu:wks:work-product-component--GenericBinGrid:1.0.0",
  "osdu:wks:work-product-component--IjkGridRepresentation:1.1.0",
  // WPC - Interpretations
  "osdu:wks:work-product-component--HorizonInterpretation:1.2.0",
  "osdu:wks:work-product-component--FaultInterpretation:1.3.0",
  "osdu:wks:work-product-component--StructuralModel:1.0.0",
  "osdu:wks:work-product-component--StratigraphicColumn:1.2.0",
  // WPC - Properties / Generic
  "osdu:wks:work-product-component--GenericProperty:1.2.0",
  "osdu:wks:work-product-component--GenericRepresentation:1.2.0",
  // WPC - CRS
  "osdu:wks:work-product-component--LocalModelCompoundCrs:1.2.0",
  // WPC - WITSML specific
  "osdu:wks:work-product-component--FluidReport:1.0.0",
  "osdu:wks:work-product-component--MudLogReport:1.1.0",
];

// ─── YAML Parser (minimal, same approach as ores) ────────────────────────────

function parseK8sYaml(filepath: string): Record<string, string> {
  if (!fs.existsSync(filepath)) return {};
  const text = fs.readFileSync(filepath, "utf-8");
  const result: Record<string, string> = {};
  let inDataBlock = false;

  for (const rawLine of text.split("\n")) {
    const stripped = rawLine.trim();
    // Skip blank lines and comments (don't change inDataBlock state)
    if (!stripped || stripped.startsWith("#")) continue;

    if (stripped === "data:" || stripped === "stringData:") {
      inDataBlock = true;
      continue;
    }
    // Non-indented, non-empty line = new top-level key → exit data block
    if (!rawLine.startsWith(" ") && !rawLine.startsWith("\t")) {
      inDataBlock = false;
      continue;
    }
    if (inDataBlock && stripped.includes(":")) {
      const colonIdx = stripped.indexOf(":");
      const key = stripped.substring(0, colonIdx).trim();
      let val = stripped.substring(colonIdx + 1).trim();
      // Strip quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (key && !key.startsWith("#")) {
        result[key] = val;
      }
    }
  }
  return result;
}

function loadOresK8sEnv(): Record<string, string> {
  const k8sDir = fs.existsSync(ORES_K8S_DIR) ? ORES_K8S_DIR : ORES_K8S_DIR_ALT;
  const config = parseK8sYaml(path.join(k8sDir, "configmap.yaml"));
  const secrets = parseK8sYaml(path.join(k8sDir, "secret.yaml"));
  // Merge: secrets override config, but empty strings in config don't override non-empty secrets
  const merged: Record<string, string> = { ...config };
  for (const [k, v] of Object.entries(secrets)) {
    if (v) merged[k] = v;
  }
  // Also: don't let empty configmap values mask non-empty secrets
  for (const [k, v] of Object.entries(config)) {
    if (!v && secrets[k]) {
      merged[k] = secrets[k];
    }
  }
  return merged;
}

// ─── Instance Resolution ─────────────────────────────────────────────────────

interface OsduInstance {
  name: string;
  host: string;
  partition: string;
  tenant: string;
  clientId: string;
  clientSecret: string;
  scope: string;
  legalTag: string;
  owners: string[];
  viewers: string[];
  countries: string[];
  sslVerify: boolean;
}

function loadInstance(name: string): OsduInstance {
  const env = loadOresK8sEnv();
  const prefix = `INSTANCE_${name.toUpperCase()}_`;

  const get = (key: string): string => env[`${prefix}${key}`] || "";

  const host = get("HOSTNAME");
  if (!host) {
    throw new Error(`Instance '${name}' not found in ores k8s config. Available: ${Object.keys(env).filter((k) => k.startsWith("INSTANCE_") && k.endsWith("_HOSTNAME")).map((k) => k.replace("INSTANCE_", "").replace("_HOSTNAME", "").toLowerCase()).join(", ")}`);
  }

  return {
    name,
    host: host.startsWith("http") ? host : `https://${host}`,
    partition: get("DATA_PARTITION_ID") || "opendes",
    tenant: get("TENANT_ID"),
    clientId: get("CLIENT_ID"),
    clientSecret: get("CLIENT_SECRET"),
    scope: get("SCOPE") || `${get("CLIENT_ID")}/.default`,
    legalTag: get("DEFAULT_LEGAL_TAG") || `${get("DATA_PARTITION_ID")}-default-legal-tag`,
    owners: (get("DEFAULT_OWNERS") || "").split(",").map((s) => s.trim()).filter(Boolean),
    viewers: (get("DEFAULT_VIEWERS") || "").split(",").map((s) => s.trim()).filter(Boolean),
    countries: (get("DEFAULT_COUNTRIES") || "US").split(",").map((s) => s.trim()).filter(Boolean),
    sslVerify: get("SSL_VERIFY") !== "false",
  };
}

// ─── Token Minting (client_credentials) ──────────────────────────────────────

let cachedToken: string | null = null;
let cachedExp = 0;

async function getAccessToken(inst: OsduInstance): Promise<string> {
  if (cachedToken && Date.now() / 1000 < cachedExp) {
    return cachedToken;
  }

  const tokenUrl = `https://login.microsoftonline.com/${inst.tenant}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: inst.clientId,
    client_secret: inst.clientSecret,
    scope: inst.scope,
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Auth failed (${res.status}): ${text.slice(0, 300)}`);
  }

  const data = (await res.json()) as any;
  cachedToken = data.access_token;
  cachedExp = Date.now() / 1000 + Math.max((data.expires_in || 3600) - 120, 60);
  console.error(`  ✓ token (${inst.name}, client_credentials) expires_in=${data.expires_in}s`);
  return cachedToken!;
}

// ─── OSDU API helpers ────────────────────────────────────────────────────────

async function osduHeaders(inst: OsduInstance): Promise<Record<string, string>> {
  const token = await getAccessToken(inst);
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "data-partition-id": inst.partition,
  };
}

async function checkSchemaExists(inst: OsduInstance, kind: string): Promise<boolean> {
  const headers = await osduHeaders(inst);
  const url = `${inst.host}/api/schema-service/v1/schema/${encodeURIComponent(kind)}`;
  try {
    const res = await fetch(url, { headers });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function registerSchema(inst: OsduInstance, kind: string, dryRun: boolean): Promise<boolean> {
  // Parse kind: osdu:wks:work-product-component--WellLog:1.2.0
  const match = kind.match(/^([^:]+):([^:]+):([^:]+):(\d+)\.(\d+)\.(\d+)$/);
  if (!match) {
    console.log(`    ✗ cannot parse kind: ${kind}`);
    return false;
  }
  const [, authority, source, entityType, major, minor, patch] = match;

  const payload = {
    schemaInfo: {
      schemaIdentity: {
        authority,
        source,
        entityType,
        schemaVersionMajor: parseInt(major),
        schemaVersionMinor: parseInt(minor),
        schemaVersionPatch: parseInt(patch),
      },
      status: "DEVELOPMENT",
    },
    schema: {
      "x-osdu-schema-source": kind,
      $schema: "http://json-schema.org/draft-07/schema#",
      title: entityType,
      type: "object",
      additionalProperties: true,
    },
  };

  if (dryRun) {
    console.log(`    [dry-run] would register ${kind}`);
    return true;
  }

  const headers = await osduHeaders(inst);
  const url = `${inst.host}/api/schema-service/v1/schema`;
  const res = await fetch(url, { method: "PUT", headers, body: JSON.stringify(payload) });

  if (res.status === 200 || res.status === 201) {
    console.log(`    ✓ registered ${kind}`);
    return true;
  } else if (res.status === 409) {
    console.log(`    ≈ ${kind} already exists`);
    return true;
  } else {
    const text = await res.text();
    console.log(`    ✗ ${kind}: ${res.status} ${text.slice(0, 200)}`);
    return false;
  }
}

async function ingestRecords(inst: OsduInstance, records: any[], label: string, dryRun: boolean): Promise<{ created: number; skipped: number; failed: number }> {
  console.log(`\n── Ingesting ${label} (${records.length} records) ──`);

  if (dryRun) {
    for (const r of records) {
      console.log(`    [dry-run] ${(r.id || "?").slice(0, 70)}`);
    }
    return { created: 0, skipped: 0, failed: 0 };
  }

  const headers = await osduHeaders(inst);
  const url = `${inst.host}/api/storage/v2/records`;

  // Batch up to 500
  const batchSize = 500;
  let created = 0,
    skipped = 0,
    failed = 0;

  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    const res = await fetch(url, { method: "PUT", headers, body: JSON.stringify(batch) });

    if (res.ok) {
      const result = (await res.json()) as any;
      created += (result.recordIds || []).length;
      skipped += (result.skippedRecordIds || []).length;
      console.log(`    ✓ batch ${Math.floor(i / batchSize) + 1}: created=${(result.recordIds || []).length} skipped=${(result.skippedRecordIds || []).length}`);
    } else {
      const text = await res.text();
      console.log(`    ✗ batch failed (${res.status}): ${text.slice(0, 200)}`);
      // Fall back to sequential
      for (const rec of batch) {
        const r2 = await fetch(url, { method: "PUT", headers, body: JSON.stringify([rec]) });
        if (r2.ok) {
          const rr = (await r2.json()) as any;
          created += (rr.recordIds || []).length;
          skipped += (rr.skippedRecordIds || []).length;
        } else {
          failed++;
          console.log(`      ✗ ${(rec.id || "?").slice(0, 50)}: ${r2.status}`);
        }
      }
    }
  }

  console.log(`  Summary: created=${created} skipped=${skipped} failed=${failed}`);
  return { created, skipped, failed };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const instanceName = args.includes("--instance") ? args[args.indexOf("--instance") + 1] : "preship";
  const dataspace = args.includes("--dataspace") ? args[args.indexOf("--dataspace") + 1] : "maap/witsml";
  const skipSchemas = args.includes("--skip-schemas");
  const saveOnly = args.includes("--save-only");

  // 1. Load OSDU instance config from ores k8s
  console.log("═".repeat(60));
  console.log(`  RDDMS → OSDU Catalog Ingestion`);
  console.log(`  Instance:   ${instanceName}`);
  console.log(`  Dataspace:  ${dataspace}`);
  console.log(`  Dry run:    ${dryRun}`);
  console.log("═".repeat(60));

  const inst = loadInstance(instanceName);
  console.log(`  Host:       ${inst.host}`);
  console.log(`  Partition:  ${inst.partition}`);
  console.log(`  Legal tag:  ${inst.legalTag}`);
  console.log(`  Owners:     ${inst.owners.join(", ")}`);

  // 2. Authenticate to OSDU
  console.log("\n── Authenticating ──");
  await getAccessToken(inst);

  // 3. Connect to local RDDMS ETP server
  console.log("\n── Connecting to local RDDMS ──");
  const etpClient = new EtpClient({
    serverUrl: ETP_SERVER_URL,
    dataPartitionId: "opendes",
    restProxyUrl: REST_PROXY_URL || undefined,
  });

  try {
    await etpClient.openSession();
    console.log(`  ✓ Connected to ETP at ${ETP_SERVER_URL}`);
  } catch (err: any) {
    console.log(`  ⚠ ETP direct failed, using REST proxy at ${REST_PROXY_URL}`);
    // Retry with proxy
    const proxyClient = new EtpClient({
      serverUrl: ETP_SERVER_URL,
      dataPartitionId: "opendes",
      restProxyUrl: REST_PROXY_URL,
    });
    await proxyClient.openSession();
  }

  // 4. Ensure dataspace exists — list resources
  console.log(`\n── Fetching objects from dataspace '${dataspace}' ──`);
  const dataspaceUri = `eml:///dataspace('${dataspace}')`;
  let resources: Array<{ uri: string; name: string; dataObjectType: string }> = [];
  try {
    resources = await etpClient.getResources(dataspaceUri);
    console.log(`  Found ${resources.length} objects in '${dataspace}'`);
  } catch (err: any) {
    console.log(`  ⚠ Dataspace '${dataspace}' not accessible: ${err.message}`);
    console.log(`  Creating dataspace '${dataspace}'...`);
    try {
      await etpClient.putDataspaces([{ path: dataspace }]);
      console.log(`  ✓ Created dataspace '${dataspace}'`);
      resources = [];
    } catch (e2: any) {
      console.error(`  ✗ Failed to create dataspace: ${e2.message}`);
      process.exit(1);
    }
  }

  // 5. Fetch all data objects
  let allObjects: Array<{ uri: string; type: string; xml: string; name: string }> = [];

  if (resources && resources.length > 0) {
    console.log(`  Fetching ${resources.length} data objects...`);
    const batchSize = 20;
    for (let i = 0; i < resources.length; i += batchSize) {
      const batch = resources.slice(i, i + batchSize);
      const uris = batch.map((r) => r.uri);
      try {
        const dataObjects = await etpClient.getDataObjects(uris);
        for (const obj of dataObjects) {
          allObjects.push({
            uri: obj.resource.uri,
            type: obj.resource.dataObjectType,
            xml: obj.data,
            name: obj.resource.name,
          });
        }
      } catch (err: any) {
        console.log(`    ⚠ Batch ${Math.floor(i / batchSize) + 1} failed: ${err.message}`);
      }
    }
    console.log(`  ✓ Fetched ${allObjects.length} objects`);
  } else {
    console.log(`  ⚠ No objects in dataspace. Manifest will have dataset record only.`);
  }

  // 6. Build manifest using OUR ManifestBuilder
  console.log("\n── Building manifest (RDDMS ManifestBuilder) ──");
  const builder = new ManifestBuilder();
  const manifestOpts: ManifestOptions = {
    acl: { owners: inst.owners, viewers: inst.viewers },
    legal: { legaltags: [inst.legalTag], otherRelevantDataCountries: inst.countries },
  };

  const manifest: Manifest = builder.build(allObjects, dataspace, manifestOpts);

  const totalRecords =
    manifest.Data.Datasets.length +
    manifest.Data.WorkProductComponents.length +
    manifest.MasterData.length +
    manifest.ReferenceData.length;

  console.log(`  Manifest summary:`);
  console.log(`    Datasets:              ${manifest.Data.Datasets.length}`);
  console.log(`    WorkProductComponents: ${manifest.Data.WorkProductComponents.length}`);
  console.log(`    MasterData:            ${manifest.MasterData.length}`);
  console.log(`    ReferenceData:         ${manifest.ReferenceData.length}`);
  console.log(`    ─────────────────────────────────`);
  console.log(`    Total records:         ${totalRecords}`);

  // Save manifest to file
  const outFile = path.resolve(__dirname, `../manifest_${instanceName}_${dataspace.replace("/", "_")}.json`);
  fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2));
  console.log(`  ✓ Saved to ${outFile}`);

  if (saveOnly) {
    console.log("\n  --save-only: stopping here.");
    await etpClient.closeSession();
    return;
  }

  // 7. Register missing schemas on target
  if (!skipSchemas) {
    console.log("\n── Registering missing schemas ──");
    for (const kind of ALL_SCHEMA_KINDS) {
      const exists = await checkSchemaExists(inst, kind);
      if (!exists) {
        await registerSchema(inst, kind, dryRun);
      } else {
        console.log(`    ≈ ${kind} exists`);
      }
    }
  }

  // 8. Transform manifest records for Storage API and ingest
  console.log("\n── Ingesting to OSDU Storage API ──");

  // Flatten all records (datasets + WPCs + master + reference)
  const allRecords = [
    ...manifest.Data.Datasets,
    ...manifest.ReferenceData,
    ...manifest.MasterData,
    ...manifest.Data.WorkProductComponents,
  ];

  // Ensure all records have correct partition prefix in IDs
  for (const rec of allRecords) {
    // Replace opendes: prefix with target partition if needed
    if (rec.id && rec.id.startsWith("opendes:") && inst.partition !== "opendes") {
      rec.id = `${inst.partition}:${rec.id.slice(8)}`;
    }
    // Ensure kind has correct authority
    if (rec.kind && !rec.kind.startsWith(`${inst.partition}:`)) {
      // osdu:wks:... kinds are authority-based, keep as-is (standard OSDU)
    }
  }

  const result = await ingestRecords(inst, allRecords, `${dataspace} → ${instanceName}`, dryRun);

  // 9. Summary
  console.log("\n" + "═".repeat(60));
  console.log(`  DONE — ${instanceName}`);
  console.log(`  Records: ${totalRecords} (created=${result.created} skipped=${result.skipped} failed=${result.failed})`);
  console.log(`  Manifest: ${outFile}`);
  console.log("═".repeat(60));

  await etpClient.closeSession();
}

main().catch((err) => {
  console.error(`\nFatal: ${err.message}`);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
