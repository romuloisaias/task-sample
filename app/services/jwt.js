"use strict"

var jwt = require("jwt-simple")
var secret = "SECRET_KEY_FOR_MY_TOKEN_BUILDER_26122018"

function CreateToken(user) {
  var now = Date.now()

  var payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: now,
    exp: now + 1000000
  }

  return jwt.encode(payload, secret)
}

module.exports = {
  CreateToken
}
