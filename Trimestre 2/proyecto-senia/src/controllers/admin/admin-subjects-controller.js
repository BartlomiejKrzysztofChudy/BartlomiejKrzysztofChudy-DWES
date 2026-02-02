import * as adminSubjectsService from "../../services/admin/admin-subjects-service.js";

export const createSubject = async (req, res, next) => {
  try {
    const subject = await adminSubjectsService.createSubject(req.body);
    res.status(201).json(subject);
  } catch (error) {
    next(error);
  }
};

export const getSubjectsByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const subjects = await adminSubjectsService.getSubjectsByCourse(courseId);
    res.json(subjects);
  } catch (error) {
    next(error);
  }
};
