var express = require("express");
const bodyParser = require("body-parser");

const db = require("../models/");
const US_state_model = db.us_states;
// or const {user} = require('../models/')

var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get('/us_states', (req, res, next)=>{

    
    US_state_model.find().exec().then((documents)=>{
        res.status(200).json(documents)
    }).catch((err)=>{
        next(err)
    })
})

module.exports = router;