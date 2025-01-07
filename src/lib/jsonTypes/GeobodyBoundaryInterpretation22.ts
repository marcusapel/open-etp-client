import * as resqml22 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  GeobodyBoundaryInterpretation
} from "./Generated/work-product-component/GeobodyBoundaryInterpretation.1.2.0";

export class GeobodyBoundaryInterpretation22OSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml22.GeobodyBoundaryInterpretation>
  >
  implements GeobodyBoundaryInterpretation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml22.GeobodyBoundaryInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "GeobodyBoundaryInterpretation.1.2.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.GeobodyBoundaryInterpretation>,
    client: ResqmlClient
  ): Promise<GeobodyBoundaryInterpretation22OSDU> {
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

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

export const GeobodyBoundaryInterpretation22Manifest = async (
  uri: string,
  xml: SimpleJson<resqml22.GeobodyBoundaryInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<GeobodyBoundaryInterpretation22OSDU> =>
  new GeobodyBoundaryInterpretation22OSDU(xml, context).initData(
    uri,
    xml,
    client
  );
