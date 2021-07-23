var express = require("express");
const bodyParser = require("body-parser");

const db = require("../models/");
const Quotes_model = db.quotes;
const Profile_model = db.profile;
// or const {user} = require('../models/')

var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

//We will add this later on, default 10, NEED CHANGE AFTER ASSINGMENT 4
function calculatePrice(address){
  return Promise.resolve(10);
}

router.post("/price/:username/suggestedprice", (req, res) => {
  console.log("suggested body:", req.body); 
  const username = req.params.username;

  return Profile_model.findOne({
      username: username
  }).then((profile)=>{

      if(!profile){
          return res.status(404).json({ result: "no such user" });
      }else{
      
        return calculatePrice(profile)
      }
  }).then((suggestedPricePerGallon)=>{

      res.status(200).json({
          "result": "price",
          pricePerGallon: suggestedPricePerGallon
      });
  }).catch((error)=>{
      next(error);
  })
})

router.post("/quotes/:username/order", (req, res, next) => {
  console.log("adding a quote");
  const username = req.params.username;
  const gallons = parseInt(req.body.gallons);
  const date = new Date(req.body.date);
  
  return Profile_model.findOne({
      username: username
  }).then((profile)=>{

      if(!profile){
          return res.status(404).json({ result: "no such user" });
      }else{

          return calculatePrice(profile).then((pricePerGallon)=>{
              const total = gallons * pricePerGallon;
              var quote = new Quotes_model({
                  username: username,
                  delivery : date,
                  gallons : gallons,
                  address : profile.toJSON(),
                  suggestedPrice: pricePerGallon,
                  total : total,
              })

              return quote.save();
          })
      }
  }).then((newQuote)=>{
      console.log("creqted quote");

      res.status(200).json({
          result: "added a quote",
          quote: newQuote
      })
  }).catch((err)=>{
      next(err);
  })
})


router.get("/quotes/:username", (req, res, next)=>{
  Quotes_model.find({ username: req.params.username })
  .then((quotes)=>{
      
      res.status(200).json({
          "result": "quotes by usernam",
          quotes: quotes
      });
  }).catch((err)=>{
      return next(err)
  })
})

module.exports = router;