import { WitsmlParser } from "../../src/witsml/parser";

describe("WitsmlParser", () => {
  const parser = new WitsmlParser();

  it("parses WITSML 1.4.1 log with curves", () => {
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

  it("parses WITSML 1.4.1 trajectory", () => {
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

  it("parses WITSML 2.x single object", () => {
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
});
