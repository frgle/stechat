import HostModule from './modules/HostModule/main.js'

class BootstrapServices {
  static hostModule(ip, port, code) {
    return HostModule;
  }
}

export default BootstrapServices;