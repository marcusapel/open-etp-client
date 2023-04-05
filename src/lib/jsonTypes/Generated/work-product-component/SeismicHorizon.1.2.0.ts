// To parse this data:
//
//   import { Convert, SeismicHorizon } from "./file";
//
//   const seismicHorizon = Convert.toSeismicHorizon(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * A set of picks related to seismic processing geometry which define a surface.  The
 * geometry used is referenced by the Interpretation Project.
 */
export interface SeismicHorizon {
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
 * Generic reference object containing the universal group-type properties of a Work Product
 * Component for inclusion in data type specific Work Product Component objects
 *
 * Generic reference object containing the universal properties of a Work Product Component
 * for inclusion in data type specific Work Product Component objects
 *
 * The group of properties shared by all different kinds of representations.
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
     * An array of Artefacts - each artefact has a Role, Resource tuple. An artefact is distinct
     * from the file, in the sense certain valuable information is generated during loading
     * process (Artefact generation process). Examples include retrieving location data,
     * performing an OCR which may result in the generation of artefacts which need to be
     * preserved distinctly
     */
    Artefacts?: Artefacts[];
    /**
     * The record id, which identifies this OSDU File or dataset resource.
     */
    Datasets?: string[];
    /**
     * An array of references to content in Domain Data Management Services represented by this
     * work-product-component. The references are formed as URI following
     * https://www.rfc-editor.org/rfc/rfc3986#page-16. This property is exclusively populated by
     * DDMSs. If a work-product-component is represented in more than one DDMS, DDMSs are
     * obliged to find the specific reference by inspecting the URI's authority values matching
     * the DDMS id.
     */
    DDMSDatasets?: string[];
    /**
     * A flag that indicates if the work product component is searchable, which means covered in
     * the search index.
     */
    IsDiscoverable?: boolean;
    /**
     * A flag that indicates if the work product component is undergoing an extended load.  It
     * reflects the fact that the work product component is in an early stage and may be updated
     * before finalization.
     */
    IsExtendedLoad?: boolean;
    /**
     * Alternative names, including historical, by which this work-product-component is/has been
     * known (it should include all the identifiers).
     */
    NameAliases?: AbstractAliasNames[];
    /**
     * Describes a record's overall suitability for general business consumption based on data
     * quality. Clarifications: Since Certified is the highest classification of suitable
     * quality, any further change or versioning of a Certified record should be carefully
     * considered and justified. If a Technical Assurance value is not populated then one can
     * assume the data has not been evaluated or its quality is unknown (=Unevaluated).
     * Technical Assurance values are not intended to be used for the identification of a single
     * "preferred" or "definitive" record by comparison with other records.
     */
    TechnicalAssurances?: AbstractTechnicalAssurance[];
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
    /**
     * Several optional indexable element counts
     */
    IndexableElementCount?: IndexableElementCount[];
    /**
     * Allow to link an interpretation with this representation
     */
    InterpretationID?: string;
    /**
     * Name of the interpretation the representation refers to
     */
    InterpretationName?: string;
    /**
     * Allow to link a local CRS with this representation
     */
    LocalModelCompoundCrsID?: string;
    /**
     * The index of the realization of this representation
     */
    RealizationIndex?: number;
    /**
     * Allow to link the geometry of the representation to a particular index of a time series.
     * This is particularly useful for IJK grids used in geomechanical or basin context where
     * the topology and geometry varies against the time.
     */
    TimeSeries?: TimeSeries;
    /**
     * Portion of bin grid covered by picked surface expressed in percent.
     */
    BinGridCoveragePercent?: number;
    /**
     * The explicit bin grid geometry for this horizon overriding the geometry defined by the
     * parent Seismic3DInterpretationSet. If empty and Seismic3DInterpretationSetID is
     * populated, the Seismic3DInterpretationSet.SeismicBinGridID applies.
     */
    BinGridID?: string;
    /**
     * Largest crossline picked in surface.
     */
    CrosslineMax?: number;
    /**
     * Smallest crossline picked in surface.
     */
    CrosslineMin?: number;
    /**
     * Age period of geologic unit (geochronological name of stage, etc.)
     */
    GeologicalUnitAgePeriod?: string;
    /**
     * Age of Geologic unit (geochronological).  Number expected but is a string type to be
     * consistent with wellbore marker.
     */
    GeologicalUnitAgeYear?: string;
    /**
     * Geological Unit (formation, bioevent, etc.) Name
     */
    GeologicalUnitName?: string;
    /**
     * Largest inline picked in surface.
     */
    InlineMax?: number;
    /**
     * Smallest inline picked in surface.
     */
    InlineMin?: number;
    /**
     * The person or team who interpreted the fault data.
     */
    Interpreter?: string;
    /**
     * A petroleum system element such as Reservoir, Source, Seal, etc.
     */
    PetroleumSystemElementTypeID?: string;
    /**
     * Optional comment providing thoughts from the interpreter.  Description is to provide a
     * general explanation of the horizon.
     */
    Remark?: string;
    /**
     * Value used to produce vertical static shifts in data
     */
    ReplacementVelocity?: number;
    /**
     * The RepresentationRole assigned to this SeismicHorizon. Examples: Pick, Map.
     */
    Role?: string;
    /**
     * For picks on 2D datasets, reference to the 2D interpretation set (not the application
     * project nor an acquisition survey) that supported this interpretation.  The seismic
     * geometries (seismic line geometries) needed to interpret the location references are
     * inferred through the interpretation survey.  The WPC SpatialArea may reflect the lines
     * that have the horizon picked on it for shallow search purposes.  Only this or
     * Seismic3DInterpretationSetID may be used, but not both.
     */
    Seismic2DInterpretationSetID?: string;
    /**
     * For picks on 3D datasets, reference to the 3D interpretation set (not the application
     * project nor an acquisition survey) that supported this interpretation.  The seismic
     * geometry (bin grid) needed to interpret the location references is inferred through the
     * interpretation survey and no longer explicitly through this object.  The WPC SpatialArea
     * may reflect the survey area that has the horizon picked on it for shallow search
     * purposes.  Only this or Seismic2DInterpretationSetID may be used, but not both.
     */
    Seismic3DInterpretationSetID?: string;
    /**
     * Summary of measurements included with horizon in addition to depth attribute.
     */
    SeismicAttributes?: SeismicAttributes[];
    /**
     * Vertical domain of faults.  E.g. Time, Depth
     */
    SeismicDomainTypeID?: string;
    /**
     * Unit of measurement for vertical domain
     */
    SeismicDomainUOM?: string;
    /**
     * e.g. Peak (pk), Trough (tr), Plus to Minus Zero Crossing, Minus to Plus Zero Crossing,
     * Envelope (env), Not Applicable (na)
     */
    SeismicHorizonTypeID?: string;
    /**
     * The list of explicit 2D seismic line geometries overriding any definitions inferred from
     * Seismic2DInterpretationSet. If empty and Seismic2DInterpretationSetID is populated,
     * Seismic2DInterpretationSet.SeismicLineGeometries[].SeismicLineGeometryID apply.
     */
    SeismicLineGeometryIDs?: string[];
    /**
     * Picking method used for horizon e.g. Primary seed pick (seed), Interpolated seed pick
     * (int), Autotracked seed pick (aut), Mixed, etc.
     */
    SeismicPickingTypeID?: string;
    /**
     * Seismic Volumes picked against.  Only applies to 3D.
     */
    SeismicTraceDataID?: string[];
    /**
     * Velocity model used in depth conversion
     */
    SeismicVelocityModelID?: string;
    /**
     * The RepresentationType for this SeismicHorizon. Examples: PointSet, PolylineSet,
     * Regular2DGrid, Irregular2DGrid, TriangulatedSurface.
     */
    Type?: string;
    /**
     * Vertical reference datum points are stored in.
     */
    VerticalDatumOffset?: number;
    /**
     * Identifies a vertical reference datum type. E.g. mean sea level, ground level, mudline.
     */
    VerticalMeasurementTypeID?: string;
    ExtensionProperties?:       { [key: string]: any };
}

