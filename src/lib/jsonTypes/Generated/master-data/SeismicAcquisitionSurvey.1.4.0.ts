// To parse this data:
//
//   import { Convert, SeismicAcquisitionSurvey } from "./file";
//
//   const seismicAcquisitionSurvey = Convert.toSeismicAcquisitionSurvey(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * A seismic acquisition project is a type of business project that deploys resources to the
 * field to record seismic data.  It may be referred to as a field survey, acquisition
 * survey, or field program.  It is not the same as the geometry of the deployed equipment
 * (nav), which is a work product component.
 */
export interface SeismicAcquisitionSurvey {
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
 *
 * A Project is a business activity that consumes financial and human resources and produces
 * (digital) work products.
 *
 * The activity abstraction for projects and surveys (master-data).
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
     * References to applicable agreements in external contract database system of record.
     */
    ContractIDs?: string[];
    /**
     * References to organisations which supplied services to the Project.
     */
    Contractors?: Contractors[];
    /**
     * The history of expenditure approvals.
     */
    FundsAuthorizations?: FundsAuthorizations[];
    /**
     * The organisation which controlled the conduct of the project.
     */
    Operator?: string;
    /**
     * List of key individuals supporting the Project.  This could be Abstracted for re-use, and
     * could reference a separate Persons master data object.
     */
    Personnel?: Personnel[];
    /**
     * The date and time when the Project was initiated.
     */
    ProjectBeginDate?: Date;
    /**
     * The date and time when the Project was completed.
     */
    ProjectEndDate?: Date;
    /**
     * Native identifier from a Master Data Management System or other trusted source external
     * to OSDU - stored here in order to allow for multi-system connection and synchronization.
     * If used, the "Source" property should identify that source system.
     */
    ProjectID?: string;
    /**
     * The common or preferred name of a Project.
     */
    ProjectName?: string;
    /**
     * DEPRECATED: please use data.NameAliases. The history of Project names, codes, and other
     * business identifiers.
     */
    ProjectNames?: AbstractAliasNames[];
    /**
     * General parameters defining the configuration of the Project.  In the case of a seismic
     * acquisition project it is like receiver interval, source depth, source type.  In the case
     * of a processing project, it is like replacement velocity, reference datum above mean sea
     * level.
     */
    ProjectSpecifications?: ProjectSpecifications[];
    /**
     * The history of life cycle states that the Project has been through..
     */
    ProjectStates?: ProjectStates[];
    /**
     * Description of the objectives of a Project.
     */
    Purpose?: string;
    /**
     * The (non-overlapping) historical activity states and effective start and termination
     * dates. The last state is replicated in the single LastActivityState for simpler queries.
     */
    ActivityStates?: AbstractActivityState[];
    /**
     * The relation to the ActivityTemplate carrying expected parameter definitions and default
     * values.
     */
    ActivityTemplateID?: string;
    /**
     * The current or last state this activity transitioned to. It is a copy of the last element
     * in ActivityStates[]. If there is only one state recorded, the ActivityStates[] can stay
     * empty.
     */
    LastActivityState?: AbstractActivityState;
    /**
     * General parameter value used in one instance of activity.  Includes reference to data
     * objects which are inputs and outputs of the activity.
     */
    Parameters?: AbstractActivityParameter[];
    /**
     * The relationship to a parent project acting as a parent activity.
     */
    ParentProjectID?: string;
    /**
     * Acquisition approach used Conventional, Wide Azimuth, Multi Azimuth etc.
     */
    AcquisitionTypeID?: string;
    /**
     * The calculated are covered by the survey. This value is calculated during the loading of
     * the survey.
     */
    AreaCalculated?: number;
    /**
     * The nominal area covered by the survey. This value is usually entered by the end user.
     */
    AreaNominal?: number;
    /**
     * DEPRECATED: Use ReceiverConfigurations[].CableCount. Number of receiver arrays (lines).
     */
    CableCount?: number;
    /**
     * DEPRECATED: Use ReceiverConfigurations[].CableLength. Total length of receiver array.
     */
    CableLength?: number;
    /**
     * DEPRECATED: Use ReceiverConfigurations[].CableSpacing. Horizontal distance between
     * receiver arrays.
     */
    CableSpacingDistance?: number;
    /**
     * DEPRECATED: Use SourceConfigurations[].EnergySourceTypeID.Seismic Source type. E.g.:
     * Airgun, Vibroseis, Dynamite, Watergun.
     */
    EnergySourceTypeID?: string;
    /**
     * The number of times a point in the subsurface is sampled.  It measures of the redundancy
     * of common midpoint seismic data.
     */
    FoldCount?: number;
    /**
     * Horizontal distance between source and last receiver.
     */
    MaxOffsetDistance?: number;
    /**
     * Horizontal distance between source and first receiver.
     */
    MinOffsetDistance?: number;
    /**
     * Identifies the setting of acquisition (land, marine, transition zone).
     */
    OperatingEnvironmentID?: string;
    /**
     * If populated, this survey is part of a time-lapse survey sequence. It identifies the
     * preceding SeismicAcquisitionSurvey. The first survey in the sequence has an empty or
     * absent PrecedingTimeLapseSurveyID.
     */
    PrecedingTimeLapseSurveyID?: string;
    /**
     * The seismic receiver configurations used for this acquisition project.
     */
    ReceiverConfigurations?: SeismicReceiverConfiguration[];
    /**
     * Length of record at time of acquisition.
     */
    RecordLength?: number;
    /**
     * Vertical sampling interval of data at time of acquisition.
     */
    SampleInterval?: number;
    /**
     * Reference to the standard values for the general layout of the acquisition.  This is an
     * hierarchical value.  The top value is like 2D, 3D, 4D, Borehole, Passive.  The second
     * value is like NATS, WATS, Brick, Crosswell.  Nodes are separated by forward slash.
     */
    SeismicGeometryTypeID?: string;
    /**
     * Orientation of plane between source and receivers.
     */
    ShootingAzimuthAngle?: number;
    /**
     * DEPRECATED: Use SourceConfigurations[].ShotpointSpacing.  Horizontal distance between
     * shotpoint locations.
     */
    ShotpointIncrementDistance?: number;
    /**
     * DEPRECATED: Use SourceConfigurations[].SourceArrayCount. Number of energy sources.
     */
    SourceArrayCount?: number;
    /**
     * DEPRECATED: Use SourceConfigurations[].SourceArraySpacing. Distance between energy
     * Sources.
     */
    SourceArraySeparationDistance?: number;
    /**
     * The seismic source configurations used for this acquisition project.
     */
    SourceConfigurations?: SeismicSourceConfiguration[];
    /**
     * The vertical measurement reference for VSP surveys, which defines the vertical reference
     * datum for the measured depths.
     */
    VerticalMeasurement?: AbstractFacilityVerticalMeasurement;
    /**
     * DEPRECATED: use VesselNames in SourceConfigurations and ReceiverConfigurations. List of
     * names of the seismic acquisition (source and streamer) vessels used (marine environment
     * only).
     */
    VesselNames?:         string[];
    ExtensionProperties?: { [key: string]: any };
    [property: string]: any;
}

