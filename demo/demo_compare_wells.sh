#!/usr/bin/env bash
# ============================================================================
# Demo: Compare RESQML and WITSML Well Representations
#
# Demonstrates how the same Drogon wells can be represented in both RESQML
# (structural model) and WITSML (drilling/completion) and queried/compared:
#
#   maap/drogon   → RESQML wells (WellboreFeature, WellboreTrajectory, etc.)
#   maap/drogon   → WITSML wells (Well, Wellbore, WellLog) coexisting
#
# This enables OSDU-style cross-domain queries where you can:
#   - Find a well by name in both representations
#   - Compare what properties each standard carries
#   - Link them via shared UUID or naming convention
#
# Usage:
#   ./demo/demo_compare_wells.sh [CLIENT_URL]
# ============================================================================

set -euo pipefail

CLIENT_URL="${1:-http://localhost:8080/api/reservoir-ddms/v2}"
AUTH="Bearer dummy"
PARTITION="opendes"
DATASPACE="maap/drogon"

echo "┌─────────────────────────────────────────────────────────────┐"
echo "│  RESQML vs WITSML Well Comparison Demo                      │"
echo "│  Dataspace: $DATASPACE (both representations)              │"
echo "└─────────────────────────────────────────────────────────────┘"
echo

# ── 1. Find RESQML well representations ─────────────────────────────────────

echo "═══ 1. RESQML Well Representations ═══"
echo "  Searching for WellboreFeature objects..."
echo

RESQML_WELLS=$(curl -s -X POST "$CLIENT_URL/query/resources/find" \
  -H "Authorization: $AUTH" \
  -H "data-partition-id: $PARTITION" \
  -H "Content-Type: application/json" \
  -d "{
    \"uri\": \"eml:///dataspace('$DATASPACE')\",
    \"scope\": \"targets\",
    \"depth\": 1,
    \"dataObjectTypes\": [\"resqml22.WellboreFeature\"]
  }")

echo "$RESQML_WELLS" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if isinstance(data, list):
    print(f'  Found {len(data)} RESQML WellboreFeatures:')
    for r in data[:8]:
        print(f'    ⊕ {r.get(\"name\",\"?\")}')
        print(f'      URI: {r.get(\"uri\",\"?\")}')
else:
    print(f'  {json.dumps(data)[:200]}')
" 2>/dev/null || echo "  $RESQML_WELLS"

echo

# ── 2. Find WITSML well objects in same dataspace ────────────────────────────

echo "═══ 2. WITSML Well Objects (same dataspace) ═══"
echo "  Searching for witsml21.Well objects..."
echo

WITSML_WELLS=$(curl -s -X POST "$CLIENT_URL/query/resources/find" \
  -H "Authorization: $AUTH" \
  -H "data-partition-id: $PARTITION" \
  -H "Content-Type: application/json" \
  -d "{
    \"uri\": \"eml:///dataspace('$DATASPACE')\",
    \"scope\": \"targets\",
    \"depth\": 1,
    \"dataObjectTypes\": [\"witsml21.Well\"]
  }")

echo "$WITSML_WELLS" | python3 -c "
import json, sys
data = json.load(sys.stdin)
if isinstance(data, list):
    print(f'  Found {len(data)} WITSML Wells:')
    for r in data[:8]:
        print(f'    ⊕ {r.get(\"name\",\"?\")}')
        print(f'      URI: {r.get(\"uri\",\"?\")}')
else:
    print(f'  {json.dumps(data)[:200]}')
" 2>/dev/null || echo "  $WITSML_WELLS"

echo

# ── 3. Compare what each carries ─────────────────────────────────────────────

echo "═══ 3. Content Comparison ═══"
echo

python3 -c "
import json, sys

# Parse results
try:
    resqml = json.loads('''$RESQML_WELLS''')
    witsml = json.loads('''$WITSML_WELLS''')
except:
    print('  Could not parse results for comparison')
    sys.exit(0)

if not isinstance(resqml, list) or not isinstance(witsml, list):
    print('  No data available for comparison')
    sys.exit(0)

print('  ┌──────────────────────────────────────────────────────────┐')
print('  │ Property          │ RESQML (WellboreFeature)  │ WITSML (Well)           │')
print('  ├──────────────────────────────────────────────────────────┤')
print('  │ Object type       │ resqml22.WellboreFeature  │ witsml21.Well           │')
print('  │ Count             │ %-25s │ %-23s │' % (str(len(resqml)), str(len(witsml))))
print('  │ Carries geometry  │ Via WellboreTrajectory ref│ No (separate Trajectory)│')
print('  │ Carries legal ID  │ No                        │ Yes (NumGovt, NameLegal)│')
print('  │ Carries location  │ Via local CRS             │ Yes (lat/lon/country)   │')
print('  │ Log data          │ Via WellLogInterpretation │ Via WellLog (growing)   │')
print('  │ Real-time capable │ No                        │ Yes (GrowingObject)     │')
print('  │ OSDU kind         │ Well + WellboreTrajectory │ Well + WellLog          │')
print('  └──────────────────────────────────────────────────────────┘')
print()

# Try to match by name
resqml_names = {r.get('name','').lower(): r for r in resqml}
witsml_names = {r.get('name','').lower(): r for r in witsml}
common = set(resqml_names.keys()) & set(witsml_names.keys())

if common:
    print(f'  Matched {len(common)} wells by name:')
    for name in sorted(common)[:5]:
        print(f'    ✓ \"{resqml_names[name].get(\"name\")}\"')
        print(f'        RESQML: {resqml_names[name].get(\"uri\",\"?\")[:60]}')
        print(f'        WITSML: {witsml_names[name].get(\"uri\",\"?\")[:60]}')
else:
    print('  No name matches found (different naming conventions)')
    if resqml:
        print(f'    RESQML names: {[r.get(\"name\") for r in resqml[:3]]}')
    if witsml:
        print(f'    WITSML names: {[r.get(\"name\") for r in witsml[:3]]}')
" 2>/dev/null

echo
echo "═══ Comparison complete ═══"
echo
echo "Key insight: Both representations can coexist in the same ETP dataspace."
echo "OSDU manifests can reference both, enabling cross-domain queries:"
echo "  - 'Show me all wells with both structural models AND drilling data'"
echo "  - 'Find wells where RESQML geometry differs from WITSML trajectory'"
echo "  - 'List wells with real-time log data (WITSML) linked to static model (RESQML)'"
