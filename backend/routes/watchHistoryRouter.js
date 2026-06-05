const express = require("express");

const router = express.Router();

const isAuth = require("../middleware/isAuth");

const {
  addWatchHistory,
} = require("../controllers/watchHistoryController");

router.post(
  "/",
  isAuth,
  addWatchHistory
);

module.exports = router;