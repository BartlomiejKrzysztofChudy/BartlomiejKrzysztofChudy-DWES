db.movies.aggregate([
  {
    $unwind: "$genres"
  },
  {
    $group: {
      _id: {
        genero: "$genres",
        año: "$year"
      },
      peliculas: {
        $push: {
          titulo: "$title",
          imdb: "$imdb.rating"
        }
      },
      total: { $sum: 1 }
    }
  },
  {
    $group: {
      _id: "$_id.genero",
      años: {
        $push: {
          año: "$_id.año",
          total: "$total",
          peliculas: "$peliculas"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      genero: "$_id",
      años: 1
    }
  },
  {
    $sort: {
      genero: 1
    }
  }
])
