import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user-model.js";
import Course from "../models/course-model.js";
import Subject from "../models/subject-model.js";
import Schedule from "../models/schedule-model.js";
import Enrollment from "../models/enrollment-model.js";
import Evaluation from "../models/evaluation-model.js";
import EvaluationItem from "../models/evaluation-item-model.js";
import Grade from "../models/grade-model.js";
import Attendance from "../models/attendance-model.js";
import Achievement from "../models/achievement-model.js";
import UserAchievement from "../models/user-achievement-model.js";
import Announcement from "../models/announcement-model.js";

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

    // ==================== 1. USUARIOS ====================
    console.log("👥 CREANDO USUARIOS...");
    
    const users = {
      admin: await User.findOne({ email: "admin@test.com" }) || 
             await User.create({
               name: "Admin Sistema",
               email: "admin@test.com",
               password: "123456",
               role: "ADMIN",
               active: true
             }),
      
      teachers: [],
      students: []
    };

    const teachersData = [
      { name: "María García", email: "maria.garcia@test.com" },
      { name: "Carlos López", email: "carlos.lopez@test.com" },
      { name: "Ana Martínez", email: "ana.martinez@test.com" }
    ];

    for (const data of teachersData) {
      const teacher = await User.findOne({ email: data.email }) ||
                     await User.create({
                       ...data,
                       password: "123456",
                       role: "TEACHER",
                       active: true
                     });
      users.teachers.push(teacher);
      console.log(`   ✓ Profesor: ${teacher.name}`);
    }

    const studentsData = [
      { name: "Juan Pérez", email: "juan.perez@test.com" },
      { name: "Laura Sánchez", email: "laura.sanchez@test.com" },
      { name: "Pedro Ramírez", email: "pedro.ramirez@test.com" },
      { name: "Carmen Torres", email: "carmen.torres@test.com" },
      { name: "David Ruiz", email: "david.ruiz@test.com" }
    ];

    for (const data of studentsData) {
      const student = await User.findOne({ email: data.email }) ||
                     await User.create({
                       ...data,
                       password: "123456",
                       role: "STUDENT",
                       active: true
                     });
      users.students.push(student);
      console.log(`   ✓ Estudiante: ${student.name}`);
    }

    // ==================== 2. CURSOS ====================
    console.log("\n📚 CREANDO CURSOS...");
    
    const coursesData = [
      { name: "1º DAW" },
      { name: "2º DAW" },
      { name: "1º DAM" }
    ];

    const courses = [];
    for (const data of coursesData) {
      const course = await Course.findOne({ name: data.name }) ||
                    await Course.create({ ...data, active: true });
      courses.push(course);
      console.log(`   ✓ ${course.name}`);
    }

    // ==================== 3. ASIGNATURAS ====================
    console.log("\n📖 CREANDO ASIGNATURAS...");
    
    const subjectsData = [
      { name: "Desarrollo Web en Entorno Servidor", course: courses[0], teacher: users.teachers[0], type: "TRONCAL" },
      { name: "Desarrollo Web en Entorno Cliente", course: courses[0], teacher: users.teachers[1], type: "TRONCAL" },
      { name: "Bases de Datos", course: courses[0], teacher: users.teachers[2], type: "TRONCAL" },
      { name: "Programación Multimedia", course: courses[1], teacher: users.teachers[0], type: "TRONCAL" },
      { name: "Sistemas de Gestión Empresarial", course: courses[1], teacher: users.teachers[1], type: "OPTATIVA" }
    ];

    const subjects = [];
    for (const data of subjectsData) {
      const subject = await Subject.findOne({ 
        name: data.name, 
        course: data.course._id 
      }) || await Subject.create({
        name: data.name,
        course: data.course._id,
        teacher: data.teacher._id,
        type: data.type,
        active: true
      });
      subjects.push(subject);
      console.log(`   ✓ ${subject.name} - ${data.course.name} (${data.teacher.name})`);
    }

    // ==================== 4. HORARIOS ====================
    console.log("\n🕐 CREANDO HORARIOS...");
    
    const schedulesData = [
      { subject: subjects[0], dayOfWeek: 1, startTime: "09:00", endTime: "11:00", classroom: "Aula 101" },
      { subject: subjects[0], dayOfWeek: 3, startTime: "09:00", endTime: "11:00", classroom: "Aula 101" },
      { subject: subjects[1], dayOfWeek: 2, startTime: "11:00", endTime: "13:00", classroom: "Aula 102" },
      { subject: subjects[1], dayOfWeek: 4, startTime: "11:00", endTime: "13:00", classroom: "Aula 102" },
      { subject: subjects[2], dayOfWeek: 1, startTime: "15:00", endTime: "17:00", classroom: "Aula Lab" }
    ];

    for (const data of schedulesData) {
      const existing = await Schedule.findOne({
        subject: data.subject._id,
        dayOfWeek: data.dayOfWeek
      });
      
      if (!existing) {
        await Schedule.create({
          subject: data.subject._id,
          dayOfWeek: data.dayOfWeek,
          startTime: data.startTime,
          endTime: data.endTime,
          classroom: data.classroom
        });
        const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        console.log(`   ✓ ${data.subject.name.substring(0, 20)}... - ${days[data.dayOfWeek]} ${data.startTime}-${data.endTime}`);
      }
    }

    // ==================== 5. MATRICULACIONES ====================
    console.log("\n📝 CREANDO MATRICULACIONES...");
    
    // Matricular primeros 3 estudiantes en asignaturas de 1º DAW
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) { // 3 primeras asignaturas (1º DAW)
        const existing = await Enrollment.findOne({
          student: users.students[i]._id,
          subject: subjects[j]._id
        });
        
        if (!existing) {
          await Enrollment.create({
            student: users.students[i]._id,
            subject: subjects[j]._id,
            startDate: new Date("2025-09-01"),
            endDate: new Date("2026-06-30"),
            active: true
          });
          console.log(`   ✓ ${users.students[i].name} → ${subjects[j].name.substring(0, 30)}...`);
        }
      }
    }

    // Matricular últimos 2 estudiantes en asignaturas de 2º DAW
    for (let i = 3; i < 5; i++) {
      for (let j = 3; j < 5; j++) { // Asignaturas de 2º DAW
        const existing = await Enrollment.findOne({
          student: users.students[i]._id,
          subject: subjects[j]._id
        });
        
        if (!existing) {
          await Enrollment.create({
            student: users.students[i]._id,
            subject: subjects[j]._id,
            startDate: new Date("2025-09-01"),
            endDate: new Date("2026-06-30"),
            active: true
          });
          console.log(`   ✓ ${users.students[i].name} → ${subjects[j].name.substring(0, 30)}...`);
        }
      }
    }

    // ==================== 6. EVALUACIONES ====================
    console.log("\n📊 CREANDO EVALUACIONES...");
    
    const evaluations = [];
    for (const subject of subjects) {
      const existing = await Evaluation.findOne({
        subject: subject._id,
        order: 1
      });
      
      if (!existing) {
        const evaluation = await Evaluation.create({
          subject: subject._id,
          name: "Primera Evaluación",
          order: 1,
          active: true
        });
        evaluations.push(evaluation);
        console.log(`   ✓ ${subject.name.substring(0, 30)}... - 1ª Evaluación`);
      } else {
        evaluations.push(existing);
      }
    }

    // ==================== 7. ITEMS DE EVALUACIÓN ====================
    console.log("\n📋 CREANDO ITEMS DE EVALUACIÓN...");
    
    const itemsData = [
      { name: "Examen Tema 1", type: "EXAM", weight: 30 },
      { name: "Práctica 1", type: "PRACTICE", weight: 40 },
      { name: "Proyecto Final", type: "PROJECT", weight: 30 }
    ];

    const evaluationItems = [];
    for (const evaluation of evaluations) {
      for (const itemData of itemsData) {
        const existing = await EvaluationItem.findOne({
          evaluation: evaluation._id,
          name: itemData.name
        });
        
        if (!existing) {
          const item = await EvaluationItem.create({
            evaluation: evaluation._id,
            ...itemData,
            active: true
          });
          evaluationItems.push(item);
          console.log(`   ✓ ${itemData.name} (${itemData.weight}%)`);
        } else {
          evaluationItems.push(existing);
        }
      }
    }

    // ==================== 8. NOTAS ====================
    console.log("\n🎯 CREANDO NOTAS...");
    
    let gradeCount = 0;
    for (const subject of subjects.slice(0, 3)) { // Solo primeras 3 asignaturas (1º DAW)
      const evaluation = evaluations.find(e => e.subject.toString() === subject._id.toString());
      if (!evaluation) continue;

      const items = evaluationItems.filter(
        item => item.evaluation.toString() === evaluation._id.toString()
      );

      for (const student of users.students.slice(0, 3)) { // Solo primeros 3 estudiantes
        const enrollment = await Enrollment.findOne({
          student: student._id,
          subject: subject._id
        });

        if (enrollment) {
          for (const item of items) {
            const existing = await Grade.findOne({
              student: student._id,
              item: item._id
            });

            if (!existing) {
              const value = Math.floor(Math.random() * 4) + 7; // Notas entre 7-10
              await Grade.create({
                student: student._id,
                item: item._id,
                value,
                createdBy: subject.teacher
              });
              gradeCount++;
            }
          }
        }
      }
    }
    console.log(`   ✓ ${gradeCount} notas creadas`);

    // ==================== 9. ASISTENCIA ====================
    console.log("\n📅 CREANDO REGISTROS DE ASISTENCIA...");
    
    let attendanceCount = 0;
    const statuses = ["PRESENT", "PRESENT", "PRESENT", "LATE", "ABSENT"];
    
    for (const subject of subjects.slice(0, 3)) { // Solo primeras 3 asignaturas
      for (const student of users.students.slice(0, 3)) { // Solo primeros 3 estudiantes
        const enrollment = await Enrollment.findOne({
          student: student._id,
          subject: subject._id
        });

        if (enrollment) {
          for (let i = 0; i < 10; i++) { // 10 días de asistencia
            const date = new Date("2026-01-10");
            date.setDate(date.getDate() + i);

            const existing = await Attendance.findOne({
              student: student._id,
              subject: subject._id,
              date: date
            });

            if (!existing) {
              await Attendance.create({
                student: student._id,
                subject: subject._id,
                date: date,
                status: statuses[i % statuses.length],
                createdBy: subject.teacher
              });
              attendanceCount++;
            }
          }
        }
      }
    }
    console.log(`   ✓ ${attendanceCount} registros creados`);

    // ==================== 10. LOGROS ====================
    console.log("\n🏆 CREANDO LOGROS...");
    
    const achievementsData = [
      { name: "Primera Nota", description: "Has recibido tu primera calificación", icon: "⭐" },
      { name: "Nota Excelente", description: "Has obtenido una nota de 9 o superior", icon: "🏆" },
      { name: "Asistencia Perfecta", description: "Has asistido a 5 clases consecutivas", icon: "📅" },
      { name: "Estudiante Dedicado", description: "Has completado todas las tareas del mes", icon: "📚" },
      { name: "Aprovechamiento", description: "Media superior a 8 en una evaluación", icon: "💯" }
    ];

    const achievements = [];
    for (const data of achievementsData) {
      const achievement = await Achievement.findOne({ name: data.name }) ||
                         await Achievement.create({ ...data, active: true });
      achievements.push(achievement);
      console.log(`   ✓ ${achievement.name}`);
    }

    // ==================== 11. LOGROS DE USUARIOS ====================
    console.log("\n🎖️ ASIGNANDO LOGROS A ESTUDIANTES...");
    
    let userAchievementCount = 0;
    for (const student of users.students.slice(0, 3)) {
      for (let i = 0; i < 3; i++) {
        const existing = await UserAchievement.findOne({
          user: student._id,
          achievement: achievements[i]._id
        });

        if (!existing) {
          const date = new Date();
          date.setDate(date.getDate() - (5 - i));
          
          await UserAchievement.create({
            user: student._id,
            achievement: achievements[i]._id,
            achievedAt: date
          });
          userAchievementCount++;
        }
      }
    }
    console.log(`   ✓ ${userAchievementCount} logros asignados`);

    // ==================== 12. ANUNCIOS ====================
    console.log("\n📢 CREANDO ANUNCIOS...");
    
    const announcementsData = [
      {
        title: "Inicio del segundo trimestre",
        message: "Comenzamos el segundo trimestre. ¡Mucha suerte a todos!",
        targetType: "ALL",
        targetRoles: [],
        targetCourses: []
      },
      {
        title: "Exámenes próxima semana",
        message: "Recordatorio: Los exámenes de la primera evaluación serán la próxima semana",
        targetType: "ROLE",
        targetRoles: ["STUDENT"],
        targetCourses: []
      },
      {
        title: "Reunión de profesores",
        message: "Reunión de coordinación el viernes a las 16:00",
        targetType: "ROLE",
        targetRoles: ["TEACHER"],
        targetCourses: []
      },
      {
        title: "Importante para 1º DAW",
        message: "Entrega del proyecto final antes del día 15",
        targetType: "COURSE",
        targetRoles: [],
        targetCourses: [courses[0]._id]
      }
    ];

    for (const data of announcementsData) {
      const existing = await Announcement.findOne({ title: data.title });
      
      if (!existing) {
        await Announcement.create({
          ...data,
          author: users.admin._id,
          publishedAt: new Date(),
          expiresAt: null,
          active: true
        });
        console.log(`   ✓ ${data.title}`);
      }
    }

    // ==================== RESUMEN ====================
    console.log("\n╔════════════════════════════════════════════════════╗");
    console.log("║           🎉 DATOS CREADOS EXITOSAMENTE       ║");
    console.log("╚════════════════════════════════════════════════════╝");
    console.log("\n📊 RESUMEN:");
    console.log(`   • Usuarios: ${1 + users.teachers.length + users.students.length} (1 admin, ${users.teachers.length} profesores, ${users.students.length} estudiantes)`);
    console.log(`   • Cursos: ${courses.length}`);
    console.log(`   • Asignaturas: ${subjects.length}`);
    console.log(`   • Horarios: ${schedulesData.length}`);
    console.log(`   • Matriculaciones: 13`);
    console.log(`   • Evaluaciones: ${evaluations.length}`);
    console.log(`   • Items de evaluación: ${evaluationItems.length}`);
    console.log(`   • Notas: ${gradeCount}`);
    console.log(`   • Asistencias: ${attendanceCount}`);
    console.log(`   • Logros: ${achievements.length}`);
    console.log(`   • Logros de usuarios: ${userAchievementCount}`);
    console.log(`   • Anuncios: ${announcementsData.length}`);

    console.log("\n🔐 CREDENCIALES:");
    console.log("   Admin:     admin@test.com / 123456");
    console.log("   Profesor:  maria.garcia@test.com / 123456");
    console.log("   Estudiante: juan.perez@test.com / 123456");

    console.log("\n🚀 COLECCIÓN DE POSTMAN:");
    console.log("   Importa: Proyecto-Senia-API-Completa.postman_collection.json");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  }
};

run();
