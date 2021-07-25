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

// Suggested Price = Current Price + Margin

// Where,

// Current price per gallon = $1.50 (this is the price what distributor gets from refinery and it varies based upon crude price. But we are keeping it constant for simplicity)
// Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)

// Consider these factors:
// Location Factor = 2% for Texas, 4% for out of state.
// Rate History Factor = 1% if client requested fuel before, 0% if no history (you can query fuel quote table to check if there are any rows for the client)
// Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
// Company Profit Factor = 10% always

async function calculatePrice(profile, gallons){
    console.log("calcp: ", profile)

    const current_price = 1.50;
    let location_factor = profile.us_state === 'TX' ? .02 : .04 ;
   
    const result = await Quotes_model.exists({ username: profile.username });
    let rate_history_factor = result ? .01 : 0;
    let gallons_requested_factor = (gallons>1000) ? .02 : .03;
    let margin = current_price * (location_factor - rate_history_factor + gallons_requested_factor + .1);
    let suggested_price = current_price + margin;
  return Promise.resolve(suggested_price);
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
      
        return calculatePrice(profile, req.body.gallons)
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