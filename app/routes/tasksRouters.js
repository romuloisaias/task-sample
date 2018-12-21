'use strict';
module.exports = function(app) {
  var List = require('../controllers/tasksController.js')

  app.route("/") //redirige a /tasks
    .get(List.initPage)

  app.route('/tasks') // lista todos los elementos
    .get(List.listAllTasks)
    .post(List.createTask)

  app.route('/tasks/paginator/:page/:elems') //lista con paginación
    .get(List.listPages)

  app.route('/tasks/:taskId')
    .get(List.readTask) //lee tarea
    .put(List.updateTask) //actualiza estatus (funciona)
    .delete(List.deleteTask) //borra tarea

  //app.route('/tasks/status/:stat')
    //.get(List.listStatusByStat) //lista filtrando por estatus

  app.route('/tasks/title/:tit') //busca parecidos por titulo
    .get(List.searchByTitle)

  app.route('/tasks/listAllByStatus/:id')
    .get(List.listAllByStatus) //lista todos por status

  app.route('/tasks/updateIds/upDateByIds/')
    .put(List.updateByIdCollection) //lista todos por colección de IDs

  app.route('/tasks/status/:id')
    .put(List.updateStatus) //update por status
};
