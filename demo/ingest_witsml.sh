#!/usr/bin/env bash
# ============================================================================
# Ingest WITSML 2.1 demo data into both maap/drogon and maap/witsml dataspaces
# Covers: Wells, Wellbores, Logs (with channel arrays), Trajectories (with arrays)
# ============================================================================
set -euo pipefail

BASE="http://localhost:8080/api/reservoir-ddms/v2"
HEADERS='-H "Content-Type: application/json" -H "data-partition-id: rddms" -H "Authorization: Bearer test"'

put_witsml() {
  local ds="$1" xml="$2"
  local resp
  resp=$(curl -s -X PUT "$BASE/witsml/store" \
    -H "Content-Type: application/json" \
    -H "data-partition-id: rddms" \
    -H "Authorization: Bearer test" \
    -d "$(jq -n --arg ds "$ds" --arg xml "$xml" '{dataspace: $ds, xml: $xml}')")
  echo "  $resp"
}

echo "═══════════════════════════════════════════════════════════════"
echo "  WITSML Demo Data Ingestion"
echo "═══════════════════════════════════════════════════════════════"

# ─── MAAP/DROGON: Wells (complement existing RESQML data) ────────────────────
echo ""
echo "── maap/drogon: Wells ──"

put_witsml "maap/drogon" '<?xml version="1.0" encoding="utf-8"?>
<Well xmlns="http://www.energistics.org/energyml/data/witsmlv2"
      xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
      schemaVersion="2.1" uuid="d1a1b1c1-1111-4111-a111-111111111111">
  <eml:Citation>
    <eml:Title>DROGON A-1</eml:Title>
    <eml:Originator>Equinor</eml:Originator>
    <eml:Creation>2019-01-15T00:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <TimeZone>+01:00</TimeZone>
  <GeographicLocationWGS84><Latitude uom="dega">58.44</Latitude><Longitude uom="dega">2.07</Longitude></GeographicLocationWGS84>
  <StatusWell>active</StatusWell>
  <Country>Norway</Country>
  <NumGovt>7220/8-1</NumGovt>
</Well>'

put_witsml "maap/drogon" '<?xml version="1.0" encoding="utf-8"?>
<Well xmlns="http://www.energistics.org/energyml/data/witsmlv2"
      xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
      schemaVersion="2.1" uuid="d1a1b1c1-2222-4222-a222-222222222222">
  <eml:Citation>
    <eml:Title>DROGON A-2</eml:Title>
    <eml:Originator>Equinor</eml:Originator>
    <eml:Creation>2019-03-01T00:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <TimeZone>+01:00</TimeZone>
  <GeographicLocationWGS84><Latitude uom="dega">58.445</Latitude><Longitude uom="dega">2.075</Longitude></GeographicLocationWGS84>
  <StatusWell>active</StatusWell>
  <Country>Norway</Country>
  <NumGovt>7220/8-2</NumGovt>
</Well>'

put_witsml "maap/drogon" '<?xml version="1.0" encoding="utf-8"?>
<Well xmlns="http://www.energistics.org/energyml/data/witsmlv2"
      xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
      schemaVersion="2.1" uuid="d1a1b1c1-3333-4333-a333-333333333333">
  <eml:Citation>
    <eml:Title>DROGON C-1</eml:Title>
    <eml:Originator>Equinor</eml:Originator>
    <eml:Creation>2020-06-01T00:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <TimeZone>+01:00</TimeZone>
  <GeographicLocationWGS84><Latitude uom="dega">58.435</Latitude><Longitude uom="dega">2.065</Longitude></GeographicLocationWGS84>
  <StatusWell>active</StatusWell>
  <Country>Norway</Country>
  <NumGovt>7220/8-C1</NumGovt>
</Well>'

# ─── MAAP/WITSML: Full dataset (Wells + Logs + Trajectories + Arrays) ────────
echo ""
echo "── maap/witsml: Wells ──"

put_witsml "maap/witsml" '<?xml version="1.0" encoding="utf-8"?>
<Well xmlns="http://www.energistics.org/energyml/data/witsmlv2"
      xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
      schemaVersion="2.1" uuid="w0000001-aaaa-4aaa-aaaa-aaaaaaaaaaaa">
  <eml:Citation>
    <eml:Title>DROGON A-1</eml:Title>
    <eml:Originator>Equinor</eml:Originator>
    <eml:Creation>2019-01-15T00:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <TimeZone>+01:00</TimeZone>
  <GeographicLocationWGS84><Latitude uom="dega">58.44</Latitude><Longitude uom="dega">2.07</Longitude></GeographicLocationWGS84>
  <StatusWell>active</StatusWell>
  <PurposeWell>exploration</PurposeWell>
  <Country>Norway</Country>
  <Field>Drogon</Field>
  <Operator>Equinor</Operator>
  <NumGovt>7220/8-1</NumGovt>
