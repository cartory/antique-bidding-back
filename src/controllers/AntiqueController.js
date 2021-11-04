const { Controller } = require('../utils/controller')
const { Antique } = require('../utils/models')

class AntiqueController extends Controller {
	constructor() {		super(Antique)	}}

module.exports = new AntiqueController()