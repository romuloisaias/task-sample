'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) { //aqui find para buscar registro
    if (err){
      res.send(err);
    }
    console.log("list all");
    res.json(task);
  });
};




exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) { //save para guardar
    if (err)
    {
      res.send(err);
    }
    console.log("created");
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) { //para buscar por ID
    if (err)
    {
      res.send(err);
    }
    if(task){
      console.log("found!")
      res.json(task);
    }else{
      res.send("no existe");
    }  
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) { //encontrar y actualizar
    if (err)
      {
        res.send(err);
      }
      console.log("updated")
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.deleteOne({ //borra registro
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      {
        res.send(err);
      }
      console.log("deleted!")
    res.json({ message: 'Borrado exitoso' });
  });
};

