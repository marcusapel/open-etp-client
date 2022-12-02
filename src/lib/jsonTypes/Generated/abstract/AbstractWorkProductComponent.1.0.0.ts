// To parse this data:
//
//   import { Convert, AbstractWorkProductComponent } from "./file";
//
//   const abstractWorkProductComponent = Convert.toAbstractWorkProductComponent(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * Generic reference object containing the universal properties of a Work Product Component
 * for inclusion in data type specific Work Product Component objects
 */
export interface AbstractWorkProductComponent {
    /**
     * Array of Authors' names of the work product component.  Could be a person or company
     * entity.
     */
    AuthorIDs?: string[];
    /**
     * Array of business processes/workflows that the work product component has been through
     * (ex. well planning, exploration).
     */
    BusinessActivities?: string[];
    /**
     * Date that a resource (work  product component here) is formed outside of OSDU before
     * loading (e.g. publication date).
     */
    CreationDateTime?: Date;
    /**
     * Description.  Summary of the work product component.  Not the same as Remark which
     * captures thoughts of creator about the wpc.
     */
    Description?: string;
    /**
     * List of geographic entities which provide context to the WPC.  This may include multiple
     * types or multiple values of the same type.
     */
    GeoContexts?: AbstractGeoContext[];
    /**
     * Defines relationships with other objects (any kind of Resource) upon which this work
     * product component depends.  The assertion is directed only from the asserting WPC to
     * ancestor objects, not children.  It should not be used to refer to files or artefacts
     * within the WPC -- the association within the WPC is sufficient and Artefacts are actually
     * children of the main WPC file. They should be recorded in the data.Artefacts[] array.
     */
    LineageAssertions?: LineageAssertion[];
    /**
     * Name
     */
    Name?: string;
    /**
     * A polygon boundary that reflects the locale of the content of the work product component
     * (location of the subject matter).
     */
    SpatialArea?: AbstractSpatialLocation;
    /**
     * A centroid point that reflects the locale of the content of the work product component
     * (location of the subject matter).
     */
    SpatialPoint?: AbstractSpatialLocation;
    /**
     * Name of the person that first submitted the work product component to OSDU.
     */
    SubmitterName?: string;
    /**
     * Array of key words to identify the work product, especially to help in search.
     */
    Tags?: string[];
}

/**
 * A geographic context to an entity. It can be either a reference to a GeoPoliticalEntity,
 * Basin, Field, Play or Prospect.
 *
 * A single, typed geo-political entity reference, which is 'abstracted' to
 * AbstractGeoContext and then aggregated by GeoContexts properties.
 *
 * A single, typed basin entity reference, which is 'abstracted' to AbstractGeoContext and
 * then aggregated by GeoContexts properties.
 *
 * A single, typed field entity reference, which is 'abstracted' to AbstractGeoContext and
 * then aggregated by GeoContexts properties.
 *
 * A single, typed Play entity reference, which is 'abstracted' to AbstractGeoContext and
 * then aggregated by GeoContexts properties.
 *
 * A single, typed Prospect entity reference, which is 'abstracted' to AbstractGeoContext
 * and then aggregated by GeoContexts properties.
 */
export interface AbstractGeoContext {
    /**
     * Reference to GeoPoliticalEntity.
     */
    GeoPoliticalEntityID?: string;
    /**
     * The GeoPoliticalEntityType reference of the GeoPoliticalEntity (via GeoPoliticalEntityID)
     * for application convenience.
     *
     * The BasinType reference of the Basin (via BasinID) for application convenience.
     *
     * The fixed type 'Field' for this AbstractGeoFieldContext.
     *
     * The PlayType reference of the Play (via PlayID) for application convenience.
     *
     * The ProspectType reference of the Prospect (via ProspectID) for application convenience.
     */
    GeoTypeID?: string;
    /**
     * Reference to Basin.
     */
    BasinID?: string;
    /**
     * Reference to Field.
     */
    FieldID?: string;
    /**
     * Reference to the play.
     */
    PlayID?: string;
    /**
     * Reference to the prospect.
     */
    ProspectID?: string;
}

