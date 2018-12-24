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
       exp: (ahora+100000)
    };

    return jwt.encode(payload, secret);
    
}