const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class Role extends Model { }

Role.init({	id: {
		key: 'id',
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true,
		autoIncrementIdentity: true,
	},
	name: {
		key: 'name',
		type: DataTypes.STRING(20),
		unique: true,
	}
}, { 	sequelize, 	tableName: 'Role',	paranoid: true,	timestamps: true,})

module.exports = Role