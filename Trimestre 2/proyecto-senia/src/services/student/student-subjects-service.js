import Enrollment from "../../models/enrollment-model.js";

export const getMySubjects = async (studentId) => {
  const enrollments = await Enrollment.find({
    student: studentId,
    active: true
  }).populate({
    path: "subject",
    populate: [
      { path: "teacher", select: "name" },
      { path: "course", select: "name" }
    ]
  });

  return enrollments.map((enrollment) => {
    const { subject } = enrollment;

    return {
      subjectId: subject._id,
      name: subject.name,
      teacher: subject.teacher,
      course: subject.course
    };
  });
};
