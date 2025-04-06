const { HostService, InvitationService } = require('./services');

// Aquí el módulo no ejecuta código directamente, solo expone la interfaz.
class HostModule {
  static getInviteCode() {
    // Este método puede ser usado por otros componentes o interfaces
    return InvitationService.generateInviteCode();
  }

  static getInviteMessage(inviteCode) {
    // Este método puede ser usado para obtener el mensaje con el código de invitación
    return HostService.createInviteResponse(inviteCode);
  }

  static getServer() {
    return HostService.getServer();
  }

  static startServer(server, port) {
    // Llama al servicio para iniciar el servidor bootstrap
    HostService.startServer(server, port);
  }

  // Agregar un nodo a la base de datos
  static async addNode(id, ip, port) {
    // Llama al servicio para agregar un nodo a la base de datos
    await HostService.addNode(id, ip, port);
  }

  // Eliminar un nodo de la base de datos
  static async removeNode(inviteCode) {
    // Llama al servicio para eliminar un nodo
    await HostService.removeNode(inviteCode);
  }

  // Obtener todos los nodos activos
  static async getActiveNodes() {
    // Llama al servicio para obtener los nodos activos
    const activeNodes = await HostService.getActiveNodes();
    return activeNodes;
  }

  // Verificar nodos inactivos y eliminarlos
  static async checkNodeActivity() {
    // Llama al servicio para verificar los nodos inactivos
    await HostService.checkNodeActivity();
  }
}

module.exports = HostModule;
