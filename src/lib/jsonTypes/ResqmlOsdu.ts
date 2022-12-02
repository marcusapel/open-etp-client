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
import { HorizonInterpretationManifest } from "./HorizonInterpretation";
import { IjkGridRepresentationManifest } from "./IjkGridRepresentation";
import { LocalBoundaryFeatureManifest } from "./LocalBoundaryFeature";
import { LocalModelCompoundCrsManifest } from "./LocalModelCompoundCrs";
import { LocalModelFeatureManifest } from "./LocalModelFeature";
import { LocalRockVolumeFeatureManifest } from "./LocalRockVolumeFeature";
import { PersistedCollectionPropertySetManifest } from "./PersistedCollectionPropertySet";
import { PersistedCollectionRepresentationSetManifest } from "./PersistedCollectionRepresentationSet";
import { StratigraphicColumnManifest } from "./StratigraphicColumn";
import { StratigraphicColumnRankInterpretationManifest } from "./StratigraphicColumnRankInterpretation";
import { StratigraphicUnitInterpretationManifest } from "./StratigraphicUnitInterpretation";
import { SubRepresentationManifest } from "./SubRepresentation";
import { TimeSeriesManifest } from "./TimeSeries";
import { UnstructuredGridRepresentationManifest } from "./UnstructuredGridRepresentation";

export { EtpDataspaceManifest } from "./ETPDataspace";
export { WorkProductManifest } from "./WorkProduct";

const ResqmlOSDU = ResqmlOSDUMap.getInstance();

ResqmlOSDU.add("resqml20.obj_Activity", "Activity", "1.0.0", ActivityManifest);
ResqmlOSDU.add(
  "resqml20.obj_ActivityTemplate",
  "ActivityTemplate",
  "1.0.0",
  ActivityTemplateManifest
);
ResqmlOSDU.add(
  "resqml20.obj_CategoricalProperty",
  "GenericProperty",
  "1.0.0",
  GenericPropertyManifest
);
ResqmlOSDU.add(
  "resqml20.obj_ContinuousProperty",
  "GenericProperty",
  "1.0.0",
  GenericPropertyManifest
);
ResqmlOSDU.add(
  "resqml20.obj_DiscreteProperty",
  "GenericProperty",
  "1.0.0",
  GenericPropertyManifest
);
ResqmlOSDU.add(
  "resqml20.obj_EarthModelInterpretation",
  "EarthModelInterpretation",
  "1.0.0",
  EarthModelInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_FaultInterpretation",
  "FaultInterpretation",
  "1.0.0",
  FaultInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_GeneticBoundaryFeature",
  "LocalBoundaryFeature",
  "1.0.0",
  LocalBoundaryFeatureManifest
);
ResqmlOSDU.add(
  "resqml20.obj_GeobodyBoundaryInterpretation",
  "GeobodyBoundaryInterpretation",
  "1.0.0",
  GeobodyBoundaryInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_GeobodyInterpretation",
  "GeobodyInterpretation",
  "1.0.0",
  GeobodyInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_Grid2dRepresentation",
  "GenericRepresentation",
  "1.0.0",
  GenericRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_GridConnectionSetRepresentation",
  "GridConnectionSetRepresentation",
  "1.0.0",
  GridConnectionSetRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_HorizonInterpretation",
  "HorizonInterpretation",
  "1.0.0",
  HorizonInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_IjkGridRepresentation",
  "IjkGridRepresentation",
  "1.0.0",
  IjkGridRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_LocalDepth3dCrs",
  "LocalModelCompoundCrs",
  "1.0.0",
  LocalModelCompoundCrsManifest
);
ResqmlOSDU.add(
  "resqml20.obj_LocalTime3dCrs",
  "LocalModelCompoundCrs",
  "1.0.0",
  LocalModelCompoundCrsManifest
);
ResqmlOSDU.add(
  "resqml20.obj_OrganizationFeature",
  "LocalModelFeature",
  "1.0.0",
  LocalModelFeatureManifest
);
ResqmlOSDU.add(
  "resqml20.obj_PolylineRepresentation",
  "GenericRepresentation",
  "1.0.0",
  GenericRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_PolylineSetRepresentation",
  "GenericRepresentation",
  "1.0.0",
  GenericRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_PointSetRepresentation",
  "GenericRepresentation",
  "1.0.0",
  GenericRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_PropertySet",
  "PersistedCollection",
  "1.0.0",
  PersistedCollectionPropertySetManifest
);
ResqmlOSDU.add(
  "resqml20.obj_RepresentationSetRepresentation",
  "PersistedCollection",
  "1.0.0",
  PersistedCollectionRepresentationSetManifest
);
ResqmlOSDU.add(
  "resqml20.obj_StratigraphicColumn",
  "StratigraphicColumn",
  "1.0.0",
  StratigraphicColumnManifest
);
ResqmlOSDU.add(
  "resqml20.obj_StratigraphicColumnRankInterpretation",
  "StratigraphicColumnRankInterpretation",
  "1.0.0",
  StratigraphicColumnRankInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_StratigraphicUnitFeature",
  "StratigraphicUnitFeature",
  "1.0.0",
  LocalRockVolumeFeatureManifest
);
ResqmlOSDU.add(
  "resqml20.obj_StratigraphicUnitInterpretation",
  "StratigraphicUnitInterpretation",
  "1.0.0",
  StratigraphicUnitInterpretationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_StringTableLookup",
  "ColumnBasedTable",
  "1.0.0",
  ColumnBasedTableManifest
);
ResqmlOSDU.add(
  "resqml20.obj_SubRepresentation",
  "SubRepresentation",
  "1.0.0",
  SubRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_TectonicBoundaryFeature",
  "LocalBoundaryFeature",
  "1.0.0",
  LocalBoundaryFeatureManifest
);
ResqmlOSDU.add(
  "resqml20.obj_TimeSeries",
  "TimeSeries",
  "1.0.0",
  TimeSeriesManifest
);
ResqmlOSDU.add(
  "resqml20.obj_TriangulatedSetRepresentation",
  "GenericRepresentation",
  "1.0.0",
  GenericRepresentationManifest
);
ResqmlOSDU.add(
  "resqml20.obj_UnstructuredGridRepresentation",
  "UnstructuredGridRepresentation",
  "1.0.0",
  UnstructuredGridRepresentationManifest
);

export default ResqmlOSDU;
