#!/usr/bin/env bash
#
# start-dev.sh — Start RDDMS development stack
#
# Architecture (matches OSDU official design):
#   [Our etp-client :8080 (TypeScript, native)]
#     → Binary Avro ETP 1.2 over WebSocket
#       → [ETP Server :9002 (C++ Docker, open-etp-server)]
#         → [PostgreSQL :5433 (Docker)]
#
# No NestJS needed — our client speaks binary Avro directly to the C++ server.
#
# What runs:
#   Docker (from drogonresqml stack):
#     - postgres:5433   — all dataspace data lives here
#     - etp-server:9002 — C++ open-etp-server (binary Avro ETP 1.2)
#   Native (our code):
#     - etp-client:8080 — REST API, manifests, WITSML, discovery
#
# Usage:
#   ./start-dev.sh          # start our client (Docker containers must be running)
#   ./start-dev.sh --stop   # stop our client
#   ./start-dev.sh --status # show what's running
#

set -euo pipefail
cd "$(dirname "$0")"

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
NC='\033[0m'

log() { echo -e "${CYAN}[rddms]${NC} $*"; }
ok()  { echo -e "${GREEN}  ✓${NC} $*"; }
warn() { echo -e "${YELLOW}  !${NC} $*"; }
err() { echo -e "${RED}  ✗${NC} $*" >&2; }

# ─── Stop mode ────────────────────────────────────────────────────────────────

if [[ "${1:-}" == "--stop" ]]; then
  log "Stopping dev stack..."
  if [[ -f /tmp/rddms-client.pid ]]; then
    PID=$(cat /tmp/rddms-client.pid)
    if kill -0 "$PID" 2>/dev/null; then
      kill "$PID"
      ok "Stopped etp-client (PID $PID)"
    fi
    rm -f /tmp/rddms-client.pid
  else
    warn "No PID file found — etp-client may not be running"
  fi
  log "Done. Docker containers (postgres, etp-server) still running."
  exit 0
fi

# ─── Status mode ──────────────────────────────────────────────────────────────

if [[ "${1:-}" == "--status" ]]; then
  echo -e "${BOLD}Docker containers:${NC}"
  docker ps --format "  {{.Names}}\t{{.Ports}}\t{{.Status}}" --filter "name=drogonresqml" 2>/dev/null || echo "  (none)"
  echo ""
  echo -e "${BOLD}Our etp-client:${NC}"
  if [[ -f /tmp/rddms-client.pid ]] && kill -0 "$(cat /tmp/rddms-client.pid)" 2>/dev/null; then
    echo "  Running (PID $(cat /tmp/rddms-client.pid)) on :8080"
  else
    echo "  Not running"
  fi
  exit 0
fi

# ─── Start mode ───────────────────────────────────────────────────────────────

echo -e "${BOLD}"
echo "┌────────────────────────────────────────────────────────┐"
echo "│  RDDMS Development Stack                               │"
echo "│                                                        │"
echo "│  Docker (backend):                                     │"
echo "│    PostgreSQL     localhost:5433  (data persistence)    │"
echo "│    ETP Server     localhost:9002  (C++ binary Avro)    │"
echo "│                                                        │"
echo "│  Native (our code):                                    │"
echo "│    etp-client     localhost:8080  (REST, manifests)    │"
echo "│                                                        │"
echo "│  Protocol: Binary Avro ETP 1.2 (direct to C++ server) │"
echo "└────────────────────────────────────────────────────────┘"
echo -e "${NC}"

# ─── 1. Verify Docker containers are running ─────────────────────────────────

log "Checking Docker containers..."

if ! docker ps --format '{{.Names}}' | grep -q "drogonresqml-postgres-1"; then
  err "PostgreSQL container not running!"
  err "Run: cd ~/ores/demo/drogonresqml && docker compose up -d postgres etp-server"
  exit 1
fi
ok "PostgreSQL on :5433 (user=foo, db=rddms)"

if ! docker ps --format '{{.Names}}' | grep -q "drogonresqml-etp-server-1"; then
  err "ETP server container not running!"
  err "Run: cd ~/ores/demo/drogonresqml && docker compose up -d etp-server"
  exit 1
