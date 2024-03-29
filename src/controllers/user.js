import { User } from '../models';

// eslint-disable-next-line import/prefer-default-export
export async function register(req, res) {
	if (!req.user.temporaryPassword) throw new Error('This user is already registered.');
	['firstName', 'lastName', 'email', 'password'].forEach((key) => {
		req.user[key] = req.body[key];
	});
	req.user.temporaryPassword = false;

	if (req.user.role === User.STUDENT_ROLE) {
		req.user.createApplication({});
	}

	await req.user.save();
	res.redirect('/');
}
