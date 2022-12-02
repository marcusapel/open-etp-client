// To parse this data:
//
//   import { Convert, CoordinateReferenceSystem } from "./file";
//
//   const coordinateReferenceSystem = Convert.toCoordinateReferenceSystem(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * Used to describe any kind of coordinate reference system. The type is identified by
 * CoordinateReferenceSystemType (used by the system) and Kind facing the end-user. The Code
 * is according to OSDU standard a string, the EPSG standard number is available via the
 * CodeAsNumber property. Description carries EPSG's Remark. AttributionAuthority carries
 * EPSG's DataSource. AliasNames carry the EPSG Alias contents.
 */
export interface CoordinateReferenceSystem {
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
 * Generic reference object containing the universal properties of reference data,
 * especially the ones commonly thought of as Types
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
     * Name of the authority, or organisation, which governs the entity value and from which it
     * is sourced.
     */
    AttributionAuthority?: string;
    /**
     * Name, URL, or other identifier of the publication, or repository, of the attribution
     * source organisation from which the entity value is sourced.
     */
    AttributionPublication?: string;
    /**
     * The distinct instance of the attribution publication, by version number, sequence number,
     * date of publication, etc., that was used for the entity value.
     */
    AttributionRevision?: string;
    /**
     * The abbreviation or mnemonic for a reference type if defined. Example: WELL and WLBR.
     */
    Code?: string;
    /**
     * For reference values published and governed by OSDU: The date and time the record was
     * committed into the OSDU member GitLab reference-values repository. The sole purpose of
     * this date is to optimise the OSDU milestone upgrades. It allows the upgrade code to
     * figure out whether or not the record must be PUT into reference value storage.
     */
    CommitDate?: Date;
    /**
     * The text which describes a NAME TYPE in detail.
     */
    Description?: string;
    /**
     * Native identifier from a Master Data Management System or other trusted source external
     * to OSDU - stored here in order to allow for multi-system connection and synchronization.
     * If used, the "Source" property should identify that source system.
     */
    ID?: string;
    /**
     * By default reference values are considered as 'active'. An absent 'InactiveIndicator'
     * property value means the reference value is in active use. When 'InactiveIndicator' is
     * set true the reverence value is no longer in use and should no longer be offered as a
     * choice.
     */
    InactiveIndicator?: boolean;
    /**
     * The name of the entity instance.
     */
    Name?: string;
    /**
     * Alternative names, including historical, by which this entity instance is/has been known.
     */
    NameAlias?: AbstractAliasNames[];
    /**
     * The base geographic CRS of this projected CRS. Only populated for
     * CoordinateReferenceSystemType==ProjectedCRS.
     */
    BaseCRS?: BaseCRS;
    /**
     * The code as number as opposed to the Code defined as a string.
     */
    CodeAsNumber?: number;
    /**
     * The namespace or authority name governing this CRS definition, e.g. EPSG for contents
     * from the EPSG Geodetic Parameter Dataset.
     */
    CodeSpace?: string;
    /**
     * The type of coordinate reference system. This is an enumeration of concrete sub-types.
     */
    CoordinateReferenceSystemType?: CRSType;
    /**
     * The coordinate system defining the dimension and individual axes used by the CRS.
     */
    CoordinateSystem?: CoordinateSystem;
    /**
     * The datum of this CRS. Only populated for CoordinateReferenceSystemType in
     * [GeographicCRS, VerticalCRS, EngineeringCRS].
     */
    Datum?: Datum;
    /**
     * The DatumEnsemble for the CRS's datum. Only populated for GeographicCRS.
     */
    DatumEnsemble?: DatumEnsemble;
    /**
     * The horizontal CRS reference of a CompoundCRS. Only populated for
     * CoordinateReferenceSystemType==CompoundCRS.
     */
    HorizontalCRS?: HorizontalCRS;
    /**
     * The InformationSource providing the CRS definition if different from AttributionAuthority.
     */
    InformationSource?: string;
    /**
     * The kind of CRS, e.g. bound, compound, derived, engineering, geocentric, geographic 2D,
     * geographic 3D, projected, vertical.
     */
    Kind?: string;
    /**
     * Used for export and actionable instructions to a conversion/transformation engine. It is
     * initially based on Esri well-known text (WKT). Eventually, when Esri WKT are convertible
     * into ISO WKT and vice versa, the definition can be replaced by
     * https://proj.org/schemas/v0.2/projjson.schema.json.
     */
    PersistableReference?: string;
    /**
     * Scope and extent information about the described CRS.
     */
    PreferredUsage?: PreferredUsage;
    /**
     * The projection operation of a ProjectedCRS. Only populated for
     * CoordinateReferenceSystemType==ProjectedCRS.
     */
    Projection?: Projection;
    /**
     * The revision date of this CRS.
     */
    RevisionDate?: Date;
    /**
     * The source CRS of a BoundCRS. Only populated for CoordinateReferenceSystemType==BoundCRS.
     */
    SourceCRS?: SourceCRS;
    /**
     * The target CRS of this bound CRS. Only populated for
     * CoordinateReferenceSystemType==BoundCRS.
     */
    TargetCRS?: TargetCRS;
    /**
     * The Transformation bound to the BaseCRS in a BoundCRS. Only populated for
     * CoordinateReferenceSystemType==BoundCRS.
     */
    Transformation?: BoundTransformation;
    /**
     * Contextual information about scope and extent/area of use.
     */
    Usages?: Usage[];
    /**
     * The vertical CRS reference of a CompoundCRS. Only populated for
     * CoordinateReferenceSystemType==CompoundCRS.
     */
    VerticalCRS?: VerticalCRS;
    /**
     * The 2-dimensional bounding box derived from the extent (Polygon or MultiPolygon) based on
     * WGS 84 (EPSG:4326). The schema of this substructure is identical to the GeoJSON
     * FeatureCollection https://geojson.org/schema/FeatureCollection.json. The coordinate
     * sequence follows GeoJSON standard, i.e. longitude, latitude. CoordinateReferenceSystems
     * with an extent crossing the anti-meridian are represented by a MultiPolygon.
     */
    Wgs84Coordinates?:    GeoJSONFeatureCollection;
    ExtensionProperties?: { [key: string]: any };
}

