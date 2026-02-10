import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";

vi.mock("../../src/services/admin/admin-subjects-service.js", () => ({
  createSubject: vi.fn(),
  getSubjectsByCourse: vi.fn()
}));

const adminSubjectsService = await import("../../src/services/admin/admin-subjects-service.js");
const { default: adminSubjectsRoutes } = await import("../../src/routes/admin/admin-subjects-routes.js");

const app = express();
app.use(express.json());
app.use("/admin/subjects", adminSubjectsRoutes);

beforeEach(() => {
  vi.clearAllMocks();
  process.env.JWT_SECRET = "test-secret";
});

const token = (role = "ADMIN") =>
  jwt.sign({ userId: "u1", role }, "test-secret");

describe("admin subjects routes", () => {
  it("POST /admin/subjects returns 401 without token", async () => {
    const res = await request(app).post("/admin/subjects").send({});
    expect(res.status).toBe(401);
  });

  it("POST /admin/subjects returns 403 for non-admin", async () => {
    const res = await request(app)
      .post("/admin/subjects")
      .set("Authorization", `Bearer ${token("STUDENT")}`)
      .send({});
    expect(res.status).toBe(403);
  });

  it("POST /admin/subjects returns 201 for admin", async () => {
    adminSubjectsService.createSubject.mockResolvedValue({ id: "s1" });
    const res = await request(app)
      .post("/admin/subjects")
      .set("Authorization", `Bearer ${token("ADMIN")}`)
      .send({ name: "Subject" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: "s1" });
  });

  it("GET /admin/subjects/course/:courseId returns 200 for admin", async () => {
    adminSubjectsService.getSubjectsByCourse.mockResolvedValue([{ id: "s1" }]);
    const res = await request(app)
      .get("/admin/subjects/course/c1")
      .set("Authorization", `Bearer ${token("ADMIN")}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: "s1" }]);
  });
});
