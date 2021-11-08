const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

class Antique extends Model { }

Antique.init({
	id: {
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
		type: DataTypes.TEXT,
	},
	startPrice: {
		key: 'startPrice',
		type: DataTypes.FLOAT(10),
	},
	photoUrl: {
		key: 'photoUrl',
		type: DataTypes.STRING(255),
	},
	endDate: {
		key: 'endDate',
		type: DataTypes.DATE,
	},
	Categoryid: {
		key: 'Categoryid',
		type: DataTypes.INTEGER(10),
		references: {
			key: 'id',
			model: 'Category'
		},
	}
}, {
	sequelize,
	tableName: 'Antique',
	paranoid: true,
	timestamps: true,
})

module.exports = Antique