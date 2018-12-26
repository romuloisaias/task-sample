'use strict'
module.exports = function(app) {
  //INCLUDES CONTROLLER
  var taskController = require('../controllers/tasksController.js')
  
  //INCLUDES MIDDLEWARE AUTHENTICATED
  var md_auth = require('../middlewares/authenticated')

  //REDIRECT TO INIT PAGE
  app.get('/',taskController.initPage)

  //LIST ALL ELEMENTS VIA GET
  app.get('/listAll',md_auth.EnsureAuth,taskController.listAll)

  //CREATE NEW TASK VIA POST
  app.post('/tasks',md_auth.EnsureAuth,taskController.createTask)

  //LIST TASK WITH PAGINATION VIA GET
  app.get('/tasks/paginator/:page/:elements',md_auth.EnsureAuth,taskController.listPages)

  //UPDATE RECODRS VIA PUT
  app.put('/tasks/:id',md_auth.EnsureAuth,taskController.updateTask)

  //REMOVE RECODRS VIA DELETE
  app.delete('/tasks/:id',md_auth.EnsureAuth,taskController.deleteTask)

  //FIND CONTENT IN TITLE AND LIST TAKS VIA GET
  app.get('/tasks/title/:title',md_auth.EnsureAuth,taskController.searchByTitle)

  //LIST ALL BY ID COLLECTION VIA PUT
  app.put('/tasks/updateIds/upDateByIds',md_auth.EnsureAuth,taskController.updateByIdCollection)

  //LIST ALL RECORDS WHERE STATUS VIA GET
  app.get('/tasks/status/:id',md_auth.EnsureAuth,taskController.listCollection)

  //WILL UPGRADE STATUS, IF NOT EXIST, WILL SUGGESTED AVAILABLE STATUS
  app.put('/tasks/status/:id',md_auth.EnsureAuth,taskController.updateStatus)
};
