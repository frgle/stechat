// services.js
import express from 'express';
import fs from 'fs';
import Loki from 'lokijs';
import crypto from 'crypto';

const logFile = './daemon.log';

class DaemonServices {
    static logFile = 'daemon.log'; // Definir archivo de log por defecto

    // Método estático para registrar mensajes en el archivo de log
    static logMessage(message) {
        const timestamp = new Date().toISOString();
        fs.appendFileSync(Daemon.logFile, `[${timestamp}] ${message}\n`);
    }

    // Método estático para crear y retornar una instancia de la aplicación Express
    static createApp() {
        const app = express();
        app.use(express.json());
        return app;
    }

    // Método estático para iniciar el servidor en un puerto específico
    static startServer(app, port = 3000) {
        app.listen(port, () => {
            console.log(`Daemon Express listening on ${port}`);
        });
    }

    // Método estático para crear una base de datos en memoria con LokiJS
    static createDatabase() {
        const db = new Loki('memory.db');
        return db;
    }

    // Método estático para inicializar la base de datos y crear colecciones necesarias
    static initDatabase(db) {
        const bootstrapCollection = db.addCollection('bootstrap');
        return { bootstrapCollection };
    }

    // Método estático para almacenar un "host" en la colección de la base de datos
    static storeHost({bootstrapCollection}, ip, port) {
        const inviteCode = crypto.randomBytes(16).toString('hex');

        bootstrapCollection.insert({ type: "host", ip, port, inviteCode });
    }

    static getHostInfo({bootstrapCollection}) {
        return bootstrapCollection.findOne({type: "host"});
    }

    static getInvite({bootstrapCollection}) {
        const host = bootstrapCollection.findOne({ type: "host" });

        const inviteInfo = {
            link: `http://${host.ip}:${host.port}/join/${host.inviteCode}`,
            code: host.inviteCode,
        }

        return inviteInfo;
    }
}

export default DaemonServices;