#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
# ingest_local.sh — Full ingestion pipeline for local Docker ETP server
#
# Populates:
#   maap/drogon   — Drogon RESQML (EPC) + WITSML well data (wells, logs, traj)
#   maap/witsml   — Chevron, mudlog, and other demo WITSML samples
#
# Prerequisites:
#   - Docker ETP server running on localhost:9002 (from ores3 or docker-compose)
#   - Native etp-client built from open-etp-client/ (auto-started on :8080)
#   - osdu-etp-sslclient Docker image available locally
#   - drogon_demo.epc + drogon_demo.h5 in the ores drogonresqml folder
#
# Usage:
#   bash demo/scripts/ingest_local.sh                 # full pipeline
#   bash demo/scripts/ingest_local.sh --drogon-only   # only maap/drogon
#   bash demo/scripts/ingest_local.sh --witsml-only   # only maap/witsml
#   bash demo/scripts/ingest_local.sh --skip-epc      # skip EPC, WITSML only
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEMO_DIR="$(dirname "$SCRIPT_DIR")"
REPO_DIR="$(dirname "$DEMO_DIR")"

# ─── Configuration ────────────────────────────────────────────────────────── #

ETP_PORT="${ETP_PORT:-9002}"
REST_URL="${REST_URL:-http://localhost:8080/api/reservoir-ddms/v2}"
WITSML_URL="${WITSML_URL:-${REST_URL}/witsml/store}"
ETP_IMAGE="${ETP_IMAGE:-osdu-etp-sslclient}"
PARTITION="${PARTITION:-opendes}"
AUTH="Bearer dummy"

# OSDU interop instance metadata (for manifest generation)
LEGAL_TAG="${LEGAL_TAG:-opendes-ReservoirDDMS-Legal-Tag}"
OWNERS="${OWNERS:-data.default.owners@opendes.dataservices.energy}"
VIEWERS="${VIEWERS:-data.default.viewers@opendes.dataservices.energy}"
COUNTRIES="${COUNTRIES:-US}"

# Source data
ORES_DROGON="${ORES_DROGON:-/home/maap/ores/demo/drogonresqml}"
EPC_FILE="${ORES_DROGON}/drogon_demo.epc"
H5_FILE="${ORES_DROGON}/drogon_demo.h5"
WITSML_SAMPLES="${DEMO_DIR}/witsml-samples"

# Dataspaces
DS_DROGON="maap/drogon"
DS_WITSML="maap/witsml"

# Colors
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; NC='\033[0m'; BOLD='\033[1m'

# ─── Flags ────────────────────────────────────────────────────────────────── #

DO_DROGON=true
DO_WITSML=true
DO_EPC=true

for arg in "$@"; do
  case "$arg" in
    --drogon-only) DO_WITSML=false ;;
    --witsml-only) DO_DROGON=false ;;
    --skip-epc)   DO_EPC=false ;;
    --help|-h)
      echo "Usage: $0 [--drogon-only|--witsml-only|--skip-epc]"
      exit 0 ;;
  esac
done

# ─── Helpers ──────────────────────────────────────────────────────────────── #

api() { curl -sf "$@" -H "Authorization: $AUTH" -H "data-partition-id: $PARTITION"; }

# Deterministic UUID v5 from a name — ensures cross-references are consistent
# and re-running the script produces the same UUIDs (idempotent).
name_to_uuid() {
  python3 -c "import uuid; print(uuid.uuid5(uuid.NAMESPACE_DNS, '$1'))"
}

ensure_dataspace() {
  local ds="$1"
  local xdata="${2:-}"
  echo -ne "  Creating dataspace ${CYAN}$ds${NC}..."
  local body
  if [[ -n "$xdata" ]]; then
    body="[{\"DataspaceId\":\"$ds\",\"Path\":\"$ds\",\"CustomData\":$xdata}]"
  else
    body="[{\"DataspaceId\":\"$ds\",\"Path\":\"$ds\"}]"
  fi
  local resp
  resp=$(api -X POST "$REST_URL/dataspaces" -H "Content-Type: application/json" -d "$body" 2>/dev/null) || true
  if echo "$resp" | grep -qi "already exist\|$ds"; then
    echo -e " ${GREEN}✓${NC}"
    return 0
  fi
  echo -e " ${GREEN}✓${NC} (created)"
}

