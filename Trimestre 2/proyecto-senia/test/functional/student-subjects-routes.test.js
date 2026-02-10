import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";

vi.mock("../../src/services/student/student-subjects-service.js", () => ({
  getMySubjects: vi.fn()
}));

const studentSubjectsService = await import("../../src/services/student/student-subjects-service.js");
const { default: studentSubjectsRoutes } = await import("../../src/routes/student/student-subjects-routes.js");

const app = express();
app.use(express.json());
app.use("/student", studentSubjectsRoutes);

beforeEach(() => {
  vi.clearAllMocks();
  process.env.JWT_SECRET = "test-secret";
});

const token = (role = "STUDENT") =>
  jwt.sign({ userId: "s1", role }, "test-secret");

describe("student subjects routes", () => {
  it("GET /student/subjects returns 401 without token", async () => {
    const res = await request(app).get("/student/subjects");
    expect(res.status).toBe(401);
  });

  it("GET /student/subjects returns 403 for non-student", async () => {
    const res = await request(app)
      .get("/student/subjects")
      .set("Authorization", `Bearer ${token("TEACHER")}`);
    expect(res.status).toBe(403);
  });

  it("GET /student/subjects returns 200 for student", async () => {
    studentSubjectsService.getMySubjects.mockResolvedValue([{ id: "s1" }]);
    const res = await request(app)
      .get("/student/subjects")
      .set("Authorization", `Bearer ${token("STUDENT")}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: "s1" }]);
  });
});
