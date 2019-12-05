const express = require("express");
const path = require("path");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const colors = require("colors");

const book = require("./routes/book");
const auth = require("./routes/auth");
const db = require("./db");
db();

// Inicializaciones
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.use("/books", express.static(path.join(__dirname, "dist")));
app.use(require("./routes/"));
app.use("/book", book);
app.use("/api/auth", auth);

// Public
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
