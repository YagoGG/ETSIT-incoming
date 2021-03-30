const express = require('express');
const passport = require('passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const router = require('./routes');
const { sequelize } = require('./models');

const env = process.env.NODE_ENV || 'development';
const config = require('../config.json')[env];

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

module.exports = app;
