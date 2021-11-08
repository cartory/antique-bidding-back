const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class Bot_Antique extends Model { }

Bot_Antique.init({
	id: {
		key: 'id',
		type: DataTypes.INTEGER(10),
		primaryKey: true,
		autoIncrement: true,
		autoIncrementIdentity: true,
	},
	Botid: {
		key: 'Botid',
		type: DataTypes.INTEGER(10),
		references: {
			key: 'id',
			model: 'Bot'
		},
	},
	Antiqueid: {
		key: 'Antiqueid',
		type: DataTypes.INTEGER(10),
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