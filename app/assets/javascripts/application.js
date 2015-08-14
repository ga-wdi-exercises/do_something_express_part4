$(document).ready(function(){

  $.ajax({
    url: "./lists"
  }).done(function(response){
    console.dir(response);
  })

});
