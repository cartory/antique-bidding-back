const fs = require('fs')

const package = require('../../package.json')

delete package.nodemonConfig
delete package.devDependencies

// package.scripts['start'] = "node index"
package.scripts['heroku-postbuild'] = "echo Skip builds on Heroku"

fs.writeFileSync('dist/package.json', JSON.stringify(package), {
	encoding: 'utf-8'
})