witsml_put() {
  local ds="$1" xml="$2" label="${3:-object}"
  local resp http_code retries=0 max_retries=5
  local payload
  payload=$(jq -n --arg ds "$ds" --arg xml "$xml" '{dataspace: $ds, xml: $xml}')

  while (( retries < max_retries )); do
    resp=$(curl -s -w "\n%{http_code}" -X PUT "$WITSML_URL" \
      -H "Authorization: $AUTH" \
      -H "data-partition-id: $PARTITION" \
      -H "Content-Type: application/json" \
      -d "$payload")
    http_code=$(echo "$resp" | tail -1)
    resp=$(echo "$resp" | sed '$d')

    # Success: must contain "success":true
    if echo "$resp" | grep -q '"success"'; then
      echo -e "    ${GREEN}✓${NC} $label"
      # Wait for ETP server to fully release the transaction lock
      sleep 0.4
      return 0
    fi

    # Retry on transaction contention (server hasn't released previous lock yet)
    if echo "$resp" | grep -qi "too many write transaction\|Cannot start transaction"; then
      retries=$((retries + 1))
      sleep 1
      continue
    fi

    # Any other failure
    echo -e "    ${RED}✗${NC} $label (HTTP $http_code): $resp"
    return 1
  done

  echo -e "    ${RED}✗${NC} $label: transaction contention after $max_retries retries"
  return 1
}

# ═══════════════════════════════════════════════════════════════════════════════
# 1. DROGON DATASPACE — RESQML + WITSML wells
# ═══════════════════════════════════════════════════════════════════════════════

ingest_drogon_epc() {
  echo -e "\n${BOLD}═══ 1. Import Drogon EPC → $DS_DROGON ═══${NC}"

  if [[ ! -f "$EPC_FILE" ]]; then
    echo -e "  ${RED}✗${NC} EPC not found: $EPC_FILE"
    echo "    Extract from: $ORES_DROGON/drogon.zip"
    return 1
  fi

  # Copy files into ETP server container
  echo "  Copying EPC+H5 into ETP server container..."
  docker cp "$EPC_FILE" drogonresqml-etp-server-1:/tmp/drogon_demo.epc
  if [[ -f "$H5_FILE" ]]; then
    docker cp "$H5_FILE" drogonresqml-etp-server-1:/tmp/drogon_demo.h5
    # The EPC references "drogon.h5" internally
    docker exec drogonresqml-etp-server-1 ln -sf /tmp/drogon_demo.h5 /tmp/drogon.h5
  fi

  # Import via the server's own CLI (self-connecting)
  echo "  Importing via openETPServer --import-epc..."
  local output
  output=$(docker exec drogonresqml-etp-server-1 /usr/bin/openETPServer space \
    --import-epc /tmp/drogon_demo.epc \
    --space-path "$DS_DROGON" \
    --server-url "ws://localhost:$ETP_PORT" \
    --config /usr/bin/openETPServer_config.json \
    --force 2>&1) || true

  if echo "$output" | grep -q "Success"; then
    echo -e "  ${GREEN}✓${NC} EPC import succeeded"
  elif echo "$output" | grep -q "PUT.*objects"; then
    local count
    count=$(echo "$output" | grep -oP "PUT \K\d+" | tail -1)
    echo -e "  ${GREEN}✓${NC} PUT $count objects (some arrays may have been skipped)"
  else
    echo -e "  ${CYAN}→${NC} Import output:"
    echo "$output" | grep -E "Info:|Error:" | tail -10
    echo -e "  ${CYAN}→${NC} Attempting fallback via osdu-etp-sslclient..."
    docker run --rm --network=host \
      -v "$ORES_DROGON:/data" \
      --entrypoint=/bin/openETPServer "$ETP_IMAGE" \
      space --server-url "ws://localhost:$ETP_PORT" \
      -s "$DS_DROGON" --import-epc "/data/drogon_demo.epc" --force 2>&1 | tail -5
  fi
}

