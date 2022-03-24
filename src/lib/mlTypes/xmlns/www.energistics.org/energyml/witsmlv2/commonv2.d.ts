import * as Primitive from "../../../xml-primitives";

// Source files:
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/Abstract.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/Activities.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/BaseTypes.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/CRS.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/CommonEnumerations.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/CommonTypes.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/DataAssurance.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/EmlAllObjects.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/GraphicalInformation.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/MeasureType.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/ObjectReference.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/QuantityClass.xsd
// http://127.0.0.1:8080/data/common/v2.1/xsd_schemas/ValueTypes.xsd

interface BaseType {
  _exists: boolean;
  _namespace: string;
}
interface _AbsolutePressure extends _AbstractPressureValue {
  AbsolutePressure: PressureMeasureExt;
}
export interface AbsolutePressure extends _AbsolutePressure {
  constructor: { new (): AbsolutePressure };
}
export const AbsolutePressure: { new (): AbsolutePressure };

interface _AbsorbedDoseMeasure extends _AbstractMeasure {
  uom: AbsorbedDoseUom;
}
export interface AbsorbedDoseMeasure extends _AbsorbedDoseMeasure {
  constructor: { new (): AbsorbedDoseMeasure };
}
export const AbsorbedDoseMeasure: { new (): AbsorbedDoseMeasure };

interface _AbsorbedDoseMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AbsorbedDoseMeasureExt extends _AbsorbedDoseMeasureExt {
  constructor: { new (): AbsorbedDoseMeasureExt };
}
export const AbsorbedDoseMeasureExt: { new (): AbsorbedDoseMeasureExt };

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
  content: AbsorbedDoseUom;
}

export type AbsorbedDoseUomExt = string;
type _AbsorbedDoseUomExt = Primitive._string;

/** General parameter value used in one instance of activity */
interface _AbstractActivityParameter extends BaseType {
  /** @integer When parameter is an array, used to indicate the index in the array */
  Index?: number;
  Key?: AbstractParameterKey[];
  /** Textual description about how this parameter was selected. */
  Selection?: string;
  /** Name of the parameter, used to identify it in the activity. Must have an equivalent in the activity descriptor parameters. */
  Title: string;
}
export interface AbstractActivityParameter extends _AbstractActivityParameter {
  constructor: { new (): AbstractActivityParameter };
}
export const AbstractActivityParameter: { new (): AbstractActivityParameter };

/** Generic representation of an array of Boolean values. Each derived element provides a specialized implementation to allow specific optimization of the representation. */
type _AbstractBooleanArray = _AbstractValueArray;
export interface AbstractBooleanArray extends _AbstractBooleanArray {
  constructor: { new (): AbstractBooleanArray };
}
export const AbstractBooleanArray: { new (): AbstractBooleanArray };

interface _AbstractDataObjectProxyType extends BaseType {
  /** Substitution group for normative data objects. */
  AbstractDataObject?: AbstractObject;
  Activity?: Activity;
  ActivityTemplate?: ActivityTemplate;
  DataAssuranceRecord?: DataAssuranceRecord;
  EpcExternalPartReference?: EpcExternalPartReference;
  GraphicalInformationSet?: GraphicalInformationSet;
  PropertyKind?: PropertyKind;
  PropertyKindDictionary?: PropertyKindDictionary;
  TimeSeries?: TimeSeries;
}
interface AbstractDataObjectProxyType extends _AbstractDataObjectProxyType {
  constructor: { new (): AbstractDataObjectProxyType };
}

/** Generic representation of an array of double values. Each derived element provides specialized implementation to allow specific optimization of the representation. */
type _AbstractFloatingPointArray = _AbstractNumericArray;
export interface AbstractFloatingPointArray
  extends _AbstractFloatingPointArray {
  constructor: { new (): AbstractFloatingPointArray };
}
export const AbstractFloatingPointArray: { new (): AbstractFloatingPointArray };

type _AbstractGeodeticCrs = BaseType;
export interface AbstractGeodeticCrs extends _AbstractGeodeticCrs {
  constructor: { new (): AbstractGeodeticCrs };
}
export const AbstractGeodeticCrs: { new (): AbstractGeodeticCrs };

interface _AbstractGraphicalInformation extends BaseType {
  TargetObject: DataObjectReference;
}
export interface AbstractGraphicalInformation
  extends _AbstractGraphicalInformation {
  constructor: { new (): AbstractGraphicalInformation };
}
export const AbstractGraphicalInformation: {
  new (): AbstractGraphicalInformation;
};

/** Generic representation of an array of integer values. Each derived element provides specialized implementation to allow specific optimization of the representation. */
type _AbstractIntegerArray = _AbstractNumericArray;
export interface AbstractIntegerArray extends _AbstractIntegerArray {
  constructor: { new (): AbstractIntegerArray };
}
export const AbstractIntegerArray: { new (): AbstractIntegerArray };

/** The intended abstract supertype of all quantities that have a value with a unit of measure. The unit of measure is in the uom attribute of the subtypes.
 *
 * This type allows all quantities to be profiled to be a 'float' instead of a 'double'. */
export type AbstractMeasure = number;
type _AbstractMeasure = Primitive._number;

type _AbstractNumericArray = _AbstractValueArray;
export interface AbstractNumericArray extends _AbstractNumericArray {
  constructor: { new (): AbstractNumericArray };
}
export const AbstractNumericArray: { new (): AbstractNumericArray };

/** The parent class for all top-level elements across the Energistics MLs. */
interface _AbstractObject extends BaseType {
  /** A lifecycle state like actual, required, planned, predicted, etc. This is used to qualify any top-level element (from Epicentre 2.1). */
  ExistenceKind?: ExistenceKind;
  ObjectVersion?: string;
  SchemaVersion: string;
  Uuid: string;
  Aliases?: ObjectAlias[];
  Citation: Citation;
  CustomData?: CustomData;
  ExtensionNameValue?: ExtensionNameValue[];
}
export interface AbstractObject extends _AbstractObject {
  constructor: { new (): AbstractObject };
}
export const AbstractObject: { new (): AbstractObject };

/** Abstract class describing a key used to identify a parameter value. When multiple values are provided for a given parameter, provides a way to identify the parameter through its association with an object, a time index... */
type _AbstractParameterKey = BaseType;
export interface AbstractParameterKey extends _AbstractParameterKey {
  constructor: { new (): AbstractParameterKey };
}
export const AbstractParameterKey: { new (): AbstractParameterKey };

type _AbstractPressureValue = BaseType;
export interface AbstractPressureValue extends _AbstractPressureValue {
  constructor: { new (): AbstractPressureValue };
}
export const AbstractPressureValue: { new (): AbstractPressureValue };

type _AbstractProjectedCrs = BaseType;
export interface AbstractProjectedCrs extends _AbstractProjectedCrs {
  constructor: { new (): AbstractProjectedCrs };
}
export const AbstractProjectedCrs: { new (): AbstractProjectedCrs };

/** The intended abstract supertype of all strings. This abstract type allows the control over whitespace for all strings to be defined at a high level. This type should not be used directly except to derive another type. */
export type AbstractString = string;
type _AbstractString = Primitive._string;

type _AbstractStringArray = _AbstractValueArray;
export interface AbstractStringArray extends _AbstractStringArray {
  constructor: { new (): AbstractStringArray };
}
export const AbstractStringArray: { new (): AbstractStringArray };

/** The Abstract base type of standard pressure and temperature */
type _AbstractTemperaturePressure = BaseType;
export interface AbstractTemperaturePressure
  extends _AbstractTemperaturePressure {
  constructor: { new (): AbstractTemperaturePressure };
}
export const AbstractTemperaturePressure: {
  new (): AbstractTemperaturePressure;
};

/** Generic representation of an array of numeric, Boolean, and string values. Each derived element provides specialized implementation for specific content types or for optimization of the representation. */
type _AbstractValueArray = BaseType;
export interface AbstractValueArray extends _AbstractValueArray {
  constructor: { new (): AbstractValueArray };
}
export const AbstractValueArray: { new (): AbstractValueArray };

type _AbstractVerticalCrs = BaseType;
export interface AbstractVerticalCrs extends _AbstractVerticalCrs {
  constructor: { new (): AbstractVerticalCrs };
}
export const AbstractVerticalCrs: { new (): AbstractVerticalCrs };

/** Instance of a given activity */
interface _Activity extends _AbstractObject {
  ActivityDescriptor: DataObjectReference;
  Parameter: AbstractActivityParameter[];
  Parent?: DataObjectReference;
}
export interface Activity extends _Activity {
  constructor: { new (): Activity };
}
export const Activity: { new (): Activity };

interface _ActivityOfRadioactivityMeasure extends _AbstractMeasure {
  uom: ActivityOfRadioactivityUom;
}
export interface ActivityOfRadioactivityMeasure
  extends _ActivityOfRadioactivityMeasure {
  constructor: { new (): ActivityOfRadioactivityMeasure };
}
export const ActivityOfRadioactivityMeasure: {
  new (): ActivityOfRadioactivityMeasure;
};

interface _ActivityOfRadioactivityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ActivityOfRadioactivityMeasureExt
  extends _ActivityOfRadioactivityMeasureExt {
  constructor: { new (): ActivityOfRadioactivityMeasureExt };
}
export const ActivityOfRadioactivityMeasureExt: {
  new (): ActivityOfRadioactivityMeasureExt;
};

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
  content: ActivityOfRadioactivityUom;
}

export type ActivityOfRadioactivityUomExt = string;
type _ActivityOfRadioactivityUomExt = Primitive._string;

/** Description of one type of activity. */
interface _ActivityTemplate extends _AbstractObject {
  Parameter: ParameterTemplate[];
}
export interface ActivityTemplate extends _ActivityTemplate {
  constructor: { new (): ActivityTemplate };
}
export const ActivityTemplate: { new (): ActivityTemplate };

interface _AmountOfSubstanceMeasure extends _AbstractMeasure {
  uom: AmountOfSubstanceUom;
}
export interface AmountOfSubstanceMeasure extends _AmountOfSubstanceMeasure {
  constructor: { new (): AmountOfSubstanceMeasure };
}
export const AmountOfSubstanceMeasure: { new (): AmountOfSubstanceMeasure };

interface _AmountOfSubstanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AmountOfSubstanceMeasureExt
  extends _AmountOfSubstanceMeasureExt {
  constructor: { new (): AmountOfSubstanceMeasureExt };
}
export const AmountOfSubstanceMeasureExt: {
  new (): AmountOfSubstanceMeasureExt;
};

interface _AmountOfSubstancePerAmountOfSubstanceMeasure
  extends _AbstractMeasure {
  uom: AmountOfSubstancePerAmountOfSubstanceUom;
}
export interface AmountOfSubstancePerAmountOfSubstanceMeasure
  extends _AmountOfSubstancePerAmountOfSubstanceMeasure {
  constructor: { new (): AmountOfSubstancePerAmountOfSubstanceMeasure };
}
export const AmountOfSubstancePerAmountOfSubstanceMeasure: {
  new (): AmountOfSubstancePerAmountOfSubstanceMeasure;
};

interface _AmountOfSubstancePerAmountOfSubstanceMeasureExt
  extends _AbstractMeasure {
  uom: string;
}
export interface AmountOfSubstancePerAmountOfSubstanceMeasureExt
  extends _AmountOfSubstancePerAmountOfSubstanceMeasureExt {
  constructor: { new (): AmountOfSubstancePerAmountOfSubstanceMeasureExt };
}
export const AmountOfSubstancePerAmountOfSubstanceMeasureExt: {
  new (): AmountOfSubstancePerAmountOfSubstanceMeasureExt;
};

export type AmountOfSubstancePerAmountOfSubstanceUom =
  | "%"
  | "%[molar]"
  | "Euc"
  | "mol/mol"
  | "nEuc"
  | "ppk"
  | "ppm";
interface _AmountOfSubstancePerAmountOfSubstanceUom extends _UomEnum {
  content: AmountOfSubstancePerAmountOfSubstanceUom;
}

export type AmountOfSubstancePerAmountOfSubstanceUomExt = string;
type _AmountOfSubstancePerAmountOfSubstanceUomExt = Primitive._string;

interface _AmountOfSubstancePerAreaMeasure extends _AbstractMeasure {
  uom: AmountOfSubstancePerAreaUom;
}
export interface AmountOfSubstancePerAreaMeasure
  extends _AmountOfSubstancePerAreaMeasure {
  constructor: { new (): AmountOfSubstancePerAreaMeasure };
}
export const AmountOfSubstancePerAreaMeasure: {
  new (): AmountOfSubstancePerAreaMeasure;
};

interface _AmountOfSubstancePerAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AmountOfSubstancePerAreaMeasureExt
  extends _AmountOfSubstancePerAreaMeasureExt {
  constructor: { new (): AmountOfSubstancePerAreaMeasureExt };
}
export const AmountOfSubstancePerAreaMeasureExt: {
  new (): AmountOfSubstancePerAreaMeasureExt;
};

export type AmountOfSubstancePerAreaUom = "mol/m2";
interface _AmountOfSubstancePerAreaUom extends _UomEnum {
  content: AmountOfSubstancePerAreaUom;
}

export type AmountOfSubstancePerAreaUomExt = string;
type _AmountOfSubstancePerAreaUomExt = Primitive._string;

interface _AmountOfSubstancePerTimeMeasure extends _AbstractMeasure {
  uom: AmountOfSubstancePerTimeUom;
}
export interface AmountOfSubstancePerTimeMeasure
  extends _AmountOfSubstancePerTimeMeasure {
  constructor: { new (): AmountOfSubstancePerTimeMeasure };
}
export const AmountOfSubstancePerTimeMeasure: {
  new (): AmountOfSubstancePerTimeMeasure;
};

interface _AmountOfSubstancePerTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AmountOfSubstancePerTimeMeasureExt
  extends _AmountOfSubstancePerTimeMeasureExt {
  constructor: { new (): AmountOfSubstancePerTimeMeasureExt };
}
export const AmountOfSubstancePerTimeMeasureExt: {
  new (): AmountOfSubstancePerTimeMeasureExt;
};

interface _AmountOfSubstancePerTimePerAreaMeasure extends _AbstractMeasure {
  uom: AmountOfSubstancePerTimePerAreaUom;
}
export interface AmountOfSubstancePerTimePerAreaMeasure
  extends _AmountOfSubstancePerTimePerAreaMeasure {
  constructor: { new (): AmountOfSubstancePerTimePerAreaMeasure };
}
export const AmountOfSubstancePerTimePerAreaMeasure: {
  new (): AmountOfSubstancePerTimePerAreaMeasure;
};

interface _AmountOfSubstancePerTimePerAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AmountOfSubstancePerTimePerAreaMeasureExt
  extends _AmountOfSubstancePerTimePerAreaMeasureExt {
  constructor: { new (): AmountOfSubstancePerTimePerAreaMeasureExt };
}
export const AmountOfSubstancePerTimePerAreaMeasureExt: {
  new (): AmountOfSubstancePerTimePerAreaMeasureExt;
};

export type AmountOfSubstancePerTimePerAreaUom =
  | "lbmol/(h.ft2)"
  | "lbmol/(s.ft2)"
  | "mol/(s.m2)";
interface _AmountOfSubstancePerTimePerAreaUom extends _UomEnum {
  content: AmountOfSubstancePerTimePerAreaUom;
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
  content: AmountOfSubstancePerTimeUom;
}

export type AmountOfSubstancePerTimeUomExt = string;
type _AmountOfSubstancePerTimeUomExt = Primitive._string;

interface _AmountOfSubstancePerVolumeMeasure extends _AbstractMeasure {
  uom: AmountOfSubstancePerVolumeUom;
}
export interface AmountOfSubstancePerVolumeMeasure
  extends _AmountOfSubstancePerVolumeMeasure {
  constructor: { new (): AmountOfSubstancePerVolumeMeasure };
}
export const AmountOfSubstancePerVolumeMeasure: {
  new (): AmountOfSubstancePerVolumeMeasure;
};

interface _AmountOfSubstancePerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AmountOfSubstancePerVolumeMeasureExt
  extends _AmountOfSubstancePerVolumeMeasureExt {
  constructor: { new (): AmountOfSubstancePerVolumeMeasureExt };
}
export const AmountOfSubstancePerVolumeMeasureExt: {
  new (): AmountOfSubstancePerVolumeMeasureExt;
};

export type AmountOfSubstancePerVolumeUom =
  | "kmol/m3"
  | "lbmol/ft3"
  | "lbmol/gal[UK]"
  | "lbmol/gal[US]"
  | "mol/m3";
interface _AmountOfSubstancePerVolumeUom extends _UomEnum {
  content: AmountOfSubstancePerVolumeUom;
}

export type AmountOfSubstancePerVolumeUomExt = string;
type _AmountOfSubstancePerVolumeUomExt = Primitive._string;

export type AmountOfSubstanceUom = "kmol" | "lbmol" | "mmol" | "mol" | "umol";
interface _AmountOfSubstanceUom extends _UomEnum {
  content: AmountOfSubstanceUom;
}

export type AmountOfSubstanceUomExt = string;
type _AmountOfSubstanceUomExt = Primitive._string;

interface _AnglePerLengthMeasure extends _AbstractMeasure {
  uom: AnglePerLengthUom;
}
export interface AnglePerLengthMeasure extends _AnglePerLengthMeasure {
  constructor: { new (): AnglePerLengthMeasure };
}
export const AnglePerLengthMeasure: { new (): AnglePerLengthMeasure };

interface _AnglePerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AnglePerLengthMeasureExt extends _AnglePerLengthMeasureExt {
  constructor: { new (): AnglePerLengthMeasureExt };
}
export const AnglePerLengthMeasureExt: { new (): AnglePerLengthMeasureExt };

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
  content: AnglePerLengthUom;
}

export type AnglePerLengthUomExt = string;
type _AnglePerLengthUomExt = Primitive._string;

interface _AnglePerVolumeMeasure extends _AbstractMeasure {
  uom: AnglePerVolumeUom;
}
export interface AnglePerVolumeMeasure extends _AnglePerVolumeMeasure {
  constructor: { new (): AnglePerVolumeMeasure };
}
export const AnglePerVolumeMeasure: { new (): AnglePerVolumeMeasure };

interface _AnglePerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AnglePerVolumeMeasureExt extends _AnglePerVolumeMeasureExt {
  constructor: { new (): AnglePerVolumeMeasureExt };
}
export const AnglePerVolumeMeasureExt: { new (): AnglePerVolumeMeasureExt };

export type AnglePerVolumeUom = "rad/ft3" | "rad/m3";
interface _AnglePerVolumeUom extends _UomEnum {
  content: AnglePerVolumeUom;
}

export type AnglePerVolumeUomExt = string;
type _AnglePerVolumeUomExt = Primitive._string;

interface _AngularAccelerationMeasure extends _AbstractMeasure {
  uom: AngularAccelerationUom;
}
export interface AngularAccelerationMeasure
  extends _AngularAccelerationMeasure {
  constructor: { new (): AngularAccelerationMeasure };
}
export const AngularAccelerationMeasure: { new (): AngularAccelerationMeasure };

interface _AngularAccelerationMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AngularAccelerationMeasureExt
  extends _AngularAccelerationMeasureExt {
  constructor: { new (): AngularAccelerationMeasureExt };
}
export const AngularAccelerationMeasureExt: {
  new (): AngularAccelerationMeasureExt;
};

export type AngularAccelerationUom = "rad/s2" | "rpm/s";
interface _AngularAccelerationUom extends _UomEnum {
  content: AngularAccelerationUom;
}

export type AngularAccelerationUomExt = string;
type _AngularAccelerationUomExt = Primitive._string;

interface _AngularVelocityMeasure extends _AbstractMeasure {
  uom: AngularVelocityUom;
}
export interface AngularVelocityMeasure extends _AngularVelocityMeasure {
  constructor: { new (): AngularVelocityMeasure };
}
export const AngularVelocityMeasure: { new (): AngularVelocityMeasure };

interface _AngularVelocityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AngularVelocityMeasureExt extends _AngularVelocityMeasureExt {
  constructor: { new (): AngularVelocityMeasureExt };
}
export const AngularVelocityMeasureExt: { new (): AngularVelocityMeasureExt };

export type AngularVelocityUom =
  | "dega/h"
  | "dega/min"
  | "dega/s"
  | "rad/s"
  | "rev/s"
  | "rpm";
interface _AngularVelocityUom extends _UomEnum {
  content: AngularVelocityUom;
}

export type AngularVelocityUomExt = string;
type _AngularVelocityUomExt = Primitive._string;

interface _APIGammaRayMeasure extends _AbstractMeasure {
  uom: APIGammaRayUom;
}
export interface APIGammaRayMeasure extends _APIGammaRayMeasure {
  constructor: { new (): APIGammaRayMeasure };
}
export const APIGammaRayMeasure: { new (): APIGammaRayMeasure };

interface _APIGammaRayMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface APIGammaRayMeasureExt extends _APIGammaRayMeasureExt {
  constructor: { new (): APIGammaRayMeasureExt };
}
export const APIGammaRayMeasureExt: { new (): APIGammaRayMeasureExt };

export type APIGammaRayUom = "gAPI";
interface _APIGammaRayUom extends _UomEnum {
  content: APIGammaRayUom;
}

export type APIGammaRayUomExt = string;
type _APIGammaRayUomExt = Primitive._string;

interface _APIGravityMeasure extends _AbstractMeasure {
  uom: APIGravityUom;
}
export interface APIGravityMeasure extends _APIGravityMeasure {
  constructor: { new (): APIGravityMeasure };
}
export const APIGravityMeasure: { new (): APIGravityMeasure };

interface _APIGravityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface APIGravityMeasureExt extends _APIGravityMeasureExt {
  constructor: { new (): APIGravityMeasureExt };
}
export const APIGravityMeasureExt: { new (): APIGravityMeasureExt };

export type APIGravityUom = "dAPI";
interface _APIGravityUom extends _UomEnum {
  content: APIGravityUom;
}

export type APIGravityUomExt = string;
type _APIGravityUomExt = Primitive._string;

interface _APINeutronMeasure extends _AbstractMeasure {
  uom: APINeutronUom;
}
export interface APINeutronMeasure extends _APINeutronMeasure {
  constructor: { new (): APINeutronMeasure };
}
export const APINeutronMeasure: { new (): APINeutronMeasure };

interface _APINeutronMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface APINeutronMeasureExt extends _APINeutronMeasureExt {
  constructor: { new (): APINeutronMeasureExt };
}
export const APINeutronMeasureExt: { new (): APINeutronMeasureExt };

export type APINeutronUom = "nAPI";
interface _APINeutronUom extends _UomEnum {
  content: APINeutronUom;
}

export type APINeutronUomExt = string;
type _APINeutronUomExt = Primitive._string;

interface _AreaMeasure extends _AbstractMeasure {
  uom: AreaUom;
}
export interface AreaMeasure extends _AreaMeasure {
  constructor: { new (): AreaMeasure };
}
export const AreaMeasure: { new (): AreaMeasure };

interface _AreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AreaMeasureExt extends _AreaMeasureExt {
  constructor: { new (): AreaMeasureExt };
}
export const AreaMeasureExt: { new (): AreaMeasureExt };

interface _AreaPerAmountOfSubstanceMeasure extends _AbstractMeasure {
  uom: AreaPerAmountOfSubstanceUom;
}
export interface AreaPerAmountOfSubstanceMeasure
  extends _AreaPerAmountOfSubstanceMeasure {
  constructor: { new (): AreaPerAmountOfSubstanceMeasure };
}
export const AreaPerAmountOfSubstanceMeasure: {
  new (): AreaPerAmountOfSubstanceMeasure;
};

interface _AreaPerAmountOfSubstanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AreaPerAmountOfSubstanceMeasureExt
  extends _AreaPerAmountOfSubstanceMeasureExt {
  constructor: { new (): AreaPerAmountOfSubstanceMeasureExt };
}
export const AreaPerAmountOfSubstanceMeasureExt: {
  new (): AreaPerAmountOfSubstanceMeasureExt;
};

export type AreaPerAmountOfSubstanceUom = "m2/mol";
interface _AreaPerAmountOfSubstanceUom extends _UomEnum {
  content: AreaPerAmountOfSubstanceUom;
}

export type AreaPerAmountOfSubstanceUomExt = string;
type _AreaPerAmountOfSubstanceUomExt = Primitive._string;

interface _AreaPerAreaMeasure extends _AbstractMeasure {
  uom: AreaPerAreaUom;
}
export interface AreaPerAreaMeasure extends _AreaPerAreaMeasure {
  constructor: { new (): AreaPerAreaMeasure };
}
export const AreaPerAreaMeasure: { new (): AreaPerAreaMeasure };

interface _AreaPerAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AreaPerAreaMeasureExt extends _AreaPerAreaMeasureExt {
  constructor: { new (): AreaPerAreaMeasureExt };
}
export const AreaPerAreaMeasureExt: { new (): AreaPerAreaMeasureExt };

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
  content: AreaPerAreaUom;
}

export type AreaPerAreaUomExt = string;
type _AreaPerAreaUomExt = Primitive._string;

interface _AreaPerCountMeasure extends _AbstractMeasure {
  uom: AreaPerCountUom;
}
export interface AreaPerCountMeasure extends _AreaPerCountMeasure {
  constructor: { new (): AreaPerCountMeasure };
}
export const AreaPerCountMeasure: { new (): AreaPerCountMeasure };

interface _AreaPerCountMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AreaPerCountMeasureExt extends _AreaPerCountMeasureExt {
  constructor: { new (): AreaPerCountMeasureExt };
}
export const AreaPerCountMeasureExt: { new (): AreaPerCountMeasureExt };

export type AreaPerCountUom = "b/electron";
interface _AreaPerCountUom extends _UomEnum {
  content: AreaPerCountUom;
}

export type AreaPerCountUomExt = string;
type _AreaPerCountUomExt = Primitive._string;

interface _AreaPerMassMeasure extends _AbstractMeasure {
  uom: AreaPerMassUom;
}
export interface AreaPerMassMeasure extends _AreaPerMassMeasure {
  constructor: { new (): AreaPerMassMeasure };
}
export const AreaPerMassMeasure: { new (): AreaPerMassMeasure };

interface _AreaPerMassMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AreaPerMassMeasureExt extends _AreaPerMassMeasureExt {
  constructor: { new (): AreaPerMassMeasureExt };
}
export const AreaPerMassMeasureExt: { new (): AreaPerMassMeasureExt };

export type AreaPerMassUom = "cm2/g" | "ft2/lbm" | "m2/g" | "m2/kg";
interface _AreaPerMassUom extends _UomEnum {
  content: AreaPerMassUom;
}

export type AreaPerMassUomExt = string;
type _AreaPerMassUomExt = Primitive._string;

interface _AreaPerTimeMeasure extends _AbstractMeasure {
  uom: AreaPerTimeUom;
}
export interface AreaPerTimeMeasure extends _AreaPerTimeMeasure {
  constructor: { new (): AreaPerTimeMeasure };
}
export const AreaPerTimeMeasure: { new (): AreaPerTimeMeasure };

interface _AreaPerTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AreaPerTimeMeasureExt extends _AreaPerTimeMeasureExt {
  constructor: { new (): AreaPerTimeMeasureExt };
}
export const AreaPerTimeMeasureExt: { new (): AreaPerTimeMeasureExt };

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
  content: AreaPerTimeUom;
}

export type AreaPerTimeUomExt = string;
type _AreaPerTimeUomExt = Primitive._string;

