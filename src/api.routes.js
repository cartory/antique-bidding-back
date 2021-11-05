const { Router } = require('express')
const { addOperationRoutes } = require('./utils/routes.utils')

const controllers = [
	require('./controllers/BotController'),
	require('./controllers/UserController'),
	require('./controllers/RoleController'),
	require('./controllers/AntiqueController'),
	require('./controllers/CategoryController')
]

const routes = [
	require('./routes/Bot.route.json'),
	require('./routes/User.route.json'),
	require('./routes/Role.route.json'),
	require('./routes/Antique.route.json'),
	require('./routes/Category.route.json')
]

const router = Router()

routes.forEach((route, index) => {
	addOperationRoutes(router, controllers[index], route)
})

module.exports = router