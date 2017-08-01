var express = require('express');
var bodyParser = require ('body-parser');
// var methodOverride = require ('method-override');

var app = express();
var port = process.env.PORT || 8080;

var db = require("./models");
// Serve static content for the app from the "public" directory in the application directory.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));
// Override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burger_controller.js");

app.use("/", routes);
app.use("/create", routes);
app.use("/update", routes);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});


