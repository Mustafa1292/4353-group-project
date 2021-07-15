const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

const users = [];

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "FuelCo App" });
});

app.post("/login", (req, res) => {
    var name = req.body.username;
    var pass = req.body.password;

    // find the user in users[]

    if(users.some(user => user.username === name && user.password === pass)) {
      res.json(users.find((user) => user.username === name));
    } else {
      res.status(404).json({"result": "invalid Username or password"})
    }

    // if(name === 'test' && pass === 'test' ){
    //     // hardcoded user for now
    //     res.json({"name": "Test User", id: "abcde1234"})
    // }else{
    //     res.json({"result": "success"})
    // }
  });

  app.post("/register", (req, res) => {
    const name = req.body.username;
    const pass = req.body.password;

    console.log("Register new user with ", name, pass);
    // grab user and pass store in db

    users.push({username: name, password: pass});

    res.json({"result": "success"})
  });

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}.`);
});