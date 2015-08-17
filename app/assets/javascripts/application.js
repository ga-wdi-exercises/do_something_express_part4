var Task;
var List;
$(document).ready(function(){
  //Task = DB("task", "/tasks", ".task");
  List = DB("list", "/lists", ".list");

  List.placeAll().done(function(){
    List.place(null, "front");
  });
});
