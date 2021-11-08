const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class User_Antique extends Model { }

User_Antique.init({	Userid: {
		key: 'Userid',
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		references: {
			key: 'id',
			model: 'User'
		},
	},
	Antiqueid: {
		key: 'Antiqueid',
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		references: {
			key: 'id',
			model: 'Antique'
		},
	},
	lastBid: {
		key: 'lastBid',
		type: DataTypes.FLOAT(10),
		allowNull: true,
	}
}, { 	sequelize, 	tableName: 'User_Antique',	paranoid: false,	timestamps: false,})

module.exports = User_Antique