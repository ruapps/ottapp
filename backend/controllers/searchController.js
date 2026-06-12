const Movie = require("../models/movie");
const asyncHandler = require("../utils/asyncHandler");
const synonyms = require("../utils/synonyms");

exports.searchMovies = asyncHandler(async (req, res) => {
  const query = req.query.q?.trim();

  if (!query) {
    return res.status(200).json([]);
  }

  const words = query.toLowerCase().split(" ");

  const expandedWords = new Set();

  words.forEach((word) => {
    expandedWords.add(word);

    if (synonyms[word]) {
      synonyms[word].forEach((term) => {
        expandedWords.add(term);
      });
    }
  });

  const searchQuery = Array.from(expandedWords).join(" ");

  const movies = await Movie.find(
    {
      $text: {
        $search: searchQuery,
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
