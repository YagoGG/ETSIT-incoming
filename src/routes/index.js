import express from 'express';

import * as adminController from '../controllers/admin';
import * as applicationController from '../controllers/application';
import * as authController from '../controllers/auth';
import { User } from '../models';

import * as check from './utils/check';
import validateInput from './utils/validateInput';

const router = express.Router();

router.route('/')
	.get(check.isLoggedIn, (req, res) => {
		if (req.user.role === User.ADMIN_ROLE) {
			res.redirect('/admin');
		} else {
			res.redirect('/application');
		}
	});

router.route('/application')
	.get(
		check.isLoggedIn,
		applicationController.renderDashboard,
	);

router.route('/admin')
	.get(
		check.isAdmin,
		adminController.renderDashboard,
	);

router.route('/admin/nominate')
	.post(
		check.isAdmin,
		validateInput.nominateUsers,
		adminController.nominate,
	);

router.route('/login')
	.get(authController.renderLogin)
	.post(
		validateInput.login,
		authController.login('regular-local'),
	);

router.route('/logout')
	.get(authController.logout);

export default router;
