db.movies.aggregate([
  {
    $match: {
      languages: "Spanish"
    }
  },
  {
    $group: {
      _id: null,
      total: { $sum: 1 },
      peliculas: {
        $push: {
          nombre: "$title",
          año: "$year",
          valoracion_imdb: "$imdb.rating",
          generos: "$genres"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      total: 1,
      peliculas: 1
    }
  }
])
