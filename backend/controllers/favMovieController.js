const User = require("../models/user");

exports.getFav = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id)
      .populate("savedMovies");
      console.log(user);

    res.json(user.savedMovies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching saved movies" });
  }
};

exports.saveFav = async (req, res) => {
  try {
    const { movieId } = req.body;

    const user = await User.findById(req.session.user.id);

    if (!user.savedMovies.includes(movieId)) {
      user.savedMovies.push(movieId);
      await user.save();
    }

    res.json({ message: "Movie saved", movieId });
  } catch (err) {
    res.status(500).json({ message: "Error saving movie" });
  }
};

exports.deleteFav = async (req, res) => {
  try {
    const movieId = req.params.id;
    console.log("Deleting movie with ID:", movieId);
    const user = await User.findById(req.session.user.id);

    user.savedMovies = user.savedMovies.filter(
      (id) => id.toString() !== movieId
    );

    await user.save();

    res.json({ message: "Movie removed", movieId });
  } catch (err) {
    res.status(500).json({ message: "Error deleting movie" });
  }
};
