import UserAchievement from "../../models/user-achievement-model.js";

export const getMyAchievements = async (studentId) => {
  const achievements = await UserAchievement.find({
    user: studentId
  })
    .sort({ achievedAt: -1 })
    .populate("achievement");

  return achievements.map(ua => ({
    id: ua.achievement._id,
    name: ua.achievement.name,
    description: ua.achievement.description,
    icon: ua.achievement.icon,
    achievedAt: ua.achievedAt
  }));
};
