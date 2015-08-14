var sql = require("../../config/database");
var List = require("../../app/models/list");

List.sync({force: true});
