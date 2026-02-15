const mongoose = require("mongoose");

const DB = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
