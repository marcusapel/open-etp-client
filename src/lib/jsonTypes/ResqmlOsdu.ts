import { ResqmlOSDUMap } from "./OsduContext";

import { ActivityManifest } from "./Activity";
import { ActivityTemplateManifest } from "./ActivityTemplate";
import { ColumnBasedTableManifest } from "./ColumnBasedTable";
import { EarthModelInterpretationManifest } from "./EarthModelInterpretation";
import { FaultInterpretationManifest } from "./FaultInterpretation";
import { GenericPropertyManifest } from "./GenericProperty";
import { GenericRepresentationManifest } from "./GenericRepresentation";
import { GeobodyBoundaryInterpretationManifest } from "./GeobodyBoundaryInterpretation";
import { GeobodyInterpretationManifest } from "./GeobodyInterpretation";
import { GridConnectionSetRepresentationManifest } from "./GridConnectionSetRepresentation";
import {
  Grid2dToOsduKind,
  Grid2dRepresentationManifest
} from "./SeismicBinGrid2Representation";
import { HorizonInterpretationManifest } from "./HorizonInterpretation";
import { IjkGridRepresentationManifest } from "./IjkGridRepresentation";
import { LocalBoundaryFeatureManifest } from "./LocalBoundaryFeature";
import { LocalModelCompoundCrsManifest } from "./LocalModelCompoundCrs";
import { LocalModelFeatureManifest } from "./LocalModelFeature";
import { LocalRockVolumeFeatureManifest } from "./LocalRockVolumeFeature";
import { PersistedCollectionPropertySetManifest } from "./PersistedCollectionPropertySet";
import { PersistedCollectionRepresentationSetManifest } from "./PersistedCollectionRepresentationSet";
import { PropertyTypeManifest } from "./PropertyType";
import { StratigraphicColumnManifest } from "./StratigraphicColumn";
import { StratigraphicColumnRankInterpretationManifest } from "./StratigraphicColumnRankInterpretation";
import { StratigraphicUnitInterpretationManifest } from "./StratigraphicUnitInterpretation";
import { SubRepresentationManifest } from "./SubRepresentation";
import { TimeSeriesManifest } from "./TimeSeries";
import { UnstructuredGridRepresentationManifest } from "./UnstructuredGridRepresentation";

export { EtpDataspaceManifest } from "./ETPDataspace";
export { WorkProductManifest } from "./WorkProduct";

const ResqmlOSDU = ResqmlOSDUMap.getInstance();

