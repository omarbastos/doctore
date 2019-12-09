const express = require("express");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const colors = require("colors");
var cors = require("cors");
const auth = require("./routes/auth");
const db = require("./db");
db();

// Inicializaciones
const app = express();
require("./config/passport");

//
app.use(
  cors({
    origin: "http://localhost:8080"
  })
);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.cookieParser())
app.use(passport.initialize());

// Global Variables
app.use((err, req, res, next) => {
  console.log(err);

  if (req.app.get("env") !== "development") {
    delete err.stack;
  }

  res.status(err.statusCode || 500).json(err);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes
app.use(require("./routes/"));
app.use("/api/auth", auth);

// Public
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