interface _AreaPerVolumeMeasure extends _AbstractMeasure {
  uom: AreaPerVolumeUom;
}
export interface AreaPerVolumeMeasure extends _AreaPerVolumeMeasure {
  constructor: { new (): AreaPerVolumeMeasure };
}
export const AreaPerVolumeMeasure: { new (): AreaPerVolumeMeasure };

interface _AreaPerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AreaPerVolumeMeasureExt extends _AreaPerVolumeMeasureExt {
  constructor: { new (): AreaPerVolumeMeasureExt };
}
export const AreaPerVolumeMeasureExt: { new (): AreaPerVolumeMeasureExt };

export type AreaPerVolumeUom =
  | "1/m"
  | "b/cm3"
  | "cu"
  | "ft2/in3"
  | "m2/cm3"
  | "m2/m3";
interface _AreaPerVolumeUom extends _UomEnum {
  content: AreaPerVolumeUom;
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
  content: AreaUom;
}

export type AreaUomExt = string;
type _AreaUomExt = Primitive._string;

interface _AttenuationPerFrequencyIntervalMeasure extends _AbstractMeasure {
  uom: AttenuationPerFrequencyIntervalUom;
}
export interface AttenuationPerFrequencyIntervalMeasure
  extends _AttenuationPerFrequencyIntervalMeasure {
  constructor: { new (): AttenuationPerFrequencyIntervalMeasure };
}
export const AttenuationPerFrequencyIntervalMeasure: {
  new (): AttenuationPerFrequencyIntervalMeasure;
};

interface _AttenuationPerFrequencyIntervalMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface AttenuationPerFrequencyIntervalMeasureExt
  extends _AttenuationPerFrequencyIntervalMeasureExt {
  constructor: { new (): AttenuationPerFrequencyIntervalMeasureExt };
}
export const AttenuationPerFrequencyIntervalMeasureExt: {
  new (): AttenuationPerFrequencyIntervalMeasureExt;
};

export type AttenuationPerFrequencyIntervalUom = "B/O" | "dB/O";
interface _AttenuationPerFrequencyIntervalUom extends _UomEnum {
  content: AttenuationPerFrequencyIntervalUom;
}

export type AttenuationPerFrequencyIntervalUomExt = string;
type _AttenuationPerFrequencyIntervalUomExt = Primitive._string;

interface _AuthorityQualifiedName extends _String64 {
  authority: string;
  code?: string;
}
export interface AuthorityQualifiedName extends _AuthorityQualifiedName {
  constructor: { new (): AuthorityQualifiedName };
}
export const AuthorityQualifiedName: { new (): AuthorityQualifiedName };

/** Defines the coordinate system axis order of the global CRS using the axis names (from EPSG database). */
export type AxisOrder2d =
  | "easting northing"
  | "northing easting"
  | "westing southing"
  | "southing westing"
  | "northing westing"
  | "westing northing";
interface _AxisOrder2d extends Primitive._string {
  content: AxisOrder2d;
}

/** An array of Boolean values defined by specifying explicitly which indices in the array are either true or false. This class is used to represent very sparse true or false data. */
interface _BooleanArrayFromIndexArray extends _AbstractBooleanArray {
  /** @integer Total number of Boolean elements in the array. This number is different from the number of indices used to represent the array. */
  Count: number;
  /** Indicates whether the specified elements are true or false. */
  IndexIsTrue: boolean;
  /** Array of integer indices.
   *
   * BUSINESS RULE: Must be non-negative. */
  Indices: AbstractIntegerArray;
}
export interface BooleanArrayFromIndexArray
  extends _BooleanArrayFromIndexArray {
  constructor: { new (): BooleanArrayFromIndexArray };
}
export const BooleanArrayFromIndexArray: { new (): BooleanArrayFromIndexArray };

/** Represents an array of Boolean values where all values are identical. This an optimization for which an array of explicit Boolean values is not required. */
interface _BooleanConstantArray extends _AbstractBooleanArray {
  /** @integer Size of the array. */
  Count: number;
  /** Value inside all the elements of the array. */
  Value: boolean;
}
export interface BooleanConstantArray extends _BooleanConstantArray {
  constructor: { new (): BooleanConstantArray };
}
export const BooleanConstantArray: { new (): BooleanConstantArray };

/** Array of Boolean values provided explicitly by an HDF5 dataset. */
interface _BooleanExternalArray extends _AbstractBooleanArray {
  /** Reference to an HDF5 array of values. */
  Values: ExternalDataset;
}
export interface BooleanExternalArray extends _BooleanExternalArray {
  constructor: { new (): BooleanExternalArray };
}
export const BooleanExternalArray: { new (): BooleanExternalArray };

interface _CapacitanceMeasure extends _AbstractMeasure {
  uom: CapacitanceUom;
}
export interface CapacitanceMeasure extends _CapacitanceMeasure {
  constructor: { new (): CapacitanceMeasure };
}
export const CapacitanceMeasure: { new (): CapacitanceMeasure };

interface _CapacitanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface CapacitanceMeasureExt extends _CapacitanceMeasureExt {
  constructor: { new (): CapacitanceMeasureExt };
}
export const CapacitanceMeasureExt: { new (): CapacitanceMeasureExt };

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
  content: CapacitanceUom;
}

export type CapacitanceUomExt = string;
type _CapacitanceUomExt = Primitive._string;

interface _CationExchangeCapacityMeasure extends _AbstractMeasure {
  uom: CationExchangeCapacityUom;
}
export interface CationExchangeCapacityMeasure
  extends _CationExchangeCapacityMeasure {
  constructor: { new (): CationExchangeCapacityMeasure };
}
export const CationExchangeCapacityMeasure: {
  new (): CationExchangeCapacityMeasure;
};

interface _CationExchangeCapacityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface CationExchangeCapacityMeasureExt
  extends _CationExchangeCapacityMeasureExt {
  constructor: { new (): CationExchangeCapacityMeasureExt };
}
export const CationExchangeCapacityMeasureExt: {
  new (): CationExchangeCapacityMeasureExt;
};

export type CationExchangeCapacityUom = ".01 meq/g";
interface _CationExchangeCapacityUom extends _UomEnum {
  content: CationExchangeCapacityUom;
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
  Creation: Date;
  /** User descriptive comments about the object. Intended for end-user use (human readable); not necessarily meant to be used by software.
   *
   * This is the equivalent of the ISO 19115 abstract.CharacterString
   *
   * Legacy DCGroup - description */
  Description?: string;
  /** Key words to describe the activity, for example, history match or volumetric calculations, relevant to this object. Intended to be used in a search function by software.
   *
   * This is the equivalent in ISO 19115 of descriptiveKeywords.MD_Keywords
   *
   * Legacy DCGroup - subject */
  DescriptiveKeywords?: string;
  /** Name (or other human-readable identifier) of the last person who updated the object.
   *
   * This is the equivalent in ISO 19115 to the CI_Individual.name or the CI_Organization.name of the citedResponsibleParty whose role is "editor".
   *
   * Legacy DCGroup - contributor */
  Editor?: string;
  /** Software or service that was used to originate the object and the file format created. Must be human and machine readable and unambiguously identify the software by including the company name, software name and software version. This is the equivalent in ISO 19115 to the distributionFormat.MD_Format.
   *
   * The ISO format for this is [vendor:applicationName]/fileExtension where the application name includes the version number of the application.
   *
   * SIG Implementation Notes
   * - Legacy DCGroup from v1.1 - publisher
   * - fileExtension is not relevant and will be ignored if present.
   * - vendor and applicationName are mandatory. */
  Format: string;
  /** Date and time the document was last modified in the source application or, if that information is not available, when it was last saved to the RESQML format file.
   *
   * This is the equivalent of the ISO 19115 CI_Date where the CI_DateTypeCode = ”lastUpdate"
   *
   * Format:
   * YYYY-MM-DDThh:mm:ssZ[+/-]hh:mm
   *
   * Legacy DCGroup - modified */
  LastUpdate?: Date;
  /** Name (or other human-readable identifier) of the person who initially originated the object or document in the source application. If that information is not available, then this is the user who created the format file. The originator remains the same as the object is subsequently edited.
   *
   * This is the equivalent in ISO 19115 to the CI_Individual.name or the CI_Organization.name of the citedResponsibleParty whose role is "originator".
   *
   * Legacy DCGroup - author */
  Originator: string;
  /** One line description/name of the object.
   *
   * This is the equivalent in ISO 19115 of CI_Citation.title
   *
   * Legacy DCGroup - title */
  Title: string;
  VersionString?: string;
}
export interface Citation extends _Citation {
  constructor: { new (): Citation };
}
export const Citation: { new (): Citation };

/** WITSML - Custom or User Defined Element and Attributes Component Schema.
 * Specify custom element, attributes, and types in the custom data area. */
type _CustomData = BaseType;
export interface CustomData extends _CustomData {
  constructor: { new (): CustomData };
}
export const CustomData: { new (): CustomData };

/** A little XML document describing whether or not a particular data object conforms with a pre-defined policy which consists of at least one rule. */
interface _DataAssuranceRecord extends _AbstractObject {
  Comment?: string;
  /** Yes/no flag indicating whether this particular data ???? conforms with the policy or not. */
  Conformance: boolean;
  /** Date the policy was last checked. This is the date for which the Conformance value is valid. */
  Date: string;
  FailingRules?: FailingRule[];
  IndexRange?: IndexRange;
  /** Agent which checked the data for conformance with the policy. This could be a person or an automated computer process or any number of other things. */
  Origin: string;
  /** Identifier of the policy whose conformance is being described. */
  PolicyId: string;
  /** Human-readable name of the policy */
  PolicyName?: string;
  ReferencedData: DataObjectReference;
  /** If the Policy applies to a single element within the referenced data object this attribute holds its element name. */
  ReferencedElementName?: string;
  /** If the Policy applies to a single occurrence of a recurring element within the referenced data object this attribute holds its uid.
   *
   * The name of the recurring element would be in the ReferencedElementName. */
  ReferencedElementUid?: string;
}
export interface DataAssuranceRecord extends _DataAssuranceRecord {
  constructor: { new (): DataAssuranceRecord };
}
export const DataAssuranceRecord: { new (): DataAssuranceRecord };

/** Parameter referencing to a top level object. */
interface _DataObjectParameter extends _AbstractActivityParameter {
  DataObject: DataObjectReference;
}
export interface DataObjectParameter extends _DataObjectParameter {
  constructor: { new (): DataObjectParameter };
}
export const DataObjectParameter: { new (): DataObjectParameter };

/** It only applies for Energistics data object. */
interface _DataObjectReference extends BaseType {
  /** The content type of the referenced element. */
  ContentType: string;
  /** The Title of the referenced object. The Title of a top level element would be inherited from AbstractObject and must be present on any referenced object. */
  Title: string;
  /** This is the URI of a referenced object.
   *
   * Do not use this to store the path and file names of an external object - that is done through the External Dataset machinery.
   *
   * This element is intended for use with the Energistics Transfer Protocol. */
  Uri?: string;
  /** Reference to an object using its global UID. */
  Uuid: string;
  /** The authority that issued and maintains the uuid of the referenced object.
   * Used mainly in alias context. */
  UuidAuthority?: string;
  /** Indicates the version of the object which is referenced. */
  VersionString?: string;
}
export interface DataObjectReference extends _DataObjectReference {
  constructor: { new (): DataObjectReference };
}
export const DataObjectReference: { new (): DataObjectReference };

interface _DataTransferSpeedMeasure extends _AbstractMeasure {
  uom: DataTransferSpeedUom;
}
export interface DataTransferSpeedMeasure extends _DataTransferSpeedMeasure {
  constructor: { new (): DataTransferSpeedMeasure };
}
export const DataTransferSpeedMeasure: { new (): DataTransferSpeedMeasure };

interface _DataTransferSpeedMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface DataTransferSpeedMeasureExt
  extends _DataTransferSpeedMeasureExt {
  constructor: { new (): DataTransferSpeedMeasureExt };
}
export const DataTransferSpeedMeasureExt: {
  new (): DataTransferSpeedMeasureExt;
};

export type DataTransferSpeedUom = "bit/s" | "byte/s";
interface _DataTransferSpeedUom extends _UomEnum {
  content: DataTransferSpeedUom;
}

export type DataTransferSpeedUomExt = string;
type _DataTransferSpeedUomExt = Primitive._string;

/** A possibly temperature and pressure corrected desity value. */
interface _DensityValue extends BaseType {
  /** The density of the product. */
  Density: MassPerVolumeMeasure;
  MeasurementPressureTemperature: AbstractTemperaturePressure;
}
export interface DensityValue extends _DensityValue {
  constructor: { new (): DensityValue };
}
export const DensityValue: { new (): DensityValue };

interface _DiffusionCoefficientMeasure extends _AbstractMeasure {
  uom: DiffusionCoefficientUom;
}
export interface DiffusionCoefficientMeasure
  extends _DiffusionCoefficientMeasure {
  constructor: { new (): DiffusionCoefficientMeasure };
}
export const DiffusionCoefficientMeasure: {
  new (): DiffusionCoefficientMeasure;
};

interface _DiffusionCoefficientMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface DiffusionCoefficientMeasureExt
  extends _DiffusionCoefficientMeasureExt {
  constructor: { new (): DiffusionCoefficientMeasureExt };
}
export const DiffusionCoefficientMeasureExt: {
  new (): DiffusionCoefficientMeasureExt;
};

export type DiffusionCoefficientUom = "m2/s";
interface _DiffusionCoefficientUom extends _UomEnum {
  content: DiffusionCoefficientUom;
}

export type DiffusionCoefficientUomExt = string;
type _DiffusionCoefficientUomExt = Primitive._string;

interface _DiffusiveTimeOfFlightMeasure extends _AbstractMeasure {
  uom: DiffusiveTimeOfFlightUom;
}
export interface DiffusiveTimeOfFlightMeasure
  extends _DiffusiveTimeOfFlightMeasure {
  constructor: { new (): DiffusiveTimeOfFlightMeasure };
}
export const DiffusiveTimeOfFlightMeasure: {
  new (): DiffusiveTimeOfFlightMeasure;
};

interface _DiffusiveTimeOfFlightMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface DiffusiveTimeOfFlightMeasureExt
  extends _DiffusiveTimeOfFlightMeasureExt {
  constructor: { new (): DiffusiveTimeOfFlightMeasureExt };
}
export const DiffusiveTimeOfFlightMeasureExt: {
  new (): DiffusiveTimeOfFlightMeasureExt;
};

export type DiffusiveTimeOfFlightUom = "h(0.5)" | "s(0.5)";
interface _DiffusiveTimeOfFlightUom extends _UomEnum {
  content: DiffusiveTimeOfFlightUom;
}

export type DiffusiveTimeOfFlightUomExt = string;
type _DiffusiveTimeOfFlightUomExt = Primitive._string;

interface _DigitalStorageMeasure extends _AbstractMeasure {
  uom: DigitalStorageUom;
}
export interface DigitalStorageMeasure extends _DigitalStorageMeasure {
  constructor: { new (): DigitalStorageMeasure };
}
export const DigitalStorageMeasure: { new (): DigitalStorageMeasure };

interface _DigitalStorageMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface DigitalStorageMeasureExt extends _DigitalStorageMeasureExt {
  constructor: { new (): DigitalStorageMeasureExt };
}
export const DigitalStorageMeasureExt: { new (): DigitalStorageMeasureExt };

export type DigitalStorageUom = "bit" | "byte" | "Kibyte" | "Mibyte";
interface _DigitalStorageUom extends _UomEnum {
  content: DigitalStorageUom;
}

export type DigitalStorageUomExt = string;
type _DigitalStorageUomExt = Primitive._string;

interface _DimensionlessMeasure extends _AbstractMeasure {
  uom: DimensionlessUom;
}
export interface DimensionlessMeasure extends _DimensionlessMeasure {
  constructor: { new (): DimensionlessMeasure };
}
export const DimensionlessMeasure: { new (): DimensionlessMeasure };

interface _DimensionlessMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface DimensionlessMeasureExt extends _DimensionlessMeasureExt {
  constructor: { new (): DimensionlessMeasureExt };
}
export const DimensionlessMeasureExt: { new (): DimensionlessMeasureExt };

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
  content: DimensionlessUom;
}

export type DimensionlessUomExt = string;
type _DimensionlessUomExt = Primitive._string;

interface _DipoleMomentMeasure extends _AbstractMeasure {
  uom: DipoleMomentUom;
}
export interface DipoleMomentMeasure extends _DipoleMomentMeasure {
  constructor: { new (): DipoleMomentMeasure };
}
export const DipoleMomentMeasure: { new (): DipoleMomentMeasure };

interface _DipoleMomentMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface DipoleMomentMeasureExt extends _DipoleMomentMeasureExt {
  constructor: { new (): DipoleMomentMeasureExt };
}
export const DipoleMomentMeasureExt: { new (): DipoleMomentMeasureExt };

export type DipoleMomentUom = "C.m";
interface _DipoleMomentUom extends _UomEnum {
  content: DipoleMomentUom;
}

export type DipoleMomentUomExt = string;
type _DipoleMomentUomExt = Primitive._string;

interface _DoseEquivalentMeasure extends _AbstractMeasure {
  uom: DoseEquivalentUom;
}
export interface DoseEquivalentMeasure extends _DoseEquivalentMeasure {
  constructor: { new (): DoseEquivalentMeasure };
}
export const DoseEquivalentMeasure: { new (): DoseEquivalentMeasure };

interface _DoseEquivalentMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface DoseEquivalentMeasureExt extends _DoseEquivalentMeasureExt {
  constructor: { new (): DoseEquivalentMeasureExt };
}
export const DoseEquivalentMeasureExt: { new (): DoseEquivalentMeasureExt };

export type DoseEquivalentUom = "mrem" | "mSv" | "rem" | "Sv";
interface _DoseEquivalentUom extends _UomEnum {
  content: DoseEquivalentUom;
}

export type DoseEquivalentUomExt = string;
type _DoseEquivalentUomExt = Primitive._string;

type _DoubleExternalArray = _FloatingPointExternalArray;
export interface DoubleExternalArray extends _DoubleExternalArray {
  constructor: { new (): DoubleExternalArray };
}
export const DoubleExternalArray: { new (): DoubleExternalArray };

/** Parameter containing a double value. */
interface _DoubleQuantityParameter extends _AbstractActivityParameter {
  CustomUnitDictionary?: DataObjectReference;
  /** Unit of measure associated with the value */
  Uom: string;
  /** Double value */
  Value: number;
}
export interface DoubleQuantityParameter extends _DoubleQuantityParameter {
  constructor: { new (): DoubleQuantityParameter };
}
export const DoubleQuantityParameter: { new (): DoubleQuantityParameter };

interface _DynamicViscosityMeasure extends _AbstractMeasure {
  uom: DynamicViscosityUom;
}
export interface DynamicViscosityMeasure extends _DynamicViscosityMeasure {
  constructor: { new (): DynamicViscosityMeasure };
}
export const DynamicViscosityMeasure: { new (): DynamicViscosityMeasure };

interface _DynamicViscosityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface DynamicViscosityMeasureExt
  extends _DynamicViscosityMeasureExt {
  constructor: { new (): DynamicViscosityMeasureExt };
}
export const DynamicViscosityMeasureExt: { new (): DynamicViscosityMeasureExt };

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
  content: DynamicViscosityUom;
}

export type DynamicViscosityUomExt = string;
type _DynamicViscosityUomExt = Primitive._string;

interface _ElectricalResistivityMeasure extends _AbstractMeasure {
  uom: ElectricalResistivityUom;
}
export interface ElectricalResistivityMeasure
  extends _ElectricalResistivityMeasure {
  constructor: { new (): ElectricalResistivityMeasure };
}
export const ElectricalResistivityMeasure: {
  new (): ElectricalResistivityMeasure;
};

interface _ElectricalResistivityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricalResistivityMeasureExt
  extends _ElectricalResistivityMeasureExt {
  constructor: { new (): ElectricalResistivityMeasureExt };
}
export const ElectricalResistivityMeasureExt: {
  new (): ElectricalResistivityMeasureExt;
};

export type ElectricalResistivityUom =
  | "kohm.m"
  | "nohm.mil2/ft"
  | "nohm.mm2/m"
  | "ohm.cm"
  | "ohm.m"
  | "ohm.m2/m";
interface _ElectricalResistivityUom extends _UomEnum {
  content: ElectricalResistivityUom;
}

export type ElectricalResistivityUomExt = string;
type _ElectricalResistivityUomExt = Primitive._string;

interface _ElectricChargeMeasure extends _AbstractMeasure {
  uom: ElectricChargeUom;
}
export interface ElectricChargeMeasure extends _ElectricChargeMeasure {
  constructor: { new (): ElectricChargeMeasure };
}
export const ElectricChargeMeasure: { new (): ElectricChargeMeasure };

interface _ElectricChargeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricChargeMeasureExt extends _ElectricChargeMeasureExt {
  constructor: { new (): ElectricChargeMeasureExt };
}
export const ElectricChargeMeasureExt: { new (): ElectricChargeMeasureExt };

interface _ElectricChargePerAreaMeasure extends _AbstractMeasure {
  uom: ElectricChargePerAreaUom;
}
export interface ElectricChargePerAreaMeasure
  extends _ElectricChargePerAreaMeasure {
  constructor: { new (): ElectricChargePerAreaMeasure };
}
export const ElectricChargePerAreaMeasure: {
  new (): ElectricChargePerAreaMeasure;
};

interface _ElectricChargePerAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricChargePerAreaMeasureExt
  extends _ElectricChargePerAreaMeasureExt {
  constructor: { new (): ElectricChargePerAreaMeasureExt };
}
export const ElectricChargePerAreaMeasureExt: {
  new (): ElectricChargePerAreaMeasureExt;
};

export type ElectricChargePerAreaUom = "C/cm2" | "C/m2" | "C/mm2" | "mC/m2";
interface _ElectricChargePerAreaUom extends _UomEnum {
  content: ElectricChargePerAreaUom;
}

export type ElectricChargePerAreaUomExt = string;
type _ElectricChargePerAreaUomExt = Primitive._string;

interface _ElectricChargePerMassMeasure extends _AbstractMeasure {
  uom: ElectricChargePerMassUom;
}
export interface ElectricChargePerMassMeasure
  extends _ElectricChargePerMassMeasure {
  constructor: { new (): ElectricChargePerMassMeasure };
}
export const ElectricChargePerMassMeasure: {
  new (): ElectricChargePerMassMeasure;
};

interface _ElectricChargePerMassMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricChargePerMassMeasureExt
  extends _ElectricChargePerMassMeasureExt {
  constructor: { new (): ElectricChargePerMassMeasureExt };
}
export const ElectricChargePerMassMeasureExt: {
  new (): ElectricChargePerMassMeasureExt;
};

export type ElectricChargePerMassUom = "A.s/kg" | "C/g" | "C/kg";
interface _ElectricChargePerMassUom extends _UomEnum {
  content: ElectricChargePerMassUom;
}

export type ElectricChargePerMassUomExt = string;
type _ElectricChargePerMassUomExt = Primitive._string;

interface _ElectricChargePerVolumeMeasure extends _AbstractMeasure {
  uom: ElectricChargePerVolumeUom;
}
export interface ElectricChargePerVolumeMeasure
  extends _ElectricChargePerVolumeMeasure {
  constructor: { new (): ElectricChargePerVolumeMeasure };
}
export const ElectricChargePerVolumeMeasure: {
  new (): ElectricChargePerVolumeMeasure;
};

interface _ElectricChargePerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricChargePerVolumeMeasureExt
  extends _ElectricChargePerVolumeMeasureExt {
  constructor: { new (): ElectricChargePerVolumeMeasureExt };
}
export const ElectricChargePerVolumeMeasureExt: {
  new (): ElectricChargePerVolumeMeasureExt;
};

export type ElectricChargePerVolumeUom = "A.s/m3" | "C/cm3" | "C/m3" | "C/mm3";
interface _ElectricChargePerVolumeUom extends _UomEnum {
  content: ElectricChargePerVolumeUom;
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
  content: ElectricChargeUom;
}

export type ElectricChargeUomExt = string;
type _ElectricChargeUomExt = Primitive._string;

interface _ElectricConductanceMeasure extends _AbstractMeasure {
  uom: ElectricConductanceUom;
}
export interface ElectricConductanceMeasure
  extends _ElectricConductanceMeasure {
  constructor: { new (): ElectricConductanceMeasure };
}
export const ElectricConductanceMeasure: { new (): ElectricConductanceMeasure };

interface _ElectricConductanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricConductanceMeasureExt
  extends _ElectricConductanceMeasureExt {
  constructor: { new (): ElectricConductanceMeasureExt };
}
export const ElectricConductanceMeasureExt: {
  new (): ElectricConductanceMeasureExt;
};

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
  content: ElectricConductanceUom;
}

export type ElectricConductanceUomExt = string;
type _ElectricConductanceUomExt = Primitive._string;

interface _ElectricConductivityMeasure extends _AbstractMeasure {
  uom: ElectricConductivityUom;
}
export interface ElectricConductivityMeasure
  extends _ElectricConductivityMeasure {
  constructor: { new (): ElectricConductivityMeasure };
}
export const ElectricConductivityMeasure: {
  new (): ElectricConductivityMeasure;
};

interface _ElectricConductivityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricConductivityMeasureExt
  extends _ElectricConductivityMeasureExt {
  constructor: { new (): ElectricConductivityMeasureExt };
}
export const ElectricConductivityMeasureExt: {
  new (): ElectricConductivityMeasureExt;
};

export type ElectricConductivityUom = "kS/m" | "mS/cm" | "mS/m" | "S/m";
interface _ElectricConductivityUom extends _UomEnum {
  content: ElectricConductivityUom;
}

export type ElectricConductivityUomExt = string;
type _ElectricConductivityUomExt = Primitive._string;

interface _ElectricCurrentDensityMeasure extends _AbstractMeasure {
  uom: ElectricCurrentDensityUom;
}
export interface ElectricCurrentDensityMeasure
  extends _ElectricCurrentDensityMeasure {
  constructor: { new (): ElectricCurrentDensityMeasure };
}
export const ElectricCurrentDensityMeasure: {
  new (): ElectricCurrentDensityMeasure;
};

interface _ElectricCurrentDensityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricCurrentDensityMeasureExt
  extends _ElectricCurrentDensityMeasureExt {
  constructor: { new (): ElectricCurrentDensityMeasureExt };
}
export const ElectricCurrentDensityMeasureExt: {
  new (): ElectricCurrentDensityMeasureExt;
};

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
  content: ElectricCurrentDensityUom;
}

export type ElectricCurrentDensityUomExt = string;
type _ElectricCurrentDensityUomExt = Primitive._string;

interface _ElectricCurrentMeasure extends _AbstractMeasure {
  uom: ElectricCurrentUom;
}
export interface ElectricCurrentMeasure extends _ElectricCurrentMeasure {
  constructor: { new (): ElectricCurrentMeasure };
}
export const ElectricCurrentMeasure: { new (): ElectricCurrentMeasure };

interface _ElectricCurrentMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricCurrentMeasureExt extends _ElectricCurrentMeasureExt {
  constructor: { new (): ElectricCurrentMeasureExt };
}
export const ElectricCurrentMeasureExt: { new (): ElectricCurrentMeasureExt };

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
  content: ElectricCurrentUom;
}

export type ElectricCurrentUomExt = string;
type _ElectricCurrentUomExt = Primitive._string;

interface _ElectricFieldStrengthMeasure extends _AbstractMeasure {
  uom: ElectricFieldStrengthUom;
}
export interface ElectricFieldStrengthMeasure
  extends _ElectricFieldStrengthMeasure {
  constructor: { new (): ElectricFieldStrengthMeasure };
}
export const ElectricFieldStrengthMeasure: {
  new (): ElectricFieldStrengthMeasure;
};

