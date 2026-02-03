import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    targetType: {
      type: String,
      enum: ["ALL", "ROLE", "COURSE"],
      required: true
    },

    targetRoles: {
      type: [String],
      enum: ["ADMIN", "TEACHER", "STUDENT"],
      default: []
    },

    targetCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }
    ],

    publishedAt: {
      type: Date,
      default: Date.now
    },

    expiresAt: {
      type: Date,
      default: null
    },

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Announcement", announcementSchema);
