'use strict'

var User = require('../models/userModels');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function PruebaToken(req,res){
    res.status(200).send({
        message:'Hola Mundo'
    })
}

function SaveUser(req,res){
    var params = req.body;

    var user = new User();

    if(params.name && params.surname && params.nick && params.email && params.password){
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;
        
        //Controla usuarios duplicados
        User.find({ $or: [

            {email: user.email.toLowerCase()}

        ]}).exec((err, users)=>{
            if(err) return res.status(500).send({message:'Error en busqueda de usuarios'});
        
            if(users && users.length >= 1){
                return res.status(200).send({message:'EL usuario ya existe'})
            }else{

                bcrypt.hash(params.password, null, null,(err,hash)=>{
                    user.password = hash;
        
                    user.save((err, userStored)=>{
                        if(err) return res.status(500).send({message:'Error al guardar mensaje'});
        
                        if(userStored){
                            user.password = undefined;
                            res.status(200).send({user:userStored});
                        }else{
                            res.status(404).send({message:'No se registro el usuario'});
                        }
                    })
                });

            }
        })

        
    }else{
        res.status(200).send({
            message:'Envia todos los campos necesarios'
        })
    }
}

function LoginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email:email}, (err,user)=>{

        if(err) return res.status(500).send({message:'Error'});

        if(user){
            bcrypt.compare(password, user.password, (err,check)=>{
        
            if(check){

                if(params.gettoken){
                    //generar y devolver token
                       
                    return res.status(200).send({
                        token: jwt.createToken(user)
                    });

                }else{
                    user.password = undefined;
                    return res.status(200).send({user});
                }
                
            }else{
                return res.status(404).send({message:'Logueo fallido'});
            }
        });
        }else{
            return res.status(404).send({message:'El usuario no existe'});
        }
    })
}

module.exports = {
    SaveUser,
    LoginUser,
    PruebaToken
}