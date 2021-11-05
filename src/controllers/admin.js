import sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import configFile from '../../config.json';
import { User } from '../models';
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
