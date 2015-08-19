var express = require("express");
var router = express.Router();
var DB = require("../../config/connection");
var List = DB.models.List;

function error(response, message){
  response.status(500);
  response.json({error: message})
}

router.get("/lists", function(req, res){
  List.findAll({order: "id"}).then(function(lists){
    res.json(lists);
  });
});

router.post("/lists", function(req, res){
  List.create(req.body).then(function(list){
    res.json(list);
  });
});

router.get("/lists/:id", function(req, res){
  List.findById(req.params.id).then(function(list){
    res.json(list);
  });
});

router.put("/lists/:id", function(req, res){
  List.findById(req.params.id)
  .then(function(list){
    if(!list) return error(res, "not found");
    return list.updateAttributes(req.body);
  })
  .then(function(list){
    res.json(list);
  });
});

router.delete("/lists/:id", function(req, res){
  List.findById(req.params.id)
  .then(function(list){
    if(!list) return error(res, "not found");
    return list.destroy()
  })
  .then(function(list){
    res.json(list)
  });
});

module.exports = router;
