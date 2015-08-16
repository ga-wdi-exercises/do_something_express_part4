var List = require("../models/list");

function sendBack(db_response){
  this.send(db_response);
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
      list.updateAttributes(request.body).then(sendBack.bind(response));
    })
  },

  delete: function(request, response){
    List.findById(request.params.id).then(function(list){
      list.destroy().then(sendBack.bind(response));
    })
  }

}
