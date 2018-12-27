'use strict'

// LIBRARY IMPORT
var mongoose = require('mongoose')
var validate = require('mongoose-validator')
var Schema = mongoose.Schema

// VALIDATORS DEFINITION

var validateLength = function(minLength, maxLength) {
  minLength = minLength;
  maxLength = maxLength;
  return {
    validator : function(value) {
      if (value === undefined) return true;
      return value.length >= minLength && value.length <= maxLength;
    },
    message : 'Field must be between '+ minLength +' and '+ maxLength +' characters long.'
  }
}

// SCHEMA DEFINITION
var UserSchema = Schema ({
    name: { type: String, required: true},
    surname: { type: String, required: true },
    nick:{ type: String, required: true, validate: validateLength(6, 20) },
    email: { type: String, required: true },
    password:{ type: String, required: true },
    role:String,
    image:String
}, {timestamps: true})

// EXPORT SCHEMA
module.exports = mongoose.model('User', UserSchema)