import nodemailer from 'nodemailer';

import configFile from '../../config.json';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const transporter = nodemailer.createTransport({
	...(env === 'test' ? {} : config.email.smtp),
});

// eslint-disable-next-line import/prefer-default-export
export async function sendAdminEmail(to, subject, text) {
	await transporter.sendMail({
		from: config.email.adminFrom,
		to,
		subject,
		text,
	});
}