/**
 * The base geographic CRS of this projected CRS. Only populated for
 * CoordinateReferenceSystemType==ProjectedCRS.
 */
export interface BaseCRS {
    /**
     * The BaseCRS authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: BaseCRSAuthorityCode;
    /**
     * The relationship to the BaseCRS.
     */
    BaseCRSID?: string;
    /**
     * The name of the base CRS.
     */
    Name?: string;
}

/**
 * The BaseCRS authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface BaseCRSAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * The type of coordinate reference system. This is an enumeration of concrete sub-types.
 */
export enum CRSType {
    BoundCRS = "BoundCRS",
    CompoundCRS = "CompoundCRS",
    DerivedCRS = "DerivedCRS",
    EngineeringCRS = "EngineeringCRS",
    GeodeticCRS = "GeodeticCRS",
    ProjectedCRS = "ProjectedCRS",
    VerticalCRS = "VerticalCRS",
}

/**
 * The coordinate system defining the dimension and individual axes used by the CRS.
 */
export interface CoordinateSystem {
    /**
     * The CoordinateSystem authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: CoordinateSystemAuthorityCode;
    /**
     * The horizontal unit for 2-dimensional or 3-dimensional coordinate systems. This property
     * is not populated for 1-dimensional coordinate systems (Vertical CRSs).
     */
    HorizontalAxisUnitID?: string;
    /**
     * The name of the Coordinate System.
     */
    Name?: string;
    /**
     * The vertical unit for 1-dimensional or 3-dimensional coordinate systems.
     */
    VerticalAxisUnitID?: string;
}

/**
 * The CoordinateSystem authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface CoordinateSystemAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * The datum of this CRS. Only populated for CoordinateReferenceSystemType in
 * [GeographicCRS, VerticalCRS, EngineeringCRS].
 */
export interface Datum {
    /**
     * The Datum authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: DatumAuthorityCode;
    /**
     * The name of the Datum.
     */
    Name?: string;
}

/**
 * The Datum authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface DatumAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * The DatumEnsemble for the CRS's datum. Only populated for GeographicCRS.
 */
export interface DatumEnsemble {
    /**
     * The DatumEnsemble authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: DatumEnsembleAuthorityCode;
    /**
     * The name of the DatumEnsemble.
     */
    Name?: string;
}

/**
 * The DatumEnsemble authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface DatumEnsembleAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * The horizontal CRS reference of a CompoundCRS. Only populated for
 * CoordinateReferenceSystemType==CompoundCRS.
 */
