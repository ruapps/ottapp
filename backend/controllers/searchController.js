const Movie = require("../models/movie");
const asyncHandler = require("../utils/asyncHandler");

exports.searchMovies = asyncHandler(async (req, res) => {
  const query = req.query.q?.trim();

  if (!query) {
    return res.status(200).json([]);
  }

  const searchWords = query.toLowerCase().split(" ");

  const movies = await Movie.find({});

  const scoredMovies = movies.map((movie) => {
    let score = 0;

    const searchableText = `
      ${movie.Title}
      ${movie.overview}
      ${movie.original_language}
      ${movie.genre?.join(" ")}
   `.toLowerCase();

//    console.log(`${movie.Title} searchableText: ${searchableText}`);

    searchWords.forEach((word) => {
      if (searchableText.includes(word)) {
        score++;
      }
    });


    return {
      movie,
      score,
    };
  });

  const results = scoredMovies

    .filter((item) => item.score > 0)

    .sort((a, b) => b.score - a.score)

    .map((item) => item.movie);

  res.status(200).json(results);
});
