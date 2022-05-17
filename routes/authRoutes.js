const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/.netlify/functions/api",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/.netlify/functions/api", passport.authenticate("google"));
  app.get("/.netlify/functions/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });
  app.get("/.netlify/functions/api/user", (req, res) => {
    console.log(user);
    res.send(req.user);
  });
};
