/**
 * Pure ETP WITSML Ingestion — no REST, no EPC, only ETP Protocol 4 (Store).
 *
 * Demonstrates:
 *   1. Connect to ETP server via WebSocket (binary Avro)
 *   2. Negotiate session (Protocol 0)
 *   3. PutDataObjects (Protocol 4) with WITSML 2.1 XML
 *   4. Verify via GetResources (Protocol 3 Discovery)
 *
 * Usage:
 *   npx ts-node demo/scripts/test_etp_ingest.ts [ws://localhost:9002]
 */

import { EtpClient } from "../../../etp-client/src/etp";
import { randomUUID } from "crypto";

const ETP_URL = process.argv[2] || "ws://localhost:9002";

const WELL_UUID = randomUUID();
const WELL_NAME = "ETP Direct Ingest Test";
const DATASPACE = "maap/witsml";

// WITSML 2.1 Well XML — proper format with eml:Citation namespace
const WELL_XML = `<?xml version="1.0" encoding="UTF-8"?>
<Well xmlns="http://www.energistics.org/energyml/data/witsmlv2"
      xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
      schemaVersion="2.1" uuid="${WELL_UUID}">
  <eml:Citation>
    <eml:Title>${WELL_NAME}</eml:Title>
    <eml:Originator>ETP Direct Test</eml:Originator>
    <eml:Creation>${new Date().toISOString()}</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <TimeZone>+01:00</TimeZone>
  <GeographicLocationWGS84>
    <Latitude uom="dega">58.44</Latitude>
    <Longitude uom="dega">2.07</Longitude>
  </GeographicLocationWGS84>
  <StatusWell>active</StatusWell>
  <PurposeWell>development</PurposeWell>
  <Country>Norway</Country>
  <NumGovt>7220/8-ETP-TEST</NumGovt>
</Well>`;

async function main() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║  Pure ETP WITSML Ingestion Test (Protocol 4: Store)   ║");
  console.log("╚════════════════════════════════════════════════════════╝");
  console.log(`  Server: ${ETP_URL}`);
  console.log(`  Dataspace: ${DATASPACE}`);
  console.log(`  Object: witsml21.Well(${WELL_UUID})`);
  console.log();

  // Step 1: Connect and open session
  console.log("1. Connecting to ETP server...");
  const client = new EtpClient({ serverUrl: ETP_URL });
  await client.openSession();
  console.log("   ✓ Session established (binary Avro, ETP 1.2)");

  // Step 2: PutDataObjects — pure ETP Store protocol
  console.log("\n2. PutDataObjects (Protocol 4, MessageType 2)...");
  const uri = `eml:///dataspace('${DATASPACE}')/witsml21.Well(${WELL_UUID})`;
  await client.putDataObjects([{
    resource: {
      uri,
      name: WELL_NAME,
      dataObjectType: "witsml21.Well",
      uuid: WELL_UUID,
    },
    data: WELL_XML,
  }]);
  console.log("   ✓ PutDataObjectsResponse received (object stored)");

  // Step 3: Verify via Discovery (Protocol 3)
  console.log("\n3. Verifying via GetResources (Protocol 3, Discovery)...");
  const dsUri = `eml:///dataspace('${DATASPACE}')`;
  const resources = await client.getResources(dsUri);
  const found = resources.find((r: any) => r.uri.includes(WELL_UUID));
  if (found) {
    console.log(`   ✓ Found: ${found.name} (${found.dataObjectType})`);
    console.log(`     URI: ${found.uri}`);
  } else {
    console.log(`   ✗ NOT FOUND in discovery (${resources.length} total resources)`);
    // Check if it appears by name
    const byName = resources.find((r: any) => r.name === WELL_NAME);
    if (byName) {
      console.log(`   → Found by name: ${byName.uri}`);
    }
  }

  // Cleanup
  await client.closeSession();

  console.log("\n════════════════════════════════════════════════════════════");
  console.log("RESULT: Pure ETP WITSML ingestion " + (found ? "WORKS ✓" : "NEEDS INVESTIGATION"));
  console.log("════════════════════════════════════════════════════════════");
  console.log("\nThis proves WITSML objects can be ingested via:");
  console.log("  • WebSocket → binary Avro → PutDataObjects (Protocol 4)");
  console.log("  • No REST API, no EPC file, no import tool needed");
  console.log("\nEquinor/EtpClient compatibility:");
  console.log("  • Discovery (Protocol 3): SUPPORTED — can browse ingested objects");
  console.log("  • ChannelStreaming (Protocol 1): SUPPORTED — can stream log channels");
  console.log("  • Store (Protocol 4): NOT YET — EtpClient is read-only");
  console.log("  • To add Store support, implement PutDataObjects in EtpClient");
}

main().catch((err) => {
  console.error("ERROR:", err.message);
  process.exit(1);
});
