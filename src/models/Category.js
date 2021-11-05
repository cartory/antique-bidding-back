const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class Category extends Model { }

Category.init({	id: {
		key: 'id',
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true,
		autoIncrementIdentity: true,
	},
	name: {
		key: 'name',
		type: DataTypes.STRING(50),
		unique: true,
	}
}, { 	sequelize, 	tableName: 'Category',	paranoid: true,	timestamps: true,})

module.exports = Category