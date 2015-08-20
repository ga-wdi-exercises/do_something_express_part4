var DB = require("../config/connection")
var List = DB.models.List
var Task = DB.models.Task

var lists = [
  {title:"Errands"},
  {title:"Things that are better than WDI"},
  {title:"WDI To-Dos"},
  {title:"Things that are awesome"}
]

var tasks = [
  {content:"Water the plants", listId: 1},
  {content:"Feed the cat", listId: 1},
  {content:"Nothing", listId: 2},
  {content:"Send the WDI instructors a nice card", listId: 3},
  {content:"Me", listId: 4},
  {content:"Self-validation", listId:4}
]

List.bulkCreate(lists).then(function(){
  return Task.bulkCreate(tasks)
})
.then(function(){
  console.log("Seeded successfully! kthxbye");
  process.exit();
});
