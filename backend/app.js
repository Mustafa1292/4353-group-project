const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const userController = require("./app/controllers/users.js");
const profileController = require("./app/controllers/profile.js");
const statesController = require("./app/controllers/states.js");
const quotesController = require("./app/controllers/quotes.js");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const users = ['test'];

var quoteId = 0;
const quotes = {};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userController);
app.use("/", profileController);
app.use("/", statesController);
app.use("/", quotesController);

app.get("/", (req, res) => {
  res.json({ message: "FuelCo App" });
});

// app.post("/login", (req, res) => {

//     if(!req.body || !req.body.username || !req.body.password) {
//       return res.status(400).json({"result": "Bad Request"})
//     }

//     const {username: name, password: pass} = req.body;
//     // var name = req.body.username;
//     // var pass = req.body.password;

//     // find the user in users[]

//     if(users.some(user => user.username === name && user.password === pass)) {
//       return res.json(users.find((user) => user.username === name));
//     } else {
//       return res.status(404).json({"result": "invalid Username or password"})
//     }

//     // if(name === 'test' && pass === 'test' ){
//     //     // hardcoded user for now
//     //     res.json({"name": "Test User", id: "abcde1234"})
//     // }else{
//     //     res.json({"result": "success"})
//     // }
//   });



// app.post("/register", (req, res) => {
//   const name = req.body.username;
//   const pass = req.body.password;

//   console.log("Register new user with ", name, pass);
//   // grab user and pass store in db

//   users.push({username: name, password: pass});

//   res.json({"result": "success"})
// });
/*
  app.post("/user/:username/profile", (req, res) => {

    console.log("Update profile the USER", req.params.username)
    console.log("all users", users);
    // find user in users[]
    const existingUser = users.find((user) => user.username === req.params.username )

    // handle a 404 back
    if(!existingUser || !existingUser.username) {
      return res.status(404).json({"result": "no such user"})
    }
    // if username exists then update the user object
    existingUser.profile = req.body.profile;
    res.status(200).json({"result": "user updated", user: existingUser});

  })
  
  app.get("/user/:username/address",(req, res) =>{
    console.log("addrses is", req.params)
    const username = req.params.username;
    const existingUser = users.find((user) => user.username === username )
    if(!existingUser || !existingUser.username) {
      return res.status(404).json({"result": "no such user"})
    }
    res.status(200).json({"result": "user address", address: existingUser.profile});
  })


  function calculatePrice(address){
    return 10
  }

  app.post("/price/:username/suggestedprice", (req, res) => {

    console.log("suggested body:", req.body);

    const gallons = parseInt(req.body.gallons);
    const address = req.body.address;

    var suggestedPricePerGallon = calculatePrice(address);
    var suggestedPrice = suggestedPricePerGallon * gallons
    res.status(200).json({"result": "price", pricePerGallon: suggestedPricePerGallon});

  })

  app.post("/quotes/:username/order", (req, res) => {
    const username = req.params.username;
    const gallons = parseInt(req.body.gallons);
    const address = req.body.address;
    const date = req.body.date;

    const pricePerGallon = calculatePrice(address);
    
    const total = gallons * pricePerGallon;

    var id = quoteId++;
    quotes[id] = {
      id: id,
      username: username,
      address: address,
      gallons: gallons,
      date: date,
      pricePerGallon: pricePerGallon,
      total: total
    }
    res.status(200).json({ result: "added a quote", quoteId: id })
  })

  app.get("/quotes/:username", (req, res)=>{
    const username = req.params.username;
    const items = Object.values(quotes).filter((quote)=>{
      return quote.username === username
    })
    res.status(200).json({"result": "quotes by usernam", quotes: items});

  })*/

app.use(function (req, res, next) {
  res.status(404).json({
    error: "route doesn't exist"
  })
})

app.use(function (err, req, res, next) {
  // logic

  console.error(err);

  res.status(500).json({
    error: true,
    message: err.message || err.toString()
  })
})
module.exports = app;