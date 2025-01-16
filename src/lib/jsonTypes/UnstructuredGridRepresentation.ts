import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";
import { EtpUri, ResqmlClient } from "../client/ResqmlClient";

import type { OSDUContext } from "./OsduContext";
import {
  ResqmlWorkProductComponent,
  getIntegerValues
} from "./WorkProductComponent";

import {
  AbstractGridRepresentation,
  StratigraphicUnits,
  UnstructuredGridRepresentation
} from "./Generated/work-product-component/UnstructuredGridRepresentation.1.2.0";

export class UnstructuredGridRepresentationOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_UnstructuredGridRepresentation>
  >
  implements UnstructuredGridRepresentation
{
  public data: AbstractGridRepresentation = {};

  constructor(
    xml: SimpleJson<resqml20.obj_UnstructuredGridRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "UnstructuredGridRepresentation.1.2.0");
  }

  private async stratigraphicUnits(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.AbstractGridRepresentation>,
    client: ResqmlClient
  ): Promise<StratigraphicUnits | undefined> {
    try {
      const dataspaceUri = EtpUri.createDataSpaceUri(
        new EtpUri(ReservoirDMSUrl).dataSpace
      ).uri;
      const stratiIndices = xml.CellStratigraphicUnits?.UnitIndices
        ? await getIntegerValues(
            dataspaceUri,
            xml.CellStratigraphicUnits?.UnitIndices,
            client
          )
        : undefined;

      if (stratiIndices) {
        return {
          StratigraphicColumnRankInterpretationID:
            (await this.dorToSrn(
              ReservoirDMSUrl,
              xml.CellStratigraphicUnits?.StratigraphicOrganization,
              client
            )) ?? "",
          StratigraphicUnitsIndices: stratiIndices.map(i => [i])
        };
      }
    } catch (e) {
      return undefined;
    }
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_UnstructuredGridRepresentation>,
    client: ResqmlClient
  ): Promise<UnstructuredGridRepresentationOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    const dataspaceUri = EtpUri.createDataSpaceUri(
      new EtpUri(ReservoirDMSUrl).dataSpace
    );

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      IndexableElementCount: [
        {
          Count: xml.CellCount,
          IndexableElementID: context.addReferenceData(
            "IndexableElement",
            "Cells"
          )
        }
      ],
      InterpretationID: await this.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedInterpretation,
        client
      ),
      InterpretationName: xml.RepresentedInterpretation?.Title,
      LocalModelCompoundCrsID: await this.dorToSrn(
        ReservoirDMSUrl,
        xml.Geometry?.LocalCrs,
        client
      ),
      RealizationIndex: undefined,
      TimeSeries: undefined, //{ TimeIndex: 0, TimeSeriesID: "" },
      HasFiniteElementSubnodes: xml.Geometry?.SubnodeTopology !== undefined,
      HasNaNGeometry: undefined,
      ParentGridID: undefined,
      RockFluidOrganizationInterpretationIDS: undefined,
      StratigraphicUnits: await this.stratigraphicUnits(
        ReservoirDMSUrl,
        xml,
        client
      ),
      HasNoGeometry: xml.Geometry === undefined,
      ExtensionProperties: undefined
    };

    if (xml?.Geometry?.NodeCount !== undefined) {
      this.data.IndexableElementCount?.push({
        Count: xml?.Geometry?.NodeCount,
        IndexableElementID: context.addReferenceData(
          "IndexableElement",
          "Nodes"
        )
      });
    }
    if (xml?.Geometry?.FaceCount !== undefined) {
      this.data.IndexableElementCount?.push({
        Count: xml?.Geometry?.FaceCount,
        IndexableElementID: context.addReferenceData(
          "IndexableElement",
          "Faces"
        )
      });
    }

    this.assignExtraMetaData(xml.ExtraMetadata);

    if (xml.Geometry) {
      const si = await this.createSpatialInfo(client, dataspaceUri.uri, [
        xml.Geometry
      ]);

      this.data.SpatialPoint = si.SpatialPoint;
      this.data.SpatialArea = si.SpatialArea;
      this.meta = [si.FrameOfReferenceCRS];
    }

    delete this.__context;
    return this;
  }
}

export const UnstructuredGridRepresentationManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_UnstructuredGridRepresentation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<UnstructuredGridRepresentationOSDU> =>
  new UnstructuredGridRepresentationOSDU(xml, context).initData(
    uri,
    xml,
    client
  );
