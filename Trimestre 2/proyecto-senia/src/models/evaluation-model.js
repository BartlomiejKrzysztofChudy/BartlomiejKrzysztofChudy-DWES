import mongoose from "mongoose";

const evaluationSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    order: {
      type: Number,
      required: true
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

evaluationSchema.index(
  { subject: 1, order: 1 },
  { unique: true }
);

export default mongoose.model("Evaluation", evaluationSchema);
