import * as resqml22 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  StratigraphicColumn
} from "./Generated/work-product-component/StratigraphicColumn.1.2.0";

/**
 * Create OSDU StratigraphicColumn from Resqml 2.2 StratigraphicColumn
 *
 * @export
 * @class StratigraphicColumn22OSDU
 * @extends {ResqmlWorkProductComponent<SimpleJson<resqml22.StratigraphicColumn>>}
 * @implements {StratigraphicColumn}
 */
export class StratigraphicColumn22OSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml22.StratigraphicColumn>>
  implements StratigraphicColumn
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml22.StratigraphicColumn>,
    context: OSDUContext
  ) {
    super(xml, context, "StratigraphicColumn.1.2.0");
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.StratigraphicColumn>,
    client: ResqmlClient
  ): Promise<StratigraphicColumn22OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    const StratigraphicColumnRankInterpretationSet = [];
    for (const r of xml.Ranks) {
      StratigraphicColumnRankInterpretationSet.push(
        (await StratigraphicColumn22OSDU.dorToSrn(
          ReservoirDMSUrl,
          r,
          client,
          context
        )) || ""
      );
    }
    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      StratigraphicColumnRankInterpretationSet,
      StratigraphicColumnValidityAreaType: undefined,
      ValidationDate: undefined,
      ValueChainStatusType: undefined,
      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

/**
 * Convert RESQML 2.2 stratigraphic column to OSDU type
 *
 * @param {string} uri
 * @param {SimpleJson<resqml22.StratigraphicColumn>} xml
 * @param {OSDUContext} context
 * @param {ResqmlClient} client
 * @return {*}  {Promise<StratigraphicColumn22OSDU>}
 */
export const StratigraphicColumn22Manifest = async (
  uri: string,
  xml: SimpleJson<resqml22.StratigraphicColumn>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<StratigraphicColumn22OSDU> =>
  new StratigraphicColumn22OSDU(xml, context).initData(uri, xml, client);
