import * as resqml22 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/resqmlv2";
import * as eml23 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv22/commonv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";
import { EtpUri, ResqmlClient } from "../client/ResqmlClient";

import { OSDUContext } from "./OsduContext";
import { ResqmlWorkProductComponent } from "./WorkProductComponent";

import {
  Data,
  SeismicHorizon
} from "./Generated/work-product-component/SeismicHorizon.1.2.0";

/**
 * Extract SeismicHorizon information from a Resqml 2.2 2D grid
 *
 * @export
 * @class SeismicHorizon22OSDU
 * @extends {ResqmlWorkProductComponent<SimpleJson<resqml22.Grid2dRepresentation>>}
 * @implements {SeismicBinGrid}
 */
export class SeismicHorizon22OSDU
  extends ResqmlWorkProductComponent<SimpleJson<resqml22.Grid2dRepresentation>>
  implements SeismicHorizon
{
  public data: Data = {};

  constructor(
    xml: SimpleJson<resqml22.Grid2dRepresentation>,
    context: OSDUContext
  ) {
    super(xml, context, "SeismicHorizon.1.2.0");
  }

  /**
   * Check if a 2D grid can be an OSDU SeismicHorizon
   *
   * @static
   * @param {SimpleJson<resqml22.Grid2dRepresentation>} xml
   * @return {boolean}
   * @memberof SeismicHorizonOSDU
   */
  static matchType(xml: SimpleJson<resqml22.Grid2dRepresentation>): boolean {
    const geo = xml.Geometry;
    if (geo.Points.$type !== "resqml22.Point3dZValueArray") {
      return false;
    }
    const p = geo.Points as SimpleJson<resqml22.Point3dZValueArray>;

    if (
      p.SupportingGeometry.$type !==
      "resqml22.Point3dFromRepresentationLatticeArray"
    ) {
      return false;
    }

    return (
      xml.RepresentedObject?._data?.$type === "resqml22.HorizonInterpretation"
    );
  }

  public getGeometries(
    xml: SimpleJson<resqml22.Grid2dRepresentation>
  ): SimpleJson<resqml22.PointGeometry>[] {
    xml as SimpleJson<resqml22.Grid2dRepresentation>;
    return [xml.Geometry];
  }

  /**
   * Compute the coverage binGrid
   * @param {SimpleJson<resqml22.SeismicLatticeFeature> | undefined} feat lattice feature
   * @param {SimpleJson<resqml22.Point3dFromRepresentationLatticeArray>} lat lattice coordinates
   * @returns
   */
  private coverage(
    feat: SimpleJson<resqml22.SeismicLatticeFeature> | undefined,
    lat: SimpleJson<resqml22.Point3dFromRepresentationLatticeArray>
  ) {
    let NI = undefined;
    let NJ = undefined;
    let dI = undefined;
    let dJ = undefined;
    let BinGridCoveragePercent = undefined;
    if (
      feat &&
      lat.NodeIndicesOnSupportingRepresentation.$type ==
        "eml23.IntegerLatticeArray"
    ) {
      const offset =
        lat.NodeIndicesOnSupportingRepresentation as SimpleJson<eml23.IntegerLatticeArray>;
      if (offset.Offset.length === 2) {
        const inlineCount = feat.InlineLabels?.Offset[0].Count ?? 1;
        const crosslineCount = feat.CrosslineLabels?.Offset[0].Count ?? 1;

        if (
          offset.Offset[0].$type == "eml23.IntegerConstantArray" &&
          offset.Offset[1].$type == "eml23.IntegerConstantArray"
        ) {
          const iOffset = offset
            .Offset[0] as SimpleJson<eml23.IntegerConstantArray>;
          const jOffset = offset
            .Offset[1] as SimpleJson<eml23.IntegerConstantArray>;
          NI = iOffset.Count + 1;
          dI = iOffset.Value;
          NJ = jOffset.Count + 1;
          dJ = jOffset.Value;
          BinGridCoveragePercent =
            (100.0 * (NI * dI * NJ * dJ)) / (inlineCount * crosslineCount);
        }
      }
    }
    return BinGridCoveragePercent;
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml22.Grid2dRepresentation>,
    client: ResqmlClient
  ): Promise<SeismicHorizon22OSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }

    const geo = xml.Geometry;

    if (geo.Points.$type !== "resqml22.Point3dZValueArray") {
      return this;
    }
    const p = geo.Points as SimpleJson<resqml22.Point3dZValueArray>;

    if (
      p.SupportingGeometry.$type !==
      "resqml22.Point3dFromRepresentationLatticeArray"
    ) {
      return this;
    }

    const interpretation = xml.RepresentedObject
      ?._data as SimpleJson<resqml22.HorizonInterpretation>;

    const lat =
      p.SupportingGeometry as SimpleJson<resqml22.Point3dFromRepresentationLatticeArray>;

    const binGrid = lat.SupportingRepresentation
      ._data as SimpleJson<resqml22.AbstractRepresentation>;

    const binInterpretation = binGrid.RepresentedObject
      ?._data as SimpleJson<resqml22.AbstractFeatureInterpretation>;
    const feat: SimpleJson<resqml22.SeismicLatticeFeature> | undefined =
      binInterpretation?.InterpretedFeature
        ._data as SimpleJson<resqml22.SeismicLatticeFeature>;

    const inlineCount = feat.InlineLabels?.Offset[0].Count ?? 1;

    const startInline =
      lat.NodeIndicesOnSupportingRepresentation.StartValue % inlineCount;

    const startCrossline =
      lat.NodeIndicesOnSupportingRepresentation.StartValue / inlineCount;

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
        (feat.CrosslineLabels?.Offset[0].Value ?? 1) * xml.SlowestAxisCount,
      GeologicalUnitAgePeriod: undefined,
      GeologicalUnitAgeYear: undefined,
      GeologicalUnitName: interpretation.InterpretedFeature.Title,
      IndexableElementCount: undefined,
      InlineMax:
        startInline +
        (feat.InlineLabels?.Offset[0].Value ?? 1) * xml.FastestAxisCount,
      InlineMin: startInline,
      InterpretationID: await this.dorToSrn(
        ReservoirDMSUrl,
        xml.RepresentedObject,
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

    this.assignExtraMetaData(xml.ExtensionNameValue);

    delete this.__context;
    return this;
  }
}
