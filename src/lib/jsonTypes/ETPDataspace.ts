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
} from "./Generated/dataset/ETPDataspace.1.0.0";

class ETPDataspaceOSDU implements ETPDataspace {
  public acl: AccessControlList = { owners: [], viewers: [] };
  public kind = "osdu:wks:dataset--ETPDataspace:1.0.0";
  public legal: LegalMetaData = {
    legaltags: [],
    otherRelevantDataCountries: []
  };
  public ancestry: ParentList;
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
    this.ancestry = {};
    this.createTime = new Date(Number(dataspace.storeCreated / BigInt(1000)));
    this.modifyTime = dataspace.storeLastWrite
      ? new Date(Number(dataspace.storeLastWrite / BigInt(1000)))
      : this.createTime;
    const etpUri = new EtpUri(dataspace.uri);
    this.id = `${context.partition}:dataset--ETPDataspace:${encodeURIComponent(
      etpUri.dataSpace
    )}`;
    this.version = 1;

    this.data = {
      ExistenceKind: `${context.partition}:reference-data--ExistenceKind:Actual:`,
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
        if (
          this.data.ExtensionProperties !== undefined &&
          value.item?._string
        ) {
          this.data.ExtensionProperties[key] = value.item?._string;
        }
      });
    }

    this.tags = context.tags;
    this.acl = context.acl;
    this.legal = context.legal;
  }
}

export const EtpDataspaceManifest = (
  dataspace: Energistics.Etp.v12.Datatypes.Object.Dataspace,
  context: OSDUContext
): ETPDataspace => new ETPDataspaceOSDU(dataspace, context);