</Well>'

put_witsml "maap/witsml" '<?xml version="1.0" encoding="utf-8"?>
<Well xmlns="http://www.energistics.org/energyml/data/witsmlv2"
      xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
      schemaVersion="2.1" uuid="w0000002-bbbb-4bbb-bbbb-bbbbbbbbbbbb">
  <eml:Citation>
    <eml:Title>DROGON A-2</eml:Title>
    <eml:Originator>Equinor</eml:Originator>
    <eml:Creation>2019-03-01T00:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <TimeZone>+01:00</TimeZone>
  <GeographicLocationWGS84><Latitude uom="dega">58.445</Latitude><Longitude uom="dega">2.075</Longitude></GeographicLocationWGS84>
  <StatusWell>active</StatusWell>
  <PurposeWell>development</PurposeWell>
  <Country>Norway</Country>
  <Field>Drogon</Field>
  <Operator>Equinor</Operator>
  <NumGovt>7220/8-2</NumGovt>
</Well>'

put_witsml "maap/witsml" '<?xml version="1.0" encoding="utf-8"?>
<Well xmlns="http://www.energistics.org/energyml/data/witsmlv2"
      xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
      schemaVersion="2.1" uuid="w0000003-cccc-4ccc-cccc-cccccccccccc">
  <eml:Citation>
    <eml:Title>DROGON B-1</eml:Title>
    <eml:Originator>Equinor</eml:Originator>
    <eml:Creation>2020-02-15T00:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <TimeZone>+01:00</TimeZone>
  <GeographicLocationWGS84><Latitude uom="dega">58.43</Latitude><Longitude uom="dega">2.08</Longitude></GeographicLocationWGS84>
  <StatusWell>active</StatusWell>
  <PurposeWell>appraisal</PurposeWell>
  <Country>Norway</Country>
  <Field>Drogon</Field>
  <Operator>Equinor</Operator>
  <NumGovt>7220/8-B1</NumGovt>
</Well>'

# ─── Logs with channel data arrays ───────────────────────────────────────────
echo ""
echo "── maap/witsml: Logs with arrays ──"

# Log 1: DROGON A-1 Composite (GR, DT, NPHI, RHOB — 20 depth samples)
put_witsml "maap/witsml" '<?xml version="1.0" encoding="utf-8"?>
<Log xmlns="http://www.energistics.org/energyml/data/witsmlv2"
     xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
     schemaVersion="2.1" uuid="10000001-1111-4111-b111-111111111111">
  <eml:Citation>
    <eml:Title>DROGON A-1 Composite Log</eml:Title>
    <eml:Originator>Equinor</eml:Originator>
    <eml:Creation>2019-06-01T00:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <ChannelSet>
    <Index><IndexType>measured depth</IndexType><Direction>increasing</Direction><Mnemonic>DEPTH</Mnemonic><Uom>m</Uom></Index>
    <Channel><Mnemonic>GR</Mnemonic><Uom>gAPI</Uom><DataType>double</DataType></Channel>
    <Channel><Mnemonic>DT</Mnemonic><Uom>us/ft</Uom><DataType>double</DataType></Channel>
    <Channel><Mnemonic>NPHI</Mnemonic><Uom>v/v</Uom><DataType>double</DataType></Channel>
    <Channel><Mnemonic>RHOB</Mnemonic><Uom>g/cm3</Uom><DataType>double</DataType></Channel>
    <logData>
      <data>1000.0,45.2,105.3,0.18,2.35</data>
      <data>1001.0,47.1,103.8,0.19,2.38</data>
      <data>1002.0,52.3,98.2,0.22,2.42</data>
      <data>1003.0,48.7,101.5,0.20,2.37</data>
      <data>1004.0,55.9,95.4,0.24,2.45</data>
      <data>1005.0,62.1,92.7,0.26,2.48</data>
      <data>1006.0,58.4,94.1,0.25,2.46</data>
      <data>1007.0,51.2,99.8,0.21,2.40</data>
      <data>1008.0,44.8,106.2,0.17,2.33</data>
      <data>1009.0,39.5,110.5,0.15,2.30</data>
      <data>1010.0,42.3,108.1,0.16,2.32</data>
      <data>1011.0,50.6,100.4,0.21,2.39</data>
      <data>1012.0,68.2,88.9,0.28,2.52</data>
      <data>1013.0,75.4,84.2,0.31,2.56</data>
      <data>1014.0,71.8,86.5,0.29,2.54</data>
      <data>1015.0,65.3,90.1,0.27,2.50</data>
      <data>1016.0,58.7,94.8,0.24,2.46</data>
      <data>1017.0,52.1,99.3,0.22,2.41</data>
      <data>1018.0,46.9,103.1,0.19,2.37</data>
      <data>1019.0,43.5,105.9,0.17,2.34</data>
    </logData>
  </ChannelSet>