interface _ElectricFieldStrengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricFieldStrengthMeasureExt
  extends _ElectricFieldStrengthMeasureExt {
  constructor: { new (): ElectricFieldStrengthMeasureExt };
}
export const ElectricFieldStrengthMeasureExt: {
  new (): ElectricFieldStrengthMeasureExt;
};

export type ElectricFieldStrengthUom =
  | "mV/ft"
  | "mV/m"
  | "uV/ft"
  | "uV/m"
  | "V/m";
interface _ElectricFieldStrengthUom extends _UomEnum {
  content: ElectricFieldStrengthUom;
}

export type ElectricFieldStrengthUomExt = string;
type _ElectricFieldStrengthUomExt = Primitive._string;

interface _ElectricPotentialDifferenceMeasure extends _AbstractMeasure {
  uom: ElectricPotentialDifferenceUom;
}
export interface ElectricPotentialDifferenceMeasure
  extends _ElectricPotentialDifferenceMeasure {
  constructor: { new (): ElectricPotentialDifferenceMeasure };
}
export const ElectricPotentialDifferenceMeasure: {
  new (): ElectricPotentialDifferenceMeasure;
};

interface _ElectricPotentialDifferenceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricPotentialDifferenceMeasureExt
  extends _ElectricPotentialDifferenceMeasureExt {
  constructor: { new (): ElectricPotentialDifferenceMeasureExt };
}
export const ElectricPotentialDifferenceMeasureExt: {
  new (): ElectricPotentialDifferenceMeasureExt;
};

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
  content: ElectricPotentialDifferenceUom;
}

export type ElectricPotentialDifferenceUomExt = string;
type _ElectricPotentialDifferenceUomExt = Primitive._string;

interface _ElectricResistanceMeasure extends _AbstractMeasure {
  uom: ElectricResistanceUom;
}
export interface ElectricResistanceMeasure extends _ElectricResistanceMeasure {
  constructor: { new (): ElectricResistanceMeasure };
}
export const ElectricResistanceMeasure: { new (): ElectricResistanceMeasure };

interface _ElectricResistanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricResistanceMeasureExt
  extends _ElectricResistanceMeasureExt {
  constructor: { new (): ElectricResistanceMeasureExt };
}
export const ElectricResistanceMeasureExt: {
  new (): ElectricResistanceMeasureExt;
};

interface _ElectricResistancePerLengthMeasure extends _AbstractMeasure {
  uom: ElectricResistancePerLengthUom;
}
export interface ElectricResistancePerLengthMeasure
  extends _ElectricResistancePerLengthMeasure {
  constructor: { new (): ElectricResistancePerLengthMeasure };
}
export const ElectricResistancePerLengthMeasure: {
  new (): ElectricResistancePerLengthMeasure;
};

interface _ElectricResistancePerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectricResistancePerLengthMeasureExt
  extends _ElectricResistancePerLengthMeasureExt {
  constructor: { new (): ElectricResistancePerLengthMeasureExt };
}
export const ElectricResistancePerLengthMeasureExt: {
  new (): ElectricResistancePerLengthMeasureExt;
};

export type ElectricResistancePerLengthUom = "ohm/m" | "uohm/ft" | "uohm/m";
interface _ElectricResistancePerLengthUom extends _UomEnum {
  content: ElectricResistancePerLengthUom;
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
  content: ElectricResistanceUom;
}

export type ElectricResistanceUomExt = string;
type _ElectricResistanceUomExt = Primitive._string;

interface _ElectromagneticMomentMeasure extends _AbstractMeasure {
  uom: ElectromagneticMomentUom;
}
export interface ElectromagneticMomentMeasure
  extends _ElectromagneticMomentMeasure {
  constructor: { new (): ElectromagneticMomentMeasure };
}
export const ElectromagneticMomentMeasure: {
  new (): ElectromagneticMomentMeasure;
};

interface _ElectromagneticMomentMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ElectromagneticMomentMeasureExt
  extends _ElectromagneticMomentMeasureExt {
  constructor: { new (): ElectromagneticMomentMeasureExt };
}
export const ElectromagneticMomentMeasureExt: {
  new (): ElectromagneticMomentMeasureExt;
};

export type ElectromagneticMomentUom = "A.m2";
interface _ElectromagneticMomentUom extends _UomEnum {
  content: ElectromagneticMomentUom;
}

export type ElectromagneticMomentUomExt = string;
type _ElectromagneticMomentUomExt = Primitive._string;

interface _EnergyLengthPerAreaMeasure extends _AbstractMeasure {
  uom: EnergyLengthPerAreaUom;
}
export interface EnergyLengthPerAreaMeasure
  extends _EnergyLengthPerAreaMeasure {
  constructor: { new (): EnergyLengthPerAreaMeasure };
}
export const EnergyLengthPerAreaMeasure: { new (): EnergyLengthPerAreaMeasure };

interface _EnergyLengthPerAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface EnergyLengthPerAreaMeasureExt
  extends _EnergyLengthPerAreaMeasureExt {
  constructor: { new (): EnergyLengthPerAreaMeasureExt };
}
export const EnergyLengthPerAreaMeasureExt: {
  new (): EnergyLengthPerAreaMeasureExt;
};

export type EnergyLengthPerAreaUom = "J.m/m2" | "kcal[th].m/cm2";
interface _EnergyLengthPerAreaUom extends _UomEnum {
  content: EnergyLengthPerAreaUom;
}

export type EnergyLengthPerAreaUomExt = string;
type _EnergyLengthPerAreaUomExt = Primitive._string;

interface _EnergyLengthPerTimeAreaTemperatureMeasure extends _AbstractMeasure {
  uom: EnergyLengthPerTimeAreaTemperatureUom;
}
export interface EnergyLengthPerTimeAreaTemperatureMeasure
  extends _EnergyLengthPerTimeAreaTemperatureMeasure {
  constructor: { new (): EnergyLengthPerTimeAreaTemperatureMeasure };
}
export const EnergyLengthPerTimeAreaTemperatureMeasure: {
  new (): EnergyLengthPerTimeAreaTemperatureMeasure;
};

interface _EnergyLengthPerTimeAreaTemperatureMeasureExt
  extends _AbstractMeasure {
  uom: string;
}
export interface EnergyLengthPerTimeAreaTemperatureMeasureExt
  extends _EnergyLengthPerTimeAreaTemperatureMeasureExt {
  constructor: { new (): EnergyLengthPerTimeAreaTemperatureMeasureExt };
}
export const EnergyLengthPerTimeAreaTemperatureMeasureExt: {
  new (): EnergyLengthPerTimeAreaTemperatureMeasureExt;
};

export type EnergyLengthPerTimeAreaTemperatureUom =
  | "Btu[IT].in/(h.ft2.deltaF)"
  | "J.m/(s.m2.deltaK)"
  | "kJ.m/(h.m2.deltaK)"
  | "W/(m.deltaK)";
interface _EnergyLengthPerTimeAreaTemperatureUom extends _UomEnum {
  content: EnergyLengthPerTimeAreaTemperatureUom;
}

export type EnergyLengthPerTimeAreaTemperatureUomExt = string;
type _EnergyLengthPerTimeAreaTemperatureUomExt = Primitive._string;

interface _EnergyMeasure extends _AbstractMeasure {
  uom: EnergyUom;
}
export interface EnergyMeasure extends _EnergyMeasure {
  constructor: { new (): EnergyMeasure };
}
export const EnergyMeasure: { new (): EnergyMeasure };

interface _EnergyMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface EnergyMeasureExt extends _EnergyMeasureExt {
  constructor: { new (): EnergyMeasureExt };
}
export const EnergyMeasureExt: { new (): EnergyMeasureExt };

interface _EnergyPerAreaMeasure extends _AbstractMeasure {
  uom: EnergyPerAreaUom;
}
export interface EnergyPerAreaMeasure extends _EnergyPerAreaMeasure {
  constructor: { new (): EnergyPerAreaMeasure };
}
export const EnergyPerAreaMeasure: { new (): EnergyPerAreaMeasure };

interface _EnergyPerAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface EnergyPerAreaMeasureExt extends _EnergyPerAreaMeasureExt {
  constructor: { new (): EnergyPerAreaMeasureExt };
}
export const EnergyPerAreaMeasureExt: { new (): EnergyPerAreaMeasureExt };

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
  content: EnergyPerAreaUom;
}

export type EnergyPerAreaUomExt = string;
type _EnergyPerAreaUomExt = Primitive._string;

interface _EnergyPerLengthMeasure extends _AbstractMeasure {
  uom: EnergyPerLengthUom;
}
export interface EnergyPerLengthMeasure extends _EnergyPerLengthMeasure {
  constructor: { new (): EnergyPerLengthMeasure };
}
export const EnergyPerLengthMeasure: { new (): EnergyPerLengthMeasure };

interface _EnergyPerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface EnergyPerLengthMeasureExt extends _EnergyPerLengthMeasureExt {
  constructor: { new (): EnergyPerLengthMeasureExt };
}
export const EnergyPerLengthMeasureExt: { new (): EnergyPerLengthMeasureExt };

export type EnergyPerLengthUom = "J/m" | "MJ/m";
interface _EnergyPerLengthUom extends _UomEnum {
  content: EnergyPerLengthUom;
}

export type EnergyPerLengthUomExt = string;
type _EnergyPerLengthUomExt = Primitive._string;

interface _EnergyPerMassMeasure extends _AbstractMeasure {
  uom: EnergyPerMassUom;
}
export interface EnergyPerMassMeasure extends _EnergyPerMassMeasure {
  constructor: { new (): EnergyPerMassMeasure };
}
export const EnergyPerMassMeasure: { new (): EnergyPerMassMeasure };

interface _EnergyPerMassMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface EnergyPerMassMeasureExt extends _EnergyPerMassMeasureExt {
  constructor: { new (): EnergyPerMassMeasureExt };
}
export const EnergyPerMassMeasureExt: { new (): EnergyPerMassMeasureExt };

interface _EnergyPerMassPerTimeMeasure extends _AbstractMeasure {
  uom: EnergyPerMassPerTimeUom;
}
export interface EnergyPerMassPerTimeMeasure
  extends _EnergyPerMassPerTimeMeasure {
  constructor: { new (): EnergyPerMassPerTimeMeasure };
}
export const EnergyPerMassPerTimeMeasure: {
  new (): EnergyPerMassPerTimeMeasure;
};

interface _EnergyPerMassPerTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface EnergyPerMassPerTimeMeasureExt
  extends _EnergyPerMassPerTimeMeasureExt {
  constructor: { new (): EnergyPerMassPerTimeMeasureExt };
}
export const EnergyPerMassPerTimeMeasureExt: {
  new (): EnergyPerMassPerTimeMeasureExt;
};

export type EnergyPerMassPerTimeUom =
  | "mrem/h"
  | "mSv/h"
  | "rem/h"
  | "Sv/h"
  | "Sv/s";
interface _EnergyPerMassPerTimeUom extends _UomEnum {
  content: EnergyPerMassPerTimeUom;
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
  content: EnergyPerMassUom;
}

export type EnergyPerMassUomExt = string;
type _EnergyPerMassUomExt = Primitive._string;

interface _EnergyPerVolumeMeasure extends _AbstractMeasure {
  uom: EnergyPerVolumeUom;
}
export interface EnergyPerVolumeMeasure extends _EnergyPerVolumeMeasure {
  constructor: { new (): EnergyPerVolumeMeasure };
}
export const EnergyPerVolumeMeasure: { new (): EnergyPerVolumeMeasure };

interface _EnergyPerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface EnergyPerVolumeMeasureExt extends _EnergyPerVolumeMeasureExt {
  constructor: { new (): EnergyPerVolumeMeasureExt };
}
export const EnergyPerVolumeMeasureExt: { new (): EnergyPerVolumeMeasureExt };

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
  content: EnergyPerVolumeUom;
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
  content: EnergyUom;
}

export type EnergyUomExt = string;
type _EnergyUomExt = Primitive._string;

export type EnumExtensionPattern = string;
type _EnumExtensionPattern = _AbstractString;

/** It defines a proxy for external part of the EPC package. It must be used at least for external HDF parts.
 *
 * Each EpcExternalPartReference represents a single operating system file */
interface _EpcExternalPartReference extends _AbstractObject {
  Filename?: string;
  /** IAMF registered, if one exists, or a free text field. Needs documentation on seismic especially.
   *
   * MIME type for HDF proxy is : application/x-hdf5 (by convention). */
  MimeType?: string;
}
export interface EpcExternalPartReference extends _EpcExternalPartReference {
  constructor: { new (): EpcExternalPartReference };
}
export const EpcExternalPartReference: { new (): EpcExternalPartReference };

/** A list of lifecycle states like actual, required, planned, predicted, etc. These are used to qualify any top-level element (from Epicentre 2.1). */
export type ExistenceKind = "actual" | "planned" | "simulated";
interface _ExistenceKind extends _TypeEnum {
  content: ExistenceKind;
}

/** WITSML - Extension values Schema. The intent is to allow standard WITSML "named"
 * extensions without having to modify the schema. A client or server can ignore any name that it
 * does not recognize but certain meta data is required in order to allow
 * generic clients or servers to process the value. */
interface _ExtensionNameValue extends BaseType {
  /** A textual description of the extension. */
  Description?: string;
  /** The date-time associated with the value. */
  DTim?: string;
  /** @integer Indexes things with the same name.
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
  Name: string;
  /** The value of the extension. This may also include a uom attribute. The content should conform to constraints defined by the data type. */
  Value: StringMeasure;
}
export interface ExtensionNameValue extends _ExtensionNameValue {
  constructor: { new (): ExtensionNameValue };
}
export const ExtensionNameValue: { new (): ExtensionNameValue };

interface _ExternalDataset extends BaseType {
  ExternalFileProxy: ExternalDatasetPart[];
}
export interface ExternalDataset extends _ExternalDataset {
  constructor: { new (): ExternalDataset };
}
export const ExternalDataset: { new (): ExternalDataset };

interface _ExternalDatasetPart extends BaseType {
  /** @integer */
  Count: number;
  EpcExternalPartReference: DataObjectReference;
  /** A string which is meaningful to the API which will store and retrieve data from the external file.
   *
   * For an HDF file this is the path of the referenced dataset in the external file. The separator between groups and final dataset is a slash '/' in an hdf file.
   *
   * For a LAS file this could be the list of mnemonics in the ~A block.
   *
   * For a SEG-Y file this could be a list of trace headers. */
  PathInExternalFile: string;
  /** @integer */
  StartIndex: number;
}
export interface ExternalDatasetPart extends _ExternalDatasetPart {
  constructor: { new (): ExternalDatasetPart };
}
export const ExternalDatasetPart: { new (): ExternalDatasetPart };

/** The FailingRule class holds summary information on which of the rules within a policy failed. */
interface _FailingRule extends BaseType {
  /** This allows extending the FailingRule class with as many arbitrary name-value pairs as is required at run-time.
   *
   * Uses for this might include why the rule failed or by how much. */
  FailingRuleExtensions?: ExtensionNameValue[];
  /** Identifier of the atomic rule being checked against the data. */
  RuleId: string;
  /** Human-readable name of the atomic rule being checked against the data. */
  RuleName?: string;
  /** Severity of the failure. This could be used to indicate that a rule is a high-priority rule whose failure is considered as severe or could be used to indicate just how badly a rule was contravened.
   *
   * The meaning of this field should be standardized within a company to maximize its utility. */
  Severity?: string;
}
export interface FailingRule extends _FailingRule {
  constructor: { new (): FailingRule };
}
export const FailingRule: { new (): FailingRule };

type _FloatExternalArray = _FloatingPointExternalArray;
export interface FloatExternalArray extends _FloatExternalArray {
  constructor: { new (): FloatExternalArray };
}
export const FloatExternalArray: { new (): FloatExternalArray };

/** Represents an array of double values where all values are identical. This an optimization for which an array of explicit double values is not required. */
interface _FloatingPointConstantArray extends _AbstractFloatingPointArray {
  /** @integer Size of the array. */
  Count: number;
  /** Values inside all the elements of the array. */
  Value: number;
}
export interface FloatingPointConstantArray
  extends _FloatingPointConstantArray {
  constructor: { new (): FloatingPointConstantArray };
}
export const FloatingPointConstantArray: { new (): FloatingPointConstantArray };

/** An array of double values provided explicitly by an HDF5 dataset.
 * By convention, the null value is NaN. */
interface _FloatingPointExternalArray extends _AbstractFloatingPointArray {
  /** Reference to an HDF5 array of doubles. */
  Values: ExternalDataset;
}
export interface FloatingPointExternalArray
  extends _FloatingPointExternalArray {
  constructor: { new (): FloatingPointExternalArray };
}
export const FloatingPointExternalArray: { new (): FloatingPointExternalArray };

/** Represents an array of doubles based on an origin and a multi-dimensional offset. The offset is based on a linearization of a multi-dimensional offset.
 *
 * If count(i) is the number of elements in the dimension i and offset(i) is the offset in the dimension i, then:
 * globalOffsetInNDimension = startValue+ ni*offset(n) + n_1i*count(n)*offset(n-1) + .... + 0i*count(n)*count(n-1)*....count(1)*offset(0) */
interface _FloatingPointLatticeArray extends _AbstractFloatingPointArray {
  Offset: FloatingPointConstantArray[];
  /** Value representing the global start for the lattice. */
  StartValue: number;
}
export interface FloatingPointLatticeArray extends _FloatingPointLatticeArray {
  constructor: { new (): FloatingPointLatticeArray };
}
export const FloatingPointLatticeArray: { new (): FloatingPointLatticeArray };

/** A possibly temperature and pressure corrected flow rate value. */
interface _FlowRateValue extends BaseType {
  /** The flow rate of the product. If the 'status' attribute is absent and the value is not "NaN", the data value can be assumed to be good with no restrictions. A value of "NaN" should be interpreted as null and should be not be given unless a status is also specified to explain why it is null. */
  FlowRate: VolumePerTimeMeasure;
  MeasurementPressureTemperature: AbstractTemperaturePressure;
}
export interface FlowRateValue extends _FlowRateValue {
  constructor: { new (): FlowRateValue };
}
export const FlowRateValue: { new (): FlowRateValue };

interface _ForceAreaMeasure extends _AbstractMeasure {
  uom: ForceAreaUom;
}
export interface ForceAreaMeasure extends _ForceAreaMeasure {
  constructor: { new (): ForceAreaMeasure };
}
export const ForceAreaMeasure: { new (): ForceAreaMeasure };

interface _ForceAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ForceAreaMeasureExt extends _ForceAreaMeasureExt {
  constructor: { new (): ForceAreaMeasureExt };
}
export const ForceAreaMeasureExt: { new (): ForceAreaMeasureExt };

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
  content: ForceAreaUom;
}

export type ForceAreaUomExt = string;
type _ForceAreaUomExt = Primitive._string;

interface _ForceLengthPerLengthMeasure extends _AbstractMeasure {
  uom: ForceLengthPerLengthUom;
}
export interface ForceLengthPerLengthMeasure
  extends _ForceLengthPerLengthMeasure {
  constructor: { new (): ForceLengthPerLengthMeasure };
}
export const ForceLengthPerLengthMeasure: {
  new (): ForceLengthPerLengthMeasure;
};

interface _ForceLengthPerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ForceLengthPerLengthMeasureExt
  extends _ForceLengthPerLengthMeasureExt {
  constructor: { new (): ForceLengthPerLengthMeasureExt };
}
export const ForceLengthPerLengthMeasureExt: {
  new (): ForceLengthPerLengthMeasureExt;
};

export type ForceLengthPerLengthUom =
  | "kgf.m/m"
  | "lbf.ft/in"
  | "lbf.in/in"
  | "N.m/m"
  | "tonf[US].mi/ft";
interface _ForceLengthPerLengthUom extends _UomEnum {
  content: ForceLengthPerLengthUom;
}

export type ForceLengthPerLengthUomExt = string;
type _ForceLengthPerLengthUomExt = Primitive._string;

interface _ForceMeasure extends _AbstractMeasure {
  uom: ForceUom;
}
export interface ForceMeasure extends _ForceMeasure {
  constructor: { new (): ForceMeasure };
}
export const ForceMeasure: { new (): ForceMeasure };

interface _ForceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ForceMeasureExt extends _ForceMeasureExt {
  constructor: { new (): ForceMeasureExt };
}
export const ForceMeasureExt: { new (): ForceMeasureExt };

interface _ForcePerForceMeasure extends _AbstractMeasure {
  uom: ForcePerForceUom;
}
export interface ForcePerForceMeasure extends _ForcePerForceMeasure {
  constructor: { new (): ForcePerForceMeasure };
}
export const ForcePerForceMeasure: { new (): ForcePerForceMeasure };

interface _ForcePerForceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ForcePerForceMeasureExt extends _ForcePerForceMeasureExt {
  constructor: { new (): ForcePerForceMeasureExt };
}
export const ForcePerForceMeasureExt: { new (): ForcePerForceMeasureExt };

export type ForcePerForceUom = "%" | "Euc" | "kgf/kgf" | "lbf/lbf" | "N/N";
interface _ForcePerForceUom extends _UomEnum {
  content: ForcePerForceUom;
}

export type ForcePerForceUomExt = string;
type _ForcePerForceUomExt = Primitive._string;

interface _ForcePerLengthMeasure extends _AbstractMeasure {
  uom: ForcePerLengthUom;
}
export interface ForcePerLengthMeasure extends _ForcePerLengthMeasure {
  constructor: { new (): ForcePerLengthMeasure };
}
export const ForcePerLengthMeasure: { new (): ForcePerLengthMeasure };

interface _ForcePerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ForcePerLengthMeasureExt extends _ForcePerLengthMeasureExt {
  constructor: { new (): ForcePerLengthMeasureExt };
}
export const ForcePerLengthMeasureExt: { new (): ForcePerLengthMeasureExt };

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
  content: ForcePerLengthUom;
}

export type ForcePerLengthUomExt = string;
type _ForcePerLengthUomExt = Primitive._string;

interface _ForcePerVolumeMeasure extends _AbstractMeasure {
  uom: ForcePerVolumeUom;
}
export interface ForcePerVolumeMeasure extends _ForcePerVolumeMeasure {
  constructor: { new (): ForcePerVolumeMeasure };
}
export const ForcePerVolumeMeasure: { new (): ForcePerVolumeMeasure };

interface _ForcePerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ForcePerVolumeMeasureExt extends _ForcePerVolumeMeasureExt {
  constructor: { new (): ForcePerVolumeMeasureExt };
}
export const ForcePerVolumeMeasureExt: { new (): ForcePerVolumeMeasureExt };

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
  content: ForcePerVolumeUom;
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
  content: ForceUom;
}

export type ForceUomExt = string;
type _ForceUomExt = Primitive._string;

interface _FrequencyIntervalMeasure extends _AbstractMeasure {
  uom: FrequencyIntervalUom;
}
export interface FrequencyIntervalMeasure extends _FrequencyIntervalMeasure {
  constructor: { new (): FrequencyIntervalMeasure };
}
export const FrequencyIntervalMeasure: { new (): FrequencyIntervalMeasure };

interface _FrequencyIntervalMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface FrequencyIntervalMeasureExt
  extends _FrequencyIntervalMeasureExt {
  constructor: { new (): FrequencyIntervalMeasureExt };
}
export const FrequencyIntervalMeasureExt: {
  new (): FrequencyIntervalMeasureExt;
};

export type FrequencyIntervalUom = "O";
interface _FrequencyIntervalUom extends _UomEnum {
  content: FrequencyIntervalUom;
}

export type FrequencyIntervalUomExt = string;
type _FrequencyIntervalUomExt = Primitive._string;

interface _FrequencyMeasure extends _AbstractMeasure {
  uom: FrequencyUom;
}
export interface FrequencyMeasure extends _FrequencyMeasure {
  constructor: { new (): FrequencyMeasure };
}
export const FrequencyMeasure: { new (): FrequencyMeasure };

interface _FrequencyMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface FrequencyMeasureExt extends _FrequencyMeasureExt {
  constructor: { new (): FrequencyMeasureExt };
}
export const FrequencyMeasureExt: { new (): FrequencyMeasureExt };

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
  content: FrequencyUom;
}

export type FrequencyUomExt = string;
type _FrequencyUomExt = Primitive._string;

interface _GaugePressure extends _AbstractPressureValue {
  GaugePressure: PressureMeasureExt;
  ReferencePressure?: ReferencePressure;
}
export interface GaugePressure extends _GaugePressure {
  constructor: { new (): GaugePressure };
}
export const GaugePressure: { new (): GaugePressure };

/** A generic measure type.
 * This should not be used except in situations where the underlying class of data is
 * captured elsewhere. For example, for a log curve. */
interface _GenericMeasure extends _AbstractMeasure {
  uom: string;
}
export interface GenericMeasure extends _GenericMeasure {
  constructor: { new (): GenericMeasure };
}
export const GenericMeasure: { new (): GenericMeasure };

/** Qualifier for the geological time denoted by the GeochronologicalUnit: eon, era, epoch, etc. */
export type GeochronologicalRank =
  | "eon"
  | "era"
  | "period"
  | "epoch"
  | "age"
  | "chron";
interface _GeochronologicalRank extends _TypeEnum {
  content: GeochronologicalRank;
}

interface _GeodeticCrs extends _AbstractObject {
  AbstractGeodeticCrs: AbstractGeodeticCrs;
}
export interface GeodeticCrs extends _GeodeticCrs {
  constructor: { new (): GeodeticCrs };
}
export const GeodeticCrs: { new (): GeodeticCrs };

/** This class contains the EPSG code for a geodetic CRS. */
interface _GeodeticEpsgCrs extends _AbstractGeodeticCrs {
  EpsgCode: number;
}
export interface GeodeticEpsgCrs extends _GeodeticEpsgCrs {
  constructor: { new (): GeodeticEpsgCrs };
}
export const GeodeticEpsgCrs: { new (): GeodeticEpsgCrs };

/** This is the Energistics encapsulation of the GeodeticCrs type from GML. */
interface _GeodeticGmlCrs extends _AbstractGeodeticCrs {
  GmlProjectedCrsDefinition: Record<string, unknown>;
}
export interface GeodeticGmlCrs extends _GeodeticGmlCrs {
  constructor: { new (): GeodeticGmlCrs };
}
export const GeodeticGmlCrs: { new (): GeodeticGmlCrs };

/** This class contains a code for a geodetic CRS according to a local authority. This would be used in a case where a company or regulatory regime has chosen not to use EPSG codes. */
interface _GeodeticLocalAuthorityCrs extends _AbstractGeodeticCrs {
  LocalAuthorityCrsName: AuthorityQualifiedName;
}
export interface GeodeticLocalAuthorityCrs extends _GeodeticLocalAuthorityCrs {
  constructor: { new (): GeodeticLocalAuthorityCrs };
}
export const GeodeticLocalAuthorityCrs: { new (): GeodeticLocalAuthorityCrs };

/** This class is used in a case where the coordinate reference system is either unknown or is intentionally not being transferred. */
interface _GeodeticUnknownCrs extends _AbstractGeodeticCrs {
  Unknown: string;
}
export interface GeodeticUnknownCrs extends _GeodeticUnknownCrs {
  constructor: { new (): GeodeticUnknownCrs };
}
export const GeodeticUnknownCrs: { new (): GeodeticUnknownCrs };

