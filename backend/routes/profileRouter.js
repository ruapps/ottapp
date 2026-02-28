const express = require("express");
const {getMyProfile, updateProfile} = require("../controllers/profileController");
const router = express.Router();
const isAuth = require("../middleware/isAuth");

router.get("/", isAuth, getMyProfile);
router.put("/", isAuth, updateProfile);

module.exports = router;
