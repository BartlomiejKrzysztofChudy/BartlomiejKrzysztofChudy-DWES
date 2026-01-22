use sample_mflix
db.movies.find({ "tomatoes.viewer": { $exists: true } })
