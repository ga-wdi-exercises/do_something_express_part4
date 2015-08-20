var DB = require("../config/connection")
var List = DB.models.List
var Task = DB.models.Task

var lists = [
  {title:"Errands"},
  {title:"Things that are better than WDI"},
  {title:"WDI To-Dos"}
]

var tasks = [
  {body:"Water the plants", completed: false},
  {body:"Feed the cat", completed: true},
  {body:"Send the WDI instructors a nice card", completed: false}
]

List.bulkCreate(lists).then(function(){
  return DB.models.List.findAll()
})
.then(function(dblists){
  var l, list, t, task, output = [];
  for(l = 0; l < lists.length; l++){
    list = lists[l];
    for(t = 0; t < tasks.length; t++){
      task = tasks[t];
      task.ListId = list.id;
      output.push(task);
    }
  }
  return DB.models.Task.bulkCreate(output);
})
.then(function(){
  console.log("Seeded successfully!");
  process.exit();
});