/**
 * One step/interval in an Activity's or ProjectActivity's state.
 *
 * The current or last state this activity transitioned to. It is a copy of the last element
 * in ActivityStates[]. If there is only one state recorded, the ActivityStates[] can stay
 * empty.
 */
export interface AbstractActivityState {
    /**
     * The ActivityStatus is a set of major activity phases that are significant to business
     * stakeholders.
     */
    ActivityStatusID?: string;
    /**
     * The date and time at which the activity status becomes effective.
     */
    EffectiveDateTime?: Date;
    /**
     * An optional remark associated with the ActivityStatus and time interval.
     */
    Remark?: string;
    /**
     * The date and time at which the activity status is no longer in effect. For still
     * effective activity states, the TerminationDateTime is left absent. For zero-duration
     * intervals (events), the TerminationDateTime set to the same value as EffectiveDateTime.
     */
    TerminationDateTime?: Date;
    [property: string]: any;
}

/**
 * References to organisations which supplied services to the Project.
 */
export interface Contractors {
    /**
     * Name of the team, unit, crew, party, or other subdivision of the Contractor that provided
     * services.
     */
    ContractorCrew?: string;
    /**
     * Reference to a company that provided services.
     */
    ContractorOrganisationID?: string;
    /**
     * The identifier of a reference value for the role of a contractor providing services, such
     * as Recording, Line Clearing, Positioning, Data Processing.
     */
    ContractorTypeID?: string;
    [property: string]: any;
}

