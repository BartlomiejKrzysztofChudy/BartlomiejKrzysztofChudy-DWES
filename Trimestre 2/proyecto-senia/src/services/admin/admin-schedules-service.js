import Schedule from "../../models/schedule-model.js";
import Subject from "../../models/subject-model.js";

export const upsertSchedule = async (subjectId, data) => {
  const { dayOfWeek, startTime, endTime, classroom } = data;

  if (
    dayOfWeek === undefined ||
    !startTime ||
    !endTime ||
    !classroom
  ) {
    throw new Error("Datos incompletos");
  }

  const subject = await Subject.findById(subjectId);
  if (!subject) {
    throw new Error("Asignatura no encontrada");
  }

  const schedule = await Schedule.findOneAndUpdate(
    {
      subject: subjectId,
      dayOfWeek
    },
    {
      subject: subjectId,
      dayOfWeek,
      startTime,
      endTime,
      classroom
    },
    {
      new: true,
      upsert: true
    }
  );

  return schedule;
};

export const getSchedulesBySubject = async (subjectId) => {
  return Schedule.find({ subject: subjectId }).sort({ dayOfWeek: 1 });
};
