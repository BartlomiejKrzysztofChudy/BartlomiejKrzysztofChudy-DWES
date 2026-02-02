import * as summaryService from "../../services/teacher/grades-summary-service.js";

export const getGradesSummary = async (req, res, next) => {
  try {
    const { evaluationId } = req.params;

    const summary = await summaryService.getEvaluationGradesSummary({
      teacherId: req.user.id,
      evaluationId
    });

    res.json(summary);
  } catch (error) {
    next(error);
  }
};
