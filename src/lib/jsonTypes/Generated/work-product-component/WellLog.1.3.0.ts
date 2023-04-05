// To parse this data:
//
//   import { Convert, WellLog } from "./file";
//
//   const wellLog = Convert.toWellLog(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * A well log is a data type that correlates a particular measurement or multiple
 * measurements in a wellbore against depth and/or time within that wellbore. When plotted
 * visually, well logs are typically long line graphs (called "curves") but may sometimes be
 * discrete points or intervals. This schema object is intended for digital well logs, not
 * raster log files or raster calibration files, but may be used for the latter in the
 * absence of a defined OSDU schema for these use cases.
 */
export interface WellLog {
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
     * General method or circumstance of logging - MWD, completion, ...
     */
    ActivityType?: string;
    /**
     * Informational Bottom Measured Depth of the Well Log. Always populate SamplingStart and
     * SamplingStop, which represents the real sampling of the WellLog, including  non-depth
     * sampling.
     */
    BottomMeasuredDepth?: number;
    /**
     * Secondary index curves, which are alternative candidates to act as ReferenceCurveID.
     * Generally not populated, except in the cases where multiple reference curves are present,
     * e.g. measured depth and time.
     */
    CandidateReferenceCurveIDs?: string[];
    /**
     * The relationship to company who engaged the service company (ServiceCompanyID) to perform
     * the logging.
     */
    CompanyID?: string;
    /**
     * The conveyance method used to acquire the log data - if not an acquired log leave
     * empty/absent.
     */
    ConveyanceMethodID?: string;
    Curves?:             Curves[];
    /**
     * DEPRECATED: Please use reference values from WellboreFluidType in WellboreFluidTypeID
     * instead. Type of mud at time of logging (oil, water based,...)
     */
    DrillingFluidProperty?: string;
    /**
     * For multi-frame or multi-section files, this identifier defines the source frame in the
     * file. If the identifier is an index number the index starts with zero and is converted to
     * a string for this property.
     */
    FrameIdentifier?: string;
    /**
     * Description of the hole related type of logging - POSSIBLE VALUE : OpenHole / CasedHole /
     * CementedHole
     */
    HoleTypeLogging?: string;
    /**
     * Boolean property indicating the sampling mode of the ReferenceCurveID. True means all
     * reference curve values are regularly spaced (see SamplingInterval); false means irregular
     * or discrete sample spacing.
     */
    IsRegular?: boolean;
    /**
     * Log Activity, used to describe the type of pass such as Calibration Pass - Main Pass -
     * Repeated Pass
     */
    LogActivity?: string;
    /**
     * Specifies whether curves were collected downward or upward
     */
    LoggingDirection?: string;
    /**
     * Logging Service - mainly a short concatenation of the names of the tools
     */
    LoggingService?: string;
    /**
     * Log remark provides contextual information during the actual log object acquisition.
     * Explains how the measurement in the wellbore is taken on a point in time or depth.
     * Additional information may be included such as bad weather, tool failure, etc. Usually a
     * part of the log header, log remark contains info specific for an acquisition run,
     * specific for a given logging tool (multiple measurements) and/or a specific interval. In
     * essence, log remark represents the external factors and operational environment, directly
     * or indirectly affecting the measurement quality/uncertainty (dynamically over time/depth)
     * - adding both noise and bias to the measurements.
     */
    LogRemark?: string;
    /**
     * Log Run - describe the run of the log - can be a number, but may be also a alphanumeric
     * description such as a version name
     */
    LogRun?: string;
    /**
     * An interval built from two nested values : StartDate and EndDate. It applies to the whole
     * log services and may apply to composite logs as [start of the first run job] and [end of
     * the last run job]Log Service Date
     */
    LogServiceDateInterval?: LogServiceDateInterval;
    /**
     * OSDU Native Log Source - will be updated for later releases - not to be used yet
     */
    LogSource?: string;
    /**
     * Log Version
     */
    LogVersion?: string;
    /**
     * Indicates if the Pass is the Main one (1) or a repeated one - and it's level repetition
     */
    PassNumber?: number;
    /**
     * The data.Curves[].CurveID, which holds the primary index (reference) values.
     */
    ReferenceCurveID?: string;
    /**
     * The sampling domain, e.g. measured depth, true vertical, travel-time, calendar-time.
     */
    SamplingDomainTypeID?: string;
    /**
     * For regularly sampled curves this property holds the sampling interval. For non regular
     * sampling rate this property is not set. The IsRegular flag indicates whether
     * SamplingInterval is required.
     */
    SamplingInterval?: number;
    /**
     * The start value/first value of the ReferenceCurveID, typically the start depth of the
     * logging.
     */
    SamplingStart?: number;
    /**
     * The stop value/last value of the ReferenceCurveID, typically the end depth of the logging.
     */
    SamplingStop?: number;
    /**
     * Populated only if the WellLog represents time-depth relationships or checkshots. It is
     * expressed via the standard AbstractFacilityVerticalMeasurement. The following properties
     * are expected to be present: VerticalMeasurementPathID (typically elevation),
     * VerticalMeasurementTypeID as SeismicReferenceDatum, VerticalMeasurement holding the
     * offset to either the VerticalCRSID or the chained VerticalReferenceID in the parent
     * Wellbore.
     */
    SeismicReferenceElevation?: AbstractFacilityVerticalMeasurement;
    /**
     * The relationship to a Service Company, typically the producer or logging contractor.
     */
    ServiceCompanyID?: string;
    /**
     * Tool String Description - a long concatenation of the tools used for logging services
     * such as GammaRay+NeutronPorosity
     */
    ToolStringDescription?: string;
    /**
     * Informational Top Measured Depth of the Well Log. Always populate SamplingStart and
     * SamplingStop, which represents the real sampling of the WellLog, including  non-depth
     * sampling.
     */
    TopMeasuredDepth?: number;
    /**
     * The vertical measurement reference for the log curves, which defines the vertical
     * reference datum for the logged depths. Either VerticalMeasurement or
     * VerticalMeasurementID are populated.
     */
    VerticalMeasurement?: AbstractFacilityVerticalMeasurement;
    /**
     * DEPRECATED: Use data.VerticalMeasurement.VerticalReferenceID instead. References an entry
     * in the Vertical Measurement array for the Wellbore identified by WellboreID, which
     * defines the vertical reference datum for all curve measured depths. Either
     * VerticalMeasurementID or VerticalMeasurement are populated.
     */
    VerticalMeasurementID?: string;
    /**
     * Type of fluid in the wellbore at time of logging (oil, water based mud, water, ...)
     */
    WellboreFluidTypeID?: string;
    /**
     * The Wellbore where the Well Log Work Product Component was recorded
     */
    WellboreID?: string;
    /**
     * Well Log Type short Description such as Raw; Evaluated; Composite;....
     */
    WellLogTypeID?: string;
    /**
     * Optional time reference for (calender) time logs. The ISO date time string representing
     * zero time. Not to be confused with seismic travel time zero. The latter is defined by
     * SeismicReferenceDatum.
     */
    ZeroTime?:            Date;
    ExtensionProperties?: { [key: string]: any };
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

export interface Curves {
    /**
     * The curve's maximum 'depth' i.e., the reference value at which the curve has its last
     * non-absent value. The curve may contain further absent values in between TopDepth and
     * BaseDepth. Note that the SamplingDomainType may not be a depth as the property name
     * indicates.
     */
    BaseDepth?: number;
    /**
     * Mnemonic-level curve description is used during parsing or reading and ingesting LAS or
     * DLIS files, to explain the type of measurement being looked at, specifically for that
     * moment. Curve description is specific to that single (log) mnemonic and for the entire
     * log (acquisition run) interval. In essence, curve description defines the internal
     * factors such as what the "curve" or measurement ideally is representing, how is it
     * calculated, what are the assumptions and the "constants".
     */
    CurveDescription?: string;
    /**
     * The ID of the Well Log Curve
     */
    CurveID?: string;
    /**
     * The Quality of the Log Curve.
     */
    CurveQuality?: string;
    /**
     * The value type to be expected as curve sample values.
     */
    CurveSampleTypeID?: string;
    /**
     * Unit of Measure for the Log Curve
     */
    CurveUnit?: string;
    /**
     * The Version of the Log Curve.
     */
    CurveVersion?: string;
    /**
     * Date curve was created in the database
     */
    DateStamp?: Date;
    /**
     * DEPRECATED: Replaced by boolean data.IsRegular. The Coding of the depth.
     */
    DepthCoding?: string;
    /**
     * Unit of Measure for TopDepth and BaseDepth.
     */
    DepthUnit?: string;
    /**
     * Whether curve can be interpolated or not
     */
    Interpolate?: boolean;
    /**
     * The name of person who interpreted this Log Curve.
     */
    InterpreterName?: string;
    /**
     * Indicates if the curve has been (pre)processed or if it is a raw recording
     */
    IsProcessed?: boolean;
    /**
     * The related record id of the Log Curve Business Value Type.
     */
    LogCurveBusinessValueID?: string;
    /**
     * The related record id of the Log Curve Family - which is the detailed Geological Physical
     * Quantity Measured - such as neutron porosity
     */
    LogCurveFamilyID?: string;
    /**
     * The related record id of the Log Curve Main Family Type - which is the Geological
     * Physical Quantity measured - such as porosity.
     */
    LogCurveMainFamilyID?: string;
    /**
     * The related record id of the Log Curve Type - which is the standard mnemonic chosen by
     * the company - OSDU provides an initial list
     */
    LogCurveTypeID?: string;
    /**
     * The Mnemonic of the Log Curve is the value as received either from Raw Providers or from
     * Internal Processing team
     */
    Mnemonic?: string;
    /**
     * Indicates that there is no measurement within the curve
     */
    NullValue?: boolean;
    /**
     * The number of columns present in this Curve for a single reference value. For simple logs
     * this is typically 1; for image logs this holds the number of image traces or property
     * series. Further information about the columns can be obtained via the respective log or
     * curve APIs of the Domain Data Management Service.
     */
    NumberOfColumns?: number;
    /**
     * The curve's minimum 'depth', i.e., the reference value at which the curve has its first
     * non-absent value. The curve may contain further absent values in between TopDepth and
     * BaseDepth. Note that the SamplingDomainType may not be a depth as the property name
     * indicates.
     */
    TopDepth?: number;
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
 * An interval built from two nested values : StartDate and EndDate. It applies to the whole
 * log services and may apply to composite logs as [start of the first run job] and [end of
 * the last run job]Log Service Date
 */
export interface LogServiceDateInterval {
    EndDate?:   Date;
    StartDate?: Date;
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
 * Populated only if the WellLog represents time-depth relationships or checkshots. It is
 * expressed via the standard AbstractFacilityVerticalMeasurement. The following properties
 * are expected to be present: VerticalMeasurementPathID (typically elevation),
 * VerticalMeasurementTypeID as SeismicReferenceDatum, VerticalMeasurement holding the
 * offset to either the VerticalCRSID or the chained VerticalReferenceID in the parent
 * Wellbore.
 *
 * A location along a wellbore, _usually_ associated with some aspect of the drilling of the
 * wellbore, but not with any intersecting _subsurface_ natural surfaces.
 *
 * The vertical measurement reference for the log curves, which defines the vertical
 * reference datum for the logged depths. Either VerticalMeasurement or
 * VerticalMeasurementID are populated.
 */
export interface AbstractFacilityVerticalMeasurement {
    /**
     * The date and time at which a vertical measurement instance becomes effective.
     */
    EffectiveDateTime?: Date;
    /**
     * The date and time at which a vertical measurement instance is no longer in effect.
     */
    TerminationDateTime?: Date;
    /**
     * A vertical coordinate reference system defines the origin for height or depth values. It
     * is expected that either VerticalCRSID or VerticalReferenceID reference is provided in a
     * given vertical measurement array object, but not both.
     */
    VerticalCRSID?: string;
    /**
     * The value of the elevation or depth. Depth is positive downwards from a vertical
     * reference or geodetic datum along a path, which can be vertical; elevation is positive
     * upwards from a geodetic datum along a vertical path. Either can be negative.
     */
    VerticalMeasurement?: number;
    /**
     * Text which describes a vertical measurement in detail.
     */
    VerticalMeasurementDescription?: string;
    /**
     * Specifies Measured Depth, True Vertical Depth, or Elevation.
     */
    VerticalMeasurementPathID?: string;
    /**
     * Specifies Driller vs Logger.
     */
    VerticalMeasurementSourceID?: string;
    /**
     * Specifies the type of vertical measurement (TD, Plugback, Kickoff, Drill Floor, Rotary
     * Table...).
     */
    VerticalMeasurementTypeID?: string;
    /**
     * The unit of measure for the vertical measurement. If a unit of measure and a vertical CRS
     * are provided, the unit of measure provided is taken over the unit of measure from the CRS.
     */
    VerticalMeasurementUnitOfMeasureID?: string;
    /**
     * This relationship identifies the entity (aka record) in which the VerticalReferenceID is
     * found; It could be a different OSDU entity or a self-reference. For example, a Wellbore
     * VerticalMeasurement may reference a member of a VerticalMeasurements[] array in its
     * parent Well record. Alternatively, VerticalReferenceEntityID may be populated with the ID
     * of its own Wellbore record to make explicit that VerticalReferenceID is intended to be
     * found in this record, not another.
     */
    VerticalReferenceEntityID?: string;
    /**
     * The reference point from which the relative vertical measurement is made. This is only
     * populated if the measurement has no VerticalCRSID specified. The value entered must match
     * the VerticalMeasurementID for another vertical measurement array element in Wellbore or
     * Well or in a related parent facility. The relationship should be  declared explicitly in
     * VerticalReferenceEntityID. Any chain of measurements must ultimately resolve to a
     * Vertical CRS. It is expected that a VerticalCRSID or a VerticalReferenceID is provided in
     * a given vertical measurement array object, but not both.
     */
    VerticalReferenceID?: string;
    /**
     * Specifies what directional survey or wellpath was used to calculate the TVD.
     */
    WellboreTVDTrajectoryID?: string;
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
    public static toWellLog(json: string): WellLog {
        return cast(JSON.parse(json), r("WellLog"));
    }

