const Bot = require('../models/Bot')
const User = require('../models/User')
const Role = require('../models/Role')
const Antique = require('../models/Antique')
const Category = require('../models/Category')
const User_Antique = require('../models/User_Antique')

Role.hasMany(User, { foreignKey: 'Roleid', as: 'users' })
User.belongsTo(Role, { foreignKey: 'Roleid', as: 'role' })

User.hasOne(Bot, { foreignKey: 'Userid', as: 'bot' })
Bot.belongsTo(User, { foreignKey: 'Userid', as: 'user' })

Category.hasMany(Antique, { foreignKey: 'Categoryid', as: 'antiques' })
Antique.belongsTo(Category, { foreignKey: 'Categoryid', as: 'category' })

User.belongsToMany(Antique, { through: User_Antique, foreignKey: 'Userid', as: 'antiques' })
Antique.belongsToMany(User, { through: User_Antique, foreignKey: 'Antiqueid', as: 'users' })

module.exports = {
	Bot,
	User,
	Role,
	Antique,
	Category,
	User_Antique,
}