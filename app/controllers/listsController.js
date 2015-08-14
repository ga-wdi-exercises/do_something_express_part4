var List = require("../models/list");

module.exports = {

  index: function(request, response){
    response.send("Hello")
  },

  create: function(request, response){
    List.create(request.body).then(function(db_response){
      response.send(db_response);
    });
  },

  show: function(request, response){

  },

  edit: function(request, response){

  },

  delete: function(request, response){

  }

}