fi
ok "ETP Server on :9002 (binary Avro, authN=none)"

# ─── 2. Verify ETP server is responsive (ping via probe) ─────────────────────

log "Checking ETP server health..."
if timeout 3 bash -c 'echo | nc -w1 localhost 9002' >/dev/null 2>&1; then
  ok "ETP server accepting WebSocket connections"
else
  err "ETP server not responding on port 9002"
  exit 1
fi

# ─── 3. Install etp-client deps if needed ────────────────────────────────────

if [[ ! -d etp-client/node_modules ]]; then
  log "Installing etp-client dependencies..."
  (cd etp-client && npm install)
  ok "Dependencies installed"
fi

# ─── 4. Write config (direct ETP, no proxy) ──────────────────────────────────

cat > etp-client/config.user.env <<'EOF'
# RDDMS dev config — direct binary Avro ETP to C++ server (no proxy needed)
ETP_SERVER_URL=ws://localhost:9002
REST_PORT=8080
REST_HOST=0.0.0.0
ETP_DATA_PARTITION_ID=opendes
EOF

# ─── 5. Kill existing etp-client if running ──────────────────────────────────

if [[ -f /tmp/rddms-client.pid ]]; then
  OLD_PID=$(cat /tmp/rddms-client.pid)
  if kill -0 "$OLD_PID" 2>/dev/null; then
    kill "$OLD_PID" 2>/dev/null
    sleep 1
    warn "Killed previous etp-client (PID $OLD_PID)"
  fi
  rm -f /tmp/rddms-client.pid
fi

# ─── 6. Start our etp-client ─────────────────────────────────────────────────

log "Starting etp-client on port 8080..."
cd etp-client
nohup npx ts-node src/index.ts > /tmp/rddms-client.log 2>&1 &
CLIENT_PID=$!
echo "$CLIENT_PID" > /tmp/rddms-client.pid

# Wait for startup
sleep 4
if ! kill -0 "$CLIENT_PID" 2>/dev/null; then
  err "etp-client failed to start!"
  echo ""
  tail -20 /tmp/rddms-client.log
  exit 1
fi
ok "etp-client started (PID $CLIENT_PID)"

# ─── 7. Health check ─────────────────────────────────────────────────────────

HEALTH=$(curl -sf http://localhost:8080/api/reservoir-ddms/v2/health 2>/dev/null || echo "")
if [[ -n "$HEALTH" ]]; then
  ok "REST API healthy on :8080"
else
  sleep 3
  HEALTH=$(curl -sf http://localhost:8080/api/reservoir-ddms/v2/health 2>/dev/null || echo "")
  if [[ -n "$HEALTH" ]]; then
    ok "REST API healthy on :8080"
  else
    warn "REST API not responding yet — check: tail -f /tmp/rddms-client.log"
  fi
fi

echo ""
echo -e "${BOLD}Endpoints:${NC}"
echo "  Health:     GET  http://localhost:8080/api/reservoir-ddms/v2/health"
echo "  Dataspaces: GET  http://localhost:8080/api/reservoir-ddms/v2/dataspaces"
echo "  Search:     POST http://localhost:8080/api/reservoir-ddms/v2/discovery/search"
echo "  Tree:       GET  http://localhost:8080/api/reservoir-ddms/v2/discovery/tree?uri=..."
echo "  Types:      GET  http://localhost:8080/api/reservoir-ddms/v2/discovery/types?uri=..."
echo "  WITSML:     POST http://localhost:8080/api/reservoir-ddms/v2/witsml/query"
echo "  RESQML:     POST http://localhost:8080/api/reservoir-ddms/v2/resqml/query"
echo "  Manifest:   POST http://localhost:8080/api/reservoir-ddms/v2/manifests/build"
echo "  Ingest:     POST http://localhost:8080/api/reservoir-ddms/v2/catalog/ingest"
echo ""
echo -e "  Logs: ${CYAN}tail -f /tmp/rddms-client.log${NC}"
echo -e "  Stop: ${CYAN}./start-dev.sh --stop${NC}"
