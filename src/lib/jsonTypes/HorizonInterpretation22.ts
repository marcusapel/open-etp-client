import * as resqml22 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  HorizonInterpretation
} from "./Generated/work-product-component/HorizonInterpretation.1.2.0";

export class HorizonInterpretation22OSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml22.HorizonInterpretation>>
  implements HorizonInterpretation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml22.HorizonInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "HorizonInterpretation.1.2.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.HorizonInterpretation>,
    client: ResqmlClient
  ): Promise<HorizonInterpretation22OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    const SequenceStratigraphySurfaceTypeID = context.addReferenceData(
      "SequenceStratigraphySurfaceType",
      this.capitalize(xml.SequenceStratigraphySurface)
    );

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
      SequenceStratigraphySurfaceTypeID,
      StratigraphicRoleTypeID: context.addReferenceData(
        "StratigraphicRoleType",
        "Chronostratigraphic"
      ),
      isConformableAbove: xml.IsConformableAbove,
      isConformableBelow: xml.IsConformableBelow,
      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

export const HorizonInterpretation22Manifest = async (
  uri: string,
  xml: SimpleJson<resqml22.HorizonInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<HorizonInterpretation22OSDU> =>
  new HorizonInterpretation22OSDU(xml, context).initData(uri, xml, client);
