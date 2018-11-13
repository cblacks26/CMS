var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/site');
mongoose.Promise = Promise;
module.exports.Section = require("./Section");
module.exports.Page = require("./Page");