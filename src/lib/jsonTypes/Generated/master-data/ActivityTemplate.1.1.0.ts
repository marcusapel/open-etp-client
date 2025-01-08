// To parse this data:
//
//   import { Convert, ActivityTemplate } from "./file";
//
//   const activityTemplate = Convert.toActivityTemplate(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * Description of one type of activity, e.g., a work-step in a workflow.
 */
export interface ActivityTemplate {
    /**
     * The access control tags associated with this entity.
     */
    acl: AccessControlList;
    /**
     * The links to data, which constitute the inputs, from which this record instance is
     * derived.
     */
    ancestry?: ParentList;
    /**
     * Timestamp of the time at which initial version of this OSDU resource object was created.
     * Set by the System. The value is a combined date-time string in ISO-8601 given in UTC.
     */
    createTime?: Date;
    /**
     * The user reference, which created the first version of this resource object. Set by the
     * System.
     */
    createUser?: string;
    data?:       Data;
    /**
     * Previously called ResourceID or SRN which identifies this OSDU resource object without
     * version.
     */
    id?: string;
    /**
     * The schema identification for the OSDU resource object following the pattern
     * {Namespace}:{Source}:{Type}:{VersionMajor}.{VersionMinor}.{VersionPatch}. The versioning
     * scheme follows the semantic versioning, https://semver.org/.
     */
    kind: string;
    /**
     * The entity's legal tags and compliance status. The actual contents associated with the
     * legal tags is managed by the Compliance Service.
     */
    legal: LegalMetaData;
    /**
     * The Frame of Reference meta data section linking the named properties to self-contained
     * definitions.
     */
    meta?: FrameOfReferenceMetaDataItem[];
    /**
     * Timestamp of the time at which this version of the OSDU resource object was created. Set
     * by the System. The value is a combined date-time string in ISO-8601 given in UTC.
     */
    modifyTime?: Date;
    /**
     * The user reference, which created this version of this resource object. Set by the System.
     */
    modifyUser?: string;
    /**
     * A generic dictionary of string keys mapping to string value. Only strings are permitted
     * as keys and values.
     */
    tags?: { [key: string]: string };
    /**
     * The version number of this OSDU resource; set by the framework.
     */
    version?: number;
}

/**
 * The access control tags associated with this entity.
 *
 * The access control tags associated with this entity. This structure is included by the
 * SystemProperties "acl", which is part of all OSDU records. Not extensible.
 */
export interface AccessControlList {
    /**
     * The list of owners of this data record formatted as an email
     * (core.common.model.storage.validation.ValidationDoc.EMAIL_REGEX).
     */
    owners: string[];
    /**
     * The list of viewers to which this data record is accessible/visible/discoverable
     * formatted as an email (core.common.model.storage.validation.ValidationDoc.EMAIL_REGEX).
     */
    viewers: string[];
}

/**
 * The links to data, which constitute the inputs, from which this record instance is
 * derived.
 *
 * A list of entity id:version references to record instances recorded in the data platform,
 * from which the current record is derived and from which the legal tags must be derived.
 * This structure is included by the SystemProperties "ancestry", which is part of all OSDU
 * records. Not extensible.
 */
export interface ParentList {
    /**
     * An array of none, one or many entity references of 'direct parents' in the data platform,
     * which mark the current record as a derivative. In contrast to other relationships, the
     * source record version is required. During record creation or update the
     * ancestry.parents[] relationships are used to collect the legal tags from the sources and
     * aggregate them in the legal.legaltags[] array. As a consequence, should e.g., one or more
     * of the legal tags of the source data expire, the access to the derivatives is also
     * terminated. For details, see ComplianceService tutorial, 'Creating derivative Records'.
     */
    parents?: string[];
}

/**
 * Common resources to be injected at root 'data' level for every entity, which is
 * persistable in Storage. The insertion is performed by the OsduSchemaComposer script.
 *
 * Properties shared with all master-data schema instances.
 */
