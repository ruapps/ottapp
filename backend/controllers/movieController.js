const Movie = require("../models/movie");
const asyncHandler = require("../utils/asyncHandler");


const getMovies = asyncHandler(async (req, res) => {

    const movies = await Movie.find({});
    res.status(200).json(movies);
})

module.exports = { getMovies };
