//servidor
var express = require('express')
app = express()
port = process.env.PORT || 3001

var cors = require('cors');
app.use(cors());

//modelo creado carga aqui
Task = require('./app/Models/taskModels') 
bodyParser = require('body-parser')

//hace la conexion mongoose para el esquema creado

const mongoose = require('mongoose');
const { Schema, connection} = mongoose;
const DB = 'Tasks';
const URI = `mongodb://localhost:27017/${DB}`;

mongoose.Promise = global.Promise
mongoose.connect(URI,{ useNewUrlParser: true })
/*connect*/

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//importa las rutas para ejecutar las acciones
var routes = require('./app/routes/tasksRouters')
//register the route 
routes(app)

app.listen(port)

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' no encontrado'})
})

console.log('servidor en: ' + port)