export interface HorizontalCRS {
    /**
     * The HorizontalCRS authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: HorizontalCRSAuthorityCode;
    /**
     * The relationship to the HorizontalCrs.
     */
    HorizontalCRSID?: string;
    /**
     * The name of the HorizontalCrs.
     */
    Name?: string;
}

/**
 * The HorizontalCRS authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface HorizontalCRSAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
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
 * Scope and extent information about the described CRS.
 */
export interface PreferredUsage {
    /**
     * The PreferredUsage authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: PreferredUsageAuthorityCode;
    /**
     * Extent or area of use information.
     */
    Extent?: PreferredExtent;
    /**
     * The name of the Usage.
     */
    Name?: string;
    /**
     * Scope declaration.
     */
    Scope?: PreferredScope;
}

/**
 * The PreferredUsage authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface PreferredUsageAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * Extent or area of use information.
 */
export interface PreferredExtent {
    /**
     * The Preferred Extent authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: PreferredExtentAuthorityCode;
    /**
     * Eastern longitude limit of the bounding box in degrees based on WGS 84
     */
    BoundingBoxEastBoundLongitude?: number;
    /**
     * Northern latitude limit of the bounding box in degrees based on WGS 84
     */
    BoundingBoxNorthBoundLatitude?: number;
    /**
     * Southern latitude limit of the bounding box in degrees based on WGS 84
     */
    BoundingBoxSouthBoundLatitude?: number;
    /**
     * Western longitude limit of the bounding box in degrees based on WGS 84
     */
    BoundingBoxWestBoundLongitude?: number;
    /**
     * The description of the Extent.
     */
    Description?: string;
    /**
     * The name of the Extent.
     */
    Name?: string;
}

/**
 * The Preferred Extent authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface PreferredExtentAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * Scope declaration.
 */
export interface PreferredScope {
    /**
     * The Preferred Scope authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: PreferredScopeAuthorityCode;
    /**
     * The name of the Scope.
     */
    Name?: string;
}

/**
 * The Preferred Scope authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface PreferredScopeAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * The projection operation of a ProjectedCRS. Only populated for
 * CoordinateReferenceSystemType==ProjectedCRS.
 */
export interface Projection {
    /**
     * The Projection Operation authority code, corresponding to the ISO19111 ID and 'projjson'
     * id.
     */
    AuthorityCode?: ProjectionOperationAuthorityCode;
    /**
     * The name of the projection.
     */
    Name?: string;
}

/**
 * The Projection Operation authority code, corresponding to the ISO19111 ID and 'projjson'
 * id.
 */
