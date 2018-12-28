"use strict"

//DECLARATION OF VARIABLES
var Task = require("../models/taskModel")
var config = require("../config")

//REDIRECT TO MAIN PAGE
function InitPage(req, res) {
  res.status(308).redirect("/tasks")
}
//LIST ALL REGISTER
function ListAll(req, res) {
  var val = req.params.id
  if (typeof val === "undefined") {
    Task.find({}, function(err, task) {
      if (err) {
        return res.status(500).json(err)
      }
      if (task) {
        res.status(200).json(task)
      } else {
        res.status(404).json({
          msj: "No records"
        })
      }
    })
  } else {
<<<<<<< Updated upstream
    Task.findOne({
      _id: val
    }, function (err, task) {
      if (err) {
        return res.status(500).json(err)
      }
      if (task) {
        res.status(200).json(task)
      } else {
        res.status(404).json({
          "msj": "No records"
        })
=======
    Task.find(
      {
        _id: val
      },
      function(err, task) {
        if (err) {
          return res.status(500).json(err)
        }
        if (task) {
          res.status(200).json(task)
        } else {
          res.status(404).json({
            msj: "No records"
          })
        }
>>>>>>> Stashed changes
      }
    )
  }
}

//CREATE A NEW TASK
function CreateTask(req, res) {
  if (!req.body.status) delete req.body.status
  var newTask = new Task(req.body)
  newTask.save(function(err, task) {
    if (err) {
      return res.status(500).json(err)
    }
    if (task) {
      res.status(200).json(task)
    } else {
      res.status(500).json("Record not saved!")
    }
  })
}

//UPDATE THE STATE, IF IT DOES NOT EXIST, IT WILL LIST AVAILABLE STATUS
function UpdateStatus(req, res) {
  if (!req.params.id)
    res.status(500).json({
      msg: "ID required!"
    })
  Task.findOne(
    {
      _id: req.params.id
    },
    (err, data) => {
      if (err) return res.status(500).json(err)
      if (!data)
        return res.status(404).json({
          msg: "Task not found"
        })
      var normalicedStatus = req.body.status.toLowerCase()
      var alternativeStatusRes = AlternativeStatus(
        normalicedStatus,
        data.status
      )
      if (alternativeStatusRes) {
        return res.status(404).json({
          msg: "Status not found",
          suggestedStatus: alternativeStatusRes
        })
      } else {
        data.status = normalicedStatus
      }
      data.save((err, savedData) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(savedData)
      })
    }
  )
}
//UPGRADES THE FIELDS PROVIDED ALWAYS AND WHEN YOU MEET THE RULES
function UpdateTask(req, res) {
  Task.findOne(
    {
      _id: req.params.id
    },
    (err, data) => {
      if (err) return res.status(500).json(err)
      if (!data)
        return res.status(404).json({
          msg: "Task not found"
        })
      data.title = req.body.title || data.title
      data.description = req.body.description || data.description

      if (req.body.status) {
        var normalicedStatus = req.body.status.toLowerCase()
        if (!AlternativeStatus(normalicedStatus, data.status))
          data.status = normalicedStatus
      }
      data.save((err, savedData) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(savedData)
      })
    }
  )
}

//WILL REMOVE THE TASK THAT CORRESPONDS TO THE ID
function DeleteTask(req, res) {
  Task.deleteOne(
    {
      //borra registro
      _id: req.params.id
    },
    function(err, task) {
      if (err) {
        res.json(err)
      }
      if (task.n > 0) {
        res.status(200).json({
          message: "Record Deleted!"
        })
      }
      if (task.n === 0) {
        res.status(404).json({
          message: "Record Not deleted!"
        })
      }
    }
  )
}

//PAGINATOR WHIT NUMBER OF PAGE, NUMBER OF ELEMENTS AND FILTER BY STATUS
function ListPages(req, res) {
  var numPage = parseInt(req.params.page) || 1
  var regsPerPage = parseInt(req.params.elements) || 3
  var statusFilter = req.body.status
  var skipPage = (numPage - 1) * regsPerPage
  Task.countDocuments().then(function(count) {
    var numPages = parseInt(count / regsPerPage + 1)
  })
  var possibleStatus = config.STATUS
  if (possibleStatus.indexOf(statusFilter) == -1) {
    Task.find({}, function(err, task) {
      var count = task.length
      if (err) {
        return res.status(500).json(err)
      }
      if (task) {
        res.status(200).json(task)
      } else {
        res.status(404).json({
          msj: "Task not found!"
        })
      }
    })
      .skip(skipPage)
      .limit(regsPerPage)
      .lean()
  } else {
    Task.find(
      {
        status: statusFilter
      },
      function(err, task) {
        var count = task.length
        if (err) {
          return res.status(500).json(err)
        }
        if (task) {
          res.status(200).json(task)
        } else {
          res.status(404).json({
            msj: "not found"
          })
        }
      }
    )
      .skip(skipPage)
      .limit(regsPerPage)
      .lean()
  }
}

//FILTER BY TITLE
function SearchByTitle(req, res) {
  var reqTitle = req.params.title
  Task.find(
    {
      title: {
        $regex: reqTitle,
        $options: "i"
      }
    },
    function(err, task) {
      if (err) {
        return res.status(500).json(err)
      }
      if (task) {
        res.status(200).json(task)
      } else {
        res.status(404).json({
          msj: "not found!"
        })
      }
    }
  ).sort({
    title: -1
  })
}

//UPDATES A COLLECTION
function UpdateByIdCollection(req, res) {
  //actualiza una coleccion de documentos por el ID
  //NO TOCAR LAUTARO; ESTO FUNCIONA 27-12-2018
  var ids = req.body.ids
  //var title =req.body.title || task.title
  var status = req.body.status
  //Task.find({_id: {$in: ids}}, function(err, task) { //para buscar por ID
  Task.updateMany(
    {
      _id: {
        $in: ids
      }
    },
    {
      $set: {
        "ids.$[].status": status
      }
    },
    function(err, task) {
      if (err) {
        res.status(500).json(err)
      }
      if (task) {
        res.status(200).json(task)
      } else {
        res.status(404).json({
          msj: "Task not found!"
        })
      }
    }
  )
}

function ListCollection(req, res) {
  var id = req.body.ids
  var statusFilter = req.body.status
  Task.find(
    {
      status: {
        $in: statusFilter
      }
    },
    function(err, task) {
      //Task.updateMany({_id: {$in: id}},{$set:{"status":statusFilter}}, function(err, task) {
      if (err) {
        return res.status(500).json(err)
      }
      if (task) {
        var n = task.n
        var nModified = task.nModified
        return res.status(200).json({
          modified: nModified
        })
      }
      return res.status(404).json({
        msg: "Task not found!"
      })
    }
  )
}

//FUNCTION THAT PROVIDES THE STATE SUGGESTION AVAILABLE
function AlternativeStatus(normalicedNewStatus, currentStatus) {
  var possibleStatus = config.STATUS
  if (possibleStatus.indexOf(normalicedNewStatus) == -1) {
    var diffStatus = possibleStatus.filter(fil => {
      return fil != currentStatus
    })
    return diffStatus
  }
  return null
}

module.exports = {
  InitPage,
  ListAll,
  CreateTask,
  UpdateStatus,
  UpdateTask,
  DeleteTask,
  ListPages,
  SearchByTitle,
  UpdateByIdCollection,
  ListCollection
}
