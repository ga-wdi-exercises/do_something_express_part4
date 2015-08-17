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

  index: function(request, response){
    Task.findAll({
      where: {
        listId: request.params.id
      }
    }).then(sendBack.bind(response));
  },

  create: function(request, response){
    Task.create({
      listId: request.params.id,
      content: request.body.content
    }).then(sendBack.bind(response));
  },

  show: function(request, response){
    Task.findById(request.params.taskId).then(sendBack.bind(response));
  },

  edit: function(request, response){
    Task.findById(request.params.taskId).then(function(task){
      if(!task) return error.call(response, "not found");
      task.updateAttributes(request.body).then(sendBack.bind(response));
    });
  },

  delete: function(request, response){
    Task.findById(request.params.taskId).then(function(task){
      if(!task) return error.call(response, "not found");
      task.destroy().then(sendBack.bind(response));
    });
  }

}
