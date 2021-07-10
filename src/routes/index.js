import express from 'express';

import * as authController from '../controllers/auth';
import { User } from '../models';

import * as check from './utils/check';

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
	.get(check.isLoggedIn, (req, res) => res.render('application_dashboard', { user: req.user }));

router.route('/admin')
	.get(check.isAdmin, (req, res) => res.render('admin_dashboard', { user: req.user }));

router.route('/login')
	.get((req, res) => res.render('login'))
	.post(authController.login);

router.route('/logout')
	.get(authController.logout);

export default router;
