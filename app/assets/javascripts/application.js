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
          var fields = template.match(/{{{[^}]*}}}/g);
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
        refresh: function(){
          this.el.empty();
          this.el.html(this.render());
        },
        append: function(){
          this.el = this.container.append(this.rendered);
        },
        prepend: function(){
          this.el = this.container.prepend(this.rendered);
        },
        remove: function(){
          this.delete().always(function(response){
            this.el.remove();
            this.prototype.all.splice(this.prototype.all.indexOf(this, 1));
          })
        }
      },
      all: {},
      new: function(createdFrom){
        var object = Object.create(this.prototype);
        if(typeof createdFrom == "object"){
          object.data = createdFrom;
          object.data.status = "current";
        }else if(createdFrom == undefined){
          object.data = {
            status: "new",
            id: "new"
          }
        }
        object.render();
        return object;
      },
      index: function(){
        return dbQuery("get", [modelName])
      }
    }
  }

  // var Task = DBModel("tasks", "#taskTemplate");
  var List = DBModel("lists", "#listTemplate");
  List.index().always(function(response){
    for(var l = 0; l < response.length; l++){
      var list = List.new(response[l]);
      list.append();
      List.all[list.data.id] = list;
    }

  })

});
