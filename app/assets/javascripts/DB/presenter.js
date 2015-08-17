function DB(modelName, apiPath, templateId){
  var DB = {};
  DB.prototype = {
    params: function(){
      var output = {}
      var field = "";
      var el = {};
      for(field in DB.fields){
        el = $("#" + [DB.name, this.data.id, field].join("_"));
        if(el && el.val()) output[field] = el.val()
      }
      return output;
    }
  }
  DBView.call(DB, templateId);
  DBModel.call(DB, apiPath);

  DB.all = {}
  DB.name = modelName;
  DB.fields = function(){
    var fields = DB.view.template.match(/{{{[^}]*(?=}}})/g);
    var output = {};
    if(!fields) return false;
    for(var f = 0; f < fields.length; f++){
      output[fields[f].substring(3)] = true;
    }
    return output;
  }.call()
  DB.new = function(createdFrom){
    var object = Object.create(DB.prototype);
    if(!createdFrom){
      object.data = {status: "new", id: "0" }
    }else if(typeof createdFrom == "object"){
      object.data = createdFrom;
      object.data.status = "current";
    }
    object.view.render.call(object);
    return object;
  }
  DB.place = function(params, where){
    var object = DB.new(params);
    DB.all[object.data.id] = object;
    if(where == "front"){
      object.view.prepend.call(object);
    }else{
      object.view.append.call(object);
    }
    return object;
  }
  DB.create = function(){
    var object = DB.all[0];
    object.model.create.call(object).done(function(response){
      DB.place(response);
      object.view.clear.call(object);
    });
  }
  DB.edit = function(id){
    var instance = DB.all[id];
    return instance.model.edit.call(instance);
  }
  DB.delete = function(id){
    var instance = DB.all[id];
    return instance.model.delete.call(instance).always(function(response){
      instance.el.remove();
      delete DB.all[instance.data.id]
    })
  }
  DB.placeAll = function(){
    return DB.model.index().always(function(response){
      for(var l = 0; l < response.length; l++){
        DB.place(response[l]);
      }
    });
  }
  return DB;
}
