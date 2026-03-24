const routes = require("express").Router();
const {profileValidationRules, validate} = require("../middleware/validation");

//take us to the logic in controller file
const profilesController = require("../controllers/profiles");

//look in profiles controller for the get all and single functions
routes.get("/", profilesController.getAll);
routes.get("/:id", profilesController.getSingle);

//look in profile controller to update, make, and delete profiles
routes.post("/", profileValidationRules(), validate, profilesController.createProfile);


routes.put("/:id", profileValidationRules(), validate, profilesController.updateProfile);

routes.delete("/:id", profilesController.deleteProfile );

module.exports = routes;