/* eslint-disable @typescript-eslint/no-empty-interface */
import * as eml from "./commonv2";
import * as Primitive from "../../../xml-primitives";

// Source files:
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/Attachment.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/BhaRun.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/CementJob.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/DepthRegImage.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/DownholeComponent.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/DrillReport.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/FluidsReport.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/Log.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/MudLogReport.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/OpsReport.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/Rig.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/Risk.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/StimJob.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/SurveyProgram.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/ToolErrorModel.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/ToolErrorTermSet.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/Trajectory.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/Tubular.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/Well.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/WellCMLedger.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/WellCompletion.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/Wellbore.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/WellboreCompletion.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/WellboreGeology.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/WellboreGeometry.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/WellboreMarkers.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/WitsmlAllObjects.xsd
// http://127.0.0.1:8080/data/witsml/v2.0/xsd_schemas/WitsmlCommon.xsd

declare module "./commonv2" {
  export interface _AbstractDataObjectProxyType {
    Attachment?: Attachment;
    BhaRun?: BhaRun;
    CementJob?: CementJob;
    CementJobEvaluation?: CementJobEvaluation;
    Channel?: Channel;
    ChannelSet?: ChannelSet;
    CuttingsGeology?: CuttingsGeology;
    CuttingsGeologyInterval?: CuttingsGeologyInterval;
    DepthRegImage?: DepthRegImage;
    DownholeComponent?: DownholeComponent;
    DrillReport?: DrillReport;
    FluidsReport?: FluidsReport;
    InterpretedGeology?: InterpretedGeology;
    InterpretedGeologyInterval?: InterpretedGeologyInterval;
    Log?: Log;
    MudLogReport?: MudLogReport;
    OpsReport?: OpsReport;
    Rig?: Rig;
    RigUtilization?: RigUtilization;
    Risk?: Risk;
    ShowEvaluation?: ShowEvaluation;
    ShowEvaluationInterval?: ShowEvaluationInterval;
    StimJob?: StimJob;
    StimJobStage?: StimJobStage;
    StimPerforationCluster?: StimPerforationCluster;
    SurveyProgram?: SurveyProgram;
    ToolErrorModel?: ToolErrorModel;
    ToolErrorTermSet?: ToolErrorTermSet;
    Trajectory?: Trajectory;
    Tubular?: Tubular;
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
}
/** One of either circulating or static temperature */
interface _AbstractBottomHoleTemperature extends BaseType {
  /** Bottomhole temperature for the job or reporting period. */
  BottomHoleTemperature?: eml.ThermodynamicTemperatureMeasure;
}
export interface AbstractBottomHoleTemperature
  extends _AbstractBottomHoleTemperature {
  constructor: { new (): AbstractBottomHoleTemperature };
}
export const AbstractBottomHoleTemperature: {
  new (): AbstractBottomHoleTemperature;
};

/** Defines common elements for both cement job designs and reports. */
interface _AbstractCementJob extends BaseType {
  /** Cementing engineer. */
  CementEngr?: string;
  /** Name of cementing contractor. */
  Contractor?: string;
  /** Duration for waiting on cement to set. */
  ETimWaitingOnCement?: eml.TimeMeasure;
  /** Pipe reciprocation: stroke length. */
  LenPipeRecipStroke?: eml.LengthMeasure;
  /** Measured depth at the bottom of  the hole. */
  MdHole?: MeasuredDepthCoord;
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
export interface AbstractCementJob extends _AbstractCementJob {
  constructor: { new (): AbstractCementJob };
}
export const AbstractCementJob: { new (): AbstractCementJob };

/** Defines the information that is common to the cement job stage design and reports. */
interface _AbstractCementStage extends BaseType {
  /** Annular flow present after the stage was completed?  Values are "true" (or "1") and "false" (or "0"). */
  AnnularFlowAfter?: boolean;
  /** Bottom plug used?  Values are "true" (or "1") and "false" (or "0"). */
  BotPlug?: boolean;
  /** @integer Amount of bottom plug used. */
  BotPlugNumber?: number;
  /** Tail pipe size (diameter). */
  DiaTailPipe?: eml.LengthMeasure;
  /** Reference to displacement fluid properties. */
  DisplacementFluidRefId?: string;
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
  MdCircOut?: MeasuredDepthCoord;
  /** Measured depth of coil tubing (multi-stage cement job). */
  MdCoilTbg?: MeasuredDepthCoord;
  /** Measured depth of string (multi-stage cement job). */
  MdString?: MeasuredDepthCoord;
  /** Measured depth of the tool (multi-stage cement job). */
  MdTool?: MeasuredDepthCoord;
  /** Mix method. */
  MixMethod?: string;
  /** @integer Stage number. */
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
  SqueezeObjective?: string;
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
  TypeOriginalMud?: string;
  /** Stage type. */
  TypeStage: string;
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
  VolExcessMethod?: string;
  /** Total mud lost. */
  VolMudLost?: eml.VolumeMeasure;
  /** Volume of returns. */
  VolReturns?: eml.VolumeMeasure;
  /** Mud density. */
  WtMud?: eml.MassPerVolumeMeasure;
  /** Yield point (in the hole at the start of the job). */
  YpMud?: eml.PressureMeasure;
}
export interface AbstractCementStage extends _AbstractCementStage {
  constructor: { new (): AbstractCementStage };
}
export const AbstractCementStage: { new (): AbstractCementStage };

/** The choice of connection type. */
interface _AbstractConnectionType extends BaseType {}
export interface AbstractConnectionType extends _AbstractConnectionType {
  constructor: { new (): AbstractConnectionType };
}
export const AbstractConnectionType: { new (): AbstractConnectionType };

/** Event extension schema. */
interface _AbstractEventExtension extends BaseType {}
export interface AbstractEventExtension extends _AbstractEventExtension {
  constructor: { new (): AbstractEventExtension };
}
export const AbstractEventExtension: { new (): AbstractEventExtension };

/** Generic representation of pass, depth, or time values. Each derived element provides specialized implementation for specific content types or for optimization of the representation. */
interface _AbstractIndexValue extends BaseType {}
export interface AbstractIndexValue extends _AbstractIndexValue {
  constructor: { new (): AbstractIndexValue };
}
export const AbstractIndexValue: { new (): AbstractIndexValue };

/** Describes the survey measurement or value that the error term applies to. */
interface _AbstractIscwsaErrorCoefficient extends BaseType {
  /** Unique identifier for this instance of AbstractIscwsaErrorCoefficient. */
  uid: string;
}
export interface AbstractIscwsaErrorCoefficient
  extends _AbstractIscwsaErrorCoefficient {
  constructor: { new (): AbstractIscwsaErrorCoefficient };
}
export const AbstractIscwsaErrorCoefficient: {
  new (): AbstractIscwsaErrorCoefficient;
};

/** Item weight or volume per unit. */
interface _AbstractItemWtOrVolPerUnit extends BaseType {}
export interface AbstractItemWtOrVolPerUnit
  extends _AbstractItemWtOrVolPerUnit {
  constructor: { new (): AbstractItemWtOrVolPerUnit };
}
export const AbstractItemWtOrVolPerUnit: { new (): AbstractItemWtOrVolPerUnit };

/** Defines a constraint against the data points in the log's channel. Each time the log is realized, only the data points satisfying this constraint are included. */
interface _AbstractLogDataContext extends BaseType {}
export interface AbstractLogDataContext extends _AbstractLogDataContext {
  constructor: { new (): AbstractLogDataContext };
}
export const AbstractLogDataContext: { new (): AbstractLogDataContext };

/** Choice placeholder in a rotary steerable tool. */
interface _AbstractRotarySteerableTool extends BaseType {}
export interface AbstractRotarySteerableTool
  extends _AbstractRotarySteerableTool {
  constructor: { new (): AbstractRotarySteerableTool };
}
export const AbstractRotarySteerableTool: {
  new (): AbstractRotarySteerableTool;
};

export type AbstractUidString = string;
type _AbstractUidString = eml._String64;

/** Location Schema. This is a location that is expressed in terms of 2D coordinates. So that the location can be understood, the coordinate reference system (CRS) must be known. The survey location is given by a pair of tagged values. The pairs may be: (1) latitude/longitude, (2) easting/northing, (3) westing/southing, (4) projectedX/projectedY, or (5) localX/localY. The appropriate pair must be chosen for the data. */
interface _AbstractWellLocation extends BaseType {
  /** A unique identifier for a well location. */
  uid: string;
  /** A comment, generally given to help the reader interpret the coordinates if the CRS and the chosen pair do not make them clear. */
  Description?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Flag indicating (if that Is this pair of values the original data given for the location? Values are "true" or "1". Or, if the pair of values was calculated from an original pair of values, set to "false" (or "0") or leave blank. */
  Original?: boolean;
}
export interface AbstractWellLocation extends _AbstractWellLocation {
  constructor: { new (): AbstractWellLocation };
}
export const AbstractWellLocation: { new (): AbstractWellLocation };

/** Information on fractionation event. */
interface _AcidizefracExtension extends _AbstractEventExtension {
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to a StimJob. */
  StimJobID?: string;
}
export interface AcidizefracExtension extends _AcidizefracExtension {
  constructor: { new (): AcidizefracExtension };
}
export const AcidizefracExtension: { new (): AcidizefracExtension };

interface _AnchorState extends BaseType {
  /** Angle of the anchor or mooring line. */
  AnchorAngle?: eml.PlaneAngleMeasure;
  /** The anchor number within a mooring system, or name if a name is used instead. */
  AnchorName: string;
  /** Tension on the mooring line represented by the named anchor. */
  AnchorTension?: eml.ForceMeasure;
  /** Free-test description of the state of this anchor or mooring line. */
  Description?: string;
}
export interface AnchorState extends _AnchorState {
  constructor: { new (): AnchorState };
}
export const AnchorState: { new (): AnchorState };

/** Container element for assemblies, or a collection of all assembly information. */
interface _Assembly extends BaseType {
  Part?: StringEquipment[];
}
export interface Assembly extends _Assembly {
  constructor: { new (): Assembly };
}
export const Assembly: { new (): Assembly };

/** A dedicated object used to attach digital supplemental data (for example, a graphic or PDF file) to another data object. The attachment is captured as a base 64 binary type. */
interface _Attachment extends eml._AbstractObject {
  /** Used to tell what the object is when you have multiple attachments of the same file type. E.g., if you have attached a picture of cuttings on a specific depth, you can tag it with Category="CuttingsPicture". */
  Category?: string;
  /** The actual attachment content. */
  Content: string;
  /** A file name associated with the attachment. Note this is NOT a file path and should contain a name only. */
  FileName?: string;
  /** The file type. This field SHOULD be a registered mime type as cataloged at http://www.iana.org/assignments/media-types/media-types.xhtml. */
  FileType?: string;
  /** The along-hole measured depth represented by the attachment. */
  Md?: MeasuredDepthCoord;
  /** The along-hole measured depth of the bit. */
  MdBit?: MeasuredDepthCoord;
  /** A reference to an object that is defined within the context of the specified wellbore. */
  ObjectReference?: eml.DataObjectReference;
  /** Any extra numeric data. For this usage, the name attribute MUST be specified because it represents the meaning of the data. While the index attribute is mandatory, it is only significant if the same name repeats. */
  Param?: eml.ExtensionNameValue[];
  /** A reference to a sub-object that is defined within the context of the object referenced by objectReference. This should only refer to recurring components of a growing object. The content is the UID of the sub-object. */
  SubObjectReference?: string;
  Wellbore: eml.DataObjectReference;
}
export interface Attachment extends _Attachment {
  constructor: { new (): Attachment };
}
export const Attachment: { new (): Attachment };

/** Specifies the status of the current tool error model. */
export type AuthorizationStatus =
  | "draft"
  | "authorized"
  | "superseded"
  | "withdrawn";
interface _AuthorizationStatus extends eml._TypeEnum {
  content: AuthorizationStatus;
}

/** Describes what survey measurement or value the error term applies to. */
interface _Azi extends _AbstractIscwsaErrorCoefficient {
  /** Hole azimuth. Corrected to the well’s azimuth reference. */
  Azi: string;
}
export interface Azi extends _Azi {
  constructor: { new (): Azi };
}
export const Azi: { new (): Azi };

/** Reference to the azimuth of the trajectory */
export type AziRef = "magnetic north" | "grid north" | "true north";
interface _AziRef extends eml._TypeEnum {
  content: AziRef;
}

/** Backup scale types. */
export type BackupScaleType = "x10" | "offscale left/right" | "other";
interface _BackupScaleType extends eml._TypeEnum {
  content: BackupScaleType;
}

/** Specifies the bearing type of a motor. */
export type BearingType = "oil seal" | "mud lube" | "other";
interface _BearingType extends eml._TypeEnum {
  content: BearingType;
}

/** An estimated wind strength based on the Beaufort Wind Scale. Values range from 0 (calm) to 12 (hurricane). */
export type BeaufortScaleIntegerCode = number;
type _BeaufortScaleIntegerCode = Primitive._number;

/** Tubular Bend Component Schema. */
interface _Bend extends BaseType {
  /** Unique identifier for this instance of Bend. */
  uid: string;
  /** Angle of the bend. */
  Angle?: eml.PlaneAngleMeasure;
  /** Distance of the bend from the bottom of the component. */
  DistBendBot?: eml.LengthMeasure;
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
}
export interface Bend extends _Bend {
  constructor: { new (): Bend };
}
export const Bend: { new (): Bend };

/** Used with point-the-bit type of rotary steerable system tools; describes the angle of the bit. */
interface _BendAngle extends _AbstractRotarySteerableTool {
  /** The angle of the bend. */
  BendAngle?: eml.PlaneAngleMeasure;
}
export interface BendAngle extends _BendAngle {
  constructor: { new (): BendAngle };
}
export const BendAngle: { new (): BendAngle };

/** Used with point-the-bit type of rotary steerable system tools; describes the angle of the bit. */
interface _BendOffset extends _AbstractRotarySteerableTool {
  /** Offset distance from the bottom connection to the bend. */
  BendOffset?: eml.LengthMeasure;
}
export interface BendOffset extends _BendOffset {
  constructor: { new (): BendOffset };
}
export const BendOffset: { new (): BendOffset };

/** The object used to capture information about one run of the drill string into and out of the hole. The drill string configuration is described in the Tubular object. That is, one drill string configuration may be used for many runs. */
interface _BhaRun extends eml._AbstractObject {
  /** Actual dogleg severity. */
  ActDogleg?: eml.AnglePerLengthMeasure;
  /** Actual dogleg severity: maximum. */
  ActDoglegMx?: eml.AnglePerLengthMeasure;
  DrillingParams?: DrillingParams[];
  /** Date and time that activities for this run started. */
  DTimStart?: string;
  /** Start on bottom: date and time. */
  DTimStartDrilling?: string;
  /** Date and time that activities for this run stopped. */
  DTimStop?: string;
  /** Stop off bottom: date and time. */
  DTimStopDrilling?: string;
  /** @integer Bit run number. */
  NumBitRun?: number;
  /** @integer The BHA (drilling string) run number. */
  NumStringRun?: number;
  /** Objective of the bottomhole assembly. */
  ObjectiveBha?: string;
  /** Planned dogleg severity. */
  PlanDogleg?: eml.AnglePerLengthMeasure;
  /** Reason for a trip. */
  ReasonTrip?: string;
  /** Bottomhole assembly status. */
  StatusBha?: BhaStatus;
  Tubular?: eml.DataObjectReference;
  Wellbore: eml.DataObjectReference;
}
export interface BhaRun extends _BhaRun {
  constructor: { new (): BhaRun };
}
export const BhaRun: { new (): BhaRun };

/** Stage of the BHA (plan, progress, final) */
export type BhaStatus = "final" | "progress" | "plan";
interface _BhaStatus extends eml._TypeEnum {
  content: BhaStatus;
}

/** Information on bottom hole pressure during this event. */
interface _BHPExtension extends _AbstractEventExtension {
  /** Reference to bottom hole pressure */
  BHPRefID?: string;
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
}
export interface BHPExtension extends _BHPExtension {
  constructor: { new (): BHPExtension };
}
export const BHPExtension: { new (): BHPExtension };

/** Specifies the reason a drill bit was declared inoperable; these codes were originally defined by the IADC. */
export type BitDullCode =
  | "BC"
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
  | "OC"
  | "PB"
  | "PN"
  | "RG"
  | "RO"
  | "SD"
  | "SS"
  | "TR"
  | "WO"
  | "WT";
interface _BitDullCode extends eml._TypeEnum {
  content: BitDullCode;
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
  content: BitReasonPulled;
}

/** Bit Record Component Schema. Captures information that describes the bit and problems with the bit. Many of the problems are classified using IADC codes that are specified as enumerated lists in WITSML. */
interface _BitRecord extends BaseType {
  /** Unique identifier for this instance of BitRecord. */
  uid: string;
  /** N = new, U = used. */
  BitClass?: string;
  /** IADC bit code. */
  CodeIADC?: string;
  /** The manufacturer's code for the bit. */
  CodeMfg?: string;
  /** Final condition of the bit bearings (integer 0-8 or E, F, N or X). */
  CondFinalBearing?: IadcBearingWearCode;
  /** Final dull condition from the IADC bit-wear 2-character codes. */
  CondFinalDull?: BitDullCode;
  /** Final condition of the bit gauge in 1/16 of a inch. I = in gauge, else number of 16ths out of gauge. */
  CondFinalGauge?: string;
  /** Final condition of the inner tooth rows (inner 2/3 of bit) (0-8). */
  CondFinalInner?: IadcIntegerCode;
  /** Final conditions for row and cone numbers for items that need location information (e.g., cracked cone, lost cone, etc). */
  CondFinalLocation?: string;
  /** Other final comments on bit condition from the IADC list (BitDullCode enumerated list). */
  CondFinalOther?: string;
  /** Final condition of the outer tooth rows (outer 1/3 of bit) (0-8). */
  CondFinalOuter?: IadcIntegerCode;
  /** Final reason the bit was pulled from IADC codes (BitReasonPulled enumerated list). */
  CondFinalReason?: BitReasonPulled;
  /** Initial condition of the bit bearings (integer 0-8 or E, F, N or X). */
  CondInitBearing?: IadcBearingWearCode;
  /** Initial dull condition from the IADC bit-wear 2-character codes. */
  CondInitDull?: BitDullCode;
  /** Initial condition of the bit gauge in 1/16 of an inch. I = in gauge, else the number of 16ths out of gauge. */
  CondInitGauge?: string;
  /** Initial condition of the inner tooth rows (inner 2/3 of the bit) (0-8). */
  CondInitInner?: IadcIntegerCode;
  /** Initial row and cone numbers for items that need location information (e.g., cracked cone, lost cone, etc). */
  CondInitLocation?: string;
  /** Other comments on initial bit condition from the IADC list (BitDullCode enumerated list). */
  CondInitOther?: string;
  /** Initial condition of the outer tooth rows (outer 1/3 of bit) (0-8). */
  CondInitOuter?: IadcIntegerCode;
  /** Initial reason the bit was pulled from IADC codes (BitReasonPulled enumerated list). */
  CondInitReason?: BitReasonPulled;
  Cost?: Cost;
  /** Diameter of the drilled hole. */
  DiaBit: eml.LengthMeasure;
  /** Minimum hole or tubing diameter that the bit will pass through (for bi-center bits). */
  DiaPassThru?: eml.LengthMeasure;
  /** Diameter of the pilot bit (for bi-center bits). */
  DiaPilot?: eml.LengthMeasure;
  /** Bit drive type (motor, rotary table, etc.). */
  Drive?: string;
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Manufacturer or supplier of the item. */
  Manufacturer?: string;
  /** Bit number and rerun number, e.g., "4.1" for the first rerun of bit 4. */
  NumBit?: string;
  /** Type of bit. */
  TypeBit?: BitType;
}
export interface BitRecord extends _BitRecord {
  constructor: { new (): BitRecord };
}
export const BitRecord: { new (): BitRecord };

/** Specifies the  values that represent the type of drill or core bit. */
export type BitType =
  | "diamond"
  | "diamond core"
  | "insert roller cone"
  | "PDC"
  | "PDC core"
  | "roller cone";
interface _BitType extends eml._TypeEnum {
  content: BitType;
}

/** Blade shape of the stabilizer: melon, spiral, straight, etc. */
export type BladeShapeType =
  | "dynamic"
  | "melon"
  | "spiral"
  | "straight"
  | "variable";
interface _BladeShapeType extends eml._TypeEnum {
  content: BladeShapeType;
}

/** Specifies the blade type of the stabilizer. */
export type BladeType = "clamp-on" | "integral" | "sleeve" | "welded";
interface _BladeType extends eml._TypeEnum {
  content: BladeType;
}

/** Rig blowout preventer (BOP) schema. */
interface _Bop extends BaseType {
  /** Type of accumulator/description. */
  Accumulator?: string;
  BopComponent?: BopComponent[];
  /** Accumulator fluid capacity. */
  CapAccFluid?: eml.VolumeMeasure;
  /** Description of the control system. */
  DescControlManifold?: string;
  /** Diameter of the diverter. */
  DiaDiverter?: eml.LengthMeasure;
  /** Date and time the BOP was installed. */
  DTimInstall?: string;
  /** Date and time of the BOP was removed. */
  DTimRemove?: string;
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
  /** Manufacturer or supplier of the item. */
  Manufacturer?: string;
  /** Manufacturer's designated model. */
  Model?: string;
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
  TypeChokeManifold?: string;
  /** Type of connection to the blowout preventer. */
  TypeConnectionBop?: string;
  /** The blowout preventer control system. */
  TypeControlManifold?: string;
  /** Diverter description. */
  TypeDiverter?: string;
  /** Accumulator pre-charge volume */
  VolAccPreCharge?: eml.VolumeMeasure;
}
export interface Bop extends _Bop {
  constructor: { new (): Bop };
}
export const Bop: { new (): Bop };

/** Blowout Preventer Component Schema. */
interface _BopComponent extends BaseType {
  /** Unique identifier for this instance of BopComponent */
  uid: string;
  /** Description of the component. */
  DescComp?: string;
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
  Nomenclature?: string;
  /** Working rating pressure of the component. */
  PresWork?: eml.PressureMeasure;
  /** Type of ram or preventer. */
  TypeBopComp?: BopType;
}
export interface BopComponent extends _BopComponent {
  constructor: { new (): BopComponent };
}
export const BopComponent: { new (): BopComponent };

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
  content: BopType;
}

/** Information on the borehole. */
interface _Borehole extends BaseType {
  /** Unique identifier for this instance of Borehole. */
  uid: string;
  /** Borehole diameter. */
  BoreholeDiameter?: eml.LengthMeasure;
  /** The description of this equipment to be permanently kept. */
  DescriptionPermanent?: string;
  EquipmentEventHistory?: EventInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth interval for the borehole. */
  MdInterval?: eml.MdInterval;
  /** The name of the borehole. */
  Name?: string;
  /** True vertical depth interval for the borehole. */
  TvdInterval?: eml.TvdInterval;
  /** Type of borehole. etc. cavern, cavity, normal borehole, under ream, etc. */
  TypeBorehole?: BoreholeType;
}
export interface Borehole extends _Borehole {
  constructor: { new (): Borehole };
}
export const Borehole: { new (): Borehole };

/** A section of a borehole. Used to define the drilled hole that corresponds to the wellbore. A collection of contiguous and non-overlapping borehole sections is allowed. Each section has depth range, diameter, and kind. */
interface _BoreholeString extends BaseType {
  /** Unique identifier for this instance of BoreholeString. */
  uid: string;
  Accessories?: StringAccessory;
  Borehole?: Borehole[];
  GeologyFeature?: GeologyFeature[];
  /** The name of the borehole string. */
  Name?: string;
  ReferenceWellbore: eml.DataObjectReference;
}
export interface BoreholeString extends _BoreholeString {
  constructor: { new (): BoreholeString };
}
export const BoreholeString: { new (): BoreholeString };

/** Reference to a borehole string identifier */
interface _BoreholeStringReference extends BaseType {
  /** Reference to borehole String */
  boreholeStringReferenceId: string;
  /** Reference to string equipment */
  StringEquipmentReferenceId?: string[];
}
export interface BoreholeStringReference extends _BoreholeStringReference {
  constructor: { new (): BoreholeStringReference };
}
export const BoreholeStringReference: { new (): BoreholeStringReference };

/** Borehole string container element, or a collection of all borehole strings. */
interface _BoreholeStringSet extends BaseType {
  BoreholeString: BoreholeString[];
}
export interface BoreholeStringSet extends _BoreholeStringSet {
  constructor: { new (): BoreholeStringSet };
}
export const BoreholeStringSet: { new (): BoreholeStringSet };

/** Specifies the values for the type of borehole. */
export type BoreholeType = "cavern" | "cavity" | "normalborehole" | "underream";
interface _BoreholeType extends eml._TypeEnum {
  content: BoreholeType;
}

/** Circulating temperature at the bottom of the hole. */
interface _BottomHoleCirculatingTemperature
  extends _AbstractBottomHoleTemperature {}
export interface BottomHoleCirculatingTemperature
  extends _BottomHoleCirculatingTemperature {
  constructor: { new (): BottomHoleCirculatingTemperature };
}
export const BottomHoleCirculatingTemperature: {
  new (): BottomHoleCirculatingTemperature;
};

/** Static temperature at the bottom of the hole. */
interface _BottomHoleStaticTemperature extends _AbstractBottomHoleTemperature {
  /** Elapsed time since circulation stopped. */
  eTimStatic?: eml.TimeMeasure;
}
export interface BottomHoleStaticTemperature
  extends _BottomHoleStaticTemperature {
  constructor: { new (): BottomHoleStaticTemperature };
}
export const BottomHoleStaticTemperature: {
  new (): BottomHoleStaticTemperature;
};

/** Specifies values that represent the type of box and pin configuration. */
export type BoxPinConfig =
  | "bottom box"
  | "top box"
  | "top pin"
  | "bottom pin top box"
  | "bottom pin";
interface _BoxPinConfig extends eml._TypeEnum {
  content: BoxPinConfig;
}

/** The role of a calibration point in a log depth registration. */
export type CalibrationPointRole =
  | "left edge"
  | "right edge"
  | "fraction"
  | "other";
interface _CalibrationPointRole extends eml._TypeEnum {
  content: CalibrationPointRole;
}

/** Container element for casing connections or collection of all casing connections information. */
interface _CasingConnectionType extends _AbstractConnectionType {
  /** Connection of type casing. */
  CasingConnectionType: CasingConnectionTypes;
}
export interface CasingConnectionType extends _CasingConnectionType {
  constructor: { new (): CasingConnectionType };
}
export const CasingConnectionType: { new (): CasingConnectionType };

/** Specifies the values for connection type of casing. */
export type CasingConnectionTypes =
  | "landed"
  | "self-sealing-threaded"
  | "welded";
interface _CasingConnectionTypes extends eml._TypeEnum {
  content: CasingConnectionTypes;
}

/** Cement Additive Component Schema. */
interface _CementAdditive extends BaseType {
  /** Unique identifier for the additive. */
  uid: string;
  /** Additive amount. */
  Additive: eml.MassMeasure;
  /** Additive density. */
  DensAdd?: eml.MassPerVolumeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Wet or dry. */
  FormAdd?: string;
  /** Additive name. */
  NameAdd: string;
  /** Additive type or function (e.g., retarder, visosifier, weighting agent). */
  TypeAdd?: string;
}
export interface CementAdditive extends _CementAdditive {
  constructor: { new (): CementAdditive };
}
export const CementAdditive: { new (): CementAdditive };

/** Configuration and other information about the cement stage. */
interface _CementDesignStage extends _AbstractCementStage {}
export interface CementDesignStage extends _CementDesignStage {
  constructor: { new (): CementDesignStage };
}
export const CementDesignStage: { new (): CementDesignStage };

/** Information on cement job event. */
interface _CementExtension extends _AbstractEventExtension {
  /** unique id of cementJob */
  CementJobRefID?: string;
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
}
export interface CementExtension extends _CementExtension {
  constructor: { new (): CementExtension };
}
export const CementExtension: { new (): CementExtension };

/** Cementing Fluid Component Schema. */
interface _CementingFluid extends BaseType {
  /** Unique identifier for this cementing fluid. */
  uid: string;
  CementAdditive?: CementAdditive[];
  /** Slurry class. */
  ClassSlurryDryBlend?: string;
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
  DescFluid?: string;
  /** Description of dry blend. */
  DryBlendDescription?: string;
  /** Name of dry blend. */
  DryBlendName?: string;
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
  /** @integer Fluid Index: 1: first fluid pumped (= original mud), last - 1 = tail cement, last = displacement mud. */
  FluidIndex?: number;
  /** Specify one of these models: Newtonian, Bingham, Power Law, and Herschel Bulkley. */
  FluidRheologicalModel?: string;
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
  Purpose?: string;
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
  SourceWater?: string;
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
  TypeBaseFluid?: string;
  /** Fluid type: Mud, Wash, Spacer, Slurry. */
  TypeFluid?: string;
  /** Gas type used for foam job. */
  TypeGasFoam?: string;
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
export interface CementingFluid extends _CementingFluid {
  constructor: { new (): CementingFluid };
}
export const CementingFluid: { new (): CementingFluid };

/** Used to capture information about cementing operations, which are done to seal the annulus after a casing string has been run, to seal a lost circulation zone, or to set a plug to support directional drilling operations or seal a well so that it may be abandoned. */
interface _CementJob extends eml._AbstractObject {
  CementingFluid?: CementingFluid[];
  /** Is coiled tubing used?  Values are "true" (or "1") and "false" (or "0"). */
  CoilTubing?: boolean;
  Design?: CementJobDesign;
  HoleConfig?: eml.DataObjectReference;
  /** Job configuration. */
  JobConfig?: string;
  JobReport?: CementJobReport;
  /** Type of cement job. */
  JobType?: CementJobType;
  /** Measured depth at bottom of hole. */
  MdHole?: MeasuredDepthCoord;
  /** Measured depth of previous shoe. */
  MdPrevShoe?: MeasuredDepthCoord;
  /** Measured depth of squeeze. */
  MdSqueeze?: MeasuredDepthCoord;
  /** Measured depth of cement string shoe. */
  MdStringSet?: MeasuredDepthCoord;
  /** Water depth if offshore. The distance from mean sea level to water bottom (seabed floor). */
  MdWater?: eml.LengthMeasure;
  /** Name for the cemented string */
  NameCementedString?: string;
  /** Name for the cementing string */
  NameCementString?: string;
  /** Name for the cement work string */
  NameWorkString?: string;
  /** Offshore job? Values are "true" (or "1") and "false" (or "0"). */
  OffshoreJob?: boolean;
  /** Returns to seabed? Values are "true" (or "1") and "false" (or "0"). */
  ReturnsToSeabed?: boolean;
  /** Company providing the cementing tool. */
  ToolCompany?: string;
  /** True vertical depth of previous shoe. */
  TvdPrevShoe?: WellVerticalDepthCoord;
  /** True vertical depth of cement string shoe. */
  TvdStringSet?: WellVerticalDepthCoord;
  /** Plug type. */
  TypePlug?: string;
  /** Type of squeeze. */
  TypeSqueeze?: string;
  /** Cement tool type. */
  TypeTool?: string;
  Wellbore: eml.DataObjectReference;
}
export interface CementJob extends _CementJob {
  constructor: { new (): CementJob };
}
export const CementJob: { new (): CementJob };

/** Design and other information about the cement job */
interface _CementJobDesign extends _AbstractCementJob {
  CementDesignStage: CementStageDesign[];
}
export interface CementJobDesign extends _CementJobDesign {
  constructor: { new (): CementJobDesign };
}
export const CementJobDesign: { new (): CementJobDesign };

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
  FailureMethod?: string;
  /** Pressure integrity test/leak-off test formation breakdown gradient or absolute pressure. */
  FormPit?: eml.ForcePerVolumeMeasure;
  /** Job rating. */
  JobRating?: string;
  /** Liner overlap length. */
  LinerLap?: eml.LengthMeasure;
  /** The distance to the top of the liner. */
  LinerTop?: eml.LengthMeasure;
  /** Measured depth at top of cement. */
  MdCementTop?: MeasuredDepthCoord;
  /** Measured depth to the diverter tool. */
  MdDVTool?: MeasuredDepthCoord;
  /** @integer Number of remedials. */
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
  TestNegativeTool?: string;
  /** Equivalent mud weight. Positive test or absolute pressure . */
  TestPositiveEmw?: eml.MassPerVolumeMeasure;
  /** Test positive tool for liner top seal. */
  TestPositiveTool?: string;
  /** Is the top of cement sufficient?  Values are "true" (or "1") and "false" (or "0"). */
  TocOK?: boolean;
  /** Tool name for the pressure integrity test. */
  ToolCompanyPit?: string;
  /** Method to determine cement top. */
  TopCementMethod?: string;
}
export interface CementJobEvaluation extends _CementJobEvaluation {
  constructor: { new (): CementJobEvaluation };
}
export const CementJobEvaluation: { new (): CementJobEvaluation };

/** The as-built report of the job after it has been done. */
interface _CementJobReport extends _AbstractCementJob {
  /** Was the cement drilled out? Values are "true" (or "1") and "false" (or "0"). */
  CementDrillOut?: boolean;
  CementReportStage: CementStageReport[];
  /** Method by which density is measured. */
  DensMeasBy?: string;
  /** Date and time that the cement was drilled out. */
  DTimCementDrillOut?: string;
  /** Date and time of the end of the cement job. */
  DTimJobEnd?: string;
  /** Date and time of the start of the cement job. */
  DTimJobStart?: string;
  /** Date and time that pipe rotation started. */
  DTimPipeRotEnd?: string;
  /** Date and time that pipe rotation started. */
  DTimPipeRotStart?: string;
  /** Date and time that cement plug was set. */
  DTimPlugSet?: string;
  /** Date and time that pipe reciprocation ended. */
  DTimRecipEnd?: string;
  /** Date and time that pipe reciprocation started. */
  DTimRecipStart?: string;
  /** Date and time of a squeeze. */
  DTimSqueeze?: string;
}
export interface CementJobReport extends _CementJobReport {
  constructor: { new (): CementJobReport };
}
export const CementJobReport: { new (): CementJobReport };

/** Specifies type of cement job. */
export type CementJobType = "primary" | "plug" | "squeeze";
interface _CementJobType extends eml._TypeEnum {
  content: CementJobType;
}

/** Cement Pump Schedule Component Schema, which defines the cement pumping schedule for a given step in a cement job. */
interface _CementPumpScheduleStep extends BaseType {
  /** Unique identifier for this pump schedule step. */
  uid: string;
  /** Comments and remarks. */
  Comments?: string;
  /** The duration of the fluid pumping. */
  ETimPump?: eml.TimeMeasure;
  /** The duration of the shutdown event. */
  ETimShutdown?: eml.TimeMeasure;
  /** UUID feference to a fluid used in CementJob. */
  FluidReferenceId: string;
  /** Back pressure applied during the pumping stage. */
  PresBack?: eml.PressureMeasure;
  /** Rate at which the fluid is pumped. 0 means it is a pause. */
  RatePump?: eml.VolumePerTimeMeasure;
  /** The ratio of excess fluid to total fluid pumped during the step. */
  RatioFluidExcess?: eml.VolumePerVolumeMeasure;
  /** @integer Number of pump strokes for the fluid to be pumped (assumes the pump output is known). */
  StrokePump?: number;
  /** Volume pumped = eTimPump * ratePump. */
  VolPump?: eml.VolumeMeasure;
}
export interface CementPumpScheduleStep extends _CementPumpScheduleStep {
  constructor: { new (): CementPumpScheduleStep };
}
export const CementPumpScheduleStep: { new (): CementPumpScheduleStep };

/** Configuration and other information about the cement stage. */
interface _CementStageDesign extends _AbstractCementStage {}
export interface CementStageDesign extends _CementStageDesign {
  constructor: { new (): CementStageDesign };
}
export const CementStageDesign: { new (): CementStageDesign };

/** Report of key parameters for a stage of cement job. */
interface _CementStageReport extends _AbstractCementStage {
  /** Unique identifier for this instance of CementStageReport */
  uid: string;
  /** Date and time when displacing of cement started. */
  DTimDisplaceStart?: string;
  /** Date and time when mixing of cement started. */
  DTimMixStart?: string;
  /** Date and time when pumping cement ended. */
  DTimPumpEnd?: string;
  /** Date and time when pumping cement started. */
  DTimPumpStart?: string;
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
export interface CementStageReport extends _CementStageReport {
  constructor: { new (): CementStageReport };
}
export const CementStageReport: { new (): CementStageReport };

/** Rig Centrifuge Schema. */
interface _Centrifuge extends BaseType {
  /** Unique identifier for this instance of Centrifuge. */
  uid: string;
  /** Maximum pump rate at which the unit efficiently operates. */
  CapFlow?: eml.VolumePerTimeMeasure;
  /** Date and time the centrifuge was installed. */
  DTimInstall?: string;
  /** Date and time the centrifuge was removed. */
  DTimRemove?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Manufacturer or supplier of the item. */
  Manufacturer?: string;
  /** Manufacturer's designated model. */
  Model?: string;
  /** An identification tag for the centrifuge.
   * A serial number is a type of identification tag; however, some tags contain many pieces of information.This element only identifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** Contractor/owner. */
  Owner?: string;
  /** Description for the type of object. */
  Type?: string;
}
export interface Centrifuge extends _Centrifuge {
  constructor: { new (): Centrifuge };
}
export const Centrifuge: { new (): Centrifuge };

/** A channel object. It corresponds roughly to the LogCurveInfo structure in WITSML1411, and directly corresponds to the ChannelMetadataRecord structure in ETP. In historian terminology, a channel corresponds directly to a tag.
 * Channels are the fundamental unit of organization for WITSML logs. */
interface _Channel extends eml._AbstractObject {
  AxisDefinition?: LogChannelAxis[];
  /** A mandatory value categorizing a log channel. The classification system used in WITSML is the one from the PWLS group.
   *
   * NOTE: This should turn into an extensible enumeration before WITSML is released. */
  ChannelClass: eml.DataObjectReference;
  /** Defines where the channel gets its data from, e.g., calculated from another source, or from archive, or raw real-time, etc. */
  ChannelState?: ChannelState;
  /** The underlying ETP data type of the value. */
  DataType: EtpDataType;
  /** Indicates that the channel is derived from one or more other channels */
  Derivation?: ChannelDerivation;
  DerivedFrom?: eml.DataObjectReference[];
  /** When the log header defines the direction as "Increasing", the endIndex is the ending (maximum) index value at which the last non-null data point is located. When the log header defines the direction as Decreasing, the endIndex is the ending (minimum) index value at which the last non-null data point is located. */
  EndIndex?: AbstractIndexValue;
  /** The status of a channel with respect to creating new measurements. Statuses include:
   * Active: A channel is actively producing data points.
   * Inactive: A channel is offline or not currently producing, but may begin producing again in the future.
   * Closed: A channel will never produce points again. The rules for when a channel is to be closed will vary some for different kinds of channels. For example, time-based surface channels may remain open for the entire life of the drilling operation, whereas depth-based wireline channels are closed at the end of the wireline job */
  GrowingStatus: ChannelStatus;
  Index: ChannelIndex[];
  /** The RP66 organization code assigned to a logging company. The list is available at http://www.energistics.org/geosciences/geology-standards/rp66-organization-codes */
  LoggingCompanyCode?: string;
  /** Name of the logging company. */
  LoggingCompanyName: string;
  /** Defines where the log channel gets its data from: LWD, MWD, wireline; or whether it is computed, etc. */
  LoggingMethod?: LoggingMethod;
  /** The mnemonic name for this channel. Mnemonics are not unique within a store. */
  Mnemonic: string;
  /** The nominal hole size at the time the measurement tool was in the hole. The size is "nominal" to indicate that this is not the result of a caliper reading or other direct measurement of the hoe size, but is just a name used to refer to the diameter. This is normally the bit size.
   *
   * In a case where there are more than one diameter hole being drilled at the same time (like where a reamer is behind the bit) this diameter is the one which was seen by the sensor which produced a particular log channel. */
  NominalHoleSize?: eml.LengthMeasureExt;
  Parent?: eml.DataObjectReference;
  /** The nominal pass number for the channel. No precise meaning is declared for this attribute but it is so commonly used that it must be included.
   *
   * The value here should match a wireline pass number for logging data. */
  PassNumber?: string;
  PointMetadata?: PointMetadata[];
  /** The nominal run number for the channel. No precise meaning is declared for this attribute but it is so commonly used that it must be included.
   *
   * The value here should match a bit run number for LWD data and a wireline run number for logging data. */
  RunNumber?: string;
  /** Source of the data in the channel. Enter the contractor name who conducted the log. */
  Source?: string;
  /** When the log header defines the direction as "Increasing", the startIndex is the starting (minimum) index value at which the first non-null data point is located. When the log header defines the direction as "Decreasing", the startIndex is the starting (maximum) index value at which the first non-null data point is located. */
  StartIndex?: AbstractIndexValue;
  /** Is this a time or depth log? */
  TimeDepth: string;
  /** A value categorizing a logging tool. The classification system used in WITSML is the one from the PWLS group.
   *
   * NOTE: This should turn into an extensible enumeration before WITSML is released */
  ToolClass?: string;
  /** Name of the logging tool as given by the logging contractor. */
  ToolName?: string;
  /** The underlying unit of measure of the value. */
  Uom: string;
  Wellbore?: eml.DataObjectReference;
}
export interface Channel extends _Channel {
  constructor: { new (): Channel };
}
export const Channel: { new (): Channel };

/** Contains the bulk data for the log, either as a base64-encoded string or as a reference to an external file. */
interface _ChannelData extends BaseType {
  /** The data blob in JSON form. This attribute lets you embed the bulk data in a single file with the xml, to avoid the issues that arise when splitting data across multiple files.
   * BUSINESS RULE: Either this element or the FileUri element must be present. */
  Data?: string;
  /** The URI of a file containing the bulk data. If this field is non-null, then the data field is ignored. For files written to disk, this should normally contain a simple file name in relative URI form. For example, if an application writes a log file to disk, it might write the xml as abc.xml, and the bulk data as abc.avro. In this case, the value of this element would be './abc.avro'.
   *
   * BUSINESS RULE: Either this element or the Data element must be present. */
  FileUri?: string;
}
export interface ChannelData extends _ChannelData {
  constructor: { new (): ChannelData };
}
export const ChannelData: { new (): ChannelData };

/** Specifies  the source of data in a channel. */
export type ChannelDerivation =
  | "raw"
  | "simulated"
  | "spliced"
  | "sampled"
  | "model";
interface _ChannelDerivation extends eml._TypeEnum {
  content: ChannelDerivation;
}

/** A read-only class that is the union of those channel indexes that are shared by all channels in the channel set. */
interface _ChannelIndex extends BaseType {
  /** For depth indexes, this contains the UID of the datum, in a channel's Well object, to which all of the index values are referenced. */
  DatumReference?: string;
  /** The direction of the index, either increasing or decreasing. Index direction may not change within the life of a channel. */
  Direction: IndexDirection;
  /** The type of index (time, depth, etc.). */
  IndexType: ChannelIndexType;
  /** The mnemonic for the index. */
  Mnemonic: string;
  /** The unit of measure of the index. Must be one of the units allowed for the specified IndexType (i.e., time or distance). */
  Uom: string;
}
export interface ChannelIndex extends _ChannelIndex {
  constructor: { new (): ChannelIndex };
}
export const ChannelIndex: { new (): ChannelIndex };

/** Specifies the type of index used by the channel. */
export type ChannelIndexType =
  | "measured depth"
  | "true vertical depth"
  | "pass indexed depth"
  | "date time"
  | "elapsed time"
  | "temperature"
  | "pressure";
interface _ChannelIndexType extends eml._TypeEnum {
  content: ChannelIndexType;
}

/** A grouping of channels with a compatible index, for some purpose. Each channel has its own index. A ‘compatible’ index simply means that all of the channels are either in time or in depth using a common datum. */
interface _ChannelSet extends eml._AbstractObject {
  Channel: Channel[];
  /** A mandatory value categorizing a log channel. The classification system used in WITSML is the one from the PWLS group. */
  ChannelClass?: eml.DataObjectReference;
  /** Defines where the channel gets its data from, e.g., calculated from another source, or from archive, or raw real-time, etc. */
  ChannelState?: ChannelState;
  Data?: ChannelData;
  DataContext?: AbstractLogDataContext;
  /** Indicates that the channel is derived from one or more other channels. */
  Derivation?: ChannelDerivation;
  /** When the log header defines the direction as:
   *
   * - "Increasing", the endIndex is the ending (maximum) index value at which the last non-null data point is located.
   * - “Decreasing”, the endIndex is the ending (minimum) index value at which the last non-null data point is located. */
  EndIndex?: AbstractIndexValue;
  Index: ChannelIndex[];
  /** The RP66 organization code assigned to a logging company. The list is available at http://www.energistics.org/geosciences/geology-standards/rp66-organization-codes */
  LoggingCompanyCode?: string;
  /** Name of the logging company. */
  LoggingCompanyName?: string;
  /** Defines where the log channel gets its data from: LWD, MWD, wireline; or whether it is computed, etc. */
  LoggingMethod?: LoggingMethod;
  /** The nominal hole size (typically the bit size) at the time the measurement tool was in the hole. The size is "nominal" to indicate that this is not the result of a caliper reading or other direct measurement of the hole size, but is just a name used to refer to the diameter.
   * When more than one diameter holes are being drilled at the same time (e.g., where a reamer is behind the bit), this diameter is the one that was seen by the sensor that produced a particular log channel. */
  NominalHoleSize?: eml.LengthMeasureExt;
  /** The nominal pass number for the channel. No precise meaning is declared for this attribute but it is so commonly used that it must be included.
   *
   * The value here should match a wireline pass number for logging data. */
  PassNumber?: string;
  /** The nominal run number for the channel. No precise meaning is declared for this attribute but it is so commonly used that it must be included.
   *
   * The value here should match a bit run number for LWD data and a wireline run number for logging data. */
  RunNumber?: string;
  /** When the log header defines the direction as:
   *
   * - "Increasing", the startIndex is the starting (minimum) index value at which the first non-null data point is located.
   * - "Decreasing", the startIndex is the starting (maximum) index value at which the first non-null data point is located. */
  StartIndex?: AbstractIndexValue;
  /** Use to indicate if this is a time or depth log. */
  TimeDepth?: string;
  /** A value categorizing a logging tool. The classification system used in WITSML is the one from the PWLS group. */
  ToolClass?: string;
  /** Name of the logging tool as given by the logging contractor. */
  ToolName?: string;
  Wellbore?: eml.DataObjectReference;
}
export interface ChannelSet extends _ChannelSet {
  constructor: { new (): ChannelSet };
}
export const ChannelSet: { new (): ChannelSet };

/** Specifies the source of the data values in the channel, e.g., calculated from another source, or from archive, or raw real-time, etc. */
export type ChannelState =
  | "calculated"
  | "final"
  | "memory"
  | "processed"
  | "real time";
interface _ChannelState extends eml._TypeEnum {
  content: ChannelState;
}

/** Specifies the status of the channel (growing object): active, inactive, closed */
export type ChannelStatus = "active" | "closed" | "inactive";
interface _ChannelStatus extends eml._TypeEnum {
  content: ChannelStatus;
}

/** Describes the data for the log in terms of  the value of a given channel. */
interface _ChannelValueContext extends _AbstractLogDataContext {
  /** The channel refers to another Energistics data object. */
  ChannelReference: eml.DataObjectReference;
  /** A free-form format to specify the data value. */
  DataValue: string;
}
export interface ChannelValueContext extends _ChannelValueContext {
  constructor: { new (): ChannelValueContext };
}
export const ChannelValueContext: { new (): ChannelValueContext };

/** Analysis done to determine the components in a show. */
interface _Chromatograph extends BaseType {
  /** Acetylene. */
  Acetylene?: eml.VolumePerVolumeMeasure;
  Channel?: eml.DataObjectReference;
  /** Measured interval related to the chromatograph results. */
  ChromatographMdInterval?: eml.MdInterval;
  /** Chromatograph type. */
  ChromatographType?: string;
  /** Chromatograph integrator report time; format may be variable due to recording equipment. */
  ChromReportTime?: string;
  /** Carbon Dioxide ppm (average). */
  Co2Av?: eml.VolumePerVolumeMeasure;
  /** Carbon Dioxide ppm (minimum). */
  Co2Mn?: eml.VolumePerVolumeMeasure;
  /** Carbon Dioxide ppm (maximum). */
  Co2Mx?: eml.VolumePerVolumeMeasure;
  /** The date and time at which the gas sample was processed. */
  DateTimeGasSampleProcessed?: string;
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
export interface Chromatograph extends _Chromatograph {
  constructor: { new (): Chromatograph };
}
export const Chromatograph: { new (): Chromatograph };

/** Information on clean fill event. */
interface _CleanFillExtension extends _AbstractEventExtension {
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** method of fill and cleaning */
  FillCleaningMethod?: string;
  /** the size of the tool */
  ToolSize?: eml.LengthMeasure;
}
export interface CleanFillExtension extends _CleanFillExtension {
  constructor: { new (): CleanFillExtension };
}
export const CleanFillExtension: { new (): CleanFillExtension };

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
  content: Coating;
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
  content: CompletionStatus;
}

/** Information on the collection of Completion StatusHistory. */
interface _CompletionStatusHistory extends BaseType {
  /** Unique identifier for this instance of CompletionStatusHistory. */
  uid: string;
  /** Comments or remarks on the status. */
  Comment?: string;
  /** The end date of the status. */
  EndDate?: string;
  /** Measured depth interval between the top and the base of the perforations. */
  PerforationMdInterval?: eml.MdInterval;
  /** The start date of the status. */
  StartDate?: string;
  /** Completion status. */
  Status?: CompletionStatus;
}
export interface CompletionStatusHistory extends _CompletionStatusHistory {
  constructor: { new (): CompletionStatusHistory };
}
export const CompletionStatusHistory: { new (): CompletionStatusHistory };

/** Specifies the values for mud log parameters that are measured in units of concentration. */
export type ConcentrationParameterKind = "cuttings gas";
interface _ConcentrationParameterKind extends eml._TypeEnum {
  content: ConcentrationParameterKind;
}

/** Tubular Connection Component Schema. Describes dimensions and properties of a connection between tubulars. */
interface _Connection extends BaseType {
  /** Unique identifier for this instance of Connection. */
  uid: string;
  /** For bending stiffness ratio. */
  CriticalCrossSection?: eml.AreaMeasure;
  ExtensionAny?: eml.CustomData;
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
  TypeThread?: string;
}
export interface Connection extends _Connection {
  constructor: { new (): Connection };
}
export const Connection: { new (): Connection };

/** Specifies the values for the type of equipment-to-equipment connection. */
export type ConnectionFormType =
  | "box"
  | "flange"
  | "mandrel"
  | "pin"
  | "welded";
interface _ConnectionFormType extends eml._TypeEnum {
  content: ConnectionFormType;
}

/** Specifies the position of a connection. */
export type ConnectionPosition = "both" | "bottom" | "top";
interface _ConnectionPosition extends eml._TypeEnum {
  content: ConnectionPosition;
}

/** Information on a collection of contact intervals. Contains one or more “xxxInterval” objects, each representing the details of a single physical connection between well and reservoir, e.g., the perforation details, depth, reservoir connected. Meaning: this is the physical nature of a connection from reservoir to wellbore. */
interface _ContactIntervalSet extends BaseType {
  GravelPackInterval?: GravelPackInterval[];
  OpenHoleInterval?: OpenHoleInterval[];
  PerforationSetInterval?: PerforationSetInterval[];
  SlotsInterval?: SlotsInterval[];
}
export interface ContactIntervalSet extends _ContactIntervalSet {
  constructor: { new (): ContactIntervalSet };
}
export const ContactIntervalSet: { new (): ContactIntervalSet };

/** The price of an item, with a currency indication. */
interface _Cost extends BaseType {
  /** Currency used for this Cost. */
  currency: string;
}
export interface Cost extends _Cost {
  constructor: { new (): Cost };
}
export const Cost: { new (): Cost };

/** Container for Cuttings Lithology items. The mud logger at the wellsite takes regular samples of drilled cuttings while the well is being drilled and examines the cuttings to determine the rock types (lithologies) present in each sample. The cuttings samples will typically contain a mix of different lithologies in each sample because there may have been multiple rock types that were drilled within the sample depth interval and there can also be mixing of cuttings as they travel up the wellbore and are collected on the shakers. CuttingsGeology therefore will typically contain multiple lithology elements for each interval so that the percentages of each lithology in the sample along with the more detailed geological description can be recorded. */
interface _CuttingsGeology extends eml._AbstractObject {
  CuttingsInterval?: CuttingsGeologyInterval[];
  /** Describes the growing status of the cuttings, whether active, inactive or closed */
  GrowingStatus: ChannelStatus;
  /** [maintained by the server] The interval which contains the minimum and maximum measured depths for all cuttings intervals in this cuttings geology. */
  MdInterval: eml.MdInterval;
  Wellbore: eml.DataObjectReference;
}
export interface CuttingsGeology extends _CuttingsGeology {
  constructor: { new (): CuttingsGeology };
}
export const CuttingsGeology: { new (): CuttingsGeology };

/** A depth range along the wellbore containing one or more lithology types and information about how the cuttings were sampled. */
interface _CuttingsGeologyInterval extends eml._AbstractObject {
  /** Unique identifier for this instance of CuttingsGeologyInterval. */
  uid: string;
  /** Calcimetry calcite percentage. */
  Calcite?: eml.VolumePerVolumeMeasure;
  /** Calcimetry stabilized percentage. */
  CalcStab?: eml.VolumePerVolumeMeasure;
  /** Cuttings cationic exchange capacity. Temporarily calling this a DimensionlessMeasure. */
  Cec?: eml.DimensionlessMeasure;
  /** Sample treatment: cleaning method. */
  CleaningMethod?: string;
  CuttingsIntervalLithology?: CuttingsIntervalLithology[];
  /** Sample bulk density for the interval. */
  DensBulk?: eml.MassPerVolumeMeasure;
  /** Shale density for the interval. */
  DensShale?: eml.MassPerVolumeMeasure;
  /** Calcimetry dolomite percentage. */
  Dolomite?: eml.VolumePerVolumeMeasure;
  /** Sample treatment: drying method. */
  DryingMethod?: string;
  /** The measured depth interval that is represented by the cuttings described in this instance. */
  MdInterval: eml.MdInterval;
  /** Fluorescence as measured using a device licensed for the Quantitative Fluorescence Technique. */
  Qft?: eml.IlluminanceMeasure;
  /** Maximum size. */
  SizeMax?: eml.LengthMeasure;
  /** Minimum size. */
  SizeMin?: eml.LengthMeasure;
}
export interface CuttingsGeologyInterval extends _CuttingsGeologyInterval {
  constructor: { new (): CuttingsGeologyInterval };
}
export const CuttingsGeologyInterval: { new (): CuttingsGeologyInterval };

/** The description of a single rock type in this interval. Can include one or more CuttingsIntervalShow objects for hydrocarbon show evaluation of the individual lithology. */
interface _CuttingsIntervalLithology extends BaseType {
  /** Unique identifier for this instance of CuttingsIntervalLithology. */
  uid?: string;
  /** An ISO 19115 EIP-derived set of metadata attached to ensure the traceability of the CuttingsIntervalLithology. */
  Citation?: eml.Citation;
  /** An optional custom lithology encoding scheme.
   * If used, it is recommended that the scheme follows the NPD required usage. With the numeric values noted in the enum tables, which was the original intent for this item.
   * The NPD Coding System assigns a digital code to the main lithologies as per the Norwegian Blue Book data standards.
   * The code was then derived by lithology = (main lithology * 10) + cement + (modifier / 100).
   * Example: Calcite cemented silty micaceous sandstone: (33 * 10) + 1 + (21 / 100) gives a numeric code of 331.21.
   * However, the NPD is also working through Energistics/Caesar to potentially change this usage.)
   * This scheme should not be used for mnemonics, because those vary by operator, and if an abbreviation is required, a local look-up table should be used by the rendering client, based on Lithology Type. */
  CodeLith?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology color description, from Shell 1995 4.3.3.1 and 4.3.3.2 colors with the addition of: frosted. e.g., black, blue, brown, buff, green, grey, olive, orange, pink, purple, red, translucent, frosted, white, yellow; modified by: dark, light, moderate, medium, mottled, variegated, slight, weak, strong, and vivid. */
  Color?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology compaction from Shell 1995 4.3.1.5, which includes: not compacted, slightly compacted, compacted, strongly compacted, friable, indurated, hard. */
  Compaction?: string;
  /** STRUCTURED DESCRIPTION USAGE. Mineral hardness. Typically, this element is rarely used because mineral hardness is not typically recorded.
   * What typically is recorded is compaction. However, this element is retained for use defined as per Mohs scale of mineral hardness. */
  Hardness?: string;
  /** The geological name for the type of lithology from the enum table listing a subset of the OneGeology/CGI defined formation types. */
  Kind: string;
  /** Lithology percent. Represents the portion of the sampled interval this lithology type relates to.
   * The total of the lithologies within an interval should add up to 100 percent.
   * If LithologySource in geology is:
   *
   * - "interpreted" only 100% is allowed.
   * - "core" or "cuttings" then recommended usage is that the creating application uses blocks of 10%. i.e. 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.
   *
   * Ideally the input application should enforce a total of 100% for each defined depth interval.
   * If the total for a depth interval does not add up to 100%, then use the "undifferentiated" code to fill out to 100%. */
  LithPc: eml.VolumePerVolumeMeasure;
  /** STRUCTURED DESCRIPTION USAGE. Lithology matrix/cement description. Terms will be as defined in the enumeration table.
   * e.g., "calcite" (Common) "dolomite", "ankerite" (e.g., North Sea HPHT reservoirs such as Elgin and Franklin have almost pure ankerite cementation) "siderite" (Sherwood sandstones, southern UK typical Siderite cements), "quartz" (grain-to-grain contact cementation or secondary quartz deposition), "kaolinite", "illite" (e.g., Village Fields North Sea), "smectite","chlorite" (Teg, Algeria.). */
  MatrixCement?: eml.MatrixCementKind;
  /** STRUCTURED DESCRIPTION USAGE. Lithology permeability description from Shell 4.3.2.5.
   * In the future, these values would benefit from quantification, e.g., tight, slightly, fairly, highly. */
  Permeability?: string;
  /** STRUCTURED DESCRIPTION USAGE. Visible porosity fabric description from after Shell 4.3.2.1 and 4.3.2.2: intergranular (particle size greater than 20m), fine interparticle (particle size less than 20m), intercrystalline, intragranular, intraskeletal, intracrystalline, mouldic, fenestral, shelter, framework, stylolitic, replacement, solution, vuggy, channel, cavernous. */
  PorosityFabric?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology visible porosity description.
   * Defined after BakerHughes definitions, as opposed to Shell, which has no linkage to actual numeric estimates.
   * The theoretical maximum porosity for a clastic rock is about 26%, which is normally much reduced by other factors.
   * When estimating porosities use: more than 15% "good"; 10 to 15% "fair"; 5 to 10% "poor"; less than 5% "trace"; 0 "none". */
  PorosityVisible?: string;
  Qualifier?: LithologyQualifier[];
  /** STRUCTURED DESCRIPTION USAGE. Lithology roundness description from Shell 4.3.1.3. Roundness refers to modal size class: very angular, angular, subangular, subrounded, rounded, well rounded. */
  Roundness?: string;
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
  SizeGrain?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology sorting description from Shell 4.3.1.2 Sorting: very poorly sorted, unsorted, poorly sorted, poorly to moderately well sorted, moderately well sorted, well sorted, very well sorted, unimodally sorted, bimodally sorted. */
  Sorting?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology sphericity description for the modal size class of grains in the sample, defined as per Shell 4.3.1.4 Sphericity: very elongated, elongated, slightly elongated, slightly spherical, spherical, very spherical. */
  Sphericity?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology matrix texture description from Shell 1995 4.3.2.6: crystalline, (often "feather-edge" appearance on breaking), friable, dull, earthy, chalky, (particle size less than 20m; often exhibits capillary imbibition) visibly particulate, granular, sucrosic, (often exhibits capillary imbibition).
   * Examples: compact interlocking, particulate, (Gradational textures are quite common.) chalky matrix with sucrosic patches, (Composite textures also occur). */
  Texture?: string;
}
export interface CuttingsIntervalLithology extends _CuttingsIntervalLithology {
  constructor: { new (): CuttingsIntervalLithology };
}
export const CuttingsIntervalLithology: { new (): CuttingsIntervalLithology };

/** A set of measurements or observations on cuttings samples describing the evaluation of a hydrocarbon show based on observation of hydrocarbon staining and fluorescence. For information on procedures for show evaluation, see the WITSML Technical Usage Guide. */
interface _CuttingsIntervalShow extends BaseType {
  /** Unique identifier for this instance of CuttingsIntervalShow. */
  uid: string;
  /** An ISO 19115 EIP-derived set of metadata attached to ensure the traceability of the CuttingsIntervalShow. */
  Citation?: eml.Citation;
  /** Cut color. */
  CutColor?: string;
  /** Cut fluorescence color. */
  CutFlorColor?: string;
  /** Cut fluorescence form. */
  CutFlorForm?: ShowLevel;
  /** Cut fluorescence level. */
  CutFlorLevel?: ShowFluorescence;
  /** Cut fluorescence speed. */
  CutFlorSpeed?: ShowSpeed;
  /** Cut fluorescence strength. */
  CutFlorStrength?: string;
  /** Cut formulation. */
  CutForm?: ShowLevel;
  /** Cut level (faint, bright, etc.). */
  CutLevel?: string;
  /** Cut speed. */
  CutSpeed?: ShowSpeed;
  /** Cut strength. */
  CutStrength?: string;
  /** Description of the cutting solvent used to treat the cuttings. */
  CuttingFluid?: string;
  /** Impregnated lithology. */
  ImpregnatedLitho?: string;
  /** Natural fluorescence color. */
  NatFlorColor?: string;
  /** Natural fluorescence description. */
  NatFlorDesc?: string;
  /** Natural fluorescence level. */
  NatFlorLevel?: ShowFluorescence;
  /** Natural fluorescence (commonly in percent). */
  NatFlorPc?: eml.AreaPerAreaMeasure;
  /** Description of any hydrocarbon type odors smelled. */
  Odor?: string;
  /** Residue color. */
  ResidueColor?: string;
  /** Show Rating. */
  ShowRating?: ShowRating;
  /** Visible stain color. */
  StainColor?: string;
  /** Visible stain distribution. */
  StainDistr?: string;
  /** Visible stain (commonly in percent). */
  StainPc?: eml.AreaPerAreaMeasure;
}
export interface CuttingsIntervalShow extends _CuttingsIntervalShow {
  constructor: { new (): CuttingsIntervalShow };
}
export const CuttingsIntervalShow: { new (): CuttingsIntervalShow };

/** Day Cost SchemaSchema. Captures daily cost information for the object (cost item) to which it is attached. */
interface _DayCost extends BaseType {
  /** Unique identifier for this instance of DayCost */
  uid: string;
  /** Cost for the item for this record. */
  CostAmount?: Cost;
  /** Cost class code. */
  CostClass: string;
  /** Cost code. */
  CostCode: string;
  /** Cost group code. */
  CostGroup?: string;
  /** Description of the cost item. */
  CostItemDescription?: string;
  /** Cost of each cost item, assume same currency. */
  CostPerItem?: Cost;
  /** Cost subcode. */
  CostSubCode?: string;
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
  ItemKind?: string;
  /** @integer Size of one cost item. */
  ItemSize?: number;
  /** An identification tag for the item. A serial number is a type of identification tag; however, some tags contain many pieces of information. This element only identifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** Name of the vendor. */
  NameVendor?: string;
  /** AFE number that this cost item applies to. */
  NumAFE?: string;
  /** Invoice number for cost item; the  bill is sent to the operator. */
  NumInvoice?: string;
  /** Purchase order number provided by the operator. */
  NumPO?: string;
  /** Serial number. */
  NumSerial?: string;
  /** The field ticket number issued by the service company on location. */
  NumTicket?: string;
  /** Vendor number. */
  NumVendor?: string;
  /** Name of pool/reservoir that this cost item can be accounted to. */
  Pool?: string;
  /** @integer Number of cost items used that day, e.g., 1 rig dayrate, 30 joints of casing. */
  QtyItem?: number;
}
export interface DayCost extends _DayCost {
  constructor: { new (): DayCost };
}
export const DayCost: { new (): DayCost };

/** Specifies the method used to direct the deviation of the trajectory in directional drilling. */
export type DeflectionMethod = "hybrid" | "point bit" | "push bit";
interface _DeflectionMethod extends eml._TypeEnum {
  content: DeflectionMethod;
}

/** Rig Degasser Schema. */
interface _Degasser extends BaseType {
  /** Unique identifier for this instance of degasser */
  uid: string;
  /** Flow area of the separator. */
  AreaSeparatorFlow?: eml.AreaMeasure;
  /** Gas vent rate at which the vent line pressure drop exceeds the hydrostatic head because of the mud seal. */
  CapBlowdown?: eml.VolumePerTimeMeasure;
  /** Maximum pump rate at which the unit efficiently operates. */
  CapFlow?: eml.VolumePerTimeMeasure;
  /** Safe gas-separating capacity. */
  CapGasSep?: eml.VolumePerTimeMeasure;
  /** Date and time the degasser was installed. */
  DTimInstall?: string;
  /** Date and time the degasser was removed. */
  DTimRemove?: string;
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
  /** Manufacturer or supplier of the item. */
  Manufacturer?: string;
  /** Manufacturer's designated model. */
  Model?: string;
  /** An identification tag for the degasser. A serial number is a type of identification tag; however, some tags contain many pieces of information.This element only identifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** Contractor/owner. */
  Owner?: string;
  /** Pressure rating of the item. */
  PresRating?: eml.PressureMeasure;
  /** Temperature rating of the separator. */
  TempRating?: eml.ThermodynamicTemperatureMeasure;
  /** Description for the type of object. */
  Type?: string;
}
export interface Degasser extends _Degasser {
  constructor: { new (): Degasser };
}
export const Degasser: { new (): Degasser };

/** Describes what survey measurement or value the error term applies to. */
interface _Depth extends _AbstractIscwsaErrorCoefficient {
  /** The measured depth of the point. */
  Depth: string;
}
export interface Depth extends _Depth {
  constructor: { new (): Depth };
}
export const Depth: { new (): Depth };

/** Qualifies the index as depth. */
interface _DepthIndexValue extends _AbstractIndexValue {
  /** Used to specify the channel start and end index. */
  Depth: number;
}
export interface DepthIndexValue extends _DepthIndexValue {
  constructor: { new (): DepthIndexValue };
}
export const DepthIndexValue: { new (): DepthIndexValue };

/** A mapping of pixel positions on the log image to rectified or depth-registered positions on the log image. Specifically, pixels along the depth track are tagged with the matching measured depth for that position. */
interface _DepthRegCalibrationPoint extends BaseType {
  /** Unique identifier for the calibration point. */
  uid: string;
  /** Comments about the log section. */
  Comment?: string[];
  /** Facilitates searching for logs based on curve type. */
  CurveName?: string;
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
  Track: string;
}
export interface DepthRegCalibrationPoint extends _DepthRegCalibrationPoint {
  constructor: { new (): DepthRegCalibrationPoint };
}
export const DepthRegCalibrationPoint: { new (): DepthRegCalibrationPoint };

/** Information about the composition, layout, and depth registration of a digital image of a well log, typically a scanned image of a paper well log document. */
interface _DepthRegImage extends eml._AbstractObject {
  /** Unique identifier for the registration image. */
  uid: string;
  /** Provides a positional reference for sections of the image file not included in other elements of this object. */
  AlternateSection?: DepthRegLogRect[];
  /** Image file checksum. */
  Checksum?: MessageDigestType;
  /** Reference to the file containing the image content. */
  FileName: string;
  /** Mimetype of image file content. */
  FileNameType?: FileNameType;
  /** Size of image file, in bytes. */
  FileSize?: eml.DigitalStorageMeasure;
  /** Log header information extracted from the well log image header section. Also contains X, Y coordinates and positional data with respect to the header section location within the log image file. */
  HeaderSection?: DepthRegLogRect;
  /** The bounding rectangle of the image */
  ImageBoundary: DepthRegRectangle;
  /** @integer Image file height, in pixels. */
  ImagePixelHeight?: number;
  /** @integer Image file width, in pixels. */
  ImagePixelWidth?: number;
  /** Provides log name, log type, curve scale and other information about each log section of the image file. Most importantly, this section contains the depth registration elements (CalibrationPoint) necessary for depth calibrating well log sections. */
  LogSection?: DepthRegLogSection[];
  /** Mimetype of image file content. */
  Mimetype?: MimeType;
  /** File version. */
  Version?: string;
  Wellbore: eml.DataObjectReference;
}
export interface DepthRegImage extends _DepthRegImage {
  constructor: { new (): DepthRegImage };
}
export const DepthRegImage: { new (): DepthRegImage };

/** A region of an image containing a log rectangle. */
interface _DepthRegLogRect extends BaseType {
  /** Unique identifier for the log section. */
  uid: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The name of a rectangular section. */
  Name?: string;
  Position?: DepthRegRectangle;
  /** A region of an image containing a log section image. */
  Type?: LogRectangleType;
}
export interface DepthRegLogRect extends _DepthRegLogRect {
  constructor: { new (): DepthRegLogRect };
}
export const DepthRegLogRect: { new (): DepthRegLogRect };

/** Defines the description and coordinates of a well log section, the curves on the log. An important XSDelement to note is log:refNameString; it is a reference to the actual log/data (in a WITSML server) that this raster image represents; this object does not contain the log data. */
interface _DepthRegLogSection extends BaseType {
  /** Unique identifier for the log section. */
  uid: string;
  /** Generally this associates an X, Y value pair with a depth value from the log section. */
  CalibrationPoint?: DepthRegCalibrationPoint[];
  /** Comments about the calibration. */
  Comment?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The origin for vertical coordinates on the original log. If this is not specified, information about the datum should be specified in a comment. */
  IndexReference?: eml.WellboreDatumReference;
  /** Primary index type. For date-time indexes, any specified index values should be defined as a time offset (e.g., in seconds) from the creationDate of the well log. */
  IndexType: LogIndexType;
  /** Index UOM of the original log. */
  IndexUom: string;
  /** The ID of the log being referred to by this section. */
  Log?: eml.DataObjectReference;
  /** Log matrix assumed for porosity computations. */
  LogMatrix?: string;
  /** Name of a log section;  used to distinguish log sections of the same type. */
  LogSectionName?: string;
  /** The bounding rectangle of this log section. */
  LogSectionRect?: DepthRegRectangle[];
  /** @integer Zero-based index in the log sections, in order of appearance. */
  LogSectionSequenceNumber: number;
  /** Type of log section. */
  LogSectionType?: LogSectionType;
  /** Boundaries of the lower curve scale (or horizontal scale) section for this log section. */
  LowerCurveScaleRect?: DepthRegRectangle[];
  /** Maximum of the range of the index values. '@uom' must be consistent with '//indexType'. */
  MaxInterval: eml.GenericMeasure;
  /** Minimum of the range of theindex values.  '@uom' must be consistent with '//indexType'. */
  MinInterval: eml.GenericMeasure;
  Parameter?: DepthRegParameter[];
  /** The denominator of the index (depth or time) scale of the original log, e. g. "100 ft".  '@uom' must be consistent with '//indexType'. */
  ScaleDenominator?: eml.GenericMeasure;
  /** The numerator of the index (depth or time) scale of the original log, e. g. "5 in". */
  ScaleNumerator?: eml.LengthMeasure;
  Track?: DepthRegTrack[];
  /** Boundaries of the upper curve scale (or horizontal scale) section for this log section. */
  UpperCurveScaleRect?: DepthRegRectangle[];
  /** Vertical log scale label (e.g., “1 IN/100 F”). */
  VerticalLabel?: string;
  /** Second term of the vertical scale ratio (e.g., “240” for a 5-inch-per-100-foot log section). */
  VerticalRatio?: string;
  /** Defines blank space occurring within a log section in an image. */
  WhiteSpace?: DepthRegRectangle[];
}
export interface DepthRegLogSection extends _DepthRegLogSection {
  constructor: { new (): DepthRegLogSection };
}
export const DepthRegLogSection: { new (): DepthRegLogSection };

/** Specifies parameters associated with the log section and includes top and bottom indexes, a description string, and mnemonic. */
interface _DepthRegParameter extends BaseType {
  /** Unique identifier for the parameter. */
  uid: string;
  /** The lower limit of a vertical region for which the parameter value is applicable.  '@uom' must be consistent with '//indexType'. */
  BottomIndex?: eml.GenericMeasure;
  /** A description or definition for the mnemonic; required when ../dictionary is absent. */
  Description?: string;
  /** The name or identifier of the controlling dictionary. */
  Dictionary?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** A dictionary-controlled mnemonic. */
  Mnemonic: string;
  /** The upper limit of a vertical region for which the parameter value is applicable.  '@uom' must be consistent with '//indexType'. */
  TopIndex?: eml.GenericMeasure;
  /** The value assigned to the parameter.
   * The unit of measure should be consistent with the property implied by 'mnemonic' in 'dictionary'.
   * If the value is unitless, then use a unit of 'Euc'. */
  Value: eml.GenericMeasure;
}
export interface DepthRegParameter extends _DepthRegParameter {
  constructor: { new (): DepthRegParameter };
}
export const DepthRegParameter: { new (): DepthRegParameter };

/** The position of a pixel of an image, in x-y coordinates. */
interface _DepthRegPoint extends BaseType {
  /** The x pixel position of a point. */
  X: number;
  /** The y pixel position of a point. */
  Y: number;
}
export interface DepthRegPoint extends _DepthRegPoint {
  constructor: { new (): DepthRegPoint };
}
export const DepthRegPoint: { new (): DepthRegPoint };

/** Uses 4 corner points (Ul, Ur, Ll, Lr) to define the position (pixel) of a rectangular area of an image, using x-y coordinates. Most objects point to this object because most are rectangles, and use this schema to define each rectangle. */
interface _DepthRegRectangle extends BaseType {
  /** Unique identifier for the rectangular area. */
  uid: string;
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
export interface DepthRegRectangle extends _DepthRegRectangle {
  constructor: { new (): DepthRegRectangle };
}
export const DepthRegRectangle: { new (): DepthRegRectangle };

/** Horizontal track layout of the rectified log image that identifies the rectangle for a single log track. */
interface _DepthRegTrack extends BaseType {
  /** Unique identifier for the track. */
  uid: string;
  AssociatedCurve?: DepthRegTrackCurve[];
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** @integer The position of the left edge of the track. */
  LeftEdge: number;
  /** A label associated with the track. */
  Name?: string;
  /** @integer The position of the right edge of the track. */
  RightEdge: number;
  /** Coordinates of rectangle representing the track. */
  TrackCurveScaleRect?: DepthRegRectangle[];
  /** The kind of track. */
  Type: LogTrackType;
}
export interface DepthRegTrack extends _DepthRegTrack {
  constructor: { new (): DepthRegTrack };
}
export const DepthRegTrack: { new (): DepthRegTrack };

/** Descriptions of the actual curve, including elements such as line weight, color, and style, within a log track. */
interface _DepthRegTrackCurve extends BaseType {
  /** Unique identifier for the curve. */
  uid: string;
  /** Scale of the backup curve */
  CurveBackupScaleType: BackupScaleType;
  /** Curve mnemonic */
  CurveInfo: string;
  /** @integer Scale value on the left axis */
  CurveLeftScaleValue: number;
  /** @integer Scale value on the right axis */
  CurveRightScaleValue: number;
  /** Coordinates of rectangle representing the area describing the scale. */
  CurveScaleRect?: DepthRegRectangle[];
  /** Scale linearity */
  CurveScaleType: ScaleType;
  /** Unit of data represented */
  CurveUnit: string;
  /** Details of the line */
  Description?: string;
  /** Color of this line */
  LineColor: string;
  /** Image line style */
  LineStyle: LineStyle;
  /** Description of line graveness */
  LineWeight: string;
}
export interface DepthRegTrackCurve extends _DepthRegTrackCurve {
  constructor: { new (): DepthRegTrackCurve };
}
export const DepthRegTrackCurve: { new (): DepthRegTrackCurve };

/** Specifies the type of drilling derrick. */
export type DerrickType = "double" | "quadruple" | "slant" | "triple";
interface _DerrickType extends eml._TypeEnum {
  content: DerrickType;
}

/** Information on directional survey event. */
interface _DirectionalSurveyExtension extends _AbstractEventExtension {
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to trajectory */
  TrajectoryRefID?: string;
}
export interface DirectionalSurveyExtension
  extends _DirectionalSurveyExtension {
  constructor: { new (): DirectionalSurveyExtension };
}
export const DirectionalSurveyExtension: { new (): DirectionalSurveyExtension };

/** The distance to a one-minute boundary on the east or west of a point. USA Public Land Survey System. */
interface _DistanceEastWest extends eml._AbstractMeasure {
  /** East or west direction. */
  reference: EastOrWest;
  /** The unit of measure of the east-west distance. */
  uom: eml.LengthUom;
}
export interface DistanceEastWest extends _DistanceEastWest {
  constructor: { new (): DistanceEastWest };
}
export const DistanceEastWest: { new (): DistanceEastWest };

/** The distance to a one-minute boundary on the north or south of a point. USA Public Land Survey System */
interface _DistanceNorthSouth extends eml._AbstractMeasure {
  /** North or south direction. */
  reference: NorthOrSouth;
  /** The unit of measure of the north-south distance. */
  uom: eml.LengthUom;
}
export interface DistanceNorthSouth extends _DistanceNorthSouth {
  constructor: { new (): DistanceNorthSouth };
}
export const DistanceNorthSouth: { new (): DistanceNorthSouth };

/** General downhole equipment information. */
interface _DownholeComponent extends eml._AbstractObject {
  BoreholeStringSet?: BoreholeStringSet;
  DownholeStringSet?: DownholeStringSet;
  /** The date the equipment was removed. */
  EndDate?: string;
  EquipmentSet?: EquipmentSet;
  PerforationSets?: PerforationSets;
  /** The date this equipment was installed. */
  StartDate?: string;
  Well: eml.DataObjectReference;
  WellHead?: DownholeString;
}
export interface DownholeComponent extends _DownholeComponent {
  constructor: { new (): DownholeComponent };
}
export const DownholeComponent: { new (): DownholeComponent };

/** Reference to a downhole component identifier */
interface _DownholeComponentReference extends BaseType {
  BoreholeStringReference?: BoreholeStringReference[];
  DownholeStringsReference?: DownholeStringReference[];
  /** Reference to perforation set */
  PerforationSetReferenceId?: string[];
  /** Reference to string equipment */
  StringEquipmentReferenceId?: string[];
}
export interface DownholeComponentReference
  extends _DownholeComponentReference {
  constructor: { new (): DownholeComponentReference };
}
export const DownholeComponentReference: { new (): DownholeComponentReference };

/** Information on downhole related to this event. */
interface _DownholeExtension extends _AbstractEventExtension {
  /** Reference to downhole component */
  DownholeComponentRefID?: string;
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
}
export interface DownholeExtension extends _DownholeExtension {
  constructor: { new (): DownholeExtension };
}
export const DownholeExtension: { new (): DownholeExtension };

/** A section of the downhole component equipment.  Strings in the completion including casing, tubing, and rod strings .A completion may have multiple sets of strings, which may be nested each inside another, or run in parallel as in dual string completions; all strings are contained in a parent wellbore. Each string is composed of equipment, and may also contain accessories and/or assemblies. */
interface _DownholeString extends BaseType {
  /** Unique identifier for this instance of DownholeString. */
  uid: string;
  Accessories?: StringAccessory;
  /** The distance from a sibling string. */
  AxisOffset?: eml.LengthMeasure;
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The name of the downhole string. */
  Name?: string;
  ParentString?: DownholeString;
  /** The name of parent string. */
  ParentStringsName?: string;
  ReferenceWellbore: eml.DataObjectReference;
  StringEquipmentSet?: StringEquipmentSet;
  /** The install date of the downhole string. */
  StringInstallDate?: string;
  /** Measured depth interval between the top and the base of the downhole string. */
  StringMdInterval?: eml.MdInterval;
  /** The type of string defined in the  enumeration DownholeStringType. */
  StringType: DownholeStringType;
  /** The type of substring which can be SurfaceCasing, IntermediaCasing or ProductionCasing. */
  SubStringType?: SubStringType;
}
export interface DownholeString extends _DownholeString {
  constructor: { new (): DownholeString };
}
export const DownholeString: { new (): DownholeString };

/** Refernce to a downhole string identifier */
interface _DownholeStringReference extends BaseType {
  /** Reference to downhole string */
  downholeStringReferenceId: string;
  /** Reference to string equipment */
  StringEquipmentReferenceId?: string[];
}
export interface DownholeStringReference extends _DownholeStringReference {
  constructor: { new (): DownholeStringReference };
}
export const DownholeStringReference: { new (): DownholeStringReference };

/** Information on a collection of downhole strings */
interface _DownholeStringSet extends BaseType {
  DownholeString: DownholeString[];
}
export interface DownholeStringSet extends _DownholeStringSet {
  constructor: { new (): DownholeStringSet };
}
export const DownholeStringSet: { new (): DownholeStringSet };

/** Specifies the values for the type of downhole strings. */
export type DownholeStringType =
  | "casing"
  | "others"
  | "rod"
  | "tubing"
  | "wellhead";
interface _DownholeStringType extends eml._TypeEnum {
  content: DownholeStringType;
}

/** Specifies the type of draw works. */
export type DrawWorksType =
  | "mechanical"
  | "standard electric"
  | "diesel electric"
  | "ram rig";
interface _DrawWorksType extends eml._TypeEnum {
  content: DrawWorksType;
}

/** Operations Activity Component Schema. */
interface _DrillActivity extends BaseType {
  /** Unique identifier for this instance of DrillActivity. */
  uid: string;
  /** A code used to define rig activity. */
  ActivityCode?: DrillActivityCode;
  /** Measured depth interval over which the activity was conducted. */
  ActivityMdInterval?: eml.MdInterval;
  /** True vertical depth interval over which the activity was conducted. */
  ActivityTvdInterval?: eml.TvdInterval;
  /** Range of bit measured depths over which the activity occurred. */
  BitMdInterval?: eml.MdInterval;
  /** Comments and remarks. */
  Comments?: string;
  /** Custom string to further define an activity. */
  DetailActivity?: string;
  /** Date and time that activities ended. */
  DTimEnd?: string;
  /** Date and time that activities started. */
  DTimStart?: string;
  /** The activity duration (commonly in hours). */
  Duration?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The item state for the data object. */
  ItemState?: ItemState;
  /** The measured depth to the drilling activity/operation. */
  Md?: MeasuredDepthCoord;
  /** Operator company name. */
  Operator?: string;
  /** Is the activity optimum.? Values are "true" (or "1") and "false" (or "0"). */
  Optimum?: boolean;
  /** Phase refers to a large activity classification, e.g., drill surface hole. */
  Phase?: string;
  /** Does activity bring closer to objective?  Values are "true" (or "1") and "false" (or "0"). */
  Productive?: boolean;
  ProprietaryCode?: eml.ObjectAlias[];
  /** Finish, interrupted, failed, etc. */
  State?: string;
  /** The outcome of the detailed activity. */
  StateDetailActivity?: StateDetailActivity;
  /** A pointer to the tubular object  related to this activity. */
  Tubular?: string;
  /** True vertical depth to the drilling activity/operation. */
  Tvd?: WellVerticalDepthCoord;
  /** Classifier (planned, unplanned, downtime). */
  TypeActivityClass?: DrillActivityClassType;
}
export interface DrillActivity extends _DrillActivity {
  constructor: { new (): DrillActivity };
}
export const DrillActivity: { new (): DrillActivity };

/** Activity classifier, e.g., planned, unplanned, downtime */
export type DrillActivityClassType = "planned" | "unplanned" | "downtime";
interface _DrillActivityClassType extends eml._TypeEnum {
  content: DrillActivityClassType;
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
  content: DrillActivityCode;
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
export interface DrillingParameters extends _DrillingParameters {
  constructor: { new (): DrillingParameters };
}
export const DrillingParameters: { new (): DrillingParameters };

/** The bottomhole assembly drilling parameters schema, which contains statistical and calculated operations data for the run, related to depths, activities, temperature, pressure, flow rates, torque, etc. */
interface _DrillingParams extends BaseType {
  /** Unique identifier for the parameters */
  uid: string;
  /** Azimuth at stop measured depth. */
  AziBottom?: eml.PlaneAngleMeasure;
  /** Azimuth at start measured depth. */
  AziTop?: eml.PlaneAngleMeasure;
  /** Comments and remarks. */
  Comments?: string;
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
  MdHoleStart?: MeasuredDepthCoord;
  /** Measured depth at the end of the run. */
  MdHoleStop: MeasuredDepthCoord;
  /** The class of the drilling fluid. */
  MudClass?: MudClass;
  /** Mud Subtype at event occurrence. */
  MudSubClass?: MudSubClass;
  /** Objective of bottom hole assembly. */
  ObjectiveBha?: string;
  /** Overpull = HkldUp - HkldRot */
  OverPull?: eml.ForceMeasure;
  /** Bit hydraulic. */
  PowBit?: eml.PowerMeasure;
  /** Pressure drop in bit. */
  PresDropBit?: eml.PressureMeasure;
  /** Average pump pressure. */
  PresPumpAv?: eml.PressureMeasure;
  /** Reason for trip. */
  ReasonTrip?: string;
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
  Tubular?: string;
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
export interface DrillingParams extends _DrillingParams {
  constructor: { new (): DrillingParams };
}
export const DrillingParams: { new (): DrillingParams };

/** Used to capture a daily drilling report focused on reporting from the operator to partners or to a governmental agency. For a similar report whose focus is service company to operator, see the OpsReport object. */
interface _DrillReport extends eml._AbstractObject {
  /** Information about a bit. */
  BitRecord?: BitRecord[];
  ControlIncidentInfo?: DrillReportControlIncidentInfo[];
  CoreInfo?: DrillReportCoreInfo[];
  /** The date and time the report was created. A later timestamp indicates a newer version of the report. To update values in a report, a full updated copy of the original report should be submitted. */
  CreateDate?: string;
  DrillActivity?: DrillActivity[];
  /** Date and time that the reporting period ended. A report period is commonly 24 hours. */
  DTimEnd: string;
  /** Date and time that the reporting period started. A report period is commonly 24 hours. */
  DTimStart: string;
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
  SurveyStation?: DrillReportSurveyStation[];
  /** The kind of report version. For example, a
   * preliminary version. */
  VersionKind?: OpsReportVersion;
  WellAlias?: eml.ObjectAlias;
  Wellbore: eml.DataObjectReference;
  WellboreAlias?: eml.ObjectAlias[];
  WellboreInfo?: DrillReportWellboreInfo;
  /** Defines a vertical datum used for measured depths, vertical depths, or elevations. If one of these coordinate values is included in the report, then you must specify a well datum.
   * This requirement only applies to this report, which is generally a copy of the same information from the well object. */
  WellDatum?: WellDatum[];
  WellTestInfo?: DrillReportWellTestInfo[];
}
export interface DrillReport extends _DrillReport {
  constructor: { new (): DrillReport };
}
export const DrillReport: { new (): DrillReport };

/** Information about a well control incident that occurred during the drill report period. */
interface _DrillReportControlIncidentInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportControlIncidentInfo. */
  uid: string;
  /** A code used to define rig activity. */
  ActivityCode?: DrillActivityCode;
  /** A description of the well control incident. */
  Description?: string;
  /** Custom string to further define an activity. */
  DetailActivity?: string;
  /** The drill bit nominal outside diameter at the time of the well control incident. */
  DiaBit?: eml.LengthMeasure;
  /** Diameter of the last installed casing. */
  DiaCsgLast?: eml.LengthMeasure;
  /** Date and time of the well control incident. */
  DTim?: string;
  /** The date and time at which control of the well was regained. */
  DTimRegained?: string;
  /** The amount of time lost because of the well control incident. Commonly specified in hours. */
  ETimLost?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The lithological description of the geological formation at the incident depth. */
  Formation?: string;
  /** The type of well control incident. */
  IncidentType?: WellControlIncidentType;
  /** The type of procedure used to kill the well. */
  KillingType?: WellKillingProcedureType;
  /** The measured depth of the bit at the time of the the well control incident. */
  MdBit?: MeasuredDepthCoord;
  /** Measured depth of the last casing joint. */
  MdCsgLast?: MeasuredDepthCoord;
  /** The measured depth to the well inflow entry point. */
  MdInflow?: MeasuredDepthCoord;
  /** Phase is large activity classification, e.g. drill surface hole. */
  Phase?: string;
  /** The equivalent mud weight value of the pore pressure reading. */
  PorePressure: eml.MassPerVolumeMeasure;
  /** The maximum pressure that the choke valve can be exposed to. */
  PresMaxChoke?: eml.PressureMeasure;
  /** The shut in casing pressure. */
  PresShutInCasing?: eml.PressureMeasure;
  /** The actual pressure in the drill pipe when the rams were closed around it. */
  PresShutInDrill?: eml.PressureMeasure;
  ProprietaryCode?: eml.ObjectAlias[];
  /** The temperature at the bottom of the wellbore. */
  TempBottom?: eml.ThermodynamicTemperatureMeasure;
  /** The true vertical depth to the well inflow entry point. */
  TvdInflow?: WellVerticalDepthCoord;
  /** The gained volume of drilling fluid due to the well kick. */
  VolMudGained?: eml.VolumeMeasure;
  /** The density of the drilling fluid at the time of the well control incident. */
  WtMud?: eml.MassPerVolumeMeasure;
}
export interface DrillReportControlIncidentInfo
  extends _DrillReportControlIncidentInfo {
  constructor: { new (): DrillReportControlIncidentInfo };
}
export const DrillReportControlIncidentInfo: {
  new (): DrillReportControlIncidentInfo;
};

/** General information about a core taken during the drill report period. */
interface _DrillReportCoreInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportCoreInfo. */
  uid: string;
  /** General core description. */
  CoreDescription?: string;
  /** Cored interval expressed as measured depth. */
  CoredMdInterval?: eml.MdInterval;
  /** Cored interval expressed as true vertical depth. */
  CoredTvdInterval?: eml.TvdInterval;
  /** Core identification number. */
  CoreNumber?: string;
  /** Date and time that the core was completed. */
  DTim?: string;
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
export interface DrillReportCoreInfo extends _DrillReportCoreInfo {
  constructor: { new (): DrillReportCoreInfo };
}
export const DrillReportCoreInfo: { new (): DrillReportCoreInfo };

/** General information about equipment failure that occurred during the drill report period. */
interface _DrillReportEquipFailureInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportEquipFailureInfo. */
  uid: string;
  /** A description of the equipment failure. */
  Description?: string;
  /** Date and time that the equipment failed. */
  DTim?: string;
  /** The date and time at which the production equipment was
   * repaired and ready for production. */
  DTimRepair?: string;
  /** The classification of the equipment that failed. */
  EquipClass?: string;
  /** The missed production time because of the equipment failure. */
  ETimMissProduction?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The measured depth of the operation end point where the failure happened. */
  Md?: MeasuredDepthCoord;
  /** The true vertical depth of the  operation end point where failure the failure happened. */
  Tvd?: WellVerticalDepthCoord;
}
export interface DrillReportEquipFailureInfo
  extends _DrillReportEquipFailureInfo {
  constructor: { new (): DrillReportEquipFailureInfo };
}
export const DrillReportEquipFailureInfo: {
  new (): DrillReportEquipFailureInfo;
};

/** General information about a wireline formation test that occurred during the drill report period. */
interface _DrillReportFormTestInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportFormTestInfo. */
  uid: string;
  /** The density of the hydrocarbon component of the fluid sample. */
  DensityHC?: eml.MassPerVolumeMeasure;
  /** A detailed description of the wireline formation test. */
  Description?: string;
  /** The dominate component in the fluid sample. */
  DominateComponent?: string;
  /** Date and time that the wireline formation test was completed. */
  DTim?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Was there a good seal for the wireline formation test? Values are "true" or "1" or "false" or "0". */
  GoodSeal?: boolean;
  /** Measured depth at which the wireline formation test was conducted. */
  Md?: MeasuredDepthCoord;
  /** Measured depth where the fluid sample was taken. */
  MdSample?: MeasuredDepthCoord;
  /** The formation pore pressure.
   * The pressure of fluids within the pores of a reservoir, usually hydrostatic pressure,
   * or the pressure exerted by a column of water from the formation's depth to sea level. */
  PresPore?: eml.PressureMeasure;
  /** True vertical depth at which the wireline formation test was conducted. */
  Tvd?: WellVerticalDepthCoord;
  /** The volume of the fluid sample. */
  VolumeSample?: eml.VolumeMeasure;
}
export interface DrillReportFormTestInfo extends _DrillReportFormTestInfo {
  constructor: { new (): DrillReportFormTestInfo };
}
export const DrillReportFormTestInfo: { new (): DrillReportFormTestInfo };

/** General information about a gas reading taken during the drill report period. */
interface _DrillReportGasReadingInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportGasReadingInfo. */
  uid: string;
  /** Date and time of the gas reading. */
  DTim?: string;
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
  GasReadingTvdInterval?: eml.TvdInterval;
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
export interface DrillReportGasReadingInfo extends _DrillReportGasReadingInfo {
  constructor: { new (): DrillReportGasReadingInfo };
}
export const DrillReportGasReadingInfo: { new (): DrillReportGasReadingInfo };

/** General information about the lithology and shows in an interval encountered during the drill report period. */
interface _DrillReportLithShowInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportLithShowInfo */
  uid: string;
  /** Date and time that the well test was completed. */
  DTim?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** A geological/lithological description/evaluation of the interval. */
  Lithology?: string;
  /** A textual description of any shows in the interval. */
  Show?: string;
  /** Measured depth interval over which the show appears. */
  ShowMdInterval?: eml.MdInterval;
  /** True vertical depth interval over which the show appears. */
  ShowTvdInterval?: eml.TvdInterval;
}
export interface DrillReportLithShowInfo extends _DrillReportLithShowInfo {
  constructor: { new (): DrillReportLithShowInfo };
}
export const DrillReportLithShowInfo: { new (): DrillReportLithShowInfo };

/** General information about a log conducted during the drill report period. */
interface _DrillReportLogInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportLogInfo. */
  uid: string;
  BottomHoleTemperature?: AbstractBottomHoleTemperature;
  /** The date and time that the log was completed. */
  DTim?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth interval from the top to the base of the interval logged. */
  LoggedMdInterval?: eml.MdInterval;
  /** True vertical depth interval from the top to the base of the interval logged. */
  LoggedTvdInterval?: eml.TvdInterval;
  /** Measured depth to the temperature measurement tool. */
  MdTempTool?: MeasuredDepthCoord;
  /** Log run number.
   * For measurement while drilling, this should be the
   * bottom hole assembly number. */
  RunNumber?: string;
  /** Name of the contractor who provided the service. */
  ServiceCompany?: string;
  /** A description of the logging tool. */
  Tool?: string;
  /** True vertical depth to the temperature measurement tool. */
  TvdTempTool?: WellVerticalDepthCoord;
}
export interface DrillReportLogInfo extends _DrillReportLogInfo {
  constructor: { new (): DrillReportLogInfo };
}
export const DrillReportLogInfo: { new (): DrillReportLogInfo };

/** General information about a perforation interval related to the drill report period. */
interface _DrillReportPerfInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportPerfInfo. */
  uid: string;
  /** The date and time at which the well perforation interval is closed. */
  DTimClose?: string;
  /** The date and time at which the well perforation interval is opened. */
  DTimOpen?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth interval between the top and the base of the perforations. */
  PerforationMdInterval?: eml.MdInterval;
  /** True vertical depth interval between the top and the base of the perforations. */
  PerforationTvdInterval?: eml.TvdInterval;
}
export interface DrillReportPerfInfo extends _DrillReportPerfInfo {
  constructor: { new (): DrillReportPerfInfo };
}
export const DrillReportPerfInfo: { new (): DrillReportPerfInfo };

