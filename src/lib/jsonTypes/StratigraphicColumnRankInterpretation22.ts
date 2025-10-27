import * as resqml22 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  StratigraphicColumnRankInterpretation
} from "./Generated/work-product-component/StratigraphicColumnRankInterpretation.1.3.0";

export class StratigraphicColumnRankInterpretation22OSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml22.StratigraphicColumnRankInterpretation>
  >
  implements StratigraphicColumnRankInterpretation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml22.StratigraphicColumnRankInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "StratigraphicColumnRankInterpretation.1.3.0");
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.StratigraphicColumnRankInterpretation>,
    client: ResqmlClient
  ): Promise<StratigraphicColumnRankInterpretation22OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    const StratigraphicUnitInterpretationSet: string[] | undefined =
      xml.StratigraphicUnits.length === 0 ? undefined : [];
    for (const s of xml.StratigraphicUnits) {
      StratigraphicUnitInterpretationSet?.push(
        (await StratigraphicColumnRankInterpretation22OSDU.dorToSrn(
          ReservoirDMSUrl,
          s,
          client,
          context
        )) || ""
      );
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
      SequenceStratigraphicSchemaType: context.addReferenceData(
        "SequenceStratigraphicSchemaType",
        undefined
      ),

      StratigraphicColumnRankUnitType: context.addReferenceData(
        "StratigraphicColumnRankUnitType",
        undefined
      ),

      StratigraphicRoleType: context.addReferenceData(
        "StratigraphicRoleType",
        "Chronostratigraphic"
      ),

      StratigraphicUnitInterpretationSet,

      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

export const StratigraphicColumnRankInterpretation22Manifest = async (
  uri: string,
  xml: SimpleJson<resqml22.StratigraphicColumnRankInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<StratigraphicColumnRankInterpretation22OSDU> =>
  new StratigraphicColumnRankInterpretation22OSDU(xml, context).initData(
    uri,
    xml,
    client
  );
