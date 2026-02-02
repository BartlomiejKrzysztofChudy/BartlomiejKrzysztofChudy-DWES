import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },

    startDate: {
      type: Date,
      required: true,
      default: Date.now
    },

    endDate: {
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

// Evitar doble matrícula activa
enrollmentSchema.index(
  { student: 1, subject: 1, active: 1 },
  { unique: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);