/** General information about pore pressure related to the drill report period. */
interface _DrillReportPorePressure extends BaseType {
  /** Unique identifier for this instance of DrillReportPorePressure. */
  uid: string;
  /** Date and time at the reading was recorded. */
  DTim?: string;
  /** The equivalent mud weight value of the pore pressure reading. */
  EquivalentMudWeight: eml.MassPerVolumeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth where the readings were recorded. */
  Md?: MeasuredDepthCoord;
  /** Indicate if the reading was estimated or measured. */
  ReadingKind: ReadingKind;
  /** True vertical depth where the readings were recorded. */
  Tvd?: WellVerticalDepthCoord;
}
export interface DrillReportPorePressure extends _DrillReportPorePressure {
  constructor: { new (): DrillReportPorePressure };
}
export const DrillReportPorePressure: { new (): DrillReportPorePressure };

/** General status information for the drill report period. */
interface _DrillReportStatusInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportStatusInfo. */
  uid: string;
  /** Description of the hole condition. */
  ConditionHole?: string;
  CostDay?: Cost;
  CostDayMud?: Cost;
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
  DTim?: string;
  ElevKelly?: WellElevationCoord;
  /** Name of the operator's drilling engineer. */
  Engineer?: string;
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
  Forecast24Hr?: string;
  /** Name of operator's wellsite geologist. */
  Geologist?: string;
  /** Maximum allowable shut-in casing pressure. */
  Maasp?: eml.PressureMeasure;
  /** Wellbore measured depth at the end of the report period. */
  Md?: MeasuredDepthCoord;
  /** Measured depth of the last casing joint. */
  MdCsgLast?: MeasuredDepthCoord;
  /** Measured depth to the start of the current hole diameter. */
  MdDiaHoleStart?: MeasuredDepthCoord;
  /** The planned measured depth of the pilot hole. */
  MdDiaPilotPlan?: MeasuredDepthCoord;
  /** Measured depth to the kickoff point of the wellbore. */
  MdKickoff?: MeasuredDepthCoord;
  /** The measured depth planned to be reached. */
  MdPlanned?: MeasuredDepthCoord;
  /** The measured plug back depth. */
  MdPlugTop?: MeasuredDepthCoord;
  /** The measured depth of the formation strength measurement. */
  MdStrengthForm?: MeasuredDepthCoord;
  /** Authorization for expenditure (AFE) number that this cost item applies to. */
  NumAFE?: string;
  /** @integer Number of contractor personnel on the rig. */
  NumContract?: number;
  /** @integer Number of operator personnel on the rig. */
  NumOperator?: number;
  /** @integer Total number of personnel on the rig. */
  NumPob?: number;
  /** @integer Number of service company personnel on the rig. */
  NumService?: number;
  ParentWellbore?: eml.ObjectAlias[];
  /** Kick tolerance pressure. */
  PresKickTol?: eml.PressureMeasure;
  /** Leak off test equivalent mud weight. */
  PresLotEmw?: eml.MassPerVolumeMeasure;
  /** The type of pressure test that was run. */
  PresTestType?: PresTestType;
  /** A pointer to the rig used. */
  Rig?: string;
  /** Average rate of penetration. */
  RopAv?: eml.LengthPerTimeMeasure;
  /** Rate of penetration at the end of the reporting period. */
  RopCurrent?: eml.LengthPerTimeMeasure;
  /** The measured formation strength. This should be the final measurement before the end of the report period. */
  StrengthForm?: eml.MassPerVolumeMeasure;
  /** A summary of the activities performed and the status of the ongoing activities. */
  Sum24Hr?: string;
  /** Name of the operator's rig supervisor. */
  Supervisor?: string;
  /** A pointer to the tubular (assembly) used in this report period. */
  Tubular?: string;
  /** Wellbore true vertical depth at the end of the report. */
  Tvd?: WellVerticalDepthCoord;
  /** True vertical depth of last casing joint. */
  TvdCsgLast?: WellVerticalDepthCoord;
  /** The planned true vertical depth of the pilot hole. */
  TvdDiaPilotPlan?: WellVerticalDepthCoord;
  /** True vertical depth to the kickoff point of the wellbore. */
  TvdKickoff?: MeasuredDepthCoord;
  /** True vertical depth of a leak off test point. */
  TvdLot?: WellVerticalDepthCoord;
  /** The true vertical depth of the formation strength measurement. */
  TvdStrengthForm?: WellVerticalDepthCoord;
  /** Type of wellbore. */
  TypeWellbore?: WellboreType;
  /** Kick tolerance volume. */
  VolKickTol?: eml.VolumeMeasure;
}
export interface DrillReportStatusInfo extends _DrillReportStatusInfo {
  constructor: { new (): DrillReportStatusInfo };
}
export const DrillReportStatusInfo: { new (): DrillReportStatusInfo };

