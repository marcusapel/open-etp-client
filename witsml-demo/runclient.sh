#!/usr/bin/env bash
# demo/runclient.sh — Start ETP server (Docker) + PostgreSQL + etp-client
#
# Stack:
#   etp-client      :8080  (TypeScript/NestJS REST bridge)
#   ETP Server      :9002  (Docker open-etp-server, WebSocket)
#   PostgreSQL      :5433  (Docker postgres, db=rddms user=foo pw=bar)
#
# Usage:
#   ./demo/runclient.sh              # start stack
#   ./demo/runclient.sh --ingest     # start + ingest Drogon WITSML data
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RDDMS_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
RDDMS_PORT=8080
ETP_PORT=9002
PG_PORT=5433

PG_USER=foo
PG_PASS=bar
PG_DB=rddms

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${BOLD}"
echo "┌─────────────────────────────────────────────────────────┐"
echo "│  open-etp-client — ETP 1.2 + WITSML REST bridge         │"
echo "│                                                         │"
echo "│  REST API       http://localhost:${RDDMS_PORT}                  │"
echo "│  ETP Server     ws://localhost:${ETP_PORT}   (Docker)         │"
echo "│  PostgreSQL     localhost:${PG_PORT}        (Docker)         │"
echo "└─────────────────────────────────────────────────────────┘"
echo -e "${NC}"

# ─── Parse flags ──────────────────────────────────────────────────────────── #
DO_INGEST=false
for arg in "$@"; do
    case "$arg" in
        --ingest) DO_INGEST=true ;;
    esac
done

# ─── Docker Compose file ──────────────────────────────────────────────────── #
# Expects a docker-compose.yaml with postgres + etp-server services.
# Set COMPOSE_FILE env var to override.
if [[ -z "${COMPOSE_FILE:-}" ]]; then
    # Try common locations
    for candidate in \
        "$RDDMS_ROOT/docker-compose.yaml" \
        "$RDDMS_ROOT/../docker-compose.yaml" \
        "$HOME/drogonresqml/docker-compose.yaml"; do
        if [[ -f "$candidate" ]]; then
            COMPOSE_FILE="$candidate"
            break
        fi
    done
fi

if [[ -z "${COMPOSE_FILE:-}" ]]; then
    echo -e "${RED}✗ No docker-compose.yaml found. Set COMPOSE_FILE env var.${NC}"
    exit 1
fi

# ─── Start Docker services (ETP server + PostgreSQL) ──────────────────────── #

start_docker_stack() {
    if ss -tlnp 2>/dev/null | grep -q ":${ETP_PORT} "; then
        echo -e "${GREEN}✓${NC} ETP server on :${ETP_PORT} (Docker)"
        return
    fi

    echo -e "${CYAN}→${NC} Starting Docker ETP server + PostgreSQL..."
    docker compose -f "$COMPOSE_FILE" up -d postgres etp-server 2>/dev/null

    echo -n "  Waiting for ETP server"
    for i in $(seq 1 30); do
        if ss -tlnp 2>/dev/null | grep -q ":${ETP_PORT} "; then
            echo ""
            echo -e "${GREEN}✓${NC} ETP server on :${ETP_PORT} (Docker)"
            echo -e "${GREEN}✓${NC} PostgreSQL on :${PG_PORT} (Docker)"
            return
        fi
        echo -n "."
        sleep 2
    done
    echo ""
    echo -e "${RED}✗ Docker ETP server failed to start${NC}"
    echo "  Check: docker compose -f $COMPOSE_FILE logs etp-server"
    exit 1
}

start_docker_stack

# ─── Start etp-client on 8080 ─────────────────────────────────────────────── #

