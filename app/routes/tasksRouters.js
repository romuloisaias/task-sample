'use strict'
module.exports = function(app) {
  //INCLUDES CONTROLLER
  var taskController = require('../controllers/tasksController.js')
  
  //INCLUDES MIDDLEWARE PROTECTION
  var md_auth = require('../middlewares/authenticated')

  //REDIRECT TO INIT PAGE
  app.get('/', md_auth.ensureAuth,taskController.initPage)

  //LIST ALL ELEMENTS
  app.get('/listAll', md_auth.ensureAuth,taskController.listAll)

  //CREATE NEW TASK VIA POST
  app.get('/tasks', md_auth.ensureAuth,taskController.createTask)

  //LIST TASK WITH PAGINATION VIA GET
  app.get('/tasks/paginator/:page/:elements', md_auth.ensureAuth,taskController.listPages)

  app.get('/tasks/:id', md_auth.ensureAuth,taskController.updateTask)

  app.get('/tasks/:id', md_auth.ensureAuth,taskController.deleteTask)

  //FIND CONTENT IN TITLE AND LIST TAKS VIA GET
  app.get('/tasks/title/:title', md_auth.ensureAuth,taskController.searchByTitle)

  //LIST ALL BY ID COLLECTION VIA PUT
  app.put('/tasks/updateIds/upDateByIds', md_auth.ensureAuth,taskController.updateByIdCollection)

  app.route('/tasks/updateIds/upDateByIds/')
    
  app.get('/tasks/status/:id', md_auth.ensureAuth,taskController.listCollection)

  app.put('/tasks/status/:id', md_auth.ensureAuth,taskController.updateStatus)

};
