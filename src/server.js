/* eslint-disable no-console */
import register from '@react-ssr/express/register';

import configFile from '../config.json';

import app from './app';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

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