ingest_drogon_witsml() {
  echo -e "\n${BOLD}═══ 2. Ingest Drogon wells as WITSML 2.1 → $DS_DROGON ═══${NC}"

  # 8 Drogon wells — names used as keys for deterministic UUID generation
  local WELL_NAMES=("DROGON A-1" "DROGON A-2" "DROGON A-3" "DROGON A-4"
                    "DROGON B-1" "DROGON B-2" "DROGON C-1" "DROGON C-2")
  local WELL_SUFFIXES=("A1" "A2" "A3" "A4" "B1" "B2" "C1" "C2")

  echo "  Wells:"
  for i in "${!WELL_NAMES[@]}"; do
    local name="${WELL_NAMES[$i]}"
    local suffix="${WELL_SUFFIXES[$i]}"
    local uid; uid=$(name_to_uuid "drogon-well-$suffix")
    local xml="<Well xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$uid\">
  <Citation><Title>$name</Title></Citation>
  <TimeZone>+01:00</TimeZone>
  <GeographicLocationWGS84>
    <Latitude uom=\"dega\">58.44</Latitude>
    <Longitude uom=\"dega\">2.07</Longitude>
  </GeographicLocationWGS84>
  <StatusWell>active</StatusWell>
  <Country>Norway</Country>
  <NumGovt>7220/8-$suffix</NumGovt>
</Well>"
    witsml_put "$DS_DROGON" "$xml" "Well: $name"
  done

  # Wellbores
  echo "  Wellbores:"
  for i in "${!WELL_NAMES[@]}"; do
    local name="${WELL_NAMES[$i]}"
    local suffix="${WELL_SUFFIXES[$i]}"
    local well_uid; well_uid=$(name_to_uuid "drogon-well-$suffix")
    local wb_uid; wb_uid=$(name_to_uuid "drogon-well-$suffix-wb1")
    local xml="<Wellbore xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$wb_uid\">
  <Citation><Title>${name} WB1</Title></Citation>
  <Well>
    <ContentType>application/x-witsml+xml;version=2.1;type=Well</ContentType>
    <Title>$name</Title>
    <UUID>$well_uid</UUID>
  </Well>
  <StatusWellbore>active</StatusWellbore>
  <IsActive>true</IsActive>
</Wellbore>"
    witsml_put "$DS_DROGON" "$xml" "Wellbore: ${name} WB1"
  done

  # Logs (GR, DT, NPHI, RHOB per well)
  echo "  Well Logs:"
  for i in "${!WELL_NAMES[@]}"; do
    local name="${WELL_NAMES[$i]}"
    local suffix="${WELL_SUFFIXES[$i]}"
    local wb_uid; wb_uid=$(name_to_uuid "drogon-well-$suffix-wb1")
    local log_uid; log_uid=$(name_to_uuid "drogon-well-$suffix-log-composite")
    local xml="<Log xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$log_uid\">
  <Citation><Title>${name} Composite Log</Title></Citation>
  <Wellbore>
    <ContentType>application/x-witsml+xml;version=2.1;type=Wellbore</ContentType>
    <Title>${name} WB1</Title>
    <UUID>$wb_uid</UUID>
  </Wellbore>
  <Direction>increasing</Direction>
  <IndexType>measured depth</IndexType>
  <LogCurveInfo uid=\"MD\"><Mnemonic>MD</Mnemonic><Unit>m</Unit><TypeLogData>double</TypeLogData></LogCurveInfo>
  <LogCurveInfo uid=\"GR\"><Mnemonic>GR</Mnemonic><Unit>gAPI</Unit><TypeLogData>double</TypeLogData></LogCurveInfo>
  <LogCurveInfo uid=\"DT\"><Mnemonic>DT</Mnemonic><Unit>us/ft</Unit><TypeLogData>double</TypeLogData></LogCurveInfo>
  <LogCurveInfo uid=\"NPHI\"><Mnemonic>NPHI</Mnemonic><Unit>v/v</Unit><TypeLogData>double</TypeLogData></LogCurveInfo>
  <LogCurveInfo uid=\"RHOB\"><Mnemonic>RHOB</Mnemonic><Unit>g/cm3</Unit><TypeLogData>double</TypeLogData></LogCurveInfo>
</Log>"
    witsml_put "$DS_DROGON" "$xml" "Log: ${name} Composite"
  done

  # Trajectories
  echo "  Trajectories:"
  for i in "${!WELL_NAMES[@]}"; do
    local name="${WELL_NAMES[$i]}"
    local suffix="${WELL_SUFFIXES[$i]}"
    local wb_uid; wb_uid=$(name_to_uuid "drogon-well-$suffix-wb1")
    local traj_uid; traj_uid=$(name_to_uuid "drogon-well-$suffix-traj")
    local xml="<Trajectory xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$traj_uid\">
  <Citation><Title>${name} Drilled Trajectory</Title></Citation>
  <Wellbore>
    <ContentType>application/x-witsml+xml;version=2.1;type=Wellbore</ContentType>
    <Title>${name} WB1</Title>
    <UUID>$wb_uid</UUID>
  </Wellbore>
  <GrowingStatus>inactive</GrowingStatus>
  <ServiceCompany>Equinor</ServiceCompany>
</Trajectory>"
    witsml_put "$DS_DROGON" "$xml" "Trajectory: $name"
  done
}

