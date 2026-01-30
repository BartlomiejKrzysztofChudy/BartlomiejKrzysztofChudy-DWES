import Grade from '../models/grade.model.js';

export const statsByStudentAndType = async () => {
  return Grade.aggregate([
    { $unwind: '$scores' },
    {
      $group: {
        _id: {
          student_id: '$student_id',
          type: '$scores.type'
        },
        avgScore: { $avg: '$scores.score' },
        minScore: { $min: '$scores.score' },
        maxScore: { $max: '$scores.score' }
      }
    }
  ]);
};


export const statsByClass = async () => {
  return Grade.aggregate([
    { $unwind: '$scores' },
    {
      $group: {
        _id: '$class_id',
        avgScore: { $avg: '$scores.score' },
        minScore: { $min: '$scores.score' },
        maxScore: { $max: '$scores.score' }
      }
    }
  ]);
};
