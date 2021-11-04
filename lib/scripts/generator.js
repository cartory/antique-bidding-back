const database = require('../../assets/database.json')

const {
	addApiRoutes, generateModel, generateController, generateRoute, addModelsRelationships
} = require('../generator.utils')

let DB = database.map(table => {
	table.marked = false
	return table
})

const getForeignKeys = ({ columns }) => {
	return columns
		.filter(column => column.foreignKey)
		.map(({ foreignKey }) => foreignKey)
}

const getReferencedTables = (tables = [], foreignKeys) => {
	return tables.filter(({ columns }) => {
		return columns.some(({ id }) => foreignKeys.includes(id))
	})
}

const generateFiles = (tables = []) => {
	tables.forEach(table => {
		if (!table.marked) {
			table.marked = true
			let foreignKeys = getForeignKeys(table)
			let referencedTables = getReferencedTables(DB, foreignKeys)
			generateFiles(referencedTables)
			// generate Models
			generateModel(table)
			if (table.dataModel === 'Physical') {
				// generate Controllers
				generateController(table)
				// generate Routes
				generateRoute(table)
			}

			console.log('table generated => ', table.tableName);
		}
	})
}

generateFiles(DB)

addApiRoutes(DB
	.filter(({ dataModel }) => dataModel == 'Physical')
	.map(({ tableName }) => tableName)
	.sort((a, b) => a.length - b.length)
)

addModelsRelationships(DB
	.map(({ tableName }) => tableName)
	.sort((a, b) => a.length - b.length)
)
