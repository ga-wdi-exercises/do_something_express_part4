var Task;
var List;
$(document).ready(function(){
  List = DB("list", "/lists", ".list");
  List.placeAll().done(function(){
    var list;
    List.place(null, "front");
    console.dir([List, List.all[32]]);
    for(var listNum in List.all){
      list = List.all[listNum];
      list.tasks = DB("task", "/lists/" + list.data.id + "/tasks", list.el.find(".task"));
      list.tasks.placeAll();
      list.tasks.place(null, "front");
    }
  });
});
