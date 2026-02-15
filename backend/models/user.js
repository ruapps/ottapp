const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
    type: String,
    required: [true, 'First name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  userType: {
    type: String,
    enum: ['adult', 'kid'],
    default: 'guest'
  },
    savedMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
      },
    ],
  },
  // { timestamps: true }
);

module.exports = mongoose.model("User", userSchema)
