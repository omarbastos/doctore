const mongoose = require('mongoose')
const passport = require('passport')
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const settings = require('../config/settings')
require('../config/passport')(passport)
const User = require('../models/user')

// Para crear usuario
router.post('/register', async (req, res) => {
  console.log(req.body)
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Por favor escribir usuario y contraseña'})
  } else {
    try {
      const body = req.body
      console.log(body)
      const newUser = await User.create(body)
      console.log(newUser)
      res.status(200).json(newUser)

    } catch (error) {

      return res.status(500).json({
        message: 'Ocurrió un error',
        error
      })

    }
  }
})

// Para login
router.post('/login', (req, res) => {
  console.log(req.body)
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err

    if (!user) {
      res.status(401).send({success: false, msg: 'Usuario no encontrado.'})
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign(user.toJSON(), settings.secret)
          res.json({success: true, token: 'JWT '+ token})
        } else {
          res.status(401).send({success: false, msg: 'Contraseña erronea.'})
        }
      })
    }
  })
})

module.exports = router