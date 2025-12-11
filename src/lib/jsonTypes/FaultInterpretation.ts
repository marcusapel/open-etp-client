import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  FaultInterpretation
} from "./Generated/work-product-component/FaultInterpretation.1.3.0";

export class FaultInterpretationOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_FaultInterpretation>
  >
  implements FaultInterpretation
{
  public data: Data;

  constructor(
    xml: SimpleJson<resqml20.obj_FaultInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "FaultInterpretation.1.3.0");
    this.data = {};
  }
  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_FaultInterpretation>,
    client: ResqmlClient
  ): Promise<FaultInterpretationOSDU> {
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
        if (t.HasOccuredDuring?.ChronoBottom !== undefined) {
          const bot = (await FaultInterpretationOSDU.getObjectFromDor(
            client,
            ReservoirDMSUrl,
            t.HasOccuredDuring?.ChronoBottom,
            context
          )) as SimpleJson<resqml20.obj_StratigraphicUnitInterpretation>;
          MaximumAge = await this.age(client, ReservoirDMSUrl, bot);
        }
        if (t.HasOccuredDuring?.ChronoTop !== undefined) {
          const top = (await FaultInterpretationOSDU.getObjectFromDor(
            client,
            ReservoirDMSUrl,
            t.HasOccuredDuring?.ChronoTop,
            context
          )) as SimpleJson<resqml20.obj_StratigraphicUnitInterpretation>;
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

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

export const FaultInterpretationManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_FaultInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<FaultInterpretationOSDU> =>
  new FaultInterpretationOSDU(xml, context).initData(uri, xml, client);
