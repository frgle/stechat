// daemon.js
import { createApp, startServer, logMessage, BootstrapModule } from './services.js';

const app = createApp();

// Rutas HTTP expuestas por el daemon

app.get('/', (req, res) => {
    res.send('Daemon Express está corriendo');
});

app.post('/host', (req, res) => {
    const { ip, port } = req.body;

    const response = BootstrapModule.host(ip, port);

    res.status(200).send(response);
});

startServer(app);

// app.get('/invite', (req, res) => {
//     const code = Bootstrap.generateInvite();
//     const message = Bootstrap.getInviteMessage(code);
//     res.json({ code, message });
// });

// app.post('/join', (req, res) => {
//     const { inviteCode } = req.body;
//     const result = Bootstrap.joinServer(inviteCode);
//     res.json(result);
// });

// app.post('/ping', (req, res) => {
//     const { url, id, port } = req.body;
//     const result = Bootstrap.pingServer(url, id, port);
//     res.json(result);
// });

// app.post('/start-ping-loop', (req, res) => {
//     const { url, id, port, interval } = req.body;
//     Bootstrap.startPingLoop(url, id, port, interval);
//     res.send('Ping loop iniciado');
// });

// app.post('/node/add', (req, res) => {
//     const { id, ip, port } = req.body;
//     Bootstrap.addNode(id, ip, port);
//     res.send('Nodo agregado');
// });

// app.post('/node/remove', (req, res) => {
//     const { inviteCode } = req.body;
//     Bootstrap.removeNode(inviteCode);
//     res.send('Nodo eliminado');
// });

// app.get('/nodes/active', (req, res) => {
//     const nodes = Bootstrap.getActiveNodes();
//     res.json(nodes);
// });

// app.get('/nodes/check', (req, res) => {
//     Bootstrap.checkNodeActivity();
//     res.send('Verificación de actividad iniciada');
// });

// Iniciar el servidor