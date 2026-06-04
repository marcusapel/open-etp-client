"""Build a synthetic RESQML 2.0.1 EPC with energyml dataclasses (schema-valid)."""
import uuid
import numpy as np
import h5py
from pathlib import Path
from datetime import datetime

from energyml.resqml.v2_0_1 import resqmlv2 as r201
from energyml.eml.v2_0 import commonv2 as eml20
from energyml.utils.epc import Epc

EPC_PATH = "/tmp/synthetic201.epc"
H5_PATH = "/tmp/synthetic201.h5"
H5_URI = "synthetic201.h5"

def uid():
    return str(uuid.uuid4())

def citation(title):
    return eml20.Citation(
        title=title,
        originator="RDDMS Synthetic",
        creation="2026-06-04T00:00:00Z",
        format="energyml Python",
    )

# HDF5 proxy UUID (EpcExternalPartReference)
hdf_proxy_uuid = uid()

def hdf5_dataset(path):
    return r201.Hdf5Dataset(
        path_in_hdf_file=path,
        hdf_proxy=eml20.DataObjectReference(
            content_type="application/x-eml+xml;version=2.0;type=obj_EpcExternalPartReference",
            title="HDF5 Proxy",
            uuid=hdf_proxy_uuid,
        ),
    )

def int_hdf(path, null_value=-1):
    return r201.IntegerHdf5Array(values=hdf5_dataset(path), null_value=null_value)

def float_hdf(path):
    return r201.DoubleHdf5Array(values=hdf5_dataset(path))

def point3d_hdf(path):
    return r201.Point3DHdf5Array(coordinates=hdf5_dataset(path))

def dor(obj):
    """Create a DataObjectReference for a 2.0.1 object."""
    cls_name = type(obj).__name__
    # Special case: class names vs XML type names differ in casing
    type_name_map = {
        "LocalDepth3DCrs": "LocalDepth3dCrs",
        "Grid2DRepresentation": "Grid2dRepresentation",
        "Point3DHdf5Array": "Point3dHdf5Array",
    }
    xml_type = type_name_map.get(cls_name, cls_name)
    content_type = f"application/x-resqml+xml;version=2.0;type=obj_{xml_type}"
    return eml20.DataObjectReference(
        content_type=content_type,
        title=obj.citation.title,
        uuid=obj.uuid,
    )

def point_geometry(path, crs_ref):
    return r201.PointGeometry(
        local_crs=crs_ref,
        points=point3d_hdf(path),
    )

print("Building RESQML 2.0.1 synthetic dataset...")
objects = []

# === CRS ===
crs = r201.LocalDepth3DCrs(
    citation=citation("Synthetic Local Depth CRS"),
    uuid=uid(), schema_version="2.0",
    xoffset=0.0, yoffset=0.0, zoffset=0.0,
    zincreasing_downward=True,
    projected_axis_order=r201.AxisOrder2D.EASTING_NORTHING,
    projected_uom=r201.LengthUom.M,
    vertical_uom=r201.LengthUom.M,
    areal_rotation=r201.PlaneAngleMeasure(value=0.0, uom=r201.PlaneAngleUom.DEGA),
    projected_crs=eml20.ProjectedCrsEpsgCode(epsg_code=32631),
    vertical_crs=eml20.VerticalCrsEpsgCode(epsg_code=5714),
)
objects.append(crs)
crs_ref = dor(crs)

