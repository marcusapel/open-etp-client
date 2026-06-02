#!/usr/bin/env bash
# Ingest Drogon wells and logs as WITSML 2.1 into maap/witsml dataspace
set -euo pipefail

API="http://localhost:8080/api/reservoir-ddms/v2/witsml/store"
DS="maap/witsml"

# ─── Drogon Wells ─────────────────────────────────────────────────────────── #
# 8 wells: A-1..A-4, B-1..B-2, C-1..C-2

declare -A WELLS=(
  ["drogon-well-A1"]="DROGON A-1"
  ["drogon-well-A2"]="DROGON A-2"
  ["drogon-well-A3"]="DROGON A-3"
  ["drogon-well-A4"]="DROGON A-4"
  ["drogon-well-B1"]="DROGON B-1"
  ["drogon-well-B2"]="DROGON B-2"
  ["drogon-well-C1"]="DROGON C-1"
  ["drogon-well-C2"]="DROGON C-2"
)

echo "=== Ingesting Drogon Wells into $DS ==="

for uid in "${!WELLS[@]}"; do
  name="${WELLS[$uid]}"
  xml="<Well xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$uid\">
  <Citation><Title>$name</Title></Citation>
  <TimeZone>+01:00</TimeZone>
  <GeographicLocationWGS84>
    <Latitude uom=\"dega\">58.44</Latitude>
    <Longitude uom=\"dega\">2.07</Longitude>
  </GeographicLocationWGS84>
  <StatusWell>active</StatusWell>
</Well>"

  echo -n "  PUT $name..."
  resp=$(curl -s -X PUT "$API" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg ds "$DS" --arg xml "$xml" '{dataspace: $ds, xml: $xml}')")
  echo " $resp"
done

# ─── Drogon Wellbores ─────────────────────────────────────────────────────── #

echo ""
echo "=== Ingesting Drogon Wellbores ==="

for uid in "${!WELLS[@]}"; do
  name="${WELLS[$uid]}"
  wb_uid="${uid}-wb1"
  wb_name="${name} WB1"
  xml="<Wellbore xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$wb_uid\">
  <Citation><Title>$wb_name</Title></Citation>
  <Well>
    <ContentType>application/x-witsml+xml;version=2.1;type=Well</ContentType>
    <Title>$name</Title>
    <UUID>$uid</UUID>
  </Well>
  <StatusWellbore>active</StatusWellbore>
  <IsActive>true</IsActive>
</Wellbore>"

  echo -n "  PUT $wb_name..."
  resp=$(curl -s -X PUT "$API" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg ds "$DS" --arg xml "$xml" '{dataspace: $ds, xml: $xml}')")
  echo " $resp"
done

# ─── Drogon Well Logs ─────────────────────────────────────────────────────── #

echo ""
echo "=== Ingesting Drogon Well Logs (GR, RHOB, NPHI, DT) with channel data ==="

# Generate realistic log data: 50 samples per well, MD from 1000-1024.5m
generate_logdata() {
  local seed=$1
  local rows=""
  for i in $(seq 0 49); do
    local md=$(echo "1000.0 + $i * 0.5" | bc)
    # Pseudo-random variations using seed
    local gr=$(echo "45 + ($seed + $i * 7) % 40" | bc)
    local rhob=$(echo "scale=2; 2.20 + ($seed + $i * 3) % 30 / 100" | bc)
    local nphi=$(echo "scale=3; 0.150 + ($seed + $i * 11) % 100 / 1000" | bc)
    local dt=$(echo "scale=1; 85.0 + ($seed + $i * 5) % 35" | bc)
    rows="$rows    <data>$md, $gr, $rhob, $nphi, $dt</data>\n"
  done
  echo "$rows"
}

WELL_SEED=0
for uid in "${!WELLS[@]}"; do
  name="${WELLS[$uid]}"
  wb_uid="${uid}-wb1"
  log_uid="${uid}-log-composite"
  log_name="${name} Composite Log"
  WELL_SEED=$((WELL_SEED + 13))

  logdata=$(generate_logdata $WELL_SEED)

  xml="<Log xmlns=\"http://www.energistics.org/energyml/data/witsmlv2\" schemaVersion=\"2.1\" uuid=\"$log_uid\">
  <Citation><Title>$log_name</Title></Citation>
  <Wellbore>
    <ContentType>application/x-witsml+xml;version=2.1;type=Wellbore</ContentType>
    <Title>${name} WB1</Title>
    <UUID>$wb_uid</UUID>
  </Wellbore>
  <Direction>increasing</Direction>
  <IndexType>measured depth</IndexType>
  <LogCurveInfo uid=\"MD\">
    <Mnemonic>MD</Mnemonic>
    <Unit>m</Unit>
    <CurveDescription>Measured Depth</CurveDescription>
    <TypeLogData>double</TypeLogData>
  </LogCurveInfo>
  <LogCurveInfo uid=\"GR\">
    <Mnemonic>GR</Mnemonic>
    <Unit>gAPI</Unit>
    <CurveDescription>Gamma Ray</CurveDescription>
    <TypeLogData>double</TypeLogData>
  </LogCurveInfo>
  <LogCurveInfo uid=\"RHOB\">
    <Mnemonic>RHOB</Mnemonic>
    <Unit>g/cm3</Unit>
    <CurveDescription>Bulk Density</CurveDescription>
    <TypeLogData>double</TypeLogData>
  </LogCurveInfo>
  <LogCurveInfo uid=\"NPHI\">
    <Mnemonic>NPHI</Mnemonic>
    <Unit>v/v</Unit>
    <CurveDescription>Neutron Porosity</CurveDescription>
    <TypeLogData>double</TypeLogData>
  </LogCurveInfo>
  <LogCurveInfo uid=\"DT\">
    <Mnemonic>DT</Mnemonic>
    <Unit>us/ft</Unit>
    <CurveDescription>Sonic Transit Time</CurveDescription>
    <TypeLogData>double</TypeLogData>
  </LogCurveInfo>
  <logData>
$(echo -e "$logdata")  </logData>
</Log>"

  echo -n "  PUT $log_name (50 samples × 5 channels)..."
  resp=$(curl -s -X PUT "$API" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg ds "$DS" --arg xml "$xml" '{dataspace: $ds, xml: $xml}')")
  echo " $resp"
done

echo ""
echo "=== Done! Verify with: ==="
echo "  curl -s http://localhost:8080/api/reservoir-ddms/v2/witsml/query -H 'Content-Type: application/json' -d '{\"dataspace\":\"maap/witsml\"}' | jq ."
echo "  # Check arrays stored:"
echo "  curl -s http://localhost:8080/api/reservoir-ddms/v2/dataspaces/maap%2Fwitsml/resources/witsml21.Log/{uuid}/arrays"
