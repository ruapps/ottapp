require("dotenv").config();

const mongoose = require("mongoose");
const Movie = require("../models/movie");

mongoose.connect(process.env.MONGO_URI);

async function updateMovies() {

  const movies = await Movie.find();

  for (const movie of movies) {

    movie.searchableText = `
      ${movie.Title || ""}
      ${movie.overview || ""}
      ${(movie.genre || []).join(" ")}
      ${movie.original_language || ""}
    `;

    await movie.save();
  }

  console.log("Movies Updated");
  process.exit();
}

updateMovies();