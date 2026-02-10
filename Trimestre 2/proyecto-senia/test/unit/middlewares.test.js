import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("jsonwebtoken", () => ({
  default: {
    verify: vi.fn()
  }
}));

const jwt = (await import("jsonwebtoken")).default;
const authMiddleware = (await import("../../src/middlewares/auth-middleware.js")).default;
const roleMiddleware = (await import("../../src/middlewares/role-middleware.js")).default;

const makeRes = () => {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  };
  return res;
};

beforeEach(() => {
  vi.clearAllMocks();
  process.env.JWT_SECRET = "test-secret";
});

describe("auth middleware", () => {
  it("returns 401 when token missing", () => {
    const req = { headers: {} };
    const res = makeRes();
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token requerido" });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 401 when token malformed", () => {
    const req = { headers: { authorization: "Bad" } };
    const res = makeRes();
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token mal formado" });
    expect(next).not.toHaveBeenCalled();
  });

  it("attaches user when token valid", () => {
    jwt.verify.mockReturnValue({ userId: "u1", role: "ADMIN" });
    const req = { headers: { authorization: "Bearer token" } };
    const res = makeRes();
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(req.user).toEqual({ id: "u1", role: "ADMIN" });
    expect(next).toHaveBeenCalled();
  });

  it("returns 401 when token invalid", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("bad");
    });
    const req = { headers: { authorization: "Bearer token" } };
    const res = makeRes();
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: expect.stringContaining("Token inv")
    });
  });
});

describe("role middleware", () => {
  it("returns 401 when no user", () => {
    const req = {};
    const res = makeRes();
    const next = vi.fn();

    roleMiddleware("ADMIN")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No autenticado" });
  });

  it("returns 403 when role not allowed", () => {
    const req = { user: { role: "STUDENT" } };
    const res = makeRes();
    const next = vi.fn();

    roleMiddleware("ADMIN")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Acceso denegado" });
  });

  it("calls next when role allowed", () => {
    const req = { user: { role: "ADMIN" } };
    const res = makeRes();
    const next = vi.fn();

    roleMiddleware("ADMIN")(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
