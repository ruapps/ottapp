const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true, // for search
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Label", labelSchema);