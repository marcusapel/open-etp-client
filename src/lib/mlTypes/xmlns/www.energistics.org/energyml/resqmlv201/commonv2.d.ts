/* eslint-disable @typescript-eslint/no-empty-interface */

// Source files:
// http://172.20.128.1:8080/commonv2/v2.0/xsd_schemas/Abstract.xsd
// http://172.20.128.1:8080/commonv2/v2.0/xsd_schemas/AllCommonObjects.xsd
// http://172.20.128.1:8080/commonv2/v2.0/xsd_schemas/BaseTypes.xsd
// http://172.20.128.1:8080/commonv2/v2.0/xsd_schemas/CRS.xsd
// http://172.20.128.1:8080/commonv2/v2.0/xsd_schemas/MeasureType.xsd
// http://172.20.128.1:8080/commonv2/v2.0/xsd_schemas/ObjectReference.xsd
// http://172.20.128.1:8080/commonv2/v2.0/xsd_schemas/QuantityClass.xsd

interface HandlerInstance {
  content?: any;
  _exists: boolean;
  _namespace: string;
  _parent?: HandlerInstance;
  _name?: string;
  _type?: string;
  _before?(): void;
  _after?(): void;
}
interface BaseType extends HandlerInstance {
  $type?: string;
}
export interface AbsorbedDoseMeasure {
  _: Measure;
  Uom: AbsorbedDoseUom;
}

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

/** The Mother Class for all Top Level Elements in RESQML. Inherits from the commonv2 AbstractDataObject. The purpose of this derivation is simply to make the Citation element mandatory. Appropriate to use as a base class in any ML where this is desired. */
export interface AbstractCitedDataObject extends AbstractObject {
  SchemaVersion: string;
  Uuid: string;
  Aliases?: ObjectAlias[];
  Citation: Citation;
  CustomData?: CustomData;
}

export interface AbstractDataObjectProxyType extends BaseType {
  /** Substitution group for normative data objects. */
  AbstractDataObject?: AbstractObject;
}

/** The intended abstract supertype of all schema roots that may be a member of a substitution group (whether contextual or data).  The type of root global elements should be extended from this type and the root global element should be declared to be a member of one of the above substitution groups. */
export interface AbstractObject extends BaseType {
  ObjectVersion?: string;
  /** The specific version of a schema from which this object is derived. This string should be exactly equivalent to the version attribute of the root element of the associated XSD schema file. In the UML model is the same as the version tagged value of the <<XSDschema>> package. */
  SchemaVersion: string;
  Uuid: string;
  Aliases?: ObjectAlias[];
  Citation?: Citation;
  CustomData?: CustomData;
}

export interface AbstractProjectedCrs extends BaseType {}

export interface AbstractVerticalCrs extends BaseType {}

export interface ActivityOfRadioactivityMeasure {
  _: Measure;
  Uom: ActivityOfRadioactivityUom;
}

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

export interface AmountOfSubstanceMeasure {
  _: Measure;
  Uom: AmountOfSubstanceUom;
}

export interface AmountOfSubstancePerAmountOfSubstanceMeasure {
  _: Measure;
  Uom: AmountOfSubstancePerAmountOfSubstanceUom;
}

export type AmountOfSubstancePerAmountOfSubstanceUom =
  | "%"
  | "%[molar]"
  | "Euc"
  | "mol/mol"
  | "nEuc"
  | "ppk"
  | "ppm";

export interface AmountOfSubstancePerAreaMeasure {
  _: Measure;
  Uom: AmountOfSubstancePerAreaUom;
}

export type AmountOfSubstancePerAreaUom = "mol/m2";

export interface AmountOfSubstancePerTimeMeasure {
  _: Measure;
  Uom: AmountOfSubstancePerTimeUom;
}

export interface AmountOfSubstancePerTimePerAreaMeasure {
  _: Measure;
  Uom: AmountOfSubstancePerTimePerAreaUom;
}

export type AmountOfSubstancePerTimePerAreaUom =
  | "lbmol/(h.ft2)"
  | "lbmol/(s.ft2)"
  | "mol/(s.m2)";

export type AmountOfSubstancePerTimeUom =
  | "kmol/h"
  | "kmol/s"
  | "lbmol/h"
  | "lbmol/s"
  | "mol/s";

export interface AmountOfSubstancePerVolumeMeasure {
  _: Measure;
  Uom: AmountOfSubstancePerVolumeUom;
}

export type AmountOfSubstancePerVolumeUom =
  | "kmol/m3"
  | "lbmol/ft3"
  | "lbmol/gal[UK]"
  | "lbmol/gal[US]"
  | "mol/m3";

export type AmountOfSubstanceUom = "kmol" | "lbmol" | "mmol" | "mol" | "umol";

export interface AnglePerLengthMeasure {
  _: Measure;
  Uom: AnglePerLengthUom;
}

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

export interface AnglePerVolumeMeasure {
  _: Measure;
  Uom: AnglePerVolumeUom;
}

export type AnglePerVolumeUom = "rad/ft3" | "rad/m3";

export interface AngularAccelerationMeasure {
  _: Measure;
  Uom: AngularAccelerationUom;
}

export type AngularAccelerationUom = "rad/s2" | "rpm/s";

export interface AngularVelocityMeasure {
  _: Measure;
  Uom: AngularVelocityUom;
}

export type AngularVelocityUom =
  | "dega/h"
  | "dega/min"
  | "dega/s"
  | "rad/s"
  | "rev/s"
  | "rpm";

export interface APIGammaRayMeasure {
  _: Measure;
  Uom: APIGammaRayUom;
}

export type APIGammaRayUom = "gAPI";

export interface APIGravityMeasure {
  _: Measure;
  Uom: APIGravityUom;
}

export type APIGravityUom = "dAPI";

export interface APINeutronMeasure {
  _: Measure;
  Uom: APINeutronUom;
}

export type APINeutronUom = "nAPI";

export interface AreaMeasure {
  _: Measure;
  Uom: AreaUom;
}

export interface AreaPerAmountOfSubstanceMeasure {
  _: Measure;
  Uom: AreaPerAmountOfSubstanceUom;
}

