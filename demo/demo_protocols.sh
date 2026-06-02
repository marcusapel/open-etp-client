#!/usr/bin/env bash
# ============================================================================
# Demo: ETP Protocol Capabilities
#
# Demonstrates the additional ETP 1.2 protocols added for OSDU interoperability:
#   - DiscoveryQuery (Protocol 13) – resource enumeration + filtering
#   - StoreQuery (Protocol 14) – bulk object retrieval
#   - GrowingObject (Protocol 6) – well log parts by range
#   - ChannelSubscribe (Protocol 21) – channel metadata + real-time streaming
#
# Prerequisites:
#   - ETP server running on localhost:9002
#   - REST client running on localhost:3000 (or set CLIENT_URL)
#   - At least one dataspace with data (e.g., maap/drogon)
#
# Usage:
#   ./demo/demo_protocols.sh [CLIENT_URL] [DATASPACE]
# ============================================================================

set -euo pipefail

CLIENT_URL="${1:-http://localhost:3000/api/reservoir-ddms/v2}"
DATASPACE="${2:-maap/drogon}"
AUTH="Bearer dummy"
PARTITION="opendes"

echo "┌─────────────────────────────────────────────────────────────┐"
echo "│  ETP 1.2 Protocol Demo                                      │"
echo "│  Client: $CLIENT_URL"
echo "│  Dataspace: $DATASPACE"
echo "└─────────────────────────────────────────────────────────────┘"
echo

# ── 1. DiscoveryQuery: Find all resources in a dataspace ──────────────────────

echo "═══ 1. DiscoveryQuery: Find resources in dataspace ═══"
echo "POST /query/resources/find"
echo

RESULT=$(curl -s -X POST "$CLIENT_URL/query/resources/find" \
  -H "Authorization: $AUTH" \
  -H "data-partition-id: $PARTITION" \
  -H "Content-Type: application/json" \
  -d "{
    \"uri\": \"eml:///dataspace('$DATASPACE')\",
    \"scope\": \"targets\",
    \"depth\": 1
  }")

echo "$RESULT" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if isinstance(data, list):
    print(f'  Found {len(data)} resources')
    for r in data[:5]:
        print(f'    {r.get(\"name\",\"?\")} [{r.get(\"uri\",\"?\").split(\".\")[-1][:50]}]')
    if len(data) > 5:
        print(f'    ... and {len(data)-5} more')
else:
    print(f'  Response: {json.dumps(data)[:200]}')
" 2>/dev/null || echo "  Response: $RESULT"

echo

# ── 2. DiscoveryQuery: Filter by type ────────────────────────────────────────

echo "═══ 2. DiscoveryQuery: Filter by object type ═══"
echo "POST /query/resources/find (type=resqml22.TriangulatedSetRepresentation)"
echo

RESULT=$(curl -s -X POST "$CLIENT_URL/query/resources/find" \
  -H "Authorization: $AUTH" \
  -H "data-partition-id: $PARTITION" \
  -H "Content-Type: application/json" \
  -d "{
    \"uri\": \"eml:///dataspace('$DATASPACE')\",
    \"scope\": \"targets\",
    \"depth\": 1,
    \"dataObjectTypes\": [\"resqml22.TriangulatedSetRepresentation\"]
  }")

echo "$RESULT" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if isinstance(data, list):
    print(f'  Found {len(data)} TriangulatedSetRepresentations')
    for r in data[:3]:
        print(f'    {r.get(\"name\",\"?\")}')
else:
    print(f'  Response: {json.dumps(data)[:200]}')
" 2>/dev/null || echo "  Response: $RESULT"

echo

# ── 3. StoreQuery: Retrieve objects with content ─────────────────────────────

echo "═══ 3. StoreQuery: Retrieve objects with XML content ═══"
echo "POST /query/objects/find"
echo

RESULT=$(curl -s -X POST "$CLIENT_URL/query/objects/find" \
  -H "Authorization: $AUTH" \
  -H "data-partition-id: $PARTITION" \
  -H "Content-Type: application/json" \
  -d "{
    \"uri\": \"eml:///dataspace('$DATASPACE')\",
    \"scope\": \"targets\",
    \"depth\": 1,
    \"dataObjectTypes\": [\"eml23.DataAssurance\"]
  }")

