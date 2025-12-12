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

import "jest";

import { ResqmlClient, SimpleJson } from "../index";

import {
  AbstractValuesProperty,
  NameValuePair
} from "../lib/mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { GenericPropertyOSDU } from "../lib/jsonTypes/GenericProperty";
import { Data } from "../lib/jsonTypes/Generated/work-product-component/GenericProperty.1.0.0";
import { OSDUContext } from "../lib/jsonTypes/OsduContext";

describe("Manifest Conversion", () => {
  const xml: SimpleJson<AbstractValuesProperty> = {
    SchemaVersion: "2.0",
    Uuid: "1580ddfe-d740-4f5b-bf9c-7fbb9d191daa",
    Citation: {
      Title: "MyTitle",
      Originator: "MyOriginator",
      Creation: new Date("2023-12-05T11:36:00Z"),
      Format: "MyFormat",
      LastUpdate: new Date("2023-12-06T11:36:00Z")
    },
    IndexableElement: "nodes",
    Count: 7,
    PropertyKind: {
      PropertyKind: "length"
    },
    SupportingRepresentation: {
      Title: "MyRepresentation",
      ContentType:
        "application/x-resqml+xml;version=2.0;type=obj_WellboreFrameRepresentation",
      UUID: "2580ddfe-d740-4f5b-bf9c-7fbb9d191d1a"
    },
    PatchOfValues: [
      {
        Values: {}
      }
    ]
  };

  it("Check Citation conversion", () => {
    const osdu: GenericPropertyOSDU = new GenericPropertyOSDU(
      xml,
      new OSDUContext("test", "test")
    );
    osdu.initData("myURI", xml, new ResqmlClient());
    expect(osdu.createUser).toEqual(xml.Citation.Originator);
    expect(osdu.createTime).toEqual(xml.Citation.Creation);
    expect(osdu.modifyUser).toEqual(xml.Citation.Originator);
    expect(osdu.modifyTime).toEqual(xml.Citation.LastUpdate);
  });

  it("Check extra metadata conversion", () => {
    const osdu: GenericPropertyOSDU = new GenericPropertyOSDU(
      xml,
      new OSDUContext("test", "test")
    );
    // No real client so initialize directly instead of using initData
    const data: Data = {
      ValueCount: 7
    };
    osdu.data = data;

    const extra: SimpleJson<NameValuePair>[] = [
      {
        Name: "osdu/test1/test2", // Add to extensionProperties
        Value: "test1"
      },
      {
        Name: "osdu/tags/tag1", // Add to tags
        Value: "tag1"
      },
      {
        Name: "osdu/tags/tag1/tag2", // Add to extension properties (as tags are not nested)
        Value: "tag2"
      }
    ];

    osdu.assignExtraMetaData(extra);
    expect(osdu.data.ValueCount).toEqual(7);
    expect(
      osdu.data.ExtensionProperties &&
        osdu.data.ExtensionProperties["test1/test2"]
    ).toEqual("test1");
    expect(osdu.tags && osdu.tags.tag1).toEqual("tag1");
    expect(
      osdu.data.ExtensionProperties &&
        osdu.data.ExtensionProperties["tags/tag1/tag2"]
    ).toEqual("tag2");
  });
});
