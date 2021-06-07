import { User } from '../models';

export function requireLoggedIn(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/login');
	}
}

export const requireAdmin = [
	requireLoggedIn,
	(req, res, next) => {
		if (req.user.role === User.ADMIN_ROLE) {
			next();
		} else {
			throw Error('not an admin');
		}
	},
];
