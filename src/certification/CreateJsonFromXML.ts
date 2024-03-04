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

import fs from "fs";
import path from "path";

import { xml2typescript } from "../lib/mlTypes/XmlJsonUtil";

/* eslint-disable no-console */

// Create a help message
if (process.argv[2] === "--help" || process.argv[2] === "-h") {
  console.log(
    "Usage: node CreateJsonFromXML.js <directory with xml files> <output directory>"
  );
  process.exit(1);
}

// Read the directory path from the command line
const xmlSchemaDir = path.resolve(process.argv[2] ?? ".");

const jsonSchemaDir = path.resolve(
  process.argv[3] ?? process.argv[2] + "/json"
);

// Create a directory to store the JSON schema files as a subdirectory of the current directory
if (!fs.existsSync(jsonSchemaDir)) {
  fs.mkdirSync(jsonSchemaDir);
}

// List the files in the current directory
fs.readdirSync(xmlSchemaDir).forEach(file => {
  // check if the file end with .xml
  if (file.endsWith(".xml")) {
    // read the file content
    const xml = fs.readFileSync(path.join(xmlSchemaDir, file), "utf-8");

    const mlIndex =
      xml.indexOf("http://www.energistics.org/energyml/data/") + 41;
    const substr = xml.substring(mlIndex);

    const schemaIndex = xml.indexOf(`schemaVersion="`) + 15;
    const schema = xml.substring(schemaIndex, schemaIndex + 3);

    const mlType = substr.startsWith("resqmlv2")
      ? schema === "2.2"
        ? "resqml22.ContinuousProperty"
        : "resqml20.obj_ContinuousProperty"
      : substr.startsWith("witsmlv2")
      ? "witsml21.Well"
      : substr.startsWith("prodmlv2")
      ? "prodml22.FluidCharacterization"
      : substr.startsWith("commonv2")
      ? schema === "2.3"
        ? "eml23.Activity"
        : "eml20.obj_EpcExternalPartReference"
      : null;

    if (!mlType) {
      console.log("Unknown type");
      return;
    }

    xml2typescript(xml, mlType)
      .then(js1 => {
        const file2 = path.join(jsonSchemaDir, file.replace(".xml", ".json"));
        fs.writeFileSync(file2, JSON.stringify(js1, null, "  "));
      })
      .catch(e => console.log(e));
  }
});
