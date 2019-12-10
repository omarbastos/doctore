const mongoose = require("mongoose");
const passport = require("passport");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("../config/passport");
const Verify = require("./verify");
const helpers = require("../config/helpers");

// Para crear usuario

router.post("/register", async (req, res, next) => {
  await passport.authenticate(
    "local.signup",
    { session: false },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json(user);
    }
  )(req, res, next);
});

// Para login
router.post("/login", async (req, res, next) => {
  await passport.authenticate("local.signin", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      if (info.message == 'Missing credentials') {
        info.message = 'Ingrese Usuario y Contraseña.'
      }
      res.status(401).json({
        err: info.message
      })
      return next(info.message)
    }

    var token = Verify.getToken(user);
    res.status(200).json({
      status: "Login successful!",
      success: true,
      token: token,
      user: user
    });
  })(req, res, next);
});

module.exports = router;
