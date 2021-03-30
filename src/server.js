/* eslint-disable no-console */
const register = require('@react-ssr/express/register');
const app = require('./app');

const env = process.env.NODE_ENV || 'development';
const config = require('../config.json')[env];

(async () => {
	// This adds to Express the template engine we use for server-side rendering
	// React views.
	await register(app);

	app.listen(config.server.port, () => {
		console.log('ETSIT-incoming');
		console.log('==============');
		console.log(`App listening at port ${config.server.port}...`);
	});
})();