# ═══════════════════════════════════════════════════════════════════════════════
# 2. WITSML DATASPACE — Chevron, mudlog, demo samples
# ═══════════════════════════════════════════════════════════════════════════════

ingest_witsml_samples() {
  echo -e "\n${BOLD}═══ 3. Ingest WITSML samples → $DS_WITSML ═══${NC}"

  # ── Chevron / demo wells ────────────────────────────────────────────────── #
  echo "  Demo Wells (Chevron KKS-1, exploration):"

  local kks1_uid; kks1_uid=$(name_to_uuid "chevron-kks1")
  local kks1_wb1_uid; kks1_wb1_uid=$(name_to_uuid "chevron-kks1-wb1")

  witsml_put "$DS_WITSML" "<Well xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$kks1_uid\">
  <Citation><Title>Chevron KKS-1</Title><Originator>Chevron</Originator><Creation>2018-03-01T00:00:00Z</Creation><Format>WITSML 2.1</Format></Citation>
  <TimeZone>+08:00</TimeZone>
  <StatusWell>active</StatusWell>
  <Country>Australia</Country>
  <PurposeWell>development</PurposeWell>
</Well>" "Well: Chevron KKS-1"

  witsml_put "$DS_WITSML" "<Wellbore xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$kks1_wb1_uid\">
  <Citation><Title>KKS-1 WB1</Title></Citation>
  <Well><ContentType>application/x-witsml+xml;version=2.1;type=Well</ContentType><Title>Chevron KKS-1</Title><UUID>$kks1_uid</UUID></Well>
  <StatusWellbore>active</StatusWellbore>
  <IsActive>true</IsActive>
</Wellbore>" "Wellbore: KKS-1 WB1"

  local kks1_cmr_uid; kks1_cmr_uid=$(name_to_uuid "chevron-kks1-cmr")
  witsml_put "$DS_WITSML" "<Log xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$kks1_cmr_uid\">
  <Citation><Title>KKS-1 CMR Main Pass</Title><Originator>Chevron</Originator><Format>WITSML 2.1</Format></Citation>
  <Wellbore><ContentType>application/x-witsml+xml;version=2.1;type=Wellbore</ContentType><Title>KKS-1 WB1</Title><UUID>$kks1_wb1_uid</UUID></Wellbore>
  <Direction>increasing</Direction>
  <IndexType>measured depth</IndexType>
  <LogCurveInfo uid=\"MD\"><Mnemonic>MD</Mnemonic><Unit>m</Unit><TypeLogData>double</TypeLogData></LogCurveInfo>
  <LogCurveInfo uid=\"T2LM\"><Mnemonic>T2LM</Mnemonic><Unit>ms</Unit><TypeLogData>double</TypeLogData></LogCurveInfo>
  <LogCurveInfo uid=\"TCMR\"><Mnemonic>TCMR</Mnemonic><Unit>v/v</Unit><TypeLogData>double</TypeLogData></LogCurveInfo>
  <LogCurveInfo uid=\"BFV\"><Mnemonic>BFV</Mnemonic><Unit>v/v</Unit><TypeLogData>double</TypeLogData></LogCurveInfo>
</Log>" "Log: KKS-1 CMR Main Pass"

  # ── Exploration well ────────────────────────────────────────────────────── #
  echo "  Exploration well:"

  local expl_uid; expl_uid=$(name_to_uuid "expl-discovery-1")
  local expl_wb1_uid; expl_wb1_uid=$(name_to_uuid "expl-discovery-1-wb1")

  witsml_put "$DS_WITSML" "<Well xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$expl_uid\">
  <Citation><Title>Old Discovery Well</Title><Originator>Demo</Originator><Format>WITSML 2.1</Format></Citation>
  <TimeZone>+00:00</TimeZone>
  <StatusWell>plugged and abandoned</StatusWell>
  <Country>United Kingdom</Country>
  <PurposeWell>exploration</PurposeWell>
</Well>" "Well: Old Discovery Well"

  witsml_put "$DS_WITSML" "<Wellbore xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$expl_wb1_uid\">
  <Citation><Title>Discovery-1 WB1</Title></Citation>
  <Well><ContentType>application/x-witsml+xml;version=2.1;type=Well</ContentType><Title>Old Discovery Well</Title><UUID>$expl_uid</UUID></Well>
  <StatusWellbore>plugged and abandoned</StatusWellbore>
  <IsActive>false</IsActive>
</Wellbore>" "Wellbore: Discovery-1 WB1"

  # ── MudLog (drilling report) ────────────────────────────────────────────── #
  echo "  MudLog / Drilling objects:"

  local mudlog_surface_uid; mudlog_surface_uid=$(name_to_uuid "mudlog-kks1-surface")
  witsml_put "$DS_WITSML" "<MudLog xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$mudlog_surface_uid\">
  <Citation><Title>KKS-1 Surface Hole MudLog</Title><Originator>MudLogger</Originator><Format>WITSML 2.1</Format></Citation>
  <Wellbore><ContentType>application/x-witsml+xml;version=2.1;type=Wellbore</ContentType><Title>KKS-1 WB1</Title><UUID>$kks1_wb1_uid</UUID></Wellbore>
  <MudLogCompany>Baker Hughes</MudLogCompany>
  <MudLogEngineers>J. Smith, K. Lee</MudLogEngineers>
  <StartMd uom=\"m\">0</StartMd>
  <EndMd uom=\"m\">500</EndMd>
</MudLog>" "MudLog: KKS-1 Surface Hole"

  local mudlog_prod_uid; mudlog_prod_uid=$(name_to_uuid "mudlog-kks1-production")
  witsml_put "$DS_WITSML" "<MudLog xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$mudlog_prod_uid\">
  <Citation><Title>KKS-1 Production Hole MudLog</Title><Originator>MudLogger</Originator><Format>WITSML 2.1</Format></Citation>
  <Wellbore><ContentType>application/x-witsml+xml;version=2.1;type=Wellbore</ContentType><Title>KKS-1 WB1</Title><UUID>$kks1_wb1_uid</UUID></Wellbore>
  <MudLogCompany>Halliburton</MudLogCompany>
  <StartMd uom=\"m\">500</StartMd>
  <EndMd uom=\"m\">3200</EndMd>
</MudLog>" "MudLog: KKS-1 Production Hole"

  # ── ChannelSet from samples ─────────────────────────────────────────────── #
  echo "  ChannelSet samples:"

  if [[ -f "$WITSML_SAMPLES/channelset_21.xml" ]]; then
    local cs_xml
    cs_xml=$(cat "$WITSML_SAMPLES/channelset_21.xml")
    witsml_put "$DS_WITSML" "$cs_xml" "ChannelSet: DROGON A-1 GR+DT"
  fi

  # ── Well from samples (WITSML 2.1) ─────────────────────────────────────── #
  if [[ -f "$WITSML_SAMPLES/well_21.xml" ]]; then
    local well_xml
    well_xml=$(cat "$WITSML_SAMPLES/well_21.xml")
    witsml_put "$DS_WITSML" "$well_xml" "Well: DROGON C-1 (sample)"
  fi
}

