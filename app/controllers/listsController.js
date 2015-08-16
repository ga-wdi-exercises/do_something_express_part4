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
    List.findById(request.params.id).then(function(db_response){
      response.send(db_response);
    });
  },

  edit: function(request, response){
    List.findById(request.params.id).then(function(list){
      list.updateAttributes(request.body).then(function(db_response){
        response.send(db_response);
      });
    })
  },

  delete: function(request, response){
    List.findById(request.params.id).then(function(list){
      list.destroy().then(function(db_response){
        response.send(db_response);
      });
    })
  }

}