    public static wellLogToJson(value: WellLog): string {
        return JSON.stringify(uncast(value, r("WellLog")), null, 2);
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
    "WellLog": o([
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
        { json: "ActivityType", js: "ActivityType", typ: u(undefined, "") },
        { json: "BottomMeasuredDepth", js: "BottomMeasuredDepth", typ: u(undefined, 3.14) },
        { json: "CandidateReferenceCurveIDs", js: "CandidateReferenceCurveIDs", typ: u(undefined, a("")) },
        { json: "CompanyID", js: "CompanyID", typ: u(undefined, "") },
        { json: "ConveyanceMethodID", js: "ConveyanceMethodID", typ: u(undefined, "") },
        { json: "Curves", js: "Curves", typ: u(undefined, a(r("Curves"))) },
        { json: "DrillingFluidProperty", js: "DrillingFluidProperty", typ: u(undefined, "") },
        { json: "FrameIdentifier", js: "FrameIdentifier", typ: u(undefined, "") },
        { json: "HoleTypeLogging", js: "HoleTypeLogging", typ: u(undefined, "") },
        { json: "IsRegular", js: "IsRegular", typ: u(undefined, true) },
        { json: "LogActivity", js: "LogActivity", typ: u(undefined, "") },
        { json: "LoggingDirection", js: "LoggingDirection", typ: u(undefined, "") },
        { json: "LoggingService", js: "LoggingService", typ: u(undefined, "") },
        { json: "LogRemark", js: "LogRemark", typ: u(undefined, "") },
        { json: "LogRun", js: "LogRun", typ: u(undefined, "") },
        { json: "LogServiceDateInterval", js: "LogServiceDateInterval", typ: u(undefined, r("LogServiceDateInterval")) },
        { json: "LogSource", js: "LogSource", typ: u(undefined, "") },
        { json: "LogVersion", js: "LogVersion", typ: u(undefined, "") },
        { json: "PassNumber", js: "PassNumber", typ: u(undefined, 0) },
        { json: "ReferenceCurveID", js: "ReferenceCurveID", typ: u(undefined, "") },
        { json: "SamplingDomainTypeID", js: "SamplingDomainTypeID", typ: u(undefined, "") },
        { json: "SamplingInterval", js: "SamplingInterval", typ: u(undefined, 3.14) },
        { json: "SamplingStart", js: "SamplingStart", typ: u(undefined, 3.14) },
        { json: "SamplingStop", js: "SamplingStop", typ: u(undefined, 3.14) },
        { json: "SeismicReferenceElevation", js: "SeismicReferenceElevation", typ: u(undefined, r("AbstractFacilityVerticalMeasurement")) },
        { json: "ServiceCompanyID", js: "ServiceCompanyID", typ: u(undefined, "") },
        { json: "ToolStringDescription", js: "ToolStringDescription", typ: u(undefined, "") },
        { json: "TopMeasuredDepth", js: "TopMeasuredDepth", typ: u(undefined, 3.14) },
        { json: "VerticalMeasurement", js: "VerticalMeasurement", typ: u(undefined, r("AbstractFacilityVerticalMeasurement")) },
        { json: "VerticalMeasurementID", js: "VerticalMeasurementID", typ: u(undefined, "") },
        { json: "WellboreFluidTypeID", js: "WellboreFluidTypeID", typ: u(undefined, "") },
        { json: "WellboreID", js: "WellboreID", typ: u(undefined, "") },
        { json: "WellLogTypeID", js: "WellLogTypeID", typ: u(undefined, "") },
        { json: "ZeroTime", js: "ZeroTime", typ: u(undefined, Date) },
        { json: "ExtensionProperties", js: "ExtensionProperties", typ: u(undefined, m("any")) },
    ], "any"),
    "Artefacts": o([
        { json: "ResourceID", js: "ResourceID", typ: u(undefined, "") },
        { json: "ResourceKind", js: "ResourceKind", typ: u(undefined, "") },
        { json: "RoleID", js: "RoleID", typ: u(undefined, "") },
    ], "any"),
    "Curves": o([
        { json: "BaseDepth", js: "BaseDepth", typ: u(undefined, 3.14) },
        { json: "CurveDescription", js: "CurveDescription", typ: u(undefined, "") },
        { json: "CurveID", js: "CurveID", typ: u(undefined, "") },
        { json: "CurveQuality", js: "CurveQuality", typ: u(undefined, "") },
        { json: "CurveSampleTypeID", js: "CurveSampleTypeID", typ: u(undefined, "") },
        { json: "CurveUnit", js: "CurveUnit", typ: u(undefined, "") },
        { json: "CurveVersion", js: "CurveVersion", typ: u(undefined, "") },
        { json: "DateStamp", js: "DateStamp", typ: u(undefined, Date) },
        { json: "DepthCoding", js: "DepthCoding", typ: u(undefined, "") },
        { json: "DepthUnit", js: "DepthUnit", typ: u(undefined, "") },
        { json: "Interpolate", js: "Interpolate", typ: u(undefined, true) },
        { json: "InterpreterName", js: "InterpreterName", typ: u(undefined, "") },
        { json: "IsProcessed", js: "IsProcessed", typ: u(undefined, true) },
        { json: "LogCurveBusinessValueID", js: "LogCurveBusinessValueID", typ: u(undefined, "") },
        { json: "LogCurveFamilyID", js: "LogCurveFamilyID", typ: u(undefined, "") },
        { json: "LogCurveMainFamilyID", js: "LogCurveMainFamilyID", typ: u(undefined, "") },
        { json: "LogCurveTypeID", js: "LogCurveTypeID", typ: u(undefined, "") },
        { json: "Mnemonic", js: "Mnemonic", typ: u(undefined, "") },
        { json: "NullValue", js: "NullValue", typ: u(undefined, true) },
        { json: "NumberOfColumns", js: "NumberOfColumns", typ: u(undefined, 0) },
        { json: "TopDepth", js: "TopDepth", typ: u(undefined, 3.14) },
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
    "LogServiceDateInterval": o([
        { json: "EndDate", js: "EndDate", typ: u(undefined, Date) },
        { json: "StartDate", js: "StartDate", typ: u(undefined, Date) },
    ], "any"),
    "AbstractAliasNames": o([
        { json: "AliasName", js: "AliasName", typ: u(undefined, "") },
        { json: "AliasNameTypeID", js: "AliasNameTypeID", typ: u(undefined, "") },
        { json: "DefinitionOrganisationID", js: "DefinitionOrganisationID", typ: u(undefined, "") },
        { json: "EffectiveDateTime", js: "EffectiveDateTime", typ: u(undefined, Date) },
        { json: "TerminationDateTime", js: "TerminationDateTime", typ: u(undefined, Date) },
    ], "any"),
    "AbstractFacilityVerticalMeasurement": o([
        { json: "EffectiveDateTime", js: "EffectiveDateTime", typ: u(undefined, Date) },
        { json: "TerminationDateTime", js: "TerminationDateTime", typ: u(undefined, Date) },
        { json: "VerticalCRSID", js: "VerticalCRSID", typ: u(undefined, "") },
        { json: "VerticalMeasurement", js: "VerticalMeasurement", typ: u(undefined, 3.14) },
        { json: "VerticalMeasurementDescription", js: "VerticalMeasurementDescription", typ: u(undefined, "") },
        { json: "VerticalMeasurementPathID", js: "VerticalMeasurementPathID", typ: u(undefined, "") },
        { json: "VerticalMeasurementSourceID", js: "VerticalMeasurementSourceID", typ: u(undefined, "") },
        { json: "VerticalMeasurementTypeID", js: "VerticalMeasurementTypeID", typ: u(undefined, "") },
        { json: "VerticalMeasurementUnitOfMeasureID", js: "VerticalMeasurementUnitOfMeasureID", typ: u(undefined, "") },
        { json: "VerticalReferenceEntityID", js: "VerticalReferenceEntityID", typ: u(undefined, "") },
        { json: "VerticalReferenceID", js: "VerticalReferenceID", typ: u(undefined, "") },
        { json: "WellboreTVDTrajectoryID", js: "WellboreTVDTrajectoryID", typ: u(undefined, "") },
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
