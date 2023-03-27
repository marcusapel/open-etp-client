import {
  EtpUri,
  IResqmlDataObject,
  ResqmlClient
} from "../client/ResqmlClient";

import * as eml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/commonv2";
import * as resqml20 from "../mlTypes/xmlns/www.energistics.org/energyml/resqmlv201/resqmlv2";
import type { SimpleJson } from "../mlTypes/XmlJsonUtil";

import { IDataSubarray } from "../common/EtpTypes";

import { EtpContentType } from "../common/EtpContentType";

import {
  AbstractSpatialLocation,
  AccessControlList,
  FrameOfReferenceMetaDataItem,
  LegalMetaData,
  ParentList
} from "./Generated/work-product-component/GenericRepresentation.1.1.0";

import { OSDUContext } from "./OsduContext";

import { AbstractCommonResources } from "./Generated/abstract/AbstractCommonResources.1.0.0";
import { AbstractInterpretation } from "./Generated/abstract/AbstractInterpretation.1.0.0";
import { AbstractWPCGroupType } from "./Generated/abstract/AbstractWPCGroupType.1.1.0";
import { AbstractWorkProductComponent } from "./Generated/abstract/AbstractWorkProductComponent.1.1.0";
import { CoordinateReferenceSystem } from "./Generated/reference-data/CoordinateReferenceSystem.1.1.0";

enum AnyCRSGeoJSONPointType {
  AnyCRSGeometryCollection = "AnyCrsGeometryCollection",
  AnyCRSLineString = "AnyCrsLineString",
  AnyCRSMultiLineString = "AnyCrsMultiLineString",
  AnyCRSMultiPoint = "AnyCrsMultiPoint",
  AnyCRSMultiPolygon = "AnyCrsMultiPolygon",
  AnyCRSPoint = "AnyCrsPoint",
  AnyCRSPolygon = "AnyCrsPolygon"
}

enum FluffyType {
  AnyCRSFeature = "AnyCrsFeature"
}

enum AsIngestedCoordinatesType {
  AnyCRSFeatureCollection = "AnyCrsFeatureCollection"
}

enum Wgs84CoordinatesType {
  FeatureCollection = "FeatureCollection"
}

enum StickyType {
  Feature = "Feature"
}

enum GeoJSONPointType {
  GeometryCollection = "GeometryCollection",
  LineString = "LineString",
  MultiLineString = "MultiLineString",
  MultiPoint = "MultiPoint",
  MultiPolygon = "MultiPolygon",
  Point = "Point",
  Polygon = "Polygon"
}

const DBL_CST_ARRAY = "resqml20.DoubleConstantArray";
const DBL_HDF_ARRAY = "resqml20.DoubleHdf5Array";
const DBL_LAT_ARRAY = "resqml20.DoubleLatticeArray";
const INT_CST_ARRAY = "resqml20.IntegerConstantArray";
const INT_HDF_ARRAY = "resqml20.IntegerHdf5Array";

/**
 * Extract an array of integer values from a generic AbstractIntegerArray
 *
 * @param {string} dataspaceUri
 * @param {SimpleJson<resqml20.AbstractIntegerArray>} array
 * @param {ResqmlClient} client
 * @return {Promise<number[]>}
 */
export const getIntegerValues = async (
  dataspaceUri: string,
  array: SimpleJson<resqml20.AbstractIntegerArray>,
  client: ResqmlClient
): Promise<number[]> => {
  if (array.$type === INT_HDF_ARRAY) {
    const hdfArray = array as resqml20.IntegerHdf5Array;
    const etpType = new EtpContentType(hdfArray.Values.HdfProxy.ContentType)
      .etpType;
    const uri = `${dataspaceUri}/${etpType}(${hdfArray.Values.HdfProxy.UUID})`;
    const da = await client.getDataArray(uri, hdfArray.Values.PathInHdfFile);
    const values = da?.data?.data.item._ArrayOfInt?.values;
    if (!values) {
      return Promise.reject();
    }
    return values;
  } else if (array.$type === INT_CST_ARRAY) {
    const constArray = array as resqml20.IntegerConstantArray;
    return new Array(constArray.Count).fill(constArray.Value);
  }
  return Promise.reject(`Not supported type yet`);
};

/**
 * Extract an array of boolean values from a generic AbstractBooleanArray
 *
 * @param {string} dataspaceUri
 * @param {SimpleJson<resqml20.AbstractBooleanArray>} array
 * @param {ResqmlClient} client
 * @return {Promise<number[]>}
 */