/**
 * The history of expenditure approvals.
 */
export interface FundsAuthorizations {
    /**
     * Internal Company control number which identifies the allocation of funds to the Project.
     */
    AuthorizationID?: string;
    /**
     * Type of currency for the authorized expenditure.
     */
    CurrencyID?: string;
    /**
     * The date and time when the funds were approved.
     */
    EffectiveDateTime?: Date;
    /**
     * The level of expenditure approved.
     */
    FundsAmount?: number;
    [property: string]: any;
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
    [property: string]: any;
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
    [property: string]: any;
}

/**
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
    [property: string]: any;
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
    [property: string]: any;
}

/**
 * List of key individuals supporting the Project.  This could be Abstracted for re-use, and
 * could reference a separate Persons master data object.
 */
export interface Personnel {
    /**
     * Reference to the company which employs Personnel.
     */
    CompanyOrganisationID?: string;
    /**
     * Name of an individual supporting the Project.
     */
    PersonName?: string;
    /**
     * The identifier of a reference value for the role of an individual supporting a Project,
     * such as Project Manager, Party Chief, Client Representative, Senior Observer.
     */
    ProjectRoleID?: string;
    [property: string]: any;
}

/**
 * General parameters defining the configuration of the Project.  In the case of a seismic
 * acquisition project it is like receiver interval, source depth, source type.  In the case
 * of a processing project, it is like replacement velocity, reference datum above mean sea
 * level.
 */
export interface ProjectSpecifications {
    /**
     * The date and time at which a ProjectSpecification becomes effective.
     */
    EffectiveDateTime?: Date;
    /**
     * Parameter type of property or characteristic.
     */
    ParameterTypeID?: string;
    /**
     * The actual date and time value of the parameter.  ISO format permits specification of
     * time or date only.
     */
    ProjectSpecificationDateTime?: Date;
    /**
     * The actual indicator value of the parameter.
     */
    ProjectSpecificationIndicator?: boolean;
    /**
     * The value for the specified parameter type.
     */
    ProjectSpecificationQuantity?: number;
    /**
     * The actual text value of the parameter.
     */
    ProjectSpecificationText?: string;
    /**
     * The date and time at which a ProjectSpecification is no longer in effect.
     */
    TerminationDateTime?: Date;
    /**
     * The unit for the quantity parameter if overriding the default for this ParameterType,
     * like metre (m in SI units system) for quantity Length.
     */
    UnitOfMeasureID?: string;
    [property: string]: any;
}

/**
 * The history of life cycle states that the Project has been through..
 */
export interface ProjectStates {
    /**
     * The date and time at which the state becomes effective.
     */
    EffectiveDateTime?: Date;
    /**
     * The Project life cycle state from planning to completion.
     */
    ProjectStateTypeID?: string;
    /**
     * The date and time at which the state is no longer in effect.
     */
    TerminationDateTime?: Date;
    [property: string]: any;
}

/**
 * Parameters characterizing the seismic receiver configuration.
 */
