import * as dashboardService from "../../services/student/student-dashboard-service.js";

export const getMyDashboard = async (req, res, next) => {
  try {
    const dashboard = await dashboardService.getMyDashboard(req.user.id);
    res.json(dashboard);
  } catch (error) {
    next(error);
  }
};
