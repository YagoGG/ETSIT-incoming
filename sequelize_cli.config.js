/*
	Sequelize's CLI only accepts either environment variables or JSON/JS
	objects with a very specific format.

	Since the project already has a config file with the database details,
	let's use those instead of needing a separate config file or environment
	variable.

	This script exposes the config fields that are relevant for database
	connections, following the structure expected by the CLI.
*/

const config = require('./config.json');

module.exports = {};
['development', 'test', 'production'].forEach((env) => {
	// Get the ".database" key for each possible environment iff it exists in
	// the config file (set it as undefined otherwise).
	module.exports[env] = (config[env] || {}).database;
});
