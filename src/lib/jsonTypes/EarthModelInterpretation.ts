import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  EarthModelInterpretation
} from "./Generated/work-product-component/EarthModelInterpretation.1.2.0";

export class EarthModelInterpretationOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_EarthModelInterpretation>
  >
  implements EarthModelInterpretation
{
  public data: Data;

  constructor(
    xml: SimpleJson<resqml20.obj_EarthModelInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "EarthModelInterpretation.1.2.0");
    this.data = {};
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_EarthModelInterpretation>,
    client: ResqmlClient
  ): Promise<EarthModelInterpretationOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      ...(await this.AbstractInterpretation(
        ReservoirDMSUrl,
        xml,
        client,
        context
      )),

      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

export const EarthModelInterpretationManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_EarthModelInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<EarthModelInterpretationOSDU> =>
  new EarthModelInterpretationOSDU(xml, context).initData(uri, xml, client);