export const getBooleanValues = async (
  dataspaceUri: string,
  array: SimpleJson<resqml20.AbstractBooleanArray>,
  client: ResqmlClient
): Promise<boolean[]> => {
  if (array.$type === "resqml20.BooleanHdf5Array") {
    const hdfArray = array as resqml20.BooleanHdf5Array;
    const etpType = new EtpContentType(hdfArray.Values.HdfProxy.ContentType)
      .etpType;
    const uri = `${dataspaceUri}/${etpType}(${hdfArray.Values.HdfProxy.UUID})`;
    const da = await client.getDataArray(uri, hdfArray.Values.PathInHdfFile);
    const values = da?.data?.data.item._ArrayOfBoolean?.values;
    if (!values) {
      return Promise.reject("Cannot get HDF5 from boolean");
    }
    return values;
  } else if (array.$type === "resqml20.BooleanConstantArray") {
    const constArray = array as resqml20.BooleanConstantArray;
    return new Array(constArray.Count).fill(constArray.Value);
  }

  return Promise.reject(`Not supported type yet`);
};

type DoubleVisitorInput = (
  values: boolean[] | number[] | bigint[],
  data: IDataSubarray
) => any;

/**
 * Apply a visitor function to all values of a generic AbstractBooleanArray
 *
 * @param {string} dataspaceUri
 * @param {SimpleJson<resqml20.AbstractIntegerArray>} array
 * @param {ResqmlClient} client
 * @param {DoubleVisitorInput} visitor
 * @return {Promise<void>}
 */
export const visitBooleanValues = async (
  dataspaceUri: string,
  array: SimpleJson<resqml20.AbstractBooleanArray>,
  client: ResqmlClient,
  visitor: DoubleVisitorInput
): Promise<void> => {
  if (array.$type === "resqml20.BooleanHdf5Array") {
    const hdfArray = array as resqml20.BooleanHdf5Array;
    const etpType = new EtpContentType(hdfArray.Values.HdfProxy.ContentType)
      .etpType;
    const uri = `${dataspaceUri}/${etpType}(${hdfArray.Values.HdfProxy.UUID})`;
    await client.visitDataArrayValues(
      { uri, pathInResource: hdfArray.Values.PathInHdfFile },
      visitor
    );
    return;
  } else if (array.$type === "resqml20.BooleanConstantArray") {
    const constArray = array as resqml20.BooleanConstantArray;
    visitor(new Array(constArray.Count).fill(constArray.Value), {
      uid: { uri: "", pathInResource: "" },
      starts: [0],
      counts: [constArray.Count]
    });
    return;
  }

  return Promise.reject(`Not supported type yet`);
};

/**
 * Apply a visitor function to all values of a generic AbstractIntegerArray
 *
 * @param {string} dataspaceUri
 * @param {SimpleJson<resqml20.AbstractIntegerArray>} array
 * @param {ResqmlClient} client
 * @param {DoubleVisitorInput} visitor
 * @return {Promise<void>}
 */
export const visitIntegerValues = async (
  dataspaceUri: string,
  array: SimpleJson<resqml20.AbstractIntegerArray>,
  client: ResqmlClient,
  visitor: (
    nullValue: number | undefined,
    values: boolean[] | number[] | bigint[],
    data: IDataSubarray
  ) => any
): Promise<void> => {
  if (array.$type === INT_HDF_ARRAY) {
    const hdfArray = array as resqml20.IntegerHdf5Array;

    const etpType = new EtpContentType(hdfArray.Values.HdfProxy.ContentType)
      .etpType;
    const uri = `${dataspaceUri}/${etpType}(${hdfArray.Values.HdfProxy.UUID})`;
    await client.visitDataArrayValues(
      { uri, pathInResource: hdfArray.Values.PathInHdfFile },
      visitor.bind(this, hdfArray.NullValue)
    );
  } else if (array.$type === INT_CST_ARRAY) {
    const constArray = array as resqml20.IntegerConstantArray;
    visitor(undefined, new Array(constArray.Count).fill(constArray.Value), {
      uid: { uri: "", pathInResource: "" },
      starts: [0],
      counts: [constArray.Count]
    });
  } else {
    return Promise.reject(`Not supported type yet`);
  }
};

/**
 * Apply a visitor function to all values of a generic AbstractDoubleArray
 *
 * @param {string} dataspaceUri
 * @param {SimpleJson<resqml20.AbstractDoubleArray>} array
 * @param {ResqmlClient} client
 * @param {DoubleVisitorInput} visitor
 * @return {Promise<void>}
 */
