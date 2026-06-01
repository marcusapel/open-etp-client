# ── Dockerfile for etp-client (TypeScript REST layer) ────────────────
# Builds the @osdu/open-etp-client service that provides:
#   - REST API (/api/reservoir-ddms/v2/...)
#   - WITSML 1.4.1 parsing + store
#   - OSDU M27 manifest builder (/manifests/build)
#   - RESQML/PRODML type utilities
#
# The C++ open-etp-server is built separately (see open-etp-server/Dockerfile.runtime)
# and connected via ETP 1.2 WebSocket (see docker-compose.yml).

FROM node:20-alpine AS builder
WORKDIR /app
COPY etp-client/package.json etp-client/package-lock.json* ./
RUN npm ci --ignore-scripts
COPY etp-client/tsconfig.json ./
COPY etp-client/src/ ./src/
RUN npm run build

FROM node:20-alpine
RUN addgroup -g 1001 -S etp && adduser -u 1001 -S etp -G etp
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY etp-client/config.default.env ./
RUN chown -R etp:etp /app
USER etp
EXPOSE 8080
CMD ["node", "dist/index.js"]