export interface Data {
    /**
     * Where does this data resource sit in the cradle-to-grave span of its existence?
     */
    ExistenceKind?: string;
    /**
     * Describes the current Curation status.
     */
    ResourceCurationStatus?: string;
    /**
     * The name of the home [cloud environment] region for this OSDU resource object.
     */
    ResourceHomeRegionID?: string;
    /**
     * The name of the host [cloud environment] region(s) for this OSDU resource object.
     */
    ResourceHostRegionIDs?: string[];
    /**
     * Describes the current Resource Lifecycle status.
     */
    ResourceLifecycleStatus?: string;
    /**
     * Classifies the security level of the resource.
     */
    ResourceSecurityClassification?: string;
    /**
     * The entity that produced the record, or from which it is received; could be an
     * organization, agency, system, internal team, or individual. For informational purposes
     * only, the list of sources is not governed.
     */
    Source?: string;
    /**
     * DEPRECATED: Describes a record's overall suitability for general business consumption
     * based on data quality. Clarifications: Since Certified is the highest classification of
     * suitable quality, any further change or versioning of a Certified record should be
     * carefully considered and justified. If a Technical Assurance value is not populated then
     * one can assume the data has not been evaluated or its quality is unknown (=Unevaluated).
     * Technical Assurance values are not intended to be used for the identification of a single
     * "preferred" or "definitive" record by comparison with other records.
     */
    TechnicalAssuranceID?: string;
    /**
     * List of geographic entities which provide context to the master data. This may include
     * multiple types or multiple values of the same type.
     */
    GeoContexts?: AbstractGeoContext[];
    /**
     * Alternative names, including historical, by which this master data is/has been known (it
     * should include all the identifiers).
     */
    NameAliases?: AbstractAliasNames[];
    /**
     * The spatial location information such as coordinates, CRS information (left empty when
     * not appropriate).
     */
    SpatialLocation?: AbstractSpatialLocation;
    /**
     * Describes a record's overall suitability for general business consumption in context of
     * one or more workflows/personas based on data quality and reviewer's decisions.
     * Clarifications: Since Certified is the highest classification of suitable quality, any
     * further change or versioning of a Certified record should be carefully considered and
     * justified. If a Technical Assurance value is not populated then one can assume the data
     * has not been evaluated or its quality is unknown (=Unevaluated). Technical Assurance
     * values are not intended to be used for the identification of a single "preferred" or
     * "definitive" record by comparison with other records.
     */
    TechnicalAssurances?: AbstractTechnicalAssurance[];
    /**
     * DEPRECATED: (in favor of more nuanced TechnicalAssurances[] array) Describes a
     * master-data record's overall suitability for general business consumption based on data
     * quality. Clarifications: Since Certified is the highest classification of suitable
     * quality, any further change or versioning of a Certified record should be carefully
     * considered and justified. If a Technical Assurance value is not populated then one can
     * assume the data has not been evaluated or its quality is unknown (=Unevaluated).
     * Technical Assurance values are not intended to be used for the identification of a single
     * "preferred" or "definitive" record by comparison with other records.
     */
    TechnicalAssuranceTypeID?: string;
    /**
     * This describes the reason that caused the creation of a new version of this master data.
     */
    VersionCreationReason?: string;
    /**
     * A detailed textual description of this activity template or workflow.
     */
    Description?: string;
    /**
     * The descriptive name of this activity template or work-step in a workflow.
     */
    Name?: string;
    /**
     * The parameters that participate in this type of activity.
     */
    Parameters:           ParameterTemplate[];
    ExtensionProperties?: { [key: string]: any };
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
 * A list of alternative names for an object.  The preferred name is in a separate, scalar
 * property.  It may or may not be repeated in the alias list, though a best practice is to
 * include it if the list is present, but to omit the list if there are no other names.
 * Note that the abstract entity is an array so the $ref to it is a simple property
 * reference.
 */
export interface AbstractAliasNames {
    /**
     * Alternative Name value of defined name type for an object.
     */
    AliasName?: string;
    /**
     * A classification of alias names such as by role played or type of source, such as
     * regulatory name, regulatory code, company code, international standard name, etc.
     */
    AliasNameTypeID?: string;
    /**
     * The StandardsOrganisation (reference-data) or Organisation (master-data) that provided
     * the name (the source).
     */
    DefinitionOrganisationID?: string;
    /**
     * The date and time when an alias name becomes effective.
     */
    EffectiveDateTime?: Date;
    /**
     * The data and time when an alias name is no longer in effect.
     */
    TerminationDateTime?: Date;
}

/**
 * Description of one parameter that participates in one type of activity. [Without
 * inheritance, combined specializations.]
 */
export interface ParameterTemplate {
    /**
     * If no allowed kind is given, then all kind of data types are allowed.
     */
    AllowedParameterKind?: string;
    /**
     * Textual description of additional constraint associated with the parameter. (note that it
     * will be better to have a formal description of the constraint)
     */
    Constraint?: string;
    /**
     * When parameter is limited to data object of given types, describe the allowed types. Used
     * only when ParameterType is dataObject.  String is an OSDU kind of work product component.
     */
    DataObjectContentType?: string[];
    /**
     * Activity Parameter value to use if one not supplied.
     */
    DefaultValue?: AbstractActivityParameter;
    /**
     * Indicates if the parameter is an input of the activity. If the parameter is a data object
     * and is also an output of the activity, it is strongly advised to use two parameters : one
     * for input and one for output. The reason is to be able to give two different versions
     * strings for the input and output data object which has got obviously the same UUID.
     */
    IsInput: boolean;
    /**
     * Indicates if the parameter is an output of the activity. If the parameter is a data
     * object and is also an input of the activity, it is strongly advised to use two parameters
     * : one for input and one for output. The reason is to be able to give two different
     * versions strings for the input and output data object which has got obviously the same
     * UUID.
     */
    IsOutput: boolean;
    /**
     * Allows to indicate that, in the same activity, this parameter template must be associated
     * to another parameter template identified by its title. The associated parameter value
     * constrains this parameter.
     */
    KeyConstraints?: string[];
    /**
     * Maximum number of parameters of this type allowed in the activity. If the maximum number
     * of parameters is infinite, use -1 value.
     */
    MaxOccurs: number;
    /**
     * Minimum number of parameter of this type required by the activity. If the minimum number
     * of parameters is infinite, use -1 value.
     */
    MinOccurs: number;
    /**
     * The property type ID and Name, which determines eventually the UnitQuantity of the
     * parameter value. Used to provide a more scoped context than UnitQuantityID. If
     * PropertyType is provided, UnitQuantityID is expected to be omitted.
     */
    PropertyType?: AbstractPropertyType;
    /**
     * Name of the parameter in the activity. Key to identify parameter.
     */
    Title: string;
    /**
     * The expected UnitQuantity for the parameter value. A more precise context can be
     * provided by PropertyType. If UnitQuantityID is provided, PropertyType is expected to be
     * omitted.
     */
    UnitQuantityID?: string;
}

/**
 * Activity Parameter value to use if one not supplied.
 *
 * General parameter value used in one instance of activity.
 * [Without inheritance, combined specializations.]
 */
export interface AbstractActivityParameter {
    /**
     * The boolean parameter value, if ParameterKindID refers to the Boolean type.
     */
    BooleanParameter?: boolean;
    /**
     * Parameter referencing to a top level object.
     */
    DataObjectParameter?: string;
    /**
     * Parameter containing a double value.
     */
    DataQuantityParameter?: number;
    /**
     * Identifies unit of measure for floating point value.
     */
    DataQuantityParameterUOMID?: string;
    /**
     * When parameter is an array, used to indicate the index in the array.
     */
    Index?: number;
    /**
     * Parameter containing an integer value.
     */
    IntegerQuantityParameter?: number;
    /**
     * A nested array describing keys used to identify a parameter value. When multiple values
     * are provided for a given parameter, the key provides a way to identify the parameter
     * through its association with an object, a time index or a parameter array member via
     * ParameterKey value.
     */
    Keys?: ParameterKey[];
    /**
     * [Added to cover lack of inheritance]
     */
    ParameterKindID: string;
    /**
     * Reference data describing how the parameter was used by the activity, such as input,
     * output, control, constraint, agent, predecessor activity, successor activity.
     */
    ParameterRoleID?: string;
    /**
     * Textual description about how this parameter was selected.
     */
    Selection?: string;
    /**
     * Parameter containing a string value.
     */
    StringParameter?: string;
    /**
     * Parameter containing a time index value.  It is assumed that all TimeIndexParameters
     * within an Activity have the same date-time format, which is then described by the
     * FrameOfReference mechanism.
     */
    TimeIndexParameter?: Date;
    /**
     * Name of the parameter, used to identify it in the activity. It must have an equivalent in
     * the ActivityTemplate parameters.
     */
    Title: string;
}

/**
 * Abstract class describing a key used to identify a parameter value. When multiple values
 * are provided for a given parameter, provides a way to identify the parameter through its
 * association with an object, a time index, an integer...
 * [Without inheritance, combined specializations.] Note: floating point numbers are not
 * supported as key values; the numbers have to be formatted as strings for robust equality
 * operations, which are necessary for keys.
 */
export interface ParameterKey {
    /**
     * Integer value from "ParameterKey" parameter, associated with this parameter. Example:
     * {"ParameterKey": "index", "StringParameterKey: 2}.
     */
    IntegerParameterKey?: number;
    /**
     * Relationship to an object ID, which acts as the parameter.
     */
    ObjectParameterKey?: string;
    /**
     * The key name, which establishes an association between parameters.
     */
    ParameterKey?: string;
    /**
     * String value from "ParameterKey" parameter, associated with this parameter. Can be used
     * to associate with parameter values of type string or data quantity. In the later case,
     * the string representation of the quantity value will be used. Example: {"ParameterKey":
     * "facies", "StringParameterKey: "shale"}, {"ParameterKey":"depth",
     * "StringParameterKey":"1545.43m"}.
     */
    StringParameterKey?: string;
    /**
     * The time index acting as parameter key value.
     */
    TimeIndexParameterKey?: string;
}

/**
 * The property type ID and Name, which determines eventually the UnitQuantity of the
 * parameter value. Used to provide a more scoped context than UnitQuantityID. If
 * PropertyType is provided, UnitQuantityID is expected to be omitted.
 *
 * A nested object holding the relationship to a PropertyType by id (uuid) and a derived,
 * human-readable name.
 */
export interface AbstractPropertyType {
    /**
     * The name of the PropertyType, de-normalized, derived from the record referenced in
     * PropertyTypeID.
     */
    Name?: string;
    /**
     * The relationship to the PropertyType reference data item, typically containing an
     * Energistics PWLS 3 uuid. For better traceability and usability the property name is to be
     * populated in the Name property.
     */
    PropertyTypeID?: string;
}

/**
 * The spatial location information such as coordinates, CRS information (left empty when
 * not appropriate).
 *
 * A geographic object which can be described by a set of points.
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
    /**
     * The explicit vertical unit ID, referring to a reference-data--UnitOfMeasure record; this
     * is only required for features containing 3-dimensional coordinates and undefined vertical
     * CoordinateReferenceSystems; if a VerticalCoordinateReferenceSystemID is populated, the
     * VerticalUnitID is given by the VerticalCoordinateReferenceSystemID's
     * data.CoordinateSystem.VerticalAxisUnitID. The VerticalUnitID definition overrides any
     * self-contained definition in persistableReferenceUnitZ.
     */
    VerticalUnitID?: string;
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

/**
 * Describes a record's overall suitability for general business consumption based on level
 * of trust.
 */
export interface AbstractTechnicalAssurance {
    /**
     * List of workflows and/or personas that the technical assurance value is valid for (e.g.,
     * This data is trusted for Seismic Processing)
     */
    AcceptableUsage?: AcceptableUsage[];
    /**
     * Any additional context to support the determination of technical assurance
     */
    Comment?: string;
    /**
     * Date when the technical assurance determination for this record has taken place
     */
    EffectiveDate?: Date;
    /**
     * The individuals, or roles, that reviewed and determined the technical assurance value
     */
    Reviewers?: AbstractContact[];
    /**
     * Describes a record's overall suitability for general business consumption based on data
     * quality. Clarifications: Since Certified is the highest classification of suitable
     * quality, any further change or versioning of a Certified record should be carefully
     * considered and justified. If a Technical Assurance value is not populated then one can
     * assume the data has not been evaluated or its quality is unknown (=Unevaluated).
     * Technical Assurance values are not intended to be used for the identification of a single
     * "preferred" or "definitive" record by comparison with other records.
     */
    TechnicalAssuranceTypeID: string;
    /**
     * List of workflows and/or personas that the technical assurance value is not valid for
     * (e.g., This data is not trusted for seismic interpretation)
     */
    UnacceptableUsage?: UnacceptableUsage[];
}

/**
 * Describes the workflows and/or personas that the technical assurance value is valid for
 * (e.g., This data has a technical assurance property of "trusted" and it is suitable for
 * Seismic Interpretation).
 */
export interface AcceptableUsage {
    /**
     * The relationship to a work-product-component--DataQuality assessment record, which was
     * used as the basis for this decision.
     */
    DataQualityID?: string;
    /**
     * The DataQualityRuleSet, which had to pass successfully to achieve this level of technical
     * assurance.
     */
    DataQualityRuleSetID?: string;
    /**
     * DEPRECATED: superseded by DataQualityRuleSetID referring to DataQualityRuleSet. The
     * QualityDataRuleSet, which had to pass successfully to achieve this level of technical
     * assurance.
     */
    QualityDataRuleSetID?: string;
    /**
     * The stage of business where the record is acceptable for workflow usage.
     */
    ValueChainStatusTypeID?: string;
    /**
     * DEPRECATED: superseded by WorkflowPersonaTypeID. Name of the role or personas that the
     * record is technical assurance value is valid for.
     */
    WorkflowPersona?: string;
    /**
     * Name of the role or personas that the record's technical assurance value is valid for.
     */
    WorkflowPersonaTypeID?: string;
    /**
     * DEPRECATED: superseded by WorkflowUsageTypeID. Name of the business activities,
     * processes, and/or workflows that the record is technical assurance value is valid for.
     */
    WorkflowUsage?: string;
    /**
     * Name of the business activities, processes, and/or workflows that the record's technical
     * assurance value is valid for.
     */
    WorkflowUsageTypeID?: string;
}

/**
 * An object with properties that describe a specific person or other point-of-contact (like
 * an email distribution list) that is relevant in this context (like a given data set or
 * business project). The contact specified may be either internal or external to the
 * organisation (something denoted via the Organisation object that is referenced). Note
 * that some properties contain personally identifiable information, so it might not be
 * appropriate to populate all properties in all scenarios.
 */
export interface AbstractContact {
    /**
     * Additional information about the contact
     */
    Comment?: string;
    /**
     * The data governance role assigned to this contact if and only if the context has a data
     * governance role (in context of TechnicalAssurance). The value is kept absent in all other
     * cases.
     */
    DataGovernanceRoleTypeID?: string;
    /**
     * Contact email address. Property may be left empty where it is inappropriate to provide
     * personally identifiable information.
     */
    EmailAddress?: string;
    /**
     * Name of the individual contact. Property may be left empty where it is inappropriate to
     * provide personally identifiable information.
     */
    Name?: string;
    /**
     * Reference to the company the contact is associated with.
     */
    OrganisationID?: string;
    /**
     * Contact phone number. Property may be left empty where it is inappropriate to provide
     * personally identifiable information.
     */
    PhoneNumber?: string;
    /**
     * The identifier of a reference value for the role of the contact within the associated
     * organisation, such as Account owner, Sales Representative, Technical Support, Project
     * Manager, Party Chief, Client Representative, Senior Observer.
     */
    RoleTypeID?: string;
    /**
     * The persona in context of workflows associated with this contact, as used in
     * TechnicalAssurance.
     */
    WorkflowPersonaTypeID?: string;
}

/**
 * Describes the workflows and/or personas that the technical assurance value is not valid
 * for (e.g., This data has a technical assurance property of "trusted", but it is not
 * suitable for Seismic Interpretation).
 */
export interface UnacceptableUsage {
    /**
     * The relationship to a work-product-component--DataQuality assessment record, which was
     * used as the basis for this decision.
     */
    DataQualityID?: string;
    /**
     * The DataQualityRuleSet, which did not pass successfully to achieve this level of
     * technical assurance.
     */
    DataQualityRuleSetID?: string;
    /**
     * DEPRECATED: superseded by DataQualityRuleSetID referring to DataQualityRuleSet. The
     * QualityDataRuleSet, which did not pass successfully to achieve this level of technical
     * assurance.
     */
    QualityDataRuleSetID?: string;
    /**
     * The stage of business where the record is not acceptable for workflow usage.
     */
    ValueChainStatusTypeID?: string;
    /**
     * DEPRECATED: superseded by WorkflowPersonaTypeID. Name of the role or personas that the
     * record is technical assurance value is not valid for.
     */
    WorkflowPersona?: string;
    /**
     * Name of the role or personas that the record is technical assurance value is not valid
     * for.
     */
    WorkflowPersonaTypeID?: string;
    /**
     * DEPRECATED: superseded by WorkflowUsageTypeID. Name of the business activities,
     * processes, and/or workflows that the record is technical assurance value is not valid for.
     */
    WorkflowUsage?: string;
    /**
     * Name of the business activities, processes, and/or workflows that the record's technical
     * assurance value is not valid for.
     */
    WorkflowUsageTypeID?: string;
}

/**
 * The entity's legal tags and compliance status. The actual contents associated with the
 * legal tags is managed by the Compliance Service.
 *
 * Legal meta data like legal tags, relevant other countries, legal status. This structure
 * is included by the SystemProperties "legal", which is part of all OSDU records. Not
 * extensible.
 */
export interface LegalMetaData {
    /**
     * The list of legal tags, which resolve to legal properties (like country of origin, export
     * classification code, etc.) and rules with the help of the Compliance Service.
     */
    legaltags: string[];
    /**
     * The list of other relevant data countries as an array of two-letter country codes, see
     * https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2.
     */
    otherRelevantDataCountries: string[];
    /**
     * The legal status. Set by the system after evaluation against the compliance rules
     * associated with the "legaltags" using the Compliance Service.
     */
    status?: string;
}

/**
 * A meta data item, which allows the association of named properties or property values to
 * a Unit/Measurement/CRS/Azimuth/Time context.
 */
export interface FrameOfReferenceMetaDataItem {
    /**
     * The kind of reference, 'Unit' for FrameOfReferenceUOM.
     *
     * The kind of reference, constant 'CRS' for FrameOfReferenceCRS.
     *
     * The kind of reference, constant 'DateTime', for FrameOfReferenceDateTime.
     *
     * The kind of reference, constant 'AzimuthReference', for FrameOfReferenceAzimuthReference.
     */
    kind: string;
    /**
     * The unit symbol or name of the unit.
     *
     * The name of the CRS.
     *
     * The name of the DateTime format and reference.
     *
     * The name of the CRS or the symbol/name of the unit.
     */
    name?: string;
    /**
     * The self-contained, persistable reference string uniquely identifying the Unit.
     *
     * The self-contained, persistable reference string uniquely identifying the CRS.
     *
     * The self-contained, persistable reference string uniquely identifying DateTime
     * reference.
     *
     * The self-contained, persistable reference string uniquely identifying AzimuthReference.
     */
    persistableReference: string;
    /**
     * The list of property names, to which this meta data item provides Unit context to. A full
     * path like "StructureA.PropertyB" is required to define a unique context; "data" is
     * omitted since frame-of reference normalization only applies to the data block.
     *
     * The list of property names, to which this meta data item provides CRS context to. A full
     * path like "StructureA.PropertyB" is required to define a unique context; "data" is
     * omitted since frame-of reference normalization only applies to the data block.
     *
     * The list of property names, to which this meta data item provides DateTime context to. A
     * full path like "StructureA.PropertyB" is required to define a unique context; "data" is
     * omitted since frame-of reference normalization only applies to the data block.
     *
     * The list of property names, to which this meta data item provides AzimuthReference
     * context to. A full path like "StructureA.PropertyB" is required to define a unique
     * context; "data" is omitted since frame-of reference normalization only applies to the
     * data block.
     */
    propertyNames?: string[];
    /**
     * SRN to unit of measure reference.
     */
    unitOfMeasureID?: string;
    /**
     * SRN to CRS reference.
     */
    coordinateReferenceSystemID?: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toActivityTemplate(json: string): ActivityTemplate {
        return cast(JSON.parse(json), r("ActivityTemplate"));
    }