export type AreaPerAmountOfSubstanceUom = "m2/mol";

export interface AreaPerAreaMeasure {
  _: Measure;
  Uom: AreaPerAreaUom;
}

export type AreaPerAreaUom =
  | "%"
  | "%[area]"
  | "cEuc"
  | "Euc"
  | "in2/ft2"
  | "in2/in2"
  | "m2/m2"
  | "mm2/mm2";

export interface AreaPerMassMeasure {
  _: Measure;
  Uom: AreaPerMassUom;
}

export type AreaPerMassUom = "cm2/g" | "ft2/lbm" | "m2/g" | "m2/kg";

export interface AreaPerTimeMeasure {
  _: Measure;
  Uom: AreaPerTimeUom;
}

export type AreaPerTimeUom =
  | "cm2/s"
  | "ft2/h"
  | "ft2/s"
  | "in2/s"
  | "m2/d"
  | "m2/h"
  | "m2/s"
  | "mm2/s";

export interface AreaPerVolumeMeasure {
  _: Measure;
  Uom: AreaPerVolumeUom;
}

export type AreaPerVolumeUom =
  | "1/m"
  | "b/cm3"
  | "cu"
  | "ft2/in3"
  | "m2/cm3"
  | "m2/m3";

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

export interface AttenuationPerFrequencyIntervalMeasure {
  _: Measure;
  Uom: AttenuationPerFrequencyIntervalUom;
}

export type AttenuationPerFrequencyIntervalUom = "B/O" | "dB/O";

/** Defines the cordinate system axis order of the global CRS using the axis names (from EPSG database). */
export type AxisOrder2d =
  | "easting northing"
  | "northing easting"
  | "westing southing"
  | "southing westing"
  | "northing westing"
  | "westing northing";

export interface CapacitanceMeasure {
  _: Measure;
  Uom: CapacitanceUom;
}

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

/** An ISO 19115 EIP-derived set of metadata attached to all specializations of AbstractObject to ensure the traceability of each individual independent (top level) element. */
export interface Citation extends BaseType {
  /** Date and time the document was created in the source application or, if that information is not available, when it was saved to the RESQML format file.
   *
   * This is the equivalent of the ISO 19115 CI_Date where the CI_DateTypeCode = ”creation"
   *
   * The type is the Energistics timestamp datatype which is the W3C xs:dateTime with the optional timezone offset from UTC made mandatory.
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
   * Legacy DCGroup - description
   * @maxLength 4000 */
  Description?: string;
  /** Key words to describe the activity, for example, history match or volumetric calculations, relevant to this object. Intended to be used in a search function by software.
   *
   * This is the equivalent in ISO 19115 of descriptiveKeywords.MD_Keywords
   *
   * Legacy DCGroup - subject
   * @maxLength 4000 */
  DescriptiveKeywords?: string;
  /** Name (or other human-readable identifier) of the last person who updated the object.
   *
   * This is the equivalent in ISO 19115 to the CI_Individual.name or the CI_Organization.name of the citedResponsibleParty whose role is "editor".
   *
   * Legacy DCGroup - contributor
   * @maxLength 64 */
  Editor?: string;
  /** Software or service that was used to originate the object and the file format created. Must be human and machine readable and unambiguously identify the software by including the company name, software name and software version. This is the equivalent in ISO 19115 to the distributionFormat.MD_Format.
   *
   * The ISO format for this is [vendor:applicationName]/fileExtension where the application name includes the version number of the application.
   *
   * SIG Implementation Notes
   *
   * 1. RESQML
   *
   * - Legacy DCGroup from v1.1 - publisher
   * - fileExtension is not relevant and will be ignored if present.
   * - vendor and applicationName are mandatory.
   * @maxLength 256 */
  Format: string;
  /** Date and time the document was last modified in the source application or, if that information is not available, when it was last saved to the RESQML format file.
   *
   * This is the equivalent of the ISO 19115 CI_Date where the CI_DateTypeCode = ”lastUpdate"
   *
   * The type is the Energistics timestamp datatype which is the W3C xs:dateTime with the optional timezone offset from UTC made mandatory.
   *
   * Format:
   * YYYY-MM-DDThh:mm:ssZ[+/-]hh:mm
   *
   * Legacy DCGroup - modified */
  LastUpdate?: Date;
  /** Name (or other human-readable identifier) of the person who initially originated the object or RESQML document in the source application. If that information is not available, the user who created the RESQML format file. The originator remains the same as the object is subsequently edited.
   *
   * This is the equivalent in ISO 19115 to the CI_Individual.name or the CI_Organization.name of the citedResponsibleParty whose role is "originator".
   *
   * Legacy DCGroup - author
   * @maxLength 64 */
  Originator: string;
  /** One line description/name of the RESQML object.
   *
   * This is the equivalent in ISO 19115 of CI_Citation.title
   *
   * Legacy DCGroup - title
   * @maxLength 256 */
  Title: string;
  VersionString?: string;
}

/** The intended abstract supertype of all comments or remarks intended for human consumption.
 *
 * There should be no assumption that semantics can be extracted from the field by a computer.
 *
 * Neither should there be an assumption that any two humans will interpret the information in the same way (i.e., it may not be interoperable). */
export type CommentString = string;

/** WITSML - Custom or User Defined Element and Attributes Component Schema.
 * Specify custom element, attributes, and types in the custom data area. */
export interface CustomData extends BaseType {}

/** It only applies for Energistics data object. */
export interface DataObjectReference extends BaseType {
  /** The content type of the referenced element. */
  ContentType: string;
  Title: string;
  /** Reference to an object using its global UID.
   * @pattern "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}" */
  UUID: string;
  /** The authority that issued and maintains the uuid of the referenced object.
   * Used mainly in alias context. */
  UuidAuthority?: string;
  /** Indicates the version of the object which is referenced.
   * @maxLength 64 */
  VersionString?: string;
  /** Actual object referenced */
  _data?: AbstractCitedDataObject;
}

export interface DataTransferSpeedMeasure {
  _: Measure;
  Uom: DataTransferSpeedUom;
}

