'use strict'
var User = require('../models/userModels')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('../services/jwt')

//POST USER DATA
function SaveUser(req,res){

    var params = req.body
    var user = new User()
    

    user.name = params.name
    user.surname = params.surname
    user.nick = params.nick
    user.email = params.email
    user.password = params.password
    user.role = params.role
    user.image = params.image

    if (params.password.length < 6) return res.status(500).send({message:'Password must be at least 6 characters long'})
        
        bcrypt.hash(params.password, null, null,(err,hash)=>{
            user.password = hash        
                user.save((err, userStored)=>{
                  if(err) return res.status(500).send({message:err})
        
                    if(userStored){
                        user.password = undefined
                        res.status(200).send({user:userStored})
                    }else{
                            res.status(409).send({message:'User was not registered'})
                    }
                    
                })
        })

}
        
//USER LOGIN
function LoginUser(req, res){
    var params = req.body
    var email = params.email
    var password = params.password

    User.findOne({email:email}, (err,user)=>{
        if(err) return res.status(500).send({message:'Error'})
        if(user){
            bcrypt.compare(password, user.password, (err,check)=>{        
                if(check){

                    if(params.gettoken){
                        //TOKEN GENERATOR
                        return res.status(200).send({
                            token: jwt.CreateToken(user)
                        })

                    }else{
                        user.password = undefined
                        return res.status(200).send({user})
                    }                    
                }else{
                    return res.status(404).send({message:'Login fail'})
                }
        })
        }else{
            return res.status(404).send({message:'User doesnt exist'})
        }
    })
}
module.exports = {
    SaveUser,
    LoginUser
}