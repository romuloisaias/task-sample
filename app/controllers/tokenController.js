"use strict"

var Token = require("../models/tokenModel")

//KILL TOKEN
function KillToken(req, res) {
  var token = new Token(req.body)
  token.save(function(err, token) {
    if (err) {
      return res.status(500).json(err)
    }
    if (token) {
      res.status(200).json(token)
    } else {
      res.status(500).json("Record not saved!")
    }
  })
}

module.exports = {
  KillToken
}
