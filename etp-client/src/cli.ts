#!/usr/bin/env node
/**
 * rddms — CLI for Reservoir Domain Data Management Service
 *
 * Commands:
 *   rddms dataspaces list                  List dataspaces
 *   rddms dataspaces create <path>         Create a dataspace
 *   rddms dataspaces delete <path>         Delete a dataspace
 *
 *   rddms objects list <uri>               List objects in context URI
 *   rddms objects get <uri>                Get data object XML
 *   rddms objects put <file> [--uri ...]   Upload XML to dataspace
 *   rddms objects delete <uri>             Delete data object
 *
 *   rddms search <uri> [--depth N] [--type T] [--name P]
 *                                          Deep search with filters
 *   rddms tree <uri> [--depth N]           Show resource tree
 *   rddms types <uri>                      List object types
 *
 *   rddms manifest build <uri> [--legal ...] [--acl ...]
 *                                          Build OSDU manifest from dataspace
 *   rddms manifest push <file>             Push manifest to OSDU
 *
 *   rddms witsml store <file>              Store WITSML XML
 *   rddms witsml query <type> [--well ...]  Query WITSML objects
 *
 *   rddms status                           Health check
 *
 * Configuration via environment or config file:
 *   RDDMS_URL   Base URL for REST API (default: http://localhost:8080)
 */

import * as fs from "fs";
import * as path from "path";

const BASE_URL = process.env.RDDMS_URL || "http://localhost:8080";
const API_BASE = `${BASE_URL}/api/reservoir-ddms/v2`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function api(method: string, path: string, body?: any): Promise<any> {
  const url = `${API_BASE}${path}`;
  const opts: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const text = await res.text();
  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }

  if (!res.ok) {
    console.error(`Error ${res.status}: ${typeof json === "object" ? JSON.stringify(json, null, 2) : json}`);
    process.exit(1);
  }
  return json;
}

function printJson(data: any): void {
  console.log(JSON.stringify(data, null, 2));
}

function parseArgs(argv: string[]): { positional: string[]; flags: Record<string, string> } {
  const positional: string[] = [];
  const flags: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
      flags[key] = val;
    } else {
      positional.push(argv[i]);
    }
  }
  return { positional, flags };
}

function usage(): never {
  console.log(`
rddms — Reservoir Domain Data Management Service CLI

Usage: rddms <command> [subcommand] [arguments] [--flags]

Commands:
  dataspaces list                     List all dataspaces
  dataspaces create <path>            Create dataspace
  dataspaces delete <path>            Delete dataspace

  objects list <uri>                  List objects in URI context
  objects get <uri>                   Get object XML/JSON
  objects put <file> [--dataspace ds] Upload XML file(s)
  objects delete <uri>                Delete object

  epc load <file.epc> --dataspace <path> [--batch 50] [--standards resqml,witsml]
                                      Load EPC file via ETP (direct, no REST)
  epc list <file.epc>                 List objects in an EPC file

  search <uri> [--depth N] [--type T] [--name P] [--limit N]
                                      Deep discovery search
  tree <uri> [--depth N]              Resource hierarchy tree
  types <uri>                         Distinct object types summary

  manifest build <uri> [--legal tag] [--acl owners,viewers]
                                      Build OSDU M27 manifest
  manifest push <file>                Push manifest to OSDU catalog

  witsml store <file>                 Ingest WITSML XML
  witsml query <type> [--well name]   Query WITSML objects

  status                              Health / connectivity check

Environment:
  RDDMS_URL        Base URL for REST API (default: http://localhost:8080)
  ETP_SERVER_URL   WebSocket URL for direct ETP (default: ws://localhost:9002)
`);
  process.exit(0);
}

// ─── Commands ────────────────────────────────────────────────────────────────

