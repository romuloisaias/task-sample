"use strict"

var User = require("../models/userModel")
var bcrypt = require("bcrypt-nodejs")
var jwt = require("../services/jwt")

//POST USER DATA
function SaveUser(req, res) {
  var params = req.body
  var user = new User()

  user.name = params.name
  user.surname = params.surname
  user.nick = params.nick
  user.email = params.email
  user.role = params.role
  user.image = params.image
  user.enabled = params.enabled

  if (params.password.length < 6)
    return res
      .status(500)
      .send({ message: "Password must be at least 6 characters long" })

  bcrypt.hash(params.password, null, null, (err, hash) => {
    user.password = hash
    user.save((err, userStored) => {
      if (err) return res.status(500).send({ message: err })
      if (userStored) {
        var resuser = {
          _id: user._id,
          email: user.email,
          nick: user.nick,
          name: user.name,
          role: user.role,
          token: jwt.CreateToken(user)
        }
        res.status(200).send(resuser)
      } else {
        res.status(409).send({ message: "User was not registered" })
      }
    })
  })
}

//USER LOGIN
function LoginUser(req, res) {
  var params = req.body
  var email = params.email
  var password = params.password

  User.findOne({ email: email }, (err, user) => {
    if (err) return res.status(500).send({ message: "Error" })
    if (user) {
      bcrypt.compare(password, user.password, (err, check) => {
        if (check) {
          if (params.gettoken) {
            //TOKEN GENERATOR
            return res.status(200).send({
              token: jwt.CreateToken(user)
            })
          } else {
            user.password = undefined
            return res.status(200).send({ user })
          }
        } else {
          return res.status(401).send({ message: "Login fail" })
        }
      })
    } else {
      return res.status(401).send({ message: "Login fail" })
    }
  })
}

//USER UPDATE
function UpdateUser(req, res) {
  var params = req.body
  User.findByIdAndUpdate(params._id, params, { new: true }, (err, user) => {
    if (err) return res.status(500).send(err)
    return res.send(user)
  })
}

//FIND USER BY ROLE
function FindByRole(req, res) {
  var params = req.body
  User.find({ role: params.role }, (err, user) => {
    if (err) return res.status(502).send(err)
    return res.status(200).send(user)
  })
}

//FIND USER BY ID
function FindById(req, res) {
  var params = req.body
  User.find({ role: params._id }, (err, user) => {
    if (err) return res.status(502).send(err)
    return res.status(200).send(user)
  })
}

//LOGOUT USER
function LogOut(req, res) {}

//AGGREGATE TESTER
function AggregateTester(req, res) {
  /*User.find({ role: "ROLE_USER" }, (err, user) => {
    if (err) return res.status(200).send(err)
    return res.status(200).send(user)
  })*/
  User.aggregate([{ $match: {} }, { $group: { _id: "$role" } }], function(
    err,
    result
  ) {
    if (err) return res.status(502).send(err)
    return res.status(200).send(result)
  })
}

module.exports = {
  SaveUser,
  LoginUser,
  UpdateUser,
  FindByRole,
  FindById,
  LogOut,
  AggregateTester
}
