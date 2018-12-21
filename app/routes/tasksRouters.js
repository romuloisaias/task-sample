'use strict';
module.exports = function(app) {
  var taskController = require('../controllers/tasksController.js')
  
  app.route("/")
    .get(taskController.initPage)

  app.route('/tasks') // lista todos los elementos
    .get(taskController.listAllTasks)
    .post(taskController.createTask)

  app.route('/tasks/paginator/:page/:elements') //lista con paginación
    .get(taskController.listPages)

  app.route('/tasks/:id')
    .get(taskController.readTask) //lee tarea
    .put(taskController.updateTask) //actualiza estatus (funciona)
    .delete(taskController.deleteTask) //borra tarea

  app.route('/tasks/title/:title') //busca parecidos por titulo
    .get(taskController.searchByTitle)

  app.route('/tasks/listAllByStatus/:id')
    .get(taskController.listAllByStatus) //lista todos por status

  app.route('/tasks/updateIds/upDateByIds/')
    .put(taskController.updateByIdCollection) //lista todos por colección de IDs

  app.route('/tasks/status/:id')
    .put(taskController.updateStatus) //lista todos por status
};
