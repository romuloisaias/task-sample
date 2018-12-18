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
      console.log("list all");
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
      console.log("created");
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

exports.updateStatus = function (req, res){
    var stat = req.body.status.toLowerCase();
    var st = config.STATUS;
    if(st.indexOf(stat) >-1) {
        Task.findOneAndUpdate({_id: req.params.taskId}, {status:stat}, {new: true}, function(err, task) {
        if (err)
        {
          return res.status(500).json(err);
        }
          if(task){
                console.log(task)
                res.status(200).json(task)
          }
      })
    }else{
      res.json({"msj":"status no existente"})
    }
}

exports.updateTask = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) { //encontrar y actualizar
    if (err)
      {
        return res.status(500).json(err);
      }
      if(task)
      {
        res.status(200).json(task);
      }
  });
};

exports.deleteTask = function(req, res) {
  Task.deleteOne({ //borra registro
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      {
        res.json(err);
      }
      if(task.n > 0){
        console.log("deleted: "+ task.n)
        res.status(200).json({ message: 'Borrado exitoso' });
      }
      if(task.n === 0){
        res.json({ message: 'Nada borrado' });
      }
  });
};

exports.listStatusByStat = function(req, res) { //listar todos los registros
  var stats = req.params.stat.toLowerCase();
  console.log(stats+"UNO")
  Task.find({status:stats}, function(err, task) { //aqui find para buscar registro
    if (err){
      return res.status(500).json(err);
    }
    if(task){
      console.log("list all");
      res.status(200).json(task);
    }else{
      res.json({"msj":"no hay registros!"})
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

      res.send(diffStatus)
    }
  })
}