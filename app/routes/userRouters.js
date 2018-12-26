<<<<<<< HEAD
'use strict';

var md_auth = require('../middlewares/authenticated');

module.exports = function(app) {
  var List = require('../controllers/userController');

app.get('/pruebaToken', md_auth.ensureAuth,List.pruebaToken);

app.route('/register')
    .post(List.saveUser);

app.route('/login')
    .post(List.loginUser);
  
};
=======
'use strict'
var md_auth = require('../middlewares/authenticated')
module.exports = function(app) {
    var userController = require('../controllers/userController')
    app.post('/register',userController.saveUser)
    app.post('/login',userController.loginUser)
}
>>>>>>> 683cb3f82291ffa3ea362d8ee531b9727aee1e2d