/** ISO 19162-compliant well-known text for the Geodetic CRS. */
interface _GeodeticWktCrs extends _AbstractGeodeticCrs {
  /** ISO 19162 compliant well known text of the CRS */
  WellKnownText: string;
}
export interface GeodeticWktCrs extends _GeodeticWktCrs {
  constructor: { new (): GeodeticWktCrs };
}
export const GeodeticWktCrs: { new (): GeodeticWktCrs };

/** This class is used to represent a time at several scales:
 *
 * - A mandatory and precise DateTime used to characterize a TimeStep in a TimeSeries
 *
 * - An optional Age Offset (corresponding to a geological event occurrence) in  years. This age offset must be positive when it represents a GeologicalEvent occurrence in the past. This Age Offset is not required to be positive, to allow for the case of simulating future geological events.
 *
 * When geological time is used to represent a geological event cccurrence, the DateTime must be set by the software writer at a date no earlier than 01/01/1950. Any DateTime (even the creation DateTime of the instance) can be set in this attribute field. */
interface _GeologicTime extends BaseType {
  /** @integer A Value in Years of the Age Offset between the DateTime Attribute value and the DateTime of a GeologicalEvent Occurrence. This value must be POSITIVE when it represents a Geological Event in The past. */
  AgeOffsetAttribute?: number;
  /** A date, which can be represented according to the W3CDTF format. */
  DateTime: Date;
}
export interface GeologicTime extends _GeologicTime {
  constructor: { new (): GeologicTime };
}
export const GeologicTime: { new (): GeologicTime };

interface _GraphicalInformationSet extends _AbstractObject {
  GraphicalInformation?: AbstractGraphicalInformation[];
}
export interface GraphicalInformationSet extends _GraphicalInformationSet {
  constructor: { new (): GraphicalInformationSet };
}
export const GraphicalInformationSet: { new (): GraphicalInformationSet };

interface _HeatCapacityMeasure extends _AbstractMeasure {
  uom: HeatCapacityUom;
}
export interface HeatCapacityMeasure extends _HeatCapacityMeasure {
  constructor: { new (): HeatCapacityMeasure };
}
export const HeatCapacityMeasure: { new (): HeatCapacityMeasure };

interface _HeatCapacityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface HeatCapacityMeasureExt extends _HeatCapacityMeasureExt {
  constructor: { new (): HeatCapacityMeasureExt };
}
export const HeatCapacityMeasureExt: { new (): HeatCapacityMeasureExt };

export type HeatCapacityUom = "J/deltaK";
interface _HeatCapacityUom extends _UomEnum {
  content: HeatCapacityUom;
}

export type HeatCapacityUomExt = string;
type _HeatCapacityUomExt = Primitive._string;

interface _HeatFlowRateMeasure extends _AbstractMeasure {
  uom: HeatFlowRateUom;
}
export interface HeatFlowRateMeasure extends _HeatFlowRateMeasure {
  constructor: { new (): HeatFlowRateMeasure };
}
export const HeatFlowRateMeasure: { new (): HeatFlowRateMeasure };

interface _HeatFlowRateMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface HeatFlowRateMeasureExt extends _HeatFlowRateMeasureExt {
  constructor: { new (): HeatFlowRateMeasureExt };
}
export const HeatFlowRateMeasureExt: { new (): HeatFlowRateMeasureExt };

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
  content: HeatFlowRateUom;
}

export type HeatFlowRateUomExt = string;
type _HeatFlowRateUomExt = Primitive._string;

interface _HeatTransferCoefficientMeasure extends _AbstractMeasure {
  uom: HeatTransferCoefficientUom;
}
export interface HeatTransferCoefficientMeasure
  extends _HeatTransferCoefficientMeasure {
  constructor: { new (): HeatTransferCoefficientMeasure };
}
export const HeatTransferCoefficientMeasure: {
  new (): HeatTransferCoefficientMeasure;
};

interface _HeatTransferCoefficientMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface HeatTransferCoefficientMeasureExt
  extends _HeatTransferCoefficientMeasureExt {
  constructor: { new (): HeatTransferCoefficientMeasureExt };
}
export const HeatTransferCoefficientMeasureExt: {
  new (): HeatTransferCoefficientMeasureExt;
};

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
  content: HeatTransferCoefficientUom;
}

export type HeatTransferCoefficientUomExt = string;
type _HeatTransferCoefficientUomExt = Primitive._string;

interface _IlluminanceMeasure extends _AbstractMeasure {
  uom: IlluminanceUom;
}
export interface IlluminanceMeasure extends _IlluminanceMeasure {
  constructor: { new (): IlluminanceMeasure };
}
export const IlluminanceMeasure: { new (): IlluminanceMeasure };

interface _IlluminanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface IlluminanceMeasureExt extends _IlluminanceMeasureExt {
  constructor: { new (): IlluminanceMeasureExt };
}
export const IlluminanceMeasureExt: { new (): IlluminanceMeasureExt };

export type IlluminanceUom = "footcandle" | "klx" | "lm/m2" | "lx";
interface _IlluminanceUom extends _UomEnum {
  content: IlluminanceUom;
}

export type IlluminanceUomExt = string;
type _IlluminanceUomExt = Primitive._string;

/** In the case that the ReferencedData is indexed and the conformance with the DataAssurance policy applies to a range within that index space, this class represents that range.
 *
 * The elements are string types because the index could be of numerous data types, including integer, float and date. */
interface _IndexRange extends BaseType {
  /** The maximum index for the range over which the referenced data's conformance with the policy is being assessed. */
  IndexMaximum: string;
  /** The minimum index for the range over which the referenced data's conformance with the policy is being assessed. */
  IndexMinimum: string;
}
export interface IndexRange extends _IndexRange {
  constructor: { new (): IndexRange };
}
export const IndexRange: { new (): IndexRange };

interface _InductanceMeasure extends _AbstractMeasure {
  uom: InductanceUom;
}
export interface InductanceMeasure extends _InductanceMeasure {
  constructor: { new (): InductanceMeasure };
}
export const InductanceMeasure: { new (): InductanceMeasure };

interface _InductanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface InductanceMeasureExt extends _InductanceMeasureExt {
  constructor: { new (): InductanceMeasureExt };
}
export const InductanceMeasureExt: { new (): InductanceMeasureExt };

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
  content: InductanceUom;
}

export type InductanceUomExt = string;
type _InductanceUomExt = Primitive._string;

/** One-dimensional array of integer values obtained from the true elements of the Boolean mask. */
interface _IntegerArrayFromBooleanMaskArray extends _AbstractIntegerArray {
  /** Boolean mask. A true element indicates that the index is included on the list of integer values. */
  Mask: AbstractBooleanArray;
  /** @integer Total number of integer elements in the array. This number is different from the number of Boolean mask values used to represent the array. */
  TotalIndexCount: number;
}
export interface IntegerArrayFromBooleanMaskArray
  extends _IntegerArrayFromBooleanMaskArray {
  constructor: { new (): IntegerArrayFromBooleanMaskArray };
}
export const IntegerArrayFromBooleanMaskArray: {
  new (): IntegerArrayFromBooleanMaskArray;
};

/** Represents an array of integer values where all values are identical. This an optimization for which an array of explicit integer values is not required. */
interface _IntegerConstantArray extends _AbstractIntegerArray {
  /** @integer Size of the array. */
  Count: number;
  /** @integer Values inside all the elements of the array. */
  Value: number;
}
export interface IntegerConstantArray extends _IntegerConstantArray {
  constructor: { new (): IntegerConstantArray };
}
export const IntegerConstantArray: { new (): IntegerConstantArray };

/** Array of integer values provided explicitly by an HDF5 dataset. The null value must be  explicitly provided in the NullValue attribute of this class. */
interface _IntegerExternalArray extends _AbstractIntegerArray {
  /** @integer */
  NullValue: number;
  /** Reference to an HDF5 array of integers or doubles. */
  Values: ExternalDataset;
}
export interface IntegerExternalArray extends _IntegerExternalArray {
  constructor: { new (): IntegerExternalArray };
}
export const IntegerExternalArray: { new (): IntegerExternalArray };

/** Represents an array of integers based on an origin and a multi-dimensional offset. The offset is based on a linearization of a multi-dimensional offset.
 *
 * If count(i) is the number of elements in the dimension i and offset(i) is the offset in the dimension i, then:
 * globalOffsetInNDimension = startValue+ ni*offset(n) + n_1i*count(n)*offset(n-1) + .... + 0i*count(n)*count(n-1)*....count(1)*offset(0) */
interface _IntegerLatticeArray extends _AbstractIntegerArray {
  Offset: IntegerConstantArray[];
  /** @integer Value representing the global start for the lattice:
   * i.e., iStart + jStart*ni + kStart*ni*nj */
  StartValue: number;
}
export interface IntegerLatticeArray extends _IntegerLatticeArray {
  constructor: { new (): IntegerLatticeArray };
}
export const IntegerLatticeArray: { new (): IntegerLatticeArray };

/** Parameter containing an integer value. */
interface _IntegerQuantityParameter extends _AbstractActivityParameter {
  /** @integer Integer value */
  Value: number;
}
export interface IntegerQuantityParameter extends _IntegerQuantityParameter {
  constructor: { new (): IntegerQuantityParameter };
}
export const IntegerQuantityParameter: { new (): IntegerQuantityParameter };

/** Defines an array as a range of integers. The range is defined by an initial value and a count defining the size of the range. */
interface _IntegerRangeArray extends _AbstractIntegerArray {
  /** @integer Size of the array. */
  Count: number;
  /** @integer Start value for the range.
   * End value is start+count-1. */
  Value: number;
}
export interface IntegerRangeArray extends _IntegerRangeArray {
  constructor: { new (): IntegerRangeArray };
}
export const IntegerRangeArray: { new (): IntegerRangeArray };

interface _IsothermalCompressibilityMeasure extends _AbstractMeasure {
  uom: IsothermalCompressibilityUom;
}
export interface IsothermalCompressibilityMeasure
  extends _IsothermalCompressibilityMeasure {
  constructor: { new (): IsothermalCompressibilityMeasure };
}
export const IsothermalCompressibilityMeasure: {
  new (): IsothermalCompressibilityMeasure;
};

interface _IsothermalCompressibilityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface IsothermalCompressibilityMeasureExt
  extends _IsothermalCompressibilityMeasureExt {
  constructor: { new (): IsothermalCompressibilityMeasureExt };
}
export const IsothermalCompressibilityMeasureExt: {
  new (): IsothermalCompressibilityMeasureExt;
};

export type IsothermalCompressibilityUom =
  | "dm3/(kW.h)"
  | "dm3/MJ"
  | "m3/(kW.h)"
  | "m3/J"
  | "mm3/J"
  | "pt[UK]/(hp.h)";
interface _IsothermalCompressibilityUom extends _UomEnum {
  content: IsothermalCompressibilityUom;
}

export type IsothermalCompressibilityUomExt = string;
type _IsothermalCompressibilityUomExt = Primitive._string;

/** Data storage object for an array of variable length 1D sub-arrays. The jagged array object consists of these two arrays:
 *
 * - An aggregation of all the variable length sub-arrays into a single 1D array.
 * - The offsets into the single 1D array, given by the sum of all the sub-array lengths up to and including the current sub-array.
 *
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
export interface JaggedArray extends _JaggedArray {
  constructor: { new (): JaggedArray };
}
export const JaggedArray: { new (): JaggedArray };

interface _KinematicViscosityMeasure extends _AbstractMeasure {
  uom: KinematicViscosityUom;
}
export interface KinematicViscosityMeasure extends _KinematicViscosityMeasure {
  constructor: { new (): KinematicViscosityMeasure };
}
export const KinematicViscosityMeasure: { new (): KinematicViscosityMeasure };

interface _KinematicViscosityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface KinematicViscosityMeasureExt
  extends _KinematicViscosityMeasureExt {
  constructor: { new (): KinematicViscosityMeasureExt };
}
export const KinematicViscosityMeasureExt: {
  new (): KinematicViscosityMeasureExt;
};

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
  content: KinematicViscosityUom;
}

export type KinematicViscosityUomExt = string;
type _KinematicViscosityUomExt = Primitive._string;

interface _LengthMeasure extends _AbstractMeasure {
  uom: LengthUom;
}
export interface LengthMeasure extends _LengthMeasure {
  constructor: { new (): LengthMeasure };
}
export const LengthMeasure: { new (): LengthMeasure };

interface _LengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LengthMeasureExt extends _LengthMeasureExt {
  constructor: { new (): LengthMeasureExt };
}
export const LengthMeasureExt: { new (): LengthMeasureExt };

interface _LengthPerLengthMeasure extends _AbstractMeasure {
  uom: LengthPerLengthUom;
}
export interface LengthPerLengthMeasure extends _LengthPerLengthMeasure {
  constructor: { new (): LengthPerLengthMeasure };
}
export const LengthPerLengthMeasure: { new (): LengthPerLengthMeasure };

interface _LengthPerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LengthPerLengthMeasureExt extends _LengthPerLengthMeasureExt {
  constructor: { new (): LengthPerLengthMeasureExt };
}
export const LengthPerLengthMeasureExt: { new (): LengthPerLengthMeasureExt };

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
  content: LengthPerLengthUom;
}

export type LengthPerLengthUomExt = string;
type _LengthPerLengthUomExt = Primitive._string;

interface _LengthPerMassMeasure extends _AbstractMeasure {
  uom: LengthPerMassUom;
}
export interface LengthPerMassMeasure extends _LengthPerMassMeasure {
  constructor: { new (): LengthPerMassMeasure };
}
export const LengthPerMassMeasure: { new (): LengthPerMassMeasure };

interface _LengthPerMassMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LengthPerMassMeasureExt extends _LengthPerMassMeasureExt {
  constructor: { new (): LengthPerMassMeasureExt };
}
export const LengthPerMassMeasureExt: { new (): LengthPerMassMeasureExt };

export type LengthPerMassUom = "ft/lbm" | "m/kg";
interface _LengthPerMassUom extends _UomEnum {
  content: LengthPerMassUom;
}

export type LengthPerMassUomExt = string;
type _LengthPerMassUomExt = Primitive._string;

interface _LengthPerPressureMeasure extends _AbstractMeasure {
  uom: LengthPerPressureUom;
}
export interface LengthPerPressureMeasure extends _LengthPerPressureMeasure {
  constructor: { new (): LengthPerPressureMeasure };
}
export const LengthPerPressureMeasure: { new (): LengthPerPressureMeasure };

interface _LengthPerPressureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LengthPerPressureMeasureExt
  extends _LengthPerPressureMeasureExt {
  constructor: { new (): LengthPerPressureMeasureExt };
}
export const LengthPerPressureMeasureExt: {
  new (): LengthPerPressureMeasureExt;
};

export type LengthPerPressureUom = "ft/psi" | "m/kPa" | "m/Pa";
interface _LengthPerPressureUom extends _UomEnum {
  content: LengthPerPressureUom;
}

export type LengthPerPressureUomExt = string;
type _LengthPerPressureUomExt = Primitive._string;

interface _LengthPerTemperatureMeasure extends _AbstractMeasure {
  uom: LengthPerTemperatureUom;
}
export interface LengthPerTemperatureMeasure
  extends _LengthPerTemperatureMeasure {
  constructor: { new (): LengthPerTemperatureMeasure };
}
export const LengthPerTemperatureMeasure: {
  new (): LengthPerTemperatureMeasure;
};

interface _LengthPerTemperatureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LengthPerTemperatureMeasureExt
  extends _LengthPerTemperatureMeasureExt {
  constructor: { new (): LengthPerTemperatureMeasureExt };
}
export const LengthPerTemperatureMeasureExt: {
  new (): LengthPerTemperatureMeasureExt;
};

export type LengthPerTemperatureUom = "ft/deltaF" | "m/deltaK";
interface _LengthPerTemperatureUom extends _UomEnum {
  content: LengthPerTemperatureUom;
}

export type LengthPerTemperatureUomExt = string;
type _LengthPerTemperatureUomExt = Primitive._string;

interface _LengthPerTimeMeasure extends _AbstractMeasure {
  uom: LengthPerTimeUom;
}
export interface LengthPerTimeMeasure extends _LengthPerTimeMeasure {
  constructor: { new (): LengthPerTimeMeasure };
}
export const LengthPerTimeMeasure: { new (): LengthPerTimeMeasure };

interface _LengthPerTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LengthPerTimeMeasureExt extends _LengthPerTimeMeasureExt {
  constructor: { new (): LengthPerTimeMeasureExt };
}
export const LengthPerTimeMeasureExt: { new (): LengthPerTimeMeasureExt };

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
  content: LengthPerTimeUom;
}

export type LengthPerTimeUomExt = string;
type _LengthPerTimeUomExt = Primitive._string;

interface _LengthPerVolumeMeasure extends _AbstractMeasure {
  uom: LengthPerVolumeUom;
}
export interface LengthPerVolumeMeasure extends _LengthPerVolumeMeasure {
  constructor: { new (): LengthPerVolumeMeasure };
}
export const LengthPerVolumeMeasure: { new (): LengthPerVolumeMeasure };

interface _LengthPerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LengthPerVolumeMeasureExt extends _LengthPerVolumeMeasureExt {
  constructor: { new (): LengthPerVolumeMeasureExt };
}
export const LengthPerVolumeMeasureExt: { new (): LengthPerVolumeMeasureExt };

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
  content: LengthPerVolumeUom;
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
  content: LengthUom;
}

export type LengthUomExt = string;
type _LengthUomExt = Primitive._string;

interface _LightExposureMeasure extends _AbstractMeasure {
  uom: LightExposureUom;
}
export interface LightExposureMeasure extends _LightExposureMeasure {
  constructor: { new (): LightExposureMeasure };
}
export const LightExposureMeasure: { new (): LightExposureMeasure };

interface _LightExposureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LightExposureMeasureExt extends _LightExposureMeasureExt {
  constructor: { new (): LightExposureMeasureExt };
}
export const LightExposureMeasureExt: { new (): LightExposureMeasureExt };

export type LightExposureUom = "footcandle.s" | "lx.s";
interface _LightExposureUom extends _UomEnum {
  content: LightExposureUom;
}

export type LightExposureUomExt = string;
type _LightExposureUomExt = Primitive._string;

interface _LinearAccelerationMeasure extends _AbstractMeasure {
  uom: LinearAccelerationUom;
}
export interface LinearAccelerationMeasure extends _LinearAccelerationMeasure {
  constructor: { new (): LinearAccelerationMeasure };
}
export const LinearAccelerationMeasure: { new (): LinearAccelerationMeasure };

interface _LinearAccelerationMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LinearAccelerationMeasureExt
  extends _LinearAccelerationMeasureExt {
  constructor: { new (): LinearAccelerationMeasureExt };
}
export const LinearAccelerationMeasureExt: {
  new (): LinearAccelerationMeasureExt;
};

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
  content: LinearAccelerationUom;
}

export type LinearAccelerationUomExt = string;
type _LinearAccelerationUomExt = Primitive._string;

interface _LinearThermalExpansionMeasure extends _AbstractMeasure {
  uom: LinearThermalExpansionUom;
}
export interface LinearThermalExpansionMeasure
  extends _LinearThermalExpansionMeasure {
  constructor: { new (): LinearThermalExpansionMeasure };
}
export const LinearThermalExpansionMeasure: {
  new (): LinearThermalExpansionMeasure;
};

interface _LinearThermalExpansionMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LinearThermalExpansionMeasureExt
  extends _LinearThermalExpansionMeasureExt {
  constructor: { new (): LinearThermalExpansionMeasureExt };
}
export const LinearThermalExpansionMeasureExt: {
  new (): LinearThermalExpansionMeasureExt;
};

export type LinearThermalExpansionUom =
  | "1/deltaK"
  | "in/(in.deltaF)"
  | "m/(m.deltaK)"
  | "mm/(mm.deltaK)";
interface _LinearThermalExpansionUom extends _UomEnum {
  content: LinearThermalExpansionUom;
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
  content: LithologyKind;
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
  content: LithologyQualifierKind;
}

export type LithologyQualifierKindExt = string;
type _LithologyQualifierKindExt = Primitive._string;

/** Specifies the unit of lithostratigraphy. */
export type LithostratigraphicRank = "group" | "formation" | "member" | "bed";
interface _LithostratigraphicRank extends _TypeEnum {
  content: LithostratigraphicRank;
}

interface _LogarithmicPowerRatioMeasure extends _AbstractMeasure {
  uom: LogarithmicPowerRatioUom;
}
export interface LogarithmicPowerRatioMeasure
  extends _LogarithmicPowerRatioMeasure {
  constructor: { new (): LogarithmicPowerRatioMeasure };
}
export const LogarithmicPowerRatioMeasure: {
  new (): LogarithmicPowerRatioMeasure;
};

interface _LogarithmicPowerRatioMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LogarithmicPowerRatioMeasureExt
  extends _LogarithmicPowerRatioMeasureExt {
  constructor: { new (): LogarithmicPowerRatioMeasureExt };
}
export const LogarithmicPowerRatioMeasureExt: {
  new (): LogarithmicPowerRatioMeasureExt;
};

interface _LogarithmicPowerRatioPerLengthMeasure extends _AbstractMeasure {
  uom: LogarithmicPowerRatioPerLengthUom;
}
export interface LogarithmicPowerRatioPerLengthMeasure
  extends _LogarithmicPowerRatioPerLengthMeasure {
  constructor: { new (): LogarithmicPowerRatioPerLengthMeasure };
}
export const LogarithmicPowerRatioPerLengthMeasure: {
  new (): LogarithmicPowerRatioPerLengthMeasure;
};

interface _LogarithmicPowerRatioPerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LogarithmicPowerRatioPerLengthMeasureExt
  extends _LogarithmicPowerRatioPerLengthMeasureExt {
  constructor: { new (): LogarithmicPowerRatioPerLengthMeasureExt };
}
export const LogarithmicPowerRatioPerLengthMeasureExt: {
  new (): LogarithmicPowerRatioPerLengthMeasureExt;
};

export type LogarithmicPowerRatioPerLengthUom =
  | "B/m"
  | "dB/ft"
  | "dB/km"
  | "dB/m";
interface _LogarithmicPowerRatioPerLengthUom extends _UomEnum {
  content: LogarithmicPowerRatioPerLengthUom;
}

export type LogarithmicPowerRatioPerLengthUomExt = string;
type _LogarithmicPowerRatioPerLengthUomExt = Primitive._string;

export type LogarithmicPowerRatioUom = "B" | "dB";
interface _LogarithmicPowerRatioUom extends _UomEnum {
  content: LogarithmicPowerRatioUom;
}

export type LogarithmicPowerRatioUomExt = string;
type _LogarithmicPowerRatioUomExt = Primitive._string;

interface _LuminanceMeasure extends _AbstractMeasure {
  uom: LuminanceUom;
}
export interface LuminanceMeasure extends _LuminanceMeasure {
  constructor: { new (): LuminanceMeasure };
}
export const LuminanceMeasure: { new (): LuminanceMeasure };

interface _LuminanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LuminanceMeasureExt extends _LuminanceMeasureExt {
  constructor: { new (): LuminanceMeasureExt };
}
export const LuminanceMeasureExt: { new (): LuminanceMeasureExt };

export type LuminanceUom = "cd/m2";
interface _LuminanceUom extends _UomEnum {
  content: LuminanceUom;
}

export type LuminanceUomExt = string;
type _LuminanceUomExt = Primitive._string;

interface _LuminousEfficacyMeasure extends _AbstractMeasure {
  uom: LuminousEfficacyUom;
}
export interface LuminousEfficacyMeasure extends _LuminousEfficacyMeasure {
  constructor: { new (): LuminousEfficacyMeasure };
}
export const LuminousEfficacyMeasure: { new (): LuminousEfficacyMeasure };

interface _LuminousEfficacyMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LuminousEfficacyMeasureExt
  extends _LuminousEfficacyMeasureExt {
  constructor: { new (): LuminousEfficacyMeasureExt };
}
export const LuminousEfficacyMeasureExt: { new (): LuminousEfficacyMeasureExt };

export type LuminousEfficacyUom = "lm/W";
interface _LuminousEfficacyUom extends _UomEnum {
  content: LuminousEfficacyUom;
}

export type LuminousEfficacyUomExt = string;
type _LuminousEfficacyUomExt = Primitive._string;

interface _LuminousFluxMeasure extends _AbstractMeasure {
  uom: LuminousFluxUom;
}
export interface LuminousFluxMeasure extends _LuminousFluxMeasure {
  constructor: { new (): LuminousFluxMeasure };
}
export const LuminousFluxMeasure: { new (): LuminousFluxMeasure };

interface _LuminousFluxMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LuminousFluxMeasureExt extends _LuminousFluxMeasureExt {
  constructor: { new (): LuminousFluxMeasureExt };
}
export const LuminousFluxMeasureExt: { new (): LuminousFluxMeasureExt };

export type LuminousFluxUom = "lm";
interface _LuminousFluxUom extends _UomEnum {
  content: LuminousFluxUom;
}

export type LuminousFluxUomExt = string;
type _LuminousFluxUomExt = Primitive._string;

interface _LuminousIntensityMeasure extends _AbstractMeasure {
  uom: LuminousIntensityUom;
}
export interface LuminousIntensityMeasure extends _LuminousIntensityMeasure {
  constructor: { new (): LuminousIntensityMeasure };
}
export const LuminousIntensityMeasure: { new (): LuminousIntensityMeasure };

interface _LuminousIntensityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface LuminousIntensityMeasureExt
  extends _LuminousIntensityMeasureExt {
  constructor: { new (): LuminousIntensityMeasureExt };
}
export const LuminousIntensityMeasureExt: {
  new (): LuminousIntensityMeasureExt;
};

export type LuminousIntensityUom = "cd" | "kcd";
interface _LuminousIntensityUom extends _UomEnum {
  content: LuminousIntensityUom;
}

export type LuminousIntensityUomExt = string;
type _LuminousIntensityUomExt = Primitive._string;

interface _MagneticDipoleMomentMeasure extends _AbstractMeasure {
  uom: MagneticDipoleMomentUom;
}
export interface MagneticDipoleMomentMeasure
  extends _MagneticDipoleMomentMeasure {
  constructor: { new (): MagneticDipoleMomentMeasure };
}
export const MagneticDipoleMomentMeasure: {
  new (): MagneticDipoleMomentMeasure;
};

interface _MagneticDipoleMomentMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MagneticDipoleMomentMeasureExt
  extends _MagneticDipoleMomentMeasureExt {
  constructor: { new (): MagneticDipoleMomentMeasureExt };
}
export const MagneticDipoleMomentMeasureExt: {
  new (): MagneticDipoleMomentMeasureExt;
};

export type MagneticDipoleMomentUom = "Wb.m";
interface _MagneticDipoleMomentUom extends _UomEnum {
  content: MagneticDipoleMomentUom;
}

export type MagneticDipoleMomentUomExt = string;
type _MagneticDipoleMomentUomExt = Primitive._string;

interface _MagneticFieldStrengthMeasure extends _AbstractMeasure {
  uom: MagneticFieldStrengthUom;
}
export interface MagneticFieldStrengthMeasure
  extends _MagneticFieldStrengthMeasure {
  constructor: { new (): MagneticFieldStrengthMeasure };
}
export const MagneticFieldStrengthMeasure: {
  new (): MagneticFieldStrengthMeasure;
};

interface _MagneticFieldStrengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MagneticFieldStrengthMeasureExt
  extends _MagneticFieldStrengthMeasureExt {
  constructor: { new (): MagneticFieldStrengthMeasureExt };
}
export const MagneticFieldStrengthMeasureExt: {
  new (): MagneticFieldStrengthMeasureExt;
};

