import mongoose from "mongoose";

const evaluationItemSchema = new mongoose.Schema(
  {
    evaluation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluation",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["EXAM", "PRACTICE", "PROJECT", "ATTITUDE", "CUSTOM"],
      required: true
    },

    weight: {
      type: Number,
      required: true,
      min: 0,
      max: 100
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

evaluationItemSchema.index(
  { evaluation: 1, name: 1 },
  { unique: true }
);

export default mongoose.model("EvaluationItem", evaluationItemSchema);
