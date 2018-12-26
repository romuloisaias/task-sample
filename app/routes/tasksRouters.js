'use strict'
module.exports = function(app) {
  //INCLUDES CONTROLLER
  var taskController = require('../controllers/tasksController.js')
  
  //INCLUDES MIDDLEWARE AUTHENTICATED
  var md_auth = require('../middlewares/authenticated')

  //REDIRECT TO INIT PAGE
  app.get('/',taskController.initPage)

  //LIST ALL ELEMENTS VIA GET
  app.get('/listAll',taskController.listAll)

  //CREATE NEW TASK VIA POST
  app.post('/tasks',taskController.createTask)

  //LIST TASK WITH PAGINATION VIA GET
  app.get('/tasks/paginator/:page/:elements',taskController.listPages)

  //UPDATE RECODRS VIA PUT
  app.put('/tasks/:id',taskController.updateTask)

  //REMOVE RECODRS VIA DELETE
  app.delete('/tasks/:id',taskController.deleteTask)

  //FIND CONTENT IN TITLE AND LIST TAKS VIA GET
  app.get('/tasks/title/:title',taskController.searchByTitle)

  //LIST ALL BY ID COLLECTION VIA PUT
  app.put('/tasks/updateIds/upDateByIds',taskController.updateByIdCollection)

  //LIST ALL RECORDS WHERE STATUS VIA GET
  app.get('/tasks/status/:id',taskController.listCollection)

  //WILL UPGRADE STATUS, IF NOT EXIST, WILL SUGGESTED AVAILABLE STATUS
  app.put('/tasks/status/:id',taskController.updateStatus)
};
