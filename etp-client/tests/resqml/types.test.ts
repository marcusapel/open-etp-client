import { detectDataObjectType } from "../../src/resqml/types";

describe("detectDataObjectType", () => {
  it("detects RESQML 2.2 IjkGridRepresentation", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<IjkGridRepresentation xmlns="http://www.energistics.org/energyml/data/resqmlv2" schemaVersion="2.2" uuid="grid-001">
  <Citation><Title>Drogon Grid</Title></Citation>
</IjkGridRepresentation>`;

    const result = detectDataObjectType(xml);

    expect(result).not.toBeNull();
    expect(result!.standard).toBe("resqml");
    expect(result!.version).toBe("2.2");
    expect(result!.objectType).toBe("IjkGridRepresentation");
    expect(result!.qualifiedType).toBe("resqml22.IjkGridRepresentation");
    expect(result!.uuid).toBe("grid-001");
    expect(result!.title).toBe("Drogon Grid");
  });

  it("detects RESQML 2.0.1 object", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<obj_IjkGridRepresentation xmlns="http://www.energistics.org/energyml/data/resqmlv2" schemaVersion="2.0.1" uuid="g201">
  <Citation><Title>Old Grid</Title></Citation>
</obj_IjkGridRepresentation>`;

    const result = detectDataObjectType(xml);

    expect(result!.standard).toBe("resqml");
    expect(result!.version).toBe("2.0.1");
    expect(result!.objectType).toBe("IjkGridRepresentation");
    expect(result!.qualifiedType).toBe("resqml201.IjkGridRepresentation");
  });

  it("detects PRODML 2.2 object", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<FluidCharacterization xmlns="http://www.energistics.org/energyml/data/prodmlv2" schemaVersion="2.2" uuid="fc-001">
  <Citation><Title>PVT</Title></Citation>
</FluidCharacterization>`;

    const result = detectDataObjectType(xml);

    expect(result!.standard).toBe("prodml");
    expect(result!.objectType).toBe("FluidCharacterization");
    expect(result!.qualifiedType).toBe("prodml22.FluidCharacterization");
  });

  it("detects WITSML 2.1 object", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Log xmlns="http://www.energistics.org/energyml/data/witsmlv2" schemaVersion="2.1" uuid="wlog-001">
  <Citation><Title>GR</Title></Citation>
</Log>`;

    const result = detectDataObjectType(xml);

    expect(result!.standard).toBe("witsml");
    expect(result!.version).toBe("2.1");
    expect(result!.qualifiedType).toBe("witsml21.Log");
  });

  it("returns null for invalid XML", () => {
    const result = detectDataObjectType("not xml at all");
    expect(result).toBeNull();
  });
});