/** General information about stratigraphy for the drill report period. */
interface _DrillReportStratInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportStratInfo. */
  uid: string;
  /** A lithological description of the geological formation at the given depth. */
  Description?: string;
  /** Date and time at which a preliminary zonation was established. */
  DTim?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth at the top of the formation. */
  MdTop?: MeasuredDepthCoord;
  /** True vertical depth at the top of the formation. */
  TvdTop?: WellVerticalDepthCoord;
}
export interface DrillReportStratInfo extends _DrillReportStratInfo {
  constructor: { new (): DrillReportStratInfo };
}
export const DrillReportStratInfo: { new (): DrillReportStratInfo };

/** Trajectory station information for the drill report period. */
interface _DrillReportSurveyStation extends BaseType {
  /** Unique identifier for this instance of DrillReportSurveyStation. */
  uid: string;
  /** Hole azimuth, corrected to a well's azimuth reference. */
  Azi?: eml.PlaneAngleMeasure;
  /** Dogleg severity. */
  Dls?: eml.AnglePerLengthMeasure;
  /** The date at which the directional survey took place. */
  DTim: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Hole inclination, measured from vertical. */
  Incl?: eml.PlaneAngleMeasure;
  Location?: AbstractWellLocation[];
  /** Measured depth of measurement from the drill datum. */
  Md: MeasuredDepthCoord;
  /** True vertical depth of the measurements. */
  Tvd?: WellVerticalDepthCoord;
  /** Distance along the vertical section of an azimuth plane. */
  VertSect?: eml.LengthMeasure;
}
export interface DrillReportSurveyStation extends _DrillReportSurveyStation {
  constructor: { new (): DrillReportSurveyStation };
}
export const DrillReportSurveyStation: { new (): DrillReportSurveyStation };

/** General information about a wellbore for a drill report period. */
interface _DrillReportWellboreInfo extends BaseType {
  /** The date when the drilling activity was completed. */
  DateDrillComplete?: Date;
  /** The name of the drilling contractor company. */
  DrillContractor?: string;
  /** Date and time at which the well was predrilled.
   * This is when the well drilling equipment begin to bore into
   * the earth's surface for the purpose of drilling a well. */
  DTimPreSpud?: string;
  /** Date and time at which the well was spudded. This is when the well drilling equipment began to bore into the earth's surface for the purpose of drilling a well. */
  DTimSpud?: string;
  /** The name of the drilling Operator company responsible for the well being drilled (the company for whom the well is being drilled). */
  Operator?: string;
  RigAlias?: eml.ObjectAlias[];
}
export interface DrillReportWellboreInfo extends _DrillReportWellboreInfo {
  constructor: { new (): DrillReportWellboreInfo };
}
export const DrillReportWellboreInfo: { new (): DrillReportWellboreInfo };

