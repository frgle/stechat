import express from 'express';

class HostServices {
	static createServer() {
		const server = express();
		return server;
	}

	static startServer(server, ip, port) {
		try {
			server.listen(port, ip);
			return `Server listening ${ip}:${port}`;
		} catch (error) {
			return `Error starting server: ${error}`
		}
	}
}

export default HostServices;