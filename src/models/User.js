const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class User extends Model { }

User.init({	id: {
		key: 'id',
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true,
		autoIncrementIdentity: true,
	},
	name: {
		key: 'name',
		type: DataTypes.STRING(255),
	},
	email: {
		key: 'email',
		type: DataTypes.STRING(100),
		unique: true,
	},
	photoUrl: {
		key: 'photoUrl',
		type: DataTypes.STRING(255),
	},
	Botid: {
		key: 'Botid',
		type: DataTypes.INTEGER(10),
		references: {
			key: 'id',
			model: 'Bot'
		},
	},
	Roleid: {
		key: 'Roleid',
		type: DataTypes.INTEGER(10),
		references: {
			key: 'id',
			model: 'Role'
		},
	}
}, { 	sequelize, 	tableName: 'User',	paranoid: true,	timestamps: true,})

module.exports = User