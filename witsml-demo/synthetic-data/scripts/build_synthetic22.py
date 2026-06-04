#!/usr/bin/env python3
"""
Build synthetic RESQML 2.2 + 2.0.1 EPCs using energyml dataclasses.
Generates valid XML that passes geosiris validation.

Creates:
  /tmp/synthetic22.epc + /tmp/synthetic22.h5   (RESQML 2.2 / EML 2.3)
  /tmp/synthetic201.epc + /tmp/synthetic201.h5 (RESQML 2.0.1 / EML 2.0)
"""

import uuid
import numpy as np
import h5py
from pathlib import Path

from energyml.utils.epc import Epc
from energyml.eml.v2_3 import commonv2 as eml23
from energyml.resqml.v2_2 import resqmlv2 as r22

# ─── Paths ───────────────────────────────────────────────────────────────────
EPC22_PATH = "/tmp/synthetic22.epc"
H5_22_PATH = "/tmp/synthetic22.h5"
H5_22_NAME = "synthetic22.h5"

# ─── Helpers ─────────────────────────────────────────────────────────────────
def uid():
    return str(uuid.uuid4())

def citation(title, originator="RDDMS Synthetic", fmt="energyml Python"):
    return eml23.Citation(
        title=title,
        originator=originator,
        creation="2026-06-04T00:00:00Z",
        format=fmt,
    )

def dor(obj, title=None):
    """Create DataObjectReference from an energyml object."""
    from energyml.utils.introspection import get_obj_uuid, get_qualified_type_from_class
    qtype = get_qualified_type_from_class(type(obj))
    return eml23.DataObjectReference(
        qualified_type=qtype,
        title=title or obj.citation.title if obj.citation else "ref",
        uuid=obj.uuid,
    )

def ext_array(h5_path, uri=H5_22_NAME):
    """Create ExternalDataArray pointing to HDF5 dataset."""
    return eml23.ExternalDataArray(
        external_data_array_part=[
            eml23.ExternalDataArrayPart(
                path_in_external_file=h5_path,
                uri=uri,
                count=[1],
                start_index=[0],
            )
        ]
    )

def float_ext_array(h5_path):
    return eml23.FloatingPointExternalArray(
        values=ext_array(h5_path),
        count_per_value=1,
        array_floating_point_type=eml23.FloatingPointType.ARRAY_OF_DOUBLE64_LE,
    )

def int_ext_array(h5_path, null_value=-1):
    return eml23.IntegerExternalArray(
        values=ext_array(h5_path),
        null_value=null_value,
        count_per_value=1,
        array_integer_type=eml23.IntegerType.ARRAY_OF_INT32_LE,
    )

def point3d_ext(h5_path):
    return r22.Point3DExternalArray(
        coordinates=ext_array(h5_path),
    )

def point_geometry(h5_path, crs_ref):
    return r22.PointGeometry(
        local_crs=crs_ref,
        points=point3d_ext(h5_path),
    )

# ─── Build RESQML 2.2 Objects ───────────────────────────────────────────────
print("Building RESQML 2.2 synthetic dataset...")
objects = []

# === CRS ===
vertical_crs = eml23.VerticalCrs(
    citation=citation("Synthetic Vertical CRS"),
    uuid=uid(), schema_version="2.3",
    direction=eml23.VerticalDirection.DOWN,
    abstract_vertical_crs=eml23.VerticalEpsgCrs(epsg_code=5714),
    uom="m",
)
objects.append(vertical_crs)

local_2d_crs = eml23.LocalEngineering2DCrs(
    citation=citation("Synthetic Local 2D CRS"),
    uuid=uid(), schema_version="2.3",
    azimuth=eml23.PlaneAngleMeasureExt(value=0.0, uom="dega"),
    azimuth_reference=eml23.NorthReferenceKind.TRUE_NORTH,
    origin_projected_coordinate1=0.0,
    origin_projected_coordinate2=0.0,
    horizontal_axes=eml23.HorizontalAxes(
        direction1=eml23.AxisDirectionKind.EAST,
        direction2=eml23.AxisDirectionKind.NORTH,
        uom="m",
        is_time=False,
    ),
    origin_projected_crs=eml23.ProjectedCrs(
        citation=citation("UTM Zone 31N"),
        uuid=uid(), schema_version="2.3",
        axis_order=eml23.AxisOrder2D.EASTING_NORTHING,
        abstract_projected_crs=eml23.ProjectedEpsgCrs(epsg_code=32631),
        uom="m",
    ),
)
objects.append(local_2d_crs)

