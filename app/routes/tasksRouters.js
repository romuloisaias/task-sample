'use strict';
module.exports = function(app) {
  var List = require('../controllers/tasksController.js')

  app.route('/tasks') // lista todos los elementos
    .get(List.listAllTasks)
    .post(List.createTask)

  app.route('/tasks/paginator/:page') //lista con paginación
    .get(List.listPages)

  app.route('/tasks/:taskId')
    .get(List.readTask) //lee tarea
    .put(List.updateStatus) //actualiza estatus (funciona)
    .delete(List.deleteTask) //borra tarea

  app.route('/tasks/status/:stat')
    .get(List.listStatusByStat) //lista filtrando por estatus

    app.route('/tasks/listAllByStatus/:id')
    .get(List.listAllByStatus) //lista todos por status
};
