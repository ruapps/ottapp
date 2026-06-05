const Movie = require("../models/movie");
const User = require("../models/user");
const WatchHistory = require("../models/watchHistory");
const asyncHandler = require("../utils/asyncHandler");

exports.getRecommendations = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Get user with saved movies
  const user = await User.findById(userId).populate("savedMovies");

  // Get watch history with movie details
  const history = await WatchHistory.find({ user: userId }).populate("movie");

  // Collect user preferred genres
  const genreSet = new Set();

  // Collect movies that should not be recommended again
  const excludedMovieIds = new Set();

  if (user.savedMovies) {
    user.savedMovies.forEach((movie) => {
      excludedMovieIds.add(movie._id.toString());
      movie.genre?.forEach((g) => genreSet.add(g.toLowerCase()));
    });
  }

  history.forEach((entry) => {
    if (!entry.movie) return;

    excludedMovieIds.add(entry.movie._id.toString());

    entry.movie?.genre?.forEach((g) => genreSet.add(g.toLowerCase()));
  });

  const genres = [...genreSet];

  const movies = await Movie.find({
    _id: {
      $nin: [...excludedMovieIds],
    },
  });

  const scoredMovies = movies.map((movie) => {
    let score = 0;

    movie.genre?.forEach((g) => {
      if (genres.includes(g.toLowerCase())) {
        score++;
      }
    });

    return {
      movie,
      score,
    };
  });

  scoredMovies.sort((a, b) => b.score - a.score);

  const recommendations = scoredMovies
    .filter((item) => item.score > 0)
    .slice(0, 10)
    .map((item) => item.movie);

  // console.log("Recommendations for user", userId, ":", recommendations.map(m => m.Title));

  res.status(200).json(recommendations);
});