/**
 * An array of Artefacts - each artefact has a Role, Resource tuple. An artefact is distinct
 * from the file, in the sense certain valuable information is generated during loading
 * process (Artefact generation process). Examples include retrieving location data,
 * performing an OCR which may result in the generation of artefacts which need to be
 * preserved distinctly
 */
export interface Artefacts {
    /**
     * The SRN which identifies this OSDU Artefact resource.
     */
    ResourceID?: string;
    /**
     * The kind or schema ID of the artefact. Resolvable with the Schema Service.
     */
    ResourceKind?: string;
    /**
     * The record id of this artefact's role.
     */
    RoleID?: string;
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
 * Defines the count of a particular indexable element in a representation
 */
export interface IndexableElementCount {
    /**
     * The count of indexable element
     */
    Count: number;
    /**
     * The indexable element which is counted
     */
    IndexableElementID?: string;
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
 * Summary of measurements included with horizon in addition to depth attribute.
 */
export interface SeismicAttributes {
    /**
     * Max value of attribute
     */
    SeismicAttributeMaxNumber?: number;
    /**
     * Mean value of attribute
     */
    SeismicAttributeMeanNumber?: number;
    /**
     * Min value of attribute
     */
    SeismicAttributeMinNumber?: number;
    /**
     * The type of attribute value captured
     */
    SeismicAttributeTypeID?: string;
    /**
     * Unit of Measurement for attribute
     */
    SeismicAttributeUOM?: string;
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
     * The QualityDataRuleSet, which had to pass successfully to achieve this level of technical
     * assurance.
     */
    QualityDataRuleSetID?: string;
    /**
     * The stage of business where the record is acceptable for workflow usage.
     */
    ValueChainStatusTypeID?: string;
    /**
     * Name of the role or personas that the record is technical assurance value is valid for.
     */
    WorkflowPersona?: string;
    /**
     * Name of the business activities, processes, and/or workflows that the record is technical
     * assurance value is valid for.
     */
    WorkflowUsage?: string;
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
     * The QualityDataRuleSet, which did not pass successfully to achieve this level of
     * technical assurance.
     */
    QualityDataRuleSetID?: string;
    /**
     * The stage of business where the record is not acceptable for workflow usage.
     */
    ValueChainStatusTypeID?: string;
    /**
     * Name of the role or personas that the record is technical assurance value is not valid
     * for.
     */
    WorkflowPersona?: string;
    /**
     * Name of the business activities, processes, and/or workflows that the record is technical
     * assurance value is not valid for.
     */
    WorkflowUsage?: string;
}

/**
 * Allow to link the geometry of the representation to a particular index of a time series.
 * This is particularly useful for IJK grids used in geomechanical or basin context where
 * the topology and geometry varies against the time.
 */
export interface TimeSeries {
    /**
     * Index of the timestamp of the representation in the associated TimeSeries
     */
    TimeIndex: number;
    /**
     * Time series the representation is associated to
     */
    TimeSeriesID: string;
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
    public static toSeismicHorizon(json: string): SeismicHorizon {
        return cast(JSON.parse(json), r("SeismicHorizon"));
    }

