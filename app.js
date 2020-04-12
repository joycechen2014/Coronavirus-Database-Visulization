var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var index = require("./app_server/routes/index");

var app = express();

//View engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "jade");


app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use(session({ secret: "String for encrypting cookies." }));

var mongo = require('mongodb');
var monk = require('monk');
// var lineReader = require('line-reader');
// var fs = require("fs");
// var readline = require("readline");
const csv = require('csv-parser')
const fs = require('fs')

var db = monk(`connectionstring`);
var db = monk('mongodb+srv://cmpe280-backup-4c9xo.mongodb.net/Coronavirus?retryWrites=true&w=majority', {
	  username : 'backup',
	  password : 'backup'
});



//Make the database accessible to the router.
  app.use(function(req, res, next)
  {
      req.db = db;
      // req.readline = readline;
      req.csv = csv;
      req.fs = fs;
      // req.lineReader = lineReader;
      next();
  });
app.use("/", index);

module.exports = app;
app.listen(3000);
