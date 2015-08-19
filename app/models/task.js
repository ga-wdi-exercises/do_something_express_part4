var sql = require("../../config/database");
var List = require("./list")

var Task = sql.define("task", {
  content: sql.constructor.TEXT
});
Task.belongsTo(List);
Task.sync();

module.exports = Task;
