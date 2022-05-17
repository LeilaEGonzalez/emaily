const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("../config/keys");

require("../models/User");
require("../services/passport");
console.log(keys.mongoURI);
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

app.use("/.netlify/functions/api", router);
require("../routes/authRoutes")(app);
module.exports.handler = serverless(app);
