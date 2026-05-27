import { XMLParser } from "fast-xml-parser";
import { Energistics } from "../../lib/common/Etp12";
import fs from "fs";
import DataObject = Energistics.Etp.v12.Datatypes.Object.DataObject;
import { v4 as uuidv4 } from 'uuid';
import Resource = Energistics.Etp.v12.Datatypes.Object.Resource;

const wellUuidPlaceholder = 'WELL_UUID_PH';
const wellboreUuidPlaceholder = 'WELLBORE_UUID_PH';

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  removeNSPrefix: true
});

class DataObjectFactory {

  static generateWellObject(uuid: string) : DataObject {
    const resource = new Resource();
    resource.uri = this.createWellUri(uuid);
    const dataObject = new DataObject();
    dataObject.resource = resource;
    dataObject.data = this.generateWellData(uuid);
    return dataObject;
  }

  static generateWellData(uuid: string) : Buffer {
    const filePath = 'src/certification/testdata/Well.xml';
    const xmlContent = fs.readFileSync(filePath, 'utf8')
      .replace(wellUuidPlaceholder, uuid);

    return Buffer.from(xmlContent, 'utf-8');
  }


  static generateWellboreObject(wellboreUuid: string, wellUuid: string) : DataObject {
    const resource = new Resource();
    resource.uri = this.createWellboreUri(wellboreUuid);
    const dataObject = new DataObject();
    dataObject.resource = resource;

    const filePath = 'src/certification/testdata/Wellbore.xml';
    const xmlContent = fs.readFileSync(filePath, 'utf8')
                              .replace(wellUuidPlaceholder, wellUuid)
                              .replace(wellboreUuidPlaceholder, wellboreUuid);

    dataObject.data = Buffer.from(xmlContent, 'utf-8');
    return dataObject;
  }

  static createInvalidObject(): DataObject {
    const resource = new Resource();
    resource.uri = this.createWellUri(uuidv4());
    const dataObject = new DataObject();
    dataObject.resource = resource;
    dataObject.data = this.generateWellData("invalid");
    return dataObject;
  }

  static createWellboreUri(uuid: string): string {
    return this.createUri(uuid, "Wellbore");
  }

  static createWellUri(uuid: string): string {
    return this.createUri(uuid, "Well");
  }

  static createUri(uuid: string, dataType: string): string {
    return `eml:///witsml21.${dataType}(${uuid})`;
  }

  static parseXml(data: Uint8Array): any {
    return xmlParser.parse(new TextDecoder().decode(data));
  }
}

export { DataObjectFactory };