# === FEATURES ===
horizon_feat_1 = r201.GeneticBoundaryFeature(
    citation=citation("Synthetic Horizon 1"), uuid=uid(), schema_version="2.0",
    genetic_boundary_kind=r201.GeneticBoundaryKind.HORIZON,
)
horizon_feat_2 = r201.GeneticBoundaryFeature(
    citation=citation("Synthetic Horizon 2"), uuid=uid(), schema_version="2.0",
    genetic_boundary_kind=r201.GeneticBoundaryKind.HORIZON,
)
fault_feat_1 = r201.TectonicBoundaryFeature(
    citation=citation("Synthetic Fault 1"), uuid=uid(), schema_version="2.0",
    tectonic_boundary_kind=r201.TectonicBoundaryKind.FAULT,
)
fault_feat_2 = r201.TectonicBoundaryFeature(
    citation=citation("Synthetic Fault 2"), uuid=uid(), schema_version="2.0",
    tectonic_boundary_kind=r201.TectonicBoundaryKind.FAULT,
)
objects.extend([horizon_feat_1, horizon_feat_2, fault_feat_1, fault_feat_2])

org_feat = r201.OrganizationFeature(
    citation=citation("Synthetic Earth Model"), uuid=uid(), schema_version="2.0",
    organization_kind=r201.OrganizationKind.EARTH_MODEL,
)
objects.append(org_feat)

rock_vol_feat = r201.GeologicUnitFeature(
    citation=citation("Synthetic Rock Volume"), uuid=uid(), schema_version="2.0",
)
objects.append(rock_vol_feat)

wellbore_feat = r201.WellboreFeature(
    citation=citation("Synthetic Wellbore"), uuid=uid(), schema_version="2.0",
)
objects.append(wellbore_feat)

seismic_feat = r201.SeismicLatticeFeature(
    citation=citation("Synthetic Seismic Survey"), uuid=uid(), schema_version="2.0",
    crossline_count=100,
    crossline_index_increment=1,
    first_crossline_index=1000,
    first_inline_index=500,
    inline_count=200,
    inline_index_increment=1,
)
objects.append(seismic_feat)

# === INTERPRETATIONS ===
horizon_interp_1 = r201.HorizonInterpretation(
    citation=citation("Synthetic Horizon 1 Interp"), uuid=uid(), schema_version="2.0",
    domain=r201.Domain.DEPTH,
    interpreted_feature=dor(horizon_feat_1),
)
horizon_interp_2 = r201.HorizonInterpretation(
    citation=citation("Synthetic Horizon 2 Interp"), uuid=uid(), schema_version="2.0",
    domain=r201.Domain.DEPTH,
    interpreted_feature=dor(horizon_feat_2),
)
fault_interp_1 = r201.FaultInterpretation(
    citation=citation("Synthetic Fault 1 Interp"), uuid=uid(), schema_version="2.0",
    domain=r201.Domain.DEPTH,
    interpreted_feature=dor(fault_feat_1),
    is_listric=False,
)
fault_interp_2 = r201.FaultInterpretation(
    citation=citation("Synthetic Fault 2 Interp"), uuid=uid(), schema_version="2.0",
    domain=r201.Domain.DEPTH,
    interpreted_feature=dor(fault_feat_2),
    is_listric=False,
)
objects.extend([horizon_interp_1, horizon_interp_2, fault_interp_1, fault_interp_2])

wellbore_interp = r201.WellboreInterpretation(
    citation=citation("Synthetic Wellbore Interp"), uuid=uid(), schema_version="2.0",
    domain=r201.Domain.DEPTH,
    interpreted_feature=dor(wellbore_feat),
    is_drilled=True,
)
objects.append(wellbore_interp)

struct_org_interp = r201.StructuralOrganizationInterpretation(
    citation=citation("Synthetic Structural Org Interp"), uuid=uid(), schema_version="2.0",
    domain=r201.Domain.DEPTH,
    interpreted_feature=dor(org_feat),
    ordering_criteria=r201.OrderingCriteria.AGE,
    faults=[dor(fault_interp_1), dor(fault_interp_2)],
    horizons=[
        r201.HorizonInterpretationIndex(index=0, horizon=dor(horizon_interp_1)),
        r201.HorizonInterpretationIndex(index=1, horizon=dor(horizon_interp_2)),
    ],
)
objects.append(struct_org_interp)

