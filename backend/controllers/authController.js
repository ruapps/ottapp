const User = require("../models/user");
const Profile = require("../models/profile");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const mongoose = require("mongoose");

exports.getMe = (req, res) => {
  // console.log(req.user)
  if (!req.user) {
    return res.status(401).json({
      errors: ["User not logged in"],
    });
  }

  return res.status(200).json(req.user);
};

exports.signup = [
  check("fullName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name should be atleast 2 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First Name should contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[!@&]/)
    .withMessage("Password should contain atleast one special character")
    .trim(),

  check("confirmPass")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Pin do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["adult", "kid"])
    .withMessage("Invalid user type"),

    asyncHandler(async (req, res) => {
    const { fullName, email, password, userType } = req.body;
    // console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array().map((err) => err.msg),
        oldInput: { fullName, email, password, userType },
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        await session.abortTransaction();
        session.endSession();

        return res.status(422).json({
          errors: ["User already exist"],
          oldInput: { fullName, email, password, userType },
        });
      }

      const hashedPass = await bcrypt.hash(password, 12);

      // Create User
      const user = await User.create(
        [
          {
            fullName,
            email,
            password: hashedPass,
            userType,
          },
        ],
        { session },
      );
      // Create Profile linked to the user
      await Profile.create(
        [
          {
            user: user[0]._id,
          },
        ],
        { session },
      );
      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({});
  
 
  })

  
];

exports.login = asyncHandler( async (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        errors: ["User does not exist"],
        oldInput: { email },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        errors: ["Invalid password"],
        oldInput: { email },
      });
    }

    // CREATE JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({

        id: user._id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
    });

})

exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({

    status: "Logout success",

  });
};
