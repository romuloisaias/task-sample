'use strict'

<<<<<<< HEAD
var jwt = require('jwt-simple');
var secret = 'clave_secreta_custom';
=======
var jwt = require('jwt-simple')
var secret = 'clave_secreta_custom'
>>>>>>> 683cb3f82291ffa3ea362d8ee531b9727aee1e2d

exports.ensureAuth = function(req, res, next){

    if(!req.headers.authorization){
<<<<<<< HEAD
     return res.status(403).send({message:'enviar token en cabezera'});
    }
    

    try{ 
        var token = req.headers.authorization.replace(/['"]+/g,'');

    var payload = jwt.decode(token, secret);
    var ahora = Date.now();
    if(payload.exp < ahora){
        return res.status(401).send({
                message: 'ERROR Token expirado'  
        });
=======
     return res.status(403).send({message:'enviar token en cabecera'})
    }
    try{ 
        var token = req.headers.authorization.replace(/['"]+/g,'')

    var payload = jwt.decode(token, secret)
    var ahora = Date.now()
    if(payload.exp < ahora){
        return res.status(401).send({
                message: 'ERROR Token expirado'  
        })
>>>>>>> 683cb3f82291ffa3ea362d8ee531b9727aee1e2d
    }
}catch(ex){
    return res.status(404).send({
        message: 'Token invalido'
<<<<<<< HEAD
    });
}

    req.user = payload;

    next();

=======
    })
}
    req.user = payload
    next()
>>>>>>> 683cb3f82291ffa3ea362d8ee531b9727aee1e2d
}