earth_model_interp = r201.EarthModelInterpretation(
    citation=citation("Synthetic Earth Model Interp"), uuid=uid(), schema_version="2.0",
    domain=r201.Domain.DEPTH,
    interpreted_feature=dor(org_feat),
    structure=dor(struct_org_interp),
)
objects.append(earth_model_interp)

# === REPRESENTATIONS ===
# TriangulatedSetRepresentation
triang_set = r201.TriangulatedSetRepresentation(
    citation=citation("Synthetic Horizon 1 Surface"), uuid=uid(), schema_version="2.0",
    represented_interpretation=dor(horizon_interp_1),
    surface_role=r201.SurfaceRole.MAP,
    triangle_patch=[
        r201.TrianglePatch(
            patch_index=0,
            count=2,
            node_count=4,
            triangles=int_hdf("/RESQML/triang_set/triangles"),
            geometry=point_geometry("/RESQML/triang_set/points", crs_ref),
        )
    ],
)
objects.append(triang_set)

# Grid2dRepresentation
grid2d = r201.Grid2DRepresentation(
    citation=citation("Synthetic Seismic Horizon Pick"), uuid=uid(), schema_version="2.0",
    represented_interpretation=dor(horizon_interp_2),
    surface_role=r201.SurfaceRole.PICK,
    grid2d_patch=r201.Grid2DPatch(
        patch_index=0,
        fastest_axis_count=10,
        slowest_axis_count=10,
        geometry=point_geometry("/RESQML/grid2d/points", crs_ref),
    ),
)
objects.append(grid2d)

# IjkGridRepresentation
ijk_grid = r201.IjkGridRepresentation(
    citation=citation("Synthetic IJK Grid"), uuid=uid(), schema_version="2.0",
    represented_interpretation=dor(earth_model_interp),
    ni=3, nj=3, nk=2,
    geometry=r201.IjkGridGeometry(
        local_crs=crs_ref,
        points=point3d_hdf("/RESQML/ijk_grid/points"),
        kdirection=r201.Kdirection.DOWN,
        pillar_shape=r201.PillarShape.STRAIGHT,
        grid_is_righthanded=True,
        pillar_geometry_is_defined=r201.BooleanConstantArray(value=True, count=16),
    ),
)
objects.append(ijk_grid)

# WellboreTrajectoryRepresentation
wellbore_traj = r201.WellboreTrajectoryRepresentation(
    citation=citation("Synthetic Wellbore Trajectory"), uuid=uid(), schema_version="2.0",
    represented_interpretation=dor(wellbore_interp),
    start_md=0.0,
    finish_md=3000.0,
    md_uom=r201.LengthUom.M,
    md_datum=crs_ref,
    geometry=r201.ParametricLineGeometry(
        local_crs=crs_ref,
        control_point_parameters=float_hdf("/RESQML/wellbore_traj/md"),
        control_points=point3d_hdf("/RESQML/wellbore_traj/points"),
        knot_count=10,
        line_kind_index=2,
    ),
)
objects.append(wellbore_traj)

# ContinuousProperty (porosity)
prop_kind = r201.PropertyKind(
    citation=citation("Synthetic Porosity Kind"), uuid=uid(), schema_version="2.0",
    naming_system="Energistics",
    is_abstract=False,
    representative_uom=r201.ResqmlUom.EUC,
    parent_property_kind=r201.StandardPropertyKind(kind=r201.ResqmlPropertyKind.POROSITY),
)
objects.append(prop_kind)

cont_prop = r201.ContinuousProperty(
    citation=citation("Synthetic Porosity"), uuid=uid(), schema_version="2.0",
    count=1,
    indexable_element=r201.IndexableElements.CELLS,
    supporting_representation=dor(ijk_grid),
    property_kind=r201.LocalPropertyKind(local_property_kind=dor(prop_kind)),
    uom=r201.ResqmlUom.EUC,
    patch_of_values=[
        r201.PatchOfValues(
            representation_patch_index=0,
            values=float_hdf("/RESQML/cont_prop/values"),
        ),
    ],
)
objects.append(cont_prop)

