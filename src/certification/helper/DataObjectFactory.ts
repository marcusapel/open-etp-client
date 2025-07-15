import { Energistics } from "../../lib/common/Etp12";
import DataObject = Energistics.Etp.v12.Datatypes.Object.DataObject;
import { v4 as uuidv4 } from 'uuid';
import Resource = Energistics.Etp.v12.Datatypes.Object.Resource;

class DataObjectFactory {

  static generateWellObjects(uuids : string[]): DataObject[] {

    const dataObjects = new Array<DataObject>();

    for(const uuid of uuids) {
      const resource = new Resource();
      resource.uri = this.createWellUri(uuid);
      const dataObject = new DataObject();
      dataObject.resource = resource;
      dataObject.data = Buffer.from(this.createWitsmlWellObj(uuid), "utf-8");
      dataObjects.push(dataObject);
    }

    return dataObjects;
  }

  static createInvalidObject(): DataObject {
    const resource = new Resource();
    resource.uri = this.createWellUri(uuidv4());
    const dataObject = new DataObject();
    dataObject.resource = resource;
    dataObject.data = Buffer.from(this.createWitsmlWellObj("invalid"), "utf-8");
    return dataObject;
  }

  static createWitsmlWellObj(uuid: string): string {
    return `<Well xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.1" uuid="${uuid}"> </Well>`;
  }

  static createWellUri(uuid: string): string {
    return this.createUri(uuid, "Well");
  }

  static createUri(uuid: string, dataType: string): string {
    return `eml:///witsml21.${dataType}(${uuid})`;
  }
}

export { DataObjectFactory };