async function cmdDataspaces(sub: string, args: string[], _flags: Record<string, string>) {
  switch (sub) {
    case "list": {
      const data = await api("GET", "/dataspaces");
      if (Array.isArray(data)) {
        for (const ds of data) {
          console.log(`  ${ds.path || ds.uri}`);
        }
        console.log(`\n${data.length} dataspace(s)`);
      } else {
        printJson(data);
      }
      break;
    }
    case "create": {
      if (!args[0]) { console.error("Usage: rddms dataspaces create <path>"); process.exit(1); }
      const data = await api("PUT", "/dataspaces", { path: args[0] });
      console.log(`Created: ${args[0]}`);
      if (data) printJson(data);
      break;
    }
    case "delete": {
      if (!args[0]) { console.error("Usage: rddms dataspaces delete <path>"); process.exit(1); }
      await api("DELETE", `/dataspaces/${encodeURIComponent(args[0])}`);
      console.log(`Deleted: ${args[0]}`);
      break;
    }
    default:
      console.error(`Unknown dataspaces subcommand: ${sub}`);
      process.exit(1);
  }
}

async function cmdObjects(sub: string, args: string[], flags: Record<string, string>) {
  switch (sub) {
    case "list": {
      if (!args[0]) { console.error("Usage: rddms objects list <uri>"); process.exit(1); }
      const data = await api("POST", "/discovery/search", { uri: args[0], depth: 1 });
      if (data.results) {
        for (const r of data.results) {
          console.log(`  ${r.dataObjectType.padEnd(50)} ${r.name}`);
        }
        console.log(`\n${data.count} object(s)`);
      } else {
        printJson(data);
      }
      break;
    }
    case "get": {
      if (!args[0]) { console.error("Usage: rddms objects get <uri>"); process.exit(1); }
      const data = await api("POST", "/resqml/query", { uris: [args[0]] });
      printJson(data);
      break;
    }
    case "put": {
      if (!args[0]) { console.error("Usage: rddms objects put <file> [--dataspace ds]"); process.exit(1); }
      const filePath = path.resolve(args[0]);
      if (!fs.existsSync(filePath)) { console.error(`File not found: ${filePath}`); process.exit(1); }
      const xml = fs.readFileSync(filePath, "utf-8");
      const dataspace = flags.dataspace || "default";
      const data = await api("PUT", "/resqml/store", { xml, dataspace });
      console.log(`Stored object from ${args[0]}`);
      if (data) printJson(data);
      break;
    }
    case "delete": {
      if (!args[0]) { console.error("Usage: rddms objects delete <uri>"); process.exit(1); }
      await api("DELETE", `/resqml/objects?uri=${encodeURIComponent(args[0])}`);
      console.log(`Deleted: ${args[0]}`);
      break;
    }
    default:
      console.error(`Unknown objects subcommand: ${sub}`);
      process.exit(1);
  }
}

async function cmdSearch(args: string[], flags: Record<string, string>) {
  if (!args[0]) { console.error("Usage: rddms search <uri> [--depth N] [--type T] [--name P]"); process.exit(1); }
  const body: any = { uri: args[0] };
  if (flags.depth) body.depth = parseInt(flags.depth);
  if (flags.type) body.dataObjectTypes = [flags.type];
  if (flags.name) body.namePattern = flags.name;
  if (flags.limit) body.limit = parseInt(flags.limit);

  const data = await api("POST", "/discovery/search", body);
  if (data.results) {
    for (const r of data.results) {
      console.log(`  ${r.dataObjectType.padEnd(50)} ${r.name}`);
      console.log(`    ${r.uri}`);
    }
    console.log(`\n${data.count} result(s)${data.truncated ? " (truncated)" : ""}`);
  } else {
    printJson(data);
  }
}

async function cmdTree(args: string[], flags: Record<string, string>) {
  if (!args[0]) { console.error("Usage: rddms tree <uri> [--depth N]"); process.exit(1); }
  const depth = flags.depth ? parseInt(flags.depth) : 2;
  const data = await api("GET", `/discovery/tree?uri=${encodeURIComponent(args[0])}&depth=${depth}`);

  function printTree(nodes: any[], indent: string) {
    for (const node of nodes) {
      const typeShort = node.type.split(".").pop() || node.type;
      console.log(`${indent}├── ${typeShort}: ${node.name}`);
      if (node.children) {
        printTree(node.children, indent + "│   ");
      }
    }
  }

  if (data.tree) {
    console.log(args[0]);
    printTree(data.tree, "");
  } else {
    printJson(data);
  }
}

