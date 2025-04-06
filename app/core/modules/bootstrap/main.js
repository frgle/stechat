// main.js
import BootstrapServices from './services.js';

class BootstrapModule {
  static host(ip, port, code) {
    return BootstrapServices.host(ip, port, code);
  }
}

export default BootstrapModule;
