db.movies.aggregate([
  {
    $addFields: {
      rating_num: {
        $convert: {
          input: "$imdb.rating",
          to: "double",
          onError: null,
          onNull: null
        }
      }
    }
  },
  {
    $match: {
      rating_num: { $ne: null }
    }
  },
  {
    $addFields: {
      categoria: { $floor: "$rating_num" }
    }
  },
  {
    $group: {
      _id: "$categoria",
      valoracion_media_calculada: { $avg: "$rating_num" },
      peliculas: {
        $push: {
          nombre: "$title",
          año: "$year"
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      categoria: "$_id",
      valoracion_media_calculada: { $round: ["$valoracion_media_calculada", 2] },
      peliculas: 1
    }
  },
  {
    $sort: { categoria: -1 }
  }
])
