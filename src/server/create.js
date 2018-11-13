var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/site');
mongoose.Promise = Promise;
module.exports.Section = require("./Section");
module.exports.Page = require("./Page");

var Page = mongoose.model('Page', module.exports.Page);
var Section = mongoose.model('Section', module.exports.Section);

var homePage = new Page;
homePage.name = "Home";
var section1 = new Section;
section1.title = "What We Do";
section1.content = "Some basic boilerplate content";
var section2 = new Section;
section2.title = "About Us";
section2.content = "Some basic boilerplate content";