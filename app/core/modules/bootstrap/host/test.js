// Importamos el módulo BootstrapModule desde su archivo
const BootstrapModule = require('./main'); // Asegúrate de que la ruta sea correcta

// Simulamos las pruebas de las funciones disponibles en BootstrapModule

// Test: Obtener código de invitación
const inviteCode = BootstrapModule.getInviteCode();
console.log('Código de invitación:', inviteCode);

// Test: Obtener mensaje con el código de invitación
const inviteMessage = BootstrapModule.getInviteMessage();
console.log('Mensaje de invitación:', inviteMessage);

// Test: Iniciar el servidor bootstrap (simulando el inicio con un puerto)
const port = 8080;
const handleRequest = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor bootstrap activo');
};

// Iniciar el servidor (esto solo simula la acción, en un entorno real debería correr un servidor)
BootstrapModule.startServer(port, handleRequest);
console.log(`Servidor bootstrap iniciado en el puerto ${port}`);
