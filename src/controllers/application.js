// eslint-disable-next-line import/prefer-default-export
export function renderDashboard(req, res) {
	return res.render('application_dashboard', { user: req.user });
}
