import * as itemsService from "../../services/teacher/evaluation-items-service.js";

export const createEvaluationItem = async (req, res, next) => {
  try {
    const { evaluationId } = req.params;
    const { name, type, weight } = req.body;

    const item = await itemsService.createEvaluationItem({
      teacherId: req.user.id,
      evaluationId,
      name,
      type,
      weight
    });

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

export const getItemsByEvaluation = async (req, res, next) => {
  try {
    const { evaluationId } = req.params;

    const items = await itemsService.getItemsByEvaluation(evaluationId);
    res.json(items);
  } catch (error) {
    next(error);
  }
};
