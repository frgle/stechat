import { ClientModule, ServerModule } from './services.js';

class Client {
	static message(connectionId, content) {
		const result = ClientModule.message(connectionId, content);
		return result;
	}

	static checkConnections() {
		return ClientModule.checkConnections();
	}

	static checkReceived(connectionId) {
		const result = ClientModule.checkReceived(connectionId);
		return result;
	}

	static connect(serverLink) {
		const result = ClientModule.connect(serverLink);
		return result;
	}
}

class Server {
	static message(connectionId, content) {
		const result = ServerModule.message(connectionId, content);
		return result;
	}

	static checkConnections() {
		return ServerModule.checkConnections();
	}

	static checkReceived(connectionId) {
		const result = ServerModule.checkReceived(connectionId);
		return result;
	}

	static getServerInfo() {
		const result = ServerModule.getServerInfo();
		return result;
	}

	static create(host, port) {
		const result = ServerModule.create(host, port);
		return result;
	}
	
	static init() {
		const result = ServerModule.init();
		return result;
	}

	static start() {
		const result = ServerModule.start();
		return result;
	}

	static stop() {
		const result = ServerModule.stop();
		return result;
	}
}

class WSModule {
	client = Client;
	server = Server;
}

export default new WSModule();
