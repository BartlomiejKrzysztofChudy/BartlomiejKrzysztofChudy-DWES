use sample_mflix;
db.movies.find({
    languages: {
        $all: ["Spanish", "English"]
    }
});