export type MagneticFieldStrengthUom = "A/m" | "A/mm" | "Oe";
interface _MagneticFieldStrengthUom extends _UomEnum {
  content: MagneticFieldStrengthUom;
}

export type MagneticFieldStrengthUomExt = string;
type _MagneticFieldStrengthUomExt = Primitive._string;

interface _MagneticFluxDensityMeasure extends _AbstractMeasure {
  uom: MagneticFluxDensityUom;
}
export interface MagneticFluxDensityMeasure
  extends _MagneticFluxDensityMeasure {
  constructor: { new (): MagneticFluxDensityMeasure };
}
export const MagneticFluxDensityMeasure: { new (): MagneticFluxDensityMeasure };

interface _MagneticFluxDensityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MagneticFluxDensityMeasureExt
  extends _MagneticFluxDensityMeasureExt {
  constructor: { new (): MagneticFluxDensityMeasureExt };
}
export const MagneticFluxDensityMeasureExt: {
  new (): MagneticFluxDensityMeasureExt;
};

interface _MagneticFluxDensityPerLengthMeasure extends _AbstractMeasure {
  uom: MagneticFluxDensityPerLengthUom;
}
export interface MagneticFluxDensityPerLengthMeasure
  extends _MagneticFluxDensityPerLengthMeasure {
  constructor: { new (): MagneticFluxDensityPerLengthMeasure };
}
export const MagneticFluxDensityPerLengthMeasure: {
  new (): MagneticFluxDensityPerLengthMeasure;
};

interface _MagneticFluxDensityPerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MagneticFluxDensityPerLengthMeasureExt
  extends _MagneticFluxDensityPerLengthMeasureExt {
  constructor: { new (): MagneticFluxDensityPerLengthMeasureExt };
}
export const MagneticFluxDensityPerLengthMeasureExt: {
  new (): MagneticFluxDensityPerLengthMeasureExt;
};

export type MagneticFluxDensityPerLengthUom = "gauss/cm" | "mT/dm" | "T/m";
interface _MagneticFluxDensityPerLengthUom extends _UomEnum {
  content: MagneticFluxDensityPerLengthUom;
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
  content: MagneticFluxDensityUom;
}

export type MagneticFluxDensityUomExt = string;
type _MagneticFluxDensityUomExt = Primitive._string;

interface _MagneticFluxMeasure extends _AbstractMeasure {
  uom: MagneticFluxUom;
}
export interface MagneticFluxMeasure extends _MagneticFluxMeasure {
  constructor: { new (): MagneticFluxMeasure };
}
export const MagneticFluxMeasure: { new (): MagneticFluxMeasure };

interface _MagneticFluxMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MagneticFluxMeasureExt extends _MagneticFluxMeasureExt {
  constructor: { new (): MagneticFluxMeasureExt };
}
export const MagneticFluxMeasureExt: { new (): MagneticFluxMeasureExt };

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
  content: MagneticFluxUom;
}

export type MagneticFluxUomExt = string;
type _MagneticFluxUomExt = Primitive._string;

interface _MagneticPermeabilityMeasure extends _AbstractMeasure {
  uom: MagneticPermeabilityUom;
}
export interface MagneticPermeabilityMeasure
  extends _MagneticPermeabilityMeasure {
  constructor: { new (): MagneticPermeabilityMeasure };
}
export const MagneticPermeabilityMeasure: {
  new (): MagneticPermeabilityMeasure;
};

interface _MagneticPermeabilityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MagneticPermeabilityMeasureExt
  extends _MagneticPermeabilityMeasureExt {
  constructor: { new (): MagneticPermeabilityMeasureExt };
}
export const MagneticPermeabilityMeasureExt: {
  new (): MagneticPermeabilityMeasureExt;
};

export type MagneticPermeabilityUom = "H/m" | "uH/m";
interface _MagneticPermeabilityUom extends _UomEnum {
  content: MagneticPermeabilityUom;
}

export type MagneticPermeabilityUomExt = string;
type _MagneticPermeabilityUomExt = Primitive._string;

interface _MagneticVectorPotentialMeasure extends _AbstractMeasure {
  uom: MagneticVectorPotentialUom;
}
export interface MagneticVectorPotentialMeasure
  extends _MagneticVectorPotentialMeasure {
  constructor: { new (): MagneticVectorPotentialMeasure };
}
export const MagneticVectorPotentialMeasure: {
  new (): MagneticVectorPotentialMeasure;
};

interface _MagneticVectorPotentialMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MagneticVectorPotentialMeasureExt
  extends _MagneticVectorPotentialMeasureExt {
  constructor: { new (): MagneticVectorPotentialMeasureExt };
}
export const MagneticVectorPotentialMeasureExt: {
  new (): MagneticVectorPotentialMeasureExt;
};

export type MagneticVectorPotentialUom = "Wb/m" | "Wb/mm";
interface _MagneticVectorPotentialUom extends _UomEnum {
  content: MagneticVectorPotentialUom;
}

export type MagneticVectorPotentialUomExt = string;
type _MagneticVectorPotentialUomExt = Primitive._string;

interface _MassLengthMeasure extends _AbstractMeasure {
  uom: MassLengthUom;
}
export interface MassLengthMeasure extends _MassLengthMeasure {
  constructor: { new (): MassLengthMeasure };
}
export const MassLengthMeasure: { new (): MassLengthMeasure };

interface _MassLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassLengthMeasureExt extends _MassLengthMeasureExt {
  constructor: { new (): MassLengthMeasureExt };
}
export const MassLengthMeasureExt: { new (): MassLengthMeasureExt };

export type MassLengthUom = "kg.m" | "lbm.ft";
interface _MassLengthUom extends _UomEnum {
  content: MassLengthUom;
}

export type MassLengthUomExt = string;
type _MassLengthUomExt = Primitive._string;

interface _MassMeasure extends _AbstractMeasure {
  uom: MassUom;
}
export interface MassMeasure extends _MassMeasure {
  constructor: { new (): MassMeasure };
}
export const MassMeasure: { new (): MassMeasure };

interface _MassMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassMeasureExt extends _MassMeasureExt {
  constructor: { new (): MassMeasureExt };
}
export const MassMeasureExt: { new (): MassMeasureExt };

interface _MassPerAreaMeasure extends _AbstractMeasure {
  uom: MassPerAreaUom;
}
export interface MassPerAreaMeasure extends _MassPerAreaMeasure {
  constructor: { new (): MassPerAreaMeasure };
}
export const MassPerAreaMeasure: { new (): MassPerAreaMeasure };

interface _MassPerAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassPerAreaMeasureExt extends _MassPerAreaMeasureExt {
  constructor: { new (): MassPerAreaMeasureExt };
}
export const MassPerAreaMeasureExt: { new (): MassPerAreaMeasureExt };

export type MassPerAreaUom =
  | "0.01 lbm/ft2"
  | "kg/m2"
  | "lbm/ft2"
  | "Mg/m2"
  | "ton[US]/ft2";
interface _MassPerAreaUom extends _UomEnum {
  content: MassPerAreaUom;
}

export type MassPerAreaUomExt = string;
type _MassPerAreaUomExt = Primitive._string;

interface _MassPerEnergyMeasure extends _AbstractMeasure {
  uom: MassPerEnergyUom;
}
export interface MassPerEnergyMeasure extends _MassPerEnergyMeasure {
  constructor: { new (): MassPerEnergyMeasure };
}
export const MassPerEnergyMeasure: { new (): MassPerEnergyMeasure };

interface _MassPerEnergyMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassPerEnergyMeasureExt extends _MassPerEnergyMeasureExt {
  constructor: { new (): MassPerEnergyMeasureExt };
}
export const MassPerEnergyMeasureExt: { new (): MassPerEnergyMeasureExt };

export type MassPerEnergyUom =
  | "kg/(kW.h)"
  | "kg/J"
  | "kg/MJ"
  | "lbm/(hp.h)"
  | "mg/J";
interface _MassPerEnergyUom extends _UomEnum {
  content: MassPerEnergyUom;
}

export type MassPerEnergyUomExt = string;
type _MassPerEnergyUomExt = Primitive._string;

interface _MassPerLengthMeasure extends _AbstractMeasure {
  uom: MassPerLengthUom;
}
export interface MassPerLengthMeasure extends _MassPerLengthMeasure {
  constructor: { new (): MassPerLengthMeasure };
}
export const MassPerLengthMeasure: { new (): MassPerLengthMeasure };

interface _MassPerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassPerLengthMeasureExt extends _MassPerLengthMeasureExt {
  constructor: { new (): MassPerLengthMeasureExt };
}
export const MassPerLengthMeasureExt: { new (): MassPerLengthMeasureExt };

export type MassPerLengthUom =
  | "kg.m/cm2"
  | "kg/m"
  | "klbm/in"
  | "lbm/ft"
  | "Mg/in";
interface _MassPerLengthUom extends _UomEnum {
  content: MassPerLengthUom;
}

export type MassPerLengthUomExt = string;
type _MassPerLengthUomExt = Primitive._string;

interface _MassPerMassMeasure extends _AbstractMeasure {
  uom: MassPerMassUom;
}
export interface MassPerMassMeasure extends _MassPerMassMeasure {
  constructor: { new (): MassPerMassMeasure };
}
export const MassPerMassMeasure: { new (): MassPerMassMeasure };

interface _MassPerMassMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassPerMassMeasureExt extends _MassPerMassMeasureExt {
  constructor: { new (): MassPerMassMeasureExt };
}
export const MassPerMassMeasureExt: { new (): MassPerMassMeasureExt };

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
  content: MassPerMassUom;
}

export type MassPerMassUomExt = string;
type _MassPerMassUomExt = Primitive._string;

interface _MassPerTimeMeasure extends _AbstractMeasure {
  uom: MassPerTimeUom;
}
export interface MassPerTimeMeasure extends _MassPerTimeMeasure {
  constructor: { new (): MassPerTimeMeasure };
}
export const MassPerTimeMeasure: { new (): MassPerTimeMeasure };

interface _MassPerTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassPerTimeMeasureExt extends _MassPerTimeMeasureExt {
  constructor: { new (): MassPerTimeMeasureExt };
}
export const MassPerTimeMeasureExt: { new (): MassPerTimeMeasureExt };

interface _MassPerTimePerAreaMeasure extends _AbstractMeasure {
  uom: MassPerTimePerAreaUom;
}
export interface MassPerTimePerAreaMeasure extends _MassPerTimePerAreaMeasure {
  constructor: { new (): MassPerTimePerAreaMeasure };
}
export const MassPerTimePerAreaMeasure: { new (): MassPerTimePerAreaMeasure };

interface _MassPerTimePerAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassPerTimePerAreaMeasureExt
  extends _MassPerTimePerAreaMeasureExt {
  constructor: { new (): MassPerTimePerAreaMeasureExt };
}
export const MassPerTimePerAreaMeasureExt: {
  new (): MassPerTimePerAreaMeasureExt;
};

export type MassPerTimePerAreaUom =
  | "g.ft/(cm3.s)"
  | "g.m/(cm3.s)"
  | "kg/(m2.s)"
  | "kPa.s/m"
  | "lbm/(ft2.h)"
  | "lbm/(ft2.s)"
  | "MPa.s/m";
interface _MassPerTimePerAreaUom extends _UomEnum {
  content: MassPerTimePerAreaUom;
}

export type MassPerTimePerAreaUomExt = string;
type _MassPerTimePerAreaUomExt = Primitive._string;

interface _MassPerTimePerLengthMeasure extends _AbstractMeasure {
  uom: MassPerTimePerLengthUom;
}
export interface MassPerTimePerLengthMeasure
  extends _MassPerTimePerLengthMeasure {
  constructor: { new (): MassPerTimePerLengthMeasure };
}
export const MassPerTimePerLengthMeasure: {
  new (): MassPerTimePerLengthMeasure;
};

interface _MassPerTimePerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassPerTimePerLengthMeasureExt
  extends _MassPerTimePerLengthMeasureExt {
  constructor: { new (): MassPerTimePerLengthMeasureExt };
}
export const MassPerTimePerLengthMeasureExt: {
  new (): MassPerTimePerLengthMeasureExt;
};

export type MassPerTimePerLengthUom =
  | "kg/(m.s)"
  | "lbm/(ft.h)"
  | "lbm/(ft.s)"
  | "Pa.s";
interface _MassPerTimePerLengthUom extends _UomEnum {
  content: MassPerTimePerLengthUom;
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
  content: MassPerTimeUom;
}

export type MassPerTimeUomExt = string;
type _MassPerTimeUomExt = Primitive._string;

interface _MassPerVolumeMeasure extends _AbstractMeasure {
  uom: MassPerVolumeUom;
}
export interface MassPerVolumeMeasure extends _MassPerVolumeMeasure {
  constructor: { new (): MassPerVolumeMeasure };
}
export const MassPerVolumeMeasure: { new (): MassPerVolumeMeasure };

interface _MassPerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassPerVolumeMeasureExt extends _MassPerVolumeMeasureExt {
  constructor: { new (): MassPerVolumeMeasureExt };
}
export const MassPerVolumeMeasureExt: { new (): MassPerVolumeMeasureExt };

interface _MassPerVolumePerLengthMeasure extends _AbstractMeasure {
  uom: MassPerVolumePerLengthUom;
}
export interface MassPerVolumePerLengthMeasure
  extends _MassPerVolumePerLengthMeasure {
  constructor: { new (): MassPerVolumePerLengthMeasure };
}
export const MassPerVolumePerLengthMeasure: {
  new (): MassPerVolumePerLengthMeasure;
};

interface _MassPerVolumePerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassPerVolumePerLengthMeasureExt
  extends _MassPerVolumePerLengthMeasureExt {
  constructor: { new (): MassPerVolumePerLengthMeasureExt };
}
export const MassPerVolumePerLengthMeasureExt: {
  new (): MassPerVolumePerLengthMeasureExt;
};

export type MassPerVolumePerLengthUom =
  | "g/cm4"
  | "kg/dm4"
  | "kg/m4"
  | "lbm/(gal[UK].ft)"
  | "lbm/(gal[US].ft)"
  | "lbm/ft4"
  | "Pa.s2/m3";
interface _MassPerVolumePerLengthUom extends _UomEnum {
  content: MassPerVolumePerLengthUom;
}

export type MassPerVolumePerLengthUomExt = string;
type _MassPerVolumePerLengthUomExt = Primitive._string;

interface _MassPerVolumePerPressureMeasure extends _AbstractMeasure {
  uom: MassPerVolumePerPressureUom;
}
export interface MassPerVolumePerPressureMeasure
  extends _MassPerVolumePerPressureMeasure {
  constructor: { new (): MassPerVolumePerPressureMeasure };
}
export const MassPerVolumePerPressureMeasure: {
  new (): MassPerVolumePerPressureMeasure;
};

interface _MassPerVolumePerPressureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassPerVolumePerPressureMeasureExt
  extends _MassPerVolumePerPressureMeasureExt {
  constructor: { new (): MassPerVolumePerPressureMeasureExt };
}
export const MassPerVolumePerPressureMeasureExt: {
  new (): MassPerVolumePerPressureMeasureExt;
};

export type MassPerVolumePerPressureUom = "kg/m3.kPa" | "lb/ft.psi";
interface _MassPerVolumePerPressureUom extends _UomEnum {
  content: MassPerVolumePerPressureUom;
}

export type MassPerVolumePerPressureUomExt = string;
type _MassPerVolumePerPressureUomExt = Primitive._string;

interface _MassPerVolumePerTemperatureMeasure extends _AbstractMeasure {
  uom: MassPerVolumePerTemperatureUom;
}
export interface MassPerVolumePerTemperatureMeasure
  extends _MassPerVolumePerTemperatureMeasure {
  constructor: { new (): MassPerVolumePerTemperatureMeasure };
}
export const MassPerVolumePerTemperatureMeasure: {
  new (): MassPerVolumePerTemperatureMeasure;
};

interface _MassPerVolumePerTemperatureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MassPerVolumePerTemperatureMeasureExt
  extends _MassPerVolumePerTemperatureMeasureExt {
  constructor: { new (): MassPerVolumePerTemperatureMeasureExt };
}
export const MassPerVolumePerTemperatureMeasureExt: {
  new (): MassPerVolumePerTemperatureMeasureExt;
};

export type MassPerVolumePerTemperatureUom =
  | "kg/m3.degC"
  | "kg/m3.K"
  | "lb/ft.degF";
interface _MassPerVolumePerTemperatureUom extends _UomEnum {
  content: MassPerVolumePerTemperatureUom;
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
  | "t/m3"
  | "ug/cm3";
interface _MassPerVolumeUom extends _UomEnum {
  content: MassPerVolumeUom;
}

export type MassPerVolumeUomExt = string;
type _MassPerVolumeUomExt = Primitive._string;

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
  content: MassUom;
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
  content: MatrixCementKind;
}

interface _MdInterval extends BaseType {
  datum: string;
  MdBase: LengthMeasure;
  MdTop: LengthMeasure;
}
export interface MdInterval extends _MdInterval {
  constructor: { new (): MdInterval };
}
export const MdInterval: { new (): MdInterval };

/** Measure class values. The list of standard values is contained in the WITSML enumValues.xml file. */
export type MeasureClass =
  | "absorbed dose"
  | "activity of radioactivity"
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
  content: MeasureClass;
}

interface _MobilityMeasure extends _AbstractMeasure {
  uom: MobilityUom;
}
export interface MobilityMeasure extends _MobilityMeasure {
  constructor: { new (): MobilityMeasure };
}
export const MobilityMeasure: { new (): MobilityMeasure };

interface _MobilityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MobilityMeasureExt extends _MobilityMeasureExt {
  constructor: { new (): MobilityMeasureExt };
}
export const MobilityMeasureExt: { new (): MobilityMeasureExt };

export type MobilityUom =
  | "D/(Pa.s)"
  | "D/cP"
  | "mD.ft2/(lbf.s)"
  | "mD.in2/(lbf.s)"
  | "mD/(Pa.s)"
  | "mD/cP"
  | "TD[API]/(Pa.s)";
interface _MobilityUom extends _UomEnum {
  content: MobilityUom;
}

export type MobilityUomExt = string;
type _MobilityUomExt = Primitive._string;

interface _MolarEnergyMeasure extends _AbstractMeasure {
  uom: MolarEnergyUom;
}
export interface MolarEnergyMeasure extends _MolarEnergyMeasure {
  constructor: { new (): MolarEnergyMeasure };
}
export const MolarEnergyMeasure: { new (): MolarEnergyMeasure };

interface _MolarEnergyMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MolarEnergyMeasureExt extends _MolarEnergyMeasureExt {
  constructor: { new (): MolarEnergyMeasureExt };
}
export const MolarEnergyMeasureExt: { new (): MolarEnergyMeasureExt };

export type MolarEnergyUom =
  | "Btu[IT]/lbmol"
  | "J/mol"
  | "kcal[th]/mol"
  | "kJ/kmol"
  | "MJ/kmol";
interface _MolarEnergyUom extends _UomEnum {
  content: MolarEnergyUom;
}

export type MolarEnergyUomExt = string;
type _MolarEnergyUomExt = Primitive._string;

interface _MolarHeatCapacityMeasure extends _AbstractMeasure {
  uom: MolarHeatCapacityUom;
}
export interface MolarHeatCapacityMeasure extends _MolarHeatCapacityMeasure {
  constructor: { new (): MolarHeatCapacityMeasure };
}
export const MolarHeatCapacityMeasure: { new (): MolarHeatCapacityMeasure };

interface _MolarHeatCapacityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MolarHeatCapacityMeasureExt
  extends _MolarHeatCapacityMeasureExt {
  constructor: { new (): MolarHeatCapacityMeasureExt };
}
export const MolarHeatCapacityMeasureExt: {
  new (): MolarHeatCapacityMeasureExt;
};

export type MolarHeatCapacityUom =
  | "Btu[IT]/(lbmol.deltaF)"
  | "cal[th]/(mol.deltaC)"
  | "J/(mol.deltaK)"
  | "kJ/(kmol.deltaK)";
interface _MolarHeatCapacityUom extends _UomEnum {
  content: MolarHeatCapacityUom;
}

export type MolarHeatCapacityUomExt = string;
type _MolarHeatCapacityUomExt = Primitive._string;

interface _MolarVolumeMeasure extends _AbstractMeasure {
  uom: MolarVolumeUom;
}
export interface MolarVolumeMeasure extends _MolarVolumeMeasure {
  constructor: { new (): MolarVolumeMeasure };
}
export const MolarVolumeMeasure: { new (): MolarVolumeMeasure };

interface _MolarVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MolarVolumeMeasureExt extends _MolarVolumeMeasureExt {
  constructor: { new (): MolarVolumeMeasureExt };
}
export const MolarVolumeMeasureExt: { new (): MolarVolumeMeasureExt };

export type MolarVolumeUom =
  | "dm3/kmol"
  | "ft3/lbmol"
  | "L/kmol"
  | "L/mol"
  | "m3/kmol"
  | "m3/mol";
interface _MolarVolumeUom extends _UomEnum {
  content: MolarVolumeUom;
}

export type MolarVolumeUomExt = string;
type _MolarVolumeUomExt = Primitive._string;

interface _MolecularWeightMeasure extends _AbstractMeasure {
  uom: MolecularWeightUom;
}
export interface MolecularWeightMeasure extends _MolecularWeightMeasure {
  constructor: { new (): MolecularWeightMeasure };
}
export const MolecularWeightMeasure: { new (): MolecularWeightMeasure };

interface _MolecularWeightMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MolecularWeightMeasureExt extends _MolecularWeightMeasureExt {
  constructor: { new (): MolecularWeightMeasureExt };
}
export const MolecularWeightMeasureExt: { new (): MolecularWeightMeasureExt };

export type MolecularWeightUom = "g/mol" | "kg/mol" | "lbm/lbmol";
interface _MolecularWeightUom extends _UomEnum {
  content: MolecularWeightUom;
}

export type MolecularWeightUomExt = string;
type _MolecularWeightUomExt = Primitive._string;

interface _MomentOfForceMeasure extends _AbstractMeasure {
  uom: MomentOfForceUom;
}
export interface MomentOfForceMeasure extends _MomentOfForceMeasure {
  constructor: { new (): MomentOfForceMeasure };
}
export const MomentOfForceMeasure: { new (): MomentOfForceMeasure };

interface _MomentOfForceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MomentOfForceMeasureExt extends _MomentOfForceMeasureExt {
  constructor: { new (): MomentOfForceMeasureExt };
}
export const MomentOfForceMeasureExt: { new (): MomentOfForceMeasureExt };

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
  content: MomentOfForceUom;
}

export type MomentOfForceUomExt = string;
type _MomentOfForceUomExt = Primitive._string;

interface _MomentOfInertiaMeasure extends _AbstractMeasure {
  uom: MomentOfInertiaUom;
}
export interface MomentOfInertiaMeasure extends _MomentOfInertiaMeasure {
  constructor: { new (): MomentOfInertiaMeasure };
}
export const MomentOfInertiaMeasure: { new (): MomentOfInertiaMeasure };

interface _MomentOfInertiaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MomentOfInertiaMeasureExt extends _MomentOfInertiaMeasureExt {
  constructor: { new (): MomentOfInertiaMeasureExt };
}
export const MomentOfInertiaMeasureExt: { new (): MomentOfInertiaMeasureExt };

export type MomentOfInertiaUom = "kg.m2" | "lbm.ft2";
interface _MomentOfInertiaUom extends _UomEnum {
  content: MomentOfInertiaUom;
}

export type MomentOfInertiaUomExt = string;
type _MomentOfInertiaUomExt = Primitive._string;

interface _MomentumMeasure extends _AbstractMeasure {
  uom: MomentumUom;
}
export interface MomentumMeasure extends _MomentumMeasure {
  constructor: { new (): MomentumMeasure };
}
export const MomentumMeasure: { new (): MomentumMeasure };

interface _MomentumMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface MomentumMeasureExt extends _MomentumMeasureExt {
  constructor: { new (): MomentumMeasureExt };
}
export const MomentumMeasureExt: { new (): MomentumMeasureExt };

export type MomentumUom = "kg.m/s" | "lbm.ft/s";
interface _MomentumUom extends _UomEnum {
  content: MomentumUom;
}

export type MomentumUomExt = string;
type _MomentumUomExt = Primitive._string;

export type NonNegativeLong = number;
type _NonNegativeLong = Primitive._number;

interface _NormalizedPowerMeasure extends _AbstractMeasure {
  uom: NormalizedPowerUom;
}
export interface NormalizedPowerMeasure extends _NormalizedPowerMeasure {
  constructor: { new (): NormalizedPowerMeasure };
}
export const NormalizedPowerMeasure: { new (): NormalizedPowerMeasure };

interface _NormalizedPowerMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface NormalizedPowerMeasureExt extends _NormalizedPowerMeasureExt {
  constructor: { new (): NormalizedPowerMeasureExt };
}
export const NormalizedPowerMeasureExt: { new (): NormalizedPowerMeasureExt };

export type NormalizedPowerUom = "B.W" | "dB.mW" | "dB.MW" | "dB.W";
interface _NormalizedPowerUom extends _UomEnum {
  content: NormalizedPowerUom;
}

export type NormalizedPowerUomExt = string;
type _NormalizedPowerUomExt = Primitive._string;

/** Use this to create multiple aliases for any object instance. Note that an Authority is required for each alias. */
interface _ObjectAlias extends BaseType {
  authority: string;
  Description?: string;
  Identifier: string;
}
export interface ObjectAlias extends _ObjectAlias {
  constructor: { new (): ObjectAlias };
}
export const ObjectAlias: { new (): ObjectAlias };

interface _ObjectParameterKey extends _AbstractParameterKey {
  DataObject: DataObjectReference;
}
export interface ObjectParameterKey extends _ObjectParameterKey {
  constructor: { new (): ObjectParameterKey };
}
export const ObjectParameterKey: { new (): ObjectParameterKey };

export type ParameterKind =
  | "dataObject"
  | "double"
  | "integer"
  | "string"
  | "timestamp"
  | "subActivity";
interface _ParameterKind extends Primitive._string {
  content: ParameterKind;
}

/** Description of one parameter that participate in one type of activity. */
interface _ParameterTemplate extends BaseType {
  /** If no allowed type is given, then all kind of datatypes is allowed. */
  AllowedKind?: ParameterKind[];
  /** Textual description of additional constraint associated with the parameter. (note that it will be better to have a formal description of the constraint) */
  Constraint?: string;
  /** When parameter is limited to data object of given types, describe the allowed types. Used only when ParameterType is dataObject */
  DataObjectContentType?: string;
  DefaultValue?: AbstractActivityParameter[];
  /** Indicates if the parameter is an input of the activity.
   * If the parameter is a data object and is also an output of the activity, it is strongly advised to use two parameters : one for input and one for output. The reason is to be able to give two different versions strings for the input and output dataobject which has got obviously the same UUID. */
  IsInput: boolean;
  /** Indicates if the parameter is an output of the activity.
   * If the parameter is a data object and is also an input of the activity, it is strongly advised to use two parameters : one for input and one for output. The reason is to be able to give two different versions strings for the input and output dataobject which has got obviously the same UUID. */
  IsOutput: boolean;
  /** Allows to indicate that, in the same activity, this parameter template must be associated to another parameter template identified by its title. */
  KeyConstraint?: string[];
  /** @integer Maximum number of parameters of this type allowed in the activity.
   * If the maximum number of parameters is infinite, use -1 value. */
  MaxOccurs: number;
  /** @integer Minimum number of parameter of this type required by the activity.
   * If the minimum number of parameters is infinite, use -1 value. */
  MinOccurs: number;
  /** Name of the parameter in the activity. Key to identify parameter. */
  Title: string;
}
export interface ParameterTemplate extends _ParameterTemplate {
  constructor: { new (): ParameterTemplate };
}
export const ParameterTemplate: { new (): ParameterTemplate };