</Log>'

# Log 2: DROGON A-2 Gamma Ray (single curve, 15 samples)
put_witsml "maap/witsml" '<?xml version="1.0" encoding="utf-8"?>
<Log xmlns="http://www.energistics.org/energyml/data/witsmlv2"
     xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
     schemaVersion="2.1" uuid="10000002-2222-4222-b222-222222222222">
  <eml:Citation>
    <eml:Title>DROGON A-2 GR Log</eml:Title>
    <eml:Originator>Equinor</eml:Originator>
    <eml:Creation>2019-08-15T00:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <ChannelSet>
    <Index><IndexType>measured depth</IndexType><Direction>increasing</Direction><Mnemonic>DEPTH</Mnemonic><Uom>m</Uom></Index>
    <Channel><Mnemonic>GR</Mnemonic><Uom>gAPI</Uom><DataType>double</DataType></Channel>
    <logData>
      <data>800.0,35.2</data>
      <data>801.0,38.6</data>
      <data>802.0,42.1</data>
      <data>803.0,55.8</data>
      <data>804.0,63.4</data>
      <data>805.0,71.2</data>
      <data>806.0,68.9</data>
      <data>807.0,59.3</data>
      <data>808.0,48.7</data>
      <data>809.0,41.5</data>
      <data>810.0,37.8</data>
      <data>811.0,44.2</data>
      <data>812.0,52.6</data>
      <data>813.0,61.1</data>
      <data>814.0,57.4</data>
    </logData>
  </ChannelSet>
</Log>'

# Log 3: DROGON B-1 Density-Porosity (RHOB, NPHI — 12 samples)
put_witsml "maap/witsml" '<?xml version="1.0" encoding="utf-8"?>
<Log xmlns="http://www.energistics.org/energyml/data/witsmlv2"
     xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
     schemaVersion="2.1" uuid="10000003-3333-4333-b333-333333333333">
  <eml:Citation>
    <eml:Title>DROGON B-1 Density-Porosity Log</eml:Title>
    <eml:Originator>Equinor</eml:Originator>
    <eml:Creation>2020-05-20T00:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <ChannelSet>
    <Index><IndexType>measured depth</IndexType><Direction>increasing</Direction><Mnemonic>DEPTH</Mnemonic><Uom>m</Uom></Index>
    <Channel><Mnemonic>RHOB</Mnemonic><Uom>g/cm3</Uom><DataType>double</DataType></Channel>
    <Channel><Mnemonic>NPHI</Mnemonic><Uom>v/v</Uom><DataType>double</DataType></Channel>
    <logData>
      <data>1500.0,2.31,0.18</data>
      <data>1501.0,2.35,0.16</data>
      <data>1502.0,2.42,0.14</data>
      <data>1503.0,2.55,0.09</data>
      <data>1504.0,2.61,0.06</data>
      <data>1505.0,2.58,0.07</data>
      <data>1506.0,2.48,0.11</data>
      <data>1507.0,2.39,0.15</data>
      <data>1508.0,2.34,0.17</data>
      <data>1509.0,2.32,0.18</data>
      <data>1510.0,2.36,0.16</data>
      <data>1511.0,2.44,0.12</data>
    </logData>
  </ChannelSet>
</Log>'

# ─── Trajectories with station arrays ────────────────────────────────────────
echo ""
echo "── maap/witsml: Trajectories with arrays ──"

