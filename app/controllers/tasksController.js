'use strict';
var mongoose = require('mongoose'),
Task = mongoose.model('Tasks');
exports.list_all_tasks = function(req, res) { //listar todos los registros
  Task.find({}, function(err, task) { //aqui find para buscar registro
    if (err){
      return res.status(500).json(err);
    }
    if(task){
      console.log("list all");
      res.json(task);
    }else{
      res.send("no hay registros!");
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
      res.json(task);
    }else{
      res.send("registro no se agregó")
    }
  });
};
exports.list_all_tasks = function(req, res) { //listar todos los registros
  Task.find({}, function(err, task) { //aqui find para buscar registro
    if (err){
    }
  });
};
exports.create_status = function (req, res){
  var stat = req.body.status.toLowerCase();
  Task.findById(stat, function(err, task) {
console.log("crea estado");
res.send(stat);
  })
};

exports.update_status = function (req, res){
    var stat = req.body.status.toLowerCase();
    var status = ['creado', 'en proceso', 'cerrado']
    var indice = status.indexOf(stat);
    var elems = status.length
    elems = elems - 1;
    console.log(indice + '-'+elems)
    if(indice >= 0 && indice <= elems)
    {
        Task.findOneAndUpdate({_id: req.params.taskId}, {status:stat}, function(err, task) {
        if (err)
        {
          return res.status(500).json(err);
        }
          if(task){
                console.log(task)
                res.json(task)
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
        res.json(task);
      }
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
      if(task.n > 0){
        console.log("deleted: "+ task.n)
        res.json({ message: 'Borrado exitoso' });
      }
      if(task.n === 0){
        res.json({ message: 'Nada borrado' });
      }
  });
};