import Subject from "../../models/subject-model.js";
import Schedule from "../../models/schedule-model.js";
import Enrollment from "../../models/enrollment-model.js";
import Evaluation from "../../models/evaluation-model.js";
import EvaluationItem from "../../models/evaluation-item-model.js";
import Grade from "../../models/grade-model.js";

export const getTeacherDashboard = async (teacherId) => {
  const today = new Date().getDay();

  const subjects = await Subject.find({
    teacher: teacherId,
    active: true
  });

  const classes = [];

  for (const subject of subjects) {
    const schedule = await Schedule.findOne({
      subject: subject._id,
      dayOfWeek: today
    });

    if (!schedule) continue;

    const enrollments = await Enrollment.find({
      subject: subject._id,
      active: true
    });

    const studentsCount = enrollments.length;

    const evaluation = await Evaluation.findOne({
      subject: subject._id,
      active: true
    });

    let classAverage = null;

    if (evaluation && studentsCount > 0) {
      const items = await EvaluationItem.find({
        evaluation: evaluation._id,
        active: true
      });

      let total = 0;
      let countedStudents = 0;

      for (const enrollment of enrollments) {
        let studentSum = 0;
        let studentItems = 0;

        for (const item of items) {
          const grade = await Grade.findOne({
            student: enrollment.student,
            item: item._id
          });

          if (grade) {
            studentSum += grade.value;
            studentItems++;
          }
        }

        if (studentItems > 0) {
          total += studentSum / studentItems;
          countedStudents++;
        }
      }

      if (countedStudents > 0) {
        classAverage = Number((total / countedStudents).toFixed(2));
      }
    }

    classes.push({
      subjectId: subject._id,
      subjectName: subject.name,
      type: subject.type,
      schedule: {
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        classroom: schedule.classroom
      },
      studentsCount,
      classAverage
    });
  }

  return { classes };
};
