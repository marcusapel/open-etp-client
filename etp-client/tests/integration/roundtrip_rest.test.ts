/**
 * Integration test: REST API roundtrip against a live ETP-client instance.
 *
 * Configurable via environment variables:
 *   ETP_CLIENT_URL - Base URL of the ETP-client REST API (default: from env)
 *   ETP_AUTH_TOKEN - Bearer token for auth (default: "test" for local dev)
 *   DATA_PARTITION_ID - Data partition header (default: "osdu")
 *
 * Designed to run in any pipeline (AWS, Azure, OSDU platform).
 * Skips gracefully if the server is unreachable.
 */

const BASE = (process.env.ETP_CLIENT_URL || "http://localhost:3000") + "/api/reservoir-ddms/v2";
const TOKEN = process.env.ETP_AUTH_TOKEN || "test";
const PARTITION = process.env.DATA_PARTITION_ID || "osdu";
const AUTH = {
  Authorization: `Bearer ${TOKEN}`,
  "data-partition-id": PARTITION,
};

let serverAvailable = false;
const TEST_DS_ID = `ci/integration_${Date.now()}`;

beforeAll(async () => {
  try {
    const r = await fetch(`${BASE}/dataspaces`, { headers: AUTH, signal: AbortSignal.timeout(5000) });
    serverAvailable = r.ok;
  } catch {
    serverAvailable = false;
  }
});

function requireServer() {
  if (!serverAvailable) {
    console.log("  ⏭ Skipped: ETP-client not reachable at", BASE);
    return false;
  }
  return true;
}

describe("REST API roundtrip", () => {
  // ─── Dataspace CRUD ────────────────────────────────────────────────────────

  describe("Dataspaces", () => {
    it("GET /dataspaces returns array of DataspaceDto", async () => {
      if (!requireServer()) return;
      const r = await fetch(`${BASE}/dataspaces`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = (await r.json()) as any[];
      expect(Array.isArray(body)).toBe(true);
      if (body.length > 0) {
        const ds = body[0];
        expect(ds).toHaveProperty("uri");
        expect(ds).toHaveProperty("path");
        expect(ds).toHaveProperty("storeLastWrite");
        expect(ds).toHaveProperty("storeCreated");
        expect(ds).toHaveProperty("customData");
      }
    });

    it("POST /dataspaces creates and DELETE removes", async () => {
      if (!requireServer()) return;

      // Create
      const cr = await fetch(`${BASE}/dataspaces`, {
        method: "POST",
        headers: { ...AUTH, "Content-Type": "application/json" },
        body: JSON.stringify([{ DataspaceId: TEST_DS_ID }]),
      });
      expect([200, 201]).toContain(cr.status);
      const created = await cr.json();
      expect(Array.isArray(created)).toBe(true);

      // Delete
      const enc = encodeURIComponent(TEST_DS_ID);
      const dr = await fetch(`${BASE}/dataspaces/${enc}`, {
        method: "DELETE",
        headers: AUTH,
      });
      expect([200, 204]).toContain(dr.status);
    });
  });

  // ─── Resource Discovery ────────────────────────────────────────────────────

  describe("Resources", () => {
    let testDs: string;
    let firstType: string;
    let firstUuid: string;

    beforeAll(async () => {
      if (!serverAvailable) return;
      const r = await fetch(`${BASE}/dataspaces`, { headers: AUTH });
      const dataspaces = (await r.json()) as any[];
      // Pick the first dataspace that has resources
      for (const ds of dataspaces) {
        const enc = encodeURIComponent(ds.path);
        const tr = await fetch(`${BASE}/dataspaces/${enc}/resources`, { headers: AUTH });
        if (!tr.ok) continue;
        const types = (await tr.json()) as any[];
        if (types.length > 0) {
          testDs = ds.path;
          firstType = types[0].name;
          break;
        }
      }
    });

    it("GET /:id/resources returns TypeCountDto[]", async () => {
      if (!requireServer() || !testDs) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = (await r.json()) as any[];
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
      expect(body[0]).toHaveProperty("name");
      expect(body[0]).toHaveProperty("count");
      expect(typeof body[0].count).toBe("number");
    });

    it("GET /:id/resources/all returns ResourceDto[]", async () => {
      if (!requireServer() || !testDs) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources/all`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = (await r.json()) as any[];
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);

      const item = body[0];
      expect(item).toHaveProperty("uri");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("storeLastWrite");
      expect(item).toHaveProperty("storeCreated");
      expect(item).toHaveProperty("activeStatus");
      expect(item.uri).toMatch(/eml:\/\/\/dataspace\(/);

      // Extract UUID for subsequent tests
      const m = item.uri.match(/\(([0-9a-f-]{36})\)$/);
      if (m) firstUuid = m[1];
    });

    it("GET /:id/resources/:type returns filtered resources", async () => {
      if (!requireServer() || !testDs || !firstType) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources/${firstType}`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = (await r.json()) as any[];
      expect(Array.isArray(body)).toBe(true);
      for (const item of body) {
        expect(item.uri).toContain(firstType);
      }
    });

    it("GET /:id/resources/:type/:uuid returns object content", async () => {
      if (!requireServer() || !testDs || !firstType || !firstUuid) return;
      const enc = encodeURIComponent(testDs);
      const url = `${BASE}/dataspaces/${enc}/resources/${firstType}/${firstUuid}?$format=json`;
      const r = await fetch(url, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = await r.json();
      expect(Array.isArray(body)).toBe(true);
    });

    it("GET /:id/resources/:type/:uuid/sources returns array", async () => {
      if (!requireServer() || !testDs || !firstType || !firstUuid) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources/${firstType}/${firstUuid}/sources`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = await r.json();
      expect(Array.isArray(body)).toBe(true);
    });

    it("GET /:id/resources/:type/:uuid/targets returns array", async () => {
      if (!requireServer() || !testDs || !firstType || !firstUuid) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources/${firstType}/${firstUuid}/targets`, { headers: AUTH });
      expect(r.status).toBe(200);
      const body = await r.json();
      expect(Array.isArray(body)).toBe(true);
    });

    it("GET /:id/resources/:type/:uuid/arrays returns array or 404", async () => {
      if (!requireServer() || !testDs || !firstType || !firstUuid) return;
      const enc = encodeURIComponent(testDs);
      const r = await fetch(`${BASE}/dataspaces/${enc}/resources/${firstType}/${firstUuid}/arrays`, { headers: AUTH });
      expect([200, 404]).toContain(r.status);
      if (r.status === 200) {
        const body = await r.json();
        expect(Array.isArray(body)).toBe(true);
      }
    });
  });

  // ─── Transactions ──────────────────────────────────────────────────────────

  describe("Transactions", () => {
    it("POST + PUT (commit) transaction lifecycle", async () => {
      if (!requireServer()) return;
      const dsR = await fetch(`${BASE}/dataspaces`, { headers: AUTH });
      const dataspaces = (await dsR.json()) as any[];
      if (dataspaces.length === 0) return;

      const ds = dataspaces[0].path;
      const enc = encodeURIComponent(ds);

      // Start
      const r = await fetch(`${BASE}/dataspaces/${enc}/transactions`, {
        method: "POST",
        headers: AUTH,
      });
      expect([200, 201]).toContain(r.status);
      const txId = await r.text();
      expect(txId.length).toBeGreaterThan(0);

      // Commit
      const cr = await fetch(`${BASE}/dataspaces/${enc}/transactions/${txId}`, {
        method: "PUT",
        headers: AUTH,
      });
      expect([200, 204]).toContain(cr.status);
    });
  });
});
