import Attendance from "../../models/attendance-model.js";

export const getMyAttendance = async (studentId, { month, year }) => {
  const query = { student: studentId };

  if (month && year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    query.date = {
      $gte: startDate,
      $lte: endDate
    };
  }

  return Attendance.find(query)
    .populate("subject", "name")
    .sort({ date: 1 });
};
