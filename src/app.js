const cors = require('cors')
const express = require('express')

const routes = require('./api.routes')
const sequelize = require('./utils/sequelize')

const app = express()

// DB CONNECTION
sequelize
	.authenticate()
	.then(async () => {
		// await sequelize.sync({ alter: true })
		console.log(`\x1b[32mDB Connected Sucessfully!\x1b[0m`)
	})
	.catch(err => console.error(err))

// SETUP
app
	.use(cors())
	.use(express.urlencoded({ extended: true }))
	.use(express.json({ limit: process.env.BODY_SIZE }))
	// ROUTES
	.use('/api', routes)
	.get('/', (_, res) => res.send('<h1>Welcome to Generated API 👋 </h1>'))

module.exports = app