interface _PermeabilityLengthMeasure extends _AbstractMeasure {
  uom: PermeabilityLengthUom;
}
export interface PermeabilityLengthMeasure extends _PermeabilityLengthMeasure {
  constructor: { new (): PermeabilityLengthMeasure };
}
export const PermeabilityLengthMeasure: { new (): PermeabilityLengthMeasure };

interface _PermeabilityLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PermeabilityLengthMeasureExt
  extends _PermeabilityLengthMeasureExt {
  constructor: { new (): PermeabilityLengthMeasureExt };
}
export const PermeabilityLengthMeasureExt: {
  new (): PermeabilityLengthMeasureExt;
};

export type PermeabilityLengthUom =
  | "D.ft"
  | "D.m"
  | "mD.ft"
  | "mD.m"
  | "TD[API].m";
interface _PermeabilityLengthUom extends _UomEnum {
  content: PermeabilityLengthUom;
}

export type PermeabilityLengthUomExt = string;
type _PermeabilityLengthUomExt = Primitive._string;

interface _PermeabilityRockMeasure extends _AbstractMeasure {
  uom: PermeabilityRockUom;
}
export interface PermeabilityRockMeasure extends _PermeabilityRockMeasure {
  constructor: { new (): PermeabilityRockMeasure };
}
export const PermeabilityRockMeasure: { new (): PermeabilityRockMeasure };

interface _PermeabilityRockMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PermeabilityRockMeasureExt
  extends _PermeabilityRockMeasureExt {
  constructor: { new (): PermeabilityRockMeasureExt };
}
export const PermeabilityRockMeasureExt: { new (): PermeabilityRockMeasureExt };

export type PermeabilityRockUom = "D" | "D[API]" | "mD" | "TD[API]";
interface _PermeabilityRockUom extends _UomEnum {
  content: PermeabilityRockUom;
}

export type PermeabilityRockUomExt = string;
type _PermeabilityRockUomExt = Primitive._string;

interface _PermittivityMeasure extends _AbstractMeasure {
  uom: PermittivityUom;
}
export interface PermittivityMeasure extends _PermittivityMeasure {
  constructor: { new (): PermittivityMeasure };
}
export const PermittivityMeasure: { new (): PermittivityMeasure };

interface _PermittivityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PermittivityMeasureExt extends _PermittivityMeasureExt {
  constructor: { new (): PermittivityMeasureExt };
}
export const PermittivityMeasureExt: { new (): PermittivityMeasureExt };

export type PermittivityUom = "F/m" | "uF/m";
interface _PermittivityUom extends _UomEnum {
  content: PermittivityUom;
}

export type PermittivityUomExt = string;
type _PermittivityUomExt = Primitive._string;

interface _PlaneAngleMeasure extends _AbstractMeasure {
  uom: PlaneAngleUom;
}
export interface PlaneAngleMeasure extends _PlaneAngleMeasure {
  constructor: { new (): PlaneAngleMeasure };
}
export const PlaneAngleMeasure: { new (): PlaneAngleMeasure };

interface _PlaneAngleMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PlaneAngleMeasureExt extends _PlaneAngleMeasureExt {
  constructor: { new (): PlaneAngleMeasureExt };
}
export const PlaneAngleMeasureExt: { new (): PlaneAngleMeasureExt };

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
  content: PlaneAngleUom;
}

export type PlaneAngleUomExt = string;
type _PlaneAngleUomExt = Primitive._string;

export type PositiveLong = number;
type _PositiveLong = Primitive._number;

interface _PotentialDifferencePerPowerDropMeasure extends _AbstractMeasure {
  uom: PotentialDifferencePerPowerDropUom;
}
export interface PotentialDifferencePerPowerDropMeasure
  extends _PotentialDifferencePerPowerDropMeasure {
  constructor: { new (): PotentialDifferencePerPowerDropMeasure };
}
export const PotentialDifferencePerPowerDropMeasure: {
  new (): PotentialDifferencePerPowerDropMeasure;
};

interface _PotentialDifferencePerPowerDropMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PotentialDifferencePerPowerDropMeasureExt
  extends _PotentialDifferencePerPowerDropMeasureExt {
  constructor: { new (): PotentialDifferencePerPowerDropMeasureExt };
}
export const PotentialDifferencePerPowerDropMeasureExt: {
  new (): PotentialDifferencePerPowerDropMeasureExt;
};

export type PotentialDifferencePerPowerDropUom = "V/B" | "V/dB";
interface _PotentialDifferencePerPowerDropUom extends _UomEnum {
  content: PotentialDifferencePerPowerDropUom;
}

export type PotentialDifferencePerPowerDropUomExt = string;
type _PotentialDifferencePerPowerDropUomExt = Primitive._string;

interface _PowerMeasure extends _AbstractMeasure {
  uom: PowerUom;
}
export interface PowerMeasure extends _PowerMeasure {
  constructor: { new (): PowerMeasure };
}
export const PowerMeasure: { new (): PowerMeasure };

interface _PowerMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PowerMeasureExt extends _PowerMeasureExt {
  constructor: { new (): PowerMeasureExt };
}
export const PowerMeasureExt: { new (): PowerMeasureExt };

interface _PowerPerAreaMeasure extends _AbstractMeasure {
  uom: PowerPerAreaUom;
}
export interface PowerPerAreaMeasure extends _PowerPerAreaMeasure {
  constructor: { new (): PowerPerAreaMeasure };
}
export const PowerPerAreaMeasure: { new (): PowerPerAreaMeasure };

interface _PowerPerAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PowerPerAreaMeasureExt extends _PowerPerAreaMeasureExt {
  constructor: { new (): PowerPerAreaMeasureExt };
}
export const PowerPerAreaMeasureExt: { new (): PowerPerAreaMeasureExt };

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
  content: PowerPerAreaUom;
}

export type PowerPerAreaUomExt = string;
type _PowerPerAreaUomExt = Primitive._string;

interface _PowerPerPowerMeasure extends _AbstractMeasure {
  uom: PowerPerPowerUom;
}
export interface PowerPerPowerMeasure extends _PowerPerPowerMeasure {
  constructor: { new (): PowerPerPowerMeasure };
}
export const PowerPerPowerMeasure: { new (): PowerPerPowerMeasure };

interface _PowerPerPowerMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PowerPerPowerMeasureExt extends _PowerPerPowerMeasureExt {
  constructor: { new (): PowerPerPowerMeasureExt };
}
export const PowerPerPowerMeasureExt: { new (): PowerPerPowerMeasureExt };

export type PowerPerPowerUom = "%" | "Btu[IT]/(hp.h)" | "Euc" | "W/kW" | "W/W";
interface _PowerPerPowerUom extends _UomEnum {
  content: PowerPerPowerUom;
}

export type PowerPerPowerUomExt = string;
type _PowerPerPowerUomExt = Primitive._string;

interface _PowerPerVolumeMeasure extends _AbstractMeasure {
  uom: PowerPerVolumeUom;
}
export interface PowerPerVolumeMeasure extends _PowerPerVolumeMeasure {
  constructor: { new (): PowerPerVolumeMeasure };
}
export const PowerPerVolumeMeasure: { new (): PowerPerVolumeMeasure };

interface _PowerPerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PowerPerVolumeMeasureExt extends _PowerPerVolumeMeasureExt {
  constructor: { new (): PowerPerVolumeMeasureExt };
}
export const PowerPerVolumeMeasureExt: { new (): PowerPerVolumeMeasureExt };

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
  content: PowerPerVolumeUom;
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
  content: PowerUom;
}

export type PowerUomExt = string;
type _PowerUomExt = Primitive._string;

interface _PressureMeasure extends _AbstractMeasure {
  uom: PressureUom;
}
export interface PressureMeasure extends _PressureMeasure {
  constructor: { new (): PressureMeasure };
}
export const PressureMeasure: { new (): PressureMeasure };

interface _PressureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PressureMeasureExt extends _PressureMeasureExt {
  constructor: { new (): PressureMeasureExt };
}
export const PressureMeasureExt: { new (): PressureMeasureExt };

interface _PressurePerPressureMeasure extends _AbstractMeasure {
  uom: PressurePerPressureUom;
}
export interface PressurePerPressureMeasure
  extends _PressurePerPressureMeasure {
  constructor: { new (): PressurePerPressureMeasure };
}
export const PressurePerPressureMeasure: { new (): PressurePerPressureMeasure };

interface _PressurePerPressureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PressurePerPressureMeasureExt
  extends _PressurePerPressureMeasureExt {
  constructor: { new (): PressurePerPressureMeasureExt };
}
export const PressurePerPressureMeasureExt: {
  new (): PressurePerPressureMeasureExt;
};

export type PressurePerPressureUom =
  | "atm/atm"
  | "bar/bar"
  | "Euc"
  | "kPa/kPa"
  | "MPa/MPa"
  | "Pa/Pa"
  | "psi/psi";
interface _PressurePerPressureUom extends _UomEnum {
  content: PressurePerPressureUom;
}

export type PressurePerPressureUomExt = string;
type _PressurePerPressureUomExt = Primitive._string;

interface _PressurePerTimeMeasure extends _AbstractMeasure {
  uom: PressurePerTimeUom;
}
export interface PressurePerTimeMeasure extends _PressurePerTimeMeasure {
  constructor: { new (): PressurePerTimeMeasure };
}
export const PressurePerTimeMeasure: { new (): PressurePerTimeMeasure };

interface _PressurePerTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PressurePerTimeMeasureExt extends _PressurePerTimeMeasureExt {
  constructor: { new (): PressurePerTimeMeasureExt };
}
export const PressurePerTimeMeasureExt: { new (): PressurePerTimeMeasureExt };

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
  content: PressurePerTimeUom;
}

export type PressurePerTimeUomExt = string;
type _PressurePerTimeUomExt = Primitive._string;

interface _PressurePerVolumeMeasure extends _AbstractMeasure {
  uom: PressurePerVolumeUom;
}
export interface PressurePerVolumeMeasure extends _PressurePerVolumeMeasure {
  constructor: { new (): PressurePerVolumeMeasure };
}
export const PressurePerVolumeMeasure: { new (): PressurePerVolumeMeasure };

interface _PressurePerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PressurePerVolumeMeasureExt
  extends _PressurePerVolumeMeasureExt {
  constructor: { new (): PressurePerVolumeMeasureExt };
}
export const PressurePerVolumeMeasureExt: {
  new (): PressurePerVolumeMeasureExt;
};

export type PressurePerVolumeUom = "Pa/m3" | "psi2.d/(cP.ft3)";
interface _PressurePerVolumeUom extends _UomEnum {
  content: PressurePerVolumeUom;
}

export type PressurePerVolumeUomExt = string;
type _PressurePerVolumeUomExt = Primitive._string;

interface _PressureSquaredMeasure extends _AbstractMeasure {
  uom: PressureSquaredUom;
}
export interface PressureSquaredMeasure extends _PressureSquaredMeasure {
  constructor: { new (): PressureSquaredMeasure };
}
export const PressureSquaredMeasure: { new (): PressureSquaredMeasure };

interface _PressureSquaredMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PressureSquaredMeasureExt extends _PressureSquaredMeasureExt {
  constructor: { new (): PressureSquaredMeasureExt };
}
export const PressureSquaredMeasureExt: { new (): PressureSquaredMeasureExt };

interface _PressureSquaredPerForceTimePerAreaMeasure extends _AbstractMeasure {
  uom: PressureSquaredPerForceTimePerAreaUom;
}
export interface PressureSquaredPerForceTimePerAreaMeasure
  extends _PressureSquaredPerForceTimePerAreaMeasure {
  constructor: { new (): PressureSquaredPerForceTimePerAreaMeasure };
}
export const PressureSquaredPerForceTimePerAreaMeasure: {
  new (): PressureSquaredPerForceTimePerAreaMeasure;
};

interface _PressureSquaredPerForceTimePerAreaMeasureExt
  extends _AbstractMeasure {
  uom: string;
}
export interface PressureSquaredPerForceTimePerAreaMeasureExt
  extends _PressureSquaredPerForceTimePerAreaMeasureExt {
  constructor: { new (): PressureSquaredPerForceTimePerAreaMeasureExt };
}
export const PressureSquaredPerForceTimePerAreaMeasureExt: {
  new (): PressureSquaredPerForceTimePerAreaMeasureExt;
};

export type PressureSquaredPerForceTimePerAreaUom =
  | "0.001 kPa2/cP"
  | "bar2/cP"
  | "kPa2/cP"
  | "Pa2/(Pa.s)"
  | "psi2/cP";
interface _PressureSquaredPerForceTimePerAreaUom extends _UomEnum {
  content: PressureSquaredPerForceTimePerAreaUom;
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
  content: PressureSquaredUom;
}

export type PressureSquaredUomExt = string;
type _PressureSquaredUomExt = Primitive._string;

interface _PressureTimePerVolumeMeasure extends _AbstractMeasure {
  uom: PressureTimePerVolumeUom;
}
export interface PressureTimePerVolumeMeasure
  extends _PressureTimePerVolumeMeasure {
  constructor: { new (): PressureTimePerVolumeMeasure };
}
export const PressureTimePerVolumeMeasure: {
  new (): PressureTimePerVolumeMeasure;
};

interface _PressureTimePerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface PressureTimePerVolumeMeasureExt
  extends _PressureTimePerVolumeMeasureExt {
  constructor: { new (): PressureTimePerVolumeMeasureExt };
}
export const PressureTimePerVolumeMeasureExt: {
  new (): PressureTimePerVolumeMeasureExt;
};

export type PressureTimePerVolumeUom = "Pa.s/m3" | "psi.d/bbl";
interface _PressureTimePerVolumeUom extends _UomEnum {
  content: PressureTimePerVolumeUom;
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
  content: PressureUom;
}

export type PressureUomExt = string;
type _PressureUomExt = Primitive._string;

interface _PressureValue extends BaseType {
  AbstractPressureValue: AbstractPressureValue;
}
export interface PressureValue extends _PressureValue {
  constructor: { new (): PressureValue };
}
export const PressureValue: { new (): PressureValue };

/** This is the Energistics encapsulation of the ProjectedCrs type from GML. */
interface _ProjectedCrs extends _AbstractObject {
  uom?: string;
  AbstractProjectedCrs: AbstractProjectedCrs;
  AxisOrder: AxisOrder2d;
}
export interface ProjectedCrs extends _ProjectedCrs {
  constructor: { new (): ProjectedCrs };
}
export const ProjectedCrs: { new (): ProjectedCrs };

/** This class contains the EPSG code for a projected CRS. */
interface _ProjectedEpsgCrs extends _AbstractProjectedCrs {
  /** @integer */
  EpsgCode: number;
}
export interface ProjectedEpsgCrs extends _ProjectedEpsgCrs {
  constructor: { new (): ProjectedEpsgCrs };
}
export const ProjectedEpsgCrs: { new (): ProjectedEpsgCrs };

/** This is the Energistics encapsulation of the ProjectedCrs type from GML. */
interface _ProjectedGmlCrs extends _AbstractProjectedCrs {
  GmlProjectedCrsDefinition: Record<string, unknown>;
}
export interface ProjectedGmlCrs extends _ProjectedGmlCrs {
  constructor: { new (): ProjectedGmlCrs };
}
export const ProjectedGmlCrs: { new (): ProjectedGmlCrs };

/** This class contains a code for a projected CRS according to a local authority. This would be used in a case where a company or regulatory regime has chosen not to use EPSG codes. */
interface _ProjectedLocalAuthorityCrs extends _AbstractProjectedCrs {
  LocalAuthorityCrsName: AuthorityQualifiedName;
}
export interface ProjectedLocalAuthorityCrs
  extends _ProjectedLocalAuthorityCrs {
  constructor: { new (): ProjectedLocalAuthorityCrs };
}
export const ProjectedLocalAuthorityCrs: { new (): ProjectedLocalAuthorityCrs };

/** This class is used in a case where the coordinate reference system is either unknown or is intentionally not being transferred. In this case, the uom and AxisOrder need to be provided on the ProjectedCrs class. */
interface _ProjectedUnknownCrs extends _AbstractProjectedCrs {
  Unknown: string;
}
export interface ProjectedUnknownCrs extends _ProjectedUnknownCrs {
  constructor: { new (): ProjectedUnknownCrs };
}
export const ProjectedUnknownCrs: { new (): ProjectedUnknownCrs };

/** ISO 19162-compliant well-known text for the projected CRS */
interface _ProjectedWktCrs extends _AbstractProjectedCrs {
  /** ISO 19162 compliant well known text of the CRS */
  WellKnownText: string;
}
export interface ProjectedWktCrs extends _ProjectedWktCrs {
  constructor: { new (): ProjectedWktCrs };
}
export const ProjectedWktCrs: { new (): ProjectedWktCrs };

/** Property kinds carry the semantics of property values. They are used to identify if the values are, for example, representing porosity, length, stress tensor, etc. Energistics provides a list of standard property kind that represent the basis for the commonly used properties in the E&P subsurface workflow. */
interface _PropertyKind extends _AbstractObject {
  /** Date at which this property dictionary entry must no longer be used. Files generated before this date would have used this entry so it is left here for reference.
   *
   * A null value means the property kind is still valid. */
  DeprecationDate?: string;
  /** This boolean indicates whether the PropertyKind should be used as a real property or not.
   *
   * If the Is Abstract flag is set, then this entry should be used only as the parent of a real property. For example, the PropertyKind of "force per length" shouldn't be used directly, as it is really just a description of some units of measure. This entry should only be used as the parent of the real physical property "surface tension". */
  IsAbstract: boolean;
  /** Indicates the parent of this property kind.
   * BUSINESS RULE : Only the top root abstract property kind has not to define a parent property kind. */
  Parent?: DataObjectReference;
  /** A reference to the name of a quantity class in the Energistics Unit of Measure Dictionary.
   * If there is no match in the Energistics Unit of Measure Dictionary, then this attribute is purely for human information. */
  QuantityClass: string;
}
export interface PropertyKind extends _PropertyKind {
  constructor: { new (): PropertyKind };
}
export const PropertyKind: { new (): PropertyKind };

/** This dictionary defines property kind which is intended to handle the requirements of the upstream oil and gas industry. */
interface _PropertyKindDictionary extends _AbstractObject {
  /** Defines which property kind are contained into a property kind dictionary. */
  PropertyKind: PropertyKind[];
}
export interface PropertyKindDictionary extends _PropertyKindDictionary {
  constructor: { new (): PropertyKindDictionary };
}
export const PropertyKindDictionary: { new (): PropertyKindDictionary };

export type QuantityClassKind =
  | "absorbed dose"
  | "activity of radioactivity"
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
  content: QuantityClassKind;
}

export type QuantityClassKindExt = string;
type _QuantityClassKindExt = Primitive._string;

interface _QuantityOfLightMeasure extends _AbstractMeasure {
  uom: QuantityOfLightUom;
}
export interface QuantityOfLightMeasure extends _QuantityOfLightMeasure {
  constructor: { new (): QuantityOfLightMeasure };
}
export const QuantityOfLightMeasure: { new (): QuantityOfLightMeasure };

interface _QuantityOfLightMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface QuantityOfLightMeasureExt extends _QuantityOfLightMeasureExt {
  constructor: { new (): QuantityOfLightMeasureExt };
}
export const QuantityOfLightMeasureExt: { new (): QuantityOfLightMeasureExt };

export type QuantityOfLightUom = "lm.s";
interface _QuantityOfLightUom extends _UomEnum {
  content: QuantityOfLightUom;
}

export type QuantityOfLightUomExt = string;
type _QuantityOfLightUomExt = Primitive._string;

interface _RadianceMeasure extends _AbstractMeasure {
  uom: RadianceUom;
}
export interface RadianceMeasure extends _RadianceMeasure {
  constructor: { new (): RadianceMeasure };
}
export const RadianceMeasure: { new (): RadianceMeasure };

interface _RadianceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface RadianceMeasureExt extends _RadianceMeasureExt {
  constructor: { new (): RadianceMeasureExt };
}
export const RadianceMeasureExt: { new (): RadianceMeasureExt };

export type RadianceUom = "W/(m2.sr)";
interface _RadianceUom extends _UomEnum {
  content: RadianceUom;
}

export type RadianceUomExt = string;
type _RadianceUomExt = Primitive._string;

interface _RadiantIntensityMeasure extends _AbstractMeasure {
  uom: RadiantIntensityUom;
}
export interface RadiantIntensityMeasure extends _RadiantIntensityMeasure {
  constructor: { new (): RadiantIntensityMeasure };
}
export const RadiantIntensityMeasure: { new (): RadiantIntensityMeasure };

interface _RadiantIntensityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface RadiantIntensityMeasureExt
  extends _RadiantIntensityMeasureExt {
  constructor: { new (): RadiantIntensityMeasureExt };
}
export const RadiantIntensityMeasureExt: { new (): RadiantIntensityMeasureExt };

export type RadiantIntensityUom = "W/sr";
interface _RadiantIntensityUom extends _UomEnum {
  content: RadiantIntensityUom;
}

export type RadiantIntensityUomExt = string;
type _RadiantIntensityUomExt = Primitive._string;

interface _ReciprocalAreaMeasure extends _AbstractMeasure {
  uom: ReciprocalAreaUom;
}
export interface ReciprocalAreaMeasure extends _ReciprocalAreaMeasure {
  constructor: { new (): ReciprocalAreaMeasure };
}
export const ReciprocalAreaMeasure: { new (): ReciprocalAreaMeasure };

interface _ReciprocalAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ReciprocalAreaMeasureExt extends _ReciprocalAreaMeasureExt {
  constructor: { new (): ReciprocalAreaMeasureExt };
}
export const ReciprocalAreaMeasureExt: { new (): ReciprocalAreaMeasureExt };

export type ReciprocalAreaUom = "1/ft2" | "1/km2" | "1/m2" | "1/mi2";
interface _ReciprocalAreaUom extends _UomEnum {
  content: ReciprocalAreaUom;
}

export type ReciprocalAreaUomExt = string;
type _ReciprocalAreaUomExt = Primitive._string;

interface _ReciprocalElectricPotentialDifferenceMeasure
  extends _AbstractMeasure {
  uom: ReciprocalElectricPotentialDifferenceUom;
}
export interface ReciprocalElectricPotentialDifferenceMeasure
  extends _ReciprocalElectricPotentialDifferenceMeasure {
  constructor: { new (): ReciprocalElectricPotentialDifferenceMeasure };
}
export const ReciprocalElectricPotentialDifferenceMeasure: {
  new (): ReciprocalElectricPotentialDifferenceMeasure;
};

interface _ReciprocalElectricPotentialDifferenceMeasureExt
  extends _AbstractMeasure {
  uom: string;
}
export interface ReciprocalElectricPotentialDifferenceMeasureExt
  extends _ReciprocalElectricPotentialDifferenceMeasureExt {
  constructor: { new (): ReciprocalElectricPotentialDifferenceMeasureExt };
}
export const ReciprocalElectricPotentialDifferenceMeasureExt: {
  new (): ReciprocalElectricPotentialDifferenceMeasureExt;
};

export type ReciprocalElectricPotentialDifferenceUom = "1/uV" | "1/V";
interface _ReciprocalElectricPotentialDifferenceUom extends _UomEnum {
  content: ReciprocalElectricPotentialDifferenceUom;
}

export type ReciprocalElectricPotentialDifferenceUomExt = string;
type _ReciprocalElectricPotentialDifferenceUomExt = Primitive._string;

interface _ReciprocalForceMeasure extends _AbstractMeasure {
  uom: ReciprocalForceUom;
}
export interface ReciprocalForceMeasure extends _ReciprocalForceMeasure {
  constructor: { new (): ReciprocalForceMeasure };
}
export const ReciprocalForceMeasure: { new (): ReciprocalForceMeasure };

interface _ReciprocalForceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ReciprocalForceMeasureExt extends _ReciprocalForceMeasureExt {
  constructor: { new (): ReciprocalForceMeasureExt };
}
export const ReciprocalForceMeasureExt: { new (): ReciprocalForceMeasureExt };

export type ReciprocalForceUom = "1/lbf" | "1/N";
interface _ReciprocalForceUom extends _UomEnum {
  content: ReciprocalForceUom;
}

export type ReciprocalForceUomExt = string;
type _ReciprocalForceUomExt = Primitive._string;

interface _ReciprocalLengthMeasure extends _AbstractMeasure {
  uom: ReciprocalLengthUom;
}
export interface ReciprocalLengthMeasure extends _ReciprocalLengthMeasure {
  constructor: { new (): ReciprocalLengthMeasure };
}
export const ReciprocalLengthMeasure: { new (): ReciprocalLengthMeasure };

interface _ReciprocalLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ReciprocalLengthMeasureExt
  extends _ReciprocalLengthMeasureExt {
  constructor: { new (): ReciprocalLengthMeasureExt };
}
export const ReciprocalLengthMeasureExt: { new (): ReciprocalLengthMeasureExt };

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
  content: ReciprocalLengthUom;
}

export type ReciprocalLengthUomExt = string;
type _ReciprocalLengthUomExt = Primitive._string;

interface _ReciprocalMassMeasure extends _AbstractMeasure {
  uom: ReciprocalMassUom;
}
export interface ReciprocalMassMeasure extends _ReciprocalMassMeasure {
  constructor: { new (): ReciprocalMassMeasure };
}
export const ReciprocalMassMeasure: { new (): ReciprocalMassMeasure };

interface _ReciprocalMassMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ReciprocalMassMeasureExt extends _ReciprocalMassMeasureExt {
  constructor: { new (): ReciprocalMassMeasureExt };
}
export const ReciprocalMassMeasureExt: { new (): ReciprocalMassMeasureExt };

interface _ReciprocalMassTimeMeasure extends _AbstractMeasure {
  uom: ReciprocalMassTimeUom;
}
export interface ReciprocalMassTimeMeasure extends _ReciprocalMassTimeMeasure {
  constructor: { new (): ReciprocalMassTimeMeasure };
}
export const ReciprocalMassTimeMeasure: { new (): ReciprocalMassTimeMeasure };

interface _ReciprocalMassTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ReciprocalMassTimeMeasureExt
  extends _ReciprocalMassTimeMeasureExt {
  constructor: { new (): ReciprocalMassTimeMeasureExt };
}
export const ReciprocalMassTimeMeasureExt: {
  new (): ReciprocalMassTimeMeasureExt;
};

export type ReciprocalMassTimeUom = "1/(kg.s)" | "Bq/kg" | "pCi/g";
interface _ReciprocalMassTimeUom extends _UomEnum {
  content: ReciprocalMassTimeUom;
}

export type ReciprocalMassTimeUomExt = string;
type _ReciprocalMassTimeUomExt = Primitive._string;

export type ReciprocalMassUom = "1/g" | "1/kg" | "1/lbm";
interface _ReciprocalMassUom extends _UomEnum {
  content: ReciprocalMassUom;
}

export type ReciprocalMassUomExt = string;
type _ReciprocalMassUomExt = Primitive._string;

interface _ReciprocalPressureMeasure extends _AbstractMeasure {
  uom: ReciprocalPressureUom;
}
export interface ReciprocalPressureMeasure extends _ReciprocalPressureMeasure {
  constructor: { new (): ReciprocalPressureMeasure };
}
export const ReciprocalPressureMeasure: { new (): ReciprocalPressureMeasure };

