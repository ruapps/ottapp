const User = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");

exports.getFav = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
      .populate("savedMovies");
      // console.log(user);

    return res.json(user.savedMovies);

  })

exports.saveFav = asyncHandler(async (req, res) => {

    const { movieId } = req.body;
    console.log("Saving movie with ID:", movieId);
    const user = await User.findById(req.user.id);

    if (!user.savedMovies.includes(movieId)) {
      user.savedMovies.push(movieId);
      await user.save();
    }

    return res.json({ message: "Movie saved", movieId });
})

exports.deleteFav = asyncHandler(async (req, res) => {

    const movieId = req.params.id;
    console.log("Deleting movie with ID:", movieId);
    const user = await User.findById(req.user.id);

    user.savedMovies = user.savedMovies.filter(
      (id) => id.toString() !== movieId
    );

    await user.save();

    return res.json({ message: "Movie removed", movieId });

})
