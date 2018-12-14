var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Task = require('./app/Models/taskModels'), //modelo creado carga aqui
bodyParser = require('body-parser');

//hace la conexion mongoose para el esquema creado
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tasks',{ useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/tasksRouters'); //importa las rutas para ejecutar las acciones
routes(app); //register the route

app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' no encontrado'})
});

console.log('servidor en: ' + port);