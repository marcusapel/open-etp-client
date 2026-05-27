import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  StratigraphicColumn
} from "./Generated/work-product-component/StratigraphicColumn.1.2.0";

/**
 * Create OSDU StratigraphicColumn from Resqml StratigraphicColumn
 *
 * @export
 * @class StratigraphicColumnOSDU
 * @extends {ResqmlWorkProductComponent<SimpleJson<resqml20.obj_StratigraphicColumn>>}
 * @implements {StratigraphicColumn}
 */
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
    super(xml, context, "StratigraphicColumn.1.2.0");
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_StratigraphicColumn>,
    client: ResqmlClient
  ): Promise<StratigraphicColumnOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    const StratigraphicColumnRankInterpretationSet = [];
    for (const r of xml.Ranks) {
      StratigraphicColumnRankInterpretationSet.push(
        (await StratigraphicColumnOSDU.dorToSrn(
          ReservoirDMSUrl,
          r,
          client,
          context
        )) ?? ""
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

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

/**
 * Convert RESQML stratigraphic column to OSDU type
 *
 * @param {string} uri
 * @param {SimpleJson<resqml20.obj_StratigraphicColumn>} xml
 * @param {OSDUContext} context
 * @param {ResqmlClient} client
 * @returns {Promise<StratigraphicColumnOSDU>}
 */
export const StratigraphicColumnManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_StratigraphicColumn>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<StratigraphicColumnOSDU> =>
  new StratigraphicColumnOSDU(xml, context).initData(uri, xml, client);
