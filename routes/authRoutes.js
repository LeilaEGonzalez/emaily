const passport = require('passport');

const paths = require('../paths');

module.exports = (app) => {
	app.get(
		paths.api,
		passport.authenticate('google', {
			scope: ['profile', 'email'],
		})
	);

	app.get(paths.api + '/callback', passport.authenticate('google'));

	app.get(paths.api + '/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.get(paths.api + '/user', (req, res) => {
		res.send(req.user);
	});
};
