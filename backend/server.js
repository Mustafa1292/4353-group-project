const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "FuelCo App" });
});

app.post("/login", (req, res) => {
    var name = req.body.username;
    var pass = req.body.password;
    if(name === 'test' && pass === 'test' ){
        res.json({"user": {"name": "Test User", id: "abcde1234"}})
    }else{
        res.json({"result": "success"})
    }
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}.`);
});