import crypto from 'crypto';
import {WebSocketServer} from 'ws';

class ServerServices {
	static create(host, port) {
		return new WebSocketServer({ host, port })
	}

	static randomId() {
		return crypto.randomBytes(16).toString('hex');
	}
}

export default ServerServices;