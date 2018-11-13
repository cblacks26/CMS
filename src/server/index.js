var express = require('express');
var app = express();
var path = require('path');
var mongoose = require("mongoose");
var db = require("./Models");
var bodyParser = require("body-parser");
var routes = require("./Routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', routes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function checkAndRouteXHR(req,res){
    if(!req.xhr){
        res.redirect('/');
    }
}

app.use(express.static('build')); //serves the bundle

app.get('*', function(req, res) {
    res.sendFile(path.resolve('./index.html'));
})
app.listen(8080);