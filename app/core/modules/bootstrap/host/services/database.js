const { Sequelize, DataTypes } = require('sequelize');

// Crear una nueva instancia de Sequelize para conectarse a SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './nodes.db',  // Aquí se almacenará la base de datos
});

// Definir el modelo de Nodos Activos
const Node = sequelize.define('Node', {
  inviteCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Asegura que el inviteCode sea único
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  port: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lastActive: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Timestamp de la última actividad
  },
}, {
  tableName: 'nodes',  // Nombre de la tabla
  timestamps: false,   // No necesitamos timestamps automáticos
});

// Sincronizar la base de datos
sequelize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch((err) => console.error('Error al sincronizar la base de datos', err));

module.exports = { sequelize, Node };
