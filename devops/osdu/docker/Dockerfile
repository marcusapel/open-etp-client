FROM node:22.22.1-alpine AS BASE

ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# add first the package in a dedicated layer
COPY package.json package-lock.json ./

# clean install of production modules and clean private registry access
RUN npm install -g npm@11.12.1 && npm pkg delete scripts.prepare && npm ci --quiet

###############################################################################
FROM node:22.22.1-alpine

# env
ENV NODE_ENV=production

USER node
# Create app directory
WORKDIR /usr/src/app

# node modules from BASE
COPY --from=BASE --chown=node:node /usr/src/app .

# Bundle app source
COPY --chown=node:node dist dist


# Environment variables used by server
# RDMS_REST_MAIN_URL : Base url for openAPI
# RDMS_REST_ROOT_PATH : local path inside url
# RDMS_REST_PORT : Port of api in container
#  --- OpenAPI url is `${RDMS_REST_MAIN_URL}:${OPEN_API_PORT}${RDMS_REST_ROOT_PATH}` ---


# RDMS_ETP_PROTOCOL websocket protocol "ws" or "wss"
# RDMS_ETP_HOST domain of etp server
# RDMS_ETP_PORT port of ETP server
# RDMS_ETP_PATH local path in ETP server url
#  --- ETP server url is `${RDMS_ETP_PROTOCOL}://${RDMS_ETP_HOST}:${RDMS_ETP_PORT}${RDMS_ETP_PATH}/` ---

EXPOSE 80
CMD [ "node", "dist/src/lib/restApi/RestServer.js" ]
