const express = require("express");
const {getFav, saveFav, deleteFav} = require("../controllers/favMovieController");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

router.get("/favourites", isAuth, getFav);
router.post("/favourites", isAuth, saveFav);
router.delete("/favourites/:id", isAuth, deleteFav);

module.exports = router;
