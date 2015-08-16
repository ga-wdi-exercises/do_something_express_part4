var sql = require("../../config/database");

var List = sql.define("list", {
  title: sql.constructor.STRING
});

List.sync();

module.exports = List;
