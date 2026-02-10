import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user-model.js";

export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !user.active) {
    throw new Error("Credenciales Inválidas");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Credenciales Inválidas");
  }

  const payload = {
    userId: user._id,
    role: user.role
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};
