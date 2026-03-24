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

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    profileValidationRules,
    validate
}