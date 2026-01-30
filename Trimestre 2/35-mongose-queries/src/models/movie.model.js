import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: String,
    genres: [String],
    year: Number,
    rated: String,
    type: String
  },
  { collection: 'movies' }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
