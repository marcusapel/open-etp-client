import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
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
} from "./Generated/work-product-component/SeismicFault.2.0.0";

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
        IndexableElementID: string; //this.reference("IndexableElement", "Cells")
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
            context.addReferenceData("IndexableElement", "Cells") || ""
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
            context.addReferenceData("IndexableElement", "Cells") || ""
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
            context.addReferenceData("IndexableElement", "Edges") || ""
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
    if (seismicSupport !== undefined) {
      if (seismicSupport.$type === "resqml20.obj_Grid2dRepresentation") {
        BinGridID = await this.dorToSrn(
          ReservoirDMSUrl,
          seismicSupport,
          client
        );
      }
    }

    let Role = undefined;
    if ("SurfaceRole" in xml) {
      Role = (xml as any).SurfaceRole;
    } else if ("LineRole" in xml) {
      Role = (xml as any).LineRole;
    }

    const interpretation = xml.RepresentedInterpretation
      ?._data as SimpleJson<resqml20.obj_HorizonInterpretation>;

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      BinGridID,
      IndexableElementCount: this.elementCount(xml),
      InterpretationID: await this.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedInterpretation,
        client
      ),
      InterpretationName: interpretation.Citation.Title,
      LocalModelCompoundCrsID:
        geometries.length === 0
          ? undefined
          : await this.dorToSrn(
              ReservoirDMSUrl,
              geometries[0].LocalCrs,
              client
            ),
      RealizationIndex: undefined,
      RepresentationRole: context.addReferenceData(
        "RepresentationRole",
        this.capitalize(Role)
      ),
      RepresentationType: context.addReferenceData(
        "RepresentationType",
        xml.$type?.split(".")[1].slice(4)
      ),
      TimeSeries: undefined,
      Interpreter: xml.Citation.Originator,
      Remarks: undefined,
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
      } = await this.createSpatialInfo(client, dataspaceUri.uri, geometries);

      this.data.SpatialPoint = SpatialPoint;
      this.data.SpatialArea = SpatialArea;
      if (this.data.IndexableElementCount === undefined) {
        this.data.IndexableElementCount = [];
      }
      this.data.IndexableElementCount?.push({
        Count: NodeCount,
        IndexableElementID: context.addReferenceData(
          "IndexableElement",
          "Nodes"
        )
      });
    }

    const dors = await this.getCreatingObjects(client, ReservoirDMSUrl);
    if (dors.length > 0) {
      this.data.LineageAssertions = [];
      for (const d of dors) {
        const l = await this.dorToSrn(ReservoirDMSUrl, d, client);
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
