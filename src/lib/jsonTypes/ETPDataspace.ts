import { Energistics, EtpUri } from "../client/ResqmlClient";

import { DataValue } from "../common/EtpTypes";

import { OSDUContext } from "./OsduContext";

import {
  AccessControlList,
  Data,
  ETPDataspace,
  FrameOfReferenceMetaDataItem,
  LegalMetaData,
  ParentList
} from "./Generated/dataset/ETPDataspace.1.0.1";

class ETPDataspaceOSDU implements ETPDataspace {
  public acl: AccessControlList = { owners: [], viewers: [] };
  public kind = "osdu:wks:dataset--ETPDataspace:1.0.1";
  public legal: LegalMetaData = {
    legaltags: [],
    otherRelevantDataCountries: []
  };
  public ancestry?: ParentList;
  public createTime: Date;
  public id: string;
  public modifyTime: Date;
  public version: number;
  public tags?: { [key: string]: string };
  public meta?: FrameOfReferenceMetaDataItem[];
  public data: Data;

  constructor(
    dataspace: Energistics.Etp.v12.Datatypes.Object.Dataspace,
    context: OSDUContext
  ) {
    this.ancestry = undefined;
    this.createTime = new Date(Number(dataspace.storeCreated / BigInt(1000)));
    this.modifyTime = dataspace.storeLastWrite
      ? new Date(Number(dataspace.storeLastWrite / BigInt(1000)))
      : this.createTime;
    const etpUri = new EtpUri(dataspace.uri);
    this.id = `${context.partition}:dataset--ETPDataspace:${context.datasetId(
      etpUri
    )}`;
    this.version = 1;

    this.data = {
      ExistenceKind: context.addReferenceData("ExistenceKind", "Actual"),
      DatasetProperties: { URI: dataspace.uri },
      ResourceCurationStatus: undefined,
      ResourceHomeRegionID: undefined,
      ResourceHostRegionIDs: undefined,
      ResourceLifecycleStatus: undefined,
      ResourceSecurityClassification: undefined,
      Source: undefined,
      TechnicalAssuranceID: undefined,
      Description: undefined,
      Name: dataspace.path,
      ExtensionProperties: undefined
    };

    if (dataspace.customData.size > 0) {
      this.data.ExtensionProperties = {};
      dataspace.customData?.forEach((value: DataValue, key: string) => {
        if (key === "size") {
          const sizeStr = value.item?._string;
          const sizeStrs = sizeStr?.split(" ");
          if (sizeStrs && sizeStrs?.length > 0) {
            let size = Number.parseFloat(sizeStrs[0]);
            if (sizeStrs?.length === 2) {
              if (sizeStrs[1] === "kB") {
                size = size * 1024;
              } else if (sizeStrs[1] === "MB") {
                size = size * 1024 * 1024;
              } else if (sizeStrs[1] === "GB") {
                size = size * 1024 * 1024 * 1024;
              }
            }
            size = Math.round(size);
            // represent size in bytes as a string
            this.data.TotalSize = size.toString();
          }
        } else if (
          this.data.ExtensionProperties !== undefined &&
          value.item?._string
        ) {
          this.data.ExtensionProperties[key] = value.item?._string;
        }
      });
    }

    this.tags = context.tags;

    const aclLegal = context.dataspaceACLs.get(dataspace.uri);
    if (aclLegal !== undefined) {
      this.acl = aclLegal.acl;
      this.legal = aclLegal.legal;
    }
  }
}

export const EtpDataspaceManifest = (
  dataspace: Energistics.Etp.v12.Datatypes.Object.Dataspace,
  context: OSDUContext
): ETPDataspace => new ETPDataspaceOSDU(dataspace, context);
