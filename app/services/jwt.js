'use strict'

var jwt = require('jwt-simple');
var secret = 'clave_secreta_custom';


exports.createToken = function(user){

    var ahora = Date.now();

    var payload = {
       sub: user._id,
       name: user.name,
       surname: user.surname,
       email:user.email,
       role: user.role,
       image: user.image,
       iat: ahora,
<<<<<<< HEAD
       exp: (ahora+36000000)
=======
       exp: (ahora+100000)
>>>>>>> 683cb3f82291ffa3ea362d8ee531b9727aee1e2d
    };

    return jwt.encode(payload, secret);
    
}