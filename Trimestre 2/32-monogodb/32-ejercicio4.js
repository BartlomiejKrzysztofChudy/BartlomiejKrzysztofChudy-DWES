use sample_mflix;
db.movies.aggregate([
    {
        $match: {
            $expr: {
                $gte: [
                    { $size: "$directors" },
                    3
                ]
            }
        }
    }
]);
