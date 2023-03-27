import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";
import { EtpContentType, ResqmlClient } from "../client/ResqmlClient";

import { ResqmlWorkProductComponent } from "./WorkProductComponent";
import { OSDUContext, ResqmlOSDUMap } from "./OsduContext";

import {
  Data,
  PersistedCollection
} from "./Generated/work-product-component/PersistedCollection.1.1.0";

export class PersistedCollectionPropertySetOSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml20.obj_PropertySet>>
  implements PersistedCollection
{
  public data: Data;

  constructor(xml: SimpleJson<resqml20.obj_PropertySet>, context: OSDUContext) {
    super(xml, context, "PersistedCollection.1.1.0");
    this.data = {};
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_PropertySet>
  ): Promise<PersistedCollectionPropertySetOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    const rTypes = xml.Properties.map(
      p => new EtpContentType(p.ContentType).etpType
    );
    const homogeneous =
      rTypes.length > 0 && rTypes.every((val, _, arr) => val === arr[0]);

    const oType = homogeneous
      ? ResqmlOSDUMap.getInstance().get(rTypes[0])
      : undefined;

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      HomogeneousMemberKind: oType
        ? `osdu:wks:work-product-component--${oType.osduType}`
        : undefined,
      MemberIDs:
        xml.Properties.length === 0
          ? undefined
          : xml.Properties.map(p => this.dorToSrn(ReservoirDMSUrl, p) || ""),
      ParentCollectionID:
        xml.ParentSet && xml.ParentSet.length > 0
          ? this.dorToSrn(ReservoirDMSUrl, xml.ParentSet[0])
          : undefined,
      /**
       * Purpose of the Collection
       */
      PurposeID: undefined,

      ExtensionProperties: undefined
    };

    xml.ExtraMetadata?.forEach(x => {
      if (this.data.ExtensionProperties) {
        this.data.ExtensionProperties[x.Name] = x.Value;
      }
    });

    delete this.__context;
    return this;
  }
}

export const PersistedCollectionPropertySetManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_PropertySet>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<PersistedCollectionPropertySetOSDU> =>
  new PersistedCollectionPropertySetOSDU(xml, context).initData(uri, xml);
