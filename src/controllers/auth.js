import passport from 'passport';
import passportLocal from 'passport-local';

import { User } from '../models';
import { ErrorMessage } from '../utils/message';

passport.use(new passportLocal.Strategy({
	usernameField: 'email',
	passwordField: 'password',
}, async (email, password, done) => {
	const user = await User.findOne({ where: { email } });

	if (!user) return done(null, false, { message: 'Incorrect email' });

	const isPasswordCorrect = await user.verifyPassword(password);

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

function authenticate(req, res, next) {
	return new Promise((resolve, reject) => {
		passport.authenticate('local', (err, user, info) => {
			if (err) reject(err);
			if (!user) reject(info.message);
			resolve(user);
		})(req, res, next);
	});
}

export async function login(req, res, next) {
	try {
		const user = await authenticate(req, res, next);
		return req.login(user, (err) => {
			if (err) throw err;
			res.render('index', { user });
		});
	} catch (err) {
		return res.render('login', {
			messages: [
				new ErrorMessage(err),
			],
		});
	}
}

export async function logout(req, res) {
	req.logout();
	res.redirect('/');
}
