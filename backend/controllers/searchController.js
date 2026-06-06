const Movie = require("../models/movie");
const asyncHandler = require("../utils/asyncHandler");

exports.searchMovies = asyncHandler(async (req, res) => {
  const query = req.query.q?.trim();

  if (!query) {
    return res.status(200).json([]);
  }

  const movies = await Movie.find(
    {
      $text: {
        $search: query,
      },
    },
    {
      score: {
        $meta: "textScore",
      },
    },
  ).sort({
    score: {
      $meta: "textScore",
    },
  });

  res.status(200).json(movies);
});
