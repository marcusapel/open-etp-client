import * as eml23 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/commonv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  LocalModelCompoundCRS
} from "./Generated/work-product-component/LocalModelCompoundCrs.1.2.0";

export class LocalModelCompoundCrs23OSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<eml23.LocalEngineeringCompoundCrs>
  >
  implements LocalModelCompoundCRS
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<eml23.LocalEngineeringCompoundCrs>,
    context: OSDUContext
  ) {
    super(xml, context, "LocalModelCompoundCrs.1.2.0");
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<eml23.LocalEngineeringCompoundCrs>
  ): Promise<LocalModelCompoundCrs23OSDU> {
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

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

export const LocalModelCompoundCrs23Manifest = async (
  uri: string,
  xml: SimpleJson<eml23.LocalEngineeringCompoundCrs>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<LocalModelCompoundCrs23OSDU> =>
  new LocalModelCompoundCrs23OSDU(xml, context).initData(uri, xml);
