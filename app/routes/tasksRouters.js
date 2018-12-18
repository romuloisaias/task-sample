'use strict';
module.exports = function(app) {
  var List = require('../controllers/tasksController.js');

  app.route('/tasks')
    .get(List.list_all_tasks)
    .post(List.create_a_task);

  app.route('/tasks/:taskId')
    .get(List.read_a_task)
    .put(List.update_a_task)
    .delete(List.delete_a_task);

  app.route('/tasks/status/:taskId')
    .put(List.update_status)
};
