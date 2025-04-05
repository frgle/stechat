const { BootstrapService, InvitationService } = require('./services');

// Aquí el módulo no ejecuta código directamente, solo expone la interfaz.
class BootstrapModule {
  static getInviteCode() {
    // Este método puede ser usado por otros componentes o interfaces
    return InvitationService.generateInviteCode();
  }

  static getInviteMessage() {
    // Este método puede ser usado para obtener el mensaje con el código de invitación
    return BootstrapService.createInviteResponse();
  }

  static startServer(port, handleRequest) {
    // Llama al servicio para iniciar el servidor bootstrap
    BootstrapService.startServer(port, handleRequest);
  }
}

module.exports = BootstrapModule;
