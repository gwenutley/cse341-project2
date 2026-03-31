const isAuthenticated = (req, res, next) => {
    if(!req.user){
        return res.status(401).json("you don't have access");
    }
    next();
};

module.exports = {
    isAuthenticated
}