"use strict"

//INCLUDES TOKEN CONTROLLER
var tokenController = require("../controllers/tokenController")

//INCLUDES MIDDLEWARE AUTHENTICATED
var md_auth = require("../middlewares/authenticated")

module.exports = function(app) {
  app.post("/killtoken", md_auth.EnsureAuth, tokenController.KillToken)
}