export const visitDoubleValues = async (
  dataspaceUri: string,
  array: SimpleJson<resqml20.AbstractDoubleArray>,
  client: ResqmlClient,
  visitor: DoubleVisitorInput
): Promise<void> => {
  if (array.$type === DBL_HDF_ARRAY) {
    const hdfArray = array as resqml20.DoubleHdf5Array;
    const etpType = new EtpContentType(hdfArray.Values.HdfProxy.ContentType)
      .etpType;
    const uri = `${dataspaceUri}/${etpType}(${hdfArray.Values.HdfProxy.UUID})`;
    await client.visitDataArrayValues(
      { uri, pathInResource: hdfArray.Values.PathInHdfFile },
      visitor
    );
  } else if (array.$type === DBL_CST_ARRAY) {
    const constArray = array as resqml20.DoubleConstantArray;
    await visitor(new Array(constArray.Count).fill(constArray.Value), {
      uid: { uri: "", pathInResource: "" },
      starts: [0],
      counts: [constArray.Count]
    });
  } else if (array.$type === DBL_LAT_ARRAY) {
    const latticeArray = array as resqml20.DoubleLatticeArray;
    let cur = latticeArray.StartValue;
    let count = 1;
    latticeArray.Offset.forEach(o => (count *= o.Count + 1));
    const val = [cur];
    for (let i = 0; i < latticeArray.Offset[0].Count; i++) {
      cur += latticeArray.Offset[0].Value;
      val.push(cur);
    }

    const counts = latticeArray.Offset.map(o => 1);
    counts[0] = latticeArray.Offset[0].Count;
    await visitor(val, {
      uid: { uri: "", pathInResource: "" },
      starts: latticeArray.Offset.map(() => 0),
      counts
    });

    // return Promise.reject("Not supported type yet");
  }
};

/**
 * Apply a visitor function to all values of a generic Point3dHdf5Array
 *
 * @param {string} dataspaceUri
 * @param {SimpleJson<resqml20.Point3dHdf5Array>} array
 * @param {ResqmlClient} client
 * @param {DoubleVisitorInput} visitor
 * @return {Promise<void>}
 */
export const visitPoint3dValues = async (
  dataspaceUri: string,
  array: SimpleJson<resqml20.Point3dHdf5Array>,
  client: ResqmlClient,
  visitor: DoubleVisitorInput
): Promise<void> => {
  const etpType = new EtpContentType(array.Coordinates.HdfProxy.ContentType)
    .etpType;
  const uri = `${dataspaceUri}/${etpType}(${array.Coordinates.HdfProxy.UUID})`;
  await client.visitDataArrayValues(
    { uri, pathInResource: array.Coordinates.PathInHdfFile },
    visitor,
    0,
    30000
  );
};

/**
 * Get the minimum and maximum coordinate of a Point array
 *
 * @param {ResqmlClient} client
 * @param {string} dataspaceUri
 * @param {SimpleJson<resqml20.AbstractPoint3dArray>} geo
 * @return {*}  {Promise<{
 *   minX: number;
 *   minY: number;
 *   minZ: number;
 *   maxX: number;
 *   maxY: number;
 *   maxZ: number;
 *   pNodeCount: number;
 * }>}
 */
