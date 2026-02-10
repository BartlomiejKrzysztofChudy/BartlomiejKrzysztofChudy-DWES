import bcrypt from "bcrypt";

import User from "../../models/user-model.js";

export const createUser = async (data) => {
  const {
    name, email, password, role
  } = data;

  if (!name || !email || !password || !role) {
    throw new Error("Datos incompletos");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    active: true
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    active: user.active
  };
};

export const getUsers = async () => User.find({}, "-password").sort({ createdAt: -1 });
