var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var port = process.env.PORT || 8080;
var socketio = require("socket.io");
var config = require("./app/config");

// modules
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");

mongoose.connect(config.db);

// middleware
app.use(express.static("client"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: config.session_secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require("./app/routes.js")(app, passport);
require("./app/passport.js")(passport);

app.set("view engine", "ejs");
app.set("views", __dirname + "/client/views");

require("./app/game.js");

// Node Server
// app.listen(port || 3000, function() {
//   console.log("node server running on port 3000")
// });

var io = socketio.listen(server);

io.on("connection", function(){
  console.log("a user has connected");
});

// Http Server
server.listen(port, function() {
  console.log("http server running on port 3001")
});