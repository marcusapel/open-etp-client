import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";
import { EtpUri, ResqmlClient } from "../client/ResqmlClient";

import { IDataSubarray } from "../common/EtpTypes";
import { OSDUContext } from "./OsduContext";
import {
  ResqmlWorkProductComponent,
  visitDoubleValues,
  visitIntegerValues
} from "./WorkProductComponent";

import {
  Data,
  GenericProperty
} from "./Generated/work-product-component/GenericProperty.1.0.0";

export class GenericPropertyOSDU
  extends ResqmlWorkProductComponent<
    SimpleJson<resqml20.AbstractValuesProperty>
  >
  implements GenericProperty
{
  public data: Data = {};

  private async computeStats(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.AbstractValuesProperty>,
    client: ResqmlClient
  ) {
    let MinValue: number = Number.POSITIVE_INFINITY;
    let MaxValue: number = Number.NEGATIVE_INFINITY;
    let MeanValue = 0;
    let SqrValue = 0;
    let ValueCount = 0;

    const continuous =
      xml.$type === "resqml20.obj_ContinuousProperty"
        ? (xml as SimpleJson<resqml20.obj_ContinuousProperty>)
        : undefined;

    const discrete =
      xml.$type === "resqml20.obj_DiscreteProperty"
        ? (xml as SimpleJson<resqml20.obj_DiscreteProperty>)
        : undefined;

    const dataspaceUri = EtpUri.createDataSpaceUri(
      new EtpUri(ReservoirDMSUrl).dataSpace
    );

    const visitor = (
      nullValue: number | undefined,
      values: boolean[] | number[] | bigint[],
      _data: IDataSubarray
    ) => {
      const v = values as number[];
      for (const n of v) {
        if (nullValue !== undefined) {
          if (n === nullValue) {
            continue;
          }
        } else if (Number.isNaN(n)) {
          continue;
        }
        ValueCount++;
        MinValue = Math.min(n, MinValue);
        MaxValue = Math.min(n, MaxValue);
        MeanValue += n;
        SqrValue += n * n;
      }
    };

    if (continuous !== undefined) {
      for await (const patch of xml.PatchOfValues) {
        await visitDoubleValues(
          dataspaceUri.uri,
          patch.Values,
          client,
          visitor.bind(this, undefined)
        );
      }
    } else if (discrete !== undefined) {
      for await (const patch of xml.PatchOfValues) {
        await visitIntegerValues(
          dataspaceUri.uri,
          patch.Values,
          client,
          visitor
        );
      }
    }

    if (ValueCount) {
      MeanValue = MeanValue / ValueCount;
      return {
        MinValue,
        MaxValue,
        MeanValue,
        StdDeviation: Math.sqrt(SqrValue / ValueCount - MeanValue * MeanValue),
        ValueCount
      };
    } else {
      return {
        MinValue: undefined,
        MaxValue: undefined,
        MeanValue: undefined,
        StdDeviation: undefined,
        ValueCount: undefined
      };
    }
  }

  constructor(
    xml: SimpleJson<resqml20.AbstractValuesProperty>,
    context: OSDUContext
  ) {
    super(xml, context, "GenericProperty.1.1.0");
  }

  public async initData(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.AbstractValuesProperty>,
    client: ResqmlClient
  ): Promise<GenericPropertyOSDU> {
    const context = this.__context;
    if (context === undefined) {
      return this;
    }
    const continuous =
      xml.$type === "resqml20.obj_ContinuousProperty"
        ? (xml as SimpleJson<resqml20.obj_ContinuousProperty>)
        : undefined;

    const categorical =
      xml.$type === "resqml20.obj_CategoricalProperty"
        ? (xml as SimpleJson<resqml20.obj_CategoricalProperty>)
        : undefined;

    const PropertyTopologyID = await this.dorToSrn(
      ReservoirDMSUrl,
      xml.SupportingRepresentation,
      client
    );

    const { MinValue, MaxValue, MeanValue, StdDeviation, ValueCount } =
      await this.computeStats(ReservoirDMSUrl, xml, client);

    const pKind =
      xml.PropertyKind.$type === "resqml20.LocalPropertyKind"
        ? (xml.PropertyKind as SimpleJson<resqml20.LocalPropertyKind>)
        : undefined;

    this.data = {
      ...(await this.AbstractCommonResources(context)),
      ...(await this.AbstractWPCGroupType(ReservoirDMSUrl, context)),
      ...(await this.AbstractWorkProductComponent(xml, context)),
      FacetIDs: undefined,
      PropertyType: pKind
        ? {
            PropertyTypeID: context.addReferenceData(
              "PropertyType",
              pKind.LocalPropertyKind.UUID
            ),
            Name: pKind.LocalPropertyKind.Title
          }
        : undefined,
      /**
       * Only populated if ValueType=="string" and the values are expected to represent record
       * ids, e.g. to a reference-data type, then this value holds the kind (optionally without
       * the semantic version number).
       */
      RelationshipTargetKind: undefined,
      /**
       * Only populated of the ValueType is "number". It holds the UnitQuantity associated with
       * this reference property type. It is a relationship to UnitQuantity record.
       */
      UnitQuantityID: undefined,
      ValueCount,
      ValueType: continuous ? "number" : "integer",
      ClassificationTableID: await this.dorToSrn(
        ReservoirDMSUrl,
        categorical?.Lookup,
        client
      ),
      IndexableElementID: context.addReferenceData(
        "IndexableElement",
        xml.IndexableElement
      ),
      MaxValue,
      MeanValue,
      MinValue,
      PropertyTopologyID,
      PropertyUnitID: context.addReferenceData(
        "UnitOfMeasure",
        continuous ? continuous.UOM : "Euc"
      ),
      RealizationIndices: xml.RealizationIndex
        ? [xml.RealizationIndex]
        : undefined,
      StdDeviation,
      TimeIndices: undefined,
      TimeSeriesID: undefined,
      TimeValues: undefined,
      ExtensionProperties: undefined
    };

    if (xml.TimeIndex) {
      const time = (await ResqmlWorkProductComponent.getObject(
        client,
        ReservoirDMSUrl,
        xml.TimeIndex.TimeSeries
      )) as SimpleJson<resqml20.obj_TimeSeries>;
      this.data.TimeSeriesID = await this.dorToSrn(
        ReservoirDMSUrl,
        xml.TimeIndex.TimeSeries,
        client
      );
      this.data.TimeIndices = xml.TimeIndex.Index;
      this.data.TimeValues = [
        time.Time[xml.TimeIndex.Index].DateTime.toISOString()
      ];
    }

    const dors = await this.getCreatingObjects(client, ReservoirDMSUrl);
    if (dors.length > 0) {
      this.data.LineageAssertions = [];
      for (const d of dors) {
        const l = await this.dorToSrn(ReservoirDMSUrl, d, client);
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
    await this.initGeometry(ReservoirDMSUrl, xml, client);

    delete this.__context;
    return this;
  }

  private async initGeometry(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.AbstractValuesProperty>,
    client: ResqmlClient
  ): Promise<void> {
    const PropertyTopologyID = this.data.PropertyTopologyID;
    if (PropertyTopologyID === undefined) {
      return;
    }
    const context = this.__context;
    if (context === undefined) {
      return;
    }
    // Get the geometry form supporting representation
    const osduRep = context.created.get(PropertyTopologyID.slice(0, -1));
    if (osduRep === undefined) {
      const rep = (await ResqmlWorkProductComponent.getObject(
        client,
        ReservoirDMSUrl,
        xml.SupportingRepresentation
      )) as Record<string, unknown>;

      type RepresentationKey = keyof typeof rep;

      let geometry = rep["Geometry"] as SimpleJson<resqml20.PointGeometry>;
      if (geometry === undefined) {
        for (const p of Object.keys(rep)) {
          if (Array.isArray(rep[p as RepresentationKey])) {
            (rep[p as RepresentationKey] as Array<unknown>).forEach(patch => {
              if (patch !== undefined && typeof patch === "object") {
                const oPatch = patch as Record<string, unknown>;
                if ("Geometry" in oPatch) {
                  const g = oPatch["Geometry"];
                  if (g !== undefined) {
                    geometry = g as SimpleJson<resqml20.PointGeometry>;
                  }
                }
              }
            });
          } else {
            const patch = rep[p as RepresentationKey] as Record<
              string,
              unknown
            >;
            if (patch !== undefined && typeof patch === "object") {
              if ("Geometry" in patch) {
                const g = patch["Geometry"];
                if (g !== undefined) {
                  geometry = g as SimpleJson<resqml20.PointGeometry>;
                }
              }
            }
          }
        }
      }
      if (geometry) {
        const dataspaceUri = EtpUri.createDataSpaceUri(
          new EtpUri(ReservoirDMSUrl).dataSpace
        ).uri;
        const { SpatialPoint, SpatialArea, FrameOfReferenceCRS } =
          await this.createSpatialInfo(client, dataspaceUri, [geometry]);
        this.data.SpatialPoint = SpatialPoint;
        this.data.SpatialArea = SpatialArea;

        this.meta = [FrameOfReferenceCRS];
      }
    } else {
      const d = osduRep.data;
      if (d !== undefined) {
        if (d.SpatialArea !== undefined) {
          this.data.SpatialArea = d.SpatialArea;
        }
        if (d.SpatialPoint !== undefined) {
          this.data.SpatialPoint = d.SpatialPoint;
        }
        if (osduRep.meta !== undefined) {
          this.meta = osduRep.meta;
        }
      }
    }
  }
}

export const GenericPropertyManifest = async (
  uri: string,
  xml: SimpleJson<resqml20.AbstractValuesProperty>,
  context: OSDUContext,
  client: ResqmlClient
): Promise<GenericPropertyOSDU | undefined> => {
  const dorUri = ResqmlWorkProductComponent.dorToUri(
    uri,
    xml.SupportingRepresentation
  );
  if (dorUri.includes("resqml20.obj_WellboreFrameRepresentation")) {
    return undefined;
  }
  return new GenericPropertyOSDU(xml, context).initData(uri, xml, client);
};
