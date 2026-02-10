import Achievement from "../models/achievement-model.js";
import Announcement from "../models/announcement-model.js";
import Attendance from "../models/attendance-model.js";
import Course from "../models/course-model.js";
import Enrollment from "../models/enrollment-model.js";
import Evaluation from "../models/evaluation-model.js";
import EvaluationItem from "../models/evaluation-item-model.js";
import Grade from "../models/grade-model.js";
import Schedule from "../models/schedule-model.js";
import Subject from "../models/subject-model.js";
import User from "../models/user-model.js";
import UserAchievement from "../models/user-achievement-model.js";

const loadModels = () => {
  return {
    Achievement,
    Announcement,
    Attendance,
    Course,
    Enrollment,
    Evaluation,
    EvaluationItem,
    Grade,
    Schedule,
    Subject,
    User,
    UserAchievement
  };
};

export default loadModels;
