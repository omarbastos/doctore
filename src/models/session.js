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
  finishedAt: {
    type: Date,
  },
  state: {
    // Cambiará cuando se active un estado (lunch, coffee, UP, RS) para que sea mas rapido buscar el estado activo
    type: String,
    default: 'Working'
  },
  lunch: {
    type: Object,
    startedAt: { type: Date },
    isActive: { type: Boolean, deafult: false },
    flag: { type: Boolean }
  },
  coffeeOne: {
    type: Object,
    startedAt: { type: Date },
    isActive: { type: Boolean, deafult: false },
    flag: { type: Boolean }
  },
  coffeTwo: {
    type: Object,
    startedAt: { type: Date },
    isActive: { type: Boolean, deafult: false },
    flag: { type: Boolean }
  },
  uP: {
    type: Object,
    timeLeft: { type: Date },
    isActive: { type: Boolean, deafult: false },
    flag: { type: Boolean }
  }
})

const Session = mongoose.model('Session', SessionSchema)

module.exports = Session