export interface SeismicReceiverConfiguration {
    /**
     * Number of receiver arrays (lines).
     */
    CableCount?: number;
    /**
     * Marine seismic cable towing depth below sea surface  (Positive Down).
     */
    CableDepth?: number;
    /**
     * Total length of receiver array.
     */
    CableLength?: number;
    /**
     * Horizontal distance between receiver arrays.
     */
    CableSpacing?: number;
    /**
     * Number of receivers on a cable.
     */
    ReceiverCount?: number;
    /**
     * Distance between receiver groups on the same cable.
     */
    ReceiverGroupSpacing?: number;
    /**
     * Distance between receivers on same cable.
     */
    ReceiverSpacingInterval?: number;
    /**
     * The type of receivers, e.g. geophones, hydrophones, ocean bottom seismometers.
     */
    ReceiverTypeID?: string;
    /**
     * Text remarks regarding the Seismic Receiver configuration.
     */
    Remarks?: string;
    /**
     * Name of the receiver vessel (may be the same as the source).  In the case of a VSP, this
     * may be a platform or rig.
     */
    VesselName?: string;
    /**
     * The relationship to the wellbore, in which the receivers are located. Used in conjunction
     * with VSP acquisition.
     */
    WellboreID?: string;
    /**
     * Maximum depth of receivers in a wellbore. Used in conjunction with VSP acquisition.
     */
    WellboreReceiverMaxDepth?: number;
    /**
     * Minimum depth of receivers in a wellbore. Used in conjunction with VSP acquisition.
     */
    WellboreReceiverMinDepth?: number;
    [property: string]: any;
}

/**
 * Parameters characterizing the seismic source configuration.
 */
export interface SeismicSourceConfiguration {
    /**
     * Seismic Source type. E.g.: Airgun, Vibroseis, Dynamite,Watergun.
     */
    EnergySourceTypeID?: string;
    /**
     * Text remarks regarding the Seismic source configuration.
     */
    Remarks?: string;
    /**
     * Horizontal distance between shotpoint locations.
     */
    ShotpointSpacing?: number;
    /**
     * Number of energy sources.
     */
    SourceArrayCount?: number;
    /**
     * Depth of the energy source.
     */
    SourceArrayDepth?: number;
    /**
     * Maximum depth of receivers in a wellbore. Used in conjunction with VSP acquisition.
     */
    SourceArrayMaxDepth?: number;
    /**
     * Minimum depth of Sources in a wellbore. Used in conjunction with VSP acquisition.
     */
    SourceArrayMinDepth?: number;
    /**
     * Distance between energy sources.
     */
    SourceArraySpacing?: number;
    /**
     * Maximum frequency of the vibroseis source.
     */
    SourceArraySweepFreqMax?: number;
    /**
     * Minimum frequency of the vibroseis source.
     */
    SourceArraySweepFreqMin?: number;
    /**
     * Length of the vibroseis source sweep.
     */
    SourceArraySweepLength?: number;
    /**
     * Volume of the energy source.
     */
    SourceArrayVolume?: number;
    /**
     * The relationship to the wellbore, in which the source or sources are located.
     */
    SourceWellboreID?: string;
    /**
     * Name of the source vessel (may be the same as the receiver).  In the case of a VSP, this
     * may be a platform or rig.
     */
    VesselName?: string;
    [property: string]: any;
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
    [property: string]: any;
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
    [property: string]: any;
}

export interface AnyCRSGeoJSONFeature {
    bbox?:      number[];
    geometry:   null | AnyCRSGeoJSON;
    properties: { [key: string]: any } | null;
    type:       FluffyType;
    [property: string]: any;
}

export interface AnyCRSGeoJSON {
    bbox?:        number[];
    coordinates?: Array<Array<Array<number[] | number> | number> | number>;
    type:         AnyCRSGeoJSONPointType;
    geometries?:  GeometryElement[];
    [property: string]: any;
}

export interface GeometryElement {
    bbox?:       number[];
    coordinates: Array<Array<Array<number[] | number> | number> | number>;
    type:        PurpleType;
    [property: string]: any;
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
    [property: string]: any;
}

export interface GeoJSONFeature {
    bbox?:      number[];
    geometry:   null | GeoJSON;
    properties: { [key: string]: any } | null;
    type:       StickyType;
    [property: string]: any;
}

export interface GeoJSON {
    bbox?:        number[];
    coordinates?: Array<Array<Array<number[] | number> | number> | number>;
    type:         GeoJSONPointType;
    geometries?:  GeometryObject[];
    [property: string]: any;
}

