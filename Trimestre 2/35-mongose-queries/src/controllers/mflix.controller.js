import Comment from '../models/comment.model.js';

export const getCommentsByMovieAggregate = async () => {
  return Comment.aggregate([
    {
      $match: {
        movie_id: { $exists: true, $ne: null }
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: 'movie_id',
        foreignField: '_id',
        as: 'movie'
      }
    },
    { $unwind: '$movie' },
    {
      $project: {
        text: 1,
        date: 1,
        'movie.title': 1,
        'movie.genres': 1,
        'movie.year': 1,
        'movie.rated': 1,
        'movie.type': 1
      }
    },
    { $limit: 5 }
  ]);
};
