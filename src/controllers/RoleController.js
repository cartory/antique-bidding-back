const { Controller } = require('../utils/controller')
const { Role } = require('../utils/models')

class RoleController extends Controller {
	constructor() {		super(Role)	}}

module.exports = new RoleController()