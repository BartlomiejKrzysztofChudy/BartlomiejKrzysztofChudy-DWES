import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user-model.js";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const run = async () => {
  try {
    // Conectar EXPLÍCITAMENTE a Atlas (no a local)
    const atlasUri = process.env.MONGO_URI;
    
    if (!atlasUri || atlasUri.includes("localhost")) {
      console.error("❌ Error: MONGO_URI debe apuntar a MongoDB Atlas, no a localhost");
      console.error("   Verifica tu archivo .env");
      process.exit(1);
    }
    
    await mongoose.connect(atlasUri);
    console.log("✅ Conectado a MongoDB Atlas:", atlasUri.substring(0, 30) + "...");

    // Verificar si ya existen usuarios
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log(`⚠️  Ya existen ${existingUsers} usuarios en la base de datos.`);
      console.log("   Si quieres recrearlos, elimina los usuarios primero desde MongoDB Atlas.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("123456", 10);

    // Crear usuarios de prueba
    const users = await User.insertMany([
      {
        name: "Admin",
        email: "admin@test.com",
        password: hashedPassword,
        role: "ADMIN",
        active: true
      },
      {
        name: "Profesor Test",
        email: "profesor@test.com",
        password: hashedPassword,
        role: "TEACHER",
        active: true
      },
      {
        name: "Estudiante Test",
        email: "estudiante@test.com",
        password: hashedPassword,
        role: "STUDENT",
        active: true
      }
    ]);

    console.log("\n✅ Usuarios creados exitosamente en MongoDB Atlas:");
    users.forEach(user => {
      console.log(`  - ${user.email} (${user.role})`);
    });
    
    console.log("\n📝 Contraseña para todos: 123456");
    console.log("\n🚀 Ahora puedes hacer login en Render!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

run();