/**
 * Defines relationships with other objects (any kind of Resource) upon which this work
 * product component depends.  The assertion is directed only from the asserting WPC to
 * ancestor objects, not children.  It should not be used to refer to files or artefacts
 * within the WPC -- the association within the WPC is sufficient and Artefacts are actually
 * children of the main WPC file. They should be recorded in the data.Artefacts[] array.
 */
export interface LineageAssertion {
    /**
     * The object reference identifying the DIRECT, INDIRECT, REFERENCE dependency.
     */
    ID?: string;
    /**
     * Used by LineageAssertion to describe the nature of the line of descent of a work product
     * component from a prior Resource, such as DIRECT, INDIRECT, REFERENCE.  It is not for
     * proximity (number of nodes away), it is not to cover all the relationships in a full
     * ontology or graph, and it is not to describe the type of activity that created the
     * asserting WPC.  LineageAssertion does not encompass a full provenance, process history,
     * or activity model.
     */
    LineageRelationshipType?: string;
}

/**
 * A polygon boundary that reflects the locale of the content of the work product component
 * (location of the subject matter).
 *
 * A geographic object which can be described by a set of points.
 *
 * A centroid point that reflects the locale of the content of the work product component
 * (location of the subject matter).
 */
export interface AbstractSpatialLocation {
    /**
     * The audit trail of operations applied to the coordinates from the original state to the
     * current state. The list may contain operations applied prior to ingestion as well as the
     * operations applied to produce the Wgs84Coordinates. The text elements refer to ESRI style
     * CRS and Transformation names, which may have to be translated to EPSG standard names.
     */
    AppliedOperations?: string[];
    /**
     * The original or 'as ingested' coordinates (Point, MultiPoint, LineString,
     * MultiLineString, Polygon or MultiPolygon). The name 'AsIngestedCoordinates' was chosen to
     * contrast it to 'OriginalCoordinates', which carries the uncertainty whether any
     * coordinate operations took place before ingestion. In cases where the original CRS is
     * different from the as-ingested CRS, the AppliedOperations can also contain the list of
     * operations applied to the coordinate prior to ingestion. The data structure is similar to
     * GeoJSON FeatureCollection, however in a CRS context explicitly defined within the
     * AbstractAnyCrsFeatureCollection. The coordinate sequence follows GeoJSON standard, i.e.
     * 'eastward/longitude', 'northward/latitude' {, 'upward/height' unless overridden by an
     * explicit direction in the AsIngestedCoordinates.VerticalCoordinateReferenceSystemID}.
     */
    AsIngestedCoordinates?: AbstractAnyCRSFeatureCollection;
    /**
     * The date of the Quality Check.
     */
    CoordinateQualityCheckDateTime?: Date;
    /**
     * The user who performed the Quality Check.
     */
    CoordinateQualityCheckPerformedBy?: string;
    /**
     * Freetext remarks on Quality Check.
     */
    CoordinateQualityCheckRemarks?: string[];
    /**
     * A qualitative description of the quality of a spatial location, e.g. unverifiable, not
     * verified, basic validation.
     */
    QualitativeSpatialAccuracyTypeID?: string;
    /**
     * An approximate quantitative assessment of the quality of a location (accurate to > 500 m
     * (i.e. not very accurate)), to < 1 m, etc.
     */
    QuantitativeAccuracyBandID?: string;
    /**
     * Indicates the expected look of the SpatialParameterType, e.g. Point, MultiPoint,
     * LineString, MultiLineString, Polygon, MultiPolygon. The value constrains the type of
     * geometries in the GeoJSON Wgs84Coordinates and AsIngestedCoordinates.
     */
    SpatialGeometryTypeID?: string;
    /**
     * Date when coordinates were measured or retrieved.
     */
    SpatialLocationCoordinatesDate?: Date;
    /**
     * A type of spatial representation of an object, often general (e.g. an Outline, which
     * could be applied to Field, Reservoir, Facility, etc.) or sometimes specific (e.g. Onshore
     * Outline, State Offshore Outline, Federal Offshore Outline, 3 spatial representations that
     * may be used by Countries).
     */
    SpatialParameterTypeID?: string;
    /**
     * The normalized coordinates (Point, MultiPoint, LineString, MultiLineString, Polygon or
     * MultiPolygon) based on WGS 84 (EPSG:4326 for 2-dimensional coordinates, EPSG:4326 +
     * EPSG:5714 (MSL) for 3-dimensional coordinates). This derived coordinate representation is
     * intended for global discoverability only. The schema of this substructure is identical to
     * the GeoJSON FeatureCollection https://geojson.org/schema/FeatureCollection.json. The
     * coordinate sequence follows GeoJSON standard, i.e. longitude, latitude {, height}
     */
    Wgs84Coordinates?: GeoJSONFeatureCollection;
}

