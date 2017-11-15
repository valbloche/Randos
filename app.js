var express = require("express")
var path = require('path');

var app = express()

app.use(express.static(__dirname + "/"))

app.listen(7400);
console.log("App built. Accessible on localhost:7400")
