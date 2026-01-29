import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    alumno: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    asignatura: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
