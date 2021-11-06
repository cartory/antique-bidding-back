const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class Bot_Antique extends Model { }

Bot_Antique.init({
	Botid: {
		key: 'Botid',
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		references: {
			key: 'id',
			model: 'Bot'
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
	}
}, {
	sequelize,
	tableName: 'Bot_Antique',
	paranoid: false,
	timestamps: false,
})

module.exports = Bot_Antique