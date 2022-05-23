const GoogleStrategy = require('passport-google-oauth20');
const passport = require('passport');
const mongoose = require('mongoose');

const keys = require('../config/keys');
const paths = require('../paths');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: (process.env.NODE_ENV === 'production' ? paths.prod : paths.dev) + paths.api,
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				return done(null, existingUser);
			}
			const user = await new User({ googleId: profile.id }).save();
			done(null, user);
		}
	)
);
