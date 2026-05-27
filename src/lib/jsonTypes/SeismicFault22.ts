import * as resqml22 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";
import { EtpUri, ResqmlClient } from "../client/ResqmlClient";

import { OSDUContext } from "./OsduContext";
import {
  getGeometries,
  ResqmlWorkProductComponent
} from "./WorkProductComponent";

import {
  Data,
  SeismicFault
} from "./Generated/work-product-component/SeismicFault.1.3.0";

/**
 * Extract SeismicFault information from a resqml 2.2 AbstractRepresentation
 * @export
 * @class SeismicFault22OSDU
 * @extends {ResqmlWorkProductComponent<SimpleJson<resqml22.AbstractRepresentation>>}
 * @implements {SeismicFault}
 */
export class SeismicFault22OSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml22.AbstractRepresentation>
  >
  implements SeismicFault
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml22.AbstractRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "SeismicFault.2.0.0");
  }

  private elementCount(xml: SimpleJson<resqml22.AbstractRepresentation>):
    | undefined
    | {
        Count: number;
        IndexableElementID: string; //this.reference("IndexableElement", "cells")
      }[] {
    if (this.__context === undefined) {
      return undefined;
    }
    const context = this.__context;
    if (xml.$type === "resqml22.Grid2dRepresentation") {
      const grid2d = xml as SimpleJson<resqml22.Grid2dRepresentation>;
      return [
        {
          Count: (grid2d.FastestAxisCount - 1) * (grid2d.SlowestAxisCount - 1),
          IndexableElementID:
            context.addReferenceData("IndexableElement", "cells") || ""
        }
      ];
    } else if (xml.$type === "resqml22.TriangulatedSetRepresentation") {
      const trig = xml as SimpleJson<resqml22.TriangulatedSetRepresentation>;
      let Count = 0;
      let NodeCount = 0;
      trig.TrianglePatch.forEach(p => {
        if (p.Triangles.Statistics?.length === 1) {
          Count += p.Triangles.Statistics[0]?.ValidValueCount
            ? p.Triangles.Statistics[0]?.ValidValueCount
            : 0;
        }
        NodeCount += p.NodeCount;
      });
      const elements = [
        {
          Count: NodeCount,
          IndexableElementID:
            context.addReferenceData("IndexableElement", "nodes") || ""
        }
      ];
      if (Count > 0) {
        elements.push({
          Count,
          IndexableElementID:
            context.addReferenceData("IndexableElement", "cells") || ""
        });
      }
      return elements;
    } else if (xml.$type === "resqml22.PolylineSetRepresentation") {
      const polyLine = xml as SimpleJson<resqml22.PolylineSetRepresentation>;
      let Count = 0;
      let NodeCount = 0;
      polyLine.LinePatch.forEach(p => {
        NodeCount = p.NodeCount;
        Count += p.ClosedPolylines ? p.NodeCount : p.NodeCount - 1;
      });
      return [
        {
          Count: NodeCount,
          IndexableElementID:
            context.addReferenceData("IndexableElement", "nodes") || ""
        },
        {
          Count,
          IndexableElementID:
            context.addReferenceData("IndexableElement", "edges") || ""
        }
      ];
    } else if (xml.$type === "resqml22.PointSetRepresentation") {
      const points = xml as SimpleJson<resqml22.PointSetRepresentation>;
      let NodeCount = 0;
      points.NodePatchGeometry.forEach(p => {
        const arr = this.arrayInfos(p.Points);
        if (arr.rowCount) {
          NodeCount += arr.rowCount / 3;
        }
      });
      return NodeCount
        ? [
            {
              Count: NodeCount,
              IndexableElementID:
                context.addReferenceData("IndexableElement", "nodes") || ""
            }
          ]
        : undefined;
    } else if (xml.$type === "resqml22.PolylineRepresentation") {
      const line = xml as SimpleJson<resqml22.PolylineRepresentation>;
      const arr = this.arrayInfos(line.NodePatchGeometry.Points);
      const NodeCount = arr.rowCount ? arr.rowCount / 3 : undefined;
      const Count =
        line.IsClosed || NodeCount === undefined ? NodeCount : NodeCount - 1;
      return NodeCount && Count
        ? [
            {
              Count: NodeCount,
              IndexableElementID:
                context.addReferenceData("IndexableElement", "nodes") || ""
            },
            {
              Count,
              IndexableElementID:
                context.addReferenceData("IndexableElement", "edges") || ""
            }
          ]
        : undefined;
    }
    return undefined;
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.AbstractRepresentation>,
    client: ResqmlClient
  ): Promise<SeismicFault22OSDU> {
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
    if (seismicSupport !== undefined) {
      if (seismicSupport.$type === "resqml22.Grid2dRepresentation") {
        BinGridID = await SeismicFault22OSDU.dorToSrn(
          ReservoirDMSUrl,
          seismicSupport,
          client,
          context
        );
      }
    }

    let Role = undefined;
    if ("SurfaceRole" in xml) {
      Role = (xml as any).SurfaceRole;
    } else if ("LineRole" in xml) {
      Role = (xml as any).LineRole;
    }

    const interpretation =
      xml.RepresentedObject?.QualifiedType === "resqml22.FaultInterpretation"
        ? (xml.RepresentedObject
            ?._data as SimpleJson<resqml22.FaultInterpretation>)
        : undefined;

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      BinGridID,
      IndexableElementCount: this.elementCount(xml),
      InterpretationID: await SeismicFault22OSDU.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedObject,
        client,
        context
      ),
      InterpretationName: interpretation?.Citation.Title,
      LocalModelCompoundCrsID:
        geometries.length === 0
          ? undefined
          : await SeismicFault22OSDU.dorToSrn(
              ReservoirDMSUrl,
              geometries[0].LocalCrs,
              client,
              context
            ),
      RealizationIndex: undefined,
      TimeSeries: undefined,
      Interpreter: xml.Citation.Originator,
      Remark: undefined,
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
      } = await SeismicFault22OSDU.createSpatialInfo(
        client,
        dataspaceUri.uri,
        geometries,
        context
      );

      this.data.SpatialPoint = SpatialPoint;
      this.data.SpatialArea = SpatialArea;
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
        const l = await SeismicFault22OSDU.dorToSrn(
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

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}
