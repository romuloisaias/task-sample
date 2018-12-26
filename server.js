//IMPORT EXPRESS LIBRARY
var express = require('express')

//IMPORT CORS LIBRARY
var cors = require('cors')

//IMPORT BODYPARSER LIBRARY
bodyParser = require('body-parser')

//IMPORT MONGOOSE LIBRARY
const mongoose = require('mongoose');

//INCLUDE MODEL CREATED
Task = require('./app/models/taskModels') 

//INCLUDE ROUTES
var routes = require('./app/routes/tasksRouters')

//INCLUDE USER ROUTES
var routesUser = require('./app/routes/userRouters')

//INITIALIZE EXPRESS
app = express()

//DEFINED PORT TO CONNECTION
port = process.env.PORT || 3000

//USE CORTS
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' Not found'})
})

//SCHEMA
const { Schema, connection} = mongoose

//DATABASE
const DB = 'Tasks'

//URL
const URI = `mongodb://localhost:27017/${DB}`

mongoose.Promise = global.Promise

//CONNECT
mongoose.connect(URI,{ useNewUrlParser: true })

//REGISTER ROUTES
routes(app)
routesUser(app)

//LISTEN IN PORT
app.listen(port)

console.log('Server on in port : ' + port)