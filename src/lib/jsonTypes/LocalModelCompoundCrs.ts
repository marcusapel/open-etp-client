import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  LocalModelCompoundCRS
} from "./Generated/work-product-component/LocalModelCompoundCrs.1.2.0";

export class LocalModelCompoundCrsOSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml20.obj_LocalDepth3dCrs>>
  implements LocalModelCompoundCRS
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.obj_LocalDepth3dCrs>,
    context: OSDUContext
  ) {
    super(xml, context, "LocalModelCompoundCrs.1.2.0");
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_LocalDepth3dCrs>
  ): Promise<LocalModelCompoundCrsOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

export const LocalModelCompoundCrsManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_LocalDepth3dCrs>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<LocalModelCompoundCrsOSDU> =>
  new LocalModelCompoundCrsOSDU(xml, context).initData(uri, xml);
