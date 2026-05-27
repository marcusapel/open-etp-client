import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  SubRepresentation
} from "./Generated/work-product-component/SubRepresentation.1.2.0";

export class SubRepresentationOSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml20.obj_SubRepresentation>>
  implements SubRepresentation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.obj_SubRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "SubRepresentation.1.2.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_SubRepresentation>,
    client: ResqmlClient
  ): Promise<SubRepresentationOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    const Count = xml.SubRepresentationPatch.map(p => p.Count).reduce(
      (p, c) => {
        return p + c;
      },
      0
    );
    const IndexableElementID =
      context.addReferenceData(
        "IndexableElement",
        xml.SubRepresentationPatch[0].ElementIndices[0].IndexableElement.replace(
          " ",
          "%20"
        )
      ) || "";

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      IndexableElementCount: [
        {
          Count,
          IndexableElementID
        }
      ],
      InterpretationID: await SubRepresentationOSDU.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedInterpretation,
        client,
        context
      ),
      InterpretationName: xml.RepresentedInterpretation?.Title,
      LocalModelCompoundCrsID: undefined,
      RealizationIndex: undefined,
      TimeSeries: undefined, //{ TimeIndex: 0, TimeSeriesID: "" },
      ElementCount: Count,
      IndexableElementID,
      SupportingRepresentationIDs: [
        (await SubRepresentationOSDU.dorToSrn(
          ReservoirDMSUrl,
          xml.SupportingRepresentation,
          client,
          context
        )) || ""
      ],
      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}

export const SubRepresentationManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_SubRepresentation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<SubRepresentationOSDU> =>
  new SubRepresentationOSDU(xml, context).initData(uri, xml, client);
