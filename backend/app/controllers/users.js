var express = require("express");
const bodyParser = require("body-parser");

const db = require("../models/");
const User_model = db.user;
// or const {user} = require('../models/')

var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.post("/register", bodyParser.json(), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("Register new user with ", username, password);
  // grab user and pass store in db
  const newUser = new User_model({ username, password });

  // For future: async and await
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

  // save returns a promise
  newUser
    .save()
    .then((newUserDoc) => {
      res.json({ result: "success" });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/login", bodyParser.json(), (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ result: "Bad Request" });
  }

  const { username: name, password: pass } = req.body;

  User_model.findOne({ username: name })
    .exec()
    .then((possibleUser) => {
      if (!possibleUser) {
        return res.status(404).json({ result: "invalid Username or password" });
      }
      if (possibleUser.password === pass) {
        return res.status(200).json(possibleUser);
      } else {
        return res.status(404).json({ result: "invalid Username or password" });
      }
    });
});

module.exports = router;
