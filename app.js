var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// Mongo DB
const mongoose = require("mongoose");
// Connect to our Database and handle an bad connections
var mongodb = require("mongodb");
mongoose.connect("mongodb://master:Pokemon1@ds241677.mlab.com:41677/ghuc");

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", err => {
	console.error(`The error is → ${err.message}`);
});
require("./models/Patient");

// Routing
var index = require("./routes/index");
var users = require("./routes/users");

var app = express();
app.locals.moment = require("moment");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// import environmental variables from our variables.env file
// require("dotenv").config({ path: "variables.env" });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
