import * as dashboardService from "../../services/teacher/teacher-dashboard-service.js";

export const getTeacherDashboard = async (req, res, next) => {
  try {
    const dashboard = await dashboardService.getTeacherDashboard(req.user.id);
    res.json(dashboard);
  } catch (error) {
    next(error);
  }
};
