const crypto = require('crypto');
const { Node } = require('./services/database');  // Importamos el modelo Node
const { Sequelize } = require('sequelize');
const express = require('express');

// Servicio de invitación
class InvitationService {
  static generateInviteCode() {
    return crypto.randomBytes(16).toString('hex');  // Código único
  }

  static validateInviteCode(inviteCode) {
    return typeof inviteCode === 'string' && inviteCode.length === 32;
  }
}

// Servicio de servidor bootstrap
class HostService {
  static createInviteResponse(inviteCode) {
    return `Tu código de invitación es: localhost:8080/join/${inviteCode}`;
  }

  static getServer() {
    const server = express();
    return server;
  }

  static startServer(server, port) {
    server.listen(port, () => {
      //console.log(`Servidor bootstrap funcionando en http://localhost:${port}`);
    });
  }

  // Agregar un nodo activo
  static async addNode(identifier, ip, port) {
    try {
      const [node, created] = await Node.findOrCreate({
        where: { identifier },  // Buscar o crear el nodo con el id
        defaults: { ip, port, lastActive: Date.now() },
      });

      if (!created) {
        // Si el nodo ya existía, solo actualizamos su última actividad
        node.lastActive = Date.now();
        await node.save();
      }

      //console.log(`Nodo ${id} añadido o actualizado.`);
    } catch (err) {
      //console.error('Error al agregar el nodo:', err);
    }
  }

  // Eliminar un nodo activo
  static async removeNode(inviteCode) {
    try {
      const node = await Node.findOne({ where: { inviteCode } });
      if (node) {
        await node.destroy();
        //console.log(`Nodo ${inviteCode} eliminado.`);
      } else {
        //console.log(`Nodo ${inviteCode} no encontrado.`);
      }
    } catch (err) {
      //console.error('Error al eliminar el nodo:', err);
    }
  }

  // Verificar nodos inactivos y eliminarlos
  static async checkNodeActivity() {
    const now = Date.now();
    const threshold = 600000; // 10 minutos en milisegundos
    try {
      // Buscar nodos inactivos
      const inactiveNodes = await Node.findAll({
        where: {
          lastActive: { [Sequelize.Op.lt]: now - threshold },
        },
      });

      // Eliminar nodos inactivos
      for (let node of inactiveNodes) {
        await node.destroy();
        //console.log(`Nodo inactivo ${node.inviteCode} eliminado.`);
      }
    } catch (err) {
      //console.error('Error al verificar la actividad de los nodos:', err);
    }
  }

  // Obtener todos los nodos activos
  static async getActiveNodes() {
    try {
      const nodes = await Node.findAll();
      return nodes.map(node => ({
        inviteCode: node.inviteCode,
        ip: node.ip,
        port: node.port,
      }));
    } catch (err) {
      //console.error('Error al obtener los nodos activos:', err);
      return [];
    }
  }
}

module.exports = {
  InvitationService,
  HostService
};
