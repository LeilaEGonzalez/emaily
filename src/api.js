const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('../config/keys');
const paths = require('../paths');

require('../models/User');
require('../services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
const router = express.Router();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(paths.api, router);
require('../routes/authRoutes')(app);
module.exports.handler = serverless(app);