/** General information about a production well test conducted during the drill report period. */
interface _DrillReportWellTestInfo extends BaseType {
  /** Unique identifier for this instance of DrillReportWellTestInfo. */
  uid: string;
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
  DTim?: string;
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
  /** @integer The number of the well test. */
  TestNumber?: number;
  /** Test interval expressed as a true vertical depth. */
  TestTvdInterval?: eml.TvdInterval;
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
export interface DrillReportWellTestInfo extends _DrillReportWellTestInfo {
  constructor: { new (): DrillReportWellTestInfo };
}
export const DrillReportWellTestInfo: { new (): DrillReportWellTestInfo };

/** Specifies the type of work-string drive (rotary system). */
export type DriveType = "coiled tubing" | "rotary kelly drive" | "top drive";
interface _DriveType extends eml._TypeEnum {
  content: DriveType;
}

/** Information on corrected drilling exponents. */
interface _DxcStatistics extends BaseType {
  /** Corrected drilling exponent calculated for the interval. */
  Average?: eml.DimensionlessMeasure;
  /** Log channel from which the drilling coefficient statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface DxcStatistics extends _DxcStatistics {
  constructor: { new (): DxcStatistics };
}
export const DxcStatistics: { new (): DxcStatistics };

/** Specifies east or west direction. */
export type EastOrWest = "east" | "west";
interface _EastOrWest extends eml._TypeEnum {
  content: EastOrWest;
}

/** Information on equivalent circulating density statistics. */
interface _EcdStatistics extends BaseType {
  /** Average equivalent circulating density at TD through the interval. */
  Average?: eml.MassPerVolumeMeasure;
  /** Log channel from which the equivalent circulating density at TD statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface EcdStatistics extends _EcdStatistics {
  constructor: { new (): EcdStatistics };
}
export const EcdStatistics: { new (): EcdStatistics };

/** Specifies values for the type of local or permanent reference datum for vertical gravity-based (i.e., elevation and vertical depth) and measured depth coordinates within the context of a well. This list includes local points (e.g., kelly bushing) used as a datum and vertical reference datums (e.g., mean sea level). */
export type ElevCodeEnum =
  | "CF"
  | "CV"
  | "DF"
  | "GL"
  | "KB"
  | "RB"
  | "RT"
  | "SF"
  | "LAT"
  | "SL"
  | "MHHW"
  | "MHW"
  | "MLLW"
  | "MLW"
  | "MTL"
  | "KO"
  | "unknown";
interface _ElevCodeEnum extends eml._TypeEnum {
  content: ElevCodeEnum;
}

/** Information on a piece of equipment. Each kind of equipment in the set has a type (what it is) and attributes common across all instances of that type of equipment. The String Equipment then references these common attributes. */
interface _Equipment extends BaseType {
  /** Unique identifier for this instance of Equipment. */
  uid: string;
  /** The equipment's brand name. */
  BrandName?: string;
  /** Catalog where equipment can be found. */
  CatalogId?: string;
  /** Name of equipment as found in the catalog. */
  CatalogName?: string;
  /** Flag indicating whether equipment has a coating. */
  CoatingLinerApplied?: boolean;
  /** The description of this equipment. */
  Description?: string;
  /** The description of this equipment to be permanently kept. */
  DescriptionPermanent?: string;
  /** The drift diameter is the minimum inside diameter of pipe through which another tool or string can be pulled. */
  Drift?: eml.LengthMeasure;
  /** The name of the piece of equipment. */
  EquipmentName?: string;
  /** The equipment type etc. bridge plug, bull plug. capillary tubing. */
  EquipmentType: string;
  ExtensionAny?: eml.CustomData;
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
  /** Manufacturer of this equipment. */
  Manufacturer?: string;
  /** Material that the equipment is made from. */
  Material?: string;
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
  Model?: string;
  /** The equipment's model type. */
  ModelType?: string;
  /** Sweet or sour service. */
  NameService?: string;
  /** The nominal size of this equipment. */
  NominalSize?: eml.LengthMeasure;
  /** The outside diameter of this equipment. */
  Od?: eml.LengthMeasure;
  /** Equipment's outside coating based on enumeration value. */
  OutsideCoating?: Coating;
  /** Number that identifies this part. */
  PartNo?: string;
  Property?: ExtPropNameValue[];
  /** Remarks about this equipment property. */
  Remark?: string;
  /** Serial number. */
  SerialNumber?: string;
  /** Series number. */
  Series?: string;
  SlotAsManufactured?: PerfSlot[];
  /** Surface condition. */
  SurfaceCondition?: string;
  /** The length of this equipment. */
  UnitLength?: eml.LengthMeasure;
  /** The weight per length of this equipment. */
  UnitWeight?: eml.MassPerLengthMeasure;
}
export interface Equipment extends _Equipment {
  constructor: { new (): Equipment };
}
export const Equipment: { new (): Equipment };

/** Information detailing the connection between two components. */
interface _EquipmentConnection extends _Connection {
  /** Reference to the string equipment. */
  stringEquipmentReferenceUid: string;
  /** The form of connection: box or pin. */
  ConnectionForm?: ConnectionFormType;
  ConnectionType?: AbstractConnectionType;
  /** Connection upset. */
  ConnectionUpset?: string;
  /** Measurement of radial offset. */
  RadialOffset?: eml.LengthMeasure;
}
export interface EquipmentConnection extends _EquipmentConnection {
  constructor: { new (): EquipmentConnection };
}
export const EquipmentConnection: { new (): EquipmentConnection };

/** Information on the collection of equipment. */
interface _EquipmentSet extends BaseType {
  Equipment: Equipment[];
}
export interface EquipmentSet extends _EquipmentSet {
  constructor: { new (): EquipmentSet };
}
export const EquipmentSet: { new (): EquipmentSet };

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
  content: EquipmentType;
}

/** An extension of possible equipment types. */
export type EquipmentTypeExt = string;
type _EquipmentTypeExt = Primitive._string;

/** Specifies the various misalignment maths. */
export type ErrorModelMisalignmentMode = "unknown" | "1" | "2" | "3";
interface _ErrorModelMisalignmentMode extends eml._TypeEnum {
  content: ErrorModelMisalignmentMode;
}

/** Specifies the codes for the various propagation modes. */
export type ErrorPropagationMode = "B" | "R" | "S" | "W" | "G";
interface _ErrorPropagationMode extends eml._TypeEnum {
  content: ErrorPropagationMode;
}

/** Specifies the codes for the various classes of error sources. */
export type ErrorTermSource =
  | "sensor"
  | "azimuth reference"
  | "magnetic"
  | "alignment"
  | "misalignment"
  | "depth"
  | "reference";
interface _ErrorTermSource extends eml._TypeEnum {
  content: ErrorTermSource;
}

/** Specifies the type of data contained in a channel to facilitate data transfer using the Energistics Transfer Protocol (ETP). */
export type EtpDataType =
  | "boolean"
  | "bytes"
  | "double"
  | "float"
  | "int"
  | "long"
  | "null"
  | "string"
  | "vector";
interface _EtpDataType extends eml._TypeEnum {
  content: EtpDataType;
}

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
  content: EventClassType;
}

/** Event information type. */
interface _EventInfo extends BaseType {
  BeginEvent?: EventRefInfo;
  EndEvent?: EventRefInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
}
export interface EventInfo extends _EventInfo {
  constructor: { new (): EventInfo };
}
export const EventInfo: { new (): EventInfo };

/** Event reference information. */
interface _EventRefInfo extends BaseType {
  /** Install/pull date. */
  EventDate?: string;
  /** The referencing eventledger ID. */
  EventReferenceId?: string;
}
export interface EventRefInfo extends _EventRefInfo {
  constructor: { new (): EventRefInfo };
}
export const EventRefInfo: { new (): EventRefInfo };

/** The type of the referencing event */
interface _EventType extends eml._String64 {
  /** The type of the event (job, daily report, etc.) */
  Class: EventClassType;
}
export interface EventType extends _EventType {
  constructor: { new (): EventType };
}
export const EventType: { new (): EventType };

/** Name-value extensions for the equipment property. */
interface _ExtPropNameValue extends BaseType {
  /** Unique identifier for this instance of ExtPropNameValue. */
  uid: string;
  /** A string representing the name of property. */
  Name?: string;
  /** A value string representing the units of measure of the value. */
  Value?: string;
}
export interface ExtPropNameValue extends _ExtPropNameValue {
  constructor: { new (): ExtPropNameValue };
}
export const ExtPropNameValue: { new (): ExtPropNameValue };

/** Specifies the type of file referenced. */
export type FileNameType =
  | "file name"
  | "path name"
  | "universal resource locator"
  | "other";
interface _FileNameType extends eml._TypeEnum {
  content: FileNameType;
}

/** Fluid component schema. */
interface _Fluid extends BaseType {
  /** Unique identifier for this instance of Fluid. */
  uid: string;
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
  Comments?: string;
  /** Name of company. */
  Company?: string;
  /** Fluid density. */
  Density?: eml.MassPerVolumeMeasure;
  /** The time when fluid readings were recorded. */
  DTim?: string;
  /** Equivalent circulating density where fluid reading was recorded. */
  Ecd?: eml.MassPerVolumeMeasure;
  /** Measurement of the emulsion stability and oil-wetting capability in oil-based muds. */
  ElectStab?: eml.ElectricPotentialDifferenceMeasure;
  /** Engineer name */
  Engineer?: string;
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
  LocationSample?: string;
  /** Magnesium content. */
  Magnesium?: eml.MassPerVolumeMeasure;
  /** Cation exchange capacity (CEC) of the mud sample as measured by methylene blue titration (MBT).
   *
   * NOTE: This is temporarily set to be a GenericMeasure with no unit validation, pending addition of CEC units to the Energistics UoM spec. */
  Mbt?: eml.GenericMeasure;
  /** The measured depth where the fluid readings were recorded. */
  Md?: MeasuredDepthCoord;
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
  PolyType?: string;
  /** Potassium content. */
  Potassium?: eml.MassPerVolumeMeasure;
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
  Tvd?: WellVerticalDepthCoord;
  /** Description for the type of fluid. */
  Type?: string;
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
export interface Fluid extends _Fluid {
  constructor: { new (): Fluid };
}
export const Fluid: { new (): Fluid };

/** Location of fluid in the wellbore. */
interface _FluidLocation extends BaseType {
  /** Unique identifier for this instance of FluidLocation. */
  uid: string;
  /** Reference to fluid used in the CementJob. */
  FluidReferenceId: string;
  LocationType: WellboreFluidLocation;
  /** Measured depth of the base of the cement. */
  MDFluidBase: eml.LengthMeasure;
  /** Measured depth at the top of the interval. */
  MDFluidTop: eml.LengthMeasure;
  /** Volume of fluid at this location. */
  Volume: eml.VolumeMeasure;
}
export interface FluidLocation extends _FluidLocation {
  constructor: { new (): FluidLocation };
}
export const FluidLocation: { new (): FluidLocation };

/** Information on fluid report event. */
interface _FluidReportExtension extends _AbstractEventExtension {
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to the fluid report */
  FluidReportRefID?: string;
}
export interface FluidReportExtension extends _FluidReportExtension {
  constructor: { new (): FluidReportExtension };
}
export const FluidReportExtension: { new (): FluidReportExtension };

/** Used to capture an analysis of the drilling mud. */
interface _FluidsReport extends eml._AbstractObject {
  /** Date and time the information is related to. */
  DTim: string;
  Fluid?: Fluid[];
  /** Along-hole measured depth of measurement from the drill datum. */
  Md: MeasuredDepthCoord;
  /** @integer Fluids report number. */
  NumReport?: number;
  /** Vertical depth of the measurements. */
  Tvd?: WellVerticalDepthCoord;
  Wellbore: eml.DataObjectReference;
}
export interface FluidsReport extends _FluidsReport {
  constructor: { new (): FluidsReport };
}
export const FluidsReport: { new (): FluidsReport };

/** Specifies the values for mud log parameters that are measured in units of force. */
export type ForceParameterKind = "overpull on connection" | "overpull on trip";
interface _ForceParameterKind extends eml._TypeEnum {
  content: ForceParameterKind;
}

/** Information on amount of gas in the mud. */
interface _GasInMud extends BaseType {
  /** Average percentage of gas in the mud. */
  Average?: eml.VolumePerVolumeMeasure;
  Channel: eml.DataObjectReference;
  /** Maximum percentage of gas in the mud. */
  Maximum?: eml.VolumePerVolumeMeasure;
}
export interface GasInMud extends _GasInMud {
  constructor: { new (): GasInMud };
}
export const GasInMud: { new (): GasInMud };

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
export interface GasPeak extends _GasPeak {
  constructor: { new (): GasPeak };
}
export const GasPeak: { new (): GasPeak };

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
  content: GasPeakType;
}

/** A unit of geological time that can be used as part of an interpretation of a geology sequence. Use it for major units of geological time such as “Paleozoic”, “Mesozoic” or for more detailed time intervals such as ”Permian”, “Triassic”, “Jurassic”, etc. */
interface _GeochronologicalUnit extends eml._String64 {
  /** Person or collective body responsible for authorizing the information. */
  authority?: string;
  /** Defines the time spans in geochronology. */
  kind: eml.GeochronologicalRank;
}
export interface GeochronologicalUnit extends _GeochronologicalUnit {
  constructor: { new (): GeochronologicalUnit };
}
export const GeochronologicalUnit: { new (): GeochronologicalUnit };

/** Location of the well by latitude and longitude. */
interface _GeodeticWellLocation extends _AbstractWellLocation {
  Crs: eml.AbstractGeodeticCrs;
  /** The latitude with north being positive. */
  Latitude: eml.PlaneAngleMeasure;
  /** The longitude with east being positive. */
  Longitude: eml.PlaneAngleMeasure;
}
export interface GeodeticWellLocation extends _GeodeticWellLocation {
  constructor: { new (): GeodeticWellLocation };
}
export const GeodeticWellLocation: { new (): GeodeticWellLocation };

/** Geology features found in the location of the borehole string. */
interface _GeologyFeature extends BaseType {
  /** Unique identifier for this instance of GeologyFeature. */
  uid: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Measured depth interval for this feature. */
  FeatureMdInterval?: eml.MdInterval;
  /** True vertical depth interval for this feature. */
  FeatureTvdInterval?: eml.TvdInterval;
  /** Aquifer or reservoir. */
  GeologyType?: GeologyType;
  /** Name of the feature. */
  Name?: string;
}
export interface GeologyFeature extends _GeologyFeature {
  constructor: { new (): GeologyFeature };
}
export const GeologyFeature: { new (): GeologyFeature };

/** Specifies the values for type of geology. */
export type GeologyType = "aquifer" | "reservoir";
interface _GeologyType extends eml._TypeEnum {
  content: GeologyType;
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
  content: GradeType;
}

/** The location/interval of the gravel pack, including its history. */
interface _GravelPackInterval extends BaseType {
  /** Unique identifier for this instance of GravelPackInterval. */
  uid: string;
  /** Reference to the downhole string that denotes the interval of the gravel pack. */
  DownholeStringReferenceId?: string;
  /** The contactInterval event information. */
  EventHistory?: EventInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to a geology feature. */
  GeologyFeatureReferenceId?: string[];
  /** Gravel packed measured depth interval for this completion. */
  GravelPackMdInterval?: eml.MdInterval;
  /** Gravel packed true vertical depth interval for this completion. */
  GravelPackTvdInterval?: eml.TvdInterval;
  StatusHistory?: IntervalStatusHistory[];
}
export interface GravelPackInterval extends _GravelPackInterval {
  constructor: { new (): GravelPackInterval };
}
export const GravelPackInterval: { new (): GravelPackInterval };

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
  content: HoleCasingType;
}

/** Hole Opener Component Schema. Describes the hole-opener tool (often called a ‘reamer’) used on the tubular string. */
interface _HoleOpener extends BaseType {
  /** Diameter of the reamer. */
  DiaHoleOpener?: eml.LengthMeasure;
  ExtensionAny?: eml.CustomData;
  /** Manufacturer or supplier of the tool. */
  Manufacturer?: string;
  /** @integer Number of cutters on the tool. */
  NumCutter?: number;
  /** Under reamer or fixed blade. */
  TypeHoleOpener?: HoleOpenerType;
}
export interface HoleOpener extends _HoleOpener {
  constructor: { new (): HoleOpener };
}
export const HoleOpener: { new (): HoleOpener };

/** Specifies the types of hole openers. */
export type HoleOpenerType = "under-reamer" | "fixed blade";
interface _HoleOpenerType extends eml._TypeEnum {
  content: HoleOpenerType;
}

/** Operations Health, Safety and Environment Schema. Captures data related to HSE events (e.g., tests, inspections, meetings, and drills), test values (e.g., pressure tested to), and/or incidents (e.g., discharges, non-compliance notices received, etc.). */
interface _Hse extends BaseType {
  /** Comments and remarks. */
  Comments?: string;
  /** Incident free duration (commonly in days). */
  DaysIncFree?: eml.TimeMeasure;
  /** Daily whole mud discarded. */
  FluidDischarged?: eml.VolumeMeasure;
  Incident?: Incident[];
  /** Last abandonment drill. */
  LastAbandonDrill?: string;
  /** Last blow out preventer drill. */
  LastBopDrill?: string;
  /** Last blow out preventer pressure test. */
  LastBopPresTest?: string;
  /** Last casing pressure test date and time. */
  LastCsgPresTest?: string;
  /** Last diverter drill. */
  LastDiverterDrill?: string;
  /** Last fire or life boat drill. */
  LastFireBoatDrill?: string;
  /** Last rig inspection/check. */
  LastRigInspection?: string;
  /** Last safety inspection. */
  LastSafetyInspection?: string;
  /** Last safety meeting. */
  LastSafetyMeeting?: string;
  /** Last trip drill. */
  LastTripDrill?: string;
  /** Next blow out preventer pressure test. */
  NextBopPresTest?: string;
  /** Inspection non-compliance notice served?
   * Values are "true" (or "1") and "false" (or "0"). */
  NonComplianceIssued?: boolean;
  /** @integer Number of health, safety and environment incidents reported. */
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
export interface Hse extends _Hse {
  constructor: { new (): Hse };
}
export const Hse: { new (): Hse };

/** Rig Hydrocyclones Schema. A hydrocyclone is a cone-shaped device for separating fluids and the solids dispersed in fluids. */
interface _Hydrocyclone extends BaseType {
  /** Unique identifier for this instance of Hydrocyclone. */
  uid: string;
  /** Cone description. */
  DescCone?: string;
  /** Date and time the hydroclone was installed. */
  DTimInstall?: string;
  /** Removal date and time the hydroclone was removed. */
  DTimRemove?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Manufacturer or supplier of the item. */
  Manufacturer?: string;
  /** Manufacturer's designated model. */
  Model?: string;
  /** An identification tag for the hydrocyclone.
   * A serial number is a type of identification tag; however, some tags contain many pieces of information. This element only identifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** Contractor/owner. */
  Owner?: string;
  /** Description of the type of object. */
  Type?: string;
}
export interface Hydrocyclone extends _Hydrocyclone {
  constructor: { new (): Hydrocyclone };
}
export const Hydrocyclone: { new (): Hydrocyclone };

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
  content: IadcBearingWearCode;
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
  content: IadcIntegerCode;
}

/** Describes what survey measurement or value the error term applies to. */
interface _Inc extends _AbstractIscwsaErrorCoefficient {
  /** Inclination, measured deviation from vertical. */
  Inc: string;
}
export interface Inc extends _Inc {
  constructor: { new (): Inc };
}
export const Inc: { new (): Inc };

/** Operations HSE Schema. Captures data for a specific incident. */
interface _Incident extends BaseType {
  /** Unique identifier for this instance of Incident */
  uid: string;
  /** Cause description. */
  CauseDesc?: string;
  /** Gross estimate of the cost incurred due to the incident. */
  CostLossGross?: Cost;
  /** Accident description. */
  DescAccident?: string;
  /** Location description. */
  DescLocation?: string;
  /** Date and time the information is related to. */
  DTim: string;
  /** Number of hours lost due to the incident. */
  ETimLostGross?: eml.TimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Near miss incident occurrence?
   * Values are "true" (or "1") and "false" (or "0"). */
  IsNearMiss?: boolean;
  /** @integer Number of personnel killed due to the incident. */
  NumFatality?: number;
  /** @integer Number of personnel with major injuries. */
  NumMajorInjury?: number;
  /** @integer Number of personnel with minor injuries. */
  NumMinorInjury?: number;
  /** Remedial action description. */
  RemedialActionDesc?: string;
  /** Name of the person who prepared the incident report. */
  Reporter?: string;
  /** Name of the company that caused the incident. */
  ResponsibleCompany?: string;
}
export interface Incident extends _Incident {
  constructor: { new (): Incident };
}
export const Incident: { new (): Incident };

/** Specifies the direction of the index, whether decreasing or increasing. */
export type IndexDirection = "decreasing" | "increasing";
interface _IndexDirection extends eml._TypeEnum {
  content: IndexDirection;
}

/** Describes the data context for a log in terms of a starting and ending index. When this context is used, each realization of the log includes all data points from the log's channel set that follow between the specified start and end index. */
interface _IndexRangeContext extends _AbstractLogDataContext {
  /** When the log header defines the direction as:
   *
   * - "Increasing", the startIndex is the starting (minimum) index value at which the first non-null data point is located.
   * - "Decreasing", the startIndex is the starting (maximum) index value at which the first non-null data point is located. */
  EndIndex: AbstractIndexValue;
  /** When the log header defines the direction as:
   *
   * - "Increasing", the endIndex is the ending (maximum) index value at which the last non-null data point is located.
   * -  “Decreasing”, the endIndex is the ending (minimum) index value at which the last non-null data point is located. */
  StartIndex: AbstractIndexValue;
}
export interface IndexRangeContext extends _IndexRangeContext {
  constructor: { new (): IndexRangeContext };
}
export const IndexRangeContext: { new (): IndexRangeContext };

/** Core inner barrel type. */
export type InnerBarrelType =
  | "undifferentiated"
  | "aluminum"
  | "gel"
  | "fiberglass";
interface _InnerBarrelType extends eml._TypeEnum {
  content: InnerBarrelType;
}

/** A container object for zero or more InterpretedGeologyInterval objects. The container references a specific wellbore, a depth interval, a growing object status, and a collection of interpreted geology intervals.
 * These values are manually entered per sample by the wellsite geologist or mud logger as an interpretation of the actual lithology sequence along the length of the wellbore by correlating the percentage lithologies observed in the cuttings samples along with other data (typically the drill rate and gamma ray curves), to estimate the location of the boundaries between the different lithology types. This analysis creates a sequence of individual lithologies along the wellbore. Therefore, InterpretedGeology typically contains a single lithology element for each interval that captures the detailed geological description of the lithology. */
interface _InterpretedGeology extends eml._AbstractObject {
  GeologicIntervalInterpreted?: InterpretedGeologyInterval[];
  /** Describes the growing status of the interpreted geology. Valid values: active, inactive or closed. */
  GrowingStatus: ChannelStatus;
  /** [maintained by the server] The interval that contains the minimum and maximum measured depths for all interpreted intervals in this interpreted geology. */
  MdInterval: eml.MdInterval;
  Wellbore: eml.DataObjectReference;
}
export interface InterpretedGeology extends _InterpretedGeology {
  constructor: { new (): InterpretedGeology };
}
export const InterpretedGeology: { new (): InterpretedGeology };

/** Represents a depth interval along the wellbore which contains a single interpreted lithology type. It can be used to:
 *
 * - carry information about geochronology and lithostratigraphy
 * - create a pre-well geological prognosis with chronostratigraphic, lithostratigraphic, and lithology entries. */
interface _InterpretedGeologyInterval extends eml._AbstractObject {
  /** Unique identifier for this instance of InterpretedGeologyInterval. */
  uid: string;
  /** The name of a Geochronology, with the "kind" attribute specifying the geochronological time span. */
  GeochronologicalUnit?: GeochronologicalUnit[];
  InterpretedLithology?: InterpretedIntervalLithology;
  /** Specifies the unit of lithostratigraphy. */
  LithostratigraphicUnit?: LithostratigraphicUnit[];
  /** The measured depth interval which is described by this interpreted geology. */
  MdInterval: eml.MdInterval;
}
export interface InterpretedGeologyInterval
  extends _InterpretedGeologyInterval {
  constructor: { new (): InterpretedGeologyInterval };
}
export const InterpretedGeologyInterval: { new (): InterpretedGeologyInterval };

/** The description of a single rock type that is used within InterpretedGeologyInterval. There can only be one of these in each InterpretedGeologyInterval. */
interface _InterpretedIntervalLithology extends BaseType {
  /** Unique identifier for this instance of InterpretedIntervalLithology. */
  uid?: string;
  /** An ISO 19115 EIP-derived set of metadata attached to ensure the traceability of the InterpretedIntervalLithology */
  Citation?: eml.Citation;
  /** An optional custom lithology encoding scheme.
   * If used, it is recommended that the scheme follows the NPD required usage. With the numeric values noted in the enum tables, which was the original intent for this item.
   * The NPD Coding System assigns a digital code to the main lithologies as per the Norwegian Blue Book data standards.
   * The code was then derived by lithology = (main lithology * 10) + cement + (modifier / 100).
   * Example: Calcite cemented silty micaceous sandstone: (33 * 10) + 1 + (21 / 100) gives a numeric code of 331.21.
   * However, the NPD is also working through Energistics/Caesar to potentially change this usage.)
   * This scheme should not be used for mnemonics, because those vary by operator, and if an abbreviation is required, a local look-up table should be used by the rendering client, based on Lithology Type. */
  CodeLith?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology color description, from Shell 1995 4.3.3.1 and 4.3.3.2 Colors with the addition of: frosted. e.g., black, blue, brown, buff, green, grey, olive, orange, pink, purple, red, translucent, frosted, white, yellow; modified by: dark, light, moderate, medium, mottled, variegated, slight, weak, strong, and vivid. */
  Color?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology compaction from Shell 1995 4.3.1.5, which includes: not compacted, slightly compacted, compacted, strongly compacted, friable, indurated, hard. */
  Compaction?: string;
  /** STRUCTURED DESCRIPTION USAGE. Mineral hardness. Typically, this element is rarely used because mineral hardness is not typically recorded.
   * What typically is recorded is compaction. However, this element is retained for use defined as per Mohs scale of mineral hardness. */
  Hardness?: string;
  /** The geological name for the type of lithology from the enum table listing a
   * subset of the OneGeology / CGI defined formation types. */
  Kind: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology matrix/cement description. Terms will be as defined in the enumeration table.
   * e.g., "calcite" (Common) "dolomite", "ankerite" (e.g., North Sea HPHT reservoirs such as Elgin and Franklin have almost pure ankerite cementation) "siderite" (Sherwood sandstones, southern UK typical Siderite cements), "quartz" (grain-to-grain contact cementation or secondary quartz deposition), "kaolinite", "illite" (e.g., Village Fields North Sea), "smectite","chlorite" (Teg, Algeria.). */
  MatrixCement?: eml.MatrixCementKind;
  /** STRUCTURED DESCRIPTION USAGE. Lithology permeability description from Shell 4.3.2.5.
   * In the future, these values would benefit from quantification, e.g., tight, slightly, fairly, highly. */
  Permeability?: string;
  /** STRUCTURED DESCRIPTION USAGE. Visible porosity fabric description from after Shell 4.3.2.1 and 4.3.2.2: intergranular (particle size greater than 20m), fine interparticle (particle size less than 20m), intercrystalline, intragranular, intraskeletal, intracrystalline, mouldic, fenestral, shelter, framework, stylolitic, replacement, solution, vuggy, channel, cavernous. */
  PorosityFabric?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology visible porosity description.
   * Defined after BakerHughes definitions, as opposed to Shell, which has no linkage to actual numeric estimates. */
  PorosityVisible?: string;
  Qualifier?: LithologyQualifier[];
  /** STRUCTURED DESCRIPTION USAGE. Lithology roundness description from Shell 4.3.1.3. Roundness refers to modal size class: very angular, angular, subangular, subrounded, rounded, well rounded. */
  Roundness?: string;
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
  SizeGrain?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology sorting description from Shell 4.3.1.2 Sorting: very poorly sorted, unsorted, poorly sorted, poorly to moderately well sorted, moderately well sorted, well sorted, very well sorted, unimodally sorted, bimodally sorted. */
  Sorting?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology sphericity description for the modal size class of grains in the sample, defined as per Shell 4.3.1.4 Sphericity: very elongated, elongated, slightly elongated, slightly spherical, spherical, very spherical. */
  Sphericity?: string;
  /** STRUCTURED DESCRIPTION USAGE. Lithology matrix texture description from Shell 1995 4.3.2.6: crystalline, (often "feather-edge" appearance on breaking), friable, dull, earthy, chalky, (particle size less than 20m; often exhibits capillary imbibition) visibly particulate, granular, sucrosic, (often exhibits capillary imbibition).
   * Examples: compact interlocking, particulate, (Gradational textures are quite common.) chalky matrix with sucrosic patches, (Composite textures also occur). */
  Texture?: string;
}
export interface InterpretedIntervalLithology
  extends _InterpretedIntervalLithology {
  constructor: { new (): InterpretedIntervalLithology };
}
export const InterpretedIntervalLithology: {
  new (): InterpretedIntervalLithology;
};

/** Information on the status history in the interval. */
interface _IntervalStatusHistory extends BaseType {
  /** Unique identifier for this instance of IntervalStatusHistory. */
  uid: string;
  /** Defines the proportional amount of fluid from the well completion that is flowing through this interval within a wellbore. */
  AllocationFactor?: number;
  /** Comments and remarks about the interval over this period of time. */
  Comment?: string;
  /** The end date of status and allocation factor. */
  EndDate?: string;
  /** The physical status of an interval (e.g., open, closed, proposed). */
  PhysicalStatus?: PhysicalStatus;
  /** The start date of  the status and allocation factor. */
  StartDate?: string;
  /** Measured depth interval over which this status is valid for the given time frame. */
  StatusMdInterval?: eml.MdInterval;
}
export interface IntervalStatusHistory extends _IntervalStatusHistory {
  constructor: { new (): IntervalStatusHistory };
}
export const IntervalStatusHistory: { new (): IntervalStatusHistory };

/** Inventory Component Schema. */
interface _Inventory extends BaseType {
  /** Unique identifier for this instance of Inventory. */
  uid: string;
  /** Cost for the product for the report interval. */
  CostItem?: Cost;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Item weight or volume per unit. */
  ItemWtOrVolPerUnit: AbstractItemWtOrVolPerUnit;
  /** Name or type of inventory item. */
  Name: string;
  /** Price per item unit, assume same currency for all items. */
  PricePerUnit?: Cost;
  /** @integer Daily quantity adjustment/correction. */
  QtyAdjustment?: number;
  /** @integer Amount of the item remaining on location after all adjustments for the report interval. */
  QtyOnLocation?: number;
  /** @integer Quantity received at the site. */
  QtyReceived?: number;
  /** @integer Quantity returned to base from site. */
  QtyReturned?: number;
  /** @integer Start quantity for report interval. */
  QtyStart?: number;
  /** @integer Quantity used for the report interval. */
  QtyUsed?: number;
}
export interface Inventory extends _Inventory {
  constructor: { new (): Inventory };
}
export const Inventory: { new (): Inventory };

/** Authorization state of some entity. The main goal of the Industry Steering Committee on Wellbore Survey Accuracy (ISCWSA) is to to produce and maintain standards for the industry relating to wellbore survey accuracy. */
interface _IscwsaAuthorizationData extends BaseType {
  /** Person responsible for the information. */
  Author?: string;
  /** Person or collective body responsible for authorizing the information. */
  Authority: string;
  /** A comment about the object.
   * This should include information regarding the derivation of the information. */
  Comment?: string;
  /** Source from which the information is derived. */
  Source?: string;
  /** Authorization state of the information. */
  Status: AuthorizationStatus;
  /** Version name or number. */
  Version?: string;
}
export interface IscwsaAuthorizationData extends _IscwsaAuthorizationData {
  constructor: { new (): IscwsaAuthorizationData };
}
export const IscwsaAuthorizationData: { new (): IscwsaAuthorizationData };

/** Describes what survey measurement or value the error term applies to. */
interface _IscwsaErrorCoefficient extends BaseType {
  /** Unique identifier for this instance of IscwsaErrorCoefficient. */
  uid: string;
  AbstractIscwsaErrorCoefficient: AbstractIscwsaErrorCoefficient[];
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
}
export interface IscwsaErrorCoefficient extends _IscwsaErrorCoefficient {
  constructor: { new (): IscwsaErrorCoefficient };
}
export const IscwsaErrorCoefficient: { new (): IscwsaErrorCoefficient };

/** Captures the reference error terms that are included in error models using ErrorTermValues. */
interface _IscwsaErrorTerm extends BaseType {
  /** Unique identifier for this instance of IscwsaErrorTerm. */
  uid: string;
  /** Human-readable name for the term. It may be presented in application software, e.g., "MWD: X-Acceleromter Bias with Z-Axis Corr." */
  Description?: string;
  ErrorCoefficient: IscwsaErrorCoefficient[];
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Human-readable name for the term, may be presented in
   * application software. E.g., "MWD: X-Acceleromter Bias with Z-Axis Corr." */
  Label: string;
  /** The kind of quantity that the term represents.
   * This constrains the unit that can be used for any errorTermValues. */
  MeasureClass?: eml.MeasureClass;
  /** This is the unique mnemonic for this term, e.g., "ABIX" or "DECR". */
  Name: string;
  /** Operating mode that is valid for this error term. In the absence of this element assume "stationary". */
  OperatingMode?: SurveyToolOperatingMode[];
  /** The class of the error source. */
  Type?: ErrorTermSource;
}
export interface IscwsaErrorTerm extends _IscwsaErrorTerm {
  constructor: { new (): IscwsaErrorTerm };
}
export const IscwsaErrorTerm: { new (): IscwsaErrorTerm };

/** The instantiation of an error term in an error model.The content of this element (a number) is the variance scaling factor of the term in the model. */
interface _IscwsaErrorTermValue extends BaseType {
  /** Unique identifier for this instance of IscwsaErrorTermValue. */
  uid: string;
  /** The mean or expected value of the variance. */
  Bias?: number;
  /** A textual comment about this error term value. */
  Comment?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The propagation mode for this term in this model. */
  Prop: ErrorPropagationMode;
  /** A pointer to the errorTerm represented by this value.
   * This term must exist in the toolErrorTermSet referenced by the parent of this node.
   * The same term may only be referenced once in the model. */
  Term: string;
  Value: MeasureOrQuantity;
}
export interface IscwsaErrorTermValue extends _IscwsaErrorTermValue {
  constructor: { new (): IscwsaErrorTermValue };
}
export const IscwsaErrorTermValue: { new (): IscwsaErrorTermValue };

/** Various parameters controlling the generation of the survey variance. */
interface _IscwsaModelParameters extends BaseType {
  /** Inclination at which gyro initialization occurs. */
  GyroInitialization?: eml.PlaneAngleMeasure;
  /** Maximum length of continuous survey before re-initialization. */
  GyroReinitializationDistance?: eml.LengthMeasure;
  /** Speed at which the tool traverses the wellbore during a continuous survey. */
  GyroRunningSpeed?: eml.LengthPerTimeMeasure;
  /** Choice of mathmatical modelling of misalignment. */
  MisalignmentMode: ErrorModelMisalignmentMode;
  /** Factor applied to random noise error terms, depending on the mode of gyro initialization. Values must be greater than zero and less than or equal to 1. */
  NoiseReductionFactor?: number;
  /** True if the survey tool is rotated at inclinations greater than 90 degrees. */
  Switching?: boolean;
}
export interface IscwsaModelParameters extends _IscwsaModelParameters {
  constructor: { new (): IscwsaModelParameters };
}
export const IscwsaModelParameters: { new (): IscwsaModelParameters };

/** A generic type which captures a name and a description of something.
 * The semantics of the something is defined by the parent element. */
interface _IscwsaNameAndDescription extends BaseType {
  /** Unique identifier for this instance of IscwsaNameAndDescription. */
  uid: string;
  /** A textual description of the item. */
  Description: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The name of the item. */
  Name: string;
}
export interface IscwsaNameAndDescription extends _IscwsaNameAndDescription {
  constructor: { new (): IscwsaNameAndDescription };
}
export const IscwsaNameAndDescription: { new (): IscwsaNameAndDescription };

/** A nomenclature for the description of error terms. */
interface _IscwsaNomenclature extends BaseType {
  Constant?: IscwsaNomenclatureConstant[];
  Function?: IscwsaNameAndDescription[];
  Parameter?: IscwsaNameAndDescription[];
}
export interface IscwsaNomenclature extends _IscwsaNomenclature {
  constructor: { new (): IscwsaNomenclature };
}
export const IscwsaNomenclature: { new (): IscwsaNomenclature };

/** A nomenclature constant. */
interface _IscwsaNomenclatureConstant extends BaseType {
  /** Unique identifier for this instance of IscwsaNomenclatureConstant. */
  uid: string;
  /** A textual description of the constant. */
  Description: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The name of the constant. */
  Name: string;
  /** The unit of measure of the constant. This value must match an acronym from the Energistics unit of measure dictionary. */
  Unit: string;
  /** The value of the constant. */
  Value: number;
}
export interface IscwsaNomenclatureConstant
  extends _IscwsaNomenclatureConstant {
  constructor: { new (): IscwsaNomenclatureConstant };
}
export const IscwsaNomenclatureConstant: { new (): IscwsaNomenclatureConstant };

/** Describes the survey acquisition context in which an error model is valid as a sequence of constraints. */
interface _IscwsaSurveyToolOperatingCondition extends BaseType {
  /** Unique identifier for this instance of IscwsaSurveyToolOperatingCondition. */
  uid: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The greatest value the constraint may take. */
  Max?: eml.GenericMeasure;
  /** The least value the constraint may take. */
  Min?: eml.GenericMeasure;
  /** A particular constraint. */
  Parameter?: string;
  /** A fixed value that the constraint must take. */
  Value?: string;
}
export interface IscwsaSurveyToolOperatingCondition
  extends _IscwsaSurveyToolOperatingCondition {
  constructor: { new (): IscwsaSurveyToolOperatingCondition };
}
export const IscwsaSurveyToolOperatingCondition: {
  new (): IscwsaSurveyToolOperatingCondition;
};

/** Inclination interval for a particular operating mode.
 * Intervals may overlap to suppress mode flip-flopping, but should cover
 * the entire valid range of the tool. */
interface _IscwsaSurveyToolOperatingInterval extends BaseType {
  /** Unique identifier for this instance of IscwsaSurveyToolOperatingInterval. */
  uid: string;
  /** Inclination at which the mode terminates. */
  End: eml.PlaneAngleMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Tool operating mode over this interval. */
  Mode: SurveyToolOperatingMode;
  /** Time between survey samples for continuous surveys. */
  SampleRate?: eml.TimeMeasure;
  /** Running speed for continuous surveys. */
  Speed?: eml.LengthPerTimeMeasure;
  /** Inclination at which the mode begins. */
  Start: eml.PlaneAngleMeasure;
}
export interface IscwsaSurveyToolOperatingInterval
  extends _IscwsaSurveyToolOperatingInterval {
  constructor: { new (): IscwsaSurveyToolOperatingInterval };
}
export const IscwsaSurveyToolOperatingInterval: {
  new (): IscwsaSurveyToolOperatingInterval;
};

/** Crush test data point. */
interface _ISO13503_2CrushTestData extends BaseType {
  /** Unique identifier for this instance of ISO13503_2CrushTestData. */
  uid: string;
  /** Mass percentage of fines after being exposed to stress. */
  Fines: eml.MassPerMassMeasure;
  /** Stress measured at a point during a crush test. */
  Stress: eml.PressureMeasure;
}
export interface ISO13503_2CrushTestData extends _ISO13503_2CrushTestData {
  constructor: { new (): ISO13503_2CrushTestData };
}
export const ISO13503_2CrushTestData: { new (): ISO13503_2CrushTestData };

/** Proppant properties on percent retained and sieve number. Data from this ISO anaylsis. */
interface _ISO13503_2SieveAnalysisData extends BaseType {
  /** Unique identifier for this instance of ISO13503_2SieveAnalysisData. */
  uid: string;
  /** The percentage of mass retained in the sieve. */
  PercentRetained: eml.MassPerMassMeasure;
  /** @integer ASTM US Standard mesh opening size used in the sieve analysis test.  To indicate "Pan",  use "0". */
  SieveNumber: number;
}
export interface ISO13503_2SieveAnalysisData
  extends _ISO13503_2SieveAnalysisData {
  constructor: { new (): ISO13503_2SieveAnalysisData };
}
export const ISO13503_2SieveAnalysisData: {
  new (): ISO13503_2SieveAnalysisData;
};

/** These values represent the state of a WITSML object. */
export type ItemState = "actual" | "model" | "plan";
interface _ItemState extends eml._TypeEnum {
  content: ItemState;
}

/** Item volume per unit. */
interface _ItemVolPerUnit extends _AbstractItemWtOrVolPerUnit {
  /** Item volume per unit. */
  ItemVolPerUnit: eml.VolumeMeasure;
}
export interface ItemVolPerUnit extends _ItemVolPerUnit {
  constructor: { new (): ItemVolPerUnit };
}
export const ItemVolPerUnit: { new (): ItemVolPerUnit };

/** Item weight per unit. */
interface _ItemWtPerUnit extends _AbstractItemWtOrVolPerUnit {
  /** Item weight per unit. */
  ItemWtPerUnit: eml.MassMeasure;
}
export interface ItemWtPerUnit extends _ItemWtPerUnit {
  constructor: { new (): ItemWtPerUnit };
}
export const ItemWtPerUnit: { new (): ItemWtPerUnit };

