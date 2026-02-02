import * as summaryService from "../../services/student/grades-summary-service.js";

export const getMyGradesSummary = async (req, res, next) => {
  try {
    const { evaluationId } = req.params;

    const summary = await summaryService.getMyEvaluationGradesSummary({
      studentId: req.user.id,
      evaluationId
    });

    res.json(summary);
  } catch (error) {
    next(error);
  }
};
