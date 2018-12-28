"use strict"

//INCLUDES USER CONTROLLER
var userController = require("../controllers/userController")

//INCLUDES MIDDLEWARE AUTHENTICATED
var md_auth = require("../middlewares/authenticated")

module.exports = function(app) {
  //POST USER DATA
  app.post("/register", userController.SaveUser)

  //USER LOGIN
  app.post("/login", userController.LoginUser)

  //USER UPDATE
  app.post("/update", userController.UpdateUser)

  //USER FIND BY ROLE
  app.post("/findbyrole", userController.FindByRole)
}
