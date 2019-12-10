const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const User = require("../models/user");
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, done) => {
      await User.findOne({ username }, async (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Nombre de usuario incorrecto."
          });
        }
        const validPass = await helpers.matchPass(password, user.password);

        if (!validPass) {
          return done(null, false, { message: "Contraseña incorrecta." });
        }

        return done(null, user);
      });
    }
  )
);

passport.use(
  "local.signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const user = await User.findOne({ username: req.body.username }, async (err, user) => {
        if (user) { return done(null, false, { message: 'El usuario ya existe.' }) }
      })
      console.log("Comienza la promesa...");
      const newUser = {
        username: req.body.username,
        password: req.body.password,
        level: req.body.level,
        grupo: req.body.grupo
      };
      // Cifrar la contraseña
      newUser.password = await helpers.encryptPassword(newUser.password);
      
      console.log(newUser);
      // Guardar al usuario en la base de datos
      const result = await User.create(newUser);
      console.log(result);

      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  const user = await User.findOne({ username }, async (err, user) => {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
  done(null, user);
});