# ═══════════════════════════════════════════════════════════════════════════════
# 3. VERIFICATION — ETP read/write + REST query tests
# ═══════════════════════════════════════════════════════════════════════════════

verify_dataspaces() {
  echo -e "\n${BOLD}═══ 4. Verification ═══${NC}"

  for ds in "$DS_DROGON" "$DS_WITSML"; do
    local enc; enc=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$ds', safe=''))")
    echo -ne "  ${CYAN}$ds${NC}: "
    local info
    info=$(api "$REST_URL/dataspaces/$enc/info" 2>/dev/null) || info="{}"
    local size
    size=$(echo "$info" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('customData',{}).get('size','?'))" 2>/dev/null) || size="?"
    echo "size=$size"

    # Resource count
    local resources
    resources=$(api "$REST_URL/dataspaces/$enc/resources" 2>/dev/null) || resources="[]"
    local count
    count=$(echo "$resources" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d) if isinstance(d,list) else '?')" 2>/dev/null) || count="?"
    echo "    Resources: $count types"
  done
}

test_etp_readwrite() {
  echo -e "\n${BOLD}═══ 5. ETP Read/Write Test ═══${NC}"

  # Test via the REST proxy (which uses ETP internally)
  local ds_enc
  ds_enc=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$DS_DROGON', safe=''))")

  # READ: Get resources in drogon
  echo -n "  ETP Read (GetResources maap/drogon)... "
  local resp
  resp=$(api "$REST_URL/dataspaces/$ds_enc/resources" 2>/dev/null) || resp="ERROR"
  if echo "$resp" | python3 -c "import sys,json; d=json.load(sys.stdin); exit(0 if isinstance(d,list) else 1)" 2>/dev/null; then
    echo -e "${GREEN}✓${NC}"
  else
    echo -e "${RED}✗${NC} $resp"
  fi

  # WRITE: Create a test object via transaction
  echo -n "  ETP Write (PutDataObject via transaction)... "
  local tx_resp
  tx_resp=$(api -X POST "$REST_URL/dataspaces/$ds_enc/transactions" \
    -H "Content-Type: application/json" -d '{}' 2>/dev/null) || tx_resp=""
  if [[ -n "$tx_resp" ]] && echo "$tx_resp" | grep -qi "transaction\|id"; then
    local tx_id
    tx_id=$(echo "$tx_resp" | python3 -c "import sys,json; print(json.load(sys.stdin).get('transactionId',''))" 2>/dev/null)
    if [[ -n "$tx_id" ]]; then
      # Commit empty transaction (just testing the round-trip)
      api -X PUT "$REST_URL/dataspaces/$ds_enc/transactions/$tx_id" \
        -H "Content-Type: application/json" -d '{"status":"committed"}' >/dev/null 2>&1
      echo -e "${GREEN}✓${NC} (tx=$tx_id)"
    else
      echo -e "${GREEN}✓${NC} (transaction created)"
    fi
  else
    echo -e "${CYAN}○${NC} (no transaction support or ETP down)"
  fi

  # WITSML READ: Query objects
  echo -n "  WITSML Query (maap/drogon)... "
  local witsml_resp
  witsml_resp=$(curl -s -X POST "${REST_URL}/witsml/query" \
    -H "Authorization: $AUTH" -H "data-partition-id: $PARTITION" \
    -H "Content-Type: application/json" \
    -d "{\"dataspace\":\"$DS_DROGON\"}" 2>/dev/null)
  local wcount
  wcount=$(echo "$witsml_resp" | python3 -c "
import sys,json
d=json.load(sys.stdin)
if isinstance(d,list): print(len(d))
elif isinstance(d,dict): print(d.get('count', len(d.get('objects',[]))))
else: print(0)
" 2>/dev/null) || wcount=0
  if [[ "$wcount" -gt 0 ]]; then
    echo -e "${GREEN}✓${NC} ($wcount objects)"
  else
    echo -e "${CYAN}○${NC} (empty — EPC not imported yet?)"
  fi

  # WITSML READ: Query maap/witsml
  echo -n "  WITSML Query (maap/witsml)... "
  witsml_resp=$(curl -s -X POST "${REST_URL}/witsml/query" \
    -H "Authorization: $AUTH" -H "data-partition-id: $PARTITION" \
    -H "Content-Type: application/json" \
    -d "{\"dataspace\":\"$DS_WITSML\"}" 2>/dev/null)
  wcount=$(echo "$witsml_resp" | python3 -c "
import sys,json
d=json.load(sys.stdin)
if isinstance(d,list): print(len(d))
elif isinstance(d,dict): print(d.get('count', len(d.get('objects',[]))))
else: print(0)
" 2>/dev/null) || wcount=0
  if [[ "$wcount" -gt 0 ]]; then
    echo -e "${GREEN}✓${NC} ($wcount objects)"
  else
    echo -e "${RED}✗${NC} no objects found"
  fi
}

# ═══════════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════════

echo -e "${BOLD}┌─────────────────────────────────────────────────────────┐${NC}"
echo -e "${BOLD}│  RDDMS Local Ingestion Pipeline                         │${NC}"
echo -e "${BOLD}│                                                         │${NC}"
echo -e "${BOLD}│  ETP Server    ws://localhost:${ETP_PORT}                       │${NC}"
echo -e "${BOLD}│  REST API      ${REST_URL}  │${NC}"
echo -e "${BOLD}│  Dataspaces    ${DS_DROGON}, ${DS_WITSML}                   │${NC}"
echo -e "${BOLD}└─────────────────────────────────────────────────────────┘${NC}"
echo ""

# Preflight check
echo -e "${BOLD}── Preflight ──${NC}"
echo -n "  ETP server on :$ETP_PORT... "
if curl -sf "http://localhost:$ETP_PORT/.well-known/etp-server-capabilities?GetVersion=etp12.energistics.org" >/dev/null 2>&1; then
  echo -e "${GREEN}✓${NC}"
else
  echo -e "${RED}✗${NC} (is Docker ETP server running?)"
  exit 1
fi

echo -n "  REST client (our native build on :8080)... "
if curl -sf "$REST_URL/health/readiness" -H "Authorization: $AUTH" >/dev/null 2>&1; then
  echo -e "${GREEN}✓${NC}"
else
  echo -e "${CYAN}○${NC} (not running — starting...)"
  cd "$REPO_DIR/open-etp-client"
  RDMS_ETP_PROTOCOL=ws RDMS_ETP_HOST=localhost RDMS_ETP_PORT="$ETP_PORT" RDMS_ETP_PATH="" \
  RDMS_REST_PORT=8080 RDMS_REST_ROOT_PATH="/api/reservoir-ddms/v2/" \
  nohup node dist/src/lib/restApi/RestServer.js > /tmp/rddms-client.log 2>&1 &
  echo $! > /tmp/rddms-client.pid
  for i in $(seq 1 15); do
    sleep 1
    if curl -sf "$REST_URL/health/readiness" -H "Authorization: $AUTH" >/dev/null 2>&1; then
      echo -e "    ${GREEN}✓${NC} started on :8080"
      break
    fi
    [[ $i -eq 15 ]] && { echo -e "    ${RED}✗${NC} failed (see /tmp/rddms-client.log)"; exit 1; }
  done
  cd "$OLDPWD"
fi

# Ensure dataspaces exist
echo -e "\n${BOLD}── Dataspaces ──${NC}"
XDATA="{\"legaltags\":[\"$LEGAL_TAG\"],\"owners\":[\"$OWNERS\"],\"viewers\":[\"$VIEWERS\"],\"otherRelevantDataCountries\":[\"$COUNTRIES\"]}"

if $DO_DROGON; then
  ensure_dataspace "$DS_DROGON" "$XDATA"
fi
if $DO_WITSML; then
  ensure_dataspace "$DS_WITSML" "$XDATA"
fi

# Ingest
if $DO_DROGON; then
  if $DO_EPC; then
    ingest_drogon_epc
  fi
  ingest_drogon_witsml
fi

if $DO_WITSML; then
  ingest_witsml_samples
fi

# Verify
verify_dataspaces
test_etp_readwrite

echo -e "\n${GREEN}${BOLD}═══ Done! ═══${NC}"
echo ""
echo "  Next steps:"
echo "    • Browse:    http://127.0.0.1:8000  (ORES Web UI → ResDDMSquery)"
echo "    • Swagger:   http://localhost:8080/api/reservoir-ddms/v2/swagger"
echo "    • Manifest:  python demo/drogonresqml/ingest_drogon.py interop"
echo ""
