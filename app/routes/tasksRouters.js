"use strict"

//INCLUDES TASK CONTROLLER
var taskController = require("../controllers/tasksController.js")

//INCLUDES MIDDLEWARE AUTHENTICATED
var md_auth = require("../middlewares/authenticated")

module.exports = function (app) {
  //REDIRECT TO INIT PAGE
  app.get("/", md_auth.EnsureAuth, taskController.InitPage)
  //LIST TASK WITH PAGINATION VIA GET
  app.get("/tasks/:page/:elements", md_auth.EnsureAuth, taskController.ListPages)
  //LIST ALL ELEMENTS VIA GET
  app.get("/tasks", md_auth.EnsureAuth, taskController.ListAll)
  app.get("/tasks/:id", md_auth.EnsureAuth, taskController.ListAll)

  //CREATE NEW TASK VIA POST
  app.post("/tasks", md_auth.EnsureAuth, taskController.CreateTask)



  //UPDATE RECODRS VIA PUT
  app.put("/tasks/:id", md_auth.EnsureAuth, taskController.UpdateTask)

  //REMOVE RECODRS VIA DELETE
  app.delete("/tasks/:id", md_auth.EnsureAuth, taskController.DeleteTask)

  //FIND CONTENT IN TITLE AND LIST TAKS VIA GET
  app.get(
    "/tasks/title/:title",
    md_auth.EnsureAuth,
    taskController.SearchByTitle
  )

  //LIST ALL BY ID COLLECTION VIA PUT
  app.put(
    "/tasks/updateIds/upDateByIds",
    md_auth.EnsureAuth,
    taskController.UpdateByIdCollection
  )

  //LIST ALL RECORDS WHERE STATUS VIA GET
  app.get(
    "/tasks/status/:id",
    md_auth.EnsureAuth,
    taskController.ListCollection
  )

  //WILL UPGRADE STATUS, IF NOT EXIST, WILL SUGGESTED AVAILABLE STATUS
  app.put("/tasks/status/:id", md_auth.EnsureAuth, taskController.UpdateStatus)
}