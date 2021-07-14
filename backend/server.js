const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "FuelCo App" });
});

app.get("/login", (req, res) => {
    var name = req.body.username;
    var pass = req.body.password;
    if(name === 'test' && pass === 'test' ){
        res.json({"result": "success"})
    }else{
        res.json("{result: success}")
    }
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}.`);
});