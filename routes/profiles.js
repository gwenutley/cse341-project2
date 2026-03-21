const routes = require("express").Router();

//take us to the logic in controller file
const profilesController = require("../controllers/profiles");

//look in profiles controller for the get all and single functions
routes.get("/", profilesController.getAll);
routes.get("/:id", profilesController.getSingle);

module.exports = routes;