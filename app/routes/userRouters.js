'use strict';

var md_auth = require('../middlewares/authenticated');

module.exports = function(app) {
  var List = require('../controllers/userController');

app.get('/pruebaToken', md_auth.ensureAuth,List.PruebaToken);

app.route('/register')
    .post(List.SaveUser);

app.route('/login')
    .post(List.LoginUser);
  
};