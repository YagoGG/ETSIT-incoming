import passport from 'passport';
import passportLocal from 'passport-local';

import { User } from '../models';

async function loginVerifier(email, password, done) {
	try {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return done(null, false, {
				message: 'Incorrect email/password combination',
			});
		}

		const isPasswordCorrect = await user.verifyPassword(password);
		if (!isPasswordCorrect) {
			return done(
				null, false, {
					message: 'Incorrect email/password combination',
				},
			);
		}

		return done(null, user);
	} catch (err) {
		return done(null, false, { message: err.message });
	}
}

// We create two different strategies: both of them are local and work equally
// the same; the only difference lies in them reading the password from
// different fields in the request.
// "temporary-local" is to be used with authentication tokens (i.e. one-time
// logins for registration or password resets), whereas "regular-local" is for
// the rest of common logins.
passport.use('regular-local', new passportLocal.Strategy({
	usernameField: 'email',
	passwordField: 'password',
}, loginVerifier));
passport.use('temporary-local', new passportLocal.Strategy({
	usernameField: 'email',
	passwordField: 'token',
}, loginVerifier));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findByPk(id);
		done(null, user);
	} catch (err) {
		done(err, null);
	}
});

/**
 * Wraps Passport.js's authenticate method in a Promise, so that it can be used
 * with asynchronous code.
 * @param {string} strategy - Name of the Passport strategy to use.
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns A Promise that will resolve upon successful authentication, and
 * 	reject otherwise.
 */
function authenticate(strategy, req, res, next) {
	return new Promise((resolve, reject) => {
		passport.authenticate(strategy, (err, user, info) => {
			if (err) reject(err);
			if (!user) reject(new Error(info.message));
			resolve(user);
		})(req, res, next);
	});
}

/**
 * Middleware that authenticates a request using a previously defined strategy,
 * and potentially renders a view upon success.
 * @param {string} strategy - Authentication strategy to use (temporary-local or
 * 	regular-local).
 * @param {string} [renderView] - View that should be rendered upon a successful
 * 	authentication. If not specified, it will redirect to "/".
 * @returns Middleware function with (req, res, next) signature.
 */
export function login(strategy, renderView) {
	return async (req, res, next) => {
		const user = await authenticate(strategy, req, res, next);
		return req.login(user, (err) => {
			if (err) throw err;
			if (renderView) {
				res.render(renderView);
			} else {
				res.redirect('/');
			}
		});
	};
}

/**
 * Destroy the session associated to a request, logging the user out.
 * @param {any} req
 * @param {any} res
 */
export function logout(req, res) {
	req.logout();
	req.flash('success', 'You have successfully logged out. See you soon!');
	res.redirect('/');
}

export function renderLogin(req, res) {
	return res.render('login');
}