ResqmlOSDU.add(
  "resqml20.obj_Activity",
  () => "osdu:wks:work-product-component--Activity:1.2.0",
  ActivityManifest
);
ResqmlOSDU.add(
  "resqml20.obj_ActivityTemplate",
  () => "osdu:wks:master-data--ActivityTemplate:1.0.0",
  ActivityTemplateManifest
);
ResqmlOSDU.add(
  "resqml20.obj_CategoricalProperty",
  () => "osdu:wks:work-product-component--GenericProperty:1.1.0",
  GenericPropertyManifest
);
ResqmlOSDU.add(
  "resqml20.obj_ContinuousProperty",
  () => "osdu:wks:work-product-component--GenericProperty:1.1.0",
  GenericPropertyManifest
);
ResqmlOSDU.add(
  "resqml20.obj_DiscreteProperty",
  () => "osdu:wks:work-product-component--GenericProperty:1.1.0",
  GenericPropertyManifest
);
ResqmlOSDU.add(
  "resqml20.obj_EarthModelInterpretation",
  () => "osdu:wks:work-product-component--EarthModelInterpretation:1.1.0",
  EarthModelInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_FaultInterpretation",
  () => "osdu:wks:work-product-component--FaultInterpretation:1.1.0",
  FaultInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_GeneticBoundaryFeature",
  () => "osdu:wks:work-product-component--LocalBoundaryFeature:1.1.0",
  LocalBoundaryFeatureManifest
);
ResqmlOSDU.add(
  "resqml20.obj_GeobodyBoundaryInterpretation",
  () => "osdu:wks:work-product-component--GeobodyBoundaryInterpretation:1.1.0",
  GeobodyBoundaryInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_GeobodyInterpretation",
  () => "osdu:wks:work-product-component--GeobodyInterpretation:1.1.0",
  GeobodyInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_Grid2dRepresentation",
  Grid2dToOsduKind,
  Grid2dRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_GridConnectionSetRepresentation",
  () =>
    "osdu:wks:work-product-component--GridConnectionSetRepresentation:1.1.0",
  GridConnectionSetRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_HorizonInterpretation",
  () => "osdu:wks:work-product-component--HorizonInterpretation:1.1.0",
  HorizonInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_IjkGridRepresentation",
  () => "osdu:wks:work-product-component--IjkGridRepresentation:1.1.0",
  IjkGridRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_LocalDepth3dCrs",
  () => "osdu:wks:work-product-component--LocalModelCompoundCrs:1.1.0",
  LocalModelCompoundCrsManifest
);
ResqmlOSDU.add(
  "resqml20.obj_LocalTime3dCrs",
  () => "osdu:wks:work-product-component--LocalModelCompoundCrs:1.1.0",
  LocalModelCompoundCrsManifest
);
ResqmlOSDU.add(
  "resqml20.obj_OrganizationFeature",
  () => "osdu:wks:work-product-component--LocalModelFeature:1.1.0",
  LocalModelFeatureManifest
);
ResqmlOSDU.add(
  "resqml20.obj_PolylineRepresentation",
  () => "osdu:wks:work-product-component--GenericRepresentation:1.1.0",
  GenericRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_PolylineSetRepresentation",
  () => "osdu:wks:work-product-component--GenericRepresentation:1.1.0",
  GenericRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_PointSetRepresentation",
  () => "osdu:wks:work-product-component--GenericRepresentation:1.1.0",
  GenericRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_PropertySet",
  () => "osdu:wks:work-product-component--PersistedCollection:1.1.0",
  PersistedCollectionPropertySetManifest
);
ResqmlOSDU.add(
  "resqml20.obj_PropertyKind",
  () => "osdu:wks:work-product-component--PropertyType:1.0.0",
  PropertyTypeManifest
);
ResqmlOSDU.add(
  "resqml20.obj_RepresentationSetRepresentation",
  () => "osdu:wks:work-product-component--PersistedCollection:1.1.0",
  PersistedCollectionRepresentationSetManifest
);
ResqmlOSDU.add(
  "resqml20.obj_StratigraphicColumn",
  () => "osdu:wks:work-product-component--StratigraphicColumn:1.1.0",
  StratigraphicColumnManifest
);
ResqmlOSDU.add(
  "resqml20.obj_StratigraphicColumnRankInterpretation",
  () =>
    "osdu:wks:work-product-component--StratigraphicColumnRankInterpretation:1.1.0",
  StratigraphicColumnRankInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_StratigraphicUnitFeature",
  () => "osdu:wks:work-product-component--LocalRockVolumeFeature:1.1.0",
  LocalRockVolumeFeatureManifest
);
ResqmlOSDU.add(
  "resqml20.obj_StratigraphicUnitInterpretation",
  () =>
    "osdu:wks:work-product-component--StratigraphicUnitInterpretation:1.1.0",
  StratigraphicUnitInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_StringTableLookup",
  () => "osdu:wks:work-product-component--ColumnBasedTable:1.1.0",
  ColumnBasedTableManifest
);
ResqmlOSDU.add(
  "resqml20.obj_SubRepresentation",
  () => "osdu:wks:work-product-component--SubRepresentation:1.1.0",
  SubRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_TectonicBoundaryFeature",
  () => "osdu:wks:work-product-component--LocalBoundaryFeature:1.1.0",
  LocalBoundaryFeatureManifest
);
ResqmlOSDU.add(
  "resqml20.obj_TimeSeries",
  () => "osdu:wks:work-product-component--TimeSeries:1.1.0",
  TimeSeriesManifest
);
ResqmlOSDU.add(
  "resqml20.obj_TriangulatedSetRepresentation",
  () => "osdu:wks:work-product-component--GenericRepresentation:1.1.0",
  GenericRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_UnstructuredGridRepresentation",
  () => "osdu:wks:work-product-component--UnstructuredGridRepresentation:1.1.0",
  UnstructuredGridRepresentationManifest
);

export default ResqmlOSDU;