/** WITSML - Tubular Jar Component Schema. Captures information about jars, which are mechanical or hydraulic devices used in the drill stem to deliver an impact load to another component of the drill stem, especially when that component is stuck. */
interface _Jar extends BaseType {
  ExtensionAny?: eml.CustomData;
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
export interface Jar extends _Jar {
  constructor: { new (): Jar };
}
export const Jar: { new (): Jar };

/** Specifies the type of jar action. */
export type JarAction = "up" | "down" | "both" | "vibrating";
interface _JarAction extends eml._TypeEnum {
  content: JarAction;
}

/** Specifies the type of jar. */
export type JarType = "mechanical" | "hydraulic" | "hydro mechanical";
interface _JarType extends eml._TypeEnum {
  content: JarType;
}

/** Information on the job event. */
interface _JobExtension extends _AbstractEventExtension {
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Comment on the reason for the job */
  JobReason?: string;
  /** Status of job */
  JobStatus?: string;
  /** The primary reason for doing this job. */
  PrimaryMotivationForJob?: string;
}
export interface JobExtension extends _JobExtension {
  constructor: { new (): JobExtension };
}
export const JobExtension: { new (): JobExtension };

/** Integer level code from 1 through 8. */
export type LevelIntegerCode = number;
type _LevelIntegerCode = Primitive._number;

/** Specifies the style of line used to define the DepthRegTrackCurve. */
export type LineStyle =
  | "dashed"
  | "solid"
  | "dotted"
  | "short dashed"
  | "long dashed";
interface _LineStyle extends eml._TypeEnum {
  content: LineStyle;
}

/** A description of minerals or accessories that constitute a fractional part of a CuttingsIntervalLithology. */
interface _LithologyQualifier extends BaseType {
  /** Unique identifier for this instance of LithologyQualifier */
  uid: string;
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
  Description?: string;
  /** The type of qualifier. */
  Kind: string;
  /** The measured depth interval represented by the qualifier. This must be within the range of the parent geologic interval. If MdInterval is not given then the qualifier is deemed to exist over the entire depth range of the parent geologyInterval. */
  MdInterval?: eml.MdInterval;
}
export interface LithologyQualifier extends _LithologyQualifier {
  constructor: { new (): LithologyQualifier };
}
export const LithologyQualifier: { new (): LithologyQualifier };

/** The name of a lithostratigraphy, with the "kind" attribute specifying the lithostratigraphic unit-hierarchy (group, formation, member or bed). The entry at each level is free text for the local lithostratigraphy at that level in the hierarchy. If a single hierarchy is defined, it is assumed this is at the formation level in the hierarchy and kind=formation should be used for the entry.
 * Used to hold information about the stratigraphic units that an interpreted lithology may belong to. These are based primarily on the differences between rock types rather than their specific age. For example, in the Grand Canyon, some of the major lithostratigraphic units are the “Navajo”, “Kayenta”, “Wingate”, “Chinle” and “Moenkopi” formations, each of which is represented by a particular set of rock properties or characteristics. */
interface _LithostratigraphicUnit extends eml._String64 {
  /** Person or collective body responsible for authorizing the information. */
  authority: string;
  /** Specifies the lithostratigraphic unit-hierarchy (group, formation, member or bed). */
  kind: eml.LithostratigraphicRank;
}
export interface LithostratigraphicUnit extends _LithostratigraphicUnit {
  constructor: { new (): LithostratigraphicUnit };
}
export const LithostratigraphicUnit: { new (): LithostratigraphicUnit };

/** Primarily a container for one or more channel sets (ChannelSet). In WITSML v2.+, most of the log information is now at the channel set level. The concept of multiple channel sets in a single log is significant change from WITSML v1.4.1.1, where each log represented exactly one group of curves and their data. For more information about log organization and how it works, see the WITSML Technical Usage Guide. */
interface _Log extends eml._AbstractObject {
  /** A mandatory value categorizing a log channel. The classification system used in WITSML is the one from the PWLS group. */
  ChannelClass?: eml.DataObjectReference;
  ChannelSet: ChannelSet[];
  /** Defines where the channel gets its data from, e.g., calculated from another source, or from archive, or raw real-time, etc. */
  ChannelState?: ChannelState;
  /** Indicates that the channel is derived from one or more other channels. */
  Derivation?: ChannelDerivation;
  /** When the log header defines the direction as:
   *
   * - "Increasing", the endIndex is the ending (maximum) index value at which the last non-null data point is located.
   * - “Decreasing”, the endIndex is the ending (minimum) index value at which the last non-null data point is located. */
  EndIndex?: AbstractIndexValue;
  /** The RP66 organization code assigned to a logging company. The list is available at http://www.energistics.org/geosciences/geology-standards/rp66-organization-codes */
  LoggingCompanyCode?: string;
  /** Name of the logging company. */
  LoggingCompanyName?: string;
  /** Defines where the log channel gets its data from: LWD, MWD, wireline; or whether it is computed, etc. */
  LoggingMethod?: LoggingMethod;
  /** The nominal hole size (typically the bit size) at the time the measurement tool was in the hole. The size is "nominal" to indicate that this is not the result of a caliper reading or other direct measurement of the hole size, but is just a name used to refer to the diameter.
   * When more than one diameter holes are being drilled at the same time (e.g., where a reamer is behind the bit), this diameter is the one that was seen by the sensor that produced a particular log channel. */
  NominalHoleSize?: eml.LengthMeasureExt;
  /** The nominal pass number for the channel. No precise meaning is declared for this attribute but it is so commonly used that it must be included.
   *
   * The value here should match a wireline pass number for logging data. */
  PassNumber?: string;
  /** The nominal run number for the channel. No precise meaning is declared for this attribute but it is so commonly used that it must be included.
   *
   * The value here should match a bit run number for LWD data and a wireline run number for logging data. */
  RunNumber?: string;
  /** When the log header defines the direction as:
   *
   * - "Increasing", the startIndex is the starting (minimum) index value at which the first non-null data point is located.
   * - "Decreasing", the startIndex is the starting (maximum) index value at which the first non-null data point is located. */
  StartIndex?: AbstractIndexValue;
  /** Use to indicate if this is a time or depth log. */
  TimeDepth?: string;
  /** A value categorizing a logging tool. The classification system used in WITSML is the one from the PWLS group. */
  ToolClass?: string;
  /** Name of the logging tool as given by the logging contractor. */
  ToolName?: string;
  Wellbore: eml.DataObjectReference;
}
export interface Log extends _Log {
  constructor: { new (): Log };
}
export const Log: { new (): Log };

/** Metadata by which the array structure of a compound value is defined. It defines one axis of an array type used in a log channel. */
interface _LogChannelAxis extends BaseType {
  /** A unique identifier for an instance of a log channel axis */
  uid: string;
  /** @integer The count of elements along this axis of the array. */
  AxisCount: number;
  /** The name of the array axis. */
  AxisName?: string;
  /** The property type by which the array axis is classified. Like "measured depth" or "elapsed time". */
  AxisPropertyKind: string;
  /** @integer The increment to be used to fill out the list of the log channel axis index values. */
  AxisSpacing: number;
  /** @integer Value of the initial entry in the list of axis index values. */
  AxisStart: number;
  /** A string representing the units of measure of the axis values. */
  AxisUom: string;
}
export interface LogChannelAxis extends _LogChannelAxis {
  constructor: { new (): LogChannelAxis };
}
export const LogChannelAxis: { new (): LogChannelAxis };

/** Specifies the method of logging used to record or produce the data in the log. */
export type LoggingMethod =
  | "computed"
  | "distributed"
  | "LWD"
  | "mixed"
  | "MWD"
  | "surface"
  | "wireline";
interface _LoggingMethod extends eml._TypeEnum {
  content: LoggingMethod;
}

/** These values represent the type of data used as an index value for a log. */
export type LogIndexType =
  | "date time"
  | "elapsed time"
  | "length"
  | "measured depth"
  | "vertical depth"
  | "other";
interface _LogIndexType extends eml._TypeEnum {
  content: LogIndexType;
}

/** Specifies the type of content from the original log defined by the rectangle. */
export type LogRectangleType = "header" | "alternate";
interface _LogRectangleType extends eml._TypeEnum {
  content: LogRectangleType;
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
  content: LogSectionType;
}

/** Specifies the kinds of track. */
export type LogTrackType = "curves" | "data" | "depth" | "traces" | "other";
interface _LogTrackType extends eml._TypeEnum {
  content: LogTrackType;
}

/** Information on lost circulation event. */
interface _LostCirculationExtension extends _AbstractEventExtension {
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Volume lost */
  VolumeLost?: eml.VolumeMeasure;
}
export interface LostCirculationExtension extends _LostCirculationExtension {
  constructor: { new (): LostCirculationExtension };
}
export const LostCirculationExtension: { new (): LostCirculationExtension };

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
  content: MaterialType;
}

/** A measured depth coordinate in a wellbore. Positive moving from the reference datum toward the bottomhole. All coordinates with the same datum (and same UOM) can be considered to be in the same coordinate reference system (CRS) and are thus directly comparable. */
interface _MeasuredDepthCoord extends eml._AbstractMeasure {
  /** Defines the vertical datums associated with elevation, vertical depth, and measured depth coordinates. */
  datum: string;
  /** Unit of measure used by this measured depth coordinate. */
  uom: eml.LengthUom;
}
export interface MeasuredDepthCoord extends _MeasuredDepthCoord {
  constructor: { new (): MeasuredDepthCoord };
}
export const MeasuredDepthCoord: { new (): MeasuredDepthCoord };

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
  content: MeasurementType;
}

/** A measure with a UOM or a quantity (without a UOM). This should not be used except in situations where the underlying class of data is captured elsewhere, e.g., in a measure class. */
interface _MeasureOrQuantity extends eml._AbstractMeasure {
  /** A measure with a UOM or a quantity (without a UOM). This should not be used except in situations where the underlying class of data is captured elsewhere, e.g., in a measure class. */
  uom: string;
}
export interface MeasureOrQuantity extends _MeasureOrQuantity {
  constructor: { new (): MeasureOrQuantity };
}
export const MeasureOrQuantity: { new (): MeasureOrQuantity };

/** Defines a member of an objectGroup. */
interface _MemberObject extends BaseType {
  /** Unique identifier for this instance of MemberObject */
  uid: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** For a log object, this specifies the kind of the index curve for the log.
   * This is only relevant for a systematically growing object. */
  IndexType?: LogIndexType;
  /** A comma delimited list of log curve mnemonics.
   * Each mnemonic should only occur once in the list.
   * If not specified then the group applies to all curves in the log. */
  MnemonicList?: string;
  ObjectReference: eml.DataObjectReference;
  /** The maximum log date-time index value that applies to this group.
   * The significance of this range is defined by the groupType. */
  RangeDateTimeMax?: string;
  /** The minimum log date-time index value that applies to this group.
   * The significance of this range is defined by the groupType. */
  RangeDateTimeMin?: string;
  /** The maximum growing-object index value that applies to this group.
   * The significance of this range is defined by the groupType. */
  RangeMax?: eml.GenericMeasure;
  /** The minimum growing-object index value that applies to this group.
   * The significance of this range is defined by the groupType. */
  RangeMin?: eml.GenericMeasure;
  /** A date and time related to this group.
   * This does not necessarily represent an actual index within a growing-object.
   * The significance of this time is defined by the groupType. */
  ReferenceDateTime?: string;
  /** A measured depth related to this group.
   * This does not necessarily represent an actual depth within a growing-object.
   * The significance of this depth is defined by the groupType. */
  ReferenceDepth?: MeasuredDepthCoord;
  Sequence1: ObjectSequence;
  Sequence2: ObjectSequence;
  Sequence3: ObjectSequence;
}
export interface MemberObject extends _MemberObject {
  constructor: { new (): MemberObject };
}
export const MemberObject: { new (): MemberObject };

/** Specifies message digest types. */
export type MessageDigestType = "MD5" | "SHA1" | "other";
interface _MessageDigestType extends eml._TypeEnum {
  content: MessageDigestType;
}

/** Specifies the list of mimetypes. */
export type MimeType =
  | "image/tiff"
  | "image/gif"
  | "image/png"
  | "image/xml+svg"
  | "other";
interface _MimeType extends eml._TypeEnum {
  content: MimeType;
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
  ExtensionAny?: eml.CustomData;
  /** Minimum flow rate. */
  FlowrateMn?: eml.VolumePerTimeMeasure;
  /** Maximum flow rate. */
  FlowrateMx?: eml.VolumePerTimeMeasure;
  /** @integer Number of rotor lobes. */
  LobesRotor?: number;
  /** @integer Number of stator lobes. */
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
  /** Maximum operating temperature. */
  TempOpMx?: eml.ThermodynamicTemperatureMeasure;
  /** Type of bearing. */
  TypeBearing?: BearingType;
}
export interface Motor extends _Motor {
  constructor: { new (): Motor };
}
export const Motor: { new (): Motor };

/** Specifies the class of a drilling fluid. */
export type MudClass = "oil-based" | "water-based" | "other" | "pneumatic";
interface _MudClass extends eml._TypeEnum {
  content: MudClass;
}

/** Mud density readings at average or channel. */
interface _MudDensityStatistics extends BaseType {
  /** Average mud density through the interval. */
  Average?: eml.MassPerVolumeMeasure;
  /** Log channel from which the mud density statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface MudDensityStatistics extends _MudDensityStatistics {
  constructor: { new (): MudDensityStatistics };
}
export const MudDensityStatistics: { new (): MudDensityStatistics };

/** Information on gas in the mud and gas peak. */
interface _MudGas extends BaseType {
  GasInMud?: GasInMud;
  GasPeak?: GasPeak[];
}
export interface MudGas extends _MudGas {
  constructor: { new (): MudGas };
}
export const MudGas: { new (): MudGas };

interface _MudLogConcentrationParameter extends _MudLogParameter {
  ConcentrationParameterKind: ConcentrationParameterKind;
  Value: eml.VolumePerVolumeMeasureExt;
}
export interface MudLogConcentrationParameter
  extends _MudLogConcentrationParameter {
  constructor: { new (): MudLogConcentrationParameter };
}
export const MudLogConcentrationParameter: {
  new (): MudLogConcentrationParameter;
};

interface _MudLogForceParameter extends _MudLogParameter {
  ForceParameterKind: ForceParameterKind;
  Value: eml.ForceMeasureExt;
}
export interface MudLogForceParameter extends _MudLogForceParameter {
  constructor: { new (): MudLogForceParameter };
}
export const MudLogForceParameter: { new (): MudLogForceParameter };

/** Information around the mud log: type, time taken, top and bottom depth, pressure gradient, etc. */
interface _MudLogParameter extends BaseType {
  /** Unique identifier for this instance of MudLogParameter. */
  uid: string;
  /** An ISO 19115 EIP-derived set of metadata attached to ensure the traceability of the MudLogParameter. */
  Citation: eml.Citation;
  /** Description or secondary qualifier pertaining to MudlogParameter or to Value attribute. */
  Comments: string;
  /** Measured depth interval that is the focus of this parameter. */
  MdInterval?: eml.MdInterval;
}
export interface MudLogParameter extends _MudLogParameter {
  constructor: { new (): MudLogParameter };
}
export const MudLogParameter: { new (): MudLogParameter };

/** Describes the kind and value of mud log parameters that are expressed in units of pressure gradient. */
interface _MudLogPressureGradientParameter extends _MudLogParameter {
  PressureGradientParameterKind: PressureGradientParameterKind;
  /** The value of the parameter in pressure gradient units. */
  Value: eml.ForcePerVolumeMeasureExt;
}
export interface MudLogPressureGradientParameter
  extends _MudLogPressureGradientParameter {
  constructor: { new (): MudLogPressureGradientParameter };
}
export const MudLogPressureGradientParameter: {
  new (): MudLogPressureGradientParameter;
};

/** Describes the kind and value of mud log parameters that are expressed in units of pressure. */
interface _MudLogPressureParameter extends _MudLogParameter {
  PressureParameterKind: PressureParameterKind;
  /** The value of the parameter in pressure units. */
  Value: eml.PressureMeasureExt;
}
export interface MudLogPressureParameter extends _MudLogPressureParameter {
  constructor: { new (): MudLogPressureParameter };
}
export const MudLogPressureParameter: { new (): MudLogPressureParameter };

/** Details of wellbore geology intervals, drilling parameters, chromatograph, mud gas, etc., data within an MD interval. */
interface _MudLogReport extends eml._AbstractObject {
  /** The growing state of the mudlog,. Valid Values: active, inactive or closed. */
  GrowingStatus: ChannelStatus;
  /** Name of the company recording the information. */
  MudLogCompany?: string;
  /** Concatenated names of the mudloggers constructing the log. */
  MudLogEngineers?: string;
  /** Concatenated names of the geologists constructing the log. */
  MudLogGeologists?: string;
  MudlogIntervals?: MudlogReportInterval[];
  Parameter?: MudLogParameter[];
  RelatedLogs?: eml.DataObjectReference[];
  /** [maintained by the server] The interval between the minimum and maximum measured depths contained in this MudLog report. */
  ReportMdInterval?: eml.MdInterval;
  Wellbore: eml.DataObjectReference;
  WellboreGeology?: eml.DataObjectReference;
}
export interface MudLogReport extends _MudLogReport {
  constructor: { new (): MudLogReport };
}
export const MudLogReport: { new (): MudLogReport };

/** The interval at which the report on the mud log was taken, detailing cuttings, interpreted geology, and show evaluation. */
interface _MudlogReportInterval extends BaseType {
  /** Unique identifier for this instance of MudLogReportInterval. */
  uid: string;
  Chromatograph?: Chromatograph;
  /** The cuttings geology interval that is part of this mud log report. */
  CuttingsGeologyInterval?: eml.DataObjectReference;
  DrillingParameters?: DrillingParameters[];
  /** The interpreted geology interval that is part of this mud log report. */
  InterpretedGeologyInterval?: eml.DataObjectReference;
  /** Measured depth interval. */
  MdInterval: eml.MdInterval;
  MudGas?: MudGas[];
  /** The show evaluation interval that is part of this mud log report. */
  ShowEvaluationInterval?: eml.DataObjectReference;
}
export interface MudlogReportInterval extends _MudlogReportInterval {
  constructor: { new (): MudlogReportInterval };
}
export const MudlogReportInterval: { new (): MudlogReportInterval };

/** Stores the values of parameters that are described by character strings. */
interface _MudLogStringParameter extends _MudLogParameter {
  MudLogStringParameterKind: MudLogStringParameterKind;
  /** The value of the parameter as a character string. */
  Value: string;
}
export interface MudLogStringParameter extends _MudLogStringParameter {
  constructor: { new (): MudLogStringParameter };
}
export const MudLogStringParameter: { new (): MudLogStringParameter };

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
  content: MudLogStringParameterKind;
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
export interface MudLosses extends _MudLosses {
  constructor: { new (): MudLosses };
}
export const MudLosses: { new (): MudLosses };

/** Rig Mud Pump Schema. */
interface _MudPump extends BaseType {
  /** Unique identifier for this instance of MudPump. */
  uid: string;
  /** Pump displacement. */
  Displacement: eml.VolumeMeasure;
  /** Date and time the pump was installed. */
  DTimInstall?: string;
  /** Date and time the pump was removed. */
  DTimRemove?: string;
  /** Efficiency of the pump. */
  Eff?: eml.PowerPerPowerMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Inner diameter of the pump liner. */
  IdLiner: eml.LengthMeasure;
  /** @integer Relative pump number. One-based. */
  Index: number;
  /** Stroke length. */
  LenStroke?: eml.LengthMeasure;
  /** Manufacturer or supplier of the item. */
  Manufacturer?: string;
  /** Manufacturer's designated model. */
  Model?: string;
  /** An identification tag for the pump.
   * A serial number is a type of identification tag; however, some tags contain many pieces of information.This element onlyidentifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** @integer Number of cylinders (3 = single acting, 2 = double acting) */
  NumCyl?: number;
  /** Rod outer diameter. */
  OdRod?: eml.LengthMeasure;
  /** Contractor/owner. */
  Owner?: string;
  /** Maximum hydraulics horsepower. */
  PowHydMx?: eml.PowerMeasure;
  /** Maximum mechanical power. */
  PowMechMx?: eml.PowerMeasure;
  /** Pulsation dampener pressure. */
  PresDamp?: eml.PressureMeasure;
  /** Maximum pump pressure. */
  PresMx?: eml.PressureMeasure;
  /** @integer Pump action. 1 = single acting, 2 = double acting. */
  PumpAction?: number;
  /** Maximum speed. */
  SpmMx?: eml.AngularVelocityMeasure;
  /** Pump type reference list. */
  TypePump?: PumpType;
  /** Pulsation dampener volume. */
  VolDamp?: eml.VolumeMeasure;
}
export interface MudPump extends _MudPump {
  constructor: { new (): MudPump };
}
export const MudPump: { new (): MudPump };

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
  content: MudSubClass;
}

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
export interface MudVolume extends _MudVolume {
  constructor: { new (): MudVolume };
}
export const MudVolume: { new (): MudVolume };

/** Tubular MWD Tool Component Schema. Used to capture operating parameters of the MWD tool. */
interface _MwdTool extends BaseType {
  ExtensionAny?: eml.CustomData;
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
export interface MwdTool extends _MwdTool {
  constructor: { new (): MwdTool };
}
export const MwdTool: { new (): MwdTool };

/** WITSML - Equipment NameTag Schema. */
interface _NameTag extends BaseType {
  /** Unique identifier for this instance of NameTag. */
  uid: string;
  /** A comment or remark about the tag. */
  Comment?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The name of the company that installed the tag. */
  InstallationCompany?: string;
  /** When the tag was installed in or on the item. */
  InstallationDate?: string;
  /** An indicator of where the tag is attached to the item. This is used to assist the user in finding where an identifier is located on an item.  This optional field also helps to differentiate where an identifier is located when multiple identifiers exist on an item. Most downhole components have a box (female thread) and pin (male thread) end as well as a pipe body in between the ends. Where multiple identifiers are used on an item, it is convenient to have a reference as to which end, or somewhere in the middle, an identifier may be closer to. Some items may have an identifier on a non-standard location, such as on the arm of a hole opener.  'other', by exclusion, tells a user to look elsewhere than on the body or near the ends of an item.  Most non-downhole tools use either 'body', 'other' or not specified because the location tends to lose value with smaller or non threaded items. */
  Location?: NameTagLocation;
  /** Reference to a manufacturer's or installer's installation description, code, or method. */
  MountingCode?: string;
  /** The physical identification string of the equipment tag. */
  Name: string;
  /** The format or encoding specification of the equipment tag. The tag may contain different pieces of information and knowledge of that information is inherent in the specification. The "identification string" is a mandatory part of the information in a tag. */
  NumberingScheme: NameTagNumberingScheme;
  /** Identifies the general type of identifier on an item.  If multiple identifiers exist on an item, a separate description set for each identifier should be created.  For example, a joint of casing may have a barcode label on it along with a painted-on code and an RFID tag attached or embedded into the coupling.  The barcode label may in turn be an RFID-equipped label. This particular scenario would require populating five nameTags to fully describe and decode all the possible identifiers as follows: 'tagged' - RFID tag embedded in the coupling, 'label'  - Serial number printed on the label, 'tagged' - RFID tag embedded into the label, 'label'  - Barcode printed on the label, 'painted'- Mill number painted on the pipe body. */
  Technology?: NameTagTechnology;
}
export interface NameTag extends _NameTag {
  constructor: { new (): NameTag };
}
export const NameTag: { new (): NameTag };

/** Specifies the values for the locations where an equipment tag might be found. */
export type NameTagLocation = "body" | "box" | "other" | "pin";
interface _NameTagLocation extends eml._TypeEnum {
  content: NameTagLocation;
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
  content: NameTagNumberingScheme;
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
  content: NameTagTechnology;
}

/** A floating point value between zero (inclusive) and one (inclusive). */
export type NonNegativeFraction = number;
type _NonNegativeFraction = Primitive._number;

/** Specifies the north or south direction. */
export type NorthOrSouth = "north" | "south";
interface _NorthOrSouth extends eml._TypeEnum {
  content: NorthOrSouth;
}

/** Nozzle Component Schema. */
interface _Nozzle extends BaseType {
  /** Unique identifier for this instance of Nozzle */
  uid: string;
  /** Nozzle diameter. */
  DiaNozzle?: eml.LengthMeasure;
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** @integer Index if this is an indexed object. */
  Index?: number;
  /** Length of the nozzle. */
  Len?: eml.LengthMeasure;
  /** Nozzle orientation. */
  Orientation?: string;
  /** Nozzle type. */
  TypeNozzle?: NozzleType;
}
export interface Nozzle extends _Nozzle {
  constructor: { new (): Nozzle };
}
export const Nozzle: { new (): Nozzle };

/** Specifies the type of nozzle. */
export type NozzleType = "extended" | "normal";
interface _NozzleType extends eml._TypeEnum {
  content: NozzleType;
}

/** Specifies the range of index values for a log by reference to another object (or sub-object) which contains the index range as part of its data. */
interface _ObjectContext extends _AbstractLogDataContext {
  /** The context object points to another Energistics data object. */
  ObjectReference: eml.DataObjectReference;
  /** If the reference is to a sub-object in a growing object  (e.g., a WellboreGeometry section), then this must contain the UID of the growing part. */
  SubObjectReference: string;
}
export interface ObjectContext extends _ObjectContext {
  constructor: { new (): ObjectContext };
}
export const ObjectContext: { new (): ObjectContext };

/** Defines a sequence number with an optional description attribute. */
interface _ObjectSequence extends BaseType {
  /** The description of this object sequence. */
  description: string;
}
export interface ObjectSequence extends _ObjectSequence {
  constructor: { new (): ObjectSequence };
}
export const ObjectSequence: { new (): ObjectSequence };

/** The location/interval of the open hole and its history. */
interface _OpenHoleInterval extends BaseType {
  /** Unique identifier for this instance of OpenHoleInterval. */
  uid: string;
  /** Reference to a borehole (the as-drilled hole through the earth). */
  BoreholeStringReferenceId?: string;
  /** The OpenHoleInterval event information. */
  EventHistory?: EventInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to a geology feature. */
  GeologyFeatureReferenceId?: string[];
  /** Openhole measured depth interval for this completion. */
  OpenHoleMdInterval?: eml.MdInterval;
  /** Openhole true vertical depth interval for this completion. */
  OpenHoleTvdInterval?: eml.TvdInterval;
  StatusHistory?: IntervalStatusHistory[];
}
export interface OpenHoleInterval extends _OpenHoleInterval {
  constructor: { new (): OpenHoleInterval };
}
export const OpenHoleInterval: { new (): OpenHoleInterval };

/** Used to capture a daily drilling report focused on reporting from the service company to the operator. For a similar object whose focus is operator to partner or to governmental agency, see DrillReport. This object is uniquely identified within the context of one wellbore object. */
interface _OpsReport extends eml._AbstractObject {
  Activity?: DrillActivity[];
  BulkInventory?: Inventory[];
  /** Hole condition description. */
  ConditionHole?: string;
  /** Daily cost. */
  CostDay?: Cost;
  /** Daily mud cost. */
  CostDayMud?: Cost;
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
  DTim: string;
  /** Name of the engineer. */
  Engineer?: string;
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
  Forecast24Hr?: string;
  /** Name of the operator's wellsite geologist. */
  Geologist?: string;
  Hse?: Hse;
  /** Description of the lithology for the interval. */
  Lithology?: string;
  /** Maximum allowable shut-in casing pressure. */
  Maasp?: eml.PressureMeasure;
  /** Measured depth of last casing. */
  MdCsgLast?: MeasuredDepthCoord;
  /** Measured depth of plan for this day number. */
  MdPlanned?: MeasuredDepthCoord;
  /** The measured depth of the wellbore. */
  MdReport?: MeasuredDepthCoord;
  MudInventory?: Inventory[];
  MudVolume?: MudVolume;
  /** Name of the formation. */
  NameFormation?: string;
  /** Authorization for expenditure (AFE) number that this cost item applies to. */
  NumAFE?: string;
  /** @integer Number of contractor personnel on board the rig. */
  NumContract?: number;
  /** @integer Number of operator personnel on board the rig. */
  NumOperator?: number;
  /** @integer Total number of personnel on board the rig. */
  NumPob?: number;
  /** @integer Number of service company personnel on board the rig. */
  NumService?: number;
  Personnel?: Personnel[];
  PitVolume?: PitVolume[];
  /** Kick tolerance pressure. */
  PresKickTol?: eml.PressureMeasure;
  /** Leak off test equivalent mud weight. */
  PresLotEmw?: eml.MassPerVolumeMeasure;
  PumpOp?: PumpOp[];
  /** A pointer to the rig used in this reporting period. */
  Rig?: string;
  RigResponse?: RigResponse;
  /** Average rate of penetration through the interval. */
  RopAv?: eml.LengthPerTimeMeasure;
  /** Rate of penetration at report time. */
  RopCurrent?: eml.LengthPerTimeMeasure;
  Scr?: Scr[];
  ShakerOp?: ShakerOp[];
  /** Current status description. */
  StatusCurrent?: string;
  /** Summary of the operations and events for the reporting period (the previous 24 hours). */
  Sum24Hr?: string;
  /** Name of the operator's rig supervisor. */
  Supervisor?: string;
  SupportCraft?: SupportCraft[];
  TrajectoryStation?: TrajectoryStation[];
  /** A pointer to the tubular assembly (as specified in the Tubular object) used in this report period. */
  Tubular?: string;
  /** True vertical depth of the last casing installed. */
  TvdCsgLast?: WellVerticalDepthCoord;
  /** True vertical depth of the leak-off test point. */
  TvdLot?: WellVerticalDepthCoord;
  /** True vertical depth of the wellbore. */
  TvdReport?: WellVerticalDepthCoord;
  /** Kick tolerance volume. */
  VolKickTol?: eml.VolumeMeasure;
  WbGeometry?: eml.DataObjectReference;
  Weather?: Weather[];
  Wellbore: eml.DataObjectReference;
}
export interface OpsReport extends _OpsReport {
  constructor: { new (): OpsReport };
}
export const OpsReport: { new (): OpsReport };

/** Version of the report, e.g., preliminary, normal, final, etc. */
export type OpsReportVersion = "preliminary" | "normal" | "final";
interface _OpsReportVersion extends eml._TypeEnum {
  content: OpsReportVersion;
}

/** Allows you to enter a connection type other than the ones in the standard list. */
interface _OtherConnectionType extends _AbstractConnectionType {
  /** Connection type other than rod, casing or tubing. */
  OtherConnectionType: OtherConnectionTypes;
}
export interface OtherConnectionType extends _OtherConnectionType {
  constructor: { new (): OtherConnectionType };
}
export const OtherConnectionType: { new (): OtherConnectionType };

/** Specifies the values for other types of connections. */
export type OtherConnectionTypes =
  | "cemented-in-place"
  | "dogscompressionfit-sealed";
interface _OtherConnectionTypes extends eml._TypeEnum {
  content: OtherConnectionTypes;
}

/** Information on WITSML objects used */
interface _Participant extends BaseType {
  /** Extensions to the schema based on a name-value construct. */
  ExtNameValues?: eml.ExtensionNameValue[];
  Participant?: MemberObject[];
}
export interface Participant extends _Participant {
  constructor: { new (): Participant };
}
export const Participant: { new (): Participant };

/** Qualifies depth based on pass, direction and depth */
interface _PassIndexedDepth extends _AbstractIndexValue {
  /** The measured depth of the point. */
  Depth: number;
  /** @integer 0 = down (increasing depth)
   * 1= up (decreasing depth)
   * Changes each time the logging tool direction changes.
   * When a log starts from the bottom, start with pass = 0, direction = 1.
   * When you get to the top of the interval and start down again, change the pass. */
  Direction: number;
  /** @integer The pass number. Increase the pass number each time the tool direction changes twice. */
  Pass: number;
}
export interface PassIndexedDepth extends _PassIndexedDepth {
  constructor: { new (): PassIndexedDepth };
}
export const PassIndexedDepth: { new (): PassIndexedDepth };

/** Information on how perforation is conveyed: slick line, wireline, tubing */
export type PerfConveyanceMethod =
  | "slick line"
  | "tubing conveyed"
  | "wireline";
interface _PerfConveyanceMethod extends eml._TypeEnum {
  content: PerfConveyanceMethod;
}

/** Information on the perforated hole. */
interface _PerfHole extends BaseType {
  /** Unique identifier for this instance of PerfHole. */
  uid: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The angle of the holes. */
  HoleAngle?: eml.PlaneAngleMeasure;
  /** @integer The number of holes. */
  HoleCount?: number;
  /** The density of the holes. */
  HoleDensity?: eml.ReciprocalLengthMeasure;
  /** The diameter of the hole. */
  HoleDiameter?: eml.LengthMeasure;
  /** The pattern of the holes. */
  HolePattern?: string;
  /** Measured depth interval for the perforation hole. */
  MdInterval?: eml.MdInterval;
  /** Remarks and comments about this perforated hole. */
  Remarks?: string;
  /** The true vertical depth that describes the hole. */
  TvdInterval?: eml.TvdInterval;
}
export interface PerfHole extends _PerfHole {
  constructor: { new (): PerfHole };
}
export const PerfHole: { new (): PerfHole };

/** Information on the perforating job. */
interface _Perforating extends BaseType {
  /** Unique identifier for this instance of Perforating */
  uid: string;
  /** Perf-Bottom of packer set depth */
  BottomPackerSet?: MeasuredDepthCoord;
  /** Description from carrier */
  CarrierDescription?: string;
  /** The manufacturer of the carrier. */
  CarrierManufacturer?: string;
  /** Size of the carrier. */
  CarrierSize?: eml.LengthMeasure;
  /** The manufacturer of the charge. */
  ChargeManufacturer?: string;
  /** The size of the charge. */
  ChargeSize?: eml.LengthMeasure;
  /** The type of the charge. */
  ChargeType?: string;
  /** The weight of the charge. */
  ChargeWeight?: eml.MassMeasure;
  /** The conveyance method */
  ConveyanceMethod?: PerfConveyanceMethod;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The density of fluid */
  FluidDensity?: eml.MassPerMassMeasure;
  /** Fluid level. */
  FluidLevel?: MeasuredDepthCoord;
  /** True if centralized, else decentralized. */
  GunCentralized?: string;
  /** Description about the perforating gun. */
  GunDesciption?: string;
  /** Flag indicating whether the gun is left in hole or not. */
  GunLeftInHole?: boolean;
  /** The size of the perforation gun. */
  GunSize?: eml.LengthMeasure;
  /** hydrostaticPressure */
  HydrostaticPressure?: eml.PressureMeasure;
  /** orientaton */
  Orientation?: string;
  /** Description of orientaton method */
  OrientationMethod?: string;
  /** The name of company providing the perforation. */
  PerforationCompany?: string;
  /** Perforation fluid type */
  PerforationFluidType?: string;
  /** Reference to the log */
  RefLog?: string;
  /** Reservoir pressure */
  ReservoirPressure?: eml.PressureMeasure;
  /** Number of shots per unit length (ft, m) */
  ShotsDensity?: eml.ReciprocalLengthMeasure;
  /** @integer The number of missed firings from the gun. */
  ShotsMisfired?: number;
  /** @integer Number of shots planned */
  ShotsPlanned?: number;
  /** @integer index number of stage */
  StageNumber?: number;
  /** Surface pressure */
  SurfacePressure?: eml.PressureMeasure;
}
export interface Perforating extends _Perforating {
  constructor: { new (): Perforating };
}
export const Perforating: { new (): Perforating };

/** Information on the perforating event. */
interface _PerforatingExtension extends _AbstractEventExtension {
  ExtensionAny?: eml.CustomData;
  Perforating?: Perforating[];
  /** The perforationSet reference ID. */
  PerforationSetRefID: string;
}
export interface PerforatingExtension extends _PerforatingExtension {
  constructor: { new (): PerforatingExtension };
}
export const PerforatingExtension: { new (): PerforatingExtension };

/** Information regarding a collection of perforations. */
interface _PerforationSet extends BaseType {
  /** Unique identifier for this instance of PerforationSet. */
  uid: string;
  /** Reference to the borehole that contains the perf set. */
  BoreholeStringReferenceId?: string[];
  /** The ratio value of crash damage. */
  CrushDamageRatio?: string;
  /** The diameter of the crushed zone. */
  CrushZoneDiameter?: eml.LengthMeasure;
  /** A coefficient used in the equation for calculation of pressure drop
   * across a perforation set. */
  DischargeCoefficient?: number;
  /** Reference to the downhole string. */
  DownholeStringReferenceId?: string[];
  EventHistory?: EventInfo;
  /** The friction factor of each perforation set. */
  FrictionFactor?: number;
  /** The friction pressure for the perforation set. */
  FrictionPres?: eml.PressureMeasure;
  /** The angle of the holes. */
  HoleAngle?: eml.PlaneAngleMeasure;
  /** @integer The number of holes. */
  HoleCount?: number;
  /** The density of the holes. */
  HoleDensity?: eml.ReciprocalLengthMeasure;
  /** The diameter of the perf holes. */
  HoleDiameter?: eml.LengthMeasure;
  /** The pattern of the holes. */
  HolePattern?: string;
  /** Measured depth interval for the entire perforation set. */
  MdInterval?: eml.MdInterval;
  /** The original perforation date. */
  PerforationDate?: string;
  /** The penetration length of perforation. */
  PerforationPenetration?: eml.LengthMeasure;
  /** The type of perforation tool. */
  PerforationTool?: PerforationToolType;
  /** Remarks regarding this perforation set. */
  PermanentRemarks?: string;
  /** The true vertical depth of the entire perforation set. */
  TvdInterval?: eml.TvdInterval;
}
export interface PerforationSet extends _PerforationSet {
  constructor: { new (): PerforationSet };
}
export const PerforationSet: { new (): PerforationSet };

/** The location/interval of the perforation set and its history. */
interface _PerforationSetInterval extends BaseType {
  /** Unique identifier for this instance of PerforationSetInterval. */
  uid: string;
  /** The PerforationSetInterval event information. */
  EventHistory?: EventInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to a geology feature. */
  GeologyFeatureReferenceId?: string[];
  /** Overall measured depth interval for this perforation set. */
  PerforationSetMdInterval?: eml.MdInterval;
  /** Reference to a perforation set. */
  PerforationSetReferenceId?: string;
  /** Overall true vertical depth interval for this perforation set. */
  PerforationSetTvdInterval?: eml.TvdInterval;
  PerforationStatusHistory?: PerforationStatusHistory[];
}
export interface PerforationSetInterval extends _PerforationSetInterval {
  constructor: { new (): PerforationSetInterval };
}
export const PerforationSetInterval: { new (): PerforationSetInterval };

/** Information on the collection of perforation sets. */
interface _PerforationSets extends BaseType {
  PerforationSet: PerforationSet[];
}
export interface PerforationSets extends _PerforationSets {
  constructor: { new (): PerforationSets };
}
export const PerforationSets: { new (): PerforationSets };

/** Specifies the set of values for the status of a perforation. */
export type PerforationStatus = "open" | "proposed" | "squeezed";
interface _PerforationStatus extends eml._TypeEnum {
  content: PerforationStatus;
}

/** Information on the collection of perforation status history. */
interface _PerforationStatusHistory extends BaseType {
  /** Unique identifier for this instance of PerforationStatusHistory. */
  uid: string;
  /** Defines the proportional amount of fluid from the well completion that is flowing through this interval within a wellbore. */
  AllocationFactor?: number;
  /** Remarks and comments about the status. */
  Comment?: string;
  /** The end date of the status. */
  EndDate?: string;
  /** Overall measured depth interval for this perforated interval. */
  PerforationMdInterval?: eml.MdInterval;
  /** Perforation status. */
  PerforationStatus?: PerforationStatus;
  /** Overall true vertical depth interval for this perforated interval. */
  PerforationTvdInterval?: eml.TvdInterval;
  /** The start date of the status. */
  StartDate?: string;
}
export interface PerforationStatusHistory extends _PerforationStatusHistory {
  constructor: { new (): PerforationStatusHistory };
}
export const PerforationStatusHistory: { new (): PerforationStatusHistory };

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
  content: PerforationToolType;
}