export const getMinMaxPoints = async (
  client: ResqmlClient,
  dataspaceUri: string,
  geo: SimpleJson<resqml20.AbstractPoint3dArray>
): Promise<{
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  pNodeCount: number;
}> => {
  let minX: number = Number.POSITIVE_INFINITY;
  let maxX: number = Number.NEGATIVE_INFINITY;
  let minY: number = Number.POSITIVE_INFINITY;
  let maxY: number = Number.NEGATIVE_INFINITY;
  let minZ: number = Number.POSITIVE_INFINITY;
  let maxZ: number = Number.NEGATIVE_INFINITY;

  let pNodeCount = 0;

  if (geo.$type === "resqml20.Point3dHdf5Array") {
    const hdfArray = geo as SimpleJson<resqml20.Point3dHdf5Array>;
    await visitPoint3dValues(dataspaceUri, hdfArray, client, values => {
      const val = values as number[];
      val.forEach((v, index) => {
        if (!Number.isNaN(v)) {
          const mod = index % 3;
          if (mod === 0) {
            minX = Math.min(v, minX);
            maxX = Math.max(v, maxX);
          } else if (mod === 1) {
            minY = Math.min(v, minY);
            maxY = Math.max(v, maxY);
          } else {
            minZ = Math.min(v, minZ);
            maxZ = Math.max(v, maxZ);
          }
          pNodeCount++;
        }
      });
    });
    // } else if (geo.$type === "resqml20.Point3dParametricArray") {
    //   const param = geo as SimpleJson<resqml20.Point3dParametricArray>;
    //   if (param.ParametricLines.$type === "resqml20.ParametricLineArray") {
    //     const lineArray =
    //       param.ParametricLines as SimpleJson<resqml20.ParametricLineArray>;
    //     const v = await getMinMaxPoints(
    //       client,
    //       dataspaceUri,
    //       lineArray.ControlPoints
    //     );
    //     minX = v.minX;
    //     minY = v.minY;
    //     maxX = v.maxX;
    //     maxY = v.maxY;
    //   }
  } else if (geo.$type === "resqml20.Point3dZValueArray") {
    const zArray = geo as SimpleJson<resqml20.Point3dZValueArray>;
    const sup =
      zArray.SupportingGeometry as SimpleJson<resqml20.Point3dZValueArray>;
    const v = await getMinMaxPoints(client, dataspaceUri, sup);
    minX = v.minX;
    minY = v.minY;
    maxX = v.maxX;
    maxY = v.maxY;
    await visitDoubleValues(
      dataspaceUri,
      zArray.ZValues,
      client,
      (values: boolean[] | number[] | bigint[], _: IDataSubarray) => {
        const v = values as number[];
        for (const n of v) {
          if (Number.isNaN(n)) {
            continue;
          }
          minZ = Math.min(n, minZ);
          maxZ = Math.max(n, maxZ);
          pNodeCount++;
        }
      }
    );
  } else if (geo.$type === "resqml20.Point3dLatticeArray") {
    const lArray = geo as SimpleJson<resqml20.Point3dLatticeArray>;
    const [ox, oy] = [lArray.Origin.Coordinate1, lArray.Origin.Coordinate2];
    const [u, v] = [lArray.Offset[0], lArray.Offset[1]];
    if (
      u.Spacing.$type === DBL_CST_ARRAY &&
      v.Spacing.$type === DBL_CST_ARRAY
    ) {
      const uSpacing = u.Spacing as SimpleJson<resqml20.DoubleConstantArray>;
      const vSpacing = v.Spacing as SimpleJson<resqml20.DoubleConstantArray>;
      const [uLen, vLen] = [uSpacing.Value, vSpacing.Value];
      const [nu, nv] = [uSpacing.Count, vSpacing.Count];
      const [ux, uy] = [
        uLen * u.Offset.Coordinate1,
        uLen * u.Offset.Coordinate2
      ];
      const [vx, vy] = [
        vLen * v.Offset.Coordinate1,
        vLen * v.Offset.Coordinate2
      ];
      pNodeCount = nu * nv;
      for (let vv = 0; vv < nv; vv++) {
        for (let uu = 0; uu < nu; uu++) {
          const x = ox + ux * uu + vx * vv;
          const y = oy + uy * uu + vy * vv;
          minX = Math.min(x, minX);
          maxX = Math.max(x, maxX);
          minY = Math.min(y, minY);
          maxY = Math.max(y, maxY);
        }
      }
    }
  }
  return { minX, minY, minZ, maxX, maxY, maxZ, pNodeCount };
};

/**
 * Generic class for all WorkProductComponent created from Resqml Objects
 *
 * @export
 * @class WorkProductComponent
 * @template RES_TYPE
 */
export class ResqmlWorkProductComponent<
  RES_TYPE extends SimpleJson<resqml20.AbstractResqmlDataObject>
