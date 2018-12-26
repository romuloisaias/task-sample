'use strict'
var md_auth = require('../middlewares/authenticated')
module.exports = function(app) {
    var userController = require('../controllers/userController')
    app.post('/register',userController.saveUser)
    app.post('/login',userController.loginUser)
}