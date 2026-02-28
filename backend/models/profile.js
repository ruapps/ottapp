const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One profile per user
    },
    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true, collection: "profiles" }, // explicitly connect to existing collection
);

module.exports = mongoose.model("Profile", profileSchema);
