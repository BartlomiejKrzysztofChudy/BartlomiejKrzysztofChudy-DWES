import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/services/auth-service.js", () => ({
  login: vi.fn()
}));

const authService = await import("../../src/services/auth-service.js");
const { login } = await import("../../src/controllers/auth-controller.js");

const makeRes = () => {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  };
  return res;
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("auth controller", () => {
  it("returns 400 when email or password missing", async () => {
    const req = { body: { email: "" } };
    const res = makeRes();
    const next = vi.fn();

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next on service error", async () => {
    authService.login.mockRejectedValue(new Error("boom"));
    const req = { body: { email: "a@a.com", password: "x" } };
    const res = makeRes();
    const next = vi.fn();

    await login(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
