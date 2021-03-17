const express = require('express');
const register = require('@react-ssr/express/register');
const session = require('express-session');

const router = require('./routes');

const env = process.env.NODE_ENV || 'development';
const config = require('../config.json')[env];

const app = express();

// Set up session storage.
const sessionOptions = {
	secret: config.server.sessionSecret,
	cookie: {},
	saveUninitialized: true,
};
if (env === 'production') {
	sessionOptions.cookie.secure = true;
}
app.use(session(sessionOptions));

app.use(router);

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
