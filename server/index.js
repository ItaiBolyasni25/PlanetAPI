const express = require('express');
const app = express();
const loki = require("lokijs");
const bodyParser = require("body-parser");
const validator = require("express-validator");
const session = require("express-session");

var db = new loki('db.json');
var planets = db.addCollection('planets');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(validator())

app.use(function(req, res, next) {
    //Set up CORS headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(session({secret: "secret", saveUninitialized: false, resave: true}));

app.listen(5000, () => {
    console.log("Server is up an listening on port 5000...");
    // Build the in-memory database
    const planet1 = { name: "Earth", SolarSystem: "The Solar System"};
    const planet2 = { name: "Mars", SolarSystem: "The Solar System"};
    const planet3 = { name: "Kepler 22B", SolarSystem: "Kepler"};

    planets.insert([planet1,planet2,planet3]);
});

app.get("/planets", (req,res) => {
    console.log("Responding to /planets");
    // Get all planets
    var result = planets.chain().data();

    res.json(result);
    res.end();
});

app.get("/planets/names", (req,res) => {
    console.log("Responding to /planets/names");
    // Get all planet names
    var result = planets.chain().data();
    planets = [];
    result.forEach(element => {
        planets.push(element.name);
    })

    res.json(planets);
    res.end();
});

app.get("/", (req,res) => {
    // Redirect to home page in the application
    res.redirect("http://localhost:3000/")
})

app.post("/planets/create", (req,res) => {
    console.log("Responing to /planets/create");
    //Create a new planet and add it to the db
    req.check('planetName', "Planet name is too short!").isLength({min: 3});
    req.check('planetName', "Solar system name is too short!").isLength({min: 3});
    var errors = req.validationErrors();
    if (errors) {
        req.session.errors = errors;
        res.redirect("/");
    } else {
        var planet = {name: req.body.planetName, SolarSystem: req.body.solarSystem};

        planets.insert(planet);
    }
    res.redirect('/');
    res.end();
});

app.get("/planets/:planetName", (req,res) => {
    //Find a planet in the database
    console.log("Responding to /planets/:id GET" + req.params.planetName);
    //Search by planet name case insensitive
    var searchRegex = new RegExp(`^${req.params.planetName}.*`, 'i');
    var planet = planets.find({name: {'$regex': searchRegex}});
    res.json(planet);
    res.end();
});
