//conector mongodb
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose'); /************ */
var Schema = mongoose.Schema;/************* */
var url = "mongodb://localhost:27017/Task";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

var taskSchema = new Schema({
    title: { type: String, default: 'Sin título' },
    description: { type: String}
});
console.log("Schema created!");
module.exports = mongoose.model('Tasks', taskSchema);