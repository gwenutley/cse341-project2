const routes = require("express").Router();

routes.get("/", (req, res) => (res.send("Hello World")));

//takes us to the profiles.js
routes.use("/profiles", require("./profiles"))

module.exports = routes;