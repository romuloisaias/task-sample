'use strict'

// LIBRARY IMPORT
var mongoose = require('mongoose')
var validate = require('mongoose-validator')
var Schema = mongoose.Schema

// VALIDATORS DEFINITION
var mailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Not valid email',
  }),
]

var pwdValidator = [
  validate({
    validator: 'isLength',
    arguments: [6, 50],
    message: 'Password must be at least 6 characters long',
  })
]

var nickValidator = [
  validate({
    validator: 'isLength',
    arguments: [6, 50],
    message: 'Nickname must be at least 6 characters long',
  })
]

// SCHEMA DEFINITION
var UserSchema = Schema ({
    name: { type: String, required: true},
    surname: { type: String, required: true },
    nick:{ type: String, required: true, validate: nickValidator },
    email: { type: String, required: true, validate: mailValidator },
    password:{ type: String, required: true, validate: pwdValidator  },
    role:String,
    image:String
}, {timestamps: true})

// EXPORT SCHEMA
module.exports = mongoose.model('User', UserSchema)