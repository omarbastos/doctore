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
    default: Date.now,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  grupo: { 
    type: String,
    // required: true
  },
  isActive: {
    // Cambiará si está loggeado o no, será true cuando inicie sesión, false SOLO cuando de logout, si queda siendo true e inicia sesion, buscará la última sesión con este user ID, comprobará si el día es el mismo, en tal caso, cargará esa sesión otra vez, si no, la cerrará y creará una nueva.
    type: Boolean,
    default: false
  },
  lastSessionId: {
    // Cuando se inicie una nueva sesión, se guardará el id acá para hacer la busqueda mas rapido
    type: String
  }
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
