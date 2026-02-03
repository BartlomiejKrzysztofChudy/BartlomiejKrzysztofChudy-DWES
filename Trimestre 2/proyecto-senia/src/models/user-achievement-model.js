import mongoose from "mongoose";

const userAchievementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    achievement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Achievement",
      required: true
    },
    achievedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("UserAchievement", userAchievementSchema);
