import express from 'express';
import passport from 'passport';
import session from 'express-session';
import sessionSequelize from 'connect-session-sequelize';

import router from './routes';
import sequelize from './models/db';

import configFile from '../config.json';

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
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

// Serve static files in 'static/'.
app.use('/static', express.static(`${__dirname}/static`));

export default app;
