// services.js
import express from 'express';
import fs from 'fs';
import BootstrapModule from './modules/bootstrap/main.js';

const logFile = './daemon.log';

function logMessage(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
}

function createApp() {
    const app = express();

    app.use(express.json());

    return app;
}

function startServer(app, port = 3000) {
    app.listen(port, () => {
        console.log(`Daemon Express escuchando en el puerto ${port}`);
    });
}

export { createApp, startServer, logMessage, BootstrapModule };