export type DataTransferSpeedUom = "bit/s" | "byte/s";

/** A textual description of something. */
export type DescriptionString = string;

export interface DiffusionCoefficientMeasure {
  _: Measure;
  Uom: DiffusionCoefficientUom;
}

export type DiffusionCoefficientUom = "m2/s";

export interface DigitalStorageMeasure {
  _: Measure;
  Uom: DigitalStorageUom;
}

export type DigitalStorageUom = "bit" | "byte" | "Kibyte" | "Mibyte";

export interface DimensionlessMeasure {
  _: Measure;
  Uom: DimensionlessUom;
}

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

export interface DipoleMomentMeasure {
  _: Measure;
  Uom: DipoleMomentUom;
}

export type DipoleMomentUom = "C.m";

export interface DoseEquivalentMeasure {
  _: Measure;
  Uom: DoseEquivalentUom;
}

export type DoseEquivalentUom = "mrem" | "mSv" | "rem" | "Sv";

export interface DynamicViscosityMeasure {
  _: Measure;
  Uom: DynamicViscosityUom;
}

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

export interface ElectricalResistivityMeasure {
  _: Measure;
  Uom: ElectricalResistivityUom;
}

export type ElectricalResistivityUom =
  | "kohm.m"
  | "nohm.mil2/ft"
  | "nohm.mm2/m"
  | "ohm.cm"
  | "ohm.m"
  | "ohm.m2/m";

export interface ElectricChargeMeasure {
  _: Measure;
  Uom: ElectricChargeUom;
}

export interface ElectricChargePerAreaMeasure {
  _: Measure;
  Uom: ElectricChargePerAreaUom;
}

export type ElectricChargePerAreaUom = "C/cm2" | "C/m2" | "C/mm2" | "mC/m2";

export interface ElectricChargePerMassMeasure {
  _: Measure;
  Uom: ElectricChargePerMassUom;
}

export type ElectricChargePerMassUom = "A.s/kg" | "C/g" | "C/kg";

export interface ElectricChargePerVolumeMeasure {
  _: Measure;
  Uom: ElectricChargePerVolumeUom;
}

export type ElectricChargePerVolumeUom = "A.s/m3" | "C/cm3" | "C/m3" | "C/mm3";

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

export interface ElectricConductanceMeasure {
  _: Measure;
  Uom: ElectricConductanceUom;
}

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

export interface ElectricConductivityMeasure {
  _: Measure;
  Uom: ElectricConductivityUom;
}

export type ElectricConductivityUom = "kS/m" | "mS/cm" | "mS/m" | "S/m";

export interface ElectricCurrentDensityMeasure {
  _: Measure;
  Uom: ElectricCurrentDensityUom;
}

export type ElectricCurrentDensityUom =
  | "A/cm2"
  | "A/ft2"
  | "A/m2"
  | "A/mm2"
  | "mA/cm2"
  | "mA/ft2"
  | "uA/cm2"
  | "uA/in2";

export interface ElectricCurrentMeasure {
  _: Measure;
  Uom: ElectricCurrentUom;
}

export type ElectricCurrentUom =
  | "A"
  | "cA"
  | "dA"
  | "EA"
  | "fA"
  | "GA"
  | "kA"
  | "mA"
  | "MA"
  | "nA"
  | "pA"
  | "TA"
  | "uA";

export interface ElectricFieldStrengthMeasure {
  _: Measure;
  Uom: ElectricFieldStrengthUom;
}

export type ElectricFieldStrengthUom =
  | "mV/ft"
  | "mV/m"
  | "uV/ft"
  | "uV/m"
  | "V/m";

export interface ElectricPotentialDifferenceMeasure {
  _: Measure;
  Uom: ElectricPotentialDifferenceUom;
}

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

export interface ElectricResistanceMeasure {
  _: Measure;
  Uom: ElectricResistanceUom;
}

export interface ElectricResistancePerLengthMeasure {
  _: Measure;
  Uom: ElectricResistancePerLengthUom;
}

export type ElectricResistancePerLengthUom = "ohm/m" | "uohm/ft" | "uohm/m";

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

export interface ElectromagneticMomentMeasure {
  _: Measure;
  Uom: ElectromagneticMomentUom;
}

export type ElectromagneticMomentUom = "A.m2";

export interface EnergyLengthPerAreaMeasure {
  _: Measure;
  Uom: EnergyLengthPerAreaUom;
}

export type EnergyLengthPerAreaUom = "J.m/m2" | "kcal[th].m/cm2";

export interface EnergyLengthPerTimeAreaTemperatureMeasure {
  _: Measure;
  Uom: EnergyLengthPerTimeAreaTemperatureUom;
}

export type EnergyLengthPerTimeAreaTemperatureUom =
  | "Btu[IT].in/(h.ft2.deltaF)"
  | "J.m/(s.m2.deltaK)"
  | "kJ.m/(h.m2.deltaK)"
  | "W/(m.deltaK)";

export interface EnergyMeasure {
  _: Measure;
  Uom: EnergyUom;
}

export interface EnergyPerAreaMeasure {
  _: Measure;
  Uom: EnergyPerAreaUom;
}

export type EnergyPerAreaUom =
  | "erg/cm2"
  | "J/cm2"
  | "J/m2"
  | "kgf.m/cm2"
  | "lbf.ft/in2"
  | "mJ/cm2"
  | "mJ/m2"
  | "N/m";

export interface EnergyPerLengthMeasure {
  _: Measure;
  Uom: EnergyPerLengthUom;
}

export type EnergyPerLengthUom = "J/m" | "MJ/m";

export interface EnergyPerMassMeasure {
  _: Measure;
  Uom: EnergyPerMassUom;
}

export interface EnergyPerMassPerTimeMeasure {
  _: Measure;
  Uom: EnergyPerMassPerTimeUom;
}

export type EnergyPerMassPerTimeUom =
  | "mrem/h"
  | "mSv/h"
  | "rem/h"
  | "Sv/h"
  | "Sv/s";

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

export interface EnergyPerVolumeMeasure {
  _: Measure;
  Uom: EnergyPerVolumeUom;
}

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
  | "Mcal[th]"
  | "mcal[th]"
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

