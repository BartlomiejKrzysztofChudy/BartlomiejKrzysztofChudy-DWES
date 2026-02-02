import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user-model.js";
import connectMongo from "../loaders/mongodb-loader.js";

const run = async () => {
  await connectMongo();

  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: hashedPassword,
    role: "ADMIN",
    active: true
  });

  console.log("Admin creado:", admin.email);
  process.exit(0);
};

run();
