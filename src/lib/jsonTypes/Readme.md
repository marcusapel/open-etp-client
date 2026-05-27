# Adding new OSDU types to manifest creation

In order to generate OSDU entries correspond to Energistics types, we use type generation both from XML and JSON schemas, in order to enforce at coding time that elements in both schema are always respected. The only elements that are not validated by typescript are the JSON schema string patterns.

## Create typescript interface corresponding to JSON schema

### Install quicktype globally once

```sh
npm install -g quicktype
```

### Transform the schema into a typescript interface

Example below is for the Activity work product component:

- Go to the directory containing the type

```sh
cd src\lib\jsonTypes\Generated\work-product-component
```

- Generate the interface and associated types with quicktype

```sh
quicktype --src Activity.1.0.0.json -s schema --lang ts --no-ignore-json-refs -t Activity -o Activity.1.0.0.ts
```

## Create translation object

- Create a new file into src\lib\jsonTypes (Activity.ts)
- Import types of previously generated interface that will be used

```ts
import {
  Activity,
  Data
} from "./Generated/work-product-component/Activity.1.0.0";
```

- import the resqml types:

```ts
import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
```

### Create Workproduct component class

```ts
export class ActivityOSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml20.obj_Activity>>
  implements Activity{...}
```

### Reuse boiler plate elements

Implement constructor and initData using ResqmlWorkProductComponent method

```ts
public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_Activity>,
    client: ResqmlClient
  ): Promise<ActivityOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
```

### Fill specific elements in initData

- Reuse utlity code if needed:

```ts
this.dorToSrn(...);
context.addReferenceData(...);
ResqmlWorkProductComponent.getObject(...)
dataArrayVisitors....
```

### Expose converter method

```ts
export const ActivityManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_Activity>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<ActivityOSDU> =>
  new ActivityOSDU(xml, context).initData(uri, xml, client);
```

## Declare translation object in factory

- In ResqmlOSDU.ts import the converter method above

```ts
import { ActivityManifest } from "./Activity";
```

- Associate the Resqml and OSDU types with the converter

```ts
ResqmlOSDU.add("resqml20.obj_Activity", "Activity", "1.0.0", ActivityManifest);
```
