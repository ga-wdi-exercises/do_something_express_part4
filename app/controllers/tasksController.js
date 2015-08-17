var Task = require("../models/task");

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

  all: function(request, response){
    Task.findAll({order: "id"}).then(function(db_response){
      response.send(db_response);
    });
  },

  index: function(request, response){
    Task.findAll({
      where: {
        listId: request.params.id
      },
      order: "id"
    }).then(function(db_response){
      response.send(db_response);
    });
  },

  create: function(request, response){
    Task.create({
      listId: request.params.id,
      content: request.body.content
    }).then(function(db_response){
      response.send(db_response);
    });
  },

  show: function(request, response){
    Task.findById(request.params.taskId).then(function(db_response){
      response.send(db_response);
    });
  },

  edit: function(request, response){
    Task.findById(request.params.taskId).then(function(task){
      if(!task) return error.call(response, "not found");
      task.updateAttributes(request.body).then(function(db_response){
        response.send(db_response);
      });
    });
  },

  delete: function(request, response){
    Task.findById(request.params.taskId).then(function(task){
      if(!task) return error.call(response, "not found");
      task.destroy().then(function(db_response){
        response.send(db_response);
      });
    });
  }

}