echo "$RESULT" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if isinstance(data, list):
    print(f'  Retrieved {len(data)} objects with content')
    for o in data[:2]:
        xml = o.get('data','') or ''
        print(f'    {o.get(\"name\",\"?\")} ({len(xml)} bytes XML)')
        if xml:
            print(f'      {xml[:120]}...')
else:
    print(f'  Response: {json.dumps(data)[:200]}')
" 2>/dev/null || echo "  Response: $RESULT"

echo

# ── 4. DiscoveryQuery: Modified since filter ─────────────────────────────────

echo "═══ 4. DiscoveryQuery: Resources modified in last 24h ═══"
echo "POST /query/resources/find (modifiedSince=yesterday)"
echo

YESTERDAY=$(date -u -d "yesterday" +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -v-1d +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || echo "2026-06-01T00:00:00Z")

RESULT=$(curl -s -X POST "$CLIENT_URL/query/resources/find" \
  -H "Authorization: $AUTH" \
  -H "data-partition-id: $PARTITION" \
  -H "Content-Type: application/json" \
  -d "{
    \"uri\": \"eml:///dataspace('$DATASPACE')\",
    \"scope\": \"targets\",
    \"depth\": 1,
    \"modifiedSince\": \"$YESTERDAY\"
  }")

echo "$RESULT" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if isinstance(data, list):
    print(f'  {len(data)} resources modified since yesterday')
else:
    print(f'  Response: {json.dumps(data)[:200]}')
" 2>/dev/null || echo "  Response: $RESULT"

echo

# ── 5. GrowingObject: Parts metadata ────────────────────────────────────────

echo "═══ 5. GrowingObject: Well log parts metadata ═══"
echo "POST /query/growing/metadata"
echo

# Find a WellLog first
WELLLOG_URI=$(echo "$RESULT" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if isinstance(data, list):
    for r in data:
        if 'WellLog' in r.get('uri','') or 'Log' in r.get('uri',''):
            print(r['uri'])
            sys.exit(0)
print('')
" 2>/dev/null)

if [ -n "$WELLLOG_URI" ]; then
  RESULT=$(curl -s -X POST "$CLIENT_URL/query/growing/metadata" \
    -H "Authorization: $AUTH" \
    -H "data-partition-id: $PARTITION" \
    -H "Content-Type: application/json" \
    -d "{\"uri\": \"$WELLLOG_URI\"}")
  echo "  URI: $WELLLOG_URI"
  echo "  $RESULT" | head -5
else
  echo "  (No WellLog found in dataspace — skipping)"
fi

echo

# ── 6. ChannelSubscribe: Channel metadata ────────────────────────────────────

echo "═══ 6. ChannelSubscribe: Channel (curve) metadata ═══"
echo "POST /query/channels/metadata"
echo

if [ -n "$WELLLOG_URI" ]; then
  RESULT=$(curl -s -X POST "$CLIENT_URL/query/channels/metadata" \
    -H "Authorization: $AUTH" \
    -H "data-partition-id: $PARTITION" \
    -H "Content-Type: application/json" \
    -d "{\"uri\": \"$WELLLOG_URI\"}")
  echo "$RESULT" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if isinstance(data, list):
    print(f'  Found {len(data)} channels (curves):')
    for ch in data[:10]:
        print(f'    {ch.get(\"channelName\",\"?\")} [{ch.get(\"uom\",\"?\")}] — {ch.get(\"dataKind\",\"?\")}')
else:
    print(f'  Response: {json.dumps(data)[:200]}')
" 2>/dev/null || echo "  Response: $RESULT"
else
  echo "  (No WellLog found — skipping)"
fi

echo
echo "═══ Demo complete ═══"
echo
echo "Additional protocols available but not demonstrated in REST:"
echo "  • GrowingObjectNotification (Protocol 7) — real-time part change events"
echo "  • ChannelSubscribe streaming — real-time curve data via WebSocket"
echo "  These require persistent WebSocket connections (not REST request/response)."
