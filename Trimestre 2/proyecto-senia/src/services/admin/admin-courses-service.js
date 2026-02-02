import Course from "../../models/course-model.js";

export const createCourse = async (data) => {
  const { name } = data;

  if (!name) {
    throw new Error("El nombre del curso es obligatorio");
  }

  const existingCourse = await Course.findOne({ name });
  if (existingCourse) {
    throw new Error("El curso ya existe");
  }

  const course = await Course.create({
    name,
    active: true
  });

  return course;
};

export const getCourses = async () => {
  return Course.find().sort({ createdAt: -1 });
};
