import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user-model.js";
import Achievement from "../models/achievement-model.js";
import UserAchievement from "../models/user-achievement-model.js";

dotenv.config();

const run = async () => {
  try {
    const atlasUri = process.env.MONGO_URI;
    
    if (!atlasUri || atlasUri.includes("localhost")) {
      console.error("❌ MONGO_URI debe apuntar a MongoDB Atlas");
      process.exit(1);
    }
    
    await mongoose.connect(atlasUri);
    console.log("✅ Conectado a MongoDB Atlas\n");

    // Obtener estudiante
    const student = await User.findOne({ email: "juan.perez@test.com" });

    if (!student) {
      console.error("❌ Estudiante no encontrado");
      process.exit(1);
    }

    console.log(`✅ Estudiante: ${student.name} (${student._id})\n`);

    // Definir logros a crear
    const achievementsData = [
      {
        name: "Primera Nota",
        description: "Has recibido tu primera calificación",
        icon: "⭐"
      },
      {
        name: "Nota Excelente",
        description: "Has obtenido una nota de 9 o superior",
        icon: "🏆"
      },
      {
        name: "Asistencia Perfecta",
        description: "Has asistido a 5 clases consecutivas",
        icon: "📅"
      },
      {
        name: "Estudiante Dedicado",
        description: "Has completado todas las tareas del mes",
        icon: "📚"
      }
    ];

    console.log("📝 Creando logros:");
    const createdAchievements = [];

    for (const achData of achievementsData) {
      let achievement = await Achievement.findOne({ name: achData.name });
      
      if (!achievement) {
        achievement = await Achievement.create(achData);
        console.log(`   ✅ ${achievement.name}`);
      } else {
        console.log(`   ✓ ${achievement.name} (ya existe)`);
      }

      createdAchievements.push(achievement);
    }

    // Asignar 3 logros al estudiante (para que tenga nivel 2)
    const achievementsToAssign = [
      { achievement: createdAchievements[0], daysAgo: 5 }, // Primera Nota
      { achievement: createdAchievements[1], daysAgo: 3 }, // Nota Excelente
      { achievement: createdAchievements[2], daysAgo: 1 }  // Asistencia Perfecta
    ];

    console.log("\n🏆 Asignando logros al estudiante:");
    let assignedCount = 0;

    for (const { achievement, daysAgo } of achievementsToAssign) {
      const existing = await UserAchievement.findOne({
        user: student._id,
        achievement: achievement._id
      });

      if (!existing) {
        const achievedAt = new Date();
        achievedAt.setDate(achievedAt.getDate() - daysAgo);

        await UserAchievement.create({
          user: student._id,
          achievement: achievement._id,
          achievedAt
        });
        console.log(`   ✅ ${achievement.name} (hace ${daysAgo} días)`);
        assignedCount++;
      } else {
        console.log(`   ✓ ${achievement.name} (ya asignado)`);
        assignedCount++;
      }
    }

    console.log("\n🎉 ¡Datos creados exitosamente!");
    console.log("\n📊 Resumen:");
    console.log(`   • Total de logros creados: ${createdAchievements.length}`);
    console.log(`   • Logros del estudiante: ${assignedCount}`);
    console.log(`   • Nivel esperado: ${Math.floor(assignedCount / 2) + 1} (${assignedCount} logros / 2 + 1)`);
    console.log(`   • Progreso: ${assignedCount} de ${Math.floor(assignedCount / 2) + 1 * 2} para siguiente nivel`);
    console.log("\n🚀 Prueba el endpoint:");
    console.log("   GET /student/dashboard/progress");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  }
};

run();
