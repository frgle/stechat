// daemon.js
const { createApp, startServer } = require('./services');

const app = createApp();

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

startServer(app);