export interface ForceAreaMeasure {
  _: Measure;
  Uom: ForceAreaUom;
}

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

export interface ForceLengthPerLengthMeasure {
  _: Measure;
  Uom: ForceLengthPerLengthUom;
}

export type ForceLengthPerLengthUom =
  | "kgf.m/m"
  | "lbf.ft/in"
  | "lbf.in/in"
  | "N.m/m"
  | "tonf[US].mi/ft";

export interface ForceMeasure {
  _: Measure;
  Uom: ForceUom;
}

export interface ForcePerForceMeasure {
  _: Measure;
  Uom: ForcePerForceUom;
}

export type ForcePerForceUom = "%" | "Euc" | "kgf/kgf" | "lbf/lbf" | "N/N";

export interface ForcePerLengthMeasure {
  _: Measure;
  Uom: ForcePerLengthUom;
}

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

export interface ForcePerVolumeMeasure {
  _: Measure;
  Uom: ForcePerVolumeUom;
}

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

export interface FrequencyIntervalMeasure {
  _: Measure;
  Uom: FrequencyIntervalUom;
}

export type FrequencyIntervalUom = "O";

export interface FrequencyMeasure {
  _: Measure;
  Uom: FrequencyUom;
}

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

export interface Hdf5Dataset extends BaseType {
  HdfProxy: DataObjectReference;
  /** The path of the referenced dataset in the HDF file.
   *
   * The separator between groups and final dataset is a slash '/' */
  PathInHdfFile: string;
  /** Optional content of the HDF5 dataset */
  _data?: {
    arrayType: number;
    dimensions: number[];
    uid: {
      uri: string;
      pathInResource: string;
    };
    data?: any;
  };
}

export interface HeatCapacityMeasure {
  _: Measure;
  Uom: HeatCapacityUom;
}

export type HeatCapacityUom = "J/deltaK";

export interface HeatFlowRateMeasure {
  _: Measure;
  Uom: HeatFlowRateUom;
}

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
  | "MW"
  | "mW"
  | "nW"
  | "quad/a"
  | "TJ/a"
  | "TW"
  | "ucal[th]/s"
  | "uW"
  | "W";

export interface HeatTransferCoefficientMeasure {
  _: Measure;
  Uom: HeatTransferCoefficientUom;
}

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

export interface IlluminanceMeasure {
  _: Measure;
  Uom: IlluminanceUom;
}

export type IlluminanceUom = "footcandle" | "klx" | "lm/m2" | "lx";

export interface InductanceMeasure {
  _: Measure;
  Uom: InductanceUom;
}

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

export interface IsothermalCompressibilityMeasure {
  _: Measure;
  Uom: IsothermalCompressibilityUom;
}

export type IsothermalCompressibilityUom =
  | "dm3/(kW.h)"
  | "dm3/MJ"
  | "m3/(kW.h)"
  | "m3/J"
  | "mm3/J"
  | "pt[UK]/(hp.h)";

export interface KinematicViscosityMeasure {
  _: Measure;
  Uom: KinematicViscosityUom;
}

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

export interface LengthMeasure {
  _: Measure;
  Uom: LengthUom;
}

export interface LengthPerLengthMeasure {
  _: Measure;
  Uom: LengthPerLengthUom;
}

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

export interface LengthPerMassMeasure {
  _: Measure;
  Uom: LengthPerMassUom;
}

export type LengthPerMassUom = "ft/lbm" | "m/kg";

export interface LengthPerPressureMeasure {
  _: Measure;
  Uom: LengthPerPressureUom;
}

export type LengthPerPressureUom = "ft/psi" | "m/kPa" | "m/Pa";

export interface LengthPerTemperatureMeasure {
  _: Measure;
  Uom: LengthPerTemperatureUom;
}

export type LengthPerTemperatureUom = "ft/deltaF" | "m/deltaK";

export interface LengthPerTimeMeasure {
  _: Measure;
  Uom: LengthPerTimeUom;
}

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

export interface LengthPerVolumeMeasure {
  _: Measure;
  Uom: LengthPerVolumeUom;
}

export type LengthPerVolumeUom =
  | "ft/bbl"
  | "ft/ft3"
  | "ft/gal[US]"
  | "km/dm3"
  | "km/L"
  | "m/m3"
  | "mi/gal[UK]"
  | "mi/gal[US]";

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
  | "Mm"
  | "mm"
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

export interface LightExposureMeasure {
  _: Measure;
  Uom: LightExposureUom;
}

export type LightExposureUom = "footcandle.s" | "lx.s";

export interface LinearAccelerationMeasure {
  _: Measure;
  Uom: LinearAccelerationUom;
}

export type LinearAccelerationUom =
  | "cm/s2"
  | "ft/s2"
  | "Gal"
  | "gn"
  | "in/s2"
  | "m/s2"
  | "mGal"
  | "mgn";

export interface LinearThermalExpansionMeasure {
  _: Measure;
  Uom: LinearThermalExpansionUom;
}

export type LinearThermalExpansionUom =
  | "1/deltaK"
  | "in/(in.deltaF)"
  | "m/(m.deltaK)"
  | "mm/(mm.deltaK)";

export interface LogarithmicPowerRatioMeasure {
  _: Measure;
  Uom: LogarithmicPowerRatioUom;
}

export interface LogarithmicPowerRatioPerLengthMeasure {
  _: Measure;
  Uom: LogarithmicPowerRatioPerLengthUom;
}

export type LogarithmicPowerRatioPerLengthUom =
  | "B/m"
  | "dB/ft"
  | "dB/km"
  | "dB/m";

export type LogarithmicPowerRatioUom = "B" | "dB";

export interface LuminanceMeasure {
  _: Measure;
  Uom: LuminanceUom;
}

export type LuminanceUom = "cd/m2";

export interface LuminousEfficacyMeasure {
  _: Measure;
  Uom: LuminousEfficacyUom;
}

export type LuminousEfficacyUom = "lm/W";

export interface LuminousFluxMeasure {
  _: Measure;
  Uom: LuminousFluxUom;
}

