import Enrollment from "../../models/enrollment-model.js";
import Subject from "../../models/subject-model.js";
import Evaluation from "../../models/evaluation-model.js";
import EvaluationItem from "../../models/evaluation-item-model.js";
import Grade from "../../models/grade-model.js";
import Attendance from "../../models/attendance-model.js";

export const getMySubjectDetail = async (studentId, subjectId) => {
  const enrollment = await Enrollment.findOne({
    student: studentId,
    subject: subjectId,
    active: true
  });

  if (!enrollment) {
    throw new Error("No estás matriculado en esta asignatura");
  }

  const subject = await Subject.findById(subjectId).populate(
    "teacher",
    "name"
  );

  const evaluation = await Evaluation.findOne({
    subject: subjectId,
    active: true
  });

  let grades = [];

  if (evaluation) {
    const items = await EvaluationItem.find({
      evaluation: evaluation._id,
      active: true
    });

    for (const item of items) {
      const grade = await Grade.findOne({
        student: studentId,
        item: item._id
      });

      grades.push({
        item: item.name,
        value: grade ? grade.value : null
      });
    }
  }

  const attendances = await Attendance.find({
    student: studentId,
    subject: subjectId
  });

  const total = attendances.length;
  const absences = attendances.filter(a => a.status === "ABSENT").length;
  const lates = attendances.filter(a => a.status === "LATE").length;
  const presents = attendances.filter(a => a.status === "PRESENT").length;

  const percentage =
    total > 0 ? Math.round((presents / total) * 100) : 0;

  return {
    subject: {
      id: subject._id,
      name: subject.name,
      teacher: subject.teacher
    },
    evaluation: evaluation
      ? { id: evaluation._id, name: evaluation.name }
      : null,
    grades,
    attendance: {
      percentage,
      absences,
      lates
    }
  };
};
