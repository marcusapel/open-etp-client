import * as witsml21 from "../mlTypes/xmlns/www.energistics.org/energyml/witsmlv21/witsmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent, ResqmlResource } from "./WorkProductComponent";

import { Data, WellLog } from "./Generated/work-product-component/WellLog.1.3.0";

/**
 * Extract OSDU WellLog WPC information from WITSML Log
 *
 * @export
 * @class WitsmlWellLogOSDU
 * @extends {ResqmlWorkProductComponent<SimpleJson<witsml21.Log>>}
 * @implements {WellLog}
 */
export class WitsmlWellLogOSDU
  extends ResqmlWorkProductComponent<SimpleJson<witsml21.Log>>
  implements WellLog
{
  public data: Data = {};

  constructor(xml: SimpleJson<witsml21.Log>, context: OSDUContext) {
    super(xml, context, "WellLog.1.3.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<witsml21.Log>,
    client: ResqmlClient
  ): Promise<WitsmlWellLogOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    let wellboreSrn: string | undefined;
    if (xml.Wellbore) {
      wellboreSrn = await ResqmlResource.dorToSrn(
        ReservoirDMSUrl,
        xml.Wellbore,
        client,
        context
      );
    }

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),

      WellboreID: wellboreSrn,

      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

export const WitsmlWellLogManifest = async (
  uri: string,
  xml: SimpleJson<witsml21.Log>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<WitsmlWellLogOSDU> =>
  new WitsmlWellLogOSDU(xml, context).initData(uri, xml, client);
