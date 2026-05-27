import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  LocalRockVolumeFeature
} from "./Generated/work-product-component/LocalRockVolumeFeature.1.2.0";

export class LocalRockVolumeFeatureOSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml20.obj_BoundaryFeature>>
  implements LocalRockVolumeFeature
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.obj_BoundaryFeature>,
    context: OSDUContext
  ) {
    super(xml, context, "LocalRockVolumeFeature.1.2.0");
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_BoundaryFeature>
  ): Promise<LocalRockVolumeFeatureOSDU> {
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
      RockVolumeFeatureID: undefined,

      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

export const LocalRockVolumeFeatureManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_BoundaryFeature>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<LocalRockVolumeFeatureOSDU> =>
  new LocalRockVolumeFeatureOSDU(xml, context).initData(uri, xml);
