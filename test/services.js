// daemonservices.js
const express = require('express');
const fs = require('fs');

const logFile = './daemon.log';

function logMessage(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
}

function createApp() {
    const app = express();

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Daemon Express está corriendo');
    });

    app.post('/message', (req, res) => {
        const message = req.body.message;
        const log = `Mensaje recibido: ${message}`;
        logMessage(log);
        console.log(log);
        res.send({ response: `Mensaje recibido: ${message}` });
    });

    return app;
}

function startServer(app, port = 3000) {
    app.listen(port, () => {
        console.log(`Daemon Express escuchando en el puerto ${port}`);
    });
}

module.exports = {
    createApp,
    startServer,
};

