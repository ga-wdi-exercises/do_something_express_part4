var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use("/app", express.static(path.join(__dirname + "/app")));

var listsController = require("./app/controllers/listsController");
var tasksController = require("./app/controllers/tasksController");

app.get("/", function(request, response){
  response.sendFile(__dirname + "/app/views/index.html");
});

app.get("/lists", listsController.index);
app.post("/lists", listsController.create);
app.get("/lists/:id", listsController.show);
app.patch("/lists/:id", listsController.edit);
app.delete("/lists/:id", listsController.delete);

app.post("/lists/:id/tasks", tasksController.create);
app.get("/lists/:id/tasks/:task_id", tasksController.show);
app.patch("/lists/:id/tasks/:task_id", tasksController.edit);
app.delete("/lists/:id/tasks/:task_id", tasksController.delete);

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
