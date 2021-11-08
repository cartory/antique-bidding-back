const { Controller } = require('../utils/controller')
const { User, Bot, Role } = require('../utils/models')

let Roleid
class UserController extends Controller {
	constructor() {
		super(User)
	}

	save = async ({ body }, res) => {
		const { name, photoUrl, email } = body

		try {
			let user = await User.findOne({
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