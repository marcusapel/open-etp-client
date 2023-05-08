// ============================================================================
// Copyright 2019-2022 Emerson Paradigm Holding LLC. All rights reserved.
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

import {
  IResqmlDataObject,
  Resource,
  ResqmlClient,
  SimpleJson,
  XmlUtils
} from "..";

import { obj_ContinuousProperty as AbstractValuesProperty } from "../lib/mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { serverHost, serverPath, serverPort, serverProtocol } from "./Config";
const serverUrl = `${serverProtocol}://${serverHost}:${serverPort}${serverPath}/`;

// eslint-disable-next-line no-console
const log = console.log;

import http from "http";

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

// Create client
const c = new ResqmlClient();
c.setCallsTraceability(false);
// Open connection with server, with credentials in JWT
c.openSession(serverUrl, XmlUtils.createDefaultJWT())
  // Get all projects
  .then(() => c.getDataspaces())
  .then(d =>
    // Get all ContinuousProperty
    d
      ? c.getDataspaceResources(d[0].uri, ["resqml20.obj_ContinuousProperty"])
      : []
  )
  .then(async (objects: Resource[]) => {
    const prop = objects[1];
    // Get raw RESQML object as JS Object
    c.getObjects([prop.uri]).then(obs => {
      obs.forEach(o => {
        if (o) {
          log(JSON.stringify(o, XmlUtils.bigIntToString));
          c.addArrayValues(prop.uri, o).then(obj =>
            log(JSON.stringify(obj, XmlUtils.bigIntToString))
          );
        }
      });
    });
    const externalObjects = new Map<string, IResqmlDataObject>();
    // Get "resolved" JS object, where object references and arrays have been replaced by actual info
    return c.getResolvedObjects([prop.uri], externalObjects, false);
  })
  .then(resourceObjects => {
    // Build type checker (costly so do it once only if possible)
    const typeChecker = new XmlUtils.ResqmlTypeUtils(true);
    resourceObjects.forEach(obj => {
      try {
        if (obj) {
          // Check that object is actually some Property, allowing safe cast
          const isProperty = typeChecker.checkInterface(
            obj,
            "resqml20.AbstractValuesProperty"
          );
          log(
            `Object ${obj.$type} ${isProperty ? "can" : "cannot"} be a Property`
          );
          if (isProperty) {
            const absProperty = XmlUtils.simpleJson(
              obj,
              "2.0"
            ) as SimpleJson<AbstractValuesProperty>;
            // Get type
            log(`Type: ${absProperty.$type}`);
            // Get property info
            log(`Property Name: ${absProperty.Citation.Title}`);
            // Get some info going through references
            log(
              `Representation Name: ${absProperty.SupportingRepresentation._data?.Citation.Title}`
            );
          }
          const isRep = typeChecker.checkInterface(
            obj,
            "resqml20.AbstractFeatureInterpretation"
          );
          log(
            `Object ${obj.$type} ${
              isRep ? "can" : "cannot"
            } be a Interpretation`
          );
        }
      } catch (err) {
        log("error");
      }
    });
    // Close connection
    return c.closeSession();
  })
  .catch((reason: any) => {
    log(reason);
  });
