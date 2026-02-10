import Enrollment from "../../models/enrollment-model.js";
import Subject from "../../models/subject-model.js";
import Evaluation from "../../models/evaluation-model.js";
import EvaluationItem from "../../models/evaluation-item-model.js";
import Grade from "../../models/grade-model.js";
import Attendance from "../../models/attendance-model.js";

export const getMyDashboard = async (studentId) => {
  const enrollments = await Enrollment.find({
    student: studentId,
    active: true
  }).populate({
    path: "subject",
    populate: { path: "teacher", select: "name" }
  });

  const subjectsDashboard = [];

  for (const enrollment of enrollments) {
    const { subject } = enrollment;

    const evaluation = await Evaluation.findOne({
      subject: subject._id,
      active: true
    });

    let averageGrade = null;

    if (evaluation) {
      const items = await EvaluationItem.find({
        evaluation: evaluation._id,
        active: true
      });

      let total = 0;
      let count = 0;

      for (const item of items) {
        const grade = await Grade.findOne({
          student: studentId,
          item: item._id
        });

        if (grade) {
          total += grade.value;
          count++;
        }
      }

      if (count > 0) {
        averageGrade = +(total / count).toFixed(2);
      }
    }

    const attendances = await Attendance.find({
      student: studentId,
      subject: subject._id
    });

    const totalAttendance = attendances.length;
    const presents = attendances.filter((a) => a.status === "PRESENT").length;

    const attendancePercentage =
      totalAttendance > 0
        ? Math.round((presents / totalAttendance) * 100)
        : 0;

    subjectsDashboard.push({
      subjectId: subject._id,
      name: subject.name,
      teacher: subject.teacher?.name || null,
      averageGrade,
      attendancePercentage
    });
  }

  return {
    subjects: subjectsDashboard
  };
};
