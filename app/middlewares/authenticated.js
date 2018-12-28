"use strict"

var jwt = require("jwt-simple")
var secret = "SECRET_KEY_FOR_MY_TOKEN_BUILDER_26122018"

exports.EnsureAuth = function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Send token in header" })
  }
  try {
    var token = req.headers.authorization.replace(/['"]+/g, "")

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
