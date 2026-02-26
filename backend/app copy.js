require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const cors = require("cors");

const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRouter");
const authRoutes = require("./routes/authRouter");
const favMovieRoutes = require("./routes/favMovieRouter");
const labelRoutes = require("./routes/labelRouter");

const path = require("path");

const app = express();

app.set("trust proxy", 1);

connectDB();

app.use(bodyParser.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://ottapp-pt2o.onrender.com",
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const isProduction = process.env.NODE_ENV === "production";

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
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction, // true only in HTTPS production
    },
  })
);


app.use("/", movieRoutes);

app.use("/auth", authRoutes);

app.use("/myhub", favMovieRoutes);

app.use("/labels", labelRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build", "index.html"));
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

