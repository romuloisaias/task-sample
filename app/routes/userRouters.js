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