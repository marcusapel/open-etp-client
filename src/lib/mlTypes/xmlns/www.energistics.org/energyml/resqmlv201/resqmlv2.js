/* eslint-disable @typescript-eslint/no-var-requires */
const cxml = require("../../../../../cxml/cxml");
const eml = require("./commonv2");
const Primitive = require("../../../xml-primitives");

cxml.register(
  cxml.context("resqml20"),
  "http://www.energistics.org/energyml/data/resqmlv2",
  exports,
  [
    [Primitive, ["Date", "boolean", "number", "string"], []],
    [
      eml,
      [
        "AbstractCitedDataObject",
        "AbstractProjectedCrs",
        "AbstractVerticalCrs",
        "AxisOrder2d",
        "DataObjectReference",
        "Hdf5Dataset",
        "LengthMeasure",
        "LengthUom",
        "NameString",
        "PlaneAngleMeasure",
        "PlaneAngleUom",
        "TimeUom",
        "TypeEnum",
        "VolumeUom"
      ],
      ["AbstractDataObject"]
    ]
  ],
  [
    "AbstractActivityParameter",
    "AbstractBooleanArray",
    "AbstractColumnLayerGridGeometry",
    "AbstractColumnLayerGridRepresentation",
    "AbstractContactInterpretationPart",
    "AbstractContactRepresentationPart",
    "AbstractDoubleArray",
    "AbstractFeature",
    "AbstractFeatureInterpretation",
    "AbstractGeologicFeature",
    "AbstractGeometry",
    "AbstractGridGeometry",
    "AbstractGridRepresentation",
    "AbstractIntegerArray",
    "AbstractLocal3dCrs",
    "AbstractOrganizationInterpretation",
    "AbstractParameterKey",
    "AbstractParametricLineArray",
    "AbstractParametricLineGeometry",
    "AbstractParentWindow",
    "AbstractPlaneGeometry",
    "AbstractPoint3dArray",
    "AbstractProperty",
    "AbstractPropertyKind",
    "AbstractPropertyLookup",
    "AbstractRepresentation",
    "AbstractResqmlDataObject",
    "AbstractSeismicCoordinates",
    "AbstractSeismicSurveyFeature",
    "AbstractStratigraphicOrganizationInterpretation",
    "AbstractSurfaceFrameworkRepresentation",
    "AbstractSurfaceRepresentation",
    "AbstractTechnicalFeature",
    "AbstractTruncatedColumnLayerGridRepresentation",
    "AbstractValueArray",
    "AbstractValuesProperty",
    "Activation",
    "AdditionalGridPoints",
    "AdditionalGridTopology",
    "BinaryContactInterpretationPart",
    "BooleanArrayFromDiscretePropertyArray",
    "BooleanArrayFromIndexArray",
    "BooleanConstantArray",
    "BooleanHdf5Array",
    "BoundaryRelation",
    "CellFluidPhaseUnits",
    "CellOverlap",
    "CellParentWindow",
    "CellShape",
    "CellStratigraphicUnits",
    "ChronostratigraphicRank",
    "ColumnLayerParentWindow",
    "ColumnLayerSplitColumnEdges",
    "ColumnLayerSplitCoordinateLines",
    "ColumnLayerSubnodeTopology",
    "ColumnShape",
    "ColumnSubnodePatch",
    "ConnectionInterpretations",
    "ContactElementReference",
    "ContactIdentity",
    "ContactMode",
    "ContactPatch",
    "ContactRelationship",
    "ContactRepresentationReference",
    "ContactSide",
    "ContactVerb",
    "DataObjectParameter",
    "DepositionMode",
    "Domain",
    "DoubleConstantArray",
    "DoubleHdf5Array",
    "DoubleLatticeArray",
    "DoubleLookup",
    "EdgePatch",
    "Edges",
    "ElementIdentity",
    "ElementIndices",
    "Facet",
    "FaultThrow",
    "FloatingPointQuantityParameter",
    "FluidContact",
    "FluidMarker",
    "GeneticBoundaryKind",
    "Geobody3dShape",
    "GeologicBoundaryKind",
    "GeologicUnitComposition",
    "GeologicUnitInterpretationIndex",
    "GeologicUnitMaterialImplacement",
    "GpGridColumnLayerGrid",
    "GpGridIjkGridPatch",
    "GpGridUnstructuredColumnLayerGridPatch",
    "GpGridUnstructuredGridPatch",
    "Grid2dPatch",
    "GridGeometryAttachment",
    "HorizonInterpretationIndex",
    "HorizontalPlaneGeometry",
    "IdentityKind",
    "IjGaps",
    "IjkGridGeometry",
    "IjkIndexableElements",
    "IjkParentWindow",
    "IjSplitColumnEdges",
    "IndexableElements",
    "IntegerArrayFromBooleanMaskArray",
    "IntegerConstantArray",
    "IntegerHdf5Array",
    "IntegerLatticeArray",
    "IntegerQuantityParameter",
    "IntegerRangeArray",
    "IntervalGridCells",
    "Intervals",
    "IntervalStratigraphicUnits",
    "KDirection",
    "KGaps",
    "LineRole",
    "LocalPropertyKind",
    "MdDomain",
    "MdReference",
    "MultipleContactInterpretationPart",
    "NameValuePair",
    "NodePatch",
    "NodesPerCell",
    "NonSealedContactRepresentationPart",
    "obj_Activity",
    "obj_ActivityTemplate",
    "obj_BlockedWellboreRepresentation",
    "obj_BoundaryFeature",
    "obj_BoundaryFeatureInterpretation",
    "obj_CategoricalProperty",
    "obj_CategoricalPropertySeries",
    "obj_CommentProperty",
    "obj_CommentPropertySeries",
    "obj_ContinuousProperty",
    "obj_ContinuousPropertySeries",
    "obj_DeviationSurveyRepresentation",
    "obj_DiscreteProperty",
    "obj_DiscretePropertySeries",
    "obj_DoubleTableLookup",
    "obj_EarthModelInterpretation",
    "obj_FaultInterpretation",
    "obj_FluidBoundaryFeature",
    "obj_FrontierFeature",
    "obj_GenericFeatureInterpretation",
    "obj_GeneticBoundaryFeature",
    "obj_GeobodyBoundaryInterpretation",
    "obj_GeobodyFeature",
    "obj_GeobodyInterpretation",
    "obj_GeologicUnitFeature",
    "obj_GeologicUnitInterpretation",
    "obj_GlobalChronostratigraphicColumn",
    "obj_GpGridRepresentation",
    "obj_Grid2dRepresentation",
    "obj_Grid2dSetRepresentation",
    "obj_GridConnectionSetRepresentation",
    "obj_HorizonInterpretation",
    "obj_IjkGridRepresentation",
    "obj_LocalDepth3dCrs",
    "obj_LocalGridSet",
    "obj_LocalTime3dCrs",
    "obj_MdDatum",
    "obj_NonSealedSurfaceFrameworkRepresentation",
    "obj_OrganizationFeature",
    "obj_PlaneSetRepresentation",
    "obj_PointSetRepresentation",
    "obj_PointsProperty",
    "obj_PolylineRepresentation",
    "obj_PolylineSetRepresentation",
    "obj_PropertyKind",
    "obj_PropertySet",
    "obj_RedefinedGeometryRepresentation",
    "obj_RepresentationIdentitySet",
    "obj_RepresentationSetRepresentation",
    "obj_RockFluidOrganizationInterpretation",
    "obj_RockFluidUnitFeature",
    "obj_RockFluidUnitInterpretation",
    "obj_SealedSurfaceFrameworkRepresentation",
    "obj_SealedVolumeFrameworkRepresentation",
    "obj_SeismicLatticeFeature",
    "obj_SeismicLineFeature",
    "obj_SeismicLineSetFeature",
    "obj_StratigraphicColumn",
    "obj_StratigraphicColumnRankInterpretation",
    "obj_StratigraphicOccurrenceInterpretation",
    "obj_StratigraphicUnitFeature",
    "obj_StratigraphicUnitInterpretation",
    "obj_StreamlinesFeature",
    "obj_StreamlinesRepresentation",
    "obj_StringTableLookup",
    "obj_StructuralOrganizationInterpretation",
    "obj_SubRepresentation",
    "obj_TectonicBoundaryFeature",
    "obj_TimeSeries",
    "obj_TriangulatedSetRepresentation",
    "obj_TruncatedIjkGridRepresentation",
    "obj_TruncatedUnstructuredColumnLayerGridRepresentation",
    "obj_UnstructuredColumnLayerGridRepresentation",
    "obj_UnstructuredGridRepresentation",
    "obj_WellboreFeature",
    "obj_WellboreFrameRepresentation",
    "obj_WellboreInterpretation",
    "obj_WellboreMarkerFrameRepresentation",
    "obj_WellboreTrajectoryRepresentation",
    "ObjectParameterKey",
    "OrderingCriteria",
    "OrganizationKind",
    "OrientedMacroFace",
    "OverlapVolume",
    "ParameterKind",
    "ParameterTemplate",
    "ParametricLineArray",
    "ParametricLineFromRepresentationGeometry",
    "ParametricLineFromRepresentationLatticeArray",
    "ParametricLineGeometry",
    "ParametricLineIntersections",
    "Patch",
    "Patch1d",
    "PatchBoundaries",
    "PatchOfGeometry",
    "PatchOfPoints",
    "PatchOfValues",
    "Phase",
    "PillarShape",
    "Point2dHdf5Array",
    "Point3d",
    "Point3dFromRepresentationLatticeArray",
    "Point3dHdf5Array",
    "Point3dLatticeArray",
    "Point3dOffset",
    "Point3dParametricArray",
    "Point3dZValueArray",
    "PointGeometry",
    "PolylineSetPatch",
    "PropertyKindFacet",
    "PropertyValuesPatch",
    "Regrid",
    "RepresentationIdentity",
    "ResqmlJaggedArray",
    "ResqmlPropertyKind",
    "ResqmlUom",
    "RockFluidUnitInterpretationIndex",
    "SealedContactRepresentationPart",
    "Seismic2dCoordinates",
    "Seismic3dCoordinates",
    "SeismicLatticeSetFeature",
    "SequenceStratigraphySurface",
    "SplitEdges",
    "SplitFaces",
    "SplitNodePatch",
    "StandardPropertyKind",
    "StratigraphicUnitInterpretationIndex",
    "StreamlineFlux",
    "StreamlinePolylineSetPatch",
    "StreamlineWellbores",
    "StringHdf5Array",
    "StringLookup",
    "StringParameter",
    "SubnodeNodeObject",
    "SubnodePatch",
    "SubnodeTopology",
    "SubRepresentationPatch",
    "SurfaceRole",
    "TectonicBoundaryKind",
    "ThreePoint3d",
    "ThrowKind",
    "TiltedPlaneGeometry",
    "TimeIndex",
    "TimeIndexParameter",
    "TimeIndexParameterKey",
    "TimeIndices",
    "TimeInterval",
    "TimeSeriesParentage",
    "TimeSetKind",
    "Timestamp",
    "TrianglePatch",
    "TruncationCellPatch",
    "UniformSubnodePatch",
    "UnstructuredCellIndexableElements",
    "UnstructuredColumnEdges",
    "UnstructuredColumnLayerGridGeometry",
    "UnstructuredColumnLayerIndexableElements",
    "UnstructuredGridGeometry",
    "UnstructuredGridHingeNodeFaces",
    "UnstructuredSubnodeTopology",
    "VariableSubnodePatch",
    "VolumeRegion",
    "VolumeShell",
    "WellboreFrameIndexableElements",
    "WellboreMarker",
    "WellboreTrajectoryParentIntersection",
    "WitsmlWellboreReference"
  ],
  [
    [
      0,
      0,
      [
        [2, 0],
        [4, 0],
        [9, 0],
        [11, 0],
        [12, 0],
        [13, 0],
        [14, 0],
        [25, 0],
        [26, 0],
        [29, 0],
        [30, 0],
        [64, 0],
        [65, 0],
        [66, 0],
        [67, 0],
        [68, 0],
        [71, 0],
        [80, 0],
        [83, 0],
        [84, 0],
        [85, 0],
        [86, 0],
        [87, 0],
        [88, 0],
        [89, 0],
        [90, 0],
        [91, 0],
        [92, 0],
        [95, 0],
        [96, 0],
        [97, 0],
        [104, 0],
        [106, 0],
        [148, 0],
        [149, 0],
        [151, 0],
        [160, 0],
        [185, 0],
        [187, 0],
        [203, 0],
        [204, 0],
        [205, 0],
        [206, 0],
        [207, 0],
        [213, 0],
        [214, 0],
        [219, 0],
        [224, 0],
        [231, 0],
        [234, 0],
        [236, 0],
        [237, 0],
        [238, 0],
        [239, 0],
        [240, 0],
        [241, 0],
        [242, 0],
        [255, 0],
        [256, 0],
        [257, 0],
        [262, 0],
        [263, 0],
        [264, 0],
        [265, 0],
        [266, 0],
        [267, 0],
        [270, 0],
        [277, 0],
        [283, 0],
        [293, 0],
        [294, 0],
        [295, 0],
        [303, 0],
        [304, 0],
        [325, 0],
        [326, 0],
        [327, 0],
        [328, 0],
        [330, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [115, 1],
        [476, 3],
        [244, 1],
        [287, 0]
      ],
      []
    ],
    [0, 53, [], []],
    [
      0,
      30,
      [
        [358, 1],
        [475, 0],
        [503, 1],
        [504, 1],
        [553, 0],
        [555, 0],
        [589, 1],
        [597, 1],
        [605, 1]
      ],
      []
    ],
    [
      0,
      31,
      [
        [470, 1],
        [180, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [388, 0],
        [111, 0],
        [197, 1]
      ],
      []
    ],
    [0, 0, [[107, 0]], []],
    [0, 53, [], []],
    [0, 45, [], []],
    [
      0,
      45,
      [
        [398, 0],
        [445, 1],
        [122, 0]
      ],
      []
    ],
    [0, 26, [], []],
    [
      0,
      0,
      [
        [146, 0],
        [617, 1]
      ],
      []
    ],
    [0, 249, [[346, 3]], []],
    [
      0,
      44,
      [
        [357, 1],
        [367, 1],
        [546, 1]
      ],
      []
    ],
    [0, 53, [], []],
    [
      0,
      45,
      [
        [7, 0],
        [208, 0],
        [209, 0],
        [210, 0],
        [322, 0],
        [323, 0],
        [338, 0],
        [340, 0],
        [341, 0],
        [342, 0]
      ],
      []
    ],
    [0, 27, [[387, 3]], []],
    [0, 0, [], []],
    [0, 0, [], []],
    [0, 29, [], []],
    [0, 0, [[364, 1]], []],
    [0, 29, [], []],
    [0, 0, [], []],
    [
      0,
      45,
      [
        [42, 0],
        [458, 0],
        [145, 1],
        [566, 0],
        [218, 1],
        [271, 0],
        [616, 1],
        [284, 1]
      ],
      []
    ],
    [0, 0, [], []],
    [0, 45, [], []],
    [0, 45, [[232, 1]], []],
    [0, 5, [[405, 3]], []],
    [0, 0, [[243, 0]], []],
    [0, 51, [], []],
    [0, 34, [[523, 0]], []],
    [0, 190, [[386, 3]], []],
    [
      0,
      44,
      [
        [352, 3],
        [609, 0]
      ],
      []
    ],
    [0, 26, [], []],
    [
      0,
      31,
      [
        [179, 0],
        [630, 0]
      ],
      []
    ],
    [0, 0, [], []],
    [
      0,
      41,
      [
        [410, 3],
        [549, 2]
      ],
      []
    ],
    [
      0,
      0,
      [
        [345, 0],
        [280, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [350, 0],
        [564, 0],
        [229, 1]
      ],
      []
    ],
    [
      0,
      0,
      [
        [377, 1],
        [455, 1],
        [587, 1],
        [592, 1],
        [594, 1],
        [596, 1],
        [636, 1],
        [639, 1]
      ],
      []
    ],
    [
      0,
      23,
      [
        [397, 0],
        [600, 0],
        [647, 0]
      ],
      []
    ],
    [
      0,
      20,
      [
        [212, 0],
        [313, 0]
      ],
      []
    ],
    [
      0,
      20,
      [
        [37, 0],
        [116, 0],
        [461, 0]
      ],
      []
    ],
    [
      0,
      20,
      [
        [38, 0],
        [306, 0]
      ],
      []
    ],
    [0, 20, [[321, 0]], []],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [82, 0],
        [552, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [54, 1],
        [526, 1],
        [536, 1]
      ],
      []
    ],
    [
      0,
      38,
      [
        [362, 0],
        [193, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [259, 0],
        [634, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [28, 2],
        [169, 0]
      ],
      []
    ],
    [
      0,
      38,
      [
        [374, 0],
        [481, 0],
        [521, 1],
        [192, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [378, 0],
        [55, 0],
        [537, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [380, 0],
        [46, 0],
        [554, 0],
        [588, 1]
      ],
      []
    ],
    [0, 277, [[382, 3]], []],
    [3, 4, [], []],
    [0, 276, [[601, 0]], []],
    [
      0,
      0,
      [
        [73, 2],
        [466, 0]
      ],
      []
    ],
    [
      0,
      9,
      [
        [567, 1],
        [577, 1]
      ],
      []
    ],
    [
      0,
      0,
      [
        [451, 0],
        [488, 0],
        [489, 1]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      234,
      [
        [225, 0],
        [608, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [0, 24, [[221, 0]], []],
    [3, 4, [], []],
    [3, 4, [], []],
    [0, 19, [[59, 0]], []],
    [3, 4, [], []],
    [3, 4, [], []],
    [
      0,
      25,
      [
        [40, 0],
        [310, 0]
      ],
      []
    ],
    [0, 25, [[319, 0]], []],
    [
      0,
      25,
      [
        [516, 2],
        [251, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [136, 0],
        [312, 0]
      ],
      []
    ],
    [0, 234, [[591, 1]], []],
    [
      0,
      0,
      [
        [51, 0],
        [510, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [402, 1],
        [416, 1],
        [452, 0],
        [460, 0],
        [223, 0],
        [624, 1]
      ],
      []
    ],
    [
      0,
      0,
      [
        [459, 0],
        [462, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [446, 1],
        [613, 2]
      ],
      []
    ],
    [
      0,
      19,
      [
        [640, 0],
        [317, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [3, 4, [], []],
    [3, 4, [], []],
    [3, 4, [], []],
    [3, 4, [], []],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [109, 0],
        [300, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [454, 3],
        [478, 1],
        [178, 0],
        [637, 3]
      ],
      []
    ],
    [
      0,
      233,
      [
        [436, 1],
        [173, 0],
        [176, 0],
        [216, 1],
        [631, 1]
      ],
      []
    ],
    [
      0,
      233,
      [
        [433, 1],
        [629, 1],
        [302, 0]
      ],
      []
    ],
    [
      0,
      233,
      [
        [434, 1],
        [301, 0]
      ],
      []
    ],
    [
      0,
      233,
      [
        [70, 0],
        [428, 0],
        [248, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [103, 0],
        [110, 0],
        [261, 1]
      ],
      []
    ],
    [0, 39, [[31, 0]], []],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [381, 1],
        [456, 1],
        [543, 1],
        [249, 1]
      ],
      []
    ],
    [
      0,
      21,
      [
        [98, 0],
        [453, 1]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      38,
      [
        [472, 0],
        [474, 0],
        [480, 0],
        [520, 1],
        [191, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [49, 0],
        [558, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      32,
      [
        [496, 0],
        [289, 0]
      ],
      []
    ],
    [
      0,
      32,
      [
        [39, 0],
        [307, 0]
      ],
      []
    ],
    [
      0,
      32,
      [
        [186, 0],
        [318, 0]
      ],
      []
    ],
    [
      0,
      32,
      [
        [517, 2],
        [252, 0]
      ],
      []
    ],
    [0, 19, [[316, 0]], []],
    [
      0,
      32,
      [
        [41, 0],
        [311, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [17, 0],
        [363, 0],
        [444, 0],
        [99, 2],
        [491, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [368, 1],
        [369, 0],
        [123, 0],
        [538, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [260, 0],
        [635, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [47, 1],
        [417, 1]
      ],
      []
    ],
    [3, 4, [], []],
    [0, 42, [[150, 0]], []],
    [3, 4, [], []],
    [3, 4, [], []],
    [0, 23, [[331, 2]], []],
    [
      0,
      0,
      [
        [170, 0],
        [314, 0]
      ],
      []
    ],
    [0, 234, [[426, 0]], []],
    [0, 0, [[509, 0]], []],
    [
      0,
      24,
      [
        [384, 3],
        [425, 0]
      ],
      []
    ],
    [
      0,
      45,
      [
        [3, 0],
        [528, 2],
        [190, 1]
      ],
      []
    ],
    [0, 45, [[529, 2]], []],
    [
      0,
      217,
      [
        [15, 0],
        [360, 0],
        [93, 2],
        [443, 0],
        [490, 0]
      ],
      []
    ],
    [0, 28, [], []],
    [0, 27, [], []],
    [0, 54, [[152, 0]], []],
    [
      0,
      147,
      [
        [569, 1],
        [581, 1]
      ],
      []
    ],
    [0, 54, [[141, 1]], []],
    [
      0,
      149,
      [
        [570, 1],
        [582, 1]
      ],
      []
    ],
    [
      0,
      54,
      [
        [154, 3],
        [165, 3],
        [641, 0]
      ],
      []
    ],
    [
      0,
      151,
      [
        [568, 1],
        [580, 1]
      ],
      []
    ],
    [
      0,
      44,
      [
        [6, 0],
        [351, 0],
        [411, 0],
        [457, 0],
        [128, 0],
        [158, 0],
        [499, 0],
        [161, 0],
        [253, 0],
        [618, 1],
        [332, 1]
      ],
      []
    ],
    [
      0,
      54,
      [
        [155, 3],
        [166, 3]
      ],
      []
    ],
    [
      0,
      154,
      [
        [571, 1],
        [583, 1]
      ],
      []
    ],
    [0, 43, [[642, 2]], []],
    [
      0,
      27,
      [
        [78, 1],
        [254, 1],
        [258, 3],
        [268, 1]
      ],
      []
    ],
    [
      0,
      146,
      [
        [131, 1],
        [153, 1],
        [163, 1],
        [164, 1],
        [614, 3]
      ],
      []
    ],
    [0, 145, [[413, 0]], []],
    [0, 51, [], []],
    [0, 27, [], []],
    [
      0,
      145,
      [
        [343, 1],
        [418, 0]
      ],
      []
    ],
    [0, 146, [[353, 3]], []],
    [0, 166, [], []],
    [0, 167, [[419, 1]], []],
    [0, 28, [], []],
    [
      0,
      27,
      [
        [421, 1],
        [423, 1]
      ],
      []
    ],
    [0, 45, [[370, 2]], []],
    [
      0,
      31,
      [
        [376, 3],
        [638, 3]
      ],
      []
    ],
    [0, 50, [[440, 0]], []],
    [0, 50, [[441, 2]], []],
    [
      0,
      44,
      [
        [359, 0],
        [383, 1],
        [52, 0],
        [94, 2],
        [442, 1],
        [492, 1]
      ],
      []
    ],
    [
      0,
      146,
      [
        [354, 3],
        [579, 1]
      ],
      []
    ],
    [
      0,
      22,
      [
        [432, 1],
        [477, 1],
        [172, 0],
        [175, 0],
        [215, 1]
      ],
      []
    ],
    [0, 33, [], []],
    [
      0,
      45,
      [
        [344, 1],
        [18, 2]
      ],
      []
    ],
    [0, 33, [[285, 0]], []],
    [
      0,
      45,
      [
        [147, 0],
        [494, 0],
        [498, 0]
      ],
      []
    ],
    [0, 49, [[514, 3]], []],
    [0, 28, [[524, 0]], []],
    [0, 50, [[560, 2]], []],
    [0, 44, [[506, 2]], []],
    [0, 41, [[548, 2]], []],
    [
      0,
      44,
      [
        [126, 0],
        [487, 1],
        [507, 0]
      ],
      []
    ],
    [
      0,
      44,
      [
        [485, 2],
        [486, 1]
      ],
      []
    ],
    [
      0,
      45,
      [
        [125, 0],
        [171, 0],
        [544, 0],
        [574, 0]
      ],
      []
    ],
    [
      0,
      45,
      [
        [100, 0],
        [102, 0],
        [195, 3],
        [211, 2],
        [623, 0]
      ],
      []
    ],
    [
      0,
      44,
      [
        [547, 2],
        [275, 0]
      ],
      []
    ],
    [0, 45, [[573, 2]], []],
    [
      0,
      44,
      [
        [129, 0],
        [222, 2]
      ],
      []
    ],
    [0, 34, [[575, 0]], []],
    [
      0,
      166,
      [
        [79, 0],
        [81, 0],
        [551, 0]
      ],
      []
    ],
    [0, 167, [[550, 1]], []],
    [0, 49, [[576, 3]], []],
    [
      0,
      190,
      [
        [8, 0],
        [572, 2],
        [584, 2]
      ],
      []
    ],
    [
      0,
      47,
      [
        [57, 0],
        [58, 0],
        [75, 0],
        [76, 0],
        [118, 0],
        [119, 0],
        [473, 1]
      ],
      []
    ],
    [
      0,
      47,
      [
        [77, 0],
        [134, 1],
        [290, 0],
        [291, 0]
      ],
      []
    ],
    [0, 47, [], []],
    [0, 45, [[217, 2]], []],
    [
      0,
      48,
      [
        [112, 0],
        [598, 2]
      ],
      []
    ],
    [
      0,
      48,
      [
        [422, 3],
        [132, 1]
      ],
      []
    ],
    [
      0,
      166,
      [
        [20, 1],
        [21, 1]
      ],
      []
    ],
    [
      0,
      167,
      [
        [396, 1],
        [157, 1],
        [168, 1]
      ],
      []
    ],
    [
      0,
      51,
      [
        [415, 0],
        [188, 1],
        [621, 0]
      ],
      []
    ],
    [
      0,
      44,
      [
        [439, 1],
        [142, 0],
        [599, 1]
      ],
      []
    ],
    [0, 43, [[643, 2]], []],
    [
      0,
      34,
      [
        [10, 3],
        [72, 3],
        [448, 3],
        [522, 0],
        [247, 3],
        [288, 3]
      ],
      []
    ],
    [
      0,
      44,
      [
        [348, 1],
        [606, 2],
        [276, 0]
      ],
      []
    ],
    [0, 145, [[612, 0]], []],
    [
      0,
      45,
      [
        [615, 2],
        [622, 1]
      ],
      []
    ],
    [0, 50, [[625, 2]], []],
    [
      0,
      52,
      [
        [437, 0],
        [174, 0],
        [177, 0]
      ],
      []
    ],
    [
      0,
      52,
      [
        [24, 0],
        [435, 0]
      ],
      []
    ],
    [
      0,
      22,
      [
        [23, 0],
        [431, 1]
      ],
      []
    ],
    [
      0,
      31,
      [
        [16, 0],
        [430, 1]
      ],
      []
    ],
    [0, 51, [[651, 1]], []],
    [
      0,
      44,
      [
        [356, 1],
        [471, 1],
        [181, 0],
        [505, 0],
        [292, 0],
        [334, 1]
      ],
      []
    ],
    [0, 27, [[127, 0]], []],
    [0, 217, [[650, 2]], []],
    [
      0,
      44,
      [
        [63, 1],
        [74, 0],
        [424, 1],
        [159, 0],
        [497, 1],
        [162, 0],
        [541, 1],
        [250, 0],
        [335, 1]
      ],
      []
    ],
    [0, 35, [[60, 0]], []],
    [3, 4, [], []],
    [3, 17, [], []],
    [
      0,
      0,
      [
        [200, 0],
        [226, 0],
        [246, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [527, 1],
        [324, 1]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [349, 3],
        [27, 1],
        [61, 1],
        [395, 3],
        [130, 0],
        [133, 0],
        [137, 3],
        [156, 0],
        [167, 0],
        [286, 0]
      ],
      []
    ],
    [
      0,
      36,
      [
        [390, 1],
        [392, 0],
        [140, 0],
        [484, 0],
        [533, 1],
        [611, 1]
      ],
      []
    ],
    [
      0,
      37,
      [
        [143, 0],
        [273, 0]
      ],
      []
    ],
    [
      0,
      36,
      [
        [483, 0],
        [272, 0]
      ],
      []
    ],
    [
      0,
      37,
      [
        [389, 1],
        [391, 0],
        [139, 0],
        [144, 0],
        [610, 1]
      ],
      []
    ],
    [
      0,
      0,
      [
        [43, 0],
        [467, 0],
        [531, 0]
      ],
      []
    ],
    [0, 0, [[199, 0]], []],
    [0, 233, [[56, 0]], []],
    [
      0,
      0,
      [
        [120, 3],
        [189, 1],
        [220, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [438, 0],
        [230, 1]
      ],
      []
    ],
    [
      0,
      0,
      [
        [562, 0],
        [227, 1]
      ],
      []
    ],
    [
      0,
      0,
      [
        [228, 1],
        [645, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [3, 4, [], []],
    [0, 40, [[35, 0]], []],
    [
      0,
      0,
      [
        [32, 0],
        [33, 0],
        [34, 0]
      ],
      []
    ],
    [
      0,
      40,
      [
        [502, 0],
        [274, 0]
      ],
      []
    ],
    [0, 40, [[36, 0]], []],
    [
      0,
      40,
      [
        [5, 1],
        [519, 2],
        [525, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [518, 0],
        [586, 0]
      ],
      []
    ],
    [
      0,
      40,
      [
        [530, 0],
        [532, 1],
        [534, 0],
        [627, 1]
      ],
      []
    ],
    [
      0,
      40,
      [
        [607, 0],
        [652, 0]
      ],
      []
    ],
    [
      0,
      29,
      [
        [563, 0],
        [578, 1]
      ],
      []
    ],
    [
      0,
      233,
      [
        [371, 0],
        [429, 0],
        [500, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [409, 0],
        [308, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [201, 0],
        [644, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [117, 0],
        [469, 1]
      ],
      []
    ],
    [
      0,
      0,
      [
        [347, 1],
        [400, 2],
        [105, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [394, 0],
        [403, 0]
      ],
      []
    ],
    [3, 17, [], []],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [113, 0],
        [235, 0]
      ],
      []
    ],
    [
      0,
      24,
      [
        [385, 2],
        [449, 1],
        [450, 0]
      ],
      []
    ],
    [
      0,
      46,
      [
        [482, 0],
        [649, 1]
      ],
      []
    ],
    [
      0,
      46,
      [
        [393, 0],
        [464, 0],
        [648, 1]
      ],
      []
    ],
    [0, 47, [], []],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [50, 0],
        [408, 0],
        [539, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [361, 0],
        [45, 0],
        [540, 0],
        [593, 1]
      ],
      []
    ],
    [
      0,
      233,
      [
        [366, 0],
        [44, 0],
        [542, 0],
        [595, 1]
      ],
      []
    ],
    [0, 42, [[479, 0]], []],
    [
      0,
      0,
      [
        [108, 0],
        [299, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      233,
      [
        [372, 0],
        [124, 0],
        [468, 1],
        [184, 0],
        [501, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [463, 0],
        [565, 0],
        [329, 2]
      ],
      []
    ],
    [0, 53, [[320, 0]], []],
    [
      0,
      0,
      [
        [135, 0],
        [309, 0]
      ],
      []
    ],
    [0, 19, [[315, 0]], []],
    [3, 4, [], []],
    [
      0,
      233,
      [
        [513, 0],
        [603, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [633, 3],
        [646, 3]
      ],
      []
    ],
    [0, 234, [[401, 2]], []],
    [3, 4, [], []],
    [3, 4, [], []],
    [0, 0, [[561, 2]], []],
    [3, 4, [], []],
    [0, 39, [[559, 2]], []],
    [
      0,
      0,
      [
        [114, 0],
        [281, 0]
      ],
      []
    ],
    [0, 19, [[620, 0]], []],
    [0, 35, [[619, 0]], []],
    [
      0,
      0,
      [
        [585, 1],
        [278, 0],
        [279, 1],
        [282, 0],
        [305, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [19, 0],
        [22, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [101, 0],
        [545, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [62, 0],
        [339, 1]
      ],
      []
    ],
    [
      0,
      234,
      [
        [427, 0],
        [182, 0],
        [590, 3],
        [626, 0]
      ],
      []
    ],
    [
      0,
      233,
      [
        [493, 0],
        [512, 0],
        [535, 0],
        [296, 0],
        [628, 0],
        [297, 0],
        [632, 0],
        [298, 0]
      ],
      []
    ],
    [0, 276, [[269, 0]], []],
    [3, 4, [], []],
    [
      0,
      0,
      [
        [48, 0],
        [557, 0]
      ],
      []
    ],
    [
      0,
      21,
      [
        [373, 1],
        [375, 0],
        [379, 0],
        [202, 0],
        [556, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      30,
      [
        [355, 0],
        [365, 0],
        [69, 0],
        [407, 0],
        [447, 1],
        [183, 0],
        [511, 0],
        [604, 1]
      ],
      []
    ],
    [
      0,
      0,
      [
        [53, 0],
        [406, 0]
      ],
      []
    ],
    [
      0,
      277,
      [
        [399, 1],
        [508, 1]
      ],
      []
    ],
    [
      0,
      276,
      [
        [515, 0],
        [602, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [404, 0],
        [465, 3],
        [198, 0],
        [233, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [495, 2],
        [245, 0]
      ],
      []
    ],
    [3, 4, [], []],
    [
      0,
      45,
      [
        [412, 1],
        [414, 1],
        [420, 1],
        [121, 1],
        [333, 1]
      ],
      []
    ],
    [
      0,
      0,
      [
        [138, 0],
        [194, 0],
        [196, 0]
      ],
      []
    ],
    [
      0,
      0,
      [
        [336, 0],
        [337, 0]
      ],
      []
    ]
  ],
  [
    ["Activity", [142], 0, 1],
    ["ActivityDescriptor", [9], 0],
    ["ActivityTemplate", [143], 0, 1],
    ["AllDimensionsAreOrthogonal", [2], 0],
    ["AngleUom", [15], 0],
    ["ArealRotation", [14], 0],
    ["BasedOn", [9], 0],
    ["BlockedWellboreRepresentation", [144], 0, 1],
    ["BottomFrontier", [9], 0],
    ["BoundaryFeature", [145], 0, 1],
    ["BoundaryFeatureInterpretation", [146], 0, 1],
    ["CategoricalProperty", [147], 0, 1],
    ["CategoricalPropertySeries", [148], 0, 1],
    ["CellCount", [3], 0],
    ["CellCount", [3], 0],
    ["CellCount", [3], 0],
    ["ChildGrid", [9], 0],
    ["ChronoBottom", [9], 0],
    ["ChronostratigraphicBottom", [9], 0],
    ["ChronostratigraphicTop", [9], 0],
    ["ChronoTop", [9], 0],
    ["ColumnCount", [3], 0],
    ["ColumnCount", [3], 0],
    ["CommentProperty", [149], 0, 1],
    ["CommentPropertySeries", [150], 0, 1],
    ["Constraint", [4], 0],
    ["Contains", [9], 0],
    ["ContinuousProperty", [151], 0, 1],
    ["ContinuousPropertySeries", [152], 0, 1],
    ["Coordinate", [3], 0],
    ["Coordinate1", [3], 0],
    ["Coordinate2", [3], 0],
    ["Coordinate3", [3], 0],
    ["Coordinates", [10], 0],
    ["Coordinates", [10], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["Count", [3], 0],
    ["CrosslineCount", [3], 0],
    ["CrosslineIndexIncrement", [3], 0],
    ["DataObject", [9], 0],
    ["DataObject", [9], 0],
    ["DataObjectContentType", [4], 0],
    ["DateTime", [1], 0],
    ["DeviationSurvey", [9], 0],
    ["DeviationSurveyRepresentation", [153], 0, 1],
    ["DiscreteProperty", [154], 0, 1],
    ["DiscretePropertySeries", [155], 0, 1],
    ["DoubleTableLookup", [156], 0, 1],
    ["EarthModelInterpretation", [157], 0, 1],
    ["FaceCount", [3], 0],
    ["FastestAxisCount", [3], 0],
    ["FaultInterpretation", [158], 0, 1],
    ["Faults", [9], 0],
    ["FeatureInterpretation", [9], 0],
    ["FinishMd", [3], 0],
    ["FirstCrosslineIndex", [3], 0],
    ["FirstInlineIndex", [3], 0],
    ["FirstTraceIndex", [3], 0],
    ["Fluid", [9], 0],
    ["FluidBoundaryBottom", [9], 0],
    ["FluidBoundaryFeature", [159], 0, 1],
    ["FluidBoundaryTop", [9], 0],
    ["FluidOrganization", [9], 0],
    ["FrontierFeature", [160], 0, 1],
    ["GenericFeatureInterpretation", [161], 0, 1],
    ["GeneticBoundaryFeature", [162], 0, 1],
    ["GeobodyBoundaryInterpretation", [163], 0, 1],
    ["GeobodyFeature", [164], 0, 1],
    ["GeobodyInterpretation", [165], 0, 1],
    ["GeologicUnitFeature", [166], 0, 1],
    ["GeologicUnitInterpretation", [167], 0, 1],
    ["GlobalChronostratigraphicColumn", [168], 0, 1],
    ["GpGridRepresentation", [169], 0, 1],
    ["Grid", [9], 0],
    ["Grid", [9], 0],
    ["Grid2dRepresentation", [170], 0, 1],
    ["Grid2dSetRepresentation", [171], 0, 1],
    ["GridConnectionSetRepresentation", [172], 0, 1],
    ["GridIsRighthanded", [2], 0],
    ["Grids", [9], 0],
    ["HasMultipleRealizations", [2], 0],
    ["HasOverlap", [2], 0],
    ["HasSinglePropertyKind", [2], 0],
    ["Horizon", [9], 0],
    ["HorizonInterpretation", [173], 0, 1],
    ["IdenticalElementCount", [3], 0],
    ["IjkGridRepresentation", [174], 0, 1],
    ["Index", [3], 0],
    ["Index", [3], 0],
    ["Index", [3], 0],
    ["Index", [3], 0],
    ["Index", [3], 0],
    ["Index", [3], 0],
    ["Index", [3], 0],
    ["Index", [3], 0],
    ["Index", [3], 0],
    ["IndexIsTrue", [2], 0],
    ["InitialIndexOnParentGrid", [3], 0],
    ["InlineCount", [3], 0],
    ["InlineIndexIncrement", [3], 0],
    ["InnerRing", [9], 0],
    ["Interpretation", [9], 0],
    ["InterpretedFeature", [9], 0],
    ["IntervalCount", [3], 0],
    ["IntervalCount", [3], 0],
    ["IsAbstract", [2], 0],
    ["IsClosed", [2], 0],
    ["IsDrilled", [2], 0],
    ["IsFinal", [2], 0],
    ["IsHomogeneous", [2], 0],
    ["IsInput", [2], 0],
    ["IsListric", [2], 0],
    ["IsOccurrenceOf", [9], 0],
    ["IsOutput", [2], 0],
    ["IsPartOf", [9], 0],
    ["Key", [3], 0],
    ["Key", [3], 0],
    ["KeyConstraint", [4], 0],
    ["KickoffMd", [3], 0],
    ["KnotCount", [3], 0],
    ["KnotCount", [3], 0],
    ["Language", [4], 0],
    ["LineCount", [3], 0],
    ["LineIndiexOnSupportingRepresentation", [3], 0],
    ["LineKindIndex", [3], 0],
    ["LocalCrs", [9], 0],
    ["LocalCrs", [9], 0],
    ["LocalCrs", [9], 0],
    ["LocalDepth3dCrs", [175], 0, 1],
    ["LocalGridSet", [176], 0, 1],
    ["LocalPropertyKind", [9], 0],
    ["LocalTime3dCrs", [177], 0, 1],
    ["Lookup", [9], 0],
    ["MaximumThrow", [11], 0],
    ["MaximumValue", [3], 0],
    ["MaximumValue", [3], 0],
    ["MaxOccurs", [3], 0],
    ["MaxThickness", [11], 0],
    ["MdDatum", [9], 0],
    ["MdDatum", [9], 0],
    ["MdDatum", [178], 0, 1],
    ["MdUom", [12], 0],
    ["MdUom", [12], 0],
    ["MeanAzimuth", [14], 0],
    ["MeanDip", [14], 0],
    ["MinimumValue", [3], 0],
    ["MinimumValue", [3], 0],
    ["MinOccurs", [3], 0],
    ["MinThickness", [11], 0],
    ["Name", [13], 0],
    ["Name", [4], 0],
    ["NamingSystem", [4], 0],
    ["Ni", [3], 0],
    ["Ni", [3], 0],
    ["Ni", [3], 0],
    ["Nj", [3], 0],
    ["Nj", [3], 0],
    ["Nj", [3], 0],
    ["Nk", [3], 0],
    ["Nk", [3], 0],
    ["Nk", [3], 0],
    ["NodeCount", [3], 0],
    ["NodeCount", [3], 0],
    ["NodeCount", [3], 0],
    ["NodeCount", [3], 0],
    ["NonSealedSurfaceFrameworkRepresentation", [179], 0, 1],
    ["NullValue", [3], 0],
    ["OrganizationFeature", [180], 0, 1],
    ["OtherFlux", [4], 0],
    ["OuterRing", [9], 0],
    ["Parent", [9], 0],
    ["ParentGrid", [9], 0],
    ["ParentGrid", [9], 0],
    ["ParentGrid", [9], 0],
    ["ParentMd", [3], 0],
    ["ParentSet", [9], 0],
    ["ParentTrajectory", [9], 0],
    ["PartOf", [9], 0],
    ["PatchIndex", [3], 0],
    ["PatchIndex", [3], 0],
    ["PatchIndexOfRepresentation", [3], 0],
    ["patchUid", [3], 0],
    ["PillarCount", [3], 0],
    ["PlaneSetRepresentation", [181], 0, 1],
    ["PointSetRepresentation", [182], 0, 1],
    ["PointsProperty", [183], 0, 1],
    ["PolylineRepresentation", [184], 0, 1],
    ["PolylineSetRepresentation", [185], 0, 1],
    ["ProjectedAxisOrder", [8], 0],
    ["ProjectedCrs", [6], 0],
    ["ProjectedUom", [12], 0],
    ["Properties", [9], 0],
    ["Property", [9], 0],
    ["PropertyKind", [186], 0, 1],
    ["PropertySet", [187], 0, 1],
    ["RadialGridIsComplete", [2], 0],
    ["RadialGridIsComplete", [2], 0],
    ["Ranks", [9], 0],
    ["RealizationIndex", [3], 0],
    ["RedefinedGeometryRepresentation", [188], 0, 1],
    ["ReferencedPatch", [3], 0],
    ["Representation", [9], 0],
    ["Representation", [9], 0],
    ["Representation", [9], 0],
    ["RepresentationIdentitySet", [189], 0, 1],
    ["RepresentationIndex", [3], 0],
    ["RepresentationIndex", [3], 0],
    ["RepresentationPatchIndex", [3], 0],
    ["RepresentationPatchIndex", [3], 0],
    ["RepresentationPatchIndex", [3], 0],
    ["RepresentationPatchIndex", [3], 0],
    ["RepresentationSetRepresentation", [190], 0, 1],
    ["RepresentedInterpretation", [9], 0],
    ["Represents", [9], 0],
    ["RockFluidOrganizationInterpretation", [191], 0, 1],
    ["RockFluidUnit", [9], 0],
    ["RockFluidUnitFeature", [192], 0, 1],
    ["RockFluidUnitInterpretation", [193], 0, 1],
    ["SealedSurfaceFrameworkRepresentation", [194], 0, 1],
    ["SealedVolumeFrameworkRepresentation", [195], 0, 1],
    ["SeismicLatticeFeature", [196], 0, 1],
    ["SeismicLineFeature", [197], 0, 1],
    ["SeismicLineSetFeature", [198], 0, 1],
    ["SeismicSupport", [9], 0],
    ["Selection", [4], 0],
    ["ShellUid", [4], 0],
    ["SideIsPlus", [2], 0],
    ["Sides", [9], 0],
    ["SlowestAxisCount", [3], 0],
    ["SplitPillarCount", [3], 0],
    ["StartMd", [3], 0],
    ["StartValue", [3], 0],
    ["StartValue", [3], 0],
    ["StationCount", [3], 0],
    ["StratigraphicColumn", [9], 0],
    ["StratigraphicColumn", [199], 0, 1],
    ["StratigraphicColumnRankInterpretation", [200], 0, 1],
    ["StratigraphicOccurrenceInterpretation", [201], 0, 1],
    ["StratigraphicOccurrences", [9], 0],
    ["StratigraphicOrganization", [9], 0],
    ["StratigraphicOrganization", [9], 0],
    ["StratigraphicRank", [3], 0],
    ["StratigraphicUnitFeature", [202], 0, 1],
    ["StratigraphicUnitInterpretation", [203], 0, 1],
    ["StreamlinesFeature", [204], 0, 1],
    ["StreamlinesRepresentation", [205], 0, 1],
    ["StringTableLookup", [206], 0, 1],
    ["StructuralOrganizationInterpretation", [207], 0, 1],
    ["Structure", [9], 0],
    ["SubnodeCountPerObject", [3], 0],
    ["SubRepresentation", [208], 0, 1],
    ["SupportingRepresentation", [9], 0],
    ["SupportingRepresentation", [9], 0],
    ["SupportingRepresentation", [9], 0],
    ["SupportingRepresentation", [9], 0],
    ["SupportingRepresentation", [9], 0],
    ["SupportingRepresentation", [9], 0],
    ["TectonicBoundaryFeature", [209], 0, 1],
    ["TimeIndexCount", [3], 0],
    ["TimeIndexStart", [3], 0],
    ["TimeSeries", [9], 0],
    ["TimeSeries", [9], 0],
    ["TimeSeries", [9], 0],
    ["TimeSeries", [210], 0, 1],
    ["TimeStep", [3], 0],
    ["TimeUom", [16], 0],
    ["Title", [4], 0],
    ["Title", [4], 0],
    ["TopFrontier", [9], 0],
    ["TotalIndexCount", [3], 0],
    ["TraceCount", [3], 0],
    ["TraceIndexIncrement", [3], 0],
    ["Trajectory", [9], 0],
    ["TriangulatedSetRepresentation", [211], 0, 1],
    ["TruncatedIjkGridRepresentation", [212], 0, 1],
    ["TruncatedUnstructuredColumnLayerGridRepresentation", [213], 0, 1],
    ["TruncationCellCount", [3], 0],
    ["TruncationFaceCount", [3], 0],
    ["TruncationNodeCount", [3], 0],
    ["Unit", [9], 0],
    ["Unit", [9], 0],
    ["UnstructuredCellCount", [3], 0],
    ["UnstructuredColumnCount", [3], 0],
    ["UnstructuredColumnLayerGridRepresentation", [214], 0, 1],
    ["UnstructuredGridRepresentation", [215], 0, 1],
    ["UseInterval", [2], 0],
    ["Value", [2], 0],
    ["Value", [3], 0],
    ["Value", [4], 0],
    ["Value", [4], 0],
    ["Value", [3], 0],
    ["Value", [3], 0],
    ["Value", [3], 0],
    ["Value", [3], 0],
    ["Value", [4], 0],
    ["Value", [4], 0],
    ["Value", [3], 0],
    ["Value", [3], 0],
    ["Values", [10], 0],
    ["Values", [10], 0],
    ["Values", [10], 0],
    ["Values", [10], 0],
    ["VerticalCrs", [7], 0],
    ["VerticalUom", [12], 0],
    ["VolumeUom", [18], 0],
    ["WellboreFeature", [216], 0, 1],
    ["WellboreFrameRepresentation", [217], 0, 1],
    ["WellboreInterpretation", [218], 0, 1],
    ["WellboreMarkerFrameRepresentation", [219], 0, 1],
    ["WellboreTrajectoryRepresentation", [9], 0],
    ["WellboreTrajectoryRepresentation", [220], 0, 1],
    ["With", [3], 0],
    ["WitsmlDeviationSurvey", [9], 0],
    ["WitsmlFormationMarker", [9], 0],
    ["WitsmlLogReference", [9], 0],
    ["WitsmlTrajectory", [9], 0],
    ["WitsmlWell", [9], 0],
    ["WitsmlWellbore", [9], 0],
    ["XOffset", [3], 0],
    ["YearOffset", [3], 0],
    ["YOffset", [3], 0],
    ["ZIncreasingDownward", [2], 0],
    ["ZOffset", [3], 0],
    ["AbsoluteAge", [291], 0],
    ["Activation", [55], 0],
    ["ActivationToggleIndices", [32], 0],
    ["AdditionalGridPoints", [56], 0],
    ["AdditionalGridTopology", [57], 0],
    ["AdditionalGridTopology", [57], 0],
    ["AllowedKind", [226], 0],
    ["Attachment", [112], 0],
    ["Azimuths", [25], 0],
    ["Boundaries", [235], 0],
    ["BoundaryRelation", [63], 0],
    ["BoundaryRelation", [63], 0],
    ["CellFaceIsRightHanded", [20], 0],
    ["CellFluidPhaseUnits", [64], 0],
    ["CellFluidPhaseUnits", [64], 0],
    ["CellGeometryIsDefined", [20], 0],
    ["CellIndexPairs", [32], 0],
    ["CellIndices", [32], 0],
    ["CellIndices", [32], 0],
    ["CellIndices", [32], 0],
    ["CellIndices", [32], 0],
    ["CellOverlap", [65], 0],
    ["CellShape", [67], 0],
    ["CellsPerSplitNode", [255], 0],
    ["CellStratigraphicUnits", [68], 0],
    ["ChildCellWeights", [25], 0],
    ["ChildCountPerInterval", [32], 0],
    ["ChronostratigraphicColumnComponent", [69], 0],
    ["ClosedPolylines", [20], 0],
    ["ClosedPolylines", [20], 0],
    ["ColumnEdges", [296], 0],
    ["ColumnIndices", [32], 0],
    ["ColumnIsRightHanded", [20], 0],
    ["ColumnLayerGrid", [107], 0],
    ["ColumnLayerSubnodeTopology", [73], 0],
    ["ColumnPerSplitColumnEdge", [32], 0],
    ["ColumnShape", [74], 0],
    ["ColumnsPerSplitCoordinateLine", [255], 0],
    ["ColumnsPerSplitPillar", [255], 0],
    ["ColumnSubnodes", [75], 0],
    ["ConnectionInterpretations", [76], 0],
    ["Contact", [80], 0],
    ["Contact", [80], 0],
    ["ContactIdentity", [78], 0],
    ["ContactInterpretation", [23], 0],
    ["ContactRelationship", [81], 0],
    ["ControlPointParameters", [25], 0],
    ["ControlPointParameters", [25], 0],
    ["ControlPoints", [40], 0],
    ["ControlPoints", [40], 0],
    ["CrosslineCoordinates", [25], 0],
    ["CumulativeLength", [32], 0],
    ["DefaultValue", [19], 0],
    ["DepositionMode", [86], 0],
    ["DirectObject", [77], 0],
    ["Domain", [87], 0],
    ["Edges", [93], 0],
    ["ElementIdentity", [94], 0],
    ["ElementIndices", [95], 0],
    ["ElementIndices", [32], 0],
    ["Elements", [53], 0],
    ["ExternalShell", [304], 0],
    ["ExtraMetadata", [138], 0],
    ["FaceIndices", [32], 0],
    ["FacesPerCell", [255], 0],
    ["FacesPerSplitEdge", [255], 0],
    ["Facet", [96], 0],
    ["Facet", [251], 0],
    ["FirstStationLocation", [242], 0],
    ["FluidContact", [99], 0],
    ["FluidContact", [99], 0],
    ["FluidMarker", [100], 0],
    ["Flux", [269], 0],
    ["FromTimeIndex", [284], 0],
    ["GapAfterLayer", [20], 0],
    ["GeneticBoundaryKind", [101], 0],
    ["Geobody3dShape", [102], 0],
    ["GeologicBoundaryKind", [103], 0],
    ["GeologicUnitComposition", [104], 0],
    ["GeologicUnitIndex", [105], 0],
    ["GeologicUnitMaterialImplacement", [106], 0],
    ["Geometry", [37], 0],
    ["Geometry", [29], 0],
    ["Geometry", [249], 0],
    ["Geometry", [249], 0],
    ["Geometry", [249], 0],
    ["Geometry", [249], 0],
    ["Geometry", [299], 0],
    ["Geometry", [297], 0],
    ["Geometry", [117], 0],
    ["Geometry", [297], 0],
    ["Geometry", [299], 0],
    ["Geometry", [297], 0],
    ["Geometry", [117], 0],
    ["Geometry", [117], 0],
    ["Geometry", [29], 0],
    ["Geometry", [270], 0],
    ["Grid2dPatch", [111], 0],
    ["Grid2dPatch", [111], 0],
    ["GridIndexPairs", [32], 0],
    ["GridIndices", [32], 0],
    ["GridIndices", [32], 0],
    ["HasOccuredDuring", [288], 0],
    ["HasOccuredDuring", [288], 0],
    ["HingeNodeFaces", [300], 0],
    ["Horizons", [113], 0],
    ["IdenticalNodeIndices", [32], 0],
    ["IdentityKind", [115], 0],
    ["IdentityKind", [115], 0],
    ["IdentityKind", [115], 0],
    ["IjGaps", [116], 0],
    ["IjkGridPatch", [108], 0],
    ["IjSplitColumnEdges", [120], 0],
    ["IjSplitColumnEdges", [120], 0],
    ["Inclinations", [25], 0],
    ["IndexableElement", [121], 0],
    ["IndexableElement", [121], 0],
    ["IndexableElement", [121], 0],
    ["Indices", [32], 0],
    ["Indices", [32], 0],
    ["InjectorPerLine", [32], 0],
    ["InlineCoordinates", [25], 0],
    ["InternalShells", [304], 0],
    ["InterpretationIndices", [255], 0],
    ["IntersectionLinePairs", [32], 0],
    ["IntervalGridCells", [128], 0],
    ["Intervals", [129], 0],
    ["IntervalStratigraphicUnits", [130], 0],
    ["IntervalStratigraphiUnits", [130], 0],
    ["IRegrid", [253], 0],
    ["IsPartOf", [262], 0],
    ["JRegrid", [253], 0],
    ["KDirection", [131], 0],
    ["Key", [35], 0],
    ["KGaps", [132], 0],
    ["KGaps", [132], 0],
    ["Kind", [256], 0],
    ["KRegrid", [253], 0],
    ["KRegrid", [253], 0],
    ["LineAbscissa", [25], 0],
    ["LineIndicesOnSupportingRepresentation", [125], 0],
    ["LineKindIndices", [32], 0],
    ["LinePatch", [250], 0],
    ["LineRole", [133], 0],
    ["LineRole", [133], 0],
    ["ListOfContactRepresentations", [32], 0],
    ["ListOfIdenticalNodes", [32], 0],
    ["LocalFacePairPerCellIndices", [32], 0],
    ["LocalFacePairPerCellIndices", [32], 0],
    ["LocalFacePerCellIndexPairs", [32], 0],
    ["LocalFacesPerCell", [255], 0],
    ["Location", [242], 0],
    ["MacroFaces", [224], 0],
    ["Mask", [20], 0],
    ["MdDomain", [135], 0],
    ["MdReference", [136], 0],
    ["Mds", [25], 0],
    ["NodeCountPerPolyline", [32], 0],
    ["NodeCountPerPolyline", [32], 0],
    ["NodeIndicesOnSupportingRepresentation", [125], 0],
    ["NodeIsColocatedInKDirection", [20], 0],
    ["NodeIsColocatedOnKEdge", [20], 0],
    ["NodeMd", [25], 0],
    ["NodePatch", [139], 0],
    ["NodePatch", [139], 0],
    ["NodesPerCell", [140], 0],
    ["NodesPerCell", [255], 0],
    ["NodesPerEdge", [32], 0],
    ["NodesPerFace", [255], 0],
    ["NodesPerTruncationFace", [255], 0],
    ["NodeWeightsPerSubnode", [53], 0],
    ["NonSealedContactRepresentation", [24], 0],
    ["ObjectIndices", [32], 0],
    ["Offset", [88], 0],
    ["Offset", [123], 0],
    ["Offset", [242], 0],
    ["Offset", [246], 0],
    ["OmitParentCells", [32], 0],
    ["OmitParentCells", [32], 0],
    ["OrderingCriteria", [222], 0],
    ["OrderingCriteria", [222], 0],
    ["OrganizationKind", [223], 0],
    ["Origin", [242], 0],
    ["OverlapVolume", [225], 0],
    ["OverlapVolumes", [25], 0],
    ["Parameter", [19], 0],
    ["Parameter", [227], 0],
    ["Parameters", [53], 0],
    ["ParameterValuePairs", [53], 0],
    ["ParametricLineIndices", [32], 0],
    ["ParametricLineIntersections", [232], 0],
    ["ParametricLines", [36], 0],
    ["ParentCellIndices", [32], 0],
    ["ParentChildCellPairs", [32], 0],
    ["ParentColumnEdgeIndices", [32], 0],
    ["ParentCountPerInterval", [32], 0],
    ["ParentEdgeIndices", [32], 0],
    ["ParentFaceIndices", [32], 0],
    ["ParentIntersection", [307], 0],
    ["ParentNodeIndices", [32], 0],
    ["ParentPillarIndices", [32], 0],
    ["ParentPropertyKind", [42], 0],
    ["ParentTimeIndex", [284], 0],
    ["ParentWindow", [38], 0],
    ["PatchOfGeometry", [236], 0],
    ["PatchOfPoints", [237], 0],
    ["PatchOfValues", [238], 0],
    ["Phase", [239], 0],
    ["Phase", [239], 0],
    ["PhaseUnitIndices", [32], 0],
    ["PillarGeometryIsDefined", [20], 0],
    ["PillarIndices", [32], 0],
    ["PillarShape", [240], 0],
    ["PillarsPerColumn", [255], 0],
    ["PillarsPerColumnEdge", [255], 0],
    ["PillarsPerSplitColumnEdge", [255], 0],
    ["Plane", [281], 0],
    ["Planes", [39], 0],
    ["Point3d", [242], 0],
    ["Points", [40], 0],
    ["Points", [40], 0],
    ["Points", [40], 0],
    ["ProducerPerLine", [32], 0],
    ["PropertyKind", [42], 0],
    ["Qualifier", [83], 0],
    ["RealizationIndices", [32], 0],
    ["RealizationIndices", [32], 0],
    ["RealizationIndices", [32], 0],
    ["RealizationIndices", [32], 0],
    ["Regions", [303], 0],
    ["RepresentationIdentity", [254], 0],
    ["RepresentativeUom", [257], 0],
    ["RockFluidUnitIndex", [258], 0],
    ["SealedContactRepresentation", [259], 0],
    ["SecondaryQualifier", [79], 0],
    ["SeismicCoordinates", [46], 0],
    ["SequenceStratigraphySurface", [263], 0],
    ["SeriesTimeIndices", [287], 0],
    ["SeriesTimeIndices", [287], 0],
    ["SeriesTimeIndices", [287], 0],
    ["SeriesTimeIndices", [287], 0],
    ["Shells", [304], 0],
    ["SimulatorTimeStep", [32], 0],
    ["Spacing", [25], 0],
    ["SplitColumnEdges", [71], 0],
    ["SplitColumnEdges", [71], 0],
    ["SplitCoordinateLines", [72], 0],
    ["SplitEdgePatch", [92], 0],
    ["SplitEdges", [32], 0],
    ["SplitEdges", [264], 0],
    ["SplitEdges", [264], 0],
    ["SplitFaces", [265], 0],
    ["SplitFaces", [265], 0],
    ["SplitNodes", [266], 0],
    ["SplitNodes", [266], 0],
    ["StratigraphicUnits", [268], 0],
    ["StreamlineWellbores", [271], 0],
    ["Subject", [77], 0],
    ["SubnodeCountPerObject", [32], 0],
    ["SubnodeCountPerSelectedObject", [32], 0],
    ["SubnodeNodeObject", [275], 0],
    ["SubnodeTopology", [301], 0],
    ["SubnodeTopology", [73], 0],
    ["SubRepresentationPatch", [278], 0],
    ["SupportingGeometry", [40], 0],
    ["SupportingRepresentationNodes", [32], 0],
    ["SurfaceRole", [279], 0],
    ["TangentVectors", [40], 0],
    ["TangentVectors", [40], 0],
    ["TectonicBoundaryKind", [280], 0],
    ["Throw", [282], 0],
    ["ThrowInterpretation", [97], 0],
    ["Time", [291], 0],
    ["TimeIndex", [284], 0],
    ["TimeIndex", [284], 0],
    ["TimeIndex", [284], 0],
    ["TimeIndex", [284], 0],
    ["TimeIndex", [284], 0],
    ["TimeIndex", [284], 0],
    ["TimeSeriesParentage", [289], 0],
    ["TimeSetKind", [290], 0],
    ["ToTimeIndex", [284], 0],
    ["TrianglePatch", [292], 0],
    ["Triangles", [32], 0],
    ["TruncatedLineIndices", [32], 0],
    ["TruncationCellFaceIsRightHanded", [20], 0],
    ["TruncationCells", [293], 0],
    ["TruncationCells", [293], 0],
    ["TruncationCells", [293], 0],
    ["TruncationFacesPerCell", [255], 0],
    ["UniformSubnodes", [294], 0],
    ["UnitIndices", [32], 0],
    ["UnitIndices", [32], 0],
    ["UnstructuredColumnEdges", [296], 0],
    ["UnstructuredColumnLayerGridPatch", [109], 0],
    ["UnstructuredGridPatch", [110], 0],
    ["UnstructuredSubnodeTopology", [301], 0],
    ["Uom", [257], 0],
    ["UOM", [257], 0],
    ["Value", [91], 0],
    ["Value", [273], 0],
    ["values", [53], 0],
    ["Values", [53], 0],
    ["VariableSubnodes", [302], 0],
    ["Verb", [84], 0],
    ["VerticalCoordinates", [25], 0],
    ["VerticalCoordinates", [25], 0],
    ["WellboreMarker", [306], 0],
    ["WitsmlWellbore", [308], 0],
    ["ZValues", [25], 0]
  ]
);
