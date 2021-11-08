const { Controller } = require('../utils/controller')
const { Bot, Bot_Antique } = require('../utils/models')

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

	find = async ({ query, params }, res) => {
		const { id } = params
		const { Antiqueid } = query
		
		try {
			const botAntique = await Bot_Antique.findOne({
				where: { Antiqueid, Botid: id }
			})

			let result
			if (botAntique) {
				result = await botAntique.destroy()
			} else {
				result = await Bot_Antique.create({ Antiqueid, Botid: id })
			}

			return res.status(200).json(result)
		} catch (err) {
			console.error(err)
		}

		return res.status(500).json(this.defaultErrorMessage)
	}
}

module.exports = new BotController()