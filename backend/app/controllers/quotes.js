var express = require("express");
const bodyParser = require("body-parser");

const db = require("../models/");
const User_model = db.user;
const Profile_model = db.profile;
// or const {user} = require('../models/')

var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});