# EpcExternalPartReference (HDF5 proxy)
epc_ext = eml20.EpcExternalPartReference(
    citation=citation("HDF5 Proxy"),
    uuid=hdf_proxy_uuid, schema_version="2.0",
    mime_type="application/x-hdf5",
)
objects.append(epc_ext)

print(f"  Objects: {len(objects)}")

# ─── Build HDF5 ─────────────────────────────────────────────────────────────
print("  Building HDF5...")
rng = np.random.default_rng(42)

with h5py.File(H5_PATH, "w") as f:
    g = f.create_group("RESQML")

    # Triangulated set
    s = g.create_group("triang_set")
    s.create_dataset("points", data=np.array([[0,0,1000],[100,0,1000],[100,100,1000],[0,100,1000]], dtype=np.float64))
    s.create_dataset("triangles", data=np.array([[0,1,2],[0,2,3]], dtype=np.int32))

    # Grid2d
    s = g.create_group("grid2d")
    x = np.linspace(0, 900, 10)
    y = np.linspace(0, 900, 10)
    xx, yy = np.meshgrid(x, y)
    zz = 1000 + 50 * np.sin(xx/300) * np.cos(yy/300)
    pts_2d = np.column_stack([xx.ravel(), yy.ravel(), zz.ravel()])
    s.create_dataset("points", data=pts_2d.astype(np.float64))

    # IJK grid
    s = g.create_group("ijk_grid")
    pillars = []
    for j in range(4):
        for i in range(4):
            pillars.append([i*100, j*100, 1000 + rng.uniform(-10, 10)])
            pillars.append([i*100, j*100, 1200 + rng.uniform(-10, 10)])
    # (ni+1)*(nj+1)*nk+1 = 4*4*3 = 48 points actually
    # Simplified: just pillar control points
    pts = []
    for j in range(4):
        for i in range(4):
            for k in range(3):
                pts.append([i*100.0, j*100.0, 1000.0 + k*100.0 + rng.uniform(-5, 5)])
    s.create_dataset("points", data=np.array(pts, dtype=np.float64))

    # Wellbore trajectory
    s = g.create_group("wellbore_traj")
    md = np.linspace(0, 3000, 10)
    s.create_dataset("md", data=md.astype(np.float64))
    s.create_dataset("points", data=np.column_stack([150+5*np.sin(md/500), 150+3*np.cos(md/700), md]))

    # Properties
    s = g.create_group("cont_prop")
    s.create_dataset("values", data=rng.uniform(0.01, 0.35, 18).astype(np.float64))

print(f"  HDF5: {H5_PATH} ({Path(H5_PATH).stat().st_size / 1024:.1f} KB)")

# ─── Export EPC ──────────────────────────────────────────────────────────────
print("  Exporting EPC...")
epc = Epc(epc_file_path=EPC_PATH, energyml_objects=objects)
epc.export_file(EPC_PATH)
print(f"  EPC:  {EPC_PATH} ({Path(EPC_PATH).stat().st_size / 1024:.1f} KB)")

# ─── Validate ────────────────────────────────────────────────────────────────
print("\n  Validating...")
from energyml.utils.validation import validate_epc
epc2 = Epc.read_file(EPC_PATH)
print(f"  Re-read: {len(epc2.energyml_objects)} objects")
errors = validate_epc(epc2)
if not errors:
    print("  ✓ VALID — 0 errors!")
else:
    from collections import Counter
    severity = Counter(str(e.error_type).split('.')[-1] for e in errors)
    print(f"  ✗ {len(errors)} errors:")
    for s, c in severity.items():
        print(f"    {s}: {c}")
    for e in errors[:15]:
        print(f"    {e}")

print("\nDone!")
