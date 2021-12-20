import { AcademicPeriod, Institution, MobilityProgram } from '../models';

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

export async function renderFormMobilityProgram(req, res) {
	return res.render(
		'form_mobility_program',
		{
			application: getApplicationProxy(req.user.Application),
			academicPeriods: await AcademicPeriod.findAll({
				attributes: ['id', 'name'],
				where: { active: true },
			}),
			mobilityPrograms: await MobilityProgram.findAll({
				attributes: ['id', 'name'],
				where: { active: true },
			}),
		},
	);
}

export async function renderFormHomeInstitution(req, res) {
	return res.render(
		'form_home_institution',
		{
			application: getApplicationProxy(req.user.Application),
			institutions: await Institution.findAll({
				attributes: ['id', 'code', 'name'],
				where: { active: true },
			}),
		},
	);
}

export function renderFormPurposeOfStay(req, res) {
	return res.render(
		'form_purpose_of_stay',
		{ application: getApplicationProxy(req.user.Application) },
	);
}

export function renderFormLanguages(req, res) {
	return res.render(
		'form_languages',
		{ application: getApplicationProxy(req.user.Application) },
	);
}

export function renderFormWorkExperience(req, res) {
	return res.render(
		'form_work_experience',
		{ application: getApplicationProxy(req.user.Application) },
	);
}

export function renderFormStudies(req, res) {
	return res.render(
		'form_studies',
		{ application: getApplicationProxy(req.user.Application) },
	);
}

export async function saveApplicationData(req, res, next) {
	Object.keys(req.body).forEach((key) => {
		req.user.Application[key] = req.body[key];
	});
	await req.user.Application.save();
	next();
}

export function redirectOnCompletedForm(req, res) {
	req.flash('success', 'Your application form was saved successfully.');
	return res.redirect('/application');
}

export async function saveLearningAgreement(req, res) {
	const subjects = await Subject.findAll({
		where: {
			code: {
				[Op.in]: req.body.subjects,
			},
		},
	});
	await req.user.Application.addLearningAgreementSubjects(subjects);

	req.flash('success', 'Your learning agreement was saved successfully.');
	return res.redirect('/application');
}
