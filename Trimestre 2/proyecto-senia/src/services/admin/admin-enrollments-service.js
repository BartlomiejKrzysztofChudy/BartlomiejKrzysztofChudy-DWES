import Enrollment from "../../models/enrollment-model.js";
import User from "../../models/user-model.js";
import Subject from "../../models/subject-model.js";

export const enrollStudent = async (data) => {
  const { student, subject } = data;

  if (!student || !subject) {
    throw new Error("Datos incompletos");
  }

  // Validar alumno
  const studentUser = await User.findById(student);
  if (!studentUser || studentUser.role !== "STUDENT") {
    throw new Error("El usuario no es un alumno válido");
  }

  // Validar asignatura
  const subjectExists = await Subject.findById(subject);
  if (!subjectExists) {
    throw new Error("Asignatura no encontrada");
  }

  const enrollment = await Enrollment.create({
    student,
    subject,
    startDate: new Date(),
    active: true
  });

  return enrollment;
};

export const getEnrollmentsBySubject = async (subjectId) => {
  return Enrollment.find({ subject: subjectId, active: true })
    .populate("student", "name email")
    .sort({ createdAt: 1 });
};
