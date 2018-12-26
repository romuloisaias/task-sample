'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

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
    enum: ['created', 'in process', 'closed']
  }
}, {timestamps: true});

module.exports = mongoose.model('Tasks', TaskSchema) //el esquema se llama Tasks