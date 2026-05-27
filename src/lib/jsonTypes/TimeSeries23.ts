import * as eml23 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/commonv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  TimeSeries
} from "./Generated/work-product-component/TimeSeries.1.2.0";

export class TimeSeries23OSDU
  extends ResqmlWorkProductComponent<SimpleJson<eml23.TimeSeries>>
  implements TimeSeries
{
  public data: Data = {};

  constructor(xml: SimpleJson<eml23.TimeSeries>, context: OSDUContext) {
    super(xml, context, "TimeSeries.1.2.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<eml23.TimeSeries>
  ): Promise<TimeSeries23OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    let offset: (number | undefined)[] | undefined = xml.Time.map(
      t => t.AgeOffsetAttribute
    );
    if (offset.filter(o => o !== undefined).length === 0) {
      offset = undefined;
    }

    const GeologicTimeValues = offset ? (offset as number[]) : undefined;

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      GeologicTimeValues,
      UTCDateTimeValues: xml.Time.map(t => t.DateTime.toISOString()),
      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

export const TimeSeries23Manifest = async (
  uri: string,
  xml: SimpleJson<eml23.TimeSeries>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<TimeSeries23OSDU> =>
  new TimeSeries23OSDU(xml, context).initData(uri, xml);
