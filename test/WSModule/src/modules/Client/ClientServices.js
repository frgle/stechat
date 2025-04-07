import WebSocket from 'ws';
import crypto from 'crypto';

class ClientServices {
	static createSocket(serverLink) {
		return new WebSocket(serverLink);
	}

	static randomId() {
		return crypto.randomBytes(16).toString('hex');
	}
}

export default ClientServices;