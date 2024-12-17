import { XMLParser } from "fast-xml-parser";
import { Energistics } from "../../lib/common/Etp12";
import path from "path";
import fs from "fs";
import DataObject = Energistics.Etp.v12.Datatypes.Object.DataObject;
import PutDataObjects = Energistics.Etp.v12.Protocol.Store.PutDataObjects;

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: ""
});

class DataObjectFactory {
  static generateDataObjectForErrorMessages(): DataObject[] {
    const inputObject = new PutDataObjects();
    // Setting up the input message
    const folderPath = path.join(__dirname, "/data/20");
    const folderPathExtra = path.join(__dirname, "/data/extra");
    const files = fs.readdirSync(folderPath);
    files.push("trajectory20.xml");
    files.push("channel20.xml");
    let index = 0;
    for (const file of files) {
      const dataObject = new DataObject();
      let filepath;
      if (index === 4) {
        filepath = folderPathExtra + "/channelSet20.xml";
        inputObject.pruneContainedObjects = true;
      } else if (index === 6) {
        filepath = folderPathExtra + "/" + file;
      } else {
        filepath = folderPath + "/" + file;
      }
      const fileContent = fs.readFileSync(filepath);
      dataObject.data = Buffer.from(fileContent);
      const jObj = xmlParser.parse(fileContent);
      const dataObjectType = Object.keys(jObj)[0];
      let uri =
        "eml:///witsml20." +
        dataObjectType +
        "(" +
        jObj[dataObjectType].uuid +
        ")";
      if (index === 0) {
        uri = "eml:///witsml20." + dataObjectType + "(wronguuidformat)";
      }
      if (index === 1) {
        dataObject.data = Buffer.from("wrong data");
      }
      if (index === 2) {
        uri = "eml:///witsml20.BhaRun(caeaca77-643b-0000-0000-97f960a0a820)";
      }
      if (index === 3) {
        uri =
          "eml:///witsml20.TestDataObject(301b6ebe-a211-49e2-0000-f7378576ddc9)";
      }
      dataObject.resource.uri = uri;
      inputObject.dataObjects.set(index.toString(), dataObject);
      index++;
    }
    return Array.from(inputObject.dataObjects.values());
  }

  static generateDataObject(): DataObject[] {
    const inputObject = new PutDataObjects();
    const folderPath = path.join(__dirname, "/data/21");
    const files = fs.readdirSync(folderPath);
    let index = 0;
    for (const file of files) {
      const dataObject = new DataObject();
      const filepath = folderPath + "/" + file;
      const fileContent = fs.readFileSync(filepath);
      dataObject.data = Buffer.from(fileContent);
      const jObj = xmlParser.parse(fileContent);
      const dataObjectType =
        Object.keys(jObj).length == 1
          ? Object.keys(jObj)[0]
          : Object.keys(jObj)[1];
      dataObject.resource.uri = `eml:///witsml${jObj[
        dataObjectType
      ].schemaVersion.replace(".", "")}
                                          .${dataObjectType}(${
                                            jObj[dataObjectType].uuid
                                          })`;
      inputObject.dataObjects.set(index.toString(), dataObject);
      index++;
    }

    return Array.from(inputObject.dataObjects.values());
  }
}
export { DataObjectFactory };
