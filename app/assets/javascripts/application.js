$(document).ready(function(){

  function ajax(method, url, data){
    return $.ajax({
      contentType: "application/json",
      data: data ? JSON.stringify(data) : null,
      url: url,
      method: method
    })
  }

  var List = (function(){
    var template = $("#listTemplate"),
        container = $("#lists");
    return {
      prototype: {
        show: function(id){
          return ajax("get", "lists/" + id);
        },
        create: function(title){
          return ajax("post", "/lists", {title: title});
        },
        edit: function(id, title){
          return ajax("patch", "/lists/" + id, {title: title});
        },
        delete: function(id){
          return ajax("delete", "/lists/" + id);
        },
        add: function(){
          $(template.html()).prependTo(container);
        }
      },
      create: function(){
        return Object.create(this.prototype);
      }
    }
  }())

  $("#listTemplate").remove();
  List.prototype.add();

  var Task = (function(){
    var template = $("#taskTemplate").attr("id", null).addClass("new");
    return {
      prototype: {
        template: template
      },
      create: function(){
        return Object.create(this.prototype);
      }
    }
  }())

  $(".list").each(function(){
    var list = $(this);
    list.find("button").click(function(){
      var title = list.find("input").val(),
          id    = list.attr("id");
      if(list.hasClass("pending")) return;
      else list.addClass("pending");
      if($(this).hasClass("delete")){
        List.prototype.delete(id).always(function(response){
          list.remove();
        });
      }else if(list.hasClass("new")){
        List.prototype.create(title).always(function(response){
          list.removeClass("pending new").addClass("current");
          list.attr("id", response.id)
          List.prototype.add();
          console.dir(response);
        })
      }else if(list.hasClass("current")){
        List.prototype.edit(id, title).always(function(response){
          list.removeClass("pending");
          console.dir(response);
        })
      }
    });
  });

});