export type LuminousFluxUom = "lm";

export interface LuminousIntensityMeasure {
  _: Measure;
  Uom: LuminousIntensityUom;
}

export type LuminousIntensityUom = "cd" | "kcd";

export interface MagneticDipoleMomentMeasure {
  _: Measure;
  Uom: MagneticDipoleMomentUom;
}

export type MagneticDipoleMomentUom = "Wb.m";

export interface MagneticFieldStrengthMeasure {
  _: Measure;
  Uom: MagneticFieldStrengthUom;
}

export type MagneticFieldStrengthUom = "A/m" | "A/mm" | "Oe";

export interface MagneticFluxDensityMeasure {
  _: Measure;
  Uom: MagneticFluxDensityUom;
}

export interface MagneticFluxDensityPerLengthMeasure {
  _: Measure;
  Uom: MagneticFluxDensityPerLengthUom;
}

export type MagneticFluxDensityPerLengthUom = "gauss/cm" | "mT/dm" | "T/m";

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

export interface MagneticFluxMeasure {
  _: Measure;
  Uom: MagneticFluxUom;
}

export type MagneticFluxUom =
  | "cWb"
  | "dWb"
  | "EWb"
  | "fWb"
  | "GWb"
  | "kWb"
  | "MWb"
  | "mWb"
  | "nWb"
  | "pWb"
  | "TWb"
  | "uWb"
  | "Wb";

export interface MagneticPermeabilityMeasure {
  _: Measure;
  Uom: MagneticPermeabilityUom;
}

export type MagneticPermeabilityUom = "H/m" | "uH/m";

export interface MagneticVectorPotentialMeasure {
  _: Measure;
  Uom: MagneticVectorPotentialUom;
}

export type MagneticVectorPotentialUom = "Wb/m" | "Wb/mm";

export interface MassLengthMeasure {
  _: Measure;
  Uom: MassLengthUom;
}

export type MassLengthUom = "kg.m" | "lbm.ft";

export interface MassMeasure {
  _: Measure;
  Uom: MassUom;
}

export interface MassPerAreaMeasure {
  _: Measure;
  Uom: MassPerAreaUom;
}

export type MassPerAreaUom =
  | "0.01 lbm/ft2"
  | "kg/m2"
  | "lbm/ft2"
  | "Mg/m2"
  | "ton[US]/ft2";

export interface MassPerEnergyMeasure {
  _: Measure;
  Uom: MassPerEnergyUom;
}

export type MassPerEnergyUom =
  | "kg/(kW.h)"
  | "kg/J"
  | "kg/MJ"
  | "lbm/(hp.h)"
  | "mg/J";

export interface MassPerLengthMeasure {
  _: Measure;
  Uom: MassPerLengthUom;
}

export type MassPerLengthUom =
  | "kg.m/cm2"
  | "kg/m"
  | "klbm/in"
  | "lbm/ft"
  | "Mg/in";

export interface MassPerMassMeasure {
  _: Measure;
  Uom: MassPerMassUom;
}

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

export interface MassPerTimeMeasure {
  _: Measure;
  Uom: MassPerTimeUom;
}

export interface MassPerTimePerAreaMeasure {
  _: Measure;
  Uom: MassPerTimePerAreaUom;
}

export type MassPerTimePerAreaUom =
  | "g.ft/(cm3.s)"
  | "g.m/(cm3.s)"
  | "kg/(m2.s)"
  | "kPa.s/m"
  | "lbm/(ft2.h)"
  | "lbm/(ft2.s)"
  | "MPa.s/m";

export interface MassPerTimePerLengthMeasure {
  _: Measure;
  Uom: MassPerTimePerLengthUom;
}

export type MassPerTimePerLengthUom =
  | "kg/(m.s)"
  | "lbm/(ft.h)"
  | "lbm/(ft.s)"
  | "Pa.s";

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

export interface MassPerVolumeMeasure {
  _: Measure;
  Uom: MassPerVolumeUom;
}

export interface MassPerVolumePerLengthMeasure {
  _: Measure;
  Uom: MassPerVolumePerLengthUom;
}

export type MassPerVolumePerLengthUom =
  | "g/cm4"
  | "kg/dm4"
  | "kg/m4"
  | "lbm/(gal[UK].ft)"
  | "lbm/(gal[US].ft)"
  | "lbm/ft4"
  | "Pa.s2/m3";

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

/** This defines the maximum acceptable length of a
 * string that can be stored in a data base. */
export type MaximumLengthString = string;

/** The intended abstract supertype of all quantities that have a value
 * with a unit of measure. The unit of measure is in the uom attribute of the subtypes.
 * This type allows all quantities to be profiled to be a 'float' instead of a 'double'. */
export type Measure = number;

export interface MobilityMeasure {
  _: Measure;
  Uom: MobilityUom;
}

export type MobilityUom =
  | "D/(Pa.s)"
  | "D/cP"
  | "mD.ft2/(lbf.s)"
  | "mD.in2/(lbf.s)"
  | "mD/(Pa.s)"
  | "mD/cP"
  | "TD[API]/(Pa.s)";

export interface MolarEnergyMeasure {
  _: Measure;
  Uom: MolarEnergyUom;
}

export type MolarEnergyUom =
  | "Btu[IT]/lbmol"
  | "J/mol"
  | "kcal[th]/mol"
  | "kJ/kmol"
  | "MJ/kmol";

export interface MolarHeatCapacityMeasure {
  _: Measure;
  Uom: MolarHeatCapacityUom;
}

export type MolarHeatCapacityUom =
  | "Btu[IT]/(lbmol.deltaF)"
  | "cal[th]/(mol.deltaC)"
  | "J/(mol.deltaK)"
  | "kJ/(kmol.deltaK)";

export interface MolarVolumeMeasure {
  _: Measure;
  Uom: MolarVolumeUom;
}

export type MolarVolumeUom =
  | "dm3/kmol"
  | "ft3/lbmol"
  | "L/kmol"
  | "L/mol"
  | "m3/kmol"
  | "m3/mol";

export interface MolecularWeightMeasure {
  _: Measure;
  Uom: MolecularWeightUom;
}

