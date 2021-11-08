const faker = require('faker')

const sequelize = require('../src/utils/sequelize')
const { categories, roles, antiques } = require('./data.json')

const addDays = (dateObj, numDays) => {
	dateObj.setDate(dateObj.getDate() + numDays);
	return dateObj;
}

const {
	Category, Role, Antique
} = require('../src/utils/models')
sequelize
	.authenticate()
	.then(async () => {
		// await sequelize.dropAllSchemas({ logging: true })
		// await sequelize.sync({ force: true })
		try {
			// await Role.bulkCreate(roles.map(name => ({ name })))
			// await Category.bulkCreate(categories.map(name => ({ name })))

			const catIds = (await Category.findAll()).map(cat => cat.getDataValue('id'))

			let antiqueData = antiques.map(antique => {
				const [name, description, photoUrl, startPrice] = antique

				const endDate = new Date()
				endDate.setDate(endDate.getDate() + faker.datatype.number({ min: 1, max: 7 }))

				return {
					name,
					photoUrl,
					description,
					startPrice,
					endDate: endDate,
					Categoryid: catIds[Math.floor(Math.random() * catIds.length)],
				}
			})

			await Antique.bulkCreate(antiqueData)
		} catch (err) {
			console.error(err);
		}

		process.exit(0)
	})
	.catch(err => console.error(err))