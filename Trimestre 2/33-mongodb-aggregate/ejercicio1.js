db.movies.find({
    $match: {
        languages: {"English"}
    }
})