/**
 * The original or 'as ingested' coordinates (Point, MultiPoint, LineString,
 * MultiLineString, Polygon or MultiPolygon). The name 'AsIngestedCoordinates' was chosen to
 * contrast it to 'OriginalCoordinates', which carries the uncertainty whether any
 * coordinate operations took place before ingestion. In cases where the original CRS is
 * different from the as-ingested CRS, the AppliedOperations can also contain the list of
 * operations applied to the coordinate prior to ingestion. The data structure is similar to
 * GeoJSON FeatureCollection, however in a CRS context explicitly defined within the
 * AbstractAnyCrsFeatureCollection. The coordinate sequence follows GeoJSON standard, i.e.
 * 'eastward/longitude', 'northward/latitude' {, 'upward/height' unless overridden by an
 * explicit direction in the AsIngestedCoordinates.VerticalCoordinateReferenceSystemID}.
 *
 * A schema like GeoJSON FeatureCollection with a non-WGS 84 CRS context; based on
 * https://geojson.org/schema/FeatureCollection.json. Attention: the coordinate order is
 * fixed: Longitude/Easting/Westing/X first, followed by Latitude/Northing/Southing/Y,
 * optionally height as third coordinate.
 */
export interface AbstractAnyCRSFeatureCollection {
    bbox?: number[];
    /**
     * The CRS reference into the CoordinateReferenceSystem catalog.
     */
    CoordinateReferenceSystemID?: string;
    features:                     AnyCRSGeoJSONFeature[];
    /**
     * The CRS reference as persistableReference string. If populated, the
     * CoordinateReferenceSystemID takes precedence.
     */
    persistableReferenceCrs: string;
    /**
     * The unit of measure for the Z-axis (only for 3-dimensional coordinates, where the CRS
     * does not describe the vertical unit). Note that the direction is upwards positive, i.e. Z
     * means height.
     */
    persistableReferenceUnitZ?: string;
    /**
     * The VerticalCRS reference as persistableReference string. If populated, the
     * VerticalCoordinateReferenceSystemID takes precedence. The property is null or empty for
     * 2D geometries. For 3D geometries and absent or null persistableReferenceVerticalCrs the
     * vertical CRS is either provided via persistableReferenceCrs's CompoundCRS or it is
     * implicitly defined as EPSG:5714 MSL height.
     */
    persistableReferenceVerticalCrs?: string;
    type:                             AsIngestedCoordinatesType;
    /**
     * The explicit VerticalCRS reference into the CoordinateReferenceSystem catalog. This
     * property stays empty for 2D geometries. Absent or empty values for 3D geometries mean the
     * context may be provided by a CompoundCRS in 'CoordinateReferenceSystemID' or implicitly
     * EPSG:5714 MSL height
     */
    VerticalCoordinateReferenceSystemID?: string;
}

export interface AnyCRSGeoJSONFeature {
    bbox?:      number[];
    geometry:   null | AnyCRSGeoJSON;
    properties: { [key: string]: any } | null;
    type:       FluffyType;
}

export interface AnyCRSGeoJSON {
    bbox?:        number[];
    coordinates?: Array<Array<Array<number[] | number> | number> | number>;
    type:         AnyCRSGeoJSONPointType;
    geometries?:  GeometryElement[];
}

