const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
   {
    Title: String,
    Year: String,
    Runtime: String,
    Poster: String,

    genre: [String],

    original_language: String,

    overview: String,
  },
  { collection: "movies" } // explicitly connect to existing collection
);

module.exports = mongoose.model("Movie", movieSchema);
