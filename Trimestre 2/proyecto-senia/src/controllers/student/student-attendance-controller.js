import * as attendanceService from "../../services/student/student-attendance-service.js";

export const getMyAttendance = async (req, res, next) => {
  try {
    const attendance = await attendanceService.getMyAttendance(
      req.user.id,
      req.query
    );

    res.json(attendance);
  } catch (error) {
    next(error);
  }
};
