// main.js
import BootstrapServices from './services.js';

class BootstrapModule {
  static host(ip, port) {
    return BootstrapServices.host(ip, port);
  }
}

export default BootstrapModule;
