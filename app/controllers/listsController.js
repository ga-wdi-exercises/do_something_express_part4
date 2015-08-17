var List = require("../models/list");

function error(message){
  this.status(500);
  this.send(JSON.stringify({
    error: message
  }))
}

module.exports = {

  index: function(request, response){
    List.findAll({order: "id"}).then(function(db_response){
      response.send(db_response);
    });
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
      if(!list) return error.call(response, "not found");
      list.updateAttributes(request.body).then(function(db_response){
        response.send(db_response);
      });
    })
  },

  delete: function(request, response){
    List.findById(request.params.id).then(function(list){
      if(!list) return error.call(response, "not found");
      list.destroy().then(function(db_response){
        response.send(db_response)
      });
    })
  }

}
