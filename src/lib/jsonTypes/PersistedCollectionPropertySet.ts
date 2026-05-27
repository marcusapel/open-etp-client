import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";
import { EtpContentType, ResqmlClient } from "../client/ResqmlClient";

import { ResqmlWorkProductComponent } from "./WorkProductComponent";
import { OSDUContext, ResqmlOSDUMap } from "./OsduContext";

import {
  Data,
  PersistedCollection
} from "./Generated/work-product-component/PersistedCollection.1.2.0";

export class PersistedCollectionPropertySetOSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml20.obj_PropertySet>>
  implements PersistedCollection
{
  public data: Data;

  constructor(xml: SimpleJson<resqml20.obj_PropertySet>, context: OSDUContext) {
    super(xml, context, "PersistedCollection.1.2.0");
    this.data = {};
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_PropertySet>,
    client: ResqmlClient
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

    const MemberIDs: string[] | undefined =
      xml.Properties.length === 0 ? undefined : [];
    for (const r of xml.Properties) {
      MemberIDs?.push(
        (await PersistedCollectionPropertySetOSDU.dorToSrn(
          ReservoirDMSUrl,
          r,
          client,
          context
        )) ?? ""
      );
    }

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      HomogeneousMemberKind: oType?.osduKind(xml),
      MemberIDs,
      ParentCollectionID:
        xml.ParentSet && xml.ParentSet.length > 0
          ? await PersistedCollectionPropertySetOSDU.dorToSrn(
              ReservoirDMSUrl,
              xml.ParentSet[0],
              client,
              context
            )
          : undefined,
      /**
       * Purpose of the Collection
       */
      PurposeID: undefined,

      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

export const PersistedCollectionPropertySetManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_PropertySet>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<PersistedCollectionPropertySetOSDU> =>
  new PersistedCollectionPropertySetOSDU(xml, context).initData(
    uri,
    xml,
    client
  );
