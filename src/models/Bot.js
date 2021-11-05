const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class Bot extends Model { }

Bot.init({
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
}, { 

module.exports = Bot