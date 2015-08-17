function DBView(templateId){
  var DB = this;
  var templateElement = $(templateId);

  DB.view = {
    template: templateElement.html(),
    container: templateElement.parent(),
    fields: function(){
      var fields = templateElement.html().match(/{{{[^}]*(?=}}})/g);
      var output = {};
      if(!fields) return false;
      for(var f = 0; f < fields.length; f++){
        output[fields[f].substring(3)] = true;
      }
      return output;
    }.call(),
    placeAll: function(){
      return DB.model.index().always(function(response){
        for(var l = 0; l < response.length; l++){
          var object = DB.new(response[l]);
          object.view.append.call(object);
          DB.all[object.data.id] = object;
        }
      });
    }
  }

  DB.prototype.view = {
    el: {},
    render: function(){
      var output = DB.view.template;
      for(var attribute in DB.view.fields){
        output = output.replace(new RegExp("{{{" + attribute + "}}}", "g"), this.data[attribute] || "");
      }
      this.view.rendered = $(output);
      return output;
    },
    append: function(){
      this.view.el = this.view.rendered.appendTo(DB.view.container);
    },
    prepend: function(){
      this.view.el = this.view.rendered.prependTo(DB.view.container);
    },
    changeClass: function(to, from){
      if(from) this.view.el.removeClass(from);
      this.view.el.addClass(to);
      this.data.status == to;
    }
  }

  templateElement.detach();
}
