/**
 * Shared test helpers — mock EtpClient factory and test fixtures.
 */

import express from "express";
import { EtpClient, Resource, DataObject, Dataspace } from "../../src/etp";

// ─── Mock EtpClient ──────────────────────────────────────────────────────────

export interface MockEtpClientOverrides {
  getDataspaces?: () => Promise<Dataspace[]>;
  putDataspaces?: (dataspaces: any[]) => Promise<void>;
  deleteDataspaces?: (paths: string[]) => Promise<void>;
  getResources?: (uri: string) => Promise<Resource[]>;
  getDataObjects?: (uris: string[]) => Promise<DataObject[]>;
  putDataObjects?: (objects: DataObject[]) => Promise<void>;
  deleteDataObjects?: (uris: string[]) => Promise<void>;
  isConnected?: boolean;
}

export function createMockEtpClient(overrides: MockEtpClientOverrides = {}): EtpClient {
  const mock = {
    isConnected: overrides.isConnected ?? true,
    getDataspaces: overrides.getDataspaces ?? jest.fn().mockResolvedValue([]),
    putDataspaces: overrides.putDataspaces ?? jest.fn().mockResolvedValue(undefined),
    deleteDataspaces: overrides.deleteDataspaces ?? jest.fn().mockResolvedValue(undefined),
    getResources: overrides.getResources ?? jest.fn().mockResolvedValue([]),
    getDataObjects: overrides.getDataObjects ?? jest.fn().mockResolvedValue([]),
    putDataObjects: overrides.putDataObjects ?? jest.fn().mockResolvedValue(undefined),
    deleteDataObjects: overrides.deleteDataObjects ?? jest.fn().mockResolvedValue(undefined),
    openSession: jest.fn().mockResolvedValue(undefined),
    closeSession: jest.fn().mockResolvedValue(undefined),
  } as unknown as EtpClient;
  return mock;
}

// ─── Fixtures ────────────────────────────────────────────────────────────────

export const FIXTURES = {
  dataspaces: [
    { uri: "eml:///dataspace('test/drogon')", path: "test/drogon", lastChanged: "2025-01-01T00:00:00Z" },
    { uri: "eml:///dataspace('maap/witsml')", path: "maap/witsml", lastChanged: "2025-06-01T00:00:00Z" },
  ] as Dataspace[],

  resources: [
    {
      uri: "eml:///dataspace('test/drogon')/resqml22.IjkGridRepresentation('grid-001')",
      name: "Drogon Grid",
      dataObjectType: "resqml22.IjkGridRepresentation",
      uuid: "grid-001",
      lastChanged: "2025-01-15T12:00:00Z",
    },
    {
      uri: "eml:///dataspace('test/drogon')/resqml22.Grid2dRepresentation('surf-001')",
      name: "Top Valysar",
      dataObjectType: "resqml22.Grid2dRepresentation",
      uuid: "surf-001",
      lastChanged: "2025-01-15T12:00:00Z",
    },
    {
      uri: "eml:///dataspace('test/drogon')/resqml22.WellboreFeature('wb-001')",
      name: "55/33-A-1",
      dataObjectType: "resqml22.WellboreFeature",
      uuid: "wb-001",
      lastChanged: "2025-01-15T12:00:00Z",
    },
    {
      uri: "eml:///dataspace('test/drogon')/resqml22.ContinuousProperty('prop-001')",
      name: "PHIT",
      dataObjectType: "resqml22.ContinuousProperty",
      uuid: "prop-001",
      lastChanged: "2025-01-15T12:00:00Z",
    },
    {
      uri: "eml:///dataspace('test/drogon')/witsml21.Log('log-001')",
      name: "Gamma Ray",
      dataObjectType: "witsml21.Log",
      uuid: "log-001",
      lastChanged: "2025-01-15T12:00:00Z",
    },
  ] as Resource[],

  dataObjects: [
    {
      resource: {
        uri: "eml:///dataspace('test/drogon')/resqml22.IjkGridRepresentation('grid-001')",
        name: "Drogon Grid",
        dataObjectType: "resqml22.IjkGridRepresentation",
        uuid: "grid-001",
      },
      data: `<?xml version="1.0" encoding="utf-8"?>
<resqml22:IjkGridRepresentation xmlns:resqml22="http://www.energistics.org/energyml/data/resqmlv2"
  uuid="grid-001" schemaVersion="2.2">
  <Citation><Title>Drogon Grid</Title></Citation>
  <Ni>100</Ni><Nj>100</Nj><Nk>50</Nk>
</resqml22:IjkGridRepresentation>`,
    },
    {
      resource: {
        uri: "eml:///dataspace('test/drogon')/resqml22.Grid2dRepresentation('surf-001')",
        name: "Top Valysar",
        dataObjectType: "resqml22.Grid2dRepresentation",
        uuid: "surf-001",
      },
      data: `<?xml version="1.0" encoding="utf-8"?>
<resqml22:Grid2dRepresentation xmlns:resqml22="http://www.energistics.org/energyml/data/resqmlv2"
  uuid="surf-001" schemaVersion="2.2">
  <Citation><Title>Top Valysar</Title></Citation>
</resqml22:Grid2dRepresentation>`,
    },
  ] as DataObject[],

  witsmlWellXml: `<?xml version="1.0" encoding="UTF-8"?>
<logs xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <log uid="log-100">
    <nameWell>Drogon-1</nameWell>
    <name>Gamma Ray Log</name>
    <indexCurve>DEPTH</indexCurve>
    <logCurveInfo><mnemonic>DEPTH</mnemonic><unit>m</unit></logCurveInfo>
    <logCurveInfo><mnemonic>GR</mnemonic><unit>gAPI</unit></logCurveInfo>
    <logData>
      <data>1000.0, 45.2</data>
      <data>1000.5, 47.1</data>
    </logData>
  </log>
</logs>`,

  resqmlGridXml: `<?xml version="1.0" encoding="utf-8"?>
<resqml22:IjkGridRepresentation xmlns:resqml22="http://www.energistics.org/energyml/data/resqmlv2"
  uuid="aabbccdd-1234-5678-9abc-def012345678" schemaVersion="2.2">
  <eml:Citation xmlns:eml="http://www.energistics.org/energyml/data/commonv2">
    <eml:Title>Test Grid</eml:Title>
  </eml:Citation>
  <Ni>10</Ni><Nj>10</Nj><Nk>5</Nk>
</resqml22:IjkGridRepresentation>`,

  prodmlFluidXml: `<?xml version="1.0" encoding="utf-8"?>
<prodml22:FluidCharacterization xmlns:prodml22="http://www.energistics.org/energyml/data/prodmlv2"
  uuid="fc-0001-0002-0003-000000000001" schemaVersion="2.2">
  <eml:Citation xmlns:eml="http://www.energistics.org/energyml/data/commonv2">
    <eml:Title>PVT Model</eml:Title>
  </eml:Citation>
</prodml22:FluidCharacterization>`,
};
