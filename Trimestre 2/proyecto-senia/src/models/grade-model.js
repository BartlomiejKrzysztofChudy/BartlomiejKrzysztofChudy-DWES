import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EvaluationItem",
      required: true
    },

    value: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

gradeSchema.index(
  { student: 1, item: 1 },
  { unique: true }
);

export default mongoose.model("Grade", gradeSchema);
