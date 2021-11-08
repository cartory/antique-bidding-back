const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class Bot extends Model { }

Bot.init({
	id: {
		key: 'id',
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true,
		autoIncrementIdentity: true,
	},
	maximumBidAmount: {
		key: 'maximumBidAmount',
		defaultValue: 300,
		type: DataTypes.FLOAT(10),
	},
	Userid: {
		key: 'Userid',
		type: DataTypes.INTEGER(10),
		references: {
			key: 'id',
			model: 'User'
		},
	}
}, {
	sequelize,
	tableName: 'Bot',
	paranoid: true,
	timestamps: true,
})

module.exports = Bot