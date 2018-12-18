'use strict';
var mongoose = require('mongoose'),
Task = mongoose.model('Tasks');

var config = require('../config')

exports.list_all_tasks = function(req, res) { //listar todos los registros
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

exports.create_a_task = function(req, res) {
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

exports.read_a_task = function(req, res) {
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

exports.update_status = function (req, res){
    var stat = req.body.status.toLowerCase();
    //var status = ['creado', 'en proceso', 'cerrado']
    var st = config.STATUS;
    /*var found = st.find(function(stat) {
      console.log("encontró "+stat)
    });*/
    //console.log(found)
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

exports.update_a_task = function(req, res) {
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

exports.delete_a_task = function(req, res) {
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

exports.list_status_by_stat = function(req, res) { //listar todos los registros
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

exports.ListAllByStatus = (req,res) => {
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