export type MolecularWeightUom = "g/mol" | "kg/mol" | "lbm/lbmol";

export interface MomentOfForceMeasure {
  _: Measure;
  Uom: MomentOfForceUom;
}

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

export interface MomentOfInertiaMeasure {
  _: Measure;
  Uom: MomentOfInertiaUom;
}

export type MomentOfInertiaUom = "kg.m2" | "lbm.ft2";

export interface MomentumMeasure {
  _: Measure;
  Uom: MomentumUom;
}

export type MomentumUom = "kg.m/s" | "lbm.ft/s";

/** The intended abstract supertype of all user assigned human recognizable contextual name types.
 *
 * There should be no assumption that (interoperable) semantic information will be extracted from the name by a third party.
 *
 * This type of value is generally not guaranteed to be unique and is not a candidate to be replaced by an enumeration. */
export type NameString = string;

export interface NormalizedPowerMeasure {
  _: Measure;
  Uom: NormalizedPowerUom;
}

export type NormalizedPowerUom = "B.W" | "dB.MW" | "dB.mW" | "dB.W";

/** It defines a proxy for external part of the EPC package. It must be used at least for external HDF parts. */
export interface obj_EpcExternalPartReference extends AbstractCitedDataObject {
  /** IAMF registered, if one exists, or a free text field. Needs documentation on seismic especially.
   *
   * MIME type for HDF proxy is : application/x-hdf5 (by RESQML convention). */
  MimeType: string;
}

export interface ObjectAlias extends BaseType {
  Authority?: string;
  Description?: string;
  Identifier: string;
}

export interface PermeabilityLengthMeasure {
  _: Measure;
  Uom: PermeabilityLengthUom;
}

export type PermeabilityLengthUom =
  | "D.ft"
  | "D.m"
  | "mD.ft"
  | "mD.m"
  | "TD[API].m";

export interface PermeabilityRockMeasure {
  _: Measure;
  Uom: PermeabilityRockUom;
}

export type PermeabilityRockUom = "D" | "D[API]" | "mD" | "TD[API]";

export interface PermittivityMeasure {
  _: Measure;
  Uom: PermittivityUom;
}

export type PermittivityUom = "F/m" | "uF/m";

export interface PlaneAngleMeasure {
  _: Measure;
  Uom: PlaneAngleUom;
}

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

export interface PotentialDifferencePerPowerDropMeasure {
  _: Measure;
  Uom: PotentialDifferencePerPowerDropUom;
}

export type PotentialDifferencePerPowerDropUom = "V/B" | "V/dB";

export interface PowerMeasure {
  _: Measure;
  Uom: PowerUom;
}

export interface PowerPerAreaMeasure {
  _: Measure;
  Uom: PowerPerAreaUom;
}

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

export interface PowerPerPowerMeasure {
  _: Measure;
  Uom: PowerPerPowerUom;
}

export type PowerPerPowerUom = "%" | "Btu[IT]/(hp.h)" | "Euc" | "W/kW" | "W/W";

export interface PowerPerVolumeMeasure {
  _: Measure;
  Uom: PowerPerVolumeUom;
}

export type PowerPerVolumeUom =
  | "Btu[IT]/(h.ft3)"
  | "Btu[IT]/(s.ft3)"
  | "cal[th]/(h.cm3)"
  | "cal[th]/(s.cm3)"
  | "hp/ft3"
  | "kW/m3"
  | "uW/m3"
  | "W/m3";

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

export interface PressureMeasure {
  _: Measure;
  Uom: PressureUom;
}

export interface PressurePerTimeMeasure {
  _: Measure;
  Uom: PressurePerTimeUom;
}

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

export interface PressurePerVolumeMeasure {
  _: Measure;
  Uom: PressurePerVolumeUom;
}

export type PressurePerVolumeUom = "Pa/m3" | "psi2.d/(cP.ft3)";

export interface PressureSquaredMeasure {
  _: Measure;
  Uom: PressureSquaredUom;
}

export interface PressureSquaredPerForceTimePerAreaMeasure {
  _: Measure;
  Uom: PressureSquaredPerForceTimePerAreaUom;
}

export type PressureSquaredPerForceTimePerAreaUom =
  | "0.001 kPa2/cP"
  | "bar2/cP"
  | "kPa2/cP"
  | "Pa2/(Pa.s)"
  | "psi2/cP";

export type PressureSquaredUom =
  | "bar2"
  | "GPa2"
  | "kPa2"
  | "kpsi2"
  | "Pa2"
  | "psi2";

export interface PressureTimePerVolumeMeasure {
  _: Measure;
  Uom: PressureTimePerVolumeUom;
}

export type PressureTimePerVolumeUom = "Pa.s/m3" | "psi.d/bbl";

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

/** This is the Energistics encapsulation of the ProjectedCrs type from GML. */
export interface ProjectedCrs extends AbstractCitedDataObject {
  uom?: LengthUom;
  AbstractProjectedCrs: AbstractProjectedCrs;
  AxisOrder: AxisOrder2d;
}

/** This is the Energistics encapsulation of the ProjectedCrs type from GML. */
export interface ProjectedCrsEpsgCode extends AbstractProjectedCrs {
  EpsgCode: number;
}

/** This is the Energistics encapsulation of the ProjectedCrs type from GML. */
export interface ProjectedUnknownCrs extends AbstractProjectedCrs {
  Unknown: string;
}

export interface QuantityOfLightMeasure {
  _: Measure;
  Uom: QuantityOfLightUom;
}

export type QuantityOfLightUom = "lm.s";

export interface RadianceMeasure {
  _: Measure;
  Uom: RadianceUom;
}

export type RadianceUom = "W/(m2.sr)";

export interface RadiantIntensityMeasure {
  _: Measure;
  Uom: RadiantIntensityUom;
}

export type RadiantIntensityUom = "W/sr";

export interface ReciprocalAreaMeasure {
  _: Measure;
  Uom: ReciprocalAreaUom;
}

export type ReciprocalAreaUom = "1/ft2" | "1/km2" | "1/m2" | "1/mi2";

