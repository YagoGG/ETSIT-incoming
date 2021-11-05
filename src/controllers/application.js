/**
 * Wrap an instance of the Application model in a Proxy so that all keys with a
 * null value return undefined instead.
 * This is done so that the proxied Applications can be used directly to hydrate
 * the forms in the React views: the inputs need either "undefined" or a proper
 * value, since "null" values cannot be properly handled.
 * @param {any} application - Application instance to wrap.
 * @returns The Proxy.
 */
function getApplicationProxy(application) {
	// Using .get() here to work with an object that just contains the
	// instance's values, instead of the rich Sequelize instance (which is
	// problematic upon proxying).
	return new Proxy(application.get(), {
		get: (object, key) => (
			(object[key] === null) ? undefined : object[key]
		),
	});
}

export function renderDashboard(req, res) {
	return res.render('application_dashboard', { user: req.user });
}

export function renderFormPersonalInfo(req, res) {
	return res.render(
		'form_personal_info',
		{ application: getApplicationProxy(req.user.Application) },
	);
}

export function saveApplicationData(req, res, next) {
	Object.keys(req.body).forEach((key) => {
		req.user.Application[key] = req.body[key];
	});
	req.user.Application.save();
	next();
}

export function redirectOnCompletedForm(req, res) {
	req.flash('success', 'Your application form was saved successfully.');
	return res.redirect('/application');
}
