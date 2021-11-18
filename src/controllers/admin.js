import sequelize, { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import configFile from '../../config.json';
import { getStudyPlans, getSubjects } from '../api_upm';
import { Institution, User, Subject } from '../models';
import { sendAdminEmail } from '../utils/mail';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

export async function renderDashboard(req, res) {
	return res.render('admin_dashboard', {
		user: req.user,
		nominated: await User.findAll({
			where: {
				role: User.STUDENT_ROLE,
				firstName: null,
			},
		}),
		registered: await User.findAll({
			where: {
				role: User.STUDENT_ROLE,
				firstName: {
					[sequelize.Op.not]: null,
				},
			},
			include: {
				all: true,
				nested: true,
			},
		}),
		admins: await User.findAll({
			where: {
				role: User.ADMIN_ROLE,
			},
		}),
	});
}

export async function nominate(req, res) {
	const emails = req.body.emails.split(/[,\n]/);
	const queue = emails.map(async (email) => {
		const token = uuidv4();
		await User.create({
			email,
			password: token,
			temporaryPassword: true,
		});

		const registrationURL = new URL('/register', config.server.publicURL);
		registrationURL.searchParams.set('email', email);
		registrationURL.searchParams.set('token', token);

		await sendAdminEmail(
			email,
			'Your exchange at ETSIT-UPM',
			`Dear student,

				We are pleased to inform you that your Home University has nominated you for a
				mobility program at ETSIT-UPM.

				To start the application process, please register with the following link:

					${registrationURL.toString()}

				Kindest regards,
				The International Office at ETSIT-UPM
				`,
		);
	});

	await Promise.all(queue);
	req.flash('success', 'Nominations sent.');
	return res.redirect('/admin');
}

export async function updateInstitutions(req, res) {
	await Institution.bulkCreate(req.body.institutions, {
		updateOnDuplicate: ['name', 'active'],
	});
	req.flash('success', 'Partner institution list updated.');
	return res.redirect('/admin');
}

export async function renderSubjects(req, res) {
	const studyPlans = (await getStudyPlans('09')).map((rawStudyPlan) => ({
		code: rawStudyPlan.codigo,
		nameNative: rawStudyPlan.nombre,
	}));
	return res.render(
		'admin_subjects',
		{
			subjects: await Subject.findAll(),
			studyPlans,
		},
	);
}

export async function updateSubjects(req, res) {
	const studyPlans = ['09BM', '09ID', '09TT', '09AQ', '09AR', '09AT', '09AU', '09AW', '09AX', '09AZ', '09BA'];
	const rawSubjects = await getSubjects(studyPlans);
	const dbData = rawSubjects
		.map((rawSubject) => ({
			code: rawSubject.codigo,
			nameNative: rawSubject.nombre,
			nameEnglish: rawSubject.nombre_ingles,
			ects: parseFloat(rawSubject.credects.replace(',', '.')),
			active: rawSubject.ofertada === 'S',
		})).flat();
	await Subject.bulkCreate(dbData, {
		updateOnDuplicate: ['nameNative', 'nameEnglish', 'ects', 'active'],
	});

	req.flash('success', 'The subject list has been updated.');
	return res.redirect('/admin/subjects');
}

export async function updateSubjectStatuses(req, res) {
	/* Because of how HTML checkboxes work, req.body only contains keys for those
	 * checkboxes that have been marked (i.e. those subjects that should be
	 * enabled).
	 *
	 * This means that the rest of the subjects that are not in that list should
	 * be disabled. */
	const activeCodes = Object.keys(req.body).map((codeStr) => parseInt(codeStr, 10));
	await Subject.update({
		active: true,
	}, {
		where: {
			code: {
				[Op.in]: activeCodes,
			},
		},
	});
	await Subject.update({
		active: false,
	}, {
		where: {
			code: {
				[Op.notIn]: activeCodes,
			},
		},
	});

	req.flash('success', 'The changes were saved.');
	return res.redirect('/admin/subjects');
}
