var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use("/app", express.static(path.join(__dirname + "/app")));

var listsController = require("./app/controllers/listsController");

app.get("/", function(request, response){
  response.sendFile(__dirname + "/app/views/index.html");
});

app.get("/lists", listsController.index);

app.post("/lists", listsController.create);

app.get("/lists/:id", function(request, response){
  // Show list
});

app.patch("/lists/:id", function(requst, response){
  // Update list
});

app.delete("/lists/:id", function(request, response){
  // Delete list
});

app.post("/lists/:id/tasks", function(request, response){
  // Create task
});

app.get("/lists/:id/tasks/:task_id", function(request, response){
  // Get task
});

app.patch("/lists/:id/tasks/:task_id", function(request, response){
  // Update task
});

app.delete("/lists/:id/tasks/:task_id", function(request, response){
  // Delete task
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
