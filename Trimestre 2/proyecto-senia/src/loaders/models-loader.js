import User from "../models/user.model.js";
import Subject from "../models/subject.model.js";
import Enrollment from "../models/enrollment.model.js";
import Grade from "../models/grade.model.js";
import Attendance from "../models/attendance.model.js";

const loadModels = () => {
  console.log("Modelos cargados:");
  console.log("- User");
  console.log("- Subject");
  console.log("- Enrollment");
  console.log("- Grade");
  console.log("- Attendance");
};

export default loadModels;
