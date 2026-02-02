import Subject from "../../models/subject-model.js";
import Course from "../../models/course-model.js";
import User from "../../models/user-model.js";

export const createSubject = async (data) => {
  const { name, course, teacher, type } = data;

  if (!name || !course || !teacher || !type) {
    throw new Error("Datos incompletos");
  }

  const courseExists = await Course.findById(course);
  if (!courseExists) {
    throw new Error("Curso no encontrado");
  }

  const teacherUser = await User.findById(teacher);
  if (!teacherUser || teacherUser.role !== "TEACHER") {
    throw new Error("El profesor no es válido");
  }

  const subject = await Subject.create({
    name,
    course,
    teacher,
    type,
    active: true
  });

  return subject;
};

export const getSubjectsByCourse = async (courseId) => {
  return Subject.find({ course: courseId })
    .populate("teacher", "name email")
    .sort({ createdAt: -1 });
};
