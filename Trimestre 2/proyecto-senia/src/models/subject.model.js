import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    curso: {
      type: String
    },
    profesor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
