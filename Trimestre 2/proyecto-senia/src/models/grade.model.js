import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true
    },
    tipo: {
      type: String,
      enum: ["examen", "trabajo", "practica"],
      required: true
    },
    nota: {
      type: Number,
      min: 0,
      max: 10,
      required: true
    },
    fecha: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const Grade = mongoose.model("Grade", gradeSchema);
export default Grade;