/** Information on slot resulting from a perforation. */
interface _PerfSlot extends BaseType {
  /** Unique identifier for this instance of PerfSlot. */
  uid: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Remarks and comments about this perforation slot. */
  Remarks?: string;
  /** Distance from center point. */
  SlotCenterDistance?: eml.LengthMeasure;
  /** @integer The number of the slots. */
  SlotCount?: number;
  /** The height of slot. */
  SlotHeight?: eml.LengthMeasure;
  /** The width of the slot. */
  SlotWidth?: eml.LengthMeasure;
}
export interface PerfSlot extends _PerfSlot {
  constructor: { new (): PerfSlot };
}
export const PerfSlot: { new (): PerfSlot };

/** Operations Personnel Component Schema. List each company on the rig at the time of the report and key information about each company, for example, name, type of service, and number of personnel. */
interface _Personnel extends BaseType {
  /** Unique identifier for this instance of Personnel. */
  uid: string;
  /** Name of the company. */
  Company?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** @integer Number of people on board for that company. */
  NumPeople?: number;
  /** Total time worked by the company (commonly in hours). */
  TotalTime?: eml.TimeMeasure;
  /** Service provided by the company. */
  TypeService?: string;
}
export interface Personnel extends _Personnel {
  constructor: { new (): Personnel };
}
export const Personnel: { new (): Personnel };

/** Specifies the values for the physical status of an interval. */
export type PhysicalStatus = "closed" | "open" | "proposed";
interface _PhysicalStatus extends eml._TypeEnum {
  content: PhysicalStatus;
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
  content: PIDXCommodityCode;
}

/** Rig Pit Schema. */
interface _Pit extends BaseType {
  /** Unique identifier for this instance of pit */
  uid: string;
  /** Maximum pit capacity. */
  CapMx: eml.VolumeMeasure;
  /** Date and time the pit was installed. */
  DTimInstall?: string;
  /** Date and time the pit was removed. */
  DTimRemove?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** @integer Relative pit number of all pits on the rig. One-based. */
  Index: number;
  /** Flag to indicate if the pit is part of the active system.
   * Values are "true" (or "1") and "false" (or "0"). */
  IsActive?: boolean;
  /** An identification tag for the pit.
   * A serial number is a type of identification tag; however, some tags contain many pieces of information. This element only identifies the tag and does not describe the contents. */
  NameTag?: NameTag[];
  /** Contractor/owner. */
  Owner?: string;
  /** The type of pit. */
  TypePit?: PitType;
}
export interface Pit extends _Pit {
  constructor: { new (): Pit };
}
export const Pit: { new (): Pit };

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
  content: PitType;
}

/** Pit Volume Component Schema. */
interface _PitVolume extends BaseType {
  /** Unique identifier for this instance of PitVolume. */
  uid: string;
  /** Density of fluid in the pit. */
  DensFluid?: eml.MassPerVolumeMeasure;
  /** Description of the fluid in the pit. */
  DescFluid?: string;
  /** Date and time the information is related to. */
  DTim?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** @integer This is a pointer to the corresponding pit on the rig containing the volume being described. */
  Pit: number;
  /** Funnel viscosity (in seconds). */
  VisFunnel?: eml.TimeMeasure;
  /** Volume of fluid in the pit. */
  VolPit: eml.VolumeMeasure;
}
export interface PitVolume extends _PitVolume {
  constructor: { new (): PitVolume };
}
export const PitVolume: { new (): PitVolume };

/** Used to declare that data points in a specific WITSML log channel may contain value attributes (e.g., quality identifiers). This declaration is independent from the possibility that ETP may have sent ValueAttributes in real time.
 * If an instance of PointMetadata is present for a Channel, then the value for that point is represented as an array in the bulk data string. */
interface _PointMetadata extends BaseType {
  /** Free format description of the point metadata. */
  Description: string;
  /** The underlying ETP data type of the point metadata. */
  EtpDataType: EtpDataType;
  /** The name of the point metadata. */
  Name: string;
}
export interface PointMetadata extends _PointMetadata {
  constructor: { new (): PointMetadata };
}
export const PointMetadata: { new (): PointMetadata };

/** Specifies values for mud log parameters that are measured in units of pressure gradient. */
export type PressureGradientParameterKind =
  | "direct pore pressure gradient measurement"
  | "fracture pressure gradient estimate"
  | "kick pressure gradient"
  | "lost returns"
  | "overburden gradient"
  | "pore pressure gradient estimate";
interface _PressureGradientParameterKind extends eml._TypeEnum {
  content: PressureGradientParameterKind;
}

/** Specifies values for mud log parameters that are measured in units of pressure. */
export type PressureParameterKind =
  | "direct fracture pressure measurement"
  | "pore pressure estimate while drilling";
interface _PressureParameterKind extends eml._TypeEnum {
  content: PressureParameterKind;
}

/** Information on pressure test event. */
interface _PressureTestExtension extends _AbstractEventExtension {
  /** Annulus pressure */
  AnnulusPressure?: eml.PressureMeasure;
  /** Circulating position */
  CirculatingPosition?: string;
  /** Orifice Size */
  DiaOrificeSize?: eml.LengthMeasure;
  /** Next Test Date */
  DTimeNextTestDate?: string;
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Rate Bled */
  FlowrateRateBled?: eml.VolumePerTimeMeasure;
  /** Fluid bled type */
  FluidBledType?: string;
  /** String Being Tested */
  IdentifierJob?: string;
  /** True if successful */
  IsSuccess?: boolean;
  /** Maximum pressure held during test */
  MaxPressureDuration?: eml.PressureMeasure;
  /** Description of orientaton method */
  OrientationMethod?: string;
  /** Reference # */
  Str10Reference?: string;
  /** Test fluid type */
  TestFluidType?: string;
  /** Test sub type */
  TestSubType?: string;
  /** Test type */
  TestType?: string;
  /** Well (Assembly) */
  UidAssembly?: string;
  /** Volume Bled */
  VolumeBled?: eml.VolumeMeasure;
  /** Volume Lost */
  VolumeLost?: eml.VolumeMeasure;
  /** Volume Pumped */
  VolumePumped?: eml.VolumeMeasure;
  /** Well pressure used */
  WellPressureUsed?: string;
}
export interface PressureTestExtension extends _PressureTestExtension {
  constructor: { new (): PressureTestExtension };
}
export const PressureTestExtension: { new (): PressureTestExtension };

/** Specifies the types of pressure test(s) conducted during a drilling report period. */
export type PresTestType = "leak off test" | "formation integrity test";
interface _PresTestType extends eml._TypeEnum {
  content: PresTestType;
}

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
interface _PrincipalMeridian extends eml._TypeEnum {
  content: PrincipalMeridian;
}

/** Projected location of the well. */
interface _ProjectedWellLocation extends _AbstractWellLocation {
  /** The first coordinate based on a projected coordinate reference system. */
  Coordinate1: number;
  /** The second coordinate based on a projected coordinate reference system. */
  Coordinate2: number;
  Crs: eml.AbstractProjectedCrs;
}
export interface ProjectedWellLocation extends _ProjectedWellLocation {
  constructor: { new (): ProjectedWellLocation };
}
export const ProjectedWellLocation: { new (): ProjectedWellLocation };

/** Specifies the type of proppant agent: ceramic, resin, sand, etc. */
export type ProppantAgentKind =
  | "ceramic"
  | "resin coated ceramic"
  | "resin coated sand"
  | "sand";
interface _ProppantAgentKind extends eml._TypeEnum {
  content: ProppantAgentKind;
}

/** Land survey system that describes the well by range, township, section, etc. */
interface _PublicLandSurveySystem extends BaseType {
  FootageEW?: DistanceEastWest;
  FootageNS?: DistanceNorthSouth;
  /** Principal meridian for this location. */
  PrincipalMeridian?: PrincipalMeridian;
  /** The location of the well within the section, with the primary component listed first. Spot location will be made from a combinationof the following codes: NE, NW, SW, SE, N2, S2, E2, W2, C (center quarter), LTxx (where xx represents a two digit lot designation), TRzz (where zz represents a one or two character trac designation).
   * Free format allows for entries such as NESW (southwest quarter of northeast quarter), E2NESE (southeast quarter of northeast quarter of east half), CNE (northeast quarter of center quarter), etc. */
  QuarterSection?: string;
  /** Quarter township. */
  QuarterTownship?: string;
  /** @integer Range number. */
  Range?: number;
  /** Range direction. */
  RangeDir?: EastOrWest;
  /** Section number. */
  Section?: string;
  /** @integer Township number. */
  Township?: number;
  /** Township direction. */
  TownshipDir?: NorthOrSouth;
}
export interface PublicLandSurveySystem extends _PublicLandSurveySystem {
  constructor: { new (): PublicLandSurveySystem };
}
export const PublicLandSurveySystem: { new (): PublicLandSurveySystem };

/** Some combination of NE, NW, SW, SE, N2, S2, E2, W2, C, TRxx, LTnn. USA Public Land Survey System. */
export type PublicLandSurveySystemQuarterSection = string;
type _PublicLandSurveySystemQuarterSection = eml._String64;

/** Designates a particular quarter of a township. USA Public Land Survey System. */
export type PublicLandSurveySystemQuarterTownship = string;
type _PublicLandSurveySystemQuarterTownship = eml._String64;

/** Pump Action: 1 = single acting, 2 = double acting. */
export type PumpActionIntegerCode = number;
type _PumpActionIntegerCode = Primitive._number;

/** Operations Pump Component Schema. */
interface _PumpOp extends BaseType {
  /** Unique identifier for this instance of PumpOp. */
  uid: string;
  /** Date and time the information is related to. */
  DTim?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Liner inside diameter. */
  IdLiner?: eml.LengthMeasure;
  /** Stroke length. */
  LenStroke?: eml.LengthMeasure;
  /** Along-hole measured depth of the measurement from the drill datum. */
  MdBit?: MeasuredDepthCoord;
  /** Pump efficiency. */
  PcEfficiency?: eml.PowerPerPowerMeasure;
  /** Pump pressure recorded. */
  Pressure: eml.PressureMeasure;
  /** @integer A pointer to the corresponding pump on the rig. */
  Pump: number;
  /** Pump output (included for efficiency). */
  PumpOutput?: eml.VolumePerTimeMeasure;
  /** Pump rate (strokes per minute). */
  RateStroke: eml.AngularVelocityMeasure;
  /** Type of pump operation. */
  TypeOperation?: PumpOpType;
}
export interface PumpOp extends _PumpOp {
  constructor: { new (): PumpOp };
}
export const PumpOp: { new (): PumpOp };

/** Specifies type of well operation being conducted while this pump was in use. */
export type PumpOpType = "drilling" | "reaming" | "circulating" | "slow pump";
interface _PumpOpType extends eml._TypeEnum {
  content: PumpOpType;
}

/** Specifies the type of pump. */
export type PumpType = "centrifugal" | "duplex" | "triplex";
interface _PumpType extends eml._TypeEnum {
  content: PumpType;
}

/** Specifies if the reading was measured or estimated. */
export type ReadingKind = "measured" | "estimated" | "unknown";
interface _ReadingKind extends eml._TypeEnum {
  content: ReadingKind;
}

/** Information on containing or contained components. */
interface _ReferenceContainer extends BaseType {
  /** Unique identifier for this instance of ReferenceContainer. */
  uid: string;
  /** Reference to the equipment for this accessory. */
  AccesoryEquipmentReferenceId: string;
  /** Comment or remarks on this container reference. */
  Comment: string;
  /** Equipment reference ID. */
  EquipmentReferenceId: string;
  /** DownholeString reference ID. */
  StringReferenceId: string;
}
export interface ReferenceContainer extends _ReferenceContainer {
  constructor: { new (): ReferenceContainer };
}
export const ReferenceContainer: { new (): ReferenceContainer };

/** Reference Point Component Schema. */
interface _ReferencePoint extends BaseType {
  /** A unique identifier for an instance of a ReferencePoint. */
  uid: string;
  /** A textual description of the point. */
  Description?: string;
  Elevation?: WellElevationCoord;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  Location: AbstractWellLocation[];
  /** The measured depth coordinate of this reference point.
   * Value is positive when moving toward the bottomhole from the measured depth datum.
   * Provide a value for this when the reference is "downhole", such as an ocean-bottom template, or when the reference point is also used as a vertical well datum.
   * The measured depth value can be used to determine if the reference pointand a vertical well datum are at the same point. */
  MeasuredDepth?: MeasuredDepthCoord;
  /** Human-recognizable context for the point. */
  Name: string;
  /** The kind of point. For example,
   * 'well reference point', 'platform reference point', 'sea surface',
   * 'sea bottom'. */
  Type?: string;
}
export interface ReferencePoint extends _ReferencePoint {
  constructor: { new (): ReferencePoint };
}
export const ReferencePoint: { new (): ReferencePoint };

/** Data that represents a foreign key to a wellbore. The wellbore may be defined within the context of another well. */
interface _RefWellbore extends BaseType {
  /** A pointer the wellbore with which there is a relationship. */
  WellboreReference: string;
  /** A pointer to the well that contains the wellboreReference.
   * This is not needed unless the referenced wellbore is outside the
   * context of a common parent well. */
  WellParent?: string;
}
export interface RefWellbore extends _RefWellbore {
  constructor: { new (): RefWellbore };
}
export const RefWellbore: { new (): RefWellbore };

/** A reference to a rig within a wellbore. The wellbore may be defined within the context of another well. This value represents a foreign key from one node to another. */
interface _RefWellboreRig extends BaseType {
  /** A pointer to the rig with which there is a relationship. */
  RigReference: string;
  /** A pointer to the wellbore that contains the rigReference.
   * This is not needed unless the referenced rig is outside the
   * context of a common parent wellbore. */
  WellboreParent?: string;
  /** A pointer to the well that contains the wellboreParent.
   * This is not needed unless the referenced wellbore is outside the
   * context of a common parent well. */
  WellParent?: string;
}
export interface RefWellboreRig extends _RefWellboreRig {
  constructor: { new (): RefWellboreRig };
}
export const RefWellboreRig: { new (): RefWellboreRig };

/** A reference to a trajectoryStation in a wellbore. The trajectoryStation may be defined within the context of another wellbore. This value represents a foreign key from one element to another. */
interface _RefWellboreTrajectoryStation extends BaseType {
  /** A pointer to the trajectoryStation within the parent trajectory. StationReference is a special case where WITSML only uses a UID for the pointer.The natural identity of a station is its physical characteristics (e.g., md). */
  StationReference: string;
  /** A pointer to the trajectory within the parent wellbore.
   * This trajectory contains the trajectoryStation. */
  TrajectoryParent: string;
  /** A pointer to the wellbore that contains the trajectory. WellboreParent is not needed unless the trajectory is outside the context of a common parent wellbore. */
  WellboreParent?: string;
}
export interface RefWellboreTrajectoryStation
  extends _RefWellboreTrajectoryStation {
  constructor: { new (): RefWellboreTrajectoryStation };
}
export const RefWellboreTrajectoryStation: {
  new (): RefWellboreTrajectoryStation;
};

/** Rheometer readings taken during a drill report period. A rheometer is viscosimeter use for some fluid measurements, particularly when solid suspension properties are needed. */
interface _Rheometer extends BaseType {
  /** Unique identifier for this instance of Rheometer. */
  uid: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Rheometer pressure. */
  PresRheom?: eml.PressureMeasure;
  /** Rheometer temperature. */
  TempRheom?: eml.ThermodynamicTemperatureMeasure;
  Viscosity?: RheometerViscosity[];
}
export interface Rheometer extends _Rheometer {
  constructor: { new (): Rheometer };
}
export const Rheometer: { new (): Rheometer };

/** Viscosity reading of the rheometer */
interface _RheometerViscosity extends BaseType {
  /** Unique identifier for this instance of RheometerViscosity. */
  uid: string;
  /** Rotational speed of the rheometer, typically in RPM. */
  Speed: eml.AngularVelocityMeasure;
  /** The raw reading from a rheometer. This could be , but is not necessarily, a viscosity. */
  Viscosity: number;
}
export interface RheometerViscosity extends _RheometerViscosity {
  constructor: { new (): RheometerViscosity };
}
export const RheometerViscosity: { new (): RheometerViscosity };

/** Rig Schema. Used to capture information unique to a drilling rig. For information about the usage of a rig in a specific operation, see the RigUtilization object. */
interface _Rig extends eml._AbstractObject {
  /** Rig approvals/certification. */
  Approvals?: string;
  /** Derrick wind capacity. */
  CapWindDerrick?: eml.LengthPerTimeMeasure;
  /** Classification of the rig. */
  ClassRig?: string;
  /** Email address of the contact person. */
  EmailAddress?: string;
  /** Fax number on the rig. */
  FaxNumber?: string;
  /** Height of the derrick. */
  HtDerrick?: eml.LengthMeasure;
  /** Flag to indicate that the rig is an offshore rig (drill ship, semi-submersible, jack-up, platform, TADU).
   * Values are "true" (or "1") and "false" (or "0"). */
  IsOffshore?: boolean;
  /** The company that manufactured the rig. */
  Manufacturer?: string;
  /** Name of the contact person. */
  NameContact?: string;
  /** @integer Number of cranes on the rig. */
  NumCranes?: number;
  /** The name of the company that owns the rig. */
  Owner?: string;
  /** Derrick rating. */
  RatingDerrick?: eml.ForceMeasure;
  /** Maximum hole depth rating for the rig. */
  RatingDrillDepth?: eml.LengthMeasure;
  /** Maximum water depth rating for the rig. */
  RatingWaterDepth?: eml.LengthMeasure;
  /** Rig registration location. */
  Registration?: string;
  /** Telephone number on the rig. */
  TelNumber?: string;
  /** Derrick type. */
  TypeDerrick?: DerrickType;
  /** The type of rig (e.g., semi-submersible, jack-up, etc.) */
  TypeRig?: RigType;
  /** The year the rig entered service. */
  YearEntService?: string;
}
export interface Rig extends _Rig {
  constructor: { new (): Rig };
}
export const Rig: { new (): Rig };

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
export interface RigResponse extends _RigResponse {
  constructor: { new (): RigResponse };
}
export const RigResponse: { new (): RigResponse };

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
  content: RigType;
}

/** Rig Utilization Schema. Used to capture information related to the usage of a specific rig. For information unique to the rig itself, see the Rig object. */
interface _RigUtilization extends eml._AbstractObject {
  /** Air gap from the rig floor to the ground or mean sea level, depending on the rig location. */
  AirGap?: eml.LengthMeasure;
  /** Are the thrusters azimuth?  Values are "true" (or "1") and "false" (or "0"). */
  Azimuthing?: boolean;
  BhaRun?: eml.DataObjectReference[];
  Bop?: Bop;
  /** @integer Number of bunks per room. */
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
  CementUnit?: string;
  Centrifuge?: Centrifuge[];
  /** Datum for location reference. */
  Datum?: string;
  Degasser?: Degasser[];
  /** Rig brake description. */
  DescBrake?: string;
  /** Description of rotating system. */
  DescRotSystem?: string;
  /** Measured depth of the wellbore when operations performed with this rig ended. */
  EndHoleDepth?: eml.LengthMeasure;
  /** End time of the operation in which the rig was used. */
  EndOperationTime?: string;
  /** Description of flare(s). */
  Flares?: string;
  /** Description of the gantry. */
  Gantry?: string;
  /** Description of the electrical power generating system. */
  Generator?: string;
  /** Maximum allowable heave. */
  HeaveMx?: eml.LengthMeasure;
  Hydrocyclone?: Hydrocyclone[];
  /** Power system. */
  MainEngine?: string;
  /** Mooring type. */
  MoorType?: string;
  /** Minimum motion compensation. */
  MotionCompensationMn?: eml.ForceMeasure;
  /** Maximum motion compensation. */
  MotionCompensationMx?: eml.ForceMeasure;
  /** Description of the draw works motor. */
  MotorDrawWorks?: string;
  /** @integer Number of anchors. */
  NumAnch?: number;
  /** @integer Number of block lines. */
  NumBlockLines?: number;
  /** @integer Number of beds available on the rig. */
  NumBunks?: number;
  /** @integer Number of guideline tensioners. */
  NumGuideTens?: number;
  /** @integer Number of riser tensioners. */
  NumRiserTens?: number;
  /** @integer Number of thrusters. */
  NumThrusters?: number;
  /** Name of pipe-handling system. */
  PipeHandlingSystem?: string;
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
  /** Work string rotational torque rating. */
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
  ScrSystem?: string;
  Shaker?: Shaker[];
  /** Drill line diameter. */
  SizeDrillLine?: eml.LengthMeasure;
  /** Measured depth of the wellbore when operations performed with this rig started. */
  StartHoleDepth?: eml.LengthMeasure;
  /** Start time of the operation in which the rig was used. */
  StartOperationTime?: string;
  /** Length of motion compensation provided by equipment. */
  StrokeMotionCompensation?: eml.LengthMeasure;
  SurfaceEquipment?: SurfaceEquipment;
  /** Draw works type. */
  TypeDrawWorks?: DrawWorksType;
  /** Type of hook installed for this rig usage. */
  TypeHook?: string;
  /** Type of swivel. */
  TypeSwivel?: string;
  /** Variable deck load maximum (offshore rigs only). */
  VarDeckLdMx?: eml.ForceMeasure;
  /** Variable deck load storm rating (offshore rigs only). */
  VdlStorm?: eml.ForceMeasure;
  Wellbore: eml.DataObjectReference;
  /** Weight of the block. */
  WtBlock?: eml.ForceMeasure;
}
export interface RigUtilization extends _RigUtilization {
  constructor: { new (): RigUtilization };
}
export const RigUtilization: { new (): RigUtilization };

/** Risk Schema. Used to provide a central location for capturing risk information about the well design and other well-related data objects. */
interface _Risk extends eml._AbstractObject {
  /** The personnel affected by the risk. */
  AffectedPersonnel?: RiskAffectedPersonnel[];
  /** The category of risk. */
  Category: RiskCategory;
  /** Plan of action if the risk materializes. */
  Contingency?: string;
  /** Complete description of the risk. */
  Details?: string;
  /** Hole diameter. */
  DiaHole?: eml.LengthMeasure;
  /** Date and time that activities (related to the risk) were completed. */
  DTimEnd?: string;
  /** Date and time that activities (related to the risk) started. */
  DTimStart?: string;
  /** Custom string to further categorize the risk. */
  ExtendCategory?: string;
  /** Details for identifying the risk. */
  Identification?: string;
  /** Measured depth of the bit at the end of the activity. */
  MdBitEnd?: MeasuredDepthCoord;
  /** Measured depth of the bit at the start of the activity. */
  MdBitStart?: MeasuredDepthCoord;
  /** Measured Depth at the end of the activity. */
  MdHoleEnd?: MeasuredDepthCoord;
  /** Measured Depth at the start of the activity. */
  MdHoleStart?: MeasuredDepthCoord;
  /** Plan of action to ensure the risk does not materialize. */
  Mitigation?: string[];
  ObjectReference?: eml.DataObjectReference[];
  /** @integer Probability level of the risk occurring. Values of 1 through 5, with 1 being the lowest probability. */
  ProbabilityLevel?: number;
  /** @integer Severity level of the risk. Values of 1 through 5, with 1 being the lowest risk level. */
  SeverityLevel?: number;
  /** The sub category of risk. */
  SubCategory?: RiskSubCategory;
  /** Summary description of the risk. */
  Summary?: string;
  /** True vertical depth at the end of the activity. */
  TvdHoleEnd?: WellVerticalDepthCoord;
  /** True vertical depth at the start of the activity. */
  TvdHoleStart?: WellVerticalDepthCoord;
  /** The type of risk. */
  Type: RiskType;
  Wellbore: eml.DataObjectReference;
}
export interface Risk extends _Risk {
  constructor: { new (): Risk };
}
export const Risk: { new (): Risk };

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
  content: RiskAffectedPersonnel;
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
  content: RiskCategory;
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
  content: RiskSubCategory;
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
  content: RiskType;
}

/** A type of rod connection, e.g., latched, threaded, welded, etc. */
interface _RodConnectionType extends _AbstractConnectionType {
  /** Connection whose type is rod. */
  RodConnectionType: RodConnectionTypes;
}
export interface RodConnectionType extends _RodConnectionType {
  constructor: { new (): RodConnectionType };
}
export const RodConnectionType: { new (): RodConnectionType };

/** Specifies the values for the connection type of rod. */
export type RodConnectionTypes =
  | "eating nipple-cup"
  | "latched"
  | "seating nipple-mechanical"
  | "slipfit sealed"
  | "threaded"
  | "welded";
