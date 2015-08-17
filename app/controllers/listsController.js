var List = require("../models/list");

function sendBack(db_response){
  this.send(db_response);
}

function error(message){
  this.status(500);
  this.send(JSON.stringify({
    error: message
  }))
}

module.exports = {

  index: function(request, response){
    List.findAll().then(sendBack.bind(response));
  },

  create: function(request, response){
    List.create(request.body).then(sendBack.bind(response));
  },

  show: function(request, response){
    List.findById(request.params.id).then(sendBack.bind(response));
  },

  edit: function(request, response){
    List.findById(request.params.id).then(function(list){
      if(!list) return error.call(response, "not found");
      list.updateAttributes(request.body).then(sendBack.bind(response));
    })
  },

  delete: function(request, response){
    List.findById(request.params.id).then(function(list){
      if(!list) return error.call(response, "not found");
      list.destroy().then(sendBack.bind(response));
    })
  }

}
