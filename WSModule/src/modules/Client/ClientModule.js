import ClientServices from './ClientServices.js';

class ClientModule {
	constructor() {
		this.connections = {};
	}

	connect(serverLink) {
		if (typeof serverLink !== 'string' || serverLink.trim() === '') {
			return { error: 'Invalid serverLink' };
		}

		try {
			const socket = ClientServices.createSocket(serverLink);
			const connectionId = ClientServices.randomId();

			this.connections[connectionId] = {
				ws: socket,
				received: []
			};

			socket.on('message', (message) => {
				if (this.connections[connectionId]) {
					this.connections[connectionId].received.push({
						timestamp: Date.now(),
						value: message,
					});
				}
			});

			return { success: true, connectionId };
		} catch (err) {
			return { error: 'Connection failed' };
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
}

export default new ClientModule();
