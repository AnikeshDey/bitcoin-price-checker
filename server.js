//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  var crypto = req.body.crypto;
  var currency = req.body.currency;
  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

  var finalURL = baseURL + crypto + currency;

  request(finalURL, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.last;
    var currentDate = data.display_timestamp;

    res.write("<html><body><h3>The current Time is " + currentDate + "</h3></body></html>");
    res.write("<h1>The current price of " + crypto + " is " + price + " " + currency + "</h1>");
    res.send();

  });
});
app.listen(3000, function() {
  console.log("Started Server on Port 3000");
});
