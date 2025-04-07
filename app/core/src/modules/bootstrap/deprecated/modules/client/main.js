// clientModule.js
const NetworkService = require('./services'); // Importamos el servicio

class ClientModule {
  static join(invitation) {
    // Delegamos la lógica de la conexión al servicio
    return NetworkService.join(invitation);
  }

  static ping(url, id, port) {
    // Delegamos la lógica de ping al servicio
    return NetworkService.ping(url, id, port);
  }

  static startPingLoop(url, id, port, interval = 5000) {
    // Delegamos la lógica del loop de ping al servicio
    return NetworkService.startPingLoop(url, id, port, interval);
  }
}

module.exports = ClientModule;
