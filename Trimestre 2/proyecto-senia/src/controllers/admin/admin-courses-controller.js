import * as adminCoursesService from "../../services/admin/admin-courses-service.js";

export const createCourse = async (req, res, next) => {
  try {
    const course = await adminCoursesService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

export const getCourses = async (req, res, next) => {
  try {
    const courses = await adminCoursesService.getCourses();
    res.json(courses);
  } catch (error) {
    next(error);
  }
};
