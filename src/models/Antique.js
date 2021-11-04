const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class Antique extends Model { }

Antique.init({	id: {
		key: 'id',
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true,
		autoIncrementIdentity: true,
	},
	name: {
		key: 'name',
		type: DataTypes.STRING(100),
	},
	description: {
		key: 'description',
		type: DataTypes.STRING(255),
	},
	startPrice: {
		key: 'startPrice',
		type: DataTypes.FLOAT(10),
	},
	photoUrl: {
		key: 'photoUrl',
		type: DataTypes.STRING(255),
	},
	photoId: {
		key: 'photoId',
		type: DataTypes.STRING(100),
		unique: true,
	},
	endDate: {
		key: 'endDate',
		type: DataTypes.TIME,
	}
}, { 	sequelize, 	tableName: 'Antique',	paranoid: true,	timestamps: true,})

module.exports = Antique