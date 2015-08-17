$(document).ready(function(){
  var List = DB("lists", "#listTemplate");
  // List.index().always(function(response){
  //   for(var l = 0; l < response.length; l++){
  //     var list = List.new(response[l]);
  //     list.append();
  //     List.all[list.data.id] = list;
  //   }
  // })
  List.view.placeAll().done(function(){
    var blank = List.new();
    blank.view.prepend.call(blank);
  });
});
