import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    enrollment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true
    },
    fecha: {
      type: Date,
      required: true
    },
    presente: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
