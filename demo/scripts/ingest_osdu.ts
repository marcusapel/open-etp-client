#!/usr/bin/env npx tsx
/**
 * ingest_osdu.ts — Build manifest from local RDDMS and ingest to OSDU instances.
 *
 * Uses the RDDMS REST API at :8080 to build an OSDU M27 manifest, then pushes
 * records to OSDU Storage API. Registers missing schemas automatically.
 *
 * Auth: Uses rddms/k8s/configmap.yaml + secret.yaml (client_credentials).
 *
 * Usage:
 *   npx tsx demo/scripts/ingest_osdu.ts --instance preship
 *   npx tsx demo/scripts/ingest_osdu.ts --instance eqndev --dataspace maap/witsml
 *   npx tsx demo/scripts/ingest_osdu.ts --instance interop --dry-run
 *   npx tsx demo/scripts/ingest_osdu.ts --all                      # all 3 instances
 *   npx tsx demo/scripts/ingest_osdu.ts --instance preship --skip-schemas
 */

import * as fs from "fs";
import * as path from "path";

// ─── Config ──────────────────────────────────────────────────────────────────

const RDDMS_API = process.env.RDDMS_API || "http://localhost:8080/api/reservoir-ddms/v2";
const K8S_DIR = (() => {
  const candidates = [
    path.resolve(__dirname, "../../k8s"),           // rddms/etp-client/../k8s = rddms/k8s (but doesn't exist yet)
    path.resolve(__dirname, "../../../../ores/k8s"), // ores/k8s
    "/home/maap/ores/k8s",
    "/home/maap/rddms/k8s",
  ];
  return candidates.find((d) => fs.existsSync(path.join(d, "configmap.yaml"))) || candidates[candidates.length - 1];
})();

const ALL_INSTANCES = ["eqndev", "preship", "interop"];

