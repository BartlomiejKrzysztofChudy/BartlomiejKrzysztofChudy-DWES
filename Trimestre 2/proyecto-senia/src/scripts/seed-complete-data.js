import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user-model.js";
import Course from "../models/course-model.js";
import Subject from "../models/subject-model.js";
import Enrollment from "../models/enrollment-model.js";
import Evaluation from "../models/evaluation-model.js";
import EvaluationItem from "../models/evaluation-item-model.js";
import Grade from "../models/grade-model.js";
import Attendance from "../models/attendance-model.js";

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

    // 1. Obtener usuarios existentes
    const teacher = await User.findOne({ email: "maria.garcia@test.com" });
    const student = await User.findOne({ email: "juan.perez@test.com" });

    if (!teacher || !student) {
      console.error("❌ Faltan usuarios. Ejecuta primero la colección de Postman.");
      process.exit(1);
    }

    console.log("✅ Usuarios encontrados:");
    console.log(`   - Profesor: ${teacher.name} (${teacher._id})`);
    console.log(`   - Estudiante: ${student.name} (${student._id})\n`);

    // 2. Crear Curso
    let course = await Course.findOne({ name: "1º DAW" });
    if (!course) {
      course = await Course.create({ name: "1º DAW" });
      console.log("✅ Curso creado:", course.name);
    } else {
      console.log("✅ Curso ya existe:", course.name);
    }

    // 3. Crear Asignatura
    let subject = await Subject.findOne({ 
      name: "Desarrollo Web en Entorno Servidor",
      course: course._id 
    });
    
    if (!subject) {
      subject = await Subject.create({
        name: "Desarrollo Web en Entorno Servidor",
        course: course._id,
        teacher: teacher._id,
        type: "TRONCAL",
        active: true
      });
      console.log("✅ Asignatura creada:", subject.name);
    } else {
      console.log("✅ Asignatura ya existe:", subject.name);
    }

    // 4. Matricular Estudiante
    let enrollment = await Enrollment.findOne({
      student: student._id,
      subject: subject._id,
      active: true
    });

    if (!enrollment) {
      enrollment = await Enrollment.create({
        student: student._id,
        subject: subject._id,
        active: true
      });
      console.log("✅ Estudiante matriculado en la asignatura");
    } else {
      console.log("✅ Estudiante ya matriculado");
    }

    // 5. Crear Evaluación
    let evaluation = await Evaluation.findOne({
      subject: subject._id,
      active: true
    });

    if (!evaluation) {
      evaluation = await Evaluation.create({
        subject: subject._id,
        name: "Primera Evaluación",
        order: 1,
        active: true
      });
      console.log("✅ Evaluación creada:", evaluation.name);
    } else {
      console.log("✅ Evaluación ya existe:", evaluation.name);
    }

    // 6. Crear Items de Evaluación y Notas
    const itemsData = [
      { name: "Examen Tema 1", weight: 30, type: "EXAM" },
      { name: "Práctica Express", weight: 40, type: "PRACTICE" },
      { name: "Proyecto Final", weight: 30, type: "PROJECT" }
    ];

    for (const itemData of itemsData) {
      let item = await EvaluationItem.findOne({
        evaluation: evaluation._id,
        name: itemData.name
      });

      if (!item) {
        item = await EvaluationItem.create({
          evaluation: evaluation._id,
          ...itemData,
          active: true
        });
        console.log(`✅ Item creado: ${item.name} (${item.weight}%)`);

        // Crear nota para cada item
        const gradeValue = Math.floor(Math.random() * 4) + 7; // Entre 7 y 10
        await Grade.create({
          student: student._id,
          item: item._id,
          value: gradeValue,
          createdBy: teacher._id
        });
        console.log(`   📝 Nota asignada: ${gradeValue}`);
      } else {
        console.log(`✅ Item ya existe: ${item.name}`);
      }
    }

    // 7. Crear registros de asistencia
    const dates = [
      "2026-02-03",
      "2026-02-04",
      "2026-02-05",
      "2026-02-06",
      "2026-02-07"
    ];

    const statuses = ["PRESENT", "PRESENT", "PRESENT", "LATE", "PRESENT"];

    for (let i = 0; i < dates.length; i++) {
      const existingAttendance = await Attendance.findOne({
        student: student._id,
        subject: subject._id,
        date: new Date(dates[i])
      });

      if (!existingAttendance) {
        await Attendance.create({
          student: student._id,
          subject: subject._id,
          date: new Date(dates[i]),
          status: statuses[i],
          createdBy: teacher._id
        });
        console.log(`✅ Asistencia registrada: ${dates[i]} - ${statuses[i]}`);
      }
    }

    console.log("\n🎉 ¡Datos de prueba creados exitosamente!");
    console.log("\n📋 Resumen:");
    console.log(`   - Curso: ${course.name} (ID: ${course._id})`);
    console.log(`   - Asignatura: ${subject.name} (ID: ${subject._id})`);
    console.log(`   - Evaluación: ${evaluation.name}`);
    console.log(`   - Items de evaluación: 3`);
    console.log(`   - Registros de asistencia: ${dates.length}`);
    console.log("\n🚀 Ahora puedes probar:");
    console.log(`   GET /student/subjects`);
    console.log(`   GET /student/subjects/${subject._id}`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

run();
