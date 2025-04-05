const crypto = require('crypto');
const http = require('http');

// Servicio de invitación
class InvitationService {
  static generateInviteCode() {
    return crypto.randomBytes(16).toString('hex');  // Código único
  }

  static validateInviteCode(inviteCode) {
    return typeof inviteCode === 'string' && inviteCode.length === 32;
  }
}

// Servicio de servidor bootstrap
class BootstrapService {
  static createInviteResponse() {
    const inviteCode = InvitationService.generateInviteCode();
    return `Tu código de invitación es: localhost:8080/join/${inviteCode}`;
  }

  static startServer(port, handleRequest) {
    const server = http.createServer(handleRequest);
    server.listen(port, () => {
      console.log(`Servidor bootstrap funcionando en http://localhost:${port}`);
    });
  }
}

module.exports = {
  InvitationService,
  BootstrapService
};
