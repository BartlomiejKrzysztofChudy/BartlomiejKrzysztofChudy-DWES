import * as achievementsService from "../../services/student/student-achievements-service.js";

export const getMyAchievements = async (req, res, next) => {
  try {
    const achievements = await achievementsService.getMyAchievements(
      req.user.id
    );
    res.json(achievements);
  } catch (error) {
    next(error);
  }
};
