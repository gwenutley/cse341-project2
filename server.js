const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require("./data/database");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

//swagger
app
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    ///Basic express session initialization
    .use(passport.initialize())
    //init passport on every route call
    .use(passport.session())
    //allow passport to use express session
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
        );
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    })
    .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]}))
    .use(cors({ origin: "https://cse341-project2-x9o6.onrender.com", credentials: true }))
    .use("/", require("./routes/index.js"));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        //Use.findOrCreate({ githubId: profile.id }, function (err, user) {
            return done(null, profile);
        //});
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/", (req, res) => { res.send(req.user ? `Logged in as ${req.user.displayName || req.user.username}` : "Logged Out")});

app.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/api-docs"}),
    (req, res) => {
        res.redirect("/");
    });


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and running on port ${port}`)});
    }
});