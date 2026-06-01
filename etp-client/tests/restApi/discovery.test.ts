/**
 * Unit tests: Discovery routes
 *
 * Covers:
 *   POST /discovery/search  — deep search with type/name filtering, depth control
 *   GET  /discovery/tree    — hierarchical resource tree
 *   GET  /discovery/types   — type summary with counts
 *   POST /discovery/subscribe — SSE subscription setup
 */

import request from "supertest";
import { createRestServer } from "../../src/restApi/server";
import { createMockEtpClient, FIXTURES } from "./helpers";

const BASE = "/api/reservoir-ddms/v2";

describe("Discovery Routes", () => {
  // ─── POST /discovery/search ──────────────────────────────────────────────

  describe("POST /discovery/search", () => {
    it("returns resources matching URI", async () => {
      const etp = createMockEtpClient({
        getResources: jest.fn().mockResolvedValue(FIXTURES.resources),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/discovery/search`)
        .send({ uri: "eml:///dataspace('test/scenario-a')" });

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(5);
      expect(res.body.results).toHaveLength(5);
      expect(res.body.truncated).toBe(false);
    });

    it("filters by dataObjectTypes", async () => {
      const etp = createMockEtpClient({
        getResources: jest.fn().mockResolvedValue(FIXTURES.resources),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/discovery/search`)
        .send({
          uri: "eml:///dataspace('test/scenario-a')",
          dataObjectTypes: ["IjkGridRepresentation"],
        });

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(1);
      expect(res.body.results[0].name).toBe("Drogon Grid");
    });

    it("filters by namePattern regex", async () => {
      const etp = createMockEtpClient({
        getResources: jest.fn().mockResolvedValue(FIXTURES.resources),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/discovery/search`)
        .send({
          uri: "eml:///dataspace('test/scenario-a')",
          namePattern: "^(Top|PHIT)",
        });

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      const names = res.body.results.map((r: any) => r.name);
      expect(names).toContain("Top Valysar");
      expect(names).toContain("PHIT");
    });

    it("respects limit parameter", async () => {
      const etp = createMockEtpClient({
        getResources: jest.fn().mockResolvedValue(FIXTURES.resources),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/discovery/search`)
        .send({ uri: "eml:///dataspace('test/scenario-a')", limit: 2 });

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.truncated).toBe(true);
    });

    it("recursively crawls with depth > 1", async () => {
      const getResources = jest.fn()
        .mockResolvedValueOnce([FIXTURES.resources[0]]) // Top level
        .mockResolvedValueOnce([FIXTURES.resources[1]]); // Nested
      const etp = createMockEtpClient({ getResources });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/discovery/search`)
        .send({ uri: "eml:///dataspace('test/scenario-a')", depth: 2 });

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(getResources).toHaveBeenCalledTimes(2);
    });

    it("avoids revisiting the same URI (cycle protection)", async () => {
      const cycleResource: any = {
        ...FIXTURES.resources[0],
        uri: "eml:///dataspace('test/scenario-a')",
      };
      const getResources = jest.fn().mockResolvedValue([cycleResource]);
      const etp = createMockEtpClient({ getResources });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/discovery/search`)
        .send({ uri: "eml:///dataspace('test/scenario-a')", depth: 5 });

      expect(res.status).toBe(200);
      // Should not recurse infinitely
      expect(getResources.mock.calls.length).toBeLessThanOrEqual(2);
    });

    it("returns 400 when uri is missing", async () => {
      const etp = createMockEtpClient();
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/discovery/search`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/uri/i);
    });

    it("returns 500 when ETP client throws", async () => {
      const etp = createMockEtpClient({
        getResources: jest.fn().mockRejectedValue(new Error("Connection lost")),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/discovery/search`)
        .send({ uri: "eml:///dataspace('broken')" });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Connection lost");
    });

    it("combines type and name filters (AND logic)", async () => {
      const etp = createMockEtpClient({
        getResources: jest.fn().mockResolvedValue(FIXTURES.resources),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/discovery/search`)
        .send({
          uri: "eml:///dataspace('test/scenario-a')",
          dataObjectTypes: ["resqml22"],
          namePattern: "Grid",
        });

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(1);
      expect(res.body.results[0].name).toBe("Drogon Grid");
    });
  });

  // ─── GET /discovery/tree ─────────────────────────────────────────────────

  describe("GET /discovery/tree", () => {
    it("returns hierarchical tree for a URI", async () => {
      const getResources = jest.fn()
        .mockResolvedValueOnce([FIXTURES.resources[0], FIXTURES.resources[1]])
        .mockResolvedValue([]); // No children
      const etp = createMockEtpClient({ getResources });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .get(`${BASE}/discovery/tree`)
        .query({ uri: "eml:///dataspace('test/scenario-a')", depth: "2" });

      expect(res.status).toBe(200);
      expect(res.body.uri).toBe("eml:///dataspace('test/scenario-a')");
      expect(res.body.depth).toBe(2);
      expect(res.body.tree).toHaveLength(2);
      expect(res.body.tree[0].name).toBe("Drogon Grid");
      expect(res.body.tree[0].type).toBe("resqml22.IjkGridRepresentation");
      expect(res.body.tree[0].uri).toContain("grid-001");
    });

    it("builds nested children at depth > 1", async () => {
      const childResource = {
        uri: "eml:///dataspace('test/scenario-a')/resqml22.ContinuousProperty('child-1')",
        name: "Porosity",
        dataObjectType: "resqml22.ContinuousProperty",
      };
      const getResources = jest.fn()
        .mockResolvedValueOnce([FIXTURES.resources[0]])
        .mockResolvedValueOnce([childResource]);
      const etp = createMockEtpClient({ getResources });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .get(`${BASE}/discovery/tree`)
        .query({ uri: "eml:///dataspace('test/scenario-a')", depth: "2" });

      expect(res.status).toBe(200);
      expect(res.body.tree[0].children).toHaveLength(1);
      expect(res.body.tree[0].children[0].name).toBe("Porosity");
    });

    it("returns 400 when uri query param is missing", async () => {
      const etp = createMockEtpClient();
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).get(`${BASE}/discovery/tree`);

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/uri/i);
    });

    it("defaults depth to 2", async () => {
      const getResources = jest.fn().mockResolvedValue([]);
      const etp = createMockEtpClient({ getResources });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .get(`${BASE}/discovery/tree`)
        .query({ uri: "eml:///dataspace('test/x')" });

      expect(res.status).toBe(200);
      expect(res.body.depth).toBe(2);
    });
  });

  // ─── GET /discovery/types ────────────────────────────────────────────────

  describe("GET /discovery/types", () => {
    it("returns type counts sorted descending", async () => {
      const resources = [
        ...FIXTURES.resources.slice(0, 4), // 4 resqml resources
        // Duplicate type: add another ContinuousProperty
        { ...FIXTURES.resources[3], uri: "...prop2", uuid: "prop-002", name: "SW" },
      ];
      const etp = createMockEtpClient({
        getResources: jest.fn().mockResolvedValue(resources),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .get(`${BASE}/discovery/types`)
        .query({ uri: "eml:///dataspace('test/scenario-a')" });

      expect(res.status).toBe(200);
      expect(res.body.totalObjects).toBe(5);
      expect(res.body.types[0]).toEqual({ type: "resqml22.ContinuousProperty", count: 2 });
      // Others have count: 1
      const allTypes = res.body.types.map((t: any) => t.type);
      expect(allTypes).toContain("resqml22.IjkGridRepresentation");
      expect(allTypes).toContain("resqml22.Grid2dRepresentation");
      expect(allTypes).toContain("resqml22.WellboreFeature");
    });

    it("returns 400 when uri query param is missing", async () => {
      const etp = createMockEtpClient();
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).get(`${BASE}/discovery/types`);

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/uri/i);
    });

    it("returns empty types for empty dataspace", async () => {
      const etp = createMockEtpClient({
        getResources: jest.fn().mockResolvedValue([]),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .get(`${BASE}/discovery/types`)
        .query({ uri: "eml:///dataspace('empty')" });

      expect(res.status).toBe(200);
      expect(res.body.totalObjects).toBe(0);
      expect(res.body.types).toEqual([]);
    });
  });

  // ─── POST /discovery/subscribe ───────────────────────────────────────────

  describe("POST /discovery/subscribe", () => {
    it("returns 400 when uri is missing", async () => {
      const etp = createMockEtpClient();
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/discovery/subscribe`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/uri/i);
    });

    it("sets up SSE headers and sends initial subscribed event", (done) => {
      const etp = createMockEtpClient({
        getResources: jest.fn().mockResolvedValue([]),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const req = request(app)
        .post(`${BASE}/discovery/subscribe`)
        .send({ uri: "eml:///dataspace('test/scenario-a')" })
        .buffer(true)
        .parse((res, callback) => {
          let data = "";
          res.on("data", (chunk: Buffer) => {
            data += chunk.toString();
            // After initial event, abort the connection
            if (data.includes('"subscribed"')) {
              // Verify SSE format
              expect(data).toContain("data:");
              const jsonStr = data.split("data: ")[1].split("\n")[0];
              const event = JSON.parse(jsonStr);
              expect(event.type).toBe("subscribed");
              expect(event.uri).toBe("eml:///dataspace('test/scenario-a')");
              req.abort();
              done();
            }
          });
          res.on("end", () => callback(null, data));
        });
    });
  });
});
