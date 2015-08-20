var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname + "/app/assets")));

var listsController = require("./app/controllers/lists");
var tasksController = require("./app/controllers/tasks");

app.get("/", function(request, response){
  response.sendFile(__dirname + "/app/views/index.html");
});

app.get("/routes", function(req, res){
  //shows the routes
  var raw = listsController.stack.concat(tasksController.stack);
  var output = "";
  for(var r = 0; r < raw.length; r++){
    output += raw[r].route.stack[0].method + " " + raw[r].route.path + "\n";
  }
  res.send("<pre>This is just an API! No views yet. It supports these routes:\r" + output + "</pre>");
});

app.use("/", listsController);
app.use("/", tasksController);

// The process.env.PORT is for deployment to Heroku. Don't worry about it! You can have the usual:
/*
app.listen(3000, function(){
*/
app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on port 3000");
});
