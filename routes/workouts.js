const routes = require("express").Router();
const { workoutValidationRules, validate } = require("../middleware/validation");
const { isAuthenticated } = require("../middleware/authentification");

//take us to the logic in controller file
const workoutsController = require("../controllers/workouts");

//look in profiles controller for the get all and single functions
routes.get("/", workoutsController.getAll);
routes.get("/:id", workoutsController.getSingle);

//look in profile controller to update, make, and delete profiles
routes.post("/", isAuthenticated, validate, workoutValidationRules(), workoutsController.createWorkout);

routes.put("/:id", isAuthenticated, validate, workoutValidationRules(), workoutsController.updateWorkout);

routes.delete("/:id", isAuthenticated, workoutsController.deleteWorkout );

module.exports = routes;