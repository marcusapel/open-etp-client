import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  HorizonInterpretation
} from "./Generated/work-product-component/HorizonInterpretation.1.2.0";

export class HorizonInterpretationOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_HorizonInterpretation>
  >
  implements HorizonInterpretation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.obj_HorizonInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "HorizonInterpretation.1.2.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_HorizonInterpretation>,
    client: ResqmlClient
  ): Promise<HorizonInterpretationOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    let isConformableAbove: boolean | undefined = undefined;
    let isConformableBelow: boolean | undefined = undefined;
    xml.BoundaryRelation?.forEach(b => {
      const conAbove = b === "conformable" || b === "unconformable below";
      const conBelow = b === "conformable" || b === "unconformable above";
      isConformableAbove = isConformableAbove
        ? isConformableAbove && conAbove
        : conAbove;
      isConformableBelow = isConformableBelow
        ? isConformableAbove && conBelow
        : conBelow;
    });

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
      isConformableAbove,
      isConformableBelow,
      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

export const HorizonInterpretationManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_HorizonInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<HorizonInterpretationOSDU> =>
  new HorizonInterpretationOSDU(xml, context).initData(uri, xml, client);
