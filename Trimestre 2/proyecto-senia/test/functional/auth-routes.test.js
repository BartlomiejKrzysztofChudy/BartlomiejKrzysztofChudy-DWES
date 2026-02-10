import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import express from "express";

vi.mock("../../src/services/auth-service.js", () => ({
  login: vi.fn()
}));

const authService = await import("../../src/services/auth-service.js");
const { default: authRoutes } = await import("../../src/routes/auth-routes.js");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

beforeEach(() => {
  vi.clearAllMocks();
  process.env.JWT_SECRET = "test-secret";
});

describe("auth routes", () => {
  it("POST /auth/login returns 400 on missing fields", async () => {
    const res = await request(app).post("/auth/login").send({ email: "" });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("Email");
  });

  it("POST /auth/login returns 200 with token", async () => {
    authService.login.mockResolvedValue({
      token: "token-123",
      user: { id: "u1", name: "Ana", email: "ana@example.com", role: "ADMIN" }
    });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "ana@example.com", password: "pass" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBe("token-123");
  });

  it("GET /auth/admin-test returns 401 without token", async () => {
    const res = await request(app).get("/auth/admin-test");

    expect(res.status).toBe(401);
  });

  it("GET /auth/admin-test returns 403 for non-admin", async () => {
    const token = jwt.sign({ userId: "u1", role: "STUDENT" }, "test-secret");
    const res = await request(app)
      .get("/auth/admin-test")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
  });

  it("GET /auth/admin-test returns 200 for admin", async () => {
    const token = jwt.sign({ userId: "u1", role: "ADMIN" }, "test-secret");
    const res = await request(app)
      .get("/auth/admin-test")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toContain("ADMIN");
  });
});