// M27 latest schema kinds we need for WITSML + RESQML data
const M27_SCHEMA_KINDS = [
  // Datasets
  "osdu:wks:dataset--ETPDataspace:1.0.1",
  "osdu:wks:dataset--File.Generic:1.0.0",
  // Master data
  "osdu:wks:master-data--Well:1.2.0",
  "osdu:wks:master-data--Wellbore:1.3.0",
  "osdu:wks:master-data--Organisation:1.1.0",
  "osdu:wks:master-data--Field:1.1.0",
  // WPC - Wells
  "osdu:wks:work-product-component--WellLog:1.2.0",
  "osdu:wks:work-product-component--WellboreTrajectory:1.3.0",
  "osdu:wks:work-product-component--WellboreMarkerSet:1.2.0",
  "osdu:wks:work-product-component--WellboreInterpretation:1.2.0",
  "osdu:wks:work-product-component--WellboreArchitecture:1.0.0",
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

// ─── YAML Parser (K8s configmap/secret) ──────────────────────────────────────

function parseK8sYaml(filepath: string): Record<string, string> {
  if (!fs.existsSync(filepath)) return {};
  const text = fs.readFileSync(filepath, "utf-8");
  const result: Record<string, string> = {};
  let inDataBlock = false;

  for (const rawLine of text.split("\n")) {
    const stripped = rawLine.trim();
    if (!stripped || stripped.startsWith("#")) continue;

    if (stripped === "data:" || stripped === "stringData:") {
      inDataBlock = true;
      continue;
    }
    if (!rawLine.startsWith(" ") && !rawLine.startsWith("\t")) {
      inDataBlock = false;
      continue;
    }
    if (inDataBlock && stripped.includes(":")) {
      const colonIdx = stripped.indexOf(":");
      const key = stripped.substring(0, colonIdx).trim();
      let val = stripped.substring(colonIdx + 1).trim();
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

function loadK8sEnv(): Record<string, string> {
  const config = parseK8sYaml(path.join(K8S_DIR, "configmap.yaml"));
  const secrets = parseK8sYaml(path.join(K8S_DIR, "secret.yaml"));
  const merged: Record<string, string> = { ...config };
  for (const [k, v] of Object.entries(secrets)) {
    if (v) merged[k] = v;
  }
  for (const [k, v] of Object.entries(config)) {
    if (!v && secrets[k]) merged[k] = secrets[k];
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
}

function loadInstance(name: string): OsduInstance {
  const env = loadK8sEnv();
  const prefix = `INSTANCE_${name.toUpperCase()}_`;
  const get = (key: string): string => env[`${prefix}${key}`] || "";

  const host = get("HOSTNAME");
  if (!host) {
    const available = Object.keys(env)
      .filter((k) => k.startsWith("INSTANCE_") && k.endsWith("_HOSTNAME"))
      .map((k) => k.replace("INSTANCE_", "").replace("_HOSTNAME", "").toLowerCase());
    throw new Error(`Instance '${name}' not found. Available: ${available.join(", ")}`);
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
  };
}

// ─── Token Minting (client_credentials) ──────────────────────────────────────

const tokenCache = new Map<string, { token: string; exp: number }>();

async function getAccessToken(inst: OsduInstance): Promise<string> {
  const cached = tokenCache.get(inst.name);
  if (cached && Date.now() / 1000 < cached.exp) return cached.token;

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
    throw new Error(`Auth failed for ${inst.name} (${res.status}): ${text.slice(0, 300)}`);
  }

  const data = (await res.json()) as any;
  const exp = Date.now() / 1000 + Math.max((data.expires_in || 3600) - 120, 60);
  tokenCache.set(inst.name, { token: data.access_token, exp });
  console.log(`  ✓ token (${inst.name}) expires_in=${data.expires_in}s`);
  return data.access_token;
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
  // Try PUT (create or update), fall back to POST (create only)
  let res = await fetch(`${inst.host}/api/schema-service/v1/schema`, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload),
  });

  if (res.status === 200 || res.status === 201) {
    console.log(`    ✓ registered ${kind}`);
    return true;
  } else if (res.status === 409) {
    console.log(`    ≈ ${kind} already exists`);
    return true;
  } else {
    // Try POST for some OSDU versions
    res = await fetch(`${inst.host}/api/schema-service/v1/schema`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    if (res.status === 200 || res.status === 201) {
      console.log(`    ✓ registered ${kind} (POST)`);
      return true;
    } else if (res.status === 409) {
      console.log(`    ≈ ${kind} already exists`);
      return true;
    }
    const text = await res.text();
    console.log(`    ✗ ${kind}: ${res.status} ${text.slice(0, 200)}`);
    return false;
  }
}

// ─── RDDMS Manifest Builder ─────────────────────────────────────────────────

interface Manifest {
  kind: string;
  ReferenceData: any[];
  MasterData: any[];
  Data: {
    Datasets: any[];
    WorkProductComponents: any[];
  };
}

async function buildManifestFromRddms(dataspace: string, inst: OsduInstance): Promise<Manifest> {
  const url = `${RDDMS_API}/manifests/build`;
  const body = {
    uris: [`eml:///dataspace('${dataspace}')`],
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "data-partition-id": inst.partition,
      "Authorization": "Bearer local-dev",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`RDDMS manifest build failed (${res.status}): ${text.slice(0, 300)}`);
  }

  return (await res.json()) as Manifest;
}

// ─── OSDU Storage Ingestion ──────────────────────────────────────────────────

async function ingestRecords(
  inst: OsduInstance,
  records: any[],
  dryRun: boolean
): Promise<{ created: number; skipped: number; failed: number }> {
  if (dryRun) {
    for (const r of records.slice(0, 5)) {
      console.log(`    [dry-run] ${(r.id || "?").slice(0, 70)}`);
    }
    if (records.length > 5) console.log(`    [dry-run] ... and ${records.length - 5} more`);
    return { created: 0, skipped: 0, failed: 0 };
  }

  const headers = await osduHeaders(inst);
  const url = `${inst.host}/api/storage/v2/records`;
  const batchSize = 500;
  let created = 0, skipped = 0, failed = 0;

  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    const res = await fetch(url, { method: "PUT", headers, body: JSON.stringify(batch) });

    if (res.ok) {
      const result = (await res.json()) as any;
      created += (result.recordIds || []).length;
      skipped += (result.skippedRecordIds || []).length;
      console.log(`    ✓ batch ${Math.floor(i / batchSize) + 1}: created=${(result.recordIds || []).length} skipped=${(result.skippedRecordIds || []).length}`);
    } else {
      const errText = await res.text();
      console.log(`    ⚠ batch ${Math.floor(i / batchSize) + 1} failed (${res.status}): ${errText.slice(0, 150)}`);
      // Fall back to one-by-one
      for (const rec of batch) {
        const r2 = await fetch(url, { method: "PUT", headers, body: JSON.stringify([rec]) });
        if (r2.ok) {
          const rr = (await r2.json()) as any;
          created += (rr.recordIds || []).length;
          skipped += (rr.skippedRecordIds || []).length;
        } else {
          failed++;
          const et = await r2.text();
          console.log(`      ✗ ${(rec.id || "?").slice(0, 50)}: ${r2.status} ${et.slice(0, 80)}`);
        }
      }
    }
  }

  return { created, skipped, failed };
}

// ─── Dataspace Creation (ADME requires acl + legal) ──────────────────────────

async function ensureDataspace(inst: OsduInstance, dataspaceName: string, dryRun: boolean): Promise<void> {
  const headers = await osduHeaders(inst);
  // Check if it exists via entitlements or a simple storage query
  // ADME doesn't have explicit dataspace creation - it's implicit in record IDs
  // Just log the intent
  console.log(`  Dataspace: records will use partition '${inst.partition}'`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function runInstance(instanceName: string, dataspace: string, dryRun: boolean, skipSchemas: boolean): Promise<boolean> {
  console.log("\n" + "═".repeat(60));
  console.log(`  RDDMS → OSDU: ${instanceName}`);
  console.log(`  Dataspace:  ${dataspace}`);
  console.log(`  Dry run:    ${dryRun}`);
  console.log("═".repeat(60));

  let inst: OsduInstance;
  try {
    inst = loadInstance(instanceName);
  } catch (e: any) {
    console.log(`  ✗ ${e.message}`);
    return false;
  }

  console.log(`  Host:       ${inst.host}`);
  console.log(`  Partition:  ${inst.partition}`);
  console.log(`  Legal tag:  ${inst.legalTag}`);

  // 1. Authenticate
  console.log("\n── Auth ──");
  try {
    await getAccessToken(inst);
  } catch (e: any) {
    console.log(`  ✗ ${e.message}`);
    return false;
  }

  // 2. Build manifest from local RDDMS or load from file
  console.log("\n── Building manifest ──");
  let manifest: Manifest;

  const manifestFile = args.includes("--manifest-file") ? args[args.indexOf("--manifest-file") + 1] : "";
  if (manifestFile && fs.existsSync(manifestFile)) {
    console.log(`  Loading from file: ${manifestFile}`);
    manifest = JSON.parse(fs.readFileSync(manifestFile, "utf-8"));
    // Ensure Data structure exists
    if (!manifest.Data) {
      manifest.Data = { Datasets: manifest["Data"]?.Datasets || [], WorkProductComponents: manifest["Data"]?.WorkProductComponents || [] };
    }
    // Patch ACL/legal from instance config
    const allRecords = [...(manifest.MasterData || []), ...(manifest.Data.Datasets || []), ...(manifest.Data.WorkProductComponents || []), ...(manifest.ReferenceData || [])];
    for (const rec of allRecords) {
      rec.acl = { owners: inst.owners, viewers: inst.viewers };
      rec.legal = { legaltags: [inst.legalTag], otherRelevantDataCountries: inst.countries, status: "compliant" };
    }
  } else {
    try {
      manifest = await buildManifestFromRddms(dataspace, inst);
    } catch (e: any) {
      console.log(`  ✗ ${e.message}`);
      return false;
    }
  }

  const totalRecords =
    manifest.Data.Datasets.length +
    manifest.Data.WorkProductComponents.length +
    manifest.MasterData.length +
    manifest.ReferenceData.length;

  console.log(`  Datasets:              ${manifest.Data.Datasets.length}`);
  console.log(`  WorkProductComponents: ${manifest.Data.WorkProductComponents.length}`);
  console.log(`  MasterData:            ${manifest.MasterData.length}`);
  console.log(`  ReferenceData:         ${manifest.ReferenceData.length}`);
  console.log(`  Total:                 ${totalRecords}`);

  // Save manifest
  const outDir = path.resolve(__dirname, "../manifests");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `manifest_${instanceName}_${dataspace.replace(/\//g, "_")}.json`);
  fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2));
  console.log(`  → Saved: ${path.relative(process.cwd(), outFile)}`);

  // 3. Register missing schemas
  if (!skipSchemas) {
    console.log("\n── Schemas ──");
    // Collect kinds actually used in manifest
    const usedKinds = new Set<string>();
    for (const r of [...manifest.Data.Datasets, ...manifest.Data.WorkProductComponents, ...manifest.MasterData, ...manifest.ReferenceData]) {
      if (r.kind) usedKinds.add(r.kind);
    }
    console.log(`  ${usedKinds.size} unique kinds in manifest`);

    // Check & register each
    const allKinds = [...new Set([...M27_SCHEMA_KINDS, ...usedKinds])];
    let registered = 0, existing = 0, failed = 0;
    for (const kind of allKinds) {
      const exists = await checkSchemaExists(inst, kind);
      if (exists) {
        existing++;
      } else {
        const ok = await registerSchema(inst, kind, dryRun);
        if (ok) registered++;
        else failed++;
      }
    }
    console.log(`  Summary: existing=${existing} registered=${registered} failed=${failed}`);
  }

  // 4. Ingest records
  console.log(`\n── Ingesting ${totalRecords} records ──`);
  const allRecords = [
    ...manifest.Data.Datasets,
    ...manifest.ReferenceData,
    ...manifest.MasterData,
    ...manifest.Data.WorkProductComponents,
  ];

  // Fix partition prefix if target is not 'opendes'
  if (inst.partition !== "opendes") {
    for (const rec of allRecords) {
      if (rec.id && rec.id.startsWith("opendes:")) {
        rec.id = `${inst.partition}:${rec.id.slice(8)}`;
      }
      if (rec.kind && rec.kind.startsWith("opendes:")) {
        rec.kind = `${inst.partition}:${rec.kind.slice(8)}`;
      }
    }
  }

  const result = await ingestRecords(inst, allRecords, dryRun);

  console.log(`\n  ✓ ${instanceName}: created=${result.created} skipped=${result.skipped} failed=${result.failed}`);
  return result.failed === 0;
}

const args = process.argv.slice(2);

async function main() {
  const dryRun = args.includes("--dry-run");
  const skipSchemas = args.includes("--skip-schemas");
  const runAll = args.includes("--all");
  const dataspace = args.includes("--dataspace") ? args[args.indexOf("--dataspace") + 1] : "maap/witsml";

  const instances = runAll
    ? ALL_INSTANCES
    : args.includes("--instance")
      ? [args[args.indexOf("--instance") + 1]]
      : ["preship"];

  console.log(`\n  Instances: ${instances.join(", ")}`);
  console.log(`  Dataspace: ${dataspace}`);
  console.log(`  K8s config: ${K8S_DIR}`);

  let allOk = true;
  for (const inst of instances) {
    const ok = await runInstance(inst, dataspace, dryRun, skipSchemas);
    if (!ok) allOk = false;
  }

  console.log("\n" + "═".repeat(60));
  console.log(allOk ? "  ALL DONE ✓" : "  COMPLETED WITH ERRORS ⚠");
  console.log("═".repeat(60));

  process.exit(allOk ? 0 : 1);
}

main().catch((err) => {
  console.error(`\nFatal: ${err.message}`);
  if (err.stack) console.error(err.stack);
  process.exit(1);
});
