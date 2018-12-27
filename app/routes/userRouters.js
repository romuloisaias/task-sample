'use strict'
var md_auth = require('../middlewares/authenticated')
module.exports = function(app) {
    var userController = require('../controllers/userController')
    
    //POST USER DATA 
    app.post('/register',userController.saveUser)

    //USER LOGIN
    app.post('/login',userController.loginUser)
}
