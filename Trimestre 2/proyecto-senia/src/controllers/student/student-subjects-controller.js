import * as studentSubjectsService from "../../services/student/student-subjects-service.js";

export const getMySubjects = async (req, res, next) => {
  try {
    const subjects = await studentSubjectsService.getMySubjects(req.user.id);
    res.json(subjects);
  } catch (error) {
    next(error);
  }
};
