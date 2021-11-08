const { Controller } = require('../utils/controller')
const { Bot } = require('../utils/models')

class BotController extends Controller {
	constructor() {
		super(Bot)
	}

	save = async ({ body }, res) => {
		try {
			const [bot] = await Bot.upsert(body)
			return res.status(200).json(bot)
		} catch (err) {
			console.error(err)
		}

		return res.status(500).json(this.defaultErrorMessage)
	}
}

module.exports = new BotController()