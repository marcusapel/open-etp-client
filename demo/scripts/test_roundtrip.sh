#!/usr/bin/env bash
# demo/test_roundtrip.sh — Integration test: WITSML ingestion → PG → read-back → manifest
#
# Prerequisites:
#   - ETP server running on ws://localhost:9002
#   - etp-client running on http://localhost:8080
#   - PostgreSQL accessible
#
# Tests:
#   1. Parse WITSML 1.3.1, 1.4.1, 2.0, 2.1 test data
#   2. Ingest via PUT /witsml/store
#   3. Read back via GET /dataspaces/{ds}/resources/{type}
#   4. Read individual objects
#   5. Build OSDU manifest and validate structure
#
set -euo pipefail

API="http://localhost:8080/api/reservoir-ddms/v2"
DS="test/roundtrip-$$"
DS_ENC=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$DS', safe=''))")
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TESTDATA="$SCRIPT_DIR/../witsml-samples"
PASS=0
FAIL=0

RED='\033[0;31m'
GREEN='\033[0;32m'
BOLD='\033[1m'
NC='\033[0m'

assert_eq() {
  local label="$1" expected="$2" actual="$3"
  if [[ "$expected" == "$actual" ]]; then
    echo -e "  ${GREEN}✓${NC} $label"
    PASS=$((PASS + 1))
  else
    echo -e "  ${RED}✗${NC} $label (expected=$expected, got=$actual)"
    FAIL=$((FAIL + 1))
  fi
}

assert_contains() {
  local label="$1" haystack="$2" needle="$3"
  if [[ "$haystack" == *"$needle"* ]]; then
    echo -e "  ${GREEN}✓${NC} $label"
    PASS=$((PASS + 1))
  else
    echo -e "  ${RED}✗${NC} $label (missing: $needle)"
    FAIL=$((FAIL + 1))
  fi
}

# ─── Setup: create test dataspace ─────────────────────────────────────────── #

echo -e "${BOLD}=== WITSML Round-trip Integration Test ===${NC}"
echo "  Dataspace: $DS"
echo ""

echo -e "${BOLD}[1] Create dataspace${NC}"
resp=$(curl -s -X POST "$API/dataspaces" \
  -H "Content-Type: application/json" \
  -d "{\"path\":\"$DS\"}")
assert_contains "Dataspace created" "$resp" "$DS"

# ─── Test 2: Ingest WITSML 1.4.1 wells ───────────────────────────────────── #

echo ""
echo -e "${BOLD}[2] Ingest WITSML 1.4.1 wells${NC}"
xml_141=$(cat "$TESTDATA/wells_141.xml")
resp=$(curl -s -X PUT "$API/witsml/store" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg ds "$DS" --arg xml "$xml_141" '{dataspace: $ds, xml: $xml}')")
stored=$(echo "$resp" | jq -r '.stored // 0')
assert_eq "Stored 2 wells" "2" "$stored"

# ─── Test 3: Ingest WITSML 1.4.1 log ─────────────────────────────────────── #

echo ""
echo -e "${BOLD}[3] Ingest WITSML 1.4.1 log${NC}"
xml_log=$(cat "$TESTDATA/log_141.xml")
resp=$(curl -s -X PUT "$API/witsml/store" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg ds "$DS" --arg xml "$xml_log" '{dataspace: $ds, xml: $xml}')")
stored=$(echo "$resp" | jq -r '.stored // 0')
assert_eq "Stored 1 log" "1" "$stored"

# ─── Test 4: Ingest WITSML 1.4.1 trajectory ──────────────────────────────── #

echo ""
echo -e "${BOLD}[4] Ingest WITSML 1.4.1 trajectory${NC}"
xml_traj=$(cat "$TESTDATA/trajectory_141.xml")
resp=$(curl -s -X PUT "$API/witsml/store" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg ds "$DS" --arg xml "$xml_traj" '{dataspace: $ds, xml: $xml}')")
stored=$(echo "$resp" | jq -r '.stored // 0')
assert_eq "Stored 1 trajectory" "1" "$stored"

# ─── Test 5: Ingest WITSML 2.1 well ──────────────────────────────────────── #

echo ""
echo -e "${BOLD}[5] Ingest WITSML 2.1 well${NC}"
xml_21=$(cat "$TESTDATA/well_21.xml")
resp=$(curl -s -X PUT "$API/witsml/store" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg ds "$DS" --arg xml "$xml_21" '{dataspace: $ds, xml: $xml}')")
stored=$(echo "$resp" | jq -r '.stored // 0')
assert_eq "Stored 1 WITSML 2.1 well" "1" "$stored"

# ─── Test 6: Ingest WITSML 2.1 ChannelSet ────────────────────────────────── #

echo ""
echo -e "${BOLD}[6] Ingest WITSML 2.1 ChannelSet${NC}"
xml_cs=$(cat "$TESTDATA/channelset_21.xml")
resp=$(curl -s -X PUT "$API/witsml/store" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg ds "$DS" --arg xml "$xml_cs" '{dataspace: $ds, xml: $xml}')")
stored=$(echo "$resp" | jq -r '.stored // 0')
assert_eq "Stored 1 ChannelSet" "1" "$stored"

# ─── Test 7: Ingest WITSML 1.3.1 log ─────────────────────────────────────── #

