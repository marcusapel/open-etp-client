import * as Primitive from "../../../xml-primitives";
import * as eml from "./commonv2";

// Source files:
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/DasAcquisition.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/DtsInstalledSystem.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/DtsInstrumentBox.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/DtsMeasurement.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/FiberOpticalPath.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/FlowTestActivity.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/FlowTestJob.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/FluidAnalysis.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/FluidCharacterization.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/FluidSample.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/FluidSampleAcquisitionJob.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/FluidSampleContainer.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/FluidSystem.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/PressureTransientAnalysis.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/ProdmlAllObjects.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/ProdmlCommon.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/ProductFlowModel.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/ProductVolume.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/ProductionOperation.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/PtaModels.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/PtaParameters.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/Report.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/ReportingEntity.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/SimpleProductVolume.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/TimeSeriesData.xsd
// http://lp-hou-ldenyhp.local:3001/prodml/v2.3/xsd_schemas/TimeSeriesStatistic.xsd

declare module "./commonv2" {
  export interface _AbstractDataObjectProxyType {
    AssetProductionVolumes?: AssetProductionVolumes;
    Channel?: Channel;
    ChannelSet?: ChannelSet;
    DasAcquisition?: DasAcquisition;
    DasInstrumentBox?: DasInstrumentBox;
    DtsInstalledSystem?: DtsInstalledSystem;
    DtsInstrumentBox?: DtsInstrumentBox;
    DtsMeasurement?: DtsMeasurement;
    Facility?: Facility;
    FiberOpticalPath?: FiberOpticalPath;
    FlowTestActivity?: FlowTestActivity;
    FlowTestJob?: FlowTestJob;
    FluidAnalysis?: FluidAnalysis;
    FluidCharacterization?: FluidCharacterization;
    FluidSample?: FluidSample;
    FluidSampleAcquisitionJob?: FluidSampleAcquisitionJob;
    FluidSampleContainer?: FluidSampleContainer;
    FluidSystem?: FluidSystem;
    HydrocarbonAnalysis?: HydrocarbonAnalysis;
    OTDRAcquisition?: OTDRAcquisition;
    PressureTransientAnalysis?: PressureTransientAnalysis;
    ProductFlowModel?: ProductFlowModel;
    ProductionOperation?: ProductionOperation;
    ProductionWellTests?: ProductionWellTests;
    ProductVolume?: ProductVolume;
    PtaDataPreProcess?: PtaDataPreProcess;
    PtaDeconvolution?: PtaDeconvolution;
    ReportingEntity?: ReportingEntity;
    ReportingHierarchy?: ReportingHierarchy;
    TerminalLifting?: TerminalLifting;
    TimeSeriesData?: TimeSeriesData;
    TimeSeriesStatistic?: TimeSeriesStatistic;
    Transfer?: Transfer;
    WaterAnalysis?: WaterAnalysis;
    WellProductionParameters?: WellProductionParameters;
  }
  export interface _AbstractContextualObjectProxyType {
    Report?: Report;
  }
}
interface BaseType {
  _exists: boolean;
  _namespace: string;
  $type?: string;
}
/** Forces a choice between pressure analysis (PTA) with flow as a boundary condition, and flowrate analysis (RTA) with pressure as a boundary condition. Applies to the measured data and to the simulation. */
interface _AbstractAnalysis extends BaseType {}
export interface AbstractAnalysis extends _AbstractAnalysis {}

/** Abstract class of attenuation measure. */
interface _AbstractAttenuationMeasure extends BaseType {}
export interface AbstractAttenuationMeasure
  extends _AbstractAttenuationMeasure {}

/** The abstract class of class. */
interface _AbstractCable extends BaseType {}
export interface AbstractCable extends _AbstractCable {}

/** Abstract class of compositional EoS model. */
interface _AbstractCompositionalEoSModel extends _AbstractCompositionalModel {}
export interface AbstractCompositionalEoSModel
  extends _AbstractCompositionalEoSModel {}

/** Abstract class of compositional model. */
interface _AbstractCompositionalModel extends _AbstractPvtModel {
  /** Binary interaction coefficient set. */
  BinaryInteractionCoefficientSet?: BinaryInteractionCoefficientSet;
  /** Component property set. */
  ComponentPropertySet?: ComponentPropertySet;
  /** The mixing rule which was applied in the compositional model. Enum. See mixing rule. */
  MixingRule?: MixingRule;
}
export interface AbstractCompositionalModel
  extends _AbstractCompositionalModel {}

/** Abstract class of compositional viscosity model. */
interface _AbstractCompositionalViscosityModel
  extends _AbstractCompositionalModel {
  /** The phase the compositional viscosity model applies to. */
  phase: ThermodynamicPhase;
}
export interface AbstractCompositionalViscosityModel
  extends _AbstractCompositionalViscosityModel {}

/** Abstract class of correlation gas viscosity model. */
interface _AbstractCorrelationGasViscosityModel
  extends _AbstractCorrelationViscosityModel {
  /** The gas viscosity output from the gas viscosity model. */
  GasViscosity?: eml.DynamicViscosityMeasure;
  /** The reservoir temperature for the gas viscosity model. */
  ReservoirTemperature?: eml.ThermodynamicTemperatureMeasure;
}
export interface AbstractCorrelationGasViscosityModel
  extends _AbstractCorrelationGasViscosityModel {}

/** Abstract class of correlation model. */
interface _AbstractCorrelationModel extends _AbstractPvtModel {}
export interface AbstractCorrelationModel extends _AbstractCorrelationModel {}

/** Abstract class of viscosity bubble point model. */
interface _AbstractCorrelationViscosityBubblePointModel
  extends _AbstractCorrelationViscosityModel {
  /** The bubble point viscosity output from the bubble point viscosity model. */
  BubblePointOilViscosity?: eml.DynamicViscosityMeasure;
  /** The dead oil viscosity input for the bubble point viscosity model. */
  DeadOilViscosity?: eml.DynamicViscosityMeasure;
  /** The solution gas oil ratio for the bubble point viscosity model. */
  SolutionGasOilRatio?: eml.VolumePerVolumeMeasure;
}
export interface AbstractCorrelationViscosityBubblePointModel
  extends _AbstractCorrelationViscosityBubblePointModel {}

/** Abstract class of correlation viscosity dead model. */
interface _AbstractCorrelationViscosityDeadModel
  extends _AbstractCorrelationViscosityModel {
  /** The dead oil viscosity output from the dead oil viscosity model. */
  DeadOilViscosity?: eml.DynamicViscosityMeasure;
  /** The reservoir temperature for the dead oil viscosity model. */
  ReservoirTemperature?: eml.ThermodynamicTemperatureMeasure;
}
export interface AbstractCorrelationViscosityDeadModel
  extends _AbstractCorrelationViscosityDeadModel {}

/** Abstract class of correlation viscosity  model. */
interface _AbstractCorrelationViscosityModel extends _AbstractCorrelationModel {
  /** The molecular weight of the fluid for the viscosity model. */
  MolecularWeight?: eml.MolecularWeightMeasure;
}
export interface AbstractCorrelationViscosityModel
  extends _AbstractCorrelationViscosityModel {}

/** Abstract class of viscosity under-saturated model. */
interface _AbstractCorrelationViscosityUndersaturatedModel
  extends _AbstractCorrelationViscosityModel {
  /** The bubble point viscosity input for the under saturated viscosity model. */
  BubblePointOilViscosity?: eml.DynamicViscosityMeasure;
  /** The bubble point pressure for the under saturated viscosity model. */
  BubblePointPressure?: eml.PressureMeasure;
  /** The pressure for the under saturated viscosity model. */
  Pressure?: eml.PressureMeasure;
  /** The under saturated viscosity output from the under saturated viscosity model. */
  UndersaturatedOilViscosity?: eml.DynamicViscosityMeasure;
}
export interface AbstractCorrelationViscosityUndersaturatedModel
  extends _AbstractCorrelationViscosityUndersaturatedModel {}

/** A reporting period that is different from the overall report period. For example, a particular day within a monthly report. This period must conform to the kind of interval. If one value from a pair are given, then both values must be given. */
interface _AbstractDateTimeClass extends BaseType {
  /** Date. */
  Date?: Date;
  /** DTime. */
  DTime?: eml.TimeStamp;
  /** Month. */
  Month?: CalendarMonth;
}
export interface AbstractDateTimeClass extends _AbstractDateTimeClass {}

/** Forces a choice between: in some deconvolution methods, multiple individual deconvolution outputs are generated, each specific to a corresponding individual Test Period. In such cases multiple instances of the deconvolutionOutput element will recur. In other cases, there will be only one such output across all Test Periods. */
interface _AbstractDeconvolutionOutput extends BaseType {}
export interface AbstractDeconvolutionOutput
  extends _AbstractDeconvolutionOutput {}

/** The Abstract base type of disposition. */
interface _AbstractDisposition extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The amount of product to which this disposition applies. */
  DispositionQuantity?: AbstractProductQuantity[];
  /** A unique disposition code associated within a given naming system. This may be a code specified by a regulatory agency. */
  ProductDispositionCode?: eml.AuthorityQualifiedName;
  /** Quantity method. */
  QuantityMethod: QuantityMethodExt;
  /** A descriptive remark relating to this disposition. */
  Remark?: eml.String2000;
}
export interface AbstractDisposition extends _AbstractDisposition {}

/** The abstract class of equipment in the optical path from which all components in the optical path inherit. */
interface _AbstractDtsEquipment extends BaseType {
  /** A descriptive remark about the equipment (e.g., optical fiber). */
  Comment?: eml.String2000;
  /** The manufacturer for this item of equipment. */
  Manufacturer?: eml.String64;
  /** Date when the equipment (e.g., instrument box) was manufactured. */
  ManufacturingDate?: Date;
  /** The DTS instrument equipment name. */
  Name: eml.String64;
  /** Latest known version of the software/firmware that is running in the equipment */
  SoftwareVersion?: eml.String64;
  /** Contact details for the company/person supplying the equipment. */
  Supplier?: eml.DataObjectReference;
  /** The model number (alphanumeric) that is used by the supplier to reference the type of fiber that is supplied to the user. */
  SupplierModelNumber?: eml.String64;
  /** The date on which this fiber segment was supplied. */
  SupplyDate?: Date;
  /** The type of equipment. This might include the model type. */
  Type?: eml.String64;
}
export interface AbstractDtsEquipment extends _AbstractDtsEquipment {}

/** The abstract base type of FiberFacility. */
interface _AbstractFiberFacility extends BaseType {}
export interface AbstractFiberFacility extends _AbstractFiberFacility {}

/** The abstract class of flow test data from which all flow data components inherit. */
interface _AbstractFlowTestData extends BaseType {
  /** The unique identifier of this Flow Test Data. */
  uid?: eml.String64;
  /** A grouping of channels with a compatible index, for some purpose. Each channel has its own index. A ‘compatible’ index simply means that all of the channels are either in time or in depth using a common datum. */
  ChannelSet: eml.DataObjectReference;
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
  /** The Channel containing the Time data. */
  TimeChannel: eml.DataObjectReference;
  /** .The representation of the points in the time series data: Point By Point meaning instantaneous measurements, or Stepwise Value At End Of Period meaning that the value reported has applied from the previous point up to the time reported. */
  TimeSeriesPointRepresentation?: TimeSeriesPointRepresentation;
}
export interface AbstractFlowTestData extends _AbstractFlowTestData {}

/** The Abstract base type of FluidComponent. */
interface _AbstractFluidComponent extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** This element can be used where a measurement for a concentration is only capable of a “yes/no” type accuracy. Values can be ADL (meaning the measurement was Above Detectable Limits) or BDL (meaning the measurement was Below Detectable Limits). If the condition is “ADL” then the concentration as reported in Mass Fraction or Mole Fraction is expected to represent the maximum value which can be distinguished (so that we know the actual value to be equal to or greater than that). If the condition is “BDL” then the concentration as reported in Mass Fraction or Mole Fraction is expected to represent the minimum value which can be distinguished (so that we know the actual value to be equal to or less than that). */
  ConcentrationRelativeToDetectableLimits?: DetectableLimitRelativeStateKind;
  /** The fluid mass fraction. */
  MassFraction?: eml.MassPerMassMeasure;
  /** The fluid mole fraction. */
  MoleFraction?: eml.AmountOfSubstancePerAmountOfSubstanceMeasure;
  VolumeConcentration?: eml.MassPerVolumeMeasureExt;
}
export interface AbstractFluidComponent extends _AbstractFluidComponent {}

/** The abstract class of Gas Produced Ratio Volume. */
interface _AbstractGasProducedRatioVolume extends BaseType {}
export interface AbstractGasProducedRatioVolume
  extends _AbstractGasProducedRatioVolume {}

/** Provide either the liquid volume, or the liquid dropout percent, which is the liquid volume divided by the total volume. */
interface _AbstractLiquidDropoutPercVolume extends BaseType {}
export interface AbstractLiquidDropoutPercVolume
  extends _AbstractLiquidDropoutPercVolume {}

/** The abstract base type of measure data. */
interface _AbstractMeasureData extends BaseType {}
export interface AbstractMeasureData extends _AbstractMeasureData {}

/** The abstract class of model section that forces a choice between a wellbore base or a reservoir base. */
interface _AbstractModelSection extends BaseType {
  /** The method used for this section of the results. Text description. No semantic meaning. */
  Comment?: eml.String2000;
  /** The method used for this section of the results. Text description. No semantic meaning. */
  Method?: eml.String64;
}
export interface AbstractModelSection extends _AbstractModelSection {}

/** The abstract class of oil volume shrinkage. */
interface _AbstractOilVolShrinkage extends BaseType {}
export interface AbstractOilVolShrinkage extends _AbstractOilVolShrinkage {}

/** Abstract for a single parameter relating to a pressure transient analysis. Collected together in Result Section Models. Eg, all the parameters needed for a closed boundary model will be found in the ClosedRectangleModel. */
interface _AbstractParameter extends BaseType {
  /** Unique identifier for this instance of the object. */
  Uid: eml.String64;
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
  /** This is a reference to a different Result, which is the source for this parameter. It therefore only applies when the Direction is "input". Example: an estimate for permeability may be obtained in one result and then used as input to constrain a second result, such as one estimating distance to a fault. In this case, the second result would show "input" direction for permeability parameter, and its SourceResultRefID would point to the first result from which permeability was obtained. */
  SourceResultRefID?: eml.String64;
}
export interface AbstractParameter extends _AbstractParameter {}

/** The Abstract base type of product quantity */
interface _AbstractProductQuantity extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The amount of product as a mass measure. */
  Mass?: eml.MassMeasure;
  /** Moles. */
  Moles?: eml.AmountOfSubstanceMeasure;
  /** The amount of product as a volume measure. */
  Volume?: eml.VolumeValue;
}
export interface AbstractProductQuantity extends _AbstractProductQuantity {}

/** Actual measured flow data */
interface _AbstractPtaFlowData extends _AbstractFlowTestData {
  /** The Channel containing the Flow data. */
  FlowChannel: eml.DataObjectReference;
  /** An enum of which phases are being measured by this flow data Channel. */
  FluidPhaseMeasuredKind?: FluidPhaseKind;
}
export interface AbstractPtaFlowData extends _AbstractPtaFlowData {}

/** The abstract class of pressure data from which all flow test data components inherit. */
interface _AbstractPtaPressureData extends _AbstractFlowTestData {
  /** The datum (which is an enum of type Datum in WITSML) from which the element PressureReferenceDepth is measured. */
  Datum?: eml.ReferencePointKind;
  /** A channel is a series of individual data points. A channel is comparable to a log curve; more generally, it is comparable to a tag in a process historian. Channels organize their data points according to one or more channel indexes, in this case, pressure. */
  PressureChannel: eml.DataObjectReference;
  /** A channel is a series of individual data points. A channel is comparable to a log curve; more generally, it is comparable to a tag in a process historian. Channels organize their data points according to one or more channel indexes, in this case, derived from another pressure channel. */
  PressureDerivativeChannel?: eml.DataObjectReference;
  /** A depth relative to a base or datum. */
  PressureReferenceDepth?: eml.LengthMeasure;
}
export interface AbstractPtaPressureData extends _AbstractPtaPressureData {}

/** Abstract class of  PVT model. */
interface _AbstractPvtModel extends BaseType {
  /** Custom PVT model extension. */
  CustomPvtModelExtension?: CustomPvtModelExtension;
  /** A collection of parameters. */
  PvtModelParameterSet?: PvtModelParameterSet;
}
export interface AbstractPvtModel extends _AbstractPvtModel {}

/** Forces a choice between a single flowrate and producing time, or a time series of rates, for the Rate History of a pressure transient result. */
interface _AbstractRateHistory extends BaseType {}
export interface AbstractRateHistory extends _AbstractRateHistory {}

/** A reference to a flow within the current product volume report. This represents a foreign key from one element to another. */
interface _AbstractRefProductFlow extends BaseType {}
export interface AbstractRefProductFlow extends _AbstractRefProductFlow {}

/** The abstract base type of related facility. */
interface _AbstractRelatedFacilityObject extends BaseType {
  FacilityParent: FacilityParent;
}
export interface AbstractRelatedFacilityObject
  extends _AbstractRelatedFacilityObject {}

/** The parent abstract class for any object that will be included in a regulatory report. Those objects must inherit from this abstract object. */
interface _AbstractSimpleProductVolume extends eml._AbstractObject {
  /** The date on which the report was approved. */
  ApprovalDate?: Date;
  /** Fluid component catalog. */
  FluidComponentCatalog?: FluidComponentCatalog;
  /** Geographic context for reporting entities. */
  GeographicContext?: GeographicContext;
  Operator?: eml.DataObjectReference;
  /** The condition-dependant measurements (e.g.,  volumes) in this transfer are taken to be measured at standard conditions.
   * The element is mandatory in all the SPVR objects.  A choice is available – either to supply the temperature and pressure for all the volumes that follow, or to choose from a list of standards organizations’ reference conditions. Note that the enum list of standard conditions is extensible, allowing for local measurement condition standards to be used */
  StandardConditions: eml.AbstractTemperaturePressure;
}
export interface AbstractSimpleProductVolume
  extends _AbstractSimpleProductVolume {}

/** The abstract base type of value. */
interface _AbstractValue extends BaseType {}
export interface AbstractValue extends _AbstractValue {}

/** Describes a straight line on any analysis plot. */
interface _AnalysisLine extends BaseType {
  /** The intercept of the line. */
  Intercept: number;
  /** The name of the line. */
  LineName: eml.String64;
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
  /** The slope of the line. */
  Slope: number;
}
export interface AnalysisLine extends _AnalysisLine {}

/** In a boundary model with two Intersecting Faults, the angle of intersection. 90 degress indicates two boundaries which are normal to each other. */
interface _AngleBetweenBoundaries extends _AbstractParameter {
  Abbreviation: eml.String64;
  Angle: eml.PlaneAngleMeasure;
}
export interface AngleBetweenBoundaries extends _AngleBetweenBoundaries {}

export type AnionKind =
  | "B(OH)4-"
  | "Br-"
  | "Cl-"
  | "CO3-2"
  | "F-"
  | "HCO3-"
  | "HS-"
  | "I-"
  | "NO2-"
  | "NO3-2"
  | "OH-"
  | "PO4-3"
  | "S-2"
  | "SO4-2";
interface _AnionKind extends eml._TypeEnum {
  _: AnionKind;
}

export type AnionKindExt = string;
type _AnionKindExt = Primitive._string;

/** Contains all volume data for all reporting entities (e.g., area, field, wells, etc.). Although named “volumes” in line with industry usage, different quantities may be reported, such as volume, mass, and energy content. */
interface _AssetProductionVolumes extends _AbstractSimpleProductVolume {
  /** The end date of report period. */
  EndDate: eml.TimeStamp;
  /** Nominal period. */
  NominalPeriod: ReportingDurationKindExt;
  /** Contains all the volumes for a single reporting entity. It contains a reference back to the reporting entity using its UUID for reference. */
  ReportingEntityVolumes?: ReportingEntityVolumes[];
  /** The start date of the reporting period. */
  StartDate: eml.TimeStamp;
}
export interface AssetProductionVolumes extends _AssetProductionVolumes {}

/** The flash test and compositional analysis. */
interface _AtmosphericFlashTestAndCompositionalAnalysis extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The average molecular weight of the sample for this test. */
  AvgMolecularWeight?: eml.MolecularWeightMeasure;
  /** The date when this test was performed. */
  Date?: Date;
  /** The density of the sample at the pressure and temperature conditions of this test. */
  DensityAtFlashFromPressureAndTemperature?: eml.MassPerVolumeMeasure;
  /** Flashed gas. */
  FlashedGas?: FlashedGas;
  /** Flashed liquid. */
  FlashedLiquid?: FlashedLiquid;
  /** This is the starting pressure for the sample having the Atmospheric Flash Test. */
  FlashFromPressure?: eml.PressureMeasure;
  /** This is the starting temperature for the sample having the Atmospheric Flash Test. */
  FlashFromTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The gas-oil ratio of the flash in this analysis. */
  FlashGOR?: eml.VolumePerVolumeMeasure;
  /** The pressure to which the sample is flashed in this analysis. This pressure may differ from the Standard Conditions at which the results are reported. Standard Conditions are reported for all the Analyses in the parent element FluidAnalysis. */
  FlashToPressure?: eml.AbstractPressureValue;
  /** The temperature to which the sample is flashed in this analysis. This temperature may differ from the Standard Conditions at which the results are reported. Standard Conditions are reported for all the Analyses in the parent element FluidAnalysis. */
  FlashToTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The formation volume factor for the oil (liquid) phase at the conditions of this test--volume at test conditions/volume at standard conditions. */
  OilFormationVolumeFactor?: eml.VolumePerVolumeMeasure;
  /** Overall composition. */
  OverallComposition?: OverallComposition;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** An integer number to identify this test in a sequence of tests. */
  TestNumber: eml.NonNegativeLong;
}
export interface AtmosphericFlashTestAndCompositionalAnalysis
  extends _AtmosphericFlashTestAndCompositionalAnalysis {}

/** The average pressure of the fluids in the reservoir layer. "Average" is taken to refer to "at the time at which the rate history used in the pressure transient analysis ends". */
interface _AveragePressure extends _AbstractParameter {
  Abbreviation: eml.String64;
  Pressure: eml.PressureMeasure;
}
export interface AveragePressure extends _AveragePressure {}

/** Specifies the types of destinations. */
export type BalanceDestinationType = "harbor" | "terminal" | "unknown";
interface _BalanceDestinationType extends eml._TypeEnum {
  _: BalanceDestinationType;
}

/** Specifies the types of events related to a product balance. */
export type BalanceEventKind =
  | "bill of lading"
  | "transaction date"
  | "unknown";
interface _BalanceEventKind extends eml._TypeEnum {
  _: BalanceEventKind;
}

/** Specifies the kinds of subdivisions of a flow related to the stock balance. */
export type BalanceFlowPart =
  | "adjusted closing"
  | "closing balance"
  | "closing storage inventory"
  | "completed lifting"
  | "gain/loss"
  | "input to storage"
  | "lifted"
  | "lifting entitlement"
  | "lifting entitlement remaining"
  | "linepack"
  | "opening balance"
  | "opflex"
  | "partial lifting"
  | "pipeline lifting"
  | "production - mass adjustment"
  | "production -- value adjustment"
  | "production imbalance"
  | "swap"
  | "tanker lifting"
  | "transaction"
  | "transfer"
  | "unknown";
interface _BalanceFlowPart extends eml._TypeEnum {
  _: BalanceFlowPart;
}

/** An estimate wind strength based on the Beaufort Wind Scale. Values range from 0 (calm) to 12 (hurricane). */
export type BeaufortScaleIntegerCode = number;
type _BeaufortScaleIntegerCode = Primitive._number;

/** Bergan And Sutton-Undersaturated. */
interface _BerganAndSuttonUndersaturated
  extends _AbstractCorrelationViscosityUndersaturatedModel {}
export interface BerganAndSuttonUndersaturated
  extends _BerganAndSuttonUndersaturated {}

/** BerganSutton-Dead. */
interface _BerganSuttonDead extends _AbstractCorrelationViscosityDeadModel {
  /** The dead oil viscosity at 100 f input to the dead oil viscosity model. */
  DeadOilViscosityAt100F?: eml.DynamicViscosityMeasure;
  /** The dead oil viscosity at 210 f input to the dead oil viscosity model. */
  DeadOilViscosityAt210F?: eml.DynamicViscosityMeasure;
}
export interface BerganSuttonDead extends _BerganSuttonDead {}

/** BergmanSutton-BubblePoint. */
interface _BergmanSuttonBubblePoint
  extends _AbstractCorrelationViscosityBubblePointModel {}
export interface BergmanSuttonBubblePoint extends _BergmanSuttonBubblePoint {}

/** Binary interaction coefficient. */
interface _BinaryInteractionCoefficient extends eml._AbstractMeasure {
  /** Reference to the first fluid component for this binary interaction coefficient. */
  fluidComponent1Reference: eml.String64;
  /** Reference to the second fluid component for this binary interaction coefficient. */
  fluidComponent2Reference?: eml.String64;
}
export interface BinaryInteractionCoefficient
  extends _BinaryInteractionCoefficient {}

/** Binary interaction coefficient set. */
interface _BinaryInteractionCoefficientSet extends BaseType {
  /** Binary interaction coefficient. */
  BinaryInteractionCoefficient: BinaryInteractionCoefficient[];
}
export interface BinaryInteractionCoefficientSet
  extends _BinaryInteractionCoefficientSet {}

export type Boundary1Type = "constant pressure" | "no-flow";
interface _Boundary1Type extends eml._TypeEnum {
  _: Boundary1Type;
}

export type Boundary2Type = "constant pressure" | "no-flow";
interface _Boundary2Type extends eml._TypeEnum {
  _: Boundary2Type;
}

export type Boundary3Type = "constant pressure" | "no-flow";
interface _Boundary3Type extends eml._TypeEnum {
  _: Boundary3Type;
}

export type Boundary4Type = "constant pressure" | "no-flow";
interface _Boundary4Type extends eml._TypeEnum {
  _: Boundary4Type;
}

/** Abstract boundary model from which the other types are derived. */
interface _BoundaryBaseModel extends _AbstractModelSection {
  PoreVolumeOfInvestigation?: PoreVolumeOfInvestigation;
  RadiusOfInvestigation?: RadiusOfInvestigation;
}
export interface BoundaryBaseModel extends _BoundaryBaseModel {}

/** Specifies the types of business units. */
export type BusinessUnitKind =
  | "businessarea"
  | "company"
  | "field"
  | "license"
  | "platform"
  | "terminal"
  | "unknown";
interface _BusinessUnitKind extends eml._TypeEnum {
  _: BusinessUnitKind;
}

/** Specifies the types of cable. */
export type CableKind =
  | "electrical-fiber-cable"
  | "multi-fiber-cable"
  | "single-fiber-cable";
interface _CableKind extends eml._TypeEnum {
  _: CableKind;
}

/** Specifies the calculation methods available for "filling in" values in an indexed set. */
export type CalculationMethod = "none" | "step wise constant" | "unknown";
interface _CalculationMethod extends eml._TypeEnum {
  _: CalculationMethod;
}

/** A month of a year (CCYY-MM). A time zone is not allowed. This type is meant to capture original invariant values. It is not intended to be used in "time math" where knowledge of the time zone is needed.@pattern ([1-9][0-9][0-9][0-9])-(([0][0-9])|([1][0-2])) */
export type CalendarMonth = string;
type _CalendarMonth = eml._String64;

/** A calendar year (CCYY) in the gregorian calendar. This type is meant to capture original invariant values. It is not intended to be used in "time math" where knowledge of the time zone is needed. */
export type CalendarYear = number;
type _CalendarYear = Primitive._number;

/** This object contains, for a single facility (defined by its parent Facility Calibration), a single Calibration, ie, details of the calibration process and results whereby each locus (an acquired data point along the fiber optical path) is mapped to a physical location in the facility.  It is common in DAS processing for such calibrations to be refined over time as further data become available.  Each such successive calibration can be described using an instance of this object. */
interface _Calibration extends BaseType {
  CalibrationInputPoint?: DasCalibrationInputPoint[];
  /** Date and time the Calibration was created in the source application or, if that information is not available, when it was saved to the file.
   *
   * This is the equivalent of the ISO 19115 CI_Date where the CI_DateTypeCode = ”creation"
   *
   * Format:
   * YYYY-MM-DDThh:mm:ssZ[+/-]hh:mm
   *
   * Legacy DCGroup - created */
  Creation?: eml.TimeStamp;
  /** Name (or other human-readable identifier) of the last person who updated the Calibration.
   *
   * This is the equivalent in ISO 19115 to the CI_Individual.name or the CI_Organization.name of the citedResponsibleParty whose role is "editor".
   *
   * Legacy DCGroup - contributor */
  Editor?: eml.String2000;
  /** This element records the length, which can be observed in the DAS data, between the last locus in a fiber optical path, and the end of the fiber. As such, this distance is a useful input to the calibration process. There will only be one such measurement along a fiber optical path, that on the last facility before the end of the fiber (eg at the bottom a wellbore, in the event that say a flowline and then a wellbore are being measured using the same fiber optical path). For this reason this element is optional. */
  LastLocusToEndOfFiber?: eml.LengthMeasure;
  /** Date and time the Calibration was last modified in the source application or, if that information is not available, when it was last saved to the format file.
   *
   * This is the equivalent of the ISO 19115 CI_Date where the CI_DateTypeCode = ”lastUpdate"
   *
   * Format:
   * YYYY-MM-DDThh:mm:ssZ[+/-]hh:mm
   *
   * Legacy DCGroup - modified */
  LastUpdate?: eml.TimeStamp;
  /** This array must have a compound data type consisting of three data types: LocusIndex (int64), OpticalPathDistance (float64), FacilityLength (float64) */
  LocusDepthPoint?: CompoundExternalArray;
  /** Name (or other human-readable identifier) of the person who initially originated the Calbration. If that information is not available, then this is the user who created the format file. The originator remains the same as the object is subsequently edited.
   *
   * This is the equivalent in ISO 19115 to the CI_Individual.name or the CI_Organization.name of the citedResponsibleParty whose role is "originator".
   *
   * Legacy DCGroup - author */
  Originator?: eml.String2000;
  /** If a OTDR (optical time domain reflectometry) survey is carried out, a top level object called OTDR Acquisition can be created to report the results.  In the event that such a survey is used as the input to a Calibration, then a Data Object Reference to that object can be inserted with this element. */
  OTDR?: eml.DataObjectReference;
  /** In the event that the facility kind is a pipeline, this element is used to record the datum from which facility (pipeline) length is referenced.  The type is a string since there is currently no standard enum for this type of data.  It is expected that the value would be a string to describe, eg one end of the pipe from which measurement is made. */
  PipelineDatum?: eml.String2000;
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
  /** In the event that the facility kind is a wellbore, this element is used to record the datum from which measured depth is referenced.  The type is WellboreDatumReference, an enum in the Energistics Common package (example value, kelly bushing). */
  WellboreDatum?: eml.ReferencePointKind;
}
export interface Calibration extends _Calibration {}

/** Parameters are given by name/ value pairs, with optional UOM. The parameter name and UOM are attributes, and the value is the value of the element. */
interface _CalibrationParameter extends BaseType {
  /** The name of the parameter. */
  name: eml.String64;
  /** The unit of measure of the parameter value. */
  uom?: eml.UomEnum;
}
export interface CalibrationParameter extends _CalibrationParameter {}

/** CarrDempsey. */
interface _CarrDempsey extends _AbstractCorrelationGasViscosityModel {
  /** The molecular weight of the gas as an input to this viscosity correlation. */
  GasMolarWeight?: eml.MolecularWeightMeasure;
  /** The gas viscosity at 1 atm for the viscosity correlation. */
  GasViscosityAt1Atm?: eml.DynamicViscosityMeasure;
  /** The pseudo reduced pressure for the viscosity correlation. */
  PseudoReducedPressure?: eml.PressurePerPressureMeasure;
  /** The pseudo reducedtemperature for the viscosity correlation. */
  PseudoReducedTemperature?: eml.ThermodynamicTemperaturePerThermodynamicTemperatureMeasure;
}
export interface CarrDempsey extends _CarrDempsey {}

export type CationKind =
  | "Al+3"
  | "B+3"
  | "Ba+2"
  | "Be+2"
  | "Ca+2"
  | "Cd+2"
  | "Co+2"
  | "Cr+3"
  | "Cu+2"
  | "Fe+2"
  | "Fe+3"
  | "K+"
  | "Li+"
  | "Mg+2"
  | "Mn+2"
  | "Mo+6"
  | "Na+"
  | "NH4+"
  | "Ni+2"
  | "P+3"
  | "Pb+2"
  | "Rb+1"
  | "Se+4"
  | "Si+4"
  | "Sn+4"
  | "Sr+2"
  | "Ti+4"
  | "Tl+1"
  | "V+2"
  | "Zn+2";
interface _CationKind extends eml._TypeEnum {
  _: CationKind;
}

export type CationKindExt = string;
type _CationKindExt = Primitive._string;

/** Changing wellbore storage model using the Fair model. */
interface _ChangingStorageFairModel extends _WellboreBaseModel {
  DeltaTimeStorageChanges: DeltaTimeStorageChanges;
  RatioInitialToFinalWellboreStorage: RatioInitialToFinalWellboreStorage;
}
export interface ChangingStorageFairModel extends _ChangingStorageFairModel {}

/** Changing wellbore storage model using the Hegeman model. */
interface _ChangingStorageHegemanModel extends _WellboreBaseModel {
  DeltaTimeStorageChanges: DeltaTimeStorageChanges;
  RatioInitialToFinalWellboreStorage: RatioInitialToFinalWellboreStorage;
}
export interface ChangingStorageHegemanModel
  extends _ChangingStorageHegemanModel {}

/** Changing wellbore storage model using the Spivey Packer model. */
interface _ChangingStorageSpiveyFissuresModel extends _WellboreBaseModel {
  LeakSkin: LeakSkin;
  RatioInitialToFinalWellboreStorage: RatioInitialToFinalWellboreStorage;
}
export interface ChangingStorageSpiveyFissuresModel
  extends _ChangingStorageSpiveyFissuresModel {}

/** Changing wellbore storage model using the Spivey Fissures model. */
interface _ChangingStorageSpiveyPackerModel extends _WellboreBaseModel {
  LeakSkin: LeakSkin;
  RatioInitialToFinalWellboreStorage: RatioInitialToFinalWellboreStorage;
}
export interface ChangingStorageSpiveyPackerModel
  extends _ChangingStorageSpiveyPackerModel {}

/** A channel is a series of individual data points. A channel is comparable to a log curve; more generally, it is comparable to a tag in a process historian. Channels organize their data points according to one or more channel indexes, like time or depth. */
interface _Channel extends eml._AbstractObject {}
export interface Channel extends _Channel {}

/** This choice should be made when the Rate History is a multiple rate history, ie a time series of flowrates. */
interface _ChannelFlowrateData extends _AbstractRateHistory {
  /** Flow data. */
  InputFlowrate: AbstractPtaFlowData;
}
export interface ChannelFlowrateData extends _ChannelFlowrateData {}

/** A grouping of channels with a compatible index, for some purpose. Each channel has its own index. A ‘compatible’ index simply means that all of the channels are either in time or in depth using a common datum. */
interface _ChannelSet extends eml._AbstractObject {
  Channel?: Channel[];
  /** The data blob in JSON form. This attribute lets you embed the bulk data in a single file with the xml, to avoid the issues that arise when splitting data across multiple files.
   * BUSINESS RULE: Either this element or the FileUri element must be present. */
  Data?: string[];
}
export interface ChannelSet extends _ChannelSet {}

/** Closed circle boundary model. */
interface _ClosedCircleModel extends _BoundaryBaseModel {
  Boundary1Type: Boundary1Type;
}
export interface ClosedCircleModel extends _ClosedCircleModel {}

/** Closed rectangle boundary model. Four faults bound the reservoir in a rectangular shape. */
interface _ClosedRectangleModel extends _BoundaryBaseModel {
  Boundary1Type: Boundary1Type;
  Boundary2Type: Boundary2Type;
  Boundary3Type: Boundary3Type;
  Boundary4Type: Boundary4Type;
  DistanceToBoundary1: DistanceToBoundary1;
  DistanceToBoundary2: DistanceToBoundary2;
  DistanceToBoundary3: DistanceToBoundary3;
  DistanceToBoundary4: DistanceToBoundary4;
  DrainageAreaMeasured?: DrainageAreaMeasured;
  OrientationOfNormalToBoundary1?: OrientationOfNormalToBoundary1;
  PoreVolumeMeasured?: PoreVolumeMeasured;
}
export interface ClosedRectangleModel extends _ClosedRectangleModel {}

/** Properties that are common to multiple structures in the product volume schema. */
interface _CommonPropertiesProductVolume extends BaseType {
  /** Absolute minimum pressure before the system will give an alarm. */
  AbsoluteMinPres?: eml.PressureMeasure;
  /** The average atmospheric pressure during the reporting period. */
  Atmosphere?: eml.PressureMeasure;
  /** Basic sediment and water is measured from a liquid sample of the production stream. It includes free water, sediment and emulsion and is measured as a volume percentage of the production stream. */
  Bsw?: eml.VolumePerVolumeMeasure;
  /** The basic sediment and water as measured on the previous reporting period (e.g., day). */
  BswPrevious?: eml.VolumePerVolumeMeasure;
  /** Basic sediment and water content in stabilized crude. */
  BswStabilizedCrude?: eml.VolumePerVolumeMeasure;
  /** The concentration of the product as a volume percentage of the product stream. */
  Concentration?: eml.VolumePerVolumeMeasure;
  /** The mass basis flow rate of the product. This is used for things like a sand component. */
  DensityFlowRate?: eml.MassPerTimeMeasure;
  /** The density of stabilized crude. */
  DensityStabilizedCrude?: eml.MassPerVolumeMeasure;
  /** A possibly temperature and pressure corrected desity value. */
  DensityValue?: eml.DensityValue[];
  /** The actual volume divided by the potential volume. */
  Efficiency?: eml.VolumePerVolumeMeasure;
  /** A possibly temperature and pressure corrected flow rate value. */
  FlowRateValue?: eml.FlowRateValue[];
  /** The volumetric ratio of gas to liquid for all products in the whole flow. */
  GasLiquidRatio?: eml.VolumePerVolumeMeasure;
  /** Gas oil ratio. The ratio between the total produced gas volume and the total produced oil volume including oil and gas volumes used on the installation. */
  Gor?: eml.VolumePerVolumeMeasure;
  /** Gas oil ratio month to date. The gas oil ratio from the beginning of the month to the end of the reporting period. */
  GorMTD?: eml.VolumePerVolumeMeasure;
  /** The amount of heat that would be released by the complete combustion in air of a specific quantity of product at standard temperature and pressure. */
  GrossCalorificValueStd?: eml.EnergyPerVolumeMeasure;
  /** The temperature at which the heavier hydrocarbons come out of solution. */
  HcDewpoint?: eml.ThermodynamicTemperatureMeasure;
  /** The mass of the product. */
  Mass?: eml.MassMeasure;
  /** The molar amount. */
  MoleAmt?: eml.AmountOfSubstanceMeasure;
  /** The molecular weight of the product. */
  MolecularWeight?: eml.MolecularWeightMeasure;
  /** The mole fraction of the product. */
  MolePercent?: eml.AmountOfSubstancePerAmountOfSubstanceMeasure;
  /** The internal differences between this port and one other port on this unit. */
  PortDiff?: ProductVolumePortDifference[];
  /** Pressure of the port. Specifying the pressure here (as opposed to in Period) implies that the pressure is constant for all periods of the flow. */
  Pres?: eml.PressureMeasure;
  /** Reid vapor pressure of the product. The absolute vapor pressure of volatile crude oil and volatile petroleum liquids, except liquefied petroleum gases, as determined in accordance with American Society for Testing and Materials under the designation ASTM D323-56. */
  Rvp?: eml.PressureMeasure;
  /** Reid vapor pressure of stabilized crude. */
  RvpStabilizedCrude?: eml.PressureMeasure;
  /** The specific gravity of the product. */
  Sg?: eml.DimensionlessMeasure;
  /** Temperature of the port. Specifying the temperature here (as opposed to in Period) implies that the temperature is constant for all periods of the flow. */
  Temp?: eml.ThermodynamicTemperatureMeasure;
  /** True vapor pressure of the product. The equilibrium partial pressure exerted by a petroleum liquid as determined in accordance with standard methods. */
  Tvp?: eml.PressureMeasure;
  /** A possibly temperature and pressure corrected volume value. */
  VolumeValue?: eml.VolumeValue[];
  /** Water concentration mass basis. The ratio of water produced compared to the mass of total liquids produced. */
  WaterConcMass?: eml.MassPerMassMeasure;
  /** Water concentration volume basis. The ratio of water produced compared to the mass of total liquids produced. */
  WaterConcVol?: eml.VolumePerVolumeMeasure;
  /** The temperature at which the first water comes out of solution. */
  WaterDewpoint?: eml.ThermodynamicTemperatureMeasure;
  /** The weight fraction of the product. */
  WeightPercent?: eml.MassPerMassMeasure;
  /** Indicator value of the interchangeability of fuel gases. */
  WobbeIndex?: eml.IsothermalCompressibilityMeasure;
  /** The electrical energy represented by the product. */
  Work?: eml.EnergyMeasure;
}
export interface CommonPropertiesProductVolume
  extends _CommonPropertiesProductVolume {}

/** Component property set. */
interface _ComponentPropertySet extends BaseType {
  /** The properties of a fluid component. */
  FluidComponentProperty: FluidComponentProperty[];
}
export interface ComponentPropertySet extends _ComponentPropertySet {}

/** A class that AbstractCompositionalModel can inherit; it is NOT abstract because the concrete model types have not been specified. For now, use the non-abstract thermal model, and use the CustomPvtModelExtension to add anything needed. Later, it will be made abstract and have concrete classes it inherits from, similar to EoS. */
interface _CompositionalThermalModel extends _AbstractCompositionalModel {}
export interface CompositionalThermalModel extends _CompositionalThermalModel {}

/** Three instances of the Columns element are used to provide the order of the columns of data in the associated Compound External Array. Each instance will contain one the three enum values: FacilityLength, LocusIndex, OpticalPathDistance, which make up the array. */
interface _CompoundExternalArray extends eml._AbstractValueArray {
  /** Specifies the ordering of the columns of a Calibration array in the HDF5 file. A Calibration array contains columns for the following quantities: Facility Length, Locus Index and Optical Path Distance. The order of these columns is flexible but is specified by this element. It comprises three values, each of which must be one of the values of the enum DasCalibrationColumn, which are the three quantities listed above. */
  Columns: DasCalibrationColumn[];
  /** Reference to an HDF5 dataset. */
  Values: eml.ExternalDataArray;
}
export interface CompoundExternalArray extends _CompoundExternalArray {}

export type CompressibilityKind = "average" | "point";
interface _CompressibilityKind extends eml._TypeEnum {
  _: CompressibilityKind;
}

/** Compressibility and saturation values */
interface _CompressibilityParameters extends BaseType {
  /** Formation Compressibility of the reservoir. */
  FormationCompressibility?: eml.ReciprocalPressureMeasureExt;
  /** Gas Phase Saturation in the reservoir. */
  GasPhaseSaturation?: eml.VolumePerVolumeMeasure;
  /** Oil Phase Saturation in the reservoir. */
  OilPhaseSaturation?: eml.VolumePerVolumeMeasure;
  /** Total system compressibility - formation compressibility + saturation-weighted fluid compressibilities. */
  TotalCompressibility?: eml.ReciprocalPressureMeasureExt;
  /** Water Phase Saturation in the reservoir. */
  WaterPhaseSaturation?: eml.VolumePerVolumeMeasure;
}
export interface CompressibilityParameters extends _CompressibilityParameters {}

/** Product Flow Connected Node Schema. */
interface _ConnectedNode extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** A descriptive remark associated with this connection, possibly including a reason for termination. */
  Comment?: eml.String2000;
  /** The date and time that the connection was terminated. */
  DTimEnd?: eml.TimeStamp;
  /** The date and time that the connection was activated. */
  DTimStart?: eml.TimeStamp;
  /** Defines the node to which this port is connected. Only two ports should be actively connected to the same node at the same point in time. That is, a port should only be connected to one other port. There are no semantics for the node except common connection. All ports that are connected to a node with the same name are inherently connected to each other. The name of the node is only required to be unique within the context of the current Product Flow Network (that is, not the overall model). All ports must be connected to a node and whether or not any other port is connected to the same node depends on the requirements of the network. Any node that is internally connected to only one node is presumably a candidate to be connected to an external node. The behavior of ports connected at a common node is as follows: a) There is no pressure drop across the node. All ports connected to the node have the same pressure. That is, there is an assumption of steady state fluid flow. b) Conservation of mass exists across the node. The mass into the node via all connected ports equals the mass out of the node via all connected ports. c) The flow direction of a port connected to the node may be transient. That is, flow direction may change toward any port if the relative internal pressure of the Product Flow Units change and a new steady state is achieved. */
  Node: eml.String64;
  /** The name of a network plan. This indicates a planned connection. The connected port must be part of the same plan or be an actual. Not specified indicates an actual connection. */
  PlanName?: eml.String64;
}
export interface ConnectedNode extends _ConnectedNode {}

/** The CCE test */
interface _ConstantCompositionExpansionTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Measured relative volume ratio measured volume/volume at Psat. */
  ConstantCompositionExpansionTestStep?: ConstantCompositionExpansionTestStep[];
  /** Volume reference for the measured liquid fraction in a constant composition expansion test. Referenced to liquid volume at saturation pressure (generally).
   * At each Test Step, Liquid Fraction is the liquid volume at this step divided by the reference volume at the conditions stated in this element. An actual volume at the reference conditions is optional. If the reference volume is the total volume at that test step (i.e., it varies per test step), then the value "test step" would be used. */
  LiquidFractionReference?: FluidVolumeReference[];
  /** Volume reference for the relative volume ratio in a constant composition expansion test. Referenced to liquid volume at saturation pressure (generally).
   * At each Test Step, Relative Volume Ratio is the total volume at this step divided by the reference volume at the conditions stated in this element. An actual volume at the reference conditions is optional. */
  RelativeVolumeReference?: FluidVolumeReference[];
  /** Expected to be a yes or no value to indicate if differential liberation/vaporization data are corrected to separator conditions/flash data or not. */
  Remark?: eml.String2000;
  /** The saturation (or bubble point) pressure measured in this test. */
  SaturationPressure?: SaturationPressure;
  /** A number for this test for purposes of e.g., tracking lab sequence. */
  TestNumber: eml.NonNegativeLong;
  /** The temperature of this test. */
  TestTemperature: eml.ThermodynamicTemperatureMeasure;
}
export interface ConstantCompositionExpansionTest
  extends _ConstantCompositionExpansionTest {}

/** The CCE test steps. */
interface _ConstantCompositionExpansionTestStep extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The fluid condition at this test step. Enum, see fluid analysis step condition. */
  FluidCondition?: FluidAnalysisStepCondition;
  /** The gas compressibility at this test step. */
  GasCompressibility?: eml.ReciprocalPressureMeasure;
  /** The gas density at the conditions for this viscosity correlation to be used. */
  GasDensity?: eml.MassPerVolumeMeasure;
  /** The viscosity of the gas phase at this test step. */
  GasViscosity?: eml.DynamicViscosityMeasure;
  /** The gas Z factor value at this test step. */
  GasZFactor?: number;
  /** The liquid composition at this test step. */
  LiquidComposition?: LiquidComposition;
  /** The fraction of liquid by volume for this test step. This is the volume of liquid divided by a reference volume. Refer to the documentation for the Relative Volume Ratio and Fluid Volume Reference classes. */
  LiquidFraction?: RelativeVolumeRatio;
  /** The oil compressibility at this test step. */
  OilCompressibility?: OilCompressibility;
  /** The density of the oil phase at this test step. */
  OilDensity?: eml.MassPerVolumeMeasure;
  /** The viscosity of the oil phase at this test step. */
  OilViscosity?: eml.DynamicViscosityMeasure;
  /** The overall composition at this test step. */
  OverallComposition?: OverallComposition;
  /** The phases present at this test step (oil, water, gas etc.). Enum, see phases present. */
  PhasesPresent?: PhasePresent;
  /** Measured relative volume ratio= measured volume/volume at Psat. */
  RelativeVolumeRatio?: RelativeVolumeRatio;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The step number is the index of a (P,T) step in the overall test. */
  StepNumber: eml.NonNegativeLong;
  /** The pressure for this test step. */
  StepPressure: eml.PressureMeasure;
  /** The total volume of the expanded mixture at this test step. */
  TotalVolume?: eml.VolumeMeasure;
  /** The vapor composition at this test step. */
  VaporComposition?: VaporComposition;
  /** The Y function at this test step. See  Standing, M.B.: Volumetric And Phase Behavior Of Oil Field Hydrocarbon Systems, Eighth Edition, SPE Richardson, Texas (1977). */
  YFunction?: number;
}
export interface ConstantCompositionExpansionTestStep
  extends _ConstantCompositionExpansionTestStep {}

/** Constant wellbore storage model. */
interface _ConstantStorageModel extends _WellboreBaseModel {}
export interface ConstantStorageModel extends _ConstantStorageModel {}

/** The CVT test. */
interface _ConstantVolumeDepletionTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The volume is corrected to standard conditions of temperature and pressure. */
  CumulativeGasProducedReferenceStd?: eml.VolumeMeasure;
  CvdTestStep?: FluidCvdTestStep[];
  LiquidFractionReference?: FluidVolumeReference[];
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  SaturationPressure?: SaturationPressure;
  /** A number for this test for purposes of, e.g., tracking lab sequence. */
  TestNumber: eml.NonNegativeLong;
  /** The temperature of this test. */
  TestTemperature: eml.ThermodynamicTemperatureMeasure;
}
export interface ConstantVolumeDepletionTest
  extends _ConstantVolumeDepletionTest {}

/** Specifies the control line encapsulation types. */
export type ControlLineEncapsulationKind = "round" | "square";
interface _ControlLineEncapsulationKind extends eml._TypeEnum {
  _: ControlLineEncapsulationKind;
}

/** Specifies the control line encapsulation sizes. */
export type ControlLineEncapsulationSize = "11x11" | "23x11";
interface _ControlLineEncapsulationSize extends eml._TypeEnum {
  _: ControlLineEncapsulationSize;
}

/** Specifies the types of control line material. */
export type ControlLineMaterial = "inc 825" | "ss 316";
interface _ControlLineMaterial extends eml._TypeEnum {
  _: ControlLineMaterial;
}

/** Specifies the control line sizes. */
export type ControlLineSize =
  | "diameter 0.25 in weight 0.028 lb/ft"
  | "diameter 0.25 in weight 0.035 lb/ft"
  | "diameter 0.375 in weight 0.048 lb/ft";
interface _ControlLineSize extends eml._TypeEnum {
  _: ControlLineSize;
}

/** Dimensionless value, characterizing the restriction to flow (+ve value, convergence) or additional capacity for flow (-ve value, fractured or horizontal wellbore) owing to the geometry of the wellbore connection to reservoir. This value is stated with respect to radial flow using the full reservoir thickness (h), ie the radial flow or middle time region of a pressure transient. It therefore can be added to "MechancialSkinRelativeToTotalThickness" to yield the "SkinRelativeToTotalThickness". */
interface _ConvergenceSkinRelativeToTotalThickness extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface ConvergenceSkinRelativeToTotalThickness
  extends _ConvergenceSkinRelativeToTotalThickness {}

/** A class that AbstractCompositionalModel can inherit; it is NOT abstract because the concrete model types have not been specified. For now, use the non-abstract thermal model, and use the CustomPvtModelExtension to add anything needed. Later, it will be made abstract and have concrete classes it inherits from, similar to EoS. */
interface _CorrelationThermalModel extends _AbstractCorrelationModel {}
export interface CorrelationThermalModel extends _CorrelationThermalModel {}

/** A one-based count of personnel on a type of crew. */
interface _CrewCount extends eml._NonNegativeLong {
  /** The type of crew for which a count is being defined. */
  type?: CrewType;
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
}
export interface CrewCount extends _CrewCount {}

/** Specifies the types of production operations personnel grouping. */
export type CrewType =
  | "catering crew"
  | "contractor crew"
  | "day visitors"
  | "drilling contract crew"
  | "other crew"
  | "own crew"
  | "own other crew"
  | "personnel on board";
interface _CrewType extends eml._TypeEnum {
  _: CrewType;
}

/** CSPedersen84. */
interface _CSPedersen84 extends _AbstractCompositionalViscosityModel {}
export interface CSPedersen84 extends _CSPedersen84 {}

/** CSPedersen87. */
interface _CSPedersen87 extends _AbstractCompositionalViscosityModel {}
export interface CSPedersen87 extends _CSPedersen87 {}

/** The standard condition of cumulative gas produced ratio. */
interface _CumulativeGasProducedRatioStd
  extends _AbstractGasProducedRatioVolume {
  /** The standard condition of cumulative gas produced ratio. */
  CumulativeGasProducedRatioStd: eml.VolumePerVolumeMeasure;
}
export interface CumulativeGasProducedRatioStd
  extends _CumulativeGasProducedRatioStd {}

/** The cumulative gas produced volume. */
interface _CumulativeGasProducedVol extends _AbstractGasProducedRatioVolume {
  /** The cumulative gas oil produced ratio at standard conditions. */
  CumulativeGasProducedVolume: eml.VolumeMeasure;
}
export interface CumulativeGasProducedVol extends _CumulativeGasProducedVol {}

/** The data of a curve. */
interface _CurveData extends _AbstractMeasureData {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The value of an independent (index) variable in a row of the curve table. The units of measure are specified in the curve definition. The first value corresponds to order=1 for columns where isIndex is true. The second to order=2. And so on. The number of index and data values must match the number of columns in the table. */
  Index: eml.PositiveLong[];
  /** The value of a dependent (data) variable in a row of the curve table. The units of measure are specified in the curve definition. The first value corresponds to order=1 for columns where isIndex is false. The second to order=2. And so on. The number of index and data values must match the number of columns in the table. */
  Value: number[];
}
export interface CurveData extends _CurveData {}

/** The definition of a curve. */
interface _CurveDefinition extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** True (equal "1" or "true") indicates that this is an independent variable in this curve. At least one column column should be flagged as independent. */
  IsIndex?: boolean;
  /** The measure class of the variable. This defines which units of measure are valid for the value. */
  MeasureClass: eml.MeasureClass;
  /** The order of the value in the index or data tuple. If isIndex is true, this is the order of the (independent) index element. If isIndex is false, this is the order of the (dependent) value element. */
  Order: eml.NonNegativeLong;
  /** The name of the variable in this curve. */
  Parameter: eml.String64;
  /** The unit of measure of the variable. The unit of measure must match a unit allowed by the measure class. */
  Unit: eml.UomEnum;
}
export interface CurveDefinition extends _CurveDefinition {}

/** Boundary Model allowing for the addition of custom parameters to support extension of the model library provided. */
interface _CustomBoundaryModel extends _BoundaryBaseModel {
  AnyParameter?: AbstractParameter[];
  CustomParameter?: CustomParameter[];
  ModelName: ModelName;
}
export interface CustomBoundaryModel extends _CustomBoundaryModel {}

/** Near Wellbore Model allowing for the addition of custom parameters to support extension of the model library provided. */
interface _CustomNearWellboreModel extends _NearWellboreBaseModel {
  AnyParameter?: AbstractParameter[];
  CustomParameter?: CustomParameter[];
  ModelName: ModelName;
}
export interface CustomNearWellboreModel extends _CustomNearWellboreModel {}

/** A single custom parameter relating to a pressure transient analysis.  This type can be added in the Custom model section elements (for wellbore, near wellbore, reservoir and boundary sections of the PTA model), or in a Specialized Analysis.  The custom parameter is to enable extensibility beyond the types of parameter built in to the schema.  It has to have a name (for the parameter, eg "AlphaPressure"), an abbreviation (eg "AP") and a measure value using the generalMeasureType. This type does not enforce restricted units of measure but a uom needs to be specified which it is assumed will be used to work out what dimensional type this parameter belongs to. */
interface _CustomParameter extends _AbstractParameter {
  /** The abbreviation of the parameter. Expected to be one of the abbreviation elements of the parameters in the parameterTypeSet of the "Models loader file" xml. */
  Abbreviation: eml.String64;
  /** The value of the parameter. The measurement kind (length etc) is not known since it will vary according to parameter type. The UoM attribute is expected to match those for the measure class element for this Parameter as specified in the "Model loader file" xml for the parameterType concerned. */
  MeasureValue: GeneralMeasureType;
  /** The name of the parameter. Expected to be one of the name elements of the parameters in the parameterTypeSet of the "Models loader file" xml.  The parameter names expected are those listed as "parameter" under the model within the category of the appropriate result section. */
  Name: eml.String64;
}
export interface CustomParameter extends _CustomParameter {}

/** Custom PVT model extension. */
interface _CustomPvtModelExtension extends BaseType {
  /** Custom PVT model parameter. */
  CustomPvtModelParameter?: CustomPvtModelParameter[];
  /** A description of the custom model. */
  Description?: eml.String2000;
}
export interface CustomPvtModelExtension extends _CustomPvtModelExtension {}

/** Custom PVT model parameter. */
interface _CustomPvtModelParameter extends BaseType {
  /** Reference to a fluid component to which this custom model parameter applies. */
  fluidComponentReference?: eml.String64;
  CustomParameterValue: eml.ExtensionNameValue;
}
export interface CustomPvtModelParameter extends _CustomPvtModelParameter {}

/** Reservoir Model allowing for the addition of custom parameters to support extension of the model library provided. */
interface _CustomReservoirModel extends _ReservoirBaseModel {
  AnyParameter?: AbstractParameter[];
  CustomParameter?: CustomParameter[];
  ModelName: ModelName;
}
export interface CustomReservoirModel extends _CustomReservoirModel {}

/** Wellbore Storage Model allowing for the addition of custom parameters to support extension of the model library provided. */
interface _CustomWellboreModel extends _WellboreBaseModel {
  AnyParameter?: AbstractParameter[];
  CustomParameter?: CustomParameter[];
  ModelName: ModelName;
}
export interface CustomWellboreModel extends _CustomWellboreModel {}

/** Contains metadata about the DAS acquisition common to the various types of data acquired during the acquisition, which includes DAS measurement instrument data, fiber optical path, time zone, and core acquisition settings like pulse rate and gauge length, measurement start time and whether or not this was a triggered measurement. */
interface _DasAcquisition extends eml._AbstractObject {
  /** Free format description of the acquired DAS data. */
  AcquisitionDescription?: eml.String2000;
  /** A UUID that identifies the DAS acquisition job, which IS NOT the same as the UUID that identifies an instance of a DasAcquisition data object. For example, an acquisition job initially has a raw data set. When you transfer that data, the DAS acquisition data object (consisting of the raw data) has a UUID to identify it, and it has the acquisition job number (AcquistionId, which is also a UUID).  Later, an FBE data set is derived from the raw data; the DAS acquisition data object for the FBE data will have a different UUID than the DAS acquisition data object raw data set, but it will have the SAME AcquistionId, because the FBE data is derived from the raw data of the same acquisition job. */
  AcquisitionId: eml.UuidString;
  Custom?: DasCustom;
  /** Description of the measurement instrument. Often referred to as interrogator unit or IU. If the instrument box is not known, the name and title of the box may be set to “UNKNOWN”. */
  DasInstrumentBox: eml.DataObjectReference;
  FacilityCalibration?: FacilityCalibration[];
  /** This is a human-readable name for the facility or facilities that this acquisition is measuring. If the facility name is not available, set one facility with the name “UNKNOWN”. */
  FacilityId: eml.String64[];
  /** The distance (length along the fiber) between pair of pulses used in a dual-pulse or multi-pulse system. This is a distance that the DAS interrogator unit manufacturer designs and implements by hardware or software to affect the interrogator unit spatial resolution. */
  GaugeLength?: eml.LengthMeasure;
  /** The maximum signal frequency a measurement instrument can provide as specified by the vendor. This is the Nyquist frequency (or some fraction thereof) of PulseRate. If the maximum frequency of the instrument is not known, the value should match the maximum frequency in the related raw, FBE and/or spectrum data arrays. */
  MaximumFrequency: eml.FrequencyMeasure;
  /** The time-date specification of the beginning of a data ‘sample’ in a ‘time series’ in ISO 8601 compatible format. Time zone should be included. Sub-second precision should be included where applicable but not zero-padded. ­This is typically a GPS-locked time measurement. If this is not known, use the earliest timestamp in the related raw, FBE and/or spectrum data arrays. In very rare situations where there is no data array, use 1970-01-01T00;00;00.000000+00:00. */
  MeasurementStartTime: eml.TimeStamp;
  /** The minimum signal frequency a measurement instrument can provide as specified by the vendor. If the minimum frequency of the instrument is not known, the value should match the minimum frequency in the related raw, FBE, and/or spectrum data arrays. */
  MinimumFrequency: eml.FrequencyMeasure;
  /** The total number of ‘loci’ (acoustic sample points) acquired by the measurement instrument in a single ‘scan’ of the fiber. If the total number of loci of the instrument is not known, it should be set to a value such that all related raw, FBE, and spectra data can be accommodated. */
  NumberOfLoci: eml.NonNegativeLong;
  /** Description of the fiber optical path. A fiber optical path consists of a series of fibers, connectors, etc. together forming the path for the light pulse emitted from the measurement instrument. If no optical path description is available, then the service provider should supply an optical path with a single segment of sufficient length to fit the optical data acquired. The length of the segment should be able to fit all the acquired loci. */
  OpticalPath: eml.DataObjectReference;
  Processed?: DasProcessed;
  /** The rate at which the interrogator unit interrogates the fiber sensor. For most interrogators, this element is informally known as the ‘pulse rate’. */
  PulseRate?: eml.FrequencyMeasure;
  /** The width of the ‘pulse’ sent down the fiber. */
  PulseWidth?: eml.TimeMeasure;
  Raw?: DasRaw[];
  /** Description of the vendor providing the DAS data acquisition service. */
  ServiceCompanyDetails?: eml.DataObjectReference;
  ServiceCompanyName: eml.String64;
  /** The separation between two consecutive ‘spatial sample’ points on the fiber at which the signal is measured. Not to be confused with ‘spatial resolution’. */
  SpatialSamplingInterval: eml.LengthMeasure;
  /** The first ‘locus’ acquired by the interrogator unit, where ‘Locus Index 0’ is the acoustic sample point at the connector of the measurement instrument. Set this value to accommodate all related raw, FBE, and spectrum data arrays. If an offset is applied such that the first acoustic sample point is not located at the connector of the measurement instrument, then set this to the locus corresponding to the offset. */
  StartLocusIndex: number;
  /** Measurement for an acquisition that requires synchronization between a transmitting source (Tx) and a recording (Rx) measurement system. It must be recorded for every measurement regardless of what application it will serve. If set to true, then the DasRaw group should contain 1 or more RawDataTriggerTime. If set to false, then no such RawDataTriggerTime is expected. */
  TriggeredMeasurement: boolean;
}
export interface DasAcquisition extends _DasAcquisition {}

/** This enum controls the possible types of columns allowed in a Calibration record in HDF5. */
export type DasCalibrationColumn =
  | "FacilityLength"
  | "LocusIndex"
  | "OpticalPathDistance";
interface _DasCalibrationColumn extends eml._TypeEnum {
  _: DasCalibrationColumn;
}

/** This object contains, for a given parent Calibration, the inputs to the calibration process. Each such point is represented by an instance of this object. Each such instance represents a place where a physical feature of the fiber optical path or the facility can be observed as a signal in the DAS data.  For example, a tap test is where a noise (tapping) is generated at a known place (a known location in the facility), and can be seen in the DAS signal at a specific locus.  This fact is recorded in one instance of this object.  Over time it is expected that other commonly used noise generating locations will be listed in the enum for InputPointType.
 *
 * Business Rule: Note that it is possible to have a valid Calibration comprising only a collection of DasCalibrationInputPoint. It is not a requirement to also have the corresponding "look up table" of a collection of FiberLocusDepthPoint.  If the receiving application can create its own interpolation of locus depth points then the collection of DasCalibrationInputPoint is all that is needed. */
interface _DasCalibrationInputPoint extends BaseType {
  /** The ‘facility length’ corresponding to the locus. The ‘facility length’ is the length along the physical facility (eg measured depth if the facility is a wellbore). This length corrects the optical path distance for the offset from previous facilities on the same fiber optical path, surface patch cord lengths, overstuffing, additional fiber in turnaround-subs or H-splices that increase the optical path length on the OTDR, but not the actual facility length. Facility length is the value which is required to associate the DAS data at a locus with a physical location, but at the time of the Calibration this may not be known and so this element is optional. */
  FacilityLength?: eml.LengthMeasure;
  /** The kind of calibration point. This is an extensible enumeration type. Current enum values are ‘tap test’ and ‘other calibration point’. Other commonly used calibration points are understood to be packers, sub surface safety valves, perforations, all of which give recognizable noise signals observed in the DAS data.  At the time of issue of this standard there is not a consensus regarding which other values should be regarded as standard kinds of calibration input points. */
  InputPointKind: DasCalibrationInputPointKindExt;
  /** The locus index for the calibration point. Where ‘Locus Index 0’ is generally understood to mean, the acoustic sample point at the connector of the measurement instrument. */
  LocusIndex: eml.NonNegativeLong;
  /** The optical path distance (ie, the distance along the fiber) from the connector of the measurement instrument to the acoustic sample point (with the given locus index) of the calibration point. Mandatory since any Calibration Input Point must have a known optical oath distance. */
  OpticalPathDistance: eml.LengthMeasure;
  /** A brief meaningful description of the type of calibration point. This is an extensible enumeration type. Current reserved keywords are ‘locus calibration’, ‘tap test’ and ‘last locus to end of fiber’ for commonly used calibration points. */
  Remark?: eml.String2000;
}
export interface DasCalibrationInputPoint extends _DasCalibrationInputPoint {}

/** The kind of calibration point. This is an extensible enumeration type. Current enum values are ‘tap test’ and ‘other calibration point’. Other commonly used calibration points are understood to be packers, sub surface safety valves, perforations, all of which give recognizable noise signals observed in the DAS data.  At the time of issue of this standard there is not a consensus regarding which other values should be regarded as standard kinds of calibration input points. */
export type DasCalibrationInputPointKind =
  | "other calibration point"
  | "tap test";
interface _DasCalibrationInputPointKind extends eml._TypeEnum {
  _: DasCalibrationInputPointKind;
}

/** This is an extension of the calibration input point kind enumeration. */
export type DasCalibrationInputPointKindExt = string;
type _DasCalibrationInputPointKindExt = Primitive._string;

/** This extension of calibration type */
export type DasCalibrationTypeExt = string;
type _DasCalibrationTypeExt = Primitive._string;

/** This object contains service–provider-specific customization parameters. Service providers can define the contents of this data element as required. This data object has intentionally not been described in detail to allow for flexibility.
 * Note that this object is optional and if used, the service provider needs to provide a description of the data elements to the customer. */
interface _DasCustom extends BaseType {}
export interface DasCustom extends _DasCustom {}

/** Specifies the possible orientations of the data array. For multiple H5 files:
 * - Must specify that the indexes split OVER TIME
 * - Even if loci were the index
 * - Each divided file still contains the split time array */
export type DasDimensions = "frequency" | "locus" | "time";
interface _DasDimensions extends eml._TypeEnum {
  _: DasDimensions;
}

/** Array of integer values provided explicitly by an HDF5 dataset. The null value must be  explicitly provided in the NullValue attribute of this class. */
interface _DasExternalDatasetPart extends eml._ExternalDataArrayPart {
  /** The timestamp in human readable, ISO 8601 format of the last recorded sample in the sub-record of the raw data array stored in the corresponding HDF data file. Time zone should be included. Sub-second precision should be included where applicable but not zero-padded. */
  PartEndTime?: eml.TimeStamp;
  /** The timestamp in human readable, ISO 8601 format of the first recorded sample in the sub-record of the raw data array stored in the corresponding HDF data file. Time zone should be included. Sub-second precision should be included where applicable but not zero-padded. */
  PartStartTime?: eml.TimeStamp;
}
export interface DasExternalDatasetPart extends _DasExternalDatasetPart {}

/** This object contains the attributes of FBE processed data. This includes the FBE data unit, location of the FBE data along the fiber optical path, information about times, (optional) filter related parameters, and UUIDs of the original raw and/or spectra files from which the files were processed. Note that the actual FBE data samples and times arrays are not present in the XML files but only in the HDF5 files because of their size. The XML files only contain references to locate the corresponding HDF files containing the actual FBE samples and times. */
interface _DasFbe extends BaseType {
  /** A universally unique identifier (UUID) of an instance of FBE DAS data. */
  uuid: eml.UuidString;
  Custom?: DasCustom;
  /** A DAS array object containing the FBE DAS data. */
  FbeData: DasFbeData[];
  /** A DAS array object containing the sample times corresponding to a single ‘scan’ of the fiber. In a single ‘scan’, the DAS measurement system acquires raw data samples for all the loci specified by StartLocusIndex and NumberOfLoci. The ‘scan’ frequency is equal to the DAS acquisition pulse rate. */
  FbeDataTime: DasTimeArray;
  /** Data unit for the FBE data. */
  FbeDataUnit: eml.String64;
  /** Description of the FBE data. */
  FbeDescription?: eml.String2000;
  /** The nth (zero-based) count of this FBE instance in the Acquisition.  Recommended if there is more than 1 FBE instance in this Acquisition.  This index corresponds to the FBE array number in the HDF5 file. */
  FbeIndex?: eml.NonNegativeLong;
  /** A string describing the type of filter applied by the vendor. Important frequency type filter classes are: frequency response filters (low-pass, high-pass, band-pass, notch filters) and butterworth, chebyshev and bessel filters. The filter type and characteristics applied to the acquired or processed data is important information for end-user applications. */
  FilterType?: eml.String64;
  /** The total number of ‘loci’ (acoustic sample points) acquired by the measurement instrument in a single ‘scan’ of the fiber. */
  NumberOfLoci: eml.NonNegativeLong;
  /** The rate at which the FBE data is provided for all ‘loci’ (spatial samples). This is typically equal to the interrogation rate/pulse rate of the DAS measurement system or an integer fraction thereof.
   * Note this attribute is mandatory for FBE and spectrum data. For raw data this attribute is optional. */
  OutputDataRate: eml.FrequencyMeasure;
  /** A universally unique identifier (UUID) for the HDF file containing the raw data. */
  RawReference?: eml.UuidString;
  /** The separation between two consecutive ‘spatial sample’ points on the fiber at which the signal is measured. It should not be confused with ‘spatial resolution’. If this data element is present in the DASFbe object, then it overwrites the SpatialSamplingInterval value described in DASAcquistion. */
  SpatialSamplingInterval?: eml.LengthMeasure;
  /** Only required in Hdf5 file to record the unit of measure of the sampling interval of the Fbe. */
  SpatialSamplingIntervalUnit?: eml.String64;
  /** A universally unique identifier (UUID) for the HDF file containing the spectra data. */
  SpectraReference?: eml.UuidString;
  /** The first ‘locus’ acquired by the interrogator unit, where ‘Locus Index 0’ is the acoustic sample point at the connector of the measurement instrument. */
  StartLocusIndex: number;
  /** The number of samples used in the TransformType. */
  TransformSize?: eml.NonNegativeLong;
  /** A string describing the type of mathematical transformation applied by the vendor. Typically this is some type of discrete fast Fourier transform (often abbreviated as DFT, DFFT or FFT). */
  TransformType?: eml.String64;
  /** The window function applied to the sample window used to calculate the frequency band. Example 'HANNING', 'HAMMING', 'BESSEL' window. */
  WindowFunction?: eml.String64;
  /** The number of sample overlaps between consecutive filter windows applied. */
  WindowOverlap?: eml.NonNegativeLong;
  /** The number of samples in the filter window applied. */
  WindowSize?: eml.NonNegativeLong;
}
export interface DasFbe extends _DasFbe {}

/** Two dimensional (loci & time) array containing processed frequency band extracted data samples. This processed data type is obtained by applying a frequency band filter to the raw data acquired by the DAS acquisition system. For each frequency band provided, a separate DASFbeData array object is created. */
interface _DasFbeData extends BaseType {
  /** An array of two elements describing the ordering of the FBE data array. The fastest running index is stored in the second element. For example the
   * {‘time’, ‘locus’} indicates that ‘locus’ is the fastest running index. Note that vendors may deliver data with different orderings. */
  Dimensions: DasDimensions[];
  /** End of an individual frequency band in a DAS FBE data set. This typically corresponds to the frequency of the 3dB point of the filter. */
  EndFrequency: eml.FrequencyMeasure;
  FbeDataArray: eml.AbstractNumericArray;
  /** The nth (zero-based) count of this DasFbeData in the DasFbe.  Recommended if there is more than 1 dataset in this FBE.  This index corresponds to the FbeData array number in the HDF5 file. */
  FbeDataIndex?: eml.NonNegativeLong;
  /** Start of an individual frequency band in a DAS FBE data set. This typically corresponds to the frequency of the 3dB point of the filter. */
  StartFrequency: eml.FrequencyMeasure;
}
export interface DasFbeData extends _DasFbeData {}

/** The group of elements corresponding to a DAS instrument box. */
interface _DasInstrumentBox extends eml._AbstractObject {
  /** Identifies the facility to which an instrument is attached.  Type is the PRODML Common Facility Identifier. */
  FacilityIdentifier?: FacilityIdentifier;
  /** Firmware version of the DAS Instrument box. If not known, set to “UNKNOWN”. */
  FirmwareVersion: eml.String64;
  /** The general data of an instrument, including vendor information, in the installed system. */
  Instrument: Instrument;
  /** An identification tag for the instrument box. A serial number is a type of identification tag however some tags contain many pieces of information. This structure just identifies the tag and does not describe the contents. */
  InstrumentBoxDescription?: eml.String2000;
  /** Additional parameters to define the instrument box as a piece of equipment. These should not be parameters to define the installation or use of the box in the wellbore, or other system. This element should be used only if an appropriate parameter is not available as an element, or in the calibration operation. */
  Parameter?: eml.ExtensionNameValue[];
  /** Description of the patch cord connecting the fiber optic path to the DAS instrument box connector. */
  PatchCord?: DtsPatchCord;
  /** An identification tag for the instrument box. A serial number is a type of identification tag however some tags contain many pieces of information. This structure just identifies the tag and does not describe the contents. */
  SerialNumber?: eml.String64;
}
export interface DasInstrumentBox extends _DasInstrumentBox {}

/** This object contains data objects for processed data types and has no data attributes. Currently only two processed data types have been defined: the frequency band extracted (FBE) and spectra. In the future other processed data types may be added.
 * Note that a DasProcessed object is optional and only present if DAS FBE or DAS spectra data is exchanged. */
interface _DasProcessed extends BaseType {
  Fbe?: DasFbe[];
  Spectra?: DasSpectra[];
}
export interface DasProcessed extends _DasProcessed {}

/** This object contains the attributes of raw data acquired by the DAS measurement instrument. This includes the raw data unit, the location of the raw data acquired along the fiber optical path, and information about times and (optional) triggers. Note that the actual raw data samples, times and trigger times arrays are not present in the XML files but only in the HDF5 files because of their size. The XML files only contain references to locate the corresponding HDF files, which contain the actual raw samples, times, and (optional) trigger times. */
interface _DasRaw extends BaseType {
  /** A universally unique identifier (UUID) for an instance of raw DAS data. */
  uuid: eml.UuidString;
  Custom?: DasCustom;
  /** The total number of ‘loci’ (acoustic sample points) acquired by the measurement instrument in a single ‘scan’ of the fiber. */
  NumberOfLoci: eml.NonNegativeLong;
  /** The rate at which the spectra data is provided for all ‘loci’ (spatial samples). This is typically equal to the interrogation rate/pulse rate of the DAS measurement system or an integer fraction thereof.
   * This attribute is optional in the Raw Data object. If present, it overrides the Acquisition PulseRate. If not present, then OutputDataRate is assumed equal to the PulseRate. */
  OutputDataRate?: eml.FrequencyMeasure;
  /** A DAS array object containing the raw DAS data. */
  RawData: DasRawData;
  /** A DAS array object containing the sample times corresponding to a single ‘scan’ of the fiber. In a single ‘scan’, the DAS measurement system acquires raw data samples for all the loci specified by StartLocusIndex. The ‘scan’ frequency is equal to the DAS Acquisition Pulse Rate. */
  RawDataTime: DasTimeArray;
  /** A DAS array object containing the times of the triggers in a triggered measurement. Multiple times may be stored to indicate multiple triggers within a single DAS raw data recording. This array contains only valid data if TriggeredMeasurement is set to ‘true’ in DAS Acquisition. */
  RawDataTriggerTime?: DasTimeArray;
  /** Data unit for the DAS measurement instrument. */
  RawDataUnit: eml.String64;
  /** Free format description of the raw DAS data acquired. */
  RawDescription?: eml.String2000;
  /** The nth (zero-based) count of this Raw instance in the Acquisition.  Recommended if there is more than 1 Raw instance in this Acquisition.  This index corresponds to the Raw array number in the HDF5 file. */
  RawIndex?: eml.NonNegativeLong;
  /** The first ‘locus’ acquired by the interrogator unit. Where ‘Locus Index 0’ is the acoustic sample point at the connector of the measurement instrument. */
  StartLocusIndex: number;
}
export interface DasRaw extends _DasRaw {}

/** Two- dimensional array containing raw data samples acquired by the DAS acquisition system. */
interface _DasRawData extends BaseType {
  /** An array of two elements describing the ordering of the raw data array. The fastest running index is stored in the second element. For the DAS measurement instrument, the ordering is typically {‘time’, ‘locus’} indicating that the locus is the fastest running index, but in some cases the order may be reversed. */
  Dimensions: DasDimensions[];
  RawDataArray: eml.AbstractNumericArray;
}
export interface DasRawData extends _DasRawData {}

/** This object contains the attributes of spectra processed data. This includes the spectra data unit, location of the spectra data along the fiber optical path, information about times, (optional) filter related parameters, and UUIDs of the original raw from which the spectra file was processed and/or the UUID of the FBE files that were processed from the spectra files. Note that the actual spectrum data samples and times arrays are not present in the XML files but only in the HDF5 files because of their size. The XML files only contain references to locate the corresponding HDF files containing the actual spectrum samples and times. */
interface _DasSpectra extends BaseType {
  /** A universally unique identifier (UUID) for an instance of spectra DAS data. */
  uuid: eml.UuidString;
  Custom?: DasCustom;
  /** A universally unique identifier (UUID) of an instance of DAS FBE data. */
  FbeReference?: eml.UuidString;
  /** A string describing the type of filter applied by the vendor. Important frequency type filter classes are: frequency response filters (low-pass, high-pass, band-pass, notch filters) and butterworth, chebyshev and bessel filters. The filter type and characteristics applied to the acquired or processed data is important information for end-user applications. */
  FilterType?: eml.String64;
  /** The total number of ‘loci’ (acoustic sample points) acquired by the measurement instrument in a single ‘scan’ of the fiber. */
  NumberOfLoci: eml.NonNegativeLong;
  /** The rate at which the spectra data is provided for all ‘loci’ (spatial samples). This is typically equal to the interrogation rate/pulse rate of the DAS measurement system or an integer fraction thereof.
   * Note this attribute is mandatory for FBE and spectrum data. For raw data this attribute is optional. */
  OutputDataRate: eml.FrequencyMeasure;
  /** Unique identifier for the HDF5 file containing the raw data. */
  RawReference?: eml.UuidString;
  /** The separation between two consecutive ‘spatial sample’ points on the fiber at which the signal is measured. It should not be confused with ‘spatial resolution’. If this data element is present in the DasSpectrum object, then it overwrites the SpatialSamplingInterval value described in DasAcquistion. */
  SpatialSamplingInterval?: eml.LengthMeasure;
  /** Only required in an HDF5 file to record the unit of measure of the sampling interval of the spectra. */
  SpatialSamplingIntervalUnit?: eml.String64;
  /** A DAS array object containing the spectra DAS data. */
  SpectraData: DasSpectraData;
  /** A DAS array object containing the sample times corresponding to a single ‘scan’ of the fiber. In a single ‘scan’, the DAS measurement system acquires raw data samples for all the loci specified by StartLocusIndex and NumberOfLoci. The ‘scan’ frequency is equal to the DAS acquisition pulse rate. */
  SpectraDataTime: DasTimeArray;
  /** Data unit for the spectra data. */
  SpectraDataUnit: eml.String64;
  /** Description of the spectra data. */
  SpectraDescription?: eml.String2000;
  /** The nth (zero-based) count of this Spectra instance in the acquisition. Recommended if there is more than 1 Spectra instance in this acquisition.  This index corresponds to the Spectra array number in the HDF5 file. */
  SpectraIndex?: eml.NonNegativeLong;
  /** The first ‘locus’ acquired by the interrogator unit, where ‘Locus Index 0’ is the acoustic sample point at the connector of the measurement instrument. */
  StartLocusIndex: number;
  /** The number of samples used in the TransformType. */
  TransformSize: eml.NonNegativeLong;
  /** A string describing the type of mathematical transformation applied by the vendor. Typically this is some type of discrete fast Fourier transform (often abbreviated as DFT, DFFT or FFT). */
  TransformType: eml.String64;
  /** A string describing the window function applied by the vendor.
   * Examples are "Hamming" or "Hanning". */
  WindowFunction?: eml.String64;
  /** The number of sample overlaps between consecutive filter windows applied. */
  WindowOverlap?: eml.NonNegativeLong;
  /** The number of samples in the filter window applied. */
  WindowSize?: eml.NonNegativeLong;
}
export interface DasSpectra extends _DasSpectra {}

/** Three-dimensional array (loci, time, transform) containing spectrum data samples. Spectrum data is processed data obtained by applying a mathematical transformation function to the DAS raw data acquired by the acquisition system. The array is 3D and contains TransformSize points for each locus and time for which the data is provided. For example, many service providers will provide Fourier transformed versions of the raw data to customers, but other transformation functions are also allowed. */
interface _DasSpectraData extends BaseType {
  /** An array of three elements describing the ordering of the raw data array. The fastest running index is stored in the last element. For example {‘time’, ‘locus’, ‘frequency’} indicates that the frequency is the fastest running index. Note that vendors may deliver data with different orderings. */
  Dimensions: DasDimensions[];
  /** End frequency in a DAS spectra data set. This value is typically set to the maximum frequency present in the spectra data set. */
  EndFrequency: eml.FrequencyMeasure;
  SpectraDataArray: eml.AbstractNumericArray;
  /** Start frequency in a DAS spectra data set. This value typically is set to the minimum frequency present in the spectra data set. */
  StartFrequency: eml.FrequencyMeasure;
}
export interface DasSpectraData extends _DasSpectraData {}

/** The Times arrays contain the ‘scan’ or ‘trace’ times at which the raw, FBE and spectrum arrays were acquired or processed:
 * - For raw data, these are the times for which all loci in the ‘scanned’ fiber section were interrogated by a single pulse of the DAS measurement system.
 * - For the processed data, these are the times of the first sample in the time window used in the frequency filter or transformation function to calculate the FBE or spectrum data. */
interface _DasTimeArray extends BaseType {
  /** The timestamp in human readable, ISO 8601 format of the last recorded sample in the acquisition. Note that this is the end time of the corresponding data set stored in multiple HDF5 files. The end time of the sub-record stored in an individual HDF5 file is stored in PartEndTime. Time zone should be included. Sub-second precision should be included where applicable but not zero-padded. */
  EndTime?: eml.TimeStamp;
  /** The timestamp in human readable, ISO 8601 format of the last recorded sample in the acquisition. Note that this is the start time of the acquisition if a raw dataset is stored in multiple HDF files. The end time of the sub-record stored in an individual HDF file is stored in PartStartTime. */
  StartTime: eml.TimeStamp;
  TimeArray: eml.IntegerExternalArray;
  /** The unit of measure of the intervals in the time array. */
  Uom: eml.TimeUomExt;
}
export interface DasTimeArray extends _DasTimeArray {}

/** The possible values for conditioning of data during PTA pre-processing. */
export type DataConditioning =
  | "data outliers removed"
  | "data reduced"
  | "data smoothed"
  | "data time shifted"
  | "tide corrected"
  | "trend removal"
  | "data value shifted"
  | "flow to volume"
  | "fluid level to pressure"
  | "fluid level to volume"
  | "gauge to datum pressure"
  | "pressure to flow"
  | "volume to flow"
  | "data difference"
  | "data channel spliced"
  | "data channels averaged"
  | "rate reallocation"
  | "total rate calculation from phase rates";
interface _DataConditioning extends eml._TypeEnum {
  _: DataConditioning;
}

/** This is an extension of the data conditioning enumeration. */
export type DataConditioningExt = string;
type _DataConditioningExt = Primitive._string;

/** A general time-stamped comment structure. */
interface _DatedComment extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The date and time where the comment is no longer valid. */
  EndTime?: eml.TimeStamp;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The role of the person providing the comment. This is the role of the person within the context of comment. */
  Role?: eml.String64;
  /** The date and time where the comment begins to be valid. */
  StartTime?: eml.TimeStamp;
  /** The name of the person providing the comment. */
  Who?: eml.String64;
}
export interface DatedComment extends _DatedComment {}

/** This element is chosen when separate individual deconvolution outputs apply to corresponding individual Test Periods. */
interface _DeconvolutionMultipleOutput extends _AbstractDeconvolutionOutput {
  DeconvolutionMultipleOutput: DeconvolutionOutput;
  /** Where deconvolution has been performed to generate deconvolved pressure over multiple time periods, this is the uid of the time period for this deconvolved pressure channel. */
  TestPeriodOutputRefId: eml.String64;
}
export interface DeconvolutionMultipleOutput
  extends _DeconvolutionMultipleOutput {}

/** This contains the output curves from a deconvolution. */
interface _DeconvolutionOutput extends BaseType {
  /** The reference flow condition at which the corresponding deconvolved pressure constant drawdown response is calculated. */
  DeconvolutionReferenceFlowrateValue: eml.VolumePerTimeMeasure;
  /** The result of deconvolution: a deconvolved pressure which corresponds to the constant rate drawdown response at the reference flow condition. */
  DeconvolvedPressure?: DeconvolvedPressureData;
}
export interface DeconvolutionOutput extends _DeconvolutionOutput {}

/** This element is chosen when a single deconvolution output applies across all Test Periods. */
interface _DeconvolutionSingleOutput extends _AbstractDeconvolutionOutput {
  DeconvolutionSingleOutput: DeconvolutionOutput;
}
export interface DeconvolutionSingleOutput extends _DeconvolutionSingleOutput {}

interface _DeconvolvedFlowData extends _AbstractPtaFlowData {
  /** In cases where the abstract Pta pressure data has type: deconvolved pressure data, this is a reference, using data object reference, to the Deconvolution data-object containing details of the deconvolution process. */
  Deconvolution: eml.DataObjectReference;
}
export interface DeconvolvedFlowData extends _DeconvolvedFlowData {}

interface _DeconvolvedPressureData extends _AbstractPtaPressureData {
  /** In cases where the abstract Pta pressure data has type: deconvolved pressure data, this is a reference, using data object reference, to the Deconvolution data-object containing details of the deconvolution process. */
  Deconvolution: eml.DataObjectReference;
}
export interface DeconvolvedPressureData extends _DeconvolvedPressureData {}

/** Specifies the deferment status of the event. */
export type DeferredKind = "planned" | "unplanned";
interface _DeferredKind extends eml._TypeEnum {
  _: DeferredKind;
}

/** Information about the event or incident that caused production to be deferred. */
interface _DeferredProductionEvent extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Indicates whether event is planned or unplanned */
  DeferredKind?: DeferredKind;
  /** The production volume deferred for the reporting period. */
  DeferredProductionVolume?: DeferredProductionVolume[];
  /** The reason code for the downtime event. */
  DowntimeReasonCode?: DowntimeReasonCode;
  /** The duration of the event. */
  Duration: eml.TimeMeasure;
  /** The end date of the event. */
  EndDate?: eml.TimeStamp;
  /** A brief meaningful description about the event. */
  Remark?: eml.String2000;
  /** The start date of the event. */
  StartDate?: eml.TimeStamp;
}
export interface DeferredProductionEvent extends _DeferredProductionEvent {}

/** The production volume deferred for the reporting period. */
interface _DeferredProductionVolume extends BaseType {
  DeferredProductQuantity: AbstractProductQuantity;
  /** The method used to estimate deferred production. See enum EstimationMethod. */
  EstimationMethod: EstimationMethodExt;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface DeferredProductionVolume extends _DeferredProductionVolume {}

/** DeGhetto-BubblePoint. */
interface _DeGhettoBubblePoint
  extends _AbstractCorrelationViscosityBubblePointModel {}
export interface DeGhettoBubblePoint extends _DeGhettoBubblePoint {}

/** DeGhetto-Dead. */
interface _DeGhettoDead extends _AbstractCorrelationViscosityDeadModel {
  /** The oil API at stock tank for the viscosity correlation. */
  OilAPIAtStockTank?: eml.APIGravityMeasure;
}
export interface DeGhettoDead extends _DeGhettoDead {}

/** DeGhetto-Undersaturated. */
interface _DeGhettoUndersaturated
  extends _AbstractCorrelationViscosityUndersaturatedModel {
  /** The reservoir temperature for the viscosity correlation. */
  ReservoirTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The solution gas-oil ratio for the viscosity correlation. */
  SolutionGasOilRatio?: eml.VolumePerVolumeMeasure;
}
export interface DeGhettoUndersaturated extends _DeGhettoUndersaturated {}

/** The pressure drop caused by the total skin factor. Equal to the difference in pressure at the wellbore between what was observed at a flowrate and what would be observed if the radial flow regime in the reservoir persisted right into the wellbore. The reference flowrate will be the stable flowrate used to analyse a drawdown, or the stable last flowrate preceding a buildup. */
interface _DeltaPressureTotalSkin extends _AbstractParameter {
  Abbreviation: eml.String64;
  Pressure: eml.PressureMeasure;
}
export interface DeltaPressureTotalSkin extends _DeltaPressureTotalSkin {}

/** In models in which the wellbore storage coefficient changes, the time at which the intial wellbore storage coefficient changes to the final coefficient. */
interface _DeltaTimeStorageChanges extends _AbstractParameter {
  Abbreviation: eml.String64;
  Time: eml.TimeMeasure;
}
export interface DeltaTimeStorageChanges extends _DeltaTimeStorageChanges {}

export type DetectableLimitRelativeStateKind = "ADL" | "BDL";
interface _DetectableLimitRelativeStateKind extends eml._TypeEnum {
  _: DetectableLimitRelativeStateKind;
}

/** The differential liberation test. */
interface _DifferentialLiberationTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** A flag to indicate if differential liberation/vaporization data are corrected to separator conditions/flash data or not. */
  CorrectionMethod?: eml.String64;
  DlTestStep?: FluidDifferentialLiberationTestStep[];
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The saturation (or bubble point) pressure measured in this test. */
  SaturationPressure: SaturationPressure;
  /** Reference to a separator test element that contains the separator conditions (stages) that apply to this test. */
  SeparatorConditions?: SeparatorConditions;
  ShrinkageReference?: FluidVolumeReference;
  /** A number for this test for purposes of, e.g., tracking lab sequence. */
  TestNumber: eml.NonNegativeLong;
  /** The temperature of this test. */
  TestTemperature: eml.ThermodynamicTemperatureMeasure;
}
export interface DifferentialLiberationTest
  extends _DifferentialLiberationTest {}

/** DindorukChristman-BubblePoint. */
interface _DindorukChristmanBubblePoint
  extends _AbstractCorrelationViscosityBubblePointModel {}
export interface DindorukChristmanBubblePoint
  extends _DindorukChristmanBubblePoint {}

/** DindorukChristman-Dead. */
interface _DindorukChristmanDead
  extends _AbstractCorrelationViscosityDeadModel {
  /** The oil gravity at stock tank for the viscosity correlation. */
  OilGravityAtStockTank?: eml.APIGravityMeasure;
}
export interface DindorukChristmanDead extends _DindorukChristmanDead {}

/** DindorukChristman-Undersaturated. */
interface _DindorukChristmanUndersaturated
  extends _AbstractCorrelationViscosityUndersaturatedModel {
  /** The reservoir temperature for the viscosity correlation. */
  ReservoirTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The solution gas-oil ratio for the viscosity correlation. */
  SolutionGasOilRatio?: eml.VolumePerVolumeMeasure;
}
export interface DindorukChristmanUndersaturated
  extends _DindorukChristmanUndersaturated {}

/** Specifies the set of categories used to account for how crude oil and petroleum products are transferred, distributed, or removed from the supply stream (e.g.,stock change, crude oil losses, exports, sales, etc.). */
export type DispositionKind =
  | "buyback"
  | "flared"
  | "sold"
  | "used on-site"
  | "fuel"
  | "vented"
  | "disposal"
  | "gas lift"
  | "lost or stolen"
  | "other";
interface _DispositionKind extends eml._TypeEnum {
  _: DispositionKind;
}

export type DispositionKindExt = string;
type _DispositionKindExt = Primitive._string;

/** For a horizontal ("pancake") induced hydraulic fracture, the distance between the plane of the fracture and the lower boundary of the layer. */
interface _DistanceFractureToBottomBoundary extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface DistanceFractureToBottomBoundary
  extends _DistanceFractureToBottomBoundary {}

/** For a hydraulic fracture, the distance between the mid-height level of the fracture and the lower boundary of the layer. */
interface _DistanceMidFractureHeightToBottomBoundary
  extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface DistanceMidFractureHeightToBottomBoundary
  extends _DistanceMidFractureHeightToBottomBoundary {}

/** For a partial penetration (a vertical or slant well with less than full layer thickness open to flow) , the distance from the mid-perforation point to the bottom boundary of the layer. */
interface _DistanceMidPerforationsToBottomBoundary extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface DistanceMidPerforationsToBottomBoundary
  extends _DistanceMidPerforationsToBottomBoundary {}

/** In any bounded reservoir model, the distance to the Boundary 1. The orientation of this can be thought of conceptually (ie in relationship to other boundaries in the model, not literally) as "East". */
interface _DistanceToBoundary1 extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface DistanceToBoundary1 extends _DistanceToBoundary1 {}

/** In any bounded reservoir model, the distance to the Boundary 2. The orientation of this can be thought of conceptually (ie in relationship to other boundaries in the model, not literally) as "North". */
interface _DistanceToBoundary2 extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface DistanceToBoundary2 extends _DistanceToBoundary2 {}

/** In any bounded reservoir model, the distance to the Boundary 3. The orientation of this can be thought of conceptually (ie in relationship to other boundaries in the model, not literally) as "West". */
interface _DistanceToBoundary3 extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface DistanceToBoundary3 extends _DistanceToBoundary3 {}

/** In any bounded reservoir model, the distance to the Boundary 4. The orientation of this can be thought of conceptually (ie in relationship to other boundaries in the model, not literally) as "South". */
interface _DistanceToBoundary4 extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface DistanceToBoundary4 extends _DistanceToBoundary4 {}

/** In a Radial or Linear Composite model, the distance to the boundary of the inner and outer zones. */
interface _DistanceToMobilityInterface extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface DistanceToMobilityInterface
  extends _DistanceToMobilityInterface {}

/** In a model where the reservoir model is a Pinch Out, the distance from the wellbore to the pinch-out. */
interface _DistanceToPinchOut extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface DistanceToPinchOut extends _DistanceToPinchOut {}

/** For a horizontal wellbore model, the distance between the horizontal wellbore and the lower boundary of the layer. */
interface _DistanceWellboreToBottomBoundary extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface DistanceWellboreToBottomBoundary
  extends _DistanceWellboreToBottomBoundary {}

/** For a Reservoir model in which parameters are spatially distributed, this is the model sub class which identifies which parameters have been spatially sampled, and provides a reference to the RESQML object containing the sampled data.  This is expected to be a numerical model. */
interface _DistributedParametersSubModel extends BaseType {
  /** Reference to RESQML grid containing Depth values. */
  DepthArrayRefID?: ResqmlModelRef;
  /** Boolean. If True then parameter Depth is defined by values distributed on a grid in a RESQML model.  In this case the DepthArrayRefID element will provide the location of the gridded properties in the RESQML model. */
  IsDepthGridded: boolean;
  /** Boolean. If True then parameter KvToKr is defined by values distributed on a grid in a RESQML model.  In this case the KvToKrArrayRefID element will provide the location of the gridded properties in the RESQML model. */
  IsKvToKrGridded: boolean;
  /** Boolean. If True then parameter KxToKy is defined by values distributed on a grid in a RESQML model.  In this case the KxToKyArrayRefID element will provide the location of the gridded properties in the RESQML model. */
  IsKxToKyGridded: boolean;
  /** Boolean. If True then parameter Permeability is defined by values distributed on a grid in a RESQML model.  In this case the PermeabilityArrayRefIDelement will provide the location of the gridded properties in the RESQML model. */
  IsPermeabilityGridded: boolean;
  /** Boolean. If True then parameter Porosity is defined by values distributed on a grid in a RESQML model.  In this case the PorosityArrayRefID element will provide the location of the gridded properties in the RESQML model. */
  IsPorosityGridded: boolean;
  /** Boolean. If True then parameter Thickness is defined by values distributed on a grid in a RESQML model.  In this case the ThicknessArrayRefID element will provide the location of the gridded properties in the RESQML model. */
  IsThicknessGridded: boolean;
  /** Reference to RESQML grid containing KvToKr values. */
  KvToKrArrayRefID?: ResqmlModelRef;
  /** Reference to RESQML grid containing KxToKy values. */
  KxToKyArrayRefID?: ResqmlModelRef;
  /** Reference to RESQML grid containing Permeability values. */
  PermeabilityArrayRefID?: ResqmlModelRef;
  /** Reference to RESQML grid containing Porosity values. */
  PorosityArrayRefID?: ResqmlModelRef;
  /** Reference to RESQML grid containing Thickness values. */
  ThicknessArrayRefID?: ResqmlModelRef;
}
export interface DistributedParametersSubModel
  extends _DistributedParametersSubModel {}

/** A single double value in the time series. */
interface _DoubleValue extends _AbstractValue {
  /** A single double value in the time series. */
  DoubleValue: TimeSeriesDoubleSample;
}
export interface DoubleValue extends _DoubleValue {}

/** Additional information required for a sample acquired down hole. */
interface _DownholeSampleAcquisition extends _FluidSampleAcquisition {
  /** The base MD for the interval where this downhole sample was taken. */
  BaseMD?: eml.LengthMeasure;
  FlowTestActivity?: eml.DataObjectReference;
  /** The sampling run number for this downhole sample acquisition. */
  SamplingRun: eml.NonNegativeLong;
  /** The kind of tool used to acquire the downhole sample. */
  ToolKind?: eml.String64;
  ToolSerialNumber?: eml.String64;
  /** The top MD for the interval where this downhole sample was taken. */
  TopMD: eml.LengthMeasure;
  /** A reference to the wellbore (a WITSML data object) where this downhole sample was taken. */
  Wellbore: eml.DataObjectReference;
  /** A reference to the wellbore completion (WITSML data object) where this sample was taken. */
  WellboreCompletion?: eml.DataObjectReference;
}
export interface DownholeSampleAcquisition extends _DownholeSampleAcquisition {}

/** Codes to categorize the reason for downtime. These codes are company specific so they are not part of PRODML. Company's can use this schema to specify their downtime codes. */
interface _DowntimeReasonCode extends BaseType {
  /** The authority (usually a company) that defines the codes. */
  authority: eml.String64;
  /** The code value. */
  code?: eml.String64;
  /** Name or explanation of the code specified in the code attribute. */
  Name?: eml.String64;
  Parent?: DowntimeReasonCode;
}
export interface DowntimeReasonCode extends _DowntimeReasonCode {}

/** In a closed reservoir model, the Drainage Area measured. This is to be taken to mean that the analysis yielded a measurement, as opposed to the RadiusOfInvestigation or PoreVolumeOfInvestigation Parameters which are taken to mean the estimates for these parameters derived from diffuse flow theory, but not necessarily measured. */
interface _DrainageAreaMeasured extends _AbstractParameter {
  Abbreviation: eml.String64;
  Area: eml.AreaMeasure;
}
export interface DrainageAreaMeasured extends _DrainageAreaMeasured {}

/** Typically performed using tools conveyed on the drill string, one interval at a time. */
interface _DrillStemTest extends _FlowTestActivity {
  IntervalMeasurementSet: FlowTestMeasurementSet;
}
export interface DrillStemTest extends _DrillStemTest {}

/** Calibration parameters vary from vendor to vendor, depending on the calibration method being used. This is a general type that allows a calibration date, business associate, and many name/value pairs. */
interface _DtsCalibration extends BaseType {
  /** A  unique identifier (UID) of an instance of DtsCalibration. */
  uid: eml.String64;
  /** The business associate that performed the calibration. */
  CalibratedBy?: eml.String64;
  /** This may be a standard protocol or a software application. */
  CalibrationProtocol?: eml.String64;
  /** The date of the calibration. */
  DTimCalibration?: Date;
  /** WITSML - Extension values Schema. The intent is to allow standard WITSML "named"
   * extensions without having to modify the schema. A client or server can ignore any name that it
   * does not recognize but certain meta data is required in order to allow
   * generic clients or servers to process the value. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Attribute name is the name of the parameter. Optional attribute uom is the unit of measure of the parameter. The value of the element is the value of the parameter. Note that a string value may appear as a parameter. */
  Parameter?: CalibrationParameter[];
  /** Any remarks that may be useful regarding the calibration information. */
  Remark?: eml.String2000;
}
export interface DtsCalibration extends _DtsCalibration {}

/** The group of elements corresponding to a DTS installed system. */
interface _DtsInstalledSystem extends eml._AbstractObject {
  /** Comment about this installed system. */
  Comment?: eml.String2000;
  /** The maximum date index contained within the object. The minimum and maximum indexes are server query parameters and are populated with valid values in a "get" result.
   * For a description of the behavior related to this parameter in WITSML v1.4.1, see the WITSML API Specification appendix on "Special Handling" of growing objects. */
  DateMax?: eml.TimeStamp;
  /** The minimum date index contained within the object. The minimum and maximum indexes are server query parameters and are populated with valid values in a "get" result. That is, all measurements for a well in the specified period defined by the min/max.
   * For a description of the behavior related to this parameter in WITSML v1.4.1, see the WITSML API Specification appendix on "Special Handling" of growing objects. */
  DateMin: eml.TimeStamp;
  /** Calibration parameters vary from vendor to vendor, depending
   * on the calibration method being used. This is a general type that allows a calibration
   * date, business associate, and many  name/value pairs. */
  DtsCalibration?: DtsCalibration[];
  /** Contains details about the facility being surveyed, such as name, geographical data, etc. */
  FacilityIdentifier?: FacilityIdentifier;
  /** A reference to the instrument box data object used in this installed system. */
  InstrumentBox: eml.DataObjectReference;
  /** Total light budget available for the installation. This is generally measured in decibels, and indicates the total power loss for two-way travel of the light in the installed fiber. */
  OpticalBudget?: number;
  /** A reference to the optical path data object that is used in this installed system. */
  OpticalPath: eml.DataObjectReference;
  /** The length of the fiber installed in the wellbore. */
  OpticalPathLength?: eml.LengthMeasure;
}
export interface DtsInstalledSystem extends _DtsInstalledSystem {}

/** The group of elements corresponding to a DTS instrument box. */
interface _DtsInstrumentBox extends eml._AbstractObject {
  /** Information regarding the patch cord used to connect the instrument box to the start of the optical fiber path. */
  DtsPatchCord?: DtsPatchCord;
  /** Contains details about the facility being surveyed, such as name, geographical data, etc. */
  FacilityIdentifier?: FacilityIdentifier;
  Instrument: Instrument;
  /** Calibration parameters vary from vendor to vendor, depending
   * on the calibration method being used. This is a general type that allows a calibration
   * date, business associate, and many  name/value pairs. */
  InstrumentCalibration?: DtsCalibration[];
  /** Far distance of the oven from the beginning of the fiber. */
  InternalOvenLocationFar?: eml.LengthMeasure;
  /** Near distance of the oven from the beginning of the fiber. */
  InternalOvenLocationNear?: eml.LengthMeasure;
  /** Additional parameters to define the instrument box as a piece of equipment. These should not be parameters to define the installation or use of the box in the wellbore or other system. Only use this element if an appropriate parameter is not available as an element or in the calibration operation. */
  Parameter?: eml.ExtensionNameValue[];
  /** The temperature of the oven. */
  ReferenceCoilTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** An identification tag for the instrument box. A serial number is a type of identification tag; however, some tags contain many pieces of information. This structure only identifies the tag and does not describe the contents. */
  SerialNumber?: eml.String64;
  /** The duration of time from the initial powering on of the instrument until the first temperature measurement is permitted. */
  StartupTime?: eml.TimeMeasure;
  /** The duration of time starting from the initiation of the first temperature measurement until the unit complies with the stated values of the main measurement specifications. */
  WarmupTime?: eml.TimeMeasure;
}
export interface DtsInstrumentBox extends _DtsInstrumentBox {}

/** Header data for a particular collection of interpretation data. */
interface _DtsInterpretationData extends BaseType {
  /** Mandatory element indicating that the referenced MeasuredTraceSet object is the raw trace data from which this InterpretedData is derived. This is needed so that any InterpretedData can be related to the raw measurement from which it is derived. */
  measurementReference: eml.String64;
  /** Optional element indicating that the referenced InterpretedData object is the parent from which this InterpretedData is derived. Example, this instance may be derived from a parent by the data having been temperature-shifted to match an external data source. The element InterpretationProcessingType is provided to record which type of operation was performed on the parent data to obtain this instance of data. */
  parentInterpretationReference?: eml.String64;
  /** Unique identifier of this object. */
  uid: eml.String64;
  /** Indicates whether or not the interpretation log contains bad data. This flag allows you to keep bad data  (so at least you know that something was generated/acquired) and filter it out when doing relevant data operations. */
  BadFlag: boolean;
  /** Pointer to a ChannelSet containing the comma-delimited list of mnemonics and units, and channel data representing the interpretation data.
   *
   * BUSINESS RULE: The mnemonics and the units must follow a strict order.
   * The mnemonic list must be in this order: facilityDistance, adjustedTemperature
   *
   * The unit list must be one of the following:
   * - m,degC
   * - ft,degF */
  ChannelSet: eml.DataObjectReference;
  /** A descriptive remark about the interpretation log. */
  Comment?: eml.String2000;
  /** Time when the interpretation log data was generated. */
  CreationStartTime: Date;
  /** A reference to the facilityMapping to which this InterpretationData relates. The facility mapping relates a length of fiber to a corresponding length of a facility (probably a wellbore or pipeline). The facilityMapping also contains the datum from which the InterpretedData is indexed. */
  FacilityMapping: eml.String64;
  /** The mnemonic of the channel in the InterpretedData that represents the index to the data (expected to be a length along the facility (e.g., wellbore, pipeline) being measured. */
  IndexMnemonic: eml.String64;
  /** Indicates what type of post-processing technique was used to generate this interpretation log. Enum list. The meaning is that this process was applied to the InterpretedData referenced by the parentInterpretationID. */
  InterpretationProcessingType: InterpretationProcessingType;
  /** The number of rows in this interpreted data object. Each row or "point" represents a measurement along the fiber. */
  PointCount: number;
  /** The difference in fiber distance between consecutive temperature sample points in a single temperature trace. */
  SamplingInterval: eml.LengthMeasure;
}
export interface DtsInterpretationData extends _DtsInterpretationData {}

/** Container of interpreted data which also specifies by reference the measured data on which the interpretation is based. */
interface _DtsInterpretationLogSet extends BaseType {
  InterpretationData: DtsInterpretationData[];
  /** For a set of dtsInterpretedData logs that are generated from the same measurement (each log having gone through a different post-processing type, for example), if there is one log that is ‘preferred’ for additional business decisions (while the other ones were merely what-if scenarios), then this preferred log in the collection of child dtsInterpretedData can be flagged by referencing its UID with this element. */
  PreferredInterpretationReference?: eml.String64;
}
export interface DtsInterpretationLogSet extends _DtsInterpretationLogSet {}

/** The group of elements corresponding to a DTS measurement. */
interface _DtsMeasurement extends eml._AbstractObject {
  /** Set to 'true' when a measurement is included but is known to be bad (i.e., all the values are null). Use this flag in situations when you want to keep track of the fact that a measurement was generated/received, however the measurement was bad. */
  BadSetFlag: boolean;
  /** Set to 'true' when the measurement set is empty (only the header is provided). Use this flag for situations when the instrument box attempts to get a reading, but nothing is generated (fiber is disconnected, for example). */
  EmptySetFlag: boolean;
  /** Contains details about the facility being surveyed, such as name, geographical data, etc. */
  FacilityIdentifier: FacilityIdentifier;
  /** Reference to the installed system used to take the measurement (combination of instrument box and optical path). */
  InstalledSystem: eml.DataObjectReference;
  InterpretationLog?: DtsInterpretationLogSet;
  /** Enum. The configuration of the optical path. This may be varied from measurement to measurement, independent of the fiber path network. */
  MeasurementConfiguration: OpticalPathConfiguration;
  /** This supports user-defined "tags" (in the form of text strings) to be attached to the measurement. Example: to indicate other operations under way at the time (e.g., start of injection). */
  MeasurementTags?: eml.String64[];
  /** Header data for raw (measured) traces collections */
  MeasurementTrace?: DtsMeasurementTrace[];
  /** Time when the installed system finished taking the measurement. */
  TimeEnd?: eml.TimeStamp;
  /** Length of time that the instrument box has been up and running since its last power up. */
  TimeSinceInstrumentStartup?: eml.TimeMeasure;
  /** Time when the installed system began taking the measurement. */
  TimeStart: eml.TimeStamp;
}
export interface DtsMeasurement extends _DtsMeasurement {}

/** Header data for raw (measured) traces collections. */
interface _DtsMeasurementTrace extends BaseType {
  /** Where this dtsMeasuredTraceSet was derived from a parent dtsMeasuredTraceSet (having been recalibrated for example), the parent dtsMeasuredTraceSet can be indicated by referencing its UID with this element. */
  parentMeasurementReference?: eml.String64;
  /** Unique identifier of this object. */
  uid: eml.String64;
  /** Pointer to a ChannelSet containing the comma-delimited list of mnemonics and units, and channel data representing the measurement trace.
   *
   * BUSINESS RULE: The mnemonics and the units must follow a strict order.
   * The mnemonic list must be in this order: fiberDistance, antistokes, stokes, reverseAntiStokes, reverseStokes, rayleigh1, rayleigh2, brillouinfrequency, loss, lossRatio, cumulativeExcessLoss, frequencyQualityMeasure, measurementUncertainty, brillouinAmplitude, opticalPathTemperature, uncalibratedTemperature1, uncalibratedTemperature2
   *
   * The unit list must be one of the following:
   * - m, mW, mW, mW, mW, mW, mW, GHz, dB/Km, dB/Km, dB, dimensionless, degC, mW, degC, DegC, degC
   * - ft, mW, mW, mW, mW,mW, mW, GHz, dB/Km, dB/Km,dB, dimensionless, degF, mW, degF, degF, degF */
  ChannelSet: eml.DataObjectReference;
  /** A descriptive remark about the measured trace set. */
  Comment?: eml.String2000;
  /** Frequency reference for Rayleigh 1 measurement. */
  FrequencyRayleigh1?: eml.FrequencyMeasure;
  /** Frequency reference for Rayleigh 2 measurement. */
  FrequencyRayleigh2?: eml.FrequencyMeasure;
  /** The mnemonic of the channel in the MeasuredTraceSet that represents the index to the data (expected to be a length along the facility (e.g., wellbore, pipeline) being measured. */
  IndexMnemonic: eml.String64;
  /** The number of rows in this interpreted data object. Each row or "point" represents a measurement along the fiber. */
  PointCount: number;
  /** The difference in fiber distance between consecutive temperature sample points in a single temperature trace. */
  SamplingInterval: eml.LengthMeasure;
  /** Denotes whether the trace was stored as acquired by the measurement device or recalibrated in any way. */
  TraceProcessingType: TraceProcessingType;
}
export interface DtsMeasurementTrace extends _DtsMeasurementTrace {}

/** Information regarding the patch cord used to connect the instrument box to the start of the optical fiber path. */
interface _DtsPatchCord extends BaseType {
  /** A textual description of the patch cord. */
  Description: eml.String2000;
  /** Optical distance between the instrument and the end of the patch cord that will be attached to the rest of the optical path from which a measurement will be taken. */
  FiberLength?: eml.LengthMeasure;
}
export interface DtsPatchCord extends _DtsPatchCord {}

/** Dual Permeability reservoir model, with Cross-Flow between the two layers. */
interface _DualPermeabilityWithCrossflowModel extends _ReservoirBaseModel {
  InterporosityFlowParameter: InterporosityFlowParameter;
  Layer2Thickness?: Layer2Thickness;
  RatioLayer1ToTotalPermeabilityThicknessProduct: RatioLayer1ToTotalPermeabilityThicknessProduct;
  StorativityRatio: StorativityRatio;
}
export interface DualPermeabilityWithCrossflowModel
  extends _DualPermeabilityWithCrossflowModel {}

/** Dual Porosity reservoir model, with Pseudo-Steady-State flow between the two porosity systems. */
interface _DualPorosityPseudoSteadyStateModel extends _ReservoirBaseModel {
  InterporosityFlowParameter: InterporosityFlowParameter;
  StorativityRatio: StorativityRatio;
}
export interface DualPorosityPseudoSteadyStateModel
  extends _DualPorosityPseudoSteadyStateModel {}

/** Dual Porosity reservoir model, with transient flow between the two porosity systems, and assuming slab shaped matrix blocks. */
interface _DualPorosityTransientSlabsModel extends _ReservoirBaseModel {
  InterporosityFlowParameter: InterporosityFlowParameter;
  StorativityRatio: StorativityRatio;
}
export interface DualPorosityTransientSlabsModel
  extends _DualPorosityTransientSlabsModel {}

/** Dual Porosity reservoir model, with transient flow between the two porosity systems, and assuming spherical shaped matrix blocks. */
interface _DualPorosityTransientSpheresModel extends _ReservoirBaseModel {
  InterporosityFlowParameter: InterporosityFlowParameter;
  StorativityRatio: StorativityRatio;
}
export interface DualPorosityTransientSpheresModel
  extends _DualPorosityTransientSpheresModel {}

/** A value used for the endpoint of a date-time interval. The meaning of the endpoint of an interval must be defined by the endpoint attribute. */
interface _EndpointDateTime extends eml._TimeStamp {
  /** Defines the semantics (inclusive or exclusive) of the endpoint within the context of the interval. */
  endpoint: EndpointQualifierInterval;
}
export interface EndpointDateTime extends _EndpointDateTime {}

/** A date value used for min/max query parameters related to "growing objects". The meaning of the endpoint of an interval can be modified by the endpoint attribute. */
interface _EndpointQualifiedDate extends BaseType {
  /** The default is "inclusive". */
  endpoint?: EndpointQualifier;
}
export interface EndpointQualifiedDate extends _EndpointQualifiedDate {}

/** A timestamp value used for min/max query parameters related to "growing objects". The meaning of the endpoint of an interval can be modified by the endpoint attribute. */
interface _EndpointQualifiedDateTime extends BaseType {
  /** The default is "inclusive". */
  endpoint?: EndpointQualifier;
}
export interface EndpointQualifiedDateTime extends _EndpointQualifiedDateTime {}

/** Specifies values for the endpoint for min/max query parameters on "growing objects". */
export type EndpointQualifier =
  | "exclusive"
  | "extensive"
  | "inclusive"
  | "overlap extensive";
interface _EndpointQualifier extends eml._TypeEnum {
  _: EndpointQualifier;
}

/** Specifies the meaning of the endpoint for a simple interval. */
export type EndpointQualifierInterval = "exclusive" | "inclusive" | "unknown";
interface _EndpointQualifierInterval extends eml._TypeEnum {
  _: EndpointQualifierInterval;
}

/** A value used for the endpoint of an interval. If the value represents a measure then the unit must be specified elsewhere. The meaning of the endpoint of an interval must be defined by the endpoint attribute. */
interface _EndpointQuantity extends eml._AbstractMeasure {
  /** Defines the semantics (inclusive or exclusive) of the endpoint within the context of the interval. */
  endpoint: EndpointQualifierInterval;
}
export interface EndpointQuantity extends _EndpointQuantity {}

/** Specifies the methods for estimating deferred production. */
export type EstimationMethod =
  | "analytics model"
  | "decline curve"
  | "expert recommendation"
  | "flowing material balance"
  | "from last allocated volume"
  | "numerical reservoir simulation"
  | "production profile"
  | "rate transient analysis"
  | "ratio analysis"
  | "reservoir model"
  | "well model";
interface _EstimationMethod extends eml._TypeEnum {
  _: EstimationMethod;
}

export type EstimationMethodExt = string;
type _EstimationMethodExt = Primitive._string;

/** Forces a choice between a qualifier or one more qualified by flow and product. */
interface _ExpectedFlowQualifier extends BaseType {}
export interface ExpectedFlowQualifier extends _ExpectedFlowQualifier {}

/** Reporting Entity: The top-level entity in hierarchy structure. */
interface _Facility extends eml._AbstractObject {
  /** Enum for the kind of facility represented by this Facility.  Extensible for additional kinds. */
  Kind: ReportingFacilityExt;
}
export interface Facility extends _Facility {}

/** This object contains, for a single facility, details of the calibration process and results whereby each locus (an acquired data point along the fiber optical path) is mapped to a physical location in the facility.  This object should repeat for each distinct facility along the fiber optical path. Eg, a fiber optical path which runs along a flowline and then down a wellbore spans two facilities (flowline and wellbore), and each of these will have an instance of this object. */
interface _FacilityCalibration extends BaseType {
  Calibration?: Calibration[];
  /** The facility kind, (for example, wellbore, pipeline, etc). */
  FacilityKind: FacilityKind;
  /** Unit of measurement of FacilityLength values in DasCalibrationInputPoint and FiberLocusDepthPoint elements. Required for the HDF5 file attributes since HDF5 files do not include units of measure as standard Energistics XML does. This element is a duplication therefore, in the XML files. */
  FacilityLengthUnit: eml.LengthUom;
  /** This element contains the facility name. */
  FacilityName: eml.String64;
  /** Unit of measurement of OpticalPathDistance values in DasCalibrationInputPoint and FiberLocusDepthPoint elements. Required for the HDF5 file attributes since HDF5 files do not include units of measure as standard Energistics XML does. This element is a duplication therefore, in the XML files. */
  OpticalPathDistanceUnit: eml.LengthUom;
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
  /** If the facility is a wellbore then optionally this can be used to define a Data Object Reference to a WITSML Wellbore object. */
  Wellbore?: eml.DataObjectReference;
}
export interface FacilityCalibration extends _FacilityCalibration {}

/** Contains details about the facility being surveyed, such as name, geographical data, etc. */
interface _FacilityIdentifier extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Identifier of the business unit responsible for the facility. */
  BusinessUnit?: ProductVolumeBusinessUnit;
  /** The name and type of a facility whose context is relevant to the represented installation. */
  ContextFacility?: FacilityIdentifierStruct;
  /** The geographical information about the facility. */
  GeographicContext?: GeographicContext;
  /** The name of the facility that is represented by this facility mapping. */
  Installation?: FacilityIdentifierStruct;
  /** Type of facility where the fiber is deployed. */
  Kind?: eml.String64;
  /** Name of the facility. */
  Name: eml.NameStruct;
  /** Contact for the company/person operating the facility */
  Operator?: eml.DataObjectReference;
}
export interface FacilityIdentifier extends _FacilityIdentifier {}

/** Identifies a facility. */
interface _FacilityIdentifierStruct extends BaseType {
  /** The kind of facility. */
  kind?: ReportingFacility;
  /** The naming system within which the name is unique. For example, API or NPD. */
  namingSystem?: eml.String64;
  /** A custom sub-categorization of facility kind. This attribute is free-form text and allows implementers to provide a more specific or specialized description of the facility kind. */
  siteKind?: eml.String64;
  /** The referencing uid. */
  uidRef?: eml.String64;
}
export interface FacilityIdentifierStruct extends _FacilityIdentifierStruct {}

/** The facility kind, (for example, wellbore, pipeline, etc). */
export type FacilityKind = "generic" | "pipeline" | "wellbore";
interface _FacilityKind extends eml._TypeEnum {
  _: FacilityKind;
}

export type FacilityKindExt = string;
type _FacilityKindExt = Primitive._string;

/** Specifies the kinds of facility parameters. */
export type FacilityParameter =
  | "absorbed dose class"
  | "acceleration linear class"
  | "activity (of radioactivity) class"
  | "alarm absolute pressure"
  | "amount of substance class"
  | "angle per length"
  | "angle per time"
  | "angle per volume"
  | "angular acceleration class"
  | "annulus inner diameter"
  | "annulus outer diameter"
  | "area class"
  | "area per area"
  | "area per volume"
  | "atmospheric pressure"
  | "attenuation class"
  | "attenuation per length"
  | "available"
  | "available room"
  | "block valve status"
  | "capacitance class"
  | "categorical"
  | "cathodic protection output current"
  | "cathodic protection output voltage"
  | "charge density class"
  | "chemical potential class"
  | "choke position"
  | "choke setting"
  | "code"
  | "compressibility class"
  | "concentration of B class"
  | "conductivity class"
  | "continuous"
  | "cross section absorption class"
  | "current density class"
  | "darcy flow coefficient class"
  | "data transmission speed class"
  | "delta temperature class"
  | "density"
  | "density class"
  | "density flow rate"
  | "density standard"
  | "dewpoint temperature"
  | "differential pressure"
  | "differential temperature"
  | "diffusion coefficient class"
  | "digital storage class"
  | "dimensionless class"
  | "discrete"
  | "dose equivalent class"
  | "dose equivalent rate class"
  | "dynamic viscosity class"
  | "electric charge class"
  | "electric conductance class"
  | "electric current class"
  | "electric dipole moment class"
  | "electric field strength class"
  | "electric polarization class"
  | "electric potential class"
  | "electrical resistivity class"
  | "electrochemical equivalent class"
  | "electromagnetic moment class"
  | "energy length per area"
  | "energy length per time area temperature"
  | "energy per area"
  | "energy per length"
  | "equivalent per mass"
  | "equivalent per volume"
  | "exposure (radioactivity) class"
  | "facility uptime"
  | "flow rate"
  | "flow rate standard"
  | "force area class"
  | "force class"
  | "force length per length"
  | "force per force"
  | "force per length"
  | "force per volume"
  | "frequency class"
  | "frequency interval class"
  | "gamma ray API unit class"
  | "gas liquid ratio"
  | "gas oil ratio"
  | "gross calorific value standard"
  | "heat capacity class"
  | "heat flow rate class"
  | "heat transfer coefficient class"
  | "illuminance class"
  | "internal control valve status"
  | "irradiance class"
  | "isothermal compressibility class"
  | "kinematic viscosity class"
  | "length class"
  | "length per length"
  | "length per temperature"
  | "length per volume"
  | "level of power intensity class"
  | "light exposure class"
  | "linear thermal expansion class"
  | "luminance class"
  | "luminous efficacy class"
  | "luminous flux class"
  | "luminous intensity class"
  | "magnetic dipole moment class"
  | "magnetic field strength class"
  | "magnetic flux class"
  | "magnetic induction class"
  | "magnetic permeability class"
  | "magnetic vector potential class"
  | "mass"
  | "mass attenuation coefficient class"
  | "mass class"
  | "mass concentration"
  | "mass concentration class"
  | "mass flow rate class"
  | "mass length class"
  | "mass per energy"
  | "mass per length"
  | "mass per time per area"
  | "mass per time per length"
  | "mass per volume per length"
  | "measured depth"
  | "mobility class"
  | "modulus of compression class"
  | "molar concentration"
  | "molar fraction"
  | "molar heat capacity class"
  | "molar volume class"
  | "mole per area"
  | "mole per time"
  | "mole per time per area"
  | "molecular weight"
  | "moment of force class"
  | "moment of inertia class"
  | "moment of section class"
  | "momentum class"
  | "motor current"
  | "motor current leakage"
  | "motor speed"
  | "motor temperature"
  | "motor vibration"
  | "motor voltage"
  | "neutron API unit class"
  | "nonDarcy flow coefficient class"
  | "opening size"
  | "operations per time"
  | "parachor class"
  | "per area"
  | "per electric potential"
  | "per force"
  | "per length"
  | "per mass"
  | "per volume"
  | "permeability length class"
  | "permeability rock class"
  | "permeance class"
  | "permittivity class"
  | "pH class"
  | "plane angle class"
  | "potential difference per power drop"
  | "power class"
  | "power per volume"
  | "pressure"
  | "pressure class"
  | "pressure per time"
  | "pressure squared class"
  | "pressure squared per force time per area"
  | "pressure time per volume"
  | "productivity index class"
  | "pump count online"
  | "pump status"
  | "quantity"
  | "quantity of light class"
  | "radiance class"
  | "radiant intensity class"
  | "reciprocating speed"
  | "rectifier structure potential"
  | "reid vapor pressure"
  | "relative opening size"
  | "relative power class"
  | "relative tank level"
  | "relative time class"
  | "relative valve opening"
  | "reluctance class"
  | "resistance class"
  | "resistivity per length"
  | "root property"
  | "scheduled downtime"
  | "second moment of area class"
  | "shutdown order"
  | "shutin pressure"
  | "shutin temperature"
  | "solid angle class"
  | "specific activity (of radioactivity)"
  | "specific energy class"
  | "specific gravity"
  | "specific heat capacity class"
  | "specific productivity index class"
  | "specific volume class"
  | "sub surface safety valve status"
  | "surface density class"
  | "surface safety valve status"
  | "tank fluid level"
  | "tank product standard volume"
  | "tank product volume"
  | "temperature"
  | "temperature per length"
  | "temperature per time"
  | "thermal conductance class"
  | "thermal conductivity class"
  | "thermal diffusivity class"
  | "thermal insulance class"
  | "thermal resistance class"
  | "thermodynamic temperature class"
  | "time class"
  | "time per length"
  | "time per volume"
  | "true vapor pressure"
  | "unit productivity index class"
  | "unitless"
  | "unknown"
  | "valve opening"
  | "valve status"
  | "velocity class"
  | "volume"
  | "volume class"
  | "volume concentration"
  | "volume flow rate class"
  | "volume length per time"
  | "volume per area"
  | "volume per length"
  | "volume per time per area"
  | "volume per time per length"
  | "volume per time per time"
  | "volume per time per volume"
  | "volume per volume"
  | "volume standard"
  | "volumetric efficiency"
  | "volumetric heat transfer coefficient"
  | "volumetric thermal expansion class"
  | "well operating status"
  | "well operation type"
  | "wobbe index"
  | "work"
  | "work class";
interface _FacilityParameter extends eml._TypeEnum {
  _: FacilityParameter;
}

/** Facility parent. */
interface _FacilityParent extends _AbstractRelatedFacilityObject {
  /** For facilities whose name is unique within the context of another facility, the name of the parent facility. The name can be qualified by a naming system. This also defines the kind of facility. */
  FacilityParent1?: FacilityIdentifierStruct;
  /** For facilities whose name is unique within the context of another facility, the name of the parent facility of parent1. The name can be qualified by a naming system. This also defines the kind of facility. */
  FacilityParent2?: FacilityIdentifierStruct;
  /** The name of the facility. The name can be qualified by a naming system. This can also define the kind of facility. */
  Name: FacilityIdentifierStruct;
}
export interface FacilityParent extends _FacilityParent {}

/** Additional information required for a sample taken from a facility. */
interface _FacilitySampleAcquisition extends _FluidSampleAcquisition {
  Facility?: eml.DataObjectReference;
  /** The facility pressure for this facility sample acquisition. */
  FacilityPressure: eml.AbstractPressureValue;
  /** The facility temperature when this sample was taken. */
  FacilityTemperature: eml.ThermodynamicTemperatureMeasure;
  /** A reference to the flow port in the facility where this sample was taken. */
  SamplingPoint?: eml.String64;
}
export interface FacilitySampleAcquisition extends _FacilitySampleAcquisition {}

/** Facility unit port. */
interface _FacilityUnitPort extends _AbstractRelatedFacilityObject {
  /** The product flow network representing the facility. This is only required if the network is not the same as the primary network that represents the Product Flow Model. This must be unique within the context of the product flow model represented by this report. */
  NetworkReference?: eml.String64;
  /** The product flow port associated with the product flow unit. */
  PortReference: eml.String64;
  /** The product flow unit representing the facility. */
  UnitReference: eml.String64;
}
export interface FacilityUnitPort extends _FacilityUnitPort {}

/** In a Linear Composite model where the boundary of the inner and outer zones is a leaky and conductive fault, the fault conductivity (ie along the face of the fault). */
interface _FaultConductivity extends _AbstractParameter {
  Abbreviation: eml.String64;
  PermeabilityLength: eml.PermeabilityLengthMeasureExt;
}
export interface FaultConductivity extends _FaultConductivity {}

/** A specialization of the equipment class containing information on reflectance, loss and reason for decommissioning, from which all equipment in the optical path inherits. */
interface _FiberCommon extends _AbstractDtsEquipment {
  /** Unique identifier of this object. */
  uid: eml.String64;
  /** The fraction of incident light that is lost by a fiber path component. Measured in dB. */
  Loss?: eml.DimensionlessMeasure;
  /** Any remarks that help understand why the optical fiber is no longer in use. */
  ReasonForDecommissioning?: eml.String2000;
  /** The fraction of incident light that is reflected by a fiber path component. Measured in dB. */
  Reflectance?: eml.DimensionlessMeasure;
}
export interface FiberCommon extends _FiberCommon {}

/** A connection component within the optical path. */
interface _FiberConnection extends _FiberCommon {
  /** Specifies whether this is a dry mate or wet mate. */
  ConnectorType: FiberConnectorKind;
  /** Describes whether the fiber end is angle polished or flat polished. */
  EndType?: FiberEndKind;
}
export interface FiberConnection extends _FiberConnection {}

/** Specifies the types of fiber connector. */
export type FiberConnectorKind = "dry mate" | "wet mate";
interface _FiberConnectorKind extends eml._TypeEnum {
  _: FiberConnectorKind;
}

/** Information regarding the control line into which a fiber cable may be pumped to measure a facility. */
interface _FiberControlLine extends _AbstractCable {
  /** A reference to the control line string in a completion data object that represents this control line containing a fiber. */
  downholeControlLineReference: eml.String64;
  /** A descriptive remark about the fiber control line. */
  Comment?: eml.String2000;
  /** Enum of the size of encapsulation of a fiber within a control line. */
  EncapsulationSize: ControlLineEncapsulationSize;
  /** Enum of square or round encapsulation for a control line. A fiber may be installed inside the control line. */
  EncapsulationType: ControlLineEncapsulationKind;
  /** Enum of the common materials from which a control line may be made. A fiber may be installed inside the control line. */
  Material: ControlLineMaterial;
  /** The activity of pumping the fiber downhole into a control line (small diameter tube). */
  PumpActivity?: FiberPumpActivity[];
  /** Enum of the common sizes of control line. The enum list gives diameters and weight per length values. A fiber may be installed inside the control line. */
  Size: ControlLineSize;
}
export interface FiberControlLine extends _FiberControlLine {}

/** The means by which this fiber segment is conveyed into the well. Choices: permanent, intervention, or control line conveyance method. */
interface _FiberConveyance extends BaseType {
  Cable: AbstractCable;
}
export interface FiberConveyance extends _FiberConveyance {}

/** Specifies the types of fiber end. */
export type FiberEndKind = "angle polished" | "flat polished";
interface _FiberEndKind extends eml._TypeEnum {
  _: FiberEndKind;
}

/** If a facility mapping is not explicitly to a well or pipeline, use this element to show what optical path distances map to lengths in a generic facility. */
interface _FiberFacilityGeneric extends _AbstractFiberFacility {
  /** A comment to describe this facility. */
  FacilityKind: eml.String64;
  /** The name or description of the facility. */
  FacilityName: eml.String64;
}
export interface FiberFacilityGeneric extends _FiberFacilityGeneric {}

/** Relates lengths of fiber to corresponding lengths of facilities (probably wellbores or pipelines). The facilityMapping also contains the datum from which the InterpretedData is indexed. */
interface _FiberFacilityMapping extends BaseType {
  /** Unique identifier of this object. */
  uid: eml.String64;
  /** A descriptive remark about the facility mapping. */
  Comment?: eml.String2000;
  /** Relates distances measured along the optical path to specific lengths along facilities (wellbores or pipelines). */
  FiberFacilityMappingPart: FiberFacilityMappingPart[];
  /** Date when the mapping between the facility and the optical path is no longer valid. */
  TimeEnd?: eml.TimeStamp;
  /** Date when the mapping between the facility and the optical path becomes effective. */
  TimeStart: eml.TimeStamp;
}
export interface FiberFacilityMapping extends _FiberFacilityMapping {}

/** Relates distances measured along the optical path to specific lengths along facilities (wellbores or pipelines). */
interface _FiberFacilityMappingPart extends BaseType {
  /** Unique identifier or this object. */
  uid: eml.String64;
  /** A descriptive remark about the facility mapping. */
  Comment?: eml.String2000;
  /** Distance between the facility datum and the distance where the mapping with the optical path ends. */
  FacilityLengthEnd: eml.LengthMeasure;
  /** Distance between the facility datum and the distance where the mapping with the optical path takes place. */
  FacilityLengthStart: eml.LengthMeasure;
  FiberFacility: AbstractFiberFacility;
  /** Distance between the beginning of the optical path to the distance where the mapping with the facility ends. */
  OpticalPathDistanceEnd: eml.LengthMeasure;
  /** Distance between the beginning of the optical path to the distance where the mapping with the facility takes place. */
  OpticalPathDistanceStart: eml.LengthMeasure;
}
export interface FiberFacilityMappingPart extends _FiberFacilityMappingPart {}

/** If facility mapping is to a pipeline, this element shows what optical path distances map to pipeline lengths. */
interface _FiberFacilityPipeline extends _AbstractFiberFacility {
  /** The name and type of a facility whose context is relevant to the represented installation. */
  ContextFacility?: FacilityIdentifierStruct;
  /** A description of which "port" (i.e., connection/end or defined point on a pipeline) the facilityLength is indexed from. */
  DatumPortReference?: eml.String64;
  /** The name of the facility that is represented by this facilityMapping. */
  Installation?: FacilityIdentifierStruct;
  /** The kind of facility mapped to the optical path. Expected to be a pipeline, but this element can be used to show other facilities being mapped to fiber length in future. */
  Kind?: eml.String64;
  /** The name of this facilityMapping instance. */
  Name: eml.NameStruct;
}
export interface FiberFacilityPipeline extends _FiberFacilityPipeline {}

/** If facility mapping is to a wellbore, this element shows what optical path distances map to wellbore measured depths. */
interface _FiberFacilityWell extends _AbstractFiberFacility {
  /** The name of this facilityMapping instance. */
  Name: eml.String64;
  Wellbore: eml.DataObjectReference;
  /** A reference to the wellDatum from which the facilityLength (i.e., in this case, depth of a wellbore being mapped) is measured from. */
  WellDatum?: eml.ReferencePointKind;
}
export interface FiberFacilityWell extends _FiberFacilityWell {}

/** Specifies the modes of a distributed temperature survey (DTS) fiber. */
export type FiberMode = "multimode" | "other" | "singlemode";
interface _FiberMode extends eml._TypeEnum {
  _: FiberMode;
}

/** The power loss for one-way travel of a beam of light, usually measured in decibels per unit length. It is necessary to include both the value (and its unit) and the wavelength at which this attenuation was measured. */
interface _FiberOneWayAttenuation extends BaseType {
  /** Unique identifier of this object. */
  uid: eml.UuidString;
  AttenuationMeasure: AbstractAttenuationMeasure;
  /** The value of the one-way loss per unit of length. The usual UOM is decibels per kilometer (dB/km) although this might vary depending on the calibration method used. */
  Value: eml.LogarithmicPowerRatioPerLengthMeasure;
}
export interface FiberOneWayAttenuation extends _FiberOneWayAttenuation {}

/** The optical fiber path used for distributed property surveys, e.g. temperature (DTS) or acoustics (DAS). Comprises a number of items of equipment, such as fiber segments and connectors of various types. */
interface _FiberOpticalPath extends eml._AbstractObject {
  /** A zone of the fibre which has defective optical properties (e.g., darkening). */
  Defect?: FiberPathDefect[];
  /** Contains details about the facility being surveyed, such as name, geographical data, etc. */
  FacilityIdentifier?: FacilityIdentifier;
  /** Relates distances measured along the optical path to specific lengths along facilities (wellbores or pipelines). */
  FacilityMapping?: FiberFacilityMapping[];
  /** The vendor who performed the physical deployment */
  InstallingVendor?: eml.DataObjectReference;
  /** The list of equipment used in the optical path.  Equipment may be used in the optical path for different periods of time, so this inventory contains all items of equipment which are used at some period of time. */
  Inventory: FiberOpticalPathInventory;
  OpticalPathNetwork?: FiberOpticalPathNetwork[];
  /** This records the result arrays along with context information for an Optical Time Domain Reflectometry (OTDR) survey.
   * The arrays will define the relative scattered power from the Rayleigh scattering vs distance along the fiber.
   * The actual data values are recorded in a OTDR file and/or image file, which are referenced in subelements. */
  Otdr?: eml.DataObjectReference[];
}
export interface FiberOpticalPath extends _FiberOpticalPath {}

/** The list of equipment used in the optical path. Equipment may be used in the optical path for different periods of time, so this inventory contains all items of equipment that are used at some period of time. */
interface _FiberOpticalPathInventory extends BaseType {
  /** A connection component within the optical path. */
  Connection?: FiberConnection[];
  /** A single segment of the optical fiber used for distributed temperature surveys. Multiple such segments may be connected by other types of component including connectors, splices and fiber turnarounds. */
  Segment: FiberOpticalPathSegment[];
  /** A splice component within the optical path. */
  Splice?: FiberSplice[];
  /** The terminator of the optical path. This may be a component (in the case of a single ended fiber installation), or it may be a connection back into the instrument box in the case of a double ended fiber installation. */
  Terminator: FiberTerminator;
  /** A turnaround component within the optical path. */
  Turnaround?: FiberTurnaround[];
}
export interface FiberOpticalPathInventory extends _FiberOpticalPathInventory {}

/** The sequence of connected items of equipment along the optical path. Represented by a flow network. */
interface _FiberOpticalPathNetwork extends BaseType {
  /** Unique identifier of this object. */
  uid: eml.String64;
  /** Comment. */
  Comment?: eml.String2000;
  /** Context facility. */
  ContextFacility: FacilityIdentifierStruct[];
  /** DTimeEnd. */
  DTimeEnd?: eml.TimeStamp;
  /** DTimMax. */
  DTimMax?: EndpointQualifiedDateTime;
  /** DTimMin. */
  DTimMin?: EndpointQualifiedDateTime;
  /** DTimStart. */
  DTimStart?: eml.TimeStamp;
  /** ExistenceTime. */
  ExistenceTime?: EndpointQualifiedDateTime;
  ExternalConnect?: ProductFlowExternalReference[];
  /** Installation. */
  Installation?: FacilityIdentifierStruct;
  Network: ProductFlowNetwork[];
}
export interface FiberOpticalPathNetwork extends _FiberOpticalPathNetwork {}

/** A single segment of the optical fiber used for distributed temperature surveys. Multiple such segments may be connected by other types of components including connectors, splices and fiber turnarounds. */
interface _FiberOpticalPathSegment extends _FiberCommon {
  /** Enum. The type of cable used in this segment. Example: single-fiber-cable. */
  CableType?: CableKind;
  /** The diameter of the core plus the cladding, generally measured in microns (um). */
  CladdedDiameter?: eml.LengthMeasure;
  /** The type of coating on the fiber. */
  Coating?: eml.String64;
  /** The inner diameter of the core, generally measured in microns (um). */
  CoreDiameter?: eml.LengthMeasure;
  /** Property of the fiber core. */
  CoreType?: eml.String64;
  /** The means by which this fiber segment is conveyed into the well. */
  FiberConveyance?: FiberConveyance;
  /** The length of fiber in this optical path section. */
  FiberLength: eml.LengthMeasure;
  /** The type of jacket covering the fiber. */
  Jacket?: eml.String64;
  /** The mode of fiber. Enum. Values are single- or multi- mode fiber, or other/unknown. */
  Mode?: FiberMode;
  /** The power loss for one way travel of a beam of light, usually measured in decibels per unit length. It is necessary to include both the value (and its unit) and the wavelength. The wavelength varies with the refractive index, while the frequency remains constant.
   * The wavelength given to specify this type is the wavelength in a vacuum (refractive index = 1). */
  OneWayAttenuation?: FiberOneWayAttenuation[];
  /** The diameter of the cable containing the fiber, including all its sheathing layers. */
  OutsideDiameter?: eml.LengthMeasure;
  /** For this fiber segment, the amount of "overstuffing", i.e., the excess length of fiber that was installed compared to the length of the facility that is to be surveyed. Example: if 110 m of fiber were to be installed to measure 100 m length of pipeline, the overstuffing would be 10 m. Overstuffing can be allowed for in the facilityMapping section. The overstuffing is assumed to be linear distributed along the facility being measured. */
  OverStuffing?: eml.LengthMeasure;
  /** Additional parameters to define the fiber as a material. */
  Parameter?: eml.ExtensionNameValue[];
  /** The refractive index of a material depends on the frequency (or wavelength) of the light. Hence it is necessary to include both the value (a unitless number) and the frequency (or wavelength) it was measured at. The frequency will be a quantity type with a frequency unit such as Hz. */
  RefractiveIndex?: FiberRefractiveIndex[];
  /** The length of the fiber on the spool when purchased. */
  SpoolLength?: eml.LengthMeasure;
  /** The spool number of the particular spool from which this fiber segment was taken. The spool number may contain alphanumeric characters. */
  SpoolNumberTag?: eml.String64;
}
export interface FiberOpticalPathSegment extends _FiberOpticalPathSegment {}

/** Information about an OTDR instrument box taht is used to perform OTDR surveys on the optical path. */
interface _FiberOTDRInstrumentBox extends _Instrument {}
export interface FiberOTDRInstrumentBox extends _FiberOTDRInstrumentBox {}

/** A zone of the fiber that has defective optical properties (e.g., darkening). */
interface _FiberPathDefect extends BaseType {
  /** The unique identifier of this object. */
  defectID: eml.String64;
  /** A descriptive remark about the defect found on this location. */
  Comment?: eml.String2000;
  /** Enum. The type of defect on the optical path. */
  DefectType: PathDefectKind;
  /** Ending point of the detected defect as distance in the optical path from the lightbox. if the defect is found at a specific location rather than a segment, then it can have the same value as the opticalPathDistanceStart. */
  OpticalPathDistanceEnd?: eml.LengthMeasure;
  /** Starting point of the detected defect as distance in the optical path from the lightbox. */
  OpticalPathDistanceStart: eml.LengthMeasure;
  /** Date when the defect was no longer detected (or was corrected). */
  TimeEnd?: eml.TimeStamp;
  /** Date when the defect was detected. */
  TimeStart?: eml.TimeStamp;
}
export interface FiberPathDefect extends _FiberPathDefect {}

/** The activity of pumping the fiber downhole into a control line (small diameter tube). */
interface _FiberPumpActivity extends BaseType {
  /** Unique identifier of this object. */
  uid: eml.String64;
  /** The date the cable meter was calibrated. */
  CableMeterCalibrationDate?: Date;
  /** The serial number of the cable meter. */
  CableMeterSerialNumber?: eml.String64;
  /** The type of cable meter. */
  CableMeterType?: eml.String64;
  /** Comment about the pump activity. */
  Comment?: eml.String2000;
  /** The type of fluid used in the control line. */
  ControlLineFluid?: eml.String64;
  /** The person in charge of the pumping activity. */
  EngineerName?: eml.String64;
  /** The length of the excess fiber that was removed. */
  ExcessFiberRecovered?: eml.LengthMeasure;
  /** The type of end seal on the fiber. */
  FiberEndSeal?: eml.String64;
  /** The name of the InstalledFiberInstance that this activity relates to. */
  InstalledFiber?: eml.String64;
  /** A name that can be used to reference the pumping activity. In general, a pumping activity does not have a natural name, so this element is often not used. */
  Name?: eml.String64;
  /** The direction of the pumping. */
  PumpDirection?: eml.String64;
  /** The type of fluid used in the pump. */
  PumpFluidType?: eml.String64;
  /** The date of the pumping activity. */
  PumpingDate?: Date;
  /** The company that performed the pumping activity. */
  ServiceCompany?: eml.String64;
}
export interface FiberPumpActivity extends _FiberPumpActivity {}

/** The refractive index of a material depends on the frequency (or wavelength) of the light. Hence, it is necessary to include both the value (a unitless number) and the frequency (or wavelength) it was measured at. The frequency will be a quantity type with a frequency unit such as Hz. */
interface _FiberRefractiveIndex extends BaseType {
  /** Unique identifier of this object. */
  uid: eml.String64;
  /** The frequency (and UOM) for which the refractive index is measured. */
  Frequency?: eml.FrequencyMeasure;
  /** The value of the refractive index. */
  Value: eml.LogarithmicPowerRatioPerLengthMeasure;
  /** The wavelength (and UOM) for which the refractive index is measured. The reported wavelength should be the wavelength of the light in a vacuum. */
  Wavelength?: eml.LengthMeasure;
}
export interface FiberRefractiveIndex extends _FiberRefractiveIndex {}

/** A splice component within the optical path. */
interface _FiberSplice extends _FiberCommon {
  /** The measurement of the bend on the splice. */
  BendAngle?: eml.PlaneAngleUom;
  /** Enum. The type of splice. */
  FiberSpliceType: FiberSpliceKind;
  /** The pressure rating for which the splice is expected to withstand. */
  PressureRating?: eml.PressureMeasure;
  /** A useful description of the type of protector used in the splice. */
  ProtectorType?: eml.String64;
  /** A useful description of the equipment used to create the splice. */
  SpliceEquipmentUsedReference?: eml.String64;
  /** A useful description of the stripping type that was conducted. */
  StrippingType?: eml.String64;
}
export interface FiberSplice extends _FiberSplice {}

/** Specifies the type of fiber splice. */
export type FiberSpliceKind = "cable splice" | "h splice" | "user-custom";
interface _FiberSpliceKind extends eml._TypeEnum {
  _: FiberSpliceKind;
}

/** The terminator of the optical path. This may be a component (in the case of a single ended fiber installation), or it may be a connection back into the instrument box in the case of a double ended fiber installation. */
interface _FiberTerminator extends _FiberCommon {
  /** Information about the termination used for the fiber. */
  TerminationType: TerminationKind;
}
export interface FiberTerminator extends _FiberTerminator {}

/** A turnaround component within the optical path. */
interface _FiberTurnaround extends _FiberCommon {}
export interface FiberTurnaround extends _FiberTurnaround {}

/** Finite radius model with radial flow into wellbore with skin factor. */
interface _FiniteRadiusModel extends _NearWellboreBaseModel {
  SkinLayer2RelativeToTotalThickness?: SkinLayer2RelativeToTotalThickness;
}
export interface FiniteRadiusModel extends _FiniteRadiusModel {}

/** Flashed gas. */
interface _FlashedGas extends BaseType {
  /** This density is measured at the standard conditions for this Fluid Analysis. */
  GasDensity?: eml.MassPerVolumeMeasureExt;
  /** The gas gravity of the flashed gas in this atmospheric flash test. */
  GasGravity?: number;
  /** The molecular weight of the gas phase at this test step. */
  GasMolecularWeight?: eml.MolecularWeightMeasure;
  /** The gas Z factor value at this test step. */
  GasZFactor?: number;
  /** The amount of heat released during the combustion of a specified amount of gas. It is also known as higher heating value (HHV), gross energy, upper heating value, gross calorific value (GCV) or higher calorific Value (HCV). This value takes into account the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is practical. */
  GrossEnergyContentPerUnitMass?: eml.EnergyPerMassMeasureExt;
  /** The amount of heat released during the combustion of a specified amount of gas. It is also known as higher heating value (HHV), gross energy, upper heating value, gross calorific value (GCV) or higher calorific value (HCV). This value takes into account the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is practical. */
  GrossEnergyContentPerUnitVolume?: eml.EnergyPerVolumeMeasureExt;
  /** The amount of heat released during the combustion of a specified amount of gas. It is also known as lower heating value (LHV), net energy, net calorific value (NCV) or lower calorific value (LCV). This value ignores the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is not possible and is ignored. */
  NetEnergyContentPerUnitMass?: eml.EnergyPerMassMeasureExt;
  /** The amount of heat released during the combustion of a specified amount of gas. It is also known as lower heating value (LHV), net energy, net calorific value (NCV) or lower calorific value (LCV). This value ignores the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is not possible and is ignored. */
  NetEnergyContentPerUnitVolume?: eml.EnergyPerVolumeMeasureExt;
  /** The vapor composition of the flashed gas in this atmospheric flash test. */
  VaporComposition?: VaporComposition;
}
export interface FlashedGas extends _FlashedGas {}

/** Flashed liquid. */
interface _FlashedLiquid extends BaseType {
  /** The oil API gravity of the flashed liquid in this atmospheric flash test. */
  LiquidComposition?: LiquidComposition;
  /** This density is measured at the standard conditions for this Fluid Analysis. */
  LiquidDensity?: eml.MassPerVolumeMeasureExt;
  /** The oil molecular weight of the flashed liquid in this atmospheric flash test. */
  OilAPIGravity?: eml.APIGravityMeasure;
  /** The liquid composition of the flashed liquid in this atmospheric flash test. */
  OilMolecularWeight?: eml.MolecularWeightMeasure;
}
export interface FlashedLiquid extends _FlashedLiquid {}

/** Specifies qualifiers for the type of flow. */
export type FlowQualifier =
  | "allocated"
  | "budget"
  | "constraint"
  | "derived"
  | "difference"
  | "estimate"
  | "forecast"
  | "mass adjusted"
  | "measured"
  | "metered"
  | "metered - fiscal"
  | "nominated"
  | "potential"
  | "processed"
  | "quota"
  | "recommended"
  | "simulated"
  | "target"
  | "tariff basis"
  | "value adjusted";
interface _FlowQualifier extends eml._TypeEnum {
  _: FlowQualifier;
}

/** Specifies specializations of a flow qualifier. */
export type FlowSubQualifier =
  | "decline curve"
  | "difference"
  | "fiscal"
  | "fixed"
  | "maximum"
  | "minimum"
  | "raw"
  | "recalibrated"
  | "standard";
interface _FlowSubQualifier extends eml._TypeEnum {
  _: FlowSubQualifier;
}

/** Describes the measurement set of  a single flow test activity.  In most types of tests, this measurement set is obtained at one interval (an interval being a connection to reservoir).
 * In interference tests (vertical or interwell) there will be more than 1 interval, each with its own measurement set.
 * This object is abstract; you must choose one of the available types. */
interface _FlowTestActivity extends eml._AbstractObject {}
export interface FlowTestActivity extends _FlowTestActivity {}

/** Operational data regarding flow test. Links to the following (of which there can be multiple):
 * - Flow Test Activity
 * - PressureTransientAnalysis
 * - PtaDataPreProcess
 * - PtaDeconvolution
 *
 * It can also link to one Fluid Sample Acquisition Job. */
interface _FlowTestJob extends eml._AbstractObject {
  Client?: eml.DataObjectReference;
  EndTime?: eml.TimeStamp;
  /** Superclass of possible flow test activities: drill stem, production transient, interwell, and others. */
  FlowTestActivity?: eml.DataObjectReference[];
  FluidSampleAcquisitionJob?: eml.DataObjectReference;
  /** Contains the data about the analysis and the model used, in a PTA Analysis.  An Analysis may be a pressure transient (PTA), rate transient (RTA) or Test Design, depending on which data is supplied. This object contains common parameters. The Analysis has one or more Test Location Analysis elements and each reports the model details for one Test Location. */
  PressureTransientAnalysis?: eml.DataObjectReference[];
  /** Superclass defining data acquisition for the flow test, input and pre-processing data */
  PtaDataPreProcess?: eml.DataObjectReference[];
  /** Superclass of deconvolution pressure and flowrate measurements, test and method information. */
  PtaDeconvolution?: eml.DataObjectReference[];
  ServiceCompany?: eml.DataObjectReference;
  StartTime?: eml.TimeStamp;
}
export interface FlowTestJob extends _FlowTestJob {}

/** Describes the location of the reservoir connection from which pressure and/or flow are being measured.
 *
 * BUSINESS RULE: Can be one of: (i) a named wellbore (a WITSML object) together with a MD Interval; (ii) a named Wellbore Completion (a WITSML object with physical details of a completion), (iii) a named well (a WITSML object), (iv) a named Reporting Entity (which is a generic object to represent a location for flow reporting in the PRODML Simple Product Volume Reporting schema), or (v) a Probe on a wireline or LWD formation tester tool, in which case it has single Probe Depth and Probe Diameter.
 *
 * A wellbore + MD Interval, or a wellbore completion option would be expected for most tests.  The well, or well completion options could be used for a test commingling flow multiple wellbores or completions.  See the WITSML documentation for Completion for more details. The Reporting Entity option could be used for the testing of some less common combination of sources, eg a cluster of wells.
 *
 * NOTE that well, wellbore, well completion, wellbore completion and reporting entity elements are all Data Object References (see Energistics Common documentation). These are used to reference separate data objects which fully describe the real-world facilities concerned.
 *
 * However, it is not necessary for the separate data object to exist. The elements can be used as follows:
 *
 * - The Title element of the data object reference class is used to identify the name of the real-world facility, eg the well name, as a text string.
 *
 * - The mandatory Content Type element would contain the class of the referenced object (the same as the element name).
 *
 * - The mandatory  UUID String can contain any dummy uuid-like string. */
interface _FlowTestLocation extends BaseType {
  /** Textual description about the value of this field. */
  Datum?: eml.ReferencePointKind;
  /** A reference, using data object reference, to the MdInterval which represents this flowing interval. */
  MdInterval?: eml.MdInterval;
  /** The depth of a probe if this is the connection to reservoir in a wireline or LWD formation tester tool. A single depth rather than a range. */
  ProbeDepth?: eml.LengthMeasure;
  /** The diameter of a probe if this is the connection to reservoir in a wireline or LWD formation tester tool. The probe diameter governs the area open to flow from the formation. */
  ProbeDiameter?: eml.LengthMeasure;
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
  /** A reference, using data object reference, to the ReportingEntity which represents this flowing interval. */
  ReportingEntity?: eml.DataObjectReference;
  /** A reference, using data object reference, to the Well which represents this flowing interval. */
  Well?: eml.DataObjectReference;
  /** A reference, using data object reference, to the Wellbore which represents this flowing interval. */
  Wellbore?: eml.DataObjectReference;
  /** A reference, using data object reference, to the WellboreCompletion which represents this flowing interval. */
  WellboreCompletion?: eml.DataObjectReference;
  /** A reference, using data object reference, to the WellCompletion which represents this flowing interval. */
  WellCompletion?: eml.DataObjectReference;
}
export interface FlowTestLocation extends _FlowTestLocation {}

/** This contains all the measurements associated with flow and/or measurements at one interval, e.g., a Wireline Formation Tester Station, a Drill Stem Test, a Rate Transient data set.
 *
 * There is a mandatory Location. There are any number of Test Periods. There are any number of Time Series of data, each of which contains point data in a Channel data object. */
interface _FlowTestMeasurementSet extends BaseType {
  /** Unique identifier for this instance of the object. */
  uid?: eml.String64;
  /** Fluid component catalog. */
  FluidComponentCatalog?: FluidComponentCatalog;
  /** Describes the location of the reservoir connection from which pressure and/or flow are being measured.
   *
   * BUSINESS RULE: Can be one of: (i) a named wellbore (a WITSML object) together with a MD Interval; (ii) a named Wellbore Completion (a WITSML object with physical details of a completion), (iii) a named well (a WITSML object), (iv) a named Reporting Entity (which is a generic object to represent a location for flow reporting in the PRODML Simple Product Volume Reporting schema), or (v) a Probe on a wireline or LWD formation tester tool, in which case it has single Probe Depth and Probe Diameter.
   *
   * A wellbore + MD Interval, or a wellbore completion option would be expected for most tests.  The well, or well completion options could be used for a test commingling flow multiple wellbores or completions.  See the WITSML documentation for Completion for more details. The Reporting Entity option could be used for the testing of some less common combination of sources, eg a cluster of wells.
   *
   * NOTE that well, wellbore, well completion, wellbore completion and reporting entity elements are all Data Object References (see Energistics Common documentation). These are used to reference separate data objects which fully describe the real-world facilities concerned.
   *
   * However, it is not necessary for the separate data object to exist. The elements can be used as follows:
   *
   * - The Title element of the data object reference class is used to identify the name of the real-world facility, eg the well name, as a text string.
   *
   * - The mandatory Content Type element would contain the class of the referenced object (the same as the element name).
   *
   * - The mandatory  UUID String can contain any dummy uuid-like string. */
  Location: FlowTestLocation;
  MeasuredFlowRate?: AbstractPtaFlowData[];
  MeasuredPressure?: MeasuredPressureData[];
  OtherData?: OtherData[];
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
  /** Test conditions for a production well test. */
  TestPeriod?: TestPeriod;
}
export interface FlowTestMeasurementSet extends _FlowTestMeasurementSet {}

/** Fluid analysis. */
interface _FluidAnalysis extends eml._AbstractObject {
  /** The description about the analysis. */
  AnalysisDescription?: eml.String2000;
  /** The purpose of this analysis. */
  AnalysisPurpose?: eml.String2000;
  /** Enum for the quality of this analysis.  See sample quality. */
  AnalysisQuality: SampleQuality;
  /** The location site of the analysis. */
  AnalysisSite?: eml.String2000;
  Client?: eml.DataObjectReference;
  EndTime?: eml.TimeStamp;
  /** Fluid analysis report. */
  FluidAnalysisReport?: FluidAnalysisReport[];
  /** The fluid component catalog for this fluid analysis. */
  FluidComponentCatalog?: FluidComponentCatalog;
  /** The name of the analyst or user who is responsible for the results. */
  LabContact?: eml.DataObjectReference;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The date the fluid analysis was requested of a lab services provider (eg the date of a contract or purchase order)." */
  RequestDate?: Date;
  /** Sample contaminant information. */
  SampleContaminant?: SampleContaminant[];
  /** The standard temperature and pressure used for the representation of this fluid analysis. */
  StandardConditions: eml.AbstractTemperaturePressure;
  StartTime?: eml.TimeStamp;
}
export interface FluidAnalysis extends _FluidAnalysis {}

/** Fluid analysis report. */
interface _FluidAnalysisReport extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The laboratory that provided this fluid analysis report. */
  AnalysisLaboratory?: eml.String64;
  /** The author of this fluid analysis report. */
  Author?: eml.String64;
  /** The date of this report. */
  ReportDate?: Date;
  /** A reference to the report document, which will use the Energistics Attachment Object. */
  ReportDocument?: eml.DataObjectReference;
  /** The identifier of this fluid analysis report. */
  ReportIdentifier?: eml.String64;
  ReportLocation?: ReportLocation[];
}
export interface FluidAnalysisReport extends _FluidAnalysisReport {}

/** Specifies the conditions of a fluid analysis step. */
export type FluidAnalysisStepCondition =
  | "current reservoir conditions"
  | "initial reservoir conditions"
  | "initial saturation conditions"
  | "stock tank conditions";
interface _FluidAnalysisStepCondition extends eml._TypeEnum {
  _: FluidAnalysisStepCondition;
}

/** Fluid characterization. */
interface _FluidCharacterization extends eml._AbstractObject {
  /** The software which is the consumer of the fluid characterization. */
  ApplicationTarget?: eml.String2000[];
  /** The fluid component catalog for this fluid characterization. */
  FluidComponentCatalog?: FluidComponentCatalog;
  FluidSystem?: eml.DataObjectReference;
  /** The intended usage of the fluid characterization. */
  IntendedUsage?: eml.String64;
  /** The kind of fluid characterization. */
  Kind?: eml.String64;
  /** The model used to generate the fluid characterization. */
  Model?: FluidCharacterizationModel[];
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** Reference to a RockFluidUnitInterpretation (a RESQML class). */
  RockFluidUnitInterpretation?: eml.DataObjectReference;
  /** Reference to the fluid analysis tests which were the source data for this fluid characterization. */
  Source?: FluidCharacterizationSource[];
  /** The standard temperature and pressure used for the representation of this fluid characterization. */
  StandardConditions?: eml.AbstractTemperaturePressure;
  /** The collection of fluid characterization table formats. */
  TableFormat?: FluidCharacterizationTableFormat[];
}
export interface FluidCharacterization extends _FluidCharacterization {}

/** Fluid characterization model. */
interface _FluidCharacterizationModel extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The constant definition used in the table. */
  FluidCharacterizationParameterSet?: FluidCharacterizationParameterSet;
  /** Fluid characterization table. */
  FluidCharacterizationTable?: FluidCharacterizationTable[];
  ModelSpecification?: AbstractPvtModel;
  /** The name of the fluid analysis result. */
  Name?: eml.String64;
  /** The reference pressure for this fluid characterization. */
  ReferencePressure?: eml.AbstractPressureValue;
  /** Reference to the separator stage. */
  ReferenceSeparatorStage?: ReferenceSeparatorStage[];
  /** The reference stock tank pressure for this fluid characterization. */
  ReferenceStockTankPressure?: eml.AbstractPressureValue;
  /** The reference stock tank temperature for this fluid characterization. */
  ReferenceStockTankTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The reference temperature for this fluid characterization. */
  ReferenceTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface FluidCharacterizationModel
  extends _FluidCharacterizationModel {}

/** The constant definition used in the table. */
interface _FluidCharacterizationParameter extends BaseType {
  /** Reference to the fluid component to which this value relates. */
  fluidComponentReference?: eml.String64;
  /** User-defined name for this attribute. */
  name?: eml.String64;
  /** The UOM for this constant for this fluid characterization table. */
  uom: eml.String64;
  /** The value for this table constant. */
  value: number;
  KeywordAlias?: eml.ObjectAlias[];
  Phase?: ThermodynamicPhase;
  /** The property that this table constant contains. Enum. See output fluid property ext. */
  Property: OutputFluidPropertyExt;
}
export interface FluidCharacterizationParameter
  extends _FluidCharacterizationParameter {}

/** The constant definition used in the table. */
interface _FluidCharacterizationParameterSet extends BaseType {
  /** The constant definition used in the table. */
  FluidCharacterizationParameter: FluidCharacterizationParameter[];
}
export interface FluidCharacterizationParameterSet
  extends _FluidCharacterizationParameterSet {}

/** Fluid characterization source. */
interface _FluidCharacterizationSource extends BaseType {
  FluidAnalysis?: eml.DataObjectReference;
  /** A reference to a fluid analysis test which was used as source data for this fluid characterization. */
  FluidAnalysisTestReference?: eml.String64[];
}
export interface FluidCharacterizationSource
  extends _FluidCharacterizationSource {}

/** Fluid characterization table. */
interface _FluidCharacterizationTable extends BaseType {
  /** The name of this table. */
  name: eml.String64;
  /** The uid reference of the table format for this table. */
  tableFormat: eml.String64;
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** A constant associated with this fluid characterization table. */
  TableConstant?: FluidCharacterizationParameter[];
  TableRow: FluidCharacterizationTableRow[];
}
export interface FluidCharacterizationTable
  extends _FluidCharacterizationTable {}

/** Column of a table. */
interface _FluidCharacterizationTableColumn extends BaseType {
  /** The  reference to a fluid component for this column in this fluid characterization table. */
  fluidComponentReference?: eml.String64;
  /** The name for this column in this fluid characterization table. */
  name?: eml.String64;
  /** Index number for this column for consumption by an external system. */
  sequence?: eml.NonNegativeLong;
  /** The UOM for this column in this fluid characterization table. */
  uom: eml.UnitOfMeasureExt;
  KeywordAlias?: eml.ObjectAlias[];
  Phase?: ThermodynamicPhase;
  /** The property that this column contains. Enum. See output fluid property ext. */
  Property: OutputFluidPropertyExt;
}
export interface FluidCharacterizationTableColumn
  extends _FluidCharacterizationTableColumn {}

/** Fluid characterization table format. */
interface _FluidCharacterizationTableFormat extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The delimiter for this fluid characterization table format. */
  Delimiter?: eml.String64;
  /** The null value for this fluid characterization table format. */
  NullValue?: eml.String64;
  TableColumn: FluidCharacterizationTableColumn[];
}
export interface FluidCharacterizationTableFormat
  extends _FluidCharacterizationTableFormat {}

/** A set of table format definitions. */
interface _FluidCharacterizationTableFormatSet extends BaseType {
  /** Fluid characterization table format. */
  FluidCharacterizationTableFormat: FluidCharacterizationTableFormat[];
}
export interface FluidCharacterizationTableFormatSet
  extends _FluidCharacterizationTableFormatSet {}

/** A string containing the contents of a row of the table, as a sequence of values, one per Fluid Characterization Table Column which has been defined. Values are separated by the Delimiter specified in the Table Format, and use Null Values when required, also as specified in the Table Format. */
interface _FluidCharacterizationTableRow extends eml._AbstractString {
  /** This type characteristic describes the row of data as either saturated or under-saturated at the conditions defined for the row. */
  kind?: SaturationKind;
  /** The ID (index) of this row of data in the Table Row. */
  row: eml.String64;
}
export interface FluidCharacterizationTableRow
  extends _FluidCharacterizationTableRow {}

/** Specifies, in a mixture such as an oil or gas, either a single chemical component, a group of isomeric chemicals, or a fraction. */
export type FluidComponentBasis =
  | "1"
  | "1-dimethylcyclopentane"
  | "2"
  | "2 dimethylbenzene"
  | "2 dimethylpropane"
  | "2-dimethylbutane"
  | "2-dimethylcyclopentane"
  | "2-dimethylhexane"
  | "2-dimethylpentane"
  | "2-methylbutane"
  | "2-methylhexane"
  | "2-methylpentane"
  | "2-methylpropane"
  | "3"
  | "3 dimethylbenzene"
  | "3-dimethylbutane"
  | "3-dimethylcyclopentane"
  | "3-dimethylpentane"
  | "3-ethylpentane"
  | "3-methylhexane"
  | "3-methylpentane"
  | "3-trimethylbutane"
  | "3-trimethylpentane"
  | "4-dimethylbenzene"
  | "4-dimethylhexane"
  | "4-Dimethylpentane"
  | "4-trimethylbenzene"
  | "5-dimethylhexane"
  | "argon"
  | "benzene"
  | "butane"
  | "c11 fraction"
  | "c12 fraction"
  | "c13 fraction"
  | "c14 fraction"
  | "c15 fraction"
  | "c16 fraction"
  | "c17 fraction"
  | "c18 fraction"
  | "c19 fraction"
  | "c20 fraction"
  | "c21 fraction"
  | "c22 fraction"
  | "c23 fraction"
  | "c24 fraction"
  | "c25 fraction"
  | "c26 fraction"
  | "c27 fraction"
  | "c28 fraction"
  | "c29 fraction"
  | "c30 fraction"
  | "c31 fraction"
  | "c32 fraction"
  | "c33 fraction"
  | "c34 fraction"
  | "c35 fraction"
  | "c36 fraction"
  | "c37 fraction"
  | "c38 fraction"
  | "c39 fraction"
  | "c40 fraction"
  | "c41 fraction"
  | "c42 fraction"
  | "c43 fraction"
  | "c44 fraction"
  | "c45 fraction"
  | "c46 fraction"
  | "c47 fraction"
  | "c48 fraction"
  | "c49 fraction"
  | "carbon dioxide"
  | "cis-1"
  | "cyclohexane"
  | "cyclopentane"
  | "decanes"
  | "ethane"
  | "ethylbenzene"
  | "ethylcyclopentane"
  | "heptanes"
  | "hexane"
  | "hexanes"
  | "hydrogen"
  | "hydrogen sulfide"
  | "methane"
  | "methylbenzene"
  | "methylcyclohexane"
  | "methylcyclopentane"
  | "nitrogen"
  | "nonanes"
  | "octanes"
  | "oxygen"
  | "pentane"
  | "propane"
  | "trans-1"
  | "unknown"
  | "water";
interface _FluidComponentBasis extends eml._TypeEnum {
  _: FluidComponentBasis;
}

/** Fluid component catalog. */
interface _FluidComponentCatalog extends BaseType {
  /** Formation water. */
  FormationWater?: FormationWater[];
  /** Natural gas. */
  NaturalGas?: NaturalGas[];
  /** Plus-fluid component. */
  PlusFluidComponent?: PlusFluidComponent[];
  /** Pseudo-fluid component. */
  PseudoFluidComponent?: PseudoFluidComponent[];
  /** Pure fluid component. */
  PureFluidComponent?: PureFluidComponent[];
  /** Stock tank oil. */
  StockTankOil?: StockTankOil[];
  SulfurFluidComponent?: SulfurFluidComponent[];
}
export interface FluidComponentCatalog extends _FluidComponentCatalog {}

/** Fractions of a flluid component. It's expected but not required that only one of the fractions will be populated. */
interface _FluidComponentFraction extends BaseType {
  /** Fluid component reference. */
  fluidComponentReference: eml.String64;
  /** This element can be used where a measurement for a concentration is only capable of a “yes/no” type accuracy. Values can be ADL (meaning the measurement was Above Detectable Limits) or BDL (meaning the measurement was Below Detectable Limits). If the condition is “ADL” then the concentration as reported in Mass Fraction or Mole Fraction is expected to represent the maximum value which can be distinguished (so that we know the actual value to be equal to or greater than that). If the condition is “BDL” then the concentration as reported in Mass Fraction or Mole Fraction is expected to represent the minimum value which can be distinguished (so that we know the actual value to be equal to or less than that). */
  ConcentrationRelativeToDetectableLimits?: DetectableLimitRelativeStateKind;
  /** K value. */
  KValue?: eml.AmountOfSubstancePerAmountOfSubstanceMeasure;
  /** The mass fraction for the fluid component. */
  MassFraction?: eml.MassPerMassMeasure;
  /** The mole fraction for the fluid component. */
  MoleFraction?: eml.AmountOfSubstancePerAmountOfSubstanceMeasure;
  VolumeConcentration?: eml.MassPerVolumeMeasureExt;
  VolumeFraction?: eml.VolumePerVolumeMeasureExt;
}
export interface FluidComponentFraction extends _FluidComponentFraction {}

/** The properties of a fluid component. */
interface _FluidComponentProperty extends BaseType {
  /** The reference to the fluid component to which these properties apply. */
  fluidComponentReference: eml.String64;
  /** The acentric factor for this fluid component. */
  AcentricFactor?: number;
  /** The compact volume for this fluid component. */
  CompactVolume?: eml.VolumeMeasure;
  /** The critical pressure for this fluid component. */
  CriticalPressure?: eml.PressureMeasure;
  /** The critical temperature for this fluid component. */
  CriticalTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The critical viscosity for this fluid component. */
  CriticalViscosity?: eml.DynamicViscosityMeasure;
  /** The critical volume for this fluid component. */
  CriticalVolume?: eml.MolarVolumeMeasure;
  /** The mass density for this fluid component. */
  MassDensity?: eml.MassPerVolumeMeasure;
  /** The omega A for this fluid component. */
  OmegaA?: number;
  /** The omega B for this fluid component. */
  OmegaB?: number;
  /** The parachor for this fluid component. */
  Parachor?: number;
  /** The partial molar density for this fluid component. */
  PartialMolarDensity?: eml.MassPerVolumeMeasure;
  /** The partial molar volume for this fluid component. */
  PartialMolarVolume?: eml.MolarVolumeMeasure;
  /** The reference density for this fluid component. */
  ReferenceDensityZJ?: eml.MassPerVolumeMeasure;
  /** The reference gravity for this fluid component. */
  ReferenceGravityZJ?: eml.APIGravityMeasure;
  /** The reference temperature for this fluid component. */
  ReferenceTemperatureZJ?: eml.ThermodynamicTemperatureMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The viscous compressibility for this fluid component. */
  ViscousCompressibility?: eml.ReciprocalPressureMeasure;
  /** The volume shift parameter for this fluid component. */
  VolumeShiftParameter?: number;
}
export interface FluidComponentProperty extends _FluidComponentProperty {}

/** Specifies the kinds of contaminating fluid present in a fluid sample. */
export type FluidContaminant =
  | "cement fluids"
  | "completion fluid"
  | "drilling mud"
  | "extraneous gas"
  | "extraneous oil"
  | "extraneous water"
  | "formation water"
  | "treatment chemicals"
  | "solid"
  | "unknown";
interface _FluidContaminant extends eml._TypeEnum {
  _: FluidContaminant;
}

/** The CVD test steps. */
interface _FluidCvdTestStep extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The cumulative fluid produced, expressed as a molar fraction of the initial quantity, up to and including this test step. */
  CumulativeFluidProducedFraction?: eml.AmountOfSubstancePerAmountOfSubstanceMeasure;
  /** The cumulative GOR at stock tank conditions, of all the fluid produced up and including this test step. */
  CumulativeStockTankGOR?: eml.VolumePerVolumeMeasureExt;
  /** The fluid condition at this test step. Enum, see fluid analysis step condition. */
  FluidCondition?: FluidAnalysisStepCondition;
  /** The GOR of the fluid produced at this test step */
  FluidProducedGOR?: eml.VolumePerVolumeMeasureExt;
  /** The gas formation volume factor at this test step. */
  GasFormationVolumeFactor?: eml.VolumePerVolumeMeasure;
  /** The gas gravity at this test step. */
  GasGravity?: number;
  /** The molecular weight of the gas phase at this test step. */
  GasMolecularWeight?: eml.MolecularWeightMeasure;
  /** The viscosity of the gas phase at this test step. */
  GasViscosity?: eml.DynamicViscosityMeasure;
  /** The gas Z factor value at this test step. */
  GasZFactor?: number;
  /** The liquid composition at this test step. */
  LiquidComposition?: LiquidComposition;
  /** The fraction of liquid by volume for this test step. This is the volume of liquid divided by a reference volume. Refer to the documentation for the Relative Volume Ratio and Fluid Volume Reference classes. */
  LiquidFraction?: RelativeVolumeRatio;
  /** The density of the oil phase at this test step. */
  OilDensity?: eml.MassPerVolumeMeasure;
  /** The viscosity of the oil phase at this test step. */
  OilViscosity?: eml.DynamicViscosityMeasure;
  /** The overall composition at this test step. */
  OverallComposition?: OverallComposition;
  /** The standard Z = PV/RT, but here for a two-phase Z-factor, use total molar volume for both phases. */
  Phase2ZFactor?: number;
  /** The phases present at this test step. */
  PhasesPresent?: PhasePresent;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The step number is the index of a (P,T) step in the overall test. */
  StepNumber: eml.NonNegativeLong;
  /** The pressure for this test step. */
  StepPressure: eml.PressureMeasure;
  /** The vapor composition at this test step. */
  VaporComposition?: VaporComposition;
}
export interface FluidCvdTestStep extends _FluidCvdTestStep {}

/** The density of the fluid in the wellbore, generally used for estimations of wellbore storage when the tubing is filling up. */
interface _FluidDensity extends _AbstractParameter {
  Abbreviation: eml.String64;
  Density: eml.MassPerVolumeMeasure;
}
export interface FluidDensity extends _FluidDensity {}

/** The DLT test steps. */
interface _FluidDifferentialLiberationTestStep extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The cumulative stock tank GOR (corrected to conditions specified in the element Shrinkage Reference) at this test step. */
  CumulativeStockTankGOR?: eml.VolumePerVolumeMeasure;
  /** The fluid condition at this test step. Enum, see fluid analysis step condition. */
  FluidCondition?: FluidAnalysisStepCondition;
  /** The density of gas at this test step. */
  GasDensity?: eml.MassPerVolumeMeasure;
  /** The gas formation volume factor at this test step. */
  GasFormationVolumeFactor?: eml.VolumePerVolumeMeasure;
  /** The gas gravity at this test step. */
  GasGravity?: number;
  /** The molecular weight of the gas phase at this test step. */
  GasMolecularWeight?: eml.MolecularWeightMeasure;
  /** The viscosity of the gas phase at this test step. */
  GasViscosity?: eml.DynamicViscosityMeasure;
  /** The gas Z factor value at this test step. */
  GasZFactor?: number;
  /** The liquid composition at this test step. */
  LiquidComposition?: LiquidComposition;
  /** The oil compressibility at this test step. */
  OilCompressibility?: OilCompressibility;
  /** The density of the oil phase at this test step. */
  OilDensity?: eml.MassPerVolumeMeasure;
  /** The formation volume factor for the oil (liquid) phase at the conditions of this test--volume at test conditions/volume st standard conditions. */
  OilFormationVolumeFactor?: eml.VolumePerVolumeMeasure;
  /** The oil formation volume factor (corrected to conditions specified in the element Shrinkage Reference) at this test step. */
  OilFormationVolumeFactorCorrected?: eml.VolumePerVolumeMeasure;
  /** The viscosity of the oil phase at this test step. */
  OilViscosity?: eml.DynamicViscosityMeasure;
  /** The overall composition at this test step. */
  OverallComposition?: OverallComposition;
  /** The phases present at this test step. */
  PhasesPresent?: PhasePresent;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The residual API gravity at this test step. */
  ResidualAPIGravity?: eml.APIGravityMeasure;
  /** The solution GOR (corrected to conditions specified in the element Shrinkage Reference) at this test step. */
  SolutionGORCorrected?: eml.VolumePerVolumeMeasure;
  /** The solution GOR measured at this test step. */
  SolutionGORMeasured?: eml.VolumePerVolumeMeasure;
  /** The step number is the index of a (P,T) step in the overall test. */
  StepNumber: eml.NonNegativeLong;
  /** The pressure for this test step. */
  StepPressure: eml.PressureMeasure;
  /** The temperature for this test step. */
  StepTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The total formation volume factor at this test step. */
  TotalFormationVolumeFactor?: eml.VolumePerVolumeMeasure;
  /** The vapor composition at this test step. */
  VaporComposition?: VaporComposition;
}
export interface FluidDifferentialLiberationTestStep
  extends _FluidDifferentialLiberationTestStep {}

export type FluidPhaseKind =
  | "multiphase gas+water"
  | "multiphase oil+gas"
  | "multiphase oil+water"
  | "multiphase oil+water+gas"
  | "single phase gas"
  | "single phase oil"
  | "single phase water";
interface _FluidPhaseKind extends eml._TypeEnum {
  _: FluidPhaseKind;
}

/** Represents the choice of phases measured by a ptaMeasuredData occurrence.  Used to indicate if a flowrate (most likely) is measuring a single phase or all phases. */
export type FluidPhaseMeasuredKind =
  | "3 phase"
  | "gas"
  | "oil"
  | "oil+water"
  | "water";
interface _FluidPhaseMeasuredKind extends eml._TypeEnum {
  _: FluidPhaseMeasuredKind;
}

/** The fluid sample. */
interface _FluidSample extends eml._AbstractObject {
  AssociatedFluidSample?: eml.DataObjectReference[];
  /** Reference to the fluid sample acquisition within a fluid sample acquisition job which acquired this fluid sample. */
  FluidSampleAcquisitionJobSource?: FluidSampleAcquisitionJobSource;
  /** Fluid sample custody history event. */
  FluidSampleChainOfCustodyEvent?: FluidSampleChainOfCustodyEvent[];
  FluidSystem?: eml.DataObjectReference;
  OriginalSampleContainer?: eml.DataObjectReference;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** Boolean to state whether the sample is representative or not. */
  Representative?: boolean;
  /** Reference to a RockFluidUnitInterpretation (a RESQML class). */
  RockFluidUnitInterpretation?: eml.DataObjectReference;
  /** The sample disposition, if any. */
  SampleDisposition?: eml.String64;
  /** The kind of sample. Enum.  See fluid sample kind. */
  SampleKind?: FluidSampleKindExt;
  /** A sample recombination. */
  SampleRecombinationSpecification?: SampleRecombinationSpecification;
}
export interface FluidSample extends _FluidSample {}

/** Information common to any fluid sample taken. Additional details can be captured in related data object depending on the where the sample was taken, for example: downhole, separator, wellhead, of the formation using a wireline formation tester (WFT).
 *
 * If the tool used to capture samples has multiple containers, each container has a separate instance of fluid sample acquisition. */
interface _FluidSampleAcquisition extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The acquisition gas-oil ratio for this fluid sample acquisition. */
  AcquisitionGOR?: eml.VolumePerVolumeMeasure;
  /** The acquisition pressure when this sample was taken. */
  AcquisitionPressure?: eml.AbstractPressureValue;
  /** The acquisition temperature when this sample was taken.
   * . */
  AcquisitionTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The acquisition volume when this sample was taken. */
  AcquisitionVolume?: eml.VolumeMeasure;
  EndTime: eml.TimeStamp;
  FluidSample: eml.DataObjectReference;
  FluidSampleContainer: eml.DataObjectReference;
  /** The formation pressure when this sample was taken. */
  FormationPressure?: eml.PressureMeasure;
  /** The datum depth for which the Formation Pressure and Formation Temperature data applies. */
  FormationPressureTemperatureDatum?: eml.LengthMeasureExt;
  /** The formation temperature when this sample was taken. */
  FormationTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** Remarks and comments about this data item. */
  Remark: eml.String2000;
  /** The date when the sample was taken. */
  StartTime: eml.TimeStamp;
}
export interface FluidSampleAcquisition extends _FluidSampleAcquisition {}

/** Information about the job that results in acquiring a fluid sample. */
interface _FluidSampleAcquisitionJob extends eml._AbstractObject {
  Client?: eml.DataObjectReference;
  EndTime?: eml.TimeStamp;
  FlowTestJob?: eml.DataObjectReference;
  /** Information common to any fluid sample taken. Additional details can be captured in related data object depending on the where the sample was taken, for example: downhole, separator, wellhead, of the formation using a wireline formation tester (WFT).
   *
   * If the tool used to capture samples has multiple containers, each container has a separate instance of fluid sample acquisition. */
  FluidSampleAcquisition?: FluidSampleAcquisition[];
  FluidSystem: eml.DataObjectReference;
  ServiceCompany?: eml.DataObjectReference;
  /** The date when fluid acquisition started. */
  StartTime?: eml.TimeStamp;
}
export interface FluidSampleAcquisitionJob extends _FluidSampleAcquisitionJob {}

/** Reference to the fluid sample acquisition within a fluid sample acquisition job which acquired this fluid sample. */
interface _FluidSampleAcquisitionJobSource extends BaseType {
  FluidSampleAcquisitionJobReference: eml.DataObjectReference;
  /** Reference to the fluid sample acquisition (by uid) within a fluid sample acquisition job (which is referred to as a top-level object) which acquired this fluid sample. */
  FluidSampleAcquisitionReference: eml.String64;
}
export interface FluidSampleAcquisitionJobSource
  extends _FluidSampleAcquisitionJobSource {}

/** Fluid sample custody history event. */
interface _FluidSampleChainOfCustodyEvent extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The container location for this chain of custody event. */
  ContainerLocation?: eml.String64;
  CurrentContainer: eml.DataObjectReference;
  /** The custodian for this chain of custody event. */
  Custodian?: eml.String64;
  /** The action for this chain of custody event. Enum. See sample action. */
  CustodyAction?: SampleAction;
  /** The date for this chain of custody event. */
  CustodyDate?: Date;
  /** The lost volume of sample for this chain of custody event. */
  LostVolume?: eml.VolumeMeasure;
  PrevContainer?: eml.DataObjectReference;
  /** The remaining volume of sample for this chain of custody event. */
  RemainingVolume?: eml.VolumeMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The sample integrity for this chain of custody event. Enum. See sample quality. */
  SampleIntegrity: SampleQuality;
  /** The transfer pressure for this chain of custody event. */
  TransferPressure?: eml.AbstractPressureValue;
  /** The transfer temperature for this chain of custody event. */
  TransferTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The transfer volume for this chain of custody event. */
  TransferVolume?: eml.VolumeMeasure;
}
export interface FluidSampleChainOfCustodyEvent
  extends _FluidSampleChainOfCustodyEvent {}

/** Information about the fluid container used to capture a fluid sample. */
interface _FluidSampleContainer extends eml._AbstractObject {
  /** The reference ID  of a bottle or a chamber. */
  BottleID?: eml.String64;
  /** The volume of a bottle or chamber. */
  Capacity?: eml.VolumeMeasure;
  /** The kind of this fluid sample container. */
  Kind?: eml.String64;
  /** The date when this fluid sample container was last inspected. */
  LastInspectionDate?: Date;
  /** The make of this fluid sample container. */
  Make?: eml.String64;
  /** The metallurgy of this fluid sample container. */
  Metallurgy?: eml.String64;
  /** The model of this fluid sample container. */
  Model?: eml.String64;
  /** The owner of this fluid sample container. */
  Owner?: eml.String64;
  /** The pressure rating of this fluid sample container. */
  PressureRating?: eml.PressureMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The serial number of this fluid sample container. */
  SerialNumber?: eml.String64;
  /** The temperature rating of this fluid sample container. */
  TemperatureRating?: eml.ThermodynamicTemperatureMeasure;
  /** The reference uid of an attached object which stores the transport certificate. */
  TransportCertificateReference?: eml.DataObjectReference;
}
export interface FluidSampleContainer extends _FluidSampleContainer {}

/** Species the kinds of fluid sample by reference to how it was obtained. */
export type FluidSampleKind =
  | "bhs  samples"
  | "blend-gas"
  | "blend-liquid"
  | "brine"
  | "condensate"
  | "filtrate"
  | "gas"
  | "gas-dry"
  | "mud filtrate"
  | "mud sample"
  | "oil & water"
  | "oil-base"
  | "oil-black"
  | "oil-dead"
  | "oil-heavy"
  | "oil-unknown"
  | "oil-volatile"
  | "other"
  | "recomb-fluid"
  | "recomb-gas"
  | "rinse-post"
  | "rinse-pre"
  | "solid"
  | "sto"
  | "toluene"
  | "water"
  | "water/condensate"
  | "synthetic"
  | "separator water"
  | "separator oil"
  | "separator gas"
  | "downhole cased"
  | "downhole open"
  | "recombined"
  | "wellhead"
  | "commingled";
interface _FluidSampleKind extends eml._TypeEnum {
  _: FluidSampleKind;
}

export type FluidSampleKindExt = string;
type _FluidSampleKindExt = Primitive._string;

/** FluidSeparator  Test */
interface _FluidSeparatorTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The overall gas gravity for this test. */
  OverallGasGravity?: number;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The reservoir temperature for this test. */
  ReservoirTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The saturated oil density for this test. */
  SaturatedOilDensity?: eml.MassPerVolumeMeasure;
  /** The saturated oil formation volume factor for this test. */
  SaturatedOilFormationVolumeFactor?: eml.VolumePerVolumeMeasure;
  /** The saturation (or bubble point) pressure measured in this test. */
  SaturationPressure?: SaturationPressure;
  /** The separator test GOR for this test. */
  SeparatorTestGOR?: eml.VolumePerVolumeMeasure;
  SeparatorTestStep?: FluidSeparatorTestStep[];
  ShrinkageReference?: FluidVolumeReference;
  /** A number for this test for purposes of, e.g., tracking lab sequence. */
  TestNumber: eml.NonNegativeLong;
}
export interface FluidSeparatorTest extends _FluidSeparatorTest {}

/** Fluid separator test step. */
interface _FluidSeparatorTestStep extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The bubble point pressure for this test step. */
  BubblePointPressure?: eml.PressureMeasure;
  /** The fluid condition at this test step. Enum, see fluid analysis step condition. */
  FluidCondition?: FluidAnalysisStepCondition;
  /** The density of gas at this test step. */
  GasDensity?: eml.MassPerVolumeMeasure;
  /** The gas gravity at this test step. */
  GasGravity?: number;
  /** The molecular weight of the gas phase at this test step. */
  GasMolecularWeight?: eml.MolecularWeightMeasure;
  /** The viscosity of the gas phase at this test step. */
  GasViscosity?: eml.DynamicViscosityMeasure;
  /** The gas volume for this test step. */
  GasVolume?: eml.VolumeMeasure;
  /** The gas Z factor value at this test step. */
  GasZFactor?: number;
  /** The liquid composition for this test step. */
  LiquidComposition?: LiquidComposition;
  /** The density of the oil phase at this test step. */
  OilDensity?: eml.MassPerVolumeMeasure;
  /** The stage Oil Formation Volume Factor (separator corrected) for this test step. */
  OilFormationVolumeFactorCorrected?: eml.VolumePerVolumeMeasure;
  /** The oil formation volume factor at standard conditions for this test step. */
  OilFormationVolumeFactorStd?: eml.VolumePerVolumeMeasure;
  /** The oil shrinkage factor for this test step. */
  OilShrinkageFactor?: eml.VolumePerVolumeMeasure;
  /** The oil specific gravity for this test step. */
  OilSpecificGravity?: eml.DimensionlessMeasure;
  /** The viscosity of the oil phase at this test step. */
  OilViscosity?: eml.DynamicViscosityMeasure;
  /** The overall composition for this test step. */
  OverallComposition?: OverallComposition;
  /** The phases present for this test step. Enum, see phases present. */
  PhasesPresent?: PhasePresent;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The residual API gravity for this test step. */
  ResidualAPIGravity?: eml.APIGravityMeasure;
  /** The saturation (or bubble point) pressure measured in this test. */
  SaturationPressure?: SaturationPressure;
  /** The stage separator GOR (separator corrected) for this test step. */
  StageSeparatorGORCorrected?: eml.VolumePerVolumeMeasure;
  /** The stage separator GOR at standard conditions for this test step. */
  StageSeparatorGORStd?: eml.VolumePerVolumeMeasure;
  /** The step number is the index of a (P,T) step in the overall test. */
  StepNumber: eml.NonNegativeLong;
  /** The pressure for this test step. */
  StepPressure: eml.PressureMeasure;
  /** The temperature for this test step. */
  StepTemperature: eml.ThermodynamicTemperatureMeasure;
  /** The vapor composition for this test step. */
  VaporComposition?: VaporComposition;
}
export interface FluidSeparatorTestStep extends _FluidSeparatorTestStep {}

/** Used to designate each distinct subsurface accumulation of economically significant fluids. This data object primarily serves to identify the source of one or more fluid samples and provides a connection to the geologic environment that contains it. Characteristics of the fluid system include the type of system (e.g., black oil, dry gas, etc.), the fluid phases present, and its lifecycle status (e.g., undeveloped, producing, etc.). */
interface _FluidSystem extends eml._AbstractObject {
  /** The water in the formation. */
  FormationWater?: FormationWater;
  /** Natural gas. */
  NaturalGas?: NaturalGas;
  /** The phases present for this fluid system. Enum. See phase present. */
  PhasesPresent?: PhasePresent;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The kind of reservoir fluid for this fluid system. Enum. See reservoir fluid kind. */
  ReservoirFluidKind: ReservoirFluidKind;
  /** The reservoir life cycle state for this fluid system. Enum. See reservoir life cycle state. */
  ReservoirLifeCycleState?: ReservoirLifeCycleState;
  /** Reference to a RockFluidOrganizationInterpretation (a RESQML data object). */
  RockFluidOrganizationInterpretation?: eml.DataObjectReference;
  /** The saturation (or bubble point) pressure for the fluid system. */
  SaturationPressure?: SaturationPressure;
  /** The solution gas-oil ratio for this fluid system. */
  SolutionGOR: eml.VolumePerVolumeMeasure;
  /** The standard temperature and pressure used for the representation of this fluid system. */
  StandardConditions: eml.AbstractTemperaturePressure;
  /** Stock tank oil (STO). */
  StockTankOil?: StockTankOil;
}
export interface FluidSystem extends _FluidSystem {}

/** The reference conditions and optionally, reference volume, against which volume fractions in test steps are recorded. */
interface _FluidVolumeReference extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The kind of fluid volume references. Enum, see volume reference kind. */
  Kind: VolumeReferenceKindExt;
  /** The reference volume for this analysis. */
  ReferenceVolume?: eml.VolumeMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface FluidVolumeReference extends _FluidVolumeReference {}

/** Information about the job to take a sample directly from the formation using a wireline formation tester (WFT). */
interface _FormationTesterSampleAcquisition extends _FluidSampleAcquisition {
  CushionPressure?: eml.PressureMeasureExt;
  FlowTestActivity?: eml.DataObjectReference;
  GrossFluidKind?: eml.String64;
  MdBase?: eml.MeasuredDepth;
  MdTop?: eml.MeasuredDepth;
  /** Reference to the WFT station within the top-level WFT run data object  where this sample was obtained. */
  SampleCarrierSlotName?: eml.String64;
  SampleContainerConfiguration?: eml.String64;
  SampleContainerName?: eml.String64;
  /** Reference to the WFT sample within the WFT station from where this sample was obtained. */
  ToolSectionName?: eml.String64;
  ToolSerialNumber?: eml.String64;
  Wellbore?: eml.DataObjectReference;
}
export interface FormationTesterSampleAcquisition
  extends _FormationTesterSampleAcquisition {}

/** Performed using formation tester tools conveyed on wireline, one interval at a time. A normal job would consist of multiple interval tests, each is represented by its own Flow Test Activity, which are collected in the Flow Test Job. */
interface _FormationTesterStation extends _FlowTestActivity {
  IntervalMeasurementSet: FlowTestMeasurementSet;
  /** References a log containing a wireline formation test  tie-in (e.g. gamma ray curve) vs. depth data. */
  TieInLog: eml.DataObjectReference;
}
export interface FormationTesterStation extends _FormationTesterStation {}

/** The water in the formation. */
interface _FormationWater extends _AbstractFluidComponent {
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** Salinity level. */
  Salinity?: eml.MassPerMassMeasure;
  /** Specific gravity. */
  SpecificGravity?: number;
}
export interface FormationWater extends _FormationWater {}

/** For a multiple fractured horizontal wellbore model, the angle at which fractures intersect the wellbore. A value of 90 degrees indicates the fracture plane is normal to the wellbore trajectory. */
interface _FractureAngleToWellbore extends _AbstractParameter {
  Abbreviation: eml.String64;
  Angle: eml.PlaneAngleMeasure;
}
export interface FractureAngleToWellbore extends _FractureAngleToWellbore {}

/** For an induced hydraulic fracture, the conductivity of the fracture, equal to Fracture Width * Fracture Permeability */
interface _FractureConductivity extends _AbstractParameter {
  Abbreviation: eml.String64;
  PermeabilityLength: eml.PermeabilityLengthMeasureExt;
}
export interface FractureConductivity extends _FractureConductivity {}

/** Fracture model, with vertical fracture flow.  Finite Conductivity Model. */
interface _FracturedFiniteConductivityModel extends _NearWellboreBaseModel {
  DistanceMidFractureHeightToBottomBoundary?: DistanceMidFractureHeightToBottomBoundary;
  FractureConductivity: FractureConductivity;
  FractureFaceSkin?: FractureFaceSkin;
  FractureHalfLength: FractureHalfLength;
  FractureHeight?: FractureHeight;
  OrientationOfFracturePlane?: OrientationOfFracturePlane;
  SkinLayer2RelativeToTotalThickness?: SkinLayer2RelativeToTotalThickness;
}
export interface FracturedFiniteConductivityModel
  extends _FracturedFiniteConductivityModel {}

/** Fracture model, with  horizontal fracture (sometimes called "pancake fracture") flow.  Finite Conductivity Model. */
interface _FracturedHorizontalFiniteConductivityModel
  extends _NearWellboreBaseModel {
  DistanceFractureToBottomBoundary: DistanceFractureToBottomBoundary;
  FractureConductivity: FractureConductivity;
  FractureRadius: FractureRadius;
}
export interface FracturedHorizontalFiniteConductivityModel
  extends _FracturedHorizontalFiniteConductivityModel {}

/** Fracture model, with  horizontal fracture (sometimes called "pancake fracture") flow.  Infinite Conductivity Model. */
interface _FracturedHorizontalInfiniteConductivityModel
  extends _NearWellboreBaseModel {
  DistanceFractureToBottomBoundary: DistanceFractureToBottomBoundary;
  FractureRadius: FractureRadius;
}
export interface FracturedHorizontalInfiniteConductivityModel
  extends _FracturedHorizontalInfiniteConductivityModel {}

/** Fracture model, with  horizontal fracture (sometimes called "pancake fracture") flow. Unform Flux Model. */
interface _FracturedHorizontalUniformFluxModel extends _NearWellboreBaseModel {
  DistanceFractureToBottomBoundary: DistanceFractureToBottomBoundary;
  FractureRadius: FractureRadius;
}
export interface FracturedHorizontalUniformFluxModel
  extends _FracturedHorizontalUniformFluxModel {}

/** Fracture model, with vertical fracture flow.  Infinite Conductivity Model. */
interface _FracturedInfiniteConductivityModel extends _NearWellboreBaseModel {
  DistanceMidFractureHeightToBottomBoundary?: DistanceMidFractureHeightToBottomBoundary;
  FractureFaceSkin?: FractureFaceSkin;
  FractureHalfLength: FractureHalfLength;
  FractureHeight?: FractureHeight;
  OrientationOfFracturePlane?: OrientationOfFracturePlane;
  SkinLayer2RelativeToTotalThickness?: SkinLayer2RelativeToTotalThickness;
}
export interface FracturedInfiniteConductivityModel
  extends _FracturedInfiniteConductivityModel {}

/** Fracture model, with vertical fracture flow. Unform Flux Model. */
interface _FracturedUniformFluxModel extends _NearWellboreBaseModel {
  DistanceMidFractureHeightToBottomBoundary?: DistanceMidFractureHeightToBottomBoundary;
  FractureFaceSkin?: FractureFaceSkin;
  FractureHalfLength: FractureHalfLength;
  FractureHeight?: FractureHeight;
  OrientationOfFracturePlane?: OrientationOfFracturePlane;
  SkinLayer2RelativeToTotalThickness?: SkinLayer2RelativeToTotalThickness;
}
export interface FracturedUniformFluxModel extends _FracturedUniformFluxModel {}

/** Dimensionless value, characterizing the restriction to flow (+ve value, damage) or additional capacity for flow (-ve value, eg acidized) due to effective permeability across the face of a hydraulic fracture, ie controlling flow from reservoir into fracture. This value is stated with respect to radial flow using the full reservoir thickness (h), ie the radial flow or middle time region of a pressure transient. It therefore can be added, in a fractured well, to "ConvergenceSkinRelativeToTotalThickness" skin to yield  "SkinRelativeToTotalThickness". */
interface _FractureFaceSkin extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface FractureFaceSkin extends _FractureFaceSkin {}

/** The half length of an induced hydraulic fracture, measured from the wellbore to the tip of one "wing" of the fracture. */
interface _FractureHalfLength extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface FractureHalfLength extends _FractureHalfLength {}

/** In any vertical hydraulic fracture model (including the cases where the wellbore can be vertical or horizontal), the height of the fractures. In the case of a vertical wellbore, the fractures are assumed to extend an equal distance above and below the mid perforations depth, given by the parameter "DistanceMidPerforationsToBottomBoundary". In the case of a horizontal wellbore, the fractures are assumed to extend an equal distance above and below the wellbore. */
interface _FractureHeight extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface FractureHeight extends _FractureHeight {}

export type FractureModelType =
  | "compressible finite conductivity"
  | "finite conductivity"
  | "infinite conductivity"
  | "uniform flux";
interface _FractureModelType extends eml._TypeEnum {
  _: FractureModelType;
}

/** For a horizontal ("pancake") induced hydraulic fracture, which is assumed to be circular in shape in the horizontal plane, the radius of the fracture. */
interface _FractureRadius extends _AbstractParameter {
  abbreviation: string;
  length: string;
}
export interface FractureRadius extends _FractureRadius {}

/** Dimensionless Value characterizing the fraction of the pore volume occupied by the fractures to the total of pore volume of (fractures plus reservoir). */
interface _FractureStorativityRatio extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface FractureStorativityRatio extends _FractureStorativityRatio {}

/** Frequency. */
interface _Frequency extends _AbstractAttenuationMeasure {
  /** Frequency. */
  Frequency: eml.FrequencyMeasure;
}
export interface Frequency extends _Frequency {}

/** Friction theory. */
interface _FrictionTheory extends _AbstractCompositionalViscosityModel {
  /** PRSV parameter. */
  PrsvParameter?: PrsvParameter[];
}
export interface FrictionTheory extends _FrictionTheory {}

/** General measure type. */
interface _GeneralMeasureType extends BaseType {
  /** The unit of measure. */
  uom?: eml.UomEnum;
}
export interface GeneralMeasureType extends _GeneralMeasureType {}

/** A measure which may have a quality status. The measure class (e.g., length) must be defined within the context of the usage of this type (e.g., in another element). This should not be used if the measure class will always be the same thing. If the 'status' attribute is absent and the value is not "NaN", the data value can be assumed to be good with no restrictions. */
interface _GeneralQualifiedMeasure extends _AbstractMeasureData {
  /** The kind of the value component. For example, "X" in a tuple of X and Y. */
  componentReference?: eml.String64;
  /** An indicator of the quality of the value. */
  status?: ValueStatus;
  /** The unit of measure for the value. This value must conform to the values allowed by the measure class. */
  uom: eml.UomEnum;
}
export interface GeneralQualifiedMeasure extends _GeneralQualifiedMeasure {}

/** A geographic context of a report. */
interface _GeographicContext extends BaseType {
  /** A general comment that further explains the offshore location. */
  Comment?: eml.String2000;
  /** The name of the country. */
  Country?: eml.String64;
  /** The name of county. */
  County?: eml.String64;
  /** The name of the field within whose context the report exists. */
  Field?: eml.NameStruct;
  /** A generic type of offshore location. This allows an offshore location to be given by an area name, and up to four block names. A comment is also allowed. */
  OffshoreLocation?: OffshoreLocation;
  /** The state or province within the country. */
  State?: eml.String64;
}
export interface GeographicContext extends _GeographicContext {}

/** Homogeneous reservoir model. */
interface _HomogeneousModel extends _ReservoirBaseModel {}
export interface HomogeneousModel extends _HomogeneousModel {}

/** The Horizontal Anisotropy of permeability, K(x direction)/K(y direction). Optional since many models do not account for this parameter. */
interface _HorizontalAnisotropyKxToKy extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface HorizontalAnisotropyKxToKy
  extends _HorizontalAnisotropyKxToKy {}

/** The radial permeability of the reservoir layer in the horizontal plane. */
interface _HorizontalRadialPermeability extends _AbstractParameter {
  Abbreviation: eml.String64;
  Permeability: eml.PermeabilityRockMeasureExt;
}
export interface HorizontalRadialPermeability
  extends _HorizontalRadialPermeability {}

/** Horizontal wellbore model with wellbore positioned at arbitary distance from lower surface of reservoir layer, and with additional upper layer parallel to layer containing wellbore. */
interface _HorizontalWellbore2LayerModel extends _NearWellboreBaseModel {
  ConvergenceSkinRelativeToTotalThickness?: ConvergenceSkinRelativeToTotalThickness;
  DistanceWellboreToBottomBoundary: DistanceWellboreToBottomBoundary;
  LengthHorizontalWellboreFlowing: LengthHorizontalWellboreFlowing;
  MechanicalSkinRelativeToTotalThickness?: MechanicalSkinRelativeToTotalThickness;
  OrientationWellTrajectory?: OrientationWellTrajectory;
}
export interface HorizontalWellbore2LayerModel
  extends _HorizontalWellbore2LayerModel {}

/** Horizontal wellbore model with wellbore positioned at arbitary distance from lower surface of reservoir layer. */
interface _HorizontalWellboreModel extends _NearWellboreBaseModel {
  ConvergenceSkinRelativeToTotalThickness?: ConvergenceSkinRelativeToTotalThickness;
  DistanceWellboreToBottomBoundary: DistanceWellboreToBottomBoundary;
  LengthHorizontalWellboreFlowing: LengthHorizontalWellboreFlowing;
  MechanicalSkinRelativeToTotalThickness?: MechanicalSkinRelativeToTotalThickness;
  OrientationWellTrajectory?: OrientationWellTrajectory;
}
export interface HorizontalWellboreModel extends _HorizontalWellboreModel {}

/** Horizontal wellbore model with wellbore positioned at arbitary distance from lower surface of reservoir layer, containing a number "n" of equally spaced identical vertical fractures. */
interface _HorizontalWellboreMultipleEqualFracturedModel
  extends _NearWellboreBaseModel {
  ConvergenceSkinRelativeToTotalThickness?: ConvergenceSkinRelativeToTotalThickness;
  DistanceMidFractureHeightToBottomBoundary?: DistanceMidFractureHeightToBottomBoundary;
  DistanceWellboreToBottomBoundary?: DistanceWellboreToBottomBoundary;
  FractureAngleToWellbore: FractureAngleToWellbore;
  FractureConductivity?: FractureConductivity;
  FractureFaceSkin?: FractureFaceSkin;
  FractureHalfLength: FractureHalfLength;
  FractureHeight?: FractureHeight;
  FractureModelType: FractureModelType;
  FractureStorativityRatio?: FractureStorativityRatio;
  LengthHorizontalWellboreFlowing: LengthHorizontalWellboreFlowing;
  MechanicalSkinRelativeToTotalThickness?: MechanicalSkinRelativeToTotalThickness;
  NumberOfFractures: NumberOfFractures;
  OrientationWellTrajectory?: OrientationWellTrajectory;
}
export interface HorizontalWellboreMultipleEqualFracturedModel
  extends _HorizontalWellboreMultipleEqualFracturedModel {}

/** Horizontal wellbore model with wellbore positioned at arbitary distance from lower surface of reservoir layer, containing a number "n" of non-identical vertical fractures. These may be unequally spaced and each may have its own orientation with respect to the wellbore, and its own height. Expected to be modelled numerically. */
interface _HorizontalWellboreMultipleVariableFracturedModel
  extends _NearWellboreBaseModel {
  ConvergenceSkinRelativeToTotalThickness?: ConvergenceSkinRelativeToTotalThickness;
  DistanceWellboreToBottomBoundary?: DistanceWellboreToBottomBoundary;
  LengthHorizontalWellboreFlowing: LengthHorizontalWellboreFlowing;
  MechanicalSkinRelativeToTotalThickness?: MechanicalSkinRelativeToTotalThickness;
  NumberOfFractures: NumberOfFractures;
  OrientationWellTrajectory?: OrientationWellTrajectory;
  singleFractureSubModel?: SingleFractureSubModel[];
}
export interface HorizontalWellboreMultipleVariableFracturedModel
  extends _HorizontalWellboreMultipleVariableFracturedModel {}

/** A collection of any one or more fluid analyses on hydrocarbons. */
interface _HydrocarbonAnalysis extends _FluidAnalysis {
  /** An atmospheric flash test and compositional analysis test within this fluid analysis. */
  AtmosphericFlashTestAndCompositionalAnalysis?: AtmosphericFlashTestAndCompositionalAnalysis[];
  /** A constant composition expansion test within this fluid analysis. */
  ConstantCompositionExpansionTest?: ConstantCompositionExpansionTest[];
  /** A constant volume depletion test within this fluid analysis. */
  ConstantVolumeDepletionTest?: ConstantVolumeDepletionTest[];
  /** A differential liberation test within this fluid analysis. */
  DifferentialLiberationTest?: DifferentialLiberationTest[];
  FluidSample: eml.DataObjectReference;
  /** An interfacial tension test within this fluid analysis. */
  InterfacialTensionTest?: InterfacialTensionTest[];
  /** A multiple contact miscibility test within this fluid analysis. */
  MultipleContactMiscibilityTest?: MultipleContactMiscibilityTest[];
  /** The sample integrity and preparation procedure for this fluid analysis. */
  SampleIntegrityAndPreparation?: SampleIntegrityAndPreparation;
  /** A saturation test within this fluid analysis. */
  SaturationTest?: SaturationTest[];
  /** A separator test within this fluid analysis. */
  SeparatorTest?: FluidSeparatorTest[];
  /** A slim tube test within this fluid analysis. */
  SlimTubeTest?: SlimTubeTest[];
  /** An stock tank oil analysis within this fluid analysis. */
  STOAnalysis?: STOAnalysis[];
  /** A swelling test within this fluid analysis. */
  SwellingTest?: SwellingTest[];
  /** A transport test within this fluid analysis. */
  TransportTest?: OtherMeasurementTest[];
  /** A vapor liquid equilibrium test within this fluid analysis. */
  VaporLiquidEquilibriumTest?: VaporLiquidEquilibriumTest[];
}
export interface HydrocarbonAnalysis extends _HydrocarbonAnalysis {}

/** Infinite boundary model - there are no boundaries around the reservoir. */
interface _InfiniteBoundaryModel extends _BoundaryBaseModel {}
export interface InfiniteBoundaryModel extends _InfiniteBoundaryModel {}

/** The initial pressure of the fluids in the reservoir layer. "Initial" is taken to mean "at the time at which the rate history used in the pressure transient analysis starts" */
interface _InitialPressure extends _AbstractParameter {
  Abbreviation: eml.String64;
  Pressure: eml.PressureMeasure;
}
export interface InitialPressure extends _InitialPressure {}

/** The composition of a single injected gas used in the swelling test. This type of gas has a uid which is used to refer to this gas being injected, in each Swelling Test Step. */
interface _InjectedGas extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The composition of injected gas (vapor) for this test. */
  VaporComposition: VaporComposition;
}
export interface InjectedGas extends _InjectedGas {}

/** Volume injected per reporting entity. */
interface _Injection extends BaseType {
  InjectionQuantity?: AbstractProductQuantity[];
  /** The method in which the quantity/volume was determined. See enum QuantityMethod. */
  QuantityMethod: QuantityMethodExt;
  /** A descriptive remark relating to any significant events. */
  Remark?: eml.String2000;
}
export interface Injection extends _Injection {}

/** Regularly  performed using the well's permanent production string,  as a steady-state test to assess long-term well performance and as an input for reservoir management. Optionally, this is can include  a transient test, normally a fall-off test. */
interface _InjectionFlowTest extends _FlowTestActivity {
  /** The date and time from which this well test is used in production allocation processes as representative of the well’s performance */
  EffectiveDate?: eml.TimeStamp;
  IntervalMeasurementSet: FlowTestMeasurementSet;
  /** A flag which is to be set if this test is validated and therefore able to used in processes such as production allocation. */
  Validated?: boolean;
  /** Description or name of the method used to conduct the well test. */
  WellTestMethod?: eml.String64;
}
export interface InjectionFlowTest extends _InjectionFlowTest {}

/** In a Radial or Linear Composite model, the diffusivity (permeability/(porosity*viscosity*total compressibility) ratio of inner zone/outer zone. */
interface _InnerToOuterZoneDiffusivityRatio extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface InnerToOuterZoneDiffusivityRatio
  extends _InnerToOuterZoneDiffusivityRatio {}

/** In a Radial or Linear Composite model, the mobility (permeability/viscosity) ratio of inner zone/outer zone. */
interface _InnerToOuterZoneMobilityRatio extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface InnerToOuterZoneMobilityRatio
  extends _InnerToOuterZoneMobilityRatio {}

/** The general class of an instrument, including vendor information, in the installed system. */
interface _Instrument extends _AbstractDtsEquipment {
  /** Contact information for the person/company that provided the equipment */
  InstrumentVendor?: eml.DataObjectReference;
}
export interface Instrument extends _Instrument {}

/** Integer data. */
interface _IntegerData extends _AbstractMeasureData {
  /** The value of a dependent (data) variable in a row of the curve table. The units of measure are specified in the curve definition. The first value corresponds to order=1 for columns where isIndex is false. The second to order=2. And so on. The number of index and data values must match the number of columns in the table. */
  IntegerValue: IntegerQualifiedCount;
}
export interface IntegerData extends _IntegerData {}

/** An integer which may have a quality status. If the 'status' attribute is absent and the value is not "NaN", the data value can be assumed to be good with no restrictions. */
interface _IntegerQualifiedCount extends _AbstractMeasureData {
  /** An indicator of the quality of the value. */
  status?: ValueStatus;
}
export interface IntegerQualifiedCount extends _IntegerQualifiedCount {}

/** The interfacial tension test. */
interface _InterfacialTensionTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The interfacial tension test step. */
  InterfacialTensionTestStep?: InterfacialTensionTestStep[];
  /** The non-wetting phase for this interfacial tension test. */
  nonWettingPhase: ThermodynamicPhase;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The surfactant for this interfacial tension test. */
  Surfactant?: AbstractFluidComponent;
  /** An integer number to identify this test in a sequence of tests. */
  TestNumber: eml.NonNegativeLong;
  /** The wetting phase for this interfacial tension test. */
  WettingPhase: ThermodynamicPhase;
}
export interface InterfacialTensionTest extends _InterfacialTensionTest {}

/** The interfacial tension test step. */
interface _InterfacialTensionTestStep extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The interfacial tension for this test step. */
  InterfacialTension?: eml.ForcePerLengthMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The step number is the index of a (P,T) step in the overall test. */
  StepNumber: eml.NonNegativeLong;
  /** The pressure for this test step. */
  StepPressure?: eml.PressureMeasure;
  /** The temperature for this test step. */
  StepTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The surfactant concentration for this test step. */
  SurfactantConcentration?: eml.MassPerMassMeasure;
  /** The wetting phase saturation for this test step. */
  WettingPhaseSaturation?: eml.DimensionlessMeasure;
}
export interface InterfacialTensionTestStep
  extends _InterfacialTensionTestStep {}

/** Measurements pertaining to the interfering flow, in the case of an interference test. */
interface _InterferingFlowTestInterval extends BaseType {
  /** Unique identifier for this instance of the object. */
  uid?: eml.String64;
  /** A reference (using uid) to the flow test measurement set which contains the data concerning the interfering flow, in the case of an interference test. (This other flow test measurement set will be in the same Flow Test Activity top level object and will contain the location, flow rates etc of the intefering flow). */
  FlowTestMeasurementSetRef: eml.String64;
  /** A reference (using uid) to the flow rate which is the measurement of the interfering flow, in the case of an interference test. */
  InterferingFlowrateRef: eml.String64;
  /** The simulated interference pressure (which will be at the observation interval), in the case of an interference test. */
  SimulatedInterferencePressure: OutputPressureData;
  /** A flag to indicate if the Simulated Interference Pressure for this intefering flow interval, has been removed from the measured data. If true, then the corrected measured data should be analysable without having to consider the intererence effect further. */
  SimulatedInterferencePressureRemoved: boolean;
  /** A reference (using uid) to the test period(s) whose effect the interfering flow is being allowed for, in the case of an interference test. If unspecified, it should be assumed that all test periods can potentially give rise to an interference effect. */
  TestPeriodRef?: eml.String64[];
}
export interface InterferingFlowTestInterval
  extends _InterferingFlowTestInterval {}

/** Internal Fault sub model describes each internal fault within the reservoir. There will be as many instances of this as there are internal faults.  This is expected to be a numerical model. */
interface _InternalFaultSubModel extends BaseType {
  /** For a finite conductivity fault, the conductivity of the fault (which may be regarded as a fracture), equal to Fracture Width * Fracture Permeability. */
  Conductivity?: FractureConductivity;
  /** The reference to a RESQML model representation of this fault. */
  FaultRefID: ResqmlModelRef;
  /** Boolean - value of True means that the fault is conductive. If the boolean IsFiniteConductive is also True, then the parameter Conductivity should be used to quantify this. If IsFiniteConductive is False, then the fault is regarded as infinite conductive, and the parameter Conductivity is not required. */
  IsConductive: boolean;
  /** Boolean - value of True means that the fault is finite conductive and the parameter Conductivity should be used to quantify this. If IsFiniteConductive is False, then the fault is regarded as infinite conductive, and the parameter Conductivity is not required. */
  IsFiniteConductive: boolean;
  /** Boolean - value of True means that the fault is leaky and therefore that the parameter Leakage should be used to quantify this. */
  IsLeaky: boolean;
  /** The transmissibility reduction factor of a fault in a Linear Composite model where the boundary of the inner and outer zones is a leaky fault. If T is the complete transmissibility which would be computed without any fault between point A and point B (T is a function of permeability, etc), then Tf = T * leakage. Therefore: leakage = 1 implies that the fault is not a barrier to flow at all, leakage = 0 implies that the fault is sealing (no transmissibility anymore at all between points A and B). */
  TransmissibilityReductionRatioOfLinearFront?: TransmissibilityReductionFactorOfLinearFront;
}
export interface InternalFaultSubModel extends _InternalFaultSubModel {}

/** The dimensionless interporosity flow parameter, known as Lambda. In dual porosity, represents the ability of the matrix to flow into the fissure network. In dual permeability or other multi-layer cases, represents the ability of flow to move from one layer to another. */
interface _InterporosityFlowParameter extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface InterporosityFlowParameter
  extends _InterporosityFlowParameter {}

/** Specifies the types of mnemonics. */
export type InterpretationProcessingType =
  | "averaged"
  | "denormalized"
  | "depth-corrected"
  | "manufacturer-generated"
  | "temperature-shifted"
  | "user-custom";
interface _InterpretationProcessingType extends eml._TypeEnum {
  _: InterpretationProcessingType;
}

/** Information on type of intervention conveyance used by the optical path. */
interface _InterventionConveyance extends _AbstractCable {
  /** Comment about the intervention conveyance. */
  Comment?: eml.String2000;
  /** The type from the enumeration list of InterventionConveyanceType. */
  InterventionConveyanceType: InterventionConveyanceKind;
}
export interface InterventionConveyance extends _InterventionConveyance {}

/** Specifies the types of intervention conveyance. */
export type InterventionConveyanceKind =
  | "coiled tubing"
  | "rod"
  | "slickline"
  | "wireline";
interface _InterventionConveyanceKind extends eml._TypeEnum {
  _: InterventionConveyanceKind;
}

/** Performed on multiple  wellbores, where an interval in one wellbore is flowing and one or more intervals in other wellbores are observing the interfering pressure. */
interface _InterwellTest extends _FlowTestActivity {
  IntervalMeasurementSet: FlowTestMeasurementSet[];
}
export interface InterwellTest extends _InterwellTest {}

/** A value for the specified keyword. That is, a keyword-value pair. The allowed length of the value is constrained by the keyword. */
interface _KeywordValueStruct extends eml._AbstractString {
  /** The keyword within which the value is unique. The concept of a keyword is very close to the concept of a classification system. */
  keyword: TimeSeriesKeyword;
}
export interface KeywordValueStruct extends _KeywordValueStruct {}

/** A kind which may have a quality status. If the 'status' attribute is absent and the value is not "NaN", the data value can be assumed to be good with no restrictions. */
interface _KindQualifiedString extends _AbstractMeasureData {
  /** An indicator of the quality of the value. */
  status?: ValueStatus;
}
export interface KindQualifiedString extends _KindQualifiedString {}

/** In a two-layer model, the Thickness (h) of layer 2. */
interface _Layer2Thickness extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface Layer2Thickness extends _Layer2Thickness {}

/** Contains the data about a layer model for PTA or Inflow analysis. This class contains common parameters and then model sections each report the parameter values for the pressure transient model used to describe the later. These are: near wellbore, reservoir, and boundary sections. Example: closed reservoir boundary section model will report 4 distances to boundaries. */
interface _LayerModel extends BaseType {
  /** Unique identifier for this instance of the object. */
  uid?: eml.String64;
  /** If set to True, indicates that this layer represents the analysis of the total number of individual layers at this Test Location. Example: it will represent the total Kh (permeability-thickness product) and Total Skin of the Test Location. If False then this layer represents just one of the total number of reservoir layer(s) tested at this Test Location. */
  AggregateLayersModel: boolean;
  /** For this layer model, the Boundary Model which is used - which will be a child node of this layer model. */
  BoundaryModel?: BoundaryBaseModel;
  /** The name of the geology feature (typically, layer or layers) to which this model layer corresponds. */
  GeologicFeature?: eml.DataObjectReference;
  /** This is the coefficient for laminar flow pressure drop. */
  LayerLaminarFlowCoefficient?: eml.PressurePerFlowrateMeasure;
  /** This is the productivity Index of the layer, expressed in terms of flowrate/pressure. */
  LayerProductivityIndex?: eml.VolumePerTimePerPressureMeasure;
  LayerToLayerConnection?: LayerToLayerConnection[];
  /** This is the coefficient for turbulent flow pressure drop in the Inflow Performance Relationship.  In which dP=J*Q+F*Q**2. This parameter is F and the Productivity Index is J. */
  LayerTurbulentFlowCoefficient?: eml.PressurePerFlowrateSquaredMeasure;
  /** The measured depth bottom of this layer, as seen along the wellbore. */
  MdBottomLayer?: eml.MeasuredDepth;
  /** The measured depth top of this layer, as seen along the wellbore. */
  MdTopLayer?: eml.MeasuredDepth;
  /** The name of the layer for which this later model applies.  Probably a geologically meaningful name. */
  Name: eml.String64;
  /** For this layer model, the Near Wellbore Model which is used - which will be a child node of this layer model. */
  NearWellboreModel?: NearWellboreBaseModel;
  /** For this layer model, the Reservoir Model which is used - which will be a child node of this layer model. */
  ReservoirModel?: ReservoirBaseModel;
}
export interface LayerModel extends _LayerModel {}

/** Data about other layers to which this layer connects in terms of a flow connection. Comprises the identity of the other layer, and the inter-layer flow coefficient. */
interface _LayerToLayerConnection extends BaseType {
  /** Reference to another layer to which this layer is connected for flow. */
  ConnectedLayerRefID: eml.String64;
  /** The Flow Parameter value between the two Layers. */
  InterLayerConnectivity: InterporosityFlowParameter;
}
export interface LayerToLayerConnection extends _LayerToLayerConnection {}

/** In Spivey (a) Packer and (c) Fissure models of wellbore storage, the Leak Skin controls the pressure communication through the packer (a), or between the wellbore and the high permeability region (b - second application of model a), or between the high permeability channel/fissures and the reservoir (c). In  case c, the usual Skin parameter characterizes the pressure communication between the wellbore and the high permeability channel/fissures. */
interface _LeakSkin extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface LeakSkin extends _LeakSkin {}

/** LeeGonzalez. */
interface _LeeGonzalez extends _AbstractCorrelationGasViscosityModel {
  /** The gas density at the conditions for this viscosity correlation to be used. */
  GasDensity?: eml.MassPerVolumeMeasure;
  /** The molecular weight of the gas as an input to this viscosity correlation. */
  GasMolarWeight?: eml.MolecularWeightMeasure;
}
export interface LeeGonzalez extends _LeeGonzalez {}

/** For a horizontal wellbore model, the length of the flowing section of the wellbore. */
interface _LengthHorizontalWellboreFlowing extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface LengthHorizontalWellboreFlowing
  extends _LengthHorizontalWellboreFlowing {}

/** Linear Composite reservoir model in which the producing wellbore is in a homogeneous reservoir, infinite in all directions except one where the reservoir and/or fluid characteristics change across a linear front. On the farther side of the interface the reservoir is homogeneous and infinite but with a different mobility and/or storativity.  There is no pressure loss at the interface between the two zones. */
interface _LinearCompositeModel extends _ReservoirBaseModel {
  DistanceToMobilityInterface: DistanceToMobilityInterface;
  InnerToOuterZoneDiffusivityRatio: InnerToOuterZoneDiffusivityRatio;
  InnerToOuterZoneMobilityRatio: InnerToOuterZoneMobilityRatio;
  OrientationOfLinearFront?: OrientationOfLinearFront;
}
export interface LinearCompositeModel extends _LinearCompositeModel {}

/** Linear Composite reservoir model in which the producing wellbore is in a homogeneous reservoir, infinite in all directions except one where the reservoir and/or fluid characteristics change across a linear front. On the farther side of the interface the reservoir is homogeneous and infinite but with a different mobility and/or storativity and thickness.  There is a fault or barrier at the interface between the two zones, but this is "leaky", allowing flow across it. */
interface _LinearCompositeWithChangingThicknessAcrossLeakyFaultModel
  extends _ReservoirBaseModel {
  DistanceToMobilityInterface: DistanceToMobilityInterface;
  OrientationOfLinearFront?: OrientationOfLinearFront;
  Region2Thickness: Region2Thickness;
  TransmissibilityReductionFactorOfLinearFront: TransmissibilityReductionFactorOfLinearFront;
}
export interface LinearCompositeWithChangingThicknessAcrossLeakyFaultModel
  extends _LinearCompositeWithChangingThicknessAcrossLeakyFaultModel {}

/** Linear Composite reservoir model in which the producing wellbore is in a homogeneous reservoir, infinite in all directions except one where the reservoir and/or fluid characteristics change across a linear front. On the farther side of the interface the reservoir is homogeneous and infinite but with a different mobility and/or storativity.  There is a fault or barrier at the interface between the two zones, but this is "leaky", allowing flow across it and conductive, allowing flow along it. It can be thought of as a non-intersecting fracture. */
interface _LinearCompositeWithConductiveFaultModel extends _ReservoirBaseModel {
  DistanceToMobilityInterface: DistanceToMobilityInterface;
  FaultConductivity: FaultConductivity;
  InnerToOuterZoneDiffusivityRatio: InnerToOuterZoneDiffusivityRatio;
  InnerToOuterZoneMobilityRatio: InnerToOuterZoneMobilityRatio;
  OrientationOfLinearFront?: OrientationOfLinearFront;
  TransmissibilityReductionFactorOfLinearFront: TransmissibilityReductionFactorOfLinearFront;
}
export interface LinearCompositeWithConductiveFaultModel
  extends _LinearCompositeWithConductiveFaultModel {}

/** Linear Composite reservoir model in which the producing wellbore is in a homogeneous reservoir, infinite in all directions except one where the reservoir and/or fluid characteristics change across a linear front. On the farther side of the interface the reservoir is homogeneous and infinite but with a different mobility and/or storativity.  There is a fault or barrier at the interface between the two zones, but this is "leaky", allowing flow across it. */
interface _LinearCompositeWithLeakyFaultModel extends _ReservoirBaseModel {
  DistanceToMobilityInterface: DistanceToMobilityInterface;
  InnerToOuterZoneDiffusivityRatio: InnerToOuterZoneDiffusivityRatio;
  InnerToOuterZoneMobilityRatio: InnerToOuterZoneMobilityRatio;
  OrientationOfLinearFront?: OrientationOfLinearFront;
  TransmissibilityReductionFactorOfLinearFront: TransmissibilityReductionFactorOfLinearFront;
}
export interface LinearCompositeWithLeakyFaultModel
  extends _LinearCompositeWithLeakyFaultModel {}

/** The composition of liquid */
interface _LiquidComposition extends BaseType {
  LiquidComponentFraction?: FluidComponentFraction[];
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface LiquidComposition extends _LiquidComposition {}

/** The fraction of liquid by volume. */
interface _LiquidDropoutFraction extends _AbstractLiquidDropoutPercVolume {
  /** The fraction of liquid by volume for this test step. */
  LiquidDropoutPercent: eml.VolumePerVolumeMeasure;
}
export interface LiquidDropoutFraction extends _LiquidDropoutFraction {}

/** The amount of liquid by volume. */
interface _LiquidVolume extends _AbstractLiquidDropoutPercVolume {
  /** The amount of liquid by volume for this test step. */
  LiquidVolume: eml.VolumeMeasure;
}
export interface LiquidVolume extends _LiquidVolume {}

/** A location expressed in terms of X,Y coordinates of some part of a PTA object. */
interface _LocationIn2D extends BaseType {
  /** X coordinate of a point. */
  CoordinateX: eml.LengthMeasure;
  /** Y coordinate of a point. */
  CoordinateY: eml.LengthMeasure;
}
export interface LocationIn2D extends _LocationIn2D {}

/** Contains the result data needed to plot or overlay measured data and simulated data for PTA in a standard log-log axes plot. */
interface _LogLogAnalysis extends BaseType {
  AnalysisLine?: AnalysisLine[];
  /** The transformed pressure and derivative (contained in referenced Channels) (to log-log transform) used in this log-log analysis. */
  AnalysisPressure: AbstractPtaPressureData;
  /** The smoothing factor for the derivative curve. Common symbolized as L. */
  DerivativeSmoothingFactorL?: eml.DimensionlessMeasure;
  /** Describes the type of transform applied to the pressure axis of the log log plot. Enum. Options: pressure, and various pressure/flowrate functions. */
  LogLogPressureTransform: LogLogPressureTransform;
  /** Describes the type of transform applied to the time axis of the log log plot. Enum. Options: delta-time (ie, no tranform) and various superposition time functions (ie, time transformed to represent equivalent drawdown time using superposition). */
  LogLogTimeDataTransform: LogLogTimeTransform;
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
}
export interface LogLogAnalysis extends _LogLogAnalysis {}

/** Enum of the pressure axis transform of a log-log plot. "Pressure Function" refers to the pressure as transformed according to the choice of pseudo pressure.  See enum PressureNonLinearTransformType in the pvtForPTA section for details on this choice. */
export type LogLogPressureTransform =
  | "delta pressure function"
  | "delta pressure function/rate"
  | "integral rate normal delta p funct/time"
  | "rate normalized delta p function/rate"
  | "other";
interface _LogLogPressureTransform extends eml._TypeEnum {
  _: LogLogPressureTransform;
}

/** Enum of the time axis transform of a log-log plot. The choices are between different ways of dealing with superposition effects from variable flowrates. */
export type LogLogTimeTransform =
  | "agarwal time"
  | "delta time"
  | "equivalent time cumulative/flowrate"
  | "superposition time";
interface _LogLogTimeTransform extends eml._TypeEnum {
  _: LogLogTimeTransform;
}

/** Lohrenz-Bray-ClarkCorrelation. */
interface _LohrenzBrayClarkCorrelation
  extends _AbstractCompositionalViscosityModel {}
export interface LohrenzBrayClarkCorrelation
  extends _LohrenzBrayClarkCorrelation {}

/** LondonoArcherBlasinggame. */
interface _LondonoArcherBlasinggame
  extends _AbstractCorrelationGasViscosityModel {
  /** The gas density at the conditions for this viscosity correlation to be used. */
  GasDensity?: eml.MassPerVolumeMeasure;
  /** The gas viscosity at 1 atm for the viscosity correlation. */
  GasViscosityAt1Atm?: eml.DynamicViscosityMeasure;
  GasViscosityCoefficient1Atm?: PvtModelParameter[];
}
export interface LondonoArcherBlasinggame extends _LondonoArcherBlasinggame {}

/** A volume corrected to standard temperature and pressure. */
interface _LostVolumeAndReason extends BaseType {
  /** Defines why the volume was lost. */
  reasonLost: ReasonLost;
  VolumeMeasure: eml.VolumeMeasure;
}
export interface LostVolumeAndReason extends _LostVolumeAndReason {}

export type LowerBoundaryType = "constant pressure" | "no-flow";
interface _LowerBoundaryType extends eml._TypeEnum {
  _: LowerBoundaryType;
}

/** Lucas. */
interface _Lucas extends _AbstractCorrelationGasViscosityModel {
  /** The molecular weight of the gas as an input to this viscosity correlation. */
  GasMolarWeight?: eml.MolecularWeightMeasure;
  /** The gas viscosity at 1 atm for the viscosity correlation. */
  GasViscosityAt1Atm?: eml.DynamicViscosityMeasure;
  /** The pseudo critical pressure for the viscosity correlation. */
  PseudoCriticalPressure?: eml.PressureMeasure;
  /** The pseudo critical temperature for the viscosity correlation. */
  PseudoCriticalTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The pseudo reduced pressure for the viscosity correlation. */
  PseudoReducedPressure?: eml.PressurePerPressureMeasure;
  /** The pseudo reduced temperature for the viscosity correlation. */
  PseudoReducedTemperature?: eml.ThermodynamicTemperaturePerThermodynamicTemperatureMeasure;
}
export interface Lucas extends _Lucas {}

/** The balance sheet of mass. */
interface _MassBalance extends BaseType {
  /** The mass balance fraction for this slim tube test volume step. */
  MassBalanceFraction?: eml.MassPerMassMeasure;
  MassIn?: MassIn;
  MassOut?: MassOut;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface MassBalance extends _MassBalance {}

/** The mass of fluid in the connecting lines. */
interface _MassIn extends BaseType {
  /** The mass of fluid in the connecting lines for this slim tube test volume step mass balance. */
  MassFluidConnectingLines?: eml.MassMeasure;
  /** The mass of fluid in the slim tube for this slim tube test volume step mass balance. */
  MassFluidSlimtube?: eml.MassMeasure;
  /** The mass of injected gas solvent for this slim tube test volume step mass balance. */
  MassInjectedGasSolvent?: eml.MassMeasure;
  /** The total mass in for this slim tube test volume step mass balance. */
  TotalMassIn?: eml.MassMeasure;
}
export interface MassIn extends _MassIn {}

/** The  mass out for this slim tube. */
interface _MassOut extends BaseType {
  /** The mass of effluent stock tank oil for this slim tube test volume step mass balance. */
  MassEffluentStockTankOil?: eml.MassMeasure;
  /** The mass of produced effluent gas for this slim tube test volume step mass balance. */
  MassProducedEffluentGas?: eml.MassMeasure;
  /** The mass of produced effluent gas flow down for this slim tube test volume step mass balance. */
  MassProducedEffluentGasFlowDown?: eml.MassMeasure;
  /** The mass of residual oil for this slim tube test volume step mass balance. */
  MassResidualOil?: eml.MassMeasure;
  /** The total mass out for this slim tube test volume step mass balance. */
  TotalMassOut?: eml.MassMeasure;
}
export interface MassOut extends _MassOut {}

/** A measured depth coordinate in a wellbore. Positive moving from the reference datum toward the bottomhole. All coordinates with the same datum (and same UOM) can be considered to be in the same coordinate reference system (CRS) and are thus directly comparable. */
interface _MeasuredDepthCoord extends eml._AbstractMeasure {
  /** The unit of measure of the measured depth coordinate. */
  uom: eml.VerticalCoordinateUom;
}
export interface MeasuredDepthCoord extends _MeasuredDepthCoord {}

/** Pressure data measured during the flow test */
interface _MeasuredFlowData extends _AbstractPtaFlowData {}
export interface MeasuredFlowData extends _MeasuredFlowData {}

/** Pressure data measured during the flow test */
interface _MeasuredPressureData extends _AbstractPtaPressureData {}
export interface MeasuredPressureData extends _MeasuredPressureData {}

/** Dimensionless value, characterizing the restriction to flow (+ve value, damage) or additional capacity for flow (-ve value, eg acidized) due to effective permeability around the wellbore. This value is stated with respect to radial flow using the full reservoir thickness (h), ie the radial flow or middle time region of a pressure transient. It therefore can be added to "ConvergenceSkinRelativeToTotalThickness" skin to yield  "SkinRelativeToTotalThickness". */
interface _MechanicalSkinRelativeToTotalThickness extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface MechanicalSkinRelativeToTotalThickness
  extends _MechanicalSkinRelativeToTotalThickness {}

/** Specifies the kinds of mixing rules. */
export type MixingRule = "asymmetric" | "classical";
interface _MixingRule extends eml._TypeEnum {
  _: MixingRule;
}

/** The name of the model. Available only for Custom Models to identify name of the model. */
interface _ModelName extends _AbstractParameter {
  Abbreviation: eml.String64;
  Name: eml.String64;
}
export interface ModelName extends _ModelName {}

/** Multiple contact miscibility test. */
interface _MultipleContactMiscibilityTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The reference to the composition of the gas solvent that is a fluid composition. */
  GasSolventCompositionReference?: eml.String64;
  /** The mix ratio for the multiple contact miscibility test. */
  MixRatio?: eml.DimensionlessMeasure;
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  TestNumber: eml.NonNegativeLong;
}
export interface MultipleContactMiscibilityTest
  extends _MultipleContactMiscibilityTest {}

/** Natural gas. */
interface _NaturalGas extends _AbstractFluidComponent {
  /** Gas gravity. */
  GasGravity?: number;
  /** The amount of heat released during the combustion of a specified amount of gas. It is also known as higher heating value (HHV), gross energy, upper heating value, gross calorific value (GCV) or higher calorific Value (HCV). This value takes into account the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is practical. */
  GrossEnergyContentPerUnitMass?: eml.EnergyPerMassMeasure;
  /** The amount of heat released during the combustion of a specified amount of gas. It is also known as higher heating value (HHV), gross energy, upper heating value, gross calorific value (GCV) or higher calorific value (HCV). This value takes into account the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is practical. */
  GrossEnergyContentPerUnitVolume?: eml.EnergyPerVolumeMeasure;
  /** Molecular weight. */
  MolecularWeight?: eml.MolecularWeightMeasure;
  /** The amount of heat released during the combustion of a specified amount of gas. It is also known as lower heating value (LHV), net energy, net calorific value (NCV) or lower calorific value (LCV). This value ignores the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is not possible and is ignored. */
  NetEnergyContentPerUnitMass?: eml.EnergyPerMassMeasure;
  /** The amount of heat released during the combustion of a specified amount of gas. It is also known as lower heating value (LHV), net energy, net calorific value (NCV) or lower calorific value (LCV). This value ignores the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is not possible and is ignored. */
  NetEnergyContentPerUnitVolume?: eml.EnergyPerVolumeMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface NaturalGas extends _NaturalGas {}

/** Abstract near-wellbore response model from which the other near wellbore response model types are derived. */
interface _NearWellboreBaseModel extends _AbstractModelSection {
  DeltaPressureTotalSkin?: DeltaPressureTotalSkin;
  RateDependentSkinFactor?: RateDependentSkinFactor;
  RatioDpSkinToTotalDrawdown?: RatioDpSkinToTotalDrawdown;
  SkinRelativeToTotalThickness: SkinRelativeToTotalThickness;
}
export interface NearWellboreBaseModel extends _NearWellboreBaseModel {}

interface _NonHydrocarbonAnalysis extends _FluidAnalysis {
  FlowTestActivity?: eml.DataObjectReference;
  FluidSample?: eml.DataObjectReference;
  NonHydrocarbonTest?: NonHydrocarbonTest[];
}
export interface NonHydrocarbonAnalysis extends _NonHydrocarbonAnalysis {}

interface _NonHydrocarbonTest extends BaseType {
  AnalysisMethod?: eml.String2000;
  CellId?: eml.NonNegativeLong;
  InstrumentId?: eml.String2000;
  NonHydrocarbonConcentrations?: OverallComposition;
  /** A generic measurement which does not result in a concentration measurement can be reported using this element with variable measure class. Example, radioactivity measured in units of radioactivity per unit volume. */
  OtherMeasuredProperties?: eml.ExtensionNameValue[];
  PhasesTested?: PhasePresent;
  Remark?: eml.String2000;
  SamplingPoint?: eml.String2000;
  TestNumber?: eml.NonNegativeLong;
  TestPressure?: eml.PressureMeasureExt;
  TestTemperature?: eml.ThermodynamicTemperatureMeasure;
  TestTime?: eml.TimeStamp;
  TestVolume?: eml.VolumeMeasureExt;
}
export interface NonHydrocarbonTest extends _NonHydrocarbonTest {}

/** A floating point value between zero (inclusive) and one (inclusive). */
export type NonNegativeFraction = number;
type _NonNegativeFraction = Primitive._number;

/** A type of offshore location that captures the North Sea offshore terminology. */
interface _NorthSeaOffshore extends BaseType {
  /** An optional, uncontrolled value, which may be used to describe the general area of offshore North Sea in which the point is located. */
  AreaName?: eml.String64;
  /** A lower case letter assigned if a block is subdivided. */
  BlockSuffix?: eml.String64;
  /** The number or letter of the quadrant in the North Sea. */
  Quadrant: eml.String64;
}
export interface NorthSeaOffshore extends _NorthSeaOffshore {}

/** For a multiple fractured horizontal wellbore model, the number of fractures which originate from the wellbore. In a "HorizontalWellboreMultipleEqualFracturedModel" these fractures are identical and equally spaced, including one fracture at each end of the length represented by "LengthHorizontalWellboreFlowing". */
interface _NumberOfFractures extends _AbstractParameter {
  Abbreviation: eml.String64;
  Number: number;
}
export interface NumberOfFractures extends _NumberOfFractures {}

/** Numerical boundary model in which any arbitrary outer shape of the reservoir boundary can be imposed by use of any number of straight line segments which together define the boundary. */
interface _NumericalBoundaryModel extends _BoundaryBaseModel {
  DrainageAreaMeasured?: DrainageAreaMeasured;
  PoreVolumeMeasured?: PoreVolumeMeasured;
  SingleBoundarySubModel?: SingleBoundarySubModel[];
}
export interface NumericalBoundaryModel extends _NumericalBoundaryModel {}

/** Numerical model with dual porosity reservoir. This model may have constant value or reference a grid of geometrically distributed values for the following parameters: permeability (k), thickness (h), porosity (phi), depth (Z), vertical anisotropy (KvToKr) and horizontal anisotropy (KyTokx).  Internal faults can be positioned in this reservoir. */
interface _NumericalDualPorosityReservoirModel extends _ReservoirBaseModel {
  DistributedParametersSubModel: DistributedParametersSubModel;
  InternalFaultSubModel?: InternalFaultSubModel[];
  InterporosityFlowParameter: InterporosityFlowParameter;
  ReservoirZoneSubModel?: ReservoirZoneSubModel[];
  StorativityRatio: StorativityRatio;
}
export interface NumericalDualPorosityReservoirModel
  extends _NumericalDualPorosityReservoirModel {}

/** Numerical model with homogeneous reservoir. This model may have constant value or reference a grid of geometrically distributed values for the following parameters: permeability (k), thickness (h), porosity (phi), depth (Z), vertical anisotropy (KvToKr) and horizontal anisotropy (KyTokx). Internal faults can be positioned in this reservoir. */
interface _NumericalHomogeneousReservoirModel extends _ReservoirBaseModel {
  DistributedParametersSubModel: DistributedParametersSubModel;
  InternalFaultSubModel?: InternalFaultSubModel[];
  ReservoirZoneSubModel?: ReservoirZoneSubModel[];
}
export interface NumericalHomogeneousReservoirModel
  extends _NumericalHomogeneousReservoirModel {}

/** A generic type of offshore location. This allows an offshore location to be given by an area name, and up to four block names. A comment is also allowed. */
interface _OffshoreLocation extends BaseType {
  /** A general meaning of area. It may be as general as 'UK North Sea' or 'Viosca Knoll'. The user community must agree on the meaning of this element. */
  AreaName?: eml.String64;
  /** A block ID that can more tightly locate the object. The BlockID should be an identifying name or code. The user community for an area must agree on the exact meaning of this element. An aggregate of increasingly specialized block IDs are sometimes necessary to define the location. */
  BlockID: eml.String64[];
  /** An general comment that further explains the offshore location. */
  Comment?: eml.String2000;
  /** A type of offshore location that captures the North Sea offshore terminology. */
  NorthSeaOffshore?: NorthSeaOffshore;
}
export interface OffshoreLocation extends _OffshoreLocation {}

/** Oil compressibility. */
interface _OilCompressibility extends BaseType {
  /** The kind of measurement for oil compressibility. */
  kind: CompressibilityKind;
  ReciprocalPressureMeasure: eml.ReciprocalPressureMeasure;
}
export interface OilCompressibility extends _OilCompressibility {}

/** Oil shrinkage factor. */
interface _OilShrinkageFactor extends _AbstractOilVolShrinkage {
  /** The oil shrinkage factor. */
  OilShrinkageFactor: eml.VolumePerVolumeMeasure;
}
export interface OilShrinkageFactor extends _OilShrinkageFactor {}

/** Oil volume. */
interface _OilVolume extends _AbstractOilVolShrinkage {
  /** The volume of oil. */
  OilVolume: eml.VolumeMeasure;
}
export interface OilVolume extends _OilVolume {}

/** Specifies the types of production operations for which general comments can be defined. */
export type OperationKind =
  | "air traffic"
  | "construction"
  | "deviations"
  | "maintenance"
  | "other"
  | "power station failure"
  | "production"
  | "well";
interface _OperationKind extends eml._TypeEnum {
  _: OperationKind;
}

/** Specifies the types of configuration of an optical path. */
export type OpticalPathConfiguration =
  | "accurate single-ended/dual laser"
  | "differential loss calibrated"
  | "double-ended"
  | "single-ended";
interface _OpticalPathConfiguration extends eml._TypeEnum {
  _: OpticalPathConfiguration;
}

export type OrganicAcidKind =
  | "(COO)22-"
  | "C2H5OCOO-"
  | "C3H5O(COO)33-"
  | "CH2(COO)22-"
  | "CH2OHCOO-"
  | "CH3(CH2)2COO-"
  | "CH3(CH2)3COO-"
  | "CH3CH2COO-"
  | "CH3COO-"
  | "HCOO-";
interface _OrganicAcidKind extends eml._TypeEnum {
  _: OrganicAcidKind;
}

export type OrganicAcidKindExt = string;
type _OrganicAcidKindExt = Primitive._string;

/** In the case where there is horizontal anisotropy, the orientation of the x direction represented in the local CRS.  Optional since many models do not account for this parameter. */
interface _OrientationOfAnisotropyXDirection extends _AbstractParameter {
  Abbreviation: eml.String64;
  Angle: eml.PlaneAngleMeasure;
}
export interface OrientationOfAnisotropyXDirection
  extends _OrientationOfAnisotropyXDirection {}

/** For an induced hydraulic fracture which is assumed for PTA purposes to be planar, the azimuth of the fracture in the horizontal plane represented in the CRS. */
interface _OrientationOfFracturePlane extends _AbstractParameter {
  Abbreviation: eml.String64;
  Angle: eml.PlaneAngleMeasure;
}
export interface OrientationOfFracturePlane
  extends _OrientationOfFracturePlane {}

/** In a Linear Composite model, the orientation of the boundary of the inner and outer zones represented in the local CRS. */
interface _OrientationOfLinearFront extends _AbstractParameter {
  Abbreviation: eml.String64;
  Angle: eml.PlaneAngleMeasure;
}
export interface OrientationOfLinearFront extends _OrientationOfLinearFront {}

/** In any bounded reservoir model, the orientation of the normal to Boundary 1. This is an absolute orientation in the local CRS. */
interface _OrientationOfNormalToBoundary1 extends _AbstractParameter {
  Abbreviation: eml.String64;
  Angle: eml.PlaneAngleMeasure;
}
export interface OrientationOfNormalToBoundary1
  extends _OrientationOfNormalToBoundary1 {}

/** For a slant wellbore or horizontal wellbore model, the azimuth of the wellbore in the horizontal plane, represented in the local CRS. This is intended to be a value representative of the azimuth for the purposes of PTA. It is not necessarily the azimuth which would be recorded in a survey of the wellbore trajectory. */
interface _OrientationWellTrajectory extends _AbstractParameter {
  Abbreviation: eml.String64;
  Angle: eml.PlaneAngleMeasure;
}
export interface OrientationWellTrajectory extends _OrientationWellTrajectory {}

/** Records the result arrays along with context information for an optical time domain reflectometry (OTDR) survey. The arrays define the relative scattered power from the Rayleigh scattering vs. distance along the fiber. The actual data values are recorded in an OTDR file and/or image file, which are referenced in sub-elements. */
interface _OTDRAcquisition extends eml._AbstractObject {
  /** A reference to the external file used to record the OTDR data. Note this file will not be in an Energistics format but likely in a special OTDR format. */
  DataInOTDRFile?: eml.String64;
  /** Enum. The direction of the OTDR survey. "Forward" means "in the same direction as the positive direction along the optical path". */
  Direction: OTDRDirection;
  /** The dateTime of the run. */
  DTimRun: eml.TimeStamp;
  /** Information about an OTDR instrument box taht is used to perform OTDR surveys on the optical path. */
  FiberOTDRInstrumentBox?: FiberOTDRInstrumentBox;
  /** Contact for the person who performed the OTDR reading */
  MeasurementContact?: eml.DataObjectReference;
  /** The name of this object. */
  Name: eml.String64;
  /** The point measured along the optical path at which this OTDR survey ends. */
  OpticalPathDistanceEnd: eml.LengthMeasure;
  /** The point measured along the optical path at which this OTDR survey starts. */
  OpticalPathDistanceStart: eml.LengthMeasure;
  /** A reference to the well log used to record the table of data. */
  OTDRImageFile?: eml.String64;
  /** The reason the OTDR test was run. Reasons include:
   * - pre-installation, which is before the installation of the fiber
   * - post-installation, which is used to validate a successful fiber installation
   * - DTS run, a quality check of the fiber before a DTS run
   * - Other */
  ReasonForRun?: OTDRReason;
  /** The wavelength at which this OTDR survey was carried out. */
  Wavelength: eml.LengthMeasure;
}
export interface OTDRAcquisition extends _OTDRAcquisition {}

/** Specifies the OTDR directions. */
export type OTDRDirection = "backward" | "forward";
interface _OTDRDirection extends eml._TypeEnum {
  _: OTDRDirection;
}

/** Specifies the reasons an OTDR test was run within a distributed temperature survey (DTS). */
export type OTDRReason =
  | "dts"
  | "other"
  | "post-installation"
  | "pre-installation"
  | "run";
interface _OTDRReason extends eml._TypeEnum {
  _: OTDRReason;
}

/** Other flow data measurements */
interface _OtherData extends _AbstractFlowTestData {
  /** The Channel containing the Data. */
  DataChannel: eml.DataObjectReference;
}
export interface OtherData extends _OtherData {}

/** Other measurement test. */
interface _OtherMeasurementTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Fluid characterization table. */
  FluidCharacterizationTable?: FluidCharacterizationTable;
  /** A set of table format definitions. */
  FluidCharacterizationTableFormatSet?: FluidCharacterizationTableFormatSet;
  /** Other measurement test step. */
  OtherMeasurementTestStep?: OtherMeasurementTestStep[];
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** An integer number to identify this test in a sequence of tests. */
  TestNumber: eml.NonNegativeLong;
}
export interface OtherMeasurementTest extends _OtherMeasurementTest {}

/** Other measurement test step. */
interface _OtherMeasurementTestStep extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The fluid condition at this test step. Enum, see fluid analysis step condition. */
  FluidCondition?: FluidAnalysisStepCondition;
  /** The gas gravity at this test step. */
  GasGravity?: number;
  /** The gas density at this test step. */
  GasMassDensity?: eml.MassPerVolumeMeasure;
  /** The viscosity of the gas phase at this test step. */
  GasViscosity?: eml.DynamicViscosityMeasure;
  /** The gas Z factor value at this test step. */
  GasZFactor?: number;
  /** The oil mass density for this test step. */
  OilMassDensity?: eml.MassPerVolumeMeasure;
  /** The viscosity of the oil phase at this test step. */
  OilViscosity?: eml.DynamicViscosityMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The rsw for this test step. */
  Rsw?: number;
  /** The salinity for this test step. */
  Salinity?: eml.MassPerMassMeasure;
  /** The shear for this test step. */
  Shear?: number;
  /** The step number is the index of a (P,T) step in the overall test. */
  StepNumber: eml.NonNegativeLong;
  /** The pressure for this test step. */
  StepPressure?: eml.PressureMeasure;
  /** The temperature for this test step. */
  StepTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The water content for this test step. */
  WaterContent?: eml.String64;
  /** The water viscosity for this test step. */
  WaterViscosity?: eml.DynamicViscosityMeasure;
}
export interface OtherMeasurementTestStep extends _OtherMeasurementTestStep {}

/** . */
interface _OutputFlowData extends _AbstractPtaFlowData {}
export interface OutputFlowData extends _OutputFlowData {}

/** Specifies the output fluid properties. */
export type OutputFluidProperty =
  | "Compressibility"
  | "Density"
  | "Derivative of Density w.r.t Pressure"
  | "Derivative of Density w.r.t Temperature"
  | "Enthalpy"
  | "Entropy"
  | "Expansion Factor"
  | "Formation Volume Factor"
  | "Gas-Oil Interfacial Tension"
  | "Gas-Water Interfacial Tension"
  | "Index"
  | "K value"
  | "Misc Bank Critical Solvent Saturation"
  | "Misc Bank Phase Density"
  | "Misc Bank Phase Viscosity"
  | "Miscibility Parameter (Alpha)"
  | "Mixing Parameter Oil-Gas"
  | "Normalized Pseudo Pressure"
  | "Oil-Gas Ratio"
  | "Oil-Water Interfacial Tension"
  | "Parachor"
  | "Pressure"
  | "Pseudo Pressure"
  | "P-T Cross Term"
  | "Saturation Pressure"
  | "Solution GOR"
  | "Solvent Density"
  | "Specific Heat"
  | "Temperature"
  | "Thermal Conductivity"
  | "Viscosity"
  | "Viscosity Compressibility"
  | "Water vapor mass fraction in gas phase"
  | "Z Factor";
interface _OutputFluidProperty extends eml._TypeEnum {
  _: OutputFluidProperty;
}

/** Output fluid property extension. */
export type OutputFluidPropertyExt = string;
type _OutputFluidPropertyExt = Primitive._string;

/** . */
interface _OutputPressureData extends _AbstractPtaPressureData {}
export interface OutputPressureData extends _OutputPressureData {}

/** Overall composition. */
interface _OverallComposition extends BaseType {
  /** Fluid component. */
  FluidComponentFraction?: FluidComponentFraction[];
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface OverallComposition extends _OverallComposition {}

/** Owner business account */
interface _OwnershipBusinessAcct extends BaseType {}
export interface OwnershipBusinessAcct extends _OwnershipBusinessAcct {}

/** Choice of whether a result parameter is an input or an output. Input means "this parameter was fixed and is an input to the analysis" and Output means "parameter was determined by the analysis". */
export type ParameterDirection = "input" | "output";
interface _ParameterDirection extends eml._TypeEnum {
  _: ParameterDirection;
}

/** Parent facility. */
interface _Parentfacility extends _AbstractRefProductFlow {
  /** A reference to a flow within the current product volume report. This represents a foreign key from one element to another. */
  ParentfacilityReference: eml.String64;
}
export interface Parentfacility extends _Parentfacility {}

/** Partially Penetrating model, with flowing length of wellbore less than total thickness of reservoir layer (as measured along wellbore). */
interface _PartiallyPenetratingModel extends _NearWellboreBaseModel {
  ConvergenceSkinRelativeToTotalThickness?: ConvergenceSkinRelativeToTotalThickness;
  DistanceMidPerforationsToBottomBoundary: DistanceMidPerforationsToBottomBoundary;
  MechanicalSkinRelativeToTotalThickness?: MechanicalSkinRelativeToTotalThickness;
  PerforatedLength: PerforatedLength;
  SkinLayer2RelativeToTotalThickness?: SkinLayer2RelativeToTotalThickness;
}
export interface PartiallyPenetratingModel extends _PartiallyPenetratingModel {}

/** Specifies the types of fiber zone that can be reported on. */
export type PathDefectKind = "darkened fiber" | "other";
interface _PathDefectKind extends eml._TypeEnum {
  _: PathDefectKind;
}

/** PengRobinson76_EOS. */
interface _PengRobinson76_EOS extends _AbstractCompositionalEoSModel {}
export interface PengRobinson76_EOS extends _PengRobinson76_EOS {}

/** PengRobinson78_EOS. */
interface _PengRobinson78_EOS extends _AbstractCompositionalEoSModel {}
export interface PengRobinson78_EOS extends _PengRobinson78_EOS {}

/** For a partial penetration (a vertical or slant well with less than full layer thickness open to flow) or a hydraulically fractured model, the length of the perforated section of the wellbore. */
interface _PerforatedLength extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface PerforatedLength extends _PerforatedLength {}

/** Information on the type of permanent conveyance used by the optical path. */
interface _PermanentCable extends _AbstractCable {
  /** Comment about the intervention conveyance. */
  Comment?: eml.String2000;
  /** Enum. For permanent conveyance option, the type of conveyance. Example: clamped to tubular. */
  PermanentCableInstallationType: PermanentCableInstallationKind;
}
export interface PermanentCable extends _PermanentCable {}

/** Specifies the types of permanent cable installations. */
export type PermanentCableInstallationKind =
  | "buried parallel to tubular"
  | "clamped to tubular"
  | "wrapped around tubular";
interface _PermanentCableInstallationKind extends eml._TypeEnum {
  _: PermanentCableInstallationKind;
}

/** The product of the radial permeability of the reservoir layer in the horizontal plane * the total thickness of the layer. */
interface _PermeabilityThicknessProduct extends _AbstractParameter {
  Abbreviation: eml.String64;
  PermeabilityLength: eml.PermeabilityLengthMeasureExt;
}
export interface PermeabilityThicknessProduct
  extends _PermeabilityThicknessProduct {}

/** PetroskyFarshad-BubblePoint. */
interface _PetroskyFarshadBubblePoint
  extends _AbstractCorrelationViscosityBubblePointModel {}
export interface PetroskyFarshadBubblePoint
  extends _PetroskyFarshadBubblePoint {}

/** PetroskyFarshad-Dead. */
interface _PetroskyFarshadDead extends _AbstractCorrelationViscosityDeadModel {
  /** The oil gravity at stock tank conditions for this viscosity correlation. */
  OilGravityAtStockTank?: eml.APIGravityMeasure;
}
export interface PetroskyFarshadDead extends _PetroskyFarshadDead {}

/** PetroskyFarshad-Undersaturated. */
interface _PetroskyFarshadUndersaturated
  extends _AbstractCorrelationViscosityUndersaturatedModel {}
export interface PetroskyFarshadUndersaturated
  extends _PetroskyFarshadUndersaturated {}

/** Phase density. */
interface _PhaseDensity extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The phase density. */
  Density?: eml.MassPerVolumeMeasure;
  /** The pressure corresponding to this phase density. */
  Pressure?: eml.PressureMeasure;
}
export interface PhaseDensity extends _PhaseDensity {}

/** Specifies the values for phase present. It can be water, gas or oil;  each combination of any two phases; or all three phases. */
export type PhasePresent =
  | "gas and oil and water"
  | "water"
  | "gas"
  | "oil"
  | "oil and gas"
  | "oil and water"
  | "gas and water";
interface _PhasePresent extends eml._TypeEnum {
  _: PhasePresent;
}

/** Phase viscosity. */
interface _PhaseViscosity extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The pressure corresponding to this phase viscosity. */
  Pressure?: eml.PressureMeasure;
  /** The phase viscosity. */
  Viscosity?: eml.DynamicViscosityMeasure;
}
export interface PhaseViscosity extends _PhaseViscosity {}

/** Pinch Out boundary model. The upper and lower bounding surfaces of the reservoir are sub-parallel and intersect some distance from the wellbore. Other directions are unbounded. */
interface _PinchOutModel extends _BoundaryBaseModel {
  DistanceToPinchOut: DistanceToPinchOut;
  OrientationOfNormalToBoundary1?: OrientationOfNormalToBoundary1;
}
export interface PinchOutModel extends _PinchOutModel {}

/** Specifies the types of plus components. */
export type PlusComponentKind =
  | "c10+"
  | "c11+"
  | "c12+"
  | "c20+"
  | "c25+"
  | "c30+"
  | "c36+"
  | "c5+"
  | "c6+"
  | "c7+"
  | "c8+"
  | "c9+";
interface _PlusComponentKind extends eml._TypeEnum {
  _: PlusComponentKind;
}

/** Plus component enumeration extension. */
export type PlusComponentKindExt = string;
type _PlusComponentKindExt = Primitive._string;

/** Plus fluid component. */
interface _PlusFluidComponent extends _AbstractFluidComponent {
  /** The average density of the fluid. */
  AvgDensity?: eml.MassPerVolumeMeasure;
  /** The average molecular weight of the fluid. */
  AvgMolecularWeight?: eml.MolecularWeightMeasure;
  /** The kind from plus fluid component. See PlusComponentEnum. */
  Kind: PlusComponentKindExt;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The fluid specific gravity. */
  SpecificGravity?: number;
  /** The starting boiling temperature measure. */
  StartingBoilingPoint?: eml.ThermodynamicTemperatureMeasure;
  /** The start/min carbon number. */
  StartingCarbonNumber?: eml.NonNegativeLong;
}
export interface PlusFluidComponent extends _PlusFluidComponent {}

/** In a closed reservoir model, the Pore Volume measured. This is to be taken to mean that the analysis yielded a measurement, as opposed to the RadiusOfInvestigation or PoreVolumeOfInvestigation Parameters which are taken to mean the estimates for these parameters derived from diffuse flow theory, but not necessarily measured. */
interface _PoreVolumeMeasured extends _AbstractParameter {
  Abbreviation: eml.String64;
  Volume: eml.VolumeMeasure;
}
export interface PoreVolumeMeasured extends _PoreVolumeMeasured {}

/** For any transient test, the estimated pore volume of investigation of the test. */
interface _PoreVolumeOfInvestigation extends _AbstractParameter {
  Abbreviation: eml.String64;
  Volume: eml.VolumeMeasure;
}
export interface PoreVolumeOfInvestigation extends _PoreVolumeOfInvestigation {}

/** The porosity of the reservoir layer. */
interface _Porosity extends _AbstractParameter {
  Abbreviation: eml.String64;
  VolumePerVolume: eml.VolumePerVolumeMeasure;
}
export interface Porosity extends _Porosity {}

interface _PreProcessedFlowData extends _AbstractPtaFlowData {
  /** In cases where the abstract Pta pressure data has type: deconvolved pressure data, this is a reference, using data object reference, to the PtaDataPreProcess data-object containing details of the pre-processing applied. */
  PreProcess: eml.DataObjectReference;
}
export interface PreProcessedFlowData extends _PreProcessedFlowData {}

interface _PreProcessedPressureData extends _AbstractPtaPressureData {
  /** In cases where the abstract Pta pressure data has type: deconvolved pressure data, this is a reference, using data object reference, to the PtaDataPreProcess data-object containing details of the pre-processing applied. */
  PreProcess: eml.DataObjectReference;
}
export interface PreProcessedPressureData extends _PreProcessedPressureData {}

/** The depth TVD of the datum at which reservoir pressures are reported for this layer. Note, this depth may not exist inside the layer at the Test Location but it is the reference depth to which pressures will be corrected. */
interface _PressureDatumTVD extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface PressureDatumTVD extends _PressureDatumTVD {}

/** Optional enum for gas or multiphase pseudo pressure analyses using pressure transforms. */
export type PressureNonLinearTransformKind =
  | "pressure (un-transformed)"
  | "pressure squared"
  | "gas pseudo-pressure"
  | "normalised gas pseudo-pressure"
  | "normalised multi-phase pseudo-pressure";
interface _PressureNonLinearTransformKind extends eml._TypeEnum {
  _: PressureNonLinearTransformKind;
}

/** Contains the data about the analysis and the model used, in a PTA Analysis.  An Analysis may be a pressure transient (PTA), rate transient (RTA) or Test Design, depending on which data is supplied. This object contains common parameters. The Analysis has one or more Test Location Analysis elements and each reports the model details for one Test Location. */
interface _PressureTransientAnalysis extends eml._AbstractObject {
  Analysis?: AbstractAnalysis;
  CompressibilityParameters?: CompressibilityParameters;
  /** Superclass of possible flow test activities: drill stem, production transient, interwell, and others. */
  FlowTestActivity: eml.DataObjectReference;
  /** A reference, using data object reference, to a FluidCharacterization data-object containing the fluid parameters for this PTA. */
  FluidCharacterization?: eml.DataObjectReference;
  /** An enum of which phases are being analysed by this analysis (i.e., single phase or multi-phase analyses). */
  FluidPhaseAnalysisKind: FluidPhaseKind;
  /** Measurements pertaining to the interfering flow, in the case of an interference test. */
  InterferingFlowTestInterval?: InterferingFlowTestInterval[];
  /** Set to TRUE if the Analysis is done with numerical modeling. */
  IsNumericalAnalysis?: boolean;
  /** Contains the data about a layer model for PTA or Inflow analysis. This class contains common parameters and then model sections each report the parameter values for the pressure transient model used to describe the later. These are: near wellbore, reservoir, and boundary sections. Example: closed reservoir boundary section model will report 4 distances to boundaries. */
  LayerModel?: LayerModel[];
  /** The name of the method used for analysis - textual description. No semantic meaning. Example: "non-linear regression". */
  MethodName?: eml.String2000;
  /** The name of the model used - textual description of the whole model. No semantic meaning. Example: "Dual porosity with 2 parallel faults".  The full details of the model are in the Wellbore Model and layerModel sections of the TestLocationAnalysis. */
  ModelName: eml.String2000;
  /** A reference, using data object reference, to a RESQML data-object containing the root level data for a numerical PTA model. */
  NumericalPtaModel?: eml.DataObjectReference;
  /** Enum for gas or multiphase pseudo pressure analyses using pressure transforms. If pseudo pressure, then further details on the kind of pseudo pressure will be found in the Pseudo Pressure Effect Applied element. */
  PressureNonLinearTransformKind: PressureNonLinearTransformKind;
  /** A reference (using uid) to the flow test measurement set which contains the data concerning the principal test location, in the case of an interference test. For standard (non-interference) tests, this is not needed to be filled in, since there is only one flow test location and therefore only one  flow test measurement set. */
  PrincipalFlowTestMeasurementSetRef?: eml.String64;
  /** A reference (using uid) to the test period(s) whose effect the analysis is being performed on.  In the case of an interference test, this reference is to the test period(s) of the principal flow test location. The test periods of interfering flow test locations are included under the Interfering Flow Test Interval element(s). */
  PrincipalTestPeriodRef: eml.String64[];
  /** Recurring enum used to list all the transforms which have been included in the pseudo pressure transform. If "Other" is selected, a comment should be used to explain. */
  PseudoPressureEffectApplied?: PseudoPressureEffectApplied;
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
  /** The time this Analysis was created (ie, the time of analysis, not the time of data acquisition). */
  TimeAppliesFrom?: eml.TimeStamp;
  /** The time this Analysis was finished (ie, the time of analysis, not the time of data acquisition). */
  TimeAppliesTo?: eml.TimeStamp;
  /** Enum for gas pseudo time analyses using time transforms. */
  TimeNonLinearTransformKind: TimeNonLinearTransformKind;
  /** Abstract wellbore response model from which the other wellbore response model types are derived. */
  WellboreModel?: WellboreBaseModel;
}
export interface PressureTransientAnalysis extends _PressureTransientAnalysis {}

/** A relative identifier (or URI, Uniform Resource Identifier), It follows the general pattern of type(id)/type(id) where (id) is optional, as defined in the Energistics Identifier Specification, which is available in the zip file when download PRODML. */
export type ProdmlRelativeIdentifier = string;
type _ProdmlRelativeIdentifier = Primitive._string;

/** The properties of produced gas. */
interface _ProducedGasProperties extends BaseType {
  /** The produced gas gravity of this produced gas. */
  ProducedGasGravity?: eml.DimensionlessMeasure;
  /** The vapor composition of this produced gas. */
  VaporComposition: VaporComposition[];
}
export interface ProducedGasProperties extends _ProducedGasProperties {}

/** Properties of produced oil. */
interface _ProducedOilProperties extends BaseType {
  /** The asphaltene content of this produced oil. */
  AsphalteneContent?: eml.MassPerMassMeasure;
  /** The stock tank oil API gravity of this produced oil. */
  STOApiGravity?: eml.APIGravityMeasure;
  /** The stock tank oil density of this produced oil. */
  STODensity?: eml.MassPerVolumeMeasure;
  /** The stock tank oil molecular weight of this produced oil. */
  STOMW?: eml.MolecularWeightMeasure;
  /** The stock tank oil water content of this produced oil. */
  STOWaterContent?: eml.VolumePerVolumeMeasure;
}
export interface ProducedOilProperties extends _ProducedOilProperties {}

/** Volumes that "left" the reporting entity by one of the disposition methods defined in Kind (e.g., flaring, sold, used on site, etc.) */
interface _ProductDisposition extends _AbstractDisposition {
  /** The method of disposition. See enum DispositionKind. */
  Kind: DispositionKindExt;
}
export interface ProductDisposition extends _ProductDisposition {}

/** Documents the point in time where changes were made. */
interface _ProductFlowChangeLog extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The timestamp associated with the change. All changes must use this timestamp. */
  DTim: eml.TimeStamp;
  /** A name assigned to the change. */
  Name: eml.String64;
  /** A textual reason for the change. */
  Reason?: eml.String2000;
}
export interface ProductFlowChangeLog extends _ProductFlowChangeLog {}

/** Defines expected properties of a facility represented by a unit. */
interface _ProductFlowExpectedUnitProperty extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The PRODML Relative Identifier (or URI) of a child of the parent facility. The identifier path is presumed to begin with the identity of the parent facility. This identifies a sub-facility which is identified within the context of the parent facilityParent2/facilityParent1/name identification hierarchy. The property is only expected to be defined for this child and not for the parent.
   * For more information about URIs, see the Energistics Identifier Specification, which is available in the zip file when download PRODML. */
  ChildFacilityIdentifier?: ProdmlRelativeIdentifier;
  /** A descriptive remark associated with this property. */
  Comment?: eml.String2000;
  /** Difference between two consecutive readings, which must exceed deadband value to be accepted. */
  Deadband?: GeneralMeasureType;
  /** Defines the expected flow and product pairs to be
   * assigned to this port by a Product Volume report.
   * A set of expected qualifiers can be defined for each pair.
   * The aggregate of expectations on all properties should be a subset of
   * the aggregate of expectations on the port.
   * If no expectations are defined on the port then the port
   * aggregate will be defined by the properties. */
  ExpectedFlowProduct?: ProductFlowQualifierExpected[];
  /** Forces a choice between a qualifier or one more qualified by flow and product. */
  ExpectedFlowQualifier?: ExpectedFlowQualifier;
  /** The maximum time difference from the last sent event before the next event is sent. */
  MaximumFrequency?: eml.TimeMeasure;
  /** The expected kind of facility property. Each property is documented to have values of a particular type. */
  Property: FacilityParameter;
  /** An alternative name for the sensor that  measures the property. */
  TagAlias?: eml.NameStruct[];
}
export interface ProductFlowExpectedUnitProperty
  extends _ProductFlowExpectedUnitProperty {}

/** Product Flow Network External Port Schema. */
interface _ProductFlowExternalPort extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** A descriptive remark about the port. */
  Comment?: eml.String2000;
  /** Defines the internal node to which this external port is connected. All ports (whether internal or external) that are connected to a node with the same name are connected to each other. Node names are unique to each network. The purpose of the external port is to provide input to or output from the internal network except when the port is an "exposed" port. The purpose of an exposed port is to allow the properties of the port to be seen external to the network. For an exposed port, the connection points to the associated port. */
  ConnectedNode: eml.String64;
  /** Defines whether this port is an inlet or outlet. Note that this is a nominal intended direction. */
  Direction: ProductFlowPortType;
  /** True ("true" or "1") indicates that the port is an exposed internal port and cannot be used in a connection external to the network. False ("false" or "0") or not given indicates a normal port. */
  Exposed?: boolean;
  /** The name of the external port within the context of the current product flow network. */
  Name: eml.String64;
}
export interface ProductFlowExternalPort extends _ProductFlowExternalPort {}

/** A reference to an external port in a different product flow model.This value represents a foreign key from one element to another. */
interface _ProductFlowExternalReference extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top level object. */
  uid: eml.String64;
  ConnectedInstallation?: FacilityIdentifierStruct;
  /** Reference to the connected model. */
  ConnectedModelReference: eml.String64;
  /** Reference to the connected port. */
  ConnectedPortReference: eml.String64;
  /** Reference to a type of port. */
  PortReference: eml.String64;
}
export interface ProductFlowExternalReference
  extends _ProductFlowExternalReference {}

/** The non-contextual content of a product flow model data object. */
interface _ProductFlowModel extends eml._AbstractObject {
  /** A descriptive remark about the model. */
  Comment?: eml.String2000;
  /** The name and type of a facility whose context is relevant to the represented installation. */
  ContextFacility?: FacilityIdentifierStruct[];
  /** The date and time of the termination of validity for this model. */
  DTimEnd?: eml.TimeStamp;
  /** The maximum time index contained within the report. The minimum and maximum indexes are server query parameters and will be populated with valid values in a "get" result. */
  DTimMax?: EndpointQualifiedDateTime;
  /** The minimum time index contained within the report. The minimum and maximum indexes are server query parameters and will be populated with valid values in a "get" result. */
  DTimMin?: EndpointQualifiedDateTime;
  /** The date and time of the start of validity for this model. */
  DTimStart?: eml.TimeStamp;
  /** The time for which "currently existing" data is desired from the network. All connections (and related data) existing at this time (i.e., start and end bracket this value) will  be returned if requested. The existence time is a server query parameter. */
  ExistenceTime?: EndpointQualifiedDateTime;
  /** Defines the external port in another Product Flow Model to which
   * an external port in this model is connected.
   * An external port should be connected to an external port with the opposite direction.
   * The connected external port must be in another Product Flow Model.
   * These connections should always be defined on a one-to-one basis. For example, if a facility
   * may receive input from multiple other facilities then a separate input port should be defined
   * for each of those facilities. This allows any question about mass balancing to be contained
   * within each individual model.
   * The external port name must match the name of an external port on the network
   * that represents this model. */
  ExternalConnect?: ProductFlowExternalReference[];
  /** The name of the facility that is represented by this model. The name can be qualified by a naming system. This also defines the kind of facility. */
  Installation?: FacilityIdentifierStruct;
  /** The description of one named network within this model.
   * Each model is self contained but may reference other newtorks for defining
   * internal detail. One of the networks must represent this model. */
  Network: ProductFlowNetwork[];
}
export interface ProductFlowModel extends _ProductFlowModel {}

/** The non-contextual content of a product flow network object. */
interface _ProductFlowNetwork extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Documents that a change occurred at a particular time. */
  ChangeLog?: ProductFlowChangeLog[];
  /** A descriptive remark about the network. */
  Comment?: eml.String2000;
  /** The name of the product flow network. This must be unique within the context of the overall product flow model. */
  Name: eml.String64;
  /** A pointer to the network containing the unit that this network represents. That is, the unit must exist in a different network. If a parent network is not specified then the network represents the model. A model should only be represented by one network. The model network represents the overall installation. All other networks represent internal detail and should not be referenced from outside the model. The external ports on the model network represent the external ports to the overall product flow model. A pointer to an external port on the product flow model does not require the name of the model network because it is redundant to knowledge of the model name (i.e., there is a one-to-one correspondence). */
  ParentNetworkReference?: eml.String64;
  /** Defines the existance of a planned network which is a variant of this network
   * beginning at a specified point in time. Any changes to the actual network after
   * that time do not affect the plan. */
  Plan?: ProductFlowNetworkPlan[];
  /** The name of a network plan. This indicates a planned network. All child network components must all be planned and be part of the same plan. The parent network must either contain the plan (i.e., be an actual) or be part of the same plan. Not specified indicates an actual network. */
  PlanName?: eml.String64;
  /** An external port. This exposes an internal node for the purpose
   * of allowing connections to the internal behavior of the network.
   * Networks that represent a Flow Unit should always have external ports.
   * If this network represents a Unit then the name of the external port must match
   * the name of a port on the Unit (i.e., they are logically the same port). */
  Port?: ProductFlowExternalPort[];
  /** A flow behavior for one unit. Within this context, a unit
   * represents a usage of equipment for some purpose. The unit is generally identified
   * by its function rather than the actual equipment used to realize the function.
   * A unit might represent something complex like a field or separator or something simple
   * like a valve or pump. */
  Unit: ProductFlowUnit[];
}
export interface ProductFlowNetwork extends _ProductFlowNetwork {}

/** A plan to extend an actual network. */
interface _ProductFlowNetworkPlan extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Documents that a change occurred at a particular time. */
  ChangeLog?: ProductFlowChangeLog[];
  /** The date and time of the start of the plan. This point coincides with the end of the actual configuration. The configuration of the actual at this point in time represents the configuration of the plan at this starting point. All changes to this plan must be in the future from this point in time. */
  DTimStart: eml.TimeStamp;
  /** The name assigned to the plan. */
  Name: eml.String64;
  /** A textual description of the purpose of the plan. */
  Purpose?: eml.String2000;
}
export interface ProductFlowNetworkPlan extends _ProductFlowNetworkPlan {}

/** Product Flow Port Schema. */
interface _ProductFlowPort extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** A descriptive remark associated with this port. */
  Comment?: eml.String2000;
  /** Defines the node to which this port is connected.
   * A timestamp activates and deactivates the connection.
   * Only one connectedNode should be active at any one point in time.
   * There are no semantics for the node except common connection.
   * All ports that are connected to a node with the the same name are inherently connected to each other.
   * The name of the node is only required to be unique within the context of the
   * current Product Flow Network (that is, not the overall model).
   * All ports must be connected to a node and whether or not any other port is connected
   * to the same node depends on the requirements of the network.
   * Any node that is internally connected to only one port is presumably a candidate
   * to be connected to an external node.
   * The behavior of ports connected at a common node is as follows:
   * a) There is no pressure drop across the node. All ports connected to the node have
   * the same pressure. That is, there is an assumption of steady state fluid flow.
   * b) Conservation of mass exists across the node. The mass into the node via all
   * connected ports equals the mass out of the node via all connected ports.
   * c) The flow direction of a port connected to the node may be transient. That is, flow
   * direction may change toward any port(s) if the relative internal pressure of
   * the Product Flow Units change and a new steady state is achieved. */
  ConnectedNode: ConnectedNode[];
  /** Defines whether this port is an inlet or outlet. This is a nominal intended direction. */
  Direction: ProductFlowPortType;
  /** Defines the expected flow and product pairs to be
   * assigned to this port by a Product Volume report.
   * A set of expected qualifiers can be defined for each pair. */
  ExpectedFlowProduct?: ProductFlowQualifierExpected[];
  /** Defines the properties that are expected to be measured at this port.
   * This can also specify the equipment tag(s) of the sensor that will read the value.
   * Only one of each property kind should be active at any point in time. */
  ExpectedFlowProperty?: ProductFlowExpectedUnitProperty[];
  /** True ("true" or "1") indicates that the port is an exposed internal port and cannot be used in a connection external to the unit. False ("false" or "0") or not given indicates a normal port. */
  Exposed?: boolean;
  /** The name of the facility represented by this ProductFlowPort The name can be qualified by a naming system. The facility name is assumed to be unique within the context of the facility represented by the unit. This also defines the kind of facility. */
  Facility?: FacilityIdentifierStruct;
  /** An alternative name of a facility. This is generally unique within a naming system. The above contextually unique name should also be listed as an alias. */
  FacilityAlias?: eml.NameStruct[];
  /** The name of the port within the context of the product flow unit. */
  Name: eml.String64;
  /** The name of a network plan. This indicates a planned port. All child network components must all be planned and be part of the same plan. The parent unit must be part of the same plan or be an actual. Not specified indicates an actual port. */
  PlanName?: eml.String64;
}
export interface ProductFlowPort extends _ProductFlowPort {}

/** Specifies the types of product flow ports. */
export type ProductFlowPortType = "inlet" | "outlet" | "unknown";
interface _ProductFlowPortType extends eml._TypeEnum {
  _: ProductFlowPortType;
}

/** Defines an expected combination of kinds. */
interface _ProductFlowQualifierExpected extends _ExpectedFlowQualifier {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The expected kind of flow. */
  Flow: ReportingFlow;
  /** The expected kind of product within the flow. */
  Product?: ReportingProduct;
  /** The expected kind of qualifier of the flow. */
  Qualifier?: FlowQualifier[];
}
export interface ProductFlowQualifierExpected
  extends _ProductFlowQualifierExpected {}

/** Product Flow Unit Schema. */
interface _ProductFlowUnit extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** A descriptive remark associated with this unit. */
  Comment?: eml.String2000;
  /** The name and type of a facility whose context is relevant to the represented facility. */
  ContextFacility?: FacilityIdentifierStruct[];
  /** Defines an expected property of the facility represented by this unit. */
  ExpectedProperty?: ProductFlowExpectedUnitProperty[];
  /** The name of the facility for which this Product Flow Unit describes fluid flow connection behavior. The name can be qualified by a naming system. This also defines the kind of facility. */
  Facility?: FacilityIdentifierStruct;
  FacilityAlias?: eml.NameStruct[];
  /** For facilities whose name is unique within the context of another facility, the name of the parent facility this named facility. The name can be qualified by a naming system. This also defines the kind of facility. */
  FacilityParent1?: FacilityIdentifierStruct;
  /** For facilities whose name is unique within the context of another facility, the name of the parent facility of facilityParent1. The name can be qualified by a naming system. This also defines the kind of facility. */
  FacilityParent2?: FacilityIdentifierStruct;
  /** A pointer to the network representing the internal behavior of this unit. The names of the external ports on the internal network must match the names of the ports on this unit. That is they are logically the same ports. */
  InternalNetworkReference?: eml.String64;
  /** The name of the ProductFlowUnit within the context of the ProductFlowNetwork. */
  Name?: eml.String64;
  /** The name of a network plan. This indicates a planned unit. All child network components must all be planned and be part of the same plan. The parent network must either contain the plan (i.e., be an actual) or be part of the same plan. Not specified indicates an actual unit. */
  PlanName?: eml.String64;
  /** An inlet or outlet port associated with this unit.
   * If there is an internal network then the name of this port must match the name of
   * an external port for that network.
   * Any properties (e.g., volume, pressure, temperature) that are assigned to this port
   * are inherently assigned to the corresponding external port on the internal network.
   * That is, the ports are logically the same port.
   * Similar to a node, there is no pressure drop across a port.
   * Also similar to a node, conservation of mass exists across the port and
   * the flow direction across the port can change over time if the relative pressures
   * across connected units change. */
  Port?: ProductFlowPort[];
  /** Defines the relative coordinate of the unit on a display screen.
   * This is not intended for detailed diagrams. Rather it is intended to allow different
   * applications to present a user view which has a consistent layout. */
  RelativeCoordinate?: RelativeCoordinate;
}
export interface ProductFlowUnit extends _ProductFlowUnit {}

/** Contains the physical properties of the product fluid. Every volume has a product fluid reference. */
interface _ProductFluid extends _AbstractProductQuantity {
  /** String UID that points to the productFluid in the fluidComponentSet. */
  productFluidReference?: eml.String64;
  /** The amount of heat released during the combustion of the reported amount of this product. This value takes into account the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is practical. */
  GrossEnergyContent?: eml.EnergyMeasure;
  /** The amount of heat released during the combustion of the reported amount of this product. This value ignores the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is not possible and is ignored. */
  NetEnergyContent?: eml.EnergyMeasure;
  /** Overall composition. */
  OverallComposition?: OverallComposition;
  /** A simple enumeration to provide information about the product that the production quantity represents. */
  ProductFluidKind: ProductFluidKindExt;
}
export interface ProductFluid extends _ProductFluid {}

/** Specifies the kinds of product in a fluid system. */
export type ProductFluidKind =
  | "condensate"
  | "condensate - gross"
  | "condensate - net"
  | "crude - stabilized"
  | "gas - component in oil"
  | "gas - dry"
  | "gas - rich"
  | "gas - wet"
  | "liquefied natural gas"
  | "liquefied petroleum gas"
  | "liquid"
  | "naphtha"
  | "natural gas liquid"
  | "NGL - component in gas"
  | "oil - component in water"
  | "oil - gross"
  | "oil - net"
  | "oil and gas"
  | "petroleum gas liquid"
  | "vapor"
  | "sand"
  | "water - discharge"
  | "water - processed";
interface _ProductFluidKind extends eml._TypeEnum {
  _: ProductFluidKind;
}

/** Use to add user-defined enumerations for ProductFluidKind. */
export type ProductFluidKindExt = string;
type _ProductFluidKindExt = Primitive._string;

/** Product volume that is produce from a reporting entity. */
interface _Production extends BaseType {
  ProductionQuantity?: AbstractProductQuantity[];
  /** The method in which the quantity/volume was determined. See enum QuantityMethod. */
  QuantityMethod: QuantityMethodExt;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface Production extends _Production {}

/** Regularly  performed using the well's permanent production string,  as a steady-state test to assess long-term well performance and as an input to production allocation. This is NOT expected to be a transient test. */
interface _ProductionFlowTest extends _FlowTestActivity {
  /** The date and time from which this well test is used in production allocation processes as representative of the well’s performance */
  EffectiveDate?: eml.TimeStamp;
  IntervalMeasurementSet: FlowTestMeasurementSet;
  /** A flag which is to be set if this test is validated and therefore able to used in processes such as production allocation. */
  Validated?: boolean;
  /** Description or name of the method used to conduct the well test. */
  WellTestMethod?: eml.String64;
}
export interface ProductionFlowTest extends _ProductionFlowTest {}

/** The non-contextual content of a Production Operation object. */
interface _ProductionOperation extends eml._AbstractObject {
  /** The date that the report was approved. */
  ApprovalDate?: Date;
  Approver?: eml.DataObjectReference;
  /** The name and type of a facility whose context is relevant to the represented installation. */
  ContextFacility?: FacilityIdentifierStruct[];
  DateTime?: AbstractDateTimeClass;
  /** The geographic context of the report. */
  GeographicContext?: GeographicContext;
  /** The name of the facility which is represented by this report. The name can be qualified by a naming system. This also defines the kind of facility. */
  Installation?: FacilityIdentifierStruct;
  /** A report for each installation */
  InstallationReport?: ProductionOperationInstallationReport[];
  /** The date that the report was issued. */
  IssueDate?: Date;
  IssuedBy?: eml.DataObjectReference;
  /** The type of report. */
  Kind?: eml.String64;
  Operator?: eml.DataObjectReference;
  /** The type of period that is being reported. This value must be consistent with the reporting start and end values. */
  PeriodKind?: ReportingDurationKind;
  /** The title of the report, if different from the name of the report. */
  Title?: eml.NameStruct;
}
export interface ProductionOperation extends _ProductionOperation {}

/** Production Activity Schema. */
interface _ProductionOperationActivity extends BaseType {
  /** Infomation about an alarm. */
  Alarm?: ProductionOperationAlarm[];
  /** Information about a cargo operation. */
  CargoShipOperation?: ProductionOperationCargoShipOperation[];
  /** Infomation about a lost injection. */
  LostInjection?: ProductionOperationLostProduction;
  /** Infomation about a lost production. */
  LostProduction?: ProductionOperationLostProduction;
  /** Information about a marine operation. */
  MarineOperation?: ProductionOperationMarineOperation[];
  /** A comment about a kind of operation.
   * The time of the operation can be specified. */
  OperationalComment?: ProductionOperationOperationalComment[];
  /** Infomation about a shutdown event. */
  Shutdown?: ProductionOperationShutdown[];
  /** Information about the contaminants in water, and the general water quality. */
  WaterCleaningQuality?: ProductionOperationWaterCleaningQuality[];
}
export interface ProductionOperationActivity
  extends _ProductionOperationActivity {}

/** A structure to record information about a single alarm. */
interface _ProductionOperationAlarm extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The area where the alarm sounded. */
  Area?: eml.String64;
  /** A general comment about the alarm. */
  Comment?: eml.String2000;
  /** The date and time when the alarms sounded. */
  DTim?: eml.TimeStamp;
  /** The reason the alarm sounded. */
  Reason?: eml.String2000;
  /** The type of alarm that sounded. */
  Type?: eml.String64;
}
export interface ProductionOperationAlarm extends _ProductionOperationAlarm {}

/** Information about an operation involving a cargo ship. */
interface _ProductionOperationCargoShipOperation extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Basic sediment and water is measured from a liquid sample the production stream. It includes free water, sediment and emulsion and is measured as a volume percentage of the liquid. */
  Bsw?: eml.VolumePerVolumeMeasure;
  /** Name of the captain of the vessel. */
  Captain?: eml.String64;
  /** Description of cargo on the vessel. */
  Cargo?: eml.String2000;
  /** The cargo batch number. Used if the vessel needs to temporarily disconnect for some reason (e.g., weather). */
  CargoBatchNumber?: number;
  /** The cargo identifier. */
  CargoNumber?: eml.String64;
  /** A commnet about the operation. */
  Comment?: DatedComment[];
  /** Density of the liquid loaded to the tanker. */
  Density?: eml.MassPerVolumeMeasure;
  /** Density of the liquid loaded to the tanker. This density has been corrected to standard conditions of temperature and pressure. */
  DensityStdTempPres?: eml.MassPerVolumeMeasure;
  /** The date and time that the vessel left. */
  DTimEnd?: eml.TimeStamp;
  /** The date and time that the vessel arrived. */
  DTimStart?: eml.TimeStamp;
  /** Gross oil loaded to the ship during the report period. Gross oil includes BS and W. This volume has been corrected to standard conditions of temperature and pressure. */
  OilGrossStdTempPres?: eml.VolumeMeasure;
  /** Gross oil loaded to the ship in total during the operation. Gross oil includes BS and W. This volume has been corrected to standard conditions of temperature and pressure. */
  OilGrossTotalStdTempPres?: eml.VolumeMeasure;
  /** Net oil loaded to the ship from the beginning of the month to the end of the reporting period. Net oil excludes BS and W, fuel, spills, and leaks. This volume has been corrected to standard conditions of temperature and pressure. */
  OilNetMonthToDateStdTempPres?: eml.VolumeMeasure;
  /** Net oil loaded to the ship during the report period. Net oil excludes BS and W, fuel, spills, and leaks. This volume has been corrected to standard conditions of temperature and pressure. */
  OilNetStdTempPres?: eml.VolumeMeasure;
  /** Reid vapor pressure of the liquid. */
  Rvp?: eml.PressureMeasure;
  /** Salt content. The product formed by neutralization of an acid and a base. The term is more specifically applied to sodium chloride. */
  Salt?: eml.MassPerVolumeMeasure;
  /** Name of the cargo vessel. */
  VesselName?: eml.String64;
}
export interface ProductionOperationCargoShipOperation
  extends _ProductionOperationCargoShipOperation {}

/** Operational Health, Safety and Environment Schema. */
interface _ProductionOperationHSE extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The number of system alarms that have occurred. */
  AlarmCount?: number;
  /** The number of incidents or accidents and injuries that were reported. */
  IncidentCount?: number;
  /** The number of medical treatments that have occurred. */
  MedicalTreatmentCount?: number;
  /** Safety information at a specific installatino. */
  Safety?: ProductionOperationSafety[];
  /** A textual description of safety considerations. */
  SafetyDescription?: eml.String2000;
  /** The number of personnel safety introductions that have occurred. */
  SafetyIntroCount?: number;
  /** The amount of time since the most recent defined hazard and accident situation (Norwegian DFU). */
  SinceDefinedSituation?: eml.TimeMeasure;
  /** The amount of time since the most recent lost-time accident. */
  SinceLostTime?: eml.TimeMeasure;
  /** The amount of time since the most recent accident-prevention exercise. */
  SincePreventionExercise?: eml.TimeMeasure;
  /** Information about the weather at a point in time. */
  Weather?: ProductionOperationWeather[];
}
export interface ProductionOperationHSE extends _ProductionOperationHSE {}

/** Installation Report Schema. */
interface _ProductionOperationInstallationReport extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Total count of beds available on the installation. */
  BedsAvailable?: number;
  /** A one-based count of personnel on a type of crew. */
  CrewCount?: CrewCount[];
  /** The installation represented by this report. */
  Installation?: FacilityIdentifierStruct;
  /** Health, Safety and Environmenal information. */
  OperationalHSE?: ProductionOperationHSE[];
  /** Production activities. */
  ProductionActivity?: ProductionOperationActivity;
  /** The total cumulative amount of time worked during the reporting period. Commonly specified in units of hours. Note that a day unit translates to 24 hours worked. */
  Work?: eml.TimeMeasure;
  /** The total cumulative amount of time worked from the beginning of the month to the end of reporting period. Commonly specified in units of hours. Note that a day unit translates to 24 hours worked. */
  WorkMonthToDate?: eml.TimeMeasure;
  /** The total cumulative amount of time worked from the beginning of the year to the end of reporting period. Commonly specified in units of hours. Note that a day unit translates to 24 hours worked. */
  WorkYearToDate?: eml.TimeMeasure;
}
export interface ProductionOperationInstallationReport
  extends _ProductionOperationInstallationReport {}

/** Lost Production Schema. */
interface _ProductionOperationLostProduction extends BaseType {
  ThirdPartyProcessing?: ProductionOperationThirdPartyProcessing[];
  VolumeAndReason?: LostVolumeAndReason[];
}
export interface ProductionOperationLostProduction
  extends _ProductionOperationLostProduction {}

/** Information about a marine operation. */
interface _ProductionOperationMarineOperation extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** A comment on a special event in the marine area. */
  Activity?: DatedComment[];
  /** Report of any basket movement to and from the installation. */
  BasketMovement?: DatedComment[];
  /** The ending date and time that the comment represents. */
  DTimEnd?: eml.TimeStamp;
  /** The beginning date and time that the comment represents. */
  DTimStart?: eml.TimeStamp;
  /** A general comment on marine activity in the area. */
  GeneralComment?: eml.String2000;
  /** Name of the standby vessel for the installation. */
  StandbyVessel?: eml.String64;
  /** Comment regarding the standby vessel. */
  StandbyVesselComment?: DatedComment[];
  /** Name of the supply vessel for the installation. */
  SupplyShip?: eml.String64;
  /** Comment regarding the supply ship. */
  SupplyShipComment?: DatedComment[];
}
export interface ProductionOperationMarineOperation
  extends _ProductionOperationMarineOperation {}

/** Operational Comments Schema. */
interface _ProductionOperationOperationalComment extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** A comment about the operation and/or the activities within the operation. */
  Comment?: eml.String2000[];
  /** The ending date and time that the comment represents. */
  DTimEnd?: eml.TimeStamp;
  /** The beginning date and time that the comment represents. */
  DTimStart?: eml.TimeStamp;
  /** The kind of operation. */
  Type?: OperationKind;
}
export interface ProductionOperationOperationalComment
  extends _ProductionOperationOperationalComment {}

/** Safety Information Schema. */
interface _ProductionOperationSafety extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Safety related comment. */
  Comment?: DatedComment[];
  /** The mean time between safety incidents. */
  MeantimeIncident?: eml.TimeMeasure;
  /** A zero-based count of a type of safety item. */
  SafetyCount?: SafetyCount[];
}
export interface ProductionOperationSafety extends _ProductionOperationSafety {}

/** Information about a shutdown event. */
interface _ProductionOperationShutdown extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** A description of main activities from time to time during the shutdown period. */
  Activity?: DatedComment[];
  /** A general description of the shutdown with reason and other relevant information. */
  Description?: eml.String2000;
  /** The time the shutdown ended. */
  DTimEnd?: eml.TimeStamp;
  /** The time the shutdown started. */
  DTimStart?: eml.TimeStamp;
  /** The name of the installation which was shut down. The name can be qualified by a naming system. This also defines the kind of facility. */
  Installation?: FacilityIdentifierStruct;
  /** Estimated loss of gas deliveries because of the shutdown. This volume has been corrected to standard conditions of temperature and pressure. */
  LossGasStdTempPres?: eml.VolumeMeasure;
  /** Estimated loss of oil deliveries because of the shutdown. This volume has been corrected to standard conditions of temperature and pressure. */
  LossOilStdTempPres?: eml.VolumeMeasure;
  /** Downtime when the installation is unable to produce 100% of its capability. */
  VolumetricDownTime?: eml.TimeMeasure;
}
export interface ProductionOperationShutdown
  extends _ProductionOperationShutdown {}

/** Production losses due to third-party processing. */
interface _ProductionOperationThirdPartyProcessing extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The estimated amount of gas lost. This volume has been corrected to standard conditions of temperature and pressure */
  GasStdTempPres?: eml.VolumeMeasure;
  /** The name of the installation which performed the processing. The name can be qualified by a naming system. This also defines the kind of facility. */
  Installation?: FacilityIdentifierStruct;
  /** The estimated amount of oil lost. This volume has been corrected to standard conditions of temperature and pressure */
  OilStdTempPres?: eml.VolumeMeasure;
}
export interface ProductionOperationThirdPartyProcessing
  extends _ProductionOperationThirdPartyProcessing {}

/** Information about the contaminants in water, and the general water quality. The values are measured from a sample, which is described below. Values measured from other samples should be given in different instances of the type. */
interface _ProductionOperationWaterCleaningQuality extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The amount of ammonium found in the water sample. */
  Ammonium?: eml.MassPerVolumeMeasure;
  /** Total measured oil in the water after the water cleaning process, but before it is discharged from the installation */
  AmountOfOil?: eml.MassMeasure;
  /** Any comment that may be useful in describing the water quality.
   * There can be multiple comments. */
  Comment?: DatedComment[];
  /** A measure of the number of particles in water as measured by a coulter counter. */
  CoulterCounter?: eml.MassPerMassMeasure;
  /** The amount of glycol found in the water sample. */
  Glycol?: eml.MassPerVolumeMeasure;
  /** Total measured oil in the water after the water cleaning process, but before it is discharged from the installation. */
  OilInWaterProduced?: eml.MassPerMassMeasure;
  /** Total measured oxygen in the water after the water cleaning process, but before it is discharged from the installation. */
  Oxygen?: eml.MassPerMassMeasure;
  /** The amount of phenol found in the water sample. */
  Phenol?: eml.MassPerVolumeMeasure;
  /** The pH value of the treated water. The pH value is best given as a value, with no unit of measure, since there are no variations from the pH. */
  PhValue?: eml.DimensionlessMeasure;
  /** Total measured residual chlorides in the water after the water cleaning process, but before it is discharged from the installation. */
  ResidualChloride?: eml.MassPerMassMeasure;
  /** An identifier of the point from which the sample was taken. This is an uncontrolled string value, which should be as descriptive as possible. */
  SamplePoint?: eml.String64;
  /** The amount of total organic carbon found in the water. The water is under high temperature and the carbon left is measured. */
  TotalOrganicCarbon?: eml.MassPerMassMeasure;
  /** A measure of the cloudiness of water caused by suspended particles. */
  Turbidity?: eml.DimensionlessMeasure;
  /** The temperature of the water before it is discharged. */
  WaterTemperature?: eml.ThermodynamicTemperatureMeasure;
}
export interface ProductionOperationWaterCleaningQuality
  extends _ProductionOperationWaterCleaningQuality {}

/** Operations Weather Schema. */
interface _ProductionOperationWeather extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Name of company that supplied the data. */
  Agency?: eml.String64;
  /** Amount of precipitation. */
  AmtPrecip?: eml.LengthMeasure;
  /** Azimuth of current. */
  AziCurrentSea?: eml.PlaneAngleMeasure;
  /** The direction from which the waves are coming, measured from true north. */
  AziWave?: eml.PlaneAngleMeasure;
  /** The direction from which the wind is blowing, measured from true north. */
  AziWind?: eml.PlaneAngleMeasure;
  /** Atmospheric pressure. */
  BarometricPressure?: eml.PressureMeasure;
  /** The Beaufort wind scale is a system used to estimate and report wind speeds when no measuring apparatus is available. It was invented in the early 19th Century by Admiral Sir Francis Beaufort of the British Navy as a way to interpret winds from conditions. */
  BeaufortScaleNumber?: BeaufortScaleIntegerCode;
  /** Height of cloud cover. */
  CeilingCloud?: eml.LengthMeasure;
  /** Comments and remarks. */
  Comments?: eml.String2000;
  /** Description of cloud cover. */
  CoverCloud?: eml.String64;
  /** Current speed. */
  CurrentSea?: eml.AngularVelocityMeasure;
  /** Date and time the information is related to. */
  DTim: eml.TimeStamp;
  /** Average height of the waves. */
  HtWave?: eml.LengthMeasure;
  /** The maximum wave height. */
  MaxWave?: eml.LengthMeasure;
  /** The elapsed time between the passing of two wave tops. */
  PeriodWave?: eml.TimeMeasure;
  /** An average of the higher 1/3 of the wave heights passing during a sample period (typically 20 to 30 minutes). */
  SignificantWave?: eml.LengthMeasure;
  /** Sea temperature. */
  Tempsea?: eml.ThermodynamicTemperatureMeasure;
  /** Average temperature above ground for the period. Temperature of the atmosphere. */
  TempSurface?: eml.ThermodynamicTemperatureMeasure;
  /** Minimum temperature above ground. Temperature of the atmosphere. */
  TempSurfaceMn?: eml.ThermodynamicTemperatureMeasure;
  /** Maximum temperature above ground. */
  TempSurfaceMx?: eml.ThermodynamicTemperatureMeasure;
  /** A measure of the combined chilling effect of wind and low temperature on living things, also named chill factor, e.g., according to US Weather Service table, an air temperature of 30 degF with a 10 mph wind corresponds to a wind chill of 22 degF. */
  TempWindChill?: eml.ThermodynamicTemperatureMeasure;
  /** Type of precipitation. */
  TypePrecip?: eml.String64;
  /** Wind speed. */
  VelWind?: eml.AngularVelocityMeasure;
  /** Horizontal visibility. */
  Visibility?: eml.LengthMeasure;
}
export interface ProductionOperationWeather
  extends _ProductionOperationWeather {}

/** Typically performed using the well's permanent production string,  one interval at a time. */
interface _ProductionTransientTest extends _FlowTestActivity {
  IntervalMeasurementSet: FlowTestMeasurementSet;
}
export interface ProductionTransientTest extends _ProductionTransientTest {}

/** Period during which the well choke did not vary. */
interface _ProductionWellPeriod extends BaseType {
  /** The duration at the given choke setting. */
  Duration: eml.TimeMeasure;
  /** The production rate of the product. */
  ProductRate: ProductRate[];
  /** A descriptive remark relating to any significant events during this period. */
  Remark?: eml.String2000;
  ReportingEntity: eml.DataObjectReference;
  /** The start time at a given choke setting. */
  StartTime: eml.TimeStamp;
  /** The status of the well. */
  WellFlowingCondition?: WellFlowingCondition;
  /** The status of the well. */
  WellStatus?: eml.WellStatus;
}
export interface ProductionWellPeriod extends _ProductionWellPeriod {}

/** This is the collection of ProductionWellTests. */
interface _ProductionWellTests extends _AbstractSimpleProductVolume {
  /** Validate. */
  EndDate: eml.TimeStamp;
  /** BUSINESS RULE: In this usage, this link is expected to be a  type of  Production Flow Test or Injection Flow Test. The Production Flow Test has  validation and effective date for allocation purposes. Flow Test Location is expected to be a Reporting Entity (same as a volume, etc) in standard SPVR usage */
  FlowTestActivity: eml.DataObjectReference[];
  /** Validate. */
  NominalPeriodKind: ReportingDurationKindExt;
  /** Description or name of the method used to conduct the well test. */
  StartDate: eml.TimeStamp;
}
export interface ProductionWellTests extends _ProductionWellTests {}

/** The production rate of the product. */
interface _ProductRate extends BaseType {
  /** A reference (using uid) to a fluid component contained in the Fluid Component Catalog. */
  ProductFluidReference?: eml.String64;
  /** Mass flow rate. */
  MassFlowRate?: eml.MassPerTimeMeasure;
  /** Information about the product that the product quantity represents. See enum ProductFluidKind (in the ProdmlCommon package). */
  ProductFluidKind: ProductFluidKindExt;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** Volume flow rate. */
  VolumeFlowRate?: eml.FlowRateValue;
}
export interface ProductRate extends _ProductRate {}

/** The non-contextual content of a product volume object. */
interface _ProductVolume extends eml._AbstractObject {
  /** The date that the report was approved. */
  ApprovalDate?: Date;
  /** The person or company that approved the report. This may contain the role of the person or company within the context of the report. */
  Approver?: eml.DataObjectReference;
  /** A business unit and related account or ownership share information. */
  BusinessUnit?: ProductVolumeBusinessUnit[];
  /** The calculation method for  "filling in" values in an indexed set. If not given, the default is that no calculations are performed to create data where none exists within an existing set. This is not to be construed as to prevent concepts such as simulation and forecasting from being applied in order to create a new set. This is a server query parameter. */
  CalculationMethod?: CalculationMethod;
  /** The name and type of a facility whose context is relevant to the represented installation. */
  ContextFacility?: FacilityIdentifierStruct[];
  DateTime?: AbstractDateTimeClass;
  /** The definition of the "current time" index for this report. The current time index is a server query parameter which requests the selection of a single node from a recurring "period" set (e.g., the data related to one point in a time series). For the purposes of this parameter, a "period" without any time data should be assumed to have the time associated with the overall report. */
  DTimCurrent?: eml.TimeStamp;
  /** The maximum time index contained within the report. For the purposes of this parameter, a "period" or "facility parameter" without any time data should be assumed to have the time associated with the overall report. The minimum and maximum indexes are server query parameters and will be populated with valid values in a "get" result. */
  DTimMax?: EndpointQualifiedDateTime;
  /** The minimum time index contained within the report. For the purposes of this parameter, a "period" or "facility parameter" without any time data should be assumed to have the time associated with the overall report. The minimum and maximum indexes are server query parameters and will be populated with valid values in a "get" result. */
  DTimMin?: EndpointQualifiedDateTime;
  /** A facility for which product information is being reported. */
  Facility: ProductVolumeFacility[];
  /** The geographic context of the report. */
  GeographicContext?: GeographicContext;
  /** The name of the facility which is represented by this report. The name can be qualified by a naming system. This also defines the kind of facility. */
  Installation?: FacilityIdentifierStruct;
  /** The date that the report was issued. */
  IssueDate?: Date;
  /** The person or company that issued the report. This may contain the role of the person or company within the context of the report. */
  IssuedBy?: eml.DataObjectReference;
  /** The type of report. */
  Kind?: eml.String64;
  /** The operator of the facilities in the report. */
  Operator?: eml.DataObjectReference;
  /** The type of period that is being reported. This value must be consistent with the reporting start and end values. */
  PeriodKind?: ReportingDurationKind;
  ProductFlowModel?: eml.DataObjectReference;
  /** Defines the default standard temperature and pressure to which all volumes, densities and flow rates in this report have been corrected. The default may be locally overridden for an individual value. If not specified, then the conditions must be presumed to be ambient conditions (i.e., uncorrected) unless otherwise specified at a local level. */
  StandardTempPres?: eml.ReferenceCondition;
  /** The tile of the report if different from the name of the report. */
  Title?: eml.NameStruct;
}
export interface ProductVolume extends _ProductVolume {}

/** Alert Schema. */
interface _ProductVolumeAlert extends BaseType {
  /** A textual description of the alert. */
  Description?: eml.String2000;
  /** The level of the alert. */
  Level?: eml.String64;
  /** An XPATH to the target value within the message containing this XPATH value. */
  Target?: eml.String2000;
  /** The type of alert. For example "off specification". */
  Type?: eml.String64;
}
export interface ProductVolumeAlert extends _ProductVolumeAlert {}

/** Product Volume Balance Detail Schema. */
interface _ProductVolumeBalanceDetail extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** An account identifier for the balance. */
  AccountNumber?: eml.String64;
  ComponentContent?: ProductVolumeComponentContent[];
  Event?: ProductVolumeBalanceEvent[];
  /** A pointer to the business unit which owns the product. */
  Owner: eml.String64;
  /** A pointer to a fluid sample analysis result object that is relevant to the balance. This sample may have been acquired previous to or after this period and is used for determining the allocated characteristics. */
  SampleAnalysisResult?: eml.String64[];
  /** The owner's share of the product. */
  Share?: eml.VolumePerVolumeMeasure;
  /** Points to the business unit from which the product originated. */
  SourceUnit?: eml.String64;
  /** A possibly temperature and pressure corrected volume value. */
  VolumeValue?: eml.VolumeValue[];
}
export interface ProductVolumeBalanceDetail
  extends _ProductVolumeBalanceDetail {}

/** Captures information about an event related to a product balance. */
interface _ProductVolumeBalanceEvent extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The date of the event. */
  Date: Date;
  /** The kind of event. */
  Kind: BalanceEventKind;
}
export interface ProductVolumeBalanceEvent extends _ProductVolumeBalanceEvent {}

/** Product Flow Balance Set Schema. */
interface _ProductVolumeBalanceSet extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  BalanceDetail?: ProductVolumeBalanceDetail[];
  /** A cargo batch number. Used if the vessel needs to temporarily disconnect for some reason (e.g., weather). */
  CargoBatchNumber?: number;
  /** A cargo identifier for the product. */
  CargoNumber?: eml.String64;
  Destination?: ProductVolumeDestination;
  /** Defines the aspect being described. */
  Kind?: BalanceFlowPart;
  /** The name of the shipper */
  Shipper?: eml.String64;
}
export interface ProductVolumeBalanceSet extends _ProductVolumeBalanceSet {}

/** Product volume schema for defining ownership shares of business units. */
interface _ProductVolumeBusinessSubUnit extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Points to business unit which is part of another business unit. */
  Kind: eml.String64;
  /** Owner business account */
  OwnershipBusinessAcct: OwnershipBusinessAcct;
}
export interface ProductVolumeBusinessSubUnit
  extends _ProductVolumeBusinessSubUnit {}

/** Product volume schema for defining business units. */
interface _ProductVolumeBusinessUnit extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** A textual description of the business unit. */
  Description?: eml.String2000;
  /** The type of business unit. */
  Kind: BusinessUnitKind;
  /** The human contextual name of the business unit. */
  Name?: eml.String64;
  /** A component part of the unit.
   * The composition of a unit may vary with time.
   * This defines the ownership share or account information for a sub unit within the context of the whole unit.
   * For ownership shares, at any one point in time the sum of the shares should be 100%. */
  SubUnit?: ProductVolumeBusinessSubUnit[];
}
export interface ProductVolumeBusinessUnit extends _ProductVolumeBusinessUnit {}

/** Product Volume Component Content Schema. */
interface _ProductVolumeComponentContent extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The type of product whose relative content is being described. This should be a specific component (e.g., water) rather than a phase (e.g., aqueous). */
  Kind: ReportingProduct;
  Properties?: CommonPropertiesProductVolume;
  /** The type of product to which the product is being compared. If not given then the product is being compared against the overall flow stream. */
  ReferenceKind?: ReportingProduct;
}
export interface ProductVolumeComponentContent
  extends _ProductVolumeComponentContent {}

/** Product Flow Sales Destination Schema. */
interface _ProductVolumeDestination extends BaseType {
  /** The country of the destination. */
  Country?: eml.String64;
  /** The name of the destination. */
  Name?: eml.String64;
  /** The type of destination. */
  Type?: BalanceDestinationType;
}
export interface ProductVolumeDestination extends _ProductVolumeDestination {}

/** Report Facility Schema. */
interface _ProductVolumeFacility extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The storage capacity of the facility (e.g., a tank). */
  Capacity?: eml.VolumeMeasure;
  Comment?: DatedComment[];
  DowntimeReason?: DatedComment[];
  /** An alternative name of a facility. This is generally unique within a naming system. The above contextually unique name (that is, within the context of a parent) should also be listed as an alias. */
  FacilityAlias?: eml.NameStruct[];
  /** Facility parent. */
  FacilityParent?: FacilityIdentifierStruct;
  /** Facility parent2. */
  FacilityParent2?: FacilityIdentifierStruct;
  /** Reports a flow of a product. */
  Flow?: ProductVolumeFlow[];
  /** POSC well fluid. The type of fluid being produced from or injected into a well facility. */
  FluidWell?: WellFluid;
  /** The name of the facility. The name can be qualified by a naming system. This also defines the kind of facility. */
  Name: FacilityIdentifierStruct;
  /** Network. */
  NetWork?: eml.String64;
  /** The lift method being used to operate the well. */
  OperatingMethod?: WellOperationMethod;
  /** The amount of time that the facility was active during the reporting period. */
  OperationTime?: eml.TimeMeasure;
  ParameterSet?: ProductVolumeParameterSet[];
  /** Status of the well. */
  StatusWell?: eml.WellStatus;
  /** Unit. */
  Unit?: eml.String64;
  /** True (or 1) indicates that the well is injecting. False (or 0) or not given indicates that the well is not injecting. This only applies if the facility is a well or wellbore. */
  WellInjecting?: boolean;
  /** True (or 1) indicates that the well is producing. False (or 0) or not given indicates that the well is not producing. This only applies if the facility is a well or wellbore. */
  WellProducing?: boolean;
}
export interface ProductVolumeFacility extends _ProductVolumeFacility {}

/** Product Volume Flow Component Schema. */
interface _ProductVolumeFlow extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Direction. */
  Direction?: ProductFlowPortType;
  /** Facility. */
  Facility?: FacilityIdentifierStruct;
  /** Facility alias. */
  FacilityAlias?: eml.NameStruct[];
  /** Indicates the type of flow that is being reported. The type of flow is an indication of the overall source or target of the flow.  - A production flow has one or more wells as the originating source.  - An injection flow has one or more wells as the ultimate target.  - An import flow has an offsite source.  - An export flow has an offsite target. - A consumption flow generally has a kind of equipment as a target. */
  Kind: ReportingFlow;
  /** The name of this flow within the context of this report. This might reflect some combination of the kind of flow, port, qualifier and related facility. */
  Name?: eml.String64;
  /** Port. */
  Port?: eml.String64;
  /** Reports a product flow stream. */
  Product?: ProductVolumeProduct[];
  Properties?: CommonPropertiesProductVolume;
  /** Qualifies the type of flow that is being reported. */
  Qualifier?: FlowQualifier;
  RelatedFacility?: ProductVolumeRelatedFacility;
  /** This is a pointer to the flow from which this flow was derived. */
  SourceFlow?: eml.String64;
  /** Defines a specialization of the qualifier value. This should only be given if a qualifier is given. */
  SubQualifier?: FlowSubQualifier;
  /** Version. */
  Version?: eml.TimeStamp;
  /** Identifies the source of the version. This will commonly be the name of the software which created the version. */
  VersionSource?: eml.String64;
}
export interface ProductVolumeFlow extends _ProductVolumeFlow {}

/** Product Volume Facility Parameter Set Schema. */
interface _ProductVolumeParameterSet extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The PRODML Relative Identifier (or URI) of a child of the parent facility. The identifier path is presumed to begin with the identity of the parent facility. This identifies a sub-facility which is identified within the context of the parent facilityParent2/facilityParent1/name identification hierarchy. The property is only expected to be defined for this child and not for the parent.
   * For more information about URIs, see the Energistics Identifier Specification, which is available in the zip file when download PRODML. */
  ChildFacilityIdentifier?: ProdmlRelativeIdentifier;
  /** A comment about the parameter. */
  Comment?: eml.String2000;
  /** The pointer to the coordinate reference system (CRS). This is needed for coordinates such as measured depth to specify the reference datum. */
  CoordinateReferenceSystem?: eml.String64;
  /** If the value is a curve, this defines the meaning of the one column
   * in the table representing the curve.
   * Mutually exclusive with measureClass. */
  CurveDefinition?: CurveDefinition[];
  /** If the value is a measure (value with unit of measure), this defines the measurement class of the value. The units of measure for the value must conform to the list allowed by the measurement class in the unit dictionary file. Mutually exclusive with curveDefinition. */
  MeasureClass?: eml.MeasureClass;
  /** The name of the facility parameter. This should reflect the business semantics of all values in the set and not the underlying kind. For example, specify "diameter" rather than "length" or "distance". */
  Name: FacilityParameter;
  /** A parameter value, possibly at a time.
   * If a time is not given then only one parameter should be given.
   * If a time is specified with one value then time should be specified
   * for all values. Each value in a time series should be of the same
   * underling kind of value (for example, a length measure). */
  Parameter: ProductVolumeParameterValue[];
  /** The type of period that is being reported. */
  PeriodKind?: ReportingDurationKind;
  /** The port to which this parameter is assigned. This must be a port on the unit representing the parent facility of this parameter. If not specified then the parameter represents the unit. */
  Port?: eml.String64;
  /** The type of product that is being reported. This would be useful for something like specifying a tank product volume or level. */
  Product?: ReportingProduct;
  /** Qualifies the type of parameter that is being reported. */
  Qualifier?: FlowQualifier;
  /** Defines a specialization of the qualifier value. This should only be given if a qualifier is given. */
  SubQualifier?: FlowSubQualifier;
  /** A timestamp representing the version of this data. A parameter set with a more recent timestamp will represent the "current" version. */
  Version?: eml.TimeStamp;
  /** Identifies the source of the version. This will commonly be the name of the software which created the version. */
  VersionSource?: eml.String64;
}
export interface ProductVolumeParameterSet extends _ProductVolumeParameterSet {}

/** Parameter Value Schema. */
interface _ProductVolumeParameterValue extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** An indication of some sort of abnormal condition relative
   * this parameter. */
  Alert?: ProductVolumeAlert;
  /** The date and time at which the parameter applies. If no time is specified then the value is static. */
  DTim?: eml.TimeStamp;
  /** The date and time at which the parameter no longer applies. The "active" time interval is inclusive of this point. If dTimEnd is given then dTim shall also be given. */
  DTimEnd?: eml.TimeStamp;
  MeasureDataType: AbstractMeasureData[];
  /** A port related to the parameter. If a port is given then the corresponding unit usually must be given. For example, an "offset along network" parameter must specify a port from which the offset was measured. */
  Port?: eml.String64;
  /** A unit related to the parameter. For example, an "offset along network" parameter must specify a port (on a unit) from which the offset was measured. */
  Unit?: eml.String64;
}
export interface ProductVolumeParameterValue
  extends _ProductVolumeParameterValue {}

/** Product Volume Period Schema. */
interface _ProductVolumePeriod extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** An indication of some sort of abnormal condition relative
   * the values in this period. */
  Alert?: ProductVolumeAlert;
  /** Provides the sales context for this period. */
  BalanceSet?: ProductVolumeBalanceSet[];
  /** A time-stamped remark about the amounts. */
  Comment?: DatedComment[];
  /** The relative amount of a component product in the product stream. */
  ComponentContent?: ProductVolumeComponentContent[];
  DateTime?: AbstractDateTimeClass;
  /** The type of period that is being reported. If not specified and a time is not given then the period is defined by the reporting period. */
  Kind?: ReportingDurationKind;
  Properties?: CommonPropertiesProductVolume;
}
export interface ProductVolumePeriod extends _ProductVolumePeriod {}

/** Product Volume port differential characteristics. */
interface _ProductVolumePortDifference extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The relative size of the choke restriction. This characterizes the overall unit with respect to the flow restriction between the ports. The restriction might be implemented using a valve or an actual choke. */
  ChokeRelative?: eml.LengthPerLengthMeasure;
  /** The size of the choke. This characterizes the overall unit with respect to the flow restriction between the ports. The restriction might be implemented using a valve or an actual choke. */
  ChokeSize?: eml.LengthMeasure;
  /** A port on the other end of an internal connection. This should always be specified if a product flow network is being referenced by this report. If this is not specified then there is an assumption that there is only one other port for the unit. For example, if this end of the connection represents an inlet port then the implied other end is the outlet port for the unit. */
  PortReference?: eml.String64;
  /** The differential pressure between the ports. */
  PresDiff?: eml.PressureMeasure;
  /** The differential temperature between the ports. */
  TempDiff?: eml.ThermodynamicTemperatureMeasure;
}
export interface ProductVolumePortDifference
  extends _ProductVolumePortDifference {}

/** Product Volume Product Schema. */
interface _ProductVolumeProduct extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The relative amount of a component product in the product stream. */
  ComponentContent?: ProductVolumeComponentContent[];
  /** The type of product that is being reported. */
  Kind: ReportingProduct;
  /** The weight fraction of the product. */
  MassFraction?: eml.MassPerMassMeasure;
  /** The mole fraction of the product. */
  MoleFraction?: eml.AmountOfSubstancePerAmountOfSubstanceMeasure;
  /** The name of product that is being reported. This is reserved for generic kinds like chemical. */
  Name?: eml.NameStruct;
  /** Product amounts for a specific period. */
  Period: ProductVolumePeriod[];
  Properties?: CommonPropertiesProductVolume;
  SourceFlow?: AbstractRefProductFlow;
  /** This factor describes the fraction of fluid in the source flow that is allocated to this product stream. The volumes reported here are derived from the source flow based on this split factor. This should be an allocation flow. */
  SplitFactor?: NonNegativeFraction;
}
export interface ProductVolumeProduct extends _ProductVolumeProduct {}

/** A second facility related to this flow. For a production flow, this would represent a role of 'produced for'. For an import flow, this would represent a role of 'import from'. For an export flow, this would represent a role of 'export to'. */
interface _ProductVolumeRelatedFacility extends BaseType {
  /** A kind of facility where the specific name is not relevant. */
  Kind?: ReportingFacility;
  RelatedFacilityObject?: AbstractRelatedFacilityObject;
}
export interface ProductVolumeRelatedFacility
  extends _ProductVolumeRelatedFacility {}

/** PRSV parameter. */
interface _PrsvParameter extends BaseType {
  /** The fluid component to which this PRSV parameter set applies. */
  fluidComponentReference: eml.String64;
  /** The parameter a1. */
  a1: number;
  /** The parameter a2. */
  a2: number;
  /** The parameter b1. */
  b1: number;
  /** The parameter b2. */
  b2: number;
  /** The parameter c2. */
  c2: number;
}
export interface PrsvParameter extends _PrsvParameter {}

/** Specifies the kinds of pseudo-components. */
export type PseudoComponentKind =
  | "c10"
  | "c11"
  | "c12"
  | "c13"
  | "c14"
  | "c15"
  | "c16"
  | "c17"
  | "c18"
  | "c19"
  | "c20"
  | "c21"
  | "c22"
  | "c23"
  | "c24"
  | "c25"
  | "c26"
  | "c27"
  | "c28"
  | "c29"
  | "c2-c4+n2"
  | "c30"
  | "c31"
  | "c32"
  | "c33"
  | "c34"
  | "c35"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "c9"
  | "rsh";
interface _PseudoComponentKind extends eml._TypeEnum {
  _: PseudoComponentKind;
}

/** Use to create user-defined pseudo-component enumerations. */
export type PseudoComponentKindExt = string;
type _PseudoComponentKindExt = Primitive._string;

/** Pseudo fluid component. */
interface _PseudoFluidComponent extends _AbstractFluidComponent {
  /** The average boiling point measure. */
  AvgBoilingPoint?: eml.ThermodynamicTemperatureMeasure;
  /** The average fluid density. */
  AvgDensity?: eml.MassPerVolumeMeasure;
  /** Average molecular weight. */
  AvgMolecularWeight?: eml.MolecularWeightMeasure;
  /** The ending boiling point measure. */
  EndingBoilingPoint?: eml.ThermodynamicTemperatureMeasure;
  /** The ending / largest carbon number. */
  EndingCarbonNumber?: eml.NonNegativeLong;
  /** The type from pseudo component enumeration. */
  Kind: PseudoComponentKindExt;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The fluid specific gravity. */
  SpecificGravity?: number;
  /** The starting boiling point measure. */
  StartingBoilingPoint?: eml.ThermodynamicTemperatureMeasure;
  /** The starting / smalestl carbon number. */
  StartingCarbonNumber?: eml.NonNegativeLong;
}
export interface PseudoFluidComponent extends _PseudoFluidComponent {}

/** Recurring enum used to list all the transforms which have been included in the pseudo pressure transform. If "Other" is selected, a comment should be used to explain. */
export type PseudoPressureEffectApplied =
  | "gas properties with pressure"
  | "multiphase flow properties with pressure"
  | "other"
  | "variable desorption with pressure"
  | "variable poroperm with pressure";
interface _PseudoPressureEffectApplied extends eml._TypeEnum {
  _: PseudoPressureEffectApplied;
}

/** Contains the input and output (simulated) data needed for analysis of pressure (PTA) (ie where flowrate is the boundary condition). Can contain log log plots of the data. Can contain Specialized Analyses and their plots of the data.  The Model data itself is contained in the WellboreModel and LayerModel elements of the TestLocationAnalysis. */
interface _PtaAnalysis extends _AbstractAnalysis {
  /** Only required for Impulse type tests: P0 (Pressure at time zero), the instant pressure at the start of the test. */
  InitialPressureP0ForImpulseTest?: eml.PressureMeasure;
  /** The pressure (in a Channel) which is being analysed in this PTA. */
  InputPressure: AbstractPtaPressureData;
  MeasuredLogLogData?: LogLogAnalysis;
  /** Choice between full rate history (time series) and single flowrate and time (Q & tp). */
  RateHistory: AbstractRateHistory;
  SimulatedLogLogData?: LogLogAnalysis;
  /** Reference to the UID of the Output Pressure Data from this Analysis. This will be a simulated response. For Test Design this will be the only pressure time series present. */
  SimulatedPressure?: OutputPressureData;
  /** Optional element to report the addition of gauge drift to the pressure signal for Test Design purposes.  The value is equal to the magnitude of the gauge drift in terms of units of pressure per unit of time, applied across the time duration of this Result. A negative sign means the drift is negative, ie the gauge is drifting to read a less positive value than the correct value as time passes. */
  SimulatedPressureGaugeDrift?: eml.PressurePerTimeMeasure;
  /** Optional element to report the addition of noise to the pressure signal for Test Design purposes.  The value is equal to the magnitude of the random noise added. Ie, if value is "x" then random noise distributed within +/-x has been added. */
  SimulatedPressureGaugeNoise?: eml.PressureMeasure;
  /** Optional element to report the addition of gauge resolution to the pressure signal for Test Design purposes.  The value is equal to the magnitude of the gauge resolution. */
  SimulatedPressureGaugeResolution?: eml.PressureMeasure;
  SpecializedAnalysis?: SpecializedAnalysis[];
}
export interface PtaAnalysis extends _PtaAnalysis {}

/** Superclass defining data acquisition for the flow test, input and pre-processing data. */
interface _PtaDataPreProcess extends eml._AbstractObject {
  /** Type of data conditioning that may describe multiple preprocessing steps */
  DataConditioning?: DataConditioningExt[];
  /** Superclass of possible flow test activities: drill stem, production transient, interwell, and others. */
  FlowTestActivity: eml.DataObjectReference;
  /** A reference, using uid, to the Flow Test Measurement Set within the Flow Test Activity data-object containing the measurement data which this PreProcess applies to. */
  FlowTestMeasurementSetRef?: eml.String64;
  /** One or more input channels being pre-processed in this PreProcess. */
  InputData: AbstractFlowTestData[];
  /** The data (in a Channel) which is the output of this PreProcess. */
  PreProcessedData: AbstractFlowTestData;
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
}
export interface PtaDataPreProcess extends _PtaDataPreProcess {}

/** Superclass of deconvolution pressure and flowrate measurements, test and method information. */
interface _PtaDeconvolution extends eml._AbstractObject {
  DeconvolutionOutput: AbstractDeconvolutionOutput[];
  FlowTestActivity: eml.DataObjectReference;
  /** A reference, using uid, to the Flow Test Measurement Set within the Flow Test Activity data-object containing the measurement data which this Deconvolution applies to. */
  FlowTestMeasurementSetRef?: eml.String64;
  /** Reference to the test periods which are included in the input to the deconvolution. */
  FlowTestPeriodRef?: eml.String64[];
  /** The initial reservoir pressure. Note that this may be in input to, or output from, the deconvolution algorithm. */
  InitialPressure: eml.PressureMeasure;
  /** The flow data (in a Channel) which is being deconvolved in this Deconvolution. */
  InputFlowrate: AbstractPtaFlowData;
  /** The pressure data (in a Channel) which is being deconvolved in this Deconvolution. */
  InputPressure: AbstractPtaPressureData;
  /** The name of the method for this deconvolution. */
  MethodName: eml.String2000;
  /** The reconstructed flow rate data (in a Channel) which is the output of this Deconvolution. */
  ReconstructedFlowrate?: DeconvolvedFlowData;
  /** The reconstructed pressure data (in a Channel) which is the output of this Deconvolution. */
  ReconstructedPressure?: DeconvolvedPressureData;
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
}
export interface PtaDeconvolution extends _PtaDeconvolution {}

/** Specifies the kinds of pure components. */
export type PureComponentKind =
  | "1-2-4-trimethylbenzene"
  | "2-dimethylbutane"
  | "3-dimethylbutane"
  | "ar"
  | "c1"
  | "c2"
  | "c3"
  | "co2"
  | "cos"
  | "h2"
  | "h2o"
  | "h2s"
  | "he"
  | "hg"
  | "i-c4"
  | "i-c5"
  | "n2"
  | "n-c10"
  | "n-c4"
  | "n-c5"
  | "n-c6"
  | "n-c7"
  | "n-c8"
  | "n-c9"
  | "neo-c5"
  | "ra"
  | "benzene"
  | "2-methylpentane"
  | "3-methylpentane"
  | "2-methylhexane"
  | "3-methylhexane"
  | "2-methylheptane"
  | "3-methylheptane"
  | "cyclohexane"
  | "ethylbenzene"
  | "ethylcyclohexane"
  | "methylcyclohexane"
  | "methylcyclopentane"
  | "toluene"
  | "m-xylene"
  | "o-xylene"
  | "p-xylene";
interface _PureComponentKind extends eml._TypeEnum {
  _: PureComponentKind;
}

/** Use to create user-defined pure component enumerations. */
export type PureComponentKindExt = string;
type _PureComponentKindExt = Primitive._string;

/** Pure fluid component. */
interface _PureFluidComponent extends _AbstractFluidComponent {
  /** Yes/no  flag indicates if hydrocarbon or not. */
  HydrocarbonFlag: boolean;
  /** The type of component. */
  Kind: PureComponentKindExt;
  /** The molecular weight of the pure component. */
  MolecularWeight?: eml.MolecularWeightMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface PureFluidComponent extends _PureFluidComponent {}

/** PVT model parameter. */
interface _PvtModelParameter extends eml._AbstractMeasure {
  /** The kind of model parameter. Extensible enum.  See PVT model parameter kind ext. */
  kind: PvtModelParameterKindExt;
  /** The  user-defined name of a parameter, which can be added to any model. */
  name?: eml.String64;
}
export interface PvtModelParameter extends _PvtModelParameter {}

/** Specifies the kinds of PVT model parameters. */
export type PvtModelParameterKind =
  | "b0"
  | "b1"
  | "b2"
  | "c1"
  | "c2"
  | "d1"
  | "d2"
  | "e1"
  | "e2"
  | "f1"
  | "f2"
  | "g1"
  | "g2"
  | "h1"
  | "h2"
  | "a0"
  | "a1"
  | "a2"
  | "a3"
  | "a4"
  | "a5"
  | "a6"
  | "a7"
  | "a8"
  | "a9"
  | "a10"
  | "c0"
  | "d0"
  | "e0"
  | "f0"
  | "g0"
  | "h0";
interface _PvtModelParameterKind extends eml._TypeEnum {
  _: PvtModelParameterKind;
}

/** PVT model parameter enumeration extension. */
export type PvtModelParameterKindExt = string;
type _PvtModelParameterKindExt = Primitive._string;

/** A collection of parameters. */
interface _PvtModelParameterSet extends BaseType {
  Coefficient: PvtModelParameter[];
}
export interface PvtModelParameterSet extends _PvtModelParameterSet {}

interface _Qualifier extends _ExpectedFlowQualifier {
  /** The expected kind of qualifier of the property. This element should only be specified for properties that do not represent the fluid stream (e.g., a valve status). */
  Qualifier?: FlowQualifier[];
}
export interface Qualifier extends _Qualifier {}

/** Specifies the available methods for deriving a quantity or volume. */
export type QuantityMethod =
  | "allocated"
  | "allowed"
  | "estimated"
  | "target"
  | "measured"
  | "budget"
  | "constraint"
  | "forecast";
interface _QuantityMethod extends eml._TypeEnum {
  _: QuantityMethod;
}

export type QuantityMethodExt = string;
type _QuantityMethodExt = Primitive._string;

/** Radial Composite reservoir model, in which the wellbore is at the center of a circular homogeneous zone, communicating with an infinite homogeneous reservoir. The inner and outer zones have different reservoir and/or fluid characteristics. There is no pressure loss at the interface between the two zones. */
interface _RadialCompositeModel extends _ReservoirBaseModel {
  DistanceToMobilityInterface: DistanceToMobilityInterface;
  InnerToOuterZoneDiffusivityRatio: InnerToOuterZoneDiffusivityRatio;
  InnerToOuterZoneMobilityRatio: InnerToOuterZoneMobilityRatio;
}
export interface RadialCompositeModel extends _RadialCompositeModel {}

/** For any transient test, the estimated radius of investigation of the test. */
interface _RadiusOfInvestigation extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface RadiusOfInvestigation extends _RadiusOfInvestigation {}

/** Value characterizing the rate at which an apparent skin effect, due to additional pressure drop, due to turbulent flow, grows as a function of flowrate.  The additional flowrate-dependent Skin is this value D * Flowrate. The total measured Skin factor would then be S + DQ, where Q is the flowrate. */
interface _RateDependentSkinFactor extends _AbstractParameter {
  Abbreviation: eml.String64;
  InverseFlowrate: eml.TimePerVolumeMeasureExt;
}
export interface RateDependentSkinFactor extends _RateDependentSkinFactor {}

/** The ratio of the DeltaPressureTotalSkin to the total drawdown pressure. Indicates the fraction of the total pressure drawdown due to completion effects such as convergence, damage, etc.  The remaining pressure drop is due to radial flow in the reservoir. */
interface _RatioDpSkinToTotalDrawdown extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface RatioDpSkinToTotalDrawdown
  extends _RatioDpSkinToTotalDrawdown {}

/** In models in which the wellbore storage coefficient changes, the ratio of intial to final wellbore storage coefficients. */
interface _RatioInitialToFinalWellboreStorage extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface RatioInitialToFinalWellboreStorage
  extends _RatioInitialToFinalWellboreStorage {}

/** In a two-layer model, the ratio of layer 1 to the total PermeabilityThickness. */
interface _RatioLayer1ToTotalPermeabilityThicknessProduct
  extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface RatioLayer1ToTotalPermeabilityThicknessProduct
  extends _RatioLayer1ToTotalPermeabilityThicknessProduct {}

/** Specifies the reasons for lost production. */
export type ReasonLost =
  | "3rd party processing"
  | "daily total loss of prod"
  | "extended maint turnaround"
  | "extended maint turnaround export"
  | "hse"
  | "marked gas"
  | "marked oil"
  | "modification project"
  | "operation mistakes"
  | "other"
  | "planned maint turnaround"
  | "preventive maint topside"
  | "process and operation problem"
  | "production"
  | "regulatory reference"
  | "reservoir"
  | "strike/lock-out"
  | "testing and logging"
  | "topside equipment failure-maint"
  | "unavailable tanker storage"
  | "unknown"
  | "weather problem"
  | "well equipment failure-maint"
  | "well planned operations"
  | "well preventive maint"
  | "well problems";
interface _ReasonLost extends eml._TypeEnum {
  _: ReasonLost;
}

/** For a fluid sample that has been recombined from separate samples, each sample has its fraction recorded in this class and the source sample is referenced. E.g., a fraction and reference to an oil sample and a second instance with fraction and reference to gas sample. */
interface _RecombinedSampleFraction extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The fluid sample. */
  FluidSample?: eml.DataObjectReference;
  /** The mass fraction of this parent sample within this combined sample. */
  MassFraction?: eml.MassPerMassMeasure;
  /** The mole fraction of this parent sample within this combined sample. */
  MoleFraction?: eml.AmountOfSubstancePerAmountOfSubstanceMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The volume fraction of this parent sample within this combined sample. */
  VolumeFraction?: eml.VolumePerVolumeMeasure;
}
export interface RecombinedSampleFraction extends _RecombinedSampleFraction {}

/** Reference flow. */
interface _ReferenceFlow extends _AbstractRefProductFlow {
  /** A pointer to the flow within the facility. */
  FlowReference: eml.String64;
}
export interface ReferenceFlow extends _ReferenceFlow {}

/** Reference to the separator stage. */
interface _ReferenceSeparatorStage extends BaseType {
  /** The separator number for a separator stage used to define the separation train, which is used as the basis of this fluid characterization. */
  SeparatorNumber?: eml.NonNegativeLong;
  /** The separator pressure for a separator stage used to define the separation train, which is used as the basis of this fluid characterization. */
  SeparatorPressure?: eml.AbstractPressureValue;
  /** The separator temperature for a separator stage used to define the separation train, which is used as the basis of this fluid characterization. */
  SeparatorTemperature?: eml.ThermodynamicTemperatureMeasureExt;
}
export interface ReferenceSeparatorStage extends _ReferenceSeparatorStage {}

/** A reference to the particular gas quantity injected, using a uid which refers to an Injected Gas, and the quantity as a molar ratio injected. */
interface _RefInjectedGasAdded extends BaseType {
  /** Reference by uid to the Injection Gas used for this quantity of injected gas. */
  injectionGasReference: eml.String64;
  AmountOfSubstancePerAmountOfSubstanceMeasure: eml.AmountOfSubstancePerAmountOfSubstanceMeasure;
}
export interface RefInjectedGasAdded extends _RefInjectedGasAdded {}

/** In a Linear Composite model where the thickness of the inner and outer zones is different, the thickness h of the outer region (2). */
interface _Region2Thickness extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface Region2Thickness extends _Region2Thickness {}

/** Relative xyz location offset */
interface _RelativeCoordinate extends BaseType {
  /** Defines the relative from-left-to-right location on a display screen. The display origin (0,0) is the upper left-hand corner of the display as viewed by the user. */
  X?: eml.LengthPerLengthMeasure;
  /** Defines the relative from-top-to-bottom location on a display screen. The display origin (0,0) is the upper left-hand corner of the display as viewed by the user. */
  Y?: eml.LengthPerLengthMeasure;
  /** Defines the relative from-front-to-back location in a 3D system. The unrotated display origin (0,0) is the upper left-hand corner of the display as viewed by the user. The "3D picture" may be rotated on the 2D display. */
  Z?: eml.LengthPerLengthMeasure;
}
export interface RelativeCoordinate extends _RelativeCoordinate {}

/** Contains a relative volume (ie volume/reference volume), and the identity of the reference volume and/or volume measurement conditions, by means of a uid. This uid will correspond to the uid of the appropriate Fluid Volume Reference. */
interface _RelativeVolumeRatio extends BaseType {
  /** Reference to a fluid volume. */
  fluidVolumeReference: eml.String64;
  VolumePerVolumeMeasure: eml.VolumePerVolumeMeasure;
}
export interface RelativeVolumeRatio extends _RelativeVolumeRatio {}

/** Report. */
interface _Report extends eml._AbstractObject {
  /** The date that the report was approved. */
  ApprovalDate?: Date;
  Approver?: eml.DataObjectReference;
  /** A textual comment about the report. */
  Comment?: eml.String2000;
  /** The name and type of a facility whose context is relevant to the represented installation. */
  ContextFacility?: FacilityIdentifierStruct[];
  /** The date that the report represents (i.e., not a year or month). Only one of date, month or year should be specified. */
  Date?: Date;
  /** The ending date that the report represents, if it represents an interval. */
  DateEnd?: Date;
  /** A geographic context of a report. */
  GeographicContext?: GeographicContext;
  /** The name of the facility which is represented by this report. The name can be qualified by a naming system. This also defines the kind of facility. */
  Installation?: FacilityIdentifierStruct;
  /** The date that the report was issued. */
  IssueDate?: Date;
  IssuedBy?: eml.DataObjectReference;
  /** The type of report. This should define and constrain the expected content of the report. */
  Kind?: eml.String64;
  /** The month that the report represents (i.e., not a year, date or date range). Only one of date, month or year should be specified. */
  Month?: CalendarMonth;
  Operator?: eml.DataObjectReference;
  /** The current document version status. */
  ReportStatus?: ReportVersionStatus;
  /** The current report version. */
  ReportVersion?: eml.String64;
  /** The year that the report represents (i.e., not a month, date or date range). Only one of date, month or year should be specified. */
  Year?: CalendarYear;
}
export interface Report extends _Report {}

/** Specifies the time periods for a report. */
export type ReportingDurationKind =
  | "day"
  | "life to date"
  | "month"
  | "month to date"
  | "total cumulative"
  | "week"
  | "year"
  | "year to date";
interface _ReportingDurationKind extends eml._TypeEnum {
  _: ReportingDurationKind;
}

export type ReportingDurationKindExt = string;
type _ReportingDurationKindExt = Primitive._string;

/** Reporting Entity: The top-level entity in hierarchy structure. */
interface _ReportingEntity extends eml._AbstractObject {
  /** If the Reporting Entity is a facility, then this element can be used to include that Facility object.  In later versions of PRODML, this may be extended to a full description.  Currently it is restricted to having a type. */
  AssociatedFacility?: eml.DataObjectReference;
  /** If the Reporting Entity is a subsurface entity such as well, wellbore, well completion, wellbore completion, contact interval or rock-fluid unit feature which can be described with a specific Energistics object, then this element can be used to reference that object.  This uses a Data Object reference. */
  AssociatedObject?: eml.DataObjectReference;
  /** The type of reporting entity. */
  Kind: ReportingEntityKind;
}
export interface ReportingEntity extends _ReportingEntity {}

/** Specifies the kinds of entities (usage of equipment or material) that can be reported on. */
export type ReportingEntityKind =
  | "business unit"
  | "fpso"
  | "well completion"
  | "wellbore completion"
  | "commercial entity"
  | "company"
  | "contact interval"
  | "country"
  | "county"
  | "facility"
  | "field"
  | "field - part"
  | "flow meter"
  | "formation"
  | "gas plant"
  | "lease"
  | "license"
  | "pipeline"
  | "platform"
  | "production processing facility"
  | "reservoir"
  | "rock-fluid unit feature"
  | "state"
  | "tank"
  | "terminal"
  | "well"
  | "well group"
  | "wellbore"
  | "oil tanker"
  | "tanker truck";
interface _ReportingEntityKind extends eml._TypeEnum {
  _: ReportingEntityKind;
}

/** Contains all the volumes for a single reporting entity. It contains a reference back to the reporting entity using its UUID for reference. */
interface _ReportingEntityVolumes extends BaseType {
  ClosingInventory?: AbstractProductQuantity[];
  /** Information about the event or incident that caused production to be deferred. */
  DeferredProductionEvent?: DeferredProductionEvent[];
  Disposition?: AbstractDisposition[];
  /** the duration of volume produced at facility */
  Duration?: eml.TimeMeasure;
  /** Volume injected per reporting entity. */
  Injection?: Injection[];
  OpeningInventory?: AbstractProductQuantity[];
  /** Product volume that is produce from a reporting entity. */
  Production?: Production[];
  /** Reporting Entity: The top-level entity in hierarchy structure. */
  ReportingEntity: eml.DataObjectReference;
  /** The starting date of the month. */
  StartDate?: eml.TimeStamp;
}
export interface ReportingEntityVolumes extends _ReportingEntityVolumes {}

/** Specifies the kinds of facilities (usage of equipment or material) that can be reported on. */
export type ReportingFacility =
  | "block valve"
  | "bottomhole"
  | "casing"
  | "choke"
  | "cluster"
  | "commercial entity"
  | "company"
  | "completion"
  | "compressor"
  | "controller"
  | "controller -- lift"
  | "country"
  | "county"
  | "downhole monitoring system"
  | "electric submersible pump"
  | "field"
  | "field - area"
  | "field - group"
  | "field - part"
  | "flow meter"
  | "flowline"
  | "formation"
  | "gas lift valve mandrel"
  | "generator"
  | "installation"
  | "lease"
  | "license"
  | "manifold"
  | "organizational unit"
  | "packer"
  | "perforated interval"
  | "pipeline"
  | "plant - processing"
  | "platform"
  | "pressure meter"
  | "processing facility"
  | "production tubing"
  | "pump"
  | "rectifier"
  | "regulating valve"
  | "remote terminal unit"
  | "reservoir"
  | "separator"
  | "sleeve valve"
  | "state"
  | "storage"
  | "tank"
  | "temperature meter"
  | "template"
  | "terminal"
  | "trap"
  | "trunkline"
  | "tubing head"
  | "turbine"
  | "unknown"
  | "well"
  | "well group"
  | "wellbore"
  | "wellhead"
  | "zone";
interface _ReportingFacility extends eml._TypeEnum {
  _: ReportingFacility;
}

/** This is an extension of the reporting facility enumeration. */
export type ReportingFacilityExt = string;
type _ReportingFacilityExt = Primitive._string;

/** Specifies the types of flow for volume reports. */
export type ReportingFlow =
  | "consume"
  | "consume - black start"
  | "consume - compressor"
  | "consume - emitted"
  | "consume - flare"
  | "consume - fuel"
  | "consume - HP flare"
  | "consume - LP flare"
  | "consume - non compressor"
  | "consume - venting"
  | "disposal"
  | "export"
  | "export - nominated"
  | "export - requested"
  | "export - shortfall"
  | "gas lift"
  | "hydrocarbon accounting"
  | "import"
  | "injection"
  | "inventory"
  | "overboard"
  | "production"
  | "sale"
  | "storage"
  | "unknown";
interface _ReportingFlow extends eml._TypeEnum {
  _: ReportingFlow;
}

/** The hierarchy structure that elements refer to in the asset registry. */
interface _ReportingHierarchy extends eml._AbstractObject {
  ReportingNode: ReportingHierarchyNode[];
}
export interface ReportingHierarchy extends _ReportingHierarchy {}

/** Association that contains the parent and child of this node. */
interface _ReportingHierarchyNode extends BaseType {
  /** The identification of node. */
  id: eml.String64;
  /** The entity name. */
  name: eml.String64;
  ChildNode?: ReportingHierarchyNode[];
  ReportingEntity?: eml.DataObjectReference;
}
export interface ReportingHierarchyNode extends _ReportingHierarchyNode {}

/** Specifies the kinds of product in a fluid system. */
export type ReportingProduct =
  | "aqueous"
  | "c10"
  | "c10-"
  | "c10+"
  | "c2-"
  | "c2+"
  | "c3-"
  | "c3+"
  | "c4-"
  | "c4+"
  | "c5-"
  | "c5+"
  | "c6-"
  | "c6+"
  | "c7"
  | "c7-"
  | "c7+"
  | "c8"
  | "c8-"
  | "c8+"
  | "c9"
  | "c9-"
  | "c9+"
  | "carbon dioxide gas"
  | "carbon monoxide gas"
  | "chemical"
  | "condensate"
  | "condensate - gross"
  | "condensate - net"
  | "crude - stabilized"
  | "cuttings"
  | "diesel"
  | "diethylene glycol"
  | "dioxygen"
  | "electric power"
  | "ethane"
  | "ethane - component"
  | "gas"
  | "gas - component in oil"
  | "gas - dry"
  | "gas - rich"
  | "gas - wet"
  | "helium gas"
  | "heptane"
  | "hydraulic control fluid"
  | "hydrogen gas"
  | "hydrogen sulfide"
  | "i-butane - component"
  | "isobutane"
  | "isopentane"
  | "liquefied natural gas"
  | "liquefied petroleum gas"
  | "liquid"
  | "methane"
  | "methane - component"
  | "methanol"
  | "mixed butane"
  | "monoethylene glycol"
  | "naphtha"
  | "natural gas liquid"
  | "n-butane - component"
  | "neopentane"
  | "NGL - component in gas"
  | "nitrogen gas"
  | "nitrogen oxide gas"
  | "normal butane"
  | "normal pentane"
  | "oil"
  | "oil - component in water"
  | "oil - gross"
  | "oil - net"
  | "oil and gas"
  | "oleic"
  | "pentane - component"
  | "petroleum gas liquid"
  | "propane"
  | "propane - component"
  | "salt"
  | "sand - component"
  | "triethylene glycol"
  | "unknown"
  | "vapor"
  | "water"
  | "water - discharge"
  | "water - processed";
interface _ReportingProduct extends eml._TypeEnum {
  _: ReportingProduct;
}

/** Report location. Informaiton about a network location (e.g., URL) where the report is stored. */
interface _ReportLocation extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The location of the report, e.g., a path or URL. */
  Location?: eml.String2000;
  /** The date when this report was stored in this location. */
  LocationDate?: Date;
  /** The type of location in which the report is to be located. */
  LocationType?: eml.String64;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface ReportLocation extends _ReportLocation {}

/** Specifies the statuses of a version of a report. */
export type ReportVersionStatus = "final" | "preliminary";
interface _ReportVersionStatus extends eml._TypeEnum {
  _: ReportVersionStatus;
}

/** Abstract reservoir model from which the other types are derived. */
interface _ReservoirBaseModel extends _AbstractModelSection {
  AveragePressure?: AveragePressure;
  HorizontalAnisotropyKxToKy?: HorizontalAnisotropyKxToKy;
  HorizontalRadialPermeability: HorizontalRadialPermeability;
  InitialPressure: InitialPressure;
  LowerBoundaryType?: LowerBoundaryType;
  OrientationOfAnisotropyXDirection?: OrientationOfAnisotropyXDirection;
  PermeabilityThicknessProduct: PermeabilityThicknessProduct;
  Porosity: Porosity;
  PressureDatumTVD?: PressureDatumTVD;
  TotalThickness: TotalThickness;
  UpperBoundaryType?: UpperBoundaryType;
  VerticalAnisotropyKvToKr?: VerticalAnisotropyKvToKr;
}
export interface ReservoirBaseModel extends _ReservoirBaseModel {}

/** Specifies the kinds of reservoir hydrocarbon fluid, in broad terms, by their phase behavior. */
export type ReservoirFluidKind =
  | "black oil"
  | "critical or near critical"
  | "dry gas"
  | "heavy oil"
  | "wet gas or condensate"
  | "volatile oil"
  | "unknown";
interface _ReservoirFluidKind extends eml._TypeEnum {
  _: ReservoirFluidKind;
}

/** Specifies the states of the reservoir lifecycle. */
export type ReservoirLifeCycleState =
  | "abandoned"
  | "primary production"
  | "prospect"
  | "tertiary production"
  | "undeveloped"
  | "secondary recovery";
interface _ReservoirLifeCycleState extends eml._TypeEnum {
  _: ReservoirLifeCycleState;
}

/** Enables a zone within the reservoir model to be defined. This will have local properties which may vary from the rest of the reservoir model.  The zone is bounded by a polygon comprising a number of 2D points. It is left to the software application to verify these comprise a closed polygon, within which the zone properties apply. */
interface _ReservoirZoneSubModel extends BaseType {
  /** The zone is bounded by a polygon comprising a number of 2D points, each one is represented by this 2D coordinate pair. */
  BoundingPolygonPoint: LocationIn2D[];
  /** Horizontal Permeability within this zone. Note that this value should be used to represent any mobility changes in the zone, which may be due to effective permeability and viscosity changeds, eg for the inner region of an injection well.  If absent, the zone is assumed to have the same property as the overall reservoir model. */
  Permeability?: HorizontalRadialPermeability;
  /** Porosity within this zone.  If absent, the zone is assumed to have the same property as the overall reservoir model. */
  Porosity?: Porosity;
  /** Thickness within this zone.  If absent, the zone is assumed to have the same property as the overall reservoir model. */
  Thickness?: TotalThickness;
}
export interface ReservoirZoneSubModel extends _ReservoirZoneSubModel {}

/** A reference to a RESQML Model element containing the data relating to the PTA object concerned. */
interface _ResqmlModelRef extends BaseType {
  /** Reference to the RESQML model element which represents this feature. */
  ResqmlModelRef: eml.DataObjectReference;
}
export interface ResqmlModelRef extends _ResqmlModelRef {}

/** Contains the input data needed for analysis of flowrate (RTA) (ie where pressure is the boundary condition). */
interface _RtaAnalysis extends _AbstractAnalysis {
  /** The flow rate (in a Channel) which is being analysed in this RTA. */
  InputFlowrateData: AbstractPtaFlowData;
  /** The pressure (in a Channel) which is being analysed in this RTA. */
  InputPressure: AbstractPtaPressureData;
  MeasuredLogLogData?: LogLogAnalysis;
  /** The simulated flow rate (in a Channel) which is the output of this RTA. */
  SimulatedFlowrate: OutputFlowData;
  SimulatedLogLogData?: LogLogAnalysis;
  SpecializedAnalysis?: SpecializedAnalysis[];
}
export interface RtaAnalysis extends _RtaAnalysis {}

/** A zero-based count of a type of safety item. */
interface _SafetyCount extends eml._PositiveLong {
  /** The type of period being reported by this count. */
  period?: ReportingDurationKind;
  /** The type of safety issue for which a count is being defined. */
  type?: SafetyType;
}
export interface SafetyCount extends _SafetyCount {}

/** Specifies the types of safety issues for which a count can be defined. */
export type SafetyType =
  | "drill or exercise"
  | "fire"
  | "first aid"
  | "hazard report card"
  | "job observation"
  | "lost time accident"
  | "lost time incident"
  | "miscellaneous"
  | "near miss"
  | "permit with SJA"
  | "released to air"
  | "released to water"
  | "restricted work"
  | "safety meeting"
  | "sent ashore"
  | "severe accident"
  | "sick on board"
  | "spill or leak"
  | "total permits"
  | "traffic accident"
  | "year-to-date incidents";
interface _SafetyType extends eml._TypeEnum {
  _: SafetyType;
}

/** Specifies the actions that may be performed to a fluid sample. */
export type SampleAction =
  | "custodyTransfer"
  | "destroyed"
  | "sampleTransfer"
  | "stored"
  | "subSample Dead"
  | "subSample Live";
interface _SampleAction extends eml._TypeEnum {
  _: SampleAction;
}

/** Sample contaminant information. */
interface _SampleContaminant extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The composition of contaminant in the fluid sample. */
  ContaminantComposition?: LiquidComposition;
  /** The kind of contaminant. */
  ContaminantKind: FluidContaminant;
  /** The density of contaminant in the fluid sample. */
  Density?: eml.MassPerVolumeMeasure;
  /** Description of the contaminant. */
  Description?: eml.String2000;
  /** The molecular weight of contaminant in the fluid sample. */
  MolecularWeight?: eml.MolecularWeightMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  SampleOfContaminant?: eml.DataObjectReference;
  /** The volume fraction of contaminant in the fluid sample. */
  VolumeFractionLiveSample?: eml.VolumePerVolumeMeasure;
  /** The contaminant volume percent in stock tank oil. */
  VolumeFractionStockTank?: eml.VolumePerVolumeMeasure;
  /** The weight fraction of contaminant in the fluid sample. */
  WeightFractionLiveSample?: eml.MassPerMassMeasure;
  /** The contaminant weight percent in stock tank oil. */
  WeightFractionStockTank?: eml.MassPerMassMeasure;
}
export interface SampleContaminant extends _SampleContaminant {}

/** Sample integrity and preparation information. */
interface _SampleIntegrityAndPreparation extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The basic sediment and water of the sample when prepared for analysis. */
  BasicSedimentAndWater?: eml.VolumePerVolumeMeasure;
  /** The free water volume of the sample when prepared for analysis. */
  FreeWaterVolume?: eml.VolumeMeasure;
  /** The initial volume of the sample when prepared for analysis. */
  InitialVolume?: eml.VolumeMeasure;
  /** The date when this fluid sample was opened. */
  OpeningDate: Date;
  /** The opening pressure of the sample when prepared for analysis. */
  OpeningPressure?: eml.AbstractPressureValue;
  /** Remarks and comments about the opening of the sample. */
  OpeningRemark?: eml.String2000;
  /** The opening temperature of the sample when prepared for analysis. */
  OpeningTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** Sample restoration. */
  SampleRestoration?: SampleRestoration[];
  /** The saturation (or bubble point) pressure measured in this test. */
  SaturationPressure?: SaturationPressure;
  /** The saturation temperature of the sample when prepared for analysis. */
  SaturationTemperature?: SaturationTemperature;
  /** The water content in hydrocarbon of the sample when prepared for analysis. */
  WaterContentInHydrocarbon?: eml.MassPerMassMeasure;
}
export interface SampleIntegrityAndPreparation
  extends _SampleIntegrityAndPreparation {}

/** Specifies the values for the quality of data. */
export type SampleQuality = "invalid" | "unknown" | "valid";
interface _SampleQuality extends eml._TypeEnum {
  _: SampleQuality;
}

/** For a fluid sample that has been recombined from separate samples, e.g. liquid sample and vapor sample, this class records the specified: recombination conditions, the saturation pressure and  overall recombined sample composition, whichever of these are appropriate for this recombination. */
interface _SampleRecombinationSpecification extends BaseType {
  /** The aim of the fluid sampling recombination was this overall composition. */
  OverallComposition?: OverallComposition;
  /** The recombination gas-oil ratio for this sample recombination. */
  RecombinationGOR?: eml.VolumePerVolumeMeasure;
  /** The recombination pressure for this sample recombination. */
  RecombinationPressure?: eml.AbstractPressureValue;
  /** The recombination saturation pressure for this sample recombination. */
  RecombinationSaturationPressure?: SaturationPressure;
  /** The recombination temperature for this sample recombination. */
  RecombinationTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** Fluid sample points to a mixture from other samples. */
  RecombinedSampleFraction: RecombinedSampleFraction[];
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface SampleRecombinationSpecification
  extends _SampleRecombinationSpecification {}

/** Sample restoration. */
interface _SampleRestoration extends BaseType {
  EndTime?: eml.TimeStamp;
  /** The mixing mechanism when the sample is restored in preparation for analysis. */
  MixingMechanism?: eml.String64;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The restoration pressure when the sample is restored in preparation for analysis. */
  RestorationPressure?: eml.AbstractPressureValue;
  /** The restoration temperature when the sample is restored in preparation for analysis. */
  RestorationTemperature?: eml.ThermodynamicTemperatureMeasure;
  StartTime?: eml.TimeStamp;
}
export interface SampleRestoration extends _SampleRestoration {}

/** SARA analysis results. SARA stands for saturates, asphaltenes, resins and aromatics. */
interface _Sara extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The aromatics weight fraction in the sample. */
  AromaticsWeightFraction?: eml.MassPerMassMeasure;
  /** The asphaltenes weight fraction in the sample. */
  AsphaltenesWeightFraction?: eml.MassPerMassMeasure;
  /** The napthenes weight fraction in the sample. */
  NapthenesWeightFraction?: eml.MassPerMassMeasure;
  /** The paraffins weight fraction in the sample. */
  ParaffinsWeightFraction?: eml.MassPerMassMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface Sara extends _Sara {}

/** Specifies the kinds of saturation. */
export type SaturationKind = "saturated" | "undersaturated";
interface _SaturationKind extends eml._TypeEnum {
  _: SaturationKind;
}

/** Specifies the kinds of saturation points. */
export type SaturationPointKind =
  | "bubble point"
  | "dew point"
  | "retrograde dew point"
  | "critical point";
interface _SaturationPointKind extends eml._TypeEnum {
  _: SaturationPointKind;
}

/** Saturation pressure. */
interface _SaturationPressure extends BaseType {
  /** The kind of saturation point whose pressure is being measured. Enum. See saturationpointkind. */
  kind: SaturationPointKind;
  PressureMeasureExt: eml.PressureMeasureExt;
}
export interface SaturationPressure extends _SaturationPressure {}

/** Saturation temperature. */
interface _SaturationTemperature extends BaseType {
  /** The kind of saturation point whose temperature is being measured. Enum. See saturationpointkind. */
  kind: SaturationPointKind;
  ThermodynamicTemperatureMeasure: eml.ThermodynamicTemperatureMeasure;
}
export interface SaturationTemperature extends _SaturationTemperature {}

/** Saturation test. */
interface _SaturationTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The saturation (or bubble point) pressure measured in this test. */
  SaturationPressure: SaturationPressure;
  /** A number for this test for purposes of, e.g., tracking lab sequence. */
  TestNumber: eml.NonNegativeLong;
  /** The temperature of this test. */
  TestTemperature: eml.ThermodynamicTemperatureMeasure;
}
export interface SaturationTest extends _SaturationTest {}

/** Separator conditions. */
interface _SeparatorConditions extends BaseType {
  /** Reference to a separator test element, which contains the separator conditions (stages) which apply to this test. */
  separatorTestReference?: eml.String64;
}
export interface SeparatorConditions extends _SeparatorConditions {}

/** Additonal information required from a fluid sample taken from a separator. */
interface _SeparatorSampleAcquisition extends _FluidSampleAcquisition {
  /** The corrected gas rate for this separator sample acquisition. */
  CorrectedGasRate?: eml.VolumePerTimeMeasure;
  /** The corrected oil rate for this separator sample acquisition. */
  CorrectedOilRate?: eml.VolumePerTimeMeasure;
  /** The corrected water rate for this separator sample acquisition. */
  CorrectedWaterRate?: eml.VolumePerTimeMeasure;
  FlowTestActivity?: eml.DataObjectReference;
  /** The measured gas rate for this separator sample acquisition. */
  MeasuredGasRate?: eml.VolumePerTimeMeasure;
  /** The measured oil rate for this separator sample acquisition. */
  MeasuredOilRate?: eml.VolumePerTimeMeasure;
  /** The measured water rate for this separator sample acquisition. */
  MeasuredWaterRate?: eml.VolumePerTimeMeasure;
  /** A reference to the flow port in the facility where this sample was taken. */
  SamplingPoint?: eml.String64;
  /** A reference to the separator where this sample was taken. */
  Separator: eml.String64;
  /** The separator pressure when this sample was taken. */
  SeparatorPressure: eml.AbstractPressureValue;
  /** The separator temperature when this sample was taken. */
  SeparatorTemperature: eml.ThermodynamicTemperatureMeasure;
  /** A reference to a well completion (WITSML data object) where this sample was taken. */
  WellCompletion?: eml.DataObjectReference;
}
export interface SeparatorSampleAcquisition
  extends _SeparatorSampleAcquisition {}

/** Service fluid (e.g., biocides, lubricants, etc.) being reported on. */
interface _ServiceFluid extends _AbstractProductQuantity {
  /** String ID that points to a service fluid in the FluidComponentSet. */
  serviceFluidReference?: eml.String64;
  /** Indicates the kind of service fluid. See enum ServiceFluidKind (in ProdmlCommon). */
  ServiceFluidKind: ServiceFluidKindExt;
}
export interface ServiceFluid extends _ServiceFluid {}

/** Specifies the kinds of product in a fluid system. */
export type ServiceFluidKind =
  | "alkaline solutions"
  | "biocide"
  | "carbon dioxide"
  | "carbon monoxide"
  | "corrosion inhibitor"
  | "demulsifier"
  | "diesel"
  | "diethylene glycol"
  | "dispersant"
  | "drag reducing agent"
  | "emulsifier"
  | "flocculant"
  | "hydraulic control fluid"
  | "isopropanol"
  | "lubricant"
  | "methanol"
  | "monoethylene glycol"
  | "oil"
  | "other chemical"
  | "other hydrate inhibitor"
  | "polymer"
  | "scale inhibitor"
  | "solvent"
  | "stabilizing agent"
  | "surfactant"
  | "thinner"
  | "triethylene glycol";
interface _ServiceFluidKind extends eml._TypeEnum {
  _: ServiceFluidKind;
}

/** Use to add user-defined extensions to service fluid kind. */
export type ServiceFluidKindExt = string;
type _ServiceFluidKindExt = Primitive._string;

/** For a Boundary model which has an arbitrary number, orientation and type of external boundaries, this is the model sub class which describes each boundary. There will be as many instances of this as there are boundaries.  This is expected to be a numerical model. The other, regular geometries of boundaries may well be represented by analytical models. */
interface _SingleBoundarySubModel extends BaseType {
  /** The reference to a RESQML model representation of this fault. */
  FaultRefID: ResqmlModelRef;
  /** In any bounded reservoir model, the type of Boundary 1. Enumeration with choice of "no-flow" or "constant pressure". */
  TypeOfBoundary: Boundary1Type;
}
export interface SingleBoundarySubModel extends _SingleBoundarySubModel {}

/** Single fault boundary model. A single linear boundary runs along one side of the reservoir. */
interface _SingleFaultModel extends _BoundaryBaseModel {
  Boundary1Type: Boundary1Type;
  DistanceToBoundary1: DistanceToBoundary1;
  OrientationOfNormalToBoundary1?: OrientationOfNormalToBoundary1;
}
export interface SingleFaultModel extends _SingleFaultModel {}

/** Contains the data for a simple representation of flowrate comprising a single rate and a flowing time. */
interface _SingleFlowrateData extends _AbstractRateHistory {
  /** If a single flowrate and effective producing time was used, this is the effective producing time used in the analysis. Usually abbreviated Tpeff. */
  EffectiveProducingTimeUsed: eml.TimeMeasure;
  /** If a single flowrate and effective producing time was used, this is the single flowrate value used in the analysis. */
  SingleFlowrate: eml.VolumePerTimeMeasure;
}
export interface SingleFlowrateData extends _SingleFlowrateData {}

/** For a Horizontal Wellbore Multiple Variable Fractured Model, this is the model sub class which describes each fracture. There will be as many instances of this as there are fractures. This is expected to be a numerical model. */
interface _SingleFractureSubModel extends BaseType {
  /** For a hydraulic fracture, the distance between the mid-height level of the fracture and the lower boundary of the layer. */
  DistanceMidFractureHeightToBottomBoundary?: DistanceMidFractureHeightToBottomBoundary;
  /** For an induced hydraulic fracture, the conductivity of the fracture, equal to Fracture Width * Fracture Permeability */
  FractureConductivity?: FractureConductivity;
  /** Dimensionless value, characterizing the restriction to flow (+ve value, damage) or additional capacity for flow (-ve value, eg acidized) due to effective permeability across the face of a hydraulic fracture, ie controlling flow from reservoir into fracture. This value is stated with respect to radial flow using the full reservoir thickness (h), ie the radial flow or middle time region of a pressure transient. It therefore can be added, in a fractured well, to "ConvergenceSkinRelativeToTotalThickness" skin to yield  "SkinRelativeToTotalThickness". */
  FractureFaceSkin?: FractureFaceSkin;
  /** In the vertical hydraulic fracture model (where the wellbore is horizontal), the height of the fracture.  In the case of a horizontal wellbore, the fractures are assumed to extend an equal distance above and below the wellbore. */
  FractureHeight: FractureHeight;
  /** For a Horizontal Wellbore Multiple Fractured Model, the model type which applies to this fracture. Enumeration with choices of infinite conductivity, uniform flux, finite conductivity, or compressible fracture finite conductivity. */
  FractureModelType: FractureModelType;
  /** Dimensionless Value characterizing the fraction of the pore volume occupied by the fractures to the total of pore volume of (fractures plus reservoir). */
  FractureStorativityRatio?: FractureStorativityRatio;
  /** The location of the first tip of the fracture in the local CRS. */
  FractureTip1Location: LocationIn2D;
  /** The location of the second tip of the fracture (opposite side of the wellbore to the first) in the local CRS. */
  FractureTip2Location: LocationIn2D;
}
export interface SingleFractureSubModel extends _SingleFractureSubModel {}

/** In a two-layer model with both layers flowing into the wellbore, the skin factor of the second layer. This value is stated with respect to radial flow using the full layer thickness (h), ie the "reservoir radial flow" or "middle time region" of a pressure transient. */
interface _SkinLayer2RelativeToTotalThickness extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface SkinLayer2RelativeToTotalThickness
  extends _SkinLayer2RelativeToTotalThickness {}

/** Dimensionless value, characterizing the restriction to flow (+ve value) or extra capacity for flow (-ve value) into the wellbore. This value is stated with respect to radial flow using the full layer thickness (h), ie the "reservoir radial flow" or "middle time region" of a pressure transient. It comprises the sum of "MechanicalSkinRelativeToTotalThickness" and  "ConvergenceSkinRelativeToTotalThickness" both of which also are expressed in terms of h. */
interface _SkinRelativeToTotalThickness extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface SkinRelativeToTotalThickness
  extends _SkinRelativeToTotalThickness {}

/** Slanted wellbore model, with full penetrating length of wellbore open to flow. */
interface _SlantedFullyPenetratingModel extends _NearWellboreBaseModel {
  ConvergenceSkinRelativeToTotalThickness?: ConvergenceSkinRelativeToTotalThickness;
  MechanicalSkinRelativeToTotalThickness?: MechanicalSkinRelativeToTotalThickness;
  OrientationWellTrajectory?: OrientationWellTrajectory;
  SkinLayer2RelativeToTotalThickness?: SkinLayer2RelativeToTotalThickness;
  WellboreDeviationAngle: WellboreDeviationAngle;
}
export interface SlantedFullyPenetratingModel
  extends _SlantedFullyPenetratingModel {}

/** Slanted wellbore model, with flowing length of wellbore less than total thickness of reservoir layer (as measured along wellbore). */
interface _SlantedPartiallyPenetratingModel extends _NearWellboreBaseModel {
  ConvergenceSkinRelativeToTotalThickness?: ConvergenceSkinRelativeToTotalThickness;
  DistanceMidPerforationsToBottomBoundary: DistanceMidPerforationsToBottomBoundary;
  MechanicalSkinRelativeToTotalThickness?: MechanicalSkinRelativeToTotalThickness;
  OrientationWellTrajectory?: OrientationWellTrajectory;
  PerforatedLength: PerforatedLength;
  SkinLayer2RelativeToTotalThickness?: SkinLayer2RelativeToTotalThickness;
  WellboreDeviationAngle: WellboreDeviationAngle;
}
export interface SlantedPartiallyPenetratingModel
  extends _SlantedPartiallyPenetratingModel {}

/** Specifications of the slim tube used during a slim-tube test.
 *
 * For definition of a slim tube and slim-tube test, see http://www.glossary.oilfield.slb.com/Terms/s/slim-tube_test.aspx */
interface _SlimTubeSpecification extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The cross section area of the slim tube. */
  CrossSectionArea?: eml.AreaMeasure;
  /** Reference to the gas injected into the slim tube. */
  InjectedGas?: InjectedGas[];
  /** The inner diameter of the slim tube. */
  InnerDiameter?: eml.LengthMeasure;
  /** The length of the slim tube. */
  Length?: eml.LengthMeasure;
  /** The outer diameter of the slim tube. */
  OuterDiameter?: eml.LengthMeasure;
  /** The packing material used in the slim tube. */
  PackingMaterial?: eml.String64;
  /** The permeability of the slim tube. */
  Permeability?: eml.PermeabilityRockMeasure;
  /** The pore volume of the slim tube. */
  PoreVolume?: eml.VolumeMeasure;
  /** The porosity of the slim tube. */
  Porosity?: eml.VolumePerVolumeMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface SlimTubeSpecification extends _SlimTubeSpecification {}

/** Attributes of a slim-tube test.
 *
 * For definition of a slim-tube test, see http://www.glossary.oilfield.slb.com/Terms/s/slim-tube_test.aspx */
interface _SlimTubeTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The pump temperature during the slim-tube test. */
  PumpTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  SlimTubeSpecification?: SlimTubeSpecification[];
  SlimTubeTestPressureStep?: SlimTubeTestStep[];
  /** An integer number to identify this test in a sequence of tests. */
  TestNumber: eml.NonNegativeLong;
  /** The temperature of this test. */
  TestTemperature: eml.ThermodynamicTemperatureMeasure;
}
export interface SlimTubeTest extends _SlimTubeTest {}

/** Slim-tube test step. */
interface _SlimTubeTestStep extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  SlimTubeTestVolumeStep?: SlimTubeTestVolumeStep[];
  /** The average pressure for this slim-tube test step. */
  StepAveragePressure?: eml.PressureMeasure;
  /** The step number is the index of a (P,T) step in the overall test. */
  StepNumber: eml.NonNegativeLong;
}
export interface SlimTubeTestStep extends _SlimTubeTestStep {}

/** Slim-tube test volume step. */
interface _SlimTubeTestVolumeStep extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The cumulative oil production as a fraction of the original oil in place of the slim-tube test volume step. */
  CumulativeOilProductionPercOOIP?: eml.VolumePerVolumeMeasure;
  /** The cumulative oil production of stock stank oil for the slim-tube test volume step. */
  CumulativeOilProductionSTO?: eml.VolumeMeasure;
  /** The cumulative oil production GOR for the slim-tube test volume step. */
  CumulativeProducedGOR?: eml.VolumePerVolumeMeasure;
  /** The Darcy velocity of the slim-tube test volume step. */
  DarcyVelocity?: eml.LengthPerTimeMeasure;
  /** The differential pressure of the slim-tube test volume step. */
  DifferentialPressure?: eml.PressureMeasure;
  /** The incremental produced GOR of the slim-tube test volume step. */
  IncrementalProducedGOR?: eml.VolumePerVolumeMeasure;
  /** The injected pore volume fraction of the slim-tube test volume step. */
  InjectedPoreVolumeFraction?: eml.VolumePerVolumeMeasure;
  /** The injection volume at pump temperature of the slim-tube test volume step. */
  InjectionVolumeAtPumpTemperature?: eml.VolumeMeasure;
  /** The injection volume at test temperature of the slim-tube test volume step. */
  InjectionVolumeAtTestTemperature?: eml.VolumeMeasure;
  MassBalance?: MassBalance;
  ProducedGasProperties?: ProducedGasProperties;
  ProducedOilProperties?: ProducedOilProperties;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The run time of the slim-tube test volume step. */
  RunTime?: eml.String64;
  /** The step number is the index of a (P,T) step in the overall test. */
  StepNumber: eml.NonNegativeLong;
}
export interface SlimTubeTestVolumeStep extends _SlimTubeTestVolumeStep {}

/** This is an analysis not defined by a PTA model but performed on some specialized plot.  It can report using AnyParameter which allows use of any parameter as used in the PTA models, or report Custom Parameters. See these classes for more information. */
interface _SpecializedAnalysis extends BaseType {
  AnalysisLine?: AnalysisLine[];
  /** The transformed pressure and derivative (contained in referenced Channels) (transformed to the trasnform of this specialized analysis) used in this analysis. The transforms of Y and X axes are described textually in the Specialized [X orY] Axis Description elements. */
  AnalysisPressureFunction: AbstractPtaPressureData;
  /** Allows Parameters from the library included in the schema to be added to the Specialized Analysis. Type is AbstractParameter and the concrete instances are all Parameters. */
  AnyParameter?: AbstractParameter[];
  /** Allows Custom Parameters to be added to the Specialized Analysis. See Custom Parameter for how its properties are defined. */
  CustomParameter?: CustomParameter[];
  /** Textual description about the value of this field. */
  Remark?: eml.String2000;
  /** The type of specialized analysis.  Descriptive text. These are not cataloged in the data model. */
  SpecializedAnalysisType: eml.String2000;
  /** The transform of X axis data  described textually, for the Specialized Analysis concerned. */
  SpecializedXAxisDescription: eml.String2000;
  /** The transform of Y axis data  described textually, for the Specialized Analysis concerned. */
  SpecializedYAxisDescription: eml.String2000;
}
export interface SpecializedAnalysis extends _SpecializedAnalysis {}

/** Srk_EOS. */
interface _Srk_EOS extends _AbstractCompositionalEoSModel {}
export interface Srk_EOS extends _Srk_EOS {}

/** Standing-BubblePoint. */
interface _StandingBubblePoint
  extends _AbstractCorrelationViscosityBubblePointModel {}
export interface StandingBubblePoint extends _StandingBubblePoint {}

/** Standing-Dead. */
interface _StandingDead extends _AbstractCorrelationViscosityDeadModel {
  /** The oil gravity at stock tank for the viscosity model. */
  OilGravityAtStockTank?: eml.APIGravityMeasure;
}
export interface StandingDead extends _StandingDead {}

/** Standing-Undersaturated. */
interface _StandingUndersaturated
  extends _AbstractCorrelationViscosityUndersaturatedModel {
  /** The reservoir temperature for the viscosity model. */
  ReservoirTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The solution gas oil ratio for the viscosity model. */
  SolutionGasOilRatio?: eml.VolumePerVolumeMeasure;
}
export interface StandingUndersaturated extends _StandingUndersaturated {}

/** The start and end date for a reporting period. */
interface _StartEndDate extends _AbstractDateTimeClass {
  /** The ending date that the period represents. */
  DateEnd?: Date;
  /** The beginning date that the period represents. */
  DateStart?: Date;
}
export interface StartEndDate extends _StartEndDate {}

/** Start and end time of a reporting period. */
interface _StartEndTime extends _AbstractDateTimeClass {
  /** The ending date and time that the period represents. */
  DTimEnd?: eml.TimeStamp;
  /** The beginning date and time that the period represents. */
  DTimStart?: eml.TimeStamp;
}
export interface StartEndTime extends _StartEndTime {}

/** Stock tank oil analysis. */
interface _STOAnalysis extends BaseType {
  /** The date when this test was performed. */
  Date: Date;
  /** The pressure from which the sample was flashed for the stock tank oil analysis. */
  FlashFromPressure?: eml.PressureMeasure;
  /** The temperature from which the sample was flashed for the stock tank oil analysis. */
  FlashFromTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The fluid condition at this test step. Enum, see fluid analysis step condition. */
  FluidCondition?: FluidAnalysisStepCondition;
  /** The liquid composition for the stock tank oil analysis. */
  LiquidComposition?: LiquidComposition;
  /** The molecular weight for the stock tank oil analysis. */
  MolecularWeight?: eml.MolecularWeightMeasure;
  /** The overall composition for the stock tank oil analysis. */
  OverallComposition?: OverallComposition;
  /** The phases present for the stock tank oil analysis. */
  PhasesPresent?: PhasePresent;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** Stock tank oil flashed liquid properties and composition. */
  STOFlashedLiquid?: STOFlashedLiquid;
  /** The vapor composition for the stock tank oil analysis. */
  VaporComposition?: VaporComposition;
}
export interface STOAnalysis extends _STOAnalysis {}

/** Stock tank oil (STO). */
interface _StockTankOil extends _AbstractFluidComponent {
  /** API gravity. */
  APIGravity?: eml.APIGravityMeasure;
  /** The amount of heat released during the combustion of a specified amount of STO. It is also known as higher heating value (HHV), gross energy, upper heating value, gross calorific value (GCV) or higher calorific value (HCV). This value takes into account the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is practical. */
  GrossEnergyContentPerUnitMass?: eml.EnergyPerMassMeasure;
  /** The amount of heat released during the combustion of a specified amount of STO. It is also known as higher heating value (HHV), gross energy, upper heating value,  gross calorific value (GCV) or higher calorific value (HCV). This value takes into account the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is practical. */
  GrossEnergyContentPerUnitVolume?: eml.EnergyPerVolumeMeasure;
  /** Molecular weight. */
  MolecularWeight?: eml.MolecularWeightMeasure;
  /** The amount of heat released during the combustion of a specified amount of STO. It is also known as lower heating value (LHV), net energy, lower heating value, net calorific value  (NCV) or lower calorific value (LCV). This value ignores the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is not possible and is ignored. */
  NetEnergyContentPerUnitMass?: eml.EnergyPerMassMeasure;
  /** The amount of heat released during the combustion of a specified amount of STO. It is also known as lower heating value  (LHV), net energy, net calorific value (NCV) or lower calorific value (LCV). This value ignores the latent heat of vaporization of water in the combustion products, and is useful in calculating heating values for fuels where condensation of the reaction products is not possible and is ignored. */
  NetEnergyContentPerUnitVolume?: eml.EnergyPerVolumeMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
}
export interface StockTankOil extends _StockTankOil {}

/** Stock tank oil flashed liquid properties and composition. */
interface _STOFlashedLiquid extends BaseType {
  /** The asphaltene content of the liquid phase of the stock tank analysis. */
  AsphalteneContent?: eml.MassPerMassMeasure;
  /** The ASTM flash point of the liquid phase of the stock tank analysis. */
  ASTMFlashPoint?: eml.ThermodynamicTemperatureMeasure;
  /** The cloud point of the liquid phase of the stock tank analysis. */
  CloudPoint?: eml.ThermodynamicTemperatureMeasure;
  /** The elemental sulfur content of the liquid phase of the stock tank analysis. */
  ElementalSulfur?: eml.MassPerMassMeasure;
  /** The iron content of the liquid phase of the stock tank analysis. */
  Iron?: eml.MassPerMassMeasure;
  /** The lead content of the liquid phase of the stock tank analysis. */
  Lead?: eml.MassPerMassMeasure;
  /** The nickel content of the liquid phase of the stock tank analysis. */
  Nickel?: eml.MassPerMassMeasure;
  /** The nitrogen content of the liquid phase of the stock tank analysis. */
  Nitrogen: eml.MassPerMassMeasure;
  /** Oil API gravity. */
  OilAPIGravity?: eml.APIGravityMeasure;
  /** The paraffin content of the liquid phase of the stock tank analysis. */
  ParaffinContent?: eml.MassPerMassMeasure;
  /** The pour point of the liquid phase of the stock tank analysis. */
  PourPoint?: eml.ThermodynamicTemperatureMeasure;
  /** The reid vapor pressure of the liquid phase of the stock tank analysis. */
  ReidVaporPressure?: eml.PressureMeasure;
  /** SARA analysis results. SARA stands for saturates, asphaltenes, resins and aromatics. */
  Sara?: Sara[];
  /** The total acid number of the liquid phase of the stock tank analysis. */
  TotalAcidNumber?: eml.DimensionlessMeasure;
  /** The total sulfur content of the liquid phase of the stock tank analysis. */
  TotalSulfur?: eml.MassPerMassMeasure;
  /** The vanadium content of the liquid phase of the stock tank analysis. */
  Vanadium?: eml.MassPerMassMeasure;
  /** The viscosity at test temperature of the liquid phase of the stock tank analysis. */
  ViscosityAtTemperature?: ViscosityAtTemperature[];
  /** The water content of the liquid phase of the stock tank analysis. */
  WaterContent?: eml.MassPerMassMeasure;
  /** The Watson K factor of the liquid phase of the stock tank analysis. */
  WatsonKFactor?: eml.DimensionlessMeasure;
  /** The wax appearance temperature of the liquid phase of the stock tank analysis. */
  WaxAppearanceTemperature?: eml.ThermodynamicTemperatureMeasure;
}
export interface STOFlashedLiquid extends _STOFlashedLiquid {}

/** The dimensionless storativity ratio, known as Omega equal to the fracture storativity divided by total storativity.  Storativity = porosity * total compressibility. */
interface _StorativityRatio extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface StorativityRatio extends _StorativityRatio {}

/** String data. */
interface _StringData extends _AbstractMeasureData {
  /** The value of a dependent (data) variable in a row of the curve table. The units of measure are specified in the curve definition. The first value corresponds to order=1 for columns where isIndex is false. The second to order=2. And so on. The number of index and data values must match the number of columns in the table. */
  StringValue: KindQualifiedString;
}
export interface StringData extends _StringData {}

/** A single string value in the time series. */
interface _StringValue extends _AbstractValue {
  /** A single string value in the time series. */
  StringValue: TimeSeriesStringSample;
}
export interface StringValue extends _StringValue {}

export type SulfurComponentKind =
  | "2-3 & 2-4 dimethyl thiophene"
  | "2-5-dimethyl thiophene"
  | "2-ethyl thiophene"
  | "2-methyl 1-butanethiol"
  | "2-methyl thipophene"
  | "3-4-dimethyl thiophene"
  | "3-ethyl thiophene"
  | "3-methyl thipophene"
  | "benzothiophene"
  | "carbon disulfide"
  | "carbonyl sulfide"
  | "dibutyl sulfide"
  | "diethyl disulfide"
  | "diethyl sulfide"
  | "dimethyl disulfide"
  | "dimethyl sulfide"
  | "dipropyl sulfide"
  | "di-sec.butyl sulfide"
  | "ditert.butyl sulfide"
  | "ethyl isopropyl disulfide"
  | "ethyl mercaptan"
  | "ethyl-methyl sulfide"
  | "hydrogen sulfide"
  | "isobutyl mercaptan"
  | "isopentyl mercaptan"
  | "isopropyl mercaptan"
  | "methyl isopropyl sulfide"
  | "methyl mercaptan"
  | "n-butyl mercaptan"
  | "n-heptyl mercaptan"
  | "n-hexyl mercaptan"
  | "n-nonyl mercaptan"
  | "n-octyl mercaptan"
  | "n-pentyl mercaptan"
  | "n-propyl mercaptan"
  | "sec-butyl mercaptan"
  | "tert-butyl mercaptan"
  | "tetra-hydro thiophene"
  | "thiophene";
interface _SulfurComponentKind extends eml._TypeEnum {
  _: SulfurComponentKind;
}

export type SulfurComponentKindExt = string;
type _SulfurComponentKindExt = Primitive._string;

interface _SulfurFluidComponent extends _AbstractFluidComponent {
  Kind: SulfurComponentKindExt;
  MolecularWeight?: eml.MolecularWeightMeasureExt;
  Remark?: eml.String2000;
}
export interface SulfurFluidComponent extends _SulfurFluidComponent {}

/** Swelling test. */
interface _SwellingTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The composition of one or more injected gases used in the swelling test. */
  InjectedGas?: InjectedGas[];
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  SwellingTestStep?: SwellingTestStep[];
  /** An integer number to identify this test in a sequence of tests. */
  TestNumber: eml.NonNegativeLong;
  /** The temperature of this test. */
  TestTemperature: eml.ThermodynamicTemperatureMeasure;
}
export interface SwellingTest extends _SwellingTest {}

/** Swelling test step */
interface _SwellingTestStep extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** A reference to a constant composition expansion test associated with this swelling test. */
  ConstantCompositionExpansionTest?: eml.String64;
  /** The cumulative amount of an injected gas up to and including this step, and a reference to which Injected Gas composition it consists of. Note, multiple gases of different compositions may be injected at each test step, and this element tracks the cumulative quantity of each of them. */
  CumulativeGasAdded?: RefInjectedGasAdded[];
  /** The density at saturation point for this swelling test step. */
  DensityAtSaturationPoint?: eml.MassPerVolumeMeasure;
  /** The gas-oil ratio for this swelling test step. */
  Gor?: eml.VolumePerVolumeMeasure;
  /** The amount of an injected gas for this step, and a reference to which Injected Gas composition it consists of. Note, multiple gases of different compositions may be injected at each test step. */
  IncrementalGasAdded?: RefInjectedGasAdded[];
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The saturation (or bubble point) pressure measured in this test. */
  SaturationPressure?: SaturationPressure;
  /** The step number is the index of a (P,T) step in the overall test. */
  StepNumber: eml.NonNegativeLong;
  /** The swelling factor for this swelling test step. */
  SwellingFactor?: eml.VolumePerVolumeMeasure;
  /** The swollen volume for this swelling test step, relative to a reference volume. */
  SwollenVolume?: RelativeVolumeRatio;
  /** A reference to a transport property test associated with this swelling test. */
  TransportPropertyTestReference?: eml.String64;
}
export interface SwellingTestStep extends _SwellingTestStep {}

/** Summarizes product import to or export from an asset by ship. */
interface _TerminalLifting extends _AbstractSimpleProductVolume {
  /** The certificate number for the document that defines the lifting onto the tanker. */
  CertificateNumber: eml.String64;
  DestinationTerminal?: eml.DataObjectReference;
  /** The date and time when the lifting ended. */
  EndTime?: eml.TimeStamp;
  LoadingTerminal: eml.DataObjectReference;
  /** The amount of product lifted. */
  ProductQuantity?: ProductFluid[];
  /** The date and time when the lifting began. */
  StartTime?: eml.TimeStamp;
  Tanker: eml.DataObjectReference;
}
export interface TerminalLifting extends _TerminalLifting {}

/** Use to report  terminal lifting as dispositions within the periodic asset production volumes reporting.
 * The components of petroleum disposition are stock change, crude oil losses, refinery inputs, exports, and products supplied for domestic consumption (https://www.eia.gov/dnav/pet/TblDefs/pet_sum_crdsnd_tbldef2.asp) */
interface _TerminalLiftingDisposition extends _AbstractDisposition {
  TerminalLifting?: TerminalLifting;
}
export interface TerminalLiftingDisposition
  extends _TerminalLiftingDisposition {}

/** Specifies the types of fiber terminations. */
export type TerminationKind =
  | "looped back to instrument box"
  | "termination at cable";
interface _TerminationKind extends eml._TypeEnum {
  _: TerminationKind;
}

/** Test conditions for a production well test. */
interface _TestPeriod extends BaseType {
  /** Unique identifier for this instance of the object. */
  uid?: eml.String64;
  /** The date and time when the test  began. */
  EndTime: eml.TimeStamp;
  /** The production rate of the product. */
  ProductRate?: ProductRate[];
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The date and time when the test  began. */
  StartTime: eml.TimeStamp;
  /** The duration of the test. */
  TestPeriodKind?: TestPeriodKind;
  /** The duration of the test. */
  WellFlowingCondition?: WellFlowingCondition;
}
export interface TestPeriod extends _TestPeriod {}

/** This is the type of test period: drawdowns or build up for producing flow tests and injection or fall-off for injecting well tests; or observation tests. Producing or injecting can be constant rate or variable rate. The periods where measurements are made but the testing tool is in motion, are covered by the "run in hole" and "pull out of hole" values. */
export type TestPeriodKind =
  | "buildup"
  | "constant rate injection"
  | "fall-off"
  | "post-test pull out of hole"
  | "pre-test run in hole"
  | "production well test"
  | "variable rate injection"
  | "constant rate drawdown"
  | "shut-in observation"
  | "variable rate drawdown";
interface _TestPeriodKind extends eml._TypeEnum {
  _: TestPeriodKind;
}

interface _TestPeriodsFlowrateData extends _AbstractRateHistory {
  /** Choice available for rate history where the test period(s) used to form the rate history are referenced (by uid). */
  TestPeriodRef: eml.String64[];
}
export interface TestPeriodsFlowrateData extends _TestPeriodsFlowrateData {}

/** Specifies the thermodynamic phases. */
export type ThermodynamicPhase =
  | "aqueous"
  | "oleic"
  | "vapor"
  | "total hydrocarbon";
interface _ThermodynamicPhase extends eml._TypeEnum {
  _: ThermodynamicPhase;
}

/** Optional enum for gas pseudo time analyses using time transforms. */
export type TimeNonLinearTransformKind =
  | "material balance pseudo-time"
  | "pseudo-time transform"
  | "time (un-transformed)";
interface _TimeNonLinearTransformKind extends eml._TypeEnum {
  _: TimeNonLinearTransformKind;
}

/** Defines the time series data being transferred. */
interface _TimeSeriesData extends eml._AbstractObject {
  /** A comment about the time series. */
  Comment?: eml.String2000;
  DataValue?: AbstractValue[];
  /** A keyword value pair which characterizes the underlying nature of this value. The key value may provide part of the unique identity of an instance of a concept or it may characterize the underlying concept. The key value is defined within the specified keyword-naming system. This is essentially a classification of the data in the specified system (keyword). */
  Key?: KeywordValueStruct[];
  /** Defines the type of measure that the time series represents. If this is specified then unit must be specified. This may be redundant to some information in the keys, but it is important for allowing an application to understand the nature of a measure value, even if it does not understand all of the underlying nature. */
  MeasureClass?: eml.MeasureClass;
  /** If the time series is a measure, then this specifies the unit of measure. The unit acronym must be chosen from the list that is valid for the measure class. If this is specified,  then the measure class must be specified. */
  Uom?: eml.UnitOfMeasureExt;
}
export interface TimeSeriesData extends _TimeSeriesData {}

/** A single double value in a time series. */
interface _TimeSeriesDoubleSample extends eml._AbstractMeasure {
  /** The date and time at which the value applies. If no time is specified then the value is static and only one sample can be defined. Either dTim or value or both must be specified. If the status attribute is absent and the value is not "NaN", the data value can be assumed to be good with no restrictions. */
  dTim?: eml.TimeStamp;
  /** An indicator of the quality of the value. */
  status?: ValueStatus;
}
export interface TimeSeriesDoubleSample extends _TimeSeriesDoubleSample {}

/** Specifies the keywords used for defining keyword-value pairs in a time series. */
export type TimeSeriesKeyword =
  | "asset identifier"
  | "flow"
  | "product"
  | "qualifier"
  | "subqualifier"
  | "unknown";
interface _TimeSeriesKeyword extends eml._TypeEnum {
  _: TimeSeriesKeyword;
}

/** The representation of the points in the time series data: Point By Point meaning instantaneous measurements, or Stepwise Value At End Of Period meaning that the value reported has applied from the previous point up to the time reported. */
export type TimeSeriesPointRepresentation =
  | "point by point"
  | "stepwise value at end of period";
interface _TimeSeriesPointRepresentation extends eml._TypeEnum {
  _: TimeSeriesPointRepresentation;
}

/** Time series statistics data. */
interface _TimeSeriesStatistic extends eml._AbstractObject {
  /** A comment about the time series. */
  Comment?: eml.String2000;
  DTimMax: EndpointDateTime;
  DTimMin: EndpointDateTime;
  /** A keyword value pair which characterizes the underlying nature of this value. The key value may provide part of the unique identity of an instance of a concept or it may characterize the underlying concept. The key value will be defined within the specified keyword naming system. This is essentially a classification of the data in the specified system (keyword). */
  Key?: KeywordValueStruct[];
  /** The maximum value within the time range of dTimMin to dTimMax. Element "unit" defines the unit of measure of this value. */
  Maximum?: eml.DimensionlessMeasure;
  /** The arithmetic mean (sum divided by count) of all values within the time range of dTimMin to dTimMax. Element "unit" defines the unit of measure of this value. */
  Mean?: eml.DimensionlessMeasure;
  /** Defines the type of measure that the time series represents. If this is specified then unit must be specified. This may be redundant to some information in the keys but it is important for allowing an application to understand the nature of a measure value even if it does not understand all of the underlying nature. */
  MeasureClass?: eml.MeasureClass;
  /** The median value of all values within the time range of dTimMin to dTimMax. Element "unit" defines the unit of measure of this value. */
  Median?: eml.DimensionlessMeasure;
  /** The minimum value within the time range of dTimMin to dTimMax. Element "unit" defines the unit of measure of this value. */
  Minimum?: eml.DimensionlessMeasure;
  /** The standard deviation of all values within the time range of dTimMin to dTimMax. Element "unit" defines the unit of measure of this value. */
  StandardDeviation?: eml.DimensionlessMeasure;
  /** The sum of all values within the time range of dTimMin to dTimMax. Element "unit" defines the unit of measure of this value. */
  Sum?: eml.DimensionlessMeasure;
  /** Defines a value threshold window and the time duration where values
   * (within the time range of dTimMin to dTimMax) were within that window. */
  TimeAtThreshold?: TimeSeriesThreshold;
  /** If the time series is a measure then this specifies the unit of measure. The unit acronym must be chosen from the list that is valid for the measure class. If this is specified then the measure class must be specified. */
  Uom?: eml.UnitOfMeasureExt;
}
export interface TimeSeriesStatistic extends _TimeSeriesStatistic {}

/** A single string value in a time series. */
interface _TimeSeriesStringSample extends eml._AbstractString {
  /** The date and time at which the value applies. If no time is specified then the value is static and only one sample can be defined. Either dTim or value or both must be specified. If the status attribute is absent and the value is not "NaN", the data value can be assumed to be good with no restrictions. */
  dTim?: eml.TimeStamp;
}
export interface TimeSeriesStringSample extends _TimeSeriesStringSample {}

/** Defines a value threshold window and the cumulative time duration that the data was within that window. */
interface _TimeSeriesThreshold extends BaseType {
  /** The sum of the time intervals over the range of dTimMin to dTimMax during which the values were within the specified threshold range. */
  Duration: eml.TimeMeasure;
  /** The upper bound of the threshold for testing whether values are within a specific range. Element "unit" defines the unit of measure of this value. At least one of minimumValue and maximumValue must be specified. The thresholdMaximum must be greater than thresholdMinimum. If thresholdMaximum is not specified then the maximum shall be assumed to be plus infinity. */
  ThresholdMaximum?: EndpointQuantity;
  /** The lower bound of the threshold for testing whether values are within a specific range.The element "unit" defines the unit of measure of this value. At least one of minimumValue and maximumValue must be specified. The thresholdMinimum must be less than thresholdMaximum. If thresholdMinimum is not specified then the minimum shall be assumed to be minus infinity. */
  ThresholdMinimum?: EndpointQuantity;
}
export interface TimeSeriesThreshold extends _TimeSeriesThreshold {}

/** The total thickness of the layer of reservoir layer. */
interface _TotalThickness extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface TotalThickness extends _TotalThickness {}

/** Specifies the types of facility that can be mapped to for a given length of fiber measurement. */
export type TraceProcessingType = "as acquired" | "recalibrated";
interface _TraceProcessingType extends eml._TypeEnum {
  _: TraceProcessingType;
}

/** Information about products transferred across asset group boundaries or leaving the jurisdiction of an operator. This may include pipeline exports, output to refineries, etc. */
interface _Transfer extends _AbstractSimpleProductVolume {
  DestinationFacility: eml.DataObjectReference;
  /** Date and time when the transfer ended. */
  EndTime?: eml.TimeStamp;
  /** The amount of product transferred. */
  ProductTransferQuantity?: ProductFluid[];
  SourceFacility: eml.DataObjectReference;
  /** The date and time when the transfer began. */
  StartTime?: eml.TimeStamp;
  /** Specifies the kind of transfer. See enum TransferKind. */
  TransferKind: TransferKind;
}
export interface Transfer extends _Transfer {}

/** Use to report  a transfer as dispositions within the periodic asset production volumes reporting.
 * The components of petroleum disposition are stock change, crude oil losses, refinery inputs, exports, and products supplied for domestic consumption (https://www.eia.gov/dnav/pet/TblDefs/pet_sum_crdsnd_tbldef2.asp) */
interface _TransferDisposition extends _AbstractDisposition {
  Transfer?: Transfer;
}
export interface TransferDisposition extends _TransferDisposition {}

/** Specifies if the transfer is input or output. */
export type TransferKind = "input" | "output";
interface _TransferKind extends eml._TypeEnum {
  _: TransferKind;
}

/** The transmissibility reduction factor of a fault in a Linear Composite model where the boundary of the inner and outer zones is a leaky fault. If T is the complete transmissibility which would be computed without any fault between point A and point B (T is a function of permeability, etc), then Tf = T * leakage. Therefore: leakage = 1 implies that the fault is not a barrier to flow at all, leakage = 0 implies that the fault is sealing (no transmissibility anymore at all between points A and B). */
interface _TransmissibilityReductionFactorOfLinearFront
  extends _AbstractParameter {
  abbreviation: string;
  value: string;
}
export interface TransmissibilityReductionFactorOfLinearFront
  extends _TransmissibilityReductionFactorOfLinearFront {}

/** Internal diameter of the tubing, generally used for estimations of wellbore storage when the tubing is filling up. */
interface _TubingInteralDiameter extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface TubingInteralDiameter extends _TubingInteralDiameter {}

/** Two intersecting faults boundary model. Two linear non-parallel boundaries run along adjacent sides of the reservoir and intersect at an arbitrary angle. */
interface _TwoIntersectingFaultsModel extends _BoundaryBaseModel {
  AngleBetweenBoundaries: AngleBetweenBoundaries;
  Boundary1Type: Boundary1Type;
  Boundary2Type: Boundary2Type;
  DistanceToBoundary1: DistanceToBoundary1;
  DistanceToBoundary2: DistanceToBoundary2;
  OrientationOfNormalToBoundary1?: OrientationOfNormalToBoundary1;
}
export interface TwoIntersectingFaultsModel
  extends _TwoIntersectingFaultsModel {}

/** Two parallel faults boundary model. Two linear parallel boundaries run along opposite side of the reservoir. */
interface _TwoParallelFaultsModel extends _BoundaryBaseModel {
  Boundary1Type: Boundary1Type;
  Boundary3Type: Boundary3Type;
  DistanceToBoundary1: DistanceToBoundary1;
  DistanceToBoundary3: DistanceToBoundary3;
  OrientationOfNormalToBoundary1?: OrientationOfNormalToBoundary1;
}
export interface TwoParallelFaultsModel extends _TwoParallelFaultsModel {}

export type UpperBoundaryType = "constant pressure" | "no-flow";
interface _UpperBoundaryType extends eml._TypeEnum {
  _: UpperBoundaryType;
}

/** U-shaped faults boundary model. Three linear faults intersecting at 90 degrees bound the reservoir on three sides with the fourth side unbounded. */
interface _UShapedFaultsModel extends _BoundaryBaseModel {
  Boundary1Type: Boundary1Type;
  Boundary2Type: Boundary2Type;
  Boundary3Type: Boundary3Type;
  DistanceToBoundary1: DistanceToBoundary1;
  DistanceToBoundary2: DistanceToBoundary2;
  DistanceToBoundary3: DistanceToBoundary3;
  OrientationOfNormalToBoundary1?: OrientationOfNormalToBoundary1;
}
export interface UShapedFaultsModel extends _UShapedFaultsModel {}

/** Specifies the indicators of the quality of a value. This is designed for a SCADA or OPC style of value status. */
export type ValueStatus =
  | "access denied"
  | "bad"
  | "bad calibration"
  | "calculation failure"
  | "comm failure"
  | "device failure"
  | "frozen"
  | "not available"
  | "overflow"
  | "questionable"
  | "range limit"
  | "sensor failure"
  | "substituted"
  | "timeout";
interface _ValueStatus extends eml._TypeEnum {
  _: ValueStatus;
}

/** Vapor composition. */
interface _VaporComposition extends BaseType {
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  VaporComponentFraction?: FluidComponentFraction[];
}
export interface VaporComposition extends _VaporComposition {}

/** Properties and results for a vapor-liquid equilibrium (VLE) test. */
interface _VaporLiquidEquilibriumTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** Reference to the atmospheric flash test for this VLE test. */
  AtmosphericFlashTestReference?: eml.String64;
  /** Reference to the cumulative gas added for this VLE test. */
  CumulativeGasAdded?: RefInjectedGasAdded;
  /** The gas solvent added for this VLE test. */
  GasSolventAdded?: eml.VolumePerVolumeMeasure;
  /** Reference to the injected gas added for this VLE test. */
  InjectedGasAdded?: InjectedGas;
  /** The liquid composition for this VLE test. */
  LiquidComposition?: LiquidComposition[];
  /** The liquid phase density for this VLE test. */
  LiquidPhaseDensity: PhaseDensity;
  /** The liquid phase volume for this VLE test. */
  LiquidPhaseVolume?: eml.VolumePerVolumeMeasure;
  /** A reference to a liquid transport property test associated with this VLE test. */
  LiquidTransportTestReference?: eml.String64;
  /** The mixture gas solvent mole fraction for this VLE test. */
  MixtureGasSolventMoleFraction?: eml.AmountOfSubstancePerAmountOfSubstanceMeasure;
  /** The mixture gas-oil ratio for this VLE test. */
  MixtureGOR?: eml.VolumePerVolumeMeasure;
  /** The mixture saturation pressure test temperature for this VLE test. */
  MixturePsatTestTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The mixture relative volume relative to volume a saturation pressure for this VLE test. */
  MixtureRelativeVolumeRelativeToPsat?: eml.VolumePerVolumeMeasure;
  /** The mixture volume for this VLE test. */
  MixtureVolume?: eml.VolumeMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** An integer number to identify this test in a sequence of tests. */
  TestNumber: eml.NonNegativeLong;
  /** The pressure of this test. */
  TestPressure?: eml.PressureMeasure;
  /** The temperature of this test. */
  TestTemperature: eml.ThermodynamicTemperatureMeasure;
  /** The vapor composition for this VLE test. */
  VaporComposition?: FluidComponentFraction[];
  /** The vapor phase density for this VLE test. */
  VaporPhaseDensity: PhaseDensity[];
  /** The vapor phase viscosity for this VLE test. */
  VaporPhaseViscosity: PhaseViscosity;
  /** The vapor phase volume for this VLE test. */
  VaporPhaseVolume?: eml.VolumePerVolumeMeasure;
  /** A reference to a vapor transport property test associated with this VLE test. */
  VaporTransportTestReference?: eml.String64;
}
export interface VaporLiquidEquilibriumTest
  extends _VaporLiquidEquilibriumTest {}

/** The Vertical Anisotropy of permeability, K(vertical)/K(radial). K(radial) is the effective horizontal permeability, which in anisotropic horizontal permeability equals square root (Kx^2+Ky^2). Optional since many models do not account for this parameter. It will be mandatory in some models however, e.g. limited entry or horizontal wellbore models. */
interface _VerticalAnisotropyKvToKr extends _AbstractParameter {
  Abbreviation: eml.String64;
  Value: eml.DimensionlessMeasure;
}
export interface VerticalAnisotropyKvToKr extends _VerticalAnisotropyKvToKr {}

/** Performed on multiple intervals in the same wellbore, where one interval is flowing and one or more intervals are observing the interfering pressure. */
interface _VerticalInterferenceTest extends _FlowTestActivity {
  IntervalMeasurementSet: FlowTestMeasurementSet[];
  /** References a log containing a wireline formation test  tie-in (e.g. gamma ray curve) vs. depth data. */
  TieInLog: eml.DataObjectReference;
}
export interface VerticalInterferenceTest extends _VerticalInterferenceTest {}

/** Viscosity measurement at a specific temperature. */
interface _ViscosityAtTemperature extends BaseType {
  /** Viscosity measurement at the associated temperature. */
  Viscosity: eml.DynamicViscosityMeasure;
  /** Temperature at which the viscosity was measured. */
  ViscosityTemperature: eml.ThermodynamicTemperatureMeasure;
}
export interface ViscosityAtTemperature extends _ViscosityAtTemperature {}

/** Specifies the conditions at which the volume was measured. */
export type VolumeReferenceKind =
  | "reservoir"
  | "saturation-calculated"
  | "saturation-measured"
  | "separator stage 1"
  | "separator stage 10"
  | "separator stage 2"
  | "separator stage 3"
  | "separator stage 4"
  | "separator stage 5"
  | "separator stage 6"
  | "separator stage 7"
  | "separator stage 8"
  | "separator stage 9"
  | "stock tank"
  | "test step"
  | "other";
interface _VolumeReferenceKind extends eml._TypeEnum {
  _: VolumeReferenceKind;
}

export type VolumeReferenceKindExt = string;
type _VolumeReferenceKindExt = Primitive._string;

/** A collection of any one or more fluid analyses on water. */
interface _WaterAnalysis extends _FluidAnalysis {
  FluidSample: eml.DataObjectReference;
  SampleIntegrityAndPreparation?: SampleIntegrityAndPreparation;
  /** Water analysis test. */
  WaterAnalysisTest?: WaterAnalysisTest[];
  WaterSampleComponent?: WaterSampleComponent[];
}
export interface WaterAnalysis extends _WaterAnalysis {}

/** Water analysis test. */
interface _WaterAnalysisTest extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  /** The liquid gravity for the water analysis test. */
  LiquidGravity?: number;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  /** The salinity for the water analysis test. */
  SalinityPerMass?: eml.MassPerMassMeasure;
  SalinityPerVolume?: eml.MassPerVolumeMeasureExt;
  TestMethod?: eml.String2000;
  /** An integer number to identify this test in a sequence of tests. */
  TestNumber: eml.NonNegativeLong;
  TotalAlkalinityPerMass?: eml.MassPerMassMeasureExt;
  TotalAlkalinityPerVolume?: eml.MassPerVolumeMeasureExt;
  /** The total dissolved solids for the water analysis test. */
  TotalDissolvedSolidsPerMass?: eml.MassPerMassMeasure;
  TotalDissolvedSolidsPerVolume?: eml.MassPerVolumeMeasureExt;
  /** The total water hardness for the water analysis test. */
  TotalHardnessPerMass?: eml.MassPerMassMeasure;
  TotalHardnessPerVolume?: eml.MassPerVolumeMeasureExt;
  TotalSedimentSolidsPerMass?: eml.MassPerMassMeasureExt;
  TotalSedimentSolidsPerVolume?: eml.MassPerVolumeMeasureExt;
  /** The total suspended solids for the water analysis test. */
  TotalSuspendedSolidsPerMass?: eml.MassPerMassMeasure;
  TotalSuspendedSolidsPerVolume?: eml.MassPerVolumeMeasureExt;
  /** Water analysis test step. */
  WaterAnalysisTestStep?: WaterAnalysisTestStep[];
}
export interface WaterAnalysisTest extends _WaterAnalysisTest {}

/** Water analysis test step. */
interface _WaterAnalysisTestStep extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  DissolvedCO2?: eml.MassPerVolumeMeasureExt;
  DissolvedH2S?: eml.MassPerVolumeMeasureExt;
  DissolvedO2?: eml.MassPerVolumeMeasureExt;
  FlashedGas?: FlashedGas;
  pH?: eml.UnitlessMeasure;
  /** Remarks and comments about this data item. */
  Remark?: eml.String2000;
  Resistivity?: eml.ElectricalResistivityMeasureExt;
  /** The solution gas-water ratio for the water analysis test step. */
  SolutionGasWaterRatio?: eml.VolumePerVolumeMeasure;
  /** The step number is the index of a (P,T) step in the overall test. */
  StepNumber: eml.NonNegativeLong;
  /** The pressure for this test step. */
  StepPressure: eml.PressureMeasure;
  /** The temperature for this test step. */
  StepTemperature: eml.ThermodynamicTemperatureMeasure;
  Turbidity?: eml.UnitlessMeasure;
  /** The water density for the water analysis test step. */
  WaterDensity?: eml.MassPerVolumeMeasure;
  /** The water density change with pressure for the water analysis test step. */
  WaterDensityChangeWithPressure?: eml.MassPerVolumePerPressureMeasureExt;
  /** The water density change with temperature for the water analysis test step. */
  WaterDensityChangeWithTemperature?: eml.MassPerVolumePerTemperatureMeasureExt;
  /** The water enthalpy for the water analysis test step. */
  WaterEnthalpy?: eml.MolarEnergyMeasure;
  /** The water entropy for the water analysis test step. */
  WaterEntropy?: eml.EnergyLengthPerTimeAreaTemperatureMeasure;
  /** The water formation volume factor for the water analysis test step. */
  WaterFormationVolumeFactor?: eml.VolumePerVolumeMeasure;
  /** The water heat capacity for the water analysis test step. */
  WaterHeatCapacity?: eml.EnergyMeasure;
  /** The water isothermal compressibility for the water analysis test step. */
  WaterIsothermalCompressibility?: eml.ReciprocalPressureMeasure;
  /** The water specific heat for the water analysis test step. */
  WaterSpecificHeat?: eml.EnergyPerVolumeMeasure;
  /** The water specific volume for the water analysis test step. */
  WaterSpecificVolume?: eml.VolumePerMassMeasure;
  /** The water thermal conductivity for the water analysis test step. */
  WaterThermalConductivity?: eml.ElectricConductivityMeasure;
  /** The water thermal expansion for the water analysis test step. */
  WaterThermalExpansion?: eml.VolumetricThermalExpansionMeasure;
  /** The water viscosity for the water analysis test step. */
  WaterViscosity?: eml.DynamicViscosityMeasure;
  /** The water viscous compressibility for the water analysis test step. */
  WaterViscousCompressibility?: eml.ReciprocalPressureMeasure;
}
export interface WaterAnalysisTestStep extends _WaterAnalysisTestStep {}

/** The test to monitor the water level, sometimes required for regulatory purpose. For example, see TxRRC H-15. */
interface _WaterLevelTest extends _FlowTestActivity {
  IntervalMeasurementSet: FlowTestMeasurementSet;
}
export interface WaterLevelTest extends _WaterLevelTest {}

/** Water sample component. */
interface _WaterSampleComponent extends BaseType {
  /** A unique identifier for this data element. It is not globally unique (not a uuid) and only need be unique within the context of the parent top-level object. */
  uid: eml.String64;
  Anion?: AnionKindExt;
  Cation?: CationKindExt;
  /** This element can be used where a measurement for a concentration is only capable of a “yes/no” type accuracy. Values can be ADL (meaning the measurement was Above Detectable Limits) or BDL (meaning the measurement was Below Detectable Limits). If the condition is “ADL” then the concentration as reported in Mass Fraction or Mole Fraction is expected to represent the maximum value which can be distinguished (so that we know the actual value to be equal to or greater than that). If the condition is “BDL” then the concentration as reported in Mass Fraction or Mole Fraction is expected to represent the minimum value which can be distinguished (so that we know the actual value to be equal to or less than that). */
  ConcentrationRelativeToDetectableLimits?: DetectableLimitRelativeStateKind;
  /** The equivalent concentration of CaCO3 of the water sample component. */
  EquivalentConcentration?: eml.MassPerMassMeasure;
  /** The mass concentration of the water sample component. */
  MassConcentration?: eml.MassPerMassMeasure;
  MolarConcentration?: eml.AmountOfSubstancePerAmountOfSubstanceMeasureExt;
  OrganicAcid?: OrganicAcidKindExt;
  Remark?: eml.String2000;
  TestMethod?: eml.String2000;
  VolumeConcentration?: eml.MassPerVolumeMeasureExt;
}
export interface WaterSampleComponent extends _WaterSampleComponent {}

/** Wave length. */
interface _WaveLength extends _AbstractAttenuationMeasure {
  /** Wave length. */
  WaveLength: eml.LengthMeasure;
}
export interface WaveLength extends _WaveLength {}

/** Abstract wellbore response model from which the other wellbore response model types are derived. */
interface _WellboreBaseModel extends _AbstractModelSection {
  FluidDensity?: FluidDensity;
  TubingInteralDiameter?: TubingInteralDiameter;
  WellboreDeviationAngle?: WellboreDeviationAngle;
  WellboreFluidCompressibility?: WellboreFluidCompressibility;
  WellboreRadius: WellboreRadius;
  WellboreStorageCoefficient: WellboreStorageCoefficient;
  WellboreStorageMechanismType?: WellboreStorageMechanismType;
  WellboreVolume?: WellboreVolume;
}
export interface WellboreBaseModel extends _WellboreBaseModel {}

/** The angle of deviation from vertical of the wellbore, generally used for estimations of wellbore storage when the tubing is filling up. */
interface _WellboreDeviationAngle extends _AbstractParameter {
  Abbreviation: eml.String64;
  PlaneAngle: eml.PlaneAngleMeasure;
}
export interface WellboreDeviationAngle extends _WellboreDeviationAngle {}

/** The compressibility of the fluid in the wellbore, such that this value * wellbore volume = wellbore storage coefficient. */
interface _WellboreFluidCompressibility extends _AbstractParameter {
  Abbreviation: eml.String64;
  Compressibility: eml.ReciprocalPressureMeasureExt;
}
export interface WellboreFluidCompressibility
  extends _WellboreFluidCompressibility {}

/** The radius of the wellbore, generally taken to represent the open hole size. */
interface _WellboreRadius extends _AbstractParameter {
  Abbreviation: eml.String64;
  Length: eml.LengthMeasure;
}
export interface WellboreRadius extends _WellboreRadius {}

/** The wellbore storage coefficient equal to the volume which flows into the wellbore per unit change in pressure in the wellbore. NOTE that by setting this parameter to = 0, the model becomes equivalent to a "No Wellbore Storage" model. */
interface _WellboreStorageCoefficient extends _AbstractParameter {
  Abbreviation: eml.String64;
  VolumePerPressure: eml.VolumePerPressureMeasureExt;
}
export interface WellboreStorageCoefficient
  extends _WellboreStorageCoefficient {}

export type WellboreStorageMechanismType =
  | "closed chamber"
  | "full well"
  | "rising level";
interface _WellboreStorageMechanismType extends eml._TypeEnum {
  _: WellboreStorageMechanismType;
}

/** The volume of the wellbore equipment which influences the wellbore storage. It will be sum of volumes of all components open to the reservoir up to the shut off valve. */
interface _WellboreVolume extends _AbstractParameter {
  Abbreviation: eml.String64;
  Volume: eml.VolumeMeasure;
}
export interface WellboreVolume extends _WellboreVolume {}

/** Specifies the directions of flow of the fluids in a well facility (generally, injected or produced, or some combination). */
export type WellDirection =
  | "huff-n-puff"
  | "injector"
  | "producer"
  | "uncertain";
interface _WellDirection extends eml._TypeEnum {
  _: WellDirection;
}

/** Describes key conditions of the flowing well during a production well test. */
interface _WellFlowingCondition extends BaseType {
  /** The lowest usable water depth as measured from the surface. See TxRRC H-15. */
  BaseUsableWater?: eml.LengthMeasure;
  /** The measure depth datum for which the bottomhole pressure is reported.  This will later be converted to a TVD for reservoir engineering purpose. */
  BottomHolePressureDatumMd?: eml.LengthMeasure;
  /** The pressure at the bottom of the hole under stabilized conditions (typically at the end of the flowing period). */
  BottomHoleStabilizedPressure?: eml.PressureMeasure;
  /** The temperature at the bottom of the hole under stabilized conditions (typically at the end of the flowing period). */
  BottomHoleStabilizedTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The pressure at the casing head under stabilized conditions (typically at the end of the flowing period). */
  CasingHeadStabilizedPressure?: eml.AbstractPressureValue;
  /** The temperature at the casing head under stabilized conditions (typically at the end of the flowing period). */
  CasingHeadStabilizedTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The choke diameter. */
  ChokeOrificeSize?: eml.LengthMeasure;
  /** The fluid level achieved in the well. The value is given as length units from the well vertical datum. */
  FluidLevel?: eml.LengthMeasure;
  /** The pressure at the tubing head under stabilized conditions (typically at the end of the flowing period). */
  TubingHeadStabilizedPressure?: eml.AbstractPressureValue;
  /** The temperature at the tubing head under stabilized conditions (typically at the end of the flowing period). */
  TubingHeadStabilizedTemperature?: eml.ThermodynamicTemperatureMeasure;
}
export interface WellFlowingCondition extends _WellFlowingCondition {}

/** Specifies the types of fluid being produced from or injected into a well facility. */
export type WellFluid =
  | "air"
  | "condensate"
  | "dry"
  | "gas"
  | "gas-water"
  | "non HC gas"
  | "non HC gas -- CO2"
  | "oil"
  | "oil-gas"
  | "oil-water"
  | "steam"
  | "water"
  | "water -- brine"
  | "water -- fresh water";
interface _WellFluid extends eml._TypeEnum {
  _: WellFluid;
}

/** Additional information required for a fluid sample taken from a wellhead. */
interface _WellheadSampleAcquisition extends _FluidSampleAcquisition {
  FlowTestActivity?: eml.DataObjectReference;
  /** A reference to the flow port in the facility where this sample was taken. */
  SamplingPoint?: eml.String64;
  /** A reference to the well (WITSML data object) where this sample was taken. */
  Well?: eml.DataObjectReference;
  /** A reference to the well completion (WITSML data object) where this sample was taken. */
  WellCompletion?: eml.DataObjectReference;
  /** The wellhead pressure when the sample was taken. */
  WellheadPressure: eml.AbstractPressureValue;
  /** The wellhead temperature when the sample was taken. */
  WellheadTemperature: eml.ThermodynamicTemperatureMeasure;
}
export interface WellheadSampleAcquisition extends _WellheadSampleAcquisition {}

/** Specifies the lift methods for producing a well. */
export type WellOperationMethod =
  | "continuous gas lift"
  | "electric submersible pump lift"
  | "foam lift"
  | "hydraulic pump lift"
  | "intermittent gas lift"
  | "jet pump lift"
  | "natural flow"
  | "plunger gas lift"
  | "progressive cavity pump lift"
  | "sucker rod pump lift"
  | "unknown";
interface _WellOperationMethod extends eml._TypeEnum {
  _: WellOperationMethod;
}

/** Captures well production parameters associated with a well reporting entity. */
interface _WellProductionParameters extends _AbstractSimpleProductVolume {
  /** The ending date of the reporting period. */
  EndDate?: Date;
  /** Name or identifier for the reporting period to which the well production parameters apply. */
  NominalPeriod?: ReportingDurationKindExt;
  /** Details of production at a specific choke setting. */
  ProductionPeriod: ProductionWellPeriod[];
  /** The starting date of the reporting period. */
  StartDate?: Date;
}
export interface WellProductionParameters extends _WellProductionParameters {}

export interface document extends BaseType {
  AssetProductionVolumes: AssetProductionVolumes;
  Channel: Channel;
  ChannelSet: ChannelSet;
  DasAcquisition: DasAcquisition;
  DasInstrumentBox: DasInstrumentBox;
  DtsInstalledSystem: DtsInstalledSystem;
  DtsInstrumentBox: DtsInstrumentBox;
  DtsMeasurement: DtsMeasurement;
  Facility: Facility;
  FiberOpticalPath: FiberOpticalPath;
  FlowTestActivity: FlowTestActivity;
  FlowTestJob: FlowTestJob;
  FluidAnalysis: FluidAnalysis;
  FluidCharacterization: FluidCharacterization;
  FluidSample: FluidSample;
  FluidSampleAcquisitionJob: FluidSampleAcquisitionJob;
  FluidSampleContainer: FluidSampleContainer;
  FluidSystem: FluidSystem;
  HydrocarbonAnalysis: HydrocarbonAnalysis;
  OTDRAcquisition: OTDRAcquisition;
  PressureTransientAnalysis: PressureTransientAnalysis;
  ProductFlowModel: ProductFlowModel;
  ProductionOperation: ProductionOperation;
  ProductionWellTests: ProductionWellTests;
  ProductVolume: ProductVolume;
  PtaDataPreProcess: PtaDataPreProcess;
  PtaDeconvolution: PtaDeconvolution;
  Report: Report;
  ReportingEntity: ReportingEntity;
  ReportingHierarchy: ReportingHierarchy;
  TerminalLifting: TerminalLifting;
  TimeSeriesData: TimeSeriesData;
  TimeSeriesStatistic: TimeSeriesStatistic;
  Transfer: Transfer;
  WaterAnalysis: WaterAnalysis;
  WellProductionParameters: WellProductionParameters;
}
export const document: document;
