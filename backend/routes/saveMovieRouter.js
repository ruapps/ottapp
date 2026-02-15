const express = require("express");
const {getSaved, saveMovie, deleteMovie} = require("../controllers/saveMovieController");
const isAuth = require("../middleware/isAuth");
const router = express.Router();


router.get("/saved",  getSaved);
router.post("/saved",  saveMovie);
router.delete("/saved/:id",  deleteMovie);

module.exports = router;