put_witsml "maap/witsml" '<?xml version="1.0" encoding="utf-8"?>
<Trajectory xmlns="http://www.energistics.org/energyml/data/witsmlv2"
            xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
            schemaVersion="2.1" uuid="t0000001-1111-4111-c111-111111111111">
  <eml:Citation>
    <eml:Title>DROGON A-1 Drilled Trajectory</eml:Title>
    <eml:Originator>Equinor</eml:Originator>
    <eml:Creation>2019-04-20T00:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <trajectoryStation uid="ts-001"><md uom="m">0</md><incl uom="deg">0</incl><azi uom="deg">0</azi></trajectoryStation>
  <trajectoryStation uid="ts-002"><md uom="m">250</md><incl uom="deg">1.2</incl><azi uom="deg">135</azi></trajectoryStation>
  <trajectoryStation uid="ts-003"><md uom="m">500</md><incl uom="deg">5.8</incl><azi uom="deg">138</azi></trajectoryStation>
  <trajectoryStation uid="ts-004"><md uom="m">750</md><incl uom="deg">12.4</incl><azi uom="deg">140</azi></trajectoryStation>
  <trajectoryStation uid="ts-005"><md uom="m">1000</md><incl uom="deg">25.6</incl><azi uom="deg">142</azi></trajectoryStation>
  <trajectoryStation uid="ts-006"><md uom="m">1250</md><incl uom="deg">42.1</incl><azi uom="deg">139</azi></trajectoryStation>
  <trajectoryStation uid="ts-007"><md uom="m">1500</md><incl uom="deg">58.7</incl><azi uom="deg">137</azi></trajectoryStation>
  <trajectoryStation uid="ts-008"><md uom="m">1750</md><incl uom="deg">72.3</incl><azi uom="deg">140</azi></trajectoryStation>
  <trajectoryStation uid="ts-009"><md uom="m">2000</md><incl uom="deg">82.5</incl><azi uom="deg">141</azi></trajectoryStation>
  <trajectoryStation uid="ts-010"><md uom="m">2250</md><incl uom="deg">88.1</incl><azi uom="deg">140</azi></trajectoryStation>
</Trajectory>'

put_witsml "maap/witsml" '<?xml version="1.0" encoding="utf-8"?>
<Trajectory xmlns="http://www.energistics.org/energyml/data/witsmlv2"
            xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
            schemaVersion="2.1" uuid="t0000002-2222-4222-c222-222222222222">
  <eml:Citation>
    <eml:Title>DROGON A-2 Drilled Trajectory</eml:Title>
    <eml:Originator>Equinor</eml:Originator>
    <eml:Creation>2019-09-10T00:00:00Z</eml:Creation>
    <eml:Format>WITSML 2.1</eml:Format>
  </eml:Citation>
  <trajectoryStation uid="ts-001"><md uom="m">0</md><incl uom="deg">0</incl><azi uom="deg">0</azi></trajectoryStation>
  <trajectoryStation uid="ts-002"><md uom="m">300</md><incl uom="deg">2.5</incl><azi uom="deg">225</azi></trajectoryStation>
  <trajectoryStation uid="ts-003"><md uom="m">600</md><incl uom="deg">8.3</incl><azi uom="deg">220</azi></trajectoryStation>
  <trajectoryStation uid="ts-004"><md uom="m">900</md><incl uom="deg">18.7</incl><azi uom="deg">218</azi></trajectoryStation>
  <trajectoryStation uid="ts-005"><md uom="m">1200</md><incl uom="deg">35.4</incl><azi uom="deg">222</azi></trajectoryStation>
  <trajectoryStation uid="ts-006"><md uom="m">1500</md><incl uom="deg">55.2</incl><azi uom="deg">220</azi></trajectoryStation>
  <trajectoryStation uid="ts-007"><md uom="m">1800</md><incl uom="deg">70.8</incl><azi uom="deg">219</azi></trajectoryStation>
  <trajectoryStation uid="ts-008"><md uom="m">2100</md><incl uom="deg">85.1</incl><azi uom="deg">221</azi></trajectoryStation>
</Trajectory>'

# ─── Also ingest the 1.4.1 demos (tests container splitting) ────────────────
echo ""
echo "── maap/witsml: WITSML 1.4.1 container ingestion ──"

echo "  Ingesting wells_141.xml (container with 2 wells)..."
put_witsml "maap/witsml" "$(cat /home/maap/rddms/demo/witsml-samples/wells_141.xml)"

echo "  Ingesting log_141.xml (container with 1 log + arrays)..."
put_witsml "maap/witsml" "$(cat /home/maap/rddms/demo/witsml-samples/log_141.xml)"

echo "  Ingesting trajectory_141.xml (container with 1 trajectory + arrays)..."
put_witsml "maap/witsml" "$(cat /home/maap/rddms/demo/witsml-samples/trajectory_141.xml)"

echo "  Ingesting channelset_21.xml (WITSML 2.1 ChannelSet)..."
put_witsml "maap/witsml" "$(cat /home/maap/rddms/demo/witsml-samples/channelset_21.xml)"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "  Ingestion complete!"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Verify with:"
echo "  curl -s '$BASE/witsml/maap%2Fwitsml/objects' -H 'data-partition-id: rddms' -H 'Authorization: Bearer test' | jq '.objects[] | {name, objectType}'"
