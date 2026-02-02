import Attendance from "../../models/attendance-model.js";
import Enrollment from "../../models/enrollment-model.js";
import Subject from "../../models/subject-model.js";
import User from "../../models/user-model.js";

export const markAttendance = async ({
  teacherId,
  subjectId,
  date,
  attendances
}) => {
  const teacher = await User.findById(teacherId);
  if (!teacher || teacher.role !== "TEACHER") {
    throw new Error("Usuario no autorizado");
  }

  const subject = await Subject.findById(subjectId);
  if (!subject) {
    throw new Error("Asignatura no encontrada");
  }

  if (subject.teacher.toString() !== teacherId) {
    throw new Error("No eres el profesor de esta asignatura");
  }

  const results = [];

  for (const item of attendances) {
    const { studentId, status } = item;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      subject: subjectId,
      active: true
    });

    if (!enrollment) {
      throw new Error("Alumno no matriculado en la asignatura");
    }

    const attendance = await Attendance.findOneAndUpdate(
      {
        student: studentId,
        subject: subjectId,
        date
      },
      {
        status,
        createdBy: teacherId
      },
      {
        new: true,
        upsert: true
      }
    );

    results.push(attendance);
  }

  return results;
};

export const getAttendanceBySubject = async (subjectId) => {
  return Attendance.find({ subject: subjectId })
    .populate("student", "name email")
    .sort({ date: 1 });
};

export const getAttendanceSummary = async ({ teacherId, subjectId }) => {
  const subject = await Subject.findById(subjectId);
  if (!subject) {
    throw new Error("Asignatura no encontrada");
  }

  if (subject.teacher.toString() !== teacherId) {
    throw new Error("No autorizado para esta asignatura");
  }

  const attendances = await Attendance.find({ subject: subjectId });

  const summary = {
    total: attendances.length,
    present: 0,
    absent: 0,
    late: 0,
    attendanceRate: 0
  };

  for (const a of attendances) {
    if (a.status === "PRESENT") summary.present++;
    if (a.status === "ABSENT") summary.absent++;
    if (a.status === "LATE") summary.late++;
  }

  if (summary.total > 0) {
    summary.attendanceRate = Math.round(
      (summary.present / summary.total) * 100
    );
  }

  return summary;
};
