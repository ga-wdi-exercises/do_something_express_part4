function DB(modelName, templateId){
  var DB = {};
  DB.prototype = {}
  DBView.call(DB, templateId);
  DBModel.call(DB, modelName);

  DB.all = {}
  DB.new = function(createdFrom){
    var object = Object.create(DB.prototype);
    if(typeof createdFrom == "object"){
      object.data = createdFrom;
      object.data.status = "current";
    }else if(createdFrom == undefined){
      object.data = {
        status: "new",
        id: "new"
      }
    }
    object.view.render.call(object);
    return object;
  }
  DB.remove = function(id){
    this.model.delete().always(function(response){
      this.view.el.remove();
      this.constructor.all.splice(this.prototype.all.indexOf(this, 1));
    })
  }
  return DB;
}
