import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  LocalModelFeature
} from "./Generated/work-product-component/LocalModelFeature.1.2.0";

export class LocalModelFeatureOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_OrganizationFeature>
  >
  implements LocalModelFeature
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.obj_OrganizationFeature>,
    context: OSDUContext
  ) {
    super(xml, context, "LocalModelFeature.1.2.0");
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_OrganizationFeature>
  ): Promise<LocalModelFeatureOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),

      /**
       * When populated, the boundary feature has a wider scope and allows boundary feature
       * correlations across models.
       */
      ModelFeatureID: undefined,

      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

export const LocalModelFeatureManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_OrganizationFeature>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<LocalModelFeatureOSDU> =>
  new LocalModelFeatureOSDU(xml, context).initData(uri, xml);
