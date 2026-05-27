import * as resqml22 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";
import { EtpUri, ResqmlClient } from "../client/ResqmlClient";

import { OSDUContext } from "./OsduContext";
import {
  ResqmlWorkProductComponent,
  getIntegerValues
} from "./WorkProductComponent";

import {
  AbstractGridRepresentation,
  FrameOfReferenceMetaDataItem,
  StratigraphicUnits,
  UnstructuredGridRepresentation
} from "./Generated/work-product-component/UnstructuredGridRepresentation.1.2.0";

export class UnstructuredGridRepresentation22OSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml22.UnstructuredGridRepresentation>
  >
  implements UnstructuredGridRepresentation
{
  public data: AbstractGridRepresentation = {};
  public meta?: FrameOfReferenceMetaDataItem[];

  constructor(
    xml: SimpleJson<resqml22.UnstructuredGridRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "UnstructuredGridRepresentation.1.2.0");
  }

  private async stratigraphicUnits(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.AbstractGridRepresentation>,
    client: ResqmlClient
  ): Promise<StratigraphicUnits | undefined> {
    if (!this.__context) {
      return undefined;
    }
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
            (await ResqmlWorkProductComponent.dorToSrn(
              ReservoirDMSUrl,
              xml.IntervalStratigraphicUnits
                ?.StratigraphicOrganizationInterpretation,
              client,
              this.__context
            )) || "",
          StratigraphicUnitsIndices: stratiIndices.map(i => [i])
        };
      }
    } catch (e) {
      return undefined;
    }
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.UnstructuredGridRepresentation>,
    client: ResqmlClient
  ): Promise<UnstructuredGridRepresentation22OSDU> {
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
            "cells"
          )
        }
      ],
      InterpretationID: await ResqmlWorkProductComponent.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedObject,
        client,
        context
      ),
      InterpretationName: xml.RepresentedObject?.Title,
      LocalModelCompoundCrsID: await ResqmlWorkProductComponent.dorToSrn(
        ReservoirDMSUrl,
        xml.Geometry?.LocalCrs,
        client,
        context
      ),
      RealizationIndex: undefined,
      TimeSeries: undefined, //{ TimeIndex: 0, TimeSeriesID: "" },
      HasFiniteElementSubnodes:
        xml.Geometry?.UnstructuredSubnodeTopology !== undefined,
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
          "nodes"
        )
      });
    }
    if (xml?.Geometry?.FaceCount !== undefined) {
      this.data.IndexableElementCount?.push({
        Count: xml?.Geometry?.FaceCount,
        IndexableElementID: context.addReferenceData(
          "IndexableElement",
          "faces"
        )
      });
    }

    this.assignExtraMetaData(xml.ExtensionNameValue);

    if (xml.Geometry) {
      const si = await ResqmlWorkProductComponent.createSpatialInfo(
        client,
        dataspaceUri.uri,
        [xml.Geometry],
        context
      );

      this.data.SpatialPoint = si.SpatialPoint;
      this.data.SpatialArea = si.SpatialArea;
      this.meta = [si.FrameOfReferenceCRS];
    }

    delete this.__context;
    return this;
  }
}

export const UnstructuredGridRepresentation22Manifest = async (
  uri: string,
  xml: SimpleJson<resqml22.UnstructuredGridRepresentation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<UnstructuredGridRepresentation22OSDU> =>
  new UnstructuredGridRepresentation22OSDU(xml, context).initData(
    uri,
    xml,
    client
  );