export interface ProjectionOperationAuthorityCode {
    /**
     * The projection operation  authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The projection operation code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * The source CRS of a BoundCRS. Only populated for CoordinateReferenceSystemType==BoundCRS.
 */
export interface SourceCRS {
    /**
     * The SourceCRS authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: SourceCRSAuthorityCode;
    /**
     * The name of the Source CRS.
     */
    Name?: string;
    /**
     * The relationship to the source CoordinateRefSystem.
     */
    SourceCRSID?: string;
}

/**
 * The SourceCRS authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface SourceCRSAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * The target CRS of this bound CRS. Only populated for
 * CoordinateReferenceSystemType==BoundCRS.
 */
export interface TargetCRS {
    /**
     * The TargetCRS authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: TargetCRSAuthorityCode;
    /**
     * The name of the base CRS.
     */
    Name?: string;
    /**
     * The relationship to the TargetCRS.
     */
    TargetCRSID?: string;
}

/**
 * The TargetCRS authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface TargetCRSAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * The Transformation bound to the BaseCRS in a BoundCRS. Only populated for
 * CoordinateReferenceSystemType==BoundCRS.
 */
export interface BoundTransformation {
    /**
     * The Transformation authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: TransformationAuthorityCode;
    /**
     * The name of the Transformation.
     */
    Name?: string;
    /**
     * The relationship to the bound transformation.
     */
    TransformationID?: string;
}

/**
 * The Transformation authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface TransformationAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * Scope and extent information about the described CRS.
 */
export interface Usage {
    /**
     * The Usage authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: UsageAuthorityCode;
    /**
     * Extent or area of use information.
     */
    Extent?: Extent;
    /**
     * The name of the Usage.
     */
    Name?: string;
    /**
     * Scope declaration.
     */
    Scope?: Scope;
}

/**
 * The Usage authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface UsageAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * Extent or area of use information.
 */
export interface Extent {
    /**
     * The Extent authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: ExtentAuthorityCode;
    /**
     * Eastern longitude limit of the bounding box in degrees based on WGS 84
     */
    BoundingBoxEastBoundLongitude?: number;
    /**
     * Northern latitude limit of the bounding box in degrees based on WGS 84
     */
    BoundingBoxNorthBoundLatitude?: number;
    /**
     * Southern latitude limit of the bounding box in degrees based on WGS 84
     */
    BoundingBoxSouthBoundLatitude?: number;
    /**
     * Western longitude limit of the bounding box in degrees based on WGS 84
     */
    BoundingBoxWestBoundLongitude?: number;
    /**
     * The description of the Extent.
     */
    Description?: string;
    /**
     * The name of the Extent.
     */
    Name?: string;
}

/**
 * The Extent authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface ExtentAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * Scope declaration.
 */
export interface Scope {
    /**
     * The Scope authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: ScopeAuthorityCode;
    /**
     * The name of the Scope.
     */
    Name?: string;
}

/**
 * The Scope authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface ScopeAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * The vertical CRS reference of a CompoundCRS. Only populated for
 * CoordinateReferenceSystemType==CompoundCRS.
 */
export interface VerticalCRS {
    /**
     * The VerticalCRS authority code, corresponding to the ISO19111 ID and 'projjson' id.
     */
    AuthorityCode?: VerticalCRSAuthorityCode;
    /**
     * The name of the VerticalCrs.
     */
    Name?: string;
    /**
     * The relationship to the VerticalCrs.
     */
    VerticalCRSID?: string;
}

/**
 * The VerticalCRS authority code, corresponding to the ISO19111 ID and 'projjson' id.
 */
export interface VerticalCRSAuthorityCode {
    /**
     * The authority governing the 'Code'.
     */
    Authority?: string;
    /**
     * The code assigned by the 'Authority'.
     */
    Code?: number;
}

/**
 * The 2-dimensional bounding box derived from the extent (Polygon or MultiPolygon) based on
 * WGS 84 (EPSG:4326). The schema of this substructure is identical to the GeoJSON
 * FeatureCollection https://geojson.org/schema/FeatureCollection.json. The coordinate
 * sequence follows GeoJSON standard, i.e. longitude, latitude. CoordinateReferenceSystems
 * with an extent crossing the anti-meridian are represented by a MultiPolygon.
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
    type:       FeatureType;
}

export interface GeoJSON {
    bbox?:        number[];
    coordinates?: Array<Array<Array<number[] | number> | number> | number>;
    type:         GeoJSONPointType;
    geometries?:  GeometryElement[];
}

export interface GeometryElement {
    bbox?:       number[];
    coordinates: Array<Array<Array<number[] | number> | number> | number>;
    type:        GeometryType;
}

export enum GeometryType {
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

export enum FeatureType {
    Feature = "Feature",
}

export enum Wgs84CoordinatesType {
    FeatureCollection = "FeatureCollection",
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
    public static toCoordinateReferenceSystem(json: string): CoordinateReferenceSystem {
        return cast(JSON.parse(json), r("CoordinateReferenceSystem"));
    }

    public static coordinateReferenceSystemToJson(value: CoordinateReferenceSystem): string {
        return JSON.stringify(uncast(value, r("CoordinateReferenceSystem")), null, 2);
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
    "CoordinateReferenceSystem": o([
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
        { json: "AttributionAuthority", js: "AttributionAuthority", typ: u(undefined, "") },
        { json: "AttributionPublication", js: "AttributionPublication", typ: u(undefined, "") },
        { json: "AttributionRevision", js: "AttributionRevision", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, "") },
        { json: "CommitDate", js: "CommitDate", typ: u(undefined, Date) },
        { json: "Description", js: "Description", typ: u(undefined, "") },
        { json: "ID", js: "ID", typ: u(undefined, "") },
        { json: "InactiveIndicator", js: "InactiveIndicator", typ: u(undefined, true) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "NameAlias", js: "NameAlias", typ: u(undefined, a(r("AbstractAliasNames"))) },
        { json: "BaseCRS", js: "BaseCRS", typ: u(undefined, r("BaseCRS")) },
        { json: "CodeAsNumber", js: "CodeAsNumber", typ: u(undefined, 0) },
        { json: "CodeSpace", js: "CodeSpace", typ: u(undefined, "") },
        { json: "CoordinateReferenceSystemType", js: "CoordinateReferenceSystemType", typ: u(undefined, r("CRSType")) },
        { json: "CoordinateSystem", js: "CoordinateSystem", typ: u(undefined, r("CoordinateSystem")) },
        { json: "Datum", js: "Datum", typ: u(undefined, r("Datum")) },
        { json: "DatumEnsemble", js: "DatumEnsemble", typ: u(undefined, r("DatumEnsemble")) },
        { json: "HorizontalCRS", js: "HorizontalCRS", typ: u(undefined, r("HorizontalCRS")) },
        { json: "InformationSource", js: "InformationSource", typ: u(undefined, "") },
        { json: "Kind", js: "Kind", typ: u(undefined, "") },
        { json: "PersistableReference", js: "PersistableReference", typ: u(undefined, "") },
        { json: "PreferredUsage", js: "PreferredUsage", typ: u(undefined, r("PreferredUsage")) },
        { json: "Projection", js: "Projection", typ: u(undefined, r("Projection")) },
        { json: "RevisionDate", js: "RevisionDate", typ: u(undefined, Date) },
        { json: "SourceCRS", js: "SourceCRS", typ: u(undefined, r("SourceCRS")) },
        { json: "TargetCRS", js: "TargetCRS", typ: u(undefined, r("TargetCRS")) },
        { json: "Transformation", js: "Transformation", typ: u(undefined, r("BoundTransformation")) },
        { json: "Usages", js: "Usages", typ: u(undefined, a(r("Usage"))) },
        { json: "VerticalCRS", js: "VerticalCRS", typ: u(undefined, r("VerticalCRS")) },
        { json: "Wgs84Coordinates", js: "Wgs84Coordinates", typ: u(undefined, r("GeoJSONFeatureCollection")) },
        { json: "ExtensionProperties", js: "ExtensionProperties", typ: u(undefined, m("any")) },
    ], "any"),
    "BaseCRS": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("BaseCRSAuthorityCode")) },
        { json: "BaseCRSID", js: "BaseCRSID", typ: u(undefined, "") },
        { json: "Name", js: "Name", typ: u(undefined, "") },
    ], "any"),
    "BaseCRSAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "CoordinateSystem": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("CoordinateSystemAuthorityCode")) },
        { json: "HorizontalAxisUnitID", js: "HorizontalAxisUnitID", typ: u(undefined, "") },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "VerticalAxisUnitID", js: "VerticalAxisUnitID", typ: u(undefined, "") },
    ], "any"),
    "CoordinateSystemAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "Datum": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("DatumAuthorityCode")) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
    ], "any"),
    "DatumAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "DatumEnsemble": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("DatumEnsembleAuthorityCode")) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
    ], "any"),
    "DatumEnsembleAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "HorizontalCRS": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("HorizontalCRSAuthorityCode")) },
        { json: "HorizontalCRSID", js: "HorizontalCRSID", typ: u(undefined, "") },
        { json: "Name", js: "Name", typ: u(undefined, "") },
    ], "any"),
    "HorizontalCRSAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "AbstractAliasNames": o([
        { json: "AliasName", js: "AliasName", typ: u(undefined, "") },
        { json: "AliasNameTypeID", js: "AliasNameTypeID", typ: u(undefined, "") },
        { json: "DefinitionOrganisationID", js: "DefinitionOrganisationID", typ: u(undefined, "") },
        { json: "EffectiveDateTime", js: "EffectiveDateTime", typ: u(undefined, Date) },
        { json: "TerminationDateTime", js: "TerminationDateTime", typ: u(undefined, Date) },
    ], "any"),
    "PreferredUsage": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("PreferredUsageAuthorityCode")) },
        { json: "Extent", js: "Extent", typ: u(undefined, r("PreferredExtent")) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "Scope", js: "Scope", typ: u(undefined, r("PreferredScope")) },
    ], "any"),
    "PreferredUsageAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "PreferredExtent": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("PreferredExtentAuthorityCode")) },
        { json: "BoundingBoxEastBoundLongitude", js: "BoundingBoxEastBoundLongitude", typ: u(undefined, 3.14) },
        { json: "BoundingBoxNorthBoundLatitude", js: "BoundingBoxNorthBoundLatitude", typ: u(undefined, 3.14) },
        { json: "BoundingBoxSouthBoundLatitude", js: "BoundingBoxSouthBoundLatitude", typ: u(undefined, 3.14) },
        { json: "BoundingBoxWestBoundLongitude", js: "BoundingBoxWestBoundLongitude", typ: u(undefined, 3.14) },
        { json: "Description", js: "Description", typ: u(undefined, "") },
        { json: "Name", js: "Name", typ: u(undefined, "") },
    ], "any"),
    "PreferredExtentAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "PreferredScope": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("PreferredScopeAuthorityCode")) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
    ], "any"),
    "PreferredScopeAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "Projection": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("ProjectionOperationAuthorityCode")) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
    ], "any"),
    "ProjectionOperationAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "SourceCRS": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("SourceCRSAuthorityCode")) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "SourceCRSID", js: "SourceCRSID", typ: u(undefined, "") },
    ], "any"),
    "SourceCRSAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "TargetCRS": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("TargetCRSAuthorityCode")) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "TargetCRSID", js: "TargetCRSID", typ: u(undefined, "") },
    ], "any"),
    "TargetCRSAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "BoundTransformation": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("TransformationAuthorityCode")) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "TransformationID", js: "TransformationID", typ: u(undefined, "") },
    ], "any"),
    "TransformationAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "Usage": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("UsageAuthorityCode")) },
        { json: "Extent", js: "Extent", typ: u(undefined, r("Extent")) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "Scope", js: "Scope", typ: u(undefined, r("Scope")) },
    ], "any"),
    "UsageAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "Extent": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("ExtentAuthorityCode")) },
        { json: "BoundingBoxEastBoundLongitude", js: "BoundingBoxEastBoundLongitude", typ: u(undefined, 3.14) },
        { json: "BoundingBoxNorthBoundLatitude", js: "BoundingBoxNorthBoundLatitude", typ: u(undefined, 3.14) },
        { json: "BoundingBoxSouthBoundLatitude", js: "BoundingBoxSouthBoundLatitude", typ: u(undefined, 3.14) },
        { json: "BoundingBoxWestBoundLongitude", js: "BoundingBoxWestBoundLongitude", typ: u(undefined, 3.14) },
        { json: "Description", js: "Description", typ: u(undefined, "") },
        { json: "Name", js: "Name", typ: u(undefined, "") },
    ], "any"),
    "ExtentAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "Scope": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("ScopeAuthorityCode")) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
    ], "any"),
    "ScopeAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
    ], "any"),
    "VerticalCRS": o([
        { json: "AuthorityCode", js: "AuthorityCode", typ: u(undefined, r("VerticalCRSAuthorityCode")) },
        { json: "Name", js: "Name", typ: u(undefined, "") },
        { json: "VerticalCRSID", js: "VerticalCRSID", typ: u(undefined, "") },
    ], "any"),
    "VerticalCRSAuthorityCode": o([
        { json: "Authority", js: "Authority", typ: u(undefined, "") },
        { json: "Code", js: "Code", typ: u(undefined, 0) },
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
        { json: "type", js: "type", typ: r("FeatureType") },
    ], "any"),
    "GeoJSON": o([
        { json: "bbox", js: "bbox", typ: u(undefined, a(3.14)) },
        { json: "coordinates", js: "coordinates", typ: u(undefined, a(u(a(u(a(u(a(3.14), 3.14)), 3.14)), 3.14))) },
        { json: "type", js: "type", typ: r("GeoJSONPointType") },
        { json: "geometries", js: "geometries", typ: u(undefined, a(r("GeometryElement"))) },
    ], "any"),
    "GeometryElement": o([
        { json: "bbox", js: "bbox", typ: u(undefined, a(3.14)) },
        { json: "coordinates", js: "coordinates", typ: a(u(a(u(a(u(a(3.14), 3.14)), 3.14)), 3.14)) },
        { json: "type", js: "type", typ: r("GeometryType") },
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
    "CRSType": [
        "BoundCRS",
        "CompoundCRS",
        "DerivedCRS",
        "EngineeringCRS",
        "GeodeticCRS",
        "ProjectedCRS",
        "VerticalCRS",
    ],
    "GeometryType": [
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
    "FeatureType": [
        "Feature",
    ],
    "Wgs84CoordinatesType": [
        "FeatureCollection",
    ],
};
