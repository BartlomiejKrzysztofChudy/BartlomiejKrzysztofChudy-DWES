use sample_flix
db.movies.find({ year: { $gte: 2000 } })
