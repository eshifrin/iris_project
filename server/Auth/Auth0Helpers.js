const passport = require('passport');
const dbh = require('../../db/db_helpers')

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

exports.authVerify = passport.authenticate('auth0', { failureRedirect: '/failed-login' });

exports.login = (req, res) => {
	res.render('login', { env: env });
}

exports.landing = (req, res) => {
	console.log('hitting landing')
	// res.render('index', { title: 'Broasis!', env: env });
	res.redirect('/');
}

exports.success = (req, res) => {
	console.log('hitting success, req :', req);
	res.redirect('/');
}

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};