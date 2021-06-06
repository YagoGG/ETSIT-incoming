// eslint-disable-next-line import/prefer-default-export
export function requireLoggedIn(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/login');
	}
}
