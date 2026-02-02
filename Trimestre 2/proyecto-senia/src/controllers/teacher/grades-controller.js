import * as gradesService from "../../services/teacher/grades-service.js";

export const setGrade = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { studentId, value } = req.body;

    const grade = await gradesService.setGrade({
      teacherId: req.user.id,
      itemId,
      studentId,
      value
    });

    res.status(201).json(grade);
  } catch (error) {
    next(error);
  }
};

export const getGradesByItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const grades = await gradesService.getGradesByItem(itemId);
    res.json(grades);
  } catch (error) {
    next(error);
  }
};
