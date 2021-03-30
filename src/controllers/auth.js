const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStragy = require('passport-local').Strategy;

const { User } = require('../models');

passport.use(new LocalStragy({
	usernameField: 'email',
	passwordField: 'password',
}, async (email, password, done) => {
	const user = await User.findOne({ where: { email } });

	if (!user) return done(null, false, { message: 'Incorrect email' });

	const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

	if (!isPasswordCorrect) return done(null, false, { message: 'Incorrect password' });

	return done(null, user);
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findByPk(id);
	done(null, user);
});
