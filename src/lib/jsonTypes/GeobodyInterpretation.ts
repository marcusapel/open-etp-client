import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  GeobodyInterpretation
} from "./Generated/work-product-component/GeobodyInterpretation.1.3.0";

export class GeobodyInterpretationOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_GeobodyInterpretation>
  >
  implements GeobodyInterpretation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.obj_GeobodyInterpretation>,
    context: OSDUContext
  ) {
    super(xml, context, "GeobodyInterpretation.1.3.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_GeobodyInterpretation>,
    client: ResqmlClient
  ): Promise<GeobodyInterpretationOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
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

      GeologicUnitShapeTypeID: context.addReferenceData(
        "GeologicUnitShapeType",
        this.capitalize(xml.Geobody3dShape)
      ),
      IsIntrusive: undefined,
      LithologyTypeID: context.addReferenceData(
        "LithologyType",
        this.capitalize(xml.GeologicUnitComposition)
      ),

      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

export const GeobodyInterpretationManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_GeobodyInterpretation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<GeobodyInterpretationOSDU> =>
  new GeobodyInterpretationOSDU(xml, context).initData(uri, xml, client);
