// daemon.js
import Services from './services.js';
import BootstrapModule from './modules/bootstrap/main.js';

const db = Services.createDatabase();
const collections = Services.initDatabase(db);

const app = Services.createApp();

app.get('/', (req, res) => {
    res.send('Daemon Express is running');
});

app.post('/host/start', async (req, res) => {
    const { ip, port } = req.body;

    if (!ip || !port) {
        res.status(400).send("Missing host data");
    }

    try {
        Services.storeHost(collections, ip, port);
        const { inviteCode } = Services.getHostInfo(collections);
        const response = BootstrapModule.host(ip, port, inviteCode);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
});

app.get('/host/check', (req, res) => {
    try {
        const hostInfo = Services.getHostInfo(collections);
        res.status(200).json({message: "Host checked.", value: hostInfo});
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
});

app.get('/host/get-invite', (req, res) => {
    try {
        const inviteInfo = Services.getInvite(collections);
        res.status(200).json({message: `Invite Generated, invite link: ${inviteInfo.link}`, value: inviteInfo.code});
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`);
    }
});

Services.startServer(app);

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