import * as Primitive from "../../../xml-primitives";
import * as eml from "./commonv2";

// Source files:
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/BhaRun.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/CementJob.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/DepthRegImage.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/DownholeComponent.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/DrillReport.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/FluidsReport.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/Log.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/MudLogReport.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/OpsReport.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/PPFG.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/PWLS.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/Rig.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/Risk.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/StimJob.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/SurveyProgram.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/Target.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/ToolErrorModel.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/Trajectory.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/Tubular.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/Well.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/WellCMLedger.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/WellCompletion.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/Wellbore.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/WellboreCompletion.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/WellboreGeology.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/WellboreGeometry.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/WellboreMarkers.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/WitsmlAllObjects.xsd
// http://172.21.32.1:3000/witsml/v2.1/xsd_schemas/WitsmlCommon.xsd

declare module "./commonv2" {
  export interface _AbstractDataObjectProxyType {
    BhaRun?: BhaRun;
    CementJob?: CementJob;
    CementJobEvaluation?: CementJobEvaluation;
    Channel?: Channel;
    ChannelKind?: ChannelKind;
    ChannelKindDictionary?: ChannelKindDictionary;
    ChannelSet?: ChannelSet;
    CuttingsGeology?: CuttingsGeology;
    DepthRegImage?: DepthRegImage;
    DownholeComponent?: DownholeComponent;
    DrillReport?: DrillReport;
    ErrorTerm?: ErrorTerm;
    ErrorTermDictionary?: ErrorTermDictionary;
    FluidsReport?: FluidsReport;
    InterpretedGeology?: InterpretedGeology;
    Log?: Log;
    LoggingToolKind?: LoggingToolKind;
    LoggingToolKindDictionary?: LoggingToolKindDictionary;
    MudLogReport?: MudLogReport;
    OpsReport?: OpsReport;
    PPFGChannel?: PPFGChannel;
    PPFGChannelSet?: PPFGChannelSet;
    PPFGLog?: PPFGLog;
    Rig?: Rig;
    RigUtilization?: RigUtilization;
    Risk?: Risk;
    ShowEvaluation?: ShowEvaluation;
    StimJob?: StimJob;
    StimJobStage?: StimJobStage;
    StimPerforationCluster?: StimPerforationCluster;
    SurveyProgram?: SurveyProgram;
    Target?: Target;
    ToolErrorModel?: ToolErrorModel;
    ToolErrorModelDictionary?: ToolErrorModelDictionary;
    Trajectory?: Trajectory;
    Tubular?: Tubular;
    WeightingFunction?: WeightingFunction;
    WeightingFunctionDictionary?: WeightingFunctionDictionary;
    Well?: Well;
    Wellbore?: Wellbore;
    WellboreCompletion?: WellboreCompletion;
    WellboreGeology?: WellboreGeology;
    WellboreGeometry?: WellboreGeometry;
    WellboreMarker?: WellboreMarker;
    WellboreMarkerSet?: WellboreMarkerSet;
    WellCMLedger?: WellCMLedger;
    WellCompletion?: WellCompletion;
  }
}
interface BaseType {
  _exists: boolean;
  _namespace: string;
  $type?: string;
}
/** One of either circulating or static temperature */
interface _AbstractBottomHoleTemperature extends BaseType {
  /** Bottomhole temperature for the job or reporting period. */
  BottomHoleTemperature: eml.ThermodynamicTemperatureMeasure;
}
export interface AbstractBottomHoleTemperature
  extends _AbstractBottomHoleTemperature {}

/** Defines common elements for both cement job designs and reports. */
interface _AbstractCementJob extends BaseType {
  /** Cementing engineer. */
  CementEngr?: eml.String64;
  /** Pointer to a BusinessAssociate representing the cementing contractor. */
  Contractor?: eml.DataObjectReference;
  /** Duration for waiting on cement to set. */
  ETimWaitingOnCement?: eml.TimeMeasure;
  /** Pipe reciprocation: stroke length. */
  LenPipeRecipStroke?: eml.LengthMeasure;
  /** Measured depth at the bottom of  the hole. */
  MdHole?: eml.MeasuredDepth;
  /** String-up weight during reciprocation. */
  OverPull?: eml.ForceMeasure;
  /** If plug used,  measured depth interval between the top and base of the plug. */
  PlugInterval?: eml.MdInterval;
  /** Is the pipe being reciprocated (raised and lowered)?
   * Values are "true" (or "1") and "false" (or "0"). */
  Reciprocating?: boolean;
  /** Pipe rotation rate (commonly in rotations per minute (RPM)). */
  RpmPipe?: eml.AngularVelocityMeasure;
  /** Pipe reciprocation (RPM). */
  RpmPipeRecip?: eml.AngularVelocityMeasure;
  /** String-down weight during reciprocation. */
  SlackOff?: eml.ForceMeasure;
  /** Pipe rotation: initial torque. */
  TqInitPipeRot?: eml.MomentOfForceMeasure;
  /** Pipe rotation: average torque. */
  TqPipeAv?: eml.MomentOfForceMeasure;
  /** Pipe rotation: maximum torque. */
  TqPipeMx?: eml.MomentOfForceMeasure;
}
export interface AbstractCementJob extends _AbstractCementJob {}

/** Defines the information that is common to the cement job stage design and reports. */
interface _AbstractCementStage extends BaseType {
  /** Annular flow present after the stage was completed?  Values are "true" (or "1") and "false" (or "0"). */
  AnnularFlowAfter?: boolean;
  /** Bottom plug used?  Values are "true" (or "1") and "false" (or "0"). */
  BotPlug?: boolean;
  /** Amount of bottom plug used. */
  BotPlugNumber?: number;
  /** Tail pipe size (diameter). */
  DiaTailPipe?: eml.LengthMeasure;
  /** Reference to displacement fluid properties. */
  DisplacementFluid?: eml.ComponentReference;
  EndingFluidLocation?: FluidLocation[];
  /** Time the pressure was held. */
  ETimPresHeld?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Rate the mud was circulated during the stage. */
  FlowrateMudCirc?: eml.VolumePerTimeMeasure;
  /** Gels-10Min (in hole at start of job). */
  Gel10Min?: eml.PressureMeasure;
  /** Gels-10Sec (in hole at start of job). */
  Gel10Sec?: eml.PressureMeasure;
  /** Circulate out measured depth. */
  MdCircOut?: eml.MeasuredDepth;
  /** Measured depth of coil tubing (multi-stage cement job). */
  MdCoilTbg?: eml.MeasuredDepth;
  /** Measured depth of string (multi-stage cement job). */
  MdString?: eml.MeasuredDepth;
  /** Measured depth of the tool (multi-stage cement job). */
  MdTool?: eml.MeasuredDepth;
  /** Mix method. */
  MixMethod?: eml.String64;
  /** Stage number. */
  NumStage: number;
  OriginalFluidLocation?: FluidLocation[];
  /** Pill below plug?  Values are "true" (or "1") and "false" (or "0"). */
  PillBelowPlug?: boolean;
  /** Plug catcher?  Values are "true" (or "1") and "false" (or "0"). */
  PlugCatcher?: boolean;
  /** Constant back pressure applied while pumping the job (can be superseded by a back pressure per pumping stage). */
  PresBackPressure?: eml.PressureMeasure;
  /** Pressure plug bumped. */
  PresBump?: eml.PressureMeasure;
  /** Pressure coiled tubing end. */
  PresCoilTbgEnd?: eml.PressureMeasure;
  /** Pressure coiled tubing start */
  PresCoilTbgStart?: eml.PressureMeasure;
  /** Casing pressure at the end of the job. */
  PresCsgEnd?: eml.PressureMeasure;
  /** Casing pressure at the start of the job. */
  PresCsgStart?: eml.PressureMeasure;
  /** Final displacement pressure. */
  PresDisplace?: eml.PressureMeasure;
  /** Pressure held to. */
  PresHeld?: eml.PressureMeasure;
  /** Mud circulation pressure. */
  PresMudCirc?: eml.PressureMeasure;
  /** Tubing pressure at the end of the job (not coiled tubing). */
  PresTbgEnd?: eml.PressureMeasure;
  /** Tubing pressure at the start of the job (not coiled tubing). */
  PresTbgStart?: eml.PressureMeasure;
  /** Plastic viscosity (in the hole at the start of the job). */
  PvMud?: eml.DynamicViscosityMeasure;
  /** Overpull amount for reciprocation. */
  ReciprocationOverpull?: eml.ForceMeasure;
  /** Slackoff for reciprocation. */
  ReciprocationSlackoff?: eml.ForceMeasure;
  /** Squeeze objective. */
  SqueezeObjective?: eml.String64;
  /** Measured depth interval for the cement stage. */
  StageMdInterval?: eml.MdInterval;
  Step?: CementPumpScheduleStep[];
  /** Tail pipe perforated?  Values are "true" (or "1") and "false" (or "0"). */
  TailPipePerf?: boolean;
  /** Tail pipe used?  Values are "true" (or "1") and "false" (or "0"). */
  TailPipeUsed?: boolean;
  /** Bottomhole temperature: circulating. */
  TempBHCT?: eml.ThermodynamicTemperatureMeasure;
  /** Bottomhole temperature: static. */
  TempBHST?: eml.ThermodynamicTemperatureMeasure;
  /** Top plug used?  Values are "true" (or "1") and "false" (or "0"). */
  TopPlug?: boolean;
  /** Type of mud in the hole. */
  TypeOriginalMud?: eml.String64;
  /** Stage type. */
  TypeStage: eml.String64;
  /** Total volume circulated before starting the job/stage. */
  VolCircPrior?: eml.VolumeMeasure;
  /** Total volume inside the casing for this stage placement. */
  VolCsgIn?: eml.VolumeMeasure;
  /** Total volume outside casing for this stage placement. */
  VolCsgOut?: eml.VolumeMeasure;
  /** Volume of displacement fluid. */
  VolDisplaceFluid?: eml.VolumeMeasure;
  /** Excess volume. */
  VolExcess?: eml.VolumeMeasure;
  /** Method to estimate excess volume. */
  VolExcessMethod?: eml.String64;
  /** Total mud lost. */
  VolMudLost?: eml.VolumeMeasure;
  /** Volume of returns. */
  VolReturns?: eml.VolumeMeasure;
  /** Mud density. */
  WtMud?: eml.MassPerVolumeMeasure;
  /** Yield point (in the hole at the start of the job). */
  YpMud?: eml.PressureMeasure;
}
export interface AbstractCementStage extends _AbstractCementStage {}

/** The choice of connection type. */
interface _AbstractConnectionType extends BaseType {}
export interface AbstractConnectionType extends _AbstractConnectionType {}

/** Event extension schema. */
interface _AbstractEventExtension extends BaseType {}
export interface AbstractEventExtension extends _AbstractEventExtension {}

/** Item weight or volume per unit. */
interface _AbstractItemWtOrVolPerUnit extends BaseType {}
export interface AbstractItemWtOrVolPerUnit
  extends _AbstractItemWtOrVolPerUnit {}

interface _AbstractOperatingRange extends BaseType {
  Comment?: eml.String2000;
  End: number;
  /** Is the end inclusive or exclusive in the range. */
  EndInclusive: boolean;
  Start: number;
  /** Is the start inclusive or exclusive in the range. */
  StartInclusive: boolean;
}
export interface AbstractOperatingRange extends _AbstractOperatingRange {}

/** Choice placeholder in a rotary steerable tool. */
interface _AbstractRotarySteerableTool extends BaseType {}
export interface AbstractRotarySteerableTool
  extends _AbstractRotarySteerableTool {}

export type AccelerometerAxisCombination = "xy" | "xyz";
interface _AccelerometerAxisCombination extends eml._TypeEnum {
  _: AccelerometerAxisCombination;
}

/** Information on fractionation event. */
interface _AcidizeFracExtension extends _AbstractEventExtension {
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to a StimJob. */
  StimJobID?: eml.DataObjectReference;
}
export interface AcidizeFracExtension extends _AcidizeFracExtension {}

interface _AnchorState extends BaseType {
  /** Angle of the anchor or mooring line. */
  AnchorAngle?: eml.PlaneAngleMeasure;
  /** The anchor number within a mooring system, or name if a name is used instead. */
  AnchorName: eml.String64;
  /** Tension on the mooring line represented by the named anchor. */
  AnchorTension?: eml.ForceMeasure;
  /** Free-test description of the state of this anchor or mooring line. */
  Description?: eml.String2000;
}
export interface AnchorState extends _AnchorState {}

/** Container element for assemblies, or a collection of all assembly information. */
interface _Assembly extends BaseType {
  Part?: StringEquipment[];
}
export interface Assembly extends _Assembly {}

interface _Authorization extends BaseType {
  ApprovalAuthority: eml.String64;
  ApprovedBy?: eml.String64;
  ApprovedOn?: eml.TimeStamp;
  CheckedBy?: eml.String64;
  CheckedOn?: eml.TimeStamp;
  RevisionComment?: eml.String2000;
  RevisionDate?: eml.TimeStamp;
  Status?: AuthorizationStatus;
}
export interface Authorization extends _Authorization {}

export type AuthorizationStatus = "agreed" | "provisional" | "obsolete";
interface _AuthorizationStatus extends eml._TypeEnum {
  _: AuthorizationStatus;
}

interface _AzimuthFormula extends BaseType {
  Formula: eml.String2000;
  Parameter?: Parameter[];
}
export interface AzimuthFormula extends _AzimuthFormula {}

interface _AzimuthRange extends _PlaneAngleOperatingRange {
  /** True = magnetic north,
   * False = True North */
  IsMagneticNorth: boolean;
}
export interface AzimuthRange extends _AzimuthRange {}

/** Backup scale types. */
export type BackupScaleType = "x10" | "offscale left/right" | "other";
interface _BackupScaleType extends eml._TypeEnum {
  _: BackupScaleType;
}

/** Specifies the bearing type of a motor. */
export type BearingType = "oil seal" | "mud lube" | "other";
interface _BearingType extends eml._TypeEnum {
  _: BearingType;
}

/** An estimated wind strength based on the Beaufort Wind Scale. Values range from 0 (calm) to 12 (hurricane).@pattern .+ */
export type BeaufortScaleIntegerCode = number;
type _BeaufortScaleIntegerCode = Primitive._number;

/** Tubular Bend Component Schema. */
interface _Bend extends BaseType {
  /** Unique identifier for this instance of Bend. */
  uid: eml.String64;
  /** Angle of the bend. */
  Angle?: eml.PlaneAngleMeasure;
  /** Distance of the bend from the bottom of the component. */
  DistBendBot?: eml.LengthMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
}
export interface Bend extends _Bend {}

/** Used with point-the-bit type of rotary steerable system tools; describes the angle of the bit. */
interface _BendAngle extends _AbstractRotarySteerableTool {
  /** The angle of the bend. */
  BendAngle?: eml.PlaneAngleMeasure;
}
export interface BendAngle extends _BendAngle {}

/** Used with point-the-bit type of rotary steerable system tools; describes the angle of the bit. */
interface _BendOffset extends _AbstractRotarySteerableTool {
  /** Offset distance from the bottom connection to the bend. */
  BendOffset?: eml.LengthMeasure;
}
export interface BendOffset extends _BendOffset {}

/** The object used to capture information about one run of the drill string into and out of the hole. The drill string configuration is described in the Tubular object. That is, one drill string configuration may be used for many runs. */
interface _BhaRun extends eml._AbstractObject {
  /** Actual dogleg severity. */
  ActDogleg?: eml.AnglePerLengthMeasure;
  /** Actual dogleg severity: maximum. */
  ActDoglegMx?: eml.AnglePerLengthMeasure;
  /** This is the status of the Bharun, not the Bha. */
  BhaRunStatus?: BhaStatus;
  DrillingParams?: DrillingParams[];
  /** Date and time that activities for this run started. */
  DTimStart?: eml.TimeStamp;
  /** Start on bottom: date and time. */
  DTimStartDrilling?: eml.TimeStamp;
  /** Date and time that activities for this run stopped. */
  DTimStop?: eml.TimeStamp;
  /** Stop off bottom: date and time. */
  DTimStopDrilling?: eml.TimeStamp;
  /** Bit run number. */
  NumBitRun?: number;
  /** The BHA (drilling string) run number. */
  NumStringRun?: number;
  /** Objective of the bottomhole assembly. */
  ObjectiveBha?: eml.String2000;
  /** Planned dogleg severity. */
  PlanDogleg?: eml.AnglePerLengthMeasure;
  /** Reason for a trip. */
  ReasonTrip?: eml.String2000;
  Tubular?: eml.DataObjectReference;
  Wellbore: eml.DataObjectReference;
}
export interface BhaRun extends _BhaRun {}

/** Stage of the BHA Run (plan, progress, final) */
export type BhaStatus = "final" | "progress" | "plan";
interface _BhaStatus extends eml._TypeEnum {
  _: BhaStatus;
}

/** Information on bottom hole pressure during this event. */
interface _BHPExtension extends _AbstractEventExtension {
  /** Reference to bottom hole pressure */
  BHPRefID?: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
}
export interface BHPExtension extends _BHPExtension {}

/** Specifies the reason a drill bit was declared inoperable; these codes were originally defined by the IADC. */
export type BitDullCode =
  | "BC"
  | "BF"
  | "BT"
  | "BU"
  | "CC"
  | "CD"
  | "CI"
  | "CR"
  | "CT"
  | "ER"
  | "FC"
  | "HC"
  | "JD"
  | "LC"
  | "LN"
  | "LT"
  | "NO"
  | "NR"
  | "OC"
  | "PB"
  | "PN"
  | "RG"
  | "RO"
  | "RR"
  | "SD"
  | "SS"
  | "TR"
  | "WO"
  | "WT";
interface _BitDullCode extends eml._TypeEnum {
  _: BitDullCode;
}

/** Specifies the reason for pulling a drill bit from the wellbore, these codes were originally defined by the IADC. */
export type BitReasonPulled =
  | "BHA"
  | "CM"
  | "CP"
  | "DMF"
  | "DP"
  | "DST"
  | "DTF"
  | "FM"
  | "HP"
  | "HR"
  | "LOG"
  | "PP"
  | "PR"
  | "RIG"
  | "TD"
  | "TQ"
  | "TW"
  | "WC";
interface _BitReasonPulled extends eml._TypeEnum {
  _: BitReasonPulled;
}

/** Bit Record Component Schema. Captures information that describes the bit and problems with the bit. Many of the problems are classified using IADC codes that are specified as enumerated lists in WITSML. */
interface _BitRecord extends BaseType {
  /** Unique identifier for this instance of BitRecord. */
  uid: eml.String64;
  /** N = new, U = used. */
  BitClass?: eml.String64;
  /** IADC bit code. */
  CodeIADC?: eml.String64;
  /** The manufacturer's code for the bit. */
  CodeMfg?: eml.String64;
  /** Final condition of the bit bearings (integer 0-8 or E, F, N or X). */
  CondFinalBearing?: IadcBearingWearCode;
  /** Final dull condition from the IADC bit-wear 2-character codes. */
  CondFinalDull?: BitDullCode;
  /** Final condition of the bit gauge in 1/16 of a inch. I = in gauge, else number of 16ths out of gauge. */
  CondFinalGauge?: eml.String64;
  /** Final condition of the inner tooth rows (inner 2/3 of bit) (0-8). */
  CondFinalInner?: IadcIntegerCode;
  /** Final conditions for row and cone numbers for items that need location information (e.g., cracked cone, lost cone, etc). */
  CondFinalLocation?: eml.String64;
  /** Other final comments on bit condition from the IADC list (BitDullCode enumerated list). */
  CondFinalOther?: eml.String64;
  /** Final condition of the outer tooth rows (outer 1/3 of bit) (0-8). */
  CondFinalOuter?: IadcIntegerCode;
  /** Final reason the bit was pulled from IADC codes (BitReasonPulled enumerated list). */
  CondFinalReason?: BitReasonPulled;
  /** Initial condition of the bit bearings (integer 0-8 or E, F, N or X). */
  CondInitBearing?: IadcBearingWearCode;
  /** Initial dull condition from the IADC bit-wear 2-character codes. */
  CondInitDull?: BitDullCode;
  /** Initial condition of the bit gauge in 1/16 of an inch. I = in gauge, else the number of 16ths out of gauge. */
  CondInitGauge?: eml.String64;
  /** Initial condition of the inner tooth rows (inner 2/3 of the bit) (0-8). */
  CondInitInner?: IadcIntegerCode;
  /** Initial row and cone numbers for items that need location information (e.g., cracked cone, lost cone, etc). */
  CondInitLocation?: eml.String64;
  /** Other comments on initial bit condition from the IADC list (BitDullCode enumerated list). */
  CondInitOther?: eml.String64;
  /** Initial condition of the outer tooth rows (outer 1/3 of bit) (0-8). */
  CondInitOuter?: IadcIntegerCode;
  /** Initial reason the bit was pulled from IADC codes (BitReasonPulled enumerated list). */
  CondInitReason?: BitReasonPulled;
  Cost?: eml.Cost;
  /** Diameter of the drilled hole. */
  DiaBit: eml.LengthMeasure;
  /** Minimum hole or tubing diameter that the bit will pass through (for bi-center bits). */
  DiaPassThru?: eml.LengthMeasure;
  /** Diameter of the pilot bit (for bi-center bits). */
  DiaPilot?: eml.LengthMeasure;
  /** Bit drive type (motor, rotary table, etc.). */
  Drive?: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Pointer to a BusinessAssociate representing the manufacturer or supplier of the item. */
  Manufacturer?: eml.DataObjectReference;
  /** Bit number and rerun number, e.g., "4.1" for the first rerun of bit 4. */
  NumBit?: eml.String64;
  /** Type of bit. */
  TypeBit?: BitType;
}
export interface BitRecord extends _BitRecord {}

/** Specifies the  values that represent the type of drill or core bit. */
export type BitType =
  | "diamond"
  | "diamond core"
  | "insert roller cone"
  | "PDC"
  | "PDC core"
  | "roller cone";
interface _BitType extends eml._TypeEnum {
  _: BitType;
}

/** Blade shape of the stabilizer: melon, spiral, straight, etc. */
export type BladeShapeType =
  | "dynamic"
  | "melon"
  | "spiral"
  | "straight"
  | "variable";
interface _BladeShapeType extends eml._TypeEnum {
  _: BladeShapeType;
}

/** Specifies the blade type of the stabilizer. */
export type BladeType = "clamp-on" | "integral" | "sleeve" | "welded";
interface _BladeType extends eml._TypeEnum {
  _: BladeType;
}

/** Rig blowout preventer (BOP) schema. */
interface _Bop extends BaseType {
  /** Type of accumulator/description. */
  Accumulator?: eml.String64;
  BopComponent?: BopComponent[];
  /** Accumulator fluid capacity. */
  CapAccFluid?: eml.VolumeMeasure;
  /** Description of the control system. */
  DescControlManifold?: eml.String2000;
  /** Diameter of the diverter. */
  DiaDiverter?: eml.LengthMeasure;
  /** Date and time the BOP was installed. */
  DTimInstall?: eml.TimeStamp;
  /** Date and time of the BOP was removed. */
  DTimRemove?: eml.TimeStamp;
  /** Inner diameter of the booster line. */
  IdBoosterLine?: eml.LengthMeasure;
  /** Inner diameter of the choke line. */
  IdChkLine?: eml.LengthMeasure;
  /** Inner diameter of the kill line. */
  IdKillLine?: eml.LengthMeasure;
  /** Inner diameter of the surface line. */
  IdSurfLine?: eml.LengthMeasure;
  /** Length of the booster line along the riser. */
  LenBoosterLine?: eml.LengthMeasure;
  /** Length of the choke line along the riser. */
  LenChkLine?: eml.LengthMeasure;
  /** Length of the kill line. */
  LenKillLine?: eml.LengthMeasure;
  /** Length of the surface line the along riser. */
  LenSurfLine?: eml.LengthMeasure;
  /** Pointer to a BusinessAssociate representing the manufacturer or supplier of the item. */
  Manufacturer?: eml.DataObjectReference;
  /** Manufacturer's designated model. */
  Model?: eml.String64;
  /** An identification tag for the blowout preventer. A serial number is a type of identification tag; however, some tags contain many pieces of information.This element only identifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** Outer diameter of the booster line. */
  OdBoosterLine?: eml.LengthMeasure;
  /** Outer diameter of the choke line. */
  OdChkLine?: eml.LengthMeasure;
  /** Outer diameter of the kill line. */
  OdKillLine?: eml.LengthMeasure;
  /** Outer diameter of the surface line. */
  OdSurfLine?: eml.LengthMeasure;
  /** Accumulator operating pressure rating. */
  PresAccOpRating?: eml.PressureMeasure;
  /** Accumulator pre-charge pressure. */
  PresAccPreCharge?: eml.PressureMeasure;
  /** Maximum pressure rating of the blowout preventer. */
  PresBopRating: eml.PressureMeasure;
  /** Choke manifold pressure. */
  PresChokeManifold?: eml.PressureMeasure;
  /** Working rating pressure of the component. */
  PresWorkDiverter?: eml.PressureMeasure;
  /** Is this a rotating blowout preventer? Values are "true" (or "1") and "false" (or "0"). */
  RotBop?: boolean;
  /** Maximum tubulars passable through the blowout preventer. */
  SizeBopSys: eml.LengthMeasure;
  /** Size of the connection to the blowout preventer. */
  SizeConnectionBop?: eml.LengthMeasure;
  /** Type of choke manifold. */
  TypeChokeManifold?: eml.String64;
  /** Type of connection to the blowout preventer. */
  TypeConnectionBop?: eml.String64;
  /** The blowout preventer control system. */
  TypeControlManifold?: eml.String64;
  /** Diverter description. */
  TypeDiverter?: eml.String64;
  /** Accumulator pre-charge volume */
  VolAccPreCharge?: eml.VolumeMeasure;
}
export interface Bop extends _Bop {}

/** Blowout Preventer Component Schema. */
interface _BopComponent extends BaseType {
  /** Unique identifier for this instance of BopComponent */
  uid: eml.String64;
  /** Description of the component. */
  DescComp?: eml.String64;
  /** Minimum diameter of the component it will seal. */
  DiaCloseMn?: eml.LengthMeasure;
  /** Maximum diameter of the component it will seal. */
  DiaCloseMx?: eml.LengthMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Inner diameter that tubulars can pass through. */
  IdPassThru?: eml.LengthMeasure;
  /** Is ram bore variable or single size? Defaults to false.
   * Values are "true" (or "1") and "false" (or "0"). */
  IsVariable?: boolean;
  /** Arrangement nomenclature for the blowout preventer stack (e.g., S, R, A). */
  Nomenclature?: eml.String64;
  /** Working rating pressure of the component. */
  PresWork?: eml.PressureMeasure;
  /** Type of ram or preventer. */
  TypeBopComp?: BopType;
}
export interface BopComponent extends _BopComponent {}

/** Specifies the type of blowout preventer. */
export type BopType =
  | "annular preventer"
  | "shear ram"
  | "blind ram"
  | "pipe ram"
  | "drilling spool"
  | "flexible joint"
  | "connector";
interface _BopType extends eml._TypeEnum {
  _: BopType;
}

/** Information on the borehole. */
interface _Borehole extends BaseType {
  /** Unique identifier for this instance of Borehole. */
  uid: eml.String64;
  /** Borehole diameter. */
  BoreholeDiameter?: eml.LengthMeasure;
  /** The description of this equipment to be permanently kept. */
  DescriptionPermanent?: eml.String2000;
  EquipmentEventHistory?: EventInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth interval for the borehole. */
  MdInterval?: eml.MdInterval;
  /** The name of the borehole. */
  Name?: eml.String64;
  /** True vertical depth interval for the borehole. */
  TvdInterval?: eml.AbstractTvdInterval;
  /** Type of borehole. etc. cavern, cavity, normal borehole, under ream, etc. */
  TypeBorehole?: BoreholeType;
}
export interface Borehole extends _Borehole {}

/** A section of a borehole. Used to define the drilled hole that corresponds to the wellbore. A collection of contiguous and non-overlapping borehole sections is allowed. Each section has depth range, diameter, and kind. */
interface _BoreholeString extends BaseType {
  /** Unique identifier for this instance of BoreholeString. */
  uid: eml.String64;
  Accessories?: StringAccessory;
  Borehole?: Borehole[];
  GeologyFeature?: GeologyFeature[];
  /** The name of the borehole string. */
  Name?: eml.String64;
  ReferenceWellbore: eml.DataObjectReference;
}
export interface BoreholeString extends _BoreholeString {}

/** Reference to a borehole string. */
interface _BoreholeStringReference extends BaseType {
  /** Reference to a borehole string. */
  BoreholeString: eml.DataObjectComponentReference;
  /** Optional references to string equipment within the BoreholeString. */
  StringEquipment?: eml.ComponentReference[];
}
export interface BoreholeStringReference extends _BoreholeStringReference {}

/** Borehole string container element, or a collection of all borehole strings. */
interface _BoreholeStringSet extends BaseType {
  BoreholeString: BoreholeString[];
}
export interface BoreholeStringSet extends _BoreholeStringSet {}

/** Specifies the values for the type of borehole. */
export type BoreholeType = "cavern" | "cavity" | "normalborehole" | "underream";
interface _BoreholeType extends eml._TypeEnum {
  _: BoreholeType;
}

/** Circulating temperature at the bottom of the hole. */
interface _BottomHoleCirculatingTemperature
  extends _AbstractBottomHoleTemperature {}
export interface BottomHoleCirculatingTemperature
  extends _BottomHoleCirculatingTemperature {}

/** This class is used to represent the bottomhole location of a wellbore. */
interface _BottomHoleLocation extends BaseType {
  /** The bottomhole's position. */
  Location: eml.AbstractPosition;
  /** Additional OSDU-specific metadata about the location. */
  OSDULocationMetadata?: eml.OSDUSpatialLocationIntegration;
}
export interface BottomHoleLocation extends _BottomHoleLocation {}

/** Static temperature at the bottom of the hole. */
interface _BottomHoleStaticTemperature extends _AbstractBottomHoleTemperature {
  /** Elapsed time since circulation stopped. */
  ETimStatic: eml.TimeMeasure;
}
export interface BottomHoleStaticTemperature
  extends _BottomHoleStaticTemperature {}

/** Specifies values that represent the type of box and pin configuration. */
export type BoxPinConfig =
  | "bottom box top box"
  | "bottom box top pin"
  | "bottom pin top pin"
  | "bottom pin top box";
interface _BoxPinConfig extends eml._TypeEnum {
  _: BoxPinConfig;
}

/** Specifies the class of brine. */
export type BrineClass =
  | "calcium bromide"
  | "potassium bromide"
  | "sodium bromide"
  | "zinc dibromide"
  | "ammonium chloride"
  | "calcium chloride"
  | "potassium chloride"
  | "sodium chloride"
  | "cesium formate"
  | "potassium formate"
  | "sodium formate"
  | "blend";
interface _BrineClass extends eml._TypeEnum {
  _: BrineClass;
}

export type BrineClassExt = string;
type _BrineClassExt = Primitive._string;

/** The role of a calibration point in a log depth registration. */
export type CalibrationPointRole =
  | "left edge"
  | "right edge"
  | "fraction"
  | "other";
interface _CalibrationPointRole extends eml._TypeEnum {
  _: CalibrationPointRole;
}

/** Container element for casing connections or collection of all casing connections information. */
interface _CasingConnectionType extends _AbstractConnectionType {
  /** Connection of type casing. */
  CasingConnectionType: CasingConnectionTypes;
}
export interface CasingConnectionType extends _CasingConnectionType {}

/** Specifies the values for connection type of casing. */
export type CasingConnectionTypes =
  | "landed"
  | "self-sealing-threaded"
  | "welded";
interface _CasingConnectionTypes extends eml._TypeEnum {
  _: CasingConnectionTypes;
}

/** Cement Additive Component Schema. */
interface _CementAdditive extends BaseType {
  /** Unique identifier for the additive. */
  uid: eml.String64;
  /** Additive amount. */
  Additive: eml.MassMeasure;
  /** Additive density. */
  DensAdd?: eml.MassPerVolumeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Wet or dry. */
  FormAdd?: eml.String64;
  /** Additive name. */
  NameAdd: eml.String64;
  /** Additive type or function (e.g., retarder, visosifier, weighting agent). */
  TypeAdd?: eml.String64;
}
export interface CementAdditive extends _CementAdditive {}

/** Configuration and other information about the cement stage. */
interface _CementDesignStage extends _AbstractCementStage {}
export interface CementDesignStage extends _CementDesignStage {}

/** Information on cement job event. */
interface _CementExtension extends _AbstractEventExtension {
  /** Reference to a cementJob. */
  CementJob?: eml.DataObjectReference;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
}
export interface CementExtension extends _CementExtension {}

/** Cementing Fluid Component Schema. */
interface _CementingFluid extends BaseType {
  /** Unique identifier for this cementing fluid. */
  uid: eml.String64;
  CementAdditive?: CementAdditive[];
  /** Slurry class. */
  ClassSlurryDryBlend?: eml.String64;
  /** Test thickening consistency/slurry viscosity: Bearden Consistency (Bc) 0 to 100. */
  ConsTestThickening?: eml.DimensionlessMeasure;
  /** Slurry density at pressure. */
  DensAtPres?: eml.MassPerVolumeMeasure;
  /** Density of base fluid. */
  DensBaseFluid?: eml.MassPerVolumeMeasure;
  /** Constant gas ratio method: average density. */
  DensConstGasFoam?: eml.MassPerVolumeMeasure;
  /** Constant gas ratio method: average density. */
  DensConstGasMethod?: eml.MassPerVolumeMeasure;
  /** Density of dry blend. */
  DensDryBlend?: eml.MassPerVolumeMeasure;
  /** Fluid density. */
  Density?: eml.MassPerVolumeMeasure;
  /** Fluid description. */
  DescFluid?: eml.String64;
  /** Description of dry blend. */
  DryBlendDescription?: eml.String64;
  /** Name of dry blend. */
  DryBlendName?: eml.String64;
  /** Compressive strength time 1. */
  ETimComprStren1?: eml.TimeMeasure;
  /** Compressive strength time 2. */
  ETimComprStren2?: eml.TimeMeasure;
  /** Test thickening time. */
  ETimThickening?: eml.TimeMeasure;
  /** The elapsed time between the development of 100lbf/100sq ft gel strength and 500lbf/100 sq ft gel strength. */
  ETimTransitions?: eml.TimeMeasure;
  /** The elapsed time from initiation of the static portion of the test until the slurry attains a gel strength of 100lbf/100sq ft. */
  ETimZeroGel?: eml.TimeMeasure;
  /** Excess percent. */
  ExcessPc?: eml.VolumePerVolumeMeasure;
  /** Fluid Index: 1: first fluid pumped (= original mud), last - 1 = tail cement, last = displacement mud. */
  FluidIndex?: eml.PositiveLong;
  /** Specify one of these models: Newtonian, Bingham, Power Law, and Herschel Bulkley. */
  FluidRheologicalModel?: eml.String64;
  /** Foam used?  Values are "true" (or "1") and "false" (or "0"). */
  FoamUsed?: boolean;
  /** Gel reading after 10 minutes. */
  Gel10MinReading?: eml.PlaneAngleMeasure;
  /** Gel strength after 10 minutes. */
  Gel10MinStrength?: eml.PressureMeasure;
  /** Gel reading after 10 seconds. */
  Gel10SecReading?: eml.PlaneAngleMeasure;
  /** Gel strength after 10 seconds. */
  Gel10SecStrength?: eml.PressureMeasure;
  /** Gel reading after 1 minute. */
  Gel1MinReading?: eml.PlaneAngleMeasure;
  /** Gel strength after 1 minute. */
  Gel1MinStrength?: eml.PressureMeasure;
  /** Consistency index (Power Law and Herschel Bulkley models). */
  K?: eml.DimensionlessMeasure;
  /** Mass of dry blend: the blend is made of different solid additives: the volume is not constant. */
  MassDryBlend?: eml.MassMeasure;
  /** Weight of a sack of dry blend. */
  MassSackDryBlend?: eml.MassMeasure;
  /** Power Law index (Power Law and Herschel Bulkley models). */
  N?: eml.DimensionlessMeasure;
  /** Test free water na: = mL/250ML. */
  PcFreeWater?: eml.VolumePerVolumeMeasure;
  /** Compressive strength pressure 1. */
  PresComprStren1?: eml.PressureMeasure;
  /** Compressive strength pressure 2. */
  PresComprStren2?: eml.PressureMeasure;
  /** Test fluid loss pressure. */
  PresTestFluidLoss?: eml.PressureMeasure;
  /** Test thickening pressure. */
  PresTestThickening?: eml.PressureMeasure;
  /** Purpose description. */
  Purpose?: eml.String64;
  /** Constant gas ratio method ratio. */
  RatioConstGasMethodAv?: eml.VolumePerVolumeMeasure;
  /** Constant gas ratio method: final method ratio. */
  RatioConstGasMethodEnd?: eml.VolumePerVolumeMeasure;
  /** Constant gas ratio method: initial method ratio. */
  RatioConstGasMethodStart?: eml.VolumePerVolumeMeasure;
  /** Mix-water ratio. */
  RatioMixWater?: eml.VolumePerMassMeasure;
  Rheometer?: Rheometer[];
  /** Measured depth interval between the top and base of the slurry placement. */
  SlurryPlacementInterval?: eml.MdInterval;
  /** Equals 1 - Porosity. */
  SolidVolumeFraction?: eml.VolumePerVolumeMeasure;
  /** Water source description. */
  SourceWater?: eml.String64;
  /** Compressive strength temperature 1. */
  TempComprStren1?: eml.ThermodynamicTemperatureMeasure;
  /** Compressive strength temperature 2. */
  TempComprStren2?: eml.ThermodynamicTemperatureMeasure;
  /** Test fluid loss temperature. */
  TempFluidLoss?: eml.ThermodynamicTemperatureMeasure;
  /** Test free water temperature. */
  TempFreeWater?: eml.ThermodynamicTemperatureMeasure;
  /** Test thickening temperature. */
  TempThickening?: eml.ThermodynamicTemperatureMeasure;
  /** Test fluid loss: dehydrating test period, used to compute the API fluid loss. */
  TimeFluidLoss?: eml.TimeMeasure;
  /** Type of base fluid: fresh water, sea water, brine, brackish water. */
  TypeBaseFluid?: eml.String64;
  /** Fluid type: Mud, Wash, Spacer, Slurry. */
  TypeFluid?: eml.String64;
  /** Gas type used for foam job. */
  TypeGasFoam?: eml.String64;
  /** Viscosity (if Newtonian model) or plastic viscosity (if Bingham model). */
  Viscosity?: eml.DynamicViscosityMeasure;
  /** API fluid loss = 2 * volTestFluidLoss * SQRT(30/timefluidloss). */
  VolAPIFluidLoss?: eml.VolumeMeasure;
  /** Volume of cement. */
  VolCement?: eml.VolumeMeasure;
  /** Fluid/slurry volume. */
  VolFluid?: eml.VolumeMeasure;
  /** Volume of gas used for foam job. */
  VolGasFoam?: eml.VolumeMeasure;
  /** Other volume. */
  VolOther?: eml.VolumeMeasure;
  /** Volume pumped. */
  VolPumped?: eml.VolumeMeasure;
  /** Volume reserved. */
  VolReserved?: eml.VolumeMeasure;
  /** Test fluid loss. */
  VolTestFluidLoss?: eml.VolumeMeasure;
  /** Total Slurry Volume. */
  VolTotSlurry?: eml.VolumeMeasure;
  /** Volume of water. */
  VolWater?: eml.VolumeMeasure;
  /** Slurry yield. */
  VolYield?: eml.VolumePerMassMeasure;
  /** Yield point (Bingham and Herschel Bulkley models). */
  Yp?: eml.PressureMeasure;
}
export interface CementingFluid extends _CementingFluid {}

/** Used to capture information about cementing operations, which are done to seal the annulus after a casing string has been run, to seal a lost circulation zone, or to set a plug to support directional drilling operations or seal a well so that it may be abandoned. */
interface _CementJob extends eml._AbstractObject {
  CementingFluid?: CementingFluid[];
  /** Is coiled tubing used?  Values are "true" (or "1") and "false" (or "0"). */
  CoilTubing?: boolean;
  Design?: CementJobDesign;
  HoleConfig?: WellboreGeometryReport;
  /** Job configuration. */
  JobConfig?: eml.String2000;
  JobReport?: CementJobReport;
  /** Type of cement job. */
  JobType?: CementJobType;
  /** Measured depth at bottom of hole. */
  MdHole?: eml.MeasuredDepth;
  /** Measured depth of previous shoe. */
  MdPrevShoe?: eml.MeasuredDepth;
  /** Measured depth of squeeze. */
  MdSqueeze?: eml.MeasuredDepth;
  /** Measured depth of cement string shoe. */
  MdStringSet?: eml.MeasuredDepth;
  /** Water depth if offshore. The distance from mean sea level to water bottom (seabed floor). */
  MdWater?: eml.LengthMeasure;
  /** Name for the cemented string */
  NameCementedString?: eml.String64;
  /** Name for the cementing string */
  NameCementString?: eml.String64;
  /** Name for the cement work string */
  NameWorkString?: eml.String64;
  /** Offshore job? Values are "true" (or "1") and "false" (or "0"). */
  OffshoreJob?: boolean;
  /** Returns to seabed? Values are "true" (or "1") and "false" (or "0"). */
  ReturnsToSeabed?: boolean;
  /** Pointer to a BusinessAssociate representing the company providing the cementing tool. */
  ToolCompany?: eml.DataObjectReference;
  /** True vertical depth of previous shoe. */
  TvdPrevShoe?: eml.AbstractVerticalDepth;
  /** True vertical depth of cement string shoe. */
  TvdStringSet?: eml.AbstractVerticalDepth;
  /** Plug type. */
  TypePlug?: eml.String64;
  /** Type of squeeze. */
  TypeSqueeze?: eml.String64;
  /** Cement tool type. */
  TypeTool?: eml.String64;
  Wellbore: eml.DataObjectReference;
}
export interface CementJob extends _CementJob {}

/** Design and other information about the cement job */
interface _CementJobDesign extends _AbstractCementJob {
  CementDesignStage: CementStageDesign[];
}
export interface CementJobDesign extends _CementJobDesign {}

/** A top-level object that is used to record the testing and evaluation of a previously performed cement job. */
interface _CementJobEvaluation extends eml._AbstractObject {
  /** Cement bond log quality indication?  Values are "true" (or "1") and "false" (or "0"). */
  CblBondQual?: boolean;
  /** Cement bond log under pressure. */
  CblPres?: eml.PressureMeasure;
  /** Cement bond log run?
   * Values are "true" (or "1") and "false" (or "0"). */
  CblRun?: boolean;
  /** Cement found on tool?  Values are "true" (or "1") and "false" (or "0"). */
  CementFoundOnTool?: boolean;
  CementJob: eml.DataObjectReference;
  /** Cement found between shoe and collar?
   * Values are "true" (or "1") and "false" (or "0"). */
  CementShoeCollar?: boolean;
  /** Cement evaluation tool bond quality?  Values are "true" (or "1") and "false" (or "0"). */
  CetBondQual?: boolean;
  /** Cement evaluation tool run?  Values are "true" (or "1") and "false" (or "0"). */
  CetRun?: boolean;
  /** Hours before the liner top test. */
  ETimBeforeTest?: eml.TimeMeasure;
  /** Hours before logging run after cement run. */
  ETimCementLog?: eml.TimeMeasure;
  /** Hours between end of cement job and the start of the pressure integrity test. */
  ETimPitStart?: eml.TimeMeasure;
  /** Elapsed tome to perform the test. */
  ETimTest?: eml.TimeMeasure;
  /** Method used to determine that a cement job was unsuccessful. */
  FailureMethod?: eml.String64;
  /** Pressure integrity test/leak-off test formation breakdown gradient or absolute pressure. */
  FormPit?: eml.ForcePerVolumeMeasure;
  /** Job rating. */
  JobRating?: eml.String64;
  /** Liner overlap length. */
  LinerLap?: eml.LengthMeasure;
  /** The distance to the top of the liner. */
  LinerTop?: eml.LengthMeasure;
  /** Measured depth at top of cement. */
  MdCementTop?: eml.MeasuredDepth;
  /** Measured depth to the diverter tool. */
  MdDVTool?: eml.MeasuredDepth;
  /** Number of remedials. */
  NumRemedial?: number;
  /** Test pressure. */
  PresTest?: eml.PressureMeasure;
  /** Remedial cement required?  Values are "true" (or "1") and "false" (or "0"). */
  RemedialCement?: boolean;
  /** Temperature survey run?  Values are "true" (or "1") and "false" (or "0"). */
  TempSurvey?: boolean;
  /** Equivalent mud weight. Negative test. */
  TestNegativeEmw?: eml.MassPerVolumeMeasure;
  /** Test negative tool used for the liner top seal. */
  TestNegativeTool?: eml.String64;
  /** Equivalent mud weight. Positive test or absolute pressure . */
  TestPositiveEmw?: eml.MassPerVolumeMeasure;
  /** Test positive tool for liner top seal. */
  TestPositiveTool?: eml.String64;
  /** Is the top of cement sufficient?  Values are "true" (or "1") and "false" (or "0"). */
  TocOK?: boolean;
  /** Tool name for the pressure integrity test. */
  ToolCompanyPit?: eml.String64;
  /** Method to determine cement top. */
  TopCementMethod?: eml.String64;
}
export interface CementJobEvaluation extends _CementJobEvaluation {}

/** The as-built report of the job after it has been done. */
interface _CementJobReport extends _AbstractCementJob {
  /** Was the cement drilled out? Values are "true" (or "1") and "false" (or "0"). */
  CementDrillOut?: boolean;
  CementReportStage: CementStageReport[];
  /** Method by which density is measured. */
  DensMeasBy?: eml.String64;
  /** Date and time that the cement was drilled out. */
  DTimCementDrillOut?: eml.TimeStamp;
  /** Date and time of the end of the cement job. */
  DTimJobEnd?: eml.TimeStamp;
  /** Date and time of the start of the cement job. */
  DTimJobStart?: eml.TimeStamp;
  /** Date and time that pipe rotation started. */
  DTimPipeRotEnd?: eml.TimeStamp;
  /** Date and time that pipe rotation started. */
  DTimPipeRotStart?: eml.TimeStamp;
  /** Date and time that cement plug was set. */
  DTimPlugSet?: eml.TimeStamp;
  /** Date and time that pipe reciprocation ended. */
  DTimRecipEnd?: eml.TimeStamp;
  /** Date and time that pipe reciprocation started. */
  DTimRecipStart?: eml.TimeStamp;
  /** Date and time of a squeeze. */
  DTimSqueeze?: eml.TimeStamp;
}
export interface CementJobReport extends _CementJobReport {}

/** Specifies type of cement job. */
export type CementJobType = "primary" | "plug" | "squeeze";
interface _CementJobType extends eml._TypeEnum {
  _: CementJobType;
}

/** Cement Pump Schedule Component Schema, which defines the cement pumping schedule for a given step in a cement job. */
interface _CementPumpScheduleStep extends BaseType {
  /** Unique identifier for this pump schedule step. */
  uid: eml.String64;
  /** Comments and remarks. */
  Comments?: eml.String2000;
  /** The duration of the fluid pumping. */
  ETimPump?: eml.TimeMeasure;
  /** The duration of the shutdown event. */
  ETimShutdown?: eml.TimeMeasure;
  /** Reference to a fluid used in CementJob. */
  Fluid: eml.ComponentReference;
  /** Back pressure applied during the pumping stage. */
  PresBack?: eml.PressureMeasure;
  /** Rate at which the fluid is pumped. 0 means it is a pause. */
  RatePump?: eml.VolumePerTimeMeasure;
  /** The ratio of excess fluid to total fluid pumped during the step. */
  RatioFluidExcess?: eml.VolumePerVolumeMeasure;
  /** Number of pump strokes for the fluid to be pumped (assumes the pump output is known). */
  StrokePump?: number;
  /** Volume pumped = eTimPump * ratePump. */
  VolPump?: eml.VolumeMeasure;
}
export interface CementPumpScheduleStep extends _CementPumpScheduleStep {}

/** Configuration and other information about the cement stage. */
interface _CementStageDesign extends _AbstractCementStage {}
export interface CementStageDesign extends _CementStageDesign {}

/** Report of key parameters for a stage of cement job. */
interface _CementStageReport extends _AbstractCementStage {
  /** Unique identifier for this instance of CementStageReport */
  uid: eml.String64;
  /** Date and time when displacing of cement started. */
  DTimDisplaceStart?: eml.TimeStamp;
  /** Date and time when mixing of cement started. */
  DTimMixStart?: eml.TimeStamp;
  /** Date and time when pumping cement ended. */
  DTimPumpEnd?: eml.TimeStamp;
  /** Date and time when pumping cement started. */
  DTimPumpStart?: eml.TimeStamp;
  /** Elapsed time of mud circulation before the job/stage. */
  ETimMudCirculation?: eml.TimeMeasure;
  /** Float held?  Values are "true" (or "1") and "false" (or "0"). */
  FloatHeld?: boolean;
  /** Breakdown rate. */
  FlowrateBreakDown?: eml.VolumePerTimeMeasure;
  /** Average displacement rate. */
  FlowrateDisplaceAv?: eml.VolumePerTimeMeasure;
  /** Maximum displacement rate. */
  FlowrateDisplaceMx?: eml.VolumePerTimeMeasure;
  /** Final displacement pump rate. */
  FlowrateEnd?: eml.VolumePerTimeMeasure;
  /** Pump rate at the end of the job. */
  FlowratePumpEnd?: eml.VolumePerTimeMeasure;
  /** Pump rate at the start of the job. */
  FlowratePumpStart?: eml.VolumePerTimeMeasure;
  /** Squeeze job average rate. */
  FlowrateSqueezeAv?: eml.VolumePerTimeMeasure;
  /** Squeeze job maximum rate. */
  FlowrateSqueezeMx?: eml.VolumePerTimeMeasure;
  /** Plug bumped? Values are "true" (or "1") and "false" (or "0"). */
  PlugBumped?: boolean;
  /** Breakdown pressure. */
  PresBreakDown?: eml.PressureMeasure;
  /** Pressure before bumping plug / pressure at the end of  the displacement. */
  PresPriorBump?: eml.PressureMeasure;
  /** Squeeze pressure left on pipe. */
  PresSqueeze?: eml.PressureMeasure;
  /** Squeeze pressure average. */
  PresSqueezeAv?: eml.PressureMeasure;
  /** Squeeze pressure final. */
  PresSqueezeEnd?: eml.PressureMeasure;
  /** Squeeze pressure held.  Values are "true" (or "1") and "false" (or "0"). */
  PresSqueezeHeld?: boolean;
  /** Squeeze obtained.  Values are "true" (or "1") and "false" (or "0"). */
  SqueezeObtained?: boolean;
  /** Funnel viscosity in seconds (in hole at start of job/stage). */
  VisFunnelMud?: eml.TimeMeasure;
}
export interface CementStageReport extends _CementStageReport {}

/** Rig Centrifuge Schema. */
interface _Centrifuge extends BaseType {
  /** Unique identifier for this instance of Centrifuge. */
  uid: eml.String64;
  /** Maximum pump rate at which the unit efficiently operates. */
  CapFlow?: eml.VolumePerTimeMeasure;
  /** Date and time the centrifuge was installed. */
  DTimInstall?: eml.TimeStamp;
  /** Date and time the centrifuge was removed. */
  DTimRemove?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Pointer to a BusinessAssociate representing the manufacturer or supplier of the item. */
  Manufacturer?: eml.DataObjectReference;
  /** Manufacturer's designated model. */
  Model?: eml.String64;
  /** An identification tag for the centrifuge.
   * A serial number is a type of identification tag; however, some tags contain many pieces of information.This element only identifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** Pointer to a BusinessAssociate representing the contractor/owner. */
  Owner?: eml.DataObjectReference;
  /** Description for the type of object. */
  Type?: eml.String64;
}
export interface Centrifuge extends _Centrifuge {}

/** A channel object. It corresponds roughly to the LogCurveInfo structure in WITSML1411, and directly corresponds to the ChannelMetadataRecord structure in ETP. In historian terminology, a channel corresponds directly to a tag.
 * Channels are the fundamental unit of organization for WITSML logs.
 * BUSINESS RULE: The Uom MUST be compatible with the QuantityClass of the PropertyKind specified in ChannelClass. */
interface _Channel extends eml._AbstractActiveObject {
  AxisDefinition?: LogChannelAxis[];
  /** An optional value pointing to a ChannelKind.
   * Energistics provides a list of standard channel kinds from the Practical Well Logging Standard (PWLS).
   * This ChannelKind enumeration is in the external ChannelKindDictionary XML file in the WITSML ancillary folder. */
  ChannelKind?: eml.DataObjectReference;
  /** Information about a Channel that is relevant for OSDU integration but does not have a natural place in a Channel object. */
  ChannelOSDUIntegration?: ChannelOSDUIntegration;
  /** A mandatory value pointing to a PropertyKind.
   * Energistics provides a list of standard property kinds that represent the basis for the commonly used properties in the E&P subsurface workflow.
   * This PropertyKind enumeration is in the external PropertyKindDictionary XML file in the Common ancillary folder. */
  ChannelPropertyKind: eml.DataObjectReference;
  /** Defines where the channel gets its data from, e.g., calculated from another source, or from archive, or raw real-time, etc. */
  ChannelState?: ChannelState;
  /** STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  Data?: ChannelData;
  /** The kind of channel data value for this channel.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  DataKind: ChannelDataKind;
  DataSource?: eml.DataObjectReference;
  /** Pointer to a reference point that defines a vertical datum that channel data values that are measured depth or vertical depth values are referenced to. This is NOT an datum for index values. See Datum in ChannelIndex for the datum for index values.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Datum?: eml.DataObjectReference;
  /** Indicates how data in the channel is derived. */
  Derivation?: ChannelDerivation;
  /** This element is to be used in conjunction with the Derivation element. When Derivation indicates that a process was used to generate this channel, DerivedFrom may point to the channel or channels used in the process of generating this channel. */
  DerivedFrom?: eml.DataObjectReference[];
  /** A standardized mnemonic name for this channel. */
  GlobalMnemonic: eml.String64;
  /** The status of the hole at the time of logging. */
  HoleLoggingStatus?: HoleLoggingStatus;
  /** Defines metadata about the channel's primary and secondary indexes. The first index is the primary index. Any additional indexes are secondary indexes. */
  Index: ChannelIndex[];
  /** If true, the channel data values are continues values, such as sampled measurement values. If false, the channel data values are discrete, such as rig activity codes. */
  IsContinuous?: boolean;
  /** Pointer to a BusinessAssociate representing the logging company. */
  LoggingCompany: eml.DataObjectReference;
  /** The RP66 organization code assigned to a logging company. The list is available at http://www.energistics.org/geosciences/geology-standards/rp66-organization-codes */
  LoggingCompanyCode?: number;
  /** Defines where the log channel gets its data from: LWD, MWD, wireline; or whether it is computed, etc. */
  LoggingMethod?: LoggingMethod;
  /** A value categorizing a logging tool. The classification system used in WITSML is the one from the PWLS group. */
  LoggingToolClass?: LoggingToolClassExt;
  /** An optional value pointing to a LoggingToolKind.
   * Energistics provides a list of standard logging tool kinds from the Practical Well Logging Standard (PWLS).
   * This LoggingToolKind enumeration is in the external LoggingToolKindDictionary XML file in the WITSML ancillary folder. */
  LoggingToolKind?: eml.DataObjectReference;
  /** The mnemonic name for this channel. Mnemonics are not unique within a store.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Mnemonic: eml.String64;
  /** The class of the drilling fluid at the time of logging. */
  MudClass?: MudClassExt;
  /** The subclass of drilling fluid at the time of logging. */
  MudSubClass?: MudSubClassExt;
  /** The nominal hole size at the time the measurement tool was in the hole. The size is "nominal" to indicate that this is not the result of a caliper reading or other direct measurement of the hole size, but is just a name used to refer to the diameter. This is normally the bit size.
   * In a case where there are more than one diameter hole being drilled at the same time (like where a reamer is behind the bit) this diameter is the one which was seen by the sensor which produced a particular log channel. */
  NominalHoleSize?: eml.LengthMeasureExt;
  /** For regularly sampled channel data, this represents the nominal sampling interval. This should not be set when data is not regularly sampled. */
  NominalSamplingInterval?: eml.GenericMeasure;
  /** The nominal pass description for the pass such as Calibration Pass, Main Pass, Repeated Pass. Use PassDetail instead if the channel contains information about several passes using PassIndexedDepth. */
  PassDescription?: eml.String64;
  /** Details about one or more passes when using PassIndexedDepth. */
  PassDetail?: PassDetail[];
  /** The nominal pass number for the channel. No precise meaning is declared for this attribute but it is so commonly used that it must be included.
   *
   * The value here should match a wireline pass number for logging data. Use PassDetail instead if the channel contains information about several passes using PassIndexedDepth.. */
  PassNumber?: eml.String64;
  PointMetadata?: PointMetadata[];
  /** The primary index value range for the channel. This MUST reflect the minimum and maximum primary index values for data points in the channel. This is independent of the direction for the primary index. This MUST be specified when there are data points in the channel, and it MUST NOT be specified when there are no data points in the channel.
   *
   * STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  PrimaryIndexInterval?: eml.AbstractInterval;
  /** The nominal run number for the channel. No precise meaning is declared for this attribute but it is so commonly used that it must be included.
   *
   * The value here should match a bit run number for LWD data and a wireline run number for logging data. */
  RunNumber?: eml.String64;
  /** Pointer to a reference point that defines the seismic reference elevation. This should only be populated if the channel represents time-depth relationships or checkshots. */
  SeismicReferenceElevation?: eml.DataObjectReference;
  /** The consistent distance from the downhole equipment vertical reference (the drill bit, for MWD logs; the tool zero reference for wireline logs) at which the channel values are measured or calculated. This is typically, but not always, the distance from the bit to the sensor. This element is only informative (channel values are presented at actual depth, not requiring subtraction of an offset). */
  SensorOffset?: eml.LengthMeasureExt;
  /** Source of the data in the channel. Enter the contractor name who conducted the log. */
  Source?: eml.String64;
  /** The underlying unit of measure of the value.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Uom: eml.UnitOfMeasureExt;
  Wellbore?: eml.DataObjectReference;
}
export interface Channel extends _Channel {}

/** Contains the bulk data for the log, either as a base64-encoded string or as a reference to an external file. */
interface _ChannelData extends BaseType {
  /** The data blob in JSON form. This attribute lets you embed the bulk data in a single file with the xml, to avoid the issues that arise when splitting data across multiple files.
   *
   * BUSINESS RULE: Either this element or the FileUri element must be present.
   *
   * STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  Data?: string;
  /** The URI of a file containing the bulk data. If this field is non-null, then the data field is ignored. For files written to disk, this should normally contain a simple file name in relative URI form. For example, if an application writes a log file to disk, it might write the xml as abc.xml, and the bulk data as abc.avro. In this case, the value of this element would be './abc.avro'.
   *
   * BUSINESS RULE: Either this element or the Data element must be present. */
  FileUri?: string;
}
export interface ChannelData extends _ChannelData {}

/** Specifies the kind of data contained in a channel. */
export type ChannelDataKind =
  | "boolean"
  | "bytes"
  | "double"
  | "float"
  | "int"
  | "long"
  | "string"
  | "measured depth"
  | "true vertical depth"
  | "pass indexed depth"
  | "date time"
  | "elapsed time";
interface _ChannelDataKind extends eml._TypeEnum {
  _: ChannelDataKind;
}

/** Specifies the source of data in a channel. */
export type ChannelDerivation =
  | "raw"
  | "simulated"
  | "spliced"
  | "sampled"
  | "model"
  | "interpreted"
  | "corrected"
  | "edited";
interface _ChannelDerivation extends eml._TypeEnum {
  _: ChannelDerivation;
}

/** Common information about a primary or secondary index for a channel or channel set. */
interface _ChannelIndex extends BaseType {
  /** For depth indexes, this is a pointer to the reference point defining the vertical datum, in a channel's Well object, to which all of the index values are referenced.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Datum?: eml.DataObjectReference;
  /** The direction of the index, either increasing or decreasing. Index direction may not change within the life of a channel or channel set. This only affects the order in which data is streamed or serialized.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Direction: eml.IndexDirection;
  /** The index value range for this index for the channel or channel set. This MUST reflect the minimum and maximum index values for this index for data points in the channel or channel set. This is independent of the direction for the primary index. This MUST be specified when there are data points in the channel or channel set, and it MUST NOT be specified when there are no data points in the channel or channel set.
   *
   * STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  IndexInterval?: eml.AbstractInterval;
  /** The kind of index (date time, measured depth, etc.).
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  IndexKind: eml.DataIndexKind;
  /** An optional value pointing to a PropertyKind.
   * Energistics provides a list of standard property kinds that represent the basis for the commonly used properties in the E&P subsurface workflow.
   * This PropertyKind enumeration is in the external PropertyKindDictionary XML file in the Common ancillary folder.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  IndexPropertyKind?: eml.DataObjectReference;
  /** The mnemonic for the index.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Mnemonic: eml.String64;
  /** The unit of measure of the index. Must be one of the units allowed for the specified IndexKind (e.g., time or depth).
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Uom: eml.UnitOfMeasureExt;
}
export interface ChannelIndex extends _ChannelIndex {}

/** Common information about a kind of channel, such as channels produced by a sensor on a specific type of equipment. For example, a kind could represent the gamma ray channels from a specific gamma ray logging tool from a specific logging company. */
interface _ChannelKind extends eml._AbstractObject {
  /** The RP66 organization code assigned to the logging company. The list is available at http://www.energistics.org/geosciences/geology-standards/rp66-organization-codes */
  LoggingCompanyCode: number;
  /** Name of the logging company that creates this kind of channel. */
  LoggingCompanyName: eml.String256;
  /** The kind of logging tool that creates this kind of channel. */
  LoggingToolKind?: eml.DataObjectReference[];
  /** The mnemonic for this kind of channel. */
  Mnemonic: eml.String64;
  /** The LIS mnemonic for this kind of channel. */
  MnemonicLIS?: eml.String64;
  /** The kind of property for this kind of channel. */
  PropertyKind: eml.DataObjectReference;
}
export interface ChannelKind extends _ChannelKind {}

interface _ChannelKindDictionary extends eml._AbstractObject {
  ChannelKind: ChannelKind[];
}
export interface ChannelKindDictionary extends _ChannelKindDictionary {}

/** Information about a Channel that is relevant for OSDU integration but does not have a natural place in a Channel object. */
interface _ChannelOSDUIntegration extends BaseType {
  /** The business value of the channel. */
  ChannelBusinessValue?: eml.String64;
  /** The detailed Geological Physical Quantity measured by the channel such as neutron porosity. */
  ChannelFamily?: eml.String64;
  /** The Geological Physical Quantity measured by the channel such as porosity. */
  ChannelMainFamily?: eml.String64;
  /** The quality of the channel. */
  ChannelQuality?: eml.String64;
  /** Pointer to a BusinessAssociate that represents the company who engaged the service company (ServiceCompany) to perform the logging. */
  IntermediaryServiceCompany?: eml.DataObjectReference;
  /** Boolean property indicating the sampling mode of the primary index. True means all channel data values are regularly spaced (see NominalSamplingInterval); false means irregular or discrete sample spacing. */
  IsRegular?: boolean;
  /** Optional time reference for time-based primary indexes. The ISO date time string representing zero time. Not to be confused with seismic travel time zero. */
  ZeroTime?: eml.TimeStamp;
}
export interface ChannelOSDUIntegration extends _ChannelOSDUIntegration {}

/** A grouping of channels with a compatible index, for some purpose. Each channel has its own index. A ‘compatible’ index simply means that all of the channels are either in time or in depth using a common datum. */
interface _ChannelSet extends eml._AbstractActiveObject {
  Channel?: Channel[];
  /** Information about a ChannelSet that is relevant for OSDU integration but does not have a natural place in a ChannelSet object. */
  ChannelSetOSDUIntegration?: ChannelSetOSDUIntegration;
  /** Defines where the channel gets its data from, e.g., calculated from another source, or from archive, or raw real-time, etc. */
  ChannelState?: ChannelState;
  Data?: ChannelData;
  DataSource?: eml.DataObjectReference;
  /** The nominal derivation for channels in the channel set. Individual channels may have a different derivation. */
  Derivation?: ChannelDerivation;
  /** The nominal status of the hole at the time of logging. Individual channels may have been logged while the hole was in a different state. */
  HoleLoggingStatus?: HoleLoggingStatus;
  /** Defines metadata about the channel set's primary and secondary indexes. The first index is the primary index. Any additional indexes are secondary indexes. A channel set MUST specify this for at least a primary index if it has any channels in it. A channel set MAY specify these indexes even if it has no channels. All channels within the channel set MUST have indexes that are compatible with these indexes. */
  Index?: ChannelIndex[];
  /** Pointer to a BusinessAssociate representing the logging company. */
  LoggingCompany?: eml.DataObjectReference;
  /** The RP66 organization code assigned to a logging company. The list is available at http://www.energistics.org/geosciences/geology-standards/rp66-organization-codes */
  LoggingCompanyCode?: number;
  /** Defines where the log channel gets its data from: LWD, MWD, wireline; or whether it is computed, etc */
  LoggingMethod?: LoggingMethod;
  /** A value categorizing a logging tool. The classification system used in WITSML is the one from the PWLS group. */
  LoggingToolClass?: LoggingToolClassExt;
  /** A long concatenation of the tools used for the logging service such as GammaRay+NeutronPorosity. */
  LoggingToolClassLongName?: eml.String256;
  /** An optional value pointing to a LoggingToolKind.
   * Energistics provides a list of standard logging tool kinds from the Practical Well Logging Standard (PWLS).
   * This LoggingToolKind enumeration is in the external LoggingToolKindDictionary XML file in the WITSML ancillary folder. */
  LoggingToolKind?: eml.DataObjectReference;
  /** The nominal class of the drilling fluid at the time of logging. Individual channels may have been logged while a different drilling fluid was in use. */
  MudClass?: MudClassExt;
  /** The nominal subclass of drilling fluid at the time of logging. Individual channels may have been logged while a different drilling fluid was in use. */
  MudSubClass?: MudSubClassExt;
  /** The nominal hole size at the time the measurement tool was in the hole. The size is "nominal" to indicate that this is not the result of a caliper reading or other direct measurement of the hole size, but is just a name used to refer to the diameter. This is normally the bit size.
   *
   * In a case where there are more than one diameter hole being drilled at the same time (like where a reamer is behind the bit) this diameter is the one which was seen by the sensor which produced a particular log channel. */
  NominalHoleSize?: eml.LengthMeasureExt;
  /** For regularly sampled channel data, this represents the nominal sampling interval. This should only be set when it is representative for channels in the channel set. Individual channels may have a different nominal sampling interval. */
  NominalSamplingInterval?: eml.GenericMeasure;
  /** The nominal pass description for the pass such as Calibration Pass, Main Pass, Repeated Pass. Use PassDetail instead if the channel set contains information about several passes using PassIndexedDepth. */
  PassDescription?: eml.String64;
  /** Details about one or more passes when using PassIndexedDepth. */
  PassDetail?: PassDetail[];
  /** The nominal pass number for the channel set. No precise meaning is declared for this attribute but it is so commonly used that it must be included.
   *
   * The value here should match a wireline pass number for logging data.
   * Use PassDetail instead if the channel set contains information about several passes using PassIndexedDepth. */
  PassNumber?: eml.String64;
  /** The primary index value range for the channel set. This MUST reflect the minimum and maximum primary index values for any channels in the channel set. This is independent of the direction for the primary index. This MUST be specified when there is at least one channel in the channel set with data points, and it MUST NOT be specified when there are no channels with data points in the channel set.
   *
   * STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  PrimaryIndexInterval?: eml.AbstractInterval;
  /** The nominal run number for the channel. No precise meaning is declared for this attribute but it is so commonly used that it must be included.
   *
   * The value here should match a bit run number for LWD data and a wireline run number for logging data. */
  RunNumber?: eml.String64;
  Wellbore?: eml.DataObjectReference;
}
export interface ChannelSet extends _ChannelSet {}

/** Information about a ChannelSet that is relevant for OSDU integration but does not have a natural place in a ChannelSet object. */
interface _ChannelSetOSDUIntegration extends BaseType {
  /** The channel set version. Distinct from objectVersion. */
  ChannelSetVersion?: eml.String64;
  /** For multi-frame or multi-section files, this identifier defines the source frame in the file. If the identifier is an index number the index starts with zero and is converted to a string for this property. */
  FrameIdentifier?: eml.String64;
  /** Pointer to a BusinessAssociate that represents the company who engaged the service company (ServiceCompany) to perform the logging. */
  IntermediaryServiceCompany?: eml.DataObjectReference;
  /** Boolean property indicating the sampling mode of the primary index. True means all channel data values are regularly spaced (see NominalSamplingInterval); false means irregular or discrete sample spacing. */
  IsRegular?: boolean;
  /** Optional time reference for time-based primary indexes. The ISO date time string representing zero time. Not to be confused with seismic travel time zero. */
  ZeroTime?: eml.TimeStamp;
}
export interface ChannelSetOSDUIntegration extends _ChannelSetOSDUIntegration {}

/** Specifies the source of the data values in the channel, e.g., calculated from another source, or from archive, or raw real-time, etc. */
export type ChannelState =
  | "calculated"
  | "final"
  | "memory"
  | "processed"
  | "real time";
interface _ChannelState extends eml._TypeEnum {
  _: ChannelState;
}

/** Analysis done to determine the components in a show. */
interface _Chromatograph extends BaseType {
  /** Acetylene. */
  Acetylene?: eml.VolumePerVolumeMeasure;
  Channel?: eml.DataObjectReference;
  /** Measured interval related to the chromatograph results. */
  ChromatographMdInterval?: eml.MdInterval;
  /** Chromatograph type. */
  ChromatographType?: eml.String64;
  /** Chromatograph integrator report time; format may be variable due to recording equipment. */
  ChromReportTime?: eml.TimeStamp;
  /** Carbon Dioxide ppm (average). */
  Co2Av?: eml.VolumePerVolumeMeasure;
  /** Carbon Dioxide ppm (minimum). */
  Co2Mn?: eml.VolumePerVolumeMeasure;
  /** Carbon Dioxide ppm (maximum). */
  Co2Mx?: eml.VolumePerVolumeMeasure;
  /** The date and time at which the gas sample was processed. */
  DateTimeGasSampleProcessed?: eml.TimeStamp;
  /** neo-Pentane (eC5) ppm (average). */
  EpentAv?: eml.VolumePerVolumeMeasure;
  /** neo-Pentane (eC5) ppm (minimum). */
  EpentMn?: eml.VolumePerVolumeMeasure;
  /** neo-Pentane (eC5) ppm (maximum). */
  EpentMx?: eml.VolumePerVolumeMeasure;
  /** Ethane (C2) ppm (average). */
  EthAv?: eml.VolumePerVolumeMeasure;
  /** Ethane (C2) ppm (minimum). */
  EthMn?: eml.VolumePerVolumeMeasure;
  /** Ethane (C2) ppm (maximum). */
  EthMx?: eml.VolumePerVolumeMeasure;
  /** Chromatograph cycle time. Commonly in seconds. */
  ETimChromCycle?: eml.TimeMeasure;
  /** Hydrogen Sulfide (average) ppm. */
  H2sAv?: eml.VolumePerVolumeMeasure;
  /** Hydrogen Sulfide (minimum) ppm. */
  H2sMn?: eml.VolumePerVolumeMeasure;
  /** Hydrogen Sulfide (maximum) ppm. */
  H2sMx?: eml.VolumePerVolumeMeasure;
  /** iso-Butane (iC4) ppm (average). */
  IbutAv?: eml.VolumePerVolumeMeasure;
  /** iso-Butane (iC4) ppm (minimum). */
  IbutMn?: eml.VolumePerVolumeMeasure;
  /** iso-Butane (iC4) ppm (maximum). */
  IbutMx?: eml.VolumePerVolumeMeasure;
  /** iso-Hexane (iC6) ppm (average). */
  IhexAv?: eml.VolumePerVolumeMeasure;
  /** iso-Hexane (iC6) ppm (minimum). */
  IhexMn?: eml.VolumePerVolumeMeasure;
  /** iso-Hexane (iC6) ppm (maximum). */
  IhexMx?: eml.VolumePerVolumeMeasure;
  /** iso-Pentane (iC5) ppm (average). */
  IpentAv?: eml.VolumePerVolumeMeasure;
  /** iso-Pentane (iC5) ppm (minimum). */
  IpentMn?: eml.VolumePerVolumeMeasure;
  /** iso-Pentane (iC5) ppm (maximum). */
  IpentMx?: eml.VolumePerVolumeMeasure;
  /** Methane (C1) ppm (average). */
  MethAv?: eml.VolumePerVolumeMeasure;
  /** Methane (C1) ppm (minimum). */
  MethMn?: eml.VolumePerVolumeMeasure;
  /** Methane (C1) ppm (maximum). */
  MethMx?: eml.VolumePerVolumeMeasure;
  /** Mud density in (active pits). */
  MudWeightIn?: eml.MassPerVolumeMeasure;
  /** Mud density out (flowline). */
  MudWeightOut?: eml.MassPerVolumeMeasure;
  /** nor-Butane (nC4) ppm (average). */
  NbutAv?: eml.VolumePerVolumeMeasure;
  /** nor-Butane (nC4) ppm (minimum). */
  NbutMn?: eml.VolumePerVolumeMeasure;
  /** nor-Butane (nC4) ppm (maximum). */
  NbutMx?: eml.VolumePerVolumeMeasure;
  /** nor-Hexane (nC6) ppm (average). */
  NhexAv?: eml.VolumePerVolumeMeasure;
  /** nor-Hexane (nC6) ppm (minimum). */
  NhexMn?: eml.VolumePerVolumeMeasure;
  /** nor-Hexane (nC6) ppm (maximum). */
  NhexMx?: eml.VolumePerVolumeMeasure;
  /** nor-Pentane (nC5) ppm (average). */
  NpentAv?: eml.VolumePerVolumeMeasure;
  /** nor-Pentane (nC5) ppm (minimum). */
  NpentMn?: eml.VolumePerVolumeMeasure;
  /** nor-Pentane (nC5) ppm (maximum). */
  NpentMx?: eml.VolumePerVolumeMeasure;
  /** Propane (C3) ppm (average). */
  PropAv?: eml.VolumePerVolumeMeasure;
  /** Propane (C3) ppm (minimum). */
  PropMn?: eml.VolumePerVolumeMeasure;
  /** Propane (C3) ppm (maximum). */
  PropMx?: eml.VolumePerVolumeMeasure;
}
export interface Chromatograph extends _Chromatograph {}

/** Information on clean fill event. */
interface _CleanFillExtension extends _AbstractEventExtension {
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** method of fill and cleaning */
  FillCleaningMethod?: eml.String64;
  /** the size of the tool */
  ToolSize?: eml.LengthMeasure;
}
export interface CleanFillExtension extends _CleanFillExtension {}

/** Specifies the values for the type of inside or outside coating of this piece of equipment. */
export type Coating =
  | "bare"
  | "carbonnitrided"
  | "carburized"
  | "carburized-hardened"
  | "cementlined"
  | "chrome"
  | "chrome-plated"
  | "chromeplated-grooved"
  | "chromeplated-heavy"
  | "corrosion coating"
  | "dblgalv"
  | "duolin20wr"
  | "duoline"
  | "duoline10"
  | "duoline20"
  | "epdm"
  | "fiberglass-lined"
  | "galvanized"
  | "hardened"
  | "hard-lined"
  | "ins"
  | "ipc"
  | "ipc-epoxy"
  | "ipc-epxthk"
  | "ipc-epxthn"
  | "ipc-nylon"
  | "ipc-rwrap"
  | "ipc-s505"
  | "ipc-s650"
  | "ipc-tk70"
  | "ipc-tk75"
  | "lp"
  | "moly"
  | "mtr"
  | "n/a"
  | "nickel-carbide"
  | "nickel-plated"
  | "nitrided"
  | "nitrile"
  | "pap"
  | "pelined"
  | "phosphate"
  | "phosphorus"
  | "plastic"
  | "plunger-lubricant"
  | "polished-rodliner"
  | "polypropylene"
  | "ppw/nitrl"
  | "pvclined"
  | "rodguide-1"
  | "rodguide-2"
  | "rodguide-2."
  | "rodguide-3"
  | "rodguide-4"
  | "rodguide-5"
  | "rodguide-6"
  | "rodguide-7"
  | "rodguide-fx"
  | "rodguide-so"
  | "rodguide-so1"
  | "rodguide-so2"
  | "rodguide-so3"
  | "rodguide-so4"
  | "rodguide-so5"
  | "rodguide-so6"
  | "rodguide-so8"
  | "rodguide-sp"
  | "spray-metal"
  | "spray-metal-monel"
  | "spraymetal-monel"
  | "spraymetal-nickel"
  | "spraymetal-od/nickelplated-id"
  | "spraymetal-steel"
  | "spraymetal-thick"
  | "sslined"
  | "teflon"
  | "teflon-red"
  | "teflon-tan"
  | "teflon-yellow"
  | "thermo"
  | "tk-4"
  | "tk-99"
  | "tuffr"
  | "tungsten plated"
  | "zincplated";
interface _Coating extends eml._TypeEnum {
  _: Coating;
}

/** Specifies the values of the status of a wellbore completion. */
export type CompletionStatus =
  | "active"
  | "inactive"
  | "permanently abandoned"
  | "planned"
  | "suspended"
  | "temporarily abandoned"
  | "testing";
interface _CompletionStatus extends eml._TypeEnum {
  _: CompletionStatus;
}

/** Information on the collection of Completion StatusHistory. */
interface _CompletionStatusHistory extends BaseType {
  /** Unique identifier for this instance of CompletionStatusHistory. */
  uid: eml.String64;
  /** Comments or remarks on the status. */
  Comment?: eml.String2000;
  /** The end date of the status. */
  EndDate?: eml.TimeStamp;
  /** Measured depth interval between the top and the base of the perforations. */
  PerforationMdInterval?: eml.MdInterval;
  /** The start date of the status. */
  StartDate?: eml.TimeStamp;
  /** Completion status. */
  Status?: CompletionStatus;
}
export interface CompletionStatusHistory extends _CompletionStatusHistory {}

/** Specifies the values for mud log parameters that are measured in units of concentration. */
export type ConcentrationParameterKind = "cuttings gas";
interface _ConcentrationParameterKind extends eml._TypeEnum {
  _: ConcentrationParameterKind;
}

/** Tubular Connection Component Schema. Describes dimensions and properties of a connection between tubulars. */
interface _Connection extends BaseType {
  /** Unique identifier for this instance of Connection. */
  uid: eml.String64;
  /** For bending stiffness ratio. */
  CriticalCrossSection?: eml.AreaMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Inside diameter of the connection. */
  Id?: eml.LengthMeasure;
  /** Length of the item. */
  Len?: eml.LengthMeasure;
  /** Outside diameter of the body of the item. */
  Od?: eml.LengthMeasure;
  /** Where connected. */
  Position?: ConnectionPosition;
  /** Leak pressure rating. */
  PresLeak?: eml.PressureMeasure;
  /** Thread size. */
  SizeThread?: eml.LengthMeasure;
  /** Yield stress of steel: worn stress. */
  TensYield?: eml.PressureMeasure;
  /** Make-up torque. */
  TqMakeup?: eml.MomentOfForceMeasure;
  /** Torque at which yield occurs. */
  TqYield?: eml.MomentOfForceMeasure;
  /** Thread type from API RP7G, 5CT. */
  TypeThread?: eml.String64;
}
export interface Connection extends _Connection {}

/** Specifies the values for the type of equipment-to-equipment connection. */
export type ConnectionFormType =
  | "box"
  | "flange"
  | "mandrel"
  | "pin"
  | "welded";
interface _ConnectionFormType extends eml._TypeEnum {
  _: ConnectionFormType;
}

/** Specifies the position of a connection. */
export type ConnectionPosition = "both" | "bottom" | "top";
interface _ConnectionPosition extends eml._TypeEnum {
  _: ConnectionPosition;
}

/** Information on a collection of contact intervals. Contains one or more “xxxInterval” objects, each representing the details of a single physical connection between well and reservoir, e.g., the perforation details, depth, reservoir connected. Meaning: this is the physical nature of a connection from reservoir to wellbore. */
interface _ContactIntervalSet extends BaseType {
  GravelPackInterval?: GravelPackInterval[];
  OpenHoleInterval?: OpenHoleInterval[];
  PerforationSetInterval?: PerforationSetInterval[];
  SlotsInterval?: SlotsInterval[];
}
export interface ContactIntervalSet extends _ContactIntervalSet {}

interface _ContinuousAzimuthFormula extends _AzimuthFormula {
  GyroAxis?: GyroAxisCombination;
}
export interface ContinuousAzimuthFormula extends _ContinuousAzimuthFormula {}

interface _ContinuousGyro extends BaseType {
  AxisCombination: GyroAxisCombination;
  ExtensionNameValue?: eml.ExtensionNameValue[];
  GyroReinitializationDistance?: eml.LengthMeasureExt;
  Initialization?: eml.PlaneAngleMeasureExt;
  NoiseReductionFactor?: number;
  Range: PlaneAngleOperatingRange;
  Speed?: eml.LengthPerTimeMeasureExt;
}
export interface ContinuousGyro extends _ContinuousGyro {}

export type CorrectionConsidered =
  | "depth"
  | "dual inclinometer"
  | "sag"
  | "cosag"
  | "axial magnetic interference"
  | "drill string magnetic interference"
  | "international geomagnetic reference field"
  | "high resolution geomagnetic model"
  | "in field referencing 1"
  | "in field referencing 2"
  | "in hole referencing"
  | "single station analysis"
  | "multi station analysis";
interface _CorrectionConsidered extends eml._TypeEnum {
  _: CorrectionConsidered;
}

export type CorrectionConsideredExt = string;
type _CorrectionConsideredExt = Primitive._string;

interface _CustomOperatingRange extends _AbstractOperatingRange {
  Title: eml.String64;
  Uom: eml.UomEnum;
}
export interface CustomOperatingRange extends _CustomOperatingRange {}

/** Container for Cuttings Lithology items. The mud logger at the wellsite takes regular samples of drilled cuttings while the well is being drilled and examines the cuttings to determine the rock types (lithologies) present in each sample. The cuttings samples will typically contain a mix of different lithologies in each sample because there may have been multiple rock types that were drilled within the sample depth interval and there can also be mixing of cuttings as they travel up the wellbore and are collected on the shakers. CuttingsGeology therefore will typically contain multiple lithology elements for each interval so that the percentages of each lithology in the sample along with the more detailed geological description can be recorded. */
interface _CuttingsGeology extends eml._AbstractMdGrowingObject {
  CuttingsGeologyInterval?: CuttingsGeologyInterval[];
  Wellbore: eml.DataObjectReference;
}
export interface CuttingsGeology extends _CuttingsGeology {}

/** A depth range along the wellbore containing one or more lithology types and information about how the cuttings were sampled. These intervals can be sent via ETP using the GrowingObject protocol. */
interface _CuttingsGeologyInterval extends eml._AbstractMdIntervalGrowingPart {
  /** Time required for a sample to leave the bottomhole and reach the surface. */
  BottomsUpTime: eml.TimeMeasure;
  /** Calcimetry calcite percentage. */
  Calcite?: eml.VolumePerVolumeMeasure;
  /** Calcimetry stabilized percentage. */
  CalcStab?: eml.VolumePerVolumeMeasure;
  /** Cuttings cationic exchange capacity. Temporarily calling this a DimensionlessMeasure. */
  Cec?: eml.DimensionlessMeasure;
  /** Sample treatment: cleaning method. */
  CleaningMethod?: eml.String64;
  CuttingsIntervalLithology?: CuttingsIntervalLithology[];
  /** Sample bulk density for the interval. */
  DensBulk?: eml.MassPerVolumeMeasure;
  /** Shale density for the interval. */
  DensShale?: eml.MassPerVolumeMeasure;
  /** Calcimetry dolomite percentage. */
  Dolomite?: eml.VolumePerVolumeMeasure;
  /** Sample treatment: drying method. */
  DryingMethod?: eml.String64;
  /** Fluorescence as measured using a device licensed for the Quantitative Fluorescence Technique. */
  Qft?: eml.IlluminanceMeasure;
  /** Maximum size. */
  SizeMax?: eml.LengthMeasure;
  /** Minimum size. */
  SizeMin?: eml.LengthMeasure;
}
export interface CuttingsGeologyInterval extends _CuttingsGeologyInterval {}

/** The description of a single rock type in this interval. Can include one or more CuttingsIntervalShow objects for hydrocarbon show evaluation of the individual lithology. */
interface _CuttingsIntervalLithology extends BaseType {
  /** Unique identifier for this instance of CuttingsIntervalLithology. */
  uid?: eml.String64;
  /** An ISO 19115 EIP-derived set of metadata attached to ensure the traceability of the CuttingsIntervalLithology. */
  Citation?: eml.Citation;
  /** An optional custom lithology encoding scheme.
   * If used, it is recommended that the scheme follows the NPD required usage. With the numeric values noted in the enum tables, which was the original intent for this item.
   * The NPD Coding System assigns a digital code to the main lithologies as per the Norwegian Blue Book data standards.
   * The code was then derived by lithology = (main lithology * 10) + cement + (modifier / 100).
   * Example: Calcite cemented silty micaceous sandstone: (33 * 10) + 1 + (21 / 100) gives a numeric code of 331.21.
   * However, the NPD is also working through Energistics/Caesar to potentially change this usage.)
   * This scheme should not be used for mnemonics, because those vary by operator, and if an abbreviation is required, a local look-up table should be used by the rendering client, based on Lithology Type. */
  CodeLith?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology color description, from Shell 1995 4.3.3.1 and 4.3.3.2 colors with the addition of: frosted. e.g., black, blue, brown, buff, green, grey, olive, orange, pink, purple, red, translucent, frosted, white, yellow; modified by: dark, light, moderate, medium, mottled, variegated, slight, weak, strong, and vivid. */
  Color?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology compaction from Shell 1995 4.3.1.5, which includes: not compacted, slightly compacted, compacted, strongly compacted, friable, indurated, hard. */
  Compaction?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Mineral hardness. Typically, this element is rarely used because mineral hardness is not typically recorded.
   * What typically is recorded is compaction. However, this element is retained for use defined as per Mohs scale of mineral hardness. */
  Hardness?: eml.String64;
  /** The geological name for the type of lithology from the enum table listing a subset of the OneGeology/CGI defined formation types. */
  Kind: eml.LithologyKindExt;
  /** Lithology percent. Represents the portion of the sampled interval this lithology type relates to.
   * The total of the lithologies within an interval should add up to 100 percent.
   * If LithologySource in geology is:
   * - "interpreted" only 100% is allowed.
   * - "core" or "cuttings" then recommended usage is that the creating application uses blocks of 10%. i.e. 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.
   * Ideally the input application should enforce a total of 100% for each defined depth interval.
   * If the total for a depth interval does not add up to 100%, then use the "undifferentiated" code to fill out to 100%. */
  LithPc: eml.VolumePerVolumeMeasure;
  /** STRUCTURED DESCRIPTION USAGE. Lithology matrix/cement description. Terms will be as defined in the enumeration table.
   * e.g., "calcite" (Common) "dolomite", "ankerite" (e.g., North Sea HPHT reservoirs such as Elgin and Franklin have almost pure ankerite cementation) "siderite" (Sherwood sandstones, southern UK typical Siderite cements), "quartz" (grain-to-grain contact cementation or secondary quartz deposition), "kaolinite", "illite" (e.g., Village Fields North Sea), "smectite","chlorite" (Teg, Algeria.). */
  MatrixCement?: eml.MatrixCementKind;
  /** STRUCTURED DESCRIPTION USAGE. Lithology permeability description from Shell 4.3.2.5.
   * In the future, these values would benefit from quantification, e.g., tight, slightly, fairly, highly. */
  Permeability?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Visible porosity fabric description from after Shell 4.3.2.1 and 4.3.2.2: intergranular (particle size greater than 20m), fine interparticle (particle size less than 20m), intercrystalline, intragranular, intraskeletal, intracrystalline, mouldic, fenestral, shelter, framework, stylolitic, replacement, solution, vuggy, channel, cavernous. */
  PorosityFabric?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology visible porosity description.
   * Defined after BakerHughes definitions, as opposed to Shell, which has no linkage to actual numeric estimates.
   * The theoretical maximum porosity for a clastic rock is about 26%, which is normally much reduced by other factors.
   * When estimating porosities use: more than 15% "good"; 10 to 15% "fair"; 5 to 10% "poor"; less than 5% "trace"; 0 "none". */
  PorosityVisible?: eml.String64;
  Qualifier?: LithologyQualifier[];
  /** STRUCTURED DESCRIPTION USAGE. Lithology roundness description from Shell 4.3.1.3. Roundness refers to modal size class: very angular, angular, subangular, subrounded, rounded, well rounded. */
  Roundness?: eml.String64;
  Shows?: CuttingsIntervalShow[];
  /** STRUCTURED DESCRIPTION USAGE. Lithology grain size description. Defined from Shell 4.3.1.1.(Wentworth) modified to remove the ambiguous term pelite.
   * Size ranges in millimeter (or micrometer) and inches.
   * LT 256 mm        LT 10.1 in         "boulder"
   * 64-256 mm        2.5–10.1 in        "cobble";
   * 32–64 mm        1.26–2.5 in       "very coarse gravel"
   * 16–32 mm        0.63–1.26 in        "coarse gravel"
   * 8–16 mm            0.31–0.63 in        "medium gravel"
   * 4–8 mm            0.157–0.31 in        "fine gravel"
   * 2–4 mm            0.079–0.157 in     "very fine gravel"
   * 1–2 mm           0.039–0.079 in    "very coarse sand"
   * 0.5–1 mm        0.020–0.039 in        "coarse sand"
   * 0.25–0.5 mm        0.010–0.020 in     "medium sand"
   * 125–250 um        0.0049–0.010 in        "fine sand"
   * 62.5–125 um      .0025–0.0049 in   "very fine sand"
   * 3.90625–62.5 um        0.00015–0.0025 in    "silt"
   * LT 3.90625 um        LT 0.00015 in        "clay"
   * LT 1 um            LT 0.000039 in        "colloid" */
  SizeGrain?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology sorting description from Shell 4.3.1.2 Sorting: very poorly sorted, unsorted, poorly sorted, poorly to moderately well sorted, moderately well sorted, well sorted, very well sorted, unimodally sorted, bimodally sorted. */
  Sorting?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology sphericity description for the modal size class of grains in the sample, defined as per Shell 4.3.1.4 Sphericity: very elongated, elongated, slightly elongated, slightly spherical, spherical, very spherical. */
  Sphericity?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology matrix texture description from Shell 1995 4.3.2.6: crystalline, (often "feather-edge" appearance on breaking), friable, dull, earthy, chalky, (particle size less than 20m; often exhibits capillary imbibition) visibly particulate, granular, sucrosic, (often exhibits capillary imbibition).
   * Examples: compact interlocking, particulate, (Gradational textures are quite common.) chalky matrix with sucrosic patches, (Composite textures also occur). */
  Texture?: eml.String64;
}
export interface CuttingsIntervalLithology extends _CuttingsIntervalLithology {}

/** A set of measurements or observations on cuttings samples describing the evaluation of a hydrocarbon show based on observation of hydrocarbon staining and fluorescence. For information on procedures for show evaluation, see the WITSML Technical Usage Guide. */
interface _CuttingsIntervalShow extends BaseType {
  /** Unique identifier for this instance of CuttingsIntervalShow. */
  uid: eml.String64;
  /** An ISO 19115 EIP-derived set of metadata attached to ensure the traceability of the CuttingsIntervalShow. */
  Citation?: eml.Citation;
  /** Cut color. */
  CutColor?: eml.String64;
  /** Cut fluorescence color. */
  CutFlorColor?: eml.String64;
  /** Cut fluorescence form. */
  CutFlorForm?: ShowLevel;
  /** Cut fluorescence level. */
  CutFlorLevel?: ShowFluorescence;
  /** Cut fluorescence speed. */
  CutFlorSpeed?: ShowSpeed;
  /** Cut fluorescence strength. */
  CutFlorStrength?: eml.String64;
  /** Cut formulation. */
  CutForm?: ShowLevel;
  /** Cut level (faint, bright, etc.). */
  CutLevel?: eml.String64;
  /** Cut speed. */
  CutSpeed?: ShowSpeed;
  /** Cut strength. */
  CutStrength?: eml.String64;
  /** Description of the cutting solvent used to treat the cuttings. */
  CuttingFluid?: eml.String64;
  /** Impregnated lithology. */
  ImpregnatedLitho?: eml.String64;
  /** Natural fluorescence color. */
  NatFlorColor?: eml.String64;
  /** Natural fluorescence description. */
  NatFlorDesc?: eml.String64;
  /** Natural fluorescence level. */
  NatFlorLevel?: ShowFluorescence;
  /** Natural fluorescence (commonly in percent). */
  NatFlorPc?: eml.AreaPerAreaMeasure;
  /** Description of any hydrocarbon type odors smelled. */
  Odor?: eml.String64;
  /** Residue color. */
  ResidueColor?: eml.String64;
  /** Show Rating. */
  ShowRating?: ShowRating;
  /** Visible stain color. */
  StainColor?: eml.String64;
  /** Visible stain distribution. */
  StainDistr?: eml.String64;
  /** Visible stain (commonly in percent). */
  StainPc?: eml.AreaPerAreaMeasure;
}
export interface CuttingsIntervalShow extends _CuttingsIntervalShow {}

/** Day Cost SchemaSchema. Captures daily cost information for the object (cost item) to which it is attached. */
interface _DayCost extends BaseType {
  /** Unique identifier for this instance of DayCost */
  uid: eml.String64;
  /** Cost for the item for this record. */
  CostAmount?: eml.Cost;
  /** Cost class code. */
  CostClass: eml.String64;
  /** Cost code. */
  CostCode: eml.String64;
  /** Cost group code. */
  CostGroup?: eml.String64;
  /** Description of the cost item. */
  CostItemDescription?: eml.String64;
  /** Cost of each cost item, assume same currency. */
  CostPerItem?: eml.Cost;
  /** Cost subcode. */
  CostSubCode?: eml.String64;
  /** Is this an estimated cost?
   * Values are "true" (or "1") and "false" (or "0"). */
  Estimated?: boolean;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Is this item carried from day to day?
   * Values are "true" (or "1") and "false" (or "0"). */
  IsCarryOver?: boolean;
  /** Is this item a rental?
   * Values are "true" (or "1") and "false" (or "0"). */
  IsRental?: boolean;
  /** The kind of cost item specified (e.g., rig dayrate, joints casing). */
  ItemKind?: eml.UomEnum;
  /** Size of one cost item. */
  ItemSize?: number;
  /** An identification tag for the item. A serial number is a type of identification tag; however, some tags contain many pieces of information. This element only identifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** AFE number that this cost item applies to. */
  NumAFE?: eml.String64;
  /** Invoice number for cost item; the  bill is sent to the operator. */
  NumInvoice?: eml.String64;
  /** Purchase order number provided by the operator. */
  NumPO?: eml.String64;
  /** Serial number. */
  NumSerial?: eml.String64;
  /** The field ticket number issued by the service company on location. */
  NumTicket?: eml.String64;
  /** Vendor number. */
  NumVendor?: eml.String64;
  /** Name of pool/reservoir that this cost item can be accounted to. */
  Pool?: eml.String64;
  /** Number of cost items used that day, e.g., 1 rig dayrate, 30 joints of casing. */
  QtyItem?: number;
  /** Pointer to a BusinessAssociate representing the vendor. */
  Vendor?: eml.DataObjectReference;
}
export interface DayCost extends _DayCost {}

/** Specifies the method used to direct the deviation of the trajectory in directional drilling. */
export type DeflectionMethod = "hybrid" | "point bit" | "push bit";
interface _DeflectionMethod extends eml._TypeEnum {
  _: DeflectionMethod;
}

/** Rig Degasser Schema. */
interface _Degasser extends BaseType {
  /** Unique identifier for this instance of degasser */
  uid: eml.String64;
  /** Flow area of the separator. */
  AreaSeparatorFlow?: eml.AreaMeasure;
  /** Gas vent rate at which the vent line pressure drop exceeds the hydrostatic head because of the mud seal. */
  CapBlowdown?: eml.VolumePerTimeMeasure;
  /** Maximum pump rate at which the unit efficiently operates. */
  CapFlow?: eml.VolumePerTimeMeasure;
  /** Safe gas-separating capacity. */
  CapGasSep?: eml.VolumePerTimeMeasure;
  /** Date and time the degasser was installed. */
  DTimInstall?: eml.TimeStamp;
  /** Date and time the degasser was removed. */
  DTimRemove?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Height of the separator. */
  Height?: eml.LengthMeasure;
  /** Depth of trip-tank fluid level to provide back pressure against the separator flow. */
  HtMudSeal?: eml.LengthMeasure;
  /** Internal diameter of the object. */
  Id?: eml.LengthMeasure;
  /** Internal diameter of the inlet line. */
  IdInlet?: eml.LengthMeasure;
  /** Internal diameter of the vent line. */
  IdVentLine?: eml.LengthMeasure;
  /** Length of the separator. */
  Len?: eml.LengthMeasure;
  /** Length of the vent line. */
  LenVentLine?: eml.LengthMeasure;
  /** Pointer to a BusinessAssociate representing the manufacturer or supplier of the item. */
  Manufacturer?: eml.DataObjectReference;
  /** Manufacturer's designated model. */
  Model?: eml.String64;
  /** An identification tag for the degasser. A serial number is a type of identification tag; however, some tags contain many pieces of information.This element only identifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** Pointer to a BusinessAssociate representing the contractor/owner. */
  Owner?: eml.DataObjectReference;
  /** Pressure rating of the item. */
  PresRating?: eml.PressureMeasure;
  /** Temperature rating of the separator. */
  TempRating?: eml.ThermodynamicTemperatureMeasure;
  /** Description for the type of object. */
  Type?: eml.String64;
}
export interface Degasser extends _Degasser {}

/** A mapping of pixel positions on the log image to rectified or depth-registered positions on the log image. Specifically, pixels along the depth track are tagged with the matching measured depth for that position. */
interface _DepthRegCalibrationPoint extends BaseType {
  /** Unique identifier for the calibration point. */
  uid: eml.String64;
  /** Comments about the log section. */
  Comment?: eml.String2000[];
  /** Facilitates searching for logs based on curve type. */
  CurveName?: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** An intermediate point from the left edge to the right edge. Required when CalibrationPointRole is "fraction"; otherwise, not allowed otherwise.)
   * Used to extrapolate the rectified position of a track boundary that has wandered off the edge of the image. */
  Fraction?: eml.DimensionlessMeasure;
  /** The index (depth or time) for the calibration point.
   * The UOM value must be consistent with the indexType. */
  Index: eml.GenericMeasure;
  Parameter?: DepthRegParameter[];
  Point: DepthRegPoint;
  /** The horizontal position on the grid that the calibration point represents. */
  Role: CalibrationPointRole;
  /** A pointer to the track containing the point. */
  Track: eml.String64;
}
export interface DepthRegCalibrationPoint extends _DepthRegCalibrationPoint {}

/** Information about the composition, layout, and depth registration of a digital image of a well log, typically a scanned image of a paper well log document. */
interface _DepthRegImage extends eml._AbstractObject {
  /** Unique identifier for the registration image. */
  uid: eml.String64;
  /** Provides a positional reference for sections of the image file not included in other elements of this object. */
  AlternateSection?: DepthRegLogRect[];
  /** Image file checksum. */
  Checksum?: MessageDigestType;
  /** Reference to the file containing the image content. */
  FileName: eml.String64;
  /** Mimetype of image file content. */
  FileNameType?: FileNameType;
  /** Size of image file, in bytes. */
  FileSize?: eml.DigitalStorageMeasure;
  /** Log header information extracted from the well log image header section. Also contains X, Y coordinates and positional data with respect to the header section location within the log image file. */
  HeaderSection?: DepthRegLogRect;
  /** The bounding rectangle of the image */
  ImageBoundary: DepthRegRectangle;
  /** Image file height, in pixels. */
  ImagePixelHeight?: eml.NonNegativeLong;
  /** Image file width, in pixels. */
  ImagePixelWidth?: eml.NonNegativeLong;
  /** Provides log name, log type, curve scale and other information about each log section of the image file. Most importantly, this section contains the depth registration elements (CalibrationPoint) necessary for depth calibrating well log sections. */
  LogSection?: DepthRegLogSection[];
  /** Mimetype of image file content. */
  Mimetype?: MimeType;
  /** File version. */
  Version?: eml.String64;
  Wellbore: eml.DataObjectReference;
}
export interface DepthRegImage extends _DepthRegImage {}

/** A region of an image containing a log rectangle. */
interface _DepthRegLogRect extends BaseType {
  /** Unique identifier for the log section. */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The name of a rectangular section. */
  Name?: eml.String64;
  Position?: DepthRegRectangle;
  /** A region of an image containing a log section image. */
  Type?: LogRectangleType;
}
export interface DepthRegLogRect extends _DepthRegLogRect {}

/** Defines the description and coordinates of a well log section, the curves on the log. An important XSDelement to note is log:refNameString; it is a reference to the actual log/data (in a WITSML server) that this raster image represents; this object does not contain the log data. */
interface _DepthRegLogSection extends BaseType {
  /** Unique identifier for the log section. */
  uid: eml.String64;
  /** Generally this associates an X, Y value pair with a depth value from the log section. */
  CalibrationPoint?: DepthRegCalibrationPoint[];
  ChannelSet?: eml.DataObjectReference;
  /** Comments about the calibration. */
  Comment?: eml.String2000;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Pointer to a reference point representing the origin for vertical coordinates on the original log. If this is not specified, information about the datum should be specified in a comment. */
  IndexDatum?: eml.DataObjectReference;
  /** The range of the index values. */
  IndexInterval: eml.AbstractInterval;
  /** Primary index type. For date-time indexes, any specified index values should be defined as a time offset (e.g., in seconds) from the creationDate of the well log. */
  IndexKind: eml.DataIndexKind;
  /** Index UOM of the original log. */
  IndexUom: eml.String64;
  /** Log matrix assumed for porosity computations. */
  LogMatrix?: eml.String64;
  /** Name of a log section;  used to distinguish log sections of the same type. */
  LogSectionName?: eml.String64;
  /** The bounding rectangle of this log section. */
  LogSectionRect?: DepthRegRectangle[];
  /** Zero-based index in the log sections, in order of appearance. */
  LogSectionSequenceNumber: eml.NonNegativeLong;
  /** Type of log section. */
  LogSectionType?: LogSectionType;
  /** Boundaries of the lower curve scale (or horizontal scale) section for this log section. */
  LowerCurveScaleRect?: DepthRegRectangle[];
  Parameter?: DepthRegParameter[];
  /** The denominator of the index (depth or time) scale of the original log, e. g. "100 ft".  '@uom' must be consistent with '//indexType'. */
  ScaleDenominator?: eml.GenericMeasure;
  /** The numerator of the index (depth or time) scale of the original log, e. g. "5 in". */
  ScaleNumerator?: eml.LengthMeasure;
  Track?: DepthRegTrack[];
  /** Boundaries of the upper curve scale (or horizontal scale) section for this log section. */
  UpperCurveScaleRect?: DepthRegRectangle[];
  /** Vertical log scale label (e.g., “1 IN/100 F”). */
  VerticalLabel?: eml.String2000;
  /** Second term of the vertical scale ratio (e.g., “240” for a 5-inch-per-100-foot log section). */
  VerticalRatio?: eml.String2000;
  /** Defines blank space occurring within a log section in an image. */
  WhiteSpace?: DepthRegRectangle[];
}
export interface DepthRegLogSection extends _DepthRegLogSection {}

/** Specifies parameters associated with the log section and includes top and bottom indexes, a description string, and mnemonic. */
interface _DepthRegParameter extends BaseType {
  /** Unique identifier for the parameter. */
  uid: eml.String64;
  /** A description or definition for the mnemonic; required when ../dictionary is absent. */
  Description?: eml.String2000;
  /** The name or identifier of the controlling dictionary. */
  Dictionary?: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The index value range for the vertical region for which the parameter value is applicable. */
  IndexInterval?: eml.AbstractInterval;
  /** A dictionary-controlled mnemonic. */
  Mnemonic: eml.String64;
  /** The value assigned to the parameter.
   * The unit of measure should be consistent with the property implied by 'mnemonic' in 'dictionary'.
   * If the value is unitless, then use a unit of 'Euc'. */
  Value: eml.GenericMeasure;
}
export interface DepthRegParameter extends _DepthRegParameter {}

/** The position of a pixel of an image, in x-y coordinates. */
interface _DepthRegPoint extends BaseType {
  /** The x pixel position of a point. */
  X: eml.NonNegativeLong;
  /** The y pixel position of a point. */
  Y: eml.NonNegativeLong;
}
export interface DepthRegPoint extends _DepthRegPoint {}

/** Uses 4 corner points (Ul, Ur, Ll, Lr) to define the position (pixel) of a rectangular area of an image, using x-y coordinates. Most objects point to this object because most are rectangles, and use this schema to define each rectangle. */
interface _DepthRegRectangle extends BaseType {
  /** Unique identifier for the rectangular area. */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The lower left point of a rectangular region. */
  Ll?: DepthRegPoint;
  /** The lower right point of a rectangular region. */
  Lr?: DepthRegPoint;
  /** The upper left point of a rectangular region. */
  Ul?: DepthRegPoint;
  /** The upper right point of a rectangular region. */
  Ur?: DepthRegPoint;
}
export interface DepthRegRectangle extends _DepthRegRectangle {}

/** Horizontal track layout of the rectified log image that identifies the rectangle for a single log track. */
interface _DepthRegTrack extends BaseType {
  /** Unique identifier for the track. */
  uid: eml.String64;
  AssociatedCurve?: DepthRegTrackCurve[];
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The position of the left edge of the track. */
  LeftEdge: eml.NonNegativeLong;
  /** A label associated with the track. */
  Name?: eml.String64;
  /** The position of the right edge of the track. */
  RightEdge: eml.NonNegativeLong;
  /** Coordinates of rectangle representing the track. */
  TrackCurveScaleRect?: DepthRegRectangle[];
  /** The kind of track. */
  Type: LogTrackType;
}
export interface DepthRegTrack extends _DepthRegTrack {}

/** Descriptions of the actual curve, including elements such as line weight, color, and style, within a log track. */
interface _DepthRegTrackCurve extends BaseType {
  /** Unique identifier for the curve. */
  uid: eml.String64;
  /** Scale of the backup curve */
  CurveBackupScaleType: BackupScaleType;
  /** Curve mnemonic */
  CurveInfo: eml.String64;
  /** Scale value on the left axis */
  CurveLeftScaleValue: number;
  /** Scale value on the right axis */
  CurveRightScaleValue: number;
  /** Coordinates of rectangle representing the area describing the scale. */
  CurveScaleRect?: DepthRegRectangle[];
  /** Scale linearity */
  CurveScaleType: ScaleType;
  /** Unit of data represented */
  CurveUnit: eml.TypeEnum;
  /** Details of the line */
  Description?: eml.String2000;
  /** Color of this line */
  LineColor: eml.String64;
  /** Image line style */
  LineStyle: LineStyle;
  /** Description of line graveness */
  LineWeight: eml.String64;
}
export interface DepthRegTrackCurve extends _DepthRegTrackCurve {}

/** Specifies the type of drilling derrick. */
export type DerrickType = "double" | "quadruple" | "slant" | "triple";
interface _DerrickType extends eml._TypeEnum {
  _: DerrickType;
}

/** Information on directional survey event. */
interface _DirectionalSurveyExtension extends _AbstractEventExtension {
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to trajectory */
  Trajectory?: eml.DataObjectReference;
}
export interface DirectionalSurveyExtension
  extends _DirectionalSurveyExtension {}

/** General downhole equipment information. */
interface _DownholeComponent extends eml._AbstractObject {
  BoreholeStringSet?: BoreholeStringSet;
  DownholeStringSet?: DownholeStringSet;
  /** The date the equipment was removed. */
  EndDate?: eml.TimeStamp;
  EquipmentSet?: EquipmentSet;
  PerforationSets?: PerforationSets;
  /** The date this equipment was installed. */
  StartDate?: eml.TimeStamp;
  Well: eml.DataObjectReference;
  WellHead?: DownholeString;
}
export interface DownholeComponent extends _DownholeComponent {}

/** Reference to a downhole component identifier */
interface _DownholeComponentReference extends BaseType {
  BoreholeStringReference?: BoreholeStringReference[];
  DownholeStringReference?: DownholeStringReference[];
  /** Reference to perforation set */
  PerforationSet?: eml.DataObjectComponentReference[];
  /** Reference to string equipment */
  StringEquipment?: eml.DataObjectComponentReference[];
}
export interface DownholeComponentReference
  extends _DownholeComponentReference {}

/** Information on downhole related to this event. */
interface _DownholeExtension extends _AbstractEventExtension {
  /** Reference to downhole component */
  DownholeComponent?: eml.DataObjectReference;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
}
export interface DownholeExtension extends _DownholeExtension {}

/** A section of the downhole component equipment.  Strings in the completion including casing, tubing, and rod strings .A completion may have multiple sets of strings, which may be nested each inside another, or run in parallel as in dual string completions; all strings are contained in a parent wellbore. Each string is composed of equipment, and may also contain accessories and/or assemblies. */
interface _DownholeString extends BaseType {
  /** Unique identifier for this instance of DownholeString. */
  uid: eml.String64;
  Accessories?: StringAccessory;
  /** The distance from a sibling string. */
  AxisOffset?: eml.LengthMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The name of the downhole string. */
  Name?: eml.String64;
  ParentString?: eml.ComponentReference;
  ReferenceWellbore: eml.DataObjectReference;
  StringEquipmentSet?: StringEquipmentSet;
  /** The install date of the downhole string. */
  StringInstallDate?: eml.TimeStamp;
  /** Measured depth interval between the top and the base of the downhole string. */
  StringMdInterval?: eml.MdInterval;
  /** The type of string defined in the  enumeration DownholeStringType. */
  StringType: DownholeStringType;
  /** The type of substring which can be SurfaceCasing, IntermediaCasing or ProductionCasing. */
  SubStringType?: SubStringType;
}
export interface DownholeString extends _DownholeString {}

/** Reference to a downhole string. */
interface _DownholeStringReference extends BaseType {
  /** Reference to a downhole string. */
  DownholeString: eml.DataObjectComponentReference;
  /** Optional references to string equipment within the downhole string. */
  StringEquipment?: eml.ComponentReference[];
}
export interface DownholeStringReference extends _DownholeStringReference {}

/** Information on a collection of downhole strings */
interface _DownholeStringSet extends BaseType {
  DownholeString: DownholeString[];
}
export interface DownholeStringSet extends _DownholeStringSet {}

/** Specifies the values for the type of downhole strings. */
export type DownholeStringType =
  | "casing"
  | "others"
  | "rod"
  | "tubing"
  | "wellhead";
interface _DownholeStringType extends eml._TypeEnum {
  _: DownholeStringType;
}

/** Specifies the type of draw works. */
export type DrawWorksType =
  | "mechanical"
  | "standard electric"
  | "diesel electric"
  | "ram rig";
interface _DrawWorksType extends eml._TypeEnum {
  _: DrawWorksType;
}

/** Operations Activity Component Schema. */
interface _DrillActivity extends BaseType {
  /** Unique identifier for this instance of DrillActivity. */
  uid: eml.String64;
  /** A code used to define rig activity. */
  ActivityCode?: DrillActivityCode;
  /** Measured depth interval over which the activity was conducted. */
  ActivityMdInterval?: eml.MdInterval;
  /** True vertical depth interval over which the activity was conducted. */
  ActivityTvdInterval?: eml.AbstractTvdInterval;
  /** A pointer to the bhaRun object related to this activity */
  BhaRun?: eml.DataObjectReference;
  /** Range of bit measured depths over which the activity occurred. */
  BitMdInterval?: eml.MdInterval;
  /** Comments and remarks. */
  Comments?: eml.String2000;
  /** Custom string to further define an activity. */
  DetailActivity?: eml.String64;
  /** Date and time that activities ended. */
  DTimEnd?: eml.TimeStamp;
  /** Date and time that activities started. */
  DTimStart?: eml.TimeStamp;
  /** The activity duration (commonly in hours). */
  Duration?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The item state for the data object. */
  ItemState?: ItemState;
  /** The measured depth to the drilling activity/operation. */
  Md?: eml.MeasuredDepth;
  /** Pointer to a BusinessAssociate representing the operator. */
  Operator?: eml.DataObjectReference;
  /** Is the activity optimum.? Values are "true" (or "1") and "false" (or "0"). */
  Optimum?: boolean;
  /** Phase refers to a large activity classification, e.g., drill surface hole. */
  Phase?: eml.String64;
  /** Does activity bring closer to objective?  Values are "true" (or "1") and "false" (or "0"). */
  Productive?: boolean;
  ProprietaryCode?: eml.NameStruct[];
  /** Finish, interrupted, failed, etc. */
  State?: eml.String64;
  /** The outcome of the detailed activity. */
  StateDetailActivity?: StateDetailActivity;
  Tubular?: eml.DataObjectReference;
  /** True vertical depth to the drilling activity/operation. */
  Tvd?: eml.AbstractVerticalDepth;
  /** Classifier (planned, unplanned, downtime). */
  TypeActivityClass?: DrillActivityClassType;
}
export interface DrillActivity extends _DrillActivity {}

/** Activity classifier, e.g., planned, unplanned, downtime */
export type DrillActivityClassType = "planned" | "unplanned" | "downtime";
interface _DrillActivityClassType extends eml._TypeEnum {
  _: DrillActivityClassType;
}

/** A code to specify the drilling activity. */
export type DrillActivityCode =
  | "abandonment"
  | "abandonment -- log plugs"
  | "abandonment -- run plugs"
  | "abandonment -- wait on cement"
  | "casing"
  | "cement"
  | "cement -- circulate"
  | "cement -- other"
  | "cement -- rig up"
  | "cement -- wait on cement"
  | "circulate"
  | "circulate -- boulder or gravel"
  | "circulate -- casing"
  | "circulate -- cementing"
  | "circulate -- circulate samples"
  | "circulate -- coring"
  | "circulate -- drilling"
  | "circulate -- fishing"
  | "circulate -- gumbo attack"
  | "circulate -- logging"
  | "circulate -- lost circulation"
  | "circulate -- well control"
  | "completion operations"
  | "completion operations -- gravel packing"
  | "completion operations -- logging"
  | "completion operations -- rig up"
  | "completion operations -- running liner"
  | "completion operations -- tear down"
  | "completion operations -- testing"
  | "cond mud"
  | "coring"
  | "coring -- conventional"
  | "coring -- flow check"
  | "coring -- laydown barrel"
  | "coring -- oriented"
  | "coring -- plastic sleeve"
  | "coring -- rig up core barrel"
  | "coring -- sponge"
  | "cut"
  | "deviation survey"
  | "deviation survey -- dir multi-shot"
  | "deviation survey -- dir single shot"
  | "deviation survey -- drift"
  | "deviation survey -- gyro"
  | "deviation survey -- MWD"
  | "dir work"
  | "dir work -- horizontal drilling"
  | "dir work -- motor drilling"
  | "dir work -- orient"
  | "dir work -- rotary drilling"
  | "dir work -- slant drilling"
  | "drilling"
  | "drilling -- casing"
  | "drilling -- connection"
  | "drilling -- drill cement"
  | "drilling -- flow check"
  | "drilling -- hole opening"
  | "drilling -- new hole"
  | "drilling -- sidetracking"
  | "drilling -- under-reaming"
  | "DST"
  | "DST -- cased hole"
  | "DST -- lay down tools"
  | "DST -- open hole"
  | "DST -- open hole closed chamber"
  | "DST -- rig up tools"
  | "fishing"
  | "fishing -- BHA"
  | "fishing -- casing"
  | "fishing -- cones"
  | "fishing -- other"
  | "fishing -- stuck pipe"
  | "fishing -- wireline tools"
  | "float equip"
  | "HSE"
  | "HSE -- hold drill"
  | "HSE -- incident"
  | "HSE -- safety meeting"
  | "mill"
  | "mill -- cut casing or tubing"
  | "mill -- milling"
  | "miscellaneous"
  | "nipple up BOP"
  | "nipple up BOP -- diverter"
  | "nipple up BOP -- manifold"
  | "nipple up BOP -- other"
  | "nipple up BOP -- PVT system"
  | "nipple up BOP -- stack"
  | "plug back"
  | "plug back -- abandonment"
  | "plug back -- kick off plug"
  | "plug back -- lost circulation"
  | "plug back -- wait on cement"
  | "plug back -- well control"
  | "pressure test"
  | "pressure test -- BOP manifold"
  | "pressure test -- BOP stack"
  | "pressure test -- form integrity test"
  | "pressure test -- form leak off test"
  | "pressure test -- packer"
  | "pressure test -- PIT"
  | "reaming"
  | "reaming -- back reaming"
  | "reaming -- coring"
  | "reaming -- drill"
  | "reaming -- logging"
  | "reaming -- under-reaming"
  | "rig move"
  | "rig move -- anchor handling"
  | "rig move -- inter-pad move"
  | "rig move -- inter-well move"
  | "rig move -- jack up or down"
  | "rig move -- other"
  | "rig move -- position rig"
  | "rig move -- skid rig"
  | "rig release"
  | "rig release -- cut casing"
  | "rig release -- install capping assembly"
  | "rig release -- MOB or DE-MOB"
  | "rig repairs"
  | "rig repairs -- drawworks"
  | "rig repairs -- electrical"
  | "rig repairs -- mud system"
  | "rig repairs -- other"
  | "rig repairs -- rotary"
  | "rig repairs -- subsea equipment"
  | "rig repairs -- well control equipment"
  | "rig service"
  | "rig service -- lubricate rig"
  | "rig service -- test equipment"
  | "rig up or tear down"
  | "rig up or tear down -- rig up"
  | "rig up or tear down -- site work"
  | "rig up or tear down -- tear down"
  | "run casing"
  | "run liner"
  | "run or pull riser"
  | "run or pull riser -- other"
  | "run or pull riser -- run or pull riser"
  | "set"
  | "slip drilling line"
  | "squeeze cement"
  | "squeeze cement -- casing repair"
  | "squeeze cement -- casing shoe"
  | "squeeze cement -- parted casing"
  | "squeeze cement -- perforations DST"
  | "stuck pipe"
  | "surface string handling"
  | "test completion"
  | "testing general"
  | "testing general -- equipment"
  | "testing general -- flow"
  | "tripping"
  | "tripping -- back-reaming"
  | "tripping -- flow check"
  | "tripping -- short trip in"
  | "tripping -- short trip out"
  | "tripping -- trip in (from surface)"
  | "tripping -- trip out (to surface)"
  | "wait"
  | "wait -- daylight"
  | "wait -- environmental or regulatory"
  | "wait -- equipment"
  | "wait -- holiday"
  | "wait -- ice"
  | "wait -- on orders"
  | "wait -- operator"
  | "wait -- other"
  | "wait -- partners"
  | "wait -- service company"
  | "wait -- weather"
  | "well control"
  | "well control -- mix"
  | "well control -- shut in"
  | "well control -- strip"
  | "well control -- well kill"
  | "well srvc"
  | "well srvc -- casing repair"
  | "well srvc -- clean well to compl fluid"
  | "well srvc -- coiled tubing work"
  | "well srvc -- gravel pack"
  | "well srvc -- install or test xmas tree"
  | "well srvc -- kill well"
  | "well srvc -- land"
  | "well srvc -- perforate"
  | "well srvc -- pull completion"
  | "well srvc -- pull suspension plugs"
  | "well srvc -- run completion"
  | "well srvc -- run screens"
  | "well srvc -- sand control"
  | "well srvc -- stimulation"
  | "well srvc -- subsea work"
  | "well srvc -- surface line work"
  | "well srvc -- suspend well or pull BOPs"
  | "well srvc -- test well"
  | "well srvc -- wash"
  | "well srvc -- wireline work"
  | "well srvc -- work tubulars"
  | "well srvc -- workstring run"
  | "wireline logs"
  | "wireline logs -- abandonment"
  | "wireline logs -- evaluation"
  | "wireline logs -- form tester"
  | "wireline logs -- other"
  | "wireline logs -- side wall cores"
  | "wireline logs -- velocity";
interface _DrillActivityCode extends eml._TypeEnum {
  _: DrillActivityCode;
}

/** Information regarding drilling: ROP, WOB, torque, etc. */
interface _DrillingParameters extends BaseType {
  /** Average drilling exponent through the interval. */
  AverageDrillingCoefficient?: DxcStatistics;
  /** Average effective circulating density at TD through the interval. */
  AverageEcdAtTd?: EcdStatistics;
  /** Average mud density through the interval. */
  AverageMudDensity?: MudDensityStatistics;
  /** Average torque through the interval. */
  AverageTorque?: TorqueStatistics;
  /** Average torque current through the interval. This is the raw measurement from which the average torque can be calculated. */
  AverageTorqueCurrent?: TorqueCurrentStatistics;
  /** Average turn rate through the interval (commonly in rpm). */
  AverageTurnRate?: RpmStatistics;
  /** Surface weight on bit: average through the interval. */
  AverageWeightOnBit?: WobStatistics;
  /** Rate of penetration through the interval. */
  Rop?: RopStatistics;
}
export interface DrillingParameters extends _DrillingParameters {}

/** The bottomhole assembly drilling parameters schema, which contains statistical and calculated operations data for the run, related to depths, activities, temperature, pressure, flow rates, torque, etc. */
interface _DrillingParams extends BaseType {
  /** Unique identifier for the parameters */
  uid: eml.String64;
  /** Azimuth at stop measured depth. */
  AziBottom?: eml.PlaneAngleMeasure;
  /** Azimuth at start measured depth. */
  AziTop?: eml.PlaneAngleMeasure;
  /** Comments and remarks. */
  Comments?: eml.String2000;
  /** Time spent circulating from start of bit run. */
  CTimCirc?: eml.TimeMeasure;
  /** Time spent rotary drilling from start of bit run. */
  CTimDrillRot?: eml.TimeMeasure;
  /** Time spent slide drilling from start of bit run. */
  CTimDrillSlid?: eml.TimeMeasure;
  /** Time spent on hold from start of bit run. */
  CTimHold?: eml.TimeMeasure;
  /** Time spent reaming from start of bit run. */
  CTimReam?: eml.TimeMeasure;
  /** Time spent steering from start of bit run. */
  CTimSteering?: eml.TimeMeasure;
  /** Distance drilled - rotating. */
  DistDrillRot?: eml.LengthMeasure;
  /** Distance drilled - sliding */
  DistDrillSlid?: eml.LengthMeasure;
  /** Distance covered while holding angle with a steerable drilling assembly. */
  DistHold?: eml.LengthMeasure;
  /** Distance reamed. */
  DistReam?: eml.LengthMeasure;
  /** Distance covered while actively steering with a steerable drilling assembly. */
  DistSteering?: eml.LengthMeasure;
  /** Operating time spent by bit for run.
   *
   * BUSINESS RULE: When reporting an actual as opposed to design, this is required. */
  ETimOpBit?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Flow rate at bit. */
  FlowrateBit?: eml.VolumePerTimeMeasure;
  /** Average mud pump flow rate. */
  FlowratePumpAv?: eml.VolumePerTimeMeasure;
  /** Minimum mud pump flow rate. */
  FlowratePumpMn?: eml.VolumePerTimeMeasure;
  /** Maximum mud pump flow rate. */
  FlowratePumpMx?: eml.VolumePerTimeMeasure;
  /** Hookload when the string is moving down. */
  HkldDn?: eml.ForceMeasure;
  /** Hookload: rotating. */
  HkldRot?: eml.ForceMeasure;
  /** Hookload when the string is moving up. */
  HkldUp?: eml.ForceMeasure;
  /** Minimum inclination. */
  InclMn?: eml.PlaneAngleMeasure;
  /** Maximum inclination. */
  InclMx?: eml.PlaneAngleMeasure;
  /** Inclination at start measured depth. */
  InclStart?: eml.PlaneAngleMeasure;
  /** Inclination at stop measured depth. */
  InclStop?: eml.PlaneAngleMeasure;
  /** Measured depth at start of the run. */
  MdHoleStart?: eml.MeasuredDepth;
  /** Measured depth at the end of the run. */
  MdHoleStop: eml.MeasuredDepth;
  /** The class of the drilling fluid. */
  MudClass?: MudClass;
  /** Mud Subtype at event occurrence. */
  MudSubClass?: MudSubClass;
  /** Objective of bottom hole assembly. */
  ObjectiveBha?: eml.String2000;
  /** Overpull = HkldUp - HkldRot */
  OverPull?: eml.ForceMeasure;
  /** Bit hydraulic. */
  PowBit?: eml.PowerMeasure;
  /** Pressure drop in bit. */
  PresDropBit?: eml.PressureMeasure;
  /** Average pump pressure. */
  PresPumpAv?: eml.PressureMeasure;
  /** Reason for trip. */
  ReasonTrip?: eml.String2000;
  /** Average rate of penetration through Interval. */
  RopAv?: eml.LengthPerTimeMeasure;
  /** Minimum rate of penetration through Interval. */
  RopMn?: eml.LengthPerTimeMeasure;
  /** Maximum rate of penetration through Interval. */
  RopMx?: eml.LengthPerTimeMeasure;
  /** Average turn rate (commonly in rpm) through Interval. */
  RpmAv?: eml.AngularVelocityMeasure;
  /** Average turn rate (commonly in rpm) downhole. */
  RpmAvDh?: eml.AngularVelocityMeasure;
  /** Minimum turn rate (commonly in rpm). */
  RpmMn?: eml.AngularVelocityMeasure;
  /** Maximum turn rate (commonly in rpm). */
  RpmMx?: eml.AngularVelocityMeasure;
  /** Slackoff = HkldRot  - HkdDown. */
  SlackOff?: eml.ForceMeasure;
  /** Maximum mud temperature downhole during run. */
  TempMudDhMx?: eml.ThermodynamicTemperatureMeasure;
  /** Average torque: downhole. */
  TqDhAv?: eml.MomentOfForceMeasure;
  /** Average torque: off bottom. */
  TqOffBotAv?: eml.MomentOfForceMeasure;
  /** Average Torque: on bottom. */
  TqOnBotAv?: eml.MomentOfForceMeasure;
  /** Minimum torque: on bottom. */
  TqOnBotMn?: eml.MomentOfForceMeasure;
  /** Maximum torque: on bottom. */
  TqOnBotMx?: eml.MomentOfForceMeasure;
  /** A pointer to the tubular assembly. */
  Tubular?: eml.DataObjectReference;
  /** Bit nozzle average velocity. */
  VelNozzleAv?: eml.LengthPerTimeMeasure;
  /** Surface weight on bit - average through interval. */
  WobAv?: eml.ForceMeasure;
  /** Weight on bit - average downhole. */
  WobAvDh?: eml.ForceMeasure;
  /** Weight on bit - minimum. */
  WobMn?: eml.ForceMeasure;
  /** Weight on bit - maximum. */
  WobMx?: eml.ForceMeasure;
  /** Weight of the string above the jars. */
  WtAboveJar?: eml.ForceMeasure;
  /** Weight  of the string below the jars. */
  WtBelowJar?: eml.ForceMeasure;
  /** Drilling fluid density. */
  WtMud?: eml.MassPerVolumeMeasure;
}
export interface DrillingParams extends _DrillingParams {}

/** Used to capture a daily drilling report focused on reporting from the operator to partners or to a governmental agency. For a similar report whose focus is service company to operator, see the OpsReport object. */
interface _DrillReport extends eml._AbstractObject {
  /** Information about a bit. */
  BitRecord?: BitRecord[];
  ControlIncidentInfo?: DrillReportControlIncidentInfo[];
  CoreInfo?: DrillReportCoreInfo[];
  /** The date and time the report was created. A later timestamp indicates a newer version of the report. To update values in a report, a full updated copy of the original report should be submitted. */
  CreateDate?: eml.TimeStamp;
  /** A pointer to a reference point defining a vertical datum used for measured depths, vertical depths, or elevations. If one of these coordinate values is included in the report, then you must specify a well datum.
   * This requirement only applies to this report, which is generally a copy of the same information from the well object. */
  Datum?: eml.DataObjectReference[];
  DrillActivity?: DrillActivity[];
  /** Date and time that the reporting period ended. A report period is commonly 24 hours. */
  DTimEnd: eml.TimeStamp;
  /** Date and time that the reporting period started. A report period is commonly 24 hours. */
  DTimStart: eml.TimeStamp;
  EquipFailureInfo?: DrillReportEquipFailureInfo[];
  ExtendedReport?: TimestampedCommentString;
  Fluid?: Fluid[];
  FormTestInfo?: DrillReportFormTestInfo[];
  GasReadingInfo?: DrillReportGasReadingInfo[];
  LithShowInfo?: DrillReportLithShowInfo[];
  LogInfo?: DrillReportLogInfo[];
  PerfInfo?: DrillReportPerfInfo[];
  PorePressure?: DrillReportPorePressure[];
  StatusInfo?: DrillReportStatusInfo[];
  StratInfo?: DrillReportStratInfo[];
  SurveyStations?: DrillReportSurveyStationReport;
  /** The kind of report version. For example, a
   * preliminary version. */
  VersionKind?: OpsReportVersion;
  Wellbore: eml.DataObjectReference;
  WellboreInfo?: DrillReportWellboreInfo;
  WellTestInfo?: DrillReportWellTestInfo[];
}
export interface DrillReport extends _DrillReport {}

/** Information about a well control incident that occurred during the drill report period. */
interface _DrillReportControlIncidentInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportControlIncidentInfo. */
  uid: eml.String64;
  /** A code used to define rig activity. */
  ActivityCode?: DrillActivityCode;
  /** A description of the well control incident. */
  Description?: eml.String2000;
  /** Custom string to further define an activity. */
  DetailActivity?: eml.String64;
  /** The drill bit nominal outside diameter at the time of the well control incident. */
  DiaBit?: eml.LengthMeasure;
  /** Diameter of the last installed casing. */
  DiaCsgLast?: eml.LengthMeasure;
  /** Date and time of the well control incident. */
  DTim?: eml.TimeStamp;
  /** The date and time at which control of the well was regained. */
  DTimRegained?: eml.TimeStamp;
  /** The amount of time lost because of the well control incident. Commonly specified in hours. */
  ETimLost?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The lithological description of the geological formation at the incident depth. */
  Formation?: eml.String2000;
  /** The type of well control incident. */
  IncidentType?: WellControlIncidentType;
  /** The type of procedure used to kill the well. */
  KillingType?: WellKillingProcedureType;
  /** The measured depth of the bit at the time of the the well control incident. */
  MdBit?: eml.MeasuredDepth;
  /** Measured depth of the last casing joint. */
  MdCsgLast?: eml.MeasuredDepth;
  /** The measured depth to the well inflow entry point. */
  MdInflow?: eml.MeasuredDepth;
  /** Phase is large activity classification, e.g. drill surface hole. */
  Phase?: eml.String64;
  /** The equivalent mud weight value of the pore pressure reading. */
  PorePressure: eml.MassPerVolumeMeasure;
  /** The maximum pressure that the choke valve can be exposed to. */
  PresMaxChoke?: eml.PressureMeasure;
  /** The shut in casing pressure. */
  PresShutInCasing?: eml.PressureMeasure;
  /** The actual pressure in the drill pipe when the rams were closed around it. */
  PresShutInDrill?: eml.PressureMeasure;
  /** A proprietary code used to define rig activity. The name of the proprietary system should be defined in the namingSystem attribute. */
  ProprietaryCode?: eml.NameStruct[];
  /** The temperature at the bottom of the wellbore. */
  TempBottom?: eml.ThermodynamicTemperatureMeasure;
  /** The true vertical depth to the well inflow entry point. */
  TvdInflow?: eml.AbstractVerticalDepth;
  /** The gained volume of drilling fluid due to the well kick. */
  VolMudGained?: eml.VolumeMeasure;
  /** The density of the drilling fluid at the time of the well control incident. */
  WtMud?: eml.MassPerVolumeMeasure;
}
export interface DrillReportControlIncidentInfo
  extends _DrillReportControlIncidentInfo {}

/** General information about a core taken during the drill report period. */
interface _DrillReportCoreInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportCoreInfo. */
  uid: eml.String64;
  /** General core description. */
  CoreDescription?: eml.String2000;
  /** Cored interval expressed as measured depth. */
  CoredMdInterval?: eml.MdInterval;
  /** Cored interval expressed as true vertical depth. */
  CoredTvdInterval?: eml.AbstractTvdInterval;
  /** Core identification number. */
  CoreNumber?: eml.String64;
  /** Date and time that the core was completed. */
  DTim?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Core inner barrel type. */
  InnerBarrelType?: InnerBarrelType;
  /** Length of  the core barrel. */
  LenBarrel?: eml.LengthMeasure;
  /** Length of the core recovered. */
  LenRecovered?: eml.LengthMeasure;
  /** The relative amount of core recovered. */
  RecoverPc?: eml.VolumePerVolumeMeasure;
}
export interface DrillReportCoreInfo extends _DrillReportCoreInfo {}

/** General information about equipment failure that occurred during the drill report period. */
interface _DrillReportEquipFailureInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportEquipFailureInfo. */
  uid: eml.String64;
  /** A description of the equipment failure. */
  Description?: eml.String2000;
  /** Date and time that the equipment failed. */
  DTim?: eml.TimeStamp;
  /** The date and time at which the production equipment was
   * repaired and ready for production. */
  DTimRepair?: eml.TimeStamp;
  /** The classification of the equipment that failed. */
  EquipClass?: eml.String64;
  /** The missed production time because of the equipment failure. */
  ETimMissProduction?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The measured depth of the operation end point where the failure happened. */
  Md?: eml.MeasuredDepth;
  /** The true vertical depth of the  operation end point where failure the failure happened. */
  Tvd?: eml.AbstractVerticalDepth;
}
export interface DrillReportEquipFailureInfo
  extends _DrillReportEquipFailureInfo {}

/** General information about a wireline formation test that occurred during the drill report period. */
interface _DrillReportFormTestInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportFormTestInfo. */
  uid: eml.String64;
  /** The density of the hydrocarbon component of the fluid sample. */
  DensityHC?: eml.MassPerVolumeMeasure;
  /** A detailed description of the wireline formation test. */
  Description?: eml.String2000;
  /** The dominate component in the fluid sample. */
  DominateComponent?: eml.String64;
  /** Date and time that the wireline formation test was completed. */
  DTim?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Was there a good seal for the wireline formation test? Values are "true" or "1" or "false" or "0". */
  GoodSeal?: boolean;
  /** Measured depth at which the wireline formation test was conducted. */
  Md?: eml.MeasuredDepth;
  /** Measured depth where the fluid sample was taken. */
  MdSample?: eml.MeasuredDepth;
  /** The formation pore pressure.
   * The pressure of fluids within the pores of a reservoir, usually hydrostatic pressure,
   * or the pressure exerted by a column of water from the formation's depth to sea level. */
  PresPore?: eml.PressureMeasure;
  /** True vertical depth at which the wireline formation test was conducted. */
  Tvd?: eml.AbstractVerticalDepth;
  /** The volume of the fluid sample. */
  VolumeSample?: eml.VolumeMeasure;
}
export interface DrillReportFormTestInfo extends _DrillReportFormTestInfo {}

/** General information about a gas reading taken during the drill report period. */
interface _DrillReportGasReadingInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportGasReadingInfo. */
  uid: eml.String64;
  /** Date and time of the gas reading. */
  DTim?: eml.TimeStamp;
  /** Ethane (C2) concentration. */
  Eth?: eml.VolumePerVolumeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The highest gas reading. */
  GasHigh?: eml.VolumePerVolumeMeasure;
  /** The lowest gas reading. */
  GasLow?: eml.VolumePerVolumeMeasure;
  /** Measured depth interval over which the gas reading was conducted. */
  GasReadingMdInterval?: eml.MdInterval;
  /** True vertical depth interval over which the gas reading was conducted. */
  GasReadingTvdInterval?: eml.AbstractTvdInterval;
  /** Iso-butane (iC4) concentration. */
  Ibut?: eml.VolumePerVolumeMeasure;
  /** Iso-pentane (iC5) concentration. */
  Ipent?: eml.VolumePerVolumeMeasure;
  /** Methane (C1) concentration. */
  Meth?: eml.VolumePerVolumeMeasure;
  /** Nor-butane (nC4) concentration. */
  Nbut?: eml.VolumePerVolumeMeasure;
  /** Propane (C3) concentration. */
  Prop?: eml.VolumePerVolumeMeasure;
  /** Type of gas reading. */
  ReadingType?: GasPeakType;
}
export interface DrillReportGasReadingInfo extends _DrillReportGasReadingInfo {}

/** General information about the lithology and shows in an interval encountered during the drill report period. */
interface _DrillReportLithShowInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportLithShowInfo */
  uid: eml.String64;
  /** Date and time that the well test was completed. */
  DTim?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** A geological/lithological description/evaluation of the interval. */
  Lithology?: eml.String2000;
  /** A textual description of any shows in the interval. */
  Show?: eml.String2000;
  /** Measured depth interval over which the show appears. */
  ShowMdInterval?: eml.MdInterval;
  /** True vertical depth interval over which the show appears. */
  ShowTvdInterval?: eml.AbstractTvdInterval;
}
export interface DrillReportLithShowInfo extends _DrillReportLithShowInfo {}

/** General information about a log conducted during the drill report period. */
interface _DrillReportLogInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportLogInfo. */
  uid: eml.String64;
  BottomHoleTemperature?: AbstractBottomHoleTemperature;
  /** The date and time that the log was completed. */
  DTim?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth interval from the top to the base of the interval logged. */
  LoggedMdInterval?: eml.MdInterval;
  /** True vertical depth interval from the top to the base of the interval logged. */
  LoggedTvdInterval?: eml.AbstractTvdInterval;
  /** Measured depth to the temperature measurement tool. */
  MdTempTool?: eml.MeasuredDepth;
  /** Log run number.
   * For measurement while drilling, this should be the
   * bottom hole assembly number. */
  RunNumber?: eml.String64;
  /** Pointer to a BusinessAssociate representing the contractor who provided the service. */
  ServiceCompany?: eml.DataObjectReference;
  /** A pointer to the logging tool kind for the logging tool. */
  Tool?: eml.DataObjectReference;
  /** True vertical depth to the temperature measurement tool. */
  TvdTempTool?: eml.AbstractVerticalDepth;
}
export interface DrillReportLogInfo extends _DrillReportLogInfo {}

/** General information about a perforation interval related to the drill report period. */
interface _DrillReportPerfInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportPerfInfo. */
  uid: eml.String64;
  /** The date and time at which the well perforation interval is closed. */
  DTimClose?: eml.TimeStamp;
  /** The date and time at which the well perforation interval is opened. */
  DTimOpen?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth interval between the top and the base of the perforations. */
  PerforationMdInterval?: eml.MdInterval;
  /** True vertical depth interval between the top and the base of the perforations. */
  PerforationTvdInterval?: eml.AbstractTvdInterval;
}
export interface DrillReportPerfInfo extends _DrillReportPerfInfo {}

/** General information about pore pressure related to the drill report period. */
interface _DrillReportPorePressure extends BaseType {
  /** Unique identifier for this instance of DrillReportPorePressure. */
  uid: eml.String64;
  /** Date and time at the reading was recorded. */
  DTim?: eml.TimeStamp;
  /** The equivalent mud weight value of the pore pressure reading. */
  EquivalentMudWeight: eml.MassPerVolumeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth where the readings were recorded. */
  Md?: eml.MeasuredDepth;
  /** Indicate if the reading was estimated or measured. */
  ReadingKind: ReadingKind;
  /** True vertical depth where the readings were recorded. */
  Tvd?: eml.AbstractVerticalDepth;
}
export interface DrillReportPorePressure extends _DrillReportPorePressure {}

/** General status information for the drill report period. */
interface _DrillReportStatusInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportStatusInfo. */
  uid: eml.String64;
  /** Description of the hole condition. */
  ConditionHole?: eml.String64;
  CostDay?: eml.Cost;
  CostDayMud?: eml.Cost;
  /** Diameter of the last casing joint. */
  DiaCsgLast?: eml.LengthMeasure;
  /** Hole nominal inside diameter. */
  DiaHole?: eml.LengthMeasure;
  /** Pilot hole nominal inside diameter. */
  DiaPilot?: eml.LengthMeasure;
  /** Distance drilled.  This should be measured along the centerline of the wellbore. */
  DistDrill?: eml.LengthMeasure;
  /** Distance drilled: rotating. */
  DistDrillRot?: eml.LengthMeasure;
  /** Distance drilled: sliding. */
  DistDrillSlid?: eml.LengthMeasure;
  /** Distance covered while holding angle with a steerable drilling assembly. */
  DistHold?: eml.LengthMeasure;
  /** Distance reamed. */
  DistReam?: eml.LengthMeasure;
  /** Distance covered while actively steering with a steerable drilling assembly. */
  DistSteering?: eml.LengthMeasure;
  /** The date and time for which the well status is reported. */
  DTim?: eml.TimeStamp;
  ElevKelly?: eml.AbstractElevation;
  /** Name of the operator's drilling engineer. */
  Engineer?: eml.String64;
  /** Time spent circulating from the start of the bit run. */
  ETimCirc?: eml.TimeMeasure;
  /** Drilling time. */
  ETimDrill?: eml.TimeMeasure;
  /** Time spent rotary drilling. */
  ETimDrillRot?: eml.TimeMeasure;
  /** Time spent slide drilling from the start of the bit run. */
  ETimDrillSlid?: eml.TimeMeasure;
  /** Time spent with no directional drilling work (commonly in hours). */
  ETimHold?: eml.TimeMeasure;
  /** Time the rig has been on location (commonly in days). */
  ETimLoc?: eml.TimeMeasure;
  /** Time spent reaming from the start of the bit run. */
  ETimReam?: eml.TimeMeasure;
  /** Time since the bit broke ground (commonly in days). */
  ETimSpud?: eml.TimeMeasure;
  /** Time from the start of operations (commonly in days). */
  ETimStart?: eml.TimeMeasure;
  /** Time spent steering the bottomhole assembly (commonly in hours). */
  ETimSteering?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** A summary of  planned activities for the next reporting period. */
  Forecast24Hr?: eml.String2000;
  /** Name of operator's wellsite geologist. */
  Geologist?: eml.String64;
  /** Maximum allowable shut-in casing pressure. */
  Maasp?: eml.PressureMeasure;
  /** Wellbore measured depth at the end of the report period. */
  Md?: eml.MeasuredDepth;
  /** Measured depth of the last casing joint. */
  MdCsgLast?: eml.MeasuredDepth;
  /** Measured depth to the start of the current hole diameter. */
  MdDiaHoleStart?: eml.MeasuredDepth;
  /** The planned measured depth of the pilot hole. */
  MdDiaPilotPlan?: eml.MeasuredDepth;
  /** Measured depth to the kickoff point of the wellbore. */
  MdKickoff?: eml.MeasuredDepth;
  /** The measured depth planned to be reached. */
  MdPlanned?: eml.MeasuredDepth;
  /** The measured plug back depth. */
  MdPlugTop?: eml.MeasuredDepth;
  /** The measured depth of the formation strength measurement. */
  MdStrengthForm?: eml.MeasuredDepth;
  /** Authorization for expenditure (AFE) number that this cost item applies to. */
  NumAFE?: eml.String64;
  /** Number of contractor personnel on the rig. */
  NumContract?: number;
  /** Number of operator personnel on the rig. */
  NumOperator?: number;
  /** Total number of personnel on board the rig. */
  NumPob?: number;
  /** Number of service company personnel on the rig. */
  NumService?: number;
  /** References to the parent wellbore(s). These are the wellbore(s) from which the current wellbore (indirectly) kickedoff. */
  ParentWellbore?: eml.DataObjectReference[];
  /** Kick tolerance pressure. */
  PresKickTol?: eml.PressureMeasure;
  /** Leak off test equivalent mud weight. */
  PresLotEmw?: eml.MassPerVolumeMeasure;
  /** The type of pressure test that was run. */
  PresTestType?: PresTestType;
  /** A pointer to the rig used. */
  RigUtilization?: eml.DataObjectReference;
  /** Average rate of penetration. */
  RopAv?: eml.LengthPerTimeMeasure;
  /** Rate of penetration at the end of the reporting period. */
  RopCurrent?: eml.LengthPerTimeMeasure;
  /** The measured formation strength. This should be the final measurement before the end of the report period. */
  StrengthForm?: eml.MassPerVolumeMeasure;
  /** A summary of the activities performed and the status of the ongoing activities. */
  Sum24Hr?: eml.String2000;
  /** Name of the operator's rig supervisor. */
  Supervisor?: eml.String64;
  /** A pointer to the tubular (assembly) used in this report period. */
  Tubular?: eml.DataObjectReference;
  /** Wellbore true vertical depth at the end of the report. */
  Tvd?: eml.AbstractVerticalDepth;
  /** True vertical depth of last casing joint. */
  TvdCsgLast?: eml.AbstractVerticalDepth;
  /** The planned true vertical depth of the pilot hole. */
  TvdDiaPilotPlan?: eml.AbstractVerticalDepth;
  /** True vertical depth to the kickoff point of the wellbore. */
  TvdKickoff?: eml.MeasuredDepth;
  /** True vertical depth of a leak off test point. */
  TvdLot?: eml.AbstractVerticalDepth;
  /** The true vertical depth of the formation strength measurement. */
  TvdStrengthForm?: eml.AbstractVerticalDepth;
  /** Type of wellbore. */
  TypeWellbore?: WellboreType;
  /** Kick tolerance volume. */
  VolKickTol?: eml.VolumeMeasure;
}
export interface DrillReportStatusInfo extends _DrillReportStatusInfo {}

/** General information about stratigraphy for the drill report period. */
interface _DrillReportStratInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportStratInfo. */
  uid: eml.String64;
  /** A lithological description of the geological formation at the given depth. */
  Description?: eml.String2000;
  /** Date and time at which a preliminary zonation was established. */
  DTim?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth at the top of the formation. */
  MdTop?: eml.MeasuredDepth;
  /** True vertical depth at the top of the formation. */
  TvdTop?: eml.AbstractVerticalDepth;
}
export interface DrillReportStratInfo extends _DrillReportStratInfo {}

/** Trajectory station information for the drill report period. */
interface _DrillReportSurveyStation extends BaseType {
  /** Unique identifier for this instance of DrillReportSurveyStation. */
  uid: eml.String64;
  /** Hole azimuth, corrected to a well's azimuth reference. */
  Azi?: eml.PlaneAngleMeasure;
  /** Dogleg severity. */
  Dls?: eml.AnglePerLengthMeasure;
  /** The date at which the directional survey took place. */
  DTim: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Hole inclination, measured from vertical. */
  Incl?: eml.PlaneAngleMeasure;
  Location?: eml.Abstract2dPosition[];
  /** Measured depth of measurement from the drill datum. */
  Md: eml.MeasuredDepth;
  /** True vertical depth of the measurements. */
  Tvd?: eml.AbstractVerticalDepth;
  /** Distance along the vertical section of an azimuth plane. */
  VertSect?: eml.LengthMeasure;
}
export interface DrillReportSurveyStation extends _DrillReportSurveyStation {}

/** Captures information for a report including drill report survey stations. */
interface _DrillReportSurveyStationReport extends BaseType {
  /** Remarks related to acquisition context which is not the same as Description, which is a summary of the trajectory. */
  AcquisitionRemark?: eml.String2000;
  /** Specifies the definition of north. While this is optional because of legacy data, it is strongly recommended that this always be specified. */
  AziRef?: eml.NorthReferenceKind;
  /** Azimuth used for vertical section plot/computations. */
  AziVertSect?: eml.PlaneAngleMeasureExt;
  /** Origin east-west used for vertical section plot/computations. */
  DispEwVertSectOrig?: eml.LengthMeasureExt;
  /** Origin north-south used for vertical section plot/computations. */
  DispNsVertSectOrig?: eml.LengthMeasureExt;
  DrillReportSurveyStation?: DrillReportSurveyStation[];
  /** The angle  used to correct a true north referenced azimuth to a grid north azimuth. WITSML follows the Gauss-Bomford convention in which convergence angles are measured positive clockwise from true north to grid north (or negative in the anti-clockwise direction). To convert a true north referenced azimuth to a grid north azimuth, the convergence angle must be subtracted from true north. If StnGridConUsed is not provided, then this value applies to all grid-north referenced stations. */
  GridConUsed?: eml.PlaneAngleMeasureExt;
  /** A multiplier to change geodetic distances based on the Earth model (ellipsoid) to distances on the grid plane.
   * This is the number which was already used to correct lateral distances. Provide it only if it is used in your trajectory stations.
   * If StnGridScaleFactorUsed is not provided, then this value applies to all trajectory stations.
   * The grid scale factor applies to the DispEw, DispNs and Closure elements on trajectory stations. */
  GridScaleFactorUsed?: eml.LengthPerLengthMeasureExt;
  /** Magnetic declination used to correct a Magnetic North referenced azimuth to a True North azimuth.  Magnetic declination angles are measured positive clockwise from True North to Magnetic North (or negative in the anti-clockwise direction).
   * To convert a Magnetic azimuth to a True North azimuth, the magnetic declination should be added.
   * Starting value if stations have individual values. */
  MagDeclUsed?: eml.PlaneAngleMeasureExt;
  /** The measured depth to which the survey segment was extrapolated. */
  MdMaxExtrapolated?: eml.MeasuredDepth;
  /** Measured depth within the wellbore of the LAST trajectory station with recorded data. If a trajectory has been extrapolated to a deeper depth than the last surveyed station then that is MdMaxExtrapolated and not MdMaxMeasured. */
  MdMaxMeasured?: eml.MeasuredDepth;
  /** Tie-point depth measured along the wellbore from the measurement reference datum to the trajectory station - where tie point is the place on the originating trajectory where the current trajectory intersecst it. */
  MdTieOn?: eml.MeasuredDepth;
  /** The nominal type of algorithm used in the position calculation in trajectory stations. Individual stations may use different algorithms. */
  NominalCalcAlgorithm?: TrajStnCalcAlgorithmExt;
  /** The nominal type of tool used for the trajectory station measurements. Individual stations may have a different tool type. */
  NominalTypeSurveyTool?: TypeSurveyToolExt;
  /** The nominal type of survey station for the trajectory stations. Individual stations may have a different type. */
  NominalTypeTrajStation?: TrajStationTypeExt;
  /** Information about a Trajectory that is relevant for OSDU integration but does not have a natural place in a Trajectory object. */
  TrajectoryOSDUIntegration?: TrajectoryOSDUIntegration;
}
export interface DrillReportSurveyStationReport
  extends _DrillReportSurveyStationReport {}

/** General information about a wellbore for a drill report period. */
interface _DrillReportWellboreInfo extends BaseType {
  /** The date when the drilling activity was completed. */
  DateDrillComplete?: Date;
  /** Pointer to a BusinessAssociate representing the lling contractor company. */
  DrillContractor?: eml.DataObjectReference;
  /** Date and time at which the well was predrilled.
   * This is when the well drilling equipment begin to bore into
   * the earth's surface for the purpose of drilling a well. */
  DTimPreSpud?: eml.TimeStamp;
  /** Date and time at which the well was spudded. This is when the well drilling equipment began to bore into the earth's surface for the purpose of drilling a well. */
  DTimSpud?: eml.TimeStamp;
  /** Pointer to a BusinessAssociate representing the drilling Operator company responsible for the well being drilled (the company for whom the well is being drilled). */
  Operator?: eml.DataObjectReference;
  /** Optional pointers to RigUtilization objects representing the rigs(s) used to drill the wellbore. */
  Rig?: eml.DataObjectReference[];
}
export interface DrillReportWellboreInfo extends _DrillReportWellboreInfo {}

/** General information about a production well test conducted during the drill report period. */
interface _DrillReportWellTestInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportWellTestInfo. */
  uid: eml.String64;
  /** The relative amount of CO2 gas. */
  CarbonDioxide?: eml.MassPerMassMeasure;
  /** The relative amount of chloride in the produced water. */
  Chloride?: eml.MassPerMassMeasure;
  /** The diameter of the choke opening. */
  ChokeOrificeSize?: eml.LengthMeasure;
  /** The density of the produced gas. */
  DensityGas?: eml.MassPerVolumeMeasure;
  /** The density of the produced oil. */
  DensityOil?: eml.MassPerVolumeMeasure;
  /** The density of the produced water. */
  DensityWater?: eml.MassPerVolumeMeasure;
  /** Date and time that the well test was completed. */
  DTim?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The maximum rate at which gas was produced. */
  FlowRateGas?: eml.VolumePerTimeMeasure;
  /** The maximum rate at which oil was produced. */
  FlowRateOil?: eml.VolumePerTimeMeasure;
  /** The maximum rate at which water was produced. */
  FlowRateWater?: eml.VolumePerTimeMeasure;
  /** The ratio of the volume of gas to the volume of oil. */
  GasOilRatio?: eml.VolumePerVolumeMeasure;
  /** The relative amount of H2S gas. */
  HydrogenSulfide?: eml.MassPerMassMeasure;
  /** The final bottomhole pressure. */
  PresBottom?: eml.PressureMeasure;
  /** The final flowing pressure. */
  PresFlowing?: eml.PressureMeasure;
  /** The final shut-in pressure. */
  PresShutIn?: eml.PressureMeasure;
  /** Test interval expressed as a measured depth. */
  TestMdInterval?: eml.MdInterval;
  /** The number of the well test. */
  TestNumber?: number;
  /** Test interval expressed as a true vertical depth. */
  TestTvdInterval?: eml.AbstractTvdInterval;
  /** The type of well test. */
  TestType?: WellTestType;
  /** The total amount of gas produced. This includes gas that
   * was disposed of (e.g., burned). */
  VolGasTotal?: eml.VolumeMeasure;
  /** The total amount of produced oil that was stored. */
  VolOilStored?: eml.VolumeMeasure;
  /** The total amount of oil produced. This includes oil that
   * was disposed of (e.g., burned). */
  VolOilTotal?: eml.VolumeMeasure;
  /** The total amount of water produced. This includes water that
   * was disposed of. */
  VolWaterTotal?: eml.VolumeMeasure;
  /** The relative amount of water per amount of oil. */
  WaterOilRatio?: eml.VolumePerVolumeMeasure;
}
export interface DrillReportWellTestInfo extends _DrillReportWellTestInfo {}

/** Specifies the type of work-string drive (rotary system). */
export type DriveType = "coiled tubing" | "rotary kelly drive" | "top drive";
interface _DriveType extends eml._TypeEnum {
  _: DriveType;
}

/** Information on corrected drilling exponents. */
interface _DxcStatistics extends BaseType {
  /** Corrected drilling exponent calculated for the interval. */
  Average: eml.DimensionlessMeasure;
  /** Log channel from which the drilling coefficient statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface DxcStatistics extends _DxcStatistics {}

/** Information on equivalent circulating density statistics. */
interface _EcdStatistics extends BaseType {
  /** Average equivalent circulating density at TD through the interval. */
  Average: eml.MassPerVolumeMeasure;
  /** Log channel from which the equivalent circulating density at TD statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface EcdStatistics extends _EcdStatistics {}

/** Information on a piece of equipment. Each kind of equipment in the set has a type (what it is) and attributes common across all instances of that type of equipment. The String Equipment then references these common attributes. */
interface _Equipment extends BaseType {
  /** Unique identifier for this instance of Equipment. */
  uid: eml.String64;
  /** The equipment's brand name. */
  BrandName?: eml.String64;
  /** Catalog where equipment can be found. */
  CatalogId?: eml.String64;
  /** Name of equipment as found in the catalog. */
  CatalogName?: eml.String64;
  /** Flag indicating whether equipment has a coating. */
  CoatingLinerApplied?: boolean;
  /** The description of this equipment. */
  Description?: eml.String2000;
  /** The description of this equipment to be permanently kept. */
  DescriptionPermanent?: eml.String2000;
  /** The drift diameter is the minimum inside diameter of pipe through which another tool or string can be pulled. */
  Drift?: eml.LengthMeasure;
  /** The name of the piece of equipment. */
  EquipmentName?: eml.String64;
  /** The equipment type etc. bridge plug, bull plug. capillary tubing. */
  EquipmentType: EquipmentTypeExt;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Grade level of this piece of material. */
  Grade?: GradeType;
  HoleAsManufactured?: PerfHole[];
  /** The inside diameter of this equipment. */
  Id?: eml.LengthMeasure;
  /** Equipment's inner coating based on enumeration value. */
  InsideCoating?: Coating;
  /** A flag that indicates the equipment has a serial number. */
  IsSerialized?: boolean;
  /** The major inside diameter of this equipment. */
  MajorId?: eml.LengthMeasure;
  /** The major outside diameter of this equipment. */
  MajorOd?: eml.LengthMeasure;
  /** Pointer to a BusinessAssociate representing the manufacturer of this equipment. */
  Manufacturer?: eml.DataObjectReference;
  /** Material that the equipment is made from. */
  Material?: eml.String64;
  /** The maximum inside diameter of this equipment. */
  MaxId?: eml.LengthMeasure;
  /** The maximum outside diameter of this equipment. */
  MaxOd?: eml.LengthMeasure;
  /** The minimum inside diameter of this equipment. */
  MinId?: eml.LengthMeasure;
  /** The minimum outside diameter of this equipment. */
  MinOd?: eml.LengthMeasure;
  /** The minor inside diameter of this equipment. */
  MinorId?: eml.LengthMeasure;
  /** The minor outside diameter of this equipment. */
  MinorOd?: eml.LengthMeasure;
  /** The model of the equipment. */
  Model?: eml.String64;
  /** The equipment's model type. */
  ModelType?: eml.String64;
  /** Sweet or sour service. */
  NameService?: eml.String64;
  /** The nominal size of this equipment. */
  NominalSize?: eml.LengthMeasure;
  /** The outside diameter of this equipment. */
  Od?: eml.LengthMeasure;
  /** Equipment's outside coating based on enumeration value. */
  OutsideCoating?: Coating;
  /** Number that identifies this part. */
  PartNo?: eml.String64;
  Property?: ExtPropNameValue[];
  /** Remarks about this equipment property. */
  Remark?: eml.String2000;
  /** Serial number. */
  SerialNumber?: eml.String64;
  /** Series number. */
  Series?: eml.String64;
  SlotAsManufactured?: PerfSlot[];
  /** Surface condition. */
  SurfaceCondition?: eml.String64;
  /** The length of this equipment. */
  UnitLength?: eml.LengthMeasure;
  /** The weight per length of this equipment. */
  UnitWeight?: eml.MassPerLengthMeasure;
}
export interface Equipment extends _Equipment {}

/** Information detailing the connection between two components. */
interface _EquipmentConnection extends _Connection {
  /** The form of connection: box or pin. */
  ConnectionForm?: ConnectionFormType;
  ConnectionType?: AbstractConnectionType;
  /** Connection upset. */
  ConnectionUpset?: eml.String64;
  /** Reference to the string equipment. */
  Equipment: eml.ComponentReference;
  /** Measurement of radial offset. */
  RadialOffset?: eml.LengthMeasure;
}
export interface EquipmentConnection extends _EquipmentConnection {}

/** Information on the collection of equipment. */
interface _EquipmentSet extends BaseType {
  Equipment: Equipment[];
}
export interface EquipmentSet extends _EquipmentSet {}

/** Specifies the values for type of equipment. */
export type EquipmentType =
  | "bridge plug"
  | "bull plug"
  | "capillary tubing"
  | "casing crossover"
  | "casing hanger"
  | "casing head"
  | "casing liner-expandable"
  | "casing shoe"
  | "casing spool"
  | "casing/casing liner"
  | "cement (behind casing)"
  | "cement basket"
  | "cement retainer"
  | "cement squeeze"
  | "cement stage tool"
  | "chemical injection mandrel"
  | "chemical injection valve"
  | "corrosion coupon carrier"
  | "dip tube"
  | "downhole choke"
  | "downhole sensor"
  | "ESP assembly"
  | "ESP bolt on discharge"
  | "ESP bolt on intake"
  | "ESP bolt on motor base"
  | "ESP bolt on motor head"
  | "ESP cable"
  | "ESP gas handler"
  | "ESP gas separator"
  | "ESP lower pigtail"
  | "ESP motor"
  | "ESP motor base centralizer"
  | "ESP motor flat cable"
  | "ESP motor shroud"
  | "ESP promotor"
  | "ESP pump"
  | "ESP pump discharge sensor sub"
  | "ESP seal"
  | "expansion joint"
  | "external cementing port"
  | "fill"
  | "fish"
  | "float collar"
  | "float shoe/guide shoe"
  | "gas anchor"
  | "gas lift mandrel"
  | "gas lift valve"
  | "gravel pack screen"
  | "hydraulic pump"
  | "injection mandrel"
  | "injection valve"
  | "junk in wellbore"
  | "landing collar"
  | "liner entry guide"
  | "liner hanger"
  | "mule shoe"
  | "notched collar"
  | "on-off tool"
  | "overshot"
  | "packer"
  | "packer plug"
  | "packer-multiple strings"
  | "packoff (tubing)"
  | "pcp-flex shaft intake"
  | "pcp-gear reducer (subsurface)"
  | "pcp-no turn tool/torque anchor"
  | "pcp-rotor"
  | "pcp-stator"
  | "pcp-tag bar"
  | "plug - cement"
  | "plug - mud"
  | "plunger lift ball"
  | "plunger lift bottom hole bumper assembly"
  | "plunger lift bumper spring"
  | "plunger lift collar stop"
  | "plunger lift plunger"
  | "polished rod"
  | "polished rod liner"
  | "ported collar"
  | "profile nipple"
  | "profile nipple plug"
  | "pump-out plug"
  | "sand screen-tubing"
  | "sand separator"
  | "screen liner/insert"
  | "seal assembly"
  | "seal bore extension"
  | "seat nipple/shoe"
  | "shear tool"
  | "sliding sleeve"
  | "steam cup mandrel"
  | "steam deflectors"
  | "strainer nipple"
  | "subsurface safety valve"
  | "sucker rod"
  | "sucker rod backoff coupling"
  | "sucker rod pump-insert"
  | "sucker rod pump-jacket"
  | "sucker rod pump-tubing pump barrel"
  | "sucker rod pump-tubing pump plunger"
  | "sucker rod sub"
  | "sucker rod-continuous"
  | "sucker rod-ribbon"
  | "sucker rod-sinker bar"
  | "tcp gun"
  | "tubing"
  | "tubing (coiled)"
  | "tubing anchor/catcher"
  | "tubing crossover"
  | "tubing drain"
  | "tubing hanger"
  | "tubing head (spool)"
  | "tubing purge check valve"
  | "tubing sub"
  | "wellbore notes"
  | "whipstock"
  | "wireline re-entry guide (bell collar)"
  | "y-tool";
interface _EquipmentType extends eml._TypeEnum {
  _: EquipmentType;
}

/** An extension of possible equipment types. */
export type EquipmentTypeExt = string;
type _EquipmentTypeExt = Primitive._string;

export type ErrorKind =
  | "alignment"
  | "azimuth reference"
  | "depth"
  | "magnetic"
  | "reading"
  | "sensor";
interface _ErrorKind extends eml._TypeEnum {
  _: ErrorKind;
}

export type ErrorPropagationMode = "B" | "G" | "R" | "S" | "W";
interface _ErrorPropagationMode extends eml._TypeEnum {
  _: ErrorPropagationMode;
}

interface _ErrorTerm extends eml._AbstractObject {
  GyroMode?: GyroMode;
  MeasureClass?: eml.MeasureClass;
  PropagationMode: ErrorPropagationMode;
  WeightingFunction: eml.DataObjectReference;
}
export interface ErrorTerm extends _ErrorTerm {}

interface _ErrorTermDictionary extends eml._AbstractObject {
  ErrorTerm: ErrorTerm[];
}
export interface ErrorTermDictionary extends _ErrorTermDictionary {}

interface _ErrorTermValue extends BaseType {
  ErrorTerm: eml.DataObjectReference;
  /** Business Rule : The unconstrained uom of the magnitude is actually constrained by the MeasureClass set to the associated ErrorTerm. */
  Magnitude: eml.GenericMeasure;
  /** Business Rules :
   * - The unconstrained uom of the mean value is actually constrained by the MeasureClass set to the associated ErrorTerm.
   * - If propagation mode is set to 'B' then MeanValue must exist */
  MeanValue?: eml.GenericMeasure;
}
export interface ErrorTermValue extends _ErrorTermValue {}

/** Qualifies the type of event: daily report, job, npt, etc. */
export type EventClassType =
  | "daily cost"
  | "daily report"
  | "failure (downhole equipment only)"
  | "job"
  | "job plan (phases)"
  | "mud attributes"
  | "npt (lost time event)"
  | "time log (time measure)";
interface _EventClassType extends eml._TypeEnum {
  _: EventClassType;
}

/** Event information type. */
interface _EventInfo extends BaseType {
  BeginEvent?: EventRefInfo;
  EndEvent?: EventRefInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
}
export interface EventInfo extends _EventInfo {}

/** Event reference information. */
interface _EventRefInfo extends BaseType {
  /** The referencing eventledger event. */
  Event?: eml.DataObjectReference;
  /** Install/pull date. */
  EventDate?: eml.TimeStamp;
}
export interface EventRefInfo extends _EventRefInfo {}

/** The type of the referencing event */
interface _EventType extends eml._String64 {
  /** The type of the event (job, daily report, etc.) */
  Class: EventClassType;
}
export interface EventType extends _EventType {}

/** Name-value extensions for the equipment property. */
interface _ExtPropNameValue extends BaseType {
  /** Unique identifier for this instance of ExtPropNameValue. */
  uid: eml.String64;
  /** A string representing the name of property. */
  Name?: eml.String64;
  /** A value string representing the units of measure of the value. */
  Value?: eml.String2000;
}
export interface ExtPropNameValue extends _ExtPropNameValue {}

/** Specifies the type of file referenced. */
export type FileNameType =
  | "file name"
  | "path name"
  | "universal resource locator"
  | "other";
interface _FileNameType extends eml._TypeEnum {
  _: FileNameType;
}

/** Fluid component schema. */
interface _Fluid extends BaseType {
  /** Unique identifier for this instance of Fluid. */
  uid: eml.String64;
  /** Mud alkalinity P1 from alternate alkalinity method (volume in ml of 0.02N acid
   * to reach the phenolphthalein endpoint). */
  AlkalinityP1?: eml.VolumeMeasure;
  /** Mud alkalinity P2 from alternate alkalinity method (volume in ml of 0.02N acid to titrate, the reagent mixture to the phenolphthalein endpoint). */
  AlkalinityP2?: eml.VolumeMeasure;
  /** Average specific gravity of solids. */
  Asg?: eml.MassPerMassMeasure;
  /** Average size of the drill cuttings. */
  AverageCuttingSize?: eml.LengthMeasure;
  /** Barite content percent. */
  BaritePc?: eml.VolumePerVolumeMeasure;
  /** Class of Brine. */
  BrineClass?: BrineClassExt;
  /** Density of water phase of NAF. */
  BrineDensity?: eml.MassPerVolumeMeasure;
  /** Percent brine content. */
  BrinePc?: eml.VolumePerVolumeMeasure;
  /** Calcium content. */
  Calcium?: eml.MassPerVolumeMeasure;
  /** Calcium chloride content. */
  CalciumChloride?: eml.MassPerVolumeMeasure;
  /** Calcium chloride percent. */
  CalciumChloridePc?: eml.VolumePerVolumeMeasure;
  /** Carbonate content. */
  Carbonate?: eml.MassPerVolumeMeasure;
  /** Chloride content. */
  Chloride?: eml.MassPerVolumeMeasure;
  /** Comments and remarks. */
  Comments?: eml.String2000;
  /** Pointer to a BusinessAssociate representing the company. */
  Company?: eml.DataObjectReference;
  /** Fluid density. */
  Density?: eml.MassPerVolumeMeasure;
  /** The time when fluid readings were recorded. */
  DTim?: eml.TimeStamp;
  /** Equivalent circulating density where fluid reading was recorded. */
  Ecd?: eml.MassPerVolumeMeasure;
  /** Measurement of the emulsion stability and oil-wetting capability in oil-based muds. */
  ElectStab?: eml.ElectricPotentialDifferenceMeasure;
  /** Engineer name */
  Engineer?: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** High temperature high pressure (HTHP) filter cake thickness. */
  FilterCakeHthp?: eml.LengthMeasure;
  /** Filter cake thickness at low (normal) temperature and pressure. */
  FilterCakeLtlp?: eml.LengthMeasure;
  /** High temperature high pressure (HTHP) filtrate (volume per 30 min). */
  FiltrateHthp?: eml.VolumeMeasure;
  /** API water loss (low temperature and pressure mud filtrate measurement) (volume per 30 min). */
  FiltrateLtlp?: eml.VolumeMeasure;
  /** Ten-minute gels. */
  Gel10Min?: eml.PressureMeasure;
  /** Ten-second gels. */
  Gel10Sec?: eml.PressureMeasure;
  /** Thirty-minute gels. */
  Gel30Min?: eml.PressureMeasure;
  /** Three-second gels. */
  Gel3Sec?: eml.PressureMeasureExt;
  /** Six-second gels. */
  Gel6Sec?: eml.PressureMeasureExt;
  /** Total calcium hardness. */
  HardnessCa?: eml.MassPerMassMeasure;
  /** Iron content. */
  Iron?: eml.MassPerVolumeMeasure;
  /** Assumed kick density for calculation of kick tolerance where the fluid reading was recorded. */
  KickToleranceIntensity?: eml.MassPerVolumeMeasure;
  /** Assumed kick volume for calculation of kick tolerance based on the kick intensity where the fluid reading was recorded. */
  KickToleranceVolume?: eml.VolumeMeasure;
  /** Lost circulation material. */
  Lcm?: eml.MassPerVolumeMeasure;
  /** Lime content. */
  Lime?: eml.MassPerVolumeMeasure;
  /** Sample location. */
  LocationSample?: eml.String64;
  /** Magnesium content. */
  Magnesium?: eml.MassPerVolumeMeasure;
  /** Cation exchange capacity (CEC) of the mud sample as measured by methylene blue titration (MBT). */
  Mbt?: eml.CationExchangeCapacityMeasureExt;
  /** The measured depth where the fluid readings were recorded. */
  Md?: eml.MeasuredDepth;
  /** Metal recovered from the wellbore. */
  MetalRecovered?: eml.MassMeasure;
  /** Methyl orange alkalinity of filtrate. */
  Mf?: eml.VolumeMeasure;
  /** The class of the drilling fluid. */
  MudClass?: MudClass;
  /** Oil on cuttings. */
  OilCtg?: eml.MassPerMassMeasure;
  /** Oil on dried cuttings. */
  OilCtgDry?: eml.MassPerVolumeMeasure;
  /** Oil and grease content. */
  OilGrease?: eml.MassPerVolumeMeasure;
  /** Percent oil content from retort. */
  OilPc?: eml.VolumePerVolumeMeasure;
  /** Mud pH. */
  Ph?: number;
  /** Phenolphthalein alkalinity of whole mud. */
  Pm?: eml.VolumeMeasure;
  /** Phenolphthalein alkalinity of mud filtrate. */
  PmFiltrate?: eml.VolumeMeasure;
  /** Polymers present in the mud system. */
  Polymer?: eml.VolumePerVolumeMeasure;
  /** Type of polymers present in the mud system. */
  PolyType?: eml.String64;
  /** Potassium content. */
  Potassium?: eml.MassPerVolumeMeasure;
  /** Permeability Plugging Test pressure. */
  PptPressure?: eml.PressureMeasureExt;
  /** Permeability Plugging Test spurt loss. */
  PptSpurtLoss?: eml.VolumeMeasureExt;
  /** Permeability Plugging Test temperature. */
  PptTemperature?: eml.ThermodynamicTemperatureMeasureExt;
  /** Maximum pressure rating of the blow out preventer. */
  PresBopRating?: eml.PressureMeasure;
  /** High temperature high pressure (HTHP) pressure. */
  PresHthp?: eml.PressureMeasure;
  /** Plastic viscosity. */
  Pv?: eml.DynamicViscosityMeasure;
  Rheometer?: Rheometer[];
  /** Salt content. */
  Salt?: eml.MassPerVolumeMeasure;
  /** Salt percent. */
  SaltPc?: eml.VolumePerVolumeMeasure;
  /** Sand content percent. */
  SandPc?: eml.VolumePerVolumeMeasure;
  /** Sodium chloride content. */
  SodiumChloride?: eml.MassPerVolumeMeasure;
  /** Sodium chloride percent. */
  SodiumChloridePc?: eml.VolumePerVolumeMeasure;
  /** Solids corrected for chloride content percent. */
  SolCorPc?: eml.VolumePerVolumeMeasure;
  /** Percent calculated solids content. */
  SolidsCalcPc?: eml.VolumePerVolumeMeasure;
  /** Solids high gravity content. */
  SolidsHiGrav?: eml.MassPerVolumeMeasure;
  /** Solids high gravity percent. */
  SolidsHiGravPc?: eml.VolumePerVolumeMeasure;
  /** Solids low gravity content. */
  SolidsLowGrav?: eml.MassPerVolumeMeasure;
  /** Low gravity solids percent. */
  SolidsLowGravPc?: eml.VolumePerVolumeMeasure;
  /** Solids percentage from retort. */
  SolidsPc?: eml.VolumePerVolumeMeasure;
  /** Sulfide content. */
  Sulfide?: eml.MassPerVolumeMeasure;
  /** True crystallization temperature. */
  Tct?: eml.ThermodynamicTemperatureMeasure;
  /** Flow line temperature measurement where the fluid reading was recorded. */
  TempFlowLine?: eml.ThermodynamicTemperatureMeasure;
  /** High temperature high pressure (HTHP) temperature. */
  TempHthp?: eml.ThermodynamicTemperatureMeasure;
  /** Mud pH measurement temperature. */
  TempPh?: eml.ThermodynamicTemperatureMeasure;
  /** Funnel viscosity temperature. */
  TempVis?: eml.ThermodynamicTemperatureMeasure;
  /** Turbidity units to measure the cloudiness or haziness of a fluid. */
  Turbidity?: number;
  /** The true vertical depth where the fluid readings were recorded. */
  Tvd?: eml.AbstractVerticalDepth;
  /** Description for the type of fluid. */
  Type?: eml.String64;
  /** Funnel viscosity in seconds. */
  VisFunnel?: eml.TimeMeasure;
  /** Water content percent. */
  WaterPc?: eml.VolumePerVolumeMeasure;
  /** A factor showing the activity level of salt in oil-based mud. */
  WaterPhaseSalinity?: eml.MassPerVolumeMeasure;
  /** Calcium content in the whole mud sample, including oil and water phases. */
  WholeMudCalcium?: eml.MassPerVolumeMeasure;
  /** Chloride content in the whole mud sample, including oil and water phases. */
  WholeMudChloride?: eml.MassPerVolumeMeasure;
  /** Yield point (Bingham and Herschel Bulkley models). */
  Yp?: eml.PressureMeasure;
  /** Zinc oxide content. */
  ZincOxide?: eml.MassPerVolumeMeasure;
}
export interface Fluid extends _Fluid {}

/** Location of fluid in the wellbore. */
interface _FluidLocation extends BaseType {
  /** Unique identifier for this instance of FluidLocation. */
  uid: eml.String64;
  /** Reference to fluid used in the CementJob. */
  Fluid: eml.ComponentReference;
  LocationType: WellboreFluidLocation;
  /** Measured depth of the base of the cement. */
  MDFluidBase: eml.LengthMeasure;
  /** Measured depth at the top of the interval. */
  MDFluidTop: eml.LengthMeasure;
  /** Volume of fluid at this location. */
  Volume: eml.VolumeMeasure;
}
export interface FluidLocation extends _FluidLocation {}

/** Information on fluid report event. */
interface _FluidReportExtension extends _AbstractEventExtension {
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to the fluid report */
  FluidsReport?: eml.DataObjectReference;
}
export interface FluidReportExtension extends _FluidReportExtension {}

/** Used to capture an analysis of the drilling mud. */
interface _FluidsReport extends eml._AbstractObject {
  /** Date and time the information is related to. */
  DTim: eml.TimeStamp;
  Fluid?: Fluid[];
  /** Along-hole measured depth of measurement from the drill datum. */
  Md: eml.MeasuredDepth;
  /** Fluids report number. */
  NumReport?: number;
  /** Vertical depth of the measurements. */
  Tvd?: eml.AbstractVerticalDepth;
  Wellbore: eml.DataObjectReference;
}
export interface FluidsReport extends _FluidsReport {}

/** Specifies the values for mud log parameters that are measured in units of force. */
export type ForceParameterKind = "overpull on connection" | "overpull on trip";
interface _ForceParameterKind extends eml._TypeEnum {
  _: ForceParameterKind;
}

/** Information on amount of gas in the mud. */
interface _GasInMud extends BaseType {
  /** Average percentage of gas in the mud. */
  Average?: eml.VolumePerVolumeMeasure;
  Channel: eml.DataObjectReference;
  /** Maximum percentage of gas in the mud. */
  Maximum?: eml.VolumePerVolumeMeasure;
}
export interface GasInMud extends _GasInMud {}

/** Readings at maximum gas production. */
interface _GasPeak extends BaseType {
  /** Average total gas. */
  AverageGas?: eml.VolumePerVolumeMeasure;
  /** Background gas reading. */
  BackgroundGas?: eml.VolumePerVolumeMeasure;
  Channel: eml.DataObjectReference;
  /** Measured depth at which the gas reading was taken. */
  MdPeak?: eml.LengthMeasure;
  /** Peak gas reading. */
  PeakGas?: eml.VolumePerVolumeMeasure;
  /** Type of gas peak */
  PeakType: GasPeakType;
}
export interface GasPeak extends _GasPeak {}

/** Type of gas reading. */
export type GasPeakType =
  | "circulating background gas"
  | "connection gas"
  | "drilling background gas"
  | "drilling gas peak"
  | "flow check gas"
  | "no readings"
  | "other"
  | "shut down gas"
  | "trip gas";
interface _GasPeakType extends eml._TypeEnum {
  _: GasPeakType;
}

/** A unit of geological time that can be used as part of an interpretation of a geology sequence. Use it for major units of geological time such as “Paleozoic”, “Mesozoic” or for more detailed time intervals such as ”Permian”, “Triassic”, “Jurassic”, etc. */
interface _GeochronologicalUnit extends eml._String64 {
  /** Person or collective body responsible for authorizing the information. */
  authority?: eml.String64;
  /** Defines the time spans in geochronology. */
  kind: eml.GeochronologicalRank;
}
export interface GeochronologicalUnit extends _GeochronologicalUnit {}

/** Geology features found in the location of the borehole string. */
interface _GeologyFeature extends BaseType {
  /** Unique identifier for this instance of GeologyFeature. */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth interval for this feature. */
  FeatureMdInterval?: eml.MdInterval;
  /** True vertical depth interval for this feature. */
  FeatureTvdInterval?: eml.AbstractTvdInterval;
  /** Reference to a RESQML geologic unit interpretation for this feature. */
  GeologicUnitInterpretation?: eml.DataObjectReference;
  /** Aquifer or reservoir. */
  GeologyType?: GeologyType;
  /** Name of the feature. */
  Name?: eml.String64;
}
export interface GeologyFeature extends _GeologyFeature {}

/** Specifies the values for type of geology. */
export type GeologyType = "aquifer" | "reservoir";
interface _GeologyType extends eml._TypeEnum {
  _: GeologyType;
}

/** Specifies the values for the grade level of this piece of equipment. */
export type GradeType =
  | "13CR"
  | "13CR- 80"
  | "13CR- 85"
  | "13CR- 95"
  | "13CR-110"
  | "35"
  | "45"
  | "46"
  | "50"
  | "620C"
  | "75"
  | "750N"
  | "75A"
  | "780M"
  | "95"
  | "960M"
  | "970N"
  | "A53"
  | "A53A"
  | "A53B"
  | "Armco-95"
  | "B"
  | "C"
  | "C-110"
  | "C-75"
  | "C-90"
  | "C-95"
  | "D"
  | "DE"
  | "DER"
  | "DR"
  | "DWR"
  | "E"
  | "E-75"
  | "EL"
  | "F-25"
  | "FG"
  | "FS-80"
  | "FSS-95"
  | "G"
  | "G-105"
  | "GT-80S"
  | "H2S-90"
  | "H2S-95"
  | "H-40"
  | "HC-95"
  | "HCK-55"
  | "HCL-80"
  | "HCN-80"
  | "HCP-110"
  | "HCQ-125"
  | "HO-70"
  | "HS"
  | "J-20"
  | "J-55"
  | "K"
  | "K-40"
  | "K-55"
  | "KD"
  | "KD-63"
  | "L-80"
  | "LS-140"
  | "LS-50"
  | "LS-65"
  | "M-65"
  | "M-90"
  | "M-95"
  | "MAV-50"
  | "MD-56"
  | "MMS"
  | "N-105"
  | "N-23"
  | "N-30"
  | "N-40"
  | "N-54"
  | "N-75"
  | "N-78"
  | "N-80"
  | "N-90"
  | "N-96"
  | "N-97"
  | "P-105"
  | "P-110"
  | "PCP  900"
  | "PCP 1000"
  | "PCP 1500"
  | "PCP 2500"
  | "PH-6"
  | "Plus"
  | "Q-125"
  | "QT-1000"
  | "QT-1200"
  | "QT-700"
  | "QT-800"
  | "QT-900"
  | "S"
  | "S-135"
  | "S-59"
  | "S-60"
  | "S-67"
  | "S-80"
  | "S-87"
  | "S-88"
  | "S-95"
  | "SC-90"
  | "SE"
  | "SER"
  | "SM"
  | "SOO-95"
  | "Stainless"
  | "SWR"
  | "T"
  | "T-66"
  | "T-95"
  | "T-D61"
  | "T-D63"
  | "T-K65"
  | "UHS"
  | "USS-125"
  | "USS-140"
  | "USS-50"
  | "USS-95"
  | "V-150"
  | "WC-50"
  | "X"
  | "X-140"
  | "X-42"
  | "X-46"
  | "X-52"
  | "X-56"
  | "X-60"
  | "X-70"
  | "X-95"
  | "XD";
interface _GradeType extends eml._TypeEnum {
  _: GradeType;
}

/** The location/interval of the gravel pack, including its history. */
interface _GravelPackInterval extends BaseType {
  /** Unique identifier for this instance of GravelPackInterval. */
  uid: eml.String64;
  /** Reference to the downhole string that denotes the interval of the gravel pack. */
  DownholeString?: eml.DataObjectComponentReference;
  /** The contactInterval event information. */
  EventHistory?: EventInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to a RESQML geologic unit interpretation. */
  GeologicUnitInterpretation?: eml.DataObjectReference[];
  /** Reference to a geology feature. */
  GeologyFeature?: eml.DataObjectComponentReference[];
  /** Gravel packed measured depth interval for this completion. */
  GravelPackMdInterval?: eml.MdInterval;
  /** Gravel packed true vertical depth interval for this completion. */
  GravelPackTvdInterval?: eml.AbstractTvdInterval;
  StatusHistory?: IntervalStatusHistory[];
}
export interface GravelPackInterval extends _GravelPackInterval {}

export type GyroAxisCombination = "z" | "xy" | "xyz";
interface _GyroAxisCombination extends eml._TypeEnum {
  _: GyroAxisCombination;
}

export type GyroMode = "continuous" | "stationary";
interface _GyroMode extends eml._TypeEnum {
  _: GyroMode;
}

/** SPE90408 Table 11 & Appendix D */
interface _GyroToolConfiguration extends BaseType {
  /** BR VS GyroMode */
  AccelerometerAxisCombination?: AccelerometerAxisCombination;
  ContinuousGyro?: ContinuousGyro[];
  ExternalReference: boolean;
  StationaryGyro?: StationaryGyro[];
  XyAccelerometer?: XyAccelerometer;
}
export interface GyroToolConfiguration extends _GyroToolConfiguration {}

/** Specifies values for the types of hole casing. */
export type HoleCasingType =
  | "blow out preventer"
  | "casing"
  | "conductor"
  | "curved conductor"
  | "liner"
  | "open hole"
  | "riser"
  | "tubing";
interface _HoleCasingType extends eml._TypeEnum {
  _: HoleCasingType;
}

/** The status of the hole during logging. */
export type HoleLoggingStatus = "open hole" | "cased hole" | "cemented hole";
interface _HoleLoggingStatus extends eml._TypeEnum {
  _: HoleLoggingStatus;
}

/** Hole Opener Component Schema. Describes the hole-opener tool (often called a ‘reamer’) used on the tubular string. */
interface _HoleOpener extends BaseType {
  /** Diameter of the reamer. */
  DiaHoleOpener?: eml.LengthMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Pointer to a BusinessAssociate representing the manufacturer or supplier of the tool. */
  Manufacturer?: eml.DataObjectReference;
  /** Number of cutters on the tool. */
  NumCutter?: number;
  /** Under reamer or fixed blade. */
  TypeHoleOpener?: HoleOpenerType;
}
export interface HoleOpener extends _HoleOpener {}

/** Specifies the types of hole openers. */
export type HoleOpenerType = "under-reamer" | "fixed blade";
interface _HoleOpenerType extends eml._TypeEnum {
  _: HoleOpenerType;
}

/** Operations Health, Safety and Environment Schema. Captures data related to HSE events (e.g., tests, inspections, meetings, and drills), test values (e.g., pressure tested to), and/or incidents (e.g., discharges, non-compliance notices received, etc.). */
interface _Hse extends BaseType {
  /** Comments and remarks. */
  Comments?: eml.String2000;
  /** Incident free duration (commonly in days). */
  DaysIncFree?: eml.TimeMeasure;
  /** Daily whole mud discarded. */
  FluidDischarged?: eml.VolumeMeasure;
  Incident?: Incident[];
  /** Last abandonment drill. */
  LastAbandonDrill?: eml.TimeStamp;
  /** Last blow out preventer drill. */
  LastBopDrill?: eml.TimeStamp;
  /** Last blow out preventer pressure test. */
  LastBopPresTest?: eml.TimeStamp;
  /** Last casing pressure test date and time. */
  LastCsgPresTest?: eml.TimeStamp;
  /** Last diverter drill. */
  LastDiverterDrill?: eml.TimeStamp;
  /** Last fire or life boat drill. */
  LastFireBoatDrill?: eml.TimeStamp;
  /** Last rig inspection/check. */
  LastRigInspection?: eml.TimeStamp;
  /** Last safety inspection. */
  LastSafetyInspection?: eml.TimeStamp;
  /** Last safety meeting. */
  LastSafetyMeeting?: eml.TimeStamp;
  /** Last trip drill. */
  LastTripDrill?: eml.TimeStamp;
  /** Next blow out preventer pressure test. */
  NextBopPresTest?: eml.TimeStamp;
  /** Inspection non-compliance notice served?
   * Values are "true" (or "1") and "false" (or "0"). */
  NonComplianceIssued?: boolean;
  /** Number of health, safety and environment incidents reported. */
  NumStopCards?: number;
  /** Blow out preventer annular preventer pressure tested to. */
  PresAnnular?: eml.PressureMeasure;
  /** Choke line pressure tested to. */
  PresChokeLine?: eml.PressureMeasure;
  /** Choke line manifold pressure tested to. */
  PresChokeMan?: eml.PressureMeasure;
  /** Blow out preventer diverter pressure tested to. */
  PresDiverter?: eml.PressureMeasure;
  /** Kelly hose pressure tested to. */
  PresKellyHose?: eml.PressureMeasure;
  /** Last casing pressure test pressure. */
  PresLastCsg?: eml.PressureMeasure;
  /** Blow out preventer ram pressure tested to. */
  PresRams?: eml.PressureMeasure;
  /** Standpipe manifold pressure tested to. */
  PresStdPipe?: eml.PressureMeasure;
  /** Governmental regulatory inspection agency inspection?
   * Values are "true" (or "1") and "false" (or "0"). */
  RegAgencyInsp?: boolean;
  /** Volume of cuttings discharged. */
  VolCtgDischarged?: eml.VolumeMeasure;
  /** Oil on cuttings daily discharge. */
  VolOilCtgDischarge?: eml.VolumeMeasure;
  /** Volume of sanitary waste discharged. */
  WasteDischarged?: eml.VolumeMeasure;
}
export interface Hse extends _Hse {}

/** Rig Hydrocyclones Schema. A hydrocyclone is a cone-shaped device for separating fluids and the solids dispersed in fluids. */
interface _Hydrocyclone extends BaseType {
  /** Unique identifier for this instance of Hydrocyclone. */
  uid: eml.String64;
  /** Cone description. */
  DescCone?: eml.String64;
  /** Date and time the hydroclone was installed. */
  DTimInstall?: eml.TimeStamp;
  /** Removal date and time the hydroclone was removed. */
  DTimRemove?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Pointer to a BusinessAssociate representing the manufacturer or supplier of the item. */
  Manufacturer?: eml.DataObjectReference;
  /** Manufacturer's designated model. */
  Model?: eml.String64;
  /** An identification tag for the hydrocyclone.
   * A serial number is a type of identification tag; however, some tags contain many pieces of information. This element only identifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** Pointer to a BusinessAssociate representing the contractor/owner. */
  Owner?: eml.DataObjectReference;
  /** Description of the type of object. */
  Type?: eml.String64;
}
export interface Hydrocyclone extends _Hydrocyclone {}

/** Specifies the condition codes for the bearing wear. */
export type IadcBearingWearCode =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "E"
  | "F"
  | "N"
  | "X";
interface _IadcBearingWearCode extends eml._TypeEnum {
  _: IadcBearingWearCode;
}

/** Specifies the IADC integer codes for the inner or outer tooth rows. */
export type IadcIntegerCode =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8";
interface _IadcIntegerCode extends eml._TypeEnum {
  _: IadcIntegerCode;
}

/** Operations HSE Schema. Captures data for a specific incident. */
interface _Incident extends BaseType {
  /** Unique identifier for this instance of Incident */
  uid: eml.String64;
  /** Cause description. */
  CauseDesc?: eml.String2000;
  /** Gross estimate of the cost incurred due to the incident. */
  CostLossGross?: eml.Cost;
  /** Accident description. */
  DescAccident?: eml.String2000;
  /** Location description. */
  DescLocation?: eml.String64;
  /** Date and time the information is related to. */
  DTim: eml.TimeStamp;
  /** Number of hours lost due to the incident. */
  ETimLostGross?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Near miss incident occurrence?
   * Values are "true" (or "1") and "false" (or "0"). */
  IsNearMiss?: boolean;
  /** Number of personnel killed due to the incident. */
  NumFatality?: number;
  /** Number of personnel with major injuries. */
  NumMajorInjury?: number;
  /** Number of personnel with minor injuries. */
  NumMinorInjury?: number;
  /** Remedial action description. */
  RemedialActionDesc?: eml.String2000;
  /** Name of the person who prepared the incident report. */
  Reporter?: eml.String64;
  /** Pointer to a BusinessAssociate representing the company that caused the incident. */
  ResponsibleCompany?: eml.DataObjectReference;
}
export interface Incident extends _Incident {}

/** Core inner barrel type. */
export type InnerBarrelType =
  | "undifferentiated"
  | "aluminum"
  | "gel"
  | "fiberglass";
interface _InnerBarrelType extends eml._TypeEnum {
  _: InnerBarrelType;
}

/** A container object for zero or more InterpretedGeologyInterval objects. The container references a specific wellbore, a depth interval, a growing object status, and a collection of interpreted geology intervals.
 * These values are manually entered per sample by the wellsite geologist or mud logger as an interpretation of the actual lithology sequence along the length of the wellbore by correlating the percentage lithologies observed in the cuttings samples along with other data (typically the drill rate and gamma ray curves), to estimate the location of the boundaries between the different lithology types. This analysis creates a sequence of individual lithologies along the wellbore. Therefore, InterpretedGeology typically contains a single lithology element for each interval that captures the detailed geological description of the lithology. */
interface _InterpretedGeology extends eml._AbstractMdGrowingObject {
  InterpretedGeologyInterval?: InterpretedGeologyInterval[];
  /** Business Rule: This MUST point to the same wellbore that the Wellbore element on the containing WellboreGeology object points to. */
  Wellbore: eml.DataObjectReference;
}
export interface InterpretedGeology extends _InterpretedGeology {}

/** Represents a depth interval along the wellbore which contains a single interpreted lithology type. It can be used to:
 * - carry information about geochronology and lithostratigraphy
 * - create a pre-well geological prognosis with chronostratigraphic, lithostratigraphic, and lithology entries.
 * These intervals can be sent via ETP using the GrowingObject protocol. */
interface _InterpretedGeologyInterval
  extends eml._AbstractMdIntervalGrowingPart {
  /** The name of a Geochronology, with the "kind" attribute specifying the geochronological time span. */
  GeochronologicalUnit?: GeochronologicalUnit[];
  InterpretedLithology?: InterpretedIntervalLithology;
  /** Specifies the unit of lithostratigraphy. */
  LithostratigraphicUnit?: LithostratigraphicUnit[];
}
export interface InterpretedGeologyInterval
  extends _InterpretedGeologyInterval {}

/** The description of a single rock type that is used within InterpretedGeologyInterval. There can only be one of these in each InterpretedGeologyInterval. */
interface _InterpretedIntervalLithology extends BaseType {
  /** Unique identifier for this instance of InterpretedIntervalLithology. */
  uid?: eml.String64;
  /** An ISO 19115 EIP-derived set of metadata attached to ensure the traceability of the InterpretedIntervalLithology */
  Citation?: eml.Citation;
  /** An optional custom lithology encoding scheme.
   * If used, it is recommended that the scheme follows the NPD required usage. With the numeric values noted in the enum tables, which was the original intent for this item.
   * The NPD Coding System assigns a digital code to the main lithologies as per the Norwegian Blue Book data standards.
   * The code was then derived by lithology = (main lithology * 10) + cement + (modifier / 100).
   * Example: Calcite cemented silty micaceous sandstone: (33 * 10) + 1 + (21 / 100) gives a numeric code of 331.21.
   * However, the NPD is also working through Energistics/Caesar to potentially change this usage.)
   * This scheme should not be used for mnemonics, because those vary by operator, and if an abbreviation is required, a local look-up table should be used by the rendering client, based on Lithology Type. */
  CodeLith?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology color description, from Shell 1995 4.3.3.1 and 4.3.3.2 Colors with the addition of: frosted. e.g., black, blue, brown, buff, green, grey, olive, orange, pink, purple, red, translucent, frosted, white, yellow; modified by: dark, light, moderate, medium, mottled, variegated, slight, weak, strong, and vivid. */
  Color?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology compaction from Shell 1995 4.3.1.5, which includes: not compacted, slightly compacted, compacted, strongly compacted, friable, indurated, hard. */
  Compaction?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Mineral hardness. Typically, this element is rarely used because mineral hardness is not typically recorded.
   * What typically is recorded is compaction. However, this element is retained for use defined as per Mohs scale of mineral hardness. */
  Hardness?: eml.String64;
  /** The geological name for the type of lithology from the enum table listing a
   * subset of the OneGeology / CGI defined formation types. */
  Kind: eml.LithologyKindExt;
  /** STRUCTURED DESCRIPTION USAGE. Lithology matrix/cement description. Terms will be as defined in the enumeration table.
   * e.g., "calcite" (Common) "dolomite", "ankerite" (e.g., North Sea HPHT reservoirs such as Elgin and Franklin have almost pure ankerite cementation) "siderite" (Sherwood sandstones, southern UK typical Siderite cements), "quartz" (grain-to-grain contact cementation or secondary quartz deposition), "kaolinite", "illite" (e.g., Village Fields North Sea), "smectite","chlorite" (Teg, Algeria.). */
  MatrixCement?: eml.MatrixCementKind;
  /** STRUCTURED DESCRIPTION USAGE. Lithology permeability description from Shell 4.3.2.5.
   * In the future, these values would benefit from quantification, e.g., tight, slightly, fairly, highly. */
  Permeability?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Visible porosity fabric description from after Shell 4.3.2.1 and 4.3.2.2: intergranular (particle size greater than 20m), fine interparticle (particle size less than 20m), intercrystalline, intragranular, intraskeletal, intracrystalline, mouldic, fenestral, shelter, framework, stylolitic, replacement, solution, vuggy, channel, cavernous. */
  PorosityFabric?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology visible porosity description.
   * Defined after BakerHughes definitions, as opposed to Shell, which has no linkage to actual numeric estimates. */
  PorosityVisible?: eml.String64;
  Qualifier?: LithologyQualifier[];
  /** STRUCTURED DESCRIPTION USAGE. Lithology roundness description from Shell 4.3.1.3. Roundness refers to modal size class: very angular, angular, subangular, subrounded, rounded, well rounded. */
  Roundness?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology grain size description. Defined from Shell 4.3.1.1. (Wentworth) modified to remove the ambiguous term pelite.
   * Size ranges in millimeter (or micrometer) and inches.
   * LT 256 mm        LT 10.1 in         "boulder"
   * 64-256 mm        2.5–10.1 in        "cobble";
   * 32–64 mm        1.26–2.5 in       "very coarse gravel"
   * 16–32 mm        0.63–1.26 in        "coarse gravel"
   * 8–16 mm            0.31–0.63 in        "medium gravel"
   * 4–8 mm            0.157–0.31 in        "fine gravel"
   * 2–4 mm            0.079–0.157 in     "very fine gravel"
   * 1–2 mm           0.039–0.079 in    "very coarse sand"
   * 0.5–1 mm        0.020–0.039 in        "coarse sand"
   * 0.25–0.5 mm        0.010–0.020 in     "medium sand"
   * 125–250 um        0.0049–0.010 in        "fine sand"
   * 62.5–125 um      .0025–0.0049 in   "very fine sand"
   * 3.90625–62.5 um        0.00015–0.0025 in    "silt"
   * LT 3.90625 um        LT 0.00015 in        "clay"
   * LT 1 um            LT 0.000039 in        "colloid" */
  SizeGrain?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology sorting description from Shell 4.3.1.2 Sorting: very poorly sorted, unsorted, poorly sorted, poorly to moderately well sorted, moderately well sorted, well sorted, very well sorted, unimodally sorted, bimodally sorted. */
  Sorting?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology sphericity description for the modal size class of grains in the sample, defined as per Shell 4.3.1.4 Sphericity: very elongated, elongated, slightly elongated, slightly spherical, spherical, very spherical. */
  Sphericity?: eml.String64;
  /** STRUCTURED DESCRIPTION USAGE. Lithology matrix texture description from Shell 1995 4.3.2.6: crystalline, (often "feather-edge" appearance on breaking), friable, dull, earthy, chalky, (particle size less than 20m; often exhibits capillary imbibition) visibly particulate, granular, sucrosic, (often exhibits capillary imbibition).
   * Examples: compact interlocking, particulate, (Gradational textures are quite common.) chalky matrix with sucrosic patches, (Composite textures also occur). */
  Texture?: eml.String64;
}
export interface InterpretedIntervalLithology
  extends _InterpretedIntervalLithology {}

/** Information on the status history in the interval. */
interface _IntervalStatusHistory extends BaseType {
  /** Unique identifier for this instance of IntervalStatusHistory. */
  uid: eml.String64;
  /** Defines the proportional amount of fluid from the well completion that is flowing through this interval within a wellbore. */
  AllocationFactor?: NonNegativeFraction;
  /** Comments and remarks about the interval over this period of time. */
  Comment?: eml.String2000;
  /** The end date of status and allocation factor. */
  EndDate?: eml.TimeStamp;
  /** The physical status of an interval (e.g., open, closed, proposed). */
  PhysicalStatus?: PhysicalStatus;
  /** The start date of  the status and allocation factor. */
  StartDate?: eml.TimeStamp;
  /** Measured depth interval over which this status is valid for the given time frame. */
  StatusMdInterval?: eml.MdInterval;
}
export interface IntervalStatusHistory extends _IntervalStatusHistory {}

/** Inventory Component Schema. */
interface _Inventory extends BaseType {
  /** Unique identifier for this instance of Inventory. */
  uid: eml.String64;
  /** Cost for the product for the report interval. */
  CostItem?: eml.Cost;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Item weight or volume per unit. */
  ItemWtOrVolPerUnit: AbstractItemWtOrVolPerUnit;
  /** Name or type of inventory item. */
  Name: eml.String64;
  /** Price per item unit, assume same currency for all items. */
  PricePerUnit?: eml.Cost;
  /** Daily quantity adjustment/correction. */
  QtyAdjustment?: number;
  /** Amount of the item remaining on location after all adjustments for the report interval. */
  QtyOnLocation?: number;
  /** Quantity received at the site. */
  QtyReceived?: number;
  /** Quantity returned to base from site. */
  QtyReturned?: number;
  /** Start quantity for report interval. */
  QtyStart?: number;
  /** Quantity used for the report interval. */
  QtyUsed?: number;
}
export interface Inventory extends _Inventory {}

/** Crush test data point. */
interface _ISO13503_2CrushTestData extends BaseType {
  /** Unique identifier for this instance of ISO13503_2CrushTestData. */
  uid: eml.String64;
  /** Mass percentage of fines after being exposed to stress. */
  Fines: eml.MassPerMassMeasure;
  /** Stress measured at a point during a crush test. */
  Stress: eml.PressureMeasure;
}
export interface ISO13503_2CrushTestData extends _ISO13503_2CrushTestData {}

/** Proppant properties on percent retained and sieve number. Data from this ISO anaylsis. */
interface _ISO13503_2SieveAnalysisData extends BaseType {
  /** Unique identifier for this instance of ISO13503_2SieveAnalysisData. */
  uid: eml.String64;
  /** The percentage of mass retained in the sieve. */
  PercentRetained: eml.MassPerMassMeasure;
  /** ASTM US Standard mesh opening size used in the sieve analysis test.  To indicate "Pan",  use "0". */
  SieveNumber: eml.NonNegativeLong;
}
export interface ISO13503_2SieveAnalysisData
  extends _ISO13503_2SieveAnalysisData {}

/** These values represent the state of a WITSML object. */
export type ItemState = "actual" | "model" | "plan";
interface _ItemState extends eml._TypeEnum {
  _: ItemState;
}

/** Item volume per unit. */
interface _ItemVolPerUnit extends _AbstractItemWtOrVolPerUnit {
  /** Item volume per unit. */
  ItemVolPerUnit: eml.VolumeMeasure;
}
export interface ItemVolPerUnit extends _ItemVolPerUnit {}

/** Item weight per unit. */
interface _ItemWtPerUnit extends _AbstractItemWtOrVolPerUnit {
  /** Item weight per unit. */
  ItemWtPerUnit: eml.MassMeasure;
}
export interface ItemWtPerUnit extends _ItemWtPerUnit {}

/** WITSML - Tubular Jar Component Schema. Captures information about jars, which are mechanical or hydraulic devices used in the drill stem to deliver an impact load to another component of the drill stem, especially when that component is stuck. */
interface _Jar extends BaseType {
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Down set force. */
  ForDownSet?: eml.ForceMeasure;
  /** Down trip force. */
  ForDownTrip?: eml.ForceMeasure;
  /** Pump open force. */
  ForPmpOpen?: eml.ForceMeasure;
  /** Seal friction force. */
  ForSealFric?: eml.ForceMeasure;
  /** Up set force. */
  ForUpSet?: eml.ForceMeasure;
  /** Up trip force. */
  ForUpTrip?: eml.ForceMeasure;
  /** The jar action. */
  JarAction?: JarAction;
  /** The kind of jar. */
  TypeJar?: JarType;
}
export interface Jar extends _Jar {}

/** Specifies the type of jar action. */
export type JarAction = "up" | "down" | "both" | "vibrating";
interface _JarAction extends eml._TypeEnum {
  _: JarAction;
}

/** Specifies the type of jar. */
export type JarType = "mechanical" | "hydraulic" | "hydro mechanical";
interface _JarType extends eml._TypeEnum {
  _: JarType;
}

/** Information on the job event. */
interface _JobExtension extends _AbstractEventExtension {
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Comment on the reason for the job */
  JobReason?: eml.String2000;
  /** Status of job */
  JobStatus?: eml.String64;
  /** The primary reason for doing this job. */
  PrimaryMotivationForJob?: eml.String64;
}
export interface JobExtension extends _JobExtension {}

/** Integer level code from 1 through 8.@pattern .+ */
export type LevelIntegerCode = number;
type _LevelIntegerCode = Primitive._number;

/** This class is used to represent a period of time when a particular license was valid. */
interface _LicensePeriod extends BaseType {
  /** The date and time when the license became effective. */
  EffectiveDateTime?: eml.TimeStamp;
  /** License number. */
  NumLicense: eml.String64;
  /** The date and time when the license ceased to be effective. */
  TerminationDateTime?: eml.TimeStamp;
}
export interface LicensePeriod extends _LicensePeriod {}

/** Specifies the style of line used to define the DepthRegTrackCurve. */
export type LineStyle =
  | "dashed"
  | "solid"
  | "dotted"
  | "short dashed"
  | "long dashed";
interface _LineStyle extends eml._TypeEnum {
  _: LineStyle;
}

/** A description of minerals or accessories that constitute a fractional part of a CuttingsIntervalLithology. */
interface _LithologyQualifier extends BaseType {
  /** Unique identifier for this instance of LithologyQualifier */
  uid: eml.String64;
  /** The relative abundance of the qualifier estimated based on a "visual area" by inspecting the cuttings spread out on the shaker table before washing, or in the sample tray after washing.
   * This represents the upper bound of the observed range, and is in the following increments at the upper bound:
   * 1 = less than or equal to 1%
   * 2 = greater than 1% and less than 2%
   * 5 = greater than or equal to 2% and less than 5%
   * and then in 5% increments, 10 (=5-10%), 15 (=10-15%) up to 100 (=95-100%).
   * The end user can then elect to either display the %, or map them to an operator-specific term or coding, e.g., 1 less than or equal to 1% = rare trace, or occasional, or very sparse, etc., depending on the end users' terminology.
   * i.e. 1 less then or equal to 1%=Rare Trace, or occasional, or very sparse etc., depending on the the end users' terminology.) */
  Abundance?: eml.VolumePerVolumeMeasure;
  /** A textual description of the qualifier. */
  Description?: eml.String2000;
  /** The type of qualifier. */
  Kind: eml.LithologyQualifierKindExt;
  /** The measured depth interval represented by the qualifier. This must be within the range of the parent geologic interval. If MdInterval is not given then the qualifier is deemed to exist over the entire depth range of the parent geologyInterval. */
  MdInterval?: eml.MdInterval;
}
export interface LithologyQualifier extends _LithologyQualifier {}

/** The name of a lithostratigraphy, with the "kind" attribute specifying the lithostratigraphic unit-hierarchy (group, formation, member or bed). The entry at each level is free text for the local lithostratigraphy at that level in the hierarchy. If a single hierarchy is defined, it is assumed this is at the formation level in the hierarchy and kind=formation should be used for the entry.
 * Used to hold information about the stratigraphic units that an interpreted lithology may belong to. These are based primarily on the differences between rock types rather than their specific age. For example, in the Grand Canyon, some of the major lithostratigraphic units are the “Navajo”, “Kayenta”, “Wingate”, “Chinle” and “Moenkopi” formations, each of which is represented by a particular set of rock properties or characteristics. */
interface _LithostratigraphicUnit extends eml._String64 {
  /** Person or collective body responsible for authorizing the information. */
  authority: eml.String64;
  /** Specifies the lithostratigraphic unit-hierarchy (group, formation, member or bed). */
  kind: eml.LithostratigraphicRank;
}
export interface LithostratigraphicUnit extends _LithostratigraphicUnit {}

/** Primarily a container for one or more channel sets (ChannelSet). In WITSML v2.+, most of the log information is now at the channel set level. The concept of multiple channel sets in a single log is significant change from WITSML v1.4.1.1, where each log represented exactly one group of curves and their data. For more information about log organization and how it works, see the WITSML Technical Usage Guide. */
interface _Log extends eml._AbstractActiveObject {
  ChannelSet?: ChannelSet[];
  /** Defines where the channel gets its data from, e.g., calculated from another source, or from archive, or raw real-time, etc. */
  ChannelState?: ChannelState;
  /** The nominal derivation for channels in the log. Individual channels and channel sets may have different derivations.
   *
   * Should be a nominal value intended as a guide that applies to all or most ChannelSets and Channels in the Log. Should NOT be populated if the value does not apply for the majority of the ChannelSets and Channels. */
  Derivation?: ChannelDerivation;
  /** The nominal status of the hole at the time of logging. Individual channels may have been logged while the hole was in a different state. */
  HoleLoggingStatus?: HoleLoggingStatus;
  /** Pointer to a BusinessAssociate representing the logging company.
   *
   * Should be a nominal value intended as a guide that applies to all or most ChannelSets and Channels in the Log. Should NOT be populated if the value does not apply for the majority of the ChannelSets and Channels. */
  LoggingCompany?: eml.DataObjectReference;
  /** The RP66 organization code assigned to a logging company. The list is available at http://www.energistics.org/geosciences/geology-standards/rp66-organization-codes
   *
   * Should be a nominal value intended as a guide that applies to all or most ChannelSets and Channels in the Log. Should NOT be populated if the value does not apply for the majority of the ChannelSets and Channels. */
  LoggingCompanyCode?: number;
  /** Defines where the log channel gets its data from: LWD, MWD, wireline; or whether it is computed, etc.
   *
   * Should be a nominal value intended as a guide that applies to all or most ChannelSets and Channels in the Log. Should NOT be populated if the value does not apply for the majority of the ChannelSets and Channels. */
  LoggingMethod?: LoggingMethod;
  /** The time interval during which the logging service was performed that acquired the data in the channel set. */
  LoggingServicePeriod?: eml.DateTimeInterval;
  /** A value categorizing a logging tool. The classification system used in WITSML is the one from the PWLS group.
   *
   * Should be a nominal value intended as a guide that applies to all or most ChannelSets and Channels in the Log. Should NOT be populated if the value does not apply for the majority of the ChannelSets and Channels. */
  LoggingToolClass?: LoggingToolClassExt;
  /** A long concatenation of the tools used for the logging service such as GammaRay+NeutronPorosity. */
  LoggingToolClassLongName?: eml.String256;
  /** An optional value pointing to a LoggingToolKind.
   * Energistics provides a list of standard logging tool kinds from the Practical Well Logging Standard (PWLS).
   * This LoggingToolKind enumeration is in the external LoggingToolKindDictionary XML file in the WITSML ancillary folder.
   *
   * Should be a nominal value intended as a guide that applies to all or most ChannelSets and Channels in the Log. Should NOT be populated if the value does not apply for the majority of the ChannelSets and Channels. */
  LoggingToolKind?: eml.DataObjectReference;
  /** Information about a Log that is relevant for OSDU integration but does not have a natural place in a Log object. */
  LogOSDUIntegration?: LogOSDUIntegration;
  /** The nominal class of the drilling fluid at the time of logging. Individual channels may have been logged while a different drilling fluid was in use. */
  MudClass?: MudClassExt;
  /** The nominal subclass of drilling fluid at the time of logging. Individual channels may have been logged while a different drilling fluid was in use. */
  MudSubClass?: MudSubClassExt;
  /** The nominal hole size at the time the measurement tool was in the hole. The size is "nominal" to indicate that this is not the result of a caliper reading or other direct measurement of the hole size, but is just a name used to refer to the diameter. This is normally the bit size.
   *
   * In a case where there are more than one diameter hole being drilled at the same time (like where a reamer is behind the bit) this diameter is the one which was seen by the sensor which produced a particular log channel.
   *
   * Should be a nominal value intended as a guide that applies to all or most ChannelSets and Channels in the Log. Should NOT be populated if the value does not apply for the majority of the ChannelSets and Channels. */
  NominalHoleSize?: eml.LengthMeasureExt;
  /** For regularly sampled channel data, this represents the nominal sampling interval. This should only be set when it is representative for channels in the log. Individual channels may have a different nominal sampling interval. */
  NominalSamplingInterval?: eml.GenericMeasure;
  /** The nominal pass description for the pass such as Calibration Pass, Main Pass, Repeated Pass. Use PassDetail instead if the log contains information about several passes using PassIndexedDepth. */
  PassDescription?: eml.String64;
  /** Details about one or more passes when using PassIndexedDepth. */
  PassDetail?: PassDetail[];
  /** Should be a nominal value intended as a guide that applies to all or most ChannelSets and Channels in the Log. Should NOT be populated if the value does not apply for the majority of the ChannelSets and Channels.
   *
   * Use PassDetail instead if the log contains information about several passes using PassIndexedDepth. */
  PassNumber?: eml.String64;
  /** If all channel sets within the log have a compatible primary index, this is the primary index value range for the channel sets in the log. When specified, this MUST reflect the minimum and maximum primary index values for any channel sets in the log. This is independent of the direction for the primary index. This MAY be specified if all channel sets in the log have a compatible primary index AND at least one channel set has at least one channel with data points. This MUST NOT be specified if any channel sets in the log have incompatible primary indexes OR no channel sets in the log have channels with any data points.
   *
   * STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  PrimaryIndexInterval?: eml.AbstractInterval;
  /** Should be a nominal value intended as a guide that applies to all or most ChannelSets and Channels in the Log. Should NOT be populated if the value does not apply for the majority of the ChannelSets and Channels.
   *
   * The value here should match a bit run number for LWD data and a wireline run number for logging data. */
  RunNumber?: eml.String64;
  /** The wellbore the log is associated with. This element MUST be populated if ALL channel sets and channels in the log refer to the same wellbore. It MAY be omitted if they do not. */
  Wellbore?: eml.DataObjectReference;
}
export interface Log extends _Log {}

/** Metadata by which the array structure of a compound value is defined. It defines one axis of an array type used in a log channel. */
interface _LogChannelAxis extends BaseType {
  /** A unique identifier for an instance of a log channel axis */
  uid: eml.String64;
  /** The count of elements along this axis of the array. */
  AxisCount: eml.PositiveLong;
  /** The name of the array axis. */
  AxisName?: eml.String64;
  /** The property type by which the array axis is classified. Like "measured depth" or "elapsed time". */
  AxisPropertyKind: eml.String64;
  /** The increment to be used to fill out the list of the log channel axis index values. */
  AxisSpacing: number;
  /** Value of the initial entry in the list of axis index values. */
  AxisStart: number;
  /** A string representing the units of measure of the axis values. */
  AxisUom: eml.UnitOfMeasureExt;
}
export interface LogChannelAxis extends _LogChannelAxis {}

/** Specifies the method of logging used to record or produce the data in the log. */
export type LoggingMethod =
  | "coiled tubing"
  | "computed"
  | "distributed"
  | "LWD"
  | "mixed"
  | "MWD"
  | "subsea"
  | "surface"
  | "wireline";
interface _LoggingMethod extends eml._TypeEnum {
  _: LoggingMethod;
}

export type LoggingToolClass =
  | "AAC"
  | "AC"
  | "ADEN"
  | "AGR"
  | "ARIN"
  | "ARLL"
  | "AUX"
  | "DEN"
  | "DIP"
  | "DIR"
  | "DYN"
  | "FPR"
  | "GR"
  | "HDIA"
  | "INTERP"
  | "JOINED_GEOPH"
  | "JOINED_PETRO"
  | "NEU"
  | "NMR"
  | "REMP"
  | "RIN"
  | "RLL"
  | "RMIC"
  | "SAMP"
  | "SGR"
  | "SP"
  | "SURF";
interface _LoggingToolClass extends eml._TypeEnum {
  _: LoggingToolClass;
}

export type LoggingToolClassExt = string;
type _LoggingToolClassExt = Primitive._string;

/** Common information about a kind of logging tool, such as a specific model of logging tool from a logging company. */
interface _LoggingToolKind extends eml._AbstractObject {
  /** The class for this kind of logging tool such as AC (Acoustic) or GR (Gamma Ray). */
  Class?: LoggingToolClassExt;
  /** An optional description of the class for this kind of logging tool. This should be populated when the class is an extension value. */
  ClassDescription?: eml.String256;
  /** The tool group or tool series for the kind of logging tool. */
  GroupIdentifier?: eml.String64;
  /** The tool code or tool model that uniquely identifies the kind of logging tool. */
  Identifier: eml.String64;
  /** The RP66 organization code assigned to the logging company. The list is available at http://www.energistics.org/geosciences/geology-standards/rp66-organization-codes */
  LoggingCompanyCode: number;
  /** Name of the logging company that operates this kind of logging tool. */
  LoggingCompanyName: eml.String256;
  /** The logging method (e.g., LWD, MWD, wireline) for this kind of logging tool. */
  LoggingMethod?: LoggingMethod;
  /** The marketing name for the kind of logging tool. */
  MarketingName?: eml.String64;
}
export interface LoggingToolKind extends _LoggingToolKind {}

interface _LoggingToolKindDictionary extends eml._AbstractObject {
  LoggingToolKind: LoggingToolKind[];
}
export interface LoggingToolKindDictionary extends _LoggingToolKindDictionary {}

/** Information about a Log that is relevant for OSDU integration but does not have a natural place in a Log object. */
interface _LogOSDUIntegration extends BaseType {
  /** For multi-frame or multi-section files, this identifier defines the source frame in the file. If the identifier is an index number the index starts with zero and is converted to a string for this property. */
  FrameIdentifier?: eml.String64;
  /** Pointer to a BusinessAssociate that represents the company who engaged the service company (ServiceCompany) to perform the logging. */
  IntermediaryServiceCompany?: eml.DataObjectReference;
  /** Boolean property indicating the sampling mode of the primary index. True means all channel data values are regularly spaced (see NominalSamplingInterval); false means irregular or discrete sample spacing. */
  IsRegular?: boolean;
  /** The log version. Distinct from objectVersion. */
  LogVersion?: eml.String64;
  /** Optional time reference for time-based primary indexes. The ISO date time string representing zero time. Not to be confused with seismic travel time zero. */
  ZeroTime?: eml.TimeStamp;
}
export interface LogOSDUIntegration extends _LogOSDUIntegration {}

/** Specifies the type of content from the original log defined by the rectangle. */
export type LogRectangleType = "header" | "alternate";
interface _LogRectangleType extends eml._TypeEnum {
  _: LogRectangleType;
}

/** Specifies the type of log section. */
export type LogSectionType =
  | "main"
  | "repeat"
  | "calibration"
  | "tie in"
  | "going in hole"
  | "other";
interface _LogSectionType extends eml._TypeEnum {
  _: LogSectionType;
}

/** Specifies the kinds of track. */
export type LogTrackType = "curves" | "data" | "depth" | "traces" | "other";
interface _LogTrackType extends eml._TypeEnum {
  _: LogTrackType;
}

/** Information on lost circulation event. */
interface _LostCirculationExtension extends _AbstractEventExtension {
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Volume lost */
  VolumeLost?: eml.VolumeMeasure;
}
export interface LostCirculationExtension extends _LostCirculationExtension {}

export type MarkerQualifierExt = string;
type _MarkerQualifierExt = Primitive._string;

/** Specifies the primary type of material that a component is made of. */
export type MaterialType =
  | "aluminum"
  | "beryllium copper"
  | "chrome alloy"
  | "composite"
  | "other"
  | "non-magnetic steel"
  | "plastic"
  | "steel"
  | "steel alloy"
  | "titanium";
interface _MaterialType extends eml._TypeEnum {
  _: MaterialType;
}

/** Specifies the type of sensor in a tubular string. The source (except for "CH density porosity", "CH neutron porosity", "OH density porosity" and "OH neutron porosity") of the values and the descriptions is the POSC V2.2 "well log trace class" standard instance values, which are documented as "A classification of well log traces based on specification of a range of characteristics. Traces may be classed according to the type of physical characteristic they are meant to measure." */
export type MeasurementType =
  | "acceleration"
  | "acoustic caliper"
  | "acoustic casing collar locator"
  | "acoustic impedance"
  | "acoustic porosity"
  | "acoustic velocity"
  | "acoustic wave matrix travel time"
  | "acoustic wave travel time"
  | "amplitude"
  | "amplitude of acoustic wave"
  | "amplitude of E-M wave"
  | "amplitude ratio"
  | "area"
  | "attenuation"
  | "attenuation of acoustic wave"
  | "attenuation of E-M wave"
  | "auxiliary"
  | "average porosity"
  | "azimuth"
  | "barite mud correction"
  | "bed thickness correction"
  | "bit size"
  | "blocked"
  | "borehole environment correction"
  | "borehole fluid correction"
  | "borehole size correction"
  | "bromide mud correction"
  | "bulk compressibility"
  | "bulk density"
  | "bulk volume"
  | "bulk volume gas"
  | "bulk volume hydrocarbon"
  | "bulk volume oil"
  | "bulk volume water"
  | "C/O ratio"
  | "caliper"
  | "cased hole correction"
  | "casing collar locator"
  | "casing correction"
  | "casing diameter correction"
  | "casing inspection"
  | "casing thickness correction"
  | "casing weight correction"
  | "cement correction"
  | "cement density correction"
  | "cement evaluation"
  | "cement thickness correction"
  | "cement type correction"
  | "CH density porosity"
  | "CH dolomite density porosity"
  | "CH dolomite neutron porosity"
  | "CH limestone density porosity"
  | "CH limestone neutron porosity"
  | "CH neutron porosity"
  | "CH sandstone density porosity"
  | "CH sandstone neutron porosity"
  | "compressional wave dolomite porosity"
  | "compressional wave limestone porosity"
  | "compressional wave matrix travel time"
  | "compressional wave sandstone porosity"
  | "compressional wave travel time"
  | "conductivity"
  | "conductivity from attenuation"
  | "conductivity from phase shift"
  | "connate water conductivity"
  | "connate water resistivity"
  | "conventional core porosity"
  | "core matrix density"
  | "core permeability"
  | "core porosity"
  | "corrected"
  | "count rate"
  | "count rate ratio"
  | "cross plot porosity"
  | "decay time"
  | "deep conductivity"
  | "deep induction conductivity"
  | "deep induction resistivity"
  | "deep laterolog conductivity"
  | "deep laterolog resistivity"
  | "deep resistivity"
  | "density"
  | "density porosity"
  | "depth"
  | "depth adjusted"
  | "depth derived from velocity"
  | "deviation"
  | "dielectric"
  | "diffusion correction"
  | "dip"
  | "dipmeter"
  | "dipmeter conductivity"
  | "dipmeter resistivity"
  | "dolomite acoustic porosity"
  | "dolomite density porosity"
  | "dolomite neutron porosity"
  | "edited"
  | "effective porosity"
  | "electric current"
  | "electric potential"
  | "electromagnetic wave matrix travel time"
  | "electromagnetic wave travel time"
  | "element"
  | "elemental ratio"
  | "enhanced"
  | "filtered"
  | "flowmeter"
  | "fluid density"
  | "fluid velocity"
  | "fluid viscosity"
  | "flushed zone conductivity"
  | "flushed zone resistivity"
  | "flushed zone saturation"
  | "force"
  | "formation density correction"
  | "formation properties correction"
  | "formation salinity correction"
  | "formation saturation correction"
  | "formation volume factor correction"
  | "formation water density correction"
  | "formation water saturation correction"
  | "free fluid index"
  | "friction effect correction"
  | "gamma ray"
  | "gamma ray minus uranium"
  | "gas saturation"
  | "gradiomanometer"
  | "high frequency conductivity"
  | "high frequency electromagnetic"
  | "high frequency electromagnetic porosity"
  | "high frequency E-M phase shift"
  | "high frequency resistivity"
  | "hydrocarbon correction"
  | "hydrocarbon density correction"
  | "hydrocarbon gravity correction"
  | "hydrocarbon saturation"
  | "hydrocarbon viscosity correction"
  | "image"
  | "interpretation variable"
  | "iron mud correction"
  | "joined"
  | "KCl mud correction"
  | "length"
  | "limestone acoustic porosity"
  | "limestone density porosity"
  | "limestone neutron porosity"
  | "lithology correction"
  | "log derived permeability"
  | "log matrix density"
  | "magnetic casing collar locator"
  | "matrix density"
  | "matrix travel time"
  | "measured depth"
  | "mechanical caliper"
  | "mechanical casing collar locator"
  | "medium conductivity"
  | "medium induction conductivity"
  | "medium induction resistivity"
  | "medium laterolog conductivity"
  | "medium laterolog resistivity"
  | "medium resistivity"
  | "micro conductivity"
  | "micro inverse conductivity"
  | "micro inverse resistivity"
  | "micro laterolog conductivity"
  | "micro laterolog resistivity"
  | "micro normal conductivity"
  | "micro normal resistivity"
  | "micro resistivity"
  | "micro spherically focused conductivity"
  | "micro spherically focused resistivity"
  | "mineral"
  | "mud cake conductivity"
  | "mud cake correction"
  | "mud cake density correction"
  | "mud cake resistivity"
  | "mud cake resistivity correction"
  | "mud cake thickness correction"
  | "mud composition correction"
  | "mud conductivity"
  | "mud filtrate conductivity"
  | "mud filtrate correction"
  | "mud filtrate density correction"
  | "mud filtrate resistivity"
  | "mud filtrate resistivity correction"
  | "mud filtrate salinity correction"
  | "mud resistivity"
  | "mud salinity correction"
  | "mud viscosity correction"
  | "mud weight correction"
  | "neutron die away time"
  | "neutron porosity"
  | "nuclear caliper"
  | "nuclear magnetic decay time"
  | "nuclear magnetism log permeability"
  | "nuclear magnetism porosity"
  | "OH density porosity"
  | "OH dolomite density porosity"
  | "OH dolomite neutron porosity"
  | "OH limestone density porosity"
  | "OH limestone neutron porosity"
  | "OH neutron porosity"
  | "OH sandstone density porosity"
  | "OH sandstone neutron porosity"
  | "oil based mud correction"
  | "oil saturation"
  | "perforating"
  | "permeability"
  | "phase shift"
  | "photoelectric absorption"
  | "photoelectric absorption correction"
  | "physical measurement correction"
  | "plane angle"
  | "porosity"
  | "porosity correction"
  | "potassium"
  | "pressure"
  | "pressure correction"
  | "processed"
  | "pulsed neutron porosity"
  | "quality"
  | "ratio"
  | "raw"
  | "relative bearing"
  | "resistivity"
  | "resistivity factor correction"
  | "resistivity from attenuation"
  | "resistivity from phase shift"
  | "resistivity phase shift"
  | "resistivity ratio"
  | "salinity"
  | "sampling"
  | "sandstone acoustic porosity"
  | "sandstone density porosity"
  | "sandstone neutron porosity"
  | "saturation"
  | "shale volume"
  | "shallow conductivity"
  | "shallow induction conductivity"
  | "shallow induction resistivity"
  | "shallow laterolog conductivity"
  | "shallow laterolog resistivity"
  | "shallow resistivity"
  | "shear wave dolomite porosity"
  | "shear wave limestone porosity"
  | "shear wave matrix travel time"
  | "shear wave sandstone porosity"
  | "shear wave travel time"
  | "shifted"
  | "sidewall core porosity"
  | "sigma"
  | "sigma formation"
  | "sigma gas"
  | "sigma hydrocarbon"
  | "sigma matrix"
  | "sigma oil"
  | "sigma water"
  | "slippage velocity correction"
  | "smoothed"
  | "spectral gamma ray"
  | "spherically focused conductivity"
  | "spherically focused resistivity"
  | "spontaneous potential"
  | "spreading loss correction"
  | "synthetic well log trace"
  | "temperature"
  | "temperature correction"
  | "tension"
  | "Th/K ratio"
  | "thorium"
  | "time"
  | "tool diameter correction"
  | "tool eccentricity correction"
  | "total gamma ray"
  | "total porosity"
  | "tracer survey"
  | "travel time"
  | "true conductivity"
  | "true resistivity"
  | "true vertical depth"
  | "tube wave dolomite porosity"
  | "tube wave limestone porosity"
  | "tube wave matrix travel time"
  | "tube wave sandstone porosity"
  | "tube wave travel time"
  | "uranium"
  | "velocity"
  | "volume"
  | "water based fluid correction"
  | "water holdup correction"
  | "water saturated conductivity"
  | "water saturated resistivity"
  | "water saturation";
interface _MeasurementType extends eml._TypeEnum {
  _: MeasurementType;
}

/** Defines a member of an objectGroup. */
interface _MemberObject extends BaseType {
  /** Unique identifier for this instance of MemberObject */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The growing-object index value range that applies to this group.
   * The significance of this range is defined by the groupType. */
  IndexInterval?: eml.AbstractInterval;
  /** For a log object, this specifies the kind of the index curve for the log. This is only relevant for a systematically growing object. */
  IndexKind?: eml.DataIndexKind;
  /** A comma delimited list of log curve mnemonics. Each mnemonic should only occur once in the list. If not specified then the group applies to all curves in the log. */
  MnemonicList?: eml.String2000;
  ObjectReference: eml.DataObjectReference;
  /** A date and time related to this group.
   * This does not necessarily represent an actual index within a growing-object.
   * The significance of this time is defined by the groupType. */
  ReferenceDateTime?: eml.TimeStamp;
  /** A measured depth related to this group.
   * This does not necessarily represent an actual depth within a growing-object.
   * The significance of this depth is defined by the groupType. */
  ReferenceDepth?: eml.MeasuredDepth;
  Sequence1: ObjectSequence;
  Sequence2: ObjectSequence;
  Sequence3: ObjectSequence;
}
export interface MemberObject extends _MemberObject {}

/** Specifies message digest types. */
export type MessageDigestType = "MD5" | "SHA1" | "other";
interface _MessageDigestType extends eml._TypeEnum {
  _: MessageDigestType;
}

/** Specifies the list of mimetypes. */
export type MimeType =
  | "image/tiff"
  | "image/gif"
  | "image/png"
  | "image/xml+svg"
  | "other";
interface _MimeType extends eml._TypeEnum {
  _: MimeType;
}

/** Specifies the various misalignment maths as described in SPE-90408-MS. */
export type MisalignmentMode = "1" | "2" | "3";
interface _MisalignmentMode extends eml._TypeEnum {
  _: MisalignmentMode;
}

/** Tubular Motor Component Schema. Used to capture properties about a motor used in a tubular string. */
interface _Motor extends BaseType {
  /** Minimum bend angle setting. */
  BendSettingsMn?: eml.PlaneAngleMeasure;
  /** Maximum bend angle setting. */
  BendSettingsMx?: eml.PlaneAngleMeasure;
  /** Clearance inside bearing box. */
  ClearanceBearBox?: eml.LengthMeasure;
  /** Nozzle diameter. */
  DiaNozzle?: eml.LengthMeasure;
  /** Diameter of rotor at nozzle. */
  DiaRotorNozzle?: eml.LengthMeasure;
  /** Is dump valve present?
   * Values are "true" (or "1") and "false" (or "0"). */
  DumpValve?: boolean;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Minimum flow rate. */
  FlowrateMn?: eml.VolumePerTimeMeasure;
  /** Maximum flow rate. */
  FlowrateMx?: eml.VolumePerTimeMeasure;
  /** Number of rotor lobes. */
  LobesRotor?: number;
  /** Number of stator lobes. */
  LobesStator?: number;
  /** Tool offset from bottom. */
  OffsetTool?: eml.LengthMeasure;
  /** Pressure loss factor. */
  PresLossFact?: number;
  /** Is motor rotatable?
   * Values are "true" (or "1") and "false" (or "0"). */
  Rotatable?: boolean;
  /** Is rotor catcher present?
   * Values are "true" (or "1") and "false" (or "0"). */
  RotorCatcher?: boolean;
  Sensor?: Sensor[];
  /** Maximum operating temperature. */
  TempOpMx?: eml.ThermodynamicTemperatureMeasure;
  /** Type of bearing. */
  TypeBearing?: BearingType;
}
export interface Motor extends _Motor {}

/** Specifies the class of a drilling fluid. */
export type MudClass = "oil-based" | "water-based" | "other" | "pneumatic";
interface _MudClass extends eml._TypeEnum {
  _: MudClass;
}

export type MudClassExt = string;
type _MudClassExt = Primitive._string;

/** Mud density readings at average or channel. */
interface _MudDensityStatistics extends BaseType {
  /** Average mud density through the interval. */
  Average: eml.MassPerVolumeMeasure;
  /** Log channel from which the mud density statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface MudDensityStatistics extends _MudDensityStatistics {}

/** Information on gas in the mud and gas peak. */
interface _MudGas extends BaseType {
  GasInMud?: GasInMud;
  GasPeak?: GasPeak[];
}
export interface MudGas extends _MudGas {}

interface _MudLogConcentrationParameter extends _MudLogParameter {
  ConcentrationParameterKind: ConcentrationParameterKind;
  Value: eml.VolumePerVolumeMeasureExt;
}
export interface MudLogConcentrationParameter
  extends _MudLogConcentrationParameter {}

interface _MudLogForceParameter extends _MudLogParameter {
  ForceParameterKind: ForceParameterKind;
  Value: eml.ForceMeasureExt;
}
export interface MudLogForceParameter extends _MudLogForceParameter {}

/** Information around the mud log: type, time taken, top and bottom depth, pressure gradient, etc. */
interface _MudLogParameter extends BaseType {
  /** Unique identifier for this instance of MudLogParameter. */
  uid: eml.String64;
  /** An ISO 19115 EIP-derived set of metadata attached to ensure the traceability of the MudLogParameter. */
  Citation: eml.Citation;
  /** Description or secondary qualifier pertaining to MudlogParameter or to Value attribute. */
  Comments: eml.String2000;
  /** Measured depth interval that is the focus of this parameter. */
  MdInterval?: eml.MdInterval;
}
export interface MudLogParameter extends _MudLogParameter {}

/** Describes the kind and value of mud log parameters that are expressed in units of pressure gradient. */
interface _MudLogPressureGradientParameter extends _MudLogParameter {
  PressureGradientParameterKind: PressureGradientParameterKind;
  /** The value of the parameter in pressure gradient units. */
  Value: eml.ForcePerVolumeMeasureExt;
}
export interface MudLogPressureGradientParameter
  extends _MudLogPressureGradientParameter {}

/** Describes the kind and value of mud log parameters that are expressed in units of pressure. */
interface _MudLogPressureParameter extends _MudLogParameter {
  PressureParameterKind: PressureParameterKind;
  /** The value of the parameter in pressure units. */
  Value: eml.PressureMeasureExt;
}
export interface MudLogPressureParameter extends _MudLogPressureParameter {}

/** Details of wellbore geology intervals, drilling parameters, chromatograph, mud gas, etc., data within an MD interval. */
interface _MudLogReport extends eml._AbstractMdGrowingObject {
  /** Pointer to a BusinessAssociate representing the company recording the information. */
  MudLogCompany?: eml.DataObjectReference;
  /** Concatenated names of the mudloggers constructing the log. */
  MudLogEngineers?: eml.String2000;
  /** Concatenated names of the geologists constructing the log. */
  MudLogGeologists?: eml.String2000;
  MudlogReportInterval?: MudlogReportInterval[];
  Parameter?: MudLogParameter[];
  RelatedLog?: eml.DataObjectReference[];
  Wellbore: eml.DataObjectReference;
  WellboreGeology?: eml.DataObjectReference;
}
export interface MudLogReport extends _MudLogReport {}

/** The interval at which the report on the mud log was taken, detailing cuttings, interpreted geology, and show evaluation. */
interface _MudlogReportInterval extends eml._AbstractMdIntervalGrowingPart {
  /** Time required for a sample to leave the bottomhole and reach the surface. */
  BottomsUpTime: eml.TimeMeasure;
  Chromatograph?: Chromatograph;
  /** The cuttings geology interval that is part of this mud log report. */
  CuttingsGeologyInterval?: CuttingsGeologyInterval;
  DrillingParameters?: DrillingParameters[];
  /** The interpreted geology interval that is part of this mud log report. */
  InterpretedGeologyInterval?: InterpretedGeologyInterval;
  MudGas?: MudGas[];
  /** The show evaluation interval that is part of this mud log report. */
  ShowEvaluationInterval?: ShowEvaluationInterval;
}
export interface MudlogReportInterval extends _MudlogReportInterval {}

/** Stores the values of parameters that are described by character strings. */
interface _MudLogStringParameter extends _MudLogParameter {
  MudLogStringParameterKind: MudLogStringParameterKind;
  /** The value of the parameter as a character string. */
  Value: eml.String64;
}
export interface MudLogStringParameter extends _MudLogStringParameter {}

/** Specifies values for mud log parameters that are described by character strings. */
export type MudLogStringParameterKind =
  | "bit parameters"
  | "bit type comment"
  | "casing point comment"
  | "chromatograph comment"
  | "circulation system comment"
  | "core interval comment"
  | "drilling data comment"
  | "gas peaks comment"
  | "gas ratio comment"
  | "general engineering comment"
  | "lithlog comment"
  | "LWD comment"
  | "marker or formation top comment"
  | "midnight depth date"
  | "mud check comment"
  | "mud data comment"
  | "mudlog comment"
  | "pressure data comment"
  | "shale density comment"
  | "short trip comment"
  | "show report comment"
  | "sidewall core comment"
  | "sliding Interval"
  | "steam still results comment"
  | "survey comment"
  | "temperature data comment"
  | "temperature trend comment"
  | "unknown"
  | "wireline log comment";
interface _MudLogStringParameterKind extends eml._TypeEnum {
  _: MudLogStringParameterKind;
}

/** Operations Mud Losses Schema.Captures volumes of mud lost for specific activities or onsite locations and total volumes for surface and down hole. */
interface _MudLosses extends BaseType {
  /** Mud volume lost downhole during abandonment. */
  VolLostAbandonHole?: eml.VolumeMeasure;
  /** Mud volume lost downhole behind casing. */
  VolLostBhdCsgHole?: eml.VolumeMeasure;
  /** Mud volume lost downhole while circulating. */
  VolLostCircHole?: eml.VolumeMeasure;
  /** Mud volume lost downhole while cementing. */
  VolLostCmtHole?: eml.VolumeMeasure;
  /** Mud volume lost downhole while running casing. */
  VolLostCsgHole?: eml.VolumeMeasure;
  /** Volume of mud lost in mud cleaning equipment (at surface). */
  VolLostMudCleanerSurf?: eml.VolumeMeasure;
  /** Mud volume lost downhole from other location. */
  VolLostOtherHole?: eml.VolumeMeasure;
  /** Surface volume lost other location. */
  VolLostOtherSurf?: eml.VolumeMeasure;
  /** Volume of mud lost in pit room (at surface). */
  VolLostPitsSurf?: eml.VolumeMeasure;
  /** Volume of mud lost at shakers (at surface). */
  VolLostShakerSurf?: eml.VolumeMeasure;
  /** Volume of mud lost while tripping (at surface). */
  VolLostTrippingSurf?: eml.VolumeMeasure;
  /** Total volume of mud lost downhole. */
  VolTotMudLostHole?: eml.VolumeMeasure;
  /** Total volume of mud lost at surface. */
  VolTotMudLostSurf?: eml.VolumeMeasure;
}
export interface MudLosses extends _MudLosses {}

/** Rig Mud Pump Schema. */
interface _MudPump extends BaseType {
  /** Unique identifier for this instance of MudPump. */
  uid: eml.String64;
  /** Pump displacement. */
  Displacement: eml.VolumeMeasure;
  /** Date and time the pump was installed. */
  DTimInstall?: eml.TimeStamp;
  /** Date and time the pump was removed. */
  DTimRemove?: eml.TimeStamp;
  /** Efficiency of the pump. */
  Eff?: eml.PowerPerPowerMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Inner diameter of the pump liner. */
  IdLiner: eml.LengthMeasure;
  /** Relative pump number. One-based. */
  Index: number;
  /** Stroke length. */
  LenStroke?: eml.LengthMeasure;
  /** Pointer to a BusinessAssociate representing the manufacturer or supplier of the item. */
  Manufacturer?: eml.DataObjectReference;
  /** Manufacturer's designated model. */
  Model?: eml.String64;
  /** An identification tag for the pump.
   * A serial number is a type of identification tag; however, some tags contain many pieces of information.This element onlyidentifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** Number of cylinders (3 = single acting, 2 = double acting) */
  NumCyl?: number;
  /** Rod outer diameter. */
  OdRod?: eml.LengthMeasure;
  /** Pointer to a BusinessAssociate representing the contractor/owner. */
  Owner?: eml.DataObjectReference;
  /** Maximum hydraulics horsepower. */
  PowHydMx?: eml.PowerMeasure;
  /** Maximum mechanical power. */
  PowMechMx?: eml.PowerMeasure;
  /** Pulsation dampener pressure. */
  PresDamp?: eml.PressureMeasure;
  /** Maximum pump pressure. */
  PresMx?: eml.PressureMeasure;
  /** Pump action. 1 = single acting, 2 = double acting. */
  PumpAction?: PumpActionIntegerCode;
  /** Maximum speed. */
  SpmMx?: eml.AngularVelocityMeasure;
  /** Pump type reference list. */
  TypePump?: PumpType;
  /** Pulsation dampener volume. */
  VolDamp?: eml.VolumeMeasure;
}
export interface MudPump extends _MudPump {}

/** The name of a data extension. */
export type MudSubClass =
  | "aerated mud"
  | "air"
  | "brackish water"
  | "brine"
  | "caesium formate"
  | "diesel oil-based"
  | "ester synthetic-based"
  | "freshwater"
  | "glycol mud"
  | "gyp mud"
  | "internal-olefin synthetic-based"
  | "lightly treated non-dispersed"
  | "lignite/lignosulfonate mud"
  | "lime mud"
  | "linear paraffin synthetic-based"
  | "linear-alpha-olefin synthetic-based"
  | "low solids"
  | "low toxicity mineral oil-based"
  | "mineral oil-based"
  | "mist"
  | "mixed-metal oxide mud"
  | "native/natural mud"
  | "natural gas"
  | "nitrogen-aerated mud"
  | "non-aqueous (invert emulsion) drilling fluids"
  | "non-dispersed"
  | "pneumatic (gaseous) drilling fluids"
  | "polymer mud"
  | "potassium formate"
  | "potassium-treated mud"
  | "salt water mud"
  | "saturated salt mud"
  | "sea water"
  | "seawater mud"
  | "silicate mud"
  | "sodium formate"
  | "spud mud"
  | "stable foam"
  | "stiff foam"
  | "water-based drilling fluids";
interface _MudSubClass extends eml._TypeEnum {
  _: MudSubClass;
}

export type MudSubClassExt = string;
type _MudSubClassExt = Primitive._string;

/** Operations Mud Volume Component Schema. */
interface _MudVolume extends BaseType {
  MudLosses?: MudLosses;
  /** Volume of mud built. */
  VolMudBuilt?: eml.VolumeMeasure;
  /** Volume of mud contained in casing annulus. */
  VolMudCasing?: eml.VolumeMeasure;
  /** Volume of mud dumped. */
  VolMudDumped?: eml.VolumeMeasure;
  /** Volume of mud contained in the openhole annulus. */
  VolMudHole?: eml.VolumeMeasure;
  /** Volume of mud received from mud warehouse. */
  VolMudReceived?: eml.VolumeMeasure;
  /** Volume of mud returned to mud warehouse. */
  VolMudReturned?: eml.VolumeMeasure;
  /** Volume of mud contained in riser section annulus. */
  VolMudRiser?: eml.VolumeMeasure;
  /** Volume of mud contained within active string. */
  VolMudString?: eml.VolumeMeasure;
  /** Total volume of mud at the end of the report interval (including pits and hole). */
  VolTotMudEnd?: eml.VolumeMeasure;
  /** Total volume of mud at start of report interval (including pits and hole). */
  VolTotMudStart?: eml.VolumeMeasure;
}
export interface MudVolume extends _MudVolume {}

/** Tubular MWD Tool Component Schema. Used to capture operating parameters of the MWD tool. */
interface _MwdTool extends BaseType {
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Minimum flow rate. */
  FlowrateMn?: eml.VolumePerTimeMeasure;
  /** Maximum flow rate. */
  FlowrateMx?: eml.VolumePerTimeMeasure;
  /** Equivalent inner diameter. */
  IdEquv?: eml.LengthMeasure;
  Sensor?: Sensor[];
  /** Maximum Temperature. */
  TempMx?: eml.ThermodynamicTemperatureMeasure;
}
export interface MwdTool extends _MwdTool {}

/** WITSML - Equipment NameTag Schema. */
interface _NameTag extends BaseType {
  /** Unique identifier for this instance of NameTag. */
  uid: eml.String64;
  /** A comment or remark about the tag. */
  Comment?: eml.String2000;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Pointer to a BusinessAssociate representing the name of the company that installed the tag. */
  InstallationCompany?: eml.DataObjectReference;
  /** When the tag was installed in or on the item. */
  InstallationDate?: eml.TimeStamp;
  /** An indicator of where the tag is attached to the item. This is used to assist the user in finding where an identifier is located on an item.  This optional field also helps to differentiate where an identifier is located when multiple identifiers exist on an item. Most downhole components have a box (female thread) and pin (male thread) end as well as a pipe body in between the ends. Where multiple identifiers are used on an item, it is convenient to have a reference as to which end, or somewhere in the middle, an identifier may be closer to. Some items may have an identifier on a non-standard location, such as on the arm of a hole opener.  'other', by exclusion, tells a user to look elsewhere than on the body or near the ends of an item.  Most non-downhole tools use either 'body', 'other' or not specified because the location tends to lose value with smaller or non threaded items. */
  Location?: NameTagLocation;
  /** Reference to a manufacturer's or installer's installation description, code, or method. */
  MountingCode?: eml.String64;
  /** The physical identification string of the equipment tag. */
  Name: eml.String64;
  /** The format or encoding specification of the equipment tag. The tag may contain different pieces of information and knowledge of that information is inherent in the specification. The "identification string" is a mandatory part of the information in a tag. */
  NumberingScheme: NameTagNumberingScheme;
  /** Identifies the general type of identifier on an item.  If multiple identifiers exist on an item, a separate description set for each identifier should be created.  For example, a joint of casing may have a barcode label on it along with a painted-on code and an RFID tag attached or embedded into the coupling.  The barcode label may in turn be an RFID-equipped label. This particular scenario would require populating five nameTags to fully describe and decode all the possible identifiers as follows: 'tagged' - RFID tag embedded in the coupling, 'label'  - Serial number printed on the label, 'tagged' - RFID tag embedded into the label, 'label'  - Barcode printed on the label, 'painted'- Mill number painted on the pipe body. */
  Technology?: NameTagTechnology;
}
export interface NameTag extends _NameTag {}

/** Specifies the values for the locations where an equipment tag might be found. */
export type NameTagLocation = "body" | "box" | "other" | "pin";
interface _NameTagLocation extends eml._TypeEnum {
  _: NameTagLocation;
}

/** Specifies the values of the specifications for creating equipment tags. */
export type NameTagNumberingScheme =
  | "ANSI/AIM-BC10"
  | "ANSI/AIM-BC2"
  | "ANSI/AIM-BC6"
  | "EAN.UCC"
  | "EPC64"
  | "EPC96"
  | "F2F"
  | "MFM"
  | "MSRCID"
  | "serial number";
interface _NameTagNumberingScheme extends eml._TypeEnum {
  _: NameTagNumberingScheme;
}

/** Specifies the values for the mechanisms for attaching an equipment tag to an item. */
export type NameTagTechnology =
  | "intrinsic"
  | "labeled"
  | "painted"
  | "stamped"
  | "tagged"
  | "temporary";
interface _NameTagTechnology extends eml._TypeEnum {
  _: NameTagTechnology;
}

/** A floating point value between zero (inclusive) and one (inclusive).@pattern .+ */
export type NonNegativeFraction = number;
type _NonNegativeFraction = Primitive._number;

/** Nozzle Component Schema. */
interface _Nozzle extends BaseType {
  /** Unique identifier for this instance of Nozzle */
  uid: eml.String64;
  /** Nozzle diameter. */
  DiaNozzle?: eml.LengthMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Index if this is an indexed object. */
  Index?: number;
  /** Length of the nozzle. */
  Len?: eml.LengthMeasure;
  /** Nozzle orientation. */
  Orientation?: eml.String64;
  /** Nozzle type. */
  TypeNozzle?: NozzleType;
}
export interface Nozzle extends _Nozzle {}

/** Specifies the type of nozzle. */
export type NozzleType = "extended" | "normal";
interface _NozzleType extends eml._TypeEnum {
  _: NozzleType;
}

/** Defines a sequence number with an optional description attribute. */
interface _ObjectSequence extends BaseType {
  /** The description of this object sequence. */
  description: eml.String2000;
}
export interface ObjectSequence extends _ObjectSequence {}

/** The location/interval of the open hole and its history. */
interface _OpenHoleInterval extends BaseType {
  /** Unique identifier for this instance of OpenHoleInterval. */
  uid: eml.String64;
  /** Reference to a borehole (the as-drilled hole through the earth). */
  BoreholeString?: eml.DataObjectComponentReference;
  /** The OpenHoleInterval event information. */
  EventHistory?: EventInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to a RESQML geologic unit interpretation. */
  GeologicUnitInterpretation?: eml.DataObjectReference[];
  /** Reference to a geology feature. */
  GeologyFeature?: eml.DataObjectComponentReference[];
  /** Openhole measured depth interval for this completion. */
  OpenHoleMdInterval?: eml.MdInterval;
  /** Openhole true vertical depth interval for this completion. */
  OpenHoleTvdInterval?: eml.AbstractTvdInterval;
  StatusHistory?: IntervalStatusHistory[];
}
export interface OpenHoleInterval extends _OpenHoleInterval {}

export type OperatingCondition =
  | "bent sub"
  | "cable conveyed"
  | "casing"
  | "casing collar locator"
  | "centrollers"
  | "drill pipe"
  | "dropped"
  | "fast logging speed"
  | "floating"
  | "large inside diameter"
  | "single shot"
  | "slow logging speed";
interface _OperatingCondition extends eml._TypeEnum {
  _: OperatingCondition;
}

export type OperatingConditionExt = string;
type _OperatingConditionExt = Primitive._string;

interface _OperatingConstraints extends BaseType {
  /** Can be segmented */
  AzimuthRange?: AzimuthRange[];
  CustomLimits?: eml.GenericMeasure[];
  /** Can be segmented */
  CustomRange?: CustomOperatingRange[];
  /** Absolute value of the maximum value allowed for the product sin(Inclination) * sin(Azimuth). */
  HorizontalEastWestMaxValue?: eml.PlaneAngleMeasureExt;
  /** Can be segmented */
  InclinationRange?: PlaneAngleOperatingRange[];
  /** Can be segmented */
  LatitudeRange?: PlaneAngleOperatingRange[];
  MdRange?: eml.MdInterval[];
  PressureLimit?: eml.PressureMeasureExt;
  ThermodynamicTemperatureLimit?: eml.ThermodynamicTemperatureMeasureExt;
  TvdRange?: eml.AbstractTvdInterval[];
}
export interface OperatingConstraints extends _OperatingConstraints {}

/** The general location of a well or wellbore. */
export type OperatingEnvironment = "onshore" | "midshore" | "offshore";
interface _OperatingEnvironment extends eml._TypeEnum {
  _: OperatingEnvironment;
}

export type OperatingEnvironmentExt = string;
type _OperatingEnvironmentExt = Primitive._string;

/** Used to capture a daily drilling report focused on reporting from the service company to the operator. For a similar object whose focus is operator to partner or to governmental agency, see DrillReport. This object is uniquely identified within the context of one wellbore object. */
interface _OpsReport extends eml._AbstractObject {
  Activity?: DrillActivity[];
  BulkInventory?: Inventory[];
  /** Hole condition description. */
  ConditionHole?: eml.String64;
  /** Daily cost. */
  CostDay?: eml.Cost;
  /** Daily mud cost. */
  CostDayMud?: eml.Cost;
  DayCost?: DayCost[];
  /** Diameter of the last casing installed. */
  DiaCsgLast?: eml.LengthMeasure;
  /** Hole diameter. */
  DiaHole?: eml.LengthMeasure;
  /** Distance drilled since the previous report. */
  DistDrill?: eml.LengthMeasure;
  /** Distance drilled: rotating. */
  DistDrillRot?: eml.LengthMeasure;
  /** Distance drilled: sliding. */
  DistDrillSlid?: eml.LengthMeasure;
  /** Distance covered while holding angle with a steerable drilling assembly. */
  DistHold?: eml.LengthMeasure;
  /** Distance reamed. */
  DistReam?: eml.LengthMeasure;
  /** Distance covered while actively steering with a steerable drilling assembly. */
  DistSteering?: eml.LengthMeasure;
  DrillingParams?: DrillingParams[];
  /** Date and time the information is related to. */
  DTim: eml.TimeStamp;
  /** Name of the engineer. */
  Engineer?: eml.String64;
  /** Time spent circulating from start of the bit run. */
  ETimCirc?: eml.TimeMeasure;
  /** Drilling time. */
  ETimDrill?: eml.TimeMeasure;
  /** Time spent rotary drilling for the report interval. */
  ETimDrillRot?: eml.TimeMeasure;
  /** Time spent slide drilling from start of the bit run. */
  ETimDrillSlid?: eml.TimeMeasure;
  /** Time spent with no directional drilling work (commonly in hours). */
  ETimHold?: eml.TimeMeasure;
  /** Time the rig has been on location (commonly in days). */
  ETimLoc?: eml.TimeMeasure;
  /** Time spent reaming from start of the bit run. */
  ETimReam?: eml.TimeMeasure;
  /** Time since the bit broke ground (commonly in days). */
  ETimSpud?: eml.TimeMeasure;
  /** Time from the start of operations (commonly in days). */
  ETimStart?: eml.TimeMeasure;
  /** Time spent steering the bottomhole assembly (commonly in hours). */
  ETimSteering?: eml.TimeMeasure;
  Fluid?: Fluid[];
  /** Forecast of activities for the next 24 hrs. */
  Forecast24Hr?: eml.String2000;
  /** Name of the operator's wellsite geologist. */
  Geologist?: eml.String64;
  Hse?: Hse;
  /** Description of the lithology for the interval. */
  Lithology?: eml.String64;
  /** Maximum allowable shut-in casing pressure. */
  Maasp?: eml.PressureMeasure;
  /** Measured depth of last casing. */
  MdCsgLast?: eml.MeasuredDepth;
  /** Measured depth of plan for this day number. */
  MdPlanned?: eml.MeasuredDepth;
  /** The measured depth of the wellbore. */
  MdReport?: eml.MeasuredDepth;
  MudInventory?: Inventory[];
  MudVolume?: MudVolume;
  /** Name of the formation. */
  NameFormation?: eml.String64;
  /** Authorization for expenditure (AFE) number that this cost item applies to. */
  NumAFE?: eml.String64;
  /** Number of contractor personnel on board the rig. */
  NumContract?: number;
  /** Number of operator personnel on board the rig. */
  NumOperator?: number;
  /** Total number of personnel on board the rig. */
  NumPob?: number;
  /** Number of service company personnel on board the rig. */
  NumService?: number;
  Personnel?: Personnel[];
  PitVolume?: PitVolume[];
  /** Kick tolerance pressure. */
  PresKickTol?: eml.PressureMeasure;
  /** Leak off test equivalent mud weight. */
  PresLotEmw?: eml.MassPerVolumeMeasure;
  PumpOp?: PumpOp[];
  RigResponse?: RigResponse;
  /** A pointer to the rig used in this reporting period. */
  RigUtilization?: eml.DataObjectReference;
  /** Average rate of penetration through the interval. */
  RopAv?: eml.LengthPerTimeMeasure;
  /** Rate of penetration at report time. */
  RopCurrent?: eml.LengthPerTimeMeasure;
  Scr?: Scr[];
  ShakerOp?: ShakerOp[];
  /** Current status description. */
  StatusCurrent?: eml.String2000;
  /** Summary of the operations and events for the reporting period (the previous 24 hours). */
  Sum24Hr?: eml.String2000;
  /** Name of the operator's rig supervisor. */
  Supervisor?: eml.String64;
  SupportCraft?: SupportCraft[];
  TrajectoryStations?: TrajectoryReport;
  /** A pointer to the tubular assembly (as specified in the Tubular object) used in this report period. */
  Tubular?: eml.DataObjectReference;
  /** True vertical depth of the last casing installed. */
  TvdCsgLast?: eml.AbstractVerticalDepth;
  /** True vertical depth of the leak-off test point. */
  TvdLot?: eml.AbstractVerticalDepth;
  /** True vertical depth of the wellbore. */
  TvdReport?: eml.AbstractVerticalDepth;
  /** Kick tolerance volume. */
  VolKickTol?: eml.VolumeMeasure;
  WbGeometry?: WellboreGeometryReport;
  Weather?: Weather[];
  Wellbore: eml.DataObjectReference;
}
export interface OpsReport extends _OpsReport {}

/** Version of the report, e.g., preliminary, normal, final, etc. */
export type OpsReportVersion = "preliminary" | "normal" | "final";
interface _OpsReportVersion extends eml._TypeEnum {
  _: OpsReportVersion;
}

/** OSDU Tubular Assembly Status information. */
interface _OSDUTubularAssemblyStatus extends BaseType {
  /** Date the status has been established. */
  Date?: eml.TimeStamp;
  /** Used to describe the reason of Activity - such as cut/pull, pulling. */
  Description?: eml.String256;
  /** Status type. */
  StatusType?: eml.String64;
}
export interface OSDUTubularAssemblyStatus extends _OSDUTubularAssemblyStatus {}

/** Allows you to enter a connection type other than the ones in the standard list. */
interface _OtherConnectionType extends _AbstractConnectionType {
  /** Connection type other than rod, casing or tubing. */
  OtherConnectionType: OtherConnectionTypes;
}
export interface OtherConnectionType extends _OtherConnectionType {}

/** Specifies the values for other types of connections. */
export type OtherConnectionTypes =
  | "cemented-in-place"
  | "dogscompressionfit-sealed";
interface _OtherConnectionTypes extends eml._TypeEnum {
  _: OtherConnectionTypes;
}

interface _Parameter extends BaseType {
  Formula: eml.String2000;
  Title: eml.String64;
}
export interface Parameter extends _Parameter {}

/** Information on WITSML objects used */
interface _Participant extends BaseType {
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  Participant?: MemberObject[];
}
export interface Participant extends _Participant {}

/** Details about an individual pass when using PassIndexedDepth. */
interface _PassDetail extends BaseType {
  /** Description of pass such as Calibration Pass, Main Pass, Repeated Pass. */
  Description?: eml.String64;
  /** The pass number. */
  Pass: number;
}
export interface PassDetail extends _PassDetail {}

export type PassDirection = "up" | "holding steady" | "down";
interface _PassDirection extends eml._TypeEnum {
  _: PassDirection;
}

/** Qualifies measured depth based on pass, direction and depth */
interface _PassIndexedDepth extends BaseType {
  /** The direction of the tool in a pass. For primary index values, index values within a pass MUST be strictly ordered according to the direction. Holding steady MUST NOT be used for primary index values; it is only allowed for secondary index values. */
  Direction: PassDirection;
  /** The measured depth of the point. */
  MeasuredDepth: eml.LengthMeasureExt;
  /** The pass number. When pass indexed depth values are used as primary index values, the pass number MUST change any time direction changes. When used as secondary index values, this is not required. */
  Pass: number;
}
export interface PassIndexedDepth extends _PassIndexedDepth {}

interface _PassIndexedDepthInterval extends eml._AbstractInterval {
  Datum?: eml.DataObjectReference;
  End: PassIndexedDepth;
  Start: PassIndexedDepth;
}
export interface PassIndexedDepthInterval extends _PassIndexedDepthInterval {}

/** Information on how perforation is conveyed: slick line, wireline, tubing */
export type PerfConveyanceMethod =
  | "slick line"
  | "tubing conveyed"
  | "wireline";
interface _PerfConveyanceMethod extends eml._TypeEnum {
  _: PerfConveyanceMethod;
}

/** Information on the perforated hole. */
interface _PerfHole extends BaseType {
  /** Unique identifier for this instance of PerfHole. */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The angle of the holes. */
  HoleAngle?: eml.PlaneAngleMeasure;
  /** The number of holes. */
  HoleCount?: number;
  /** The density of the holes. */
  HoleDensity?: eml.ReciprocalLengthMeasure;
  /** The diameter of the hole. */
  HoleDiameter?: eml.LengthMeasure;
  /** The pattern of the holes. */
  HolePattern?: eml.String64;
  /** Measured depth interval for the perforation hole. */
  MdInterval?: eml.MdInterval;
  /** Remarks and comments about this perforated hole. */
  Remarks?: eml.String2000;
  /** The true vertical depth that describes the hole. */
  TvdInterval?: eml.AbstractTvdInterval;
}
export interface PerfHole extends _PerfHole {}

/** Information on the perforating job. */
interface _Perforating extends BaseType {
  /** Unique identifier for this instance of Perforating */
  uid: eml.String64;
  /** Perf-Bottom of packer set depth */
  BottomPackerSet?: eml.MeasuredDepth;
  /** Description from carrier */
  CarrierDescription?: eml.String2000;
  /** Pointer to a BusinessAssociate representing the manufacturer of the carrier. */
  CarrierManufacturer?: eml.DataObjectReference;
  /** Size of the carrier. */
  CarrierSize?: eml.LengthMeasure;
  /** Pointer to a BusinessAssociate representing the manufacturer of the charge. */
  ChargeManufacturer?: eml.DataObjectReference;
  /** The size of the charge. */
  ChargeSize?: eml.LengthMeasure;
  /** The type of the charge. */
  ChargeType?: eml.String64;
  /** The weight of the charge. */
  ChargeWeight?: eml.MassMeasure;
  /** The conveyance method */
  ConveyanceMethod?: PerfConveyanceMethod;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The density of fluid */
  FluidDensity?: eml.MassPerMassMeasure;
  /** Fluid level. */
  FluidLevel?: eml.MeasuredDepth;
  /** True if centralized, else decentralized. */
  GunCentralized?: eml.String64;
  /** Description about the perforating gun. */
  GunDesciption?: eml.String2000;
  /** Flag indicating whether the gun is left in hole or not. */
  GunLeftInHole?: boolean;
  /** The size of the perforation gun. */
  GunSize?: eml.LengthMeasure;
  /** hydrostaticPressure */
  HydrostaticPressure?: eml.PressureMeasure;
  /** orientaton */
  Orientation?: eml.String64;
  /** Description of orientaton method */
  OrientationMethod?: eml.String64;
  /** Pointer to a BusinessAssociate representing the company providing the perforation. */
  PerforationCompany?: eml.DataObjectReference;
  /** Perforation fluid type */
  PerforationFluidType?: eml.String64;
  /** Reference to the log */
  RefLog?: eml.String64;
  /** Reservoir pressure */
  ReservoirPressure?: eml.PressureMeasure;
  /** Number of shots per unit length (ft, m) */
  ShotsDensity?: eml.ReciprocalLengthMeasure;
  /** The number of missed firings from the gun. */
  ShotsMisfired?: number;
  /** Number of shots planned */
  ShotsPlanned?: number;
  /** index number of stage */
  StageNumber?: number;
  /** Surface pressure */
  SurfacePressure?: eml.PressureMeasure;
}
export interface Perforating extends _Perforating {}

/** Information on the perforating event. */
interface _PerforatingExtension extends _AbstractEventExtension {
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  Perforating?: Perforating[];
  /** The perforationSet reference. */
  PerforationSet: eml.DataObjectComponentReference;
}
export interface PerforatingExtension extends _PerforatingExtension {}

/** Information regarding a collection of perforations. */
interface _PerforationSet extends BaseType {
  /** Unique identifier for this instance of PerforationSet. */
  uid: eml.String64;
  /** Reference to the borehole that contains the perf set. */
  BoreholeString?: eml.ComponentReference[];
  /** The ratio value of crash damage. */
  CrushDamageRatio?: eml.String64;
  /** The diameter of the crushed zone. */
  CrushZoneDiameter?: eml.LengthMeasure;
  /** A coefficient used in the equation for calculation of pressure drop
   * across a perforation set. */
  DischargeCoefficient?: number;
  /** Reference to the downhole string. */
  DownholeString?: eml.ComponentReference[];
  EventHistory?: EventInfo;
  /** The friction factor of each perforation set. */
  FrictionFactor?: number;
  /** The friction pressure for the perforation set. */
  FrictionPres?: eml.PressureMeasure;
  /** The angle of the holes. */
  HoleAngle?: eml.PlaneAngleMeasure;
  /** The number of holes. */
  HoleCount?: number;
  /** The density of the holes. */
  HoleDensity?: eml.ReciprocalLengthMeasure;
  /** The diameter of the perf holes. */
  HoleDiameter?: eml.LengthMeasure;
  /** The pattern of the holes. */
  HolePattern?: eml.String64;
  /** Measured depth interval for the entire perforation set. */
  MdInterval?: eml.MdInterval;
  /** The original perforation date. */
  PerforationDate?: eml.TimeStamp;
  /** The penetration length of perforation. */
  PerforationPenetration?: eml.LengthMeasure;
  /** The type of perforation tool. */
  PerforationTool?: PerforationToolType;
  /** Remarks regarding this perforation set. */
  PermanentRemarks?: eml.String2000;
  /** The true vertical depth of the entire perforation set. */
  TvdInterval?: eml.AbstractTvdInterval;
}
export interface PerforationSet extends _PerforationSet {}

/** The location/interval of the perforation set and its history. */
interface _PerforationSetInterval extends BaseType {
  /** Unique identifier for this instance of PerforationSetInterval. */
  uid: eml.String64;
  /** The PerforationSetInterval event information. */
  EventHistory?: EventInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to a RESQML geologic unit interpretation. */
  GeologicUnitInterpretation?: eml.DataObjectReference[];
  /** Reference to a geology feature. */
  GeologyFeature?: eml.DataObjectComponentReference[];
  /** Reference to a perforation set. */
  PerforationSet?: eml.DataObjectComponentReference;
  /** Overall measured depth interval for this perforation set. */
  PerforationSetMdInterval?: eml.MdInterval;
  /** Overall true vertical depth interval for this perforation set. */
  PerforationSetTvdInterval?: eml.AbstractTvdInterval;
  PerforationStatusHistory?: PerforationStatusHistory[];
}
export interface PerforationSetInterval extends _PerforationSetInterval {}

/** Information on the collection of perforation sets. */
interface _PerforationSets extends BaseType {
  PerforationSet: PerforationSet[];
}
export interface PerforationSets extends _PerforationSets {}

/** Specifies the set of values for the status of a perforation. */
export type PerforationStatus = "open" | "proposed" | "squeezed";
interface _PerforationStatus extends eml._TypeEnum {
  _: PerforationStatus;
}

/** Information on the collection of perforation status history. */
interface _PerforationStatusHistory extends BaseType {
  /** Unique identifier for this instance of PerforationStatusHistory. */
  uid: eml.String64;
  /** Defines the proportional amount of fluid from the well completion that is flowing through this interval within a wellbore. */
  AllocationFactor?: NonNegativeFraction;
  /** Remarks and comments about the status. */
  Comment?: eml.String2000;
  /** The end date of the status. */
  EndDate?: eml.TimeStamp;
  /** Overall measured depth interval for this perforated interval. */
  PerforationMdInterval?: eml.MdInterval;
  /** Perforation status. */
  PerforationStatus?: PerforationStatus;
  /** Overall true vertical depth interval for this perforated interval. */
  PerforationTvdInterval?: eml.AbstractTvdInterval;
  /** The start date of the status. */
  StartDate?: eml.TimeStamp;
}
export interface PerforationStatusHistory extends _PerforationStatusHistory {}

/** Species the values for the type of perforation tool used to create the perfs. */
export type PerforationToolType =
  | "casing gun"
  | "coiled tubing jet tool"
  | "drilled"
  | "mandrel"
  | "n/a"
  | "slots-machine cut"
  | "slots-undercut"
  | "strip gun"
  | "tcp gun"
  | "through tubing gun";
interface _PerforationToolType extends eml._TypeEnum {
  _: PerforationToolType;
}

/** Information on slot resulting from a perforation. */
interface _PerfSlot extends BaseType {
  /** Unique identifier for this instance of PerfSlot. */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Remarks and comments about this perforation slot. */
  Remarks?: eml.String2000;
  /** Distance from center point. */
  SlotCenterDistance?: eml.LengthMeasure;
  /** The number of the slots. */
  SlotCount?: number;
  /** The height of slot. */
  SlotHeight?: eml.LengthMeasure;
  /** The width of the slot. */
  SlotWidth?: eml.LengthMeasure;
}
export interface PerfSlot extends _PerfSlot {}

/** Operations Personnel Component Schema. List each company on the rig at the time of the report and key information about each company, for example, name, type of service, and number of personnel. */
interface _Personnel extends BaseType {
  /** Unique identifier for this instance of Personnel. */
  uid: eml.String64;
  /** Pointer to a BusinessAssociate representing the company. */
  Company?: eml.DataObjectReference;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Number of people on board for that company. */
  NumPeople?: number;
  /** Total time worked by the company (commonly in hours). */
  TotalTime?: eml.TimeMeasure;
  /** Service provided by the company. */
  TypeService?: eml.String64;
}
export interface Personnel extends _Personnel {}

/** Specifies the values for the physical status of an interval. */
export type PhysicalStatus = "closed" | "open" | "proposed";
interface _PhysicalStatus extends eml._TypeEnum {
  _: PhysicalStatus;
}

/** UNSPSC (Segment 71) commodity code from oil and gas extraction and production enhancement services family. For more information, see http://www.pidx.org/. */
export type PIDXCommodityCode =
  | "71131001"
  | "71131002"
  | "71131003"
  | "71131004"
  | "71131005"
  | "71131006"
  | "71131007"
  | "71131008"
  | "71131009"
  | "71131010"
  | "71131011"
  | "71131012"
  | "71131013"
  | "71131014"
  | "71131015"
  | "71131016"
  | "71131018"
  | "71131019";
interface _PIDXCommodityCode extends eml._TypeEnum {
  _: PIDXCommodityCode;
}

/** Rig Pit Schema. */
interface _Pit extends BaseType {
  /** Unique identifier for this instance of pit */
  uid: eml.String64;
  /** Maximum pit capacity. */
  CapMx: eml.VolumeMeasure;
  /** Date and time the pit was installed. */
  DTimInstall?: eml.TimeStamp;
  /** Date and time the pit was removed. */
  DTimRemove?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Relative pit number of all pits on the rig. One-based. */
  Index: number;
  /** Flag to indicate if the pit is part of the active system.
   * Values are "true" (or "1") and "false" (or "0"). */
  IsActive?: boolean;
  /** An identification tag for the pit.
   * A serial number is a type of identification tag; however, some tags contain many pieces of information. This element only identifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** Pointer to a BusinessAssociate representing the contractor/owner. */
  Owner?: eml.DataObjectReference;
  /** The type of pit. */
  TypePit?: PitType;
}
export interface Pit extends _Pit {}

/** Specfies the type of pit. */
export type PitType =
  | "bulk"
  | "chemical"
  | "drilling"
  | "mix"
  | "mud cleaning"
  | "sand trap"
  | "slug"
  | "storage"
  | "surge tank"
  | "trip tank";
interface _PitType extends eml._TypeEnum {
  _: PitType;
}

/** Pit Volume Component Schema. */
interface _PitVolume extends BaseType {
  /** Unique identifier for this instance of PitVolume. */
  uid: eml.String64;
  /** Density of fluid in the pit. */
  DensFluid?: eml.MassPerVolumeMeasure;
  /** Description of the fluid in the pit. */
  DescFluid?: eml.String64;
  /** Date and time the information is related to. */
  DTim?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** This is a pointer to the corresponding pit on the rig containing the volume being described. */
  Pit: eml.ComponentReference;
  /** Funnel viscosity (in seconds). */
  VisFunnel?: eml.TimeMeasure;
  /** Volume of fluid in the pit. */
  VolPit: eml.VolumeMeasure;
}
export interface PitVolume extends _PitVolume {}

interface _PlaneAngleOperatingRange extends _AbstractOperatingRange {
  Uom: eml.PlaneAngleUomExt;
}
export interface PlaneAngleOperatingRange extends _PlaneAngleOperatingRange {}

/** Used to declare that data points in a specific WITSML log channel may contain value attributes (e.g., quality identifiers). This declaration is independent from the possibility that ETP may have sent ValueAttributes in real time.
 * If an instance of PointMetadata is present for a Channel, then the value for that point is represented as an array in the bulk data string. */
interface _PointMetadata extends BaseType {
  /** IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  AxisDefinition?: LogChannelAxis[];
  /** The kind of point metadata.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  DataKind: ChannelDataKind;
  /** Defines a vertical datum that point metadata values that are measured depth or vertical depth values are referenced to.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Datum?: eml.DataObjectReference;
  /** Free format description of the point metadata. */
  Description: eml.String2000;
  /** An optional value pointing to a PropertyKind.
   * Energistics provides a list of standard property kinds that represent the basis for the commonly used properties in the E&P subsurface workflow.
   * This PropertyKind enumeration is in the external PropertyKindDictionary XML file in the Common ancillary folder.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  MetadataPropertyKind?: eml.DataObjectReference;
  /** The name of the point metadata.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Name: eml.String64;
  /** The underlying unit of measure of the value.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. */
  Uom: eml.UnitOfMeasureExt;
}
export interface PointMetadata extends _PointMetadata {}

/** A channel object specific to pore pressure and fracture gradient modeling. It corresponds roughly to a PPFGDataSetCurve in OSDU. */
interface _PPFGChannel extends _Channel {
  /** Information about a PPFGChannel that is relevant for OSDU integration but does not have a natural place in a PPFGChannel object. */
  PPFGChannelOSDUIntegration?: PPFGChannelOSDUIntegration;
  /** An array of processing operations that have been applied to this channel's data. For example: 'Smoothed', 'Calibrated', etc. */
  PPFGDataProcessingApplied?: PPFGDataProcessingExt[];
  /** Indicates how the PPFG data in the channel was derived. */
  PPFGDerivation?: PPFGDataDerivationExt;
  /** The PPFG Family of the PPFG quantity measured, for example 'Pore Pressure from Corrected Drilling Exponent'. An individual channel that belongs to a Main Family. */
  PPFGFamily?: PPFGFamilyExt;
  /** The mnemonic of the PPFG Family. */
  PPFGFamilyMnemonic?: PPFGFamilyMnemonicExt;
  /** The Main Family Type of the PPFG quantity measured, for example 'Pore Pressure'. Primarily used for high level data classification. */
  PPFGMainFamily?: PPFGMainFamilyExt;
  /** The lithology that this channel was modeled on. The assumption is that several different channels will be modeled, each for a specific lithology type, and during drilling, when it is known which lithologyy the well is currently in, users would refer to the channels modeled on the appropropriate type of lithology. */
  PPFGModeledLithology?: PPFGModeledLithologyExt;
  /** The empirical calibrated model used for pressure calculations from a petrophysical channel (sonic or resistivity), for example 'Eaton' and 'Bowers',... . */
  PPFGTransformModelType?: PPFGTransformModelTypeExt;
  /** The uncertainty class for the channel, for example 'most likely' or 'p50'. */
  PPFGUncertaintyClass?: PPFGUncertaintyClassExt;
}
export interface PPFGChannel extends _PPFGChannel {}

/** Information about a PPFGChannel that is relevant for OSDU integration but does not have a natural place in a PPFGChannel object. */
interface _PPFGChannelOSDUIntegration extends BaseType {
  /** The date that the PPFG channel was created by the PPFG practitioner or contractor. */
  RecordDate?: eml.TimeStamp;
}
export interface PPFGChannelOSDUIntegration
  extends _PPFGChannelOSDUIntegration {}

/** A channel set object specific to pore pressure and fracture gradient modeling. It corresponds roughly to a PPFGDataSet in OSDU. */
interface _PPFGChannelSet extends _ChannelSet {
  /** Information about a PPFGChannelSet that is relevant for OSDU integration but does not have a natural place in a PPFGChannelSet object. */
  PPFGChannelSetOSDUIntegration?: PPFGChannelSetOSDUIntegration;
  /** Open comments from the PPFG calculation team. */
  PPFGComment?: eml.String2000;
  /** Nominal indication of how how the PPFG data in the channel set was derived. Individual channels may have different derivations. */
  PPFGDerivation?: PPFGDataDerivationExt;
  /** Free text to describe the type of gauge used for the pressure measurement. */
  PPFGGaugeType?: eml.String64;
  /** Offset Wellbores included in the context and calculations of this PPFG channel set. */
  PPFGOffsetWellbore?: eml.DataObjectReference[];
  /** Tectonic Scenario Setting for Planning and Pore Pressure Practitioners. Built into interpretive curves. Can be, for example 'Strike Slip'. */
  PPFGTectonicSetting?: PPFGTectonicSettingExt;
}
export interface PPFGChannelSet extends _PPFGChannelSet {}

/** Information about a PPFGChannelSet that is relevant for OSDU integration but does not have a natural place in a PPFGChanneSet object. */
interface _PPFGChannelSetOSDUIntegration extends BaseType {
  /** The date that the PPFGChanneSet was created by the PPFG practitioner or contractor. */
  RecordDate?: eml.TimeStamp;
}
export interface PPFGChannelSetOSDUIntegration
  extends _PPFGChannelSetOSDUIntegration {}

/** Specifies the source of PPFG data. */
export type PPFGDataDerivation =
  | "basin model"
  | "estimated"
  | "inferred"
  | "measured"
  | "post-drill interpretation"
  | "pre-drill interpretation"
  | "real time"
  | "transformed";
interface _PPFGDataDerivation extends eml._TypeEnum {
  _: PPFGDataDerivation;
}

export type PPFGDataDerivationExt = string;
type _PPFGDataDerivationExt = Primitive._string;

/** The type and level of data processing that has been applied to PPFG data. */
export type PPFGDataProcessing =
  | "calibrated"
  | "corrected"
  | "filtered"
  | "interpolated"
  | "interpreted"
  | "normalized"
  | "smoothed"
  | "transformed";
interface _PPFGDataProcessing extends eml._TypeEnum {
  _: PPFGDataProcessing;
}

export type PPFGDataProcessingExt = string;
type _PPFGDataProcessingExt = Primitive._string;

/** The Family Type of the PPFG quantity measured, for example 'pore pressure from corrected drilling exponent'. An individual quantity that belongs to a Main Family. */
export type PPFGFamily =
  | "achievable fracture gradient"
  | "breakout width"
  | "corrected temperature"
  | "effective stress"
  | "effective stress gradient"
  | "formation temperature"
  | "fracture breakdown gradient"
  | "fracture breakdown pressure"
  | "fracture closure gradient"
  | "fracture closure pressure"
  | "fracture gradient"
  | "fracture initiation pressure"
  | "fracture initiation pressure gradient"
  | "fracture pressure"
  | "fracture propagation pressure"
  | "fracture propagation pressure gradient"
  | "friction angle (failure criteria)"
  | "intermediate principle stress"
  | "intermediate principle stress gradient"
  | "least principle stress"
  | "least principle stress gradient"
  | "margin"
  | "max horizontal stress"
  | "max horizontal stress gradient"
  | "maximum horizontal stress azimuth"
  | "maximum principle stress"
  | "maximum principle stress gradient"
  | "mean effective stress"
  | "mean effective stress gradient"
  | "mean stress"
  | "mean stress gradient"
  | "measured depth"
  | "measured formation pressure"
  | "measured formation pressure gradient"
  | "minimum horizontal stress"
  | "minimum horizontal stress gradient"
  | "modeled fracture gradient"
  | "mpd back pressure"
  | "normal compaction trendline"
  | "normal compaction trendline - corrected drilling exponent"
  | "normal compaction trendline - density"
  | "normal compaction trendline - mechanical specific energy"
  | "normal compaction trendline - resistivity"
  | "normal compaction trendline - sonic"
  | "normal compaction trendline - total porosity"
  | "normal effective stress"
  | "normal effective stress gradient"
  | "normal hydrostatic pressure"
  | "normal hydrostatic pressure gradient"
  | "overburden gradient"
  | "overburden pressure"
  | "overpressure"
  | "overpressure gradient"
  | "pore  pressure"
  | "pore pressure estimated from connection gas"
  | "pore pressure estimated from density"
  | "pore pressure estimated from drill gas"
  | "pore pressure estimated from drilling parameter"
  | "pore pressure estimated from log"
  | "pore pressure estimated from resistivity"
  | "pore pressure estimated from seismic velocity"
  | "pore pressure estimated from sonic"
  | "pore pressure estimated from total porosity"
  | "pore pressure from basin model"
  | "pore pressure from corrected drilling exponent"
  | "pore pressure from mechanical specific energy"
  | "pore pressure gradient"
  | "pore pressure gradient estimated from connection gas"
  | "pore pressure gradient estimated from density"
  | "pore pressure gradient estimated from drill gas"
  | "pore pressure gradient estimated from drilling parameter"
  | "pore pressure gradient estimated from log"
  | "pore pressure gradient estimated from resistivity"
  | "pore pressure gradient estimated from seismic velocity"
  | "pore pressure gradient estimated from sonic"
  | "pore pressure gradient estimated from total porosity"
  | "pore pressure gradient from basin model"
  | "pore pressure gradient from corrected drilling exponent"
  | "pore pressure gradient from mechanical specific energy"
  | "pore-frac window"
  | "safe drilling margin"
  | "sedimentation rate"
  | "shear failure pressure (collapse pressure)"
  | "shear failure pressure gradient (collapse pressure gradient)"
  | "strengthened fracture gradient"
  | "structurally adjusted pore pressure"
  | "structurally adjusted pore pressure gradient"
  | "subnormal pressure"
  | "temperature annular"
  | "temperature bha"
  | "true vertical depth"
  | "two way time"
  | "unconfined compressive strength"
  | "vertical effective stress"
  | "vertical effective stress gradient"
  | "vertical stress"
  | "vertical stress gradient";
interface _PPFGFamily extends eml._TypeEnum {
  _: PPFGFamily;
}

export type PPFGFamilyExt = string;
type _PPFGFamilyExt = Primitive._string;

/** The mnemonic for the Family Type of the PPFG quantity measured. */
export type PPFGFamilyMnemonic =
  | "BOAngle"
  | "ES"
  | "ESG"
  | "ESN"
  | "FA"
  | "FBP"
  | "FBPG"
  | "FCP"
  | "FCPG"
  | "FG"
  | "FG ACHIV"
  | "FG BM"
  | "FG STREN"
  | "FIP"
  | "FIPG"
  | "FP"
  | "FPP"
  | "FPPG"
  | "FTEMP"
  | "IPS"
  | "IPSG"
  | "LPS"
  | "LPSG"
  | "MD"
  | "MES"
  | "MESG"
  | "MPD BP"
  | "MPS"
  | "MPSG"
  | "MRGN"
  | "MS"
  | "MSG"
  | "NCT"
  | "NCT DT"
  | "NCT DXC"
  | "NCT MSE"
  | "NCT PHIT"
  | "NCT RES"
  | "NCT RHOB"
  | "NESG"
  | "OB"
  | "OBG"
  | "OP"
  | "OPG"
  | "PFW"
  | "PNORM"
  | "PNORMG"
  | "PP"
  | "PP BM"
  | "PP CG"
  | "PP DG"
  | "PP DP"
  | "PP DT"
  | "PP DXC"
  | "PP LOG"
  | "PP MEAS"
  | "PP MSE"
  | "PP PHIT"
  | "PP RES"
  | "PP RHOB"
  | "PP VSEIS"
  | "PP ZADJ"
  | "PPG"
  | "PPG BM"
  | "PPG CG"
  | "PPG DG"
  | "PPG DP"
  | "PPG DT"
  | "PPG DxC"
  | "PPG EST"
  | "PPG MEAS"
  | "PPG MSE"
  | "PPG PHIT"
  | "PPG RES"
  | "PPG RHOB"
  | "PPG VSEIS"
  | "PPG ZADJ"
  | "PSNORM"
  | "SDM"
  | "SEDRT"
  | "SFP"
  | "SFPG"
  | "SHAZ"
  | "SHmax"
  | "SHmaxG"
  | "Shmin"
  | "ShminG"
  | "SV"
  | "SVG"
  | "TEMP A"
  | "TEMP BHA"
  | "TEMP C"
  | "TVD"
  | "TWT"
  | "UCS"
  | "VES"
  | "VESG";
interface _PPFGFamilyMnemonic extends eml._TypeEnum {
  _: PPFGFamilyMnemonic;
}

export type PPFGFamilyMnemonicExt = string;
type _PPFGFamilyMnemonicExt = Primitive._string;

/** A log object specific to pore pressure and fracture gradient modeling. */
interface _PPFGLog extends _Log {
  /** Open comments from the PPFG calculation team. */
  PPFGComment?: eml.String2000;
  /** Nominal indication of how how the PPFG data in the log was derived. Individual channels may have different derivations. */
  PPFGDerivation?: PPFGDataDerivationExt;
  /** Free text to describe the type of gauge used for the pressure measurement. */
  PPFGGaugeType?: eml.String64;
  /** Information about a PPFGLog that is relevant for OSDU integration but does not have a natural place in a PPFGLog object. */
  PPFGLogOSDUIntegration?: PPFGLogOSDUIntegration;
  /** Offset Wellbores included in the context and calculations of this PPFG log. */
  PPFGOffsetWellbore?: eml.DataObjectReference[];
  /** Tectonic Scenario Setting for Planning and Pore Pressure Practitioners. Built into interpretive curves. Can be, for example 'Strike Slip'. */
  PPFGTectonicSetting?: PPFGTectonicSettingExt;
}
export interface PPFGLog extends _PPFGLog {}

/** Information about a PPFGLog that is relevant for OSDU integration but does not have a natural place in a PPFGLog object. */
interface _PPFGLogOSDUIntegration extends BaseType {
  /** The date that the PPFG channel set was created by the PPFG practitioner or contractor. */
  RecordDate?: eml.TimeStamp;
}
export interface PPFGLogOSDUIntegration extends _PPFGLogOSDUIntegration {}

/** The Main Family Type of the PPFG quantity measured, for example 'pore pressure'. Primarily used for high level data classification. */
export type PPFGMainFamily =
  | "compaction trendline"
  | "effective stress"
  | "effective stress gradient"
  | "formation pressure"
  | "formation pressure gradient"
  | "fracture pressure"
  | "fracture pressure gradient"
  | "geomechnanics"
  | "margin"
  | "mpd"
  | "overpressure"
  | "overpressure gradient"
  | "pore pressure"
  | "pore pressure gradient"
  | "reference"
  | "sedimentation rate"
  | "stress"
  | "stress gradient"
  | "temperature"
  | "transform model parameter"
  | "window";
interface _PPFGMainFamily extends eml._TypeEnum {
  _: PPFGMainFamily;
}

export type PPFGMainFamilyExt = string;
type _PPFGMainFamilyExt = Primitive._string;

/** Specifies the type of lithology modeled in PPFG data. */
export type PPFGModeledLithology =
  | "carbonate"
  | "composite"
  | "igneous"
  | "salt"
  | "sand"
  | "shale";
interface _PPFGModeledLithology extends eml._TypeEnum {
  _: PPFGModeledLithology;
}

export type PPFGModeledLithologyExt = string;
type _PPFGModeledLithologyExt = Primitive._string;

/** Specifies the source of PPFG data. */
export type PPFGTectonicSetting =
  | "compressional"
  | "extensional"
  | "strike slip"
  | "transpressional"
  | "transtensional";
interface _PPFGTectonicSetting extends eml._TypeEnum {
  _: PPFGTectonicSetting;
}

export type PPFGTectonicSettingExt = string;
type _PPFGTectonicSettingExt = Primitive._string;

/** Empirical calibrated models used for pressure calculations from a petrophysical channel (sonic or resistivity). */
export type PPFGTransformModelType =
  | "apparent poisson's ratio"
  | "bowers"
  | "diagenetic"
  | "eaton"
  | "eaton-daines"
  | "equivalent depth"
  | "k0"
  | "stress path";
interface _PPFGTransformModelType extends eml._TypeEnum {
  _: PPFGTransformModelType;
}

export type PPFGTransformModelTypeExt = string;
type _PPFGTransformModelTypeExt = Primitive._string;

/** Specifies class of uncertainty for PPFG data. */
export type PPFGUncertaintyClass =
  | "high"
  | "low"
  | "maximum"
  | "mean"
  | "mid"
  | "minimum"
  | "most likely"
  | "p10"
  | "p50"
  | "p90";
interface _PPFGUncertaintyClass extends eml._TypeEnum {
  _: PPFGUncertaintyClass;
}

export type PPFGUncertaintyClassExt = string;
type _PPFGUncertaintyClassExt = Primitive._string;

/** Specifies values for mud log parameters that are measured in units of pressure gradient. */
export type PressureGradientParameterKind =
  | "direct pore pressure gradient measurement"
  | "fracture pressure gradient estimate"
  | "kick pressure gradient"
  | "lost returns"
  | "overburden gradient"
  | "pore pressure gradient estimate";
interface _PressureGradientParameterKind extends eml._TypeEnum {
  _: PressureGradientParameterKind;
}

/** Specifies values for mud log parameters that are measured in units of pressure. */
export type PressureParameterKind =
  | "direct fracture pressure measurement"
  | "pore pressure estimate while drilling";
interface _PressureParameterKind extends eml._TypeEnum {
  _: PressureParameterKind;
}

/** Information on pressure test event. */
interface _PressureTestExtension extends _AbstractEventExtension {
  /** Annulus pressure */
  AnnulusPressure?: eml.PressureMeasure;
  /** Circulating position */
  CirculatingPosition?: eml.String64;
  /** Orifice Size */
  DiaOrificeSize?: eml.LengthMeasure;
  /** Next Test Date */
  DTimeNextTestDate?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Rate Bled */
  FlowrateRateBled?: eml.VolumePerTimeMeasure;
  /** Fluid bled type */
  FluidBledType?: eml.String64;
  /** String Being Tested */
  IdentifierJob?: eml.String64;
  /** True if successful */
  IsSuccess?: boolean;
  /** Maximum pressure held during test */
  MaxPressureDuration?: eml.PressureMeasure;
  /** Description of orientaton method */
  OrientationMethod?: eml.String64;
  /** Reference # */
  Str10Reference?: eml.String64;
  /** Test fluid type */
  TestFluidType?: eml.String64;
  /** Test sub type */
  TestSubType?: eml.String64;
  /** Test type */
  TestType?: eml.String64;
  /** Well (Assembly) */
  UidAssembly?: eml.String64;
  /** Volume Bled */
  VolumeBled?: eml.VolumeMeasure;
  /** Volume Lost */
  VolumeLost?: eml.VolumeMeasure;
  /** Volume Pumped */
  VolumePumped?: eml.VolumeMeasure;
  /** Well pressure used */
  WellPressureUsed?: eml.String64;
}
export interface PressureTestExtension extends _PressureTestExtension {}

/** Specifies the types of pressure test(s) conducted during a drilling report period. */
export type PresTestType = "leak off test" | "formation integrity test";
interface _PresTestType extends eml._TypeEnum {
  _: PresTestType;
}

/** Specifies the type of proppant agent: ceramic, resin, sand, etc. */
export type ProppantAgentKind =
  | "ceramic"
  | "resin coated ceramic"
  | "resin coated sand"
  | "sand";
interface _ProppantAgentKind extends eml._TypeEnum {
  _: ProppantAgentKind;
}

/** Pump Action: 1 = single acting, 2 = double acting.@pattern .+ */
export type PumpActionIntegerCode = number;
type _PumpActionIntegerCode = Primitive._number;

/** Operations Pump Component Schema. */
interface _PumpOp extends BaseType {
  /** Unique identifier for this instance of PumpOp. */
  uid: eml.String64;
  /** Date and time the information is related to. */
  DTim?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Liner inside diameter. */
  IdLiner?: eml.LengthMeasure;
  /** Stroke length. */
  LenStroke?: eml.LengthMeasure;
  /** Along-hole measured depth of the measurement from the drill datum. */
  MdBit?: eml.MeasuredDepth;
  /** Pump efficiency. */
  PcEfficiency?: eml.PowerPerPowerMeasure;
  /** Pump pressure recorded. */
  Pressure: eml.PressureMeasure;
  /** A pointer to the corresponding pump on the rig. */
  Pump: eml.ComponentReference;
  /** Pump output (included for efficiency). */
  PumpOutput?: eml.VolumePerTimeMeasure;
  /** Pump rate (strokes per minute). */
  RateStroke: eml.AngularVelocityMeasure;
  /** Type of pump operation. */
  TypeOperation?: PumpOpType;
}
export interface PumpOp extends _PumpOp {}

/** Specifies type of well operation being conducted while this pump was in use. */
export type PumpOpType = "drilling" | "reaming" | "circulating" | "slow pump";
interface _PumpOpType extends eml._TypeEnum {
  _: PumpOpType;
}

/** Specifies the type of pump. */
export type PumpType = "centrifugal" | "duplex" | "triplex";
interface _PumpType extends eml._TypeEnum {
  _: PumpType;
}

/** Specifies if the reading was measured or estimated. */
export type ReadingKind = "measured" | "estimated" | "unknown";
interface _ReadingKind extends eml._TypeEnum {
  _: ReadingKind;
}

/** Information on containing or contained components. */
interface _ReferenceContainer extends BaseType {
  /** Unique identifier for this instance of ReferenceContainer. */
  uid: eml.String64;
  /** Reference to the equipment for this accessory. */
  AccesoryEquipment?: eml.ComponentReference;
  /** Comment or remarks on this container reference. */
  Comment: eml.String2000;
  /** Equipment reference. */
  Equipment: eml.ComponentReference;
  /** DownholeString reference. */
  String: eml.ComponentReference;
}
export interface ReferenceContainer extends _ReferenceContainer {}

/** Rheometer readings taken during a drill report period. A rheometer is viscosimeter use for some fluid measurements, particularly when solid suspension properties are needed. */
interface _Rheometer extends BaseType {
  /** Unique identifier for this instance of Rheometer. */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Rheometer pressure. */
  PresRheom?: eml.PressureMeasure;
  /** Rheometer temperature. */
  TempRheom?: eml.ThermodynamicTemperatureMeasure;
  Viscosity?: RheometerViscosity[];
}
export interface Rheometer extends _Rheometer {}

/** Viscosity reading of the rheometer */
interface _RheometerViscosity extends BaseType {
  /** Unique identifier for this instance of RheometerViscosity. */
  uid: eml.String64;
  /** Rotational speed of the rheometer, typically in RPM. */
  Speed: eml.AngularVelocityMeasure;
  /** The raw reading from a rheometer. This could be , but is not necessarily, a viscosity. */
  Viscosity: number;
}
export interface RheometerViscosity extends _RheometerViscosity {}

/** Rig Schema. Used to capture information unique to a drilling rig. For information about the usage of a rig in a specific operation, see the RigUtilization object. */
interface _Rig extends eml._AbstractActiveObject {
  /** Rig approvals/certification. */
  Approvals?: eml.String64;
  /** Derrick wind capacity. */
  CapWindDerrick?: eml.LengthPerTimeMeasure;
  /** Classification of the rig. */
  ClassRig?: eml.String64;
  /** Email address of the contact person. */
  EmailAddress?: eml.String64;
  /** Fax number on the rig. */
  FaxNumber?: eml.String64;
  /** Height of the derrick. */
  HtDerrick?: eml.LengthMeasure;
  /** Flag to indicate that the rig is an offshore rig (drill ship, semi-submersible, jack-up, platform, TADU).
   * Values are "true" (or "1") and "false" (or "0"). */
  IsOffshore?: boolean;
  /** Pointer to a BusinessAssociate representing the company that manufactured the rig. */
  Manufacturer?: eml.DataObjectReference;
  /** Name of the contact person. */
  NameContact?: eml.String64;
  /** Number of cranes on the rig. */
  NumCranes?: number;
  /** Pointer to a BusinessAssociate representing the company that owns the rig. */
  Owner?: eml.DataObjectReference;
  /** Derrick rating. */
  RatingDerrick?: eml.ForceMeasure;
  /** Maximum hole depth rating for the rig. */
  RatingDrillDepth?: eml.LengthMeasure;
  /** Maximum water depth rating for the rig. */
  RatingWaterDepth?: eml.LengthMeasure;
  /** Rig registration location. */
  Registration?: eml.String64;
  /** Telephone number on the rig. */
  TelNumber?: eml.String64;
  /** Derrick type. */
  TypeDerrick?: DerrickType;
  /** The type of rig (e.g., semi-submersible, jack-up, etc.) */
  TypeRig?: RigType;
  /** The year the rig entered service. */
  YearEntService?: string;
}
export interface Rig extends _Rig {}

/** Operations Rig Response Component Schema. */
interface _RigResponse extends BaseType {
  AnchorState?: AnchorState[];
  /** Angle between the riser and the blowout preventer (BOP) at the flex joint. */
  BallJointAngle?: eml.PlaneAngleMeasure;
  /** Direction of the ball joint. */
  BallJointDirection?: eml.PlaneAngleMeasure;
  /** Vessel displacement (in water). */
  DispRig?: eml.LengthMeasure;
  /** Direction of the guide base. */
  GuideBaseAngle?: eml.PlaneAngleMeasure;
  /** Load carried by one leg of a jackup rig. */
  LoadLeg1?: eml.ForceMeasure;
  /** Load carried by the second leg of a jackup rig. */
  LoadLeg2?: eml.ForceMeasure;
  /** Load carried by the third leg of a jackup rig. */
  LoadLeg3?: eml.ForceMeasure;
  /** Load carried by the fourth leg of a jackup rig. */
  LoadLeg4?: eml.ForceMeasure;
  /** Mean draft at mid-section of the vessel. */
  MeanDraft?: eml.LengthMeasure;
  /** Horizontal displacement of the rig relative to the wellhead. */
  OffsetRig?: eml.LengthMeasure;
  /** Penetration of the first leg into the seabed. */
  PenetrationLeg1?: eml.LengthMeasure;
  /** Penetration of the second leg into the seabed. */
  PenetrationLeg2?: eml.LengthMeasure;
  /** Penetration of the third leg into the seabed. */
  PenetrationLeg3?: eml.LengthMeasure;
  /** Penetration of the fourth leg into the seabed. */
  PenetrationLeg4?: eml.LengthMeasure;
  /** Direction, relative to true north, to which the rig is facing. */
  RigHeading?: eml.PlaneAngleMeasure;
  /** Maximum amplitude of the vertical motion of the rig. */
  RigHeave?: eml.LengthMeasure;
  /** Measure of the fore-aft rotational movement of the rig due to the combined effects of wind and waves; measured as the angle from horizontal. */
  RigPitchAngle?: eml.PlaneAngleMeasure;
  /** Measure of the side-to-side rotational movement of the rig due to the combined effects of wind and waves; measured as the angle from vertical. */
  RigRollAngle?: eml.PlaneAngleMeasure;
  /** Angle of the marine riser with the vertical. */
  RiserAngle?: eml.PlaneAngleMeasure;
  /** Direction of the marine riser. */
  RiserDirection?: eml.PlaneAngleMeasure;
  /** Tension of the marine riser. */
  RiserTension?: eml.ForceMeasure;
  /** Total deck load. */
  TotalDeckLoad?: eml.ForceMeasure;
  /** Current temporary load on the rig deck. */
  VariableDeckLoad?: eml.ForceMeasure;
}
export interface RigResponse extends _RigResponse {}

/** Specifies the type of drilling rig. */
export type RigType =
  | "barge"
  | "coiled tubing"
  | "floater"
  | "jackup"
  | "land"
  | "platform"
  | "semi-submersible";
interface _RigType extends eml._TypeEnum {
  _: RigType;
}

/** Rig Utilization Schema. Used to capture information related to the usage of a specific rig. For information unique to the rig itself, see the Rig object. */
interface _RigUtilization extends eml._AbstractActiveObject {
  /** Air gap from the rig floor to the ground or mean sea level, depending on the rig location. */
  AirGap?: eml.LengthMeasure;
  /** Are the thrusters azimuth?  Values are "true" (or "1") and "false" (or "0"). */
  Azimuthing?: boolean;
  BhaRun?: eml.DataObjectReference[];
  Bop?: Bop;
  /** Number of bunks per room. */
  BunksPerRoom?: number;
  /** Capacity of bulk cement. */
  CapBulkCement?: eml.VolumeMeasure;
  /** Bulk/dry mud storage capacity. */
  CapBulkMud?: eml.VolumeMeasure;
  /** Drill water capacity. */
  CapDrillWater?: eml.VolumeMeasure;
  /** Fuel capacity. */
  CapFuel?: eml.VolumeMeasure;
  /** Liquid mud storage capacity. */
  CapLiquidMud?: eml.VolumeMeasure;
  /** Potable water capacity. */
  CapPotableWater?: eml.VolumeMeasure;
  /** Name of the cement unit on the rig. */
  CementUnit?: eml.String64;
  Centrifuge?: Centrifuge[];
  /** Pointer to a reference point representing the datum for location reference. */
  Datum?: eml.DataObjectReference;
  Degasser?: Degasser[];
  /** Rig brake description. */
  DescBrake?: eml.String64;
  /** Description of rotating system. */
  DescRotSystem?: eml.String64;
  /** Measured depth of the wellbore when operations performed with this rig ended. */
  EndHoleDepth?: eml.LengthMeasure;
  /** End time of the operation in which the rig was used. */
  EndOperationTime?: eml.TimeStamp;
  /** Description of flare(s). */
  Flares?: eml.String64;
  /** Description of the gantry. */
  Gantry?: eml.String64;
  /** Description of the electrical power generating system. */
  Generator?: eml.String64;
  /** Maximum allowable heave. */
  HeaveMx?: eml.LengthMeasure;
  Hydrocyclone?: Hydrocyclone[];
  /** Power system. */
  MainEngine?: eml.String64;
  /** Mooring type. */
  MoorType?: eml.String64;
  /** Minimum motion compensation. */
  MotionCompensationMn?: eml.ForceMeasure;
  /** Maximum motion compensation. */
  MotionCompensationMx?: eml.ForceMeasure;
  /** Description of the draw works motor. */
  MotorDrawWorks?: eml.String64;
  /** Number of anchors. */
  NumAnch?: number;
  /** Number of block lines. */
  NumBlockLines?: number;
  /** Number of beds available on the rig. */
  NumBunks?: number;
  /** Number of guideline tensioners. */
  NumGuideTens?: number;
  /** Number of riser tensioners. */
  NumRiserTens?: number;
  /** Number of thrusters. */
  NumThrusters?: number;
  /** Name of pipe-handling system. */
  PipeHandlingSystem?: eml.String64;
  Pit?: Pit[];
  /** Draw works horse power. */
  PowerDrawWorks?: eml.PowerMeasure;
  Pump?: MudPump[];
  /** Rating for the block. */
  RatingBlock?: eml.ForceMeasure;
  /** Weight rating of the draw works. */
  RatingDrawWorks?: eml.ForceMeasure;
  /** Maximum weight rating of the hook as configured for this rig usage. */
  RatingHkld?: eml.ForceMeasure;
  /** The maximum weight rating of the rotary system on the rig. This could be the rotary system or the top drive. */
  RatingRotSystem?: eml.ForceMeasure;
  /** Maximum swivel rating. */
  RatingSwivel?: eml.ForceMeasure;
  /** Work string rotational torque rating. */
  RatingTqRotSys?: eml.MomentOfForceMeasure;
  Rig: eml.DataObjectReference;
  /** Riser angle limit. */
  RiserAngleLimit?: eml.PlaneAngleMeasure;
  /** Rotary size opening. */
  RotSizeOpening?: eml.LengthMeasure;
  /** Work string drive type. */
  RotSystem?: DriveType;
  /** Description of slow circulation rates (SCR) system. */
  ScrSystem?: eml.String64;
  Shaker?: Shaker[];
  /** Drill line diameter. */
  SizeDrillLine?: eml.LengthMeasure;
  /** Measured depth of the wellbore when operations performed with this rig started. */
  StartHoleDepth?: eml.LengthMeasure;
  /** Start time of the operation in which the rig was used. */
  StartOperationTime?: eml.TimeStamp;
  /** Length of motion compensation provided by equipment. */
  StrokeMotionCompensation?: eml.LengthMeasure;
  SurfaceEquipment?: SurfaceEquipment;
  /** Draw works type. */
  TypeDrawWorks?: DrawWorksType;
  /** Type of hook installed for this rig usage. */
  TypeHook?: eml.String64;
  /** Type of swivel. */
  TypeSwivel?: eml.String64;
  /** Variable deck load maximum (offshore rigs only). */
  VarDeckLdMx?: eml.ForceMeasure;
  /** Variable deck load storm rating (offshore rigs only). */
  VdlStorm?: eml.ForceMeasure;
  Wellbore: eml.DataObjectReference;
  /** Weight of the block. */
  WtBlock?: eml.ForceMeasure;
}
export interface RigUtilization extends _RigUtilization {}

/** Risk Schema. Used to provide a central location for capturing risk information about the well design and other well-related data objects. */
interface _Risk extends eml._AbstractObject {
  /** The personnel affected by the risk. */
  AffectedPersonnel?: RiskAffectedPersonnel[];
  /** The category of risk. */
  Category: RiskCategory;
  /** Plan of action if the risk materializes. */
  Contingency?: eml.String2000;
  /** Complete description of the risk. */
  Details?: eml.String2000;
  /** Hole diameter. */
  DiaHole?: eml.LengthMeasure;
  /** Date and time that activities (related to the risk) were completed. */
  DTimEnd?: eml.TimeStamp;
  /** Date and time that activities (related to the risk) started. */
  DTimStart?: eml.TimeStamp;
  /** Custom string to further categorize the risk. */
  ExtendCategory?: eml.String64;
  /** Details for identifying the risk. */
  Identification?: eml.String2000;
  /** Measured depth of the bit at the end of the activity. */
  MdBitEnd?: eml.MeasuredDepth;
  /** Measured depth of the bit at the start of the activity. */
  MdBitStart?: eml.MeasuredDepth;
  /** Measured Depth at the end of the activity. */
  MdHoleEnd?: eml.MeasuredDepth;
  /** Measured Depth at the start of the activity. */
  MdHoleStart?: eml.MeasuredDepth;
  /** Plan of action to ensure the risk does not materialize. */
  Mitigation?: eml.String2000[];
  ObjectReference?: eml.DataObjectReference[];
  /** Probability level of the risk occurring. Values of 1 through 5, with 1 being the lowest probability. */
  ProbabilityLevel?: LevelIntegerCode;
  /** Severity level of the risk. Values of 1 through 5, with 1 being the lowest risk level. */
  SeverityLevel?: LevelIntegerCode;
  /** The sub category of risk. */
  SubCategory?: RiskSubCategory;
  /** Summary description of the risk. */
  Summary?: eml.String2000;
  /** True vertical depth at the end of the activity. */
  TvdHoleEnd?: eml.AbstractVerticalDepth;
  /** True vertical depth at the start of the activity. */
  TvdHoleStart?: eml.AbstractVerticalDepth;
  /** The type of risk. */
  Type: RiskType;
  Wellbore: eml.DataObjectReference;
}
export interface Risk extends _Risk {}

/** Personnel affected by a risk. */
export type RiskAffectedPersonnel =
  | "cementer"
  | "company man"
  | "contractor"
  | "directional driller"
  | "driller"
  | "drilling engineer"
  | "drilling superintendent"
  | "drilling team"
  | "facility engineer"
  | "field service manager"
  | "foreman"
  | "general service supervisor"
  | "geologist"
  | "member"
  | "mud engineer"
  | "mud logger"
  | "MWD or LWD engineer"
  | "perform engineer"
  | "petrophysicist"
  | "production engineer"
  | "remotely operated vehicle engineer"
  | "safety manager"
  | "sales engineer"
  | "service supervisor"
  | "technical support"
  | "tool pusher"
  | "wireline engineer";
interface _RiskAffectedPersonnel extends eml._TypeEnum {
  _: RiskAffectedPersonnel;
}

/** Specifies the category of risk. */
export type RiskCategory =
  | "hydraulics"
  | "mechanical"
  | "time related"
  | "wellbore stability"
  | "directional drilling"
  | "bit"
  | "equipment failure"
  | "completion"
  | "casing"
  | "other"
  | "HSE";
interface _RiskCategory extends eml._TypeEnum {
  _: RiskCategory;
}

/** Specifies the sub-category of risk, in relation to value of Risk Category. */
export type RiskSubCategory =
  | "gas kick"
  | "shallow water influx"
  | "other influx or kicks"
  | "loss circulation"
  | "poor hole cleaning"
  | "good hole cleaning at high ROP"
  | "high mud weight"
  | "special additives needed"
  | "gumbo problems"
  | "high ECD - rheology related"
  | "excessive circulation"
  | "performing a kill"
  | "mud weight change"
  | "excessive pipe cement scaling"
  | "pit gain or loss"
  | "mud stability problems"
  | "shallow gas flow"
  | "twist off"
  | "stuck pipe"
  | "wireline stuck in hole"
  | "stick and slip"
  | "vibration - axial"
  | "vibration - torsional"
  | "vibration - transverse"
  | "vibration unknown or rough drilling"
  | "uneven wear of BHA"
  | "uneven wear of drillstring"
  | "excessive torque"
  | "excessive drag"
  | "reaming greater than 2 hours"
  | "washouts"
  | "tight hole or overPull"
  | "failed inspections or fatigue wear"
  | "mechanical"
  | "drilling greater than 1000 feet/day"
  | "drilling greater than 2000 feet/day"
  | "drilling less than 20 feet/day"
  | "trips greater than 24 hours"
  | "excessive time for BHA makeup"
  | "waiting on decisions"
  | "waiting on weather"
  | "waiting on tools"
  | "sloughing or packoffs"
  | "ballooning"
  | "fracture problems"
  | "unstable zones"
  | "formation integrity test"
  | "leak-off test"
  | "tectonics"
  | "pore pressure"
  | "breakouts"
  | "bed parallel"
  | "wellbore stability"
  | "excessive doglegs"
  | "sidetrack"
  | "BHA change for directional"
  | "wrong total flow area"
  | "well collision - actual"
  | "well collision - technical"
  | "geosteering"
  | "abnormal tendency changes"
  | "resurveying"
  | "in-field referencing (IFR) actions"
  | "bit or BHA performance"
  | "drilling optimization"
  | "bit balling"
  | "lost cones or broken cutters"
  | "excessive bit wear or gauge"
  | "low rate of bit penetration"
  | "high rate of bit penetration"
  | "downhole tool"
  | "surface system"
  | "motor or rotary steerable system failure"
  | "topdrive failure"
  | "hoisting equipment failure"
  | "circulating equipment failure"
  | "electrical system failure"
  | "blow out preventer events"
  | "surface instrumentation problems"
  | "rig communications"
  | "completion equipment failure"
  | "miscellaneous rig equipment"
  | "tool or equipment failure"
  | "squeeze jobs"
  | "casing surge losses"
  | "stuck casing or completion"
  | "shoe failures"
  | "early cement setup"
  | "casing collapse"
  | "milling"
  | "excessive casing wear or cuttings"
  | "excessive formation damage or skin"
  | "casing rotation or reciprocation rqd"
  | "broaching"
  | "completion or casing"
  | "stratigraphy"
  | "fishing"
  | "junk in hole"
  | "delay due to political unrest"
  | "rig move"
  | "gas hydrates"
  | "pending analysis"
  | "riser disconnect"
  | "other"
  | "personnel"
  | "environmental"
  | "automotive"
  | "asset"
  | "information"
  | "time"
  | "HSE";
interface _RiskSubCategory extends eml._TypeEnum {
  _: RiskSubCategory;
}

/** Specifies the type of risk. */
export type RiskType =
  | "risk"
  | "event"
  | "near miss"
  | "best practice"
  | "lessons learned"
  | "other";
interface _RiskType extends eml._TypeEnum {
  _: RiskType;
}

/** A type of rod connection, e.g., latched, threaded, welded, etc. */
interface _RodConnectionType extends _AbstractConnectionType {
  /** Connection whose type is rod. */
  RodConnectionType: RodConnectionTypes;
}
export interface RodConnectionType extends _RodConnectionType {}

/** Specifies the values for the connection type of rod. */
export type RodConnectionTypes =
  | "eating nipple-cup"
  | "latched"
  | "seating nipple-mechanical"
  | "slipfit sealed"
  | "threaded"
  | "welded";
interface _RodConnectionTypes extends eml._TypeEnum {
  _: RodConnectionTypes;
}

/** Measurements on minimum, average and maximum rates of penetration (ROP) and the channel from which this data was calculated. */
interface _RopStatistics extends BaseType {
  /** Average rate of penetration through the interval. */
  Average?: eml.LengthPerTimeMeasure;
  /** Log channel from which the ROP statistics were calculated. */
  Channel?: eml.DataObjectReference;
  /** Maximum rate of penetration through the interval. */
  Maximum?: eml.LengthPerTimeMeasure;
  /** Minimum rate of penetration through the interval. */
  Minimum?: eml.LengthPerTimeMeasure;
}
export interface RopStatistics extends _RopStatistics {}

/** Rotary Steerable Tool Component Schema. Captures size and performance information about the rotary steerable tool used in the tubular string. */
interface _RotarySteerableTool extends BaseType {
  /** Outside diameter of the tool when the pads are closed. */
  ClosePadOd?: eml.LengthMeasure;
  /** Method used to direct the deviation of the trajectory: point bit or push bit. */
  DeflectionMethod: DeflectionMethod;
  /** Minimum flow rate for programming the tool. */
  DownLinkFlowRateMn?: eml.VolumePerTimeMeasure;
  /** Maximum flow rate for programming the tool. */
  DownLinkFlowRateMx?: eml.VolumePerTimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Minimum flow rate for tool operation. */
  FlowRateMn?: eml.VolumePerTimeMeasure;
  /** Maximum flow rate for tool operation. */
  FlowRateMx?: eml.VolumePerTimeMeasure;
  /** Minimum size of the hole in which the tool can operate. */
  HoleSizeMn?: eml.LengthMeasure;
  /** Maximum size of the hole in which the tool can operate. */
  HoleSizeMx?: eml.LengthMeasure;
  /** Outside diameter of the tool when the pads are activated. */
  OpenPadOd?: eml.LengthMeasure;
  /** Suggested operating speed. */
  OperatingSpeed?: eml.AngularVelocityMeasure;
  /** The number of contact pads. */
  PadCount?: number;
  /** Length of the contact pad. */
  PadLen?: eml.LengthMeasure;
  /** Offset from the bottom of the pad to the bottom connector. */
  PadOffset?: eml.LengthMeasure;
  /** Width of the contact pad. */
  PadWidth?: eml.LengthMeasure;
  /** Pressure drop across the tool. */
  PressLossFact?: number;
  Sensor?: Sensor[];
  /** Maximum rotation speed. */
  SpeedMx?: eml.AngularVelocityMeasure;
  Tool: AbstractRotarySteerableTool;
  /** Maximum weight on the bit. */
  WobMx?: eml.ForceMeasure;
}
export interface RotarySteerableTool extends _RotarySteerableTool {}

/** Measurement of the average turn rate and the channel from which the data was calculated. */
interface _RpmStatistics extends BaseType {
  /** Average bit turn rate through the interval. */
  Average: eml.AngularVelocityMeasure;
  /** Log channel from which the turn rate statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface RpmStatistics extends _RpmStatistics {}

/** Specifies the main line scale types. */
export type ScaleType = "linear" | "logarithmic";
interface _ScaleType extends eml._TypeEnum {
  _: ScaleType;
}

/** Operations Slow Circulation Rates (SCR) Component Schema. */
interface _Scr extends BaseType {
  /** Unique identifier for this instance of Scr */
  uid: eml.String64;
  /** Date and time the information is related to. */
  DTim: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Along hole measured depth of measurement from the drill datum. */
  MdBit?: eml.MeasuredDepth;
  /** Recorded pump pressure for the stroke rate. */
  PresRecorded: eml.PressureMeasure;
  /** A pointer to the corresponding pump on the rig. */
  Pump: eml.ComponentReference;
  /** Pump stroke rate. */
  RateStroke: eml.AngularVelocityMeasure;
  /** Type of slow circulation rate. */
  TypeScr: ScrType;
}
export interface Scr extends _Scr {}

/** Specifies the type of slow circulation rate. */
export type ScrType =
  | "string annulus"
  | "string kill line"
  | "string choke line"
  | "unknown";
interface _ScrType extends eml._TypeEnum {
  _: ScrType;
}

/** Tubular Sensor Component Schema. */
interface _Sensor extends BaseType {
  /** Unique identifier for this instance of Sensor. */
  uid: eml.String64;
  /** Comments and remarks. */
  Comments?: eml.String2000;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Offset from the bottom of the MWD tool. */
  OffsetBot?: eml.LengthMeasure;
  /** Type from POSC. */
  TypeMeasurement?: MeasurementType;
}
export interface Sensor extends _Sensor {}

/** Rig Shaker Schema. */
interface _Shaker extends BaseType {
  /** Unique identifier for this instance of Shaker. */
  uid: eml.String64;
  /** Maximum pump rate at which the unit efficiently operates. */
  CapFlow?: eml.VolumePerTimeMeasure;
  /** Date and time the shaker was installed. */
  DTimInstall?: eml.TimeStamp;
  /** Date and time the shaker was removed. */
  DTimRemove?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Shaker location on the rig. */
  LocationShaker?: eml.String64;
  /** Pointer to a BusinessAssociate representing the manufacturer or supplier of the item. */
  Manufacturer?: eml.DataObjectReference;
  /** Manufacturer's designated model. */
  Model?: eml.String64;
  /** Is part of mud-cleaning assembly as opposed to discrete shale shaker?
   * Values are "true" (or "1") and "false" (or "0"). */
  MudCleaner?: boolean;
  /** Human-recognizable context for the shaker. */
  Name: eml.String64;
  /** An identification tag for the shaker.
   * A serial number is a type of identification tag; however, some tags contain many pieces of information. This element only identifies the tag and does not describe the contents.
   * . */
  NameTag?: NameTag[];
  /** Number of cascade levels. */
  NumCascLevel?: number;
  /** Number of decks. */
  NumDecks?: number;
  /** Pointer to a BusinessAssociate representing the contractor/owner. */
  Owner?: eml.DataObjectReference;
  /** Minimum mesh size. */
  SizeMeshMn?: eml.LengthMeasure;
  /** Description for the type of object. */
  Type?: eml.String64;
}
export interface Shaker extends _Shaker {}

/** Operations Shaker Component Schema. */
interface _ShakerOp extends BaseType {
  /** Unique identifier for this instance of ShakerOp */
  uid: eml.String64;
  /** Date and time the information is related to. */
  DTim?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Hours run the shaker has run for this operation. */
  HoursRun?: eml.TimeMeasure;
  /** Hole measured depth at the time of measurement. */
  MdHole?: eml.MeasuredDepth;
  /** Percent of screen covered by cuttings. */
  PcScreenCovered?: eml.AreaPerAreaMeasure;
  /** A pointer to the shaker that is characterized by this report. */
  Shaker: eml.ComponentReference;
  ShakerScreen?: ShakerScreen;
}
export interface ShakerOp extends _ShakerOp {}

/** Operations Shaker Screen Component Schema. */
interface _ShakerScreen extends BaseType {
  /** Shaker screen cut point, which is the maximum size cuttings that will pass through the screen. */
  CutPoint?: eml.LengthMeasure;
  /** Date and time activities were completed. */
  DTimEnd?: eml.TimeStamp;
  /** Date and time that activities started. */
  DTimStart?: eml.TimeStamp;
  /** Pointer to a BusinessAssociate representing the manufacturer or supplier of the item. */
  Manufacturer?: eml.DataObjectReference;
  /** Mesh size in the X direction. */
  MeshX?: eml.LengthMeasure;
  /** Mesh size in the Y direction. */
  MeshY?: eml.LengthMeasure;
  /** Manufacturers designated model. */
  Model?: eml.String64;
  /** Deck number the mesh is installed on. */
  NumDeck?: number;
}
export interface ShakerScreen extends _ShakerScreen {}

/** A container object for zero or more ShowEvaluationInterval objects. The container references a specific wellbore, a depth interval, a growing object status, and a collection of show evaluation intervals.
 * In a similar way to the InterpretedGeology, these are manually entered by the wellsite geologist or mud logger as an interpretation of the hydrocarbon show along the wellbore, based on the raw readings from one or more show analyses of individual show tests on cuttings samples. */
interface _ShowEvaluation extends eml._AbstractMdGrowingObject {
  ShowEvaluationInterval?: ShowEvaluationInterval[];
  /** Business Rule: This MUST point to the same wellbore that the Wellbore element on the containing WellboreGeology object points to. */
  Wellbore: eml.DataObjectReference;
}
export interface ShowEvaluation extends _ShowEvaluation {}

/** An interpretation of the overall hydrocarbon show derived from analysis of individual show tests on cuttings samples. An interval in the wellbore for which data is manually entered by the wellsite geologist or mud logger as an interpretation of the hydrocarbon show along the wellbore, based on the raw readings from one or more show analyses of individual show tests on cuttings samples.
 * These intervals can be sent via ETP using the GrowingObject protocol. */
interface _ShowEvaluationInterval extends eml._AbstractMdIntervalGrowingPart {
  /** Time required for a sample to leave the bottomhole and reach the surface. */
  BottomsUpTime: eml.TimeMeasure;
  /** Gas or oil exhibited at the show interval. */
  ShowFluid: ShowFluid;
  /** Quality of the fluid showing at this interval. */
  ShowRating?: ShowRating;
}
export interface ShowEvaluationInterval extends _ShowEvaluationInterval {}

/** Specifies the type of fluid analyzed in this interval. */
export type ShowFluid = "gas" | "oil";
interface _ShowFluid extends eml._TypeEnum {
  _: ShowFluid;
}

/** Specifies the intensity and color of the show. */
export type ShowFluorescence = "faint" | "bright" | "none";
interface _ShowFluorescence extends eml._TypeEnum {
  _: ShowFluorescence;
}

/** Specifies another qualifier for the show: blooming or streaming. */
export type ShowLevel = "blooming" | "streaming";
interface _ShowLevel extends eml._TypeEnum {
  _: ShowLevel;
}

/** Specifies the quality of the fluid showing at this interval. */
export type ShowRating =
  | "none"
  | "very poor"
  | "poor"
  | "fair"
  | "good"
  | "very good";
interface _ShowRating extends eml._TypeEnum {
  _: ShowRating;
}

/** Specifies an indication of both the solubility of the oil and the permeability of the show. The speed can vary from instantaneous to very slow. */
export type ShowSpeed =
  | "slow"
  | "moderately fast"
  | "fast"
  | "instantaneous"
  | "none";
interface _ShowSpeed extends eml._TypeEnum {
  _: ShowSpeed;
}

/** The location/interval of the slots and the history. */
interface _SlotsInterval extends BaseType {
  /** Unique identifier for this instance of SlotsInterval. */
  uid: eml.String64;
  /** The SlotsInterval event information. */
  EventHistory?: EventInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to a RESQML geologic unit interpretation. */
  GeologicUnitInterpretation?: eml.DataObjectReference[];
  /** Reference to a geology feature. */
  GeologyFeature?: eml.DataObjectComponentReference[];
  /** Slotted measured depth interval for this completion. */
  SlottedMdInterval?: eml.MdInterval;
  /** Slotted true vertical depth interval for this completion. */
  SlottedTvdInterval?: eml.AbstractTvdInterval;
  StatusHistory?: IntervalStatusHistory[];
  /** Reference to an equipment string, which is the equipment (e.g., tubing, gravel pack screens, etc.) that compose the completion. */
  StringEquipment?: eml.DataObjectComponentReference;
}
export interface SlotsInterval extends _SlotsInterval {}

/** A reference to a trajectoryStation in a wellbore. The trajectoryStation may be defined within the context of another wellbore. This value represents a foreign key from one element to another. */
interface _SourceTrajectoryStation extends BaseType {
  /** A pointer to the trajectoryStation within the parent trajectory. StationReference is a special case where WITSML only uses a UID for the pointer.The natural identity of a station is its physical characteristics (e.g., md). */
  StationReference: eml.ComponentReference;
  Trajectory: eml.DataObjectReference;
}
export interface SourceTrajectoryStation extends _SourceTrajectoryStation {}

/** Tubular Stablizer Component Schema. Captures dimension and operation information about stabilizers used in the tubular string. */
interface _Stabilizer extends BaseType {
  /** Unique identifier for this instance of Stabilizer. */
  uid: eml.String64;
  /** Distance of the blade bottom from the bottom of the component. */
  DistBladeBot?: eml.LengthMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Friction factor. */
  FactFric?: number;
  /** Length of the blade. */
  LenBlade?: eml.LengthMeasure;
  /** Gauge Length of the blade. That is, the length of the blade measured at the OdBladeMx. */
  LenBladeGauge?: eml.LengthMeasure;
  /** Minimum outer diameter of the blade. */
  OdBladeMn?: eml.LengthMeasure;
  /** Maximum outer diameter of the blade. */
  OdBladeMx?: eml.LengthMeasure;
  /** Blade shape. */
  ShapeBlade?: BladeShapeType;
  /** Blade type. */
  TypeBlade?: BladeType;
}
export interface Stabilizer extends _Stabilizer {}

/** Specifies the state of a drilling activity (DrillActivity). */
export type StateDetailActivity =
  | "injury"
  | "operation failed"
  | "kick"
  | "circulation loss"
  | "mud loss"
  | "stuck equipment"
  | "equipment failure"
  | "equipment hang"
  | "success";
interface _StateDetailActivity extends eml._TypeEnum {
  _: StateDetailActivity;
}

interface _StationaryGyro extends BaseType {
  AxisCombination: GyroAxisCombination;
  ExtensionNameValue?: eml.ExtensionNameValue[];
  Range: PlaneAngleOperatingRange;
}
export interface StationaryGyro extends _StationaryGyro {}

/** Provides generic attributes associated with defining an additive used for stimulation. */
interface _StimAdditive extends _StimMaterial {
  /** Additive type or function from the enumeration 'StimAdditiveKind'. */
  AdditiveKind?: StimAdditiveKind;
  /** A code used to identify the supplier of the additive. */
  SupplierCode: eml.String2000;
  /** The type of additive that is used, which can represent a suppliers description or type of AdditiveKind.  For example, 5% HCl could be the type when AdditiveKind=acid. */
  Type: eml.String2000;
}
export interface StimAdditive extends _StimAdditive {}

/** Specifies the type of stimulation additive added to the fluid used in the stim job. */
export type StimAdditiveKind =
  | "acid"
  | "activator"
  | "biocide"
  | "breaker"
  | "breaker aid"
  | "buffer"
  | "clay stabilizer"
  | "corrosion inhibitor"
  | "corrosion inhibitor aid"
  | "crosslinker"
  | "delaying agent"
  | "fibers"
  | "fluid loss additive"
  | "foamer"
  | "friction reducer"
  | "gelling agent"
  | "iron control additive"
  | "mutual solvent"
  | "salt"
  | "stabilizer"
  | "surfactant";
interface _StimAdditiveKind extends eml._TypeEnum {
  _: StimAdditiveKind;
}

/** Provides a mechanism to capture general events that occurred during a stage of a stimulation job. */
interface _StimEvent extends BaseType {
  /** Unique identifier for this instance of StimEvent. */
  uid: eml.String64;
  /** A short description of the event. */
  Comment?: eml.String2000;
  /** Date and time of this event. */
  DTim?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Event number. */
  Number: eml.PositiveLong;
  /** Step number. Use it to reference an existing job step entry. */
  NumStep?: eml.PositiveLong;
}
export interface StimEvent extends _StimEvent {}

/** A diagnostic test that determines fluid efficiency. Fluid efficiency test (FET). */
interface _StimFetTest extends BaseType {
  /** Unique identifier for this instance of StimFetTest. */
  uid: eml.String64;
  /** An analysis method used for this FET. */
  AnalysisMethod?: StimFetTestAnalysisMethod[];
  /** End time for the FET. */
  DTimEnd?: eml.TimeStamp;
  /** Start time for the FET. */
  DTimStart?: eml.TimeStamp;
  /** The end of the pressure-dependent leak-off portion of the FET. */
  EndPdlDuration?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** A measurement, derived from a data frac, of the efficiency of a particular fluid in creating fracture area on a particular formation at a set of conditions. */
  FluidEfficiency?: eml.VolumePerVolumeMeasure;
  /** The time at which the fracture effectively closes without proppant in place. */
  FractureCloseDuration?: eml.TimeMeasure;
  /** The pressure at which the fracture effectively closes without proppant in place. */
  FractureClosePres?: eml.PressureMeasure;
  /** The fracture pressure limit for an unfractured formation is the fracture initiation pressure. This is typically considered the upper bound for the minimum horizontal stress or closure pressure.
   * A step-rate test is used to determine the fracture extension pressure. */
  FractureExtensionPres?: eml.PressureMeasure;
  /** The fracture gradient. */
  FractureGradient?: eml.ForcePerVolumeMeasure;
  /** The length of the fracture tip to tip; fracture half length is the length of one wing of a fracture from the wellbore to the tip. */
  FractureLength?: eml.LengthMeasure;
  /** The width of a fracture at the wellbore. Hydraulic frac width is generated by frac fluid viscosity and/or pump rate (i.e., horsepower). */
  FractureWidth?: eml.LengthMeasure;
  /** The difference between the fracture extension pressure and the pressure that exists in the fracture. */
  NetPres?: eml.PressureMeasure;
  /** The pressure dependent leak-off coefficient. */
  PdlCoef?: eml.DimensionlessMeasure;
  /** The pressure of the liquids in the formation pores. */
  PorePres?: eml.PressureMeasure;
  /** The Horner plot is used to determine if pseudo-radial flow developed during pressure decline.
   * If a semi-log straight line is observed and the line can be extrapolated to a reasonable value of reservoir pressure, then radial or pseudo-radial flow may be affecting the decline behavior.
   * This suggests that the fracture is already closed and that data beyond the point of influence need not be considered in the evaluation of closure. */
  PseudoRadialPres?: eml.PressureMeasure;
  /** That permeability which remains after a fractured formation has closed, allowing the the formation fracture face to be pressurized before the fracture is mechanically reopened. */
  ResidualPermeability?: eml.PermeabilityRockMeasure;
}
export interface StimFetTest extends _StimFetTest {}

/** Specifies the types of stimulation FET analysis methods. */
export type StimFetTestAnalysisMethod =
  | "average"
  | "delta pressure over g-time"
  | "delta pressure over linear time"
  | "delta pressure over radial time"
  | "gdk 2-d"
  | "horner"
  | "linear"
  | "log-log"
  | "nolte"
  | "other"
  | "pdl coefficient"
  | "perkins and kern 2-d"
  | "radial 2-d"
  | "square root"
  | "third-party software";
interface _StimFetTestAnalysisMethod extends eml._TypeEnum {
  _: StimFetTestAnalysisMethod;
}

/** The fluid flow path for used when pumping a stage in a stimulation job. */
interface _StimFlowPath extends BaseType {
  /** PMax prediction allows the tool assembly to be designed with expected pressures. It determines maximum allowable surface pressure and is typically calculated as a single number by which the pressure relief valves are set. This variable is the average of all the pmax pressures calculated for this flow path. */
  AvgPmaxPacPres?: eml.PressureMeasure;
  /** Average allowable pressure for the zone of interest with respect to the bottomhole assembly during the stimulation services. */
  AvgPmaxWeaklinkPres?: eml.PressureMeasure;
  /** The pressure at which the formation broke. */
  BreakDownPres?: eml.PressureMeasure;
  /** The measured depth of a bridge plug. */
  BridgePlugMD?: eml.MeasuredDepth;
  /** The formation fracture gradient for this treatment interval. */
  FractureGradient?: eml.ForcePerVolumeMeasure;
  /** The friction factor used to compute openhole pressure loss. */
  FrictionFactorOpenHole?: eml.DimensionlessMeasure;
  /** The friction factor for the pipe, tubing, and/or casing. */
  FrictionFactorPipe?: eml.DimensionlessMeasure;
  /** The type of flow path. */
  Kind?: StimFlowPathType;
  /** PMax prediction allows the tool assembly to be designed with expected pressures. It determines maximum allowable surface pressure and is typically calculated as a single number by which the pressure relief valves are set. This variable is the maximum of all the pmax pressures calculated for this flow path. */
  MaxPmaxPacPres?: eml.PressureMeasure;
  /** Maximum allowable pressure for the zone of interest with respect to the bottomhole assembly during the stimulation services. */
  MaxPmaxWeaklinkPres?: eml.PressureMeasure;
  /** The measured depth of a packer. */
  PackerMD?: eml.MeasuredDepth;
  /** The maximum measured depth of the tubing used for treatment of a stage. */
  TubingBottomMD?: eml.MeasuredDepth;
  Tubular?: StimTubular[];
}
export interface StimFlowPath extends _StimFlowPath {}

/** Specifies the type of flow paths used in a stimulation job. */
export type StimFlowPathType =
  | "annulus"
  | "casing"
  | "drill pipe"
  | "open hole"
  | "tubing"
  | "tubing and annulus";
interface _StimFlowPathType extends eml._TypeEnum {
  _: StimFlowPathType;
}

/** The characteristics and recipe of the stimulation fluid without proppant. */
interface _StimFluid extends BaseType {
  AdditiveConcentration?: StimMaterialQuantity[];
  /** The density of the fluid. */
  Density?: eml.MassPerVolumeMeasure;
  /** The description of the fluid. */
  Description?: eml.String2000;
  /** The temperature of the fluid at surface. */
  FluidTemp?: eml.ThermodynamicTemperatureMeasure;
  /** The shear stress measured at low shear rate after a mud has set quiescently for 10 minutes. */
  GelStrength10Min?: eml.PressureMeasure;
  /** The shear stress measured at low shear rate after a mud has set quiescently for 10 seconds. */
  GelStrength10Sec?: eml.PressureMeasure;
  /** Is the fluid a kill fluid?
   * Values are "true" (or "1") and "false" (or "0"). */
  IsKillFluid?: boolean;
  /** The fluid types. */
  Kind?: StimFluidKind;
  /** The name of the fluid. */
  Name?: eml.String2000;
  /** The pH of the fluid. */
  pH?: eml.UnitlessMeasure;
  /** The purpose of the fluid. */
  Purpose?: eml.String2000;
  /** The specific gravity of the fluid at surface. */
  SpecificGravity?: eml.DimensionlessMeasure;
  /** The fluid subtypes. */
  Subtype?: StimFluidSubtype;
  /** The supplier of the fluid. */
  Supplier?: eml.String2000;
  /** Viscosity of stimulation fluid. */
  Viscosity?: eml.DynamicViscosityMeasure;
  /** Volume of fluid. */
  Volume?: eml.VolumeMeasure;
}
export interface StimFluid extends _StimFluid {}

/** Specifies the fluid type. */
export type StimFluidKind = "acid-based" | "gas" | "oil-based" | "water-based";
interface _StimFluidKind extends eml._TypeEnum {
  _: StimFluidKind;
}

/** Specifies the secondary qualifier for fluid type, e.g., acid, base, condensate, etc. */
export type StimFluidSubtype =
  | "acid"
  | "base"
  | "carbon dioxide"
  | "carbon dioxide and nitrogen"
  | "carbon dioxide and water"
  | "condensate"
  | "cross-linked gel"
  | "crude oil"
  | "diesel"
  | "foam"
  | "fracturing oil"
  | "fresh water"
  | "gelled acid"
  | "gelled condensate"
  | "gelled crude"
  | "gelled diesel"
  | "gelled oil"
  | "gelled salt water"
  | "hot condensate"
  | "hot fresh water"
  | "hot oil"
  | "hot salt water"
  | "hybrid"
  | "linear gel"
  | "liquefied petroleum gas"
  | "nitrogen"
  | "oil"
  | "other"
  | "produced water"
  | "salt water"
  | "slick water";
interface _StimFluidSubtype extends eml._TypeEnum {
  _: StimFluidSubtype;
}

/** ISO13503-2 properties. */
interface _StimISO13503_2Properties extends BaseType {
  /** Unique identifier for this instance of StimISO13503_2Properties. */
  uid: eml.String64;
  /** The density the material would have if no intra-granular porosity is present. (e.g. Boyle’s Law porosimetry). */
  AbsoluteDensity?: eml.MassPerVolumeMeasure;
  /** The solubility of a proppant in 12:3 HCl:HF for 30 minutes at 150°F is an indication of the amount of soluble materials (i.e. carbonates, feldspars, iron oxides, clays, etc) present in the proppant. */
  AcidSolubility?: eml.MassPerMassMeasure;
  /** Apparent density excludes extra-granular porosity by placing a known mass in a volume of fluid and determining how much of the fluid is displaced (Archimedes). */
  ApparentDensity?: eml.MassPerVolumeMeasure;
  /** Bulk density includes both the proppant and the porosity. This is measured by filling a known volume with dry proppant and measuring the weight. */
  BulkDensity?: eml.MassPerVolumeMeasure;
  /** Percentage of undesirable agglomerated discrete proppant particles which typically occurs more with inefficiently processed natural sand proppants as opposed to manufactured ceramic proppants. ISO 13503-2 and API RP19C limit the mass of clusters to less than 1%. */
  ClustersPercent?: eml.DimensionlessMeasure;
  CrushTestData?: ISO13503_2CrushTestData[];
  /** Crush test classification indicating the highest stress level at which a proppant generated no more than 10% crushed material rounded down to the nearest 1,000 psi during a crush test. For example, a value of 14 means ‘14K’ which is 14000 psi. */
  KValue?: number;
  /** A mass loss (gravimetric) test method applied to coated proppants only, which determines the mass of resin coating applied to a natural sand or manufactured proppant by means of thorough combustion of the flammable resin from the nonflammable proppant. Reported as a % of original mass. */
  LossOnIgnition?: eml.DimensionlessMeasure;
  /** The mean diameter of particles in a sample of proppant. */
  MeanParticleDiameter?: eml.LengthMeasure;
  /** The median diameter of particles in a sample of proppant. */
  MedianParticleDiameter?: eml.LengthMeasure;
  /** Krumbein Roundness Shape Factor that is a measure of the relative sharpness of grain corners or of grain curvature. Krumbein and Sloss (1963) are the most widely used method of determining shape factors. */
  Roundness?: number;
  SieveAnalysisData?: ISO13503_2SieveAnalysisData[];
  /** Not formally part of ISO 13503.2 properties, the specific gravity is the apparent density of the proppant divided by the density of water. */
  SpecificGravity?: number;
  /** Krumbein Sphericity Shape Factor that is a measure of how closely a proppant particle approaches the shape of a sphere. Krumbein and Sloss (1963) are the most widely used method of determining shape factors. */
  Sphericity?: number;
  /** A measure of water clarity, how much the material suspended in water decreases the passage of light through the water.
   * Unit of measure may be Nephelometric Turbidity Unit (NTU), but may vary based upon the detector geometry. */
  Turbidity?: number;
}
export interface StimISO13503_2Properties extends _StimISO13503_2Properties {}

/** A stress, conductivity, permeability, and temperature data point. */
interface _StimISO13503_5Point extends BaseType {
  /** Unique identifier for this instance of StimISO13503_5Point */
  uid: eml.String64;
  /** The conductivity under stress. */
  Conductivity: eml.PermeabilityLengthMeasure;
  /** The permeability under stress. */
  Permeability: eml.PermeabilityRockMeasure;
  /** The amount of stress applied. */
  Stress: eml.PressureMeasure;
  /** The temperature at the time measurements were taken. */
  Temperature: eml.ThermodynamicTemperatureMeasure;
}
export interface StimISO13503_5Point extends _StimISO13503_5Point {}

/** Parent object (transferrable object) for all the information about one stimulation job. A stimulation job has multiple stages, and each stage has multiple steps. */
interface _StimJob extends eml._AbstractObject {
  /** Average pressure encountered during treatment of all stages. */
  AvgJobPres?: eml.PressureMeasure;
  /** Bottomhole static temperature for the job. */
  BottomholeStaticTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** Customer or company name. */
  CustomerName: eml.String2000;
  /** Date and time at which the stimulation contractor arrives on location. */
  DTimArrival?: eml.TimeStamp;
  /** Ending date and time of the stimulation job. */
  DTimEnd?: eml.TimeStamp;
  /** Start date and time of the stimulation job. */
  DTimStart?: eml.TimeStamp;
  /** Pressure recorded on fluid returning to surface. */
  FlowBackPres?: eml.PressureMeasure;
  /** Rate recorded on fluid returning to surface. */
  FlowBackRate?: eml.VolumePerTimeMeasure;
  /** Volume recorded on fluid returning to surface. */
  FlowBackVolume?: eml.VolumeMeasure;
  /** Percentage of fluid volume in the fracture at the end of pumping. */
  FluidEfficiency?: eml.VolumePerVolumeMeasure;
  /** Hydraulic horsepower ordered for the stimulation job. */
  HhpOrdered?: eml.PowerMeasure;
  /** Hydraulic horsepower actually used for the stimulation job. */
  HhpUsed?: eml.PowerMeasure;
  /** Perforation clusters existing before starting the job. */
  JobPerforationClusters?: StimPerforationClusterSet;
  /** A stage treated during the stimulation job. */
  JobStage?: StimJobStage[];
  /** Type of well stimulation job. */
  Kind: eml.String2000;
  LogCatalog?: StimJobLogCatalog[];
  MaterialCatalog?: StimJobMaterialCatalog;
  MaterialUsed?: StimMaterialQuantity[];
  /** Maximum job fluid pumping rate encountered during treatment of all stages. */
  MaxFluidRate?: eml.VolumePerTimeMeasure;
  /** Maximum pressure encountered during the job. */
  MaxJobPres?: eml.PressureMeasure;
  /** UNSPSC (Segment 71) commodity code from the oil and gas extraction and production enhancement services family. */
  PIDXCommodityCode?: PIDXCommodityCode;
  /** Pointer to a BusinessAssociate representing the well stimulation contractor. */
  ServiceCompany: eml.DataObjectReference;
  /** Number of stages treated during the stimulation service. */
  StageCount?: eml.NonNegativeLong;
  /** Name of the service company supervisor. */
  Supervisor?: eml.String64;
  /** Total volume pumped for all stages. */
  TotalJobVolume?: eml.VolumeMeasure;
  /** The total mass of proppant placed in the formation for the entire job. */
  TotalProppantInFormation?: eml.MassMeasure;
  /** The name and amount of a proppant used during some time period in a performance enhancement job. */
  TotalProppantUsed?: eml.MassMeasure;
  /** The total pumping time. */
  TotalPumpTime?: eml.TimeMeasure;
  /** Expected or calculated bottomhole treating temperature for the job. */
  TreatingBottomholeTemperature?: eml.ThermodynamicTemperatureMeasure;
  Wellbore: eml.DataObjectReference;
}
export interface StimJob extends _StimJob {}

/** A pumping diagnostics session. */
interface _StimJobDiagnosticSession extends BaseType {
  /** Unique identifier for this instance of StimJobDiagnosticSession. */
  uid: eml.String64;
  /** Average bottomhole treatment pressure. */
  AvgBottomholeTreatmentPres?: eml.PressureMeasure;
  /** Average bottomhole treatment flow rate. */
  AvgBottomholeTreatmentRate?: eml.VolumePerTimeMeasure;
  /** Base fluid volume entering equipment. */
  BaseFluidVol?: eml.VolumeMeasure;
  /** Bottomhole hydrostatic pressure. */
  BottomholeHydrostaticPres?: eml.PressureMeasure;
  /** Static bottomhole temperature. */
  BottomholeTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The pressure at which gas begins to break out of an under saturated oil and form a free gas phase in the matrix or a gas cap. */
  BubblePointPres?: eml.PressureMeasure;
  /** The size of the choke used during a flow back test. */
  ChokeSize?: eml.LengthMeasure;
  /** A description of the session. */
  Description?: eml.String2000;
  /** The date and time when the fluid in the fracture is completely leaked off into the formation and the fracture closes on its faces. */
  DTimFractureClose?: eml.TimeStamp;
  /** The date and time pumping ended. */
  DTimPumpOff?: eml.TimeStamp;
  /** The date and time pumping began. */
  DTimPumpOn?: eml.TimeStamp;
  /** The date and time at which a well ceases flowing and the valves are closed. */
  DTimWellShutin?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The volume change of a fluid when pressure is applied. */
  FluidCompressibility?: eml.IsothermalCompressibilityMeasure;
  /** The density of the fluid. */
  FluidDensity?: eml.MassPerVolumeMeasure;
  /** A measurement, derived from a data frac, of the efficiency of a particular fluid in creating fracture area on a particular formation at a set of conditions. */
  FluidEfficiency?: eml.VolumePerVolumeMeasure;
  /** A diagnostic test determining fluid efficiency. */
  FluidEfficiencyTest?: StimFetTest[];
  /** The consistency index K is the shear stress or viscosity of the fluid at one sec-1 shear rate. An increasing K raises the effective viscosity. */
  FluidKprimeFactor?: eml.DimensionlessMeasure;
  /** Power law component. As 'n' decreases from 1, the fluid becomes more shear thinning. Reducing 'n' produces more non-Newtonian behavior. */
  FluidNprimeFactor?: eml.DimensionlessMeasure;
  /** The heat required to raise one unit mass of a substance by one degree. */
  FluidSpecificHeat?: eml.SpecificHeatCapacityMeasure;
  /** In physics, thermal conductivity is the property of a material describing its ability to conduct heat. It appears primarily in Fourier's Law for heat conduction. Thermal conductivity is measured in watts per kelvin-meter.
   * Multiplied by a temperature difference (in kelvins) and an area (in square meters), and divided by a thickness (in meters), the thermal conductivity predicts the rate of energy loss (in watts) through a piece of material. */
  FluidThermalConductivity?: eml.ThermalConductivityMeasure;
  /** Dimensional response to temperature change is expressed by its coefficient of thermal expansion.
   * When the temperature of a substance changes, the energy that is stored in the intermolecular bonds between atoms also changes. When the stored energy increases, so does the length of the molecular bonds.
   * As a result, solids typically expand in response to heating and contract on cooling.
   * The degree of expansion divided by the change in temperature is called the material's coefficient of thermal expansion and generally varies with temperature. */
  FluidThermalExpansionCoefficient?: eml.VolumetricThermalExpansionMeasure;
  /** Foam quality percentage of foam for the job during the stimulation services. */
  FoamQuality?: eml.VolumePerVolumeMeasure;
  /** The pressure when the fracture width becomes zero. */
  FractureClosePres?: eml.PressureMeasure;
  /** The pressure loss due to fluid friction with the pipe while a fluid is being pumped. */
  FrictionPres?: eml.PressureMeasure;
  /** Initial shutin pressure. */
  InitialShutinPres?: eml.PressureMeasure;
  /** The measured depth of the bottom of the hole. */
  MdBottomhole?: eml.MeasuredDepth;
  /** The measured depth of the middle perforation. */
  MdMidPerforation?: eml.MeasuredDepth;
  /** The measured depth of the wellbore to its injection point. */
  MdSurface?: eml.MeasuredDepth;
  /** The name of the session. */
  Name?: eml.String64;
  /** The number of this pumping diagnostics session. */
  Number?: eml.NonNegativeLong;
  /** The volume of the pad divided by the (volume of the pad + the volume of the proppant laden fluid). */
  PercentPad?: eml.VolumePerVolumeMeasure;
  /** The pressure of the liquids in the formation pores. */
  PorePres?: eml.PressureMeasure;
  /** The time between the shutin time and the pump on time. */
  PumpDuration?: eml.TimeMeasure;
  /** A diagnostic test involving flowing a well back after treatment. */
  PumpFlowBackTest?: StimPumpFlowBackTest[];
  /** The volume change of a reservoir material when pressure is applied. */
  ReservoirTotalCompressibility?: eml.IsothermalCompressibilityMeasure;
  /** The number of a stage associated with this diagnostics session. */
  StageNumber?: eml.NonNegativeLong;
  /** An injection test involving multiple steps of injection rate and pressure, where a curve deflection and
   * change of slope indicates the fracture breakdown pressure.
   * An injection test involving multiple steps of injection rate and pressure, where a curve deflection and
   * change of slope indicates the fracture breakdown pressure. */
  StepDownTest?: StimStepDownTest[];
  /** An injection test, plotted pressure against injection rate, where a curve deflection and
   * change of slope indicates the fracture breakdown pressure. */
  StepRateTest?: StimStepTest[];
  /** Temperature of the fluid at the surface. */
  SurfaceFluidTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The constant earth temperature at a given depth specific to a region. */
  SurfaceTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** Are the calculations corrected for temperature?
   * A value of "true" (or "1") indicates that the calculations were corrected for temperature.
   * A value of "false" (or "0") or not given indicates otherwise. */
  TemperatureCorrectionApplied?: boolean;
  /** The true vertical depth of the middle perforation. */
  TvdMidPerforation?: eml.AbstractVerticalDepth;
  /** The volume of fluid in the wellbore. */
  WellboreVolume?: eml.VolumeMeasure;
}
export interface StimJobDiagnosticSession extends _StimJobDiagnosticSession {}

/** Captures the high-level description of the diversion method used in the stimulation job. */
interface _StimJobDiversion extends BaseType {
  /** Pointer to a BusinessAssociate representing the diversion contractor. */
  Contractor?: eml.DataObjectReference;
  /** Spacing between packer elements. */
  ElementSpacing?: eml.LengthMeasure;
  /** The diversion method used. */
  Method?: StimJobDiversionMethod;
  /** A supplier description of the diversion tool, such as its commercial name. */
  ToolDescription?: eml.String2000;
}
export interface StimJobDiversion extends _StimJobDiversion {}

/** Specifies the type of diversion used during a stimulation job. */
export type StimJobDiversionMethod =
  | "ball sealer"
  | "bands"
  | "chemical"
  | "fibers"
  | "other"
  | "packer"
  | "solid particle"
  | "straddle packer";
interface _StimJobDiversionMethod extends eml._TypeEnum {
  _: StimJobDiversionMethod;
}

/** A group of logs from a stimulation job, one log per stage. */
interface _StimJobLogCatalog extends BaseType {
  JobLog: eml.DataObjectReference[];
}
export interface StimJobLogCatalog extends _StimJobLogCatalog {}

/** A listing of materials for a particular job. Any stage of the stim job can reference material(s) in the catalog, which eliminates the need to repeat the materials for each stage. */
interface _StimJobMaterialCatalog extends BaseType {
  /** List of additives in the catalog. */
  Additives?: StimAdditive[];
  /** List of proppant agents in the catalog. */
  ProppantAgents?: StimProppantAgent[];
}
export interface StimJobMaterialCatalog extends _StimJobMaterialCatalog {}

/** Stage treated during a stimulation job. */
interface _StimJobStage extends eml._AbstractObject {
  /** Unique identifier for this instance of StimJobStage. */
  uid: eml.String64;
  /** Average base fluid pumping rate of all steps for stage treatment. */
  AvgBaseFluidReturnVolumeRate?: eml.VolumePerTimeMeasure;
  /** The average static temperature of the wellbore injection point(s) or formation at equilibrium (steady state) with no fluid or tool movement, allowing for equilibrium conditions at the wellbore injection point; (BHST: bottom hole static temperature. */
  AvgBHStaticTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** The average measured or calculated temperature of the wellbore during the treating with well fluid injection or circulation of the wellbore at the point of interest. Point of interest is generally the injection point or region of interest for the test or treatment. */
  AvgBHTreatingTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** Average bottomhole treatment flow rate. */
  AvgBottomholePumpedVolumeRate?: eml.VolumePerTimeMeasure;
  /** Average conductivity of a fracture created during the treatment supported by proppant during the stimulation services Hydraulic conductivity, symbolically represented as K, is a property of vascular plants, soil or rock, that describes the ease with which water can move through pore spaces or fractures. It depends on the intrinsic permeability of the material and on the degree of saturation. Saturated hydraulic conductivity, Ksat, describes water movement through saturated media. */
  AvgConductivity?: eml.LengthPerTimeMeasure;
  /** Average fracture width created during the treatment of the stage. */
  AvgFractureWidth?: eml.LengthMeasure;
  /** Average hydraulic horse power used. */
  AvgHydraulicPower?: eml.PowerMeasure;
  /** The average annulus pressure for any step for the stage treatment. */
  AvgPresAnnulus?: eml.PressureMeasure;
  /** The average casing pressure of any step for the stage treatment. */
  AvgPresCasing?: eml.PressureMeasure;
  /** The average pressure for treating the stage across all steps. */
  AvgPresSurface?: eml.PressureMeasure;
  /** The average tubing pressure of any step for the stage treatment. */
  AvgPresTubing?: eml.PressureMeasure;
  /** The average proppant concentration at the bottom of the hole. */
  AvgProppantConcBottomhole?: eml.MassPerVolumeMeasure;
  /** The average proppant concentration on the surface. */
  AvgProppantConcSurface?: eml.MassPerVolumeMeasure;
  /** The average slurry return rate of all steps for the stage treatment. */
  AvgSlurryReturnVolumeRate?: eml.VolumePerTimeMeasure;
  /** The pressure at which the formation fractures and accepts injected fluid. */
  BreakDownPres?: eml.PressureMeasure;
  /** Delta time recorded for the closure of the fracture to occur during the stage treatment. */
  ClosureDuration?: eml.TimeMeasure;
  /** An analysis parameter used in hydraulic fracture design to indicate the pressure at which the fracture effectively closes without proppant in place. */
  ClosurePres?: eml.PressureMeasure;
  Diversion?: StimJobDiversion;
  /** Ending date and time for the stage treatment. */
  DTimEnd?: eml.TimeStamp;
  /** Starting date and time for the stage treatment. */
  DTimStart?: eml.TimeStamp;
  FlowPath?: StimFlowPath;
  /** The length of formation broken per day. */
  FormationBreakLengthPerDay?: eml.LengthMeasure;
  /** The name of the formation being stimulated. */
  FormationName?: eml.String2000;
  /** The weight of proppant placed in the formation. */
  FormationProppantMass?: eml.MassMeasure;
  /** The formation fracture gradient for the stage after treatment. */
  FractureGradientFinal?: eml.ForcePerVolumeMeasure;
  /** The formation fracture gradient for stage before treatment. */
  FractureGradientInitial?: eml.ForcePerVolumeMeasure;
  /** The height of the fracture. */
  FractureHeight?: eml.LengthMeasure;
  /** The length of the fracture created after treating the stage. */
  FractureLength?: eml.LengthMeasure;
  /** Friction pressure loss. */
  FrictionPressure?: eml.PressureMeasure;
  /** Carbon dioxide hydraulic horsepower ordered for the stage. */
  HhpOrderedCO2?: eml.PowerMeasure;
  /** Fluid hydraulic horsepower ordered for the stage. */
  HhpOrderedFluid?: eml.PowerMeasure;
  /** Carbon dioxide hydraulic horsepower actually used for the stage. */
  HhpUsedCO2?: eml.PowerMeasure;
  /** Fluid hydraulic horsepower actually used for the stage. */
  HhpUsedFluid?: eml.PowerMeasure;
  /** The initial shut-in pressure. */
  InitialShutinPres?: eml.PressureMeasureExt;
  JobEvent?: StimEvent[];
  JobStep?: StimJobStep[];
  MaterialUsed?: StimMaterialQuantity[];
  /** Maximum annulus fluid pumping rate of any step while treating the stage. */
  MaxFluidVolumeRateAnnulus?: eml.VolumePerTimeMeasure;
  /** Maximum casing fluid pumping rate of any step while treating the stage. */
  MaxFluidVolumeRateCasing?: eml.VolumePerTimeMeasure;
  /** Maximum tubing fluid pumping rate of any step while treating the stage. */
  MaxFluidVolumeRateTubing?: eml.VolumePerTimeMeasure;
  /** Maximum hydraulic horse power used for the stage. */
  MaxHydraulicPower?: eml.PowerMeasure;
  MaxMaterialUsageRate?: StimMaterialQuantity[];
  /** The highest annulus pressure of any step while treating the stage. */
  MaxPresAnnulus?: eml.PressureMeasure;
  /** The highest casing pressure of any step while treating the stage. */
  MaxPresCasing?: eml.PressureMeasure;
  /** Maximum surface pressure during treatment of the stage. */
  MaxPresSurface?: eml.PressureMeasure;
  /** The highest tubing pressure of any step while treating the stage. */
  MaxPresTubing?: eml.PressureMeasure;
  /** The maximum proppant concentration at the bottom of the wellbore. */
  MaxProppantConcBottomhole?: eml.MassPerVolumeMeasure;
  /** The maximum proppant concentration on the surface. */
  MaxProppantConcSurface?: eml.MassPerVolumeMeasure;
  /** Measured depth of the bottom of the formation. */
  MdFormationBottom?: eml.MeasuredDepth;
  /** Measured depth of the top of the formation. */
  MdFormationTop?: eml.MeasuredDepth;
  /** Measured depth of the bottom open hole. */
  MdOpenHoleBottom?: eml.MeasuredDepth;
  /** Measured depth of the top open hole. */
  MdOpenHoleTop?: eml.MeasuredDepth;
  /** The difference between the pressure which holds a fracture closed (minimal principal stress) and that pressure which is necessary to open the fracture. */
  NetPres?: eml.PressureMeasure;
  /** The number associated with the stage. */
  Number?: eml.PositiveLong;
  /** The diameter of the open hole. */
  OpenHoleDiameter?: eml.LengthMeasure;
  /** A name for the open hole. To be used for open hole completions. */
  OpenHoleName?: eml.String2000;
  PdatSession?: StimJobDiagnosticSession[];
  /** The percentage of volume pumped used for the pad. */
  PercentPad?: eml.VolumePerVolumeMeasure;
  /** Total proppant mass used as a percent of the design mass. */
  PercentProppantPumped?: eml.VolumePerVolumeMeasure;
  /** Total number of perforation balls used while treating the stage. */
  PerfBallCount?: eml.NonNegativeLong;
  /** The size of the perforation balls used while treating the stage */
  PerfBallSize?: eml.LengthMeasure;
  /** The proppant concentration at the perforations. */
  PerfProppantConc?: eml.MassPerVolumeMeasure;
  /** The proppant height. */
  ProppantHeight?: eml.LengthMeasure;
  ReservoirInterval?: StimReservoirInterval[];
  /** Did screen out occur? True ("true" or "1") indicates that screen out occurred. False ("false" or "0") or not given indicates otherwise. */
  ScreenedOut?: boolean;
  /** The screen out pressure. */
  ScreenOutPres?: eml.PressureMeasure;
  ShutInPres?: StimShutInPressure[];
  /** Perforations added just before treating the stage. */
  StagePerforationClusters?: StimPerforationClusterSet;
  StimStageLog?: eml.DataObjectReference[];
  /** Text describing the technology used while pumping the stage. */
  TechnologyType?: eml.String64;
  /** The total amount of proppant in the formation relative to the current stage. */
  TotalProppantInFormation?: eml.MassMeasure;
  /** The total pumping time for the treatment of the stage. */
  TotalPumpTime?: eml.TimeMeasure;
  /** The total volume pumped for all steps while treating the stage. */
  TotalVolume?: eml.VolumeMeasure;
  /** True vertical depth of the bottom of the formation. */
  TvdFormationBottom?: eml.AbstractVerticalDepth;
  /** True vertical depth of the top of the formation. */
  TvdFormationTop?: eml.AbstractVerticalDepth;
  /** True vertical depth of the bottom open hole. */
  TvdOpenHoleBottom?: eml.AbstractVerticalDepth;
  /** True vertical depth of the top open hole. */
  TvdOpenHoleTop?: eml.AbstractVerticalDepth;
  /** The volume pumped for the body portion of the stage treatment. */
  VolumeBody?: eml.VolumeMeasure;
  /** Volume pumped during flush portion of stage treatment. */
  VolumeFlush?: eml.VolumeMeasure;
  /** Volume pumped for pad portion of stage treatment. */
  VolumePad?: eml.VolumeMeasure;
  /** Water source for fluid pumped during stage. */
  WaterSource?: eml.String2000;
  /** The weight of proppant left in the wellbore after pumping has stopped. */
  WellboreProppantMass?: eml.MassMeasure;
}
export interface StimJobStage extends _StimJobStage {}

/** A step in the treatment of a stage for a stimulation job. */
interface _StimJobStep extends BaseType {
  /** Unique identifier for this instance of StimJobStep. */
  uid: eml.String64;
  /** Base quality percentage of foam. */
  AvgBaseFluidQuality?: eml.VolumePerVolumeMeasure;
  /** Base quality carbon dioxide percent of foam. */
  AvgCO2BaseFluidQuality?: eml.VolumePerVolumeMeasure;
  /** Average hydraulic horse power used. */
  AvgHydraulicPower?: eml.PowerMeasure;
  /** Internal gas phase percentage of the foam. */
  AvgInternalPhaseFraction?: eml.VolumePerVolumeMeasure;
  /** Average material used per minute entering the flow stream. */
  AvgMaterialUsedRate?: StimMaterialQuantity[];
  /** Average material amount used (pumped) per minute at bottomhole. */
  AvgMaterialUseRateBottomhole?: StimMaterialQuantity[];
  /** Base quality nitrogen percentage of foam. */
  AvgN2BaseFluidQuality?: eml.VolumePerVolumeMeasure;
  /** Average bottomhole pressure. */
  AvgPresBottomhole?: eml.PressureMeasure;
  /** Average surface pressure. */
  AvgPresSurface?: eml.PressureMeasure;
  /** Average proppant concentration at the wellhead.
   *
   * ppa: pounds proppant added per volume measure
   * kgpa: kilograms proppant added per volume measure */
  AvgPropConc?: eml.MassPerVolumeMeasure;
  /** The average proppant concentration at bottomhole. */
  AvgProppantConcBottomhole?: eml.MassPerVolumeMeasure;
  /** The average proppant concentration at the surface. */
  AvgProppantConcSurface?: eml.MassPerVolumeMeasure;
  /** Average proppant concentration exiting the equipment. */
  AvgSlurryPropConc?: eml.MassPerVolumeMeasure;
  /** Average slurry return rate. */
  AvgSlurryRate?: eml.VolumePerTimeMeasure;
  /** Average fluid temperature. */
  AvgTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** Average volume per minute at the wellhead. */
  AvgVolumeRateWellhead?: eml.VolumePerTimeMeasure;
  /** Balls recovered during execution of the step. */
  BallsRecovered?: eml.NonNegativeLong;
  /** Balls used during execution of the step. */
  BallsUsed?: eml.NonNegativeLong;
  /** Base fluid volume recorded after equipment set to bypass. */
  BaseFluidBypassVol?: eml.VolumeMeasure;
  /** Base fluid volume entering the equipment. */
  BaseFluidVol?: eml.VolumeMeasure;
  /** A short description of the step. */
  Description?: eml.String2000;
  /** Date and time the step ended. */
  DTimEnd?: eml.TimeStamp;
  /** Date and time the step started. */
  DTimStart?: eml.TimeStamp;
  /** Ending dirty fluid pump volume per minute. */
  EndDirtyMaterialRate?: eml.VolumePerTimeMeasure;
  /** Ending quantity of material used per minute entering the flow stream. */
  EndMaterialUsedRate?: StimMaterialQuantity[];
  /** Ending quantity of material used per minute at bottomhole. */
  EndMaterialUsedRateBottomhole?: StimMaterialQuantity[];
  /** Final bottomhole pressure. */
  EndPresBottomhole?: eml.PressureMeasure;
  /** Final surface pressure. */
  EndPresSurface?: eml.PressureMeasure;
  /** The final proppant concentration at bottomhole. */
  EndProppantConcBottomhole?: eml.MassPerVolumeMeasure;
  /** The final proppant concentration at the surface. */
  EndProppantConcSurface?: eml.MassPerVolumeMeasure;
  /** Final CO2 pump rate in volume per time at the surface. */
  EndRateSurfaceCO2?: eml.VolumePerTimeMeasure;
  /** Final nitrogen pump rate in volume per time at the surface. */
  EndStdRateSurfaceN2?: eml.VolumePerTimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  Fluid?: StimFluid;
  /** The step volume of the base step. */
  FluidVolBase?: eml.VolumeMeasure;
  /** Fluid volume circulated. */
  FluidVolCirculated?: eml.VolumeMeasure;
  /** Fluid volume pumped. */
  FluidVolPumped?: eml.VolumeMeasure;
  /** Fluid volume returned. */
  FluidVolReturned?: eml.VolumeMeasure;
  /** The volume of the slurry (dirty) step. */
  FluidVolSlurry?: eml.VolumeMeasure;
  /** Fluid volume squeezed. */
  FluidVolSqueezed?: eml.VolumeMeasure;
  /** Fluid volume washed. */
  FluidVolWashed?: eml.VolumeMeasure;
  /** The fracture gradient when the step ends. */
  FractureGradientFinal?: eml.ForcePerVolumeMeasure;
  /** The fracture gradient before starting the step. */
  FractureGradientInitial?: eml.ForcePerVolumeMeasure;
  /** Numeric value used to scale a calculated rheological friction. */
  FrictionFactor?: eml.DimensionlessMeasure;
  /** The type of step. */
  Kind?: eml.String2000;
  /** Material used during the step */
  MaterialUsed?: StimMaterialQuantity[];
  /** Maximum hydraulic power used during the step. */
  MaxHydraulicPower?: eml.PowerMeasure;
  MaxMaterialUsedRate?: StimMaterialQuantity[];
  /** Maximum pumping pressure on surface. */
  MaxPresSurface?: eml.PressureMeasure;
  /** Maximum proppant concentration at bottomhole during the stimulation step. */
  MaxProppantConcBottomhole?: eml.MassPerVolumeMeasure;
  /** Maximum proppant concentration at the wellhead. */
  MaxProppantConcSurface?: eml.MassPerVolumeMeasure;
  /** Maximum proppant concentration exiting the equipment. */
  MaxSlurryPropConc?: eml.MassPerVolumeMeasure;
  /** Maximum volume per minute at the wellhead. */
  MaxVolumeRateWellhead?: eml.VolumePerTimeMeasure;
  /** The friction pressure contribution from pipes. */
  PipeFrictionPressure?: eml.PressureMeasure;
  /** Total pumping time for the step. */
  PumpTime?: eml.TimeMeasure;
  /** Starting dirty fluid volume per minute. */
  StartDirtyMaterialRate?: eml.VolumePerTimeMeasure;
  /** Starting quantity of material used per minute entering the flow stream. */
  StartMaterialUsedRate?: StimMaterialQuantity[];
  /** Starting quantity of material used per minute at bottomhole. */
  StartMaterialUsedRateBottomHole?: StimMaterialQuantity[];
  /** Starting bottomhole pressure. */
  StartPresBottomhole?: eml.PressureMeasure;
  /** Starting surface pressure. */
  StartPresSurface?: eml.PressureMeasure;
  /** The beginning proppant concentration at bottomhole. */
  StartProppantConcBottomhole?: eml.MassPerVolumeMeasure;
  /** The beginning proppant concentration at the surface. */
  StartProppantConcSurface?: eml.MassPerVolumeMeasure;
  /** A human readable name for the step. */
  StepName?: eml.String2000;
  /** Step number. */
  StepNumber: eml.PositiveLong;
  /** Slurry volume entering the well. */
  WellheadVol?: eml.VolumeMeasure;
}
export interface StimJobStep extends _StimJobStep {}

/** Materials as a concept refers to the materials left in the well or consumed in the process of making the stimulation; it does not refer the carrier fluid. */
interface _StimMaterial extends BaseType {
  /** Unique identifier for this instance of StimMaterial. */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The material kind. */
  Kind?: StimMaterialKind;
  /** The name of the material. */
  Name?: eml.String2000;
  /** The name of the material supplier. */
  Supplier?: eml.String2000;
}
export interface StimMaterial extends _StimMaterial {}

/** Specifies the type of stimulation material. */
export type StimMaterialKind =
  | "additive"
  | "brine"
  | "CO2"
  | "gel"
  | "N2"
  | "other"
  | "proppant agent"
  | "water";
interface _StimMaterialKind extends eml._TypeEnum {
  _: StimMaterialKind;
}

/** Stimulation material used. */
interface _StimMaterialQuantity extends BaseType {
  /** Unique identifier for this instance of StimMaterialQuantity */
  uid: eml.String64;
  /** The density of material used. */
  Density?: eml.MassPerVolumeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The mass of material used.  This should be used without specifying any of the other material measures (e.g. volume, standard volume, etc.). */
  Mass?: eml.MassMeasure;
  /** Rate at which mass of material is flowing. */
  MassFlowRate?: eml.MassPerTimeMeasure;
  /** This is a reference to the UID of the StimMaterial in the StimJobMaterialCatalog. */
  Material: eml.ComponentReference;
  /** The standard volume of material used. Standard volume is the volume measured under the same conditions. This should be used without specifying any of the other material measures (e.g., mass, volume, etc.). */
  StdVolume?: eml.VolumeMeasure;
  /** The volume of material used.  This should be used without specifying any of the other material measures (e.g. mass, standard volume, etc.). */
  Volume?: eml.VolumeMeasure;
  /** The volume per volume measure of material used.  This should be used without specifying any of the other material measures (e.g. mass, density, standard volume, etc.). */
  VolumeConcentration?: eml.VolumePerVolumeMeasure;
  /** Rate at which the volume of material is flowing. */
  VolumetricFlowRate?: eml.VolumePerTimeMeasure;
}
export interface StimMaterialQuantity extends _StimMaterialQuantity {}

/** Information about a set of perforations.  The assumption is that all perforations within a given set are created with the same device or method. */
interface _StimPerforationCluster extends eml._AbstractObject {
  /** The number of perforation holes per length across the treatment interval.
   * Used to describe but not limited to the configuration of perforating guns or the placement of perforations (holes, slots, openings, etc.) in the wellbore, and is often abbreviated to spf (shots per foot). */
  DensityPerforation?: eml.ReciprocalLengthMeasure;
  /** A coefficient used in the equation for calculation of pressure drop across a perforation set. */
  DischargeCoefficient?: number;
  /** The friction factor of each perforation set. */
  FrictionFactor?: number;
  /** The friction pressure for the perforation set. */
  FrictionPres?: eml.PressureMeasure;
  /** Measured depths of the top and base perforation. */
  MdPerforatedInterval?: eml.MdInterval;
  /** The number of perforations in this interval. */
  PerforationCount?: eml.NonNegativeLong;
  /** The radial distribution of successive perforations around the wellbore axis.
   * Radial distribution is commonly available in 0, 180 120, 90 and 60 degree phasing. */
  PhasingPerforation?: eml.PlaneAngleMeasure;
  /** The size of the perforations. */
  Size?: eml.LengthMeasure;
  /** True vertical depth of the top and base perforation. */
  TvdPerforatedInterval?: eml.AbstractTvdInterval;
  /** The type of perforation and/or how the perforation was created. */
  Type?: eml.String64;
}
export interface StimPerforationCluster extends _StimPerforationCluster {}

/** Provides mechanism for combining perforation clusters into a group. This could be used to specify the set of existing perforations present in a well before starting a stimulation job, for example, for a re-frac job. */
interface _StimPerforationClusterSet extends BaseType {
  StimPerforationCluster: StimPerforationCluster[];
}
export interface StimPerforationClusterSet extends _StimPerforationClusterSet {}

/** In an injection step test, the injection rate at a particular pressure. */
interface _StimPressureFlowRate extends BaseType {
  /** Unique identifier for this instance of StimPressureFlowRate. */
  uid: eml.String64;
  /** The flow of the fluid at the bottomhole. */
  BottomholeRate?: eml.VolumePerTimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The pressure of the step test. */
  Pressure?: eml.PressureMeasure;
}
export interface StimPressureFlowRate extends _StimPressureFlowRate {}

/** Captures a description of a proppant used in a stimulation job. */
interface _StimProppantAgent extends _StimMaterial {
  /** Laminar flow friction coefficient. */
  FrictionCoefficientLaminar?: number;
  /** Turbulent flow friction coefficient. */
  FrictionCoefficientTurbulent?: number;
  ISO13503_2Properties?: StimISO13503_2Properties[];
  ISO13503_5Point?: StimISO13503_5Point[];
  /** Characterizes how easily radiation passes through a material. This can be used to compute the concentration of proppant in a slurry using a densitometer. */
  MassAbsorptionCoefficient?: eml.AreaPerMassMeasure;
  /** High value of sieve mesh size: for 40/70 sand, this value is 70. */
  MeshSizeHigh?: eml.NonNegativeLong;
  /** Low value of sieve mesh size: for 40/70 sand, this value is 40. */
  MeshSizeLow?: eml.NonNegativeLong;
  /** Proppant type or function. */
  ProppantAgentKind?: ProppantAgentKind;
  /** The unconfined compressive strength of the proppant. */
  UnconfinedCompressiveStrength?: eml.PressureMeasure;
}
export interface StimProppantAgent extends _StimProppantAgent {}

/** Diagnostic test involving flowing a well back after treatment. */
interface _StimPumpFlowBackTest extends BaseType {
  /** Unique identifier for this instance of StimPumpFlowBackTest. */
  uid: eml.String64;
  /** End time for the test. */
  DTimEnd?: eml.TimeStamp;
  /** Start time for the test. */
  DTimStart?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Total volume recovered during a flow back test. */
  FlowBackVolume?: eml.VolumeMeasure;
  /** The time required for the fracture width to become zero. */
  FractureCloseDuration?: eml.TimeMeasure;
  /** The pressure when the fracture width becomes zero. */
  FractureClosePres?: eml.PressureMeasure;
  /** Casing pressure. */
  PresCasing?: eml.PressureMeasure;
  /** Tubing pressure. */
  PresTubing?: eml.PressureMeasure;
  Step?: StimPumpFlowBackTestStep[];
}
export interface StimPumpFlowBackTest extends _StimPumpFlowBackTest {}

/** In a step-down pump diagnostics test, this object contains all the data for a particular step in that test. */
interface _StimPumpFlowBackTestStep extends BaseType {
  /** Unique identifier for this instance of StimPumpFlowBackTestStep. */
  uid: eml.String64;
  /** Bottomhole flow rate for the specific step. */
  BottomholeRate?: eml.VolumePerTimeMeasure;
  /** Time stamp of the pressure measurement. */
  DTim?: eml.TimeStamp;
  /** Calculated entry friction accounting for perforation and near wellbore restrictions for the specific step. */
  EntryFriction?: eml.PressureMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Volume of flowback since the start of the test. */
  FlowbackVolume?: eml.VolumeMeasure;
  /** Flowback rate. */
  FlowbackVolumeRate?: eml.VolumePerTimeMeasure;
  /** Calculated near-wellbore friction loss. */
  NearWellboreFriction?: eml.PressureMeasure;
  /** The number of the step. Identifies the step within the step down test. */
  Number: eml.NonNegativeLong;
  /** Calculated perforation friction for the specific step. */
  PerfFriction?: eml.PressureMeasure;
  /** Calculated pipe friction for the specific step. */
  PipeFriction?: eml.PressureMeasure;
  /** Surface pressure measured for the specific step. */
  Pres?: eml.PressureMeasure;
  /** Surface rate entering the well for the specific step. */
  SurfaceRate?: eml.VolumePerTimeMeasure;
}
export interface StimPumpFlowBackTestStep extends _StimPumpFlowBackTestStep {}

/** Description of a reservoir interval. */
interface _StimReservoirInterval extends BaseType {
  /** Unique identifier for this instance of StimReservoirInterval */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Permeability of the formation. */
  FormationPermeability?: eml.PermeabilityRockMeasure;
  /** Porosity of the formation. */
  FormationPorosity?: eml.VolumePerVolumeMeasure;
  /** Measured depth of the bottom of the formation. */
  GrossPayMdInterval?: eml.MdInterval;
  /** The total thickness of the interval being treated, whether or not it is productive. */
  GrossPayThickness?: eml.LengthMeasure;
  /** Formation permeability, a measurement of the ability of a fluid to flow through a rock. Commonly measured in milliDarcys (1m2 = 0.000000000000986923 Darcy). */
  LithFormationPermeability?: eml.PermeabilityRockMeasure;
  /** Lithology measured depth interval. */
  LithMdInterval?: eml.MdInterval;
  /** A name for the formation lithology. */
  LithName?: eml.String2000;
  /** Net pay is computed. It is the thickness of rock that can deliver hydrocarbons to the wellbore formation. */
  LithNetPayThickness?: eml.LengthMeasure;
  /** The ratio of the relative contraction strain, or transverse strain (normal to the applied load), divided by the relative extension strain, or axial strain (in the direction of the applied load). */
  LithPoissonsRatio?: eml.DimensionlessMeasure;
  /** Refers to the pressure of fluids held within a soil or rock, in gaps between particles’ formation porosity. */
  LithPorePres?: eml.PressureMeasure;
  /** Young's modulus (E) is a measure of the stiffness of an isotropic elastic material. It is also known as the Young modulus, modulus of elasticity, elastic modulus (though Young's modulus is actually one  of several elastic moduli such as the bulk modulus and the shear modulus) or tensile modulus. It is  defined as the ratio of the uniaxial stress over the uniaxial strain. */
  LithYoungsModulus?: eml.PressureMeasure;
  /** Name of the formation. */
  NameFormation?: eml.String2000;
  /** The volume change of the fluid in the net pay when pressure is applied. */
  NetPayFluidCompressibility?: eml.IsothermalCompressibilityMeasure;
  /** With respect to the net pay, a measurement of the internal resistance of a fluid to flow against itself. Expressed as the ratio of shear stress to shear rate. */
  NetPayFluidViscosity?: eml.DynamicViscosityMeasure;
  /** The permeability of the net pay of the formation. */
  NetPayFormationPermeability?: eml.PermeabilityRockMeasure;
  /** The porosity of the net pay formation. */
  NetPayFormationPorosity?: eml.VolumePerVolumeMeasure;
  /** The name used for the net pay zone. */
  NetPayName?: eml.String2000;
  /** The pore pressure of the net pay. */
  NetPayPorePres?: eml.PressureMeasure;
  /** The thickness of the most productive part of the interval. Net pay is a subset of the gross. */
  NetPayThickness?: eml.LengthMeasure;
}
export interface StimReservoirInterval extends _StimReservoirInterval {}

/** A pressure measurement taken at a certain time after the well has been shut in. */
interface _StimShutInPressure extends BaseType {
  /** Unique identifier for this instance of StimShutInPressure. */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The shut-in pressure. */
  Pressure: eml.PressureMeasure;
  /** The time span after shut in at which the pressure was measured. */
  TimeAfterShutin: eml.TimeMeasure;
}
export interface StimShutInPressure extends _StimShutInPressure {}

/** Diagnostic test involving flowing a well back after treatment. */
interface _StimStepDownTest extends BaseType {
  /** Unique identifier for this instance of StimStepDownTest */
  uid: eml.String64;
  /** The density of the fluid at the bottom of the hole adjusting for bottomhole temperature and pressure during the step-down test. */
  BottomholeFluidDensity?: eml.MassPerVolumeMeasure;
  /** Diameter of the injection point or perforation. */
  DiameterEntryHole?: eml.LengthMeasure;
  /** A coefficient used in the equation for calculation of the pressure drop across a perforation set. */
  DischargeCoefficient?: eml.DimensionlessMeasure;
  /** The number of perforations in the interval being tested that are  calculated to be open to injection, which is determined during the step-down test. */
  EffectivePerfs?: eml.NonNegativeLong;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The initial shutin pressure. */
  InitialShutinPres?: eml.PressureMeasure;
  /** The number of perforations in the interval being tested. */
  PerforationCount?: eml.NonNegativeLong;
  /** The data related to a particular step in the step-down test. */
  Step?: StimPumpFlowBackTestStep[];
}
export interface StimStepDownTest extends _StimStepDownTest {}

/** An injection test, plotted pressure against injection rate, where a curve deflection and change of slope indicates the fracture breakdown pressure. */
interface _StimStepTest extends BaseType {
  /** Unique identifier for this instance of StimStepTest. */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The pressure necessary to extend the fracture once initiated.
   * The fracture extension pressure may rise slightly with increasing fracture length and/or height because of friction pressure drop down the length of the fracture. */
  FractureExtensionPres?: eml.PressureMeasure;
  /** A pressure and fluid rate data reading. */
  PresMeasurement?: StimPressureFlowRate[];
}
export interface StimStepTest extends _StimStepTest {}

/** In a production enhancement job, this item constitutes the data for a tubular in the hole. */
interface _StimTubular extends BaseType {
  /** Unique identifier for this instance of StimTubular. */
  uid: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The inside diameter of the tubular used. */
  Id?: eml.LengthMeasure;
  /** The outside diameter of the tubular used. */
  Od?: eml.LengthMeasure;
  /** Measured depth interval over which the tubular was used. */
  TubularMdInterval?: eml.MdInterval;
  /** True vertical depth interval over which the tubular was used. */
  TubularTvdInterval?: eml.AbstractTvdInterval;
  /** The type of tubular (e.g., casing, tubing, liner, packer, open hole, other). */
  Type?: eml.String64;
  /** The volume per length of the tubular. */
  VolumeFactor?: eml.VolumePerLengthMeasure;
  /** The weight per length of the tubular. */
  Weight?: eml.MassPerLengthMeasure;
}
export interface StimTubular extends _StimTubular {}

/** Captures information about corrections applied to a trajectory station. */
interface _StnTrajCorUsed extends BaseType {
  /** Offset relative to the bit. */
  DirSensorOffset?: eml.LengthMeasure;
  /** Calculated gravitational field strength correction. */
  GravAxialAccelCor?: eml.LinearAccelerationMeasure;
  /** The correction applied to a cross-axial (direction 1) component of the Earth's gravitational field. */
  GravTran1AccelCor?: eml.LinearAccelerationMeasure;
  /** The correction applied to a cross-axial (direction 2) component of the Earth's gravitational field. */
  GravTran2AccelCor?: eml.LinearAccelerationMeasure;
  /** Axial magnetic drill string correction. */
  MagAxialDrlstrCor?: eml.MagneticFluxDensityMeasure;
  /** Axial magnetic correction due to a multi-station analysis process. */
  MagAxialMSACor?: eml.MagneticFluxDensityMeasure;
  /** Cross-axial (direction 1) magnetic correction. */
  MagTran1DrlstrCor?: eml.MagneticFluxDensityMeasure;
  /** Cross-axial (direction 1) magnetic correction due to a multi-station analysis process. */
  MagTran1MSACor?: eml.MagneticFluxDensityMeasure;
  /** Cross-axial (direction 2) magnetic correction. */
  MagTran2DrlstrCor?: eml.MagneticFluxDensityMeasure;
  /** Cross-axial (direction 2) magnetic correction due to a multi-station analysis process. */
  MagTran2MSACor?: eml.MagneticFluxDensityMeasure;
  /** Calculated cosag correction to the azimuth. */
  SagAziCor?: eml.PlaneAngleMeasure;
  /** Calculated sag correction to the inclination. */
  SagIncCor?: eml.PlaneAngleMeasure;
  /** The angle  used to correct a true north referenced azimuth to a grid north azimuth. WITSML follows the Gauss-Bomford convention in which convergence angles are measured positive clockwise from true north to grid north (or negative in the anti-clockwise direction). To convert a true north referenced azimuth to a grid north azimuth, the convergence angle must be subtracted from true north. If this value is not provided, then GridConUsed applies to all grid-north referenced stations. */
  StnGridConUsed?: eml.PlaneAngleMeasure;
  /** A multiplier to change geodetic distances based on the Earth model (ellipsoid) to distances on the grid plane.
   *
   * This is the number which was already used to correct lateral distances. Provide it only if it is used in your trajectory stations.
   *
   * If StnGridScaleFactorUsed is not provided, then the value in the parent Trajectory applies to all trajectory stations.
   *
   * The grid scale factor applies to the DispEw, DispNs and Closure elements on trajectory stations. */
  StnGridScaleFactorUsed?: eml.LengthPerLengthMeasure;
  /** Magnetic declination used to correct a Magnetic North referenced azimuth
   * to a True North azimuth.  Magnetic declination angles are measured positive clockwise
   * from True North to Magnetic North (or negative in the anti-clockwise direction).
   * To convert a Magnetic azimuth to a True North azimuth, the magnetic declination should be added. */
  StnMagDeclUsed?: eml.PlaneAngleMeasure;
}
export interface StnTrajCorUsed extends _StnTrajCorUsed {}

/** Captures validation information for a covariance matrix. */
interface _StnTrajMatrixCov extends BaseType {
  /** Bias east. */
  BiasE: eml.LengthMeasure;
  /** Bias north. */
  BiasN: eml.LengthMeasure;
  /** Bias vertical. The coordinate system is set up in a right-handed configuration, which makes the vertical direction increasing (i.e., positive) downwards. */
  BiasVert: eml.LengthMeasure;
  /** The sigma which is appropriate for all the other values in this class. */
  Sigma: number;
  /** Covariance east east. */
  VarianceEE: eml.AreaMeasure;
  /** Crossvariance east vertical. */
  VarianceEVert: eml.AreaMeasure;
  /** Crossvariance north east. */
  VarianceNE: eml.AreaMeasure;
  /** Covariance north north. */
  VarianceNN: eml.AreaMeasure;
  /** Crossvariance north vertical. */
  VarianceNVert: eml.AreaMeasure;
  /** Covariance vertical vertical. */
  VarianceVertVert: eml.AreaMeasure;
}
export interface StnTrajMatrixCov extends _StnTrajMatrixCov {}

/** Captures raw data for a trajectory station. */
interface _StnTrajRawData extends BaseType {
  /** Uncorrected gravitational field strength measured in the axial direction. */
  GravAxialRaw?: eml.LinearAccelerationMeasure;
  /** Uncorrected gravitational field strength measured in the transverse direction. */
  GravTran1Raw?: eml.LinearAccelerationMeasure;
  /** Uncorrected gravitational field strength measured in the transverse direction, approximately normal to tran1. */
  GravTran2Raw?: eml.LinearAccelerationMeasure;
  /** Uncorrected magnetic field strength measured in the axial direction. */
  MagAxialRaw?: eml.MagneticFluxDensityMeasure;
  /** Uncorrected magnetic field strength measured in the transverse direction. */
  MagTran1Raw?: eml.MagneticFluxDensityMeasure;
  /** Uncorrected magnetic field strength measured in the transverse direction, approximately normal to tran1. */
  MagTran2Raw?: eml.MagneticFluxDensityMeasure;
}
export interface StnTrajRawData extends _StnTrajRawData {}

/** Captures validation information for a survey. */
interface _StnTrajValid extends BaseType {
  /** Calculated total gravitational field. */
  GravTotalFieldCalc?: eml.LinearAccelerationMeasure;
  /** Calculated magnetic dip (inclination), the angle between the horizontal
   * and the geomagnetic field (positive down, res .001). */
  MagDipAngleCalc?: eml.PlaneAngleMeasure;
  /** Calculated total intensity of the geomagnetic field as sum of BGGM,
   * IFR and local field. */
  MagTotalFieldCalc?: eml.MagneticFluxDensityMeasure;
}
export interface StnTrajValid extends _StnTrajValid {}

export type StratigraphyKind =
  | "biostratigraphic"
  | "chemostratigraphic"
  | "chronostratigraphic"
  | "fluid stratigraphic"
  | "lithostratigraphic"
  | "magnetostratigraphic"
  | "seismic stratigraphic"
  | "sequence stratigraphic";
interface _StratigraphyKind extends eml._TypeEnum {
  _: StratigraphyKind;
}

export type StratigraphyKindExt = string;
type _StratigraphyKindExt = Primitive._string;

export type StratigraphyKindQualifier =
  | "base"
  | "fault"
  | "gas-oil contact"
  | "gas-water contact"
  | "oil-water contact"
  | "seafloor"
  | "top";
interface _StratigraphyKindQualifier extends eml._TypeEnum {
  _: StratigraphyKindQualifier;
}

export type StratigraphyKindQualifierExt = string;
type _StratigraphyKindQualifierExt = Primitive._string;

/** StringAccessories contain the stringequipment's decorative components. An accessory is the stringEquipment or Strings’ decorative component.  An accessory is NOT directly screwed to the string. This part DOES NOT carry the weight of the rest of the String as opposed to the stringEquipment, which does. An Accessory is UNLIKE an Assembly on which the stringEquipment is built out of. */
interface _StringAccessory extends BaseType {
  Accessory: StringEquipment[];
}
export interface StringAccessory extends _StringAccessory {}

/** Information regarding equipment that composes (makes up) a string. */
interface _StringEquipment extends BaseType {
  /** Unique identifier for this instance of StringEquipment. */
  uid: eml.String64;
  Assembly?: Assembly;
  ConnectionNext?: EquipmentConnection[];
  /** The count number of the same equipment. The default is 1.  In some cases, multiple pieces group into one component. */
  Count?: number;
  /** Reference to a piece of equipment. */
  Equipment: eml.ComponentReference;
  /** History of events related to this equipment. */
  EquipmentEventHistory?: EventInfo[];
  /** The type of the equipment. See enumerated values. */
  EquipmentType?: EquipmentTypeExt;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Flag indicating scratchers have been added to the equipment. */
  HasScratchers?: boolean;
  /** Heat rating. */
  HeatRating?: eml.ThermodynamicTemperatureMeasure;
  InsideComponent?: ReferenceContainer[];
  /** Flag indicating equipment is centralized. */
  IsCentralized?: boolean;
  /** Flag indicating the equipment has a line connected to the surface. */
  IsLinetoSurface?: boolean;
  /** The total length of the equipment.  This is NOT length per unit. This is the length of unit stored at equipmentset's equipment information section. */
  Length?: eml.LengthMeasure;
  /** Measured depth interval in which the equipment is installed in the string. */
  MdInterval?: eml.MdInterval;
  /** The name of the equipment. */
  Name?: eml.String2000;
  /** Object condition at installation. */
  ObjectCondition?: eml.String64;
  OrderOfObject?: ObjectSequence;
  OutsideComponent?: ReferenceContainer[];
  /** Flag indicating whether this component is inside the string or not . */
  OutsideString?: boolean;
  /** Reference to the perforated hole in the equipment after a perforation event. */
  PerforationSet?: eml.ComponentReference[];
  /** Remarks on the equipment stored permanently. */
  PermanentRemarks?: eml.String2000;
  /** Burst pressure. */
  PresBurst?: eml.PressureMeasure;
  /** Collapse pressure. */
  PresCollapse?: eml.PressureMeasure;
  /** Pressure  rating. */
  PresRating?: eml.PressureMeasure;
  /** The days that the equipment has run. */
  PreviousRunDays?: eml.TimeMeasure;
  /** The well run number. */
  RunNo?: eml.String64;
  /** The status of the piece of equipment. */
  Status?: eml.String64;
  /** Object surface condition. */
  SurfaceCondition?: eml.String64;
  /** Max tensile strength. */
  TensileMax?: eml.PressureMeasure;
  /** True vertical depth interval in which the equipment is installed in the string. */
  TvdInterval?: eml.AbstractTvdInterval;
  /** Remarks on the usage of this equipment. */
  UsageComment?: eml.String2000;
}
export interface StringEquipment extends _StringEquipment {}

/** Information on collection of set of equipment included in the string. */
interface _StringEquipmentSet extends BaseType {
  StringEquipment: StringEquipment[];
}
export interface StringEquipmentSet extends _StringEquipmentSet {}

/** Specifies the values  to further qualify a string type. */
export type SubStringType =
  | "abandoned junk/fish"
  | "capillary string (inside tubing)"
  | "capillary string (tubing/casing annulus)"
  | "conductor casing"
  | "drill string"
  | "flowline"
  | "geological objects"
  | "inner liner"
  | "intermediate casing"
  | "production casing"
  | "production liner"
  | "protective casing"
  | "surface casing"
  | "wellbore notes"
  | "y-tool string";
interface _SubStringType extends eml._TypeEnum {
  _: SubStringType;
}

/** Operations Support Craft Component Schema. */
interface _SupportCraft extends BaseType {
  /** Unique identifier for this instance of SupportCraft. */
  uid: eml.String64;
  /** Comments and remarks. */
  Comments?: eml.String2000;
  /** Date and time when the vehicle arrived at the rig site. */
  DTimArrived?: eml.TimeStamp;
  /** Date and time when the vehicle departed from the rig site. */
  DTimDeparted?: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Human-recognizable context for the support craft. */
  Name: eml.String64;
  /** Type of support craft (e.g., barge, helicopter, tug boat, etc.) */
  TypeSupportCraft: SupportCraftType;
}
export interface SupportCraft extends _SupportCraft {}

/** Specifies the type of support craft. */
export type SupportCraftType =
  | "barge"
  | "standby boat"
  | "helicopter"
  | "supply boat"
  | "truck"
  | "crew vehicle"
  | "tug boat";
interface _SupportCraftType extends eml._TypeEnum {
  _: SupportCraftType;
}

/** Rig Surface Equipment Schema. */
interface _SurfaceEquipment extends BaseType {
  /** Coiled tubing: the coiled tubing wrap type. */
  CtWrapType?: eml.String64;
  /** Description of item and details. */
  Description?: eml.String2000;
  /** Height of the flange. */
  HtFlange?: eml.LengthMeasure;
  /** Coiled tubing: The length of tubing from the end of the coil reel to the rotary kelly bushing. This length includes the tubing in the hole and the tubing on the reel. This measurement takes into account the 20 or so feet of tubing that is being straightened and pushed through the injector head. */
  HtInjStk?: eml.LengthMeasure;
  /** Height of the surface iron. */
  HtSurfaceIron?: eml.LengthMeasure;
  /** Top drive: The distance that the mud travels from the end of the standpipe hose to the drill pipe connection at the bottom of the top drive. We are measuring the distance that the mud will flow through the top drive.For the top drive. The distance that the mud travels from the end of the standpipe hose to the drill pipe connection at the bottom of the top drive. This is the measurement of the distance that the mud flows through the top drive. */
  HtTopStk?: eml.LengthMeasure;
  /** Coiled tubing: inner diameter of the pump discharge line. */
  IdDischargeLine?: eml.LengthMeasure;
  /** Inner diameter of the kelly hose. */
  IdHose?: eml.LengthMeasure;
  /** Inner diameter of the kelly bushing. */
  IdKelly?: eml.LengthMeasure;
  /** Inner diameter of the standpipe. */
  IdStandpipe?: eml.LengthMeasure;
  /** Inner diameter of the surface iron. */
  IdSurfaceIron?: eml.LengthMeasure;
  /** Inner diameter of the swivel. */
  IdSwivel?: eml.LengthMeasure;
  /** Top drive: inner diameter of the top stack. */
  IdTopStk?: eml.LengthMeasure;
  /** Coiled tubing: Does it have an injector stack up?
   * Values are "true" (or "1") and "false" (or "0"). */
  InjStkUp?: boolean;
  /** Coiled tubing: length of the pump discharge line. */
  LenDischargeLine?: eml.LengthMeasure;
  /** Length of the kelly hose. */
  LenHose?: eml.LengthMeasure;
  /** Length of the kelly bushing. */
  LenKelly?: eml.LengthMeasure;
  /** Coiled tubing: length of the coiled tubing remaining on the reel. */
  LenReel?: eml.LengthMeasure;
  /** Length of the standpipe. */
  LenStandpipe?: eml.LengthMeasure;
  /** Length of the surface iron. */
  LenSurfaceIron?: eml.LengthMeasure;
  /** Length of the swivel. */
  LenSwivel?: eml.LengthMeasure;
  /** Coiled tubing: length of the umbilical. */
  LenUmbilical?: eml.LengthMeasure;
  /** Coiled tubing: outside diameter of the reel core that the coiled tubing is wrapped around. */
  OdCore?: eml.LengthMeasure;
  /** Coiled tubing: outside diameter of the coiled tubing reel. */
  OdReel?: eml.LengthMeasure;
  /** Coiled tubing: outer diameter of the umbilical. */
  OdUmbilical?: eml.LengthMeasure;
  /** Pressure rating of the item. */
  PresRating?: eml.PressureMeasure;
  /** Surface equipment type (IADC1-4, Custom, Coiled Tubing). */
  TypeSurfEquip: SurfEquipType;
  /** Coiled tubing: Umbilical inside, true/false flag to account for the wireline inside the coiled tubing. With this pressure loss calculation, you can calculate for the strings used for logging, wireline coring, etc.
   * Values are "true" (or "1") and "false" (or "0"). */
  UmbInside?: boolean;
  /** Use kelly hose geometry?
   * Values are "true" (or "1") and "false" (or "0"). */
  UseHose?: boolean;
  /** Use injector stack height?
   * Values are "true" (or "1") and "false" (or "0"). */
  UseInjStack?: boolean;
  /** Use kelly geometry?
   * Values are "true" (or "1") and "false" (or "0"). */
  UseKelly?: boolean;
  /** Use pump discharge line?
   * Values are "true" (or "1") and "false" (or "0"). */
  UsePumpDischarge?: boolean;
  /** Use standpipe geometry?
   * Values are "true" (or "1") and "false" (or "0"). */
  UseStandpipe?: boolean;
  /** Use surface iron description?
   * Values are "true" (or "1") and "false" (or "0"). */
  UseSurfaceIron?: boolean;
  /** Use swivel geometry?
   * Values are "true" (or "1") and "false" (or "0"). */
  UseSwivel?: boolean;
  /** Use top stack height?
   * Values are "true" (or "1") and "false" (or "0"). */
  UseTopStack?: boolean;
  /** Coiled tubing: width of the reel core. This is the inside dimension. */
  WidReelWrap?: eml.LengthMeasure;
}
export interface SurfaceEquipment extends _SurfaceEquipment {}

/** Specifies the type of surface equipment. */
export type SurfEquipType = "IADC" | "custom" | "coiled tubing" | "unknown";
interface _SurfEquipType extends eml._TypeEnum {
  _: SurfEquipType;
}

/** Captures information about the nature, range, and sequence of directional surveying tools run in a wellbore for the management of positional uncertainty. This object is uniquely identified within the context of one wellbore object. */
interface _SurveyProgram extends eml._AbstractObject {
  /** Name of the engineer. */
  Engineer?: eml.String64;
  /** Is program  final or intermediate/preliminary? */
  Final?: eml.String64;
  SurveySection?: SurveySection[];
  /** Survey version number, incremented every time the program is modified. */
  SurveyVer: eml.NonNegativeLong;
  Wellbore: eml.DataObjectReference;
}
export interface SurveyProgram extends _SurveyProgram {}

/** Survey Section Component Schema. */
interface _SurveySection extends BaseType {
  /** Unique identifier of this instance of SurveySection. */
  uid: eml.String64;
  /** Comments and remarks. */
  Comments?: eml.String2000;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Maximum allowable depth frequency for survey stations for this survey run. */
  FrequencyMx?: eml.LengthMeasure;
  /** The item state for the data object. */
  ItemState?: eml.ExistenceKind;
  MdInterval: eml.MdInterval;
  /** Error model used to calculate the ellipses of uncertainty. */
  ModelError?: eml.DataObjectReference;
  /** Name of the survey program section. */
  Name?: eml.String64;
  /** Name of survey tool used in this section. */
  NameTool: eml.String64;
  /** Higher index trajectory takes precedence over overlapping section of previous trajectory?   Values are "true" (or "1") and "false" (or "0"). Normally, this is true. */
  Overwrite?: boolean;
  /** Order in which the program sections are or were executed. */
  Sequence: eml.NonNegativeLong;
  /** Pointer to a BusinessAssociate representing the company who will run or has run the survey tool. */
  SurveyCompany: eml.DataObjectReference;
  /** Type of tool used. */
  TypeTool: eml.String64;
}
export interface SurveySection extends _SurveySection {}

/** The target object is used to capture information about intended targets of a trajectory survey. This object is uniquely identified within the context of one wellbore object. */
interface _Target extends eml._AbstractObject {
  /** Specifies the definition of north. */
  AziRef?: eml.NorthReferenceKind;
  /** Geological or drillers target. */
  CatTarg?: TargetCategoryExt;
  /** Angle of dip with respect to horizontal. */
  Dip?: eml.PlaneAngleMeasure;
  /** Easting of target center point in map coordinates. */
  DispEwCenter?: eml.LengthMeasure;
  /** East-west offset of target intercept point from shape center. */
  DispEwOffset?: eml.LengthMeasure;
  /** Origin east-west used as starting point for sections, mandatory parameter when sections are used. */
  DispEwSectOrig?: eml.LengthMeasure;
  /** Northing of target center point in map coordinates. */
  DispNsCenter?: eml.LengthMeasure;
  /** North-south offset of target intercept point from shape center. */
  DispNsOffset?: eml.LengthMeasure;
  /** Origin north-south used as starting point for sections, mandatory parameter when sections are used.. */
  DispNsSectOrig?: eml.LengthMeasure;
  /** Distance from center to perimeter in rotation direction.
   * This may be ignored depending on the value of typeTargetScope. */
  LenMajorAxis?: eml.LengthMeasure;
  Location?: eml.Abstract3dPosition[];
  ParentTarget?: eml.DataObjectReference;
  /** Direction of target geometry with respect to north azimuth reference. */
  Rotation?: eml.PlaneAngleMeasure;
  /** Direction of dip with respect to north azimuth reference. */
  Strike?: eml.PlaneAngleMeasure;
  /** The type of scope of the drilling target. */
  TargetScope?: TargetScopeExt;
  TargetSection?: TargetSection[];
  /** Height of target above center point. */
  ThickAbove?: eml.LengthMeasure;
  /** Depth of target below center point. */
  ThickBelow?: eml.LengthMeasure;
  /** Vertical depth of the measurements. */
  Tvd?: eml.AbstractVerticalDepth;
  Wellbore: eml.DataObjectReference;
  /** Distance from center to perimeter at 90 deg to rotation direction.
   * This may be ignored depending on the value of typeTargetScope. */
  WidMinorAxis?: eml.LengthMeasure;
}
export interface Target extends _Target {}

export type TargetCategory = "geological" | "well control";
interface _TargetCategory extends eml._TypeEnum {
  _: TargetCategory;
}

export type TargetCategoryExt = string;
type _TargetCategoryExt = Primitive._string;

/** These values represent the type of scope of the drilling target. */
export type TargetScope =
  | "3D volume"
  | "ellipsoid"
  | "elliptical"
  | "hardLine"
  | "irregular"
  | "lease line"
  | "line"
  | "plane"
  | "point"
  | "rectangular";
interface _TargetScope extends eml._TypeEnum {
  _: TargetScope;
}

export type TargetScopeExt = string;
type _TargetScopeExt = Primitive._string;

/** WITSML Element Types */
interface _TargetSection extends BaseType {
  uid: eml.String64;
  /** Direction of straight line section or radius of arc for continuous curve section. */
  AngleArc?: eml.PlaneAngleMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Length of straight line section or radius of arc for continuous curve section. */
  LenRadius?: eml.LengthMeasure;
  Location?: eml.Abstract3dPosition[];
  /** Sequence number of section, 1,2,3. */
  SectNumber: number;
  /** Height of target above center point at the start of the section.
   * In the case of an arc, the thickness above should vary linearly with the arc length. */
  ThickAbove?: eml.LengthMeasure;
  /** Depth of target below center point at the start of the section.
   * In the case of an arc, the thickness below should vary linearly with the arc length. */
  ThickBelow?: eml.LengthMeasure;
  /** Section scope: Line or Arc. */
  TypeTargetSectionScope: TargetSectionScope;
}
export interface TargetSection extends _TargetSection {}

/** These values represent the type of scope of a section that describes a target. */
export type TargetSectionScope = "arc" | "line";
interface _TargetSectionScope extends eml._TypeEnum {
  _: TargetSectionScope;
}

/** A timestamped textual description. */
interface _TimestampedCommentString extends eml._String2000 {
  /** The timestamp of the time-qualified comment. */
  dTim: eml.TimeStamp;
}
export interface TimestampedCommentString extends _TimestampedCommentString {}

interface _ToolErrorModel extends eml._AbstractObject {
  Application?: eml.String2000;
  Authorization: Authorization;
  CorrectionConsidered?: CorrectionConsideredExt[];
  ErrorTermValue?: ErrorTermValue[];
  GyroToolConfiguration?: GyroToolConfiguration;
  /** Because software handles it (possibility */
  MisalignmentMode: MisalignmentMode;
  OperatingCondition?: OperatingConditionExt[];
  OperatingConstraints?: OperatingConstraints;
  Replaces?: eml.DataObjectReference;
  Source?: eml.String2000;
  /** QC with Trajectory date end */
  SurveyRunDateEnd?: eml.TimeStamp;
  /** QC with Trajectory date end */
  SurveyRunDateStart?: eml.TimeStamp;
  ToolKind?: ToolKind;
  ToolSubKind: ToolSubKindExt[];
}
export interface ToolErrorModel extends _ToolErrorModel {}

interface _ToolErrorModelDictionary extends eml._AbstractObject {
  ToolErrorModel: ToolErrorModel[];
}
export interface ToolErrorModelDictionary extends _ToolErrorModelDictionary {}

export type ToolKind = "gyroscopic" | "magnetic" | "utility";
interface _ToolKind extends eml._TypeEnum {
  _: ToolKind;
}

export type ToolSubKind =
  | "blind"
  | "blind plus trend"
  | "camera based film gyro multi shot"
  | "camera based film gyro single shot"
  | "camera based film magnetic multi shot"
  | "camera based film magnetic single shot"
  | "dipmeter"
  | "electro magnetic survey"
  | "ferranti inertial navigation system"
  | "gyro suspicious"
  | "gyro while drilling"
  | "inclinometer actual"
  | "inclinometer planned"
  | "inclinometer plus trend"
  | "magnetic while drilling"
  | "north seeking gyro"
  | "ring laser inertial guidance surveyor"
  | "surface readout gyro multi shot"
  | "surface readout gyro single shot"
  | "zero error"
  | "unknown";
interface _ToolSubKind extends eml._TypeEnum {
  _: ToolSubKind;
}

export type ToolSubKindExt = string;
type _ToolSubKindExt = Primitive._string;

/** Measurement of the  average electric current and the channel from which the data was calculated. */
interface _TorqueCurrentStatistics extends BaseType {
  /** Average electric current through the interval */
  Average: eml.ElectricCurrentMeasure;
  /** Log channel from which the electric current statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface TorqueCurrentStatistics extends _TorqueCurrentStatistics {}

/** Measurement of average torque and the channel from which the data was calculated. */
interface _TorqueStatistics extends BaseType {
  /** Average torque through the interval. */
  Average: eml.MomentOfForceMeasure;
  /** Log channel from which the torque statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface TorqueStatistics extends _TorqueStatistics {}

/** The trajectory object is used to capture information about a directional survey in a wellbore. It contains many trajectory stations to capture the information about individual survey points. This object is uniquely identified within the context of one wellbore object. */
interface _Trajectory extends eml._AbstractMdGrowingObject {
  /** Remarks related to acquisition context which is not the same as Description, which is a summary of the trajectory. */
  AcquisitionRemark?: eml.String2000;
  /** Specifies the definition of north. While this is optional because of legacy data, it is strongly recommended that this always be specified. */
  AziRef?: eml.NorthReferenceKind;
  /** Azimuth used for vertical section plot/computations. */
  AziVertSect?: eml.PlaneAngleMeasureExt;
  /** This also contains the default projected and geographic systems.... */
  DefaultMdDatum?: eml.DataObjectReference;
  DefaultTvdDatum?: eml.DataObjectReference;
  /** True ("true" or "1") indicates that this trajectory is definitive for
   * this wellbore. False ("false" or "0") or not given indicates otherwise.
   * There can only be one trajectory per wellbore with definitive=true and it
   * must define the geometry of the whole wellbore (surface to bottom).
   * The definitive trajectory may represent a composite of information in many
   * other trajectories. A query requesting a subset of the possible information can
   * provide a simplistic view of the geometry of the wellbore. */
  Definitive?: boolean;
  /** Origin east-west used for vertical section plot/computations. */
  DispEwVertSectOrig?: eml.LengthMeasureExt;
  /** Origin north-south used for vertical section plot/computations. */
  DispNsVertSectOrig?: eml.LengthMeasureExt;
  /** End date and time of trajectory station measurements.
   * Note that this is NOT a server query parameter. */
  DTimTrajEnd?: eml.TimeStamp;
  /** Start date and time of trajectory station measurements.
   * Note that this is NOT a server query parameter. */
  DTimTrajStart?: eml.TimeStamp;
  /** Is trajectory a final or intermediate/preliminary?
   * Values are "true" (or "1") and "false" (or "0"). */
  FinalTraj?: boolean;
  /** The angle  used to correct a true north referenced azimuth to a grid north azimuth. WITSML follows the Gauss-Bomford convention in which convergence angles are measured positive clockwise from true north to grid north (or negative in the anti-clockwise direction). To convert a true north referenced azimuth to a grid north azimuth, the convergence angle must be subtracted from true north. If StnGridConUsed is not provided, then this value applies to all grid-north referenced stations. */
  GridConUsed?: eml.PlaneAngleMeasureExt;
  /** A multiplier to change geodetic distances based on the Earth model (ellipsoid) to distances on the grid plane.
   * This is the number which was already used to correct lateral distances. Provide it only if it is used in your trajectory stations.
   * If StnGridScaleFactorUsed is not provided, then this value applies to all trajectory stations.
   * The grid scale factor applies to the DispEw, DispNs and Closure elements on trajectory stations. */
  GridScaleFactorUsed?: eml.LengthPerLengthMeasureExt;
  /** Magnetic declination used to correct a Magnetic North referenced azimuth to a True North azimuth.  Magnetic declination angles are measured positive clockwise from True North to Magnetic North (or negative in the anti-clockwise direction).
   * To convert a Magnetic azimuth to a True North azimuth, the magnetic declination should be added.
   * Starting value if stations have individual values. */
  MagDeclUsed?: eml.PlaneAngleMeasureExt;
  /** The measured depth to which the survey segment was extrapolated. */
  MdMaxExtrapolated?: eml.MeasuredDepth;
  /** Measured depth within the wellbore of the LAST trajectory station with recorded data. If a trajectory has been extrapolated to a deeper depth than the last surveyed station then that is MdMaxExtrapolated and not MdMaxMeasured. */
  MdMaxMeasured?: eml.MeasuredDepth;
  /** Tie-point depth measured along the wellbore from the measurement reference datum to the trajectory station - where tie point is the place on the originating trajectory where the current trajectory intersecst it. */
  MdTieOn?: eml.MeasuredDepth;
  /** Is trajectory a result of a memory dump from a tool?
   * Values are "true" (or "1") and "false" (or "0"). */
  Memory?: boolean;
  /** The nominal type of algorithm used in the position calculation in trajectory stations. Individual stations may use different algorithms. */
  NominalCalcAlgorithm?: TrajStnCalcAlgorithmExt;
  /** The nominal type of tool used for the trajectory station measurements. Individual stations may have a different tool type. */
  NominalTypeSurveyTool?: TypeSurveyToolExt;
  /** The nominal type of survey station for the trajectory stations. Individual stations may have a different type. */
  NominalTypeTrajStation?: TrajStationTypeExt;
  ParentTrajectory?: eml.DataObjectReference;
  /** Pointer to a BusinessAssociate representing the contractor who provided the service. */
  ServiceCompany?: eml.DataObjectReference;
  SourceTrajectory?: eml.DataObjectReference[];
  SurveyProgram?: eml.DataObjectReference;
  /** Information about a Trajectory that is relevant for OSDU integration but does not have a natural place in a Trajectory object. */
  TrajectoryOSDUIntegration?: TrajectoryOSDUIntegration;
  TrajectoryStation?: TrajectoryStation[];
  /** A human-readable unique identifier assigned to the trajectory. Similar to a UWI for a well or wellbore. */
  UniqueIdentifier?: eml.String64;
  Wellbore: eml.DataObjectReference;
}
export interface Trajectory extends _Trajectory {}

/** Information about a Trajectory that is relevant for OSDU integration but does not have a natural place in a Trajectory object. */
interface _TrajectoryOSDUIntegration extends BaseType {
  /** Active Survey Indicator. Distinct from ActiveStatus on Trajectory. */
  ActiveIndicator?: boolean;
  /** The audit trail of operations applied to the station coordinates from the original state to the current state. The list may contain operations applied prior to ingestion as well as the operations applied to produce the Wgs84Coordinates. The text elements refer to ESRI style CRS and Transformation names, which may have to be translated to EPSG standard names. */
  AppliedOperation?: eml.String256[];
  /** Pointer to a BusinessAssociate that represents the company who engaged the service company (ServiceCompany) to perform the surveying. */
  IntermediaryServiceCompany?: eml.DataObjectReference;
  /** The type of tool or equipment used to acquire this Directional Survey. */
  SurveyToolType?: eml.String256;
  /** The version of the wellbore survey deliverable received from the service provider - as given by this provider. Distinct from objectVersion. */
  TrajectoryVersion?: eml.String64;
}
export interface TrajectoryOSDUIntegration extends _TrajectoryOSDUIntegration {}

/** Captures information for a report including trajectory stations. */
interface _TrajectoryReport extends BaseType {
  /** Remarks related to acquisition context which is not the same as Description, which is a summary of the trajectory. */
  AcquisitionRemark?: eml.String2000;
  /** Specifies the definition of north. While this is optional because of legacy data, it is strongly recommended that this always be specified. */
  AziRef?: eml.NorthReferenceKind;
  /** Azimuth used for vertical section plot/computations. */
  AziVertSect?: eml.PlaneAngleMeasureExt;
  /** Origin east-west used for vertical section plot/computations. */
  DispEwVertSectOrig?: eml.LengthMeasureExt;
  /** Origin north-south used for vertical section plot/computations. */
  DispNsVertSectOrig?: eml.LengthMeasureExt;
  /** The angle  used to correct a true north referenced azimuth to a grid north azimuth. WITSML follows the Gauss-Bomford convention in which convergence angles are measured positive clockwise from true north to grid north (or negative in the anti-clockwise direction). To convert a true north referenced azimuth to a grid north azimuth, the convergence angle must be subtracted from true north. If StnGridConUsed is not provided, then this value applies to all grid-north referenced stations. */
  GridConUsed?: eml.PlaneAngleMeasureExt;
  /** A multiplier to change geodetic distances based on the Earth model (ellipsoid) to distances on the grid plane.
   * This is the number which was already used to correct lateral distances. Provide it only if it is used in your trajectory stations.
   * If StnGridScaleFactorUsed is not provided, then this value applies to all trajectory stations.
   * The grid scale factor applies to the DispEw, DispNs and Closure elements on trajectory stations. */
  GridScaleFactorUsed?: eml.LengthPerLengthMeasureExt;
  /** Magnetic declination used to correct a Magnetic North referenced azimuth to a True North azimuth.  Magnetic declination angles are measured positive clockwise from True North to Magnetic North (or negative in the anti-clockwise direction).
   * To convert a Magnetic azimuth to a True North azimuth, the magnetic declination should be added.
   * Starting value if stations have individual values. */
  MagDeclUsed?: eml.PlaneAngleMeasureExt;
  /** The measured depth to which the survey segment was extrapolated. */
  MdMaxExtrapolated?: eml.MeasuredDepth;
  /** Measured depth within the wellbore of the LAST trajectory station with recorded data. If a trajectory has been extrapolated to a deeper depth than the last surveyed station then that is MdMaxExtrapolated and not MdMaxMeasured. */
  MdMaxMeasured?: eml.MeasuredDepth;
  /** Tie-point depth measured along the wellbore from the measurement reference datum to the trajectory station - where tie point is the place on the originating trajectory where the current trajectory intersecst it. */
  MdTieOn?: eml.MeasuredDepth;
  /** The nominal type of algorithm used in the position calculation in trajectory stations. Individual stations may use different algorithms. */
  NominalCalcAlgorithm?: TrajStnCalcAlgorithmExt;
  /** The nominal type of tool used for the trajectory station measurements. Individual stations may have a different tool type. */
  NominalTypeSurveyTool?: TypeSurveyToolExt;
  /** The nominal type of survey station for the trajectory stations. Individual stations may have a different type. */
  NominalTypeTrajStation?: TrajStationTypeExt;
  /** Information about a Trajectory that is relevant for OSDU integration but does not have a natural place in a Trajectory object. */
  TrajectoryOSDUIntegration?: TrajectoryOSDUIntegration;
  TrajectoryStation?: TrajectoryStation[];
}
export interface TrajectoryReport extends _TrajectoryReport {}

/** WITSML - Trajectory Station Component Schema */
interface _TrajectoryStation extends eml._AbstractMdGrowingPart {
  /** Was an Axial Magnetic Interference (AMI) correction applied to the azimuth value?
   * Values are "true" (or "1") and "false" (or "0").
   * Most of the BHAs used to drill wells include an MWD tool. An MWD is a magnetic survey tool and as
   * such suffer from magnetic interferences from a wide variety of sources. Magnetic interferences can be
   * categorized into axial and radial type interferences.
   * Axial interferences are mainly the result of magnetic poles from the drill string steel components
   * located below and above the MWD tool. Radial interferences are numerous.
   * Therefore, there is a risk that magXAxialCorUsed includes both Axial and radial corrections. */
  AxialMagInterferenceCorUsed?: boolean;
  /** Hole azimuth. Corrected to wells azimuth reference. */
  Azi?: eml.PlaneAngleMeasure;
  /** The type of algorithm used in the position calculation. */
  CalcAlgorithm?: TrajStnCalcAlgorithm;
  /** The horizontal straight line distance from the trajectory origin (Well surface location) to this trajectory station, calculated using the Pythagorean Theorem from this trajectory station's X and Y Offsets. Closure Distance is often reported only once for the bottom hole location; however, the value stored in this attribute is the Closure Distance at this trajectory station. The distance is subject to distortions by the projection in which the closure is computed. Often referred to as simply "Closure" or sometimes referred to as "Horizontal Displacement". */
  Closure?: eml.LengthMeasure;
  /** The direction angle, in the horizontal plane relative to the north reference, of the trajectory origin (Well surface location) to this trajectory station calculated using trigonometry from this trajectory station's X and Y Offsets. The North Reference the Trajectory's AziRef. This value should be a number between 0.00 and 360.00 degrees; 0.00 and 360.00 represent North, 90.00 is East, 180.00 is South and 270.00 is West. Sometimes referred to as "Horizontal Displacement Direction" or "Horizontal Displacement Bearing". */
  ClosureDirection?: eml.PlaneAngleMeasure;
  CorUsed?: StnTrajCorUsed;
  /** WWas a Cosag Correction applied to the azimuth values?
   * Values are "true" (or "1") and "false" (or "0").
   * The BHA Sag Correction is the same as the Sag Correction except it includes the horizontal
   * misalignment (Cosag). */
  CosagCorUsed?: boolean;
  /** Survey tool dip uncertainty. */
  DipAngleUncert?: eml.PlaneAngleMeasure;
  /** East-west offset, positive to the East.
   * This is relative to wellLocation with a North axis orientation of aziRef.
   * If a displacement with respect to a different point is desired then
   * define a localCRS and specify local coordinates in location. */
  DispEw?: eml.LengthMeasure;
  /** The difference between the well surface hole latitude and the trajectory station latitude. A positive value indicates a northerly direction; a negative value indicates a southerly direction. ADD this value to the well Surface Latitude to define the Station Latitude. */
  DispLatitude?: eml.PlaneAngleMeasure;
  /** The difference between the well surface hole longitude and the trajectory station longitude. A positive value indicates an easterly direction; a negative value indicates a westerly direction. ADD this value to the well Surface Longitude to define the Station Longitude. */
  DispLongitude?: eml.PlaneAngleMeasure;
  /** North-south offset, positive to the North.
   * This is relative to wellLocation with a North axis orientation of aziRef.
   * If a displacement with respect to a different point is desired then
   * define a localCRS and specify local coordinates in location. */
  DispNs?: eml.LengthMeasure;
  /** Dogleg severity. */
  Dls?: eml.AnglePerLengthMeasure;
  /** Date and time the station was measured or created. */
  DTimStn?: eml.TimeStamp;
  /** Gravitational model used. */
  GeoModelUsed?: eml.String64;
  /** Was an accelerometer alignment correction applied to survey computation?
   * Values are "true" (or "1") and "false" (or "0"). */
  GravAccelCorUsed?: boolean;
  /** Gravitational field theoretical/reference value. */
  GravTotalFieldReference?: eml.LinearAccelerationMeasure;
  /** Survey tool gravity uncertainty. */
  GravTotalUncert?: eml.LinearAccelerationMeasure;
  /** Toolface angle (gravity). */
  Gtf?: eml.PlaneAngleMeasure;
  /** Hole inclination, measured from vertical. */
  Incl?: eml.PlaneAngleMeasure;
  /** Was an In Field Referencing (IFR) correction applied to the azimuth value?
   * Values are "true" (or "1") and "false" (or "0").
   * An IFR survey measures the strength and direction of the Earth's magnetic field over the area of interest.
   * By taking a geomagnetic modelled values away
   * from these field survey results, we are left with a local crustal correction,
   * which since it is assumed geological in nature, only varies over geological timescales.
   * For MWD survey operations, these corrections are applied in addition to the geomagnetic model
   * to provide accurate knowledge of the local magnetic field and hence to improve the
   * accuracy of MWD magnetic azimuth measurements. */
  InfieldRefCorUsed?: boolean;
  /** Was an In Hole Referencing (IHR) correction applied to the inclination and/or azimuth values?
   * Values are "true" (or "1") and "false" (or "0").
   * In-Hole Referencing essentially involves comparing gyro surveys to MWD surveys in a tangent
   * section of a well. Once a small part of a tangent section has been drilled and surveyed using an
   * MWD tool, then an open hole (OH) gyro is run. By comparing the Gyro surveys to the MWD
   * surveys a correction can be calculated for the MWD. This correction is then assumed as valid
   * for the rest of the tangent section allowing to have a near gyro accuracy for the whole section,
   * therefore reducing the ellipse of uncertainty (EOU) size. */
  InHoleRefCorUsed?: boolean;
  /** Was an Interpolated In Field Referencing (IIFR) correction applied to the azimuth value?
   * Values are "true" (or "1") and "false" (or "0").
   * Interpolated In Field Referencing measures the diurnal Earth magnetic field variations resulting from electrical
   * currents in the ionosphere and effects of magnetic storms hitting the Earth. It increases again the accuracy
   * of the magnetic azimuth measurement. */
  InterpolatedInfieldRefCorUsed?: boolean;
  Location?: eml.AbstractPosition[];
  /** Magnetic dip angle theoretical/reference value. */
  MagDipAngleReference?: eml.PlaneAngleMeasure;
  /** Was a drillstring magnetism correction applied to survey computation?
   * Values are "true" (or "1") and "false" (or "0"). */
  MagDrlstrCorUsed?: boolean;
  /** Geomagnetic model used. */
  MagModelUsed?: eml.String64;
  /** Current valid interval for the geomagnetic model used. */
  MagModelValid?: eml.String64;
  /** Geomagnetic field theoretical/reference value. */
  MagTotalFieldReference?: eml.MagneticFluxDensityMeasure;
  /** Survey tool magnetic uncertainty. */
  MagTotalUncert?: eml.MagneticFluxDensityMeasure;
  /** Was a magnetometer alignment correction applied to survey computation?
   * Values are "true" (or "1") and "false" (or "0"). */
  MagXAxialCorUsed?: boolean;
  /** Indicates whether the trajectory station information was manually entered by a human. */
  ManuallyEntered?: boolean;
  MatrixCov?: StnTrajMatrixCov;
  /** Delta measured depth from previous station. */
  MdDelta?: eml.LengthMeasure;
  /** Was a correction applied to the survey due to a
   * Multi-Station Analysis process?
   * Values are "true" (or "1") and "false" (or "0"). */
  MSACorUsed?: boolean;
  /** Toolface angle (magnetic). */
  Mtf?: eml.PlaneAngleMeasure;
  /** The latitude of the trajectory station. Recommended practice is to utilize DispLatitude and DispLongitude instead of storing actual OriginalLatitude/OriginalLongitude values. NOTE - These are relative to the same geodetic datum as the well surface location. */
  OriginalLatitude?: eml.PlaneAngleMeasure;
  /** The longitude of the trajectory station. Recommended practice is to utilize DispLatitude and DispLongitude instead of storing actual OriginalLatitude/OriginalLongitude values. NOTE - These are relative to the same geodetic datum as the well surface location. */
  OriginalLongitude?: eml.PlaneAngleMeasure;
  /** Build Rate, radius of curvature computation. */
  RateBuild?: eml.AnglePerLengthMeasure;
  /** Turn rate, radius of curvature computation. */
  RateTurn?: eml.AnglePerLengthMeasure;
  RawData?: StnTrajRawData;
  /** Was a bottom hole assembly sag correction applied to the survey computation?
   * Values are "true" (or "1") and "false" (or "0"). */
  SagCorUsed?: boolean;
  SourceStation?: SourceTrajectoryStation[];
  /** Status of the station. */
  StatusTrajStation?: TrajStationStatus;
  /** A pointer to the intended target of this station. */
  Target?: eml.DataObjectReference;
  ToolErrorModel?: eml.DataObjectReference;
  /** Information about a TrajectoryStation that is relevant for OSDU integration but does not have a natural place in a TrajectoryStation object. */
  TrajectoryStationOSDUIntegration?: TrajectoryStationOSDUIntegration;
  /** The horizontal straight line distance from the trajectory origin (Well surface location) to this trajectory station, calculated using the Pythagorean Theorem from this trajectory station's X and Y Offsets. True Closure Distance is often reported only once for the bottom hole location; however, the value stored in this attribute is the True Closure Distance at this trajectory station. The distance is computed in a local CRS with scale factor one. Often referred to as simply "True Closure" or sometimes referred to as "True Horizontal Displacement". */
  TrueClosure?: eml.LengthMeasure;
  /** The direction angle, in the horizontal plane relative to the True North reference, of the trajectory origin (Well surface location) to this trajectory station, calculated using trigonometry from this trajectory station's X and Y Offsets. The direction is calculated in a True North oriented, local coordinate reference system anchored at the survey origin (Well surface location). This value should be a number between 0.00 and 360.00 degrees; 0.00 and 360.00 represent North, 90.00 is East, 180.00 is South and 270.00 is West. */
  TrueClosureDirection?: eml.PlaneAngleMeasure;
  /** Vertical depth of the measurements. */
  Tvd?: eml.AbstractVerticalDepth;
  /** Delta true vertical depth from previous station. */
  TvdDelta?: eml.LengthMeasure;
  /** The type of tool used for the measurements. */
  TypeSurveyTool?: TypeSurveyTool;
  /** Type of survey station. */
  TypeTrajStation: TrajStationType;
  Valid?: StnTrajValid;
  /** Distance along vertical section azimuth plane. */
  VertSect?: eml.LengthMeasure;
  /** World map latitude based on WGS 84 (EPSG:4326). */
  WGS84Latitude?: eml.PlaneAngleMeasure;
  /** World map longitude based on WGS 84 (EPSG:4326). */
  WGS84Longitude?: eml.PlaneAngleMeasure;
}
export interface TrajectoryStation extends _TrajectoryStation {}

/** Information about a TrajectoryStation that is relevant for OSDU integration but does not have a natural place in a TrajectoryStation object. */
interface _TrajectoryStationOSDUIntegration extends BaseType {
  /** The easting value of the point in the directional survey. Local CRS must be defined. */
  Easting?: eml.LengthMeasureExt;
  /** The northing value of the point in the directional survey. Local CRS must be defined. */
  Northing?: eml.LengthMeasureExt;
  /** The radius of uncertainty distance of this trajectory station. */
  RadiusOfUncertainty?: eml.LengthMeasure;
}
export interface TrajectoryStationOSDUIntegration
  extends _TrajectoryStationOSDUIntegration {}

/** Specifies the status of a trajectory station. */
export type TrajStationStatus = "open" | "rejected" | "position";
interface _TrajStationStatus extends eml._TypeEnum {
  _: TrajStationStatus;
}

/** Specifies the type of directional survey station. */
export type TrajStationType =
  | "azimuth on plane"
  | "buildrate to delta-MD"
  | "buildrate to INCL"
  | "buildrate to MD"
  | "buildrate and turnrate to AZI"
  | "buildrate and turnrate to delta-MD"
  | "buildrate and turnrate to INCL"
  | "buildrate and turnrate to INCL and AZI"
  | "buildrate and turnrate to MD"
  | "buildrate and turnrate to TVD"
  | "buildrate TVD"
  | "casing MD"
  | "casing TVD"
  | "DLS"
  | "DLS to AZI and MD"
  | "DLS to AZI-TVD"
  | "DLS to INCL"
  | "DLS to INCL and AZI"
  | "DLS to INCL and MD"
  | "DLS to INCL and TVD"
  | "DLS to NS"
  | "DLS and toolface to AZI"
  | "DLS and toolface to delta-MD"
  | "DLS and toolface to INCL"
  | "DLS and toolface to INCL-AZI"
  | "DLS and toolface to MD"
  | "DLS and toolface to TVD"
  | "extrapolated"
  | "formation MD"
  | "formation TVD"
  | "hold to delta-MD"
  | "hold to MD"
  | "hold to TVD"
  | "INCL AZI and TVD"
  | "interpolated"
  | "marker MD"
  | "marker TVD"
  | "MD and INCL"
  | "MD INCL and AZI"
  | "N E and TVD"
  | "NS EW and TVD"
  | "target center"
  | "target offset"
  | "tie in point"
  | "turnrate to AZI"
  | "turnrate to delta-MD"
  | "turnrate to MD"
  | "turnrate to TVD"
  | "unknown";
interface _TrajStationType extends eml._TypeEnum {
  _: TrajStationType;
}

export type TrajStationTypeExt = string;
type _TrajStationTypeExt = Primitive._string;

/** Specifies the trajectory station calculation algorithm. */
export type TrajStnCalcAlgorithm =
  | "average angle"
  | "balanced tangential"
  | "constant tool face"
  | "custom"
  | "inertial"
  | "minimum curvature"
  | "radius of curvature"
  | "tangential";
interface _TrajStnCalcAlgorithm extends eml._TypeEnum {
  _: TrajStnCalcAlgorithm;
}

export type TrajStnCalcAlgorithmExt = string;
type _TrajStnCalcAlgorithmExt = Primitive._string;

/** Container element for tubing connection types  or collection of tubing connection types. */
interface _TubingConnectionType extends _AbstractConnectionType {
  /** Tubing connection type. */
  TubingConnectionType: TubingConnectionTypes;
}
export interface TubingConnectionType extends _TubingConnectionType {}

/** Specifies the values for the connection types of tubing. */
export type TubingConnectionTypes =
  | "dogscompressionfit-notsealed"
  | "landed"
  | "latched"
  | "radial"
  | "selfsealing-threaded"
  | "slipfit-sealed"
  | "threaded";
interface _TubingConnectionTypes extends eml._TypeEnum {
  _: TubingConnectionTypes;
}

/** Used to capture information about the configuration of a drill string. For information about a use of this configuration, See the BhaRun object . This object is uniquely identified within the context of one wellbore object. */
interface _Tubular extends eml._AbstractObject {
  /** Maximum hole size generated by the assembly. */
  DiaHoleAssy?: eml.LengthMeasure;
  /** Flag indicating the assembly is a mixed string. The length of the assembly may be made up of joints with different tensile strengths, or collapse resistance and yield strengths. */
  MixedString?: boolean;
  /** Nominal size (diameter) describing the whole assembly, e.g., 9.625", 12.25". */
  NominalDiameter?: eml.LengthMeasure;
  /** Is nuclear tool present?  Values are "true" (or "1") and "false" (or "0"). */
  SourceNuclear?: boolean;
  TubularComponent?: TubularComponent[];
  /** Information about a Tubular that is relevant for OSDU integration but does not have a natural place in a Tubular object. */
  TubularOSDUIntegration?: TubularOSDUIntegration;
  TubularUmbilical?: TubularUmbilical[];
  /** Type of tubular assembly. */
  TypeTubularAssy: TubularAssembly;
  /** Is float valve present?  Values are "true" (or "1") and "false" (or "0"). */
  ValveFloat?: boolean;
  Wellbore: eml.DataObjectReference;
}
export interface Tubular extends _Tubular {}

/** Specifies the type (or purpose) of the tubular assembly. */
export type TubularAssembly =
  | "drilling"
  | "directional drilling"
  | "fishing"
  | "condition mud"
  | "tubing conveyed logging"
  | "cementing"
  | "casing"
  | "clean out"
  | "completion or testing"
  | "coring"
  | "hole opening or underreaming"
  | "milling or dressing or cutting"
  | "wiper or check or reaming"
  | "unknown";
interface _TubularAssembly extends eml._TypeEnum {
  _: TubularAssembly;
}

export type TubularAssemblyExt = string;
type _TubularAssemblyExt = Primitive._string;

/** Tubular Component Schema. Captures the order of the components in the XML instance,which is significant. The components are listed in the order in which they enter the hole. That is, the first component is the bit. */
interface _TubularComponent extends BaseType {
  /** Unique identifier for this instance of TubularComponent */
  uid: eml.String64;
  /** Total area of nozzles. */
  AreaNozzleFlow?: eml.AreaMeasure;
  /** Axial stiffness of tubular. */
  AxialStiffness?: eml.ForcePerLengthMeasure;
  Bend?: Bend[];
  /** Bending stiffness of tubular. */
  BendStiffness?: eml.ForcePerLengthMeasure;
  BitRecord?: BitRecord;
  /** Service class. */
  ClassService?: eml.String64;
  /** Box/Pin configuration. */
  ConfigCon?: BoxPinConfig;
  Connection?: Connection[];
  /** The count number of the same component. */
  Count?: number;
  /** Description of item and details. */
  Description?: eml.String2000;
  /** Closed end displacement. */
  Disp?: eml.VolumeMeasure;
  /** Maximum dogleg severity. */
  DoglegMx?: eml.AnglePerLengthMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Material grade for the tubular section. */
  Grade?: eml.String64;
  HoleOpener?: HoleOpener;
  /** Internal diameter of object. */
  Id: eml.LengthMeasure;
  /** Fish neck inside diameter. */
  IdFishneck?: eml.LengthMeasure;
  Jar?: Jar;
  /** Length of the item. */
  Len: eml.LengthMeasure;
  /** Fish neck length. */
  LenFishneck?: eml.LengthMeasure;
  /** Average length of the joint for this string. */
  LenJointAv?: eml.LengthMeasure;
  /** Pointer to a BusinessAssociate representing the manufacturer of this component. */
  Manufacturer?: eml.DataObjectReference;
  /** Component name from manufacturer. */
  Model?: eml.String64;
  Motor?: Motor;
  MwdTool?: MwdTool;
  /** An identification tag for the component tool. A serial number is a type of identification tag; however, some tags contain many pieces of information. This element only identifies the tag; it does not describe the contents. */
  NameTag?: NameTag[];
  /** Nominal size (diameter) of the component, e.g., 9.625", 12.25". */
  NominalDiameter?: eml.LengthMeasure;
  /** Nominal weight of the component */
  NominalWeight?: eml.MassMeasureExt;
  Nozzle?: Nozzle[];
  /** Number of joints per stand of tubulars. */
  NumJointStand?: number;
  /** Outside diameter of the body of the item. */
  Od: eml.LengthMeasure;
  /** Minimum pass through diameter. */
  OdDrift?: eml.LengthMeasure;
  /** Fish neck outside diameter. */
  OdFishneck?: eml.LengthMeasure;
  /** Maximum outside diameter. */
  OdMx?: eml.LengthMeasure;
  /** Burst pressure. */
  PresBurst?: eml.PressureMeasure;
  /** Collapse pressure. */
  PresCollapse?: eml.PressureMeasure;
  RotarySteerableTool?: RotarySteerableTool;
  /** The sequence within which the components entered the hole. That is, a sequence number of 1 entered first, 2 entered next, etc. */
  Sequence: number;
  Stabilizer?: Stabilizer[];
  /** Fatigue endurance limit. */
  StressFatigue?: eml.PressureMeasure;
  /** Pointer to a BusinessAssociate representing the supplier for this component. */
  Supplier?: eml.DataObjectReference;
  /** Yield stress of steel - worn stress. */
  TensStrength?: eml.PressureMeasureExt;
  /** Yield stress of steel - worn stress. */
  TensYield?: eml.PressureMeasure;
  /** Wall thickness. */
  ThickWall?: eml.LengthMeasure;
  /** Torsional stiffness of tubular. */
  TorsionalStiffness?: eml.ForcePerLengthMeasure;
  /** Torque at which yield occurs. */
  TqYield?: eml.MomentOfForceMeasure;
  /** Information about a TubularComponent that is relevant for OSDU integration but does not have a natural place in a TubularComponent. */
  TubularComponentOSDUIntegration?: TubularComponentOSDUIntegration;
  /** Type of material. */
  TypeMaterial?: MaterialType;
  /** Type of component. */
  TypeTubularComponent: TubularComponentTypeExt;
  /** Wall thickness wear (commonly in percent). */
  WearWall?: eml.LengthPerLengthMeasure;
  /** Weight per unit length. */
  WtPerLen?: eml.MassPerLengthMeasure;
}
export interface TubularComponent extends _TubularComponent {}

/** Information about a TubularComponent that is relevant for OSDU integration but does not have a natural place in a TubularComponent. */
interface _TubularComponentOSDUIntegration extends BaseType {
  /** The depth the packer equipment was set to seal the casing or tubing. */
  PackerSetDepthTvd?: eml.AbstractVerticalDepth;
  /** Size of the Pilot Hole. */
  PilotHoleSize?: eml.LengthMeasure;
  /** Identifier of the Section Type. */
  SectionType?: eml.String64;
  /** Depth of the tubing shoe measured from the surface. */
  ShoeDepthTvd?: eml.AbstractVerticalDepth;
  /** The measured depth of the base from the specific component. */
  TubularComponentBaseMd?: eml.MeasuredDepth;
  /** Depth of the base of the component measured from the Well-Head. */
  TubularComponentBaseReportedTvd?: eml.AbstractVerticalDepth;
  /** The Bottom Connection Type. */
  TubularComponentBottomConnectionType?: eml.String64;
  /** Type of collar used to couple the tubular with another tubing string. */
  TubularComponentBoxPinConfig?: eml.String64;
  /** Specifies the material type constituting the component. */
  TubularComponentMaterialType?: eml.String64;
  /** The Top Connection Type. */
  TubularComponentTopConnectionType?: eml.String64;
  /** The measured depth of the top from the specific component. */
  TubularComponentTopMd?: eml.MeasuredDepth;
  /** Depth of the top of the component measured from the Well-Head. */
  TubularComponentTopReportedTvd?: eml.AbstractVerticalDepth;
}
export interface TubularComponentOSDUIntegration
  extends _TubularComponentOSDUIntegration {}

/** Specifies the types of components that can be used in a tubular string. These are used to specify the type of component and multiple components are used to define a tubular string (Tubular). */
export type TubularComponentType =
  | "accelerator"
  | "adjustable kickoff"
  | "bit core diamond"
  | "bit core PDC"
  | "bit diamond fixed cut"
  | "bit hole opener"
  | "bit insert roller cone"
  | "bit mill tooth roller cone"
  | "bit PDC fixed cutter"
  | "bit under reamer"
  | "bridge plug"
  | "bull plug"
  | "bullnose"
  | "casing"
  | "casing crossover"
  | "casing cutter"
  | "casing head"
  | "casing inflatable packer"
  | "casing shoe screw-in"
  | "catch assembly"
  | "coiled tubing in hole"
  | "coiled tubing on coil"
  | "core barrel"
  | "core orientation barrel"
  | "die collar"
  | "die collar LH"
  | "directional guidance system"
  | "drill collar"
  | "drill collar short"
  | "drill pipe"
  | "drill pipe compressive"
  | "drill pipe LH"
  | "drill stem test BHA"
  | "drive pipe"
  | "dual catch assembly"
  | "extension bowl overshot"
  | "extension sub-overshot"
  | "float collar"
  | "float shoe"
  | "flow head"
  | "guide shoe"
  | "hanger casing subsea"
  | "hanger casing surface"
  | "hanger liner"
  | "hanger mud line"
  | "hanger tubing"
  | "heavy weight drill pipe"
  | "heavy weight drill pipe LH"
  | "jar"
  | "junk basket"
  | "junk basket reverse circulation"
  | "kelly"
  | "keyseat wiper tool"
  | "landing float collar"
  | "lead impression block"
  | "liner"
  | "logging while drilling tool"
  | "magnet"
  | "mill casing cutting"
  | "mill dress"
  | "mill flat bottom"
  | "mill hollow"
  | "mill packer picker assembly"
  | "mill pilot"
  | "mill polish"
  | "mill section"
  | "mill taper"
  | "mill washover"
  | "mill watermelon"
  | "millout extension"
  | "motor"
  | "motor instrumented"
  | "motor steerable"
  | "mule shoe"
  | "multilateral hanger running tool"
  | "MWD hang off sub"
  | "MWD pulser"
  | "non-magnetic collar"
  | "non-magnetic stabilizer"
  | "other"
  | "overshot"
  | "overshot LH"
  | "oversize lip guide overshot"
  | "packer"
  | "packer retrieve TT squeeze"
  | "packer RTTS"
  | "packer storm valve RTTS"
  | "pipe cutter"
  | "polished bore receptacle"
  | "ported stinger"
  | "prepacked screens"
  | "reamer"
  | "reversing tool"
  | "riser high pressure"
  | "riser marine"
  | "riser production"
  | "rotary steering tool"
  | "running tool"
  | "safety joint"
  | "safety joint LH"
  | "scab liner bit guide"
  | "scraper"
  | "scratchers"
  | "slotted liner"
  | "spear"
  | "stabilizer"
  | "stabilizer inline"
  | "stabilizer near bit"
  | "stabilizer near bit roller reamer"
  | "stabilizer non-rotating"
  | "stabilizer steerable"
  | "stabilizer string"
  | "stabilizer string roller reamer"
  | "stabilizer turbo back"
  | "stabilizer variable blade"
  | "stage cement collar"
  | "sub-bar catcher"
  | "sub-bent"
  | "sub-bit"
  | "sub-bumper"
  | "sub-catcher"
  | "sub-circulation"
  | "sub-cone"
  | "sub-crossover"
  | "sub-dart"
  | "sub-filter"
  | "sub-float"
  | "sub-jetting"
  | "sub-junk"
  | "sub-orienting"
  | "sub-ported"
  | "sub-pressure relief"
  | "sub-pump out"
  | "sub-restrictor"
  | "sub-saver"
  | "sub-shock"
  | "sub-side entry"
  | "sub-stop"
  | "surface pipe"
  | "taper tap"
  | "taper tap LH"
  | "thruster"
  | "tieback polished bore receptacle"
  | "tieback stinger"
  | "tubing"
  | "tubing-conveyed perforating gun"
  | "turbine"
  | "unknown"
  | "washover pipe"
  | "whipstock"
  | "whipstock anchor";
interface _TubularComponentType extends eml._TypeEnum {
  _: TubularComponentType;
}

export type TubularComponentTypeExt = string;
type _TubularComponentTypeExt = Primitive._string;

/** Information about a Tubular that is relevant for OSDU integration but does not have a natural place in a Tubular object. */
interface _TubularOSDUIntegration extends BaseType {
  /** Indicates if the Assembly is activated or not. */
  ActiveIndicator?: boolean;
  /** Used to describe if it belongs to a RunActivity or to a PullActivity. */
  ActivityType?: eml.String64;
  /** Used to describe the reason of Activity - such as cut/pull, pulling, ... */
  ActivityTypeReasonDescription?: eml.String64;
  /** Type of Artificial Lift used (could be "Surface Pump" / "Submersible Pump" / "Gas Lift" ...) */
  ArtificialLiftType?: eml.String64;
  /** The measured depth of the base from the whole assembly. */
  AssemblyBaseMd?: eml.MeasuredDepth;
  /** Depth of the base of the Assembly measured from the Well-Head. */
  AssemblyBaseReportedTvd?: eml.AbstractVerticalDepth;
  /** The measured depth of the top from the whole assembly. */
  AssemblyTopMd?: eml.MeasuredDepth;
  /** Depth of the top of the Assembly measured from the Well-Head. */
  AssemblyTopReportedTvd?: eml.AbstractVerticalDepth;
  /** This reference table describes the type of liner used in the borehole. For example, slotted, gravel packed or pre-perforated etc. */
  LinerType?: eml.String64;
  /** Record that reflects the status of the Assembly - as 'installed', 'pulled', 'planned',... - Applicable to tubing/completions as opposed to drillstrings. */
  OSDUTubularAssemblyStatus?: OSDUTubularAssemblyStatus;
  /** Optional - Identifier of the parent assembly (in case of side-track, multi-nesting, ...) - The Concentric Tubular model is used to identify the Assembly that an Assembly sits inside e.g. Surface Casing set inside Conductor, Tubing set inside Production Casing, a Bumper Spring set inside a Production Tubing Profile Nipple, Liner set inside Casing, etc. This is needed to enable a Digital Well Sketch application to understand relationships between Assemblies and their parent Wellbores. */
  Parent?: eml.DataObjectReference;
  /** Diameter of the Pilot Hole. */
  PilotHoleSize?: eml.LengthMeasure;
  /** The distance that the assembly has penetrated below the surface of the sea floor. */
  SeaFloorPenetrationLength?: eml.LengthMeasure;
  /** Descriptor for Assembly, e.g. Production, Surface, Conductor, Intermediate, Drilling. */
  StringClass?: eml.String64;
  /** In case of multi-nesting of assemblies, the 'point' is the Measured Depth of the top of the assembly though with PBRs the Suspension Point may not be the top. */
  SuspensionPointMd?: eml.MeasuredDepth;
  /** Sequence of the TubularAssembly (Typically BHA sequence). */
  TubularAssemblyNumber?: number;
}
export interface TubularOSDUIntegration extends _TubularOSDUIntegration {}

/** An umbilical is any control, power or sensor cable or tube run through an outlet on the wellhead down to a particular receptacle on a downhole component (power or hydraulic line) or simply to a specific depth (sensors). Examples include Gas lift injection tube, Subsea valve control line, ESP power cable, iWire for external gauges, external Fiber Optic Sensor cable. Umbilicals are run outside of the casing or completion assembly and are typically attached by clamps. Umbilicals are run in hole same time as the host assembly. Casing Umbilicals may be cemented in place e.g. Fiber Optic. */
interface _TubularUmbilical extends BaseType {
  /** The Tubular component the umbilical is connected to. */
  ConnectedTubularComponent: eml.ComponentReference;
  /** A cut in the umbilical. */
  Cut?: TubularUmbilicalCut[];
  /** The Type of Service the umbilical is facilitating. */
  ServiceType?: eml.String64;
  /** Information about a TubularUmbilical that is relevant for OSDU integration but does not have a natural place in a TubularUmbilical. */
  TubularUmbilicalOSDUIntegration?: TubularUmbilicalOSDUIntegration;
  /** The type of umbilical. */
  UmbilicalType: eml.String64;
}
export interface TubularUmbilical extends _TubularUmbilical {}

/** Information about a cut in a TubularUmbilical. */
interface _TubularUmbilicalCut extends BaseType {
  /** The date the cut happened. */
  CutDate?: eml.TimeStamp;
  /** Measured Depth at which the cut has happened. */
  CutMd?: eml.MeasuredDepth;
  /** Flag indicating whether the cut is accidental or not. */
  IsAccidental?: boolean;
}
export interface TubularUmbilicalCut extends _TubularUmbilicalCut {}

/** Information about a TubularUmbilical that is relevant for OSDU integration but does not have a natural place in a TubularUmbilical. */
interface _TubularUmbilicalOSDUIntegration extends BaseType {
  /** The Wellhead Outlet the Umbilical is connected to. */
  WellheadOutletKey?: eml.String64;
}
export interface TubularUmbilicalOSDUIntegration
  extends _TubularUmbilicalOSDUIntegration {}

/** Specifies values for the type of directional survey tool; a very generic classification. */
export type TypeSurveyTool =
  | "gyroscopic inertial"
  | "gyroscopic MWD"
  | "gyroscopic north seeking"
  | "magnetic multiple-shot"
  | "magnetic MWD"
  | "magnetic single-shot";
interface _TypeSurveyTool extends eml._TypeEnum {
  _: TypeSurveyTool;
}

export type TypeSurveyToolExt = string;
type _TypeSurveyToolExt = Primitive._string;

/** Information on waiting event. */
interface _WaitingOnExtension extends _AbstractEventExtension {
  /** Business organization waiting on */
  BusinessOrgWaitingOn?: eml.String64;
  /** Code for charge type */
  ChargeTypeCode?: eml.String64;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Flag indicating whether producer is charged or not */
  IsNoChargeToProducer?: boolean;
  /** Sub category */
  SubCategory?: eml.String64;
}
export interface WaitingOnExtension extends _WaitingOnExtension {}

/** Operations Weather Component Schema. */
interface _Weather extends BaseType {
  /** Unique identifier for this instance of Weather */
  uid: eml.String64;
  /** Pointer to a BusinessAssociate representing the company that supplied the weather data. */
  Agency?: eml.DataObjectReference;
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
  /** The Beaufort wind force scale is a system used to estimate and report wind speeds when no measuring apparatus is available. It was invented in the early 19th century by Admiral Sir Francis Beaufort of the British Navy as a way to interpret winds from conditions. Values range from 0 (calm) to 12 (hurricane force). */
  BeaufortScaleNumber?: BeaufortScaleIntegerCode;
  /** Height of cloud cover. */
  CeilingCloud?: eml.LengthMeasure;
  /** Comments and remarks. */
  Comments?: eml.String2000;
  /** Description of cloud cover. */
  CoverCloud?: eml.String64;
  /** The speed of the ocean current. */
  CurrentSea?: eml.LengthPerTimeMeasure;
  /** Date and time the information is related to. */
  DTim: eml.TimeStamp;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Average height of the waves. */
  HtWave?: eml.LengthMeasure;
  /** The maximum wave height. */
  MaxWave?: eml.LengthMeasure;
  /** The elapsed time between the passing of two wave tops. */
  PeriodWave?: eml.TimeMeasure;
  /** An average of the higher 1/3 of the wave heights passing during a  sample period (typically 20 to 30 minutes). */
  SignificantWave?: eml.LengthMeasure;
  /** Sea temperature. */
  Tempsea?: eml.ThermodynamicTemperatureMeasure;
  /** Minimum temperature above ground. Temperature of the atmosphere. */
  TempSurfaceMn?: eml.ThermodynamicTemperatureMeasure;
  /** Maximum temperature above ground. */
  TempSurfaceMx?: eml.ThermodynamicTemperatureMeasure;
  /** A measure of the combined chilling effect of wind and low temperature on living things, also named chill factor, e.g., according to the US weather service table, an air temperature of 30 degF with a 10 mph corresponds to a windchill of 22 degF. */
  TempWindChill?: eml.ThermodynamicTemperatureMeasure;
  /** Type of precipitation. */
  TypePrecip?: eml.String64;
  /** Wind speed. */
  VelWind?: eml.LengthPerTimeMeasure;
  /** Horizontal visibility. */
  Visibility?: eml.LengthMeasure;
}
export interface Weather extends _Weather {}

interface _WeightingFunction extends eml._AbstractObject {
  AzimuthFormula: AzimuthFormula;
  Comment?: eml.String2000;
  ContinuousAzimuthFormula?: ContinuousAzimuthFormula[];
  DepthFormula: eml.String2000;
  InclinationFormula: eml.String2000;
  Kind?: ErrorKind;
  SingularityEastFormula?: eml.String2000;
  SingularityNorthFormula?: eml.String2000;
  SingularityVerticalFormula?: eml.String2000;
  Source?: eml.String64[];
}
export interface WeightingFunction extends _WeightingFunction {}

interface _WeightingFunctionDictionary extends eml._AbstractObject {
  WeightingFunction: WeightingFunction[];
}
export interface WeightingFunctionDictionary
  extends _WeightingFunctionDictionary {}

/** Used to capture the general information about a well. Sometimes  called a "well header". Contains all information that is the same for all wellbores (sidetracks). */
interface _Well extends eml._AbstractActiveObject {
  /** Basin in which the well is located. */
  Basin?: eml.String64;
  /** Block name in which the well is located. */
  Block?: eml.String64;
  /** Country in which the well is located. */
  Country?: eml.String64;
  /** County in which the well is located. */
  County?: eml.String64;
  /** Pointer to a BusinessAssociate representing the company providing the data in this well object. */
  DataSourceOrganization?: eml.DataObjectReference;
  /** POSC well direction. The direction of the flow of the fluids in a well facility (generally, injected or produced, or some combination). */
  DirectionWell?: WellDirection;
  /** Geo-political district name. */
  District?: eml.String64;
  /** Date and time the license  was issued. */
  DTimLicense?: eml.TimeStamp;
  /** Date and time at which the well was plugged and abandoned. */
  DTimPa?: eml.TimeStamp;
  /** Date and time at which the well was spudded. */
  DTimSpud?: eml.TimeStamp;
  /** Name of the field in which the well is located. */
  Field?: eml.String64;
  /** POSC well fluid. The type of fluid being produced from or injected
   * into a well facility. */
  FluidWell?: WellFluid;
  GroundElevation?: eml.AbstractElevation;
  /** The approximate 2D well location. Intended for use cases where a low-fidelity, approximate location are acceptable such as displaying the well on a map in a dashboard. */
  InformationalGeographicLocationWGS84?: eml.Geographic2dPosition;
  InformationalProjectedLocation?: eml.Projected2dPosition;
  /** Reasons for interest in the well or information about the well. */
  InterestType?: WellInterestExt;
  /** The history of license numbers for the well. */
  LicenseHistory?: LicensePeriod[];
  /** The well's life cycle state history. */
  LifeCycleHistory?: eml.FacilityLifecyclePeriod[];
  /** The well's life cycle state (e.g., planning, constructing, operating, closing, closed). */
  LifeCycleState?: eml.FacilityLifecycleStateExt;
  /** Legal name of the well. */
  NameLegal?: eml.String64;
  /** American Petroleum Institute well number. */
  NumAPI?: eml.String64;
  /** Government assigned well number. */
  NumGovt?: eml.String64;
  /** License number of the well. */
  NumLicense?: eml.String64;
  /** Environment in which the well operates (e.eg, onshore, offshore, etc.). */
  OperatingEnvironment?: OperatingEnvironmentExt;
  /** Pointer to a BusinessAssociate representing the operating company. */
  Operator?: eml.DataObjectReference;
  /** Division of the operator company. */
  OperatorDiv?: eml.String64;
  /** The history of operators for the well optionally including the dates and times that they were operators. If provided, the first operator should be the same as OriginalOperator and the last operator should be the same as Operator. */
  OperatorHistory?: eml.FacilityOperator[];
  /** Pointer to a BusinessAssociate representing the original operator of the well. This may be different than the current operator. */
  OriginalOperator?: eml.DataObjectReference;
  /** Interest for operator. Commonly in percent. */
  PcInterest?: eml.DimensionlessMeasure;
  /** Play in which the well is located. */
  Play?: eml.String64;
  /** Prospect in which the well is located. */
  Prospect?: eml.String64;
  /** History of the well's POSC well purpose. */
  PurposeHistory?: WellPurposePeriod[];
  /** POSC well purpose. */
  PurposeWell?: WellPurpose;
  /** Geo-political region in which the well is located. */
  Region?: eml.String64;
  /** The well's slot name. */
  SlotName?: eml.String64;
  /** State or province in which the well is located. */
  State?: eml.String64;
  /** History of the well's POSC well status. */
  StatusHistory?: eml.WellStatusPeriod[];
  /** POSC well status. */
  StatusWell?: eml.WellStatus;
  /** The time zone in which the well is located. It is the deviation in hours and minutes from UTC. This should be the normal time zone at the well and not a seasonally-adjusted value, such as daylight savings time. */
  TimeZone?: eml.TimeZone;
  /** A human-readable unique identifier assigned to the well. Commonly referred to as a UWI. */
  UniqueIdentifier?: eml.String64;
  /** Depth of water (not land rigs). */
  WaterDepth?: eml.LengthMeasure;
  WellheadElevation?: eml.AbstractElevation;
  /** The surface location of the well. This is shared by all wellbores within the well. */
  WellSurfaceLocation?: eml.AbstractPosition[];
}
export interface Well extends _Well {}

/** Used to capture the general information about a wellbore. A wellbore represents the path from the parent Well’s surface location to a unique bottomhole location. The wellbore object is uniquely identified within the context of one well object. */
interface _Wellbore extends eml._AbstractActiveObject {
  /** True ("true" of "1") indicates that the wellbore has
   * acheieved total depth. That is, drilling has completed. False ("false" or "0") indicates otherwise.
   * Not given indicates that it is not known whether total depth has been reached. */
  AchievedTD?: boolean;
  /** Pointer to a BusinessAssociate representing the company providing the data in this wellbore object. */
  DataSourceOrganization?: eml.DataObjectReference;
  /** Target days for drilling wellbore. */
  DayTarget?: eml.TimeMeasure;
  DefaultMdDatum?: eml.DataObjectReference;
  DefaultTvdDatum?: eml.DataObjectReference;
  /** Date and time of wellbore kickoff. */
  DTimKickoff?: eml.TimeStamp;
  /** POSC well fluid. The type of fluid being produced from or injected into a wellbore facility. */
  FluidWellbore?: WellFluid;
  /** The bottom hole location in geographic coordinates. Location MUST be a geographic position. */
  GeographicBottomHoleLocation?: BottomHoleLocation;
  /** The history of license numbers for the wellbore. */
  LicenseHistory?: LicensePeriod[];
  /** The wellbore's life cycle state history. */
  LifecycleHistory?: eml.FacilityLifecyclePeriod[];
  /** The wellbore's lifecycle state (e.g., planning, constructing, operating, closing, closed). */
  LifecycleState?: eml.FacilityLifecycleStateExt;
  /** The measured depth of the borehole.
   * If status is plugged, indicates the maximum depth reached before plugging.
   * It is recommended that this value be updated about every 10 minutes by an assigned
   * raw data provider at a site. */
  Md?: eml.MeasuredDepth;
  /** The measured depth of the bit.
   * If isActive=false then this value is not relevant.
   * It is recommended that this value be updated about every 10 minutes by an assigned
   * raw data provider at a site. */
  MdBit?: eml.MeasuredDepth;
  /** Kickoff measured depth of the wellbore. */
  MdKickoff?: eml.MeasuredDepth;
  /** Planned measured depth for the wellbore total depth. */
  MdPlanned?: eml.MeasuredDepth;
  /** Planned measured for the wellbore total depth - with respect to seabed. */
  MdSubSeaPlanned?: eml.MeasuredDepth;
  /** Operator borehole number. */
  Number?: eml.String64;
  /** Government assigned number. */
  NumGovt?: eml.String64;
  /** License number of the wellbore. */
  NumLicense?: eml.String64;
  /** Pointer to a BusinessAssociate representing the operating company. */
  Operator?: eml.DataObjectReference;
  /** The history of operators for the wellbore optionally including the dates and times that they were operators. If provided, the first operator should be the same as OriginalOperator and the last operator should be the same as Operator. */
  OperatorHistory?: eml.FacilityOperator[];
  /** Pointer to a BusinessAssociate representing the original operator of the wellbore. This may be different than the current operator. */
  OriginalOperator?: eml.DataObjectReference;
  ParentWellbore?: eml.DataObjectReference;
  /** The bottom hole location in projected coordinates. Location MUST be a projected position. */
  ProjectedBottomHoleLocation?: BottomHoleLocation;
  /** History of the wellbore's POSC well purpose. */
  PurposeHistory?: WellPurposePeriod[];
  /** POSC wellbore purpose. */
  PurposeWellbore?: WellPurpose;
  /** POSC wellbore trajectory shape. */
  Shape?: WellboreShape;
  /** The well's slot name. */
  SlotName?: eml.String64;
  /** History of the wellbore's POSC well status. */
  StatusHistory?: eml.WellStatusPeriod[];
  /** POSC wellbore status. */
  StatusWellbore?: eml.WellStatus;
  /** API suffix. */
  SuffixAPI?: eml.String64;
  /** A formation of interest for which the Wellbore is drilled to interact with. */
  TargetFormation?: eml.String64[];
  /** Pointer to a RESQML GeologicUnitInterpretation that represents a geologic unit of interest for which the Wellbore is drilled to interact with. */
  TargetGeologicUnitInterpretation?: eml.DataObjectReference;
  /** The  true vertical depth of the borehole.
   * If status is plugged, indicates the maximum depth reached before plugging.
   * It is recommended that this value be updated about every 10 minutes by an assigned
   * raw data provider at a site. */
  Tvd?: eml.AbstractVerticalDepth;
  /** The true vertical depth of the bit.
   * If isActive=false then this value is not relevant.
   * It is recommended that this value be updated about every 10 minutes by an assigned
   * raw data provider at a site. */
  TvdBit?: eml.AbstractVerticalDepth;
  /** Kickoff true vertical depth of the wellbore. */
  TvdKickoff?: eml.AbstractVerticalDepth;
  /** Planned true vertical depth for the wellbore total depth. */
  TvdPlanned?: eml.AbstractVerticalDepth;
  /** Planned true vertical depth for the wellbore total depth - with respect to seabed. */
  TvdSubSeaPlanned?: eml.AbstractVerticalDepth;
  /** Type of wellbore. */
  TypeWellbore?: WellboreType;
  /** A human-readable unique identifier assigned to the wellbore. Commonly referred to as a UWI. */
  UniqueIdentifier?: eml.String64;
  Well: eml.DataObjectReference;
}
export interface Wellbore extends _Wellbore {}

/** The transferrable class of the WellboreCompletion object. Each individual wellbore completion data object represents a completion (i.e., open to flow) interval along a wellbore. Meaning “this section of wellbore is open to flow”. */
interface _WellboreCompletion extends eml._AbstractObject {
  /** Overall measured depth interval for this wellbore completion. */
  CompletionMdInterval?: eml.MdInterval;
  /** Overall true vertical depth interval for this wellbore completion. */
  CompletionTvdInterval?: eml.AbstractTvdInterval;
  ContactIntervalSet?: ContactIntervalSet;
  /** Status (active, planned, suspended, testing, etc.) of the wellbore completion */
  CurrentStatus?: CompletionStatus;
  /** The WellboreCompletion event information. */
  EventHistory?: EventInfo[];
  ReferenceWellbore: eml.DataObjectReference;
  /** Date for when the status was established. */
  StatusDate?: eml.TimeStamp;
  StatusHistory?: CompletionStatusHistory[];
  /** API suffix. */
  SuffixAPI?: eml.String64;
  /** Preferred alias name. */
  WellboreCompletionAlias?: eml.String64;
  /** Completion date. */
  WellboreCompletionDate?: eml.TimeStamp;
  /** CompletionNo, etc. API14. */
  WellboreCompletionNo?: eml.String64;
  WellCompletion?: eml.DataObjectReference;
}
export interface WellboreCompletion extends _WellboreCompletion {}

/** Specified the location where cement job fluid can be found. */
export type WellboreFluidLocation =
  | "annulus"
  | "deadend"
  | "in pipe"
  | "rat hole";
interface _WellboreFluidLocation extends eml._TypeEnum {
  _: WellboreFluidLocation;
}

/** The transferrable class of the WellboreGeology object. */
interface _WellboreGeology extends eml._AbstractActiveObject {
  /** Business Rule: This MUST point to the same wellbore that the Wellbore element on the containing WellboreGeology object points to. */
  CuttingsGeology?: CuttingsGeology;
  InterpretedGeology?: InterpretedGeology;
  /** [maintained by the server] The interval that contains the minimum and maximum measured depths for all wellbore geology types under this wellbore geology entry. */
  MdInterval: eml.MdInterval;
  ShowEvaluation?: ShowEvaluation;
  Wellbore: eml.DataObjectReference;
}
export interface WellboreGeology extends _WellboreGeology {}

/** Used to capture information about the configuration of the permanently installed components in a wellbore. This object is uniquely identified within the context of one wellbore object. */
interface _WellboreGeometry extends eml._AbstractMdGrowingObject {
  BhaRun?: eml.DataObjectReference[];
  /** Water depth. */
  DepthWaterMean?: eml.LengthMeasureExt;
  /** Air gap. */
  GapAir?: eml.LengthMeasureExt;
  Wellbore: eml.DataObjectReference;
  WellboreGeometrySection?: WellboreGeometrySection[];
}
export interface WellboreGeometry extends _WellboreGeometry {}

/** Captures information for a report including wellbore geometry. */
interface _WellboreGeometryReport extends BaseType {
  /** Water depth. */
  DepthWaterMean?: eml.LengthMeasureExt;
  /** Air gap. */
  GapAir?: eml.LengthMeasureExt;
  WellboreGeometrySection?: WellboreGeometrySection[];
}
export interface WellboreGeometryReport extends _WellboreGeometryReport {}

/** Wellbore Geometry Component Schema. Defines the "fixed" components in a wellbore. It does not define the "transient" drilling strings or the "hanging" production components. */
interface _WellboreGeometrySection extends eml._AbstractMdIntervalGrowingPart {
  BhaRun?: eml.DataObjectReference[];
  /** Curved conductor? Values are "true" (or "1") and "false" (or "0"). */
  CurveConductor?: boolean;
  /** The drift diameter is the inside diameter (ID) that the pipe manufacturer guarantees per specifications. Note that the nominal inside diameter is not the same as the drift diameter, but is always slightly larger. The drift diameter is used by the well planner to determine what size tools or casing strings can later be run through the casing, whereas the nominal inside diameter is used for fluid volume calculations, such as mud circulating times and cement slurry placement calculations.
   * Source: www.glossary.oilfield.slb.com */
  DiaDrift?: eml.LengthMeasure;
  /** Friction factor. */
  FactFric?: number;
  /** Material grade for the tubular section. */
  Grade?: eml.String64;
  /** Inner diameter. */
  IdSection?: eml.LengthMeasure;
  /** Outer diameter. Only for casings and risers. */
  OdSection?: eml.LengthMeasure;
  /** True vertical depth interval for this wellbore geometry section. */
  SectionTvdInterval?: eml.AbstractTvdInterval;
  /** Type of fixed component. */
  TypeHoleCasing?: HoleCasingType;
  /** Weight per unit length for casing sections. */
  WtPerLen?: eml.MassPerLengthMeasure;
}
export interface WellboreGeometrySection extends _WellboreGeometrySection {}

/** Used to capture information about a geologic formation that was encountered in a wellbore. This object is uniquely identified within the context of one wellbore object. */
interface _WellboreMarker extends eml._AbstractObject {
  /** The name of a geochronology for this marker, with the "kind" attribute specifying the geochronological time span. */
  ChronostratigraphicTop?: GeochronologicalUnit;
  /** Angle of dip with respect to horizontal. This is the true dip of the geologic surface, not the apparent dip measured locally by a tool. */
  DipAngle?: eml.PlaneAngleMeasure;
  /** Interpreted downdip direction. */
  DipDirection?: eml.PlaneAngleMeasure;
  /** Specifies the definition of north. While this is optional because of legacy data, it is strongly recommended that this always be specified. */
  DipDirectionRef?: eml.NorthReferenceKind;
  /** The geologic age associated with the marker. */
  GeologicAge?: eml.TimeMeasureExt;
  /** Reference to a RESQML geologic unit interpretation that this marker is characterizing. */
  GeologicUnitInterpretation?: eml.DataObjectReference;
  /** Measured depth interval that marks the limit of the high confidence range for the marker pick. */
  HighConfidenceMdInterval?: eml.MdInterval;
  /** Specifies the unit of lithostratigraphy. */
  LithostratigraphicTop?: LithostratigraphicUnit;
  /** Qualifier for markers that may be missing or need additional information carried about them. */
  MarkerQualifier?: MarkerQualifierExt;
  /** Logged measured depth at the top of marker.
   *
   * IMMUTABLE. Set on object creation and MUST NOT change thereafter. Customer provided changes after creation are an error. None of the sub-elements on the MarkerSetInterval can be changed, */
  Md: eml.MeasuredDepth;
  /** The observation number for this marker. This may be used, for example, to distinguish it from other marker observations recorded on the same date and/or with the same name. */
  ObservationNumber?: number;
  /** The point of interest in a wellbore that this marker represents. Should be populated if WellboreMarkerKind is point of interest. */
  PointOfInterest?: WellborePointOfInterestExt;
  /** The kind of stratigraphy this marker represents. Should be populated if WellboreMarkerKind is stratigraphic. */
  StratigraphyKind?: StratigraphyKindExt;
  /** An optional, additional qualifier on the kind of stratigraphy this marker represents. */
  StratigraphyKindQualifier?: StratigraphyKindQualifierExt;
  Trajectory?: eml.DataObjectReference;
  /** Logged true vertical depth at top of marker. */
  Tvd?: eml.AbstractVerticalDepth;
  Wellbore?: eml.DataObjectReference;
  /** A high level classification of what this marker represents: stratigraphic information, a point of interest in a well or something else. */
  WellboreMarkerKind?: WellboreMarkerKindExt;
}
export interface WellboreMarker extends _WellboreMarker {}

export type WellboreMarkerKind = "point of interest" | "stratigraphic";
interface _WellboreMarkerKind extends eml._TypeEnum {
  _: WellboreMarkerKind;
}

export type WellboreMarkerKindExt = string;
type _WellboreMarkerKindExt = Primitive._string;

/** A collection of wellbore markers. */
interface _WellboreMarkerSet extends eml._AbstractObject {
  FormationMarker?: WellboreMarker[];
  /** Measured depth interval that contains the shallowest and deepest formation markers. This is computed by the server and is read only.
   *
   * STORE MANAGED. This is populated by a store on read. Customer provided values are ignored on write */
  MarkerSetInterval: eml.MdInterval;
  Wellbore?: eml.DataObjectReference;
}
export interface WellboreMarkerSet extends _WellboreMarkerSet {}

export type WellborePointOfInterest =
  | "bottomhole location"
  | "first perforation"
  | "kickoff point"
  | "landing point"
  | "last perforation";
interface _WellborePointOfInterest extends eml._TypeEnum {
  _: WellborePointOfInterest;
}

export type WellborePointOfInterestExt = string;
type _WellborePointOfInterestExt = Primitive._string;

/** Specifies values to represent the classification of a wellbore based on its shape. The source of the values and the descriptions is the POSC V2.2 "facility class" standard instance values in classification system "POSC wellbore trajectory shape". */
export type WellboreShape =
  | "build and hold"
  | "deviated"
  | "double kickoff"
  | "horizontal"
  | "S-shaped"
  | "vertical";
interface _WellboreShape extends eml._TypeEnum {
  _: WellboreShape;
}

/** Specifies the values for the classification of a wellbore with respect to its parent well/wellbore. */
export type WellboreType =
  | "bypass"
  | "initial"
  | "redrill"
  | "reentry"
  | "respud"
  | "sidetrack";
interface _WellboreType extends eml._TypeEnum {
  _: WellboreType;
}

/** Information regarding details of Jobs & Events */
interface _WellCMLedger extends eml._AbstractObject {
  /** Activity code */
  ActivityCode?: DrillActivityCode;
  /** Service company or business */
  BusinessAssociate?: eml.DataObjectReference;
  /** Comment on this ledger */
  Comment?: eml.String2000;
  /** Contact name or person to get in touch with. Might not necessarily be the person responsible. */
  Contact?: eml.String64;
  Cost?: DayCost[];
  /** Description of this ledger */
  Description?: eml.String2000;
  DownholeComponentReference?: DownholeComponentReference;
  /** Date and time that activities were completed. */
  DTimEnd?: eml.TimeStamp;
  /** Date and time that activities started. */
  DTimStart?: eml.TimeStamp;
  /** The activity duration (commonly in hours). */
  Duration?: eml.TimeMeasure;
  EventExtension?: AbstractEventExtension[];
  /** Order number of event. */
  EventOrder?: number;
  EventType?: EventType;
  /** True if planned. */
  IsPlan?: boolean;
  /** Measured depth interval for this activity. */
  MdInterval?: eml.MdInterval;
  /** True if event is not productive. */
  Nonproductive?: boolean;
  /** Parent event reference id. */
  ParentEvent?: eml.DataObjectReference;
  Participant?: Participant;
  /** Phase (large activity classification) e.g. Drill Surface Hole. */
  Phase?: eml.String64;
  /** True of event is for preventive maintenance */
  PreventiveMaintenance?: boolean;
  /** Name or information about person responsible who is implementing the service or job. */
  ResponsiblePerson?: eml.String64;
  /** RigUtilization data object reference. */
  Rig?: eml.DataObjectReference[];
  /** True if event implies is in-trouble */
  Trouble?: boolean;
  /** Comment on type of this event, either referring to a job type or an  activity type e.g. a safety meeting. */
  Type?: EventType;
  /** True if there is no planning infomation for this activity. */
  Unplanned?: boolean;
  Wellbore: eml.DataObjectReference;
  /** Extension event for work order id. */
  WorkOrderID?: eml.String64;
}
export interface WellCMLedger extends _WellCMLedger {}

/** Information regarding  a wellhead stream with one or more wellbore completions (completed zones) in the well. */
interface _WellCompletion extends eml._AbstractObject {
  /** Status (active, planned, suspended, testing, etc.) of the well completion. */
  CurrentStatus?: CompletionStatus;
  /** Documents exploration and production rights. */
  E_P_RightsID?: eml.String64;
  /** Field date. */
  EffectiveDate?: eml.TimeStamp;
  /** Expiration date. */
  ExpiredDate?: eml.TimeStamp;
  /** Field code. */
  FieldCode?: eml.String64;
  /** Field ID. */
  FieldID?: eml.String64;
  /** Field type. */
  FieldType?: eml.String64;
  /** Timestamp for when this status was established. */
  StatusDate?: eml.TimeStamp;
  StatusHistory?: CompletionStatusHistory[];
  Well: eml.DataObjectReference;
}
export interface WellCompletion extends _WellCompletion {}

/** Specifies the type of a well control incident. */
export type WellControlIncidentType =
  | "shallow gas kick"
  | "water kick"
  | "oil kick"
  | "gas kick";
interface _WellControlIncidentType extends eml._TypeEnum {
  _: WellControlIncidentType;
}

/** Specifies values for the direction of flow of the fluids in a well facility (generally, injected or produced, or some combination). */
export type WellDirection =
  | "huff-n-puff"
  | "injector"
  | "producer"
  | "uncertain";
interface _WellDirection extends eml._TypeEnum {
  _: WellDirection;
}

/** Specifies values for the type of fluid being produced from or injected into a well facility. */
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

/** Reasons for interest in the well or information about the well. */
export type WellInterest =
  | "operated"
  | "non-operated joint venture"
  | "competitor";
interface _WellInterest extends eml._TypeEnum {
  _: WellInterest;
}

export type WellInterestExt = string;
type _WellInterestExt = Primitive._string;

/** Specifies the type of procedure used to stop (kill) the flow of formation fluids into a well. A well-killing procedure may be planned or unplanned. The particular situation determines what type of procedure is used. */
export type WellKillingProcedureType =
  | "drillers method"
  | "wait and weight"
  | "bullheading"
  | "lubricate and bleed"
  | "forward circulation"
  | "reverse circulation";
interface _WellKillingProcedureType extends eml._TypeEnum {
  _: WellKillingProcedureType;
}

/** Specifies values that represent the classification of a well or wellbore by the purpose for which it was initially drilled. */
export type WellPurpose =
  | "appraisal"
  | "appraisal -- confirmation appraisal"
  | "appraisal -- exploratory appraisal"
  | "exploration"
  | "exploration -- deeper-pool wildcat"
  | "exploration -- new-field wildcat"
  | "exploration -- new-pool wildcat"
  | "exploration -- outpost wildcat"
  | "exploration -- shallower-pool wildcat"
  | "development"
  | "development -- infill development"
  | "development -- injector"
  | "development -- producer"
  | "fluid storage"
  | "fluid storage -- gas storage"
  | "general srvc"
  | "general srvc -- borehole re-acquisition"
  | "general srvc -- observation"
  | "general srvc -- relief"
  | "general srvc -- research"
  | "general srvc -- research -- drill test"
  | "general srvc -- research -- strat test"
  | "general srvc -- waste disposal"
  | "mineral";
interface _WellPurpose extends eml._TypeEnum {
  _: WellPurpose;
}

/** This class is used to represent a period of time when a facility had a consistent WellPurpose. */
interface _WellPurposePeriod extends BaseType {
  /** The date and time when the purpose ended. */
  EndDateTime?: eml.TimeStamp;
  /** The facility's purpose. */
  Purpose: WellPurpose;
  /** The date and time when the purpose started. */
  StartDateTime?: eml.TimeStamp;
}
export interface WellPurposePeriod extends _WellPurposePeriod {}

/** Specifies the type of well test conducted. */
export type WellTestType = "drill stem test" | "production test";
interface _WellTestType extends eml._TypeEnum {
  _: WellTestType;
}

/** Measurement of average weight on bit and channel from which the data was calculated. */
interface _WobStatistics extends BaseType {
  /** Average weight on bit through the interval. */
  Average: eml.ForceMeasure;
  /** Log channel from which the WOB statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface WobStatistics extends _WobStatistics {}

interface _XyAccelerometer extends BaseType {
  CantAngle: eml.PlaneAngleMeasureExt;
  Switching: boolean;
}
export interface XyAccelerometer extends _XyAccelerometer {}

export interface document extends BaseType {
  BhaRun: BhaRun;
  CementJob: CementJob;
  CementJobEvaluation: CementJobEvaluation;
  Channel: Channel;
  ChannelKind: ChannelKind;
  ChannelKindDictionary: ChannelKindDictionary;
  ChannelSet: ChannelSet;
  CuttingsGeology: CuttingsGeology;
  CuttingsGeologyInterval: CuttingsGeologyInterval;
  DepthRegImage: DepthRegImage;
  DownholeComponent: DownholeComponent;
  DrillReport: DrillReport;
  ErrorTerm: ErrorTerm;
  ErrorTermDictionary: ErrorTermDictionary;
  FluidsReport: FluidsReport;
  InterpretedGeology: InterpretedGeology;
  InterpretedGeologyInterval: InterpretedGeologyInterval;
  Log: Log;
  LoggingToolKind: LoggingToolKind;
  LoggingToolKindDictionary: LoggingToolKindDictionary;
  MudLogReport: MudLogReport;
  MudlogReportInterval: MudlogReportInterval;
  OpsReport: OpsReport;
  PPFGChannel: PPFGChannel;
  PPFGChannelSet: PPFGChannelSet;
  PPFGLog: PPFGLog;
  Rig: Rig;
  RigUtilization: RigUtilization;
  Risk: Risk;
  ShowEvaluation: ShowEvaluation;
  ShowEvaluationInterval: ShowEvaluationInterval;
  StimJob: StimJob;
  StimJobStage: StimJobStage;
  StimPerforationCluster: StimPerforationCluster;
  SurveyProgram: SurveyProgram;
  Target: Target;
  ToolErrorModel: ToolErrorModel;
  ToolErrorModelDictionary: ToolErrorModelDictionary;
  Trajectory: Trajectory;
  TrajectoryStation: TrajectoryStation;
  Tubular: Tubular;
  WeightingFunction: WeightingFunction;
  WeightingFunctionDictionary: WeightingFunctionDictionary;
  Well: Well;
  Wellbore: Wellbore;
  WellboreCompletion: WellboreCompletion;
  WellboreGeology: WellboreGeology;
  WellboreGeometry: WellboreGeometry;
  WellboreGeometrySection: WellboreGeometrySection;
  WellboreMarker: WellboreMarker;
  WellboreMarkerSet: WellboreMarkerSet;
  WellCMLedger: WellCMLedger;
  WellCompletion: WellCompletion;
}
export const document: document;
