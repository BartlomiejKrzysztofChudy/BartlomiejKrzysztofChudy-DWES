import Evaluation from "../../models/evaluation-model.js";
import Subject from "../../models/subject-model.js";

export const createEvaluation = async ({
  teacherId,
  subjectId,
  name,
  order
}) => {
  const subject = await Subject.findById(subjectId);
  if (!subject) {
    throw new Error("Asignatura no encontrada");
  }

  if (subject.teacher.toString() !== teacherId) {
    throw new Error("No autorizado para esta asignatura");
  }

  const evaluation = await Evaluation.create({
    subject: subjectId,
    name,
    order,
    active: true
  });

  return evaluation;
};

export const getEvaluationsBySubject = async (subjectId) => {
  return Evaluation.find({ subject: subjectId, active: true })
    .sort({ order: 1 });
};
