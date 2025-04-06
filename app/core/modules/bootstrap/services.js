import HostModule from './modules/HostModule/main.js'

class BootstrapServices {
  static host(ip, port) {
    const server = HostModule.createServer();
    return HostModule.startServer(server, ip, port);
  }
}

export default BootstrapServices;