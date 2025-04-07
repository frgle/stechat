import HostServices from './services.js';

class HostModule {
	constructor() {
		this.db = HostServices.createDatabase();
		this.collections = HostServices.initDatabase(this.db);
	}

	createServer(ip, port, passcode) {
		HostServices.storeServerInfo({ip, port, code}, this.collections);
		return HostServices.createServer();
	}

	checkPasscode(inputcode) {
		const { passcode } = HostServices.getServerInfo(this.collections);
		const isValidInputcode = inputcode === passcode;
		return isValidInputcode;
	}

	getData() {
		const data = {};
		return data;
	}
}

export default HostModule;