export interface GeometryElement {
    bbox?:       number[];
    coordinates: Array<Array<Array<number[] | number> | number> | number>;
    type:        PurpleType;
}

export enum PurpleType {
    AnyCRSLineString = "AnyCrsLineString",
    AnyCRSMultiLineString = "AnyCrsMultiLineString",
    AnyCRSMultiPoint = "AnyCrsMultiPoint",
    AnyCRSMultiPolygon = "AnyCrsMultiPolygon",
    AnyCRSPoint = "AnyCrsPoint",
    AnyCRSPolygon = "AnyCrsPolygon",
}

export enum AnyCRSGeoJSONPointType {
    AnyCRSGeometryCollection = "AnyCrsGeometryCollection",
    AnyCRSLineString = "AnyCrsLineString",
    AnyCRSMultiLineString = "AnyCrsMultiLineString",
    AnyCRSMultiPoint = "AnyCrsMultiPoint",
    AnyCRSMultiPolygon = "AnyCrsMultiPolygon",
    AnyCRSPoint = "AnyCrsPoint",
    AnyCRSPolygon = "AnyCrsPolygon",
}

export enum FluffyType {
    AnyCRSFeature = "AnyCrsFeature",
}

export enum AsIngestedCoordinatesType {
    AnyCRSFeatureCollection = "AnyCrsFeatureCollection",
}

/**
 * The normalized coordinates (Point, MultiPoint, LineString, MultiLineString, Polygon or
 * MultiPolygon) based on WGS 84 (EPSG:4326 for 2-dimensional coordinates, EPSG:4326 +
 * EPSG:5714 (MSL) for 3-dimensional coordinates). This derived coordinate representation is
 * intended for global discoverability only. The schema of this substructure is identical to
 * the GeoJSON FeatureCollection https://geojson.org/schema/FeatureCollection.json. The
 * coordinate sequence follows GeoJSON standard, i.e. longitude, latitude {, height}
 *
 * GeoJSON feature collection as originally published in
 * https://geojson.org/schema/FeatureCollection.json. Attention: the coordinate order is
 * fixed: Longitude first, followed by Latitude, optionally height above MSL (EPSG:5714) as
 * third coordinate.
 */
export interface GeoJSONFeatureCollection {
    bbox?:    number[];
    features: GeoJSONFeature[];
    type:     Wgs84CoordinatesType;
}

export interface GeoJSONFeature {
    bbox?:      number[];
    geometry:   null | GeoJSON;
    properties: { [key: string]: any } | null;
    type:       StickyType;
}

export interface GeoJSON {
    bbox?:        number[];
    coordinates?: Array<Array<Array<number[] | number> | number> | number>;
    type:         GeoJSONPointType;
    geometries?:  GeometryObject[];
}

export interface GeometryObject {
    bbox?:       number[];
    coordinates: Array<Array<Array<number[] | number> | number> | number>;
    type:        TentacledType;
}

export enum TentacledType {
    LineString = "LineString",
    MultiLineString = "MultiLineString",
    MultiPoint = "MultiPoint",
    MultiPolygon = "MultiPolygon",
    Point = "Point",
    Polygon = "Polygon",
}

export enum GeoJSONPointType {
    GeometryCollection = "GeometryCollection",
    LineString = "LineString",
    MultiLineString = "MultiLineString",
    MultiPoint = "MultiPoint",
    MultiPolygon = "MultiPolygon",
    Point = "Point",
    Polygon = "Polygon",
}

export enum StickyType {
    Feature = "Feature",
}

export enum Wgs84CoordinatesType {
    FeatureCollection = "FeatureCollection",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toAbstractWorkProductComponent(json: string): AbstractWorkProductComponent {
        return cast(JSON.parse(json), r("AbstractWorkProductComponent"));
    }

