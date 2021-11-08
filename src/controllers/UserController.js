const { Controller } = require('../utils/controller')
const { User, Bot, Role } = require('../utils/models')

let Roleid
class UserController extends Controller {
	constructor() {
		super(User)
	}

	find = async ({ params }, res) => {
		const { id } = params
		try {
			const user = await User.findOne({
				where: { id },
				attributes: { exclude: ['Roleid'] },
				include: ['bot', 'role'],
			})

			return res.status(200).json(user)
		} catch (err) {
			console.error(err)
		}

		return res.status(500).json(this.defaultErrorMessage)
	}

	all = async (_, res) => {
		try {
			const users = await User.findAll({
				include: [
					'bot', 'role'
				]
			})

			return res.status(200).json(users)
		} catch (err) {
			console.error(err);
		}

		return res.status(500).json(this.defaultErrorMessage)
	}

	save = async ({ body }, res) => {
		const { name, photoUrl, email } = body

		try {
			let user = await User.findOne({
				attributes: {
					exclude: ['Roleid']
				},
				where: { email },
				include: ['bot', 'role']
			})

			if (!Roleid) {
				const role = await Role.findOne({ where: { name: 'user' } })
				Roleid = role.getDataValue('id')
			}

			if (!user) {
				user = await User.create({ name, photoUrl, email, Roleid })
				await Bot.create({ Userid: user.getDataValue('id') })
			}

			return res.status(200).json(user)
		} catch (err) {
			console.error(err);
		}

		return res.status(500).json(this.defaultErrorMessage)
	}
}

module.exports = new UserController()