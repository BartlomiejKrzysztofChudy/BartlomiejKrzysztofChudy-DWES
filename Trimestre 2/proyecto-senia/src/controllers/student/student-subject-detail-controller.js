import * as subjectDetailService from "../../services/student/student-subject-detail-service.js";

export const getMySubjectDetail = async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    const detail = await subjectDetailService.getMySubjectDetail(
      req.user.id,
      subjectId
    );

    res.json(detail);
  } catch (error) {
    next(error);
  }
};
