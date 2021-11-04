const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class Bot extends Model { }

Bot.init({	id: {
		key: 'id',
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true,
		autoIncrementIdentity: true,
	},
	maximumBidAmount: {
		key: 'maximumBidAmount',
		type: DataTypes.INTEGER(10),
	}
}, { 	sequelize, 	tableName: 'Bot',	paranoid: true,	timestamps: true,})

module.exports = Bot