'use strict'

var jwt = require('jwt-simple')
var secret = 'clave_secreta_custom'

exports.ensureAuth = function(req, res, next){

    if(!req.headers.authorization){
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
    }
}catch(ex){
    return res.status(404).send({
        message: 'Token invalido'
    })
}
    req.user = payload
    next()
}
