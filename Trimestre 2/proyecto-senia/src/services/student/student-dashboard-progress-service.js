import UserAchievement from "../../models/user-achievement-model.js";

export const getMyProgress = async (studentId) => {
  const userAchievements = await UserAchievement.find({
    user: studentId
  })
    .sort({ achievedAt: -1 })
    .populate("achievement");

  const totalAchievements = userAchievements.length;

  const level = Math.floor(totalAchievements / 2) + 1;

  const currentLevelMin = (level - 1) * 2;
  const nextLevelMin = level * 2;

  const progress = {
    current: totalAchievements,
    min: currentLevelMin,
    max: nextLevelMin
  };

  const recentAchievements = userAchievements.slice(0, 2).map(ua => ({
    name: ua.achievement.name,
    description: ua.achievement.description,
    achievedAt: ua.achievedAt
  }));

  return {
    level: {
      number: level,
      name: `Nivel ${level}`
    },
    progress,
    recentAchievements
  };
};
