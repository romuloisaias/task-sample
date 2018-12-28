//IMPORT EXPRESS SERVER
var express = require("express")
app = express()
//CONFIG PORT
port = process.env.PORT || 3000
//IMPORT CORS
var cors = require("cors")
app.use(cors())
//IMPORT BODY-PARSER
bodyParser = require("body-parser")
//IMPORT MONGOOSE LIBRARY
const mongoose = require("mongoose")
const { Schema, connection } = mongoose
const DB = "Tasks"
const URI = `mongodb://localhost:27017/${DB}`
mongoose.Promise = global.Promise
mongoose.connect(
  URI,
  { useNewUrlParser: true }
)
//USE BODY-PARSER
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//IMPORT THE ROUTES TO EXECUTE THE ACTIONS
var routesTask = require("./app/routes/tasksRouters")
var routesUser = require("./app/routes/userRouters")
var routesToken = require("./app/routes/tokenRouters")
//REGISTER ROUTES
routesTask(app)
routesUser(app)
routesToken(app)
//LISTEN PORT
app.listen(port)
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + " no encontrado" })
})
console.log("servidor en: " + port)
