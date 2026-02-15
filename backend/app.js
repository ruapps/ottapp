require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const cors = require("cors");

const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRouter");
const authRoutes = require("./routes/authRouter");
const saveMovieRoutes = require("./routes/saveMovieRouter");
const labelRoutes = require("./routes/labelRouter");

const path = require("path");

const app = express();

connectDB();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // true only in HTTPS production
    },
  })
);


app.use("/", movieRoutes);

app.use("/auth", authRoutes);

app.use("/movies", saveMovieRoutes);

app.use("/labels", labelRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
  });
}


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
