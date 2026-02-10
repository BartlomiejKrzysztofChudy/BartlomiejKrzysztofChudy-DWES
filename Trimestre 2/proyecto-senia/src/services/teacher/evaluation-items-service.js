import EvaluationItem from "../../models/evaluation-item-model.js";
import Evaluation from "../../models/evaluation-model.js";
import Subject from "../../models/subject-model.js";

export const createEvaluationItem = async ({
  teacherId,
  evaluationId,
  name,
  type,
  weight
}) => {
  const evaluation = await Evaluation.findById(evaluationId);
  if (!evaluation) {
    throw new Error("Evaluación no encontrada");
  }

  const subject = await Subject.findById(evaluation.subject);
  if (!subject || subject.teacher.toString() !== teacherId) {
    throw new Error("No autorizado para esta evaluación");
  }

  const item = await EvaluationItem.create({
    evaluation: evaluationId,
    name,
    type,
    weight,
    active: true
  });

  return item;
};

export const getItemsByEvaluation = async (evaluationId) => EvaluationItem.find({ evaluation: evaluationId, active: true })
  .sort({ createdAt: 1 });
