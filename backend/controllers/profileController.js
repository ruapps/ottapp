const mongoose = require("mongoose");
const User = require("../models/user");
const Profile = require("../models/profile");

exports.getMyProfile = async (req, res) => {
  try {

    const profile = await Profile.findOne({ user: req.user.id })
      .populate("user", "fullName email userType");

    if (!profile) {
        return res.status(404).json({ message: "Profile was not found" });
    }
    console.log(profile);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

exports.updateProfile = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
    console.log("Updating profile with data:", req.body);
  try {
    const { fullName, email, bio, phoneNumber, location } = req.body;

    // 1️⃣ Update User model fields
    await User.findByIdAndUpdate(
      req.user.id,
      { fullName, email },
      { new: true, runValidators: true, session }
    );

    // 2️⃣ Update Profile model fields
    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { bio, phoneNumber, location },
      {new: true, session }
    )

    // 3️⃣ Fetch fully populated updated profile
    const updatedProfile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", "fullName email userType").session(session);;

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
};