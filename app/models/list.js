var sql = require("../../config/database");

var List = sql.define("list", {
  title: {
    type: sql.constructor.STRING
  }
});

module.exports = List;
