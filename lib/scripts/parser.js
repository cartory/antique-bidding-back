const fs = require('fs')
const DB = require('../../assets/database.json')

let rawJsonDB = JSON.stringify(DB)

rawJsonDB = rawJsonDB.replace(/@_/igm, '')

const { Project } = JSON.parse(rawJsonDB)

fs.writeFileSync('assets/database.json', rawJsonDB, { encoding: 'utf-8' })
// fs.writeFileSync('assets/db.json', rawJsonDB, { encoding: 'utf-8' })

const isAutoIncrement = (identityIncrement, idGenerator) => {
	return identityIncrement < 0 && idGenerator === 'increment' ? true : null
}

const keyValues = {
	DBTable: (models) => models,
	Model: (models) => models.Model.ModelChildren,
}

const getDBTable = ({ Models }) => {
	let key = Object.keys(Models).find(k => keyValues[k])
	return Models[key]
}

let database = getDBTable(Project).map(table => {
	let columns = table.ModelChildren.DBColumn.map(column => {
		let {
			Id, Name,
			IdGenerator,
			ForeignKeyConstraints,
			DefaultValue, IdentityIncrement,
		} = column

		let json = {
			id: Id,
			key: `${Name}@${Id}`,
			name: Name,
			type: column.Type,
			length: column.Length,
			unique: column.Unique ? true : null,
			allowNull: column.Nullable,
			primaryKey: column.PrimaryKey ? true : null,
			defaultValue: DefaultValue ? `'${DefaultValue}'` : null,
			autoIncrement: isAutoIncrement(IdentityIncrement, IdGenerator),
			autoIncrementIdentity: isAutoIncrement(IdentityIncrement, IdGenerator),
			foreignKey: ForeignKeyConstraints?.DBForeignKeyConstraint['RefColumn'],
		};

		for (const key in json) {
			if (!json[key]) {
				delete json[key]
			}
		}
		return json
	})
	return {
		tableId: table.Id,
		tableName: table.Name,
		dataModel: table.DataModel,
		columns,
	};
})

fs.writeFileSync('assets/database.json', JSON.stringify(database), {
	encoding: 'utf-8'
})
