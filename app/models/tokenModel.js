"use strict"

// LIBRARY IMPORT
var mongoose = require("mongoose")
var Schema = mongoose.Schema

// SCHEMA DEFINITION
var TokenSchema = Schema(
  {
    token: { type: String, required: true }
  },
  { timestamps: true }
)

// EXPORT SCHEMA
module.exports = mongoose.model("Token", TokenSchema)
