import * as progressService from "../../services/student/student-dashboard-progress-service.js";

export const getMyProgress = async (req, res, next) => {
  try {
    const progress = await progressService.getMyProgress(req.user.id);
    res.json(progress);
  } catch (error) {
    next(error);
  }
};
