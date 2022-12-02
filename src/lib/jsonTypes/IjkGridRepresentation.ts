import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";
import { EtpUri, ResqmlClient } from "../client/ResqmlClient";

import { IDataSubarray } from "../common/EtpTypes";

import { OSDUContext } from "./OsduContext";
import {
  ResqmlWorkProductComponent,
  getIntegerValues,
  visitBooleanValues
} from "./WorkProductComponent";

import {
  Abstract,
  IjkGridRepresentation,
  StratigraphicUnits
} from "./Generated/work-product-component/IjkGridRepresentation.1.0.0";

enum ExpansionInDirection {
  I = "I",
  J = "J",
  K = "K"
}

export class IjkGridRepresentationOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_IjkGridRepresentation>
  >
  implements IjkGridRepresentation
{
  public data: Abstract = {};

  constructor(
    xml: SimpleJson<resqml20.obj_IjkGridRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "IjkGridRepresentation.1.0.0");
  }

  private async activeCellCount(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_IjkGridRepresentation>,
    client: ResqmlClient
  ): Promise<number | undefined> {
    if (!xml.Geometry?.CellGeometryIsDefined) {
      return xml.Ni * xml.Nj * xml.Nk;
    }
    try {
      let count = 0;
      const dataspaceUri = EtpUri.createDataSpaceUri(
        new EtpUri(ReservoirDMSUrl).dataSpace
      ).uri;
      await visitBooleanValues(
        dataspaceUri,
        xml.Geometry?.CellGeometryIsDefined,
        client,
        (values: boolean[] | number[] | bigint[], data: IDataSubarray) => {
          const v = values as boolean[];
          v.forEach(b => (count += b ? 1 : 0));
        }
      );
      return count;
    } catch (e) {
      return undefined;
    }
  }

  private async stratigraphicUnits(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_IjkGridRepresentation>,
    client: ResqmlClient
  ): Promise<StratigraphicUnits | undefined> {
    try {
      const dataspaceUri = EtpUri.createDataSpaceUri(
        new EtpUri(ReservoirDMSUrl).dataSpace
      ).uri;
      const stratiIndices = xml.IntervalStratigraphicUnits?.UnitIndices
        ? await getIntegerValues(
            dataspaceUri,
            xml.IntervalStratigraphicUnits?.UnitIndices,
            client
          )
        : undefined;

      if (stratiIndices) {
        return {
          StratigraphicColumnRankInterpretationID:
            this.dorToSrn(
              ReservoirDMSUrl,
              xml.IntervalStratigraphicUnits?.StratigraphicOrganization
            ) || "",
          StratigraphicUnitsIndices: stratiIndices.map(i => [i])
        };
      }
    } catch (e) {
      return undefined;
    }
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_IjkGridRepresentation>,
    client: ResqmlClient
  ): Promise<IjkGridRepresentationOSDU> {
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
          Count: xml.Ni * xml.Nj * xml.Nk,
          IndexableElementID: context.addReferenceData(
            "IndexableElement",
            "Cells"
          )
        },
        {
          Count: (xml.Ni - 1) * (xml.Nj - 1) * (xml.Nk - 1),
          IndexableElementID: context.addReferenceData(
            "IndexableElement",
            "Nodes"
          )
        }
      ],
      InterpretationID: this.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedInterpretation
      ),
      InterpretationName: xml.RepresentedInterpretation?.Title,
      LocalModelCompoundCrsID: this.dorToSrn(
        ReservoirDMSUrl,
        xml.Geometry?.LocalCrs
      ),
      RealizationIndex: undefined,
      TimeSeries: undefined, //{ TimeIndex: 0, TimeSeriesID: "" },
      ActiveCellCount: await this.activeCellCount(ReservoirDMSUrl, xml, client),
      HasFiniteElementSubnodes: xml.Geometry?.SubnodeTopology !== undefined,
      HasNaNGeometry: undefined,
      ParentGridID: undefined,
      RockFluidOrganizationInterpretationIDS: undefined,
      StratigraphicUnits: await this.stratigraphicUnits(
        ReservoirDMSUrl,
        xml,
        client
      ),
      ExpansionInDirection: ExpansionInDirection.K,
      HasCollocatedNodeInKDirection:
        xml.Geometry?.NodeIsColocatedInKDirection !== undefined, //TODO
      HasKGaps:
        xml.KGaps && xml.KGaps.Count !== undefined && xml.KGaps.Count > 0,
      HasLateralGaps: xml.Geometry?.IjGaps !== undefined,
      HasParametricGeometry:
        xml.Geometry?.Points.$type === "Point3dParametricArray",
      HasNoGeometry: xml.Geometry === undefined,
      HasSplitNode: xml.Geometry?.SplitNodes !== undefined,
      HasTruncations: undefined,
      KDirectionID: context.addReferenceData(
        "KDirectionType",
        this.capitalize(xml.Geometry?.KDirection)
      ),
      Ni: xml.Ni,
      Nj: xml.Nj,
      Nk: xml.Nk,
      PillarShapeID: context.addReferenceData("PillarShapeType", "Curved"), //Straight, Linear, Curved
      IsRadial: xml.RadialGridIsComplete,
      IsRightHanded: xml.Geometry?.GridIsRighthanded,
      ExtensionProperties: {
        ReservoirDMSUrl
      }
    };

    const dors = await this.getCreatingObjects(client, ReservoirDMSUrl);
    if (dors.length > 0) {
      this.data.LineageAssertions = [];
      for (const d of dors) {
        const l = this.dorToSrn(ReservoirDMSUrl, d);
        if (l !== undefined) {
          this.data.LineageAssertions.push();
        }
      }
    }

    xml.ExtraMetadata?.forEach(x => {
      if (this.data.ExtensionProperties) {
        this.data.ExtensionProperties[x.Name] = x.Value;
      }
    });

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

export const IjkGridRepresentationManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.obj_IjkGridRepresentation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<IjkGridRepresentationOSDU> =>
  new IjkGridRepresentationOSDU(xml, context).initData(uri, xml, client);
