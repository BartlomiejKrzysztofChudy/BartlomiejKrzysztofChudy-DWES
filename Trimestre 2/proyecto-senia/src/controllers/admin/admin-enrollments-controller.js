import * as adminEnrollmentsService from "../../services/admin/admin-enrollments-service.js";

export const enrollStudent = async (req, res, next) => {
  try {
    const enrollment = await adminEnrollmentsService.enrollStudent(req.body);
    res.status(201).json(enrollment);
  } catch (error) {
    next(error);
  }
};

export const getEnrollmentsBySubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const enrollments =
      await adminEnrollmentsService.getEnrollmentsBySubject(subjectId);
    res.json(enrollments);
  } catch (error) {
    next(error);
  }
};
