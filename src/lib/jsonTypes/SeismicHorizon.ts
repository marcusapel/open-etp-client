import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";
import { EtpUri, ResqmlClient } from "../client/ResqmlClient";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  SeismicHorizon
} from "./Generated/work-product-component/SeismicHorizon.1.2.0";

/**
 * Extract SeismicHorizon information from a 2D grid
 *
 * @export
 * @class SeismicHorizonOSDU
 * @extends {ResqmlWorkProductComponent<SimpleJson<resqml20.obj_Grid2dRepresentation>>}
 * @implements {SeismicBinGrid}
 */
export class SeismicHorizonOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.obj_Grid2dRepresentation>
  >
  implements SeismicHorizon
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml20.obj_Grid2dRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "SeismicHorizon.1.2.0");
  }

  /**
   * Check if a 2D grid can be an OSDU SeismicHorizon
   *
   * @static
   * @param {SimpleJson<resqml20.obj_Grid2dRepresentation>} xml
   * @return {boolean}
   * @memberof SeismicHorizonOSDU
   */
  static matchType(
    xml: SimpleJson<resqml20.obj_Grid2dRepresentation>
  ): boolean {
    const geo = xml.Grid2dPatch.Geometry;
    if (geo.Points.$type !== "resqml20.Point3dZValueArray") {
      return false;
    }
    const p = geo.Points as SimpleJson<resqml20.Point3dZValueArray>;

    if (
      p.SupportingGeometry.$type !==
      "resqml20.Point3dFromRepresentationLatticeArray"
    ) {
      return false;
    }

    return (
      xml.RepresentedInterpretation?._data?.$type ===
      "resqml20.obj_HorizonInterpretation"
    );
  }

  public getGeometries(
    xml: SimpleJson<resqml20.obj_Grid2dRepresentation>
  ): SimpleJson<resqml20.PointGeometry>[] {
    xml as SimpleJson<resqml20.obj_Grid2dRepresentation>;
    return [xml.Grid2dPatch.Geometry];
  }

  /**
   * Compute the coverage binGrid
   * @param {SimpleJson<resqml20.obj_SeismicLatticeFeature> | undefined} feat lattice feature
   * @param {SimpleJson<resqml20.Point3dFromRepresentationLatticeArray>} lat lattice coordinates
   * @returns
   */
  private coverage(
    feat: SimpleJson<resqml20.obj_SeismicLatticeFeature> | undefined,
    lat: SimpleJson<resqml20.Point3dFromRepresentationLatticeArray>
  ) {
    let NI = undefined;
    let NJ = undefined;
    let dI = undefined;
    let dJ = undefined;
    let BinGridCoveragePercent = undefined;
    if (
      feat &&
      lat.NodeIndicesOnSupportingRepresentation.$type ==
        "resqml20.IntegerLatticeArray"
    ) {
      const offset =
        lat.NodeIndicesOnSupportingRepresentation as SimpleJson<resqml20.IntegerLatticeArray>;
      if (offset.Offset.length === 2) {
        const iOffset = offset
          .Offset[0] as SimpleJson<resqml20.IntegerConstantArray>;
        const jOffset = offset
          .Offset[1] as SimpleJson<resqml20.IntegerConstantArray>;
        if (
          iOffset.$type == "resqml20.IntegerConstantArray" &&
          jOffset.$type == "resqml20.IntegerConstantArray"
        ) {
          NI = iOffset.Count + 1;
          dI = iOffset.Value;
          NJ = jOffset.Count + 1;
          dJ = jOffset.Value;
          BinGridCoveragePercent =
            (100.0 * (NI * dI * NJ * dJ)) /
            (feat.InlineCount * feat.CrosslineCount);
        }
      }
    }
    return BinGridCoveragePercent;
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.obj_Grid2dRepresentation>,
    client: ResqmlClient
  ): Promise<SeismicHorizonOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    const geo = xml.Grid2dPatch.Geometry;

    if (geo.Points.$type !== "resqml20.Point3dZValueArray") {
      return this;
    }
    const p = geo.Points as SimpleJson<resqml20.Point3dZValueArray>;

    if (
      p.SupportingGeometry.$type !==
      "resqml20.Point3dFromRepresentationLatticeArray"
    ) {
      return this;
    }

    const interpretation = xml.RepresentedInterpretation
      ?._data as SimpleJson<resqml20.obj_HorizonInterpretation>;

    const lat =
      p.SupportingGeometry as SimpleJson<resqml20.Point3dFromRepresentationLatticeArray>;

    const binGrid = lat.SupportingRepresentation
      ._data as SimpleJson<resqml20.AbstractRepresentation>;

    const binInterpretation = binGrid.RepresentedInterpretation
      ?._data as SimpleJson<resqml20.AbstractFeatureInterpretation>;
    const feat: SimpleJson<resqml20.obj_SeismicLatticeFeature> | undefined =
      binInterpretation?.InterpretedFeature
        ._data as SimpleJson<resqml20.obj_SeismicLatticeFeature>;

    const startInline =
      lat.NodeIndicesOnSupportingRepresentation.StartValue % feat.InlineCount;

    const startCrossline =
      lat.NodeIndicesOnSupportingRepresentation.StartValue / feat.InlineCount;

    const BinGridCoveragePercent = this.coverage(feat, lat);

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      BinGridCoveragePercent,
      BinGridID: await this.dorToSrn(
        ReservoirDMSUrl,
        lat.SupportingRepresentation,
        client
      ),
      CrosslineMin: startCrossline,
      CrosslineMax:
        startCrossline +
        feat.CrosslineIndexIncrement * xml.Grid2dPatch.SlowestAxisCount,
      GeologicalUnitAgePeriod: undefined,
      GeologicalUnitAgeYear: undefined,
      GeologicalUnitName: interpretation.InterpretedFeature.Title,
      IndexableElementCount: undefined,
      InlineMax:
        startInline +
        feat.InlineIndexIncrement * xml.Grid2dPatch.FastestAxisCount,
      InlineMin: startInline,
      InterpretationID: await this.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedInterpretation,
        client
      ),
      InterpretationName: interpretation.Citation.Title,
      Interpreter: undefined,
      LocalModelCompoundCrsID: await this.dorToSrn(
        ReservoirDMSUrl,
        geo.LocalCrs,
        client
      ),
      PetroleumSystemElementTypeID: undefined,
      ReplacementVelocity: undefined,
      RealizationIndex: undefined,
      Role: undefined,
      Seismic2DInterpretationSetID: undefined,
      Seismic3DInterpretationSetID: undefined,
      SeismicAttributes: undefined,
      SeismicDomainTypeID: undefined,
      SeismicDomainUOM: undefined,
      SeismicHorizonTypeID: undefined,
      SeismicLineGeometryIDs: undefined,
      SeismicPickingTypeID: undefined,
      SeismicTraceDataID: undefined,
      SeismicVelocityModelID: undefined,
      TimeSeries: undefined,
      Type: undefined,
      VerticalDatumOffset: undefined,
      VerticalMeasurementTypeID: undefined,
      ExtensionProperties: undefined
    };

    const geometries = this.getGeometries(xml);
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
