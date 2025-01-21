import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";
import {
  EtpUri,
  IResqmlDataObject,
  ResqmlClient
} from "../client/ResqmlClient";

import { OSDUContext } from "./OsduContext";
import {
  ResqmlWorkProductComponent,
  getGeometries
} from "./WorkProductComponent";

import {
  Data,
  GenericRepresentation
} from "./Generated/work-product-component/GenericRepresentation.1.2.0";

import { SeismicFaultOSDU } from "./SeismicFault";

export class GenericRepresentationOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.AbstractSurfaceRepresentation>
  >
  implements GenericRepresentation
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.AbstractSurfaceRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "GenericRepresentation.1.2.0");
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
            context.addReferenceData("IndexableElement", "Cells") ?? ""
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
            context.addReferenceData("IndexableElement", "Cells") ?? ""
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
            context.addReferenceData("IndexableElement", "Edges") ?? ""
        }
      ];
    }
    return undefined;
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.AbstractRepresentation>,
    client: ResqmlClient
  ): Promise<GenericRepresentationOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    let Role = undefined;
    if ("SurfaceRole" in xml) {
      Role = (xml as any).SurfaceRole;
    } else if ("LineRole" in xml) {
      Role = (xml as any).LineRole;
    }
    const geometries = getGeometries(xml);
    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      IndexableElementCount: this.elementCount(xml),
      InterpretationID: await this.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedInterpretation,
        client
      ),
      InterpretationName: xml.RepresentedInterpretation?.Title,
      LocalModelCompoundCrsID:
        geometries.length > 0
          ? await this.dorToSrn(ReservoirDMSUrl, geometries[0].LocalCrs, client)
          : undefined,
      RealizationIndex: undefined,
      Role: context.addReferenceData(
        "RepresentationRole",
        this.capitalize(Role)
      ),
      Type: context.addReferenceData(
        "RepresentationType",
        xml.$type?.split(".")[1].slice(4)
      ),
      TimeSeries: undefined, //{ TimeIndex: 0, TimeSeriesID: "" },

      ExtensionProperties: undefined
    };

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

    if (geometries.length > 0) {
      const dataspaceUri = EtpUri.createDataSpaceUri(
        new EtpUri(ReservoirDMSUrl).dataSpace
      );
      const { SpatialPoint, SpatialArea, FrameOfReferenceCRS, NodeCount } =
        await this.createSpatialInfo(client, dataspaceUri.uri, geometries);

      this.data.SpatialPoint = SpatialPoint;
      this.data.SpatialArea = SpatialArea;
      this.meta = [FrameOfReferenceCRS];

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
    delete this.__context;
    return this;
  }
}

/**
 * Identify OSDU kind for Representation, can create either a SeismicFault, SeismicHorizon or GenericRepresentation
 *
 * @param {IResqmlDataObject} xml
 * @return {string}
 */
export const GenericRepresentationToOsduKind = (
  xml: IResqmlDataObject
): string => {
  const genRep = xml as SimpleJson<resqml20.AbstractRepresentation>;
  if (
    genRep.RepresentedInterpretation?.ContentType ===
    "application/x-resqml+xml;version=2.0;type=obj_FaultInterpretation"
  ) {
    const geometries = getGeometries(xml);
    for (const p of geometries) {
      if (p.SeismicCoordinates !== undefined) {
        return "osdu:wks:work-product-component--SeismicFault.2.0.0";
      }
    }
  }
  return "osdu:wks:work-product-component--GenericRepresentation:1.1.0";
};

export const GenericRepresentationManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.AbstractSurfaceRepresentation>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<GenericRepresentationOSDU | SeismicFaultOSDU> => {
  const kind = GenericRepresentationToOsduKind(xml);
  if (kind === "osdu:wks:work-product-component--SeismicFault.2.0.0") {
    return new SeismicFaultOSDU(xml, context).initData(uri, xml, client);
  }
  return new GenericRepresentationOSDU(xml, context).initData(uri, xml, client);
};
