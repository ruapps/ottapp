const mongoose = require("mongoose");
const User = require("../models/user");
const Profile = require("../models/profile");
const { check, validationResult } = require("express-validator");

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "fullName email userType",
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile was not found" });
    }
    console.log(profile);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = [
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

  check("bio")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Bio must not exceed 500 characters"),

  check("phoneNumber")
    .optional()
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number"),

  check("location")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Location must be valid"),

  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { fullName, email, bio, phoneNumber, location } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await session.commitTransaction();
      session.endSession();

      return res.status(422).json({
        check: true,
        errors: errors.array().map((err) => err.msg),
        oldInput: { fullName, email, bio, phoneNumber, location },
      });
    }

    try {
      // 1️⃣ Update User model fields
      await User.findByIdAndUpdate(
        req.user.id,
        { fullName, email },
        { new: true, runValidators: true, session },
      );

      // 2️⃣ Update Profile model fields
      await Profile.findOneAndUpdate(
        { user: req.user.id },
        { bio, phoneNumber, location },
        { new: true, session },
      );

      // 3️⃣ Fetch fully populated updated profile
      const updatedProfile = await Profile.findOne({
        user: req.user.id,
      })
        .populate("user", "fullName email userType")
        .session(session);

      // console.log("Updated profile:", updatedProfile);
      await session.commitTransaction();
      session.endSession();

      res.json(updatedProfile);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error.code === 11000) {
        return res.status(400).json({ message: "Email already exists" });
      }

      res.status(500).json({ message: error.message });
    }
  },
];
