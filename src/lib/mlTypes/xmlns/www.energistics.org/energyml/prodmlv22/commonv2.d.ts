import * as Primitive from "../../../xml-primitives";

// Source files:
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/Abstract.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/Activities.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/Aggregate.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/Attachment.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/BaseTypes.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/BusinessAssociate.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/CRS.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/Collection.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/ColumnBasedTable.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/CommonEnumerations.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/CommonTypes.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/DataAssurance.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/Datum.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/EmlAllObjects.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/GraphicalInformation.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/LegacyUnitsOfMeasure.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/MeasureType.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/OSDUIntegration.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/ObjectReference.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/QuantityClass.xsd
// http://172.21.32.1:3000/common/v2.3/xsd_schemas/ValueTypes.xsd

interface BaseType {
  _exists: boolean;
  _namespace: string;
  $type?: string;
}
interface _AbsolutePressure extends _AbstractPressureValue {
  AbsolutePressure: PressureMeasureExt;
}
export interface AbsolutePressure extends _AbsolutePressure {}

interface _AbsolutePressureInterval extends _AbstractPressureInterval {
  MaxPressure: AbsolutePressure;
  MinPressure: AbsolutePressure;
}
export interface AbsolutePressureInterval extends _AbsolutePressureInterval {}

interface _AbsorbedDoseMeasure extends _AbstractMeasure {
  uom: AbsorbedDoseUom;
}
export interface AbsorbedDoseMeasure extends _AbsorbedDoseMeasure {}

interface _AbsorbedDoseMeasureExt extends _AbstractMeasure {
  uom: AbsorbedDoseUomExt;
}
export interface AbsorbedDoseMeasureExt extends _AbsorbedDoseMeasureExt {}

export type AbsorbedDoseUom =
  | "cGy"
  | "crd"
  | "dGy"
  | "drd"
  | "EGy"
  | "Erd"
  | "fGy"
  | "frd"
  | "GGy"
  | "Grd"
  | "Gy"
  | "kGy"
  | "krd"
  | "mGy"
  | "MGy"
  | "Mrd"
  | "mrd"
  | "nGy"
  | "nrd"
  | "pGy"
  | "prd"
  | "rd"
  | "TGy"
  | "Trd"
  | "uGy"
  | "urd";
interface _AbsorbedDoseUom extends _UomEnum {
  _: AbsorbedDoseUom;
}

export type AbsorbedDoseUomExt = string;
type _AbsorbedDoseUomExt = Primitive._string;

interface _Abstract2dCrs extends _AbstractObject {}
export interface Abstract2dCrs extends _Abstract2dCrs {}

interface _Abstract2dPosition extends _AbstractPosition {}
export interface Abstract2dPosition extends _Abstract2dPosition {}

interface _Abstract3dPosition extends _AbstractPosition {}
export interface Abstract3dPosition extends _Abstract3dPosition {}

interface _AbstractActiveObject extends _AbstractObject {
  /** Describes the active status of the object, whether active or inactive.
   *
   * STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  ActiveStatus: ActiveStatusKind;
}
export interface AbstractActiveObject extends _AbstractActiveObject {}

/** General parameter value used in one instance of activity */
interface _AbstractActivityParameter extends BaseType {
  /** When parameter is an array, used to indicate the index in the array */
  Index?: number;
  /** Used to indicate that a parameter is not necessarily deterministic but can be replaced by a stochastic method to generate a value. */
  IsUncertain: boolean;
  Key?: AbstractParameterKey[];
  /** Textual description about how this parameter was selected. */
  Selection?: String2000;
  /** Name of the parameter, used to identify it in the activity. Must have an equivalent in the activity descriptor parameters. */
  Title: String2000;
}
export interface AbstractActivityParameter extends _AbstractActivityParameter {}

/** Generic representation of an array of Boolean values. Each derived element provides a specialized implementation to allow specific optimization of the representation. */
interface _AbstractBooleanArray extends _AbstractValueArray {
  Statistics?: BooleanArrayStatistics[];
}
export interface AbstractBooleanArray extends _AbstractBooleanArray {}

/** A 2D position given relative to either a projected or local engineering CRS.
 *
 * The meanings of the two coordinates and their units of measure are carried in the referenced CRS definition. */
interface _AbstractCartesian2dPosition extends _Abstract2dPosition {
  Coordinate1: number;
  Coordinate2: number;
}
export interface AbstractCartesian2dPosition
  extends _AbstractCartesian2dPosition {}

interface _AbstractCompoundCrs extends _AbstractObject {
  VerticalCrs: DataObjectReference;
}
export interface AbstractCompoundCrs extends _AbstractCompoundCrs {}

interface _AbstractCompoundPosition extends _AbstractPosition {}
export interface AbstractCompoundPosition extends _AbstractCompoundPosition {}

interface _AbstractContextualObjectProxyType extends BaseType {}
interface AbstractContextualObjectProxyType
  extends _AbstractContextualObjectProxyType {}

interface _AbstractDataObjectProxyType extends BaseType {
  Activity?: Activity;
  ActivityTemplate?: ActivityTemplate;
  Aggregate?: Aggregate;
  Attachment?: Attachment;
  BusinessAssociate?: BusinessAssociate;
  CollectionsToDataobjectsAssociationSet?: CollectionsToDataobjectsAssociationSet;
  ColumnBasedTable?: ColumnBasedTable;
  DataAssuranceRecord?: DataAssuranceRecord;
  DataobjectCollection?: DataobjectCollection;
  Geographic2dCrs?: Geographic2dCrs;
  GraphicalInformationSet?: GraphicalInformationSet;
  LocalEngineering2dCrs?: LocalEngineering2dCrs;
  LocalEngineeringCompoundCrs?: LocalEngineeringCompoundCrs;
  ProjectedCrs?: ProjectedCrs;
  PropertyKind?: PropertyKind;
  PropertyKindDictionary?: PropertyKindDictionary;
  RecursiveReferencePoint?: RecursiveReferencePoint;
  ReferencePointInACrs?: ReferencePointInACrs;
  ReferencePointInALocalEngineeringCompoundCrs?: ReferencePointInALocalEngineeringCompoundCrs;
  ReferencePointInAWellbore?: ReferencePointInAWellbore;
  TimeSeries?: TimeSeries;
  VerticalCrs?: VerticalCrs;
}
interface AbstractDataObjectProxyType extends _AbstractDataObjectProxyType {}

interface _AbstractElevation extends BaseType {
  Elevation: LengthMeasureExt;
}
export interface AbstractElevation extends _AbstractElevation {}

/** Generic representation of an array of double values. Each derived element provides specialized implementation to allow specific optimization of the representation. */
interface _AbstractFloatingPointArray extends _AbstractNumericArray {
  Statistics?: FloatingPointArrayStatistics[];
}
export interface AbstractFloatingPointArray
  extends _AbstractFloatingPointArray {}

interface _AbstractGeographic2dCrs extends BaseType {}
export interface AbstractGeographic2dCrs extends _AbstractGeographic2dCrs {}

interface _AbstractGraphicalInformation extends BaseType {
  TargetObject: DataObjectReference[];
}
export interface AbstractGraphicalInformation
  extends _AbstractGraphicalInformation {}

interface _AbstractGrowingObject extends _AbstractActiveObject {
  /** Information about the growing object's index. */
  Index: GrowingObjectIndex;
}
export interface AbstractGrowingObject extends _AbstractGrowingObject {}

interface _AbstractGrowingObjectPart extends BaseType {
  objectVersion?: String64;
  /** Unique identifier for this instance of a growing part. */
  uid: String64;
  /** Date and time the document was created in the source application or, if that information is not available, when it was saved to the file.
   *
   * This is the equivalent of the ISO 19115 CI_Date where the CI_DateTypeCode = ”creation"
   *
   * Format:
   * YYYY-MM-DDThh:mm:ssZ[+/-]hh:mm
   *
   * Legacy DCGroup - created */
  Creation: TimeStamp;
  ExtensionNameValue?: ExtensionNameValue;
  /** An ISO 19115 EIP-derived set of metadata attached to all specializations of AbstractObject to ensure the traceability of each individual independent (top level) element. */
  LastUpdate: TimeStamp;
}
export interface AbstractGrowingObjectPart extends _AbstractGrowingObjectPart {}

interface _AbstractHorizontalCoordinates extends BaseType {
  Coordinate1: number;
  Coordinate2: number;
}
export interface AbstractHorizontalCoordinates
  extends _AbstractHorizontalCoordinates {}

/** Generic representation of an array of integer values. Each derived element provides specialized implementation to allow specific optimization of the representation. */
interface _AbstractIntegerArray extends _AbstractNumericArray {
  Statistics?: IntegerArrayStatistics[];
}
export interface AbstractIntegerArray extends _AbstractIntegerArray {}

/** Generic representation of a value interval. */
interface _AbstractInterval extends BaseType {
  /** A descriptive remark about the interval. */
  Comment?: String2000;
}
export interface AbstractInterval extends _AbstractInterval {}

/** A growing object where the parts are of type eml:AbstractMdGrowingPart or eml:AbstractMdIntervalGrowingPart. */
interface _AbstractMdGrowingObject extends _AbstractGrowingObject {
  /** The measured depth interval for the parts in this growing object. MdTop MUST equal the minimum measured depth of any part (interval). MdBase MUST equal the maximum measured depth of any part (interval). In an ETP store, the interval values are managed by the store. This MUST be specified when there are parts in the object, and it MUST NOT be specified when there are no parts in the object. */
  MdInterval?: MdInterval;
}
export interface AbstractMdGrowingObject extends _AbstractMdGrowingObject {}

interface _AbstractMdGrowingPart extends _AbstractGrowingObjectPart {
  /** The measured depth of this object growing part.
   *
   * STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  Md: MeasuredDepth;
}
export interface AbstractMdGrowingPart extends _AbstractMdGrowingPart {}

interface _AbstractMdIntervalGrowingPart extends _AbstractGrowingObjectPart {
  /** The measured depth interval which contains this object growing part.
   *
   * STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  MdInterval: MdInterval;
}
export interface AbstractMdIntervalGrowingPart
  extends _AbstractMdIntervalGrowingPart {}

/** The intended abstract supertype of all quantities that have a value with a unit of measure. The unit of measure is in the uom attribute of the subtypes.
 *
 * This type allows all quantities to be profiled to be a 'float' instead of a 'double'. */
export type AbstractMeasure = number;
type _AbstractMeasure = Primitive._number;

interface _AbstractNumericArray extends _AbstractValueArray {}
export interface AbstractNumericArray extends _AbstractNumericArray {}

/** The parent class for all top-level elements across the Energistics MLs. */
interface _AbstractObject extends BaseType {
  objectVersion?: String64;
  /** The version of the Energistics schema used for a data object. The schema version is the first 2 digits of an ML version. EXAMPLES:
   * - For WITSML v2.0 the schema version is 20
   * - For RESQML v2.0.1 the schema version is 20 */
  schemaVersion: String64;
  /** A universally unique identifier (UUID) as defined by RFC 4122. For rules and guidelines about the format of UUIDs with the current version of Energistics standards, see the Energistics Identifier Specification v5.0.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  uuid: UuidString;
  Aliases?: ObjectAlias[];
  /** Business processes/workflows that the data object has been through (ex. well planning, exploration). */
  BusinessActivityHistory?: String64[];
  /** Use the citation data element to optionally add simple authorship metadata to any Energistics object. The citation data object uses attributes like title, originator, editor, last update, etc. from the Energy Industry Profile of ISO 19115-1 (EIP). */
  Citation: Citation;
  CustomData?: CustomData;
  /** A lifecycle state like actual, required, planned, predicted, etc. This is used to qualify any top-level element (from Epicentre 2.1). */
  Existence?: ExistenceKindExt;
  ExtensionNameValue?: ExtensionNameValue[];
  /** An optiona, human-readable reason why this version of the object was created. */
  ObjectVersionReason?: String2000;
  OSDUIntegration?: OSDUIntegration;
}
export interface AbstractObject extends _AbstractObject {}

/** Abstract class describing a key used to identify a parameter value. When multiple values are provided for a given parameter, provides a way to identify the parameter through its association with an object, a time index, etc. */
interface _AbstractParameterKey extends BaseType {}
export interface AbstractParameterKey extends _AbstractParameterKey {}

interface _AbstractPosition extends BaseType {}
export interface AbstractPosition extends _AbstractPosition {}

interface _AbstractPressureInterval extends _AbstractInterval {}
export interface AbstractPressureInterval extends _AbstractPressureInterval {}

interface _AbstractPressureValue extends BaseType {}
export interface AbstractPressureValue extends _AbstractPressureValue {}

interface _AbstractProjectedCrs extends BaseType {}
export interface AbstractProjectedCrs extends _AbstractProjectedCrs {}

/** A reference point is used as a new origin for some coordinates.
 *
 * It is not a CRS. Indeed, it does not redefine axis, uom, etc... it just defines the origin of some axis. */
interface _AbstractReferencePoint extends _AbstractObject {
  Kind?: ReferencePointKindExt;
  OSDUReferencePointIntegration?: OSDUReferencePointIntegration;
  UncertaintyVectorAtOneSigma?: Vector;
}
export interface AbstractReferencePoint extends _AbstractReferencePoint {}

/** The intended abstract supertype of all strings. This abstract type allows the control over whitespace for all strings to be defined at a high level. This type should not be used directly except to derive another type. */
export type AbstractString = string;
type _AbstractString = Primitive._string;

interface _AbstractStringArray extends _AbstractValueArray {
  Statistics?: StringArrayStatistics[];
}
export interface AbstractStringArray extends _AbstractStringArray {}

/** The Abstract base type of standard pressure and temperature */
interface _AbstractTemperaturePressure extends BaseType {}
export interface AbstractTemperaturePressure
  extends _AbstractTemperaturePressure {}

/** A growing object where the parts are of type eml:AbstractTimeGrowingPart or eml:AbstractTimeIntervalGrowingPart. */
interface _AbstractTimeGrowingObject extends _AbstractGrowingObject {
  /** The time interval for the parts in this growing object. StartTime MUST equal the minimum time of any part (interval). EndTime MUST equal the maximum time of any part (interval). In an ETP store, the interval values are managed by the store. This MUST be specified when there are parts in the object, and it MUST NOT be specified when there are no parts in the object. */
  TimeInterval?: DateTimeInterval;
}
export interface AbstractTimeGrowingObject extends _AbstractTimeGrowingObject {}

interface _AbstractTimeGrowingPart extends _AbstractGrowingObjectPart {
  /** STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  Time: TimeStamp;
}
export interface AbstractTimeGrowingPart extends _AbstractTimeGrowingPart {}

interface _AbstractTimeIntervalGrowingPart extends _AbstractGrowingObjectPart {
  /** STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  TimeInterval: DateTimeInterval;
}
export interface AbstractTimeIntervalGrowingPart
  extends _AbstractTimeIntervalGrowingPart {}

interface _AbstractTvdInterval extends _AbstractInterval {
  Trajectory?: DataObjectReference;
  /** The maximum true vertical depth value. */
  TvdMax: number;
  /** The minimum true vertical depth value. */
  TvdMin: number;
  Uom: LengthUomExt;
}
export interface AbstractTvdInterval extends _AbstractTvdInterval {}

/** Generic representation of an array of numeric, Boolean, and string values. Each derived element provides specialized implementation for specific content types or for optimization of the representation. */
interface _AbstractValueArray extends BaseType {}
export interface AbstractValueArray extends _AbstractValueArray {}

interface _AbstractVerticalCrs extends BaseType {}
export interface AbstractVerticalCrs extends _AbstractVerticalCrs {}

/** A vertical (gravity-based) depth coordinate within the context of a well. Positive moving downward from the reference datum. All coordinates with the same datum (and same UOM) can be considered to be in the same coordinate reference system (CRS) and are thus directly comparable. */
interface _AbstractVerticalDepth extends BaseType {
  Trajectory?: DataObjectReference;
  VerticalDepth: LengthMeasureExt;
}
export interface AbstractVerticalDepth extends _AbstractVerticalDepth {}

/** Specifies the active status of the object: active or inactive. */
export type ActiveStatusKind = "active" | "inactive";
interface _ActiveStatusKind extends _TypeEnum {
  _: ActiveStatusKind;
}

/** Instance of a given activity */
interface _Activity extends _AbstractObject {
  ActivityDescriptor: DataObjectReference;
  Parameter: AbstractActivityParameter[];
  Parent?: DataObjectReference;
}
export interface Activity extends _Activity {}

interface _ActivityOfRadioactivityMeasure extends _AbstractMeasure {
  uom: ActivityOfRadioactivityUom;
}
export interface ActivityOfRadioactivityMeasure
  extends _ActivityOfRadioactivityMeasure {}

interface _ActivityOfRadioactivityMeasureExt extends _AbstractMeasure {
  uom: ActivityOfRadioactivityUomExt;
}
export interface ActivityOfRadioactivityMeasureExt
  extends _ActivityOfRadioactivityMeasureExt {}

interface _ActivityOfRadioactivityPerVolumeMeasure extends _AbstractMeasure {
  uom?: ActivityOfRadioactivityPerVolumeUom;
}
export interface ActivityOfRadioactivityPerVolumeMeasure
  extends _ActivityOfRadioactivityPerVolumeMeasure {}

interface _ActivityOfRadioactivityPerVolumeMeasureExt extends _AbstractMeasure {
  uom?: ActivityOfRadioactivityPerVolumeUomExt;
}
export interface ActivityOfRadioactivityPerVolumeMeasureExt
  extends _ActivityOfRadioactivityPerVolumeMeasureExt {}

export type ActivityOfRadioactivityPerVolumeUom = "Bq/m3";
interface _ActivityOfRadioactivityPerVolumeUom extends _UomEnum {
  _: ActivityOfRadioactivityPerVolumeUom;
}

export type ActivityOfRadioactivityPerVolumeUomExt = string;
type _ActivityOfRadioactivityPerVolumeUomExt = Primitive._string;

export type ActivityOfRadioactivityUom =
  | "Bq"
  | "Ci"
  | "GBq"
  | "MBq"
  | "mCi"
  | "nCi"
  | "pCi"
  | "TBq"
  | "uCi";
interface _ActivityOfRadioactivityUom extends _UomEnum {
  _: ActivityOfRadioactivityUom;
}

export type ActivityOfRadioactivityUomExt = string;
type _ActivityOfRadioactivityUomExt = Primitive._string;

export type ActivityParameterKind =
  | "dataObject"
  | "double"
  | "integer"
  | "string"
  | "timestamp"
  | "subActivity";
interface _ActivityParameterKind extends _TypeEnum {
  _: ActivityParameterKind;
}

/** Description of one type of activity. */
interface _ActivityTemplate extends _AbstractObject {
  Parameter: ParameterTemplate[];
}
export interface ActivityTemplate extends _ActivityTemplate {}

/** Specifies the kinds of company addresses. */
export type AddressKindEnum = "both" | "mailing" | "physical";
interface _AddressKindEnum extends _TypeEnum {
  _: AddressKindEnum;
}

/** Specifies qualifiers that can be used for addresses or phone numbers. */
export type AddressQualifier = "permanent" | "personal" | "work";
interface _AddressQualifier extends _TypeEnum {
  _: AddressQualifier;
}

/** An Energistics data object that is an aggregate of other data objects. Use Case: You want to email someone several different Energistics data objects (which are each separate XML files) from one or more of the Energistics domain standards. You can group those data objects together using Aggregate.
 * This object is NOT INTENDED for use within an ML (e.g. a WITSML) data store, even though it is  constructed similarly to the standard data object pattern. The anticipated normal usage is for collecting an aggregate of object messages for transport outside the context of an ML store.
 * This data object was first developed by WITSML but has been "promoted" to Energistics  common for use by any of the Energistics domain standards. */
interface _Aggregate extends _AbstractObject {
  AggregateMember: AbstractObject[];
}
export interface Aggregate extends _Aggregate {}

export type AliasIdentifierKind =
  | "abbreviation"
  | "acronym"
  | "common name"
  | "industry code"
  | "industry name"
  | "lease identifier"
  | "local language name"
  | "preferred name"
  | "project number"
  | "regulatory identifier"
  | "regulatory name"
  | "short name"
  | "subscription well name"
  | "unique identifier"
  | "wellbore number";
interface _AliasIdentifierKind extends _TypeEnum {
  _: AliasIdentifierKind;
}

export type AliasIdentifierKindExt = string;
type _AliasIdentifierKindExt = Primitive._string;

interface _AmountOfSubstanceMeasure extends _AbstractMeasure {
  uom: AmountOfSubstanceUom;
}
export interface AmountOfSubstanceMeasure extends _AmountOfSubstanceMeasure {}

interface _AmountOfSubstanceMeasureExt extends _AbstractMeasure {
  uom: AmountOfSubstanceUomExt;
}
export interface AmountOfSubstanceMeasureExt
  extends _AmountOfSubstanceMeasureExt {}

interface _AmountOfSubstancePerAmountOfSubstanceMeasure
  extends _AbstractMeasure {
  uom: AmountOfSubstancePerAmountOfSubstanceUom;
}
export interface AmountOfSubstancePerAmountOfSubstanceMeasure
  extends _AmountOfSubstancePerAmountOfSubstanceMeasure {}

interface _AmountOfSubstancePerAmountOfSubstanceMeasureExt
  extends _AbstractMeasure {
  uom: AmountOfSubstancePerAmountOfSubstanceUomExt;
}
export interface AmountOfSubstancePerAmountOfSubstanceMeasureExt
  extends _AmountOfSubstancePerAmountOfSubstanceMeasureExt {}

export type AmountOfSubstancePerAmountOfSubstanceUom =
  | "%"
  | "%[molar]"
  | "Euc"
  | "mol/mol"
  | "nEuc"
  | "ppk"
  | "ppm";
interface _AmountOfSubstancePerAmountOfSubstanceUom extends _UomEnum {
  _: AmountOfSubstancePerAmountOfSubstanceUom;
}

export type AmountOfSubstancePerAmountOfSubstanceUomExt = string;
type _AmountOfSubstancePerAmountOfSubstanceUomExt = Primitive._string;

interface _AmountOfSubstancePerAreaMeasure extends _AbstractMeasure {
  uom: AmountOfSubstancePerAreaUom;
}
export interface AmountOfSubstancePerAreaMeasure
  extends _AmountOfSubstancePerAreaMeasure {}

interface _AmountOfSubstancePerAreaMeasureExt extends _AbstractMeasure {
  uom: AmountOfSubstancePerAreaUomExt;
}
export interface AmountOfSubstancePerAreaMeasureExt
  extends _AmountOfSubstancePerAreaMeasureExt {}

export type AmountOfSubstancePerAreaUom = "mol/m2";
interface _AmountOfSubstancePerAreaUom extends _UomEnum {
  _: AmountOfSubstancePerAreaUom;
}

export type AmountOfSubstancePerAreaUomExt = string;
type _AmountOfSubstancePerAreaUomExt = Primitive._string;

interface _AmountOfSubstancePerTimeMeasure extends _AbstractMeasure {
  uom: AmountOfSubstancePerTimeUom;
}
export interface AmountOfSubstancePerTimeMeasure
  extends _AmountOfSubstancePerTimeMeasure {}

interface _AmountOfSubstancePerTimeMeasureExt extends _AbstractMeasure {
  uom: AmountOfSubstancePerTimeUomExt;
}
export interface AmountOfSubstancePerTimeMeasureExt
  extends _AmountOfSubstancePerTimeMeasureExt {}

interface _AmountOfSubstancePerTimePerAreaMeasure extends _AbstractMeasure {
  uom: AmountOfSubstancePerTimePerAreaUom;
}
export interface AmountOfSubstancePerTimePerAreaMeasure
  extends _AmountOfSubstancePerTimePerAreaMeasure {}

interface _AmountOfSubstancePerTimePerAreaMeasureExt extends _AbstractMeasure {
  uom: AmountOfSubstancePerTimePerAreaUomExt;
}
export interface AmountOfSubstancePerTimePerAreaMeasureExt
  extends _AmountOfSubstancePerTimePerAreaMeasureExt {}

export type AmountOfSubstancePerTimePerAreaUom =
  | "lbmol/(h.ft2)"
  | "lbmol/(s.ft2)"
  | "mol/(s.m2)";
interface _AmountOfSubstancePerTimePerAreaUom extends _UomEnum {
  _: AmountOfSubstancePerTimePerAreaUom;
}

export type AmountOfSubstancePerTimePerAreaUomExt = string;
type _AmountOfSubstancePerTimePerAreaUomExt = Primitive._string;

export type AmountOfSubstancePerTimeUom =
  | "kat"
  | "kmol/h"
  | "kmol/s"
  | "lbmol/h"
  | "lbmol/s"
  | "mol/s";
interface _AmountOfSubstancePerTimeUom extends _UomEnum {
  _: AmountOfSubstancePerTimeUom;
}

export type AmountOfSubstancePerTimeUomExt = string;
type _AmountOfSubstancePerTimeUomExt = Primitive._string;

interface _AmountOfSubstancePerVolumeMeasure extends _AbstractMeasure {
  uom: AmountOfSubstancePerVolumeUom;
}
export interface AmountOfSubstancePerVolumeMeasure
  extends _AmountOfSubstancePerVolumeMeasure {}

interface _AmountOfSubstancePerVolumeMeasureExt extends _AbstractMeasure {
  uom: AmountOfSubstancePerVolumeUomExt;
}
export interface AmountOfSubstancePerVolumeMeasureExt
  extends _AmountOfSubstancePerVolumeMeasureExt {}

export type AmountOfSubstancePerVolumeUom =
  | "kmol/m3"
  | "lbmol/ft3"
  | "lbmol/gal[UK]"
  | "lbmol/gal[US]"
  | "mol/m3";
interface _AmountOfSubstancePerVolumeUom extends _UomEnum {
  _: AmountOfSubstancePerVolumeUom;
}

export type AmountOfSubstancePerVolumeUomExt = string;
type _AmountOfSubstancePerVolumeUomExt = Primitive._string;

export type AmountOfSubstanceUom = "kmol" | "lbmol" | "mmol" | "mol" | "umol";
interface _AmountOfSubstanceUom extends _UomEnum {
  _: AmountOfSubstanceUom;
}

export type AmountOfSubstanceUomExt = string;
type _AmountOfSubstanceUomExt = Primitive._string;

interface _AnglePerLengthMeasure extends _AbstractMeasure {
  uom: AnglePerLengthUom;
}
export interface AnglePerLengthMeasure extends _AnglePerLengthMeasure {}

interface _AnglePerLengthMeasureExt extends _AbstractMeasure {
  uom: AnglePerLengthUomExt;
}
export interface AnglePerLengthMeasureExt extends _AnglePerLengthMeasureExt {}

export type AnglePerLengthUom =
  | "0.01 dega/ft"
  | "1/30 dega/ft"
  | "1/30 dega/m"
  | "dega/ft"
  | "dega/m"
  | "rad/ft"
  | "rad/m"
  | "rev/ft"
  | "rev/m";
interface _AnglePerLengthUom extends _UomEnum {
  _: AnglePerLengthUom;
}

export type AnglePerLengthUomExt = string;
type _AnglePerLengthUomExt = Primitive._string;

interface _AnglePerVolumeMeasure extends _AbstractMeasure {
  uom: AnglePerVolumeUom;
}
export interface AnglePerVolumeMeasure extends _AnglePerVolumeMeasure {}

interface _AnglePerVolumeMeasureExt extends _AbstractMeasure {
  uom: AnglePerVolumeUomExt;
}
export interface AnglePerVolumeMeasureExt extends _AnglePerVolumeMeasureExt {}

export type AnglePerVolumeUom = "rad/ft3" | "rad/m3";
interface _AnglePerVolumeUom extends _UomEnum {
  _: AnglePerVolumeUom;
}

export type AnglePerVolumeUomExt = string;
type _AnglePerVolumeUomExt = Primitive._string;

interface _AngularAccelerationMeasure extends _AbstractMeasure {
  uom: AngularAccelerationUom;
}
export interface AngularAccelerationMeasure
  extends _AngularAccelerationMeasure {}

interface _AngularAccelerationMeasureExt extends _AbstractMeasure {
  uom: AngularAccelerationUomExt;
}
export interface AngularAccelerationMeasureExt
  extends _AngularAccelerationMeasureExt {}

export type AngularAccelerationUom = "rad/s2" | "rpm/s";
interface _AngularAccelerationUom extends _UomEnum {
  _: AngularAccelerationUom;
}

export type AngularAccelerationUomExt = string;
type _AngularAccelerationUomExt = Primitive._string;

interface _AngularVelocityMeasure extends _AbstractMeasure {
  uom: AngularVelocityUom;
}
export interface AngularVelocityMeasure extends _AngularVelocityMeasure {}

interface _AngularVelocityMeasureExt extends _AbstractMeasure {
  uom: AngularVelocityUomExt;
}
export interface AngularVelocityMeasureExt extends _AngularVelocityMeasureExt {}

export type AngularVelocityUom =
  | "dega/h"
  | "dega/min"
  | "dega/s"
  | "rad/s"
  | "rev/s"
  | "rpm";
interface _AngularVelocityUom extends _UomEnum {
  _: AngularVelocityUom;
}

export type AngularVelocityUomExt = string;
type _AngularVelocityUomExt = Primitive._string;

interface _APIGammaRayMeasure extends _AbstractMeasure {
  uom: APIGammaRayUom;
}
export interface APIGammaRayMeasure extends _APIGammaRayMeasure {}

interface _APIGammaRayMeasureExt extends _AbstractMeasure {
  uom: APIGammaRayUomExt;
}
export interface APIGammaRayMeasureExt extends _APIGammaRayMeasureExt {}

export type APIGammaRayUom = "gAPI";
interface _APIGammaRayUom extends _UomEnum {
  _: APIGammaRayUom;
}

export type APIGammaRayUomExt = string;
type _APIGammaRayUomExt = Primitive._string;

interface _APIGravityMeasure extends _AbstractMeasure {
  uom: APIGravityUom;
}
export interface APIGravityMeasure extends _APIGravityMeasure {}

interface _APIGravityMeasureExt extends _AbstractMeasure {
  uom: APIGravityUomExt;
}
export interface APIGravityMeasureExt extends _APIGravityMeasureExt {}

export type APIGravityUom = "dAPI";
interface _APIGravityUom extends _UomEnum {
  _: APIGravityUom;
}

export type APIGravityUomExt = string;
type _APIGravityUomExt = Primitive._string;

interface _APINeutronMeasure extends _AbstractMeasure {
  uom: APINeutronUom;
}
export interface APINeutronMeasure extends _APINeutronMeasure {}

interface _APINeutronMeasureExt extends _AbstractMeasure {
  uom: APINeutronUomExt;
}
export interface APINeutronMeasureExt extends _APINeutronMeasureExt {}

export type APINeutronUom = "nAPI";
interface _APINeutronUom extends _UomEnum {
  _: APINeutronUom;
}

export type APINeutronUomExt = string;
type _APINeutronUomExt = Primitive._string;

interface _AreaMeasure extends _AbstractMeasure {
  uom: AreaUom;
}
export interface AreaMeasure extends _AreaMeasure {}

interface _AreaMeasureExt extends _AbstractMeasure {
  uom: AreaUomExt;
}
export interface AreaMeasureExt extends _AreaMeasureExt {}

interface _AreaPerAmountOfSubstanceMeasure extends _AbstractMeasure {
  uom: AreaPerAmountOfSubstanceUom;
}
export interface AreaPerAmountOfSubstanceMeasure
  extends _AreaPerAmountOfSubstanceMeasure {}

interface _AreaPerAmountOfSubstanceMeasureExt extends _AbstractMeasure {
  uom: AreaPerAmountOfSubstanceUomExt;
}
export interface AreaPerAmountOfSubstanceMeasureExt
  extends _AreaPerAmountOfSubstanceMeasureExt {}

export type AreaPerAmountOfSubstanceUom = "m2/mol";
interface _AreaPerAmountOfSubstanceUom extends _UomEnum {
  _: AreaPerAmountOfSubstanceUom;
}

export type AreaPerAmountOfSubstanceUomExt = string;
type _AreaPerAmountOfSubstanceUomExt = Primitive._string;

interface _AreaPerAreaMeasure extends _AbstractMeasure {
  uom: AreaPerAreaUom;
}
export interface AreaPerAreaMeasure extends _AreaPerAreaMeasure {}

interface _AreaPerAreaMeasureExt extends _AbstractMeasure {
  uom: AreaPerAreaUomExt;
}
export interface AreaPerAreaMeasureExt extends _AreaPerAreaMeasureExt {}

export type AreaPerAreaUom =
  | "%"
  | "%[area]"
  | "cEuc"
  | "Euc"
  | "in2/ft2"
  | "in2/in2"
  | "m2/m2"
  | "mm2/mm2";
interface _AreaPerAreaUom extends _UomEnum {
  _: AreaPerAreaUom;
}

export type AreaPerAreaUomExt = string;
type _AreaPerAreaUomExt = Primitive._string;

interface _AreaPerCountMeasure extends _AbstractMeasure {
  uom: AreaPerCountUom;
}
export interface AreaPerCountMeasure extends _AreaPerCountMeasure {}

interface _AreaPerCountMeasureExt extends _AbstractMeasure {
  uom: AreaPerCountUomExt;
}
export interface AreaPerCountMeasureExt extends _AreaPerCountMeasureExt {}

export type AreaPerCountUom = "b/electron";
interface _AreaPerCountUom extends _UomEnum {
  _: AreaPerCountUom;
}

export type AreaPerCountUomExt = string;
type _AreaPerCountUomExt = Primitive._string;

interface _AreaPerMassMeasure extends _AbstractMeasure {
  uom: AreaPerMassUom;
}
export interface AreaPerMassMeasure extends _AreaPerMassMeasure {}

interface _AreaPerMassMeasureExt extends _AbstractMeasure {
  uom: AreaPerMassUomExt;
}
export interface AreaPerMassMeasureExt extends _AreaPerMassMeasureExt {}

export type AreaPerMassUom = "cm2/g" | "ft2/lbm" | "m2/g" | "m2/kg";
interface _AreaPerMassUom extends _UomEnum {
  _: AreaPerMassUom;
}

export type AreaPerMassUomExt = string;
type _AreaPerMassUomExt = Primitive._string;

interface _AreaPerTimeMeasure extends _AbstractMeasure {
  uom: AreaPerTimeUom;
}
export interface AreaPerTimeMeasure extends _AreaPerTimeMeasure {}

interface _AreaPerTimeMeasureExt extends _AbstractMeasure {
  uom: AreaPerTimeUomExt;
}
export interface AreaPerTimeMeasureExt extends _AreaPerTimeMeasureExt {}

export type AreaPerTimeUom =
  | "cm2/s"
  | "ft2/h"
  | "ft2/s"
  | "in2/s"
  | "m2/d"
  | "m2/h"
  | "m2/s"
  | "mm2/s";
interface _AreaPerTimeUom extends _UomEnum {
  _: AreaPerTimeUom;
}

export type AreaPerTimeUomExt = string;
type _AreaPerTimeUomExt = Primitive._string;

interface _AreaPerVolumeMeasure extends _AbstractMeasure {
  uom: AreaPerVolumeUom;
}
export interface AreaPerVolumeMeasure extends _AreaPerVolumeMeasure {}

interface _AreaPerVolumeMeasureExt extends _AbstractMeasure {
  uom: AreaPerVolumeUomExt;
}
export interface AreaPerVolumeMeasureExt extends _AreaPerVolumeMeasureExt {}

export type AreaPerVolumeUom =
  | "1/m"
  | "b/cm3"
  | "cu"
  | "ft2/in3"
  | "m2/cm3"
  | "m2/m3";
interface _AreaPerVolumeUom extends _UomEnum {
  _: AreaPerVolumeUom;
}

export type AreaPerVolumeUomExt = string;
type _AreaPerVolumeUomExt = Primitive._string;

export type AreaUom =
  | "acre"
  | "b"
  | "cm2"
  | "ft2"
  | "ha"
  | "in2"
  | "km2"
  | "m2"
  | "mi[US]2"
  | "mi2"
  | "mm2"
  | "section"
  | "um2"
  | "yd2";
interface _AreaUom extends _UomEnum {
  _: AreaUom;
}

export type AreaUomExt = string;
type _AreaUomExt = Primitive._string;

/** A dedicated object used to attach digital supplemental data (for example, a graphic or PDF file) to another data object. The attachment is captured as a base 64 binary type. */
interface _Attachment extends _AbstractObject {
  /** Used to categorize the content when you have multiple attachments of the same file type. EXAMPLE: If you have attached a JPEG picture of cuttings at a specific depth, you can tag it with Category="CuttingsPicture". */
  Category?: String64;
  /** The actual content of the attachment. */
  Content: string;
  /** A URI pointing to the location of the attached content. */
  ContentUri?: string;
  /** A file name associated with the attachment content. Note this is NOT a file path and should contain a name only. */
  FileName?: String64;
  /** The content file type. This field SHOULD be a registered mime type as cataloged at http://www.iana.org/assignments/media-types/media-types.xhtml. */
  FileType?: String64;
  /** Index in an indexable element array for an attachment. */
  IndexableElementIndex?: number;
  /** The type of indexable element that the attachment is applicable to. If used, it must be one of the enumerated values in IndexableElement. */
  IndexableElementType?: IndexableElement;
  /** The along-hole measured depth within the RepresentedObject where the attachment is indexed. */
  Md?: MeasuredDepth;
  /** The along-hole measured depth of the bit. */
  MdBit?: MeasuredDepth;
  ObjectReference?: DataObjectReference;
  /** A reference to a sub-object that is defined within the context of the ReferencedObject. This should normally refer to recurring components of a growing object. The string content is the uid of the sub-object. */
  SubObjectReference?: ComponentReference;
}
export interface Attachment extends _Attachment {}

interface _AttenuationPerFrequencyIntervalMeasure extends _AbstractMeasure {
  uom: AttenuationPerFrequencyIntervalUom;
}
export interface AttenuationPerFrequencyIntervalMeasure
  extends _AttenuationPerFrequencyIntervalMeasure {}

interface _AttenuationPerFrequencyIntervalMeasureExt extends _AbstractMeasure {
  uom: AttenuationPerFrequencyIntervalUomExt;
}
export interface AttenuationPerFrequencyIntervalMeasureExt
  extends _AttenuationPerFrequencyIntervalMeasureExt {}

export type AttenuationPerFrequencyIntervalUom = "B/O" | "dB/O";
interface _AttenuationPerFrequencyIntervalUom extends _UomEnum {
  _: AttenuationPerFrequencyIntervalUom;
}

export type AttenuationPerFrequencyIntervalUomExt = string;
type _AttenuationPerFrequencyIntervalUomExt = Primitive._string;

interface _AuthorityQualifiedName extends _String64 {
  authority: String64;
  code?: String64;
}
export interface AuthorityQualifiedName extends _AuthorityQualifiedName {}

/** Direction of positive increase in the coordinate value for a coordinate system axis (from ISO 19111) */
export type AxisDirectionKind =
  | "aft"
  | "away-from"
  | "clockwise"
  | "column-negative"
  | "column-positive"
  | "counter-clockwise"
  | "display-down"
  | "display-left"
  | "display-right"
  | "display-up"
  | "down"
  | "east"
  | "east-north-east"
  | "east-south-east"
  | "forward"
  | "future"
  | "geocentric x"
  | "geocentric y"
  | "geocentric z"
  | "north"
  | "north-east"
  | "north-north-east"
  | "north-north-west"
  | "north-west"
  | "past"
  | "port"
  | "row-negative"
  | "row-positive"
  | "south"
  | "south-east"
  | "south-south-east"
  | "south-south-west"
  | "south-west"
  | "starboard"
  | "towards"
  | "up"
  | "west"
  | "west-north-west"
  | "west-south-west";
interface _AxisDirectionKind extends _TypeEnum {
  _: AxisDirectionKind;
}

/** Defines the coordinate system axis order of the global CRS using the axis names (from EPSG database). */
export type AxisOrder2d =
  | "easting northing"
  | "easting southing"
  | "southing easting"
  | "northing easting"
  | "westing southing"
  | "southing westing"
  | "northing westing"
  | "westing northing";
interface _AxisOrder2d extends _TypeEnum {
  _: AxisOrder2d;
}

/** An array of Boolean values defined by specifying explicitly which indices in the array are either true or false. This class is used to represent very sparse true or false data. */
interface _BooleanArrayFromIndexArray extends _AbstractBooleanArray {
  /** Total number of Boolean elements in the array. This number is different from the number of indices used to represent the array. */
  Count: PositiveLong;
  CountPerValue: number;
  /** Indicates whether the specified elements are true or false. */
  IndexIsTrue: boolean;
  /** Array of integer indices.
   *
   * BUSINESS RULE: Must be non-negative. */
  Indices: AbstractIntegerArray;
}
export interface BooleanArrayFromIndexArray
  extends _BooleanArrayFromIndexArray {}

interface _BooleanArrayStatistics extends BaseType {
  ModePercentage?: number;
  ValuesMode?: boolean;
}
export interface BooleanArrayStatistics extends _BooleanArrayStatistics {}

/** Represents an array of Boolean values where all values are identical. This an optimization for which an array of explicit Boolean values is not required. */
interface _BooleanConstantArray extends _AbstractBooleanArray {
  /** Size of the array. */
  Count: PositiveLong;
  /** Value inside all the elements of the array. */
  Value: boolean;
}
export interface BooleanConstantArray extends _BooleanConstantArray {}

/** Array of Boolean values provided explicitly by an HDF5 dataset.
 *
 * This text needs to be altered to say that nulls are not allowed in the underlying implementation */
interface _BooleanExternalArray extends _AbstractBooleanArray {
  CountPerValue: number;
  /** Reference to an HDF5 array of values. */
  Values: ExternalDataArray;
}
export interface BooleanExternalArray extends _BooleanExternalArray {}

interface _BooleanXmlArray extends _AbstractBooleanArray {
  CountPerValue: number;
  Values: BooleanXmlArrayList;
}
export interface BooleanXmlArray extends _BooleanXmlArray {}

export type BooleanXmlArrayList = boolean[];

/** Describes any company, person, group, consultant, etc., which is associated within a context (e.g., a well). The information contained in this module is: (1) contact information, such as address, phone numbers, email, (2) alternate name, or aliases, and (3) associations, such as the business associate that this one is associated with, or a contact who is associated with this business associate. */
interface _BusinessAssociate extends _AbstractObject {
  /** The business address. */
  Address?: GeneralAddress;
  /** A pointer to another business associate that this business associate is associated with. The most common situation is that of an employee being associated with a company. But it may also be, for example, a work group associated with a university. */
  AssociatedWith?: String64;
  /** The code used when this business associate is used as an authority attribute or extensible enumeration authority within Energistics standards. */
  AuthorityCode?: String64;
  /** A pointer to a business associate (generally a person) who serves as a contact for this business associate. */
  Contact?: String64[];
  /** The date and time when the business associate became effective (e.g., the date it was founded). */
  EffectiveDateTime?: TimeStamp;
  /** The email address may be home, office, or permanent. More than one may be given. */
  Email?: EmailQualifierStruct[];
  /** Indicates if the business associate is internal to the enterprise. */
  IsInternal?: boolean;
  /** Name of the business associate. */
  Name: String256;
  /** The kind of organizational structure the business associate fits into. Typical values include: Operating Unit, Operating sub Unit, A Business, A Department, Government Agency, etc. */
  OrganizationKind?: OrganizationKindExt;
  /** The components of a person's name. */
  PersonName?: PersonName;
  /** The count of personnel in a group. */
  PersonnelCount?: number;
  /** Various types of phone numbers may be given. They may be office or home, they may be a number for a cell phone, or for a fax, etc. Attributes of PhoneNumber declare the type of phone number that is being given. */
  PhoneNumber?: PhoneNumberStruct[];
  /** The reason the business associate was formed. */
  Purpose?: String2000;
  /** The role of the business associate within the context. For example, "driller" or "operator", "lead agency - CEQA compliance" "regulatory contact", "safety contact". A business associate generally has one role but the role may be called different things in different naming systems. */
  Role?: NameStruct[];
  /** The data and time when the business associate ceased to be effective (e.g., the date when it was acquired by another company). */
  TerminationDateTime?: TimeStamp;
}
export interface BusinessAssociate extends _BusinessAssociate {}

interface _CapacitanceMeasure extends _AbstractMeasure {
  uom: CapacitanceUom;
}
export interface CapacitanceMeasure extends _CapacitanceMeasure {}

interface _CapacitanceMeasureExt extends _AbstractMeasure {
  uom: CapacitanceUomExt;
}
export interface CapacitanceMeasureExt extends _CapacitanceMeasureExt {}

export type CapacitanceUom =
  | "cF"
  | "dF"
  | "EF"
  | "F"
  | "fF"
  | "GF"
  | "kF"
  | "mF"
  | "MF"
  | "nF"
  | "pF"
  | "TF"
  | "uF";
interface _CapacitanceUom extends _UomEnum {
  _: CapacitanceUom;
}

export type CapacitanceUomExt = string;
type _CapacitanceUomExt = Primitive._string;

interface _Cartesian2dCrs extends _Abstract2dCrs {}
export interface Cartesian2dCrs extends _Cartesian2dCrs {}

interface _CationExchangeCapacityMeasure extends _AbstractMeasure {
  uom: CationExchangeCapacityUom;
}
export interface CationExchangeCapacityMeasure
  extends _CationExchangeCapacityMeasure {}

interface _CationExchangeCapacityMeasureExt extends _AbstractMeasure {
  uom: CationExchangeCapacityUomExt;
}
export interface CationExchangeCapacityMeasureExt
  extends _CationExchangeCapacityMeasureExt {}

export type CationExchangeCapacityUom = ".01 meq/g";
interface _CationExchangeCapacityUom extends _UomEnum {
  _: CationExchangeCapacityUom;
}

export type CationExchangeCapacityUomExt = string;
type _CationExchangeCapacityUomExt = Primitive._string;

/** An ISO 19115 EIP-derived set of metadata attached to all specializations of AbstractObject to ensure the traceability of each individual independent (top level) element. */
interface _Citation extends BaseType {
  /** Date and time the document was created in the source application or, if that information is not available, when it was saved to the file.
   *
   * This is the equivalent of the ISO 19115 CI_Date where the CI_DateTypeCode = ”creation"
   *
   * Format:
   * YYYY-MM-DDThh:mm:ssZ[+/-]hh:mm
   *
   * Legacy DCGroup - created */
  Creation: TimeStamp;
  /** User descriptive comments about the object. Intended for end-user use (human readable); not necessarily meant to be used by software.
   *
   * This is the equivalent of the ISO 19115 abstract.CharacterString
   *
   * Legacy DCGroup - description */
  Description?: String2000;
  /** Key words to describe the activity, for example, history match or volumetric calculations, relevant to this object. Intended to be used in a search function by software.
   *
   * This is the equivalent in ISO 19115 of descriptiveKeywords.MD_Keywords
   *
   * Legacy DCGroup - subject */
  DescriptiveKeywords?: String2000;
  /** Name (or other human-readable identifier) of the last person who updated the object.
   *
   * This is the equivalent in ISO 19115 to the CI_Individual.name or the CI_Organization.name of the citedResponsibleParty whose role is "editor".
   *
   * Legacy DCGroup - contributor */
  Editor?: String64;
  /** The history of editors for this object. If provided, the first editor should be equivalent to Originator and the last editor should be equivalent to Editor. */
  EditorHistory?: String64[];
  /** Software or service that was used to originate the object and the file format created. Must be human and machine readable and unambiguously identify the software by including the organization name, software application name and software version. The intent is that these values should be provided by the application that creates or edits the data object and NOT a store that receives the data object. The format is as follows:
   *
   * organizationName:applicationName:applicationVersion/format
   *
   * When appropriate, these values should match those provided in ETP via the ServerCapabilities record and the RequestSession and OpenSession messages. */
  Format: String2000;
  /** Date and time the document was last modified in the source application or, if that information is not available, when it was last saved to the RESQML format file.
   *
   * This is the equivalent of the ISO 19115 CI_Date where the CI_DateTypeCode = ”lastUpdate"
   *
   * Format:
   * YYYY-MM-DDThh:mm:ssZ[+/-]hh:mm
   *
   * Legacy DCGroup - modified */
  LastUpdate?: TimeStamp;
  /** Name (or other human-readable identifier) of the person who initially originated the object or document in the source application. If that information is not available, then this is the user who created the format file. The originator remains the same as the object is subsequently edited.
   *
   * This is the equivalent in ISO 19115 to the CI_Individual.name or the CI_Organization.name of the citedResponsibleParty whose role is "originator".
   *
   * Legacy DCGroup - author */
  Originator: String64;
  /** One line description/name of the object.
   *
   * This is the equivalent in ISO 19115 of CI_Citation.title
   *
   * Legacy DCGroup - title */
  Title: String256;
}
export interface Citation extends _Citation {}

/** The list of enumerated values for a collection. */
export type CollectionKind =
  | "folder"
  | "project"
  | "realization"
  | "scenario"
  | "study";
interface _CollectionKind extends _TypeEnum {
  _: CollectionKind;
}

/** An Energistics modeling pattern that allows an implementation to extend the defined list of enumerations.
 * A writer can use this field to write a string (enumeration) that is not part of the official enumeration.
 * A reader must accept this text but is not required to understand or process it. */
export type CollectionKindExt = string;
type _CollectionKindExt = Primitive._string;

/** Allows data objects to be associated in one or more collections.
 * BUSINESS RULE : If two or more of the same data object collections are used in one CollectionsToDataobjectsAssociationSet, only one of those data object collections should be taken into account and the other ones must be ignored. */
interface _CollectionsToDataobjectsAssociationSet extends _AbstractObject {
  SingleCollectionAssociation: SingleCollectionAssociation[];
}
export interface CollectionsToDataobjectsAssociationSet
  extends _CollectionsToDataobjectsAssociationSet {}

/** Defines one column in a column-based table. */
interface _Column extends BaseType {
  Aliases?: ObjectAlias[];
  /** A free text description for this column. */
  Description?: String2000;
  Facet?: PropertyKindFacet[];
  PropertyKind: DataObjectReference;
  /** The title of the column. It is optional because the property kind already provides information about the content in a column. */
  Title?: String64;
  /** If present, this value overrides the default UOM of the associated property kind. */
  Uom?: UnitOfMeasureExt;
  /** The count of values in each row of this column.
   * If this value is greater than 1, then the fastest dimension of the column Values array must be this value.
   * EXAMPLE: If this value is 3 for a column of 10 rows, then the corresponding array would be [10, 3] (C array notation where 3 is fastest and 10 slowest). */
  ValueCountPerRow: PositiveLong;
  Values: AbstractValueArray;
}
export interface Column extends _Column {}

/** A column-based table allows the exchange of tables, where the values are arranged against columns that are defined by PropertyKind, UOM and Facet.
 * EXAMPLES: KrPc table and facies tables. */
interface _ColumnBasedTable extends _AbstractObject {
  Column: Column[];
  KeyColumn?: Column[];
}
export interface ColumnBasedTable extends _ColumnBasedTable {}

/** A pointer to a component within the same Energistics data object or within a data object pointed to by a separate data object reference. */
interface _ComponentReference extends BaseType {
  /** The optional numerical (i.e., NOT time or depth) index of the referenced component. */
  Index?: number;
  /** The optional name of the referenced component. */
  Name?: String2000;
  /** The qualified type of the referenced component. */
  QualifiedType: QualifiedType;
  /** The UID of the referenced component. */
  Uid: String64;
}
export interface ComponentReference extends _ComponentReference {}

/** The price of an item, with a currency indication. */
interface _Cost extends _AbstractMeasure {
  /** Currency used for this Cost. Use of ISO 4217 alphabetic codes for transfers would be a best practice. */
  currency: String64;
}
export interface Cost extends _Cost {}

/** WITSML - Custom or User Defined Element and Attributes Component Schema.
 * Specify custom element, attributes, and types in the custom data area. */
interface _CustomData extends BaseType {}
export interface CustomData extends _CustomData {}

/** A little XML document describing whether or not a particular data object conforms with a pre-defined policy which consists of at least one rule. */
interface _DataAssuranceRecord extends _AbstractObject {
  Comment?: String2000;
  /** Yes/no flag indicating whether this particular data ???? conforms with the policy or not. */
  Conformance: boolean;
  /** Date the policy was last checked. This is the date for which the Conformance value is valid. */
  Date: TimeStamp;
  FailingRules?: FailingRule[];
  IndexRange?: IndexRange;
  /** Agent which checked the data for conformance with the policy. This could be a person or an automated computer process or any number of other things. */
  Origin: String2000;
  /** Identifier of the policy whose conformance is being described. */
  PolicyId: String64;
  /** Human-readable name of the policy */
  PolicyName?: String2000;
  /** If the Policy applies to a single occurrence of a component within the referenced data object this attribute holds its uid. */
  ReferencedComponent?: ComponentReference;
  ReferencedData: DataObjectReference;
  /** If the Policy applies to a single element within the referenced data object this attribute holds its element name. */
  ReferencedElementName?: String64;
}
export interface DataAssuranceRecord extends _DataAssuranceRecord {}

/** Specifies the kind of value used to index data. */
export type DataIndexKind =
  | "measured depth"
  | "true vertical depth"
  | "pass indexed depth"
  | "date time"
  | "elapsed time"
  | "temperature"
  | "pressure"
  | "scalar";
interface _DataIndexKind extends _TypeEnum {
  _: DataIndexKind;
}

/** Allows multiple data objects to be grouped together into a collection.
 * The relationships (between the data objects and the collection) are specified and managed using the SingleCollectionAssociation. */
interface _DataobjectCollection extends _AbstractObject {
  /** Boolean flag. If true all data objects in the collection are of the same Energistics data type (EXAMPLE: All wellbores or all horizons). */
  HomogeneousDatatype?: boolean;
  /** Indicates the semantic of the collection. It is an extensible enumeration. So it may be one of the enumerations listed in CollectionKind or an implemenation may specify its own kind using CollectionKindExt. */
  Kind?: CollectionKindExt;
}
export interface DataobjectCollection extends _DataobjectCollection {}

/** A pointer to a component within another Energistics data object. */
interface _DataObjectComponentReference extends BaseType {
  /** A component within the data object that is being referenced by its UID. If more than one Component is included, it is a reference to a component that is nested within the previous component. */
  Component: ComponentReference[];
  /** The data object containing the component. */
  DataObject: DataObjectReference;
}
export interface DataObjectComponentReference
  extends _DataObjectComponentReference {}

/** Parameter referencing to a top level object. */
interface _DataObjectParameter extends _AbstractActivityParameter {
  DataObject: DataObjectReference;
}
export interface DataObjectParameter extends _DataObjectParameter {}

/** A pointer to another Energistics data object. */
interface _DataObjectReference extends BaseType {
  /** The canonical URI of a referenced data object. This element is intended for use with the Energistics Transfer Protocol (ETP) .
   * Do not use this element to store the path and file names of an external data object object. Optionally use one or more LocatorUrl elements to provide hints on how to resolve the URI into a data object. */
  EnergisticsUri?: string;
  /** A standard Energistics extension mechanism used to add custom data in the format of name:value pairs. */
  ExtensionNameValue?: ExtensionNameValue[];
  /** An optional location to help in finding the correct referenced data object. */
  LocatorUrl?: string[];
  /** Indicates the version of the data object that is referenced. This must be identical to the objectVersion attribute that is inherited from AbstractObject.
   * If this element is empty, then the latest version of the data object is assumed. */
  ObjectVersion?: String64;
  /** The qualified type of the referenced data object.
   * It is the semantic equivalent of a qualifiedEntityType in OData (which is the DataObjectType used in the Energistics Transfer Protocol (ETP)). For more information, see the Energistics Identifier Specification v5.0.
   * The QualifiedType is composed of:
   * - The Energistics domain standard or Energistics common (designated by eml) and version where the data object type is defined.
   * - The data object type name as defined by its schema.
   * Examples:
   * - witsml20.Well
   * - resqml20.UnstructuredGridRepresentation
   * - prodml20.ProductVolume
   * - eml21.DataAssuranceRecord */
  QualifiedType: QualifiedType;
  /** The title of the referenced data object. It should be the value in the Title attribute of the Citation element in AbstractObject.
   * It is used as a hint for human readers; it is not enforced to match the Title of the referenced data object. */
  Title: String2000;
  /** Universally unique identifier (UUID) of the referenced data object. For rules and guidelines about the format of UUIDs with the current version of Energistics standards, see the Energistics Identifier Specification v5.0. */
  Uuid: UuidString;
}
export interface DataObjectReference extends _DataObjectReference {}

interface _DataTransferSpeedMeasure extends _AbstractMeasure {
  uom: DataTransferSpeedUom;
}
export interface DataTransferSpeedMeasure extends _DataTransferSpeedMeasure {}

interface _DataTransferSpeedMeasureExt extends _AbstractMeasure {
  uom: DataTransferSpeedUomExt;
}
export interface DataTransferSpeedMeasureExt
  extends _DataTransferSpeedMeasureExt {}

export type DataTransferSpeedUom = "bit/s" | "byte/s";
interface _DataTransferSpeedUom extends _UomEnum {
  _: DataTransferSpeedUom;
}

export type DataTransferSpeedUomExt = string;
type _DataTransferSpeedUomExt = Primitive._string;

interface _DateTimeInterval extends _AbstractInterval {
  EndTime: TimeStamp;
  StartTime: TimeStamp;
}
export interface DateTimeInterval extends _DateTimeInterval {}

interface _DatumElevation extends _AbstractElevation {
  /** The datum the elevation is referenced to. */
  Datum: DataObjectReference;
}
export interface DatumElevation extends _DatumElevation {}

interface _DatumTvdInterval extends _AbstractTvdInterval {
  /** The datum the TVD interval is referenced to. Required when there is no default TVD datum associated with the data object this is used in. */
  Datum?: DataObjectReference;
}
export interface DatumTvdInterval extends _DatumTvdInterval {}

interface _DatumVerticalDepth extends _AbstractVerticalDepth {
  /** The datum the vertical depth is referenced to. Required when there is no default TVD datum associated with the data object this is used in. */
  Datum?: DataObjectReference;
}
export interface DatumVerticalDepth extends _DatumVerticalDepth {}

/** A possibly temperature and pressure corrected desity value. */
interface _DensityValue extends BaseType {
  /** The density of the product. */
  Density: MassPerVolumeMeasure;
  MeasurementPressureTemperature?: AbstractTemperaturePressure;
}
export interface DensityValue extends _DensityValue {}

interface _DiffusionCoefficientMeasure extends _AbstractMeasure {
  uom: DiffusionCoefficientUom;
}
export interface DiffusionCoefficientMeasure
  extends _DiffusionCoefficientMeasure {}

interface _DiffusionCoefficientMeasureExt extends _AbstractMeasure {
  uom: DiffusionCoefficientUomExt;
}
export interface DiffusionCoefficientMeasureExt
  extends _DiffusionCoefficientMeasureExt {}

export type DiffusionCoefficientUom = "m2/s";
interface _DiffusionCoefficientUom extends _UomEnum {
  _: DiffusionCoefficientUom;
}

export type DiffusionCoefficientUomExt = string;
type _DiffusionCoefficientUomExt = Primitive._string;

interface _DiffusiveTimeOfFlightMeasure extends _AbstractMeasure {
  uom: DiffusiveTimeOfFlightUom;
}
export interface DiffusiveTimeOfFlightMeasure
  extends _DiffusiveTimeOfFlightMeasure {}

interface _DiffusiveTimeOfFlightMeasureExt extends _AbstractMeasure {
  uom: DiffusiveTimeOfFlightUomExt;
}
export interface DiffusiveTimeOfFlightMeasureExt
  extends _DiffusiveTimeOfFlightMeasureExt {}

export type DiffusiveTimeOfFlightUom = "h(0.5)" | "s(0.5)";
interface _DiffusiveTimeOfFlightUom extends _UomEnum {
  _: DiffusiveTimeOfFlightUom;
}

export type DiffusiveTimeOfFlightUomExt = string;
type _DiffusiveTimeOfFlightUomExt = Primitive._string;

interface _DigitalStorageMeasure extends _AbstractMeasure {
  uom: DigitalStorageUom;
}
export interface DigitalStorageMeasure extends _DigitalStorageMeasure {}

interface _DigitalStorageMeasureExt extends _AbstractMeasure {
  uom: DigitalStorageUomExt;
}
export interface DigitalStorageMeasureExt extends _DigitalStorageMeasureExt {}

export type DigitalStorageUom = "bit" | "byte" | "Kibyte" | "Mibyte";
interface _DigitalStorageUom extends _UomEnum {
  _: DigitalStorageUom;
}

export type DigitalStorageUomExt = string;
type _DigitalStorageUomExt = Primitive._string;

interface _DimensionlessMeasure extends _AbstractMeasure {
  uom: DimensionlessUom;
}
export interface DimensionlessMeasure extends _DimensionlessMeasure {}

interface _DimensionlessMeasureExt extends _AbstractMeasure {
  uom: DimensionlessUomExt;
}
export interface DimensionlessMeasureExt extends _DimensionlessMeasureExt {}

export type DimensionlessUom =
  | "%"
  | "cEuc"
  | "dEuc"
  | "EEuc"
  | "Euc"
  | "fEuc"
  | "GEuc"
  | "kEuc"
  | "MEuc"
  | "mEuc"
  | "nEuc"
  | "pEuc"
  | "ppk"
  | "ppm"
  | "TEuc"
  | "uEuc";
interface _DimensionlessUom extends _UomEnum {
  _: DimensionlessUom;
}

export type DimensionlessUomExt = string;
type _DimensionlessUomExt = Primitive._string;

interface _DipoleMomentMeasure extends _AbstractMeasure {
  uom: DipoleMomentUom;
}
export interface DipoleMomentMeasure extends _DipoleMomentMeasure {}

interface _DipoleMomentMeasureExt extends _AbstractMeasure {
  uom: DipoleMomentUomExt;
}
export interface DipoleMomentMeasureExt extends _DipoleMomentMeasureExt {}

export type DipoleMomentUom = "C.m";
interface _DipoleMomentUom extends _UomEnum {
  _: DipoleMomentUom;
}

export type DipoleMomentUomExt = string;
type _DipoleMomentUomExt = Primitive._string;

interface _DoseEquivalentMeasure extends _AbstractMeasure {
  uom: DoseEquivalentUom;
}
export interface DoseEquivalentMeasure extends _DoseEquivalentMeasure {}

interface _DoseEquivalentMeasureExt extends _AbstractMeasure {
  uom: DoseEquivalentUomExt;
}
export interface DoseEquivalentMeasureExt extends _DoseEquivalentMeasureExt {}

export type DoseEquivalentUom = "mrem" | "mSv" | "rem" | "Sv";
interface _DoseEquivalentUom extends _UomEnum {
  _: DoseEquivalentUom;
}

export type DoseEquivalentUomExt = string;
type _DoseEquivalentUomExt = Primitive._string;

/** Key used to identify a parameter value associated with a double value. */
interface _DoubleParameterKey extends _AbstractParameterKey {
  CustomUnitDictionary?: DataObjectReference;
  /** Unit of measure associated with the value */
  Uom: UnitOfMeasureExt;
  /** Double value */
  Value: number;
}
export interface DoubleParameterKey extends _DoubleParameterKey {}

/** Parameter containing a double value. */
interface _DoubleQuantityParameter extends _AbstractActivityParameter {
  CustomUnitDictionary?: DataObjectReference;
  /** Unit of measure associated with the value */
  Uom: UnitOfMeasureExt;
  /** Double value */
  Value: number;
}
export interface DoubleQuantityParameter extends _DoubleQuantityParameter {}

interface _DynamicViscosityMeasure extends _AbstractMeasure {
  uom: DynamicViscosityUom;
}
export interface DynamicViscosityMeasure extends _DynamicViscosityMeasure {}

interface _DynamicViscosityMeasureExt extends _AbstractMeasure {
  uom: DynamicViscosityUomExt;
}
export interface DynamicViscosityMeasureExt
  extends _DynamicViscosityMeasureExt {}

export type DynamicViscosityUom =
  | "cP"
  | "dP"
  | "dyne.s/cm2"
  | "EP"
  | "fP"
  | "GP"
  | "kgf.s/m2"
  | "kP"
  | "lbf.s/ft2"
  | "lbf.s/in2"
  | "mP"
  | "MP"
  | "mPa.s"
  | "N.s/m2"
  | "nP"
  | "P"
  | "Pa.s"
  | "pP"
  | "psi.s"
  | "TP"
  | "uP";
interface _DynamicViscosityUom extends _UomEnum {
  _: DynamicViscosityUom;
}

export type DynamicViscosityUomExt = string;
type _DynamicViscosityUomExt = Primitive._string;

/** Specifies east or west direction. */
export type EastOrWest = "east" | "west";
interface _EastOrWest extends _TypeEnum {
  _: EastOrWest;
}

interface _ElapsedTimeInterval extends _AbstractInterval {
  EndElapsedTime: TimeMeasure;
  StartElapsedTime: TimeMeasure;
}
export interface ElapsedTimeInterval extends _ElapsedTimeInterval {}

interface _ElectricalResistivityMeasure extends _AbstractMeasure {
  uom: ElectricalResistivityUom;
}
export interface ElectricalResistivityMeasure
  extends _ElectricalResistivityMeasure {}

interface _ElectricalResistivityMeasureExt extends _AbstractMeasure {
  uom: ElectricalResistivityUomExt;
}
export interface ElectricalResistivityMeasureExt
  extends _ElectricalResistivityMeasureExt {}

export type ElectricalResistivityUom =
  | "kohm.m"
  | "nohm.mil2/ft"
  | "nohm.mm2/m"
  | "ohm.cm"
  | "ohm.m"
  | "ohm.m2/m";
interface _ElectricalResistivityUom extends _UomEnum {
  _: ElectricalResistivityUom;
}

export type ElectricalResistivityUomExt = string;
type _ElectricalResistivityUomExt = Primitive._string;

interface _ElectricChargeMeasure extends _AbstractMeasure {
  uom: ElectricChargeUom;
}
export interface ElectricChargeMeasure extends _ElectricChargeMeasure {}

interface _ElectricChargeMeasureExt extends _AbstractMeasure {
  uom: ElectricChargeUomExt;
}
export interface ElectricChargeMeasureExt extends _ElectricChargeMeasureExt {}

interface _ElectricChargePerAreaMeasure extends _AbstractMeasure {
  uom: ElectricChargePerAreaUom;
}
export interface ElectricChargePerAreaMeasure
  extends _ElectricChargePerAreaMeasure {}

interface _ElectricChargePerAreaMeasureExt extends _AbstractMeasure {
  uom: ElectricChargePerAreaUomExt;
}
export interface ElectricChargePerAreaMeasureExt
  extends _ElectricChargePerAreaMeasureExt {}

export type ElectricChargePerAreaUom = "C/cm2" | "C/m2" | "C/mm2" | "mC/m2";
interface _ElectricChargePerAreaUom extends _UomEnum {
  _: ElectricChargePerAreaUom;
}

export type ElectricChargePerAreaUomExt = string;
type _ElectricChargePerAreaUomExt = Primitive._string;

interface _ElectricChargePerMassMeasure extends _AbstractMeasure {
  uom: ElectricChargePerMassUom;
}
export interface ElectricChargePerMassMeasure
  extends _ElectricChargePerMassMeasure {}

interface _ElectricChargePerMassMeasureExt extends _AbstractMeasure {
  uom: ElectricChargePerMassUomExt;
}
export interface ElectricChargePerMassMeasureExt
  extends _ElectricChargePerMassMeasureExt {}

export type ElectricChargePerMassUom = "A.s/kg" | "C/g" | "C/kg";
interface _ElectricChargePerMassUom extends _UomEnum {
  _: ElectricChargePerMassUom;
}

export type ElectricChargePerMassUomExt = string;
type _ElectricChargePerMassUomExt = Primitive._string;

interface _ElectricChargePerVolumeMeasure extends _AbstractMeasure {
  uom: ElectricChargePerVolumeUom;
}
export interface ElectricChargePerVolumeMeasure
  extends _ElectricChargePerVolumeMeasure {}

interface _ElectricChargePerVolumeMeasureExt extends _AbstractMeasure {
  uom: ElectricChargePerVolumeUomExt;
}
export interface ElectricChargePerVolumeMeasureExt
  extends _ElectricChargePerVolumeMeasureExt {}

export type ElectricChargePerVolumeUom = "A.s/m3" | "C/cm3" | "C/m3" | "C/mm3";
interface _ElectricChargePerVolumeUom extends _UomEnum {
  _: ElectricChargePerVolumeUom;
}

export type ElectricChargePerVolumeUomExt = string;
type _ElectricChargePerVolumeUomExt = Primitive._string;

export type ElectricChargeUom =
  | "A.h"
  | "A.s"
  | "C"
  | "cC"
  | "dC"
  | "EC"
  | "fC"
  | "GC"
  | "kC"
  | "MC"
  | "mC"
  | "nC"
  | "pC"
  | "TC"
  | "uC";
interface _ElectricChargeUom extends _UomEnum {
  _: ElectricChargeUom;
}

export type ElectricChargeUomExt = string;
type _ElectricChargeUomExt = Primitive._string;

interface _ElectricConductanceMeasure extends _AbstractMeasure {
  uom: ElectricConductanceUom;
}
export interface ElectricConductanceMeasure
  extends _ElectricConductanceMeasure {}

interface _ElectricConductanceMeasureExt extends _AbstractMeasure {
  uom: ElectricConductanceUomExt;
}
export interface ElectricConductanceMeasureExt
  extends _ElectricConductanceMeasureExt {}

export type ElectricConductanceUom =
  | "cS"
  | "dS"
  | "ES"
  | "fS"
  | "GS"
  | "kS"
  | "mS"
  | "MS"
  | "nS"
  | "pS"
  | "S"
  | "TS"
  | "uS";
interface _ElectricConductanceUom extends _UomEnum {
  _: ElectricConductanceUom;
}

export type ElectricConductanceUomExt = string;
type _ElectricConductanceUomExt = Primitive._string;

interface _ElectricConductivityMeasure extends _AbstractMeasure {
  uom: ElectricConductivityUom;
}
export interface ElectricConductivityMeasure
  extends _ElectricConductivityMeasure {}

interface _ElectricConductivityMeasureExt extends _AbstractMeasure {
  uom: ElectricConductivityUomExt;
}
export interface ElectricConductivityMeasureExt
  extends _ElectricConductivityMeasureExt {}

export type ElectricConductivityUom = "kS/m" | "mS/cm" | "mS/m" | "S/m";
interface _ElectricConductivityUom extends _UomEnum {
  _: ElectricConductivityUom;
}

export type ElectricConductivityUomExt = string;
type _ElectricConductivityUomExt = Primitive._string;

interface _ElectricCurrentDensityMeasure extends _AbstractMeasure {
  uom: ElectricCurrentDensityUom;
}
export interface ElectricCurrentDensityMeasure
  extends _ElectricCurrentDensityMeasure {}

interface _ElectricCurrentDensityMeasureExt extends _AbstractMeasure {
  uom: ElectricCurrentDensityUomExt;
}
export interface ElectricCurrentDensityMeasureExt
  extends _ElectricCurrentDensityMeasureExt {}

export type ElectricCurrentDensityUom =
  | "A/cm2"
  | "A/ft2"
  | "A/m2"
  | "A/mm2"
  | "mA/cm2"
  | "mA/ft2"
  | "uA/cm2"
  | "uA/in2";
interface _ElectricCurrentDensityUom extends _UomEnum {
  _: ElectricCurrentDensityUom;
}

export type ElectricCurrentDensityUomExt = string;
type _ElectricCurrentDensityUomExt = Primitive._string;

interface _ElectricCurrentMeasure extends _AbstractMeasure {
  uom: ElectricCurrentUom;
}
export interface ElectricCurrentMeasure extends _ElectricCurrentMeasure {}

interface _ElectricCurrentMeasureExt extends _AbstractMeasure {
  uom: ElectricCurrentUomExt;
}
export interface ElectricCurrentMeasureExt extends _ElectricCurrentMeasureExt {}

export type ElectricCurrentUom =
  | "A"
  | "cA"
  | "dA"
  | "EA"
  | "fA"
  | "GA"
  | "kA"
  | "MA"
  | "mA"
  | "nA"
  | "pA"
  | "TA"
  | "uA";
interface _ElectricCurrentUom extends _UomEnum {
  _: ElectricCurrentUom;
}

export type ElectricCurrentUomExt = string;
type _ElectricCurrentUomExt = Primitive._string;

interface _ElectricFieldStrengthMeasure extends _AbstractMeasure {
  uom: ElectricFieldStrengthUom;
}
export interface ElectricFieldStrengthMeasure
  extends _ElectricFieldStrengthMeasure {}

interface _ElectricFieldStrengthMeasureExt extends _AbstractMeasure {
  uom: ElectricFieldStrengthUomExt;
}
export interface ElectricFieldStrengthMeasureExt
  extends _ElectricFieldStrengthMeasureExt {}

export type ElectricFieldStrengthUom =
  | "mV/ft"
  | "mV/m"
  | "uV/ft"
  | "uV/m"
  | "V/m";
interface _ElectricFieldStrengthUom extends _UomEnum {
  _: ElectricFieldStrengthUom;
}

export type ElectricFieldStrengthUomExt = string;
type _ElectricFieldStrengthUomExt = Primitive._string;

interface _ElectricPotentialDifferenceMeasure extends _AbstractMeasure {
  uom: ElectricPotentialDifferenceUom;
}
export interface ElectricPotentialDifferenceMeasure
  extends _ElectricPotentialDifferenceMeasure {}

interface _ElectricPotentialDifferenceMeasureExt extends _AbstractMeasure {
  uom: ElectricPotentialDifferenceUomExt;
}
export interface ElectricPotentialDifferenceMeasureExt
  extends _ElectricPotentialDifferenceMeasureExt {}

export type ElectricPotentialDifferenceUom =
  | "cV"
  | "dV"
  | "fV"
  | "GV"
  | "kV"
  | "mV"
  | "MV"
  | "nV"
  | "pV"
  | "TV"
  | "uV"
  | "V";
interface _ElectricPotentialDifferenceUom extends _UomEnum {
  _: ElectricPotentialDifferenceUom;
}

export type ElectricPotentialDifferenceUomExt = string;
type _ElectricPotentialDifferenceUomExt = Primitive._string;

interface _ElectricResistanceMeasure extends _AbstractMeasure {
  uom: ElectricResistanceUom;
}
export interface ElectricResistanceMeasure extends _ElectricResistanceMeasure {}

interface _ElectricResistanceMeasureExt extends _AbstractMeasure {
  uom: ElectricResistanceUomExt;
}
export interface ElectricResistanceMeasureExt
  extends _ElectricResistanceMeasureExt {}

interface _ElectricResistancePerLengthMeasure extends _AbstractMeasure {
  uom: ElectricResistancePerLengthUom;
}
export interface ElectricResistancePerLengthMeasure
  extends _ElectricResistancePerLengthMeasure {}

interface _ElectricResistancePerLengthMeasureExt extends _AbstractMeasure {
  uom: ElectricResistancePerLengthUomExt;
}
export interface ElectricResistancePerLengthMeasureExt
  extends _ElectricResistancePerLengthMeasureExt {}

export type ElectricResistancePerLengthUom = "ohm/m" | "uohm/ft" | "uohm/m";
interface _ElectricResistancePerLengthUom extends _UomEnum {
  _: ElectricResistancePerLengthUom;
}

export type ElectricResistancePerLengthUomExt = string;
type _ElectricResistancePerLengthUomExt = Primitive._string;

export type ElectricResistanceUom =
  | "cohm"
  | "dohm"
  | "Eohm"
  | "fohm"
  | "Gohm"
  | "kohm"
  | "Mohm"
  | "mohm"
  | "nohm"
  | "ohm"
  | "pohm"
  | "Tohm"
  | "uohm";
interface _ElectricResistanceUom extends _UomEnum {
  _: ElectricResistanceUom;
}

export type ElectricResistanceUomExt = string;
type _ElectricResistanceUomExt = Primitive._string;

interface _ElectromagneticMomentMeasure extends _AbstractMeasure {
  uom: ElectromagneticMomentUom;
}
export interface ElectromagneticMomentMeasure
  extends _ElectromagneticMomentMeasure {}

interface _ElectromagneticMomentMeasureExt extends _AbstractMeasure {
  uom: ElectromagneticMomentUomExt;
}
export interface ElectromagneticMomentMeasureExt
  extends _ElectromagneticMomentMeasureExt {}

export type ElectromagneticMomentUom = "A.m2";
interface _ElectromagneticMomentUom extends _UomEnum {
  _: ElectromagneticMomentUom;
}

export type ElectromagneticMomentUomExt = string;
type _ElectromagneticMomentUomExt = Primitive._string;

/** An email address with an attribute, used to "qualify" an email as personal, work, or permanent. */
interface _EmailQualifierStruct extends _String64 {
  /** Enum attribute, used to "qualify" an email as personal, work, or permanent. */
  qualifier?: AddressQualifier;
}
export interface EmailQualifierStruct extends _EmailQualifierStruct {}

interface _EnergyLengthPerAreaMeasure extends _AbstractMeasure {
  uom: EnergyLengthPerAreaUom;
}
export interface EnergyLengthPerAreaMeasure
  extends _EnergyLengthPerAreaMeasure {}

interface _EnergyLengthPerAreaMeasureExt extends _AbstractMeasure {
  uom: EnergyLengthPerAreaUomExt;
}
export interface EnergyLengthPerAreaMeasureExt
  extends _EnergyLengthPerAreaMeasureExt {}

export type EnergyLengthPerAreaUom = "J.m/m2" | "kcal[th].m/cm2";
interface _EnergyLengthPerAreaUom extends _UomEnum {
  _: EnergyLengthPerAreaUom;
}

export type EnergyLengthPerAreaUomExt = string;
type _EnergyLengthPerAreaUomExt = Primitive._string;

interface _EnergyLengthPerTimeAreaTemperatureMeasure extends _AbstractMeasure {
  uom: EnergyLengthPerTimeAreaTemperatureUom;
}
export interface EnergyLengthPerTimeAreaTemperatureMeasure
  extends _EnergyLengthPerTimeAreaTemperatureMeasure {}

interface _EnergyLengthPerTimeAreaTemperatureMeasureExt
  extends _AbstractMeasure {
  uom: EnergyLengthPerTimeAreaTemperatureUomExt;
}
export interface EnergyLengthPerTimeAreaTemperatureMeasureExt
  extends _EnergyLengthPerTimeAreaTemperatureMeasureExt {}

export type EnergyLengthPerTimeAreaTemperatureUom =
  | "Btu[IT].in/(h.ft2.deltaF)"
  | "J.m/(s.m2.deltaK)"
  | "kJ.m/(h.m2.deltaK)"
  | "W/(m.deltaK)";
interface _EnergyLengthPerTimeAreaTemperatureUom extends _UomEnum {
  _: EnergyLengthPerTimeAreaTemperatureUom;
}

export type EnergyLengthPerTimeAreaTemperatureUomExt = string;
type _EnergyLengthPerTimeAreaTemperatureUomExt = Primitive._string;

interface _EnergyMeasure extends _AbstractMeasure {
  uom: EnergyUom;
}
export interface EnergyMeasure extends _EnergyMeasure {}

interface _EnergyMeasureExt extends _AbstractMeasure {
  uom: EnergyUomExt;
}
export interface EnergyMeasureExt extends _EnergyMeasureExt {}

interface _EnergyPerAreaMeasure extends _AbstractMeasure {
  uom: EnergyPerAreaUom;
}
export interface EnergyPerAreaMeasure extends _EnergyPerAreaMeasure {}

interface _EnergyPerAreaMeasureExt extends _AbstractMeasure {
  uom: EnergyPerAreaUomExt;
}
export interface EnergyPerAreaMeasureExt extends _EnergyPerAreaMeasureExt {}

export type EnergyPerAreaUom =
  | "erg/cm2"
  | "J/cm2"
  | "J/m2"
  | "kgf.m/cm2"
  | "lbf.ft/in2"
  | "mJ/cm2"
  | "mJ/m2"
  | "N/m";
interface _EnergyPerAreaUom extends _UomEnum {
  _: EnergyPerAreaUom;
}

export type EnergyPerAreaUomExt = string;
type _EnergyPerAreaUomExt = Primitive._string;

interface _EnergyPerLengthMeasure extends _AbstractMeasure {
  uom: EnergyPerLengthUom;
}
export interface EnergyPerLengthMeasure extends _EnergyPerLengthMeasure {}

interface _EnergyPerLengthMeasureExt extends _AbstractMeasure {
  uom: EnergyPerLengthUomExt;
}
export interface EnergyPerLengthMeasureExt extends _EnergyPerLengthMeasureExt {}

export type EnergyPerLengthUom = "J/m" | "MJ/m";
interface _EnergyPerLengthUom extends _UomEnum {
  _: EnergyPerLengthUom;
}

export type EnergyPerLengthUomExt = string;
type _EnergyPerLengthUomExt = Primitive._string;

interface _EnergyPerMassMeasure extends _AbstractMeasure {
  uom: EnergyPerMassUom;
}
export interface EnergyPerMassMeasure extends _EnergyPerMassMeasure {}

interface _EnergyPerMassMeasureExt extends _AbstractMeasure {
  uom: EnergyPerMassUomExt;
}
export interface EnergyPerMassMeasureExt extends _EnergyPerMassMeasureExt {}

interface _EnergyPerMassPerTimeMeasure extends _AbstractMeasure {
  uom: EnergyPerMassPerTimeUom;
}
export interface EnergyPerMassPerTimeMeasure
  extends _EnergyPerMassPerTimeMeasure {}

interface _EnergyPerMassPerTimeMeasureExt extends _AbstractMeasure {
  uom: EnergyPerMassPerTimeUomExt;
}
export interface EnergyPerMassPerTimeMeasureExt
  extends _EnergyPerMassPerTimeMeasureExt {}

export type EnergyPerMassPerTimeUom =
  | "mrem/h"
  | "mSv/h"
  | "rem/h"
  | "Sv/h"
  | "Sv/s";
interface _EnergyPerMassPerTimeUom extends _UomEnum {
  _: EnergyPerMassPerTimeUom;
}

export type EnergyPerMassPerTimeUomExt = string;
type _EnergyPerMassPerTimeUomExt = Primitive._string;

export type EnergyPerMassUom =
  | "Btu[IT]/lbm"
  | "cal[th]/g"
  | "cal[th]/kg"
  | "cal[th]/lbm"
  | "erg/g"
  | "erg/kg"
  | "hp.h/lbm"
  | "J/g"
  | "J/kg"
  | "kcal[th]/g"
  | "kcal[th]/kg"
  | "kJ/kg"
  | "kW.h/kg"
  | "lbf.ft/lbm"
  | "MJ/kg"
  | "MW.h/kg";
interface _EnergyPerMassUom extends _UomEnum {
  _: EnergyPerMassUom;
}

export type EnergyPerMassUomExt = string;
type _EnergyPerMassUomExt = Primitive._string;

interface _EnergyPerVolumeMeasure extends _AbstractMeasure {
  uom: EnergyPerVolumeUom;
}
export interface EnergyPerVolumeMeasure extends _EnergyPerVolumeMeasure {}

interface _EnergyPerVolumeMeasureExt extends _AbstractMeasure {
  uom: EnergyPerVolumeUomExt;
}
export interface EnergyPerVolumeMeasureExt extends _EnergyPerVolumeMeasureExt {}

export type EnergyPerVolumeUom =
  | "Btu[IT]/bbl"
  | "Btu[IT]/ft3"
  | "Btu[IT]/gal[UK]"
  | "Btu[IT]/gal[US]"
  | "cal[th]/cm3"
  | "cal[th]/mL"
  | "cal[th]/mm3"
  | "erg/cm3"
  | "erg/m3"
  | "hp.h/bbl"
  | "J/dm3"
  | "J/m3"
  | "kcal[th]/cm3"
  | "kcal[th]/m3"
  | "kJ/dm3"
  | "kJ/m3"
  | "kW.h/dm3"
  | "kW.h/m3"
  | "lbf.ft/bbl"
  | "lbf.ft/gal[US]"
  | "MJ/m3"
  | "MW.h/m3"
  | "tonf[US].mi/bbl";
interface _EnergyPerVolumeUom extends _UomEnum {
  _: EnergyPerVolumeUom;
}

export type EnergyPerVolumeUomExt = string;
type _EnergyPerVolumeUomExt = Primitive._string;

export type EnergyUom =
  | "1E6 Btu[IT]"
  | "aJ"
  | "Btu[IT]"
  | "Btu[th]"
  | "Btu[UK]"
  | "cal[IT]"
  | "cal[th]"
  | "ccal[th]"
  | "ceV"
  | "cJ"
  | "dcal[th]"
  | "deV"
  | "dJ"
  | "Ecal[th]"
  | "EeV"
  | "EJ"
  | "erg"
  | "eV"
  | "fcal[th]"
  | "feV"
  | "fJ"
  | "Gcal[th]"
  | "GeV"
  | "GJ"
  | "GW.h"
  | "hp.h"
  | "hp[metric].h"
  | "J"
  | "kcal[th]"
  | "keV"
  | "kJ"
  | "kW.h"
  | "mcal[th]"
  | "Mcal[th]"
  | "meV"
  | "MeV"
  | "MJ"
  | "mJ"
  | "MW.h"
  | "ncal[th]"
  | "neV"
  | "nJ"
  | "pcal[th]"
  | "peV"
  | "pJ"
  | "quad"
  | "Tcal[th]"
  | "TeV"
  | "therm[EC]"
  | "therm[UK]"
  | "therm[US]"
  | "TJ"
  | "TW.h"
  | "ucal[th]"
  | "ueV"
  | "uJ";
interface _EnergyUom extends _UomEnum {
  _: EnergyUom;
}

export type EnergyUomExt = string;
type _EnergyUomExt = Primitive._string;

interface _EngineeringCompoundPosition extends _AbstractCompoundPosition {
  Coordinate1: number;
  Coordinate2: number;
  LocalEngineeringCompoundCrs: DataObjectReference;
  VerticalCoordinate: number;
}
export interface EngineeringCompoundPosition
  extends _EngineeringCompoundPosition {}

/** @pattern .*:.* */
export type EnumExtensionPattern = string;
type _EnumExtensionPattern = _AbstractString;

/** A list of lifecycle states like actual, required, planned, predicted, etc. These are used to qualify any top-level element (from Epicentre 2.1). */
export type ExistenceKind = "actual" | "planned" | "simulated" | "test";
interface _ExistenceKind extends _TypeEnum {
  _: ExistenceKind;
}

/** An Energistics modeling pattern  that allows an implementation to extend the ExistenceKind enumeration.
 * A writer can use this field to write a string (enumeration) that is not part of the official enumeration.
 * A reader must accept this text but is not required to understand or process it. */
export type ExistenceKindExt = string;
type _ExistenceKindExt = Primitive._string;

/** Extension values Schema. The intent is to allow standard ML domain "named" extensions without having to modify the schema. A client or server can ignore any name that it does not recognize but certain metadata is required to allow generic clients or servers to process the value. */
interface _ExtensionNameValue extends BaseType {
  /** A textual description of the extension. */
  Description?: String2000;
  /** The date-time associated with the value. */
  DTim?: TimeStamp;
  /** Indexes things with the same name.
   * That is, 1 indicates the first one, 2 indicates the second one, etc. */
  Index?: number;
  /** The kind of the measure. For example, "length".
   * This should be specified if the value requires a unit of measure. */
  MeasureClass?: MeasureClass;
  /** The name of the extension.
   * Each standard name should document the expected measure class.
   * Each standard name should document the expected maximum size.
   * For numeric values the size should be in terms of xsd types
   * such as int, long, short, byte, float or double.
   * For strings, the maximum length should be defined in number of characters.
   * Local extensions to the list of standard names are allowed but it is strongly
   * recommended that the names and definitions be approved by the
   * respective SIG Technical Team before use. */
  Name: String64;
  /** The value of the extension. This may also include a uom attribute. The content should conform to constraints defined by the data type. */
  Value: StringMeasure;
}
export interface ExtensionNameValue extends _ExtensionNameValue {}

/** A concatenation of ExternalDataArrayParts, which are pointers to a whole or to a sub-selection of an existing array that is in a different file (than the Energistics data object). It generally and historically points to an HDF5 dataset in an Energistics Packaging Conventions (EPC) context.
 * It is common to have only 1 ExternalDataArrayPart in an ExternalDataArray. */
interface _ExternalDataArray extends BaseType {
  ExternalDataArrayPart: ExternalDataArrayPart[];
}
export interface ExternalDataArray extends _ExternalDataArray {}

/** Pointers to a whole or to a sub-selection of an existing array that is in a different file than the Energistics data object. */
interface _ExternalDataArrayPart extends BaseType {
  /** For each dimension, the count of elements to select, starting from the corresponding StartIndex in the data set identified by the attribute PathInExternalFile.
   * If you want to select the whole data set identified by PathInExternalFile, then put the whole data set dimension count in each dimension. */
  Count: PositiveLong[];
  /** If the resource being pointed to is a file, then this is the MIME type of the file. */
  MimeType?: String2000;
  /** A string that is meaningful to the API that will store and retrieve data from the external file.
   * - For an HDF file, it is the path of the referenced data set in the external file. The separator between groups and final data set is a slash '/'
   * - For a LAS file, it could be the list of mnemonics in the ~A block.
   * - For a SEG-Y file, it could be a list of trace headers. */
  PathInExternalFile: String2000;
  /** For each dimension, the start index of the selection of the data set identified by the attribute PathInExternalFile.
   * If you want to select the whole data set identified by PathInExternalFile, then put 0 in each dimension. */
  StartIndex: NonNegativeLong[];
  /** The URI where the DataArrayPart is stored.
   * In an EPC context, it should follow the corresponding rel entry URI syntax. */
  URI: String2000;
}
export interface ExternalDataArrayPart extends _ExternalDataArrayPart {}

export type Facet =
  | "I"
  | "J"
  | "K"
  | "X"
  | "Y"
  | "Z"
  | "I+"
  | "J+"
  | "K+"
  | "X+"
  | "Y+"
  | "Z+"
  | "I-"
  | "J-"
  | "K-"
  | "X-"
  | "Y-"
  | "Z-"
  | "net"
  | "gross"
  | "plus"
  | "minus"
  | "average"
  | "maximum"
  | "minimum"
  | "maximum threshold"
  | "minimum threshold"
  | "surface condition"
  | "reservoir condition"
  | "oil"
  | "water"
  | "gas"
  | "condensate"
  | "cumulative"
  | "fracture"
  | "matrix";
interface _Facet extends _TypeEnum {
  _: Facet;
}

/** The extensible enumeration of facets. */
export type FacetExt = string;
type _FacetExt = Primitive._string;

/** Enumerations of the type of qualifier that applies to a property type to provide additional context about the nature of the property. For example, may include conditions, direction, qualifiers, or statistics. Facets are used in RESQML to provide qualifiers to existing property types, which minimizes the need to create specialized property types. */
export type FacetKind =
  | "conditions"
  | "side"
  | "direction"
  | "netgross"
  | "qualifier"
  | "statistics"
  | "what";
interface _FacetKind extends _TypeEnum {
  _: FacetKind;
}

/** This class is used to represent a period of time when a facility was in a lifecycle state. */
interface _FacilityLifecyclePeriod extends BaseType {
  /** The data and time when the lifecycle state ended. */
  EndDateTime?: TimeStamp;
  /** The date and time when the lifecycle state started. */
  StartDateTime?: TimeStamp;
  /** The facility's lifecycle state. */
  State: FacilityLifecycleStateExt;
}
export interface FacilityLifecyclePeriod extends _FacilityLifecyclePeriod {}

export type FacilityLifecycleState =
  | "planning"
  | "constructing"
  | "operating"
  | "closing"
  | "closed";
interface _FacilityLifecycleState extends _TypeEnum {
  _: FacilityLifecycleState;
}

/** The extensible enumeration of facility life cycle states. */
export type FacilityLifecycleStateExt = string;
type _FacilityLifecycleStateExt = Primitive._string;

/** This class is used to represent the BusinessAssociate that operates or operated a facility and, optionally, the time interval during which the business associated is or was the operator. */
interface _FacilityOperator extends BaseType {
  /** A pointer to the business associate that operates or operated the facility. */
  BusinessAssociate: DataObjectReference;
  /** The date and time when the business associate became the facility operator. */
  EffectiveDateTime?: TimeStamp;
  /** The date and time when the business associate ceased to be the facility operator. */
  TerminationDateTime?: TimeStamp;
}
export interface FacilityOperator extends _FacilityOperator {}

/** The FailingRule class holds summary information on which of the rules within a policy failed. */
interface _FailingRule extends BaseType {
  /** This allows extending the FailingRule class with as many arbitrary name-value pairs as is required at run-time.
   *
   * Uses for this might include why the rule failed or by how much. */
  FailingRuleExtensions?: ExtensionNameValue[];
  /** Identifier of the atomic rule being checked against the data. */
  RuleId: String64;
  /** Human-readable name of the atomic rule being checked against the data. */
  RuleName?: String2000;
  /** Severity of the failure. This could be used to indicate that a rule is a high-priority rule whose failure is considered as severe or could be used to indicate just how badly a rule was contravened.
   *
   * The meaning of this field should be standardized within a company to maximize its utility. */
  Severity?: String64;
}
export interface FailingRule extends _FailingRule {}

interface _FloatingPointArrayStatistics extends BaseType {
  MaximumValue?: number;
  MinimumValue?: number;
  ModePercentage?: number;
  ValidValueCount?: number;
  ValuesMean?: number;
  ValuesMedian?: number;
  ValuesMode?: number;
  ValuesStandardDeviation?: number;
}
export interface FloatingPointArrayStatistics
  extends _FloatingPointArrayStatistics {}

/** Represents an array of double values where all values are identical. This an optimization for which an array of explicit double values is not required. */
interface _FloatingPointConstantArray extends _AbstractFloatingPointArray {
  /** Size of the array. */
  Count: PositiveLong;
  /** Values inside all the elements of the array. */
  Value: number;
}
export interface FloatingPointConstantArray
  extends _FloatingPointConstantArray {}

/** An array of double values provided explicitly by an HDF5 dataset.
 * By convention, the null value is NaN. */
interface _FloatingPointExternalArray extends _AbstractFloatingPointArray {
  ArrayFloatingPointType: FloatingPointType;
  CountPerValue: number;
  /** Reference to an HDF5 array of doubles. */
  Values: ExternalDataArray;
}
export interface FloatingPointExternalArray
  extends _FloatingPointExternalArray {}

/** Represents an array of doubles based on an origin and a multi-dimensional offset. The offset is based on a linearization of a multi-dimensional offset.
 *
 * If count(i) is the number of elements in the dimension i and offset(i) is the offset in the dimension i, then:
 * globalOffsetInNDimension = startValue+ ni*offset(n) + n_1i*count(n)*offset(n-1) + .... + 0i*count(n)*count(n-1)*....count(1)*offset(0) */
interface _FloatingPointLatticeArray extends _AbstractFloatingPointArray {
  Offset: FloatingPointConstantArray[];
  /** Value representing the global start for the lattice. */
  StartValue: number;
}
export interface FloatingPointLatticeArray extends _FloatingPointLatticeArray {}

export type FloatingPointType =
  | "arrayOfFloat32LE"
  | "arrayOfDouble64LE"
  | "arrayOfFloat32BE"
  | "arrayOfDouble64BE";
interface _FloatingPointType extends _TypeEnum {
  _: FloatingPointType;
}

interface _FloatingPointXmlArray extends _AbstractFloatingPointArray {
  CountPerValue: number;
  Values: FloatingPointXmlArrayList;
}
export interface FloatingPointXmlArray extends _FloatingPointXmlArray {}

export type FloatingPointXmlArrayList = number[];

/** A possibly temperature and pressure corrected flow rate value. */
interface _FlowRateValue extends BaseType {
  /** The flow rate of the product. If the 'status' attribute is absent and the value is not "NaN", the data value can be assumed to be good with no restrictions. A value of "NaN" should be interpreted as null and should be not be given unless a status is also specified to explain why it is null. */
  FlowRate: VolumePerTimeMeasure;
  MeasurementPressureTemperature?: AbstractTemperaturePressure;
}
export interface FlowRateValue extends _FlowRateValue {}

interface _ForceAreaMeasure extends _AbstractMeasure {
  uom: ForceAreaUom;
}
export interface ForceAreaMeasure extends _ForceAreaMeasure {}

interface _ForceAreaMeasureExt extends _AbstractMeasure {
  uom: ForceAreaUomExt;
}
export interface ForceAreaMeasureExt extends _ForceAreaMeasureExt {}

export type ForceAreaUom =
  | "dyne.cm2"
  | "kgf.m2"
  | "kN.m2"
  | "lbf.in2"
  | "mN.m2"
  | "N.m2"
  | "pdl.cm2"
  | "tonf[UK].ft2"
  | "tonf[US].ft2";
interface _ForceAreaUom extends _UomEnum {
  _: ForceAreaUom;
}

export type ForceAreaUomExt = string;
type _ForceAreaUomExt = Primitive._string;

interface _ForceLengthPerLengthMeasure extends _AbstractMeasure {
  uom: ForceLengthPerLengthUom;
}
export interface ForceLengthPerLengthMeasure
  extends _ForceLengthPerLengthMeasure {}

interface _ForceLengthPerLengthMeasureExt extends _AbstractMeasure {
  uom: ForceLengthPerLengthUomExt;
}
export interface ForceLengthPerLengthMeasureExt
  extends _ForceLengthPerLengthMeasureExt {}

export type ForceLengthPerLengthUom =
  | "kgf.m/m"
  | "lbf.ft/in"
  | "lbf.in/in"
  | "N.m/m"
  | "tonf[US].mi/ft";
interface _ForceLengthPerLengthUom extends _UomEnum {
  _: ForceLengthPerLengthUom;
}

export type ForceLengthPerLengthUomExt = string;
type _ForceLengthPerLengthUomExt = Primitive._string;

interface _ForceMeasure extends _AbstractMeasure {
  uom: ForceUom;
}
export interface ForceMeasure extends _ForceMeasure {}

interface _ForceMeasureExt extends _AbstractMeasure {
  uom: ForceUomExt;
}
export interface ForceMeasureExt extends _ForceMeasureExt {}

interface _ForcePerForceMeasure extends _AbstractMeasure {
  uom: ForcePerForceUom;
}
export interface ForcePerForceMeasure extends _ForcePerForceMeasure {}

interface _ForcePerForceMeasureExt extends _AbstractMeasure {
  uom: ForcePerForceUomExt;
}
export interface ForcePerForceMeasureExt extends _ForcePerForceMeasureExt {}

export type ForcePerForceUom = "%" | "Euc" | "kgf/kgf" | "lbf/lbf" | "N/N";
interface _ForcePerForceUom extends _UomEnum {
  _: ForcePerForceUom;
}

export type ForcePerForceUomExt = string;
type _ForcePerForceUomExt = Primitive._string;

interface _ForcePerLengthMeasure extends _AbstractMeasure {
  uom: ForcePerLengthUom;
}
export interface ForcePerLengthMeasure extends _ForcePerLengthMeasure {}

interface _ForcePerLengthMeasureExt extends _AbstractMeasure {
  uom: ForcePerLengthUomExt;
}
export interface ForcePerLengthMeasureExt extends _ForcePerLengthMeasureExt {}

export type ForcePerLengthUom =
  | "0.01 lbf/ft"
  | "1/30 lbf/m"
  | "1/30 N/m"
  | "dyne/cm"
  | "kgf/cm"
  | "kN/m"
  | "lbf/ft"
  | "lbf/in"
  | "mN/km"
  | "mN/m"
  | "N/m"
  | "pdl/cm"
  | "tonf[UK]/ft"
  | "tonf[US]/ft";
interface _ForcePerLengthUom extends _UomEnum {
  _: ForcePerLengthUom;
}

export type ForcePerLengthUomExt = string;
type _ForcePerLengthUomExt = Primitive._string;

interface _ForcePerVolumeMeasure extends _AbstractMeasure {
  uom: ForcePerVolumeUom;
}
export interface ForcePerVolumeMeasure extends _ForcePerVolumeMeasure {}

interface _ForcePerVolumeMeasureExt extends _AbstractMeasure {
  uom: ForcePerVolumeUomExt;
}
export interface ForcePerVolumeMeasureExt extends _ForcePerVolumeMeasureExt {}

export type ForcePerVolumeUom =
  | "0.001 psi/ft"
  | "0.01 psi/ft"
  | "atm/ft"
  | "atm/hm"
  | "atm/m"
  | "bar/km"
  | "bar/m"
  | "GPa/cm"
  | "kPa/hm"
  | "kPa/m"
  | "lbf/ft3"
  | "lbf/gal[US]"
  | "MPa/m"
  | "N/m3"
  | "Pa/m"
  | "psi/ft"
  | "psi/m";
interface _ForcePerVolumeUom extends _UomEnum {
  _: ForcePerVolumeUom;
}

export type ForcePerVolumeUomExt = string;
type _ForcePerVolumeUomExt = Primitive._string;

export type ForceUom =
  | "10 kN"
  | "cN"
  | "daN"
  | "dN"
  | "dyne"
  | "EN"
  | "fN"
  | "gf"
  | "GN"
  | "hN"
  | "kdyne"
  | "kgf"
  | "klbf"
  | "kN"
  | "lbf"
  | "Mgf"
  | "mN"
  | "MN"
  | "N"
  | "nN"
  | "ozf"
  | "pdl"
  | "pN"
  | "TN"
  | "tonf[UK]"
  | "tonf[US]"
  | "uN";
interface _ForceUom extends _UomEnum {
  _: ForceUom;
}

export type ForceUomExt = string;
type _ForceUomExt = Primitive._string;

interface _FrequencyIntervalMeasure extends _AbstractMeasure {
  uom: FrequencyIntervalUom;
}
export interface FrequencyIntervalMeasure extends _FrequencyIntervalMeasure {}

interface _FrequencyIntervalMeasureExt extends _AbstractMeasure {
  uom: FrequencyIntervalUomExt;
}
export interface FrequencyIntervalMeasureExt
  extends _FrequencyIntervalMeasureExt {}

export type FrequencyIntervalUom = "O";
interface _FrequencyIntervalUom extends _UomEnum {
  _: FrequencyIntervalUom;
}

export type FrequencyIntervalUomExt = string;
type _FrequencyIntervalUomExt = Primitive._string;

interface _FrequencyMeasure extends _AbstractMeasure {
  uom: FrequencyUom;
}
export interface FrequencyMeasure extends _FrequencyMeasure {}

interface _FrequencyMeasureExt extends _AbstractMeasure {
  uom: FrequencyUomExt;
}
export interface FrequencyMeasureExt extends _FrequencyMeasureExt {}

export type FrequencyUom =
  | "cHz"
  | "dHz"
  | "EHz"
  | "fHz"
  | "GHz"
  | "Hz"
  | "kHz"
  | "mHz"
  | "MHz"
  | "nHz"
  | "pHz"
  | "THz"
  | "uHz";
interface _FrequencyUom extends _UomEnum {
  _: FrequencyUom;
}

export type FrequencyUomExt = string;
type _FrequencyUomExt = Primitive._string;

interface _GaugePressure extends _AbstractPressureValue {
  GaugePressure: PressureMeasureExt;
  ReferencePressure?: ReferencePressure;
}
export interface GaugePressure extends _GaugePressure {}

interface _GaugePressureInterval extends _AbstractPressureInterval {
  MaxPressure: GaugePressure;
  MinPressure: GaugePressure;
}
export interface GaugePressureInterval extends _GaugePressureInterval {}

/** An general address structure. This form is appropriate for most countries. */
interface _GeneralAddress extends BaseType {
  /** The type of address: mailing, physical, or both. See AddressKindEnum. */
  kind?: AddressKindEnum;
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: String64;
  /** The city for the business associate's address. */
  City: String64;
  /** The country may be included. Although this is optional, it is probably required for most uses. */
  Country?: String64;
  /** The county, if applicable or necessary. */
  County: String64;
  /** The name line of an address. If missing, use the name of the business associate. */
  Name?: String64;
  /** A postal code, if appropriate for the country. In the USA, this would be the five or nine digit zip code. */
  PostalCode?: String64;
  /** Province. */
  Province: String64;
  /** State. */
  State: String64;
  /** A generic term for the middle lines of an address. They may be a street address, PO box, suite number, or any lines that come between the "name" and "city" lines. This may be repeated for up to four, ordered lines. */
  Street: String64[];
}
export interface GeneralAddress extends _GeneralAddress {}

/** A generic measure type.
 * This should not be used except in situations where the underlying class of data is
 * captured elsewhere. For example, for a log curve. */
interface _GenericMeasure extends _AbstractMeasure {
  uom: UomEnum;
}
export interface GenericMeasure extends _GenericMeasure {}

interface _Geocentric3dCrs extends _AbstractObject {}
export interface Geocentric3dCrs extends _Geocentric3dCrs {}

interface _Geocentric3dPosition extends _Abstract3dPosition {
  Coordinate1: number;
  Coordinate2: number;
  Coordinate3: number;
  Geocentric3dCrs: Geocentric3dCrs;
}
export interface Geocentric3dPosition extends _Geocentric3dPosition {}

/** Qualifier for the geological time denoted by the GeochronologicalUnit: eon, era, epoch, etc. */
export type GeochronologicalRank =
  | "eon"
  | "era"
  | "period"
  | "epoch"
  | "age"
  | "chron";
interface _GeochronologicalRank extends _TypeEnum {
  _: GeochronologicalRank;
}

/** This class contains the EPSG code for a geodetic CRS. */
interface _GeodeticEpsgCrs extends _AbstractGeographic2dCrs {
  EpsgCode: PositiveLong;
}
export interface GeodeticEpsgCrs extends _GeodeticEpsgCrs {}

/** This class contains a code for a geodetic CRS according to a local authority. This would be used in a case where a company or regulatory regime has chosen not to use EPSG codes. */
interface _GeodeticLocalAuthorityCrs extends _AbstractGeographic2dCrs {
  LocalAuthorityCrsName: AuthorityQualifiedName;
}
export interface GeodeticLocalAuthorityCrs extends _GeodeticLocalAuthorityCrs {}

/** This class is used in a case where the coordinate reference system is either unknown or is intentionally not being transferred. */
interface _GeodeticUnknownCrs extends _AbstractGeographic2dCrs {
  Unknown: String2000;
}
export interface GeodeticUnknownCrs extends _GeodeticUnknownCrs {}

/** ISO 19162-compliant well-known text for the Geodetic CRS. */
interface _GeodeticWktCrs extends _AbstractGeographic2dCrs {
  /** ISO 19162 compliant well known text of the CRS */
  WellKnownText: string;
}
export interface GeodeticWktCrs extends _GeodeticWktCrs {}

interface _Geographic2dCrs extends _Abstract2dCrs {
  AbstractGeographic2dCrs: AbstractGeographic2dCrs;
}
export interface Geographic2dCrs extends _Geographic2dCrs {}

interface _Geographic2dPosition extends _Abstract2dPosition {
  Epoch?: number;
  GeographicCrs: DataObjectReference;
  Latitude: PlaneAngleMeasureExt;
  Longitude: PlaneAngleMeasureExt;
}
export interface Geographic2dPosition extends _Geographic2dPosition {}

interface _Geographic3dCrs extends _AbstractObject {}
export interface Geographic3dCrs extends _Geographic3dCrs {}

interface _Geographic3dPosition extends _Abstract3dPosition {
  EllipsoidalHeight: number;
  Geographic3dCrs: Geographic3dCrs;
  Latitude: number;
  Longitude: number;
}
export interface Geographic3dPosition extends _Geographic3dPosition {}

interface _GeographicCompoundCrs extends _AbstractCompoundCrs {
  Geographic2dCrs: DataObjectReference;
}
export interface GeographicCompoundCrs extends _GeographicCompoundCrs {}

interface _GeographicCompoundPosition extends _AbstractCompoundPosition {
  GeographicCompoundCrs: GeographicCompoundCrs;
  Latitude: number;
  Longitude: number;
  VerticalCoordinate: number;
}
export interface GeographicCompoundPosition
  extends _GeographicCompoundPosition {}

/** Coordinates in a geodetic coordinate reference system.
 *
 * Coordinate 1 is a latitude
 * Coordinate 2 is a longitude */
interface _GeographicCoordinates extends _AbstractHorizontalCoordinates {
  Crs: DataObjectReference;
}
export interface GeographicCoordinates extends _GeographicCoordinates {}

/** This class is used to represent a time at several scales:
 * - A mandatory and precise DateTime used to characterize a TimeStep in a TimeSeries
 * - An optional Age Offset (corresponding to a geological event occurrence) in  years. This age offset must be positive when it represents a GeologicalEvent occurrence in the past. This Age Offset is not required to be positive, to allow for the case of simulating future geological events.
 *
 * When geological time is used to represent a geological event occurrence, the DateTime must be set by the software writer at a date no earlier than 01/01/1950. Any DateTime (even the creation DateTime of the instance) can be set in this attribute field. */
interface _GeologicTime extends BaseType {
  /** A value in years of the offset between the DateTime value and the DateTime of a geologic event occurrence. This value must be POSITIVE when it represents a geological event in the past. */
  AgeOffsetAttribute?: number;
  /** A date, which can be represented according to the W3CDTF format. */
  DateTime: TimeStamp;
}
export interface GeologicTime extends _GeologicTime {}

interface _GraphicalInformationSet extends _AbstractObject {
  GraphicalInformation?: AbstractGraphicalInformation[];
}
export interface GraphicalInformationSet extends _GraphicalInformationSet {}

/** Common information about the index for a growing object.
 *
 * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. None of the sub-elements can be changed. */
interface _GrowingObjectIndex extends BaseType {
  /** For depth indexes, this is a pointer to a reference point defining the datum to which all of the index values are referenced.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Datum?: DataObjectReference;
  /** The direction of the index, either increasing or decreasing. Index direction may not change within the life of a growing object.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Direction: IndexDirection;
  /** The kind of index (date time, measured depth, etc.).
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  IndexKind: DataIndexKind;
  /** An optional value pointing to a PropertyKind.
   * Energistics provides a list of standard property kinds that represent the basis for the commonly used properties in the E&P subsurface workflow.
   * This PropertyKind enumeration is in the external PropertyKindDictionary XML file in the Common ancillary folder.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  IndexPropertyKind?: DataObjectReference;
  /** The unit of measure of the index. Must be one of the units allowed for the specified IndexKind (e.g., time or depth).
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Uom: UnitOfMeasureExt;
}
export interface GrowingObjectIndex extends _GrowingObjectIndex {}

interface _HeatCapacityMeasure extends _AbstractMeasure {
  uom: HeatCapacityUom;
}
export interface HeatCapacityMeasure extends _HeatCapacityMeasure {}

interface _HeatCapacityMeasureExt extends _AbstractMeasure {
  uom: HeatCapacityUomExt;
}
export interface HeatCapacityMeasureExt extends _HeatCapacityMeasureExt {}

export type HeatCapacityUom = "J/deltaK";
interface _HeatCapacityUom extends _UomEnum {
  _: HeatCapacityUom;
}

export type HeatCapacityUomExt = string;
type _HeatCapacityUomExt = Primitive._string;

interface _HeatFlowRateMeasure extends _AbstractMeasure {
  uom: HeatFlowRateUom;
}
export interface HeatFlowRateMeasure extends _HeatFlowRateMeasure {}

interface _HeatFlowRateMeasureExt extends _AbstractMeasure {
  uom: HeatFlowRateUomExt;
}
export interface HeatFlowRateMeasureExt extends _HeatFlowRateMeasureExt {}

export type HeatFlowRateUom =
  | "1E6 Btu[IT]/h"
  | "Btu[IT]/h"
  | "Btu[IT]/min"
  | "Btu[IT]/s"
  | "cal[th]/h"
  | "EJ/a"
  | "erg/a"
  | "GW"
  | "J/s"
  | "kcal[th]/h"
  | "kW"
  | "lbf.ft/min"
  | "lbf.ft/s"
  | "MJ/a"
  | "mW"
  | "MW"
  | "nW"
  | "quad/a"
  | "TJ/a"
  | "TW"
  | "ucal[th]/s"
  | "uW"
  | "W";
interface _HeatFlowRateUom extends _UomEnum {
  _: HeatFlowRateUom;
}

export type HeatFlowRateUomExt = string;
type _HeatFlowRateUomExt = Primitive._string;

interface _HeatTransferCoefficientMeasure extends _AbstractMeasure {
  uom: HeatTransferCoefficientUom;
}
export interface HeatTransferCoefficientMeasure
  extends _HeatTransferCoefficientMeasure {}

interface _HeatTransferCoefficientMeasureExt extends _AbstractMeasure {
  uom: HeatTransferCoefficientUomExt;
}
export interface HeatTransferCoefficientMeasureExt
  extends _HeatTransferCoefficientMeasureExt {}

export type HeatTransferCoefficientUom =
  | "Btu[IT]/(h.ft2.deltaF)"
  | "Btu[IT]/(h.ft2.deltaR)"
  | "Btu[IT]/(h.m2.deltaC)"
  | "Btu[IT]/(s.ft2.deltaF)"
  | "cal[th]/(h.cm2.deltaC)"
  | "cal[th]/(s.cm2.deltaC)"
  | "J/(s.m2.deltaC)"
  | "kcal[th]/(h.m2.deltaC)"
  | "kJ/(h.m2.deltaK)"
  | "kW/(m2.deltaK)"
  | "W/(m2.deltaK)";
interface _HeatTransferCoefficientUom extends _UomEnum {
  _: HeatTransferCoefficientUom;
}

export type HeatTransferCoefficientUomExt = string;
type _HeatTransferCoefficientUomExt = Primitive._string;

interface _HorizontalAxes extends BaseType {
  /** Direction of the axis. Commonly used for values such as "easting, northing, depth, etc.." */
  Direction1: AxisDirectionKind;
  Direction2: AxisDirectionKind;
  IsTime: boolean;
  Uom: LengthAndTimeUomExt;
}
export interface HorizontalAxes extends _HorizontalAxes {}

interface _HorizontalCoordinates extends BaseType {
  Coordinate1: number;
  Coordinate2: number;
}
export interface HorizontalCoordinates extends _HorizontalCoordinates {}

interface _IlluminanceMeasure extends _AbstractMeasure {
  uom: IlluminanceUom;
}
export interface IlluminanceMeasure extends _IlluminanceMeasure {}

interface _IlluminanceMeasureExt extends _AbstractMeasure {
  uom: IlluminanceUomExt;
}
export interface IlluminanceMeasureExt extends _IlluminanceMeasureExt {}

export type IlluminanceUom = "footcandle" | "klx" | "lm/m2" | "lx";
interface _IlluminanceUom extends _UomEnum {
  _: IlluminanceUom;
}

export type IlluminanceUomExt = string;
type _IlluminanceUomExt = Primitive._string;

/** Indexable elements for the different representations. The indexing of each element depends upon the specific representation.
 * To order and reference the elements of a representation, RESQML makes extensive use of the concept of indexing. Both one-dimensional and multi-dimensional arrays of elements are used. So that all elements may be referenced in a consistent and uniform fashion, each multi-dimensional index must have a well-defined 1D index.
 *
 * Attributes below identify the IndexableElements, though not all elements apply to all types of representations.
 *
 * Indexable elements are used to:
 * - attach geometry and properties to a representation.
 * - identify portions of a representation when expressing a representation identity.
 * - construct a sub-representation from an existing representation.
 *
 * For the table of indexable elements and the representations to which they apply, see the RESQML Technical Usage Guide. */
export type IndexableElement =
  | "cells"
  | "intervals from datum"
  | "column edges"
  | "columns"
  | "contacts"
  | "coordinate lines"
  | "edges"
  | "edges per column"
  | "enumerated elements"
  | "faces"
  | "faces per cell"
  | "interval edges"
  | "intervals"
  | "I0"
  | "I0 edges"
  | "J0"
  | "J0 edges"
  | "layers"
  | "lines"
  | "nodes"
  | "nodes per cell"
  | "nodes per edge"
  | "nodes per face"
  | "patches"
  | "pillars"
  | "regions"
  | "representation"
  | "subnodes"
  | "triangles";
interface _IndexableElement extends _TypeEnum {
  _: IndexableElement;
}

/** Specifies the direction of the index, whether decreasing, increasing or unordered. For secondary indexes, the direction depends on the direction of the primary index. Unordered is only for secondary indexes. */
export type IndexDirection = "decreasing" | "increasing" | "unordered";
interface _IndexDirection extends _TypeEnum {
  _: IndexDirection;
}

/** In the case that the ReferencedData is indexed and the conformance with the DataAssurance policy applies to a range within that index space, this class represents that range.
 *
 * The elements are string types because the index could be of numerous data types, including integer, float and date. */
interface _IndexRange extends BaseType {
  /** The maximum index for the range over which the referenced data's conformance with the policy is being assessed. */
  IndexMaximum: String64;
  /** The minimum index for the range over which the referenced data's conformance with the policy is being assessed. */
  IndexMinimum: String64;
}
export interface IndexRange extends _IndexRange {}

interface _InductanceMeasure extends _AbstractMeasure {
  uom: InductanceUom;
}
export interface InductanceMeasure extends _InductanceMeasure {}

interface _InductanceMeasureExt extends _AbstractMeasure {
  uom: InductanceUomExt;
}
export interface InductanceMeasureExt extends _InductanceMeasureExt {}

export type InductanceUom =
  | "cH"
  | "dH"
  | "EH"
  | "fH"
  | "GH"
  | "H"
  | "kH"
  | "MH"
  | "mH"
  | "nH"
  | "TH"
  | "uH";
interface _InductanceUom extends _UomEnum {
  _: InductanceUom;
}

export type InductanceUomExt = string;
type _InductanceUomExt = Primitive._string;

/** One-dimensional array of integer values obtained from the true elements of the Boolean mask. */
interface _IntegerArrayFromBooleanMaskArray extends _AbstractIntegerArray {
  CountPerValue: number;
  /** Boolean mask. A true element indicates that the index is included on the list of integer values. */
  Mask: AbstractBooleanArray;
}
export interface IntegerArrayFromBooleanMaskArray
  extends _IntegerArrayFromBooleanMaskArray {}

interface _IntegerArrayStatistics extends BaseType {
  MaximumValue?: number;
  MinimumValue?: number;
  ModePercentage?: number;
  ValidValueCount?: number;
  ValuesMedian?: number;
  ValuesMode?: number;
}
export interface IntegerArrayStatistics extends _IntegerArrayStatistics {}

/** Represents an array of integer values where all values are identical. This an optimization for which an array of explicit integer values is not required. */
interface _IntegerConstantArray extends _AbstractIntegerArray {
  /** Size of the array. */
  Count: PositiveLong;
  /** Values inside all the elements of the array. */
  Value: number;
}
export interface IntegerConstantArray extends _IntegerConstantArray {}

/** Array of integer values provided explicitly by an HDF5 dataset. The null value must be  explicitly provided in the NullValue attribute of this class. */
interface _IntegerExternalArray extends _AbstractIntegerArray {
  ArrayIntegerType: IntegerType;
  CountPerValue: number;
  NullValue: number;
  /** Reference to an HDF5 array of integers or doubles. */
  Values: ExternalDataArray;
}
export interface IntegerExternalArray extends _IntegerExternalArray {}

/** Represents an array of integers based on an origin and a multi-dimensional offset. The offset is based on a linearization of a multi-dimensional offset.
 *
 * If count(i) is the number of elements in the dimension i and offset(i) is the offset in the dimension i, then:
 * globalOffsetInNDimension = startValue+ ni*offset(n) + n_1i*count(n)*offset(n-1) + .... + 0i*count(n)*count(n-1)*....count(1)*offset(0) */
interface _IntegerLatticeArray extends _AbstractIntegerArray {
  Offset: IntegerConstantArray[];
  /** Value representing the global start for the lattice:
   * i.e., iStart + jStart*ni + kStart*ni*nj */
  StartValue: number;
}
export interface IntegerLatticeArray extends _IntegerLatticeArray {}

/** Key used to identify a parameter value associated with an integer value. */
interface _IntegerParameterKey extends _AbstractParameterKey {
  /** Integer value */
  Value: number;
}
export interface IntegerParameterKey extends _IntegerParameterKey {}

/** Parameter containing an integer value. */
interface _IntegerQuantityParameter extends _AbstractActivityParameter {
  /** Integer value */
  Value: number;
}
export interface IntegerQuantityParameter extends _IntegerQuantityParameter {}

export type IntegerType =
  | "arrayOfInt8"
  | "arrayOfUInt8"
  | "arrayOfInt16LE"
  | "arrayOfInt32LE"
  | "arrayOfInt64LE"
  | "arrayOfUInt16LE"
  | "arrayOfUInt32LE"
  | "arrayOfUInt64LE"
  | "arrayOfInt16BE"
  | "arrayOfInt32BE"
  | "arrayOfInt64BE"
  | "arrayOfUInt16BE"
  | "arrayOfUInt32BE"
  | "arrayOfUInt64BE";
interface _IntegerType extends _TypeEnum {
  _: IntegerType;
}

interface _IntegerXmlArray extends _AbstractIntegerArray {
  CountPerValue: number;
  NullValue: number;
  Values: IntegerXmlArrayList;
}
export interface IntegerXmlArray extends _IntegerXmlArray {}

export type IntegerXmlArrayList = number[];

interface _IsothermalCompressibilityMeasure extends _AbstractMeasure {
  uom: IsothermalCompressibilityUom;
}
export interface IsothermalCompressibilityMeasure
  extends _IsothermalCompressibilityMeasure {}

interface _IsothermalCompressibilityMeasureExt extends _AbstractMeasure {
  uom: IsothermalCompressibilityUomExt;
}
export interface IsothermalCompressibilityMeasureExt
  extends _IsothermalCompressibilityMeasureExt {}

export type IsothermalCompressibilityUom =
  | "dm3/(kW.h)"
  | "dm3/MJ"
  | "m3/(kW.h)"
  | "m3/J"
  | "mm3/J"
  | "pt[UK]/(hp.h)";
interface _IsothermalCompressibilityUom extends _UomEnum {
  _: IsothermalCompressibilityUom;
}

export type IsothermalCompressibilityUomExt = string;
type _IsothermalCompressibilityUomExt = Primitive._string;

/** Data storage object for an array of variable length 1D sub-arrays. The jagged array object consists of these two arrays:
 * - An aggregation of all the variable length sub-arrays into a single 1D array.
 * - The offsets into the single 1D array, given by the sum of all the sub-array lengths up to and including the current sub-array.
 * Often referred to as a "list-of-lists" or "array-of-arrays" construction.
 *
 * For example to store the following three arrays as a jagged array:
 * (a b c)
 * (d e f g)
 * (h)
 * Elements = (a b c d e f g h)
 * Cumulative Length = (3 7 8) */
interface _JaggedArray extends BaseType {
  /** 1D array of cumulative lengths to the end of the current sub-array. Each cumulative length is also equal to the index of the first element of the next sub-array, i.e., the index in the elements array for which the next variable length sub-array begins. */
  CumulativeLength: AbstractIntegerArray;
  /** 1D array of elements containing the aggregation of individual array data. */
  Elements: AbstractValueArray;
}
export interface JaggedArray extends _JaggedArray {}

interface _KinematicViscosityMeasure extends _AbstractMeasure {
  uom: KinematicViscosityUom;
}
export interface KinematicViscosityMeasure extends _KinematicViscosityMeasure {}

interface _KinematicViscosityMeasureExt extends _AbstractMeasure {
  uom: KinematicViscosityUomExt;
}
export interface KinematicViscosityMeasureExt
  extends _KinematicViscosityMeasureExt {}

export type KinematicViscosityUom =
  | "cm2/s"
  | "cSt"
  | "ft2/h"
  | "ft2/s"
  | "in2/s"
  | "m2/h"
  | "m2/s"
  | "mm2/s"
  | "Pa.s.m3/kg"
  | "St";
interface _KinematicViscosityUom extends _UomEnum {
  _: KinematicViscosityUom;
}

export type KinematicViscosityUomExt = string;
type _KinematicViscosityUomExt = Primitive._string;

export type LegacyMassPerVolumeUom = "kg/scm" | "lbm/1000scf" | "lbm/1E6scf";
interface _LegacyMassPerVolumeUom extends _UomEnum {
  _: LegacyMassPerVolumeUom;
}

export type LegacyPressurePerVolumeUom =
  | "Pa/scm"
  | "psi/1000scf"
  | "psi/1E6scf";
interface _LegacyPressurePerVolumeUom extends _UomEnum {
  _: LegacyPressurePerVolumeUom;
}

export type LegacyPressureUom = "psia" | "psig";
interface _LegacyPressureUom extends _UomEnum {
  _: LegacyPressureUom;
}

export type LegacyUnitOfMeasure =
  | "1000scf/d"
  | "1000scf/mo"
  | "1000scf/stb"
  | "1000scm"
  | "1000scm/d"
  | "1000scm/mo"
  | "1000stb"
  | "1000stb/d"
  | "1000stb/mo"
  | "1E6scf"
  | "1E6scf/d"
  | "1E6scf/mo"
  | "1E6scf/stb"
  | "1E6scm"
  | "1E6scm/d"
  | "1E6scm/mo"
  | "1E6stb"
  | "1E6stb/acre"
  | "1E6stb/acre.ft"
  | "1E6stb/d"
  | "1E6stb/mo"
  | "1E9scf"
  | "acre.ft/1E6stb"
  | "bbl/1000scf"
  | "bbl/1E6scf"
  | "bbl/scf"
  | "bbl/stb"
  | "ft3/scf"
  | "ft3/stb"
  | "galUS/1000scf"
  | "kg/scm"
  | "kscf"
  | "lbm/1000scf"
  | "lbm/1E6scf"
  | "m3/scm"
  | "ml/scm"
  | "Pa/scm"
  | "psi/1000scf"
  | "psi/1E6scf"
  | "psia"
  | "psig"
  | "scf"
  | "scf/bbl"
  | "scf/d"
  | "scf/ft2"
  | "scf/ft3"
  | "scf/scf"
  | "scf/stb"
  | "scm"
  | "scm/d"
  | "scm/h"
  | "scm/m2"
  | "scm/m3"
  | "scm/mo"
  | "scm/s"
  | "scm/scm"
  | "scm/stb"
  | "stb"
  | "stb/1000scf"
  | "stb/1000scm"
  | "stb/1E6scf"
  | "stb/1E6scm"
  | "stb/acre"
  | "stb/bbl"
  | "stb/d"
  | "stb/mo"
  | "stb/scm"
  | "stb/stb";
interface _LegacyUnitOfMeasure extends _UomEnum {
  _: LegacyUnitOfMeasure;
}

export type LegacyVolumePerAreaUom =
  | "1E6stb/acre"
  | "scf/ft2"
  | "scm/m2"
  | "stb/acre";
interface _LegacyVolumePerAreaUom extends _UomEnum {
  _: LegacyVolumePerAreaUom;
}

export type LegacyVolumePerTimeUom =
  | "1000scf/d"
  | "1000scf/mo"
  | "1000scm/d"
  | "1000scm/mo"
  | "1000stb/d"
  | "1000stb/mo"
  | "1E6scf/d"
  | "1E6scf/mo"
  | "1E6scm/d"
  | "1E6scm/mo"
  | "1E6stb/d"
  | "1E6stb/mo"
  | "scf/d"
  | "scm/d"
  | "scm/h"
  | "scm/mo"
  | "scm/s"
  | "stb/d"
  | "stb/mo";
interface _LegacyVolumePerTimeUom extends _UomEnum {
  _: LegacyVolumePerTimeUom;
}

export type LegacyVolumePerVolumeUom =
  | "1000scf/stb"
  | "1E6scf/stb"
  | "1E6stb/acre.ft"
  | "acre.ft/1E6stb"
  | "bbl/1000scf"
  | "bbl/1E6scf"
  | "bbl/scf"
  | "bbl/stb"
  | "ft3/scf"
  | "ft3/stb"
  | "galUS/1000scf"
  | "m3/scm"
  | "ml/scm"
  | "scf/bbl"
  | "scf/ft3"
  | "scf/scf"
  | "scf/stb"
  | "scm/m3"
  | "scm/scm"
  | "scm/stb"
  | "stb/1000scf"
  | "stb/1000scm"
  | "stb/1E6scf"
  | "stb/1E6scm"
  | "stb/bbl"
  | "stb/scm"
  | "stb/stb";
interface _LegacyVolumePerVolumeUom extends _UomEnum {
  _: LegacyVolumePerVolumeUom;
}

export type LegacyVolumeUom =
  | "1000scm"
  | "1000stb"
  | "1E6scf"
  | "1E6scm"
  | "1E6stb"
  | "1E9scf"
  | "kscf"
  | "scf"
  | "scm"
  | "stb";
interface _LegacyVolumeUom extends _UomEnum {
  _: LegacyVolumeUom;
}

/** This is a union of the units of measure for both length and time, plus the extensibility pattern.
 *
 * Use of this will allow an attribute to validate on either time or depth (or lateral distance) units. */
export type LengthAndTimeUomExt = string;
type _LengthAndTimeUomExt = Primitive._string;

interface _LengthMeasure extends _AbstractMeasure {
  uom: LengthUom;
}
export interface LengthMeasure extends _LengthMeasure {}

interface _LengthMeasureExt extends _AbstractMeasure {
  uom: LengthUomExt;
}
export interface LengthMeasureExt extends _LengthMeasureExt {}

export type LengthOrTimeMeasureExt = number;
type _LengthOrTimeMeasureExt = _AbstractMeasure;

interface _LengthPerAngleMeasure extends _AbstractMeasure {
  uom: LengthPerAngleUom;
}
export interface LengthPerAngleMeasure extends _LengthPerAngleMeasure {}

interface _LengthPerAngleMeasureExt extends _AbstractMeasure {
  uom: LengthPerAngleUomExt;
}
export interface LengthPerAngleMeasureExt extends _LengthPerAngleMeasureExt {}

export type LengthPerAngleUom =
  | "m/rad"
  | "100 ft/dega"
  | "30 ft/dega"
  | "30 m/dega"
  | "ft/dega"
  | "m/dega"
  | "ft/rad"
  | "ft/rev"
  | "m/rev";
interface _LengthPerAngleUom extends _UomEnum {
  _: LengthPerAngleUom;
}

export type LengthPerAngleUomExt = string;
type _LengthPerAngleUomExt = Primitive._string;

interface _LengthPerLengthMeasure extends _AbstractMeasure {
  uom: LengthPerLengthUom;
}
export interface LengthPerLengthMeasure extends _LengthPerLengthMeasure {}

interface _LengthPerLengthMeasureExt extends _AbstractMeasure {
  uom: LengthPerLengthUomExt;
}
export interface LengthPerLengthMeasureExt extends _LengthPerLengthMeasureExt {}

export type LengthPerLengthUom =
  | "%"
  | "0.01 ft/ft"
  | "1/30 m/m"
  | "Euc"
  | "ft/ft"
  | "ft/in"
  | "ft/m"
  | "ft/mi"
  | "km/cm"
  | "m/cm"
  | "m/km"
  | "m/m"
  | "mi/in";
interface _LengthPerLengthUom extends _UomEnum {
  _: LengthPerLengthUom;
}

export type LengthPerLengthUomExt = string;
type _LengthPerLengthUomExt = Primitive._string;

interface _LengthPerMassMeasure extends _AbstractMeasure {
  uom: LengthPerMassUom;
}
export interface LengthPerMassMeasure extends _LengthPerMassMeasure {}

interface _LengthPerMassMeasureExt extends _AbstractMeasure {
  uom: LengthPerMassUomExt;
}
export interface LengthPerMassMeasureExt extends _LengthPerMassMeasureExt {}

export type LengthPerMassUom = "ft/lbm" | "m/kg";
interface _LengthPerMassUom extends _UomEnum {
  _: LengthPerMassUom;
}

export type LengthPerMassUomExt = string;
type _LengthPerMassUomExt = Primitive._string;

interface _LengthPerPressureMeasure extends _AbstractMeasure {
  uom: LengthPerPressureUom;
}
export interface LengthPerPressureMeasure extends _LengthPerPressureMeasure {}

interface _LengthPerPressureMeasureExt extends _AbstractMeasure {
  uom: LengthPerPressureUomExt;
}
export interface LengthPerPressureMeasureExt
  extends _LengthPerPressureMeasureExt {}

export type LengthPerPressureUom = "ft/psi" | "m/kPa" | "m/Pa";
interface _LengthPerPressureUom extends _UomEnum {
  _: LengthPerPressureUom;
}

export type LengthPerPressureUomExt = string;
type _LengthPerPressureUomExt = Primitive._string;

interface _LengthPerTemperatureMeasure extends _AbstractMeasure {
  uom: LengthPerTemperatureUom;
}
export interface LengthPerTemperatureMeasure
  extends _LengthPerTemperatureMeasure {}

interface _LengthPerTemperatureMeasureExt extends _AbstractMeasure {
  uom: LengthPerTemperatureUomExt;
}
export interface LengthPerTemperatureMeasureExt
  extends _LengthPerTemperatureMeasureExt {}

export type LengthPerTemperatureUom = "ft/deltaF" | "m/deltaK";
interface _LengthPerTemperatureUom extends _UomEnum {
  _: LengthPerTemperatureUom;
}

export type LengthPerTemperatureUomExt = string;
type _LengthPerTemperatureUomExt = Primitive._string;

interface _LengthPerTimeMeasure extends _AbstractMeasure {
  uom: LengthPerTimeUom;
}
export interface LengthPerTimeMeasure extends _LengthPerTimeMeasure {}

interface _LengthPerTimeMeasureExt extends _AbstractMeasure {
  uom: LengthPerTimeUomExt;
}
export interface LengthPerTimeMeasureExt extends _LengthPerTimeMeasureExt {}

export type LengthPerTimeUom =
  | "1000 ft/h"
  | "1000 ft/s"
  | "cm/a"
  | "cm/s"
  | "dm/s"
  | "ft/d"
  | "ft/h"
  | "ft/min"
  | "ft/ms"
  | "ft/s"
  | "ft/us"
  | "in/a"
  | "in/min"
  | "in/s"
  | "km/h"
  | "km/s"
  | "knot"
  | "m/d"
  | "m/h"
  | "m/min"
  | "m/ms"
  | "m/s"
  | "mi/h"
  | "mil/a"
  | "mm/a"
  | "mm/s"
  | "nm/s"
  | "um/s";
interface _LengthPerTimeUom extends _UomEnum {
  _: LengthPerTimeUom;
}

export type LengthPerTimeUomExt = string;
type _LengthPerTimeUomExt = Primitive._string;

interface _LengthPerVolumeMeasure extends _AbstractMeasure {
  uom: LengthPerVolumeUom;
}
export interface LengthPerVolumeMeasure extends _LengthPerVolumeMeasure {}

interface _LengthPerVolumeMeasureExt extends _AbstractMeasure {
  uom: LengthPerVolumeUomExt;
}
export interface LengthPerVolumeMeasureExt extends _LengthPerVolumeMeasureExt {}

export type LengthPerVolumeUom =
  | "ft/bbl"
  | "ft/ft3"
  | "ft/gal[US]"
  | "km/dm3"
  | "km/L"
  | "m/m3"
  | "mi/gal[UK]"
  | "mi/gal[US]";
interface _LengthPerVolumeUom extends _UomEnum {
  _: LengthPerVolumeUom;
}

export type LengthPerVolumeUomExt = string;
type _LengthPerVolumeUomExt = Primitive._string;

export type LengthUom =
  | "0.1 ft"
  | "0.1 ft[US]"
  | "0.1 in"
  | "0.1 yd"
  | "1/16 in"
  | "1/2 ft"
  | "1/32 in"
  | "1/64 in"
  | "10 ft"
  | "10 in"
  | "10 km"
  | "100 ft"
  | "100 km"
  | "1000 ft"
  | "30 ft"
  | "30 m"
  | "angstrom"
  | "chain"
  | "chain[BnA]"
  | "chain[BnB]"
  | "chain[Cla]"
  | "chain[Ind37]"
  | "chain[Se]"
  | "chain[SeT]"
  | "chain[US]"
  | "cm"
  | "dam"
  | "dm"
  | "Em"
  | "fathom"
  | "fm"
  | "ft"
  | "ft[BnA]"
  | "ft[BnB]"
  | "ft[Br36]"
  | "ft[Br65]"
  | "ft[Cla]"
  | "ft[GC]"
  | "ft[Ind]"
  | "ft[Ind37]"
  | "ft[Ind62]"
  | "ft[Ind75]"
  | "ft[Se]"
  | "ft[SeT]"
  | "ft[US]"
  | "fur[US]"
  | "Gm"
  | "hm"
  | "in"
  | "in[US]"
  | "km"
  | "link"
  | "link[BnA]"
  | "link[BnB]"
  | "link[Cla]"
  | "link[Se]"
  | "link[SeT]"
  | "link[US]"
  | "m"
  | "m[Ger]"
  | "mi"
  | "mi[naut]"
  | "mi[nautUK]"
  | "mi[US]"
  | "mil"
  | "mm"
  | "Mm"
  | "nm"
  | "pm"
  | "rod[US]"
  | "Tm"
  | "um"
  | "yd"
  | "yd[BnA]"
  | "yd[BnB]"
  | "yd[Cla]"
  | "yd[Ind]"
  | "yd[Ind37]"
  | "yd[Ind62]"
  | "yd[Ind75]"
  | "yd[Se]"
  | "yd[SeT]"
  | "yd[US]";
interface _LengthUom extends _UomEnum {
  _: LengthUom;
}

export type LengthUomExt = string;
type _LengthUomExt = Primitive._string;

interface _LightExposureMeasure extends _AbstractMeasure {
  uom: LightExposureUom;
}
export interface LightExposureMeasure extends _LightExposureMeasure {}

interface _LightExposureMeasureExt extends _AbstractMeasure {
  uom: LightExposureUomExt;
}
export interface LightExposureMeasureExt extends _LightExposureMeasureExt {}

export type LightExposureUom = "footcandle.s" | "lx.s";
interface _LightExposureUom extends _UomEnum {
  _: LightExposureUom;
}

export type LightExposureUomExt = string;
type _LightExposureUomExt = Primitive._string;

interface _LinearAccelerationMeasure extends _AbstractMeasure {
  uom: LinearAccelerationUom;
}
export interface LinearAccelerationMeasure extends _LinearAccelerationMeasure {}

interface _LinearAccelerationMeasureExt extends _AbstractMeasure {
  uom: LinearAccelerationUomExt;
}
export interface LinearAccelerationMeasureExt
  extends _LinearAccelerationMeasureExt {}

export type LinearAccelerationUom =
  | "cm/s2"
  | "ft/s2"
  | "Gal"
  | "gn"
  | "in/s2"
  | "m/s2"
  | "mGal"
  | "mgn";
interface _LinearAccelerationUom extends _UomEnum {
  _: LinearAccelerationUom;
}

export type LinearAccelerationUomExt = string;
type _LinearAccelerationUomExt = Primitive._string;

interface _LinearThermalExpansionMeasure extends _AbstractMeasure {
  uom: LinearThermalExpansionUom;
}
export interface LinearThermalExpansionMeasure
  extends _LinearThermalExpansionMeasure {}

interface _LinearThermalExpansionMeasureExt extends _AbstractMeasure {
  uom: LinearThermalExpansionUomExt;
}
export interface LinearThermalExpansionMeasureExt
  extends _LinearThermalExpansionMeasureExt {}

export type LinearThermalExpansionUom =
  | "1/deltaK"
  | "in/(in.deltaF)"
  | "m/(m.deltaK)"
  | "mm/(mm.deltaK)";
interface _LinearThermalExpansionUom extends _UomEnum {
  _: LinearThermalExpansionUom;
}

export type LinearThermalExpansionUomExt = string;
type _LinearThermalExpansionUomExt = Primitive._string;

/** A description of minerals or accessories that constitute a fractional part of a lithology description */
export type LithologyKind =
  | "alkali feldspar rhyolite"
  | "alkali olivine basalt"
  | "amphibolite"
  | "andesite"
  | "anhydrite"
  | "anorthositic rock"
  | "anthracite"
  | "aplite"
  | "arenite"
  | "argillaceous"
  | "arkose"
  | "basalt"
  | "basanite"
  | "bauxite"
  | "bituminous coal"
  | "blueschist metamorphic rock"
  | "boninite"
  | "breccia"
  | "carbonate ooze"
  | "carbonatite"
  | "chalk"
  | "chert"
  | "clay"
  | "claystone"
  | "coal"
  | "conglomerate"
  | "dacite"
  | "diabase"
  | "diamictite"
  | "diorite"
  | "dioritoid"
  | "doleritic rock"
  | "dolomite"
  | "dolomitic"
  | "eclogite"
  | "exotic alkaline rock"
  | "feldspar"
  | "feldspathic arenite"
  | "fine grained igneous rock"
  | "foid dioritoid"
  | "foid gabbroid"
  | "foid syenitoid"
  | "foidite"
  | "foiditoid"
  | "foidolite"
  | "foliated metamorphic rock"
  | "fragmental igneous rock"
  | "gabbro"
  | "gabbroic rock"
  | "gabbroid"
  | "glauconite"
  | "gneiss"
  | "granite"
  | "granodiorite"
  | "granofels"
  | "granulite"
  | "gravel"
  | "greenstone"
  | "gumbo"
  | "gypsum"
  | "halite"
  | "hornfels"
  | "igneous rock"
  | "impact generated material"
  | "impure dolomite"
  | "impure limestone"
  | "intrusive rock (plutonic)"
  | "iron rich sedimentary rock"
  | "kalsilitic and melilitic rocks"
  | "komatiitic rock"
  | "latitic rock"
  | "lignite"
  | "lime boundstone"
  | "lime framestone"
  | "lime grainstone"
  | "lime mudstone"
  | "lime packstone"
  | "lime wackestone"
  | "limestone"
  | "marble"
  | "marl"
  | "metamorphic rock"
  | "mica schist"
  | "migmatite"
  | "monzogabbro"
  | "mud"
  | "mudstone"
  | "mylonitic rock"
  | "no description"
  | "no sample"
  | "ooze"
  | "ophiolite"
  | "organic bearing mudstone"
  | "peat"
  | "pegmatite"
  | "peridotite"
  | "phaneritic igneous rock"
  | "phonolite"
  | "phonolitoid"
  | "phosphate"
  | "phosphate rock"
  | "phyllite"
  | "porphyry"
  | "potassium and magnesium salts"
  | "pyroclastic breccia"
  | "pyroclastic rock"
  | "pyroxenite"
  | "quartz arenite"
  | "quartzite"
  | "rhyolite"
  | "rock salt"
  | "sand"
  | "sandstone"
  | "sandy"
  | "sapropel"
  | "schist"
  | "serpentinite"
  | "shale"
  | "siliceous ooze"
  | "silt"
  | "siltstone"
  | "skarn"
  | "slate"
  | "spilite"
  | "syenite"
  | "syenitoid"
  | "sylvite"
  | "tephrite"
  | "tephritoid"
  | "tholeiitic basalt"
  | "tonalite"
  | "trachyte"
  | "trachytic rock"
  | "trachytoid"
  | "travertine"
  | "tuff"
  | "tuffite"
  | "ultrabasic"
  | "undifferentiated"
  | "unknown"
  | "wacke";
interface _LithologyKind extends _TypeEnum {
  _: LithologyKind;
}

export type LithologyKindExt = string;
type _LithologyKindExt = Primitive._string;

export type LithologyQualifierKind =
  | "alkali feldspar rhyolite"
  | "alkali olivine basalt"
  | "amphibolite"
  | "amphibolitic"
  | "andesite"
  | "andesitic"
  | "anhydrite"
  | "anhydritic"
  | "ankerite"
  | "ankeritic"
  | "anorthositic rock"
  | "anthracite"
  | "anthracitic"
  | "aplite"
  | "aplitic"
  | "arenite"
  | "arenitic"
  | "argillaceous"
  | "arkose"
  | "arkosic"
  | "barite"
  | "baritic"
  | "basalt"
  | "basaltic"
  | "basanite"
  | "basanitic"
  | "bauxite"
  | "bauxitic"
  | "belemnites"
  | "belemnitic"
  | "bioturbated"
  | "bioturbation"
  | "bitumen"
  | "bituminous"
  | "bituminous coal"
  | "blueschist metamorphic rock"
  | "boninite"
  | "breccia"
  | "brecciated"
  | "bryozoan"
  | "bryozoans"
  | "burrowed"
  | "burrows"
  | "calcareous"
  | "calcite"
  | "calcite concretion"
  | "calcitic"
  | "carbonaceous"
  | "carbonate ooze"
  | "carbonatite"
  | "carbonatitic"
  | "chalk"
  | "chalky"
  | "chamosite"
  | "chamositic"
  | "chert"
  | "cherty"
  | "chlorite"
  | "chloritic"
  | "clay"
  | "claystone"
  | "coal"
  | "concretionary"
  | "concretions"
  | "conglomerate"
  | "conglomeratic"
  | "coral fragments"
  | "coralline"
  | "crinoidal"
  | "crinoids"
  | "dacite"
  | "dacitic"
  | "diabase"
  | "diabasic"
  | "diamictite"
  | "diamictitic"
  | "diatomaceous"
  | "diatoms"
  | "diorite"
  | "dioritic"
  | "dioritoid"
  | "dioritoidic"
  | "doleritic rock"
  | "dolomite"
  | "dolomite concretion"
  | "dolomite stringer"
  | "dolomitic"
  | "eclogite"
  | "eclogitic"
  | "exotic alkaline rock"
  | "feldspar"
  | "feldsparic"
  | "feldspathic"
  | "feldspathic arenite"
  | "ferruginous"
  | "fine grained igneous rock"
  | "foid dioritoid"
  | "foid gabbroid"
  | "foid syenitoid"
  | "foidite"
  | "foiditic"
  | "foiditoid"
  | "foidolite"
  | "foidolitic"
  | "foliated metamorphic rock"
  | "foraminifera"
  | "foraminiferous"
  | "forams"
  | "fossil fragments"
  | "fossiliferous"
  | "fossils undifferentiated"
  | "fragmental igneous rock"
  | "gabbro"
  | "gabbroic"
  | "gabbroic rock"
  | "gabbroid"
  | "gabbroidic"
  | "gilsonite"
  | "gilsonitic"
  | "glauconite"
  | "glauconitic"
  | "gneiss"
  | "gneissic"
  | "granite"
  | "granitic"
  | "granodiorite"
  | "granodioritic"
  | "granofels"
  | "granulite"
  | "granulitic"
  | "gravel"
  | "gravelly"
  | "greenstone"
  | "gumbo"
  | "gypsiferous"
  | "gypsum"
  | "halite"
  | "halitic"
  | "hornfels"
  | "hornfelsic"
  | "igneous"
  | "igneous rock"
  | "illite"
  | "illitic"
  | "impact generated material"
  | "impure dolomite"
  | "impure limestone"
  | "intrusive rock (plutonic)"
  | "iron rich sedimentary rock"
  | "kalsilitic and melilitic rocks"
  | "kaolinite"
  | "kaolinitic"
  | "komatiitic rock"
  | "latitic rock"
  | "lignite"
  | "lignitic"
  | "lime boundstone"
  | "lime framestone"
  | "lime grainstone"
  | "lime mudstone"
  | "lime packstone"
  | "lime wackestone"
  | "limestone"
  | "limestone stringer"
  | "lithic"
  | "lithic fragments"
  | "marble"
  | "marcasite"
  | "marcasitic"
  | "marl"
  | "marly"
  | "metamorphic rock"
  | "mica"
  | "mica schist"
  | "micaceous"
  | "microfossiliferous"
  | "microfossils"
  | "migmatite"
  | "migmatitic"
  | "monzogabbro"
  | "monzogabbroic"
  | "mud"
  | "muddy"
  | "mudstone"
  | "mylonitic rock"
  | "no sample"
  | "oncolite"
  | "oncoliths"
  | "oncolitic"
  | "ooids"
  | "ooliths"
  | "oolitic"
  | "ooze"
  | "ophiolite"
  | "ophiolitic"
  | "organic bearing mudstone"
  | "ostracodal"
  | "ostracods"
  | "peat"
  | "peaty"
  | "pebble"
  | "pebbly"
  | "pegmatite"
  | "pegmatitic"
  | "pelletal"
  | "pellets"
  | "peloidal"
  | "peloids"
  | "peridotite"
  | "peridotitic"
  | "phaneritic igneous rock"
  | "phonolite"
  | "phonolitic"
  | "phonolitoid"
  | "phosphate"
  | "phosphate rock"
  | "phosphatic"
  | "phyllite"
  | "phyllitic"
  | "pisolite"
  | "pisoliths"
  | "pisolitic"
  | "plant remains"
  | "porphyritic"
  | "porphyry"
  | "potassium and magnesium salts"
  | "pyrite"
  | "pyritic"
  | "pyroclastic breccia"
  | "pyroclastic rock"
  | "pyroxenite"
  | "pyroxenitic"
  | "quartiferous"
  | "quartz"
  | "quartz arenite"
  | "quartzite"
  | "quartzitic"
  | "radiolaria"
  | "radiolarian"
  | "rhyolite"
  | "rhyolitic"
  | "rock salt"
  | "rootlets"
  | "salty"
  | "sand"
  | "sandstone"
  | "sandy"
  | "sapropel"
  | "sapropelic"
  | "schist"
  | "schisty"
  | "sepentinitic"
  | "serpentinite"
  | "shale"
  | "shaly"
  | "shell fragments"
  | "shelly"
  | "siderite"
  | "siderite concretion"
  | "sideritic"
  | "siliceous ooze"
  | "silt"
  | "siltstone"
  | "silty"
  | "skarn"
  | "skarny"
  | "slate"
  | "slaty"
  | "smectite"
  | "smectitic"
  | "spicular"
  | "spicules"
  | "spilite"
  | "spilitic"
  | "stylolites"
  | "stylolitic"
  | "syenite"
  | "syenitic"
  | "syenitoid"
  | "sylvite"
  | "sylvitic"
  | "tarry"
  | "tephrite"
  | "tephritic"
  | "tephritoid"
  | "tholeiitic basalt"
  | "tonalite"
  | "tonalitic"
  | "trachyte"
  | "trachytic"
  | "trachytic rock"
  | "trachytoid"
  | "travertine"
  | "tuff"
  | "tuffaceous"
  | "tuffite"
  | "tuffitic"
  | "ultrabasic"
  | "undifferentiated"
  | "unknown"
  | "wacke";
interface _LithologyQualifierKind extends _TypeEnum {
  _: LithologyQualifierKind;
}

export type LithologyQualifierKindExt = string;
type _LithologyQualifierKindExt = Primitive._string;

/** Specifies the unit of lithostratigraphy. */
export type LithostratigraphicRank = "group" | "formation" | "member" | "bed";
interface _LithostratigraphicRank extends _TypeEnum {
  _: LithostratigraphicRank;
}

interface _LocalEngineering2dCrs extends _Cartesian2dCrs {
  Azimuth: PlaneAngleMeasureExt;
  AzimuthReference: NorthReferenceKind;
  HorizontalAxes: HorizontalAxes;
  OriginProjectedCoordinate1: number;
  OriginProjectedCoordinate2: number;
  OriginProjectedCrs: ProjectedCrs;
}
export interface LocalEngineering2dCrs extends _LocalEngineering2dCrs {}

interface _LocalEngineering2dPosition extends _AbstractCartesian2dPosition {
  LocalEngineering2dCrs: DataObjectReference;
}
export interface LocalEngineering2dPosition
  extends _LocalEngineering2dPosition {}

interface _LocalEngineering3dPosition extends _Abstract3dPosition {
  Coordinate1: number;
  Coordinate2: number;
  VerticalCoordinate: number;
}
export interface LocalEngineering3dPosition
  extends _LocalEngineering3dPosition {}

/** A local Engineering compound CRS is based on a LocalEngineering2dCRS + a vertical CRS. */
interface _LocalEngineeringCompoundCrs extends _AbstractCompoundCrs {
  LocalEngineering2dCrs: DataObjectReference;
  OriginUncertaintyVectorAtOneSigma?: Vector;
  /** Vertical coordinate of the origin of the local engineering CRS in the base vertical CRS (consequently in the uom of the base vertical CRS) */
  OriginVerticalCoordinate: number;
  VerticalAxis: VerticalAxis;
}
export interface LocalEngineeringCompoundCrs
  extends _LocalEngineeringCompoundCrs {}

interface _LogarithmicPowerRatioMeasure extends _AbstractMeasure {
  uom: LogarithmicPowerRatioUom;
}
export interface LogarithmicPowerRatioMeasure
  extends _LogarithmicPowerRatioMeasure {}

interface _LogarithmicPowerRatioMeasureExt extends _AbstractMeasure {
  uom: LogarithmicPowerRatioUomExt;
}
export interface LogarithmicPowerRatioMeasureExt
  extends _LogarithmicPowerRatioMeasureExt {}

interface _LogarithmicPowerRatioPerLengthMeasure extends _AbstractMeasure {
  uom: LogarithmicPowerRatioPerLengthUom;
}
export interface LogarithmicPowerRatioPerLengthMeasure
  extends _LogarithmicPowerRatioPerLengthMeasure {}

interface _LogarithmicPowerRatioPerLengthMeasureExt extends _AbstractMeasure {
  uom: LogarithmicPowerRatioPerLengthUomExt;
}
export interface LogarithmicPowerRatioPerLengthMeasureExt
  extends _LogarithmicPowerRatioPerLengthMeasureExt {}

export type LogarithmicPowerRatioPerLengthUom =
  | "B/m"
  | "dB/ft"
  | "dB/km"
  | "dB/m";
interface _LogarithmicPowerRatioPerLengthUom extends _UomEnum {
  _: LogarithmicPowerRatioPerLengthUom;
}

export type LogarithmicPowerRatioPerLengthUomExt = string;
type _LogarithmicPowerRatioPerLengthUomExt = Primitive._string;

export type LogarithmicPowerRatioUom = "B" | "dB";
interface _LogarithmicPowerRatioUom extends _UomEnum {
  _: LogarithmicPowerRatioUom;
}

export type LogarithmicPowerRatioUomExt = string;
type _LogarithmicPowerRatioUomExt = Primitive._string;

interface _LuminanceMeasure extends _AbstractMeasure {
  uom: LuminanceUom;
}
export interface LuminanceMeasure extends _LuminanceMeasure {}

interface _LuminanceMeasureExt extends _AbstractMeasure {
  uom: LuminanceUomExt;
}
export interface LuminanceMeasureExt extends _LuminanceMeasureExt {}

export type LuminanceUom = "cd/m2";
interface _LuminanceUom extends _UomEnum {
  _: LuminanceUom;
}

export type LuminanceUomExt = string;
type _LuminanceUomExt = Primitive._string;

interface _LuminousEfficacyMeasure extends _AbstractMeasure {
  uom: LuminousEfficacyUom;
}
export interface LuminousEfficacyMeasure extends _LuminousEfficacyMeasure {}

interface _LuminousEfficacyMeasureExt extends _AbstractMeasure {
  uom: LuminousEfficacyUomExt;
}
export interface LuminousEfficacyMeasureExt
  extends _LuminousEfficacyMeasureExt {}

export type LuminousEfficacyUom = "lm/W";
interface _LuminousEfficacyUom extends _UomEnum {
  _: LuminousEfficacyUom;
}

export type LuminousEfficacyUomExt = string;
type _LuminousEfficacyUomExt = Primitive._string;

interface _LuminousFluxMeasure extends _AbstractMeasure {
  uom: LuminousFluxUom;
}
export interface LuminousFluxMeasure extends _LuminousFluxMeasure {}

interface _LuminousFluxMeasureExt extends _AbstractMeasure {
  uom: LuminousFluxUomExt;
}
export interface LuminousFluxMeasureExt extends _LuminousFluxMeasureExt {}

export type LuminousFluxUom = "lm";
interface _LuminousFluxUom extends _UomEnum {
  _: LuminousFluxUom;
}

export type LuminousFluxUomExt = string;
type _LuminousFluxUomExt = Primitive._string;

interface _LuminousIntensityMeasure extends _AbstractMeasure {
  uom: LuminousIntensityUom;
}
export interface LuminousIntensityMeasure extends _LuminousIntensityMeasure {}

interface _LuminousIntensityMeasureExt extends _AbstractMeasure {
  uom: LuminousIntensityUomExt;
}
export interface LuminousIntensityMeasureExt
  extends _LuminousIntensityMeasureExt {}

export type LuminousIntensityUom = "cd" | "kcd";
interface _LuminousIntensityUom extends _UomEnum {
  _: LuminousIntensityUom;
}

export type LuminousIntensityUomExt = string;
type _LuminousIntensityUomExt = Primitive._string;

interface _MagneticDipoleMomentMeasure extends _AbstractMeasure {
  uom: MagneticDipoleMomentUom;
}
export interface MagneticDipoleMomentMeasure
  extends _MagneticDipoleMomentMeasure {}

interface _MagneticDipoleMomentMeasureExt extends _AbstractMeasure {
  uom: MagneticDipoleMomentUomExt;
}
export interface MagneticDipoleMomentMeasureExt
  extends _MagneticDipoleMomentMeasureExt {}

export type MagneticDipoleMomentUom = "Wb.m";
interface _MagneticDipoleMomentUom extends _UomEnum {
  _: MagneticDipoleMomentUom;
}

export type MagneticDipoleMomentUomExt = string;
type _MagneticDipoleMomentUomExt = Primitive._string;

interface _MagneticFieldStrengthMeasure extends _AbstractMeasure {
  uom: MagneticFieldStrengthUom;
}
export interface MagneticFieldStrengthMeasure
  extends _MagneticFieldStrengthMeasure {}

interface _MagneticFieldStrengthMeasureExt extends _AbstractMeasure {
  uom: MagneticFieldStrengthUomExt;
}
export interface MagneticFieldStrengthMeasureExt
  extends _MagneticFieldStrengthMeasureExt {}

export type MagneticFieldStrengthUom = "A/m" | "A/mm" | "Oe";
interface _MagneticFieldStrengthUom extends _UomEnum {
  _: MagneticFieldStrengthUom;
}

export type MagneticFieldStrengthUomExt = string;
type _MagneticFieldStrengthUomExt = Primitive._string;

interface _MagneticFluxDensityMeasure extends _AbstractMeasure {
  uom: MagneticFluxDensityUom;
}
export interface MagneticFluxDensityMeasure
  extends _MagneticFluxDensityMeasure {}

interface _MagneticFluxDensityMeasureExt extends _AbstractMeasure {
  uom: MagneticFluxDensityUomExt;
}
export interface MagneticFluxDensityMeasureExt
  extends _MagneticFluxDensityMeasureExt {}

interface _MagneticFluxDensityPerLengthMeasure extends _AbstractMeasure {
  uom: MagneticFluxDensityPerLengthUom;
}
export interface MagneticFluxDensityPerLengthMeasure
  extends _MagneticFluxDensityPerLengthMeasure {}

interface _MagneticFluxDensityPerLengthMeasureExt extends _AbstractMeasure {
  uom: MagneticFluxDensityPerLengthUomExt;
}
export interface MagneticFluxDensityPerLengthMeasureExt
  extends _MagneticFluxDensityPerLengthMeasureExt {}

export type MagneticFluxDensityPerLengthUom = "gauss/cm" | "mT/dm" | "T/m";
interface _MagneticFluxDensityPerLengthUom extends _UomEnum {
  _: MagneticFluxDensityPerLengthUom;
}

export type MagneticFluxDensityPerLengthUomExt = string;
type _MagneticFluxDensityPerLengthUomExt = Primitive._string;

export type MagneticFluxDensityUom =
  | "cgauss"
  | "cT"
  | "dgauss"
  | "dT"
  | "Egauss"
  | "ET"
  | "fgauss"
  | "fT"
  | "gauss"
  | "Ggauss"
  | "GT"
  | "kgauss"
  | "kT"
  | "mgauss"
  | "Mgauss"
  | "mT"
  | "ngauss"
  | "nT"
  | "pgauss"
  | "pT"
  | "T"
  | "Tgauss"
  | "TT"
  | "ugauss"
  | "uT";
interface _MagneticFluxDensityUom extends _UomEnum {
  _: MagneticFluxDensityUom;
}

export type MagneticFluxDensityUomExt = string;
type _MagneticFluxDensityUomExt = Primitive._string;

interface _MagneticFluxMeasure extends _AbstractMeasure {
  uom: MagneticFluxUom;
}
export interface MagneticFluxMeasure extends _MagneticFluxMeasure {}

interface _MagneticFluxMeasureExt extends _AbstractMeasure {
  uom: MagneticFluxUomExt;
}
export interface MagneticFluxMeasureExt extends _MagneticFluxMeasureExt {}

export type MagneticFluxUom =
  | "cWb"
  | "dWb"
  | "EWb"
  | "fWb"
  | "GWb"
  | "kWb"
  | "mWb"
  | "MWb"
  | "nWb"
  | "pWb"
  | "TWb"
  | "uWb"
  | "Wb";
interface _MagneticFluxUom extends _UomEnum {
  _: MagneticFluxUom;
}

export type MagneticFluxUomExt = string;
type _MagneticFluxUomExt = Primitive._string;

interface _MagneticPermeabilityMeasure extends _AbstractMeasure {
  uom: MagneticPermeabilityUom;
}
export interface MagneticPermeabilityMeasure
  extends _MagneticPermeabilityMeasure {}

interface _MagneticPermeabilityMeasureExt extends _AbstractMeasure {
  uom: MagneticPermeabilityUomExt;
}
export interface MagneticPermeabilityMeasureExt
  extends _MagneticPermeabilityMeasureExt {}

export type MagneticPermeabilityUom = "H/m" | "uH/m";
interface _MagneticPermeabilityUom extends _UomEnum {
  _: MagneticPermeabilityUom;
}

export type MagneticPermeabilityUomExt = string;
type _MagneticPermeabilityUomExt = Primitive._string;

interface _MagneticVectorPotentialMeasure extends _AbstractMeasure {
  uom: MagneticVectorPotentialUom;
}
export interface MagneticVectorPotentialMeasure
  extends _MagneticVectorPotentialMeasure {}

interface _MagneticVectorPotentialMeasureExt extends _AbstractMeasure {
  uom: MagneticVectorPotentialUomExt;
}
export interface MagneticVectorPotentialMeasureExt
  extends _MagneticVectorPotentialMeasureExt {}

export type MagneticVectorPotentialUom = "Wb/m" | "Wb/mm";
interface _MagneticVectorPotentialUom extends _UomEnum {
  _: MagneticVectorPotentialUom;
}

export type MagneticVectorPotentialUomExt = string;
type _MagneticVectorPotentialUomExt = Primitive._string;

interface _MassLengthMeasure extends _AbstractMeasure {
  uom: MassLengthUom;
}
export interface MassLengthMeasure extends _MassLengthMeasure {}

interface _MassLengthMeasureExt extends _AbstractMeasure {
  uom: MassLengthUomExt;
}
export interface MassLengthMeasureExt extends _MassLengthMeasureExt {}

export type MassLengthUom = "kg.m" | "lbm.ft";
interface _MassLengthUom extends _UomEnum {
  _: MassLengthUom;
}

export type MassLengthUomExt = string;
type _MassLengthUomExt = Primitive._string;

interface _MassMeasure extends _AbstractMeasure {
  uom: MassUom;
}
export interface MassMeasure extends _MassMeasure {}

interface _MassMeasureExt extends _AbstractMeasure {
  uom: MassUomExt;
}
export interface MassMeasureExt extends _MassMeasureExt {}

interface _MassPerAreaMeasure extends _AbstractMeasure {
  uom: MassPerAreaUom;
}
export interface MassPerAreaMeasure extends _MassPerAreaMeasure {}

interface _MassPerAreaMeasureExt extends _AbstractMeasure {
  uom: MassPerAreaUomExt;
}
export interface MassPerAreaMeasureExt extends _MassPerAreaMeasureExt {}

export type MassPerAreaUom =
  | "0.01 lbm/ft2"
  | "kg/m2"
  | "lbm/ft2"
  | "Mg/m2"
  | "ton[US]/ft2";
interface _MassPerAreaUom extends _UomEnum {
  _: MassPerAreaUom;
}

export type MassPerAreaUomExt = string;
type _MassPerAreaUomExt = Primitive._string;

interface _MassPerEnergyMeasure extends _AbstractMeasure {
  uom: MassPerEnergyUom;
}
export interface MassPerEnergyMeasure extends _MassPerEnergyMeasure {}

interface _MassPerEnergyMeasureExt extends _AbstractMeasure {
  uom: MassPerEnergyUomExt;
}
export interface MassPerEnergyMeasureExt extends _MassPerEnergyMeasureExt {}

export type MassPerEnergyUom =
  | "kg/(kW.h)"
  | "kg/J"
  | "kg/MJ"
  | "lbm/(hp.h)"
  | "mg/J";
interface _MassPerEnergyUom extends _UomEnum {
  _: MassPerEnergyUom;
}

export type MassPerEnergyUomExt = string;
type _MassPerEnergyUomExt = Primitive._string;

interface _MassPerLengthMeasure extends _AbstractMeasure {
  uom: MassPerLengthUom;
}
export interface MassPerLengthMeasure extends _MassPerLengthMeasure {}

interface _MassPerLengthMeasureExt extends _AbstractMeasure {
  uom: MassPerLengthUomExt;
}
export interface MassPerLengthMeasureExt extends _MassPerLengthMeasureExt {}

export type MassPerLengthUom =
  | "kg.m/cm2"
  | "kg/m"
  | "klbm/in"
  | "lbm/ft"
  | "Mg/in";
interface _MassPerLengthUom extends _UomEnum {
  _: MassPerLengthUom;
}

export type MassPerLengthUomExt = string;
type _MassPerLengthUomExt = Primitive._string;

interface _MassPerMassMeasure extends _AbstractMeasure {
  uom: MassPerMassUom;
}
export interface MassPerMassMeasure extends _MassPerMassMeasure {}

interface _MassPerMassMeasureExt extends _AbstractMeasure {
  uom: MassPerMassUomExt;
}
export interface MassPerMassMeasureExt extends _MassPerMassMeasureExt {}

export type MassPerMassUom =
  | "%"
  | "%[mass]"
  | "Euc"
  | "g/kg"
  | "g/t"
  | "kg/kg"
  | "kg/sack[94lbm]"
  | "kg/t"
  | "mg/g"
  | "mg/kg"
  | "ng/g"
  | "ng/mg"
  | "ppk"
  | "ppm"
  | "ppm[mass]"
  | "ug/g"
  | "ug/mg";
interface _MassPerMassUom extends _UomEnum {
  _: MassPerMassUom;
}

export type MassPerMassUomExt = string;
type _MassPerMassUomExt = Primitive._string;

interface _MassPerTimeMeasure extends _AbstractMeasure {
  uom: MassPerTimeUom;
}
export interface MassPerTimeMeasure extends _MassPerTimeMeasure {}

interface _MassPerTimeMeasureExt extends _AbstractMeasure {
  uom: MassPerTimeUomExt;
}
export interface MassPerTimeMeasureExt extends _MassPerTimeMeasureExt {}

interface _MassPerTimePerAreaMeasure extends _AbstractMeasure {
  uom: MassPerTimePerAreaUom;
}
export interface MassPerTimePerAreaMeasure extends _MassPerTimePerAreaMeasure {}

interface _MassPerTimePerAreaMeasureExt extends _AbstractMeasure {
  uom: MassPerTimePerAreaUomExt;
}
export interface MassPerTimePerAreaMeasureExt
  extends _MassPerTimePerAreaMeasureExt {}

export type MassPerTimePerAreaUom =
  | "g.ft/(cm3.s)"
  | "g.m/(cm3.s)"
  | "kg/(m2.s)"
  | "kPa.s/m"
  | "lbm/(ft2.h)"
  | "lbm/(ft2.s)"
  | "MPa.s/m";
interface _MassPerTimePerAreaUom extends _UomEnum {
  _: MassPerTimePerAreaUom;
}

export type MassPerTimePerAreaUomExt = string;
type _MassPerTimePerAreaUomExt = Primitive._string;

interface _MassPerTimePerLengthMeasure extends _AbstractMeasure {
  uom: MassPerTimePerLengthUom;
}
export interface MassPerTimePerLengthMeasure
  extends _MassPerTimePerLengthMeasure {}

interface _MassPerTimePerLengthMeasureExt extends _AbstractMeasure {
  uom: MassPerTimePerLengthUomExt;
}
export interface MassPerTimePerLengthMeasureExt
  extends _MassPerTimePerLengthMeasureExt {}

export type MassPerTimePerLengthUom =
  | "kg/(m.s)"
  | "lbm/(ft.h)"
  | "lbm/(ft.s)"
  | "Pa.s";
interface _MassPerTimePerLengthUom extends _UomEnum {
  _: MassPerTimePerLengthUom;
}

export type MassPerTimePerLengthUomExt = string;
type _MassPerTimePerLengthUomExt = Primitive._string;

export type MassPerTimeUom =
  | "1E6 lbm/a"
  | "g/s"
  | "kg/d"
  | "kg/h"
  | "kg/min"
  | "kg/s"
  | "lbm/d"
  | "lbm/h"
  | "lbm/min"
  | "lbm/s"
  | "Mg/a"
  | "Mg/d"
  | "Mg/h"
  | "Mg/min"
  | "t/a"
  | "t/d"
  | "t/h"
  | "t/min"
  | "ton[UK]/a"
  | "ton[UK]/d"
  | "ton[UK]/h"
  | "ton[UK]/min"
  | "ton[US]/a"
  | "ton[US]/d"
  | "ton[US]/h"
  | "ton[US]/min";
interface _MassPerTimeUom extends _UomEnum {
  _: MassPerTimeUom;
}

export type MassPerTimeUomExt = string;
type _MassPerTimeUomExt = Primitive._string;

interface _MassPerVolumeMeasure extends _AbstractMeasure {
  uom: MassPerVolumeUomWithLegacy;
}
export interface MassPerVolumeMeasure extends _MassPerVolumeMeasure {}

interface _MassPerVolumeMeasureExt extends _AbstractMeasure {
  uom: MassPerVolumeUomExt;
}
export interface MassPerVolumeMeasureExt extends _MassPerVolumeMeasureExt {}

interface _MassPerVolumePerLengthMeasure extends _AbstractMeasure {
  uom: MassPerVolumePerLengthUom;
}
export interface MassPerVolumePerLengthMeasure
  extends _MassPerVolumePerLengthMeasure {}

interface _MassPerVolumePerLengthMeasureExt extends _AbstractMeasure {
  uom: MassPerVolumePerLengthUomExt;
}
export interface MassPerVolumePerLengthMeasureExt
  extends _MassPerVolumePerLengthMeasureExt {}

export type MassPerVolumePerLengthUom =
  | "g/cm4"
  | "kg/dm4"
  | "kg/m4"
  | "lbm/(gal[UK].ft)"
  | "lbm/(gal[US].ft)"
  | "lbm/ft4"
  | "Pa.s2/m3";
interface _MassPerVolumePerLengthUom extends _UomEnum {
  _: MassPerVolumePerLengthUom;
}

export type MassPerVolumePerLengthUomExt = string;
type _MassPerVolumePerLengthUomExt = Primitive._string;

interface _MassPerVolumePerPressureMeasure extends _AbstractMeasure {
  uom: MassPerVolumePerPressureUom;
}
export interface MassPerVolumePerPressureMeasure
  extends _MassPerVolumePerPressureMeasure {}

interface _MassPerVolumePerPressureMeasureExt extends _AbstractMeasure {
  uom: MassPerVolumePerPressureUomExt;
}
export interface MassPerVolumePerPressureMeasureExt
  extends _MassPerVolumePerPressureMeasureExt {}

export type MassPerVolumePerPressureUom = "kg/m3.kPa" | "lb/ft.psi";
interface _MassPerVolumePerPressureUom extends _UomEnum {
  _: MassPerVolumePerPressureUom;
}

export type MassPerVolumePerPressureUomExt = string;
type _MassPerVolumePerPressureUomExt = Primitive._string;

interface _MassPerVolumePerTemperatureMeasure extends _AbstractMeasure {
  uom: MassPerVolumePerTemperatureUom;
}
export interface MassPerVolumePerTemperatureMeasure
  extends _MassPerVolumePerTemperatureMeasure {}

interface _MassPerVolumePerTemperatureMeasureExt extends _AbstractMeasure {
  uom: MassPerVolumePerTemperatureUomExt;
}
export interface MassPerVolumePerTemperatureMeasureExt
  extends _MassPerVolumePerTemperatureMeasureExt {}

export type MassPerVolumePerTemperatureUom =
  | "kg/m3.degC"
  | "kg/m3.K"
  | "lb/ft.degF";
interface _MassPerVolumePerTemperatureUom extends _UomEnum {
  _: MassPerVolumePerTemperatureUom;
}

export type MassPerVolumePerTemperatureUomExt = string;
type _MassPerVolumePerTemperatureUomExt = Primitive._string;

export type MassPerVolumeUom =
  | "0.001 lbm/bbl"
  | "0.001 lbm/gal[UK]"
  | "0.001 lbm/gal[US]"
  | "0.01 grain/ft3"
  | "0.1 lbm/bbl"
  | "10 Mg/m3"
  | "g/cm3"
  | "g/dm3"
  | "g/gal[UK]"
  | "g/gal[US]"
  | "g/L"
  | "g/m3"
  | "grain/ft3"
  | "grain/gal[US]"
  | "kg/dm3"
  | "kg/L"
  | "kg/m3"
  | "lbm/bbl"
  | "lbm/ft3"
  | "lbm/gal[UK]"
  | "lbm/gal[US]"
  | "lbm/in3"
  | "mg/dm3"
  | "mg/gal[US]"
  | "mg/L"
  | "mg/m3"
  | "Mg/m3"
  | "ng/l"
  | "ng/m3"
  | "ng/ml"
  | "t/m3"
  | "ug/cm3";
interface _MassPerVolumeUom extends _UomEnum {
  _: MassPerVolumeUom;
}

export type MassPerVolumeUomExt = string;
type _MassPerVolumeUomExt = Primitive._string;

export type MassPerVolumeUomWithLegacy = string;
type _MassPerVolumeUomWithLegacy = Primitive._string;

export type MassUom =
  | "ag"
  | "cg"
  | "ct"
  | "cwt[UK]"
  | "cwt[US]"
  | "Eg"
  | "fg"
  | "g"
  | "Gg"
  | "grain"
  | "hg"
  | "kg"
  | "klbm"
  | "lbm"
  | "mg"
  | "Mg"
  | "ng"
  | "ozm"
  | "ozm[troy]"
  | "pg"
  | "sack[94lbm]"
  | "t"
  | "Tg"
  | "ton[UK]"
  | "ton[US]"
  | "ug";
interface _MassUom extends _UomEnum {
  _: MassUom;
}

export type MassUomExt = string;
type _MassUomExt = Primitive._string;

/** Lithology matrix/cement description. The list of standard values is contained in the WITSML enumValues.xml file. */
export type MatrixCementKind =
  | "ankerite"
  | "calcite"
  | "chlorite"
  | "dolomite"
  | "illite"
  | "kaolinite"
  | "quartz"
  | "siderite"
  | "smectite";
interface _MatrixCementKind extends _TypeEnum {
  _: MatrixCementKind;
}

export type MatrixCementKindExt = string;
type _MatrixCementKindExt = Primitive._string;

interface _MdInterval extends _AbstractInterval {
  /** The datum the MD interval is referenced to. Required when there is no default MD datum associated with the data object this is used in. */
  Datum?: DataObjectReference;
  MdMax: number;
  MdMin: number;
  Uom: LengthUomExt;
}
export interface MdInterval extends _MdInterval {}

/** Measure class values. The list of standard values is contained in the WITSML enumValues.xml file. */
export type MeasureClass =
  | "absorbed dose"
  | "activity of radioactivity"
  | "activity of radioactivity per volume"
  | "amount of substance"
  | "amount of substance per amount of substance"
  | "amount of substance per area"
  | "amount of substance per time"
  | "amount of substance per time per area"
  | "amount of substance per volume"
  | "angle per length"
  | "angle per volume"
  | "angular acceleration"
  | "angular velocity"
  | "api gamma ray"
  | "api gravity"
  | "api neutron"
  | "area"
  | "area per amount of substance"
  | "area per area"
  | "area per count"
  | "area per mass"
  | "area per time"
  | "area per volume"
  | "attenuation per frequency interval"
  | "capacitance"
  | "cation exchange capacity"
  | "data transfer speed"
  | "diffusion coefficient"
  | "diffusive time of flight"
  | "digital storage"
  | "dimensionless"
  | "dipole moment"
  | "dose equivalent"
  | "dynamic viscosity"
  | "electric charge"
  | "electric charge per area"
  | "electric charge per mass"
  | "electric charge per volume"
  | "electric conductance"
  | "electric conductivity"
  | "electric current"
  | "electric current density"
  | "electric field strength"
  | "electric potential difference"
  | "electric resistance"
  | "electric resistance per length"
  | "electrical resistivity"
  | "electromagnetic moment"
  | "energy"
  | "energy length per area"
  | "energy length per time area temperature"
  | "energy per area"
  | "energy per length"
  | "energy per mass"
  | "energy per mass per time"
  | "energy per volume"
  | "force"
  | "force area"
  | "force length per length"
  | "force per force"
  | "force per length"
  | "force per volume"
  | "frequency"
  | "frequency interval"
  | "heat capacity"
  | "heat flow rate"
  | "heat transfer coefficient"
  | "illuminance"
  | "inductance"
  | "isothermal compressibility"
  | "kinematic viscosity"
  | "length"
  | "length per angle"
  | "length per length"
  | "length per mass"
  | "length per pressure"
  | "length per temperature"
  | "length per time"
  | "length per volume"
  | "light exposure"
  | "linear acceleration"
  | "linear thermal expansion"
  | "logarithmic power ratio"
  | "logarithmic power ratio per length"
  | "luminance"
  | "luminous efficacy"
  | "luminous flux"
  | "luminous intensity"
  | "magnetic dipole moment"
  | "magnetic field strength"
  | "magnetic flux"
  | "magnetic flux density"
  | "magnetic flux density per length"
  | "magnetic permeability"
  | "magnetic vector potential"
  | "mass"
  | "mass length"
  | "mass per area"
  | "mass per energy"
  | "mass per length"
  | "mass per mass"
  | "mass per time"
  | "mass per time per area"
  | "mass per time per length"
  | "mass per volume"
  | "mass per volume per length"
  | "mass per volume per pressure"
  | "mass per volume per temperature"
  | "mobility"
  | "molar energy"
  | "molar heat capacity"
  | "molar volume"
  | "molecular weight"
  | "moment of force"
  | "moment of inertia"
  | "momentum"
  | "normalized power"
  | "permeability length"
  | "permeability rock"
  | "permittivity"
  | "plane angle"
  | "potential difference per power drop"
  | "power"
  | "power per area"
  | "power per power"
  | "power per volume"
  | "pressure"
  | "pressure per flowrate"
  | "pressure per flowrate squared"
  | "pressure per pressure"
  | "pressure per time"
  | "pressure per volume"
  | "pressure squared"
  | "pressure squared per force time per area"
  | "pressure time per volume"
  | "quantity of light"
  | "radiance"
  | "radiant intensity"
  | "reciprocal area"
  | "reciprocal electric potential difference"
  | "reciprocal force"
  | "reciprocal length"
  | "reciprocal mass"
  | "reciprocal mass time"
  | "reciprocal pressure"
  | "reciprocal time"
  | "reciprocal volume"
  | "reluctance"
  | "second moment of area"
  | "signaling event per time"
  | "solid angle"
  | "specific heat capacity"
  | "temperature interval"
  | "temperature interval per length"
  | "temperature interval per pressure"
  | "temperature interval per time"
  | "thermal conductance"
  | "thermal conductivity"
  | "thermal diffusivity"
  | "thermal insulance"
  | "thermal resistance"
  | "thermodynamic temperature"
  | "thermodynamic temperature per thermodynamic temperature"
  | "time"
  | "time per length"
  | "time per mass"
  | "time per time"
  | "time per volume"
  | "vertical coordinate"
  | "volume"
  | "volume flow rate per volume flow rate"
  | "volume per area"
  | "volume per length"
  | "volume per mass"
  | "volume per pressure"
  | "volume per rotation"
  | "volume per time"
  | "volume per time length"
  | "volume per time per area"
  | "volume per time per length"
  | "volume per time per pressure"
  | "volume per time per pressure length"
  | "volume per time per time"
  | "volume per time per volume"
  | "volume per volume"
  | "volumetric heat transfer coefficient"
  | "volumetric thermal expansion"
  | "unitless";
interface _MeasureClass extends _TypeEnum {
  _: MeasureClass;
}

/** A measured depth coordinate in a wellbore. Positive moving from the reference datum toward the bottomhole. All coordinates with the same datum (and same UOM) can be considered to be in the same coordinate reference system (CRS) and are thus directly comparable. */
interface _MeasuredDepth extends BaseType {
  /** The datum the measured depth is referenced to. Required when there is no default MD datum associated with the data object this is used in. */
  Datum?: DataObjectReference;
  MeasuredDepth: LengthMeasureExt;
}
export interface MeasuredDepth extends _MeasuredDepth {}

interface _MobilityMeasure extends _AbstractMeasure {
  uom: MobilityUom;
}
export interface MobilityMeasure extends _MobilityMeasure {}

interface _MobilityMeasureExt extends _AbstractMeasure {
  uom: MobilityUomExt;
}
export interface MobilityMeasureExt extends _MobilityMeasureExt {}

export type MobilityUom =
  | "D/(Pa.s)"
  | "D/cP"
  | "mD.ft2/(lbf.s)"
  | "mD.in2/(lbf.s)"
  | "mD/(Pa.s)"
  | "mD/cP"
  | "TD[API]/(Pa.s)";
interface _MobilityUom extends _UomEnum {
  _: MobilityUom;
}

export type MobilityUomExt = string;
type _MobilityUomExt = Primitive._string;

interface _MolarEnergyMeasure extends _AbstractMeasure {
  uom: MolarEnergyUom;
}
export interface MolarEnergyMeasure extends _MolarEnergyMeasure {}

interface _MolarEnergyMeasureExt extends _AbstractMeasure {
  uom: MolarEnergyUomExt;
}
export interface MolarEnergyMeasureExt extends _MolarEnergyMeasureExt {}

export type MolarEnergyUom =
  | "Btu[IT]/lbmol"
  | "J/mol"
  | "kcal[th]/mol"
  | "kJ/kmol"
  | "MJ/kmol";
interface _MolarEnergyUom extends _UomEnum {
  _: MolarEnergyUom;
}

export type MolarEnergyUomExt = string;
type _MolarEnergyUomExt = Primitive._string;

interface _MolarHeatCapacityMeasure extends _AbstractMeasure {
  uom: MolarHeatCapacityUom;
}
export interface MolarHeatCapacityMeasure extends _MolarHeatCapacityMeasure {}

interface _MolarHeatCapacityMeasureExt extends _AbstractMeasure {
  uom: MolarHeatCapacityUomExt;
}
export interface MolarHeatCapacityMeasureExt
  extends _MolarHeatCapacityMeasureExt {}

export type MolarHeatCapacityUom =
  | "Btu[IT]/(lbmol.deltaF)"
  | "cal[th]/(mol.deltaC)"
  | "J/(mol.deltaK)"
  | "kJ/(kmol.deltaK)";
interface _MolarHeatCapacityUom extends _UomEnum {
  _: MolarHeatCapacityUom;
}

export type MolarHeatCapacityUomExt = string;
type _MolarHeatCapacityUomExt = Primitive._string;

interface _MolarVolumeMeasure extends _AbstractMeasure {
  uom: MolarVolumeUom;
}
export interface MolarVolumeMeasure extends _MolarVolumeMeasure {}

interface _MolarVolumeMeasureExt extends _AbstractMeasure {
  uom: MolarVolumeUomExt;
}
export interface MolarVolumeMeasureExt extends _MolarVolumeMeasureExt {}

export type MolarVolumeUom =
  | "dm3/kmol"
  | "ft3/lbmol"
  | "L/kmol"
  | "L/mol"
  | "m3/kmol"
  | "m3/mol";
interface _MolarVolumeUom extends _UomEnum {
  _: MolarVolumeUom;
}

export type MolarVolumeUomExt = string;
type _MolarVolumeUomExt = Primitive._string;

interface _MolecularWeightMeasure extends _AbstractMeasure {
  uom: MolecularWeightUom;
}
export interface MolecularWeightMeasure extends _MolecularWeightMeasure {}

interface _MolecularWeightMeasureExt extends _AbstractMeasure {
  uom: MolecularWeightUomExt;
}
export interface MolecularWeightMeasureExt extends _MolecularWeightMeasureExt {}

export type MolecularWeightUom = "g/mol" | "kg/mol" | "lbm/lbmol";
interface _MolecularWeightUom extends _UomEnum {
  _: MolecularWeightUom;
}

export type MolecularWeightUomExt = string;
type _MolecularWeightUomExt = Primitive._string;

interface _MomentOfForceMeasure extends _AbstractMeasure {
  uom: MomentOfForceUom;
}
export interface MomentOfForceMeasure extends _MomentOfForceMeasure {}

interface _MomentOfForceMeasureExt extends _AbstractMeasure {
  uom: MomentOfForceUomExt;
}
export interface MomentOfForceMeasureExt extends _MomentOfForceMeasureExt {}

export type MomentOfForceUom =
  | "1000 lbf.ft"
  | "daN.m"
  | "dN.m"
  | "J"
  | "kgf.m"
  | "kN.m"
  | "lbf.ft"
  | "lbf.in"
  | "lbm.ft2/s2"
  | "N.m"
  | "pdl.ft"
  | "tonf[US].ft"
  | "tonf[US].mi";
interface _MomentOfForceUom extends _UomEnum {
  _: MomentOfForceUom;
}

export type MomentOfForceUomExt = string;
type _MomentOfForceUomExt = Primitive._string;

interface _MomentOfInertiaMeasure extends _AbstractMeasure {
  uom: MomentOfInertiaUom;
}
export interface MomentOfInertiaMeasure extends _MomentOfInertiaMeasure {}

interface _MomentOfInertiaMeasureExt extends _AbstractMeasure {
  uom: MomentOfInertiaUomExt;
}
export interface MomentOfInertiaMeasureExt extends _MomentOfInertiaMeasureExt {}

export type MomentOfInertiaUom = "kg.m2" | "lbm.ft2";
interface _MomentOfInertiaUom extends _UomEnum {
  _: MomentOfInertiaUom;
}

export type MomentOfInertiaUomExt = string;
type _MomentOfInertiaUomExt = Primitive._string;

interface _MomentumMeasure extends _AbstractMeasure {
  uom: MomentumUom;
}
export interface MomentumMeasure extends _MomentumMeasure {}

interface _MomentumMeasureExt extends _AbstractMeasure {
  uom: MomentumUomExt;
}
export interface MomentumMeasureExt extends _MomentumMeasureExt {}

export type MomentumUom = "kg.m/s" | "lbm.ft/s";
interface _MomentumUom extends _UomEnum {
  _: MomentumUom;
}

export type MomentumUomExt = string;
type _MomentumUomExt = Primitive._string;

/** The name of something within a naming system. */
interface _NameStruct extends _String64 {
  /** The authority for the naming system, e.g., a company. */
  authority?: String64;
}
export interface NameStruct extends _NameStruct {}

/** Allows a table to be contained in an abstract object (AbstractObject) without carrying all of the information of an abstract object (such as UUID, schema version, object version, aliases, extensions, etc.)
 * Also, it is not a data object, meaning it is not discoverable by itself in an ETP context. */
interface _NestedColumnBasedTable extends BaseType {
  Column: Column[];
  Description?: String2000;
  KeyColumn?: Column[];
  Title: String256;
}
export interface NestedColumnBasedTable extends _NestedColumnBasedTable {}

export type NonNegativeLong = number;
type _NonNegativeLong = Primitive._number;

interface _NormalizedPowerMeasure extends _AbstractMeasure {
  uom: NormalizedPowerUom;
}
export interface NormalizedPowerMeasure extends _NormalizedPowerMeasure {}

interface _NormalizedPowerMeasureExt extends _AbstractMeasure {
  uom: NormalizedPowerUomExt;
}
export interface NormalizedPowerMeasureExt extends _NormalizedPowerMeasureExt {}

export type NormalizedPowerUom = "B.W" | "dB.mW" | "dB.MW" | "dB.W";
interface _NormalizedPowerUom extends _UomEnum {
  _: NormalizedPowerUom;
}

export type NormalizedPowerUomExt = string;
type _NormalizedPowerUomExt = Primitive._string;

/** Specifies the north or south direction. */
export type NorthOrSouth = "north" | "south";
interface _NorthOrSouth extends _TypeEnum {
  _: NorthOrSouth;
}

/** The kinds of north references likely to be encountered in oil & gas data. A north reference is a clear definition of what is meant by the word "north" (and by extension all of the compass points). Some of this wording is from the NGS Geodetic Glossary.
 *
 * true north - the common name of what is formally called geodetic north. This is along the rotational axis of the earth, and cannot be easily measured in the field.  The rigorous definition of geodetic north is "the positive direction of that line parallel to the Earth's axis of rotation and perpendicularly to the left of an observer facing in the direction of the Earth's rotation." True north is normally computed from an imperfect measurement of north.
 *
 * astronomic north - An estimate of true north derived from astronomic observations. This differs from true north slightly because astronomic instruments rely on gravity to define "up" (the vertical) while the earth's gravity field is seldom perfectly vertical. A "Laplace correction" is applied to the astronomic north to get geodetic north. Astronomic north is seldom used in oil & gas operations.
 *
 * magnetic north - The direction of the Earth's magnetic north pole. A "declination" correction is applied to calculate true north from magnetic north. Since the Earth's magnetic north pole is constantly in motion, the date and time an observation is made are critically important to be able to find the correct declination value to be used.
 *
 * compass north - A raw reading of the north-seeking end of a needle or other magnetic component of a compass. This differs from magnetic north because of the influence of iron and other magnetic materials which disturb the Earth's magnetic field close to the compass instrument. There may be a correction applied to compass north to realize a magnetic north reading. This kind of north is encountered in older oil & gas data.
 *
 * grid north - The direction of the north lines on a map projection. In most projections there is only one north line which points to true geodetic north, the central meridian in a UTM projection, for example. At any point on a grid there can be a "convergence angle" defined which relates the grid north to true geodetic north. Grid north is not measured in the field; it must be calculated.
 *
 * plant north - A direction in a local engineering coordinate reference system which is normally oriented more or less north. This is used in industrial facilities (like gas plants or offshore platforms) and for smaller areas like drilling pads. Distances and directions in this local system are easier to handle without need for a professional land surveyor because the need for accuracy is less and the distances involved are limited. In this case a surveyor might determine the location of a corner of the facility and the angle between true north and the apparent north of the facility. */
export type NorthReferenceKind =
  | "astronomic north"
  | "compass north"
  | "grid north"
  | "magnetic north"
  | "plant north"
  | "true north";
interface _NorthReferenceKind extends _TypeEnum {
  _: NorthReferenceKind;
}

/** Use this to create multiple aliases for any object instance. Note that an Authority is required for each alias. */
interface _ObjectAlias extends BaseType {
  authority: String64;
  Description?: String2000;
  /** The date and time when an alias name became effective. */
  EffectiveDateTime?: TimeStamp;
  Identifier: String64;
  IdentifierKind?: AliasIdentifierKindExt;
  /** The data and time when an alias name ceased to be effective. */
  TerminationDateTime?: TimeStamp;
}
export interface ObjectAlias extends _ObjectAlias {}

interface _ObjectParameterKey extends _AbstractParameterKey {
  DataObject: DataObjectReference;
}
export interface ObjectParameterKey extends _ObjectParameterKey {}

/** Kind of organization. */
export type OrganizationKind =
  | "academic institution"
  | "government agency"
  | "industry organization"
  | "non-governmental organization"
  | "organization unit";
interface _OrganizationKind extends _TypeEnum {
  _: OrganizationKind;
}

export type OrganizationKindExt = string;
type _OrganizationKindExt = Primitive._string;

/** Container for elemnts and types needed solely for intagration within OSDU. */
interface _OSDUIntegration extends BaseType {
  Basin?: String64;
  Block?: String64;
  City?: String64;
  Country?: String64;
  County?: String64;
  District?: String64;
  Field?: String64;
  LegalTags?: String256[];
  LineageAssertions?: OSDULineageAssertion[];
  /** Optional copy of the GeoJSON created by or for OSDU. This presumably contains a WGS84-only version of whatever shape represents the toplevel object. */
  OSDUGeoJSON?: string;
  OwnerGroup?: String256[];
  Play?: String64;
  Prospect?: String64;
  Region?: String64;
  State?: String64;
  ViewerGroup?: String256[];
  WGS84Latitude?: PlaneAngleMeasure;
  WGS84LocationMetadata?: OSDUSpatialLocationIntegration;
  WGS84Longitude?: PlaneAngleMeasure;
}
export interface OSDUIntegration extends _OSDUIntegration {}

/** Defines relationships with other objects (any kind of Resource) upon which this work product component depends.  The assertion is directed only from the asserting WPC to ancestor objects, not children.  It should not be used to refer to files or artefacts within the WPC -- the association within the WPC is sufficient and Artefacts are actually children of the main WPC file. */
interface _OSDULineageAssertion extends BaseType {
  /** The OSDU identifier of the dependent object. */
  ID: String256;
  LineageRelationshipKind: OSDULineageRelationshipKind;
}
export interface OSDULineageAssertion extends _OSDULineageAssertion {}

export type OSDULineageRelationshipKind = "direct" | "indirect" | "reference";
interface _OSDULineageRelationshipKind extends _TypeEnum {
  _: OSDULineageRelationshipKind;
}

/** OSDU-specific details about reference point. */
interface _OSDUReferencePointIntegration extends BaseType {
  /** The date and time when the reference point became effective. */
  EffectiveDateTime?: TimeStamp;
  /** The data and time when the reference point ceased to be effective. */
  TerminationDateTime?: TimeStamp;
}
export interface OSDUReferencePointIntegration
  extends _OSDUReferencePointIntegration {}

/** Details about an OSDU Spatial Location. */
interface _OSDUSpatialLocationIntegration extends BaseType {
  /** The audit trail of operations applied to the coordinates from the original state to the current state. The list may contain operations applied prior to ingestion as well as the operations applied to produce the Wgs84Coordinates. The text elements refer to ESRI style CRS and Transformation names, which may have to be translated to EPSG standard names. */
  AppliedOperation?: String256[];
  /** The date of the Quality Check. */
  CoordinateQualityCheckDateTime?: TimeStamp;
  /** The user who performed the Quality Check. */
  CoordinateQualityCheckPerformedBy?: String64;
  /** Freetext remarks on Quality Check. */
  CoordinateQualityCheckRemark?: String256[];
  /** A qualitative description of the quality of a spatial location, e.g. unverifiable, not verified, basic validation. */
  QualitativeSpatialAccuracyType?: String64;
  /** An approximate quantitative assessment of the quality of a location (accurate to > 500 m (i.e. not very accurate)), to < 1 m, etc. */
  QuantitativeAccuracyBand?: String64;
  /** Date when coordinates were measured or retrieved. */
  SpatialLocationCoordinatesDate?: TimeStamp;
}
export interface OSDUSpatialLocationIntegration
  extends _OSDUSpatialLocationIntegration {}

/** Description of one parameter that participate in one type of activity. */
interface _ParameterTemplate extends BaseType {
  /** If no allowed type is given, then all kind of datatypes is allowed. */
  AllowedKind?: ActivityParameterKind[];
  /** Textual description of additional constraint associated with the parameter. (note that it will be better to have a formal description of the constraint) */
  Constraint?: String2000;
  /** When parameter is limited to data object of given types, describe the allowed types. Used only when ParameterType is dataObject */
  DataObjectContentType?: String2000;
  DefaultValue?: AbstractActivityParameter[];
  /** Indicates if the parameter is an input of the activity.
   * If the parameter is a data object and is also an output of the activity, it is strongly advised to use two parameters : one for input and one for output. The reason is to be able to give two different versions strings for the input and output dataobject which has got obviously the same UUID. */
  IsInput: boolean;
  /** Indicates if the parameter is an output of the activity.
   * If the parameter is a data object and is also an input of the activity, it is strongly advised to use two parameters : one for input and one for output. The reason is to be able to give two different versions strings for the input and output dataobject which has got obviously the same UUID. */
  IsOutput: boolean;
  /** Allows to indicate that, in the same activity, this parameter template must be associated to another parameter template identified by its title. */
  KeyConstraint?: String2000[];
  /** Maximum number of parameters of this type allowed in the activity.
   * If the maximum number of parameters is infinite, use -1 value. */
  MaxOccurs: number;
  /** Minimum number of parameter of this type required by the activity.
   * If the minimum number of parameters is infinite, use -1 value. */
  MinOccurs: number;
  /** Name of the parameter in the activity. Key to identify parameter. */
  Title: String2000;
}
export interface ParameterTemplate extends _ParameterTemplate {}

interface _PermeabilityLengthMeasure extends _AbstractMeasure {
  uom: PermeabilityLengthUom;
}
export interface PermeabilityLengthMeasure extends _PermeabilityLengthMeasure {}

interface _PermeabilityLengthMeasureExt extends _AbstractMeasure {
  uom: PermeabilityLengthUomExt;
}
export interface PermeabilityLengthMeasureExt
  extends _PermeabilityLengthMeasureExt {}

export type PermeabilityLengthUom =
  | "D.ft"
  | "D.m"
  | "mD.ft"
  | "mD.m"
  | "TD[API].m";
interface _PermeabilityLengthUom extends _UomEnum {
  _: PermeabilityLengthUom;
}

export type PermeabilityLengthUomExt = string;
type _PermeabilityLengthUomExt = Primitive._string;

interface _PermeabilityRockMeasure extends _AbstractMeasure {
  uom: PermeabilityRockUom;
}
export interface PermeabilityRockMeasure extends _PermeabilityRockMeasure {}

interface _PermeabilityRockMeasureExt extends _AbstractMeasure {
  uom: PermeabilityRockUomExt;
}
export interface PermeabilityRockMeasureExt
  extends _PermeabilityRockMeasureExt {}

export type PermeabilityRockUom = "D" | "D[API]" | "mD" | "TD[API]";
interface _PermeabilityRockUom extends _UomEnum {
  _: PermeabilityRockUom;
}

export type PermeabilityRockUomExt = string;
type _PermeabilityRockUomExt = Primitive._string;

interface _PermittivityMeasure extends _AbstractMeasure {
  uom: PermittivityUom;
}
export interface PermittivityMeasure extends _PermittivityMeasure {}

interface _PermittivityMeasureExt extends _AbstractMeasure {
  uom: PermittivityUomExt;
}
export interface PermittivityMeasureExt extends _PermittivityMeasureExt {}

export type PermittivityUom = "F/m" | "uF/m";
interface _PermittivityUom extends _UomEnum {
  _: PermittivityUom;
}

export type PermittivityUomExt = string;
type _PermittivityUomExt = Primitive._string;

/** The components of a person's name. */
interface _PersonName extends BaseType {
  /** The person's first name, sometimes called their "given name". */
  First: String64;
  /** The person's last or family name. */
  Last: String64;
  /** The person's middle name or initial. */
  Middle?: String64;
  /** A name prefix. Such as, Dr, Ms, Miss, Mr, etc. */
  Prefix?: String64;
  /** A name suffix such as Esq, Phd, etc. */
  Suffix?: String64[];
}
export interface PersonName extends _PersonName {}

/** A phone number with two attributes, used to "type" and "qualify" a phone number. The type would carry information such as fax, modem, voice, and the qualifier would carry information such as home or office. */
interface _PhoneNumberStruct extends BaseType {
  /** The phone number extension. */
  extension?: String64;
  /** Indicates whether the number is personal, business or both. */
  qualifier?: AddressQualifier;
  /** The kind of phone such as voice or fax. */
  type: PhoneType;
}
export interface PhoneNumberStruct extends _PhoneNumberStruct {}

/** Specifies the types phone number (e.g., fax, mobile, etc.) */
export type PhoneType =
  | "fax"
  | "mobile"
  | "pager"
  | "unknown"
  | "voice"
  | "voice/fax"
  | "voicemail";
interface _PhoneType extends _TypeEnum {
  _: PhoneType;
}

interface _PlaneAngleMeasure extends _AbstractMeasure {
  uom: PlaneAngleUom;
}
export interface PlaneAngleMeasure extends _PlaneAngleMeasure {}

interface _PlaneAngleMeasureExt extends _AbstractMeasure {
  uom: PlaneAngleUomExt;
}
export interface PlaneAngleMeasureExt extends _PlaneAngleMeasureExt {}

export type PlaneAngleUom =
  | "0.001 seca"
  | "ccgr"
  | "cgr"
  | "dega"
  | "gon"
  | "krad"
  | "mila"
  | "mina"
  | "Mrad"
  | "mrad"
  | "rad"
  | "rev"
  | "seca"
  | "urad";
interface _PlaneAngleUom extends _UomEnum {
  _: PlaneAngleUom;
}

export type PlaneAngleUomExt = string;
type _PlaneAngleUomExt = Primitive._string;

export type PositiveDouble = number;
type _PositiveDouble = Primitive._number;

export type PositiveLong = number;
type _PositiveLong = Primitive._number;

interface _PotentialDifferencePerPowerDropMeasure extends _AbstractMeasure {
  uom: PotentialDifferencePerPowerDropUom;
}
export interface PotentialDifferencePerPowerDropMeasure
  extends _PotentialDifferencePerPowerDropMeasure {}

interface _PotentialDifferencePerPowerDropMeasureExt extends _AbstractMeasure {
  uom: PotentialDifferencePerPowerDropUomExt;
}
export interface PotentialDifferencePerPowerDropMeasureExt
  extends _PotentialDifferencePerPowerDropMeasureExt {}

export type PotentialDifferencePerPowerDropUom = "V/B" | "V/dB";
interface _PotentialDifferencePerPowerDropUom extends _UomEnum {
  _: PotentialDifferencePerPowerDropUom;
}

export type PotentialDifferencePerPowerDropUomExt = string;
type _PotentialDifferencePerPowerDropUomExt = Primitive._string;

interface _PowerMeasure extends _AbstractMeasure {
  uom: PowerUom;
}
export interface PowerMeasure extends _PowerMeasure {}

interface _PowerMeasureExt extends _AbstractMeasure {
  uom: PowerUomExt;
}
export interface PowerMeasureExt extends _PowerMeasureExt {}

interface _PowerPerAreaMeasure extends _AbstractMeasure {
  uom: PowerPerAreaUom;
}
export interface PowerPerAreaMeasure extends _PowerPerAreaMeasure {}

interface _PowerPerAreaMeasureExt extends _AbstractMeasure {
  uom: PowerPerAreaUomExt;
}
export interface PowerPerAreaMeasureExt extends _PowerPerAreaMeasureExt {}

export type PowerPerAreaUom =
  | "Btu[IT]/(h.ft2)"
  | "Btu[IT]/(s.ft2)"
  | "cal[th]/(h.cm2)"
  | "hp/in2"
  | "hp[hyd]/in2"
  | "kW/cm2"
  | "kW/m2"
  | "mW/m2"
  | "ucal[th]/(s.cm2)"
  | "W/cm2"
  | "W/m2"
  | "W/mm2";
interface _PowerPerAreaUom extends _UomEnum {
  _: PowerPerAreaUom;
}

export type PowerPerAreaUomExt = string;
type _PowerPerAreaUomExt = Primitive._string;

interface _PowerPerPowerMeasure extends _AbstractMeasure {
  uom: PowerPerPowerUom;
}
export interface PowerPerPowerMeasure extends _PowerPerPowerMeasure {}

interface _PowerPerPowerMeasureExt extends _AbstractMeasure {
  uom: PowerPerPowerUomExt;
}
export interface PowerPerPowerMeasureExt extends _PowerPerPowerMeasureExt {}

export type PowerPerPowerUom = "%" | "Btu[IT]/(hp.h)" | "Euc" | "W/kW" | "W/W";
interface _PowerPerPowerUom extends _UomEnum {
  _: PowerPerPowerUom;
}

export type PowerPerPowerUomExt = string;
type _PowerPerPowerUomExt = Primitive._string;

interface _PowerPerVolumeMeasure extends _AbstractMeasure {
  uom: PowerPerVolumeUom;
}
export interface PowerPerVolumeMeasure extends _PowerPerVolumeMeasure {}

interface _PowerPerVolumeMeasureExt extends _AbstractMeasure {
  uom: PowerPerVolumeUomExt;
}
export interface PowerPerVolumeMeasureExt extends _PowerPerVolumeMeasureExt {}

export type PowerPerVolumeUom =
  | "Btu[IT]/(h.ft3)"
  | "Btu[IT]/(s.ft3)"
  | "cal[th]/(h.cm3)"
  | "cal[th]/(s.cm3)"
  | "hp/ft3"
  | "kW/m3"
  | "uW/m3"
  | "W/m3";
interface _PowerPerVolumeUom extends _UomEnum {
  _: PowerPerVolumeUom;
}

export type PowerPerVolumeUomExt = string;
type _PowerPerVolumeUomExt = Primitive._string;

export type PowerUom =
  | "cW"
  | "dW"
  | "EW"
  | "fW"
  | "GW"
  | "hp"
  | "hp[elec]"
  | "hp[hyd]"
  | "hp[metric]"
  | "kW"
  | "MW"
  | "mW"
  | "nW"
  | "pW"
  | "tonRefrig"
  | "TW"
  | "uW"
  | "W";
interface _PowerUom extends _UomEnum {
  _: PowerUom;
}

export type PowerUomExt = string;
type _PowerUomExt = Primitive._string;

interface _PressureMeasure extends _AbstractMeasure {
  uom: PressureUomWithLegacy;
}
export interface PressureMeasure extends _PressureMeasure {}

interface _PressureMeasureExt extends _AbstractMeasure {
  uom: PressureUomExt;
}
export interface PressureMeasureExt extends _PressureMeasureExt {}

/** PressurePerFlowrateSquared, P/Q^2 is the unit for turbulent flow pressure drop in the layer inflow relationship. */
interface _PressurePerFlowrateMeasure extends _AbstractMeasure {
  /** One of uoms from PressurePerFlowrateUom list */
  uom: PressurePerFlowrateUom;
}
export interface PressurePerFlowrateMeasure
  extends _PressurePerFlowrateMeasure {}

interface _PressurePerFlowrateMeasureExt extends _AbstractMeasure {
  uom?: PressurePerFlowrateUomExt;
}
export interface PressurePerFlowrateMeasureExt
  extends _PressurePerFlowrateMeasureExt {}

/** PressurePerFlowrateSquared, P/Q^2 is the unit for turbulent flow pressure drop in the layer inflow relationship. */
interface _PressurePerFlowrateSquaredMeasure extends _AbstractMeasure {
  /** One of uoms from PressurePerFlowrateSquaredUom list */
  uom: PressurePerFlowrateSquaredUom;
}
export interface PressurePerFlowrateSquaredMeasure
  extends _PressurePerFlowrateSquaredMeasure {}

interface _PressurePerFlowrateSquaredMeasureExt extends _AbstractMeasure {
  uom?: PressurePerFlowrateSquaredUomExt;
}
export interface PressurePerFlowrateSquaredMeasureExt
  extends _PressurePerFlowrateSquaredMeasureExt {}

export type PressurePerFlowrateSquaredUom =
  | "bar/(1000m3/day)2"
  | "bar/(m3/day)2"
  | "Pa/(1000m3/day)2"
  | "Pa/(m3/day)2"
  | "psi/(1000000ft3/day)2"
  | "psi/(1000ft3/day)2"
  | "psi/(bbl/day)2";
interface _PressurePerFlowrateSquaredUom extends _UomEnum {
  _: PressurePerFlowrateSquaredUom;
}

export type PressurePerFlowrateSquaredUomExt = string;
type _PressurePerFlowrateSquaredUomExt = Primitive._string;

export type PressurePerFlowrateUom =
  | "bar/(1000m3/day)"
  | "bar/(m3/day)"
  | "Pa/(1000m3/day)"
  | "Pa/(m3/day)"
  | "psi/(1000000ft3/day)"
  | "psi/(1000ft3/day)"
  | "psi/(bbl/day)";
interface _PressurePerFlowrateUom extends _UomEnum {
  _: PressurePerFlowrateUom;
}

export type PressurePerFlowrateUomExt = string;
type _PressurePerFlowrateUomExt = Primitive._string;

interface _PressurePerPressureMeasure extends _AbstractMeasure {
  uom: PressurePerPressureUom;
}
export interface PressurePerPressureMeasure
  extends _PressurePerPressureMeasure {}

interface _PressurePerPressureMeasureExt extends _AbstractMeasure {
  uom: PressurePerPressureUomExt;
}
export interface PressurePerPressureMeasureExt
  extends _PressurePerPressureMeasureExt {}

export type PressurePerPressureUom =
  | "atm/atm"
  | "bar/bar"
  | "Euc"
  | "kPa/kPa"
  | "MPa/MPa"
  | "Pa/Pa"
  | "psi/psi";
interface _PressurePerPressureUom extends _UomEnum {
  _: PressurePerPressureUom;
}

export type PressurePerPressureUomExt = string;
type _PressurePerPressureUomExt = Primitive._string;

interface _PressurePerTimeMeasure extends _AbstractMeasure {
  uom: PressurePerTimeUom;
}
export interface PressurePerTimeMeasure extends _PressurePerTimeMeasure {}

interface _PressurePerTimeMeasureExt extends _AbstractMeasure {
  uom: PressurePerTimeUomExt;
}
export interface PressurePerTimeMeasureExt extends _PressurePerTimeMeasureExt {}

export type PressurePerTimeUom =
  | "atm/h"
  | "bar/h"
  | "kPa/h"
  | "kPa/min"
  | "MPa/h"
  | "Pa/h"
  | "Pa/s"
  | "psi/h"
  | "psi/min";
interface _PressurePerTimeUom extends _UomEnum {
  _: PressurePerTimeUom;
}

export type PressurePerTimeUomExt = string;
type _PressurePerTimeUomExt = Primitive._string;

interface _PressurePerVolumeMeasure extends _AbstractMeasure {
  uom: PressurePerVolumeUomWithLegacy;
}
export interface PressurePerVolumeMeasure extends _PressurePerVolumeMeasure {}

interface _PressurePerVolumeMeasureExt extends _AbstractMeasure {
  uom: PressurePerVolumeUomExt;
}
export interface PressurePerVolumeMeasureExt
  extends _PressurePerVolumeMeasureExt {}

export type PressurePerVolumeUom = "Pa/m3" | "psi2.d/(cP.ft3)";
interface _PressurePerVolumeUom extends _UomEnum {
  _: PressurePerVolumeUom;
}

export type PressurePerVolumeUomExt = string;
type _PressurePerVolumeUomExt = Primitive._string;

export type PressurePerVolumeUomWithLegacy = string;
type _PressurePerVolumeUomWithLegacy = Primitive._string;

interface _PressureSquaredMeasure extends _AbstractMeasure {
  uom: PressureSquaredUom;
}
export interface PressureSquaredMeasure extends _PressureSquaredMeasure {}

interface _PressureSquaredMeasureExt extends _AbstractMeasure {
  uom: PressureSquaredUomExt;
}
export interface PressureSquaredMeasureExt extends _PressureSquaredMeasureExt {}

interface _PressureSquaredPerForceTimePerAreaMeasure extends _AbstractMeasure {
  uom: PressureSquaredPerForceTimePerAreaUom;
}
export interface PressureSquaredPerForceTimePerAreaMeasure
  extends _PressureSquaredPerForceTimePerAreaMeasure {}

interface _PressureSquaredPerForceTimePerAreaMeasureExt
  extends _AbstractMeasure {
  uom: PressureSquaredPerForceTimePerAreaUomExt;
}
export interface PressureSquaredPerForceTimePerAreaMeasureExt
  extends _PressureSquaredPerForceTimePerAreaMeasureExt {}

export type PressureSquaredPerForceTimePerAreaUom =
  | "0.001 kPa2/cP"
  | "bar2/cP"
  | "kPa2/cP"
  | "Pa2/(Pa.s)"
  | "psi2/cP";
interface _PressureSquaredPerForceTimePerAreaUom extends _UomEnum {
  _: PressureSquaredPerForceTimePerAreaUom;
}

export type PressureSquaredPerForceTimePerAreaUomExt = string;
type _PressureSquaredPerForceTimePerAreaUomExt = Primitive._string;

export type PressureSquaredUom =
  | "bar2"
  | "GPa2"
  | "kPa2"
  | "kpsi2"
  | "Pa2"
  | "psi2";
interface _PressureSquaredUom extends _UomEnum {
  _: PressureSquaredUom;
}

export type PressureSquaredUomExt = string;
type _PressureSquaredUomExt = Primitive._string;

interface _PressureTimePerVolumeMeasure extends _AbstractMeasure {
  uom: PressureTimePerVolumeUom;
}
export interface PressureTimePerVolumeMeasure
  extends _PressureTimePerVolumeMeasure {}

interface _PressureTimePerVolumeMeasureExt extends _AbstractMeasure {
  uom: PressureTimePerVolumeUomExt;
}
export interface PressureTimePerVolumeMeasureExt
  extends _PressureTimePerVolumeMeasureExt {}

export type PressureTimePerVolumeUom = "Pa.s/m3" | "psi.d/bbl";
interface _PressureTimePerVolumeUom extends _UomEnum {
  _: PressureTimePerVolumeUom;
}

export type PressureTimePerVolumeUomExt = string;
type _PressureTimePerVolumeUomExt = Primitive._string;

export type PressureUom =
  | "0.01 lbf/ft2"
  | "at"
  | "atm"
  | "bar"
  | "cmH2O[4degC]"
  | "cPa"
  | "dPa"
  | "dyne/cm2"
  | "EPa"
  | "fPa"
  | "GPa"
  | "hbar"
  | "inH2O[39degF]"
  | "inH2O[60degF]"
  | "inHg[32degF]"
  | "inHg[60degF]"
  | "kgf/cm2"
  | "kgf/m2"
  | "kgf/mm2"
  | "kN/m2"
  | "kPa"
  | "kpsi"
  | "lbf/ft2"
  | "mbar"
  | "mmHg[0degC]"
  | "mPa"
  | "MPa"
  | "Mpsi"
  | "N/m2"
  | "N/mm2"
  | "nPa"
  | "Pa"
  | "pPa"
  | "psi"
  | "tonf[UK]/ft2"
  | "tonf[US]/ft2"
  | "tonf[US]/in2"
  | "torr"
  | "TPa"
  | "ubar"
  | "umHg[0degC]"
  | "uPa"
  | "upsi";
interface _PressureUom extends _UomEnum {
  _: PressureUom;
}

export type PressureUomExt = string;
type _PressureUomExt = Primitive._string;

export type PressureUomWithLegacy = string;
type _PressureUomWithLegacy = Primitive._string;

interface _PressureValue extends BaseType {
  AbstractPressureValue: AbstractPressureValue;
}
export interface PressureValue extends _PressureValue {}

/** Specifies values for the principal meridians for the United States Public Land Surveys. */
export type PrincipalMeridian =
  | "1st Principal Meridian"
  | "2nd Principal Meridian"
  | "3rd Principal Meridian"
  | "4th Principal Meridian"
  | "5th Principal Meridian"
  | "6th Principal Meridian"
  | "Black Hills Meridian"
  | "Boise Meridian"
  | "Chickasaw Meridian"
  | "Choctaw Meridian"
  | "Cimarron Meridian"
  | "Copper River Meridian"
  | "Fairbanks Meridian"
  | "Gila and Salt River Meridian"
  | "Humboldt Meridian"
  | "Huntsville Meridian"
  | "Indian Meridian"
  | "Kateel River Meridian"
  | "Lousiana Meridian"
  | "Michigan Meridian"
  | "Montana Meridian"
  | "Mount Diablo Meridian"
  | "Navajo Meridian"
  | "New Mexico Meridian"
  | "Saint Helena Meridian"
  | "Saint Stephens Meridian"
  | "Salt Lake Meridian"
  | "San Bernardo Meridian"
  | "Seward Meridian"
  | "Tallahassee Meridian"
  | "Uintah Meridian"
  | "Umiat Meridian"
  | "Ute Meridian"
  | "Washington Meridian"
  | "Williamette Meridian"
  | "Wind River Meridian";
interface _PrincipalMeridian extends _TypeEnum {
  _: PrincipalMeridian;
}

interface _Projected2dPosition extends _AbstractCartesian2dPosition {
  ProjectedCrs: DataObjectReference;
}
export interface Projected2dPosition extends _Projected2dPosition {}

interface _Projected3dPosition extends _Abstract3dPosition {
  Coordinate1: number;
  Coordinate2: number;
  EllipsoidalHeight: number;
  ProjectedCrs: DataObjectReference;
}
export interface Projected3dPosition extends _Projected3dPosition {}

interface _ProjectedCompoundCrs extends _AbstractCompoundCrs {
  ProjectedCrs: DataObjectReference;
}
export interface ProjectedCompoundCrs extends _ProjectedCompoundCrs {}

interface _ProjectedCompoundPosition extends _AbstractCompoundPosition {
  Coordinate1: number;
  Coordinate2: number;
  ProjectedCompoundCrs: ProjectedCompoundCrs;
  VerticalCoordinate: number;
}
export interface ProjectedCompoundPosition extends _ProjectedCompoundPosition {}

interface _ProjectedCoordinates extends _AbstractHorizontalCoordinates {
  Crs: DataObjectReference;
}
export interface ProjectedCoordinates extends _ProjectedCoordinates {}

interface _ProjectedCrs extends _Cartesian2dCrs {
  uom?: LengthUomExt;
  AbstractProjectedCrs: AbstractProjectedCrs;
  AxisOrder: AxisOrder2d;
}
export interface ProjectedCrs extends _ProjectedCrs {}

/** This class contains the EPSG code for a projected CRS. */
interface _ProjectedEpsgCrs extends _AbstractProjectedCrs {
  EpsgCode: PositiveLong;
}
export interface ProjectedEpsgCrs extends _ProjectedEpsgCrs {}

/** This class contains a code for a projected CRS according to a local authority. This would be used in a case where a company or regulatory regime has chosen not to use EPSG codes. */
interface _ProjectedLocalAuthorityCrs extends _AbstractProjectedCrs {
  LocalAuthorityCrsName: AuthorityQualifiedName;
}
export interface ProjectedLocalAuthorityCrs
  extends _ProjectedLocalAuthorityCrs {}

/** This class is used in a case where the coordinate reference system is either unknown or is intentionally not being transferred. In this case, the uom and AxisOrder need to be provided on the ProjectedCrs class. */
interface _ProjectedUnknownCrs extends _AbstractProjectedCrs {
  Unknown: String2000;
}
export interface ProjectedUnknownCrs extends _ProjectedUnknownCrs {}

/** ISO 19162-compliant well-known text for the projected CRS */
interface _ProjectedWktCrs extends _AbstractProjectedCrs {
  /** ISO 19162 compliant well known text of the CRS */
  WellKnownText: string;
}
export interface ProjectedWktCrs extends _ProjectedWktCrs {}

/** Property kinds carry the semantics of property values. They are used to identify if the values are, for example, representing porosity, length, stress tensor, etc. Energistics provides a list of standard property kind that represent the basis for the commonly used properties in the E&P subsurface workflow. */
interface _PropertyKind extends _AbstractObject {
  /** Date at which this property dictionary entry must no longer be used. Files generated before this date would have used this entry so it is left here for reference.
   *
   * A null value means the property kind is still valid. */
  DeprecationDate?: TimeStamp;
  /** This boolean indicates whether the PropertyKind should be used as a real property or not.
   *
   * If the Is Abstract flag is set, then this entry should be used only as the parent of a real property. For example, the PropertyKind of "force per length" shouldn't be used directly, as it is really just a description of some units of measure. This entry should only be used as the parent of the real physical property "surface tension". */
  IsAbstract: boolean;
  /** Indicates the parent of this property kind.
   * BUSINESS RULE : Only the top root abstract property kind has not to define a parent property kind. */
  Parent?: DataObjectReference;
  /** A reference to the name of a quantity class in the Energistics Unit of Measure Dictionary.
   * If there is no match in the Energistics Unit of Measure Dictionary, then this attribute is purely for human information. */
  QuantityClass: QuantityClassKindExt;
}
export interface PropertyKind extends _PropertyKind {}

/** This dictionary defines property kind which is intended to handle the requirements of the upstream oil and gas industry. */
interface _PropertyKindDictionary extends _AbstractObject {
  /** Defines which property kind are contained into a property kind dictionary. */
  PropertyKind: PropertyKind[];
}
export interface PropertyKindDictionary extends _PropertyKindDictionary {}

/** Qualifiers for property values, which allow users to semantically specialize a property without creating a new property kind.
 * For the list of enumerations, see FacetKind. */
interface _PropertyKindFacet extends BaseType {
  /** A facet allows you to better define a property in the context of its property kind.
   * The technical advantage of using a facet vs. a specialized property kind is to limit the number of property kinds. */
  Facet: FacetExt;
  /** Facet kind of the property kind (see the enumeration) */
  Kind: FacetKind;
}
export interface PropertyKindFacet extends _PropertyKindFacet {}

interface _PublicLandSurveySystem2dPosition
  extends _AbstractCartesian2dPosition {
  PublicLandSurveySystemLocation: PublicLandSurveySystemLocation;
}
export interface PublicLandSurveySystem2dPosition
  extends _PublicLandSurveySystem2dPosition {}

/** Coordinates given in the US Public Land Survey System (Jeffersonian surveying). The parameters in the PublicLandSurveySystem element form a local engineering coordinate reference system with coordinate1 and coordinate2 being the distances in feet from the edge lines of the defined section fraction.
 *
 * The order and direction of the coordinates are given in the AxisOrder element, which is validated via the AxisOrder2d enumeration. */
interface _PublicLandSurveySystemCoordinates
  extends _AbstractHorizontalCoordinates {
  PublicLandSurveySystem: PublicLandSurveySystemLocation;
}
export interface PublicLandSurveySystemCoordinates
  extends _PublicLandSurveySystemCoordinates {}

/** Land survey system that describes the well by range, township, section, etc. */
interface _PublicLandSurveySystemLocation extends BaseType {
  AxisOrder: AxisOrder2d;
  /** Principal meridian for this location. */
  PrincipalMeridian?: PrincipalMeridian;
  /** The location of the well within the section, with the primary component listed first. Spot location will be made from a combinationof the following codes: NE, NW, SW, SE, N2, S2, E2, W2, C (center quarter), LTxx (where xx represents a two digit lot designation), TRzz (where zz represents a one or two character trac designation).
   * Free format allows for entries such as NESW (southwest quarter of northeast quarter), E2NESE (southeast quarter of northeast quarter of east half), CNE (northeast quarter of center quarter), etc. */
  QuarterSection?: PublicLandSurveySystemQuarterSection;
  /** Quarter township. */
  QuarterTownship?: PublicLandSurveySystemQuarterTownship;
  /** Range number. */
  Range?: number;
  /** Range direction. */
  RangeDir?: EastOrWest;
  /** Section number. */
  Section?: SectionNumber;
  /** Township number. */
  Township?: number;
  /** Township direction. */
  TownshipDir?: NorthOrSouth;
}
export interface PublicLandSurveySystemLocation
  extends _PublicLandSurveySystemLocation {}

/** Some combination of NE, NW, SW, SE, N2, S2, E2, W2, C, TRxx, LTnn. USA Public Land Survey System.@pattern (NE|NW|SW|SE|N2|S2|E2|W2|C|LT[0-9]{2,2}|TR[a-zA-Z0-9]{1,2}){1,3} */
export type PublicLandSurveySystemQuarterSection = string;
type _PublicLandSurveySystemQuarterSection = _String64;

/** Designates a particular quarter of a township (Ohio only). USA Public Land Survey System.@pattern NE|NW|SW|SE */
export type PublicLandSurveySystemQuarterTownship = string;
type _PublicLandSurveySystemQuarterTownship = _String64;

/** @pattern (witsml|resqml|prodml|eml|custom)[1-9]\d\.\w+ */
export type QualifiedType = string;
type _QualifiedType = _String256;

export type QuantityClassKind =
  | "absorbed dose"
  | "activity of radioactivity"
  | "activity of radioactivity per volume"
  | "amount of substance"
  | "amount of substance per amount of substance"
  | "amount of substance per area"
  | "amount of substance per time"
  | "amount of substance per time per area"
  | "amount of substance per volume"
  | "angle per length"
  | "angle per volume"
  | "angular acceleration"
  | "angular velocity"
  | "api gamma ray"
  | "api gravity"
  | "api neutron"
  | "area"
  | "area per amount of substance"
  | "area per area"
  | "area per count"
  | "area per mass"
  | "area per time"
  | "area per volume"
  | "attenuation per frequency interval"
  | "capacitance"
  | "cation exchange capacity"
  | "data transfer speed"
  | "diffusion coefficient"
  | "diffusive time of flight"
  | "digital storage"
  | "dimensionless"
  | "dipole moment"
  | "dose equivalent"
  | "dynamic viscosity"
  | "electric charge"
  | "electric charge per area"
  | "electric charge per mass"
  | "electric charge per volume"
  | "electric conductance"
  | "electric conductivity"
  | "electric current"
  | "electric current density"
  | "electric field strength"
  | "electric potential difference"
  | "electric resistance"
  | "electric resistance per length"
  | "electrical resistivity"
  | "electromagnetic moment"
  | "energy"
  | "energy length per area"
  | "energy length per time area temperature"
  | "energy per area"
  | "energy per length"
  | "energy per mass"
  | "energy per mass per time"
  | "energy per volume"
  | "force"
  | "force area"
  | "force length per length"
  | "force per force"
  | "force per length"
  | "force per volume"
  | "frequency"
  | "frequency interval"
  | "heat capacity"
  | "heat flow rate"
  | "heat transfer coefficient"
  | "illuminance"
  | "inductance"
  | "isothermal compressibility"
  | "kinematic viscosity"
  | "length"
  | "length per angle"
  | "length per length"
  | "length per mass"
  | "length per pressure"
  | "length per temperature"
  | "length per time"
  | "length per volume"
  | "light exposure"
  | "linear acceleration"
  | "linear thermal expansion"
  | "logarithmic power ratio"
  | "logarithmic power ratio per length"
  | "luminance"
  | "luminous efficacy"
  | "luminous flux"
  | "luminous intensity"
  | "magnetic dipole moment"
  | "magnetic field strength"
  | "magnetic flux"
  | "magnetic flux density"
  | "magnetic flux density per length"
  | "magnetic permeability"
  | "magnetic vector potential"
  | "mass"
  | "mass length"
  | "mass per area"
  | "mass per energy"
  | "mass per length"
  | "mass per mass"
  | "mass per time"
  | "mass per time per area"
  | "mass per time per length"
  | "mass per volume"
  | "mass per volume per length"
  | "mass per volume per pressure"
  | "mass per volume per temperature"
  | "mobility"
  | "molar energy"
  | "molar heat capacity"
  | "molar volume"
  | "molecular weight"
  | "moment of force"
  | "moment of inertia"
  | "momentum"
  | "normalized power"
  | "pressure per flowrate"
  | "pressure per flowrate squared"
  | "permeability length"
  | "permeability rock"
  | "permittivity"
  | "plane angle"
  | "potential difference per power drop"
  | "power"
  | "power per area"
  | "power per power"
  | "power per volume"
  | "pressure"
  | "pressure per pressure"
  | "pressure per time"
  | "pressure per volume"
  | "pressure squared"
  | "pressure squared per force time per area"
  | "pressure time per volume"
  | "quantity of light"
  | "radiance"
  | "radiant intensity"
  | "reciprocal area"
  | "reciprocal electric potential difference"
  | "reciprocal force"
  | "reciprocal length"
  | "reciprocal mass"
  | "reciprocal mass time"
  | "reciprocal pressure"
  | "reciprocal time"
  | "reciprocal volume"
  | "reluctance"
  | "second moment of area"
  | "signaling event per time"
  | "solid angle"
  | "specific heat capacity"
  | "temperature interval"
  | "temperature interval per length"
  | "temperature interval per pressure"
  | "temperature interval per time"
  | "thermal conductance"
  | "thermal conductivity"
  | "thermal diffusivity"
  | "thermal insulance"
  | "thermal resistance"
  | "thermodynamic temperature"
  | "thermodynamic temperature per thermodynamic temperature"
  | "time"
  | "time per length"
  | "time per mass"
  | "time per time"
  | "time per volume"
  | "vertical coordinate"
  | "volume"
  | "volume flow rate per volume flow rate"
  | "volume per area"
  | "volume per length"
  | "volume per mass"
  | "volume per pressure"
  | "volume per rotation"
  | "volume per time"
  | "volume per time length"
  | "volume per time per area"
  | "volume per time per length"
  | "volume per time per pressure"
  | "volume per time per pressure length"
  | "volume per time per time"
  | "volume per time per volume"
  | "volume per volume"
  | "volumetric heat transfer coefficient"
  | "volumetric thermal expansion"
  | "unitless"
  | "not a measure";
interface _QuantityClassKind extends _TypeEnum {
  _: QuantityClassKind;
}

export type QuantityClassKindExt = string;
type _QuantityClassKindExt = Primitive._string;

interface _QuantityOfLightMeasure extends _AbstractMeasure {
  uom: QuantityOfLightUom;
}
export interface QuantityOfLightMeasure extends _QuantityOfLightMeasure {}

interface _QuantityOfLightMeasureExt extends _AbstractMeasure {
  uom: QuantityOfLightUomExt;
}
export interface QuantityOfLightMeasureExt extends _QuantityOfLightMeasureExt {}

export type QuantityOfLightUom = "lm.s";
interface _QuantityOfLightUom extends _UomEnum {
  _: QuantityOfLightUom;
}

export type QuantityOfLightUomExt = string;
type _QuantityOfLightUomExt = Primitive._string;

interface _RadianceMeasure extends _AbstractMeasure {
  uom: RadianceUom;
}
export interface RadianceMeasure extends _RadianceMeasure {}

interface _RadianceMeasureExt extends _AbstractMeasure {
  uom: RadianceUomExt;
}
export interface RadianceMeasureExt extends _RadianceMeasureExt {}

export type RadianceUom = "W/(m2.sr)";
interface _RadianceUom extends _UomEnum {
  _: RadianceUom;
}

export type RadianceUomExt = string;
type _RadianceUomExt = Primitive._string;

interface _RadiantIntensityMeasure extends _AbstractMeasure {
  uom: RadiantIntensityUom;
}
export interface RadiantIntensityMeasure extends _RadiantIntensityMeasure {}

interface _RadiantIntensityMeasureExt extends _AbstractMeasure {
  uom: RadiantIntensityUomExt;
}
export interface RadiantIntensityMeasureExt
  extends _RadiantIntensityMeasureExt {}

export type RadiantIntensityUom = "W/sr";
interface _RadiantIntensityUom extends _UomEnum {
  _: RadiantIntensityUom;
}

export type RadiantIntensityUomExt = string;
type _RadiantIntensityUomExt = Primitive._string;

interface _ReciprocalAreaMeasure extends _AbstractMeasure {
  uom: ReciprocalAreaUom;
}
export interface ReciprocalAreaMeasure extends _ReciprocalAreaMeasure {}

interface _ReciprocalAreaMeasureExt extends _AbstractMeasure {
  uom: ReciprocalAreaUomExt;
}
export interface ReciprocalAreaMeasureExt extends _ReciprocalAreaMeasureExt {}

export type ReciprocalAreaUom = "1/ft2" | "1/km2" | "1/m2" | "1/mi2";
interface _ReciprocalAreaUom extends _UomEnum {
  _: ReciprocalAreaUom;
}

export type ReciprocalAreaUomExt = string;
type _ReciprocalAreaUomExt = Primitive._string;

interface _ReciprocalElectricPotentialDifferenceMeasure
  extends _AbstractMeasure {
  uom: ReciprocalElectricPotentialDifferenceUom;
}
export interface ReciprocalElectricPotentialDifferenceMeasure
  extends _ReciprocalElectricPotentialDifferenceMeasure {}

interface _ReciprocalElectricPotentialDifferenceMeasureExt
  extends _AbstractMeasure {
  uom: ReciprocalElectricPotentialDifferenceUomExt;
}
export interface ReciprocalElectricPotentialDifferenceMeasureExt
  extends _ReciprocalElectricPotentialDifferenceMeasureExt {}

export type ReciprocalElectricPotentialDifferenceUom = "1/uV" | "1/V";
interface _ReciprocalElectricPotentialDifferenceUom extends _UomEnum {
  _: ReciprocalElectricPotentialDifferenceUom;
}

export type ReciprocalElectricPotentialDifferenceUomExt = string;
type _ReciprocalElectricPotentialDifferenceUomExt = Primitive._string;

interface _ReciprocalForceMeasure extends _AbstractMeasure {
  uom: ReciprocalForceUom;
}
export interface ReciprocalForceMeasure extends _ReciprocalForceMeasure {}

interface _ReciprocalForceMeasureExt extends _AbstractMeasure {
  uom: ReciprocalForceUomExt;
}
export interface ReciprocalForceMeasureExt extends _ReciprocalForceMeasureExt {}

export type ReciprocalForceUom = "1/lbf" | "1/N";
interface _ReciprocalForceUom extends _UomEnum {
  _: ReciprocalForceUom;
}

export type ReciprocalForceUomExt = string;
type _ReciprocalForceUomExt = Primitive._string;

interface _ReciprocalLengthMeasure extends _AbstractMeasure {
  uom: ReciprocalLengthUom;
}
export interface ReciprocalLengthMeasure extends _ReciprocalLengthMeasure {}

interface _ReciprocalLengthMeasureExt extends _AbstractMeasure {
  uom: ReciprocalLengthUomExt;
}
export interface ReciprocalLengthMeasureExt
  extends _ReciprocalLengthMeasureExt {}

export type ReciprocalLengthUom =
  | "1/angstrom"
  | "1/cm"
  | "1/ft"
  | "1/in"
  | "1/m"
  | "1/mi"
  | "1/mm"
  | "1/nm"
  | "1/yd"
  | "1E-9 1/ft";
interface _ReciprocalLengthUom extends _UomEnum {
  _: ReciprocalLengthUom;
}

export type ReciprocalLengthUomExt = string;
type _ReciprocalLengthUomExt = Primitive._string;

interface _ReciprocalMassMeasure extends _AbstractMeasure {
  uom: ReciprocalMassUom;
}
export interface ReciprocalMassMeasure extends _ReciprocalMassMeasure {}

interface _ReciprocalMassMeasureExt extends _AbstractMeasure {
  uom: ReciprocalMassUomExt;
}
export interface ReciprocalMassMeasureExt extends _ReciprocalMassMeasureExt {}

interface _ReciprocalMassTimeMeasure extends _AbstractMeasure {
  uom: ReciprocalMassTimeUom;
}
export interface ReciprocalMassTimeMeasure extends _ReciprocalMassTimeMeasure {}

interface _ReciprocalMassTimeMeasureExt extends _AbstractMeasure {
  uom: ReciprocalMassTimeUomExt;
}
export interface ReciprocalMassTimeMeasureExt
  extends _ReciprocalMassTimeMeasureExt {}

export type ReciprocalMassTimeUom = "1/(kg.s)" | "Bq/kg" | "pCi/g";
interface _ReciprocalMassTimeUom extends _UomEnum {
  _: ReciprocalMassTimeUom;
}

export type ReciprocalMassTimeUomExt = string;
type _ReciprocalMassTimeUomExt = Primitive._string;

export type ReciprocalMassUom = "1/g" | "1/kg" | "1/lbm";
interface _ReciprocalMassUom extends _UomEnum {
  _: ReciprocalMassUom;
}

export type ReciprocalMassUomExt = string;
type _ReciprocalMassUomExt = Primitive._string;

interface _ReciprocalPressureMeasure extends _AbstractMeasure {
  uom: ReciprocalPressureUom;
}
export interface ReciprocalPressureMeasure extends _ReciprocalPressureMeasure {}

interface _ReciprocalPressureMeasureExt extends _AbstractMeasure {
  uom: ReciprocalPressureUomExt;
}
export interface ReciprocalPressureMeasureExt
  extends _ReciprocalPressureMeasureExt {}

export type ReciprocalPressureUom =
  | "1/bar"
  | "1/kPa"
  | "1/Pa"
  | "1/pPa"
  | "1/psi"
  | "1/upsi";
interface _ReciprocalPressureUom extends _UomEnum {
  _: ReciprocalPressureUom;
}

export type ReciprocalPressureUomExt = string;
type _ReciprocalPressureUomExt = Primitive._string;

interface _ReciprocalTimeMeasure extends _AbstractMeasure {
  uom: ReciprocalTimeUom;
}
export interface ReciprocalTimeMeasure extends _ReciprocalTimeMeasure {}

interface _ReciprocalTimeMeasureExt extends _AbstractMeasure {
  uom: ReciprocalTimeUomExt;
}
export interface ReciprocalTimeMeasureExt extends _ReciprocalTimeMeasureExt {}

export type ReciprocalTimeUom =
  | "1/a"
  | "1/d"
  | "1/h"
  | "1/min"
  | "1/ms"
  | "1/s"
  | "1/us"
  | "1/wk";
interface _ReciprocalTimeUom extends _UomEnum {
  _: ReciprocalTimeUom;
}

export type ReciprocalTimeUomExt = string;
type _ReciprocalTimeUomExt = Primitive._string;

interface _ReciprocalVolumeMeasure extends _AbstractMeasure {
  uom: ReciprocalVolumeUom;
}
export interface ReciprocalVolumeMeasure extends _ReciprocalVolumeMeasure {}

interface _ReciprocalVolumeMeasureExt extends _AbstractMeasure {
  uom: ReciprocalVolumeUomExt;
}
export interface ReciprocalVolumeMeasureExt
  extends _ReciprocalVolumeMeasureExt {}

export type ReciprocalVolumeUom =
  | "1/bbl"
  | "1/ft3"
  | "1/gal[UK]"
  | "1/gal[US]"
  | "1/L"
  | "1/m3";
interface _ReciprocalVolumeUom extends _UomEnum {
  _: ReciprocalVolumeUom;
}

export type ReciprocalVolumeUomExt = string;
type _ReciprocalVolumeUomExt = Primitive._string;

/** A reference point defined in the context of another reference point. */
interface _RecursiveReferencePoint extends _AbstractReferencePoint {
  BaseReferencePoint: DataObjectReference;
  HorizontalCoordinates?: HorizontalCoordinates;
  /** The vertical distance in elevation (positive up) between the reference point and its BaseReferencePoint. */
  VerticalCoordinate?: number;
}
export interface RecursiveReferencePoint extends _RecursiveReferencePoint {}

/** Combinations of standard temperature and pressure including "ambient". The list of standard values is contained in the enumValuesProdml.xml file. */
export type ReferenceCondition =
  | "0 degC 1 atm"
  | "0 degC 1 bar"
  | "15 degC 1 atm"
  | "15 degC 1 bar"
  | "20 degC 1 atm"
  | "20 degC 1 bar"
  | "25 degC 1 bar"
  | "60 degF 1 atm"
  | "60 degF 30 in Hg"
  | "ambient";
interface _ReferenceCondition extends _TypeEnum {
  _: ReferenceCondition;
}

export type ReferenceConditionExt = string;
type _ReferenceConditionExt = Primitive._string;

interface _ReferencePointElevation extends _AbstractElevation {
  ReferencePoint: DataObjectReference;
}
export interface ReferencePointElevation extends _ReferencePointElevation {}

/** A reference point which is defined in the context of a compound (2d horizontal + 1D vertical) CRS. */
interface _ReferencePointInACrs extends _AbstractReferencePoint {
  HorizontalCoordinates?: AbstractHorizontalCoordinates;
  VerticalCoordinate?: number;
  VerticalCrs?: DataObjectReference;
}
export interface ReferencePointInACrs extends _ReferencePointInACrs {}

/** A reference point which is defined in the context of a compound (2D horizontal + 1D vertical) CRS.
 * Note that a 2D compound CRS can be transferred  by omitting the vertical Coordinate3 */
interface _ReferencePointInALocalEngineeringCompoundCrs
  extends _AbstractReferencePoint {
  Crs: DataObjectReference;
  HorizontalCoordinates?: HorizontalCoordinates;
  VerticalCoordinate?: number;
}
export interface ReferencePointInALocalEngineeringCompoundCrs
  extends _ReferencePointInALocalEngineeringCompoundCrs {}

/** A reference point which is defined in the context of a wellbore by means of a MD.
 *
 * If TVD is needed, it must be given through the inherited vertical Coordinate. */
interface _ReferencePointInAWellbore extends _RecursiveReferencePoint {
  /** The measured depth (depth along the wellbore) from the reference point to its BaseReferencePoint. */
  Md: LengthMeasureExt;
  /** An optional Trajectory used in calculation of the VerticalCoordinate if present, especially if the VerticalCoordinate is in TVD. */
  Trajectory?: DataObjectReference;
  /** The wellbore holding the reference point. */
  Wellbore: DataObjectReference;
}
export interface ReferencePointInAWellbore extends _ReferencePointInAWellbore {}

/** This enumeration holds the normal wellbore datum references plus Well head and well surface location, the two common reference points not along a wellbore. */
export type ReferencePointKind =
  | "casing flange"
  | "crown valve"
  | "derrick floor"
  | "ground level"
  | "kelly bushing"
  | "kickoff point"
  | "lowest astronomical tide"
  | "mean high water"
  | "mean higher high water"
  | "mean low water"
  | "mean lower low water"
  | "mean sea level"
  | "mean tide level"
  | "rotary bushing"
  | "rotary table"
  | "seafloor"
  | "wellhead"
  | "well surface location";
interface _ReferencePointKind extends _TypeEnum {
  _: ReferencePointKind;
}

export type ReferencePointKindExt = string;
type _ReferencePointKindExt = Primitive._string;

interface _ReferencePointTvdInterval extends _AbstractTvdInterval {
  ReferencePoint: DataObjectReference;
}
export interface ReferencePointTvdInterval extends _ReferencePointTvdInterval {}

interface _ReferencePointVerticalDepth extends _AbstractVerticalDepth {
  ReferencePoint: DataObjectReference;
}
export interface ReferencePointVerticalDepth
  extends _ReferencePointVerticalDepth {}

interface _ReferencePressure extends _AbstractMeasure {
  referencePressureKind?: ReferencePressureKind;
  uom: PressureUom;
}
export interface ReferencePressure extends _ReferencePressure {}

/** ReferencePressureKind */
export type ReferencePressureKind = "absolute" | "ambient" | "legal";
interface _ReferencePressureKind extends _TypeEnum {
  _: ReferencePressureKind;
}

/** StdTempPress */
interface _ReferenceTemperaturePressure extends _AbstractTemperaturePressure {
  /** Defines the reference temperature and pressure to which the density has been corrected. If neither standardTempPres nor temp,pres are specified then the standard condition is defined by standardTempPres at the procuctVolume root. */
  ReferenceTempPres: ReferenceConditionExt;
}
export interface ReferenceTemperaturePressure
  extends _ReferenceTemperaturePressure {}

interface _RelativePressure extends _AbstractPressureValue {
  ReferencePressure: ReferencePressure;
  RelativePressure: PressureMeasure;
}
export interface RelativePressure extends _RelativePressure {}

interface _RelativePressureInterval extends _AbstractPressureInterval {
  MaxPressure: RelativePressure;
  MinPressure: RelativePressure;
}
export interface RelativePressureInterval extends _RelativePressureInterval {}

interface _ReluctanceMeasure extends _AbstractMeasure {
  uom: ReluctanceUom;
}
export interface ReluctanceMeasure extends _ReluctanceMeasure {}

interface _ReluctanceMeasureExt extends _AbstractMeasure {
  uom: ReluctanceUomExt;
}
export interface ReluctanceMeasureExt extends _ReluctanceMeasureExt {}

export type ReluctanceUom = "1/H";
interface _ReluctanceUom extends _UomEnum {
  _: ReluctanceUom;
}

export type ReluctanceUomExt = string;
type _ReluctanceUomExt = Primitive._string;

interface _ScalarInterval extends _AbstractInterval {
  MaxValue: GenericMeasure;
  MinValue: GenericMeasure;
}
export interface ScalarInterval extends _ScalarInterval {}

interface _SecondMomentOfAreaMeasure extends _AbstractMeasure {
  uom: SecondMomentOfAreaUom;
}
export interface SecondMomentOfAreaMeasure extends _SecondMomentOfAreaMeasure {}

interface _SecondMomentOfAreaMeasureExt extends _AbstractMeasure {
  uom: SecondMomentOfAreaUomExt;
}
export interface SecondMomentOfAreaMeasureExt
  extends _SecondMomentOfAreaMeasureExt {}

export type SecondMomentOfAreaUom = "cm4" | "in4" | "m4";
interface _SecondMomentOfAreaUom extends _UomEnum {
  _: SecondMomentOfAreaUom;
}

export type SecondMomentOfAreaUomExt = string;
type _SecondMomentOfAreaUomExt = Primitive._string;

/** Sections are numbered "1" through "36." Irregular sections may be designated with a single value after a decimal point. USA Public Land Survey System.@pattern [+]?([1-9]|[1-2][0-9]|3[0-6])\.?[0-9]? */
export type SectionNumber = string;
type _SectionNumber = _String64;

interface _SignalingEventPerTimeMeasure extends _AbstractMeasure {
  uom: SignalingEventPerTimeUom;
}
export interface SignalingEventPerTimeMeasure
  extends _SignalingEventPerTimeMeasure {}

interface _SignalingEventPerTimeMeasureExt extends _AbstractMeasure {
  uom: SignalingEventPerTimeUomExt;
}
export interface SignalingEventPerTimeMeasureExt
  extends _SignalingEventPerTimeMeasureExt {}

export type SignalingEventPerTimeUom = "Bd";
interface _SignalingEventPerTimeUom extends _UomEnum {
  _: SignalingEventPerTimeUom;
}

export type SignalingEventPerTimeUomExt = string;
type _SignalingEventPerTimeUomExt = Primitive._string;

/** Indicates the data objects that are associated to a single collection.
 * BUSINESS RULE: The same collection CANNOT be used in multiple SingleCollectionAssociations of the same CollectionsToDataobjectsAssociations.
 * BUSINESS RULE : If two or more of the same data objects are used in one SingleCollectionAssociation, only one data object should be taken into account and the other ones must be ignored. */
interface _SingleCollectionAssociation extends BaseType {
  Collection: DataObjectReference;
  Dataobject: DataObjectReference[];
  /** Boolean flag. If true all data objects in the collection are of the same Energistics data type (EXAMPLE: All wellbores or all horizons). */
  HomogeneousDatatype?: boolean;
}
export interface SingleCollectionAssociation
  extends _SingleCollectionAssociation {}

interface _SolidAngleMeasure extends _AbstractMeasure {
  uom: SolidAngleUom;
}
export interface SolidAngleMeasure extends _SolidAngleMeasure {}

interface _SolidAngleMeasureExt extends _AbstractMeasure {
  uom: SolidAngleUomExt;
}
export interface SolidAngleMeasureExt extends _SolidAngleMeasureExt {}

export type SolidAngleUom = "sr";
interface _SolidAngleUom extends _UomEnum {
  _: SolidAngleUom;
}

export type SolidAngleUomExt = string;
type _SolidAngleUomExt = Primitive._string;

interface _SpecificHeatCapacityMeasure extends _AbstractMeasure {
  uom: SpecificHeatCapacityUom;
}
export interface SpecificHeatCapacityMeasure
  extends _SpecificHeatCapacityMeasure {}

interface _SpecificHeatCapacityMeasureExt extends _AbstractMeasure {
  uom: SpecificHeatCapacityUomExt;
}
export interface SpecificHeatCapacityMeasureExt
  extends _SpecificHeatCapacityMeasureExt {}

export type SpecificHeatCapacityUom =
  | "Btu[IT]/(lbm.deltaF)"
  | "Btu[IT]/(lbm.deltaR)"
  | "cal[th]/(g.deltaK)"
  | "J/(g.deltaK)"
  | "J/(kg.deltaK)"
  | "kcal[th]/(kg.deltaC)"
  | "kJ/(kg.deltaK)"
  | "kW.h/(kg.deltaC)";
interface _SpecificHeatCapacityUom extends _UomEnum {
  _: SpecificHeatCapacityUom;
}

export type SpecificHeatCapacityUomExt = string;
type _SpecificHeatCapacityUomExt = Primitive._string;

export type String2000 = string;
type _String2000 = _AbstractString;

export type String256 = string;
type _String256 = _AbstractString;

export type String64 = string;
type _String64 = _AbstractString;

interface _StringArrayStatistics extends BaseType {
  ModePercentage?: number;
  ValuesMode?: string;
}
export interface StringArrayStatistics extends _StringArrayStatistics {}

/** Represents an array of Boolean values where all values are identical. This an optimization for which an array of explicit Boolean values is not required. */
interface _StringConstantArray extends _AbstractStringArray {
  /** Size of the array. */
  Count: PositiveLong;
  /** Value inside all the elements of the array. */
  Value: String2000;
}
export interface StringConstantArray extends _StringConstantArray {}

/** Used to store explicit string values, i.e., values that are not double, boolean or integers. The datatype of the values will be identified by means of the HDF5 API. */
interface _StringExternalArray extends _AbstractStringArray {
  CountPerValue: number;
  /** Reference to HDF5 array of integer or double */
  Values: ExternalDataArray;
}
export interface StringExternalArray extends _StringExternalArray {}

interface _StringMeasure extends _String2000 {
  uom?: UnitOfMeasureExt;
}
export interface StringMeasure extends _StringMeasure {}

/** Parameter containing a string value. */
interface _StringParameter extends _AbstractActivityParameter {
  /** String value */
  Value: String2000;
}
export interface StringParameter extends _StringParameter {}

/** Key used to identify a parameter value associated with a string value. */
interface _StringParameterKey extends _AbstractParameterKey {
  /** String value */
  Value: String2000;
}
export interface StringParameterKey extends _StringParameterKey {}

interface _StringXmlArray extends _AbstractStringArray {
  CountPerValue: number;
  Values: string[];
}
export interface StringXmlArray extends _StringXmlArray {}

interface _TemperatureInterval extends _AbstractInterval {
  MaxTemperature: ThermodynamicTemperatureMeasureExt;
  MinTemperature: ThermodynamicTemperatureMeasureExt;
}
export interface TemperatureInterval extends _TemperatureInterval {}

interface _TemperatureIntervalMeasure extends _AbstractMeasure {
  uom: TemperatureIntervalUom;
}
export interface TemperatureIntervalMeasure
  extends _TemperatureIntervalMeasure {}

interface _TemperatureIntervalMeasureExt extends _AbstractMeasure {
  uom: TemperatureIntervalUomExt;
}
export interface TemperatureIntervalMeasureExt
  extends _TemperatureIntervalMeasureExt {}

interface _TemperatureIntervalPerLengthMeasure extends _AbstractMeasure {
  uom: TemperatureIntervalPerLengthUom;
}
export interface TemperatureIntervalPerLengthMeasure
  extends _TemperatureIntervalPerLengthMeasure {}

interface _TemperatureIntervalPerLengthMeasureExt extends _AbstractMeasure {
  uom: TemperatureIntervalPerLengthUomExt;
}
export interface TemperatureIntervalPerLengthMeasureExt
  extends _TemperatureIntervalPerLengthMeasureExt {}

export type TemperatureIntervalPerLengthUom =
  | "0.01 deltaF/ft"
  | "deltaC/ft"
  | "deltaC/hm"
  | "deltaC/km"
  | "deltaC/m"
  | "deltaF/ft"
  | "deltaF/m"
  | "deltaK/km"
  | "deltaK/m";
interface _TemperatureIntervalPerLengthUom extends _UomEnum {
  _: TemperatureIntervalPerLengthUom;
}

export type TemperatureIntervalPerLengthUomExt = string;
type _TemperatureIntervalPerLengthUomExt = Primitive._string;

interface _TemperatureIntervalPerPressureMeasure extends _AbstractMeasure {
  uom: TemperatureIntervalPerPressureUom;
}
export interface TemperatureIntervalPerPressureMeasure
  extends _TemperatureIntervalPerPressureMeasure {}

interface _TemperatureIntervalPerPressureMeasureExt extends _AbstractMeasure {
  uom: TemperatureIntervalPerPressureUomExt;
}
export interface TemperatureIntervalPerPressureMeasureExt
  extends _TemperatureIntervalPerPressureMeasureExt {}

export type TemperatureIntervalPerPressureUom =
  | "deltaC/kPa"
  | "deltaF/psi"
  | "deltaK/Pa";
interface _TemperatureIntervalPerPressureUom extends _UomEnum {
  _: TemperatureIntervalPerPressureUom;
}

export type TemperatureIntervalPerPressureUomExt = string;
type _TemperatureIntervalPerPressureUomExt = Primitive._string;

interface _TemperatureIntervalPerTimeMeasure extends _AbstractMeasure {
  uom: TemperatureIntervalPerTimeUom;
}
export interface TemperatureIntervalPerTimeMeasure
  extends _TemperatureIntervalPerTimeMeasure {}

interface _TemperatureIntervalPerTimeMeasureExt extends _AbstractMeasure {
  uom: TemperatureIntervalPerTimeUomExt;
}
export interface TemperatureIntervalPerTimeMeasureExt
  extends _TemperatureIntervalPerTimeMeasureExt {}

export type TemperatureIntervalPerTimeUom =
  | "deltaC/h"
  | "deltaC/min"
  | "deltaC/s"
  | "deltaF/h"
  | "deltaF/min"
  | "deltaF/s"
  | "deltaK/s";
interface _TemperatureIntervalPerTimeUom extends _UomEnum {
  _: TemperatureIntervalPerTimeUom;
}

export type TemperatureIntervalPerTimeUomExt = string;
type _TemperatureIntervalPerTimeUomExt = Primitive._string;

export type TemperatureIntervalUom = "deltaC" | "deltaF" | "deltaK" | "deltaR";
interface _TemperatureIntervalUom extends _UomEnum {
  _: TemperatureIntervalUom;
}

export type TemperatureIntervalUomExt = string;
type _TemperatureIntervalUomExt = Primitive._string;

/** temperature and pressure */
interface _TemperaturePressure extends _AbstractTemperaturePressure {
  /** The pressure to which the density has been corrected. If given, then a temperature must also be given. Common standard pressures are: 1 atm and 14.696 psi (which are equivalent). If neither standardTempPres nor temp,pres are specified then the standard condition is defined by standardTempPres at the productVolume root. */
  Pressure: PressureMeasure;
  /** The temperature to which the density has been corrected. If given, then a pressure must also be given. Common standard temperatures are: 0 degC, 15 degC, 60 degF. If neither standardTempPres nor temp,pres are specified then the standard condition is defined by standardTempPres at the productVolume root. */
  Temperature: ThermodynamicTemperatureMeasure;
}
export interface TemperaturePressure extends _TemperaturePressure {}

interface _ThermalConductanceMeasure extends _AbstractMeasure {
  uom: ThermalConductanceUom;
}
export interface ThermalConductanceMeasure extends _ThermalConductanceMeasure {}

interface _ThermalConductanceMeasureExt extends _AbstractMeasure {
  uom: ThermalConductanceUomExt;
}
export interface ThermalConductanceMeasureExt
  extends _ThermalConductanceMeasureExt {}

export type ThermalConductanceUom = "W/deltaK";
interface _ThermalConductanceUom extends _UomEnum {
  _: ThermalConductanceUom;
}

export type ThermalConductanceUomExt = string;
type _ThermalConductanceUomExt = Primitive._string;

interface _ThermalConductivityMeasure extends _AbstractMeasure {
  uom: ThermalConductivityUom;
}
export interface ThermalConductivityMeasure
  extends _ThermalConductivityMeasure {}

interface _ThermalConductivityMeasureExt extends _AbstractMeasure {
  uom: ThermalConductivityUomExt;
}
export interface ThermalConductivityMeasureExt
  extends _ThermalConductivityMeasureExt {}

export type ThermalConductivityUom =
  | "Btu[IT]/(h.ft.deltaF)"
  | "cal[th]/(h.cm.deltaC)"
  | "cal[th]/(s.cm.deltaC)"
  | "kcal[th]/(h.m.deltaC)"
  | "W/(m.deltaK)";
interface _ThermalConductivityUom extends _UomEnum {
  _: ThermalConductivityUom;
}

export type ThermalConductivityUomExt = string;
type _ThermalConductivityUomExt = Primitive._string;

interface _ThermalDiffusivityMeasure extends _AbstractMeasure {
  uom: ThermalDiffusivityUom;
}
export interface ThermalDiffusivityMeasure extends _ThermalDiffusivityMeasure {}

interface _ThermalDiffusivityMeasureExt extends _AbstractMeasure {
  uom: ThermalDiffusivityUomExt;
}
export interface ThermalDiffusivityMeasureExt
  extends _ThermalDiffusivityMeasureExt {}

export type ThermalDiffusivityUom =
  | "cm2/s"
  | "ft2/h"
  | "ft2/s"
  | "in2/s"
  | "m2/h"
  | "m2/s"
  | "mm2/s";
interface _ThermalDiffusivityUom extends _UomEnum {
  _: ThermalDiffusivityUom;
}

export type ThermalDiffusivityUomExt = string;
type _ThermalDiffusivityUomExt = Primitive._string;

interface _ThermalInsulanceMeasure extends _AbstractMeasure {
  uom: ThermalInsulanceUom;
}
export interface ThermalInsulanceMeasure extends _ThermalInsulanceMeasure {}

interface _ThermalInsulanceMeasureExt extends _AbstractMeasure {
  uom: ThermalInsulanceUomExt;
}
export interface ThermalInsulanceMeasureExt
  extends _ThermalInsulanceMeasureExt {}

export type ThermalInsulanceUom =
  | "deltaC.m2.h/kcal[th]"
  | "deltaF.ft2.h/Btu[IT]"
  | "deltaK.m2/kW"
  | "deltaK.m2/W";
interface _ThermalInsulanceUom extends _UomEnum {
  _: ThermalInsulanceUom;
}

export type ThermalInsulanceUomExt = string;
type _ThermalInsulanceUomExt = Primitive._string;

interface _ThermalResistanceMeasure extends _AbstractMeasure {
  uom: ThermalResistanceUom;
}
export interface ThermalResistanceMeasure extends _ThermalResistanceMeasure {}

interface _ThermalResistanceMeasureExt extends _AbstractMeasure {
  uom: ThermalResistanceUomExt;
}
export interface ThermalResistanceMeasureExt
  extends _ThermalResistanceMeasureExt {}

export type ThermalResistanceUom = "deltaK/W";
interface _ThermalResistanceUom extends _UomEnum {
  _: ThermalResistanceUom;
}

export type ThermalResistanceUomExt = string;
type _ThermalResistanceUomExt = Primitive._string;

interface _ThermodynamicTemperatureMeasure extends _AbstractMeasure {
  uom: ThermodynamicTemperatureUom;
}
export interface ThermodynamicTemperatureMeasure
  extends _ThermodynamicTemperatureMeasure {}

interface _ThermodynamicTemperatureMeasureExt extends _AbstractMeasure {
  uom: ThermodynamicTemperatureUomExt;
}
export interface ThermodynamicTemperatureMeasureExt
  extends _ThermodynamicTemperatureMeasureExt {}

interface _ThermodynamicTemperaturePerThermodynamicTemperatureMeasure
  extends _AbstractMeasure {
  uom: ThermodynamicTemperaturePerThermodynamicTemperatureUom;
}
export interface ThermodynamicTemperaturePerThermodynamicTemperatureMeasure
  extends _ThermodynamicTemperaturePerThermodynamicTemperatureMeasure {}

interface _ThermodynamicTemperaturePerThermodynamicTemperatureMeasureExt
  extends _AbstractMeasure {
  uom: ThermodynamicTemperaturePerThermodynamicTemperatureUomExt;
}
export interface ThermodynamicTemperaturePerThermodynamicTemperatureMeasureExt
  extends _ThermodynamicTemperaturePerThermodynamicTemperatureMeasureExt {}

export type ThermodynamicTemperaturePerThermodynamicTemperatureUom =
  | "degC/degC"
  | "degF/degF"
  | "degR/degR"
  | "Euc"
  | "K/K";
interface _ThermodynamicTemperaturePerThermodynamicTemperatureUom
  extends _UomEnum {
  _: ThermodynamicTemperaturePerThermodynamicTemperatureUom;
}

export type ThermodynamicTemperaturePerThermodynamicTemperatureUomExt = string;
type _ThermodynamicTemperaturePerThermodynamicTemperatureUomExt =
  Primitive._string;

export type ThermodynamicTemperatureUom = "degC" | "degF" | "degR" | "K";
interface _ThermodynamicTemperatureUom extends _UomEnum {
  _: ThermodynamicTemperatureUom;
}

export type ThermodynamicTemperatureUomExt = string;
type _ThermodynamicTemperatureUomExt = Primitive._string;

/** Index into a time series. Used to specify time. (Not to be confused with time step.) */
interface _TimeIndex extends BaseType {
  /** The index of the time in the time series. */
  Index: NonNegativeLong;
  TimeSeries: DataObjectReference;
}
export interface TimeIndex extends _TimeIndex {}

/** Parameter containing a time index value. */
interface _TimeIndexParameter extends _AbstractActivityParameter {
  TimeIndex: TimeIndex;
}
export interface TimeIndexParameter extends _TimeIndexParameter {}

interface _TimeIndexParameterKey extends _AbstractParameterKey {
  TimeIndex: TimeIndex;
}
export interface TimeIndexParameterKey extends _TimeIndexParameterKey {}

interface _TimeMeasure extends _AbstractMeasure {
  uom: TimeUom;
}
export interface TimeMeasure extends _TimeMeasure {}

interface _TimeMeasureExt extends _AbstractMeasure {
  uom: TimeUomExt;
}
export interface TimeMeasureExt extends _TimeMeasureExt {}

interface _TimeOrIntervalSeries extends BaseType {
  TimeSeries: DataObjectReference;
  UseInterval: boolean;
}
export interface TimeOrIntervalSeries extends _TimeOrIntervalSeries {}

interface _TimePerLengthMeasure extends _AbstractMeasure {
  uom: TimePerLengthUom;
}
export interface TimePerLengthMeasure extends _TimePerLengthMeasure {}

interface _TimePerLengthMeasureExt extends _AbstractMeasure {
  uom: TimePerLengthUomExt;
}
export interface TimePerLengthMeasureExt extends _TimePerLengthMeasureExt {}

export type TimePerLengthUom =
  | "0.001 h/ft"
  | "h/km"
  | "min/ft"
  | "min/m"
  | "ms/cm"
  | "ms/ft"
  | "ms/in"
  | "ms/m"
  | "ns/ft"
  | "ns/m"
  | "s/cm"
  | "s/ft"
  | "s/in"
  | "s/m"
  | "us/ft"
  | "us/in"
  | "us/m";
interface _TimePerLengthUom extends _UomEnum {
  _: TimePerLengthUom;
}

export type TimePerLengthUomExt = string;
type _TimePerLengthUomExt = Primitive._string;

interface _TimePerMassMeasure extends _AbstractMeasure {
  uom: TimePerMassUom;
}
export interface TimePerMassMeasure extends _TimePerMassMeasure {}

interface _TimePerMassMeasureExt extends _AbstractMeasure {
  uom: TimePerMassUomExt;
}
export interface TimePerMassMeasureExt extends _TimePerMassMeasureExt {}

export type TimePerMassUom = "s/kg";
interface _TimePerMassUom extends _UomEnum {
  _: TimePerMassUom;
}

export type TimePerMassUomExt = string;
type _TimePerMassUomExt = Primitive._string;

interface _TimePerTimeMeasure extends _AbstractMeasure {
  uom: TimePerTimeUom;
}
export interface TimePerTimeMeasure extends _TimePerTimeMeasure {}

interface _TimePerTimeMeasureExt extends _AbstractMeasure {
  uom: TimePerTimeUomExt;
}
export interface TimePerTimeMeasureExt extends _TimePerTimeMeasureExt {}

export type TimePerTimeUom = "%" | "Euc" | "ms/s" | "s/s";
interface _TimePerTimeUom extends _UomEnum {
  _: TimePerTimeUom;
}

export type TimePerTimeUomExt = string;
type _TimePerTimeUomExt = Primitive._string;

interface _TimePerVolumeMeasure extends _AbstractMeasure {
  uom: TimePerVolumeUom;
}
export interface TimePerVolumeMeasure extends _TimePerVolumeMeasure {}

interface _TimePerVolumeMeasureExt extends _AbstractMeasure {
  uom: TimePerVolumeUomExt;
}
export interface TimePerVolumeMeasureExt extends _TimePerVolumeMeasureExt {}

export type TimePerVolumeUom =
  | "0.001 d/ft3"
  | "d/bbl"
  | "d/ft3"
  | "d/m3"
  | "h/ft3"
  | "h/m3"
  | "s/ft3"
  | "s/L"
  | "s/m3"
  | "s/qt[UK]"
  | "s/qt[US]";
interface _TimePerVolumeUom extends _UomEnum {
  _: TimePerVolumeUom;
}

export type TimePerVolumeUomExt = string;
type _TimePerVolumeUomExt = Primitive._string;

/** Stores an ordered list of times, for example, for time-dependent properties, geometries, or representations. It is used in conjunction with the time index to specify times for RESQML.
 *
 * Business Rule: If present TimeStep count must match Time count */
interface _TimeSeries extends _AbstractObject {
  /** Individual times composing the series. The list ordering is used by the time index. */
  Time: GeologicTime[];
  TimeSeriesParentage?: TimeSeriesParentage;
  TimeStep?: AbstractIntegerArray;
}
export interface TimeSeries extends _TimeSeries {}

/** Indicates that a time series has the associated time series as a parent, i.e., that the series continues from the parent time series. */
interface _TimeSeriesParentage extends BaseType {
  /** Used to indicate that a time series overlaps with its parent time series, e.g., as may be done for simulation studies, where the end state of one calculation is the initial state of the next. */
  HasOverlap: boolean;
  ParentTimeIndex: TimeIndex;
}
export interface TimeSeriesParentage extends _TimeSeriesParentage {}

/** @pattern .+T.+[Z+\-].* */
export type TimeStamp = Date;
type _TimeStamp = Primitive._Date;

export type TimeUom =
  | "1/2 ms"
  | "100 ka[t]"
  | "a"
  | "a[t]"
  | "ca"
  | "cs"
  | "d"
  | "ds"
  | "Ea[t]"
  | "fa"
  | "Ga[t]"
  | "h"
  | "hs"
  | "ka[t]"
  | "Ma[t]"
  | "min"
  | "ms"
  | "na"
  | "ns"
  | "ps"
  | "s"
  | "Ta[t]"
  | "us"
  | "wk";
interface _TimeUom extends _UomEnum {
  _: TimeUom;
}

export type TimeUomExt = string;
type _TimeUomExt = Primitive._string;

/** A time zone conforming to the XSD:dateTime specification.@pattern [Z]|([\-+](([01][0-9])|(2[0-3])):[0-5][0-9]) */
export type TimeZone = string;
type _TimeZone = _String64;

/** The intended abstract supertype of all enumerated "types". This abstract type allows the maximum length of a type enumeration to be centrally defined. This type should not be used directly except to derive another type. It should also be used for uncontrolled strings which are candidates to become enumerations at a future date. */
export type TypeEnum = string;
type _TypeEnum = _String64;

/** A unitless measure is a measure which has no unit of measure symbol, but could be a real physical measurement. Examples would be pH, wire gauge (AWG and BWG) and shoe size.
 *
 * This is different from a dimensionless measure which represents a ratio whose units of measure have cancelled each other. DImensionless measures can have units of measure (like ppm or %) or may not have a displayable unit of measure symbol (in which case the units symbol Euc is used in a data transfer). */
export type UnitlessMeasure = number;
type _UnitlessMeasure = _AbstractMeasure;

/** This is a list of the valid units of measure across all the measure classes. Its intended use is to ensure that a valid unit of measure string is used in cases where the measure class is not known in advance or is otherwise not explicitly modeled in the XML schema. */
export type UnitOfMeasure =
  | "%"
  | "%[area]"
  | "%[mass]"
  | "%[molar]"
  | "%[vol]"
  | "(bbl/d)/(bbl/d)"
  | "(m3/d)/(m3/d)"
  | "(m3/s)/(m3/s)"
  | "0.001 bbl/ft3"
  | "0.001 bbl/m3"
  | "0.001 d/ft3"
  | "0.001 gal[UK]/bbl"
  | "0.001 gal[UK]/gal[UK]"
  | "0.001 gal[US]/bbl"
  | "0.001 gal[US]/ft3"
  | "0.001 gal[US]/gal[US]"
  | "0.001 h/ft"
  | "0.001 kPa2/cP"
  | "0.001 lbm/bbl"
  | "0.001 lbm/gal[UK]"
  | "0.001 lbm/gal[US]"
  | "0.001 psi/ft"
  | "0.001 pt[UK]/bbl"
  | "0.001 seca"
  | "0.01 bbl/bbl"
  | "0.01 dega/ft"
  | "0.01 degF/ft"
  | "0.01 dm3/km"
  | "0.01 ft/ft"
  | "0.01 grain/ft3"
  | "0.01 L/kg"
  | "0.01 L/km"
  | "0.01 lbf/ft"
  | "0.01 lbf/ft2"
  | "0.01 lbm/ft2"
  | "0.01 psi/ft"
  | "0.1 ft"
  | "0.1 ft[US]"
  | "0.1 gal[US]/bbl"
  | "0.1 in"
  | "0.1 L/bbl"
  | "0.1 lbm/bbl"
  | "0.1 pt[US]/bbl"
  | "0.1 yd"
  | "1/(kg.s)"
  | "1/16 in"
  | "1/2 ft"
  | "1/2 ms"
  | "1/30 cm3/min"
  | "1/30 dega/ft"
  | "1/30 dega/m"
  | "1/30 lbf/m"
  | "1/30 m/m"
  | "1/30 N/m"
  | "1/32 in"
  | "1/64 in"
  | "1/a"
  | "1/angstrom"
  | "1/bar"
  | "1/bbl"
  | "1/cm"
  | "1/d"
  | "1/degC"
  | "1/degF"
  | "1/degR"
  | "1/ft"
  | "1/ft2"
  | "1/ft3"
  | "1/g"
  | "1/gal[UK]"
  | "1/gal[US]"
  | "1/H"
  | "1/h"
  | "1/in"
  | "1/K"
  | "1/kg"
  | "1/km2"
  | "1/kPa"
  | "1/L"
  | "1/lbf"
  | "1/lbm"
  | "1/m"
  | "1/m2"
  | "1/m3"
  | "1/mi"
  | "1/mi2"
  | "1/min"
  | "1/mm"
  | "1/ms"
  | "1/N"
  | "1/nm"
  | "1/Pa"
  | "1/pPa"
  | "1/psi"
  | "1/s"
  | "1/upsi"
  | "1/us"
  | "1/uV"
  | "1/V"
  | "1/wk"
  | "1/yd"
  | "10 ft"
  | "10 in"
  | "10 km"
  | "10 kN"
  | "10 Mg/m3"
  | "100 ft"
  | "100 ft/dega"
  | "100 ka[t]"
  | "100 km"
  | "1000 bbl"
  | "1000 bbl.ft/d"
  | "1000 bbl/d"
  | "1000 ft"
  | "1000 ft/h"
  | "1000 ft/s"
  | "1000 ft3"
  | "1000 ft3/(d.ft)"
  | "1000 ft3/(psi.d)"
  | "1000 ft3/bbl"
  | "1000 ft3/d"
  | "1000 gal[UK]"
  | "1000 gal[US]"
  | "1000 lbf.ft"
  | "1000 m3"
  | "1000 m3/(d.m)"
  | "1000 m3/(h.m)"
  | "1000 m3/d"
  | "1000 m3/h"
  | "1000 m3/m3"
  | "1000 m4/d"
  | "1E12 ft3"
  | "1E6 (ft3/d)/(bbl/d)"
  | "1E-6 acre.ft/bbl"
  | "1E6 bbl"
  | "1E6 bbl/(acre.ft)"
  | "1E6 bbl/acre"
  | "1E6 bbl/d"
  | "1E-6 bbl/ft3"
  | "1E-6 bbl/m3"
  | "1E6 Btu[IT]"
  | "1E6 Btu[IT]/h"
  | "1E6 ft3"
  | "1E6 ft3/(acre.ft)"
  | "1E6 ft3/bbl"
  | "1E6 ft3/d"
  | "1E-6 gal[US]"
  | "1E6 lbm/a"
  | "1E6 m3"
  | "1E-6 m3/(m3.degC)"
  | "1E-6 m3/(m3.degF)"
  | "1E6 m3/d"
  | "1E-9 1/ft"
  | "1E9 bbl"
  | "1E9 ft3"
  | "30 ft"
  | "30 ft/dega"
  | "30 m"
  | "30 m/dega"
  | "A"
  | "a"
  | "A.h"
  | "A.m2"
  | "A.s"
  | "A.s/kg"
  | "A.s/m3"
  | "A/cm2"
  | "A/ft2"
  | "A/m"
  | "A/m2"
  | "A/mm"
  | "A/mm2"
  | "a[t]"
  | "acre"
  | "acre.ft"
  | "ag"
  | "aJ"
  | "angstrom"
  | "at"
  | "atm"
  | "atm/ft"
  | "atm/h"
  | "atm/hm"
  | "atm/m"
  | "B"
  | "b"
  | "B.W"
  | "b/cm3"
  | "B/m"
  | "B/O"
  | "bar"
  | "bar/(1000m3/day)"
  | "bar/(1000m3/day)2"
  | "bar/(m3/day)"
  | "bar/(m3/day)2"
  | "bar/h"
  | "bar/km"
  | "bar/m"
  | "bar2"
  | "bar2/cP"
  | "bbl"
  | "bbl/(acre.ft)"
  | "bbl/(d.acre.ft)"
  | "bbl/(d.ft)"
  | "bbl/(ft.psi.d)"
  | "bbl/(kPa.d)"
  | "bbl/(psi.d)"
  | "bbl/acre"
  | "bbl/bbl"
  | "bbl/d"
  | "bbl/d2"
  | "bbl/ft"
  | "bbl/ft3"
  | "bbl/h"
  | "bbl/h2"
  | "bbl/in"
  | "bbl/m3"
  | "bbl/mi"
  | "bbl/min"
  | "bbl/psi"
  | "bbl/ton[UK]"
  | "bbl/ton[US]"
  | "Bd"
  | "bit"
  | "bit/s"
  | "Bq"
  | "Bq/kg"
  | "Bq/m3"
  | "Btu[IT]"
  | "Btu[IT].in/(h.ft2.degF)"
  | "Btu[IT]/(h.ft.degF)"
  | "Btu[IT]/(h.ft2)"
  | "Btu[IT]/(h.ft2.degF)"
  | "Btu[IT]/(h.ft2.degR)"
  | "Btu[IT]/(h.ft3)"
  | "Btu[IT]/(h.ft3.degF)"
  | "Btu[IT]/(h.m2.degC)"
  | "Btu[IT]/(hp.h)"
  | "Btu[IT]/(lbm.degF)"
  | "Btu[IT]/(lbm.degR)"
  | "Btu[IT]/(lbmol.degF)"
  | "Btu[IT]/(s.ft2)"
  | "Btu[IT]/(s.ft2.degF)"
  | "Btu[IT]/(s.ft3)"
  | "Btu[IT]/(s.ft3.degF)"
  | "Btu[IT]/bbl"
  | "Btu[IT]/ft3"
  | "Btu[IT]/gal[UK]"
  | "Btu[IT]/gal[US]"
  | "Btu[IT]/h"
  | "Btu[IT]/lbm"
  | "Btu[IT]/lbmol"
  | "Btu[IT]/min"
  | "Btu[IT]/s"
  | "Btu[th]"
  | "Btu[UK]"
  | "byte"
  | "byte/s"
  | "C"
  | "C.m"
  | "C/cm2"
  | "C/cm3"
  | "C/g"
  | "C/kg"
  | "C/m2"
  | "C/m3"
  | "C/mm2"
  | "C/mm3"
  | "ca"
  | "cA"
  | "cal[IT]"
  | "cal[th]"
  | "cal[th]/(g.K)"
  | "cal[th]/(h.cm.degC)"
  | "cal[th]/(h.cm2)"
  | "cal[th]/(h.cm2.degC)"
  | "cal[th]/(h.cm3)"
  | "cal[th]/(mol.degC)"
  | "cal[th]/(s.cm.degC)"
  | "cal[th]/(s.cm2.degC)"
  | "cal[th]/(s.cm3)"
  | "cal[th]/cm3"
  | "cal[th]/g"
  | "cal[th]/h"
  | "cal[th]/kg"
  | "cal[th]/lbm"
  | "cal[th]/mL"
  | "cal[th]/mm3"
  | "cC"
  | "ccal[th]"
  | "ccgr"
  | "cd"
  | "cd/m2"
  | "cEuc"
  | "ceV"
  | "cF"
  | "cg"
  | "cgauss"
  | "cgr"
  | "cGy"
  | "cH"
  | "chain"
  | "chain[BnA]"
  | "chain[BnB]"
  | "chain[Cla]"
  | "chain[Ind37]"
  | "chain[Se]"
  | "chain[SeT]"
  | "chain[US]"
  | "cHz"
  | "Ci"
  | "cJ"
  | "cm"
  | "cm/a"
  | "cm/s"
  | "cm/s2"
  | "cm2"
  | "cm2/g"
  | "cm2/s"
  | "cm3"
  | "cm3/cm3"
  | "cm3/g"
  | "cm3/h"
  | "cm3/L"
  | "cm3/m3"
  | "cm3/min"
  | "cm3/s"
  | "cm4"
  | "cmH2O[4degC]"
  | "cN"
  | "cohm"
  | "cP"
  | "cPa"
  | "crd"
  | "cS"
  | "cs"
  | "cSt"
  | "cT"
  | "ct"
  | "cu"
  | "cV"
  | "cW"
  | "cWb"
  | "cwt[UK]"
  | "cwt[US]"
  | "d"
  | "D"
  | "D.ft"
  | "D.m"
  | "D/(Pa.s)"
  | "d/bbl"
  | "D/cP"
  | "d/ft3"
  | "d/m3"
  | "D[API]"
  | "dA"
  | "dam"
  | "daN"
  | "daN.m"
  | "dAPI"
  | "dB"
  | "dB.mW"
  | "dB.MW"
  | "dB.W"
  | "dB/ft"
  | "dB/km"
  | "dB/m"
  | "dB/O"
  | "dC"
  | "dcal[th]"
  | "dega"
  | "dega/ft"
  | "dega/h"
  | "dega/m"
  | "dega/min"
  | "dega/s"
  | "degC"
  | "degC.m2.h/kcal[th]"
  | "degC/ft"
  | "degC/h"
  | "degC/hm"
  | "degC/km"
  | "degC/kPa"
  | "degC/m"
  | "degC/min"
  | "degC/s"
  | "degF"
  | "degF.ft2.h/Btu[IT]"
  | "degF/ft"
  | "degF/h"
  | "degF/m"
  | "degF/min"
  | "degF/psi"
  | "degF/s"
  | "degR"
  | "dEuc"
  | "deV"
  | "dF"
  | "dgauss"
  | "dGy"
  | "dH"
  | "dHz"
  | "dJ"
  | "dm"
  | "dm/s"
  | "dm3"
  | "dm3/(kW.h)"
  | "dm3/kg"
  | "dm3/kmol"
  | "dm3/m"
  | "dm3/m3"
  | "dm3/MJ"
  | "dm3/s"
  | "dm3/s2"
  | "dm3/t"
  | "dN"
  | "dN.m"
  | "dohm"
  | "dP"
  | "dPa"
  | "drd"
  | "dS"
  | "ds"
  | "dT"
  | "dV"
  | "dW"
  | "dWb"
  | "dyne"
  | "dyne.cm2"
  | "dyne.s/cm2"
  | "dyne/cm"
  | "dyne/cm2"
  | "EA"
  | "Ea[t]"
  | "EC"
  | "Ecal[th]"
  | "EEuc"
  | "EeV"
  | "EF"
  | "Eg"
  | "Egauss"
  | "EGy"
  | "EH"
  | "EHz"
  | "EJ"
  | "EJ/a"
  | "Em"
  | "EN"
  | "Eohm"
  | "EP"
  | "EPa"
  | "Erd"
  | "erg"
  | "erg/a"
  | "erg/cm2"
  | "erg/cm3"
  | "erg/g"
  | "erg/kg"
  | "erg/m3"
  | "ES"
  | "ET"
  | "Euc"
  | "eV"
  | "EW"
  | "EWb"
  | "F"
  | "F/m"
  | "fa"
  | "fA"
  | "fathom"
  | "fC"
  | "fcal[th]"
  | "fEuc"
  | "feV"
  | "fF"
  | "fg"
  | "fgauss"
  | "fGy"
  | "fH"
  | "fHz"
  | "fJ"
  | "floz[UK]"
  | "floz[US]"
  | "fm"
  | "fN"
  | "fohm"
  | "footcandle"
  | "footcandle.s"
  | "fP"
  | "fPa"
  | "frd"
  | "fS"
  | "ft"
  | "fT"
  | "ft/bbl"
  | "ft/d"
  | "ft/dega"
  | "ft/degF"
  | "ft/ft"
  | "ft/ft3"
  | "ft/gal[US]"
  | "ft/h"
  | "ft/in"
  | "ft/lbm"
  | "ft/m"
  | "ft/mi"
  | "ft/min"
  | "ft/ms"
  | "ft/psi"
  | "ft/rad"
  | "ft/rev"
  | "ft/s"
  | "ft/s2"
  | "ft/us"
  | "ft[BnA]"
  | "ft[BnB]"
  | "ft[Br36]"
  | "ft[Br65]"
  | "ft[Cla]"
  | "ft[GC]"
  | "ft[Ind]"
  | "ft[Ind37]"
  | "ft[Ind62]"
  | "ft[Ind75]"
  | "ft[Se]"
  | "ft[SeT]"
  | "ft[US]"
  | "ft2"
  | "ft2/h"
  | "ft2/in3"
  | "ft2/lbm"
  | "ft2/s"
  | "ft3"
  | "ft3/(d.ft)"
  | "ft3/(ft.psi.d)"
  | "ft3/(min.ft2)"
  | "ft3/(s.ft2)"
  | "ft3/bbl"
  | "ft3/d"
  | "ft3/d2"
  | "ft3/ft"
  | "ft3/ft2"
  | "ft3/ft3"
  | "ft3/h"
  | "ft3/h2"
  | "ft3/kg"
  | "ft3/lbm"
  | "ft3/lbmol"
  | "ft3/min"
  | "ft3/min2"
  | "ft3/rad"
  | "ft3/s"
  | "ft3/s2"
  | "ft3/sack[94lbm]"
  | "fur[US]"
  | "fV"
  | "fW"
  | "fWb"
  | "g"
  | "g.ft/(cm3.s)"
  | "g.m/(cm3.s)"
  | "g/cm3"
  | "g/cm4"
  | "g/dm3"
  | "g/gal[UK]"
  | "g/gal[US]"
  | "g/kg"
  | "g/L"
  | "g/m3"
  | "g/mol"
  | "g/s"
  | "g/t"
  | "GA"
  | "Ga[t]"
  | "Gal"
  | "gal[UK]"
  | "gal[UK]/(h.ft)"
  | "gal[UK]/(h.ft2)"
  | "gal[UK]/(h.in)"
  | "gal[UK]/(h.in2)"
  | "gal[UK]/(min.ft)"
  | "gal[UK]/(min.ft2)"
  | "gal[UK]/d"
  | "gal[UK]/ft3"
  | "gal[UK]/h"
  | "gal[UK]/h2"
  | "gal[UK]/lbm"
  | "gal[UK]/mi"
  | "gal[UK]/min"
  | "gal[UK]/min2"
  | "gal[US]"
  | "gal[US]/(h.ft)"
  | "gal[US]/(h.ft2)"
  | "gal[US]/(h.in)"
  | "gal[US]/(h.in2)"
  | "gal[US]/(min.ft)"
  | "gal[US]/(min.ft2)"
  | "gal[US]/bbl"
  | "gal[US]/d"
  | "gal[US]/ft"
  | "gal[US]/ft3"
  | "gal[US]/h"
  | "gal[US]/h2"
  | "gal[US]/lbm"
  | "gal[US]/mi"
  | "gal[US]/min"
  | "gal[US]/min2"
  | "gal[US]/sack[94lbm]"
  | "gal[US]/ton[UK]"
  | "gal[US]/ton[US]"
  | "gAPI"
  | "gauss"
  | "gauss/cm"
  | "GBq"
  | "GC"
  | "Gcal[th]"
  | "GEuc"
  | "GeV"
  | "gf"
  | "GF"
  | "Gg"
  | "Ggauss"
  | "GGy"
  | "GH"
  | "GHz"
  | "GJ"
  | "Gm"
  | "GN"
  | "gn"
  | "Gohm"
  | "gon"
  | "GP"
  | "GPa"
  | "GPa/cm"
  | "GPa2"
  | "grain"
  | "grain/ft3"
  | "grain/gal[US]"
  | "Grd"
  | "GS"
  | "GT"
  | "GV"
  | "GW"
  | "GW.h"
  | "GWb"
  | "Gy"
  | "H"
  | "h"
  | "h/ft3"
  | "h/km"
  | "H/m"
  | "h/m3"
  | "ha"
  | "ha.m"
  | "hbar"
  | "hg"
  | "hL"
  | "hm"
  | "hN"
  | "hp"
  | "hp.h"
  | "hp.h/bbl"
  | "hp.h/lbm"
  | "hp/ft3"
  | "hp/in2"
  | "hp[elec]"
  | "hp[hyd]"
  | "hp[hyd]/in2"
  | "hp[metric]"
  | "hp[metric].h"
  | "hs"
  | "Hz"
  | "in"
  | "in/(in.degF)"
  | "in/a"
  | "in/min"
  | "in/s"
  | "in/s2"
  | "in[US]"
  | "in2"
  | "in2/ft2"
  | "in2/in2"
  | "in2/s"
  | "in3"
  | "in3/ft"
  | "in4"
  | "inH2O[39degF]"
  | "inH2O[60degF]"
  | "inHg[32degF]"
  | "inHg[60degF]"
  | "J"
  | "J.m/(s.m2.K)"
  | "J.m/m2"
  | "J/(g.K)"
  | "J/(kg.K)"
  | "J/(mol.K)"
  | "J/(s.m2.degC)"
  | "J/cm2"
  | "J/dm3"
  | "J/g"
  | "J/K"
  | "J/kg"
  | "J/m"
  | "J/m2"
  | "J/m3"
  | "J/mol"
  | "J/s"
  | "K"
  | "K.m2/kW"
  | "K.m2/W"
  | "K/km"
  | "K/m"
  | "K/Pa"
  | "K/s"
  | "K/W"
  | "kA"
  | "ka[t]"
  | "kC"
  | "kcal[th]"
  | "kcal[th].m/cm2"
  | "kcal[th]/(h.m.degC)"
  | "kcal[th]/(h.m2.degC)"
  | "kcal[th]/(kg.degC)"
  | "kcal[th]/cm3"
  | "kcal[th]/g"
  | "kcal[th]/h"
  | "kcal[th]/kg"
  | "kcal[th]/m3"
  | "kcal[th]/mol"
  | "kcd"
  | "kdyne"
  | "kEuc"
  | "keV"
  | "kF"
  | "kg"
  | "kg.m"
  | "kg.m/cm2"
  | "kg.m/s"
  | "kg.m2"
  | "kg/(kW.h)"
  | "kg/(m.s)"
  | "kg/(m2.s)"
  | "kg/d"
  | "kg/dm3"
  | "kg/dm4"
  | "kg/h"
  | "kg/J"
  | "kg/kg"
  | "kg/L"
  | "kg/m"
  | "kg/m2"
  | "kg/m3"
  | "kg/m4"
  | "kg/min"
  | "kg/MJ"
  | "kg/mol"
  | "kg/s"
  | "kg/sack[94lbm]"
  | "kg/t"
  | "kgauss"
  | "kgf"
  | "kgf.m"
  | "kgf.m/cm2"
  | "kgf.m/m"
  | "kgf.m2"
  | "kgf.s/m2"
  | "kgf/cm"
  | "kgf/cm2"
  | "kgf/kgf"
  | "kgf/m2"
  | "kgf/mm2"
  | "kGy"
  | "kH"
  | "kHz"
  | "Kibyte"
  | "kJ"
  | "kJ.m/(h.m2.K)"
  | "kJ/(h.m2.K)"
  | "kJ/(kg.K)"
  | "kJ/(kmol.K)"
  | "kJ/dm3"
  | "kJ/kg"
  | "kJ/kmol"
  | "kJ/m3"
  | "klbf"
  | "klbm"
  | "klbm/in"
  | "klx"
  | "km"
  | "km/cm"
  | "km/dm3"
  | "km/h"
  | "km/L"
  | "km/s"
  | "km2"
  | "km3"
  | "kmol"
  | "kmol/h"
  | "kmol/m3"
  | "kmol/s"
  | "kN"
  | "kN.m"
  | "kN.m2"
  | "kN/m"
  | "kN/m2"
  | "knot"
  | "kohm"
  | "kohm.m"
  | "kP"
  | "kPa"
  | "kPa.s/m"
  | "kPa/h"
  | "kPa/hm"
  | "kPa/m"
  | "kPa/min"
  | "kPa2"
  | "kPa2/cP"
  | "kpsi"
  | "kpsi2"
  | "krad"
  | "krd"
  | "kS"
  | "kS/m"
  | "kT"
  | "kV"
  | "kW"
  | "kW.h"
  | "kW.h/(kg.degC)"
  | "kW.h/dm3"
  | "kW.h/kg"
  | "kW.h/m3"
  | "kW/(m2.K)"
  | "kW/(m3.K)"
  | "kW/cm2"
  | "kW/m2"
  | "kW/m3"
  | "kWb"
  | "L"
  | "L/(bar.min)"
  | "L/h"
  | "L/kg"
  | "L/kmol"
  | "L/m"
  | "L/m3"
  | "L/min"
  | "L/mol"
  | "L/s"
  | "L/s2"
  | "L/t"
  | "L/ton[UK]"
  | "lbf"
  | "lbf.ft"
  | "lbf.ft/bbl"
  | "lbf.ft/gal[US]"
  | "lbf.ft/in"
  | "lbf.ft/in2"
  | "lbf.ft/lbm"
  | "lbf.ft/min"
  | "lbf.ft/s"
  | "lbf.in"
  | "lbf.in/in"
  | "lbf.in2"
  | "lbf.s/ft2"
  | "lbf.s/in2"
  | "lbf/ft"
  | "lbf/ft2"
  | "lbf/ft3"
  | "lbf/gal[US]"
  | "lbf/in"
  | "lbf/lbf"
  | "lbm"
  | "lbm.ft"
  | "lbm.ft/s"
  | "lbm.ft2"
  | "lbm.ft2/s2"
  | "lbm/(ft.h)"
  | "lbm/(ft.s)"
  | "lbm/(ft2.h)"
  | "lbm/(ft2.s)"
  | "lbm/(gal[UK].ft)"
  | "lbm/(gal[US].ft)"
  | "lbm/(hp.h)"
  | "lbm/bbl"
  | "lbm/d"
  | "lbm/ft"
  | "lbm/ft2"
  | "lbm/ft3"
  | "lbm/ft4"
  | "lbm/gal[UK]"
  | "lbm/gal[US]"
  | "lbm/h"
  | "lbm/in3"
  | "lbm/lbmol"
  | "lbm/min"
  | "lbm/s"
  | "lbmol"
  | "lbmol/(h.ft2)"
  | "lbmol/(s.ft2)"
  | "lbmol/ft3"
  | "lbmol/gal[UK]"
  | "lbmol/gal[US]"
  | "lbmol/h"
  | "lbmol/s"
  | "link"
  | "link[BnA]"
  | "link[BnB]"
  | "link[Cla]"
  | "link[Se]"
  | "link[SeT]"
  | "link[US]"
  | "lm"
  | "lm.s"
  | "lm/m2"
  | "lm/W"
  | "lx"
  | "lx.s"
  | "m"
  | "m/(m.K)"
  | "m/cm"
  | "m/d"
  | "m/dega"
  | "m/h"
  | "m/K"
  | "m/kg"
  | "m/km"
  | "m/kPa"
  | "m/m"
  | "m/m3"
  | "m/min"
  | "m/ms"
  | "m/Pa"
  | "m/rad"
  | "m/rev"
  | "m/s"
  | "m/s2"
  | "m[Ger]"
  | "m2"
  | "m2/(kPa.d)"
  | "m2/(Pa.s)"
  | "m2/cm3"
  | "m2/d"
  | "m2/g"
  | "m2/h"
  | "m2/kg"
  | "m2/m2"
  | "m2/m3"
  | "m2/mol"
  | "m2/s"
  | "m3"
  | "m3/(bar.d)"
  | "m3/(bar.h)"
  | "m3/(bar.min)"
  | "m3/(d.m)"
  | "m3/(h.m)"
  | "m3/(ha.m)"
  | "m3/(kPa.d)"
  | "m3/(kPa.h)"
  | "m3/(kW.h)"
  | "m3/(m3.K)"
  | "m3/(Pa.s)"
  | "m3/(psi.d)"
  | "m3/(s.ft)"
  | "m3/(s.m)"
  | "m3/(s.m2)"
  | "m3/(s.m3)"
  | "m3/bbl"
  | "m3/d"
  | "m3/d2"
  | "m3/g"
  | "m3/h"
  | "m3/J"
  | "m3/kg"
  | "m3/km"
  | "m3/kmol"
  | "m3/kPa"
  | "m3/m"
  | "m3/m2"
  | "m3/m3"
  | "m3/min"
  | "m3/mol"
  | "m3/Pa"
  | "m3/rad"
  | "m3/rev"
  | "m3/s"
  | "m3/s2"
  | "m3/t"
  | "m3/ton[UK]"
  | "m3/ton[US]"
  | "m4"
  | "m4/s"
  | "MA"
  | "mA"
  | "mA/cm2"
  | "mA/ft2"
  | "Ma[t]"
  | "mbar"
  | "MBq"
  | "MC"
  | "mC"
  | "mC/m2"
  | "Mcal[th]"
  | "mcal[th]"
  | "mCi"
  | "mD"
  | "mD.ft"
  | "mD.ft2/(lbf.s)"
  | "mD.in2/(lbf.s)"
  | "mD.m"
  | "mD/(Pa.s)"
  | "mD/cP"
  | "mEuc"
  | "MEuc"
  | "MeV"
  | "meV"
  | "MF"
  | "mF"
  | "mg"
  | "Mg"
  | "Mg/a"
  | "Mg/d"
  | "mg/dm3"
  | "mg/g"
  | "mg/gal[US]"
  | "Mg/h"
  | "Mg/in"
  | "mg/J"
  | "mg/kg"
  | "mg/L"
  | "Mg/m2"
  | "mg/m3"
  | "Mg/m3"
  | "Mg/min"
  | "mGal"
  | "mgauss"
  | "Mgauss"
  | "Mgf"
  | "mgn"
  | "MGy"
  | "mGy"
  | "MH"
  | "mH"
  | "MHz"
  | "mHz"
  | "mi"
  | "mi/gal[UK]"
  | "mi/gal[US]"
  | "mi/h"
  | "mi/in"
  | "mi[naut]"
  | "mi[nautUK]"
  | "mi[US]"
  | "mi[US]2"
  | "mi2"
  | "mi3"
  | "Mibyte"
  | "mil"
  | "mil/a"
  | "mila"
  | "min"
  | "min/ft"
  | "min/m"
  | "mina"
  | "MJ"
  | "mJ"
  | "MJ/a"
  | "mJ/cm2"
  | "MJ/kg"
  | "MJ/kmol"
  | "MJ/m"
  | "mJ/m2"
  | "MJ/m3"
  | "mL"
  | "mL/gal[UK]"
  | "mL/gal[US]"
  | "mL/mL"
  | "mm"
  | "Mm"
  | "mm/(mm.K)"
  | "mm/a"
  | "mm/s"
  | "mm2"
  | "mm2/mm2"
  | "mm2/s"
  | "mm3"
  | "mm3/J"
  | "mmHg[0degC]"
  | "mmol"
  | "MN"
  | "mN"
  | "mN.m2"
  | "mN/km"
  | "mN/m"
  | "Mohm"
  | "mohm"
  | "mol"
  | "mol.m2/(mol.s)"
  | "mol/(s.m2)"
  | "mol/m2"
  | "mol/m3"
  | "mol/mol"
  | "mol/s"
  | "MP"
  | "mP"
  | "MPa"
  | "mPa"
  | "mPa.s"
  | "MPa.s/m"
  | "MPa/h"
  | "MPa/m"
  | "Mpsi"
  | "mrad"
  | "Mrad"
  | "Mrd"
  | "mrd"
  | "mrem"
  | "mrem/h"
  | "ms"
  | "MS"
  | "mS"
  | "ms/cm"
  | "mS/cm"
  | "ms/ft"
  | "ms/in"
  | "mS/m"
  | "ms/m"
  | "ms/s"
  | "mSv"
  | "mSv/h"
  | "mT"
  | "mT/dm"
  | "mV"
  | "MV"
  | "mV/ft"
  | "mV/m"
  | "mW"
  | "MW"
  | "MW.h"
  | "MW.h/kg"
  | "MW.h/m3"
  | "mW/m2"
  | "mWb"
  | "MWb"
  | "N"
  | "N.m"
  | "N.m/m"
  | "N.m2"
  | "N.s/m2"
  | "N/m"
  | "N/m2"
  | "N/m3"
  | "N/mm2"
  | "N/N"
  | "nA"
  | "na"
  | "nAPI"
  | "nC"
  | "ncal[th]"
  | "nCi"
  | "nEuc"
  | "neV"
  | "nF"
  | "ng"
  | "ng/g"
  | "ng/l"
  | "ng/m3"
  | "ng/mg"
  | "ng/ml"
  | "ngauss"
  | "nGy"
  | "nH"
  | "nHz"
  | "nJ"
  | "nm"
  | "nm/s"
  | "nN"
  | "nohm"
  | "nohm.mil2/ft"
  | "nohm.mm2/m"
  | "nP"
  | "nPa"
  | "nrd"
  | "nS"
  | "ns"
  | "ns/ft"
  | "ns/m"
  | "nT"
  | "nV"
  | "nW"
  | "nWb"
  | "O"
  | "Oe"
  | "ohm"
  | "ohm.cm"
  | "ohm.m"
  | "ohm.m2/m"
  | "ohm/m"
  | "ozf"
  | "ozm"
  | "ozm[troy]"
  | "P"
  | "pA"
  | "Pa"
  | "Pa.s"
  | "Pa.s.m3/kg"
  | "Pa.s/m3"
  | "Pa.s2/m3"
  | "Pa/(1000m3/day)"
  | "Pa/(1000m3/day)2"
  | "Pa/(m3/day)"
  | "Pa/(m3/day)2"
  | "Pa/h"
  | "Pa/m"
  | "Pa/m3"
  | "Pa/s"
  | "Pa2"
  | "Pa2/(Pa.s)"
  | "pC"
  | "pcal[th]"
  | "pCi"
  | "pCi/g"
  | "pdl"
  | "pdl.cm2"
  | "pdl.ft"
  | "pdl/cm"
  | "pEuc"
  | "peV"
  | "pF"
  | "pg"
  | "pgauss"
  | "pGy"
  | "pHz"
  | "pJ"
  | "pm"
  | "pN"
  | "pohm"
  | "pP"
  | "pPa"
  | "ppk"
  | "ppm"
  | "ppm[mass]"
  | "ppm[vol]"
  | "ppm[vol]/degC"
  | "ppm[vol]/degF"
  | "prd"
  | "pS"
  | "ps"
  | "psi"
  | "psi.d/bbl"
  | "psi.s"
  | "psi/(1000000ft3/day)"
  | "psi/(1000000ft3/day)2"
  | "psi/(1000ft3/day)"
  | "psi/(1000ft3/day)2"
  | "psi/(bbl/day)"
  | "psi/(bbl/day)2"
  | "psi/ft"
  | "psi/h"
  | "psi/m"
  | "psi/min"
  | "psi2"
  | "psi2.d/(cP.ft3)"
  | "psi2/cP"
  | "pT"
  | "pt[UK]"
  | "pt[UK]/(hp.h)"
  | "pt[US]"
  | "pV"
  | "pW"
  | "pWb"
  | "qt[UK]"
  | "qt[US]"
  | "quad"
  | "quad/a"
  | "rad"
  | "rad/ft"
  | "rad/ft3"
  | "rad/m"
  | "rad/m3"
  | "rad/s"
  | "rad/s2"
  | "rd"
  | "rem"
  | "rem/h"
  | "rev"
  | "rev/ft"
  | "rev/m"
  | "rev/s"
  | "rod[US]"
  | "rpm"
  | "rpm/s"
  | "S"
  | "s"
  | "s/cm"
  | "s/ft"
  | "s/ft3"
  | "s/in"
  | "s/kg"
  | "s/L"
  | "S/m"
  | "s/m"
  | "s/m3"
  | "s/qt[UK]"
  | "s/qt[US]"
  | "s/s"
  | "sack[94lbm]"
  | "seca"
  | "section"
  | "sr"
  | "St"
  | "Sv"
  | "Sv/h"
  | "Sv/s"
  | "t"
  | "T"
  | "t/a"
  | "t/d"
  | "t/h"
  | "T/m"
  | "t/m3"
  | "t/min"
  | "TA"
  | "Ta[t]"
  | "TBq"
  | "TC"
  | "Tcal[th]"
  | "TD[API]"
  | "TD[API].m"
  | "TD[API]/(Pa.s)"
  | "TEuc"
  | "TeV"
  | "TF"
  | "Tg"
  | "Tgauss"
  | "TGy"
  | "TH"
  | "therm[EC]"
  | "therm[UK]"
  | "therm[US]"
  | "THz"
  | "TJ"
  | "TJ/a"
  | "Tm"
  | "TN"
  | "Tohm"
  | "ton[UK]"
  | "ton[UK]/a"
  | "ton[UK]/d"
  | "ton[UK]/h"
  | "ton[UK]/min"
  | "ton[US]"
  | "ton[US]/a"
  | "ton[US]/d"
  | "ton[US]/ft2"
  | "ton[US]/h"
  | "ton[US]/min"
  | "tonf[UK]"
  | "tonf[UK].ft2"
  | "tonf[UK]/ft"
  | "tonf[UK]/ft2"
  | "tonf[US]"
  | "tonf[US].ft"
  | "tonf[US].ft2"
  | "tonf[US].mi"
  | "tonf[US].mi/bbl"
  | "tonf[US].mi/ft"
  | "tonf[US]/ft"
  | "tonf[US]/ft2"
  | "tonf[US]/in2"
  | "tonRefrig"
  | "torr"
  | "TP"
  | "TPa"
  | "Trd"
  | "TS"
  | "TT"
  | "TV"
  | "TW"
  | "TW.h"
  | "TWb"
  | "uA"
  | "uA/cm2"
  | "uA/in2"
  | "ubar"
  | "uC"
  | "ucal[th]"
  | "ucal[th]/(s.cm2)"
  | "ucal[th]/s"
  | "uCi"
  | "uEuc"
  | "ueV"
  | "uF"
  | "uF/m"
  | "ug"
  | "ug/cm3"
  | "ug/g"
  | "ug/mg"
  | "ugauss"
  | "uGy"
  | "uH"
  | "uH/m"
  | "uHz"
  | "uJ"
  | "um"
  | "um/s"
  | "um2"
  | "um2.m"
  | "umHg[0degC]"
  | "umol"
  | "uN"
  | "unitless"
  | "uohm"
  | "uohm/ft"
  | "uohm/m"
  | "uP"
  | "uPa"
  | "upsi"
  | "urad"
  | "urd"
  | "us"
  | "uS"
  | "us/ft"
  | "us/in"
  | "us/m"
  | "uT"
  | "uV"
  | "uV/ft"
  | "uV/m"
  | "uW"
  | "uW/m3"
  | "uWb"
  | "V"
  | "V/B"
  | "V/dB"
  | "V/m"
  | "W"
  | "W.m2.K/(J.K)"
  | "W/(m.K)"
  | "W/(m2.K)"
  | "W/(m2.sr)"
  | "W/(m3.K)"
  | "W/cm2"
  | "W/K"
  | "W/kW"
  | "W/m2"
  | "W/m3"
  | "W/mm2"
  | "W/sr"
  | "W/W"
  | "Wb"
  | "Wb.m"
  | "Wb/m"
  | "Wb/mm"
  | "wk"
  | "yd"
  | "yd[BnA]"
  | "yd[BnB]"
  | "yd[Cla]"
  | "yd[Ind]"
  | "yd[Ind37]"
  | "yd[Ind62]"
  | "yd[Ind75]"
  | "yd[Se]"
  | "yd[SeT]"
  | "yd[US]"
  | "yd2"
  | "yd3";
interface _UnitOfMeasure extends _UomEnum {
  _: UnitOfMeasure;
}

/** A variant of UnitOfMeasure which has been extended to allow any user-defined unit of measure which follows an authority:unit pattern; the colon is mandatory.
 *
 * This class is implemented in XML as a union between the list of valid units per the prevailing Energistics Units of Measure Specification and an XML pattern which mandates the central colon. */
export type UnitOfMeasureExt = string;
type _UnitOfMeasureExt = Primitive._string;

/** The intended supertype of all "units of measure".
 * This abstract type allows the maximum length of a UOM enumeration to be centrally defined.
 * This type is abstract in the sense that it should not be used directly except to derive another type. */
export type UomEnum = string;
type _UomEnum = _AbstractString;

/** @pattern [a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12} */
export type UuidString = string;
type _UuidString = _AbstractString;

interface _Vector extends BaseType {
  Component1: number;
  Component2: number;
  Component3: number;
}
export interface Vector extends _Vector {}

interface _VerticalAxis extends BaseType {
  /** Direction of the axis. Commonly used for values such as "easting, northing, depth, etc.." */
  Direction: VerticalDirection;
  IsTime: boolean;
  Uom: LengthAndTimeUomExt;
}
export interface VerticalAxis extends _VerticalAxis {}

interface _VerticalCoordinateMeasure extends _AbstractMeasure {
  uom: VerticalCoordinateUom;
}
export interface VerticalCoordinateMeasure extends _VerticalCoordinateMeasure {}

interface _VerticalCoordinateMeasureExt extends _AbstractMeasure {
  uom: VerticalCoordinateUomExt;
}
export interface VerticalCoordinateMeasureExt
  extends _VerticalCoordinateMeasureExt {}

/** The units of measure that are valid for vertical gravity based coordinates (i.e., elevation or vertical depth). */
export type VerticalCoordinateUom = "m" | "ft" | "ftUS" | "ftBr(65)";
interface _VerticalCoordinateUom extends _UomEnum {
  _: VerticalCoordinateUom;
}

export type VerticalCoordinateUomExt = string;
type _VerticalCoordinateUomExt = Primitive._string;

interface _VerticalCrs extends _AbstractObject {
  uom: LengthUomExt;
  AbstractVerticalCrs: AbstractVerticalCrs;
  Direction: VerticalDirection;
}
export interface VerticalCrs extends _VerticalCrs {}

export type VerticalDirection = "up" | "down";
interface _VerticalDirection extends _TypeEnum {
  _: VerticalDirection;
}

/** This class contains the EPSG code for a vertical CRS. */
interface _VerticalEpsgCrs extends _AbstractVerticalCrs {
  EpsgCode: PositiveLong;
}
export interface VerticalEpsgCrs extends _VerticalEpsgCrs {}

/** This class contains a code for a vertical CRS according to a local authority. This would be used in a case where a company or regulatory regime has chosen not to use EPSG codes. */
interface _VerticalLocalAuthorityCrs extends _AbstractVerticalCrs {
  LocalAuthorityCrsName: AuthorityQualifiedName;
}
export interface VerticalLocalAuthorityCrs extends _VerticalLocalAuthorityCrs {}

interface _VerticalPosition1d extends BaseType {
  VerticalCoordinate: number;
  VerticalCrs: DataObjectReference;
}
export interface VerticalPosition1d extends _VerticalPosition1d {}

/** This class is used in a case where the coordinate reference system is either unknown or is intentionally not being transferred. In this case, the uom and Direction need to be provided on the VerticalCrs class. */
interface _VerticalUnknownCrs extends _AbstractVerticalCrs {
  Unknown: String2000;
}
export interface VerticalUnknownCrs extends _VerticalUnknownCrs {}

/** ISO 19162-compliant well-known text for the vertical CRS */
interface _VerticalWktCrs extends _AbstractVerticalCrs {
  /** ISO 19162 compliant well known text of the CRS */
  WellKnownText: string;
}
export interface VerticalWktCrs extends _VerticalWktCrs {}

interface _VolumeFlowRatePerVolumeFlowRateMeasure extends _AbstractMeasure {
  uom: VolumeFlowRatePerVolumeFlowRateUom;
}
export interface VolumeFlowRatePerVolumeFlowRateMeasure
  extends _VolumeFlowRatePerVolumeFlowRateMeasure {}

interface _VolumeFlowRatePerVolumeFlowRateMeasureExt extends _AbstractMeasure {
  uom: VolumeFlowRatePerVolumeFlowRateUomExt;
}
export interface VolumeFlowRatePerVolumeFlowRateMeasureExt
  extends _VolumeFlowRatePerVolumeFlowRateMeasureExt {}

export type VolumeFlowRatePerVolumeFlowRateUom =
  | "%"
  | "(bbl/d)/(bbl/d)"
  | "(m3/d)/(m3/d)"
  | "(m3/s)/(m3/s)"
  | "1E6 (ft3/d)/(bbl/d)"
  | "Euc";
interface _VolumeFlowRatePerVolumeFlowRateUom extends _UomEnum {
  _: VolumeFlowRatePerVolumeFlowRateUom;
}

export type VolumeFlowRatePerVolumeFlowRateUomExt = string;
type _VolumeFlowRatePerVolumeFlowRateUomExt = Primitive._string;

interface _VolumeMeasure extends _AbstractMeasure {
  uom: VolumeUomWithLegacy;
}
export interface VolumeMeasure extends _VolumeMeasure {}

interface _VolumeMeasureExt extends _AbstractMeasure {
  uom: VolumeUomExt;
}
export interface VolumeMeasureExt extends _VolumeMeasureExt {}

interface _VolumePerAreaMeasure extends _AbstractMeasure {
  uom: VolumePerAreaUomWithLegacy;
}
export interface VolumePerAreaMeasure extends _VolumePerAreaMeasure {}

interface _VolumePerAreaMeasureExt extends _AbstractMeasure {
  uom: VolumePerAreaUomExt;
}
export interface VolumePerAreaMeasureExt extends _VolumePerAreaMeasureExt {}

export type VolumePerAreaUom =
  | "1E6 bbl/acre"
  | "bbl/acre"
  | "ft3/ft2"
  | "m3/m2";
interface _VolumePerAreaUom extends _UomEnum {
  _: VolumePerAreaUom;
}

export type VolumePerAreaUomExt = string;
type _VolumePerAreaUomExt = Primitive._string;

export type VolumePerAreaUomWithLegacy = string;
type _VolumePerAreaUomWithLegacy = Primitive._string;

interface _VolumePerLengthMeasure extends _AbstractMeasure {
  uom: VolumePerLengthUom;
}
export interface VolumePerLengthMeasure extends _VolumePerLengthMeasure {}

interface _VolumePerLengthMeasureExt extends _AbstractMeasure {
  uom: VolumePerLengthUomExt;
}
export interface VolumePerLengthMeasureExt extends _VolumePerLengthMeasureExt {}

export type VolumePerLengthUom =
  | "0.01 dm3/km"
  | "0.01 L/km"
  | "bbl/ft"
  | "bbl/in"
  | "bbl/mi"
  | "dm3/m"
  | "ft3/ft"
  | "gal[UK]/mi"
  | "gal[US]/ft"
  | "gal[US]/mi"
  | "in3/ft"
  | "L/m"
  | "m3/km"
  | "m3/m";
interface _VolumePerLengthUom extends _UomEnum {
  _: VolumePerLengthUom;
}

export type VolumePerLengthUomExt = string;
type _VolumePerLengthUomExt = Primitive._string;

interface _VolumePerMassMeasure extends _AbstractMeasure {
  uom: VolumePerMassUom;
}
export interface VolumePerMassMeasure extends _VolumePerMassMeasure {}

interface _VolumePerMassMeasureExt extends _AbstractMeasure {
  uom: VolumePerMassUomExt;
}
export interface VolumePerMassMeasureExt extends _VolumePerMassMeasureExt {}

export type VolumePerMassUom =
  | "0.01 L/kg"
  | "bbl/ton[UK]"
  | "bbl/ton[US]"
  | "cm3/g"
  | "dm3/kg"
  | "dm3/t"
  | "ft3/kg"
  | "ft3/lbm"
  | "ft3/sack[94lbm]"
  | "gal[UK]/lbm"
  | "gal[US]/lbm"
  | "gal[US]/sack[94lbm]"
  | "gal[US]/ton[UK]"
  | "gal[US]/ton[US]"
  | "L/kg"
  | "L/t"
  | "L/ton[UK]"
  | "m3/g"
  | "m3/kg"
  | "m3/t"
  | "m3/ton[UK]"
  | "m3/ton[US]";
interface _VolumePerMassUom extends _UomEnum {
  _: VolumePerMassUom;
}

export type VolumePerMassUomExt = string;
type _VolumePerMassUomExt = Primitive._string;

interface _VolumePerPressureMeasure extends _AbstractMeasure {
  uom: VolumePerPressureUom;
}
export interface VolumePerPressureMeasure extends _VolumePerPressureMeasure {}

interface _VolumePerPressureMeasureExt extends _AbstractMeasure {
  uom: VolumePerPressureUomExt;
}
export interface VolumePerPressureMeasureExt
  extends _VolumePerPressureMeasureExt {}

export type VolumePerPressureUom = "bbl/psi" | "m3/kPa" | "m3/Pa";
interface _VolumePerPressureUom extends _UomEnum {
  _: VolumePerPressureUom;
}

export type VolumePerPressureUomExt = string;
type _VolumePerPressureUomExt = Primitive._string;

interface _VolumePerRotationMeasure extends _AbstractMeasure {
  uom: VolumePerRotationUom;
}
export interface VolumePerRotationMeasure extends _VolumePerRotationMeasure {}

interface _VolumePerRotationMeasureExt extends _AbstractMeasure {
  uom: VolumePerRotationUomExt;
}
export interface VolumePerRotationMeasureExt
  extends _VolumePerRotationMeasureExt {}

export type VolumePerRotationUom = "ft3/rad" | "m3/rad" | "m3/rev";
interface _VolumePerRotationUom extends _UomEnum {
  _: VolumePerRotationUom;
}

export type VolumePerRotationUomExt = string;
type _VolumePerRotationUomExt = Primitive._string;

interface _VolumePerTimeLengthMeasure extends _AbstractMeasure {
  uom: VolumePerTimeLengthUom;
}
export interface VolumePerTimeLengthMeasure
  extends _VolumePerTimeLengthMeasure {}

interface _VolumePerTimeLengthMeasureExt extends _AbstractMeasure {
  uom: VolumePerTimeLengthUomExt;
}
export interface VolumePerTimeLengthMeasureExt
  extends _VolumePerTimeLengthMeasureExt {}

export type VolumePerTimeLengthUom = "1000 bbl.ft/d" | "1000 m4/d" | "m4/s";
interface _VolumePerTimeLengthUom extends _UomEnum {
  _: VolumePerTimeLengthUom;
}

export type VolumePerTimeLengthUomExt = string;
type _VolumePerTimeLengthUomExt = Primitive._string;

interface _VolumePerTimeMeasure extends _AbstractMeasure {
  uom: VolumePerTimeUomWithLegacy;
}
export interface VolumePerTimeMeasure extends _VolumePerTimeMeasure {}

interface _VolumePerTimeMeasureExt extends _AbstractMeasure {
  uom: VolumePerTimeUomExt;
}
export interface VolumePerTimeMeasureExt extends _VolumePerTimeMeasureExt {}

interface _VolumePerTimePerAreaMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerAreaUom;
}
export interface VolumePerTimePerAreaMeasure
  extends _VolumePerTimePerAreaMeasure {}

interface _VolumePerTimePerAreaMeasureExt extends _AbstractMeasure {
  uom: VolumePerTimePerAreaUomExt;
}
export interface VolumePerTimePerAreaMeasureExt
  extends _VolumePerTimePerAreaMeasureExt {}

export type VolumePerTimePerAreaUom =
  | "ft3/(min.ft2)"
  | "ft3/(s.ft2)"
  | "gal[UK]/(h.ft2)"
  | "gal[UK]/(h.in2)"
  | "gal[UK]/(min.ft2)"
  | "gal[US]/(h.ft2)"
  | "gal[US]/(h.in2)"
  | "gal[US]/(min.ft2)"
  | "m3/(s.m2)";
interface _VolumePerTimePerAreaUom extends _UomEnum {
  _: VolumePerTimePerAreaUom;
}

export type VolumePerTimePerAreaUomExt = string;
type _VolumePerTimePerAreaUomExt = Primitive._string;

interface _VolumePerTimePerLengthMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerLengthUom;
}
export interface VolumePerTimePerLengthMeasure
  extends _VolumePerTimePerLengthMeasure {}

interface _VolumePerTimePerLengthMeasureExt extends _AbstractMeasure {
  uom: VolumePerTimePerLengthUomExt;
}
export interface VolumePerTimePerLengthMeasureExt
  extends _VolumePerTimePerLengthMeasureExt {}

export type VolumePerTimePerLengthUom =
  | "1000 ft3/(d.ft)"
  | "1000 m3/(d.m)"
  | "1000 m3/(h.m)"
  | "bbl/(d.ft)"
  | "ft3/(d.ft)"
  | "gal[UK]/(h.ft)"
  | "gal[UK]/(h.in)"
  | "gal[UK]/(min.ft)"
  | "gal[US]/(h.ft)"
  | "gal[US]/(h.in)"
  | "gal[US]/(min.ft)"
  | "m3/(d.m)"
  | "m3/(h.m)"
  | "m3/(s.ft)"
  | "m3/(s.m)";
interface _VolumePerTimePerLengthUom extends _UomEnum {
  _: VolumePerTimePerLengthUom;
}

export type VolumePerTimePerLengthUomExt = string;
type _VolumePerTimePerLengthUomExt = Primitive._string;

interface _VolumePerTimePerPressureLengthMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerPressureLengthUom;
}
export interface VolumePerTimePerPressureLengthMeasure
  extends _VolumePerTimePerPressureLengthMeasure {}

interface _VolumePerTimePerPressureLengthMeasureExt extends _AbstractMeasure {
  uom: VolumePerTimePerPressureLengthUomExt;
}
export interface VolumePerTimePerPressureLengthMeasureExt
  extends _VolumePerTimePerPressureLengthMeasureExt {}

export type VolumePerTimePerPressureLengthUom =
  | "bbl/(ft.psi.d)"
  | "ft3/(ft.psi.d)"
  | "m2/(kPa.d)"
  | "m2/(Pa.s)";
interface _VolumePerTimePerPressureLengthUom extends _UomEnum {
  _: VolumePerTimePerPressureLengthUom;
}

export type VolumePerTimePerPressureLengthUomExt = string;
type _VolumePerTimePerPressureLengthUomExt = Primitive._string;

interface _VolumePerTimePerPressureMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerPressureUom;
}
export interface VolumePerTimePerPressureMeasure
  extends _VolumePerTimePerPressureMeasure {}

interface _VolumePerTimePerPressureMeasureExt extends _AbstractMeasure {
  uom: VolumePerTimePerPressureUomExt;
}
export interface VolumePerTimePerPressureMeasureExt
  extends _VolumePerTimePerPressureMeasureExt {}

export type VolumePerTimePerPressureUom =
  | "1000 ft3/(psi.d)"
  | "bbl/(kPa.d)"
  | "bbl/(psi.d)"
  | "L/(bar.min)"
  | "m3/(bar.d)"
  | "m3/(bar.h)"
  | "m3/(bar.min)"
  | "m3/(kPa.d)"
  | "m3/(kPa.h)"
  | "m3/(Pa.s)"
  | "m3/(psi.d)";
interface _VolumePerTimePerPressureUom extends _UomEnum {
  _: VolumePerTimePerPressureUom;
}

export type VolumePerTimePerPressureUomExt = string;
type _VolumePerTimePerPressureUomExt = Primitive._string;

interface _VolumePerTimePerTimeMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerTimeUom;
}
export interface VolumePerTimePerTimeMeasure
  extends _VolumePerTimePerTimeMeasure {}

interface _VolumePerTimePerTimeMeasureExt extends _AbstractMeasure {
  uom: VolumePerTimePerTimeUomExt;
}
export interface VolumePerTimePerTimeMeasureExt
  extends _VolumePerTimePerTimeMeasureExt {}

export type VolumePerTimePerTimeUom =
  | "bbl/d2"
  | "bbl/h2"
  | "dm3/s2"
  | "ft3/d2"
  | "ft3/h2"
  | "ft3/min2"
  | "ft3/s2"
  | "gal[UK]/h2"
  | "gal[UK]/min2"
  | "gal[US]/h2"
  | "gal[US]/min2"
  | "L/s2"
  | "m3/d2"
  | "m3/s2";
interface _VolumePerTimePerTimeUom extends _UomEnum {
  _: VolumePerTimePerTimeUom;
}

export type VolumePerTimePerTimeUomExt = string;
type _VolumePerTimePerTimeUomExt = Primitive._string;

interface _VolumePerTimePerVolumeMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerVolumeUom;
}
export interface VolumePerTimePerVolumeMeasure
  extends _VolumePerTimePerVolumeMeasure {}

interface _VolumePerTimePerVolumeMeasureExt extends _AbstractMeasure {
  uom: VolumePerTimePerVolumeUomExt;
}
export interface VolumePerTimePerVolumeMeasureExt
  extends _VolumePerTimePerVolumeMeasureExt {}

export type VolumePerTimePerVolumeUom = "bbl/(d.acre.ft)" | "m3/(s.m3)";
interface _VolumePerTimePerVolumeUom extends _UomEnum {
  _: VolumePerTimePerVolumeUom;
}

export type VolumePerTimePerVolumeUomExt = string;
type _VolumePerTimePerVolumeUomExt = Primitive._string;

export type VolumePerTimeUom =
  | "1/30 cm3/min"
  | "1000 bbl/d"
  | "1000 ft3/d"
  | "1000 m3/d"
  | "1000 m3/h"
  | "1E6 bbl/d"
  | "1E6 ft3/d"
  | "1E6 m3/d"
  | "bbl/d"
  | "bbl/h"
  | "bbl/min"
  | "cm3/h"
  | "cm3/min"
  | "cm3/s"
  | "dm3/s"
  | "ft3/d"
  | "ft3/h"
  | "ft3/min"
  | "ft3/s"
  | "gal[UK]/d"
  | "gal[UK]/h"
  | "gal[UK]/min"
  | "gal[US]/d"
  | "gal[US]/h"
  | "gal[US]/min"
  | "L/h"
  | "L/min"
  | "L/s"
  | "m3/d"
  | "m3/h"
  | "m3/min"
  | "m3/s";
interface _VolumePerTimeUom extends _UomEnum {
  _: VolumePerTimeUom;
}

export type VolumePerTimeUomExt = string;
type _VolumePerTimeUomExt = Primitive._string;

export type VolumePerTimeUomWithLegacy = string;
type _VolumePerTimeUomWithLegacy = Primitive._string;

interface _VolumePerVolumeMeasure extends _AbstractMeasure {
  uom: VolumePerVolumeUomWithLegacy;
}
export interface VolumePerVolumeMeasure extends _VolumePerVolumeMeasure {}

interface _VolumePerVolumeMeasureExt extends _AbstractMeasure {
  uom: VolumePerVolumeUomExt;
}
export interface VolumePerVolumeMeasureExt extends _VolumePerVolumeMeasureExt {}

export type VolumePerVolumeUom =
  | "%"
  | "%[vol]"
  | "0.001 bbl/ft3"
  | "0.001 bbl/m3"
  | "0.001 gal[UK]/bbl"
  | "0.001 gal[UK]/gal[UK]"
  | "0.001 gal[US]/bbl"
  | "0.001 gal[US]/ft3"
  | "0.001 gal[US]/gal[US]"
  | "0.001 pt[UK]/bbl"
  | "0.01 bbl/bbl"
  | "0.1 gal[US]/bbl"
  | "0.1 L/bbl"
  | "0.1 pt[US]/bbl"
  | "1000 ft3/bbl"
  | "1000 m3/m3"
  | "1E-6 acre.ft/bbl"
  | "1E-6 bbl/ft3"
  | "1E-6 bbl/m3"
  | "1E6 bbl/(acre.ft)"
  | "1E6 ft3/(acre.ft)"
  | "1E6 ft3/bbl"
  | "bbl/(acre.ft)"
  | "bbl/bbl"
  | "bbl/ft3"
  | "bbl/m3"
  | "cEuc"
  | "cm3/cm3"
  | "cm3/L"
  | "cm3/m3"
  | "dm3/m3"
  | "Euc"
  | "ft3/bbl"
  | "ft3/ft3"
  | "gal[UK]/ft3"
  | "gal[US]/bbl"
  | "gal[US]/ft3"
  | "L/m3"
  | "m3/(ha.m)"
  | "m3/bbl"
  | "m3/m3"
  | "mL/gal[UK]"
  | "mL/gal[US]"
  | "mL/mL"
  | "ppk"
  | "ppm"
  | "ppm[vol]";
interface _VolumePerVolumeUom extends _UomEnum {
  _: VolumePerVolumeUom;
}

export type VolumePerVolumeUomExt = string;
type _VolumePerVolumeUomExt = Primitive._string;

export type VolumePerVolumeUomWithLegacy = string;
type _VolumePerVolumeUomWithLegacy = Primitive._string;

interface _VolumetricHeatTransferCoefficientMeasure extends _AbstractMeasure {
  uom: VolumetricHeatTransferCoefficientUom;
}
export interface VolumetricHeatTransferCoefficientMeasure
  extends _VolumetricHeatTransferCoefficientMeasure {}

interface _VolumetricHeatTransferCoefficientMeasureExt
  extends _AbstractMeasure {
  uom: VolumetricHeatTransferCoefficientUomExt;
}
export interface VolumetricHeatTransferCoefficientMeasureExt
  extends _VolumetricHeatTransferCoefficientMeasureExt {}

export type VolumetricHeatTransferCoefficientUom =
  | "Btu[IT]/(h.ft3.deltaF)"
  | "Btu[IT]/(s.ft3.deltaF)"
  | "kW/(m3.deltaK)"
  | "W/(m3.deltaK)";
interface _VolumetricHeatTransferCoefficientUom extends _UomEnum {
  _: VolumetricHeatTransferCoefficientUom;
}

export type VolumetricHeatTransferCoefficientUomExt = string;
type _VolumetricHeatTransferCoefficientUomExt = Primitive._string;

interface _VolumetricThermalExpansionMeasure extends _AbstractMeasure {
  uom: VolumetricThermalExpansionUom;
}
export interface VolumetricThermalExpansionMeasure
  extends _VolumetricThermalExpansionMeasure {}

interface _VolumetricThermalExpansionMeasureExt extends _AbstractMeasure {
  uom: VolumetricThermalExpansionUomExt;
}
export interface VolumetricThermalExpansionMeasureExt
  extends _VolumetricThermalExpansionMeasureExt {}

export type VolumetricThermalExpansionUom =
  | "1/deltaC"
  | "1/deltaF"
  | "1/deltaK"
  | "1/deltaR"
  | "1E-6 m3/(m3.deltaC)"
  | "1E-6 m3/(m3.deltaF)"
  | "m3/(m3.deltaK)"
  | "ppm[vol]/deltaC"
  | "ppm[vol]/deltaF";
interface _VolumetricThermalExpansionUom extends _UomEnum {
  _: VolumetricThermalExpansionUom;
}

export type VolumetricThermalExpansionUomExt = string;
type _VolumetricThermalExpansionUomExt = Primitive._string;

export type VolumeUom =
  | "1000 bbl"
  | "1000 ft3"
  | "1000 gal[UK]"
  | "1000 gal[US]"
  | "1000 m3"
  | "1E-6 gal[US]"
  | "1E12 ft3"
  | "1E6 bbl"
  | "1E6 ft3"
  | "1E6 m3"
  | "1E9 bbl"
  | "1E9 ft3"
  | "acre.ft"
  | "bbl"
  | "cm3"
  | "dm3"
  | "floz[UK]"
  | "floz[US]"
  | "ft3"
  | "gal[UK]"
  | "gal[US]"
  | "ha.m"
  | "hL"
  | "in3"
  | "km3"
  | "L"
  | "m3"
  | "mi3"
  | "mL"
  | "mm3"
  | "pt[UK]"
  | "pt[US]"
  | "qt[UK]"
  | "qt[US]"
  | "um2.m"
  | "yd3";
interface _VolumeUom extends _UomEnum {
  _: VolumeUom;
}

export type VolumeUomExt = string;
type _VolumeUomExt = Primitive._string;

export type VolumeUomWithLegacy = string;
type _VolumeUomWithLegacy = Primitive._string;

/** A possibly temperature and pressure corrected volume value. */
interface _VolumeValue extends BaseType {
  MeasurementPressureTemperature?: AbstractTemperaturePressure;
  /** The volume of the product. If the 'status' attribute is absent and the value is not "NaN", the data value can be assumed to be good with no restrictions. A value of "NaN" should be interpreted as null and should be not be given unless a status is also specified to explain why it is null. */
  Volume: VolumeMeasure;
}
export interface VolumeValue extends _VolumeValue {}

/** These values represent the status of a well or wellbore. */
export type WellStatus =
  | "abandoned"
  | "active"
  | "active -- injecting"
  | "active -- producing"
  | "completed"
  | "drilling"
  | "partially plugged"
  | "permitted"
  | "plugged and abandoned"
  | "proposed"
  | "sold"
  | "suspended"
  | "temporarily abandoned"
  | "testing"
  | "tight"
  | "working over"
  | "unknown";
interface _WellStatus extends _TypeEnum {
  _: WellStatus;
}

/** This class is used to represent a period of time when a facility had a consistent WellStatus. */
interface _WellStatusPeriod extends BaseType {
  /** The date and time when the status ended. */
  EndDateTime?: TimeStamp;
  /** The date and time when the status started. */
  StartDateTime?: TimeStamp;
  /** The facility's status. */
  Status: WellStatus;
}
export interface WellStatusPeriod extends _WellStatusPeriod {}

export interface document extends BaseType {
  Activity: Activity;
  ActivityTemplate: ActivityTemplate;
  Aggregate: Aggregate;
  Attachment: Attachment;
  BusinessAssociate: BusinessAssociate;
  CollectionsToDataobjectsAssociationSet: CollectionsToDataobjectsAssociationSet;
  ColumnBasedTable: ColumnBasedTable;
  DataAssuranceRecord: DataAssuranceRecord;
  DataobjectCollection: DataobjectCollection;
  Geographic2dCrs: Geographic2dCrs;
  GraphicalInformationSet: GraphicalInformationSet;
  LocalEngineering2dCrs: LocalEngineering2dCrs;
  LocalEngineeringCompoundCrs: LocalEngineeringCompoundCrs;
  ProjectedCrs: ProjectedCrs;
  PropertyKind: PropertyKind;
  PropertyKindDictionary: PropertyKindDictionary;
  RecursiveReferencePoint: RecursiveReferencePoint;
  ReferencePointInACrs: ReferencePointInACrs;
  ReferencePointInALocalEngineeringCompoundCrs: ReferencePointInALocalEngineeringCompoundCrs;
  ReferencePointInAWellbore: ReferencePointInAWellbore;
  TimeSeries: TimeSeries;
  VerticalCrs: VerticalCrs;
}
export const document: document;