    public static seismicHorizonToJson(value: SeismicHorizon): string {
        return JSON.stringify(uncast(value, r("SeismicHorizon")), null, 2);
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
    "SeismicHorizon": o([
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
        { json: "Artefacts", js: "Artefacts", typ: u(undefined, a(r("Artefacts"))) },
        { json: "Datasets", js: "Datasets", typ: u(undefined, a("")) },
        { json: "DDMSDatasets", js: "DDMSDatasets", typ: u(undefined, a("")) },
        { json: "IsDiscoverable", js: "IsDiscoverable", typ: u(undefined, true) },
        { json: "IsExtendedLoad", js: "IsExtendedLoad", typ: u(undefined, true) },
        { json: "NameAliases", js: "NameAliases", typ: u(undefined, a(r("AbstractAliasNames"))) },
        { json: "TechnicalAssurances", js: "TechnicalAssurances", typ: u(undefined, a(r("AbstractTechnicalAssurance"))) },
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
        { json: "IndexableElementCount", js: "IndexableElementCount", typ: u(undefined, a(r("IndexableElementCount"))) },
        { json: "InterpretationID", js: "InterpretationID", typ: u(undefined, "") },
        { json: "InterpretationName", js: "InterpretationName", typ: u(undefined, "") },
        { json: "LocalModelCompoundCrsID", js: "LocalModelCompoundCrsID", typ: u(undefined, "") },
        { json: "RealizationIndex", js: "RealizationIndex", typ: u(undefined, 0) },
        { json: "TimeSeries", js: "TimeSeries", typ: u(undefined, r("TimeSeries")) },
        { json: "BinGridCoveragePercent", js: "BinGridCoveragePercent", typ: u(undefined, 3.14) },
        { json: "BinGridID", js: "BinGridID", typ: u(undefined, "") },
        { json: "CrosslineMax", js: "CrosslineMax", typ: u(undefined, 3.14) },
        { json: "CrosslineMin", js: "CrosslineMin", typ: u(undefined, 3.14) },
        { json: "GeologicalUnitAgePeriod", js: "GeologicalUnitAgePeriod", typ: u(undefined, "") },
        { json: "GeologicalUnitAgeYear", js: "GeologicalUnitAgeYear", typ: u(undefined, "") },
        { json: "GeologicalUnitName", js: "GeologicalUnitName", typ: u(undefined, "") },
        { json: "InlineMax", js: "InlineMax", typ: u(undefined, 3.14) },
        { json: "InlineMin", js: "InlineMin", typ: u(undefined, 3.14) },
        { json: "Interpreter", js: "Interpreter", typ: u(undefined, "") },
        { json: "PetroleumSystemElementTypeID", js: "PetroleumSystemElementTypeID", typ: u(undefined, "") },
        { json: "Remark", js: "Remark", typ: u(undefined, "") },
        { json: "ReplacementVelocity", js: "ReplacementVelocity", typ: u(undefined, 3.14) },
        { json: "Role", js: "Role", typ: u(undefined, "") },
        { json: "Seismic2DInterpretationSetID", js: "Seismic2DInterpretationSetID", typ: u(undefined, "") },
        { json: "Seismic3DInterpretationSetID", js: "Seismic3DInterpretationSetID", typ: u(undefined, "") },
        { json: "SeismicAttributes", js: "SeismicAttributes", typ: u(undefined, a(r("SeismicAttributes"))) },
        { json: "SeismicDomainTypeID", js: "SeismicDomainTypeID", typ: u(undefined, "") },
        { json: "SeismicDomainUOM", js: "SeismicDomainUOM", typ: u(undefined, "") },
        { json: "SeismicHorizonTypeID", js: "SeismicHorizonTypeID", typ: u(undefined, "") },
        { json: "SeismicLineGeometryIDs", js: "SeismicLineGeometryIDs", typ: u(undefined, a("")) },
        { json: "SeismicPickingTypeID", js: "SeismicPickingTypeID", typ: u(undefined, "") },
        { json: "SeismicTraceDataID", js: "SeismicTraceDataID", typ: u(undefined, a("")) },
        { json: "SeismicVelocityModelID", js: "SeismicVelocityModelID", typ: u(undefined, "") },
        { json: "Type", js: "Type", typ: u(undefined, "") },
        { json: "VerticalDatumOffset", js: "VerticalDatumOffset", typ: u(undefined, 3.14) },
        { json: "VerticalMeasurementTypeID", js: "VerticalMeasurementTypeID", typ: u(undefined, "") },
        { json: "ExtensionProperties", js: "ExtensionProperties", typ: u(undefined, m("any")) },
    ], "any"),
    "Artefacts": o([
        { json: "ResourceID", js: "ResourceID", typ: u(undefined, "") },
        { json: "ResourceKind", js: "ResourceKind", typ: u(undefined, "") },
        { json: "RoleID", js: "RoleID", typ: u(undefined, "") },
    ], "any"),
    "AbstractGeoContext": o([
        { json: "GeoPoliticalEntityID", js: "GeoPoliticalEntityID", typ: u(undefined, "") },
        { json: "GeoTypeID", js: "GeoTypeID", typ: u(undefined, "") },
        { json: "BasinID", js: "BasinID", typ: u(undefined, "") },
        { json: "FieldID", js: "FieldID", typ: u(undefined, "") },
        { json: "PlayID", js: "PlayID", typ: u(undefined, "") },
        { json: "ProspectID", js: "ProspectID", typ: u(undefined, "") },
    ], "any"),
    "IndexableElementCount": o([
        { json: "Count", js: "Count", typ: 0 },
        { json: "IndexableElementID", js: "IndexableElementID", typ: u(undefined, "") },
    ], "any"),
    "LineageAssertion": o([
        { json: "ID", js: "ID", typ: u(undefined, "") },
        { json: "LineageRelationshipType", js: "LineageRelationshipType", typ: u(undefined, "") },
    ], "any"),
    "AbstractAliasNames": o([
        { json: "AliasName", js: "AliasName", typ: u(undefined, "") },
        { json: "AliasNameTypeID", js: "AliasNameTypeID", typ: u(undefined, "") },
        { json: "DefinitionOrganisationID", js: "DefinitionOrganisationID", typ: u(undefined, "") },
        { json: "EffectiveDateTime", js: "EffectiveDateTime", typ: u(undefined, Date) },
        { json: "TerminationDateTime", js: "TerminationDateTime", typ: u(undefined, Date) },
    ], "any"),
    "SeismicAttributes": o([
        { json: "SeismicAttributeMaxNumber", js: "SeismicAttributeMaxNumber", typ: u(undefined, 3.14) },
        { json: "SeismicAttributeMeanNumber", js: "SeismicAttributeMeanNumber", typ: u(undefined, 3.14) },
        { json: "SeismicAttributeMinNumber", js: "SeismicAttributeMinNumber", typ: u(undefined, 3.14) },
        { json: "SeismicAttributeTypeID", js: "SeismicAttributeTypeID", typ: u(undefined, "") },
        { json: "SeismicAttributeUOM", js: "SeismicAttributeUOM", typ: u(undefined, "") },
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
        { json: "QualityDataRuleSetID", js: "QualityDataRuleSetID", typ: u(undefined, "") },
        { json: "ValueChainStatusTypeID", js: "ValueChainStatusTypeID", typ: u(undefined, "") },
        { json: "WorkflowPersona", js: "WorkflowPersona", typ: u(undefined, "") },
        { json: "WorkflowUsage", js: "WorkflowUsage", typ: u(undefined, "") },
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
        { json: "QualityDataRuleSetID", js: "QualityDataRuleSetID", typ: u(undefined, "") },
        { json: "ValueChainStatusTypeID", js: "ValueChainStatusTypeID", typ: u(undefined, "") },
        { json: "WorkflowPersona", js: "WorkflowPersona", typ: u(undefined, "") },
        { json: "WorkflowUsage", js: "WorkflowUsage", typ: u(undefined, "") },
    ], "any"),
    "TimeSeries": o([
        { json: "TimeIndex", js: "TimeIndex", typ: 0 },
        { json: "TimeSeriesID", js: "TimeSeriesID", typ: "" },
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
