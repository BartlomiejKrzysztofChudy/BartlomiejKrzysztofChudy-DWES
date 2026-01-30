import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema(
  {
    student_id: Number,
    class_id: Number,
    scores: [
      {
        type: {
          type: String
        },
        score: Number
      }
    ]
  },
  {
    collection: 'grades'
  }
);

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;
