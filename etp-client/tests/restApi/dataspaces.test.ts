/**
 * Unit tests: Dataspace routes
 *
 * Covers:
 *   GET    /dataspaces — list all dataspaces
 *   POST   /dataspaces — create a dataspace
 *   DELETE  /dataspaces — delete dataspaces
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
      expect(res.body[0].path).toBe("test/drogon");
      expect(res.body[1].path).toBe("maap/witsml");
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
        .send({ path: "maap/new-project" });

      expect(res.status).toBe(201);
      expect(res.body.uri).toBe("eml:///dataspace('maap/new-project')");
      expect(res.body.path).toBe("maap/new-project");
      expect(putDataspaces).toHaveBeenCalledWith([{ path: "maap/new-project" }]);
    });

    it("passes extraMetadata when provided", async () => {
      const putDataspaces = jest.fn().mockResolvedValue(undefined);
      const etp = createMockEtpClient({ putDataspaces });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/dataspaces`)
        .send({ path: "test/meta", extraMetadata: { owner: "maap" } });

      expect(res.status).toBe(201);
      expect(putDataspaces).toHaveBeenCalledWith([
        { path: "test/meta", extraMetadata: { owner: "maap" } },
      ]);
    });

    it("returns 400 when path is missing", async () => {
      const etp = createMockEtpClient();
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .post(`${BASE}/dataspaces`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/path/i);
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

  // ─── DELETE /dataspaces ──────────────────────────────────────────────────

  describe("DELETE /dataspaces", () => {
    it("deletes dataspaces and returns 204", async () => {
      const deleteDataspaces = jest.fn().mockResolvedValue(undefined);
      const etp = createMockEtpClient({ deleteDataspaces });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .delete(`${BASE}/dataspaces`)
        .send({ paths: ["test/old", "test/trash"] });

      expect(res.status).toBe(204);
      expect(deleteDataspaces).toHaveBeenCalledWith(["test/old", "test/trash"]);
    });

    it("returns 400 when paths is missing", async () => {
      const etp = createMockEtpClient();
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .delete(`${BASE}/dataspaces`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/paths/i);
    });

    it("returns 400 when paths is not an array", async () => {
      const etp = createMockEtpClient();
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .delete(`${BASE}/dataspaces`)
        .send({ paths: "not-an-array" });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/paths/i);
    });

    it("returns 500 on ETP error", async () => {
      const etp = createMockEtpClient({
        deleteDataspaces: jest.fn().mockRejectedValue(new Error("Dataspace in use")),
      });
      const app = createRestServer({ port: 0, host: "0.0.0.0", etpClient: etp });

      const res = await request(app)
        .delete(`${BASE}/dataspaces`)
        .send({ paths: ["locked/ds"] });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Dataspace in use");
    });
  });
});
