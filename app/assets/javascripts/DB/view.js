function DBView(templateId){
  var DB = this;
  var templateElement = $(templateId);

  DB.view = {
    template: templateElement.html(),
    container: templateElement.parent()
  }

  DB.prototype.view = {
    render: function(){
      var output = DB.view.template;
      for(var attribute in DB.fields){
        output = output.replace(new RegExp("{{{" + attribute + "}}}", "g"), this.data[attribute] || "");
      }
      this.el = $(output);
      return output;
    },
    clear: function(){
      this.el.find("input, textarea").each(function(i, el){
        $(el).val("");
      });
    },
    append: function(){
      this.el.appendTo(DB.view.container);
    },
    prepend: function(){
      this.el.prependTo(DB.view.container);
    },
    changeClass: function(to, from){
      if(from) this.view.el.removeClass(from);
      this.el.addClass(to);
      this.data.status == to;
    }
  }

  templateElement.detach();
}
