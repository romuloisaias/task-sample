'use strict'
//INCLUDE MONGOOSE LIBRARY
var mongoose = require('mongoose')
var Schema = mongoose.Schema


//SCHEMA
var TaskSchema = new Schema({ 
  title: {
    type: String,
    default: "Sin título"
  },
  description: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "creado",
    enum: ['creado', 'en proceso', 'cerrado']
  }
}, {timestamps: true});
//EXPORT MODEL
module.exports = mongoose.model('Tasks', TaskSchema)