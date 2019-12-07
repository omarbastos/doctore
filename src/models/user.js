const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

// Usuario con username, pass y level, level es estatus Master, Supervisor o Agente
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  }
})

// Encriptar contraseñas 
/*
UserSchema.pre('save', (next) => {
  var user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if(err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})
*/

// Comparar contraseñas para loggeo
UserSchema.methods.comparePassword = (pass, cb) => {
  bcrypt.compare(pass, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

const User = mongoose.model('User', UserSchema)

module.exports = User