const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class Role extends Model { }

Role.init({
		key: 'id',
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true,
		autoIncrementIdentity: true,
	},
	name: {
		key: 'name',
		type: DataTypes.STRING(20),
	}
}, { 

module.exports = Role