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

import {
  EtpUri,
  IDataArray,
  IResqmlDataObject,
  ResqmlClient,
  URI,
  XmlUtils,
  byteToString
} from "..";

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

const timeMessage = "Execution time (hr): %ds %dms";
const longTime = (start: [number, number]) => {
  const hrEnd = process.hrtime(start);
  log(timeMessage, hrEnd[0], hrEnd[1] / 1000000);
};

// Check graph building
const c2 = new ResqmlClient();
c2.setCallsTraceability(false);

const hrStart = process.hrtime();

c2.openSession(
  serverUrl,
  XmlUtils.createDefaultJWT(),
  undefined,
  undefined,
  undefined,
  20000000
)
  .then(() => c2.getDataspaces())
  .then(async projects => {
    if (!projects || projects.length === 0) {
      return [];
    }
    return c2.getDataspaceResources(projects[0].uri);
  })
  .then(resources => c2.getDataObjects(resources.map(r => r.uri)))
  .then(dataObjects => {
    const dataArrays = new Map<URI, IDataArray>(); // Map URI=>DataArray
    dataObjects.forEach(async dob1 => {
      if (dob1) {
        const xmlContent = byteToString(dob1.data);
        const jsObj = (await XmlUtils.xml2typescript(
          xmlContent,
          new EtpUri(dob1.resource.uri).dataObjectType
        )) as IResqmlDataObject;
        if (jsObj) {
          c2.findDataArrays(dob1.resource.uri, jsObj, dataArrays);
        }
      }
    });
    return dataArrays;
  })
  .then(dataArrays =>
    Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Array.from(dataArrays, ([_, value]) => value.uid).map(async uid => {
        let average = BigInt(0);
        let length = 0;
        return c2
          .visitDataArrayValues(uid, values => {
            values.forEach((v: number | bigint | boolean) => {
              if (typeof v === "boolean") {
                average += v ? BigInt(0) : BigInt(1);
                length++;
              } else if (typeof v === "bigint") {
                if (isNaN(Number(v))) {
                  average += v;
                  length++;
                }
              } else if (!isNaN(v)) {
                average += BigInt(v);
                length++;
              }
            });
          })
          .then(() => {
            log(
              `${uid.pathInResource}: nbValue: ${length}, average : ${
                length ? average / BigInt(length) : 0
              }`
            );
          });
      })
    )
  )
  .then(() => {
    longTime(hrStart);
    return c2.closeSession();
  })
  .catch((reason: any) => {
    log(reason);
    return c2.closeSession();
  });
