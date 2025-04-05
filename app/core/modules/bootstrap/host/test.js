// Importamos el módulo BootstrapModule desde su archivo
const BootstrapModule = require('./main'); // Asegúrate de que la ruta sea correcta

// Simulamos las pruebas de las funciones disponibles en BootstrapModule

// Test: Obtener código de invitación
const inviteCode = BootstrapModule.getInviteCode();
console.log('Código de invitación:', inviteCode);

// Test: Obtener mensaje con el código de invitación
const inviteMessage = BootstrapModule.getInviteMessage(inviteCode);
console.log('Mensaje de invitación:', inviteMessage);

// Test: Iniciar el servidor bootstrap (simulando el inicio con un puerto)
const port = 8080;
const server = BootstrapModule.getServer();
server.get('/join/:reqInviteCode', async (req, res) => {
  const { reqInviteCode } = req.params;

  const isValidInviteCode = reqInviteCode === inviteCode;

  if (isValidInviteCode) {
    // Responder con los datos necesarios para la conexión P2P
    const nodes = await BootstrapModule.getActiveNodes(); // Obtener nodos activos para la red P2P
    
    let connectionData;

    if (nodes.length < 1) {
      connectionData = {
        message: 'Código de invitación válido. Pero no hay nodos, se el primero.',
        nodes, // Lista de nodos activos en la red
      };
    } else {
      connectionData = {
        message: 'Código de invitación válido.',
        nodes, // Lista de nodos activos en la red
      }
    }

    res.json(connectionData);
  } else {
    // Si el código no es válido
    res.status(400).send('Código de invitación no válido.');
  }
});

server.get('/ping/:reqid/:reqport', async (req, res) => {
  const { reqid, reqport } = req.params;
  const reqip = req.ip;

  await BootstrapModule.addNode(reqid, reqip, reqport);
});

// Iniciar el servidor (esto solo simula la acción, en un entorno real debería correr un servidor)
BootstrapModule.startServer(server, port);
console.log(`Servidor bootstrap iniciado en el puerto ${port}`);