import Evaluation from "../../models/evaluation-model.js";
import EvaluationItem from "../../models/evaluation-item-model.js";
import Grade from "../../models/grade-model.js";
import Subject from "../../models/subject-model.js";

export const getEvaluationGradesSummary = async ({
  teacherId,
  evaluationId
}) => {
  const evaluation = await Evaluation.findById(evaluationId);
  if (!evaluation) {
    throw new Error("Evaluación no encontrada");
  }

  const subject = await Subject.findById(evaluation.subject);
  if (subject.teacher.toString() !== teacherId) {
    throw new Error("No autorizado para esta evaluación");
  }

  const items = await EvaluationItem.find({
    evaluation: evaluationId,
    active: true
  });

  const summaryItems = [];
  let finalGrade = 0;

  for (const item of items) {
    const grades = await Grade.find({ item: item._id });

    const avg =
      grades.length > 0
        ? grades.reduce((sum, g) => sum + g.value, 0) / grades.length
        : 0;

    const weightedValue = +(avg * (item.weight / 100)).toFixed(2);

    finalGrade += weightedValue;

    summaryItems.push({
      itemId: item._id,
      name: item.name,
      weight: item.weight,
      average: +avg.toFixed(2),
      weightedValue
    });
  }

  return {
    evaluationId,
    items: summaryItems,
    finalGrade: +finalGrade.toFixed(2)
  };
};
