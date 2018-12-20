'use strict';
var mongoose = require('mongoose'),
Task = mongoose.model('Tasks');

var config = require('../config')

exports.listAllTasks = function(req, res) { //listar todos los registros
  Task.find({}, function(err, task) { //aqui find para buscar registro
    if (err){
      return res.status(500).json(err);
    }
    if(task){
      res.status(200).json(task);
    }else{
      res.json({"msj":"registro no existente"})
    }
  });
};

exports.createTask = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) { //save para guardar
    if (err)
    {
      return res.status(500).json(err);
    }
    if(task){
      res.status(200).json(task);
    }else{
      res.json("registro no se agregó")
    }
  });
};

exports.readTask = function(req, res) {
  Task.findOne({_id:req.params.taskId}, function(err, task) { //para buscar por ID
    if (err) {
      return res.status(500).json(err);
    }
    if(task){
      return res.status(200).json(task);
    }
    return res.status(404).json({ msg: 'Not found' });
  });
};

function alternativeStatus(normalicedNewStatus, currentStatus){
  var possibleStatus = config.STATUS
  if(possibleStatus.indexOf(normalicedNewStatus) == -1){
    var diffStatus = possibleStatus.filter( fil => { return fil != currentStatus})
    return diffStatus
  }
  return null
}

exports.updateStatus = function (req, res){
  if(!req.params.id) res.status(500).json({msg:'ID requerido'})
  Task.findOne({ _id: req.params.id }, (err, data)=>{
    if(err) return res.status(500).json(err)
    if(!data) return res.status(404).json({msg: 'Task not found'})

    var normalicedStatus = req.body.status.toLowerCase();
    var alternativeStatusRes = alternativeStatus( normalicedStatus, data.status )
    if(alternativeStatusRes){
      return res.status(404).json({msg: 'Status not existent', suggestedStatus: alternativeStatusRes})
    }else{
      data.status = normalicedStatus
    }

    data.save((err, savedData)=>{
      if(err) return res.status(500).json(err)

      return res.status(200).json(savedData)
    })
  })
}

exports.updateTask = function (req, res){
  Task.findOne({ _id: req.params.taskId }, (err, data)=>{
    if(err) return res.status(500).json(err)
    if(!data) return res.status(404).json({msg: 'Task not found'})
    data.title = req.body.title || data.title
    data.description = req.body.description || data.description

    var normalicedStatus = req.body.status.toLowerCase()
    if(!alternativeStatus( normalicedStatus, data.status )) data.status = normalicedStatus

    data.save((err, savedData)=>{
      if(err) return res.status(500).json(err)

      return res.status(200).json(savedData)
    })
  })
}

exports.deleteTask = function(req, res) {
  Task.deleteOne({ //borra registro
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      {
        res.json(err);
      }
      if(task.n > 0){
        res.status(200).json({ message: 'Borrado exitoso' });
      }
      if(task.n === 0){
        res.json({ message: 'Nada borrado' });
      }
  })
}

exports.listStatusByStat = function(req, res) { //listar todos los registros
  var stats = req.params.stat.toLowerCase();
  Task.find({status:stats}, function(err, task) { //aqui find para buscar registro
    if (err){
      return res.status(500).json(err);
    }
    if(task){
      res.status(200).json(task);
    }else{
      res.status(404).json({"msj":"no hay registros!"})
    }
  });
};

exports.listPages = (req, res) => { //paginador
  console.log(req.params.page)
  var numPage = parseInt(req.params.page)
  var skipPage = (numPage-1)*3
  var regsPerPage = 3
  Task.countDocuments()
  .then(function ( count ){
  var numPages = parseInt((count/3)+1);
  });
  //find({ is_active: true },{username:1, personal_info:1})
  Task.find({}, function(err, task) { 
    if (err){
      return res.status(500).json(err);
    }
    if(task){
      res.status(200).json(task);
    }else{
      res.json({"msj":"registro no existente"})
    }
  })
  .skip(skipPage)
  .limit(regsPerPage)
  .lean()
}

exports.initPage = (req, res) => { //aqui una redireccion para si en el futuro hay un mainpage o index
  res.status(308).redirect("/tasks");
}