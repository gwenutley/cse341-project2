const mongodb = require("../data/database");
//unique id mongo gives to each entry
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db("project2").collection("profiles").find();
    result.toArray().then((profiles) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(profiles);
    });
};

const getSingle = async (req, res) => {
    const profileId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("project2").collection("profiles").find({ _id: profileId });
    const profiles = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(profiles[0]);
};

module.exports = {
    getAll,
    getSingle
}