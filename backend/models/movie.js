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
    // searchableText: String
  },
  { collection: "movies" } // explicitly connect to existing collection
);

// movieSchema.pre("save", function(next) {

//   this.searchableText = `
//     ${this.Title || ""}
//     ${this.overview || ""}
//     ${(this.genre || []).join(" ")}
//     ${this.original_language || ""}
//   `;

//   next();
// });

// movieSchema.index({
//   searchableText: "text"
// });

module.exports = mongoose.model("Movie", movieSchema);