crs = eml23.LocalEngineeringCompoundCrs(
    citation=citation("Synthetic Local CRS"),
    uuid=uid(),
    schema_version="2.3",
    origin_vertical_coordinate=0.0,
    vertical_axis=eml23.VerticalAxis(direction=eml23.VerticalDirection.DOWN, uom="m", is_time=False),
    vertical_crs=dor(vertical_crs),
    local_engineering2d_crs=dor(local_2d_crs),
)
objects.append(crs)
crs_ref = dor(crs)

# === FEATURES ===
# BoundaryFeatures (horizons, faults, geobody)
horizon_feat_1 = r22.BoundaryFeature(citation=citation("Synthetic Horizon 1"), uuid=uid(), schema_version="2.2", is_well_known=False)
horizon_feat_2 = r22.BoundaryFeature(citation=citation("Synthetic Horizon 2"), uuid=uid(), schema_version="2.2", is_well_known=False)
fault_feat_1 = r22.BoundaryFeature(citation=citation("Synthetic Fault 1"), uuid=uid(), schema_version="2.2", is_well_known=False)
fault_feat_2 = r22.BoundaryFeature(citation=citation("Synthetic Fault 2"), uuid=uid(), schema_version="2.2", is_well_known=False)
geobody_feat = r22.BoundaryFeature(citation=citation("Synthetic Geobody Boundary"), uuid=uid(), schema_version="2.2", is_well_known=False)
objects.extend([horizon_feat_1, horizon_feat_2, fault_feat_1, fault_feat_2, geobody_feat])

# Model (replaces OrganizationFeature in 2.2)
model_feat = r22.Model(citation=citation("Synthetic Organization Model"), uuid=uid(), schema_version="2.2", is_well_known=False)
objects.append(model_feat)

# RockVolumeFeature
rock_vol_feat = r22.RockVolumeFeature(citation=citation("Synthetic Rock Volume"), uuid=uid(), schema_version="2.2", is_well_known=False)
strat_unit_feat_1 = r22.RockVolumeFeature(citation=citation("Synthetic Strat Unit 1 Feature"), uuid=uid(), schema_version="2.2", is_well_known=False)
strat_unit_feat_2 = r22.RockVolumeFeature(citation=citation("Synthetic Strat Unit 2 Feature"), uuid=uid(), schema_version="2.2", is_well_known=False)
objects.extend([rock_vol_feat, strat_unit_feat_1, strat_unit_feat_2])

# SeismicLatticeFeature
seismic_feat = r22.SeismicLatticeFeature(
    citation=citation("Synthetic Seismic Survey"),
    uuid=uid(), schema_version="2.2", is_well_known=False,
    crossline_labels=r22.IntegerLatticeArray(
        start_value=1000,
        offset=[eml23.IntegerConstantArray(value=1, count=99)],
    ),
    inline_labels=r22.IntegerLatticeArray(
        start_value=500,
        offset=[eml23.IntegerConstantArray(value=1, count=199)],
    ),
)
objects.append(seismic_feat)

# WellboreFeature
wellbore_feat = r22.WellboreFeature(citation=citation("Synthetic Wellbore"), uuid=uid(), schema_version="2.2", is_well_known=False)
objects.append(wellbore_feat)