export interface ReciprocalElectricPotentialDifferenceMeasure {
  _: Measure;
  Uom: ReciprocalElectricPotentialDifferenceUom;
}

export type ReciprocalElectricPotentialDifferenceUom = "1/uV" | "1/V";

export interface ReciprocalForceMeasure {
  _: Measure;
  Uom: ReciprocalForceUom;
}

export type ReciprocalForceUom = "1/lbf" | "1/N";

export interface ReciprocalLengthMeasure {
  _: Measure;
  Uom: ReciprocalLengthUom;
}

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

export interface ReciprocalMassMeasure {
  _: Measure;
  Uom: ReciprocalMassUom;
}

export interface ReciprocalMassTimeMeasure {
  _: Measure;
  Uom: ReciprocalMassTimeUom;
}

export type ReciprocalMassTimeUom = "1/(kg.s)" | "Bq/kg" | "pCi/g";

export type ReciprocalMassUom = "1/g" | "1/kg" | "1/lbm";

export interface ReciprocalPressureMeasure {
  _: Measure;
  Uom: ReciprocalPressureUom;
}

export type ReciprocalPressureUom =
  | "1/bar"
  | "1/kPa"
  | "1/Pa"
  | "1/pPa"
  | "1/psi"
  | "1/upsi";

export interface ReciprocalTimeMeasure {
  _: Measure;
  Uom: ReciprocalTimeUom;
}

export type ReciprocalTimeUom =
  | "1/a"
  | "1/d"
  | "1/h"
  | "1/min"
  | "1/ms"
  | "1/s"
  | "1/us"
  | "1/wk";

export interface ReciprocalVolumeMeasure {
  _: Measure;
  Uom: ReciprocalVolumeUom;
}

export type ReciprocalVolumeUom =
  | "1/bbl"
  | "1/ft3"
  | "1/gal[UK]"
  | "1/gal[US]"
  | "1/L"
  | "1/m3";

export interface ReluctanceMeasure {
  _: Measure;
  Uom: ReluctanceUom;
}

export type ReluctanceUom = "1/H";

export interface SecondMomentOfAreaMeasure {
  _: Measure;
  Uom: SecondMomentOfAreaUom;
}

export type SecondMomentOfAreaUom = "cm4" | "in4" | "m4";

export interface SignalingEventPerTimeMeasure {
  _: Measure;
  Uom: SignalingEventPerTimeUom;
}

export type SignalingEventPerTimeUom = "Bd";

export interface SolidAngleMeasure {
  _: Measure;
  Uom: SolidAngleUom;
}

export type SolidAngleUom = "sr";

export interface SpecificHeatCapacityMeasure {
  _: Measure;
  Uom: SpecificHeatCapacityUom;
}

export type SpecificHeatCapacityUom =
  | "Btu[IT]/(lbm.deltaF)"
  | "Btu[IT]/(lbm.deltaR)"
  | "cal[th]/(g.deltaK)"
  | "J/(g.deltaK)"
  | "J/(kg.deltaK)"
  | "kcal[th]/(kg.deltaC)"
  | "kJ/(kg.deltaK)"
  | "kW.h/(kg.deltaC)";

/** The intended abstract supertype of all strings. This abstract type allows the control over whitespace for all strings to be defined at a high level. This type should not be used directly except to derive another type. */
export type String = string;

export interface TemperatureIntervalMeasure {
  _: Measure;
  Uom: TemperatureIntervalUom;
}

export interface TemperatureIntervalPerLengthMeasure {
  _: Measure;
  Uom: TemperatureIntervalPerLengthUom;
}

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

export interface TemperatureIntervalPerPressureMeasure {
  _: Measure;
  Uom: TemperatureIntervalPerPressureUom;
}

export type TemperatureIntervalPerPressureUom =
  | "deltaC/kPa"
  | "deltaF/psi"
  | "deltaK/Pa";

export interface TemperatureIntervalPerTimeMeasure {
  _: Measure;
  Uom: TemperatureIntervalPerTimeUom;
}

export type TemperatureIntervalPerTimeUom =
  | "deltaC/h"
  | "deltaC/min"
  | "deltaC/s"
  | "deltaF/h"
  | "deltaF/min"
  | "deltaF/s"
  | "deltaK/s";

export type TemperatureIntervalUom = "deltaC" | "deltaF" | "deltaK" | "deltaR";

export interface ThermalConductanceMeasure {
  _: Measure;
  Uom: ThermalConductanceUom;
}

export type ThermalConductanceUom = "W/deltaK";

export interface ThermalConductivityMeasure {
  _: Measure;
  Uom: ThermalConductivityUom;
}

export type ThermalConductivityUom =
  | "Btu[IT]/(h.ft.deltaF)"
  | "cal[th]/(h.cm.deltaC)"
  | "cal[th]/(s.cm.deltaC)"
  | "kcal[th]/(h.m.deltaC)"
  | "W/(m.deltaK)";

export interface ThermalDiffusivityMeasure {
  _: Measure;
  Uom: ThermalDiffusivityUom;
}

export type ThermalDiffusivityUom =
  | "cm2/s"
  | "ft2/h"
  | "ft2/s"
  | "in2/s"
  | "m2/h"
  | "m2/s"
  | "mm2/s";

export interface ThermalInsulanceMeasure {
  _: Measure;
  Uom: ThermalInsulanceUom;
}

export type ThermalInsulanceUom =
  | "deltaC.m2.h/kcal[th]"
  | "deltaF.ft2.h/Btu[IT]"
  | "deltaK.m2/kW"
  | "deltaK.m2/W";

export interface ThermalResistanceMeasure {
  _: Measure;
  Uom: ThermalResistanceUom;
}

export type ThermalResistanceUom = "deltaK/W";

export interface ThermodynamicTemperatureMeasure {
  _: Measure;
  Uom: ThermodynamicTemperatureUom;
}

export type ThermodynamicTemperatureUom = "degC" | "degF" | "degR" | "K";

export interface TimeMeasure {
  _: Measure;
  Uom: TimeUom;
}

