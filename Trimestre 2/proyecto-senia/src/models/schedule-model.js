import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },

    dayOfWeek: {
      type: Number,
      required: true,
      min: 0,
      max: 6
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    classroom: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

scheduleSchema.index(
  { subject: 1, dayOfWeek: 1 },
  { unique: true }
);

export default mongoose.model("Schedule", scheduleSchema);