start_etp_client() {
    if curl -sf http://localhost:${RDDMS_PORT}/api/reservoir-ddms/v2/health/readiness >/dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} etp-client REST on :${RDDMS_PORT}"
        return
    fi

    echo -e "${CYAN}→${NC} Starting etp-client on :${RDDMS_PORT}..."

    # Build if dist/ is stale or missing
    if [[ ! -f "$RDDMS_ROOT/dist/src/lib/restApi/RestServer.js" ]] || \
       [[ -n "$(find "$RDDMS_ROOT/src" -name '*.ts' -newer "$RDDMS_ROOT/dist/src/lib/restApi/RestServer.js" 2>/dev/null | head -1)" ]]; then
        echo "  Compiling TypeScript..."
        (cd "$RDDMS_ROOT" && npx tsc) || true
    fi

    cd "$RDDMS_ROOT"
    RDMS_ETP_PROTOCOL=ws \
    RDMS_ETP_HOST=localhost \
    RDMS_ETP_PORT="${ETP_PORT}" \
    RDMS_ETP_PATH="" \
    RDMS_REST_PORT="${RDDMS_PORT}" \
    RDMS_REST_ROOT_PATH="/api/reservoir-ddms/v2/" \
    nohup node dist/src/lib/restApi/RestServer.js > /tmp/rddms-client.log 2>&1 &
    echo $! > /tmp/rddms-client.pid

    echo -n "  Waiting for etp-client"
    for i in $(seq 1 20); do
        if curl -sf http://localhost:${RDDMS_PORT}/api/reservoir-ddms/v2/health/readiness >/dev/null 2>&1; then
            echo ""
            echo -e "${GREEN}✓${NC} etp-client REST on :${RDDMS_PORT}"
            return
        fi
        echo -n "."
        sleep 1
    done
    echo ""
    echo -e "${RED}✗ etp-client failed to start${NC}"
    echo "  Check: tail -30 /tmp/rddms-client.log"
    exit 1
}

start_etp_client

# ─── Create maap/witsml dataspace ─────────────────────────────────────────── #

ensure_dataspace() {
    local ds="$1"
    local enc
    enc=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$ds', safe=''))")
    local code
    code=$(curl -s -o /dev/null -w "%{http_code}" \
        "http://localhost:${RDDMS_PORT}/api/reservoir-ddms/v2/dataspaces/${enc}")
    if [[ "$code" == "200" ]]; then
        echo -e "${GREEN}✓${NC} Dataspace '${ds}' exists"
    else
        curl -s -X POST "http://localhost:${RDDMS_PORT}/api/reservoir-ddms/v2/dataspaces" \
            -H 'Content-Type: application/json' \
            -d "{\"path\":\"${ds}\"}" > /dev/null 2>&1
        echo -e "${GREEN}✓${NC} Created dataspace '${ds}'"
    fi
}

ensure_dataspace "maap/witsml"

# ─── WITSML Ingestion (optional) ──────────────────────────────────────────── #

if $DO_INGEST; then
    echo ""
    echo -e "${BOLD}── WITSML Ingestion ──${NC}"

    if [[ -x "$SCRIPT_DIR/scripts/ingest_drogon_witsml.sh" ]]; then
        bash "$SCRIPT_DIR/scripts/ingest_drogon_witsml.sh"
    else
        echo -e "${CYAN}→${NC} Ingesting WITSML samples..."
        API="http://localhost:${RDDMS_PORT}/api/reservoir-ddms/v2"
        for xml_file in "$SCRIPT_DIR/witsml-samples"/*.xml; do
            [[ -f "$xml_file" ]] || continue
            xml=$(cat "$xml_file")
            curl -s -X PUT "$API/witsml/store" \
                -H "Authorization: Bearer dummy" \
                -H "data-partition-id: opendes" \
                -H "Content-Type: application/json" \
                -d "$(jq -n --arg ds "maap/witsml" --arg xml "$xml" '{dataspace: $ds, xml: $xml}')" > /dev/null
            echo -e "  ${GREEN}✓${NC} $(basename "$xml_file")"
        done
    fi

    # Verify
    echo ""
    echo -e "${CYAN}→${NC} Verifying objects in maap/witsml..."
    curl -s "http://localhost:${RDDMS_PORT}/api/reservoir-ddms/v2/dataspaces/maap%2Fwitsml/resources" | \
        python3 -c "
import json, sys
data = json.load(sys.stdin)
for t in data:
    if t['name'].startswith('witsml21'):
        print(f\"  {t['name']}: {t['count']}\")
print(f\"  Total: {sum(t['count'] for t in data if t['name'].startswith('witsml21'))}\")" 2>/dev/null || true
    echo -e "${GREEN}✓${NC} Done"
fi

echo ""
echo -e "${GREEN}${BOLD}Ready.${NC} API: http://localhost:${RDDMS_PORT}/api/reservoir-ddms/v2"
echo "  Logs:  tail -f /tmp/rddms-client.log"
echo "  Stop:  kill \$(cat /tmp/rddms-client.pid)"
