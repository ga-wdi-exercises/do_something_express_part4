var Task;
var List;
$(document).ready(function(){
  Task = DB("task", "/tasks", "#taskTemplate");
  List = DB("list", "/lists", "#listTemplate");

  List.placeAll().done(function(){
    List.place(null, "front");
  });
});
