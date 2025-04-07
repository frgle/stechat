// daemon.js
import Services from './services.js';

const db = Services.createDatabase();
const collections = Services.initDatabase(db);

const app = Services.createApp();

app.get('/', (req, res) => {
    res.send('Daemon Express is running');
});

Services.startServer(app);