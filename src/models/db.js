import { Sequelize } from 'sequelize';

import configFile from '../../config.json';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

// Establish the database connection.
export default new Sequelize({
	// eslint-disable-next-line no-console
	logging: env === 'development' ? console.log : false,
	...config.database,
});
