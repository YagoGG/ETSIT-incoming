const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

function requireLogin(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/login');
	}
}

router.route('/')
	.get(requireLogin, (req, res) => res.render('index'));

router.route('/login')
	.get((req, res) => res.render('login'))
	.post(authController.login);

router.route('/logout')
	.get(authController.logout);

module.exports = router;
