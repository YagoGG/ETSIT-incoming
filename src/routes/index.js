import express from 'express';

import * as authController from '../controllers/auth';

import * as check from './checks';

const router = express.Router();

router.route('/')
	.get(check.isLoggedIn, (req, res) => res.render('index', { user: req.user }));

router.route('/login')
	.get((req, res) => res.render('login'))
	.post(authController.login);

router.route('/logout')
	.get(authController.logout);

export default router;
