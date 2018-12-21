'use strict'
module.exports = function(app) {
  var taskController = require('../controllers/tasksController.js')
  
  app.route("/")
    .get(taskController.initPage)

  app.route('/tasks')
    //CREATE NEW TASK VIA POST
    .post(taskController.createTask)

  app.route('/tasks/paginator/:page/:elements')
  //LIST TASK WITH PAGINATION VIA GET
    .get(taskController.listPages)

  app.route('/tasks/:id')
    //UPDATE TASK VIA PUT
    .put(taskController.updateTask)

    //DELETE TASK VIA DELETE
    .delete(taskController.deleteTask)

  app.route('/tasks/title/:title')

    //FIND CONTENT IN TITLE AND LIST TAKS VIA GET
    .get(taskController.searchByTitle)

    app.route('/tasks/updateIds/upDateByIds/')
    
    //LIST ALL BY ID COLLECTION VIA PUT
    .put(taskController.updateByIdCollection)

  app.route('/tasks/status/:id')
    
    //WILL UPGRADE STATUS IN CASE OF ERROR, WILL SUGGESTED AVAILABLE STATUS
    .put(taskController.updateStatus)
};
