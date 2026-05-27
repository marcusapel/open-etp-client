import * as resqml22 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  SubRepresentation
} from "./Generated/work-product-component/SubRepresentation.1.2.0";

export class SubRepresentation22OSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml22.SubRepresentation>>
  implements SubRepresentation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml22.SubRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "SubRepresentation.1.2.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.SubRepresentation>,
    client: ResqmlClient
  ): Promise<SubRepresentation22OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    const IndexableElementID =
      context.addReferenceData(
        "IndexableElement",
        xml.IndexableElement.replace(" ", "%20")
      ) || "";

    const SupportingRepresentationIDs: string[] = [];
    let Count = 0;
    for (const s of xml.SubRepresentationPatch) {
      const infos = this.arrayInfos(s.Indices);
      Count += infos.rowCount ?? 0;
      const id =
        (await SubRepresentation22OSDU.dorToSrn(
          ReservoirDMSUrl,
          s.SupportingRepresentation,
          client,
          context
        )) || "";
      if (id) {
        SupportingRepresentationIDs.push(id);
      }
    }

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
      InterpretationID: await SubRepresentation22OSDU.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedObject,
        client,
        context
      ),
      InterpretationName: xml.RepresentedObject?.Title,
      LocalModelCompoundCrsID: undefined,
      RealizationIndex: undefined,
      TimeSeries: undefined, //{ TimeIndex: 0, TimeSeriesID: "" },
      ElementCount: Count,
      IndexableElementID,
      SupportingRepresentationIDs,
      ExtensionProperties: undefined
    };

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}

export const SubRepresentation22Manifest = async (
  uri: string,
  xml: SimpleJson<resqml22.SubRepresentation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<SubRepresentation22OSDU> =>
  new SubRepresentation22OSDU(xml, context).initData(uri, xml, client);
