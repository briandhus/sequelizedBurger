var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  db.Burger.all(function(data) {
    var hbsObject = {
      burger_name: data
    };
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  db.Burger.create([
    "burger_name"
  ], [
    req.body.burger_name
  ], function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  db.Burger.update({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});

module.exports = router;


