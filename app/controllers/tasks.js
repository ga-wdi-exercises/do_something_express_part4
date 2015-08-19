var express = require("express");
var router = express.Router();
var DB = require("../../config/connection");
var List = DB.models.List;
var Task = DB.models.Task;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/tasks", function(req, res){
  Task.findAll({order: "id"}).then(function(tasks){
    res.json(tasks);
  });
});

router.get("/tasks/:id", function(req, res){
  Task.findById(req.params.taskId).then(function(task){
    res.json(task);
  });
});

router.put("/tasks/:id", function(req, res){
  Task.findById(req.params.taskId).then(function(task){
    if(!task) return error(res, "not found");
    task.updateAttributes(req.body).then(function(task){
      res.json(task);
    });
  });
});

router.delete("/tasks/:id", function(req, res){
  Task.findById(req.params.taskId).then(function(task){
    if(!task) return error(res, "not found");
    task.destroy().then(function(db_res){
      res.json(db_res);
    });
  });
});

router.get("/lists/:listId/tasks", function(req, res){
  List.findById(req.params.listId)
  .then(function(list){
    if(!list) return error(res, "not found");
    return list.getTasks();
  })
  .then(function(tasks){
    res.json(tasks);
  });
});

router.post("/lists/:listId/tasks", function(req, res){
  List.findById(req.params.listId)
  .then(function(list){
    if(!list) return error(res, "not found");
    return list.createTask(req.body);
  })
  .then(function(tasks){
    res.json(tasks);
  });
});

module.exports = router;
