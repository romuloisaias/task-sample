'use strict'

var jwt = require('jwt-simple')
var secret = 'SECRET_KEY_FOR_MY_TOKEN_BUILDER_26122018'


exports.CreateToken = function(user){

    var thisMoment = Date.now()

    var payload = {
       sub: user._id,
       name: user.name,
       surname: user.surname,
       email:user.email,
       role: user.role,
       image: user.image,
       iat: thisMoment,
       exp: (thisMoment+280000)
    };

    return jwt.encode(payload, secret)
    
}