interface _ReciprocalPressureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ReciprocalPressureMeasureExt
  extends _ReciprocalPressureMeasureExt {
  constructor: { new (): ReciprocalPressureMeasureExt };
}
export const ReciprocalPressureMeasureExt: {
  new (): ReciprocalPressureMeasureExt;
};

export type ReciprocalPressureUom =
  | "1/bar"
  | "1/kPa"
  | "1/Pa"
  | "1/pPa"
  | "1/psi"
  | "1/upsi";
interface _ReciprocalPressureUom extends _UomEnum {
  content: ReciprocalPressureUom;
}

export type ReciprocalPressureUomExt = string;
type _ReciprocalPressureUomExt = Primitive._string;

interface _ReciprocalTimeMeasure extends _AbstractMeasure {
  uom: ReciprocalTimeUom;
}
export interface ReciprocalTimeMeasure extends _ReciprocalTimeMeasure {
  constructor: { new (): ReciprocalTimeMeasure };
}
export const ReciprocalTimeMeasure: { new (): ReciprocalTimeMeasure };

interface _ReciprocalTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ReciprocalTimeMeasureExt extends _ReciprocalTimeMeasureExt {
  constructor: { new (): ReciprocalTimeMeasureExt };
}
export const ReciprocalTimeMeasureExt: { new (): ReciprocalTimeMeasureExt };

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
  content: ReciprocalTimeUom;
}

export type ReciprocalTimeUomExt = string;
type _ReciprocalTimeUomExt = Primitive._string;

interface _ReciprocalVolumeMeasure extends _AbstractMeasure {
  uom: ReciprocalVolumeUom;
}
export interface ReciprocalVolumeMeasure extends _ReciprocalVolumeMeasure {
  constructor: { new (): ReciprocalVolumeMeasure };
}
export const ReciprocalVolumeMeasure: { new (): ReciprocalVolumeMeasure };

interface _ReciprocalVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ReciprocalVolumeMeasureExt
  extends _ReciprocalVolumeMeasureExt {
  constructor: { new (): ReciprocalVolumeMeasureExt };
}
export const ReciprocalVolumeMeasureExt: { new (): ReciprocalVolumeMeasureExt };

export type ReciprocalVolumeUom =
  | "1/bbl"
  | "1/ft3"
  | "1/gal[UK]"
  | "1/gal[US]"
  | "1/L"
  | "1/m3";
interface _ReciprocalVolumeUom extends _UomEnum {
  content: ReciprocalVolumeUom;
}

export type ReciprocalVolumeUomExt = string;
type _ReciprocalVolumeUomExt = Primitive._string;

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
  content: ReferenceCondition;
}

export type ReferenceConditionExt = string;
type _ReferenceConditionExt = Primitive._string;

interface _ReferencePressure extends _AbstractMeasure {
  referencePressureKind?: ReferencePressureKind;
  uom: PressureUom;
}
export interface ReferencePressure extends _ReferencePressure {
  constructor: { new (): ReferencePressure };
}
export const ReferencePressure: { new (): ReferencePressure };

/** ReferencePressureKind */
export type ReferencePressureKind = "absolute" | "ambient" | "legal";
interface _ReferencePressureKind extends _TypeEnum {
  content: ReferencePressureKind;
}

/** StdTempPress */
interface _ReferenceTemperaturePressure extends _AbstractTemperaturePressure {
  /** Defines the reference temperature and pressure to which the density has been corrected. If neither standardTempPres nor temp,pres are specified then the standard condition is defined by standardTempPres at the procuctVolume root. */
  ReferenceTempPres?: string;
}
export interface ReferenceTemperaturePressure
  extends _ReferenceTemperaturePressure {
  constructor: { new (): ReferenceTemperaturePressure };
}
export const ReferenceTemperaturePressure: {
  new (): ReferenceTemperaturePressure;
};

interface _RelativePressure extends _AbstractPressureValue {
  ReferencePressure: ReferencePressure;
  RelativePressure: PressureMeasure;
}
export interface RelativePressure extends _RelativePressure {
  constructor: { new (): RelativePressure };
}
export const RelativePressure: { new (): RelativePressure };

interface _ReluctanceMeasure extends _AbstractMeasure {
  uom: ReluctanceUom;
}
export interface ReluctanceMeasure extends _ReluctanceMeasure {
  constructor: { new (): ReluctanceMeasure };
}
export const ReluctanceMeasure: { new (): ReluctanceMeasure };

interface _ReluctanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ReluctanceMeasureExt extends _ReluctanceMeasureExt {
  constructor: { new (): ReluctanceMeasureExt };
}
export const ReluctanceMeasureExt: { new (): ReluctanceMeasureExt };

export type ReluctanceUom = "1/H";
interface _ReluctanceUom extends _UomEnum {
  content: ReluctanceUom;
}

export type ReluctanceUomExt = string;
type _ReluctanceUomExt = Primitive._string;

interface _SecondMomentOfAreaMeasure extends _AbstractMeasure {
  uom: SecondMomentOfAreaUom;
}
export interface SecondMomentOfAreaMeasure extends _SecondMomentOfAreaMeasure {
  constructor: { new (): SecondMomentOfAreaMeasure };
}
export const SecondMomentOfAreaMeasure: { new (): SecondMomentOfAreaMeasure };

interface _SecondMomentOfAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface SecondMomentOfAreaMeasureExt
  extends _SecondMomentOfAreaMeasureExt {
  constructor: { new (): SecondMomentOfAreaMeasureExt };
}
export const SecondMomentOfAreaMeasureExt: {
  new (): SecondMomentOfAreaMeasureExt;
};

export type SecondMomentOfAreaUom = "cm4" | "in4" | "m4";
interface _SecondMomentOfAreaUom extends _UomEnum {
  content: SecondMomentOfAreaUom;
}

export type SecondMomentOfAreaUomExt = string;
type _SecondMomentOfAreaUomExt = Primitive._string;

interface _SignalingEventPerTimeMeasure extends _AbstractMeasure {
  uom: SignalingEventPerTimeUom;
}
export interface SignalingEventPerTimeMeasure
  extends _SignalingEventPerTimeMeasure {
  constructor: { new (): SignalingEventPerTimeMeasure };
}
export const SignalingEventPerTimeMeasure: {
  new (): SignalingEventPerTimeMeasure;
};

interface _SignalingEventPerTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface SignalingEventPerTimeMeasureExt
  extends _SignalingEventPerTimeMeasureExt {
  constructor: { new (): SignalingEventPerTimeMeasureExt };
}
export const SignalingEventPerTimeMeasureExt: {
  new (): SignalingEventPerTimeMeasureExt;
};

export type SignalingEventPerTimeUom = "Bd";
interface _SignalingEventPerTimeUom extends _UomEnum {
  content: SignalingEventPerTimeUom;
}

export type SignalingEventPerTimeUomExt = string;
type _SignalingEventPerTimeUomExt = Primitive._string;

interface _SolidAngleMeasure extends _AbstractMeasure {
  uom: SolidAngleUom;
}
export interface SolidAngleMeasure extends _SolidAngleMeasure {
  constructor: { new (): SolidAngleMeasure };
}
export const SolidAngleMeasure: { new (): SolidAngleMeasure };

interface _SolidAngleMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface SolidAngleMeasureExt extends _SolidAngleMeasureExt {
  constructor: { new (): SolidAngleMeasureExt };
}
export const SolidAngleMeasureExt: { new (): SolidAngleMeasureExt };

export type SolidAngleUom = "sr";
interface _SolidAngleUom extends _UomEnum {
  content: SolidAngleUom;
}

export type SolidAngleUomExt = string;
type _SolidAngleUomExt = Primitive._string;

interface _SpecificHeatCapacityMeasure extends _AbstractMeasure {
  uom: SpecificHeatCapacityUom;
}
export interface SpecificHeatCapacityMeasure
  extends _SpecificHeatCapacityMeasure {
  constructor: { new (): SpecificHeatCapacityMeasure };
}
export const SpecificHeatCapacityMeasure: {
  new (): SpecificHeatCapacityMeasure;
};

interface _SpecificHeatCapacityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface SpecificHeatCapacityMeasureExt
  extends _SpecificHeatCapacityMeasureExt {
  constructor: { new (): SpecificHeatCapacityMeasureExt };
}
export const SpecificHeatCapacityMeasureExt: {
  new (): SpecificHeatCapacityMeasureExt;
};

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
  content: SpecificHeatCapacityUom;
}

export type SpecificHeatCapacityUomExt = string;
type _SpecificHeatCapacityUomExt = Primitive._string;

export type String2000 = string;
type _String2000 = _AbstractString;

export type String64 = string;
type _String64 = _AbstractString;

/** Represents an array of Boolean values where all values are identical. This an optimization for which an array of explicit Boolean values is not required. */
interface _StringConstantArray extends _AbstractStringArray {
  /** @integer Size of the array. */
  Count: number;
  /** Value inside all the elements of the array. */
  Value: string;
}
export interface StringConstantArray extends _StringConstantArray {
  constructor: { new (): StringConstantArray };
}
export const StringConstantArray: { new (): StringConstantArray };

/** Used to store explicit string values, i.e., values that are not double, boolean or integers. The datatype of the values will be identified by means of the HDF5 API. */
interface _StringExternalArray extends _AbstractStringArray {
  /** Reference to HDF5 array of integer or double */
  Values: ExternalDataset;
}
export interface StringExternalArray extends _StringExternalArray {
  constructor: { new (): StringExternalArray };
}
export const StringExternalArray: { new (): StringExternalArray };

interface _StringMeasure extends _String64 {
  uom?: UnitOfMeasure;
}
export interface StringMeasure extends _StringMeasure {
  constructor: { new (): StringMeasure };
}
export const StringMeasure: { new (): StringMeasure };

/** Parameter containing a string value. */
interface _StringParameter extends _AbstractActivityParameter {
  /** String value */
  Value: string;
}
export interface StringParameter extends _StringParameter {
  constructor: { new (): StringParameter };
}
export const StringParameter: { new (): StringParameter };

interface _TemperatureIntervalMeasure extends _AbstractMeasure {
  uom: TemperatureIntervalUom;
}
export interface TemperatureIntervalMeasure
  extends _TemperatureIntervalMeasure {
  constructor: { new (): TemperatureIntervalMeasure };
}
export const TemperatureIntervalMeasure: { new (): TemperatureIntervalMeasure };

interface _TemperatureIntervalMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface TemperatureIntervalMeasureExt
  extends _TemperatureIntervalMeasureExt {
  constructor: { new (): TemperatureIntervalMeasureExt };
}
export const TemperatureIntervalMeasureExt: {
  new (): TemperatureIntervalMeasureExt;
};

interface _TemperatureIntervalPerLengthMeasure extends _AbstractMeasure {
  uom: TemperatureIntervalPerLengthUom;
}
export interface TemperatureIntervalPerLengthMeasure
  extends _TemperatureIntervalPerLengthMeasure {
  constructor: { new (): TemperatureIntervalPerLengthMeasure };
}
export const TemperatureIntervalPerLengthMeasure: {
  new (): TemperatureIntervalPerLengthMeasure;
};

interface _TemperatureIntervalPerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface TemperatureIntervalPerLengthMeasureExt
  extends _TemperatureIntervalPerLengthMeasureExt {
  constructor: { new (): TemperatureIntervalPerLengthMeasureExt };
}
export const TemperatureIntervalPerLengthMeasureExt: {
  new (): TemperatureIntervalPerLengthMeasureExt;
};

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
  content: TemperatureIntervalPerLengthUom;
}

export type TemperatureIntervalPerLengthUomExt = string;
type _TemperatureIntervalPerLengthUomExt = Primitive._string;

interface _TemperatureIntervalPerPressureMeasure extends _AbstractMeasure {
  uom: TemperatureIntervalPerPressureUom;
}
export interface TemperatureIntervalPerPressureMeasure
  extends _TemperatureIntervalPerPressureMeasure {
  constructor: { new (): TemperatureIntervalPerPressureMeasure };
}
export const TemperatureIntervalPerPressureMeasure: {
  new (): TemperatureIntervalPerPressureMeasure;
};

interface _TemperatureIntervalPerPressureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface TemperatureIntervalPerPressureMeasureExt
  extends _TemperatureIntervalPerPressureMeasureExt {
  constructor: { new (): TemperatureIntervalPerPressureMeasureExt };
}
export const TemperatureIntervalPerPressureMeasureExt: {
  new (): TemperatureIntervalPerPressureMeasureExt;
};

export type TemperatureIntervalPerPressureUom =
  | "deltaC/kPa"
  | "deltaF/psi"
  | "deltaK/Pa";
interface _TemperatureIntervalPerPressureUom extends _UomEnum {
  content: TemperatureIntervalPerPressureUom;
}

export type TemperatureIntervalPerPressureUomExt = string;
type _TemperatureIntervalPerPressureUomExt = Primitive._string;

interface _TemperatureIntervalPerTimeMeasure extends _AbstractMeasure {
  uom: TemperatureIntervalPerTimeUom;
}
export interface TemperatureIntervalPerTimeMeasure
  extends _TemperatureIntervalPerTimeMeasure {
  constructor: { new (): TemperatureIntervalPerTimeMeasure };
}
export const TemperatureIntervalPerTimeMeasure: {
  new (): TemperatureIntervalPerTimeMeasure;
};

interface _TemperatureIntervalPerTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface TemperatureIntervalPerTimeMeasureExt
  extends _TemperatureIntervalPerTimeMeasureExt {
  constructor: { new (): TemperatureIntervalPerTimeMeasureExt };
}
export const TemperatureIntervalPerTimeMeasureExt: {
  new (): TemperatureIntervalPerTimeMeasureExt;
};

export type TemperatureIntervalPerTimeUom =
  | "deltaC/h"
  | "deltaC/min"
  | "deltaC/s"
  | "deltaF/h"
  | "deltaF/min"
  | "deltaF/s"
  | "deltaK/s";
interface _TemperatureIntervalPerTimeUom extends _UomEnum {
  content: TemperatureIntervalPerTimeUom;
}

export type TemperatureIntervalPerTimeUomExt = string;
type _TemperatureIntervalPerTimeUomExt = Primitive._string;

export type TemperatureIntervalUom = "deltaC" | "deltaF" | "deltaK" | "deltaR";
interface _TemperatureIntervalUom extends _UomEnum {
  content: TemperatureIntervalUom;
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
export interface TemperaturePressure extends _TemperaturePressure {
  constructor: { new (): TemperaturePressure };
}
export const TemperaturePressure: { new (): TemperaturePressure };

interface _ThermalConductanceMeasure extends _AbstractMeasure {
  uom: ThermalConductanceUom;
}
export interface ThermalConductanceMeasure extends _ThermalConductanceMeasure {
  constructor: { new (): ThermalConductanceMeasure };
}
export const ThermalConductanceMeasure: { new (): ThermalConductanceMeasure };

interface _ThermalConductanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ThermalConductanceMeasureExt
  extends _ThermalConductanceMeasureExt {
  constructor: { new (): ThermalConductanceMeasureExt };
}
export const ThermalConductanceMeasureExt: {
  new (): ThermalConductanceMeasureExt;
};

export type ThermalConductanceUom = "W/deltaK";
interface _ThermalConductanceUom extends _UomEnum {
  content: ThermalConductanceUom;
}

export type ThermalConductanceUomExt = string;
type _ThermalConductanceUomExt = Primitive._string;

interface _ThermalConductivityMeasure extends _AbstractMeasure {
  uom: ThermalConductivityUom;
}
export interface ThermalConductivityMeasure
  extends _ThermalConductivityMeasure {
  constructor: { new (): ThermalConductivityMeasure };
}
export const ThermalConductivityMeasure: { new (): ThermalConductivityMeasure };

interface _ThermalConductivityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ThermalConductivityMeasureExt
  extends _ThermalConductivityMeasureExt {
  constructor: { new (): ThermalConductivityMeasureExt };
}
export const ThermalConductivityMeasureExt: {
  new (): ThermalConductivityMeasureExt;
};

export type ThermalConductivityUom =
  | "Btu[IT]/(h.ft.deltaF)"
  | "cal[th]/(h.cm.deltaC)"
  | "cal[th]/(s.cm.deltaC)"
  | "kcal[th]/(h.m.deltaC)"
  | "W/(m.deltaK)";
interface _ThermalConductivityUom extends _UomEnum {
  content: ThermalConductivityUom;
}

export type ThermalConductivityUomExt = string;
type _ThermalConductivityUomExt = Primitive._string;

interface _ThermalDiffusivityMeasure extends _AbstractMeasure {
  uom: ThermalDiffusivityUom;
}
export interface ThermalDiffusivityMeasure extends _ThermalDiffusivityMeasure {
  constructor: { new (): ThermalDiffusivityMeasure };
}
export const ThermalDiffusivityMeasure: { new (): ThermalDiffusivityMeasure };

interface _ThermalDiffusivityMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ThermalDiffusivityMeasureExt
  extends _ThermalDiffusivityMeasureExt {
  constructor: { new (): ThermalDiffusivityMeasureExt };
}
export const ThermalDiffusivityMeasureExt: {
  new (): ThermalDiffusivityMeasureExt;
};

export type ThermalDiffusivityUom =
  | "cm2/s"
  | "ft2/h"
  | "ft2/s"
  | "in2/s"
  | "m2/h"
  | "m2/s"
  | "mm2/s";
interface _ThermalDiffusivityUom extends _UomEnum {
  content: ThermalDiffusivityUom;
}

export type ThermalDiffusivityUomExt = string;
type _ThermalDiffusivityUomExt = Primitive._string;

interface _ThermalInsulanceMeasure extends _AbstractMeasure {
  uom: ThermalInsulanceUom;
}
export interface ThermalInsulanceMeasure extends _ThermalInsulanceMeasure {
  constructor: { new (): ThermalInsulanceMeasure };
}
export const ThermalInsulanceMeasure: { new (): ThermalInsulanceMeasure };

interface _ThermalInsulanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ThermalInsulanceMeasureExt
  extends _ThermalInsulanceMeasureExt {
  constructor: { new (): ThermalInsulanceMeasureExt };
}
export const ThermalInsulanceMeasureExt: { new (): ThermalInsulanceMeasureExt };

export type ThermalInsulanceUom =
  | "deltaC.m2.h/kcal[th]"
  | "deltaF.ft2.h/Btu[IT]"
  | "deltaK.m2/kW"
  | "deltaK.m2/W";
interface _ThermalInsulanceUom extends _UomEnum {
  content: ThermalInsulanceUom;
}

export type ThermalInsulanceUomExt = string;
type _ThermalInsulanceUomExt = Primitive._string;

interface _ThermalResistanceMeasure extends _AbstractMeasure {
  uom: ThermalResistanceUom;
}
export interface ThermalResistanceMeasure extends _ThermalResistanceMeasure {
  constructor: { new (): ThermalResistanceMeasure };
}
export const ThermalResistanceMeasure: { new (): ThermalResistanceMeasure };

interface _ThermalResistanceMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ThermalResistanceMeasureExt
  extends _ThermalResistanceMeasureExt {
  constructor: { new (): ThermalResistanceMeasureExt };
}
export const ThermalResistanceMeasureExt: {
  new (): ThermalResistanceMeasureExt;
};

export type ThermalResistanceUom = "deltaK/W";
interface _ThermalResistanceUom extends _UomEnum {
  content: ThermalResistanceUom;
}

export type ThermalResistanceUomExt = string;
type _ThermalResistanceUomExt = Primitive._string;

interface _ThermodynamicTemperatureMeasure extends _AbstractMeasure {
  uom: ThermodynamicTemperatureUom;
}
export interface ThermodynamicTemperatureMeasure
  extends _ThermodynamicTemperatureMeasure {
  constructor: { new (): ThermodynamicTemperatureMeasure };
}
export const ThermodynamicTemperatureMeasure: {
  new (): ThermodynamicTemperatureMeasure;
};

interface _ThermodynamicTemperatureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface ThermodynamicTemperatureMeasureExt
  extends _ThermodynamicTemperatureMeasureExt {
  constructor: { new (): ThermodynamicTemperatureMeasureExt };
}
export const ThermodynamicTemperatureMeasureExt: {
  new (): ThermodynamicTemperatureMeasureExt;
};

interface _ThermodynamicTemperaturePerThermodynamicTemperatureMeasure
  extends _AbstractMeasure {
  uom: ThermodynamicTemperaturePerThermodynamicTemperatureUom;
}
export interface ThermodynamicTemperaturePerThermodynamicTemperatureMeasure
  extends _ThermodynamicTemperaturePerThermodynamicTemperatureMeasure {
  constructor: {
    new (): ThermodynamicTemperaturePerThermodynamicTemperatureMeasure;
  };
}
export const ThermodynamicTemperaturePerThermodynamicTemperatureMeasure: {
  new (): ThermodynamicTemperaturePerThermodynamicTemperatureMeasure;
};

interface _ThermodynamicTemperaturePerThermodynamicTemperatureMeasureExt
  extends _AbstractMeasure {
  uom: string;
}
export interface ThermodynamicTemperaturePerThermodynamicTemperatureMeasureExt
  extends _ThermodynamicTemperaturePerThermodynamicTemperatureMeasureExt {
  constructor: {
    new (): ThermodynamicTemperaturePerThermodynamicTemperatureMeasureExt;
  };
}
export const ThermodynamicTemperaturePerThermodynamicTemperatureMeasureExt: {
  new (): ThermodynamicTemperaturePerThermodynamicTemperatureMeasureExt;
};

export type ThermodynamicTemperaturePerThermodynamicTemperatureUom =
  | "degC/degC"
  | "degF/degF"
  | "degR/degR"
  | "Euc"
  | "K/K";
interface _ThermodynamicTemperaturePerThermodynamicTemperatureUom
  extends _UomEnum {
  content: ThermodynamicTemperaturePerThermodynamicTemperatureUom;
}

export type ThermodynamicTemperaturePerThermodynamicTemperatureUomExt = string;
type _ThermodynamicTemperaturePerThermodynamicTemperatureUomExt =
  Primitive._string;

export type ThermodynamicTemperatureUom = "degC" | "degF" | "degR" | "K";
interface _ThermodynamicTemperatureUom extends _UomEnum {
  content: ThermodynamicTemperatureUom;
}

export type ThermodynamicTemperatureUomExt = string;
type _ThermodynamicTemperatureUomExt = Primitive._string;

/** Index into a time series. Used to specify time. (Not to be confused with time step.) */
interface _TimeIndex extends BaseType {
  /** @integer The index of the time in the time series. */
  Index: number;
  TimeSeries: DataObjectReference;
}
export interface TimeIndex extends _TimeIndex {
  constructor: { new (): TimeIndex };
}
export const TimeIndex: { new (): TimeIndex };

/** Parameter containing a time index value. */
interface _TimeIndexParameter extends _AbstractActivityParameter {
  TimeIndex: TimeIndex;
}
export interface TimeIndexParameter extends _TimeIndexParameter {
  constructor: { new (): TimeIndexParameter };
}
export const TimeIndexParameter: { new (): TimeIndexParameter };

interface _TimeIndexParameterKey extends _AbstractParameterKey {
  TimeIndex: TimeIndex;
}
export interface TimeIndexParameterKey extends _TimeIndexParameterKey {
  constructor: { new (): TimeIndexParameterKey };
}
export const TimeIndexParameterKey: { new (): TimeIndexParameterKey };

/** Indices
 * into a time series. Used to specify time. (Not to be confused with time step.) */
interface _TimeIndices extends BaseType {
  /** Simulation time step for each time index */
  SimulatorTimeStep?: AbstractIntegerArray;
  /** @integer */
  TimeIndexCount: number;
  /** @integer The index of the start time in the time series, if not zero. */
  TimeIndexStart?: number;
  TimeSeries: DataObjectReference;
  /** When UseInterval is true, the values are associated with each time intervals between two consecutive time entries instead of each individual time entry. As a consequence the dimension of the value array corresponding to the time series is the number of entry in the series minus one. */
  UseInterval: boolean;
}
export interface TimeIndices extends _TimeIndices {
  constructor: { new (): TimeIndices };
}
export const TimeIndices: { new (): TimeIndices };

interface _TimeMeasure extends _AbstractMeasure {
  uom: TimeUom;
}
export interface TimeMeasure extends _TimeMeasure {
  constructor: { new (): TimeMeasure };
}
export const TimeMeasure: { new (): TimeMeasure };

interface _TimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface TimeMeasureExt extends _TimeMeasureExt {
  constructor: { new (): TimeMeasureExt };
}
export const TimeMeasureExt: { new (): TimeMeasureExt };

interface _TimePerLengthMeasure extends _AbstractMeasure {
  uom: TimePerLengthUom;
}
export interface TimePerLengthMeasure extends _TimePerLengthMeasure {
  constructor: { new (): TimePerLengthMeasure };
}
export const TimePerLengthMeasure: { new (): TimePerLengthMeasure };

interface _TimePerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface TimePerLengthMeasureExt extends _TimePerLengthMeasureExt {
  constructor: { new (): TimePerLengthMeasureExt };
}
export const TimePerLengthMeasureExt: { new (): TimePerLengthMeasureExt };

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
  content: TimePerLengthUom;
}

export type TimePerLengthUomExt = string;
type _TimePerLengthUomExt = Primitive._string;

interface _TimePerMassMeasure extends _AbstractMeasure {
  uom: TimePerMassUom;
}
export interface TimePerMassMeasure extends _TimePerMassMeasure {
  constructor: { new (): TimePerMassMeasure };
}
export const TimePerMassMeasure: { new (): TimePerMassMeasure };

interface _TimePerMassMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface TimePerMassMeasureExt extends _TimePerMassMeasureExt {
  constructor: { new (): TimePerMassMeasureExt };
}
export const TimePerMassMeasureExt: { new (): TimePerMassMeasureExt };

export type TimePerMassUom = "s/kg";
interface _TimePerMassUom extends _UomEnum {
  content: TimePerMassUom;
}

export type TimePerMassUomExt = string;
type _TimePerMassUomExt = Primitive._string;

interface _TimePerTimeMeasure extends _AbstractMeasure {
  uom: TimePerTimeUom;
}
export interface TimePerTimeMeasure extends _TimePerTimeMeasure {
  constructor: { new (): TimePerTimeMeasure };
}
export const TimePerTimeMeasure: { new (): TimePerTimeMeasure };

interface _TimePerTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface TimePerTimeMeasureExt extends _TimePerTimeMeasureExt {
  constructor: { new (): TimePerTimeMeasureExt };
}
export const TimePerTimeMeasureExt: { new (): TimePerTimeMeasureExt };

export type TimePerTimeUom = "%" | "Euc" | "ms/s" | "s/s";
interface _TimePerTimeUom extends _UomEnum {
  content: TimePerTimeUom;
}

export type TimePerTimeUomExt = string;
type _TimePerTimeUomExt = Primitive._string;

interface _TimePerVolumeMeasure extends _AbstractMeasure {
  uom: TimePerVolumeUom;
}
export interface TimePerVolumeMeasure extends _TimePerVolumeMeasure {
  constructor: { new (): TimePerVolumeMeasure };
}
export const TimePerVolumeMeasure: { new (): TimePerVolumeMeasure };

interface _TimePerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface TimePerVolumeMeasureExt extends _TimePerVolumeMeasureExt {
  constructor: { new (): TimePerVolumeMeasureExt };
}
export const TimePerVolumeMeasureExt: { new (): TimePerVolumeMeasureExt };

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
  content: TimePerVolumeUom;
}

