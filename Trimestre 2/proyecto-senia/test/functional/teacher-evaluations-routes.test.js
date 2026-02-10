import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";

vi.mock("../../src/services/teacher/evaluations-service.js", () => ({
  createEvaluation: vi.fn(),
  getEvaluationsBySubject: vi.fn()
}));

const evaluationsService = await import("../../src/services/teacher/evaluations-service.js");
const { default: evaluationsRoutes } = await import("../../src/routes/teacher/evaluations-routes.js");

const app = express();
app.use(express.json());
app.use("/teacher", evaluationsRoutes);

beforeEach(() => {
  vi.clearAllMocks();
  process.env.JWT_SECRET = "test-secret";
});

const token = (role = "TEACHER") =>
  jwt.sign({ userId: "t1", role }, "test-secret");

describe("teacher evaluations routes", () => {
  it("GET /teacher/subjects/:subjectId/evaluations returns 401 without token", async () => {
    const res = await request(app).get("/teacher/subjects/s1/evaluations");
    expect(res.status).toBe(401);
  });

  it("GET /teacher/subjects/:subjectId/evaluations returns 403 for non-teacher", async () => {
    const res = await request(app)
      .get("/teacher/subjects/s1/evaluations")
      .set("Authorization", `Bearer ${token("STUDENT")}`);
    expect(res.status).toBe(403);
  });

  it("GET /teacher/subjects/:subjectId/evaluations returns 200 for teacher", async () => {
    evaluationsService.getEvaluationsBySubject.mockResolvedValue([{ id: "e1" }]);
    const res = await request(app)
      .get("/teacher/subjects/s1/evaluations")
      .set("Authorization", `Bearer ${token("TEACHER")}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: "e1" }]);
  });

  it("POST /teacher/subjects/:subjectId/evaluations returns 201 for teacher", async () => {
    evaluationsService.createEvaluation.mockResolvedValue({ id: "e1" });
    const res = await request(app)
      .post("/teacher/subjects/s1/evaluations")
      .set("Authorization", `Bearer ${token("TEACHER")}`)
      .send({ name: "Eval", order: 1 });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: "e1" });
  });
});
