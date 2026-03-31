const routes = require("express").Router();
const passport = require("passport");

routes.get("/", (req, res) => {
    res.send(req.user ? `Logged in as ${req.user.displayName || req.user.username}` : "Logged Out");
});

//takes us to the profiles.js
routes.use("/profiles", require("./profiles"));
routes.use("/workouts", require("./workouts"));
routes.use("/", require("./swagger"));

routes.get("/login", passport.authenticate("github"), (req, res) => {});

routes.get("/logout", function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
    });
});

module.exports = routes;