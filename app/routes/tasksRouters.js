'use strict';
module.exports = function(app) {
  var List = require('../controllers/tasksController.js');

  app.route('/tasks')
    .get(List.listAllTasks)
    .post(List.createTask);

  app.route('/tasks/:taskId')
    .get(List.readTask)
    .put(List.updateTask)
    .delete(List.deleteTask);

  app.route('/tasks/status/:taskId')
    .put(List.updateStatus)

  app.route('/tasks/status/:stat')
    .get(List.listStatusByStat)

    app.route('/tasks/listAllByStatus/:id')
    .get(List.listAllByStatus)
};
