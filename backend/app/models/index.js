const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.profile = require("./profile.model.js")(mongoose);
db.us_states = require("./us_states.model")(mongoose);
db.quotes = require("./quotes.model")(mongoose);

module.exports = db;