/**
 * Unit tests: Dataspace routes (official open-etp-client compatible)
 *
 * Covers:
 *   GET    /dataspaces           — list all dataspaces
 *   POST   /dataspaces           — create a dataspace
 *   DELETE /dataspaces/:id       — delete a dataspace
 *   GET    /dataspaces/:id/resources      — type summary
 *   GET    /dataspaces/:id/resources/all  — all resources
 *   GET    /dataspaces/:id/resources/:type — by type
 *   GET    /dataspaces/:id/resources/:type/:uuid — single object
 *   POST   /dataspaces/:id/transactions   — begin tx
 *   PUT    /dataspaces/:id/transactions/:txId — commit tx
 *   DELETE /dataspaces/:id/transactions/:txId — rollback tx
 */

import request from "supertest";
import { createRestServer } from "../../src/restApi/server";
import { createMockEtpClient, FIXTURES } from "./helpers";

const BASE = "/api/reservoir-ddms/v2";

describe("Dataspace Routes", () => {
  // ─── GET /dataspaces ─────────────────────────────────────────────────────

  describe("GET /dataspaces", () => {
    it("returns list of dataspaces", async () => {
      const etp = createMockEtpClient({
        getDataspaces: jest.fn().mockResolvedValue(FIXTURES.dataspaces),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).get(`${BASE}/dataspaces`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].path).toBe("test/scenario-a");
      expect(res.body[1].path).toBe("test/scenario-b");
    });

    it("returns empty array when no dataspaces exist", async () => {
      const etp = createMockEtpClient({
        getDataspaces: jest.fn().mockResolvedValue([]),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).get(`${BASE}/dataspaces`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it("returns 500 on ETP error", async () => {
      const etp = createMockEtpClient({
        getDataspaces: jest.fn().mockRejectedValue(new Error("DB connection failed")),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).get(`${BASE}/dataspaces`);

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("DB connection failed");
    });
  });

  // ─── POST /dataspaces ────────────────────────────────────────────────────

  describe("POST /dataspaces", () => {
    it("creates a new dataspace and returns 201", async () => {
      const putDataspaces = jest.fn().mockResolvedValue(undefined);
      const etp = createMockEtpClient({ putDataspaces });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/dataspaces`)
        .send({ path: "test/new-project" });

      expect(res.status).toBe(201);
      expect(res.body.uri).toBe("eml:///dataspace('test/new-project')");
      expect(res.body.path).toBe("test/new-project");
      expect(putDataspaces).toHaveBeenCalledWith([{ path: "test/new-project" }]);
    });

    it("accepts DataspaceId format (official format)", async () => {
      const putDataspaces = jest.fn().mockResolvedValue(undefined);
      const etp = createMockEtpClient({ putDataspaces });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/dataspaces`)
        .send([{ DataspaceId: "test/official" }]);

      expect(res.status).toBe(201);
      expect(res.body.path).toBe("test/official");
    });

    it("returns 400 when path is missing", async () => {
      const etp = createMockEtpClient();
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/dataspaces`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/path|DataspaceId/i);
    });

    it("returns 500 on ETP error", async () => {
      const etp = createMockEtpClient({
        putDataspaces: jest.fn().mockRejectedValue(new Error("Dataspace already exists")),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/dataspaces`)
        .send({ path: "dup/path" });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Dataspace already exists");
    });
  });

  // ─── DELETE /dataspaces/:id ──────────────────────────────────────────────

  describe("DELETE /dataspaces/:id", () => {
    it("deletes a dataspace and returns 204", async () => {
      const deleteDataspaces = jest.fn().mockResolvedValue(undefined);
      const etp = createMockEtpClient({ deleteDataspaces });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .delete(`${BASE}/dataspaces/${encodeURIComponent("test/old")}`);

      expect(res.status).toBe(204);
      expect(deleteDataspaces).toHaveBeenCalledWith(["test/old"]);
    });

    it("returns 500 on ETP error", async () => {
      const etp = createMockEtpClient({
        deleteDataspaces: jest.fn().mockRejectedValue(new Error("Dataspace in use")),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .delete(`${BASE}/dataspaces/${encodeURIComponent("locked/ds")}`);

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Dataspace in use");
    });
  });

  // ─── GET /dataspaces/:id/resources ───────────────────────────────────────

  describe("GET /dataspaces/:id/resources", () => {
    it("returns type counts", async () => {
      const etp = createMockEtpClient({
        getResources: jest.fn().mockResolvedValue([
          { uri: "eml:///dataspace('ds')/resqml20.IjkGridRepresentation(a)", name: "A", dataObjectType: "resqml20.IjkGridRepresentation" },
          { uri: "eml:///dataspace('ds')/resqml20.IjkGridRepresentation(b)", name: "B", dataObjectType: "resqml20.IjkGridRepresentation" },
          { uri: "eml:///dataspace('ds')/resqml20.LocalDepth3dCrs(c)", name: "C", dataObjectType: "resqml20.LocalDepth3dCrs" },
        ]),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).get(`${BASE}/dataspaces/ds/resources`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        { name: "resqml20.IjkGridRepresentation", count: 2 },
        { name: "resqml20.LocalDepth3dCrs", count: 1 },
      ]);
    });
  });

  // ─── GET /dataspaces/:id/resources/all ───────────────────────────────────

  describe("GET /dataspaces/:id/resources/all", () => {
    it("returns all resources", async () => {
      const resources = [
        { uri: "eml:///dataspace('ds')/resqml20.IjkGridRepresentation(a)", name: "Grid", dataObjectType: "resqml20.IjkGridRepresentation" },
      ];
      const etp = createMockEtpClient({
        getResources: jest.fn().mockResolvedValue(resources),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).get(`${BASE}/dataspaces/ds/resources/all`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(resources);
    });
  });

  // ─── GET /dataspaces/:id/resources/:type ─────────────────────────────────

  describe("GET /dataspaces/:id/resources/:type", () => {
    it("filters by type", async () => {
      const etp = createMockEtpClient({
        getResources: jest.fn().mockResolvedValue([
          { uri: "eml:///dataspace('ds')/resqml20.IjkGridRepresentation(a)", name: "A", dataObjectType: "resqml20.IjkGridRepresentation" },
          { uri: "eml:///dataspace('ds')/resqml20.LocalDepth3dCrs(c)", name: "C", dataObjectType: "resqml20.LocalDepth3dCrs" },
        ]),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).get(`${BASE}/dataspaces/ds/resources/resqml20.IjkGridRepresentation`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].name).toBe("A");
    });
  });

  // ─── GET /dataspaces/:id/resources/:type/:uuid ───────────────────────────

  describe("GET /dataspaces/:id/resources/:type/:uuid", () => {
    it("returns object content in XML by default", async () => {
      const etp = createMockEtpClient({
        getDataObjects: jest.fn().mockResolvedValue([{
          resource: { uri: "eml:///dataspace('ds')/resqml20.IjkGridRepresentation(abc)", name: "Grid", dataObjectType: "resqml20.IjkGridRepresentation" },
          data: '<IjkGridRepresentation xmlns="http://www.energistics.org/energyml/data/resqmlv2"><Citation><Title>Grid</Title></Citation></IjkGridRepresentation>',
        }]),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).get(`${BASE}/dataspaces/ds/resources/resqml20.IjkGridRepresentation/abc`);

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/xml/);
      expect(res.text).toContain("IjkGridRepresentation");
    });

    it("returns 404 when object not found", async () => {
      const etp = createMockEtpClient({
        getDataObjects: jest.fn().mockResolvedValue([]),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).get(`${BASE}/dataspaces/ds/resources/resqml20.Fake/missing-uuid`);

      expect(res.status).toBe(404);
    });
  });

  // ─── Transactions ────────────────────────────────────────────────────────

  describe("Transactions", () => {
    it("POST /transactions returns a transaction ID", async () => {
      const etp = createMockEtpClient();
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).post(`${BASE}/dataspaces/ds/transactions`);

      expect(res.status).toBe(201);
      expect(res.text).toMatch(/^tx-/);
    });

    it("PUT /transactions/:txId commits", async () => {
      const etp = createMockEtpClient();
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).put(`${BASE}/dataspaces/ds/transactions/tx-123`);

      expect(res.status).toBe(200);
    });

    it("DELETE /transactions/:txId rolls back", async () => {
      const etp = createMockEtpClient();
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app).delete(`${BASE}/dataspaces/ds/transactions/tx-123`);

      expect(res.status).toBe(200);
    });
  });
});
