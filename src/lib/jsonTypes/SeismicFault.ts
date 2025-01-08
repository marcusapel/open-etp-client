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

  constructor(
    xml: SimpleJson<resqml20.AbstractRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "SeismicFault.1.3.0");
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
      IndexableElementCount: undefined,
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
      TimeSeries: undefined,
      BinGridID: await this.dorToSrn(ReservoirDMSUrl, seismicSupport, client),
      Interpreter: xml.Citation.Originator,
      Remark: undefined,
      Seismic2DInterpretationSetID: undefined,
      Seismic3DInterpretationSetID: undefined,
      SeismicFaultTypeID: undefined,
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
