import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";
import { EtpUri, ResqmlClient } from "../client/ResqmlClient";

import { OSDUContext } from "./OsduContext";
import {
  ResqmlWorkProductComponent,
  getGeometries
} from "./WorkProductComponent";

import {
  Data,
  FrameOfReferenceMetaDataItem,
  SeismicFault
} from "./Generated/work-product-component/SeismicFault.1.3.0";

/**
 * Extract SeismicFault information from a resqml 2.0 AbstractRepresentation
 * @export
 * @class SeismicFaultOSDU
 * @extends {ResqmlWorkProductComponent<SimpleJson<resqml20.AbstractRepresentation>>}
 * @implements {SeismicFault}
 */
export class SeismicFaultOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.AbstractRepresentation>
  >
  implements SeismicFault
{
  public data: Data = {};
  public meta?: FrameOfReferenceMetaDataItem[];

  constructor(
    xml: SimpleJson<resqml20.AbstractRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "SeismicFault.2.0.0");
  }

  private elementCount(xml: SimpleJson<resqml20.AbstractRepresentation>):
    | undefined
    | {
        Count: number;
        IndexableElementID: string; //this.reference("IndexableElement", "cells")
      }[] {
    if (this.__context === undefined) {
      return undefined;
    }
    const context = this.__context;
    if (xml.$type === "resqml20.obj_Grid2dRepresentation") {
      const grid2d = xml as SimpleJson<resqml20.obj_Grid2dRepresentation>;
      return [
        {
          Count:
            (grid2d.Grid2dPatch.FastestAxisCount - 1) *
            (grid2d.Grid2dPatch.SlowestAxisCount - 1),
          IndexableElementID:
            context.addReferenceData("IndexableElement", "cells") || ""
        }
      ];
    } else if (xml.$type === "resqml20.obj_TriangulatedSetRepresentation") {
      const trig =
        xml as SimpleJson<resqml20.obj_TriangulatedSetRepresentation>;
      let Count = 0;
      trig.TrianglePatch.forEach(p => {
        Count += p.Count;
      });
      return [
        {
          Count,
          IndexableElementID:
            context.addReferenceData("IndexableElement", "cells") || ""
        }
      ];
    } else if (xml.$type === "resqml20.obj_PolylineSetRepresentation") {
      // const polyLine =
      //   xml as SimpleJson<resqml20.obj_PolylineSetRepresentation>;
    } else if (xml.$type === "resqml20.obj_PointSetRepresentation") {
      // const points = xml as SimpleJson<resqml20.obj_PointSetRepresentation>;
    } else if (xml.$type === "resqml20.obj_PolylineRepresentation") {
      const line = xml as SimpleJson<resqml20.obj_PolylineRepresentation>;
      return [
        {
          Count: line.NodePatch.Count + (line.IsClosed ? -1 : 0),
          IndexableElementID:
            context.addReferenceData("IndexableElement", "edges") || ""
        }
      ];
    }
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.AbstractRepresentation>,
    client: ResqmlClient
  ): Promise<SeismicFaultOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    const geometries = getGeometries(xml);
    let seismicSupport = undefined;
    for (const p of geometries) {
      if (p.SeismicCoordinates !== undefined) {
        seismicSupport = p.SeismicCoordinates.SeismicSupport;
      }
    }
    let BinGridID = undefined;
    if (
      seismicSupport !== undefined &&
      seismicSupport.$type === "resqml20.obj_Grid2dRepresentation"
    ) {
      BinGridID = await SeismicFaultOSDU.dorToSrn(
        ReservoirDMSUrl,
        seismicSupport,
        client,
        context
      );
    }

    const interpretation = xml.RepresentedInterpretation
      ?._data as SimpleJson<resqml20.obj_HorizonInterpretation>;

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      BinGridID,
      IndexableElementCount: this.elementCount(xml),
      InterpretationID: await SeismicFaultOSDU.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedInterpretation,
        client,
        context
      ),
      InterpretationName: interpretation.Citation.Title,
      LocalModelCompoundCrsID:
        geometries.length === 0
          ? undefined
          : await SeismicFaultOSDU.dorToSrn(
              ReservoirDMSUrl,
              geometries[0].LocalCrs,
              client,
              context
            ),
      RealizationIndex: undefined,
      TimeSeries: undefined,
      Interpreter: xml.Citation.Originator,
      Seismic2DInterpretationSetID: undefined,
      Seismic3DInterpretationSetID: undefined,
      SeismicLineGeometryIDs: undefined,
      SeismicPickingTypeID: undefined,
      SeismicTraceDataIDs: undefined,
      ExtensionProperties: undefined
    };

    if (geometries.length > 0) {
      const dataspaceUri = EtpUri.createDataSpaceUri(
        new EtpUri(ReservoirDMSUrl).dataSpace
      );
      const {
        SpatialPoint,
        SpatialArea,
        FrameOfReferenceCRS,
        NodeCount,
        Domain
      } = await SeismicFaultOSDU.createSpatialInfo(
        client,
        dataspaceUri.uri,
        geometries,
        context
      );

      this.data.SpatialPoint = SpatialPoint;
      this.data.SpatialArea = SpatialArea;
      this.meta = [FrameOfReferenceCRS];

      if (this.data.IndexableElementCount === undefined) {
        this.data.IndexableElementCount = [];
      }
      if (NodeCount !== undefined) {
        this.data.IndexableElementCount?.push({
          Count: NodeCount,
          IndexableElementID: context.addReferenceData(
            "IndexableElement",
            "nodes"
          )
        });
      }
    }

    const dors = await this.getCreatingObjects(client, ReservoirDMSUrl);
    if (dors.length > 0) {
      this.data.LineageAssertions = [];
      for (const d of dors) {
        const l = await SeismicFaultOSDU.dorToSrn(
          ReservoirDMSUrl,
          d,
          client,
          context
        );
        if (l !== undefined) {
          this.data.LineageAssertions.push({ ID: l });
        }
      }
    }

    this.assignExtraMetaData(xml.ExtraMetadata);

    delete this.__context;
    return this;
  }
}
