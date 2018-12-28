"use strict"

var Token = require("../models/tokenModel")
var jwt = require("jwt-simple")
var secret = "SECRET_KEY_FOR_MY_TOKEN_BUILDER_26122018"

exports.EnsureAuth = async function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: "Send token in header"
    })
  }

  try {
    var token = req.headers.authorization.replace(/['"]+/g, "")

    //CHECK IF TOKEN IS BLOCKED
    var result = await Token.find({
      token: token
    })
    if (result[0] != null) {
      return res.status(401).send({
        message: "Token blocked"
      })
    }

    var payload = jwt.decode(token, secret)
    var now = Date.now()
    if (payload.exp < now) {
      return res.status(200).send({
        message: "Token expired"
      })
    }
  } catch (ex) {
    return res.status(401).send({
      message: "Token invalid"
    })
  }
  req.user = payload
  next()
}