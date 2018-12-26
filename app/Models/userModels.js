'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var validate = require('mongoose-validator')
 
var nameValidator = [
  validate({
    validator: 'isEmail',
    message: 'Por favor envia email',
  }),
]

var UserSchema = Schema ({
    name: { type: String, required: true},
    surname: { type: String, required: true },
    nick:{ type: String, required: true},
    email: { type: String, required: true, validate: nameValidator },
    password:{ type: String, required: true },
    role:String,
    image:String
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)