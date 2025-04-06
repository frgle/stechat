const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Función para solicitar un código de invitación
async function getInvite() {
    const response = await axios.get(`${BASE_URL}/invite`);
    console.log('🎟️ Invite:', response.data);
    return response.data.code;
}

// Función para unirse a un servidor con un código
async function joinServer(inviteCode) {
    const response = await axios.post(`${BASE_URL}/join`, { inviteCode });
    console.log('🤝 Join response:', response.data);
}

// Agregar un nodo al host
async function addNode(id, ip, port) {
    await axios.post(`${BASE_URL}/node/add`, { id, ip, port });
    console.log(`🟢 Nodo ${id} agregado.`);
}

// Eliminar un nodo por código
async function removeNode(inviteCode) {
    await axios.post(`${BASE_URL}/node/remove`, { inviteCode });
    console.log(`🔴 Nodo con código ${inviteCode} eliminado.`);
}

// Obtener nodos activos
async function getActiveNodes() {
    const response = await axios.get(`${BASE_URL}/nodes/active`);
    console.log('📡 Nodos activos:', response.data);
}

// Enviar un ping a otro servidor
async function pingServer(url, id, port) {
    const response = await axios.post(`${BASE_URL}/ping`, { url, id, port });
    console.log('📶 Ping response:', response.data);
}

// Iniciar loop de pings
async function startPingLoop(url, id, port, interval = 3000) {
    await axios.post(`${BASE_URL}/start-ping-loop`, { url, id, port, interval });
    console.log('🔁 Loop de ping iniciado.');
}

// Verificar actividad de nodos
async function checkNodeActivity() {
    await axios.get(`${BASE_URL}/nodes/check`);
    console.log('🕵️ Verificando actividad de nodos...');
}

// Main: flujo de uso de ejemplo
(async () => {
    try {
        const inviteCode = await getInvite();        // obtener código
        await joinServer(inviteCode);                // unirse
        await addNode('node-1', '192.168.0.1', 4000);
        await getActiveNodes();                      // listar nodos
        await pingServer('http://localhost:3000', 'node-1', 4000);
        await startPingLoop('http://localhost:3000', 'node-1', 4000);
        await checkNodeActivity();                   // verificación
        await removeNode(inviteCode);                // eliminar nodo
    } catch (err) {
        console.error('❌ Error en client:', err.message);
    }
})();
