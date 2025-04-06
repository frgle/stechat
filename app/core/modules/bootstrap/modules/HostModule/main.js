import HostServices from './services.js';

class HostModule {
	static createServer() {
		return HostServices.createServer();
	}

	static startServer(server, ip, port) {
		return HostServices.startServer(server, ip, port);
	}
}

export default HostModule;