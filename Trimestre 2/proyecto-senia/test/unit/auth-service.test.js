import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/models/user-model.js", () => ({
  default: {
    findOne: vi.fn()
  }
}));

vi.mock("bcrypt", () => ({
  default: {
    compare: vi.fn()
  }
}));

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn()
  }
}));

const { default: User } = await import("../../src/models/user-model.js");
const bcrypt = (await import("bcrypt")).default;
const jwt = (await import("jsonwebtoken")).default;
const { login } = await import("../../src/services/auth-service.js");

beforeEach(() => {
  vi.clearAllMocks();
  process.env.JWT_SECRET = "test-secret";
});

describe("auth-service login", () => {
  it("returns token and user data for valid credentials", async () => {
    User.findOne.mockResolvedValue({
      _id: "u1",
      name: "Ada",
      email: "ada@example.com",
      role: "ADMIN",
      active: true,
      password: "hashed"
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("token-123");

    const result = await login("ada@example.com", "pass");

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: "u1", role: "ADMIN" },
      "test-secret",
      { expiresIn: "1d" }
    );
    expect(result).toEqual({
      token: "token-123",
      user: {
        id: "u1",
        name: "Ada",
        email: "ada@example.com",
        role: "ADMIN"
      }
    });
  });

  it("throws when user does not exist or is inactive", async () => {
    User.findOne.mockResolvedValue(null);

    await expect(login("nope@example.com", "pass")).rejects.toThrow(
      "Credenciales Inv"
    );
  });

  it("throws when password is invalid", async () => {
    User.findOne.mockResolvedValue({
      _id: "u2",
      name: "Bob",
      email: "bob@example.com",
      role: "STUDENT",
      active: true,
      password: "hashed"
    });
    bcrypt.compare.mockResolvedValue(false);

    await expect(login("bob@example.com", "bad")).rejects.toThrow(
      "Credenciales Inv"
    );
  });
});
