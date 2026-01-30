db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $ne: null }
    }
  },
  {
    $group: {
      _id: { $floor: "$imdb.rating" },
      total: { $sum: 1 },
      peliculas: {
        $push: {
          titulo: "$title",
          year: "$year",
          rating: "$imdb.rating"
        }
      }
    }
  },
  {
    $sort: {
      _id: -1
    }
  },
  {
    $project: {
      _id: 0,
      categoria: "$_id",
      total: 1,
      peliculas: 1
    }
  }
])
