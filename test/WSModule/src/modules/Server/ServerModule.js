import ServerServices from './ServerServices.js';

class ServerModule {
	constructor() {
		this.connections = {};
		this.wss = null;
	}

	create(host, port) {
		if (typeof host !== 'string' || host.trim() === '') {
			return { error: 'Invalid host' };
		}
		if (typeof port !== 'number' || port <= 0) {
			return { error: 'Invalid port' };
		}

		try {
			this.host = host;
			this.port = port;
			this.wss = ServerServices.create(host, port);
			return { success: true };
		} catch (err) {
			return { error: 'Failed to create server' };
		}
	}

	init() {
		if (!this.wss) {
			return { error: 'Server not initialized' };
		}

		try {
			this.wss.on('connection', (ws) => {
				const connectionId = ServerServices.randomId();

				this.connections[connectionId] = {
					ws: ws,
					received: []
				};

				ws.on('message', (message) => {
					if (this.connections[connectionId]) {
						this.connections[connectionId].received.push({
							timestamp: Date.now(),
							value: message
						});
						try {
							ws.send(`Echoing back: ${message}`);
						} catch (err) {
							// Silently fail
						}
					}
				});
			});
			return { success: true };
		} catch (err) {
			return { error: 'Failed to initialize connections' };
		}
	}

	checkConnections() {
		return this.connections;
	}

	checkReceived(connectionId) {
		if (!this.connections[connectionId]) {
			return { error: 'Invalid connectionId' };
		}
		return this.connections[connectionId].received;
	}

	message(connectionId, content) {
		if (!this.connections[connectionId]) {
			return { error: 'Invalid connectionId' };
		}
		if (typeof content !== 'string' || content.trim() === '') {
			return { error: 'Invalid message content' };
		}
		try {
			const socket = this.connections[connectionId].ws;
			socket.send(content);
			return { success: true };
		} catch (err) {
			return { error: 'Failed to send message' };
		}
	}

	start() {
		if (!this.wss) {
			return { error: 'Server not initialized' };
		}
		try {
			this.wss.on('listening', () => {});
			return { success: true };
		} catch (err) {
			return { error: 'Failed to start server' };
		}
	}

	stop() {
		if (!this.wss) {
			return { error: 'Server not initialized' };
		}
		try {
			this.wss.close(() => {});
			return { success: true };
		} catch (err) {
			return { error: 'Failed to stop server' };
		}
	}

	getServerInfo() {
		if (!this.host || !this.port) {
			return { error: 'Server info not available' };
		}
		return {
			address: `ws://${this.host}/${this.port}`,
			host: this.host,
			port: this.port
		};
	}
}

export default new ServerModule();
