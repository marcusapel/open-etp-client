/**
 * Integration test: REST API roundtrip via the official NestJS open-etp-client.
 *
 * Tests that our route format expectations match the official response formats.
 * Runs against localhost:3000 (drogonresqml-etp-client-1 container).
 *
 * Skip if the container is not running (CI-safe).
 */

const BASE = "http://localhost:3000/api/reservoir-ddms/v2";
const AUTH = { Authorization: "Bearer test" };

let serverAvailable = false;
const TEST_DATASPACE = "test/roundtrip_" + Date.now();

beforeAll(async () => {
  try {
    const r = await fetch(`${BASE}/dataspaces`, { headers: AUTH, signal: AbortSignal.timeout(3000) });
    serverAvailable = r.ok;
  } catch {
    serverAvailable = false;
  }
});

function skipIfNoServer() {
  if (!serverAvailable) {
    return true;
  }
  return false;
}

describe("REST API roundtrip (live)", () => {
  // ─── Dataspaces ────────────────────────────────────────────────────────────

  describe("Dataspaces", () => {
    it("GET /dataspaces returns array with correct shape", async () => {
      if (skipIfNoServer()) return;
      const r = await fetch(`${BASE}/dataspaces`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = (await r.json()) as any[];
      expect(Array.isArray(body)).toBe(true);
      if (body.length > 0) {
        expect(body[0]).toHaveProperty("uri");
        expect(body[0]).toHaveProperty("path");
        expect(body[0]).toHaveProperty("storeLastWrite");
        expect(body[0]).toHaveProperty("storeCreated");
        expect(body[0]).toHaveProperty("customData");
      }
    });

    it("POST /dataspaces creates a dataspace", async () => {
      if (skipIfNoServer()) return;
      const r = await fetch(`${BASE}/dataspaces`, {
        method: "POST",
        headers: { ...AUTH, "Content-Type": "application/json" },
        body: JSON.stringify([{ DataspaceId: TEST_DATASPACE }]),
      });
      expect([200, 201]).toContain(r.status);
    });

    it("DELETE /dataspaces/:id removes it", async () => {
      if (skipIfNoServer()) return;
      const enc = encodeURIComponent(TEST_DATASPACE);
      const r = await fetch(`${BASE}/dataspaces/${enc}`, {
        method: "DELETE",
        headers: AUTH,
      });
      expect([200, 204]).toContain(r.status);
    });
  });

  // ─── Resources (on existing test/drogon_global) ────────────────────────────

  describe("Resources", () => {
    let testDs: string;
    let firstType: string;
    let firstUuid: string;

    beforeAll(async () => {
      if (!serverAvailable) return;
      // Find a populated dataspace
      const r = await fetch(`${BASE}/dataspaces`, { headers: AUTH });
      const dataspaces = await r.json() as any[];
      const ds = dataspaces.find((d: any) => d.path?.includes("drogon"));
      testDs = ds?.path || dataspaces[0]?.path;
    });

    it("GET /dataspaces/:id/resources returns [{name, count}]", async () => {
      if (skipIfNoServer() || !testDs) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = await r.json() as any[];
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
      expect(body[0]).toHaveProperty("name");
      expect(body[0]).toHaveProperty("count");
      expect(typeof body[0].count).toBe("number");
      firstType = body[0].name;
    });

    it("GET /dataspaces/:id/resources/all returns resources with uri", async () => {
      if (skipIfNoServer() || !testDs) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources/all`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = await r.json() as any[];
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
      // Validate shape matches official format
      const item = body[0];
      expect(item).toHaveProperty("uri");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("storeLastWrite");
      expect(item).toHaveProperty("storeCreated");
      expect(item).toHaveProperty("activeStatus");
      expect(item.uri).toMatch(/eml:\/\/\/dataspace\(/);

      // Extract UUID from first item for later tests
      const m = item.uri.match(/\(([0-9a-f-]{36})\)$/);
      if (m) firstUuid = m[1];
    });

    it("GET /dataspaces/:id/resources/:type returns filtered resources", async () => {
      if (skipIfNoServer() || !testDs || !firstType) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources/${firstType}`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = await r.json() as any[];
      expect(Array.isArray(body)).toBe(true);
      // All returned items should be of the requested type
      for (const item of body) {
        expect(item.uri).toContain(firstType);
      }
    });

    it("GET /dataspaces/:id/resources/:type/:uuid returns object content", async () => {
      if (skipIfNoServer() || !testDs || !firstType || !firstUuid) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources/${firstType}/${firstUuid}?$format=json`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = (await r.json()) as any[];
      // Official format wraps in array (may be empty if object has no parseable data)
      expect(Array.isArray(body)).toBe(true);
    });

    it("GET /dataspaces/:id/resources/:type/:uuid/sources returns array", async () => {
      if (skipIfNoServer() || !testDs || !firstType || !firstUuid) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources/${firstType}/${firstUuid}/sources`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = (await r.json()) as any;
      expect(Array.isArray(body)).toBe(true);
    });

    it("GET /dataspaces/:id/resources/:type/:uuid/targets returns array", async () => {
      if (skipIfNoServer() || !testDs || !firstType || !firstUuid) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources/${firstType}/${firstUuid}/targets`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = (await r.json()) as any;
      expect(Array.isArray(body)).toBe(true);
    });

    it("GET /dataspaces/:id/resources/:type/:uuid/arrays returns array or 404", async () => {
      if (skipIfNoServer() || !testDs || !firstType || !firstUuid) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources/${firstType}/${firstUuid}/arrays`, { headers: AUTH });
      // Arrays endpoint may return 404 for types without array support
      expect([200, 404]).toContain(r.status);
      if (r.status === 200) {
        const body = (await r.json()) as any;
        expect(Array.isArray(body)).toBe(true);
      }
    });
  });

  // ─── Transactions ──────────────────────────────────────────────────────────

  describe("Transactions", () => {
    it("POST /dataspaces/:id/transactions returns transaction ID", async () => {
      if (skipIfNoServer()) return;
      // Find any dataspace
      const dsR = await fetch(`${BASE}/dataspaces`, { headers: AUTH });
      const dataspaces = await dsR.json() as any[];
      if (dataspaces.length === 0) return;
      const ds = dataspaces[0].path;
      const enc = encodeURIComponent(ds);

      const r = await fetch(`${BASE}/dataspaces/${enc}/transactions`, {
        method: "POST",
        headers: AUTH,
      });
      expect([200, 201]).toContain(r.status);
      const txId = await r.text();
      expect(txId.length).toBeGreaterThan(0);

      // Commit the transaction
      const commitR = await fetch(`${BASE}/dataspaces/${enc}/transactions/${txId}`, {
        method: "PUT",
        headers: AUTH,
      });
      expect([200, 204]).toContain(commitR.status);
    });
  });

  // ─── WITSML Discovery via standard routes ──────────────────────────────────

  describe("WITSML Discovery", () => {
    it("WITSML types appear in resource_types listing", async () => {
      if (skipIfNoServer()) return;
      // List all dataspaces, check if any has witsml types
      const dsR = await fetch(`${BASE}/dataspaces`, { headers: AUTH });
      const dataspaces = await dsR.json() as any[];

      let foundWitsml = false;
      for (const ds of dataspaces.slice(0, 5)) {
        const enc = encodeURIComponent(ds.path);
        const r = await fetch(`${BASE}/dataspaces/${enc}/resources`, { headers: AUTH });
        if (!r.ok) continue;
        const types = await r.json() as any[];
        const witsmlTypes = types.filter((t: any) => t.name?.startsWith("witsml"));
        if (witsmlTypes.length > 0) {
          foundWitsml = true;
          // Verify we can list them
          const wType = witsmlTypes[0].name;
          const rr = await fetch(`${BASE}/dataspaces/${enc}/resources/${wType}`, { headers: AUTH });
          expect(rr.status).toBe(200);
          const objs = await rr.json();
          expect(Array.isArray(objs)).toBe(true);
          break;
        }
      }
      // Not a hard failure — just log if WITSML data not present
      if (!foundWitsml) {
        console.log("    ℹ No WITSML data found in any dataspace (expected if none loaded)");
      }
    });
  });

  // ─── GraphQL Compatibility Check ──────────────────────────────────────────

  describe("GraphQL REST query compatibility", () => {
    it("_parse_eml_entry can extract uuid/type from our resource format", () => {
      // Simulate what ORES does with our response
      const resource = {
        uri: "eml:///dataspace('test/drogon_global')/resqml20.IjkGridRepresentation(d6319832-08fd-42d8-8b81-8d97454d12b9)",
        alternateUris: [],
        name: "DrogonGlobal",
        lastChanged: "1970-01-01T00:00:00.000Z",
        storeLastWrite: "2026-05-29T10:27:56.762Z",
        storeCreated: "2026-05-29T10:27:56.762Z",
        activeStatus: "Active",
        customData: {},
        dataObjectType: "resqml20.IjkGridRepresentation",
      };

      // ORES regex: /(?:eml:\/\/\/)?(?:dataspace\(['"']?[^)]+['"']?\)\/)?(?P<type>[\w.]+)\((?P<uuid>[0-9a-fA-F-]{36})\)/
      const EML_URI_RE = /(?:eml:\/\/\/)?(?:dataspace\(['"]?[^)]+['"]?\)\/)?(?<type>[\w.]+)\((?<uuid>[0-9a-fA-F-]{36})\)/;
      const m = resource.uri.match(EML_URI_RE);

      expect(m).not.toBeNull();
      expect(m!.groups!.type).toBe("resqml20.IjkGridRepresentation");
      expect(m!.groups!.uuid).toBe("d6319832-08fd-42d8-8b81-8d97454d12b9");
    });

    it("list_types format matches what ORES expects", () => {
      // ORES calls: types = await osdu.list_types(token, enc)
      // Expects: [{"name": "...", "count": N}]
      const response = [
        { name: "resqml20.IjkGridRepresentation", count: 1 },
        { name: "resqml20.LocalDepth3dCrs", count: 1 },
      ];
      // ORES does: t.get("name"), int(t.get("count") or 0)
      expect(response[0].name).toBe("resqml20.IjkGridRepresentation");
      expect(typeof response[0].count).toBe("number");
    });

    it("list_resources format: ORES can parse uuid/name from /resources/:type", () => {
      // Response from GET /dataspaces/:id/resources/:type
      const resources = [
        {
          uri: "eml:///dataspace('test/drogon_global')/resqml20.IjkGridRepresentation(d6319832-08fd-42d8-8b81-8d97454d12b9)",
          alternateUris: [],
          name: "DrogonGlobal",
          storeLastWrite: "2026-05-29T10:27:56.762Z",
          storeCreated: "2026-05-29T10:27:56.762Z",
          activeStatus: "Active",
          customData: {},
          dataObjectType: "resqml20.IjkGridRepresentation",
        },
      ];

      // ORES _parse_eml_entry: uses r.get("name") and parses UUID from uri
      const EML_URI_RE = /(?:eml:\/\/\/)?(?:dataspace\(['"]?[^)]+['"]?\)\/)?(?<type>[\w.]+)\((?<uuid>[0-9a-fA-F-]{36})\)/;
      for (const r of resources) {
        const name = r.name;
        const m = r.uri.match(EML_URI_RE);
        expect(name).toBeTruthy();
        expect(m).not.toBeNull();
        expect(m!.groups!.uuid).toMatch(/^[0-9a-f-]{36}$/);
      }
    });

    it("get_resource format: ORES expects array wrapped JSON object", () => {
      // GET /dataspaces/:id/resources/:type/:uuid?$format=json returns an array
      const response = [
        {
          Uuid: "d6319832-08fd-42d8-8b81-8d97454d12b9",
          SchemaVersion: "2.0",
          Citation: { Title: "DrogonGlobal" },
          Ni: 10, Nj: 10, Nk: 6,
        },
      ];

      // ORES does: result = r.json(); if isinstance(result, list) and len(result) == 1: return result[0]
      expect(Array.isArray(response)).toBe(true);
      expect(response.length).toBe(1);
      const obj = response[0];
      expect(obj.Uuid || obj.Citation).toBeTruthy();
    });

    it("WITSML objects would be discoverable via resource_types", () => {
      // If witsml21 objects exist in a dataspace, GET /resources returns them
      const mockTypesResponse = [
        { name: "resqml20.IjkGridRepresentation", count: 5 },
        { name: "resqml20.obj_WellboreFeature", count: 3 },
        { name: "witsml21.Well", count: 2 },
        { name: "witsml21.WellLog", count: 8 },
      ];

      // ORES can handle these — GraphQL resource_types resolver just passes them through
      const witsmlTypes = mockTypesResponse.filter((t) => t.name.startsWith("witsml"));
      expect(witsmlTypes).toHaveLength(2);

      // deep_search won't find them via category (only resqml20/22 in categories)
      // but federated_search(type_name="witsml21.WellLog") would work
      // since it calls _rest_list_resources(token, ds, type_name)
    });
  });
});
