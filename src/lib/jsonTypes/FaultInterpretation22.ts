import * as resqml22 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  FaultInterpretation
} from "./Generated/work-product-component/FaultInterpretation.1.3.0";

export class FaultInterpretation22OSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml22.FaultInterpretation>>
  implements FaultInterpretation
{
  public data: Data;

  constructor(
    xml: SimpleJson<resqml22.FaultInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "FaultInterpretation.1.3.0");
    this.data = {};
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.FaultInterpretation>,
    client: ResqmlClient
  ): Promise<FaultInterpretation22OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    const FaultThrowDescriptions = [];

    if (xml.ThrowInterpretation) {
      for (const t of xml.ThrowInterpretation) {
        const strAge = await this.age(client, ReservoirDMSUrl, xml);
        let MaximumAge = strAge;
        let MinimumAge = strAge;
        if (t.HasOccurredDuring !== undefined) {
          const occ =
            t.HasOccurredDuring as SimpleJson<resqml22.GeneticBoundaryBasedTimeInterval>;
          if (occ.ChronoBottom !== undefined) {
            const bot = (await FaultInterpretation22OSDU.getObjectFromDor(
              client,
              ReservoirDMSUrl,
              occ.ChronoBottom,
              context
            )) as SimpleJson<resqml22.StratigraphicUnitInterpretation>;
            MaximumAge = await this.age(client, ReservoirDMSUrl, bot);
          }
          if (occ.ChronoTop !== undefined) {
            const top = (await FaultInterpretation22OSDU.getObjectFromDor(
              client,
              ReservoirDMSUrl,
              occ.ChronoTop,
              context
            )) as SimpleJson<resqml22.StratigraphicUnitInterpretation>;
            MinimumAge = await this.age(client, ReservoirDMSUrl, top);
          }

          FaultThrowDescriptions.push({
            FaultThrowTypeID: context.addReferenceData(
              "FaultThrowType",
              this.capitalize(t.Throw[0])
            ),
            MinimumAge,
            MaximumAge
          });
        }
      }
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

      FaultThrowDescriptions:
        FaultThrowDescriptions.length === 0
          ? undefined
          : FaultThrowDescriptions,
      IsListric: xml.IsListric,
      /**
       * Specifies whether the fault is considered sealed
       */
      IsSealed: undefined,
      //TODO: Add frame of reference
      MaximumFaultThrowValue: xml.MaximumThrow?._,
      RepresentativeDipAngle: xml.MeanDip?._,
      RepresentativeDipDirection: xml.MeanDip
        ? {
            NorthKind: context.addReferenceData(
              "AzimuthReferenceType",
              "MagneticNorth"
            ),
            Value: xml.MeanDip?._
          }
        : undefined,

      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

export const FaultInterpretation22Manifest = async (
  uri: string,
  xml: SimpleJson<resqml22.FaultInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<FaultInterpretation22OSDU> =>
  new FaultInterpretation22OSDU(xml, context).initData(uri, xml, client);
