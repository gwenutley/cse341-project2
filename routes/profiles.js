const routes = require("express").Router();

//take us to the logic in controller file
const profilesController = require("../controllers/profiles");

//look in profiles controller for the get all and single functions
routes.get("/", profilesController.getAll);
routes.get("/:id", profilesController.getSingle);

//look in profile controller to update, make, and delete profiles
routes.post("/", profilesController.createProfile);
routes.put("/:id", profilesController.updateProfile);
routes.delete("/:id", profilesController.deleteProfile );

module.exports = routes;