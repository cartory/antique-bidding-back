require('dotenv').config()

const app = require('./app')
const http = require('http')
const socket = require('socket.io')

const server = http.createServer(app)
const io = new socket.Server(server)

const delayInMilliseconds = 500

io.on('connection', (socket) => {
	socket.on('bid', (data) => {
		console.log(data);
		setTimeout(() => {
			socket.broadcast.emit('bid', { lastBid: Date.now() })
		}, delayInMilliseconds);
	})
})

server.listen(process.env.PORT, () => {
	console.log(`Server running on \x1b[33mhttp://${process.env.HOST}:${process.env.PORT}\x1b[0m`)
	console.log(new Date())
})