export interface TimePerLengthMeasure {
  _: Measure;
  Uom: TimePerLengthUom;
}

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

export interface TimePerMassMeasure {
  _: Measure;
  Uom: TimePerMassUom;
}

export type TimePerMassUom = "s/kg";

export interface TimePerTimeMeasure {
  _: Measure;
  Uom: TimePerTimeUom;
}

export type TimePerTimeUom = "%" | "Euc" | "ms/s" | "s/s";

export interface TimePerVolumeMeasure {
  _: Measure;
  Uom: TimePerVolumeUom;
}

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

/** The intended abstract supertype of all enumerated "types". This abstract type allows the maximum length of a type enumeration to be centrally defined. This type should not be used directly except to derive another type. It should also be used for uncontrolled strings which are candidates to become enumerations at a future date. */
export type TypeEnum = string;

/** The intended abstract supertype of all locally unique identifiers.
 * The value is not intended to convey any semantic content (e.g., it may be computer generated).
 * The value is only required to be unique within a context in a document (e.g., defined via key and keyref).
 * There is no guarantee that the same data in multiple documents will utilize the same uid value
 * unless enforced by the source of the document (e.g., a document server).
 * Spaces are not allowed. */
export type UidString = string;

/** The intended abstract supertype of all "units of measure".
 * This abstract type allows the maximum length of a UOM enumeration to be centrally defined.
 * This type is abstract in the sense that it should not be used directly
 * except to derive another type. */
export type UomEnum = string;

export type UuidString = string;

/** The units of measure that are valid for vertical gravity based coordinates (i.e., elevation or vertical depth). */
export type VerticalCoordinateUom = "m" | "ft" | "ftUS" | "ftBr(65)";

export interface VerticalCrs extends AbstractCitedDataObject {
  Uom: LengthUom;
  AbstractVerticalCrs: AbstractVerticalCrs;
  Direction: VerticalDirection;
}

/** This is the Energistics encapsulation of the ProjectedCrs type from GML. */
export interface VerticalCrsEpsgCode extends AbstractVerticalCrs {
  EpsgCode: number;
}

export type VerticalDirection = "up" | "down";

/** This is the Energistics encapsulation of the ProjectedCrs type from GML. */
export interface VerticalUnknownCrs extends AbstractVerticalCrs {
  Unknown: string;
}

export interface VolumeFlowRatePerVolumeFlowRateMeasure {
  _: Measure;
  Uom: VolumeFlowRatePerVolumeFlowRateUom;
}

export type VolumeFlowRatePerVolumeFlowRateUom =
  | "%"
  | "(bbl/d)/(bbl/d)"
  | "(m3/d)/(m3/d)"
  | "(m3/s)/(m3/s)"
  | "1E6 (ft3/d)/(bbl/d)"
  | "Euc";

export interface VolumeMeasure {
  _: Measure;
  Uom: VolumeUom;
}

export interface VolumePerAreaMeasure {
  _: Measure;
  Uom: VolumePerAreaUom;
}

export type VolumePerAreaUom =
  | "1E6 bbl/acre"
  | "bbl/acre"
  | "ft3/ft2"
  | "m3/m2";

export interface VolumePerLengthMeasure {
  _: Measure;
  Uom: VolumePerLengthUom;
}

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

export interface VolumePerMassMeasure {
  _: Measure;
  Uom: VolumePerMassUom;
}

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

export interface VolumePerPressureMeasure {
  _: Measure;
  Uom: VolumePerPressureUom;
}

export type VolumePerPressureUom = "bbl/psi" | "m3/kPa" | "m3/Pa";

export interface VolumePerRotationMeasure {
  _: Measure;
  Uom: VolumePerRotationUom;
}

export type VolumePerRotationUom = "ft3/rad" | "m3/rad" | "m3/rev";

export interface VolumePerTimeLengthMeasure {
  _: Measure;
  Uom: VolumePerTimeLengthUom;
}

export type VolumePerTimeLengthUom = "1000 bbl.ft/d" | "1000 m4/d" | "m4/s";

export interface VolumePerTimeMeasure {
  _: Measure;
  Uom: VolumePerTimeUom;
}

export interface VolumePerTimePerAreaMeasure {
  _: Measure;
  Uom: VolumePerTimePerAreaUom;
}

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

export interface VolumePerTimePerLengthMeasure {
  _: Measure;
  Uom: VolumePerTimePerLengthUom;
}

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

export interface VolumePerTimePerPressureLengthMeasure {
  _: Measure;
  Uom: VolumePerTimePerPressureLengthUom;
}

export type VolumePerTimePerPressureLengthUom =
  | "bbl/(ft.psi.d)"
  | "ft3/(ft.psi.d)"
  | "m2/(kPa.d)"
  | "m2/(Pa.s)";

export interface VolumePerTimePerPressureMeasure {
  _: Measure;
  Uom: VolumePerTimePerPressureUom;
}

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

export interface VolumePerTimePerTimeMeasure {
  _: Measure;
  Uom: VolumePerTimePerTimeUom;
}

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

export interface VolumePerTimePerVolumeMeasure {
  _: Measure;
  Uom: VolumePerTimePerVolumeUom;
}

export type VolumePerTimePerVolumeUom = "bbl/(d.acre.ft)" | "m3/(s.m3)";

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

export interface VolumePerVolumeMeasure {
  _: Measure;
  Uom: VolumePerVolumeUom;
}

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

export interface VolumetricHeatTransferCoefficientMeasure {
  _: Measure;
  Uom: VolumetricHeatTransferCoefficientUom;
}

export type VolumetricHeatTransferCoefficientUom =
  | "Btu[IT]/(h.ft3.deltaF)"
  | "Btu[IT]/(s.ft3.deltaF)"
  | "kW/(m3.deltaK)"
  | "W/(m3.deltaK)";

export interface VolumetricThermalExpansionMeasure {
  _: Measure;
  Uom: VolumetricThermalExpansionUom;
}

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

export interface document extends BaseType {
  /** Substitution group for contextual objects. */
  AbstractContextualObject: AbstractObject;
  EpcExternalPartReference: obj_EpcExternalPartReference;
}
export const document: document;
