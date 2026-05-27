import * as resqml22 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  EarthModelInterpretation
} from "./Generated/work-product-component/EarthModelInterpretation.1.2.0";

export class EarthModelInterpretation22OSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml22.EarthModelInterpretation>
  >
  implements EarthModelInterpretation
{
  public data: Data;

  constructor(
    xml: SimpleJson<resqml22.EarthModelInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "EarthModelInterpretation.1.2.0");
    this.data = {};
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.EarthModelInterpretation>,
    client: ResqmlClient
  ): Promise<EarthModelInterpretation22OSDU> {
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

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

export const EarthModelInterpretation22Manifest = async (
  uri: string,
  xml: SimpleJson<resqml22.EarthModelInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<EarthModelInterpretation22OSDU> =>
  new EarthModelInterpretation22OSDU(xml, context).initData(uri, xml, client);
