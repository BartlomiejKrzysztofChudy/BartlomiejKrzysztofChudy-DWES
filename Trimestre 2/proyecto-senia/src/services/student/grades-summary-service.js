import Evaluation from "../../models/evaluation-model.js";
import EvaluationItem from "../../models/evaluation-item-model.js";
import Grade from "../../models/grade-model.js";
import Enrollment from "../../models/enrollment-model.js";

export const getMyEvaluationGradesSummary = async ({
  studentId,
  evaluationId
}) => {
  const evaluation = await Evaluation.findById(evaluationId);
  if (!evaluation) {
    throw new Error("Evaluación no encontrada");
  }

  const enrollment = await Enrollment.findOne({
    student: studentId,
    subject: evaluation.subject,
    active: true
  });

  if (!enrollment) {
    throw new Error("No estás matriculado en esta asignatura");
  }

  const items = await EvaluationItem.find({
    evaluation: evaluationId,
    active: true
  });

  const summaryItems = [];
  let finalGrade = 0;

  for (const item of items) {
    const grade = await Grade.findOne({
      item: item._id,
      student: studentId
    });

    const value = grade ? grade.value : 0;
    const weightedValue = +(value * (item.weight / 100)).toFixed(2);

    finalGrade += weightedValue;

    summaryItems.push({
      itemId: item._id,
      name: item.name,
      weight: item.weight,
      value,
      weightedValue
    });
  }

  return {
    evaluationId,
    items: summaryItems,
    finalGrade: +finalGrade.toFixed(2)
  };
};
