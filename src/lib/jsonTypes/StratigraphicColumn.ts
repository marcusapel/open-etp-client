import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  StratigraphicColumn
} from "./Generated/work-product-component/StratigraphicColumn.1.1.0";

export class StratigraphicColumnOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_StratigraphicColumn>
  >
  implements StratigraphicColumn
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.obj_StratigraphicColumn>,
    context: OSDUContext
  ) {
    super(xml, context, "StratigraphicColumn.1.1.0");
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_StratigraphicColumn>
  ): Promise<StratigraphicColumnOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      StratigraphicColumnRankInterpretationSet: xml.Ranks.map(
        r => this.dorToSrn(ReservoirDMSUrl, r) || ""
      ),
      StratigraphicColumnValidityAreaType: undefined,
      ValidationDate: undefined,
      ValueChainStatusType: undefined,
      ExtensionProperties: undefined
    };

    xml.ExtraMetadata?.forEach(x => {
      if (this.data.ExtensionProperties) {
        this.data.ExtensionProperties[x.Name] = x.Value;
      }
    });

    delete this.__context;
    return this;
  }
}

export const StratigraphicColumnManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_StratigraphicColumn>,
  context: OSDUContext,
  _: ResqmlClient
): Promise<StratigraphicColumnOSDU> =>
  new StratigraphicColumnOSDU(xml, context).initData(uri, xml);