interface _RodConnectionTypes extends eml._TypeEnum {
  content: RodConnectionTypes;
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
export interface RopStatistics extends _RopStatistics {
  constructor: { new (): RopStatistics };
}
export const RopStatistics: { new (): RopStatistics };

/** Rotary Steerable Tool Component Schema. Captures size and performance information about the rotary steerable tool used in the tubular string. */
interface _RotarySteerableTool extends BaseType {
  AbstractRotarySteerableTool: AbstractRotarySteerableTool;
  /** Outside diameter of the tool when the pads are closed. */
  ClosePadOd?: eml.LengthMeasure;
  /** Method used to direct the deviation of the trajectory: point bit or push bit. */
  DeflectionMethod: DeflectionMethod;
  /** Minimum flow rate for programming the tool. */
  DownLinkFlowRateMn?: eml.VolumePerTimeMeasure;
  /** Maximum flow rate for programming the tool. */
  DownLinkFlowRateMx?: eml.VolumePerTimeMeasure;
  ExtensionAny?: eml.CustomData;
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
  /** @integer The number of contact pads. */
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
  /** Maximum weight on the bit. */
  WobMx?: eml.ForceMeasure;
}
export interface RotarySteerableTool extends _RotarySteerableTool {
  constructor: { new (): RotarySteerableTool };
}
export const RotarySteerableTool: { new (): RotarySteerableTool };

/** Measurement of the average turn rate and the channel from which the data was calculated. */
interface _RpmStatistics extends BaseType {
  /** Average bit turn rate through the interval. */
  Average?: eml.AngularVelocityMeasure;
  /** Log channel from which the turn rate statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface RpmStatistics extends _RpmStatistics {
  constructor: { new (): RpmStatistics };
}
export const RpmStatistics: { new (): RpmStatistics };

/** Specifies the main line scale types. */
export type ScaleType = "linear" | "logarithmic";
interface _ScaleType extends eml._TypeEnum {
  content: ScaleType;
}

/** Operations Slow Circulation Rates (SCR) Component Schema. */
interface _Scr extends BaseType {
  /** Unique identifier for this instance of Scr */
  uid: string;
  /** Date and time the information is related to. */
  DTim: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Along hole measured depth of measurement from the drill datum. */
  MdBit?: MeasuredDepthCoord;
  /** Recorded pump pressure for the stroke rate. */
  PresRecorded: eml.PressureMeasure;
  /** @integer A pointer to the corresponding pump on the rig. */
  Pump: number;
  /** Pump stroke rate. */
  RateStroke: eml.AngularVelocityMeasure;
  /** Type of slow circulation rate. */
  TypeScr: ScrType;
}
export interface Scr extends _Scr {
  constructor: { new (): Scr };
}
export const Scr: { new (): Scr };

/** Specifies the type of slow circulation rate. */
export type ScrType =
  | "string annulus"
  | "string kill line"
  | "string choke line"
  | "unknown";
interface _ScrType extends eml._TypeEnum {
  content: ScrType;
}

/** Sections are numbered "1" through "36." Irregular sections may be designated with a single value after a decimal point. USA Public Land Survey System. */
export type SectionNumber = string;
type _SectionNumber = eml._String64;

/** Tubular Sensor Component Schema. */
interface _Sensor extends BaseType {
  /** Unique identifier for this instance of Sensor. */
  uid: string;
  /** Comments and remarks. */
  Comments?: string;
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Offset from the bottom of the MWD tool. */
  OffsetBot?: eml.LengthMeasure;
  /** Type from POSC. */
  TypeMeasurement?: MeasurementType;
}
export interface Sensor extends _Sensor {
  constructor: { new (): Sensor };
}
export const Sensor: { new (): Sensor };

/** Rig Shaker Schema. */
interface _Shaker extends BaseType {
  /** Unique identifier for this instance of Shaker. */
  uid: string;
  /** Maximum pump rate at which the unit efficiently operates. */
  CapFlow?: eml.VolumePerTimeMeasure;
  /** Date and time the shaker was installed. */
  DTimInstall?: string;
  /** Date and time the shaker was removed. */
  DTimRemove?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Shaker location on the rig. */
  LocationShaker?: string;
  /** Manufacturer or supplier of the item. */
  Manufacturer?: string;
  /** Manufacturer's designated model. */
  Model?: string;
  /** Is part of mud-cleaning assembly as opposed to discrete shale shaker?
   * Values are "true" (or "1") and "false" (or "0"). */
  MudCleaner?: boolean;
  /** Human-recognizable context for the shaker. */
  Name: string;
  /** An identification tag for the shaker.
   * A serial number is a type of identification tag; however, some tags contain many pieces of information. This element only identifies the tag and does not describe the contents.
   * . */
  NameTag?: NameTag[];
  /** @integer Number of cascade levels. */
  NumCascLevel?: number;
  /** @integer Number of decks. */
  NumDecks?: number;
  /** Contractor/owner. */
  Owner?: string;
  /** Minimum mesh size. */
  SizeMeshMn?: eml.LengthMeasure;
  /** Description for the type of object. */
  Type?: string;
}
export interface Shaker extends _Shaker {
  constructor: { new (): Shaker };
}
export const Shaker: { new (): Shaker };

/** Operations Shaker Component Schema. */
interface _ShakerOp extends BaseType {
  /** Unique identifier for this instance of ShakerOp */
  uid: string;
  /** Date and time the information is related to. */
  DTim?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Hours run the shaker has run for this operation. */
  HoursRun?: eml.TimeMeasure;
  /** Hole measured depth at the time of measurement. */
  MdHole?: MeasuredDepthCoord;
  /** Percent of screen covered by cuttings. */
  PcScreenCovered?: eml.AreaPerAreaMeasure;
  /** A pointer to the shaker that is characterized by this report. */
  Shaker: string;
  ShakerScreen?: ShakerScreen;
}
export interface ShakerOp extends _ShakerOp {
  constructor: { new (): ShakerOp };
}
export const ShakerOp: { new (): ShakerOp };

/** Operations Shaker Screen Component Schema. */
interface _ShakerScreen extends BaseType {
  /** Shaker screen cut point, which is the maximum size cuttings that will pass through the screen. */
  CutPoint?: eml.LengthMeasure;
  /** Date and time activities were completed. */
  DTimEnd?: string;
  /** Date and time that activities started. */
  DTimStart?: string;
  /** Manufacturer or supplier of the item. */
  Manufacturer?: string;
  /** Mesh size in the X direction. */
  MeshX?: eml.LengthMeasure;
  /** Mesh size in the Y direction. */
  MeshY?: eml.LengthMeasure;
  /** Manufacturers designated model. */
  Model?: string;
  /** @integer Deck number the mesh is installed on. */
  NumDeck?: number;
}
export interface ShakerScreen extends _ShakerScreen {
  constructor: { new (): ShakerScreen };
}
export const ShakerScreen: { new (): ShakerScreen };

/** A container object for zero or more ShowEvaluationInterval objects. The container references a specific wellbore, a depth interval, a growing object status, and a collection of show evaluation intervals.
 * In a similar way to the InterpretedGeology, these are manually entered by the wellsite geologist or mud logger as an interpretation of the hydrocarbon show along the wellbore, based on the raw readings from one or more show analyses of individual show tests on cuttings samples. */
interface _ShowEvaluation extends eml._AbstractObject {
  EvaluatedIntervalShow?: ShowEvaluationInterval[];
  /** Describes the growing status of the show evaluation intervals. Valid values: active, inactive or closed. */
  GrowingStatus: ChannelStatus;
  /** [maintained by the server] The interval that contains the minimum and maximum measured depths for all show intervals in this show evaluation. */
  MdInterval: eml.MdInterval;
  Wellbore: eml.DataObjectReference;
}
export interface ShowEvaluation extends _ShowEvaluation {
  constructor: { new (): ShowEvaluation };
}
export const ShowEvaluation: { new (): ShowEvaluation };

/** An interpretation of the overall hydrocarbon show derived from analysis of individual show tests on cuttings samples. An interval in the wellbore for which data is manually entered by the wellsite geologist or mud logger as an interpretation of the hydrocarbon show along the wellbore, based on the raw readings from one or more show analyses of individual show tests on cuttings samples. */
interface _ShowEvaluationInterval extends eml._AbstractObject {
  /** Unique identifier for this instance of ShowEvaluationInterval. */
  uid: string;
  /** The measured depth interval over which the show is evaluated. */
  MdInterval: eml.MdInterval;
  /** Gas or oil exhibited at the show interval. */
  ShowFluid: ShowFluid;
  /** Quality of the fluid showing at this interval. */
  ShowRating?: ShowRating;
}
export interface ShowEvaluationInterval extends _ShowEvaluationInterval {
  constructor: { new (): ShowEvaluationInterval };
}
export const ShowEvaluationInterval: { new (): ShowEvaluationInterval };

/** Specifies the type of fluid analyzed in this interval. */
export type ShowFluid = "gas" | "oil";
interface _ShowFluid extends eml._TypeEnum {
  content: ShowFluid;
}

/** Specifies the intensity and color of the show. */
export type ShowFluorescence = "faint" | "bright" | "none";
interface _ShowFluorescence extends eml._TypeEnum {
  content: ShowFluorescence;
}

/** Specifies another qualifier for the show: blooming or streaming. */
export type ShowLevel = "blooming" | "streaming";
interface _ShowLevel extends eml._TypeEnum {
  content: ShowLevel;
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
  content: ShowRating;
}

/** Specifies an indication of both the solubility of the oil and the permeability of the show. The speed can vary from instantaneous to very slow. */
export type ShowSpeed =
  | "slow"
  | "moderately fast"
  | "fast"
  | "instantaneous"
  | "none";
interface _ShowSpeed extends eml._TypeEnum {
  content: ShowSpeed;
}

/** The location/interval of the slots and the history. */
interface _SlotsInterval extends BaseType {
  /** Unique identifier for this instance of SlotsInterval. */
  uid: string;
  /** The SlotsInterval event information. */
  EventHistory?: EventInfo;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Reference to a geology feature. */
  GeologyFeatureRefID?: string[];
  /** Slotted measured depth interval for this completion. */
  SlottedMdInterval?: eml.MdInterval;
  /** Slotted true vertical depth interval for this completion. */
  SlottedTvdInterval?: eml.TvdInterval;
  StatusHistory?: IntervalStatusHistory[];
  /** Reference to an equipment string, which is the equipment (e.g., tubing, gravel pack screens, etc.) that compose the completion. */
  StringEquipmentReferenceId?: string;
}
export interface SlotsInterval extends _SlotsInterval {
  constructor: { new (): SlotsInterval };
}
export const SlotsInterval: { new (): SlotsInterval };

/** Tubular Stablizer Component Schema. Captures dimension and operation information about stabilizers used in the tubular string. */
interface _Stabilizer extends BaseType {
  /** Unique identifier for this instance of Stabilizer. */
  uid: string;
  /** Distance of the blade bottom from the bottom of the component. */
  DistBladeBot?: eml.LengthMeasure;
  ExtensionAny?: eml.CustomData;
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
export interface Stabilizer extends _Stabilizer {
  constructor: { new (): Stabilizer };
}
export const Stabilizer: { new (): Stabilizer };

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
  content: StateDetailActivity;
}

/** Provides generic attributes associated with defining an additive used for stimulation. */
interface _StimAdditive extends _StimMaterial {
  /** Additive type or function from the enumeration 'StimAdditiveKind'. */
  AdditiveKind?: StimAdditiveKind;
  /** A code used to identify the supplier of the additive. */
  SupplierCode: string;
  /** The type of additive that is used, which can represent a suppliers description or type of AdditiveKind.  For example, 5% HCl could be the type when AdditiveKind=acid. */
  Type: string;
}
export interface StimAdditive extends _StimAdditive {
  constructor: { new (): StimAdditive };
}
export const StimAdditive: { new (): StimAdditive };

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
  content: StimAdditiveKind;
}

/** Provides a mechanism to capture general events that occurred during a stage of a stimulation job. */
interface _StimEvent extends BaseType {
  /** Unique identifier for this instance of StimEvent. */
  uid: string;
  /** A short description of the event. */
  Comment?: string;
  /** Date and time of this event. */
  DTim?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** @integer Event number. */
  Number: number;
  /** @integer Step number. Use it to reference an existing job step entry. */
  NumStep?: number;
}
export interface StimEvent extends _StimEvent {
  constructor: { new (): StimEvent };
}
export const StimEvent: { new (): StimEvent };

/** A diagnostic test that determines fluid efficiency. Fluid efficiency test (FET). */
interface _StimFetTest extends BaseType {
  /** Unique identifier for this instance of StimFetTest. */
  uid: string;
  /** An analysis method used for this FET. */
  AnalysisMethod?: StimFetTestAnalysisMethod[];
  /** End time for the FET. */
  DTimEnd?: string;
  /** Start time for the FET. */
  DTimStart?: string;
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
export interface StimFetTest extends _StimFetTest {
  constructor: { new (): StimFetTest };
}
export const StimFetTest: { new (): StimFetTest };

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
  content: StimFetTestAnalysisMethod;
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
  BridgePlugMD?: MeasuredDepthCoord;
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
  PackerMD?: MeasuredDepthCoord;
  /** The maximum measured depth of the tubing used for treatment of a stage. */
  TubingBottomMD?: MeasuredDepthCoord;
  Tubular?: StimTubular[];
}
export interface StimFlowPath extends _StimFlowPath {
  constructor: { new (): StimFlowPath };
}
export const StimFlowPath: { new (): StimFlowPath };

/** Specifies the type of flow paths used in a stimulation job. */
export type StimFlowPathType =
  | "annulus"
  | "casing"
  | "drill pipe"
  | "open hole"
  | "tubing"
  | "tubing and annulus";
interface _StimFlowPathType extends eml._TypeEnum {
  content: StimFlowPathType;
}

/** The characteristics and recipe of the stimulation fluid without proppant. */
interface _StimFluid extends BaseType {
  AdditiveConcentration?: StimMaterialQuantity[];
  /** The density of the fluid. */
  Density?: eml.MassPerVolumeMeasure;
  /** The description of the fluid. */
  Description?: string;
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
  Name?: string;
  /** The pH of the fluid. */
  pH?: number;
  /** The purpose of the fluid. */
  Purpose?: string;
  /** The specific gravity of the fluid at surface. */
  SpecificGravity?: eml.DimensionlessMeasure;
  /** The fluid subtypes. */
  Subtype?: StimFluidSubtype;
  /** The supplier of the fluid. */
  Supplier?: string;
  /** Viscosity of stimulation fluid. */
  Viscosity?: eml.DynamicViscosityMeasure;
  /** Volume of fluid. */
  Volume?: eml.VolumeMeasure;
}
export interface StimFluid extends _StimFluid {
  constructor: { new (): StimFluid };
}
export const StimFluid: { new (): StimFluid };

/** Specifies the fluid type. */
export type StimFluidKind = "acid-based" | "gas" | "oil-based" | "water-based";
interface _StimFluidKind extends eml._TypeEnum {
  content: StimFluidKind;
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
  content: StimFluidSubtype;
}

/** ISO13503-2 properties. */
interface _StimISO13503_2Properties extends BaseType {
  /** Unique identifier for this instance of StimISO13503_2Properties. */
  uid: string;
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
export interface StimISO13503_2Properties extends _StimISO13503_2Properties {
  constructor: { new (): StimISO13503_2Properties };
}
export const StimISO13503_2Properties: { new (): StimISO13503_2Properties };

/** A stress, conductivity, permeability, and temperature data point. */
interface _StimISO13503_5Point extends BaseType {
  /** Unique identifier for this instance of StimISO13503_5Point */
  uid: string;
  /** The conductivity under stress. */
  Conductivity: eml.PermeabilityLengthMeasure;
  /** The permeability under stress. */
  Permeability: eml.PermeabilityRockMeasure;
  /** The amount of stress applied. */
  Stress: eml.PressureMeasure;
  /** The temperature at the time measurements were taken. */
  Temperature: eml.ThermodynamicTemperatureMeasure;
}
export interface StimISO13503_5Point extends _StimISO13503_5Point {
  constructor: { new (): StimISO13503_5Point };
}
export const StimISO13503_5Point: { new (): StimISO13503_5Point };

/** Parent object (transferrable object) for all the information about one stimulation job. A stimulation job has multiple stages, and each stage has multiple steps. */
interface _StimJob extends eml._AbstractObject {
  /** Average pressure encountered during treatment of all stages. */
  AvgJobPres?: eml.PressureMeasure;
  /** Bottomhole static temperature for the job. */
  BottomholeStaticTemperature?: eml.ThermodynamicTemperatureMeasure;
  /** Customer or company name. */
  CustomerName: string;
  /** Date and time at which the stimulation contractor arrives on location. */
  DTimArrival?: string;
  /** Ending date and time of the stimulation job. */
  DTimEnd?: string;
  /** Start date and time of the stimulation job. */
  DTimStart?: string;
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
  Kind: string;
  LogCatalog?: StimJobLogCatalog[];
  MaterialCatalog: StimJobMaterialCatalog;
  MaterialUsed?: StimMaterialQuantity[];
  /** Maximum job fluid pumping rate encountered during treatment of all stages. */
  MaxFluidRate?: eml.VolumePerTimeMeasure;
  /** Maximum pressure encountered during the job. */
  MaxJobPres?: eml.PressureMeasure;
  /** UNSPSC (Segment 71) commodity code from the oil and gas extraction and production enhancement services family. */
  PIDXCommodityCode?: PIDXCommodityCode;
  /** Name of the well stimulation contractor. */
  ServiceCompany: string;
  /** @integer Number of stages treated during the stimulation service. */
  StageCount?: number;
  /** Name of the service company supervisor. */
  Supervisor?: string;
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
export interface StimJob extends _StimJob {
  constructor: { new (): StimJob };
}
export const StimJob: { new (): StimJob };

/** A pumping diagnostics session. */
interface _StimJobDiagnosticSession extends BaseType {
  /** Unique identifier for this instance of StimJobDiagnosticSession. */
  uid: string;
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
  Description?: string;
  /** The date and time when the fluid in the fracture is completely leaked off into the formation and the fracture closes on its faces. */
  DTimFractureClose?: string;
  /** The date and time pumping ended. */
  DTimPumpOff?: string;
  /** The date and time pumping began. */
  DTimPumpOn?: string;
  /** The date and time at which a well ceases flowing and the valves are closed. */
  DTimWellShutin?: string;
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
  MdBottomhole?: MeasuredDepthCoord;
  /** The measured depth of the middle perforation. */
  MdMidPerforation?: MeasuredDepthCoord;
  /** The measured depth of the wellbore to its injection point. */
  MdSurface?: MeasuredDepthCoord;
  /** The name of the session. */
  Name?: string;
  /** @integer The number of this pumping diagnostics session. */
  Number?: number;
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
  /** @integer The number of a stage associated with this diagnostics session. */
  StageNumber?: number;
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
  TvdMidPerforation?: WellVerticalDepthCoord;
  /** The volume of fluid in the wellbore. */
  WellboreVolume?: eml.VolumeMeasure;
}
export interface StimJobDiagnosticSession extends _StimJobDiagnosticSession {
  constructor: { new (): StimJobDiagnosticSession };
}
export const StimJobDiagnosticSession: { new (): StimJobDiagnosticSession };

/** Captures the high-level description of the diversion method used in the stimulation job. */
interface _StimJobDiversion extends BaseType {
  /** Name of the diversion contractor. */
  Contractor?: string;
  /** Spacing between packer elements. */
  ElementSpacing?: eml.LengthMeasure;
  /** The diversion method used. */
  Method?: StimJobDiversionMethod;
  /** A supplier description of the diversion tool, such as its commercial name. */
  ToolDescription?: string;
}
export interface StimJobDiversion extends _StimJobDiversion {
  constructor: { new (): StimJobDiversion };
}
export const StimJobDiversion: { new (): StimJobDiversion };

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
  content: StimJobDiversionMethod;
}

/** A group of logs from a stimulation job, one log per stage. */
interface _StimJobLogCatalog extends BaseType {
  JobLog: eml.DataObjectReference[];
}
export interface StimJobLogCatalog extends _StimJobLogCatalog {
  constructor: { new (): StimJobLogCatalog };
}
export const StimJobLogCatalog: { new (): StimJobLogCatalog };

/** A listing of materials for a particular job. Any stage of the stim job can reference material(s) in the catalog, which eliminates the need to repeat the materials for each stage. */
interface _StimJobMaterialCatalog extends BaseType {
  /** List of additives in the catalog. */
  Additives?: StimAdditive[];
  /** List of proppant agents in the catalog. */
  ProppantAgents?: StimProppantAgent[];
}
export interface StimJobMaterialCatalog extends _StimJobMaterialCatalog {
  constructor: { new (): StimJobMaterialCatalog };
}
export const StimJobMaterialCatalog: { new (): StimJobMaterialCatalog };

/** Stage treated during a stimulation job. */
interface _StimJobStage extends eml._AbstractObject {
  /** Unique identifier for this instance of StimJobStage. */
  uid: string;
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
  DTimEnd?: string;
  /** Starting date and time for the stage treatment. */
  DTimStart?: string;
  FlowPath?: StimFlowPath;
  /** The length of formation broken per day. */
  FormationBreakLengthPerDay?: eml.LengthMeasure;
  /** The name of the formation being stimulated. */
  FormationName?: string;
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
  InitialShutinPres?: eml.PowerMeasure;
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
  MdFormationBottom?: MeasuredDepthCoord;
  /** Measured depth of the top of the formation. */
  MdFormationTop?: MeasuredDepthCoord;
  /** Measured depth of the bottom open hole. */
  MdOpenHoleBottom?: MeasuredDepthCoord;
  /** Measured depth of the top open hole. */
  MdOpenHoleTop?: MeasuredDepthCoord;
  /** The difference between the pressure which holds a fracture closed (minimal principal stress) and that pressure which is necessary to open the fracture. */
  NetPres?: eml.PressureMeasure;
  /** @integer The number associated with the stage. */
  Number?: number;
  /** The diameter of the open hole. */
  OpenHoleDiameter?: eml.LengthMeasure;
  /** A name for the open hole. To be used for open hole completions. */
  OpenHoleName?: string;
  PdatSession?: StimJobDiagnosticSession[];
  /** The percentage of volume pumped used for the pad. */
  PercentPad?: eml.VolumePerVolumeMeasure;
  /** Total proppant mass used as a percent of the design mass. */
  PercentProppantPumped?: eml.VolumePerVolumeMeasure;
  /** @integer Total number of perforation balls used while treating the stage. */
  PerfBallCount?: number;
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
  TechnologyType?: string;
  /** The total amount of proppant in the formation relative to the current stage. */
  TotalProppantInFormation?: eml.MassMeasure;
  /** The total pumping time for the treatment of the stage. */
  TotalPumpTime?: eml.TimeMeasure;
  /** The total volume pumped for all steps while treating the stage. */
  TotalVolume?: eml.VolumeMeasure;
  /** True vertical depth of the bottom of the formation. */
  TvdFormationBottom?: WellVerticalDepthCoord;
  /** True vertical depth of the top of the formation. */
  TvdFormationTop?: WellVerticalDepthCoord;
  /** True vertical depth of the bottom open hole. */
  TvdOpenHoleBottom?: WellVerticalDepthCoord;
  /** True vertical depth of the top open hole. */
  TvdOpenHoleTop?: WellVerticalDepthCoord;
  /** The volume pumped for the body portion of the stage treatment. */
  VolumeBody?: eml.VolumeMeasure;
  /** Volume pumped during flush portion of stage treatment. */
  VolumeFlush?: eml.VolumeMeasure;
  /** Volume pumped for pad portion of stage treatment. */
  VolumePad?: eml.VolumeMeasure;
  /** Water source for fluid pumped during stage. */
  WaterSource?: string;
  /** The weight of proppant left in the wellbore after pumping has stopped. */
  WellboreProppantMass?: eml.MassMeasure;
}
export interface StimJobStage extends _StimJobStage {
  constructor: { new (): StimJobStage };
}
export const StimJobStage: { new (): StimJobStage };

/** A step in the treatment of a stage for a stimulation job. */
interface _StimJobStep extends BaseType {
  /** Unique identifier for this instance of StimJobStep. */
  uid: string;
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
  /** @integer Balls recovered during execution of the step. */
  BallsRecovered?: number;
  /** @integer Balls used during execution of the step. */
  BallsUsed?: number;
  /** Base fluid volume recorded after equipment set to bypass. */
  BaseFluidBypassVol?: eml.VolumeMeasure;
  /** Base fluid volume entering the equipment. */
  BaseFluidVol?: eml.VolumeMeasure;
  /** A short description of the step. */
  Description?: string;
  /** Date and time the step ended. */
  DTimEnd?: string;
  /** Date and time the step started. */
  DTimStart?: string;
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
  Kind?: string;
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
  StepName?: string;
  /** @integer Step number. */
  StepNumber: number;
  /** Slurry volume entering the well. */
  WellheadVol?: eml.VolumeMeasure;
}
export interface StimJobStep extends _StimJobStep {
  constructor: { new (): StimJobStep };
}
export const StimJobStep: { new (): StimJobStep };

/** Materials as a concept refers to the materials left in the well or consumed in the process of making the stimulation; it does not refer the carrier fluid. */
interface _StimMaterial extends BaseType {
  /** Unique identifier for this instance of StimMaterial. */
  uid: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The material kind. */
  Kind?: StimMaterialKind;
  /** The name of the material. */
  Name?: string;
  /** The name of the material supplier. */
  Supplier?: string;
}
export interface StimMaterial extends _StimMaterial {
  constructor: { new (): StimMaterial };
}
export const StimMaterial: { new (): StimMaterial };

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
  content: StimMaterialKind;
}

/** Stimulation material used. */
interface _StimMaterialQuantity extends BaseType {
  /** Unique identifier for this instance of StimMaterialQuantity */
  uid: string;
  /** The density of material used. */
  Density?: eml.MassPerVolumeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The mass of material used.  This should be used without specifying any of the other material measures (e.g. volume, standard volume, etc.). */
  Mass?: eml.MassMeasure;
  /** Rate at which mass of material is flowing. */
  MassFlowRate?: eml.MassPerTimeMeasure;
  /** Material ID is  equal to AbstractStimMaterial.RefId.
   * This is a reference to the UID of the StimMaterial in the StimJobMaterialCatalog. */
  MaterialReference: string;
  /** The standard volume of material used. Standard volume is the volume measured under the same conditions. This should be used without specifying any of the other material measures (e.g., mass, volume, etc.). */
  StdVolume?: eml.VolumeMeasure;
  /** The volume of material used.  This should be used without specifying any of the other material measures (e.g. mass, standard volume, etc.). */
  Volume?: eml.VolumeMeasure;
  /** The volume per volume measure of material used.  This should be used without specifying any of the other material measures (e.g. mass, density, standard volume, etc.). */
  VolumeConcentration?: eml.VolumePerVolumeMeasure;
  /** Rate at which the volume of material is flowing. */
  VolumetricFlowRate?: eml.VolumePerTimeMeasure;
}
export interface StimMaterialQuantity extends _StimMaterialQuantity {
  constructor: { new (): StimMaterialQuantity };
}
export const StimMaterialQuantity: { new (): StimMaterialQuantity };

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
  /** @integer The number of perforations in this interval. */
  PerforationCount?: number;
  /** The radial distribution of successive perforations around the wellbore axis.
   * Radial distribution is commonly available in 0, 180 120, 90 and 60 degree phasing. */
  PhasingPerforation?: eml.PlaneAngleMeasure;
  /** The size of the perforations. */
  Size?: eml.LengthMeasure;
  /** True vertical depth of the top and base perforation. */
  TvdPerforatedInterval?: eml.TvdInterval;
  /** The type of perforation and/or how the perforation was created. */
  Type?: string;
}
export interface StimPerforationCluster extends _StimPerforationCluster {
  constructor: { new (): StimPerforationCluster };
}
export const StimPerforationCluster: { new (): StimPerforationCluster };

/** Provides mechanism for combining perforation clusters into a group. This could be used to specify the set of existing perforations present in a well before starting a stimulation job, for example, for a re-frac job. */
interface _StimPerforationClusterSet extends BaseType {
  StimPerforationCluster: StimPerforationCluster[];
}
export interface StimPerforationClusterSet extends _StimPerforationClusterSet {
  constructor: { new (): StimPerforationClusterSet };
}
export const StimPerforationClusterSet: { new (): StimPerforationClusterSet };

/** In an injection step test, the injection rate at a particular pressure. */
interface _StimPressureFlowRate extends BaseType {
  /** Unique identifier for this instance of StimPressureFlowRate. */
  uid: string;
  /** The flow of the fluid at the bottomhole. */
  BottomholeRate?: eml.VolumePerTimeMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The pressure of the step test. */
  Pressure?: eml.PressureMeasure;
}
export interface StimPressureFlowRate extends _StimPressureFlowRate {
  constructor: { new (): StimPressureFlowRate };
}
export const StimPressureFlowRate: { new (): StimPressureFlowRate };

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
  /** @integer High value of sieve mesh size: for 40/70 sand, this value is 70. */
  MeshSizeHigh?: number;
  /** @integer Low value of sieve mesh size: for 40/70 sand, this value is 40. */
  MeshSizeLow?: number;
  /** Proppant type or function. */
  ProppantAgentKind?: ProppantAgentKind;
  /** The unconfined compressive strength of the proppant. */
  UnconfinedCompressiveStrength?: eml.PressureMeasure;
}
export interface StimProppantAgent extends _StimProppantAgent {
  constructor: { new (): StimProppantAgent };
}
export const StimProppantAgent: { new (): StimProppantAgent };

/** Diagnostic test involving flowing a well back after treatment. */
interface _StimPumpFlowBackTest extends BaseType {
  /** Unique identifier for this instance of StimPumpFlowBackTest. */
  uid: string;
  /** End time for the test. */
  DTimEnd?: string;
  /** Start time for the test. */
  DTimStart?: string;
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
export interface StimPumpFlowBackTest extends _StimPumpFlowBackTest {
  constructor: { new (): StimPumpFlowBackTest };
}
export const StimPumpFlowBackTest: { new (): StimPumpFlowBackTest };

/** In a step-down pump diagnostics test, this object contains all the data for a particular step in that test. */
interface _StimPumpFlowBackTestStep extends BaseType {
  /** Unique identifier for this instance of StimPumpFlowBackTestStep. */
  uid: string;
  /** Bottomhole flow rate for the specific step. */
  BottomholeRate?: eml.VolumePerTimeMeasure;
  /** Time stamp of the pressure measurement. */
  DTim?: string;
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
  /** @integer The number of the step. Identifies the step within the step down test. */
  Number: number;
  /** Calculated perforation friction for the specific step. */
  PerfFriction?: eml.PressureMeasure;
  /** Calculated pipe friction for the specific step. */
  PipeFriction?: eml.PressureMeasure;
  /** Surface pressure measured for the specific step. */
  Pres?: eml.PressureMeasure;
  /** Surface rate entering the well for the specific step. */
  SurfaceRate?: eml.VolumePerTimeMeasure;
}
export interface StimPumpFlowBackTestStep extends _StimPumpFlowBackTestStep {
  constructor: { new (): StimPumpFlowBackTestStep };
}
export const StimPumpFlowBackTestStep: { new (): StimPumpFlowBackTestStep };

/** Description of a reservoir interval. */
interface _StimReservoirInterval extends BaseType {
  /** Unique identifier for this instance of StimReservoirInterval */
  uid: string;
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
  LithName?: string;
  /** Net pay is computed. It is the thickness of rock that can deliver hydrocarbons to the wellbore formation. */
  LithNetPayThickness?: eml.LengthMeasure;
  /** The ratio of the relative contraction strain, or transverse strain (normal to the applied load), divided by the relative extension strain, or axial strain (in the direction of the applied load). */
  LithPoissonsRatio?: eml.DimensionlessMeasure;
  /** Refers to the pressure of fluids held within a soil or rock, in gaps between particles’ formation porosity. */
  LithPorePres?: eml.PressureMeasure;
  /** Young's modulus (E) is a measure of the stiffness of an isotropic elastic material. It is also known as the Young modulus, modulus of elasticity, elastic modulus (though Young's modulus is actually one  of several elastic moduli such as the bulk modulus and the shear modulus) or tensile modulus. It is  defined as the ratio of the uniaxial stress over the uniaxial strain. */
  LithYoungsModulus?: eml.PressureMeasure;
  /** Name of the formation. */
  NameFormation?: string;
  /** The volume change of the fluid in the net pay when pressure is applied. */
  NetPayFluidCompressibility?: eml.IsothermalCompressibilityMeasure;
  /** With respect to the net pay, a measurement of the internal resistance of a fluid to flow against itself. Expressed as the ratio of shear stress to shear rate. */
  NetPayFluidViscosity?: eml.DynamicViscosityMeasure;
  /** The permeability of the net pay of the formation. */
  NetPayFormationPermeability?: eml.PermeabilityRockMeasure;
  /** The porosity of the net pay formation. */
  NetPayFormationPorosity?: eml.VolumePerVolumeMeasure;
  /** The name used for the net pay zone. */
  NetPayName?: string;
  /** The pore pressure of the net pay. */
  NetPayPorePres?: eml.PressureMeasure;
  /** The thickness of the most productive part of the interval. Net pay is a subset of the gross. */
  NetPayThickness?: eml.LengthMeasure;
}
export interface StimReservoirInterval extends _StimReservoirInterval {
  constructor: { new (): StimReservoirInterval };
}
export const StimReservoirInterval: { new (): StimReservoirInterval };

/** A pressure measurement taken at a certain time after the well has been shut in. */
interface _StimShutInPressure extends BaseType {
  /** Unique identifier for this instance of StimShutInPressure. */
  uid: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The shut-in pressure. */
  Pressure: eml.PressureMeasure;
  /** The time span after shut in at which the pressure was measured. */
  TimeAfterShutin: eml.TimeMeasure;
}
export interface StimShutInPressure extends _StimShutInPressure {
  constructor: { new (): StimShutInPressure };
}
export const StimShutInPressure: { new (): StimShutInPressure };

/** Diagnostic test involving flowing a well back after treatment. */
interface _StimStepDownTest extends BaseType {
  /** Unique identifier for this instance of StimStepDownTest */
  uid: string;
  /** The density of the fluid at the bottom of the hole adjusting for bottomhole temperature and pressure during the step-down test. */
  BottomholeFluidDensity?: eml.MassPerVolumeMeasure;
  /** Diameter of the injection point or perforation. */
  DiameterEntryHole?: eml.LengthMeasure;
  /** A coefficient used in the equation for calculation of the pressure drop across a perforation set. */
  DischargeCoefficient?: eml.DimensionlessMeasure;
  /** @integer The number of perforations in the interval being tested that are  calculated to be open to injection, which is determined during the step-down test. */
  EffectivePerfs?: number;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The initial shutin pressure. */
  InitialShutinPres?: eml.PressureMeasure;
  /** @integer The number of perforations in the interval being tested. */
  PerforationCount?: number;
  /** The data related to a particular step in the step-down test. */
  Step?: StimPumpFlowBackTestStep[];
}
export interface StimStepDownTest extends _StimStepDownTest {
  constructor: { new (): StimStepDownTest };
}
export const StimStepDownTest: { new (): StimStepDownTest };

/** An injection test, plotted pressure against injection rate, where a curve deflection and change of slope indicates the fracture breakdown pressure. */
interface _StimStepTest extends BaseType {
  /** Unique identifier for this instance of StimStepTest. */
  uid: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The pressure necessary to extend the fracture once initiated.
   * The fracture extension pressure may rise slightly with increasing fracture length and/or height because of friction pressure drop down the length of the fracture. */
  FractureExtensionPres?: eml.PressureMeasure;
  /** A pressure and fluid rate data reading. */
  PresMeasurement?: StimPressureFlowRate[];
}
export interface StimStepTest extends _StimStepTest {
  constructor: { new (): StimStepTest };
}
export const StimStepTest: { new (): StimStepTest };

/** In a production enhancement job, this item constitutes the data for a tubular in the hole. */
interface _StimTubular extends BaseType {
  /** Unique identifier for this instance of StimTubular. */
  uid: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** The inside diameter of the tubular used. */
  Id?: eml.LengthMeasure;
  /** The outside diameter of the tubular used. */
  Od?: eml.LengthMeasure;
  /** Measured depth interval over which the tubular was used. */
  TubularMdInterval?: eml.MdInterval;
  /** True vertical depth interval over which the tubular was used. */
  TubularTvdInterval?: eml.TvdInterval;
  /** The type of tubular (e.g., casing, tubing, liner, packer, open hole, other). */
  Type?: string;
  /** The volume per length of the tubular. */
  VolumeFactor?: eml.VolumePerLengthMeasure;
  /** The weight per length of the tubular. */
  Weight?: eml.MassPerLengthMeasure;
}
export interface StimTubular extends _StimTubular {
  constructor: { new (): StimTubular };
}
export const StimTubular: { new (): StimTubular };

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
  /** Magnetic declination used to correct a Magnetic North referenced azimuth
   * to a True North azimuth.  Magnetic declination angles are measured positive clockwise
   * from True North to Magnetic North (or negative in the anti-clockwise direction).
   * To convert a Magnetic azimuth to a True North azimuth, the magnetic declination should be added. */
  StnGridConUsed?: eml.PlaneAngleMeasure;
  /** Magnetic declination used to correct a Magnetic North referenced azimuth
   * to a True North azimuth.  Magnetic declination angles are measured positive clockwise
   * from True North to Magnetic North (or negative in the anti-clockwise direction).
   * To convert a Magnetic azimuth to a True North azimuth, the magnetic declination should be added. */
  StnMagDeclUsed?: eml.PlaneAngleMeasure;
}
export interface StnTrajCorUsed extends _StnTrajCorUsed {
  constructor: { new (): StnTrajCorUsed };
}
export const StnTrajCorUsed: { new (): StnTrajCorUsed };

/** Captures validation information for a covariance matrix. */
interface _StnTrajMatrixCov extends BaseType {
  /** Bias east. */
  BiasE?: eml.LengthMeasure;
  /** Bias north. */
  BiasN?: eml.LengthMeasure;
  /** Bias vertical. The coordinate system is set up in a right-handed configuration, which makes the vertical direction increasing (i.e., positive) downwards. */
  BiasVert?: eml.LengthMeasure;
  /** Covariance east east. */
  VarianceEE?: eml.AreaMeasure;
  /** Crossvariance east vertical. */
  VarianceEVert?: eml.AreaMeasure;
  /** Crossvariance north east. */
  VarianceNE?: eml.AreaMeasure;
  /** Covariance north north. */
  VarianceNN?: eml.AreaMeasure;
  /** Crossvariance north vertical. */
  VarianceNVert?: eml.AreaMeasure;
  /** Covariance vertical vertical. */
  VarianceVertVert?: eml.AreaMeasure;
}
export interface StnTrajMatrixCov extends _StnTrajMatrixCov {
  constructor: { new (): StnTrajMatrixCov };
}
export const StnTrajMatrixCov: { new (): StnTrajMatrixCov };

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
export interface StnTrajRawData extends _StnTrajRawData {
  constructor: { new (): StnTrajRawData };
}
export const StnTrajRawData: { new (): StnTrajRawData };

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
export interface StnTrajValid extends _StnTrajValid {
  constructor: { new (): StnTrajValid };
}
export const StnTrajValid: { new (): StnTrajValid };

/** StringAccessories contain the stringequipment's decorative components. An accessory is the stringEquipment or Strings’ decorative component.  An accessory is NOT directly screwed to the string. This part DOES NOT carry the weight of the rest of the String as opposed to the stringEquipment, which does. An Accessory is UNLIKE an Assembly on which the stringEquipment is built out of. */
interface _StringAccessory extends BaseType {
  Accessory: StringEquipment[];
}
export interface StringAccessory extends _StringAccessory {
  constructor: { new (): StringAccessory };
}
export const StringAccessory: { new (): StringAccessory };

/** Information regarding equipment that composes (makes up) a string. */
interface _StringEquipment extends BaseType {
  /** Reference to a piece of equipment. */
  equipmentReferenceUid: string;
  /** Unique identifier for this instance of StringEquipment. */
  uid: string;
  Assembly?: Assembly;
  ConnectionNext?: EquipmentConnection[];
  /** @integer The count number of the same equipment. The default is 1.  In some cases, multiple pieces group into one component. */
  Count?: number;
  /** History of events related to this equipment. */
  EquipmentEventHistory?: EventInfo[];
  /** The type of the equipment. See enumerated values. */
  EquipmentType?: string;
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
  Name?: string;
  /** Object condition at installation. */
  ObjectCondition?: string;
  OrderOfObject?: ObjectSequence;
  OutsideComponent?: ReferenceContainer[];
  /** Flag indicating whether this component is inside the string or not . */
  OutsideString?: boolean;
  /** Reference to the perforated hole in the equipment after a perforation event. */
  PerforationSetRefId?: string[];
  /** Remarks on the equipment stored permanently. */
  PermanentRemarks?: string;
  /** Burst pressure. */
  PresBurst?: eml.PressureMeasure;
  /** Collapse pressure. */
  PresCollapse?: eml.PressureMeasure;
  /** Pressure  rating. */
  PresRating?: eml.PressureMeasure;
  /** The days that the equipment has run. */
  PreviousRunDays?: eml.TimeMeasure;
  /** The well run number. */
  RunNo?: string;
  /** The status of the piece of equipment. */
  Status?: string;
  /** Object surface condition. */
  SurfaceCondition?: string;
  /** Max tensile strength. */
  TensileMax?: eml.ForceMeasure;
  /** True vertical depth interval in which the equipment is installed in the string. */
  TvdInterval?: eml.TvdInterval;
  /** Remarks on the usage of this equipment. */
  UsageComment?: string;
}
export interface StringEquipment extends _StringEquipment {
  constructor: { new (): StringEquipment };
}
export const StringEquipment: { new (): StringEquipment };

/** Information on collection of set of equipment included in the string. */
interface _StringEquipmentSet extends BaseType {
  StringEquipment: StringEquipment[];
}
export interface StringEquipmentSet extends _StringEquipmentSet {
  constructor: { new (): StringEquipmentSet };
}
export const StringEquipmentSet: { new (): StringEquipmentSet };

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
  content: SubStringType;
}

/** Operations Support Craft Component Schema. */
interface _SupportCraft extends BaseType {
  /** Unique identifier for this instance of SupportCraft. */
  uid: string;
  /** Comments and remarks. */
  Comments?: string;
  /** Date and time when the vehicle arrived at the rig site. */
  DTimArrived?: string;
  /** Date and time when the vehicle departed from the rig site. */
  DTimDeparted?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Human-recognizable context for the support craft. */
  Name: string;
  /** Type of support craft (e.g., barge, helicopter, tug boat, etc.) */
  TypeSupportCraft: SupportCraftType;
}
export interface SupportCraft extends _SupportCraft {
  constructor: { new (): SupportCraft };
}
export const SupportCraft: { new (): SupportCraft };

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
  content: SupportCraftType;
}

