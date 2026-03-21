const mongodb = require("../data/database");
//unique id mongo gives to each entry
const ObjectId = require("mongodb").ObjectId;

//get all the profile data
const getAll = async (req, res) => {
    //#swagger.tags=["Profiles"]
    const result = await mongodb.getDatabase().db("project2").collection("profiles").find();
    result.toArray().then((profiles) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(profiles);
    });
};

//get one single profile
const getSingle = async (req, res) => {
    //#swagger.tags=["Profiles"]
    const profileId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("project2").collection("profiles").find({ _id: profileId });
    const profiles = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(profiles[0]);
};

//update user profile
const updateProfile = async (req, res) => {
    //#swagger.tags=["Profiles"]
    const profileId = new ObjectId(req.params.id);
    const profile = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        weight: req.body.weight,
        height: req.body.height,
        fitnessGoal: req.body.fitnessGoal,
        activityLevel: req.body.activityLevel 
    };
    const result = await mongodb.getDatabase().db("project2").collection("profiles").replaceOne({ _id: profileId }, profile);
    if(result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Error updating the profile");
    }
}

//create a new user profile
const createProfile = async (req, res) => {
    //#swagger.tags=["Profiles"]
    try {
        const profile = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            weight: req.body.weight,
            height: req.body.height,
            fitnessGoal: req.body.fitnessGoal,
            activityLevel: req.body.activityLevel 
        };
        const result = await mongodb.getDatabase().db("project2").collection("profiles").insertOne(profile);
        if(result.acknowledged) {
            res.status(201).send();
        } else {
            res.status(500).json({error: "Error creating the profile"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

//delete a profile
const deleteProfile = async (req, res) => {
    //#swagger.tags=["Profiles"]
    const profileId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("project2").collection("profiles").deleteOne({ _id: profileId});
    if(result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Error deleting the profile");
    }
};


module.exports = {
    getAll,
    getSingle,
    createProfile,
    deleteProfile,
    updateProfile
}