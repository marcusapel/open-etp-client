import { ManifestBuilder } from "../../src/manifest/builder";

describe("ManifestBuilder", () => {
  const builder = new ManifestBuilder();
  const opts = {
    acl: { owners: ["o@x"], viewers: ["v@x"] },
    legal: { legaltags: ["tag-1"], otherRelevantDataCountries: ["NO"] },
  };

  it("builds M27 manifest with correct structure", () => {
    const objects = [
      {
        uri: "eml:///dataspace('test/ds')/resqml22.IjkGridRepresentation('grid-001')",
        type: "resqml22.IjkGridRepresentation",
        xml: "<IjkGridRepresentation/>",
        name: "Drogon Grid",
      },
      {
        uri: "eml:///dataspace('test/ds')/resqml22.ContinuousProperty('prop-001')",
        type: "resqml22.ContinuousProperty",
        xml: "<ContinuousProperty/>",
        name: "PHIT",
      },
    ];

    const manifest = builder.build(objects, "test/ds", opts);

    expect(manifest.kind).toBe("osdu:wks:Manifest:1.0.0");
    expect(manifest.ReferenceData).toEqual([]);
    expect(manifest.MasterData).toEqual([]);
    expect(manifest.Data.Datasets).toHaveLength(1);
    expect(manifest.Data.WorkProductComponents).toHaveLength(2);
  });

  it("maps IjkGridRepresentation to IjkGridRepresentation:1.1.0", () => {
    const objects = [
      {
        uri: "eml:///dataspace('ds')/resqml22.IjkGridRepresentation('g1')",
        type: "resqml22.IjkGridRepresentation",
        xml: "",
        name: "Grid",
      },
    ];

    const manifest = builder.build(objects, "ds", opts);
    const wpc = manifest.Data.WorkProductComponents[0];

    expect(wpc.kind).toBe("osdu:wks:work-product-component--IjkGridRepresentation:1.1.0");
    expect(wpc.data.DDMSDatasets).toEqual(["eml:///dataspace('ds')/resqml22.IjkGridRepresentation('g1')"]);
  });

  it("maps Grid2dRepresentation to StructureMap:1.0.0", () => {
    const objects = [
      {
        uri: "eml:///dataspace('ds')/resqml22.Grid2dRepresentation('s1')",
        type: "resqml22.Grid2dRepresentation",
        xml: "",
        name: "Top Valysar",
      },
    ];

    const manifest = builder.build(objects, "ds", opts);
    const wpc = manifest.Data.WorkProductComponents[0];

    expect(wpc.kind).toBe("osdu:wks:work-product-component--StructureMap:1.0.0");
  });

  it("maps ContinuousProperty to GenericProperty:1.2.0", () => {
    const objects = [
      {
        uri: "eml:///dataspace('ds')/resqml22.ContinuousProperty('p1')",
        type: "resqml22.ContinuousProperty",
        xml: "",
        name: "Porosity",
      },
    ];

    const manifest = builder.build(objects, "ds", opts);
    const wpc = manifest.Data.WorkProductComponents[0];

    expect(wpc.kind).toBe("osdu:wks:work-product-component--GenericProperty:1.2.0");
  });

  it("maps WellboreFeature to master-data--Wellbore:1.3.0 in MasterData", () => {
    const objects = [
      {
        uri: "eml:///dataspace('ds')/resqml22.WellboreFeature('wb1')",
        type: "resqml22.WellboreFeature",
        xml: "",
        name: "15/9-19 A",
      },
    ];

    const manifest = builder.build(objects, "ds", opts);

    expect(manifest.Data.WorkProductComponents).toHaveLength(0);
    expect(manifest.MasterData).toHaveLength(1);
    expect(manifest.MasterData[0].kind).toBe("osdu:wks:master-data--Wellbore:1.3.0");
  });

  it("skips MdDatum (metadata-only type)", () => {
    const objects = [
      {
        uri: "eml:///dataspace('ds')/resqml22.MdDatum('md1')",
        type: "resqml22.MdDatum",
        xml: "",
        name: "KB Datum",
      },
    ];

    const manifest = builder.build(objects, "ds", opts);

    expect(manifest.Data.WorkProductComponents).toHaveLength(0);
    expect(manifest.MasterData).toHaveLength(0);
  });

  it("creates single ETPDataspace dataset", () => {
    const objects = [
      {
        uri: "eml:///dataspace('proj/scenario')/resqml22.BoundaryFeature('f1')",
        type: "resqml22.BoundaryFeature",
        xml: "",
        name: "Horizon",
      },
    ];

    const manifest = builder.build(objects, "proj/scenario", opts);
    const ds = manifest.Data.Datasets[0];

    expect(ds.kind).toBe("osdu:wks:dataset--ETPDataspace:1.0.1");
    expect(ds.data.DatasetProperties.URI).toBe("eml:///dataspace('proj/scenario')");
    expect(ds.id).toBe("opendes:dataset--ETPDataspace:proj-scenario");
  });

  it("handles PRODML objects", () => {
    const objects = [
      {
        uri: "eml:///dataspace('ds')/prodml22.FluidCharacterization('fc1')",
        type: "prodml22.FluidCharacterization",
        xml: "",
        name: "PVT Model",
      },
    ];

    const manifest = builder.build(objects, "ds", opts);
    const wpc = manifest.Data.WorkProductComponents[0];

    expect(wpc.kind).toBe("osdu:wks:work-product-component--FluidCharacterization:1.0.0");
    expect(wpc.data.DDMSDatasets).toEqual(["eml:///dataspace('ds')/prodml22.FluidCharacterization('fc1')"]);
  });

  it("handles WITSML objects (Log → WellLog:1.2.0)", () => {
    const objects = [
      {
        uri: "eml:///dataspace('ds')/witsml21.Log('log1')",
        type: "witsml21.Log",
        xml: "",
        name: "Sonic",
      },
    ];

    const manifest = builder.build(objects, "ds", opts);
    const wpc = manifest.Data.WorkProductComponents[0];

    expect(wpc.kind).toBe("osdu:wks:work-product-component--WellLog:1.2.0");
  });

  it("normalizes RESQML 2.0.1 types (GeneticBoundaryFeature → BoundaryFeature)", () => {
    const objects = [
      {
        uri: "eml:///dataspace('ds')/resqml201.GeneticBoundaryFeature('hz1')",
        type: "resqml201.GeneticBoundaryFeature",
        xml: "",
        name: "Top Volve",
      },
    ];

    const manifest = builder.build(objects, "ds", opts);
    const wpc = manifest.Data.WorkProductComponents[0];

    expect(wpc.kind).toBe("osdu:wks:work-product-component--LocalBoundaryFeature:1.2.0");
  });

  it("maps LocalDepth3dCrs to reference_data", () => {
    const objects = [
      {
        uri: "eml:///dataspace('ds')/resqml22.LocalDepth3dCrs('crs1')",
        type: "resqml22.LocalDepth3dCrs",
        xml: "",
        name: "Project CRS",
      },
    ];

    const manifest = builder.build(objects, "ds", opts);

    expect(manifest.Data.WorkProductComponents).toHaveLength(0);
    expect(manifest.ReferenceData).toHaveLength(1);
    expect(manifest.ReferenceData[0].kind).toBe("osdu:wks:reference-data--LocalModelCompoundCrs:1.2.0");
  });
});
