import { isCelebrateError } from 'celebrate';
import sessionSequelize from 'connect-session-sequelize';
import express from 'express';
import 'express-async-errors';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';

import configFile from '../config.json';

import sequelize from './models/db';
import router from './routes';

const SequelizeStore = sessionSequelize(session.Store);

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const app = express();

// Set up session storage.
const sessionStore = new SequelizeStore({ db: sequelize });
sessionStore.sync(); // Create/Sync the table in the database.
const sessionOptions = {
	store: sessionStore,
	secret: config.server.sessionSecret,
	cookie: {},
	saveUninitialized: true,
	resave: false,
};
if (env === 'production') {
	sessionOptions.cookie.secure = true;
}
app.use(session(sessionOptions));
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

// Serve static files in 'static/'.
app.use('/static', express.static(`${__dirname}/static`));

// Global error handler.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	if (isCelebrateError(err)) {
		err.details.forEach((validationError) => {
			validationError.details.forEach((e) => {
				req.flash('error', e.message);
			});
		});
	} else {
		// TODO: Differentiate between controlled and internal errors.
		// eslint-disable-next-line no-console
		console.error(err);
		req.flash('error', err.message);
	}

	return res.redirect('back');
});

export default app;