    public static abstractWorkProductComponentToJson(value: AbstractWorkProductComponent): string {
        return JSON.stringify(uncast(value, r("AbstractWorkProductComponent")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "AbstractWorkProductComponent": o([
        { json: "AuthorIDs", js: "AuthorIDs", typ: u(undefined, a("")) },
        { json: "BusinessActivities", js: "BusinessActivities", typ: u(undefined, a("")) },
        { json: "CreationDateTime", js: "CreationDateTime", typ: u(undefined, Date) },
        { json: "Description", js: "Description", typ: u(undefined, "") },
        { json: "GeoContexts", js: "GeoContexts", typ: u(undefined, a(r("AbstractGeoContext"))) },
        { json: "LineageAssertions", js: "LineageAssertions", typ: u(undefined, a(r("LineageAssertion"))) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "SpatialArea", js: "SpatialArea", typ: u(undefined, r("AbstractSpatialLocation")) },
        { json: "SpatialPoint", js: "SpatialPoint", typ: u(undefined, r("AbstractSpatialLocation")) },
        { json: "SubmitterName", js: "SubmitterName", typ: u(undefined, "") },
        { json: "Tags", js: "Tags", typ: u(undefined, a("")) },
    ], "any"),
    "AbstractGeoContext": o([
        { json: "GeoPoliticalEntityID", js: "GeoPoliticalEntityID", typ: u(undefined, "") },
        { json: "GeoTypeID", js: "GeoTypeID", typ: u(undefined, "") },
        { json: "BasinID", js: "BasinID", typ: u(undefined, "") },
        { json: "FieldID", js: "FieldID", typ: u(undefined, "") },
        { json: "PlayID", js: "PlayID", typ: u(undefined, "") },
        { json: "ProspectID", js: "ProspectID", typ: u(undefined, "") },
    ], "any"),
    "LineageAssertion": o([
        { json: "ID", js: "ID", typ: u(undefined, "") },
        { json: "LineageRelationshipType", js: "LineageRelationshipType", typ: u(undefined, "") },
    ], "any"),
    "AbstractSpatialLocation": o([
        { json: "AppliedOperations", js: "AppliedOperations", typ: u(undefined, a("")) },
        { json: "AsIngestedCoordinates", js: "AsIngestedCoordinates", typ: u(undefined, r("AbstractAnyCRSFeatureCollection")) },
        { json: "CoordinateQualityCheckDateTime", js: "CoordinateQualityCheckDateTime", typ: u(undefined, Date) },
        { json: "CoordinateQualityCheckPerformedBy", js: "CoordinateQualityCheckPerformedBy", typ: u(undefined, "") },
        { json: "CoordinateQualityCheckRemarks", js: "CoordinateQualityCheckRemarks", typ: u(undefined, a("")) },
        { json: "QualitativeSpatialAccuracyTypeID", js: "QualitativeSpatialAccuracyTypeID", typ: u(undefined, "") },
        { json: "QuantitativeAccuracyBandID", js: "QuantitativeAccuracyBandID", typ: u(undefined, "") },
        { json: "SpatialGeometryTypeID", js: "SpatialGeometryTypeID", typ: u(undefined, "") },
        { json: "SpatialLocationCoordinatesDate", js: "SpatialLocationCoordinatesDate", typ: u(undefined, Date) },
        { json: "SpatialParameterTypeID", js: "SpatialParameterTypeID", typ: u(undefined, "") },
        { json: "Wgs84Coordinates", js: "Wgs84Coordinates", typ: u(undefined, r("GeoJSONFeatureCollection")) },
    ], "any"),
    "AbstractAnyCRSFeatureCollection": o([
        { json: "bbox", js: "bbox", typ: u(undefined, a(3.14)) },
        { json: "CoordinateReferenceSystemID", js: "CoordinateReferenceSystemID", typ: u(undefined, "") },
        { json: "features", js: "features", typ: a(r("AnyCRSGeoJSONFeature")) },
        { json: "persistableReferenceCrs", js: "persistableReferenceCrs", typ: "" },
        { json: "persistableReferenceUnitZ", js: "persistableReferenceUnitZ", typ: u(undefined, "") },
        { json: "persistableReferenceVerticalCrs", js: "persistableReferenceVerticalCrs", typ: u(undefined, "") },
        { json: "type", js: "type", typ: r("AsIngestedCoordinatesType") },
        { json: "VerticalCoordinateReferenceSystemID", js: "VerticalCoordinateReferenceSystemID", typ: u(undefined, "") },
    ], "any"),
    "AnyCRSGeoJSONFeature": o([
        { json: "bbox", js: "bbox", typ: u(undefined, a(3.14)) },
        { json: "geometry", js: "geometry", typ: u(null, r("AnyCRSGeoJSON")) },
        { json: "properties", js: "properties", typ: u(m("any"), null) },
        { json: "type", js: "type", typ: r("FluffyType") },
    ], "any"),
    "AnyCRSGeoJSON": o([
        { json: "bbox", js: "bbox", typ: u(undefined, a(3.14)) },
        { json: "coordinates", js: "coordinates", typ: u(undefined, a(u(a(u(a(u(a(3.14), 3.14)), 3.14)), 3.14))) },
        { json: "type", js: "type", typ: r("AnyCRSGeoJSONPointType") },
        { json: "geometries", js: "geometries", typ: u(undefined, a(r("GeometryElement"))) },
    ], "any"),
    "GeometryElement": o([
        { json: "bbox", js: "bbox", typ: u(undefined, a(3.14)) },
        { json: "coordinates", js: "coordinates", typ: a(u(a(u(a(u(a(3.14), 3.14)), 3.14)), 3.14)) },
        { json: "type", js: "type", typ: r("PurpleType") },
    ], "any"),
    "GeoJSONFeatureCollection": o([
        { json: "bbox", js: "bbox", typ: u(undefined, a(3.14)) },
        { json: "features", js: "features", typ: a(r("GeoJSONFeature")) },
        { json: "type", js: "type", typ: r("Wgs84CoordinatesType") },
    ], "any"),
    "GeoJSONFeature": o([
        { json: "bbox", js: "bbox", typ: u(undefined, a(3.14)) },
        { json: "geometry", js: "geometry", typ: u(null, r("GeoJSON")) },
        { json: "properties", js: "properties", typ: u(m("any"), null) },
        { json: "type", js: "type", typ: r("StickyType") },
    ], "any"),
    "GeoJSON": o([
        { json: "bbox", js: "bbox", typ: u(undefined, a(3.14)) },
        { json: "coordinates", js: "coordinates", typ: u(undefined, a(u(a(u(a(u(a(3.14), 3.14)), 3.14)), 3.14))) },
        { json: "type", js: "type", typ: r("GeoJSONPointType") },
        { json: "geometries", js: "geometries", typ: u(undefined, a(r("GeometryObject"))) },
    ], "any"),
    "GeometryObject": o([
        { json: "bbox", js: "bbox", typ: u(undefined, a(3.14)) },
        { json: "coordinates", js: "coordinates", typ: a(u(a(u(a(u(a(3.14), 3.14)), 3.14)), 3.14)) },
        { json: "type", js: "type", typ: r("TentacledType") },
    ], "any"),
    "PurpleType": [
        "AnyCrsLineString",
        "AnyCrsMultiLineString",
        "AnyCrsMultiPoint",
        "AnyCrsMultiPolygon",
        "AnyCrsPoint",
        "AnyCrsPolygon",
    ],
    "AnyCRSGeoJSONPointType": [
        "AnyCrsGeometryCollection",
        "AnyCrsLineString",
        "AnyCrsMultiLineString",
        "AnyCrsMultiPoint",
        "AnyCrsMultiPolygon",
        "AnyCrsPoint",
        "AnyCrsPolygon",
    ],
    "FluffyType": [
        "AnyCrsFeature",
    ],
    "AsIngestedCoordinatesType": [
        "AnyCrsFeatureCollection",
    ],
    "TentacledType": [
        "LineString",
        "MultiLineString",
        "MultiPoint",
        "MultiPolygon",
        "Point",
        "Polygon",
    ],
    "GeoJSONPointType": [
        "GeometryCollection",
        "LineString",
        "MultiLineString",
        "MultiPoint",
        "MultiPolygon",
        "Point",
        "Polygon",
    ],
    "StickyType": [
        "Feature",
    ],
    "Wgs84CoordinatesType": [
        "FeatureCollection",
    ],
};
