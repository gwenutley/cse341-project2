const mongodb = require("../data/database");
//unique id mongo gives to each entry
const ObjectId = require("mongodb").ObjectId;

//get all the workout
const getAll = async (req, res) => {
    //#swagger.tags=["Workouts"]
    try {
        const result = await mongodb.getDatabase().db("project2").collection("workouts").find().toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving workouts "});
    }
};

//get one single workout
const getSingle = async (req, res) => {
    //#swagger.tags=["Workouts"]
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid workout ID" });
    }  
    try {
        const workoutId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db("project2").collection("workouts").find({ _id: workoutId });
        const workouts = await result.toArray();

        //check workout exists
        if (!workouts[0]) {
            return res.status(404).json({error: "Workout not found"});
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(workouts[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving this workout "});
    }
};

//update workout
const updateWorkout = async (req, res) => {
    //#swagger.tags=["Workouts"]
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid workout ID" });
    }  
    try {     
        const workoutId = new ObjectId(req.params.id);
        const workout = {
            profileId: new ObjectId(req.body.profileId),
            exercise: req.body.exercise,
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight,
            date: req.body.date
        };
        const result = await mongodb.getDatabase().db("project2").collection("workouts").replaceOne({ _id: workoutId }, workout);
        if(result.modifiedCount > 0) {
            res.status(200).send();
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating workout "});
    }
}

//create a new workout
const createWorkout = async (req, res) => {
    //#swagger.tags=["Workouts"]
    try {
        const workout = {
            profileId: new ObjectId(req.body.profileId),
            exercise: req.body.exercise,
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight,
            date: req.body.date 
        };
        const result = await mongodb.getDatabase().db("project2").collection("workouts").insertOne(workout);
        if(result.acknowledged) {
            res.status(200).send();
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    //#swagger.tags=["Workouts"]
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid workout ID" });
    }  
    try {
        const workoutId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db("project2").collection("workouts").deleteOne({ _id: workoutId});
        if(result.deletedCount > 0) {
            res.status(200).send();
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting workout "});
    }
};


module.exports = {
    getAll,
    getSingle,
    createWorkout,
    deleteWorkout,
    updateWorkout
}