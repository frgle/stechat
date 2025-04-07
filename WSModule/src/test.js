import WSModule from './main.js';

console.log('🟢 Iniciando servidor...');
const serverCreateResult = WSModule.server.create('localhost', 8765);
if (serverCreateResult?.error) {
	console.error('❌ Error al crear el servidor:', serverCreateResult.error);
	process.exit(1);
}

const serverInitResult = WSModule.server.init();
if (serverInitResult?.error) {
	console.error('❌ Error al inicializar el servidor:', serverInitResult.error);
	process.exit(1);
}

const serverInfo = WSModule.server.getServerInfo();
if (serverInfo?.error) {
	console.error('❌ No se pudo obtener la info del servidor:', serverInfo.error);
} else {
	console.log('ℹ️ Info del servidor:', serverInfo);
}

console.log('\n🔵 Cliente intentando conectar...');
const clientConnectResult = WSModule.client.connect('ws://localhost:8765');
if (clientConnectResult?.error) {
	console.error('❌ Error al conectar cliente:', clientConnectResult.error);
} else {
	console.log('✅ Cliente conectado:', clientConnectResult.connectionId || '(sin ID)');
}

// Esperamos 500ms a que el servidor registre la conexión
setTimeout(() => {
	console.log('\n🔍 Conexiones del servidor:', WSModule.server.checkConnections());
	console.log('🔍 Conexiones del cliente:', WSModule.client.checkConnections());

	const serverConns = WSModule.server.checkConnections();
	const clientConns = WSModule.client.checkConnections();

	const serverConnId = Object.keys(serverConns)[0];
	const clientConnId = Object.keys(clientConns)[0];

	console.log('\n📤 Enviando mensaje del cliente al servidor...');
	const clientMsgResult = WSModule.client.message(clientConnId, 'Hola servidor');
	if (clientMsgResult?.error) {
		console.error('❌ Error al enviar mensaje del cliente:', clientMsgResult.error);
	} else {
		console.log('✅ Mensaje enviado del cliente al servidor');
	}

	console.log('\n📤 Enviando mensaje del servidor al cliente...');
	const serverMsgResult = WSModule.server.message(serverConnId, 'Hola cliente');
	if (serverMsgResult?.error) {
		console.error('❌ Error al enviar mensaje del servidor:', serverMsgResult.error);
	} else {
		console.log('✅ Mensaje enviado del servidor al cliente');
	}

	setTimeout(() => {
		const clientReceived = WSModule.client.checkReceived(clientConnId);
		if (clientReceived?.error) {
			console.error('\n❌ Error al revisar mensajes en cliente:', clientReceived.error);
		} else {
			console.log('\n📥 Cliente recibió:', clientReceived);
		}

		const serverReceived = WSModule.server.checkReceived(serverConnId);
		if (serverReceived?.error) {
			console.error('❌ Error al revisar mensajes en servidor:', serverReceived.error);
		} else {
			console.log('📥 Servidor recibió:', serverReceived);
		}
	}, 500);
}, 500); // Espera de 500 ms

