const app = require('../app')
const debug = require('debug')('mean-app:server')
const http = require('http')

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

// Creando el servidor HTTP
const server = http.createServer(app)

server.listen(port, (req, res) => {
  console.log('Servidor en el puerto:', port)
  console.log('Inicializando conexión con la base de datos...')
})
server.on('error', onError)
server.on('listening', onListening)

// Normalize a port into a number, string, or false
function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }

  if (port >= 0) {
    return port
  }

  return false
}

// Event Listener para el error en el servidor HTTP
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // Casos de errores
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event Listener para el evento Listening en el servidor HTTP
function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port
  debug('Listening on ' + bind)
}