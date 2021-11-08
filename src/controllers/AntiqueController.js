const { Op } = require('sequelize')

const { Controller } = require('../utils/controller')
const { Antique, User_Antique } = require('../utils/models')

class AntiqueController extends Controller {
	constructor() {
		super(Antique)
	}

	get = async (antiqueId) => {
		try {
			let antique = await Antique.findOne({
				attributes: { exclude: ['Categoryid'] },
				where: { id: antiqueId },
				include: [
					'category',
					{
						association: 'users',
						attributes: {
							exclude: ['Roleid', 'createdAt', 'deletedAt', 'updatedAt']
						},
					},
				],
			})

			const users = antique.getDataValue('users')

			antique = antique.toJSON()
			delete antique['users']

			if (!users.length) {
				return { ...antique, user: null }
			}

			const majorBidUser = users.reduce((userA, userB) => {
				const a = userA['User_Antique']['lastBid']
				const b = userB['User_Antique']['lastBid']

				return a > b ? userA : userB
			})

			return { ...antique, user: majorBidUser }
		} catch (err) {
			console.error(err);
		}

		return this.defaultErrorMessage
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

	find = async ({ params }, res) => {
		const { id } = params
		try {
			return res.status(200).json(await this.get(id))
		} catch (err) {
			console.error(err);
		}

		return res.status(500).json(this.defaultErrorMessage)
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