const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const isAuth = require("../middleware/isAuth")
const router = express.Router();

router.post(
  "/signup",
  authController.signup
);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.get("/me", isAuth, authController.getMe);

module.exports = router;
