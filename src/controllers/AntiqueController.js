const { Op } = require('sequelize')

const { Controller } = require('../utils/controller')
const { Antique } = require('../utils/models')

class AntiqueController extends Controller {
	constructor() {
		super(Antique)
	}

	all = async ({ query }, res) => {
		const { startPrice, Categoryid } = query

		try {
			const antiques = await Antique.findAll({
				where: {
					Categoryid,
					startPrice: { [Op.gte]: startPrice }
				}
			})

			return res.status(200).json(antiques)
		} catch (err) {
			console.error(err)
		}

		return res.status(500).json(this.defaultErrorMessage)
	}
}

module.exports = new AntiqueController()