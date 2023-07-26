// ============================================================================
// Copyright 2019-2023 Emerson Paradigm Holding LLC. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ============================================================================

import http from "http";

import { ResqmlClient, XmlUtils } from "..";

import { serverHost, serverPath, serverPort, serverProtocol } from "./Config";
const serverUrl = `${serverProtocol}://${serverHost}:${serverPort}${serverPath}/`;

// eslint-disable-next-line no-console
const log = console.log;

http.get(
  {
    host: serverHost,
    path: `${serverPath}/.well-known/etp-server-capabilities?GetVersion=etp12.energistics.org`,
    port: serverPort
  },
  res => {
    if (res.statusCode === 200 || res.statusCode === 301) {
      log("Website Up and Running ..");
    } else {
      log("Website down");
    }
  }
);

const ct = new ResqmlClient();

// connect, then authorize before requesting the session
ct.connect(serverUrl)
  .then(() => ct.requestAuthorize(XmlUtils.createDefaultJWT()))
  .then(() => ct.requestSession())
  .then(() => ct.closeSession());