echo ""
echo -e "${BOLD}[7] Ingest WITSML 1.3.1 log${NC}"
xml_131=$(cat "$TESTDATA/log_131.xml")
resp=$(curl -s -X PUT "$API/witsml/store" \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg ds "$DS" --arg xml "$xml_131" '{dataspace: $ds, xml: $xml}')")
stored=$(echo "$resp" | jq -r '.stored // 0')
assert_eq "Stored 1 legacy log" "1" "$stored"

# ─── Test 8: Verify types in dataspace ────────────────────────────────────── #

echo ""
echo -e "${BOLD}[8] Verify types via discovery${NC}"
sleep 1  # Allow server to finalize writes
types=$(curl -s "$API/dataspaces/${DS_ENC}/resources")
well_count=$(echo "$types" | jq '[.[] | select(.name=="witsml21.Well")] | .[0].count // 0')
log_count=$(echo "$types" | jq '[.[] | select(.name=="witsml21.Log")] | .[0].count // 0')
traj_count=$(echo "$types" | jq '[.[] | select(.name=="witsml21.Trajectory")] | .[0].count // 0')
cs_count=$(echo "$types" | jq '[.[] | select(.name=="witsml21.ChannelSet")] | .[0].count // 0')

assert_eq "Well count = 3 (2 from 1.4.1 + 1 from 2.1)" "3" "$well_count"
assert_eq "Log count = 2 (1 from 1.4.1 + 1 from 1.3.1)" "2" "$log_count"
assert_eq "Trajectory count = 1" "1" "$traj_count"
assert_eq "ChannelSet count = 1" "1" "$cs_count"

# ─── Test 9: Read individual well back ────────────────────────────────────── #

echo ""
echo -e "${BOLD}[9] Read well objects back${NC}"
wells_json=$(curl -s "$API/dataspaces/${DS_ENC}/resources/witsml21.Well")
well_names=$(echo "$wells_json" | jq -r '.[].name' | sort)
assert_contains "Contains DROGON A-1" "$well_names" "DROGON A-1"
assert_contains "Contains DROGON A-2" "$well_names" "DROGON A-2"
assert_contains "Contains DROGON C-1" "$well_names" "DROGON C-1"

# ─── Test 10: Build manifest ─────────────────────────────────────────────── #

echo ""
echo -e "${BOLD}[10] Build OSDU manifest${NC}"
manifest=$(curl -s -X POST "$API/manifests/build" \
  -H "Content-Type: application/json" \
  -d "{
    \"uris\": [\"eml:///dataspace('$DS')\"],
    \"acl\": {
      \"owners\": [\"data.default.owners@opendes.contoso.com\"],
      \"viewers\": [\"data.default.viewers@opendes.contoso.com\"]
    },
    \"legal\": {
      \"legaltags\": [\"opendes-RDDMS-LegalTag\"],
      \"otherRelevantDataCountries\": [\"US\"]
    }
  }")

manifest_kind=$(echo "$manifest" | jq -r '.kind // empty')
dataset_count=$(echo "$manifest" | jq '.Data.Datasets | length')
master_count=$(echo "$manifest" | jq '.MasterData | length')
wpc_count=$(echo "$manifest" | jq '.Data.WorkProductComponents | length')

assert_eq "Manifest kind" "osdu:wks:Manifest:1.0.0" "$manifest_kind"
assert_eq "Datasets = 1 (ETPDataspace)" "1" "$dataset_count"

# Wells (Well type) → master-data--Well
# Wellbores would be master-data--Wellbore
# Logs, Trajectories, ChannelSets → WPCs
echo "  MasterData records: $master_count"
echo "  WPC records: $wpc_count"

if [[ "$master_count" -ge 1 ]]; then
  echo -e "  ${GREEN}✓${NC} Has MasterData (wells)"
  PASS=$((PASS + 1))
else
  echo -e "  ${RED}✗${NC} No MasterData records"
  FAIL=$((FAIL + 1))
fi

if [[ "$wpc_count" -ge 1 ]]; then
  echo -e "  ${GREEN}✓${NC} Has WPCs (logs/trajectories)"
  PASS=$((PASS + 1))
else
  echo -e "  ${RED}✗${NC} No WPC records"
  FAIL=$((FAIL + 1))
fi

# Validate a specific manifest record
first_master_kind=$(echo "$manifest" | jq -r '.MasterData[0].kind // empty')
assert_contains "Master kind is Well or Wellbore" "$first_master_kind" "master-data--Well"

first_legal=$(echo "$manifest" | jq -r '.MasterData[0].legal.legaltags[0] // empty')
assert_eq "Legal tag propagated" "opendes-RDDMS-LegalTag" "$first_legal"

# Save manifest for inspection
echo "$manifest" | jq . > /tmp/manifest_roundtrip_$$.json
echo "  Manifest saved: /tmp/manifest_roundtrip_$$.json"

# ─── Cleanup ──────────────────────────────────────────────────────────────── #

echo ""
echo -e "${BOLD}[11] Cleanup: delete test dataspace${NC}"
del_resp=$(curl -s -X DELETE "$API/dataspaces/${DS_ENC}")
echo -e "  ${GREEN}✓${NC} Deleted $DS"

# ─── Summary ──────────────────────────────────────────────────────────────── #

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "  ${GREEN}PASS: $PASS${NC}  ${RED}FAIL: $FAIL${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [[ $FAIL -gt 0 ]]; then
  exit 1
fi
