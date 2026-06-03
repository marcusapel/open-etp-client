#!/usr/bin/env bash
# ============================================================================
# Demo: WITSML Store Operations
#
# Demonstrates WITSML 2.1 ingestion and query via the extended ETP client:
#   - Create dataspace for WITSML data
#   - Ingest Well objects
#   - Ingest Wellbore objects
#   - Ingest WellLog objects (growing objects)
#   - Query by type, filter by well
#   - Build OSDU manifest from WITSML store
#
# Prerequisites:
#   - ETP server running on localhost:9002
#   - Extended REST client running (with witsml.module)
#   - PostgreSQL accessible (for transaction support)
#
# Usage:
#   ./demo/demo_witsml.sh [CLIENT_URL] [DATASPACE]
# ============================================================================

set -euo pipefail

CLIENT_URL="${1:-http://localhost:8080/api/reservoir-ddms/v2}"
DATASPACE="${2:-maap/witsml}"
AUTH="Bearer dummy"
PARTITION="opendes"

echo "┌─────────────────────────────────────────────────────────────┐"
echo "│  WITSML 2.1 Store Demo                                      │"
echo "│  Client: $CLIENT_URL"
echo "│  Dataspace: $DATASPACE"
echo "└─────────────────────────────────────────────────────────────┘"
echo

# ── 1. Create dataspace ──────────────────────────────────────────────────────

echo "═══ 1. Create WITSML dataspace ═══"
curl -s -X POST "$CLIENT_URL/dataspaces" \
  -H "Authorization: $AUTH" \
  -H "data-partition-id: $PARTITION" \
  -H "Content-Type: application/json" \
  -d "[{\"DataspaceId\": \"$DATASPACE\", \"Path\": \"$DATASPACE\"}]" | python3 -c "
import json, sys
try:
    r = json.load(sys.stdin)
    print(f'  Result: {json.dumps(r)[:200]}')
except: print('  Created (or already exists)')
" 2>/dev/null
echo

# ── 2. Ingest Wells ──────────────────────────────────────────────────────────

echo "═══ 2. Ingest WITSML Wells ═══"

WELLS=(
  "well-drogon-001:Drogon Main Well A-1"
  "well-drogon-002:Drogon Appraisal A-2"
  "well-drogon-003:Drogon Injector I-1"
)

for entry in "${WELLS[@]}"; do
  UUID="${entry%%:*}"
  NAME="${entry##*:}"
  XML="<Well xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" xmlns:eml=\"http://www.energistics.org/energyml/data/commonv2\" schemaVersion=\"2.1\" uuid=\"$UUID\"><eml:Citation><eml:Title>$NAME</eml:Title><eml:Originator>demo</eml:Originator><eml:Creation>2026-06-02T12:00:00Z</eml:Creation><eml:Format>WITSML v2.1</eml:Format></eml:Citation><NameLegal>$NAME</NameLegal><NumGovt>NO-$UUID</NumGovt><Country>Norway</Country><TimeZone>+01:00</TimeZone></Well>"

  RESULT=$(curl -s -X PUT "$CLIENT_URL/witsml/store" \
    -H "Authorization: $AUTH" \
    -H "data-partition-id: $PARTITION" \
    -H "Content-Type: application/json" \
    -d "{\"dataspace\":\"$DATASPACE\",\"xml\":\"$(echo "$XML" | sed 's/"/\\"/g')\"}")
  echo "  $NAME: $RESULT"
done
echo

# ── 3. Ingest Wellbores ──────────────────────────────────────────────────────

echo "═══ 3. Ingest WITSML Wellbores ═══"

WELLBORES=(
  "wb-drogon-001:Drogon A-1 Main Bore:well-drogon-001"
  "wb-drogon-002:Drogon A-2 Main Bore:well-drogon-002"
  "wb-drogon-003:Drogon I-1 Main Bore:well-drogon-003"
)

for entry in "${WELLBORES[@]}"; do
  IFS=':' read -r UUID NAME WELL_UUID <<< "$entry"
  XML="<Wellbore xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" xmlns:eml=\"http://www.energistics.org/energyml/data/commonv2\" schemaVersion=\"2.1\" uuid=\"$UUID\"><eml:Citation><eml:Title>$NAME</eml:Title><eml:Originator>demo</eml:Originator><eml:Creation>2026-06-02T12:00:00Z</eml:Creation><eml:Format>WITSML v2.1</eml:Format></eml:Citation><Well><eml:ContentType>application/x-witsml+xml;version=2.1;type=Well</eml:ContentType><eml:Title>Well</eml:Title><eml:QualifiedType>witsml21.Well</eml:QualifiedType><eml:Uuid>$WELL_UUID</eml:Uuid></Well><IsActive>true</IsActive></Wellbore>"

  RESULT=$(curl -s -X PUT "$CLIENT_URL/witsml/store" \
    -H "Authorization: $AUTH" \
    -H "data-partition-id: $PARTITION" \
    -H "Content-Type: application/json" \
    -d "{\"dataspace\":\"$DATASPACE\",\"xml\":\"$(echo "$XML" | sed 's/"/\\"/g')\"}")
  echo "  $NAME: $RESULT"
done
echo

# ── 4. Query Wells ───────────────────────────────────────────────────────────

echo "═══ 4. Query WITSML objects by type ═══"
echo "GET /witsml/store/$DATASPACE?type=Well"
echo

RESULT=$(curl -s "$CLIENT_URL/witsml/store/$DATASPACE?type=Well" \
  -H "Authorization: $AUTH" \
  -H "data-partition-id: $PARTITION")

echo "$RESULT" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if isinstance(data, list):
    print(f'  Found {len(data)} Wells:')
    for w in data:
        print(f'    {w.get(\"name\",\"?\")} (uuid={w.get(\"uuid\",\"?\")})')
elif 'objects' in data:
    print(f'  Found {len(data[\"objects\"])} Wells')
else:
    print(f'  {json.dumps(data)[:300]}')
" 2>/dev/null || echo "  Response: $RESULT"

echo

# ── 5. Build OSDU Manifest ───────────────────────────────────────────────────

echo "═══ 5. Build OSDU Manifest from WITSML store ═══"
echo "POST /manifests/build"
echo

RESULT=$(curl -s -X POST "$CLIENT_URL/manifests/build" \
  -H "Authorization: $AUTH" \
  -H "data-partition-id: $PARTITION" \
  -H "Content-Type: application/json" \
  -d "{
    \"uris\": [\"eml:///dataspace('$DATASPACE')\"],
    \"acl\": {\"owners\":[\"data.default.owners@opendes.contoso.com\"],\"viewers\":[\"data.default.viewers@opendes.contoso.com\"]},
    \"legal\": {\"legaltags\":[\"opendes-RDDMS-LegalTag\"],\"otherRelevantDataCountries\":[\"NO\"]}
  }")

echo "$RESULT" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if 'error' in data:
    print(f'  Error: {data[\"error\"][:200]}')
else:
    md = len(data.get('MasterData', []))
    wpc = len(data.get('Data', {}).get('WorkProductComponents', []))
    ds = len(data.get('Data', {}).get('Datasets', []))
    print(f'  Manifest built: {md} MasterData | {wpc} WPCs | {ds} Datasets')
    for r in data.get('MasterData', [])[:3]:
        print(f'    {r.get(\"kind\",\"?\")} — {r.get(\"data\",{}).get(\"FacilityName\",\"?\")}')
" 2>/dev/null || echo "  Response: ${RESULT:0:300}"

echo
echo "═══ WITSML Demo complete ═══"