async function cmdTypes(args: string[]) {
  if (!args[0]) { console.error("Usage: rddms types <uri>"); process.exit(1); }
  const data = await api("GET", `/discovery/types?uri=${encodeURIComponent(args[0])}`);
  if (data.types) {
    for (const t of data.types) {
      console.log(`  ${String(t.count).padStart(4)}  ${t.type}`);
    }
    console.log(`\n${data.totalObjects} total objects, ${data.types.length} distinct types`);
  } else {
    printJson(data);
  }
}

async function cmdManifest(sub: string, args: string[], flags: Record<string, string>) {
  switch (sub) {
    case "build": {
      if (!args[0]) { console.error("Usage: rddms manifest build <uri> [--legal tag] [--acl owners,viewers]"); process.exit(1); }
      const body: any = { uris: [args[0]] };
      if (flags.legal) body.legal = { legaltags: [flags.legal], otherRelevantDataCountries: ["US"] };
      if (flags.acl) {
        const parts = flags.acl.split(",");
        body.acl = { owners: [parts[0]], viewers: [parts[1] || parts[0]] };
      }
      if (!body.legal) body.legal = { legaltags: ["opendes-default-legal-tag"], otherRelevantDataCountries: ["US"] };
      if (!body.acl) body.acl = { owners: ["data.default.owners@opendes.dataservices.energy"], viewers: ["data.default.viewers@opendes.dataservices.energy"] };
      body.dryRun = flags.dryRun === "true" || !flags.push;

      const data = await api("POST", "/catalog/ingest", body);
      if (data.manifest) {
        const outFile = flags.output || "manifest.json";
        fs.writeFileSync(outFile, JSON.stringify(data.manifest, null, 2));
        console.log(`Manifest written to ${outFile} (${data.objectCount} objects)`);
        if (!data.dryRun) {
          console.log(`Submitted to OSDU: ${JSON.stringify(data)}`);
        }
      } else {
        printJson(data);
      }
      break;
    }
    case "push": {
      if (!args[0]) { console.error("Usage: rddms manifest push <file>"); process.exit(1); }
      const filePath = path.resolve(args[0]);
      if (!fs.existsSync(filePath)) { console.error(`File not found: ${filePath}`); process.exit(1); }
      const manifest = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const data = await api("POST", "/catalog/push", { manifest });
      printJson(data);
      break;
    }
    default:
      console.error(`Unknown manifest subcommand: ${sub}`);
      process.exit(1);
  }
}

async function cmdWitsml(sub: string, args: string[], flags: Record<string, string>) {
  switch (sub) {
    case "store": {
      if (!args[0]) { console.error("Usage: rddms witsml store <file>"); process.exit(1); }
      const filePath = path.resolve(args[0]);
      if (!fs.existsSync(filePath)) { console.error(`File not found: ${filePath}`); process.exit(1); }
      const xml = fs.readFileSync(filePath, "utf-8");
      const data = await api("PUT", "/witsml/store", { xml });
      console.log(`Stored WITSML from ${args[0]}`);
      if (data) printJson(data);
      break;
    }
    case "query": {
      if (!args[0]) { console.error("Usage: rddms witsml query <type> [--well name]"); process.exit(1); }
      const body: any = { objectType: args[0] };
      if (flags.well) body.wellName = flags.well;
      const data = await api("POST", "/witsml/query", body);
      printJson(data);
      break;
    }
    default:
      console.error(`Unknown witsml subcommand: ${sub}`);
      process.exit(1);
  }
}

async function cmdStatus() {
  const data = await api("GET", "/health");
  console.log(`Status: ${data.status}`);
  console.log(`ETP Connected: ${data.etpConnected}`);
}

/**
 * EPC load — bypasses REST, speaks ETP directly.
 * Loads an EPC ZIP file directly into a dataspace via binary Avro ETP.
 */