export type TimePerVolumeUomExt = string;
type _TimePerVolumeUomExt = Primitive._string;

/** Stores an ordered list of times, for example, for time-dependent properties, geometries, or representations. It is used in conjunction with the time index to specify times for RESQML. */
interface _TimeSeries extends _AbstractObject {
  /** Individual times composing the series. The list ordering is used by the time index. */
  Time: GeologicTime[];
  TimeSeriesParentage?: TimeSeriesParentage;
}
export interface TimeSeries extends _TimeSeries {
  constructor: { new (): TimeSeries };
}
export const TimeSeries: { new (): TimeSeries };

/** Indicates that a time series has the associated time series as a parent, i.e., that the series continues from the parent time series. */
interface _TimeSeriesParentage extends BaseType {
  /** Used to indicate that a time series overlaps with its parent time series, e.g., as may be done for simulation studies, where the end state of one calculation is the initial state of the next. */
  HasOverlap: boolean;
  ParentTimeIndex: TimeIndex;
}
export interface TimeSeriesParentage extends _TimeSeriesParentage {
  constructor: { new (): TimeSeriesParentage };
}
export const TimeSeriesParentage: { new (): TimeSeriesParentage };

export type TimeStamp = string;
type _TimeStamp = _AbstractString;

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
  content: TimeUom;
}

export type TimeUomExt = string;
type _TimeUomExt = Primitive._string;

/** A time zone conforming to the XSD:dateTime specification. */
export type TimeZone = string;
type _TimeZone = _String64;

interface _TvdInterval extends BaseType {
  datum: string;
  /** True vertical depth at the base of the interval */
  TvdBase: LengthMeasure;
  TvdTop: LengthMeasure;
}
export interface TvdInterval extends _TvdInterval {
  constructor: { new (): TvdInterval };
}
export const TvdInterval: { new (): TvdInterval };

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
  | "1/h"
  | "1/H"
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
  | "30 m"
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
  | "b"
  | "B"
  | "B.W"
  | "b/cm3"
  | "B/m"
  | "B/O"
  | "bar"
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
  | "ct"
  | "cT"
  | "cu"
  | "cV"
  | "cW"
  | "cWb"
  | "cwt[UK]"
  | "cwt[US]"
  | "D"
  | "d"
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
  | "ds"
  | "dS"
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
  | "mA"
  | "MA"
  | "mA/cm2"
  | "mA/ft2"
  | "Ma[t]"
  | "mbar"
  | "MBq"
  | "mC"
  | "MC"
  | "mC/m2"
  | "mcal[th]"
  | "Mcal[th]"
  | "mCi"
  | "mD"
  | "mD.ft"
  | "mD.ft2/(lbf.s)"
  | "mD.in2/(lbf.s)"
  | "mD.m"
  | "mD/(Pa.s)"
  | "mD/cP"
  | "MEuc"
  | "mEuc"
  | "meV"
  | "MeV"
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
  | "mH"
  | "MH"
  | "mHz"
  | "MHz"
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
  | "mJ"
  | "MJ"
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
  | "mPa"
  | "MPa"
  | "mPa.s"
  | "MPa.s/m"
  | "MPa/h"
  | "MPa/m"
  | "Mpsi"
  | "Mrad"
  | "mrad"
  | "mrd"
  | "Mrd"
  | "mrem"
  | "mrem/h"
  | "ms"
  | "MS"
  | "mS"
  | "mS/cm"
  | "ms/cm"
  | "ms/ft"
  | "ms/in"
  | "mS/m"
  | "ms/m"
  | "ms/s"
  | "mSv"
  | "mSv/h"
  | "mT"
  | "mT/dm"
  | "MV"
  | "mV"
  | "mV/ft"
  | "mV/m"
  | "mW"
  | "MW"
  | "MW.h"
  | "MW.h/kg"
  | "MW.h/m3"
  | "mW/m2"
  | "MWb"
  | "mWb"
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
  | "na"
  | "nA"
  | "nAPI"
  | "nC"
  | "ncal[th]"
  | "nCi"
  | "nEuc"
  | "neV"
  | "nF"
  | "ng"
  | "ng/g"
  | "ng/mg"
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
  | "ns"
  | "nS"
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
  | "Pa"
  | "pA"
  | "Pa.s"
  | "Pa.s.m3/kg"
  | "Pa.s/m3"
  | "Pa.s2/m3"
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
  | "s/m"
  | "S/m"
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
  content: UnitOfMeasure;
}

/** A variant of UnitOfMeasure which has been extended to allow any user-defined unit of measure which follows an authority:unit pattern; the colon is mandatory.
 *
 * This class is implemented in XML as a union between the list of valid units per the prevailing Energistics Units of Measure Specification and an XML pattern which mandates the central colon. */
export type UnitOfMeasureExt = string;
type _UnitOfMeasureExt = Primitive._string;

/** The intended abstract supertype of all "units of measure".
 * This abstract type allows the maximum length of a UOM enumeration to be centrally defined.
 * This type is abstract in the sense that it should not be used directly
 * except to derive another type. */
export type UomEnum = string;
type _UomEnum = _AbstractString;

export type UuidString = string;
type _UuidString = _AbstractString;

interface _VerticalCoordinateMeasure extends _AbstractMeasure {
  uom: VerticalCoordinateUom;
}
export interface VerticalCoordinateMeasure extends _VerticalCoordinateMeasure {
  constructor: { new (): VerticalCoordinateMeasure };
}
export const VerticalCoordinateMeasure: { new (): VerticalCoordinateMeasure };

interface _VerticalCoordinateMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VerticalCoordinateMeasureExt
  extends _VerticalCoordinateMeasureExt {
  constructor: { new (): VerticalCoordinateMeasureExt };
}
export const VerticalCoordinateMeasureExt: {
  new (): VerticalCoordinateMeasureExt;
};

/** The units of measure that are valid for vertical gravity based coordinates (i.e., elevation or vertical depth). */
export type VerticalCoordinateUom = "m" | "ft" | "ftUS" | "ftBr(65)";
interface _VerticalCoordinateUom extends _UomEnum {
  content: VerticalCoordinateUom;
}

export type VerticalCoordinateUomExt = string;
type _VerticalCoordinateUomExt = Primitive._string;

interface _VerticalCrs extends _AbstractObject {
  uom: string;
  AbstractVerticalCrs: AbstractVerticalCrs;
  Direction: VerticalDirection;
}
export interface VerticalCrs extends _VerticalCrs {
  constructor: { new (): VerticalCrs };
}
export const VerticalCrs: { new (): VerticalCrs };

export type VerticalDirection = "up" | "down";
interface _VerticalDirection extends Primitive._string {
  content: VerticalDirection;
}

/** This class contains the EPSG code for a vertical CRS. */
interface _VerticalEpsgCrs extends _AbstractVerticalCrs {
  /** @integer */
  EpsgCode: number;
}
export interface VerticalEpsgCrs extends _VerticalEpsgCrs {
  constructor: { new (): VerticalEpsgCrs };
}
export const VerticalEpsgCrs: { new (): VerticalEpsgCrs };

/** This is the Energistics encapsulation of the VerticalCrs type from GML. */
interface _VerticalGmlCrs extends _AbstractVerticalCrs {
  GmlVerticalCrsDefinition: Record<string, unknown>;
}
export interface VerticalGmlCrs extends _VerticalGmlCrs {
  constructor: { new (): VerticalGmlCrs };
}
export const VerticalGmlCrs: { new (): VerticalGmlCrs };

/** This class contains a code for a vertical CRS according to a local authority. This would be used in a case where a company or regulatory regime has chosen not to use EPSG codes. */
interface _VerticalLocalAuthorityCrs extends _AbstractVerticalCrs {
  LocalAuthorityCrsName: AuthorityQualifiedName;
}
export interface VerticalLocalAuthorityCrs extends _VerticalLocalAuthorityCrs {
  constructor: { new (): VerticalLocalAuthorityCrs };
}
export const VerticalLocalAuthorityCrs: { new (): VerticalLocalAuthorityCrs };

/** This class is used in a case where the coordinate reference system is either unknown or is intentionally not being transferred. In this case, the uom and Direction need to be provided on the VerticalCrs class. */
interface _VerticalUnknownCrs extends _AbstractVerticalCrs {
  Unknown: string;
}
export interface VerticalUnknownCrs extends _VerticalUnknownCrs {
  constructor: { new (): VerticalUnknownCrs };
}
export const VerticalUnknownCrs: { new (): VerticalUnknownCrs };

/** ISO 19162-compliant well-known text for the vertical CRS */
interface _VerticalWktCrs extends _AbstractVerticalCrs {
  /** ISO 19162 compliant well known text of the CRS */
  WellKnownText: string;
}
export interface VerticalWktCrs extends _VerticalWktCrs {
  constructor: { new (): VerticalWktCrs };
}
export const VerticalWktCrs: { new (): VerticalWktCrs };

interface _VolumeFlowRatePerVolumeFlowRateMeasure extends _AbstractMeasure {
  uom: VolumeFlowRatePerVolumeFlowRateUom;
}
export interface VolumeFlowRatePerVolumeFlowRateMeasure
  extends _VolumeFlowRatePerVolumeFlowRateMeasure {
  constructor: { new (): VolumeFlowRatePerVolumeFlowRateMeasure };
}
export const VolumeFlowRatePerVolumeFlowRateMeasure: {
  new (): VolumeFlowRatePerVolumeFlowRateMeasure;
};

interface _VolumeFlowRatePerVolumeFlowRateMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumeFlowRatePerVolumeFlowRateMeasureExt
  extends _VolumeFlowRatePerVolumeFlowRateMeasureExt {
  constructor: { new (): VolumeFlowRatePerVolumeFlowRateMeasureExt };
}
export const VolumeFlowRatePerVolumeFlowRateMeasureExt: {
  new (): VolumeFlowRatePerVolumeFlowRateMeasureExt;
};

export type VolumeFlowRatePerVolumeFlowRateUom =
  | "%"
  | "(bbl/d)/(bbl/d)"
  | "(m3/d)/(m3/d)"
  | "(m3/s)/(m3/s)"
  | "1E6 (ft3/d)/(bbl/d)"
  | "Euc";
interface _VolumeFlowRatePerVolumeFlowRateUom extends _UomEnum {
  content: VolumeFlowRatePerVolumeFlowRateUom;
}

export type VolumeFlowRatePerVolumeFlowRateUomExt = string;
type _VolumeFlowRatePerVolumeFlowRateUomExt = Primitive._string;

interface _VolumeMeasure extends _AbstractMeasure {
  uom: VolumeUom;
}
export interface VolumeMeasure extends _VolumeMeasure {
  constructor: { new (): VolumeMeasure };
}
export const VolumeMeasure: { new (): VolumeMeasure };

interface _VolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumeMeasureExt extends _VolumeMeasureExt {
  constructor: { new (): VolumeMeasureExt };
}
export const VolumeMeasureExt: { new (): VolumeMeasureExt };

interface _VolumePerAreaMeasure extends _AbstractMeasure {
  uom: VolumePerAreaUom;
}
export interface VolumePerAreaMeasure extends _VolumePerAreaMeasure {
  constructor: { new (): VolumePerAreaMeasure };
}
export const VolumePerAreaMeasure: { new (): VolumePerAreaMeasure };

interface _VolumePerAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerAreaMeasureExt extends _VolumePerAreaMeasureExt {
  constructor: { new (): VolumePerAreaMeasureExt };
}
export const VolumePerAreaMeasureExt: { new (): VolumePerAreaMeasureExt };

export type VolumePerAreaUom =
  | "1E6 bbl/acre"
  | "bbl/acre"
  | "ft3/ft2"
  | "m3/m2";
interface _VolumePerAreaUom extends _UomEnum {
  content: VolumePerAreaUom;
}

export type VolumePerAreaUomExt = string;
type _VolumePerAreaUomExt = Primitive._string;

interface _VolumePerLengthMeasure extends _AbstractMeasure {
  uom: VolumePerLengthUom;
}
export interface VolumePerLengthMeasure extends _VolumePerLengthMeasure {
  constructor: { new (): VolumePerLengthMeasure };
}
export const VolumePerLengthMeasure: { new (): VolumePerLengthMeasure };

interface _VolumePerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerLengthMeasureExt extends _VolumePerLengthMeasureExt {
  constructor: { new (): VolumePerLengthMeasureExt };
}
export const VolumePerLengthMeasureExt: { new (): VolumePerLengthMeasureExt };

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
  content: VolumePerLengthUom;
}

export type VolumePerLengthUomExt = string;
type _VolumePerLengthUomExt = Primitive._string;

interface _VolumePerMassMeasure extends _AbstractMeasure {
  uom: VolumePerMassUom;
}
export interface VolumePerMassMeasure extends _VolumePerMassMeasure {
  constructor: { new (): VolumePerMassMeasure };
}
export const VolumePerMassMeasure: { new (): VolumePerMassMeasure };

interface _VolumePerMassMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerMassMeasureExt extends _VolumePerMassMeasureExt {
  constructor: { new (): VolumePerMassMeasureExt };
}
export const VolumePerMassMeasureExt: { new (): VolumePerMassMeasureExt };

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
  content: VolumePerMassUom;
}

export type VolumePerMassUomExt = string;
type _VolumePerMassUomExt = Primitive._string;

interface _VolumePerPressureMeasure extends _AbstractMeasure {
  uom: VolumePerPressureUom;
}
export interface VolumePerPressureMeasure extends _VolumePerPressureMeasure {
  constructor: { new (): VolumePerPressureMeasure };
}
export const VolumePerPressureMeasure: { new (): VolumePerPressureMeasure };

interface _VolumePerPressureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerPressureMeasureExt
  extends _VolumePerPressureMeasureExt {
  constructor: { new (): VolumePerPressureMeasureExt };
}
export const VolumePerPressureMeasureExt: {
  new (): VolumePerPressureMeasureExt;
};

export type VolumePerPressureUom = "bbl/psi" | "m3/kPa" | "m3/Pa";
interface _VolumePerPressureUom extends _UomEnum {
  content: VolumePerPressureUom;
}

export type VolumePerPressureUomExt = string;
type _VolumePerPressureUomExt = Primitive._string;

interface _VolumePerRotationMeasure extends _AbstractMeasure {
  uom: VolumePerRotationUom;
}
export interface VolumePerRotationMeasure extends _VolumePerRotationMeasure {
  constructor: { new (): VolumePerRotationMeasure };
}
export const VolumePerRotationMeasure: { new (): VolumePerRotationMeasure };

interface _VolumePerRotationMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerRotationMeasureExt
  extends _VolumePerRotationMeasureExt {
  constructor: { new (): VolumePerRotationMeasureExt };
}
export const VolumePerRotationMeasureExt: {
  new (): VolumePerRotationMeasureExt;
};

export type VolumePerRotationUom = "ft3/rad" | "m3/rad" | "m3/rev";
interface _VolumePerRotationUom extends _UomEnum {
  content: VolumePerRotationUom;
}

export type VolumePerRotationUomExt = string;
type _VolumePerRotationUomExt = Primitive._string;

interface _VolumePerTimeLengthMeasure extends _AbstractMeasure {
  uom: VolumePerTimeLengthUom;
}
export interface VolumePerTimeLengthMeasure
  extends _VolumePerTimeLengthMeasure {
  constructor: { new (): VolumePerTimeLengthMeasure };
}
export const VolumePerTimeLengthMeasure: { new (): VolumePerTimeLengthMeasure };

interface _VolumePerTimeLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerTimeLengthMeasureExt
  extends _VolumePerTimeLengthMeasureExt {
  constructor: { new (): VolumePerTimeLengthMeasureExt };
}
export const VolumePerTimeLengthMeasureExt: {
  new (): VolumePerTimeLengthMeasureExt;
};

export type VolumePerTimeLengthUom = "1000 bbl.ft/d" | "1000 m4/d" | "m4/s";
interface _VolumePerTimeLengthUom extends _UomEnum {
  content: VolumePerTimeLengthUom;
}

export type VolumePerTimeLengthUomExt = string;
type _VolumePerTimeLengthUomExt = Primitive._string;

interface _VolumePerTimeMeasure extends _AbstractMeasure {
  uom: VolumePerTimeUom;
}
export interface VolumePerTimeMeasure extends _VolumePerTimeMeasure {
  constructor: { new (): VolumePerTimeMeasure };
}
export const VolumePerTimeMeasure: { new (): VolumePerTimeMeasure };

interface _VolumePerTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerTimeMeasureExt extends _VolumePerTimeMeasureExt {
  constructor: { new (): VolumePerTimeMeasureExt };
}
export const VolumePerTimeMeasureExt: { new (): VolumePerTimeMeasureExt };

interface _VolumePerTimePerAreaMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerAreaUom;
}
export interface VolumePerTimePerAreaMeasure
  extends _VolumePerTimePerAreaMeasure {
  constructor: { new (): VolumePerTimePerAreaMeasure };
}
export const VolumePerTimePerAreaMeasure: {
  new (): VolumePerTimePerAreaMeasure;
};

interface _VolumePerTimePerAreaMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerTimePerAreaMeasureExt
  extends _VolumePerTimePerAreaMeasureExt {
  constructor: { new (): VolumePerTimePerAreaMeasureExt };
}
export const VolumePerTimePerAreaMeasureExt: {
  new (): VolumePerTimePerAreaMeasureExt;
};

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
  content: VolumePerTimePerAreaUom;
}

export type VolumePerTimePerAreaUomExt = string;
type _VolumePerTimePerAreaUomExt = Primitive._string;

interface _VolumePerTimePerLengthMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerLengthUom;
}
export interface VolumePerTimePerLengthMeasure
  extends _VolumePerTimePerLengthMeasure {
  constructor: { new (): VolumePerTimePerLengthMeasure };
}
export const VolumePerTimePerLengthMeasure: {
  new (): VolumePerTimePerLengthMeasure;
};

interface _VolumePerTimePerLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerTimePerLengthMeasureExt
  extends _VolumePerTimePerLengthMeasureExt {
  constructor: { new (): VolumePerTimePerLengthMeasureExt };
}
export const VolumePerTimePerLengthMeasureExt: {
  new (): VolumePerTimePerLengthMeasureExt;
};

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
  content: VolumePerTimePerLengthUom;
}

export type VolumePerTimePerLengthUomExt = string;
type _VolumePerTimePerLengthUomExt = Primitive._string;

interface _VolumePerTimePerPressureLengthMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerPressureLengthUom;
}
export interface VolumePerTimePerPressureLengthMeasure
  extends _VolumePerTimePerPressureLengthMeasure {
  constructor: { new (): VolumePerTimePerPressureLengthMeasure };
}
export const VolumePerTimePerPressureLengthMeasure: {
  new (): VolumePerTimePerPressureLengthMeasure;
};

interface _VolumePerTimePerPressureLengthMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerTimePerPressureLengthMeasureExt
  extends _VolumePerTimePerPressureLengthMeasureExt {
  constructor: { new (): VolumePerTimePerPressureLengthMeasureExt };
}
export const VolumePerTimePerPressureLengthMeasureExt: {
  new (): VolumePerTimePerPressureLengthMeasureExt;
};

export type VolumePerTimePerPressureLengthUom =
  | "bbl/(ft.psi.d)"
  | "ft3/(ft.psi.d)"
  | "m2/(kPa.d)"
  | "m2/(Pa.s)";
interface _VolumePerTimePerPressureLengthUom extends _UomEnum {
  content: VolumePerTimePerPressureLengthUom;
}

export type VolumePerTimePerPressureLengthUomExt = string;
type _VolumePerTimePerPressureLengthUomExt = Primitive._string;

interface _VolumePerTimePerPressureMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerPressureUom;
}
export interface VolumePerTimePerPressureMeasure
  extends _VolumePerTimePerPressureMeasure {
  constructor: { new (): VolumePerTimePerPressureMeasure };
}
export const VolumePerTimePerPressureMeasure: {
  new (): VolumePerTimePerPressureMeasure;
};

interface _VolumePerTimePerPressureMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerTimePerPressureMeasureExt
  extends _VolumePerTimePerPressureMeasureExt {
  constructor: { new (): VolumePerTimePerPressureMeasureExt };
}
export const VolumePerTimePerPressureMeasureExt: {
  new (): VolumePerTimePerPressureMeasureExt;
};

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
  content: VolumePerTimePerPressureUom;
}

export type VolumePerTimePerPressureUomExt = string;
type _VolumePerTimePerPressureUomExt = Primitive._string;

interface _VolumePerTimePerTimeMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerTimeUom;
}
export interface VolumePerTimePerTimeMeasure
  extends _VolumePerTimePerTimeMeasure {
  constructor: { new (): VolumePerTimePerTimeMeasure };
}
export const VolumePerTimePerTimeMeasure: {
  new (): VolumePerTimePerTimeMeasure;
};

interface _VolumePerTimePerTimeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerTimePerTimeMeasureExt
  extends _VolumePerTimePerTimeMeasureExt {
  constructor: { new (): VolumePerTimePerTimeMeasureExt };
}
export const VolumePerTimePerTimeMeasureExt: {
  new (): VolumePerTimePerTimeMeasureExt;
};

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
  content: VolumePerTimePerTimeUom;
}

export type VolumePerTimePerTimeUomExt = string;
type _VolumePerTimePerTimeUomExt = Primitive._string;

interface _VolumePerTimePerVolumeMeasure extends _AbstractMeasure {
  uom: VolumePerTimePerVolumeUom;
}
export interface VolumePerTimePerVolumeMeasure
  extends _VolumePerTimePerVolumeMeasure {
  constructor: { new (): VolumePerTimePerVolumeMeasure };
}
export const VolumePerTimePerVolumeMeasure: {
  new (): VolumePerTimePerVolumeMeasure;
};

interface _VolumePerTimePerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerTimePerVolumeMeasureExt
  extends _VolumePerTimePerVolumeMeasureExt {
  constructor: { new (): VolumePerTimePerVolumeMeasureExt };
}
export const VolumePerTimePerVolumeMeasureExt: {
  new (): VolumePerTimePerVolumeMeasureExt;
};

export type VolumePerTimePerVolumeUom = "bbl/(d.acre.ft)" | "m3/(s.m3)";
interface _VolumePerTimePerVolumeUom extends _UomEnum {
  content: VolumePerTimePerVolumeUom;
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
  content: VolumePerTimeUom;
}

export type VolumePerTimeUomExt = string;
type _VolumePerTimeUomExt = Primitive._string;

interface _VolumePerVolumeMeasure extends _AbstractMeasure {
  uom: VolumePerVolumeUom;
}
export interface VolumePerVolumeMeasure extends _VolumePerVolumeMeasure {
  constructor: { new (): VolumePerVolumeMeasure };
}
export const VolumePerVolumeMeasure: { new (): VolumePerVolumeMeasure };

interface _VolumePerVolumeMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumePerVolumeMeasureExt extends _VolumePerVolumeMeasureExt {
  constructor: { new (): VolumePerVolumeMeasureExt };
}
export const VolumePerVolumeMeasureExt: { new (): VolumePerVolumeMeasureExt };

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
  content: VolumePerVolumeUom;
}

export type VolumePerVolumeUomExt = string;
type _VolumePerVolumeUomExt = Primitive._string;

interface _VolumetricHeatTransferCoefficientMeasure extends _AbstractMeasure {
  uom: VolumetricHeatTransferCoefficientUom;
}
export interface VolumetricHeatTransferCoefficientMeasure
  extends _VolumetricHeatTransferCoefficientMeasure {
  constructor: { new (): VolumetricHeatTransferCoefficientMeasure };
}
export const VolumetricHeatTransferCoefficientMeasure: {
  new (): VolumetricHeatTransferCoefficientMeasure;
};

interface _VolumetricHeatTransferCoefficientMeasureExt
  extends _AbstractMeasure {
  uom: string;
}
export interface VolumetricHeatTransferCoefficientMeasureExt
  extends _VolumetricHeatTransferCoefficientMeasureExt {
  constructor: { new (): VolumetricHeatTransferCoefficientMeasureExt };
}
export const VolumetricHeatTransferCoefficientMeasureExt: {
  new (): VolumetricHeatTransferCoefficientMeasureExt;
};

export type VolumetricHeatTransferCoefficientUom =
  | "Btu[IT]/(h.ft3.deltaF)"
  | "Btu[IT]/(s.ft3.deltaF)"
  | "kW/(m3.deltaK)"
  | "W/(m3.deltaK)";
interface _VolumetricHeatTransferCoefficientUom extends _UomEnum {
  content: VolumetricHeatTransferCoefficientUom;
}

export type VolumetricHeatTransferCoefficientUomExt = string;
type _VolumetricHeatTransferCoefficientUomExt = Primitive._string;

interface _VolumetricThermalExpansionMeasure extends _AbstractMeasure {
  uom: VolumetricThermalExpansionUom;
}
export interface VolumetricThermalExpansionMeasure
  extends _VolumetricThermalExpansionMeasure {
  constructor: { new (): VolumetricThermalExpansionMeasure };
}
export const VolumetricThermalExpansionMeasure: {
  new (): VolumetricThermalExpansionMeasure;
};

interface _VolumetricThermalExpansionMeasureExt extends _AbstractMeasure {
  uom: string;
}
export interface VolumetricThermalExpansionMeasureExt
  extends _VolumetricThermalExpansionMeasureExt {
  constructor: { new (): VolumetricThermalExpansionMeasureExt };
}
export const VolumetricThermalExpansionMeasureExt: {
  new (): VolumetricThermalExpansionMeasureExt;
};

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
  content: VolumetricThermalExpansionUom;
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
  content: VolumeUom;
}

export type VolumeUomExt = string;
type _VolumeUomExt = Primitive._string;

/** A possibly temperature and pressure corrected volume value. */
interface _VolumeValue extends BaseType {
  MeasurementPressureTemperature: AbstractTemperaturePressure;
  /** The volume of the product. If the 'status' attribute is absent and the value is not "NaN", the data value can be assumed to be good with no restrictions. A value of "NaN" should be interpreted as null and should be not be given unless a status is also specified to explain why it is null. */
  Volume: VolumeMeasure;
}
export interface VolumeValue extends _VolumeValue {
  constructor: { new (): VolumeValue };
}
export const VolumeValue: { new (): VolumeValue };

/** Reference location for the measured depth datum (MdDatum).
 *
 * The type of local or permanent reference datum for vertical gravity based (i.e., elevation and vertical depth) and measured depth coordinates within the context of a well. This list includes local points (e.g., kelly bushing) used as a datum and vertical reference datums (e.g., mean sea level). */
export type WellboreDatumReference =
  | "ground level"
  | "kelly bushing"
  | "mean sea level"
  | "derrick floor"
  | "casing flange"
  | "crown valve"
  | "rotary bushing"
  | "rotary table"
  | "sea floor"
  | "lowest astronomical tide"
  | "mean higher high water"
  | "mean high water"
  | "mean lower low water"
  | "mean low water"
  | "mean tide level"
  | "kickoff point";
interface _WellboreDatumReference extends _TypeEnum {
  content: WellboreDatumReference;
}

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
  content: WellStatus;
}

export interface document extends BaseType {
  /** Substitution group for contextual data objects. */
  AbstractContextualObject: AbstractObject;
  Activity: Activity;
  ActivityTemplate: ActivityTemplate;
  DataAssuranceRecord: DataAssuranceRecord;
  EpcExternalPartReference: EpcExternalPartReference;
  GraphicalInformationSet: GraphicalInformationSet;
  PropertyKind: PropertyKind;
  PropertyKindDictionary: PropertyKindDictionary;
  TimeSeries: TimeSeries;
}
export const document: document;
