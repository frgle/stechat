import express from 'express';
import Loki from 'lokijs';

class HostServices {
	static createDatabase() {
        const db = new Loki('memory.db');
        return db;
    }

    static initDatabase(db) {
        const connectionCollection = db.addCollection('connections');
        const serverInfoCollection = db.addCollection('serverInfo');
        const networkDataColletion = db.addCollection('networkData');

        return { connectionCollection, serverInfoCollection, networkDataColletion };
    }

	static createServer() {
		const server = express();
		return server;
	}

    static storeServerInfo({ip, port, passcode}, {serverInfoCollection}) {
    	try {
    		serverInfoCollection.insert({type: "ip", value: ip});
	    	serverInfoCollection.insert({type: "port", value: port});
	    	serverInfoCollection.insert({type: "passcode", value: passcode});
    	} catch (error) {
    		return `Error during store: ${error}`;
    	}
    }

    static getServerInfo({serverInfoCollection}) {
    	const ip = serverInfoCollection.findOne({type: "ip"});
    	const port = serverInfoCollection.findOne({type: "port"});
    	const passcode = serverInfoCollection.findOne({type: "passcode"});

    	return { ip, port, passcode };
    }

    static createNetwork() {
    	
    }
}

export default HostServices;