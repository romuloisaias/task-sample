var express = require("express");
var app = express();

var bodyParser = require('body-parser')
var conn = require('./Models/Task.js');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

cors = require('cors');
app.all('*', cors());

var mongo = require('mongodb');
var router = express.Router();
app.use('/routes', router);
app.listen(8080, function () {
    console.log('localhost:8080')
});