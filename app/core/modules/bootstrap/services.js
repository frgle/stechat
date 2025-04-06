import HostModule from './modules/HostModule/main.js'

class BootstrapServices {
  static host(ip, port, code) {
    const server = HostModule.createServer();

    server.get('/', (req, res) => {
      res.send("Server Bootstrap")
    });

    server.get('/join/:inviteCode', (req, res) => {
      const { inviteCode } = req.params;

      const isValidInviteCode = inviteCode === code;

      if (isValidInviteCode) {
        res.status(200).send("Acceso autorizado.");
      } else {
        res.status(400).send("Acceso no autorizado.");
      }
    });

    return HostModule.startServer(server, ip, port);
  }
}

export default BootstrapServices;