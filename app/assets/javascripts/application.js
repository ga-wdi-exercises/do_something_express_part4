$(document).ready(function(){

  function DBModel(modelName, templateId){
    function dbQuery(method, urlParams, data){
      var url = typeof urlParams == "string" ? urlParams : "/" + urlParams.join("/");
      return $.ajax({
        method: method,
        contentType: "application/json",
        url: url,
        data: data ? JSON.stringify(data) : null
      })
    }
    var templateElement = $(templateId);
    var template = templateElement.html();
    var container = templateElement.parent();
    templateElement.detach();
    return {
      prototype: {
        template: template,
        container: container,
        data: {},
        fields: function(){
          var fields = template.match(/{{{[^}]*}}}/);
          var output = {};
          var field = "";
          if(!fields) return false;
          for(var f = 0; f < fields.length; f++){
            field = fields[f].substring(3, fields[f].length - 3)
            output[field] = true;
          }
          return output;
        }(),
        show: function(){
          return dbQuery("get", [modelName, this.id])
        },
        create: function(params){
          return dbQuery("post", [modelName], params)
        },
        edit: function(params){
          return dbQuery("patch", [modelName, this.id], params)
        },
        delete: function(){
          return dbQuery("delete", [modelName, this.id])
        },
        render: function(){
          var output = this.template;
          for(var attribute in this.fields){
            output = output.replace("{{{" + attribute + "}}}", this.data[attribute] || "");
          }
          this.rendered = output;
          return output;
        },
        append: function(){
          this.el = this.container.append(this.rendered);
        },
        prepend: function(){
          this.el = this.container.prepend(this.rendered);
        }
      },
      new: function(createdFrom){
        var object = Object.create(this.prototype);
        if(typeof createdFrom == "object"){
          object.data = createdFrom;
        }
        object.render();
        return object;
      },
      index: function(){
        return dbQuery("get", [modelName])
      }
    }
  }

  var Task = DBModel("tasks", "#taskTemplate");
  var List = DBModel("lists", "#listTemplate");
  var lists = [];
  List.index().always(function(response){
    for(var l = 0; l < response.length; l++){
      var list = List.new(response[l]);
      list.append();
    }
    List.new().prepend();
  })

  // $(lists).each(function(){
  //   var list = $(this);
  //   list.find("button").click(function(){
  //     var title = list.find("input").val(),
  //         id    = list.attr("id");
  //     if(list.hasClass("pending")) return;
  //     else list.addClass("pending");
  //     if($(this).hasClass("delete")){
  //       List.prototype.delete(id).always(function(response){
  //         list.remove();
  //       });
  //     }else if(list.hasClass("new")){
  //       List.prototype.create(title).always(function(response){
  //         list.removeClass("pending new").addClass("current");
  //         list.attr("id", response.id)
  //         List.prototype.add();
  //         console.dir(response);
  //       })
  //     }else if(list.hasClass("current")){
  //       List.prototype.edit(id, title).always(function(response){
  //         list.removeClass("pending");
  //         console.dir(response);
  //       })
  //     }
  //   });
  // });

});
