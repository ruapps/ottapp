const WatchHistory = require("../models/watchHistory");
const asyncHandler = require("../utils/asyncHandler");

exports.addWatchHistory = asyncHandler(async (req, res) => {
  const { movieId } = req.body;

  const lastWatch = await WatchHistory.findOne({
    user: req.user.id,
    movie: movieId,
  }).sort({ watchedAt: -1 });

  if (lastWatch) {
    const diff = Date.now() - new Date(lastWatch.watchedAt).getTime();

    const THIRTY_MIN = 30 * 60 * 1000;

    if (diff < THIRTY_MIN) {
      return res.status(200).json({
        message: "Already tracked recently",
      });
    }

    await WatchHistory.findOneAndUpdate(
      {
        user: req.user.id,
        movie: movieId,
      },
      { $set: { watchedAt: new Date() } }, // Updates the time to 'now'
      { new: true },
    );

    console.log("Watch history updated:", movieId);
    return res.status(200).json({
      success: true,
      message: "Existing item's timestamp updated after 30 minutes.",
    });
  }

  await WatchHistory.create({
    user: req.user.id,
    movie: movieId,
  });

  console.log("Watch history added:", req.user.id, movieId);

  return res.status(201).json({
    success: true,
  });
});