    public static activityTemplateToJson(value: ActivityTemplate): string {
        return JSON.stringify(uncast(value, r("ActivityTemplate")), null, 2);
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
    "ActivityTemplate": o([
        { json: "acl", js: "acl", typ: r("AccessControlList") },
        { json: "ancestry", js: "ancestry", typ: u(undefined, r("ParentList")) },
        { json: "createTime", js: "createTime", typ: u(undefined, Date) },
        { json: "createUser", js: "createUser", typ: u(undefined, "") },
        { json: "data", js: "data", typ: u(undefined, r("Data")) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "kind", js: "kind", typ: "" },
        { json: "legal", js: "legal", typ: r("LegalMetaData") },
        { json: "meta", js: "meta", typ: u(undefined, a(r("FrameOfReferenceMetaDataItem"))) },
        { json: "modifyTime", js: "modifyTime", typ: u(undefined, Date) },
        { json: "modifyUser", js: "modifyUser", typ: u(undefined, "") },
        { json: "tags", js: "tags", typ: u(undefined, m("")) },
        { json: "version", js: "version", typ: u(undefined, 0) },
    ], false),
    "AccessControlList": o([
        { json: "owners", js: "owners", typ: a("") },
        { json: "viewers", js: "viewers", typ: a("") },
    ], false),
    "ParentList": o([
        { json: "parents", js: "parents", typ: u(undefined, a("")) },
    ], false),
    "Data": o([
        { json: "ExistenceKind", js: "ExistenceKind", typ: u(undefined, "") },
        { json: "ResourceCurationStatus", js: "ResourceCurationStatus", typ: u(undefined, "") },
        { json: "ResourceHomeRegionID", js: "ResourceHomeRegionID", typ: u(undefined, "") },
        { json: "ResourceHostRegionIDs", js: "ResourceHostRegionIDs", typ: u(undefined, a("")) },
        { json: "ResourceLifecycleStatus", js: "ResourceLifecycleStatus", typ: u(undefined, "") },
        { json: "ResourceSecurityClassification", js: "ResourceSecurityClassification", typ: u(undefined, "") },
        { json: "Source", js: "Source", typ: u(undefined, "") },
        { json: "TechnicalAssuranceID", js: "TechnicalAssuranceID", typ: u(undefined, "") },
        { json: "GeoContexts", js: "GeoContexts", typ: u(undefined, a(r("AbstractGeoContext"))) },
        { json: "NameAliases", js: "NameAliases", typ: u(undefined, a(r("AbstractAliasNames"))) },
        { json: "SpatialLocation", js: "SpatialLocation", typ: u(undefined, r("AbstractSpatialLocation")) },
        { json: "TechnicalAssurances", js: "TechnicalAssurances", typ: u(undefined, a(r("AbstractTechnicalAssurance"))) },
        { json: "TechnicalAssuranceTypeID", js: "TechnicalAssuranceTypeID", typ: u(undefined, "") },
        { json: "VersionCreationReason", js: "VersionCreationReason", typ: u(undefined, "") },
        { json: "Description", js: "Description", typ: u(undefined, "") },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "Parameters", js: "Parameters", typ: a(r("ParameterTemplate")) },
        { json: "ExtensionProperties", js: "ExtensionProperties", typ: u(undefined, m("any")) },
    ], "any"),
    "AbstractGeoContext": o([
        { json: "GeoPoliticalEntityID", js: "GeoPoliticalEntityID", typ: u(undefined, "") },
        { json: "GeoTypeID", js: "GeoTypeID", typ: u(undefined, "") },
        { json: "BasinID", js: "BasinID", typ: u(undefined, "") },
        { json: "FieldID", js: "FieldID", typ: u(undefined, "") },
        { json: "PlayID", js: "PlayID", typ: u(undefined, "") },
        { json: "ProspectID", js: "ProspectID", typ: u(undefined, "") },
    ], "any"),
    "AbstractAliasNames": o([
        { json: "AliasName", js: "AliasName", typ: u(undefined, "") },
        { json: "AliasNameTypeID", js: "AliasNameTypeID", typ: u(undefined, "") },
        { json: "DefinitionOrganisationID", js: "DefinitionOrganisationID", typ: u(undefined, "") },
        { json: "EffectiveDateTime", js: "EffectiveDateTime", typ: u(undefined, Date) },
        { json: "TerminationDateTime", js: "TerminationDateTime", typ: u(undefined, Date) },
    ], "any"),
    "ParameterTemplate": o([
        { json: "AllowedParameterKind", js: "AllowedParameterKind", typ: u(undefined, "") },
        { json: "Constraint", js: "Constraint", typ: u(undefined, "") },
        { json: "DataObjectContentType", js: "DataObjectContentType", typ: u(undefined, a("")) },
        { json: "DefaultValue", js: "DefaultValue", typ: u(undefined, r("AbstractActivityParameter")) },
        { json: "IsInput", js: "IsInput", typ: true },
        { json: "IsOutput", js: "IsOutput", typ: true },
        { json: "KeyConstraints", js: "KeyConstraints", typ: u(undefined, a("")) },
        { json: "MaxOccurs", js: "MaxOccurs", typ: 0 },
        { json: "MinOccurs", js: "MinOccurs", typ: 0 },
        { json: "PropertyType", js: "PropertyType", typ: u(undefined, r("AbstractPropertyType")) },
        { json: "Title", js: "Title", typ: "" },
        { json: "UnitQuantityID", js: "UnitQuantityID", typ: u(undefined, "") },
    ], "any"),
    "AbstractActivityParameter": o([
        { json: "BooleanParameter", js: "BooleanParameter", typ: u(undefined, true) },
        { json: "DataObjectParameter", js: "DataObjectParameter", typ: u(undefined, "") },
        { json: "DataQuantityParameter", js: "DataQuantityParameter", typ: u(undefined, 3.14) },
        { json: "DataQuantityParameterUOMID", js: "DataQuantityParameterUOMID", typ: u(undefined, "") },
        { json: "Index", js: "Index", typ: u(undefined, 0) },
        { json: "IntegerQuantityParameter", js: "IntegerQuantityParameter", typ: u(undefined, 0) },
        { json: "Keys", js: "Keys", typ: u(undefined, a(r("ParameterKey"))) },
        { json: "ParameterKindID", js: "ParameterKindID", typ: "" },
        { json: "ParameterRoleID", js: "ParameterRoleID", typ: u(undefined, "") },
        { json: "Selection", js: "Selection", typ: u(undefined, "") },
        { json: "StringParameter", js: "StringParameter", typ: u(undefined, "") },
        { json: "TimeIndexParameter", js: "TimeIndexParameter", typ: u(undefined, Date) },
        { json: "Title", js: "Title", typ: "" },
    ], "any"),
    "ParameterKey": o([
        { json: "IntegerParameterKey", js: "IntegerParameterKey", typ: u(undefined, 0) },
        { json: "ObjectParameterKey", js: "ObjectParameterKey", typ: u(undefined, "") },
        { json: "ParameterKey", js: "ParameterKey", typ: u(undefined, "") },
        { json: "StringParameterKey", js: "StringParameterKey", typ: u(undefined, "") },
        { json: "TimeIndexParameterKey", js: "TimeIndexParameterKey", typ: u(undefined, "") },
    ], "any"),
    "AbstractPropertyType": o([
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "PropertyTypeID", js: "PropertyTypeID", typ: u(undefined, "") },
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
        { json: "VerticalUnitID", js: "VerticalUnitID", typ: u(undefined, "") },
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
    "AbstractTechnicalAssurance": o([
        { json: "AcceptableUsage", js: "AcceptableUsage", typ: u(undefined, a(r("AcceptableUsage"))) },
        { json: "Comment", js: "Comment", typ: u(undefined, "") },
        { json: "EffectiveDate", js: "EffectiveDate", typ: u(undefined, Date) },
        { json: "Reviewers", js: "Reviewers", typ: u(undefined, a(r("AbstractContact"))) },
        { json: "TechnicalAssuranceTypeID", js: "TechnicalAssuranceTypeID", typ: "" },
        { json: "UnacceptableUsage", js: "UnacceptableUsage", typ: u(undefined, a(r("UnacceptableUsage"))) },
    ], "any"),
    "AcceptableUsage": o([
        { json: "DataQualityID", js: "DataQualityID", typ: u(undefined, "") },
        { json: "DataQualityRuleSetID", js: "DataQualityRuleSetID", typ: u(undefined, "") },
        { json: "QualityDataRuleSetID", js: "QualityDataRuleSetID", typ: u(undefined, "") },
        { json: "ValueChainStatusTypeID", js: "ValueChainStatusTypeID", typ: u(undefined, "") },
        { json: "WorkflowPersona", js: "WorkflowPersona", typ: u(undefined, "") },
        { json: "WorkflowPersonaTypeID", js: "WorkflowPersonaTypeID", typ: u(undefined, "") },
        { json: "WorkflowUsage", js: "WorkflowUsage", typ: u(undefined, "") },
        { json: "WorkflowUsageTypeID", js: "WorkflowUsageTypeID", typ: u(undefined, "") },
    ], "any"),
    "AbstractContact": o([
        { json: "Comment", js: "Comment", typ: u(undefined, "") },
        { json: "DataGovernanceRoleTypeID", js: "DataGovernanceRoleTypeID", typ: u(undefined, "") },
        { json: "EmailAddress", js: "EmailAddress", typ: u(undefined, "") },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "OrganisationID", js: "OrganisationID", typ: u(undefined, "") },
        { json: "PhoneNumber", js: "PhoneNumber", typ: u(undefined, "") },
        { json: "RoleTypeID", js: "RoleTypeID", typ: u(undefined, "") },
        { json: "WorkflowPersonaTypeID", js: "WorkflowPersonaTypeID", typ: u(undefined, "") },
    ], "any"),
    "UnacceptableUsage": o([
        { json: "DataQualityID", js: "DataQualityID", typ: u(undefined, "") },
        { json: "DataQualityRuleSetID", js: "DataQualityRuleSetID", typ: u(undefined, "") },
        { json: "QualityDataRuleSetID", js: "QualityDataRuleSetID", typ: u(undefined, "") },
        { json: "ValueChainStatusTypeID", js: "ValueChainStatusTypeID", typ: u(undefined, "") },
        { json: "WorkflowPersona", js: "WorkflowPersona", typ: u(undefined, "") },
        { json: "WorkflowPersonaTypeID", js: "WorkflowPersonaTypeID", typ: u(undefined, "") },
        { json: "WorkflowUsage", js: "WorkflowUsage", typ: u(undefined, "") },
        { json: "WorkflowUsageTypeID", js: "WorkflowUsageTypeID", typ: u(undefined, "") },
    ], "any"),
    "LegalMetaData": o([
        { json: "legaltags", js: "legaltags", typ: a("") },
        { json: "otherRelevantDataCountries", js: "otherRelevantDataCountries", typ: a("") },
        { json: "status", js: "status", typ: u(undefined, "") },
    ], false),
    "FrameOfReferenceMetaDataItem": o([
        { json: "kind", js: "kind", typ: "" },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "persistableReference", js: "persistableReference", typ: "" },
        { json: "propertyNames", js: "propertyNames", typ: u(undefined, a("")) },
        { json: "unitOfMeasureID", js: "unitOfMeasureID", typ: u(undefined, "") },
        { json: "coordinateReferenceSystemID", js: "coordinateReferenceSystemID", typ: u(undefined, "") },
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
