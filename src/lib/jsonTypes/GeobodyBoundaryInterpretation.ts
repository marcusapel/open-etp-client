import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  GeobodyBoundaryInterpretation
} from "./Generated/work-product-component/GeobodyBoundaryInterpretation.1.2.0";

export class GeobodyBoundaryInterpretationOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_GeobodyBoundaryInterpretation>
  >
  implements GeobodyBoundaryInterpretation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.obj_GeobodyBoundaryInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "GeobodyBoundaryInterpretation.1.2.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_GeobodyBoundaryInterpretation>,
    client: ResqmlClient
  ): Promise<GeobodyBoundaryInterpretationOSDU> {
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
      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

export const GeobodyBoundaryInterpretationManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_GeobodyBoundaryInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<GeobodyBoundaryInterpretationOSDU> =>
  new GeobodyBoundaryInterpretationOSDU(xml, context).initData(
    uri,
    xml,
    client
  );
