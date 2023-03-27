import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import { ResqmlClient } from "../client/ResqmlClient";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  GridConnectionSetRepresentation
} from "./Generated/work-product-component/GridConnectionSetRepresentation.1.1.0";

export class GridConnectionSetRepresentationOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_GridConnectionSetRepresentation>
  >
  implements GridConnectionSetRepresentation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.obj_GridConnectionSetRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "GridConnectionSetRepresentation.1.1.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_GridConnectionSetRepresentation>,
    client: ResqmlClient
  ): Promise<GridConnectionSetRepresentationOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    const gridUris = xml.Grid.map(d =>
      ResqmlWorkProductComponent.dorToUri(ReservoirDMSUrl, d)
    );
    const grids = await client.getResolvedObjects(gridUris);

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      IndexableElementCount: [
        {
          Count: xml.Count,
          IndexableElementID: context.addReferenceData(
            "IndexableElement",
            "CellsCells"
          )
        }
      ],
      InterpretationID: this.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedInterpretation
      ),
      InterpretationName: xml.RepresentedInterpretation?.Title,
      LocalModelCompoundCrsID: undefined,
      RealizationIndex: undefined,
      TimeSeries: undefined, //{ TimeIndex: 0, TimeSeriesID: "" },
      ConnectionCount: xml.Count,
      GridRepresentationIDs: gridUris.map(g => context.uriToSrn(g) || ""),

      InterpretationIDs: grids
        .map(
          g =>
            this.dorToSrn(
              ReservoirDMSUrl,
              (g as SimpleJson<resqml20.AbstractRepresentation>)
                .RepresentedInterpretation
            ) || ""
        )
        .filter(a => a !== ""),
      ExtensionProperties: undefined
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

export const GridConnectionSetRepresentationManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_GridConnectionSetRepresentation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<GridConnectionSetRepresentationOSDU> =>
  new GridConnectionSetRepresentationOSDU(xml, context).initData(
    uri,
    xml,
    client
  );