> {
  public acl: AccessControlList = { owners: [], viewers: [] };
  public kind = "";
  public legal: LegalMetaData = {
    legaltags: [],
    otherRelevantDataCountries: []
  };
  public ancestry?: ParentList;
  public createTime: Date;
  public createUser: string;
  public id: string;
  public modifyTime: Date;
  public modifyUser: string;
  public version: number;
  public tags?: { [key: string]: string };
  public meta?: FrameOfReferenceMetaDataItem[];
  protected __context?: OSDUContext;

  constructor(xml: RES_TYPE, context: OSDUContext, osduType: string) {
    this.__context = context;

    this.ancestry = undefined;
    this.createTime = xml.Citation.Creation;
    this.createUser = xml.Citation.Originator;
    this.modifyTime = xml.Citation.LastUpdate || this.createTime;
    this.modifyUser = xml.Citation.Editor || this.createUser;

    const kind = osduType.split(".")[0];

    this.kind = `osdu:wks:work-product-component--${kind}:${osduType
      .split(".")
      .slice(1)
      .join(".")}`;
    this.id = `${this.__context.partition}:work-product-component--${kind}:${xml.Uuid}`;
    this.version = 1;

    this.acl = context.acl;
    this.legal = context.legal;
    this.tags = context.tags;
  }

  /**
   * Convert a Data Object Reference to an OSDU SRN
   *
   * @param {string} uri
   * @param {(SimpleJson<eml20.DataObjectReference> | undefined)} dor
   * @return {(string | undefined)}
   * @memberof WorkProductComponent
   */
  public dorToSrn(
    uri: string,
    dor: SimpleJson<eml20.DataObjectReference> | undefined
  ): string | undefined {
    return dor === undefined || this.__context === undefined
      ? undefined
      : this.__context.uriToSrn(ResqmlWorkProductComponent.dorToUri(uri, dor));
  }

  /**
   * Convert a Data Object Reference to an ETP URI
   *
   * @static
   * @param {string} uri
   * @param {SimpleJson<eml20.DataObjectReference>} dor
   * @return {string}
   * @memberof WorkProductComponent
   */
  public static dorToUri(
    uri: string,
    dor: SimpleJson<eml20.DataObjectReference>
  ): string {
    const refType = new EtpContentType(dor.ContentType).etpType;
    const ds = EtpUri.createDataSpaceUri(new EtpUri(uri).dataSpace).uri;
    return `${ds}/${refType}(${dor.UUID})`;
  }

  /**
   * Transform a string (typically Energistics) to the OSDU naming convention (PascalCase)
   *
   * @param {(string | undefined)} str
   * @return {(string | undefined)}
   * @memberof WorkProductComponent
   */
  public capitalize(str: string | undefined): string | undefined {
    if (str === undefined) {
      return undefined;
    }
    const dec = str.split(" ");
    return dec
      .map(s => (s.length > 1 ? s.charAt(0).toUpperCase() + s.slice(1) : ""))
      .join("");
  }

  /**
   * Get a resqml object based on container ETP URI (dataspace or object) and a Data Object Reference inside the container
   *
   * @static
   * @param {ResqmlClient} client
   * @param {string} uri URI of the containing object
   * @param {SimpleJson<eml20.DataObjectReference>} dor
   * @return {(Promise<IResqmlDataObject | undefined>)}
   * @memberof WorkProductComponent
   */
  public static async getObject(
    client: ResqmlClient,
    uri: string,
    dor: SimpleJson<eml20.DataObjectReference>
  ): Promise<IResqmlDataObject | undefined> {
    if (dor._data) {
      return dor._data;
    }
    const dorUri = ResqmlWorkProductComponent.dorToUri(uri, dor);
    const objects = await client.getObjects([dorUri]);
    return objects.length === 1 && objects[0] !== null ? objects[0] : undefined;
  }

  /**
   * Compute the age of an interpretation using feature information
   *
   * @static
   * @param {ResqmlClient} client
   * @param {string} uri
   * @param {(SimpleJson<resqml20.AbstractFeatureInterpretation>
   *       | undefined)} interpretation
   * @return {(Promise<number | undefined>)}
   * @memberof WorkProductComponent
   */
  public static async age(
    client: ResqmlClient,
    uri: string,
    interpretation:
      | SimpleJson<resqml20.AbstractFeatureInterpretation>
      | undefined
  ): Promise<number | undefined> {
    if (interpretation === undefined) {
      return undefined;
    }
    const feat = (await ResqmlWorkProductComponent.getObject(
      client,
      uri,
      interpretation.InterpretedFeature
    )) as SimpleJson<resqml20.obj_GeneticBoundaryFeature>;
    return feat?.AbsoluteAge?.YearOffset;
  }

  /**
   * Create the reference to a coordinate system
   *
   * @param {(CoordinateReferenceSystem | undefined)} crs
   * @param {number} code
   * @return {(string|undefined)}
   * @memberof ResqmlWorkProductComponent
   */
  public referenceSystemId(
    crs: CoordinateReferenceSystem | undefined,
    code: number
  ): string | undefined {
    const context = this.__context;
    if (context === undefined) {
      return undefined;
    }
    return crs !== undefined
      ? crs.id + ":"
      : context.addReferenceData(
          "CoordinateReferenceSystem",
          `Projected:EPSG::${code}`
        );
  }

  /**
   * Extract the persistence string for a coordinate system
   *
   * @param {(CoordinateReferenceSystem | undefined)} crs
   * @param {number} code
   * @return {string | undefined}
   * @memberof ResqmlWorkProductComponent
   */
  public persistableReferenceSystem(
    crs: CoordinateReferenceSystem | undefined,
    code: number
  ): string | undefined {
    const context = this.__context;
    if (context === undefined) {
      return undefined;
    }

    if (crs?.data?.PersistableReference !== undefined) {
      return crs.data.PersistableReference;
    } else {
      return JSON.stringify({
        authCode: {
          auth: "EPSG",
          code: code
        }
      });
    }
  }

  /**
   * Create the OSDU spatial informations from a list of geometries
   *
   * @param {ResqmlClient} client
   * @param {string} dataspaceUri
   * @param {SimpleJson<resqml20.PointGeometry>[]} geometries
   * @return {Promise<{
   *     SpatialPoint: AbstractSpatialLocation|undefined;
   *     SpatialArea: AbstractSpatialLocation|undefined;
   *     FrameOfReferenceCRS: FrameOfReferenceMetaDataItem;
   *     NodeCount: number;
   *   }>}
   * @memberof WorkProductComponent
   */
  public async createSpatialInfo(
    client: ResqmlClient,
    dataspaceUri: string,
    geometries: SimpleJson<resqml20.PointGeometry>[]
  ): Promise<{
    SpatialPoint: AbstractSpatialLocation | undefined;
    SpatialArea: AbstractSpatialLocation | undefined;
    FrameOfReferenceCRS: FrameOfReferenceMetaDataItem;
    NodeCount: number;
  }> {
    const context = this.__context;
    if (context === undefined) {
      return Promise.reject("No context");
    }
    if (geometries.length < 1) {
      return Promise.reject("No geometry provided");
    }

    const crsObj = await ResqmlWorkProductComponent.getObject(
      client,
      dataspaceUri,
      geometries[0].LocalCrs
    );
    const crs = crsObj as SimpleJson<resqml20.obj_LocalDepth3dCrs>;

    let aMinX: number = Number.POSITIVE_INFINITY;
    let aMaxX: number = Number.NEGATIVE_INFINITY;
    let aMinY: number = Number.POSITIVE_INFINITY;
    let aMaxY: number = Number.NEGATIVE_INFINITY;
    let aMinZ: number = Number.POSITIVE_INFINITY;
    let aMaxZ: number = Number.NEGATIVE_INFINITY;
    let NodeCount = 0;

    for await (const g of geometries) {
      const { minX, minY, minZ, maxX, maxY, maxZ, pNodeCount } =
        await getMinMaxPoints(client, dataspaceUri, g.Points);
      aMinX = Math.min(minX, aMinX);
      aMinY = Math.min(minY, aMinY);
      aMinZ = Math.min(minZ, aMinZ);
      aMaxX = Math.max(maxX, aMaxX);
      aMaxY = Math.max(maxY, aMaxY);
      aMaxZ = Math.max(maxZ, aMaxZ);
      NodeCount += pNodeCount;
    }

    let CoordinateReferenceSystemID = undefined;
    let persistableReferenceCrs = "";
    let Wgs84Coordinates = undefined;

    const pointCoordinates: [number, number][] = [
      [aMinX + crs.XOffset, aMinY + crs.YOffset],
      [aMinX + crs.XOffset, aMaxY + crs.YOffset],
      [aMaxX + crs.XOffset, aMaxY + crs.YOffset],
      [aMaxX + crs.XOffset, aMinY + crs.YOffset]
    ];

    if (crs.ProjectedCrs.$type === "eml20.ProjectedCrsEpsgCode") {
      const epsgCode = (
        crs.ProjectedCrs as SimpleJson<eml20.ProjectedCrsEpsgCode>
      ).EpsgCode;

      const epsgCrs = await context.findProjectedEPSGCrs(epsgCode);

      CoordinateReferenceSystemID = this.referenceSystemId(epsgCrs, epsgCode);
      persistableReferenceCrs =
        this.persistableReferenceSystem(epsgCrs, epsgCode) || "";

      try {
        Wgs84Coordinates = await context.convertPointsWGS84(
          pointCoordinates,
          epsgCode
        );
      } catch (e) {
        ///Nothing
      }
    }

    const FrameOfReferenceCRS = {
      kind: "CRS",
      persistableReference: persistableReferenceCrs,
      coordinateReferenceSystemID: CoordinateReferenceSystemID
    };

    if (!Number.isFinite(aMinX)) {
      return {
        FrameOfReferenceCRS,
        NodeCount,
        SpatialArea: undefined,
        SpatialPoint: undefined
      };
    }

    const SpatialPoint = {
      AsIngestedCoordinates: {
        CoordinateReferenceSystemID,
        features: [
          {
            type: FluffyType.AnyCRSFeature,
            geometry: {
              type: AnyCRSGeoJSONPointType.AnyCRSPoint,
              coordinates: pointCoordinates[0]
            },
            properties: {}
          }
        ],
        persistableReferenceCrs,
        type: AsIngestedCoordinatesType.AnyCRSFeatureCollection
      },
      Wgs84Coordinates:
        Wgs84Coordinates === undefined
          ? undefined
          : {
              type: Wgs84CoordinatesType.FeatureCollection,
              features: [
                {
                  type: StickyType.Feature,
                  geometry: {
                    coordinates: Wgs84Coordinates[0],
                    type: GeoJSONPointType.Point
                  },
                  properties: {}
                }
              ]
            }
    };
    const SpatialArea = {
      AsIngestedCoordinates: {
        CoordinateReferenceSystemID,
        bbox: [
          aMinX + crs.XOffset,
          aMinY + crs.YOffset,
          aMaxX + crs.XOffset,
          aMaxY + crs.YOffset
        ],
        features: [
          {
            type: FluffyType.AnyCRSFeature,
            geometry: {
              type: AnyCRSGeoJSONPointType.AnyCRSPolygon,
              coordinates: [
                [
                  [aMinX + crs.XOffset, aMinY + crs.YOffset],
                  [aMinX + crs.XOffset, aMaxY + crs.YOffset],
                  [aMaxX + crs.XOffset, aMaxY + crs.YOffset],
                  [aMaxX + crs.XOffset, aMinY + crs.YOffset]
                ]
              ]
            },
            properties: {}
          }
        ],
        persistableReferenceCrs,
        type: AsIngestedCoordinatesType.AnyCRSFeatureCollection
      },
      Wgs84Coordinates:
        Wgs84Coordinates === undefined
          ? undefined
          : {
              type: Wgs84CoordinatesType.FeatureCollection,
              features: [
                {
                  type: StickyType.Feature,
                  geometry: {
                    coordinates: Wgs84Coordinates,
                    type: GeoJSONPointType.Polygon
                  },
                  properties: {}
                }
              ]
            }
    };
    if (SpatialPoint !== undefined && context.spatialPoint === undefined) {
      context.spatialPoint = SpatialPoint;
    }
    return { SpatialPoint, SpatialArea, FrameOfReferenceCRS, NodeCount };
  }

  /**
   * Get the objects involved in creating an object
   *
   * @param {ResqmlETPClient} client
   * @param {string} objectUri
   * @returns {Promise<SimpleJson<eml20.DataObjectReference>[]>}
   */
  public async getCreatingObjects(
    client: ResqmlClient,
    objectUri: string
  ): Promise<SimpleJson<eml20.DataObjectReference>[]> {
    const RESQML20_ACTIVITY_TYPE = "resqml20.obj_Activity";
    const sources = await client.getSources(objectUri, false, [
      RESQML20_ACTIVITY_TYPE
    ]);

    // Find all activities for which the the object is an output
    const etpUri = new EtpUri(objectUri);
    const activities: SimpleJson<resqml20.obj_Activity>[] = [];
    (await client.getObjects(sources.map(r => r.uri))).forEach(s => {
      s && activities.push(s as SimpleJson<resqml20.obj_Activity>);
    });

    const dors: SimpleJson<eml20.DataObjectReference>[] = [];
    for (const a of activities) {
      const temp = await ResqmlWorkProductComponent.getObject(
        client,
        objectUri,
        a.ActivityDescriptor
      );
      if (temp === undefined) {
        continue;
      }
      const template = temp as SimpleJson<resqml20.obj_ActivityTemplate>;
      for (const p of a.Parameter) {
        if (p.$type !== "resqml20.DataObjectParameter") {
          continue;
        }
        const dop = p as SimpleJson<resqml20.DataObjectParameter>;
        if (dop.DataObject.UUID === etpUri.uuid) {
          const tp = template.Parameter.find(t => t.Title === dop.Title);
          if (tp !== undefined && tp.IsOutput) {
            for (const p of a.Parameter) {
              if (p.$type !== "resqml20.DataObjectParameter") {
                continue;
              }
              const tp2 = template.Parameter.find(t => t.Title === p.Title);
              if (tp2?.IsInput !== true) {
                continue;
              }
              const dop = p as SimpleJson<resqml20.DataObjectParameter>;
              if (dop.DataObject.UUID !== etpUri.uuid) {
                dors.push(dop.DataObject);
              }
            }
          }
        }
      }
    }

    return dors;
  }

  /**
   * Create the AbstractCommonResources part of WPC Data
   *
   * @return {Promise<AbstractCommonResources>}
   * @memberof WorkProductComponent
   */
  public async AbstractCommonResources(
    context: OSDUContext
  ): Promise<AbstractCommonResources> {
    return {
      ExistenceKind: context.addReferenceData("ExistenceKind", "Prototype"),
      ResourceCurationStatus: undefined,
      ResourceHomeRegionID: undefined,
      ResourceHostRegionIDs: undefined,
      ResourceLifecycleStatus: undefined,
      ResourceSecurityClassification: undefined,
      Source: undefined,
      TechnicalAssuranceID: undefined
    };
  }

  /**
   * Create the AbstractWPCGroupType part of WPC Data
   *
   * @param {string} ReservoirDMSUrl
   * @return {Promise<AbstractWPCGroupType>}
   * @memberof WorkProductComponent
   */
  public async AbstractWPCGroupType(
    ReservoirDMSUrl: string,
    context: OSDUContext
  ): Promise<AbstractWPCGroupType> {
    return {
      Artefacts: undefined,
      Datasets: context.datasets(ReservoirDMSUrl),
      DDMSDatasets: [
        ReservoirDMSUrl.replace("eml:///", `eml://${context.rddmsId}/`)
      ],
      IsDiscoverable: true,
      IsExtendedLoad: false,
      TechnicalAssurances: undefined
    };
  }

  /**
   * Create the AbstractWorkProductComponent part of WPC Data
   *
   * @param {SimpleJson<resqml20.AbstractResqmlDataObject>} xml
   * @param {OSDUContext} context
   * @return {Promise<AbstractWorkProductComponent>}
   * @memberof ResqmlWorkProductComponent
   */
  public async AbstractWorkProductComponent(
    xml: SimpleJson<resqml20.AbstractResqmlDataObject>,
    context: OSDUContext
  ): Promise<AbstractWorkProductComponent> {
    return {
      AuthorIDs: undefined,
      BusinessActivities: undefined,
      CreationDateTime: this.createTime,
      Description: xml.Citation.Description,
      GeoContexts: undefined,
      LineageAssertions: undefined,
      Name: xml.Citation.Title,
      SpatialArea: undefined,
      SpatialPoint: undefined,
      SubmitterName: context.submitter,
      Tags: undefined
    };
  }

  /**
   * Create the AbstractInterpretation part of WPC Data
   *
   * @param {string} ReservoirDMSUrl
   * @param {SimpleJson<resqml20.AbstractFeatureInterpretation>} xml
   * @param {ResqmlClient} client
   * @param {OSDUContext} context
   * @return {Promise<AbstractInterpretation>}
   * @memberof ResqmlWorkProductComponent
   */
  public async AbstractInterpretation(
    ReservoirDMSUrl: string,
    xml: SimpleJson<resqml20.AbstractFeatureInterpretation>,
    client: ResqmlClient,
    context: OSDUContext
  ): Promise<AbstractInterpretation> {
    const feat = (await ResqmlWorkProductComponent.getObject(
      client,
      ReservoirDMSUrl,
      xml.InterpretedFeature
    )) as SimpleJson<resqml20.AbstractFeature>;

    const strAge = await ResqmlWorkProductComponent.age(
      client,
      ReservoirDMSUrl,
      xml
    );
    let OlderPossibleAge = strAge;
    let YoungerPossibleAge = strAge;
    if (xml.HasOccuredDuring?.ChronoBottom !== undefined) {
      const bot = (await ResqmlWorkProductComponent.getObject(
        client,
        ReservoirDMSUrl,
        xml.HasOccuredDuring?.ChronoBottom
      )) as SimpleJson<resqml20.obj_StratigraphicUnitInterpretation>;
      OlderPossibleAge = await ResqmlWorkProductComponent.age(
        client,
        ReservoirDMSUrl,
        bot
      );
    }
    if (xml.HasOccuredDuring?.ChronoTop !== undefined) {
      const top = (await ResqmlWorkProductComponent.getObject(
        client,
        ReservoirDMSUrl,
        xml.HasOccuredDuring?.ChronoTop
      )) as SimpleJson<resqml20.obj_StratigraphicUnitInterpretation>;
      YoungerPossibleAge = await ResqmlWorkProductComponent.age(
        client,
        ReservoirDMSUrl,
        top
      );
    }

    return {
      DomainTypeID: context.addReferenceData(
        "DomainType",
        this.capitalize(xml.Domain)
      ),
      FeatureID: this.dorToSrn(ReservoirDMSUrl, xml.InterpretedFeature),
      FeatureName: feat.Citation.Title,
      OlderPossibleAge,
      YoungerPossibleAge
    };
  }
}
