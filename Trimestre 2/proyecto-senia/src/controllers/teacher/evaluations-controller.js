import * as evaluationsService from "../../services/teacher/evaluations-service.js";

export const createEvaluation = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const { name, order } = req.body;

    const evaluation = await evaluationsService.createEvaluation({
      teacherId: req.user.id,
      subjectId,
      name,
      order
    });

    res.status(201).json(evaluation);
  } catch (error) {
    next(error);
  }
};

export const getEvaluationsBySubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    const evaluations =
      await evaluationsService.getEvaluationsBySubject(subjectId);

    res.json(evaluations);
  } catch (error) {
    next(error);
  }
};
