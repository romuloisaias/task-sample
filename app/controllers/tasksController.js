'use strict';
var mongoose = require('mongoose')
var Task = mongoose.model('Tasks')
var config = require('../config')

exports.listAllTasks = function(req, res) { //listar todos los registros
  Task.find({}, function(err, task) { //aqui find para buscar registro
    if (err){
      return res.status(500).json(err);
    }
    if(task){
      res.status(200).json(task);
    }else{
      res.status(404).json({"msj":"registro no existente"})
    }
  })
}

exports.createTask = function(req, res) {
  var newTask = new Task(req.body);
  newTask.save(function(err, task) { //save para guardar
    if (err)
    {
      return res.status(500).json(err);
    }
    if(task){
      res.status(200).json(task);
    }else{
      res.status(500).json("registro no se agregó")
    }
  })
}

exports.readTask = function(req, res) {
  Task.findOne({_id:req.params.id}, function(err, task) { //para buscar por ID
    if (err) {
      return res.status(500).json(err);
    }
    if(task){
      return res.status(200).json(task);
    }
    return res.status(404).json({ msg: 'Registro no encontrado!' });
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
  Task.findOne({ _id: req.params.id }, (err, data)=>{
    if(err) return res.status(500).json(err)
    if(!data) return res.status(404).json({msg: 'Task not found'})
    data.title = req.body.title || data.title
    data.description = req.body.description || data.description

    if(req.body.status){
      var normalicedStatus = req.body.status.toLowerCase()
      if(!alternativeStatus( normalicedStatus, data.status )) data.status = normalicedStatus

      data.save((err, savedData)=>{
        if(err) return res.status(500).json(err)

        return res.status(200).json(savedData)
      })
    }else{
      data.status = data.status
      data.save((err, savedData)=>{
        if(err) return res.status(500).json(err)

        return res.status(200).json(savedData)
      })
    }
  })
}

exports.deleteTask = function(req, res) {
  console.log(req.params.taskId)
  Task.deleteOne({ //borra registro
    _id: req.params.id
  }, function(err, task) {
    if (err)
      {
        res.json(err);
      }
      if(task.n > 0){
        res.status(200).json({ message: 'Borrado exitoso' });
      }
      if(task.n === 0){
        res.status(404).json({ message: 'Nada borrado' });
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

exports.listAllByStatus = (req,res) => {
  if(!req.params.id) res.status(500).json({msg:'ID requerido'})
  Task.findOne({ _id: req.params.id }, (err, data)=>{
    if(err) return res.status(500).json(err)
    if(data){
      var possibleStatus = config.STATUS
      var currentStatus = data.status
      var diffStatus = possibleStatus.filter( fil => { return fil != currentStatus})

      res.status(200).json(diffStatus)
    }
  })
};

exports.listPages = (req, res) => { //paginador con numero de pag, regs por pag, y filtro por status

  var numPage = parseInt(req.params.page)
  var regsPerPage = parseInt(req.params.elems)
  var st = req.body.status
  var skipPage = (numPage-1)*regsPerPage
  Task.countDocuments()
  .then(function(count){
  var numPages = parseInt((count/regsPerPage)+1);
  });
  console.log(st)
  if(typeof st !== "undefined"){
    Task.find({"status":st}, function(err, task) { 
      var count = task.length;
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
  }else{
    Task.find({}, function(err, task) { 
      var count = task.length;
      if (err){
        return res.status(500).json(err);
      }
      if(task){
        console.log(task)
        res.status(200).json(task);
      }else{
        res.json({"msj":"registro no existente"})
      }
    })
    .skip(skipPage)
    .limit(regsPerPage)
    .lean()
  }
}

exports.initPage = (req, res) => { //aqui una redireccion para si en el futuro hay un mainpage o index
  res.status(308).redirect("/tasks");
}

exports.searchByTitle = (req, res) => {
  var reqTitle = req.params.tit
   Task.find({"title":{ $regex: reqTitle,$options:'i' }}, function(err, task) { 
    if (err){
      return res.status(500).json(err);
    }
    if(task){
      res.status(200).json(task);
    }else{
      res.json({"msj":"registro no existente"})
    }
  }).sort({'title':-1})
}
exports.updateByIdCollection = (req, res) => {
  var ids = req.body._id
  var title =req.body.title || task.title
    var description =req.body.description || task.description
  Task.updateMany({_id : ids},{$set:description in ids}, function(err, task) {
    if (err){
      console.log("error")
      res.status(500).json(err);
    }
    if(task){
      console.log("resultado")
      res.status(200).json(task);
    }else{
      res.status(404).json({"msj":"registro no existente"})
    }
  })
}
exports.listCollection = (req, res) => {

  var id = req.body.ids
  var st = req.body.status
  Task.updateMany({_id: {$in: id}},{$set:{"status":st}}, function(err, task) {
  //Task.find({_id: {$in: id}}, function(err, task) { //para buscar multiples por ID
    if (err) {
      return res.status(500).json(err);
    }
    if(task){
      var n = task.n
      var nModified = task.nModified

      return res.status(200).json(task);
    }
    return res.status(404).json({ msg: 'Registro no encontrado!' });
  });
  
}