require('dotenv').config()

const app = require('./app')
const http = require('http')
const socket = require('socket.io')

const server = http.createServer(app)
const io = new socket.Server(server)

const delayInMilliseconds = 500
const antique = require('./controllers/AntiqueController')

io.on('connection', (socket) => {
	socket.on('lastBids', async ({ antiqueId }) => {
		const antiqueResult = await antique.get(antiqueId)
		socket.broadcast.emit('lastBid', antiqueResult)
	})

	socket.on('bid', ({ Antiqueid, price, Userid, endDate }) => {
		if (Date.now() < endDate) {
			setTimeout(async () => {
				console.log({ Antiqueid, price, Userid, endDate })
				const antiqueResult = await antique.makeBid({ Userid, Antiqueid, price })
				socket.broadcast.emit('lastBid', antiqueResult)
			}, delayInMilliseconds)
		}
	})
})

server.listen(process.env.PORT, () => {
	console.log(`Server running on \x1b[33mhttp://${process.env.HOST}:${process.env.PORT}\x1b[0m`)
	console.log(new Date())
})