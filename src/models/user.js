const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  },
  status: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date, 
    default: Date.now
  },
  fullname: String/*,
  bossID: { 
    type: String, 
  }*/
})

const User = mongoose.model('User', UserSchema)

module.exports = User