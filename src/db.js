const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config.json')[env];

// Establish the database connection.
module.exports.sequelize = new Sequelize({
	dialect: 'postgres',
	...config.database,
});