export interface GeometryObject {
    bbox?:       number[];
    coordinates: Array<Array<Array<number[] | number> | number> | number>;
    type:        TentacledType;
    [property: string]: any;
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
    [property: string]: any;
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
    [property: string]: any;
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
    [property: string]: any;
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
    [property: string]: any;
}

/**
 * The vertical measurement reference for VSP surveys, which defines the vertical reference
 * datum for the measured depths.
 *
 * A location along a wellbore, _usually_ associated with some aspect of the drilling of the
 * wellbore, but not with any intersecting _subsurface_ natural surfaces.
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
    [property: string]: any;
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
    kind: ReferenceKind;
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
    [property: string]: any;
}

export enum ReferenceKind {
    AzimuthReference = "AzimuthReference",
    CRS = "CRS",
    DateTime = "DateTime",
    Unit = "Unit",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toSeismicAcquisitionSurvey(json: string): SeismicAcquisitionSurvey {
        return cast(JSON.parse(json), r("SeismicAcquisitionSurvey"));
    }

    public static seismicAcquisitionSurveyToJson(value: SeismicAcquisitionSurvey): string {
        return JSON.stringify(uncast(value, r("SeismicAcquisitionSurvey")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
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

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
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
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
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

function l(typ: any) {
    return { literal: typ };
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
    "SeismicAcquisitionSurvey": o([
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
        { json: "ContractIDs", js: "ContractIDs", typ: u(undefined, a("")) },
        { json: "Contractors", js: "Contractors", typ: u(undefined, a(r("Contractors"))) },
        { json: "FundsAuthorizations", js: "FundsAuthorizations", typ: u(undefined, a(r("FundsAuthorizations"))) },
        { json: "Operator", js: "Operator", typ: u(undefined, "") },
        { json: "Personnel", js: "Personnel", typ: u(undefined, a(r("Personnel"))) },
        { json: "ProjectBeginDate", js: "ProjectBeginDate", typ: u(undefined, Date) },
        { json: "ProjectEndDate", js: "ProjectEndDate", typ: u(undefined, Date) },
        { json: "ProjectID", js: "ProjectID", typ: u(undefined, "") },
        { json: "ProjectName", js: "ProjectName", typ: u(undefined, "") },
        { json: "ProjectNames", js: "ProjectNames", typ: u(undefined, a(r("AbstractAliasNames"))) },
        { json: "ProjectSpecifications", js: "ProjectSpecifications", typ: u(undefined, a(r("ProjectSpecifications"))) },
        { json: "ProjectStates", js: "ProjectStates", typ: u(undefined, a(r("ProjectStates"))) },
        { json: "Purpose", js: "Purpose", typ: u(undefined, "") },
        { json: "ActivityStates", js: "ActivityStates", typ: u(undefined, a(r("AbstractActivityState"))) },
        { json: "ActivityTemplateID", js: "ActivityTemplateID", typ: u(undefined, "") },
        { json: "LastActivityState", js: "LastActivityState", typ: u(undefined, r("AbstractActivityState")) },
        { json: "Parameters", js: "Parameters", typ: u(undefined, a(r("AbstractActivityParameter"))) },
        { json: "ParentProjectID", js: "ParentProjectID", typ: u(undefined, "") },
        { json: "AcquisitionTypeID", js: "AcquisitionTypeID", typ: u(undefined, "") },
        { json: "AreaCalculated", js: "AreaCalculated", typ: u(undefined, 3.14) },
        { json: "AreaNominal", js: "AreaNominal", typ: u(undefined, 3.14) },
        { json: "CableCount", js: "CableCount", typ: u(undefined, 0) },
        { json: "CableLength", js: "CableLength", typ: u(undefined, 3.14) },
        { json: "CableSpacingDistance", js: "CableSpacingDistance", typ: u(undefined, 3.14) },
        { json: "EnergySourceTypeID", js: "EnergySourceTypeID", typ: u(undefined, "") },
        { json: "FoldCount", js: "FoldCount", typ: u(undefined, 0) },
        { json: "MaxOffsetDistance", js: "MaxOffsetDistance", typ: u(undefined, 3.14) },
        { json: "MinOffsetDistance", js: "MinOffsetDistance", typ: u(undefined, 3.14) },
        { json: "OperatingEnvironmentID", js: "OperatingEnvironmentID", typ: u(undefined, "") },
        { json: "PrecedingTimeLapseSurveyID", js: "PrecedingTimeLapseSurveyID", typ: u(undefined, "") },
        { json: "ReceiverConfigurations", js: "ReceiverConfigurations", typ: u(undefined, a(r("SeismicReceiverConfiguration"))) },
        { json: "RecordLength", js: "RecordLength", typ: u(undefined, 3.14) },
        { json: "SampleInterval", js: "SampleInterval", typ: u(undefined, 3.14) },
        { json: "SeismicGeometryTypeID", js: "SeismicGeometryTypeID", typ: u(undefined, "") },
        { json: "ShootingAzimuthAngle", js: "ShootingAzimuthAngle", typ: u(undefined, 3.14) },
        { json: "ShotpointIncrementDistance", js: "ShotpointIncrementDistance", typ: u(undefined, 3.14) },
        { json: "SourceArrayCount", js: "SourceArrayCount", typ: u(undefined, 0) },
        { json: "SourceArraySeparationDistance", js: "SourceArraySeparationDistance", typ: u(undefined, 3.14) },
        { json: "SourceConfigurations", js: "SourceConfigurations", typ: u(undefined, a(r("SeismicSourceConfiguration"))) },
        { json: "VerticalMeasurement", js: "VerticalMeasurement", typ: u(undefined, r("AbstractFacilityVerticalMeasurement")) },
        { json: "VesselNames", js: "VesselNames", typ: u(undefined, a("")) },
        { json: "ExtensionProperties", js: "ExtensionProperties", typ: u(undefined, m("any")) },
    ], "any"),
    "AbstractActivityState": o([
        { json: "ActivityStatusID", js: "ActivityStatusID", typ: u(undefined, "") },
        { json: "EffectiveDateTime", js: "EffectiveDateTime", typ: u(undefined, Date) },
        { json: "Remark", js: "Remark", typ: u(undefined, "") },
        { json: "TerminationDateTime", js: "TerminationDateTime", typ: u(undefined, Date) },
    ], "any"),
    "Contractors": o([
        { json: "ContractorCrew", js: "ContractorCrew", typ: u(undefined, "") },
        { json: "ContractorOrganisationID", js: "ContractorOrganisationID", typ: u(undefined, "") },
        { json: "ContractorTypeID", js: "ContractorTypeID", typ: u(undefined, "") },
    ], "any"),
    "FundsAuthorizations": o([
        { json: "AuthorizationID", js: "AuthorizationID", typ: u(undefined, "") },
        { json: "CurrencyID", js: "CurrencyID", typ: u(undefined, "") },
        { json: "EffectiveDateTime", js: "EffectiveDateTime", typ: u(undefined, Date) },
        { json: "FundsAmount", js: "FundsAmount", typ: u(undefined, 3.14) },
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
    "Personnel": o([
        { json: "CompanyOrganisationID", js: "CompanyOrganisationID", typ: u(undefined, "") },
        { json: "PersonName", js: "PersonName", typ: u(undefined, "") },
        { json: "ProjectRoleID", js: "ProjectRoleID", typ: u(undefined, "") },
    ], "any"),
    "ProjectSpecifications": o([
        { json: "EffectiveDateTime", js: "EffectiveDateTime", typ: u(undefined, Date) },
        { json: "ParameterTypeID", js: "ParameterTypeID", typ: u(undefined, "") },
        { json: "ProjectSpecificationDateTime", js: "ProjectSpecificationDateTime", typ: u(undefined, Date) },
        { json: "ProjectSpecificationIndicator", js: "ProjectSpecificationIndicator", typ: u(undefined, true) },
        { json: "ProjectSpecificationQuantity", js: "ProjectSpecificationQuantity", typ: u(undefined, 3.14) },
        { json: "ProjectSpecificationText", js: "ProjectSpecificationText", typ: u(undefined, "") },
        { json: "TerminationDateTime", js: "TerminationDateTime", typ: u(undefined, Date) },
        { json: "UnitOfMeasureID", js: "UnitOfMeasureID", typ: u(undefined, "") },
    ], "any"),
    "ProjectStates": o([
        { json: "EffectiveDateTime", js: "EffectiveDateTime", typ: u(undefined, Date) },
        { json: "ProjectStateTypeID", js: "ProjectStateTypeID", typ: u(undefined, "") },
        { json: "TerminationDateTime", js: "TerminationDateTime", typ: u(undefined, Date) },
    ], "any"),
    "SeismicReceiverConfiguration": o([
        { json: "CableCount", js: "CableCount", typ: u(undefined, 0) },
        { json: "CableDepth", js: "CableDepth", typ: u(undefined, 3.14) },
        { json: "CableLength", js: "CableLength", typ: u(undefined, 3.14) },
        { json: "CableSpacing", js: "CableSpacing", typ: u(undefined, 3.14) },
        { json: "ReceiverCount", js: "ReceiverCount", typ: u(undefined, 0) },
        { json: "ReceiverGroupSpacing", js: "ReceiverGroupSpacing", typ: u(undefined, 3.14) },
        { json: "ReceiverSpacingInterval", js: "ReceiverSpacingInterval", typ: u(undefined, 3.14) },
        { json: "ReceiverTypeID", js: "ReceiverTypeID", typ: u(undefined, "") },
        { json: "Remarks", js: "Remarks", typ: u(undefined, "") },
        { json: "VesselName", js: "VesselName", typ: u(undefined, "") },
        { json: "WellboreID", js: "WellboreID", typ: u(undefined, "") },
        { json: "WellboreReceiverMaxDepth", js: "WellboreReceiverMaxDepth", typ: u(undefined, 3.14) },
        { json: "WellboreReceiverMinDepth", js: "WellboreReceiverMinDepth", typ: u(undefined, 3.14) },
    ], "any"),
    "SeismicSourceConfiguration": o([
        { json: "EnergySourceTypeID", js: "EnergySourceTypeID", typ: u(undefined, "") },
        { json: "Remarks", js: "Remarks", typ: u(undefined, "") },
        { json: "ShotpointSpacing", js: "ShotpointSpacing", typ: u(undefined, 3.14) },
        { json: "SourceArrayCount", js: "SourceArrayCount", typ: u(undefined, 0) },
        { json: "SourceArrayDepth", js: "SourceArrayDepth", typ: u(undefined, 3.14) },
        { json: "SourceArrayMaxDepth", js: "SourceArrayMaxDepth", typ: u(undefined, 3.14) },
        { json: "SourceArrayMinDepth", js: "SourceArrayMinDepth", typ: u(undefined, 3.14) },
        { json: "SourceArraySpacing", js: "SourceArraySpacing", typ: u(undefined, 3.14) },
        { json: "SourceArraySweepFreqMax", js: "SourceArraySweepFreqMax", typ: u(undefined, 3.14) },
        { json: "SourceArraySweepFreqMin", js: "SourceArraySweepFreqMin", typ: u(undefined, 3.14) },
        { json: "SourceArraySweepLength", js: "SourceArraySweepLength", typ: u(undefined, 3.14) },
        { json: "SourceArrayVolume", js: "SourceArrayVolume", typ: u(undefined, 3.14) },
        { json: "SourceWellboreID", js: "SourceWellboreID", typ: u(undefined, "") },
        { json: "VesselName", js: "VesselName", typ: u(undefined, "") },
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
    "LegalMetaData": o([
        { json: "legaltags", js: "legaltags", typ: a("") },
        { json: "otherRelevantDataCountries", js: "otherRelevantDataCountries", typ: a("") },
        { json: "status", js: "status", typ: u(undefined, "") },
    ], false),
    "FrameOfReferenceMetaDataItem": o([
        { json: "kind", js: "kind", typ: r("ReferenceKind") },
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
    "ReferenceKind": [
        "AzimuthReference",
        "CRS",
        "DateTime",
        "Unit",
    ],
};
