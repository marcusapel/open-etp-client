import { WitsmlParser } from "../../src/witsml/parser";

describe("WitsmlParser", () => {
  const parser = new WitsmlParser();

  // ─── WITSML 1.4.1 ──────────────────────────────────────────────────────────

  describe("WITSML 1.4.1", () => {
    it("parses log with curves", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<logs xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <log uid="log-001">
    <nameWell>Drogon</nameWell>
    <name>Sonic</name>
    <indexCurve>DEPTH</indexCurve>
    <logCurveInfo><mnemonic>DEPTH</mnemonic><unit>m</unit></logCurveInfo>
    <logCurveInfo><mnemonic>DT</mnemonic><unit>us/ft</unit></logCurveInfo>
    <logData><data>0, 100</data></logData>
  </log>
</logs>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].uid).toBe("log-001");
      expect(objects[0].type).toBe("Log");
      expect(objects[0].name).toBe("Sonic");
      expect(objects[0].version).toBe("1.4.1");
      expect(objects[0].wellName).toBe("Drogon");
      expect(objects[0].curves).toHaveLength(2);
      expect(objects[0].curves![0].mnemonic).toBe("DEPTH");
      expect(objects[0].curves![1].mnemonic).toBe("DT");
      expect(objects[0].curves![1].unit).toBe("us/ft");
    });

    it("parses multiple logs from same document", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<logs xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <log uid="log-a"><name>GR</name></log>
  <log uid="log-b"><name>NPHI</name></log>
</logs>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(2);
      expect(objects[0].uid).toBe("log-a");
      expect(objects[1].uid).toBe("log-b");
    });

    it("parses trajectory", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<trajectorys xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <trajectory uid="traj-001">
    <nameWell>Well-A</nameWell>
    <nameWellbore>WB-01</nameWellbore>
    <name>Main Trajectory</name>
  </trajectory>
</trajectorys>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("Trajectory");
      expect(objects[0].name).toBe("Main Trajectory");
      expect(objects[0].wellName).toBe("Well-A");
      expect(objects[0].wellboreName).toBe("WB-01");
    });

    it("parses well", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<wells xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <well uid="well-001">
    <name>DROGON A-1</name>
    <numGovt>7220/8-1</numGovt>
    <country>Norway</country>
  </well>
</wells>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("Well");
      expect(objects[0].name).toBe("DROGON A-1");
      expect(objects[0].uid).toBe("well-001");
    });

    it("parses wellbore", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<wellbores xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <wellbore uid="wb-001" uidWell="well-001">
    <nameWell>DROGON A-1</nameWell>
    <name>WB-01</name>
  </wellbore>
</wellbores>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("Wellbore");
      expect(objects[0].name).toBe("WB-01");
      expect(objects[0].wellName).toBe("DROGON A-1");
    });

    it("parses mudLog", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<mudLogs xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <mudLog uid="ml-001">
    <nameWell>Well-A</nameWell>
    <nameWellbore>WB-01</nameWellbore>
    <name>Mud Log Run 1</name>
  </mudLog>
</mudLogs>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("MudLog");
      expect(objects[0].name).toBe("Mud Log Run 1");
    });

    it("parses rig", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rigs xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <rig uid="rig-001">
    <nameWell>Well-A</nameWell>
    <name>Deepsea Aberdeen</name>
  </rig>
</rigs>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("Rig");
      expect(objects[0].name).toBe("Deepsea Aberdeen");
    });

    it("parses tubular", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<tubulars xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <tubular uid="tub-001">
    <nameWell>Well-A</nameWell>
    <name>BHA Run 1</name>
  </tubular>
</tubulars>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("Tubular");
      expect(objects[0].name).toBe("BHA Run 1");
    });

    it("parses formationMarker", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<formationMarkers xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <formationMarker uid="fm-001">
    <nameWell>Well-A</nameWell>
    <name>Top Draupne</name>
  </formationMarker>
</formationMarkers>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("FormationMarker");
      expect(objects[0].name).toBe("Top Draupne");
    });

    it("parses cementJob", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<cementJobs xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <cementJob uid="cj-001">
    <nameWell>Well-A</nameWell>
    <name>Cement Surface Casing</name>
  </cementJob>
</cementJobs>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("CementJob");
      expect(objects[0].name).toBe("Cement Surface Casing");
    });

    it("parses bhaRun", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bhaRuns xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <bhaRun uid="bha-001">
    <nameWell>Well-A</nameWell>
    <name>BHA #1 12-1/4</name>
  </bhaRun>
</bhaRuns>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("BhaRun");
      expect(objects[0].name).toBe("BHA #1 12-1/4");
    });

    it("parses fluidsReport", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<fluidsReports xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <fluidsReport uid="fr-001">
    <nameWell>Well-A</nameWell>
    <name>Mud Report Day 5</name>
  </fluidsReport>
</fluidsReports>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("FluidsReport");
      expect(objects[0].name).toBe("Mud Report Day 5");
    });

    it("parses opsReport", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<opsReports xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <opsReport uid="ops-001">
    <nameWell>Well-A</nameWell>
    <name>Daily Report Day 3</name>
  </opsReport>
</opsReports>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("OpsReport");
      expect(objects[0].name).toBe("Daily Report Day 3");
    });

    it("parses risk", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<risks xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <risk uid="risk-001">
    <nameWell>Well-A</nameWell>
    <name>Stuck Pipe Risk</name>
  </risk>
</risks>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("Risk");
      expect(objects[0].name).toBe("Stuck Pipe Risk");
    });

    it("parses wbGeometry", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<wbGeometrys xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <wbGeometry uid="wbg-001">
    <nameWell>Well-A</nameWell>
    <name>Actual Wellbore Geometry</name>
  </wbGeometry>
</wbGeometrys>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("WbGeometry");
    });

    it("parses surveyProgram", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<surveyPrograms xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <surveyProgram uid="sp-001">
    <nameWell>Well-A</nameWell>
    <name>Survey Program</name>
  </surveyProgram>
</surveyPrograms>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("SurveyProgram");
    });

    it("parses target", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<targets xmlns="http://www.witsml.org/schemas/1series" version="1.4.1.1">
  <target uid="tgt-001">
    <nameWell>Well-A</nameWell>
    <name>Target Point 1</name>
  </target>
</targets>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("Target");
    });
  });

  // ─── WITSML 1.3.1 ──────────────────────────────────────────────────────────

  describe("WITSML 1.3.1", () => {
    it("parses 1.3.1 log (version detection)", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<logs xmlns="http://www.witsml.org/schemas/131" version="1.3.1.0">
  <log uid="log-131">
    <nameWell>Old Well</nameWell>
    <name>Legacy Log</name>
    <logCurveInfo><mnemonic>DEPTH</mnemonic><unit>m</unit></logCurveInfo>
    <logCurveInfo><mnemonic>GR</mnemonic><unit>gAPI</unit></logCurveInfo>
  </log>
</logs>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].version).toBe("1.3.1");
      expect(objects[0].type).toBe("Log");
      expect(objects[0].name).toBe("Legacy Log");
      expect(objects[0].curves).toHaveLength(2);
    });

    it("parses 1.3.1 well", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<wells xmlns="http://www.witsml.org/schemas/131" version="1.3.1.0">
  <well uid="w-131"><name>Legacy Well</name></well>
</wells>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].version).toBe("1.3.1");
      expect(objects[0].type).toBe("Well");
    });
  });

  // ─── WITSML 2.0 ────────────────────────────────────────────────────────────

  describe("WITSML 2.0", () => {
    it("parses Well", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Well xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.0" uuid="well-20-001">
  <Citation><Title>Drogon A-1</Title></Citation>
  <TimeZone>+01:00</TimeZone>
</Well>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].uid).toBe("well-20-001");
      expect(objects[0].type).toBe("Well");
      expect(objects[0].name).toBe("Drogon A-1");
      expect(objects[0].version).toBe("2.0");
    });

    it("parses Wellbore", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Wellbore xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.0" uuid="wb-20-001">
  <Citation><Title>Drogon A-1 WB1</Title></Citation>
</Wellbore>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("Wellbore");
      expect(objects[0].version).toBe("2.0");
    });

    it("parses ChannelSet with channels", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<ChannelSet xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.0" uuid="cs-001">
  <Citation><Title>Gamma Ray CS</Title></Citation>
  <Channel>
    <Mnemonic>GR</Mnemonic>
    <Uom>gAPI</Uom>
    <DataType>double</DataType>
    <Citation><Title>Gamma Ray</Title></Citation>
  </Channel>
  <Channel>
    <Mnemonic>DEPTH</Mnemonic>
    <Uom>m</Uom>
    <DataType>double</DataType>
    <Citation><Title>Measured Depth</Title></Citation>
  </Channel>
</ChannelSet>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("ChannelSet");
      expect(objects[0].name).toBe("Gamma Ray CS");
      expect(objects[0].channels).toHaveLength(2);
      expect(objects[0].channels![0].mnemonic).toBe("GR");
      expect(objects[0].channels![0].uom).toBe("gAPI");
      expect(objects[0].channels![0].dataType).toBe("double");
      expect(objects[0].channels![1].mnemonic).toBe("DEPTH");
    });
  });

  // ─── WITSML 2.1 ────────────────────────────────────────────────────────────

  describe("WITSML 2.1", () => {
    it("parses Log", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Log xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.1" uuid="log-2x-001">
  <Citation><Title>Gamma Ray</Title></Citation>
</Log>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].uid).toBe("log-2x-001");
      expect(objects[0].type).toBe("Log");
      expect(objects[0].version).toBe("2.1");
    });

    it("parses Well with eml-prefixed Citation", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Well xmlns="http://www.energistics.org/energyml/data/witsmlv2"
      xmlns:eml="http://www.energistics.org/energyml/data/commonv2"
      schemaVersion="2.1" uuid="well-21-001">
  <eml:Citation><eml:Title>DROGON B-2</eml:Title></eml:Citation>
</Well>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].uid).toBe("well-21-001");
      expect(objects[0].type).toBe("Well");
      expect(objects[0].name).toBe("DROGON B-2");
    });

    it("parses Trajectory", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Trajectory xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.1" uuid="traj-21-001">
  <Citation><Title>Main Trajectory</Title></Citation>
</Trajectory>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("Trajectory");
      expect(objects[0].name).toBe("Main Trajectory");
    });

    it("parses WellboreMarkerSet", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<WellboreMarkerSet xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.1" uuid="wms-001">
  <Citation><Title>Formation Tops</Title></Citation>
</WellboreMarkerSet>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("WellboreMarkerSet");
      expect(objects[0].name).toBe("Formation Tops");
    });

    it("parses Log with embedded ChannelSet", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Log xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.1" uuid="log-cs-001">
  <Citation><Title>Composite Log</Title></Citation>
  <ChannelSet>
    <Channel><Mnemonic>GR</Mnemonic><Uom>gAPI</Uom></Channel>
    <Channel><Mnemonic>RHOB</Mnemonic><Uom>g/cm3</Uom></Channel>
  </ChannelSet>
</Log>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("Log");
      expect(objects[0].channels).toHaveLength(2);
      expect(objects[0].channels![0].mnemonic).toBe("GR");
      expect(objects[0].channels![1].mnemonic).toBe("RHOB");
      expect(objects[0].channels![1].uom).toBe("g/cm3");
    });

    it("parses WellCompletion", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<WellCompletion xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.1" uuid="wc-001">
  <Citation><Title>Drogon A-1 Completion</Title></Citation>
</WellCompletion>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("WellCompletion");
      expect(objects[0].name).toBe("Drogon A-1 Completion");
    });

    it("parses DeviationSurvey", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<DeviationSurvey xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.1" uuid="ds-001">
  <Citation><Title>MWD Survey</Title></Citation>
</DeviationSurvey>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("DeviationSurvey");
    });

    it("parses StimJob", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<StimJob xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.1" uuid="sj-001">
  <Citation><Title>Frac Stage 1</Title></Citation>
</StimJob>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("StimJob");
    });

    it("parses DrillReport", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<DrillReport xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.1" uuid="dr-001">
  <Citation><Title>DDR Day 5</Title></Citation>
</DrillReport>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("DrillReport");
      expect(objects[0].name).toBe("DDR Day 5");
    });
  });

  // ─── Edge cases ─────────────────────────────────────────────────────────────

  describe("Edge cases", () => {
    it("returns empty array for empty XML", () => {
      expect(parser.parse("<?xml version=\"1.0\"?>")).toHaveLength(0);
    });

    it("handles unknown 2.x root as generic object", () => {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<CustomObject schemaVersion="2.1" uuid="custom-001">
  <Citation><Title>Unknown Thing</Title></Citation>
</CustomObject>`;

      const objects = parser.parse(xml);

      expect(objects).toHaveLength(1);
      expect(objects[0].type).toBe("CustomObject");
      expect(objects[0].name).toBe("Unknown Thing");
    });
  });
});
