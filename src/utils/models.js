const Bot = require('../models/Bot')
const User = require('../models/User')
const Role = require('../models/Role')
const Antique = require('../models/Antique')
const Category = require('../models/Category')
const Bot_Antique = require('../models/Bot_Antique')
const User_Antique = require('../models/User_Antique')

Role.hasMany(User, { foreignKey: 'Roleid', as: 'users' })
User.belongsTo(Role, { foreignKey: 'Roleid', as: 'role' })

User.hasOne(Bot, { foreignKey: 'Userid', as: 'bot' })
Bot.belongsTo(User, { foreignKey: 'Userid', as: 'user' })

Category.hasMany(Antique, { foreignKey: 'Categoryid', as: 'antiques' })
Antique.belongsTo(Category, { foreignKey: 'Categoryid', as: 'category' })

User.belongsToMany(Antique, { through: User_Antique, foreignKey: 'Userid', as: 'antiques' })
Antique.belongsToMany(User, { through: User_Antique, foreignKey: 'Antiqueid', as: 'users' })

Bot.belongsToMany(Antique, { through: Bot_Antique, foreignKey: 'Botid', as: 'antiques' })
Antique.belongsToMany(Bot, { through: Bot_Antique, foreignKey: 'Antiqueid', as: 'bots' })

module.exports = {
	Bot,
	User,
	Role,
	Antique,
	Category,
	Bot_Antique,
	User_Antique,
}