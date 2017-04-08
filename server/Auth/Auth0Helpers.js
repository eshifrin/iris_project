const passport = require('passport');

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

exports.authVerify = passport.authenticate('auth0', { failureRedirect: '/failed-login' });

exports.login = (req, res) => {
	console.log('hitting login')
	res.render('login', { env: env });
}

exports.success = (req, res) => {
	console.log('hitting success')
	res.redirect('/');
}

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};