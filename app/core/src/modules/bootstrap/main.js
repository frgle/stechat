// main.js
import BootstrapServices from './services.js';

class BootstrapModule {
  static host(ip, port, passcode) {
    const HostModule = new BootstrapServices.hostModule();

    const server = HostModule.createServer(ip, port, passcode);

    server.get('/get-data/:inputcode', (req, res) => {
      const { inputcode } =  req.params;
      const isValidCode = HostModule.checkPasscode(inputcode);

      if (!isValidCode) {
        res.status(400).send("Invalid passcode");
        return;
      }

      return HostModule.getData();
    });

    server.listen(port, ip);
  }
}

export default BootstrapModule;