/** Rig Surface Equipment Schema. */
interface _SurfaceEquipment extends BaseType {
  /** Coiled tubing: the coiled tubing wrap type. */
  CtWrapType?: string;
  /** Description of item and details. */
  Description?: string;
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
export interface SurfaceEquipment extends _SurfaceEquipment {
  constructor: { new (): SurfaceEquipment };
}
export const SurfaceEquipment: { new (): SurfaceEquipment };

/** Specifies the type of surface equipment. */
export type SurfEquipType = "IADC" | "custom" | "coiled tubing" | "unknown";
interface _SurfEquipType extends eml._TypeEnum {
  content: SurfEquipType;
}

/** Captures information about the nature, range, and sequence of directional surveying tools run in a wellbore for the management of positional uncertainty. This object is uniquely identified within the context of one wellbore object. */
interface _SurveyProgram extends eml._AbstractObject {
  /** Name of the engineer. */
  Engineer?: string;
  /** Is program  final or intermediate/preliminary? */
  Final?: string;
  SurveySection?: SurveySection[];
  /** @integer Survey version number, incremented every time the program is modified. */
  SurveyVer: number;
  Wellbore: eml.DataObjectReference;
}
export interface SurveyProgram extends _SurveyProgram {
  constructor: { new (): SurveyProgram };
}
export const SurveyProgram: { new (): SurveyProgram };

/** Survey Section Component Schema. */
interface _SurveySection extends BaseType {
  /** Unique identifier of this instance of SurveySection. */
  uid: string;
  /** Comments and remarks. */
  Comments?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Maximum allowable depth frequency for survey stations for this survey run. */
  FrequencyMx?: eml.LengthMeasure;
  /** The item state for the data object. */
  ItemState?: eml.ExistenceKind;
  MdInterval: eml.MdInterval;
  /** Error model used to calculate the ellipses of uncertainty. */
  ModelError?: string;
  /** Name of the survey program section. */
  Name?: string;
  /** Company who will run or has run the survey tool. */
  NameSurveyCompany: string;
  /** Name of survey tool used in this section. */
  NameTool: string;
  /** Higher index trajectory takes precedence over overlapping section of previous trajectory?   Values are "true" (or "1") and "false" (or "0"). Normally, this is true. */
  Overwrite?: boolean;
  /** @integer Order in which the program sections are or were executed. */
  Sequence: number;
  /** Type of tool used. */
  TypeTool: string;
}
export interface SurveySection extends _SurveySection {
  constructor: { new (): SurveySection };
}
export const SurveySection: { new (): SurveySection };

/** Specifies the codes for the ISCWSA survey tool operating modes. */
export type SurveyToolOperatingMode =
  | "continuous xy"
  | "continuous xyz"
  | "continuous z"
  | "unknown"
  | "stationary";
interface _SurveyToolOperatingMode extends eml._TypeEnum {
  content: SurveyToolOperatingMode;
}

/** Qualifies an index based on time. */
interface _TimeIndexValue extends _AbstractIndexValue {
  /** Used to specify the channel start and end index. */
  Time: string;
}
export interface TimeIndexValue extends _TimeIndexValue {
  constructor: { new (): TimeIndexValue };
}
export const TimeIndexValue: { new (): TimeIndexValue };

/** A timestamped textual description. */
interface _TimestampedCommentString extends eml._String2000 {
  /** The timestamp of the time-qualified comment. */
  dTim: string;
}
export interface TimestampedCommentString extends _TimestampedCommentString {
  constructor: { new (): TimestampedCommentString };
}
export const TimestampedCommentString: { new (): TimestampedCommentString };

/** Used to define a surveying tool error model. This object is globally unique. */
interface _ToolErrorModel extends eml._AbstractObject {
  Authorization?: IscwsaAuthorizationData;
  ErrorTermValue: IscwsaErrorTermValue[];
  ModelParameters?: IscwsaModelParameters;
  OperatingCondition?: IscwsaSurveyToolOperatingCondition[];
  OperatingInterval?: IscwsaSurveyToolOperatingInterval[];
  /** The type of tool used for the measurements. This is the same list as defined for a trajectoryStation. */
  TypeSurveyTool?: TypeSurveyTool;
  /** Reference to the toolErrorTermSet object that
   * contains the error terms used in this model. */
  UseErrorTermSet?: string;
}
export interface ToolErrorModel extends _ToolErrorModel {
  constructor: { new (): ToolErrorModel };
}
export const ToolErrorModel: { new (): ToolErrorModel };

/** Captures a set of surveying tool error terms which may be used in a toolErrorModel. This object is globally unique. */
interface _ToolErrorTermSet extends eml._AbstractObject {
  Authorization?: IscwsaAuthorizationData;
  ErrorTerm?: IscwsaErrorTerm[];
  Nomenclature?: IscwsaNomenclature;
}
export interface ToolErrorTermSet extends _ToolErrorTermSet {
  constructor: { new (): ToolErrorTermSet };
}
export const ToolErrorTermSet: { new (): ToolErrorTermSet };

/** Measurement of the  average electric current and the channel from which the data was calculated. */
interface _TorqueCurrentStatistics extends BaseType {
  /** Average electric current through the interval */
  Average?: eml.ElectricCurrentMeasure;
  /** Log channel from which the electric current statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface TorqueCurrentStatistics extends _TorqueCurrentStatistics {
  constructor: { new (): TorqueCurrentStatistics };
}
export const TorqueCurrentStatistics: { new (): TorqueCurrentStatistics };

/** Measurement of average torque and the channel from which the data was calculated. */
interface _TorqueStatistics extends BaseType {
  /** Average torque through the interval. */
  Average?: eml.MomentOfForceMeasure;
  /** Log channel from which the torque statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface TorqueStatistics extends _TorqueStatistics {
  constructor: { new (): TorqueStatistics };
}
export const TorqueStatistics: { new (): TorqueStatistics };

/** The trajectory object is used to capture information about a directional survey in a wellbore. It contains many trajectory stations to capture the information about individual survey points. This object is uniquely identified within the context of one wellbore object. */
interface _Trajectory extends eml._AbstractObject {
  /** Specifies the definition of north.
   * While this is optional because of legacy data, it is strongly recommended
   * that this always be specified. */
  AziRef?: AziRef;
  /** Azimuth used for vertical section plot/computations. */
  AziVertSect?: eml.PlaneAngleMeasure;
  /** True ("true" or "1") indicates that this trajectory is definitive for
   * this wellbore. False ("false" or "0") or not given indicates otherwise.
   * There can only be one trajectory per wellbore with definitive=true and it
   * must define the geometry of the whole wellbore (surface to bottom).
   * The definitive trajectory may represent a composite of information in many
   * other trajectories. A query requesting a subset of the possible information can
   * provide a simplistic view of the geometry of the wellbore. */
  Definitive?: boolean;
  /** Origin east-west used for vertical section plot/computations. */
  DispEwVertSectOrig?: eml.LengthMeasure;
  /** Origin north-south used for vertical section plot/computations. */
  DispNsVertSectOrig?: eml.LengthMeasure;
  /** End date and time of trajectory station measurements.
   * Note that this is NOT a server query parameter. */
  DTimTrajEnd?: string;
  /** Start date and time of trajectory station measurements.
   * Note that this is NOT a server query parameter. */
  DTimTrajStart?: string;
  /** Is trajectory a final or intermediate/preliminary?
   * Values are "true" (or "1") and "false" (or "0"). */
  FinalTraj?: boolean;
  /** Magnetic declination (convergence) used to correct a Magnetic North referenced azimuth to a True North azimuth.  Magnetic declination angles are measured positive clockwise from True North to Magnetic North (or negative in the anti-clockwise direction). To convert a Magnetic azimuth to a True North azimuth, the magnetic declination should be added. Starting value if stations have individual values. */
  GridConUsed?: eml.PlaneAngleMeasure;
  /** Describes the growing status of the trajectory, whether active, inactive or closed */
  GrowingStatus: ChannelStatus;
  /** Magnetic declination used to correct a Magnetic North referenced azimuth
   * to a True North azimuth.  Magnetic declination angles are measured positive clockwise
   * from True North to Magnetic North (or negative in the anti-clockwise direction).
   * To convert a Magnetic azimuth to a True North azimuth, the magnetic declination should be added.
   * Starting value if stations have individual values. */
  MagDeclUsed?: eml.PlaneAngleMeasure;
  /** Minimum measured depth of this object.
   * This is an API "structural-range" query parameter for growing objects.
   * See the relevant API specification for the query behavior related to this element. */
  MdMn?: MeasuredDepthCoord;
  /** Maximum measured depth of this object.
   * This is an API "structural-range" query parameter for growing objects.
   * See the relevant API specification for the query behavior related to this element. */
  MdMx?: MeasuredDepthCoord;
  /** Is trajectory a result of a memory dump from a tool?
   * Values are "true" (or "1") and "false" (or "0"). */
  Memory?: boolean;
  ParentTrajectory?: eml.DataObjectReference;
  /** Name of contractor who provided the service. */
  ServiceCompany?: string;
  TrajectoryStation?: TrajectoryStation[];
  Wellbore: eml.DataObjectReference;
}
export interface Trajectory extends _Trajectory {
  constructor: { new (): Trajectory };
}
export const Trajectory: { new (): Trajectory };

/** WITSML - Trajectory Station Component Schema */
interface _TrajectoryStation extends BaseType {
  /** A unique identifier for an instance of a trajectory station. */
  uid: string;
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
  /** North-south offset, positive to the North.
   * This is relative to wellLocation with a North axis orientation of aziRef.
   * If a displacement with respect to a different point is desired then
   * define a localCRS and specify local coordinates in location. */
  DispNs?: eml.LengthMeasure;
  /** Dogleg severity. */
  Dls?: eml.AnglePerLengthMeasure;
  /** Date and time the station was measured or created. */
  DTimStn?: string;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Gravitational model used. */
  GeoModelUsed?: string;
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
  IscwsaToolErrorModel?: eml.DataObjectReference;
  Location?: AbstractWellLocation[];
  /** Magnetic dip angle theoretical/reference value. */
  MagDipAngleReference?: eml.PlaneAngleMeasure;
  /** Was a drillstring magnetism correction applied to survey computation?
   * Values are "true" (or "1") and "false" (or "0"). */
  MagDrlstrCorUsed?: boolean;
  /** Geomagnetic model used. */
  MagModelUsed?: string;
  /** Current valid interval for the geomagnetic model used. */
  MagModelValid?: string;
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
  /** Measured depth of measurement from the drill datum.
   * This is an API "node-index" query parameter for growing objects.
   * See the relevant API specification for the query behavior related to this element. */
  Md: MeasuredDepthCoord;
  /** Delta measured depth from previous station. */
  MdDelta?: eml.LengthMeasure;
  /** Was a correction applied to the survey due to a
   * Multi-Station Analysis process?
   * Values are "true" (or "1") and "false" (or "0"). */
  MSACorUsed?: boolean;
  /** Toolface angle (magnetic). */
  Mtf?: eml.PlaneAngleMeasure;
  /** Build Rate, radius of curvature computation. */
  RateBuild?: eml.AnglePerLengthMeasure;
  /** Turn rate, radius of curvature computation. */
  RateTurn?: eml.AnglePerLengthMeasure;
  RawData?: StnTrajRawData;
  /** Was a bottom hole assembly sag correction applied to the survey computation?
   * Values are "true" (or "1") and "false" (or "0"). */
  SagCorUsed?: boolean;
  SourceStation?: RefWellboreTrajectoryStation;
  /** Status of the station. */
  StatusTrajStation?: TrajStationStatus;
  /** A pointer to the intended target of this station. */
  Target?: string;
  /** Vertical depth of the measurements. */
  Tvd?: WellVerticalDepthCoord;
  /** Delta true vertical depth from previous station. */
  TvdDelta?: eml.LengthMeasure;
  /** The type of tool used for the measurements. */
  TypeSurveyTool?: TypeSurveyTool;
  /** Type of survey station. */
  TypeTrajStation: TrajStationType;
  Valid?: StnTrajValid;
  /** Distance along vertical section azimuth plane. */
  VertSect?: eml.LengthMeasure;
}
export interface TrajectoryStation extends _TrajectoryStation {
  constructor: { new (): TrajectoryStation };
}
export const TrajectoryStation: { new (): TrajectoryStation };

/** Specifies the status of a trajectory station. */
export type TrajStationStatus = "open" | "rejected" | "position";
interface _TrajStationStatus extends eml._TypeEnum {
  content: TrajStationStatus;
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
  content: TrajStationType;
}

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
  content: TrajStnCalcAlgorithm;
}

/** Container element for tubing connection types  or collection of tubing connection types. */
interface _TubingConnectionType extends _AbstractConnectionType {
  /** Tubing connection type. */
  TubingConnectionType: TubingConnectionTypes;
}
export interface TubingConnectionType extends _TubingConnectionType {
  constructor: { new (): TubingConnectionType };
}
export const TubingConnectionType: { new (): TubingConnectionType };

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
  content: TubingConnectionTypes;
}

/** Used to capture information about the configuration of a drill string. For information about a use of this configuration, See the BhaRun object . This object is uniquely identified within the context of one wellbore object. */
interface _Tubular extends eml._AbstractObject {
  /** Maximum hole size generated by the assembly. */
  DiaHoleAssy?: eml.LengthMeasure;
  /** Is nuclear tool present?  Values are "true" (or "1") and "false" (or "0"). */
  SourceNuclear?: boolean;
  TubularComponent?: TubularComponent[];
  /** Type of tubular assembly. */
  TypeTubularAssy: TubularAssembly;
  /** Is float valve present?  Values are "true" (or "1") and "false" (or "0"). */
  ValveFloat?: boolean;
  Wellbore: eml.DataObjectReference;
}
export interface Tubular extends _Tubular {
  constructor: { new (): Tubular };
}
export const Tubular: { new (): Tubular };

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
  content: TubularAssembly;
}

/** Tubular Component Schema. Captures the order of the components in the XML instance,which is significant. The components are listed in the order in which they enter the hole. That is, the first component is the bit. */
interface _TubularComponent extends BaseType {
  /** Unique identifier for this instance of TubularComponent */
  uid: string;
  /** Total area of nozzles. */
  AreaNozzleFlow?: eml.AreaMeasure;
  /** Axial stiffness of tubular. */
  AxialStiffness?: eml.ForcePerLengthMeasure;
  Bend?: Bend[];
  /** Bending stiffness of tubular. */
  BendStiffness?: eml.ForcePerLengthMeasure;
  BitRecord?: BitRecord;
  /** Service class. */
  ClassService?: string;
  /** Box/Pin configuration. */
  ConfigCon?: BoxPinConfig;
  Connection?: Connection[];
  /** Description of item and details. */
  Description?: string;
  /** Closed end displacement. */
  Disp?: eml.VolumeMeasure;
  /** Maximum dogleg severity. */
  DoglegMx?: eml.AnglePerLengthMeasure;
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Material grade for the tubular section. */
  Grade?: string;
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
  /** Component name from manufacturer. */
  Model?: string;
  Motor?: Motor;
  MwdTool?: MwdTool;
  /** An identification tag for the component tool. A serial number is a type of identification tag; however, some tags contain many pieces of information. This element only identifies the tag; it does not describe the contents. */
  NameTag?: NameTag[];
  Nozzle?: Nozzle[];
  /** @integer Number of joints per stand of tubulars. */
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
  /** @integer The sequence within which the components entered the hole.
   * That is, a sequence number of 1 entered first, 2 entered next, etc. */
  Sequence: number;
  Stabilizer?: Stabilizer[];
  /** Fatigue endurance limit. */
  StressFatigue?: eml.PressureMeasure;
  /** Yield stress of steel - worn stress. */
  TensYield?: eml.PressureMeasure;
  /** Wall thickness. */
  ThickWall?: eml.LengthMeasure;
  /** Torsional stiffness of tubular. */
  TorsionalStiffness?: eml.ForcePerLengthMeasure;
  /** Torque at which yield occurs. */
  TqYield?: eml.MomentOfForceMeasure;
  /** Type of material. */
  TypeMaterial?: MaterialType;
  /** Connection whose type is tubular */
  TypeTubularComponent: TubularComponentType;
  /** Name of vendor. */
  Vendor?: string;
  /** Wall thickness wear (commonly in percent). */
  WearWall?: eml.LengthPerLengthMeasure;
  /** Weight per unit length. */
  WtPerLen?: eml.MassPerLengthMeasure;
}
export interface TubularComponent extends _TubularComponent {
  constructor: { new (): TubularComponent };
}
export const TubularComponent: { new (): TubularComponent };

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
  content: TubularComponentType;
}

/** Describes what survey measurement or value the error term applies to. */
interface _Tvd extends _AbstractIscwsaErrorCoefficient {
  /** The true vertical depth covered by the tool error term set. */
  Tvd: string;
}
export interface Tvd extends _Tvd {
  constructor: { new (): Tvd };
}
export const Tvd: { new (): Tvd };

/** Specifies values for the type of directional survey tool; a very generic classification. */
export type TypeSurveyTool =
  | "gyroscopic inertial"
  | "gyroscopic MWD"
  | "gyroscopic north seeking"
  | "magnetic multiple-shot"
  | "magnetic MWD"
  | "magnetic single-shot";
interface _TypeSurveyTool extends eml._TypeEnum {
  content: TypeSurveyTool;
}

/** Information on waiting event. */
interface _WaitingOnExtension extends _AbstractEventExtension {
  /** Business organization waiting on */
  BusinessOrgWaitingOn?: string;
  /** Code for charge type */
  ChargeTypeCode?: string;
  ExtensionAny?: eml.CustomData;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Flag indicating whether producer is charged or not */
  IsNoChargeToProducer?: boolean;
  /** Sub category */
  SubCategory?: string;
}
export interface WaitingOnExtension extends _WaitingOnExtension {
  constructor: { new (): WaitingOnExtension };
}
export const WaitingOnExtension: { new (): WaitingOnExtension };

/** Operations Weather Component Schema. */
interface _Weather extends BaseType {
  /** Unique identifier for this instance of Weather */
  uid: string;
  /** Name of company that supplied the weather data. */
  Agency?: string;
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
  /** @integer The Beaufort wind force scale is a system used to estimate and report wind speeds when no measuring apparatus is available. It was invented in the early 19th century by Admiral Sir Francis Beaufort of the British Navy as a way to interpret winds from conditions. Values range from 0 (calm) to 12 (hurricane force). */
  BeaufortScaleNumber?: number;
  /** Height of cloud cover. */
  CeilingCloud?: eml.LengthMeasure;
  /** Comments and remarks. */
  Comments?: string;
  /** Description of cloud cover. */
  CoverCloud?: string;
  /** The speed of the ocean current. */
  CurrentSea?: eml.LengthPerTimeMeasure;
  /** Date and time the information is related to. */
  DTim: string;
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
  TypePrecip?: string;
  /** Wind speed. */
  VelWind?: eml.LengthPerTimeMeasure;
  /** Horizontal visibility. */
  Visibility?: eml.LengthMeasure;
}
export interface Weather extends _Weather {
  constructor: { new (): Weather };
}
export const Weather: { new (): Weather };

/** Used to capture the general information about a well. Sometimes  called a "well header". Contains all information that is the same for all wellbores (sidetracks). */
interface _Well extends eml._AbstractObject {
  /** Block name in which the  well is located. */
  Block?: string;
  /** Country in which the well is located. */
  Country?: string;
  /** County in which the well is located. */
  County?: string;
  /** POSC well direction. The direction of the flow of the fluids in a well facility (generally, injected or produced, or some combination). */
  DirectionWell?: WellDirection;
  /** Geo-political district name. */
  District?: string;
  /** Date and time the license  was issued. */
  DTimLicense?: string;
  /** Date and time at which the well was plugged and abandoned. */
  DTimPa?: string;
  /** Date and time at which the well was spudded. */
  DTimSpud?: string;
  /** Name of the field in which the well is located. */
  Field?: string;
  /** POSC well fluid. The type of fluid being produced from or injected
   * into a well facility. */
  FluidWell?: WellFluid;
  /** The latitude (in coordinate1) and longitude (in coordinate2) of the well location in the WGS84 coordinate system (equivalent to EPSG:4326). Units are in decimal degrees. Coordinate 1 and 2 refer to the ProjectedWellLocation. */
  GeographicLocationWGS84?: GeodeticWellLocation;
  GroundElevation?: WellElevationCoord;
  /** Legal name of the well. */
  NameLegal?: string;
  /** American Petroleum Institute well number. */
  NumAPI?: string;
  /** Government assigned well number. */
  NumGovt?: string;
  /** License number of the well. */
  NumLicense?: string;
  /** Operator company name. */
  Operator?: string;
  /** Division of the operator company. */
  OperatorDiv?: string;
  /** Original operator of the well. This may be different than the current operator. */
  OriginalOperator?: string;
  /** Interest for operator. Commonly in percent. */
  PcInterest?: eml.DimensionlessMeasure;
  /** POSC well purpose. */
  PurposeWell?: WellPurpose;
  ReferencePoint?: ReferencePoint[];
  /** Geo-political region in which the well is located. */
  Region?: string;
  /** State or province in which the well is located. */
  State?: string;
  /** POSC well status. */
  StatusWell?: eml.WellStatus;
  /** The time zone in which the well is located. It is the deviation in hours and minutes from UTC. This should be the normal time zone at the well and not a seasonally-adjusted value, such as daylight savings time. */
  TimeZone?: string;
  /** Depth of water (not land rigs). */
  WaterDepth?: eml.LengthMeasure;
  WellDatum?: WellDatum[];
  WellheadElevation?: WellElevationCoord;
  WellLocation?: AbstractWellLocation[];
  WellPublicLandSurveySystemLocation?: PublicLandSurveySystem;
}
export interface Well extends _Well {
  constructor: { new (): Well };
}
export const Well: { new (): Well };

/** Used to capture the general information about a wellbore. This information is sometimes called a "wellbore header". A wellbore represents the path from surface to a unique bottomhole location. The wellbore object is uniquely identified within the context of one well object. */
interface _Wellbore extends eml._AbstractObject {
  /** True ("true" of "1") indicates that the wellbore has
   * acheieved total depth. That is, drilling has completed. False ("false" or "0") indicates otherwise.
   * Not given indicates that it is not known whether total depth has been reached. */
  AchievedTD?: boolean;
  /** Target days for drilling wellbore. */
  DayTarget?: eml.TimeMeasure;
  /** Date and time of wellbore kickoff. */
  DTimKickoff?: string;
  /** True (="1" or "true") indicates that the wellbore is active.
   * False (="0" or "false") indicates otherwise. It is the servers responsibility to
   * set this value based on its available internal data (e.g., what objects are changing). */
  IsActive?: boolean;
  /** The measured depth of the borehole.
   * If status is plugged, indicates the maximum depth reached before plugging.
   * It is recommended that this value be updated about every 10 minutes by an assigned
   * raw data provider at a site. */
  Md?: MeasuredDepthCoord;
  /** The measured depth of the bit.
   * If isActive=false then this value is not relevant.
   * It is recommended that this value be updated about every 10 minutes by an assigned
   * raw data provider at a site. */
  MdBit?: MeasuredDepthCoord;
  /** Kickoff measured depth of the wellbore. */
  MdKickoff?: MeasuredDepthCoord;
  /** Planned measured depth for the wellbore total depth. */
  MdPlanned?: MeasuredDepthCoord;
  /** Planned measured for the wellbore total depth - with respect to seabed. */
  MdSubSeaPlanned?: MeasuredDepthCoord;
  /** Operator borehole number. */
  Number?: string;
  /** Government assigned number. */
  NumGovt?: string;
  ParentWellbore?: eml.DataObjectReference;
  /** POSC wellbore purpose. */
  PurposeWellbore?: WellPurpose;
  /** POSC wellbore trajectory shape. */
  Shape?: WellboreShape;
  /** POSC wellbore status. */
  StatusWellbore?: eml.WellStatus;
  /** API suffix. */
  SuffixAPI?: string;
  /** The  true vertical depth of the borehole.
   * If status is plugged, indicates the maximum depth reached before plugging.
   * It is recommended that this value be updated about every 10 minutes by an assigned
   * raw data provider at a site. */
  Tvd?: WellVerticalDepthCoord;
  /** The true vertical depth of the bit.
   * If isActive=false then this value is not relevant.
   * It is recommended that this value be updated about every 10 minutes by an assigned
   * raw data provider at a site. */
  TvdBit?: WellVerticalDepthCoord;
  /** Kickoff true vertical depth of the wellbore. */
  TvdKickoff?: WellVerticalDepthCoord;
  /** Planned true vertical depth for the wellbore total depth. */
  TvdPlanned?: WellVerticalDepthCoord;
  /** Planned true vertical depth for the wellbore total depth - with respect to seabed. */
  TvdSubSeaPlanned?: WellVerticalDepthCoord;
  /** Type of wellbore. */
  TypeWellbore?: WellboreType;
  Well: eml.DataObjectReference;
}
export interface Wellbore extends _Wellbore {
  constructor: { new (): Wellbore };
}
export const Wellbore: { new (): Wellbore };

/** The transferrable class of the WellboreCompletion object. Each individual wellbore completion data object represents a completion (i.e., open to flow) interval along a wellbore. Meaning “this section of wellbore is open to flow”. */
interface _WellboreCompletion extends eml._AbstractObject {
  /** Overall measured depth interval for this wellbore completion. */
  CompletionMdInterval?: eml.MdInterval;
  /** Overall true vertical depth interval for this wellbore completion. */
  CompletionTvdInterval?: eml.TvdInterval;
  ContactIntervalSet?: ContactIntervalSet;
  /** Status (active, planned, suspended, testing, etc.) of the wellbore completion */
  CurrentStatus?: CompletionStatus;
  /** The WellboreCompletion event information. */
  EventHistory?: EventInfo[];
  /** Human-recognizable context for the well completion that contains the completion. */
  NameWellCompletion: string;
  ReferenceWellbore: eml.DataObjectReference;
  /** Date for when the status was established. */
  StatusDate?: string;
  StatusHistory?: CompletionStatusHistory[];
  /** API suffix. */
  SuffixAPI?: string;
  /** Preferred alias name. */
  WellboreCompletionAlias?: string;
  /** Completion date. */
  WellboreCompletionDate?: string;
  /** CompletionNo, etc. API14. */
  WellboreCompletionNo?: string;
  WellCompletion: eml.DataObjectReference;
}
export interface WellboreCompletion extends _WellboreCompletion {
  constructor: { new (): WellboreCompletion };
}
export const WellboreCompletion: { new (): WellboreCompletion };

/** Specified the location where cement job fluid can be found. */
export type WellboreFluidLocation =
  | "annulus"
  | "deadend"
  | "in pipe"
  | "rat hole";
interface _WellboreFluidLocation extends eml._TypeEnum {
  content: WellboreFluidLocation;
}

/** The transferrable class of the WellboreGeology object. */
interface _WellboreGeology extends eml._AbstractObject {
  CuttingsIntervalSet?: CuttingsGeology;
  InterpretedGeologyIntervalSet?: InterpretedGeology;
  /** [maintained by the server] The interval that contains the minimum and maximum measured depths for all wellbore geology types under this wellbore geology entry. */
  MdInterval: eml.MdInterval;
  ShowIntervalSet?: ShowEvaluation;
  Wellbore: eml.DataObjectReference;
}
export interface WellboreGeology extends _WellboreGeology {
  constructor: { new (): WellboreGeology };
}
export const WellboreGeology: { new (): WellboreGeology };

/** Used to capture information about the configuration of the permanently installed components in a wellbore. This object is uniquely identified within the context of one wellbore object. */
interface _WellboreGeometry extends eml._AbstractObject {
  BhaRun?: eml.DataObjectReference[];
  /** Water depth. */
  DepthWaterMean?: eml.LengthMeasure;
  /** Air gap. */
  GapAir?: eml.LengthMeasure;
  /** Describes the growing status of the wellbore geometry, whether active, inactive or closed. */
  GrowingStatus: ChannelStatus;
  /** Measured depth at bottom, at the time this report was made. */
  MdBase?: MeasuredDepthCoord;
  Wellbore: eml.DataObjectReference;
  WellboreGeometrySection?: WellboreGeometrySection[];
}
export interface WellboreGeometry extends _WellboreGeometry {
  constructor: { new (): WellboreGeometry };
}
export const WellboreGeometry: { new (): WellboreGeometry };

/** Wellbore Geometry Component Schema. Defines the "fixed" components in a wellbore. It does not define the "transient" drilling strings or the "hanging" production components. */
interface _WellboreGeometrySection extends BaseType {
  /** Unique identifier of this WbGeometrySection within the WbGeometry object. */
  uid: string;
  BhaRun?: eml.DataObjectReference[];
  /** An ISO 19115 EIP-derived set of metadata attached to ensure the traceability of the WellGeometrySection. */
  Citation?: eml.Citation;
  /** Curved conductor? Values are "true" (or "1") and "false" (or "0"). */
  CurveConductor?: boolean;
  /** The drift diameter is the inside diameter (ID) that the pipe manufacturer guarantees per specifications. Note that the nominal inside diameter is not the same as the drift diameter, but is always slightly larger. The drift diameter is used by the well planner to determine what size tools or casing strings can later be run through the casing, whereas the nominal inside diameter is used for fluid volume calculations, such as mud circulating times and cement slurry placement calculations.
   * Source: www.glossary.oilfield.slb.com */
  DiaDrift?: eml.LengthMeasure;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  /** Friction factor. */
  FactFric?: number;
  /** Material grade for the tubular section. */
  Grade?: string;
  /** Inner diameter. */
  IdSection?: eml.LengthMeasure;
  /** Outer diameter. Only for casings and risers. */
  OdSection?: eml.LengthMeasure;
  /** Measured depth interval for this wellbore geometry section. */
  SectionMdInterval?: eml.MdInterval;
  /** True vertical depth interval for this wellbore geometry section. */
  SectionTvdInterval?: eml.TvdInterval;
  /** Type of fixed component. */
  TypeHoleCasing?: HoleCasingType;
  /** Weight per unit length for casing sections. */
  WtPerLen?: eml.MassPerLengthMeasure;
}
export interface WellboreGeometrySection extends _WellboreGeometrySection {
  constructor: { new (): WellboreGeometrySection };
}
export const WellboreGeometrySection: { new (): WellboreGeometrySection };

/** Used to capture information about a geologic formation that was encountered in a wellbore. This object is uniquely identified within the context of one wellbore object. */
interface _WellboreMarker extends eml._AbstractObject {
  /** The name of a geochronology for this marker, with the "kind" attribute specifying the geochronological time span. */
  ChronostratigraphicTop?: GeochronologicalUnit;
  /** Angle of dip with respect to horizontal. */
  DipAngle?: eml.PlaneAngleMeasure;
  /** Interpreted downdip direction. */
  DipDirection?: eml.PlaneAngleMeasure;
  /** Specifies the unit of lithostratigraphy. */
  LithostratigraphicTop?: LithostratigraphicUnit;
  /** Logged measured depth at the top of marker. */
  Md: MeasuredDepthCoord;
  Trajectory?: eml.DataObjectReference;
  /** Logged true vertical depth at top of marker. */
  Tvd?: WellVerticalDepthCoord;
  Wellbore?: eml.DataObjectReference;
}
export interface WellboreMarker extends _WellboreMarker {
  constructor: { new (): WellboreMarker };
}
export const WellboreMarker: { new (): WellboreMarker };

/** A collection of wellbore markers. */
interface _WellboreMarkerSet extends eml._AbstractObject {
  FormationMarker?: WellboreMarker[];
  /** Measured depth interval that contains the shallowest and deepest formation markers. This is computed by the server and is read only. */
  MarkerSetInterval: eml.MdInterval;
  Wellbore?: eml.DataObjectReference;
}
export interface WellboreMarkerSet extends _WellboreMarkerSet {
  constructor: { new (): WellboreMarkerSet };
}
export const WellboreMarkerSet: { new (): WellboreMarkerSet };

/** Specifies values to represent the classification of a wellbore based on its shape. The source of the values and the descriptions is the POSC V2.2 "facility class" standard instance values in classification system "POSC wellbore trajectory shape". */
export type WellboreShape =
  | "build and hold"
  | "deviated"
  | "double kickoff"
  | "horizontal"
  | "S-shaped"
  | "vertical";
interface _WellboreShape extends eml._TypeEnum {
  content: WellboreShape;
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
  content: WellboreType;
}

/** Information regarding details of Jobs & Events */
interface _WellCMLedger extends eml._AbstractObject {
  /** Activity code */
  ActivityCode?: DrillActivityCode;
  /** Service company or business */
  BusinessAssociate?: string;
  /** Comment on this ledger */
  Comment?: string;
  /** Contact name or person to get in touch with. Might not necessarily be the person responsible. */
  Contact?: string;
  Cost?: DayCost[];
  /** Description of this ledger */
  Description?: string;
  DownholeComponentReference?: DownholeComponentReference;
  /** Date and time that activities were completed. */
  DTimEnd?: string;
  /** Date and time that activities started. */
  DTimStart?: string;
  /** The activity duration (commonly in hours). */
  Duration?: eml.TimeMeasure;
  EventExtension?: AbstractEventExtension[];
  /** @integer Order number of event. */
  EventOrder?: number;
  EventType?: EventType;
  /** True if planned. */
  IsPlan?: boolean;
  /** Measured depth interval for this activity. */
  MdInterval?: eml.MdInterval;
  /** True if event is not productive. */
  Nonproductive?: boolean;
  /** Parent event reference id. */
  ParentEventID?: string;
  Participant?: Participant;
  /** Phase (large activity classification) e.g. Drill Surface Hole. */
  Phase?: string;
  /** True of event is for preventive maintenance */
  PreventiveMaintenance?: boolean;
  /** Name or information about person responsible who is implementing the service or job. */
  ResponsiblePerson?: string;
  /** Rig reference id. */
  RigID?: string[];
  /** True if event implies is in-trouble */
  Trouble?: boolean;
  /** Comment on type of this event, either referring to a job type or an  activity type e.g. a safety meeting. */
  Type?: EventType;
  /** True if there is no planning infomation for this activity. */
  Unplanned?: boolean;
  Wellbore: eml.DataObjectReference;
  /** Extension event for work order id. */
  WorkOrderID?: string;
}
export interface WellCMLedger extends _WellCMLedger {
  constructor: { new (): WellCMLedger };
}
export const WellCMLedger: { new (): WellCMLedger };

/** Information regarding  a wellhead stream with one or more wellbore completions (completed zones) in the well. */
interface _WellCompletion extends eml._AbstractObject {
  /** Status (active, planned, suspended, testing, etc.) of the well completion. */
  CurrentStatus?: CompletionStatus;
  /** Documents exploration and production rights. */
  E_P_RightsID?: string;
  /** Field date. */
  EffectiveDate?: string;
  /** Expiration date. */
  ExpiredDate?: string;
  /** Field code. */
  FieldCode?: string;
  /** Field ID. */
  FieldID?: string;
  /** Field type. */
  FieldType?: string;
  /** Timestamp for when this status was established. */
  StatusDate?: string;
  StatusHistory?: CompletionStatusHistory[];
  Well: eml.DataObjectReference;
}
export interface WellCompletion extends _WellCompletion {
  constructor: { new (): WellCompletion };
}
export const WellCompletion: { new (): WellCompletion };

/** Specifies the type of a well control incident. */
export type WellControlIncidentType =
  | "shallow gas kick"
  | "water kick"
  | "oil kick"
  | "gas kick";
interface _WellControlIncidentType extends eml._TypeEnum {
  content: WellControlIncidentType;
}

/** Defines the vertical datums associated with elevation, vertical depth
 * and measured depth coordinates within the context of a well. */
interface _WellDatum extends BaseType {
  /** A unique identifier for an instance of a well datum. */
  uid: string;
  /** The code value that represents the type of reference datum. This may represent a point on a device (e.g., kelly bushing) or it may represent a vertical reference datum (e.g., mean sea level). */
  Code?: eml.WellboreDatumReference;
  /** A contextual description of the well reference datum. */
  Comment?: string;
  /** Points to one of the optional for a geodetic vertical CRS, Allows the datum to be positioned in real-world space.l */
  Crs: eml.AbstractVerticalCrs;
  Elevation?: WellElevationCoord;
  /** Extensions to the schema based on a name-value construct. */
  ExtensionNameValue?: eml.ExtensionNameValue[];
  HorizontalLocation?: AbstractWellLocation;
  /** Because various activities may use different points as measurement datums, it is useful to characterize the point based on its usage. A well reference datum may have more than one such characterization. For example, it may be the datum used by the driller and logger for measuring their depths. Example usage values would be 'permanent','driller', 'logger' 'WRP' (well reference point) and 'SRP' (site reference point). */
  Kind?: string[];
  /** The measured depth coordinate of this reference datum as measured from another datum. The measured depth datum should either be the same as the elevation datum or it should be relatable to the elevation datum through other datums. Positive moving toward the bottomhole from the measured depth datum. This should be given when a local reference is "downhole", such as a kickoff point or ocean bottom template, and the borehole may not be vertical. If a depth is given, then an elevation should also be given. */
  MeasuredDepth?: MeasuredDepthCoord;
  /** The human-understandable contextual name of the reference datum. */
  Name: string;
  Rig?: RefWellboreRig;
  Wellbore?: RefWellbore;
}
export interface WellDatum extends _WellDatum {
  constructor: { new (): WellDatum };
}
export const WellDatum: { new (): WellDatum };

/** Specifies values for the direction of flow of the fluids in a well facility (generally, injected or produced, or some combination). */
export type WellDirection =
  | "huff-n-puff"
  | "injector"
  | "producer"
  | "uncertain";
interface _WellDirection extends eml._TypeEnum {
  content: WellDirection;
}

/** A vertical (gravity-based) elevation coordinate within the context of a well. Positive moving upward from the reference datum.  All coordinates with the same datum (and same UOM) can be considered to be in the same coordinate reference system (CRS) and are thus directly comparable. */
interface _WellElevationCoord extends eml._AbstractMeasure {
  /** Defines the vertical datums associated with elevation, vertical depth, and measured depth coordinates. */
  datum: string;
  /** The unit of measure by which the datum is expressed. */
  uom: eml.LengthUom;
}
export interface WellElevationCoord extends _WellElevationCoord {
  constructor: { new (): WellElevationCoord };
}
export const WellElevationCoord: { new (): WellElevationCoord };

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
  content: WellFluid;
}

/** Specifies the type of procedure used to stop (kill) the flow of formation fluids into a well. A well-killing procedure may be planned or unplanned. The particular situation determines what type of procedure is used. */
export type WellKillingProcedureType =
  | "drillers method"
  | "wait and weight"
  | "bullheading"
  | "lubricate and bleed"
  | "forward circulation"
  | "reverse circulation";
interface _WellKillingProcedureType extends eml._TypeEnum {
  content: WellKillingProcedureType;
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
  content: WellPurpose;
}

/** Specifies the type of well test conducted. */
export type WellTestType = "drill stem test" | "production test";
interface _WellTestType extends eml._TypeEnum {
  content: WellTestType;
}

/** A vertical (gravity-based) depth coordinate within the context of a well. Positive moving downward from the reference datum. All coordinates with the same datum (and same UOM) can be considered to be in the same coordinate reference system (CRS) and are thus directly comparable. */
interface _WellVerticalDepthCoord extends eml._AbstractMeasure {
  /** Defines the vertical datums associated with elevation, vertical depth and measured depth coordinates */
  datum: string;
  /** Unit of measure used by this vertical depth coordinate */
  uom: eml.LengthUom;
}
export interface WellVerticalDepthCoord extends _WellVerticalDepthCoord {
  constructor: { new (): WellVerticalDepthCoord };
}
export const WellVerticalDepthCoord: { new (): WellVerticalDepthCoord };

/** Measurement of average weight on bit and channel from which the data was calculated. */
interface _WobStatistics extends BaseType {
  /** Average weight on bit through the interval. */
  Average?: eml.ForceMeasure;
  /** Log channel from which the WOB statistics were calculated. */
  Channel?: eml.DataObjectReference;
}
export interface WobStatistics extends _WobStatistics {
  constructor: { new (): WobStatistics };
}
export const WobStatistics: { new (): WobStatistics };

export interface document extends BaseType {
  Attachment: Attachment;
  BhaRun: BhaRun;
  CementJob: CementJob;
  CementJobEvaluation: CementJobEvaluation;
  Channel: Channel;
  ChannelSet: ChannelSet;
  CuttingsGeology: CuttingsGeology;
  CuttingsGeologyInterval: CuttingsGeologyInterval;
  DepthRegImage: DepthRegImage;
  DownholeComponent: DownholeComponent;
  DrillReport: DrillReport;
  FluidsReport: FluidsReport;
  InterpretedGeology: InterpretedGeology;
  InterpretedGeologyInterval: InterpretedGeologyInterval;
  Log: Log;
  MudLogReport: MudLogReport;
  OpsReport: OpsReport;
  /** Wrapper for sending individual MudLogReportIntervals using ETP. */
  part_MudLogReportInterval: MudlogReportInterval;
  /** Wrapper for sending individual stations using ETP. */
  part_TrajectoryStation: TrajectoryStation;
  /** Wrapper for sending individual sections using ETP. */
  part_WellboreGeometrySection: WellboreGeometrySection;
  Rig: Rig;
  RigUtilization: RigUtilization;
  Risk: Risk;
  ShowEvaluation: ShowEvaluation;
  ShowEvaluationInterval: ShowEvaluationInterval;
  StimJob: StimJob;
  StimJobStage: StimJobStage;
  StimPerforationCluster: StimPerforationCluster;
  SurveyProgram: SurveyProgram;
  ToolErrorModel: ToolErrorModel;
  ToolErrorTermSet: ToolErrorTermSet;
  Trajectory: Trajectory;
  Tubular: Tubular;
  Well: Well;
  Wellbore: Wellbore;
  WellboreCompletion: WellboreCompletion;
  WellboreGeology: WellboreGeology;
  WellboreGeometry: WellboreGeometry;
  WellboreMarker: WellboreMarker;
  WellboreMarkerSet: WellboreMarkerSet;
  WellCMLedger: WellCMLedger;
  WellCompletion: WellCompletion;
}
export const document: document;
