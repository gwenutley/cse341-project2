const routes = require("express").Router();
const {profileValidationRules, validate} = require("../middleware/validation");

//take us to the logic in controller file
const profilesController = require("../controllers/profiles");
const { isAuthenticated } = require("../middleware/authentification");

//look in profiles controller for the get all and single functions
routes.get("/", profilesController.getAll);
routes.get("/:id", profilesController.getSingle);

//look in profile controller to update, make, and delete profiles
routes.post("/", isAuthenticated, profileValidationRules(), validate, profilesController.createProfile);


routes.put("/:id", isAuthenticated, profileValidationRules(), validate, profilesController.updateProfile);

routes.delete("/:id", isAuthenticated, profilesController.deleteProfile );

module.exports = routes;