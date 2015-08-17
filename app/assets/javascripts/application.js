$(document).ready(function(){

  function Task(params){
    if(params) this.data = params;
    this.render();
  }
  Task.prototype = {
    render: function(){
      this.view = "<li class='task'><input type='hidden' name='listId' value='" + this.data.listId + "' /><textarea name='content'>" + (this.data.content || "") + "</textarea>";
      if(!this.data.id){
        this.view += "<button type='button' class='create'>Create</button>";
      }else{
        this.view += "<button type='button' class='save'>Save</button><button type='button' class='delete'>Delete</button>";
      }
      this.view += "</li>";
    }
  }

  function List(params, tasksHtml){
    if(params){
      this.data = params;
      this.tasksHtml = tasksHtml;
      this.render();
    }
  }
  List.prototype = {
    render: function(){
      this.view = "<div class='list'><input type='text' name='title' value='" + (this.data.title || "") + "' />";
      if(!this.data.id){
        this.view += "<button type='button' class='create'>Create</button>";
      }else{
        this.view += "<button type='button' class='save'>Save</button><button type='button' class='delete'>Delete</button>";
        this.view += "<ul>" + this.tasksHtml + "</ul>";
      }
      this.view += "</div>";
    }
  }

  var lists;
  var tasks;
  $.ajax({
    url: "/lists",
    method: "get"
  }).then(function(response){
    lists = response;
    lists.push({title: ""});
    return $.ajax({
      url: "/tasks",
      method: "get"
    })
  }).then(function(response){
    var tasksHtml, task, list;
    var listsHtml = "";
    tasks = response;
    for(var l = 0; l < lists.length; l++){
      list = lists[l];
      tasksHtml = "";
      tasks.push({listId: list.id, content: ""});
      for(var t = 0; t < tasks.length; t++){
        if(list.id == 0) break;
        task = tasks[t];
        if(task.listId != list.id) continue;
        tasksHtml += new Task(task).view;
      }
      listsHtml += new List(list, tasksHtml).view;
    }
    $("main").html(listsHtml);

    $("list .save").on("click", function(){
      var params = {title: $(this).prev("[name=title]").val()}
      return $.ajax({
        method: "post",
        contentType: "application/json",
        url: "/lists",
        data: JSON.stringify(data)
      });
    });

    // $(".create").on("click", function(){
    //   var params = {};
    //   $(this).siblings("[name]").each(function(){
    //     params[this.name] = this.value;
    //   });
    //   dbRequest("post", "/" + $(this).parent().attr("class") + "s", params).done(function(response){
    //     location.reload();
    //   });
    // });
    //
    // $(".save").on("click", function(){
    //   var params = {};
    //   $(this).siblings("[name]").each(function(){
    //     params[this.name] = this.value;
    //   });
    //   $.ajax({
    //     method: "patch"
    //   })
    // });

  });

});