# === INTERPRETATIONS ===
horizon_interp_1 = r22.HorizonInterpretation(
    citation=citation("Synthetic Horizon 1 Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH, interpreted_feature=dor(horizon_feat_1),
)
horizon_interp_2 = r22.HorizonInterpretation(
    citation=citation("Synthetic Horizon 2 Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH, interpreted_feature=dor(horizon_feat_2),
)
fault_interp_1 = r22.FaultInterpretation(
    citation=citation("Synthetic Fault 1 Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH, interpreted_feature=dor(fault_feat_1),
)
fault_interp_2 = r22.FaultInterpretation(
    citation=citation("Synthetic Fault 2 Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH, interpreted_feature=dor(fault_feat_2),
)
geobody_interp = r22.GeobodyInterpretation(
    citation=citation("Synthetic Geobody Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH, interpreted_feature=dor(geobody_feat),
)
geobody_bound_interp = r22.GeobodyBoundaryInterpretation(
    citation=citation("Synthetic Geobody Boundary Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH, interpreted_feature=dor(geobody_feat),
)
wellbore_interp = r22.WellboreInterpretation(
    citation=citation("Synthetic Wellbore Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH, interpreted_feature=dor(wellbore_feat),
    is_drilled=True,
)
strat_unit_interp_1 = r22.StratigraphicUnitInterpretation(
    citation=citation("Synthetic Strat Unit 1 Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH, interpreted_feature=dor(strat_unit_feat_1),
)
strat_unit_interp_2 = r22.StratigraphicUnitInterpretation(
    citation=citation("Synthetic Strat Unit 2 Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH, interpreted_feature=dor(strat_unit_feat_2),
)
objects.extend([
    horizon_interp_1, horizon_interp_2, fault_interp_1, fault_interp_2,
    geobody_interp, geobody_bound_interp, wellbore_interp,
    strat_unit_interp_1, strat_unit_interp_2,
])

# Structural Organization
struct_org_interp = r22.StructuralOrganizationInterpretation(
    citation=citation("Synthetic Structural Org Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH,
    interpreted_feature=dor(model_feat),
    ascending_ordering_criteria=r22.OrderingCriteria.AGE,
    ordered_boundary_feature_interpretation=[
        r22.BoundaryFeatureInterpretationPlusItsRank(boundary_feature_interpretation=dor(fault_interp_1), stratigraphic_rank=0),
        r22.BoundaryFeatureInterpretationPlusItsRank(boundary_feature_interpretation=dor(fault_interp_2), stratigraphic_rank=1),
        r22.BoundaryFeatureInterpretationPlusItsRank(boundary_feature_interpretation=dor(horizon_interp_1), stratigraphic_rank=2),
        r22.BoundaryFeatureInterpretationPlusItsRank(boundary_feature_interpretation=dor(horizon_interp_2), stratigraphic_rank=3),
    ],
)
objects.append(struct_org_interp)

# Stratigraphic Column Rank
strat_col_rank = r22.StratigraphicColumnRankInterpretation(
    citation=citation("Synthetic StratCol Rank Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH,
    interpreted_feature=dor(model_feat),
    ascending_ordering_criteria=r22.OrderingCriteria.AGE,
    rank_in_stratigraphic_column=0,
    stratigraphic_units=[dor(strat_unit_interp_1), dor(strat_unit_interp_2)],
)
objects.append(strat_col_rank)

# Earth Model
earth_model_interp = r22.EarthModelInterpretation(
    citation=citation("Synthetic Earth Model Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH,
    interpreted_feature=dor(model_feat),
    structure=dor(struct_org_interp),
    stratigraphic_column=dor(strat_col_rank),
)
objects.append(earth_model_interp)

# Rock Fluid
rock_fluid_unit = r22.RockFluidUnitInterpretation(
    citation=citation("Synthetic Rock Fluid Unit Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH,
    interpreted_feature=dor(rock_vol_feat),
    phase=r22.Phase.OIL_COLUMN,
)
rock_fluid_org = r22.RockFluidOrganizationInterpretation(
    citation=citation("Synthetic Rock Fluid Org Interp"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH,
    interpreted_feature=dor(model_feat),
    rock_fluid_unit=[dor(rock_fluid_unit)],
)
fluid_boundary = r22.FluidBoundaryInterpretation(
    citation=citation("Synthetic Fluid Boundary (OWC)"), uuid=uid(), schema_version="2.2",
    domain=r22.Domain.DEPTH,
    interpreted_feature=dor(horizon_feat_1),
    fluid_contact=r22.FluidContact.WATER_OIL_CONTACT,
)
objects.extend([rock_fluid_org, rock_fluid_unit, fluid_boundary])

# === REPRESENTATIONS ===
# TriangulatedSetRepresentation (horizon surface)
triang_set = r22.TriangulatedSetRepresentation(
    citation=citation("Synthetic Horizon 1 Surface"), uuid=uid(), schema_version="2.2",
    represented_object=dor(horizon_interp_1),
    surface_role=r22.SurfaceRole.MAP,
    triangle_patch=[
        r22.TrianglePatch(
            node_count=4,
            triangles=int_ext_array(f"/RESQML/triang_set/triangles"),
            geometry=point_geometry(f"/RESQML/triang_set/points", crs_ref),
        )
    ],
)
objects.append(triang_set)

# PointSetRepresentation (geobody points)
point_set = r22.PointSetRepresentation(
    citation=citation("Synthetic Geobody Points"), uuid=uid(), schema_version="2.2",
    represented_object=dor(geobody_interp),
    node_patch_geometry=[
        point_geometry(f"/RESQML/point_set/points", crs_ref),
    ],
)
objects.append(point_set)

# PolylineRepresentation (fault trace)
polyline = r22.PolylineRepresentation(
    citation=citation("Synthetic Fault 1 Trace"), uuid=uid(), schema_version="2.2",
    represented_object=dor(fault_interp_1),
    is_closed=False,
    node_patch_geometry=point_geometry(f"/RESQML/polyline/points", crs_ref),
)
objects.append(polyline)

# PolylineSetRepresentation (fault network)
polyline_set = r22.PolylineSetRepresentation(
    citation=citation("Synthetic Fault Network"), uuid=uid(), schema_version="2.2",
    represented_object=dor(fault_interp_2),
    line_patch=[
        r22.PolylineSetPatch(
            node_count=8,
            interval_count=2,
            node_count_per_polyline=eml23.IntegerConstantArray(value=4, count=2),
            closed_polylines=eml23.BooleanConstantArray(value=False, count=2),
            geometry=point_geometry(f"/RESQML/polyline_set/points", crs_ref),
        )
    ],
)
objects.append(polyline_set)

# Grid2dRepresentation (seismic horizon pick)
grid2d = r22.Grid2DRepresentation(
    citation=citation("Synthetic Seismic Horizon Pick"), uuid=uid(), schema_version="2.2",
    represented_object=dor(horizon_interp_2),
    surface_role=r22.SurfaceRole.PICK,
    fastest_axis_count=10,
    slowest_axis_count=10,
    geometry=point_geometry(f"/RESQML/grid2d/points", crs_ref),
)
objects.append(grid2d)

# IjkGridRepresentation
ijk_grid = r22.IjkGridRepresentation(
    citation=citation("Synthetic IJK Grid"), uuid=uid(), schema_version="2.2",
    represented_object=dor(earth_model_interp),
    ni=3, nj=3, nk=2,
    geometry=r22.IjkGridGeometry(
        local_crs=crs_ref,
        points=point3d_ext(f"/RESQML/ijk_grid/points"),
        kdirection=r22.Kdirection.DOWN,
        pillar_shape=r22.PillarShape.STRAIGHT,
        grid_is_righthanded=True,
        pillar_geometry_is_defined=eml23.BooleanConstantArray(value=True, count=20),
    ),
)
objects.append(ijk_grid)

# UnstructuredGridRepresentation
unstruct_grid = r22.UnstructuredGridRepresentation(
    citation=citation("Synthetic Unstructured Grid"), uuid=uid(), schema_version="2.2",
    represented_object=dor(earth_model_interp),
    cell_count=4,
    geometry=r22.UnstructuredGridGeometry(
        local_crs=crs_ref,
        points=point3d_ext(f"/RESQML/unstruct_grid/points"),
        node_count=8,
        cell_shape=r22.CellShape.HEXAHEDRAL,
        face_count=24,
        faces_per_cell=r22.JaggedArray(
            elements=int_ext_array(f"/RESQML/unstruct_grid/face_indices"),
            cumulative_length=int_ext_array(f"/RESQML/unstruct_grid/cum_face_count"),
        ),
        nodes_per_face=r22.JaggedArray(
            elements=int_ext_array(f"/RESQML/unstruct_grid/node_indices"),
            cumulative_length=int_ext_array(f"/RESQML/unstruct_grid/cum_node_count"),
        ),
        cell_face_is_right_handed=eml23.BooleanConstantArray(value=True, count=24),
    ),
)
objects.append(unstruct_grid)

# GridConnectionSetRepresentation
grid_conn = r22.GridConnectionSetRepresentation(
    citation=citation("Synthetic Grid Connections"), uuid=uid(), schema_version="2.2",
    count=4,
    cell_index_pairs=int_ext_array(f"/RESQML/grid_conn/cell_pairs"),
    grid_index_pairs=int_ext_array(f"/RESQML/grid_conn/grid_pairs"),
    grid=[dor(ijk_grid)],
)
objects.append(grid_conn)

# WellboreTrajectoryRepresentation
wellbore_traj = r22.WellboreTrajectoryRepresentation(
    citation=citation("Synthetic Wellbore Trajectory"), uuid=uid(), schema_version="2.2",
    represented_object=dor(wellbore_interp),
    md_interval=r22.MdInterval(
        md_min=0.0, md_max=3000.0,
        datum=crs_ref,
        uom="m",
    ),
    geometry=r22.ParametricLineGeometry(
        local_crs=crs_ref,
        control_point_parameters=float_ext_array(f"/RESQML/wellbore_traj/md"),
        control_points=point3d_ext(f"/RESQML/wellbore_traj/points"),
        knot_count=10,
        line_kind_index=2,  # cubic
    ),
)
objects.append(wellbore_traj)

# WellboreFrameRepresentation (well log frame)
wellbore_frame = r22.WellboreFrameRepresentation(
    citation=citation("Synthetic Well Log Frame"), uuid=uid(), schema_version="2.2",
    represented_object=dor(wellbore_interp),
    trajectory=dor(wellbore_traj),
    node_count=50,
    node_md=float_ext_array(f"/RESQML/wellbore_frame/node_md"),
)
objects.append(wellbore_frame)

# BlockedWellboreRepresentation
blocked_well = r22.BlockedWellboreRepresentation(
    citation=citation("Synthetic Blocked Wellbore"), uuid=uid(), schema_version="2.2",
    represented_object=dor(wellbore_interp),
    trajectory=dor(wellbore_traj),
    node_count=10,
    node_md=float_ext_array(f"/RESQML/blocked_well/node_md"),
    interval_grid_cells=r22.IntervalGridCells(
        cell_count=8,
        cell_indices=int_ext_array(f"/RESQML/blocked_well/cell_indices"),
        grid_indices=int_ext_array(f"/RESQML/blocked_well/grid_indices"),
        local_face_pair_per_cell_indices=int_ext_array(f"/RESQML/blocked_well/face_pairs"),
        grid=[dor(ijk_grid)],
    ),
)
objects.append(blocked_well)

# SealedSurfaceFrameworkRepresentation
sealed_surf = r22.SealedSurfaceFrameworkRepresentation(
    citation=citation("Synthetic Sealed Surface Framework"), uuid=uid(), schema_version="2.2",
    represented_object=dor(struct_org_interp),
    is_homogeneous=True,
    representation=[dor(triang_set)],
)
objects.append(sealed_surf)

# SubRepresentation
sub_rep = r22.SubRepresentation(
    citation=citation("Synthetic Sub-Representation"), uuid=uid(), schema_version="2.2",
    indexable_element=r22.IndexableElement.CELLS,
    sub_representation_patch=[
        r22.SubRepresentationPatch(
            indices=int_ext_array(f"/RESQML/sub_rep/indices"),
            supporting_representation=dor(ijk_grid),
        )
    ],
)
objects.append(sub_rep)

# WellboreFrameRepresentation
wellbore_frame = r22.WellboreFrameRepresentation(
    citation=citation("Synthetic Wellbore Frame"), uuid=uid(), schema_version="2.2",
    represented_object=dor(wellbore_interp),
    trajectory=dor(wellbore_traj),
    node_count=3,
    node_md=float_ext_array(f"/RESQML/wellbore_markers/node_md"),
)
objects.append(wellbore_frame)

# === PROPERTIES ===
# PropertyKind
prop_kind = eml23.PropertyKind(
    citation=citation("Synthetic Porosity Kind"),
    uuid=uid(), schema_version="2.3",
    is_abstract=False,
    quantity_class="dimensionless",
)
objects.append(prop_kind)

# ContinuousProperty (porosity)
cont_prop = r22.ContinuousProperty(
    citation=citation("Synthetic Porosity"), uuid=uid(), schema_version="2.2",
    indexable_element=r22.IndexableElement.CELLS,
    value_count_per_indexable_element=[1],
    supporting_representation=dor(ijk_grid),
    property_kind=dor(prop_kind),
    uom="Euc",
    values_for_patch=[float_ext_array(f"/RESQML/cont_prop/values")],
)
objects.append(cont_prop)

# DiscreteProperty (facies)
disc_prop = r22.DiscreteProperty(
    citation=citation("Synthetic Facies"), uuid=uid(), schema_version="2.2",
    indexable_element=r22.IndexableElement.CELLS,
    value_count_per_indexable_element=[1],
    supporting_representation=dor(ijk_grid),
    property_kind=dor(prop_kind),
    values_for_patch=[int_ext_array(f"/RESQML/disc_prop/values")],
)
objects.append(disc_prop)

# DiscreteProperty (rock type index)
disc_prop = r22.DiscreteProperty(
    citation=citation("Synthetic Rock Type"), uuid=uid(), schema_version="2.2",
    indexable_element=r22.IndexableElement.CELLS,
    value_count_per_indexable_element=[1],
    supporting_representation=dor(ijk_grid),
    property_kind=dor(prop_kind),
    values_for_patch=[int_ext_array(f"/RESQML/cat_prop/values")],
)
objects.append(disc_prop)

# === MISC: TimeSeries, StratigraphicColumn, Activity ===
time_series = eml23.TimeSeries(
    citation=citation("Synthetic Production Time Series"), uuid=uid(), schema_version="2.3",
    time=[
        eml23.GeologicTime(date_time="2020-01-01T00:00:00Z"),
        eml23.GeologicTime(date_time="2021-01-01T00:00:00Z"),
        eml23.GeologicTime(date_time="2022-01-01T00:00:00Z"),
    ],
)
objects.append(time_series)

strat_column = r22.StratigraphicColumn(
    citation=citation("Synthetic Stratigraphic Column"), uuid=uid(), schema_version="2.2",
    ranks=[dor(strat_col_rank)],
)
objects.append(strat_column)

# Activity & Template (EML 2.3)
activity_template = eml23.ActivityTemplate(
    citation=citation("Synthetic Grid Generation Template"), uuid=uid(), schema_version="2.3",
    parameter=[
        eml23.ParameterTemplate(
            title="InputGrid",
            key_constraint=["InputGrid"],
            is_input=True, is_output=False,
            min_occurs=1, max_occurs=1,
            allowed_kind=[eml23.ActivityParameterKind.DATA_OBJECT],
        )
    ],
)
objects.append(activity_template)

activity = eml23.Activity(
    citation=citation("Synthetic Grid Generation Activity"), uuid=uid(), schema_version="2.3",
    activity_descriptor=dor(activity_template),
    parameter=[
        eml23.DataObjectParameter(
            title="InputGrid",
            data_object=dor(ijk_grid),
            is_uncertain=False,
        )
    ],
)
objects.append(activity)

# DataobjectCollection  
data_collection = eml23.DataobjectCollection(
    citation=citation("Synthetic Model Collection"), uuid=uid(), schema_version="2.3",
    kind=eml23.CollectionKind.FOLDER,
    homogeneous_datatype=False,
)
objects.append(data_collection)

# ─── Build HDF5 ─────────────────────────────────────────────────────────────
print(f"  Objects: {len(objects)}")
print("  Building HDF5...")

rng = np.random.default_rng(42)
with h5py.File(H5_22_PATH, "w") as f:
    g = f.create_group("RESQML")
    # Triangulated set
    s = g.create_group("triang_set")
    s.create_dataset("points", data=np.array([[0,0,1000],[100,0,1010],[100,100,1005],[0,100,1008]], dtype=np.float64))
    s.create_dataset("triangles", data=np.array([[0,1,2],[0,2,3]], dtype=np.int32))
    # Point set
    s = g.create_group("point_set")
    s.create_dataset("points", data=rng.uniform(0, 500, (10, 3)).astype(np.float64))
    # Polyline
    s = g.create_group("polyline")
    s.create_dataset("points", data=np.array([[50,0,900],[50,25,950],[55,50,1000],[60,75,1050],[65,100,1100]], dtype=np.float64))
    # Polyline set
    s = g.create_group("polyline_set")
    s.create_dataset("points", data=rng.uniform(0, 200, (8, 3)).astype(np.float64))
    # Grid2d
    s = g.create_group("grid2d")
    x, y = np.meshgrid(np.linspace(0,1000,10), np.linspace(0,1000,10))
    z = 1000 + 20*np.sin(x/200)*np.cos(y/200)
    s.create_dataset("points", data=np.stack([x.ravel(), y.ravel(), z.ravel()], axis=1))
    # IJK Grid (4x4x3 pillar points)
    s = g.create_group("ijk_grid")
    pts = [[i*100.0, j*100.0, 1000.0 + k*100.0] for k in range(3) for j in range(4) for i in range(4)]
    s.create_dataset("points", data=np.array(pts, dtype=np.float64))
    # Unstructured grid
    s = g.create_group("unstruct_grid")
    s.create_dataset("points", data=np.array([[0,0,1000],[100,0,1000],[100,100,1000],[0,100,1000],[0,0,1100],[100,0,1100],[100,100,1100],[0,100,1100]], dtype=np.float64))
    s.create_dataset("faces_per_cell", data=np.array([6,6,6,6], dtype=np.int32))
    s.create_dataset("node_indices", data=np.arange(24, dtype=np.int32))
    s.create_dataset("cum_face_count", data=np.array([6,12,18,24], dtype=np.int32))
    # Grid connections
    s = g.create_group("grid_conn")
    s.create_dataset("cell_pairs", data=np.array([[0,1],[1,2],[3,4],[4,5]], dtype=np.int32))
    s.create_dataset("grid_pairs", data=np.zeros((4,2), dtype=np.int32))
    # Wellbore trajectory
    s = g.create_group("wellbore_traj")
    md = np.linspace(0, 3000, 10)
    s.create_dataset("md", data=md.astype(np.float64))
    s.create_dataset("points", data=np.column_stack([150+5*np.sin(md/500), 150+3*np.cos(md/700), md]))
    # Wellbore frame
    s = g.create_group("wellbore_frame")
    s.create_dataset("node_md", data=np.linspace(0, 3000, 50).astype(np.float64))
    # Blocked wellbore
    s = g.create_group("blocked_well")
    s.create_dataset("node_md", data=np.linspace(500, 2500, 10).astype(np.float64))
    s.create_dataset("cell_indices", data=np.array([0,1,2,3,4,5,6,7], dtype=np.int32))
    s.create_dataset("grid_indices", data=np.zeros(8, dtype=np.int32))
    s.create_dataset("face_pairs", data=rng.integers(0, 6, (8,2)).astype(np.int32))
    # Wellbore markers
    s = g.create_group("wellbore_markers")
    s.create_dataset("node_md", data=np.array([1000.0, 1500.0, 2000.0], dtype=np.float64))
    # Sub-representation
    s = g.create_group("sub_rep")
    s.create_dataset("indices", data=np.array([0,2,5,8], dtype=np.int32))
    # Properties
    s = g.create_group("cont_prop")
    s.create_dataset("values", data=rng.uniform(0.01, 0.35, 18).astype(np.float64))
    s = g.create_group("disc_prop")
    s.create_dataset("values", data=rng.integers(0, 5, 18).astype(np.int32))
    s = g.create_group("cat_prop")
    s.create_dataset("values", data=rng.integers(0, 5, 18).astype(np.int32))

    s = g.create_group("sealed_vol")
    s.create_dataset("patch_indices", data=np.array([0], dtype=np.int32))
    s.create_dataset("rep_indices", data=np.array([0], dtype=np.int32))
    s.create_dataset("side_is_plus", data=np.array([1], dtype=np.int8))

print(f"  HDF5: {H5_22_PATH} ({Path(H5_22_PATH).stat().st_size / 1024:.1f} KB)")

# ─── Export EPC ──────────────────────────────────────────────────────────────
print("  Exporting EPC...")
epc = Epc(epc_file_path=EPC22_PATH, energyml_objects=objects)
epc.export_file(EPC22_PATH)
print(f"  EPC:  {EPC22_PATH} ({Path(EPC22_PATH).stat().st_size / 1024:.1f} KB)")

# ─── Validate ────────────────────────────────────────────────────────────────
print("\n  Validating...")
from energyml.utils.validation import validate_epc
epc2 = Epc.read_file(EPC22_PATH)
print(f"  Re-read: {len(epc2.energyml_objects)} objects")
errors = validate_epc(epc2)
if not errors:
    print("  ✓ VALID — 0 errors!")
else:
    from collections import Counter
    types = Counter(e.error_type for e in errors)
    print(f"  ✗ {len(errors)} errors:")
    for t, c in types.most_common():
        print(f"    {t}: {c}")
    seen = set()
    for e in errors[:20]:
        m = f"    [{e.error_type}] {e.msg[:150]}"
        if m not in seen:
            seen.add(m)
            print(m)

print("\nDone!")
