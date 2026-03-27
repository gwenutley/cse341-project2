const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const profileValidationRules = () => {
    return [
        body("name").isString().withMessage("Name must be a string"),
        body("email").isEmail().withMessage("Email must be a valid email"),
        body("age").isNumeric().withMessage("Age must be a number only").toInt(),
        body("weight").isNumeric().withMessage("Weight must be a number only").toFloat(),
        body("height").isNumeric().withMessage("Height must be a number only").toFloat(),
        body("fitnessGoal").isString().withMessage("FitnessGoal must be a string"),
        body("activityLevel").isString().withMessage("activity level must be a string")
    ];
};

const workoutValidationRules = () => {
    return [
        body("profileId").isString().isLength({ min:24, max:24}).withMessage("Profile must be a 24 digit string"),
        body("exercise").isString().withMessage("exercise must be a string"),
        body("sets").isNumeric().withMessage("Sets must be a number"),
        body("reps").isNumeric().withMessage("Reps must be a number"),
        body("weight").isNumeric().withMessage("Weight must be a number"),
        body("date").matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("Date must be format yyyy-mm-dd")
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    profileValidationRules,
    workoutValidationRules,
    validate
}