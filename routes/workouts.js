const routes = require("express").Router();
const { workoutValidationRules, validate } = require("../middleware/validation");

//take us to the logic in controller file
const workoutsController = require("../controllers/workouts");

//look in profiles controller for the get all and single functions
routes.get("/", workoutsController.getAll);
routes.get("/:id", workoutsController.getSingle);

//look in profile controller to update, make, and delete profiles
routes.post("/", validate, workoutValidationRules(), workoutsController.createWorkout);

routes.put("/:id", validate, workoutValidationRules(), workoutsController.updateWorkout);

routes.delete("/:id", workoutsController.deleteWorkout );

module.exports = routes;