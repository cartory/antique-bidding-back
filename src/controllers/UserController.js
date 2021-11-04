const { Controller } = require('../utils/controller')
const { User } = require('../utils/models')

class UserController extends Controller {
	constructor() {		super(User)	}}

module.exports = new UserController()