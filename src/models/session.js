const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Sesion para mantener un historial
const SessionSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  startedAt: {
    type: Date,
    required: true
  },
  lunch: {
    type: Object,
    startedAt: { type: Date },
    flag: { type: Boolean }
  },
  coffeeOne: {
    type: Object,
    startedAt: { type: Date },
    flag: { type: Boolean }
  },
  coffeTwo: {
    type: Object,
    startedAt: { type: Date },
    flag: { type: Boolean }
  },
  uP: {
    type: Object,
    timeLeft: { type: Date },
    flag: { type: Boolean }
  }
})

const Session = mongoose.model('Session', SessionSchema)

module.exports = Session