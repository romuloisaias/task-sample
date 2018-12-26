'use strict'
module.exports = function(app) {
  var taskController = require('../controllers/tasksController.js')
  var md_auth = require('../middlewares/authenticated');
//API protegida con middleware
 app.get('/listAllTasks', md_auth.ensureAuth,taskController.listAllTasks);
  app.route("/")
    .get(taskController.initPage)

  app.route('/tasks')
    //CREATE NEW TASK VIA POST
    .post(taskController.createTask)

  app.route('/tasks/paginator/:page/:elements')
  //LIST TASK WITH PAGINATION VIA GET
    .get(taskController.listPages)

  app.route('/tasks/:taskId')
    .put(taskController.updateTask) //actualiza estatus (funciona)

    //DELETE TASK VIA DELETE
    .delete(taskController.deleteTask)

  app.route('/tasks/title/:title')

    //FIND CONTENT IN TITLE AND LIST TAKS VIA GET
    .get(taskController.searchByTitle)

    app.route('/tasks/updateIds/upDateByIds/')
    
    //LIST ALL BY ID COLLECTION VIA PUT
    .put(taskController.updateByIdCollection)

  app.route('/tasks/status/:id')
    .get(taskController.listCollection)
    .put(taskController.updateStatus) //update por status
};
