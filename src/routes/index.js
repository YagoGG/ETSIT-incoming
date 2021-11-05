import express from 'express';

import * as adminController from '../controllers/admin';
import * as applicationController from '../controllers/application';
import * as authController from '../controllers/auth';
import * as userController from '../controllers/user';
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

router.route('/register')
	.get(
		validateInput.registrationFormView,
		authController.login('temporary-local', 'registration'),
	)
	.post(
		check.isLoggedIn,
		validateInput.registrationFormSubmit,
		userController.register,
	);

router.route('/application')
	.get(
		check.isLoggedIn,
		applicationController.renderDashboard,
	);

router.route('/application/form')
	.get(
		check.isLoggedIn,
		(req, res) => res.redirect('/application/form/personal-info'),
	);

router.route('/application/form/personal-info')
	.get(
		check.isLoggedIn,
		applicationController.renderFormPersonalInfo,
	)
	.post(
		check.isLoggedIn,
		validateInput.applicationFormPersonalInfoSubmit,
		applicationController.saveApplicationData,
		applicationController.redirectOnCompletedForm,
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
	.get((req, res, next) => {
		// Go to the home page if the user is already logged in.
		if (req.user) {
			res.redirect('/');
		} else {
			next();
		}
	}, authController.renderLogin)
	.post(
		validateInput.login,
		authController.login('regular-local'),
	);

router.route('/logout')
	.get(authController.logout);

export default router;
