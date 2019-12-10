const bcrypt = require('bcryptjs')

const helpers = {}

// Para cifrar las contraseñas
helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

//Para el Loggeo
helpers.matchPass = async (password, savedPassword) => {
  // Comparar la contraseña dada con la guardada:
  try {
    return await bcrypt.compare(password, savedPassword)
  } catch (error) {
    console.log(error)
  }
}

module.exports = helpers