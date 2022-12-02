import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  TimeSeries
} from "./Generated/work-product-component/TimeSeries.1.0.0";

export class TimeSeriesOSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml20.obj_TimeSeries>>
  implements TimeSeries
{
  public data: Data = {};

  constructor(xml: SimpleJson<resqml20.obj_TimeSeries>, context: OSDUContext) {
    super(xml, context, "TimeSeries.1.0.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_TimeSeries>
  ): Promise<TimeSeriesOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    let offset: (number | undefined)[] | undefined = xml.Time.map(
      t => t.YearOffset
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
      ExtensionProperties: {
        ReservoirDMSUrl
      }
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

export const TimeSeriesManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_TimeSeries>,
  context: OSDUContext,
  _client: ResqmlClient
): Promise<TimeSeriesOSDU> =>
  new TimeSeriesOSDU(xml, context).initData(uri, xml);
