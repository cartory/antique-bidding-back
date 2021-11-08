const { Op } = require('sequelize')

const { Controller } = require('../utils/controller')
const { Antique, User_Antique } = require('../utils/models')

class AntiqueController extends Controller {
	constructor() {
		super(Antique)
	}

	get = async (Antiqueid) => {
		try {
			const antiqueResult = await User_Antique.findOne({
				where: { Antiqueid },
				attributes: {
					exclude: ['Categoryid']
				},
				include: [
					'category',
					'antiques',
				],
			})

			return antiqueResult.toJSON()
		} catch (err) {
			console.error(err);
		}

		return null
	}

	makeBid = async ({ Userid, Antiqueid, price }) => {
		try {
			let lastBidResponse

			const userAntique = await User_Antique.findOne({
				where: { Userid, Antiqueid }
			})

			if (userAntique) {
				lastBidResponse = await userAntique.update({ lastBid: price })
			} else {
				lastBidResponse = await User_Antique.create({
					Userid, Antiqueid, lastBid: price
				})
			}

			console.log(lastBidResponse.toJSON())
			return this.get(Antiqueid)
		} catch (err) {
			console.error(err)
		}

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