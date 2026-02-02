import * as attendanceService from "../../services/teacher/attendance-service.js";

export const markAttendance = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    const { date, attendances } = req.body;

    const result = await attendanceService.markAttendance({
      teacherId: req.user.id,
      subjectId,
      date,
      attendances
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAttendanceBySubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    const attendance =
      await attendanceService.getAttendanceBySubject(subjectId);

    res.json(attendance);
  } catch (error) {
    next(error);
  }
};

export const getAttendanceSummary = async (req, res, next) => {
  try {
    const { subjectId } = req.params;

    const summary = await attendanceService.getAttendanceSummary({
      teacherId: req.user.id,
      subjectId
    });

    res.json(summary);
  } catch (error) {
    next(error);
  }
};
