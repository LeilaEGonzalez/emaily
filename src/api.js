const express = require("express");
const serverless = require("serverless-http");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");

const app = express();
const router = express.Router();

app.use("/.netlify/functions/api", router);
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "http://localhost:9000/.netlify/functions/api/",
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);
app.get(
  "/.netlify/functions/api",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
module.exports.handler = serverless(app);
