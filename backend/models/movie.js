const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {},
  { collection: "movies" } // explicitly connect to existing collection
);

module.exports = mongoose.model("Movie", movieSchema);
