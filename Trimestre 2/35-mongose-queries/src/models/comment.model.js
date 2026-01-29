import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    text: String,
    date: Date,
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    }
  },
  { collection: 'comments' }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