async function cmdEpc(sub: string, args: string[], flags: Record<string, string>) {
  switch (sub) {
    case "load": {
      if (!args[0]) {
        console.error("Usage: rddms epc load <file.epc> --dataspace <path> [--batch 50] [--standards resqml,witsml]");
        process.exit(1);
      }
      const filePath = path.resolve(args[0]);
      if (!fs.existsSync(filePath)) { console.error(`File not found: ${filePath}`); process.exit(1); }
      const dataspace = flags.dataspace || flags.ds;
      if (!dataspace) { console.error("--dataspace is required"); process.exit(1); }

      // Direct ETP — no REST server needed
      const { EtpClient } = await import("./etp");
      const { loadEpc } = await import("./epc");

      const serverUrl = process.env.ETP_SERVER_URL || "ws://localhost:9002";
      const etp = new EtpClient({ serverUrl, dataPartitionId: process.env.ETP_DATA_PARTITION_ID || "opendes" });

      console.log(`Connecting to ETP server ${serverUrl}...`);
      await etp.openSession();
      console.log(`Loading ${filePath} → dataspace '${dataspace}'...`);

      const result = await loadEpc(etp, filePath, {
        dataspace,
        batchSize: parseInt(flags.batch || "50"),
        verbose: true,
        standards: flags.standards ? flags.standards.split(",") : undefined,
        types: flags.types ? flags.types.split(",") : undefined,
      });

      await etp.closeSession();

      console.log(`\n  Loaded: ${result.loadedObjects}/${result.totalEntries} objects`);
      console.log(`  Skipped: ${result.skipped}`);
      console.log(`  By standard: ${JSON.stringify(result.byStandard)}`);
      if (result.errors.length > 0) {
        console.error(`  Errors: ${result.errors.length}`);
        result.errors.forEach((e) => console.error(`    ${e}`));
      }
      break;
    }
    case "list": {
      if (!args[0]) { console.error("Usage: rddms epc list <file.epc> [--standards resqml,witsml]"); process.exit(1); }
      const filePath = path.resolve(args[0]);
      if (!fs.existsSync(filePath)) { console.error(`File not found: ${filePath}`); process.exit(1); }

      const { extractEpcObjects } = await import("./epc");
      let objects = extractEpcObjects(filePath);

      if (flags.standards) {
        const allowed = flags.standards.split(",");
        objects = objects.filter((o) => allowed.includes(o.standard));
      }

      const byType: Record<string, number> = {};
      for (const obj of objects) {
        byType[obj.qualifiedType] = (byType[obj.qualifiedType] || 0) + 1;
      }

      console.log(`\nEPC: ${filePath}`);
      console.log(`Objects: ${objects.length}\n`);
      for (const [type, count] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
        console.log(`  ${String(count).padStart(4)}  ${type}`);
      }
      break;
    }
    default:
      console.error(`Unknown epc subcommand: ${sub}. Use: load, list`);
      process.exit(1);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const rawArgs = process.argv.slice(2);
  if (rawArgs.length === 0 || rawArgs[0] === "--help" || rawArgs[0] === "-h") {
    usage();
  }

  const { positional, flags } = parseArgs(rawArgs);
  const [command, ...rest] = positional;

  switch (command) {
    case "dataspaces":
      await cmdDataspaces(rest[0], rest.slice(1), flags);
      break;
    case "objects":
      await cmdObjects(rest[0], rest.slice(1), flags);
      break;
    case "search":
      await cmdSearch(rest, flags);
      break;
    case "tree":
      await cmdTree(rest, flags);
      break;
    case "types":
      await cmdTypes(rest);
      break;
    case "manifest":
      await cmdManifest(rest[0], rest.slice(1), flags);
      break;
    case "witsml":
      await cmdWitsml(rest[0], rest.slice(1), flags);
      break;
    case "epc":
      await cmdEpc(rest[0], rest.slice(1), flags);
      break;
    case "status":
      await cmdStatus();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      usage();
  }
}

main().catch((err) => {
  console.error(`Fatal: ${err.message}`);
  process.exit(1);
});
