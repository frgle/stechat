// services.js
import express from 'express';
import Loki from 'lokijs';

class DaemonServices {
    static createApp() {
        const app = express();
        app.use(express.json());
        return app;
    }

    static startServer(app, port = 3000) {
        app.listen(port, () => {
            console.log(`Daemon Express listening on ${port}`);
        });
    }

    static createDatabase() {
        const db = new Loki('memory.db');
        return db;
    }

    static initDatabase(db) {
        return {  };
    }
}

export default DaemonServices;