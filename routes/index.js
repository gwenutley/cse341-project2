const routes = require("express").Router();

//takes us to the profiles.js
routes.use("/profiles", require("./profiles"));
routes.use("/", require("./swagger"));

module.exports = routes;