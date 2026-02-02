import Grade from "../../models/grade-model.js";
import EvaluationItem from "../../models/evaluation-item-model.js";
import Evaluation from "../../models/evaluation-model.js";
import Subject from "../../models/subject-model.js";
import Enrollment from "../../models/enrollment-model.js";

export const setGrade = async ({
  teacherId,
  itemId,
  studentId,
  value
}) => {
  const item = await EvaluationItem.findById(itemId);
  if (!item) {
    throw new Error("Ítem evaluable no encontrado");
  }

  const evaluation = await Evaluation.findById(item.evaluation);
  const subject = await Subject.findById(evaluation.subject);

  if (subject.teacher.toString() !== teacherId) {
    throw new Error("No autorizado para esta asignatura");
  }

  const enrollment = await Enrollment.findOne({
    student: studentId,
    subject: subject._id,
    active: true
  });

  if (!enrollment) {
    throw new Error("Alumno no matriculado");
  }

  const grade = await Grade.findOneAndUpdate(
    { student: studentId, item: itemId },
    {
      value,
      createdBy: teacherId
    },
    {
      new: true,
      upsert: true
    }
  );

  return grade;
};

export const getGradesByItem = async (itemId) => {
  return Grade.find({ item: itemId })
    .populate("student", "name email")
    .sort({ createdAt: 1 });
};
