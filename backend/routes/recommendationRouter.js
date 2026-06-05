const express = require("express");

const router = express.Router();

const isAuth =
require("../middleware/isAuth");

const {
  getRecommendations
} = require(
 "../controllers/recommendationController"
);

router.get(
 "/recommendations",
 isAuth,
 getRecommendations
);

module.exports = router;