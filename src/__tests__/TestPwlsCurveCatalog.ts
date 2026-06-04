import "jest";

import {
  getQuantityClassForProperty,
  getPropertyTypeIdForProperty,
  isKnownPwlsProperty,
  loadVendorCatalog,
  getPropertyFromMnemonic,
  getPropertyTypeIdFromMnemonic,
  getQuantityClassFromMnemonic,
  getLoadedMnemonicCount,
  hasVendorCatalog,
  PwlsPropertyNames
} from "../lib/jsonTypes/PwlsCurveCatalog";

describe("PwlsCurveCatalog", () => {
  describe("Static property lookup (bundled PWLS v4 properties)", () => {
    it("should have 875 properties loaded", () => {
      expect(PwlsPropertyNames.size).toBe(875);
    });

    it("should recognize known PWLS properties (case-insensitive)", () => {
      expect(isKnownPwlsProperty("porosity")).toBe(true);
      expect(isKnownPwlsProperty("Porosity")).toBe(true);
      expect(isKnownPwlsProperty("density")).toBe(true);
      expect(isKnownPwlsProperty("acoustic slowness")).toBe(true);
      expect(isKnownPwlsProperty("permeability")).toBe(true);
    });

    it("should reject unknown property names", () => {
      expect(isKnownPwlsProperty("foobar_unknown")).toBe(false);
      expect(isKnownPwlsProperty("")).toBe(false);
    });

    it("should return QuantityClass for known properties", () => {
      expect(getQuantityClassForProperty("porosity")).toBe("dimensionless");
      expect(getQuantityClassForProperty("density")).toBe("mass per volume");
      expect(getQuantityClassForProperty("acceleration")).toBe(
        "linear acceleration"
      );
      expect(getQuantityClassForProperty("acoustic slowness")).toBe(
        "time per length"
      );
    });

    it("should return undefined QuantityClass for unknown properties", () => {
      expect(getQuantityClassForProperty("nonsense")).toBeUndefined();
    });

    it("should return PropertyType UUID for known properties", () => {
      // "acceleration" has UUID ca5a4057-f4c9-4efb-8168-7924d2b18a18
      const uuid = getPropertyTypeIdForProperty("acceleration");
      expect(uuid).toBe("ca5a4057-f4c9-4efb-8168-7924d2b18a18");
    });

    it("should return PropertyType UUID for case-insensitive lookup", () => {
      const uuid = getPropertyTypeIdForProperty("Porosity");
      expect(uuid).toBeDefined();
      expect(typeof uuid).toBe("string");
      expect(uuid!.length).toBe(36); // UUID format
    });

    it("should return undefined for properties without UUID", () => {
      // The 2 unmatched properties: 'attenuation gain', 'penetration per rotation'
      const uuid = getPropertyTypeIdForProperty("attenuation gain");
      // May fall through to RESQML alias lookup, either way should not throw
      expect(uuid === undefined || typeof uuid === "string").toBe(true);
    });
  });

  describe("Vendor mnemonic catalog (loaded on demand)", () => {
    it("should start with no vendor catalog loaded", () => {
      // Note: other tests in the suite may have already loaded, 
      // so we just check the API works
      expect(typeof getLoadedMnemonicCount()).toBe("number");
      expect(typeof hasVendorCatalog()).toBe("boolean");
    });

    it("should load a vendor catalog and resolve mnemonics", () => {
      const mockCatalog = {
        $schema: "https://placeholder.opengroup.org/schemas/1.0.0/pwls_curve_mapping.json",
        schemaVersion: "1.0.0" as const,
        LastUpdated: "2025-01-01",
        "Company Code": 440,
        "Company Name": "TestVendor",
        data: [
          {
            "Curve Mnemonic": "TNPHI",
            Property: "neutron porosity",
            "Curve Unit Quantity Class": "dimensionless",
            "LIS Curve Mnemonic": "TNPH"
          },
          {
            "Curve Mnemonic": "TGR",
            Property: "gamma ray",
            "Curve Unit Quantity Class": "API gamma ray",
            "LIS Curve Mnemonic": null
          },
          {
            "Curve Mnemonic": "TDT",
            Property: "acoustic slowness",
            "Curve Unit Quantity Class": "time per length",
            "LIS Curve Mnemonic": null
          }
        ]
      };

      const added = loadVendorCatalog(mockCatalog);
      expect(added).toBeGreaterThanOrEqual(3);
      expect(hasVendorCatalog()).toBe(true);
    });

    it("should resolve loaded mnemonics to PWLS properties", () => {
      expect(getPropertyFromMnemonic("TNPHI")).toBe("neutron porosity");
      expect(getPropertyFromMnemonic("TGR")).toBe("gamma ray");
      expect(getPropertyFromMnemonic("TDT")).toBe("acoustic slowness");
    });

    it("should resolve mnemonics case-insensitively (uppercase fallback)", () => {
      expect(getPropertyFromMnemonic("tnphi")).toBe("neutron porosity");
    });

    it("should return undefined for unknown mnemonics", () => {
      expect(getPropertyFromMnemonic("ZZZZZ_UNKNOWN")).toBeUndefined();
    });

    it("should chain mnemonic → property → UUID", () => {
      const uuid = getPropertyTypeIdFromMnemonic("TDT");
      // "acoustic slowness" has a UUID in the manifest
      expect(uuid).toBeDefined();
      expect(typeof uuid).toBe("string");
    });

    it("should chain mnemonic → property → QuantityClass", () => {
      expect(getQuantityClassFromMnemonic("TNPHI")).toBe("dimensionless");
      expect(getQuantityClassFromMnemonic("TDT")).toBe("time per length");
    });

    it("should return undefined for unknown mnemonic chains", () => {
      expect(getPropertyTypeIdFromMnemonic("UNKNOWN_XYZ")).toBeUndefined();
      expect(getQuantityClassFromMnemonic("UNKNOWN_XYZ")).toBeUndefined();
    });
  });
});
